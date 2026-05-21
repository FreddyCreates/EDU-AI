import { createActor } from "@/backend";
import type {
  EchoResult,
  EntanglementRecord,
  FluxState,
  MsryState,
  NrveState,
  PlseState,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Poll all 10 entanglement records every 5s (LEX_TFLR: F(5)=5)
export function useEntanglements() {
  const { actor, isFetching } = useActor(createActor);

  const { data: entanglements = [], isLoading } = useQuery<
    EntanglementRecord[]
  >({
    queryKey: ["entanglements"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getEntanglements();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5000,
  });

  return { entanglements, isLoading: isLoading && !entanglements.length };
}

// Poll global stats every 5s
export function useEntanglementStats() {
  const { actor, isFetching } = useActor(createActor);

  const { data: stats = null, isLoading } = useQuery<{
    totalTransits: bigint;
    avgCoherenceDelta: bigint;
    lastRefresh: bigint;
    activeCount: bigint;
  } | null>({
    queryKey: ["entanglement-stats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getEntanglementStats();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5000,
  });

  return { stats, isLoading: isLoading && !stats };
}

// Poll NRVE (Neural) state every 2s (LEX_TFLR: F(3)=2 cycles)
export function useNrveState() {
  const { actor, isFetching } = useActor(createActor);

  const { data: nrveState = null, isLoading } = useQuery<NrveState | null>({
    queryKey: ["nrve-state"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getNrveState();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 2000,
  });

  return { nrveState, isLoading: isLoading && !nrveState };
}

// Poll PLSE (Pulse/Heartbeat) state every 3s (LEX_TFLR: F(4)=3 cycles)
export function usePlseState() {
  const { actor, isFetching } = useActor(createActor);

  const { data: plseState = null, isLoading } = useQuery<PlseState | null>({
    queryKey: ["plse-state"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getPlseState();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 3000,
  });

  return { plseState, isLoading: isLoading && !plseState };
}

// Poll MSRY (Mastery) state every 2s
export function useMsryState(studentId: string) {
  const { actor, isFetching } = useActor(createActor);

  const { data: msryState = null, isLoading } = useQuery<MsryState | null>({
    queryKey: ["msry-state", studentId],
    queryFn: async () => {
      if (!actor || !studentId) return null;
      return actor.getMsryState(studentId);
    },
    enabled: !!actor && !isFetching && studentId.length > 0,
    refetchInterval: 2000,
  });

  return { msryState, isLoading: isLoading && !msryState };
}

// Poll FLUX state every 3s
export function useFluxState(studentId: string) {
  const { actor, isFetching } = useActor(createActor);

  const { data: fluxState = null, isLoading } = useQuery<FluxState | null>({
    queryKey: ["flux-state", studentId],
    queryFn: async () => {
      if (!actor || !studentId) return null;
      return actor.getFluxState(studentId);
    },
    enabled: !!actor && !isFetching && studentId.length > 0,
    refetchInterval: 3000,
  });

  return { fluxState, isLoading: isLoading && !fluxState };
}

// Mutation hook for ECHO events — fires on student interactions
export function useEchoEntanglement() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation<
    EchoResult,
    Error,
    { studentId: string; eventType: string; value: bigint; duration: bigint }
  >({
    mutationFn: async ({ studentId, eventType, value, duration }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.recordEchoEvent(studentId, eventType, value, duration);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entanglements"] });
      queryClient.invalidateQueries({ queryKey: ["entanglement-stats"] });
    },
  });
}
