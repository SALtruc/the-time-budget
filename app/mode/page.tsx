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
    icon: "solo",
    title: "Self-paced",
    titleColor: "text-brand-gold-dark",
    accent: "var(--color-brand-gold-dark)",
    description: "Allocate your own 168-hour week and see your outcomes.",
  },
  {
    href: "/pair",
    icon: "pair",
    title: "Pair Comparison",
    titleColor: "text-brand-cyan",
    accent: "var(--color-brand-cyan)",
    description:
      "Each player plans separately, then compare and reflect together. No right answer, just dialogue.",
  },
  {
    href: "/group",
    icon: "group",
    title: "Group Roleplay",
    titleColor: "text-brand-pink",
    accent: "var(--color-brand-pink)",
    description:
      "Assign roles, student leader vs team member, and plan the week together with different priorities.",
  },
];

function ModeGlyph({
  type,
  className = "size-14",
}: {
  type: string;
  className?: string;
}) {
  if (type === "group") {
    return (
      <svg viewBox="0 0 64 64" className={className} aria-hidden>
        <path
          d="M9 50h46l-5-28-13 10-5-18-5 18-13-10z"
          fill="#f6c400"
          stroke="#10142a"
          strokeLinejoin="round"
          strokeWidth="5"
        />
      </svg>
    );
  }

  const pair = type === "pair";
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      {pair && (
        <>
          <circle cx="39" cy="22" r="12" fill="#2f5fe6" stroke="#10142a" strokeWidth="5" />
          <path
            d="M29 54c1-16 8-24 20-24s19 8 20 24"
            fill="#f45fd0"
            stroke="#10142a"
            strokeLinejoin="round"
            strokeWidth="5"
          />
        </>
      )}
      <circle cx="25" cy="22" r="12" fill="#2f5fe6" stroke="#10142a" strokeWidth="5" />
      <path
        d="M5 54c1-16 8-24 20-24s19 8 20 24"
        fill="#e5202e"
        stroke="#10142a"
        strokeLinejoin="round"
        strokeWidth="5"
      />
    </svg>
  );
}

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
          className="mx-auto mb-6 h-auto w-full max-w-xs"
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
                aria-pressed={isSelected}
                onClick={() => setSelected(mode.href)}
                className={clsx(
                  "rounded-3xl text-left transition-transform duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
                  isSelected && "scale-[1.02]"
                )}
              >
                <StickerCard
                  className="flex items-center gap-4 p-5 transition-colors sm:p-6"
                  style={
                    isSelected
                      ? { borderColor: mode.accent, borderWidth: "3.5px" }
                      : undefined
                  }
                >
                  <ModeGlyph type={mode.icon} className="size-16 shrink-0" />
                  <div className="flex-1">
                    <h2 className={clsx("font-display text-lg sm:text-xl", mode.titleColor)}>
                      {mode.title.toUpperCase()}
                    </h2>
                    <p className="mt-1 text-sm text-pretty text-brand-navy sm:text-base">
                      {mode.description}
                    </p>
                  </div>
                  <span
                    className="size-7 shrink-0 rounded-full border-ink"
                    style={{ backgroundColor: isSelected ? mode.accent : "white" }}
                  />
                </StickerCard>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col items-center gap-4">
          <Button
            variant="primary"
            size="lg"
            disabled={!selected}
            onClick={() => selected && router.push(selected)}
            className="!bg-brand-blue !text-white"
          >
            Next
          </Button>
          <Link
            href="/how-to-play?from=/mode"
            className="text-sm font-bold text-white underline underline-offset-4 sm:text-base"
          >
            How does this work?
          </Link>
        </div>
      </div>
    </main>
  );
}
