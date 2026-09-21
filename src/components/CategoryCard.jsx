import { Link } from 'react-router-dom';
import { categoryIcon } from '../utils/categoryIcons.js';

export default function CategoryCard({ category }) {
  const Icon = categoryIcon(category.icon);
  return (
    <Link
      to={`/products?category=${category.id}`}
      className="card card-hover group flex flex-col gap-3 p-5"
    >
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white">
        <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
      </span>
      <span>
        <span className="block text-[15px] font-bold leading-snug text-ink">{category.name}</span>
        <span className="mt-0.5 block text-xs text-muted">{category.count} produk</span>
      </span>
    </Link>
  );
}
