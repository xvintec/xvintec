// TEMPORARY — CLIENT PREVIEW ONLY. REMOVE BEFORE GOING LIVE.
// See the removal checklist in .github/workflows/deploy-preview.yml
//
// GitHub Project Pages serve the site from /<repo>, but Next only applies
// `basePath` to /_next/* assets and next/link — NOT to public/ files passed to
// next/image. Without this loader every image 404s on the preview site.
//
// Must match `basePath` in next.config.mjs.
const BASE_PATH = "/xvintec";

export default function pagesImageLoader({ src }) {
  // Leave remote images and already-prefixed paths alone.
  if (!src.startsWith("/") || src.startsWith(`${BASE_PATH}/`)) {
    return src;
  }
  return `${BASE_PATH}${src}`;
}
