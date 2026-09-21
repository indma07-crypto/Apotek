import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import BottomNav from './BottomNav.jsx';
import Toast from '../ui/Toast.jsx';
import ErrorBoundary from '../ErrorBoundary.jsx';

export default function SiteLayout() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Block body eksplisit: memastikan effect ini TIDAK PERNAH mengembalikan
    // apa pun selain undefined, bahkan jika window.scrollTo dipatch ekstensi
    // browser (mis. wallet extension) agar mengembalikan Promise/nilai lain.
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {/* key memicu transisi halus setiap ganti halaman, dan mereset ErrorBoundary
          jika halaman sebelumnya sempat error, sehingga pindah halaman tidak perlu refresh. */}
      <main key={pathname} className="flex-1 animate-fade-in pb-20 md:pb-0">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
      <BottomNav />
      <Toast />
    </div>
  );
}
