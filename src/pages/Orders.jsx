import { useMemo, useState } from 'react';
import { ReceiptText } from 'lucide-react';
import OrderCard from '../components/OrderCard.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import Button from '../components/ui/Button.jsx';
import { useStore } from '../context/StoreContext.jsx';

const tabs = ['Semua', 'Diproses', 'Dikirim', 'Selesai', 'Dibatalkan'];

export default function Orders() {
  const { orders } = useStore();
  const [tab, setTab] = useState('Semua');
  const list = useMemo(
    () => (tab === 'Semua' ? orders : orders.filter((o) => o.status === tab)),
    [orders, tab]
  );

  return (
    <div className="container-page py-10 sm:py-14">
      <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">Pesanan Saya</h1>
      <p className="mt-2 text-[15px] text-muted">Pantau status pesanan dan riwayat belanja Anda.</p>

      <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-1">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            aria-pressed={tab === t}
            className={`h-10 shrink-0 rounded-full border px-4 text-sm font-semibold transition ${
              tab === t
                ? 'border-brand-600 bg-brand-600 text-white'
                : 'border-line bg-white text-muted hover:border-brand-300 hover:text-brand-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {list.map((o) => (
          <OrderCard key={o.id} order={o} />
        ))}
      </div>

      {list.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            icon={ReceiptText}
            title="Belum ada pesanan"
            description={`Tidak ada pesanan dengan status "${tab}".`}
            action={<Button to="/products">Mulai Belanja</Button>}
          />
        </div>
      ) : null}
    </div>
  );
}
