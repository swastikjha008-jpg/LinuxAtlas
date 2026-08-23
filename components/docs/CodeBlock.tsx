"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CodeBlock({ code, language = "bash" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard unavailable — fail silently, button still shows feedback state untouched
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border border-white/10 bg-black/40">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-1.5">
        <span className="font-mono text-[11px] uppercase tracking-wider text-white/30">{language}</span>
        <button
          onClick={onCopy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] text-white/45 transition-colors hover:text-cyan"
          aria-label="Copy code"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-cyan" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-3 font-mono text-[13px] leading-relaxed text-cyan/90">
        <code>{code}</code>
      </pre>
    </div>
  );
}
