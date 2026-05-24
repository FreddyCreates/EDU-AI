import { j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { B as Button } from "./button-CWs7EcLL.js";
import { u as useSystemDiag, a as useVaultStats, b as useAllBuilderStats } from "./use-diag-CPsjDtM1.js";
import { d as useEntanglementStats } from "./use-entanglements-B-bwtovY.js";
import { d as useInternetIdentity, k as Shield, g as Activity, D as Database, U as Users } from "./index-BivnQ6bB.js";
import { L as Link } from "./router-D6GUppNf.js";
import { L as Lock } from "./lock-Cp-0nqtC.js";
import { F as FlaskConical } from "./flask-conical-CotWXcIT.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./query-8urnerR0.js";
import "./motion-BK2wxCtX.js";
function AdminPage() {
  const { isAuthenticated, login, loginStatus } = useInternetIdentity();
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLoginPrompt, { onLogin: login, loginStatus });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminDashboard, {});
}
function AdminLoginPrompt({
  onLogin,
  loginStatus
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-screen flex items-center justify-center px-4",
      "data-ocid": "admin.login_page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "glass-xl rounded-3xl p-10 max-w-md w-full text-center space-y-6",
          style: { borderColor: "oklch(0.68 0.18 280 / 0.25)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-16 h-16 rounded-2xl flex items-center justify-center",
                style: {
                  background: "oklch(0.68 0.18 280 / 0.15)",
                  border: "1px solid oklch(0.68 0.18 280 / 0.35)",
                  boxShadow: "0 0 32px oklch(0.68 0.18 280 / 0.2)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Lock,
                  {
                    className: "w-7 h-7",
                    style: { color: "oklch(0.68 0.18 280)" }
                  }
                )
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground tracking-wide", children: "ADMIN OS" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: "Sovereign platform control. Sign in with Internet Identity to access system diagnostics, registry, and controls." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-4 text-left space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm font-medium text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Shield,
                  {
                    className: "w-4 h-4",
                    style: { color: "oklch(0.68 0.18 280)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Administrator Access" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-xs text-muted-foreground space-y-1 ml-6 list-disc", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Engine registry and diagnostics" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Entanglement network monitor" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Textbook digester and grade vault" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "w-full h-12 font-mono tracking-widest uppercase text-sm",
                style: {
                  background: "oklch(0.68 0.18 280)",
                  color: "oklch(0.07 0.01 260)",
                  boxShadow: "0 0 20px oklch(0.68 0.18 280 / 0.3)"
                },
                onClick: onLogin,
                disabled: loginStatus === "logging-in",
                "data-ocid": "admin.login_button",
                children: loginStatus === "logging-in" ? "Connecting..." : "Sign In"
              }
            )
          ]
        }
      )
    }
  );
}
function AdminDashboard() {
  const { data: diag } = useSystemDiag();
  const { data: vault } = useVaultStats();
  const { data: builders, isLoading: buildersLoading } = useAllBuilderStats();
  const { stats: entStats } = useEntanglementStats();
  const systemScore = diag ? Number(diag.pilScore) : 0;
  const activeCount = entStats ? Number(entStats.activeCount) : 0;
  const totalPayloads = vault ? Number(vault.totalPayloads) : 0;
  const builderCount = builders ? builders.length : 0;
  const ringCirc = 2 * Math.PI * 40;
  const ringPct = systemScore / 89;
  const ringOffset = ringCirc - ringPct * ringCirc;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", "data-ocid": "admin.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-lg sticky top-0 z-40 border-b border-white/[0.07]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative w-8 h-8 rounded-lg flex items-center justify-center",
            style: {
              background: "oklch(0.68 0.18 280 / 0.18)",
              border: "1px solid oklch(0.68 0.18 280 / 0.35)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Activity,
                {
                  className: "w-4 h-4",
                  style: { color: "oklch(0.68 0.18 280)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full animate-pulse",
                  style: {
                    background: "oklch(0.68 0.18 280)",
                    boxShadow: "0 0 6px oklch(0.68 0.18 280)"
                  }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-extrabold text-foreground tracking-widest text-sm uppercase", children: "ADMIN OS" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-[10px] font-mono",
              style: { color: "oklch(0.68 0.18 280 / 0.8)" },
              children: "Sovereign Platform Control"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground uppercase tracking-widest hidden sm:block", children: "EduAI v3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/digester", "data-ocid": "admin.digester_link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "glass-sm rounded-lg px-3 py-2 text-xs font-mono hover:border-white/20 transition-glass flex items-center gap-1.5",
            style: { color: "oklch(0.68 0.18 280)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "w-3.5 h-3.5" }),
              " DIGT"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/factory-setup", "data-ocid": "admin.factory_link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "glass-sm rounded-lg px-3 py-2 text-xs font-mono hover:border-white/20 transition-glass flex items-center gap-1.5",
            style: { color: "oklch(0.75 0.16 70)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "w-3.5 h-3.5" }),
              " FACTORY"
            ]
          }
        ) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 py-8 space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
          "data-ocid": "admin.kpi_row",
          children: [
            {
              label: "Builder Count",
              value: builderCount,
              icon: Users,
              color: "oklch(0.68 0.18 280)"
            },
            {
              label: "DIAG Score",
              value: systemScore,
              icon: Shield,
              color: "oklch(0.72 0.20 200)"
            },
            {
              label: "Active Links",
              value: activeCount,
              icon: Activity,
              color: "oklch(0.70 0.17 162)"
            },
            {
              label: "Vault Seeds",
              value: totalPayloads,
              icon: Database,
              color: "oklch(0.76 0.18 84)"
            }
          ].map(({ label, value, icon: Icon, color }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass rounded-2xl p-5 glass-shimmer group",
              "data-ocid": `admin.kpi.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-9 h-9 rounded-xl flex items-center justify-center",
                      style: {
                        background: `${color.replace(")", " / 0.12)")}`,
                        border: `1px solid ${color.replace(")", " / 0.25)")}`
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4", style: { color } })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60", children: "LIVE" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-display font-extrabold text-foreground leading-none", children: value }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1.5 uppercase tracking-wider", children: label })
              ]
            },
            label
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "admin.builders_section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              className: "text-[10px] font-mono uppercase tracking-widest",
              style: { color: "oklch(0.68 0.18 280)" },
              children: "Silver Builder Registry"
            }
          ),
          buildersLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "space-y-2",
              "data-ocid": "admin.builders_loading_state",
              children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "glass rounded-xl h-20 animate-pulse"
                },
                i
              ))
            }
          ) : !builders || builders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "glass rounded-xl p-8 text-center",
              "data-ocid": "admin.builders_empty_state",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No builders registered." })
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: builders.map(([codeName, stats], idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass rounded-xl p-4 group hover:border-white/15 transition-glass",
              "data-ocid": `admin.builder_card.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-8 h-8 rounded-lg flex items-center justify-center",
                      style: {
                        background: "oklch(0.68 0.18 280 / 0.12)",
                        border: "1px solid oklch(0.68 0.18 280 / 0.25)"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-[10px] font-bold font-mono",
                          style: { color: "oklch(0.68 0.18 280)" },
                          children: codeName.slice(0, 2)
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-sm text-foreground", children: codeName })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-1.5 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-sm rounded-lg p-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground", children: Number(stats.sessionsProcessed) || 0 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-muted-foreground", children: "Sessions" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-sm rounded-lg p-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground", children: Number(stats.seedsSealed) || 0 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-muted-foreground", children: "Seeds" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-sm rounded-lg p-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground", children: Number(stats.workflowCompletions) || 0 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-muted-foreground", children: "Flows" })
                  ] })
                ] })
              ]
            },
            codeName
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "admin.entanglement_section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                className: "text-[10px] font-mono uppercase tracking-widest",
                style: { color: "oklch(0.70 0.17 162)" },
                children: "Entanglement Network"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/entanglements",
                "data-ocid": "admin.entanglement_full_view_link",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-[10px] font-mono hover:text-foreground transition-colors",
                    style: { color: "oklch(0.70 0.17 162)" },
                    children: "VIEW ALL →"
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass rounded-2xl p-5 space-y-4", children: [
            {
              label: "Active Links",
              value: activeCount,
              color: "oklch(0.70 0.17 162)"
            },
            {
              label: "Total Transits",
              value: entStats ? Number(entStats.totalTransits) : 0,
              color: "oklch(0.68 0.18 280)"
            },
            {
              label: "Avg COH Δ",
              value: entStats ? Number(entStats.avgCoherenceDelta) : 0,
              color: "oklch(0.76 0.18 84)"
            }
          ].map(({ label, value, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass-sm rounded-xl p-4 flex items-center justify-between",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono uppercase tracking-wider", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-2xl font-display font-extrabold",
                    style: { color },
                    children: value >= 0 && label.includes("COH") ? `+${value}` : value
                  }
                )
              ]
            },
            label
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "admin.health_section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              className: "text-[10px] font-mono uppercase tracking-widest",
              style: { color: "oklch(0.72 0.20 200)" },
              children: "System Health"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-5 flex flex-col items-center gap-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "100", height: "100", className: "-rotate-90", role: "img", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "System health score" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "circle",
                  {
                    cx: "50",
                    cy: "50",
                    r: "40",
                    fill: "none",
                    stroke: "oklch(0.20 0.015 260)",
                    strokeWidth: "8"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "circle",
                  {
                    cx: "50",
                    cy: "50",
                    r: "40",
                    fill: "none",
                    stroke: "oklch(0.72 0.20 200)",
                    strokeWidth: "8",
                    strokeLinecap: "round",
                    strokeDasharray: String(ringCirc),
                    strokeDashoffset: String(ringOffset),
                    style: {
                      filter: "drop-shadow(0 0 6px oklch(0.72 0.20 200 / 0.6))"
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-display font-extrabold text-foreground", children: systemScore }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono text-muted-foreground uppercase", children: "/ 89" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-sm rounded-xl px-4 py-2 text-center w-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1", children: "Sovereignty" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "w-2 h-2 rounded-full bg-emerald-400",
                    style: { boxShadow: "0 0 6px oklch(0.72 0.18 162 / 0.8)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono font-bold text-emerald-400", children: (diag == null ? void 0 : diag.status) ?? "NOMINAL" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-sm rounded-xl px-4 py-2 text-center w-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1", children: "Active Engines" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-display font-bold text-foreground", children: diag ? Number(diag.heartbeatCount) : "--" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
          "data-ocid": "admin.action_row",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/digester", "data-ocid": "admin.digester_action_card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "glass-lg rounded-2xl p-6 group hover:border-white/15 transition-glass cursor-pointer glass-shimmer",
                style: { borderColor: "oklch(0.68 0.18 280 / 0.25)" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0",
                      style: {
                        background: "oklch(0.68 0.18 280 / 0.15)",
                        border: "1px solid oklch(0.68 0.18 280 / 0.3)"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Database,
                        {
                          className: "w-5 h-5",
                          style: { color: "oklch(0.68 0.18 280)" }
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-sm", children: "Textbook Digester" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "DIGT Engine — Feed curriculum, extract grade-gated content" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto font-mono text-muted-foreground group-hover:text-foreground transition-colors text-sm", children: "→" })
                ] })
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/factory-setup", "data-ocid": "admin.factory_action_card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "glass-lg rounded-2xl p-6 group hover:border-white/15 transition-glass cursor-pointer glass-shimmer",
                style: { borderColor: "oklch(0.75 0.16 70 / 0.25)" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0",
                      style: {
                        background: "oklch(0.75 0.16 70 / 0.15)",
                        border: "1px solid oklch(0.75 0.16 70 / 0.3)"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        FlaskConical,
                        {
                          className: "w-5 h-5",
                          style: { color: "oklch(0.75 0.16 70)" }
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-sm", children: "Factory Setup" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Bootstrap school deployment, create demo students" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto font-mono text-muted-foreground group-hover:text-foreground transition-colors text-sm", children: "→" })
                ] })
              }
            ) })
          ]
        }
      )
    ] })
  ] });
}
export {
  AdminPage as default
};
