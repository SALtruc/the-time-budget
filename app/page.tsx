import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MascotBubble } from "@/components/ui/MascotBubble";

export default function StartPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-10 px-4 py-12 sm:py-16">
      <Image
        src="/assets/logo.png"
        alt="The Time Budget"
        width={800}
        height={220}
        className="w-full max-w-md sm:max-w-lg h-auto"
        priority
      />

      <MascotBubble src="/assets/mascot-start.png" alt="Time Budget guide">
        You&apos;ve got 40 hours a week to spend. Study, work, rest, network,
        lead — every hour is a choice. Ready to see where yours really go?
      </MascotBubble>

      <Link href="/mode">
        <Button variant="primary" size="lg">
          Start ›
        </Button>
      </Link>
    </main>
  );
}
