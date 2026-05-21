import { f as useActor, h as createActor } from "./index-BivnQ6bB.js";
import { a as useQuery, b as useMutation } from "./query-8urnerR0.js";
function useHeatmapData() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["heatmap-data"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getHeatmapData();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 21e3
    // F(8)*1000
  });
}
function useLiveSessionMetrics() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["live-session-metrics"],
    queryFn: async () => {
      if (!actor)
        return {
          topSubjects: [],
          totalActiveSessions: 0n,
          timestamp: 0n,
          studentsOnline: 0n,
          systemCoherence: 0n
        };
      return actor.getLiveSessionMetrics();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 8e3
    // F(6)*1000
  });
}
function useListDigestJobs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["digest-jobs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listDigestJobs();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 13e3
    // F(7)*1000
  });
}
function useGradeVaultContents(grade) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["grade-vault-contents", grade.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getGradeVaultContents(grade);
    },
    enabled: !!actor && !isFetching && grade > 0n,
    refetchInterval: 21e3
    // F(8)*1000
  });
}
function useApproveClient() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({ requestId, apiKey }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.approveClient(requestId, apiKey);
    }
  });
}
function useListPendingRegistrations() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["pending-registrations"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listPendingRegistrations();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 13e3
    // F(7)*1000
  });
}
function useStaffRoster() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["staff-roster"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getStaffRoster();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 21e3
    // F(8)*1000
  });
}
function useStaffActivityLog(staffId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["staff-activity-log", staffId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getStaffActivityLog(staffId);
    },
    enabled: !!actor && !isFetching && staffId.length > 0,
    refetchInterval: 13e3
    // F(7)*1000
  });
}
function useUpdateStaffRole() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({ staffId, newRole }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateStaffRole(staffId, newRole);
    }
  });
}
export {
  useGradeVaultContents as a,
  useStaffRoster as b,
  useUpdateStaffRole as c,
  useStaffActivityLog as d,
  useLiveSessionMetrics as e,
  useHeatmapData as f,
  useListPendingRegistrations as g,
  useApproveClient as h,
  useListDigestJobs as u
};
