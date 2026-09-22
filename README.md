# Little Things — Birthday Scrapbook

Interactive birthday keepsake built with Next.js App Router, Prisma, Neon PostgreSQL, Framer Motion, and Tailwind CSS.

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Put the Neon connection string in `.env.local` as `DATABASE_URL`. Never commit `.env.local`.

3. Generate Prisma Client and sync the database:

   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

4. Start the app:

   ```bash
   npm run dev
   ```

Open `http://localhost:3000` for the landing page or `http://localhost:3000/athaya-22` for the seeded recipient experience.

## Main routes

- `/` — landing page
- `/create` — creator builder for a new greeting
- `/[slug]` — interactive recipient scrapbook
- `POST /api/greetings` — creates a greeting and its compliment notes

## Adding photos

Photos can be placed in `public/assets` while the visual system is being finalized. The database model already supports photo URLs, captions, sections, and ordering. The next media step can connect those fields to a local picker or Cloudinary/Vercel Blob upload flow.

## Project structure

- `src/app` — routes, layout, global styling, and API handler
- `src/components` — interactive recipient experience and creator form
- `src/server/db.ts` — shared Prisma client
- `prisma/schema.prisma` — Greeting, Compliment, and Photo models
- `prisma/seed.ts` — demo greeting data
