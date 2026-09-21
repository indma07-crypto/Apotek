const IDR = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});

const DATE = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

export const formatRupiah = (value) => IDR.format(value || 0);
export const formatDate = (iso) => DATE.format(new Date(iso));
export const discountPercent = (price, oldPrice) =>
  oldPrice && oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;
export const orderNumber = () =>
  'INV-' + new Date().getFullYear() + '-' + Math.floor(100000 + Math.random() * 900000);
