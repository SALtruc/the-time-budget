"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { StickerCard } from "@/components/ui/StickerCard";
import { Ribbon } from "@/components/ui/Ribbon";
import { ScreenHeader } from "@/components/ui/ScreenHeader";

const MODES = [
  {
    href: "/self-paced",
    icon: "🧑",
    title: "Self-paced",
    titleColor: "text-brand-gold-dark",
    accent: "var(--color-brand-gold-dark)",
    description: "Allocate your own 40-hour week and see your outcomes.",
  },
  {
    href: "/pair",
    icon: "🧑‍🤝‍🧑",
    title: "Pair Comparison",
    titleColor: "text-brand-cyan",
    accent: "var(--color-brand-cyan)",
    description:
      "Each player plans separately, then compare and reflect together. No right answer, just dialogue.",
  },
  {
    href: "/group",
    icon: "👑",
    title: "Group Roleplay",
    titleColor: "text-brand-pink",
    accent: "var(--color-brand-pink)",
    description:
      "Assign roles, student leader vs team member, and plan the week together with different priorities.",
  },
];

export default function ModePage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <main className="bg-grid-blue flex flex-1 flex-col px-4 py-8 sm:py-10">
      <ScreenHeader />

      <div className="mx-auto w-full max-w-2xl">
        <Image
          src="/assets/logo.png"
          alt="The Time Budget"
          width={800}
          height={220}
          className="mx-auto mb-6 w-full max-w-xs h-auto"
        />

        <Ribbon color="gold" className="mb-6">
          First, pick how you want to play this week&apos;s simulation
        </Ribbon>

        <div className="flex flex-col gap-5">
          {MODES.map((mode) => {
            const isSelected = selected === mode.href;
            return (
              <button
                key={mode.href}
                type="button"
                onClick={() => setSelected(mode.href)}
                className={clsx(
                  "text-left rounded-3xl transition-transform",
                  isSelected && "scale-[1.02]"
                )}
              >
                <StickerCard
                  className="flex items-center gap-4 p-5 sm:p-6 transition-colors"
                  style={
                    isSelected
                      ? { borderColor: mode.accent, borderWidth: "3.5px" }
                      : undefined
                  }
                >
                  <span className="text-4xl shrink-0" aria-hidden>
                    {mode.icon}
                  </span>
                  <div className="flex-1">
                    <h2 className={clsx("font-display text-lg sm:text-xl", mode.titleColor)}>
                      {mode.title.toUpperCase()}
                    </h2>
                    <p className="mt-1 text-sm sm:text-base text-brand-navy">
                      {mode.description}
                    </p>
                  </div>
                  <span
                    className="h-7 w-7 shrink-0 rounded-full border-ink"
                    style={{ backgroundColor: isSelected ? mode.accent : "white" }}
                  />
                </StickerCard>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col items-center gap-4">
          <Button
            variant="secondary"
            size="lg"
            disabled={!selected}
            onClick={() => selected && router.push(selected)}
          >
            Next ›
          </Button>
          <Link
            href="/how-to-play"
            className="text-sm sm:text-base font-bold text-white underline underline-offset-4"
          >
            How does this work?
          </Link>
        </div>
      </div>
    </main>
  );
}
