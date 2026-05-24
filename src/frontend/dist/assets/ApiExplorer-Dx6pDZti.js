import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { B as Button } from "./button-CWs7EcLL.js";
import { S as Skeleton, D as Database, c as cn, Z as Zap } from "./index-BivnQ6bB.js";
import { u as useApiEndpoints, a as useApiStats, b as useExecuteQuery, c as useQueryHistory } from "./use-apix-BV8BqXWi.js";
import { L as Lock } from "./lock-Cp-0nqtC.js";
import { P as Plus } from "./plus-DLM4cYLL.js";
import { T as Trash2 } from "./trash-2-BYpnggdZ.js";
import { A as AnimatePresence, m as motion } from "./motion-BK2wxCtX.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./query-8urnerR0.js";
import "./router-D6GUppNf.js";
const QUERY_TARGETS = [
  "engines",
  "laws",
  "entanglements",
  "passport",
  "builders",
  "curriculum",
  "mltv",
  "sdk"
];
const FIB_LIMITS = [5, 8, 13, 21, 34, 55];
const PURPLE = "oklch(0.72 0.19 280)";
const PURPLE_GLOW = "rgba(160,100,255,0.18)";
const PURPLE_BORDER = "rgba(160,100,255,0.25)";
function methodBadgeStyle(method) {
  return method === "UPDATE" ? {
    background: "rgba(245,155,0,0.12)",
    color: "oklch(0.76 0.18 84)",
    border: "1px solid rgba(245,155,0,0.25)"
  } : {
    background: "rgba(160,100,255,0.12)",
    color: PURPLE,
    border: `1px solid ${PURPLE_BORDER}`
  };
}
function EndpointCard({
  endpoint,
  selected,
  onClick
}) {
  const ver = endpoint.version ?? "v1";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      "data-ocid": "api_explorer.endpoint_card",
      className: cn(
        "w-full text-left rounded-xl p-3 transition-smooth hover:bg-white/[0.03] touch-target",
        selected ? "glass" : "glass-sm"
      ),
      style: selected ? {
        border: `1px solid ${PURPLE_BORDER}`,
        boxShadow: `0 0 16px ${PURPLE_GLOW}`
      } : void 0,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs font-bold", style: { color: PURPLE }, children: endpoint.id }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [
            endpoint.requiresAuth && /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3 w-3 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-[10px] font-mono px-1.5 py-0.5 rounded",
                style: methodBadgeStyle(endpoint.method),
                children: endpoint.method
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: endpoint.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-mono text-muted-foreground truncate mt-0.5", children: endpoint.path }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: endpoint.domain }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground/60", children: String(ver) })
        ] })
      ]
    }
  );
}
function QueryBuilder({ endpoint }) {
  const [target, setTarget] = reactExports.useState(QUERY_TARGETS[0]);
  const [limit, setLimit] = reactExports.useState(13);
  const [filters, setFilters] = reactExports.useState([]);
  const [result, setResult] = reactExports.useState(null);
  const [historyOpen, setHistoryOpen] = reactExports.useState(false);
  const executeMutation = useExecuteQuery();
  const { data: history } = useQueryHistory();
  function addFilter() {
    setFilters((f) => [
      ...f,
      { id: crypto.randomUUID(), field: "", operator: "eq", value: "" }
    ]);
  }
  function removeFilter(i) {
    setFilters((f) => f.filter((_, idx) => idx !== i));
  }
  function updateFilter(i, key, val) {
    setFilters(
      (f) => f.map((row, idx) => idx === i ? { ...row, [key]: val } : row)
    );
  }
  async function execute() {
    const tuples = filters.map((r) => [
      r.field,
      r.operator,
      r.value
    ]);
    const res = await executeMutation.mutateAsync({
      target,
      filters: tuples,
      limit: BigInt(limit)
    });
    setResult(res);
  }
  const inputStyle = {
    background: "rgba(12,14,28,0.80)",
    borderColor: PURPLE_BORDER,
    backdropFilter: "blur(8px)",
    color: "inherit"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "api_explorer.query_builder", children: [
    endpoint ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass rounded-xl p-4 relative overflow-hidden",
        style: { border: `1px solid ${PURPLE_BORDER}` },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 pointer-events-none",
              style: {
                background: "linear-gradient(135deg, rgba(160,100,255,0.06) 0%, transparent 60%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-mono text-sm font-bold",
                  style: { color: PURPLE },
                  children: endpoint.id
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-[10px] font-mono px-1.5 py-0.5 rounded",
                  style: methodBadgeStyle(endpoint.method),
                  children: endpoint.method
                }
              ),
              endpoint.requiresAuth && /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3.5 w-3.5 text-muted-foreground" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: endpoint.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: endpoint.description })
          ] })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "glass-sm rounded-xl p-6 text-center",
        style: { border: "2px dashed rgba(160,100,255,0.18)" },
        "data-ocid": "api_explorer.empty_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Select an endpoint from the list to begin" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass-xl rounded-2xl p-5 space-y-4",
        style: { border: `1px solid ${PURPLE_BORDER}` },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono tracking-widest text-muted-foreground uppercase", children: "Execute Query" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "query-target-select",
                className: "text-xs text-muted-foreground w-14 shrink-0",
                children: "Target"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                id: "query-target-select",
                "data-ocid": "api_explorer.target_select",
                value: target,
                onChange: (e) => setTarget(e.target.value),
                className: "flex-1 rounded-xl border px-3 py-2 text-sm focus:outline-none",
                style: inputStyle,
                children: QUERY_TARGETS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: t, children: t }, t))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono", children: "Filters" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "sm",
                  onClick: addFilter,
                  "data-ocid": "api_explorer.add_filter_button",
                  className: "h-7 text-xs gap-1 font-mono",
                  style: {
                    background: "rgba(160,100,255,0.10)",
                    color: PURPLE,
                    border: `1px solid ${PURPLE_BORDER}`
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" }),
                    " Add Filter"
                  ]
                }
              )
            ] }),
            filters.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  placeholder: "field",
                  value: row.field,
                  onChange: (e) => updateFilter(i, "field", e.target.value),
                  className: "w-28 rounded-lg border px-2 py-1.5 text-xs focus:outline-none",
                  style: inputStyle
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  value: row.operator,
                  onChange: (e) => updateFilter(i, "operator", e.target.value),
                  className: "w-20 rounded-lg border px-2 py-1.5 text-xs focus:outline-none",
                  style: inputStyle,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "eq", children: "eq" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "gt", children: "gt" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "lt", children: "lt" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "contains", children: "contains" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  placeholder: "value",
                  value: row.value,
                  onChange: (e) => updateFilter(i, "value", e.target.value),
                  className: "flex-1 rounded-lg border px-2 py-1.5 text-xs focus:outline-none",
                  style: inputStyle
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "h-7 w-7 flex items-center justify-center rounded-lg text-muted-foreground hover:text-destructive transition-smooth",
                  onClick: () => removeFilter(i),
                  "aria-label": "Remove filter",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
                }
              )
            ] }, row.id))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "query-limit-select",
                className: "text-xs text-muted-foreground w-14 shrink-0",
                children: "Limit"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                id: "query-limit-select",
                "data-ocid": "api_explorer.limit_select",
                value: limit,
                onChange: (e) => setLimit(Number(e.target.value)),
                className: "w-24 rounded-xl border px-3 py-2 text-sm focus:outline-none",
                style: inputStyle,
                children: FIB_LIMITS.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: l, children: l }, l))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: execute,
              disabled: executeMutation.isPending,
              "data-ocid": "api_explorer.execute_button",
              className: "w-full flex items-center justify-center gap-2 rounded-xl py-3 font-mono text-sm font-bold transition-smooth",
              style: {
                background: executeMutation.isPending ? "rgba(160,100,255,0.08)" : "rgba(160,100,255,0.18)",
                color: PURPLE,
                border: `1px solid ${PURPLE_BORDER}`,
                boxShadow: executeMutation.isPending ? void 0 : `0 0 24px ${PURPLE_GLOW}`
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4" }),
                executeMutation.isPending ? "Executing..." : "Execute"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: result && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
        "data-ocid": "api_explorer.results_panel",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass-xl rounded-2xl p-5 space-y-3",
            style: { border: `1px solid ${PURPLE_BORDER}` },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono tracking-widest text-muted-foreground uppercase", children: "Results" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "text-[10px] font-mono px-2 py-0.5 rounded",
                      style: {
                        background: "rgba(255,255,255,0.06)",
                        color: "oklch(0.55 0.01 260)",
                        border: "1px solid rgba(255,255,255,0.08)"
                      },
                      children: [
                        String(result.totalFound),
                        " found"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "text-[10px] font-mono px-2 py-0.5 rounded",
                      style: {
                        background: "rgba(160,100,255,0.10)",
                        color: PURPLE,
                        border: `1px solid ${PURPLE_BORDER}`
                      },
                      children: [
                        String(result.executionCycles),
                        " cycles"
                      ]
                    }
                  )
                ] })
              ] }),
              result.items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-sm text-muted-foreground text-center py-6",
                  "data-ocid": "api_explorer.results_empty_state",
                  children: "No items matched."
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 max-h-80 overflow-y-auto pr-1", children: result.items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "glass-sm rounded-xl p-3",
                  "data-ocid": `api_explorer.result_item.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground truncate flex-1", children: item.id }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-[10px] font-mono px-1.5 py-0.5 rounded",
                          style: {
                            background: "rgba(160,100,255,0.12)",
                            color: PURPLE,
                            border: `1px solid ${PURPLE_BORDER}`
                          },
                          children: String(item.score)
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-foreground whitespace-pre-wrap break-all", children: item.data })
                  ]
                },
                item.id
              )) })
            ]
          }
        )
      }
    ) }),
    history && history.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "api_explorer.history_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: "flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-smooth mb-2 font-mono",
          onClick: () => setHistoryOpen((p) => !p),
          children: [
            "Query History (",
            history.length,
            ")",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: historyOpen ? "▲" : "▼" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: historyOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { height: 0, opacity: 0 },
          animate: { height: "auto", opacity: 1 },
          exit: { height: 0, opacity: 0 },
          transition: { duration: 0.22 },
          className: "overflow-hidden",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: history.slice(0, 5).map((r, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass-sm rounded-xl p-3 flex items-center gap-3",
              "data-ocid": `api_explorer.history_item.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground truncate flex-1", children: r.queryId }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-[10px] font-mono px-1.5 py-0.5 rounded shrink-0",
                    style: {
                      background: "rgba(255,255,255,0.06)",
                      color: "oklch(0.55 0.01 260)",
                      border: "1px solid rgba(255,255,255,0.08)"
                    },
                    children: r.target
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-[10px] font-mono px-1.5 py-0.5 rounded shrink-0",
                    style: {
                      background: "rgba(160,100,255,0.10)",
                      color: PURPLE,
                      border: `1px solid ${PURPLE_BORDER}`
                    },
                    children: String(r.totalFound)
                  }
                )
              ]
            },
            r.queryId
          )) })
        }
      ) })
    ] })
  ] });
}
function ApiExplorer() {
  const { data: endpoints, isLoading: endpointsLoading } = useApiEndpoints();
  const { data: apiStats, isLoading: statsLoading } = useApiStats();
  const [selectedEndpoint, setSelectedEndpoint] = reactExports.useState(
    null
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "mx-auto max-w-7xl px-4 sm:px-6 py-8 space-y-6",
      "data-ocid": "api_explorer.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass-xl rounded-3xl p-8 relative overflow-hidden glass-shimmer",
            style: { border: `1px solid ${PURPLE_BORDER}` },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 pointer-events-none",
                  style: {
                    background: "radial-gradient(ellipse 70% 60% at 80% -10%, rgba(160,100,255,0.14) 0%, transparent 70%)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase", children: "EduAI · APIX · QRYX" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h1",
                  {
                    className: "text-3xl font-display font-black tracking-tight mt-1",
                    style: {
                      color: PURPLE,
                      textShadow: `0 0 32px ${PURPLE_GLOW}`
                    },
                    children: "SOVEREIGN API GATEWAY"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "All endpoints versioned and sealed · LEX_RGST enforced" })
              ] })
            ]
          }
        ),
        statsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: ["sk-1", "sk-2", "sk-3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-36 rounded-xl" }, k)) }) : apiStats ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex flex-wrap gap-3",
            "data-ocid": "api_explorer.stats_bar",
            children: [
              { label: "Total Endpoints", value: apiStats.totalEndpoints },
              { label: "Total Calls", value: apiStats.totalCalls },
              { label: "Active", value: apiStats.activeEndpoints }
            ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-2 glass-sm rounded-xl px-4 py-2",
                style: { border: `1px solid ${PURPLE_BORDER}` },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "h-3.5 w-3.5", style: { color: PURPLE } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground", children: label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-sm font-display font-bold",
                      style: { color: PURPLE },
                      children: String(value)
                    }
                  )
                ]
              },
              label
            ))
          }
        ) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[20rem_1fr] gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass-xl rounded-2xl p-4",
              style: { border: `1px solid ${PURPLE_BORDER}` },
              "data-ocid": "api_explorer.endpoint_list",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono tracking-widest text-muted-foreground uppercase mb-3", children: "Endpoints" }),
                endpointsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ["sk-e1", "sk-e2", "sk-e3", "sk-e4", "sk-e5"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-sm rounded-xl h-20" }, k)) }) : endpoints && endpoints.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 max-h-[70vh] overflow-y-auto pr-1", children: endpoints.map((ep) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  EndpointCard,
                  {
                    endpoint: ep,
                    selected: (selectedEndpoint == null ? void 0 : selectedEndpoint.id) === ep.id,
                    onClick: () => setSelectedEndpoint(ep)
                  },
                  ep.id
                )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "text-center py-16",
                    "data-ocid": "api_explorer.empty_state",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Database,
                        {
                          className: "h-10 w-10 mx-auto mb-3",
                          style: { color: PURPLE_GLOW }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No endpoints registered yet." })
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "api_explorer.builder_panel", children: /* @__PURE__ */ jsxRuntimeExports.jsx(QueryBuilder, { endpoint: selectedEndpoint }) })
        ] })
      ]
    }
  );
}
export {
  ApiExplorer as default
};
