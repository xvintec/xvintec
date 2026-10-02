# Xvintec Homepage V2 Revamp — Handoff Context

## Project & Branch

- Repo: `/Users/muhammad.imdaad/Documents/xvintec` (Next.js App Router, TypeScript, Tailwind CSS 3.3 + custom plugin)
- Branch: `homepage-v2-revamp` (off `main`)
- Route being worked on: `/home-v2`
- Commits so far on this branch (in order): `8196b3d`, `902feb7`, `3a9c137`

## Goal & Style Direction

Revamp xvintec.com starting with the homepage (`/home-v2`), then — once home-v2 is solid — the Services main page, Services inner pages, About Us page, and Careers page. **None of those later pages have been started yet.**

Style direction given by the user at the start of this project:
- Keep the **existing blue brand theme** as the primary color, even when borrowing more colorful patterns from reference sites.
- Adopt the visual language/structure of three reference sites:
  - **Highspring.com** — primary style guide. Pill buttons with arrow icons, header/nav treatment, card styles, "AI expertise"-style sections.
  - **Vaco.com** — horizontally-scrollable carousel pattern (used for "Our Core Functions").
  - **Ironcladapp.com** — footer structure, sticky-scroll section pattern (used for "Proven Results"), colorful stat-card pattern (used for "StatsCounter").
