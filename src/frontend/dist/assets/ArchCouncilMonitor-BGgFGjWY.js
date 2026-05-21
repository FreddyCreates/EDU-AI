import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { B as Button } from "./button-CWs7EcLL.js";
import { T as Textarea } from "./textarea-B0lupW8l.js";
import { u as useEngines } from "./use-engines-DqR-N7RV.js";
import { f as useActor, h as createActor, Z as Zap, b as Star } from "./index-BivnQ6bB.js";
import { a as useQuery, u as useQueryClient, b as useMutation } from "./query-8urnerR0.js";
import { S as Sparkles } from "./sparkles-C3IEEH24.js";
import { m as motion, A as AnimatePresence } from "./motion-BK2wxCtX.js";
import { B as Brain } from "./brain-BiTGGu73.js";
import { F as FlaskConical } from "./flask-conical-CotWXcIT.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./router-D6GUppNf.js";
function useMLTVStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["mltv-stats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMLTVStats();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5e3
  });
}
function useRecentMLTVResponses() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["mltv-recent"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRecentMLTVResponses(BigInt(8));
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 3e3
  });
}
function useFireArchCouncil() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      queryText,
      domain
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.fireArchCouncil(queryText, domain);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mltv-recent"] });
      queryClient.invalidateQueries({ queryKey: ["mltv-stats"] });
    }
  });
}
const DOMAINS = [
  "Mathematics",
  "Science",
  "Language Arts",
  "History",
  "Logic",
  "Architecture"
];
const COUNCIL_IDS = ["COGT", "META", "AUTN"];
const VOICE_META = {
  COGT: {
    label: "Cognition",
    icon: Brain,
    glowColor: "rgba(245, 155, 0, 0.20)",
    textColor: "oklch(0.76 0.18 84)"
  },
  META: {
    label: "Meta-Think",
    icon: FlaskConical,
    glowColor: "rgba(245, 155, 0, 0.15)",
    textColor: "oklch(0.72 0.16 90)"
  },
  AUTN: {
    label: "Autonomous",
    icon: Zap,
    glowColor: "rgba(245, 155, 0, 0.12)",
    textColor: "oklch(0.80 0.14 78)"
  }
};
const AMBER = "oklch(0.76 0.18 84)";
const AMBER_GLOW = "rgba(245, 155, 0, 0.18)";
const AMBER_BORDER = "rgba(245, 155, 0, 0.25)";
function EngineCouncilCard({
  codeName,
  fullName,
  domain,
  mathFoundation,
  lessonsAvailable
}) {
  const meta = VOICE_META[codeName];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-xl rounded-2xl p-6 relative overflow-hidden flex-1 min-w-0",
      style: {
        border: `1px solid ${AMBER_BORDER}`,
        boxShadow: "0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(245,155,0,0.08), inset 0 1px 0 rgba(245,155,0,0.06)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${(meta == null ? void 0 : meta.glowColor) ?? AMBER_GLOW} 0%, transparent 70%)`
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-mono text-3xl font-black tracking-widest",
                style: { color: AMBER },
                children: codeName
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-[10px] font-mono px-2 py-0.5 rounded-lg ml-auto",
                style: {
                  background: "rgba(0,255,100,0.10)",
                  color: "oklch(0.72 0.17 155)",
                  border: "1px solid rgba(0,255,100,0.18)"
                },
                children: "● ACTIVE"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground mb-1", children: fullName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "inline-block text-[10px] font-mono px-2 py-0.5 rounded-lg mb-3",
              style: {
                background: "rgba(245,155,0,0.08)",
                color: AMBER,
                border: `1px solid ${AMBER_BORDER}`
              },
              children: domain
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono leading-relaxed mb-3", children: mathFoundation }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "Lessons:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-sm font-display font-bold",
                style: { color: AMBER },
                children: lessonsAvailable.length
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function VoiceCard({
  voice,
  isNovel,
  pathLabel,
  isSelected
}) {
  const meta = isNovel ? null : VOICE_META[voice.engine];
  const confidence = Number(voice.confidence);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass rounded-xl p-4 relative overflow-hidden transition-all duration-200",
      style: {
        borderLeft: `3px solid ${isNovel ? AMBER : (meta == null ? void 0 : meta.textColor) ?? AMBER}`,
        borderColor: isSelected ? AMBER : isNovel ? AMBER_BORDER : void 0,
        boxShadow: isSelected ? `0 0 16px ${AMBER_GLOW}` : void 0
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          isNovel ? /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4", style: { color: AMBER } }) : meta && /* @__PURE__ */ jsxRuntimeExports.jsx(meta.icon, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-xs font-bold uppercase tracking-widest",
              style: {
                color: isNovel ? AMBER : (meta == null ? void 0 : meta.textColor) ?? "oklch(0.76 0.18 84)"
              },
              children: isNovel ? "★ EMERGENT VOICE" : `${voice.engine} · ${(meta == null ? void 0 : meta.label) ?? ""}`
            }
          ),
          pathLabel && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "ml-auto text-[9px] font-mono px-2 py-0.5 rounded font-bold",
              style: {
                background: pathLabel.includes("Novel") ? "rgba(245,155,0,0.18)" : "rgba(245,155,0,0.08)",
                color: AMBER,
                border: `1px solid ${AMBER_BORDER}`
              },
              children: [
                pathLabel.includes("Novel") ? "★ " : "",
                pathLabel
              ]
            }
          ),
          !pathLabel && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded",
              style: {
                background: confidence >= 55 ? "rgba(245,155,0,0.12)" : "rgba(255,255,255,0.05)",
                color: confidence >= 55 ? AMBER : "oklch(0.55 0.01 260)",
                border: confidence >= 55 ? `1px solid ${AMBER_BORDER}` : "1px solid rgba(255,255,255,0.08)"
              },
              children: confidence
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: voice.answer }),
        voice.mathBasis && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground mt-2 font-mono", children: [
          "∿ ",
          voice.mathBasis
        ] }),
        isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-2 right-2 text-[8px] font-mono px-1.5 py-0.5 rounded font-bold",
            style: {
              background: "rgba(245,155,0,0.20)",
              color: AMBER,
              border: `1px solid ${AMBER_BORDER}`
            },
            children: "SELECTED"
          }
        )
      ]
    }
  );
}
function ResponseCard({ response }) {
  const ts = new Date(Number(response.timestamp) / 1e6);
  const paths = [
    { label: "Path A", voice: response.voices[0] },
    { label: "Path B", voice: response.voices[1] },
    { label: "Path C (Novel)", voice: response.novelVoice, isNovel: true }
  ].filter((p) => p.voice !== void 0);
  const extraVoices = response.voices.slice(2);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.35, ease: "easeOut" },
      className: "glass-xl rounded-2xl p-6 space-y-4 relative overflow-hidden",
      style: { border: `1px solid ${AMBER_BORDER}` },
      "data-ocid": "arch_council.response_card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              background: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(245,155,0,0.08) 0%, transparent 70%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground line-clamp-1 flex-1", children: response.queryId }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-[10px] font-mono px-2 py-0.5 rounded-lg",
                style: {
                  background: "rgba(255,255,255,0.06)",
                  color: "oklch(0.55 0.01 260)",
                  border: "1px solid rgba(255,255,255,0.08)"
                },
                children: ts.toLocaleTimeString()
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-[10px] font-mono px-2 py-0.5 rounded-lg",
                style: {
                  background: "rgba(245,155,0,0.12)",
                  color: AMBER,
                  border: `1px solid ${AMBER_BORDER}`
                },
                children: [
                  "COH ",
                  String(response.totalCoherence)
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-[9px] font-mono px-2 py-0.5 rounded-lg font-bold",
                style: {
                  background: "rgba(245,155,0,0.08)",
                  color: AMBER,
                  border: `1px solid ${AMBER_BORDER}`
                },
                children: [
                  paths.length,
                  " paths · 1 novel"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: paths.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            VoiceCard,
            {
              voice: p.voice,
              isNovel: p.isNovel,
              pathLabel: p.label,
              isSelected: i === 0
            },
            p.label
          )) }),
          extraVoices.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3", children: extraVoices.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx(VoiceCard, { voice: v }, v.voiceId)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground text-right mt-3", children: [
            "fib-floored at F(",
            String(response.fibFlooredAt),
            ")"
          ] })
        ] })
      ]
    }
  );
}
function AccordionRecentRow({ response }) {
  var _a;
  const [open, setOpen] = reactExports.useState(false);
  const ts = new Date(Number(response.timestamp) / 1e6);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-sm rounded-xl overflow-hidden",
      "data-ocid": "arch_council.recent_row",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "w-full flex items-center gap-3 px-4 py-3 hover:bg-white/[0.03] transition-smooth text-left touch-target",
            onClick: () => setOpen((p) => !p),
            "aria-expanded": open,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground w-28 shrink-0 truncate", children: response.queryId }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-[10px] font-mono px-1.5 py-0.5 rounded shrink-0",
                  style: {
                    background: "rgba(255,255,255,0.06)",
                    color: "oklch(0.55 0.01 260)",
                    border: "1px solid rgba(255,255,255,0.08)"
                  },
                  children: ((_a = response.voices[0]) == null ? void 0 : _a.engine) ?? "—"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "text-[10px] font-mono px-2 py-0.5 rounded-lg shrink-0",
                  style: {
                    background: "rgba(245,155,0,0.12)",
                    color: AMBER,
                    border: `1px solid ${AMBER_BORDER}`
                  },
                  children: [
                    "COH ",
                    String(response.totalCoherence)
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground shrink-0", children: ts.toLocaleTimeString() }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: open ? "▲" : "▼" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.22 },
            className: "overflow-hidden",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
              response.voices.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx(VoiceCard, { voice: v }, v.voiceId)),
              /* @__PURE__ */ jsxRuntimeExports.jsx(VoiceCard, { voice: response.novelVoice, isNovel: true })
            ] })
          }
        ) })
      ]
    }
  );
}
function ArchCouncilMonitor() {
  const [queryText, setQueryText] = reactExports.useState("");
  const [domain, setDomain] = reactExports.useState("Mathematics");
  const [liveResponse, setLiveResponse] = reactExports.useState(null);
  const { data: mltvStats, isLoading: statsLoading } = useMLTVStats();
  const { data: recentResponses } = useRecentMLTVResponses();
  const fireMutation = useFireArchCouncil();
  const { engines } = useEngines();
  const councilEngines = (engines ?? []).filter(
    (e) => COUNCIL_IDS.includes(e.codeName)
  );
  const totalEngines = (engines == null ? void 0 : engines.length) ?? 0;
  async function handleFire() {
    if (!queryText.trim()) return;
    const res = await fireMutation.mutateAsync({ queryText, domain });
    setLiveResponse(res);
    setQueryText("");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "mx-auto max-w-7xl px-4 sm:px-6 py-8 space-y-8",
      "data-ocid": "arch_council.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass-xl rounded-3xl p-8 relative overflow-hidden glass-shimmer",
            style: { border: `1px solid ${AMBER_BORDER}` },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 pointer-events-none",
                  style: {
                    background: "radial-gradient(ellipse 70% 60% at 80% -10%, rgba(245,155,0,0.14) 0%, transparent 70%)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-wrap items-start justify-between gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase", children: "EduAI · COGT · META · AUTN" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h1",
                    {
                      className: "text-3xl font-display font-black tracking-tight",
                      style: {
                        color: AMBER,
                        textShadow: `0 0 32px ${AMBER_GLOW}`
                      },
                      children: "ARCH COUNCIL"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-0.5", children: "Sovereign Intelligence · Live Session Monitor" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "font-mono text-[10px] px-3 py-1.5 rounded-xl",
                    style: {
                      background: "rgba(245,155,0,0.10)",
                      color: AMBER,
                      border: `1px solid ${AMBER_BORDER}`,
                      boxShadow: `0 0 16px ${AMBER_GLOW}`
                    },
                    "data-ocid": "arch_council.lex_badge",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3 inline mr-1.5" }),
                      "LEX_MULTIVOX ACTIVE"
                    ]
                  }
                ) })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono tracking-[0.25em] text-muted-foreground uppercase mb-3", children: "Council Members" }),
          councilEngines.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex gap-4 flex-wrap",
              "data-ocid": "arch_council.council_engines",
              children: councilEngines.map((eng) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                EngineCouncilCard,
                {
                  codeName: eng.codeName,
                  fullName: eng.fullName,
                  domain: eng.domain,
                  mathFoundation: eng.mathFoundation,
                  lessonsAvailable: eng.lessonsAvailable
                },
                eng.codeName
              ))
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4", children: COUNCIL_IDS.map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "glass-xl rounded-2xl h-44 flex-1",
              style: { border: `1px solid ${AMBER_BORDER}` },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full relative overflow-hidden rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0",
                  style: {
                    background: "linear-gradient(90deg, transparent, rgba(245,155,0,0.05), transparent)",
                    animation: "glass-shimmer 1.8s ease-in-out infinite"
                  }
                }
              ) })
            },
            id
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.98 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.4 },
            "data-ocid": "arch_council.multivox_banner",
            className: "glass-xl rounded-2xl relative overflow-hidden",
            style: {
              border: `2px solid ${AMBER_BORDER}`,
              boxShadow: `0 0 32px ${AMBER_GLOW}, inset 0 1px 0 rgba(245,155,0,0.10)`
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 pointer-events-none",
                  style: {
                    background: "linear-gradient(135deg, rgba(245,155,0,0.10) 0%, transparent 50%, rgba(245,155,0,0.04) 100%)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative px-6 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                    style: {
                      background: "rgba(245,155,0,0.15)",
                      border: `1px solid ${AMBER_BORDER}`,
                      boxShadow: `0 0 16px ${AMBER_GLOW}`
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5", style: { color: AMBER } })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "font-mono text-[11px] font-bold uppercase tracking-[0.25em] mb-1",
                      style: { color: AMBER },
                      children: "LEX_MULTIVOX · Architecture Council Law"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "font-display text-base font-bold",
                      style: { color: AMBER, textShadow: `0 0 20px ${AMBER_GLOW}` },
                      children: "The architecture council always returns multiple answers plus a novel one — never a single path."
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mt-3", children: [
                    ["Path A", "Path B", "Path C (Novel)"].map((label, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "text-[10px] font-mono px-2.5 py-1 rounded-lg",
                        style: {
                          background: i === 2 ? "rgba(245,155,0,0.18)" : "rgba(245,155,0,0.08)",
                          color: i === 2 ? AMBER : "oklch(0.72 0.14 84)",
                          border: `1px solid ${i === 2 ? AMBER_BORDER : "rgba(245,155,0,0.12)"}`
                        },
                        children: [
                          i === 2 ? "★ " : "",
                          label
                        ]
                      },
                      label
                    )),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-[10px] font-mono px-2.5 py-1 rounded-lg text-muted-foreground",
                        style: {
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)"
                        },
                        children: "COGT · META · AUTN deliberate in sequence"
                      }
                    )
                  ] })
                ] })
              ] }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
          statsLoading ? ["sk-1", "sk-2", "sk-3", "sk-4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-sm rounded-xl h-24" }, k)) : [
            {
              label: "Total Queries",
              value: String((mltvStats == null ? void 0 : mltvStats.totalQueries) ?? 0),
              ocid: "arch_council.stat.total_queries"
            },
            {
              label: "Voices Generated",
              value: String((mltvStats == null ? void 0 : mltvStats.totalVoices) ?? 0),
              ocid: "arch_council.stat.total_voices"
            },
            {
              label: "Novel Answers",
              value: String((mltvStats == null ? void 0 : mltvStats.novelAnswersGenerated) ?? 0),
              ocid: "arch_council.stat.novel_answers"
            },
            {
              label: "Total Engines",
              value: String(totalEngines),
              ocid: "arch_council.stat.total_engines"
            }
          ].map(({ label, value, ocid }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": ocid,
              className: "glass rounded-xl px-4 py-5 text-center relative overflow-hidden",
              style: { border: `1px solid ${AMBER_BORDER}` },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-2xl font-black font-display",
                    style: { color: AMBER },
                    children: value
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-muted-foreground uppercase tracking-wider mt-1", children: label })
              ]
            },
            label
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass rounded-xl px-4 py-5 text-center",
              style: { border: `1px solid ${AMBER_BORDER}` },
              "data-ocid": "arch_council.stat.council_status",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "inline-block text-sm font-mono font-bold px-3 py-1 rounded-xl mb-1",
                    style: {
                      background: "rgba(245,155,0,0.12)",
                      color: AMBER,
                      border: `1px solid ${AMBER_BORDER}`,
                      boxShadow: `0 0 16px ${AMBER_GLOW}`
                    },
                    children: "SOVEREIGN"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-muted-foreground uppercase tracking-wider", children: "Council Status" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass-xl rounded-2xl p-6 space-y-4",
            style: { border: `1px solid ${AMBER_BORDER}` },
            "data-ocid": "arch_council.query_panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono tracking-widest text-muted-foreground uppercase", children: "Ask the Council" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  "data-ocid": "arch_council.query_input",
                  placeholder: "Enter a question, topic, or decision to analyze...",
                  value: queryText,
                  onChange: (e) => setQueryText(e.target.value),
                  rows: 3,
                  className: "resize-none glass border-0",
                  style: { borderColor: AMBER_BORDER }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    "data-ocid": "arch_council.domain_select",
                    value: domain,
                    onChange: (e) => setDomain(e.target.value),
                    className: "flex-1 rounded-xl border px-3 py-2 text-sm text-foreground focus:outline-none",
                    style: {
                      background: "rgba(12,14,28,0.80)",
                      borderColor: AMBER_BORDER,
                      backdropFilter: "blur(12px)"
                    },
                    children: DOMAINS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: d, children: d }, d))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    "data-ocid": "arch_council.fire_button",
                    type: "button",
                    onClick: handleFire,
                    disabled: fireMutation.isPending || !queryText.trim(),
                    className: "gap-2 font-mono",
                    style: {
                      background: fireMutation.isPending ? "rgba(245,155,0,0.15)" : "rgba(245,155,0,0.20)",
                      color: AMBER,
                      border: `1px solid ${AMBER_BORDER}`,
                      boxShadow: `0 0 20px ${AMBER_GLOW}`
                    },
                    children: fireMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-pulse", children: "●" }),
                      " Deliberating..."
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
                      " Fire Council"
                    ] })
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: liveResponse && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "arch_council.live_response", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs font-mono font-bold uppercase tracking-widest mb-3",
              style: { color: AMBER },
              children: "★ Live Council Response"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ResponseCard, { response: liveResponse })
        ] }) }),
        recentResponses && recentResponses.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "arch_council.recent_section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono tracking-widest text-muted-foreground uppercase mb-3", children: "Recent Council Sessions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: recentResponses.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionRecentRow, { response: r }, r.queryId)) })
        ] }),
        (!recentResponses || recentResponses.length === 0) && !liveResponse && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "arch_council.empty_state",
            className: "glass-sm rounded-2xl flex flex-col items-center justify-center py-20 text-center",
            style: { border: `1px solid ${AMBER_BORDER}` },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-12 w-12 mb-4", style: { color: AMBER_GLOW } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No council sessions yet. Fire the council to begin." })
            ]
          }
        )
      ]
    }
  );
}
export {
  ArchCouncilMonitor as default
};
