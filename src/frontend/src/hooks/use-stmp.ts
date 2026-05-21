// STMP hook — subject template registry. Returns master templates per grade.
// For curriculum content/knowledge, use use-knowledge.ts
// For student performance/mastery data, use use-gvlt.ts
import { createActor } from "@/backend";
import type { SubjectTemplate } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export function useStmp(gradeLevel: string) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<SubjectTemplate[]>({
    queryKey: ["stmp", gradeLevel],
    queryFn: async () => {
      if (!actor) return [];
      const result = await (
        actor as unknown as {
          getSubjectTemplates: (g: string) => Promise<SubjectTemplate[]>;
        }
      ).getSubjectTemplates(gradeLevel);
      return result;
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 15,
  });
}
