"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { Button } from "@/components/ui/Button";
import { Ribbon } from "@/components/ui/Ribbon";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { InfoModal } from "@/components/ui/InfoModal";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { updatePlayerProfile } from "@/lib/supabase/profiles";
import { usePlayerStore } from "@/lib/store/usePlayerStore";
import { YEAR_OF_STUDY_OPTIONS } from "@/lib/game/yearOfStudy";

// Fixed burst directions so the confetti looks the same on every render
// (no Math.random during render).
const CONFETTI = [
  { dx: "-70px", dy: "-60px", rot: "-200deg", color: "var(--color-brand-red)" },
  { dx: "-40px", dy: "-85px", rot: "160deg", color: "var(--color-brand-cyan)" },
  { dx: "0px", dy: "-95px", rot: "240deg", color: "var(--color-brand-pink)" },
  { dx: "40px", dy: "-85px", rot: "-150deg", color: "#ffffff" },
  { dx: "72px", dy: "-55px", rot: "210deg", color: "var(--color-brand-gold)" },
  { dx: "-80px", dy: "-15px", rot: "120deg", color: "var(--color-brand-pink)" },
  { dx: "82px", dy: "-12px", rot: "-120deg", color: "var(--color-brand-cyan)" },
  { dx: "-55px", dy: "25px", rot: "90deg", color: "var(--color-brand-gold)" },
  { dx: "58px", dy: "28px", rot: "-90deg", color: "var(--color-brand-red)" },
];

function isValidProgram(value: string) {
  const trimmed = value.trim();
  // A program name needs at least one letter; rejects entries like "1234".
  return trimmed.length >= 2 && /\p{L}/u.test(trimmed);
}

function SectionTick({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <span
      aria-hidden
      className="animate-check-pop absolute -right-1 -top-2 z-10 flex size-7 items-center justify-center rounded-full border-2 border-brand-navy bg-brand-cyan text-sm font-black text-brand-navy shadow-sticker-sm"
    >
      ✓
    </span>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const yearOfStudy = usePlayerStore((s) => s.yearOfStudy);
  const program = usePlayerStore((s) => s.program);
  const accessCode = usePlayerStore((s) => s.accessCode);
  const setProfileFields = usePlayerStore((s) => s.setProfileFields);
  const playerProfileId = usePlayerStore((s) => s.playerProfileId);

  const [submitting, setSubmitting] = useState(false);
  // Chip currently playing its pop animation; cleared on animation end so
  // tapping the same chip again replays it.
  const [poppingChip, setPoppingChip] = useState<string | null>(null);

  const hasYear = (YEAR_OF_STUDY_OPTIONS as readonly string[]).includes(yearOfStudy);
  const hasProgram = isValidProgram(program);
  const programLooksWrong = program.trim().length > 0 && !hasProgram;
  const ready = hasYear && hasProgram;

  const bubble = ready
    ? "All set! Let's go 🚀"
    : programLooksWrong
      ? "Hmm, that doesn't look like a program name 🤔"
      : hasYear
        ? `${yearOfStudy}, nice! What do you study? 📚`
        : hasProgram
          ? "Ooh, sounds fun! Which year are you in? 👀"
          : "Tell us more about yourself";

  async function handleNext() {
    if (!ready) return;
    setSubmitting(true);
    if (isSupabaseConfigured && playerProfileId) {
      await updatePlayerProfile(playerProfileId, {
        yearOfStudy,
        program: program.trim(),
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
          {/* Re-keyed so the mascot hops each time the bubble changes. */}
          <div key={bubble} className="animate-mascot-hop shrink-0">
            <Image
              src="/assets/mascot-start.png"
              alt=""
              width={150}
              height={185}
              className="h-auto w-24 sm:w-28 animate-mascot-bob"
            />
          </div>
          <div
            key={`bubble-${bubble}`}
            aria-live="polite"
            className="animate-bubble-pop rounded-[16px] border-ink bg-white px-4 py-3 text-sm font-semibold shadow-sticker-sm sm:text-base"
          >
            {bubble}
          </div>
        </div>

        <div
          role="radiogroup"
          aria-labelledby="year-of-study-label"
          className="animate-pop-in relative"
          style={{ animationDelay: "80ms" }}
        >
          <SectionTick show={hasYear} />
          <Ribbon color="gold" className="mb-2">
            <span id="year-of-study-label">What year of study are you in?</span>
          </Ribbon>
          <div className="flex flex-wrap gap-2">
            {YEAR_OF_STUDY_OPTIONS.map((option) => {
              const isSelected = yearOfStudy === option;
              return (
                <button
                  key={option}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => {
                    setProfileFields({ yearOfStudy: option });
                    setPoppingChip(option);
                  }}
                  onAnimationEnd={() => setPoppingChip(null)}
                  className={clsx(
                    "rounded-full border-ink px-4 py-2 text-sm font-bold shadow-sticker-sm transition-colors active:translate-x-[2px] active:translate-y-[2px] active:shadow-none sm:text-base",
                    isSelected
                      ? "bg-brand-navy text-white"
                      : "bg-white text-brand-navy hover:bg-brand-cream",
                    poppingChip === option && "animate-chip-pop"
                  )}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <div className="animate-pop-in relative" style={{ animationDelay: "160ms" }}>
          <SectionTick show={hasProgram} />
          <Ribbon color="gold" className="mb-2">
            <label htmlFor="program">What is your current program?</label>
          </Ribbon>
          <input
            id="program"
            type="text"
            value={program}
            onChange={(e) => setProfileFields({ program: e.target.value })}
            placeholder="e.g. Digital Marketing"
            aria-invalid={programLooksWrong}
            aria-describedby={programLooksWrong ? "program-hint" : undefined}
            className={clsx(
              "w-full rounded-[16px] border-ink bg-white px-4 py-2.5 text-base font-semibold shadow-sticker-sm transition-colors",
              programLooksWrong && "!border-brand-red"
            )}
          />
          {programLooksWrong && (
            <p
              id="program-hint"
              className="animate-hint-in mt-2 text-sm font-bold text-white"
            >
              Please enter your program name, e.g. Digital Marketing.
            </p>
          )}
        </div>

        <div className="animate-pop-in" style={{ animationDelay: "240ms" }}>
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

        <div className="flex items-center justify-end gap-3 pt-2">
          {!ready && (
            <p className="animate-hint-in text-right text-sm font-semibold text-white/85">
              Pick your year and program to continue
            </p>
          )}
          <div className="relative shrink-0">
            {ready &&
              CONFETTI.map((piece, i) => (
                <span
                  key={i}
                  aria-hidden
                  className="confetti-piece rounded-[2px] border border-brand-navy"
                  style={
                    {
                      backgroundColor: piece.color,
                      "--dx": piece.dx,
                      "--dy": piece.dy,
                      "--rot": piece.rot,
                      animationDelay: `${i * 18}ms`,
                    } as CSSProperties
                  }
                />
              ))}
            <Button
              key={ready ? "ready" : "idle"}
              variant="secondary"
              size="lg"
              disabled={!ready || submitting}
              onClick={handleNext}
              className={clsx("relative", ready && "animate-ready-bounce")}
            >
              {submitting ? "Please wait..." : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
