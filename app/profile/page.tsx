"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Ribbon } from "@/components/ui/Ribbon";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { InfoModal } from "@/components/ui/InfoModal";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { updatePlayerProfile } from "@/lib/supabase/profiles";
import { usePlayerStore } from "@/lib/store/usePlayerStore";

export default function ProfilePage() {
  const router = useRouter();
  const yearOfStudy = usePlayerStore((s) => s.yearOfStudy);
  const program = usePlayerStore((s) => s.program);
  const accessCode = usePlayerStore((s) => s.accessCode);
  const setProfileFields = usePlayerStore((s) => s.setProfileFields);
  const playerProfileId = usePlayerStore((s) => s.playerProfileId);

  const [submitting, setSubmitting] = useState(false);

  async function handleNext() {
    setSubmitting(true);
    if (isSupabaseConfigured && playerProfileId) {
      await updatePlayerProfile(playerProfileId, {
        yearOfStudy,
        program,
        accessCode,
      }).catch(() => {});
    }
    router.push("/mode");
  }

  return (
    <main className="bg-grid-blue flex flex-1 flex-col px-4 py-6 sm:py-10">
      <ScreenHeader backHref="/avatar" />

      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-4 sm:gap-5">
        <div className="flex items-center gap-3">
          <Image
            src="/assets/mascot-start.png"
            alt=""
            width={150}
            height={185}
            className="h-auto w-24 shrink-0 sm:w-28 animate-mascot-bob"
          />
          <div className="rounded-[16px] border-ink bg-white px-4 py-3 text-sm font-semibold shadow-sticker-sm sm:text-base">
            Tell us more about yourself
          </div>
        </div>

        <div>
          <Ribbon color="gold" className="mb-2">
            What year of study are you in?
          </Ribbon>
          <input
            type="text"
            value={yearOfStudy}
            onChange={(e) => setProfileFields({ yearOfStudy: e.target.value })}
            placeholder="e.g. Year 3"
            className="w-full rounded-[16px] border-ink bg-white px-4 py-2.5 text-base font-semibold shadow-sticker-sm"
          />
        </div>

        <div>
          <Ribbon color="gold" className="mb-2">
            What is your current program?
          </Ribbon>
          <input
            type="text"
            value={program}
            onChange={(e) => setProfileFields({ program: e.target.value })}
            placeholder="e.g. Digital Marketing"
            className="w-full rounded-[16px] border-ink bg-white px-4 py-2.5 text-base font-semibold shadow-sticker-sm"
          />
        </div>

        <div>
          <Ribbon
            color="gold"
            className="mb-2"
            contentClassName="flex items-center gap-3 pr-10"
          >
            <span>Access code (Optional)</span>
            <InfoModal title="Access code">
              If your facilitator gave you a class access code, enter it here. Otherwise,
              leave this blank.
            </InfoModal>
          </Ribbon>
          <input
            type="text"
            value={accessCode}
            onChange={(e) => setProfileFields({ accessCode: e.target.value })}
            placeholder="e.g. CXVED"
            className="w-full rounded-[16px] border-ink bg-white px-4 py-2.5 text-base font-semibold shadow-sticker-sm"
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button
            variant="secondary"
            size="lg"
            disabled={submitting}
            onClick={handleNext}
          >
            {submitting ? "Please wait..." : "Next"}
          </Button>
        </div>
      </div>
    </main>
  );
}
