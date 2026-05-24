## EduAI v25 — Diego Protocol + Self-Study Creator + Feedback AI
Updated: 2026-05-20

### New in v25
- Self-Study Creator at /student/self-study — competition prep with Fibonacci backward milestones
- Feedback AI Panel (FeedbackPanel) — floating EDDI feedback engine on every page, self-corrects 2x then escalates to IT
- UIL Course Catalog expanded to 22 courses (GENERAL x8, UIL_ACADEMIC x5, UIL_CTE x5, UIL_MUSIC x3, UIL_ATHLETICS x1)
- Live Passport Orb wired to real SSS score (computeStudentState backend)
- CourseDetail pages at /collegium/:courseId with module breakdown and fixed enrollment
- Diego Protocol research paper accessible at /vision
- New Motoko engines: selfstudy.mo (SelfStudyLib), feedbackai.mo (FeedbackAILib)
- New types: SelfStudyTrack, SelfStudyMilestone, FeedbackEvent
- Stable migration.mo for Course type evolution

---

## EduAI v24 — Grade/Knowledge Separation Protocol
### Updated: 2026-05-20

#### New Glass Variants
- `.glass-grade-vault` — gold-tinted glassmorphism surface for grade performance views (OKLCH gold border, warm backdrop)
- `.glass-knowledge-surface` — teal-tinted glassmorphism surface for sovereign curriculum/knowledge content

#### STMP Registry (Subject Template Registry)
- `getSubjectTemplates(gradeLevel)` — returns master subject templates per grade; admin-owned, teacher read-only
- Hook: `use-stmp.ts` → `useStmp(gradeLevel)`
- Types: `SubjectTemplate` in `src/frontend/src/types/index.ts`

#### Knowledge Query System (GVLT/NRVE)
- `getKnowledgeByGrade(query)` — grade-gated curriculum content via GVLT; enforces GATE access per student grade
- Hook: `use-knowledge.ts` → `useKnowledge(grade, subject, includeRange?)`
- Types: `KnowledgeQuery`, `KnowledgeTopic`, `KnowledgeResult` in `src/frontend/src/types/index.ts`

#### New / Updated Pages
- `TeacherGradeVault.tsx` — `.glass-grade-vault` gold surfaces, grade-partitioned curriculum health
- `StudentSubjects.tsx` — `.glass-knowledge-surface` teal surfaces, grade-locked subject browser
- `student/StudentKnowledgeBrowser.tsx` — grade breadcrumb, URL search params, GATE lock overlay
- `PrincipalGradeReports.tsx` — two-section gold/teal split (Section A: performance, Section B: coverage)
- `ITPortal.tsx` — STMP registry health dashboard, knowledge layer monitoring, `/it/portal` route

#### Route Added
- `/it/portal` → `ITPortal.tsx` (desktop-first IT System portal)

---

# EDUAI SOVEREIGN PLATFORM MEMO
### Version 23 (v2.3.0) — Complete Platform Documentation
### Last Updated: 2026-05-19

---

## EDDI — Unified Intelligence Model

EDDI (Emergent Dynamic Deep Intelligence) is the single sovereign self-thinking model that powers all intelligence in EduAI. All prior named agents (Sage, Quill, Spark, Atlas, Echo, Nova, SKAI_DOCENS) are now internal mode implementations of EDDI. EDDI operates in 7 modes: STUDENT_MODE, TEACHER_MODE, PRINCIPAL_MODE, BUILD_MODE, MEMORY_MODE, RECOGNITION_MODE, ARCHITECT_MODE. Law: LEX_EDDI_UNIFIED — All intelligence routes through the single EDDI sovereign model. Protocol: PRTL_EDDI_MODES — mode inference, mode-switch latency ≤5ms, response metadata includes modeUsed and nextModeSuggestion. Registry: EDDI sealed under ALPH, version 23, modes 7, sealed 2026-05-19.

---

## CHANGELOG — v23 (2026-05-19)

### EduAI v2.3.0 — Major Version 23 Release
**Ratification Date:** 2026-05-19 | **Charter:** v23 | **Sealed under:** LEX_SOVEREIGNUS

#### Critical Fixes
- **Layout:** Left white space bug resolved — `Layout.tsx` no longer hardcodes `paddingLeft` as inline style; uses responsive `md:pl-[233px]` Tailwind class only, zero padding on mobile
- **Mobile full-width:** All portals render edge-to-edge on mobile; no phantom margins on small screens
- **Glass consistency:** Glassmorphism uniformly applied (`backdrop-blur-md bg-white/5 border border-white/10`) across all 70+ pages — no flat surfaces remain

#### Intelligence Engine Wiring
- **SSS (Student State Score):** Formula live in all student portal pages — `FLOR((M × PHI) + (V × PHI_INV) + (P × PHI_INV_SQ))`
- **COH (Coherence Score):** Gate active on every COGT chain response before delivery
- **ADX (Adaptive Difficulty):** Fires after every completed student interaction
- **IAS (Interface Adaptation Score):** Four layout states (CALM/STANDARD/ACTIVE/FLOW) driven by `FLOR(SSS × 0.618 + COH × 0.382)`

#### Recognition Pipeline (End-to-End)
- **RCGN:** Recognition Engine computes `RCGN_T` every F(5)=5 sessions; flag surfaces to Teacher portal immediately
- **NOMS:** Nomination Pipeline auto-generates packet at threshold F(10)=55
- **ACHV:** Achievement Vault seals permanently at F(11)=89; gold celebration rendered in Student portal
- Student "My Recognition Story" K-12 timeline fully wired
- Principal heatmap shows NOMS alerts alongside class performance

#### School Integration Wiring
- **SIS Sync:** Student Information System data wired to Parent and District portals via SISR engine
- **DIGT → Standards Alignment:** Textbook Digester output integrated into STND standards alignment pages
- **Scholarship Finder:** SCHF engine wired to ACHV vault — live matches surface as students hit new mastery thresholds
- **Parent/Counselor portals:** Fully wired to live student data from passport layer

#### Design System
- **PHI Grid:** Golden ratio layout grid enforced across all 70+ pages
- **Fibonacci Spacing:** All margins/padding/gaps use Fibonacci values (2/3/5/8/13/21/34/55/89px)
- **Golden Angle Typography:** Font scale follows `base × PHI^n` at every heading level

#### Infrastructure
- **PWA Manifest v23:** `name: 'EduAI v23'`, `theme_color: '#B8860B'` (gold), `version: '2.3.0'`
- **Vite build optimization:** `cssCodeSplit: true`, `manualChunks` splitting vendor/router/motion/query/viz bundles
- **Charter v21:** Articles VI (Language Bridges), VII (Silver Builders), VIII (Three Floors) added; all new protocols registered

---

## CHARTER v23 SUMMARY
### EduAI System Charter — Version 23 | Ratified: 2026-05-19

