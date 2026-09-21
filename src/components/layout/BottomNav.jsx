import { NavLink } from 'react-router-dom';
import { Home, LayoutGrid, ShoppingCart, ReceiptText, User } from 'lucide-react';
import { useStore } from '../../context/StoreContext.jsx';

const items = [
  { to: '/', label: 'Beranda', Icon: Home, end: true },
  { to: '/categories', label: 'Kategori', Icon: LayoutGrid },
  { to: '/cart', label: 'Keranjang', Icon: ShoppingCart },
  { to: '/orders', label: 'Pesanan', Icon: ReceiptText },
  { to: '/profile', label: 'Profil', Icon: User },
];

// Bottom navigation hanya di mobile, maksimal 5 item.
export default function BottomNav() {
  const { cartCount } = useStore();
  return (
    <nav
      aria-label="Navigasi utama mobile"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <ul className="grid grid-cols-5">
        {items.map(({ to, label, Icon, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `relative flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-medium transition ${
                  isActive ? 'text-brand-700' : 'text-muted'
                }`
              }
            >
              <span className="relative">
                <Icon size={21} aria-hidden="true" />
                {to === '/cart' && cartCount > 0 ? (
                  <span className="absolute -right-2 -top-1.5 grid h-4 min-w-[16px] place-items-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                ) : null}
              </span>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
