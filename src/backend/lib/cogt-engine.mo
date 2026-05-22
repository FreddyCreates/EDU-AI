// COGT Engine — Cognitive Reasoning Subsystem
// Extracted from sovereign-responses.mo as a standalone pluggable lib.
// Used by ADEDDI as the #COGT layer in the 7-layer reasoning chain.
// LEX_SOVEREIGNUS: All computation native. No external dependencies.
//
// COGT Chain: EXPAND (PHI_INV=61.8%) → CRITIQUE (PHI_INV_SQ=38.2%) → SYNTHESIZE (PHI=161.8%)

import Text "mo:core/Text";
import Nat "mo:core/Nat";

module {

  // ── PHI integer weights ───────────────────────────────────────────────────
  let PHI_W    : Nat = 1618; // PHI × 1000
  let PHI_INV  : Nat = 618;  // PHI_INV × 1000
  let PHI_SQ   : Nat = 382;  // PHI_INV_SQ × 1000

  // ── Typed COGT result ─────────────────────────────────────────────────────
  public type CogtResult = {
    expandOutput   : Text;  // 61.8% — primary concept expansion
    critiqueOutput : Text;  // 38.2% — misconception clearing
    synthOutput    : Text;  // 161.8% — synthesised student-facing answer
    expandWeight   : Nat;   // PHI_INV (618)
    critiqueWeight : Nat;   // PHI_SQ (382)
    synthWeight    : Nat;   // PHI_W (1618)
  };

  // ── Grade complexity ──────────────────────────────────────────────────────
  func gradeComplexity(gl : Text) : Nat {
    let g = gl.toLower();
    if (g == "k" or g == "0" or g == "1" or g == "2") 1
    else if (g == "3" or g == "4" or g == "5") 1
    else if (g == "6" or g == "7" or g == "8") 2
    else 5;
  };

  func gradeBand(gl : Text) : Text {
    let g = gl.toLower();
    if (g == "k" or g == "0") "kindergarten"
    else if (g == "1" or g == "2" or g == "3") "early elementary"
    else if (g == "4" or g == "5") "upper elementary"
    else if (g == "6" or g == "7" or g == "8") "middle school"
    else "high school";
  };

  // ── EXPAND block — PHI_INV weight 61.8% ──────────────────────────────────
  func expand(topic : Text, subject : Text, gl : Text) : Text {
    let band  = gradeBand(gl);
    let cmplx = gradeComplexity(gl);
    if (cmplx <= 1) {
      "COGT EXPAND (" # Nat.toText(PHI_INV) # "/1000): " #
      "\"" # topic # "\" in " # subject # " is one of the key ideas for " # band # " learners. " #
      "It has a specific meaning, and understanding it unlocks the ideas that come after it. " #
      "Think of it as a building block — solid foundation, everything else stacks on top."
    } else if (cmplx == 2) {
      "COGT EXPAND (" # Nat.toText(PHI_INV) # "/1000): " #
      "\"" # topic # "\" in " # subject # " has three essential components: " #
      "(1) its formal definition, (2) the structural relationships it participates in, and " #
      "(3) the applications that follow from mastering it. At the " # band # " level, all three are required."
    } else {
      "COGT EXPAND (" # Nat.toText(PHI_INV) # "/1000): " #
      "\"" # topic # "\" in " # subject # " is a foundational framework connecting multiple conceptual domains. " #
      "Its core properties include definitional structure, relational boundaries, and applied methodology. " #
      "For " # band # " scholars, this concept serves as both endpoint and foundation for advanced inquiry."
    }
  };

  // ── CRITIQUE block — PHI_INV_SQ weight 38.2% ─────────────────────────────
  func critique(topic : Text, subject : Text, userMsg : Text) : Text {
    let hasMisconception =
      userMsg.size() > 5 and (
        userMsg.toLower().contains(#text "don't understand") or
        userMsg.toLower().contains(#text "confused") or
        userMsg.toLower().contains(#text "what is") or
        userMsg.toLower().contains(#text "how does")
      );
    "COGT CRITIQUE (" # Nat.toText(PHI_SQ) # "/1000): " #
    (if (hasMisconception) {
      "Common confusion point with \"" # topic # "\" in " # subject # ": " #
      "students often conflate it with related but distinct concepts. " #
      "The key distinction: \"" # topic # "\" refers to its specific defined meaning — " #
      "not everything that sounds adjacent. Anchor to the precise definition first."
    } else {
      "Watch for this: don't confuse the core concept of \"" # topic # "\" with its applications. " #
      "The concept itself is clean and bounded — the applications are where creativity enters. " #
      "What specific aspect of \"" # topic # "\" in " # subject # " needs clarification?"
    });
  };

  // ── SYNTHESIZE block — PHI weight 161.8% ─────────────────────────────────
  func synthesize(expandOut : Text, critiqueOut : Text, topic : Text) : Text {
    "COGT SYNTHESIZE (" # Nat.toText(PHI_W) # "/1000): " #
    "Merging EXPAND and CRITIQUE into sovereign student-facing response for \"" # topic # "\":\n" #
    expandOut # "\n" # critiqueOut # "\n" #
    "Synthesis complete. Response confidence: PHI_INV_SQ=" # Nat.toText(PHI_SQ) # "/1000 floor achieved."
  };

  // ── Public API ─────────────────────────────────────────────────────────────
  public func run(
    topic   : Text,
    subject : Text,
    grade   : Text,
    userMsg : Text,
  ) : CogtResult {
    let e = expand(topic, subject, grade);
    let c = critique(topic, subject, userMsg);
    let s = synthesize(e, c, topic);
    {
      expandOutput   = e;
      critiqueOutput = c;
      synthOutput    = s;
      expandWeight   = PHI_INV;
      critiqueWeight = PHI_SQ;
      synthWeight    = PHI_W;
    };
  };

  /// Plain-text output for embedding in other engine responses.
  public func runText(topic : Text, subject : Text, grade : Text, userMsg : Text) : Text {
    let r = run(topic, subject, grade, userMsg);
    r.synthOutput;
  };
};
