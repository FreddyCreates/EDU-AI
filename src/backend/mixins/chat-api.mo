import AgentsLib "../lib/agents";
import Text "mo:core/Text";
import SovereignResponses "../lib/sovereign-responses";

mixin (agents : AgentsLib.AgentStore) {

  // ── askAgent (new signature) ──────────────────────────────────────────
  // agentRole: the role text (e.g. "sage", "quill", "spark", "nova", etc.)
  //            OR an agentId ("ALPHA-1".."ALPHA-6") — we resolve the role
  // userMessage: what the student typed
  // topic, subject, gradeLevel: context already parsed by the frontend
  // messageIndex: which message in the conversation (drives Fibonacci depth)
  public shared func askAgent(
    agentRole  : Text,
    userMessage : Text,
    topic       : Text,
    subject     : Text,
    gradeLevel  : Text,
    messageIndex : Nat
  ) : async Text {
    // Resolve role: if agentRole looks like an agent ID, look up the actual role
    let resolvedRole = resolveRole(agentRole);
    SovereignResponses.dispatch(resolvedRole, userMessage, topic, subject, gradeLevel, messageIndex)
  };

  // ── resolveRole ───────────────────────────────────────────────────────
  // Maps agent IDs like "ALPHA-1" to role names, or passes through role names directly.
  private func resolveRole(agentRole : Text) : Text {
    // Check if it's a known agent ID
    switch (agents.get(agentRole)) {
      case (?agent) {
        switch (agent.role) {
          case (#explainer) "sage";
          case (#quizmaster) "quill";
          case (#encourager) "spark";
          case (#guide) "atlas";
          case (#assessor) "echo";
          case (#curator) "nova";
        }
      };
      case null {
        // Not an agent ID — treat as a role name directly
        agentRole
      };
    }
  };
};
