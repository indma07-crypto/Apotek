import { MessageCircle, ArrowRight } from 'lucide-react';
import Button from './ui/Button.jsx';

export default function ConsultationCTA() {
  return (
    <section className="container-page py-14 sm:py-16">
      <div className="card relative overflow-hidden bg-brand-600 p-8 text-white sm:p-12">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-white/10"
          aria-hidden="true"
        />
        <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
              <MessageCircle size={14} aria-hidden="true" /> KONSULTASI GRATIS
            </span>
            <h2 className="mt-4 font-display text-2xl font-extrabold leading-tight sm:text-3xl">
              Butuh Bantuan Memilih Produk?
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-white/85">
              Konsultasikan kebutuhan kesehatan Anda dengan apoteker kami.
            </p>
          </div>
          <Button
            to="/consultation"
            size="lg"
            className="bg-white text-brand-700 hover:bg-brand-50 shadow-none w-full sm:w-auto"
          >
            Konsultasi Sekarang <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
}
