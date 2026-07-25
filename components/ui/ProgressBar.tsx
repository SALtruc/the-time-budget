import clsx from "clsx";

export function ProgressBar({
  percent,
  className,
  colorClassName = "bg-brand-navy",
}: {
  percent: number;
  className?: string;
  colorClassName?: string;
}) {
  const clamped = Math.max(0, Math.min(100, percent));

  return (
    <div
      className={clsx(
        "h-3 w-full rounded-full bg-brand-grey overflow-hidden",
        className
      )}
      role="progressbar"
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={clsx("h-full rounded-full transition-all", colorClassName)}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
