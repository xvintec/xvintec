"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { ArrowUpRight, ChevronDown, Clock, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { PostSummary } from "@/lib/blog";
import { tagHref } from "@/lib/blogPaths";

import { DEFAULT_STATE, type LibraryState, type SortKey } from "./libraryState";

// Blog listing in the resource-library layout: a filter panel (search, sort,
// tag pills with live counts), a masonry grid and numbered pagination. All
// published posts arrive from the server once; filtering, sorting and paging
// happen here, and the state is mirrored to the URL so it survives reloads
// and can be shared.

const PER_PAGE = 9;

const SORTS: { value: SortKey; label: string }[] = [
  { value: "new", label: "Newest first" },
  { value: "old", label: "Oldest first" },
  { value: "az", label: "Title A–Z" },
];

/* ------------------------------------------------------------------------ */

function matches(post: PostSummary, q: string) {
  if (!q) return true;
  const hay = `${post.title} ${post.excerpt} ${post.tags.join(" ")}`;
  return hay.toLowerCase().includes(q);
}

function sortPosts(list: PostSummary[], sort: SortKey) {
  const copy = [...list];
  if (sort === "az") copy.sort((a, b) => a.title.localeCompare(b.title));
  else if (sort === "old")
    copy.sort((a, b) => a.publishedAt.localeCompare(b.publishedAt));
  else copy.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return copy;
}

// 1 … 4 5 6 … 12 style page list.
function pageList(cur: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const set = [1, cur - 1, cur, cur + 1, total].filter(
    (p) => p >= 1 && p <= total
  );
  if (cur <= 3) set.push(2, 3, 4);
  if (cur >= total - 2) set.push(total - 1, total - 2, total - 3);
  const pages = Array.from(new Set(set)).sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  pages.forEach((p, i) => {
    if (i && p - pages[i - 1] > 1) out.push("…");
    out.push(p);
  });
  return out;
}

function columnCount(width: number) {
  return width >= 900 ? 3 : width >= 600 ? 2 : 1;
}

/* ------------------------------------------------------------------------ */

const PagerArrow = ({ dir }: { dir: "left" | "right" }) => (
  <svg
    width="26"
    height="16"
    viewBox="0 0 26 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={dir === "left" ? "M25 8H1M8 1 1 8l7 7" : "M1 8h24M18 1l7 7-7 7"} />
  </svg>
);

// Thumbnails come from the CMS at 1424x752; matching that box shows them
// uncropped (and fixes card heights before the images load, for the masonry).
const THUMB_RATIO = "1424 / 752";

// Tilt toward the cursor, as in the reference card (12deg at the edges).
const TILT_DEG = 12;

type CardProps = {
  post: PostSummary;
  index: number;
  cardRef: (el: HTMLElement | null) => void;
};

// Card in the blog-3 format: image with a reading-time chip, tag badges, title,
// excerpt and a "Read more" link. Tilts in 3D toward the cursor.
const Card = ({ post, index, cardRef }: CardProps) => {
  const tiltRef = useRef<HTMLElement>(null);

  // Written straight to the element, so moving the mouse doesn't re-render.
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = tiltRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${(y * -TILT_DEG).toFixed(2)}deg) rotateY(${(x * TILT_DEG).toFixed(2)}deg)`;
  };
  const onLeave = () => {
    if (tiltRef.current) tiltRef.current.style.transform = "";
  };

  return (
    // The entrance animation sits on this wrapper: an animated transform
    // would otherwise override the tilt on the card itself.
    <div
      ref={cardRef}
      className="animate-fade-up animate-duration-[450ms] motion-reduce:animate-none"
      style={{ animationDelay: `${index * 45}ms` }}
    >
      <article
        ref={tiltRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative flex flex-col overflow-hidden rounded-xl border border-[#E5E5E5] bg-white shadow-sm transition-[transform,box-shadow] duration-200 ease-out will-change-transform hover:shadow-xl has-[a:focus-visible]:outline has-[a:focus-visible]:outline-[3px] has-[a:focus-visible]:outline-offset-[3px] has-[a:focus-visible]:outline-[#0325E1]"
      >
        <div
          className="relative overflow-hidden bg-[#EEF4FD]"
          style={{ aspectRatio: THUMB_RATIO }}
        >
          {post.thumbnailUrl && (
            <Image
              src={post.thumbnailUrl}
              alt=""
              fill
              sizes="(min-width: 900px) 310px, (min-width: 600px) 50vw, 100vw"
              className="object-cover"
            />
          )}
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/85 px-2 py-0.5 text-[11px] font-medium text-h1-black backdrop-blur-sm">
            <Clock className="size-3" aria-hidden="true" />
            {post.readingMinutes} Min Read
          </span>
        </div>

        <div className="flex flex-col gap-2 px-5 pt-5">
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                // Above the card's stretched link, so a tag opens its landing
                // page instead of the post.
                <Link
                  key={tag}
                  href={tagHref(tag)}
                  className="relative z-10 inline-flex w-fit items-center rounded-full bg-[#EEF4FD] px-2.5 py-0.5 text-xs font-semibold capitalize text-navy transition-colors duration-200 hover:text-white hover:[background:var(--primary-gradient)]"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
          <h3 className="text-lg font-semibold leading-snug text-h1-black">
            <a
              href={`/blog/${post.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="outline-none after:absolute after:inset-0 after:content-['']"
            >
              {post.title}
            </a>
          </h3>
        </div>

        <p className="flex-1 px-5 pt-2 text-sm leading-relaxed text-p-grey">
          {post.excerpt}
        </p>

        {/* Same treatment as "Learn more" in the Services menu. */}
        <span className="inline-flex items-center gap-1 px-5 pb-5 pt-4 text-sm font-semibold text-[#0325E1]">
          Read more
          <ArrowUpRight size={14} aria-hidden="true" />
        </span>
      </article>
    </div>
  );
};

