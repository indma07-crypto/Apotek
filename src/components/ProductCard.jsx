import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Plus, FileText } from 'lucide-react';
import Badge from './ui/Badge.jsx';
import Rating from './ui/Rating.jsx';
import ProductArt from './ui/ProductArt.jsx';
import { formatRupiah, discountPercent } from '../utils/format.js';
import { categories } from '../data/categories.js';
import { useStore } from '../context/StoreContext.jsx';

const categoryName = new Map(categories.map((c) => [c.id, c.name])); // lookup O(1)

function ProductCard({ product }) {
  const { addToCart } = useStore();
  const off = discountPercent(product.price, product.oldPrice);
  const habis = product.stock === 0;

  return (
    <article className="card card-hover group flex flex-col overflow-hidden">
      <Link to={`/products/${product.id}`} className="relative block">
        <ProductArt
          category={product.category}
          name={product.name}
          size={46}
          className="aspect-[4/3] w-full transition duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {product.badge ? (
            <Badge tone={product.badge === 'Promo' ? 'warn' : 'brand'}>{product.badge}</Badge>
          ) : null}
          {off > 0 ? <Badge tone="danger">-{off}%</Badge> : null}
        </div>
        {product.requiresPrescription ? (
          <span className="absolute right-3 top-3">
            <Badge tone="info">
              <FileText size={12} aria-hidden="true" /> Resep
            </Badge>
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-600">
          {categoryName.get(product.category)}
        </p>
        <h3 className="mt-1.5 text-[15px] font-bold leading-snug text-ink">
          <Link to={`/products/${product.id}`} className="line-clamp-2 hover:text-brand-700">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-xs text-muted">{product.brand}</p>
        <div className="mt-2">
          <Rating value={product.rating} reviews={product.reviews} />
        </div>

        <div className="mt-auto pt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-ink">{formatRupiah(product.price)}</span>
            {product.oldPrice ? (
              <span className="text-xs text-muted line-through">{formatRupiah(product.oldPrice)}</span>
            ) : null}
          </div>
          <button
            type="button"
            onClick={() => addToCart(product, 1)}
            disabled={habis}
            className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand-600 text-sm font-semibold text-white transition hover:bg-brand-700 active:scale-[.98] disabled:bg-slate-200 disabled:text-slate-500"
          >
            <Plus size={17} aria-hidden="true" />
            {habis ? 'Stok Habis' : 'Tambah'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default memo(ProductCard);
