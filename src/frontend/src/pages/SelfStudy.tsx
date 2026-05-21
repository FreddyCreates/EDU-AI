import { type CompetitionTemplate, createActor } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  useCompleteMilestone,
  useCreateTrack,
  useMyTracks,
} from "@/hooks/use-selfstudy";
import { useActor } from "@caffeineai/core-infrastructure";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

// Fibonacci weeks-before sequence for milestone preview
const FIB_WEEKS = [13, 8, 5, 3, 2, 1] as const;

const UIL_CATEGORIES_FALLBACK = [
  { value: "UIL_CTE", label: "UIL Career & Technical" },
  { value: "UIL_ACADEMIC", label: "UIL Academic" },
  { value: "UIL_MUSIC", label: "UIL Music" },
  { value: "UIL_ATHLETICS", label: "UIL Athletics" },
  { value: "CUSTOM", label: "Custom / Other" },
];
// Alias so existing usage in TrackCard still resolves
const UIL_CATEGORIES = UIL_CATEGORIES_FALLBACK;

function useCompetitionTemplates() {
  const { actor, isFetching } = useActor(createActor);
  const [templates, setTemplates] = useState<CompetitionTemplate[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!actor || isFetching) return;
    setLoading(true);
    actor
      .getCompetitionTemplates()
      .then((data) => setTemplates(data ?? []))
      .catch(() => setTemplates([]))
      .finally(() => setLoading(false));
  }, [actor, isFetching]);

  return { templates, loading };
}

const CATEGORY_COLORS: Record<string, string> = {
  UIL_CTE: "oklch(0.72 0.20 55)",
  UIL_ACADEMIC: "oklch(0.72 0.20 200)",
  UIL_MUSIC: "oklch(0.72 0.20 280)",
  UIL_ATHLETICS: "oklch(0.72 0.20 155)",
  CUSTOM: "oklch(0.72 0.18 320)",
};

function daysUntil(competitionDate: bigint): number {
  const ms = Number(competitionDate) - Date.now();
  return Math.max(0, Math.floor(ms / 86_400_000));
}

function formatDate(ts: bigint): string {
  return new Date(Number(ts)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function milestoneLabel(weeksBefore: number): string {
  const labels: Record<number, string> = {
    13: "Foundation",
    8: "Fundamentals",
    5: "Domain Build",
    3: "Intensive",
    2: "Full Run",
    1: "Final Prep",
  };
  return labels[weeksBefore] ?? `${weeksBefore}w out`;
}

function GlassOrb() {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 44, height: 44, flexShrink: 0 }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, oklch(0.85 0.22 70), oklch(0.55 0.28 60))",
          boxShadow:
            "0 0 20px oklch(0.75 0.25 65 / 0.55), 0 0 40px oklch(0.65 0.22 60 / 0.25)",
        }}
      />
      <span
        className="relative z-10 text-[20px] select-none"
        style={{ lineHeight: 1 }}
      >
        🧭
      </span>
    </div>
  );
}

interface TabPillsProps {
  active: "tracks" | "create";
  onChange: (tab: "tracks" | "create") => void;
}

function TabPills({ active, onChange }: TabPillsProps) {
  return (
    <div
      className="flex gap-[5px] p-[3px] rounded-full"
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.10)",
      }}
    >
      {(["tracks", "create"] as const).map((tab) => (
        <button
          key={tab}
          type="button"
          data-ocid={`selfstudy.tab.${tab}`}
          onClick={() => onChange(tab)}
          className="px-[21px] py-[8px] rounded-full text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-200"
          style={{
            background:
              active === tab
                ? "linear-gradient(135deg, oklch(0.78 0.22 70), oklch(0.65 0.25 55))"
                : "transparent",
            color:
              active === tab ? "oklch(0.10 0.02 60)" : "rgba(255,255,255,0.55)",
            boxShadow:
              active === tab ? "0 2px 12px oklch(0.75 0.25 65 / 0.35)" : "none",
          }}
        >
          {tab === "tracks" ? "My Tracks" : "Create New"}
        </button>
      ))}
    </div>
  );
}

