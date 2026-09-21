import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import StatusPill from './ui/StatusPill.jsx';
import ProductArt from './ui/ProductArt.jsx';
import { formatRupiah, formatDate } from '../utils/format.js';

export default function OrderCard({ order }) {
  return (
    <article className="card p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <div>
          <p className="text-sm font-bold text-ink">{order.id}</p>
          <p className="text-xs text-muted">{formatDate(order.date)}</p>
        </div>
        <StatusPill status={order.status} />
      </div>

      <ul className="space-y-3 py-4">
        {order.items.map((it) => (
          <li key={it.id} className="flex items-center gap-3">
            <ProductArt category={it.category} name={it.name} size={20} className="h-12 w-12 shrink-0 rounded-lg" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-ink">{it.name}</span>
              <span className="text-xs text-muted">
                {it.qty} x {formatRupiah(it.price)}
              </span>
            </span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
        <div>
          <p className="text-xs text-muted">Total pembayaran</p>
          <p className="text-base font-extrabold text-ink">{formatRupiah(order.total)}</p>
        </div>
        <Link
          to={`/orders/${order.id}`}
          className="inline-flex h-11 items-center gap-2 rounded-xl border border-line px-4 text-sm font-semibold text-ink transition hover:border-brand-300 hover:text-brand-700"
        >
          Lihat Detail <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
