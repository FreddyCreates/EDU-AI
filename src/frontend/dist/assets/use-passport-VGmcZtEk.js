import { f as useActor, h as createActor } from "./index-BivnQ6bB.js";
import { a as useQuery, u as useQueryClient, b as useMutation } from "./query-8urnerR0.js";
function useSovereignPassport() {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();
  const passportQuery = useQuery({
    queryKey: ["sovereign-passport"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getSovereignPassport();
    },
    enabled: !!actor && !isFetching
  });
  const kernelSeedsQuery = useQuery({
    queryKey: ["kernel-seeds"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getKernelSeeds();
    },
    enabled: !!actor && !isFetching
  });
  const passportStatsQuery = useQuery({
    queryKey: ["passport-stats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getPassportStats();
    },
    enabled: !!actor && !isFetching
  });
  const createPassport = useMutation({
    mutationFn: async ({
      studentName,
      gradeLevel,
      collegium
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createSovereignPassport(studentName, gradeLevel, collegium);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sovereign-passport"] });
      queryClient.invalidateQueries({ queryKey: ["kernel-seeds"] });
      queryClient.invalidateQueries({ queryKey: ["passport-stats"] });
      queryClient.invalidateQueries({ queryKey: ["full-passport-stats"] });
    }
  });
  return {
    passport: passportQuery.data ?? null,
    isLoadingPassport: passportQuery.isLoading || isFetching,
    kernelSeeds: kernelSeedsQuery.data ?? [],
    isLoadingSeeds: kernelSeedsQuery.isLoading,
    passportStats: passportStatsQuery.data ?? null,
    createPassport,
    isFetchingActor: isFetching
  };
}
function usePassportStats(principal) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["full-passport-stats", "me"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getFullPassportStats();
    },
    enabled: !!actor && !isFetching,
    staleTime: 3e4
  });
}
function useAutoSeal() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ summary, engineUsed, subject, gradeLevel }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.autoSealFromSession(
        summary,
        engineUsed,
        subject,
        gradeLevel
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sovereign-passport"] });
      queryClient.invalidateQueries({ queryKey: ["kernel-seeds"] });
      queryClient.invalidateQueries({ queryKey: ["full-passport-stats"] });
    }
  });
}
function useSSScore() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["sssScore"],
    queryFn: async () => {
      if (!actor) return 0;
      const state = await actor.computeStudentState(0n);
      return Number(state.sss);
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 3e4
  });
}
function usePassportInsight(userId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["passportInsight", (userId == null ? void 0 : userId.toString()) ?? "anon"],
    queryFn: async () => {
      if (!actor || !userId) return null;
      return actor.getPassportInsight(userId);
    },
    refetchInterval: 1e4,
    enabled: !!actor && !isFetching && !!userId
  });
}
export {
  useSovereignPassport as a,
  useAutoSeal as b,
  useSSScore as c,
  usePassportInsight as d,
  usePassportStats as u
};
