import { useState } from 'react';
import DataTable from '../../components/DataTable.jsx';
import Badge from '../../components/ui/Badge.jsx';
import { products as seed } from '../../data/products.js';
import { useStore } from '../../context/StoreContext.jsx';

export default function AdminStocks() {
  const { notify } = useStore();
  const [rows, setRows] = useState(() => seed.map((p) => ({ id: p.id, name: p.name, brand: p.brand, stock: p.stock })));

  const ubah = (id, value) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, stock: Math.max(0, Number(value) || 0) } : r)));

  const columns = [
    {
      key: 'name',
      header: 'Produk',
      render: (r) => (
        <div>
          <p className="font-semibold text-ink">{r.name}</p>
          <p className="text-xs text-muted">{r.brand}</p>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status Stok',
      render: (r) =>
        r.stock === 0 ? (
          <Badge tone="danger">Habis</Badge>
        ) : r.stock < 40 ? (
          <Badge tone="warn">Menipis</Badge>
        ) : (
          <Badge tone="brand">Aman</Badge>
        ),
    },
    {
      key: 'stock',
      header: 'Jumlah Stok',
      render: (r) => (
        <>
          <label htmlFor={`stok-${r.id}`} className="sr-only">Stok {r.name}</label>
          <input
            id={`stok-${r.id}`}
            type="number"
            value={r.stock}
            onChange={(e) => ubah(r.id, e.target.value)}
            onBlur={() => notify('Stok diperbarui.')}
            className="input h-10 w-28"
          />
        </>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-extrabold text-ink">Manajemen Stok</h1>
        <p className="mt-1.5 text-sm text-muted">Ubah jumlah stok langsung pada tabel.</p>
      </header>
      <div className="card overflow-hidden">
        <DataTable columns={columns} rows={rows} />
      </div>
    </div>
  );
}
