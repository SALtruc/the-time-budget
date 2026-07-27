"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { Button } from "@/components/ui/Button";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { updatePlayerProfile } from "@/lib/supabase/profiles";
import { usePlayerStore } from "@/lib/store/usePlayerStore";
import { AVATARS } from "@/lib/game/avatars";

export default function AvatarPage() {
  const router = useRouter();
  const avatarId = usePlayerStore((s) => s.avatarId);
  const setAvatarId = usePlayerStore((s) => s.setAvatarId);
  const playerProfileId = usePlayerStore((s) => s.playerProfileId);

  async function handleNext() {
    if (!avatarId) return;
    if (isSupabaseConfigured && playerProfileId) {
      await updatePlayerProfile(playerProfileId, { avatarId }).catch(() => {});
    }
    router.push("/profile");
  }

  return (
    <main className="bg-grid-yellow flex flex-1 flex-col px-4 py-8 sm:py-10">
      <ScreenHeader backHref="/rmit-id" theme="yellow" />

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center">
        <h1 className="mb-8 text-center font-display text-2xl sm:text-3xl leading-tight">
          But first, let&apos;s choose your <span className="text-brand-red">avatar</span>
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-7">
          {AVATARS.map((avatar) => {
            const isSelected = avatarId === avatar.id;
            return (
              <div key={avatar.id} className="relative">
                {/* Each avatar PNG already bakes in its own circle + border +
                    drop shadow on a yellow square that matches this page's
                    background, so it's shown edge-to-edge — no second CSS
                    circle wrapped around it (that was the "double ring /
                    bulging" bug). Selection is a ring drawn on top instead
                    of a container that reflows/crops the art. */}
                <button
                  type="button"
                  onClick={() => setAvatarId(avatar.id)}
                  aria-pressed={isSelected}
                  className="block aspect-square w-full select-none overflow-hidden rounded-2xl [-webkit-tap-highlight-color:transparent] active:opacity-80"
                >
                  <Image
                    src={avatar.src}
                    alt=""
                    width={276}
                    height={276}
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                </button>
                <span
                  aria-hidden
                  className={clsx(
                    "pointer-events-none absolute inset-[3%] rounded-full border-4 transition-colors duration-150",
                    isSelected ? "border-brand-red" : "border-transparent"
                  )}
                />
                {isSelected && (
                  <span className="pointer-events-none absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full border-ink bg-brand-red font-display text-base text-white shadow-sticker-sm">
                    ✓
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 w-full max-w-md">
          <Button
            variant="secondary"
            size="lg"
            className="w-full"
            disabled={!avatarId}
            onClick={handleNext}
          >
            Next ›
          </Button>
        </div>
      </div>
    </main>
  );
}
