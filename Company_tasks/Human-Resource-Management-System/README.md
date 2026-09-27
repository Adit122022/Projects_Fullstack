# Human Resource Management System

HRMS is a full-stack workforce management application with role-specific experiences for administrators, HR staff, and employees. Its feature areas include employee records, attendance, leave requests and approvals, and profile image uploads.

## How it is built

The React client is a Vite single-page app. React Router composes protected and role-specific pages; Zustand stores authentication state; Axios connects to the API. Dashboard and page components divide the employee, HR, and admin workflows. The Express server exposes feature routes that call controllers and Mongoose models. JWT middleware checks protected requests, bcryptjs hashes passwords, and Cloudinary stores uploaded profile images through Multer middleware.

## Stack and tools

- React 19, JavaScript, Vite 6, React Router 7
- Tailwind CSS 4, Zustand, Axios, React Hot Toast
- Node.js, Express 5, MongoDB/Mongoose
- JWT, bcryptjs, Multer, Cloudinary
- dotenv, npm, ESLint

## Run locally

Prerequisites: Node.js/npm, MongoDB, and Cloudinary credentials for image upload.

Install dependencies from each app directory:

```bash
cd server
npm install
cd ../client
npm install
```

Create `server/.env`:

```env
PORT=5000
MONGO_URL=mongodb://localhost:27017/hrms
JWT_SECRET=replace_with_a_long_random_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

The server configuration reads `MONGO_URL` (some legacy documentation refers to `MONGO_URI`; use the variable used in `server/src/config/config.js`). Start the server:

```bash
npm start
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000
```

Run the client in a separate terminal:

```bash
npm run dev
```

## Source map

- `client/src/Dashboard` and `client/src/Pages` — role dashboards and workflows
- `client/src/store` — authentication state
- `client/src/Routes` — client-side route composition
- `server/src/routes` and `controllers` — API operations
- `server/src/models` — user, employee, attendance, and leave records
- `server/src/services` — Cloudinary integration

## Notes

The server's config uses `MONGO_URL`, while older project notes mention `MONGO_URI`; keep the local environment aligned with the code. Authentication, role checks, and upload limits should be reviewed before production use. The server currently has no defined development or test script.
