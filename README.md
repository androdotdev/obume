# Obume - Video Editor Portfolio

A freelancer portfolio website for "Obume" - a video editor.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Package Manager**: pnpm
- **Database**: PostgreSQL (Neon) with Drizzle ORM
- **Storage**: Cloudinary for video hosting
- **Styling**: Tailwind CSS

## Features

- **Home**: 3D tilt card with links to Works and Services
- **Works**: Video gallery with category filtering (fetched from Cloudinary via PostgreSQL)
- **Services**: Static service offerings page
- **Terms**: Static terms of service page
- **Admin**: Protected dashboard for uploading/managing works

## Getting Started

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env

# Push schema to database
pnpm db:push

# Seed admin user
pnpm db:seed

# Start development server
pnpm dev
```

## Database Commands

| Command | Description |
|---------|-------------|
| `pnpm db:push` | Push schema to database |
| `pnpm db:seed` | Create admin user |
| `pnpm db:studio` | Open Drizzle Studio |

## Environment Variables

```
DATABASE_URL=          # PostgreSQL connection string (Neon)
CLOUDINARY_CLOUD_NAME= # Cloudinary cloud name
CLOUDINARY_API_KEY=    # Cloudinary API key
CLOUDINARY_API_SECRET= # Cloudinary API secret
JWT_SECRET=            # Secret for JWT tokens
```

## Project Structure

```
app/
├── layout.tsx         # Root layout
├── page.tsx          # Home (Card component)
├── actions/          # Server actions (auth, works, upload)
├── works/           # Works gallery
│   └── components/  # Route-specific components
├── services/        # Services page (static)
├── terms/           # Terms page (static)
├── admin/           # Admin dashboard (protected)
│   ├── works/       # Manage works
│   └── page.tsx     # Dashboard
└── login/           # Login page

components/          # Global shared components
├── ui/              # Reusable UI (Accordion, VideoModal)
├── Header.tsx       # Page header
├── Footer.tsx       # Shared footer
├── Card.tsx         # Home profile card (3D tilt)
└── LinkButton.tsx   # Card link buttons (with prefetch)

db/
└── schema.ts       # Drizzle schema

lib/
└── db.ts           # Drizzle client
```
