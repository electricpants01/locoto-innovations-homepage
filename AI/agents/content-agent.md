# ✍️ Content Agent — Profile & Copy

**Use this agent when:** updating bio text, adding/editing work experience, changing skills, updating projects, or adding blog posts.

---

## Content Rules

- ✅ **Always write in English**
- ✅ Professional but approachable tone
- ✅ Use active voice ("Built", "Developed", "Implemented")
- ✅ Keep bullet points concise (1-2 lines max)
- ✅ Highlight impact where possible

---

## Owner Profile Quick Reference

```
Name:     Christian Torrico
Title:    Senior Mobile Engineer
Location: Santa Cruz, Bolivia
Current:  BairesDev (Mar 2025 – Present, Remote)
Bio:      5+ years mobile dev, Kotlin/Compose specialist
LinkedIn: https://www.linkedin.com/in/christian-torrico/
Medium:   https://medium.com/@electricomposer
GitHub:   https://github.com/electricpairs01
```

---

## Where Data Lives in Code

All content is in the **frontmatter** of `src/pages/index.astro`:

```
const workExperience = [...]   // Lines ~3-75
const skills = [...]           // Lines ~77-100
const projects = [...]         // Lines ~102-135
```

---

## How to Add a New Work Experience Entry

Add to the **beginning** of the `workExperience` array in `src/pages/index.astro`:

```typescript
{
  company: "Company Name",
  role: "Job Title",
  period: "Month Year – Month Year",
  duration: "X years Y months",
  location: "City, Country · Remote/On-site",
  type: "Full-time",
  highlights: [
    "Action verb + what you did + impact/technology.",
    "Another key responsibility or achievement.",
  ],
  tags: ["Kotlin", "Android", "Relevant Tech"],
  logo: "🏢",  // Choose a relevant emoji
},
```

---

## How to Add a New Skill

Add to the `skills` array in `src/pages/index.astro`:

```typescript
{ name: "New Skill", color: "bg-COLOR-500/20 text-COLOR-300 border-COLOR-500/30" },
```

Choose a Tailwind color that isn't already heavily used. Available: `purple`, `orange`, `green`, `blue`, `cyan`, `teal`, `indigo`, `violet`, `red`, `yellow`, `sky`, `pink`, `lime`, `rose`, `emerald`, `gray`.

---

## How to Add a New Project

Add to the `projects` array in `src/pages/index.astro`:

```typescript
{
  name: "Project Name",
  emoji: "🔥",
  description: "A 1-2 sentence description of what the app does, what problem it solves, and key technical highlights.",
  tags: [
    { name: "Kotlin", color: "bg-purple-500/20 text-purple-300" },
    { name: "Firebase", color: "bg-yellow-500/20 text-yellow-300" },
  ],
},
```

---

## How to Update the Bio

The bio text appears in the **Hero Section** of `src/pages/index.astro`. Find this block:

```html
<p class="text-[#8b949e] text-lg leading-relaxed mb-2">
  <span class="text-cyan-400 font-medium">Senior Mobile Engineer</span> with 5+ years...
</p>
<p class="text-[#8b949e] text-lg leading-relaxed mb-6">
  Based in <span class="text-white font-medium">Santa Cruz, Bolivia</span>...
</p>
```

Keep the same Tailwind highlighting pattern: `text-cyan-400` for title, `text-white` for emphasis.

---

## How to Add Blog Posts

When Medium articles are published, replace the empty state in the "Recent Posts" section:

1. Remove the empty state `<div>` (the `rounded-xl border border-dashed...` block)
2. Add a `posts` array to the frontmatter:

```typescript
const posts = [
  {
    title: "Article Title Here",
    date: "Jun 2026",
    excerpt: "Short 1-2 sentence summary of the article.",
    url: "https://medium.com/@electricomposer/article-slug",
    image: "https://miro.medium.com/..." // Medium article cover image URL
  },
];
```

3. Replace the section content with:

```astro
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  {posts.map((post) => (
    <a href={post.url} target="_blank" rel="noopener noreferrer"
       class="rounded-xl overflow-hidden border border-[#30363d] hover:border-cyan-500/40 bg-[#161b22] transition-all group">
      <img src={post.image} alt={post.title} class="w-full h-44 object-cover" />
      <div class="p-5">
        <h3 class="text-white font-bold mb-1 group-hover:text-cyan-400 transition-colors">{post.title}</h3>
        <p class="text-[#6e7681] text-xs mb-2">{post.date}</p>
        <p class="text-[#8b949e] text-sm leading-relaxed">{post.excerpt}</p>
      </div>
    </a>
  ))}
</div>
```

---

## How to Update GitHub Links

GitHub is set to `https://github.com/electricpairs01` in all 3 locations in `src/pages/index.astro`:
1. Navbar GitHub link
2. Hero section GitHub icon button
3. Footer GitHub link
