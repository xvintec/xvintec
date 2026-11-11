import Link from "next/link";

import H1Heading from "@/components/Common/Headings/H1Heading";
import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  Pagination as PaginationNav,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  type Pagination,
  type PostSummary,
  type TagCount,
  tagHref,
} from "@/lib/blog";

import PostCard from "./PostCard";

type PostListProps = {
  posts: PostSummary[];
  pagination: Pagination;
  tags: TagCount[];
  // Total published posts, for the "All posts" filter count.
  totalPosts: number;
  // The tag being viewed, or null on /blog.
  activeTag: string | null;
};

// Same layout as the services listing (OurServices): centred heading, filter
// chips with counts, three-column cards, numbered pagination. Filters are
// links rather than client state, since posts come from the API per request.
const PostList = ({
  posts,
  pagination,
  tags,
  totalPosts,
  activeTag,
}: PostListProps) => {
  const { page, totalPages } = pagination;
  const basePath = activeTag ? tagHref(activeTag) : "/blog";
  const pageHref = (n: number) => (n <= 1 ? basePath : `${basePath}?page=${n}`);

  const filters = [
    {
      label: "All posts",
      href: "/blog",
      count: totalPosts,
      active: !activeTag,
    },
    ...tags.map(({ tag, count }) => ({
      label: tag,
      href: tagHref(tag),
      count,
      active: tag === activeTag,
    })),
  ];

  return (
    <main className="pb-14 pt-32 md:pt-40">
      <div className="fl-container">
        <H1Heading className="mb-0 text-center animate-fade-up">
          {activeTag ? `Posts on ${activeTag}` : "Our blog"}
        </H1Heading>
        <p className="m-auto max-w-5xl py-5 text-center font-light text-p-grey animate-fade-up animate-delay-300">
          Practical advice on IT support, cloud and security for growing
          businesses.
        </p>

        <nav
          aria-label="Filter posts by tag"
          className="mb-12 mt-6 flex flex-wrap justify-center gap-3"
        >
          {filters.map((filter) => (
            <Link
              key={filter.label}
              href={filter.href}
              aria-current={filter.active ? "page" : undefined}
              className={`flex h-10 items-center rounded-md px-3 text-lg capitalize transition-colors duration-200 ${
                filter.active
                  ? "bg-[#132128] text-white"
                  : "bg-[#F5F5F5] text-[#132128] hover:bg-[#ECECEC]"
              }`}
            >
              {filter.label}
              <span
                className={`ml-2.5 text-sm font-medium ${filter.active ? "text-white/70" : "text-[#0325E1]"}`}
              >
                {filter.count}
              </span>
            </Link>
          ))}
        </nav>

        {posts.length === 0 ? (
          <p className="text-center font-light text-p-grey">
            No posts published yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <PaginationNav className="py-10">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href={pageHref(Math.max(1, page - 1))} />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <PaginationItem key={p}>
                  <PaginationLink href={pageHref(p)} isActive={p === page}>
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href={pageHref(Math.min(totalPages, page + 1))}
                />
              </PaginationItem>
            </PaginationContent>
          </PaginationNav>
        )}
      </div>
    </main>
  );
};

export default PostList;
