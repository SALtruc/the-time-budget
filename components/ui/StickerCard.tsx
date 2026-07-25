import { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

export function StickerCard({
  children,
  className,
  tone = "white",
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  tone?: "white" | "gold" | "navy" | "cream" | "custom";
}) {
  const toneClasses: Record<string, string> = {
    white: "bg-white",
    gold: "bg-brand-gold",
    navy: "bg-brand-navy text-white",
    cream: "bg-brand-cream",
    custom: "",
  };

  return (
    <div
      className={clsx(
        "rounded-3xl border-ink shadow-sticker",
        toneClasses[tone],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
