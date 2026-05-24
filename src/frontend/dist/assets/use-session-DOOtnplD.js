import { f as useActor, h as createActor } from "./index-BivnQ6bB.js";
import { u as useQueryClient, a as useQuery, b as useMutation } from "./query-8urnerR0.js";
function useSession() {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();
  const quizResultsQuery = useQuery({
    queryKey: ["quiz-results"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getStudentQuizResults();
    },
    enabled: !!actor && !isFetching
  });
  const sessionCountQuery = useQuery({
    queryKey: ["session-count"],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getSessionCount();
    },
    enabled: !!actor && !isFetching
  });
  const saveResult = useMutation({
    mutationFn: async (result) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.saveQuizResult(result);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quiz-results"] });
      queryClient.invalidateQueries({ queryKey: ["session-count"] });
    }
  });
  const totalSessions = sessionCountQuery.data ?? BigInt(0);
  const averageScore = quizResultsQuery.data && quizResultsQuery.data.length > 0 ? quizResultsQuery.data.reduce(
    (sum, r) => sum + Number(r.score) / Number(r.totalQuestions) * 100,
    0
  ) / quizResultsQuery.data.length : 0;
  return {
    quizResults: quizResultsQuery.data ?? [],
    sessionCount: totalSessions,
    averageScore: Math.round(averageScore),
    isLoading: quizResultsQuery.isLoading || isFetching,
    saveResult
  };
}
export {
  useSession as u
};
