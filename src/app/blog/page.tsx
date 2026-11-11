import type { Metadata } from "next";

import PostList from "@/components/BlogPage/PostList";
import { getPosts, getTags } from "@/lib/blog";

// Must be a literal for Next's static analysis; mirrors `revalidate` in
// @/lib/blog (posts are no-store so CMS edits are live immediately).
export const revalidate = 0;

const PER_PAGE = 12;

export const metadata: Metadata = {
  title: "Blog | Xvintec",
  description:
    "Insights from Xvintec on managed IT services, cloud, cybersecurity and running technology for growing businesses.",
  alternates: { canonical: "/blog" },
};

type Props = { searchParams: Promise<{ page?: string }> };

export default async function BlogIndexPage({ searchParams }: Props) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number.parseInt(pageParam ?? "1", 10) || 1);

  const [{ data, pagination }, tags] = await Promise.all([
    getPosts(page, PER_PAGE),
    getTags(),
  ]);

  return (
    <PostList
      posts={data}
      pagination={pagination}
      tags={tags}
      totalPosts={pagination.total}
      activeTag={null}
    />
  );
}
