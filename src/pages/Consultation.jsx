import { useEffect, useRef, useState } from 'react';
import { Send, Stethoscope, Clock, ShieldCheck } from 'lucide-react';

const quick = [
  'Obat apa untuk demam anak?',
  'Vitamin untuk daya tahan tubuh?',
  'Apakah produk ini perlu resep?',
  'Berapa lama pengiriman ke Jakarta?',
];

const initial = [
  {
    from: 'apoteker',
    text: 'Halo, saya apt. Dewi Lestari. Ada yang bisa saya bantu terkait kebutuhan kesehatan Anda?',
    time: '09:00',
  },
];

const jawaban = [
  'Terima kasih atas pertanyaannya. Untuk keluhan tersebut, saya sarankan produk dengan dosis paling rendah terlebih dahulu.',
  'Baik, saya bantu periksa ketersediaan produknya. Mohon tunggu sebentar.',
  'Untuk obat golongan keras, pembelian wajib menggunakan resep dokter ya.',
  'Jika keluhan berlanjut lebih dari 3 hari, sebaiknya periksa langsung ke dokter.',
];

const jam = () =>
  new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

export default function Consultation() {
  const [messages, setMessages] = useState(initial);
  const [draft, setDraft] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'nearest' });
  }, [messages, typing]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const kirim = (text) => {
    const isi = (text ?? draft).trim();
    if (!isi) return;
    setMessages((m) => [...m, { from: 'user', text: isi, time: jam() }]);
    setDraft('');
    setTyping(true);
    timerRef.current = setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        { from: 'apoteker', text: jawaban[Math.floor(Math.random() * jawaban.length)], time: jam() },
      ]);
    }, 900);
  };

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">Butuh Bantuan Memilih Produk?</h1>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">
          Konsultasikan kebutuhan kesehatan Anda dengan apoteker kami. Layanan gratis, setiap hari 07.00-22.00 WIB.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <section className="card flex h-[560px] flex-col overflow-hidden">
          <header className="flex items-center gap-3 border-b border-line p-4">
            <span className="relative grid h-11 w-11 place-items-center rounded-full bg-brand-600 text-white">
              <Stethoscope size={20} aria-hidden="true" />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-brand-400" />
            </span>
            <div>
              <p className="text-sm font-bold text-ink">apt. Dewi Lestari, S.Farm.</p>
              <p className="text-xs text-brand-600">Online &middot; biasanya membalas dalam 2 menit</p>
            </div>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto bg-canvas p-4" aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed animate-slide-up ${
                    m.from === 'user'
                      ? 'rounded-br-md bg-brand-600 text-white'
                      : 'rounded-bl-md border border-line bg-white text-ink'
                  }`}
                >
                  <p>{m.text}</p>
                  <p className={`mt-1 text-[10px] ${m.from === 'user' ? 'text-white/70' : 'text-muted'}`}>{m.time}</p>
                </div>
              </div>
            ))}
            {typing ? (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md border border-line bg-white px-4 py-3">
                  <span className="flex gap-1">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted"
                        style={{ animationDelay: `${d * 120}ms` }}
                      />
                    ))}
                  </span>
                </div>
              </div>
            ) : null}
            <div ref={endRef} />
          </div>

          <div className="border-t border-line p-3">
            <div className="no-scrollbar mb-3 flex gap-2 overflow-x-auto">
              {quick.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => kirim(q)}
                  className="shrink-0 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-muted transition hover:border-brand-300 hover:text-brand-700"
                >
                  {q}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                kirim();
              }}
              className="flex items-center gap-2"
            >
              <label htmlFor="pesan" className="sr-only">Tulis pesan</label>
              <input
                id="pesan"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Tulis pertanyaan Anda..."
                className="input h-11"
                autoComplete="off"
              />
              <button
                type="submit"
                aria-label="Kirim pesan"
                disabled={!draft.trim()}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-600 text-white transition hover:bg-brand-700 disabled:opacity-40"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="card p-5">
            <h2 className="text-base font-bold text-ink">Tentang Layanan Ini</h2>
            <ul className="mt-4 space-y-4 text-sm text-muted">
              <li className="flex gap-3">
                <ShieldCheck size={18} className="mt-0.5 shrink-0 text-brand-600" aria-hidden="true" />
                Konsultasi ditangani apoteker berizin praktik.
              </li>
              <li className="flex gap-3">
                <Clock size={18} className="mt-0.5 shrink-0 text-brand-600" aria-hidden="true" />
                Setiap hari 07.00-22.00 WIB.
              </li>
            </ul>
          </div>
          <div className="card bg-info-50 p-5">
            <p className="text-sm leading-relaxed text-info-700">
              Layanan ini bukan pengganti pemeriksaan dokter. Untuk keluhan berat atau darurat, segera kunjungi fasilitas
              kesehatan terdekat.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
