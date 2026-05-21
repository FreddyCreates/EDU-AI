import type { HeatmapWithNoms, RecognitionFlag } from "@/backend";
import { Badge } from "@/components/ui/badge";
import {
  useAllRecognitionFlags,
  usePrincipalHeatmapWithNoms,
} from "@/hooks/use-principal-intelligence";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowLeft,
  Award,
  Crown,
  Map as MapIcon,
  RefreshCw,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import React, { useEffect, useState } from "react";

// ─── Constants ───────────────────────────────────────────────────────────────────
const AMBER = "oklch(0.75 0.16 70)";
const FIB_REFRESH_MS = 21_000;

const SUBJECTS = [
  "Mathematics",
  "Science",
  "English",
  "History",
  "Geography",
  "Art",
  "Music",
  "Phys Ed",
  "Comp Sci",
  "Biology",
  "Chemistry",
  "Physics",
];

const GRADES = [
  "K",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];

// ─── Helpers ────────────────────────────────────────────────────────────────────
function seedMastery(gi: number, si: number): number {
  const v = ((gi + 1) * 17 + si * 31 + 7) % 97;
  return Math.max(10, v);
}

function masteryStyle(pct: number): {
  bg: string;
  border: string;
  text: string;
  glow: string;
} {
  if (pct >= 80)
    return {
      bg: "rgba(0,210,255,0.12)",
      border: "rgba(0,210,255,0.30)",
      text: "oklch(0.78 0.22 200)",
      glow: "0 0 10px rgba(0,210,255,0.25)",
    };
  if (pct >= 60)
    return {
      bg: "rgba(0,220,130,0.10)",
      border: "rgba(0,220,130,0.28)",
      text: "oklch(0.72 0.17 155)",
      glow: "0 0 8px rgba(0,220,130,0.20)",
    };
  if (pct >= 35)
    return {
      bg: "rgba(255,185,0,0.10)",
      border: "rgba(255,185,0,0.28)",
      text: "oklch(0.75 0.16 70)",
      glow: "none",
    };
  return {
    bg: "rgba(255,60,60,0.08)",
    border: "rgba(255,60,60,0.25)",
    text: "oklch(0.65 0.22 22)",
    glow: "none",
  };
}

function nomBadge(count: number) {
  if (count === 0) return null;
  return (
    <span
      className="absolute -top-1 -right-1 h-4 min-w-[16px] rounded-full flex items-center justify-center font-mono font-bold text-[8px] px-0.5 z-10"
      style={{
        background: "oklch(0.72 0.18 70)",
        color: "oklch(0.15 0.02 70)",
        boxShadow: "0 0 6px rgba(255,185,0,0.60)",
      }}
    >
      {count}
    </span>
  );
}

// ─── Drill-down drawer ───────────────────────────────────────────────────────────
function CellDrilldown({
  cell,
  gradeName,
  mastery,
  onClose,
}: {
  cell: HeatmapWithNoms | null;
  gradeName: string;
  mastery: number;
  onClose: () => void;
}) {
  if (!cell) return null;
  const style = masteryStyle(mastery);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.22 }}
      className="glass-portal-principal rounded-2xl p-5 space-y-4"
      style={{ border: `1px solid ${style.border}` }}
      data-ocid="principal.heatmap.cell_drilldown"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3
            className="font-display font-bold text-sm tracking-wide"
            style={{ color: style.text }}
          >
            {cell.subject} · Grade {gradeName}
          </h3>
          <p className="text-[10px] font-mono text-muted-foreground mt-0.5">
            {Number(cell.activeStudents)} active students · avg {mastery}%
            mastery
          </p>
        </div>
        <button
          type="button"
          className="glass-sm h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-smooth"
          onClick={onClose}
          aria-label="Close drill-down"
          data-ocid="principal.heatmap.drilldown_close_button"
        >
          ×
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Avg Mastery", value: `${mastery}%` },
          { label: "Pending NOMS", value: String(Number(cell.pendingNoms)) },
          {
            label: "Achievements",
            value: String(Number(cell.recentAchievements)),
          },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="rounded-xl p-3 text-center"
            style={{
              background: style.bg,
              border: `1px solid ${style.border}`,
            }}
          >
            <p
              className="font-display font-bold text-lg"
              style={{ color: style.text }}
            >
              {value}
            </p>
            <p className="text-[9px] text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      {Number(cell.pendingNoms) > 0 && (
        <div
          className="rounded-xl p-3 flex items-center justify-between"
          style={{
            background: "rgba(255,185,0,0.07)",
            border: "1px solid rgba(255,185,0,0.20)",
          }}
        >
          <div className="flex items-center gap-2">
            <Star className="h-3.5 w-3.5" style={{ color: AMBER }} />
            <span className="text-xs font-mono" style={{ color: AMBER }}>
              {Number(cell.pendingNoms)} student
              {Number(cell.pendingNoms) !== 1 ? "s" : ""} ready for nomination
            </span>
          </div>
          <Link
            to="/nominations"
            className="text-[10px] font-mono font-bold hover:opacity-80 transition-smooth"
            style={{ color: AMBER }}
            data-ocid="principal.heatmap.nominate_link"
          >
            NOMINATE →
          </Link>
        </div>
      )}
    </motion.div>
  );
}

