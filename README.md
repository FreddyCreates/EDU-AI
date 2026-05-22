# EduAI

EduAI is a live sovereign K-12 intelligence platform designed to give every student a durable academic memory, every teacher actionable insight, and every school leader a real-time view of learning progress.

## Investor-Style Narrative

Most education software solves only one layer of the problem. One product handles content. Another handles analytics. Another handles recognition. Another handles student support. EduAI is built as the system that connects those layers into a single intelligence platform.

At the center of the product is **EDDI**, EduAI's unified intelligence model. Instead of fragmenting the experience across disconnected assistants, EduAI uses one intelligence field that shifts modes for students, teachers, principals, builders, recognition workflows, memory analysis, and system architecture. The result is continuity: one platform that can teach, remember, adapt, surface talent, and support decision-making across the full school ecosystem.

The product thesis is simple:

- **For students:** a permanent learning passport that compounds over time instead of resetting each semester
- **For teachers:** live instructional intelligence, grade visibility, lesson-building support, and progress monitoring
- **For principals and districts:** school-wide analytics, recognition visibility, and operational intelligence
- **For institutions:** a sovereign architecture with platform-native memory, routing, and storage

EduAI is positioned as an education operating system, not just a tutoring interface. It combines adaptive learning, student memory, achievement capture, recognition workflows, curriculum surfaces, and multi-role portals into a single product that can follow a learner from kindergarten through graduation.

## What Makes EduAI Different

- **Unified intelligence:** EDDI operates as one model with 7 modes rather than a collection of unrelated bots
- **Persistent academic memory:** student activity is sealed into passport records and kernel seeds
- **Recognition as infrastructure:** RCGN, NOMS, and ACHV turn student excellence into durable institutional action
- **Role-based product surface:** dedicated portals for Student, Teacher, Principal, IT, Parent, Counselor, and District users
- **Native platform logic:** curriculum, engines, memory, and live intelligence are implemented inside the platform itself
- **Live product experience:** the repository contains the deployed frontend experience, not only backend experiments

## Technical Architecture

EduAI is a full-stack application with a TypeScript frontend and a Motoko backend deployed as a single Internet Computer actor.

### Frontend

- **Framework:** React 19 + Vite
- **Routing:** TanStack Router
- **Data fetching/state:** TanStack Query with platform actor hooks from `@caffeineai/core-infrastructure`
- **UI system:** glassmorphism-heavy design language with Tailwind, Radix UI primitives, motion animations, and OKLCH-driven styling
- **Entry points:** `src/frontend/src/App.tsx` defines a large route surface spanning landing, demo, student, teacher, principal, IT, parent, counselor, district, recognition, passport, university, engine registry, and API exploration experiences

### Backend

- **Runtime:** Motoko canister defined in `src/backend/main.mo`
- **Composition model:** the `EduAI` actor includes many domain mixins that expose APIs for students, agents, curriculum, sessions, passport, recognition, district, feedback, lessons, knowledge, university, staff, parent, counselor, and more
- **Persistence model:** state is maintained through explicit stores for passports, kernel seeds, recognition flags, achievements, curriculum, engines, district analytics, feedback events, university enrollment, and sovereign memory allocation
- **Tooling:** `mops.toml` configures the Motoko build and includes `openai-client`, though the repo narrative and architecture emphasize native platform intelligence and storage

### Intelligence Model

The central intelligence abstraction is **EDDI**:

- Canonically defined as one model in `src/backend/types/eddi.mo`
- Backed by mode-selection, persona-selection, and response framing logic in `src/backend/lib/eddi.mo`
- Exposed in the product through engine registry, agent, and chat flows across the frontend

EDDI supports 7 named modes:

1. Student Mode
2. Teacher Mode
3. Principal Mode
4. Build Mode
5. Memory Mode
6. Recognition Mode
7. Architect Mode

In practice, the repo treats named personas such as Sage, Quill, Spark, Atlas, Echo, and Nova as operating lenses within EDDI rather than separate intelligence systems.

### Core System Layers

#### 1. Passport and memory layer

- Student records live in the sovereign passport system
- Study activity is converted into `KERNEL_SEED` records
- Memory compounds over time and feeds progress and recognition systems
- Core files:
  - `src/backend/lib/passport.mo`
  - `src/backend/lib/sovereign-memory.mo`

#### 2. Live intelligence layer

EduAI computes live state using internal formulas for:

- **SSS** — Student State Score
- **COH** — Coherence
- **IAS** — Interface Adaptation Score
- **ADX** — Adaptive Difficulty
- **RCGN threshold** — Recognition trigger threshold

Those values drive UI state, difficulty, and recognition behavior.

Core file:

- `src/backend/lib/live-intelligence.mo`

#### 3. Recognition pipeline

Recognition is implemented as a structured system rather than an isolated feature:

- **RCGN** detects notable mastery or sustained excellence
- **NOMS** supports nomination workflows
- **ACHV** seals achievement records

This creates a product path from learning activity to institutional recognition.

Core files:

- `src/backend/lib/rcgn.mo`
- `src/backend/main.mo`

#### 4. Curriculum and learning layer

- K-12 curriculum is seeded directly in the backend
- The frontend exposes subject, topic, study, self-study, lesson, and knowledge-browser experiences
- University-style gated progression extends the platform into advanced and builder-oriented content

Core files:

- `src/backend/lib/curriculum.mo`
- `src/backend/lib/university.mo`

#### 5. Multi-portal application layer

The frontend ships role-based views for:

- Student
- Teacher
- Principal
- IT / Security
- Parent
- Counselor
- District

This is one of the repo's strongest signals that EduAI is intended as a platform product, not a single-user assistant.

## Repo Highlights

- `project.json` — concise platform overview and feature list
- `src/frontend/src/App.tsx` — application route map
- `src/frontend/src/pages/Landing.tsx` — public-facing product positioning
- `src/frontend/src/pages/Vision.tsx` — vision and funding narrative surfaces
- `src/backend/main.mo` — main sovereign actor and state wiring
- `src/backend/lib/engines.mo` — engine registry including EDDI
- `src/backend/lib/agents.mo` — persona/agent registry

## Local Development

If `pnpm` is not already installed in your environment, enable it first with:

```bash
corepack enable
```

Root workspace commands:

```bash
pnpm typecheck
pnpm build
```

Frontend workspace commands:

```bash
cd src/frontend
pnpm dev
pnpm typecheck
pnpm build
```
