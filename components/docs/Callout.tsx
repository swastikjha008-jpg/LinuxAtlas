import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

export function Callout({ children, tone = "info" }: { children: React.ReactNode; tone?: "info" | "warn" }) {
  return (
    <div
      className={cn(
        "flex gap-3 rounded-lg border px-4 py-3 text-sm leading-relaxed",
        tone === "info" ? "border-cyan/20 bg-cyan/[0.05] text-white/70" : "border-ember/25 bg-ember/[0.06] text-white/70"
      )}
    >
      <Info className={cn("mt-0.5 h-4 w-4 shrink-0", tone === "info" ? "text-cyan" : "text-ember")} />
      <div>{children}</div>
    </div>
  );
}
