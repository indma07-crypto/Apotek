import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ChevronRight, Minus, Plus, ShoppingCart, Zap, ShieldCheck, Truck, AlertTriangle, PackageSearch,
} from 'lucide-react';
import ProductArt from '../components/ui/ProductArt.jsx';
import Rating from '../components/ui/Rating.jsx';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import { getProduct, products } from '../data/products.js';
import { categories } from '../data/categories.js';
import { formatRupiah, discountPercent } from '../utils/format.js';
import { useStore } from '../context/StoreContext.jsx';

const tabs = [
  { id: 'deskripsi', label: 'Deskripsi' },
  { id: 'informasi', label: 'Informasi Produk' },
  { id: 'komposisi', label: 'Komposisi' },
  { id: 'aturan', label: 'Aturan Penggunaan' },
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useStore();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('deskripsi');
  const [thumb, setThumb] = useState(0);

  const product = getProduct(id);
  const related = useMemo(
    () => (product ? products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4) : []),
    [product]
  );

  if (!product) {
    return (
      <div className="container-page py-20">
        <EmptyState
          icon={PackageSearch}
          title="Produk tidak ditemukan."
          description="Produk mungkin sudah tidak tersedia. Silakan telusuri produk lainnya."
          action={<Button to="/products">Lihat Semua Produk</Button>}
        />
      </div>
    );
  }

  const category = categories.find((c) => c.id === product.category);
  const off = discountPercent(product.price, product.oldPrice);

  const beliSekarang = () => {
    addToCart(product, qty);
    navigate('/checkout');
  };

  const isiTab = {
    deskripsi: product.description,
    informasi: `${product.brand} · ${product.unit}. Simpan di suhu ruang, terlindung dari cahaya matahari langsung dan jauhkan dari jangkauan anak-anak.`,
    komposisi: product.composition,
    aturan: product.usage,
  }[tab];

  return (
    <div className="container-page py-8 sm:py-12">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-xs text-muted">
        <Link to="/" className="hover:text-brand-700">Beranda</Link>
        <ChevronRight size={13} aria-hidden="true" />
        <Link to="/products" className="hover:text-brand-700">Produk</Link>
        <ChevronRight size={13} aria-hidden="true" />
        <Link to={`/products?category=${product.category}`} className="hover:text-brand-700">{category?.name}</Link>
        <ChevronRight size={13} aria-hidden="true" />
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <ProductArt
            category={product.category}
            name={product.name}
            size={96}
            className="aspect-square w-full rounded-3xl border border-line"
          />
          <div className="mt-4 grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => setThumb(i)}
                aria-label={`Lihat gambar ${i + 1}`}
                aria-pressed={thumb === i}
                className={`overflow-hidden rounded-xl border transition ${
                  thumb === i ? 'border-brand-600 ring-2 ring-brand-500/20' : 'border-line hover:border-brand-300'
                }`}
              >
                <ProductArt category={product.category} name={product.name} size={24} className="aspect-square w-full" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="brand">{category?.name}</Badge>
            {product.badge ? <Badge tone="warn">{product.badge}</Badge> : null}
            {product.requiresPrescription ? <Badge tone="info">Perlu Resep</Badge> : null}
          </div>

          <h1 className="mt-3 font-display text-2xl font-extrabold leading-tight text-ink sm:text-3xl">
            {product.name}
          </h1>
          <p className="mt-1.5 text-sm text-muted">
            {product.brand} &middot; {product.unit}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-4">
            <Rating value={product.rating} reviews={product.reviews} size={16} />
            <span className="text-xs text-muted">{product.sold} terjual</span>
          </div>

          <div className="mt-6 rounded-2xl bg-canvas p-5">
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="font-display text-3xl font-extrabold text-ink">{formatRupiah(product.price)}</span>
              {product.oldPrice ? (
                <>
                  <span className="text-sm text-muted line-through">{formatRupiah(product.oldPrice)}</span>
                  <Badge tone="danger">Hemat {off}%</Badge>
                </>
              ) : null}
            </div>
            <p className="mt-2 text-sm text-muted">
              Stok tersedia:{' '}
              <span className={product.stock > 20 ? 'font-semibold text-brand-700' : 'font-semibold text-amber-600'}>
                {product.stock} unit
              </span>
            </p>
          </div>

          {product.requiresPrescription ? (
            <div className="mt-4 flex gap-3 rounded-2xl border border-info-100 bg-info-50 p-4">
              <AlertTriangle size={19} className="mt-0.5 shrink-0 text-info-600" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-info-700">
                Produk tertentu hanya dapat dibeli dengan resep dokter. Tim apoteker kami akan memverifikasi resep Anda
                sebelum pesanan diproses.
              </p>
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <span className="text-sm font-semibold text-ink">Jumlah</span>
            <div className="inline-flex items-center rounded-xl border border-line">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={qty <= 1}
                aria-label="Kurangi jumlah"
                className="grid h-11 w-11 place-items-center rounded-l-xl transition hover:bg-black/[.04] disabled:opacity-40"
              >
                <Minus size={16} />
              </button>
              <span className="w-12 text-center font-semibold" aria-live="polite">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                disabled={qty >= product.stock}
                aria-label="Tambah jumlah"
                className="grid h-11 w-11 place-items-center rounded-r-xl transition hover:bg-black/[.04] disabled:opacity-40"
              >
                <Plus size={16} />
              </button>
            </div>
            <span className="text-sm text-muted">
              Subtotal <strong className="text-ink">{formatRupiah(product.price * qty)}</strong>
            </span>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button onClick={() => addToCart(product, qty)} variant="secondary" size="lg" className="flex-1">
              <ShoppingCart size={18} /> Tambah ke Keranjang
            </Button>
            <Button onClick={beliSekarang} size="lg" className="flex-1">
              <Zap size={18} /> Beli Sekarang
            </Button>
          </div>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            <li className="flex items-center gap-2.5 rounded-xl border border-line p-3 text-sm text-muted">
              <ShieldCheck size={18} className="text-brand-600" aria-hidden="true" /> Produk asli bersegel
            </li>
            <li className="flex items-center gap-2.5 rounded-xl border border-line p-3 text-sm text-muted">
              <Truck size={18} className="text-info-600" aria-hidden="true" /> Dikirim hari ini
            </li>
          </ul>
        </div>
      </div>

      <section className="card mt-12 overflow-hidden">
        <div className="no-scrollbar flex gap-1 overflow-x-auto border-b border-line px-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              aria-pressed={tab === t.id}
              className={`h-12 shrink-0 px-4 text-sm font-semibold transition ${
                tab === t.id ? 'border-b-2 border-brand-600 text-brand-700' : 'text-muted hover:text-ink'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <p className="p-6 text-[15px] leading-relaxed text-muted">{isiTab}</p>
      </section>

      {related.length > 0 ? (
        <section className="mt-14">
          <h2 className="section-title">Produk Terkait</h2>
          <div className="mt-6">
            <ProductGrid items={related} />
          </div>
        </section>
      ) : null}
    </div>
  );
}
