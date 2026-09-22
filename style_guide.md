# Design & Style Guide

## 1. Aesthetic Identity & Design Philosophy
Aplikasi ini mengusung tema **"Vintage Romantic Scrapbook"**. Desainnya menggabungkan nostalgia kertas fisik, amplop berstempel, pita, selotip bening (*washi tape*), piringan hitam (*vinyl*), foto polaroid, dan nuansa warna *deep crimson red* yang elegan, hangat, dan emosional.

---

## 2. Color Palette

### Primary Colors (Scrapbook Theme)
- **Deep Crimson Red (Primary Background):** `#8B0000` / `hsl(348, 83%, 27%)`
- **Rich Burgundy:** `#6B0012` / `hsl(349, 100%, 21%)`
- **Warm Rose Red:** `#C82333` / `hsl(354, 70%, 46%)`

### Secondary & Accent Colors
- **Soft Cream Paper (Letter & Card BG):** `#FFFDD0` / `#FDFBF7`
- **Vintage Paper Aged:** `#F4EAE1`
- **Romantic Pink:** `#FFC0CB` / `#E8909C`
- **Gold Accent (Wax Seal & Highlights):** `#D4AF37` / `#E6C200`
- **Dark Velvet Charcoal (Text & Vinyl Body):** `#1A1A1A` / `#222222`

---

## 3. Typography

### Font Families
1. **Script / Handwritten (Letters & Compliment Notes):**
   - Font: `Caveat`, `Dancing Script`, atau `Sacramento` (Google Fonts)
   - Usage: Digunakan untuk isi surat ucapan, teks dalam polaroid, dan catatan pujian di sekitar bunga.
2. **Serif (Headings & Card Titles):**
   - Font: `Playfair Display` atau `Cinzel`
   - Usage: Judul utama ("Happy Birthday", "These are for you", "Sunflower").
3. **Sans-Serif (UI Elements & Creator Dashboard):**
   - Font: `Plus Jakarta Sans` atau `Inter`
   - Usage: Tombol UI, instruksi, form pembuatan, teks teknis.

---

## 4. UI Components & Craft Elements

### A. Envelope & Letter Component
- **Envelope:** Warna merah tua dengan lipatan kerucut 3D, dilengkapi stiker segel lilin bulat emas/merah (`Wax Seal`) bertuliskan cangkang hati atau inisial.
- **Letter:** Kertas warna krem bermotif garis halus, dengan batas sobekan lembut (*torn paper edges*).

### B. Polaroid Photo Frame
- **Frame:** Kertas putih persegi dengan margin bawah lebih tebal untuk tempat caption.
- **Rotasi:** Sudut rotasi acak antara `-6deg` sampai `+6deg` untuk memberikan kesan ditempel manual.
- **Aksesoris:** Gambar selotip transparan (*washi tape*) atau jepitan kayu di sudut foto.

### C. Compliment Badges / Floating Sticky Notes
- **Bentuk:** Kotak pespesifikasi kecil berwarna krem/merah muda pucat dengan garis tepi tipis dan bayangan lembut (`box-shadow: 0 4px 15px rgba(0,0,0,0.15)`).
- **Efek Hover:** Mengambang perlahan (*subtle float animation*), sedikit membesar saat diarahkan kursor.

### D. Vinyl Audio Player
- **Piringan Hitam:** Lingkaran hitam mengkilap dengan alur melingkar (*grooves*) dan label tengah bundar bergambar kustom.
- **Animasi:** Berputar 360 derajat terus menerus saat audio *playing*, berhenti saat *paused*.

---

## 5. Animation Guidelines (Framer Motion Specs)

| Elemen | Tipe Animasi | Properties & Physics |
| :--- | :--- | :--- |
| **Envelope Opening** | 3D Flip & Slide Up | `rotateX: 180deg`, `translateY: -100px`, `transition: { duration: 0.8, ease: "easeInOut" }` |
| **Card Hover** | Scale & Floating | `scale: 1.05`, `y: -5`, `transition: { type: "spring", stiffness: 300 }` |
| **Compliment Notes** | Floating Wave | `animate={{ y: [0, -8, 0] }}`, `transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}` |
| **Confetti Burst** | Particle Explosion | Triggered via `canvas-confetti` pada event selesainya pembacaan surat. |