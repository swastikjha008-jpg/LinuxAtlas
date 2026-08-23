import { Hero } from "@/components/landing/Hero";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { TerminalShowcase } from "@/components/landing/TerminalShowcase";
import { DistroShowcase } from "@/components/landing/DistroShowcase";
import { CommandShowcase } from "@/components/landing/CommandShowcase";
import { PackageManagerSection } from "@/components/landing/PackageManagerSection";
import { GuidesSection } from "@/components/landing/GuidesSection";
import { OpenSourceSection } from "@/components/landing/OpenSourceSection";
import { FinalCTA } from "@/components/landing/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureGrid />
      <TerminalShowcase />
      <DistroShowcase />
      <CommandShowcase />
      <PackageManagerSection />
      <GuidesSection />
      <OpenSourceSection />
      <FinalCTA />
    </>
  );
}
