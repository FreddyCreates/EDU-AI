import { createActor } from "@/backend";
import type {
  ActivityEntry,
  ApiUsageStats,
  ClassHeatmapData,
  DigestJob,
  DigestResult,
  DigestStatus,
  GradeDrilldown,
  LiveSessionMetrics,
  RegistrationRequest,
  RegistrationResult,
  StaffMember,
  StaffRole,
  VaultEntry,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery } from "@tanstack/react-query";

// ─── Principal Heatmap ────────────────────────────────────────────────────────

export function useHeatmapData() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ClassHeatmapData[]>({
    queryKey: ["heatmap-data"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getHeatmapData();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 21000, // F(8)*1000
  });
}

// ─── Live Session Metrics ─────────────────────────────────────────────────────

export function useLiveSessionMetrics() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<LiveSessionMetrics>({
    queryKey: ["live-session-metrics"],
    queryFn: async () => {
      if (!actor)
        return {
          topSubjects: [],
          totalActiveSessions: 0n,
          timestamp: 0n,
          studentsOnline: 0n,
          systemCoherence: 0n,
        };
      return actor.getLiveSessionMetrics();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 8000, // F(6)*1000
  });
}

// ─── Principal Grade Drill-down ───────────────────────────────────────────────

export function usePrincipalGradeDrilldown(grade: bigint) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<GradeDrilldown>({
    queryKey: ["principal-grade-drilldown", grade.toString()],
    queryFn: async () => {
      if (!actor)
        return {
          fibCycleStamp: 0n,
          masteryDistribution: [],
          totalStudents: 0n,
          grade,
          subjectBreakdown: [],
          strugglingStudents: [],
        };
      return actor.getPrincipalGradeDrilldown(grade);
    },
    enabled: !!actor && !isFetching && grade > 0n,
    refetchInterval: 13000, // F(7)*1000
  });
}

// ─── Textbook Digester ────────────────────────────────────────────────────────

export function useDigestCurriculum() {
  const { actor } = useActor(createActor);
  return useMutation<
    DigestResult,
    Error,
    {
      title: string;
      gradeLevel: bigint;
      subject: string;
      rawText: string;
      teacherId: string;
    }
  >({
    mutationFn: async ({ title, gradeLevel, subject, rawText, teacherId }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.digestCurriculumText(
        title,
        gradeLevel,
        subject,
        rawText,
        teacherId,
      );
    },
  });
}

export function useDigestStatus(jobId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<DigestStatus | null>({
    queryKey: ["digest-status", jobId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getDigestStatus(jobId);
    },
    enabled: !!actor && !isFetching && jobId.length > 0,
    refetchInterval: 5000,
  });
}

export function useListDigestJobs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<DigestJob[]>({
    queryKey: ["digest-jobs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listDigestJobs();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 13000, // F(7)*1000
  });
}

// ─── Grade Vault ──────────────────────────────────────────────────────────────

export function useGradeVaultContents(grade: bigint) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<VaultEntry[]>({
    queryKey: ["grade-vault-contents", grade.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getGradeVaultContents(grade);
    },
    enabled: !!actor && !isFetching && grade > 0n,
    refetchInterval: 21000, // F(8)*1000
  });
}

// ─── APIX External Gateway ────────────────────────────────────────────────────

export function useRegisterExternalClient() {
  const { actor } = useActor(createActor);
  return useMutation<
    RegistrationRequest,
    Error,
    {
      requestId: string;
      name: string;
      description: string;
      requestedEndpoints: string[];
    }
  >({
    mutationFn: async ({
      requestId,
      name,
      description,
      requestedEndpoints,
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.registerExternalClient(
        requestId,
        name,
        description,
        requestedEndpoints,
      );
    },
  });
}

export function useApproveClient() {
  const { actor } = useActor(createActor);
  return useMutation<
    RegistrationResult | null,
    Error,
    { requestId: string; apiKey: string }
  >({
    mutationFn: async ({ requestId, apiKey }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.approveClient(requestId, apiKey);
    },
  });
}

export function useListPendingRegistrations() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<RegistrationRequest[]>({
    queryKey: ["pending-registrations"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listPendingRegistrations();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 13000, // F(7)*1000
  });
}

export function useApiUsageStats(clientId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ApiUsageStats | null>({
    queryKey: ["api-usage-stats", clientId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getApiUsageStats(clientId);
    },
    enabled: !!actor && !isFetching && clientId.length > 0,
    refetchInterval: 21000, // F(8)*1000
  });
}

// ─── Staff ────────────────────────────────────────────────────────────────────

export function useStaffRoster() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<StaffMember[]>({
    queryKey: ["staff-roster"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getStaffRoster();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 21000, // F(8)*1000
  });
}

export function useStaffActivityLog(staffId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ActivityEntry[]>({
    queryKey: ["staff-activity-log", staffId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getStaffActivityLog(staffId);
    },
    enabled: !!actor && !isFetching && staffId.length > 0,
    refetchInterval: 13000, // F(7)*1000
  });
}

export function useUpdateStaffRole() {
  const { actor } = useActor(createActor);
  return useMutation<boolean, Error, { staffId: string; newRole: StaffRole }>({
    mutationFn: async ({ staffId, newRole }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateStaffRole(staffId, newRole);
    },
  });
}
