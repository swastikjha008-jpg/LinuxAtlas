// Shared types — the single contract both the server services and the API
// route handlers build on, so the frontend never has to guess a shape.
//
// (The backend spec asked for these under packages/types/ in a pnpm
// workspace. This project stayed a single Next.js app rather than a
// monorepo — see docs/backend.md for why — so they live here instead.
// Nothing about the contract changes, just the folder.)

export type Difficulty = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

export type ContentType = "DISTRIBUTION" | "COMMAND" | "PACKAGE_MANAGER" | "GUIDE";

export interface DistributionDTO {
  slug: string;
  name: string;
  description: string;
  family: string;
  basedOn: string | null;
  packageManager: string;
  initSystem: string;
  releaseModel: string;
  architectures: string[];
  desktopEnvironments: string[];
  difficulty: Difficulty;
  website: string | null;
  documentationUrl: string | null;
  logo: string | null;
  sourceUrl: string | null;
  sourceName: string | null;
}

export interface DistributionDetailDTO extends DistributionDTO {
  mdxSource: string | null;
  tocSections: { id: string; title: string }[];
  commandExamples: { code: string; description: string }[];
  related: RelatedItemDTO[];
}

export interface CommandExampleDTO {
  code: string;
  description: string;
  distributionSlug: string | null;
}

export interface CommandOptionDTO {
  flag: string;
  description: string;
}

export interface CommandDTO {
  slug: string;
  name: string;
  description: string;
  syntax: string;
  category: string;
  sourceUrl: string | null;
  sourceName: string | null;
}

export interface CommandDetailDTO extends CommandDTO {
  examples: CommandExampleDTO[];
  options: CommandOptionDTO[];
  related: RelatedItemDTO[];
}

export interface PackageManagerDTO {
  slug: string;
  name: string;
  command: string;
  description: string;
  distributionFamily: string;
  installCmd: string;
  updateCmd: string;
  searchCmd: string;
  removeCmd: string;
  sourceUrl: string | null;
  sourceName: string | null;
}

export interface GuideDTO {
  slug: string;
  title: string;
  description: string;
  category: string;
  difficulty: Difficulty;
  readMinutes: number;
}

export interface GuideDetailDTO extends GuideDTO {
  mdxSource: string | null;
  tocSections: { id: string; title: string }[];
  related: RelatedItemDTO[];
}

export type SearchResultType = "distro" | "command" | "package-manager" | "guide";

export interface RelatedItemDTO {
  type: SearchResultType;
  slug: string;
  title: string;
  description: string;
  url: string;
}

// ---------------------------------------------------------------------------
// Search
// ---------------------------------------------------------------------------

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  slug: string;
  description: string;
  url: string;
  tags: string[];
}

export interface SearchDocument {
  id: string;
  type: SearchResultType;
  title: string;
  slug: string;
  description: string;
  content: string;
  url: string;
  tags: string[];
}

// ---------------------------------------------------------------------------
// Compare
// ---------------------------------------------------------------------------

export interface CompareRow {
  label: string;
  values: Record<string, string>; // keyed by distro slug
}

export interface CompareResult {
  distros: DistributionDTO[];
  rows: CompareRow[];
}

// ---------------------------------------------------------------------------
// API envelope
// ---------------------------------------------------------------------------

export interface ApiListResponse<T> {
  data: T[];
  meta: { total: number; query?: string };
}

export interface ApiItemResponse<T> {
  data: T;
}

export interface ApiErrorResponse {
  error: { code: string; message: string };
}
