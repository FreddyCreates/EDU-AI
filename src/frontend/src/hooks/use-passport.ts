import { createActor } from "@/backend";
import type { KernelSeed, PassportStats, SovereignPassport } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import type { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useSovereignPassport() {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();

  const passportQuery = useQuery<SovereignPassport | null>({
    queryKey: ["sovereign-passport"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getSovereignPassport();
    },
    enabled: !!actor && !isFetching,
  });

  const kernelSeedsQuery = useQuery<KernelSeed[]>({
    queryKey: ["kernel-seeds"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getKernelSeeds();
    },
    enabled: !!actor && !isFetching,
  });

  const passportStatsQuery = useQuery<{
    totalSeeds: bigint;
    totalSessions: bigint;
    lastActive: bigint;
  } | null>({
    queryKey: ["passport-stats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getPassportStats();
    },
    enabled: !!actor && !isFetching,
  });

  const createPassport = useMutation({
    mutationFn: async ({
      studentName,
      gradeLevel,
      collegium,
    }: { studentName: string; gradeLevel: string; collegium: string }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createSovereignPassport(studentName, gradeLevel, collegium);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sovereign-passport"] });
      queryClient.invalidateQueries({ queryKey: ["kernel-seeds"] });
      queryClient.invalidateQueries({ queryKey: ["passport-stats"] });
      queryClient.invalidateQueries({ queryKey: ["full-passport-stats"] });
    },
  });

  return {
    passport: passportQuery.data ?? null,
    isLoadingPassport: passportQuery.isLoading || isFetching,
    kernelSeeds: kernelSeedsQuery.data ?? [],
    isLoadingSeeds: kernelSeedsQuery.isLoading,
    passportStats: passportStatsQuery.data ?? null,
    createPassport,
    isFetchingActor: isFetching,
  };
}

export function usePassportStats(principal?: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<PassportStats | null>({
    queryKey: ["full-passport-stats", principal ?? "me"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getFullPassportStats();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useAutoSeal() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<
    string,
    Error,
    { summary: string; engineUsed: string; subject: string; gradeLevel: string }
  >({
    mutationFn: async ({ summary, engineUsed, subject, gradeLevel }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.autoSealFromSession(
        summary,
        engineUsed,
        subject,
        gradeLevel,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sovereign-passport"] });
      queryClient.invalidateQueries({ queryKey: ["kernel-seeds"] });
      queryClient.invalidateQueries({ queryKey: ["full-passport-stats"] });
    },
  });
}
export function useSSScore() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<number>({
    queryKey: ["sssScore"],
    queryFn: async () => {
      if (!actor) return 0;
      const state = await actor.computeStudentState(0n);
      return Number(state.sss);
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30000,
  });
}
export function usePassportInsight(userId?: Principal | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["passportInsight", userId?.toString() ?? "anon"],
    queryFn: async () => {
      if (!actor || !userId) return null;
      return actor.getPassportInsight(userId);
    },
    refetchInterval: 10_000,
    enabled: !!actor && !isFetching && !!userId,
  });
}