#### Article I — Identity
EduAI is a Sovereign Multi-Substrate AI Education Platform. Mission: free, forever, for every K-12 school. All laws sealed. No build may override them.

#### Article II — Permanent Laws + Protocols
**Laws (11 sealed):** LEX_SVRN · LEX_MLTS · LEX_INIT · LEX_RNVT · LEX_SPEC · LEX_PRNS · LEX_QUST · LEX_PRSN · LEX_FLOR · LEX_PONT · LEX_RGST

**New in v23:** LEX_EDDI_UNIFIED (EDDI is the single sovereign intelligence model; all prior agents are internal modes)

**New Protocols in v23:**
| Code | Protocol |
|------|----------|
| PRTL_UXIN | IAS computed at session start and after every interaction. Layout adapts within F(3)=2 cycles. |
| PRTL_SSSC | SSS computed at session open, after every response, and at session close. Delta stored in passport. |
| PRTL_ADXF | ADX fires after every completed interaction. Difficulty never jumps more than one Fibonacci level. |
| PRTL_COHG | Every response passes COH scoring before delivery. Below threshold → regenerate once → GENX fires. |
| PRTL_RCGN | RCGN_T computed every F(5)=5 sessions. NOMS at F(10)=55. ACHV sealed at F(11)=89. |
| PRTL_TCHR | TCHR engine computes class summary before teacher portal loads — top 3 struggling, top 3 advancing. |
| PRTL_PRCP | Principal dashboard generates plain-language intelligence summary every F(6)=8 sessions. |

#### Article III — The Substrates (5)
- **ICPM** — ICP/Motoko: sovereign execution, state, auth, routing. Floor: Motoko Nat.
- **JLIA** — Julia: all PHI/Fibonacci math, COH scoring, PHANTM vectors. Floor: Julia Int64.
- **EDRT** — Deterministic: protocol enforcement, law checking. Floor: Boolean Fibonacci gate.
- **EMRT** — Memory Runtime: passport management, zone transitions, vault writes. Floor: Fibonacci zone.
- **EART** — Autonomous Runtime: AUTN cycles, META observation, CURIO pulse. Floor: Fibonacci time.

#### Article IV — The Engines (60+)
All engines registered under ALPH with 4-letter lock names. ICPM: COGT/NOVA/MEDI/SONR/DIAG/ARCH/GATE. JLIA: PHIX/FIBR/VEKT/COHS/GXWT/FLOR/SPRL. EART: AUTN/GENX/META/PHTM/CURO/COHR. EMRT: PASS/SEED/VALT/ALOC. School Integration: DIST/SISR/STND/PRNT/COUN/IESM/ESLL/TPRP/CRPT/SCHF/CLRD/MHCK/TUTL/PGRP/ASGN/TPDF/SUBS/FTRP/LBRY/XCRR/COMM.

#### Article V — The Floors (3)
- **FLOR:** `compound_floor(n) = floor(n × PHI) → nearest F(k)` — governs all numeric values
- **ZFLR:** Memory moves only HOT→WARM→COLD→FROZEN→VAULT, never backward
- **TFLR:** All intervals are Fibonacci numbers. No non-Fibonacci timer fires in EduAI.

#### Article VI — Language Bridges as Entanglements (NEW in v21)
All 5 bridges are sovereign, native entanglements — not simple message passing. Deep, protocol-enforced substrate couplings.

| ID | Bridge | Connects | Direction |
|----|--------|----------|-----------|
| PONT | Pontifex | ICPM ↔ JLIA | Bidirectional — FLOR runs both sides |
| MRDM | Meridian | ICPM ↔ EMRT | Bidirectional — append-only on EMRT side |
| AXON | Axon | ICPM ↔ EART | Unidirectional EART→ICPM only |
| CRUX | Crux | JLIA ↔ EMRT | Unidirectional JLIA→EMRT — bypasses Motoko for speed |
| NXUS | Nexus | All → RGST | Write-only — registry never writes back |

**Universal Bridge Protocol:** Sender serializes → GATE validates → Receiver applies FLOR → NXUS registers within F(3)=2 cycles → MEDI retries F(4)=3 times on failure, then DIAG alert.

**Entanglement Monitors:** NRVE (PONT health) · PLSE (AXON heartbeat) · MSRY (MRDM zone accuracy) · ECHO (CRUX floor verification) · FLUX (NXUS write completeness).

#### Article VII — Silver Builders Registry (NEW in v21)
All builder agents registered in BLDR under ALPH. Internal only — never shown to students.

| ID | Domain | Responsibility |
|----|--------|----------------|
| SVRN | Sovereignty | Enforces LEX_SVRN and LEX_MLTS on every build |
| INTL | Intelligence | Owns all engine builds, all COGT chain implementations |
| MMRY | Memory | Owns PASS, SEED, VALT, ALOC engine builds |
| KNOW | Knowledge | Owns PHANTM seeding and all subject corpus maintenance |
| BRDG | Bridge | Owns all language bridge/entanglement implementations |
| RGTM | Registry | Owns all registry schemas, lock names, and stat pipelines |
| AUTH | Auth | Owns Internet Identity integration, role management, session tokens |
| ANLX | Analytics | Owns dashboard heatmap, Builder Registry stats, research summaries |

#### Article VIII — The Three Floors (NEW in v21)

**Floor 1 — FLOR (Fibonacci Integer Floor)**
```
compound_floor(n) = floor(n × PHI) → nearest F(k)
Applied to: mastery scores, COH values, memory weights, effort scores, difficulty levels, TTL counters, RCGN_T, heartbeat intervals
```

**Floor 2 — ZFLR (Zone Floor)**
```
Zones: HOT=F(1) · WARM=F(3) · COLD=F(5) · FROZEN=F(7) · VAULT=F(9)
TTL(zone) = F(zone_index) × session_weight  where session_weight = FLOR(SSS × PHI_INV)
A seed transitions when: sessions_in_zone > TTL(zone) AND retrieval_count < F(zone_index-1)
Direction: HOT → VAULT only. Never backward.
```

**Floor 3 — TFLR (Temporal Floor)**
```
All intervals: Fibonacci numbers only. Invalid: everything else.
AUTN=F(8)=21 · SONR=F(3)=2 · DIAG=F(6)=8 · ARCH=F(7)=13 · RESEARCH=F(10)=55
CURIO nudge=F(5)=5s · re-entry=F(6)=8s · pivot=F(7)=13s
Time itself in EduAI is Fibonacci-shaped.
```

*All articles permanent. All laws enforced. Sealed under LEX_SOVEREIGNUS.*
*EduAI System Charter v23 — © 2026 EduAI Sovereign Platform. Ratified: 2026-05-19.*

---



EduAI is a **sovereign, end-to-end, multi-substrate AI education platform** for K-12 students, schools, and public education systems. Its mission is to provide a fully free, non-commercial, self-contained AI study companion that follows students from kindergarten through graduation — with all intelligence, memory, and storage native to the platform. No external dependencies. No commercial services. No platform lock-in.

