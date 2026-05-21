import { j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { i as createLucideIcon, S as Skeleton, k as Shield } from "./index-BivnQ6bB.js";
import { u as useSilverBuilders, a as useBuilderStats } from "./use-silver-builders-PlomfRhq.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./query-8urnerR0.js";
import "./motion-BK2wxCtX.js";
import "./router-D6GUppNf.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9", key: "eefl8a" }],
  ["path", { d: "m18 15 4-4", key: "16gjal" }],
  [
    "path",
    {
      d: "m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-2.26a6 6 0 0 0-4.202-1.756L9 2.96l.92.82A6.18 6.18 0 0 1 12 8.4V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5",
      key: "b7pghm"
    }
  ]
];
const Hammer = createLucideIcon("hammer", __iconNode);
const BUILDER_MANIFEST = [
  {
    id: "SVRN",
    domain: "Sovereignty",
    accent: "oklch(0.72 0.17 155)",
    glow: "rgba(0,220,130,0.18)",
    border: "rgba(0,220,130,0.22)",
    chip: "rgba(0,220,130,0.08)"
  },
  {
    id: "INTL",
    domain: "Intelligence",
    accent: "oklch(0.68 0.18 280)",
    glow: "rgba(160,100,255,0.18)",
    border: "rgba(160,100,255,0.22)",
    chip: "rgba(160,100,255,0.08)"
  },
  {
    id: "MMRY",
    domain: "Memory",
    accent: "oklch(0.78 0.22 200)",
    glow: "rgba(0,210,255,0.18)",
    border: "rgba(0,210,255,0.22)",
    chip: "rgba(0,210,255,0.08)"
  },
  {
    id: "KNOW",
    domain: "Knowledge",
    accent: "oklch(0.75 0.16 70)",
    glow: "rgba(255,185,0,0.18)",
    border: "rgba(255,185,0,0.22)",
    chip: "rgba(255,185,0,0.08)"
  },
  {
    id: "BRDG",
    domain: "Bridge",
    accent: "oklch(0.72 0.17 155)",
    glow: "rgba(0,220,130,0.18)",
    border: "rgba(0,220,130,0.22)",
    chip: "rgba(0,220,130,0.08)"
  },
  {
    id: "RGTM",
    domain: "Registry",
    accent: "oklch(0.68 0.18 280)",
    glow: "rgba(160,100,255,0.18)",
    border: "rgba(160,100,255,0.22)",
    chip: "rgba(160,100,255,0.08)"
  },
  {
    id: "AUTH",
    domain: "Auth",
    accent: "oklch(0.75 0.16 70)",
    glow: "rgba(255,185,0,0.18)",
    border: "rgba(255,185,0,0.22)",
    chip: "rgba(255,185,0,0.08)"
  },
  {
    id: "ANLX",
    domain: "Analytics",
    accent: "oklch(0.78 0.22 200)",
    glow: "rgba(0,210,255,0.18)",
    border: "rgba(0,210,255,0.22)",
    chip: "rgba(0,210,255,0.08)"
  }
];
function relativeTime(ms) {
  const diff = Date.now() - ms;
  if (diff < 6e4) return "just now";
  if (diff < 36e5) return `${Math.floor(diff / 6e4)}m ago`;
  if (diff < 864e5) return `${Math.floor(diff / 36e5)}h ago`;
  return `${Math.floor(diff / 864e5)}d ago`;
}
function StatPill({
  label,
  value,
  accent
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-black font-mono", style: { color: accent }, children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-muted-foreground uppercase tracking-wider", children: label })
  ] });
}
function BuilderCard({
  manifest,
  stats,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `builders.card.${index}`,
      className: "glass-sm rounded-2xl p-5 space-y-4 transition-glass hover:-translate-y-0.5 glass-shimmer",
      style: {
        borderColor: manifest.border,
        boxShadow: `0 4px 24px ${manifest.glow}, 0 0 0 1px ${manifest.border}`
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-mono text-xl font-black tracking-widest px-3 py-1 rounded-xl inline-block",
                style: {
                  background: manifest.chip,
                  color: manifest.accent,
                  border: `1px solid ${manifest.border}`
                },
                children: manifest.id
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3 h-3", style: { color: manifest.accent } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-xs font-mono",
                  style: { color: manifest.accent },
                  children: manifest.domain
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "text-[10px] font-mono shrink-0",
              style: {
                borderColor: manifest.border,
                color: manifest.accent,
                background: manifest.chip
              },
              children: "ARGENTUM"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "grid grid-cols-3 gap-2 pt-3",
            style: { borderTop: `1px solid ${manifest.border}` },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatPill,
                {
                  label: "Sessions",
                  value: stats ? Number(stats.sessionsProcessed) : "—",
                  accent: manifest.accent
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatPill,
                {
                  label: "Seeds",
                  value: stats ? Number(stats.seedsSealed) : "—",
                  accent: manifest.accent
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatPill,
                {
                  label: "Workflows",
                  value: stats ? Number(stats.workflowCompletions) : "—",
                  accent: manifest.accent
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] font-mono text-muted-foreground", children: [
          "Last active:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: manifest.accent }, children: stats ? relativeTime(Number(stats.lastActiveAt)) : "—" })
        ] })
      ]
    }
  );
}
function BuilderRegistry() {
  const { builders, isLoading: buildersLoading } = useSilverBuilders();
  const { stats: allStats, isLoading: statsLoading } = useBuilderStats();
  const isLoading = buildersLoading || statsLoading;
  const statsMap = /* @__PURE__ */ new Map();
  if (Array.isArray(allStats)) {
    for (const [id, s] of allStats) {
      statsMap.set(id, s);
    }
  }
  const sorted = [...BUILDER_MANIFEST].sort((a, b) => {
    const sa = statsMap.get(a.id);
    const sb = statsMap.get(b.id);
    return Number((sb == null ? void 0 : sb.sessionsProcessed) ?? 0n) - Number((sa == null ? void 0 : sa.sessionsProcessed) ?? 0n);
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-5xl mx-auto px-4 py-10 space-y-8",
      "data-ocid": "builders.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-xl rounded-3xl p-8 relative overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 pointer-events-none",
              style: {
                background: "radial-gradient(ellipse 70% 60% at 80% -10%, rgba(255,185,0,0.12) 0%, transparent 70%)"
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
                    background: "rgba(255,185,0,0.12)",
                    border: "1px solid rgba(255,185,0,0.25)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Hammer,
                    {
                      className: "w-5 h-5",
                      style: { color: "oklch(0.75 0.16 70)" }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase", children: "EduAI · BLDR" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-black tracking-tight text-foreground", children: "SILVER BUILDERS" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "text-xs font-mono px-2 py-0.5 rounded",
                      style: {
                        background: "rgba(255,185,0,0.1)",
                        color: "oklch(0.75 0.16 70)",
                        border: "1px solid rgba(255,185,0,0.2)"
                      },
                      children: [
                        BUILDER_MANIFEST.length,
                        " registered"
                      ]
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
              {
                label: "Builders",
                value: BUILDER_MANIFEST.length,
                color: "oklch(0.75 0.16 70)"
              },
              {
                label: "Active Now",
                value: builders.length,
                color: "oklch(0.72 0.17 155)"
              },
              {
                label: "Registry",
                value: "BLDR",
                color: "oklch(0.68 0.18 280)"
              },
              {
                label: "Class",
                value: "ARGENTUM",
                color: "oklch(0.78 0.22 200)"
              }
            ].map(({ label, value, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "glass-sm rounded-xl px-3 py-2.5 text-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-base font-black font-display",
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
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
            "data-ocid": "builders.loading_state",
            children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-44 rounded-2xl" }, `skel-${i + 1}`))
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: sorted.map((m, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          BuilderCard,
          {
            manifest: m,
            stats: statsMap.get(m.id) ?? null,
            index: idx + 1
          },
          m.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass-sm rounded-2xl px-5 py-4 flex items-center gap-3",
            style: { borderColor: "rgba(255,185,0,0.15)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Shield,
                {
                  className: "w-4 h-4 shrink-0",
                  style: { color: "oklch(0.75 0.16 70)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-mono text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.75 0.16 70)" }, children: "LEX_RGST" }),
                " · Silver Builders are registered with 4-letter lock names. Identity is permanent. Names are sealed at first registration."
              ] })
            ]
          }
        )
      ]
    }
  );
}
export {
  BuilderRegistry as default
};
