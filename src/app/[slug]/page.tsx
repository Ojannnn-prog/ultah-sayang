import { notFound } from "next/navigation";
import { BirthdayExperience } from "@/components/BirthdayExperience";
import { beeGeesMusicUrl, greetingPhotoUrls } from "@/lib/greeting-assets";
import { prisma } from "@/server/db";

const fallbackPhotoCaptions = ["Di antara lampu toko dan pantulan kaca, kita menemukan alasan baru untuk tersenyum.", "Kamu menoleh, dunia mendadak terasa sedikit lebih pelan.", "Hari biasa berubah jadi kenangan hanya karena kamu ada di dalamnya.", "Senyummu punya cara sederhana untuk membuat tempat ramai terasa seperti rumah.", "Bukti bahwa momen paling manis sering datang tanpa rencana.", "Ada tawa yang tidak perlu dijelaskan. Foto ini salah satunya.", "Kamu dan hari yang cerah, dua hal yang sama-sama sulit untuk tidak disukai.", "Satu jepretan, banyak cerita yang belum selesai diceritakan.", "Kalau kenangan punya warna, mungkin warnanya akan seperti hari ini.", "Kamu terlihat seperti seseorang yang sedang disayangi hidup.", "Di sini, waktu sempat berhenti untuk memberi ruang pada bahagia.", "Momen kecil, dampak besar. Senyummu masih tinggal sampai sekarang.", "Tidak ada pose sempurna. Ada kamu, dan itu sudah lebih dari cukup.", "Foto ini menyimpan tawa yang mungkin tidak terdengar, tapi terasa.", "Satu lagi alasan untuk menyimpan hari ini lebih lama."];
const fallbackPhotos = greetingPhotoUrls.slice(0, 15).map((photoUrl, index) => ({ id: `photo-${index + 1}`, photoUrl, caption: fallbackPhotoCaptions[index], section: index === 0 ? "hero" : "scrapbook", orderIndex: index }));
const fallbackLetterPages = [
  { id: "letter-1", pageNumber: 1, title: "Untuk Athaya", body: "Sayang, Athaya,\n\nHari ini namamu terasa lebih terang dari biasanya. Mungkin karena tanggal 23 September selalu membawa satu kabar baik: dunia pernah menerima seseorang sehangat dan seistimewa kamu.\n\nDi usia dua puluh dua, semoga kamu sempat berhenti sebentar dan melihat perjalananmu sendiri. Ada banyak hal yang sudah kamu lewati. Ada hari-hari yang kamu jalani sambil pura-pura kuat, ada tawa yang menyelamatkan suasana, dan ada langkah kecil yang diam-diam membawamu jauh.\n\nSelamat ulang tahun, cintaku. Terima kasih sudah tumbuh menjadi Athaya yang begitu luar biasa." },
  { id: "letter-2", pageNumber: 2, title: "Tentang caramu hadir", body: "Cintaku, ada orang yang datang lalu lewat begitu saja. Kamu tidak begitu.\n\nKamu tinggal di percakapan yang masih diingat setelah selesai. Tinggal di lagu yang tiba-tiba terasa punya arti. Tinggal di foto yang membuat seseorang tersenyum meski harinya sedang panjang.\n\nCara kamu tertawa membuat hal kecil terasa cukup. Cara kamu peduli sering kali lebih besar daripada yang kamu sadari. Ada kesempurnaan yang tidak berisik dalam caramu hadir.\n\nKalau suatu hari kamu lupa betapa berharganya dirimu, semoga surat ini menjadi pengingat kecil. Kamu membawa hangatmu sendiri. Kamu tidak perlu berubah untuk menjadi seseorang yang layak dicintai." },
  { id: "letter-3", pageNumber: 3, title: "Kalau nanti harimu berat", body: "Sayang, kalau nanti rencanamu berantakan, pesan tidak dibalas, dan kepalamu terlalu ramai untuk diajak berdamai, ingat ini.\n\nJangan buru-buru menyimpulkan bahwa kamu gagal. Kamu hanya sedang lelah. Istirahat sebentar. Minum air. Cari makanan yang kamu suka. Putar lagu yang membuatmu kembali menjadi dirimu sendiri.\n\nKamu tidak harus selalu menjadi versi paling kuat dari dirimu. Bahkan bunga yang paling indah pun punya hari ketika kelopaknya menunduk. Keindahanmu tidak berkurang sedikit pun.\n\nDan kalau cahaya itu sedang jauh, tenang saja. Akan selalu ada orang yang mau duduk di sebelahmu, cintaku, bahkan tanpa banyak bicara." },
  { id: "letter-4", pageNumber: 4, title: "Catatan dari anak teknik", body: "Sebagai anak teknik, Ojannsss sudah melakukan riset mendalam tentang Athaya.\n\nHasilnya cukup mengejutkan:\n\n1. Senyummu terbukti meningkatkan kualitas hari sampai 100 persen.\n2. Tatapanmu berpotensi membuat orang lupa tujuan awal membuka chat.\n3. Kamu tetap cantik dan sempurna meski bilang, ‘Aku cuma pakai yang ada.’\n4. Tingkat lucumu tidak bisa dihitung dengan kalkulator biasa.\n\nKesimpulan penelitian: kamu tidak perlu diperbaiki. Kamu sudah luar biasa. Paling cuma perlu diingatkan untuk makan, istirahat, dan tidak terlalu keras pada diri sendiri.\n\nKalau hidup ini program, kamu adalah bagian yang paling ingin dipertahankan. Kalau ada bug, kita debug bersama. Kalau Wi-Fi putus, kita cari sinyal sambil tetap ketawa, sayang." },
  { id: "letter-5", pageNumber: 5, title: "Untuk tahun yang baru", body: "Untuk tahunmu yang ke dua puluh dua, cintaku,\n\nSemoga langkahmu menemukan tempat-tempat yang tahu betapa berharganya dirimu. Semoga orang-orang di sekitarmu tahu cara menjaga hati yang sudah begitu sering memberi. Semoga ada lebih banyak pagi yang ringan, kabar baik yang datang tanpa diminta, dan tawa yang membuat perutmu sakit.\n\nJangan takut pada jalan yang belum punya nama. Kamu tidak harus mengetahui seluruh arah untuk mulai melangkah. Bawa keberanianmu. Bawa rasa ingin tahumu. Bawa juga dirimu yang paling jujur, karena versi itu sudah lebih dari sempurna.\n\nSelamat ulang tahun, Athaya. Semoga tahun ini memelukmu pelan-pelan, lalu mengajarimu bahwa hal-hal baik boleh datang tanpa harus kamu perjuangkan sendirian. Kamu pantas menerima semuanya, sayang." },
];

