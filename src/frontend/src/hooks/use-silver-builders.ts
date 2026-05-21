import { createActor } from "@/backend";
import type { BuilderStats, SilverBuilder } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export function useSilverBuilders(): {
  builders: SilverBuilder[];
  isLoading: boolean;
} {
  const { actor, isFetching } = useActor(createActor);

  const { data: builders = [], isLoading } = useQuery<SilverBuilder[]>({
    queryKey: ["silver-builders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSilverBuilders();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });

  return { builders, isLoading: isLoading || isFetching };
}

export function useBuilderStats(builderId?: string): {
  stats: BuilderStats | Array<[string, BuilderStats]> | null;
  isLoading: boolean;
} {
  const { actor, isFetching } = useActor(createActor);

  const { data: stats = null, isLoading } = useQuery<
    BuilderStats | Array<[string, BuilderStats]> | null
  >({
    queryKey: ["builder-stats", builderId ?? "all"],
    queryFn: async () => {
      if (!actor) return null;
      if (builderId) {
        return actor.getBuilderStats(builderId);
      }
      return actor.getAllBuilderStats();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });

  return { stats, isLoading: isLoading || isFetching };
}
