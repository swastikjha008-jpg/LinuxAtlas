"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Github, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/Logo";
import { SearchTrigger } from "@/components/search/SearchTrigger";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Distros", href: "/distros" },
  { label: "Commands", href: "/commands" },
  { label: "Package Managers", href: "/package-managers" },
  { label: "Guides", href: "/guides" },
  { label: "Compare", href: "/compare" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "glass-strong border-b border-cyan/10 shadow-[0_1px_0_0_rgba(94,234,212,0.08)]" : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />

        <div className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-white/65 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <SearchTrigger />
          <a
            href="https://github.com"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/60 transition-colors hover:border-cyan/30 hover:text-cyan"
            aria-label="View LinuxAtlas on GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/70 lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      {open && (
        <div className="glass-strong border-t border-white/5 px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-3 flex gap-2 border-t border-white/5 pt-3">
            <SearchTrigger className="flex-1 justify-center" />
            <a href="https://github.com" className="flex items-center justify-center rounded-lg border border-white/10 px-3 py-2 text-white/60">
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
