import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import Button from '../components/ui/Button.jsx';
import { useStore } from '../context/StoreContext.jsx';

const info = [
  { Icon: MapPin, label: 'Alamat', value: 'Jl. Kesehatan Raya No. 27, Kebayoran Baru, Jakarta Selatan 12140' },
  { Icon: Phone, label: 'Nomor WhatsApp', value: '0811-2345-6789' },
  { Icon: Mail, label: 'Email', value: 'halo@apoteksehatbersama.id' },
  { Icon: Clock, label: 'Jam Operasional', value: 'Senin-Sabtu 07.00-22.00, Minggu 08.00-20.00' },
];

export default function Contact() {
  const { notify } = useStore();
  const [form, setForm] = useState({ nama: '', email: '', pesan: '' });
  const [errors, setErrors] = useState({});

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.nama.trim()) next.nama = 'Nama wajib diisi.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Format email tidak valid.';
    if (form.pesan.trim().length < 10) next.pesan = 'Pesan minimal 10 karakter.';
    setErrors(next);
    if (Object.keys(next).length) return;
    notify('Pesan terkirim. Kami balas maksimal 1x24 jam.');
    setForm({ nama: '', email: '', pesan: '' });
  };

  return (
    <div className="container-page py-12 sm:py-16">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">Hubungi Kami</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          Ada pertanyaan seputar produk, pesanan, atau kerja sama? Tim kami siap membantu.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[380px_1fr]">
        <div className="space-y-4">
          {info.map(({ Icon, label, value }) => (
            <div key={label} className="card flex gap-4 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-ink">{label}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-muted">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={submit} className="card p-6 sm:p-8" noValidate>
          <h2 className="text-lg font-bold text-ink">Kirim Pesan</h2>
          <p className="mt-1.5 text-sm text-muted">Isi formulir berikut, kami balas maksimal 1x24 jam.</p>

          <div className="mt-6 grid gap-4">
            <div>
              <label className="label" htmlFor="nama">Nama</label>
              <input id="nama" className="input" value={form.nama} onChange={set('nama')} placeholder="Nama lengkap" />
              {errors.nama ? <p className="mt-1.5 text-xs font-medium text-red-600">{errors.nama}</p> : null}
            </div>
            <div>
              <label className="label" htmlFor="email">Email</label>
              <input id="email" type="email" className="input" value={form.email} onChange={set('email')} placeholder="nama@email.com" />
              {errors.email ? <p className="mt-1.5 text-xs font-medium text-red-600">{errors.email}</p> : null}
            </div>
            <div>
              <label className="label" htmlFor="pesan">Pesan</label>
              <textarea
                id="pesan"
                rows={5}
                className="input resize-none"
                value={form.pesan}
                onChange={set('pesan')}
                placeholder="Tulis pertanyaan atau masukan Anda"
              />
              {errors.pesan ? <p className="mt-1.5 text-xs font-medium text-red-600">{errors.pesan}</p> : null}
            </div>
          </div>

          <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto">
            <Send size={17} /> Kirim Pesan
          </Button>
        </form>
      </div>
    </div>
  );
}