const demoGreeting = {
  id: "demo",
  slug: "athaya-22",
  recipientName: "Athaya Syakirah Putrigustaman",
  dateText: "22nd birthday · September 23, 2026",
  introMessage: "A little corner of the internet, made especially for your twenty-second year.",
  letterPage1: fallbackLetterPages[0].body,
  letterPage2: fallbackLetterPages[1].body,
  flowerType: "Gerbera",
  flowerLabel: "Bunga ini untukmu",
  musicUrl: beeGeesMusicUrl,
  coverBgUrl: greetingPhotoUrls[0],
  letterPages: fallbackLetterPages,
  compliments: [
    { id: "1", noteText: "Sayang, kamu membuat hari biasa terasa istimewa.", orderIndex: 0 },
    { id: "2", noteText: "Cintaku, kebaikanmu selalu tinggal di hati orang.", orderIndex: 1 },
    { id: "3", noteText: "Kamu luar biasa, bahkan saat sedang tidak menyadarinya.", orderIndex: 2 },
    { id: "4", noteText: "Tawamu adalah lagu kecil yang ingin kudengar berulang-ulang.", orderIndex: 3 },
    { id: "5", noteText: "Kalau hidup playlist, kamu lagu favoritnya, sayang.", orderIndex: 4 },
    { id: "6", noteText: "Kamu lucu, cantik, dan nyaris sempurna tanpa perlu berusaha.", orderIndex: 5 },
    { id: "7", noteText: "Boleh tambah umur, jangan tambah jutek, cintaku.", orderIndex: 6 },
    { id: "8", noteText: "Dunia terasa lebih lembut sejak ada kamu di dalamnya.", orderIndex: 7 },
  ],
  photos: fallbackPhotos,
};

export default async function GreetingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let greeting = null;

  try {
    greeting = await prisma.greeting.findUnique({
      where: { slug },
      include: { compliments: { orderBy: { orderIndex: "asc" } }, photos: { orderBy: { orderIndex: "asc" } }, letterPages: { orderBy: { pageNumber: "asc" } } },
    });
  } catch {
    // The demo should remain viewable before the first database migration.
  }

  if (!greeting && slug !== demoGreeting.slug) notFound();

  return <BirthdayExperience greeting={(greeting ?? demoGreeting) as typeof demoGreeting} />;
}
