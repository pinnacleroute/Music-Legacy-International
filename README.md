# Music Legacy International (MLI)

> Where Music, Opportunity, and Community Connect.

Music Legacy International is a personalized, relationship-driven platform connecting independent artists, music-industry professionals, venues, businesses, and culture builders into a unified music-industry ecosystem.

---

## Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack) & [vinext](https://github.com/vinext)
- **UI & Styling**: React 19, TypeScript, Vanilla CSS design system with CSS custom properties, responsive typography, and Tailwind CSS utilities
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: `@fontsource-variable/geist` (Sans) and `@fontsource-variable/source-serif-4` (Editorial)
- **Deployment**: Static site generation (`BUILD_TARGET=github next build` / `vinext build`) with GitHub Pages & Cloudflare compatibility

---

## Getting Started

### Prerequisites
- Node.js >= 22.13.0
- npm >= 10.0.0

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### Production Build & Linting
```bash
# Production Next.js static build (26 routes)
npm run build:pages

# Lint check
npm run lint

# TypeScript verification
npx tsc --noEmit
```

---

## Core Application Areas

1. **Editorial Homepage (`/`)**: Narrative-led landing experience showcasing the 5 pillars of MLI (Hero, Personalized Path, Culture, Opportunity in Action, Closing Vision).
2. **Dashboard / MLI Home (`/dashboard`)**: Outcome-driven home surfacing the Next Best Move, People Worth Meeting, Network Activity, and Path Progress.
3. **MLI Bridging Tool (`/bridging`)**: Personal advisor converting background, skills, and current challenges into high-signal recommendations.
4. **Opportunities (`/opportunities`)**: Curation-first directory for showcases, paid gigs, collaborations, and tours with match scoring and simulated applications.
5. **Community & Groups (`/community`, `/community/[id]`)**: Social network with For You feed, Moments, composer, interactive group spaces, and discussion threads.
6. **Events (`/events`)**: Curated live showcases, industry networking nights, masterclasses, and RSVP flows.
7. **Marketplace (`/marketplace`)**: Verified music services, studios, tour support, and media vendors.
8. **Messages (`/messages`)**: Relationship-first messaging with shared context, audio previews, and inquiry routing.
9. **FastTrack (`/fasttrack`)**: Milestone-based roadmap guiding progression toward booking and career goals.
10. **Profile (`/profile`, `/profile/[id]`)**: Identity-first profiles highlighting experience, collaboration criteria, mutual connections, and match breakdowns.
11. **Membership (`/membership`)**: Authentic 6-tier MLI membership model with comprehensive comparison drawer and recommendation engine.

---

## Membership Model

MLI operates on the official 6-tier structure:

| Tier | Monthly Rate | Target Audience | Primary Focus |
|---|---|---|---|
| **Fan** | Free | Listeners & fans | Public discovery, streaming, community timeline |
| **Fan / Audiophile** | $19.95 | Passionate music lovers | Lossless audio, presale priority, badges |
| **Pro Silver** ⭐ | $29.99 | Active independent artists | Showcase submissions, booking requests, FastTrack roadmap |
| **Pro Gold** | $49.99+ | Businesses, venues & vendors | Verified vendor directory, B2B marketplace listing |
| **Pro Platinum** | $99.99+ | Established artists & managers | Priority showcase pitching, prelaunch access, intro routing |
| **VIP / Alliance** | $495 | Strategic & executive partners | Executive networking, partner summit, alliance advisory |

> **Invoice Processing Policy**: *Choose the annual plan and get free processing. Other membership tiers receive a $5 processing fee per invoice.*

---

## Prototype & Simulation Context

All backend interactions (payment processing, message persistence, event RSVP persistence, opportunity application submissions, audio streaming, and membership upgrades) are simulated in the current frontend phase with realistic client-side state transitions.
