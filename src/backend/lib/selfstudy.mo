// Self-study domain — sovereign track creation and milestone management.
// All thresholds use Fibonacci floor values (1,2,3,5,8,13,21,34,55,89).
import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Common "../types/common";
import Types "../types/selfstudy";

module {
  /// Store types
  public type TrackStore = Map.Map<Text, Types.SelfStudyTrack>;

  /// Empty store constructor for main.mo wiring.
  public func emptyStore() : TrackStore { Map.empty() };

  // Fibonacci sequence used for milestone spacing (weeks before competition)
  let FIB : [Nat] = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233];

  // ── Floor to nearest Fibonacci ─────────────────────────────────────────
  func fibFloor(n : Nat) : Nat {
    var best : Nat = 1;
    for (f in FIB.vals()) {
      if (f <= n) best := f;
    };
    best;
  };

  // ── Generate Fibonacci-spaced milestones backward from competition date ──
  func _generateMilestones(
    category          : Text,
    weeksToCompetition : Nat,
  ) : [Types.SelfStudyMilestone] {
    // Select milestone definitions by category: (weeksBefore, title, description, domain)
    let rawMilestones : [(Nat, Text, Text, Text)] =
      if (category.contains(#text "UIL_CTE") or category.contains(#text "Skills USA") or category.contains(#text "Construction")) {
        [
          (13, "Safety Certification Review", "Complete OSHA 10-hour safety certification and review all required safety protocols for the competition environment.", "Safety & Compliance"),
          (8, "Blueprint Reading Fundamentals", "Master orthographic projection, tolerances, and material callouts. Practice reading and interpreting construction blueprints.", "Blueprint Reading"),
          (5, "GMAW Welding Techniques", "Practice Gas Metal Arc Welding (GMAW/MIG) to competition spec. Focus on bead consistency, penetration, and joint fit-up.", "Welding & Fabrication"),
          (3, "Structural Fabrication Practice", "Build full practice assemblies per competition specifications. Timed runs with quality inspection checklist.", "Structural Fabrication"),
          (2, "Math & Measurements Review", "Review linear measurement, layout math, and geometric calculations used in construction tasks.", "Mathematics"),
          (1, "Competition Simulation", "Full simulated competition run under timed conditions. Debrief and address remaining gaps.", "Competition Prep")
        ]
      } else if (category.contains(#text "Welding") or category.contains(#text "Fabrication")) {
        [
          (13, "Metal Properties & Safety", "Review material grades, PPE requirements, and OSHA welding safety standards.", "Safety & Theory"),
          (8, "Joint Design & Fit-Up", "Practice butt, T, lap, and corner joints. Focus on proper fit-up and tack welding.", "Joint Preparation"),
          (5, "SMAW/GMAW Skill Drills", "Repetitive weld bead practice across all positions: flat, horizontal, vertical, overhead.", "Welding Techniques"),
          (3, "Weld Quality Inspection", "Visual inspection criteria, discontinuity identification, and AWS acceptance standards.", "Quality Control"),
          (2, "Speed & Precision Runs", "Timed practice welds with quality scoring to simulate competition conditions.", "Competition Prep"),
          (1, "Final Simulation", "Full competition-format simulation with judge-style evaluation.", "Competition Simulation")
        ]
      } else if (category.contains(#text "Robotics") or category.contains(#text "Engineering")) {
        [
          (13, "Systems Architecture Review", "Review electromechanical systems, sensors, actuators, and control theory fundamentals.", "Systems Design"),
          (8, "Programming & Control Logic", "Implement autonomous behaviors, sensor fusion, and feedback control in code.", "Programming"),
          (5, "Mechanical Assembly Drills", "Build and rebuild key mechanisms under time constraints. Focus on precision and repeatability.", "Mechanical"),
          (3, "Integration & Debugging", "Full robot integration testing. Debug mechanical, electrical, and software issues.", "Integration"),
          (2, "Strategy & Game Analysis", "Analyze competition tasks, develop strategy, and practice field interactions.", "Strategy"),
          (1, "Competition Simulation", "Full simulated competition run. Timed autonomous and tele-op periods.", "Competition Prep")
        ]
      } else if (category.contains(#text "Culinary") or category.contains(#text "Food")) {
        [
          (13, "Food Safety & HACCP", "Review ServSafe principles, HACCP plans, and food handler certifications.", "Food Safety"),
          (8, "Knife Skills & Mise en Place", "Standardize cuts: julienne, brunoise, chiffonade. Practice mise en place discipline.", "Fundamental Techniques"),
          (5, "Recipe Development & Plating", "Develop competition recipes with consistent execution. Practice plating presentation.", "Culinary Arts"),
          (3, "Timed Production Runs", "Execute multi-course menus under timed competition conditions.", "Production Timing"),
          (2, "Flavor Profiling & Adjustments", "Refine seasoning, sauce balance, and texture. Practice sensory evaluation.", "Flavor Development"),
          (1, "Final Competition Simulation", "Full simulated competition service with judge-criteria scoring.", "Competition Prep")
        ]
      } else if (category.contains(#text "UIL_ACADEMIC") or category.contains(#text "Mathematics") or category.contains(#text "Science") or category.contains(#text "Computer Science")) {
        [
          (13, "Domain Foundation Review", "Review core concepts and formulas that appear most frequently in competition problems.", "Foundations"),
          (8, "Problem-Set Practice", "Work through 3 years of previous competition problem sets. Track weak areas.", "Problem Solving"),
          (5, "Timed Sprint Drills", "Speed-focused problem sets under competition time limits. Track problems per minute.", "Speed & Accuracy"),
          (3, "Weak Area Deep Dives", "Intensive focus on the 2-3 topic areas with lowest accuracy from prior sessions.", "Targeted Review"),
          (2, "Mock Competition", "Full simulated competition under exact rules and timing. Score and debrief.", "Simulation"),
          (1, "Final Review & Mental Prep", "Light review of key formulas and strategies. Focus on competition mindset and confidence.", "Competition Prep")
        ]
      } else if (category.contains(#text "UIL_MUSIC") or category.contains(#text "Band") or category.contains(#text "Orchestra") or category.contains(#text "Choir")) {
        [
          (13, "Music Theory & Sight-Reading", "Review scales, intervals, chord structures, and rhythmic patterns. Daily sight-reading exercises.", "Music Theory"),
          (8, "Technical Etudes", "Work through prescribed etudes and technical exercises at progressively faster tempos.", "Technical Practice"),
          (5, "Repertoire Deep Work", "Slow-practice difficult passages. Focus on intonation, dynamics, and articulation.", "Repertoire"),
          (3, "Performance Run-Throughs", "Full-length performance run-throughs with recording and self-evaluation.", "Performance Practice"),
          (2, "Ensemble Coordination", "Section and full-ensemble rehearsals focused on balance, blend, and unified phrasing.", "Ensemble"),
          (1, "Final Dress Rehearsal", "Performance-conditions full run. Mental preparation and equipment check.", "Competition Prep")
        ]
      } else if (category.contains(#text "UIL_ATHLETICS") or category.contains(#text "Athletics")) {
        [
          (13, "Baseline Assessment & Goal Setting", "Establish performance baselines. Set Fibonacci-progressive improvement targets.", "Assessment"),
          (8, "Strength & Conditioning Base", "Build foundational strength and cardiovascular capacity relevant to the sport.", "Conditioning"),
          (5, "Sport-Specific Skill Drills", "Intensive focus on the 2-3 technical skills most critical to competition performance.", "Skill Development"),
          (3, "Scrimmage & Competition Simulation", "Simulated competition scenarios. Film review and tactical adjustment.", "Game Simulation"),
          (2, "Peak Performance Prep", "Taper training load. Focus on recovery, nutrition, and mental readiness.", "Peak Phase"),
          (1, "Pre-Competition Protocol", "Light activation, team/individual warm-up protocols, final mental preparation.", "Competition Prep")
        ]
      } else {
        // Generic CUSTOM category
        [
          (13, "Domain Knowledge Review", "Review the foundational concepts, terminology, and skills required for your program area.", "Foundations"),
          (8, "Skill Identification & Practice", "Identify the core skills assessed in your competition. Begin structured practice sessions.", "Skill Development"),
          (5, "Technique Refinement", "Focus on precision and consistency. Address the specific weaknesses identified in week 8.", "Refinement"),
          (3, "Timed Practice Runs", "Practice under competition time constraints. Measure performance and set targets.", "Timed Practice"),
          (2, "Mock Competition", "Full simulation under competition rules. Debrief and address final gaps.", "Simulation"),
          (1, "Final Preparation", "Light review, mental prep, equipment check, and confidence building for competition day.", "Competition Prep")
        ]
      };

    // Filter to milestones that fit within the available weeks
    let buf = List.empty<Types.SelfStudyMilestone>();
    for ((wks, title, desc, domain) in rawMilestones.vals()) {
      if (wks <= weeksToCompetition) {
        buf.add({
          weeksBefore  = wks;
          title        = title;
          description  = desc;
          domain       = domain;
          isComplete   = false;
          completedAt  = null;
          masteryScore = 0;
        });
      };
    };
    buf.toArray();
  };

  // ── Compute mastery percentage from milestones ─────────────────────────
  func _computeMasteryPct(milestones : [Types.SelfStudyMilestone]) : Nat {
    let total = milestones.size();
    if (total == 0) return 0;
    var done : Nat = 0;
    for (m in milestones.vals()) {
      if (m.isComplete) done += 1;
    };
    fibFloor((done * 100) / total);
  };

  // ── Derive a deterministic track ID ───────────────────────────────────
  func _makeTrackId(caller : Common.UserId, title : Text, now : Common.Timestamp) : Text {
    let shortPrincipal = Text.fromIter(caller.toText().toIter().take(8));
    let shortTitle     = Text.fromIter(title.toIter().take(12));
    let ts             = Int.abs(now).toText();
    "TRACK-" # shortPrincipal # "-" # shortTitle # "-" # ts;
  };

  // ── Compute weeks between two nanosecond timestamps ───────────────────
  func _weeksUntil(now : Int, competitionDate : Int) : Nat {
    let nsPerWeek : Int = 7 * 24 * 60 * 60 * 1_000_000_000;
    let diff = competitionDate - now;
    if (diff <= 0) return 1;
    let weeks = diff / nsPerWeek;
    if (weeks < 1) return 1;
    Int.abs(weeks);
  };

  // ── Public API ─────────────────────────────────────────────────────────

  /// Create a new self-study prep track for the caller.
  /// Generates Fibonacci-spaced milestones backward from competitionDate.
  /// Returns the new track ID.
  public func createSelfStudyTrack(
    trackStore      : TrackStore,
    caller          : Common.UserId,
    title           : Text,
    category        : Text,
    competitionDate : Int,
    now             : Common.Timestamp,
  ) : Text {
    // Build Fibonacci-spaced milestones backward from competitionDate (in nanoseconds)
    // Fibonacci weeks before competition: 1, 2, 3, 5, 8, 13, 21, 34 weeks
    let fibWeeks : [Nat] = [1, 2, 3, 5, 8, 13, 21, 34];
    let _weekNs : Int = 7 * 24 * 3600 * 1_000_000_000;
    let milestones : [Types.SelfStudyMilestone] = fibWeeks.map<Nat, Types.SelfStudyMilestone>(
      func(w) {
        {
          weeksBefore  = w;
          title        = "Week -" # w.toText() # ": Prep milestone";
          description  = "Review and practice for " # title # " — " # w.toText() # " week(s) out";
          domain       = category;
          isComplete   = false;
          completedAt  = null;
          masteryScore = 0;
        }
      },
    );
    let id = "ss-" # Int.abs(now).toText() # "-" # Text.fromIter(caller.toText().toIter().take(6));
    let track : Types.SelfStudyTrack = {
      id              = id;
      title           = title;
      category        = category;
      competitionDate = competitionDate;
      createdAt       = now;
      milestones      = milestones;
      masteryPct      = 0;
      isActive        = true;
      passportSealed  = false;
    };
    trackStore.add(id, track);
    id;
  };

  /// Return all active and past tracks belonging to the caller.
  public func getMyTracks(
    trackStore : TrackStore,
    caller     : Common.UserId,
  ) : [Types.SelfStudyTrack] {
    let buf = List.empty<Types.SelfStudyTrack>();
    for ((_id, track) in trackStore.entries()) {
      // All tracks in store belong to users; we encode caller principal in the id
      let callerPrefix = Text.fromIter(caller.toText().toIter().take(6));
      if (track.id.contains(#text(callerPrefix))) {
        buf.add(track);
      };
    };
    buf.toArray();
  };

  /// Mark a milestone at milestoneIndex as complete and recompute masteryPct.
  /// Returns true on success, false if track/index not found.
  public func completeMilestone(
    trackStore     : TrackStore,
    caller         : Common.UserId,
    trackId        : Text,
    milestoneIndex : Nat,
    now            : Common.Timestamp,
  ) : Bool {
    let callerPrefix = Text.fromIter(caller.toText().toIter().take(6));
    switch (trackStore.get(trackId)) {
      case null false;
      case (?track) {
        // Verify ownership via id prefix
        if (not track.id.contains(#text(callerPrefix))) { return false };
        if (milestoneIndex >= track.milestones.size()) { return false };
        let updated = Array.tabulate(
          track.milestones.size(),
          func(i) {
            if (i == milestoneIndex) {
              { track.milestones[i] with isComplete = true; completedAt = ?now; masteryScore = 100 }
            } else {
              track.milestones[i]
            }
          },
        );
        // Recompute masteryPct = completed / total * 100
        var completedCount = 0;
        for (m in updated.vals()) {
          if (m.isComplete) { completedCount += 1 };
        };
        let masteryPct = (completedCount * 100) / updated.size();
        let updatedTrack : Types.SelfStudyTrack = {
          track with
          milestones = updated;
          masteryPct = masteryPct;
        };
        trackStore.add(trackId, updatedTrack);
        true;
      };
    };
  };

  /// Return the full track record for a given ID (caller must own the track).
  public func getSelfStudyStats(
    trackStore : TrackStore,
    caller     : Common.UserId,
    trackId    : Text,
  ) : ?Types.SelfStudyTrack {
    let callerPrefix = Text.fromIter(caller.toText().toIter().take(6));
    switch (trackStore.get(trackId)) {
      case null null;
      case (?track) {
        if (track.id.contains(#text(callerPrefix))) { ?track } else { null };
      };
    };
  };
};
