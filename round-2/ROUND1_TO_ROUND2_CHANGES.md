# Round 1 Proposal to Round 2 Build

The available source for this comparison is the supplied HandoverX build brief, which describes the intended product and technology choices. No separate Round 1 submission artifact was present in the project directory, so this document does not claim details about what was actually implemented in Round 1.

## Remained unchanged

- The core problem remains the loss of project context when a teammate leaves.
- HandoverX remains an AI-assisted knowledge and handover product in its longer-term vision.
- Activities, decisions and their reasoning, tasks, ownership, dependencies, risks, and a receiving-member handover remain the intended product concepts.
- CampusConnect remains the demo project.

## Simplified for the Round 2 local build

- React, TypeScript, Vite, Tailwind, Express, Prisma, and PostgreSQL were replaced with plain browser JavaScript, CSS, HTML, and Node's built-in HTTP server.
- The planned relational database was replaced with browser-local `localStorage`.
- AI generation was replaced with a deterministic, record-based template generator.
- GitHub access and real user accounts were omitted.
- The handover URL share flow was omitted; Markdown download and print-to-PDF are provided locally.

These reductions avoid external keys and setup requirements for the judge demo. They also mean that data is not shared across devices or users, and there is no production multi-user hosting capability.

## Added in this build

- A one-click public landing-to-demo path.
- Preloaded CampusConnect records for an immediate walkthrough.
- Browser-side editing and a local baseline reset.
- A ten-section handover editor, approval state, receiving-member view, Markdown export, and print action.
- Automated checks for the deterministic handover logic.

## Removed or still pending from the proposal

Database-backed persistence and migrations, user and project authorization, Gemini JSON generation, repository import, PDF rendering, shareable handover URLs, production deployment, and public repository publication are not implemented. These remain future work rather than Round 2 completed claims.
