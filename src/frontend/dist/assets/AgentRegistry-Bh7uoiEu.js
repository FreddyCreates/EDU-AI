import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { a as useAgentRegistry } from "./use-agents-YLCyuBjV.js";
import { L as Link } from "./router-D6GUppNf.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { i as createLucideIcon } from "./index-BivnQ6bB.js";
import { S as Search } from "./search-ChBsk90y.js";
import { L as Lock } from "./lock-Cp-0nqtC.js";
import { S as ShieldCheck } from "./shield-check-5IduDo33.js";
import "./query-8urnerR0.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 8V4H8", key: "hb8ula" }],
  ["rect", { width: "16", height: "12", x: "4", y: "8", rx: "2", key: "enze0r" }],
  ["path", { d: "M2 14h2", key: "vft8re" }],
  ["path", { d: "M20 14h2", key: "4cs60a" }],
  ["path", { d: "M15 13v2", key: "1xurst" }],
  ["path", { d: "M9 13v2", key: "rq6x2g" }]
];
const Bot = createLucideIcon("bot", __iconNode);
const SOVEREIGN_AGENTS = [
  {
    id: "SAGE",
    name: "Sage",
    role: "Explainer",
    substrate: "ICPM",
    domain: "Concept Translation",
    coh: 89,
    sessions: 3421,
    status: "active",
    routeId: "sage"
  },
  {
    id: "QUIL",
    name: "Quill",
    role: "Quizmaster",
    substrate: "ICPM",
    domain: "Assessment",
    coh: 82,
    sessions: 2198,
    status: "active",
    routeId: "quill"
  },
  {
    id: "SPRK",
    name: "Spark",
    role: "Encourager",
    substrate: "EART",
    domain: "Motivation",
    coh: 95,
    sessions: 4102,
    status: "active",
    routeId: "spark"
  },
  {
    id: "NOVX",
    name: "Nova",
    role: "Curator",
    substrate: "JLIA",
    domain: "Cross-Subject Links",
    coh: 77,
    sessions: 1883,
    status: "active",
    routeId: "nova"
  },
  {
    id: "ATLS",
    name: "Atlas",
    role: "Guide",
    substrate: "ICPM",
    domain: "Curriculum Navigation",
    coh: 91,
    sessions: 2750,
    status: "active",
    routeId: "atlas"
  },
  {
    id: "ECHO",
    name: "Echo",
    role: "Assessor",
    substrate: "EMRT",
    domain: "Mastery Detection",
    coh: 68,
    sessions: 1245,
    status: "idle",
    routeId: "echo"
  }
];
const SUBSTRATE_ACCENT = {
  ICPM: { color: "oklch(0.78 0.22 200)", ring: "rgba(0,210,255,0.25)" },
  JLIA: { color: "oklch(0.68 0.18 280)", ring: "rgba(160,100,255,0.25)" },
  EART: { color: "oklch(0.75 0.16 70)", ring: "rgba(255,185,0,0.25)" },
  EMRT: { color: "oklch(0.72 0.17 155)", ring: "rgba(0,220,130,0.25)" }
};
function CohBar({ value }) {
  const fibColor = value >= 89 ? "oklch(0.72 0.17 155)" : value >= 55 ? "oklch(0.75 0.16 70)" : "oklch(0.65 0.22 22)";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "w-full h-1.5 rounded-full overflow-hidden",
      style: { background: "rgba(255,255,255,0.08)" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-full rounded-full transition-smooth",
          style: { width: `${value}%`, background: fibColor }
        }
      )
    }
  );
}
function AgentCard({
  agent,
  index
}) {
  const accent = SUBSTRATE_ACCENT[agent.substrate] ?? SUBSTRATE_ACCENT.ICPM;
  const isActive = agent.status === "active";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 13 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.32, delay: index * 0.05 },
      "data-ocid": `agent_registry.agent_card.${index}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/agents/$agentName",
          params: { agentName: agent.routeId },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass rounded-2xl p-5 flex flex-col gap-4 transition-smooth hover:-translate-y-1 cursor-pointer glass-shimmer",
              style: {
                boxShadow: `0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px ${accent.ring}, inset 0 1px 0 rgba(255,255,255,0.06)`
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "glass-sm rounded-xl px-2.5 py-1.5 font-mono text-lg font-black tracking-widest",
                      style: { color: accent.color, letterSpacing: "0.15em" },
                      children: agent.id
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "w-1.5 h-1.5 rounded-full animate-pulse",
                        style: {
                          background: isActive ? "oklch(0.72 0.17 155)" : "oklch(0.55 0.01 260)"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-[11px] font-mono uppercase tracking-widest",
                        style: {
                          color: isActive ? "oklch(0.72 0.17 155)" : "oklch(0.45 0.01 260)"
                        },
                        children: isActive ? "ACTIVE" : "IDLE"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base text-foreground", children: agent.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: agent.domain })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "glass-sm text-[11px] font-mono px-2 py-0.5 rounded-full",
                      style: {
                        color: accent.color,
                        border: `1px solid ${accent.ring}`
                      },
                      children: agent.substrate
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "glass-sm text-[11px] px-2 py-0.5 rounded-full text-muted-foreground", children: agent.role })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono uppercase tracking-widest text-muted-foreground", children: "COH AVG" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-[10px] font-mono",
                        style: { color: accent.color },
                        children: agent.coh
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CohBar, { value: agent.coh })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex justify-between items-center pt-1 border-t",
                    style: { borderColor: "rgba(255,255,255,0.06)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono uppercase tracking-widest text-muted-foreground", children: "Sessions" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-foreground", children: agent.sessions.toLocaleString() })
                    ]
                  }
                )
              ]
            }
          )
        }
      )
    }
  );
}
function AgentRegistry() {
  useAgentRegistry();
  const [search, setSearch] = reactExports.useState("");
  const [subFilter, setSubFilter] = reactExports.useState(null);
  const agents = SOVEREIGN_AGENTS;
  const filtered = agents.filter((a) => {
    const matchesSearch = !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.role.toLowerCase().includes(search.toLowerCase());
    const matchesSub = !subFilter || a.substrate === subFilter;
    return matchesSearch && matchesSub;
  });
  const substrates = Array.from(new Set(agents.map((a) => a.substrate)));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-6xl mx-auto px-5 py-10 space-y-8",
      "data-ocid": "agent_registry.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: -8 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4 },
            className: "space-y-2",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "glass rounded-xl p-2.5",
                  style: { boxShadow: "0 0 24px rgba(160,100,255,0.18)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Bot,
                    {
                      className: "w-5 h-5",
                      style: { color: "oklch(0.68 0.18 280)" }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-black text-2xl tracking-tight text-foreground", children: "SOVEREIGN AGENTS" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-mono text-muted-foreground uppercase tracking-widest", children: [
                  "Agent Registry · ",
                  agents.length,
                  " Deployed"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "glass-sm rounded-full px-3 py-1 text-xs font-mono font-bold",
                  style: {
                    color: "oklch(0.68 0.18 280)",
                    border: "1px solid rgba(160,100,255,0.3)"
                  },
                  children: agents.length
                }
              ) })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass rounded-2xl p-4 flex flex-col sm:flex-row gap-3",
            "data-ocid": "agent_registry.filter_strip",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    value: search,
                    onChange: (e) => setSearch(e.target.value),
                    placeholder: "Search agents…",
                    "data-ocid": "agent_registry.search_input",
                    className: "w-full glass-sm rounded-xl pl-8 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-white/20 transition-smooth"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "agent_registry.filter_all_tab",
                    onClick: () => setSubFilter(null),
                    className: "px-3 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-smooth",
                    style: {
                      background: !subFilter ? "rgba(255,255,255,0.1)" : "transparent",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: !subFilter ? "oklch(0.95 0.005 260)" : "oklch(0.55 0.01 260)"
                    },
                    children: "ALL"
                  }
                ),
                substrates.map((s) => {
                  const ac = SUBSTRATE_ACCENT[s] ?? SUBSTRATE_ACCENT.ICPM;
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": `agent_registry.filter_${s.toLowerCase()}_tab`,
                      onClick: () => setSubFilter(subFilter === s ? null : s),
                      className: "px-3 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-smooth",
                      style: {
                        background: subFilter === s ? `${ac.ring}` : "transparent",
                        border: `1px solid ${ac.ring}`,
                        color: subFilter === s ? ac.color : "oklch(0.55 0.01 260)"
                      },
                      children: s
                    },
                    s
                  );
                })
              ] })
            ]
          }
        ),
        filtered.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
            "data-ocid": "agent_registry.agents_section",
            children: filtered.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(AgentCard, { agent: a, index: i + 1 }, a.id))
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass rounded-2xl p-12 flex flex-col items-center gap-4",
            "data-ocid": "agent_registry.agents_empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-sm rounded-2xl p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-8 h-8 text-muted-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm text-muted-foreground uppercase tracking-widest", children: "No agents registered" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass-sm rounded-xl px-5 py-3 flex items-center justify-between",
            "data-ocid": "agent_registry.footer",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono uppercase tracking-widest text-muted-foreground", children: "ALPH · ENGR · Agent Layer" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ShieldCheck,
                  {
                    className: "w-3 h-3",
                    style: { color: "oklch(0.68 0.18 280)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-[10px] font-mono",
                    style: { color: "oklch(0.68 0.18 280)" },
                    children: "LEX_SVRN ENFORCED"
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
}
export {
  AgentRegistry as default
};
