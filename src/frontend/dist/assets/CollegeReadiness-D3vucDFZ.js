import { j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { L as Link } from "./router-D6GUppNf.js";
import { A as ArrowLeft } from "./arrow-left-DLov4c1N.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { B as BookOpen, G as GraduationCap } from "./index-BivnQ6bB.js";
import { C as Calendar } from "./calendar-CWsAbHSP.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./query-8urnerR0.js";
const stages = [
  { id: "exploring", label: "Exploring", done: true },
  { id: "preparing", label: "Preparing", done: true },
  { id: "applying", label: "Applying", done: false, current: true },
  { id: "deciding", label: "Deciding", done: false },
  { id: "enrolled", label: "Enrolled", done: false }
];
const colleges = [
  {
    name: "University of Texas at Austin",
    type: "Dream",
    deadline: "Dec 1",
    status: "researching"
  },
  {
    name: "Texas A&M University",
    type: "Target",
    deadline: "Jan 15",
    status: "researching"
  },
  {
    name: "University of Texas at Arlington",
    type: "Safety",
    deadline: "Mar 1",
    status: "accepted"
  },
  {
    name: "University of North Texas",
    type: "Safety",
    deadline: "Mar 15",
    status: "accepted"
  }
];
const apCourses = [
  "AP Calculus AB",
  "AP US History",
  "AP English Language",
  "AP Biology"
];
const timeline = [
  { date: "Jun 2026", event: "AP Exam results released", complete: false },
  {
    date: "Aug 2026",
    event: "Senior year begins — Common App opens",
    complete: false
  },
  { date: "Oct 2026", event: "Early Action deadlines begin", complete: false },
  {
    date: "Jan 2027",
    event: "Regular Decision deadline for most schools",
    complete: false
  },
  { date: "Apr 2027", event: "College Decision Day", complete: false }
];
function CollegeReadiness() {
  const readinessScore = 71;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "student.college.page",
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-[oklch(0.95_0.02_265)]", children: "College Readiness" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.5_0.06_265)] text-xs", children: "Admissions timeline · COGT-powered" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            className: "bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 mb-6 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.55_0.06_265)] text-xs uppercase tracking-widest mb-3", children: "Readiness Score" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-32 h-32 mx-auto mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "svg",
                  {
                    viewBox: "0 0 120 120",
                    className: "w-full h-full -rotate-90",
                    role: "img",
                    "aria-label": "College readiness score gauge",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "College readiness score gauge" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "circle",
                        {
                          cx: "60",
                          cy: "60",
                          r: "52",
                          fill: "none",
                          stroke: "oklch(1_0_0/0.08)",
                          strokeWidth: "10"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.circle,
                        {
                          cx: "60",
                          cy: "60",
                          r: "52",
                          fill: "none",
                          stroke: "oklch(0.85_0.15_85)",
                          strokeWidth: "10",
                          strokeLinecap: "round",
                          strokeDasharray: `${2 * Math.PI * 52}`,
                          initial: { strokeDashoffset: 2 * Math.PI * 52 },
                          animate: {
                            strokeDashoffset: 2 * Math.PI * 52 * (1 - readinessScore / 100)
                          },
                          transition: { duration: 1.2, delay: 0.3 }
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-[oklch(0.85_0.15_85)]", children: readinessScore }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[oklch(0.65_0.06_265)] text-sm", children: [
                "Stage:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[oklch(0.85_0.15_85)] font-semibold", children: "Applying" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 overflow-x-auto pb-2", children: stages.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${s.current ? "bg-[oklch(0.85_0.15_85)]/20 text-[oklch(0.85_0.15_85)] border border-[oklch(0.85_0.15_85)]/30" : s.done ? "bg-[oklch(0.7_0.18_150)]/20 text-[oklch(0.7_0.18_150)] border border-[oklch(0.7_0.18_150)]/20" : "bg-white/5 text-[oklch(0.45_0.05_265)] border border-white/10"}`,
              children: [
                s.done && !s.current && "✓ ",
                s.label
              ]
            }
          ),
          i < stages.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-px bg-white/20 mx-1" })
        ] }, s.id)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "inline w-4 h-4 mr-2" }),
            "AP/IB Courses"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: apCourses.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-xs px-3 py-1.5 bg-[oklch(0.85_0.15_85)]/15 text-[oklch(0.85_0.15_85)] rounded-full border border-[oklch(0.85_0.15_85)]/25",
              children: c
            },
            c
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "inline w-4 h-4 mr-2" }),
            "College List"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: colleges.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              "data-ocid": `student.college.school.${i + 1}`,
              initial: { opacity: 0, x: -8 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: i * 0.07 },
              className: "flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.85_0.05_265)] text-sm font-medium", children: c.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[oklch(0.5_0.06_265)] text-xs", children: [
                    "Deadline: ",
                    c.deadline
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: `text-xs ${c.type === "Dream" ? "bg-[oklch(0.7_0.18_320)]/20 text-[oklch(0.7_0.18_320)] border-[oklch(0.7_0.18_320)]/30" : c.type === "Target" ? "bg-[oklch(0.85_0.15_85)]/20 text-[oklch(0.85_0.15_85)] border-[oklch(0.85_0.15_85)]/30" : "bg-[oklch(0.7_0.18_150)]/20 text-[oklch(0.7_0.18_150)] border-[oklch(0.7_0.18_150)]/30"}`,
                      children: c.type
                    }
                  ),
                  c.status === "accepted" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[oklch(0.7_0.18_150)]", children: "✓ Accepted" })
                ] })
              ]
            },
            c.name
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "inline w-4 h-4 mr-2" }),
            "Admissions Timeline"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pl-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-1.5 top-0 bottom-0 w-px bg-white/10" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: timeline.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                "data-ocid": `student.college.timeline.${i + 1}`,
                initial: { opacity: 0, x: -8 },
                animate: { opacity: 1, x: 0 },
                transition: { delay: 0.5 + i * 0.07 },
                className: "relative",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -left-4 top-1.5 w-2.5 h-2.5 rounded-full bg-[oklch(0.85_0.15_85)]/30 border border-[oklch(0.85_0.15_85)]/50" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.85_0.15_85)] text-xs font-semibold", children: t.date }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.65_0.06_265)] text-sm mt-0.5", children: t.event })
                ]
              },
              t.date
            )) })
          ] })
        ] })
      ]
    }
  );
}
export {
  CollegeReadiness as default
};
