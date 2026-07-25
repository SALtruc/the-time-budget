import Link from "next/link";
import { StickerCard } from "@/components/ui/StickerCard";

const MODES = [
  {
    href: "/self-paced",
    icon: "🧑",
    title: "Self-paced",
    description: "Allocate your own 40-hour week and see your outcomes.",
    meta: "10–15 min · Solo",
  },
  {
    href: "/pair",
    icon: "🤜🤛",
    title: "Pair Comparison",
    description:
      "Team up with a partner, allocate separately, then compare your results side-by-side.",
    meta: "20–25 min · 2 players",
  },
  {
    href: "/group",
    icon: "👥",
    title: "Group Roleplay",
    description:
      "Get assigned a role with real constraints, allocate within them, then discuss as a group.",
    meta: "35–45 min · 3+ players",
  },
];

export default function ModePage() {
  return (
    <main className="flex flex-1 flex-col items-center gap-8 px-4 py-12 sm:py-16">
      <h1 className="font-display text-3xl sm:text-4xl text-center">
        Choose your mode
      </h1>

      <div className="flex w-full max-w-2xl flex-col gap-5">
        {MODES.map((mode) => (
          <Link key={mode.href} href={mode.href}>
            <StickerCard className="flex items-center gap-4 p-5 sm:p-6 hover:-translate-y-0.5 transition-transform">
              <span className="text-4xl shrink-0" aria-hidden>
                {mode.icon}
              </span>
              <div className="flex-1">
                <h2 className="font-display text-xl sm:text-2xl text-brand-red">
                  {mode.title.toUpperCase()}
                </h2>
                <p className="mt-1 text-sm sm:text-base">{mode.description}</p>
                <p className="mt-1 text-xs sm:text-sm font-bold text-brand-navy/60">
                  {mode.meta}
                </p>
              </div>
              <span className="font-display text-2xl shrink-0" aria-hidden>
                ›
              </span>
            </StickerCard>
          </Link>
        ))}
      </div>

      <Link
        href="/how-to-play"
        className="text-sm sm:text-base font-bold underline underline-offset-4"
      >
        How does this work?
      </Link>
    </main>
  );
}
