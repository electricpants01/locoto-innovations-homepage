# 📝 Blog Agent — Adding & Managing Posts

**Use this agent when:** adding new blog posts, editing existing articles, or updating blog-related content.

---

## Current Blog Status

| Field | Value |
|-------|-------|
| **System** | Astro v6 Content Collections |
| **Posts Published** | **6** Android engineering articles |
| **Location** | `src/content/blog/*.md` |
| **Routes** | `/blog` (listing), `/blog/[id]` (individual posts) |

---

## How to Add a New Post

### 1. Create the Markdown File

Create a new file in `src/content/blog/` following the naming pattern `##-slug-title.md`:

```bash
src/content/blog/07-new-post-title.md
```

### 2. Add Frontmatter

Every post requires YAML frontmatter at the top:

```yaml
---
title: "Your Article Title"
description: "A short description (used in cards and SEO meta tags)"
date: 2026-07-15
author: "Christian Torrico"
image: "https://images.unsplash.com/photo-XXXXX?auto=format&fit=crop&w=800&q=80"
tags: ["Kotlin", "Android", "Your", "Tags"]
---
```

**Image sources:**
- Unsplash: `https://images.unsplash.com/photo-{id}?auto=format&fit=crop&w=800&q=80`
- Store locally: Save to `/public/images/blog/` and use `/images/blog/your-image.jpg`

### 3. Write the Article

Write your content in Markdown below the frontmatter:

```markdown
---
title: "..."
---

Intro paragraph goes here.

## Main Heading

Content with **bold**, *italic*, and `inline code`.

```kotlin
// Code blocks are automatically syntax-highlighted
fun helloWorld() {
    println("Hello, World!")
}
\```

- Bullet list
- Another item

> Blockquote for callouts
```

### 4. Build & Preview

The post will automatically:
- Appear in `/blog` listing (sorted by date, newest first)
- Be accessible at `/blog/07-new-post-title`
- Show up in "Recent Posts" on homepage (if it's one of the 3 latest)

```bash
npm run dev
# Visit http://localhost:4321/blog
```

---

## Editing Existing Posts

Simply edit the `.md` file in `src/content/blog/`. Changes are hot-reloaded in dev mode.

**Common edits:**
- Update `title` or `description` in frontmatter
- Fix typos in content
- Add/remove tags
- Change cover image

---

## Current Published Posts

### 1. Getting Started with Jetpack Compose
- **File:** `01-jetpack-compose-getting-started.md`
- **Date:** Jun 1, 2026
- **Tags:** Kotlin, Jetpack Compose, Android, UI

### 2. Clean Architecture in Android: A Practical Guide
- **File:** `02-clean-architecture-android.md`
- **Date:** May 20, 2026
- **Tags:** Android, Architecture, Clean Architecture, MVVM

### 3. Kotlin Coroutines & Flow: Mastering Async Android
- **File:** `03-kotlin-coroutines-flows.md`
- **Date:** May 10, 2026
- **Tags:** Kotlin, Coroutines, Flow, Async, Android

### 4. Dependency Injection in Android with Hilt
- **File:** `04-hilt-dependency-injection.md`
- **Date:** Apr 28, 2026
- **Tags:** Android, Hilt, Dependency Injection, Kotlin

### 5. Building Offline-First Android Apps with Room
- **File:** `05-room-offline-first.md`
- **Date:** Apr 15, 2026
- **Tags:** Android, Room, Offline, Architecture, Kotlin

### 6. Automating Android Releases with Fastlane
- **File:** `06-fastlane-cicd-android.md`
- **Date:** Apr 1, 2026
- **Tags:** Android, Fastlane, CI/CD, DevOps, Automation

---

## Markdown Features Supported

| Syntax | Rendered |
|--------|----------|
| `**bold**` | **bold** |
| `*italic*` | *italic* |
| `` `code` `` | `code` (with cyan color) |
| `## Heading` | Styled heading with bottom border |
| `> Quote` | Left-bordered blockquote |
| `[Link](url)` | Cyan-colored link |
| ` ```kotlin ` | Syntax-highlighted code block |
| `| Table |` | Styled data table |

---

## Styling (Prose Styles)

All blog post content is wrapped in a `.prose-content` div with custom styles defined in `src/pages/blog/[...slug].astro`:

- **Headings:** White text, bottom border
- **Paragraphs:** Readable line-height (1.85), comfortable spacing
- **Code blocks:** Dark background (`#161b22`), border, rounded corners
- **Inline code:** Cyan text on dark gray background
- **Links:** Cyan with underline on hover
- **Tables:** Bordered, hover effects

No need to add classes to markdown — it's all handled automatically.

---

## Best Practices

1. **Use descriptive filenames:** `##-topic-keyword.md` for SEO
2. **Write clear descriptions:** Used in card previews and meta tags
3. **Choose relevant tags:** 3-5 tags per post
4. **Optimize images:** Use `?auto=format&fit=crop&w=800&q=80` for Unsplash
5. **Code examples:** Always include real, working code snippets
6. **Structure:** Use H2 (`##`) for main sections, H3 (`###`) for subsections
7. **Length:** Aim for 10-15 paragraphs for in-depth technical articles

---

## Collection Schema (Reference)

Defined in `src/content.config.ts`:

```typescript
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
```

All fields except `tags` are **required**.
