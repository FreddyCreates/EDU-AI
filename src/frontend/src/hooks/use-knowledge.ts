// Knowledge hook — sovereign grade-gated curriculum content via GVLT/NRVE.
// For subject/topic structure use use-curriculum.ts
// For student performance/mastery data use use-gvlt.ts
import { createActor } from "@/backend";
import type { KnowledgeQuery, KnowledgeResult } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export function useKnowledge(
  studentGrade: string,
  subject: string,
  includeRange = false,
) {
  const { actor, isFetching } = useActor(createActor);
  const enabled = !!actor && !isFetching && !!studentGrade && !!subject;

  const query: KnowledgeQuery = {
    studentGrade,
    subject,
    includeGradeRange: includeRange,
  };

  return useQuery<KnowledgeResult[]>({
    queryKey: ["knowledge", studentGrade, subject, includeRange],
    queryFn: async () => {
      if (!actor) return [];
      const result = await (
        actor as unknown as {
          getKnowledgeByGrade: (
            q: KnowledgeQuery,
          ) => Promise<KnowledgeResult[]>;
        }
      ).getKnowledgeByGrade(query);
      return result;
    },
    enabled,
    staleTime: 1000 * 60 * 10,
  });
}
