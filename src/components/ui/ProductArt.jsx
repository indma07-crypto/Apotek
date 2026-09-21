import { Pill, Leaf, Droplets, Sparkles, Baby, Stethoscope, CupSoda, Home } from 'lucide-react';

// Placeholder visual produk. Saat backend siap, ganti dengan <img src={product.image} />.
const art = {
  obat: { Icon: Pill, bg: 'from-brand-50 to-brand-100/60', fg: 'text-brand-600' },
  vitamin: { Icon: Leaf, bg: 'from-lime-50 to-brand-50', fg: 'text-brand-600' },
  'perawatan-tubuh': { Icon: Droplets, bg: 'from-sky-50 to-info-50', fg: 'text-info-600' },
  'perawatan-wajah': { Icon: Sparkles, bg: 'from-rose-50 to-amber-50', fg: 'text-rose-500' },
  'ibu-anak': { Icon: Baby, bg: 'from-amber-50 to-rose-50', fg: 'text-amber-600' },
  'alat-kesehatan': { Icon: Stethoscope, bg: 'from-info-50 to-slate-50', fg: 'text-info-600' },
  'minuman-kesehatan': { Icon: CupSoda, bg: 'from-cyan-50 to-brand-50', fg: 'text-cyan-600' },
  'kebutuhan-rumah': { Icon: Home, bg: 'from-slate-50 to-brand-50', fg: 'text-slate-600' },
};

export default function ProductArt({ category, name, size = 40, className = '' }) {
  const { Icon, bg, fg } = art[category] || art.obat;
  return (
    <div
      role="img"
      aria-label={`Ilustrasi produk ${name}`}
      className={`grid place-items-center bg-gradient-to-br ${bg} ${className}`}
    >
      <Icon size={size} className={fg} strokeWidth={1.5} aria-hidden="true" />
    </div>
  );
}
