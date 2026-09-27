# Full Stack Projects

This repository is a portfolio of independent web applications, prototypes, and company or assessment projects. Each project has its own dependencies and setup; install and run tools from that project's directory rather than this repository root.

## Projects

| Project | What it does | Main technologies |
|---|---|---|
| [AkiraAI](AkiraAI/README.md) | AI chat application with accounts, conversations, and email support | React, TypeScript, Vite, Redux Toolkit; Express, MongoDB, LangChain, Google/Mistral APIs |
| [Knowledge App](knowledge-app/README.md) | Save, process, search, and resurface personal knowledge, with a browser capture extension | Next.js, React, TypeScript, MongoDB, Redis/BullMQ, OpenAI |
| [NexaCode](NEXACODE-next-gen-coding-experience/README.md) | AI-assisted coding workspace with projects and in-browser Node execution | React, Vite, WebContainers; Express, MongoDB, Socket.IO, Gemini, Redis |
| [Omide](Omide/README.md) | Personal content library with tagging and shareable collections | React, TypeScript, Vite, Clerk; Express, MongoDB |
| [nComputing](Company_tasks/nComputing/README.md) | Product marketing, lead capture, checkout, and admin dashboard | Next.js, TypeScript, Tailwind; Express, Prisma, PostgreSQL, Razorpay, Resend |
| [1Fi Marketplace](Company_tasks/1Fi-marketplace/README.md) | Product marketplace prototype with variants and EMI plan selection | Next.js, React, TypeScript, Tailwind CSS |
| [Human Resource Management System](Company_tasks/Human-Resource-Management-System/README.md) | Role-based employee, attendance, and leave management | React, Vite, Zustand; Express, MongoDB, Cloudinary |
| [Aptech Product Management Dashboard](Company_tasks/Aptech-Solutions_Product_Management_Dashboard/README.md) | Admin dashboard for product and user management | React, TypeScript, Vite, TanStack Query, Tailwind, shadcn-style UI |

## How to use this repository

1. Open the project's README from the table above.
2. Follow its prerequisites, environment setup, and run commands. Most full-stack applications require separate terminals for the web client and API server.
3. Keep API keys, database URLs, signing secrets, and provider credentials in local environment files. Never commit real credentials.

There is no root-level install, build, or test command because the projects are separate applications with independent package manifests. A few projects are frontend prototypes and do not have a backend in this repository. Read the individual documentation for the implementation details and known setup caveats.

## Documentation approach

The project READMEs describe the architecture visible in the source and package manifests, explain the implementation flow, and document the setup exposed by the code. Where a project has missing configuration or an unfinished integration, the README calls that out rather than assuming a production-ready service.
