import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { TerminalWindow } from "@/components/terminal/TerminalWindow";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm text-cyan/70">404</p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
        This path doesn&apos;t exist yet.
      </h1>
      <p className="mt-3 max-w-md text-white/55">
        The page you&apos;re looking for isn&apos;t part of LinuxAtlas — or hasn&apos;t been written yet.
      </p>

      <div className="mt-8 w-full max-w-md">
        <TerminalWindow
          title="you@linuxatlas — zsh"
          lines={[
            { prompt: "you@linuxatlas", text: "atlas open <path>", delay: 300 },
            { text: "error: no such page in the atlas", className: "text-ember" },
          ]}
          autoStart
        />
      </div>

      <div className="mt-8">
        <Button href="/" icon>
          Back to LinuxAtlas
        </Button>
      </div>
    </div>
  );
}
