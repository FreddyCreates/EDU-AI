import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { f as useActor, h as createActor, u as ue, Z as Zap, j as Send, l as BookMarked, S as Skeleton } from "./index-BivnQ6bB.js";
import { T as Textarea } from "./textarea-B0lupW8l.js";
import { b as useMutation } from "./query-8urnerR0.js";
import { S as STATIC_ENGINES, E as EngineStatus } from "./use-engines-DqR-N7RV.js";
import { b as useAutoSeal } from "./use-passport-VGmcZtEk.js";
import { e as useParams, L as Link } from "./router-D6GUppNf.js";
import { A as ArrowLeft } from "./arrow-left-DLov4c1N.js";
import { C as CircleCheckBig } from "./circle-check-big-DngI0fNm.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./motion-BK2wxCtX.js";
function useEngineQuery(engineId) {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({ userInput, context = "" }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.queryEngine(engineId, userInput, context);
    }
  });
}
function useEngineQueryWithPassport(engineId) {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({ userInput, context = "" }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.queryEngineWithPassport(engineId, userInput, context);
    }
  });
}
function substrateOf(id) {
  if ([1, 2, 3, 4, 5].includes(id)) return "ICPM";
  if ([6, 7].includes(id)) return "JLIA";
  if ([8, 9].includes(id)) return "EART";
  return "EMRT";
}
const SUB_STYLE = {
  ICPM: {
    label: "ICP / Motoko",
    accent: "oklch(0.78 0.22 200)",
    glow: "rgba(0,210,255,0.18)",
    border: "rgba(0,210,255,0.25)",
    chipBg: "rgba(0,210,255,0.07)"
  },
  JLIA: {
    label: "Julia Runtime",
    accent: "oklch(0.68 0.18 280)",
    glow: "rgba(160,100,255,0.18)",
    border: "rgba(160,100,255,0.25)",
    chipBg: "rgba(160,100,255,0.07)"
  },
  EART: {
    label: "Autonomous Runtime",
    accent: "oklch(0.75 0.16 70)",
    glow: "rgba(255,185,0,0.18)",
    border: "rgba(255,185,0,0.25)",
    chipBg: "rgba(255,185,0,0.07)"
  },
  EMRT: {
    label: "Memory Runtime",
    accent: "oklch(0.72 0.17 155)",
    glow: "rgba(0,220,130,0.18)",
    border: "rgba(0,220,130,0.25)",
    chipBg: "rgba(0,220,130,0.07)"
  }
};
function CohRing({
  value,
  accentColor
}) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(1, Math.max(0, value / 100));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "124", height: "124", viewBox: "0 0 124 124", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "circle",
      {
        cx: "62",
        cy: "62",
        r,
        fill: "none",
        stroke: "rgba(255,255,255,0.06)",
        strokeWidth: "6"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "circle",
      {
        cx: "62",
        cy: "62",
        r,
        fill: "none",
        stroke: accentColor,
        strokeWidth: "6",
        strokeDasharray: `${pct * circ} ${circ}`,
        strokeLinecap: "round",
        style: { transform: "rotate(-90deg)", transformOrigin: "50% 50%" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "text",
      {
        x: "62",
        y: "57",
        textAnchor: "middle",
        fill: accentColor,
        fontSize: "22",
        fontFamily: "monospace",
        fontWeight: "800",
        children: Math.round(value)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "text",
      {
        x: "62",
        y: "74",
        textAnchor: "middle",
        fill: "rgba(255,255,255,0.35)",
        fontSize: "9",
        fontFamily: "monospace",
        children: "COH"
      }
    )
  ] });
}
function EngineInteract({
  engine,
  style
}) {
  var _a, _b;
  const [input, setInput] = reactExports.useState("");
  const [sealedSeed, setSealedSeed] = reactExports.useState(null);
  const queryMut = useEngineQuery(engine.codeName);
  const passportMut = useEngineQueryWithPassport(engine.codeName);
  const response = ((_a = passportMut.data) == null ? void 0 : _a.response) ?? queryMut.data;
  const isPending = queryMut.isPending || passportMut.isPending;
  const isError = queryMut.isError || passportMut.isError;
  const errorMsg = (_b = queryMut.error ?? passportMut.error) == null ? void 0 : _b.message;
  function handleSend() {
    const t = input.trim();
    if (!t || isPending) return;
    queryMut.reset();
    passportMut.reset();
    setSealedSeed(null);
    queryMut.mutate({ userInput: t, context: engine.domain });
  }
  function handleSeal() {
    const t = input.trim();
    if (!t || isPending) return;
    queryMut.reset();
    passportMut.reset();
    setSealedSeed(null);
    passportMut.mutate(
      { userInput: t, context: engine.domain },
      {
        onSuccess: (d) => {
          setSealedSeed(d.seedGenerated.id);
        }
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4", "data-ocid": "engine_page.interact_section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4", style: { color: style.accent } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-display font-semibold text-foreground", children: "Interact with the Engine" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "default", className: "ml-auto text-xs gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "w-1.5 h-1.5 rounded-full bg-current",
            style: { animation: "status-pulse 2s ease-in-out infinite" }
          }
        ),
        "LIVE"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass-sm rounded-2xl p-4 space-y-3",
        style: { borderColor: style.border },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: engine.domain }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              "data-ocid": "engine_page.interact_input",
              value: input,
              onChange: (e) => setInput(e.target.value),
              onKeyDown: (e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              },
              placeholder: `Ask ${engine.codeName} anything…`,
              rows: 3,
              className: "resize-none bg-transparent border-0 focus-visible:ring-0 text-sm",
              disabled: isPending
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                disabled: !input.trim() || isPending,
                onClick: handleSend,
                "data-ocid": "engine_page.send_button",
                className: "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-glass touch-target disabled:opacity-40",
                style: {
                  background: style.chipBg,
                  color: style.accent,
                  border: `1px solid ${style.border}`,
                  minHeight: "36px"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-3.5 h-3.5" }),
                  isPending ? "Thinking…" : "Send"
                ]
              }
            ),
            response && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                disabled: isPending || !!sealedSeed,
                onClick: handleSeal,
                "data-ocid": "engine_page.seal_passport_button",
                className: "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-glass touch-target disabled:opacity-40",
                style: {
                  background: "rgba(160,100,255,0.08)",
                  color: "oklch(0.68 0.18 280)",
                  border: "1px solid rgba(160,100,255,0.2)",
                  minHeight: "36px"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookMarked, { className: "w-3.5 h-3.5" }),
                  sealedSeed ? "Sealed ✓" : "Seal to Passport"
                ]
              }
            )
          ] })
        ]
      }
    ),
    isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "space-y-2 glass-sm rounded-2xl p-4",
        "data-ocid": "engine_page.response_loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-5/6" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-2/3" })
        ]
      }
    ),
    isError && !isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass-sm rounded-2xl p-4 text-sm",
        "data-ocid": "engine_page.response_error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-destructive", children: "Engine error:" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: errorMsg ?? "Unknown error" })
        ]
      }
    ),
    response && !isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass rounded-2xl p-5 space-y-3",
        style: {
          borderColor: style.border,
          boxShadow: `0 0 32px ${style.glow}`
        },
        "data-ocid": "engine_page.response_card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-mono text-xs font-bold",
                style: { color: style.accent },
                children: engine.codeName
              }
            ),
            sealedSeed && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "ml-auto gap-1 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CircleCheckBig,
                {
                  className: "w-3 h-3",
                  style: { color: style.accent }
                }
              ),
              " ",
              "Sealed"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "text-sm text-foreground whitespace-pre-wrap font-body leading-relaxed", children: response })
        ]
      }
    )
  ] });
}
function EnginePage() {
  const { engineId } = useParams({ from: "/engines/$engineId" });
  const engine = STATIC_ENGINES.find((e) => String(e.id) === engineId);
  const [grade, setGrade] = reactExports.useState("5");
  const autoSeal = useAutoSeal();
  if (!engine) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-3xl mx-auto px-4 py-16 text-center space-y-4",
        "data-ocid": "engine_page.not_found_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl", children: "⚠️" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Engine Not Found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
            "No engine with id ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono", children: engineId })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/engines", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass-sm text-sm font-semibold transition-glass touch-target",
              "data-ocid": "engine_page.back_to_registry_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                " Back to Registry"
              ]
            }
          ) })
        ]
      }
    );
  }
  const subKey = substrateOf(Number(engine.id));
  const style = SUB_STYLE[subKey];
  const isActive = engine.status === EngineStatus.active;
  const coh = 85 + Number(engine.id) % 12;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-3xl mx-auto px-4 py-10 space-y-8",
      "data-ocid": "engine_page.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/engines",
            className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
            "data-ocid": "engine_page.back_link",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
              " Engine Registry"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass-xl rounded-3xl p-8 relative overflow-hidden",
            "data-ocid": "engine_page.engine_card",
            style: {
              boxShadow: `0 0 48px ${style.glow}, 0 32px 96px rgba(0,0,0,0.7)`
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 pointer-events-none",
                  style: {
                    background: `radial-gradient(ellipse 80% 60% at 100% 0%, ${style.glow} 0%, transparent 65%)`
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-start justify-between gap-6 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "font-mono text-sm font-black tracking-widest px-3 py-1 rounded-lg",
                        style: {
                          background: style.chipBg,
                          color: style.accent,
                          border: `1px solid ${style.border}`
                        },
                        children: engine.codeName
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "font-mono text-[10px] px-2 py-0.5 rounded-md tracking-wider",
                        style: {
                          background: style.chipBg,
                          color: style.accent,
                          border: `1px solid ${style.border}`
                        },
                        children: [
                          subKey,
                          " · ",
                          style.label
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-black tracking-tight text-foreground", children: engine.fullName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: engine.domain })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CohRing, { value: coh, accentColor: style.accent })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6", children: [
                { label: "COH Score", value: `${coh}%` },
                { label: "Sessions", value: String(Number(engine.id) * 137 + 400) },
                { label: "Lessons", value: String(engine.lessonsAvailable.length) },
                { label: "Status", value: isActive ? "Active" : "Dormant" }
              ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "glass-sm rounded-xl px-3 py-2.5 text-center",
                  style: { borderColor: style.border },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-base font-black font-mono",
                        style: { color: style.accent },
                        children: value
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-muted-foreground uppercase tracking-wider mt-0.5", children: label })
                  ]
                },
                label
              )) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass-sm rounded-2xl p-5 space-y-2",
            style: { borderColor: style.border },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground", children: "Engine Role" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: engine.description }),
              engine.mathFoundation && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground italic mt-2", children: [
                "Foundation: ",
                engine.mathFoundation
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "engine_page.lessons_section", className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground", children: "Lessons Available" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: engine.lessonsAvailable.map((lesson, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": `engine_page.lesson_row.${idx + 1}`,
              className: "flex items-center justify-between gap-4 glass-sm rounded-xl px-4 py-3 transition-glass",
              style: { borderColor: style.border },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold font-mono shrink-0",
                      style: { background: style.chipBg, color: style.accent },
                      children: idx + 1
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground font-medium truncate", children: lesson })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/study/$subjectId/$topicId",
                    params: {
                      subjectId: `engine-${engine.id}`,
                      topicId: lesson.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
                    },
                    "data-ocid": `engine_page.lesson_start_button.${idx + 1}`,
                    className: "text-[10px] font-mono font-semibold transition-glass shrink-0",
                    style: { color: style.accent },
                    children: "Start →"
                  }
                )
              ]
            },
            lesson
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground", children: "Grade Level" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex flex-wrap gap-1.5",
              "data-ocid": "engine_page.grade_selector",
              children: [
                "K",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12"
              ].map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setGrade(g),
                  "aria-pressed": grade === g,
                  "data-ocid": `engine_page.grade_button.${g.toLowerCase()}`,
                  className: "px-3 py-1 rounded-lg text-xs font-mono font-medium transition-glass",
                  style: grade === g ? {
                    background: style.chipBg,
                    color: style.accent,
                    border: `1px solid ${style.border}`,
                    minHeight: "32px"
                  } : {
                    background: "transparent",
                    color: "oklch(0.55 0.01 260)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    minHeight: "32px"
                  },
                  children: g
                },
                g
              ))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "w-full py-3 rounded-xl text-sm font-semibold transition-glass touch-target disabled:opacity-40",
            style: {
              background: style.chipBg,
              color: style.accent,
              border: `1px solid ${style.border}`
            },
            disabled: autoSeal.isPending || autoSeal.isSuccess,
            "data-ocid": "engine_page.seal_lesson_button",
            onClick: () => autoSeal.mutate(
              {
                summary: engine.domain,
                engineUsed: engine.codeName,
                subject: engine.domain,
                gradeLevel: grade
              },
              {
                onSuccess: () => {
                  ue.success("Lesson sealed to passport");
                }
              }
            ),
            children: autoSeal.isPending ? "Sealing…" : autoSeal.isSuccess ? "✓ Sealed to Passport" : "Seal Lesson to Passport"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(EngineInteract, { engine, style }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] font-mono text-muted-foreground text-center", children: [
          "EduAI · ",
          engine.codeName,
          " · ",
          subKey,
          " · Engine",
          " ",
          String(engine.id).padStart(2, "0"),
          "/",
          STATIC_ENGINES.length
        ] })
      ]
    }
  );
}
export {
  EnginePage as default
};
