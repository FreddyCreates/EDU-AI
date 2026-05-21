import { createActor } from "@/backend";
import type {
  DigtConcept,
  DigtDigestResult,
  DigtQuizSeed,
  DigtStats,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useDigtStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<DigtStats>({
    queryKey: ["digt-stats"],
    queryFn: async () => {
      if (!actor)
        return {
          totalInputs: 0n,
          totalConcepts: 0n,
          totalQuizSeeds: 0n,
          subjectsDigested: [],
        };
      return actor.getDigtStats();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 8000, // F(6)s
  });
}

export function useConceptsByGrade(grade: number) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<DigtConcept[]>({
    queryKey: ["concepts-grade", grade],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getConceptsByGrade(BigInt(grade));
    },
    enabled: !!actor && !isFetching && grade > 0,
    refetchInterval: 13000, // F(7)s
  });
}

export function useQuizSeedsByGrade(grade: number) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<DigtQuizSeed[]>({
    queryKey: ["quiz-seeds-grade", grade],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getQuizSeedsByGrade(BigInt(grade));
    },
    enabled: !!actor && !isFetching && grade > 0,
  });
}

export function useDigestTextbook() {
  const { actor } = useActor(createActor);
  return useMutation<
    DigtDigestResult,
    Error,
    { title: string; gradeLevel: number; subject: string; rawText: string }
  >({
    mutationFn: async ({ title, gradeLevel, subject, rawText }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.digestTextbook(title, BigInt(gradeLevel), subject, rawText);
    },
  });
}
