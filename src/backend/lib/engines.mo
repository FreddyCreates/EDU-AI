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
      platformRole = "Powers the platform's natural language understanding pipeline — tokenizes all student inputs, generates lesson summaries, drives the chat interface response synthesis, and provides the NLU backbone for EDDI's text generation across all user-facing chat and content surfaces.";
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
      platformRole = "Drives semantic search across all curriculum content, powers the 'related topics' recommendations, enables concept-map proximity calculations, and provides embedding-based similarity matching for the adaptive learning pathways and knowledge graph navigation.";
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
      platformRole = "Powers the platform's decision logic for adaptive quiz generation, drives the inference engine behind mastery assessments, determines prerequisite chains for curriculum sequencing, and provides reasoning validation for student proof-based answers.";
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
      platformRole = "Handles all data transformation pipelines across the platform — converts raw session data into structured KERNEL_SEEDs, transforms curriculum standards into lesson formats, powers the content adaptation layer that reshapes materials for different grade levels and learning modes.";
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
      platformRole = "Generates all platform text output — lesson explanations, feedback messages, recognition citations, report narratives, and doctrine documents. Powers the voice-to-text input system, drives the text-to-speech output for accessibility, and produces all AI-written content students and teachers see.";
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
      platformRole = "Powers the platform's generative content creation systems — auto-generates quiz questions from lesson content, creates personalized practice problems, spawns new curriculum modules from seed topics, and drives the user-agent creation pipeline where students build their own AI assistants.";
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
      platformRole = "Manages all platform memory systems — the sovereign passport KERNEL_SEED store, session history compounding, spaced-repetition scheduling, student knowledge state persistence, and the compound-score calculations that determine mastery progression across the entire learning lifecycle.";
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
      platformRole = "Orchestrates cross-engine coordination — routes multi-step tasks across SYNTHOS, VEKTOR, PHAEDRUS, and other engines in parallel, manages the engine dependency graph, handles failover and load balancing between ML subsystems, and provides the unified API surface that all frontend features call through.";
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
      platformRole = "The platform's primary intent router — classifies every student message to determine which engine handles the request, manages session context switching, powers the 'what do you want to learn?' onboarding flow, and provides the intelligent dispatch layer between user input and backend ML systems.";
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
      platformRole = "Powers the platform's knowledge persistence layer — compresses session transcripts into storable artifacts, generates the 5-format output pipeline (seed/kernel/doctrine/artifact/scroll), manages the sovereign memory vault ingestion, and ensures zero knowledge loss across student sessions.";
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
      platformRole = "The central AI model powering every user interaction on the platform — all chat responses, lesson generation, adaptive feedback, recognition logic, and intelligent routing flow through EDDI. It is the single unified model behind every persona (Atlas, Echo, COGT, META, AUTN) and every mode (Student, Teacher, Principal, Builder, Memory, Recognition, Architect).";
    },
    {
      id = 12;
      codeName = "PERCEPT";
      fullName = "The Perception Engine";
      domain = "How AI sees and interprets visual information through convolutional networks";
      description = "PERCEPT is the eye of sovereign intelligence. It processes raw pixels into structured understanding — detecting edges, shapes, objects, and scenes. Students learn that vision is not passive reception but active construction: the brain builds sight layer by layer, from simple gradients to complex recognition.";
      mathFoundation = "Convolutional operations + pooling hierarchies + feature map composition + spatial invariance through stride and dilation";
      teachingMethod = "Layer-by-layer vision — students feed images through progressive convolutional filters, watching raw pixels transform into edges, then textures, then objects, building intuition for hierarchical feature extraction.";
      lessonsAvailable = [
        "How AI Sees: Pixels to Patterns",
        "What is a Convolution?",
        "Edge Detection: The First Layer of Sight",
        "From Features to Objects",
        "Percept Lab: Train Your AI to See",
      ];
      status = #active;
      platformRole = "Powers the platform's visual processing pipeline — handles image-based content recognition for uploaded worksheets and documents, drives the diagram analysis system for STEM subjects, enables visual quiz formats, and provides the computer vision backbone for document scanning and handwriting recognition features.";
    },
    {
      id = 13;
      codeName = "AURIS";
      fullName = "The Auditory Engine";
      domain = "How AI hears and understands sound through spectral analysis and sequence modeling";
      description = "AURIS is the ear of sovereign intelligence. It transforms raw waveforms into spectrograms, phonemes, and meaning. Students discover that sound is structured time — and AI learns to decode temporal patterns just as the human ear resolves frequency into language, music, and intent.";
      mathFoundation = "Fourier transforms + mel-frequency cepstral coefficients + recurrent sequence modeling + temporal convolutions";
      teachingMethod = "Waveform decomposition — students break audio into frequency bands, visualize spectrograms, and trace how temporal patterns become recognized speech, music, or environmental sound.";
      lessonsAvailable = [
        "How AI Hears: Waves to Words",
        "The Fourier Transform Explained",
        "Spectrograms: Seeing Sound",
        "From Phonemes to Language",
        "Auris Lab: Teach Your AI to Listen",
      ];
      status = #active;
      platformRole = "Drives the platform's audio intelligence layer — powers voice-input for hands-free learning sessions, enables pronunciation assessment for language courses, processes audio uploads for music and language lessons, and provides real-time speech-to-text transcription for accessibility across all user interfaces.";
    },
    {
      id = 14;
      codeName = "NEXUS";
      fullName = "The Connection Engine";
      domain = "How AI models relationships through graph neural networks and relational reasoning";
      description = "NEXUS maps the invisible web of relationships between all things. People, ideas, molecules, cities — everything exists in connection. Students learn that intelligence is not just about individual entities but about the structure of their bonds. NEXUS teaches relational reasoning as the foundation of understanding complex systems.";
      mathFoundation = "Graph theory + message passing algorithms + adjacency matrices + spectral graph convolutions + relational attention";
      teachingMethod = "Graph construction — students build knowledge graphs node by node, define edges as relationships, and observe how message-passing propagates understanding across the network.";
      lessonsAvailable = [
        "What is a Graph?",
        "Nodes, Edges, and Relationships",
        "How AI Reasons About Connections",
        "Message Passing: Information Flow",
        "Nexus Lab: Build a Knowledge Graph",
      ];
      status = #active;
      platformRole = "Powers the platform's knowledge graph and concept map systems — computes prerequisite relationships between curriculum topics, drives the social learning connections between students, enables the entanglement system linking related concepts across subjects, and provides the graph-based reasoning behind learning pathway recommendations.";
    },
    {
      id = 15;
      codeName = "TEMPUS";
      fullName = "The Temporal Engine";
      domain = "How AI predicts and understands sequences through time-series modeling";
      description = "TEMPUS is the sovereign clock of intelligence. It governs prediction across time — from weather patterns to stock movements to human behavior. Students learn that the future is not random; it is shaped by the patterns of the past. TEMPUS teaches the mathematics of sequence, periodicity, and forecasting.";
      mathFoundation = "Recurrent architectures + attention over time steps + autoregressive prediction + periodicity detection + exponential smoothing";
      teachingMethod = "Temporal unfolding — students feed sequential data through time-aware models, observe how past states inform future predictions, and build intuition for why some sequences are predictable and others are chaotic.";
      lessonsAvailable = [
        "What is a Sequence?",
        "Patterns in Time: Periodicity",
        "How AI Predicts the Future",
        "Memory Across Time Steps",
        "Tempus Lab: Forecast a Sequence",
      ];
      status = #active;
      platformRole = "Drives all time-based intelligence on the platform — predicts optimal study session timing via spaced-repetition scheduling, forecasts student performance trajectories for teacher dashboards, powers the attendance pattern detection system, and provides temporal analytics for principal and district reporting on learning trends.";
    },
    {
      id = 16;
      codeName = "ETHICA";
      fullName = "The Ethics Engine";
      domain = "How AI navigates moral reasoning, bias detection, and alignment with human values";
      description = "ETHICA is the conscience of sovereign intelligence. It does not tell students what is right — it teaches them to reason about what could go wrong. Bias, fairness, alignment, harm — every AI system carries moral weight. ETHICA equips students to identify, measure, and mitigate ethical risks in any model they build.";
      mathFoundation = "Fairness metrics (demographic parity, equalized odds) + bias quantification + utility functions + Pareto optimality in multi-stakeholder systems";
      teachingMethod = "Ethical stress-testing — students examine real AI systems for bias, measure fairness across demographic groups, and design mitigation strategies that balance competing values.";
      lessonsAvailable = [
        "What is AI Bias?",
        "Measuring Fairness in Models",
        "When AI Gets It Wrong: Harm Cases",
        "Alignment: Teaching AI Human Values",
        "Ethica Lab: Audit a Model for Bias",
      ];
      status = #active;
      platformRole = "The platform's fairness and safety guardian — continuously audits all AI-generated content for bias, ensures equitable treatment across demographic groups in adaptive learning, monitors assessment fairness, enforces content safety policies, and provides the ethical reasoning layer that prevents harmful or biased outputs from reaching students.";
    },
    {
      id = 17;
      codeName = "ADVERSA";
      fullName = "The Adversarial Engine";
      domain = "How AI learns through competition, adversarial training, and generative adversarial networks";
      description = "ADVERSA is the engine of creative conflict. Two networks — one that creates, one that judges — locked in an eternal contest that produces ever-more-realistic output. Students learn that competition is not destruction; it is refinement. The generator and discriminator forge each other into brilliance through opposition.";
      mathFoundation = "Minimax game theory + Nash equilibrium + discriminator loss functions + generator gradient flow + mode collapse analysis";
      teachingMethod = "Adversarial play — students build generator-discriminator pairs, watch them compete in real time, and learn to diagnose training instabilities like mode collapse and vanishing gradients.";
      lessonsAvailable = [
        "What is Adversarial Learning?",
        "Generator vs Discriminator",
        "The Minimax Game",
        "Mode Collapse and Training Stability",
        "Adversa Lab: Build a GAN",
      ];
      status = #active;
      platformRole = "Powers the platform's quality assurance and robustness systems — generates adversarial test cases for quiz validation, stress-tests content generation for edge cases, drives the anti-cheating detection system by modeling adversarial student behavior, and hardens all ML outputs against manipulation or gaming.";
    },
    {
      id = 18;
      codeName = "REINFORA";
      fullName = "The Reinforcement Engine";
      domain = "How AI learns from reward signals through trial, error, and policy optimization";
      description = "REINFORA teaches intelligence through consequence. There is no teacher — only an environment, an action, and a reward signal. Students learn that the most powerful form of learning requires no labeled data: just the courage to act, the discipline to observe outcomes, and the patience to refine strategy over thousands of iterations.";
      mathFoundation = "Markov decision processes + Bellman equations + policy gradients + temporal difference learning + reward shaping";
      teachingMethod = "Environment interaction — students design reward functions, watch agents explore state spaces, and observe how policies emerge from pure trial and error without any human instruction.";
      lessonsAvailable = [
        "What is Reinforcement Learning?",
        "States, Actions, and Rewards",
        "The Bellman Equation Explained",
        "Policy vs Value: Two Paths to Intelligence",
        "Reinfora Lab: Train an Agent to Play",
      ];
      status = #active;
      platformRole = "Drives the platform's adaptive optimization systems — tunes the difficulty curve of lesson sequences based on student reward signals (engagement, completion, mastery), optimizes the notification and engagement timing policies, powers the gamification reward loops, and continuously improves platform UX through behavioral feedback optimization.";
    },
    {
      id = 19;
      codeName = "DIFFUSA";
      fullName = "The Diffusion Engine";
      domain = "How AI generates new content through noise-to-signal diffusion processes";
      description = "DIFFUSA is the engine of emergence from chaos. It begins with pure noise and, step by step, sculpts signal into existence. Students learn the profound insight that creation is denoising — the masterpiece already exists within the noise; the model's job is to reveal it. Every image, every sound, every molecule can be born from structured diffusion.";
      mathFoundation = "Stochastic differential equations + score matching + denoising autoencoders + noise schedules + variational bounds";
      teachingMethod = "Denoising walkthrough — students observe the forward process (signal → noise) then reverse it step by step, building intuition for how structure emerges from randomness through learned gradients.";
      lessonsAvailable = [
        "What is Diffusion?",
        "Noise as a Starting Point",
        "The Forward and Reverse Process",
        "How AI Creates Images from Nothing",
        "Diffusa Lab: Generate from Noise",
      ];
      status = #active;
      platformRole = "Powers the platform's generative media systems — creates custom illustrations for lessons, generates visual aids and diagrams on-demand, produces unique reward imagery for the recognition system, and provides the creative generation backbone for all visual content that students and teachers interact with.";
    },
    {
      id = 20;
      codeName = "CLASSIFICO";
      fullName = "The Classification Engine";
      domain = "How AI categorizes, labels, and sorts information through supervised learning and pattern recognition";
      description = "CLASSIFICO is the engine of order. It takes the raw chaos of unstructured data and assigns it meaning through labels, categories, and taxonomies. Students learn that classification is the first act of intelligence — before you can reason about something, you must know what it is. CLASSIFICO teaches the mathematics of boundaries, separations, and confident decisions under uncertainty.";
      mathFoundation = "Softmax probability distributions + cross-entropy loss + support vector margins + decision boundaries in feature space + Bayesian posterior inference";
      teachingMethod = "Boundary drawing — students define categories, label examples, train classifiers from scratch, and observe how decision boundaries form and shift as more data arrives, building intuition for confidence, uncertainty, and the cost of misclassification.";
      lessonsAvailable = [
        "What is Classification?",
        "Labels, Categories, and Taxonomies",
        "How AI Draws Decision Boundaries",
        "Confidence and Uncertainty in Predictions",
        "Classifico Lab: Train Your Own Classifier",
      ];
      status = #active;
      platformRole = "The platform's universal classification backbone — categorizes student submissions by subject and topic, labels learning content by difficulty and standard alignment, powers the automated grading rubric system, classifies student questions for intent routing, drives the content moderation pipeline, and provides multi-label tagging for the entire curriculum library.";
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
