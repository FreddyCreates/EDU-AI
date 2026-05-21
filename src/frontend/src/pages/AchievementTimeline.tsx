import { createActor } from "@/backend";
import type { AchievementTimelineEntry } from "@/backend";
import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useState } from "react";

type FilterType =
  | "ALL"
  | "RECOGNITION"
  | "MASTERY"
  | "COMPETITION"
  | "MILESTONE";
const FILTERS: FilterType[] = [
  "ALL",
  "RECOGNITION",
  "MASTERY",
  "COMPETITION",
  "MILESTONE",
];

const cardStyle = (type: string): string => {
  if (type === "RECOGNITION")
    return "backdrop-blur-lg bg-amber-900/20 border border-amber-400/50";
  if (type === "MASTERY")
    return "backdrop-blur-md bg-teal-900/20 border border-teal-400/40";
  if (type === "COMPETITION")
    return "backdrop-blur-md bg-purple-900/20 border border-purple-400/40";
  return "backdrop-blur-md bg-white/5 border border-white/10";
};

export default function AchievementTimeline() {
  const [filter, setFilter] = useState<FilterType>("ALL");
  const { actor } = useActor(createActor);
  const { identity } = useInternetIdentity();
  const principal = identity?.getPrincipal() ?? null;

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["achievementTimeline", principal?.toString() ?? "anon"],
    queryFn: async () => {
      if (!actor || !principal) return [];
      return actor.getAchievementTimeline(principal);
    },
    enabled: !!actor && !!principal,
  });

  const filtered: AchievementTimelineEntry[] =
    filter === "ALL"
      ? events
      : events.filter((e: AchievementTimelineEntry) => e.eventType === filter);

  return (
    <div
      className="min-h-screen bg-black/90 px-5 py-8"
      data-ocid="achievement-timeline.page"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -13 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-white/90">
            Achievement Timeline
          </h1>
          <p className="text-white/50 text-sm mt-1">
            Your K-12 journey, permanently recorded.
          </p>
        </motion.div>

        {/* Filters */}
        <div
          className="flex gap-2 flex-wrap mb-6"
          data-ocid="achievement-timeline.filter.tab"
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              data-ocid={`achievement-timeline.filter.${f.toLowerCase()}`}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                filter === f
                  ? "bg-amber-900/40 border-amber-400/60 text-amber-200"
                  : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Loading skeletons */}
        {isLoading && (
          <div
            className="space-y-3"
            data-ocid="achievement-timeline.loading_state"
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && filtered.length === 0 && (
          <div
            className="text-center py-16 text-white/40 text-sm"
            data-ocid="achievement-timeline.empty_state"
          >
            Your K-12 journey is being written. Keep learning.
          </div>
        )}

        {/* Timeline entries */}
        <div className="space-y-3">
          {filtered.map((entry: AchievementTimelineEntry, i: number) => (
            <motion.div
              key={entry.eventId}
              initial={{ opacity: 0, x: -13 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              data-ocid={`achievement-timeline.item.${i + 1}`}
              className={`rounded-xl p-5 ${cardStyle(entry.eventType)}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs bg-white/10 border border-white/15 rounded px-2 py-0.5 text-white/60">
                      Grade {Number(entry.grade)}
                    </span>
                    <span className="text-xs text-white/40">
                      {Number(entry.year)}
                    </span>
                    {entry.goldSealed && (
                      <span className="text-xs bg-amber-900/40 border border-amber-400/50 rounded px-2 py-0.5 text-amber-300">
                        ★ Gold Sealed
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-white/90 truncate">
                    {entry.title}
                  </h3>
                  <p className="text-white/60 text-sm mt-1 break-words">
                    {entry.description}
                  </p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {entry.domain && (
                      <span className="text-xs bg-white/10 rounded px-2 py-0.5 text-white/50">
                        {entry.domain}
                      </span>
                    )}
                    {entry.programName && (
                      <span className="text-xs bg-white/10 rounded px-2 py-0.5 text-white/50">
                        {entry.programName}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
