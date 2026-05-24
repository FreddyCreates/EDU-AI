import { j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { i as createLucideIcon, S as Skeleton, Z as Zap, D as Database, z as MobileNav } from "./index-BivnQ6bB.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { u as useAdaptiveWorkflow } from "./use-adaptive-B-_9L1Vr.js";
import { u as usePassportStats } from "./use-passport-VGmcZtEk.js";
import { f as useRecognitionTimeline } from "./use-recognition-CcUiZsvr.js";
import { g as useLocation } from "./router-D6GUppNf.js";
import { B as Brain } from "./brain-BiTGGu73.js";
import { T as TrendingUp } from "./trending-up-CpgQ7qb4.js";
import { F as Flame } from "./flame-DBscWOFv.js";
import { W as Wind, S as Snowflake } from "./wind-BgciCYMn.js";
import { C as Clock } from "./clock-DmeOF2sv.js";
import "./query-8urnerR0.js";
import "./motion-BK2wxCtX.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode);
const ADX_LEVELS = [
  { fib: 2n, label: "Foundational", barColor: "bg-sky-500" },
  { fib: 3n, label: "Standard", barColor: "bg-emerald-500" },
  { fib: 5n, label: "Accelerated", barColor: "bg-yellow-500" },
  { fib: 8n, label: "Advanced", barColor: "bg-orange-500" },
  { fib: 13n, label: "Sovereign", barColor: "bg-violet-500" }
];
function fibLevelName(fib) {
  if (fib <= 2n) return "Foundational";
  if (fib <= 3n) return "Standard";
  if (fib <= 5n) return "Accelerated";
  if (fib <= 8n) return "Advanced";
  return "Sovereign";
}
function MemoryZoneCard({
  label,
  seeds,
  icon: Icon,
  glowClass,
  borderClass
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `rounded-2xl border ${borderClass} p-4 flex flex-col items-center gap-2 text-center`,
      style: { background: "rgba(0,0,0,0.3)", backdropFilter: "blur(12px)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-6 h-6 ${glowClass}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-2xl font-bold font-display ${glowClass}`, children: seeds }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "seeds" })
      ]
    }
  );
}
function TeacherStudentProgress() {
  const location = useLocation();
  const subjectId = "math";
  const gradeLevel = 9;
  const { workflow: adaptive, isLoading: adaptiveLoading } = useAdaptiveWorkflow(subjectId, String(gradeLevel));
  const { data: passportStats, isLoading: statsLoading } = usePassportStats();
  const { data: timeline = [], isLoading: timelineLoading } = useRecognitionTimeline(null);
  const workflow = adaptive;
  const currentFib = (workflow == null ? void 0 : workflow.fibDifficultyLevel) ?? 5n;
  const levelName = fibLevelName(currentFib);
  const confidence = workflow ? Math.round(workflow.phiConfidence * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen pb-24",
      style: {
        background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139,92,246,0.15) 0%, transparent 70%), #0a0614"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "sticky top-0 z-30 border-b border-violet-500/20",
            style: {
              background: "rgba(10,6,20,0.85)",
              backdropFilter: "blur(20px)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-5 py-4 flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-5 h-5 text-violet-400" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-violet-100 font-display", children: "Student Progress" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Adaptive Intelligence · Live Passport" })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-5 py-6 space-y-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "adaptive.section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-violet-400 uppercase tracking-widest mb-4", children: "Adaptive Workflow" }),
            adaptiveLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Skeleton,
              {
                className: "h-52 rounded-2xl",
                "data-ocid": "adaptive.loading_state"
              }
            ),
            !adaptiveLoading && workflow && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-2xl border border-violet-500/30 p-5 space-y-5",
                style: {
                  background: "rgba(139,92,246,0.08)",
                  backdropFilter: "blur(16px)"
                },
                "data-ocid": "adaptive.card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 text-violet-300" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-violet-400 uppercase tracking-widest mb-1", children: "Next Action" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-semibold text-violet-100", children: workflow.nextAction })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "rounded-xl border border-violet-500/20 px-4 py-3",
                      style: { background: "rgba(139,92,246,0.05)" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground italic leading-relaxed", children: [
                        "“",
                        workflow.reasonPhrase,
                        "”"
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1.5", children: "PHI Confidence" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-2 rounded-full bg-white/10 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet-600 to-violet-400 transition-all duration-700",
                          style: { width: `${confidence}%` }
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-violet-300 font-mono mt-1", children: [
                        confidence,
                        "%"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Difficulty" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-violet-500/20 text-violet-300 border-violet-500/30", children: levelName })
                    ] })
                  ] }),
                  workflow.suggestedTopics && workflow.suggestedTopics.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest mb-2", children: "Suggested Topics" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: workflow.suggestedTopics.map((topic) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        className: "bg-violet-500/10 text-violet-300 border-violet-500/20 text-xs",
                        children: topic
                      },
                      topic
                    )) })
                  ] })
                ]
              }
            ),
            !adaptiveLoading && !workflow && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-2xl border border-violet-500/20 p-6 text-center",
                "data-ocid": "adaptive.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-8 h-8 text-violet-500/50 mx-auto mb-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No workflow data yet" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "adx.section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-violet-400 uppercase tracking-widest mb-4", children: "ADX Difficulty Level" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "rounded-2xl border border-violet-500/20 p-5",
                style: { background: "rgba(139,92,246,0.05)" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-2", children: ADX_LEVELS.map((lvl) => {
                  const isActive = currentFib === lvl.fib;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      "data-ocid": `adx.level.${lvl.label.toLowerCase()}`,
                      className: "flex flex-col items-center gap-2",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: `w-full h-3 rounded-full transition-all duration-300 ${isActive ? lvl.barColor : "bg-white/10"}`
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: `text-[10px] text-center leading-tight transition-colors ${isActive ? "text-violet-200 font-semibold" : "text-muted-foreground"}`,
                            children: lvl.label
                          }
                        ),
                        isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-violet-500/20 text-violet-300 border-violet-500/30 text-[9px] px-1.5 py-0", children: "Active" })
                      ]
                    },
                    lvl.label
                  );
                }) })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "passport.section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-violet-400 uppercase tracking-widest mb-4", children: "Passport Memory Zones" }),
            statsLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
                "data-ocid": "passport.loading_state",
                children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-2xl" }, i))
              }
            ),
            !statsLoading && passportStats && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                MemoryZoneCard,
                {
                  label: "HOT",
                  seeds: Number(passportStats.hotSeeds),
                  icon: Flame,
                  glowClass: "text-pink-400",
                  borderClass: "border-pink-500/30"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                MemoryZoneCard,
                {
                  label: "WARM",
                  seeds: Number(passportStats.warmSeeds),
                  icon: Wind,
                  glowClass: "text-orange-400",
                  borderClass: "border-orange-500/30"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                MemoryZoneCard,
                {
                  label: "COLD",
                  seeds: Number(passportStats.coldSeeds),
                  icon: Database,
                  glowClass: "text-sky-400",
                  borderClass: "border-sky-500/30"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                MemoryZoneCard,
                {
                  label: "FROZEN",
                  seeds: Number(passportStats.frozenSeeds),
                  icon: Snowflake,
                  glowClass: "text-indigo-400",
                  borderClass: "border-indigo-500/30"
                }
              )
            ] }),
            !statsLoading && !passportStats && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-2xl border border-violet-500/20 p-6 text-center",
                "data-ocid": "passport.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-8 h-8 text-violet-500/50 mx-auto mb-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Passport not yet seeded" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "rcgn.section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-violet-400 uppercase tracking-widest mb-4", children: "Recognition Timeline" }),
            timelineLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "rcgn.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-2xl" }, i)) }),
            !timelineLoading && timeline.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-2xl border border-violet-500/20 p-6 text-center",
                "data-ocid": "rcgn.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-8 h-8 text-violet-500/50 mx-auto mb-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No recognition events yet" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              timeline.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-5 top-2 bottom-2 w-px bg-violet-500/20" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: timeline.map((event, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": `rcgn.item.${i + 1}`,
                  className: "relative flex items-start gap-4 pl-12",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-3.5 w-3 h-3 rounded-full bg-violet-500 border-2 border-violet-300 mt-1.5 flex-shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex-1 rounded-2xl border border-violet-500/20 p-4",
                        style: {
                          background: "rgba(139,92,246,0.06)",
                          backdropFilter: "blur(12px)"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 mb-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-violet-500/15 text-violet-300 border-violet-500/25 text-xs", children: event.achievementType ?? "Recognition" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground flex-shrink-0", children: event.sealedAt ? new Date(
                              Number(event.sealedAt / 1000000n)
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric"
                            }) : "—" })
                          ] }),
                          event.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 leading-relaxed", children: event.description })
                        ]
                      }
                    )
                  ]
                },
                String(event.sealedAt)
              )) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MobileNav,
          {
            portal: "teacher",
            isActive: (to) => location.pathname === to
          }
        )
      ]
    }
  );
}
export {
  TeacherStudentProgress as default
};
