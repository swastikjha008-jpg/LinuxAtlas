import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AtmosphereRoot } from "@/components/layout/AtmosphereRoot";
import { SearchProvider } from "@/components/search/SearchProvider";
import { GlobalSearch } from "@/components/search/GlobalSearch";

export const metadata: Metadata = {
  title: "LinuxAtlas — The open Linux knowledge platform",
  description:
    "Everything you need to understand Linux — distributions, commands, package managers, guides, and practical knowledge, all in one open-source platform.",
  metadataBase: new URL("https://linuxatlas.dev"),
  openGraph: {
    title: "LinuxAtlas — The open Linux knowledge platform",
    description:
      "Distributions, commands, package managers, and guides — one open-source platform.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LinuxAtlas",
    description: "The open Linux knowledge platform.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <SearchProvider>
          <AtmosphereRoot />
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
          <GlobalSearch />
        </SearchProvider>
      </body>
    </html>
  );
}
