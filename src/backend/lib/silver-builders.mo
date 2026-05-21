import Map "mo:core/Map";
import Time "mo:core/Time";
import Types "../types/silver-builders";
import Int "mo:core/Int";

module {
  public type SilverBuilderStore = Map.Map<Text, Types.SilverBuilder>;
  public type StatsStore = Map.Map<Text, Types.BuilderStats>;

  let SEED_TIME : Int = 0; // epoch anchor — deterministic seed

  let SEEDS : [Types.SilverBuilder] = [
    {
      id = "argentum-curriculae";
      codeName = "ARGENTUM-CURRICULAE";
      domain = "Curriculum Engine";
      purpose = "Governs all subject matter, TEKS alignment, grade progression, and topic sequencing across K-12";
      domainsOwned = ["subjects", "topics", "grade-levels", "teks-seeds", "curriculum-seeding"];
      status = #active;
      createdAt = SEED_TIME;
      protocol = "PROTOCOL::CURRICULAE — Sequence before you seed. Align every topic to sovereign doctrine before it enters the registry. Nothing unaligned passes.";
    },
    {
      id = "argentum-fluxus";
      codeName = "ARGENTUM-FLUXUS";
      domain = "Workflow Orchestration";
      purpose = "Commands the study flow state machine — lesson to practice to quiz to review to passport stamp";
      domainsOwned = ["workflow-states", "step-transitions", "completion-gates", "session-flow"];
      status = #active;
      createdAt = SEED_TIME;
      protocol = "PROTOCOL::FLUXUS — Every step must complete before the next opens. No skipping gates. The flow is sovereign law.";
    },
    {
      id = "argentum-adaptus";
      codeName = "ARGENTUM-ADAPTUS";
      domain = "Intelligence / Adaptive Layer";
      purpose = "Watches student sessions and fires proactive suggestions — struggle detection, advancement triggers, study rhythm";
      domainsOwned = ["session-scoring", "auto-suggest", "adaptive-routing", "struggle-detection"];
      status = #active;
      createdAt = SEED_TIME;
      protocol = "PROTOCOL::ADAPTUS — Read the signal before you respond. Score first, suggest second. Never interrupt — only anticipate.";
    },
    {
      id = "argentum-nexus";
      codeName = "ARGENTUM-NEXUS";
      domain = "PWA / Chromebook Layer";
      purpose = "Governs offline capability, installability, kiosk compatibility, and device adaptation for school environments";
      domainsOwned = ["service-worker", "offline-cache", "pwa-manifest", "kiosk-mode", "device-adaptation"];
      status = #active;
      createdAt = SEED_TIME;
      protocol = "PROTOCOL::NEXUS — Every student device is a sovereign node. The platform must work without a network. Offline is not a fallback — it is a right.";
    },
    {
      id = "argentum-porta";
      codeName = "ARGENTUM-PORTA";
      domain = "Auth / Factory Layer";
      purpose = "Controls all access gates — factory demo, factory admin setup, role separation, and first-deploy lock";
      domainsOwned = ["factory-setup", "demo-session", "role-enforcement", "access-gates", "admin-bootstrap"];
      status = #active;
      createdAt = SEED_TIME;
      protocol = "PROTOCOL::PORTA — The gate opens once per identity. Factory setup locks on first call. Roles never mix. The first through becomes sovereign.";
    },
    {
      id = "argentum-mnemon";
      codeName = "ARGENTUM-MNEMON";
      domain = "Passport / Memory Layer";
      purpose = "Sovereign memory of every student journey — kernel seeds, passport sealing, session lineage, never forgotten";
      domainsOwned = ["passport-records", "kernel-seeds", "session-lineage", "memory-compression", "achievement-sealing"];
      status = #active;
      createdAt = SEED_TIME;
      protocol = "PROTOCOL::MNEMON — Memory is identity. Every session becomes a seed. Every seed is sealed forever. Nothing the student builds is ever lost.";
    },
  ];

  public func seedBuilders(store : SilverBuilderStore) : () {
    for (builder in SEEDS.values()) {
      store.add(builder.id, builder);
    };
  };

  public func getAll(store : SilverBuilderStore) : [Types.SilverBuilder] {
    store.entries().map(func((_, b)) { b }).toArray();
  };

  public func getById(store : SilverBuilderStore, id : Text) : ?Types.SilverBuilder {
    store.get(id);
  };

  public func getByDomain(store : SilverBuilderStore, domain : Text) : ?Types.SilverBuilder {
    switch (store.entries().find(func((_, b)) { b.domain == domain })) {
      case (?(_, b)) { ?b };
      case null { null };
    };
  };

  public func incrementBuilderStat(
    statsStore : StatsStore,
    domain : Text,
    stat : Types.BuilderStatField,
    now : Int,
  ) {
    let existing : Types.BuilderStats = switch (statsStore.get(domain)) {
      case (?s) s;
      case null { { sessionsProcessed = 0; seedsSealed = 0; workflowCompletions = 0; lastActiveAt = now } };
    };
    let updated : Types.BuilderStats = switch stat {
      case (#session) { { existing with sessionsProcessed = existing.sessionsProcessed + 1; lastActiveAt = now } };
      case (#seed)    { { existing with seedsSealed = existing.seedsSealed + 1; lastActiveAt = now } };
      case (#workflow){ { existing with workflowCompletions = existing.workflowCompletions + 1; lastActiveAt = now } };
    };
    statsStore.add(domain, updated);
  };

  public func getBuilderStats(statsStore : StatsStore, builderId : Text) : ?Types.BuilderStats {
    statsStore.get(builderId);
  };

  public func getAllBuilderStats(statsStore : StatsStore) : [(Text, Types.BuilderStats)] {
    statsStore.entries().toArray();
  };

  public func getSilverBuilderRegistry(store : SilverBuilderStore) : [Types.SilverBuilder] {
    getAll(store);
  };
};
