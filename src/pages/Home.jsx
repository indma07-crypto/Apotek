import { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Hero from '../components/Hero.jsx';
import TrustSection from '../components/TrustSection.jsx';
import CategoryCard from '../components/CategoryCard.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import ConsultationCTA from '../components/ConsultationCTA.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import Button from '../components/ui/Button.jsx';
import { categories } from '../data/categories.js';
import { products, productFilters } from '../data/products.js';

export default function Home() {
  const [filter, setFilter] = useState('semua');

  const shown = useMemo(() => {
    const list = filter === 'semua' ? products : products.filter((p) => p.category === filter);
    return [...list].sort((a, b) => b.sold - a.sold).slice(0, 8);
  }, [filter]);

  return (
    <>
      <Hero />
      <TrustSection />

      <section className="container-page py-14 sm:py-16">
        <SectionHeading
          eyebrow="Kategori"
          title="Cari Berdasarkan Kategori"
          description="Telusuri kebutuhan kesehatan Anda lewat kategori yang paling sering dicari."
          action={
            <Button to="/categories" variant="secondary" size="sm">
              Semua Kategori <ArrowRight size={16} />
            </Button>
          }
        />
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>
      </section>

      <section className="container-page py-14 sm:py-16">
        <SectionHeading
          eyebrow="Produk"
          title="Produk Pilihan"
          description="Produk terlaris yang paling sering dipesan pelanggan kami minggu ini."
          action={
            <Button to="/products" variant="secondary" size="sm">
              Lihat Semua <ArrowRight size={16} />
            </Button>
          }
        />

        <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-1">
          {productFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className={`h-10 shrink-0 rounded-full border px-4 text-sm font-semibold transition ${
                filter === f.id
                  ? 'border-brand-600 bg-brand-600 text-white'
                  : 'border-line bg-white text-muted hover:border-brand-300 hover:text-brand-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          <ProductGrid items={shown} />
        </div>
      </section>

      <ConsultationCTA />
    </>
  );
}
