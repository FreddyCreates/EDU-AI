import Metrics  "../lib/metrics";
import Common   "../types/common";
import Gvlt     "../types/gvlt";
import Tchr     "../types/tchr";
import Sessions "../types/sessions";
import Map      "mo:core/Map";
import List     "mo:core/List";

mixin (
  resultsStore : Map.Map<Common.UserId, List.List<Sessions.QuizResult>>,
  metricsState : Metrics.MetricsState,
) {
  // ── getLiveMetrics ──────────────────────────────────────────────────────────
  public query func getLiveMetrics() : async Common.LiveMetrics {
    Metrics.getLiveMetrics(resultsStore, metricsState);
  };

  // ── getGradePerformance ────────────────────────────────────────────────────
  public query func getGradePerformance(gradeLevel : Nat) : async [Gvlt.GradePerformance] {
    Metrics.getGradePerformance(gradeLevel);
  };

  // ── getTeacherClassMetrics ───────────────────────────────────────────────
  public query func getTeacherClassMetrics(teacherId : Text) : async [Tchr.TeacherClassMetrics] {
    Metrics.getTeacherClassMetrics(teacherId);
  };
  // ── getLiveSessionMetrics ──────────────────────────────────────────────────
  public query func getLiveSessionMetrics() : async Common.LiveSessionMetrics {
    Metrics.getLiveSessionMetrics(resultsStore, metricsState);
  };

  // ── getHeatmapData ─────────────────────────────────────────────────────────
  public query func getHeatmapData() : async [Common.ClassHeatmapData] {
    Metrics.getHeatmapData(resultsStore);
  };

  // ── getPrincipalGradeDrilldown ─────────────────────────────────────────────
  public query func getPrincipalGradeDrilldown(grade : Nat) : async Common.GradeDrilldown {
    Metrics.getPrincipalGradeDrilldown(resultsStore, metricsState, grade);
  };
};
