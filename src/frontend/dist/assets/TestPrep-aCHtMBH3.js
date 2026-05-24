import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { B as Button } from "./button-CWs7EcLL.js";
import { L as Link } from "./router-D6GUppNf.js";
import { A as ArrowLeft } from "./arrow-left-DLov4c1N.js";
import { m as motion, A as AnimatePresence } from "./motion-BK2wxCtX.js";
import { i as createLucideIcon, B as BookOpen } from "./index-BivnQ6bB.js";
import { C as CircleCheck } from "./circle-check-Bol12715.js";
import { C as ChartNoAxesColumn } from "./chart-no-axes-column-IdgePoJZ.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./query-8urnerR0.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
];
const Target = createLucideIcon("target", __iconNode);
const testModes = [
  {
    type: "STAAR",
    description: "State of Texas Assessment",
    color: "oklch(0.85_0.15_85)"
  },
  {
    type: "SAT",
    description: "College Board SAT Exam",
    color: "oklch(0.7_0.18_270)"
  },
  {
    type: "ACT",
    description: "ACT College Readiness",
    color: "oklch(0.7_0.18_150)"
  },
  {
    type: "PSAT",
    description: "PSAT / National Merit",
    color: "oklch(0.7_0.18_320)"
  },
  {
    type: "AP",
    description: "AP Exam Preparation",
    color: "oklch(0.65_0.22_30)"
  }
];
const projections = {
  STAAR: { current: 72, projected: 81, target: 90, sessions: 13 },
  SAT: { current: 1120, projected: 1210, target: 1350, sessions: 21 },
  ACT: { current: 24, projected: 27, target: 30, sessions: 21 },
  PSAT: { current: 980, projected: 1060, target: 1150, sessions: 13 },
  AP: { current: 3, projected: 4, target: 5, sessions: 8 }
};
const strategies = [
  "Process of Elimination: Remove 2 wrong answers first",
  "Time Boxing: 90 seconds per question, flag and return",
  "Key Word Underline: Circle what the question is actually asking",
  "Back-solve from Answers: Start with C on multiple choice math"
];
function TestPrep() {
  const [selected, setSelected] = reactExports.useState(null);
  const proj = selected ? projections[selected] : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "student.testprep.page",
      className: "min-h-screen bg-[oklch(0.08_0.02_265)] px-4 py-6 pb-24",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/dashboard",
              className: "text-[oklch(0.6_0.08_265)] hover:text-[oklch(0.85_0.15_85)] transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-[oklch(0.95_0.02_265)]", children: "Test Prep" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.5_0.06_265)] text-xs", children: "STAAR · SAT · ACT · AP · PSAT" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-4", children: "Select Test Mode" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-3", children: testModes.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.button,
            {
              type: "button",
              "data-ocid": `student.testprep.mode.${t.type.toLowerCase()}`,
              initial: { opacity: 0, x: -12 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: i * 0.07 },
              onClick: () => setSelected(t.type),
              className: `flex items-center justify-between p-4 rounded-xl border text-left transition-all ${selected === t.type ? "border-[oklch(0.85_0.15_85)]/50 bg-[oklch(0.85_0.15_85)]/10" : "border-white/10 bg-white/5 hover:bg-white/8"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-10 h-10 rounded-xl flex items-center justify-center",
                      style: { background: `${t.color}20` },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5", style: { color: t.color } })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.9_0.05_265)] font-semibold", children: t.type }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.5_0.06_265)] text-xs", children: t.description })
                  ] })
                ] }),
                selected === t.type && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-[oklch(0.85_0.15_85)]" })
              ]
            },
            t.type
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: proj && selected && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.section,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -8 },
            className: "mb-8",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "inline w-4 h-4 mr-2" }),
                "Score Projection — ",
                selected
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4 mb-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-[oklch(0.65_0.06_265)]", children: proj.current }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.5_0.06_265)] text-xs mt-0.5", children: "Current" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-[oklch(0.85_0.15_85)]", children: proj.projected }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.5_0.06_265)] text-xs mt-0.5", children: "Projected" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-[oklch(0.7_0.18_150)]", children: proj.target }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.5_0.06_265)] text-xs mt-0.5", children: "Target" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[oklch(0.6_0.06_265)] text-xs text-center", children: [
                  "~",
                  proj.sessions,
                  " sessions to reach target · FIBR-projected"
                ] })
              ] })
            ]
          },
          "projection"
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "inline w-4 h-4 mr-2" }),
            "Strategy Notes"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: strategies.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              "data-ocid": `student.testprep.strategy.${i + 1}`,
              initial: { opacity: 0, y: 6 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.5 + i * 0.07 },
              className: "flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-xl",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-[oklch(0.85_0.15_85)]/20 flex items-center justify-center text-[oklch(0.85_0.15_85)] text-xs font-bold shrink-0 mt-0.5", children: i + 1 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.8_0.05_265)] text-sm", children: s })
              ]
            },
            s
          )) })
        ] }),
        selected && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            "data-ocid": "student.testprep.start_button",
            className: "w-full bg-[oklch(0.85_0.15_85)]/20 hover:bg-[oklch(0.85_0.15_85)]/30 text-[oklch(0.85_0.15_85)] border border-[oklch(0.85_0.15_85)]/30 py-6 text-lg font-semibold",
            children: [
              "Start ",
              selected,
              " Practice Session"
            ]
          }
        ) })
      ]
    }
  );
}
export {
  TestPrep as default
};
