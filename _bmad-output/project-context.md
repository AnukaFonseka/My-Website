---
project_name: 'My-Website'
user_name: 'Anuka'
date: '2026-03-17'
sections_completed: ['technology_stack', 'language_rules', 'framework_rules', 'testing_rules', 'quality_rules', 'workflow_rules', 'anti_patterns']
status: 'complete'
rule_count: 47
optimized_for_llm: true
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

- **Next.js** 13.2.1 — Pages Router (`src/pages/`). No App Router.
- **React** 18.2.0
- **JavaScript** (no TypeScript — all files are `.js`/`.jsx`)
- **Tailwind CSS** 3.2.7
- **Framer Motion** 10.0.1
- **@vercel/analytics** 1.6.1
- **PostCSS** 8.4.21 / **Autoprefixer** 10.4.13
- **Deployment**: Vercel (`https://anuka-fonseka.vercel.app`)

## Critical Implementation Rules

### Language-Specific Rules

- All files use `.js` extension — never create `.ts` or `.tsx` files.
- Use `@/` path alias for `src/` imports (e.g. `import Foo from "@/components/Foo"`).
- Use named exports for icons and utility components; default exports for pages and main components.
- No type annotations — this is plain JavaScript, not TypeScript.
- Use ES module `import`/`export` syntax throughout (no `require()` except in config files).
- Async operations use `async/await` pattern.

### Framework-Specific Rules

**Next.js (Pages Router):**
- All pages live in `src/pages/`. Never use `app/` directory or App Router patterns.
- Never use `"use client"` or `"use server"` directives — they don't exist in Pages Router.
- Use `getStaticProps` / `getStaticPaths` for static generation; `getServerSideProps` for SSR.
- Dynamic routes use bracket syntax: `[slug].js`.
- Use `next/head` (not `<head>`) for page-level meta tags — every page needs its own `<Head>`.
- Use `next/image` for all images with `sizes` prop specified.
- Use `next/link` for all internal navigation (not `<a>` tags).
- API routes go in `src/pages/api/`.

**React Patterns:**
- Every page must include `<TransitionEffect />` as the first child after `<Head>`.
- Every page content must be wrapped in `<Layout>` component.
- Dark mode is handled via `useThemeSwitch` hook — never manipulate `document.documentElement.classList` directly outside this hook.
- Framer Motion used for animations: `motion.div`, `motion.a` etc. with `whileHover`/`whileTap`/`initial`/`animate`/`transition` props.
- Custom mobile/desktop links use `useRouter().asPath` for active state detection.

**Tailwind Breakpoints (CRITICAL — inverted from default):**
- Breakpoints use `max-width` (desktop-first), NOT the Tailwind default mobile-first `min-width`:
  - `2xl`: max 1535px, `xl`: max 1279px, `lg`: max 1023px, `md`: max 767px, `sm`: max 639px, `xs`: max 479px
- Always write base styles for desktop and add `md:`, `sm:` etc. for smaller screens.

