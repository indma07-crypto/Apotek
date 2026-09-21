const tones = {
  brand: 'bg-brand-50 text-brand-700 border-brand-100',
  info: 'bg-info-50 text-info-700 border-info-100',
  warn: 'bg-amber-50 text-amber-700 border-amber-100',
  danger: 'bg-red-50 text-red-600 border-red-100',
  neutral: 'bg-slate-50 text-slate-600 border-slate-200',
};

export default function Badge({ tone = 'brand', className = '', children }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