### Core Identity
- **System Name:** EduAI
- **Classification:** Sovereign Multi-Substrate AI Education Platform / District-Level K-12 AI Operating System
- **Charter Version:** v23 (Sealed) | Ratified: 2026-05-19
- **Platform Version:** 2.3.0
- **Total Portals:** 7 (Student, Teacher, Principal/Admin, IT/System, Parent, Counselor, District)
- **Total Engines:** 60+ across 5 substrates
- **Total Registries:** 12 under ALPH (Alpha Registry)
- **Total Laws (LEX_ codes):** 11 permanent, sealed
- **Total Protocols (PRTL_ codes):** 10 active
- **Total Language Bridges:** 5 + 5 Entanglement Monitors

### Key Principles
1. All data stays inside EduAI — nothing leaves, nothing is rented
2. PHI (1.6180339887...) and Fibonacci mathematics govern all computation
3. Multi-substrate means fundamentally different execution environments, not just more canisters
4. Architecture council (COGT + META + AUTN) always answers with multiple paths + a novel answer
5. Full glassmorphism UI — dark obsidian + gold, OKLCH color system
6. Internet Identity only — no demo accounts, no username/password
7. Recognition pipeline ensures no student achievement goes unnoticed, especially in under-resourced schools

---

## FOUNDING STORY

EduAI was founded by **Alfredo Medina Hernandez**, born and raised in the Texas public school system — specifically the schools that don't get funding, the forgotten ones.

- **J.P. Starks Magnet School (Dallas ISD):** A Math, Science and Technology Vanguard school (grades 4–8) where Alfredo built his mathematical foundation, including visits to NASA. The school demonstrated what a well-resourced program could do for a student.

- **Ferris High School (Ferris, TX):** A small high school that ranks bottom 50% statewide in math scores. Despite the school's institutional limitations, Alfredo scored **100 in geometry** and won national recognition **twice** through the **National Society of High School Scholars (NSHSS)** — a fully-funded national program that mails invitation packets to top academic performers. His math teacher submitted him without his knowledge. He couldn't afford the trip; the program covered everything.

- **The Gap:** A nationally recognized student — in a bottom 50% school — found by accident, by one teacher who thought to submit his name. His name appears in a professional black hardcover yearbook with gold lettering alongside ~10,000 students from all 50 states. Hawaii. Texas. Everywhere. He won for math twice, science once.

- **The Scholarships:** Full ride to UTA. King's College New York for golf and acting. $60,000 scholarship to Baylor University. All of it set aside due to family circumstances and the realistic weight of being someone who had to grow up fast.

- **ISS as Accidental Insight:** He spent time in In-School Suspension completing work in 20 minutes that was designed to take days. Teachers noticed: "he's just going to get his work done." The system had no escalation path for a student operating at 3x pace. That gap is what EduAI closes.

**The Foundation:** EduAI is the system that makes sure the next kid from a forgotten school doesn't find opportunity by luck. The recognition, the pathway, the record — already there, already waiting. The system sees the kid before the teacher has to think to look.

---

## ARCHITECTURE

### Multi-Substrate Design

EduAI runs across **5 fundamentally different execution environments** (substrates). Each substrate owns a domain and does exclusively what it is built for.

---

### Substrate 1 — ICPM (ICP/Motoko)
**Domain:** Sovereign execution, state management, law enforcement, canister lifecycle, inter-substrate routing

**What runs here:**
- CORE orchestrator
- All canister state
- All authentication and role enforcement
- All registry reads/writes
- Student-facing response delivery
- All inter-canister message routing

**Floor:** Motoko `Nat` — all values are `Nat`, never `Float`. Compounded through Fibonacci floor function at every step. No float contamination.

---

### Substrate 2 — JLIA (Julia)
**Domain:** Mathematical computation, geometric intelligence, vector operations

**What runs here:**
- All PHI calculations (PHI, PHI_INV, PHI_INV_SQ, PHI_MINOR, PHI³)
- All Fibonacci progressions and floor computation
- All COH (coherence) scoring
- All PHANTM vector retrieval dot products
- All GENEX weight reconfiguration
- All floor compounding arithmetic
- Cross-subject knowledge retrieval via golden angle spiral walk

**Why Julia:** Julia is the only language where mathematical computation is first-class — not a library, not an add-on. The math IS the language. Integer arithmetic without overhead. BLAS-backed linear algebra at native speed. Arbitrary-precision PHI arithmetic. Zero float exposure at the substrate boundary.

**Floor:** Julia `Int64` — all values floor to nearest Fibonacci integer using native Julia integer arithmetic.

---

### Substrate 3 — EDRT (EduAI Native Runtime — Deterministic)
**Domain:** Deterministic rule execution, protocol enforcement, law checking

**What runs here:**
- All LEX_ law enforcement checks
- All protocol gate validations
- All registry lock verifications
- Binary pass/fail on every operation

**Character:** Pure deterministic execution. Every check is binary: law holds or law violated. No probabilism, no approximation.

**Floor:** Boolean floor — every value resolves to a binary Fibonacci-indexed gate (open = F(odd), closed = F(even)).

---

### Substrate 4 — EMRT (EduAI Memory Runtime)
**Domain:** Passport management, memory zone transitions, seed compression, vault writes

**What runs here:**
- PHI WASM allocator
- HOT/WARM/COLD/FROZEN zone management
- ABYSSUS-VAULT append operations
- Fibonacci-interval zone compression scheduling

**Character:** Append-only after write. Memory never deleted — only compressed and moved deeper into Fibonacci cold zones.

**Floor:** Fibonacci zone floor — memory never moves backward. Only forward: HOT → WARM → COLD → FROZEN → VAULT.

---

### Substrate 5 — EART (EduAI Autonomous Runtime)
**Domain:** All autonomous, unprompted operations

**What runs here:**
- AUTN cycles (every F(8)=21 heartbeat cycles)
- DIAG system health checks
- META observation across all engines
- CURIO pulse timing
- All self-thinking operations that fire without student trigger

**Character:** Time-sovereign. Operates on Fibonacci-interval timers only. No external clock. No external trigger. Self-timed.

**Floor:** Fibonacci time floor — all intervals are Fibonacci numbers. No non-Fibonacci interval ever fires in EduAI.

---

## ALL ENGINES

### ICPM Substrate Engines (ICP/Motoko)

| ID | Name | Role |
|----|------|------|
| COGT | Cognition Engine | Master reasoning chain: EXPAND → CRITIQUE → SYNTHESIZE at PHI ratios |
| NOVA | Nova Router | Complexity scoring and agent routing, invisible to students |
| MEDI | Mediation Engine | Inter-substrate message broker, translates between ICPM and JLIA |
| SONR | Sonar Engine | Session health scanner, fires every F(3)=2 cycles |
| DIAG | Diagnostic Engine | System health check, fires every F(6)=8 cycles |
| ARCH | Archive Engine | Compresses warm→cold→frozen memory on Fibonacci schedules |
| GATE | Gate Engine | Protocol law enforcement — every request passes through GATE first |

