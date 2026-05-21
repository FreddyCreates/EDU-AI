import { createActor } from "@/backend";
import type {
  HeatmapWithNoms,
  PrcpNarrativeEntry,
  RecognitionFlag,
  SessionMetrics,
  VisionWithFunding,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

// ─── Principal Heatmap + NOMS ─────────────────────────────────────────────────
export function usePrincipalHeatmapWithNoms() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<HeatmapWithNoms[]>({
    queryKey: ["principal-heatmap-with-noms"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPrincipalHeatmapWithNoms();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 21_000, // F(8)=21s
  });
}

// ─── Vision with Funding Tracker ─────────────────────────────────────────────
export function useVisionWithFunding() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<VisionWithFunding>({
    queryKey: ["vision-with-funding"],
    queryFn: async () => {
      if (!actor)
        return {
          founderStory: "",
          totalRecognitions: 0n,
          totalStudents: 0n,
          activePrograms: 0n,
          visionText: "",
          fundingTargets: [],
        };
      return actor.getVisionWithFundingTracker();
    },
    enabled: !!actor && !isFetching,
    staleTime: 21_000,
  });
}

// ─── School-wide Recognition Flags ───────────────────────────────────────────
export function useAllRecognitionFlags() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<RecognitionFlag[]>({
    queryKey: ["all-recognition-flags"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllRecognitionFlags();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 21_000,
  });
}

// ─── Session Metrics ──────────────────────────────────────────────────────────
export function useSessionMetrics() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<SessionMetrics>({
    queryKey: ["sessionMetrics"],
    queryFn: () => actor!.getSessionMetrics(),
    refetchInterval: 30_000,
    enabled: !!actor && !isFetching,
  });
}

// ─── PRCP Narrative ───────────────────────────────────────────────────────────
export function usePrcpNarrative() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<PrcpNarrativeEntry[]>({
    queryKey: ["prcpNarrative"],
    queryFn: () => actor!.getPrcpNarrative(),
    refetchInterval: 60_000,
    enabled: !!actor && !isFetching,
  });
}
