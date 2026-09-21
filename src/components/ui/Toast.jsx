import { CheckCircle2, Info } from 'lucide-react';
import { useStore } from '../../context/StoreContext.jsx';

export default function Toast() {
  const { toast } = useStore();
  if (!toast) return null;
  const Icon = toast.tone === 'info' ? Info : CheckCircle2;
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-4 bottom-24 z-[80] mx-auto w-fit max-w-[92vw] animate-slide-up sm:bottom-8"
    >
      <div className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 shadow-lift">
        <Icon size={18} className={toast.tone === 'info' ? 'text-info-600' : 'text-brand-600'} />
        <p className="text-sm font-medium text-ink">{toast.message}</p>
      </div>
    </div>
  );
}
