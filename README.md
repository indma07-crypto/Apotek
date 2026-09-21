# Apotek Sehat Bersama

Website apotek modern berbasis React + Vite + Tailwind CSS.
Tagline: **"Kesehatan Anda, Prioritas Kami."**

Seluruh alur utama dapat langsung dicoba dengan data lokal:
**browse → detail produk → keranjang → checkout → pesanan berhasil → riwayat pesanan**,
ditambah panel admin terpisah di `/admin`.

---

## 1. Menjalankan Project

Syarat: Node.js 18 atau lebih baru.

```bash
npm install
npm run dev      # buka http://localhost:5173
```

Perintah lain:

```bash
npm run build    # build produksi ke folder dist/
npm run preview  # pratinjau hasil build
```

---

## 2. Struktur Folder

```
apotek-sehat-bersama/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js          # design token: warna, radius, shadow, animasi
├── postcss.config.js
└── src/
    ├── main.jsx                # entry point + Router + StoreProvider
    ├── App.jsx                 # seluruh routing (publik + admin), lazy loading
    ├── index.css               # base style, komponen utility (.card, .input, dll)
    ├── context/
    │   └── StoreContext.jsx    # state global: cart, orders, user, toast
    ├── data/
    │   ├── products.js         # 16 produk dummy + opsi filter & sorting
    │   ├── categories.js       # 8 kategori
    │   └── seed.js             # pesanan, pengguna, statistik admin
    ├── utils/
    │   ├── format.js           # format Rupiah, tanggal, nomor pesanan
    │   └── categoryIcons.js    # peta ikon kategori
    ├── components/
    │   ├── ui/                 # Button, Badge, Rating, Modal, Toast,
    │   │                       # ProductArt, EmptyState, SectionHeading, StatusPill
    │   ├── layout/             # Navbar, Footer, BottomNav, Logo,
    │   │                       # SiteLayout, AdminLayout (sidebar)
    │   ├── Hero.jsx
    │   ├── TrustSection.jsx
    │   ├── CategoryCard.jsx
    │   ├── ProductCard.jsx
    │   ├── ProductGrid.jsx
    │   ├── SearchBar.jsx
    │   ├── CartItem.jsx
    │   ├── OrderCard.jsx
    │   ├── ConsultationCTA.jsx
    │   ├── DashboardCard.jsx
    │   ├── DataTable.jsx
    │   └── BarChart.jsx        # grafik SVG tanpa dependensi tambahan
    └── pages/
        ├── Home.jsx            Products.jsx     ProductDetail.jsx
        ├── Categories.jsx      Cart.jsx         Checkout.jsx
        ├── OrderSuccess.jsx    Orders.jsx       OrderDetail.jsx
        ├── Consultation.jsx    About.jsx        Contact.jsx
        ├── Login.jsx           Register.jsx     Profile.jsx
        ├── NotFound.jsx
        └── admin/
            ├── Dashboard.jsx        AdminProducts.jsx
            ├── AdminCategories.jsx  AdminOrders.jsx
            ├── AdminUsers.jsx       AdminStocks.jsx
            └── AdminSimple.jsx      # Promo, Konsultasi, Laporan, Pengaturan
```

---

## 3. Daftar Route

Publik:

| Route | Halaman |
|---|---|
| `/` | Beranda (hero, benefit, kategori, produk pilihan, CTA konsultasi) |
| `/products` | Katalog + filter kategori + sorting + pencarian |
| `/products/:id` | Detail produk, tab informasi, produk terkait |
| `/categories` | Semua kategori |
| `/cart` | Keranjang belanja + ringkasan |
| `/checkout` | Alamat, pengiriman, pembayaran, ringkasan |
| `/order-success` | Konfirmasi pesanan berhasil |
| `/orders` | Pesanan Saya (tab status) |
| `/orders/:id` | Detail pesanan |
| `/consultation` | Chat konsultasi apoteker |
| `/about` | Profil, visi, misi, layanan, jam operasional, placeholder peta |
| `/contact` | Info kontak + form pesan |
| `/login`, `/register`, `/profile` | Autentikasi dummy dan profil pengguna |

