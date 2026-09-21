import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { categoryIcon } from '../../utils/categoryIcons.js';
import Button from '../../components/ui/Button.jsx';
import Modal from '../../components/ui/Modal.jsx';
import { categories as seed } from '../../data/categories.js';
import { useStore } from '../../context/StoreContext.jsx';

export default function AdminCategories() {
  const { notify } = useStore();
  const [rows, setRows] = useState(seed);
  const [open, setOpen] = useState(false);
  const [nama, setNama] = useState('');

  const tambah = () => {
    if (!nama.trim()) return;
    setRows((r) => [
      ...r,
      { id: nama.toLowerCase().replace(/\s+/g, '-'), name: nama.trim(), icon: 'Pill', count: 0, desc: 'Kategori baru' },
    ]);
    setNama('');
    setOpen(false);
    notify('Kategori ditambahkan.');
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">Kategori</h1>
          <p className="mt-1.5 text-sm text-muted">{rows.length} kategori aktif.</p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <Plus size={18} /> Tambah Kategori
        </Button>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {rows.map((c) => {
          const Icon = categoryIcon(c.icon);
          return (
            <div key={c.id} className="card p-5">
              <div className="flex items-start justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setRows((r) => r.filter((x) => x.id !== c.id));
                    notify('Kategori dihapus.');
                  }}
                  aria-label={`Hapus kategori ${c.name}`}
                  className="grid h-10 w-10 place-items-center rounded-lg text-muted transition hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <h2 className="mt-4 text-base font-bold text-ink">{c.name}</h2>
              <p className="mt-1 text-sm text-muted">{c.desc}</p>
              <p className="mt-3 text-xs font-semibold text-brand-700">{c.count} produk</p>
            </div>
          );
        })}
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Tambah Kategori"
        size="sm"
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>Batal</Button>
            <Button onClick={tambah}>Simpan</Button>
          </>
        }
      >
        <label className="label" htmlFor="kategori">Nama kategori</label>
        <input id="kategori" className="input" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Contoh: Herbal" />
      </Modal>
    </div>
  );
}
