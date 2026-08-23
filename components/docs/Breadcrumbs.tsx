import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-white/40">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-white/25" />}
          {item.href ? (
            <Link href={item.href} className="transition-colors hover:text-cyan">
              {item.label}
            </Link>
          ) : (
            <span className="text-white/70">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