function TrackCard({
  track,
  index,
}: {
  track: ReturnType<typeof useMyTracks>["data"] extends (infer T)[] | undefined
    ? T
    : never;
  index: number;
}) {
  const completeMilestone = useCompleteMilestone();
  const days = daysUntil(track.competitionDate);
  const nextIncomplete = track.milestones.findIndex((m) => !m.isComplete);
  const categoryColor =
    CATEGORY_COLORS[track.category] ?? "oklch(0.72 0.18 70)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 13 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.08 }}
      data-ocid={`selfstudy.track.item.${index + 1}`}
      className="rounded-[21px] p-[21px] flex flex-col gap-[13px]"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.10)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-[8px]">
        <div className="flex flex-col gap-[5px] min-w-0">
          <h3
            className="font-semibold text-[15px] leading-tight"
            style={{ color: "rgba(255,255,255,0.90)" }}
          >
            {track.title}
          </h3>
          <span
            className="text-[11px] font-mono"
            style={{ color: "rgba(255,255,255,0.50)" }}
          >
            Competition: {formatDate(track.competitionDate)}
          </span>
        </div>
        <div className="flex flex-col items-end gap-[5px] shrink-0">
          <span
            className="px-[8px] py-[3px] rounded-full text-[10px] font-mono font-bold uppercase tracking-wider"
            style={{
              background: `${categoryColor}22`,
              color: categoryColor,
              border: `1px solid ${categoryColor}44`,
            }}
          >
            {UIL_CATEGORIES.find((c) => c.value === track.category)?.label ??
              track.category}
          </span>
          <span
            className="text-[11px] font-mono font-semibold"
            style={{
              color:
                days < 14
                  ? "oklch(0.75 0.22 30)"
                  : days < 30
                    ? "oklch(0.78 0.22 70)"
                    : "rgba(255,255,255,0.60)",
            }}
          >
            {days > 0 ? `${days}d until competition` : "Competition day!"}
          </span>
        </div>
      </div>

      {/* Mastery bar */}
      <div className="flex flex-col gap-[5px]">
        <div className="flex items-center justify-between">
          <span
            className="text-[10px] font-mono uppercase tracking-wider"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Mastery
          </span>
          <span
            className="text-[11px] font-mono font-bold"
            style={{ color: "oklch(0.82 0.22 70)" }}
          >
            {track.masteryPct}%
          </span>
        </div>
        <div
          className="h-[5px] w-full rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${track.masteryPct}%`,
              background:
                "linear-gradient(90deg, oklch(0.75 0.25 65), oklch(0.85 0.22 75))",
              boxShadow: "0 0 8px oklch(0.78 0.25 68 / 0.50)",
            }}
          />
        </div>
      </div>

      {/* Milestone timeline */}
      {track.milestones.length > 0 && (
        <div className="flex flex-col gap-[8px]">
          <span
            className="text-[10px] font-mono uppercase tracking-wider"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Milestones
          </span>
          <div className="flex gap-[5px] overflow-x-auto pb-[5px] scrollbar-hide">
            {track.milestones.map((m, _i) => (
              <div
                key={`ms-${m.weeksBefore}-${m.domain}`}
                className="flex flex-col items-center gap-[3px] rounded-[8px] px-[8px] py-[5px] shrink-0"
                style={{
                  background: m.isComplete
                    ? "oklch(0.78 0.22 70 / 0.18)"
                    : "rgba(255,255,255,0.05)",
                  border: m.isComplete
                    ? "1px solid oklch(0.78 0.22 70 / 0.40)"
                    : "1px solid rgba(255,255,255,0.08)",
                  minWidth: 64,
                }}
              >
                <span
                  className="text-[9px] font-mono font-bold uppercase tracking-wider"
                  style={{
                    color: m.isComplete
                      ? "oklch(0.82 0.22 70)"
                      : "rgba(255,255,255,0.40)",
                  }}
                >
                  {m.weeksBefore}w
                </span>
                <span
                  className="text-[9px] text-center leading-tight"
                  style={{
                    color: m.isComplete
                      ? "rgba(255,255,255,0.80)"
                      : "rgba(255,255,255,0.40)",
                    maxWidth: 56,
                  }}
                >
                  {m.title || milestoneLabel(m.weeksBefore)}
                </span>
                {m.isComplete && <span className="text-[10px]">✓</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action */}
      {nextIncomplete >= 0 && (
        <Button
          type="button"
          size="sm"
          data-ocid={`selfstudy.track.complete_milestone.${index + 1}`}
          onClick={() =>
            completeMilestone.mutate({
              trackId: track.id,
              milestoneIndex: nextIncomplete,
            })
          }
          disabled={completeMilestone.isPending}
          className="w-full h-[44px] font-mono text-[11px] uppercase tracking-wider transition-all duration-200"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.78 0.22 70 / 0.25), oklch(0.65 0.22 60 / 0.15))",
            border: "1px solid oklch(0.78 0.22 70 / 0.35)",
            color: "oklch(0.85 0.20 70)",
          }}
        >
          {completeMilestone.isPending
            ? "Marking..."
            : `Mark Next Milestone Done · ${track.milestones[nextIncomplete]?.title ?? milestoneLabel(track.milestones[nextIncomplete]?.weeksBefore ?? 0)}`}
        </Button>
      )}
    </motion.div>
  );
}

