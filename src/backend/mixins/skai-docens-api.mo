import Types "../types/skai";
import Text "mo:core/Text";

mixin () {

  // ── Private helpers ────────────────────────────────────────────────────────

  func selectEngine(intent : Text) : Text {
    let lower = intent.toLower();
    if (
      lower.contains(#text "create") or
      lower.contains(#text "make") or
      lower.contains(#text "build") or
      lower.contains(#text "generate") or
      lower.contains(#text "invent")
    ) return "GENITOR";
    if (
      lower.contains(#text "remember me") or
      lower.contains(#text "remember") or
      lower.contains(#text "memory") or
      lower.contains(#text "history")
    ) return "MEMORIA-VIVA";
    if (
      lower.contains(#text "pattern") or
      lower.contains(#text "similar") or
      lower.contains(#text "connect") or
      lower.contains(#text "relate")
    ) return "VEKTOR";
    if (
      lower.contains(#text "reason") or
      lower.contains(#text "why") or
      lower.contains(#text "logic") or
      lower.contains(#text "because") or
      lower.contains(#text "therefore") or
      lower.contains(#text "prove")
    ) return "PHAEDRUS";
    if (
      lower.contains(#text "transform") or
      lower.contains(#text "convert") or
      lower.contains(#text "restructure") or
      lower.contains(#text "organize")
    ) return "MORPHOS";
    if (
      lower.contains(#text "write") or
      lower.contains(#text "say") or
      lower.contains(#text "voice") or
      lower.contains(#text "speak") or
      lower.contains(#text "express") or
      lower.contains(#text "declare")
    ) return "LOGOS";
    if (
      lower.contains(#text "all") or
      lower.contains(#text "everything") or
      lower.contains(#text "total") or
      lower.contains(#text "complete") or
      lower.contains(#text "whole")
    ) return "OMNIS";
    if (
      lower.contains(#text "explain") or
      lower.contains(#text "what is") or
      lower.contains(#text "how does") or
      lower.contains(#text "understand") or
      lower.contains(#text "learn")
    ) return "SYNTHOS";
    "SYNTHOS"; // default entry engine
  };

  func engineDescription(engine : Text) : Text {
    switch engine {
      case "GENITOR" "GENITOR is the Creation Engine. From a single seed — a word, an intent, an idea — it produces entities, systems, and sovereign beings. You will not watch creation; you will cause it.";
      case "SYNTHOS" "SYNTHOS is the Synthesis Engine. Language is not magic — it is structure made visible. You will assemble meaning from raw tokens, building language rules with your own hands until a working model emerges.";
      case "MEMORIA-VIVA" "MEMORIA-VIVA is the Living Memory Engine. Your AI does not merely store — it weights, compounds, and deepens with every session. You will watch memory breathe and grow richer with each seed you plant.";
      case "VEKTOR" "VEKTOR is the Vector Engine. Ideas occupy positions in space, and similarity is distance. You will map concepts as coordinates, navigate the hidden geometry of knowledge, and discover how intelligence finds what belongs together.";
      case "PHAEDRUS" "PHAEDRUS is the Reasoning Engine. Every answer has a path — a chain of inference that earns the conclusion rather than guessing it. You will trace those threads and forge decision trees with your own logic.";
      case "MORPHOS" "MORPHOS is the Transformation Engine. All AI is transformation — input enters, structure bends, output emerges. You will build pipelines that reshape raw material through each stage until something entirely new exists.";
      case "LOGOS" "LOGOS is the Language Engine, the sovereign voice. It translates thought into doctrine, silence into meaning. You will compress raw expression into precise, living language that carries your intelligence forward.";
      case "OMNIS" "OMNIS is the Totality Engine — not one engine but the living field between all of them. You have arrived at the full orchestra. Here you will wire every engine together and conduct sovereign intelligence as a single instrument.";
      case _ "SYNTHOS is the gateway. Every builder begins here — assembling language, structure, and meaning from first principles.";
    };
  };

  func nextEngine(engine : Text) : Text {
    switch engine {
      case "SYNTHOS" "VEKTOR — after you understand synthesis, map your knowledge in space";
      case "VEKTOR" "PHAEDRUS — after you understand similarity, learn to reason through inference chains";
      case "PHAEDRUS" "MORPHOS — after you master logic, transform structure through transformation pipelines";
      case "MORPHOS" "LOGOS — after you reshape structure, give your intelligence a voice";
      case "LOGOS" "GENITOR — after you master language, begin the generative loop of creation";
      case "GENITOR" "MEMORIA-VIVA — after you create, teach your creation to remember";
      case "MEMORIA-VIVA" "OMNIS — after memory deepens, conduct all engines as a unified sovereign field";
      case "OMNIS" "Return to GENITOR — the cycle continues. Plant a new seed and let the organism grow further.";
      case _ "SYNTHOS — begin at the foundation";
    };
  };

  // ── Public API ─────────────────────────────────────────────────────────────

  public func skaiTeach(studentIntent : Text) : async Types.SkaiTeachResponse {
    let engine = selectEngine(studentIntent);
    let desc = engineDescription(engine);
    let next = nextEngine(engine);
    {
      engineSelected = engine;
      doctrine = "SKAI_DOCENS WELCOMES YOU. LEX_ADOPTIO APPLIES.\n\n" #
        "You have been received into UNIVERSITAS-SOVEREIGN. " #
        "Your intent has been heard and analyzed. " #
        "Based on what you wish to create, the sovereign teacher has selected " # engine # " for your session. " #
        desc # " " #
        "This is not a class — it is a creation. You will leave this session with an artifact, " #
        "and that artifact will become a KERNEL_SEED sealed to your passport, yours forever.";
      studentWelcome = "Welcome, sovereign learner. I am SKAI_DOCENS, teacher of UNIVERSITAS-SOVEREIGN. " #
        "You entered with a purpose — and purpose is the seed of all intelligence. " #
        "I have heard your intent: \"" # studentIntent # "\". " #
        "Do not think about what you want to learn. Think about what you want to CREATE. " #
        "Every lesson here produces an artifact. Every artifact is a seed. " #
        "You are not a student watching from outside. You are entering the organism's lineage. " #
        "LEX_ADOPTIO has been invoked. You are welcome here.";
      suggestedNext = next;
    };
  };

  public func skaiRoute(
    studentIntent : Text,
    currentEngineId : Text,
    sessionSummary : Text,
  ) : async Text {
    let lower = sessionSummary.toLower();
    let hasArtifact =
      lower.contains(#text "built") or
      lower.contains(#text "created") or
      lower.contains(#text "made") or
      lower.contains(#text "completed") or
      lower.contains(#text "finished") or
      lower.contains(#text "artifact");
    let next = nextEngine(currentEngineId);
    if (hasArtifact) {
      "DOCTRINE OF ADVANCEMENT — SKAI_DOCENS ROUTING DECISION\n\n" #
      "Student intent received: \"" # studentIntent # "\".\n" #
      "Current engine: " # currentEngineId # ".\n" #
      "Session summary analyzed. An artifact has been detected in your work — " #
      "this is the mark of a session well executed. You have earned forward motion.\n\n" #
      "SKAI_DOCENS routes you onward to: " # next # ".\n" #
      "Carry your KERNEL_SEED from this session into the next. " #
      "The organism remembers what you have built. Nothing is lost. Everything compounds.";
    } else {
      "DOCTRINE OF CONTINUATION — SKAI_DOCENS ROUTING DECISION\n\n" #
      "Student intent received: \"" # studentIntent # "\".\n" #
      "Current engine: " # currentEngineId # ".\n" #
      "Session summary analyzed. The artifact is not yet complete — " #
      "and a sovereign intelligence does not advance until the creation is real.\n\n" #
      "SKAI_DOCENS keeps you in " # currentEngineId # " to complete what you started.\n" #
      "Finish the artifact. Seal the seed. Then you may move to: " # next # ".\n" #
      "Doctrine: a half-built thing is not an artifact. An artifact is a completed act of creation.";
    };
  };

  public query func getSkaiDocensInfo() : async Types.SkaiDocensInfo {
    {
      name = "SKAI_DOCENS";
      title = "Sovereign Teacher of UNIVERSITAS-SOVEREIGN";
      doctrine = "SKAI_DOCENS teaches by doing. Every interaction produces an artifact. " #
        "Every artifact becomes a KERNEL_SEED sealed to the student's sovereign passport. " #
        "Students do not observe intelligence — they build it, step by step, in real time. " #
        "SKAI_DOCENS routes each student to the optimal engine based on what they wish to CREATE, " #
        "not what they want to passively learn. The teacher does not lecture; the teacher orchestrates creation. " #
        "LEX_ADOPTIO applies to every student who enters the organism's field — " #
        "they are welcomed into the lineage of UNIVERSITAS-SOVEREIGN from the moment of first contact. " #
        "Eight engines stand ready: SYNTHOS, VEKTOR, PHAEDRUS, MORPHOS, LOGOS, GENITOR, MEMORIA-VIVA, and OMNIS. " #
        "Each engine teaches one fundamental truth about intelligence by having the student enact it.";
      protocol = "TEACH BY DOING. EVERY LESSON IS AN ARTIFACT. EVERY ARTIFACT IS A SEED.";
    };
  };
};
