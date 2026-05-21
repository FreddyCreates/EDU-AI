import { createActor } from "@/backend";
import type { StudentProfile } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useStudent() {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();

  const profileQuery = useQuery<StudentProfile | null>({
    queryKey: ["student-profile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getStudentProfile();
    },
    enabled: !!actor && !isFetching,
  });

  const createProfile = useMutation({
    mutationFn: async ({
      name,
      gradeLevel,
    }: { name: string; gradeLevel: string }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createStudentProfile(name, gradeLevel);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-profile"] });
    },
  });

  const updateGrade = useMutation({
    mutationFn: async (gradeLevel: string) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateStudentGrade(gradeLevel);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-profile"] });
    },
  });

  return {
    profile: profileQuery.data ?? null,
    isLoading: profileQuery.isLoading || isFetching,
    isError: profileQuery.isError,
    createProfile,
    updateGrade,
  };
}
