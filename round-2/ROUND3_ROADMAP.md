# HandoverX Round 3 Roadmap

The following are proposed improvements, not completed Round 2 features.

## 1. Continuous knowledge capture

**Problem solved:** Manual activity entry is easy to forget, leaving gaps in handovers.

**Implementation:** Add opt-in connectors for GitHub and issue tracking, ingest reviewed events into the activity log, and let a project lead approve or discard imports before they enter handover context.

**Technical approach:** OAuth with read-only scopes, encrypted server-side tokens, webhook verification, deduplication keys, an import review queue, and explicit evidence URLs. Keep source attribution and event timestamps with each imported record.

**Expected impact:** Reduce repeated data entry and improve the coverage and freshness of the project record.

**Improvement to the product:** Handovers can draw from a steadier activity history while preserving human review over what becomes official project context.

## 2. Intelligent knowledge graph

**Problem solved:** A flat record list does not show how a decision changed a task or how one blocker affects several owners.

**Implementation:** Connect people, activities, decisions, tasks, evidence, and risks; add a trace view to handover sections showing the records behind each conclusion.

**Technical approach:** Start with relational link tables and typed edges in PostgreSQL; build graph queries for evidence paths and dependency impact. Add a provenance record for generated text, with links to source record IDs and timestamps.

**Expected impact:** Faster context discovery and clearer reasoning from source event to current responsibility.

**Improvement to the product:** The receiving teammate can verify and navigate the context behind each handover statement.

## 3. Advanced ownership transfer and risk intelligence

**Problem solved:** A handover may name a new owner without confirming capacity, acceptance, or a mitigation deadline for high-risk work.

**Implementation:** Add recipient acceptance, reviewer sign-off, ownership due dates, unresolved-item escalation, and risk trend summaries.

**Technical approach:** Model handover approvals and task transfer as auditable workflow events; derive risk signals from overdue tasks, unresolved dependencies, and risk history. Keep recommendations explainable and based on visible source records.

**Expected impact:** Make transfers accountable and surface issues earlier during departures.

**Improvement to the product:** HandoverX would support the transition after the report is created and provide transparent next steps for project leads.
