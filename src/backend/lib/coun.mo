// COUN — Counselor Engine lib
import Map "mo:core/Map";
import Types "../types/coun";
import Array "mo:core/Array";

module {
  public type PlanStore = Map.Map<Principal, Types.CounselorPlan>;

  public func newStore() : PlanStore {
    Map.empty()
  };

    func fibFloorNat(n : Nat) : Nat {
    var a : Nat = 1;
    var b : Nat = 1;
    while (b <= n) { let t = a + b; a := b; b := t };
    a
  };

public func createPlan(
    store : PlanStore,
    plan : Types.CounselorPlan
  ) : () {
    store.add(plan.studentPrincipal, plan)
  };

  public func getPlan(
    store : PlanStore,
    studentPrincipal : Principal
  ) : ?Types.CounselorPlan {
    store.get(studentPrincipal)
  };

  public func updatePlan(
    store : PlanStore,
    studentPrincipal : Principal,
    updatedPlan : Types.CounselorPlan
  ) : Bool {
    switch (store.get(studentPrincipal)) {
      case null { false };
      case (?_) { store.add(studentPrincipal, updatedPlan); true };
    }
  };

  public func flagIep(
    store : PlanStore,
    studentPrincipal : Principal
  ) : Bool {
    switch (store.get(studentPrincipal)) {
      case null { false };
      case (?p) {
        store.add(studentPrincipal, { p with iepFlagged = true });
        true
      };
    }
  };

  public func addMilestone(
    store : PlanStore,
    studentPrincipal : Principal,
    milestone : Types.CounselorMilestone
  ) : Bool {
    switch (store.get(studentPrincipal)) {
      case null { false };
      case (?p) {
        store.add(studentPrincipal, { p with milestones = p.milestones.concat([milestone]) });
        true
      };
    }
  };

  public func getStats(
    store : PlanStore
  ) : Types.CounPlanStats {
    let plans = store.values().toArray();
    let total = plans.size();
    let iepCount = plans.filter(func(p) { p.iepFlagged }).size();
    let pathwayCount = plans.filter(func(p) { p.careerPathwayId != null }).size();
    var totalMilestones : Nat = 0;
    var completedMilestones : Nat = 0;
    for (p in plans.vals()) {
      totalMilestones += p.milestones.size();
      completedMilestones += p.milestones.filter(func(m) { m.completedAt != null }).size();
    };
    let rate = if (totalMilestones > 0) { (completedMilestones * 100) / totalMilestones } else { 0 };
    {
      totalPlans = total;
      iepFlaggedCount = iepCount;
      withCareerPathway = pathwayCount;
      milestoneCompletionRate = fibFloorNat(rate);
    }
  };
}
