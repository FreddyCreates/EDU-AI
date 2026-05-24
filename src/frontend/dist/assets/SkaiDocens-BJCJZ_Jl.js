import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { i as createLucideIcon, c as cn, f as useActor, h as createActor, Z as Zap, k as Shield, B as BookOpen, j as Send, u as ue } from "./index-BivnQ6bB.js";
import { E as EddiOrb } from "./EddiOrb-BVFxfmXd.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { B as Button } from "./button-CWs7EcLL.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from "./dialog-B3hkAdZ4.js";
import { I as Input } from "./input-dqEl3BdT.js";
import { P as Primitive, L as Label } from "./label-CpNG7Eze.js";
import { S as ScrollArea } from "./scroll-area-CarfRcuH.js";
import { T as Textarea } from "./textarea-B0lupW8l.js";
import { b as useMutation } from "./query-8urnerR0.js";
import { d as useNavigate } from "./router-D6GUppNf.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { S as Sparkles } from "./sparkles-C3IEEH24.js";
import { C as ChevronRight } from "./chevron-right-neFioPkE.js";
import { C as ChevronDown } from "./chevron-down-B2BSsDRF.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./index-Dla_9Jug.js";
import "./index-BXiroDnN.js";
import "./index-D7KnjD29.js";
import "./index-DD4zw4TC.js";
import "./index-BfPMFYr5.js";
import "./index-Dc3cfdi4.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }],
  ["path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2", key: "80xlxr" }],
  ["path", { d: "M5 10v2a7 7 0 0 0 12 5", key: "p2k8kg" }],
  ["path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33", key: "1gzdoj" }],
  ["path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12", key: "r2i35w" }],
  ["line", { x1: "12", x2: "12", y1: "19", y2: "22", key: "x3vr5v" }]
];
const MicOff = createLucideIcon("mic-off", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z", key: "131961" }],
  ["path", { d: "M19 10v2a7 7 0 0 1-14 0v-2", key: "1vc78b" }],
  ["line", { x1: "12", x2: "12", y1: "19", y2: "22", key: "x3vr5v" }]
];
const Mic = createLucideIcon("mic", __iconNode);
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root = Separator$1;
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
function useSkaiTeach() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({ studentIntent, subject, gradeLevel }) => {
      if (!actor) throw new Error("Actor not ready");
      const enriched = subject || gradeLevel ? `${studentIntent} [subject: ${subject ?? ""}, grade: ${gradeLevel ?? ""}]` : studentIntent;
      return actor.skaiTeach(enriched);
    }
  });
}
const ACTIVE_LAWS = [
  {
    latin: "LEX_ADOPTIO",
    english: "You are welcomed",
    description: "You are accepted into the organism's lineage."
  },
  {
    latin: "LEX_CREATIO",
    english: "Create first",
    description: "Every lesson begins with creation, not instruction."
  },
  {
    latin: "LEX_MEMORIA",
    english: "Nothing is forgotten",
    description: "Every session compounds. You never start over."
  }
];
const engineDomainMap = {
  SYNTHOS: "Synthesis from first principles",
  VEKTOR: "Meaning in data — vectors & embeddings",
  PHAEDRUS: "Reasoning through inference chains",
  MORPHOS: "Transforming structure",
  LOGOS: "Language, voice & doctrine generation",
  GENITOR: "Creation from a seed",
  "MEMORIA-VIVA": "Memory & compounding",
  OMNIS: "The totality — all engines as one field"
};
const engineIdMap = {
  SYNTHOS: "1",
  VEKTOR: "2",
  PHAEDRUS: "3",
  MORPHOS: "4",
  LOGOS: "5",
  GENITOR: "6",
  "MEMORIA-VIVA": "7",
  OMNIS: "8"
};
function SkaiDocens() {
  var _a;
  const { actor } = useActor(createActor);
  const skaiTeach = useSkaiTeach();
  const [inputValue, setInputValue] = reactExports.useState("");
  const [submittedIntent, setSubmittedIntent] = reactExports.useState("");
  const [teachResult, setTeachResult] = reactExports.useState(
    null
  );
  const [isListening, setIsListening] = reactExports.useState(false);
  const [lawsPanelOpen, setLawsPanelOpen] = reactExports.useState(false);
  const [sealModalOpen, setSealModalOpen] = reactExports.useState(false);
  const [sealSummary, setSealSummary] = reactExports.useState("");
  const [artifactName, setArtifactName] = reactExports.useState("");
  const [isSealing, setIsSealing] = reactExports.useState(false);
  const recognitionRef = reactExports.useRef(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const intent = inputValue.trim();
    if (!intent || skaiTeach.isPending || !actor) return;
    setSubmittedIntent(intent);
    setInputValue("");
    setTeachResult(null);
    try {
      const result = await skaiTeach.mutateAsync({ studentIntent: intent });
      setTeachResult(result);
      setSealSummary(result.doctrine.slice(0, 100));
      setArtifactName(
        intent.length > 40 ? `${intent.slice(0, 40)}...` : intent
      );
    } catch {
      ue.error("EDDI Teacher Mode could not respond. Please try again.");
    }
  };
  const handleEnterEngine = () => {
    if (!teachResult) return;
    const id = engineIdMap[teachResult.engineSelected];
    if (id) navigate({ to: "/engines/$engineId", params: { engineId: id } });
  };
  const toggleVoice = () => {
    var _a2;
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      ue.error("Voice requires SpeechRecognition support.");
      return;
    }
    if (isListening) {
      (_a2 = recognitionRef.current) == null ? void 0 : _a2.stop();
      setIsListening(false);
      return;
    }
    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => {
      setIsListening(false);
      ue.error("Voice capture failed.");
    };
    recognition.onresult = (event) => {
      const transcript = Array.from(
        event.results
      ).map((r) => r[0].transcript).join("");
      setInputValue(transcript);
    };
    recognitionRef.current = recognition;
    recognition.start();
  };
  const handleSealSession = async () => {
    if (!actor || !sealSummary.trim() || !teachResult) return;
    setIsSealing(true);
    try {
      const seed = {
        id: `seed-docens-${Date.now()}`,
        sessionSummary: sealSummary.trim(),
        engineUsed: teachResult.engineSelected,
        trackName: "TEACHER_SESSION",
        createdAt: BigInt(Date.now()),
        artifactName: artifactName.trim() || void 0
      };
      const sealed = await actor.sealKernelSeed(seed);
      if (sealed) {
        setSealModalOpen(false);
        setSealSummary("");
        setArtifactName("");
        ue.success("Session sealed to sovereign passport.");
      } else {
        ue.error("Sealing failed. The KERNEL_SEED was rejected.");
      }
    } catch {
      ue.error("Could not seal the session. Please try again.");
    } finally {
      setIsSealing(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "portal-enter flex h-[calc(100vh-8rem)] max-w-6xl mx-auto px-4 sm:px-6 py-4 gap-4",
      "data-ocid": "skai-docens.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col flex-1 min-w-0",
            "data-ocid": "skai-docens.panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: -8 },
                  animate: { opacity: 1, y: 0 },
                  className: "glass-portal-teacher glass-shimmer rounded-2xl px-5 py-4 mb-3 relative overflow-hidden",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "pointer-events-none absolute -top-6 -right-6 h-24 w-24 rounded-full blur-2xl",
                        style: { background: "rgba(160,100,255,0.08)" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-start justify-between gap-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-0.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(EddiOrb, { mode: "EXPLAIN", size: "md" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground tracking-tight", children: "EDDI — Teacher Mode" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Badge,
                            {
                              className: "text-xs font-mono",
                              style: {
                                borderColor: "rgba(160,100,255,0.30)",
                                background: "rgba(160,100,255,0.12)",
                                color: "rgba(200,160,255,0.9)"
                              },
                              children: "TEACHER AI"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative inline-flex h-2 w-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 bg-violet-400" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-violet-400" })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-foreground/40 font-mono", children: "TCHR_INTELLIGENCE · Sovereign Educator Engine" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/50 mt-1", children: "EDDI operates in Teacher Mode to help you build, teach, and illuminate." })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-end gap-1.5 shrink-0", children: teachResult && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Badge,
                          {
                            variant: "outline",
                            className: "text-xs font-mono gap-1",
                            style: {
                              borderColor: "rgba(160,100,255,0.25)",
                              color: "rgba(200,160,255,0.7)"
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3 w-3 text-violet-400" }),
                              engineDomainMap[teachResult.engineSelected] ?? teachResult.engineSelected
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Button,
                          {
                            size: "sm",
                            variant: "outline",
                            "data-ocid": "skai-docens.seal_button",
                            className: "text-xs gap-1.5",
                            style: {
                              borderColor: "rgba(160,100,255,0.35)",
                              color: "rgba(200,160,255,0.9)"
                            },
                            onClick: () => setSealModalOpen(true),
                            type: "button",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-3.5 w-3.5" }),
                              "Save Session"
                            ]
                          }
                        )
                      ] }) })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex-1 glass-xl rounded-2xl overflow-hidden flex flex-col",
                  style: { border: "1px solid rgba(160,100,255,0.15)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "flex-1 p-4", children: !teachResult && !skaiTeach.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex flex-col items-center justify-center h-full min-h-[320px] text-center px-4 py-8",
                        "data-ocid": "skai-docens.empty_state",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            motion.div,
                            {
                              initial: { opacity: 0, scale: 0.9 },
                              animate: { opacity: 1, scale: 1 },
                              className: "flex h-16 w-16 items-center justify-center rounded-2xl glass-portal-teacher glow-teacher mb-5",
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-8 w-8 text-violet-300" })
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground mb-1", children: "What do you want to teach today?" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-base text-foreground/60 mb-6 max-w-md", children: [
                            "EDDI Teacher Mode generates",
                            " ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-violet-300", children: "multi-voice" }),
                            " ",
                            "responses with EXPAND, CRITIQUE, SYNTHESIZE, and NOVEL perspectives."
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row gap-2 w-full max-w-xl", children: [
                            {
                              label: "How do I help a struggling student with fractions?",
                              icon: "📐"
                            },
                            {
                              label: "Create a differentiated lesson plan for Grade 7 algebra",
                              icon: "📋"
                            },
                            {
                              label: "What are the best engagement strategies for reluctant learners?",
                              icon: "🎯"
                            }
                          ].map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "button",
                            {
                              type: "button",
                              "data-ocid": `skai-docens.suggestion.${i + 1}`,
                              onClick: () => setInputValue(s.label),
                              className: "flex-1 flex items-center gap-2 glass-sm rounded-2xl hover:glass-portal-teacher px-3 py-3 text-sm text-left transition-glass group",
                              style: { border: "1px solid rgba(160,100,255,0.18)" },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: s.icon }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/60 group-hover:text-foreground text-xs leading-snug", children: s.label })
                              ]
                            },
                            s.label
                          )) })
                        ]
                      }
                    ) : skaiTeach.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex flex-col items-center justify-center h-full min-h-[320px] gap-4",
                        "data-ocid": "skai-docens.loading_state",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-2xl glass-portal-teacher", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-6 w-6 text-violet-300 animate-pulse" }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/50 font-mono", children: "EDDI Teacher Mode is thinking…" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-foreground/30 max-w-xs text-center italic", children: [
                            "“",
                            submittedIntent,
                            "”"
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "inline-block h-1.5 w-1.5 rounded-full animate-bounce",
                              style: {
                                background: "rgba(160,100,255,0.8)",
                                animationDelay: `${i * 0.15}s`
                              }
                            },
                            i
                          )) })
                        ]
                      }
                    ) : teachResult ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2", "data-ocid": "skai-docens.response", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "max-w-[75%] rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm text-foreground",
                          style: {
                            background: "rgba(160,100,255,0.18)",
                            border: "1px solid rgba(160,100,255,0.3)"
                          },
                          children: submittedIntent
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex gap-3",
                          "data-ocid": "skai-docens.multivoice_response",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full glass font-bold text-xs text-violet-300",
                                style: { border: "1px solid rgba(160,100,255,0.35)" },
                                children: "S"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-3", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed text-foreground/80", children: teachResult.studentWelcome }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "div",
                                {
                                  className: "glass-sm rounded-2xl px-4 py-3",
                                  style: { border: "1px solid rgba(0,200,100,0.2)" },
                                  "data-ocid": "skai-docens.expand_block",
                                  children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] font-mono font-bold text-emerald-400 mb-1.5 uppercase tracking-widest flex items-center gap-1.5", children: [
                                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" }),
                                      "EXPAND — First Principles"
                                    ] }),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/75 leading-relaxed", children: teachResult.doctrine })
                                  ]
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "div",
                                {
                                  className: "glass-sm rounded-2xl px-4 py-3",
                                  style: { border: "1px solid rgba(255,185,0,0.2)" },
                                  "data-ocid": "skai-docens.critique_block",
                                  children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] font-mono font-bold text-amber-400 mb-1.5 uppercase tracking-widest flex items-center gap-1.5", children: [
                                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block h-1.5 w-1.5 rounded-full bg-amber-400" }),
                                      "CRITIQUE — Counterpoint"
                                    ] }),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/65 leading-relaxed italic", children: "Consider: every teaching strategy has a context where it fails. The best educators know the limitations of their approach and adapt before students struggle." })
                                  ]
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "div",
                                {
                                  className: "glass-portal-teacher rounded-2xl px-4 py-3",
                                  "data-ocid": "skai-docens.synthesize_block",
                                  children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                      "p",
                                      {
                                        className: "text-[10px] font-mono font-bold mb-1.5 uppercase tracking-widest flex items-center gap-1.5",
                                        style: { color: "rgba(200,160,255,0.9)" },
                                        children: [
                                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block h-1.5 w-1.5 rounded-full bg-violet-400" }),
                                          "SYNTHESIZE — Integrated View"
                                        ]
                                      }
                                    ),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/75 leading-relaxed", children: "The sovereign approach merges direct instruction with student-led discovery — use COGT phase ratios (EXPAND 55%, CRITIQUE 21%, SYNTHESIZE 24%) to structure each session." })
                                  ]
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "div",
                                {
                                  className: "glass-sm rounded-2xl px-4 py-3",
                                  style: {
                                    border: "1px solid rgba(160,100,255,0.35)",
                                    background: "rgba(160,100,255,0.08)"
                                  },
                                  "data-ocid": "skai-docens.novel_block",
                                  children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                      "p",
                                      {
                                        className: "text-[10px] font-mono font-bold mb-1.5 uppercase tracking-widest flex items-center gap-1.5",
                                        style: { color: "rgba(200,160,255,0.95)" },
                                        children: [
                                          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
                                          "NOVEL — EduAI Original"
                                        ]
                                      }
                                    ),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/70 leading-relaxed", children: "Your student’s passport already contains the seeds of tomorrow’s mastery. The intelligence isn’t in what you teach — it’s in what compounds." })
                                  ]
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "div",
                                {
                                  className: "glass rounded-2xl px-4 py-3 flex flex-col gap-2",
                                  "data-ocid": "skai-docens.engine_routing",
                                  children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                                      /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4 text-violet-300 shrink-0" }),
                                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-foreground/30 uppercase tracking-widest", children: "SOVEREIGN ENGINE" }),
                                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: engineDomainMap[teachResult.engineSelected] ?? teachResult.engineSelected })
                                      ] })
                                    ] }),
                                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                      Button,
                                      {
                                        type: "button",
                                        size: "sm",
                                        "data-ocid": "skai-docens.enter_engine_button",
                                        className: "w-full gap-1.5 text-xs font-bold rounded-xl",
                                        style: {
                                          background: "linear-gradient(135deg, oklch(0.62 0.22 280), oklch(0.48 0.22 280))",
                                          border: "1px solid rgba(160,100,255,0.4)"
                                        },
                                        onClick: handleEnterEngine,
                                        children: [
                                          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5" }),
                                          "Enter",
                                          " ",
                                          ((_a = engineDomainMap[teachResult.engineSelected]) == null ? void 0 : _a.split(
                                            " "
                                          )[0]) ?? teachResult.engineSelected,
                                          " ",
                                          "Engine"
                                        ]
                                      }
                                    )
                                  ]
                                }
                              ),
                              teachResult.suggestedNext && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "div",
                                {
                                  className: "glass-sm rounded-2xl px-4 py-2.5 flex items-center gap-2",
                                  style: { border: "1px solid rgba(160,100,255,0.2)" },
                                  "data-ocid": "skai-docens.suggested_next",
                                  children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3.5 w-3.5 text-violet-400 shrink-0" }),
                                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-foreground/50", children: [
                                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                                        "Next:",
                                        " "
                                      ] }),
                                      engineDomainMap[teachResult.suggestedNext] ?? teachResult.suggestedNext
                                    ] })
                                  ]
                                }
                              )
                            ] })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          "data-ocid": "skai-docens.ask_again_button",
                          onClick: () => {
                            setTeachResult(null);
                            setSubmittedIntent("");
                          },
                          className: "text-xs text-foreground/30 hover:text-violet-300 transition-colors font-mono underline underline-offset-2",
                          children: "Ask EDDI Teacher Mode something else"
                        }
                      ) })
                    ] }) : null }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { style: { background: "rgba(160,100,255,0.12)" } }),
                    isListening && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "px-4 py-2 flex items-center gap-2",
                        style: {
                          background: "rgba(160,100,255,0.05)",
                          borderBottom: "1px solid rgba(160,100,255,0.15)"
                        },
                        "data-ocid": "skai-docens.listening_indicator",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-2 rounded-full bg-violet-400 animate-pulse" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-violet-300 font-mono", children: "EDDI is listening…" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "p-3 flex gap-2 glass", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          "data-ocid": "skai-docens.input",
                          value: inputValue,
                          onChange: (e) => setInputValue(e.target.value),
                          placeholder: isListening ? "Speak your teaching intent…" : "What teaching challenge can I help with?",
                          className: "flex-1 rounded-xl",
                          style: {
                            background: "rgba(160,100,255,0.06)",
                            border: "1px solid rgba(160,100,255,0.18)",
                            color: "inherit"
                          },
                          disabled: skaiTeach.isPending
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          type: "button",
                          variant: isListening ? "default" : "outline",
                          size: "icon",
                          "data-ocid": "skai-docens.voice_button",
                          onClick: toggleVoice,
                          "aria-label": isListening ? "Stop listening" : "Start voice",
                          className: "rounded-xl",
                          style: isListening ? {
                            background: "oklch(0.62 0.22 280)",
                            color: "oklch(0.07 0.01 260)"
                          } : {
                            borderColor: "rgba(160,100,255,0.25)",
                            color: "rgba(160,100,255,0.7)"
                          },
                          children: isListening ? /* @__PURE__ */ jsxRuntimeExports.jsx(MicOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "h-4 w-4" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          type: "submit",
                          size: "icon",
                          "data-ocid": "skai-docens.submit_button",
                          disabled: !inputValue.trim() || skaiTeach.isPending || !actor,
                          "aria-label": "Send to SKAI Docens",
                          className: "rounded-xl",
                          style: {
                            background: "linear-gradient(135deg, oklch(0.62 0.22 280), oklch(0.48 0.22 280))",
                            border: "1px solid rgba(160,100,255,0.4)"
                          },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" })
                        }
                      )
                    ] })
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "hidden lg:flex flex-col w-64 shrink-0 gap-3",
            "data-ocid": "skai-docens.doctrine_panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "glass rounded-2xl overflow-hidden",
                  style: { border: "1px solid rgba(160,100,255,0.18)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        "data-ocid": "skai-docens.laws_toggle",
                        className: "w-full flex items-center justify-between px-4 py-3 text-sm font-semibold font-mono text-foreground/70 hover:text-foreground hover:bg-[rgba(160,100,255,0.06)] transition-glass",
                        onClick: () => setLawsPanelOpen((v) => !v),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4 text-violet-400" }),
                            "Active Laws"
                          ] }),
                          lawsPanelOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 text-foreground/30" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-foreground/30" })
                        ]
                      }
                    ),
                    lawsPanelOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-4 space-y-3", children: ACTIVE_LAWS.map((law, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        "data-ocid": `skai-docens.law.${i + 1}`,
                        className: "space-y-0.5",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono font-bold text-violet-300", children: law.latin }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground/80", children: law.english }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/40 leading-relaxed", children: law.description })
                        ]
                      },
                      law.latin
                    )) }),
                    !lawsPanelOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-3 space-y-1.5", children: ACTIVE_LAWS.map((law, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        "data-ocid": `skai-docens.law_compact.${i + 1}`,
                        className: "flex items-center gap-1.5",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-violet-400 shrink-0" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-foreground/30 truncate", children: law.latin })
                        ]
                      },
                      law.latin
                    )) })
                  ]
                }
              ),
              teachResult && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "glass-portal-teacher rounded-2xl px-4 py-3",
                  "data-ocid": "skai-docens.active_engine_card",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-[10px] font-mono font-bold mb-1 uppercase tracking-widest",
                        style: { color: "rgba(200,160,255,0.9)" },
                        children: "ACTIVE ENGINE"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-display font-semibold text-foreground", children: engineDomainMap[teachResult.engineSelected] ?? teachResult.engineSelected }),
                    teachResult.suggestedNext && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-foreground/30 mt-1.5 font-mono", children: [
                      "Next:",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/60", children: engineDomainMap[teachResult.suggestedNext] ?? teachResult.suggestedNext })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "glass rounded-2xl px-4 py-3",
                  style: { border: "1px solid rgba(160,100,255,0.15)" },
                  "data-ocid": "skai-docens.multivoice_legend",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono font-bold text-foreground/30 mb-3 uppercase tracking-widest", children: "MULTI-VOICE LAW" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: [
                      {
                        color: "bg-emerald-400",
                        label: "EXPAND",
                        desc: "First principles"
                      },
                      {
                        color: "bg-amber-400",
                        label: "CRITIQUE",
                        desc: "Counterpoint"
                      },
                      {
                        color: "bg-violet-400",
                        label: "SYNTHESIZE",
                        desc: "Integration"
                      },
                      {
                        color: "bg-violet-300",
                        label: "NOVEL",
                        desc: "Original insight"
                      }
                    ].map(({ color, label, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `h-1.5 w-1.5 rounded-full ${color} shrink-0`
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono font-bold text-foreground/60", children: label }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground/30 ml-1", children: desc })
                      ] })
                    ] }, label)) })
                  ]
                }
              ),
              teachResult && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "glass rounded-2xl px-4 py-3",
                  style: { border: "1px solid rgba(160,100,255,0.15)" },
                  "data-ocid": "skai-docens.session_stats",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono font-bold text-foreground/30 mb-2 uppercase tracking-widest", children: "SESSION" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/40", children: "Intent routed. Ready to seal." }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        "data-ocid": "skai-docens.seal_button_sidebar",
                        className: "w-full mt-3 gap-1.5 text-xs rounded-xl",
                        variant: "outline",
                        style: {
                          borderColor: "rgba(160,100,255,0.35)",
                          color: "rgba(200,160,255,0.9)"
                        },
                        onClick: () => setSealModalOpen(true),
                        type: "button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-3.5 w-3.5" }),
                          "Save Session"
                        ]
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: sealModalOpen, onOpenChange: setSealModalOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "sm:max-w-md glass-xl",
            style: { border: "1px solid rgba(160,100,255,0.3)" },
            "data-ocid": "skai-docens.seal_dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-5 w-5 text-violet-400" }),
                  "Save This Session"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { className: "text-sm text-foreground/50", children: "Permanently sealed to your sovereign passport." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Label,
                    {
                      htmlFor: "summary",
                      className: "text-sm font-medium text-foreground/70",
                      children: [
                        "Session Summary ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      id: "summary",
                      "data-ocid": "skai-docens.seal_summary_input",
                      placeholder: "What teaching insight did you gain?",
                      value: sealSummary,
                      onChange: (e) => setSealSummary(e.target.value),
                      className: "resize-none text-sm rounded-xl",
                      style: {
                        background: "rgba(160,100,255,0.06)",
                        border: "1px solid rgba(160,100,255,0.2)"
                      },
                      rows: 3
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Label,
                    {
                      htmlFor: "artifact",
                      className: "text-sm font-medium text-foreground/70",
                      children: [
                        "Artifact Name",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/30 font-normal", children: "(optional)" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "artifact",
                      "data-ocid": "skai-docens.seal_artifact_input",
                      placeholder: "Name your lesson artifact…",
                      value: artifactName,
                      onChange: (e) => setArtifactName(e.target.value),
                      className: "text-sm rounded-xl",
                      style: {
                        background: "rgba(160,100,255,0.06)",
                        border: "1px solid rgba(160,100,255,0.2)"
                      }
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    "data-ocid": "skai-docens.seal_cancel_button",
                    onClick: () => setSealModalOpen(false),
                    className: "border-[rgba(255,255,255,0.1)] text-foreground/60 hover:text-foreground",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    "data-ocid": "skai-docens.seal_confirm_button",
                    disabled: !sealSummary.trim() || isSealing,
                    onClick: handleSealSession,
                    className: "gap-1.5 font-bold",
                    style: {
                      background: "linear-gradient(135deg, oklch(0.62 0.22 280), oklch(0.48 0.22 280))",
                      border: "1px solid rgba(160,100,255,0.4)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4" }),
                      isSealing ? "Sealing…" : "Save Session"
                    ]
                  }
                )
              ] })
            ]
          }
        ) })
      ]
    }
  );
}
export {
  SkaiDocens as default
};
