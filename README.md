# 8-Bit Premium Portfolio

![Portfolio Preview](./assets/og-image.png)

A responsive, multi-page portfolio site built with HTML, CSS, and vanilla JS, following a premium 8-bit / pixel aesthetic with a refined cream, gold, and espresso color palette.

## Technical Details
- **Architecture**: Static HTML/CSS/JS site.
- **Design System**: 
  - Background: Soft Cream (`#FAF3E6`)
  - Accent: Warm Gold (`#C19A6B`)
  - Text: Deep Espresso (`#2B1F1A`)
- **Typography**: "Press Start 2P" (headings) and "Inter" (body).
- **SEO & Accessibility**: 
  - Canonical tags, Open Graph, Twitter Cards, and JSON-LD Person schema correctly defined in `<head>`.
  - `sitemap.xml` and `robots.txt` added.
  - Semantic HTML elements (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`).
  - High contrast ratio (>= 4.5:1) for body text and buttons.

## Build and Deploy Steps
This is a fully static site and requires no build sequence (no npm/node required for deployment).

**Option 1: Deploy with GitHub Pages (Recommended)**
1. Navigate to your repository settings on GitHub.
2. Go to "Pages" in the left sidebar.
3. Under "Build and deployment", select "Deploy from a branch".
4. Choose the `feature/8bit-portfolio` branch (or `main` after merging) and the `/` (root) folder.
5. Save. Your site will be live at `https://chethan-4255.github.io/Portfolio/`.

**Option 2: Deploy with Vercel**
1. Connect the GitHub repository to your Vercel account.
2. Vercel will automatically detect the static files. Leave Framework Preset out (or "Other").
3. Deploy.

**Local Testing**
To view the site locally with accurate fonts and images:
```bash
# Using Python 3
python -m http.server 8000
# Then visit http://localhost:8000 in your browser
```
Or use the `Live Server` VS Code extension.

## Files Changed/Added
- `index.html` [NEW] - Hero, Skills, Contact, Featured projects.
- `about.html` [NEW] - Detailed education and internship experience.
- `projects.html` [NEW] - Full list of all DApp, AI, and JS projects.
- `styles/8bit.css` [NEW] - Main stylesheet with 8-bit utility classes.
- `scripts/main.js` [NEW] - IntersectionObserver lazy loading.
- `assets/pixel-portrait.png` [NEW] - Generated avatar.
- `assets/og-image.png` [NEW] - Social sharing image.
- `assets/favicon.ico` [NEW] - Pixel art favicon.
- `sitemap.xml` [NEW] - Search engine sitemap.
- `robots.txt` [NEW] - Search crawler rules.

## Follow-up Checklist (before merging)
- [x] Review generated assets (`pixel-portrait.png`, `favicon.ico`, `og-image.png`).
- [ ] Add the actual PDF resume as `RESUME_CHETHAN_VASTHAW.pdf` in the root folder (already present).
- [ ] Test the email `mailto:` fallback.
- [ ] Ensure the mobile menu and responsive layout looks good on devices.
