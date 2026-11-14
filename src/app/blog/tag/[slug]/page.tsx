import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogLibrary from "@/components/BlogPage/BlogLibrary";
import {
  DEFAULT_STATE,
  type LibraryState,
  SORT_KEYS,
  type SortKey,
} from "@/components/BlogPage/libraryState";
import { getAllPosts, tagHref } from "@/lib/blog";

// Must be a literal for Next's static analysis; mirrors `revalidate` in
// @/lib/blog (posts are no-store so CMS edits are live immediately).
export const revalidate = 0;

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ q?: string; sort?: string; page?: string }>;
};

// Tags contain spaces, so the segment arrives URI-encoded.
function decodeTag(slug: string): string {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

// "managed IT services" -> "Managed IT Services" (leaves "IT" alone).
function titleCase(tag: string) {
  return tag.replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = decodeTag((await params).slug);
  return {
    title: `${titleCase(tag)} | Xvintec Blog`,
    description: `Xvintec articles on ${tag}.`,
    alternates: { canonical: tagHref(tag) },
  };
}

// Tag landing page: the blog listing narrowed to one tag.
export default async function BlogTagPage({ params, searchParams }: Props) {
  const tag = decodeTag((await params).slug);
  const query = await searchParams;

  const posts = (await getAllPosts()).filter((post) => post.tags.includes(tag));
  if (posts.length === 0) notFound();

  const initialState: LibraryState = {
    q: query.q ?? DEFAULT_STATE.q,
    tag: DEFAULT_STATE.tag,
    sort: SORT_KEYS.includes(query.sort as SortKey)
      ? (query.sort as SortKey)
      : DEFAULT_STATE.sort,
    page: Math.max(1, Number.parseInt(query.page ?? "1", 10) || 1),
  };

  return (
    <BlogLibrary
      posts={posts}
      initialState={initialState}
      basePath={tagHref(tag)}
      showTagPills={false}
      heading={{
        eyebrow: "Xvintec Blog · Tag",
        title: titleCase(tag),
        intro: `${posts.length} ${posts.length === 1 ? "article" : "articles"} on ${tag}.`,
      }}
    />
  );
}
