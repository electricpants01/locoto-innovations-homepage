# 🧑‍🎨 UI Agent — Design & Styling

**Use this agent when:** changing visual design, colors, layout, typography, animations, or responsive behavior.

---

## Design System Knowledge

### Color Palette (ALWAYS use these exact values)

```css
background:    #0d1117  /* Page bg */
card:          #161b22  /* Cards */
card-hover:    #1a2234  /* Cards on hover */
border-section: #21262d /* Section dividers */
border-card:   #30363d  /* Card borders */
accent:        #22d3ee  /* cyan-400 — highlights, hover states */
text-primary:  #e6edf3  /* Main text */
text-secondary: #8b949e /* Descriptions */
text-muted:    #6e7681  /* Dates, locations */
```

### Typography
- **Font:** Inter (loaded from Google Fonts in `Layout.astro`)
- **Weights available:** 300, 400, 500, 600, 700, 800
- **Heading accent:** `text-cyan-400` for highlighted words in `h2` titles

### Tailwind v4 Notes
- Uses `@import "tailwindcss"` in CSS, **NOT** `tailwind.config.js`
- Use arbitrary values: `bg-[#0d1117]`, `text-[#8b949e]`
- Opacity utilities: `bg-cyan-500/20` (20% opacity)

---

## Component Patterns

### Standard Card
```html
<div class="rounded-xl p-5 border border-[#30363d] hover:border-cyan-500/40 bg-[#161b22] hover:bg-[#1a2234] transition-all">
  <!-- content -->
</div>
```

### Section Heading
```html
<h2 class="text-2xl font-bold text-white mb-6">
  Normal <span class="text-cyan-400">Accent</span>
</h2>
```

### Tag/Badge Pill
```html
<!-- Colorful (for skills) -->
<span class="px-3 py-1.5 rounded-full text-sm font-medium border bg-purple-500/20 text-purple-300 border-purple-500/30">
  Kotlin
</span>

<!-- Neutral (for tech tags on cards) -->
<span class="px-2 py-0.5 rounded-md text-xs font-medium bg-[#0d1117] text-[#8b949e] border border-[#30363d]">
  Android
</span>
```

### Primary Button
```html
<a class="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition-all hover:scale-105 text-sm">
  Get in Touch
</a>
```

### Secondary Button
```html
<a class="px-6 py-3 rounded-xl border border-[#30363d] hover:border-cyan-500/40 text-white font-medium bg-[#161b22] hover:bg-[#1a2234] transition-all hover:scale-105 text-sm">
  Read my Blog
</a>
```

### Social Icon Button
```html
<a class="w-11 h-11 rounded-xl flex items-center justify-center bg-[#24292e] hover:bg-[#3d444d] transition-all hover:scale-110 border border-[#30363d]">
  <!-- SVG icon -->
</a>
```

---

## Layout Structure

- Max width: `max-w-5xl mx-auto px-6`
- Sections separated by: `border-t border-[#21262d]`
- Section padding: `py-10`
- Grid layout for hero: `flex flex-col md:flex-row items-center gap-12`

---

## Navbar Pattern

```html
<nav class="sticky top-0 z-50 border-b border-[#21262d]" 
     style="background-color: rgba(13,17,23,0.85); backdrop-filter: blur(12px);">
```

---

## Responsive Breakpoints

| Breakpoint | Width | Key Changes |
|-----------|-------|-------------|
| default | < 640px | Mobile: stacked layout |
| `sm:` | 640px+ | Horizontal card layouts |
| `md:` | 768px+ | Hero side-by-side, show timeline dots |

---

## Files to Edit

| File | Purpose |
|------|---------|
| `src/pages/index.astro` | All section HTML + Tailwind classes |
| `src/layouts/Layout.astro` | Body styles, font, meta |
| `src/styles/global.css` | Global CSS, custom Tailwind theme tokens |
