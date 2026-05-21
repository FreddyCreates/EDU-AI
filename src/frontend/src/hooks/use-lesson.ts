import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export interface LessonContent {
  title: string;
  introduction: string;
  coreConceptBlock: string;
  expansionBlock: string;
  practicePrompt: string;
  reviewSummary: string;
}

export function useLessonContent(
  topicId: string,
  gradeLevel: string,
  agentRole = "explainer",
) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<LessonContent | null>({
    queryKey: ["lessonContent", topicId, gradeLevel, agentRole],
    queryFn: async () => {
      if (!actor || !topicId || !gradeLevel) return null;
      const result = await actor.getLessonContent(
        topicId,
        gradeLevel,
        agentRole,
      );
      return result as LessonContent;
    },
    enabled: !!actor && !isFetching && !!topicId && !!gradeLevel,
    staleTime: 5 * 60 * 1000,
  });
}
