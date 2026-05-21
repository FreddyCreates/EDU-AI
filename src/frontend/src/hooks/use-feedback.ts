import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useFeedbackEvents() {
  const { actor } = useActor(createActor);
  return useQuery({
    queryKey: ["feedbackEvents"],
    queryFn: async () => {
      if (!actor) return [];
      return await actor.getFeedbackEvents();
    },
    enabled: !!actor,
  });
}

export function useMyFeedback() {
  const { actor } = useActor(createActor);
  return useQuery({
    queryKey: ["myFeedback"],
    queryFn: async () => {
      if (!actor) return [];
      return await actor.getMyFeedback();
    },
    enabled: !!actor,
  });
}

export function useSubmitFeedback() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      message,
      severity,
    }: {
      message: string;
      severity: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return await actor.submitFeedback(message, severity);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myFeedback"] });
      qc.invalidateQueries({ queryKey: ["feedbackEvents"] });
    },
  });
}

export function useResolveFeedback() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (eventId: string) => {
      if (!actor) throw new Error("No actor");
      return await actor.resolveFeedback(eventId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["feedbackEvents"] });
    },
  });
}
