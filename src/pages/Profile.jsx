import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, MapPin, ReceiptText, Heart, Settings, LogOut, Mail, Phone } from 'lucide-react';
import Button from '../components/ui/Button.jsx';
import StatusPill from '../components/ui/StatusPill.jsx';
import { useStore } from '../context/StoreContext.jsx';
import { formatRupiah, formatDate } from '../utils/format.js';

const menu = [
  { id: 'informasi', label: 'Informasi Pribadi', Icon: User },
  { id: 'alamat', label: 'Alamat', Icon: MapPin },
  { id: 'pesanan', label: 'Pesanan', Icon: ReceiptText },
  { id: 'wishlist', label: 'Wishlist', Icon: Heart },
  { id: 'pengaturan', label: 'Pengaturan', Icon: Settings },
];

export default function Profile() {
  const { user, logout, orders, notify } = useStore();
  const navigate = useNavigate();
  const [tab, setTab] = useState('informasi');

  if (!user) {
    return (
      <div className="container-page flex justify-center py-20">
        <div className="card max-w-sm p-8 text-center">
          <h1 className="text-xl font-bold text-ink">Anda belum masuk</h1>
          <p className="mt-2 text-sm text-muted">Masuk untuk melihat profil, alamat, dan riwayat pesanan.</p>
          <Button to="/login" className="mt-6 w-full">Masuk Sekarang</Button>
        </div>
      </div>
    );
  }

  const keluar = () => {
    logout();
    notify('Anda telah keluar.', 'info');
    navigate('/');
  };

  const initials = user.name.split(' ').map((n) => n[0]).slice(0, 2).join('');

  return (
    <div className="container-page py-10 sm:py-14">
      <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">Profil Saya</h1>

      <div className="mt-8 grid gap-6 lg:grid-cols-[300px_1fr]">
        <aside className="space-y-4">
          <div className="card p-5 text-center">
            <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-brand-600 font-display text-2xl font-extrabold text-white">
              {initials}
            </span>
            <p className="mt-4 text-base font-bold text-ink">{user.name}</p>
            <p className="text-sm text-muted">{user.email}</p>
            <p className="text-sm text-muted">{user.phone}</p>
          </div>

          <nav className="card overflow-hidden p-2">
            <ul>
              {menu.map(({ id, label, Icon }) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => setTab(id)}
                    aria-pressed={tab === id}
                    className={`flex h-12 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium transition ${
                      tab === id ? 'bg-brand-50 text-brand-700' : 'text-muted hover:bg-black/[.03] hover:text-ink'
                    }`}
                  >
                    <Icon size={18} aria-hidden="true" /> {label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={keluar}
                  className="flex h-12 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  <LogOut size={18} aria-hidden="true" /> Logout
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        <section className="card p-6 sm:p-7">
          {tab === 'informasi' ? (
            <>
              <h2 className="text-lg font-bold text-ink">Informasi Pribadi</h2>
              <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  [User, 'Nama lengkap', user.name],
                  [Mail, 'Email', user.email],
                  [Phone, 'Nomor WhatsApp', user.phone],
                ].map(([Icon, label, value]) => (
                  <div key={label} className="rounded-2xl border border-line p-4">
                    <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
                      <Icon size={14} aria-hidden="true" /> {label}
                    </dt>
                    <dd className="mt-1.5 break-words text-sm font-semibold text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
              <Button variant="secondary" className="mt-6" onClick={() => notify('Fitur ubah profil menyusul.', 'info')}>
                Ubah Profil
              </Button>
            </>
          ) : null}

          {tab === 'alamat' ? (
            <>
              <h2 className="text-lg font-bold text-ink">Alamat Tersimpan</h2>
              <div className="mt-5 rounded-2xl border border-line p-5">
                <p className="text-sm font-bold text-ink">Rumah &middot; {user.name}</p>
                <p className="mt-1 text-sm text-muted">
                  Jl. Melati No. 12, Kebayoran Baru, Jakarta Selatan 12140 &middot; {user.phone}
                </p>
              </div>
              <Button variant="secondary" className="mt-5" onClick={() => notify('Formulir alamat menyusul.', 'info')}>
                Tambah Alamat
              </Button>
            </>
          ) : null}

          {tab === 'pesanan' ? (
            <>
              <h2 className="text-lg font-bold text-ink">Riwayat Pesanan</h2>
              <ul className="mt-5 divide-y divide-line">
                {orders.slice(0, 5).map((o) => (
                  <li key={o.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
                    <div>
                      <Link to={`/orders/${o.id}`} className="text-sm font-bold text-ink hover:text-brand-700">{o.id}</Link>
                      <p className="text-xs text-muted">{formatDate(o.date)} &middot; {formatRupiah(o.total)}</p>
                    </div>
                    <StatusPill status={o.status} />
                  </li>
                ))}
              </ul>
              <Button to="/orders" variant="secondary" className="mt-5">Lihat Semua Pesanan</Button>
            </>
          ) : null}

          {tab === 'wishlist' ? (
            <>
              <h2 className="text-lg font-bold text-ink">Wishlist</h2>
              <p className="mt-2 text-sm text-muted">Belum ada produk yang disimpan.</p>
              <Button to="/products" variant="secondary" className="mt-5">Jelajahi Produk</Button>
            </>
          ) : null}

          {tab === 'pengaturan' ? (
            <>
              <h2 className="text-lg font-bold text-ink">Pengaturan</h2>
              <ul className="mt-5 divide-y divide-line">
                {['Notifikasi promo', 'Notifikasi status pesanan', 'Berlangganan newsletter'].map((s) => (
                  <li key={s} className="flex items-center justify-between gap-4 py-4">
                    <span className="text-sm text-ink">{s}</span>
                    <input type="checkbox" defaultChecked className="h-5 w-9 accent-brand-600" aria-label={s} />
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </section>
      </div>
    </div>
  );
}
