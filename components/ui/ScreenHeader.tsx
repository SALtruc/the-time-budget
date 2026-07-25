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
          className={`-m-3 flex min-h-11 min-w-11 items-center rounded-full p-3 text-base font-semibold active:bg-black/10 sm:text-lg ${
            theme === "blue" ? "text-white" : "text-brand-navy"
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
        width={64}
        height={64}
        className="h-12 w-12 sm:h-14 sm:w-14 rounded-full border-ink bg-white object-cover object-top shadow-sticker-sm"
      />
    </div>
  );
}
