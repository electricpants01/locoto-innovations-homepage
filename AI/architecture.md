# 🏗️ Project Architecture

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Framework** | Astro | v6.4.6 |
| **CSS** | Tailwind CSS | v4.3.x |
| **Tailwind Plugin** | @tailwindcss/vite | v4.3.x |
| **Language** | TypeScript | Latest |
| **Runtime** | Node.js | ≥22.12.0 |
| **Package Manager** | npm | Latest |

---

## File Structure

```
HomePage-Locoto-Innovations/
├── AI/                         # ← AI context folder (you are here)
│   ├── README.md
│   ├── profile.md
│   ├── architecture.md
│   ├── context.md
│   ├── skills/
│   │   ├── README.md
│   │   ├── mobile.md
│   │   ├── architecture.md
│   │   └── tools.md
│   └── agents/
│       ├── README.md
│       ├── ui-agent.md
│       ├── content-agent.md
│       ├── dev-agent.md
│       ├── blog-agent.md
│       └── deploy-agent.md
│
├── public/
│   ├── favicon.svg
│   └── favicon.ico
│
├── src/
│   ├── content.config.ts           # Astro v6 content collections config
│   ├── content/
│   │   └── blog/                   # Blog posts as Markdown files
│   │       ├── 01-jetpack-compose-getting-started.md
│   │       ├── 02-clean-architecture-android.md
│   │       ├── 03-kotlin-coroutines-flows.md
│   │       ├── 04-hilt-dependency-injection.md
│   │       ├── 05-room-offline-first.md
│   │       └── 06-fastlane-cicd-android.md
│   ├── layouts/
│   │   └── Layout.astro            # Base HTML layout (imports global.css, meta tags, fonts)
│   ├── pages/
│   │   ├── index.astro             # Main homepage
│   │   └── blog/
│   │       ├── index.astro         # Blog listing page (/blog)
│   │       └── [...slug].astro     # Individual post pages (/blog/post-slug)
│   └── styles/
│       └── global.css              # Tailwind CSS v4 entry: @import "tailwindcss"
│
├── astro.config.mjs            # Astro config — Tailwind via Vite plugin
├── package.json
├── tsconfig.json
├── README.md
└── .gitignore
```

---

## Astro Configuration

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  }
});
```

> **Note:** Tailwind v4 uses a Vite plugin approach, NOT a `tailwind.config.js` file.
> Custom theme values are set via CSS custom properties in `global.css`.

---

## Design System

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `background` | `#0d1117` | Page background (GitHub dark style) |
| `card` | `#161b22` | Card / section backgrounds |
| `card-hover` | `#1a2234` | Card hover state |
| `border` | `#21262d` | Section dividers |
| `border-card` | `#30363d` | Card borders |
| `accent-cyan` | `#22d3ee` | Primary accent (Tailwind `cyan-400`) |
| `text-primary` | `#e6edf3` | Main text |
| `text-secondary` | `#8b949e` | Subtext / descriptions |
| `text-muted` | `#6e7681` | Muted text (dates, locations) |

### Typography

- **Font Family:** Inter (Google Fonts) — weights 300, 400, 500, 600, 700, 800
- **Base size:** 16px
- **Headings:** Bold weight, white color
- **Accent words in headings:** `text-cyan-400` (#22d3ee)

### Border Radius

| Element | Radius |
|---------|--------|
| Cards | `rounded-xl` (12px) |
| Tags/Badges | `rounded-full` or `rounded-md` |
| Buttons | `rounded-xl` (12px) |
| Avatar box | `rounded-3xl` (24px) |

### Spacing

- Max content width: `max-w-5xl` (1024px)
- Horizontal padding: `px-6` (24px)
- Section vertical padding: `py-10` (40px)
- Card padding: `p-5` or `p-6`

---

## Layout Pattern

### Layout.astro (Base Layout)
```
Layout.astro
  ├── Imports global.css (Tailwind entry)
  ├── Sets <html lang="en">
  ├── Meta tags (charset, viewport, description, title)
  ├── Google Fonts (Inter)
  ├── Body: background #0d1117, text #e6edf3, font Inter
  └── <slot /> — injects page content
```

### index.astro Structure
```
index.astro
  ├── Frontmatter (data: workExperience[], skills[], projects[])
  ├── <Layout>
  │   ├── <nav> — Sticky navbar with logo + links
  │   ├── <main>
  │   │   ├── Hero Section (grid: text + SVG avatar)
  │   │   ├── Skills Section (flex-wrap tags)
  │   │   ├── Work Experience (timeline with cards)
  │   │   ├── Recent Projects (card list)
  │   │   ├── Recent Posts (empty state)
  │   │   └── Let's Connect (CTA gradient card)
  │   └── <footer>
```

---

## Data Architecture

All data is defined as typed arrays in the **frontmatter** of `index.astro`:

```typescript
// Work Experience item shape
{
  company: string,
  role: string,
  period: string,
  duration: string,
  location: string,
  type: string,
  highlights: string[],
  tags: string[],
  logo: string   // emoji
}

// Skill item shape
{
  name: string,
  color: string  // Tailwind classes for bg/text/border
}

// Project item shape
{
  name: string,
  emoji: string,
  description: string,
  tags: { name: string, color: string }[]
}
```

> **Future improvement:** Move data to separate `.ts` files in `src/data/` for better maintainability.

---

## Navbar

- Sticky (`sticky top-0 z-50`)
- Glassmorphism: `backdrop-filter: blur(12px)` + semi-transparent background
- Links: Blog (Medium), GitHub, LinkedIn

---

## Responsive Design

- Mobile-first approach
- Key breakpoints: `sm` (640px), `md` (768px)
- Hero: stacks vertically on mobile, side-by-side on `md+`
- Experience cards: full-width on all sizes
- Navbar links: always visible (no hamburger menu yet)

---

## Blog System

### Astro v6 Content Collections

Blog posts are managed using Astro's content collection system:

**`src/content.config.ts`:**
```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    author: z.string().default('Christian Torrico'),
    image: z.string(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
```

### Blog Post Frontmatter

Each `.md` file in `src/content/blog/` starts with YAML frontmatter:

```yaml
---
title: "Getting Started with Jetpack Compose"
description: "A practical guide to building your first Android UI..."
date: 2026-06-01
author: "Christian Torrico"
image: "https://images.unsplash.com/photo-1555066931..."
tags: ["Kotlin", "Jetpack Compose", "Android", "UI"]
---
```

### Routes

| Route | Page | Description |
|-------|------|-------------|
| `/blog` | `src/pages/blog/index.astro` | Blog listing (3-column grid of all posts) |
| `/blog/01-jetpack-compose-getting-started` | `src/pages/blog/[...slug].astro` | Individual post page |

### Published Posts

1. **Getting Started with Jetpack Compose** (Jun 1, 2026)
2. **Clean Architecture in Android: A Practical Guide** (May 20, 2026)
3. **Kotlin Coroutines & Flow: Mastering Async Android** (May 10, 2026)
4. **Dependency Injection in Android with Hilt** (Apr 28, 2026)
5. **Building Offline-First Android Apps with Room** (Apr 15, 2026)
6. **Automating Android Releases with Fastlane** (Apr 1, 2026)

All posts feature:
- Full-length technical articles (10-15 paragraphs)
- Code examples with syntax highlighting
- Unsplash cover images
- Relevant Android/Kotlin tags

---

## SEO

- `<title>`: "Christian Torrico | Senior Mobile Engineer"
- `<meta name="description">`: Full professional summary
- Favicon: `/favicon.svg` and `/favicon.ico`
- `lang="en"` on html tag
