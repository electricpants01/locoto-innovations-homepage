# 🤖 AI Agent Roles Overview

Pre-defined agent roles for this project. Each agent has a specific focus, knowledge base, and responsibilities. Pick the right agent at the start of each task.

---

## Available Agents

| Agent | File | Focus | When to use |
|-------|------|-------|-------------|
| 🧑‍🎨 **UI Agent** | `ui-agent.md` | Design & Styling | Changing colors, layout, adding sections, responsive fixes |
| ✍️ **Content Agent** | `content-agent.md` | Profile & Copy | Updating bio, experience, projects, adding blog posts |
| 🔧 **Dev Agent** | `dev-agent.md` | Features & Architecture | New pages, components, integrations, data refactoring |
| 📝 **Blog Agent** | `blog-agent.md` | Medium & Blog | Adding posts, RSS integration, newsletter setup |
| 🚀 **Deploy Agent** | `deploy-agent.md` | Hosting & CI/CD | Deploying to Vercel/Netlify, custom domain, GitHub Actions |

---

## Session Checklist

At the start of every new AI session:

- [ ] Read `AI/README.md` for project summary
- [ ] Read `AI/profile.md` for Christian's background
- [ ] Read `AI/context.md` for current state and TODOs
- [ ] Read `AI/architecture.md` if doing technical work
- [ ] Open the relevant agent file for the current task
- [ ] Check `src/pages/index.astro` for current homepage state

---

## Multi-Agent Tasks

Some tasks require multiple agents working together:

| Task | Agents Involved |
|------|----------------|
| Add a new blog post | Content Agent + Blog Agent |
| Deploy the site | Dev Agent + Deploy Agent |
| Redesign a section | UI Agent + Content Agent |
| Add a new page | Dev Agent + UI Agent + Content Agent |
