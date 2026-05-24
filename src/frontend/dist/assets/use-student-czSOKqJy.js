import { f as useActor, h as createActor } from "./index-BivnQ6bB.js";
import { u as useQueryClient, a as useQuery, b as useMutation } from "./query-8urnerR0.js";
function useStudent() {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();
  const profileQuery = useQuery({
    queryKey: ["student-profile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getStudentProfile();
    },
    enabled: !!actor && !isFetching
  });
  const createProfile = useMutation({
    mutationFn: async ({
      name,
      gradeLevel
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createStudentProfile(name, gradeLevel);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-profile"] });
    }
  });
  const updateGrade = useMutation({
    mutationFn: async (gradeLevel) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateStudentGrade(gradeLevel);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-profile"] });
    }
  });
  return {
    profile: profileQuery.data ?? null,
    isLoading: profileQuery.isLoading || isFetching,
    isError: profileQuery.isError,
    createProfile,
    updateGrade
  };
}
export {
  useStudent as u
};
