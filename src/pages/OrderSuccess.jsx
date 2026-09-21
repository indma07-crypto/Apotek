import { Link, useLocation, Navigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button.jsx';
import { formatRupiah } from '../utils/format.js';

export default function OrderSuccess() {
  const { state } = useLocation();
  const order = state?.order;
  if (!order) return <Navigate to="/orders" replace />;

  const estimasi = order.shipping === 'Express' ? 'Hari ini, 3-6 jam' : order.shipping === 'Ambil di Apotek' ? 'Siap diambil dalam 1 jam' : '2-3 hari kerja';

  return (
    <div className="container-page flex justify-center py-16 sm:py-24">
      <div className="card w-full max-w-lg p-8 text-center animate-slide-up sm:p-10">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-brand-50 text-brand-600">
          <CheckCircle2 size={44} strokeWidth={1.8} aria-hidden="true" />
        </span>
        <h1 className="mt-6 font-display text-2xl font-extrabold text-ink sm:text-3xl">Pesanan Berhasil!</h1>
        <p className="mt-2.5 text-[15px] text-muted">Terima kasih telah berbelanja di Apotek Sehat Bersama.</p>

        <dl className="mt-8 divide-y divide-line rounded-2xl border border-line text-left text-sm">
          {[
            ['Nomor pesanan', order.id],
            ['Total pembayaran', formatRupiah(order.total)],
            ['Metode pembayaran', order.payment],
            ['Estimasi pengiriman', estimasi],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between gap-4 px-4 py-3.5">
              <dt className="text-muted">{k}</dt>
              <dd className="text-right font-semibold text-ink">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button to={`/orders/${order.id}`} size="lg" className="flex-1">
            Lihat Pesanan <ArrowRight size={17} />
          </Button>
          <Button to="/" variant="secondary" size="lg" className="flex-1">
            Kembali ke Beranda
          </Button>
        </div>

        <p className="mt-6 text-xs text-muted">
          Butuh bantuan? <Link to="/consultation" className="font-semibold text-brand-700">Hubungi apoteker kami.</Link>
        </p>
      </div>
    </div>
  );
}