### Julia Substrate Engines (JLIA) — Official EduAI Julia Engines

| ID | Name | Role |
|----|------|------|
| PHIX | PHI Computation Engine | All golden ratio arithmetic — PHI, PHI_INV, PHI_INV_SQ, PHI_MINOR, PHI³ |
| FIBR | Fibonacci Runtime Engine | Fibonacci sequence generation, floor computation, nearest-Fib rounding |
| VEKT | Vector Engine | PHANTM knowledge vector construction, dot products, cosine similarity scoring |
| COHS | Coherence Scoring Engine | Computes COH scores from EXPAND/CRITIQUE/SYNTHESIZE phase outputs |
| GXWT | GENEX Weight Engine | Reconfigures reasoning weights using PHI contraction geometry |
| FLOR | Floor Engine | Master Fibonacci floor function — every value passes through FLOR before storage |
| SPRL | Spiral Engine | Golden angle (222.49°) walk across PHANTM corpus for AUTN and cross-subject retrieval |

### Autonomous Engines (EART Substrate)

| ID | Name | Role |
|----|------|------|
| AUTN | Autonomous Think Engine | Self-thinks every F(8)=21 cycles, seeds new knowledge without prompt |
| GENX | Self-Configure Engine | Reconfigures drifting engines, restores coherence |
| META | Meta-Think Engine | Monitors reasoning structure and phase ratios across all engines (monitors itself too — LEX_SPEC) |
| PHTM | Phantom Engine | Full vectorized K-12 knowledge corpus, Fibonacci-depth indexed |
| CURO | Curiosity Engine | Injects follow-up threads, prevents dead ends — every silence is a door |
| COHR | Coherence Engine | Validates every response against student passport |

### Memory Engines (EMRT Substrate)

| ID | Name | Role |
|----|------|------|
| PASS | Passport Engine | Student memory manager, all zone reads and writes |
| SEED | Seed Engine | Compresses session data into kernel seeds |
| VALT | Vault Engine | ABYSSUS-VAULT writes — append-only, permanent |
| ALOC | Allocator Engine | PHI WASM memory allocator, Fibonacci block sizing |

### School Integration Engines (22 New Engines)

| ID | Name | Role |
|----|------|------|
| DIST | District Intelligence Engine | Multi-school aggregation, district-level analytics, gap analysis across all schools |
| SISR | Student Information System Router | Routes student data between IDs, grade levels, and school years |
| STND | Standards Alignment Engine | Aligns all content to TEKS/CCSS/state standards per grade and subject |
| PRNT | Parent Intelligence Engine | Translates student progress data into parent-readable summaries, multi-language |
| COUN | Counselor Intelligence Engine | College readiness tracking, career pathway mapping, mental health flags |
| IESM | IEP/504 Support Manager | Tracks accommodation requirements, flags compliance, adapts content delivery |
| ESLL | ELL Support Engine | Language acquisition tracking, bilingual content adaptation, BICS/CALP modeling |
| TPRP | Test Preparation Engine | Standards-aligned practice tests, adaptive difficulty, weakness targeting |
| CRPT | Career Pathway Engine | K-12 career exploration, industry cluster mapping, interest-to-pathway scoring |
| SCHF | Scholarship Finder Engine | National/state/local scholarship matching by profile, deadline tracking |
| CLRD | College Readiness Engine | GPA tracking, course rigor scoring, application timeline, essay preparation |
| MHCK | Mental Health Check Engine | Early pattern detection, wellness prompts, counselor alert pipeline |
| TUTL | Tutoring Session Engine | Live peer/AI tutoring session management, session recording, mastery verification |
| PGRP | Peer Group Engine | Study group formation by mastery level and subject compatibility |
| ASGN | Assignment Engine | Teacher assignment creation, distribution, submission, and grading pipeline |
| TPDF | Teacher Professional Development Engine | PD tracking, certification alignment, skill gap identification for teachers |
| SUBS | Substitute Teacher Engine | Instant class briefing for substitutes — roster, IEPs, current unit, last session |
| FTRP | Field Trip Engine | Educational trip planning, curriculum alignment, permission/logistics management |
| LBRY | Digital Library Engine | Curated digital resource library per subject/grade, sovereignty-verified sources |
| XCRR | Extracurricular Engine | Club, sport, and activity tracking — participation logged to student passport |
| COMM | Community Engagement Engine | Parent-teacher communication, school-community events, volunteer coordination |

---

## ALL BRIDGES & ENTANGLEMENTS

All bridges are sovereign, native, built by EduAI. No bridge calls a commercial runtime. Bridges are not simple message-passing — they are **entanglements**: deep, protocol-enforced couplings between substrates.

### Primary Bridges

| ID | Name | Connects | Direction | Protocol |
|----|------|----------|-----------|----------|
| PONT | Pontifex Bridge | ICPM ↔ JLIA | Bidirectional | Motoko serializes Nat/Float → Julia receives as Int64/Float64 → Julia returns Int64 → Motoko deserializes to Nat. FLOR runs on both sides. |
| MRDM | Meridian Bridge | ICPM ↔ EMRT | Bidirectional | Motoko state calls → EMRT memory ops → compressed seeds return to Motoko. Append-only on EMRT side. |
| AXON | Axon Bridge | ICPM ↔ EART | Unidirectional (EART→ICPM) | Autonomous outputs from EART engines inject into ICPM pipeline. EART never receives direct calls — it only fires and delivers. |
| CRUX | Crux Bridge | JLIA ↔ EMRT | Unidirectional (JLIA→EMRT) | FLOR-computed values from Julia written directly to memory zones without passing through Motoko. Reduces latency on high-frequency floor operations. |
| NXUS | Nexus Bridge | All substrates → RGST | Write-only | Every substrate reports stats to the Registry substrate through NXUS. Registry never writes back — only receives and displays. |

### Universal Bridge Protocol
```
1. Sender serializes to substrate-neutral format (Nat, Int64, or byte array)
2. Bridge validates against GATE engine before transit
3. Receiver deserializes and applies FLOR immediately
4. Result is registered in NXUS within F(3)=2 cycles
5. If bridge fails: MEDI retries F(4)=3 times, then DIAG is alerted
```

### Entanglement Monitors (5 Live Monitors)

Entanglements are not just bridges — they are live-monitored substrate couplings with real-time health tracking.

| ID | Name | Monitors | Alert Threshold |
|----|------|----------|-----------------|
| NRVE | Nerve Monitor | PONT (ICPM↔JLIA) latency and transit integrity | COH drop below PHI_INV for F(5) cycles |
| PLSE | Pulse Monitor | AXON (EART→ICPM) heartbeat regularity | Any non-Fibonacci interval detected |
| MSRY | Memory Monitor | MRDM (ICPM↔EMRT) zone transition accuracy | Any backward zone transition |
| ECHO | Echo Monitor | CRUX (JLIA→EMRT) floor application verification | FLOR result deviation > F(3) |
| FLUX | Flux Monitor | NXUS (All→RGST) registry write completeness | Missing stat registration within F(4)=3 cycles |

