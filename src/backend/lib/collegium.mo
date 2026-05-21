// COLLEGIUM-PUBLICA — domain logic for the public sovereign college
import Map "mo:core/Map";
import List "mo:core/List";
import Types "../types/collegium";

module {
  // ── Store aliases ────────────────────────────────────────────────────────
  public type EnrollmentStore = Map.Map<Principal, List.List<Types.TrackEnrollment>>;
  public type GateEntryStore  = Map.Map<Principal, List.List<Types.NexumGateEntry>>;

  // ── Static track catalogue ───────────────────────────────────────────────
  let TRACKS : [Types.Track] = [
    {
      id             = #buildFirstAI;
      codeName       = "BUILD-YOUR-FIRST-AI";
      title          = "Build Your First AI";
      subtitle       = "Guided by GENITOR + SKAI_DOCENS";
      description    = "In 15 minutes, you will create a named sovereign entity — an AI that belongs to you. GENITOR guides the creation. SKAI_DOCENS explains every step as doctrine. You walk out with something real.";
      guidingEngines = ["GENITOR", "SKAI_DOCENS"];
      durationMinutes = 15;
      stepCount      = 5;
    },
    {
      id             = #teachAIToRemember;
      codeName       = "TEACH-AI-TO-REMEMBER";
      title          = "Teach Your AI to Remember";
      subtitle       = "Guided by MEMORIA-VIVA";
      description    = "Watch your AI compound across sessions. Every input becomes a KERNEL_SEED. Every seed deepens the memory. Your AI learns your patterns and grows stronger with every interaction.";
      guidingEngines = ["MEMORIA-VIVA"];
      durationMinutes = 20;
      stepCount      = 4;
    },
    {
      id             = #giveAIAVoice;
      codeName       = "GIVE-AI-A-VOICE";
      title          = "Give Your AI a Voice";
      subtitle       = "Guided by LOGOS";
      description    = "Speak and your AI listens. LOGOS transcribes, compresses to a kernel seed, and injects it into the cognition layer. Your voice becomes doctrine. Your AI speaks back in your own creative language.";
      guidingEngines = ["LOGOS"];
      durationMinutes = 10;
      stepCount      = 3;
    },
  ];

  // ── Track catalogue queries ──────────────────────────────────────────────
  public func getTracks() : [Types.Track] { TRACKS };

  public func getTrackById(id : Types.TrackId) : ?Types.Track {
    var result : ?Types.Track = null;
    for (t in TRACKS.vals()) {
      if (t.id == id) { result := ?t };
    };
    result;
  };

  // ── NEXUM-GATE — sovereign entry ─────────────────────────────────────────
  public func enterNexumGate(
    store : GateEntryStore,
    studentId : Principal,
    collegium : Text,
    now : Int,
  ) : Types.NexumGateEntry {
    let entry : Types.NexumGateEntry = {
      studentId;
      collegium;
      enteredAt = now;
      appliedLaw = "LEX_ADOPTIO";
    };
    let existing = switch (store.get(studentId)) {
      case (?list) list;
      case null List.empty<Types.NexumGateEntry>();
    };
    existing.add(entry);
    store.add(studentId, existing);
    entry;
  };

  public func getGateEntries(
    store     : GateEntryStore,
    studentId : Principal,
  ) : [Types.NexumGateEntry] {
    switch (store.get(studentId)) {
      case (?list) list.toArray();
      case null [];
    };
  };

  // ── Track enrollment ─────────────────────────────────────────────────────
  public func enrollInTrack(
    store : EnrollmentStore,
    studentId : Principal,
    trackId : Types.TrackId,
    now : Int,
  ) : Types.TrackEnrollment {
    let enrollment : Types.TrackEnrollment = {
      studentId;
      trackId;
      enrolledAt = now;
      completedAt = null;
      currentStep = 0;
      createdArtifactName = null;
    };
    let existing = switch (store.get(studentId)) {
      case (?l) l;
      case null List.empty<Types.TrackEnrollment>();
    };
    // Remove any prior active enrollment for the same track before re-enrolling
    let filtered = existing.filter(func(e : Types.TrackEnrollment) : Bool {
      e.trackId != trackId or e.completedAt != null
    });
    filtered.add(enrollment);
    store.add(studentId, filtered);
    enrollment;
  };

  public func advanceTrackStep(
    store : EnrollmentStore,
    studentId : Principal,
    trackId : Types.TrackId,
    artifactName : ?Text,
    _now : Int,
  ) : ?Types.TrackEnrollment {
    let list = switch (store.get(studentId)) {
      case (?l) l;
      case null return null;
    };
    var updated : ?Types.TrackEnrollment = null;
    let newList = list.map<Types.TrackEnrollment, Types.TrackEnrollment>(func(e : Types.TrackEnrollment) : Types.TrackEnrollment {
      if (e.trackId == trackId and e.completedAt == null) {
        let next : Types.TrackEnrollment = {
          e with
          currentStep = e.currentStep + 1;
          createdArtifactName = switch (artifactName) {
            case (?n) ?n;
            case null e.createdArtifactName;
          };
        };
        updated := ?next;
        next;
      } else { e };
    });
    store.add(studentId, newList);
    updated;
  };

  public func completeTrack(
    store : EnrollmentStore,
    studentId : Principal,
    trackId : Types.TrackId,
    artifactName : ?Text,
    now : Int,
  ) : ?Types.TrackEnrollment {
    let list = switch (store.get(studentId)) {
      case (?l) l;
      case null return null;
    };
    var updated : ?Types.TrackEnrollment = null;
    let newList = list.map<Types.TrackEnrollment, Types.TrackEnrollment>(func(e : Types.TrackEnrollment) : Types.TrackEnrollment {
      if (e.trackId == trackId and e.completedAt == null) {
        let done : Types.TrackEnrollment = {
          e with
          completedAt = ?now;
          createdArtifactName = switch (artifactName) {
            case (?n) ?n;
            case null e.createdArtifactName;
          };
        };
        updated := ?done;
        done;
      } else { e };
    });
    store.add(studentId, newList);
    updated;
  };

  public func getEnrollments(
    store     : EnrollmentStore,
    studentId : Principal,
  ) : [Types.TrackEnrollment] {
    switch (store.get(studentId)) {
      case (?list) list.toArray();
      case null [];
    };
  };

  // ── Private helpers ───────────────────────────────────────────────────────
  func _getOrCreateList(
    store     : EnrollmentStore,
    studentId : Principal,
  ) : List.List<Types.TrackEnrollment> {
    switch (store.get(studentId)) {
      case (?list) list;
      case null List.empty<Types.TrackEnrollment>();
    };
  };
};
