# 📱 Christian Torrico — Personal Portfolio & Blog

> Personal portfolio website and blog for **Christian Torrico**, Senior Mobile Engineer with 5+ years of experience building Android and cross-platform mobile applications.

[![Built with Astro](https://img.shields.io/badge/Built%20with-Astro%20v6-ff5d01?style=flat-square&logo=astro)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS%20v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)

---

## 🌐 Live Links

| | |
|--|--|
| **LinkedIn** | https://www.linkedin.com/in/christian-torrico/ |
| **Medium Blog** | https://medium.com/@electricomposer |
| **Live Site** | *(Coming soon — deploy to Vercel/Netlify)* |

---

## ✨ Features

- 🌑 **Dark theme** — GitHub-inspired dark navy palette (`#0d1117`) with cyan accent
- 👋 **Hero section** — Introduction with a custom Android robot SVG avatar
- 🛠️ **Skills** — 18 colorful tech badge pills (Kotlin, Jetpack Compose, Firebase, and more)
- 💼 **Work Experience** — Full timeline of 7 professional roles with highlights and tech tags
- 🚀 **Projects** — Showcase of key mobile projects
- ✍️ **Blog** — Integrated with Medium (empty state while articles are being written)
- 📬 **Contact / CTA** — "Let's Connect" section linked to LinkedIn
- 📱 **Responsive** — Mobile-first layout that looks great on all screen sizes
- ⚡ **Fast** — Static site generation via Astro (zero JS by default)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Astro](https://astro.build) v6.4.6 |
| CSS | [Tailwind CSS](https://tailwindcss.com) v4 (via Vite plugin) |
| Language | TypeScript |
| Font | Inter (Google Fonts) |
| Avatar | Custom SVG — Android robot with Kotlin badge |

---

## 📁 Project Structure

```
/
├── AI/                         # AI context folder (persistent memory for AI sessions)
│   ├── README.md               # How to use the AI folder
│   ├── profile.md              # Christian's full profile & work experience
│   ├── architecture.md         # Tech stack, design system, file structure docs
│   ├── context.md              # Current project state & TODO list
│   ├── skills/                 # Skill breakdowns by category
│   │   ├── mobile.md           # Kotlin, Android, React Native, Swift
│   │   ├── architecture.md     # MVVM, Clean Architecture, Coroutines, Flow
│   │   └── tools.md            # Firebase, Room, Retrofit, Fastlane, Git
│   └── agents/                 # Pre-defined AI agent roles
│       ├── ui-agent.md         # Design & Styling agent
│       ├── content-agent.md    # Profile & Copy agent
│       ├── dev-agent.md        # Features & Architecture agent
│       ├── blog-agent.md       # Medium integration agent
│       └── deploy-agent.md     # Hosting & CI/CD agent
│
├── public/
│   ├── favicon.svg
│   └── favicon.ico
│
├── src/
│   ├── layouts/
│   │   └── Layout.astro        # Base HTML layout with meta tags & fonts
│   ├── pages/
│   │   └── index.astro         # Main homepage (hero, skills, experience, projects, blog)
│   └── styles/
│       └── global.css          # Tailwind CSS v4 entry point
│
├── astro.config.mjs            # Astro + Tailwind Vite plugin config
├── package.json
├── tsconfig.json
└── README.md                   # ← You are here
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js `>=22.12.0`
- npm

### Installation & Development

```bash
# 1. Clone the repository
git clone https://github.com/electricpairs01/HomePage-Locoto-Innovations.git
cd HomePage-Locoto-Innovations

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open your browser at **http://localhost:4321** 🎉

---

## 🧞 Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run astro ...` | Run Astro CLI commands |
| `npm run astro -- --help` | Get help with Astro CLI |

---

## 🤖 AI Context (`AI/` folder)

This project includes an `AI/` folder with **persistent memory files** for AI assistants.

At the start of any new AI session, read these files to instantly get full context:

1. **`AI/profile.md`** — Christian's background, all work experiences, and skills
2. **`AI/architecture.md`** — Tech stack, design tokens, file structure
3. **`AI/context.md`** — What's done, what's pending, design decisions
4. **`AI/skills/`** — Deep-dive skill docs: `mobile.md`, `architecture.md`, `tools.md`
5. **`AI/agents/`** — Pre-defined roles: `ui-agent.md`, `content-agent.md`, `dev-agent.md`, `blog-agent.md`, `deploy-agent.md`
---

## 📌 Roadmap / TODO

- [x] ~~Add real GitHub profile URL~~ — set to `https://github.com/electricpairs01`
- [x] ~~Build blog system~~ — 6 Android engineering articles published
- [ ] Add real project links with GitHub repos
- [ ] Add Open Graph meta tags for social sharing previews
- [ ] Deploy to Vercel or Netlify
- [ ] Add mobile hamburger menu
- [ ] Replace SVG avatar with real profile photo (optional)
- [ ] Create `/blog` page for full article listings

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#0d1117` | Page background |
| Card | `#161b22` | Card backgrounds |
| Border | `#30363d` | Card borders |
| Accent | `#22d3ee` | Cyan highlights |
| Text | `#e6edf3` | Primary text |
| Subtext | `#8b949e` | Secondary text |
| Font | Inter | All text |

---

## 📄 License

Personal portfolio — all rights reserved © Christian Torrico 2026.
