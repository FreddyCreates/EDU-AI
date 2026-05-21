import { createActor } from "@/backend";
import type { LiveIntelligenceState } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import React, {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
} from "react";

interface IntelligenceContextValue {
  liveState: LiveIntelligenceState | null;
  isLoading: boolean;
  /** IAS layout class: 'ias-calm' | 'ias-standard' | 'ias-active' | 'ias-flow' */
  layoutState: string;
  sss: number;
  coh: number;
  adx: number;
  rcgnThreshold: number;
  isGoldMoment: boolean;
  sssLabel: string;
  scholarshipMatches: any[];
  clearScholarshipMatches: () => void;
}

const IntelligenceContext = createContext<IntelligenceContextValue>({
  liveState: null,
  isLoading: false,
  layoutState: "ias-standard",
  sss: 0,
  coh: 0,
  adx: 5,
  rcgnThreshold: 0,
  isGoldMoment: false,
  sssLabel: "BUILDING",
  scholarshipMatches: [],
  clearScholarshipMatches: () => {},
});

export function IntelligenceProvider({ children }: { children: ReactNode }) {
  const { identity } = useInternetIdentity();
  const { actor, isFetching } = useActor(createActor);
  const principal = identity?.getPrincipal() ?? null;

  const { data: liveState, isLoading } = useQuery<LiveIntelligenceState | null>(
    {
      queryKey: ["live-intelligence", principal?.toString()],
      queryFn: async () => {
        if (!actor || !principal) return null;
        return actor.getLiveIntelligenceState(principal);
      },
      enabled: !!actor && !isFetching && !!principal,
      refetchInterval: 21_000, // F(8)=21 seconds — TFLR protocol
      staleTime: 8_000,
    },
  );

  const layoutState = useMemo(() => {
    const raw = liveState?.layoutState ?? "STANDARD";
    return `ias-${raw.toLowerCase()}`;
  }, [liveState?.layoutState]);

  const [scholarshipMatches, setScholarshipMatches] = React.useState<any[]>([]);
  const scholarshipLastChecked = React.useRef<number>(Date.now());
  const sssLabel = !liveState
    ? "BUILDING"
    : Number(liveState.sss) < 5
      ? "STRUGGLE"
      : Number(liveState.sss) < 13
        ? "BUILDING"
        : Number(liveState.sss) < 34
          ? "GROWING"
          : Number(liveState.sss) < 89
            ? "MASTERY"
            : "SOVEREIGN";

  const rcgnThreshold = liveState ? Number(liveState.rcgnThreshold) : 0;

  React.useEffect(() => {
    if (rcgnThreshold >= 55 && actor) {
      actor
        .getMyScholarshipMatches()
        .then(setScholarshipMatches)
        .catch(() => {});
      scholarshipLastChecked.current = Date.now();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rcgnThreshold, actor]);

  const clearScholarshipMatches = React.useCallback(
    () => setScholarshipMatches([]),
    [],
  );

  const value = useMemo<IntelligenceContextValue>(
    () => ({
      liveState: liveState ?? null,
      isLoading,
      layoutState,
      sss: liveState ? Number(liveState.sss) : 0,
      coh: liveState ? Number(liveState.coh) : 0,
      adx: liveState ? Number(liveState.adx) : 5,
      rcgnThreshold: liveState ? Number(liveState.rcgnThreshold) : 0,
      isGoldMoment: liveState?.isGoldMoment ?? false,
      sssLabel,
      scholarshipMatches,
      clearScholarshipMatches,
    }),
    [
      liveState,
      isLoading,
      layoutState,
      sssLabel,
      scholarshipMatches,
      clearScholarshipMatches,
    ],
  );

  return (
    <IntelligenceContext.Provider value={value}>
      {children}
    </IntelligenceContext.Provider>
  );
}

export function useIntelligence() {
  return useContext(IntelligenceContext);
}
