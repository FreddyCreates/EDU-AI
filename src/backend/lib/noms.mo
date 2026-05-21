// NOMS — Nomination Pipeline
// LEX_SOVEREIGNUS: All nomination logic is sovereign and native.
// LEX_QUAESTIO: Every flagged student has a clear pathway forward.
//
// Teacher submits a nomination for a flagged student.
// Returns per-student and per-teacher nomination history.

import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Common "../types/common";
import Types "../types/recognition";

module {

  public type NomStore = Map.Map<Common.UserId, List.List<Types.NominationRecord>>;

  // ── makeId ────────────────────────────────────────────────────────────────
  func makeId(studentId : Common.UserId, program : Text, now : Common.Timestamp) : Text {
    "NOM-" # Text.fromIter(studentId.toText().toIter().take(6)) # "-" # program.size().toText() # "-" # Int.abs(now).toText();
  };

  // ── submitNomination ──────────────────────────────────────────────────────
  public func submitNomination(
    nomStore    : NomStore,
    studentId   : Common.UserId,
    programName : Text,
    teacherNote : Text,
    now         : Common.Timestamp,
  ) : Types.NominationRecord {
    let nom : Types.NominationRecord = {
      id          = makeId(studentId, programName, now);
      studentId   = studentId;
      programName = programName;
      teacherNote = teacherNote;
      submittedAt = now;
      status      = #submitted;
    };
    let list = switch (nomStore.get(studentId)) {
      case (?l) l;
      case null {
        let fresh = List.empty<Types.NominationRecord>();
        nomStore.add(studentId, fresh);
        fresh;
      };
    };
    list.add(nom);
    nom;
  };

  // ── getNominations for a student ──────────────────────────────────────────
  public func getNominations(
    nomStore  : NomStore,
    studentId : Common.UserId,
  ) : [Types.NominationRecord] {
    switch (nomStore.get(studentId)) {
      case (?list) list.toArray();
      case null    [];
    };
  };

  // ── getAllNominations ─────────────────────────────────────────────────────
  public func getAllNominations(nomStore : NomStore) : [Types.NominationRecord] {
    let all = List.empty<Types.NominationRecord>();
    for ((_id, list) in nomStore.entries()) {
      for (nom in list.toArray().vals()) {
        all.add(nom);
      };
    };
    all.toArray();
  };

  // ── totalNomCount ─────────────────────────────────────────────────────────
  public func totalNomCount(nomStore : NomStore) : Nat {
    var n = 0;
    for ((_id, list) in nomStore.entries()) {
      n += list.size();
    };
    n;
  };
};
