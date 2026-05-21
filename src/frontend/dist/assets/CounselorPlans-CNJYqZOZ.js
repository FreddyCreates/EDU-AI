import { j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { L as Link } from "./router-D6GUppNf.js";
import { A as ArrowLeft } from "./arrow-left-DLov4c1N.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { C as Clock } from "./clock-DmeOF2sv.js";
import { C as CircleCheck } from "./circle-check-Bol12715.js";
import { i as createLucideIcon } from "./index-BivnQ6bB.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./query-8urnerR0.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
const Circle = createLucideIcon("circle", __iconNode);
const plans = [
  {
    name: "Aiden Park",
    type: "iep",
    status: "active",
    nextReview: "May 28, 2026",
    milestones: [
      { title: "Extended time accommodation confirmed", completed: true },
      { title: "Math support sessions scheduled (3x/week)", completed: true },
      { title: "Parent conference on IEP goals", completed: false },
      { title: "Mid-year progress assessment", completed: false }
    ]
  },
  {
    name: "Sofia Garcia",
    type: "college",
    status: "active",
    nextReview: "Jun 5, 2026",
    milestones: [
      { title: "FAFSA submitted", completed: true },
      { title: "Application list finalized (5 schools)", completed: true },
      { title: "Essay review session completed", completed: true },
      { title: "Acceptance decision by Jun 1", completed: false }
    ]
  },
  {
    name: "James Wilson",
    type: "general",
    status: "active",
    nextReview: "May 22, 2026",
    milestones: [
      { title: "Attendance contract signed", completed: true },
      { title: "Check-in meetings weekly", completed: false },
      { title: "Family contact for support plan", completed: false }
    ]
  }
];
const typeColor = {
  iep: "bg-[oklch(0.65_0.22_30)]/20 text-[oklch(0.75_0.2_60)] border-[oklch(0.65_0.22_30)]/30",
  college: "bg-[oklch(0.85_0.15_85)]/20 text-[oklch(0.85_0.15_85)] border-[oklch(0.85_0.15_85)]/30",
  general: "bg-white/10 text-[oklch(0.65_0.06_265)] border-white/20",
  career: "bg-[oklch(0.7_0.18_150)]/20 text-[oklch(0.7_0.18_150)] border-[oklch(0.7_0.18_150)]/30",
  "504": "bg-[oklch(0.7_0.18_270)]/20 text-[oklch(0.7_0.18_270)] border-[oklch(0.7_0.18_270)]/30",
  esl: "bg-[oklch(0.7_0.18_320)]/20 text-[oklch(0.7_0.18_320)] border-[oklch(0.7_0.18_320)]/30"
};
function CounselorPlans() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "counselor.plans.page",
      className: "min-h-screen bg-[oklch(0.08_0.02_265)] px-4 py-6 pb-24",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/counselor",
              className: "text-[oklch(0.6_0.08_265)] hover:text-[oklch(0.85_0.15_85)] transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-[oklch(0.95_0.02_265)]", children: "Counselor Plans" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", children: plans.map((plan, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            "data-ocid": `counselor.plan.${i + 1}`,
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: i * 0.1 },
            className: "bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[oklch(0.9_0.05_265)] font-semibold", children: plan.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 text-[oklch(0.5_0.06_265)]" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[oklch(0.5_0.06_265)] text-xs", children: [
                      "Review: ",
                      plan.nextReview
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `text-xs ${typeColor[plan.type]}`, children: plan.type.toUpperCase() })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: plan.milestones.map((m, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-start gap-3",
                  children: [
                    m.completed ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-[oklch(0.7_0.18_150)] mt-0.5 shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "w-4 h-4 text-[oklch(0.35_0.05_265)] mt-0.5 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: `text-sm leading-tight ${m.completed ? "text-[oklch(0.55_0.06_265)] line-through" : "text-[oklch(0.8_0.05_265)]"}`,
                        children: m.title
                      }
                    )
                  ]
                },
                m.title || `ms-${j}`
              )) }),
              (() => {
                const done = plan.milestones.filter((m) => m.completed).length;
                const pct = Math.round(done / plan.milestones.length * 100);
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[oklch(0.5_0.06_265)]", children: [
                      done,
                      "/",
                      plan.milestones.length,
                      " milestones"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[oklch(0.85_0.15_85)] font-semibold", children: [
                      pct,
                      "%"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-white/10 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { width: 0 },
                      animate: { width: `${pct}%` },
                      transition: { delay: 0.4 + i * 0.1, duration: 0.7 },
                      className: "h-full bg-[oklch(0.85_0.15_85)] rounded-full"
                    }
                  ) })
                ] });
              })()
            ]
          },
          plan.name
        )) })
      ]
    }
  );
}
export {
  CounselorPlans as default
};
