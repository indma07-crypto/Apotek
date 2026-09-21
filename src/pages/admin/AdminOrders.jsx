import { useMemo, useState } from 'react';
import DataTable from '../../components/DataTable.jsx';
import StatusPill from '../../components/ui/StatusPill.jsx';
import Modal from '../../components/ui/Modal.jsx';
import Button from '../../components/ui/Button.jsx';
import { useStore } from '../../context/StoreContext.jsx';
import { formatRupiah, formatDate } from '../../utils/format.js';
import { orderStatuses } from '../../data/seed.js';

export default function AdminOrders() {
  const { orders, setOrderStatus, notify } = useStore();
  const [filter, setFilter] = useState('Semua');
  const [edit, setEdit] = useState(null);
  const [status, setStatus] = useState('Diproses');

  const rows = useMemo(
    () => (filter === 'Semua' ? orders : orders.filter((o) => o.status === filter)),
    [orders, filter]
  );

  const simpan = () => {
    setOrderStatus(edit.id, status);
    notify(`Status ${edit.id} diubah menjadi ${status}.`);
    setEdit(null);
  };

  const columns = [
    { key: 'id', header: 'ID Pesanan', render: (r) => <span className="font-semibold">{r.id}</span> },
    { key: 'customer', header: 'Customer' },
    {
      key: 'items',
      header: 'Produk',
      render: (r) => (
        <span className="text-muted">
          {r.items[0].name}
          {r.items.length > 1 ? ` +${r.items.length - 1} lainnya` : ''}
        </span>
      ),
    },
    { key: 'total', header: 'Total', render: (r) => formatRupiah(r.total) },
    { key: 'status', header: 'Status', render: (r) => <StatusPill status={r.status} /> },
    { key: 'date', header: 'Tanggal', render: (r) => formatDate(r.date) },
    {
      key: 'action',
      header: 'Action',
      render: (r) => (
        <button
          type="button"
          onClick={() => {
            setEdit(r);
            setStatus(r.status);
          }}
          className="font-semibold text-brand-700 hover:underline"
        >
          Ubah Status
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-extrabold text-ink">Manajemen Pesanan</h1>
        <p className="mt-1.5 text-sm text-muted">{orders.length} pesanan tercatat.</p>
      </header>

      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
        {['Semua', ...orderStatuses].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            aria-pressed={filter === s}
            className={`h-10 shrink-0 rounded-full border px-4 text-sm font-semibold transition ${
              filter === s
                ? 'border-brand-600 bg-brand-600 text-white'
                : 'border-line bg-white text-muted hover:border-brand-300 hover:text-brand-700'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="card overflow-hidden">
        <DataTable columns={columns} rows={rows} empty="Tidak ada pesanan pada status ini." />
      </div>

      <Modal
        open={Boolean(edit)}
        onClose={() => setEdit(null)}
        title="Ubah Status Pesanan"
        description={edit ? `${edit.id} atas nama ${edit.customer}` : ''}
        size="sm"
        footer={
          <>
            <Button variant="secondary" onClick={() => setEdit(null)}>Batal</Button>
            <Button onClick={simpan}>Simpan</Button>
          </>
        }
      >
        <div className="grid gap-3">
          {orderStatuses.map((s) => (
            <label
              key={s}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 transition ${
                status === s ? 'border-brand-600 bg-brand-50/60' : 'border-line hover:border-brand-300'
              }`}
            >
              <input
                type="radio"
                name="status"
                value={s}
                checked={status === s}
                onChange={() => setStatus(s)}
                className="h-4 w-4 accent-brand-600"
              />
              <span className="text-sm font-semibold text-ink">{s}</span>
            </label>
          ))}
        </div>
      </Modal>
    </div>
  );
}
