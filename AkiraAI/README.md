# AkiraAI

AkiraAI is a full-stack AI chat application. The client contains marketing, registration, and login views; the API provides authentication, chat and message persistence, AI provider calls, and email-related flows.

## How it is built

The frontend is a TypeScript React single-page application built with Vite. Routes and feature code are grouped under `client/src/features`, shared state uses Redux Toolkit, and the UI is composed from reusable layout and UI components. The Node.js API is an Express application: route modules lead to controllers, Mongoose models persist users/chats/messages, middleware protects authenticated routes, and services encapsulate AI and mail integrations.

AI service code is configured for Google and Mistral through LangChain packages. Email uses Nodemailer with Google OAuth environment settings. The available source shows provider integrations; successful runtime use depends on valid provider credentials and configuration.

## Stack and tools

- React 19, TypeScript, Vite 7, React Router 7
- Redux Toolkit and React Redux for client state
- Tailwind CSS 4, Lucide React, React Three Fiber/Three.js for interface visuals
- Node.js, Express 5, MongoDB/Mongoose
- JWT and bcryptjs for token-based authentication and password hashing
- LangChain Google and Mistral integrations, Nodemailer
- npm, ESLint, TypeScript

## Run locally

Prerequisites: Node.js and npm, a MongoDB instance, and credentials for the AI/email providers you want to use.

API terminal:

```bash
cd server
npm install
```

Create `server/.env` with the values used by the server:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/AkiraAI_DB
JWT_SECRET=replace_with_a_long_random_secret
FRONTEND_URL=http://localhost:5173
BASE_URL=http://localhost:5000
GOOGLE_API_KEY=your_google_api_key
MISTRAL_API_KEY=your_mistral_api_key
GOOGLE_USER=your_mailbox
GOOGLE_CLIENT_ID=your_oauth_client_id
GOOGLE_CLIENT_SECRET=your_oauth_client_secret
GOOGLE_REFRESH_TOKEN=your_oauth_refresh_token
```

The server package exposes `start` (`node server.js`); it does not currently define a development script. Start it with:

```bash
npm start
```

Client terminal:

```bash
cd client
npm install
npm run dev
```

Vite serves the client at its default development URL, normally `http://localhost:5173`. The server CORS default is set to that origin. Client-side environment configuration is not declared in the package manifest; inspect the API service before adding a `VITE_` URL override.

## Source map

- `client/src/features/auth` — login, registration, auth state, and API calls
- `client/src/features/marketing` — public information pages
- `client/src/app` — route composition, app state, and global styles
- `server/src/routes` and `server/src/controller` — HTTP endpoints and request handling
- `server/src/models` — MongoDB document models
- `server/src/services` — AI and email providers

## Notes

The server package includes a placeholder `test` script that exits with an error; it is not a working test suite. Provider configuration and production security settings should be reviewed before deployment.