- **Keep the content as-is.** Do not invent new copy except where explicitly told (e.g., lorem-ipsum placeholder text in the Services dropdown's intro column).
- Work through each section from the original spec, verify visually, commit incrementally.

## Session Workflow Pattern (important — follow this)

The user reviews the live site in their own browser and gives **batched, numbered feedback with annotated screenshots**. Established pattern:
1. User lists bugs one by one (sometimes says explicitly "don't fix it till I say it").
2. User says "now fix the bugs" (or similar) → only then implement fixes.
3. Fix, verify, commit, report back — then wait for the next batch.

**Do not start the next phase (Services/About Us/Careers pages) without explicit go-ahead.** The user has repeated this instruction multiple times across sessions.

**Known friction point:** several rounds of user-provided screenshots failed to load / were rejected on the assistant's end during this session due to a per-session image-budget limit (images beyond a certain cumulative size/count get silently dropped, showing only alt-text dimensions). This caused at least one issue (banner image blend) to be "fixed" three times without ever matching what the user actually wanted, because the visual reference couldn't be inspected directly. **If this happens again, ask the user to describe the visual in structural/textual terms rather than guessing from memory of earlier screenshots.**

## What's Been Built on `/home-v2` (all sections)

Component locations under `src/components/`:

- **Navbar** (`Navbar/Navbar.tsx`, `Menu.tsx`, `StackedMenu.tsx`) — fixed header with a mega-menu dropdown for "Services" (4-column panel: intro column with lorem-ipsum + link, 2×8 service links, hover-preview promo panel). Mobile menu is a separate full-screen overlay.
- **Button** (`Common/Button/Button.tsx`) — pill-shaped, trailing `ArrowUpRight` icon that rotates 45° (diagonal→horizontal) on hover. Variants: `btn-primary` (gradient), `btn-secondary` (white), `btn-outline-light` (transparent/bordered). Defined in `tailwind.config.ts`'s custom plugin.
- **Banner** (`HomePage2/Banner/Banner.tsx`) — dark hero (`var(--hero-gradient)`), headline/subtext/two buttons, photo on the right, 3 stat icons below. **Image blend treatment is still unresolved — see Open Bugs.**
- **StatsCounter** (`HomePage2/StatsCounter/StatsCounter.tsx` + `CountUpValue.tsx`) — 6 colored cards with a count-up number animation on scroll-into-view.
- **ValueProps, ServiceGrid, ProcessSteps, RiskFreeGuarantee, CaseStudies ("Proven Results"), ContactInfo, ReadyToGetStarted** — styled, working, not currently flagged as buggy.
- **CoreFunctions** (`HomePage2/CoreFunctions/CoreFunctions.tsx`) — Swiper carousel of `ServiceGridCard`s. **Hover hard-cut clipping bug still unresolved — see Open Bugs.**
- **IndustriesServed** (`HomePage2/IndustriesServed/IndustriesServed.tsx`) — sticky card (right, `lg:col-span-8`) + industry list (left, `lg:col-span-4`). **Sticky behavior still reported broken by the user despite repeated automated verification — see Open Bugs.**
- **TrustedByEnterprises** (`HomePage2/TrustedByEnterprises/TrustedByEnterprises.tsx`) — reverted back to the original individual bordered logo cards (grid of 5) after a marquee-carousel redesign was rejected by the user.
- **Testimonials2 / "Client Success Stories"** (`HomePage2/Testimonials2/Testimonials2.tsx` + `Testimonial2Card.tsx`) — rebuilt as a photo-card grid (3-col, photo band + industry tag + quote + byline) after two earlier attempts (plain 3-card grid, then a single-slide Ironclad-style carousel) were both rejected. This version was built to match Highspring's actual homepage "client success" pattern (confirmed via WebFetch: it's a grid of case-study cards with photo/tag/headline/description/link, not a quote carousel).
- **Footer** (`Footer/Footer.tsx`) — Ironclad-inspired structure: logo + social icons row, newsletter pill input with `Subscribe` + `ArrowUpRight` button (rotates on hover, matching the site's button convention), Services/Company/More columns, legal bar.

## Fixes Already Landed (for context on what NOT to re-break)

From commit `902feb7`:
- Banner image mask-image vignette was silently failing to render (confirmed via computed-style checks + pixel screenshots — the CSS was correct but Chromium wasn't painting it); replaced with box-shadow, then later a gradient overlay.
- StatsCounter section had zero top margin, butting directly against the dark hero; added top margin.
- IndustriesServed sticky was broken because the grid ancestor carried a `transform`-based `animate-fade-up` class, which invalidates `position:sticky`'s containing block; moved animation classes onto the grid's children instead of the grid itself. (This diagnosis is confirmed correct via DOM/computed-style checks — the sticky mechanism clamps at the expected `top: 112px` offset in headless testing — but the user still reports it doesn't work in their real browser. **This discrepancy is unresolved.**)
- CoreFunctions Swiper's `overflow:hidden` was clipping hover shadows on edge slides; added `slidesOffsetBefore/After` + more slide padding. (**User reports this is still broken** — needs re-diagnosis, possibly a different root cause than what was fixed.)
- Navbar/StackedMenu: removed a blanket `onClick` on `<nav>` that was closing the mega-menu on any click inside it (including real link clicks).
- Footer subscribe button arrow changed from plain `ArrowRight` to `ArrowUpRight` with the site's rotate-45-on-hover convention.

From commit `3a9c137` (second round of fixes):
- Navbar header inverted to transparent-by-default / white-on-scroll (previously white-by-default / blue-on-scroll).
- StackedMenu: removed a hover-pill background that had been added to the "Services" trigger (this itself is now flagged again as having introduced unwanted spacing changes — see Open Bugs #1).
- StackedMenu: added a `document.documentElement` `mouseleave` listener as a safety net for the dropdown-not-closing bug, on top of an existing geometric mousemove hit-test. (**User reports this is still broken** — see Open Bugs.)
- IndustriesServed: increased the list column's `min-height` further to lengthen the sticky pin window.
- TrustedByEnterprises: reverted to original bordered cards.
- Testimonials2: rebuilt as photo-card grid (see above).
- Banner: replaced vignette with a directional left-edge gradient fade + two corner-frame accents (**user says this is still wrong** — see Open Bugs #7, they want a background-image-style treatment with right-side shading, not a boxed photo with corner accents).

## OPEN BUGS — Not Yet Fixed (most recent user report, in the user's own words/paraphrase)

1. **StackedMenu spacing regression.** The user says: "earlier there were not this much of spacing, idk why are you breaking existing functions in services dropdown. Don't touch working code." Recent edits (wrapping the "Services" intro column in a `<Link>`, adding hover treatment) apparently altered spacing that was previously fine. **Action needed:** revert to the original tighter spacing in that column; be surgical — don't make adjacent unrelated changes while fixing a specific reported bug.
2. **IndustriesServed sticky still not working**, per the user's real browser, despite three rounds of fixes and automated verification (via Playwright/headless Chromium) showing it clamps correctly at `top: 112px` for 8+ consecutive scroll steps. This is a real unresolved discrepancy between automated testing and the user's actual experience — worth investigating differently next time (e.g., ask the user for their exact viewport size/browser/OS, or have them describe exactly what they see happen when scrolling, or consider whether there's a CSS specificity/build issue specific to a production build vs dev server).
3. **CoreFunctions "Our Core Functions" hover hard-cut still not fixed.** The Engineering card (and likely other cards in the Swiper) shows a hard visual clip on hover. Previous fix (`slidesOffsetBefore/After` + slide padding) did not resolve it per the user. Needs re-diagnosis — possibly the clipping source is different than assumed (e.g., a parent `overflow-hidden` on the section wrapper itself, not the Swiper).
4. **Mobile: remove a transition/animation effect** on content that animates in after scrolling. Likely refers to the `useIntersectionAnimation` hook's fade-up/fade-in reveal animations (`animate-fade-up`, `animate-fade`, etc., used throughout nearly every section) — user wants this disabled specifically on mobile viewports.
5. **Mobile: the sticky section should be an accordion.** IndustriesServed (and possibly CaseStudies/"Proven Results", same sticky pattern) should render as an accordion on mobile instead of attempting sticky-card behavior, which doesn't translate well to small screens.
6. **Mobile hamburger/close icon color.** The user says: "hamburger menu close icon should be white in blue color in mobile" — likely means: when the mobile menu/header is in its blue-filled state, the hamburger/close icon should render white (currently it may not account for this state correctly). Needs clarification on exact trigger condition but log as reported.
7. **Banner image blend — reported wrong multiple times now.** User's most detailed clarification: *"highspring treats [the image] like a background image but blends with right side with the shading effect."* This means:
   - The image should NOT be a boxed/framed/rounded photo (which is what's been built 3 times now: mask vignette → box-shadow vignette → gradient+corner-accents).
   - It should behave more like a **full-bleed background image** that blends into the hero via a **shading/gradient effect on its right-facing edge** (or possibly the whole right side of the hero section).
   - **Recommendation for next session:** before attempting a 4th implementation, either (a) get a live screenshot of highspring.com's actual hero section that successfully loads and inspect it directly, or (b) fetch the live page and inspect actual computed CSS on the hero image element (WebFetch converts to markdown and loses CSS — consider using a Playwright script to navigate to highspring.com directly and inspect computed styles / take a screenshot at small-enough dimensions to view, or ask the user to paste the specific CSS/element if they can access devtools).

## Not Yet Started

Services main page, Services inner pages, About Us page, Careers page — no work has begun on any of these. Do not start until:
(a) all open bugs above are actually resolved to the user's satisfaction, and
(b) the user gives explicit go-ahead for the next phase.

## Technical Notes / Environment Details

- Playwright chromium is cached at `~/Library/Caches/ms-playwright` (`chromium-1140`), and a usable `playwright` npm package exists at `~/.npm/_npx/5c6d8c4f680fcd0a/node_modules` — invoke scripts with `NODE_PATH=/Users/muhammad.imdaad/.npm/_npx/5c6d8c4f680fcd0a/node_modules node <script>.js`. The Next.js dev server is typically already running on port 3000 in another session — check `ps aux | grep next` before starting a new one (there was an incident earlier in this project's history where a broad `pkill` accidentally killed a different session's dev server — be careful with process-killing commands).
- Always run `npx tsc --noEmit -p tsconfig.json` and `npx eslint src` before committing; both have been kept clean throughout.
- Never commit `tsconfig.tsbuildinfo` — `git checkout -- tsconfig.tsbuildinfo` before staging if it shows as modified.
- Screenshot viewing via the Read tool can hit a session-level image budget after enough large images have been shown — if this happens, fall back to DOM/computed-style assertions via Playwright's `page.evaluate()` rather than pixel screenshots, but treat this as a weaker form of verification than actually seeing the rendered result, especially for anything the user has already reported as wrong more than once (the sticky and banner-blend bugs are the clearest examples of automated verification disagreeing with the user's real experience).
