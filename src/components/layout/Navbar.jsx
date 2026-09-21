import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Bell, User, Menu, X } from 'lucide-react';
import Logo from './Logo.jsx';
import SearchBar from '../SearchBar.jsx';
import { useStore } from '../../context/StoreContext.jsx';

const menu = [
  { to: '/', label: 'Beranda' },
  { to: '/products', label: 'Produk' },
  { to: '/categories', label: 'Kategori' },
  { to: '/about', label: 'Tentang Kami' },
  { to: '/consultation', label: 'Konsultasi' },
];

const linkClass = ({ isActive }) =>
  [
    'relative px-3 py-2 text-sm font-medium transition rounded-lg',
    isActive ? 'text-brand-700' : 'text-muted hover:text-ink',
  ].join(' ');

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const { cartCount, user } = useStore();
  const { pathname } = useLocation();

  // Tutup panel setiap pindah halaman.
  useEffect(() => {
    setOpenMenu(false);
    setOpenSearch(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur-md">
      <nav className="container-page flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <div className="flex items-center gap-8">
          <Logo />
          <ul className="hidden items-center lg:flex">
            {menu.map((m) => (
              <li key={m.to}>
                <NavLink to={m.to} end={m.to === '/'} className={linkClass}>
                  {m.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setOpenSearch((v) => !v)}
            aria-label="Cari produk"
            aria-expanded={openSearch}
            className="grid h-11 w-11 place-items-center rounded-xl text-muted transition hover:bg-black/[.04] hover:text-ink"
          >
            <Search size={20} />
          </button>

          <Link
            to="/cart"
            aria-label={`Keranjang belanja, ${cartCount} item`}
            className="relative grid h-11 w-11 place-items-center rounded-xl text-muted transition hover:bg-black/[.04] hover:text-ink"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 ? (
              <span className="absolute right-1.5 top-1.5 grid h-5 min-w-[20px] place-items-center rounded-full bg-brand-600 px-1 text-[11px] font-bold text-white animate-scale-in">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            ) : null}
          </Link>

          <Link
            to="/orders"
            aria-label="Notifikasi pesanan"
            className="hidden h-11 w-11 place-items-center rounded-xl text-muted transition hover:bg-black/[.04] hover:text-ink sm:grid"
          >
            <Bell size={20} />
          </Link>

          <Link
            to={user ? '/profile' : '/login'}
            className="ml-1 hidden h-11 items-center gap-2 rounded-xl border border-line px-3 text-sm font-semibold text-ink transition hover:border-brand-300 hover:text-brand-700 sm:inline-flex"
          >
            <User size={18} />
            <span className="max-w-[90px] truncate">{user ? user.name.split(' ')[0] : 'Masuk'}</span>
          </Link>

          <button
            type="button"
            onClick={() => setOpenMenu((v) => !v)}
            aria-label={openMenu ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={openMenu}
            className="grid h-11 w-11 place-items-center rounded-xl text-ink transition hover:bg-black/[.04] lg:hidden"
          >
            {openMenu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {openSearch ? (
        <div className="border-t border-line bg-white animate-fade-in">
          <div className="container-page py-3">
            <SearchBar autoFocus onNavigate={() => setOpenSearch(false)} />
          </div>
        </div>
      ) : null}

      {openMenu ? (
        <div className="border-t border-line bg-white lg:hidden animate-fade-in">
          <ul className="container-page py-3">
            {menu.map((m) => (
              <li key={m.to}>
                <NavLink
                  to={m.to}
                  end={m.to === '/'}
                  className={({ isActive }) =>
                    `flex h-12 items-center rounded-xl px-3 text-[15px] font-medium transition ${
                      isActive ? 'bg-brand-50 text-brand-700' : 'text-ink hover:bg-black/[.03]'
                    }`
                  }
                >
                  {m.label}
                </NavLink>
              </li>
            ))}
            <li className="mt-2 border-t border-line pt-3">
              <Link
                to={user ? '/profile' : '/login'}
                className="flex h-12 items-center gap-2 rounded-xl px-3 text-[15px] font-semibold text-brand-700"
              >
                <User size={18} /> {user ? 'Profil Saya' : 'Masuk / Daftar'}
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
