"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSearch } from "@/components/search/SearchProvider";

/**
 * The one search-opening button in the app — used in the navbar (compact)
 * and on /explore (full-width bar). Both call the same context, so there's
 * exactly one search implementation to keep in sync, per the backend spec.
 */
export function SearchTrigger({
  variant = "compact",
  placeholder = "Search LinuxAtlas...",
  className,
}: {
  variant?: "compact" | "bar";
  placeholder?: string;
  className?: string;
}) {
  const { open } = useSearch();

  if (variant === "bar") {
    return (
      <button
        onClick={open}
        className={cn(
          "glass-strong flex w-full items-center gap-3 rounded-xl px-5 py-4 text-left transition-colors hover:border-cyan/25",
          className
        )}
        aria-label="Open search"
      >
        <Search className="h-5 w-5 shrink-0 text-white/35" />
        <span className="flex-1 text-sm text-white/35 sm:text-base">{placeholder}</span>
        <kbd className="hidden shrink-0 rounded border border-white/10 bg-white/5 px-2 py-1 font-mono text-[11px] text-white/40 sm:block">
          Ctrl K
        </kbd>
      </button>
    );
  }

  return (
    <button
      onClick={open}
      className={cn(
        "flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-white/45 transition-colors hover:border-cyan/30 hover:text-white/70",
        className
      )}
      aria-label="Open search"
    >
      <Search className="h-3.5 w-3.5" />
      Search
      <kbd className="ml-2 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-white/40">
        Ctrl K
      </kbd>
    </button>
  );
}
