import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface ScaffoldHint {
  tier: { tier1: null } | { tier2: null } | { tier3: null };
  text: string;
}

export interface ScaffoldFrame {
  topicId: string;
  concept: string;
  hints: ScaffoldHint[];
  workedExample: string;
  visualCue: string;
}

export interface ScaffoldSession {
  id: string;
  studentId: unknown;
  topicId: string;
  hintsConsumed: bigint;
  masteryBefore: bigint;
  masteryAfter: bigint;
  createdAt: bigint;
  closedAt: [] | [bigint];
  resolved: boolean;
}

type BackendWithScaffold = {
  getScaffoldFrames?: () => Promise<ScaffoldFrame[]>;
  getScaffoldFrame?: (topicId: string) => Promise<[] | [ScaffoldFrame]>;
  startScaffoldSession?: (
    topicId: string,
    masteryBefore: bigint,
  ) => Promise<string>;
  requestScaffoldHint?: (
    sessionId: string,
  ) => Promise<[] | [ScaffoldHint]>;
  closeScaffoldSession?: (
    sessionId: string,
    masteryAfter: bigint,
  ) => Promise<boolean>;
  getMyScaffoldSessions?: () => Promise<ScaffoldSession[]>;
  getScaffoldSession?: (sessionId: string) => Promise<[] | [ScaffoldSession]>;
};

export function useScaffoldFrames() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ScaffoldFrame[]>({
    queryKey: ["scaffoldFrames"],
    queryFn: async () => {
      if (!actor) return [];
      const a = actor as unknown as BackendWithScaffold;
      if (typeof a.getScaffoldFrames === "function") {
        return await a.getScaffoldFrames();
      }
      return [];
    },
    enabled: !!actor && !isFetching,
  });
}

export function useScaffoldFrame(topicId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ScaffoldFrame | null>({
    queryKey: ["scaffoldFrame", topicId],
    queryFn: async (): Promise<ScaffoldFrame | null> => {
      if (!actor || !topicId) return null;
      const a = actor as unknown as BackendWithScaffold;
      if (typeof a.getScaffoldFrame === "function") {
        const res = await a.getScaffoldFrame(topicId);
        return res.length > 0 ? res[0] ?? null : null;
      }
      return null;
    },
    enabled: !!actor && !isFetching && !!topicId,
  });
}

export function useMyScaffoldSessions() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ScaffoldSession[]>({
    queryKey: ["myScaffoldSessions"],
    queryFn: async () => {
      if (!actor) return [];
      const a = actor as unknown as BackendWithScaffold;
      if (typeof a.getMyScaffoldSessions === "function") {
        return await a.getMyScaffoldSessions();
      }
      return [];
    },
    enabled: !!actor && !isFetching,
  });
}

export function useStartScaffoldSession() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<
    string | null,
    Error,
    { topicId: string; masteryBefore: number }
  >({
    mutationFn: async ({ topicId, masteryBefore }) => {
      if (!actor) return null;
      const a = actor as unknown as BackendWithScaffold;
      if (typeof a.startScaffoldSession === "function") {
        return await a.startScaffoldSession(topicId, BigInt(masteryBefore));
      }
      return null;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myScaffoldSessions"] });
    },
  });
}

export function useRequestScaffoldHint() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<ScaffoldHint | null, Error, { sessionId: string }>({
    mutationFn: async ({ sessionId }): Promise<ScaffoldHint | null> => {
      if (!actor) return null;
      const a = actor as unknown as BackendWithScaffold;
      if (typeof a.requestScaffoldHint === "function") {
        const res = await a.requestScaffoldHint(sessionId);
        return res.length > 0 ? res[0] ?? null : null;
      }
      return null;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myScaffoldSessions"] });
    },
  });
}

export function useCloseScaffoldSession() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<
    boolean,
    Error,
    { sessionId: string; masteryAfter: number }
  >({
    mutationFn: async ({ sessionId, masteryAfter }) => {
      if (!actor) return false;
      const a = actor as unknown as BackendWithScaffold;
      if (typeof a.closeScaffoldSession === "function") {
        return await a.closeScaffoldSession(sessionId, BigInt(masteryAfter));
      }
      return false;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myScaffoldSessions"] });
    },
  });
}
