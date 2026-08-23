import { TerminalWindow } from "@/components/terminal/TerminalWindow";
import { AsciiArt } from "@/components/ui/sss";

const LINES = [
  { prompt: "you@linuxatlas", text: "atlas explain systemd", delay: 300 },
  { text: "systemd is the init system and service manager for most modern distros.", className: "text-white/50", delay: 160 },
  { text: "It replaced SysVinit, starting services in parallel for faster boots.", className: "text-white/50", delay: 160 },
  { prompt: "you@linuxatlas", text: "atlas next", delay: 260 },
];

export function TerminalShowcase() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="font-display text-2xl font-semibold leading-snug text-white sm:text-3xl">
            Linux isn&apos;t just an operating system.
            <br />
            <span className="text-cyan">It&apos;s a way to understand your system.</span>
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/50">
            Every distro, command, and package manager on LinuxAtlas is explained the way
            you&apos;d want a terminal to explain it — direct, precise, no fluff.
          </p>

          <div className="relative mt-8 h-40 overflow-hidden rounded-xl border border-white/10">
            <AsciiArt className="absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050b12] via-transparent to-transparent" />
          </div>
        </div>
        <TerminalWindow title="you@linuxatlas — zsh" lines={LINES} loop typingSpeed={20} />
      </div>
    </section>
  );
}
