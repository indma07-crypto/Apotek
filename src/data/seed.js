// Data dummy untuk riwayat pesanan dan panel admin.
export const seedOrders = [
  {
    id: 'INV-2026-100241',
    date: '2026-09-12T09:24:00.000Z',
    customer: 'Rani Puspita',
    status: 'Selesai',
    payment: 'QRIS',
    shipping: 'Regular',
    address: 'Jl. Melati No. 12, Kebayoran Baru, Jakarta Selatan',
    items: [
      { id: 2, name: 'Vitamin C 500mg', price: 48000, qty: 2, category: 'vitamin' },
      { id: 6, name: 'Masker Medis 3 Ply', price: 34000, qty: 1, category: 'alat-kesehatan' },
    ],
    shippingCost: 12000,
    discount: 5000,
    total: 137000,
  },
  {
    id: 'INV-2026-100318',
    date: '2026-09-16T14:02:00.000Z',
    customer: 'Bagas Pratama',
    status: 'Dikirim',
    payment: 'Transfer Bank',
    shipping: 'Express',
    address: 'Jl. Kenanga No. 8, Cibinong, Bogor',
    items: [{ id: 14, name: 'Tensimeter Digital Lengan', price: 485000, qty: 1, category: 'alat-kesehatan' }],
    shippingCost: 22000,
    discount: 0,
    total: 507000,
  },
  {
    id: 'INV-2026-100402',
    date: '2026-09-18T08:41:00.000Z',
    customer: 'Siti Aminah',
    status: 'Diproses',
    payment: 'E-Wallet',
    shipping: 'Regular',
    address: 'Jl. Mawar No. 3, Depok',
    items: [
      { id: 1, name: 'Paracetamol 500mg', price: 12500, qty: 3, category: 'obat' },
      { id: 13, name: 'Minuman Elektrolit Lemon', price: 9500, qty: 4, category: 'minuman-kesehatan' },
    ],
    shippingCost: 12000,
    discount: 0,
    total: 87500,
  },
  {
    id: 'INV-2026-100455',
    date: '2026-09-19T17:15:00.000Z',
    customer: 'Dimas Wicaksono',
    status: 'Dibatalkan',
    payment: 'COD',
    shipping: 'Ambil di Apotek',
    address: 'Ambil di Apotek Sehat Bersama',
    items: [{ id: 10, name: 'Sunscreen SPF 50 PA++++', price: 65000, qty: 1, category: 'perawatan-wajah' }],
    shippingCost: 0,
    discount: 0,
    total: 65000,
  },
];

export const seedUsers = [
  { id: 'U-001', name: 'Rani Puspita', email: 'rani@mail.com', phone: '0812-1111-2222', orders: 14, joined: '2025-02-11', status: 'Aktif' },
  { id: 'U-002', name: 'Bagas Pratama', email: 'bagas@mail.com', phone: '0813-3333-4444', orders: 6, joined: '2025-06-03', status: 'Aktif' },
  { id: 'U-003', name: 'Siti Aminah', email: 'siti@mail.com', phone: '0857-5555-6666', orders: 22, joined: '2024-11-19', status: 'Aktif' },
  { id: 'U-004', name: 'Dimas Wicaksono', email: 'dimas@mail.com', phone: '0821-7777-8888', orders: 2, joined: '2026-01-27', status: 'Nonaktif' },
];

export const weeklySales = [
  { label: 'Sen', value: 4200000 },
  { label: 'Sel', value: 5100000 },
  { label: 'Rab', value: 3800000 },
  { label: 'Kam', value: 6400000 },
  { label: 'Jum', value: 7300000 },
  { label: 'Sab', value: 8100000 },
  { label: 'Min', value: 5600000 },
];

export const topProducts = [
  { name: 'Masker Medis 3 Ply', sold: 3120 },
  { name: 'Vitamin C 500mg', sold: 2210 },
  { name: 'Minuman Elektrolit', sold: 2040 },
  { name: 'Serum Niacinamide', sold: 1890 },
  { name: 'Paracetamol 500mg', sold: 1840 },
];

export const orderStatuses = ['Pending', 'Diproses', 'Dikirim', 'Selesai', 'Dibatalkan'];
