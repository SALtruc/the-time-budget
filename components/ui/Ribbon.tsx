import { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

const RIBBON_CLIP = "polygon(0 0, 100% 0, 88% 50%, 100% 100%, 0 100%)";

export function Ribbon({
  children,
  color = "red",
  className,
  contentClassName,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  color?: "red" | "gold";
  /** Classes for the visible clipped content layer (use this for flex/layout tweaks, not `className`). */
  contentClassName?: string;
}) {
  const bg = color === "red" ? "bg-brand-red" : "bg-brand-gold";
  const text = color === "red" ? "text-white" : "text-brand-navy";

  return (
    <div className={clsx("relative", className)} {...props}>
      <div
        aria-hidden
        className="absolute inset-0 translate-x-[5px] translate-y-[5px] bg-brand-navy"
        style={{ clipPath: RIBBON_CLIP }}
      />
      <div
        className={clsx(
          "relative w-full py-2 pl-4 pr-[15%] text-sm font-bold leading-snug sm:py-2.5 sm:pl-5 sm:text-base",
          bg,
          text,
          contentClassName
        )}
        style={{ clipPath: RIBBON_CLIP }}
      >
        {children}
      </div>
    </div>
  );
}
