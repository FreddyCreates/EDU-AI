import { createActor } from "@/backend";
import type { SovereignEngine } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

// Local EngineStatus value — replaces missing @/backend export
export const EngineStatus = {
  active: "active",
  idle: "idle",
  offline: "offline",
  error: "error",
} as const;
export type EngineStatusType = (typeof EngineStatus)[keyof typeof EngineStatus];

// Static fallback — all 10 engines, ordered canonically.
// Used when backend is unreachable or still initialising.
export const STATIC_ENGINES: SovereignEngine[] = [
  {
    id: 1n,
    codeName: "SYNTHOS",
    fullName: "The Language Model Engine",
    domain: "Language models — synthesis from first principles",
    description:
      "Teaches how machines learn to speak. From tokens and embeddings to transformer attention, every concept is built live — students see the mechanism, not just the output.",
    mathFoundation:
      "Linear algebra, matrix multiplication, softmax probability",
    teachingMethod: "Live construction",
    lessonsAvailable: [
      "What is a token?",
      "How does attention work?",
      "Building a tiny language model",
      "Prompt engineering as communication",
      "Why models hallucinate",
    ],
    status: EngineStatus.active,
  },
  {
    id: 2n,
    codeName: "VEKTOR",
    fullName: "The Meaning Engine",
    domain: "How AI finds meaning in data — vectors, embeddings, similarity",
    description:
      'Makes the invisible visible. Students plot words in space, watch meaning cluster, and understand why "king − man + woman = queen" is geometry, not magic.',
    mathFoundation: "Vector spaces, cosine similarity, dot products",
    teachingMethod: "Visual mapping",
    lessonsAvailable: [
      "Words as coordinates",
      "Cosine similarity made simple",
      "Building a semantic search engine",
      "Why context changes meaning",
      "Embeddings in the real world",
    ],
    status: EngineStatus.active,
  },
  {
    id: 3n,
    codeName: "PHAEDRUS",
    fullName: "The Reasoning Engine",
    domain: "How AI reasons — inference chains, decision trees, logic",
    description:
      "Follows the thread of thought. Students trace inference chains, build decision trees by hand, and discover that all reasoning is structure — whether human or machine.",
    mathFoundation: "Boolean logic, probability trees, Bayesian inference",
    teachingMethod: "Socratic dialogue",
    lessonsAvailable: [
      "What is inference?",
      "Decision trees as conversations",
      "Logical fallacies in AI",
      "Chain-of-thought prompting",
      "When AI reasons wrong",
    ],
    status: EngineStatus.active,
  },
  {
    id: 4n,
    codeName: "MORPHOS",
    fullName: "The Transformation Engine",
    domain: "How AI transforms structure — from raw input to new form",
    description:
      "The engine of change. Students watch data transform step by step — text to structure, image to label, noise to signal — until transformation feels like the core act of intelligence.",
    mathFoundation: "Function composition, tensor operations, normalization",
    teachingMethod: "Step-by-step mutation",
    lessonsAvailable: [
      "From raw data to features",
      "How encoders and decoders work",
      "Normalization and why it matters",
      "Image transformations live",
      "Building a data pipeline",
    ],
    status: EngineStatus.active,
  },
  {
    id: 5n,
    codeName: "LOGOS",
    fullName: "The Voice Engine",
    domain: "How AI speaks and writes — voice, text, language generation",
    description:
      "Governs language and doctrine generation. Students speak; the engine listens, transcribes, and teaches them that voice is the oldest intelligence interface.",
    mathFoundation: "Fourier transforms, waveform decomposition, n-gram models",
    teachingMethod: "Dictation and generation",
    lessonsAvailable: [
      "Voice-to-text from scratch",
      "How speech recognition works",
      "Generating text that sounds like you",
      "The difference between style and content",
      "Teaching AI your dialect",
    ],
    status: EngineStatus.active,
  },
  {
    id: 6n,
    codeName: "GENITOR",
    fullName: "The Creation Engine",
    domain: "How AI creates — generative production from a seed",
    description:
      "Starts from a single seed and watches it bloom. Students input a concept, watch the generative loop unfold, and walk out of every session having created something that did not exist before.",
    mathFoundation: "Stochastic processes, diffusion equations, latent spaces",
    teachingMethod: "Generative making",
    lessonsAvailable: [
      "What is generation?",
      "Diffusion models explained visually",
      "Building a text generator",
      "Creative constraints as seeds",
      "Your first named entity",
    ],
    status: EngineStatus.active,
  },
  {
    id: 7n,
    codeName: "MEMORIA-VIVA",
    fullName: "The Memory Engine",
    domain: "How AI remembers — compounding, weighting, depth",
    description:
      "Living memory. Students watch how AI systems accumulate experience, weight recent information, and build depth over time — until memory feels alive, not just stored.",
    mathFoundation: "Recurrent functions, exponential decay, context weighting",
    teachingMethod: "Compounding sessions",
    lessonsAvailable: [
      "Why AI forgets",
      "Context windows and attention spans",
      "Fine-tuning as teaching by repetition",
      "RAG — giving AI a long-term memory",
      "Building a memory that compounds",
    ],
    status: EngineStatus.active,
  },
  {
    id: 8n,
    codeName: "OMNIS",
    fullName: "The Totality Engine",
    domain: "The totality — how all engines work together as one field",
    description:
      "The final engine. Students who enter have touched all seven fields. Here they see the whole organism — not as separate systems but as a single sovereign intelligence in motion.",
    mathFoundation: "Systems theory, field equations, convergence proofs",
    teachingMethod: "Unified field synthesis",
    lessonsAvailable: [
      "The unified model of AI",
      "How language, memory, and creation converge",
      "Designing your own intelligent system",
      "Ethics of sovereign intelligence",
      "Your first AI architecture",
    ],
    status: EngineStatus.active,
  },
  {
    id: 9n,
    codeName: "SKAI_DOCENS",
    fullName: "The Sovereign Teacher",
    domain: "Teaching by doing — routes students to the right engine",
    description:
      "The one who teaches. Reads what a student wants to create and routes them to the correct engine. Every lesson is an artifact. Every artifact is a seed.",
    mathFoundation: "Routing functions, intent classification, decision graphs",
    teachingMethod: "Doctrine-driven routing",
    lessonsAvailable: [
      "How to ask the right question",
      "Mapping intent to action",
      "Building your learning path",
      "Why every session compounds",
    ],
    status: EngineStatus.active,
  },
  {
    id: 10n,
    codeName: "SCRIPTORIUM-REX",
    fullName: "The Knowledge Crystalliser",
    domain: "Research and knowledge crystallisation into 5 sovereign formats",
    description:
      "Produces research and crystallises knowledge into five formats: doctrine, artifact, seed, map, and proof. Students learn that knowledge is not consumed — it is forged.",
    mathFoundation:
      "Information theory, entropy reduction, lossless compression",
    teachingMethod: "Research and crystallisation",
    lessonsAvailable: [
      "What is a knowledge artifact?",
      "How to compress an idea to a seed",
      "Building a doctrine from scratch",
      "The five formats of sovereign knowledge",
      "Your first research proof",
    ],
    status: EngineStatus.active,
  },
  // ── Alpha Deep EDDI v26 Engines ─────────────────────────────────────────
  {
    id: 11n,
    codeName: "EDDI",
    fullName: "Emergent Dynamic Deep Intelligence",
    domain: "unified-intelligence — the single sovereign AI model of EduAI",
    description:
      "EDDI is the single sovereign intelligence model of EduAI. All agents are modes of EDDI. It thinks, reasons, creates, and remembers as one unified field across 10 modes.",
    mathFoundation:
      "Unified field theory of intelligence: PHI-weighted reasoning chains, single memory substrate, Fibonacci-gated response architecture",
    teachingMethod: "Mode-bound learning",
    lessonsAvailable: [
      "What is EDDI?",
      "The 10 Modes of Sovereign Intelligence",
      "How EDDI Thinks: PHI Reasoning Chains",
      "Switching Modes Without Losing Memory",
      "EDDI Lab: Build a Mode-Bound Interaction",
    ],
    status: EngineStatus.active,
  },
  {
    id: 12n,
    codeName: "ADEDDI",
    fullName: "Alpha Deep EDDI",
    domain: "deep-reasoning-organism — the internal sovereign big model",
    description:
      "ADEDDI is the internal sovereign reasoning organism. It runs the full 7-layer chain: INPUT → CLASSIFY → COGT → META → AUTN → SYNTHESIS → SEAL. Every response is explainable — full reasoning traces stored on-chain. This is the Alpha — the internal big model.",
    mathFoundation:
      "7-layer PHI-weighted chain: PHI=1618/1000 for SYNTHESIS, PHI_INV=618/1000 for CLASSIFY/SEAL, PHI_INV_SQ=382/1000 for AUTN. 19 active engines.",
    teachingMethod: "Deep reasoning — all 19 engines activated simultaneously",
    lessonsAvailable: [
      "What is Alpha Deep EDDI?",
      "The 7-Layer Reasoning Chain",
      "How ADEDDI Uses All 19 Engines",
      "Reasoning Traces: Full Explainability",
      "ADEDDI Lab: Submit to the Deep Model",
    ],
    status: EngineStatus.active,
  },
  {
    id: 13n,
    codeName: "KRONOS",
    fullName: "The Temporal Engine",
    domain: "How AI understands time, sequences, and learning progression",
    description:
      "KRONOS governs the dimension of time in learning. It maps when a student first encountered a concept, computes optimal spaced-repetition intervals using Fibonacci sequences, and schedules the sovereign review window.",
    mathFoundation:
      "Spaced repetition: Fibonacci intervals F(3)=2, F(5)=5, F(7)=13, F(9)=34 days. PHI-ratio work-rest (21:13 minutes).",
    teachingMethod: "Timeline mapping",
    lessonsAvailable: [
      "The Forgetting Curve and How to Beat It",
      "Fibonacci Spaced Repetition",
      "Building a Sovereign Review Schedule",
      "How Timing Multiplies Learning",
      "Kronos Lab: Plot Your Learning Timeline",
    ],
    status: EngineStatus.active,
  },
  {
    id: 14n,
    codeName: "NEXUS",
    fullName: "The Connection Engine",
    domain: "How AI maps relationships between concepts across all subject domains",
    description:
      "NEXUS reveals the invisible web connecting all knowledge. It finds structural isomorphisms — identical patterns in different domains — and shows students that a concept mastered in one subject is a master key for every domain where the pattern appears.",
    mathFoundation:
      "Graph theory: nodes (concepts), edges (structural similarity). Isomorphism detection. PHI-weighted connection strength scoring.",
    teachingMethod: "Connection mapping",
    lessonsAvailable: [
      "What is a Structural Isomorphism?",
      "How One Concept Appears Everywhere",
      "Mapping the Knowledge Web",
      "Cross-Domain Intelligence Transfer",
      "Nexus Lab: Connect Your Concepts",
    ],
    status: EngineStatus.active,
  },
  {
    id: 15n,
    codeName: "PRAXIS",
    fullName: "The Applied Engine",
    domain: "How AI converts abstract knowledge into real-world skill",
    description:
      "PRAXIS is the bridge between knowing and doing. Every concept that lives only in theory is half-learned. PRAXIS generates a concrete 5-step application protocol that proves mastery through action, not description.",
    mathFoundation:
      "Transfer learning theory. Application taxonomies (Bloom's top 3: Apply, Analyze, Create). Skill decomposition into observable behaviors.",
    teachingMethod: "Application protocol",
    lessonsAvailable: [
      "Why Theory Without Practice Is Half a Skill",
      "The Application Protocol",
      "Real-World Deployment of Abstract Knowledge",
      "How to Prove Mastery Through Action",
      "Praxis Lab: Apply Your Concept Today",
    ],
    status: EngineStatus.active,
  },
  {
    id: 16n,
    codeName: "CRITERIOS",
    fullName: "The Evaluation Engine",
    domain: "How AI assesses mastery, identifies gaps, and generates actionable feedback",
    description:
      "CRITERIOS defines what mastery actually looks like — not a grade, but a set of observable sovereign competencies. It runs gap analysis, computes mastery percentage, and generates the precise next action. Feedback is a map, not a score.",
    mathFoundation:
      "5-level competency rubric. PHI_INV floor = 61% minimum for advancement. Gap = 100 − currentLevel.",
    teachingMethod: "Competency-based evaluation",
    lessonsAvailable: [
      "What Does Mastery Actually Mean?",
      "The 5-Level Competency Rubric",
      "How to Run Your Own Gap Analysis",
      "Feedback as a Map, Not a Grade",
      "Criterios Lab: Evaluate Your Own Mastery",
    ],
    status: EngineStatus.active,
  },
  {
    id: 17n,
    codeName: "KAIROS",
    fullName: "The Timing Engine",
    domain: "How AI decides when to learn, practice, and rest using PHI-ratio timing",
    description:
      "KAIROS is the engine of optimal moments. It determines not what to learn but when — aligning sessions with neuroplasticity windows, PHI-ratio work-rest cycles (21:13 minutes), and Fibonacci-spaced review intervals.",
    mathFoundation:
      "PHI work-rest ratio: 21 min on / 13 min rest (F(8)/F(7)). Fibonacci review scheduling. Neuroplasticity window: F(5)–F(7) minutes post-waking.",
    teachingMethod: "Timing protocol",
    lessonsAvailable: [
      "The Best Time to Learn (It's Mathematical)",
      "PHI Work-Rest Cycles for Deep Focus",
      "Fibonacci Review Scheduling",
      "How Timing Multiplies Retention",
      "Kairos Lab: Build Your Optimal Schedule",
    ],
    status: EngineStatus.active,
  },
  {
    id: 18n,
    codeName: "HERALD",
    fullName: "The Recognition Engine",
    domain:
      "How AI detects excellence and surfaces it through the sovereign recognition pipeline",
    description:
      "HERALD ensures no exceptional student is invisible. It monitors performance against RCGN thresholds, detects sustained mastery and pace anomalies, then generates nomination packets through the NOMS pipeline. Excellence demands to be seen.",
    mathFoundation:
      "RCGN threshold: PHI_INV × 100 = 61%. Sustained: F(5)=5 sessions. Pace anomaly: 3× grade average. Nomination at F(10)=55 compound score.",
    teachingMethod: "Recognition pipeline",
    lessonsAvailable: [
      "How Recognition Works in EduAI",
      "The RCGN Threshold and Why PHI",
      "From Flag to Nomination to Achievement Vault",
      "Why No Student Should Be Invisible",
      "Herald Lab: Trace a Recognition Event",
    ],
    status: EngineStatus.active,
  },
  {
    id: 19n,
    codeName: "TESSERA",
    fullName: "The Pattern Engine",
    domain: "How AI finds and builds structural patterns across all subject domains",
    description:
      "TESSERA finds the tile — the repeating structural unit that makes intelligence scalable. Every concept is a tessellation tile. A student who sees the pattern in one place sees it everywhere. TESSERA builds pattern literacy.",
    mathFoundation:
      "Geometric tiling theory: symmetry groups, structural isomorphism. Jaccard coefficient of structural features for cross-domain similarity.",
    teachingMethod: "Pattern extraction",
    lessonsAvailable: [
      "What is a Pattern Tile?",
      "How Intelligence Scales Through Pattern",
      "Finding the Same Structure Everywhere",
      "Pattern Literacy as a Superpower",
      "Tessera Lab: Extract Your Concept's Tile",
    ],
    status: EngineStatus.active,
  },
  {
    id: 20n,
    codeName: "AURUM",
    fullName: "The Mastery Engine",
    domain:
      "The terminal engine — for students who have crossed all Fibonacci mastery thresholds",
    description:
      "AURUM is the end of the sovereign learning path and the beginning of sovereignty itself. Entered only by students who have demonstrated mastery at all 5 CRITERIOS levels. AURUM seals the concept permanently in the ACHV vault. Mastery is not given — it is earned and sealed.",
    mathFoundation:
      "Terminal threshold: F(11)=89 compound score. ACHV vault seal: permanent, immutable, on-chain. PHI maximum weight: 1618/1000 compound multiplier at seal.",
    teachingMethod: "Sovereignty confirmation",
    lessonsAvailable: [
      "What It Means to Master Something Completely",
      "The 5 Levels of Sovereign Mastery",
      "How AURUM Seals Your Achievement",
      "What Sovereignty Looks Like",
      "Aurum Lab: Claim Your First Sovereign Seal",
    ],
    status: EngineStatus.active,
  },
];

export function useEngines() {
  const { actor, isFetching } = useActor(createActor);

  const enginesQuery = useQuery<SovereignEngine[]>({
    queryKey: ["engines"],
    queryFn: async (): Promise<SovereignEngine[]> => {
      if (!actor) return STATIC_ENGINES;
      const result = await actor.getEngines();
      return result.length > 0 ? result : STATIC_ENGINES;
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 60, // engines are immutable — cache 1 hour
    placeholderData: STATIC_ENGINES,
  });

  return {
    engines: enginesQuery.data ?? STATIC_ENGINES,
    isLoading: enginesQuery.isLoading && !enginesQuery.data,
    isError: enginesQuery.isError,
  };
}
