import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFeedbackEvents, useResolveFeedback } from "@/hooks/use-feedback";
import { Link } from "@tanstack/react-router";
import {
  AlertOctagon,
  ArrowLeft,
  Cpu,
  Database,
  Download,
  Filter,
  LogIn,
  Settings,
  Shield,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

// ── Types ────────────────────────────────────────────────────────────────────
type Severity = "INFO" | "WARN" | "CRITICAL";
type EventType = "ENGINE" | "BRIDGE" | "MEMORY" | "AUTH" | "SYSTEM";

type AuditEntry = {
  id: string;
  timestamp: string;
  severity: Severity;
  eventType: EventType;
  actor: string;
  details: string;
};

// ── Deterministic log data — PHI-cycle timestamps ───────────────────────────
const BASE_TS = new Date("2026-05-17T12:34:55Z");
function fibTs(fibSeconds: number) {
  const d = new Date(BASE_TS.getTime() - fibSeconds * 1000);
  return d.toISOString().replace("T", " ").slice(0, 19);
}

const AUDIT_LOG: AuditEntry[] = [
  {
    id: "AUD-001",
    timestamp: fibTs(0),
    severity: "INFO",
    eventType: "ENGINE",
    actor: "AUTN",
    details: "Autonomous cycle fired — F(8)=21 heartbeat, seeds injected",
  },
  {
    id: "AUD-002",
    timestamp: fibTs(1),
    severity: "INFO",
    eventType: "BRIDGE",
    actor: "PONT",
    details: "ICPM→JLIA transit complete — PHI ratio payload 144 bytes",
  },
  {
    id: "AUD-003",
    timestamp: fibTs(2),
    severity: "INFO",
    eventType: "AUTH",
    actor: "teacher.chen@school.edu",
    details: "Internet Identity login — Teacher role confirmed",
  },
  {
    id: "AUD-004",
    timestamp: fibTs(3),
    severity: "INFO",
    eventType: "MEMORY",
    actor: "ARCH",
    details: "Warm→Cold compression cycle complete — F(7)=13 sessions archived",
  },
  {
    id: "AUD-005",
    timestamp: fibTs(5),
    severity: "INFO",
    eventType: "ENGINE",
    actor: "DIAG",
    details: "System health check — COH 94%, all substrates nominal",
  },
  {
    id: "AUD-006",
    timestamp: fibTs(8),
    severity: "WARN",
    eventType: "ENGINE",
    actor: "COHR",
    details: "COH drift detected on PLSE — GENEX reconfiguration queued",
  },
  {
    id: "AUD-007",
    timestamp: fibTs(13),
    severity: "INFO",
    eventType: "AUTH",
    actor: "student.42@school.edu",
    details: "Student login — Grade 7 passport loaded, 3 seeds warm",
  },
  {
    id: "AUD-008",
    timestamp: fibTs(21),
    severity: "INFO",
    eventType: "BRIDGE",
    actor: "MRDM",
    details: "ICPM↔EMRT state sync — 21 passport entries updated",
  },
  {
    id: "AUD-009",
    timestamp: fibTs(34),
    severity: "INFO",
    eventType: "ENGINE",
    actor: "GENX",
    details:
      "PLSE reconfigured — coherence restored, weights reseeded via PHI contraction",
  },
  {
    id: "AUD-010",
    timestamp: fibTs(55),
    severity: "INFO",
    eventType: "SYSTEM",
    actor: "GATE",
    details: "LEX_SVRN check passed — 144 requests validated this cycle",
  },
  {
    id: "AUD-011",
    timestamp: fibTs(89),
    severity: "INFO",
    eventType: "ENGINE",
    actor: "SONR",
    details: "Session health scan — F(3)=2 cycle scan, 13 active sessions",
  },
  {
    id: "AUD-012",
    timestamp: fibTs(144),
    severity: "INFO",
    eventType: "MEMORY",
    actor: "VALT",
    details:
      "ABYSSUS-VAULT append — 8 learning seeds sealed, append-only confirmed",
  },
  {
    id: "AUD-013",
    timestamp: fibTs(233),
    severity: "WARN",
    eventType: "AUTH",
    actor: "student.17@school.edu",
    details:
      "Grade vault boundary check — Grade 8 content requested by Grade 7 student",
  },
  {
    id: "AUD-014",
    timestamp: fibTs(377),
    severity: "INFO",
    eventType: "BRIDGE",
    actor: "NXUS",
    details: "Registry write — ENGR updated, 5 engine stats reported",
  },
  {
    id: "AUD-015",
    timestamp: fibTs(610),
    severity: "INFO",
    eventType: "ENGINE",
    actor: "AUTN",
    details: "Autonomous cycle — CURIO injected 3 follow-up threads",
  },
  {
    id: "AUD-016",
    timestamp: fibTs(987),
    severity: "INFO",
    eventType: "SYSTEM",
    actor: "DIAG",
    details: "F(6)=8 cycle diagnostic — all 7 substrates online, PHI-timed",
  },
  {
    id: "AUD-017",
    timestamp: fibTs(1597),
    severity: "CRITICAL",
    eventType: "AUTH",
    actor: "student.17@school.edu",
    details:
      "Repeated grade-gate violation — GATE flagged, session reviewed by IT",
  },
  {
    id: "AUD-018",
    timestamp: fibTs(2584),
    severity: "INFO",
    eventType: "BRIDGE",
    actor: "CRUX",
    details:
      "JLIA→EMRT FLOR values written — 34 floor-compounded scores cached",
  },
  {
    id: "AUD-019",
    timestamp: fibTs(4181),
    severity: "INFO",
    eventType: "MEMORY",
    actor: "ALOC",
    details:
      "PHI WASM allocator — Fibonacci block compaction, next size F(13)=233 bytes",
  },
  {
    id: "AUD-020",
    timestamp: fibTs(6765),
    severity: "WARN",
    eventType: "ENGINE",
    actor: "META",
    details:
      "Phase ratio imbalance — EXPAND:CRITIQUE:SYNTHESIZE off PHI target by 0.08",
  },
  {
    id: "AUD-021",
    timestamp: fibTs(10946),
    severity: "INFO",
    eventType: "SYSTEM",
    actor: "GATE",
    details: "Factory init complete — all registries sealed, ALPH populated",
  },
];

// ── Icon / style maps ──────────────────────────────────────────────────────────────
const eventTypeIcon: Record<EventType, typeof Cpu> = {
  ENGINE: Cpu,
  BRIDGE: Zap,
  MEMORY: Database,
  AUTH: LogIn,
  SYSTEM: Settings,
};

const severityStyle: Record<Severity, string> = {
  INFO: "bg-[oklch(0.72_0.17_155/0.12)] text-[oklch(0.72_0.17_155)] border-[rgba(0,220,130,0.3)]",
  WARN: "bg-[oklch(0.75_0.16_70/0.12)] text-[oklch(0.75_0.16_70)] border-[rgba(255,185,0,0.3)]",
  CRITICAL:
    "bg-[oklch(0.65_0.22_22/0.15)] text-[oklch(0.65_0.22_22)] border-[oklch(0.65_0.22_22/0.3)]",
};

const SEVERITIES: Array<"ALL" | Severity> = ["ALL", "INFO", "WARN", "CRITICAL"];
const EVENT_TYPES: Array<"ALL" | EventType> = [
  "ALL",
  "ENGINE",
  "BRIDGE",
  "MEMORY",
  "AUTH",
  "SYSTEM",
];

export default function ITAuditLog() {
  const [severityFilter, setSeverityFilter] = useState<"ALL" | Severity>("ALL");
  const [typeFilter, setTypeFilter] = useState<"ALL" | EventType>("ALL");
  const { data: feedbackData } = useFeedbackEvents();
  const resolveMutation = useResolveFeedback();
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [exportDone, setExportDone] = useState(false);

  const hasCritical = AUDIT_LOG.some((e) => e.severity === "CRITICAL");

  const filtered = useMemo(() => {
    return AUDIT_LOG.filter((e) => {
      const matchSev =
        severityFilter === "ALL" || e.severity === severityFilter;
      const matchType = typeFilter === "ALL" || e.eventType === typeFilter;
      return matchSev && matchType;
    });
  }, [severityFilter, typeFilter]);

  function handleExport() {
    setExportDone(false);
    setExportModalOpen(true);
    setTimeout(() => setExportDone(true), 1400);
  }

  return (
    <div
      className="portal-enter min-h-screen p-[var(--phi-21)]"
      data-ocid="it-audit.page"
    >
      <div className="max-w-6xl mx-auto space-y-[var(--phi-21)]">
        {/* ── OS Header ── */}
        <div
          className="glass-lg rounded-2xl px-[var(--phi-21)] py-[var(--phi-13)] flex items-center gap-[var(--phi-13)]"
          style={{ borderColor: "rgba(0,220,130,0.18)" }}
        >
          <Link to="/it-security" data-ocid="it-audit.back_link">
            <button
              type="button"
              className="glass-sm rounded-xl p-[var(--phi-8)] hover:bg-[oklch(0.72_0.17_155/0.1)] transition-smooth"
              aria-label="Back to IT Portal"
            >
              <ArrowLeft
                className="w-5 h-5"
                style={{ color: "oklch(0.72 0.17 155)" }}
              />
            </button>
          </Link>
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: "oklch(0.72 0.17 155 / 0.15)",
              border: "1px solid rgba(0,220,130,0.35)",
            }}
          >
            <Shield
              className="w-4 h-4"
              style={{ color: "oklch(0.72 0.17 155)" }}
            />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-display font-bold text-foreground tracking-wide">
              Sovereign Audit Log
            </h1>
            <p className="text-xs text-muted-foreground font-mono">
              Append-only · PHI-cycle events · {AUDIT_LOG.length} entries
            </p>
          </div>
          <Button
            type="button"
            onClick={handleExport}
            data-ocid="it-audit.export_button"
            className="gap-2 font-mono text-xs"
            style={{
              background: "oklch(0.72 0.17 155 / 0.14)",
              border: "1px solid rgba(0,220,130,0.35)",
              color: "oklch(0.72 0.17 155)",
            }}
            variant="outline"
          >
            <Download className="w-3.5 h-3.5" />
            Export Log
          </Button>
        </div>

        {/* ── Critical Alert Banner ── */}
        {hasCritical && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            data-ocid="it-audit.error_state"
            className="glass rounded-2xl p-[var(--phi-13)] flex items-center gap-[var(--phi-13)]"
            style={{
              border: "1px solid oklch(0.65 0.22 22 / 0.4)",
              boxShadow: "0 0 24px oklch(0.65 0.22 22 / 0.08)",
            }}
          >
            <AlertOctagon
              className="w-5 h-5 shrink-0"
              style={{ color: "oklch(0.65 0.22 22)" }}
            />
            <p className="text-sm text-foreground">
              <span
                className="font-semibold"
                style={{ color: "oklch(0.65 0.22 22)" }}
              >
                Critical events detected.
              </span>{" "}
              Review flagged entries below — GATE has been notified.
            </p>
          </motion.div>
        )}

        {/* ── Filter Bar ── */}
        <div
          data-ocid="it-audit.filter_bar"
          className="glass-sm rounded-xl px-[var(--phi-21)] py-[var(--phi-13)] flex flex-wrap items-center gap-[var(--phi-13)]"
        >
          <Filter className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          <div className="flex items-center gap-[var(--phi-8)] flex-wrap">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              Severity:
            </span>
            {SEVERITIES.map((s) => (
              <button
                key={s}
                type="button"
                data-ocid={`it-audit.severity_filter.${s.toLowerCase()}`}
                onClick={() => setSeverityFilter(s)}
                className="px-[var(--phi-8)] py-[var(--phi-3)] rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-smooth"
                style={{
                  background:
                    severityFilter === s
                      ? "oklch(0.72 0.17 155 / 0.18)"
                      : "transparent",
                  border: `1px solid ${severityFilter === s ? "rgba(0,220,130,0.4)" : "rgba(255,255,255,0.08)"}`,
                  color:
                    severityFilter === s
                      ? "oklch(0.72 0.17 155)"
                      : "oklch(0.55 0.01 260)",
                }}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="w-px h-4 bg-border/40 hidden sm:block" />
          <div className="flex items-center gap-[var(--phi-8)] flex-wrap">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              Type:
            </span>
            {EVENT_TYPES.map((t) => (
              <button
                key={t}
                type="button"
                data-ocid={`it-audit.type_filter.${t.toLowerCase()}`}
                onClick={() => setTypeFilter(t)}
                className="px-[var(--phi-8)] py-[var(--phi-3)] rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-smooth"
                style={{
                  background:
                    typeFilter === t
                      ? "oklch(0.72 0.17 155 / 0.18)"
                      : "transparent",
                  border: `1px solid ${typeFilter === t ? "rgba(0,220,130,0.4)" : "rgba(255,255,255,0.08)"}`,
                  color:
                    typeFilter === t
                      ? "oklch(0.72 0.17 155)"
                      : "oklch(0.55 0.01 260)",
                }}
              >
                {t}
              </button>
            ))}
          </div>
          <span className="ml-auto text-[10px] font-mono text-muted-foreground">
            {filtered.length} entries
          </span>
        </div>

        {/* ── Audit Log Table ── */}
        <div
          className="glass rounded-2xl overflow-hidden"
          style={{ borderColor: "rgba(0,220,130,0.12)" }}
        >
          {/* Sticky header */}
          <div className="sticky top-0 z-10 glass-sm grid grid-cols-[140px_140px_88px_80px_1fr] gap-[var(--phi-13)] px-[var(--phi-21)] py-[var(--phi-8)] border-b border-border/30">
            {["Timestamp", "Actor", "Type", "Sev", "Details"].map((h) => (
              <span
                key={h}
                className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground"
              >
                {h}
              </span>
            ))}
          </div>

          {/* Scrollable rows */}
          <div
            data-ocid="it-audit.list"
            className="max-h-[55vh] overflow-y-auto"
          >
            {filtered.length === 0 && (
              <div
                data-ocid="it-audit.empty_state"
                className="px-[var(--phi-21)] py-[var(--phi-34)] text-center text-sm text-muted-foreground"
              >
                No entries match the current filters.
              </div>
            )}
            {filtered.map((entry, idx) => {
              const Icon = eventTypeIcon[entry.eventType];
              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.025 }}
                  data-ocid={`it-audit.item.${idx + 1}`}
                  className="grid grid-cols-[140px_140px_88px_80px_1fr] gap-[var(--phi-13)] px-[var(--phi-21)] py-[var(--phi-8)] border-b border-border/15 last:border-0 hover:bg-[oklch(0.72_0.17_155/0.03)] transition-smooth items-start"
                >
                  <span className="text-[10px] font-mono text-muted-foreground pt-0.5 break-all">
                    {entry.timestamp}
                  </span>
                  <span className="text-[11px] font-mono text-foreground truncate pt-0.5">
                    {entry.actor}
                  </span>
                  <span className="flex items-center gap-1 pt-0.5">
                    <Icon
                      className="w-3 h-3 shrink-0"
                      style={{ color: "oklch(0.72 0.17 155)" }}
                    />
                    <span
                      className="text-[10px] font-mono"
                      style={{ color: "oklch(0.72 0.17 155)" }}
                    >
                      {entry.eventType}
                    </span>
                  </span>
                  <Badge
                    className={`${severityStyle[entry.severity]} text-[9px] font-mono h-fit w-fit whitespace-nowrap`}
                  >
                    {entry.severity}
                  </Badge>
                  <span className="text-xs text-muted-foreground leading-relaxed break-words min-w-0">
                    {entry.details}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Feedback AI Log */}
      <div className="mt-13 space-y-5">
        <div className="flex items-center gap-3">
          <h2 className="text-white/90 text-2xl font-semibold">
            Feedback AI Log
          </h2>
          <span className="text-xs px-2 py-1 rounded-full backdrop-blur-md bg-white/5 border border-white/10 text-white/50">
            EDDI-Powered
          </span>
        </div>
        {(feedbackData && feedbackData.length > 0
          ? feedbackData
          : [
              {
                id: "seed-1",
                message:
                  "Student portal SSS computation delayed on slow connection",
                severity: "CRITICAL",
                resolved: false,
                itEscalated: false,
                selfCorrectionAttempts: 2n,
                role: "student",
                timestamp: BigInt(Date.now() - 120000),
              },
              {
                id: "seed-2",
                message:
                  "EDDI orb pulse animation stuttering on older Android devices",
                severity: "BUG",
                resolved: true,
                itEscalated: false,
                selfCorrectionAttempts: 1n,
                role: "teacher",
                timestamp: BigInt(Date.now() - 360000),
              },
              {
                id: "seed-3",
                message: "Principal heatmap data fetch timeout under high load",
                severity: "CRITICAL",
                resolved: false,
                itEscalated: true,
                selfCorrectionAttempts: 3n,
                role: "principal",
                timestamp: BigInt(Date.now() - 900000),
              },
            ]
        ).map((event, idx) => {
          let badgeClass = "bg-white/10 text-white/70";
          let badgeLabel = "RECEIVED";
          if (event.itEscalated) {
            badgeClass = "bg-red-900/30 border border-red-400/40 text-red-300";
            badgeLabel = "ESCALATED";
          } else if (event.resolved) {
            badgeClass =
              "bg-teal-900/30 border border-teal-400/40 text-teal-300";
            badgeLabel = "RESOLVED";
          } else if (event.severity === "CRITICAL") {
            badgeClass =
              "bg-yellow-900/30 border border-yellow-400/40 text-yellow-300 animate-pulse";
            badgeLabel = "ANALYZING";
          }
          const tsNum =
            typeof event.timestamp === "bigint"
              ? Number(event.timestamp)
              : Number(event.timestamp ?? 0);
          const timeStr = tsNum
            ? new Date(tsNum).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "--:--";
          return (
            <div
              key={String(event.id)}
              data-ocid={`feedback_log.item.${idx + 1}`}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-5"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-mono ${badgeClass}`}
                    >
                      {badgeLabel}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/50 font-mono uppercase">
                      {String(event.role ?? "system")}
                    </span>
                    <span className="text-white/30 text-xs ml-auto">
                      {timeStr}
                    </span>
                  </div>
                  <p className="text-white/80 text-sm leading-snug truncate">
                    {String(event.message).slice(0, 80)}
                  </p>
                  {event.resolved && !event.itEscalated && (
                    <p className="text-teal-400/70 text-xs italic mt-1">
                      Auto-resolved by EDDI
                    </p>
                  )}
                </div>
                {!event.resolved && (
                  <button
                    type="button"
                    data-ocid={`feedback_log.resolve_button.${idx + 1}`}
                    onClick={() => resolveMutation.mutate(String(event.id))}
                    className="text-xs text-teal-400 hover:text-teal-300 transition-colors shrink-0 mt-1"
                  >
                    Resolve
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Export Modal ── */}
      <AnimatePresence>
        {exportModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-[var(--phi-21)]"
            style={{ background: "rgba(0,0,0,0.6)" }}
            onClick={() => setExportModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="glass-portal-it rounded-3xl p-[var(--phi-34)] max-w-md w-full space-y-[var(--phi-21)]"
              data-ocid="it-audit.export_dialog"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-[var(--phi-13)]">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: "oklch(0.72 0.17 155 / 0.15)",
                      border: "1px solid rgba(0,220,130,0.35)",
                    }}
                  >
                    <Download
                      className="w-5 h-5"
                      style={{ color: "oklch(0.72 0.17 155)" }}
                    />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground">
                      Export Audit Log
                    </h3>
                    <p className="text-xs text-muted-foreground font-mono">
                      ABYSSUS-VALT destination
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  data-ocid="it-audit.export_dialog.close_button"
                  aria-label="Close export modal"
                  onClick={() => setExportModalOpen(false)}
                  className="glass-sm rounded-xl p-[var(--phi-5)] hover:bg-[oklch(0.72_0.17_155/0.08)] transition-smooth"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              <div
                className="glass-sm rounded-xl p-[var(--phi-21)] space-y-[var(--phi-8)]"
                style={{ borderColor: "rgba(0,220,130,0.2)" }}
              >
                {!exportDone ? (
                  <div
                    data-ocid="it-audit.export_dialog.loading_state"
                    className="flex items-center gap-[var(--phi-13)]"
                  >
                    <span
                      className="w-3 h-3 rounded-full animate-pulse"
                      style={{
                        background: "oklch(0.72 0.17 155)",
                        boxShadow: "0 0 8px oklch(0.72 0.17 155 / 0.7)",
                      }}
                    />
                    <span className="text-sm font-mono text-muted-foreground">
                      Routing to ABYSSUS-VALT…
                    </span>
                  </div>
                ) : (
                  <div
                    data-ocid="it-audit.export_dialog.success_state"
                    className="space-y-[var(--phi-8)]"
                  >
                    <div className="flex items-center gap-[var(--phi-8)]">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{
                          background: "oklch(0.72 0.18 162)",
                          boxShadow: "0 0 8px oklch(0.72 0.18 162 / 0.7)",
                        }}
                      />
                      <span
                        className="text-sm font-mono"
                        style={{ color: "oklch(0.72 0.18 162)" }}
                      >
                        Export scheduled for Vault ABYSSUS-VALT
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {filtered.length} log entries sealed. Append-only.
                      Retrievable via QRYX query engine.
                    </p>
                  </div>
                )}
              </div>

              {exportDone && (
                <button
                  type="button"
                  data-ocid="it-audit.export_dialog.confirm_button"
                  onClick={() => setExportModalOpen(false)}
                  className="w-full py-[var(--phi-13)] rounded-xl font-mono text-sm font-bold transition-smooth"
                  style={{
                    background: "oklch(0.72 0.17 155 / 0.14)",
                    border: "1px solid rgba(0,220,130,0.35)",
                    color: "oklch(0.72 0.17 155)",
                  }}
                >
                  Done
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
