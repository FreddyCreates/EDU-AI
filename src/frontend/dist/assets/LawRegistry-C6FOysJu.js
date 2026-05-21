import { j as jsxRuntimeExports, r as reactExports } from "./vendor-1quNMNNh.js";
import { u as useLaws } from "./use-laws-C__sTr1Z.js";
import { L as Lock } from "./lock-Cp-0nqtC.js";
import { k as Shield } from "./index-BivnQ6bB.js";
import { m as motion, A as AnimatePresence } from "./motion-BK2wxCtX.js";
import { C as ChevronDown } from "./chevron-down-B2BSsDRF.js";
import { C as ChevronRight } from "./chevron-right-neFioPkE.js";
import "./query-8urnerR0.js";
import "./router-D6GUppNf.js";
function LawRow({ law, index }) {
  const [expanded, setExpanded] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3, delay: index * 0.04 },
      "data-ocid": `law_registry.law_card.${index + 1}`,
      className: "glass-sm rounded-2xl overflow-hidden transition-glass",
      style: { borderLeft: "4px solid oklch(0.72 0.17 155)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setExpanded((o) => !o),
            className: "w-full flex items-center gap-4 px-5 py-4 text-left touch-target hover:bg-white/[0.03] transition-smooth",
            "data-ocid": `law_registry.law_toggle.${index + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-mono text-xs font-black tracking-widest shrink-0 px-2 py-0.5 rounded-lg",
                  style: {
                    background: "rgba(0,220,130,0.10)",
                    color: "oklch(0.72 0.17 155)",
                    border: "1px solid rgba(0,220,130,0.22)"
                  },
                  children: law.latinName
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "hidden sm:flex items-center gap-1 text-[10px] font-mono shrink-0",
                  style: { color: "oklch(0.72 0.17 155)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3" }),
                    "SEALED"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 min-w-0 font-display font-semibold text-sm text-foreground truncate", children: law.englishName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "hidden md:block text-[10px] font-mono text-muted-foreground shrink-0 px-2 py-0.5 rounded-md",
                  style: {
                    background: "rgba(0,220,130,0.06)",
                    border: "1px solid rgba(0,220,130,0.12)"
                  },
                  children: law.domain
                }
              ),
              expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground shrink-0" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: expanded && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.22 },
            className: "overflow-hidden",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "px-5 pb-5 pt-1 space-y-3",
                "data-ocid": `law_registry.law_text.${index + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "glass rounded-xl p-4",
                      style: { borderColor: "rgba(0,220,130,0.12)" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed", children: law.description })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "Attribution:" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-[10px] font-mono font-semibold",
                        style: { color: "oklch(0.72 0.17 155)" },
                        children: law.attribution
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground ml-auto", children: [
                      "Domain:",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.72 0.17 155)" }, children: law.domain })
                    ] })
                  ] })
                ]
              }
            )
          }
        ) })
      ]
    }
  );
}
function LawRegistry() {
  const { laws, isLoading } = useLaws();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-4xl mx-auto px-4 py-10 space-y-8",
      "data-ocid": "law_registry.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-xl rounded-3xl p-8 relative overflow-hidden glass-shimmer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 pointer-events-none",
              style: {
                background: "radial-gradient(ellipse 70% 60% at 80% -10%, rgba(0,220,130,0.14) 0%, transparent 70%)"
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
                    border: "1px solid rgba(0,220,130,0.28)",
                    boxShadow: "0 0 20px rgba(0,220,130,0.18)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Lock,
                    {
                      className: "w-5 h-5",
                      style: { color: "oklch(0.72 0.17 155)" }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase", children: "EduAI · PROT" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-black tracking-tight text-foreground", children: "PROTOCOL REGISTRY · LEX" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Lock,
                    {
                      className: "w-4 h-4 shrink-0",
                      style: { color: "oklch(0.72 0.17 155)" }
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
              {
                label: "Total Laws",
                value: laws.length,
                color: "oklch(0.72 0.17 155)"
              },
              {
                label: "Sealed",
                value: laws.length,
                color: "oklch(0.72 0.17 155)"
              },
              {
                label: "Authority",
                value: "On-Chain",
                color: "oklch(0.68 0.18 280)"
              },
              {
                label: "Status",
                value: "Immutable",
                color: "oklch(0.75 0.16 70)"
              }
            ].map(({ label, value, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "glass rounded-xl px-3 py-2.5 text-center",
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-px flex-1",
              style: {
                background: "linear-gradient(90deg, transparent, rgba(0,220,130,0.3))"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "font-mono text-[10px] tracking-[0.3em] uppercase",
              style: { color: "oklch(0.72 0.17 155)" },
              children: "CODEX · LEGUM · SOVEREIGN"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-px flex-1",
              style: {
                background: "linear-gradient(90deg, rgba(0,220,130,0.3), transparent)"
              }
            }
          )
        ] }),
        isLoading && laws.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "law_registry.loading_state", children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "glass-sm rounded-2xl h-16 relative overflow-hidden",
            style: { borderLeft: "4px solid rgba(0,220,130,0.3)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute inset-0",
                style: {
                  background: "linear-gradient(90deg, transparent, rgba(0,220,130,0.06), transparent)",
                  animation: "glass-shimmer 1.8s ease-in-out infinite",
                  animationDelay: `${i * 0.15}s`
                }
              }
            )
          },
          `skel-${i + 1}`
        )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "law_registry.laws_section", children: laws.map((law, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(LawRow, { law, index: idx }, String(law.id))) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass-sm rounded-2xl px-5 py-4 flex items-center gap-3",
            style: { borderColor: "rgba(0,220,130,0.15)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Shield,
                {
                  className: "w-4 h-4 shrink-0",
                  style: { color: "oklch(0.72 0.17 155)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-mono text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.72 0.17 155)" }, children: "LEX_OMNIS" }),
                " · Every law is a living doctrine. Every doctrine is a seed. Every seed compounds into sovereign intelligence."
              ] })
            ]
          }
        )
      ]
    }
  );
}
export {
  LawRegistry as default
};
