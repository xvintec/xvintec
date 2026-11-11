/// <reference types="react/canary" />
import { cache } from "react";
import ReactMarkdown from "react-markdown";

import type { Heading, Root } from "mdast";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";

import FaqAccordion from "@/components/BlogPage/FaqAccordion";
import TagPill from "@/components/BlogPage/TagPill";
import { formatDate, getPost } from "@/lib/blog";

// Must be a literal for Next's static analysis; mirrors `revalidate` in
// @/lib/blog (posts are no-store so CMS edits are live immediately).
export const revalidate = 0;

// generateMetadata and the page both need the post; cache() makes that one
// API request per render instead of two.
const loadPost = cache(getPost);

type Props = { params: Promise<{ slug: string }> };

/**
 * Inline remark plugin for the Pandoc-style heading anchors the CMS emits
 * (`## Heading {#slug}`). Strips the marker from the heading text and sets it
 * as the heading's id, so Table of Contents jump-links resolve.
 */
function remarkHeadingId() {
  return (tree: Root) => {
    for (const node of tree.children) {
      if (node.type !== "heading") continue;
      const heading = node as Heading;
      const last = heading.children[heading.children.length - 1];
      if (!last || last.type !== "text") continue;

      const match = last.value.match(/\s*\{#([^\s{}]+)\}\s*$/);
      if (!match) continue;

      last.value = last.value.slice(0, match.index).trimEnd();
      heading.data = {
        ...heading.data,
        hProperties: { ...heading.data?.hProperties, id: match[1] },
      };
    }
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) return {};

  const { seo } = post;
  const images = seo.ogImage
    ? [seo.ogImage]
    : post.thumbnailUrl
      ? [post.thumbnailUrl]
      : undefined;

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.focusKeyword ? [seo.focusKeyword] : undefined,
    alternates: { canonical: seo.canonicalUrl },
    openGraph: {
      type: "article",
      title: seo.metaTitle,
      description: seo.metaDescription,
      url: seo.canonicalUrl,
      images,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title: seo.metaTitle,
      description: seo.metaDescription,
      images,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) notFound();

  // The CMS graph already includes BlogPosting (+ FAQPage when there is a
  // FAQ). Escape "<" so the JSON can't close the script tag early.
  const jsonLd = JSON.stringify(post.seo.jsonLd).replace(/</g, "\\u003c");

  return (
    <main className="pb-20 pt-24 md:pb-28 md:pt-32" lang={post.language}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <article className="fl-container">
        <div className="mx-auto max-w-3xl">
          <header className="border-b border-[#D9D9D9] pb-8">
            <h1 className="text-4xl font-medium leading-tight text-[#111111] md:text-5xl">
              {post.title}
            </h1>

            <div className="mt-6 flex items-center gap-3 text-sm font-light text-[#686868]">
              {post.author.avatarUrl && (
                <Image
                  src={post.author.avatarUrl}
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                />
              )}
              <p>
                By{" "}
                {post.author.link ? (
                  <a
                    href={post.author.link}
                    className="font-medium text-[#111111] hover:text-[#005CC7]"
                    rel="author"
                  >
                    {post.author.name}
                  </a>
                ) : (
                  <span className="font-medium text-[#111111]">
                    {post.author.name}
                  </span>
                )}{" "}
                ·{" "}
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>{" "}
                · {post.readingMinutes} min read
              </p>
            </div>
          </header>

          {post.thumbnailUrl && (
            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl bg-[#F2F2F2]">
              <Image
                src={post.thumbnailUrl}
                alt={post.title}
                fill
                priority
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
              />
            </div>
          )}

          {post.tags.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <TagPill tag={tag} />
                </li>
              ))}
            </ul>
          )}

          {post.keyTakeaways.length > 0 && (
            <section className="mt-10 rounded-2xl border border-[#D6E7FA] bg-[#F4F8FD] p-6 md:p-8">
              <h2 className="mb-4 text-xl font-medium text-[#111111]">
                {post.labels.keyTakeaways}
              </h2>
              <ul className="list-disc space-y-2 pl-5 text-base font-light leading-7 text-[#414141]">
                {post.keyTakeaways.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          <div className="prose prose-lg mt-10 max-w-none prose-headings:scroll-mt-28 prose-headings:font-medium prose-headings:text-[#111111] prose-p:font-light prose-p:text-[#414141] prose-a:text-[#005CC7] prose-li:font-light prose-li:text-[#414141]">
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkHeadingId]}>
              {post.markdown}
            </ReactMarkdown>
          </div>

          {post.faq.length > 0 && (
            <section className="mt-14 border-t border-[#D9D9D9] pt-10">
              <h2 className="mb-6 text-3xl font-medium text-[#111111]">
                {post.labels.faq}
              </h2>
              <FaqAccordion
                items={post.faq.map((item) => ({
                  question: item.question,
                  answer: (
                    <div className="prose max-w-none prose-p:font-light prose-p:text-[#414141] prose-a:text-[#005CC7]">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {item.answer}
                      </ReactMarkdown>
                    </div>
                  ),
                }))}
              />
            </section>
          )}
        </div>
      </article>
    </main>
  );
}
