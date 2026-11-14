// Blog URL helpers, safe for client components (unlike ./blog, which is
// server-only because it holds the API key).

// Tags contain spaces ("managed IT services"), so they are URI-encoded in
// /blog/tag/[slug] URLs.
export function tagHref(tag: string): string {
  return `/blog/tag/${encodeURIComponent(tag)}`;
}
