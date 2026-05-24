import { j as jsxRuntimeExports, r as reactExports } from "./vendor-1quNMNNh.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { C as Cpu, S as Skeleton, Z as Zap } from "./index-BivnQ6bB.js";
import { u as useEngines, E as EngineStatus } from "./use-engines-DqR-N7RV.js";
import { L as Link } from "./router-D6GUppNf.js";
import { C as ChevronDown } from "./chevron-down-B2BSsDRF.js";
import { C as ChevronRight } from "./chevron-right-neFioPkE.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./query-8urnerR0.js";
import "./motion-BK2wxCtX.js";
const SUBSTRATE_CONFIG = {
  ICPM: {
    label: "ICP / Motoko",
    accent: "text-cyan-400",
    glow: "rgba(0,210,255,0.18)",
    border: "rgba(0,210,255,0.22)",
    chipBg: "rgba(0,210,255,0.08)",
    dotColor: "oklch(0.78 0.22 200)"
  },
  JLIA: {
    label: "Julia Runtime",
    accent: "text-violet-400",
    glow: "rgba(160,100,255,0.18)",
    border: "rgba(160,100,255,0.22)",
    chipBg: "rgba(160,100,255,0.08)",
    dotColor: "oklch(0.68 0.18 280)"
  },
  EART: {
    label: "Autonomous Runtime",
    accent: "text-amber-400",
    glow: "rgba(255,185,0,0.18)",
    border: "rgba(255,185,0,0.22)",
    chipBg: "rgba(255,185,0,0.08)",
    dotColor: "oklch(0.75 0.16 70)"
  },
  EMRT: {
    label: "Memory Runtime",
    accent: "text-emerald-400",
    glow: "rgba(0,220,130,0.18)",
    border: "rgba(0,220,130,0.22)",
    chipBg: "rgba(0,220,130,0.08)",
    dotColor: "oklch(0.72 0.17 155)"
  }
};
function getSubstrate(engine) {
  const id = Number(engine.id);
  if ([1, 2, 3, 4, 5].includes(id)) return "ICPM";
  if ([6, 7].includes(id)) return "JLIA";
  if ([8, 9].includes(id)) return "EART";
  return "EMRT";
}
function CohRing({ value }) {
  const r = 18;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(1, Math.max(0, value / 100));
  const color = pct > 0.8 ? "oklch(0.72 0.17 155)" : pct > 0.4 ? "oklch(0.75 0.16 70)" : "oklch(0.65 0.22 22)";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: "44",
      height: "44",
      viewBox: "0 0 44 44",
      "aria-hidden": "true",
      className: "shrink-0",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "22",
            cy: "22",
            r,
            fill: "none",
            stroke: "rgba(255,255,255,0.06)",
            strokeWidth: "3"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "22",
            cy: "22",
            r,
            fill: "none",
            stroke: color,
            strokeWidth: "3",
            strokeDasharray: `${pct * circ} ${circ}`,
            strokeLinecap: "round",
            style: { transform: "rotate(-90deg)", transformOrigin: "50% 50%" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "22",
            y: "26",
            textAnchor: "middle",
            fill: color,
            fontSize: "9",
            fontFamily: "monospace",
            fontWeight: "700",
            children: Math.round(value)
          }
        )
      ]
    }
  );
}
function EngineCard({
  engine,
  index,
  substrate
}) {
  const cfg = SUBSTRATE_CONFIG[substrate];
  const isActive = engine.status === EngineStatus.active;
  const coh = 85 + Number(engine.id) % 12;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/engines/$engineId",
      params: { engineId: String(engine.id) },
      "data-ocid": `engine_registry.engine_card.${index}`,
      className: "block group",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "glass-sm rounded-2xl p-4 transition-glass hover:-translate-y-0.5 cursor-pointer glass-shimmer",
          style: {
            borderColor: cfg.border,
            boxShadow: `0 4px 24px ${cfg.glow}, 0 0 0 1px ${cfg.border}`
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "rounded-lg px-2 py-0.5 font-mono text-xs font-bold tracking-widest shrink-0",
                  style: {
                    background: cfg.chipBg,
                    color: cfg.dotColor,
                    border: `1px solid ${cfg.border}`
                  },
                  children: engine.codeName
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "w-2 h-2 rounded-full shrink-0 mt-1",
                  style: {
                    background: isActive ? cfg.dotColor : "oklch(0.55 0.01 260)",
                    boxShadow: isActive ? `0 0 6px ${cfg.glow}` : "none",
                    animation: isActive ? "status-pulse 2s ease-in-out infinite" : "none"
                  },
                  "aria-label": isActive ? "Active" : "Dormant"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-display font-semibold text-foreground leading-tight truncate", children: engine.fullName }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed", children: [
                  engine.domain.slice(0, 60),
                  engine.domain.length > 60 ? "…" : ""
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CohRing, { value: coh })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "mt-3 pt-3 flex items-center justify-between",
                style: { borderTop: `1px solid ${cfg.border}` },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono text-muted-foreground", children: [
                    engine.lessonsAvailable.length,
                    " lessons"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: `text-[10px] font-mono font-semibold ${cfg.accent} flex items-center gap-1`,
                      children: [
                        "Enter ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" })
                      ]
                    }
                  )
                ]
              }
            )
          ]
        }
      )
    }
  );
}
function SubstrateSection({
  substrateKey,
  engines
}) {
  const [open, setOpen] = reactExports.useState(true);
  const cfg = SUBSTRATE_CONFIG[substrateKey];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `engine_registry.substrate_section.${substrateKey.toLowerCase()}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setOpen((o) => !o),
            className: "w-full flex items-center gap-3 px-4 py-3 rounded-xl glass-sm transition-glass text-left touch-target mb-3",
            style: { borderColor: cfg.border },
            "data-ocid": `engine_registry.substrate_toggle.${substrateKey.toLowerCase()}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "w-2.5 h-2.5 rounded-full",
                  style: { background: cfg.dotColor, boxShadow: `0 0 8px ${cfg.glow}` },
                  "aria-hidden": true
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-mono text-xs font-bold tracking-widest uppercase",
                  style: { color: cfg.dotColor },
                  children: substrateKey
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "·" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: cfg.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "outline",
                  className: "ml-auto text-[10px] font-mono",
                  style: {
                    borderColor: cfg.border,
                    color: cfg.dotColor,
                    background: cfg.chipBg
                  },
                  children: [
                    engines.length,
                    " engines"
                  ]
                }
              ),
              open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground" })
            ]
          }
        ),
        open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6", children: engines.map((engine, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          EngineCard,
          {
            engine,
            index: idx + 1,
            substrate: substrateKey
          },
          String(engine.id)
        )) })
      ]
    }
  );
}
function EngineRegistry() {
  const { engines, isLoading } = useEngines();
  const activeCount = engines.filter(
    (e) => e.status === EngineStatus.active
  ).length;
  const grouped = {
    ICPM: engines.filter((e) => getSubstrate(e) === "ICPM"),
    JLIA: engines.filter((e) => getSubstrate(e) === "JLIA"),
    EART: engines.filter((e) => getSubstrate(e) === "EART"),
    EMRT: engines.filter((e) => getSubstrate(e) === "EMRT")
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "portal-enter max-w-5xl mx-auto px-4 py-10 space-y-8",
      "data-ocid": "engine_registry.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-xl rounded-3xl p-8 relative overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 pointer-events-none",
              style: {
                background: "radial-gradient(ellipse 70% 60% at 80% -10%, rgba(0,220,130,0.12) 0%, transparent 70%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-10 h-10 rounded-xl flex items-center justify-center",
                  style: {
                    background: "rgba(0,220,130,0.12)",
                    border: "1px solid rgba(0,220,130,0.25)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Cpu,
                    {
                      className: "w-5 h-5",
                      style: { color: "oklch(0.72 0.17 155)" }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase", children: "EduAI · ENGR" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-black tracking-tight text-foreground", children: "ENGINE REGISTRY" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "text-xs font-mono px-2 py-0.5 rounded",
                      style: {
                        background: "rgba(0,220,130,0.1)",
                        color: "oklch(0.72 0.17 155)",
                        border: "1px solid rgba(0,220,130,0.2)"
                      },
                      children: [
                        engines.length,
                        " registered"
                      ]
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
              {
                label: "Total Engines",
                value: engines.length,
                color: "oklch(0.72 0.17 155)"
              },
              {
                label: "Active",
                value: activeCount,
                color: "oklch(0.72 0.17 155)"
              },
              { label: "Substrates", value: 4, color: "oklch(0.68 0.18 280)" },
              {
                label: "Sovereign",
                value: "100%",
                color: "oklch(0.75 0.16 70)"
              }
            ].map(({ label, value, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "glass-sm rounded-xl px-3 py-2.5 text-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-lg font-black font-display",
                      style: { color },
                      children: value
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-muted-foreground uppercase tracking-wider mt-0.5", children: label })
                ]
              },
              label
            )) })
          ] })
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "engine_registry.loading_state", children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-2xl" }, `skel-${i + 1}`)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "engine_registry.engines_grid", children: Object.keys(grouped).map(
          (sub) => grouped[sub].length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            SubstrateSection,
            {
              substrateKey: sub,
              engines: grouped[sub]
            },
            sub
          ) : null
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass-sm rounded-2xl px-5 py-4 flex items-center gap-3",
            style: { borderColor: "rgba(0,220,130,0.15)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Zap,
                {
                  className: "w-4 h-4 shrink-0",
                  style: { color: "oklch(0.72 0.17 155)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-mono text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.72 0.17 155)" }, children: "LEX_RGST" }),
                " · All engines registered, named, and sealed at first registration. Names are permanent."
              ] })
            ]
          }
        )
      ]
    }
  );
}
export {
  EngineRegistry as default
};
