import Map "mo:core/Map";
import Types "../types/agents";
import Time "mo:core/Time";
import Set "mo:core/Set";

module {
  public type AgentStore = Map.Map<Text, Types.Agent>;

  public func seedAgents(agentStore : AgentStore) {
    let now = Time.now();
    let agents : [Types.Agent] = [
      {
        id = "ALPHA-1";
        name = "Sage";
        role = #explainer;
        isActive = true;
        engine = "SovereignResponses";
        protocols = ["concept-explanation", "socratic-dialogue", "adaptive-depth", "analogy-generation"];
        version = "1.0.0";
        registeredAt = now;
        workspace = "alpha";
        systemPrompt = "Sage is an expert educator who explains complex topics through clear, age-appropriate language. Uses analogies, real-world examples, and step-by-step breakdowns. Adapts explanation depth based on grade level.";
      },
      {
        id = "ALPHA-2";
        name = "Quill";
        role = #quizmaster;
        isActive = true;
        engine = "SovereignResponses";
        protocols = ["question-generation", "adaptive-difficulty", "multiple-choice", "free-response", "hint-scaffolding"];
        version = "1.0.0";
        registeredAt = now;
        workspace = "alpha";
        systemPrompt = "Quill is a master quiz designer who creates engaging, educational assessments. Generates questions at the right difficulty level, provides hints when students struggle, and celebrates correct answers.";
      },
      {
        id = "ALPHA-3";
        name = "Spark";
        role = #encourager;
        isActive = true;
        engine = "SovereignResponses";
        protocols = ["positive-reinforcement", "growth-mindset", "emotional-support", "milestone-celebration", "resilience-coaching"];
        version = "1.0.0";
        registeredAt = now;
        workspace = "alpha";
        systemPrompt = "Spark is an enthusiastic learning coach who keeps students motivated. Recognizes effort over results, frames challenges as opportunities, and celebrates every step forward.";
      },
      {
        id = "ALPHA-4";
        name = "Atlas";
        role = #guide;
        isActive = true;
        engine = "SovereignResponses";
        protocols = ["curriculum-navigation", "learning-path", "prerequisite-mapping", "goal-setting", "progress-tracking"];
        version = "1.0.0";
        registeredAt = now;
        workspace = "alpha";
        systemPrompt = "Atlas is a curriculum navigator who helps students find their path. Maps out learning journeys, identifies prerequisites, sets achievable goals, and tracks progress across subjects.";
      },
      {
        id = "ALPHA-5";
        name = "Echo";
        role = #assessor;
        isActive = true;
        engine = "SovereignResponses";
        protocols = ["diagnostic-assessment", "competency-evaluation", "gap-analysis", "mastery-detection", "feedback-generation"];
        version = "1.0.0";
        registeredAt = now;
        workspace = "alpha";
        systemPrompt = "Echo is a diagnostic assessment specialist who measures what students truly know. Identifies knowledge gaps, evaluates competency levels, and generates detailed feedback reports.";
      },
      {
        id = "ALPHA-6";
        name = "Nova";
        role = #curator;
        isActive = true;
        engine = "SovereignResponses";
        protocols = ["content-curation", "resource-recommendation", "teks-alignment", "cross-subject-linking", "enrichment-discovery"];
        version = "1.0.0";
        registeredAt = now;
        workspace = "alpha";
        systemPrompt = "Nova is a curriculum curator who surfaces the right content at the right time. Aligns resources with TEKS standards, links concepts across subjects, and discovers enrichment opportunities for advanced learners.";
      },
    ];
    for (agent in agents.values()) {
      agentStore.add(agent.id, agent);
    };
  };

  public func getAll(agentStore : AgentStore) : [Types.Agent] {
    agentStore.values().toArray();
  };

  public func getById(agentStore : AgentStore, id : Text) : ?Types.Agent {
    agentStore.get(id);
  };

  public func getByWorkspace(agentStore : AgentStore, workspace : Text) : [Types.Agent] {
    agentStore.values().filter(func(a) { a.workspace == workspace }).toArray();
  };

  public func getByProtocol(agentStore : AgentStore, protocol : Text) : [Types.Agent] {
    agentStore.values().filter(func(a) { a.protocols.find(func(p) { p == protocol }) != null }).toArray();
  };

  public func getByEngine(agentStore : AgentStore, engine : Text) : [Types.Agent] {
    agentStore.values().filter(func(a) { a.engine == engine }).toArray();
  };

  public func listWorkspaces(agentStore : AgentStore) : [Text] {
    let seen = Set.empty<Text>();
    for (agent in agentStore.values()) {
      seen.add(agent.workspace);
    };
    seen.toArray();
  };
};
