"use client";

import { useId, useState } from "react";
import { StickerCard } from "@/components/ui/StickerCard";

const QUESTIONS = {
  self: [
    {
      title: "What did you sacrifice to achieve your goals?",
      body: "Look at the activities with 0 hours. Were any of those actually important?",
    },
    {
      title: "How did stress affect your performance?",
      body: "High stress does not just feel bad, it reduces the quality of your work and thinking.",
    },
    {
      title: "What would you prioritize differently next time?",
      body: "There is no perfect week. Which trade-offs would you make differently with hindsight?",
    },
  ],
  pair: [
    {
      title: "Where did you and your partner allocate most differently?",
      body: "What drove those choices: priorities, constraints, or habits?",
    },
    {
      title: "Did your partner's profile surprise you?",
      body: "What does the difference between your profiles tell you about how you approach a week?",
    },
    {
      title: "If you ran this week again, what would you change?",
      body: "Name one specific activity you would add and one you would reduce.",
    },
  ],
  group: [
    {
      title: "Who had the most constrained week?",
      body: "Did having more hours mean making better choices, or did it make decisions harder?",
    },
    {
      title: "Which role taught you something about your own situation?",
      body: "If you swapped roles with someone else, would your priorities change?",
    },
    {
      title: "Is your real life closer to one of these roles than you would like?",
      body: "What does that mean for how you currently invest your time?",
    },
  ],
};

export function ReflectionQuestions({
  variant = "self",
  discussionPrompt,
}: {
  variant?: keyof typeof QUESTIONS;
  discussionPrompt?: string;
}) {
  const [open, setOpen] = useState(false);
  const contentId = useId();

  return (
    <StickerCard tone="gold" className="overflow-hidden p-0">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 p-3 text-left font-display text-sm sm:p-4 sm:text-base"
      >
        <span>
          {open
            ? variant === "pair"
              ? "Pair discussion questions"
              : variant === "group"
                ? "Group questions"
                : "Reflection questions"
            : `Tap here to see ${
                variant === "pair"
                  ? "pair discussion"
                  : variant === "group"
                    ? "group discussion"
                    : "reflection"
              } questions`}
        </span>
        <span className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`}>
          v
        </span>
      </button>

      {open && (
        <div id={contentId} className="space-y-3 px-3 pb-3 sm:px-4 sm:pb-4">
          <ul className="space-y-3 text-pretty">
            {QUESTIONS[variant].map((q) => (
              <li
                key={q.title}
                className="rounded-[14px] border-2 border-brand-navy bg-white px-3 py-3 text-brand-navy shadow-sticker-sm"
              >
                <p className="font-display text-sm leading-snug sm:text-base">
                  {q.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed sm:text-sm">
                  {q.body}
                </p>
              </li>
            ))}
          </ul>
          {discussionPrompt && (
            <p className="border-t-2 border-brand-navy/20 pt-3 text-xs italic sm:text-sm">
              {discussionPrompt}
            </p>
          )}
        </div>
      )}
    </StickerCard>
  );
}
