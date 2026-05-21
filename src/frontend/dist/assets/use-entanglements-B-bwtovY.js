import { f as useActor, h as createActor } from "./index-BivnQ6bB.js";
import { a as useQuery, u as useQueryClient, b as useMutation } from "./query-8urnerR0.js";
function useEntanglements() {
  const { actor, isFetching } = useActor(createActor);
  const { data: entanglements = [], isLoading } = useQuery({
    queryKey: ["entanglements"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getEntanglements();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5e3
  });
  return { entanglements, isLoading: isLoading && !entanglements.length };
}
function useEntanglementStats() {
  const { actor, isFetching } = useActor(createActor);
  const { data: stats = null, isLoading } = useQuery({
    queryKey: ["entanglement-stats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getEntanglementStats();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5e3
  });
  return { stats, isLoading: isLoading && !stats };
}
function useNrveState() {
  const { actor, isFetching } = useActor(createActor);
  const { data: nrveState = null, isLoading } = useQuery({
    queryKey: ["nrve-state"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getNrveState();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 2e3
  });
  return { nrveState, isLoading: isLoading && !nrveState };
}
function usePlseState() {
  const { actor, isFetching } = useActor(createActor);
  const { data: plseState = null, isLoading } = useQuery({
    queryKey: ["plse-state"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getPlseState();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 3e3
  });
  return { plseState, isLoading: isLoading && !plseState };
}
function useFluxState(studentId) {
  const { actor, isFetching } = useActor(createActor);
  const { data: fluxState = null, isLoading } = useQuery({
    queryKey: ["flux-state", studentId],
    queryFn: async () => {
      if (!actor || !studentId) return null;
      return actor.getFluxState(studentId);
    },
    enabled: !!actor && !isFetching && studentId.length > 0,
    refetchInterval: 3e3
  });
  return { fluxState, isLoading: isLoading && !fluxState };
}
function useEchoEntanglement() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ studentId, eventType, value, duration }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.recordEchoEvent(studentId, eventType, value, duration);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entanglements"] });
      queryClient.invalidateQueries({ queryKey: ["entanglement-stats"] });
    }
  });
}
export {
  useNrveState as a,
  useFluxState as b,
  useEchoEntanglement as c,
  useEntanglementStats as d,
  useEntanglements as e,
  usePlseState as u
};
