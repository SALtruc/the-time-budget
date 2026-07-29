import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary: "bg-brand-red text-white hover:bg-brand-red-dark",
  secondary: "bg-brand-gold text-brand-navy hover:bg-brand-gold-dark hover:text-white",
  outline: "bg-white text-brand-navy hover:bg-brand-cream",
  ghost: "bg-brand-grey/40 text-brand-navy hover:bg-brand-grey/70",
};

const sizeClasses: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm sm:text-base",
  lg: "px-7 py-3 text-base sm:text-lg",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
}) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-[28px] font-display border-ink shadow-sticker active-press transition-[transform,background-color,color,box-shadow] duration-200 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
      {icon}
    </button>
  );
}
