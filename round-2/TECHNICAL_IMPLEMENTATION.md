# HandoverX Technical Implementation

## Architecture

The current Round 2 deliverable is a dependency-free browser application served by a small Node.js HTTP server. `index.html` hosts the application root, `styles.css` defines the visual system and responsive breakpoints, and `app.js` owns rendering, demo data, forms, record operations, handover generation, and export actions. The browser's `localStorage` stores the workspace and handovers under a versioned key.

```text
Judge's browser
  index.html + styles.css + app.js
  localStorage (isolated browser demo data)
          |
          v
Node.js server.mjs (static files + GET /api/health)
```

There is no database connection or server-side record API in this build. The choice avoids installation, credentials, and sign-in for the judge path, while limiting persistence to one browser profile.

## Interface and records

The app includes a public landing page and seven workspace views: dashboard, activities, decisions, tasks, risks, team, and handovers. CampusConnect sample data is preloaded. Main records can be created, edited, and deleted in the browser. Task filters and search operate on current stored data. Dashboard counts are derived from that data.

The application uses semantic form controls and escapes user-entered text before rendering it as HTML. The Node server sets a Content Security Policy, `X-Content-Type-Options: nosniff`, and a referrer policy.

## Handover generation

When the user selects departing and receiving members, `generateSections` builds ten report sections from the current records. The member contribution and pending/completed work are scoped to records assigned to or authored by the departing member. Project risks and resources are included where they are available. Missing records are called out with “Information not recorded.” No LLM call or external service is involved, so the fallback remains available without an API key.

The user can edit generated text, save a draft, approve it, open a read-only receiving view, download Markdown, or invoke the browser print dialog. Approved reports are retained in local browser storage with a creation and approval timestamp and version number.

## APIs

The only HTTP API is `GET /api/health`, returning the app name and local-demo status. Record operations are client-side. No auth, pagination, rate limiting, GitHub endpoints, or server-side authorization is present.

## Configuration and run commands

- Node.js 18+; no package installation is required.
- `npm start` serves the app on port 4173 by default.
- `PORT` can set another port.
- `npm run check` parses the app and server JavaScript.
- `npm test` runs Node's built-in test runner.

## Verification performed

`npm run check` passed. `npm test` passed four tests covering generator content, explicit missing-information labels, member-specific pending tasks, and HTML escaping. An attempted local browser preview was blocked: the browser could not connect to localhost and its URL policy rejected local file URLs. Visual UI, responsive breakpoints, print/PDF output, and browser-level CRUD-to-approval were therefore not verified.

## Deployment and next engineering step

No deployment credentials or hosted service were available, and the demo has no persistent server API. The deployment-ready production architecture still needs a real backend and database. Recommended next work is to port the current record model to typed React components and an Express API, add Prisma/PostgreSQL and migrations, then add authentication and tenant isolation before hosting. Do not expose this current prototype as a public multi-user workspace.
