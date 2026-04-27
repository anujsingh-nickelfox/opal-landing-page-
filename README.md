# Opal — Landing Page

A sleek, dark-themed SaaS landing page for **Opal**, a task management platform. Built with Next.js 15 (App Router), React 18, Framer Motion / Motion, and Lucide React icons.

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org/) | 15 | Framework (App Router) |
| [React](https://react.dev/) | 18 | UI library |
| [Motion](https://motion.dev/) | 11 | Animations (replaces Framer Motion) |
| [Lucide React](https://lucide.dev/) | 0.460 | Icons |

---

## Getting Started

### 1. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
opal-landing/
├── app/
│   ├── layout.tsx        # Root layout with metadata
│   └── page.jsx          # Full landing page (all sections)
├── public/               # Static assets (favicon, images, etc.)
├── next.config.js        # Next.js config (image domains)
├── tsconfig.json         # TypeScript config
├── .eslintrc.json        # ESLint config
├── .gitignore
└── package.json
```

---

## Page Sections

| Section | ID | Description |
|---|---|---|
| Navbar | — | Fixed top nav with scroll-aware styling + mobile menu |
| Hero | `#home` | Full-viewport hero with animated dashboard mockup |
| Features | `#features` | Tabbed feature showcase with image panels |
| Pricing | `#pricing` | 3-tier pricing cards (Starter / Pro / Team) |
| Testimonials | `#testimonials` | Staggered carousel of 8 user quotes |
| Footer | `#contact-us` | Newsletter signup, quick links, social links |

---

## Deployment

### Vercel (recommended)

```bash
npx vercel
```

### Static export

```bash
npm run build
npm run start
```

---

## Customization

- **Brand name / logo**: Search `OPAL` in `app/page.jsx`
- **Colors**: CSS variables defined in the `GlobalStyles` component at the top of `page.jsx`
- **Fonts**: Loaded via Google Fonts (`Share Tech` + `Titillium Web`) — swap in the `@import` line
- **Pricing**: Edit the `plans` array in `page.jsx`
- **Testimonials**: Edit the `testimonials` array in `page.jsx`
- **Feature tabs**: Edit the `featureTabs` array in `page.jsx`

---

## Image Domains

External images from `images.unsplash.com` and `i.pravatar.cc` are whitelisted in `next.config.js`. Add any additional domains you need there.

---

## Notes

- The page uses the `"use client"` directive implicitly via React hooks (`useState`, `useEffect`, `useRef`). Add `"use client";` at the top of `app/page.jsx` if you encounter a Next.js server component error.
- `motion/react` is the correct import path for Motion v11+ (formerly `framer-motion`).
