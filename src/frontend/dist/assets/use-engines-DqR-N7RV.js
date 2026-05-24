import { f as useActor, h as createActor } from "./index-BivnQ6bB.js";
import { a as useQuery } from "./query-8urnerR0.js";
const EngineStatus = {
  active: "active"
};
const STATIC_ENGINES = [
  {
    id: 1n,
    codeName: "SYNTHOS",
    fullName: "The Language Model Engine",
    domain: "Language models — synthesis from first principles",
    description: "Teaches how machines learn to speak. From tokens and embeddings to transformer attention, every concept is built live — students see the mechanism, not just the output.",
    mathFoundation: "Linear algebra, matrix multiplication, softmax probability",
    teachingMethod: "Live construction",
    lessonsAvailable: [
      "What is a token?",
      "How does attention work?",
      "Building a tiny language model",
      "Prompt engineering as communication",
      "Why models hallucinate"
    ],
    status: EngineStatus.active
  },
  {
    id: 2n,
    codeName: "VEKTOR",
    fullName: "The Meaning Engine",
    domain: "How AI finds meaning in data — vectors, embeddings, similarity",
    description: 'Makes the invisible visible. Students plot words in space, watch meaning cluster, and understand why "king − man + woman = queen" is geometry, not magic.',
    mathFoundation: "Vector spaces, cosine similarity, dot products",
    teachingMethod: "Visual mapping",
    lessonsAvailable: [
      "Words as coordinates",
      "Cosine similarity made simple",
      "Building a semantic search engine",
      "Why context changes meaning",
      "Embeddings in the real world"
    ],
    status: EngineStatus.active
  },
  {
    id: 3n,
    codeName: "PHAEDRUS",
    fullName: "The Reasoning Engine",
    domain: "How AI reasons — inference chains, decision trees, logic",
    description: "Follows the thread of thought. Students trace inference chains, build decision trees by hand, and discover that all reasoning is structure — whether human or machine.",
    mathFoundation: "Boolean logic, probability trees, Bayesian inference",
    teachingMethod: "Socratic dialogue",
    lessonsAvailable: [
      "What is inference?",
      "Decision trees as conversations",
      "Logical fallacies in AI",
      "Chain-of-thought prompting",
      "When AI reasons wrong"
    ],
    status: EngineStatus.active
  },
  {
    id: 4n,
    codeName: "MORPHOS",
    fullName: "The Transformation Engine",
    domain: "How AI transforms structure — from raw input to new form",
    description: "The engine of change. Students watch data transform step by step — text to structure, image to label, noise to signal — until transformation feels like the core act of intelligence.",
    mathFoundation: "Function composition, tensor operations, normalization",
    teachingMethod: "Step-by-step mutation",
    lessonsAvailable: [
      "From raw data to features",
      "How encoders and decoders work",
      "Normalization and why it matters",
      "Image transformations live",
      "Building a data pipeline"
    ],
    status: EngineStatus.active
  },
  {
    id: 5n,
    codeName: "LOGOS",
    fullName: "The Voice Engine",
    domain: "How AI speaks and writes — voice, text, language generation",
    description: "Governs language and doctrine generation. Students speak; the engine listens, transcribes, and teaches them that voice is the oldest intelligence interface.",
    mathFoundation: "Fourier transforms, waveform decomposition, n-gram models",
    teachingMethod: "Dictation and generation",
    lessonsAvailable: [
      "Voice-to-text from scratch",
      "How speech recognition works",
      "Generating text that sounds like you",
      "The difference between style and content",
      "Teaching AI your dialect"
    ],
    status: EngineStatus.active
  },
  {
    id: 6n,
    codeName: "GENITOR",
    fullName: "The Creation Engine",
    domain: "How AI creates — generative production from a seed",
    description: "Starts from a single seed and watches it bloom. Students input a concept, watch the generative loop unfold, and walk out of every session having created something that did not exist before.",
    mathFoundation: "Stochastic processes, diffusion equations, latent spaces",
    teachingMethod: "Generative making",
    lessonsAvailable: [
      "What is generation?",
      "Diffusion models explained visually",
      "Building a text generator",
      "Creative constraints as seeds",
      "Your first named entity"
    ],
    status: EngineStatus.active
  },
  {
    id: 7n,
    codeName: "MEMORIA-VIVA",
    fullName: "The Memory Engine",
    domain: "How AI remembers — compounding, weighting, depth",
    description: "Living memory. Students watch how AI systems accumulate experience, weight recent information, and build depth over time — until memory feels alive, not just stored.",
    mathFoundation: "Recurrent functions, exponential decay, context weighting",
    teachingMethod: "Compounding sessions",
    lessonsAvailable: [
      "Why AI forgets",
      "Context windows and attention spans",
      "Fine-tuning as teaching by repetition",
      "RAG — giving AI a long-term memory",
      "Building a memory that compounds"
    ],
    status: EngineStatus.active
  },
  {
    id: 8n,
    codeName: "OMNIS",
    fullName: "The Totality Engine",
    domain: "The totality — how all engines work together as one field",
    description: "The final engine. Students who enter have touched all seven fields. Here they see the whole organism — not as separate systems but as a single sovereign intelligence in motion.",
    mathFoundation: "Systems theory, field equations, convergence proofs",
    teachingMethod: "Unified field synthesis",
    lessonsAvailable: [
      "The unified model of AI",
      "How language, memory, and creation converge",
      "Designing your own intelligent system",
      "Ethics of sovereign intelligence",
      "Your first AI architecture"
    ],
    status: EngineStatus.active
  },
  {
    id: 9n,
    codeName: "SKAI_DOCENS",
    fullName: "The Sovereign Teacher",
    domain: "Teaching by doing — routes students to the right engine",
    description: "The one who teaches. Reads what a student wants to create and routes them to the correct engine. Every lesson is an artifact. Every artifact is a seed.",
    mathFoundation: "Routing functions, intent classification, decision graphs",
    teachingMethod: "Doctrine-driven routing",
    lessonsAvailable: [
      "How to ask the right question",
      "Mapping intent to action",
      "Building your learning path",
      "Why every session compounds"
    ],
    status: EngineStatus.active
  },
  {
    id: 10n,
    codeName: "SCRIPTORIUM-REX",
    fullName: "The Knowledge Crystalliser",
    domain: "Research and knowledge crystallisation into 5 sovereign formats",
    description: "Produces research and crystallises knowledge into five formats: doctrine, artifact, seed, map, and proof. Students learn that knowledge is not consumed — it is forged.",
    mathFoundation: "Information theory, entropy reduction, lossless compression",
    teachingMethod: "Research and crystallisation",
    lessonsAvailable: [
      "What is a knowledge artifact?",
      "How to compress an idea to a seed",
      "Building a doctrine from scratch",
      "The five formats of sovereign knowledge",
      "Your first research proof"
    ],
    status: EngineStatus.active
  }
];
function useEngines() {
  const { actor, isFetching } = useActor(createActor);
  const enginesQuery = useQuery({
    queryKey: ["engines"],
    queryFn: async () => {
      if (!actor) return STATIC_ENGINES;
      const result = await actor.getEngines();
      return result.length > 0 ? result : STATIC_ENGINES;
    },
    enabled: !!actor && !isFetching,
    staleTime: 1e3 * 60 * 60,
    // engines are immutable — cache 1 hour
    placeholderData: STATIC_ENGINES
  });
  return {
    engines: enginesQuery.data ?? STATIC_ENGINES,
    isLoading: enginesQuery.isLoading && !enginesQuery.data,
    isError: enginesQuery.isError
  };
}
export {
  EngineStatus as E,
  STATIC_ENGINES as S,
  useEngines as u
};
