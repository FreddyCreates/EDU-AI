// Curriculum hook — subject/topic structure only.
// For student performance/mastery data use use-gvlt.ts
// For grade-gated knowledge content use use-knowledge.ts
import { createActor } from "@/backend";
import type { Subject, Topic } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export function useSubjectsByGrade(gradeLevel: string) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Subject[]>({
    queryKey: ["subjects", gradeLevel || "all"],
    queryFn: async () => {
      if (!actor) return [];
      // If no grade level, use getAllSubjects so we always get all 12
      if (!gradeLevel) return actor.getAllSubjects();
      return actor.getSubjectsByGrade(gradeLevel);
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 10,
  });
}

export function useAllSubjects() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Subject[]>({
    queryKey: ["subjects", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSubjects();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 10,
  });
}

export function useTopicsBySubject(subjectId: string) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Topic[]>({
    queryKey: ["topics", subjectId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTopicsBySubject(subjectId);
    },
    enabled: !!actor && !isFetching && !!subjectId,
    staleTime: 1000 * 60 * 10,
  });
}
