import { StickerCard } from "@/components/ui/StickerCard";

export function SurpriseEventCard({ bonusHours }: { bonusHours: number }) {
  if (bonusHours <= 0) return null;

  return (
    <StickerCard className="p-5 sm:p-6">
      <p className="font-bold text-base sm:text-lg">Surprise lecture cancelled !</p>
      <p className="text-sm sm:text-base mt-1">
        You&apos;ve gained {bonusHours} free hours this week. How will you use them?
      </p>
    </StickerCard>
  );
}
