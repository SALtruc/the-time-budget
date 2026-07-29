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
    <main className="bg-grid-yellow flex flex-1 flex-col px-4 py-5 sm:py-8">
      <ScreenHeader backHref="/rmit-id" theme="yellow" showHelp={false} />

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-start">
        <h1 className="mb-4 max-w-xs text-center font-display text-xl leading-tight sm:mb-7 sm:text-3xl">
          But first, let&apos;s choose your <span className="text-brand-red">avatar</span>
        </h1>

        <div className="grid w-full max-w-[312px] grid-cols-2 gap-x-6 gap-y-4 sm:max-w-2xl sm:grid-cols-4 sm:gap-6">
          {AVATARS.map((avatar, index) => {
            const isSelected = avatarId === avatar.id;
            return (
              <div key={avatar.id} className="relative aspect-square">
                <button
                  type="button"
                  onClick={() => setAvatarId(avatar.id)}
                  aria-pressed={isSelected}
                  className={clsx(
                    "absolute inset-0 block select-none overflow-visible rounded-full bg-transparent [-webkit-tap-highlight-color:transparent] transition-transform duration-150",
                    isSelected ? "-translate-y-[3px] scale-[1.015]" : "active:opacity-80"
                  )}
                >
                  <Image
                    src={isSelected ? avatar.selectedSrc : avatar.nonSelectedSrc}
                    alt=""
                    width={300}
                    height={300}
                    sizes="(max-width: 640px) 144px, 150px"
                    priority={index < 4}
                    unoptimized
                    className="h-full w-full object-contain object-center"
                    draggable={false}
                  />
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-4 w-full max-w-[312px] sm:mt-8 sm:max-w-md">
          <Button
            variant="primary"
            size="lg"
            className="w-full !bg-brand-blue !text-white"
            disabled={!avatarId}
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      </div>
    </main>
  );
}