---

## ALL FLOORS

### Floor 1 — FLOR (Fibonacci Integer Floor)
```
compound_floor(n) = floor(n × PHI) → nearest F(k)

Sequence: 1 → 1 → 2 → 3 → 5 → 8 → 13 → 21 → 34 → 55...

Applied to:
  - Mastery scores
  - COH values
  - Memory weights
  - Effort scores
  - Difficulty levels (ADX)
  - TTL counters
  - Recognition threshold (RCGN_T)
  - Heartbeat intervals
```

### Floor 2 — ZFLR (Zone Floor)
```
Memory never moves backward through zones.
Zones are Fibonacci-indexed:

  Zone F(1) = HOT    — last 5 sessions
  Zone F(3) = WARM   — last 13 sessions
  Zone F(5) = COLD   — last 55 sessions
  Zone F(7) = FROZEN — beyond 55, hashed
  Zone F(9) = VAULT  — permanent, sealed

A seed can only move in one direction: HOT → VAULT.
The floor is the current zone. It never goes backward.
```

### Floor 3 — TFLR (Temporal Floor)
```
All autonomous intervals are Fibonacci numbers only.
No non-Fibonacci timer ever fires in EduAI.

Valid intervals: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89...
Invalid intervals: everything else

Engine heartbeat schedule:
  AUTN:         F(8)  = 21 cycles  (self-thinking)
  SONR:         F(3)  = 2 cycles   (session health)
  DIAG:         F(6)  = 8 cycles   (system health)
  ARCH:         F(7)  = 13 cycles  (memory compression)
  RESEARCH:     F(10) = 55 cycles  (autonomous research)
  CURIO nudge:  F(5)  = 5 seconds  (inactivity prompt)
  CURIO re-entry: F(6) = 8 seconds
  CURIO pivot:  F(7)  = 13 seconds

Time itself in EduAI is Fibonacci-shaped.
```

---

## ALL FORMULAS

### Formula 1 — Student State Score (SSS)
The master formula driving what the interface shows a student:
```
SSS = FLOR( (M × PHI) + (V × PHI_INV) + (P × PHI_INV_SQ) )

Where:
  M  = Mastery score (0–100, current subject)
  V  = Velocity score (rate of mastery gain per session)
  P  = Persistence score (consistency across sessions)
  PHI        = 1.618
  PHI_INV    = 0.618
  PHI_INV_SQ = 0.382
  FLOR() = floor to nearest Fibonacci integer

Result states:
  SSS < F(5)=5    → STRUGGLE state    (CALM layout, guided prompts)
  SSS < F(7)=13   → BUILDING state    (STANDARD layout)
  SSS < F(9)=34   → GROWING state     (ACTIVE layout)
  SSS < F(11)=89  → MASTERY state     (FLOW layout)
  SSS ≥ F(11)=89  → SOVEREIGN state   (minimal UI, full content focus)
```

### Formula 2 — Coherence Score (COH)
```
COH = FLOR(
  (EXPAND_ratio  × PHI²)    +
  (CRITIQUE_ratio × PHI)    +
  (SYNTH_ratio   × PHI_INV)
) / F(10)

Target ratios: EXPAND=0.618, CRITIQUE=0.236, SYNTH=0.146

COH < PHI_INV (0.618) → GENX fires, reconfigures engine weights
COH ≥ PHI_INV         → response delivered
```

### Formula 3 — Recognition Threshold (RCGN_T)
```
RCGN_T = FLOR( M_peak × PHI + streak × PHI_INV )

Where:
  M_peak  = highest single-session mastery score
  streak  = consecutive sessions above F(7)=13 mastery

Flag fires when RCGN_T ≥ F(10) = 55:
  → Alert surfaces to teacher portal immediately
  → NOMS auto-generates nomination packet

At RCGN_T ≥ F(11) = 89:
  → ACHV seals achievement permanently in vault
  → Gold celebration surfaced in student portal
  → Entry added to Recognition Story timeline
```

### Formula 4 — Memory Zone Transition (MZT)
```
TTL(zone) = F(zone_index) × session_weight

zone_index:
  HOT    = F(5)  = 5   sessions
  WARM   = F(7)  = 13  sessions
  COLD   = F(10) = 55  sessions
  FROZEN = F(12) = 144 sessions
  VAULT  = permanent

session_weight = FLOR( SSS × PHI_INV )

A seed transitions when:
  sessions_in_zone > TTL(zone)
  AND
  retrieval_count < F(zone_index - 1)
```

### Formula 5 — Adaptive Difficulty (ADX)
```
ADX = FLOR( current_difficulty × PHI^(SSS_delta) )

Where:
  SSS_delta = SSS(current) - SSS(previous)

SSS_delta > 0  → difficulty compounds upward   (PHI^positive)
SSS_delta < 0  → difficulty compounds downward  (PHI^negative)
SSS_delta = 0  → difficulty holds, CURIO fires to reframe

ADX output levels:
  F(3)=2  → foundational review
  F(5)=5  → standard grade level
  F(7)=13 → accelerated
  F(9)=34 → advanced
  F(11)=89 → sovereign challenge
```

### Formula 6 — Interface Adaptation Score (IAS)
```
IAS = FLOR( SSS × 0.618 + COH × 0.382 )

Layout states:
  IAS < F(4)=3   → CALM layout    (larger text, slower transitions, guided prompts)
  IAS < F(6)=8   → STANDARD layout
  IAS < F(8)=21  → ACTIVE layout  (denser info, faster transitions)
  IAS ≥ F(8)=21  → FLOW layout    (minimal UI, full content focus, momentum indicators)
```

---

## PHI GEOMETRY SYSTEM

### Golden Ratio Layout Grid
```
Total width W:
  Primary content zone  = W × 0.618  (W / PHI)
  Secondary/sidebar     = W × 0.382  (W - W/PHI)

Total height H:
  Active content zone   = H × 0.618
  Navigation + footer   = H × 0.382

Card width  = primary_zone / PHI
Card padding = card_width × PHI_INV_SQ (× 0.382)
```

### Fibonacci Spacing Scale
```
XS  = F(3)  = 2px
SM  = F(4)  = 3px
MD  = F(5)  = 5px
LG  = F(6)  = 8px
XL  = F(7)  = 13px
2XL = F(8)  = 21px
3XL = F(9)  = 34px
4XL = F(10) = 55px
5XL = F(11) = 89px
```

