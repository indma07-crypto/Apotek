import { ShieldCheck, Truck, Stethoscope, Lock } from 'lucide-react';

const items = [
  { Icon: ShieldCheck, title: 'Produk Terjamin', text: 'Produk berasal dari sumber terpercaya.' },
  { Icon: Truck, title: 'Pengiriman Cepat', text: 'Pesanan diproses dengan cepat.' },
  { Icon: Stethoscope, title: 'Apoteker Profesional', text: 'Konsultasi dengan tenaga profesional.' },
  { Icon: Lock, title: 'Pembayaran Aman', text: 'Berbagai metode pembayaran tersedia.' },
];

export default function TrustSection() {
  return (
    <section className="container-page py-14 sm:py-16">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ Icon, title, text }) => (
          <div key={title} className="card card-hover p-5">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-base font-bold text-ink">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
