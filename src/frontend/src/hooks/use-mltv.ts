import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useMLTVStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["mltv-stats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMLTVStats();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5000,
  });
}

export function useRecentMLTVResponses() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["mltv-recent"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRecentMLTVResponses(BigInt(8));
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 3000,
  });
}

export function useFireArchCouncil() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      queryText,
      domain,
    }: {
      queryText: string;
      domain: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.fireArchCouncil(queryText, domain);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mltv-recent"] });
      queryClient.invalidateQueries({ queryKey: ["mltv-stats"] });
    },
  });
}
