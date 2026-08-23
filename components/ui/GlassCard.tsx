import { cn } from "@/lib/utils";

export function GlassCard({
  children,
  className,
  strong = false,
  glow = false,
}: {
  children: React.ReactNode;
  className?: string;
  strong?: boolean;
  glow?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6 transition-all duration-300",
        strong ? "glass-strong" : "glass",
        glow && "hover:border-cyan/30 hover:shadow-[0_0_40px_-12px_rgba(94,234,212,0.35)]",
        className
      )}
    >
      {children}
    </div>
  );
}
