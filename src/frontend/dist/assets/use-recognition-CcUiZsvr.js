import { f as useActor, h as createActor } from "./index-BivnQ6bB.js";
import { a as useQuery, u as useQueryClient, b as useMutation } from "./query-8urnerR0.js";
function useRecognitionFlags(studentId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["recognition-flags", studentId == null ? void 0 : studentId.toString()],
    queryFn: async () => {
      if (!actor || !studentId) return [];
      return actor.getRecognitionFlags(studentId);
    },
    enabled: !!actor && !isFetching && !!studentId
  });
}
function useAllRecognitionFlags() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["all-recognition-flags"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllRecognitionFlags();
    },
    enabled: !!actor && !isFetching
  });
}
function useNominations(studentId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["nominations", studentId == null ? void 0 : studentId.toString()],
    queryFn: async () => {
      if (!actor || !studentId) return [];
      return actor.getNominations(studentId);
    },
    enabled: !!actor && !isFetching && !!studentId
  });
}
function useSubmitNomination() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      studentId,
      programName,
      teacherNote
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.submitNomination(studentId, programName, teacherNote);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nominations"] });
      queryClient.invalidateQueries({ queryKey: ["all-recognition-flags"] });
    }
  });
}
function useAchievements(studentId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["achievements", studentId == null ? void 0 : studentId.toString()],
    queryFn: async () => {
      if (!actor || !studentId) return [];
      return actor.getAchievements(studentId);
    },
    enabled: !!actor && !isFetching && !!studentId
  });
}
function useRecognitionTimeline(studentId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["recognition-timeline", studentId == null ? void 0 : studentId.toString()],
    queryFn: async () => {
      if (!actor || !studentId) return [];
      return actor.getRecognitionTimeline(studentId);
    },
    enabled: !!actor && !isFetching && !!studentId
  });
}
function useRcgnThreshold(studentId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["rcgn-threshold", studentId == null ? void 0 : studentId.toString()],
    queryFn: async () => {
      if (!actor || !studentId) return 0n;
      return actor.getStudentRcgnThreshold(studentId);
    },
    enabled: !!actor && !isFetching && !!studentId,
    refetchInterval: 21e3
  });
}
export {
  useAchievements as a,
  useRcgnThreshold as b,
  useAllRecognitionFlags as c,
  useNominations as d,
  useSubmitNomination as e,
  useRecognitionTimeline as f,
  useRecognitionFlags as u
};
