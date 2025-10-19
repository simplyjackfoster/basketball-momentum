# HoopFlow

HoopFlow is a college basketball momentum intelligence dashboard built with React, TypeScript, and Vite. It visualizes team momentum and individual game flow using live data from [ncaa-api.henrygd.me](https://ncaa-api.henrygd.me/openapi).

## ✨ Features

- **Hot Teams Momentum Dashboard** – ranks Division I programs by momentum score using win streaks and scoring differential.
- **Game Flow Visualizer** – interactive play-by-play line chart highlighting scoring runs and momentum swings.
- **React Query caching** – smooth, resilient data fetching with retries, background refresh, and optimistic UI states.
- **Tailwind + framer-motion** – responsive, animated interface with dark mode support out of the box.

## 🏗️ Tech Stack

- React 18 + TypeScript
- Vite build tooling
- Tailwind CSS & custom shadcn-inspired components
- Recharts for data visualization
- TanStack React Query for API caching
- Axios-powered NCAA API client

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+ (or pnpm/yarn if you prefer, but scripts assume npm)

### Installation

```bash
npm install
```

### Development server

```bash
npm run dev
```

The app runs on [http://localhost:5173](http://localhost:5173) by default.

### Linting

```bash
npm run lint
```

### Production build

```bash
npm run build
```

### Preview built app

```bash
npm run preview
```

## 🔐 Environment variables

No secrets are required. All data is fetched directly from the public NCAA API. If you choose to proxy the API for rate limiting or additional headers, create a `.env` file and configure the endpoint in `src/lib/apiClient.ts`.

## 🧮 Momentum scoring formula

```
momentumScore = (winStreak * 2) + avgPointDifferential
```

- `winStreak` is sourced from the `/standings/basketball-men/d1` endpoint.
- `avgPointDifferential` is calculated from the last five games pulled from recent `/scoreboard` results.

## 🗂️ Project Structure

```
src/
  assets/            Static media (logos, backgrounds)
  components/        Reusable UI primitives and layout
  features/          Hot teams + game flow modules
  hooks/             Shared hooks (query wrappers, formatting)
  lib/               API client, date utilities, helpers
  pages/             Route-level components
  styles/            Tailwind globals and theme tokens
  types/             TypeScript data models
```

## 🧪 Testing Strategy

- Utility logic (momentum calculations, transformers) can be tested with Vitest (not included by default).
- React Query handles request retries and caching; network failures fall back to human-friendly empty/error states.

## 📦 Deployment

- **Frontend:** Deploy to Vercel or Netlify with `npm run build`.
- **Optional Backend:** If you need a proxy or cache layer, deploy a small Express server to Render/Heroku and point `NCAA_API_BASE` to it.

## 📄 License

MIT © 2024 HoopFlow contributors.
