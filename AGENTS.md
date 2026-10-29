<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# wanderlust

Single Next.js app (App Router, TypeScript) for a travel-agency site. No monorepo, no test runner, no CI.

## Commands

- `npm run dev` — Turbopack dev server on :3000
- `npm run build` — production build; also the real typecheck (`next build` runs the project-local `tsc`)
- `npm run lint` — ESLint over the whole repo; for one file use `npx eslint <path>` (add `--fix` to autofix)
- `npx tsc --noEmit` — only valid after a `dev`/`build` run: `PageProps`/`LayoutProps` globals come from generated, gitignored `.next/types/routes.d.ts`

## Framework wiring

- `src/app/layout.tsx` is the root layout, `src/app/page.tsx` the only route so far. Alias `@/*` → `src/*`.
- `next.config.ts` turns on `cacheComponents`, `partialPrefetching`, and `reactCompiler` (all top-level, not `experimental`).
- Cache Components is the main trap: data is dynamic by default, so `fetch`, `cookies()`, `headers()`, `params`, or `searchParams` used outside `<Suspense>` fails the build ("encountered uncached or runtime data during prerendering"). Fixes: wrap in `<Suspense>`, cache with `"use cache"` + `cacheLife`, or opt out per segment with `export const instant = false`. Read `node_modules/next/dist/docs/01-app/01-getting-started/08-caching.md` before adding data fetching.
- Don't add `runtime`, `experimental_ppr`, or `dynamic` exports — unsupported/removed with Cache Components.
- `partialPrefetching` means `<Link>` prefetches only the static App Shell by default; use `prefetch={true}` for URL-specific data.
- React Compiler is enabled: don't hand-add `useMemo`/`useCallback` for memoization.
- Type pages/layouts with the generated globals (`LayoutProps<"/">`, `PageProps<"/trips/[slug]">`) instead of hand-typing `params`/`searchParams`.

## Styling / UI

- Tailwind v4, CSS-first: there is no `tailwind.config.*` and no PostCSS config. Design tokens and shadcn CSS vars live in `src/app/globals.css` (`@theme inline` + `:root`/`.dark`); change colors/radius there.
- Tailwind CSS is compiled by `@tailwindcss/turbopack` via the `turbopack.rules` entry in `next.config.ts`; keep that rule and the `@import` lines in `globals.css` (`tailwindcss`, `tw-animate-css`, `shadcn/tailwind.css`).
- shadcn is configured as style `base-nova` over `@base-ui/react` primitives — not Radix. Add components with `npx shadcn add <name>`; follow existing `src/components/ui` conventions (`data-slot`, `cva` variants, `cn(...)`).
- Class merging comes from the `cn` package (drop-in for `clsx` + `tailwind-merge`). Import it as `import { cn } from "cn"` like the existing components; `src/lib/utils.ts` only re-exports it. Don't add `clsx`/`tailwind-merge`.
- Body font is `Josefin_Sans` via `next/font/google` in `layout.tsx`; heading styles use the `font-heading` token.
