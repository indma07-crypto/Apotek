import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import ProductArt from './ui/ProductArt.jsx';
import { formatRupiah } from '../utils/format.js';
import { useStore } from '../context/StoreContext.jsx';

export default function CartItem({ item }) {
  const { setQty, removeFromCart } = useStore();
  return (
    <div className="flex gap-4 border-b border-line py-5 last:border-b-0">
      <Link to={`/products/${item.id}`} className="shrink-0">
        <ProductArt category={item.category} name={item.name} size={28} className="h-20 w-20 rounded-xl sm:h-24 sm:w-24" />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link to={`/products/${item.id}`} className="block truncate text-[15px] font-bold text-ink hover:text-brand-700">
              {item.name}
            </Link>
            <p className="mt-0.5 text-xs text-muted">{item.unit}</p>
            <p className="mt-1.5 text-sm font-semibold text-brand-700">{formatRupiah(item.price)}</p>
          </div>
          <button
            type="button"
            onClick={() => removeFromCart(item.id)}
            aria-label={`Hapus ${item.name} dari keranjang`}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-muted transition hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={17} />
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <div className="inline-flex items-center rounded-xl border border-line">
            <button
              type="button"
              onClick={() => setQty(item.id, item.qty - 1)}
              aria-label="Kurangi jumlah"
              className="grid h-10 w-10 place-items-center rounded-l-xl text-ink transition hover:bg-black/[.04] disabled:opacity-40"
              disabled={item.qty <= 1}
            >
              <Minus size={15} />
            </button>
            <span className="w-10 text-center text-sm font-semibold" aria-live="polite">{item.qty}</span>
            <button
              type="button"
              onClick={() => setQty(item.id, item.qty + 1)}
              aria-label="Tambah jumlah"
              className="grid h-10 w-10 place-items-center rounded-r-xl text-ink transition hover:bg-black/[.04] disabled:opacity-40"
              disabled={item.qty >= item.stock}
            >
              <Plus size={15} />
            </button>
          </div>
          <p className="text-sm font-extrabold text-ink">{formatRupiah(item.price * item.qty)}</p>
        </div>
      </div>
    </div>
  );
}
