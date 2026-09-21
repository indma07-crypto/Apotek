import { Tag, MessageCircle, BarChart3, Settings } from 'lucide-react';
import BarChart from '../../components/BarChart.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Button from '../../components/ui/Button.jsx';
import { weeklySales, topProducts } from '../../data/seed.js';
import { useStore } from '../../context/StoreContext.jsx';
import { formatRupiah } from '../../utils/format.js';

const shortRupiah = (v) => 'Rp' + (v / 1000000).toFixed(1) + ' jt';

const promos = [
  { kode: 'SEHAT10', desk: 'Diskon 10% semua vitamin', aktif: true, periode: '1-30 Sep 2026' },
  { kode: 'ONGKIRGRATIS', desk: 'Gratis ongkir min. belanja Rp100.000', aktif: true, periode: '1-31 Sep 2026' },
  { kode: 'SKINCARE25', desk: 'Potongan Rp25.000 produk perawatan wajah', aktif: false, periode: '1-15 Agt 2026' },
];

export function AdminPromos() {
  const { notify } = useStore();
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">Promo</h1>
          <p className="mt-1.5 text-sm text-muted">Kelola kode promo dan periode aktif.</p>
        </div>
        <Button onClick={() => notify('Formulir promo menyusul.', 'info')}>
          <Tag size={18} /> Buat Promo
        </Button>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {promos.map((p) => (
          <div key={p.kode} className="card p-5">
            <div className="flex items-center justify-between">
              <span className="rounded-lg bg-canvas px-3 py-1.5 font-mono text-sm font-bold text-ink">{p.kode}</span>
              <Badge tone={p.aktif ? 'brand' : 'neutral'}>{p.aktif ? 'Aktif' : 'Berakhir'}</Badge>
            </div>
            <p className="mt-4 text-sm text-ink">{p.desk}</p>
            <p className="mt-1 text-xs text-muted">{p.periode}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const konsultasi = [
  { nama: 'Rani Puspita', pesan: 'Vitamin apa yang cocok untuk anak 6 tahun?', waktu: '5 menit lalu', status: 'Baru' },
  { nama: 'Bagas Pratama', pesan: 'Apakah tensimeter ini bergaransi?', waktu: '32 menit lalu', status: 'Dijawab' },
  { nama: 'Siti Aminah', pesan: 'Tebus resep bisa dikirim hari ini?', waktu: '2 jam lalu', status: 'Dijawab' },
];

export function AdminConsultations() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-extrabold text-ink">Konsultasi</h1>
        <p className="mt-1.5 text-sm text-muted">Antrean pertanyaan pelanggan untuk apoteker.</p>
      </header>
      <ul className="grid gap-4 lg:grid-cols-2">
        {konsultasi.map((k) => (
          <li key={k.nama} className="card p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-50 text-brand-600">
                  <MessageCircle size={19} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">{k.nama}</p>
                  <p className="text-xs text-muted">{k.waktu}</p>
                </div>
              </div>
              <Badge tone={k.status === 'Baru' ? 'warn' : 'brand'}>{k.status}</Badge>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">{k.pesan}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AdminReports() {
  const { orders } = useStore();
  const total = orders.reduce((s, o) => s + o.total, 0);
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-extrabold text-ink">Laporan</h1>
        <p className="mt-1.5 text-sm text-muted">Ringkasan penjualan dan produk terlaris.</p>
      </header>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ['Total transaksi', orders.length],
          ['Nilai penjualan', formatRupiah(total)],
          ['Rata-rata pesanan', formatRupiah(orders.length ? total / orders.length : 0)],
        ].map(([label, value]) => (
          <div key={label} className="card p-5">
            <p className="text-sm text-muted">{label}</p>
            <p className="mt-1 font-display text-xl font-extrabold text-ink">{value}</p>
          </div>
        ))}
      </div>
      <section className="card p-5 sm:p-6">
        <h2 className="flex items-center gap-2 text-base font-bold text-ink">
          <BarChart3 size={18} className="text-brand-600" aria-hidden="true" /> Penjualan Mingguan
        </h2>
        <div className="mt-6">
          <BarChart data={weeklySales} formatValue={shortRupiah} />
        </div>
      </section>
      <section className="card p-5 sm:p-6">
        <h2 className="text-base font-bold text-ink">Produk Terlaris</h2>
        <ul className="mt-4 divide-y divide-line text-sm">
          {topProducts.map((p) => (
            <li key={p.name} className="flex justify-between py-3">
              <span className="text-ink">{p.name}</span>
              <span className="font-semibold text-muted">{p.sold} terjual</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export function AdminSettings() {
  const { notify } = useStore();
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-extrabold text-ink">Pengaturan</h1>
        <p className="mt-1.5 text-sm text-muted">Profil apotek dan preferensi operasional.</p>
      </header>
      <div className="card max-w-2xl p-6">
        <h2 className="flex items-center gap-2 text-base font-bold text-ink">
          <Settings size={18} className="text-brand-600" aria-hidden="true" /> Profil Apotek
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="label" htmlFor="s-nama">Nama apotek</label>
            <input id="s-nama" className="input" defaultValue="Apotek Sehat Bersama" />
          </div>
          <div>
            <label className="label" htmlFor="s-wa">Nomor WhatsApp</label>
            <input id="s-wa" className="input" defaultValue="0811-2345-6789" />
          </div>
          <div>
            <label className="label" htmlFor="s-email">Email</label>
            <input id="s-email" className="input" defaultValue="halo@apoteksehatbersama.id" />
          </div>
          <div className="sm:col-span-2">
            <label className="label" htmlFor="s-alamat">Alamat</label>
            <textarea id="s-alamat" rows={3} className="input resize-none" defaultValue="Jl. Kesehatan Raya No. 27, Kebayoran Baru, Jakarta Selatan 12140" />
          </div>
        </div>
        <Button className="mt-6" onClick={() => notify('Pengaturan disimpan.')}>Simpan Perubahan</Button>
      </div>
    </div>
  );
}
