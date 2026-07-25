import { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

const RIBBON_CLIP = "polygon(0 0, 100% 0, 88% 50%, 100% 100%, 0 100%)";

export function Ribbon({
  children,
  color = "red",
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  color?: "red" | "gold";
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
        className={clsx("relative px-6 py-4 sm:px-7 sm:py-5 font-bold leading-snug", bg, text)}
        style={{ clipPath: RIBBON_CLIP }}
      >
        {children}
      </div>
    </div>
  );
}
