import { f as useActor, h as createActor } from "./index-BivnQ6bB.js";
import { a as useQuery } from "./query-8urnerR0.js";
function usePrincipalHeatmapWithNoms() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["principal-heatmap-with-noms"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPrincipalHeatmapWithNoms();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 21e3
    // F(8)=21s
  });
}
function useVisionWithFunding() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["vision-with-funding"],
    queryFn: async () => {
      if (!actor)
        return {
          founderStory: "",
          totalRecognitions: 0n,
          totalStudents: 0n,
          activePrograms: 0n,
          visionText: "",
          fundingTargets: []
        };
      return actor.getVisionWithFundingTracker();
    },
    enabled: !!actor && !isFetching,
    staleTime: 21e3
  });
}
function useAllRecognitionFlags() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["all-recognition-flags"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllRecognitionFlags();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 21e3
  });
}
export {
  usePrincipalHeatmapWithNoms as a,
  useAllRecognitionFlags as b,
  useVisionWithFunding as u
};
