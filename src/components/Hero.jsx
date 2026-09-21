import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Pill, Leaf, Stethoscope, Truck, Package, HeartPulse } from 'lucide-react';
import Button from './ui/Button.jsx';
import Badge from './ui/Badge.jsx';

const tiles = [
  { Icon: Pill, label: 'Obat', tone: 'bg-brand-50 text-brand-600' },
  { Icon: Leaf, label: 'Vitamin', tone: 'bg-lime-50 text-lime-600' },
  { Icon: Stethoscope, label: 'Alat Kesehatan', tone: 'bg-info-50 text-info-600' },
  { Icon: HeartPulse, label: 'Perawatan', tone: 'bg-rose-50 text-rose-500' },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-white">
      <div
        className="pointer-events-none absolute -right-32 -top-40 h-[420px] w-[420px] rounded-full bg-brand-100/50 blur-3xl"
        aria-hidden="true"
      />
      <div className="container-page grid items-center gap-12 py-14 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div className="animate-slide-up">
          <Badge tone="brand">
            <ShieldCheck size={13} aria-hidden="true" /> APOTEK TERPERCAYA
          </Badge>
          <h1 className="mt-5 font-display text-[32px] font-extrabold leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-[56px]">
            Semua Kebutuhan Kesehatan, <span className="text-brand-600">Dalam Satu Tempat.</span>
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            Temukan obat, vitamin, produk kesehatan, dan kebutuhan sehari-hari dengan mudah dan cepat.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/products" size="lg">
              Belanja Sekarang <ArrowRight size={18} />
            </Button>
            <Button to="/categories" variant="secondary" size="lg">
              Lihat Produk
            </Button>
          </div>
          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-6">
            {[
              ['1000+', 'Produk tersedia'],
              ['24 Jam', 'Layanan konsultasi'],
              ['4.9/5', 'Rating pelanggan'],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="font-display text-xl font-extrabold text-ink">{v}</dt>
                <dd className="text-xs text-muted">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Visual hero: komposisi kartu produk + floating card */}
        <div className="relative animate-fade-in">
          <div className="card relative mx-auto max-w-md p-6 shadow-lift">
            <div className="flex items-center gap-3 border-b border-line pb-4">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-600 text-white">
                <Stethoscope size={22} aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-bold text-ink">apt. Dewi Lestari, S.Farm.</p>
                <p className="text-xs text-muted">Apoteker penanggung jawab &middot; Online</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {tiles.map(({ Icon, label, tone }) => (
                <div key={label} className="rounded-2xl border border-line p-4">
                  <span className={`grid h-10 w-10 place-items-center rounded-xl ${tone}`}>
                    <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <p className="mt-3 text-sm font-semibold text-ink">{label}</p>
                  <p className="text-xs text-muted">Tersedia hari ini</p>
                </div>
              ))}
            </div>
            <Link
              to="/consultation"
              className="mt-5 flex h-11 items-center justify-between rounded-xl bg-brand-50 px-4 text-sm font-semibold text-brand-700 transition hover:bg-brand-100"
            >
              Tanya apoteker sekarang <ArrowRight size={16} />
            </Link>
          </div>

          <div className="card absolute -left-2 top-8 hidden items-center gap-2.5 px-4 py-3 shadow-lift animate-float sm:flex lg:-left-8">
            <Package size={18} className="text-brand-600" aria-hidden="true" />
            <span className="text-sm font-semibold text-ink">1000+ Produk</span>
          </div>
          <div
            className="card absolute -right-2 top-1/3 hidden items-center gap-2.5 px-4 py-3 shadow-lift animate-float sm:flex lg:-right-6"
            style={{ animationDelay: '1.2s' }}
          >
            <Truck size={18} className="text-info-600" aria-hidden="true" />
            <span className="text-sm font-semibold text-ink">Pengiriman Cepat</span>
          </div>
          <div
            className="card absolute -bottom-4 left-6 hidden items-center gap-2.5 px-4 py-3 shadow-lift animate-float sm:flex"
            style={{ animationDelay: '2.4s' }}
          >
            <ShieldCheck size={18} className="text-brand-600" aria-hidden="true" />
            <span className="text-sm font-semibold text-ink">Apoteker Profesional</span>
          </div>
        </div>
      </div>
    </section>
  );
}
