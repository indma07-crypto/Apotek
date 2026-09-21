import { useDeferredValue, useMemo, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { products } from '../data/products.js';
import { categories } from '../data/categories.js';
import { formatRupiah } from '../utils/format.js';
import ProductArt from './ui/ProductArt.jsx';

// Pencarian dummy di sisi klien: nama produk, kategori, dan brand.
function searchProducts(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) => {
    const category = categories.find((c) => c.id === p.category)?.name || '';
    return (
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      category.toLowerCase().includes(q)
    );
  });
}

export default function SearchBar({ autoFocus = false, onNavigate, variant = 'panel' }) {
  const [query, setQuery] = useState('');
  const deferred = useDeferredValue(query); // hasil berat tidak memblokir ketikan
  const results = useMemo(() => searchProducts(deferred).slice(0, 6), [deferred]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const submit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/products?q=${encodeURIComponent(query.trim())}`);
    onNavigate?.();
  };

  const showPanel = variant === 'panel' && query.trim().length > 0;

  return (
    <div className="relative w-full">
      <form onSubmit={submit} role="search">
        <label htmlFor="search-produk" className="sr-only">
          Cari produk
        </label>
        <div className="relative">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <input
            id="search-produk"
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari obat, vitamin, atau produk kesehatan..."
            className="input h-12 pl-11 pr-11"
            autoComplete="off"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Kosongkan pencarian"
              className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-muted hover:bg-black/[.04] hover:text-ink"
            >
              <X size={16} />
            </button>
          ) : null}
        </div>
      </form>

      {showPanel ? (
        <div className="absolute inset-x-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-line bg-white shadow-lift animate-scale-in">
          {results.length > 0 ? (
            <>
              <ul className="max-h-[320px] overflow-y-auto p-2">
                {results.map((p) => (
                  <li key={p.id}>
                    <Link
                      to={`/products/${p.id}`}
                      onClick={onNavigate}
                      className="flex items-center gap-3 rounded-xl p-2.5 transition hover:bg-brand-50/70"
                    >
                      <ProductArt
                        category={p.category}
                        name={p.name}
                        size={22}
                        className="h-11 w-11 shrink-0 rounded-lg"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-ink">{p.name}</span>
                        <span className="block text-xs text-muted">{p.brand}</span>
                      </span>
                      <span className="text-sm font-semibold text-brand-700">{formatRupiah(p.price)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={submit}
                className="flex w-full items-center justify-center gap-2 border-t border-line px-4 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
              >
                Lihat semua hasil untuk "{query.trim()}" <ArrowRight size={15} />
              </button>
            </>
          ) : (
            <div className="p-5">
              <p className="text-sm font-semibold text-ink">Produk tidak ditemukan.</p>
              <p className="mt-1 text-sm text-muted">Coba kata kunci lain atau telusuri kategori berikut.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {categories.slice(0, 5).map((c) => (
                  <Link
                    key={c.id}
                    to={`/products?category=${c.id}`}
                    onClick={onNavigate}
                    className="rounded-full border border-line px-3 py-1.5 text-xs font-medium text-muted transition hover:border-brand-300 hover:text-brand-700"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export { searchProducts };