**Custom Tailwind Tokens:**
- Colors: `text-dark` (#1b1b1b), `text-light` (#f5f5f5), `text-primary` (#B63E96), `text-primaryDark` (#58E6D9)
- Font: `font-mont` (Montserrat via CSS variable `--font-mont`)
- Custom gradients: `bg-circularLight`, `bg-circularDark` (and `Lg`, `Md`, `Sm` variants)
- Always pair light/dark styles: e.g. `text-dark dark:text-light`, `bg-light dark:bg-dark`

### Testing Rules

- No test framework is currently configured in this project.
- Do not add test files or test infrastructure unless explicitly requested.
- If testing is introduced, prefer **Vitest** (compatible with Vite/Next.js ecosystem) over Jest.
- Manual testing is done via the Vercel preview deployment.

### Code Quality & Style Rules

**File & Folder Structure:**
- Components: `src/components/PascalCase.js`
- Custom hooks: `src/components/Hooks/useCamelCase.js`
- Pages: `src/pages/kebab-case.js` (Next.js routing convention)
- Static data: `src/data/camelCaseData.js`
- Styles: `src/styles/`
- Public assets: `public/images/` (organized by type: `profile/`, `projects/`, `svgs/`)

**Naming Conventions:**
- Components: PascalCase (e.g. `AnimatedText`, `TransitionEffect`)
- Hooks: camelCase prefixed with `use` (e.g. `useThemeSwitch`)
- Data files: camelCase with `Data` suffix (e.g. `articlesData.js`)
- CSS classes: Tailwind utility classes only — no custom CSS modules except `Home.module.css`

**Component Patterns:**
- Sub-components defined in the same file when only used by that component (e.g. `CustomLink` inside `Navbar.js`)
- Use `className` template literals for conditional Tailwind classes (not `clsx`/`classnames` library)
- Inline SVGs go in `src/components/Icons.js` as named exports

**SEO Pattern (every page):**
- Include `og:title`, `og:description`, `og:url`, `og:type`, `twitter:card` meta tags
- Set canonical URL using the pattern `https://anuka-fonseka.vercel.app/{path}`

### Development Workflow Rules

**Git & Branching:**
- Main branch: `main` — direct deployment to Vercel on push.
- **AI agents must NEVER commit directly to `main`.**
- For every new feature, create a branch named `feature/feature-name` (e.g. `feature/chatbot`).
- Only merge to `main` after human review.
- Direct pushes to `main` are for hotfixes only.
- No CI/CD pipeline configured — Vercel auto-deploys on push to `main`.
- Commit message convention: `type(scope): message` (conventional commits style).

**Deployment:**
- Hosted on Vercel. Every push to `main` triggers a production deployment.
- Preview deployments generated automatically for PRs/branches.
- No environment variables currently required for core functionality.
- Vercel Analytics is enabled via `<Analytics />` in `src/pages/_app.js`.

**Adding New Pages:**
- Create file in `src/pages/` — Next.js auto-registers as a route.
- Add navigation link to both desktop `<nav>` and mobile `<nav>` in `src/components/Navbar.js`.

**Adding New Articles:**
- Articles are NOT markdown files — add a new object to the `articles` array in `src/data/articlesData.js`.
- Use the typed-block content structure: `section`, `code`, `callout`, `table`, `checklist`, `architecture`, `body`, `environment` block types.
- New article slugs are auto-registered via `getStaticPaths` in `src/pages/articles/[slug].js`.

### Critical Don't-Miss Rules

**Anti-Patterns to Avoid:**
- ❌ Never use App Router patterns (`layout.js`, `loading.js`, `"use client"`, `"use server"`, `useFormState`, etc.) — this project uses Pages Router only.
- ❌ Never create `.ts` or `.tsx` files — JavaScript only.
- ❌ Never use standard Tailwind mobile-first breakpoints — breakpoints here are max-width (desktop-first).
- ❌ Never use `<a>` tags for internal links — always `next/link`.
- ❌ Never use `<img>` tags — always `next/image` with `sizes` prop.
- ❌ Never manipulate `document.documentElement.classList` for dark mode outside `useThemeSwitch` hook.
- ❌ Never add articles as markdown/MDX files — use the typed-block data structure in `articlesData.js`.
- ❌ Never commit directly to `main` — always use a `feature/` branch.
- ❌ Never use `clsx`, `classnames`, or other class utility libraries — use template literals.

**Page Anatomy Checklist (every new page must have):**
1. `<Head>` with title, description, og:*, twitter:card meta tags
2. `<TransitionEffect />` immediately after `<Head>`
3. `<Layout>` wrapping all page content
4. `text-dark dark:text-light` on the root element

**Responsive Design Gotcha:**
- `lg:` targets screens ≤1023px (tablets + mobile), NOT large screens.
- `md:` targets screens ≤767px (mobile only).
- When hiding elements: `lg:hidden` hides on tablet/mobile; `lg:inline-block` shows only on tablet/mobile.

**Dark Mode Gotcha:**
- The `darkMode: "class"` strategy requires `dark` class on `<html>`. This is managed by `useThemeSwitch` — do not add `dark` class manually anywhere else.
- Always test both modes when writing new Tailwind classes.

**Framer Motion Gotcha:**
- `motion.a` is used for external links with hover/tap animations (social icons etc.).
- `motion.div` for container animations with `initial`/`animate`/`transition`.
- Do not wrap `next/link` in `motion.*` — use `motion.div` as a wrapper instead.

---

## Usage Guidelines

**For AI Agents:**
- Read this file before implementing any code in this project.
- Follow ALL rules exactly as documented — especially breakpoints, dark mode, and Pages Router.
- When in doubt, prefer the more restrictive option.
- Update this file if new patterns emerge during implementation.

**For Humans:**
- Keep this file lean and focused on agent needs.
- Update when technology stack or conventions change.
- Review periodically and remove rules that become obvious over time.

_Last Updated: 2026-03-17_