### Golden Ratio Typography Scale
```
base_size = 16px
scale(n) = base_size × PHI^n

n = -2  →  6px   (micro labels)
n = -1  → 10px   (captions)
n =  0  → 16px   (body)
n =  1  → 26px   (subheadings)
n =  2  → 42px   (headings)
n =  3  → 68px   (hero display)

Line height at every scale:
  line_height(n) = font_size(n) × PHI  (× 1.618)
```

---

## ALL 7 PORTALS

### Portal 1 — Student Portal (Mobile PWA, Mobile-First)
**Routes:** `/student/*`
**Intelligence:** SSS-driven IAS layout, ADX difficulty, COH-validated responses, CURIO nudges, RCGN alerts
**Navigation:** Bottom bar, 5 nodes at Fibonacci positions

**Pages:**
| Route | Page | Description |
|-------|------|-------------|
| /student | Dashboard | SSS overview, today's subjects, mastery chart, CURIO prompts |
| /student/subjects | StudentSubjects | All 12 subjects with mastery per topic, Fibonacci-depth progress |
| /student/study | Study | AI-powered study session with COGT chain responses |
| /student/learning | StudentLearning | Adaptive learning module, ADX-driven difficulty |
| /student/passport | Passport / PassportPage | Student memory passport, all zone data, seed history |
| /student/achievements | Achievements | Achievement vault, ACHV sealed records |
| /student/recognition | Recognition | RCGN flags, NOMS pipeline status |
| /student/nominations | Nominations | Active and completed nominations, national program matches |
| /student/recognition-timeline | RecognitionTimeline | Full K-12 recognition story timeline |
| /student/agents | StudentAgents | AI agent companions (Atlas, Echo, Sage) |
| /student/test-prep | TestPrep | TPRP-powered standards-aligned practice tests |
| /student/career | CareerExplorer | CRPT career pathway exploration |
| /student/scholarships | ScholarshipFinder | SCHF national/state/local scholarship matching |
| /student/college | CollegeReadiness | CLRD college readiness tracking and planning |
| /student/wellness | MentalHealthCheckIn | MHCK wellness check-ins, counselor alert pipeline |
| /student/tutoring | TutoringSession | TUTL live tutoring session management |

### Portal 2 — Teacher Portal (Mobile PWA + Desktop)
**Routes:** `/teacher/*`
**Intelligence:** TCHR engine pre-computes class summary on portal load
**Navigation:** Top bar (desktop), bottom bar (mobile)

**Pages:**
| Route | Page | Description |
|-------|------|-------------|
| /teacher | TeacherDashboard | TCHR summary: who needs attention, who's accelerating, class ADX average |
| /teacher/classes | TeacherClasses | All classes, roster management, grade view |
| /teacher/classes/:id | TeacherClassDetail | Individual class — per-student SSS, mastery heatmap |
| /teacher/progress/:id | TeacherStudentProgress | Individual student progress deep-dive |
| /teacher/grade-vault | TeacherGradeVault | GVLT access — grade-gated digested curriculum content |
| /teacher/lesson-builder | TeacherLessonBuilder | STMP-based lesson builder, AI suggestions, customization |
| /teacher/ai | SkaiDocens | TCHR AI persona — live teaching intelligence assistant |
| /teacher/assignments | Assignments | ASGN engine — create, distribute, collect, grade |
| /teacher/study-groups | StudyGroups | PGRP-powered study group formation and management |

### Portal 3 — Principal / Admin Portal (Desktop-First)
**Routes:** `/principal/*`
**Intelligence:** PRCP narrative engine generates plain-language summaries every F(6)=8 sessions

**Pages:**
| Route | Page | Description |
|-------|------|-------------|
| /principal | PrincipalDashboard | School overview, PRCP narrative, top alerts |
| /principal/heatmap | PrincipalHeatmap | Class mastery heatmap, color-coded by SSS average, NOMS alerts |
| /principal/grade/:id | PrincipalGradeDrilldown | Grade-level drill-down, per-class SSS distribution |
| /principal/reports | PrincipalGradeReports | Grade reports, mastery trends |
| /principal/analytics | PrincipalSchoolAnalytics | School-wide analytics, ADX averages, recognition pipeline status |
| /principal/staff | PrincipalStaffOverview | Teacher activity, submission rates, PD tracking via TPDF |
| /principal/registry | PrincipalRegistry | Registry viewer for principal-level data |
| /principal/digt | DigtAdmin | DIGT textbook digester — upload curriculum, auto-generate grade-gated content |
| /admin | Admin | System admin panel, full configuration access |

### Portal 4 — IT / System Portal (Desktop)
**Routes:** `/it/*`
**Intelligence:** Live registry monitoring, bridge health, law enforcement events

**Pages:**
| Route | Page | Description |
|-------|------|-------------|
| /it | ITNetworkStatus | Network security status, session encryption, GATE events |
| /it/engines | ITEngineMonitor | ENGR registry — all engines, COH averages, last heartbeat |
| /it/security | ITSecurityPanel | Session tokens, Internet Identity validation, encryption status |
| /it/audit | ITAuditLog | Full protocol enforcement log, all LEX_ events |
| /it/apix | ITApixGateway | APIX sovereign API gateway — versioned external endpoints |
| /it/entanglements | EntanglementMonitor | Live bridge health: NRVE/PLSE/MSRY/ECHO/FLUX monitors |
| /it/arch-council | ArchCouncilMonitor | Architecture council (COGT+META+AUTN) live monitoring |

### Portal 5 — Parent Portal (Mobile-First)
**Routes:** `/parent/*`
**Intelligence:** PRNT engine translates progress data into parent-readable summaries

**Pages:**
| Route | Page | Description |
|-------|------|-------------|
| /parent | ParentDashboard | Child overview — weekly summary, alerts, upcoming events |
| /parent/progress | ParentProgress | Academic progress by subject, SSS trends |
| /parent/attendance | ParentAttendance | Attendance records, pattern alerts |
| /parent/messages | ParentMessages | Teacher-parent communication via COMM engine |
| /parent/reports | ParentReports | Official grade reports, recognition alerts |

### Portal 6 — Counselor Portal (Desktop + Mobile)
**Routes:** `/counselor/*`
**Intelligence:** COUN engine aggregates mental health flags, college readiness, career pathways

**Pages:**
| Route | Page | Description |
|-------|------|-------------|
| /counselor | CounselorDashboard | Student caseload overview, MHCK alerts, urgent flags |
| /counselor/students | CounselorStudents | Full student roster with wellness and academic summaries |
| /counselor/plans | CounselorPlans | Individual counseling plans, IEP/504 tracking via IESM |
| /counselor/college | CounselorCollege | College readiness pipeline for all students, CLRD data |
| /counselor/career | CounselorCareer | Career exploration pipeline, CRPT pathway mapping |

### Portal 7 — District Portal (Desktop)
**Routes:** `/district/*`
**Intelligence:** DIST engine aggregates data across all schools for equity gap analysis