function CreateTrackForm({ onSuccess }: { onSuccess: () => void }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("UIL_CTE");
  const [dateStr, setDateStr] = useState("");
  const [selectedTemplate, setSelectedTemplate] =
    useState<CompetitionTemplate | null>(null);
  const createTrack = useCreateTrack();
  const { templates, loading: templatesLoading } = useCompetitionTemplates();

  // Derive dropdown options — live templates first, fallback to static
  const templateOptions =
    templates.length > 0
      ? templates.map((t) => ({
          value: t.name,
          label: `${t.name} — ${t.organization}`,
          category: t.category,
          domains: t.domains,
        }))
      : UIL_CATEGORIES_FALLBACK.map((c) => ({
          value: c.value,
          label: c.label,
          category: c.value,
          domains: [],
        }));

  const handleTemplateChange = (val: string) => {
    if (templates.length > 0) {
      const tpl = templates.find((t) => t.name === val);
      if (tpl) {
        setSelectedTemplate(tpl);
        setCategory(tpl.category);
        if (!title) setTitle(tpl.name);
      }
    } else {
      setCategory(val);
      setSelectedTemplate(null);
    }
  };

  const weeksUntil = dateStr
    ? Math.max(
        0,
        Math.floor(
          (new Date(dateStr).getTime() - Date.now()) / (7 * 86_400_000),
        ),
      )
    : 0;

  const previewMilestones = FIB_WEEKS.filter((w) => w <= weeksUntil);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !dateStr) return;
    await createTrack.mutateAsync({
      title: title.trim(),
      category,
      competitionDate: BigInt(new Date(dateStr).getTime()),
    });
    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-[21px]"
      data-ocid="selfstudy.create_form"
    >
      {/* Activity title */}
      <div className="flex flex-col gap-[8px]">
        <label
          htmlFor="ss-title"
          className="text-[11px] font-mono uppercase tracking-wider"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          Activity Title
        </label>
        <input
          id="ss-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Skills USA Construction"
          data-ocid="selfstudy.title_input"
          required
          className="h-[44px] w-full rounded-[13px] px-[13px] text-[14px] outline-none transition-all duration-200"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.90)",
          }}
        />
      </div>

      {/* Competition / UIL Category */}
      <div className="flex flex-col gap-[8px]">
        <label
          htmlFor="ss-category"
          className="text-[11px] font-mono uppercase tracking-wider"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          {templates.length > 0 ? "Competition Program" : "UIL Category"}
          {templatesLoading && (
            <span className="ml-2 opacity-50 normal-case">loading…</span>
          )}
        </label>
        <select
          id="ss-category"
          value={
            templates.length > 0 ? (selectedTemplate?.name ?? "") : category
          }
          onChange={(e) => handleTemplateChange(e.target.value)}
          data-ocid="selfstudy.category_select"
          className="h-[44px] w-full rounded-[13px] px-[13px] text-[14px] outline-none appearance-none transition-all duration-200"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.90)",
          }}
        >
          {templates.length > 0 && (
            <option
              value=""
              disabled
              style={{ background: "#100d22", color: "rgba(255,255,255,0.50)" }}
            >
              Select a competition…
            </option>
          )}
          {templateOptions.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              style={{ background: "#100d22", color: "rgba(255,255,255,0.90)" }}
            >
              {opt.label}
            </option>
          ))}
        </select>

        {/* Domains preview when template selected */}
        {selectedTemplate?.domains && selectedTemplate.domains.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="flex gap-[5px] flex-wrap mt-[5px]"
            data-ocid="selfstudy.domains_preview"
          >
            {selectedTemplate.domains.map((d) => (
              <span
                key={d}
                className="px-[8px] py-[3px] rounded-full text-[10px] font-mono"
                style={{
                  background: "oklch(0.78 0.22 200 / 0.12)",
                  border: "1px solid oklch(0.78 0.22 200 / 0.25)",
                  color: "oklch(0.82 0.18 200)",
                }}
              >
                {d}
              </span>
            ))}
          </motion.div>
        )}
      </div>

      {/* Competition date */}
      <div className="flex flex-col gap-[8px]">
        <label
          htmlFor="ss-date"
          className="text-[11px] font-mono uppercase tracking-wider"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          Competition Date
        </label>
        <input
          id="ss-date"
          type="date"
          value={dateStr}
          onChange={(e) => setDateStr(e.target.value)}
          data-ocid="selfstudy.date_input"
          required
          min={new Date().toISOString().split("T")[0]}
          className="h-[44px] w-full rounded-[13px] px-[13px] text-[14px] outline-none transition-all duration-200"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.90)",
            colorScheme: "dark",
          }}
        />
      </div>

      {/* Fibonacci milestone preview */}
      {dateStr && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="flex flex-col gap-[8px]"
          data-ocid="selfstudy.milestone_preview"
        >
          <span
            className="text-[11px] font-mono uppercase tracking-wider"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            EDDI will build these milestones
          </span>
          <div className="flex gap-[5px] flex-wrap">
            {previewMilestones.length > 0 ? (
              previewMilestones.map((w) => (
                <span
                  key={`preview-${w}`}
                  className="px-[8px] py-[5px] rounded-[8px] text-[10px] font-mono"
                  style={{
                    background: "oklch(0.78 0.22 70 / 0.12)",
                    border: "1px solid oklch(0.78 0.22 70 / 0.25)",
                    color: "oklch(0.82 0.20 70)",
                  }}
                >
                  {w}w · {milestoneLabel(w)}
                </span>
              ))
            ) : (
              <span
                className="text-[11px]"
                style={{ color: "rgba(255,255,255,0.40)" }}
              >
                Select a date further out to see milestones
              </span>
            )}
          </div>
        </motion.div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        disabled={!title.trim() || !dateStr || createTrack.isPending}
        data-ocid="selfstudy.submit_button"
        className="h-[55px] w-full rounded-[13px] font-mono font-bold text-[13px] uppercase tracking-widest transition-all duration-200"
        style={{
          background:
            title.trim() && dateStr
              ? "linear-gradient(135deg, oklch(0.78 0.25 70), oklch(0.65 0.28 55))"
              : "rgba(255,255,255,0.08)",
          color:
            title.trim() && dateStr
              ? "oklch(0.08 0.02 60)"
              : "rgba(255,255,255,0.35)",
          boxShadow:
            title.trim() && dateStr
              ? "0 4px 24px oklch(0.75 0.25 65 / 0.40)"
              : "none",
          border: "none",
        }}
      >
        {createTrack.isPending
          ? "EDDI is building your path..."
          : "Let EDDI Build My Path →"}
      </Button>
    </form>
  );
}

