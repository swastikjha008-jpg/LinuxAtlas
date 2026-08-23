"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type TerminalLine = {
  prompt?: string;
  text: string;
  delay?: number;
  className?: string;
};

export function TerminalWindow({
  title = "zsh",
  lines,
  className,
  typingSpeed = 18,
  loop = false,
  autoStart = true,
}: {
  title?: string;
  lines: TerminalLine[];
  className?: string;
  typingSpeed?: number;
  loop?: boolean;
  autoStart?: boolean;
}) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [started, setStarted] = useState(!autoStart ? true : false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoStart) return;
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [autoStart]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setVisibleLines(lines.map((l) => l.text));
      setLineIndex(lines.length - 1);
      setCharIndex(lines[lines.length - 1]?.text.length ?? 0);
    }
  }, [lines]);

  useEffect(() => {
    if (!started) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    if (lineIndex >= lines.length) {
      if (loop) {
        const t = setTimeout(() => {
          setVisibleLines([]);
          setLineIndex(0);
          setCharIndex(0);
        }, 2200);
        return () => clearTimeout(t);
      }
      return;
    }

    const current = lines[lineIndex];
    const full = current.text;

    if (charIndex < full.length) {
      const t = setTimeout(() => {
        setVisibleLines((prev) => {
          const next = [...prev];
          next[lineIndex] = full.slice(0, charIndex + 1);
          return next;
        });
        setCharIndex((c) => c + 1);
      }, typingSpeed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setLineIndex((i) => i + 1);
        setCharIndex(0);
      }, current.delay ?? 260);
      return () => clearTimeout(t);
    }
  }, [started, charIndex, lineIndex, lines, loop, typingSpeed]);

  return (
    <div
      ref={rootRef}
      className={cn(
        "glass-strong overflow-hidden rounded-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]/70" />
        </div>
        <p className="ml-2 font-mono text-xs text-white/40">{title}</p>
      </div>
      <div className="p-5 font-mono text-[13px] leading-relaxed sm:text-sm">
        {lines.slice(0, Math.max(lineIndex + 1, 1)).map((line, i) => {
          const shown = visibleLines[i] ?? (i < lineIndex ? line.text : "");
          if (i > lineIndex) return null;
          return (
            <div key={i} className={cn("whitespace-pre-wrap break-words", line.className)}>
              {line.prompt && <span className="text-cyan">{line.prompt} </span>}
              <span className="text-white/85">{shown}</span>
              {i === lineIndex && (
                <span className="ml-0.5 inline-block h-[1em] w-[7px] translate-y-[2px] animate-blink bg-cyan align-middle" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
