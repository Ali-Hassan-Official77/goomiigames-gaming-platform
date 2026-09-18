# GoomiiGames

A polished game-discovery frontend built with Next.js App Router, Tailwind CSS and Framer Motion, powered by the RAWG Video Games Database API.

## Setup

```bash
npm install
npm run dev
```

Create `.env.local` and add your RAWG key:

```env
RAWG_API_KEY=your_rawg_api_key
```

The API key stays server-side. The existing API surface is preserved:

- `GET /api/games`
- `GET /api/games/:id`
- `GET /api/genres`

## Build check

```bash
npm run build
npm run start
```

## Deploy

Add `RAWG_API_KEY` to your hosting provider's environment variables before deploying.

Game data and images are provided by RAWG.io.
