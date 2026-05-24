import { f as useActor, h as createActor } from "./index-BivnQ6bB.js";
import { a as useQuery } from "./query-8urnerR0.js";
function useAdaptiveSuggestion(subjectId) {
  const { actor, isFetching } = useActor(createActor);
  const { data: suggestion = null, isLoading } = useQuery({
    queryKey: ["adaptive-suggestion", subjectId],
    queryFn: async () => {
      if (!actor || !subjectId) return null;
      return actor.getAdaptiveSuggestion(subjectId);
    },
    enabled: !!actor && !isFetching && subjectId.length > 0,
    staleTime: 3e4
  });
  return { suggestion, isLoading: isLoading || isFetching };
}
function useAdaptiveWorkflow(subjectId, gradeLevel) {
  const { actor, isFetching } = useActor(createActor);
  const { data: workflow = null, isLoading } = useQuery({
    queryKey: ["adaptive-workflow", subjectId, gradeLevel],
    queryFn: async () => {
      if (!actor || !subjectId) return null;
      return actor.getAdaptiveWorkflow(subjectId, gradeLevel);
    },
    enabled: !!actor && !isFetching && subjectId.length > 0,
    staleTime: 3e4
  });
  return { workflow, isLoading: isLoading || isFetching };
}
export {
  useAdaptiveSuggestion as a,
  useAdaptiveWorkflow as u
};
