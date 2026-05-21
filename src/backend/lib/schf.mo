// SCHF — Scholarship Finder lib
import Map "mo:core/Map";
import List "mo:core/List";
import Types "../types/schf";

module {
  public type ProgramStore = Map.Map<Nat, Types.ScholarshipProgram>;
  public type MatchStore   = List.List<Types.ScholarshipMatch>;
  public type Counter      = { var nextId : Nat };

  public func newProgramStore() : ProgramStore {
    Map.empty()
  };

  public func newMatchStore() : MatchStore {
    List.empty()
  };

  public func newCounter() : Counter {
    { var nextId = 1 }
  };

    func fibFloorNat(n : Nat) : Nat {
    var a : Nat = 1;
    var b : Nat = 1;
    while (b <= n) { let t = a + b; a := b; b := t };
    a
  };

public func addProgram(
    store : ProgramStore,
    counter : Counter,
    program : Types.ScholarshipProgram
  ) : Nat {
    let id = counter.nextId;
    counter.nextId += 1;
    store.add(id, { program with id });
    id
  };

  public func matchStudent(
    programStore : ProgramStore,
    matchStore : MatchStore,
    counter : Counter,
    studentPrincipal : Principal,
    achvSummary : [Text],
    matchedAt : Int
  ) : [Types.ScholarshipMatch] {
    let matched = programStore.values().filterMap(func(prog) : ?Types.ScholarshipMatch {
      // PHI-weighted match score: criteria overlap * 1618 / 1000
      let overlap = prog.eligibilityCriteria.filter(func(c) {
        achvSummary.find(func(a) { a == c }) != null
      }).size();
      if (overlap > 0) {
        let rawScore = (overlap * 1618) / 1000;
        let id = counter.nextId;
        counter.nextId += 1;
        let m : Types.ScholarshipMatch = {
          id;
          studentPrincipal;
          programId = prog.id;
          matchScore = fibFloorNat(rawScore);
          matchedAt;
          applicationStatus = #matched;
          notes = "";
        };
        matchStore.add(m);
        ?m
      } else { null }
    }).toArray();
    matched
  };

  public func updateStatus(
    matchStore : MatchStore,
    matchId : Nat,
    status : Types.ApplicationStatus
  ) : Bool {
    switch (matchStore.findIndex(func(m) { m.id == matchId })) {
      case null { false };
      case (?idx) {
        matchStore.put(idx, { matchStore.at(idx) with applicationStatus = status });
        true
      };
    }
  };

  public func getMatchesForStudent(
    matchStore : MatchStore,
    studentPrincipal : Principal
  ) : [Types.ScholarshipMatch] {
    matchStore.filter(func(m) { m.studentPrincipal == studentPrincipal }).toArray()
  };

  public func getStats(
    programStore : ProgramStore,
    matchStore : MatchStore
  ) : Types.SchfStats {
    let matches = matchStore.toArray();
    let awarded = matches.filter(func(m) { m.applicationStatus == #awarded }).size();
    {
      totalPrograms = programStore.size();
      totalMatches = matches.size();
      awardedCount = awarded;
      topCategories = [];
    }
  };
}
