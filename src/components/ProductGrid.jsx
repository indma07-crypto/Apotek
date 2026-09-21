import ProductCard from './ProductCard.jsx';

export default function ProductGrid({ items, columns = 4 }) {
  const lg = columns === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4';
  return (
    <div className={`grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 ${lg}`}>
      {items.map((p, i) => (
        <div key={p.id} className="animate-slide-up" style={{ animationDelay: `${Math.min(i, 7) * 40}ms` }}>
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}
