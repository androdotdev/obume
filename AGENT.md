# Obume - Agent Instructions

## Stack
Next.js 16 · Drizzle ORM · PostgreSQL (Neon) · Cloudinary · Tailwind CSS · pnpm

## Quick Start
```bash
pnpm dev        # Start development
pnpm build      # Production build
pnpm db:push    # Push schema to database
pnpm db:seed    # Create admin user
```

## Architecture

### Directory Structure
```
app/                    # Next.js App Router pages
├── actions/           # Server actions (auth, works, upload)
├── admin/             # Protected admin dashboard
├── works/             # Public works gallery
├── services/          # Static services page
├── terms/             # Static terms page
└── login/             # Authentication

components/            # Global shared components
├── ui/               # Reusable UI (Accordion, VideoModal)
├── Header.tsx        # Page header with back button
├── Footer.tsx        # Shared footer
├── Card.tsx          # Home profile card (3D tilt)
└── LinkButton.tsx    # Card link buttons

db/                   # Database
├── schema.ts         # Drizzle schema (users, works)
└── (migrations)      # Auto-generated

lib/
└── db.ts             # Drizzle client
```

### Global Components
| Component | Purpose | Location |
|-----------|---------|----------|
| `Header` | Back button + title + subtitle | `components/Header.tsx` |
| `Footer` | Credit line "Made with ♥" | `components/Footer.tsx` |
| `Card` | Home profile card with 3D tilt | `components/Card.tsx` |
| `LinkButton` | Animated link with hover effects | `components/LinkButton.tsx` |
| `Accordion` | Expandable content sections | `components/ui/Accordion.tsx` |
| `VideoModal` | Fullscreen video playback | `components/ui/VideoModal.tsx` |

### Route-Specific Components
Each route can have its own `components/` folder:
```
app/works/components/
├── index.ts          # Export all components
├── WorksGrid.tsx     # Video grid with modal
└── WorksFilter.tsx   # Category filter buttons
```

## Key Patterns

### Page Structure
```tsx
// Public pages use Header/Footer
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="min-h-full flex flex-col items-center px-4 sm:px-6 pt-16 sm:pt-10">
        <div className="flex-1 w-full max-w-5xl">
          <Header title="Page Title" backHref="/" subtitle="optional" />
          {/* Content */}
        </div>
        <Footer />
      </div>
    </div>
  );
}
```

### Works Prefetch
The "Past Works" link in Card.tsx uses `prefetch` prop for faster navigation:
```tsx
<LinkButton
  link={link}
  prefetch={true}  // Prefetch on hover
  // ...
/>
```

### Admin Routes
Protected by `proxy.ts` (Next.js 16 middleware). Uses sidebar layout:
```tsx
// app/admin/layout.tsx
// Provides: sidebar navigation, logout button
```

## Database Schema

### users
| Column | Type | Notes |
|--------|------|-------|
| id | serial | PK |
| email | text | unique |
| password | text | hashed |
| createdAt | timestamp | |

### works
| Column | Type | Notes |
|--------|------|-------|
| id | serial | PK |
| category | text | e.g., "Motion Graph" |
| cloudinaryUrl | text | video URL |
| cloudinaryPublicId | text | for deletion |
| createdAt | timestamp | |

## Environment Variables
```
DATABASE_URL=          # Neon PostgreSQL
JWT_SECRET=            # JWT signing secret
CLOUDINARY_CLOUD_NAME=#
CLOUDINARY_API_KEY=    #
CLOUDINARY_API_SECRET= #
```

## Important Notes
- Services and Terms are **static pages** (no database)
- Auth uses **JWT with HTTP-only cookies**
- Next.js 16 uses `proxy.ts` instead of `middleware.ts` for route protection
- Video storage via **Cloudinary** (uploaded from admin)
- Works page fetches from DB on mount, filtered client-side

## CSS Variables (globals.css)
```css
--bg-primary: #07070f;
--bg-card: rgba(12, 12, 20, 0.82);
--text-primary: #f1f5f9;
--accent-purple: #a855f7;
--accent-pink: #f472b6;
```
