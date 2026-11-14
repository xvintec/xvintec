import "server-only";

// Bunzy blog API client. Server-only: the read key must never reach the
// browser bundle, so this module throws at build time if a client component
// imports it.

// Posts are served with Cache-Control: no-store so CMS edits go live
// immediately. Every blog route re-exports this as `revalidate`.
export const revalidate = 0;

// Origin the CMS canonical URLs point at; used for the sitemap.
export const SITE_URL = "https://xvintec.com";

/* ------------------------------------------------------------------------ */
/* Types (from the Bunzy API reference)                                     */
/* ------------------------------------------------------------------------ */

export type Author = {
  name: string;
  avatarUrl?: string;
  link?: string;
};

export type PostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  readingMinutes: number;
  thumbnailUrl?: string;
  author: Author;
  publishedAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
};

export type FaqItem = { question: string; answer: string };

export type PostSeo = {
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  ogImage?: string;
  focusKeyword?: string;
  jsonLd: Record<string, unknown>;
};

export type Post = PostSummary & {
  markdown: string;
  language: string;
  keyTakeaways: string[];
  faq: FaqItem[];
  labels: { keyTakeaways: string; faq: string };
  seo: PostSeo;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type PostList = {
  data: PostSummary[];
  pagination: Pagination;
};

export type TagCount = { tag: string; count: number };

export type ApiError = { error: { code: string; message: string } };

/* ------------------------------------------------------------------------ */
/* Fetch helpers                                                            */
/* ------------------------------------------------------------------------ */

const API_BASE = `${(process.env.BUNZY_BLOG_API_URL ?? "https://app.bunzy.io").replace(/\/+$/, "")}/api/v1`;

export class BlogApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string
  ) {
    super(message);
    this.name = "BlogApiError";
  }
}

async function request(path: string): Promise<Response> {
  const key = process.env.BUNZY_BLOG_API_KEY;
  if (!key) {
    throw new Error(
      "BUNZY_BLOG_API_KEY is not set. Add it to .env.local (server-side only)."
    );
  }

  return fetch(`${API_BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${key}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });
}

async function fail(res: Response): Promise<never> {
  let code = "unknown_error";
  let message = `Bunzy API request failed with HTTP ${res.status}`;
  try {
    const body = (await res.json()) as Partial<ApiError>;
    if (body.error) {
      code = body.error.code;
      message = body.error.message;
    }
  } catch {
    // Non-JSON error body; keep the generic message.
  }
  throw new BlogApiError(res.status, code, message);
}

export async function getPosts(
  page = 1,
  limit = 12,
  tag?: string
): Promise<PostList> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (tag) params.set("tag", tag);

  const res = await request(`/posts?${params}`);
  if (!res.ok) return fail(res);
  return (await res.json()) as PostList;
}

// The API rejects limit > 50 with a 400.
const MAX_PAGE_SIZE = 50;

// Every published post, newest first, paging through the API 50 at a time.
// Used by the blog listing (which filters, sorts and paginates in the browser)
// and the sitemap.
export async function getAllPosts(): Promise<PostSummary[]> {
  const first = await getPosts(1, MAX_PAGE_SIZE);
  const rest = await Promise.all(
    Array.from({ length: first.pagination.totalPages - 1 }, (_, i) =>
      getPosts(i + 2, MAX_PAGE_SIZE)
    )
  );
  return [first, ...rest].flatMap((list) => list.data);
}

export async function getPost(slug: string): Promise<Post | null> {
  const res = await request(`/posts/${encodeURIComponent(slug)}`);
  if (res.status === 404) return null;
  if (!res.ok) return fail(res);
  return (await res.json()) as Post;
}

export async function getTags(): Promise<TagCount[]> {
  const res = await request("/tags");
  if (!res.ok) return fail(res);
  return (await res.json()) as TagCount[];
}

/* ------------------------------------------------------------------------ */
/* Shared helpers                                                           */
/* ------------------------------------------------------------------------ */

// Lives in ./blogPaths so client components can use it too.
export { tagHref } from "./blogPaths";

export function formatDate(iso: string, locale = "en-GB"): string {
  return new Date(iso).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
