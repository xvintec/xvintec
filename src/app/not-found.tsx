import type { Metadata } from "next";

import { NotFoundGlitch } from "@/components/ui/be-ui-404-not-found";

export const metadata: Metadata = {
  title: "Page not found | Xvintec",
};

// Rendered for unknown URLs and for notFound() calls (e.g. a missing blog post).
export default function NotFound() {
  return (
    // data-dark-header: light page with no hero, so the navbar uses its dark
    // variant (see Navbar.tsx).
    <main data-dark-header className="pt-24 md:pt-28">
      <NotFoundGlitch />
    </main>
  );
}
