import CategoryCard from '../components/CategoryCard.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import { categories } from '../data/categories.js';

export default function Categories() {
  return (
    <div className="container-page py-12 sm:py-16">
      <SectionHeading
        eyebrow="Kategori"
        title="Semua Kategori Produk"
        description="Delapan kategori utama yang mencakup seluruh kebutuhan kesehatan rumah tangga."
      />
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((c) => (
          <CategoryCard key={c.id} category={c} />
        ))}
      </div>
    </div>
  );
}
