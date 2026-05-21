import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { B as Button } from "./button-CWs7EcLL.js";
import { L as Link } from "./router-D6GUppNf.js";
import { A as ArrowLeft } from "./arrow-left-DLov4c1N.js";
import { P as Plus } from "./plus-DLM4cYLL.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { F as FileText } from "./file-text-BbUEM46N.js";
import { C as ChevronUp } from "./chevron-up-BZKIp_lu.js";
import { C as ChevronDown } from "./chevron-down-B2BSsDRF.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./index-BivnQ6bB.js";
import "./query-8urnerR0.js";
const sampleAssignments = [
  {
    id: "1",
    title: "Quadratic Equations Practice Set",
    type: "homework",
    dueDate: "May 22, 2026",
    totalPoints: 50,
    submissions: 22,
    total: 28,
    graded: 8
  },
  {
    id: "2",
    title: "Chapter 7 Quiz — Factoring",
    type: "quiz",
    dueDate: "May 24, 2026",
    totalPoints: 25,
    submissions: 14,
    total: 28,
    graded: 0
  },
  {
    id: "3",
    title: "Unit 4 Test — Polynomials",
    type: "test",
    dueDate: "May 28, 2026",
    totalPoints: 100,
    submissions: 0,
    total: 28,
    graded: 0
  }
];
const typeColor = {
  homework: "bg-[oklch(0.7_0.18_270)]/20 text-[oklch(0.7_0.18_270)] border-[oklch(0.7_0.18_270)]/30",
  quiz: "bg-[oklch(0.85_0.15_85)]/20 text-[oklch(0.85_0.15_85)] border-[oklch(0.85_0.15_85)]/30",
  test: "bg-[oklch(0.65_0.22_30)]/20 text-[oklch(0.75_0.2_60)] border-[oklch(0.65_0.22_30)]/30",
  project: "bg-[oklch(0.7_0.18_320)]/20 text-[oklch(0.7_0.18_320)] border-[oklch(0.7_0.18_320)]/30",
  essay: "bg-[oklch(0.7_0.18_150)]/20 text-[oklch(0.7_0.18_150)] border-[oklch(0.7_0.18_150)]/30"
};
function Assignments() {
  const [expanded, setExpanded] = reactExports.useState(null);
  const [showCreate, setShowCreate] = reactExports.useState(false);
  const [title, setTitle] = reactExports.useState("");
  const [type, setType] = reactExports.useState("homework");
  const [dueDate, setDueDate] = reactExports.useState("");
  const [points, setPoints] = reactExports.useState("25");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "teacher.assignments.page",
      className: "min-h-screen bg-[oklch(0.08_0.02_265)] p-4 md:p-8",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/teacher",
                className: "text-[oklch(0.6_0.08_265)] hover:text-[oklch(0.85_0.15_85)] transition-colors",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-[oklch(0.95_0.02_265)]", children: "Assignments" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.5_0.06_265)] text-xs", children: "Algebra II — Period 3" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              "data-ocid": "teacher.assignments.create_button",
              onClick: () => setShowCreate(!showCreate),
              size: "sm",
              className: "bg-[oklch(0.85_0.15_85)]/20 hover:bg-[oklch(0.85_0.15_85)]/30 text-[oklch(0.85_0.15_85)] border border-[oklch(0.85_0.15_85)]/30",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1" }),
                " New"
              ]
            }
          )
        ] }),
        showCreate && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -8 },
            animate: { opacity: 1, y: 0 },
            className: "bg-white/5 border border-[oklch(0.85_0.15_85)]/30 backdrop-blur-xl rounded-2xl p-5 mb-6 space-y-4",
            "data-ocid": "teacher.assignments.create_form",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest", children: "New Assignment" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  "data-ocid": "teacher.assignments.title_input",
                  type: "text",
                  placeholder: "Assignment title",
                  value: title,
                  onChange: (e) => setTitle(e.target.value),
                  className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[oklch(0.85_0.05_265)] text-sm placeholder:text-[oklch(0.4_0.05_265)] focus:outline-none focus:border-[oklch(0.85_0.15_85)]/40 transition-colors"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    "data-ocid": "teacher.assignments.type_select",
                    value: type,
                    onChange: (e) => setType(e.target.value),
                    className: "bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-[oklch(0.8_0.05_265)] text-sm focus:outline-none focus:border-[oklch(0.85_0.15_85)]/40",
                    children: [
                      "homework",
                      "quiz",
                      "test",
                      "project",
                      "essay"
                    ].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: t, className: "bg-[oklch(0.1_0.02_265)]", children: t.charAt(0).toUpperCase() + t.slice(1) }, t))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    "data-ocid": "teacher.assignments.points_input",
                    type: "number",
                    placeholder: "Points",
                    value: points,
                    onChange: (e) => setPoints(e.target.value),
                    className: "bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[oklch(0.85_0.05_265)] text-sm placeholder:text-[oklch(0.4_0.05_265)] focus:outline-none focus:border-[oklch(0.85_0.15_85)]/40"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  "data-ocid": "teacher.assignments.due_date_input",
                  type: "date",
                  value: dueDate,
                  onChange: (e) => setDueDate(e.target.value),
                  className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[oklch(0.85_0.05_265)] text-sm focus:outline-none focus:border-[oklch(0.85_0.15_85)]/40"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    "data-ocid": "teacher.assignments.publish_button",
                    className: "flex-1 bg-[oklch(0.85_0.15_85)]/20 hover:bg-[oklch(0.85_0.15_85)]/30 text-[oklch(0.85_0.15_85)] border border-[oklch(0.85_0.15_85)]/30",
                    children: "Publish Assignment"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    "data-ocid": "teacher.assignments.cancel_button",
                    variant: "outline",
                    onClick: () => setShowCreate(false),
                    className: "border-white/20 text-[oklch(0.6_0.08_265)] hover:bg-white/10",
                    children: "Cancel"
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: sampleAssignments.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            "data-ocid": `teacher.assignment.${i + 1}`,
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: i * 0.08 },
            className: "bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl overflow-hidden",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setExpanded(expanded === a.id ? null : a.id),
                  className: "w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-[oklch(0.55_0.06_265)] shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.85_0.05_265)] text-sm font-medium truncate", children: a.title }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[oklch(0.5_0.06_265)] text-xs", children: [
                          "Due ",
                          a.dueDate,
                          " · ",
                          a.totalPoints,
                          "pts"
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 shrink-0 ml-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `text-xs ${typeColor[a.type]}`, children: a.type }),
                      expanded === a.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-[oklch(0.5_0.06_265)]" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-[oklch(0.5_0.06_265)]" })
                    ] })
                  ]
                }
              ),
              expanded === a.id && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { height: 0 },
                  animate: { height: "auto" },
                  className: "overflow-hidden",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-4 pt-0 border-t border-white/10", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4 mt-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-[oklch(0.85_0.15_85)]", children: a.submissions }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.5_0.06_265)] text-xs", children: "Submitted" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-[oklch(0.65_0.22_30)]", children: a.total - a.submissions }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.5_0.06_265)] text-xs", children: "Pending" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-[oklch(0.7_0.18_150)]", children: a.graded }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.5_0.06_265)] text-xs", children: "Graded" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 h-2 bg-white/10 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-full bg-[oklch(0.85_0.15_85)] rounded-full",
                        style: { width: `${a.submissions / a.total * 100}%` }
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[oklch(0.5_0.06_265)] text-xs text-right mt-1", children: [
                      Math.round(a.submissions / a.total * 100),
                      "% submitted"
                    ] })
                  ] })
                }
              )
            ]
          },
          a.id
        )) })
      ]
    }
  );
}
export {
  Assignments as default
};
