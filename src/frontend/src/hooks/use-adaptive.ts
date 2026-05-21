import { createActor } from "@/backend";
import type { AdaptiveSuggestion, AdaptiveWorkflow } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export function useAdaptiveSuggestion(subjectId: string): {
  suggestion: AdaptiveSuggestion | null;
  isLoading: boolean;
} {
  const { actor, isFetching } = useActor(createActor);

  const { data: suggestion = null, isLoading } =
    useQuery<AdaptiveSuggestion | null>({
      queryKey: ["adaptive-suggestion", subjectId],
      queryFn: async () => {
        if (!actor || !subjectId) return null;
        return actor.getAdaptiveSuggestion(subjectId);
      },
      enabled: !!actor && !isFetching && subjectId.length > 0,
      staleTime: 30_000,
    });

  return { suggestion, isLoading: isLoading || isFetching };
}

export function useAdaptiveWorkflow(
  subjectId: string,
  gradeLevel: string,
): {
  workflow: AdaptiveWorkflow | null;
  isLoading: boolean;
} {
  const { actor, isFetching } = useActor(createActor);

  const { data: workflow = null, isLoading } =
    useQuery<AdaptiveWorkflow | null>({
      queryKey: ["adaptive-workflow", subjectId, gradeLevel],
      queryFn: async () => {
        if (!actor || !subjectId) return null;
        return actor.getAdaptiveWorkflow(subjectId, gradeLevel);
      },
      enabled: !!actor && !isFetching && subjectId.length > 0,
      staleTime: 30_000,
    });

  return { workflow, isLoading: isLoading || isFetching };
}
