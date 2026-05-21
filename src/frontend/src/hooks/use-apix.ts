import type { ApiCallLog, PortalTransition } from "@/backend";
import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type { ApiCallLog, PortalTransition };

export function useApiEndpoints() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["api-endpoints"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getApiEndpoints();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 13000,
  });
}

export function useApiStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["api-stats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getApiStats();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 8000,
  });
}

export function usePortalTransitions(n = BigInt(8)) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<PortalTransition[]>({
    queryKey: ["portal-transitions", n.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPortalTransitions(n);
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 13000,
  });
}

export function useApiCallLogs(n = BigInt(8)) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ApiCallLog[]>({
    queryKey: ["api-call-logs", n.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getApiCallLogs(n);
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 13000,
  });
}

export function useRegisterApiCaller() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      name,
      pubKey,
      allowed,
    }: {
      id: string;
      name: string;
      pubKey: string;
      allowed: string[];
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.registerApiCaller(id, name, pubKey, allowed);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-stats"] });
    },
  });
}

export function useExecuteQuery() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      target,
      filters,
      limit,
    }: {
      target: string;
      filters: [string, string, string][];
      limit: bigint;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.executeQuery(target, filters, limit);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["query-history"] });
    },
  });
}

export function useQueryHistory() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["query-history"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getQueryHistory();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 8000,
  });
}
