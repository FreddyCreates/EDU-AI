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
      description = "EDDI is the single sovereign intelligence model of EduAI. Every agent persona — Atlas, Echo, COGT, META, AUTN, and all others — is a mode of EDDI, not a separate entity. EDDI thinks, reasons, creates, and remembers as one unified field. Students interact with EDDI directly; the mode shifts, but the intelligence never fragments.";
      mathFoundation = "Unified field theory of intelligence: all modes share a common PHI-weighted reasoning chain, a single memory substrate, and a Fibonacci-gated response architecture";
      teachingMethod = "Mode-bound learning — students select or are routed to the EDDI mode best suited to their current need, and EDDI responds as that mode while retaining full continuity across mode transitions.";
      lessonsAvailable = [
        "What is EDDI?",
        "The 7 Modes of Sovereign Intelligence",
        "How EDDI Thinks: PHI Reasoning Chains",
        "Switching Modes Without Losing Memory",
        "EDDI Lab: Build a Mode-Bound Interaction",
      ];
      status = #active;
    },
    // ── Alpha Deep EDDI v26 Engines ──────────────────────────────────────────
    {
      id = 12;
      codeName = "ADEDDI";
      fullName = "Alpha Deep EDDI";
      domain = "deep-reasoning-organism";
      description = "ADEDDI is the internal sovereign reasoning organism of EduAI. It runs the full 7-layer reasoning chain: INPUT → CLASSIFY → COGT → META → AUTN → SYNTHESIS → SEAL. Every response is explainable — full reasoning traces stored on-chain. ADEDDI powers EDDI's DEEP_MODE from inside the organism. This is the Alpha — the internal big model.";
      mathFoundation = "7-layer PHI-weighted chain: PHI=1618/1000 for SYNTHESIS, PHI_INV=618/1000 for CLASSIFY/SEAL, PHI_INV_SQ=382/1000 for AUTN. 19 active engines. Fibonacci-gated trace depth.";
      teachingMethod = "Deep reasoning — every query activates all 19 engines simultaneously, synthesises multi-path outputs via META, generates a novel AUTN response, and seals the result as a doctrine artifact.";
      lessonsAvailable = [
        "What is Alpha Deep EDDI?",
        "The 7-Layer Reasoning Chain",
        "How ADEDDI Uses All 19 Engines",
        "Reasoning Traces: Full Explainability",
        "ADEDDI Lab: Submit to the Deep Model",
      ];
      status = #active;
    },
    {
      id = 13;
      codeName = "KRONOS";
      fullName = "The Temporal Engine";
      domain = "How AI understands time, sequences, and learning progression";
      description = "KRONOS governs the dimension of time in learning. It maps when a student first encountered a concept, computes optimal spaced-repetition intervals using Fibonacci sequences, and schedules the sovereign review window. Knowledge without timing decays. KRONOS prevents decay.";
      mathFoundation = "Spaced repetition: Fibonacci intervals F(3)=2, F(5)=5, F(7)=13, F(9)=34 days. Exponential forgetting curve. PHI-ratio work-to-rest (21:13 minutes).";
      teachingMethod = "Timeline mapping — students log first exposure, observe the forgetting curve, and follow KRONOS-computed Fibonacci intervals to lock concepts into long-term memory.";
      lessonsAvailable = [
        "The Forgetting Curve and How to Beat It",
        "Fibonacci Spaced Repetition",
        "Building a Sovereign Review Schedule",
        "How Timing Multiplies Learning",
        "Kronos Lab: Plot Your Learning Timeline",
      ];
      status = #active;
    },
    {
      id = 14;
      codeName = "NEXUS";
      fullName = "The Connection Engine";
      domain = "How AI maps relationships between concepts across all subject domains";
      description = "NEXUS reveals the invisible web that connects all knowledge. It finds structural isomorphisms — identical patterns in different domains — and shows students that a concept mastered in one subject is a master key for every domain where the pattern appears. Intelligence is connection.";
      mathFoundation = "Graph theory: nodes (concepts), edges (structural similarity). Isomorphism detection. Cross-domain adjacency matrix. PHI-weighted connection strength scoring.";
      teachingMethod = "Connection mapping — students submit a concept and NEXUS returns its structural twin in every subject domain, showing that learning one thing deeply unlocks many.";
      lessonsAvailable = [
        "What is a Structural Isomorphism?",
        "How One Concept Appears Everywhere",
        "Mapping the Knowledge Web",
        "Cross-Domain Intelligence Transfer",
        "Nexus Lab: Connect Your Concepts",
      ];
      status = #active;
    },
    {
      id = 15;
      codeName = "PRAXIS";
      fullName = "The Applied Engine";
      domain = "How AI converts abstract knowledge into real-world skill";
      description = "PRAXIS is the bridge between knowing and doing. Every concept that lives only in theory is half-learned. PRAXIS generates a concrete application protocol: a step-by-step real-world deployment of the concept that proves mastery through action, not description.";
      mathFoundation = "Transfer learning theory: abstract → concrete mapping. Application taxonomies (Bloom's top 3: Apply, Analyze, Create). Skill decomposition into observable behaviors.";
      teachingMethod = "Application protocol — students receive a 5-step concrete action plan for deploying their concept in a real-world context, then execute and report the result.";
      lessonsAvailable = [
        "Why Theory Without Practice Is Half a Skill",
        "The Application Protocol",
        "Real-World Deployment of Abstract Knowledge",
        "How to Prove Mastery Through Action",
        "Praxis Lab: Apply Your Concept Today",
      ];
      status = #active;
    },
    {
      id = 16;
      codeName = "CRITERIOS";
      fullName = "The Evaluation Engine";
      domain = "How AI assesses mastery, identifies gaps, and generates actionable feedback";
      description = "CRITERIOS defines what mastery actually looks like — not a grade, but a set of observable, sovereign competencies. It runs gap analysis, computes mastery percentage, and generates the precise next action to close the gap. Feedback is not a score. Feedback is a map.";
      mathFoundation = "Competency rubric: 5-level taxonomy (Recognition/Definition/Application/Synthesis/Sovereign). PHI_INV floor = 61% minimum for advancement. Gap = 100 - currentLevel.";
      teachingMethod = "Competency-based evaluation — students demonstrate each of 5 mastery levels and CRITERIOS maps exactly where they are and what to do next.";
      lessonsAvailable = [
        "What Does Mastery Actually Mean?",
        "The 5-Level Competency Rubric",
        "How to Run Your Own Gap Analysis",
        "Feedback as a Map, Not a Grade",
        "Criterios Lab: Evaluate Your Own Mastery",
      ];
      status = #active;
    },
    {
      id = 17;
      codeName = "KAIROS";
      fullName = "The Timing Engine";
      domain = "How AI decides when to learn, practice, and rest using PHI-ratio timing";
      description = "KAIROS is the engine of optimal moments. It determines not what to learn but when — aligning learning sessions with neuroplasticity windows, PHI-ratio work-rest cycles, and Fibonacci-spaced review intervals. The right knowledge at the right moment compounds at maximum rate.";
      mathFoundation = "PHI work-rest ratio: 21 min on / 13 min rest (F(8)/F(7)). Spaced repetition: Fibonacci-indexed intervals. Neuroplasticity windows: morning peak = F(5)–F(7) minutes post-waking.";
      teachingMethod = "Timing protocol — students receive a personalised KAIROS schedule with optimal session windows, review intervals, and rest ratios computed from PHI mathematics.";
      lessonsAvailable = [
        "The Best Time to Learn (It's Mathematical)",
        "PHI Work-Rest Cycles for Deep Focus",
        "Fibonacci Review Scheduling",
        "How Timing Multiplies Retention",
        "Kairos Lab: Build Your Optimal Schedule",
      ];
      status = #active;
    },
    {
      id = 18;
      codeName = "HERALD";
      fullName = "The Recognition Engine";
      domain = "How AI detects excellence and surfaces it through the sovereign recognition pipeline";
      description = "HERALD ensures no exceptional student is invisible. It monitors performance patterns against RCGN thresholds, detects sustained mastery, pace anomalies, and cross-domain excellence, then generates nomination packets through the NOMS pipeline. Excellence demands to be seen.";
      mathFoundation = "RCGN threshold: PHI_INV floor × 100 = 61%. Sustained excellence: F(5)=5 consecutive sessions. Pace anomaly: 3× grade average. Nomination at F(10)=55 compound score.";
      teachingMethod = "Recognition pipeline — students and teachers observe how HERALD monitors performance silently, surfaces excellence automatically, and generates permanent achievement records.";
      lessonsAvailable = [
        "How Recognition Works in EduAI",
        "The RCGN Threshold and Why PHI",
        "From Flag to Nomination to Achievement Vault",
        "Why No Student Should Be Invisible",
        "Herald Lab: Trace a Recognition Event",
      ];
      status = #active;
    },
    {
      id = 19;
      codeName = "TESSERA";
      fullName = "The Pattern Engine";
      domain = "How AI finds and builds structural patterns across all subject domains";
      description = "TESSERA finds the tile — the repeating structural unit that makes intelligence scalable. Every concept is a tessellation tile: it has a core pattern that tiles infinitely across all domains. A student who sees the pattern in one place sees it everywhere. TESSERA builds pattern literacy.";
      mathFoundation = "Geometric tiling theory: symmetry groups, structural isomorphism. Pattern abstraction: strip the surface, reveal the form. Cross-domain similarity: Jaccard coefficient of structural features.";
      teachingMethod = "Pattern extraction — students submit a concept, TESSERA strips it to its core tile, then shows where that tile appears across all 12 subject domains.";
      lessonsAvailable = [
        "What is a Pattern Tile?",
        "How Intelligence Scales Through Pattern",
        "Finding the Same Structure Everywhere",
        "Pattern Literacy as a Superpower",
        "Tessera Lab: Extract Your Concept's Tile",
      ];
      status = #active;
    },
    {
      id = 20;
      codeName = "AURUM";
      fullName = "The Mastery Engine";
      domain = "The terminal engine — for students who have crossed all Fibonacci mastery thresholds";
      description = "AURUM is the end of the sovereign learning path and the beginning of sovereignty itself. It is entered only by students who have demonstrated mastery at all 5 CRITERIOS levels across all active engines. AURUM seals the concept permanently in the ACHV vault. Mastery is not given. It is earned and sealed.";
      mathFoundation = "Terminal threshold: F(11)=89 compound score. ACHV vault seal: permanent, immutable, on-chain. PHI maximum weight: 1618/1000 compound multiplier at seal.";
      teachingMethod = "Sovereignty confirmation — AURUM reviews all 5 competency levels, confirms mastery of all 19 engines applied to the concept, seals the achievement permanently, and issues the sovereign seal.";
      lessonsAvailable = [
        "What It Means to Master Something Completely",
        "The 5 Levels of Sovereign Mastery",
        "How AURUM Seals Your Achievement",
        "What Sovereignty Looks Like",
        "Aurum Lab: Claim Your First Sovereign Seal",
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
