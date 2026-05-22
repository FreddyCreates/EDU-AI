import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface AttemptRecord {
  attemptNum: bigint;
  score: bigint;
  totalQuestions: bigint;
  pctCorrect: bigint;
  eddiGapAnalysis: string;
  eddiCoachNote: string;
  timestamp: bigint;
}

export type LoopStatus =
  | { open: null }
  | { mastered: null }
  | { escalated: null };

export interface FeedbackLoop {
  id: string;
  studentId: unknown;
  topicId: string;
  status: LoopStatus;
  attempts: AttemptRecord[];
  masteryTarget: bigint;
  currentMastery: bigint;
  maxAttempts: bigint;
  createdAt: bigint;
  closedAt: [] | [bigint];
}

type BackendWithFeedbackLoop = {
  openFeedbackLoop?: (
    topicId: string,
    masteryTarget: bigint,
    maxAttempts: bigint,
  ) => Promise<string>;
  recordFeedbackLoopAttempt?: (
    loopId: string,
    score: bigint,
    totalQuestions: bigint,
  ) => Promise<boolean>;
  getMyFeedbackLoops?: () => Promise<FeedbackLoop[]>;
  getFeedbackLoop?: (loopId: string) => Promise<[] | [FeedbackLoop]>;
};

export function useMyFeedbackLoops() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<FeedbackLoop[]>({
    queryKey: ["myFeedbackLoops"],
    queryFn: async () => {
      if (!actor) return [];
      const a = actor as unknown as BackendWithFeedbackLoop;
      if (typeof a.getMyFeedbackLoops === "function") {
        return await a.getMyFeedbackLoops();
      }
      return [];
    },
    enabled: !!actor && !isFetching,
  });
}

export function useOpenFeedbackLoop() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<
    string | null,
    Error,
    { topicId: string; masteryTarget?: number; maxAttempts?: number }
  >({
    mutationFn: async ({ topicId, masteryTarget = 80, maxAttempts = 5 }) => {
      if (!actor) return null;
      const a = actor as unknown as BackendWithFeedbackLoop;
      if (typeof a.openFeedbackLoop === "function") {
        return await a.openFeedbackLoop(
          topicId,
          BigInt(masteryTarget),
          BigInt(maxAttempts),
        );
      }
      return null;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myFeedbackLoops"] });
    },
  });
}

export function useRecordAttempt() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<
    boolean,
    Error,
    { loopId: string; score: number; totalQuestions: number }
  >({
    mutationFn: async ({ loopId, score, totalQuestions }) => {
      if (!actor) return false;
      const a = actor as unknown as BackendWithFeedbackLoop;
      if (typeof a.recordFeedbackLoopAttempt === "function") {
        return await a.recordFeedbackLoopAttempt(
          loopId,
          BigInt(score),
          BigInt(totalQuestions),
        );
      }
      return false;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myFeedbackLoops"] });
    },
  });
}

export function loopStatusLabel(status: LoopStatus): string {
  if ("open" in status) return "In Progress";
  if ("mastered" in status) return "Mastered";
  if ("escalated" in status) return "Escalated";
  return "Unknown";
}
