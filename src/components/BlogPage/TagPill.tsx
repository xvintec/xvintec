import Link from "next/link";

import { tagHref } from "@/lib/blog";

// Navy all-caps pill, same as the category pill on service cards, linking to
// the tag's listing. Hovering swaps in the brand blue gradient.
// `relative z-10` lifts it above a card's full-cover link so it stays
// clickable on its own.
const TagPill = ({ tag }: { tag: string }) => (
  <Link
    href={tagHref(tag)}
    className="relative z-10 inline-block w-fit rounded-[25px] bg-navy px-[15px] py-2 text-sm font-medium uppercase leading-[14px] tracking-[0.7px] text-white transition-shadow duration-200 hover:shadow-[0_8px_18px_-8px_rgba(3,37,225,0.6)] hover:[background:var(--primary-gradient)]"
  >
    {tag}
  </Link>
);

export default TagPill;
