/** @type {import('next').NextConfig} */

// TEMPORARY — CLIENT PREVIEW ONLY. REMOVE BEFORE GOING LIVE.
// The `isGithubPages` branch below exists purely to publish the homepage-v2
// preview to GitHub Pages. Strip it (and .github/workflows/deploy-preview.yml
// plus public/.nojekyll) when the revamp ships to the live server, so the app
// goes back to a normal server-rendered Next build with image optimization.
//
// Set by the GitHub Pages workflow. Kept off by default so `next dev` and any
// normal build behave exactly as before.
const isGithubPages = process.env.GITHUB_PAGES === "true";

// Project Pages are served from /<repo>, so assets need that prefix. A custom
// domain serves from the root instead — set PAGES_BASE_PATH="" for that.
const basePath =
  process.env.PAGES_BASE_PATH ?? (isGithubPages ? "/xvintec" : "");

const nextConfig = {
  ...(isGithubPages
    ? {
        // Pages is a static host: no Node server, so no on-demand image
        // optimization and every route must be pre-rendered to HTML.
        output: "export",
        basePath,
        assetPrefix: basePath,
        trailingSlash: true,
      }
    : {}),
  images: {
    // A custom loader (rather than `unoptimized`) so public/ image paths get the
    // basePath prefix they need on Project Pages. Also satisfies static export.
    ...(isGithubPages
      ? { loader: "custom", loaderFile: "./image-loader.mjs" }
      : {}),
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
