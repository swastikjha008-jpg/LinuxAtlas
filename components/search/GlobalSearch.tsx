"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search, HardDrive, Terminal, Package, BookOpen, CornerDownLeft, ArrowUp, ArrowDown,
  X, Loader2, SearchX,
} from "lucide-react";
import { useSearch } from "@/components/search/SearchProvider";
import type { SearchResult, SearchResultType } from "@/lib/types";
import { cn } from "@/lib/utils";

const TYPE_META: Record<SearchResultType, { label: string; icon: typeof HardDrive }> = {
  distro: { label: "Distros", icon: HardDrive },
  command: { label: "Commands", icon: Terminal },
  "package-manager": { label: "Package Managers", icon: Package },
  guide: { label: "Guides", icon: BookOpen },
};

const QUICK_CATEGORIES: { label: string; url: string; icon: typeof HardDrive }[] = [
  { label: "Distros", url: "/distros", icon: HardDrive },
  { label: "Commands", url: "/commands", icon: Terminal },
  { label: "Package Managers", url: "/package-managers", icon: Package },
  { label: "Guides", url: "/guides", icon: BookOpen },
];

const POPULAR_SEARCHES = ["Arch Linux", "systemctl", "pacman", "Linux filesystem", "install docker", "permissions"];

const DEBOUNCE_MS = 200;

interface GroupedResults {
  type: SearchResultType;
  items: SearchResult[];
}

function groupResults(results: SearchResult[]): GroupedResults[] {
  const order: SearchResultType[] = ["distro", "command", "package-manager", "guide"];
  return order
    .map((type) => ({ type, items: results.filter((r) => r.type === type) }))
    .filter((g) => g.items.length > 0);
}

