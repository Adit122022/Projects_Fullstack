# NexaCode — Next-generation Coding Experience

NexaCode is an AI-assisted coding workspace prototype. Users can register, create or open projects, talk with an AI coding assistant, and use a browser-based Node.js environment to work with code.

## How it is built

The frontend is a React application built with Vite. Screens and components implement the landing, login/registration, project grid, and project workspace. Axios handles HTTP calls; Socket.IO provides the real-time connection; `@webcontainer/api` powers in-browser Node execution. The Express API exposes user, project, and AI routes. Controllers call service modules, Mongoose models store user/project data, middleware verifies JWTs, Redis is available as a service, and the AI service calls Google's Generative AI SDK.

## Stack and tools

- React 18, JavaScript, Vite 6, React Router 7
- Tailwind CSS 3, Framer Motion, Remix Icon/React Icons
- Axios, Socket.IO client/server, WebContainers
- Node.js, Express 4, MongoDB/Mongoose
- Google Generative AI SDK, Redis/ioredis
- JWT, bcrypt, express-validator
- npm, ESLint

## Run locally

Prerequisites: Node.js/npm, MongoDB, Redis, and a Google AI API key.

Install dependencies separately:

```bash
cd backend
npm install
cd ../frontend
npm install
```

Create `backend/.env` with the variables referenced in backend source:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/nexacode
JWT_SECRET=replace_with_a_long_random_secret
GOOGLE_AI_KEY=your_google_ai_key
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=
```

Run the API from `backend/`:

```bash
node server.js
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
```

Run Vite from `frontend/`:

```bash
npm run dev
```

Use a supported Chromium browser for WebContainers and allow the required cross-origin isolation headers in any deployed hosting setup. Confirm that API and Socket.IO URLs match the server address.

## Source map

- `frontend/src/screens` — main screens
- `frontend/src/components` — landing-page and shared UI
- `frontend/src/config` — API, socket, and WebContainer setup
- `backend/routes`, `controllers`, `services` — API layers
- `backend/models`, `db`, `middleware` — MongoDB and authentication

## Notes

The backend package has no npm scripts; direct `node server.js` is the current launch path. Its runtime imports should be used as the source of truth for environment names (the older README examples used different names). The frontend README is Vite boilerplate; this project-level guide supersedes it. Automated backend tests are not configured.
