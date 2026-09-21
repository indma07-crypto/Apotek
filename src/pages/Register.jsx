import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import Button from '../components/ui/Button.jsx';
import Logo from '../components/layout/Logo.jsx';
import { useStore } from '../context/StoreContext.jsx';

const initial = { nama: '', email: '', wa: '', password: '', konfirmasi: '' };

export default function Register() {
  const { login, notify } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.nama.trim()) next.nama = 'Nama lengkap wajib diisi.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Format email tidak valid.';
    if (!/^[0-9+\-\s]{9,}$/.test(form.wa)) next.wa = 'Nomor WhatsApp tidak valid.';
    if (form.password.length < 6) next.password = 'Password minimal 6 karakter.';
    if (form.konfirmasi !== form.password) next.konfirmasi = 'Konfirmasi password tidak sama.';
    setErrors(next);
    if (Object.keys(next).length) return;
    login({ name: form.nama, email: form.email, phone: form.wa });
    notify('Akun berhasil dibuat.');
    navigate('/profile');
  };

  const field = (key, label, props = {}) => (
    <div>
      <label className="label" htmlFor={key}>{label}</label>
      <input id={key} className="input" value={form[key]} onChange={set(key)} {...props} />
      {errors[key] ? <p className="mt-1.5 text-xs font-medium text-red-600">{errors[key]}</p> : null}
    </div>
  );

  return (
    <div className="container-page flex justify-center py-12 sm:py-20">
      <div className="w-full max-w-md">
        <div className="flex justify-center"><Logo /></div>
        <div className="card mt-8 p-7 sm:p-8">
          <h1 className="text-2xl font-extrabold text-ink">Daftar Akun</h1>
          <p className="mt-1.5 text-sm text-muted">Buat akun untuk menyimpan alamat dan melacak pesanan.</p>

          <form onSubmit={submit} className="mt-6 grid gap-4" noValidate>
            {field('nama', 'Nama lengkap', { placeholder: 'Nama sesuai KTP' })}
            {field('email', 'Email', { type: 'email', placeholder: 'nama@email.com' })}
            {field('wa', 'Nomor WhatsApp', { placeholder: '0812-3456-7890', inputMode: 'tel' })}
            {field('password', 'Password', { type: 'password', placeholder: 'Minimal 6 karakter' })}
            {field('konfirmasi', 'Konfirmasi password', { type: 'password', placeholder: 'Ulangi password' })}

            <Button type="submit" size="lg" className="mt-1 w-full">
              <UserPlus size={18} /> Daftar
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            Sudah punya akun? <Link to="/login" className="font-semibold text-brand-700">Masuk</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
