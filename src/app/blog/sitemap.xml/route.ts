import { type PostSummary, SITE_URL, getPosts } from "@/lib/blog";

// Must be a literal for Next's static analysis; mirrors `revalidate` in
// @/lib/blog (posts are no-store so CMS edits are live immediately).
export const revalidate = 0;

// The API rejects limit > 50 with a 400.
const PAGE_SIZE = 50;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function getAllPosts(): Promise<PostSummary[]> {
  const first = await getPosts(1, PAGE_SIZE);
  const rest = await Promise.all(
    Array.from({ length: first.pagination.totalPages - 1 }, (_, i) =>
      getPosts(i + 2, PAGE_SIZE)
    )
  );
  return [first, ...rest].flatMap((list) => list.data);
}

export async function GET() {
  const posts = await getAllPosts();
  const latest = posts
    .map((p) => p.updatedAt)
    .sort()
    .at(-1);

  const urls = [
    `  <url><loc>${SITE_URL}/blog</loc>${latest ? `<lastmod>${latest}</lastmod>` : ""}</url>`,
    ...posts.map(
      (post) =>
        `  <url><loc>${escapeXml(`${SITE_URL}/blog/${encodeURIComponent(post.slug)}`)}</loc><lastmod>${post.updatedAt}</lastmod></url>`
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
