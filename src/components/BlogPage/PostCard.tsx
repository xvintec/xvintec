import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { PostSummary } from "@/lib/blog";

import TagPill from "./TagPill";

// Mirrors ServiceCaseCard on the services listing so both pages read as one.
// The tags are links of their own, and links can't nest, so the card is a
// plain element: the title link's ::after stretches over the whole card to make
// it clickable, and the tags sit above that overlay (see TagPill).
const PostCard = ({ post }: { post: PostSummary }) => {
  return (
    <article className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_18px_40px_-20px_rgba(6,15,38,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_50px_-18px_rgba(6,15,38,0.35)] animate-fade-up">
      <div className="relative aspect-[16/9] w-full shrink-0 bg-[#F2F2F2]">
        {post.thumbnailUrl && (
          <Image
            src={post.thumbnailUrl}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-[30px]">
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <TagPill key={tag} tag={tag} />
            ))}
          </div>
        )}

        <h3 className="mt-5 text-xl font-semibold text-h1-black">
          <Link
            href={`/blog/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="after:absolute after:inset-0 after:content-['']"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 max-lines font-normal text-p-grey">{post.excerpt}</p>

        <div className="mt-6 flex items-center gap-2 text-base font-bold text-[#0325E1]">
          <span className="flex h-6 w-6 items-center justify-center rounded bg-[#0325E1] text-white transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
            <ArrowUpRight size={14} strokeWidth={2.5} />
          </span>
          Read more
        </div>
      </div>
    </article>
  );
};

export default PostCard;
