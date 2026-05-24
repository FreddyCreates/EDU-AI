import { j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { e as useEntanglements, d as useEntanglementStats, a as useNrveState, u as usePlseState } from "./use-entanglements-B-bwtovY.js";
import { g as Activity, c as cn } from "./index-BivnQ6bB.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import "./query-8urnerR0.js";
import "./router-D6GUppNf.js";
function NrveDetail() {
  const { nrveState } = useNrveState();
  if (!nrveState) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 pt-2 border-t border-border/50 grid grid-cols-2 gap-x-3 gap-y-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "Phase" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-foreground truncate", children: nrveState.cogtPhase }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "Engine" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-foreground truncate", children: nrveState.activeEngine }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "COH" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-emerald-400", children: nrveState.coherenceScore.toString() }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "PHI" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-primary", children: nrveState.phiRatio.toString() })
  ] });
}
function PlseDetail() {
  const { plseState } = usePlseState();
  if (!plseState) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 pt-2 border-t border-border/50 grid grid-cols-2 gap-x-3 gap-y-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "Heartbeat" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-foreground", children: plseState.heartbeatCycle.toString() }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "PHI interval" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-primary", children: plseState.phiHeartbeatInterval.toString() }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "Queue depth" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-foreground", children: plseState.curiosityQueue.length }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "Last seed" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-foreground truncate", children: plseState.lastAutonSeed.concept })
  ] });
}
const NODE_META = {
  NRVE: {
    role: "Neural Relay",
    color: "oklch(0.72 0.20 200)",
    glow: "rgba(0,210,255,0.25)"
  },
  PLSE: {
    role: "Pulse Carrier",
    color: "oklch(0.68 0.18 280)",
    glow: "rgba(160,100,255,0.25)"
  },
  MSRY: {
    role: "Memory Sync",
    color: "oklch(0.76 0.18 84)",
    glow: "rgba(255,185,0,0.20)"
  },
  ECHO: {
    role: "Echo Chamber",
    color: "oklch(0.72 0.17 155)",
    glow: "rgba(0,220,130,0.20)"
  },
  FLUX: {
    role: "Flux Bridge",
    color: "oklch(0.63 0.15 340)",
    glow: "rgba(255,100,150,0.20)"
  }
};
function EntanglementMonitor() {
  const { entanglements, isLoading } = useEntanglements();
  const { stats } = useEntanglementStats();
  const intelligenceNodes = ["NRVE", "PLSE", "MSRY", "ECHO", "FLUX"];
  const allNodes = entanglements.filter(
    (e) => intelligenceNodes.includes(e.id)
  );
  const formatTimestamp = (ts) => {
    if (ts === 0n) return "—";
    const ms = Number(ts / 1000000n);
    if (ms === 0) return "—";
    return new Date(ms).toLocaleTimeString();
  };
  const totalTransits = stats ? Number(stats.totalTransits) : 0;
  const avgCohDelta = stats ? Number(stats.avgCoherenceDelta) : 0;
  const activeCount = stats ? Number(stats.activeCount) : 0;
  const lastRefresh = stats ? formatTimestamp(stats.lastRefresh) : "—";
  const ringCirc = 2 * Math.PI * 40;
  const cohPct = Math.min(100, Math.max(0, 50 + avgCohDelta * 5));
  const ringOffset = ringCirc - cohPct / 100 * ringCirc;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", "data-ocid": "entanglements.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "glass-lg sticky top-0 z-40 border-b",
        style: { borderColor: "oklch(0.72 0.20 200 / 0.18)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "relative w-8 h-8 rounded-lg flex items-center justify-center",
                style: {
                  background: "oklch(0.72 0.20 200 / 0.15)",
                  border: "1px solid oklch(0.72 0.20 200 / 0.35)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Activity,
                    {
                      className: "w-4 h-4",
                      style: { color: "oklch(0.72 0.20 200)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full animate-pulse",
                      style: {
                        background: "oklch(0.72 0.20 200)",
                        boxShadow: "0 0 6px oklch(0.72 0.20 200)"
                      }
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-extrabold text-foreground tracking-widest text-sm uppercase", children: "ENTANGLEMENT NETWORK" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-[10px] font-mono",
                  style: { color: "oklch(0.72 0.20 200 / 0.8)" },
                  children: "Sovereign Substrate Couplings — Live"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-2 glass-sm rounded-full px-3 py-1.5",
              "data-ocid": "entanglements.refresh_indicator",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "w-1.5 h-1.5 rounded-full animate-pulse",
                    style: { background: "oklch(0.72 0.20 200)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground", children: "Auto-refresh 5s" })
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 py-8 space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
        {
          label: "Total Transits",
          value: String(totalTransits),
          color: "oklch(0.72 0.20 200)"
        },
        {
          label: "Avg COH Δ",
          value: (avgCohDelta >= 0 ? "+" : "") + String(avgCohDelta),
          color: avgCohDelta >= 0 ? "oklch(0.72 0.18 162)" : "oklch(0.76 0.18 84)"
        },
        {
          label: "Active Nodes",
          value: String(activeCount),
          color: "oklch(0.68 0.18 280)"
        },
        {
          label: "Last Refresh",
          value: lastRefresh,
          color: "oklch(0.55 0.01 260)"
        }
      ].map(({ label, value, color }, _i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "glass rounded-2xl p-4 space-y-2",
          "data-ocid": "entanglements.stat_card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground uppercase tracking-widest", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "block text-2xl font-display font-extrabold",
                style: { color },
                children: value
              }
            )
          ]
        },
        label
      )) }),
      isLoading && allNodes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4",
          "data-ocid": "entanglements.loading_state",
          children: intelligenceNodes.map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass rounded-2xl h-56 animate-pulse" }, id))
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4", children: intelligenceNodes.map((nodeId, idx) => {
        const ent = allNodes.find((e) => e.id === nodeId);
        const meta = NODE_META[nodeId];
        const isActive = ent ? "active" in ent.status : false;
        const cohDelta = ent ? Number(ent.coherenceDelta) : 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass rounded-2xl p-5 space-y-4 hover:border-white/15 transition-glass glass-shimmer",
            style: {
              borderColor: `${meta.color.replace(")", " / 0.25)")}`
            },
            "data-ocid": `entanglements.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "block font-mono text-3xl font-extrabold tracking-tighter leading-none",
                      style: { color: meta.color },
                      children: nodeId
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[11px] text-muted-foreground mt-1", children: meta.role })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: cn(
                      "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[9px] font-bold font-mono uppercase tracking-widest",
                      isActive ? "border" : "border"
                    ),
                    style: isActive ? {
                      color: "oklch(0.72 0.18 162)",
                      background: "oklch(0.72 0.18 162 / 0.12)",
                      borderColor: "oklch(0.72 0.18 162 / 0.3)"
                    } : {
                      color: "oklch(0.76 0.18 84)",
                      background: "oklch(0.76 0.18 84 / 0.12)",
                      borderColor: "oklch(0.76 0.18 84 / 0.3)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "w-1.5 h-1.5 rounded-full",
                          style: {
                            background: isActive ? "oklch(0.72 0.18 162)" : "oklch(0.76 0.18 84)"
                          }
                        }
                      ),
                      isActive ? "ACTIVE" : "DORMANT"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-sm rounded-xl p-3 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono uppercase tracking-wider", children: "Coherence Δ" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xl font-display font-bold mt-1",
                    style: {
                      color: cohDelta >= 0 ? "oklch(0.72 0.18 162)" : "oklch(0.65 0.22 22)"
                    },
                    children: cohDelta >= 0 ? `+${cohDelta}` : cohDelta
                  }
                )
              ] }),
              ent && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] text-muted-foreground", children: [
                  Number(ent.transitCount),
                  " transits"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 font-mono text-[10px] text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: ent.sourceSubstrate }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "bidirectional" in ent.direction ? "⇔" : "→" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: ent.targetSubstrate })
                ] })
              ] }),
              nodeId === "NRVE" && /* @__PURE__ */ jsxRuntimeExports.jsx(NrveDetail, {}),
              nodeId === "PLSE" && /* @__PURE__ */ jsxRuntimeExports.jsx(PlseDetail, {})
            ]
          },
          nodeId
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-8", "data-ocid": "entanglements.bridge_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-mono font-bold uppercase tracking-widest text-emerald-400", children: "Language Bridge Entanglements" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "h-1.5 w-1.5 rounded-full animate-pulse",
              style: { background: "oklch(0.72 0.17 155)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground", children: "LEX_PONTIFEX · Sovereign Native" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground", children: "Transits:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-mono text-[11px] font-bold",
                style: { color: "oklch(0.72 0.17 155)" },
                children: totalTransits.toLocaleString()
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [
          {
            id: "PONT",
            leftSubstrate: "ICPM",
            leftLabel: "Motoko",
            rightSubstrate: "JLIA",
            rightLabel: "Julia",
            dir: "bidir",
            desc: "ICPM ↔ JLIA · Nat/Float ↔ Int64 serialization · FLOR on both sides",
            protocol: "Motoko ↔ Julia math bridge",
            active: true
          },
          {
            id: "MRDM",
            leftSubstrate: "ICPM",
            leftLabel: "Motoko",
            rightSubstrate: "EMRT",
            rightLabel: "Memory",
            dir: "bidir",
            desc: "ICPM ↔ EMRT · State ↔ Memory ops · Append-only on EMRT",
            protocol: "State ↔ Memory bridge",
            active: true
          },
          {
            id: "AXON",
            leftSubstrate: "EART",
            leftLabel: "Autonomous",
            rightSubstrate: "ICPM",
            rightLabel: "Core",
            dir: "unidir",
            desc: "EART → ICPM · Autonomous outputs inject into core pipeline. EART never receives direct calls.",
            protocol: "Autonomous output injector",
            active: true
          },
          {
            id: "CRUX",
            leftSubstrate: "JLIA",
            leftLabel: "Julia",
            rightSubstrate: "EMRT",
            rightLabel: "Memory",
            dir: "unidir",
            desc: "JLIA → EMRT · FLOR-computed values written directly to memory zones. Bypasses Motoko latency.",
            protocol: "Julia floor → Memory direct",
            active: true
          },
          {
            id: "NXUS",
            leftSubstrate: "ALL",
            leftLabel: "All Substrates",
            rightSubstrate: "RGST",
            rightLabel: "Registry",
            dir: "unidir",
            desc: "All → RGST · Stats write-only broadcast. Registry never writes back.",
            protocol: "Registry write bus",
            active: true
          }
        ].map((bridge, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: idx * 0.08 },
            "data-ocid": `entanglements.bridge.${idx + 1}`,
            className: "glass-portal-it rounded-2xl p-5",
            style: {
              border: "1px solid rgba(0,220,130,0.18)",
              boxShadow: bridge.active ? "0 0 16px rgba(0,220,130,0.08)" : "none"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-mono text-xl font-black tracking-widest",
                    style: { color: "oklch(0.72 0.17 155)" },
                    children: bridge.id
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: bridge.protocol }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: cn(
                      "text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase",
                      bridge.active ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25" : "bg-amber-500/15 text-amber-400 border border-amber-500/25"
                    ),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: cn(
                            "inline-block w-1.5 h-1.5 rounded-full mr-1 align-middle",
                            bridge.active ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                          )
                        }
                      ),
                      bridge.active ? "ACTIVE" : "IDLE"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "glass-sm rounded-xl px-3 py-2 text-center shrink-0",
                    style: {
                      border: "1px solid oklch(0.72 0.17 155 / 0.30)",
                      minWidth: 72
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "font-mono text-[11px] font-bold",
                          style: { color: "oklch(0.72 0.17 155)" },
                          children: bridge.leftSubstrate
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-muted-foreground", children: bridge.leftLabel })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 relative flex items-center justify-center h-8", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] rounded-full",
                      style: {
                        background: "linear-gradient(90deg, oklch(0.72 0.17 155 / 0.15), oklch(0.72 0.17 155 / 0.80), oklch(0.72 0.17 155 / 0.15))",
                        boxShadow: "0 0 8px oklch(0.72 0.17 155 / 0.50)",
                        animation: bridge.active ? "bridge-pulse 1.8s ease-in-out infinite" : "none"
                      }
                    }
                  ),
                  bridge.active && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "absolute h-2 w-2 rounded-full",
                      style: {
                        background: "oklch(0.72 0.17 155)",
                        boxShadow: "0 0 6px oklch(0.72 0.17 155)",
                        animation: "bridge-packet 1.8s linear infinite",
                        left: "10%"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "relative z-10 font-mono text-[11px] font-bold px-2",
                      style: {
                        color: "oklch(0.72 0.17 155)",
                        background: "rgba(0,0,0,0.55)",
                        borderRadius: 4
                      },
                      children: bridge.dir === "bidir" ? "⇔" : "→"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "glass-sm rounded-xl px-3 py-2 text-center shrink-0",
                    style: {
                      border: "1px solid oklch(0.72 0.17 155 / 0.30)",
                      minWidth: 72
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "font-mono text-[11px] font-bold",
                          style: { color: "oklch(0.72 0.17 155)" },
                          children: bridge.rightSubstrate
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-muted-foreground", children: bridge.rightLabel })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground font-mono leading-relaxed", children: bridge.desc })
            ]
          },
          bridge.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
            @keyframes bridge-pulse {
              0%, 100% { opacity: 0.5; box-shadow: 0 0 4px oklch(0.72 0.17 155 / 0.3); }
              50% { opacity: 1; box-shadow: 0 0 12px oklch(0.72 0.17 155 / 0.7); }
            }
            @keyframes bridge-packet {
              0% { left: 5%; opacity: 0; }
              10% { opacity: 1; }
              90% { opacity: 1; }
              100% { left: 90%; opacity: 0; }
            }
          ` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "120", height: "120", className: "-rotate-90", role: "img", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Network coherence score" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "circle",
              {
                cx: "60",
                cy: "60",
                r: "40",
                fill: "none",
                stroke: "oklch(0.20 0.015 260)",
                strokeWidth: "8"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "circle",
              {
                cx: "60",
                cy: "60",
                r: "40",
                fill: "none",
                stroke: "oklch(0.72 0.20 200)",
                strokeWidth: "8",
                strokeLinecap: "round",
                strokeDasharray: String(ringCirc),
                strokeDashoffset: String(ringOffset),
                style: {
                  filter: "drop-shadow(0 0 8px oklch(0.72 0.20 200 / 0.6))"
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-2xl font-display font-extrabold",
                style: { color: "oklch(0.72 0.20 200)" },
                children: [
                  cohPct.toFixed(0),
                  "%"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono text-muted-foreground uppercase", children: "NET COH" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground", children: "Network Coherence" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Average coherence delta across all 5 intelligence entanglements. Fibonacci-floor compounded per session cycle." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mt-3", children: intelligenceNodes.map((id) => {
            const meta = NODE_META[id];
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "glass-sm rounded-lg px-2.5 py-1 font-mono text-xs font-bold",
                style: {
                  color: meta.color,
                  borderColor: meta.color.replace(")", " / 0.3)")
                },
                children: id
              },
              id
            );
          }) })
        ] })
      ] }),
      entanglements.filter((e) => !intelligenceNodes.includes(e.id)).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4", children: "Bridge Entanglements" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3", children: entanglements.filter((e) => !intelligenceNodes.includes(e.id)).map((ent) => {
          const isActive = "active" in ent.status;
          const delta = Number(ent.coherenceDelta);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass rounded-xl p-4",
              "data-ocid": "entanglements.item.bridge",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-foreground", children: ent.id }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "w-2 h-2 rounded-full",
                      style: {
                        background: isActive ? "oklch(0.72 0.18 162)" : "oklch(0.76 0.18 84)"
                      }
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
                  Number(ent.transitCount),
                  " transits"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-sm font-bold mt-1",
                    style: {
                      color: delta >= 0 ? "oklch(0.72 0.18 162)" : "oklch(0.65 0.22 22)"
                    },
                    children: delta >= 0 ? `+${delta}` : delta
                  }
                )
              ]
            },
            ent.id
          );
        }) })
      ] })
    ] })
  ] });
}
export {
  EntanglementMonitor as default
};