export function GlobalSearch() {
  const { isOpen, close } = useSearch();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const grouped = useMemo(() => groupResults(results), [results]);
  const flatItems = useMemo(() => grouped.flatMap((g) => g.items), [grouped]);

  // reset on open/close
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setResults([]);
      setActiveIndex(0);
      const t = setTimeout(() => inputRef.current?.focus(), 20);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // debounced fetch
  useEffect(() => {
    if (!isOpen) return;
    const trimmed = query.trim();

    if (debounceRef.current) clearTimeout(debounceRef.current);
    abortRef.current?.abort();

    if (!trimmed) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`, { signal: controller.signal });
        const body = await res.json();
        setResults(body.data ?? []);
        setActiveIndex(0);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setResults([]);
        }
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, isOpen]);

  useEffect(() => {
    itemRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  function goTo(url: string) {
    close();
    router.push(url);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (!flatItems.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % flatItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + flatItems.length) % flatItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = flatItems[activeIndex];
      if (target) goTo(target.url);
    }
  }

  const trimmedQuery = query.trim();
  const showEmptyState = !trimmedQuery;
  const showNoResults = trimmedQuery && !loading && results.length === 0;
  const showResults = trimmedQuery && results.length > 0;

  let flatCursor = -1;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh] sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <motion.div
            className="absolute inset-0 bg-[#040810]/70 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search LinuxAtlas"
            className="glass-strong relative w-full max-w-[680px] overflow-hidden rounded-2xl border-cyan/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] sm:max-w-[720px]"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onKeyDown={onKeyDown}
          >
            {/* input row */}
            <div className="flex items-center gap-3 border-b border-white/[0.06] px-5 py-4">
              <Search className="h-5 w-5 shrink-0 text-cyan/70" />
              <input
                ref={inputRef}
                data-search-input="true"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search distributions, commands, package managers, guides..."
                className="w-full bg-transparent text-base text-white placeholder:text-white/35 focus:outline-none"
                aria-label="Search query"
                autoComplete="off"
                spellCheck={false}
              />
              {loading && <Loader2 className="h-4 w-4 shrink-0 animate-spin text-white/30" />}
              <button
                onClick={close}
                className="hidden shrink-0 items-center gap-1 rounded-md border border-white/10 px-2 py-1 font-mono text-[11px] text-white/35 transition-colors hover:text-white sm:flex"
                aria-label="Close search"
              >
                Esc
              </button>
              <button onClick={close} className="shrink-0 text-white/40 hover:text-white sm:hidden" aria-label="Close search">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* content */}
            <div className="max-h-[60vh] overflow-y-auto p-3">
              {showEmptyState && (
                <div className="px-2 py-2">
                  <p className="mb-2 px-1 font-mono text-[11px] uppercase tracking-[0.14em] text-white/30">
                    Popular searches
                  </p>
                  <div className="mb-4 flex flex-wrap gap-2 px-1">
                    {POPULAR_SEARCHES.map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-white/60 transition-colors hover:border-cyan/30 hover:text-cyan"
                      >
                        {term}
                      </button>
                    ))}
                  </div>

                  <p className="mb-2 px-1 font-mono text-[11px] uppercase tracking-[0.14em] text-white/30">
                    Browse
                  </p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {QUICK_CATEGORIES.map((c) => (
                      <button
                        key={c.url}
                        onClick={() => goTo(c.url)}
                        className="flex flex-col items-start gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-3 text-left transition-colors hover:border-cyan/25 hover:bg-cyan/[0.04]"
                      >
                        <c.icon className="h-4 w-4 text-cyan/70" />
                        <span className="text-sm text-white/70">{c.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {loading && trimmedQuery && results.length === 0 && (
                <div className="flex items-center gap-2 px-3 py-8 text-sm text-white/40">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Searching LinuxAtlas...
                </div>
              )}

              {showNoResults && (
                <div className="px-3 py-8 text-center">
                  <SearchX className="mx-auto h-8 w-8 text-white/20" />
                  <p className="mt-3 text-sm text-white/50">
                    No results found for <span className="text-white/80">&ldquo;{trimmedQuery}&rdquo;</span>
                  </p>
                  <p className="mt-2 text-xs text-white/30">
                    Try a distro name, a command, a package manager, or a guide topic.
                  </p>
                </div>
              )}

              {showResults && (
                <div role="listbox" aria-label="Search results">
                  {grouped.map((group) => {
                    const meta = TYPE_META[group.type];
                    return (
                      <div key={group.type} className="mb-2 last:mb-0">
                        <p className="mb-1 flex items-center gap-1.5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/30">
                          <meta.icon className="h-3 w-3" />
                          {meta.label}
                        </p>
                        {group.items.map((item) => {
                          flatCursor++;
                          const index = flatCursor;
                          const active = index === activeIndex;
                          return (
                            <a
                              key={item.id}
                              ref={(el) => {
                                itemRefs.current[index] = el;
                              }}
                              href={item.url}
                              role="option"
                              aria-selected={active}
                              onMouseEnter={() => setActiveIndex(index)}
                              onClick={(e) => {
                                e.preventDefault();
                                goTo(item.url);
                              }}
                              className={cn(
                                "flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 transition-colors",
                                active ? "bg-cyan/10 text-white" : "text-white/70 hover:bg-white/[0.03]"
                              )}
                            >
                              <div className="min-w-0">
                                <p className={cn("truncate text-sm", active && "text-cyan")}>{item.title}</p>
                                <p className="truncate text-xs text-white/40">{item.description}</p>
                              </div>
                              {active && <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-cyan/70" />}
                            </a>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* footer hint bar */}
            <div className="hidden items-center gap-4 border-t border-white/[0.06] px-5 py-2.5 text-[11px] text-white/30 sm:flex">
              <span className="flex items-center gap-1">
                <ArrowUp className="h-3 w-3" /> <ArrowDown className="h-3 w-3" /> Navigate
              </span>
              <span className="flex items-center gap-1">
                <CornerDownLeft className="h-3 w-3" /> Select
              </span>
              <span className="flex items-center gap-1">Esc Close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
