import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Truck, Wallet, ReceiptText } from 'lucide-react';
import StatusPill from '../components/ui/StatusPill.jsx';
import ProductArt from '../components/ui/ProductArt.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import Button from '../components/ui/Button.jsx';
import { useStore } from '../context/StoreContext.jsx';
import { formatRupiah, formatDate } from '../utils/format.js';

export default function OrderDetail() {
  const { id } = useParams();
  const { orders } = useStore();
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="container-page py-20">
        <EmptyState
          icon={ReceiptText}
          title="Pesanan tidak ditemukan"
          description="Nomor pesanan tidak terdaftar pada akun ini."
          action={<Button to="/orders">Kembali ke Pesanan</Button>}
        />
      </div>
    );
  }

  const subtotal = order.items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="container-page py-10 sm:py-14">
      <Link to="/orders" className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-brand-700">
        <ArrowLeft size={16} /> Kembali ke Pesanan
      </Link>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">{order.id}</h1>
          <p className="mt-1 text-sm text-muted">Dipesan pada {formatDate(order.date)}</p>
        </div>
        <StatusPill status={order.status} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="card p-5 sm:p-6">
          <h2 className="text-base font-bold text-ink">Produk Dipesan</h2>
          <ul className="mt-5 divide-y divide-line">
            {order.items.map((i) => (
              <li key={i.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                <ProductArt category={i.category} name={i.name} size={24} className="h-16 w-16 shrink-0 rounded-xl" />
                <div className="min-w-0 flex-1">
                  <Link to={`/products/${i.id}`} className="block truncate text-sm font-bold text-ink hover:text-brand-700">
                    {i.name}
                  </Link>
                  <p className="text-xs text-muted">{i.qty} x {formatRupiah(i.price)}</p>
                </div>
                <p className="text-sm font-extrabold text-ink">{formatRupiah(i.price * i.qty)}</p>
              </li>
            ))}
          </ul>
        </section>

        <aside className="space-y-6">
          <div className="card p-5 sm:p-6">
            <h2 className="text-base font-bold text-ink">Informasi Pengiriman</h2>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin size={17} className="mt-0.5 shrink-0 text-brand-600" aria-hidden="true" />
                <span>
                  <span className="block font-semibold text-ink">{order.customer}</span>
                  <span className="block text-muted">{order.address}</span>
                </span>
              </li>
              <li className="flex gap-3">
                <Truck size={17} className="mt-0.5 shrink-0 text-brand-600" aria-hidden="true" />
                <span className="text-muted">{order.shipping}</span>
              </li>
              <li className="flex gap-3">
                <Wallet size={17} className="mt-0.5 shrink-0 text-brand-600" aria-hidden="true" />
                <span className="text-muted">{order.payment}</span>
              </li>
            </ul>
          </div>

          <div className="card p-5 sm:p-6">
            <h2 className="text-base font-bold text-ink">Rincian Pembayaran</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Subtotal</dt>
                <dd className="font-semibold text-ink">{formatRupiah(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Diskon</dt>
                <dd className="font-semibold text-brand-700">-{formatRupiah(order.discount || 0)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Ongkos Kirim</dt>
                <dd className="font-semibold text-ink">{formatRupiah(order.shippingCost)}</dd>
              </div>
              <div className="flex justify-between border-t border-line pt-3">
                <dt className="font-bold text-ink">Total</dt>
                <dd className="font-display text-lg font-extrabold text-ink">{formatRupiah(order.total)}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}
