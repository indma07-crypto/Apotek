export default function SectionHeading({ eyebrow, title, description, action, align = 'left' }) {
  const center = align === 'center';
  return (
    <div
      className={`flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${
        center ? 'sm:flex-col sm:items-center text-center' : ''
      }`}
    >
      <div className={center ? 'max-w-2xl' : 'max-w-xl'}>
        {eyebrow ? (
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-brand-600">{eyebrow}</p>
        ) : null}
        <h2 className="section-title">{title}</h2>
        {description ? <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
