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
        className="h-auto w-40 shrink-0 sm:w-52"
        priority
      />
      <StickerCard className="p-5 text-base font-semibold text-center sm:p-6 sm:text-xl sm:text-left">
        {children}
      </StickerCard>
    </div>
  );
}
