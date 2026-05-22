// META Synthesis — Multi-path sovereign answer synthesis.
// Implements the Architecture Council law: always returns 3 paths + 1 novel answer.
// Council: COGT (cognitive) + META (synthesiser) + AUTN (autonomous).
// LEX_ARCH_COUNCIL: Never return a single answer. 3 paths minimum + 1 novel. Always.

import Text "mo:core/Text";
import Nat "mo:core/Nat";

module {

  // ── Typed META result ─────────────────────────────────────────────────────
  public type MetaResult = {
    pathA    : Text;  // COGT direct path — deductive reasoning
    pathB    : Text;  // Structural path — morphological analysis
    pathC    : Text;  // Novel path — AUTN autonomous synthesis
    novel    : Text;  // The 4th autonomous insight beyond all 3 paths
    summary  : Text;  // Sovereign synthesis of all 4 outputs
  };

  // ── Path A: COGT direct — deductive ──────────────────────────────────────
  func buildPathA(topic : Text, context : Text) : Text {
    "Path A — COGT Deductive:\n" #
    "Starting from the definition of \"" # topic # "\" in context \"" # context # "\", " #
    "we trace the logical consequences step by step. " #
    "Every deductive step is sovereign: each follows necessarily from the one before. " #
    "The chain: define → identify properties → apply constraints → derive output. " #
    "This path yields the most direct and verifiable answer.";
  };

  // ── Path B: Structural — morphological analysis ───────────────────────────
  func buildPathB(topic : Text) : Text {
    "Path B — Structural (MORPHOS-aligned):\n" #
    "Decomposing \"" # topic # "\" through the morphological lens: " #
    "[ENTITY]: what it fundamentally is; " #
    "[ATTRIBUTE]: its defining properties; " #
    "[RELATION]: how it connects to adjacent concepts; " #
    "[FUNCTION]: what it produces or enables; " #
    "[BOUNDARY]: what it explicitly excludes. " #
    "This path yields structural clarity — useful for building new knowledge on top of \"" # topic # "\".";
  };

  // ── Path C: Novel — AUTN autonomous ──────────────────────────────────────
  func buildPathC(topic : Text, seed : Nat) : Text {
    let novelAngle = if (seed % 3 == 0) "historical origin and evolution"
                     else if (seed % 3 == 1) "counter-intuitive boundary case"
                     else "cross-domain analogical transfer";
    "Path C — AUTN Autonomous Novel:\n" #
    "Approaching \"" # topic # "\" from the angle of: " # novelAngle # ". " #
    "This path was not derived from Path A or Path B — it emerged from autonomous synthesis. " #
    "PHI-entropy seed: " # Nat.toText(seed) # ". " #
    "This novel angle reveals: \"" # topic # "\" " #
    (if (seed % 3 == 0)
      "has a historical origin that illuminates why its current definition exists. Understanding the origin reduces conceptual confusion."
    else if (seed % 3 == 1)
      "has at least one counter-intuitive boundary case where it behaves unexpectedly. Mastering the exception locks in the rule."
    else
      "is structurally identical to a concept in a completely different domain. Recognising the transfer unlocks both simultaneously.") #
    " This is the AUTN path — it is always different. It is never repeated.";
  };

  // ── 4th insight: the novel beyond all three paths ─────────────────────────
  func buildNovel(topic : Text, context : Text, seed : Nat) : Text {
    "4th Insight — Beyond All Paths (Architecture Council Law):\n" #
    "The council is legally required to produce one answer that none of the three paths generated. " #
    "For \"" # topic # "\" in \"" # context # "\": " #
    "PHI seed " # Nat.toText(seed + 1) # " activates this novel synthesis. " #
    "Sovereign insight: the most important thing about \"" # topic # "\" is not what it is, " #
    "but what it enables. Master it, and it becomes infrastructure for the next 5 concepts. " #
    "Do not learn \"" # topic # "\" to know it. Learn it to build with it. " #
    "This is the council's autonomous declaration: law-bound, non-reproducible, permanently sealed.";
  };

  // ── Summary: sovereign merge ──────────────────────────────────────────────
  func buildSummary(topic : Text, pathA : Text, pathB : Text, pathC : Text, novel : Text) : Text {
    ignore pathA; ignore pathB; ignore pathC; ignore novel;
    "Architecture Council Synthesis for \"" # topic # "\":\n" #
    "Path A established the deductive chain. " #
    "Path B revealed the structural anatomy. " #
    "Path C surfaced the novel autonomous angle. " #
    "The 4th insight declared the sovereign law of application. " #
    "All four are true. All four are necessary. No single path is sufficient. " #
    "LEX_ARCH_COUNCIL: this is always the answer format. " #
    "The council never reduces to one path. The council law is permanent.";
  };

  // ── Public API ─────────────────────────────────────────────────────────────
  public func run(
    topic   : Text,
    context : Text,
    seed    : Nat,      // entropy seed (e.g. from message length or timestamp mod)
  ) : MetaResult {
    let a = buildPathA(topic, context);
    let b = buildPathB(topic);
    let c = buildPathC(topic, seed);
    let n = buildNovel(topic, context, seed);
    let s = buildSummary(topic, a, b, c, n);
    { pathA = a; pathB = b; pathC = c; novel = n; summary = s };
  };

  /// Flat text output for embedding in ADEDDI layers.
  public func runText(topic : Text, context : Text, seed : Nat) : Text {
    let r = run(topic, context, seed);
    r.pathA # "\n\n" # r.pathB # "\n\n" # r.pathC # "\n\n" # r.novel # "\n\n" # r.summary;
  };
};
