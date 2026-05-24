import { f as useActor, h as createActor } from "./index-BivnQ6bB.js";
import { a as useQuery } from "./query-8urnerR0.js";
function useSystemDiag() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["systemDiag"],
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.diagSystem();
      return {
        status: result.status,
        errors: result.errors,
        pilScore: result.pilScore,
        avgCoh: result.avgCoh,
        heartbeatCount: result.heartbeatCount
      };
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 3e4,
    staleTime: 25e3
  });
}
function useSonrCheck() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["sonrCheck"],
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.sonrCheck();
      return {
        status: result.status,
        pil: result.pil,
        coh: result.coh,
        risk: result.risk
      };
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 3e4,
    staleTime: 25e3
  });
}
function useVaultStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["vaultStats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getVaultStats();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 3e4,
    staleTime: 25e3
  });
}
function useAllBuilderStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["allBuilderStats"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBuilderStats();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 3e4,
    staleTime: 25e3
  });
}
export {
  useVaultStats as a,
  useAllBuilderStats as b,
  useSonrCheck as c,
  useSystemDiag as u
};
