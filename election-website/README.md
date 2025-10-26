This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Local onboarding / developer setup

Follow these steps to get a working local development environment. The repository already contains a Prisma schema and generator configuration, so you do NOT need to run `prisma init` — doing so may overwrite the existing schema.

Prerequisites
- Node.js (18+ recommended)
- pnpm (or npm/yarn)
- A PostgreSQL database for development (or Docker to run one locally)

Quickstart (if you already have Postgres running locally):

```bash
# 1. Copy the example env and set DATABASE_URL
cp .env.example .env
# Edit .env and set DATABASE_URL to a reachable Postgres, for example:
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/election_db"

# 2. Install dependencies
pnpm install

# 3. Generate the Prisma client (creates `src/generated/prisma`)
pnpm prisma generate

# 4. Apply the schema to your database
# - Recommended for development (creates migration history):
pnpm prisma migrate dev --name init

# 5. Start the dev server
pnpm dev
```

If you don't have Postgres locally, use Docker Compose:

1. Create `.env` from `.env.example` and set `DATABASE_URL` to match the docker service (example below).
2. Start a local Postgres instance:

```bash
docker compose up -d
# Default example DATABASE_URL for the compose file used in this repo:
# postgresql://postgres:postgres@localhost:5432/election_db
```



## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