/* ------------------------------------------------------------------------ */

type BlogLibraryProps = {
  posts: PostSummary[];
  initialState: LibraryState;
  // Where the filter state is mirrored: "/blog", or a tag landing page.
  basePath?: string;
  heading?: { eyebrow: string; title: string; intro: string };
  // Tag landing pages already show one tag, so they hide the tag pills.
  showTagPills?: boolean;
};

const DEFAULT_HEADING = {
  eyebrow: "Xvintec Blog",
  title: "Insights & guides",
  intro:
    "Practical advice on IT support, cloud and security for growing businesses.",
};

const BlogLibrary = ({
  posts,
  initialState,
  basePath = "/blog",
  heading = DEFAULT_HEADING,
  showTagPills = true,
}: BlogLibraryProps) => {
  const [state, setState] = useState<LibraryState>(initialState);
  const [query, setQuery] = useState(initialState.q); // input value, debounced into state.q
  const gridRef = useRef<HTMLElement>(null);

  // All tags across posts, most used first.
  const allTags = useMemo(() => {
    const counts = new Map<string, number>();
    posts.forEach((p) =>
      p.tags.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1))
    );
    return Array.from(counts.keys()).sort(
      (a, b) => counts.get(b)! - counts.get(a)! || a.localeCompare(b)
    );
  }, [posts]);

  const q = state.q.trim().toLowerCase();
  // Pill counts reflect the search but not the tag itself, as in the reference.
  const searchMatches = useMemo(
    () => posts.filter((p) => matches(p, q)),
    [posts, q]
  );
  const list = useMemo(
    () =>
      sortPosts(
        state.tag === "All"
          ? searchMatches
          : searchMatches.filter((p) => p.tags.includes(state.tag)),
        state.sort
      ),
    [searchMatches, state.tag, state.sort]
  );

  const totalPages = Math.max(1, Math.ceil(list.length / PER_PAGE));
  const page = Math.min(state.page, totalPages);
  const start = (page - 1) * PER_PAGE;
  const pageItems = list.slice(start, start + PER_PAGE);

  // Tag filter options with counts that follow the search (not the tag).
  const tagOptions = useMemo(
    () => [
      { tag: "All", count: searchMatches.length },
      ...allTags.map((tag) => ({
        tag,
        count: searchMatches.filter((p) => p.tags.includes(tag)).length,
      })),
    ],
    [allTags, searchMatches]
  );

  // Collapsed, the pill row shows "All" plus the most-used tags, and always
  // the selected one; a "+N" pill expands the rest.
  const COLLAPSED_TAGS = 4;
  const [tagsExpanded, setTagsExpanded] = useState(false);
  const alwaysShown = (tag: string, i: number) =>
    i <= COLLAPSED_TAGS || tag === state.tag;
  const hiddenTagCount = tagOptions.filter(
    ({ tag }, i) => !alwaysShown(tag, i)
  ).length;

  // The pill row's height follows its content smoothly when pills wrap onto
  // a new line (or back) as the extras expand and collapse.
  const pillRowRef = useRef<HTMLDivElement>(null);
  const [pillRowHeight, setPillRowHeight] = useState<number>();
  useEffect(() => {
    const row = pillRowRef.current;
    if (!row) return;
    const observer = new ResizeObserver(() =>
      setPillRowHeight(row.offsetHeight)
    );
    observer.observe(row);
    return () => observer.disconnect();
  }, []);

  const isFiltered =
    state.q !== "" || state.tag !== "All" || state.sort !== "new";

  /* ---- state changes ---- */

  const update = useCallback((patch: Partial<LibraryState>) => {
    setState((prev) => ({ ...prev, page: 1, ...patch }));
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      if (query !== state.q) update({ q: query });
    }, 200);
    return () => clearTimeout(t);
  }, [query, state.q, update]);

  const goToPage = (next: number) => {
    setState((prev) => ({ ...prev, page: next }));
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const clearFilters = () => {
    setQuery("");
    setState(DEFAULT_STATE);
  };

  // Mirror to the URL without a navigation (the server already sent all posts).
  useEffect(() => {
    const params = new URLSearchParams();
    if (state.q) params.set("q", state.q);
    if (state.tag !== "All") params.set("tag", state.tag);
    if (state.sort !== "new") params.set("sort", state.sort);
    if (page !== 1) params.set("page", String(page));
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `${basePath}?${qs}` : basePath);
  }, [state.q, state.tag, state.sort, page, basePath]);

  /* ---- masonry ----
     Cards are dealt into columns, always into the shortest one, so reading
     order stays left-to-right. Before hydration (and for the server HTML) a
     plain responsive grid is used. Images sit in fixed-ratio boxes, so card
     heights are known before they load. */

  const [viewport, setViewport] = useState<number | null>(null);
  useEffect(() => {
    let frame = 0;
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setViewport(window.innerWidth));
    };
    setViewport(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const cols = viewport === null ? null : columnCount(viewport);
  const gap = 24;
  const cardRefs = useRef(new Map<string, HTMLElement>());
  const layoutKey = `${cols}|${viewport}|${pageItems.map((p) => p.slug).join(",")}`;
  const [placement, setPlacement] = useState<{
    key: string;
    columns: number[];
  } | null>(null);

  // Measure (cards are already at column width in the round-robin pass) and
  // deal them into the shortest column, before the browser paints.
  useLayoutEffect(() => {
    if (!cols || placement?.key === layoutKey) return;
    const heights = new Array<number>(cols).fill(0);
    const columns = pageItems.map((post) => {
      let shortest = 0;
      for (let c = 1; c < cols; c++)
        if (heights[c] < heights[shortest]) shortest = c;
      heights[shortest] +=
        (cardRefs.current.get(post.slug)?.offsetHeight ?? 0) + gap;
      return shortest;
    });
    setPlacement({ key: layoutKey, columns });
  }, [cols, gap, layoutKey, pageItems, placement?.key]);

  const columnOf = (i: number) =>
    placement?.key === layoutKey ? placement.columns[i] : i % (cols ?? 1);

  const renderCard = (post: PostSummary, i: number) => (
    <Card
      key={post.slug}
      post={post}
      index={i}
      cardRef={(el) => {
        if (el) cardRefs.current.set(post.slug, el);
        else cardRefs.current.delete(post.slug);
      }}
    />
  );

  /* ---- render ---- */

  return (
    <div className="bg-[linear-gradient(180deg,#EAF2FC_0,#FAFAFA_520px)] bg-no-repeat pt-20 md:pt-24">
      <header className="mx-auto max-w-[1000px] px-4 pb-7 pt-16 text-center max-[640px]:pt-10">
        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#686868]">
          {heading.eyebrow}
        </div>
        <h1 className="mb-2.5 mt-2.5 text-[clamp(32px,5vw,48px)] font-semibold leading-[1.1] tracking-[-0.02em] text-h1-black">
          {heading.title}
        </h1>
        <p className="mx-auto max-w-[560px] text-base leading-[1.55] text-[#414141]">
          {heading.intro}
        </p>
      </header>

      <main className="mx-auto max-w-[1000px] px-4">
        <section
          aria-label="Filter posts"
          className="grid gap-3.5 rounded-[14px] border border-[#E5E5E5] bg-white p-4 shadow-[0_6px_24px_-20px_rgba(3,37,225,0.4)]"
        >
          <div className="flex flex-wrap items-center gap-2.5">
            <label className="relative flex-[1_1_260px]">
              <Search
                size={16}
                strokeWidth={2}
                aria-hidden="true"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#686868]"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search posts"
                aria-label="Search posts"
                autoComplete="off"
                className="h-11 w-full rounded-lg border border-[#E5E5E5] bg-white pl-[38px] pr-3 text-sm text-h1-black outline-none transition-[border-color,box-shadow] duration-200 focus:border-[#0325E1] focus:shadow-[0_0_0_3px_rgba(3,37,225,0.15)]"
              />
            </label>
            <div className="relative flex-[0_1_190px] max-[640px]:flex-[1_1_140px]">
              <select
                value={state.sort}
                onChange={(e) => update({ sort: e.target.value as SortKey })}
                aria-label="Sort"
                className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-[#E5E5E5] bg-white pl-3 pr-[34px] text-sm text-h1-black outline-none transition-[border-color,box-shadow] duration-200 focus:border-[#0325E1] focus:shadow-[0_0_0_3px_rgba(3,37,225,0.15)]"
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#686868]"
              />
            </div>
          </div>

          {showTagPills && (
            <>
              {/* Phones: a dropdown, since a row of pills gets cut off. */}
              <div className="relative sm:hidden">
                <select
                  value={state.tag}
                  onChange={(e) => update({ tag: e.target.value })}
                  aria-label="Tag"
                  className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-[#E5E5E5] bg-white pl-3 pr-[34px] text-sm capitalize text-h1-black outline-none transition-[border-color,box-shadow] duration-200 focus:border-[#0325E1] focus:shadow-[0_0_0_3px_rgba(3,37,225,0.15)]"
                >
                  {tagOptions.map(({ tag, count }) => (
                    <option key={tag} value={tag}>
                      {tag === "All" ? "All tags" : tag} ({count})
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#686868]"
                />
              </div>

              {/* Larger screens: the first few pills plus a "+N" pill. The
                  rest are always rendered and grow in from zero width while
                  fading in (staggered), so the row expands smoothly and wraps
                  instead of cutting pills off; collapsing reverses it. */}
              <div
                className="hidden overflow-hidden transition-[height] duration-300 ease-out motion-reduce:transition-none sm:block"
                style={{ height: pillRowHeight }}
              >
                <div
                  ref={pillRowRef}
                  role="group"
                  aria-label="Tags"
                  className="flex flex-wrap gap-2"
                >
                  {tagOptions.map(({ tag, count }, i) => {
                    const active = state.tag === tag;
                    const extra = !alwaysShown(tag, i);
                    const collapsed = extra && !tagsExpanded;
                    const extraIndex = i - COLLAPSED_TAGS - 1;
                    return (
                      <button
                        key={tag}
                        type="button"
                        aria-pressed={active}
                        aria-hidden={collapsed || undefined}
                        tabIndex={collapsed ? -1 : undefined}
                        onClick={() => update({ tag })}
                        className={`h-9 flex-none overflow-hidden whitespace-nowrap rounded-full text-[13px] font-semibold capitalize tracking-[0.02em] transition-[max-width,opacity,padding,margin,color,background-color,border-color] duration-300 ease-out motion-reduce:transition-none ${
                          collapsed
                            ? "pointer-events-none -ml-2 max-w-0 border-0 px-0 opacity-0"
                            : "max-w-[320px] border px-3.5 opacity-100"
                        } ${
                          active
                            ? "border-transparent text-white [background:var(--primary-gradient)]"
                            : "border-[#E5E5E5] bg-white text-[#414141] hover:border-[#0325E1]"
                        }`}
                        style={
                          extra && tagsExpanded
                            ? { transitionDelay: `${extraIndex * 30}ms` }
                            : undefined
                        }
                      >
                        {tag}
                        <span className="ml-1 font-medium opacity-60">
                          {count}
                        </span>
                      </button>
                    );
                  })}
                  {hiddenTagCount > 0 && (
                    <button
                      type="button"
                      aria-expanded={tagsExpanded}
                      onClick={() => setTagsExpanded((open) => !open)}
                      className="h-9 flex-none rounded-full border border-dashed border-[#0325E1]/40 bg-white px-3.5 text-[13px] font-semibold text-[#0325E1] transition-colors duration-200 hover:border-[#0325E1] hover:bg-[#EEF4FD]"
                    >
                      {tagsExpanded ? "Show less" : `+${hiddenTagCount}`}
                    </button>
                  )}
                </div>
              </div>
            </>
          )}

          <div className="flex items-center justify-between gap-2.5 text-[13px] text-[#686868]">
            <span aria-live="polite">
              {list.length
                ? `Showing ${start + 1}–${start + pageItems.length} of ${list.length} posts`
                : "0 posts"}
            </span>
            {isFiltered && (
              <button
                type="button"
                onClick={clearFilters}
                className="py-1 text-[13px] font-semibold text-[#0325E1] underline underline-offset-[3px]"
              >
                Clear filters
              </button>
            )}
          </div>
        </section>

        <section ref={gridRef} aria-label="Posts" className="mt-9 scroll-mt-28">
          {pageItems.length === 0 ? (
            <div className="rounded-[14px] border border-dashed border-[#E5E5E5] bg-white px-4 py-[70px] text-center text-[#686868]">
              <strong className="mb-1.5 block text-lg text-h1-black">
                No posts match those filters
              </strong>
              Try a different keyword or clear the filters.
            </div>
          ) : cols === null ? (
            <div className="grid grid-cols-1 gap-6 min-[600px]:grid-cols-2 min-[900px]:grid-cols-3">
              {pageItems.map(renderCard)}
            </div>
          ) : (
            <div className="flex items-start" style={{ gap }}>
              {Array.from({ length: cols }, (_, c) => (
                <div
                  key={c}
                  className="flex min-w-0 flex-1 flex-col"
                  style={{ gap }}
                >
                  {pageItems.map((post, i) =>
                    columnOf(i) === c ? renderCard(post, i) : null
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {list.length > 0 && totalPages > 1 && (
          <nav
            aria-label="Pagination"
            className="mb-20 mt-14 flex flex-wrap items-center justify-center gap-1.5"
          >
            <button
              type="button"
              aria-label="Previous page"
              disabled={page === 1}
              onClick={() => goToPage(page - 1)}
              className="inline-flex h-[46px] min-w-[46px] items-center justify-center rounded-md px-1.5 text-h1-black transition-colors duration-200 enabled:hover:bg-[#EEF4FD] disabled:cursor-default disabled:opacity-30 max-[640px]:h-10 max-[640px]:min-w-[38px]"
            >
              <PagerArrow dir="left" />
            </button>
            {pageList(page, totalPages).map((p, i) =>
              p === "…" ? (
                <span
                  key={`gap-${i}`}
                  aria-hidden="true"
                  className="inline-flex h-[46px] min-w-[46px] items-center justify-center text-[17px] font-medium text-[#686868] max-[640px]:h-10 max-[640px]:min-w-[38px] max-[640px]:text-[15px]"
                >
                  …
                </span>
              ) : (
                <button
                  key={p}
                  type="button"
                  aria-label={`Page ${p}`}
                  aria-current={p === page ? "page" : undefined}
                  onClick={() => goToPage(p)}
                  className={`inline-flex h-[46px] min-w-[46px] items-center justify-center rounded-md px-1.5 text-[17px] transition-colors duration-200 max-[640px]:h-10 max-[640px]:min-w-[38px] max-[640px]:text-[15px] ${
                    p === page
                      ? "font-semibold text-white [background:var(--primary-gradient)]"
                      : "font-medium text-[#686868] hover:bg-[#EEF4FD] hover:text-h1-black"
                  }`}
                >
                  {p}
                </button>
              )
            )}
            <button
              type="button"
              aria-label="Next page"
              disabled={page === totalPages}
              onClick={() => goToPage(page + 1)}
              className="inline-flex h-[46px] min-w-[46px] items-center justify-center rounded-md px-1.5 text-h1-black transition-colors duration-200 enabled:hover:bg-[#EEF4FD] disabled:cursor-default disabled:opacity-30 max-[640px]:h-10 max-[640px]:min-w-[38px]"
            >
              <PagerArrow dir="right" />
            </button>
          </nav>
        )}
        {/* Bottom spacing when there is no pager. */}
        {!(list.length > 0 && totalPages > 1) && <div className="h-20" />}
      </main>
    </div>
  );
};

export default BlogLibrary;
