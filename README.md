# Motora - AI-Powered Car Marketplace

An agentic AI-driven car marketplace built with Next.js, React, TypeScript, and Tailwind CSS.

**Live Site:** [https://motora-umber.vercel.app](https://motora-umber.vercel.app)

## Tech Stack

- **Framework:** Next.js 16
- **UI Library:** React 19
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui primitives
- **Icons:** Lucide React
- **Language:** TypeScript

## Project Structure

```
app/
├── components/
│   ├── ui/             # shadcn/ui primitives (Button, Card, Input, Badge)
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── FeaturesSection.tsx
│   ├── TrendingCars.tsx
│   ├── StatsSection.tsx
│   ├── AICapabilities.tsx
│   ├── Testimonials.tsx
│   ├── NewsletterSection.tsx
│   └── Footer.tsx
├── lib/
│   └── utils.ts        # cn() utility
├── globals.css
├── layout.tsx
└── page.tsx
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command           | Description          |
| ----------------- | -------------------- |
| `npm run dev`     | Start dev server     |
| `npm run build`   | Production build     |
| `npm run start`   | Start production     |
| `npm run lint`    | Run ESLint           |

## Design

- **Theme:** Dark mode default
- **Background:** Deep Charcoal (`#0B1120`)
- **Accent:** Neon Cyan (`#00D2FF`)
- **Secondary:** Electric Blue (`#0055FF`)
