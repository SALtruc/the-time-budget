import { StickerCard } from "@/components/ui/StickerCard";
import type { RoleDefinition } from "@/lib/game/types";

export function RoleContextCard({ role }: { role: RoleDefinition }) {
  return (
    <StickerCard tone="white" className="p-5 sm:p-6">
      <p className="text-base sm:text-lg leading-relaxed mb-3">{role.context}</p>
      <p className="text-base sm:text-lg leading-relaxed">
        <strong>Your challenge:</strong> {role.challenge}
      </p>
    </StickerCard>
  );
}
