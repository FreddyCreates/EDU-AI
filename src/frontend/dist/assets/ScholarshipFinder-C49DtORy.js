import { j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { B as Button } from "./button-CWs7EcLL.js";
import { L as Link } from "./router-D6GUppNf.js";
import { A as ArrowLeft } from "./arrow-left-DLov4c1N.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { a as Award } from "./index-BivnQ6bB.js";
import { C as CircleCheck } from "./circle-check-Bol12715.js";
import { C as Clock } from "./clock-DmeOF2sv.js";
import { E as ExternalLink } from "./external-link-YoAHtQNH.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./query-8urnerR0.js";
const scholarships = [
  {
    id: "1",
    name: "NSHSS Academic Excellence Award",
    organization: "National Society of High School Scholars",
    amount: 1e4,
    deadline: "Jul 1, 2026",
    matchScore: 89,
    status: "not_started",
    criteria: ["GPA 3.5+", "Community service", "STEM focus"]
  },
  {
    id: "2",
    name: "Texas Public Education Grant",
    organization: "Texas Higher Education Coordinating Board",
    amount: 5e3,
    deadline: "Jun 15, 2026",
    matchScore: 95,
    status: "in_progress",
    criteria: ["Texas resident", "Financial need", "Full-time enrollment"]
  },
  {
    id: "3",
    name: "Hispanic Scholarship Fund",
    organization: "HSF National",
    amount: 5e3,
    deadline: "May 30, 2026",
    matchScore: 88,
    status: "submitted",
    criteria: ["Hispanic heritage", "GPA 3.0+", "US citizen or DACA"]
  },
  {
    id: "4",
    name: "Ron Brown Scholar Program",
    organization: "College Fund",
    amount: 4e4,
    deadline: "Sep 1, 2026",
    matchScore: 72,
    status: "not_started",
    criteria: ["Academic excellence", "Leadership", "Community impact"]
  }
];
const statusConfig = {
  not_started: {
    label: "Not Started",
    class: "bg-white/10 text-[oklch(0.6_0.06_265)] border-white/20"
  },
  in_progress: {
    label: "In Progress",
    class: "bg-[oklch(0.7_0.18_270)]/20 text-[oklch(0.7_0.18_270)] border-[oklch(0.7_0.18_270)]/30"
  },
  submitted: {
    label: "Submitted",
    class: "bg-[oklch(0.7_0.18_150)]/20 text-[oklch(0.7_0.18_150)] border-[oklch(0.7_0.18_150)]/30"
  },
  awarded: {
    label: "Awarded!",
    class: "bg-[oklch(0.85_0.15_85)]/20 text-[oklch(0.85_0.15_85)] border-[oklch(0.85_0.15_85)]/30"
  },
  denied: {
    label: "Not Selected",
    class: "bg-[oklch(0.65_0.22_30)]/20 text-[oklch(0.75_0.2_60)] border-[oklch(0.65_0.22_30)]/30"
  }
};
function ScholarshipFinder() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "student.scholarships.page",
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-[oklch(0.95_0.02_265)]", children: "Scholarship Finder" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.5_0.06_265)] text-xs", children: "ACHV-matched programs · RCGN pipeline" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 mb-8", children: [
          {
            label: "Matched",
            value: scholarships.length,
            color: "oklch(0.85_0.15_85)"
          },
          {
            label: "Applied",
            value: scholarships.filter(
              (s) => ["in_progress", "submitted"].includes(s.status)
            ).length,
            color: "oklch(0.7_0.18_270)"
          },
          {
            label: "Total Available",
            value: `$${(scholarships.reduce((a, s) => a + s.amount, 0) / 1e3).toFixed(0)}k`,
            color: "oklch(0.7_0.18_150)"
          }
        ].map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            transition: { delay: i * 0.07 },
            className: "bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-3 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold", style: { color: s.color }, children: s.value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.5_0.06_265)] text-xs mt-0.5", children: s.label })
            ]
          },
          s.label
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: scholarships.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            "data-ocid": `student.scholarship.${i + 1}`,
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: i * 0.1 },
            className: "bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-[oklch(0.85_0.15_85)]/15 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-5 h-5 text-[oklch(0.85_0.15_85)]" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[oklch(0.9_0.05_265)] font-semibold text-sm leading-tight", children: s.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.5_0.06_265)] text-xs mt-0.5", children: s.organization })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0 ml-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[oklch(0.85_0.15_85)] font-bold", children: [
                    "$",
                    s.amount.toLocaleString()
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: `text-xs mt-1 ${statusConfig[s.status].class}`,
                      children: statusConfig[s.status].label
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[oklch(0.5_0.06_265)]", children: "ACHV Match Score" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[oklch(0.85_0.15_85)] font-semibold", children: [
                    s.matchScore,
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-white/10 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { width: 0 },
                    animate: { width: `${s.matchScore}%` },
                    transition: { delay: 0.4 + i * 0.1, duration: 0.7 },
                    className: "h-full bg-gradient-to-r from-[oklch(0.85_0.15_85)] to-[oklch(0.7_0.18_60)] rounded-full"
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mb-4", children: s.criteria.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "text-xs px-2 py-0.5 bg-white/10 text-[oklch(0.6_0.06_265)] rounded-full flex items-center gap-1",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-2.5 h-2.5 text-[oklch(0.7_0.18_150)]" }),
                    c
                  ]
                },
                c
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-[oklch(0.5_0.06_265)] text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                  "Deadline: ",
                  s.deadline
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    "data-ocid": `student.scholarship.apply.${i + 1}`,
                    size: "sm",
                    className: "bg-[oklch(0.85_0.15_85)]/15 hover:bg-[oklch(0.85_0.15_85)]/25 text-[oklch(0.85_0.15_85)] border border-[oklch(0.85_0.15_85)]/30 text-xs",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3 mr-1" }),
                      " Apply"
                    ]
                  }
                )
              ] })
            ]
          },
          s.id
        )) })
      ]
    }
  );
}
export {
  ScholarshipFinder as default
};
