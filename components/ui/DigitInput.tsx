"use client";

import { useRef } from "react";

export function DigitInput({
  length,
  value,
  onChange,
  boxClassName = "",
}: {
  length: number;
  value: string;
  onChange: (next: string) => void;
  boxClassName?: string;
}) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = Array.from({ length }, (_, i) => value[i] ?? "");

  function setDigitAt(index: number, digit: string) {
    const next = digits.slice();
    next[index] = digit;
    onChange(next.join(""));
  }

  return (
    <div className="flex justify-center gap-3 sm:gap-4">
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={digit}
          onChange={(e) => {
            const char = e.target.value.replace(/\D/g, "").slice(-1);
            setDigitAt(i, char);
            if (char && i < length - 1) refs.current[i + 1]?.focus();
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !digit && i > 0) {
              refs.current[i - 1]?.focus();
            }
          }}
          className={`h-16 w-12 sm:h-18 sm:w-14 rounded-xl border-ink bg-brand-grey/30 text-center font-display text-2xl ${boxClassName}`}
        />
      ))}
    </div>
  );
}
