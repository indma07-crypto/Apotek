import { Star } from 'lucide-react';

export default function Rating({ value = 0, reviews, size = 14, className = '' }) {
  const rounded = Math.round(value);
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={size}
            className={i <= rounded ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}
          />
        ))}
      </div>
      {/* Angka rating dibaca screen reader, bintang hanya dekoratif. */}
      <span className="text-xs font-medium text-muted">
        {value.toFixed(1)}
        {reviews ? ` (${reviews})` : ''}
      </span>
      <span className="sr-only">Rating {value.toFixed(1)} dari 5</span>
    </div>
  );
}
