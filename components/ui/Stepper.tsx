export function Stepper({
  value,
  onChange,
  step = 5,
  min = 0,
  max = 100,
}: {
  value: number;
  onChange: (next: number) => void;
  step?: number;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        aria-label="Decrease"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - step))}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-ink bg-white font-display text-xl shadow-sticker-sm active-press transition-colors hover:bg-brand-cream disabled:pointer-events-none disabled:opacity-40"
      >
        −
      </button>
      <span className="min-w-[3.5rem] text-center font-display text-2xl sm:text-3xl">
        {value}%
      </span>
      <button
        type="button"
        aria-label="Increase"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + step))}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-ink bg-white font-display text-xl shadow-sticker-sm active-press transition-colors hover:bg-brand-cream disabled:pointer-events-none disabled:opacity-40"
      >
        +
      </button>
    </div>
  );
}
