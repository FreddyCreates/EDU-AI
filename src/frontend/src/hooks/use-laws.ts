import { createActor } from "@/backend";
import type { SovereignLaw } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export function useLaws() {
  const { actor, isFetching } = useActor(createActor);

  const lawsQuery = useQuery<SovereignLaw[]>({
    queryKey: ["laws"],
    queryFn: async (): Promise<SovereignLaw[]> => {
      if (!actor) return [];
      return actor.getLaws();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 60, // laws are immutable — cache 1 hour
  });

  return {
    laws: lawsQuery.data ?? [],
    isLoading: lawsQuery.isLoading || isFetching,
    isError: lawsQuery.isError,
  };
}
