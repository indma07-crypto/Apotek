import DataTable from '../../components/DataTable.jsx';
import Badge from '../../components/ui/Badge.jsx';
import { seedUsers } from '../../data/seed.js';

const columns = [
  { key: 'id', header: 'ID' },
  {
    key: 'name',
    header: 'Nama',
    render: (r) => (
      <div>
        <p className="font-semibold text-ink">{r.name}</p>
        <p className="text-xs text-muted">{r.email}</p>
      </div>
    ),
  },
  { key: 'phone', header: 'WhatsApp' },
  { key: 'orders', header: 'Pesanan' },
  { key: 'joined', header: 'Bergabung' },
  {
    key: 'status',
    header: 'Status',
    render: (r) => <Badge tone={r.status === 'Aktif' ? 'brand' : 'neutral'}>{r.status}</Badge>,
  },
];

export default function AdminUsers() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-extrabold text-ink">Pengguna</h1>
        <p className="mt-1.5 text-sm text-muted">Daftar pelanggan terdaftar.</p>
      </header>
      <div className="card overflow-hidden">
        <DataTable columns={columns} rows={seedUsers} />
      </div>
    </div>
  );
}
