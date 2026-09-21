import { useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, Truck, Wallet, ShieldCheck, LocateFixed, ShoppingCart } from 'lucide-react';
import Button from '../components/ui/Button.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import ProductArt from '../components/ui/ProductArt.jsx';
import { useStore } from '../context/StoreContext.jsx';
import { formatRupiah, orderNumber } from '../utils/format.js';

const pengiriman = [
  { id: 'Regular', label: 'Regular', desc: 'Estimasi 2-3 hari kerja', cost: 12000 },
  { id: 'Express', label: 'Express', desc: 'Estimasi 3-6 jam (area Jakarta)', cost: 22000 },
  { id: 'Ambil di Apotek', label: 'Ambil di Apotek', desc: 'Siap diambil dalam 1 jam', cost: 0 },
];

const pembayaran = [
  { id: 'Transfer Bank', desc: 'BCA, Mandiri, BNI, BRI' },
  { id: 'E-Wallet', desc: 'GoPay, OVO, DANA, ShopeePay' },
  { id: 'QRIS', desc: 'Scan dari aplikasi apa pun' },
  { id: 'COD', desc: 'Bayar saat pesanan tiba' },
];

const emptyForm = {
  nama: '', wa: '', provinsi: '', kota: '', kecamatan: '', alamat: '',
};

