import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * LinuxAtlas mark — an original terminal-prompt glyph, not a Tux derivative.
 * The angled bracket reads as both a shell prompt (`>`) and a stylized "A"
 * (Atlas); the underscore cursor blinks softly to keep the terminal motif alive.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("h-8 w-8", className)} aria-hidden="true">
      <rect x="1" y="1" width="30" height="30" rx="8" fill="none" stroke="currentColor" strokeOpacity="0.35" />
      <path
        d="M9 10.5 L16 16 L9 21.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <rect x="18" y="19.5" width="7" height="2.4" rx="1.2" fill="currentColor" className="animate-blink" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5", className)}>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan/25 bg-cyan/[0.08] text-cyan">
        <LogoMark className="h-[18px] w-[18px]" />
      </span>
      <span className="font-display text-lg font-semibold tracking-tight text-white">
        Linux<span className="text-cyan">Atlas</span>
      </span>
    </Link>
  );
}
