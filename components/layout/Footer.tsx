import Link from "next/link";
import { Github } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

const LINKS = [
  { label: "Distros", href: "/distros" },
  { label: "Commands", href: "/commands" },
  { label: "Guides", href: "/guides" },
  { label: "Package Managers", href: "/package-managers" },
  { label: "Compare", href: "/compare" },
  { label: "View source on GitHub", href: "https://github.com" },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-3">
          <Logo />
          <p className="hidden text-xs text-white/40 sm:block">
            Free and open-source Linux knowledge for everyone.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="flex items-center gap-1.5 text-xs text-white/45 transition-colors hover:text-cyan"
            >
              {l.label === "View source on GitHub" && <Github className="h-3.5 w-3.5" />}
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
