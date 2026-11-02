<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project map

- This is a single npm package (lockfile: `package-lock.json`) using Next.js 16.4, React 19, TypeScript, and the App Router. Routes and the root layout live in `src/app/`.
- Use the `@/*` alias for `src/*`. Shared UI primitives are in `src/components/ui/`; they are shadcn base-nova components built on Base UI. Their Tailwind theme variables and imports are centralized in `src/app/globals.css`.
- `components.json` is the shadcn source of truth: aliases point to `src/components`, `src/lib`, and `src/hooks`; its CSS target is `src/app/globals.css`.

## Commands and verification

- Run `npm run dev` for the Turbopack dev server, `npm run lint` for ESLint, and `npm run build` for the production build. There is no separate test or typecheck script; use `npm run lint` and `npm run build` for full available verification.

## Next.js 16 configuration

- `next.config.ts` enables `cacheComponents`, `partialPrefetching`, and the React Compiler. With cache components on, do not add legacy `dynamic`, `revalidate`, or `fetchCache` route-segment exports: use `'use cache'`/`cacheLife` or `<Suspense>` for runtime work instead.
- Development surfaces instant-navigation insights in the overlay/log rather than HTTP responses. Resolve them when adding route data; `instant = false` is only a temporary per-segment opt-out.
- Partial prefetching makes links prefetch a route's shared App Shell. Audit any `prefetch={true}` links when adding URL-dependent content; it no longer includes uncached dynamic content.
