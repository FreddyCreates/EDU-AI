import { j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { i as createLucideIcon, q as Crown, G as GraduationCap, U as Users, B as BookOpen, k as Shield, g as Activity, b as Star, a as Award, v as Network, Z as Zap, f as useActor, c as cn, h as createActor } from "./index-BivnQ6bB.js";
import { E as EddiOrb } from "./EddiOrb-BVFxfmXd.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { u as useAllSubjects } from "./use-curriculum-D8crsBID.js";
import { u as useSystemDiag } from "./use-diag-CPsjDtM1.js";
import { u as useEngines, E as EngineStatus } from "./use-engines-DqR-N7RV.js";
import { d as useEntanglementStats, a as useNrveState, u as usePlseState } from "./use-entanglements-B-bwtovY.js";
import { d as useGradeMetrics, e as useSystemMetrics, f as castSystemMetrics, g as castGradeCount } from "./use-grade-metrics-Bpk7MeAS.js";
import { a as usePrincipalHeatmapWithNoms, b as useAllRecognitionFlags } from "./use-principal-intelligence-C9oOVM5O.js";
import { a as useTchrStats } from "./use-tchr-C8OkG62o.js";
import { a as useQuery } from "./query-8urnerR0.js";
import { L as Link } from "./router-D6GUppNf.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { A as ArrowRight } from "./arrow-right-CsqnM8Ko.js";
import { T as TrendingUp } from "./trending-up-CpgQ7qb4.js";
import { C as ChevronRight } from "./chevron-right-neFioPkE.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 17h6v-6", key: "t6n2it" }],
  ["path", { d: "m22 17-8.5-8.5-5 5L2 7", key: "x473p" }]
];
const TrendingDown = createLucideIcon("trending-down", __iconNode);
const SUBJECT_FALLBACK = [
  "Mathematics",
  "Science",
  "English",
  "History",
  "Geography",
  "Art",
  "Music",
  "PE",
  "Computer Sci",
  "Biology",
  "Chemistry",
  "Physics"
];
const ARCH_ENGINES = [
  { id: "COGT", label: "Cognition", desc: "Master reasoning chain" },
  { id: "META", label: "Meta-Think", desc: "Monitors reasoning structure" },
  { id: "AUTN", label: "Autonomous", desc: "Self-fires every 21 cycles" }
];
const ENT_ENGINES = [
  { id: "NRVE", label: "Neural" },
  { id: "PLSE", label: "Pulse" },
  { id: "MSRY", label: "Mastery" },
  { id: "ECHO", label: "Echo" },
  { id: "FLUX", label: "Flux" }
];
const DEMO_TEACHERS = [
  { name: "Ms. Ramirez", classes: 4, mastery: 78, lastActive: "2h ago" },
  { name: "Mr. Okafor", classes: 3, mastery: 84, lastActive: "Just now" },
  { name: "Dr. Chen", classes: 5, mastery: 91, lastActive: "45m ago" },
  { name: "Ms. Patel", classes: 3, mastery: 72, lastActive: "3h ago" },
  { name: "Mr. Torres", classes: 4, mastery: 65, lastActive: "Yesterday" },
  { name: "Ms. Kim", classes: 2, mastery: 88, lastActive: "30m ago" }
];
function masteryClass(pct) {
  if (pct >= 80) return "bg-cyan-500/15 border-cyan-400/30 text-cyan-300";
  if (pct >= 60)
    return "bg-emerald-500/15 border-emerald-400/30 text-emerald-300";
  if (pct >= 30) return "bg-amber-500/15 border-amber-400/30 text-amber-300";
  return "bg-red-500/15 border-red-400/30 text-red-400";
}
function seedMastery(gradeIdx, subjectIdx) {
  const v = ((gradeIdx + 1) * 17 + subjectIdx * 31 + 7) % 97;
  return Math.max(12, v);
}
function KpiCard({
  label,
  value,
  icon: Icon,
  trend,
  sub,
  delay = 0
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.45, delay },
      className: "glass-portal-principal glass-shimmer rounded-xl p-5 flex flex-col gap-3",
      "data-ocid": `principal.kpi.${label.toLowerCase().replace(/\s+/g, "_")}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex h-9 w-9 items-center justify-center rounded-lg",
              style: {
                background: "rgba(255,185,0,0.12)",
                border: "1px solid rgba(255,185,0,0.25)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4", style: { color: "oklch(0.75 0.16 70)" } })
            }
          ),
          trend === "up" && /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-emerald-400" }),
          trend === "down" && /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "h-4 w-4 text-red-400" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-display text-3xl font-bold tracking-tight",
              style: { color: "oklch(0.75 0.16 70)" },
              children: value
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 font-body", children: label }),
          sub && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-mono text-[10px] mt-1",
              style: { color: "rgba(255,185,0,0.65)" },
              children: sub
            }
          )
        ] })
      ]
    }
  );
}
function KpiSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass rounded-xl p-5 space-y-3 animate-pulse",
      "data-ocid": "principal.kpi.loading_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-lg bg-amber-500/10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-20 rounded bg-amber-500/10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-28 rounded bg-muted/40" })
      ]
    }
  );
}
function GlassPanel({
  title,
  subtitle,
  children,
  className,
  ocid,
  delay = 0
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay },
      className: cn(
        "glass-portal-principal backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6",
        className
      ),
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-start justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                className: "font-display font-bold text-base tracking-wide",
                style: { color: "oklch(0.75 0.16 70)" },
                children: title
              }
            ),
            subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 font-body", children: subtitle })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-1 w-12 rounded-full mt-1.5",
              style: {
                background: "linear-gradient(90deg, oklch(0.75 0.16 70), transparent)"
              }
            }
          )
        ] }),
        children
      ]
    }
  );
}
function GradeCardsGrid({
  gradeData
}) {
  const dataMap = new Map(gradeData.map((g) => [g.grade, g]));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "grid gap-3",
      style: { gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))" },
      children: Array.from({ length: 12 }, (_, i) => i + 1).map((gradeNum, idx) => {
        const live = dataMap.get(gradeNum);
        const students = (live == null ? void 0 : live.studentCount) ?? 0;
        const mastery = (live == null ? void 0 : live.avgMastery) ? Math.round(live.avgMastery * 100) : seedMastery(gradeNum - 1, 5);
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.94 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.35, delay: idx * 0.04 },
            "data-ocid": `principal.grade_card.${gradeNum}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/principal/grade/$grade",
                params: { grade: String(gradeNum) },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "glass-sm rounded-xl p-4 flex flex-col gap-2 cursor-pointer transition-smooth hover:border-amber-500/40 group",
                    style: { minHeight: 110 },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "font-display font-bold text-xl",
                            style: { color: "oklch(0.75 0.16 70)" },
                            children: gradeNum
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            className: cn(
                              "inline-flex items-center rounded border px-1.5 py-0.5 font-mono text-[10px] font-semibold",
                              masteryClass(mastery)
                            ),
                            children: [
                              mastery,
                              "%"
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground font-mono", children: students > 0 ? `${students} students` : "No data" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex items-center gap-1 mt-auto text-[10px] font-mono opacity-60 group-hover:opacity-100 transition-smooth",
                          style: { color: "oklch(0.75 0.16 70)" },
                          children: [
                            "Drill Down",
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" })
                          ]
                        }
                      )
                    ]
                  }
                )
              }
            )
          },
          gradeNum
        );
      })
    }
  );
}
function GradeHeatmap({
  gradeData
}) {
  const WEEKS = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: `80px repeat(${WEEKS.length}, 1fr)`,
          gap: "4px",
          minWidth: 480
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-mono text-muted-foreground pb-2 flex items-end", children: "GRADE" }),
          WEEKS.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "text-[10px] font-mono text-muted-foreground pb-2 text-center",
              children: w
            },
            w
          )),
          Array.from({ length: 12 }, (_, i) => i + 1).map((gradeNum, gi) => {
            const live = gradeData.find((g) => g.grade === gradeNum);
            const baseMastery = (live == null ? void 0 : live.avgMastery) ? Math.round(live.avgMastery * 100) : seedMastery(gi, 4);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex items-center",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "font-mono text-xs font-bold",
                      style: { color: "oklch(0.75 0.16 70)" },
                      children: [
                        "Gr ",
                        gradeNum
                      ]
                    }
                  )
                },
                `grade-label-${gradeNum}`
              ),
              WEEKS.map((w, wi) => {
                const jitter = (gi * 7 + wi * 13) % 20 - 10;
                const pct = Math.max(5, Math.min(99, baseMastery + jitter));
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: cn(
                      "rounded-md border flex items-center justify-center font-mono text-[10px] font-semibold py-2 transition-smooth hover:scale-105 cursor-default",
                      masteryClass(pct)
                    ),
                    "data-ocid": `principal.heatmap.${gradeNum}_${wi + 1}`,
                    title: `Grade ${gradeNum} ${w}: ${pct}%`,
                    children: [
                      pct,
                      "%"
                    ]
                  },
                  `${gradeNum}-${w}`
                );
              })
            ] });
          })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground", children: "LEGEND:" }),
      [
        {
          label: ">80% Excellent",
          cls: "bg-cyan-500/15 border-cyan-400/30 text-cyan-300"
        },
        {
          label: "60–80% Good",
          cls: "bg-emerald-500/15 border-emerald-400/30 text-emerald-300"
        },
        {
          label: "30–60% Developing",
          cls: "bg-amber-500/15 border-amber-400/30 text-amber-300"
        },
        {
          label: "<30% Attention",
          cls: "bg-red-500/15 border-red-400/30 text-red-400"
        }
      ].map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: cn(
            "inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[10px] font-mono",
            l.cls
          ),
          children: l.label
        },
        l.label
      ))
    ] })
  ] });
}
function StaffPanel() {
  const sorted = [...DEMO_TEACHERS].sort((a, b) => b.mastery - a.mastery);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground", children: "SORTED BY MASTERY AVG" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "text-[10px] font-mono bg-amber-500/10 text-amber-300 border-amber-500/25", children: [
        sorted.length,
        " STAFF"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 space-y-2 overflow-y-auto pr-1", children: sorted.map((t, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass-sm rounded-lg p-3 flex items-center gap-3 transition-smooth hover:border-amber-500/30",
        style: {
          borderColor: idx === 0 ? "rgba(255,185,0,0.30)" : void 0
        },
        "data-ocid": `principal.staff_card.${idx + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-8 w-8 rounded-full flex-shrink-0 flex items-center justify-center font-display font-bold text-xs",
              style: {
                background: "rgba(255,185,0,0.12)",
                border: "1px solid rgba(255,185,0,0.25)",
                color: "oklch(0.75 0.16 70)"
              },
              children: t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-body font-semibold text-foreground truncate", children: t.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "font-mono text-xs font-bold ml-2 shrink-0",
                  style: {
                    color: t.mastery >= 80 ? "oklch(0.75 0.16 70)" : "oklch(0.60 0.10 70)"
                  },
                  children: [
                    t.mastery,
                    "%"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
                t.classes,
                " classes"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "·" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: t.lastActive })
            ] })
          ] })
        ]
      },
      t.name
    )) })
  ] });
}
function EngineBadge({
  engine,
  idx
}) {
  const isActive = engine.status === EngineStatus.active;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.92 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.35, delay: idx * 0.05 },
      className: "glass-sm rounded-xl p-3 flex flex-col gap-2 transition-smooth hover:border-amber-500/30 cursor-default",
      "data-ocid": `principal.engine_badge.${idx + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "font-mono font-bold text-xs",
              style: { color: "oklch(0.75 0.16 70)" },
              children: engine.codeName.slice(0, 8)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "inline-block h-2 w-2 rounded-full",
              style: {
                background: isActive ? "oklch(0.72 0.17 145)" : "oklch(0.50 0.05 260)",
                boxShadow: isActive ? "0 0 6px oklch(0.72 0.17 145 / 0.60)" : void 0,
                animation: isActive ? "status-pulse 2s ease-in-out infinite" : void 0
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground leading-tight line-clamp-2", children: engine.domain.split("—")[0].split("-")[0].trim() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            className: cn(
              "self-start text-[10px] font-mono px-1.5 py-0",
              isActive ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/25" : "bg-muted/40 text-muted-foreground border-border/50"
            ),
            children: isActive ? "ACTIVE" : "STANDBY"
          }
        )
      ]
    }
  );
}
function useVaultDisplay() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["vault-display"],
    queryFn: async () => {
      if (!actor) return null;
      const r = await actor.getVaultStats();
      return {
        totalSeeds: r.totalPayloads,
        totalCompressed: r.totalBytesBuffered
      };
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 3e4
  });
}
function LiveMetricsBar({
  totalStudents,
  activeSessions,
  avgMastery,
  topSubject,
  loading
}) {
  const metrics = [
    {
      label: "ACTIVE STUDENTS",
      value: totalStudents > 0 ? totalStudents.toLocaleString() : "—",
      icon: GraduationCap
    },
    {
      label: "LIVE SESSIONS",
      value: activeSessions > 0 ? activeSessions.toLocaleString() : "—",
      icon: Activity
    },
    {
      label: "AVG COHERENCE",
      value: avgMastery > 0 ? `${avgMastery}%` : "—",
      icon: Shield
    },
    { label: "TOP SUBJECT", value: topSubject || "—", icon: BookOpen }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: -6 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.38, delay: 0.05 },
      className: "grid grid-cols-2 md:grid-cols-4 gap-3 px-4 md:px-6 pt-4",
      "data-ocid": "principal.live_metrics_bar",
      children: metrics.map(({ label, value, icon: Icon }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": `principal.live_metric.${i + 1}`,
          className: "glass-max-principal rounded-xl px-4 py-3 flex items-center gap-3 relative overflow-hidden",
          style: {
            border: "1px solid rgba(255,185,0,0.20)",
            boxShadow: "0 0 18px rgba(255,185,0,0.07)",
            animation: "pulse-fib-21 3.37s ease-in-out infinite",
            animationDelay: `${i * 0.55}s`
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "pointer-events-none absolute inset-0",
                style: {
                  background: "linear-gradient(135deg,rgba(255,185,0,0.05) 0%,transparent 60%)"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                style: {
                  background: "rgba(255,185,0,0.12)",
                  border: "1px solid rgba(255,185,0,0.22)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Icon,
                  {
                    className: "h-3.5 w-3.5",
                    style: { color: "oklch(0.75 0.16 70)" }
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-16 rounded bg-amber-500/10 animate-pulse" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "font-display text-base font-bold leading-tight truncate",
                  style: { color: "oklch(0.75 0.16 70)" },
                  children: value
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[9px] text-muted-foreground/60 uppercase tracking-widest mt-0.5", children: label })
            ] })
          ]
        },
        label
      ))
    }
  );
}
function PrincipalDashboard() {
  const { data: diag, isLoading: diagLoading } = useSystemDiag();
  const { data: tchrStats, isLoading: statsLoading } = useTchrStats();
  const { engines, isLoading: enginesLoading } = useEngines();
  const { stats: entStats } = useEntanglementStats();
  const { nrveState } = useNrveState();
  const { plseState } = usePlseState();
  const { data: subjects = [], isLoading: subjLoading } = useAllSubjects();
  const { data: vaultData } = useVaultDisplay();
  const { data: rawGradeMetrics = [] } = useGradeMetrics();
  const { data: sysMetrics, isLoading: sysMetricsLoading } = useSystemMetrics();
  const { data: heatmapNoms = [] } = usePrincipalHeatmapWithNoms();
  const { data: rcgnFlags = [] } = useAllRecognitionFlags();
  subjects.length > 0 ? subjects.map((s) => s.name) : SUBJECT_FALLBACK;
  const topSubject = subjects.length > 0 ? subjects[0].name : "Mathematics";
  const metrics = sysMetrics ? castSystemMetrics(sysMetrics) : null;
  const gradeData = rawGradeMetrics.map(castGradeCount);
  const cohPct = diag ? Math.round(diag.avgCoh * 100) : 0;
  const systemHealth = diag ? Math.round(diag.pilScore * 100) : 0;
  const totalStudents = (metrics == null ? void 0 : metrics.totalStudents) ?? Number((tchrStats == null ? void 0 : tchrStats.totalStudents) ?? 0);
  const activeSessions = (metrics == null ? void 0 : metrics.activeSessions) ?? 0;
  const lessonsCompleted = (metrics == null ? void 0 : metrics.totalLessonsCompleted) ?? 0;
  const avgMastery = (metrics == null ? void 0 : metrics.avgPlatformMastery) ? Math.round(metrics.avgPlatformMastery * 100) : cohPct > 0 ? cohPct : 62;
  const kpiLoading = diagLoading || statsLoading || sysMetricsLoading;
  const pendingNoms = heatmapNoms.reduce(
    (s, h) => s + Number(h.pendingNoms),
    0
  );
  const recentAchievements = heatmapNoms.reduce(
    (s, h) => s + Number(h.recentAchievements),
    0
  );
  const pendingRcgn = rcgnFlags.filter((f) => !f.sealed);
  const topAchievements = rcgnFlags.filter((f) => f.sealed).sort((a, b) => Number(b.masteryScore) - Number(a.masteryScore)).slice(0, 5);
  const sssStates = [
    {
      label: "STRUGGLE",
      color: "oklch(0.65 0.22 22)",
      count: gradeData.filter((g) => g.avgMastery < 0.05).length
    },
    {
      label: "BUILDING",
      color: "oklch(0.75 0.16 70)",
      count: gradeData.filter(
        (g) => g.avgMastery >= 0.05 && g.avgMastery < 0.13
      ).length
    },
    {
      label: "GROWING",
      color: "oklch(0.78 0.22 200)",
      count: gradeData.filter(
        (g) => g.avgMastery >= 0.13 && g.avgMastery < 0.34
      ).length
    },
    {
      label: "MASTERY",
      color: "oklch(0.72 0.17 155)",
      count: gradeData.filter(
        (g) => g.avgMastery >= 0.34 && g.avgMastery < 0.89
      ).length
    },
    {
      label: "SOVEREIGN",
      color: "oklch(0.75 0.16 70)",
      count: gradeData.filter((g) => g.avgMastery >= 0.89).length
    }
  ];
  const narratives = [];
  if (pendingRcgn.length > 0) {
    narratives.push(
      `${pendingRcgn.length} student${pendingRcgn.length !== 1 ? "s" : ""} flagged for national recognition — nominations pending.`
    );
  }
  if (recentAchievements > 0) {
    narratives.push(
      `${recentAchievements} achievement${recentAchievements !== 1 ? "s" : ""} sealed this week across all grades.`
    );
  }
  if (avgMastery >= 80) {
    narratives.push(
      `School-wide mastery is strong at ${avgMastery}% — students are on track.`
    );
  } else if (avgMastery < 50) {
    narratives.push(
      `School-wide mastery at ${avgMastery}% — focused support recommended for struggling grades.`
    );
  } else {
    narratives.push(
      `School-wide mastery averaging ${avgMastery}% — steady progress across grade levels.`
    );
  }
  if (pendingNoms > 0) {
    narratives.push(
      `${pendingNoms} nomination${pendingNoms !== 1 ? "s" : ""} pending across all classes — review and submit.`
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "portal-enter min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: -12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        className: "glass-xl border-b px-6 py-5",
        style: { borderColor: "rgba(255,185,0,0.12)" },
        "data-ocid": "principal.header",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-8xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(EddiOrb, { mode: "SOVEREIGN", size: "sm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "glow-principal h-11 w-11 rounded-xl flex items-center justify-center shrink-0",
                style: {
                  background: "linear-gradient(135deg, rgba(255,185,0,0.20), rgba(255,185,0,0.06))",
                  border: "1px solid rgba(255,185,0,0.35)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Crown,
                  {
                    className: "h-5 w-5",
                    style: { color: "oklch(0.75 0.16 70)" }
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h1",
                  {
                    className: "font-display text-xl font-bold tracking-wide",
                    style: { color: "oklch(0.75 0.16 70)" },
                    children: "PRINCIPAL OS"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: "font-mono text-[10px]",
                    style: {
                      background: "rgba(255,185,0,0.12)",
                      color: "oklch(0.75 0.16 70)",
                      border: "1px solid rgba(255,185,0,0.25)"
                    },
                    children: "COMMAND CENTER"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Sovereign School Intelligence — Live View" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-6 text-right", children: [
            [
              {
                val: totalStudents > 0 ? totalStudents : "—",
                label: "STUDENTS"
              },
              {
                val: activeSessions > 0 ? activeSessions : "—",
                label: "SESSIONS"
              },
              { val: cohPct > 0 ? `${cohPct}%` : "—", label: "COHERENCE" }
            ].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
              i > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-8 w-px",
                  style: { background: "rgba(255,185,0,0.15)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-display font-bold text-lg",
                    style: { color: "oklch(0.75 0.16 70)" },
                    children: item.val
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-muted-foreground", children: item.label })
              ] })
            ] }, item.label)),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-8 w-px",
                style: { background: "rgba(255,185,0,0.15)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "h-2 w-2 rounded-full",
                  style: {
                    background: diag ? "oklch(0.72 0.17 145)" : "oklch(0.60 0.05 260)",
                    boxShadow: diag ? "0 0 6px oklch(0.72 0.17 145 / 0.70)" : void 0,
                    animation: diag ? "status-pulse 2s ease-in-out infinite" : void 0
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-[10px] font-mono",
                  style: {
                    color: diag ? "oklch(0.72 0.17 145)" : "oklch(0.55 0.05 260)"
                  },
                  children: (diag == null ? void 0 : diag.status) ?? "CONNECTING"
                }
              )
            ] })
          ] })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      LiveMetricsBar,
      {
        totalStudents,
        activeSessions,
        avgMastery,
        topSubject,
        loading: kpiLoading
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-8xl px-4 md:px-6 py-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-2 md:grid-cols-4 gap-4",
          "data-ocid": "principal.kpi_row",
          children: kpiLoading ? [1, 2, 3, 4].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(KpiSkeleton, {}, k)) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              KpiCard,
              {
                label: "Total Students",
                value: totalStudents > 0 ? totalStudents.toLocaleString() : "—",
                icon: GraduationCap,
                trend: "up",
                sub: "Actively enrolled",
                delay: 0
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              KpiCard,
              {
                label: "Active Sessions",
                value: activeSessions > 0 ? activeSessions.toLocaleString() : "—",
                icon: Users,
                trend: "up",
                sub: "Live right now",
                delay: 0.08
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              KpiCard,
              {
                label: "Lessons Completed",
                value: lessonsCompleted > 0 ? lessonsCompleted.toLocaleString() : "—",
                icon: BookOpen,
                trend: "up",
                sub: "All time",
                delay: 0.16
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              KpiCard,
              {
                label: "Avg Mastery",
                value: `${avgMastery}%`,
                icon: Shield,
                trend: avgMastery > 60 ? "up" : "down",
                sub: "Platform-wide avg",
                delay: 0.24
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        GlassPanel,
        {
          title: "SCHOOL INTELLIGENCE SUMMARY",
          subtitle: "PRCP narrative — plain-language school intelligence generated by COGT+META+AUTN",
          ocid: "principal.intelligence_summary",
          delay: 0.04,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-muted-foreground mb-3 uppercase tracking-wider", children: "SCHOOL-WIDE SSS STATE DISTRIBUTION" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: sssStates.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "glass-sm rounded-xl px-3 py-2 flex items-center gap-2",
                  "data-ocid": `principal.sss_state.${s.label.toLowerCase()}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "h-2 w-2 rounded-full",
                        style: { background: s.color }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "font-mono text-xs",
                        style: { color: s.color },
                        children: s.label
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "font-display font-bold text-sm",
                        style: { color: s.color },
                        children: s.count
                      }
                    )
                  ]
                },
                s.label
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: narratives.map((n, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-start gap-3 rounded-xl px-4 py-3",
                style: {
                  background: "rgba(255,185,0,0.04)",
                  border: "1px solid rgba(255,185,0,0.10)"
                },
                "data-ocid": `principal.narrative.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Activity,
                    {
                      className: "h-3.5 w-3.5 mt-0.5 shrink-0",
                      style: { color: "oklch(0.75 0.16 70)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 leading-relaxed", children: n })
                ]
              },
              n.slice ? n.slice(0, 30) : `narrative-${i}`
            )) }),
            topAchievements.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-muted-foreground mb-3 uppercase tracking-wider", children: "TOP ACHIEVEMENTS THIS WEEK" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: topAchievements.map((flag, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": `principal.achievement.${i + 1}`,
                  className: "glass-sm rounded-xl px-4 py-3 flex items-center justify-between gap-3",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Star,
                        {
                          className: "h-4 w-4 shrink-0",
                          style: { color: "oklch(0.75 0.16 70)" }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-foreground truncate", children: [
                          flag.subject,
                          " · ",
                          flag.pattern
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[9px] font-mono text-muted-foreground", children: [
                          Number(flag.masteryScore),
                          "% mastery"
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        className: "text-[9px] font-mono shrink-0",
                        style: {
                          background: "rgba(255,185,0,0.12)",
                          color: "oklch(0.75 0.16 70)",
                          border: "1px solid rgba(255,185,0,0.22)"
                        },
                        children: "SEALED"
                      }
                    )
                  ]
                },
                flag.id
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between rounded-xl px-4 py-3",
                style: {
                  background: "rgba(255,185,0,0.06)",
                  border: "1px solid rgba(255,185,0,0.15)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Award,
                      {
                        className: "h-4 w-4",
                        style: { color: "oklch(0.75 0.16 70)" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "Sovereign Vision Document" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "— Generated by COGT+META+AUTN" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/vision", "data-ocid": "principal.vision_link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      className: "glass-sm rounded-lg px-3 py-1.5 font-mono text-[10px] font-bold hover:border-amber-500/40 transition-smooth flex items-center gap-1.5",
                      style: { color: "oklch(0.75 0.16 70)" },
                      children: [
                        "VIEW VISION",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
                      ]
                    }
                  ) })
                ]
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        GlassPanel,
        {
          title: "GRADE OVERVIEW",
          subtitle: "Grades 1–12 — click any card to drill down into grade-level data",
          ocid: "principal.grade_overview_section",
          delay: 0.05,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(GradeCardsGrid, { gradeData })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        GlassPanel,
        {
          title: "MASTERY HEATMAP — 8-WEEK VIEW",
          subtitle: "Grade × Week mastery grid — Fibonacci-compounded scores",
          ocid: "principal.heatmap_section",
          delay: 0.1,
          children: [
            subjLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "space-y-2 animate-pulse",
                "data-ocid": "principal.heatmap.loading_state",
                children: [1, 2, 3, 4, 5].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7 rounded-lg bg-amber-500/5" }, k))
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(GradeHeatmap, { gradeData }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/principal/heatmap",
                "data-ocid": "principal.heatmap_fullview_link",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    className: "glass-sm rounded-lg px-3 py-1.5 font-mono text-[10px] font-bold hover:border-amber-500/40 transition-smooth flex items-center gap-1.5 mt-3",
                    style: { color: "oklch(0.75 0.16 70)" },
                    children: [
                      "FULL KNOWLEDGE MAP (12×13)",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
                    ]
                  }
                )
              }
            ) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        GlassPanel,
        {
          title: "STAFF PERFORMANCE",
          subtitle: "Teachers ranked by class mastery average",
          ocid: "principal.staff_panel",
          className: "min-h-[320px]",
          delay: 0.2,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(StaffPanel, {})
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        GlassPanel,
        {
          title: "SYSTEM INTELLIGENCE STATUS",
          subtitle: "Architecture Council · Entanglement Network · Vault Statistics",
          ocid: "principal.intelligence_status_section",
          delay: 0.25,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] font-mono text-muted-foreground mb-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Activity,
                  {
                    className: "h-3 w-3",
                    style: { color: "oklch(0.75 0.16 70)" }
                  }
                ),
                "ARCHITECTURE COUNCIL"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: ARCH_ENGINES.map((eng, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "glass-sm rounded-xl p-4 text-center transition-smooth hover:border-amber-500/30",
                  "data-ocid": `principal.arch_engine.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "mx-auto mb-2 h-8 w-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs",
                        style: {
                          background: "rgba(255,185,0,0.10)",
                          border: "1px solid rgba(255,185,0,0.22)",
                          color: "oklch(0.75 0.16 70)"
                        },
                        children: eng.id
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground/90", children: eng.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: eng.desc }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center justify-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "h-1.5 w-1.5 rounded-full",
                          style: {
                            background: "oklch(0.72 0.17 145)",
                            boxShadow: "0 0 5px oklch(0.72 0.17 145 / 0.70)",
                            animation: "status-pulse 2s ease-in-out infinite",
                            animationDelay: `${i * 0.4}s`
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-emerald-300", children: "ONLINE" })
                    ] })
                  ]
                },
                eng.id
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] font-mono text-muted-foreground mb-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Network,
                  {
                    className: "h-3 w-3",
                    style: { color: "oklch(0.75 0.16 70)" }
                  }
                ),
                "ENTANGLEMENT NETWORK — ",
                Number((entStats == null ? void 0 : entStats.activeCount) ?? 0),
                " ",
                "ACTIVE"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3", children: ENT_ENGINES.map((eng, i) => {
                let liveValue = "—";
                if (eng.id === "NRVE")
                  liveValue = String(Number((nrveState == null ? void 0 : nrveState.coherenceScore) ?? 0));
                else if (eng.id === "PLSE")
                  liveValue = String(Number((plseState == null ? void 0 : plseState.heartbeatCycle) ?? 0));
                else if (eng.id === "MSRY")
                  liveValue = String(
                    Number((entStats == null ? void 0 : entStats.avgCoherenceDelta) ?? 0)
                  );
                else if (eng.id === "ECHO")
                  liveValue = String(Number((entStats == null ? void 0 : entStats.totalTransits) ?? 0));
                else if (eng.id === "FLUX")
                  liveValue = String(Number((entStats == null ? void 0 : entStats.activeCount) ?? 0));
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "glass-sm rounded-xl p-4 flex-1 min-w-[130px] transition-smooth hover:border-amber-500/30",
                    "data-ocid": `principal.entanglement.${eng.id.toLowerCase()}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "font-mono font-bold text-sm",
                            style: { color: "oklch(0.75 0.16 70)" },
                            children: eng.id
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "h-1.5 w-1.5 rounded-full",
                            style: {
                              background: "oklch(0.72 0.17 145)",
                              boxShadow: "0 0 5px oklch(0.72 0.17 145 / 0.60)",
                              animation: "status-pulse 1.5s ease-in-out infinite",
                              animationDelay: `${i * 0.3}s`
                            }
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-display font-bold text-foreground", children: liveValue }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: eng.label })
                    ]
                  },
                  eng.id
                );
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "glass-sm rounded-xl p-4",
                  "data-ocid": "principal.diag_score",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1", children: "DIAG Score" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-2xl font-display font-bold",
                        style: { color: "oklch(0.75 0.16 70)" },
                        children: systemHealth > 0 ? systemHealth : "—"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "PIL health score" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "glass-sm rounded-xl p-4",
                  "data-ocid": "principal.heartbeat_count",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1", children: "Heartbeats" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-2xl font-display font-bold",
                        style: { color: "oklch(0.75 0.16 70)" },
                        children: diag ? String(Number(diag.heartbeatCount)) : "—"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "AUTN cycles fired" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "glass-sm rounded-xl p-4",
                  "data-ocid": "principal.vault_seeds",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1", children: "Vault Seeds" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-2xl font-display font-bold",
                        style: { color: "oklch(0.75 0.16 70)" },
                        children: vaultData ? String(Number(vaultData.totalSeeds)) : "—"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "ABYSSUS-VAULT total" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "glass-sm rounded-xl p-4",
                  "data-ocid": "principal.phi_ratio",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1", children: "φ Ratio" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-2xl font-display font-bold",
                        style: { color: "oklch(0.75 0.16 70)" },
                        children: Number((nrveState == null ? void 0 : nrveState.phiRatio) ?? 0) > 0 ? Number((nrveState == null ? void 0 : nrveState.phiRatio) ?? 0) : "1.618"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "NRVE φ-alignment" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] font-mono text-muted-foreground mb-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Zap,
                  {
                    className: "h-3 w-3",
                    style: { color: "oklch(0.75 0.16 70)" }
                  }
                ),
                "SOVEREIGN ENGINES —",
                " ",
                engines.filter((e) => e.status === EngineStatus.active).length,
                " ",
                "ACTIVE"
              ] }),
              enginesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 animate-pulse",
                  "data-ocid": "principal.engines.loading_state",
                  children: [1, 2, 3, 4, 5].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-sm h-24 rounded-xl" }, k))
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3", children: engines.map((engine, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                EngineBadge,
                {
                  engine,
                  idx
                },
                engine.id.toString()
              )) })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "principal.research_policy_section",
          className: "mt-8 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-9 w-9 rounded-xl flex items-center justify-center",
                  style: {
                    background: "rgba(255,185,0,0.12)",
                    border: "1px solid rgba(255,185,0,0.30)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "📄" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base text-foreground", children: "Research & Policy" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Sovereign research papers — COGT+META+AUTN" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 border border-white/10 rounded-xl p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs font-semibold mb-1",
                  style: { color: "oklch(0.85 0.18 85)" },
                  children: "The Diego Protocol"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-3", children: "Sovereign intelligence-driven preparation for non-traditional academic competition in under-resourced schools. Fibonacci backward milestones, elastic schedule adaptation, and permanent achievement vault." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  "data-ocid": "principal.research_policy_link",
                  to: "/vision",
                  className: "inline-flex items-center gap-1.5 text-xs font-semibold",
                  style: { color: "oklch(0.85 0.18 85)" },
                  children: "View Full Paper →"
                }
              )
            ] })
          ]
        }
      )
    ] })
  ] });
}
export {
  PrincipalDashboard as default
};
