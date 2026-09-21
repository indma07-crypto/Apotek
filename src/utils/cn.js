import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Gabungkan class Tailwind secara aman: kalau ada dua class dari kategori sama
// yang bentrok (mis. bg-brand-600 vs bg-white), class yang ditulis TERAKHIR
// yang menang -- deterministik, tidak tergantung urutan Tailwind meng-generate CSS.
// Tanpa ini, string join biasa bisa membuat class dari `className` prop
// "kalah" oleh class bawaan komponen (contoh nyata: tombol jadi teks putih
// di atas background putih karena text-white vs text-brand-700 bentrok).
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
