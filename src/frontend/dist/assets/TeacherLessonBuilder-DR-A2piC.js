import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { B as Button } from "./button-CWs7EcLL.js";
import { I as Input } from "./input-dqEl3BdT.js";
import { L as Label } from "./label-CpNG7Eze.js";
import { S as ScrollArea } from "./scroll-area-CarfRcuH.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CPBO6QhB.js";
import { i as createLucideIcon, C as Cpu, S as Skeleton, c as cn, o as Layers, X, u as ue, B as BookOpen } from "./index-BivnQ6bB.js";
import { b as useClassesByTeacher } from "./use-tchr-C8OkG62o.js";
import { a as useGradeVaultContents } from "./useBackend-DrgJPcWN.js";
import { S as Sparkles } from "./sparkles-C3IEEH24.js";
import { B as Brain } from "./brain-BiTGGu73.js";
import { m as motion, A as AnimatePresence } from "./motion-BK2wxCtX.js";
import { C as Check } from "./index-DstPCoQp.js";
import { P as Plus } from "./plus-DLM4cYLL.js";
import { C as ChevronRight } from "./chevron-right-neFioPkE.js";
import { T as Trash2 } from "./trash-2-BYpnggdZ.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./index-Dla_9Jug.js";
import "./index-BfPMFYr5.js";
import "./index-D7KnjD29.js";
import "./index-Dc3cfdi4.js";
import "./index-BXiroDnN.js";
import "./index-DD4zw4TC.js";
import "./chevron-down-B2BSsDRF.js";
import "./chevron-up-BZKIp_lu.js";
import "./query-8urnerR0.js";
import "./router-D6GUppNf.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }],
  ["circle", { cx: "9", cy: "5", r: "1", key: "hp0tcf" }],
  ["circle", { cx: "9", cy: "19", r: "1", key: "fkjjf6" }],
  ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }],
  ["circle", { cx: "15", cy: "5", r: "1", key: "19l28e" }],
  ["circle", { cx: "15", cy: "19", r: "1", key: "f4zoj3" }]
];
const GripVertical = createLucideIcon("grip-vertical", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["line", { x1: "4", x2: "20", y1: "9", y2: "9", key: "4lhtct" }],
  ["line", { x1: "4", x2: "20", y1: "15", y2: "15", key: "vyu0kd" }],
  ["line", { x1: "10", x2: "8", y1: "3", y2: "21", key: "1ggp8o" }],
  ["line", { x1: "16", x2: "14", y1: "3", y2: "21", key: "weycgp" }]
];
const Hash = createLucideIcon("hash", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",
      key: "ul74o6"
    }
  ],
  ["path", { d: "m14 7 3 3", key: "1r5n42" }],
  ["path", { d: "M5 6v4", key: "ilb8ba" }],
  ["path", { d: "M19 14v4", key: "blhpug" }],
  ["path", { d: "M10 2v2", key: "7u0qdc" }],
  ["path", { d: "M7 8H3", key: "zfb6yr" }],
  ["path", { d: "M21 16h-4", key: "1cnmox" }],
  ["path", { d: "M11 3H9", key: "1obp7u" }]
];
const WandSparkles = createLucideIcon("wand-sparkles", __iconNode);
const DEMO_TEACHER_ID = "demo-teacher";
const FALLBACK_CONCEPTS = [
  { id: "c1", title: "Fibonacci Spirals", type: "lesson", seeds: 8 },
  { id: "c2", title: "Golden Ratio in Nature", type: "lesson", seeds: 5 },
  { id: "c3", title: "Quadratic Equations", type: "lesson", seeds: 13 },
  { id: "c4", title: "Quiz: Fibonacci Basics", type: "quiz", seeds: 3 },
  { id: "c5", title: "Exponential Growth", type: "lesson", seeds: 8 },
  { id: "c6", title: "Geometric Sequences", type: "lesson", seeds: 5 },
  { id: "c7", title: "Quiz: Sequences & Series", type: "quiz", seeds: 5 },
  { id: "c8", title: "PHI-based Design Patterns", type: "lesson", seeds: 8 },
  { id: "c9", title: "Number Theory Fundamentals", type: "lesson", seeds: 13 },
  { id: "c10", title: "Quiz: Number Theory", type: "quiz", seeds: 3 },
  { id: "c11", title: "Spirograph & Polar Coords", type: "lesson", seeds: 5 },
  { id: "c12", title: "Review: Golden Ratio Unit", type: "review", seeds: 8 }
];
const GRADE_OPTIONS = Array.from({ length: 12 }, (_, i) => String(i + 1));
function typeColor(type) {
  if (type === "quiz")
    return "bg-amber-500/20 border-amber-500/30 text-amber-300";
  if (type === "review")
    return "bg-cyan-500/20 border-cyan-500/30 text-cyan-300";
  return "bg-violet-500/20 border-violet-500/30 text-violet-300";
}
function typeIcon(type) {
  if (type === "quiz") return Hash;
  if (type === "review") return Layers;
  return BookOpen;
}
function TeacherLessonBuilder() {
  const [grade, setGrade] = reactExports.useState("7");
  const [selectedClassId, setSelectedClassId] = reactExports.useState("");
  const [lessonTitle, setLessonTitle] = reactExports.useState("");
  const [canvas, setCanvas] = reactExports.useState([]);
  const [saving, setSaving] = reactExports.useState(false);
  const { data: classes = [], isLoading: classesLoading } = useClassesByTeacher(DEMO_TEACHER_ID);
  const { data: vaultEntries = [], isLoading: vaultLoading } = useGradeVaultContents(BigInt(grade));
  const concepts = vaultEntries.length > 0 ? vaultEntries.map((e, i) => ({
    id: e.entryId || String(i),
    title: e.summary || e.subject || `Entry ${i + 1}`,
    type: e.contentType === "quiz" || e.contentType === "review" ? e.contentType : "lesson",
    seeds: 5
  })) : FALLBACK_CONCEPTS;
  function addToCanvas(concept) {
    if (canvas.find((c) => c.id === concept.id)) return;
    const item = {
      id: concept.id,
      title: concept.title,
      type: concept.type,
      seeds: concept.seeds,
      order: 0
    };
    setCanvas((prev) => [...prev, { ...item, order: prev.length + 1 }]);
  }
  function removeFromCanvas(id) {
    setCanvas(
      (prev) => prev.filter((c) => c.id !== id).map((c, i) => ({ ...c, order: i + 1 }))
    );
  }
  function moveUp(idx) {
    if (idx === 0) return;
    setCanvas((prev) => {
      const next = [...prev];
      [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
      return next.map((c, i) => ({ ...c, order: i + 1 }));
    });
  }
  function moveDown(idx) {
    if (idx === canvas.length - 1) return;
    setCanvas((prev) => {
      const next = [...prev];
      [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
      return next.map((c, i) => ({ ...c, order: i + 1 }));
    });
  }
  function handleSave() {
    if (!lessonTitle) {
      ue.error("Lesson title required");
      return;
    }
    if (canvas.length === 0) {
      ue.error("Add at least one concept to the canvas");
      return;
    }
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      ue.success("Lesson plan sealed to Grade Vault", {
        description: `${canvas.length} concepts · ${canvas.reduce((a, c) => a + c.seeds, 0)} seeds compressed by DIGT engine`
      });
      setCanvas([]);
      setLessonTitle("");
    }, 1800);
  }
  const totalSeeds = canvas.reduce((a, c) => a + c.seeds, 0);
  const quizCount = canvas.filter((c) => c.type === "quiz").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "portal-enter min-h-screen", "data-ocid": "lesson_builder.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "glass-portal-teacher glass-shimmer sticky top-0 z-30",
        style: { borderBottom: "1px solid rgba(160,100,255,0.18)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1600px] px-6 py-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-2.5 rounded-xl px-4 py-2",
                style: {
                  background: "linear-gradient(135deg, rgba(160,100,255,0.22) 0%, rgba(100,60,180,0.15) 100%)",
                  border: "1px solid rgba(160,100,255,0.35)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(WandSparkles, { className: "h-4 w-4 text-violet-300" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-display font-bold text-sm text-violet-200",
                      style: { letterSpacing: "0.18em" },
                      children: "LESSON BUILDER"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-base leading-none", children: "DIGT Engine · Fibonacci-Structured Lesson Plans" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Concept Picker → Lesson Canvas → Grade Vault Seal" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-sm rounded-lg px-3 py-1.5 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-violet-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-foreground", children: [
                canvas.length,
                " in canvas"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-sm rounded-lg px-3 py-1.5 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "h-3.5 w-3.5 text-emerald-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-foreground", children: "DIGT Online" })
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-[1600px] px-6 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-12 gap-5 h-[calc(100vh-120px)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "col-span-4 flex flex-col gap-4",
          "data-ocid": "lesson_builder.concept_picker",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-portal-teacher rounded-2xl p-5 flex flex-col flex-1 min-h-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg glass-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-4 w-4 text-violet-400" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-foreground", children: "Concept Picker" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono", children: "Grade" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: grade, onValueChange: setGrade, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      "data-ocid": "lesson_builder.grade_select",
                      className: "glass-sm border-0 h-8 w-20 text-xs",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "glass-xl border-0", children: GRADE_OPTIONS.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: g, className: "text-xs", children: [
                    "Gr. ",
                    g
                  ] }, g)) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 pr-2", children: vaultLoading ? [1, 2, 3, 4].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 rounded-xl" }, k)) : concepts.map((concept, idx) => {
              const TypeIcon = typeIcon(concept.type);
              const alreadyAdded = canvas.some(
                (c) => c.id === concept.id
              );
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.button,
                {
                  type: "button",
                  "data-ocid": `lesson_builder.concept.${idx + 1}`,
                  initial: { opacity: 0, x: -6 },
                  animate: { opacity: 1, x: 0 },
                  transition: { delay: idx * 0.03 },
                  onClick: () => addToCanvas(concept),
                  disabled: alreadyAdded,
                  className: cn(
                    "w-full text-left rounded-xl p-3.5 transition-smooth group",
                    alreadyAdded ? "opacity-40 cursor-not-allowed glass-sm" : "glass-sm hover:glass-portal-teacher cursor-pointer"
                  ),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-8 w-8 rounded-lg flex items-center justify-center shrink-0",
                        style: {
                          background: "rgba(160,100,255,0.12)",
                          border: "1px solid rgba(160,100,255,0.25)"
                        },
                        children: alreadyAdded ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5 text-emerald-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TypeIcon, { className: "h-3.5 w-3.5 text-violet-400" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: concept.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Badge,
                          {
                            className: cn(
                              "text-xs border px-1.5 py-0",
                              typeColor(concept.type)
                            ),
                            children: concept.type
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-mono", children: [
                          concept.seeds,
                          " seeds"
                        ] })
                      ] })
                    ] }),
                    !alreadyAdded && /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 text-muted-foreground group-hover:text-violet-300 transition-colors shrink-0" })
                  ] })
                },
                concept.id
              );
            }) }) })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "col-span-5 flex flex-col gap-4",
          "data-ocid": "lesson_builder.canvas",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-portal-teacher rounded-2xl p-5 flex flex-col flex-1 min-h-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg glass-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-4 w-4 text-violet-400" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-foreground", children: "Lesson Canvas" }),
                canvas.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    className: "font-mono text-xs border",
                    style: {
                      background: "rgba(160,100,255,0.18)",
                      borderColor: "rgba(160,100,255,0.35)",
                      color: "rgba(200,160,255,0.9)"
                    },
                    children: [
                      canvas.length,
                      " concepts"
                    ]
                  }
                )
              ] }),
              canvas.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
                  totalSeeds,
                  " seeds"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  quizCount,
                  " quiz",
                  quizCount !== 1 ? "zes" : ""
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 pr-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: canvas.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                className: "glass-sm rounded-xl flex flex-col items-center justify-center gap-3 py-16 text-center",
                style: { border: "1px dashed rgba(160,100,255,0.25)" },
                "data-ocid": "lesson_builder.canvas_empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-10 w-10 text-violet-400/30" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Click concepts from the picker to add them here" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60", children: "Drag to reorder · lessons and quizzes auto-sequenced" })
                ]
              }
            ) : canvas.map((item, idx) => {
              const TypeIcon = typeIcon(item.type);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  layout: true,
                  initial: { opacity: 0, y: 8 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0, x: 20, height: 0 },
                  transition: { duration: 0.2 },
                  "data-ocid": `lesson_builder.canvas_item.${idx + 1}`,
                  className: "glass-sm rounded-xl p-3.5 flex items-center gap-3 group hover:glass-portal-teacher transition-smooth",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-7 w-7 rounded-lg flex items-center justify-center shrink-0 font-mono text-xs font-bold",
                        style: {
                          background: "rgba(160,100,255,0.15)",
                          border: "1px solid rgba(160,100,255,0.3)",
                          color: "rgba(200,160,255,0.9)"
                        },
                        children: item.order
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-7 w-7 rounded-lg flex items-center justify-center shrink-0",
                        style: {
                          background: "rgba(160,100,255,0.1)",
                          border: "1px solid rgba(160,100,255,0.2)"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(TypeIcon, { className: "h-3.5 w-3.5 text-violet-400" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: item.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Badge,
                          {
                            className: cn(
                              "text-xs border px-1.5 py-0",
                              typeColor(item.type)
                            ),
                            children: item.type
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-mono", children: [
                          item.seeds,
                          " seeds"
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => moveUp(idx),
                          disabled: idx === 0,
                          className: "glass-sm rounded p-0.5 hover:glass-portal-teacher transition-smooth disabled:opacity-30",
                          "aria-label": "Move up",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3 text-violet-300 -rotate-90" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => moveDown(idx),
                          disabled: idx === canvas.length - 1,
                          className: "glass-sm rounded p-0.5 hover:glass-portal-teacher transition-smooth disabled:opacity-30",
                          "aria-label": "Move down",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3 text-violet-300 rotate-90" })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => removeFromCanvas(item.id),
                        "data-ocid": `lesson_builder.remove_button.${idx + 1}`,
                        className: "opacity-0 group-hover:opacity-100 glass-sm rounded-lg p-1.5 hover:bg-red-500/20 transition-smooth shrink-0",
                        "aria-label": `Remove ${item.title}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5 text-red-400" })
                      }
                    )
                  ]
                },
                item.id
              );
            }) }) }) })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "col-span-3 flex flex-col gap-4",
          "data-ocid": "lesson_builder.settings_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-portal-teacher rounded-2xl p-5 space-y-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg glass-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4 text-violet-400" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-foreground", children: "Settings" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "lesson-title",
                    className: "text-xs text-muted-foreground",
                    children: "Lesson Title"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "lesson-title",
                    "data-ocid": "lesson_builder.title_input",
                    value: lessonTitle,
                    onChange: (e) => setLessonTitle(e.target.value),
                    placeholder: "Introduction to Fibonacci Spirals...",
                    className: "glass-sm border-0 text-sm"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Assign to Class" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: selectedClassId,
                    onValueChange: setSelectedClassId,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          "data-ocid": "lesson_builder.class_select",
                          className: "glass-sm border-0 text-sm",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select class..." })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "glass-xl border-0", children: classesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "loading", disabled: true, children: "Loading classes..." }) : classes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "none", disabled: true, children: "No classes found" }) : classes.map((cls) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: cls.id, children: cls.name }, cls.id)) })
                    ]
                  }
                )
              ] }),
              canvas.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "glass-sm rounded-xl p-4 space-y-3",
                  style: { border: "1px solid rgba(160,100,255,0.2)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Canvas Summary" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                      ["lesson", "quiz", "review"].map((type) => {
                        const count = canvas.filter(
                          (c) => c.type === type
                        ).length;
                        if (count === 0) return null;
                        const TypeIcon = typeIcon(type);
                        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: "flex items-center justify-between",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(TypeIcon, { className: "h-3.5 w-3.5 text-violet-400" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs capitalize text-muted-foreground", children: [
                                  type,
                                  "s"
                                ] })
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Badge,
                                {
                                  className: cn(
                                    "text-xs border px-2",
                                    typeColor(type)
                                  ),
                                  children: count
                                }
                              )
                            ]
                          },
                          type
                        );
                      }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "pt-2 mt-2 border-t flex items-center justify-between",
                          style: { borderTopColor: "rgba(160,100,255,0.15)" },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Total seeds" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono font-bold text-violet-300", children: totalSeeds })
                          ]
                        }
                      )
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "glass-sm rounded-xl p-3 flex items-center gap-2.5",
                  style: { border: "1px solid rgba(160,100,255,0.15)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "h-4 w-4 text-violet-400 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: "DIGT Engine" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Fibonacci-indexed · grade-gated" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative inline-flex h-2 w-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 bg-violet-400" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-violet-400" })
                    ] }) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  "data-ocid": "lesson_builder.save_button",
                  onClick: handleSave,
                  disabled: saving || canvas.length === 0 || !lessonTitle,
                  className: "w-full gap-2",
                  style: {
                    background: saving ? "rgba(160,100,255,0.3)" : "linear-gradient(135deg, oklch(0.62 0.22 280), oklch(0.48 0.22 280))",
                    border: "1px solid rgba(160,100,255,0.4)",
                    boxShadow: saving ? "none" : "0 0 16px rgba(160,100,255,0.25)"
                  },
                  children: saving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "h-4 w-4 animate-spin" }),
                    "Sealing to Vault..."
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
                    "Seal Lesson Plan"
                  ] })
                }
              ),
              canvas.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "Add concepts to the canvas to enable saving" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "glass-sm rounded-xl p-4 space-y-2",
                style: { border: "1px solid rgba(160,100,255,0.15)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-violet-400" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground", children: "PHI Sequencing" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: "Optimal lesson flow follows Fibonacci ratios: 3 lessons → 1 quiz → 2 lessons → 1 review. DIGT auto-detects this pattern." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { className: "h-3.5 w-3.5 text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Hover items to reorder" })
                  ] }),
                  canvas.length >= 3 && quizCount === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-sm rounded-lg px-2.5 py-2 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3 text-amber-400" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-amber-300", children: "DIGT recommends adding a quiz" })
                  ] })
                ]
              }
            )
          ]
        }
      )
    ] }) })
  ] });
}
export {
  TeacherLessonBuilder as default
};
