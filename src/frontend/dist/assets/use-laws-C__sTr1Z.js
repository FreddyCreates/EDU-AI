import { f as useActor, h as createActor } from "./index-BivnQ6bB.js";
import { a as useQuery } from "./query-8urnerR0.js";
function useLaws() {
  const { actor, isFetching } = useActor(createActor);
  const lawsQuery = useQuery({
    queryKey: ["laws"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLaws();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1e3 * 60 * 60
    // laws are immutable — cache 1 hour
  });
  return {
    laws: lawsQuery.data ?? [],
    isLoading: lawsQuery.isLoading || isFetching,
    isError: lawsQuery.isError
  };
}
export {
  useLaws as u
};
