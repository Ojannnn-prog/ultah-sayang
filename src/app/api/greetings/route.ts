import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/server/db";

const greetingSchema = z.object({
  recipientName: z.string().trim().min(1).max(80),
  dateText: z.string().trim().min(1).max(80),
  introMessage: z.string().trim().max(180).optional().default(""),
  letterPage1: z.string().trim().min(1).max(2400),
  letterPage2: z.string().trim().max(2400).optional().default(""),
  flowerType: z.enum(["Gerbera", "Sunflower", "Rose", "Tulip", "Wildflower"]),
  compliments: z.array(z.string().trim().min(1).max(180)).max(6).default([]),
});

function slugify(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function POST(request: Request) {
  try {
    const parsed = greetingSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Please fill the form with valid details." }, { status: 400 });
    const data = parsed.data;
    const baseSlug = slugify(`${data.recipientName}-${data.dateText}`) || "birthday-keepsake";
    let slug = baseSlug;
    let suffix = 1;
    while (await prisma.greeting.findUnique({ where: { slug }, select: { id: true } })) slug = `${baseSlug}-${suffix++}`;
    await prisma.greeting.create({ data: { slug, recipientName: data.recipientName, dateText: data.dateText, introMessage: data.introMessage || null, letterPage1: data.letterPage1, letterPage2: data.letterPage2 || null, flowerType: data.flowerType, compliments: { create: data.compliments.map((noteText, orderIndex) => ({ noteText, orderIndex })) } } });
    return NextResponse.json({ slug });
  } catch (error) {
    console.error("Unable to create greeting", error);
    return NextResponse.json({ error: "The scrapbook could not be saved yet. Check that the database is connected." }, { status: 500 });
  }
}
