import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Wallet, ReceiptText, Package, Users, ArrowRight } from 'lucide-react';
import DashboardCard from '../../components/DashboardCard.jsx';
import DataTable from '../../components/DataTable.jsx';
import BarChart from '../../components/BarChart.jsx';
import StatusPill from '../../components/ui/StatusPill.jsx';
import { products } from '../../data/products.js';
import { weeklySales, topProducts, seedUsers } from '../../data/seed.js';
import { useStore } from '../../context/StoreContext.jsx';
import { formatRupiah, formatDate } from '../../utils/format.js';

const shortRupiah = (v) => 'Rp' + (v / 1000000).toFixed(1) + ' jt';

export default function Dashboard() {
  const { orders } = useStore();
  const totalPenjualan = useMemo(
    () => orders.filter((o) => o.status !== 'Dibatalkan').reduce((s, o) => s + o.total, 0),
    [orders]
  );

  const columns = [
    { key: 'id', header: 'ID', render: (r) => <span className="font-semibold">{r.id}</span> },
    { key: 'customer', header: 'Customer' },
    { key: 'total', header: 'Total', render: (r) => formatRupiah(r.total) },
    { key: 'status', header: 'Status', render: (r) => <StatusPill status={r.status} /> },
    { key: 'date', header: 'Tanggal', render: (r) => formatDate(r.date) },
    {
      key: 'action',
      header: 'Action',
      render: (r) => (
        <Link to="/admin/orders" className="font-semibold text-brand-700 hover:underline">
          Kelola
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-extrabold text-ink">Dashboard</h1>
        <p className="mt-1.5 text-sm text-muted">Ringkasan performa apotek minggu ini.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCard icon={Wallet} label="Total Penjualan" value={formatRupiah(totalPenjualan)} delta="+12,4%" />
        <DashboardCard icon={ReceiptText} label="Total Pesanan" value={orders.length} delta="+8,1%" />
        <DashboardCard icon={Package} label="Total Produk" value={products.length} delta="+3" />
        <DashboardCard icon={Users} label="Total Pengguna" value={seedUsers.length * 312} delta="+5,6%" />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <section className="card p-5 sm:p-6">
          <h2 className="text-base font-bold text-ink">Penjualan Mingguan</h2>
          <p className="mt-1 text-sm text-muted">Total transaksi 7 hari terakhir.</p>
          <div className="mt-6">
            <BarChart data={weeklySales} formatValue={shortRupiah} />
          </div>
        </section>

        <section className="card p-5 sm:p-6">
          <h2 className="text-base font-bold text-ink">Produk Terlaris</h2>
          <ul className="mt-5 space-y-4">
            {topProducts.map((p, i) => (
              <li key={p.name}>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="min-w-0 truncate font-semibold text-ink">
                    {i + 1}. {p.name}
                  </span>
                  <span className="shrink-0 text-muted">{p.sold}</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-canvas">
                  <div
                    className="h-2 rounded-full bg-brand-500"
                    style={{ width: `${(p.sold / topProducts[0].sold) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="card overflow-hidden">
        <div className="flex items-center justify-between gap-4 border-b border-line p-5">
          <h2 className="text-base font-bold text-ink">Pesanan Terbaru</h2>
          <Link to="/admin/orders" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:underline">
            Lihat semua <ArrowRight size={15} />
          </Link>
        </div>
        <DataTable columns={columns} rows={orders.slice(0, 6)} />
      </section>
    </div>
  );
}
