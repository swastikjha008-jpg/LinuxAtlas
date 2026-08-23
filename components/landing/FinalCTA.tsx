import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section className="px-6 pb-28 pt-8">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-cyan/15 px-8 py-20 text-center">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% 100%, rgba(94,234,212,0.14), transparent 70%)",
          }}
        />
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
          Ready to explore Linux?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-white/55">
          Discover distributions. Learn commands. Understand your system.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/explore" icon>
            Explore LinuxAtlas
          </Button>
        </div>
      </div>
    </section>
  );
}
