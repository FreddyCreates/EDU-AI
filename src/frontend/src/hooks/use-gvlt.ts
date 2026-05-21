// GVLT hook — grade performance data only.
// For curriculum content/topics use use-knowledge.ts
// For subject template registry use use-stmp.ts
import { createActor } from "@/backend";
import type { GradeGate, GradeVaultEntry, GvltStats } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export function useGvltStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<GvltStats>({
    queryKey: ["gvlt-stats"],
    queryFn: async () => {
      if (!actor)
        return { totalEntries: 0n, totalBlocked: 0n, totalAllowed: 0n };
      return actor.getGvltStats();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 8000,
  });
}

export function useCheckGradeAccess(
  studentGrade: number,
  contentGrade: number,
) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<GradeGate>({
    queryKey: ["grade-access", studentGrade, contentGrade],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.checkGradeAccess(BigInt(studentGrade), BigInt(contentGrade));
    },
    enabled: !!actor && !isFetching && studentGrade > 0 && contentGrade > 0,
  });
}

export function useAccessibleContent(studentGrade: number) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<GradeVaultEntry[]>({
    queryKey: ["accessible-content", studentGrade],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAccessibleContent(BigInt(studentGrade));
    },
    enabled: !!actor && !isFetching && studentGrade > 0,
  });
}
