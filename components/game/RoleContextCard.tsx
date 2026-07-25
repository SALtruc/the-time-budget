import { StickerCard } from "@/components/ui/StickerCard";
import { BLOCKS } from "@/lib/game/blocks";
import { percentToHours } from "@/lib/game/hours";
import type { RoleDefinition } from "@/lib/game/types";

export function RoleContextCard({ role }: { role: RoleDefinition }) {
  return (
    <StickerCard tone="navy" className="p-5 sm:p-6">
      <p className="font-display text-xs uppercase tracking-[0.3em] text-brand-gold mb-1">
        Your role
      </p>
      <h2 className="font-display text-2xl sm:text-3xl mb-3">{role.name}</h2>
      <p className="text-sm sm:text-base leading-relaxed mb-3">
        {role.context}
      </p>
      {role.fixedBlock && (
        <p className="text-sm sm:text-base mb-3">
          <strong>{BLOCKS[role.fixedBlock].label}</strong> is fixed at{" "}
          {role.fixedPercent}% ({percentToHours(role.fixedPercent)}h) — you
          can&apos;t change it.
        </p>
      )}
      <p className="text-xs sm:text-sm text-brand-gold font-bold">
        Challenge: {role.challenge}
      </p>
    </StickerCard>
  );
}
