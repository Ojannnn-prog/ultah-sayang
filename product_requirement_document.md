# Product Requirement Document (PRD)
## Project Name: Interactive Aesthetic Birthday Greeting Web Application ("Birthday Scrapbook & Wish App")

---

## 1. Executive Summary
Aplikasi web ini dirancang untuk memberikan pengalaman memberikan ucapan ulang tahun yang unik, personal, dan interaktif secara digital. Mengambil inspirasi dari *scrapbook* fisik, amplop surat klasik, buket bunga interaktif, serta pemutar piringan hitam (*vinyl player*), web ini memungkinkan pembuat (*Creator*) membuat tautan unik berisi pesan, foto, lagu, dan catatan apresiasi untuk penerima (*Recipient*).

Aplikasi dibangun menggunakan **Next.js Fullstack (App Router)**, **Neon Serverless PostgreSQL**, dan di-host di **Vercel**.

---

## 2. Objectives & Goals
1. **Unik & Berkesan:** Menggantikan pesan teks biasa dengan modul interaktif yang kaya akan animasi visual dan suara.
2. **Kustomisasi Penuh:** Pembuat pesan dapat mengatur nama, tanggal, isi surat, foto-foto kenangan, pilihan bunga, daftar pesan pujian (*compliments*), serta musik latar (*soundtrack*).
3. **Multi-Platform & Responsive:** Nyaman diakses di perangkat mobile (smartphone/tablet) maupun desktop.
4. **Skalabilitas & Performa tinggi:** Menggunakan arsitektur serverless Next.js + Neon Database untuk loading yang sangat cepat.

---

## 3. Target Audience & Personas
- **Creator (Pembuat):** Individu yang ingin memberikan kejutan ulang tahun yang estetik dan romantis/spesial untuk pasangan, sahabat, atau keluarga.
- **Recipient (Penerima):** Orang yang merayakan ulang tahun, menerima tautan link unik (misal: `birthday-app.com/hbd-sarah`), dan menikmati setiap interaksi di dalamnya.

---

## 4. Key Feature Requirements

### A. Recipient Experience (Interactive Experience)
1. **Hero & Intro Landing Screen:**
   - Visual latar belakang (video/foto kenangan) dengan efek *fade-in*.
   - Judul ucapan utama (contoh: *"Happy Birthday [Nama]!"*), tanggal kelahiran, dan pesan pembuka singkat.
   - Tombol pemicu awal (*"Click Here"* / *"Mulai Kejutan"*) yang otomatis memicu pemutaran musik latar.

2. **Main Hub Navigation ("These are for you"):**
   - Menu utama dengan 3 kartu interaktif pilihan:
     - ✉️ **Message (Surat & Amplop)**
     - 💐 **Flower (Buket Bunga & Catatan Pujian)**
     - 🍰 **Memories / Cake (Scrapbook, TV Retro & Vinyl Player)**

3. **Section 1: Interactive Envelope & Letter (Message):**
   - Animasi 3D amplop tertutup dengan segel lilin (*wax seal*).
   - Tombol *"Click to view"* untuk membuka amplop secara realistis.
   - Surat kertas fisik terpapar naik dengan animasi *unfolding*.
   - Galeri foto Polaroid bertumpuk di sekeliling surat dengan aksen selotip (*washi tape*) dan jepitan foto.
   - Dukungan pagination untuk surat multi-halaman.

4. **Section 2: Flower Bouquet & Compliment Cards (Flower):**
   - Tampilan visual buket bunga kustom (contoh: *Sunflower*, *Rose*, *Tulip*) sebagai kado simbolis.
   - Teks penanda favorit (contoh: *"Sunflower - Your Favorite Flower"*).
   - Kartu-kartu pujian (*floating compliment notes*) interaktif di sekeliling bunga (contoh: *"You are kind in ways that truly matter"*, *"You are strong, even when things get difficult"*).
   - Efek hover/klik yang memberikan kilauan animasi (*sparkle effect*).

5. **Section 3: Interactive Scrapbook & Vinyl Player (Cake/Memories):**
   - Estetika kertas sobek (*torn paper red/crimson theme*).
   - **Pemutar Musik Vinyl (Piringan Hitam):** Piringan hitam berputar yang bisa di-klik untuk *Play/Pause* lagu favorit.
   - **Elemen TV Retro:** Kotak TV animasi memutar memori video/GIF singkat.
   - **Grid Foto Polaroid:** Kumpulan foto kenangan dengan tulisan tangan di bagian bawahnya.

6. **Audio & Special Effects:**
   - Pemutar audio latar belakang dengan kontrol volume dan mute.
   - Meriam Konfeti (*Confetti Cannon Blast*) saat halaman dibuka atau kartu pesan selesai dibaca.
   - Elemen balon udara dan hati berterbangan (*floating particles*).

### B. Creator Dashboard / Builder (Customization Interface)
1. **Form Builder:**
   - Input Nama Penerima, Tanggal Ulang Tahun, Tautan Musik (MP3 / Audio URL).
   - Editor Teks Surat (Pesan Halaman 1 & Halaman 2).
   - Pilihan Jenis Bunga dan Input Catatan Pujian (sampai 6 kartu pujian).
   - Unggah Foto Kenangan (untuk Polaroid & background) via Cloudinary / Vercel Blob.
2. **Generasi Custom Link / Slug:**
   - Sistem pembuatan URL unik otomatis/kustom (misal: `/wish/siti-21st`).
3. **Preview Mode:**
   - Pratinjau langsung sebelum membagikan link kepada penerima.

---

## 5. Non-Functional Requirements
- **Performance:** First Contentful Paint (FCP) < 1.2s, LCP < 2.5s.
- **Responsiveness:** *Mobile-first approach*, diuji optimal untuk resolusi tablet & smartphone.
- **Accessibility & UX:** Animasi mulus 60 FPS tanpa mengganggu keterbacaan teks.
- **Security:** Proteksi rute creator dengan password sederhana/API Secret Token, sanitasi input untuk mencegah XSS.

---

## 6. Technology Stack
- **Framework:** Next.js (App Router, React 19 / Server Components + Server Actions).
- **Styling & UI:** Tailwind CSS, Shadcn UI, Lucide React Icons.
- **Animations:** Framer Motion, `@keyframes` CSS 3D transforms, `canvas-confetti`.
- **Database:** Neon Serverless PostgreSQL.
- **ORM:** Drizzle ORM / Prisma.
- **Audio Handling:** Howler.js / HTML5 Audio API.
- **Media Storage:** Cloudinary / Vercel Blob.
- **Deployment:** Vercel Hosting.