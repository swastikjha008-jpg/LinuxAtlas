import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  icon?: boolean;
  className?: string;
};

export function Button({ href, children, variant = "primary", icon = false, className }: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-cyan";

  const styles = {
    primary:
      "bg-cyan text-[#052018] hover:bg-cyan-bright shadow-[0_0_0_1px_rgba(94,234,212,0.4),0_8px_30px_-8px_rgba(94,234,212,0.5)] hover:shadow-[0_0_0_1px_rgba(94,234,212,0.6),0_8px_40px_-6px_rgba(94,234,212,0.65)]",
    secondary:
      "glass text-white/90 hover:border-cyan/40 hover:text-white",
    ghost:
      "text-white/70 hover:text-cyan border border-transparent hover:border-cyan/20",
  };

  return (
    <Link href={href} className={cn(base, styles[variant], className)}>
      {children}
      {icon && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
    </Link>
  );
}
