import { createActor } from "@/backend";
import type {
  AchievementRecord,
  NominationRecord,
  RecognitionFlag,
  RecognitionTimelineEntry,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import type { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useRecognitionFlags(studentId: Principal | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<RecognitionFlag[]>({
    queryKey: ["recognition-flags", studentId?.toString()],
    queryFn: async () => {
      if (!actor || !studentId) return [];
      return actor.getRecognitionFlags(studentId);
    },
    enabled: !!actor && !isFetching && !!studentId,
  });
}

export function useAllRecognitionFlags() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<RecognitionFlag[]>({
    queryKey: ["all-recognition-flags"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllRecognitionFlags();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useNominations(studentId: Principal | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<NominationRecord[]>({
    queryKey: ["nominations", studentId?.toString()],
    queryFn: async () => {
      if (!actor || !studentId) return [];
      return actor.getNominations(studentId);
    },
    enabled: !!actor && !isFetching && !!studentId,
  });
}

export function useSubmitNomination() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      studentId,
      programName,
      teacherNote,
    }: {
      studentId: Principal;
      programName: string;
      teacherNote: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.submitNomination(studentId, programName, teacherNote);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nominations"] });
      queryClient.invalidateQueries({ queryKey: ["all-recognition-flags"] });
    },
  });
}

export function useAchievements(studentId: Principal | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<AchievementRecord[]>({
    queryKey: ["achievements", studentId?.toString()],
    queryFn: async () => {
      if (!actor || !studentId) return [];
      return actor.getAchievements(studentId);
    },
    enabled: !!actor && !isFetching && !!studentId,
  });
}

export function useRecognitionTimeline(studentId: Principal | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<RecognitionTimelineEntry[]>({
    queryKey: ["recognition-timeline", studentId?.toString()],
    queryFn: async () => {
      if (!actor || !studentId) return [];
      return actor.getRecognitionTimeline(studentId);
    },
    enabled: !!actor && !isFetching && !!studentId,
  });
}

export function useRcgnThreshold(studentId: Principal | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<bigint>({
    queryKey: ["rcgn-threshold", studentId?.toString()],
    queryFn: async () => {
      if (!actor || !studentId) return 0n;
      return actor.getStudentRcgnThreshold(studentId);
    },
    enabled: !!actor && !isFetching && !!studentId,
    refetchInterval: 21_000,
  });
}
