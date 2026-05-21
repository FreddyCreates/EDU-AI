import { createActor } from "@/backend";
import type { SkaiDocensInfo, SkaiTeachResponse } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useSkaiDocensInfo() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<SkaiDocensInfo | null>({
    queryKey: ["skai-docens-info"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getSkaiDocensInfo();
    },
    enabled: !!actor && !isFetching,
  });
}

// skaiTeach takes 1 arg (studentIntent) per backend signature
export function useSkaiTeach() {
  const { actor } = useActor(createActor);
  return useMutation<
    SkaiTeachResponse,
    Error,
    { studentIntent: string; subject?: string; gradeLevel?: string }
  >({
    mutationFn: async ({ studentIntent, subject, gradeLevel }) => {
      if (!actor) throw new Error("Actor not ready");
      // Backend accepts studentIntent; subject/gradeLevel used to enrich the intent message
      const enriched =
        subject || gradeLevel
          ? `${studentIntent} [subject: ${subject ?? ""}, grade: ${gradeLevel ?? ""}]`
          : studentIntent;
      return actor.skaiTeach(enriched);
    },
  });
}

export function useSkaiRoute() {
  const { actor } = useActor(createActor);
  return useMutation<
    string,
    Error,
    { studentIntent: string; currentEngineId: string; sessionSummary: string }
  >({
    mutationFn: async ({ studentIntent, currentEngineId, sessionSummary }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.skaiRoute(studentIntent, currentEngineId, sessionSummary);
    },
  });
}