Admin:

`/admin`, `/admin/products`, `/admin/categories`, `/admin/orders`, `/admin/users`,
`/admin/stocks`, `/admin/promos`, `/admin/consultations`, `/admin/reports`, `/admin/settings`

---

## 4. State Management

`src/context/StoreContext.jsx` memakai `useReducer` + Context, disimpan di
`localStorage` dengan key berversi `asb:store:v1` (dibungkus `try/catch`
sehingga tetap jalan bila storage diblokir).

Fungsi yang tersedia lewat `useStore()`:

```js
const {
  cart, cartCount, subtotal, savings, orders, user,
  addToCart, setQty, removeFromCart, clearCart,
  createOrder, setOrderStatus,
  login, logout, notify,
} = useStore();
```

Pesanan baru dari checkout langsung muncul di `/orders` dan di tabel admin.
Perubahan status pesanan di `/admin/orders` juga langsung terlihat di sisi pelanggan.

---

## 5. Pencarian dan Filter

- Pencarian realtime pada nama produk, brand, dan nama kategori.
- Panel hasil muncul di bawah input; bila kosong tampil pesan
  "Produk tidak ditemukan." beserta rekomendasi kategori.
- Enter mengarahkan ke `/products?q=...`.
- Filter kategori dan sorting (Terpopuler, Harga Terendah, Harga Tertinggi, Terbaru)
  disimpan pada URL query sehingga halaman bisa dibagikan.

---

## 6. Catatan Desain

- Warna utama emerald (`brand-600` = `#059669`), netral putih/abu, aksen biru untuk
  informasi medis. Token warna ada di `tailwind.config.js`.
- Tipografi: Plus Jakarta Sans untuk judul, Inter untuk teks.
- Kartu rounded `1.25rem`, border tipis `#E8EBF0`, shadow sangat halus.
- Animasi terbatas pada fade-in, slide-up, scale-in, hover card, dan float;
  semuanya dinonaktifkan otomatis bila pengguna mengaktifkan `prefers-reduced-motion`.

Aksesibilitas dan responsif:

- Target sentuh minimum 44x44 px pada tombol ikon dan tombol utama.
- Focus ring tetap terlihat untuk navigasi keyboard.
- Label tersembunyi (`sr-only`) pada input yang tidak menampilkan label visual.
- Grid produk: 4 kolom desktop, 3 kolom tablet, 2 kolom mobile.
- Navbar hamburger di mobile plus bottom navigation 5 item, dengan
  `env(safe-area-inset-bottom)` agar aman di perangkat berponi.
- Checkout menjadi satu kolom di layar kecil; tabel admin memakai
  scroll horizontal di dalam kontainernya sendiri sehingga body tidak pernah geser.

---

## 7. Menghubungkan ke Backend

1. Ganti impor dari `src/data/*.js` dengan pemanggilan API (misal `fetch` atau SWR).
   Struktur objek produk sudah sama dengan kontrak yang direncanakan:
   `{ id, name, category, brand, price, oldPrice, stock, rating, image,
   description, composition, usage, requiresPrescription }`.
2. Pada `ProductArt`, ganti ilustrasi placeholder dengan `<img src={product.image} />`.
3. Pada `StoreContext`, ganti aksi `order/create` dan `order/status`
   dengan panggilan API, lalu simpan responsnya ke state.
4. Tambahkan proteksi route `/admin` dengan pengecekan peran pengguna.

---

## 8. Optimalisasi Performa yang Sudah Diterapkan

- Code splitting per halaman dengan `React.lazy` + `Suspense`.
- Tanpa barrel import ikon; ikon diimpor eksplisit (bundle awal turun dari ~977 kB ke ~226 kB).
- `ProductCard` dibungkus `memo`; daftar produk difilter dan diurutkan di dalam `useMemo`.
- `useDeferredValue` pada pencarian agar ketikan tetap responsif.
- `Map` untuk lookup nama kategori, bukan `Array.find` berulang.
- Grafik admin memakai SVG/CSS sendiri, tanpa pustaka chart tambahan.
