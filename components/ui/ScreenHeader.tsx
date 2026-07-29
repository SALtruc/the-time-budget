"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { usePlayerStore } from "@/lib/store/usePlayerStore";
import { getAvatarSrc } from "@/lib/game/avatars";
import { StickerCard } from "./StickerCard";

export function ScreenHeader({
  backHref,
  onBack,
  theme = "blue",
  showHelp = true,
}: {
  backHref?: string;
  onBack?: () => void;
  theme?: "blue" | "yellow";
  showHelp?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const textColor = theme === "blue" ? "text-white" : "text-brand-navy";
  const avatarId = usePlayerStore((s) => s.avatarId);
  const avatarSrc = getAvatarSrc(avatarId) ?? "/assets/mascot-start.png";
  const [confirmingHome, setConfirmingHome] = useState(false);

  return (
    <div className="mb-4 flex flex-col gap-2">
      <div className="flex items-start justify-between">
        <button
          type="button"
          aria-label="Back to home"
          onClick={() => setConfirmingHome(true)}
          className="active-press rounded-2xl"
        >
          <Image
            src="/assets/logo-badge.png"
            alt="The Time Budget"
            width={113}
            height={112}
            className="h-14 w-auto sm:h-16"
          />
        </button>
        <Image
          src={avatarSrc}
          alt=""
          width={72}
          height={72}
          className="h-14 w-14 sm:h-16 sm:w-16 rounded-full border-ink bg-white object-cover object-top shadow-sticker-sm"
        />
      </div>
      <div className="flex items-center justify-between">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className={`-m-2 flex min-h-11 items-center gap-1 rounded-full p-2 text-base font-bold active-press sm:text-lg ${textColor}`}
          >
            Back
          </button>
        ) : backHref ? (
          <Link
            href={backHref}
            className={`-m-2 flex min-h-11 items-center gap-1 rounded-full p-2 text-base font-bold active-press sm:text-lg ${textColor}`}
          >
            Back
          </Link>
        ) : (
          <span />
        )}
        {showHelp ? (
          <Link
            href={`/how-to-play?from=${encodeURIComponent(pathname)}`}
            aria-label="How to play"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-ink bg-white font-display text-base text-brand-navy shadow-sticker-sm active-press transition-colors hover:bg-brand-cream sm:h-11 sm:w-11 sm:text-lg"
          >
            ?
          </Link>
        ) : (
          <span />
        )}
      </div>

      {confirmingHome && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Leave and go home?"
          onClick={() => setConfirmingHome(false)}
        >
          <StickerCard
            tone="cream"
            className="w-full max-w-sm p-6 text-center"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="font-display text-xl mb-2">Leave this session?</h2>
            <p className="text-sm sm:text-base leading-relaxed mb-5">
              Going back to the home screen will leave what you&apos;re doing
              here. Continue?
            </p>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => router.push("/")}
                className="rounded-full border-ink bg-brand-red px-5 py-3 font-display text-base text-white shadow-sticker-sm active-press"
              >
                Yes, go home
              </button>
              <button
                type="button"
                onClick={() => setConfirmingHome(false)}
                className="rounded-full border-ink bg-white px-5 py-3 font-display text-base text-brand-navy shadow-sticker-sm active-press"
              >
                Stay here
              </button>
            </div>
          </StickerCard>
        </div>
      )}
    </div>
  );
}