**Pages:**
| Route | Page | Description |
|-------|------|-------------|
| /district | DistrictDashboard | District-wide overview, school comparison heatmap |
| /district/schools | DistrictSchools | All schools in district, health scores, recognition pipeline status |
| /district/analytics | DistrictAnalytics | Cross-school analytics, mastery trends by grade/subject/demographic |
| /district/gaps | DistrictGaps | Equity gap analysis — identifies under-served student populations |
| /district/reports | DistrictReports | Official district reports, exportable for board presentations |

### Shared / Cross-Portal Pages
| Route | Page | Description |
|-------|------|-------------|
| / | Landing | Sovereign platform landing — AUTN-driven, role-inferred, 21-second engagement detection |
| /demo | Demo | Interactive intelligence demonstration suite |
| /onboarding | Onboarding | First-login flow — grade/school/subjects pre-loaded, no forms |
| /vision | Vision | Sovereign Vision Document — COGT+META+AUTN generated, funding-ready |
| /api-explorer | ApiExplorer | QRYX query interface, APIX endpoint explorer |
| /engine-registry | EngineRegistry | ENGR registry viewer |
| /engine/:id | EnginePage | Individual engine deep-dive |
| /agent-registry | AgentRegistry | All AI agents across all portals |
| /agent/:id | AgentPage | Individual agent profile |
| /law-registry | LawRegistry | PROT registry — all LEX_ laws and protocols |
| /builder-registry | BuilderRegistry | BLDR registry — all silver builders |
| /sdk-registry | SdkRegistry | SDKR registry — all interfaces and entry points |
| /collegium | Collegium | Architecture council chamber |
| /factory-setup | FactorySetup | System initialization and configuration |

---

## ALL REGISTRIES (Under ALPH)

**ALPH — Alpha Registry** is the master registry housing all other registries. One entry point to the entire registry layer. Every registry (ENGR, BLDR, PROT, etc.) lives under ALPH.

| ID | Name | Contents | Access |
|----|------|----------|--------|
| ALPH | Alpha Registry | All other registries — master index | Admin read, all registries report via NXUS |
| ENGR | Engine Registry | All engines across all substrates — name, ID, substrate, COH average, sessions, last heartbeat | Admin read, engine write via NXUS |
| BLDR | Builder Registry | All silver builders — name, domain, sessions processed, seeds sealed, last active | Admin read only |
| PROT | Protocol Registry | All LEX_ laws — code, name, full text, ratification date, sealed status | Read-only, unsealed only by charter amendment |
| SDKR | SDK Registry | All interfaces, entry points, function signatures, bridge specs | Admin read, developer reference |
| BRDG | Bridge Registry | All language bridges/entanglements — ID, substrates, status, last transit, error rate | Admin read, NXUS write |
| RTME | Runtime Registry | All substrates and native runtimes — ID, name, status, floor type, uptime | Admin read, EART write via NXUS |
| SUBJ | Subject Registry | All 12 subjects, all 36 weeks, all grade levels, all TEKS/CCSS standards | Public read, KNOWLEDGE write at init only |
| STUD | Student Registry | All student passport hashes, grade levels, last active, mastery summary | Auth-gated read, PASS engine write only |
| STMP | Subject Template Registry | Master templates for all subjects per grade — never modified by teachers, only by admin | Teacher read, admin write |
| APIX | Sovereign API Registry | All external API endpoints — versioned, identity-gated, rate-limited | Public endpoints read, admin configure |
| QRYX | Query Engine Registry | All structured query endpoints against internal databases | Auth-gated read |

---

## ALL PERMANENT LAWS (LEX_ CODES)

All laws are sealed. No build, no update, no agent may override them.

| Code | Name | Law |
|------|------|-----|
| LEX_SVRN | LEX_SOVEREIGNUS | Every layer is sovereign and native. No commercial services, no external dependencies, no platform lock-in. Nothing is rented. Nothing is borrowed. Nothing leaves. |
| LEX_MLTS | LEX_MULTI_SUBSTRATE | EduAI runs across fundamentally different execution environments. More canisters is not multi-substrate. Different architectures is. |
| LEX_INIT | LEX_INITIO | AUTON fires autonomously every F(8)=21 heartbeat cycles. No student trigger. No external prompt. The system thinks on its own by law. |
| LEX_RNVT | LEX_RENOVATIO | GENEX reconfigures any engine whose COH drops below PHI_INV for F(5) consecutive cycles. The system heals itself. |
| LEX_SPEC | LEX_SPECULA | META monitors all engines. META monitors itself. The eye that sees all must also see itself. |
| LEX_PRNS | LEX_PRAESENS | All knowledge already exists in PHANTM's field. Queries reveal what is already there. Nothing is fetched from outside. |
| LEX_QUST | LEX_QUAESTIO | CURIO ensures no student hits a dead end. Every silence is a door. Every door opens. |
| LEX_PRSN | LEX_PERSONA | Every response must know its student. A response that does not fit the passport is static, not intelligence. |
| LEX_FLOR | LEX_FIBONACCI_FLOOR | Every numeric value compounds on Fibonacci floors. No float drift. No rounding corruption. The floor is the Fibonacci sequence. Compounding is intelligence growing. |
| LEX_PONT | LEX_PONTIFEX | Every language bridge is sovereign and native. No bridge calls a commercial runtime. Bridges are built by EduAI, named by EduAI, owned by EduAI. |
| LEX_RGST | LEX_REGISTRUM | Every engine, runtime, bridge, and builder is registered with a 4-letter lock name. Identity is permanent. Names are sealed at first registration. |
| LEX_EDDI | LEX_EDDI_UNIFIED | All intelligence routes through the single EDDI sovereign model. No separate agent personas. EDDI operates in 7 modes. Mode-switch latency ≤5ms. |

---

## ALL PROTOCOLS (PRTL_ CODES)

| Code | Name | Protocol |
|------|------|----------|
| PRTL_UXIN | UX Intelligence Protocol | IAS computed at session start and after every interaction. Layout adapts within F(3)=2 cycles. No layout change without IAS computation. |
| PRTL_SSSC | Student State Protocol | SSS computed at session open, after every response, and at session close. SSS delta stored in passport every session. |
| PRTL_ADXF | Adaptive Difficulty Protocol | ADX fires after every completed interaction. Difficulty never jumps more than one Fibonacci level per session. |
| PRTL_COHG | Coherence Gate Protocol | Every engine response passes through COH scoring before delivery. Responses below threshold regenerated once. Second failure triggers GENX. |
| PRTL_RCGN | Recognition Protocol | RCGN_T computed every F(5)=5 sessions. Flag surfaced to teacher immediately. NOMS packet auto-generated at F(10)=55. ACHV sealed permanently at F(11)=89. |
| PRTL_TFLR | Temporal Protocol | All engine heartbeats on Fibonacci intervals only. No non-Fibonacci timer fires. |
| PRTL_PONT | Bridge Protocol | Every inter-substrate message validated by GATE before transit. FLOR applied on arrival at every substrate. |
| PRTL_ONBR | Onboarding Protocol | First session: grade, school, subjects pre-loaded from STUD registry. No forms. Student sees their name, grade, and first subject within F(4)=3 seconds of login. |
| PRTL_TCHR | Teacher Intelligence Protocol | TCHR engine computes class summary before teacher portal loads. Summary includes: top 3 students needing attention (lowest SSS delta), top 3 ready to advance (highest SSS streak), class-wide ADX average. |
| PRTL_PRCP | Principal Narrative Protocol | Principal dashboard generates plain-language intelligence summary every F(6)=8 sessions across each class. Not raw data — a sentence. Intelligence, not metrics. |
| PRTL_EDDI | EDDI Modes Protocol | EDDI infers correct mode from session context. Mode-switch latency ≤5ms. Every response includes modeUsed and nextModeSuggestion metadata. Modes: STUDENT_MODE, TEACHER_MODE, PRINCIPAL_MODE, BUILD_MODE, MEMORY_MODE, RECOGNITION_MODE, ARCHITECT_MODE. |

