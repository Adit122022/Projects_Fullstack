# Omide

Omide (a name associated with recollection) is a personal content library for saving links and other digital content, organizing them by type or tags, and sharing a collection.

## How it is built

The client is a TypeScript React single-page application built with Vite. Clerk provides the client authentication UI and session integration. Protected routes and an auth context coordinate the signed-in experience; the dashboard, sidebar, content card, and create-content modal make up the main workflow. The TypeScript Express API is separated into route, controller, model, middleware, and helper modules. Mongoose models represent users, tags, links, and content; content and share routes expose the library operations.

## Stack and tools

- React 19, TypeScript, Vite 7, React Router 7
- Clerk React and Clerk Express for authentication
- Tailwind CSS 4, Framer Motion, Lucide React
- Axios for API calls
- Node.js, Express 5, MongoDB/Mongoose
- TypeScript, npm, ESLint

## Run locally

Prerequisites: Node.js/npm, MongoDB, and a Clerk application with frontend and backend keys.

```bash
cd server
npm install
cd ../client
npm install
```

The server reads `PORT` and Clerk keys in `server/src/config/_config.ts`. The client reads `VITE_CLERK_PUBLISHABLE_KEY` in `client/src/App.tsx`. The current database connector uses a hard-coded local URI (`mongodb://localhost:27017/Brainly`); configure the connector for your MongoDB deployment before relying on it elsewhere.

Create `server/.env`:

```env
PORT=8080
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

Create `client/.env`:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

Start the API from `server/`:

```bash
npm run dev
```

This script builds TypeScript and starts `dist/index.js`. In another terminal, start the client from `client/`:

```bash
npm run dev
```

The client uses Vite's default URL (`http://localhost:5173`); the server CORS origin is currently fixed to that URL. The server script assumes generated JavaScript output is available as `dist/index.js`.

## Source map

- `client/src/pages` — sign-in, sign-up, and dashboard
- `client/src/components` and `context` — library UI and auth state
- `server/src/routes` and `controllers` — HTTP endpoints and request logic
- `server/src/model` — Mongoose data models
- `server/src/middleware` — route authentication

## Notes

The current server connector and older READMEs disagree about database configuration and authentication approach. This guide documents the active entry point: Clerk middleware is installed and the database URI is hard-coded in `src/db/db.ts`. Review those values before deployment. No automated tests are configured.
