import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Github, GitPullRequest } from "lucide-react";

export function OpenSourceSection() {
  return (
    <section className="px-6 py-24">
      <div className="glass-strong mx-auto max-w-6xl rounded-3xl px-8 py-16 sm:px-16">
        <div className="mx-auto max-w-xl text-center">
          <SectionHeader
            align="center"
            eyebrow="Open Source"
            title="Built in the open."
            description="LinuxAtlas is free and open source. The goal is to make Linux knowledge easier to access, understand, improve, and share."
          />
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href="https://github.com" icon>
              <Github className="h-4 w-4" /> GitHub
            </Button>
            <Button href="https://github.com" variant="secondary">
              <GitPullRequest className="h-4 w-4" /> Contribute
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
