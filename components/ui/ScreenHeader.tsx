import Image from "next/image";
import Link from "next/link";

export function ScreenHeader({
  backHref,
  theme = "blue",
}: {
  backHref?: string;
  theme?: "blue" | "yellow";
}) {
  return (
    <div className="mb-6 flex items-center justify-between">
      {backHref ? (
        <Link
          href={backHref}
          className={`flex min-h-11 items-center gap-1 rounded-full border-ink px-4 py-2 text-base font-bold shadow-sticker-sm active-press sm:text-lg ${
            theme === "blue" ? "bg-brand-navy text-white" : "bg-white text-brand-navy"
          }`}
        >
          ‹ Back
        </Link>
      ) : (
        <span />
      )}
      <Image
        src="/assets/mascot-start.png"
        alt=""
        width={72}
        height={72}
        className="h-14 w-14 sm:h-16 sm:w-16 rounded-full border-ink bg-white object-cover object-top shadow-sticker-sm"
      />
    </div>
  );
}
