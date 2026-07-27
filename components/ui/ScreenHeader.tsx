"use client";

import Image from "next/image";
import Link from "next/link";
import { usePlayerStore } from "@/lib/store/usePlayerStore";
import { getAvatarSrc } from "@/lib/game/avatars";

export function ScreenHeader({
  backHref,
  theme = "blue",
}: {
  backHref?: string;
  theme?: "blue" | "yellow";
}) {
  const textColor = theme === "blue" ? "text-white" : "text-brand-navy";
  const avatarId = usePlayerStore((s) => s.avatarId);
  const avatarSrc = getAvatarSrc(avatarId) ?? "/assets/mascot-start.png";

  return (
    <div className="mb-6 flex flex-col gap-2">
      <div className="flex items-start justify-between">
        <Image
          src="/assets/logo-badge.png"
          alt="The Time Budget"
          width={113}
          height={112}
          className="h-10 w-auto sm:h-12"
        />
        <Image
          src={avatarSrc}
          alt=""
          width={72}
          height={72}
          className="h-14 w-14 sm:h-16 sm:w-16 rounded-full border-ink bg-white object-cover object-top shadow-sticker-sm"
        />
      </div>
      <div className="flex items-center justify-between">
        {backHref ? (
          <Link
            href={backHref}
            className={`-m-2 flex min-h-11 items-center gap-1 rounded-full p-2 text-base font-bold active-press sm:text-lg ${textColor}`}
          >
            ‹ Back
          </Link>
        ) : (
          <span />
        )}
        <Link
          href="/how-to-play"
          aria-label="How to play"
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-ink bg-white font-display text-base text-brand-navy shadow-sticker-sm active-press transition-colors hover:bg-brand-cream`}
        >
          ?
        </Link>
      </div>
    </div>
  );
}
