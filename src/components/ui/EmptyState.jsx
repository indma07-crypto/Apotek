export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="card flex flex-col items-center px-6 py-14 text-center">
      {Icon ? (
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600">
          <Icon size={26} aria-hidden="true" />
        </div>
      ) : null}
      <h3 className="mt-4 text-lg font-bold text-ink">{title}</h3>
      {description ? <p className="mt-1.5 max-w-sm text-sm text-muted">{description}</p> : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
