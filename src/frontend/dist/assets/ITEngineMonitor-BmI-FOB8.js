import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { E as EddiOrb } from "./EddiOrb-BVFxfmXd.js";
import { u as useEngines } from "./use-engines-DqR-N7RV.js";
import { g as Activity, C as Cpu, Z as Zap } from "./index-BivnQ6bB.js";
import { C as CircleCheckBig } from "./circle-check-big-DngI0fNm.js";
import { T as TriangleAlert } from "./triangle-alert-DEqO8oET.js";
import { C as CircleX } from "./circle-x-BLumP_Id.js";
import { C as Clock } from "./clock-DmeOF2sv.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import "./query-8urnerR0.js";
import "./router-D6GUppNf.js";
const GREEN = "oklch(0.72 0.17 155)";
const GREEN_BG = "rgba(0,220,130,0.10)";
const GREEN_GLOW = "0 0 18px rgba(0,220,130,0.25)";
const SUBSTRATE_LABELS = {
  ICPM: "ICP/Motoko",
  JLIA: "Julia Runtime",
  EART: "EduAI Autonomous",
  EMRT: "EduAI Memory"
};
const SUBSTRATE_COLORS = {
  ICPM: "oklch(0.72 0.17 155)",
  JLIA: "oklch(0.75 0.16 280)",
  EART: "oklch(0.73 0.14 190)",
  EMRT: "oklch(0.76 0.16 70)"
};
const ENGINE_SUBSTRATE_MAP = {
  COGT: "ICPM",
  GATE: "ICPM",
  MEDI: "ICPM",
  SONR: "ICPM",
  DIAG: "ICPM",
  ARCH: "ICPM",
  NOVA: "ICPM",
  PHIX: "JLIA",
  FIBR: "JLIA",
  VEKT: "JLIA",
  COHS: "JLIA",
  FLOR: "JLIA",
  SPRL: "JLIA",
  GXWT: "JLIA",
  AUTN: "EART",
  GENX: "EART",
  META: "EART",
  PHTM: "EART",
  CURO: "EART",
  COHR: "EART",
  PASS: "EMRT",
  SEED: "EMRT",
  VALT: "EMRT",
  ALOC: "EMRT",
  // RCGN/NOMS/ACHV/DIGT/GVLT/TCHR — education domain engines on ICPM
  RCGN: "ICPM",
  NOMS: "ICPM",
  ACHV: "ICPM",
  DIGT: "ICPM",
  GVLT: "ICPM",
  TCHR: "ICPM"
};
const STATIC_RUNTIME_ENGINES = [
  // ICPM
  {
    id: "COGT",
    name: "Cognition Engine",
    substrate: "ICPM",
    coh: 144,
    sessions: 8924
  },
  {
    id: "GATE",
    name: "Gate Engine",
    substrate: "ICPM",
    coh: 89,
    sessions: 21043
  },
  {
    id: "MEDI",
    name: "Mediation Engine",
    substrate: "ICPM",
    coh: 55,
    sessions: 5432
  },
  {
    id: "SONR",
    name: "Sonar Engine",
    substrate: "ICPM",
    coh: 89,
    sessions: 34210
  },
  {
    id: "DIAG",
    name: "Diagnostic Engine",
    substrate: "ICPM",
    coh: 144,
    sessions: 2891
  },
  {
    id: "ARCH",
    name: "Archive Engine",
    substrate: "ICPM",
    coh: 89,
    sessions: 7654
  },
  {
    id: "RCGN",
    name: "Recognition Engine",
    substrate: "ICPM",
    coh: 89,
    sessions: 3210
  },
  {
    id: "NOMS",
    name: "Nomination Pipeline",
    substrate: "ICPM",
    coh: 55,
    sessions: 1820
  },
  {
    id: "ACHV",
    name: "Achievement Vault",
    substrate: "ICPM",
    coh: 144,
    sessions: 980
  },
  {
    id: "DIGT",
    name: "Textbook Digester",
    substrate: "ICPM",
    coh: 89,
    sessions: 432
  },
  {
    id: "GVLT",
    name: "Grade Vault",
    substrate: "ICPM",
    coh: 144,
    sessions: 2103
  },
  {
    id: "TCHR",
    name: "Teacher Intelligence",
    substrate: "ICPM",
    coh: 89,
    sessions: 5841
  },
  // JLIA
  {
    id: "PHIX",
    name: "PHI Computation",
    substrate: "JLIA",
    coh: 55,
    sessions: 18920
  },
  {
    id: "FIBR",
    name: "Fibonacci Runtime",
    substrate: "JLIA",
    coh: 144,
    sessions: 23104
  },
  {
    id: "VEKT",
    name: "Vector Engine",
    substrate: "JLIA",
    coh: 89,
    sessions: 11280
  },
  {
    id: "COHS",
    name: "Coherence Scoring",
    substrate: "JLIA",
    coh: 144,
    sessions: 9870
  },
  {
    id: "FLOR",
    name: "Floor Engine",
    substrate: "JLIA",
    coh: 55,
    sessions: 34560
  },
  {
    id: "SPRL",
    name: "Spiral Engine",
    substrate: "JLIA",
    coh: 89,
    sessions: 4320
  },
  // EART
  {
    id: "AUTN",
    name: "Autonomous Think",
    substrate: "EART",
    coh: 144,
    sessions: 3892
  },
  {
    id: "GENX",
    name: "Self-Configure",
    substrate: "EART",
    coh: 55,
    sessions: 1204
  },
  {
    id: "META",
    name: "Meta-Think Engine",
    substrate: "EART",
    coh: 89,
    sessions: 2801
  },
  {
    id: "PHTM",
    name: "Phantom Engine",
    substrate: "EART",
    coh: 89,
    sessions: 7654
  },
  {
    id: "CURO",
    name: "Curiosity Engine",
    substrate: "EART",
    coh: 144,
    sessions: 15302
  },
  {
    id: "COHR",
    name: "Coherence Engine",
    substrate: "EART",
    coh: 55,
    sessions: 8941
  },
  // EMRT
  {
    id: "PASS",
    name: "Passport Engine",
    substrate: "EMRT",
    coh: 144,
    sessions: 42310
  },
  {
    id: "SEED",
    name: "Seed Engine",
    substrate: "EMRT",
    coh: 55,
    sessions: 9832
  },
  {
    id: "VALT",
    name: "Vault Engine",
    substrate: "EMRT",
    coh: 144,
    sessions: 3201
  },
  {
    id: "ALOC",
    name: "Allocator Engine",
    substrate: "EMRT",
    coh: 89,
    sessions: 18043
  }
];
const SUBSTRATES = ["ICPM", "JLIA", "EART", "EMRT"];
function getCohStatus(coh) {
  if (coh >= 89) return "healthy";
  if (coh >= 55) return "degraded";
  return "failed";
}
function EngineCard({ engine, index }) {
  const status = getCohStatus(engine.coh);
  const substColor = SUBSTRATE_COLORS[engine.substrate];
  const borderColor = status === "healthy" ? "rgba(16,185,129,0.40)" : status === "degraded" ? "rgba(234,179,8,0.40)" : "rgba(239,68,68,0.40)";
  const shadowColor = status === "healthy" ? "0 0 14px rgba(16,185,129,0.20)" : status === "degraded" ? "0 0 14px rgba(234,179,8,0.20)" : "0 0 14px rgba(239,68,68,0.20)";
  const cohColor = status === "healthy" ? "oklch(0.72 0.18 155)" : status === "degraded" ? "oklch(0.78 0.18 85)" : "oklch(0.65 0.22 22)";
  const StatusIcon = status === "healthy" ? CircleCheckBig : status === "degraded" ? TriangleAlert : CircleX;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.96 },
      animate: { opacity: 1, scale: 1 },
      transition: { delay: index * 0.04, duration: 0.35 },
      "data-ocid": `engine_monitor.engine.${index + 1}`,
      className: "glass-portal-it backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-2",
      style: { border: `1px solid ${borderColor}`, boxShadow: shadowColor },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "font-mono text-2xl font-bold tracking-tight leading-none",
              style: { color: "oklch(0.72 0.17 155)" },
              children: engine.id
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-[9px] font-mono font-bold px-2 py-0.5 rounded-full shrink-0",
              style: {
                background: `${substColor}18`,
                color: substColor,
                border: `1px solid ${substColor}35`
              },
              children: engine.substrate
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground leading-tight", children: engine.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between mt-auto pt-2 border-t",
            style: { borderColor: "rgba(255,255,255,0.06)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground/60 uppercase tracking-wider block", children: "COH" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-mono text-lg font-bold animate-metric-breathe",
                    style: { color: cohColor },
                    children: engine.coh
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground/60 uppercase tracking-wider block", children: "Sessions" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm font-semibold text-foreground", children: engine.sessions.toLocaleString() })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(StatusIcon, { className: "h-3.5 w-3.5", style: { color: cohColor } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono text-muted-foreground/70", children: "just now" })
              ] })
            ]
          }
        )
      ]
    }
  );
}
function SubstrateSection({
  substrate,
  engines,
  sectionIndex
}) {
  const color = SUBSTRATE_COLORS[substrate];
  const label = SUBSTRATE_LABELS[substrate];
  const healthy = engines.filter(
    (e) => getCohStatus(e.coh) === "healthy"
  ).length;
  const degraded = engines.filter(
    (e) => getCohStatus(e.coh) === "degraded"
  ).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: sectionIndex * 0.1, duration: 0.4 },
      "data-ocid": `engine_monitor.substrate.${sectionIndex + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-lg rounded-2xl overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-3 px-5 pt-4 pb-3 border-b",
            style: { borderColor: `${color}18` },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-8 w-8 rounded-lg flex items-center justify-center shrink-0",
                  style: {
                    background: `${color}15`,
                    boxShadow: `0 0 12px ${color}25`
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "h-4 w-4", style: { color } })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm font-bold", style: { color }, children: substrate }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: label })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "text-[9px] font-mono",
                      style: { color: "oklch(0.72 0.18 155)" },
                      children: [
                        healthy,
                        " healthy"
                      ]
                    }
                  ),
                  degraded > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "text-[9px] font-mono",
                      style: { color: "oklch(0.78 0.18 85)" },
                      children: [
                        degraded,
                        " degraded"
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-2 w-2 rounded-full animate-[status-pulse_2s_ease-in-out_infinite]",
                  style: { background: color }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: engines.map((engine, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          EngineCard,
          {
            engine,
            index: sectionIndex * 6 + i
          },
          engine.id
        )) }) })
      ] })
    }
  );
}
function ITEngineMonitor() {
  const [lastUpdated, setLastUpdated] = reactExports.useState(/* @__PURE__ */ new Date());
  const [tick, setTick] = reactExports.useState(0);
  const { engines: sovereignEngines, isLoading } = useEngines();
  reactExports.useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(/* @__PURE__ */ new Date());
      setTick((t) => t + 1);
    }, 21e3);
    return () => clearInterval(interval);
  }, []);
  const liveEngineMap = new Map(
    (sovereignEngines ?? []).map((e) => [e.codeName, e])
  );
  const ENGINES = STATIC_RUNTIME_ENGINES.map((eng) => {
    const live = liveEngineMap.get(eng.id);
    if (live) {
      const statusStr = "active" in live.status ? "active" : "degraded" in live.status ? "degraded" : "failed";
      const statusCoh = statusStr === "active" ? 89 : statusStr === "degraded" ? 55 : 21;
      return {
        ...eng,
        name: live.fullName.length > 0 ? live.fullName : eng.name,
        coh: statusCoh,
        substrate: ENGINE_SUBSTRATE_MAP[eng.id] ?? eng.substrate
      };
    }
    return eng;
  });
  const totalHealthy = ENGINES.filter(
    (e) => getCohStatus(e.coh) === "healthy"
  ).length;
  const totalDegraded = ENGINES.filter(
    (e) => getCohStatus(e.coh) === "degraded"
  ).length;
  const totalFailed = ENGINES.filter(
    (e) => getCohStatus(e.coh) === "failed"
  ).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "portal-enter min-h-screen", "data-ocid": "engine_monitor.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "glass-xl glass-shimmer sticky top-0 z-30 border-b",
        style: { borderColor: "rgba(0,220,130,0.12)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[1600px] mx-auto px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex h-10 w-10 items-center justify-center rounded-xl",
                style: { background: GREEN_BG, boxShadow: GREEN_GLOW },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-5 w-5", style: { color: GREEN } })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(EddiOrb, { mode: "SOVEREIGN", size: "sm" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h1",
                  {
                    className: "font-display text-lg font-bold leading-tight",
                    style: {
                      color: GREEN,
                      textShadow: "0 0 20px rgba(0,220,130,0.35)"
                    },
                    children: "ENGINE MONITOR"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground font-mono", children: [
                  "4 substrates · ",
                  ENGINES.length,
                  " engines · PHI-scored · LEX_SOVEREIGNUS"
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": "engine_monitor.healthy_count",
                className: "flex items-center gap-1.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CircleCheckBig,
                    {
                      className: "h-3.5 w-3.5",
                      style: { color: "oklch(0.72 0.18 155)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-mono text-sm font-bold",
                      style: { color: "oklch(0.72 0.18 155)" },
                      children: totalHealthy
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground", children: "healthy" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": "engine_monitor.degraded_count",
                className: "flex items-center gap-1.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TriangleAlert,
                    {
                      className: "h-3.5 w-3.5",
                      style: { color: "oklch(0.78 0.18 85)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-mono text-sm font-bold",
                      style: { color: "oklch(0.78 0.18 85)" },
                      children: totalDegraded
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground", children: "degraded" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": "engine_monitor.failed_count",
                className: "flex items-center gap-1.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CircleX,
                    {
                      className: "h-3.5 w-3.5",
                      style: { color: "oklch(0.65 0.22 22)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-mono text-sm font-bold",
                      style: { color: "oklch(0.65 0.22 22)" },
                      children: totalFailed
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground", children: "failed" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "engine_monitor.refresh_indicator",
              className: "flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground", children: lastUpdated.toLocaleTimeString("en-US", { hour12: false }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "h-1.5 w-1.5 rounded-full animate-[status-pulse_2s_ease-in-out_infinite]",
                    style: { background: GREEN }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px]", style: { color: GREEN }, children: "F(8)=21s" }),
                isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] text-muted-foreground animate-pulse", children: "syncing" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: tick })
              ]
            }
          )
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1600px] mx-auto px-6 py-6 space-y-[var(--phi-21)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4 },
          className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
          "data-ocid": "engine_monitor.stats_row",
          children: [
            {
              label: "Total Engines",
              value: ENGINES.length,
              icon: Cpu,
              color: GREEN
            },
            {
              label: "Healthy",
              value: totalHealthy,
              icon: CircleCheckBig,
              color: "oklch(0.72 0.18 155)"
            },
            {
              label: "Degraded",
              value: totalDegraded,
              icon: TriangleAlert,
              color: "oklch(0.78 0.18 85)"
            },
            {
              label: "Active Substrates",
              value: SUBSTRATES.length,
              icon: Zap,
              color: "oklch(0.75 0.16 280)"
            }
          ].map(({ label, value, icon: Icon, color }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 6 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: i * 0.07 },
              "data-ocid": `engine_monitor.stat.${i + 1}`,
              className: "glass-portal-it backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl px-5 py-4",
              style: { boxShadow: `0 0 14px ${color}20` },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground uppercase tracking-wider", children: label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5", style: { color } })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-bold", style: { color }, children: value })
              ]
            },
            label
          ))
        }
      ),
      SUBSTRATES.map((substrate, si) => {
        const engines = ENGINES.filter((e) => e.substrate === substrate);
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          SubstrateSection,
          {
            substrate,
            engines,
            sectionIndex: si
          },
          substrate
        );
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "glass-portal-it backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl px-6 py-4 flex flex-wrap items-center justify-between gap-3",
          "data-ocid": "engine_monitor.law_banner",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-4 w-4 shrink-0", style: { color: GREEN } }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: GREEN }, className: "font-bold", children: "LEX_SPECULA" }),
                " — ",
                "META monitors all engines. META monitors itself."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] text-muted-foreground/50", children: "COH scores via FLOR · Fibonacci floor active · All substrates sovereign" })
          ]
        }
      )
    ] })
  ] });
}
export {
  ITEngineMonitor as default
};
