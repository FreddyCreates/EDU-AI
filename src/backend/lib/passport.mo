import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Common "../types/common";
import Types "../types/passport";
import Principal "mo:core/Principal";
import Float "mo:core/Float";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Int "mo:core/Int";

module {
  // PassportStore maps UserId -> SovereignPassport
  // KernelStore maps UserId -> List of KernelSeeds (mutable, for efficient appends)
  public type PassportStore = Map.Map<Common.UserId, Types.SovereignPassport>;
  public type SeedStore = Map.Map<Common.UserId, List.List<Types.KernelSeed>>;

  /// Derive a short passport ID from a Principal.
  /// Format: "PP-" + first 8 chars of the principal text.
  func makePassportId(holder : Common.UserId) : Text {
    let full = holder.toText();
    let short = if (full.size() >= 8) {
      Text.fromIter(full.toIter().take(8));
    } else {
      full;
    };
    "PP-" # short;
  };

  public func getPassport(
    passports : PassportStore,
    seedStore : SeedStore,
    holder : Common.UserId,
  ) : ?Types.SovereignPassport {
    switch (passports.get(holder)) {
      case null null;
      case (?p) {
        let seeds = switch (seedStore.get(holder)) {
          case (?list) list.toArray();
          case null [];
        };
        ?{ p with kernelSeeds = seeds; totalSessions = seeds.size() };
      };
    };
  };

  public func createPassport(
    passports : PassportStore,
    seedStore : SeedStore,
    holder : Common.UserId,
    studentName : Text,
    gradeLevel : Text,
    collegium : Text,
    now : Common.Timestamp,
  ) : Types.SovereignPassport {
    let passport : Types.SovereignPassport = {
      holder = holder;
      passportId = makePassportId(holder);
      studentName = studentName;
      gradeLevel = gradeLevel;
      collegium = collegium;
      kernelSeeds = [];
      totalSessions = 0;
      createdAt = now;
      lastActiveAt = now;
      achievements = [];
    };
    passports.add(holder, passport);
    // Ensure a seed list exists for this holder
    switch (seedStore.get(holder)) {
      case null seedStore.add(holder, List.empty<Types.KernelSeed>());
      case _ {};
    };
    passport;
  };

  public func sealKernelSeed(
    passports : PassportStore,
    seedStore : SeedStore,
    holder : Common.UserId,
    seed : Types.KernelSeed,
    now : Common.Timestamp,
  ) : Bool {
    switch (passports.get(holder)) {
      case null false;
      case (?p) {
        // Append seed to the seed list
        let list = switch (seedStore.get(holder)) {
          case (?l) l;
          case null {
            let fresh = List.empty<Types.KernelSeed>();
            seedStore.add(holder, fresh);
            fresh;
          };
        };
        list.add(seed);
        let totalSeeds = list.size();
        // Recompute achievement badges
        let badges = computeAchievements(totalSeeds);
        // Update lastActiveAt, totalSessions, achievements on the passport
        let updated : Types.SovereignPassport = {
          p with
          lastActiveAt = now;
          totalSessions = totalSeeds;
          achievements = badges;
        };
        passports.add(holder, updated);
        true;
      };
    };
  };

  // ── Achievement badge computation ────────────────────────────────────────
  // F(1)=1, F(5)=5, F(7)=13, F(10)=55
  func computeAchievements(totalSeeds : Nat) : [Text] {
    let buf = List.empty<Text>();
    if (totalSeeds >= 1)  buf.add("First Seed");
    if (totalSeeds >= 5)  buf.add("Scholar");
    if (totalSeeds >= 13) buf.add("Devotee");
    if (totalSeeds >= 55) buf.add("Sovereign");
    buf.toArray();
  };

  public func getKernelSeeds(
    seedStore : SeedStore,
    holder : Common.UserId,
  ) : [Types.KernelSeed] {
    switch (seedStore.get(holder)) {
      case (?list) list.toArray();
      case null [];
    };
  };

  // ── Full PassportStats with PHI compounding ───────────────────────────────
  // compoundScore = Σ seed_weight × PHI^position_from_end
  public func getFullPassportStats(
    passports : PassportStore,
    seedStore : SeedStore,
    holder : Common.UserId,
  ) : ?Types.PassportStats {
    let PHI : Float = 1.6180339887;
    switch (passports.get(holder)) {
      case null null;
      case (?p) {
        let seeds = switch (seedStore.get(holder)) {
          case (?list) list.toArray();
          case null [];
        };
        let total = seeds.size();
        // PHI-spaced zone boundaries (FIB: hot=last 5, warm=13, cold=55, rest=frozen)
        let hotCutoff : Nat = if (total > 5) total - 5 else 0;
        let warmCutoff : Nat = if (total > 13) total - 13 else 0;
        let coldCutoff : Nat = if (total > 55) total - 55 else 0;
        var hotSeeds = 0;
        var warmSeeds = 0;
        var coldSeeds = 0;
        var frozenSeeds = 0;
        var compoundScore : Float = 0.0;
        var i = 0;
        while (i < total) {
          let posFromEnd : Nat = if (i < total) { total - i } else { 1 };
          compoundScore += Float.pow(PHI, posFromEnd.toFloat());
          if (i >= hotCutoff) { hotSeeds += 1 }
          else if (i >= warmCutoff) { warmSeeds += 1 }
          else if (i >= coldCutoff) { coldSeeds += 1 }
          else { frozenSeeds += 1 };
          i += 1;
        };
        ?{
          totalSeeds    = total;
          hotSeeds      = hotSeeds;
          warmSeeds     = warmSeeds;
          coldSeeds     = coldSeeds;
          frozenSeeds   = frozenSeeds;
          achievements  = p.achievements;
          compoundScore = compoundScore;
        };
      };
    };
  };

  // ── Auto-seal from a study session ───────────────────────────────────────
  // Called automatically after quiz completion. Returns seed ID.
  public func autoSealFromSession(
    passports  : PassportStore,
    seedStore  : SeedStore,
    holder     : Common.UserId,
    summary    : Text,
    engine     : Text,
    subject    : Text,
    gradeLevel : Text,
    now        : Common.Timestamp,
  ) : Text {
    // Ensure passport exists
    switch (passports.get(holder)) {
      case null {
        ignore createPassport(passports, seedStore, holder, "Student", gradeLevel, "COLLEGIUM-COGNITIO", now);
      };
      case _ {};
    };
    let seedId = "seed-" # Int.abs(now).toText() # "-" # Text.fromIter(holder.toText().toIter().take(6));
    let seed : Types.KernelSeed = {
      id = seedId;
      sessionSummary = summary;
      engineUsed = engine;
      trackName = subject;
      createdAt = now;
      artifactName = ?(subject # " " # gradeLevel # " Session");
    };
    ignore sealKernelSeed(passports, seedStore, holder, seed, now);
    seedId;
  };

  /// Compute SSS (Student State Score) from the caller's passport.
  /// Formula: FLOR( M*161/100 + V*61/100 + P*38/100 )
  /// M = mastery (totalSeeds*5 capped 100), V = velocity (hotSeeds*10 capped 100),
  /// P = persistence (totalSeeds*3 capped 100). Floor to nearest Fibonacci in [1..89].
  public func getSSSScore(
    passports : PassportStore,
    seedStore : SeedStore,
    holder    : Common.UserId,
  ) : Nat {
    let fibSeq : [Nat] = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
    let totalSeeds = switch (seedStore.get(holder)) {
      case (?list) list.size();
      case null 0;
    };
    ignore (passports);
    let hotSeeds : Nat = if (totalSeeds > 5) 5 else totalSeeds;
    let m : Nat = Nat.min(100, totalSeeds * 5);
    let v : Nat = Nat.min(100, hotSeeds * 10);
    let p : Nat = Nat.min(100, totalSeeds * 3);
    let sssRaw : Nat = (m * 161 / 100) + (v * 61 / 100) + (p * 38 / 100);
    var best : Nat = 1;
    for (f in fibSeq.vals()) {
      if (f <= sssRaw) best := f;
    };
    best;
  };

  public func getPassportStats(
    passports : PassportStore,
    seedStore : SeedStore,
    holder : Common.UserId,
  ) : ?{ totalSeeds : Nat; totalSessions : Nat; lastActive : Common.Timestamp } {
    switch (passports.get(holder)) {
      case null null;
      case (?p) {
        let totalSeeds = switch (seedStore.get(holder)) {
          case (?list) list.size();
          case null 0;
        };
        ?{ totalSeeds = totalSeeds; totalSessions = p.totalSessions; lastActive = p.lastActiveAt };
      };
    };
  };
};