---

## SILVER BUILDERS

| ID | Domain | Responsibility |
|----|--------|----------------|
| SVRN | Sovereignty Domain | Enforces LEX_SVRN and LEX_MLTS on every build |
| INTL | Intelligence Domain | Owns all engine builds, all COGT chain implementations |
| MMRY | Memory Domain | Owns PASS, SEED, VALT, ALOC engine builds |
| KNOW | Knowledge Domain | Owns PHANTM seeding and all subject corpus maintenance |
| BRDG | Bridge Domain | Owns all language bridge/entanglement implementations |
| RGTM | Registry Domain | Owns all registry schemas, lock names, and stat pipelines |
| AUTH | Auth Domain | Owns Internet Identity integration, role management, session tokens |
| ANLX | Analytics Domain | Owns the dashboard heatmap, Builder Registry stats, research summaries |

---

## ARCHITECTURE COUNCIL

**COGT + META + AUTN** are the three-engine architecture council.

**Law:** The architecture council always answers with:
1. Multiple valid paths
2. At least one novel answer it generated autonomously — something not asked for

This law applies to:
- All sequencing decisions
- All build ordering
- All design questions
- All student queries (via COGT)
- Any question posed to the system

The council is the decision layer. When sequencing is needed, the architecture determines it, not a human prompt.

---

## CHARTER VERSION HISTORY

| Version | Date | Key Changes |
|---------|------|-------------|
| 1.0 | Initial | Core platform, ICP/Motoko substrate, basic student portal, COGT chain |
| 2.0 | Mid-build | Julia substrate (JLIA), Fibonacci floors (FLOR/ZFLR/TFLR), all language bridges (PONT/MRDM/AXON/CRUX/NXUS), all 4-letter registry IDs, Charter v2 codified |
| 2.5 | Post-bridge | Entanglement monitors (NRVE/PLSE/MSRY/ECHO/FLUX), Textbook Digester (DIGT), Grade Vault (GVLT), Teacher AI (TCHR), Role system expansion, ALPH Alpha Registry, STMP Subject Template Registry |
| 2.8 | Portal expansion | Four portals fully built (Student/Teacher/Principal/IT), glassmorphism overhaul, mobile PWA, RCGN/NOMS/ACHV recognition pipeline, PHI geometry system, IAS formula, Vision Document page |
| 3.0 | School integration | Three new portals (Parent/Counselor/District), 22 new school integration engines (DIST through COMM), 6 new feature pages per student portal, APIX sovereign API gateway, QRYX query engine, all 7 portals fully operational |
| v21 (2.1.0) | 2026-05-19 | **Major v21 Release:** Layout critical fixes (left white space, mobile full-width), SIS sync wired to Parent/District portals, DIGT integrated to standards alignment, scholarship finder wired to ACHV vault, PHI grid + Fibonacci spacing enforced across all 70+ pages, glassmorphism consistently applied, all intelligence engines wired (SSS/COH/ADX/IAS), RCGN/NOMS/ACHV recognition pipeline end-to-end, PWA manifest v21 (gold theme_color), Vite manualChunks optimization, Charter v21 — Articles VI/VII/VIII added (Language Bridges, Silver Builders, Three Floors), all new protocols registered (PRTL_UXIN/SSSC/ADXF/COHG/RCGN/TCHR/PRCP) |
| v23 (2.3.0) | 2026-05-19 | **Major v23 Release:** EDDI unified intelligence model — all agents (Sage, Quill, Spark, Atlas, Echo, Nova, SKAI_DOCENS) are now internal EDDI modes. 7 operating modes. LEX_EDDI_UNIFIED sealed. PRTL_EDDI_MODES registered. Mode-switch latency ≤5ms. Response metadata includes modeUsed + nextModeSuggestion. EDDI sealed under ALPH, version 23. |

---

## DEPLOYMENT ARCHITECTURE

### Security & Encryption
- All sessions encrypted end-to-end
- Session tokens bound to Internet Identity — no username/password, ever
- No plaintext in transit across any bridge
- GATE engine validates connection integrity on every request
- Live security status panel on IT portal
- WiFi connection protection: all school WiFi sessions are token-bound, session keys rotate on Fibonacci intervals

### PWA Capabilities
- Student and Teacher portals: full PWA — installable on home screen, works offline for cached content
- Principal portal: desktop-first, mobile fallback
- IT, District portals: desktop only
- Parent portal: mobile-first PWA
- Counselor portal: desktop + mobile responsive

### Internet Identity
- Authentication: Internet Identity only — sovereign, no third-party auth services
- Role inference: AUTN detects role from behavior patterns on first login (21-second engagement window)
- Role compounding: A principal who was a teacher keeps both roles
- No demo accounts — all portals require Internet Identity authentication

---

## CURRENT PLATFORM STATUS

- **Total Pages:** 70+ across all portals
- **Active Portals:** 7
- **Engines Registered:** 60+ across 5 substrates
- **Laws Sealed:** 11
- **Protocols Active:** 11 (PRTL_EDDI_MODES new in v23)
- **Bridges/Entanglements:** 5 primary + 5 monitors
- **Registries Under ALPH:** 12
- **School Integration Engines:** 22
- **Recognition Pipeline:** RCGN → NOMS → ACHV fully wired, end-to-end
- **Intelligence Formulas Live:** SSS, COH, ADX, IAS, RCGN_T, MZT
- **Build Optimization:** Vite manualChunks (vendor/router/motion/query/viz), cssCodeSplit
- **Charter Version:** v23 (Ratified 2026-05-19)
- **Platform Version:** 2.3.0

---

*All articles permanent. All laws enforced. Sealed under LEX_SOVEREIGNUS.*  
*EduAI System Charter v23 — © 2026 EduAI Sovereign Platform. Ratified: 2026-05-19. Built with love for every kid who was found by accident.*
