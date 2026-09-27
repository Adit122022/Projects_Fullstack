# Knowledge App

Knowledge App is a personal knowledge-capture and retrieval application. It can save web content, extract and process article or PDF text, search saved items, show relationships as a graph, and resurface saved material. A small browser extension provides a capture interface.

## How it is built

The app is implemented in `frontend/` as a Next.js App Router application. React components call route handlers in `app/api`; those handlers use Mongoose models and shared database helpers to persist items and collections. Content extraction and AI enrichment live in `app/lib/services`. Redis and BullMQ support asynchronous item processing, with `worker.js` providing a separate worker process. The extension under `browser-extension/` has its own manifest, popup, and content script.

## Stack and tools

- Next.js 16, React 19, TypeScript, Tailwind CSS 4
- MongoDB and Mongoose for saved items and collections
- Redis, ioredis, BullMQ for queued processing
- OpenAI SDK for AI-assisted processing
- Cheerio and pdf-parse for content extraction; D3 and react-force-graph-2d for graph display
- npm, ESLint, TypeScript

## Run locally

Prerequisites: Node.js/npm, MongoDB, a Redis-compatible service, and an OpenAI API key.

```bash
cd frontend
npm install
```

Create `frontend/.env.local`:

```env
MONGODB_URI=mongodb://localhost:27017/knowledge-app
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_UPSTASH_REDIS_URL=rediss://default:token@your-redis-host:port
```

Run the web application:

```bash
npm run dev
```

In a second terminal, start the queue worker from `frontend/`:

```bash
node worker.js
```

The worker reads the MongoDB, Redis, and OpenAI settings from its process environment. Use the same local environment file values in that shell. The package also defines `dev:worker` and a `dev` command that runs Next.js and the worker concurrently; `dev:backend` refers to a sibling backend directory, but the main application routes and database code are in `frontend/app`.

## Source map

- `frontend/app/page.tsx` and `app/components` — primary interface
- `frontend/app/api` — item, search, graph, collection, and resurface endpoints
- `frontend/app/lib/models` and `app/lib/db.ts` — persistence layer
- `frontend/app/lib/services` — AI and content extraction
- `frontend/app/lib/queue` and `frontend/worker.js` — queued processing
- `frontend/browser-extension` — browser capture extension

## Browser extension

Load the `frontend/browser-extension` folder as an unpacked extension in a Chromium browser's extensions page. The extension is source-only in this repo; verify its configured application URL and permissions for your local environment.

## Notes

The database helper falls back to a local MongoDB URI. Redis and AI processing still require valid service credentials. Avoid exposing private API keys through variables prefixed `NEXT_PUBLIC_`; the worker currently references that prefix for some provider values, so review and correct this before deploying secrets to a browser-facing build. No automated test script is defined in the package manifest.