export default function SelfStudy() {
  const [tab, setTab] = useState<"tracks" | "create">("tracks");
  const { data: tracks = [], isLoading } = useMyTracks();

  return (
    <div
      className="min-h-screen pb-[89px]"
      style={{ background: "oklch(0.08 0.02 280)" }}
    >
      {/* Hero header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="px-[21px] pt-[34px] pb-[21px] flex flex-col gap-[13px]"
        data-ocid="selfstudy.header"
      >
        <div className="flex items-center gap-[13px]">
          <GlassOrb />
          <div className="flex flex-col min-w-0">
            <h1
              className="text-[26px] font-bold leading-tight"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.92 0.18 70), oklch(0.78 0.25 60))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Self-Study Creator
            </h1>
            <p
              className="text-[12px] font-mono mt-[3px]"
              style={{ color: "rgba(255,255,255,0.50)" }}
            >
              EDDI builds your competition prep path
            </p>
          </div>
        </div>
        <p
          className="text-[13px] leading-relaxed"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          Competing in Skills USA, UIL, or any program? Set your date — EDDI
          maps Fibonacci milestones backward from competition day so you're
          always ready, no matter how tight your schedule.
        </p>
      </motion.div>

      {/* Tab pills */}
      <div className="px-[21px] pb-[21px]">
        <TabPills active={tab} onChange={setTab} />
      </div>

      {/* Tab content */}
      <div className="px-[21px]">
        {tab === "tracks" && (
          <motion.div
            key="tracks"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.18 }}
            className="flex flex-col gap-[13px]"
            data-ocid="selfstudy.tracks_tab"
          >
            {isLoading ? (
              <div
                className="flex flex-col gap-[8px] py-[34px] items-center"
                data-ocid="selfstudy.tracks.loading_state"
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={`skel-${i}`}
                    className="h-[89px] w-full rounded-[21px] animate-pulse"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  />
                ))}
              </div>
            ) : tracks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-[13px] py-[55px]"
                data-ocid="selfstudy.tracks.empty_state"
              >
                <div
                  className="w-[55px] h-[55px] rounded-full flex items-center justify-center text-[28px]"
                  style={{
                    background: "oklch(0.78 0.22 70 / 0.12)",
                    border: "1px solid oklch(0.78 0.22 70 / 0.22)",
                  }}
                >
                  🧭
                </div>
                <div className="flex flex-col items-center gap-[5px]">
                  <p
                    className="text-[15px] font-semibold"
                    style={{ color: "rgba(255,255,255,0.75)" }}
                  >
                    No tracks yet
                  </p>
                  <p
                    className="text-[12px] text-center"
                    style={{ color: "rgba(255,255,255,0.40)" }}
                  >
                    Create your first track below and EDDI will build your prep
                    path.
                  </p>
                </div>
                <Button
                  type="button"
                  data-ocid="selfstudy.empty_state.create_button"
                  onClick={() => setTab("create")}
                  className="h-[44px] px-[21px] rounded-full font-mono text-[11px] uppercase tracking-wider"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.78 0.22 70), oklch(0.65 0.25 55))",
                    color: "oklch(0.10 0.02 60)",
                    border: "none",
                    boxShadow: "0 4px 16px oklch(0.75 0.25 65 / 0.35)",
                  }}
                >
                  Create First Track
                </Button>
              </motion.div>
            ) : (
              tracks.map((track, i) => (
                <TrackCard key={track.id} track={track} index={i} />
              ))
            )}
          </motion.div>
        )}

        {tab === "create" && (
          <motion.div
            key="create"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.18 }}
            className="rounded-[21px] p-[21px]"
            data-ocid="selfstudy.create_tab"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.10)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            <CreateTrackForm onSuccess={() => setTab("tracks")} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
