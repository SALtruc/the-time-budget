"use client";

import { ReactNode, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { StickerCard } from "./StickerCard";

export function InfoModal({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    closeRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={`More info about ${title}`}
        onClick={() => setOpen(true)}
        className="flex size-7 shrink-0 items-center justify-center rounded-full border-ink bg-white font-display text-xs text-brand-navy shadow-sticker-sm active-press transition-colors duration-150 hover:bg-brand-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:size-8 sm:text-sm"
      >
        i
      </button>

      {open && typeof document !== "undefined" && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={() => setOpen(false)}
        >
          <StickerCard
            tone="cream"
            className="w-full max-w-sm p-5 sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-start justify-between gap-4">
              <h2 id={titleId} className="font-display text-xl">
                {title}
              </h2>
              <button
                ref={closeRef}
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="flex size-8 shrink-0 items-center justify-center rounded-full border-ink bg-white font-display text-base text-brand-navy shadow-sticker-sm active-press transition-colors duration-150 hover:bg-brand-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
              >
                x
              </button>
            </div>
            <div className="text-sm leading-relaxed sm:text-base">{children}</div>
          </StickerCard>
        </div>,
        document.body
      )}
    </>
  );
}
