import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export interface DiagResult {
  status: string;
  errors: string[];
  pilScore: number;
  avgCoh: number;
  heartbeatCount: bigint;
}

export interface SonrStatusResult {
  status: string;
  pil: number;
  coh: number;
  risk: number;
}

export function useSystemDiag() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<DiagResult | null>({
    queryKey: ["systemDiag"],
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.diagSystem();
      return {
        status: result.status,
        errors: result.errors,
        pilScore: result.pilScore,
        avgCoh: result.avgCoh,
        heartbeatCount: result.heartbeatCount,
      };
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30_000,
    staleTime: 25_000,
  });
}

export function useSonrCheck() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<SonrStatusResult | null>({
    queryKey: ["sonrCheck"],
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.sonrCheck();
      return {
        status: result.status,
        pil: result.pil,
        coh: result.coh,
        risk: result.risk,
      };
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30_000,
    staleTime: 25_000,
  });
}

export function useVaultStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["vaultStats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getVaultStats();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30_000,
    staleTime: 25_000,
  });
}

export function useAllBuilderStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<
    Array<
      [
        string,
        {
          sessionsProcessed: bigint;
          seedsSealed: bigint;
          workflowCompletions: bigint;
          lastActiveAt: bigint;
        },
      ]
    >
  >({
    queryKey: ["allBuilderStats"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBuilderStats();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30_000,
    staleTime: 25_000,
  });
}
