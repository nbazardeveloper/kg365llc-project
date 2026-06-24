# KG365 LLC — Construction & Renovation Website

A premium, mobile-first, edge-to-edge marketing site for KG365 LLC with a CMS-driven portfolio and a free-consultation lead form. Built on TanStack Start with Lovable Cloud for storage, auth (admin), and lead capture. Resend + Telegram integrations are stubbed behind a server function so real keys can be dropped in later.

## Design system

- **Accent color:** `#0069b4` (from bishkek.png) used for primary buttons, links, hover states, focus rings, and section accents. Defined as `--primary` token in `src/styles.css` (oklch equivalent), with `--primary-foreground` white.
- **Typography:**
  - Headings (H1/H2/H3): **Playfair Display**, bold, generous tracking and line-height.
  - Body/UI/buttons/nav: **Inter**, min 18px body, line-height ≥ 1.6.
  - Fonts loaded via `<link>` in `__root.tsx` head (Google Fonts), referenced through `--font-display` / `--font-sans` tokens in `@theme`.
- **Layout:** Edge-to-edge, full-bleed hero and section backgrounds; inner content uses generous max-width container only where reading flow requires it.
- **Motion:** Framer Motion for scroll-reveal on Services cards and Portfolio gallery (matching the smooth fade/slide pattern from the Caliber reference). Subtle hover lift on cards. No gratuitous micro-animations.
- **Imagery:** Unsplash stock images (high-res construction/remodel photography) referenced by URL — no image generation.

## Pages & routes

```
src/routes/
  __root.tsx              shared header/footer + fonts + sitewide meta
  index.tsx               Home (hero → problem/solution → why → services preview → portfolio preview → FAQ teaser → lead form → footer)
  about.tsx               About narrative
  services.tsx            Full services list with animated cards
  portfolio.tsx           Dynamic gallery from Cloud DB
  faq.tsx                 Accordion of FAQs
  contact.tsx             Lead form + contact info
  _authenticated/
    route.tsx             Auth gate (provided by Cloud)
    admin.tsx             Admin dashboard: list/create/edit/delete portfolio projects
  api/public/
    leads.ts              POST endpoint: validates + stores lead + triggers mock Resend/Telegram
```

Each route sets its own `head()` with unique title, description, og:title, og:description, canonical, og:url. Root holds sitewide defaults (charset, viewport, og:site_name, Organization JSON-LD).

## Sections (Home page)

1. **Hero** — H1 "Your Vision, Expertly Crafted." + sub-headline + primary CTA "Get Your Free Consultation & Estimate" + full-bleed before/after hero image.
2. **Problem & Solution** — Two-column on desktop, stacked on mobile.
3. **Why Choose KG365** — 4 value props with icons (lucide-react).
4. **Services** — 5 animated cards (Kitchen & Bath, Flooring & Tile, Painting & Drywall, Handyman, Full Renovations). Scroll-triggered stagger fade-up.
5. **Portfolio preview** — 6 most recent projects pulled from Cloud, link to `/portfolio`.
6. **FAQ teaser** — 3 questions + link to `/faq`.
7. **Lead form** — Name, Phone, Email, Project Type (select), Description, Preferred Contact Method.
8. **Footer** — Phone, email, socials, disclaimer.

## Backend (Lovable Cloud)

**Tables (with GRANTs + RLS):**
- `portfolio_projects` — id, title, slug, description, category, before_image_url, after_image_url, gallery (jsonb), featured (bool), display_order, created_at.
  - Public `SELECT` to `anon` (read-only public gallery).
  - `INSERT/UPDATE/DELETE` restricted to users with `admin` role.
- `leads` — id, name, phone, email, project_type, description, preferred_contact, status, created_at.
  - `INSERT` allowed for `anon` (form submission); `SELECT/UPDATE/DELETE` admin-only.
- `user_roles` + `app_role` enum + `has_role()` security-definer function (per platform guidance).

**Storage:** Cloud Storage bucket `portfolio` for project images uploaded from admin.

**Admin auth:** Email/password sign-in via Lovable Cloud. First user can be promoted to admin via a seeded migration on the project owner's email (or via a one-time SQL note in the README).

## Lead submission flow

- Public TSS server route `POST /api/public/leads`:
  1. Validates payload with Zod.
  2. Inserts row into `leads` via service-role client.
  3. Calls `sendLeadEmail()` and `sendLeadTelegram()` helpers in `src/lib/notifications.server.ts` — both are mocked: log payload + return `{ ok: true, mocked: true }`. Real integrations are TODO-commented with the exact Resend gateway call and Telegram gateway call ready to uncomment once secrets are added.
  4. Returns success/failure JSON; frontend shows toast.

## Files to add/modify

- `src/styles.css` — tokens (primary blue, fonts, radii, shadows), `@theme inline`.
- `src/routes/__root.tsx` — font `<link>`, sitewide meta, header/footer composition, Toaster.
- `src/components/site/Header.tsx`, `Footer.tsx`, `LeadForm.tsx`, `ServiceCard.tsx`, `PortfolioGrid.tsx`, `BeforeAfter.tsx`, `Reveal.tsx` (framer-motion wrapper), `FAQAccordion.tsx`.
- `src/routes/index.tsx`, `about.tsx`, `services.tsx`, `portfolio.tsx`, `faq.tsx`, `contact.tsx`.
- `src/routes/_authenticated/admin.tsx` + project editor dialog.
- `src/routes/api/public/leads.ts`.
- `src/lib/notifications.server.ts` (mock Resend + Telegram).
- Cloud migration: enums, tables, GRANTs, RLS, roles, `has_role`, storage bucket policies.

## Technical notes

- TanStack Query for portfolio reads (`ensureQueryData` in loaders + `useSuspenseQuery` in components).
- Framer Motion installed via `bun add framer-motion`.
- All form inputs validated client-side with Zod + react-hook-form (shadcn `Form`).
- Semantic HTML throughout: one H1 per page, sectioned content, descriptive alt text on every image, keyword-rich copy for the targeted service terms.
- Mobile-first Tailwind: base styles target small screens; `sm:`/`md:`/`lg:` upgrades only.

## Out of scope for this version

- Real Resend / Telegram delivery (mocked; one-line swap later).
- Blog, multi-language, advanced analytics, payment processing.
