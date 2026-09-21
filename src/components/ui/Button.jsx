import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn.js';

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition duration-200 ' +
  'disabled:cursor-not-allowed disabled:opacity-50 active:scale-[.98] select-none';

const variants = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 shadow-sm shadow-brand-600/20',
  secondary: 'bg-white text-ink border border-line hover:border-brand-300 hover:text-brand-700',
  soft: 'bg-brand-50 text-brand-700 hover:bg-brand-100',
  ghost: 'text-ink hover:bg-black/[.04]',
  danger: 'bg-red-50 text-red-600 hover:bg-red-100',
};

// Tinggi minimum 44px pada ukuran md/lg agar nyaman disentuh di layar sentuh.
const sizes = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-[15px]',
  lg: 'h-12 px-6 text-base',
  icon: 'h-11 w-11',
};

export default function Button({
  as,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  // cn() memastikan class di `className` (mis. override warna khusus)
  // selalu menang atas class bawaan varian, walau kategori class-nya sama.
  const cls = cn(base, variants[variant], sizes[size], className);
  if (to) return <Link to={to} className={cls} {...props}>{children}</Link>;
  if (href) return <a href={href} className={cls} {...props}>{children}</a>;
  const Tag = as || 'button';
  return <Tag className={cls} {...props}>{children}</Tag>;
}
