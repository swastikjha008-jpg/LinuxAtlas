"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { TerminalWindow } from "@/components/terminal/TerminalWindow";
import { Sparkle } from "lucide-react";

const BOOT_LINES = [
  { prompt: "arch2099@2099", text: "install --profile developer", delay: 300 },
  { text: "Resolving package graph... 1,204 packages locked in 340ms", className: "text-white/45", delay: 180 },
  { text: "Provisioning btrfs subvolumes... done", className: "text-white/45", delay: 180 },
  { text: "Applying kernel: linux-2099-zen 6.9.4", className: "text-white/45", delay: 180 },
  { text: "System ready. Welcome to LinuxAtlas.", className: "text-cyan/90", delay: 500 },
  { prompt: "arch2099@2099", text: "atlas search 'install docker'", delay: 260 },
];

export function Hero() {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? { opacity: 1, y: 0 } : undefined;

  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-20 sm:pt-28">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={initial ?? { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6 }}
          className="flex justify-center"
        >
          <Badge>
            <Sparkle className="h-3 w-3" />
            The open Linux knowledge platform
          </Badge>
        </motion.div>

        <motion.h1
          initial={initial ?? { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.1 }}
          className="mt-6 font-display text-5xl font-semibold leading-[1.05] text-white text-glow sm:text-6xl lg:text-7xl"
        >
          Explore. Learn.
          <br />
          <span className="text-cyan">Master.</span>
        </motion.h1>

        <motion.p
          initial={initial ?? { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.2 }}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg"
        >
          Everything you need to understand Linux — distributions, commands, package
          managers, guides, and practical knowledge, all in one open-source platform.
        </motion.p>

        <motion.div
          initial={initial ?? { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.3 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Button href="/explore" icon className="group">
            Explore LinuxAtlas
          </Button>
          <Button href="https://github.com" variant="secondary">
            View on GitHub
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={initial ?? { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.4 }}
        className="mx-auto mt-16 max-w-2xl"
      >
        <TerminalWindow title="arch2099@2099 — zsh" lines={BOOT_LINES} autoStart={false} typingSpeed={16} />
      </motion.div>
    </section>
  );
}
