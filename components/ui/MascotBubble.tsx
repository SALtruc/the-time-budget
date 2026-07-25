import Image from "next/image";
import { ReactNode } from "react";
import { StickerCard } from "./StickerCard";

export function MascotBubble({
  src,
  alt,
  children,
}: {
  src: string;
  alt: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4">
      <Image
        src={src}
        alt={alt}
        width={220}
        height={260}
        className="w-32 sm:w-44 h-auto shrink-0"
        priority
      />
      <StickerCard className="p-4 sm:p-5 text-base sm:text-lg font-semibold text-center sm:text-left">
        {children}
      </StickerCard>
    </div>
  );
}
