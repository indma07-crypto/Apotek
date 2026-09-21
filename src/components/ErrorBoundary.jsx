import { Component } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import Button from './ui/Button.jsx';

// Menangkap error render agar layar tidak putih kosong tanpa penjelasan.
// Kunci diganti setiap ganti route (lihat SiteLayout), jadi error di satu
// halaman tidak mengunci seluruh aplikasi -- pindah halaman otomatis reset.
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('Render error tertangkap ErrorBoundary:', error, info?.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="container-page grid min-h-[60vh] place-items-center py-16">
          <div className="card max-w-md p-8 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-red-50 text-red-600">
              <AlertTriangle size={26} aria-hidden="true" />
            </span>
            <h1 className="mt-4 text-lg font-bold text-ink">Terjadi kesalahan</h1>
            <p className="mt-2 text-sm text-muted">
              Halaman ini gagal dimuat. Detail teknis ada di console browser (tekan F12).
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button onClick={() => window.location.reload()} size="sm">
                <RotateCcw size={15} /> Muat Ulang
              </Button>
              <Button href="/" variant="secondary" size="sm">
                <Home size={15} /> Kembali ke Beranda
              </Button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
