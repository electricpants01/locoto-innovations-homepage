# 🚀 Deploy Agent — Hosting & CI/CD

**Use this agent when:** deploying the website, setting up CI/CD, configuring a custom domain, or automating releases.

---

## Recommended: Deploy to Vercel

Vercel has first-class Astro support and the free tier is more than enough for a portfolio.

### Step 1: Install Vercel Adapter

```bash
npx astro add vercel
```

This updates `astro.config.mjs`:
```js
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/static';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()]
  }
});
```

### Step 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy (follow the prompts)
vercel

# Production deploy
vercel --prod
```

### Step 3: Auto-Deploy via GitHub

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → "Add New Project"
3. Import the GitHub repository
4. Vercel auto-detects Astro — click Deploy
5. Every `git push` to `main` triggers a new deploy automatically

---

## Alternative: Deploy to Netlify

```bash
# Install Netlify adapter
npx astro add netlify

# Build
npm run build

# Deploy via Netlify CLI
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

Or drag-and-drop the `dist/` folder at [app.netlify.com](https://app.netlify.com).

---

## Alternative: GitHub Pages (Free)

Add to `astro.config.mjs`:
```js
export default defineConfig({
  site: 'https://USERNAME.github.io',
  base: '/REPO_NAME',  // only if not using custom domain
  // ...
});
```

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          
      - run: npm install
      - run: npm run build
      
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## Custom Domain Setup

### On Vercel:
1. Go to Project Settings → Domains
2. Add your domain (e.g., `christiantorrico.dev`)
3. Add DNS records at your domain registrar:
   - **A Record:** `76.76.21.21`
   - **CNAME:** `cname.vercel-dns.com`

### On Netlify:
1. Site Settings → Domain Management → Add Domain
2. Update DNS at registrar

### Recommended Domain Names
- `christiantorrico.dev`
- `ctorrico.dev`
- `torrico.dev`
- `christiandev.app`

---

## Environment Variables

If using API keys (e.g., rss2json.com paid tier, Formspree), add them:

```bash
# .env (local — gitignored)
RSS_API_KEY=your_key_here
FORMSPREE_ID=your_id_here
```

In Astro, access with:
```typescript
const apiKey = import.meta.env.RSS_API_KEY;
```

Set in Vercel Dashboard: Settings → Environment Variables

---

## Pre-Deploy Checklist

- [ ] Update GitHub URL (3 places in `src/pages/index.astro`)
- [ ] Run `npm run build` locally — ensure no errors
- [ ] Run `npm run preview` — check the production build
- [ ] Update `README.md` Live Site URL once deployed
- [ ] Add `og-image.png` (1200×630) to `public/` for social sharing
- [ ] Set `site` URL in `astro.config.mjs` for proper sitemap/canonical URLs
- [ ] Test on mobile (Chrome DevTools or real device)

---

## Build Output

```bash
npm run build
# Output: ./dist/
# Size: ~small (pure static HTML/CSS)
# Deploy: Upload dist/ to any static host
```

---

## Blog Subdomain Setup (S3 Redirect)

`blog.locotoinnovations.com` redirects to `https://locotoinnovations.com/blog/` via an S3 static website redirect bucket.

### Architecture

```
blog.locotoinnovations.com
  → Route 53 CNAME → blog.locotoinnovations.com.s3-website-us-east-1.amazonaws.com
  → S3 Bucket (empty, routing rules only)
  → HTTP 301 → https://locotoinnovations.com/blog/
```

### S3 Bucket

- **Bucket name:** `blog.locotoinnovations.com`
- **Region:** us-east-1
- **AWS Console:** https://us-east-1.console.aws.amazon.com/s3/buckets/blog.locotoinnovations.com?region=us-east-1&tab=properties

### S3 Website Configuration

```json
{
  "IndexDocument": { "Suffix": "index.html" },
  "RoutingRules": [
    {
      "Condition": { "KeyPrefixEquals": "" },
      "Redirect": {
        "HostName": "locotoinnovations.com",
        "Protocol": "https",
        "ReplaceKeyPrefixWith": "blog/"
      }
    }
  ]
}
```

### Route 53 Record

- **Name:** `blog.locotoinnovations.com`
- **Type:** CNAME
- **Value:** `blog.locotoinnovations.com.s3-website-us-east-1.amazonaws.com`
- **TTL:** 300

### How it works

`ReplaceKeyPrefixWith` does find & replace on the URL path:
- `blog.locotoinnovations.com/` → `https://locotoinnovations.com/blog/`
- `blog.locotoinnovations.com/some-post` → `https://locotoinnovations.com/blog/some-post`

### Why S3 instead of GitHub Pages?

GitHub Pages only allows **1 custom domain per repository**. Since `locotoinnovations.com` is already configured, we can't add `blog.locotoinnovations.com` to the same repo. S3 redirect is the standard AWS solution for subdomain redirects.
