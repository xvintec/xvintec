import type { Metadata } from "next";

import BlogLibrary from "@/components/BlogPage/BlogLibrary";
import {
  DEFAULT_STATE,
  type LibraryState,
  SORT_KEYS,
  type SortKey,
} from "@/components/BlogPage/libraryState";
import { getAllPosts } from "@/lib/blog";

// Must be a literal for Next's static analysis; mirrors `revalidate` in
// @/lib/blog (posts are no-store so CMS edits are live immediately).
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Blog | Xvintec",
  description:
    "Insights from Xvintec on managed IT services, cloud, cybersecurity and running technology for growing businesses.",
  alternates: { canonical: "/blog" },
};

type Props = {
  searchParams: Promise<{
    q?: string;
    tag?: string;
    sort?: string;
    page?: string;
  }>;
};

export default async function BlogIndexPage({ searchParams }: Props) {
  const params = await searchParams;

  // The listing filters in the browser and mirrors its state to the URL;
  // reading it here makes a shared or reloaded link render the same view.
  const initialState: LibraryState = {
    q: params.q ?? DEFAULT_STATE.q,
    tag: params.tag ?? DEFAULT_STATE.tag,
    sort: SORT_KEYS.includes(params.sort as SortKey)
      ? (params.sort as SortKey)
      : DEFAULT_STATE.sort,
    page: Math.max(1, Number.parseInt(params.page ?? "1", 10) || 1),
  };

  const posts = await getAllPosts();

  return <BlogLibrary posts={posts} initialState={initialState} />;
}
