# Architecture & Design Documentation

## 1. System Architecture Overview

Aplikasi ini menggunakan arsitektur modern berbasis **Next.js App Router (Fullstack)**. Semua rendering komponen penerima ucapan dikirimkan melalui kombinasi **Server Components (SSR)** untuk data loading yang cepat dan **Client Components** untuk animasi interaktif Framer Motion.

```
┌─────────────────────────────────────────────────────────┐
│                      Client Browser                     │
│    (Interactive Scrapbook, Envelope, Audio, Animations) │
└──────────────────────────┬──────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                  Next.js App Router                     │
│  ├── App Routes (/[slug] - Recipient View)               │
│  ├── App Routes (/create - Creator Form)                 │
│  └── Server Actions / API Routes                        │
└────────────┬─────────────────────────────┬──────────────┘
             │                             │
             ▼                             ▼
┌──────────────────────────┐  ┌──────────────────────────┐
│   Neon PostgreSQL DB     │  │  Media Storage           │
│   (Serverless Driver)    │  │  (Cloudinary/Vercel Blob)│
└──────────────────────────┘  └──────────────────────────┘
```

---

## 2. Database Schema (Neon PostgreSQL + Drizzle ORM)

Berikut adalah rancangan skema database PostgreSQL menggunakan Drizzle ORM (`lib/db/schema.ts`):

```typescript
import { pgTable, text, timestamp, uuid, integer } from 'drizzle-orm/pg-core';

export const greetings = pgTable('greetings', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull().unique(),
  recipientName: text('recipient_name').notNull(),
  dateText: text('date_text').notNull(),
  introMessage: text('intro_message'),
  letterPage1: text('letter_page1').notNull(),
  letterPage2: text('letter_page2'),
  flowerType: text('flower_type').default('Sunflower').notNull(),
  flowerLabel: text('flower_label').default('Your Favorite Flower'),
  musicUrl: text('music_url').notNull(),
  coverBgUrl: text('cover_bg_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const compliments = pgTable('compliments', {
  id: uuid('id').defaultRandom().primaryKey(),
  greetingId: uuid('greeting_id').references(() => greetings.id, { onDelete: 'cascade' }),
  noteText: text('note_text').notNull(),
  orderIndex: integer('order_index').default(0),
});

export const photos = pgTable('photos', {
  id: uuid('id').defaultRandom().primaryKey(),
  greetingId: uuid('greeting_id').references(() => greetings.id, { onDelete: 'cascade' }),
  photoUrl: text('photo_url').notNull(),
  caption: text('caption'),
  section: text('section').default('scrapbook'), // 'letter' | 'scrapbook' | 'hero'
  orderIndex: integer('order_index').default(0),
});
```

---

## 3. Directory & Folder Structure

```text
├── app/
│   ├── layout.tsx                # Root Layout (Fonts & Sound Provider)
│   ├── page.tsx                  # Home / Landing Page
│   ├── create/                   # Creator Dashboard Page
│   │   └── page.tsx
│   └── [slug]/                   # Recipient Dynamic Birthday Page
│       ├── page.tsx              # Server Component fetching data from Neon DB
│       └── loading.tsx           # Custom Aesthetic Skeleton Loader
├── components/
│   ├── ui/                       # Shadcn UI base components
│   ├── recipient/                # Interactive Components for Recipient
│   │   ├── HeroCover.tsx         # Cover Screen
│   │   ├── CategoryHub.tsx       # Selection Cards (Message, Flower, Cake)
│   │   ├── EnvelopeModal.tsx     # 3D Envelope & Letter
│   │   ├── FlowerSection.tsx     # Bouquet & Compliment Notes
│   │   ├── ScrapbookSection.tsx  # Red Torn Paper Layout
│   │   ├── VinylPlayer.tsx       # Spinning Audio Player
│   │   ├── RetroTV.tsx           # Video/GIF Container
│   │   └── ConfettiBurst.tsx     # Celebration Effects
│   └── creator/                  # Components for Creator Builder Form
│       ├── GreetingForm.tsx
│       └── PhotoUploader.tsx
├── lib/
│   ├── db/
│   │   ├── index.ts              # Neon Database Connection
│   │   └── schema.ts             # Drizzle Database Schemas
│   ├── actions/
│   │   └── greeting.actions.ts   # Next.js Server Actions
│   └── utils.ts
├── public/
│   ├── assets/                   # Textures (torn-paper.png, wax-seal.png)
│   └── audio/                    # Default background music tracks
├── styles/
│   └── globals.css
```

---

## 4. Recipient Page Interaction Flow State Machine

```text
[PAGE LOAD] ──> [HERO COVER SCREEN] (Click "Start / Play Music")
                       │
                       ▼
            [CATEGORY HUB - "These are for you"]
                       │
       ┌───────────────┼────────────────┐
       │               │                │
       ▼               ▼                ▼
[MESSAGE CARD]   [FLOWER CARD]    [CAKE / MEMORIES]
       │               │                │
       ▼               ▼                ▼
 (Envelope 3D)   (Bouquet View)   (Scrapbook View)
 (Unfold Letter) (Compliments)    (Vinyl & TV)
       │               │                │
       └───────────────┼────────────────┘
                       │
                       ▼
          [CONFETTI BURST & MUSIC PLAYING]
```

---

## 5. Key Technical Implementations

### A. Dynamic Audio Management & Autoplay Handling
Karena peramban modern membendung *autoplay audio* tanpa interaksi pengguna, `HeroCover.tsx` berfungsi sebagai peluncur interaksi pertama. Saat tombol *"Click Here"* ditekan:
1. Konteks audio (`HTMLAudioElement` / `Howler.js`) langsung diaktifkan (`audio.play()`).
2. Tampilan transisi mulus berpindah dari Hero ke **Category Hub**.

### B. Responsive Scrapbook Layout Optimization
Menggunakan CSS Grid dan Tailwind CSS flexbox dengan sudut transformasi terkontrol untuk memastikan foto Polaroid dan sticky notes tidak tumpang tindih secara liar pada layar ponsel berukuran kecil (`320px - 430px`).

---

## 6. Deployment & Infrastructure
1. **Database:** Neon Serverless Postgres instance deployed with autoscaling connection pooling.
2. **Hosting:** Vercel Platform with Automatic Edge Caching for static assets and Serverless Functions for dynamic dynamic slug resolution.
3. **Domain & SSL:** Automatically configured with HTTPS via Vercel Edge Network.