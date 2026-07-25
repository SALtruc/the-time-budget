export function RoomCodeBadge({ code }: { code: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border-ink bg-brand-navy px-5 py-2 shadow-sticker-sm">
      <span className="font-display text-xs text-brand-gold uppercase tracking-widest">
        Room
      </span>
      <span className="font-display text-xl text-white tracking-[0.2em]">
        {code}
      </span>
    </div>
  );
}