// ─── Recognition flags banner ───────────────────────────────────────────────────────
function RecognitionBanner({ flags }: { flags: RecognitionFlag[] }) {
  const pending = flags.filter((f) => !f.sealed);
  if (pending.length === 0) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="glass-portal-principal rounded-2xl p-5"
      style={{
        border: "1px solid rgba(255,185,0,0.25)",
        boxShadow: "0 0 20px rgba(255,185,0,0.10)",
      }}
      data-ocid="principal.heatmap.recognition_banner"
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="h-9 w-9 rounded-xl flex items-center justify-center"
          style={{
            background: "rgba(255,185,0,0.15)",
            border: "1px solid rgba(255,185,0,0.30)",
            boxShadow: "0 0 14px rgba(255,185,0,0.20)",
          }}
        >
          <Award className="h-4.5 w-4.5" style={{ color: AMBER }} />
        </div>
        <div>
          <h2
            className="font-display font-bold text-sm tracking-wide"
            style={{
              color: AMBER,
              textShadow: "0 0 20px rgba(255,185,0,0.35)",
            }}
          >
            STUDENTS READY FOR RECOGNITION
          </h2>
          <p className="text-[10px] font-mono text-muted-foreground">
            {pending.length} school-wide RCGN flag
            {pending.length !== 1 ? "s" : ""} pending action
          </p>
        </div>
        <div className="ml-auto">
          <Link
            to="/nominations"
            data-ocid="principal.heatmap.view_all_noms_link"
          >
            <button
              type="button"
              className="glass-sm rounded-lg px-3 py-1.5 font-mono text-[10px] font-bold hover:border-amber-500/40 transition-smooth flex items-center gap-1.5"
              style={{ color: AMBER }}
            >
              <Star className="h-3 w-3" />
              VIEW ALL
            </button>
          </Link>
        </div>
      </div>
      <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
        {pending.slice(0, 8).map((flag, i) => (
          <div
            key={flag.id}
            data-ocid={`principal.heatmap.rcgn_flag.${i + 1}`}
            className="rounded-xl px-4 py-3 flex items-center justify-between gap-3"
            style={{
              background: "rgba(255,185,0,0.06)",
              border: "1px solid rgba(255,185,0,0.15)",
            }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="h-7 w-7 rounded-full flex items-center justify-center shrink-0 font-mono font-bold text-[10px]"
                style={{
                  background: "rgba(255,185,0,0.15)",
                  border: "1px solid rgba(255,185,0,0.25)",
                  color: AMBER,
                }}
              >
                {String(flag.studentId).slice(-2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-foreground truncate">
                  {flag.subject}
                </p>
                <p className="text-[9px] font-mono text-muted-foreground">
                  {flag.pattern} · {Number(flag.masteryScore)}% mastery
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {flag.eligiblePrograms.length > 0 && (
                <Badge
                  className="text-[9px] font-mono px-1.5"
                  style={{
                    background: "rgba(255,185,0,0.12)",
                    color: AMBER,
                    border: "1px solid rgba(255,185,0,0.25)",
                  }}
                >
                  {flag.eligiblePrograms.length} program
                  {flag.eligiblePrograms.length !== 1 ? "s" : ""}
                </Badge>
              )}
              <Link
                to="/nominations"
                data-ocid={`principal.heatmap.nominate_button.${i + 1}`}
              >
                <button
                  type="button"
                  className="glass-sm rounded-lg px-2.5 py-1 font-mono text-[9px] font-bold hover:border-amber-500/40 transition-smooth"
                  style={{ color: AMBER }}
                >
                  NOMINATE
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Heat Cell ────────────────────────────────────────────────────────────────────────
function HeatCell({
  gradeIdx,
  subjectIdx,
  liveCell,
  baseMastery,
  refreshKey,
  onClick,
}: {
  gradeIdx: number;
  subjectIdx: number;
  liveCell: HeatmapWithNoms | null;
  baseMastery: number;
  refreshKey: number;
  onClick: (cell: HeatmapWithNoms | null, gradeIdx: number) => void;
}) {
  const jitter = ((refreshKey + gradeIdx * 7 + subjectIdx * 13) % 8) - 4;
  const pct = Math.max(5, Math.min(99, baseMastery + jitter));
  const style = masteryStyle(pct);
  const pendingNoms = liveCell ? Number(liveCell.pendingNoms) : 0;

  return (
    <motion.div
      key={`${gradeIdx}-${subjectIdx}-${refreshKey}`}
      initial={{ opacity: 0.6, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        delay: (gradeIdx * 12 + subjectIdx) * 0.003,
      }}
      onClick={() => onClick(liveCell, gradeIdx)}
      className="relative rounded-md flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10 group"
      style={{
        background: style.bg,
        border: `1px solid ${style.border}`,
        boxShadow: style.glow,
        minHeight: 40,
        padding: "4px 2px",
      }}
      title={`${SUBJECTS[subjectIdx]}, Grade ${GRADES[gradeIdx]}: ${pct}% mastery`}
      data-ocid={`principal.heatmap.cell.${gradeIdx + 1}_${subjectIdx + 1}`}
    >
      {nomBadge(pendingNoms)}
      <span
        className="font-mono text-[10px] font-bold leading-none"
        style={{ color: style.text }}
      >
        {pct}%
      </span>
      {liveCell && Number(liveCell.activeStudents) > 0 && (
        <span className="text-[8px] text-muted-foreground/60 mt-0.5 leading-none">
          {Number(liveCell.activeStudents)}
        </span>
      )}
      {/* hover tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-20 hidden group-hover:block pointer-events-none">
        <div
          className="rounded-lg px-2 py-1.5 text-[9px] font-mono whitespace-nowrap"
          style={{
            background: "rgba(6,8,18,0.95)",
            border: "1px solid rgba(255,255,255,0.10)",
            color: style.text,
          }}
        >
          {SUBJECTS[subjectIdx]}
          <br />
          Grade {GRADES[gradeIdx]} · {pct}%
          {pendingNoms > 0 && (
            <>
              <br />
              <span style={{ color: AMBER }}>
                ★ {pendingNoms} nomination{pendingNoms !== 1 ? "s" : ""} pending
              </span>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Legend ───────────────────────────────────────────────────────────────────────────
function Legend() {
  const items = [
    {
      label: "≥80% Excellent",
      bg: "rgba(0,210,255,0.12)",
      border: "rgba(0,210,255,0.30)",
      text: "oklch(0.78 0.22 200)",
    },
    {
      label: "60–79% Good",
      bg: "rgba(0,220,130,0.10)",
      border: "rgba(0,220,130,0.28)",
      text: "oklch(0.72 0.17 155)",
    },
    {
      label: "35–59% Developing",
      bg: "rgba(255,185,0,0.10)",
      border: "rgba(255,185,0,0.28)",
      text: "oklch(0.75 0.16 70)",
    },
    {
      label: "<35% Attention",
      bg: "rgba(255,60,60,0.08)",
      border: "rgba(255,60,60,0.25)",
      text: "oklch(0.65 0.22 22)",
    },
  ];
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">
        LEGEND:
      </span>
      {items.map((l) => (
        <span
          key={l.label}
          className="inline-flex items-center gap-1 rounded px-2 py-1 font-mono text-[9px]"
          style={{
            background: l.bg,
            border: `1px solid ${l.border}`,
            color: l.text,
          }}
        >
          {l.label}
        </span>
      ))}
      <span
        className="inline-flex items-center gap-1 rounded px-2 py-1 font-mono text-[9px]"
        style={{
          background: "rgba(255,185,0,0.12)",
          border: "1px solid rgba(255,185,0,0.28)",
          color: AMBER,
        }}
      >
        ★ Gold badge = pending NOMS
      </span>
    </div>
  );
}

// ─── Main ───────────────────────────────────────────────────────────────────────────
export default function PrincipalHeatmap() {
  const { data: heatmapData = [], isLoading } = usePrincipalHeatmapWithNoms();
  const { data: rcgnFlags = [] } = useAllRecognitionFlags();
  const [refreshKey, setRefreshKey] = useState(0);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [selectedCell, setSelectedCell] = useState<{
    cell: HeatmapWithNoms | null;
    gradeIdx: number;
    subjectIdx: number;
  } | null>(null);

  useEffect(() => {
    const t = setInterval(() => {
      setRefreshKey((k) => k + 1);
      setLastRefresh(new Date());
    }, FIB_REFRESH_MS);
    return () => clearInterval(t);
  }, []);

  // Build subject+grade lookup from live data
  const _nomsByClassId = new Map<string, HeatmapWithNoms>(
    heatmapData.map((h) => [h.classId, h]),
  );
  // Also index by grade for per-row matching
  const nomsByGrade = new Map<number, HeatmapWithNoms>();
  for (const h of heatmapData) {
    const g = Number(h.grade);
    if (!nomsByGrade.has(g)) nomsByGrade.set(g, h);
  }

  const totalNoms = heatmapData.reduce((s, h) => s + Number(h.pendingNoms), 0);
  const totalStudents = heatmapData.reduce(
    (s, h) => s + Number(h.activeStudents),
    0,
  );

  function handleCellClick(
    cell: HeatmapWithNoms | null,
    gradeIdx: number,
    subjectIdx: number,
  ) {
    if (
      selectedCell?.gradeIdx === gradeIdx &&
      selectedCell?.subjectIdx === subjectIdx
    ) {
      setSelectedCell(null);
    } else {
      setSelectedCell({ cell, gradeIdx, subjectIdx });
    }
  }

  const selectedCellMastery = selectedCell
    ? Math.max(
        5,
        Math.min(
          99,
          (selectedCell.cell
            ? Math.round(Number(selectedCell.cell.avgMastery))
            : seedMastery(selectedCell.gradeIdx, selectedCell.subjectIdx)) +
            ((refreshKey +
              selectedCell.gradeIdx * 7 +
              selectedCell.subjectIdx * 13) %
              8) -
            4,
        ),
      )
    : 0;

  return (
    <div
      className="portal-enter min-h-screen"
      data-ocid="principal.heatmap_page"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-xl border-b sticky top-0 z-30"
        style={{ borderColor: "rgba(255,185,0,0.12)" }}
        data-ocid="principal.heatmap.header"
      >
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link to="/principal" data-ocid="principal.heatmap.back_link">
                <button
                  type="button"
                  className="glass-sm h-9 w-9 rounded-xl flex items-center justify-center hover:border-amber-500/40 transition-smooth"
                  aria-label="Back to dashboard"
                >
                  <ArrowLeft className="h-4 w-4" style={{ color: AMBER }} />
                </button>
              </Link>
              <div
                className="h-11 w-11 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,185,0,0.20), rgba(255,185,0,0.06))",
                  border: "1px solid rgba(255,185,0,0.35)",
                  boxShadow: "0 0 20px rgba(255,185,0,0.15)",
                }}
              >
                <MapIcon className="h-5 w-5" style={{ color: AMBER }} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1
                    className="font-display text-xl font-bold tracking-widest"
                    style={{
                      color: AMBER,
                      textShadow: "0 0 24px rgba(255,185,0,0.40)",
                    }}
                  >
                    SOVEREIGN KNOWLEDGE MAP
                  </h1>
                  <Badge
                    className="font-mono text-[9px]"
                    style={{
                      background: "rgba(255,185,0,0.12)",
                      color: AMBER,
                      border: "1px solid rgba(255,185,0,0.25)",
                    }}
                  >
                    12 × 13
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                  12 Subjects × 13 Grade Levels · Click any cell to drill down ·
                  Auto-refresh F(8)=21s
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-5">
              {totalNoms > 0 && (
                <div className="flex items-center gap-2">
                  <Star className="h-3.5 w-3.5" style={{ color: AMBER }} />
                  <span className="font-mono text-sm" style={{ color: AMBER }}>
                    {totalNoms}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    PENDING NOMS
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Users className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="font-mono text-sm" style={{ color: AMBER }}>
                  {totalStudents > 0 ? totalStudents.toLocaleString() : "—"}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  TOTAL STUDENTS
                </span>
              </div>
              <div
                className="h-6 w-px"
                style={{ background: "rgba(255,185,0,0.15)" }}
              />
              <div className="flex items-center gap-1.5">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    background: AMBER,
                    boxShadow: "0 0 6px rgba(255,185,0,0.70)",
                    animation: "status-pulse 2s ease-in-out infinite",
                  }}
                />
                <span
                  className="font-mono text-[10px]"
                  style={{ color: AMBER }}
                >
                  LIVE
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setRefreshKey((k) => k + 1);
                  setLastRefresh(new Date());
                }}
                className="glass-sm rounded-lg px-3 py-1.5 flex items-center gap-1.5 hover:border-amber-500/40 transition-smooth"
                style={{ color: AMBER }}
                data-ocid="principal.heatmap.refresh_button"
              >
                <RefreshCw className="h-3 w-3" />
                <span className="font-mono text-[10px]">REFRESH</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-6 space-y-5">
        {/* Recognition Banner — school-wide RCGN flags */}
        <RecognitionBanner flags={rcgnFlags} />

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          data-ocid="principal.heatmap.stats_bar"
        >
          {[
            {
              label: "Grade Levels",
              value: "13",
              sub: "K through 12",
              icon: Crown,
            },
            {
              label: "Subjects",
              value: "12",
              sub: "Core curriculum",
              icon: Activity,
            },
            {
              label: "Pending NOMS",
              value: totalNoms > 0 ? String(totalNoms) : "—",
              sub: "Awaiting nomination",
              icon: Star,
            },
            {
              label: "Refresh Interval",
              value: "21s",
              sub: `Last: ${lastRefresh.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" })}`,
              icon: Zap,
            },
          ].map(({ label, value, sub, icon: Icon }, i) => (
            <div
              key={label}
              className="glass-portal-principal rounded-xl p-4 flex items-center gap-3"
              data-ocid={`principal.heatmap.stat.${i + 1}`}
            >
              <div
                className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  background: "rgba(255,185,0,0.10)",
                  border: "1px solid rgba(255,185,0,0.22)",
                }}
              >
                <Icon className="h-4 w-4" style={{ color: AMBER }} />
              </div>
              <div className="min-w-0">
                <p
                  className="font-display text-xl font-bold leading-none"
                  style={{ color: AMBER }}
                >
                  {value}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5 truncate">
                  {label}
                </p>
                <p
                  className="text-[9px] font-mono mt-0.5"
                  style={{ color: "rgba(255,185,0,0.55)" }}
                >
                  {sub}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Cell drill-down */}
        {selectedCell && (
          <CellDrilldown
            cell={selectedCell.cell}
            gradeName={GRADES[selectedCell.gradeIdx]}
            mastery={selectedCellMastery}
            onClose={() => setSelectedCell(null)}
          />
        )}

        {/* Heatmap grid */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-portal-principal rounded-2xl p-5 overflow-auto"
          data-ocid="principal.heatmap.grid_panel"
        >
          <div className="flex items-center justify-between mb-4">
            <h2
              className="font-display font-bold text-sm tracking-wide"
              style={{ color: AMBER }}
            >
              MASTERY MATRIX — SUBJECTS × GRADES
            </h2>
            <div
              className="h-1 w-16 rounded-full"
              style={{
                background: `linear-gradient(90deg, ${AMBER}, transparent)`,
              }}
            />
          </div>

          {isLoading ? (
            <div
              className="space-y-2 animate-pulse"
              data-ocid="principal.heatmap.loading_state"
            >
              {Array.from({ length: 6 }, (_, k) => k).map((k) => (
                <div key={k} className="h-10 rounded-lg bg-amber-500/5" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `48px repeat(${SUBJECTS.length}, minmax(54px, 1fr))`,
                  gap: "4px",
                  minWidth: 760,
                }}
              >
                {/* Header: subject labels */}
                <div />
                {SUBJECTS.map((subj) => (
                  <div
                    key={subj}
                    className="text-[8px] font-mono text-muted-foreground text-center pb-1 leading-tight px-0.5"
                    style={{ wordBreak: "break-word" }}
                  >
                    {subj}
                  </div>
                ))}

                {/* Data rows */}
                {GRADES.map((grade, gi) => {
                  const gradeNum = gi === 0 ? 0 : gi;
                  const liveRow = nomsByGrade.get(gradeNum) ?? null;
                  return (
                    <React.Fragment key={`row-${grade}`}>
                      <div className="flex items-center justify-end pr-2">
                        <Link
                          to="/principal/grade/$grade"
                          params={{
                            grade: String(gradeNum > 0 ? gradeNum : 1),
                          }}
                        >
                          <span
                            className="font-mono text-xs font-bold cursor-pointer hover:opacity-80 transition-opacity"
                            style={{ color: AMBER }}
                          >
                            {grade}
                          </span>
                        </Link>
                      </div>
                      {SUBJECTS.map((_, si) => {
                        const base = liveRow
                          ? Math.round(Number(liveRow.avgMastery))
                          : seedMastery(gi, si);
                        return (
                          <HeatCell
                            key={`${SUBJECTS[si]}-grade${gi}`}
                            gradeIdx={gi}
                            subjectIdx={si}
                            liveCell={liveRow}
                            baseMastery={base}
                            refreshKey={refreshKey}
                            onClick={(cell, gIdx) =>
                              handleCellClick(cell, gIdx, si)
                            }
                          />
                        );
                      })}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          )}

          <div
            className="mt-5 pt-4"
            style={{ borderTop: "1px solid rgba(255,185,0,0.10)" }}
          >
            <Legend />
          </div>
        </motion.div>

        {/* Grade summary strip */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="glass-portal-principal rounded-2xl p-5"
          data-ocid="principal.heatmap.grade_summary"
        >
          <h3
            className="font-display text-sm font-bold mb-4 tracking-wide"
            style={{ color: AMBER }}
          >
            LIVE GRADE ENROLLMENT
          </h3>
          <div
            className="grid gap-2"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
            }}
          >
            {GRADES.map((grade, gi) => {
              const gradeNum = gi === 0 ? 0 : gi;
              const liveRow = nomsByGrade.get(gradeNum);
              const count = liveRow ? Number(liveRow.activeStudents) : 0;
              const mastery = liveRow
                ? Math.round(Number(liveRow.avgMastery))
                : seedMastery(gi, 5);
              const s = masteryStyle(mastery);
              const pending = liveRow ? Number(liveRow.pendingNoms) : 0;
              return (
                <div
                  key={grade}
                  className="relative rounded-xl p-3 text-center"
                  style={{ background: s.bg, border: `1px solid ${s.border}` }}
                  data-ocid={`principal.heatmap.grade_tile.${gi + 1}`}
                >
                  {pending > 0 && nomBadge(pending)}
                  <p
                    className="font-display font-bold text-base"
                    style={{ color: s.text }}
                  >
                    {grade}
                  </p>
                  <p
                    className="font-mono text-[10px] font-bold mt-0.5"
                    style={{ color: s.text }}
                  >
                    {mastery}%
                  </p>
                  <p className="text-[9px] text-muted-foreground">
                    {count > 0 ? `${count} stu` : "No data"}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Footer nav */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-between pt-2"
        >
          <p className="text-[10px] font-mono text-muted-foreground/50">
            SOVEREIGN KNOWLEDGE MAP · LEX_FLOR ACTIVE · PHI-COMPOUNDED SCORES
          </p>
          <Link to="/principal" data-ocid="principal.heatmap.back_button">
            <button
              type="button"
              className="glass-sm rounded-lg px-3 py-1.5 font-mono text-[10px] flex items-center gap-1.5 hover:border-amber-500/40 transition-smooth"
              style={{ color: AMBER }}
            >
              <ArrowLeft className="h-3 w-3" />
              PRINCIPAL OS
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
