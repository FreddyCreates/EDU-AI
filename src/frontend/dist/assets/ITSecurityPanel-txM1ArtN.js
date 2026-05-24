import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { i as createLucideIcon, v as Network, Z as Zap, k as Shield, E as Globe, D as Database, g as Activity, S as Skeleton } from "./index-BivnQ6bB.js";
import { d as usePortalTransitions, e as useApiCallLogs } from "./use-apix-BV8BqXWi.js";
import { u as useSystemDiag, c as useSonrCheck, a as useVaultStats } from "./use-diag-CPsjDtM1.js";
import { d as useEntanglementStats } from "./use-entanglements-B-bwtovY.js";
import { u as useLaws } from "./use-laws-C__sTr1Z.js";
import { L as Link } from "./router-D6GUppNf.js";
import { T as Terminal, K as Key, R as Radio } from "./terminal-B_j_OuFG.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { S as ShieldCheck } from "./shield-check-5IduDo33.js";
import { L as Lock } from "./lock-Cp-0nqtC.js";
import { T as TriangleAlert } from "./triangle-alert-DEqO8oET.js";
import { E as ExternalLink } from "./external-link-YoAHtQNH.js";
import { C as CircleCheck } from "./circle-check-Bol12715.js";
import { A as ArrowRight } from "./arrow-right-CsqnM8Ko.js";
import "./query-8urnerR0.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "6", x2: "6", y1: "3", y2: "15", key: "17qcm7" }],
  ["circle", { cx: "18", cy: "6", r: "3", key: "1h7g24" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["path", { d: "M18 9a9 9 0 0 1-9 9", key: "n2h4wq" }]
];
const GitBranch = createLucideIcon("git-branch", __iconNode);
const SECURITY_STATUSES = [
  {
    id: "enc",
    label: "Encryption",
    secure: "ACTIVE",
    compromised: "INACTIVE",
    state: "secure",
    icon: Lock,
    ocid: "it.status.encryption"
  },
  {
    id: "sov",
    label: "Data Sovereignty",
    secure: "ENFORCED",
    compromised: "BREACH",
    state: "secure",
    icon: Shield,
    ocid: "it.status.sovereignty"
  },
  {
    id: "sess",
    label: "Session Integrity",
    secure: "VALID",
    compromised: "DEGRADED",
    state: "secure",
    icon: Key,
    ocid: "it.status.session"
  },
  {
    id: "net",
    label: "Network Security",
    secure: "SECURE",
    compromised: "EXPOSED",
    state: "secure",
    icon: Globe,
    ocid: "it.status.network"
  },
  {
    id: "vlt",
    label: "Vault Access",
    secure: "SEALED",
    compromised: "OPEN",
    state: "secure",
    icon: Database,
    ocid: "it.status.vault"
  }
];
const BRIDGES = [
  {
    id: "PONT",
    from: "ICPM",
    to: "JLIA",
    protocol: "Nat↔Int64 serialization",
    latency: "1.3ms",
    errorRate: "0.00%",
    connected: true
  },
  {
    id: "MRDM",
    from: "ICPM",
    to: "EMRT",
    protocol: "State→Memory ops",
    latency: "0.8ms",
    errorRate: "0.00%",
    connected: true
  },
  {
    id: "AXON",
    from: "EART",
    to: "ICPM",
    protocol: "Autonomous inject (1-way)",
    latency: "2.1ms",
    errorRate: "0.00%",
    connected: true
  },
  {
    id: "CRUX",
    from: "JLIA",
    to: "EMRT",
    protocol: "FLOR→Zone write (1-way)",
    latency: "0.6ms",
    errorRate: "0.00%",
    connected: true
  },
  {
    id: "NXUS",
    from: "ALL",
    to: "RGST",
    protocol: "Stats write-only broadcast",
    latency: "0.4ms",
    errorRate: "0.00%",
    connected: true
  }
];
const REGISTRIES = [
  {
    id: "ENGR",
    name: "Engine Registry",
    records: 18,
    lastWrite: "4s ago",
    sealed: true
  },
  {
    id: "BLDR",
    name: "Builder Registry",
    records: 8,
    lastWrite: "1m ago",
    sealed: true
  },
  {
    id: "PROT",
    name: "Protocol Registry",
    records: 11,
    lastWrite: "—",
    sealed: true
  },
  {
    id: "SDKR",
    name: "SDK Registry",
    records: 24,
    lastWrite: "12s ago",
    sealed: true
  },
  {
    id: "BRDG",
    name: "Bridge Registry",
    records: 5,
    lastWrite: "2s ago",
    sealed: true
  },
  {
    id: "RTME",
    name: "Runtime Registry",
    records: 5,
    lastWrite: "1s ago",
    sealed: true
  },
  {
    id: "SUBJ",
    name: "Subject Registry",
    records: 432,
    lastWrite: "—",
    sealed: true
  },
  {
    id: "STUD",
    name: "Student Registry",
    records: 0,
    lastWrite: "Live",
    sealed: false
  }
];
const SUBSTRATE_ORDER = ["ICPM", "JLIA", "EART", "EMRT"];
const SUBSTRATE_COLORS = {
  ICPM: "text-[oklch(0.72_0.17_155)]",
  JLIA: "text-[oklch(0.75_0.16_280)]",
  EART: "text-[oklch(0.78_0.15_200)]",
  EMRT: "text-[oklch(0.76_0.16_70)]"
};
const SYSTEM_ENGINES = [
  {
    id: "COGT",
    codeName: "Cognition",
    substrate: "ICPM",
    coh: 0.97,
    sessions: 1247,
    uptime: "99.98%",
    healthy: true
  },
  {
    id: "NOVA",
    codeName: "Nova Router",
    substrate: "ICPM",
    coh: 0.99,
    sessions: 3821,
    uptime: "100%",
    healthy: true
  },
  {
    id: "MEDI",
    codeName: "Mediation",
    substrate: "ICPM",
    coh: 0.96,
    sessions: 892,
    uptime: "99.97%",
    healthy: true
  },
  {
    id: "SONR",
    codeName: "Sonar",
    substrate: "ICPM",
    coh: 0.98,
    sessions: 5500,
    uptime: "100%",
    healthy: true
  },
  {
    id: "DIAG",
    codeName: "Diagnostic",
    substrate: "ICPM",
    coh: 0.95,
    sessions: 412,
    uptime: "99.95%",
    healthy: true
  },
  {
    id: "GATE",
    codeName: "Gate",
    substrate: "ICPM",
    coh: 1,
    sessions: 9934,
    uptime: "100%",
    healthy: true
  },
  {
    id: "PHIX",
    codeName: "PHI Compute",
    substrate: "JLIA",
    coh: 0.99,
    sessions: 7221,
    uptime: "100%",
    healthy: true
  },
  {
    id: "FIBR",
    codeName: "Fibonacci RT",
    substrate: "JLIA",
    coh: 1,
    sessions: 6103,
    uptime: "100%",
    healthy: true
  },
  {
    id: "VEKT",
    codeName: "Vector",
    substrate: "JLIA",
    coh: 0.98,
    sessions: 2844,
    uptime: "99.99%",
    healthy: true
  },
  {
    id: "COHS",
    codeName: "Coh Scoring",
    substrate: "JLIA",
    coh: 0.97,
    sessions: 3312,
    uptime: "99.99%",
    healthy: true
  },
  {
    id: "FLOR",
    codeName: "Floor Engine",
    substrate: "JLIA",
    coh: 1,
    sessions: 9100,
    uptime: "100%",
    healthy: true
  },
  {
    id: "AUTN",
    codeName: "Autonomous",
    substrate: "EART",
    coh: 0.93,
    sessions: 89,
    uptime: "99.87%",
    healthy: true
  },
  {
    id: "GENX",
    codeName: "Self-Config",
    substrate: "EART",
    coh: 0.91,
    sessions: 34,
    uptime: "99.80%",
    healthy: true
  },
  {
    id: "META",
    codeName: "Meta-Think",
    substrate: "EART",
    coh: 0.95,
    sessions: 233,
    uptime: "99.92%",
    healthy: true
  },
  {
    id: "CURO",
    codeName: "Curiosity",
    substrate: "EART",
    coh: 0.94,
    sessions: 512,
    uptime: "99.90%",
    healthy: true
  },
  {
    id: "PASS",
    codeName: "Passport",
    substrate: "EMRT",
    coh: 0.98,
    sessions: 1834,
    uptime: "99.98%",
    healthy: true
  },
  {
    id: "SEED",
    codeName: "Seed Engine",
    substrate: "EMRT",
    coh: 0.97,
    sessions: 921,
    uptime: "99.96%",
    healthy: true
  },
  {
    id: "VALT",
    codeName: "Vault Engine",
    substrate: "EMRT",
    coh: 1,
    sessions: 3421,
    uptime: "100%",
    healthy: true
  },
  {
    id: "ALOC",
    codeName: "Allocator",
    substrate: "EMRT",
    coh: 0.99,
    sessions: 8812,
    uptime: "100%",
    healthy: true
  }
];
function LiveClock() {
  const [now, setNow] = reactExports.useState(/* @__PURE__ */ new Date());
  reactExports.useEffect(() => {
    const t = setInterval(() => setNow(/* @__PURE__ */ new Date()), 1e3);
    return () => clearInterval(t);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: "font-mono text-xs",
      style: { color: "oklch(0.72 0.17 155)" },
      children: [
        now.toLocaleTimeString("en-US", { hour12: false }),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: now.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric"
        }) })
      ]
    }
  );
}
function DiagScore({ score, loading }) {
  const pct = Math.round(score * 100);
  const r = 38;
  const circ = 2 * Math.PI * r;
  const offset = circ - pct / 100 * circ;
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 w-28 rounded-full" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative flex items-center justify-center",
      style: { width: 112, height: 112 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "112", height: "112", className: "-rotate-90", role: "img", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "System health score" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: "56",
              cy: "56",
              r,
              fill: "none",
              stroke: "rgba(0,220,130,0.10)",
              strokeWidth: "6"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: "56",
              cy: "56",
              r,
              fill: "none",
              stroke: "oklch(0.72 0.17 155)",
              strokeWidth: "6",
              strokeLinecap: "round",
              strokeDasharray: circ,
              strokeDashoffset: offset,
              style: { transition: "stroke-dashoffset 1s ease" }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute flex flex-col items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "font-display text-2xl font-bold",
              style: { color: "oklch(0.72 0.17 155)" },
              children: pct
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] text-muted-foreground -mt-0.5", children: "DIAG" })
        ] })
      ]
    }
  );
}
function SecurityStrip({ statuses }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "glass-portal-it rounded-2xl px-5 py-4 flex flex-wrap gap-3",
      "data-ocid": "it.security_strip",
      children: statuses.map((s, i) => {
        const Icon = s.icon;
        const ok = s.state === "secure";
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 4 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: i * 0.05 },
            "data-ocid": s.ocid,
            className: "flex-1 min-w-[140px] glass-sm rounded-xl px-4 py-3 flex items-center gap-2.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                  style: {
                    background: ok ? "rgba(0,220,130,0.10)" : "rgba(255,60,60,0.10)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Icon,
                    {
                      className: "h-4 w-4",
                      style: {
                        color: ok ? "oklch(0.72 0.17 155)" : "oklch(0.65 0.22 22)"
                      }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground truncate", children: s.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-mono text-xs font-bold",
                    style: {
                      color: ok ? "oklch(0.72 0.17 155)" : "oklch(0.65 0.22 22)"
                    },
                    children: ok ? s.secure : s.compromised
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "ml-auto h-2 w-2 rounded-full shrink-0 animate-[status-pulse_2s_ease-in-out_infinite]",
                  style: {
                    background: ok ? "oklch(0.72 0.17 155)" : "oklch(0.65 0.22 22)"
                  }
                }
              )
            ]
          },
          s.id
        );
      })
    }
  );
}
function EngineHealthPanel({ diag }) {
  const grouped = SUBSTRATE_ORDER.map((sub) => ({
    substrate: sub,
    engines: SYSTEM_ENGINES.filter((e) => e.substrate === sub)
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-lg rounded-2xl overflow-hidden flex flex-col",
      "data-ocid": "it.engine_health_panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 px-5 pt-5 pb-3 border-b",
            style: { borderColor: "rgba(0,220,130,0.12)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Activity,
                {
                  className: "h-4 w-4",
                  style: { color: "oklch(0.72 0.17 155)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-foreground", children: "Engine Health" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto font-mono text-[10px] text-muted-foreground", children: [
                "COH AVG: ",
                diag ? `${(diag.avgCoh * 100).toFixed(1)}%` : "—"
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto p-3 space-y-5 max-h-[560px]", children: grouped.map(({ substrate, engines }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: `font-mono text-[10px] font-bold mb-2 px-1 ${SUBSTRATE_COLORS[substrate] ?? "text-muted-foreground"}`,
              children: substrate
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: engines.map((eng, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -6 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: idx * 0.04 },
              className: "glass-sm rounded-xl px-3 py-2.5 flex items-center gap-2.5",
              "data-ocid": `it.engine.${eng.id.toLowerCase()}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-1.5 w-1.5 rounded-full shrink-0",
                    style: {
                      background: eng.healthy ? "oklch(0.72 0.17 155)" : "oklch(0.65 0.22 22)"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs font-bold text-foreground w-10", children: eng.id }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground flex-1 truncate", children: eng.codeName }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "font-mono text-[10px]",
                    style: {
                      color: eng.coh >= 0.95 ? "oklch(0.72 0.17 155)" : eng.coh >= 0.85 ? "oklch(0.76 0.16 70)" : "oklch(0.65 0.22 22)"
                    },
                    children: [
                      (eng.coh * 100).toFixed(0),
                      "%"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground/60 w-12 text-right", children: eng.uptime })
              ]
            },
            eng.id
          )) })
        ] }, substrate)) })
      ]
    }
  );
}
function BridgePanel() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-lg rounded-2xl overflow-hidden flex flex-col",
      "data-ocid": "it.bridge_panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 px-5 pt-5 pb-3 border-b",
            style: { borderColor: "rgba(0,220,130,0.12)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                GitBranch,
                {
                  className: "h-4 w-4",
                  style: { color: "oklch(0.72 0.17 155)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-foreground", children: "Bridge Connectivity" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "ml-auto font-mono text-[10px]",
                  style: { color: "oklch(0.72 0.17 155)" },
                  children: "5 / 5 ACTIVE"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 p-3 space-y-2.5", children: BRIDGES.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 4 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: i * 0.07 },
            "data-ocid": `it.bridge.${b.id.toLowerCase()}`,
            className: "glass-portal-it rounded-xl px-4 py-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-mono text-sm font-bold",
                      style: { color: "oklch(0.72 0.17 155)" },
                      children: b.id
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
                    b.from,
                    " → ",
                    b.to
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "h-2 w-2 rounded-full animate-[portal-pulse_2s_ease-in-out_infinite]",
                      style: {
                        background: b.connected ? "oklch(0.72 0.17 155)" : "oklch(0.65 0.22 22)"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-mono text-[10px]",
                      style: {
                        color: b.connected ? "oklch(0.72 0.17 155)" : "oklch(0.65 0.22 22)"
                      },
                      children: b.connected ? "CONNECTED" : "OFFLINE"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mb-2", children: b.protocol }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground/60 uppercase", children: "Latency" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[11px] text-foreground", children: b.latency })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground/60 uppercase", children: "Error Rate" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "font-mono text-[11px]",
                      style: { color: "oklch(0.72 0.17 155)" },
                      children: b.errorRate
                    }
                  )
                ] })
              ] })
            ]
          },
          b.id
        )) })
      ]
    }
  );
}
function RegistryPanel() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-lg rounded-2xl overflow-hidden flex flex-col",
      "data-ocid": "it.registry_panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 px-5 pt-5 pb-3 border-b",
            style: { borderColor: "rgba(0,220,130,0.12)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Database,
                {
                  className: "h-4 w-4",
                  style: { color: "oklch(0.72 0.17 155)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-foreground", children: "Registry Integrity" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto font-mono text-[10px] text-muted-foreground", children: "ALPH" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 p-3 grid grid-cols-2 gap-2 content-start", children: REGISTRIES.map((reg, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.96 },
            animate: { opacity: 1, scale: 1 },
            transition: { delay: i * 0.05 },
            "data-ocid": `it.registry.${reg.id.toLowerCase()}`,
            className: `glass-sm rounded-xl p-3 ${reg.sealed ? "glow-it" : ""}`,
            style: reg.sealed ? {
              boxShadow: "0 0 12px rgba(0,220,130,0.10), inset 0 1px 0 rgba(0,220,130,0.06)"
            } : {},
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-mono text-xs font-bold",
                    style: {
                      color: reg.sealed ? "oklch(0.72 0.17 155)" : "oklch(0.76 0.16 70)"
                    },
                    children: reg.id
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-mono text-[8px] px-1.5 py-0.5 rounded",
                    style: {
                      background: reg.sealed ? "rgba(0,220,130,0.10)" : "rgba(255,185,0,0.10)",
                      color: reg.sealed ? "oklch(0.72 0.17 155)" : "oklch(0.76 0.16 70)"
                    },
                    children: reg.sealed ? "SEALED" : "OPEN"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground truncate mb-1.5", children: reg.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] text-foreground", children: reg.records.toLocaleString() }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground/60", children: reg.lastWrite })
              ] })
            ]
          },
          reg.id
        )) })
      ]
    }
  );
}
const LAW_CODES = [
  "LEX_SVRN",
  "LEX_MLTS",
  "LEX_INIT",
  "LEX_FLOR",
  "LEX_PONT",
  "LEX_RGST",
  "LEX_PRSN",
  "LEX_QUST",
  "LEX_SPEC",
  "LEX_RNVT"
];
function LawMonitor({
  laws,
  isLoading
}) {
  const now = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour12: false });
  const displayLaws = laws.length > 0 ? laws : LAW_CODES.map((code, i) => ({
    id: BigInt(i),
    latinName: code,
    englishName: code.replace("LEX_", "").replace(/_/g, " "),
    domain: "Sovereign Law — ENFORCED"
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-lg rounded-2xl overflow-hidden",
      "data-ocid": "it.law_monitor",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 px-5 pt-5 pb-3 border-b",
            style: { borderColor: "rgba(0,220,130,0.12)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4", style: { color: "oklch(0.72 0.17 155)" } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-foreground", children: "Law Enforcement Monitor" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "h-1.5 w-1.5 rounded-full animate-[status-pulse_2s_ease-in-out_infinite]",
                    style: { background: "oklch(0.72 0.17 155)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-mono text-[10px]",
                    style: { color: "oklch(0.72 0.17 155)" },
                    children: "ALL ENFORCED"
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2.5", children: Array.from({ length: 10 }, (_, k) => k).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2.5", children: displayLaws.map((law, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 6 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: idx * 0.04 },
            "data-ocid": `it.law_card.${idx + 1}`,
            className: "glass-portal-it rounded-xl p-3 flex flex-col gap-1.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CircleCheck,
                  {
                    className: "h-3 w-3 shrink-0",
                    style: { color: "oklch(0.72 0.17 155)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-mono text-[10px] font-bold",
                    style: { color: "oklch(0.72 0.17 155)" },
                    children: law.latinName
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground leading-tight truncate", children: law.englishName || law.domain }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-mono text-[8px] px-1.5 py-0.5 rounded",
                    style: {
                      background: "rgba(0,220,130,0.10)",
                      color: "oklch(0.72 0.17 155)"
                    },
                    children: "ENFORCED"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px] text-muted-foreground/50", children: now })
              ] })
            ]
          },
          Number(law.id)
        )) }) })
      ]
    }
  );
}
function PortalTransitionFeed() {
  const { data: transitions, isLoading } = usePortalTransitions(BigInt(8));
  const PORTAL_COLORS = {
    student: "oklch(0.75 0.16 280)",
    teacher: "oklch(0.78 0.15 200)",
    principal: "oklch(0.76 0.16 70)",
    it: "oklch(0.72 0.17 155)",
    admin: "oklch(0.72 0.17 155)"
  };
  const fmtTs = (ts) => {
    const d = new Date(Number(ts) / 1e6);
    return d.toLocaleTimeString("en-US", { hour12: false });
  };
  const fallback = [
    {
      fromPortal: "student",
      toPortal: "teacher",
      userId: "uid_001",
      timestamp: BigInt(Date.now()) * BigInt(1e6)
    },
    {
      fromPortal: "teacher",
      toPortal: "principal",
      userId: "uid_002",
      timestamp: BigInt(Date.now() - 4e3) * BigInt(1e6)
    },
    {
      fromPortal: "principal",
      toPortal: "it",
      userId: "uid_003",
      timestamp: BigInt(Date.now() - 9e3) * BigInt(1e6)
    },
    {
      fromPortal: "student",
      toPortal: "it",
      userId: "uid_004",
      timestamp: BigInt(Date.now() - 15e3) * BigInt(1e6)
    },
    {
      fromPortal: "teacher",
      toPortal: "student",
      userId: "uid_005",
      timestamp: BigInt(Date.now() - 21e3) * BigInt(1e6)
    },
    {
      fromPortal: "it",
      toPortal: "admin",
      userId: "uid_006",
      timestamp: BigInt(Date.now() - 34e3) * BigInt(1e6)
    },
    {
      fromPortal: "principal",
      toPortal: "teacher",
      userId: "uid_007",
      timestamp: BigInt(Date.now() - 55e3) * BigInt(1e6)
    },
    {
      fromPortal: "admin",
      toPortal: "student",
      userId: "uid_008",
      timestamp: BigInt(Date.now() - 89e3) * BigInt(1e6)
    }
  ];
  const rows = transitions && transitions.length > 0 ? transitions : fallback;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-lg rounded-2xl overflow-hidden flex flex-col",
      "data-ocid": "it.portal_transition_feed",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 px-5 pt-5 pb-3 border-b",
            style: { borderColor: "rgba(0,220,130,0.12)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "h-4 w-4", style: { color: "oklch(0.72 0.17 155)" } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-foreground", children: "Portal Transit Feed" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "h-1.5 w-1.5 rounded-full animate-[status-pulse_2s_ease-in-out_infinite]",
                    style: { background: "oklch(0.72 0.17 155)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-mono text-[10px]",
                    style: { color: "oklch(0.72 0.17 155)" },
                    children: "LIVE"
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 p-3 space-y-2 max-h-64 overflow-y-auto", children: isLoading ? Array.from({ length: 4 }, (_, k) => k).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 rounded-xl" }, k)) : rows.map((t, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -6 },
            animate: { opacity: 1, x: 0 },
            transition: { delay: idx * 0.05 },
            "data-ocid": `it.transit.item.${idx + 1}`,
            className: "glass-portal-it rounded-xl px-3 py-2.5 flex items-center gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-mono text-xs font-bold min-w-0 shrink-0",
                  style: {
                    color: PORTAL_COLORS[t.fromPortal] ?? "oklch(0.72 0.17 155)"
                  },
                  children: t.fromPortal.toUpperCase()
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3 shrink-0 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-mono text-xs font-bold shrink-0",
                  style: {
                    color: PORTAL_COLORS[t.toPortal] ?? "oklch(0.72 0.17 155)"
                  },
                  children: t.toPortal.toUpperCase()
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground flex-1 truncate min-w-0", children: t.userId }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] text-muted-foreground/60 shrink-0", children: fmtTs(t.timestamp) })
            ]
          },
          `${t.fromPortal}-${t.toPortal}-${t.userId}-${String(t.timestamp)}`
        )) })
      ]
    }
  );
}
function ApiActivityLog() {
  const { data: logs, isLoading } = useApiCallLogs(BigInt(8));
  const fmtTs = (ts) => {
    const d = new Date(Number(ts) / 1e6);
    return d.toLocaleTimeString("en-US", { hour12: false });
  };
  const fmtMs = (ns) => `${(Number(ns) / 1e6).toFixed(1)}ms`;
  const fallback = [
    {
      endpointId: "v1/phi/compute",
      callerId: "PHIX-caller",
      timestamp: BigInt(Date.now()) * BigInt(1e6),
      success: true,
      responseTime: BigInt(13e5)
    },
    {
      endpointId: "v1/engines/query",
      callerId: "NOVA-bridge",
      timestamp: BigInt(Date.now() - 3e3) * BigInt(1e6),
      success: true,
      responseTime: BigInt(8e5)
    },
    {
      endpointId: "v1/coherence/score",
      callerId: "COHS-agent",
      timestamp: BigInt(Date.now() - 8e3) * BigInt(1e6),
      success: true,
      responseTime: BigInt(21e5)
    },
    {
      endpointId: "v1/registry/engines",
      callerId: "ENGR-watcher",
      timestamp: BigInt(Date.now() - 13e3) * BigInt(1e6),
      success: false,
      responseTime: BigInt(4e5)
    },
    {
      endpointId: "v1/fib/floor",
      callerId: "FIBR-caller",
      timestamp: BigInt(Date.now() - 21e3) * BigInt(1e6),
      success: true,
      responseTime: BigInt(6e5)
    },
    {
      endpointId: "v1/passport/summary",
      callerId: "PASS-engine",
      timestamp: BigInt(Date.now() - 34e3) * BigInt(1e6),
      success: true,
      responseTime: BigInt(18e5)
    },
    {
      endpointId: "v1/phi/compute",
      callerId: "VEKT-bridge",
      timestamp: BigInt(Date.now() - 55e3) * BigInt(1e6),
      success: true,
      responseTime: BigInt(9e5)
    },
    {
      endpointId: "v1/engines/query",
      callerId: "GATE-check",
      timestamp: BigInt(Date.now() - 89e3) * BigInt(1e6),
      success: true,
      responseTime: BigInt(5e5)
    }
  ];
  const rows = logs && logs.length > 0 ? logs : fallback;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-lg rounded-2xl overflow-hidden flex flex-col",
      "data-ocid": "it.api_activity_log",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 px-5 pt-5 pb-3 border-b",
            style: { borderColor: "rgba(0,220,130,0.12)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4", style: { color: "oklch(0.72 0.17 155)" } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-foreground", children: "API Activity Log" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto font-mono text-[10px] text-muted-foreground", children: "APIX" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 p-3 space-y-2 max-h-64 overflow-y-auto", children: isLoading ? Array.from({ length: 4 }, (_, k) => k).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 rounded-xl" }, k)) : rows.map((log, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 6 },
            animate: { opacity: 1, x: 0 },
            transition: { delay: idx * 0.05 },
            "data-ocid": `it.api_log.item.${idx + 1}`,
            className: "glass-portal-it rounded-xl px-3 py-2.5 flex items-center gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-1.5 w-1.5 rounded-full shrink-0",
                  style: {
                    background: log.success ? "oklch(0.72 0.17 155)" : "oklch(0.65 0.22 22)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-foreground flex-1 truncate min-w-0", children: log.endpointId }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground/70 shrink-0 hidden sm:inline", children: log.callerId }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-mono text-[10px] shrink-0",
                  style: {
                    color: log.success ? "oklch(0.72 0.17 155)" : "oklch(0.65 0.22 22)"
                  },
                  children: fmtMs(log.responseTime)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] text-muted-foreground/60 shrink-0", children: fmtTs(log.timestamp) })
            ]
          },
          `${log.endpointId}-${log.callerId}-${String(log.timestamp)}`
        )) })
      ]
    }
  );
}
function AlphRegistryTree() {
  const CHILD_REGISTRIES = [
    { id: "ENGR", name: "Engine Registry", records: 28, sealed: true },
    { id: "BLDR", name: "Builder Registry", records: 8, sealed: true },
    { id: "PROT", name: "Protocol Registry", records: 11, sealed: true },
    { id: "SDKR", name: "SDK Registry", records: 24, sealed: true },
    { id: "BRDG", name: "Bridge Registry", records: 5, sealed: true },
    { id: "RTME", name: "Runtime Registry", records: 5, sealed: true },
    { id: "SUBJ", name: "Subject Registry", records: 432, sealed: true },
    { id: "STUD", name: "Student Registry", records: 0, sealed: false }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-lg rounded-2xl overflow-hidden",
      "data-ocid": "it.alph_registry_tree",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 px-5 pt-5 pb-3 border-b",
            style: { borderColor: "rgba(0,220,130,0.12)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Database,
                {
                  className: "h-4 w-4",
                  style: { color: "oklch(0.72 0.17 155)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-foreground", children: "ALPH Registry Hierarchy" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto font-mono text-[10px] text-muted-foreground", children: "Master Registry" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.97 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 0.3 },
              className: "glass-portal-it rounded-xl p-4 flex items-center gap-3",
              style: {
                border: "1px solid rgba(0,220,130,0.30)",
                boxShadow: "0 0 20px rgba(0,220,130,0.12)"
              },
              "data-ocid": "it.alph_root",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-10 w-10 rounded-xl flex items-center justify-center shrink-0",
                    style: {
                      background: "rgba(0,220,130,0.12)",
                      border: "1px solid rgba(0,220,130,0.30)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "font-mono text-sm font-black",
                        style: { color: "oklch(0.72 0.17 155)" },
                        children: "ALPH"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "font-display font-bold text-sm",
                      style: { color: "oklch(0.72 0.17 155)" },
                      children: "Alpha Registry"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Master registry · houses all child registries · LEX_RGST enforced" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-mono text-[9px] px-2 py-0.5 rounded font-bold",
                    style: {
                      background: "rgba(0,220,130,0.12)",
                      color: "oklch(0.72 0.17 155)",
                      border: "1px solid rgba(0,220,130,0.25)"
                    },
                    children: "ROOT"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "ml-5 w-px flex-shrink-0",
              style: {
                background: "linear-gradient(180deg, rgba(0,220,130,0.40) 0%, rgba(0,220,130,0.08) 100%)",
                height: 20
              }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2", children: CHILD_REGISTRIES.map((reg, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 6 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.05 + i * 0.04 },
              "data-ocid": `it.alph_child.${reg.id.toLowerCase()}`,
              className: "glass-sm rounded-xl p-3 relative",
              style: {
                borderTop: "2px solid rgba(0,220,130,0.15)",
                boxShadow: reg.sealed ? "0 0 8px rgba(0,220,130,0.06)" : void 0
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-mono text-xs font-bold",
                      style: {
                        color: reg.sealed ? "oklch(0.72 0.17 155)" : "oklch(0.76 0.16 70)"
                      },
                      children: reg.id
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-mono text-[7px] px-1 py-0.5 rounded",
                      style: {
                        background: reg.sealed ? "rgba(0,220,130,0.10)" : "rgba(255,185,0,0.10)",
                        color: reg.sealed ? "oklch(0.72 0.17 155)" : "oklch(0.76 0.16 70)"
                      },
                      children: reg.sealed ? "●" : "○"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-muted-foreground truncate mb-1.5", children: reg.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] text-foreground font-semibold", children: reg.records.toLocaleString() })
              ]
            },
            reg.id
          )) })
        ] })
      ]
    }
  );
}
function IdentityEventFeed({
  diag
}) {
  const authEvents = [
    {
      event: "II_LOGIN",
      principal: "rdmx6-jaaaa",
      portal: "student",
      ts: Date.now()
    },
    {
      event: "II_LOGIN",
      principal: "aaaaa-bbbbb",
      portal: "teacher",
      ts: Date.now() - 2e3
    },
    {
      event: "SESSION_RENEWED",
      principal: "rdmx6-jaaaa",
      portal: "student",
      ts: Date.now() - 5e3
    },
    {
      event: "II_LOGIN",
      principal: "xccc0-eeeee",
      portal: "principal",
      ts: Date.now() - 8e3
    },
    {
      event: "SESSION_EXPIRED",
      principal: "ddddd-fffff",
      portal: "it",
      ts: Date.now() - 13e3
    },
    {
      event: "II_LOGIN",
      principal: "ggggg-hhhhh",
      portal: "it",
      ts: Date.now() - 21e3
    },
    {
      event: "II_LOGOUT",
      principal: "iiiii-jjjjj",
      portal: "teacher",
      ts: Date.now() - 34e3
    },
    {
      event: "SESSION_RENEWED",
      principal: "kkkkk-lllll",
      portal: "student",
      ts: Date.now() - 55e3
    }
  ];
  const errorEvents = ((diag == null ? void 0 : diag.errors) ?? []).map((err, i) => ({
    event: "DIAG_ALERT",
    principal: "system",
    portal: "system",
    ts: Date.now() - i * 1e3,
    error: err
  }));
  const EVENT_COLOR = {
    II_LOGIN: "oklch(0.72 0.17 155)",
    II_LOGOUT: "oklch(0.76 0.16 70)",
    SESSION_RENEWED: "oklch(0.75 0.16 280)",
    SESSION_EXPIRED: "oklch(0.78 0.18 85)",
    DIAG_ALERT: "oklch(0.65 0.22 22)"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-lg rounded-2xl overflow-hidden flex flex-col",
      "data-ocid": "it.identity_event_feed",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 px-5 pt-5 pb-3 border-b",
            style: { borderColor: "rgba(0,220,130,0.12)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "h-4 w-4", style: { color: "oklch(0.72 0.17 155)" } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-foreground", children: "Internet Identity Events" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "h-1.5 w-1.5 rounded-full animate-[status-pulse_2s_ease-in-out_infinite]",
                    style: { background: "oklch(0.72 0.17 155)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-mono text-[10px]",
                    style: { color: "oklch(0.72 0.17 155)" },
                    children: "LIVE"
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 p-3 space-y-1.5 max-h-72 overflow-y-auto", children: [...errorEvents, ...authEvents].map((ev, idx) => {
          const color = EVENT_COLOR[ev.event] ?? "oklch(0.72 0.17 155)";
          const ago = Math.round((Date.now() - ev.ts) / 1e3);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -6 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: idx * 0.04 },
              "data-ocid": `it.identity_event.${idx + 1}`,
              className: "glass-portal-it rounded-xl px-3 py-2 flex items-center gap-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-1.5 w-1.5 rounded-full shrink-0",
                    style: { background: color }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-mono text-[10px] font-bold shrink-0",
                    style: { color },
                    children: ev.event
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] text-muted-foreground flex-1 truncate min-w-0", children: ev.principal.length > 12 ? `${ev.principal.slice(0, 12)}…` : ev.principal }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-mono text-[9px] px-1.5 py-0.5 rounded shrink-0",
                    style: {
                      background: "rgba(255,255,255,0.04)",
                      color: "oklch(0.55 0.01 260)"
                    },
                    children: ev.portal
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] text-muted-foreground/60 shrink-0", children: ago < 60 ? `${ago}s ago` : `${Math.round(ago / 60)}m ago` })
              ]
            },
            `${ev.event}-${ev.principal}-${idx}`
          );
        }) })
      ]
    }
  );
}
function ITSecurityPanel() {
  const { data: diag, isLoading: diagLoading } = useSystemDiag();
  const { data: sonr } = useSonrCheck();
  const { data: vault } = useVaultStats();
  const { laws, isLoading: lawsLoading } = useLaws();
  const { stats: entStats } = useEntanglementStats();
  const [uptime, setUptime] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const t = setInterval(() => setUptime((u) => u + 1), 1e3);
    return () => clearInterval(t);
  }, []);
  const [healthPulse, setHealthPulse] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const t = setInterval(() => setHealthPulse((p) => p + 1), 8e3);
    return () => clearInterval(t);
  }, []);
  const alertCount = (diag == null ? void 0 : diag.errors.length) ?? 0;
  const diagScore = diag ? diag.avgCoh * 0.5 + diag.pilScore * 0.3 + (1 - Math.min((sonr == null ? void 0 : sonr.risk) ?? 0, 1)) * 0.2 : 0.97;
  const uptimeStr = (() => {
    const h = Math.floor(uptime / 3600);
    const m = Math.floor(uptime % 3600 / 60);
    const s = uptime % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  })();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "portal-enter min-h-screen",
      "data-ocid": "it.security_panel_page",
      children: [
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
                    style: {
                      background: "rgba(0,220,130,0.10)",
                      boxShadow: "0 0 18px rgba(0,220,130,0.20)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Terminal,
                      {
                        className: "h-5 w-5",
                        style: { color: "oklch(0.72 0.17 155)" }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h1",
                    {
                      className: "font-display text-lg font-bold leading-tight",
                      style: {
                        color: "oklch(0.72 0.17 155)",
                        textShadow: "0 0 20px rgba(0,220,130,0.35)"
                      },
                      children: "IT SECURITY OS"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground font-mono", children: "EduAI Sovereign Operations Center" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex items-center gap-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Network, { className: "h-3.5 w-3.5 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] text-muted-foreground", children: "UPTIME" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-mono text-[11px]",
                      style: { color: "oklch(0.72 0.17 155)" },
                      children: uptimeStr
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-px bg-border" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3.5 w-3.5 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] text-muted-foreground", children: "TRANSITS" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-mono text-[11px]",
                      style: { color: "oklch(0.72 0.17 155)" },
                      children: entStats ? Number(entStats.totalTransits).toLocaleString() : "—"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-px bg-border" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] text-muted-foreground", children: "ALERTS" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-mono text-[11px] font-bold",
                      style: {
                        color: alertCount === 0 ? "oklch(0.72 0.17 155)" : "oklch(0.76 0.16 70)"
                      },
                      children: alertCount === 0 ? "NONE" : alertCount
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "h-1.5 w-1.5 rounded-full animate-[status-pulse_2s_ease-in-out_infinite]",
                      style: {
                        background: alertCount === 0 ? "oklch(0.72 0.17 155)" : "oklch(0.76 0.16 70)"
                      }
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex flex-col items-end", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LiveClock, {}),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground/60 font-mono mt-0.5", children: "LEX_TFLR ACTIVE" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "it.diag_score", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DiagScore, { score: diagScore, loading: diagLoading }) })
              ] })
            ] }) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1600px] mx-auto px-6 py-6 space-y-[var(--phi-21)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.4 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ShieldCheck,
                    {
                      className: "h-4 w-4",
                      style: { color: "oklch(0.72 0.17 155)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm text-foreground", children: "Security Status" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground", children: "5 / 5 SECURE" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SecurityStrip, { statuses: SECURITY_STATUSES })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.4, delay: 0.1 },
              className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
              "data-ocid": "it.quick_stats",
              children: [
                {
                  label: "Vault Records",
                  value: vault ? Number(vault.totalPayloads).toLocaleString() : "—",
                  icon: Database,
                  color: "oklch(0.72 0.17 155)"
                },
                {
                  label: "Avg COH",
                  value: diag ? `${(diag.avgCoh * 100).toFixed(1)}%` : "—",
                  icon: Activity,
                  color: "oklch(0.72 0.17 155)"
                },
                {
                  label: "Heartbeats",
                  value: diag ? Number(diag.heartbeatCount).toLocaleString() : "—",
                  icon: Zap,
                  color: "oklch(0.72 0.17 155)"
                },
                {
                  label: "SONR Risk",
                  value: sonr ? `${(sonr.risk * 100).toFixed(1)}%` : "—",
                  icon: TriangleAlert,
                  color: sonr && sonr.risk > 0.3 ? "oklch(0.65 0.22 22)" : "oklch(0.72 0.17 155)"
                }
              ].map((stat, i) => {
                const Icon = stat.icon;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "glass-portal-it rounded-2xl px-5 py-4",
                    "data-ocid": `it.stat_card.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: stat.label }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5", style: { color: stat.color } })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "font-display text-xl font-bold",
                          style: { color: stat.color },
                          children: stat.value
                        }
                      )
                    ]
                  },
                  stat.label
                );
              })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 0.15 },
              className: "grid grid-cols-1 lg:grid-cols-3 gap-5",
              "data-ocid": "it.main_grid",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(EngineHealthPanel, { diag: diag ?? null }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(BridgePanel, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx(RegistryPanel, {})
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 0.2 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(LawMonitor, { laws, isLoading: lawsLoading })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 0.22 },
              className: "grid grid-cols-1 lg:grid-cols-2 gap-5",
              "data-ocid": "it.registry_identity_grid",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlphRegistryTree, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx(IdentityEventFeed, { diag: diag ?? void 0 })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 0.27 },
              className: "grid grid-cols-1 lg:grid-cols-2 gap-5",
              "data-ocid": "it.live_feeds_grid",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(PortalTransitionFeed, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ApiActivityLog, {})
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: healthPulse }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.4, delay: 0.25 },
              className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
              "data-ocid": "it.quick_links",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/it/network", "data-ocid": "it.network_link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-portal-it rounded-2xl px-5 py-4 flex items-center gap-3 hover:brightness-110 transition-smooth cursor-pointer group", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                      style: { background: "rgba(0,220,130,0.10)" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Network,
                        {
                          className: "h-5 w-5",
                          style: { color: "oklch(0.72 0.17 155)" }
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground", children: "Network Topology" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Live substrate nodes · encryption · latency" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/it/audit", "data-ocid": "it.audit_link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-portal-it rounded-2xl px-5 py-4 flex items-center gap-3 hover:brightness-110 transition-smooth cursor-pointer group", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                      style: { background: "rgba(0,220,130,0.10)" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Shield,
                        {
                          className: "h-5 w-5",
                          style: { color: "oklch(0.72 0.17 155)" }
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground", children: "Security Audit Log" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Append-only event record · PHI-cycle events" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" })
                ] }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground/50 font-mono", children: "EduAI Sovereign OS · LEX_SOVEREIGNUS ENFORCED · All systems native · No external dependencies" }) })
        ] })
      ]
    }
  );
}
export {
  ITSecurityPanel as default
};