export default function Checkout() {
  const { cart, subtotal, savings, user, createOrder, notify } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ ...emptyForm, nama: user?.name || '', wa: user?.phone || '' });
  const [kirim, setKirim] = useState('Regular');
  const [bayar, setBayar] = useState('QRIS');
  const [errors, setErrors] = useState({});

  const ongkir = useMemo(() => pengiriman.find((p) => p.id === kirim)?.cost ?? 0, [kirim]);
  const total = subtotal + ongkir;

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const pakaiLokasi = () => {
    setForm((f) => ({
      ...f,
      provinsi: 'DKI Jakarta',
      kota: 'Jakarta Selatan',
      kecamatan: 'Kebayoran Baru',
      alamat: f.alamat || 'Jl. Kesehatan Raya No. 27',
    }));
    notify('Lokasi perkiraan berhasil diisi.', 'info');
  };

  const validate = () => {
    const next = {};
    if (!form.nama.trim()) next.nama = 'Nama penerima wajib diisi.';
    if (!/^[0-9+\-\s]{9,}$/.test(form.wa.trim())) next.wa = 'Nomor WhatsApp tidak valid.';
    if (!form.provinsi.trim()) next.provinsi = 'Provinsi wajib diisi.';
    if (!form.kota.trim()) next.kota = 'Kabupaten/Kota wajib diisi.';
    if (!form.kecamatan.trim()) next.kecamatan = 'Kecamatan wajib diisi.';
    if (form.alamat.trim().length < 8) next.alamat = 'Tulis detail alamat minimal 8 karakter.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const bayarSekarang = () => {
    if (!validate()) {
      notify('Periksa kembali data pengiriman Anda.', 'info');
      return;
    }
    const order = {
      id: orderNumber(),
      date: new Date().toISOString(),
      customer: form.nama,
      status: 'Diproses',
      payment: bayar,
      shipping: kirim,
      address: `${form.alamat}, ${form.kecamatan}, ${form.kota}, ${form.provinsi}`,
      phone: form.wa,
      items: cart.map((i) => ({ id: i.id, name: i.name, price: i.price, qty: i.qty, category: i.category })),
      shippingCost: ongkir,
      discount: savings,
      total,
    };
    createOrder(order);
    navigate('/order-success', { state: { order }, replace: true });
  };

  if (cart.length === 0) {
    return (
      <div className="container-page py-20">
        <EmptyState
          icon={ShoppingCart}
          title="Tidak ada produk untuk di-checkout"
          description="Tambahkan produk ke keranjang terlebih dahulu sebelum melanjutkan pembayaran."
          action={<Button to="/products">Lihat Produk</Button>}
        />
      </div>
    );
  }

  const field = (key, label, props = {}) => (
    <div>
      <label className="label" htmlFor={key}>{label}</label>
      <input
        id={key}
        className={`input ${errors[key] ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : ''}`}
        value={form[key]}
        onChange={set(key)}
        aria-invalid={Boolean(errors[key])}
        aria-describedby={errors[key] ? `${key}-error` : undefined}
        {...props}
      />
      {errors[key] ? (
        <p id={`${key}-error`} className="mt-1.5 text-xs font-medium text-red-600">{errors[key]}</p>
      ) : null}
    </div>
  );

  return (
    <div className="container-page py-10 sm:py-14">
      <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">Checkout</h1>
      <p className="mt-2 text-[15px] text-muted">Lengkapi data pengiriman dan pilih metode pembayaran.</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <section className="card p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="flex items-center gap-2 text-base font-bold text-ink">
                <MapPin size={18} className="text-brand-600" aria-hidden="true" /> Alamat Pengiriman
              </h2>
              <button
                type="button"
                onClick={pakaiLokasi}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-line px-3 text-sm font-semibold text-brand-700 transition hover:border-brand-300"
              >
                <LocateFixed size={16} /> Gunakan lokasi saya
              </button>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {field('nama', 'Nama penerima', { placeholder: 'Nama lengkap penerima' })}
              {field('wa', 'Nomor WhatsApp', { placeholder: '0812-3456-7890', inputMode: 'tel' })}
              {field('provinsi', 'Provinsi', { placeholder: 'DKI Jakarta' })}
              {field('kota', 'Kabupaten/Kota', { placeholder: 'Jakarta Selatan' })}
              {field('kecamatan', 'Kecamatan', { placeholder: 'Kebayoran Baru' })}
              <div className="sm:col-span-2">
                <label className="label" htmlFor="alamat">Detail alamat</label>
                <textarea
                  id="alamat"
                  rows={3}
                  className={`input resize-none ${errors.alamat ? 'border-red-400' : ''}`}
                  placeholder="Nama jalan, nomor rumah, RT/RW, patokan"
                  value={form.alamat}
                  onChange={set('alamat')}
                  aria-invalid={Boolean(errors.alamat)}
                />
                {errors.alamat ? <p className="mt-1.5 text-xs font-medium text-red-600">{errors.alamat}</p> : null}
              </div>
            </div>
          </section>

          <section className="card p-5 sm:p-6">
            <h2 className="flex items-center gap-2 text-base font-bold text-ink">
              <Truck size={18} className="text-brand-600" aria-hidden="true" /> Metode Pengiriman
            </h2>
            <div className="mt-5 grid gap-3">
              {pengiriman.map((p) => (
                <label
                  key={p.id}
                  className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition ${
                    kirim === p.id ? 'border-brand-600 bg-brand-50/60' : 'border-line hover:border-brand-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="pengiriman"
                    value={p.id}
                    checked={kirim === p.id}
                    onChange={() => setKirim(p.id)}
                    className="h-4 w-4 accent-brand-600"
                  />
                  <span className="flex-1">
                    <span className="block text-sm font-bold text-ink">{p.label}</span>
                    <span className="block text-xs text-muted">{p.desc}</span>
                  </span>
                  <span className="text-sm font-semibold text-ink">
                    {p.cost === 0 ? 'Gratis' : formatRupiah(p.cost)}
                  </span>
                </label>
              ))}
            </div>
          </section>

          <section className="card p-5 sm:p-6">
            <h2 className="flex items-center gap-2 text-base font-bold text-ink">
              <Wallet size={18} className="text-brand-600" aria-hidden="true" /> Metode Pembayaran
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {pembayaran.map((p) => (
                <label
                  key={p.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${
                    bayar === p.id ? 'border-brand-600 bg-brand-50/60' : 'border-line hover:border-brand-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="pembayaran"
                    value={p.id}
                    checked={bayar === p.id}
                    onChange={() => setBayar(p.id)}
                    className="h-4 w-4 accent-brand-600"
                  />
                  <span>
                    <span className="block text-sm font-bold text-ink">{p.id}</span>
                    <span className="block text-xs text-muted">{p.desc}</span>
                  </span>
                </label>
              ))}
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="card p-5 sm:p-6">
            <h2 className="text-base font-bold text-ink">Ringkasan Pesanan</h2>
            <ul className="mt-5 space-y-4">
              {cart.map((i) => (
                <li key={i.id} className="flex items-center gap-3">
                  <ProductArt category={i.category} name={i.name} size={20} className="h-12 w-12 shrink-0 rounded-lg" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-ink">{i.name}</span>
                    <span className="text-xs text-muted">{i.qty} x {formatRupiah(i.price)}</span>
                  </span>
                  <span className="text-sm font-semibold text-ink">{formatRupiah(i.price * i.qty)}</span>
                </li>
              ))}
            </ul>

            <dl className="mt-5 space-y-3 border-t border-line pt-5 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Subtotal</dt>
                <dd className="font-semibold text-ink">{formatRupiah(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Diskon</dt>
                <dd className="font-semibold text-brand-700">-{formatRupiah(savings)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Ongkos Kirim</dt>
                <dd className="font-semibold text-ink">{ongkir === 0 ? 'Gratis' : formatRupiah(ongkir)}</dd>
              </div>
              <div className="flex justify-between border-t border-line pt-3">
                <dt className="font-bold text-ink">Total Pembayaran</dt>
                <dd className="font-display text-xl font-extrabold text-ink">{formatRupiah(total)}</dd>
              </div>
            </dl>

            <Button onClick={bayarSekarang} size="lg" className="mt-6 w-full">
              Bayar Sekarang
            </Button>
            <p className="mt-3 flex items-center justify-center gap-2 text-xs text-muted">
              <ShieldCheck size={14} className="text-brand-600" aria-hidden="true" /> Transaksi dienkripsi dan aman.
            </p>
            <Link to="/cart" className="mt-3 block text-center text-sm font-semibold text-muted hover:text-brand-700">
              Kembali ke keranjang
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
