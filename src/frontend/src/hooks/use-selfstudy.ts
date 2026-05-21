import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface SelfStudyMilestone {
  title: string;
  domain: string;
  description: string;
  weeksBefore: number;
  masteryScore: number;
  isComplete: boolean;
  completedAt: [] | [bigint];
}

export interface SelfStudyTrack {
  id: string;
  title: string;
  category: string;
  competitionDate: bigint;
  createdAt: bigint;
  isActive: boolean;
  passportSealed: boolean;
  masteryPct: number;
  milestones: SelfStudyMilestone[];
}

const QUERY_KEY = "selfStudyTracks";

export function useMyTracks() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<SelfStudyTrack[]>({
    queryKey: [QUERY_KEY],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const actorAny = actor as unknown as {
          getMyTracks?: () => Promise<SelfStudyTrack[]>;
        };
        if (typeof actorAny.getMyTracks === "function") {
          return await actorAny.getMyTracks();
        }
      } catch (e) {
        console.error("getMyTracks error", e);
      }
      return [];
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateTrack() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation<
    SelfStudyTrack | null,
    Error,
    { title: string; category: string; competitionDate: bigint }
  >({
    mutationFn: async ({ title, category, competitionDate }) => {
      if (!actor) return null;
      try {
        const actorAny = actor as unknown as {
          createSelfStudyTrack?: (
            title: string,
            category: string,
            competitionDate: bigint,
          ) => Promise<SelfStudyTrack>;
        };
        if (typeof actorAny.createSelfStudyTrack === "function") {
          return await actorAny.createSelfStudyTrack(
            title,
            category,
            competitionDate,
          );
        }
      } catch (e) {
        console.error("createSelfStudyTrack error", e);
      }
      return null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}

export function useCompleteMilestone() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation<
    boolean,
    Error,
    { trackId: string; milestoneIndex: number }
  >({
    mutationFn: async ({ trackId, milestoneIndex }) => {
      if (!actor) return false;
      try {
        const actorAny = actor as unknown as {
          completeMilestone?: (
            trackId: string,
            milestoneIndex: number,
          ) => Promise<boolean>;
        };
        if (typeof actorAny.completeMilestone === "function") {
          return await actorAny.completeMilestone(trackId, milestoneIndex);
        }
      } catch (e) {
        console.error("completeMilestone error", e);
      }
      return false;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}
