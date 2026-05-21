import { createActor } from "@/backend";
import type { RcgnAlert } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export function useRcgnAlerts() {
  const { actor, isFetching } = useActor(createActor);
  const result = useQuery<RcgnAlert[]>({
    queryKey: ["rcgn-alerts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRcgnAlerts();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30_000,
  });
  return {
    data: result.data ?? [],
    isLoading: result.isLoading,
    error: result.error,
  };
}
