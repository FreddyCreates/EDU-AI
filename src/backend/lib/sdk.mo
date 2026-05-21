import Types "../types/sdk";
import Array "mo:core/Array";

module {

  /// Static sovereign SDK registry.
  /// All entryPoints are verified callable methods in the live canister.
  let registry : [Types.SdkEntry] = [

    // ── Teaching Interface ────────────────────────────────────────────────────
    {
      id             = "sdk-teaching";
      name           = "Teaching Interface";
      version        = "1.0.0";
      description    = "Entry point for the sovereign teacher. Routes a student's creative intent to the appropriate engine and returns doctrine, a welcome message, and a suggested next step. Every interaction produces an artifact.";
      accessProtocol = "update";
      category       = "teaching";
      entryPoints    = ["skaiTeach", "skaiRoute", "getSkaiDocensInfo"];
      status         = "active";
    },

    // ── Engine Interaction ────────────────────────────────────────────────────
    {
      id             = "sdk-engine-interaction";
      name           = "Engine Interaction";
      version        = "1.0.0";
      description    = "Direct interaction with the eight sovereign reasoning engines. Query any engine by its identifier with optional context. The passport-aware variant generates a KernelSeed from each session that can be sealed permanently.";
      accessProtocol = "update";
      category       = "interaction";
      entryPoints    = ["queryEngine", "queryEngineWithPassport"];
      status         = "active";
    },

    // ── Passport SDK ──────────────────────────────────────────────────────────
    {
      id             = "sdk-passport";
      name           = "Student Passport";
      version        = "1.0.0";
      description    = "Sovereign student identity and session memory. Every sealed KernelSeed is a permanent record of creation. Passports compound across sessions — students never start over. Includes lifecycle management and stats.";
      accessProtocol = "update";
      category       = "passport";
      entryPoints    = [
        "getSovereignPassport",
        "createSovereignPassport",
        "sealKernelSeed",
        "getKernelSeeds",
        "getPassportStats",
      ];
      status         = "active";
    },

    // ── Registry SDK ─────────────────────────────────────────────────────────
    {
      id             = "sdk-registry";
      name           = "Registry";
      version        = "1.0.0";
      description    = "Read-only access to the platform's sovereign registries: laws, engines, agents, and this SDK itself. All query calls — no state changes. Safe for caching and public display.";
      accessProtocol = "query";
      category       = "registry";
      entryPoints    = [
        "getLaws",
        "getLawById",
        "getLawByLatinName",
        "getEngines",
        "getEngineById",
        "getEngineByCodeName",
        "getAgents",
        "getAgent",
        "getWorkspaces",
        "getSdkEntries",
        "getSdkEntryById",
        "getSdkEntriesByCategory",
      ];
      status         = "active";
    },

    // ── Collegium SDK ─────────────────────────────────────────────────────────
    {
      id             = "sdk-collegium";
      name           = "Collegium";
      version        = "1.0.0";
      description    = "Public college enrollment and track access. Students enter through the Nexum Gate, enroll in tracks, advance through steps, and complete tracks to earn passport achievements. Three public tracks available.";
      accessProtocol = "update";
      category       = "collegium";
      entryPoints    = [
        "getTracks",
        "getTrackById",
        "enterNexumGate",
        "getMyGateEntries",
        "enrollInTrack",
        "advanceTrackStep",
        "completeTrack",
        "getMyEnrollments",
      ];
      status         = "active";
    },

    // ── Curriculum SDK ────────────────────────────────────────────────────────
    {
      id             = "sdk-curriculum";
      name           = "Curriculum";
      version        = "1.0.0";
      description    = "K-12 subject and topic navigation. Retrieve subjects by grade level and topics by subject. All curriculum data is pre-loaded and query-only — covers kindergarten through senior year.";
      accessProtocol = "query";
      category       = "curriculum";
      entryPoints    = ["getSubjectsByGrade", "getTopicsBySubject"];
      status         = "active";
    },

  ];

  public func getSdkEntries() : [Types.SdkEntry] {
    registry;
  };

  public func getSdkEntryById(id : Text) : ?Types.SdkEntry {
    var result : ?Types.SdkEntry = null;
    label search for (entry in registry.vals()) {
      if (entry.id == id) {
        result := ?entry;
        break search;
      };
    };
    result;
  };

  public func getSdkEntriesByCategory(category : Text) : [Types.SdkEntry] {
    registry.filter<Types.SdkEntry>(func(e) { e.category == category });
  };

}
