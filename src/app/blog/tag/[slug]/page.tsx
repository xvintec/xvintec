import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PostList from "@/components/BlogPage/PostList";
import { getPosts, getTags, tagHref } from "@/lib/blog";

// Must be a literal for Next's static analysis; mirrors `revalidate` in
// @/lib/blog (posts are no-store so CMS edits are live immediately).
export const revalidate = 0;

const PER_PAGE = 12;

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

// Tags contain spaces, so the segment arrives URI-encoded.
function decodeTag(slug: string): string {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = decodeTag((await params).slug);
  return {
    title: `${tag} | Xvintec Blog`,
    description: `Xvintec articles tagged "${tag}".`,
    alternates: { canonical: tagHref(tag) },
  };
}

export default async function BlogTagPage({ params, searchParams }: Props) {
  const tag = decodeTag((await params).slug);
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number.parseInt(pageParam ?? "1", 10) || 1);

  // The last request only reads the overall total for the "All posts" chip.
  const [{ data, pagination }, tags, all] = await Promise.all([
    getPosts(page, PER_PAGE, tag),
    getTags(),
    getPosts(1, 1),
  ]);
  if (pagination.total === 0) notFound();

  return (
    <PostList
      posts={data}
      pagination={pagination}
      tags={tags}
      totalPosts={all.pagination.total}
      activeTag={tag}
    />
  );
}
