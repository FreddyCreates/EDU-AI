// COUN — Counselor Engine API mixin
import CounLib "../lib/coun";
import Types "../types/coun";

mixin (
  planStore : CounLib.PlanStore
) {
  public shared ({ caller }) func createCounselorPlan(
    plan : Types.CounselorPlan
  ) : async () {
    ignore caller;
    CounLib.createPlan(planStore, plan)
  };

  public query func getCounselorPlan(
    studentPrincipal : Principal
  ) : async ?Types.CounselorPlan {
    CounLib.getPlan(planStore, studentPrincipal)
  };

  public shared ({ caller }) func updateCounselorPlan(
    studentPrincipal : Principal,
    updatedPlan : Types.CounselorPlan
  ) : async Bool {
    ignore caller;
    CounLib.updatePlan(planStore, studentPrincipal, updatedPlan)
  };

  public shared ({ caller }) func flagStudentIep(
    studentPrincipal : Principal
  ) : async Bool {
    ignore caller;
    CounLib.flagIep(planStore, studentPrincipal)
  };

  public shared ({ caller }) func addCounselorMilestone(
    studentPrincipal : Principal,
    milestone : Types.CounselorMilestone
  ) : async Bool {
    ignore caller;
    CounLib.addMilestone(planStore, studentPrincipal, milestone)
  };

  public query func getCounPlanStats() : async Types.CounPlanStats {
    CounLib.getStats(planStore)
  };
}
