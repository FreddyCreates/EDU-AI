import { createActor } from "@/backend";
import type {
  ClassRoster,
  DistrictId,
  DistrictStats,
  GradeCount,
  SisRecord,
  SisStudentId,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

// ─── SIS Record ───────────────────────────────────────────────────────────────
export function useSisRecord(sisId: SisStudentId) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<SisRecord | null>({
    queryKey: ["sis-record", sisId],
    queryFn: async () => {
      if (!actor || !sisId) return null;
      return actor.getSisRecord(sisId);
    },
    enabled: !!actor && !isFetching && !!sisId,
    staleTime: 5 * 60 * 1000,
  });
}

// ─── District Stats ───────────────────────────────────────────────────────────
export function useDistrictStats(districtId: DistrictId) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<DistrictStats>({
    queryKey: ["district-stats", String(districtId)],
    queryFn: async () => {
      if (!actor)
        return {
          totalSchools: 0n,
          avgMasteryScore: 0n,
          totalStudents: 0n,
          achievementGapIndex: 0n,
        };
      return actor.getDistrictStats(districtId);
    },
    enabled: !!actor && !isFetching,
    staleTime: 3 * 60 * 1000,
  });
}

// ─── Grade Distribution (for enrollment summary) ──────────────────────────────
export function useGradeDistribution() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<GradeCount[]>({
    queryKey: ["grade-distribution"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getStudentCountByGrade();
    },
    enabled: !!actor && !isFetching,
    staleTime: 3 * 60 * 1000,
  });
}

// ─── Class Roster ─────────────────────────────────────────────────────────────
export function useClassRoster(classCode: string) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<ClassRoster | null>({
    queryKey: ["class-roster", classCode],
    queryFn: async () => {
      if (!actor || !classCode) return null;
      return actor.getRoster(classCode);
    },
    enabled: !!actor && !isFetching && !!classCode,
    staleTime: 2 * 60 * 1000,
  });
}
