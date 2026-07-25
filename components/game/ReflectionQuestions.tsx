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
  return (
    <StickerCard tone="cream" className="p-5 sm:p-6">
      <h2 className="font-display text-lg sm:text-xl mb-3">
        Reflection questions
      </h2>
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
    </StickerCard>
  );
}
