import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Logo from './Logo.jsx';

const kolom = [
  {
    title: 'Jelajahi',
    links: [
      { to: '/products', label: 'Semua Produk' },
      { to: '/categories', label: 'Kategori' },
      { to: '/consultation', label: 'Konsultasi Apoteker' },
      { to: '/orders', label: 'Pesanan Saya' },
    ],
  },
  {
    title: 'Perusahaan',
    links: [
      { to: '/about', label: 'Tentang Kami' },
      { to: '/contact', label: 'Kontak' },
      { to: '/admin', label: 'Panel Admin' },
      { to: '/login', label: 'Masuk' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-white">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2 lg:pr-10">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            Apotek Sehat Bersama menyediakan obat, vitamin, dan kebutuhan kesehatan dengan layanan apoteker
            profesional. Kesehatan Anda, Prioritas Kami.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-muted">
            <li className="flex gap-2.5">
              <MapPin size={17} className="mt-0.5 shrink-0 text-brand-600" aria-hidden="true" />
              Jl. Kesehatan Raya No. 27, Jakarta Selatan 12140
            </li>
            <li className="flex gap-2.5">
              <Phone size={17} className="mt-0.5 shrink-0 text-brand-600" aria-hidden="true" />
              0811-2345-6789 (WhatsApp)
            </li>
            <li className="flex gap-2.5">
              <Mail size={17} className="mt-0.5 shrink-0 text-brand-600" aria-hidden="true" />
              halo@apoteksehatbersama.id
            </li>
            <li className="flex gap-2.5">
              <Clock size={17} className="mt-0.5 shrink-0 text-brand-600" aria-hidden="true" />
              Senin-Sabtu 07.00-22.00, Minggu 08.00-20.00
            </li>
          </ul>
        </div>

        {kolom.map((k) => (
          <div key={k.title}>
            <h3 className="text-sm font-bold text-ink">{k.title}</h3>
            <ul className="mt-4 space-y-3">
              {k.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-muted transition hover:text-brand-700">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Apotek Sehat Bersama. Seluruh hak cipta dilindungi.</p>
          <p>SIA: 449/SIA/2026 &middot; APJ: apt. Dewi Lestari, S.Farm.</p>
        </div>
      </div>
    </footer>
  );
}
