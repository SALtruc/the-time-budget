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
                <button
                  type="button"
                  onClick={() => setAvatarId(avatar.id)}
                  className={clsx(
                    "aspect-square w-full rounded-full border-ink p-1.5 transition-all active:scale-95",
                    isSelected
                      ? "scale-105 bg-brand-red ring-4 ring-brand-red"
                      : "bg-white"
                  )}
                >
                  <span className="block h-full w-full overflow-hidden rounded-full bg-white">
                    <Image
                      src={avatar.src}
                      alt=""
                      width={276}
                      height={276}
                      className="h-full w-full object-cover"
                    />
                  </span>
                </button>
                {isSelected && (
                  <span className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-ink bg-brand-red font-display text-sm text-white shadow-sticker-sm">
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
