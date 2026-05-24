import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { B as Button } from "./button-CWs7EcLL.js";
import { L as Link } from "./router-D6GUppNf.js";
import { A as ArrowLeft } from "./arrow-left-DLov4c1N.js";
import { P as Plus } from "./plus-DLM4cYLL.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { U as Users, g as Activity } from "./index-BivnQ6bB.js";
import { C as Clock } from "./clock-DmeOF2sv.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./query-8urnerR0.js";
const groups = [
  {
    groupId: "g1",
    name: "Algebra Foundations",
    subject: "Algebra II",
    members: ["Marcus M.", "James W.", "Sofia G."],
    sssRange: [8, 21],
    active: true,
    sessions: [
      { date: "May 17", duration: 55, topics: ["Factoring", "Quadratics"] },
      { date: "May 14", duration: 34, topics: ["Polynomials"] }
    ]
  },
  {
    groupId: "g2",
    name: "Advanced Mastery",
    subject: "Algebra II",
    members: ["Priya N.", "Emma C.", "Aiden P."],
    sssRange: [55, 89],
    active: true,
    sessions: [
      {
        date: "May 16",
        duration: 89,
        topics: ["Complex Numbers", "Conic Sections"]
      }
    ]
  },
  {
    groupId: "g3",
    name: "Building Block Group",
    subject: "Algebra II",
    members: ["Carlos M.", "David L."],
    sssRange: [3, 8],
    active: false,
    sessions: []
  }
];
function StudyGroups() {
  const [expanded, setExpanded] = reactExports.useState("g1");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "teacher.studygroups.page",
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
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-[oklch(0.95_0.02_265)]", children: "Study Groups" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.5_0.06_265)] text-xs", children: "SSS-range matched · FIBR-aligned" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              "data-ocid": "teacher.studygroups.create_button",
              size: "sm",
              className: "bg-[oklch(0.85_0.15_85)]/20 hover:bg-[oklch(0.85_0.15_85)]/30 text-[oklch(0.85_0.15_85)] border border-[oklch(0.85_0.15_85)]/30",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1" }),
                " New Group"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: -8 },
            animate: { opacity: 1, y: 0 },
            className: "bg-[oklch(0.85_0.15_85)]/8 border border-[oklch(0.85_0.15_85)]/20 rounded-xl p-4 mb-6",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[oklch(0.8_0.08_265)] text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[oklch(0.85_0.15_85)] font-semibold", children: "SSS-Range Matching" }),
              " ",
              "— Groups are formed by matching students within the same Fibonacci SSS band. Students within 1 Fibonacci level of each other learn most effectively together."
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: groups.map((g, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            "data-ocid": `teacher.studygroup.${i + 1}`,
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: i * 0.1 },
            className: "bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl overflow-hidden",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setExpanded(expanded === g.groupId ? null : g.groupId),
                  className: "w-full flex items-start justify-between p-5 text-left hover:bg-white/5 transition-colors",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-[oklch(0.85_0.15_85)]/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 text-[oklch(0.85_0.15_85)]" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.9_0.05_265)] font-semibold", children: g.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[oklch(0.5_0.06_265)] text-xs", children: [
                          g.members.length,
                          " members · SSS F(",
                          g.sssRange[0],
                          "–",
                          g.sssRange[1],
                          ")"
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        className: `text-xs ${g.active ? "bg-[oklch(0.7_0.18_150)]/20 text-[oklch(0.7_0.18_150)] border-[oklch(0.7_0.18_150)]/30" : "bg-white/10 text-[oklch(0.5_0.06_265)] border-white/20"}`,
                        children: g.active ? "Active" : "Inactive"
                      }
                    ) })
                  ]
                }
              ),
              expanded === g.groupId && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { height: 0 },
                  animate: { height: "auto" },
                  className: "overflow-hidden",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-5 border-t border-white/10 pt-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.55_0.06_265)] text-xs mb-2", children: "Members" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: g.members.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-xs px-3 py-1 bg-white/10 text-[oklch(0.7_0.08_265)] rounded-full",
                          children: m
                        },
                        m
                      )) })
                    ] }),
                    g.sessions.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[oklch(0.55_0.06_265)] text-xs mb-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "inline w-3 h-3 mr-1" }),
                        "Session Logs"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: g.sessions.map((s, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          "data-ocid": `teacher.studygroup.session.${i + 1}.${j + 1}`,
                          className: "flex items-center justify-between text-xs p-3 bg-white/5 border border-white/10 rounded-lg",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[oklch(0.7_0.06_265)]", children: s.date }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[oklch(0.5_0.05_265)] ml-2", children: [
                                "· ",
                                s.topics.join(", ")
                              ] })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-[oklch(0.6_0.06_265)]", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                              s.duration,
                              "m"
                            ] })
                          ]
                        },
                        s.date
                      )) })
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.4_0.05_265)] text-xs", children: "No sessions yet" })
                  ] })
                }
              )
            ]
          },
          g.groupId
        )) })
      ]
    }
  );
}
export {
  StudyGroups as default
};
