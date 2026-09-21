import { Link } from 'react-router-dom';
import { Cross } from 'lucide-react';

export default function Logo({ to = '/', compact = false }) {
  return (
    <Link to={to} className="flex items-center gap-2.5" aria-label="Apotek Sehat Bersama, ke beranda">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-600 text-white shadow-sm shadow-brand-600/30">
        <Cross size={20} strokeWidth={2.5} aria-hidden="true" />
      </span>
      {compact ? null : (
        <span className="leading-none">
          <span className="block font-display text-[15px] font-extrabold tracking-tight text-ink">APOTEK</span>
          <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">
            Sehat Bersama
          </span>
        </span>
      )}
    </Link>
  );
}
