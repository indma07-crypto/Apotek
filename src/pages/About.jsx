import { MapPin, Clock, Target, Eye, Award, Truck, Stethoscope, ShieldCheck } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import Badge from '../components/ui/Badge.jsx';

const misi = [
  'Menyediakan obat dan produk kesehatan yang asli, aman, dan terjangkau.',
  'Memberikan layanan konsultasi apoteker yang mudah diakses setiap hari.',
  'Mempercepat distribusi kebutuhan kesehatan melalui layanan antar.',
  'Mengedukasi masyarakat tentang penggunaan obat yang rasional.',
];

const layanan = [
  { Icon: Stethoscope, title: 'Konsultasi Apoteker', text: 'Tanya dosis, interaksi obat, dan pilihan produk.' },
  { Icon: Truck, title: 'Antar Cepat', text: 'Pengiriman same-day untuk area Jabodetabek.' },
  { Icon: ShieldCheck, title: 'Tebus Resep', text: 'Unggah resep dokter, kami siapkan obatnya.' },
  { Icon: Award, title: 'Produk Terkurasi', text: 'Seluruh produk bersumber dari distributor resmi.' },
];

const jam = [
  ['Senin - Jumat', '07.00 - 22.00'],
  ['Sabtu', '07.00 - 22.00'],
  ['Minggu', '08.00 - 20.00'],
  ['Hari Libur Nasional', '09.00 - 18.00'],
];

export default function About() {
  return (
    <div className="container-page py-12 sm:py-16">
      <div className="max-w-2xl">
        <Badge tone="brand">TENTANG KAMI</Badge>
        <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
          Tentang Apotek Sehat Bersama
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">
          Berdiri sejak 2014, Apotek Sehat Bersama melayani lebih dari 40.000 pelanggan di Jakarta dan sekitarnya. Kami
          menggabungkan apotek fisik dengan layanan digital agar kebutuhan kesehatan keluarga Anda selalu terpenuhi,
          kapan pun dibutuhkan.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          ['12 Tahun', 'Melayani masyarakat'],
          ['40.000+', 'Pelanggan terdaftar'],
          ['6 Apoteker', 'Berizin praktik aktif'],
        ].map(([v, l]) => (
          <div key={l} className="card p-5">
            <p className="font-display text-2xl font-extrabold text-brand-700">{v}</p>
            <p className="mt-1 text-sm text-muted">{l}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        <div className="card p-6">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
            <Eye size={20} aria-hidden="true" />
          </span>
          <h2 className="mt-4 text-lg font-bold text-ink">Visi</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">
            Menjadi apotek digital tepercaya yang membuat akses obat dan layanan kefarmasian mudah dijangkau setiap
            keluarga Indonesia.
          </p>
        </div>
        <div className="card p-6">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
            <Target size={20} aria-hidden="true" />
          </span>
          <h2 className="mt-4 text-lg font-bold text-ink">Misi</h2>
          <ul className="mt-2 space-y-2">
            {misi.map((m) => (
              <li key={m} className="flex gap-2.5 text-[15px] leading-relaxed text-muted">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
                {m}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section className="mt-14">
        <SectionHeading title="Layanan Kami" description="Empat layanan utama yang paling sering digunakan pelanggan." />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {layanan.map(({ Icon, title, text }) => (
            <div key={title} className="card card-hover p-5">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-bold text-ink">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-[360px_1fr]">
        <div className="card p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold text-ink">
            <Clock size={19} className="text-brand-600" aria-hidden="true" /> Jam Operasional
          </h2>
          <dl className="mt-4 divide-y divide-line text-sm">
            {jam.map(([h, t]) => (
              <div key={h} className="flex justify-between gap-4 py-3">
                <dt className="text-muted">{h}</dt>
                <dd className="font-semibold text-ink">{t}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 flex gap-2.5 text-sm text-muted">
            <MapPin size={17} className="mt-0.5 shrink-0 text-brand-600" aria-hidden="true" />
            Jl. Kesehatan Raya No. 27, Kebayoran Baru, Jakarta Selatan 12140
          </p>
        </div>

        {/* Placeholder Google Maps: ganti dengan <iframe> embed saat API key tersedia. */}
        <div className="card grid min-h-[280px] place-items-center bg-canvas p-6 text-center">
          <div>
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white text-brand-600 shadow-card">
              <MapPin size={26} aria-hidden="true" />
            </span>
            <p className="mt-4 text-sm font-bold text-ink">Peta Lokasi Apotek</p>
            <p className="mt-1 text-sm text-muted">Placeholder Google Maps. Sematkan iframe embed di sini.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
