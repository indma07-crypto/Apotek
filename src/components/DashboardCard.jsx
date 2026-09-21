import { TrendingUp, TrendingDown } from 'lucide-react';

export default function DashboardCard({ icon: Icon, label, value, delta, positive = true }) {
  const Trend = positive ? TrendingUp : TrendingDown;
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
          <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
        </span>
        {delta ? (
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
              positive ? 'bg-brand-50 text-brand-700' : 'bg-red-50 text-red-600'
            }`}
          >
            <Trend size={13} aria-hidden="true" /> {delta}
          </span>
        ) : null}
      </div>
      <p className="mt-4 text-sm text-muted">{label}</p>
      <p className="mt-1 font-display text-2xl font-extrabold text-ink">{value}</p>
    </div>
  );
}
