import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, PackageSearch } from 'lucide-react';
import ProductGrid from '../components/ProductGrid.jsx';
import SearchBar from '../components/SearchBar.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import Button from '../components/ui/Button.jsx';
import { products, productFilters, sortOptions } from '../data/products.js';
import { categories } from '../data/categories.js';

const categoryName = new Map(categories.map((c) => [c.id, c.name]));

function matchQuery(p, q) {
  if (!q) return true;
  const name = (categoryName.get(p.category) || '').toLowerCase();
  return (
    p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || name.includes(q)
  );
}

export default function Products() {
  const [params, setParams] = useSearchParams();
  const [sort, setSort] = useState('populer');

  const query = (params.get('q') || '').trim().toLowerCase();
  const category = params.get('category') || 'semua';

  const list = useMemo(() => {
    // Satu iterasi filter, lalu sort sekali.
    const filtered = products.filter(
      (p) => (category === 'semua' || p.category === category) && matchQuery(p, query)
    );
    const sorted = [...filtered];
    if (sort === 'termurah') sorted.sort((a, b) => a.price - b.price);
    else if (sort === 'termahal') sorted.sort((a, b) => b.price - a.price);
    else if (sort === 'terbaru') sorted.sort((a, b) => b.id - a.id);
    else sorted.sort((a, b) => b.sold - a.sold);
    return sorted;
  }, [category, query, sort]);

  const setCategory = (id) => {
    const next = new URLSearchParams(params);
    if (id === 'semua') next.delete('category');
    else next.set('category', id);
    setParams(next, { replace: true });
  };

  const heading = query
    ? `Hasil pencarian "${params.get('q')}"`
    : category !== 'semua'
      ? categoryName.get(category) || 'Produk'
      : 'Semua Produk';

  return (
    <div className="container-page py-10 sm:py-14">
      <header className="max-w-2xl">
        <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">{heading}</h1>
        <p className="mt-2 text-[15px] text-muted">
          {list.length} produk ditemukan. Semua produk dikurasi oleh apoteker kami.
        </p>
      </header>

      <div className="mt-6 max-w-2xl">
        <SearchBar variant="panel" />
      </div>

      <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          {productFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setCategory(f.id)}
              aria-pressed={category === f.id}
              className={`h-10 shrink-0 rounded-full border px-4 text-sm font-semibold transition ${
                category === f.id
                  ? 'border-brand-600 bg-brand-600 text-white'
                  : 'border-line bg-white text-muted hover:border-brand-300 hover:text-brand-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal size={17} className="text-muted" aria-hidden="true" />
          <label htmlFor="sort" className="text-sm text-muted">
            Urutkan
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="input h-10 w-auto py-0 pr-8 text-sm font-semibold"
          >
            {sortOptions.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8">
        {list.length > 0 ? (
          <ProductGrid items={list} />
        ) : (
          <EmptyState
            icon={PackageSearch}
            title="Produk tidak ditemukan."
            description="Coba kata kunci lain, atau telusuri kategori populer berikut ini."
            action={
              <div className="flex flex-wrap justify-center gap-2">
                {categories.slice(0, 4).map((c) => (
                  <Button key={c.id} to={`/products?category=${c.id}`} variant="secondary" size="sm">
                    {c.name}
                  </Button>
                ))}
              </div>
            }
          />
        )}
      </div>
    </div>
  );
}
