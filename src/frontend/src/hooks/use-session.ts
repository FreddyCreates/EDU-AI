import { createActor } from "@/backend";
import type { QuizResult } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useSession() {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();

  const quizResultsQuery = useQuery<QuizResult[]>({
    queryKey: ["quiz-results"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getStudentQuizResults();
    },
    enabled: !!actor && !isFetching,
  });

  const sessionCountQuery = useQuery<bigint>({
    queryKey: ["session-count"],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getSessionCount();
    },
    enabled: !!actor && !isFetching,
  });

  const saveResult = useMutation({
    mutationFn: async (result: QuizResult) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.saveQuizResult(result);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quiz-results"] });
      queryClient.invalidateQueries({ queryKey: ["session-count"] });
    },
  });

  const totalSessions = sessionCountQuery.data ?? BigInt(0);
  const averageScore =
    quizResultsQuery.data && quizResultsQuery.data.length > 0
      ? quizResultsQuery.data.reduce(
          (sum, r) => sum + (Number(r.score) / Number(r.totalQuestions)) * 100,
          0,
        ) / quizResultsQuery.data.length
      : 0;

  return {
    quizResults: quizResultsQuery.data ?? [],
    sessionCount: totalSessions,
    averageScore: Math.round(averageScore),
    isLoading: quizResultsQuery.isLoading || isFetching,
    saveResult,
  };
}
