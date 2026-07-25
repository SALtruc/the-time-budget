const STRIPE_COLORS = [
  "bg-brand-red",
  "bg-brand-cyan",
  "bg-white",
  "bg-brand-navy",
  "bg-brand-pink",
  "bg-white",
  "bg-brand-cyan",
  "bg-brand-navy",
  "bg-brand-gold",
];

export function StripeDivider() {
  return (
    <div className="flex h-8 w-full overflow-hidden rounded-t-2xl border-x-2.5 border-t-2.5 border-brand-navy">
      {STRIPE_COLORS.map((color, i) => (
        <div key={i} className={`h-full flex-1 ${color}`} />
      ))}
    </div>
  );
}
