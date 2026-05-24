import { f as useActor, h as createActor } from "./index-BivnQ6bB.js";
import { a as useQuery } from "./query-8urnerR0.js";
function useSilverBuilders() {
  const { actor, isFetching } = useActor(createActor);
  const { data: builders = [], isLoading } = useQuery({
    queryKey: ["silver-builders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSilverBuilders();
    },
    enabled: !!actor && !isFetching,
    staleTime: 6e4
  });
  return { builders, isLoading: isLoading || isFetching };
}
function useBuilderStats(builderId) {
  const { actor, isFetching } = useActor(createActor);
  const { data: stats = null, isLoading } = useQuery({
    queryKey: ["builder-stats", "all"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getAllBuilderStats();
    },
    enabled: !!actor && !isFetching,
    staleTime: 3e4
  });
  return { stats, isLoading: isLoading || isFetching };
}
export {
  useBuilderStats as a,
  useSilverBuilders as u
};
