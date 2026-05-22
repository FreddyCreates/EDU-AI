// Scaffold lib — ZPD-based graduated hint engine.
// Deterministic sovereign scaffolding; no external deps.
// Thresholds follow Fibonacci floor values.
import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Int "mo:core/Int";
import Common "../types/common";
import Types "../types/scaffold";

module {
  public type SessionStore = Map.Map<Text, Types.ScaffoldSession>;
  public type FrameStore   = Map.Map<Text, Types.ScaffoldFrame>;

  public func newSessionStore() : SessionStore { Map.empty() };
  public func newFrameStore()   : FrameStore   { Map.empty() };

  // ── Seed scaffold frames for common subject domains ────────────────────────
  public func seedFrames(store : FrameStore) {
    let frames : [Types.ScaffoldFrame] = [
      {
        topicId       = "math";
        concept       = "Mathematical reasoning";
        hints         = [
          { tier = #tier1; text = "Re-read the problem. Identify exactly what is being asked and what information is given." };
          { tier = #tier2; text = "Look for keywords: total (add), difference (subtract), product (multiply), quotient (divide). Draw a diagram or number line if helpful." };
          { tier = #tier3; text = "Translate the problem into an equation step by step. Isolate one variable at a time. Check your answer by substituting back into the original equation." };
        ];
        workedExample = "Example: 3x + 6 = 15 → subtract 6 from both sides → 3x = 9 → divide both sides by 3 → x = 3. Always isolate the variable before solving.";
        visualCue     = "Number line | Balance scale | Factor tree | Area model";
      };
      {
        topicId       = "science";
        concept       = "Scientific method and experimental reasoning";
        hints         = [
          { tier = #tier1; text = "Identify what is being tested in the experiment. What changes? What stays the same?" };
          { tier = #tier2; text = "Separate: independent variable (what you change), dependent variable (what you measure), controlled variables (what you keep constant)." };
          { tier = #tier3; text = "State a testable hypothesis in this form: 'If [independent variable changes], then [dependent variable will change in this way], because [scientific reasoning].'" };
        ];
        workedExample = "Example: If light intensity increases (IV), then plant growth rate increases (DV), because photosynthesis requires light energy to convert CO₂ and water into glucose.";
        visualCue     = "Cause → Effect | Control vs Experiment | Data table | Graph axes";
      };
      {
        topicId       = "reading";
        concept       = "Text comprehension and analysis";
        hints         = [
          { tier = #tier1; text = "Skim headings, subheadings, and the first sentence of each paragraph before reading closely." };
          { tier = #tier2; text = "As you read each paragraph, identify: main idea + 1-2 pieces of supporting evidence. Underline or annotate." };
          { tier = #tier3; text = "Apply the 5W+H framework to each section: Who? What? When? Where? Why? How? Write a one-sentence summary per paragraph." };
        ];
        workedExample = "Topic sentence identifies the main idea. Supporting sentences add evidence or examples. Concluding sentence wraps up or transitions. Apply this frame to every paragraph you analyze.";
        visualCue     = "Main Idea web | Cause-Effect chain | Sequence timeline | Venn diagram";
      };
      {
        topicId       = "writing";
        concept       = "Structured argumentative composition";
        hints         = [
          { tier = #tier1; text = "State your claim clearly in the first sentence of your introduction and each body paragraph." };
          { tier = #tier2; text = "Use C-E-E structure for every body paragraph: Claim → Evidence (quote or data) → Explanation (how does this evidence prove your claim?)." };
          { tier = #tier3; text = "Your explanation must answer: HOW does this evidence support your claim? Do not leave the connection implicit — spell it out explicitly." };
        ];
        workedExample = "Claim: The author uses imagery to create tension. Evidence: 'The shadows crept across the floor like dark fingers.' Explanation: The personification of shadows implies an unseen threat approaching, building suspense and unease in the reader.";
        visualCue     = "C-E-E ladder | Thesis → Body → Conclusion pyramid | Transition word bank";
      };
      {
        topicId       = "history";
        concept       = "Historical causation and analysis";
        hints         = [
          { tier = #tier1; text = "Identify the time period and geographic region. What major forces (political, economic, social) were at work?" };
          { tier = #tier2; text = "Trace cause-and-effect chains: What conditions existed before this event? What actions triggered it? What changed as a result?" };
          { tier = #tier3; text = "Apply PERSIA analysis: Political, Economic, Religious, Social, Intellectual, Artistic factors. Classify each cause and each effect into at least two categories." };
        ];
        workedExample = "Industrial Revolution: CAUSES (agricultural surplus → labor available; new technology → steam power; capital → investment). EFFECTS (urbanization, wage labor, new social classes, environmental change).";
        visualCue     = "Timeline | Cause-Effect chain | PERSIA chart | Document sourcing (HAPP: Historical context, Audience, Purpose, Point of view)";
      };
      {
        topicId       = "algebra";
        concept       = "Algebraic thinking and equation solving";
        hints         = [
          { tier = #tier1; text = "Define your variable first: let x = [the unknown quantity]. Write the equation in words before translating to symbols." };
          { tier = #tier2; text = "Apply inverse operations to isolate the variable: addition ↔ subtraction, multiplication ↔ division. Work on both sides equally." };
          { tier = #tier3; text = "Multi-step equations: clear parentheses (distribute), combine like terms, move variables to one side, then apply inverse operations. Verify by substituting back." };
        ];
        workedExample = "2(x + 3) = 14 → distribute: 2x + 6 = 14 → subtract 6: 2x = 8 → divide by 2: x = 4. Check: 2(4+3) = 2(7) = 14 ✓";
        visualCue     = "Balance scale | Algebra tiles | Step-by-step work column";
      };
      {
        topicId       = "geometry";
        concept       = "Geometric reasoning and proof";
        hints         = [
          { tier = #tier1; text = "Draw and label the figure. Mark what is given and what you need to find." };
          { tier = #tier2; text = "Identify the relevant properties or theorems (parallel lines, triangle congruence, circle theorems). Write them out before applying." };
          { tier = #tier3; text = "Build a logical chain: each statement must follow from the previous one using a property, postulate, or theorem. Write the reason next to every step." };
        ];
        workedExample = "Given: AB ∥ CD, transversal EF. Prove: ∠AEF = ∠CFE. Step 1: ∠AEF + ∠EFC = 180° (co-interior angles, AB∥CD). Step 2: ∠CFE = 180° - ∠EFC = ∠AEF. ∴ ∠AEF = ∠CFE ✓";
        visualCue     = "Labeled diagram | Two-column proof | Flowchart proof";
      };
    ];
    for (frame in frames.vals()) {
      store.add(frame.topicId, frame);
    };
  };

  // ── Frame lookup — exact then prefix match ────────────────────────────────
  public func getFrame(store : FrameStore, topicId : Text) : ?Types.ScaffoldFrame {
    switch (store.get(topicId)) {
      case (?f) ?f;
      case null {
        var found : ?Types.ScaffoldFrame = null;
        for ((key, frame) in store.entries()) {
          if (topicId.startsWith(#text key) or key.startsWith(#text topicId)) {
            if (found == null) { found := ?frame };
          };
        };
        found;
      };
    };
  };

  // ── Return all seeded frames ──────────────────────────────────────────────
  public func getAllFrames(store : FrameStore) : [Types.ScaffoldFrame] {
    let buf = List.empty<Types.ScaffoldFrame>();
    for ((_id, frame) in store.entries()) { buf.add(frame) };
    buf.toArray();
  };

  // ── Session ID — deterministic ─────────────────────────────────────────────
  func _makeSessionId(caller : Common.UserId, topicId : Text, now : Common.Timestamp) : Text {
    let p = Text.fromIter(caller.toText().toIter().take(8));
    let t = Text.fromIter(topicId.toIter().take(10));
    "SCAF-" # p # "-" # t # "-" # Int.abs(now).toText();
  };

  // ── Public API ──────────────────────────────────────────────────────────────

  /// Open a new scaffold session for a student on a topic.
  /// masteryBefore: snapshot of student's current mastery (0-100).
  /// Returns the session ID.
  public func startSession(
    store         : SessionStore,
    caller        : Common.UserId,
    topicId       : Text,
    masteryBefore : Nat,
    now           : Common.Timestamp,
  ) : Text {
    let id = _makeSessionId(caller, topicId, now);
    let session : Types.ScaffoldSession = {
      id            = id;
      studentId     = caller;
      topicId       = topicId;
      hintsConsumed = 0;
      masteryBefore = masteryBefore;
      masteryAfter  = 0;
      createdAt     = now;
      closedAt      = null;
      resolved      = false;
    };
    store.add(id, session);
    id;
  };

  /// Request the next scaffold hint for an open session.
  /// Returns the hint or null if all hints consumed or session closed.
  public func requestHint(
    frameStore   : FrameStore,
    sessionStore : SessionStore,
    caller       : Common.UserId,
    sessionId    : Text,
  ) : ?Types.ScaffoldHint {
    switch (sessionStore.get(sessionId)) {
      case null null;
      case (?session) {
        if (session.studentId != caller or session.resolved) return null;
        switch (getFrame(frameStore, session.topicId)) {
          case null null;
          case (?frame) {
            let nextIdx = session.hintsConsumed;
            if (nextIdx >= frame.hints.size()) return null;
            let hint = frame.hints[nextIdx];
            let updated : Types.ScaffoldSession = {
              session with hintsConsumed = session.hintsConsumed + 1
            };
            sessionStore.add(sessionId, updated);
            ?hint;
          };
        };
      };
    };
  };

  /// Close a scaffold session, recording masteryAfter.
  public func closeSession(
    store        : SessionStore,
    caller       : Common.UserId,
    sessionId    : Text,
    masteryAfter : Nat,
    now          : Common.Timestamp,
  ) : Bool {
    switch (store.get(sessionId)) {
      case null false;
      case (?session) {
        if (session.studentId != caller or session.resolved) return false;
        let updated : Types.ScaffoldSession = {
          session with
          masteryAfter = masteryAfter;
          closedAt     = ?now;
          resolved     = true;
        };
        store.add(sessionId, updated);
        true;
      };
    };
  };

  /// Return all scaffold sessions belonging to the caller.
  public func getMySessions(
    store  : SessionStore,
    caller : Common.UserId,
  ) : [Types.ScaffoldSession] {
    let buf = List.empty<Types.ScaffoldSession>();
    for ((_id, s) in store.entries()) {
      if (s.studentId == caller) { buf.add(s) };
    };
    buf.toArray();
  };

  /// Return a single session by ID (caller must own it).
  public func getSession(
    store     : SessionStore,
    caller    : Common.UserId,
    sessionId : Text,
  ) : ?Types.ScaffoldSession {
    switch (store.get(sessionId)) {
      case null null;
      case (?s) {
        if (s.studentId == caller) ?s else null;
      };
    };
  };
};
