import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { L as Link } from "./router-D6GUppNf.js";
import { A as ArrowLeft } from "./arrow-left-DLov4c1N.js";
import { i as createLucideIcon, v as Network, k as Shield, g as Activity, C as Cpu, w as Server, W as Wifi } from "./index-BivnQ6bB.js";
import { L as Lock } from "./lock-Cp-0nqtC.js";
import { C as CircleCheck } from "./circle-check-Bol12715.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { A as ArrowRight } from "./arrow-right-CsqnM8Ko.js";
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
  ["path", { d: "M8 3 4 7l4 4", key: "9rb6wj" }],
  ["path", { d: "M4 7h16", key: "6tx8e3" }],
  ["path", { d: "m16 21 4-4-4-4", key: "siv7j2" }],
  ["path", { d: "M20 17H4", key: "h6l3hr" }]
];
const ArrowLeftRight = createLucideIcon("arrow-left-right", __iconNode);
const PORTAL_NODES = [
  {
    id: "STU",
    name: "Student Portal",
    role: "portal",
    latency: 13,
    color: "oklch(0.78 0.22 200)",
    glow: "rgba(0,210,255,0.2)",
    border: "rgba(0,210,255,0.28)",
    icon: Activity
  },
  {
    id: "TCH",
    name: "Teacher Portal",
    role: "portal",
    latency: 21,
    color: "oklch(0.68 0.18 280)",
    glow: "rgba(160,100,255,0.2)",
    border: "rgba(160,100,255,0.28)",
    icon: Activity
  },
  {
    id: "PRI",
    name: "Principal Portal",
    role: "portal",
    latency: 34,
    color: "oklch(0.75 0.16 70)",
    glow: "rgba(255,185,0,0.2)",
    border: "rgba(255,185,0,0.28)",
    icon: Activity
  },
  {
    id: "IT",
    name: "IT Portal",
    role: "portal",
    latency: 13,
    color: "oklch(0.72 0.17 155)",
    glow: "rgba(0,220,130,0.2)",
    border: "rgba(0,220,130,0.28)",
    icon: Activity
  }
];
const SUBSTRATE_NODES = [
  {
    id: "ICPM",
    name: "ICP / Motoko",
    role: "substrate",
    latency: 8,
    color: "oklch(0.65 0.18 230)",
    glow: "rgba(0,140,255,0.18)",
    border: "rgba(0,140,255,0.25)",
    icon: Cpu
  },
  {
    id: "JLIA",
    name: "Julia Runtime",
    role: "substrate",
    latency: 21,
    color: "oklch(0.60 0.18 290)",
    glow: "rgba(120,60,255,0.18)",
    border: "rgba(120,60,255,0.25)",
    icon: Cpu
  },
  {
    id: "EDRT",
    name: "EduAI Deterministic RT",
    role: "substrate",
    latency: 5,
    color: "oklch(0.55 0.05 250)",
    glow: "rgba(100,120,180,0.18)",
    border: "rgba(100,120,180,0.25)",
    icon: Server
  },
  {
    id: "EMRT",
    name: "EduAI Memory RT",
    role: "substrate",
    latency: 34,
    color: "oklch(0.65 0.16 175)",
    glow: "rgba(0,180,160,0.18)",
    border: "rgba(0,180,160,0.25)",
    icon: Server
  }
];
const BRIDGES = [
  {
    id: "PONT",
    from: "ICPM",
    to: "JLIA",
    direction: "bidir",
    status: "ACTIVE",
    lastTransit: "2026-05-17 12:34:21",
    protocol: "Nat / Int64"
  },
  {
    id: "MRDM",
    from: "ICPM",
    to: "EMRT",
    direction: "bidir",
    status: "ACTIVE",
    lastTransit: "2026-05-17 12:34:34",
    protocol: "State / Seeds"
  },
  {
    id: "AXON",
    from: "EART",
    to: "ICPM",
    direction: "unidir",
    status: "ACTIVE",
    lastTransit: "2026-05-17 12:33:55",
    protocol: "Heartbeat Inject"
  },
  {
    id: "CRUX",
    from: "JLIA",
    to: "EMRT",
    direction: "unidir",
    status: "IDLE",
    lastTransit: "2026-05-17 12:21:08",
    protocol: "FLOR Computed"
  },
  {
    id: "NXUS",
    from: "ALL",
    to: "RGST",
    direction: "unidir",
    status: "ACTIVE",
    lastTransit: "2026-05-17 12:34:55",
    protocol: "Registry Write"
  }
];
const NET_STATS = [
  { label: "E2E Encrypted", icon: Lock },
  { label: "Sovereign Native", icon: Shield },
  { label: "ICP Chain", icon: Network },
  { label: "PHI-Timed", icon: Activity }
];
function NodeCard({ node, index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: {
        delay: index * 0.06,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1]
      },
      "data-ocid": `it-network.item.${index + 1}`,
      className: "glass rounded-2xl p-[var(--phi-21)] space-y-[var(--phi-8)] hover:scale-[1.01] transition-smooth",
      style: {
        borderColor: node.border,
        boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 24px ${node.glow}`
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-[var(--phi-8)]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-9 h-9 rounded-xl flex items-center justify-center",
                style: {
                  background: node.color.replace(")", " / 0.12)"),
                  border: `1px solid ${node.border}`
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(node.icon, { className: "w-4 h-4", style: { color: node.color } })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: node.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono", style: { color: node.color }, children: node.id })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "w-2 h-2 rounded-full animate-pulse",
                style: {
                  background: "oklch(0.72 0.18 162)",
                  boxShadow: "0 0 6px oklch(0.72 0.18 162 / 0.6)"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-[10px] font-mono",
                style: { color: "oklch(0.72 0.18 162)" },
                children: "ONLINE"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-[var(--phi-5)]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-3 h-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              node.latency,
              "ms"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-[var(--phi-5)]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Shield,
              {
                className: "w-3 h-3",
                style: { color: "oklch(0.72 0.17 155)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: "TLS 1.3" })
          ] })
        ] })
      ]
    }
  );
}
function ITNetworkStatus() {
  const [selectedBridge, setSelectedBridge] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "portal-enter min-h-screen p-[var(--phi-21)]",
      "data-ocid": "it-network.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto space-y-[var(--phi-34)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass-lg rounded-2xl px-[var(--phi-21)] py-[var(--phi-13)] flex items-center gap-[var(--phi-13)]",
            style: { borderColor: "rgba(0,220,130,0.18)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/it-security", "data-ocid": "it-network.back_link", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
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
                    Network,
                    {
                      className: "w-4 h-4",
                      style: { color: "oklch(0.72 0.17 155)" }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground tracking-wide", children: "Network Topology" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: "Live substrate graph · encrypted · PHI-timed" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: "font-mono text-[10px] tracking-widest",
                  style: {
                    background: "oklch(0.72 0.17 155 / 0.12)",
                    color: "oklch(0.72 0.17 155)",
                    border: "1px solid rgba(0,220,130,0.3)"
                  },
                  children: "IT PORTAL"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "data-ocid": "it-network.stats_bar",
            className: "glass rounded-xl px-[var(--phi-21)] py-[var(--phi-13)] flex flex-wrap items-center gap-[var(--phi-13)]",
            style: { borderColor: "rgba(0,220,130,0.15)" },
            children: NET_STATS.map(({ label, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-[var(--phi-8)] pr-[var(--phi-13)] border-r border-border/40 last:border-0",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-6 h-6 rounded-lg flex items-center justify-center",
                      style: { background: "oklch(0.72 0.17 155 / 0.12)" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Icon,
                        {
                          className: "w-3 h-3",
                          style: { color: "oklch(0.72 0.17 155)" }
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground", children: label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CircleCheck,
                    {
                      className: "w-3.5 h-3.5",
                      style: { color: "oklch(0.72 0.18 162)" }
                    }
                  )
                ]
              },
              label
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-[var(--phi-13)]", children: "PORTAL NODES" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "data-ocid": "it-network.portals.list",
              className: "grid grid-cols-2 lg:grid-cols-4 gap-[var(--phi-13)]",
              children: PORTAL_NODES.map((node, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(NodeCard, { node, index: idx }, node.id))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-[var(--phi-13)]", children: "SUBSTRATE NODES" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "data-ocid": "it-network.substrates.list",
              className: "grid grid-cols-2 lg:grid-cols-4 gap-[var(--phi-13)]",
              children: SUBSTRATE_NODES.map((node, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                NodeCard,
                {
                  node,
                  index: PORTAL_NODES.length + idx
                },
                node.id
              ))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-[var(--phi-13)]", children: "LANGUAGE BRIDGES" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "it-network.bridges.list",
              className: "glass rounded-2xl overflow-hidden",
              style: { borderColor: "rgba(0,220,130,0.15)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 px-[var(--phi-21)] py-[var(--phi-8)] border-b border-border/30 sticky top-0 glass-sm", children: ["Bridge", "From", "To", "Protocol", "Status"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-[10px] font-mono uppercase tracking-widest text-muted-foreground",
                    children: h
                  },
                  h
                )) }),
                BRIDGES.map((bridge, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.button,
                  {
                    type: "button",
                    initial: { opacity: 0, x: -8 },
                    animate: { opacity: 1, x: 0 },
                    transition: { delay: idx * 0.07 },
                    "data-ocid": `it-network.bridge.${idx + 1}`,
                    className: "w-full grid grid-cols-5 px-[var(--phi-21)] py-[var(--phi-13)] border-b border-border/20 last:border-0 text-left hover:bg-[oklch(0.72_0.17_155/0.04)] transition-smooth cursor-pointer",
                    onClick: () => setSelectedBridge(
                      selectedBridge === bridge.id ? null : bridge.id
                    ),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "font-mono font-bold text-sm",
                          style: { color: "oklch(0.72 0.17 155)" },
                          children: bridge.id
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-foreground", children: bridge.from }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs font-mono text-foreground", children: [
                        bridge.direction === "bidir" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeftRight, { className: "w-3 h-3 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3 text-muted-foreground" }),
                        bridge.to
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-mono text-muted-foreground", children: bridge.protocol }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "w-1.5 h-1.5 rounded-full",
                            style: {
                              background: bridge.status === "ACTIVE" ? "oklch(0.72 0.18 162)" : "oklch(0.76 0.16 70)",
                              boxShadow: bridge.status === "ACTIVE" ? "0 0 4px oklch(0.72 0.18 162 / 0.7)" : "none"
                            }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "text-[10px] font-mono font-bold",
                            style: {
                              color: bridge.status === "ACTIVE" ? "oklch(0.72 0.18 162)" : "oklch(0.76 0.16 70)"
                            },
                            children: bridge.status
                          }
                        )
                      ] })
                    ]
                  },
                  bridge.id
                )),
                selectedBridge && (() => {
                  const bridge = BRIDGES.find((b) => b.id === selectedBridge);
                  if (!bridge) return null;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, height: 0 },
                      animate: { opacity: 1, height: "auto" },
                      exit: { opacity: 0, height: 0 },
                      className: "px-[var(--phi-21)] py-[var(--phi-13)] border-t border-border/20 flex items-center gap-[var(--phi-21)] glass-sm",
                      style: { borderColor: "rgba(0,220,130,0.2)" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground font-mono", children: "Last transit:" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-foreground font-mono", children: bridge.lastTransit }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground font-mono", children: "Direction:" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "text-[11px] font-mono",
                            style: { color: "oklch(0.72 0.17 155)" },
                            children: bridge.direction === "bidir" ? "Bidirectional" : "Unidirectional"
                          }
                        )
                      ]
                    }
                  );
                })()
              ]
            }
          )
        ] })
      ] })
    }
  );
}
export {
  ITNetworkStatus as default
};
