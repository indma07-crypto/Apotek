// Dummy data kategori. Ganti dengan response API saat backend siap.
export const categories = [
  { id: 'obat', name: 'Obat', icon: 'Pill', count: 128, desc: 'Obat bebas & bebas terbatas' },
  { id: 'vitamin', name: 'Vitamin & Suplemen', icon: 'Leaf', count: 96, desc: 'Daya tahan tubuh harian' },
  { id: 'perawatan-tubuh', name: 'Perawatan Tubuh', icon: 'Droplets', count: 74, desc: 'Sabun, lotion, deodoran' },
  { id: 'perawatan-wajah', name: 'Perawatan Wajah', icon: 'Sparkles', count: 68, desc: 'Skincare & sunscreen' },
  { id: 'ibu-anak', name: 'Ibu & Anak', icon: 'Baby', count: 52, desc: 'Nutrisi ibu dan bayi' },
  { id: 'alat-kesehatan', name: 'Alat Kesehatan', icon: 'Stethoscope', count: 41, desc: 'Termometer, tensimeter' },
  { id: 'minuman-kesehatan', name: 'Minuman Kesehatan', icon: 'CupSoda', count: 36, desc: 'Elektrolit & herbal' },
  { id: 'kebutuhan-rumah', name: 'Kebutuhan Rumah', icon: 'Home', count: 29, desc: 'Antiseptik & kebersihan' },
];

export const getCategory = (id) => categories.find((c) => c.id === id);
