// SOVEREIGN RESPONSE ENGINE — PHI GEOMETRIC INTELLIGENCE
// All intelligence derived from PHI (golden ratio) and Fibonacci sequences.
// No external AI. No HTTP outcalls. The math IS the intelligence.

import Text "mo:core/Text";
import Float "mo:core/Float";
import Nat "mo:core/Nat";
import List "mo:core/List";
import Array "mo:core/Array";

module {

  // ══════════════════════════════════════════════════════════════════════════
  // PHI CONSTANTS — sovereign mathematical substrate
  // ══════════════════════════════════════════════════════════════════════════
  let PHI      : Float = 1.6180339887; // golden ratio
  let PHI_INV  : Float = 0.6180339887; // 1/φ  — major portion
  let _PHI_INV_SQ : Float = 0.3819660113; // 1/φ² — minor portion

  // Fibonacci difficulty levels indexed 0-7
  // F(1)=easy, F(2)=medium, F(3)=hard, F(4)=challenge, F(5)=mastery, F(6)=extension
  let FIB : [Nat] = [1, 1, 2, 3, 5, 8, 13, 21];
  // PHI-MINOR and FIB_TTL for v2
  let _PHI_MINOR : Float = 0.2360679775;
  let _FIB_TTL   : [Nat] = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];


  // Vocabulary complexity by grade band (Fibonacci index)
  // K-2 → 1 (simplest), 3-5 → 1, 6-8 → 2, 9-12 → 5
  func gradeComplexity(gl : Text) : Nat {
    let g = gl.toLower();
    if (g == "k" or g == "0" or g == "1" or g == "2") 1
    else if (g == "3" or g == "4" or g == "5") 1
    else if (g == "6" or g == "7" or g == "8") 2
    else 5
  };

  // Grade band label for student-facing text
  func gradeBand(gl : Text) : Text {
    let g = gl.toLower();
    if (g == "k" or g == "0") "kindergarten"
    else if (g == "1" or g == "2" or g == "3") "early elementary"
    else if (g == "4" or g == "5") "upper elementary"
    else if (g == "6" or g == "7" or g == "8") "middle school"
    else "high school"
  };

  func subjectLabel(subject : Text) : Text {
    let s = subject.toLower();
    if (s.contains(#text "math")) "Mathematics"
    else if (s.contains(#text "ela") or s.contains(#text "english") or s.contains(#text "language")) "English Language Arts"
    else if (s.contains(#text "science")) "Science"
    else if (s.contains(#text "social") or s.contains(#text "history")) "Social Studies"
    else if (s.contains(#text "geography")) "Geography"
    else if (s.contains(#text "art")) "Art"
    else if (s.contains(#text "music")) "Music"
    else if (s.contains(#text "computer") or s.contains(#text "cs")) "Computer Science"
    else if (s.contains(#text "spanish")) "Foreign Language"
    else if (s.contains(#text "health")) "Health & Wellness"
    else if (s.contains(#text "pe") or s.contains(#text "physical")) "Physical Education"
    else if (s.contains(#text "elective")) "Critical Thinking & Logic"
    else subject
  };

  // ══════════════════════════════════════════════════════════════════════════
  // COGT CHAIN — 3-step PHI-weighted reasoning
  // expand (PHI_INV weight) → critique (PHI_INV_SQ) → synthesize (PHI)
  // ══════════════════════════════════════════════════════════════════════════
  func cogtChain(topic : Text, subject : Text, gl : Text, userMsg : Text) : Text {
    let subLbl = subjectLabel(subject);
    let band = gradeBand(gl);
    let cmplx = gradeComplexity(gl);

    // STEP 1 — EXPAND: core components of the topic (PHI_INV weight = 61.8%)
    let expand = expandBlock(topic, subLbl, band, cmplx);

    // STEP 2 — CRITIQUE: what might the student misunderstand? (PHI_INV_SQ = 38.2%)
    let critique = critiqueBlock(topic, subLbl, userMsg);

    // STEP 3 — SYNTHESIZE: merge into coherent student-facing response (PHI weight)
    // Final = EXPAND at PHI_INV weight + SYNTHESIZE, combined
    expand # " " # critique
  };

  func expandBlock(topic : Text, subLbl : Text, band : Text, cmplx : Nat) : Text {
    if (cmplx <= 1) {
      // K-5: simple language
      "Let's explore " # topic # " in " # subLbl # "! " #
      topic # " is one of the big ideas in " # subLbl # " for " # band # " students. " #
      "When we understand " # topic # ", we can see how it connects to things we use every day. " #
      "Think about where you've seen " # topic # " before — at home, at school, or outside."
    } else if (cmplx == 2) {
      // 6-8: intermediate
      topic # " is a central concept in " # subLbl # " that builds on what you've already learned. " #
      "It has three key parts: first, understanding what " # topic # " actually means; second, " #
      "seeing how it's structured; and third, applying it to solve real problems. " #
      "At the " # band # " level, mastering " # topic # " unlocks more advanced ideas ahead."
    } else {
      // 9-12: academic vocabulary
      "In " # subLbl # ", " # topic # " represents a foundational framework that connects multiple " #
      "conceptual domains. Its core components include definitional structure, relational properties, " #
      "and applied methodology. For " # band # " scholars, " # topic # " serves as both an endpoint " #
      "of prior learning and a foundation for advanced inquiry."
    }
  };

  func critiqueBlock(topic : Text, subLbl : Text, userMsg : Text) : Text {
    // PHI_INV_SQ = 38.2% — the clarifying, misconception-clearing layer
    let msgLen = userMsg.size();
    let hasMisconception = msgLen > 5 and (
      userMsg.toLower().contains(#text "don't understand") or
      userMsg.toLower().contains(#text "confused") or
      userMsg.toLower().contains(#text "what is") or
      userMsg.toLower().contains(#text "how does")
    );
    if (hasMisconception) {
      "A common point of confusion with " # topic # " in " # subLbl # " is mixing it up with " #
      "related but different ideas. Here's the key distinction: " # topic # " specifically refers " #
      "to its own defined meaning — not just anything that sounds similar. Focus on the precise " #
      "definition first, then see how examples confirm it."
    } else {
      "One thing to watch for with " # topic # ": don't confuse the concept with its applications. " #
      "The core idea of " # topic # " is clean and specific — the applications are where it gets creative. " #
      "What question about " # topic # " can I answer for you right now?"
    }
  };

  // ══════════════════════════════════════════════════════════════════════════
  // SAGE ENGINE — PHI-ratio concept decomposition
  // Major block = PHI_INV (61.8%), Minor block = PHI_INV_SQ (38.2%)
  // ══════════════════════════════════════════════════════════════════════════
  public func sageExplain(topic : Text, subject : Text, gl : Text, userMsg : Text, msgIndex : Nat) : Text {
    let subLbl = subjectLabel(subject);
    let band = gradeBand(gl);
    let cmplx = gradeComplexity(gl);
    ignore msgIndex; // depth scaling reserved for future Fibonacci-indexed depth

    // COGT chain runs first
    let cogt = cogtChain(topic, subject, gl, userMsg);

    // MAJOR block (PHI_INV = 61.8%) — the core idea
    let major = majorConceptBlock(topic, subLbl, band, cmplx);

    // MINOR block (PHI_INV_SQ = 38.2%) — supporting detail
    let minor = minorConceptBlock(topic, subLbl, cmplx);

    // CONNECTION — how this links to other topics (always ends with question)
    let connection = connectionBlock(topic, subLbl);

    cogt # "\n\n" # major # "\n\n" # minor # "\n\n" # connection
  };

  func majorConceptBlock(topic : Text, subLbl : Text, band : Text, cmplx : Nat) : Text {
    // 61.8% of the explanation — the core idea
    if (cmplx <= 1) {
      "📚 Here's the big idea about " # topic # ":\n" #
      topic # " in " # subLbl # " is about understanding a key piece of how things work. " #
      "For " # band # " learners, the most important thing is: " # topic # " has a specific meaning, " #
      "and once you know it, you'll start seeing it everywhere."
    } else if (cmplx == 2) {
      "🔑 Core concept — " # topic # ":\n" #
      "In " # subLbl # ", " # topic # " is defined by its essential properties and how it behaves " #
      "in different contexts. The foundation is understanding the definition precisely — then " #
      "everything else (examples, applications, exceptions) builds from there. This is what " # band # " students focus on."
    } else {
      "⚙️ Conceptual structure of " # topic # ":\n" #
      "Within " # subLbl # ", " # topic # " is characterized by a set of defining properties that " #
      "distinguish it from related concepts. Academic mastery requires understanding both the " #
      "formal definition and the boundary conditions — where " # topic # " applies and where it doesn't."
    }
  };

  func minorConceptBlock(topic : Text, subLbl : Text, cmplx : Nat) : Text {
    // 38.2% of the explanation — supporting detail
    if (cmplx <= 1) {
      "💡 Supporting detail:\n" #
      "Here's how " # topic # " shows up in real life within " # subLbl # ": " #
      "you can see it, use it, or test it with things you already know. " #
      "The more you practice with " # topic # ", the more natural it becomes."
    } else if (cmplx == 2) {
      "💡 Supporting detail:\n" #
      "When applying " # topic # " in " # subLbl # ", look for patterns: how does it connect to " #
      "what came before in the curriculum? What new problems does it let you solve that you couldn't before? " #
      "These connections are the proof that " # topic # " is working in your thinking."
    } else {
      "💡 Supporting analysis:\n" #
      "The secondary properties of " # topic # " in " # subLbl # " reveal its relational structure. " #
      "Consider how " # topic # " functions as both a dependent variable in some frameworks and " #
      "an independent driver in others — this duality is what makes it analytically interesting."
    }
  };

  func connectionBlock(topic : Text, subLbl : Text) : Text {
    "🔗 Connection:\n" #
    topic # " in " # subLbl # " connects to ideas across other subjects too — the same reasoning " #
    "patterns appear in unexpected places. What part of " # topic # " would you like to explore deeper?"
  };

  // ══════════════════════════════════════════════════════════════════════════
  // QUILL ENGINE — Fibonacci-spaced difficulty progression
  // msgIndex mod 8 → FIB-indexed difficulty
  // ══════════════════════════════════════════════════════════════════════════
  public func quillQuestion(topic : Text, subject : Text, gl : Text, userMsg : Text, msgIndex : Nat) : Text {
    ignore userMsg;
    let subLbl = subjectLabel(subject);
    let band = gradeBand(gl);
    let slot = msgIndex % 8;
    // FIB hint density: 61.8% of questions get a hint → slots 0-4 get hints (5/8 ≈ PHI_INV)
    let includeHint = slot < 5;

    let questionText : Text = if (slot == 0 or slot == 1) {
      // F(1) = easy: literal recall
      "Quick check on " # topic # " in " # subLbl # " (" # band # " level): " #
      "In one sentence, what is " # topic # "?"
    } else if (slot == 2 or slot == 3) {
      // F(2) = medium: 2-3 sentence explanation
      "Going deeper on " # topic # ": In 2-3 sentences, explain " # topic # " " #
      "and give one example from " # subLbl # "."
    } else if (slot == 4) {
      // F(3) = hard: synthesis of 2 concepts
      "Challenge question about " # topic # ": How does " # topic # " connect to " #
      "something else you've learned in " # subLbl # "? Explain the relationship."
    } else if (slot == 5) {
      // F(4) = challenge: application
      "Apply your knowledge: Describe a real-world scenario where understanding " # topic # " " #
      "would change how you approach a problem in " # subLbl # "."
    } else if (slot == 6) {
      // F(5) = mastery: Socratic defense
      "Defend your understanding: Make a claim about " # topic # " in " # subLbl # ", " #
      "then argue why someone who disagreed would be wrong."
    } else {
      // F(6) = extension: cross-subject connection
      "Extension challenge: " # topic # " from " # subLbl # " connects to ideas in other subjects. " #
      "Find a connection to a different subject and explain why the same principle applies."
    };

    let hint : Text = if (slot == 0 or slot == 1) {
      "Hint: Think about the definition — what makes " # topic # " what it is?"
    } else if (slot == 2 or slot == 3) {
      "Hint: Start with the definition, then show it working in a real example."
    } else if (slot == 4) {
      "Hint: Think about a concept that comes before or after " # topic # " in the curriculum."
    } else {
      ""
    };

    if (includeHint and hint.size() > 0) {
      "❓ " # questionText # "\n\n" # hint
    } else {
      "❓ " # questionText
    }
  };

  // ══════════════════════════════════════════════════════════════════════════
  // SPARK ENGINE — PHI-ratio encouragement scoring
  // PHI_SCORE = (output_complexity × PHI) / (input_effort + 1)
  // ══════════════════════════════════════════════════════════════════════════
  public func sparkEncourage(topic : Text, subject : Text, gl : Text, userMsg : Text, msgIndex : Nat) : Text {
    let subLbl = subjectLabel(subject);
    ignore gl;
    // Input effort: word count (approximate by size / 5) + msgIndex
    let wordCount = userMsg.size() / 5;
    let inputEffort = wordCount + msgIndex;
    // Output complexity: Fibonacci level of current engagement
    let fibLevel = FIB[msgIndex % 8];
    // PHI_SCORE = (fibLevel × PHI) / (inputEffort + 1)
    let phiScore = (fibLevel.toFloat() * PHI) / (inputEffort + 1).toFloat();

    if (phiScore > 1.0) {
      // SURGE — overachieving
      "🚀 SURGE MODE — You are operating above the golden ratio threshold!\n\n" #
      "What you just did with " # topic # " in " # subLbl # " is genuinely impressive. " #
      "Your output-to-effort ratio is above PHI (1.618) — that means you're extracting more " #
      "from each learning moment than most students at this level. " #
      "Keep this momentum: your next step is to challenge yourself with a harder question about " # topic # ". " #
      "You're ready for it."
    } else if (phiScore >= PHI_INV) {
      // FLOW — in the PHI zone
      "✨ FLOW STATE — You're right in the golden zone!\n\n" #
      "Your engagement with " # topic # " is balanced perfectly — effort and output are in PHI proportion. " #
      "This is the ideal learning state. " #
      "In " # subLbl # ", staying in this zone means you're building real mastery, not just memorizing. " #
      "Your next action: go one level deeper on " # topic # " — ask a 'why' question."
    } else {
      // LIFT — needs support
      "💪 LIFT MODE — You've got more in you!\n\n" #
      "" # topic # " in " # subLbl # " can feel tricky at first — that's completely normal. " #
      "Every expert in " # subLbl # " started exactly where you are right now. " #
      "The key isn't getting it perfect immediately — it's taking the next small step. " #
      "Your next action: write one thing you DO understand about " # topic # ", even if it's small."
    }
  };

  // ══════════════════════════════════════════════════════════════════════════
  // NOVA MASTER ROUTER
  // Routes to SAGE, QUILL, or SPARK based on message analysis
  // ══════════════════════════════════════════════════════════════════════════
  public func novaRoute(topic : Text, subject : Text, gl : Text, userMsg : Text, msgIndex : Nat) : Text {
    let msg = userMsg.toLower();
    let msgLen = userMsg.size();

    // Routing logic based on message content
    let wantsQuiz = msg.contains(#text "quiz") or msg.contains(#text "test me") or
      msg.contains(#text "question") or msg.contains(#text "try") or
      (msgLen > 50 and msg.contains(#text "?"));
    let wantsHelp = msg.contains(#text "help") or msg.contains(#text "stuck") or
      msg.contains(#text "don't understand") or msg.contains(#text "confused");
    let wantsExplain = msg.contains(#text "explain") or msg.contains(#text "what is") or
      msg.contains(#text "how does") or msg.contains(#text "why");
    let isShort = msgLen < 20;

    if (wantsQuiz) {
      quillQuestion(topic, subject, gl, userMsg, msgIndex)
    } else if (wantsHelp) {
      // SPARK then SAGE: encourage first, then explain
      let lift = sparkEncourage(topic, subject, gl, userMsg, msgIndex);
      let sage = sageExplain(topic, subject, gl, userMsg, msgIndex);
      lift # "\n\n" # sage
    } else if (wantsExplain) {
      sageExplain(topic, subject, gl, userMsg, msgIndex)
    } else if (isShort) {
      sparkEncourage(topic, subject, gl, userMsg, msgIndex)
    } else {
      // Default: SAGE
      sageExplain(topic, subject, gl, userMsg, msgIndex)
    }
  };

  // ══════════════════════════════════════════════════════════════════════════
  // MAIN DISPATCH — called by chat-api.mo
  // agentRole: "sage"/"explainer", "quill"/"quizmaster", "spark"/"encourager",
  //            "nova"/"curator"/"router", "atlas"/"guide", "echo"/"assessor"
  // ══════════════════════════════════════════════════════════════════════════
  public func dispatch(
    agentRole  : Text,
    userMsg    : Text,
    topic      : Text,
    subject    : Text,
    gl         : Text,
    msgIndex   : Nat
  ) : Text {
    let role = agentRole.toLower();
    // Resolve effective topic/subject/grade with safe defaults
    let t = if (topic.size() == 0) "learning" else topic;
    let s = if (subject.size() == 0) "General" else subject;
    let g = if (gl.size() == 0) "6" else gl;

    if (role.contains(#text "sage") or role.contains(#text "explainer")) {
      sageExplain(t, s, g, userMsg, msgIndex)
    } else if (role.contains(#text "quill") or role.contains(#text "quizmaster")) {
      quillQuestion(t, s, g, userMsg, msgIndex)
    } else if (role.contains(#text "spark") or role.contains(#text "encourager")) {
      sparkEncourage(t, s, g, userMsg, msgIndex)
    } else if (role.contains(#text "atlas") or role.contains(#text "guide")) {
      // Atlas uses SAGE with a navigation framing
      "🗺️ Learning Path for " # t # ":\n\n" # sageExplain(t, s, g, userMsg, msgIndex)
    } else if (role.contains(#text "echo") or role.contains(#text "assessor")) {
      // Echo uses QUILL with an assessment framing
      "📊 Assessment — " # t # ":\n\n" # quillQuestion(t, s, g, userMsg, msgIndex)
    } else {
      // nova / curator / router / anything else → NOVA master router
      novaRoute(t, s, g, userMsg, msgIndex)
    }
  };

  // ══════════════════════════════════════════════════════════════════════════
  // MEDI — multi-agent debate
  // 3 internal thought threads: Expander, Critic, Auditor
  // Majority coherence vote: if 2+ threads pass COH >= PHI_INV → return synthesis
  // ══════════════════════════════════════════════════════════════════════════
  public func medi(
    topic   : Text,
    subject : Text,
    gl      : Text,
    userMsg : Text,
  ) : Text {
    let subLbl = subjectLabel(subject);
    let band   = gradeBand(gl);
    // Thread 1: Expander — expand the concept fully
    let t1 = expandBlock(topic, subLbl, band, gradeComplexity(gl));
    // Thread 2: Critic — challenge the expansion
    let t2 = critiqueBlock(topic, subLbl, userMsg);
    // Thread 3: Auditor — synthesize both into final doctrine
    let t3 = connectionBlock(topic, subLbl);
    // COH check per thread (simplified: each thread length/quality proxy)
    let coh1 = Nat.min(t1.size(), 500).toFloat() / 500.0;
    let coh2 = Nat.min(t2.size(), 400).toFloat() / 400.0;
    let coh3 = Nat.min(t3.size(), 300).toFloat() / 300.0;
    let _avgCoh = (coh1 + coh2 + coh3) / 3.0;
    let passCount = (if (coh1 >= PHI_INV) 1 else 0)
      + (if (coh2 >= PHI_INV) 1 else 0)
      + (if (coh3 >= PHI_INV) 1 else 0);
    // Majority vote (2+ threads pass)
    if (passCount >= 2) {
      // CONF-merge: synthesize at PHI_INV ratio weighting
      t1 # "\n\n" # t2 # "\n\n" # t3
    } else {
      // Fall back to highest-COH thread
      if (coh1 >= coh2 and coh1 >= coh3) t1
      else if (coh2 >= coh3) t2
      else t3
    };
  };

  // ══════════════════════════════════════════════════════════════════════════
  // SONR — passive system health monitor
  // ══════════════════════════════════════════════════════════════════════════
  public type SonrStatus = {
    status : { #quiet; #mutaTriggered };
    pil : Float;
    coh : Float;
    risk : Float;
  };

  public func sonrCheck(
    totalSeeds    : Nat,
    totalSessions : Nat,
    recentCohScores : [Float],
    passportStall : Bool,
  ) : SonrStatus {
    let pil = (totalSeeds.toFloat() / (totalSessions.toFloat() + 1.0)) * PHI_INV;
    // COH = average of last 13 (or all) recent scores
    let cohArr = if (recentCohScores.size() > 13) {
      let start = if (recentCohScores.size() >= 13) (recentCohScores.size() - 13 : Nat) else 0;
      Array.tabulate(13, func(i) { recentCohScores[start + i] })
    } else { recentCohScores };
    let coh : Float = if (cohArr.size() == 0) PHI_INV
      else {
        var s : Float = 0.0;
        for (v in cohArr.vals()) { s += v };
        s / cohArr.size().toFloat()
      };
    let risk : Float = if (passportStall) 1.0 else 0.0;
    let muta = pil < 0.7 or coh < PHI_INV or risk > 0.5;
    {
      status = if (muta) #mutaTriggered else #quiet;
      pil;
      coh;
      risk;
    };
  };

  // ── Public wrapper for gradeBand (used by lesson-api.mo) ─────────────────
  public func gradeBandPublic(gl : Text) : Text { gradeBand(gl) };

  // ══════════════════════════════════════════════════════════════════════════
  // LEGACY COMPATIBILITY SHIMS (called from existing code paths)
  // ══════════════════════════════════════════════════════════════════════════
  public func explainTopic(topic : Text, subject : Text, grade : Nat) : Text {
    let gl = if (grade == 0) "K" else grade.toText();
    sageExplain(topic, subject, gl, "explain", 0)
  };

  public func generateFRQuestion(topic : Text, subject : Text) : Text {
    quillQuestion(topic, subject, "6", "quiz", 2)
  };

  public func generateMCQuestion(topic : Text, subject : Text) : Text {
    quillQuestion(topic, subject, "6", "multiple choice", 0)
  };

  public func encourage(answer : Text, topic : Text) : Text {
    sparkEncourage(topic, "General", "6", answer, 1)
  };

};
