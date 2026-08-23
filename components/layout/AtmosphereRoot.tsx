"use client";

import { usePathname } from "next/navigation";
import { GlobalAtmosphere } from "@/components/layout/GlobalAtmosphere";

const DOCS_PREFIXES = ["/distros/", "/commands/", "/package-managers/", "/guides/"];

export function AtmosphereRoot() {
  const pathname = usePathname();
  const isDocs = DOCS_PREFIXES.some((p) => pathname?.startsWith(p));
  return <GlobalAtmosphere docs={isDocs} />;
}
