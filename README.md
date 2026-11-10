# HandoverX

HandoverX turns scattered project activity into a usable team handover. This Round 2 build is a no-login CampusConnect demo that gathers recorded contributions, decisions, tasks, dependencies, and risks into an editable report for the next owner.

## Problem and solution

When a team member leaves, important project context is often spread across conversations, tickets, and personal memory. HandoverX keeps activities, decisions and their reasoning, task ownership, and risks together, then assembles those records into a structured transfer that a receiving teammate can review.

## Features in this build

- Public landing page and one-click CampusConnect demo.
- Browser-local demo workspace with realistic sample project data.
- Dashboard, activity log, decision log, tasks, risks, and team roster.
- Create, edit, delete, search, and filter records where shown in the interface.
- Deterministic evidence-based handover generation, editable draft, approval, and receiving-member view.
- Markdown download and print dialog for PDF saving.
- Restore the original demo baseline.

See [submission/round-2/COMPLETED_FEATURES.md](submission/round-2/COMPLETED_FEATURES.md) for implemented, partial, and unimplemented scope.

## Architecture

The front end is dependency-free HTML, CSS, and JavaScript. `server.mjs` is a small Node.js static file server with a health endpoint and basic browser security headers. Record data is stored in the current browser's `localStorage`; the server has no database or user accounts. Handover generation is a deterministic template built from those records. It does not call an LLM.

```text
Browser (index.html, styles.css, app.js)
   ├── localStorage: demo workspace records and handovers
   └── Node.js static server (server.mjs)
         └── GET /api/health
```

## Technology

- Node.js 18 or later, using built-in modules only.
- HTML, CSS, and browser JavaScript.
- Browser `localStorage` for per-browser demo state.
- Node built-in test runner for the fallback generator checks.

The requested React, TypeScript, Vite, Express, Prisma, and PostgreSQL stack is not part of this minimal working build. The trade-off keeps the judge demo install-free and usable without cloud credentials; persistent multi-user data and production hosting need a later backend implementation.

## Demo

1. Install Node.js 18 or later.
2. Run `npm start` from the repository root.
3. Open `http://localhost:4173` and select **Try the live demo**.
4. Go to **Team**, choose Abhinav Kumar, and select **Start handover**.
5. Choose Riya Das, review and edit the generated sections, approve the handover, then open the receiving view.
6. Use **Export Markdown** or **Print / PDF** in the handover review.

The seeded workspace is restored with **Restore demo baseline**. Changes are saved only in that browser. The user can use the demo without signing in.

## Installation and checks

```sh
npm start
npm run check
npm test
```

The tests cover deterministic handover content, missing-information labeling, member-specific task inclusion, and HTML escaping. They do not replace browser end-to-end tests.

## Environment variables

No environment variables are required. `PORT` optionally selects the local server port; the default is `4173`. `.env.example` documents this.

## API overview

- `GET /api/health` returns a small JSON service health response.
- All record edits currently happen in the browser and are not exposed through REST endpoints.

## Database and security

There is no database, authentication, account system, or GitHub token handling in this build. The demo is intentionally local to each browser. The server uses same-origin static serving, a restrictive Content Security Policy, `nosniff`, and a referrer policy. Do not use this prototype to store private project information or expose it as a production multi-user service without adding authentication, authorization, validation, rate limits, and a persistent database.

## Deployment

No public deployment has been created. `render.yaml` prepares a Node web service for Render; deploy it by connecting the repository in Render. The local demo state remains browser-specific and no hosted persistence is provided. A judge-facing public URL and repository publication are pending account access and deployment.

## Submission materials

Round 2 materials are in [submission/round-2](submission/round-2/). They record the current implementation and outstanding delivery steps.

## Team

**HACKOVERX** · Abhinav Kumar, Team Leader · Computer Science and Engineering, North Eastern Regional Institute of Science and Technology (NERIST) · CodeFrontier 2026.
