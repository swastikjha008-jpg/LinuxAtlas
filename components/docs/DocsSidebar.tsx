"use client";

import { cn } from "@/lib/utils";

export function DocsSidebar({
  sections,
  activeId,
}: {
  sections: { id: string; title: string }[];
  activeId?: string;
}) {
  return (
    <nav className="sticky top-24 space-y-1">
      <p className="mb-2 px-3 font-mono text-[11px] uppercase tracking-[0.14em] text-white/30">On this page</p>
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={cn(
            "block rounded-md px-3 py-1.5 text-sm transition-colors",
            activeId === s.id ? "bg-cyan/10 text-cyan" : "text-white/55 hover:bg-white/[0.03] hover:text-white"
          )}
        >
          {s.title}
        </a>
      ))}
    </nav>
  );
}
