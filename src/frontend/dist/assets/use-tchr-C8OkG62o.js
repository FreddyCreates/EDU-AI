import { f as useActor, h as createActor } from "./index-BivnQ6bB.js";
import { a as useQuery } from "./query-8urnerR0.js";
function useClassesByTeacher(teacherId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["teacher-classes", teacherId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getClassesByTeacher(teacherId);
    },
    enabled: !!actor && !isFetching && !!teacherId,
    refetchInterval: 8e3
    // F(6)s
  });
}
function useTeacherRecommendations(classId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["teacher-recs", classId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.generateTeacherRecommendations(classId);
    },
    enabled: !!actor && !isFetching && !!classId,
    refetchInterval: 21e3
    // F(8)s
  });
}
function useTchrStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["tchr-stats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getTchrStats();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 8e3
  });
}
export {
  useTchrStats as a,
  useClassesByTeacher as b,
  useTeacherRecommendations as u
};
