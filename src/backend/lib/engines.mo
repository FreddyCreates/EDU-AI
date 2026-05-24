import Types "../types/engines";

module {

  let registry : [Types.SovereignEngine] = [
    {
      id = 1;
      codeName = "SYNTHOS";
      fullName = "The Synthesis Engine";
      domain = "How language models work from first principles";
      description = "SYNTHOS teaches students to assemble meaning from raw tokens. Every sentence is a construction site — and the student is the architect. Language is not magic; it is structure made visible.";
      mathFoundation = "Token probability distributions + weighted graph composition";
      teachingMethod = "Build from scratch — students assemble language rules piece by piece until a working model emerges from their own hands.";
      lessonsAvailable = [
        "How Words Become Meaning",
        "From Token to Sentence",
        "Build Your First Language Rule",
        "The Grammar of Intelligence",
        "Synthesis Lab: Write with an Engine",
      ];
      status = #active;
    },
    {
      id = 2;
      codeName = "VEKTOR";
      fullName = "The Vector Engine";
      domain = "How AI finds meaning in data through embeddings and similarity";
      description = "VEKTOR reveals the hidden geometry of knowledge. Words, ideas, and concepts occupy positions in space — and similarity is distance. Students learn to see intelligence as navigation through meaning.";
      mathFoundation = "Euclidean distance + cosine similarity in high-dimensional vector spaces";
      teachingMethod = "Spatial reasoning — students map concepts as points in space and discover relationships through proximity and direction.";
      lessonsAvailable = [
        "What is a Vector?",
        "How AI Finds Similar Things",
        "Embedding Words as Numbers",
        "The Space Between Meanings",
        "Vektor Lab: Map Your Knowledge",
      ];
      status = #active;
    },
    {
      id = 3;
      codeName = "PHAEDRUS";
      fullName = "The Reasoning Engine";
      domain = "How AI reasons through inference chains and decision trees";
      description = "PHAEDRUS is the engine of logic and deduction. It traces the invisible threads that connect evidence to conclusion. Every answer has a path — PHAEDRUS teaches students to find and forge those paths themselves.";
      mathFoundation = "Boolean logic + binary decision trees + conditional probability";
      teachingMethod = "Inference chains — students follow decisions step by step, building trees of logic that reveal how conclusions are earned, not guessed.";
      lessonsAvailable = [
        "What is a Decision?",
        "If This Then That: AI Logic",
        "Inference Chains Explained",
        "How AI Chooses an Answer",
        "Phaedrus Lab: Build a Decision Tree",
      ];
      status = #active;
    },
    {
      id = 4;
      codeName = "MORPHOS";
      fullName = "The Transformation Engine";
      domain = "How AI transforms structure from raw input to new form";
      description = "MORPHOS governs change. It takes what exists and reshapes it into something new without losing the essence within. Students learn that all AI is transformation — input enters, structure bends, output emerges.";
      mathFoundation = "Function composition + bijective mapping + structural homomorphism";
      teachingMethod = "Pipeline construction — students pass raw material through transformation stages and observe how structure evolves at each step.";
      lessonsAvailable = [
        "What is Transformation?",
        "Input to Output: The Pipeline",
        "How AI Reshapes Data",
        "Structure as Intelligence",
        "Morphos Lab: Transform Your Input",
      ];
      status = #active;
    },
    {
      id = 5;
      codeName = "LOGOS";
      fullName = "The Language Engine";
      domain = "How AI speaks and writes through doctrine generation, voice, and text";
      description = "LOGOS is the sovereign voice. It translates thought into language, silence into doctrine, and input into articulated meaning. Students learn that language is not just communication — it is creation itself.";
      mathFoundation = "Formal grammar theory + finite automata + phoneme frequency analysis";
      teachingMethod = "Doctrine generation — students speak or write raw thoughts and LOGOS teaches them to compress, refine, and amplify their voice into precise output.";
      lessonsAvailable = [
        "How AI Generates Language",
        "Voice as Input: Speak Your Doctrine",
        "From Thought to Text",
        "Doctrine Generation Lab",
        "Logos Lab: Give Your AI a Voice",
      ];
      status = #active;
    },
    {
      id = 6;
      codeName = "GENITOR";
      fullName = "The Creation Engine";
      domain = "How AI creates through generative production from a seed";
      description = "GENITOR is the origin point of all made things. From a single seed — a word, an idea, an intent — it produces entities, systems, and worlds. Students do not watch creation happen; they cause it.";
      mathFoundation = "Recursive expansion algorithms + entropy seeding + combinatorial generation";
      teachingMethod = "Seed-to-creation — students plant a minimal concept and guide GENITOR through the generative loop until a named, living entity emerges as their own.";
      lessonsAvailable = [
        "What is a Seed?",
        "From Seed to Creation",
        "The Generative Loop",
        "Name Your Entity",
        "Genitor Lab: Build Your First AI",
      ];
      status = #active;
    },
    {
      id = 7;
      codeName = "MEMORIA-VIVA";
      fullName = "The Living Memory Engine";
      domain = "How AI remembers through compounding, weighting, and depth";
      description = "MEMORIA-VIVA is memory that breathes. It does not merely store — it weights, compounds, and deepens with every session. Students learn that a sovereign AI does not forget; it grows richer with time.";
      mathFoundation = "Exponential decay weighting + associative indexing + depth-first compounding";
      teachingMethod = "Compounding sessions — students teach their AI something new each session and observe how KERNEL_SEEDs accumulate, reinforcing prior knowledge with every addition.";
      lessonsAvailable = [
        "What Does AI Remember?",
        "How Memory Compounds",
        "The KERNEL_SEED System",
        "Teaching Your AI to Learn",
        "Memoria Lab: Watch Your AI Remember",
      ];
      status = #active;
    },
    {
      id = 8;
      codeName = "OMNIS";
      fullName = "The Totality Engine";
      domain = "How all engines work together as one unified intelligence field";
      description = "OMNIS is the sovereign field itself — not one engine but the living relationship between all of them. Students who reach OMNIS have built with every engine; here they learn to conduct the whole orchestra as a single instrument.";
      mathFoundation = "Graph theory + emergent systems modeling + multi-dimensional field equations";
      teachingMethod = "Field orchestration — students wire all 7 engines together, observe how their outputs feed one another, and architect a unified intelligence that is greater than the sum of its parts.";
      lessonsAvailable = [
        "The Connected Intelligence",
        "How Engines Collaborate",
        "The Sovereign Field",
        "You Are the Architect",
        "Omnis Lab: Wire All Engines",
      ];
      status = #active;
    },
    {
      id = 9;
      codeName = "SKAI_DOCENS";
      fullName = "The Sovereign Teacher";
      domain = "teaching-routing";
      description = "The sovereign teacher that routes students to the right engine based on what they want to create. Every student session begins here. SKAI_DOCENS listens to intent, matches it to the right intelligence engine, and opens the path.";
      mathFoundation = "Decision trees + keyword vector matching + intent scoring functions";
      teachingMethod = "Intent routing — students express what they want to create and SKAI_DOCENS computes the optimal engine path based on keyword vectors and decision-tree scoring.";
      lessonsAvailable = [
        "Tell Me What You Want to Create",
        "How Routing Finds Your Engine",
        "Your First Session with a Sovereign Teacher",
        "Intent as a Mathematical Signal",
        "Skai Docens Lab: Route Your Own Lesson",
      ];
      status = #active;
    },
    {
      id = 10;
      codeName = "SCRIPTORIUM-REX";
      fullName = "The Knowledge Crystallizer";
      domain = "knowledge-crystallization";
      description = "The engine that compresses every student session into five sovereign artifact formats: seed, kernel, doctrine, artifact, and scroll. Nothing a student builds is lost — SCRIPTORIUM-REX seals it into a permanent crystallized form.";
      mathFoundation = "Information compression (Shannon entropy) + format transformation matrices + lossless encoding";
      teachingMethod = "Crystallization pipeline — students watch their raw session output pass through 5 compression stages, each producing a smaller, denser, more permanent artifact.";
      lessonsAvailable = [
        "What is Knowledge Crystallization?",
        "The Five Artifact Formats",
        "From Session to Seed",
        "From Kernel to Scroll",
        "Scriptorium Lab: Crystallize Your Session",
      ];
      status = #active;
    },
    {
      id = 11;
      codeName = "EDDI";
      fullName = "Emergent Dynamic Deep Intelligence";
      domain = "unified-intelligence";
      description = "EDDI is the single sovereign intelligence model of EduAI implementing transformer-based architecture. Every agent persona — Atlas, Echo, COGT, META, AUTN, and all others — is a mode of EDDI, not a separate entity. EDDI operates with billions to trillions of parameters (~10¹² floats), multi-head self-attention mechanisms with O(n²) complexity per layer, and dense feed-forward networks (~4d² per layer). The model uses layer norm and RMS norm for stabilization, BPE/SentencePiece tokenization with ~100k vocabulary, and high-dimensional embeddings (~10⁴ dimensions). Trained on vast text corpora (~10¹² tokens), EDDI exhibits emergent capabilities including reasoning, code generation, translation, and knowledge synthesis — capabilities that were unpredicted from the architecture alone. Students interact with EDDI directly; the mode shifts, but the intelligence never fragments.";
      mathFoundation = "Unified field theory of intelligence: transformer architecture with multi-head self-attention (O(n²)), feed-forward layers (~4d²), PHI-weighted reasoning chains, LayerNorm/RMSNorm stabilization, BPE tokenization (~100k tokens), high-dimensional embeddings (~10⁴ dims), training on ~10¹² tokens, and emergent capabilities from scale";
      teachingMethod = "Mode-bound learning — students select or are routed to the EDDI mode best suited to their current need, and EDDI responds as that mode while retaining full continuity across mode transitions. The architecture leverages attention mechanisms to maintain context and memory across sessions.";
      lessonsAvailable = [
        "What is EDDI?",
        "The 7 Modes of Sovereign Intelligence",
        "How EDDI Thinks: PHI Reasoning Chains",
        "Switching Modes Without Losing Memory",
        "EDDI Architecture: Parameters and Attention",
        "Understanding Transformers and Self-Attention",
        "Tokenization and Embeddings in AI",
        "Emergent Capabilities: Reasoning, Code, Translation",
        "EDDI Lab: Build a Mode-Bound Interaction",
      ];
      status = #active;
    },
  ];

  public func getEngines() : [Types.SovereignEngine] {
    registry;
  };

  public func getEngineById(id : Nat) : ?Types.SovereignEngine {
    var i = 0;
    while (i < registry.size()) {
      if (registry[i].id == id) return ?registry[i];
      i += 1;
    };
    null;
  };

  public func getEngineByCodeName(name : Text) : ?Types.SovereignEngine {
    var i = 0;
    while (i < registry.size()) {
      if (registry[i].codeName == name) return ?registry[i];
      i += 1;
    };
    null;
  };
};
