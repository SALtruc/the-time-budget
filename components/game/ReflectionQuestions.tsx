"use client";

import { useState } from "react";
import { StickerCard } from "@/components/ui/StickerCard";

const QUESTIONS = [
  "What did you sacrifice this week to hit your other commitments?",
  "If you ran this week again, which one activity would you add or increase — and what would you cut to make room?",
  "What does your profile tell you about your default mode when things get busy?",
];

export function ReflectionQuestions({
  discussionPrompt,
}: {
  discussionPrompt?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <StickerCard tone="gold" className="overflow-hidden p-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between p-5 sm:p-6 font-display text-lg sm:text-xl"
      >
        Tap here to see reflection questions
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
      </button>

      {open && (
        <div className="px-5 pb-5 sm:px-6 sm:pb-6">
          <ul className="list-disc space-y-2 pl-5 text-sm sm:text-base">
            {QUESTIONS.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
          {discussionPrompt && (
            <p className="mt-4 text-sm sm:text-base italic border-t-2 border-brand-navy/20 pt-4">
              {discussionPrompt}
            </p>
          )}
        </div>
      )}
    </StickerCard>
  );
}
