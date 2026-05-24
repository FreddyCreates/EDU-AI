import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { B as Button } from "./button-CWs7EcLL.js";
import { i as createLucideIcon, x as useFeedbackEvents, y as useResolveFeedback, k as Shield, L as LogIn, D as Database, Z as Zap, C as Cpu, X } from "./index-BivnQ6bB.js";
import { L as Link } from "./router-D6GUppNf.js";
import { A as ArrowLeft } from "./arrow-left-DLov4c1N.js";
import { D as Download } from "./download-dijSjmqv.js";
import { m as motion, A as AnimatePresence } from "./motion-BK2wxCtX.js";
import { F as Funnel } from "./funnel-p38cV8I3.js";
import { S as Settings } from "./settings-C4T1En8l.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./query-8urnerR0.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 16h.01", key: "1drbdi" }],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  [
    "path",
    {
      d: "M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z",
      key: "1fd625"
    }
  ]
];
const OctagonAlert = createLucideIcon("octagon-alert", __iconNode);
const BASE_TS = /* @__PURE__ */ new Date("2026-05-17T12:34:55Z");
function fibTs(fibSeconds) {
  const d = new Date(BASE_TS.getTime() - fibSeconds * 1e3);
  return d.toISOString().replace("T", " ").slice(0, 19);
}
const AUDIT_LOG = [
  {
    id: "AUD-001",
    timestamp: fibTs(0),
    severity: "INFO",
    eventType: "ENGINE",
    actor: "AUTN",
    details: "Autonomous cycle fired — F(8)=21 heartbeat, seeds injected"
  },
  {
    id: "AUD-002",
    timestamp: fibTs(1),
    severity: "INFO",
    eventType: "BRIDGE",
    actor: "PONT",
    details: "ICPM→JLIA transit complete — PHI ratio payload 144 bytes"
  },
  {
    id: "AUD-003",
    timestamp: fibTs(2),
    severity: "INFO",
    eventType: "AUTH",
    actor: "teacher.chen@school.edu",
    details: "Internet Identity login — Teacher role confirmed"
  },
  {
    id: "AUD-004",
    timestamp: fibTs(3),
    severity: "INFO",
    eventType: "MEMORY",
    actor: "ARCH",
    details: "Warm→Cold compression cycle complete — F(7)=13 sessions archived"
  },
  {
    id: "AUD-005",
    timestamp: fibTs(5),
    severity: "INFO",
    eventType: "ENGINE",
    actor: "DIAG",
    details: "System health check — COH 94%, all substrates nominal"
  },
  {
    id: "AUD-006",
    timestamp: fibTs(8),
    severity: "WARN",
    eventType: "ENGINE",
    actor: "COHR",
    details: "COH drift detected on PLSE — GENEX reconfiguration queued"
  },
  {
    id: "AUD-007",
    timestamp: fibTs(13),
    severity: "INFO",
    eventType: "AUTH",
    actor: "student.42@school.edu",
    details: "Student login — Grade 7 passport loaded, 3 seeds warm"
  },
  {
    id: "AUD-008",
    timestamp: fibTs(21),
    severity: "INFO",
    eventType: "BRIDGE",
    actor: "MRDM",
    details: "ICPM↔EMRT state sync — 21 passport entries updated"
  },
  {
    id: "AUD-009",
    timestamp: fibTs(34),
    severity: "INFO",
    eventType: "ENGINE",
    actor: "GENX",
    details: "PLSE reconfigured — coherence restored, weights reseeded via PHI contraction"
  },
  {
    id: "AUD-010",
    timestamp: fibTs(55),
    severity: "INFO",
    eventType: "SYSTEM",
    actor: "GATE",
    details: "LEX_SVRN check passed — 144 requests validated this cycle"
  },
  {
    id: "AUD-011",
    timestamp: fibTs(89),
    severity: "INFO",
    eventType: "ENGINE",
    actor: "SONR",
    details: "Session health scan — F(3)=2 cycle scan, 13 active sessions"
  },
  {
    id: "AUD-012",
    timestamp: fibTs(144),
    severity: "INFO",
    eventType: "MEMORY",
    actor: "VALT",
    details: "ABYSSUS-VAULT append — 8 learning seeds sealed, append-only confirmed"
  },
  {
    id: "AUD-013",
    timestamp: fibTs(233),
    severity: "WARN",
    eventType: "AUTH",
    actor: "student.17@school.edu",
    details: "Grade vault boundary check — Grade 8 content requested by Grade 7 student"
  },
  {
    id: "AUD-014",
    timestamp: fibTs(377),
    severity: "INFO",
    eventType: "BRIDGE",
    actor: "NXUS",
    details: "Registry write — ENGR updated, 5 engine stats reported"
  },
  {
    id: "AUD-015",
    timestamp: fibTs(610),
    severity: "INFO",
    eventType: "ENGINE",
    actor: "AUTN",
    details: "Autonomous cycle — CURIO injected 3 follow-up threads"
  },
  {
    id: "AUD-016",
    timestamp: fibTs(987),
    severity: "INFO",
    eventType: "SYSTEM",
    actor: "DIAG",
    details: "F(6)=8 cycle diagnostic — all 7 substrates online, PHI-timed"
  },
  {
    id: "AUD-017",
    timestamp: fibTs(1597),
    severity: "CRITICAL",
    eventType: "AUTH",
    actor: "student.17@school.edu",
    details: "Repeated grade-gate violation — GATE flagged, session reviewed by IT"
  },
  {
    id: "AUD-018",
    timestamp: fibTs(2584),
    severity: "INFO",
    eventType: "BRIDGE",
    actor: "CRUX",
    details: "JLIA→EMRT FLOR values written — 34 floor-compounded scores cached"
  },
  {
    id: "AUD-019",
    timestamp: fibTs(4181),
    severity: "INFO",
    eventType: "MEMORY",
    actor: "ALOC",
    details: "PHI WASM allocator — Fibonacci block compaction, next size F(13)=233 bytes"
  },
  {
    id: "AUD-020",
    timestamp: fibTs(6765),
    severity: "WARN",
    eventType: "ENGINE",
    actor: "META",
    details: "Phase ratio imbalance — EXPAND:CRITIQUE:SYNTHESIZE off PHI target by 0.08"
  },
  {
    id: "AUD-021",
    timestamp: fibTs(10946),
    severity: "INFO",
    eventType: "SYSTEM",
    actor: "GATE",
    details: "Factory init complete — all registries sealed, ALPH populated"
  }
];
const eventTypeIcon = {
  ENGINE: Cpu,
  BRIDGE: Zap,
  MEMORY: Database,
  AUTH: LogIn,
  SYSTEM: Settings
};
const severityStyle = {
  INFO: "bg-[oklch(0.72_0.17_155/0.12)] text-[oklch(0.72_0.17_155)] border-[rgba(0,220,130,0.3)]",
  WARN: "bg-[oklch(0.75_0.16_70/0.12)] text-[oklch(0.75_0.16_70)] border-[rgba(255,185,0,0.3)]",
  CRITICAL: "bg-[oklch(0.65_0.22_22/0.15)] text-[oklch(0.65_0.22_22)] border-[oklch(0.65_0.22_22/0.3)]"
};
const SEVERITIES = ["ALL", "INFO", "WARN", "CRITICAL"];
const EVENT_TYPES = [
  "ALL",
  "ENGINE",
  "BRIDGE",
  "MEMORY",
  "AUTH",
  "SYSTEM"
];
function ITAuditLog() {
  const [severityFilter, setSeverityFilter] = reactExports.useState("ALL");
  const [typeFilter, setTypeFilter] = reactExports.useState("ALL");
  const { data: feedbackData } = useFeedbackEvents();
  const resolveMutation = useResolveFeedback();
  const [exportModalOpen, setExportModalOpen] = reactExports.useState(false);
  const [exportDone, setExportDone] = reactExports.useState(false);
  const hasCritical = AUDIT_LOG.some((e) => e.severity === "CRITICAL");
  const filtered = reactExports.useMemo(() => {
    return AUDIT_LOG.filter((e) => {
      const matchSev = severityFilter === "ALL" || e.severity === severityFilter;
      const matchType = typeFilter === "ALL" || e.eventType === typeFilter;
      return matchSev && matchType;
    });
  }, [severityFilter, typeFilter]);
  function handleExport() {
    setExportDone(false);
    setExportModalOpen(true);
    setTimeout(() => setExportDone(true), 1400);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "portal-enter min-h-screen p-[var(--phi-21)]",
      "data-ocid": "it-audit.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto space-y-[var(--phi-21)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass-lg rounded-2xl px-[var(--phi-21)] py-[var(--phi-13)] flex items-center gap-[var(--phi-13)]",
              style: { borderColor: "rgba(0,220,130,0.18)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/it-security", "data-ocid": "it-audit.back_link", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "glass-sm rounded-xl p-[var(--phi-8)] hover:bg-[oklch(0.72_0.17_155/0.1)] transition-smooth",
                    "aria-label": "Back to IT Portal",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ArrowLeft,
                      {
                        className: "w-5 h-5",
                        style: { color: "oklch(0.72 0.17 155)" }
                      }
                    )
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-8 h-8 rounded-lg flex items-center justify-center",
                    style: {
                      background: "oklch(0.72 0.17 155 / 0.15)",
                      border: "1px solid rgba(0,220,130,0.35)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Shield,
                      {
                        className: "w-4 h-4",
                        style: { color: "oklch(0.72 0.17 155)" }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground tracking-wide", children: "Sovereign Audit Log" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono", children: [
                    "Append-only · PHI-cycle events · ",
                    AUDIT_LOG.length,
                    " entries"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    onClick: handleExport,
                    "data-ocid": "it-audit.export_button",
                    className: "gap-2 font-mono text-xs",
                    style: {
                      background: "oklch(0.72 0.17 155 / 0.14)",
                      border: "1px solid rgba(0,220,130,0.35)",
                      color: "oklch(0.72 0.17 155)"
                    },
                    variant: "outline",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
                      "Export Log"
                    ]
                  }
                )
              ]
            }
          ),
          hasCritical && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: -4 },
              animate: { opacity: 1, y: 0 },
              "data-ocid": "it-audit.error_state",
              className: "glass rounded-2xl p-[var(--phi-13)] flex items-center gap-[var(--phi-13)]",
              style: {
                border: "1px solid oklch(0.65 0.22 22 / 0.4)",
                boxShadow: "0 0 24px oklch(0.65 0.22 22 / 0.08)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  OctagonAlert,
                  {
                    className: "w-5 h-5 shrink-0",
                    style: { color: "oklch(0.65 0.22 22)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-semibold",
                      style: { color: "oklch(0.65 0.22 22)" },
                      children: "Critical events detected."
                    }
                  ),
                  " ",
                  "Review flagged entries below — GATE has been notified."
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "it-audit.filter_bar",
              className: "glass-sm rounded-xl px-[var(--phi-21)] py-[var(--phi-13)] flex flex-wrap items-center gap-[var(--phi-13)]",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-3.5 h-3.5 text-muted-foreground shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-[var(--phi-8)] flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono uppercase tracking-widest text-muted-foreground", children: "Severity:" }),
                  SEVERITIES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": `it-audit.severity_filter.${s.toLowerCase()}`,
                      onClick: () => setSeverityFilter(s),
                      className: "px-[var(--phi-8)] py-[var(--phi-3)] rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-smooth",
                      style: {
                        background: severityFilter === s ? "oklch(0.72 0.17 155 / 0.18)" : "transparent",
                        border: `1px solid ${severityFilter === s ? "rgba(0,220,130,0.4)" : "rgba(255,255,255,0.08)"}`,
                        color: severityFilter === s ? "oklch(0.72 0.17 155)" : "oklch(0.55 0.01 260)"
                      },
                      children: s
                    },
                    s
                  ))
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-4 bg-border/40 hidden sm:block" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-[var(--phi-8)] flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono uppercase tracking-widest text-muted-foreground", children: "Type:" }),
                  EVENT_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": `it-audit.type_filter.${t.toLowerCase()}`,
                      onClick: () => setTypeFilter(t),
                      className: "px-[var(--phi-8)] py-[var(--phi-3)] rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-smooth",
                      style: {
                        background: typeFilter === t ? "oklch(0.72 0.17 155 / 0.18)" : "transparent",
                        border: `1px solid ${typeFilter === t ? "rgba(0,220,130,0.4)" : "rgba(255,255,255,0.08)"}`,
                        color: typeFilter === t ? "oklch(0.72 0.17 155)" : "oklch(0.55 0.01 260)"
                      },
                      children: t
                    },
                    t
                  ))
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-[10px] font-mono text-muted-foreground", children: [
                  filtered.length,
                  " entries"
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass rounded-2xl overflow-hidden",
              style: { borderColor: "rgba(0,220,130,0.12)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-10 glass-sm grid grid-cols-[140px_140px_88px_80px_1fr] gap-[var(--phi-13)] px-[var(--phi-21)] py-[var(--phi-8)] border-b border-border/30", children: ["Timestamp", "Actor", "Type", "Sev", "Details"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-[10px] font-mono uppercase tracking-widest text-muted-foreground",
                    children: h
                  },
                  h
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    "data-ocid": "it-audit.list",
                    className: "max-h-[55vh] overflow-y-auto",
                    children: [
                      filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          "data-ocid": "it-audit.empty_state",
                          className: "px-[var(--phi-21)] py-[var(--phi-34)] text-center text-sm text-muted-foreground",
                          children: "No entries match the current filters."
                        }
                      ),
                      filtered.map((entry, idx) => {
                        const Icon = eventTypeIcon[entry.eventType];
                        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          motion.div,
                          {
                            initial: { opacity: 0, x: -6 },
                            animate: { opacity: 1, x: 0 },
                            transition: { delay: idx * 0.025 },
                            "data-ocid": `it-audit.item.${idx + 1}`,
                            className: "grid grid-cols-[140px_140px_88px_80px_1fr] gap-[var(--phi-13)] px-[var(--phi-21)] py-[var(--phi-8)] border-b border-border/15 last:border-0 hover:bg-[oklch(0.72_0.17_155/0.03)] transition-smooth items-start",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground pt-0.5 break-all", children: entry.timestamp }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-mono text-foreground truncate pt-0.5", children: entry.actor }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 pt-0.5", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  Icon,
                                  {
                                    className: "w-3 h-3 shrink-0",
                                    style: { color: "oklch(0.72 0.17 155)" }
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "span",
                                  {
                                    className: "text-[10px] font-mono",
                                    style: { color: "oklch(0.72 0.17 155)" },
                                    children: entry.eventType
                                  }
                                )
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Badge,
                                {
                                  className: `${severityStyle[entry.severity]} text-[9px] font-mono h-fit w-fit whitespace-nowrap`,
                                  children: entry.severity
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground leading-relaxed break-words min-w-0", children: entry.details })
                            ]
                          },
                          entry.id
                        );
                      })
                    ]
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-13 space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white/90 text-2xl font-semibold", children: "Feedback AI Log" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-1 rounded-full backdrop-blur-md bg-white/5 border border-white/10 text-white/50", children: "EDDI-Powered" })
          ] }),
          (feedbackData && feedbackData.length > 0 ? feedbackData : [
            {
              id: "seed-1",
              message: "Student portal SSS computation delayed on slow connection",
              severity: "CRITICAL",
              resolved: false,
              itEscalated: false,
              selfCorrectionAttempts: 2n,
              role: "student",
              timestamp: BigInt(Date.now() - 12e4)
            },
            {
              id: "seed-2",
              message: "EDDI orb pulse animation stuttering on older Android devices",
              severity: "BUG",
              resolved: true,
              itEscalated: false,
              selfCorrectionAttempts: 1n,
              role: "teacher",
              timestamp: BigInt(Date.now() - 36e4)
            },
            {
              id: "seed-3",
              message: "Principal heatmap data fetch timeout under high load",
              severity: "CRITICAL",
              resolved: false,
              itEscalated: true,
              selfCorrectionAttempts: 3n,
              role: "principal",
              timestamp: BigInt(Date.now() - 9e5)
            }
          ]).map((event, idx) => {
            let badgeClass = "bg-white/10 text-white/70";
            let badgeLabel = "RECEIVED";
            if (event.itEscalated) {
              badgeClass = "bg-red-900/30 border border-red-400/40 text-red-300";
              badgeLabel = "ESCALATED";
            } else if (event.resolved) {
              badgeClass = "bg-teal-900/30 border border-teal-400/40 text-teal-300";
              badgeLabel = "RESOLVED";
            } else if (event.severity === "CRITICAL") {
              badgeClass = "bg-yellow-900/30 border border-yellow-400/40 text-yellow-300 animate-pulse";
              badgeLabel = "ANALYZING";
            }
            const tsNum = typeof event.timestamp === "bigint" ? Number(event.timestamp) : Number(event.timestamp ?? 0);
            const timeStr = tsNum ? new Date(tsNum).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit"
            }) : "--:--";
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                "data-ocid": `feedback_log.item.${idx + 1}`,
                className: "backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-5",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1 flex-wrap", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `text-xs px-2 py-0.5 rounded-full font-mono ${badgeClass}`,
                          children: badgeLabel
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/50 font-mono uppercase", children: String(event.role ?? "system") }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/30 text-xs ml-auto", children: timeStr })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-sm leading-snug truncate", children: String(event.message).slice(0, 80) }),
                    event.resolved && !event.itEscalated && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-teal-400/70 text-xs italic mt-1", children: "Auto-resolved by EDDI" })
                  ] }),
                  !event.resolved && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": `feedback_log.resolve_button.${idx + 1}`,
                      onClick: () => resolveMutation.mutate(String(event.id)),
                      className: "text-xs text-teal-400 hover:text-teal-300 transition-colors shrink-0 mt-1",
                      children: "Resolve"
                    }
                  )
                ] })
              },
              String(event.id)
            );
          })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: exportModalOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            className: "fixed inset-0 z-50 flex items-center justify-center p-[var(--phi-21)]",
            style: { background: "rgba(0,0,0,0.6)" },
            onClick: () => setExportModalOpen(false),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { scale: 0.94, opacity: 0 },
                animate: { scale: 1, opacity: 1 },
                exit: { scale: 0.96, opacity: 0 },
                transition: { type: "spring", stiffness: 300, damping: 22 },
                className: "glass-portal-it rounded-3xl p-[var(--phi-34)] max-w-md w-full space-y-[var(--phi-21)]",
                "data-ocid": "it-audit.export_dialog",
                onClick: (e) => e.stopPropagation(),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-[var(--phi-13)]", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "w-10 h-10 rounded-xl flex items-center justify-center",
                          style: {
                            background: "oklch(0.72 0.17 155 / 0.15)",
                            border: "1px solid rgba(0,220,130,0.35)"
                          },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Download,
                            {
                              className: "w-5 h-5",
                              style: { color: "oklch(0.72 0.17 155)" }
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground", children: "Export Audit Log" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: "ABYSSUS-VALT destination" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": "it-audit.export_dialog.close_button",
                        "aria-label": "Close export modal",
                        onClick: () => setExportModalOpen(false),
                        className: "glass-sm rounded-xl p-[var(--phi-5)] hover:bg-[oklch(0.72_0.17_155/0.08)] transition-smooth",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 text-muted-foreground" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "glass-sm rounded-xl p-[var(--phi-21)] space-y-[var(--phi-8)]",
                      style: { borderColor: "rgba(0,220,130,0.2)" },
                      children: !exportDone ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          "data-ocid": "it-audit.export_dialog.loading_state",
                          className: "flex items-center gap-[var(--phi-13)]",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "w-3 h-3 rounded-full animate-pulse",
                                style: {
                                  background: "oklch(0.72 0.17 155)",
                                  boxShadow: "0 0 8px oklch(0.72 0.17 155 / 0.7)"
                                }
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-mono text-muted-foreground", children: "Routing to ABYSSUS-VALT…" })
                          ]
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          "data-ocid": "it-audit.export_dialog.success_state",
                          className: "space-y-[var(--phi-8)]",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-[var(--phi-8)]", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: "w-3 h-3 rounded-full",
                                  style: {
                                    background: "oklch(0.72 0.18 162)",
                                    boxShadow: "0 0 8px oklch(0.72 0.18 162 / 0.7)"
                                  }
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: "text-sm font-mono",
                                  style: { color: "oklch(0.72 0.18 162)" },
                                  children: "Export scheduled for Vault ABYSSUS-VALT"
                                }
                              )
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                              filtered.length,
                              " log entries sealed. Append-only. Retrievable via QRYX query engine."
                            ] })
                          ]
                        }
                      )
                    }
                  ),
                  exportDone && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "it-audit.export_dialog.confirm_button",
                      onClick: () => setExportModalOpen(false),
                      className: "w-full py-[var(--phi-13)] rounded-xl font-mono text-sm font-bold transition-smooth",
                      style: {
                        background: "oklch(0.72 0.17 155 / 0.14)",
                        border: "1px solid rgba(0,220,130,0.35)",
                        color: "oklch(0.72 0.17 155)"
                      },
                      children: "Done"
                    }
                  )
                ]
              }
            )
          }
        ) })
      ]
    }
  );
}
export {
  ITAuditLog as default
};
