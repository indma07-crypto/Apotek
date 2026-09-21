import Badge from './Badge.jsx';

const tone = {
  Pending: 'neutral',
  Diproses: 'warn',
  Dikirim: 'info',
  Selesai: 'brand',
  Dibatalkan: 'danger',
};

export default function StatusPill({ status }) {
  return <Badge tone={tone[status] || 'neutral'}>{status}</Badge>;
}
