import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowRight, Tag } from 'lucide-react';
import CartItem from '../components/CartItem.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import Button from '../components/ui/Button.jsx';
import { useStore } from '../context/StoreContext.jsx';
import { formatRupiah } from '../utils/format.js';

export const ONGKIR = 12000;

export default function Cart() {
  const { cart, subtotal, savings, clearCart } = useStore();
  const ongkir = cart.length ? ONGKIR : 0;
  const total = subtotal + ongkir;

  return (
    <div className="container-page py-10 sm:py-14">
      <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">Keranjang Belanja</h1>
      <p className="mt-2 text-[15px] text-muted">{cart.length} produk dalam keranjang Anda.</p>

      {cart.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            icon={ShoppingCart}
            title="Keranjang masih kosong"
            description="Mulai belanja kebutuhan kesehatan Anda. Produk yang ditambahkan akan muncul di sini."
            action={<Button to="/products">Mulai Belanja</Button>}
          />
        </div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          <section className="card p-5 sm:p-6">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <h2 className="text-base font-bold text-ink">Produk</h2>
              <button
                type="button"
                onClick={clearCart}
                className="text-sm font-semibold text-muted transition hover:text-red-600"
              >
                Kosongkan
              </button>
            </div>
            <div>
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </section>

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="card p-5 sm:p-6">
              <h2 className="text-base font-bold text-ink">Ringkasan Belanja</h2>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted">Subtotal</dt>
                  <dd className="font-semibold text-ink">{formatRupiah(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Diskon</dt>
                  <dd className="font-semibold text-brand-700">-{formatRupiah(savings)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Ongkos Kirim</dt>
                  <dd className="font-semibold text-ink">{formatRupiah(ongkir)}</dd>
                </div>
                <div className="flex justify-between border-t border-line pt-3">
                  <dt className="font-bold text-ink">Total</dt>
                  <dd className="font-display text-xl font-extrabold text-ink">{formatRupiah(total)}</dd>
                </div>
              </dl>

              <Button to="/checkout" size="lg" className="mt-6 w-full">
                Lanjut ke Checkout <ArrowRight size={18} />
              </Button>
              <Link
                to="/products"
                className="mt-3 block text-center text-sm font-semibold text-muted transition hover:text-brand-700"
              >
                Lanjut belanja
              </Link>

              {savings > 0 ? (
                <p className="mt-5 flex items-center gap-2 rounded-xl bg-brand-50 p-3 text-xs font-medium text-brand-700">
                  <Tag size={15} aria-hidden="true" /> Anda hemat {formatRupiah(savings)} hari ini.
                </p>
              ) : null}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
