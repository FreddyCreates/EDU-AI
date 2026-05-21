import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface CollegiumInfo {
  name: string;
  description: string;
  college: string;
  track: string;
  enrolledCount: number;
  activeStudents: number;
}

const COLLEGIUM_FRIENDLY: Record<string, string> = {
  "COLLEGIUM-COGNITIO": "Foundations",
  "COLLEGIUM-RATIO": "Reasoning",
  "COLLEGIUM-SOPHIA": "Mastery",
  "COLLEGIUM-PUBLICA": "Open Access",
  "COLLEGIUM-COGNITO": "Advanced Cognition",
};

export function friendlyCollegiumName(raw: string): string {
  return COLLEGIUM_FRIENDLY[raw] ?? raw;
}

export function useCollegiums() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<CollegiumInfo[]>({
    queryKey: ["collegiums"],
    queryFn: async () => {
      if (!actor) return [];
      // No getCollegiums endpoint — derive from getTracks
      const tracks = await actor.getTracks();
      return tracks.map((t) => ({
        name: friendlyCollegiumName(t.codeName),
        description: t.description,
        college: t.codeName,
        track: t.id,
        enrolledCount: 0,
        activeStudents: 0,
      }));
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useMyEnrollments() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["myEnrollments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyEnrollments();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useEnrollCollegium() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (_collegiumId: string) => {
      if (!actor) throw new Error("Actor not ready");
      return { ok: null };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["collegiums"] });
      qc.invalidateQueries({ queryKey: ["myEnrollments"] });
    },
  });
}
