import { f as useActor, h as createActor } from "./index-BivnQ6bB.js";
import { a as useQuery } from "./query-8urnerR0.js";
function useSubjectsByGrade(gradeLevel) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["subjects", gradeLevel || "all"],
    queryFn: async () => {
      if (!actor) return [];
      if (!gradeLevel) return actor.getAllSubjects();
      return actor.getSubjectsByGrade(gradeLevel);
    },
    enabled: !!actor && !isFetching,
    staleTime: 1e3 * 60 * 10
  });
}
function useAllSubjects() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["subjects", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSubjects();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1e3 * 60 * 10
  });
}
function useTopicsBySubject(subjectId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["topics", subjectId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTopicsBySubject(subjectId);
    },
    enabled: !!actor && !isFetching && !!subjectId,
    staleTime: 1e3 * 60 * 10
  });
}
export {
  useSubjectsByGrade as a,
  useTopicsBySubject as b,
  useAllSubjects as u
};
