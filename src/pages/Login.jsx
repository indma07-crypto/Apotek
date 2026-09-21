import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import Button from '../components/ui/Button.jsx';
import Logo from '../components/layout/Logo.jsx';
import { useStore } from '../context/StoreContext.jsx';

export default function Login() {
  const { login, notify } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ identity: '', password: '' });
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!form.identity.trim() || form.password.length < 6) {
      setError('Isi email/nomor WhatsApp dan password minimal 6 karakter.');
      return;
    }
    setError('');
    login({ name: 'Rani Puspita', email: form.identity, phone: '0812-1111-2222' });
    notify('Selamat datang kembali!');
    navigate('/profile');
  };

  return (
    <div className="container-page flex justify-center py-12 sm:py-20">
      <div className="w-full max-w-md">
        <div className="flex justify-center"><Logo /></div>
        <div className="card mt-8 p-7 sm:p-8">
          <h1 className="text-2xl font-extrabold text-ink">Masuk</h1>
          <p className="mt-1.5 text-sm text-muted">Masuk untuk melihat pesanan dan checkout lebih cepat.</p>

          <form onSubmit={submit} className="mt-6 grid gap-4" noValidate>
            <div>
              <label className="label" htmlFor="identity">Email / Nomor WhatsApp</label>
              <input
                id="identity"
                className="input"
                placeholder="nama@email.com"
                value={form.identity}
                onChange={(e) => setForm((f) => ({ ...f, identity: e.target.value }))}
              />
            </div>
            <div>
              <label className="label" htmlFor="password">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={show ? 'text' : 'password'}
                  className="input pr-12"
                  placeholder="Minimal 6 karakter"
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  aria-label={show ? 'Sembunyikan password' : 'Tampilkan password'}
                  className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-muted hover:bg-black/[.04]"
                >
                  {show ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {error ? <p className="text-xs font-medium text-red-600">{error}</p> : null}

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-muted">
                <input type="checkbox" className="h-4 w-4 rounded accent-brand-600" /> Ingat saya
              </label>
              <button type="button" className="text-sm font-semibold text-brand-700 hover:underline">
                Lupa password?
              </button>
            </div>

            <Button type="submit" size="lg" className="mt-1 w-full">
              <LogIn size={18} /> Masuk
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-muted">
            <span className="h-px flex-1 bg-line" /> atau masuk dengan <span className="h-px flex-1 bg-line" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {['Google', 'Facebook'].map((p) => (
              <button
                key={p}
                type="button"
                className="h-11 rounded-xl border border-line text-sm font-semibold text-ink transition hover:border-brand-300 hover:text-brand-700"
              >
                {p}
              </button>
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-muted">
            Belum punya akun? <Link to="/register" className="font-semibold text-brand-700">Daftar sekarang</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
