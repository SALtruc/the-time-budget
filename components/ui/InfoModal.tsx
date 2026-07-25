"use client";

import { ReactNode, useState } from "react";
import { StickerCard } from "./StickerCard";

export function InfoModal({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label={`More info about ${title}`}
        onClick={() => setOpen(true)}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-ink bg-white font-display text-sm shadow-sticker-sm active-press"
      >
        i
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={() => setOpen(false)}
        >
          <StickerCard
            tone="cream"
            className="w-full max-w-sm p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <h2 className="font-display text-xl">{title}</h2>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-ink bg-white font-display shadow-sticker-sm active-press"
              >
                ×
              </button>
            </div>
            <div className="text-sm sm:text-base leading-relaxed">
              {children}
            </div>
          </StickerCard>
        </div>
      )}
    </>
  );
}
