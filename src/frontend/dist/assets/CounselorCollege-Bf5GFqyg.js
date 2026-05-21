import { j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { L as Link } from "./router-D6GUppNf.js";
import { A as ArrowLeft } from "./arrow-left-DLov4c1N.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { B as BookOpen, a as Award } from "./index-BivnQ6bB.js";
import { C as Calendar } from "./calendar-CWsAbHSP.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./query-8urnerR0.js";
const students = [
  {
    name: "Priya Nair",
    stage: "deciding",
    gpa: 3.9,
    sat: 1380,
    ap: ["Calc BC", "US History", "English Lang"],
    colleges: ["UT Austin", "Texas A&M", "Rice"],
    deadline: "May 1, 2026"
  },
  {
    name: "Sofia Garcia",
    stage: "applying",
    gpa: 3.5,
    sat: 1180,
    ap: ["Algebra II", "Spanish IV"],
    colleges: ["UTA", "UNT", "UTSA"],
    deadline: "Jun 1, 2026"
  },
  {
    name: "Aiden Park",
    stage: "preparing",
    gpa: 3.2,
    sat: null,
    ap: ["Pre-Calc"],
    colleges: ["Community College", "TWU"],
    deadline: "Aug 1, 2026"
  }
];
const stageColors = {
  deciding: "bg-[oklch(0.7_0.18_150)]/20 text-[oklch(0.7_0.18_150)] border-[oklch(0.7_0.18_150)]/30",
  applying: "bg-[oklch(0.85_0.15_85)]/20 text-[oklch(0.85_0.15_85)] border-[oklch(0.85_0.15_85)]/30",
  preparing: "bg-[oklch(0.7_0.18_270)]/20 text-[oklch(0.7_0.18_270)] border-[oklch(0.7_0.18_270)]/30",
  exploring: "bg-white/10 text-[oklch(0.6_0.06_265)] border-white/20"
};
function CounselorCollege() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "counselor.college.page",
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-[oklch(0.95_0.02_265)]", children: "College Readiness" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", children: students.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            "data-ocid": `counselor.college_student.${i + 1}`,
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: i * 0.1 },
            className: "bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[oklch(0.9_0.05_265)] font-semibold", children: s.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-1 text-xs text-[oklch(0.55_0.06_265)]", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "GPA ",
                      s.gpa
                    ] }),
                    s.sat && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "SAT ",
                      s.sat
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `text-xs ${stageColors[s.stage]}`, children: s.stage })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[oklch(0.55_0.06_265)] text-xs mb-1.5 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3 h-3" }),
                  " AP/IB Courses"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: s.ap.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs px-2 py-0.5 bg-[oklch(0.85_0.15_85)]/15 text-[oklch(0.85_0.15_85)] rounded-full",
                    children: c
                  },
                  c
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[oklch(0.55_0.06_265)] text-xs mb-1.5 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-3 h-3" }),
                  " Target Colleges"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: s.colleges.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs px-2 py-0.5 bg-white/10 text-[oklch(0.7_0.06_265)] rounded-full",
                    children: c
                  },
                  c
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-3 border-t border-white/10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5 text-[oklch(0.85_0.15_85)]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[oklch(0.7_0.06_265)] text-xs", children: [
                  "Next deadline: ",
                  s.deadline
                ] })
              ] })
            ]
          },
          s.name
        )) })
      ]
    }
  );
}
export {
  CounselorCollege as default
};
