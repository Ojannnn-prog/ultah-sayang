# Task Tracking & Implementation Roadmap

## Legend
- [ ] Todo
- [/] In Progress
- [x] Completed

---

## Phase 1: Environment & Project Initialization
- [ ] Initialize Next.js project with App Router, TypeScript, and Tailwind CSS (`npx create-next-app@latest`).
- [ ] Install essential libraries: `framer-motion`, `lucide-react`, `canvas-confetti`, `@neondatabase/serverless`, `drizzle-orm`, `drizzle-kit`, `howler`, `clsx`, `tailwind-merge`.
- [ ] Setup Neon Database instance and retrieve connection string (`DATABASE_URL`).
- [ ] Configure `drizzle.config.ts` and database connection client in `lib/db/index.ts`.
- [ ] Setup environment variables in `.env.local` and Vercel dashboard.

---

## Phase 2: Database Schema & API Services
- [ ] Define DB schema in `lib/db/schema.ts`:
  - [ ] `greetings` table (id, slug, recipient_name, date_text, intro_message, letter_page1, letter_page2, flower_type, music_url, cover_bg_url, created_at).
  - [ ] `compliments` table (id, greeting_id, note_text, order_index).
  - [ ] `photos` table (id, greeting_id, photo_url, caption, layout_type).
- [ ] Run initial migration (`npx drizzle-kit push`).
- [ ] Create seed script for testing template data.
- [ ] Create Server Actions / API routes for fetching greeting data by `slug` (`getGreetingBySlug`).
- [ ] Create Server Actions for storing new greeting configurations (`createGreeting`).

---

## Phase 3: UI Component Architecture Development

### A. Landing & Navigation Hub
- [ ] Implement `HeroCover.tsx` component with video/photo background, name overlay, and sound trigger button.
- [ ] Implement `AudioPlayer.tsx` with background music controller and vinyl spin sync.
- [ ] Implement `CategoryHub.tsx` ("These are for you") with 3 interactive navigation cards (Message, Flower, Cake).

### B. Message Envelope & Letter Module
- [ ] Create `Envelope3D.tsx` interactive envelope with Framer Motion unfold animation.
- [ ] Create `LetterModal.tsx` displaying rich text styled like handwriting on vintage paper texture.
- [ ] Add surrounding `PolaroidFrame.tsx` components with tape clip overlays.
- [ ] Add pagination controls between Page 1 and Page 2 of the letter.

### C. Flower Bouquet & Compliment Cards Module
- [ ] Create `FlowerSection.tsx` component showing dynamic bouquet vector/image.
- [ ] Build floating compliment speech bubbles / sticky notes (`ComplimentCard.tsx`).
- [ ] Add particle sparkle animation when compliment cards are hovered/tapped.

### D. Scrapbook & Vinyl Player Module
- [ ] Create torn paper container layout (`ScrapbookLayout.tsx`) with dark red/crimson aesthetics.
- [ ] Build `VinylPlayer.tsx` with spinning record disc, tonearm animation, and play/pause state.
- [ ] Build `RetroTV.tsx` video/GIF player container.
- [ ] Construct Polaroid photo collage grid with custom tilt rotations.

---

## Phase 4: Creator Builder & Link Generator
- [ ] Build `app/create/page.tsx` with multi-step form for creating personalized links.
- [ ] Integrate media upload handler (Cloudinary / Vercel Blob integration) for photo uploads.
- [ ] Build interactive live preview frame for creators.
- [ ] Implement copy link modal with QR code generation.

---

## Phase 5: Polish, Animations & FX
- [ ] Integrate `canvas-confetti` burst when recipient enters or completes sections.
- [ ] Add floating balloons and animated hearts in background (`FloatingParticles.tsx`).
- [ ] Ensure mobile responsive layout fixes (touch gestures, screen overflow prevention).
- [ ] Optimize font loading using `next/font` (Google Fonts: *Playfair Display*, *Caveat*, *Plus Jakarta Sans*).

---

## Phase 6: QA, Optimization & Vercel Deployment
- [ ] Test across browsers (Chrome, Safari Mobile, Firefox, Edge).
- [ ] Verify database queries performance with Neon Serverless driver caching.
- [ ] Deploy production build on Vercel and map custom domain.
- [ ] Conduct end-to-end user testing flow (Create -> Generate Link -> Open as Recipient).