// LESSON CONTENT ENGINE — PHI-structured lesson delivery
// Each lesson block is sized to golden ratio proportions:
//   core_concept  = 38.2% of content (PHI_INV_SQ)
//   expansion     = 61.8% of content (PHI_INV)
import SovereignResponses "../lib/sovereign-responses";
import CurriculumLib "../lib/curriculum";

mixin (
  topics   : CurriculumLib.TopicStore,
) {
  /// Returns a fully-structured lesson for a topic/grade combination.
  /// PUBLIC — no auth required.
  public query func getLessonContent(
    topicId    : Text,
    gradeLevel : Text,
    agentRole  : Text,
  ) : async {
    title           : Text;
    introduction    : Text;
    coreConceptBlock: Text;
    expansionBlock  : Text;
    practicePrompt  : Text;
    reviewSummary   : Text;
  } {
    // Resolve topic title
    let topicTitle = switch (topics.get(topicId)) {
      case (?t) t.title;
      case null topicId;
    };
    // Derive subject from topicId (e.g. "5-math-2" → "math")
    let parts = topicId.split(#char '-').toArray();
    let subject = if (parts.size() >= 2) parts[1] else "General";

    // Introduction — F(3)=2 sentences, PHI_MINOR portion
    let intro = "Welcome to " # topicTitle # ". " #
      "This lesson will guide you through the key concepts at the " #
      SovereignResponses.gradeBandPublic(gradeLevel) # " level.";

    // Core concept block — 38.2% (PHI_INV_SQ) of the lesson
    let coreConcept = SovereignResponses.sageExplain(topicTitle, subject, gradeLevel, "explain core concept", 0);

    // Expansion block — 61.8% (PHI_INV): deeper COGT-driven explanation
    let expansion = SovereignResponses.sageExplain(topicTitle, subject, gradeLevel, "expand deeper", 2);

    // Practice prompt — from Quill at difficulty F(2)=1
    let practicePrompt = SovereignResponses.quillQuestion(topicTitle, subject, gradeLevel, "practice", 1);

    // Review summary — synthesized doctrine statement
    let review = "You have explored " # topicTitle # " in " # subject # " at the " #
      SovereignResponses.gradeBandPublic(gradeLevel) # " level. " #
      "The core idea, the expansion, and the practice question all build on a single PHI-structured foundation. " #
      "Seal this session to your passport to carry the seed forward.";

    {
      title            = topicTitle;
      introduction     = intro;
      coreConceptBlock = coreConcept;
      expansionBlock   = expansion;
      practicePrompt   = practicePrompt;
      reviewSummary    = review;
    };
  };
};
