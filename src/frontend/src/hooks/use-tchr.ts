import { createActor } from "@/backend";
import type {
  ClassHeatmap,
  StudentMasteryCard,
  TchrStats,
  TeacherClass,
  TeacherRecommendation,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useClassesByTeacher(teacherId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<TeacherClass[]>({
    queryKey: ["teacher-classes", teacherId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getClassesByTeacher(teacherId);
    },
    enabled: !!actor && !isFetching && !!teacherId,
    refetchInterval: 8000, // F(6)s
  });
}

export function useStudentMasteryCard(studentId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<StudentMasteryCard | null>({
    queryKey: ["mastery-card", studentId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getStudentMasteryCard(studentId);
    },
    enabled: !!actor && !isFetching && !!studentId,
    refetchInterval: 13000, // F(7)s
  });
}

export function useClassHeatmap(classId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ClassHeatmap | null>({
    queryKey: ["class-heatmap", classId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.generateClassHeatmap(classId);
    },
    enabled: !!actor && !isFetching && !!classId,
    refetchInterval: 13000, // F(7)s
  });
}

export function useTeacherRecommendations(classId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<TeacherRecommendation[]>({
    queryKey: ["teacher-recs", classId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.generateTeacherRecommendations(classId);
    },
    enabled: !!actor && !isFetching && !!classId,
    refetchInterval: 21000, // F(8)s
  });
}

export function useTchrStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<TchrStats | null>({
    queryKey: ["tchr-stats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getTchrStats();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 8000,
  });
}

export function useCreateClass() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      teacherId,
      name,
      subject,
      gradeLevel,
      studentIds,
    }: {
      teacherId: string;
      name: string;
      subject: string;
      gradeLevel: number;
      studentIds: string[];
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createClass(
        teacherId,
        name,
        subject,
        BigInt(gradeLevel),
        studentIds,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher-classes"] });
      queryClient.invalidateQueries({ queryKey: ["tchr-stats"] });
    },
  });
}
