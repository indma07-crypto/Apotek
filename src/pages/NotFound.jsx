import { Compass } from 'lucide-react';
import EmptyState from '../components/ui/EmptyState.jsx';
import Button from '../components/ui/Button.jsx';

export default function NotFound() {
  return (
    <div className="container-page py-24">
      <EmptyState
        icon={Compass}
        title="Halaman tidak ditemukan"
        description="Tautan yang Anda buka mungkin sudah dipindahkan atau tidak tersedia lagi."
        action={<Button to="/">Kembali ke Beranda</Button>}
      />
    </div>
  );
}
