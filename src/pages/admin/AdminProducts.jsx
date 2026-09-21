import { useMemo, useState } from 'react';
import { Plus, Pencil, Trash2, Search, ImagePlus } from 'lucide-react';
import DataTable from '../../components/DataTable.jsx';
import Modal from '../../components/ui/Modal.jsx';
import Button from '../../components/ui/Button.jsx';
import Badge from '../../components/ui/Badge.jsx';
import { products as seedProducts } from '../../data/products.js';
import { categories } from '../../data/categories.js';
import { formatRupiah } from '../../utils/format.js';
import { useStore } from '../../context/StoreContext.jsx';

const emptyForm = {
  id: null, name: '', category: 'obat', brand: '', price: '', oldPrice: '',
  stock: '', unit: '', description: '', requiresPrescription: false, status: 'Aktif',
};

const categoryName = new Map(categories.map((c) => [c.id, c.name]));

export default function AdminProducts() {
  const { notify } = useStore();
  // State lokal: ganti dengan data dari API saat backend siap.
  const [rows, setRows] = useState(() => seedProducts.map((p) => ({ ...p, status: 'Aktif' })));
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [hapus, setHapus] = useState(null);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => r.name.toLowerCase().includes(q) || r.brand.toLowerCase().includes(q));
  }, [rows, query]);

  const set = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const bukaTambah = () => {
    setForm(emptyForm);
    setOpen(true);
  };

  const bukaEdit = (row) => {
    setForm({ ...emptyForm, ...row, oldPrice: row.oldPrice ?? '' });
    setOpen(true);
  };

  const simpan = () => {
    if (!form.name.trim() || !form.price) {
      notify('Nama produk dan harga wajib diisi.', 'info');
      return;
    }
    const payload = {
      ...form,
      price: Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
      stock: Number(form.stock) || 0,
      rating: form.rating || 4.5,
      reviews: form.reviews || 0,
      sold: form.sold || 0,
    };
    setRows((prev) =>
      form.id
        ? prev.map((r) => (r.id === form.id ? { ...r, ...payload } : r))
        : [{ ...payload, id: Math.max(...prev.map((r) => r.id)) + 1 }, ...prev]
    );
    setOpen(false);
    notify(form.id ? 'Produk diperbarui.' : 'Produk ditambahkan.');
  };

  const konfirmasiHapus = () => {
    setRows((prev) => prev.filter((r) => r.id !== hapus.id));
    notify('Produk dihapus.');
    setHapus(null);
  };

  const columns = [
    {
      key: 'name',
      header: 'Produk',
      render: (r) => (
        <div className="min-w-[180px]">
          <p className="font-semibold text-ink">{r.name}</p>
          <p className="text-xs text-muted">{r.brand}</p>
        </div>
      ),
    },
    { key: 'category', header: 'Kategori', render: (r) => categoryName.get(r.category) },
    { key: 'price', header: 'Harga', render: (r) => formatRupiah(r.price) },
    {
      key: 'stock',
      header: 'Stok',
      render: (r) => (
        <span className={r.stock < 40 ? 'font-semibold text-amber-600' : ''}>{r.stock}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (r) => <Badge tone={r.status === 'Aktif' ? 'brand' : 'neutral'}>{r.status}</Badge>,
    },
    {
      key: 'action',
      header: 'Action',
      render: (r) => (
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => bukaEdit(r)}
            aria-label={`Edit ${r.name}`}
            className="grid h-10 w-10 place-items-center rounded-lg text-muted transition hover:bg-brand-50 hover:text-brand-700"
          >
            <Pencil size={16} />
          </button>
          <button
            type="button"
            onClick={() => setHapus(r)}
            aria-label={`Hapus ${r.name}`}
            className="grid h-10 w-10 place-items-center rounded-lg text-muted transition hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">Manajemen Produk</h1>
          <p className="mt-1.5 text-sm text-muted">{rows.length} produk terdaftar.</p>
        </div>
        <Button onClick={bukaTambah}>
          <Plus size={18} /> Tambah Produk
        </Button>
      </header>

      <div className="card overflow-hidden">
        <div className="border-b border-line p-4">
          <div className="relative max-w-sm">
            <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
            <label htmlFor="cari-produk" className="sr-only">Cari produk</label>
            <input
              id="cari-produk"
              className="input h-11 pl-10"
              placeholder="Cari nama atau brand..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <DataTable columns={columns} rows={list} empty="Produk tidak ditemukan." />
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={form.id ? 'Edit Produk' : 'Tambah Produk'}
        description="Lengkapi detail produk di bawah ini."
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>Batal</Button>
            <Button onClick={simpan}>Simpan Produk</Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="label" htmlFor="p-name">Nama produk</label>
            <input id="p-name" className="input" value={form.name} onChange={set('name')} placeholder="Contoh: Paracetamol 500mg" />
          </div>
          <div>
            <label className="label" htmlFor="p-brand">Brand</label>
            <input id="p-brand" className="input" value={form.brand} onChange={set('brand')} placeholder="Kimia Farma" />
          </div>
          <div>
            <label className="label" htmlFor="p-cat">Kategori</label>
            <select id="p-cat" className="input" value={form.category} onChange={set('category')}>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="p-price">Harga</label>
            <input id="p-price" type="number" className="input" value={form.price} onChange={set('price')} placeholder="12500" />
          </div>
          <div>
            <label className="label" htmlFor="p-old">Harga sebelum diskon</label>
            <input id="p-old" type="number" className="input" value={form.oldPrice} onChange={set('oldPrice')} placeholder="Opsional" />
          </div>
          <div>
            <label className="label" htmlFor="p-stock">Stok</label>
            <input id="p-stock" type="number" className="input" value={form.stock} onChange={set('stock')} placeholder="100" />
          </div>
          <div>
            <label className="label" htmlFor="p-unit">Satuan</label>
            <input id="p-unit" className="input" value={form.unit} onChange={set('unit')} placeholder="Strip isi 10 tablet" />
          </div>
          <div className="sm:col-span-2">
            <label className="label" htmlFor="p-desc">Deskripsi</label>
            <textarea id="p-desc" rows={3} className="input resize-none" value={form.description} onChange={set('description')} />
          </div>
          <div className="sm:col-span-2">
            <span className="label">Gambar produk</span>
            <button
              type="button"
              onClick={() => notify('Unggah gambar aktif setelah backend siap.', 'info')}
              className="flex h-28 w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-line text-sm text-muted transition hover:border-brand-300 hover:text-brand-700"
            >
              <ImagePlus size={22} aria-hidden="true" />
              Klik untuk unggah gambar (PNG/JPG)
            </button>
          </div>
          <div>
            <label className="label" htmlFor="p-status">Status produk</label>
            <select id="p-status" className="input" value={form.status} onChange={set('status')}>
              <option>Aktif</option>
              <option>Nonaktif</option>
            </select>
          </div>
          <label className="mt-7 flex items-center gap-2.5 text-sm text-ink">
            <input type="checkbox" checked={form.requiresPrescription} onChange={set('requiresPrescription')} className="h-4 w-4 accent-brand-600" />
            Perlu resep dokter
          </label>
        </div>
      </Modal>

      <Modal
        open={Boolean(hapus)}
        onClose={() => setHapus(null)}
        title="Hapus produk?"
        description={hapus ? `"${hapus.name}" akan dihapus dari katalog.` : ''}
        size="sm"
        footer={
          <>
            <Button variant="secondary" onClick={() => setHapus(null)}>Batal</Button>
            <Button variant="danger" onClick={konfirmasiHapus}>Ya, Hapus</Button>
          </>
        }
      >
        <p className="text-sm text-muted">
          Tindakan ini hanya mengubah data lokal di browser. Data asli akan dihapus permanen setelah terhubung ke backend.
        </p>
      </Modal>
    </div>
  );
}
