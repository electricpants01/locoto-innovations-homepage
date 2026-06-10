# 🔧 Dev Agent — Features & Architecture

**Use this agent when:** adding new pages, creating components, integrating APIs, refactoring data, or improving performance.

---

## Tech Stack Quick Reference

| Item | Detail |
|------|--------|
| Framework | Astro v6.4.6 |
| CSS | Tailwind CSS v4 (Vite plugin, no config file) |
| Language | TypeScript |
| Dev server | `npm run dev` → `localhost:4321` |
| Build output | `./dist/` via `npm run build` |
| Node.js | ≥22.12.0 |

---

## Astro Key Concepts

```astro
---
// This is the frontmatter — TypeScript runs at BUILD TIME on the server
// No client-side JS here
import Layout from '../layouts/Layout.astro';
const data = await fetch('...').then(r => r.json()); // Works! Runs at build time
---

<!-- HTML template below -->
<Layout title="Page Title">
  <h1>{data.name}</h1>
</Layout>
```

**Zero JS by default** — Astro ships no JavaScript unless you add `client:*` directives.

---

## How to Add a New Page

Create a new `.astro` file in `src/pages/`:

```
src/pages/blog.astro      → accessible at /blog
src/pages/projects.astro  → accessible at /projects
```

Template for a new page:
```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="Page Title | Christian Torrico">
  <main class="max-w-5xl mx-auto px-6 py-16">
    <h1 class="text-4xl font-bold text-white mb-8">
      Page <span class="text-cyan-400">Title</span>
    </h1>
    <!-- content -->
  </main>
</Layout>
```

---

## How to Create a Reusable Component

Create a `.astro` file in `src/components/`:

```astro
---
// src/components/ExperienceCard.astro
interface Props {
  company: string;
  role: string;
  period: string;
  highlights: string[];
  tags: string[];
}

const { company, role, period, highlights, tags } = Astro.props;
---

<div class="rounded-xl p-5 border border-[#30363d] bg-[#161b22]">
  <h3 class="text-white font-bold">{role}</h3>
  <p class="text-cyan-400">{company}</p>
  <!-- etc -->
</div>
```

Import and use:
```astro
---
import ExperienceCard from '../components/ExperienceCard.astro';
---
<ExperienceCard company="BairesDev" role="Senior Mobile Engineer" .../>
```

---

## How to Extract Data to Separate Files

Move data arrays from `index.astro` frontmatter to `src/data/`:

```typescript
// src/data/experience.ts
export const workExperience = [
  {
    company: "BairesDev",
    // ...
  }
];
```

Import in page:
```astro
---
import { workExperience } from '../data/experience';
---
```

---

## How to Add a Contact Form

Use [Formspree](https://formspree.io) (no backend needed):

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <input type="email" name="email" placeholder="your@email.com"
         class="w-full px-4 py-3 rounded-xl bg-[#161b22] border border-[#30363d] text-white" />
  <textarea name="message" rows="4"
            class="w-full px-4 py-3 rounded-xl bg-[#161b22] border border-[#30363d] text-white"></textarea>
  <button type="submit"
          class="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold">
    Send Message
  </button>
</form>
```

---

## How to Add Open Graph Meta Tags

In `src/layouts/Layout.astro`, add inside `<head>`:

```html
<!-- Open Graph -->
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://your-domain.com" />
<meta property="og:image" content="https://your-domain.com/og-image.png" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content="https://your-domain.com/og-image.png" />
```

Create `public/og-image.png` (1200×630px recommended).

---

## Future Architecture (Recommended Refactor)

```
src/
├── components/
│   ├── Navbar.astro
│   ├── Hero.astro
│   ├── SkillBadge.astro
│   ├── ExperienceCard.astro
│   ├── ProjectCard.astro
│   └── PostCard.astro
├── data/
│   ├── experience.ts
│   ├── skills.ts
│   └── projects.ts
├── layouts/
│   └── Layout.astro
└── pages/
    ├── index.astro
    └── blog/
        └── index.astro
```

---

## Useful Astro Commands

```bash
npx astro add react        # Add React support
npx astro add vercel       # Add Vercel adapter
npx astro check            # TypeScript type checking
npx astro build            # Production build
```
