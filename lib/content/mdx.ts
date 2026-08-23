import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// Long-form prose lives as MDX under content/{distros,guides}/<slug>.mdx —
// see prisma/schema.prisma's header comment for why structured metadata
// stays in Postgres instead. This module is the only place that touches
// the filesystem for content; services import from here, never `fs` directly.

const CONTENT_ROOT = path.join(process.cwd(), "content");

export interface MdxDoc {
  frontmatter: { title: string; slug: string };
  content: string; // raw markdown/MDX body, headings intact
  sections: { id: string; title: string }[]; // parsed ## headings, for TOC/sidebar
}

function slugifyHeading(heading: string): string {
  return heading
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function parseHeadings(markdown: string): { id: string; title: string }[] {
  const matches = [...markdown.matchAll(/^##\s+(.+)$/gm)];
  return matches.map((m) => ({ id: slugifyHeading(m[1]), title: m[1].trim() }));
}

function readMdx(collection: "distros" | "guides", slug: string): MdxDoc | null {
  const filePath = path.join(CONTENT_ROOT, collection, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    frontmatter: { title: data.title ?? slug, slug: data.slug ?? slug },
    content,
    sections: parseHeadings(content),
  };
}

export function getDistroMdx(slug: string): MdxDoc | null {
  return readMdx("distros", slug);
}

export function getGuideMdx(slug: string): MdxDoc | null {
  return readMdx("guides", slug);
}

export function listMdxSlugs(collection: "distros" | "guides"): string[] {
  const dir = path.join(CONTENT_ROOT, collection);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
