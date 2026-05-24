import { f as useActor, h as createActor } from "./index-BivnQ6bB.js";
import { a as useQuery, u as useQueryClient, b as useMutation } from "./query-8urnerR0.js";
function useApiEndpoints() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["api-endpoints"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getApiEndpoints();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 13e3
  });
}
function useApiStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["api-stats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getApiStats();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 8e3
  });
}
function usePortalTransitions(n = BigInt(8)) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["portal-transitions", n.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPortalTransitions(n);
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 13e3
  });
}
function useApiCallLogs(n = BigInt(8)) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["api-call-logs", n.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getApiCallLogs(n);
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 13e3
  });
}
function useRegisterApiCaller() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      name,
      pubKey,
      allowed
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.registerApiCaller(id, name, pubKey, allowed);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-stats"] });
    }
  });
}
function useExecuteQuery() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      target,
      filters,
      limit
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.executeQuery(target, filters, limit);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["query-history"] });
    }
  });
}
function useQueryHistory() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["query-history"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getQueryHistory();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 8e3
  });
}
export {
  useApiStats as a,
  useExecuteQuery as b,
  useQueryHistory as c,
  usePortalTransitions as d,
  useApiCallLogs as e,
  useRegisterApiCaller as f,
  useApiEndpoints as u
};
