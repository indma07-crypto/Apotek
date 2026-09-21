/**
 * Grafik batang SVG ringan (tanpa dependensi chart eksternal).
 * data: [{ label, value }]
 */
export default function BarChart({ data, formatValue = (v) => v, color = '#059669' }) {
  const max = data.reduce((m, d) => (d.value > m ? d.value : m), 0) || 1;
  return (
    <div>
      <div className="flex h-48 items-end gap-2 sm:gap-3" role="img" aria-label="Grafik penjualan">
        {data.map((d) => (
          <div key={d.label} className="group flex flex-1 flex-col items-center gap-2">
            <span className="text-[10px] font-semibold text-muted opacity-0 transition group-hover:opacity-100">
              {formatValue(d.value)}
            </span>
            <div
              className="w-full rounded-t-lg transition-all duration-500"
              style={{ height: `${Math.max((d.value / max) * 100, 6)}%`, backgroundColor: color, opacity: 0.85 }}
            />
            <span className="text-[11px] font-medium text-muted">{d.label}</span>
          </div>
        ))}
      </div>
      {/* Nilai juga tersedia sebagai teks, tidak bergantung warna saja. */}
      <ul className="sr-only">
        {data.map((d) => (
          <li key={d.label}>{d.label}: {formatValue(d.value)}</li>
        ))}
      </ul>
    </div>
  );
}
