/**
 * Tabel data sederhana dan responsif.
 * columns: [{ key, header, className, render?(row) }]
 */
export default function DataTable({ columns, rows, empty = 'Belum ada data.', rowKey = (r) => r.id }) {
  if (!rows.length) {
    return <p className="px-5 py-10 text-center text-sm text-muted">{empty}</p>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-line">
            {columns.map((c) => (
              <th key={c.key} className={`px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted ${c.className || ''}`}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={rowKey(row)} className="border-b border-line/70 last:border-b-0 transition hover:bg-brand-50/40">
              {columns.map((c) => (
                <td key={c.key} className={`px-4 py-3.5 align-middle text-ink ${c.className || ''}`}>
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
