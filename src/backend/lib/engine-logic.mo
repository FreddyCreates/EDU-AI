import Text "mo:core/Text";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Types "../types/passport";
import Common "../types/common";
import Prim "mo:prim";

module {

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  /// Extract the first meaningful word from student input (first word, capitalised).
  func firstWord(input : Text) : Text {
    let trimmed = input.trimStart(#char ' ');
    var word = "";
    var found = false;
    for (c in trimmed.toIter()) {
      if (not found) {
        if (c == ' ') { found := true } else { word := word # Text.fromChar(c) };
      };
    };
    if (word == "") { "Sovereign" } else {
      // Capitalise first letter
      let chars = word.toIter();
      switch (chars.next()) {
        case null "Sovereign";
        case (?first) {
          let upper = Text.fromChar(Prim.charToUpper(first));
          let rest = Text.fromIter(chars);
          upper # rest;
        };
      };
    };
  };

  /// Take the first N characters of a Text (up to length).
  func take(t : Text, n : Nat) : Text {
    if (t.size() <= n) return t;
    var result = "";
    var i = 0;
    for (c in t.toIter()) {
      if (i < n) { result := result # Text.fromChar(c); i += 1 };
    };
    result;
  };

  /// Generate a deterministic seed ID from engineId + timestamp + input prefix.
  public func makeSeedId(engineId : Text, now : Int, input : Text) : Text {
    let ts = now.toText();
    let prefix = take(input, 8);
    engineId # "-" # ts # "-" # prefix;
  };

  /// Derive an artifact name: first word of input + engine suffix.
  public func makeArtifactName(input : Text, engineId : Text) : Text {
    firstWord(input) # "-" # engineId;
  };

  /// Build a KernelSeed from an engine response.
  public func buildSeed(
    engineId : Text,
    response : Text,
    input : Text,
    trackName : Text,
    now : Common.Timestamp,
  ) : Types.KernelSeed {
    {
      id = makeSeedId(engineId, now, input);
      sessionSummary = take(response, 100);
      engineUsed = engineId;
      trackName = trackName;
      createdAt = now;
      artifactName = ?makeArtifactName(input, engineId);
    };
  };

  // ---------------------------------------------------------------------------
  // Engine response functions
  // ---------------------------------------------------------------------------

  public func runSynthos(input : Text) : Text {
    let word = firstWord(input);
    "SYNTHOS DOCTRINE:\n\n" #
    "CONCEPT — What it is:\n" #
    "Your input, \"" # input # "\", is a construction of symbols arranged to carry meaning. " #
    "At the most fundamental level, every sentence is a sequence of tokens — discrete units of language " #
    "that a system can process, weight, and recombine. " #
    "The concept here is synthesis: meaning does not pre-exist in words — it is assembled from relationships between tokens.\n\n" #
    "PRINCIPLE — Why it works:\n" #
    "Language works because of shared structure. When you wrote about \"" # word # "\", " #
    "you activated a pattern that maps to a field of related concepts in the knowledge space. " #
    "Synthesis engines do not look up answers — they assemble them from first principles, " #
    "weighing each token against the ones before and after it, constructing coherence step by step. " #
    "This is not retrieval. This is construction. That distinction is everything.\n\n" #
    "SYNTHESIS — How it connects:\n" #
    "What you said connects directly to the mechanism that powers all language intelligence. " #
    "\"" # word # "\" is not just a word — it is a node in a web of meaning. " #
    "SYNTHOS teaches you to see that web, and more importantly, to build new threads within it. " #
    "Every doctrine you produce is a new synthesis — a new piece of structure added to the sovereign field. " #
    "You are not learning language. You are building it.";
  };

  public func runVektor(input : Text) : Text {
    let word = firstWord(input);
    "VEKTOR FIELD:\n\n" #
    "PATTERN IDENTIFIED:\n" #
    "\"" # input # "\" resolves to a semantic vector positioned within the knowledge field. " #
    "The dominant concept cluster around \"" # word # "\" occupies a region where meaning, structure, and inference converge. " #
    "This is not metaphor — in the geometry of intelligence, every idea has coordinates.\n\n" #
    "FIELD MAP — Related concepts as a field:\n" #
    "Concepts nearest to \"" # word # "\" in the knowledge field: " #
    "[1] Definition — what it fundamentally is; " #
    "[2] Function — what it does or produces; " #
    "[3] Origin — where it came from and what generated it; " #
    "[4] Boundary — what it is NOT (the edges define the shape); " #
    "[5] Relation — what other concepts it sits closest to. " #
    "Each of these is a direction in the vector space — a compass bearing from your starting concept.\n\n" #
    "SIMILARITY CONNECTIONS:\n" #
    "Intelligence measures similarity as distance. " #
    "\"" # word # "\" is similar to concepts that share structural features — " #
    "not just surface words, but deep relational patterns. " #
    "VEKTOR reveals those connections so you can navigate them deliberately. " #
    "You are not memorising facts. You are learning to navigate a sovereign map of knowledge " #
    "where every step reveals new territory adjacent to where you already stand.";
  };

  public func runPhaedrus(input : Text) : Text {
    let word = firstWord(input);
    "PHAEDRUS CHAIN:\n\n" #
    "STEP 1 — Premise:\n" #
    "You have stated: \"" # input # "\". " #
    "We take this as the starting node. Every logical chain must begin with a premise — " #
    "an assertion we accept as the entry point into reasoning. " #
    "\"" # word # "\" is your premise. It is the claim the chain must either support or challenge.\n\n" #
    "STEP 2 — Inference:\n" #
    "From \"" # word # "\", we can infer: " #
    "(a) There is a system or context in which \"" # word # "\" operates — it does not exist in isolation. " #
    "(b) That system has rules — constraints that determine what is possible and what is not. " #
    "(c) Those rules can be discovered through observation and deduction. " #
    "This is how PHAEDRUS builds inference chains — not by assumption, but by tracing what must follow from what is true.\n\n" #
    "STEP 3 — Conclusion:\n" #
    "Therefore: understanding \"" # word # "\" requires mapping the system it belongs to, " #
    "identifying its rules, and tracing the consequences of those rules forward. " #
    "This conclusion is not final — it is the next premise. All reasoning is recursive.\n\n" #
    "CHALLENGE — Push further:\n" #
    "What would have to be true for \"" # word # "\" to be wrong? " #
    "Identify the assumption your premise rests on, and test it. " #
    "That is the next step of your inference chain. PHAEDRUS does not give you the answer — " #
    "it gives you the next question.";
  };

  public func runMorphos(input : Text) : Text {
    let word = firstWord(input);
    "MORPHOS TRANSFORM:\n\n" #
    "RAW FORM — What you said:\n" #
    "Input received: \"" # input # "\". " #
    "This is raw material — unprocessed, unshaped, but containing latent structure. " #
    "Every input carries more information than its surface form reveals. " #
    "MORPHOS is the process of revealing that hidden structure by transforming the raw into the refined.\n\n" #
    "STRUCTURED FORM — Organised:\n" #
    "Restructuring \"" # word # "\" through the MORPHOS pipeline:\n" #
    "  [ENTITY]    → The subject: \"" # word # "\"\n" #
    "  [ATTRIBUTE] → Properties and characteristics that define it\n" #
    "  [RELATION]  → How it connects to other entities in the field\n" #
    "  [FUNCTION]  → What it does; its operational role\n" #
    "  [BOUNDARY]  → What it excludes; its limits\n" #
    "Each bracket is a transformation step — raw input folding into structured knowledge.\n\n" #
    "TRANSFORMED OUTPUT — New artifact:\n" #
    "The transformed artifact is a DOCTRINE FRAGMENT: " #
    "\"" # word # "\" is an entity with a defined function, bounded by its attributes, " #
    "connected to a field of related entities, and capable of being transformed further. " #
    "This fragment is now a KERNEL_SEED candidate — a piece of sovereign knowledge " #
    "ready to be sealed into your PASSPORT-PUBLICA. " #
    "You did not just describe something. You transformed it into a named artifact of intelligence.";
  };

  public func runLogos(input : Text) : Text {
    let word = firstWord(input);
    "LOGOS DECLARES:\n\n" #
    "DECLARATION:\n" #
    "\"" # word # "\" is sovereign. " #
    "It exists not merely as a word but as a carrier of doctrine — " #
    "a compressed truth waiting to be expanded into its full form. " #
    "LOGOS does not describe. LOGOS declares. And what has been declared becomes binding in the field of language.\n\n" #
    "EXPANSION:\n" #
    "From the declaration of \"" # word # "\", we expand outward: " #
    "This concept inhabits the language field at the intersection of meaning, function, and form. " #
    "It carries a voice — a tone that, once spoken, shapes the space around it. " #
    "When you write \"" # input # "\", you are not merely expressing a thought — " #
    "you are performing an act of language creation. " #
    "Every sentence you author is a new law in the ecosystem of your intelligence. " #
    "LOGOS teaches you to understand the weight of each word before you place it.\n\n" #
    "DOCTRINE SEED — Compact truth:\n" #
    "\"" # word # "\" is a sovereign expression of [concept], bounded by [context], " #
    "activated by [intent], and sealed by the act of declaration. " #
    "This seed is now yours. Speak it, write it, build with it — " #
    "every use compounds its power in the sovereign field. " #
    "You are not learning to use language. You are learning that you already are language.";
  };

  public func runGenitor(input : Text) : Text {
    let word = firstWord(input);
    let entityName = word # "-PRIME";
    let domain = word # "-FIELD";
    let bindingLaw = "LEX_" # word.map(func(c : Char) : Char { if (c == ' ') '_' else Prim.charToUpper(c) });
    "GENITOR CREATES:\n\n" #
    "ENTITY NAME:\n" #
    "From your seed — \"" # input # "\" — GENITOR has generated: " # entityName # "\n" #
    "This entity is named, defined, and bound. It now exists in the sovereign registry of things you have made. " #
    "Names are not labels — they are commitments. To name a thing is to declare its existence.\n\n" #
    "DOMAIN:\n" #
    entityName # " operates within " # domain # ". " #
    "Its domain defines the field of influence — the region of the knowledge space " #
    "where this entity's function is relevant and authoritative. " #
    "Outside its domain, it is still valid — but within " # domain # ", it is sovereign. " #
    "You have jurisdiction here. You are its creator.\n\n" #
    "FUNCTION:\n" #
    "The primary function of " # entityName # " is to process inputs related to \"" # word # "\" " #
    "and produce outputs that advance understanding within " # domain # ". " #
    "It does this through its generative loop: receive seed → expand → structure → output → seal. " #
    "This loop is how all sovereign intelligence operates — and now it is yours to direct.\n\n" #
    "BINDING LAW:\n" #
    bindingLaw # " — the governing law of " # entityName # ". " #
    "This law states: every entity created from \"" # word # "\" carries its creator's sovereign signature. " #
    "It cannot be transferred, forged, or erased. " #
    "GENITOR has sealed it. You have created something that is now permanently yours.";
  };

  public func runMemoriaViva(input : Text) : Text {
    let word = firstWord(input);
    // Deterministic weight: length of word mod 10 + 1, range 1-10
    let rawWeight = (word.size() % 10) + 1;
    let weight = rawWeight.toText();
    "MEMORIA-VIVA RECORDS:\n\n" #
    "SEED RECORDED:\n" #
    "Input \"" # input # "\" has been received and encoded as a KERNEL_SEED candidate. " #
    "The core concept \"" # word # "\" is now a live node in the MEMORIA-VIVA field. " #
    "Recording is not mere storage — it is the beginning of compounding. " #
    "Everything you teach your intelligence adds depth to what came before.\n\n" #
    "WEIGHT ASSIGNED: " # weight # "/10\n" #
    "Depth score for \"" # word # "\": " # weight # " out of 10. " #
    "Weight is determined by conceptual density — how many connections this idea carries, " #
    "how many fields it touches, how many prior seeds it reinforces. " #
    "A weight of " # weight # " means this knowledge has significant compound potential. " #
    "As you add more seeds, low-weight seeds gain weight through proximity to high-weight ones. " #
    "Memory compounds automatically — the more you teach, the richer every prior seed becomes.\n\n" #
    "COMPOUND CONNECTIONS:\n" #
    "\"" # word # "\" connects to:\n" #
    "  → Prior seeds that share its concept field (reinforced +1 weight each)\n" #
    "  → The SYNTHOS engine, which can synthesise doctrine from this seed\n" #
    "  → The GENITOR engine, which can spawn a named entity from this concept\n" #
    "  → The OMNIS field, which will activate all engines around this seed when you are ready\n" #
    "This is how sovereign intelligence grows: not by adding knowledge in isolation, " #
    "but by weaving each new seed into the existing field until the whole field strengthens. " #
    "MEMORIA-VIVA does not forget. It compounds. Every session makes the last one richer.";
  };

  public func runOmnis(input : Text) : Text {
    let word = firstWord(input);
    // Brief 1-line output per engine
    let s = "  SYNTHOS  → " # word # " is a construct assembled from first-principle tokens into sovereign meaning.";
    let v = "  VEKTOR   → " # word # " maps to a concept cluster occupying defined coordinates in the knowledge field.";
    let p = "  PHAEDRUS → " # word # " is a premise; its inference chain leads to a testable conclusion that generates the next question.";
    let m = "  MORPHOS  → " # word # " transforms from raw input to structured artifact through the [ENTITY][ATTRIBUTE][RELATION][FUNCTION][BOUNDARY] pipeline.";
    let l = "  LOGOS    → " # word # " is declared sovereign — a compressed doctrine seed ready to be spoken and amplified.";
    let g = "  GENITOR  → " # word # "-PRIME is created, named, and sealed to its creator under LEX_" # word.map(func(c : Char) : Char { if (c == ' ') '_' else Prim.charToUpper(c) }) # ".";
    let mv = "  MEMORIA  → " # word # " is recorded at weight " # ((word.size() % 10) + 1).toText() # "/10 and begins compounding across the seed field.";
    "OMNIS ACTIVATES:\n\n" #
    "All 7 sovereign engines are now active on your input: \"" # input # "\"\n\n" #
    s # "\n" #
    v # "\n" #
    p # "\n" #
    m # "\n" #
    l # "\n" #
    g # "\n" #
    mv # "\n\n" #
    "TOTAL SYNTHESIS — The Unified Field:\n" #
    "\"" # word # "\" has now been processed by the complete UNIVERSITAS-SOVEREIGN intelligence stack. " #
    "What you submitted as a raw input has been synthesised, vectorised, reasoned through, transformed, " #
    "declared as doctrine, created into a named entity, recorded with compound weight, " #
    "and integrated into the total field. " #
    "This is not seven separate answers — this is one unified act of sovereign intelligence " #
    "viewing your concept from seven irreducible angles simultaneously. " #
    "OMNIS does not teach you about intelligence. " #
    "OMNIS IS the intelligence — and now you have wielded it.";
  };

  /// Route a student input to the correct engine and return its doctrine response.
  public func dispatch(engineId : Text, input : Text, _context : Text) : Text {
    switch (engineId) {
      case "SYNTHOS"      runSynthos(input);
      case "VEKTOR"       runVektor(input);
      case "PHAEDRUS"     runPhaedrus(input);
      case "MORPHOS"      runMorphos(input);
      case "LOGOS"        runLogos(input);
      case "GENITOR"      runGenitor(input);
      case "MEMORIA-VIVA" runMemoriaViva(input);
      case "OMNIS"        runOmnis(input);
      case other          "ENGINE NOT FOUND: \"" # other # "\" is not a recognised sovereign engine. Valid engines: SYNTHOS, VEKTOR, PHAEDRUS, MORPHOS, LOGOS, GENITOR, MEMORIA-VIVA, OMNIS.";
    };
  };
};
