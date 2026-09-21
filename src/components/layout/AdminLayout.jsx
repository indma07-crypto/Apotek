import { useState } from 'react';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Package, LayoutGrid, ReceiptText, Users, Boxes,
  Tag, MessageCircle, BarChart3, Settings, Menu, X, ArrowLeft,
} from 'lucide-react';
import Logo from './Logo.jsx';
import Toast from '../ui/Toast.jsx';
import ErrorBoundary from '../ErrorBoundary.jsx';

const nav = [
  { to: '/admin', label: 'Dashboard', Icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Produk', Icon: Package },
  { to: '/admin/categories', label: 'Kategori', Icon: LayoutGrid },
  { to: '/admin/orders', label: 'Pesanan', Icon: ReceiptText },
  { to: '/admin/users', label: 'Pengguna', Icon: Users },
  { to: '/admin/stocks', label: 'Stok', Icon: Boxes },
  { to: '/admin/promos', label: 'Promo', Icon: Tag },
  { to: '/admin/consultations', label: 'Konsultasi', Icon: MessageCircle },
  { to: '/admin/reports', label: 'Laporan', Icon: BarChart3 },
  { to: '/admin/settings', label: 'Pengaturan', Icon: Settings },
];

const itemClass = ({ isActive }) =>
  `flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition ${
    isActive ? 'bg-brand-50 text-brand-700' : 'text-muted hover:bg-black/[.03] hover:text-ink'
  }`;

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-canvas lg:flex">
      <aside
        className={`fixed inset-y-0 left-0 z-[60] w-[260px] border-r border-line bg-white p-4 transition-transform duration-300 lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between">
          <Logo to="/admin" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Tutup menu admin"
            className="grid h-10 w-10 place-items-center rounded-xl text-muted hover:bg-black/[.04] lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-6">
          <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">Menu</p>
          <ul className="space-y-1">
            {nav.map(({ to, label, Icon, end }) => (
              <li key={to}>
                <NavLink to={to} end={end} className={itemClass} onClick={() => setOpen(false)}>
                  <Icon size={18} aria-hidden="true" /> {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          to="/"
          className="mt-6 flex h-11 items-center gap-2 rounded-xl border border-line px-3 text-sm font-semibold text-ink transition hover:border-brand-300 hover:text-brand-700"
        >
          <ArrowLeft size={17} /> Kembali ke Toko
        </Link>
      </aside>

      {open ? (
        <div className="fixed inset-0 z-[55] bg-ink/40 lg:hidden" onClick={() => setOpen(false)} aria-hidden="true" />
      ) : null}

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-line bg-white/90 px-4 backdrop-blur-md lg:px-8">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Buka menu admin"
            className="grid h-11 w-11 place-items-center rounded-xl text-ink hover:bg-black/[.04] lg:hidden"
          >
            <Menu size={22} />
          </button>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-ink">Panel Admin</p>
            <p className="truncate text-xs text-muted">apt. Dewi Lestari, S.Farm.</p>
          </div>
          <span className="ml-auto grid h-10 w-10 place-items-center rounded-full bg-brand-600 text-sm font-bold text-white">
            DL
          </span>
        </header>
        <div className="p-4 lg:p-8">
          <ErrorBoundary key={pathname}>
            <Outlet />
          </ErrorBoundary>
        </div>
      </div>
      <Toast />
    </div>
  );
}
