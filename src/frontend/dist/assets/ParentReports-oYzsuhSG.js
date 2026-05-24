import { j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { B as Button } from "./button-CWs7EcLL.js";
import { L as Link } from "./router-D6GUppNf.js";
import { A as ArrowLeft } from "./arrow-left-DLov4c1N.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { b as Star, a as Award } from "./index-BivnQ6bB.js";
import { D as Download } from "./download-dijSjmqv.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./query-8urnerR0.js";
const reports = [
  {
    term: "Spring 2026",
    gpa: 3.6,
    grade: "A-",
    highlights: ["Honor Roll", "RCGN Flag: Math"],
    issued: "May 15, 2026"
  },
  {
    term: "Fall 2025",
    gpa: 3.4,
    grade: "B+",
    highlights: ["Mastery Streak: 21 days"],
    issued: "Dec 18, 2025"
  },
  {
    term: "Spring 2025",
    gpa: 3.2,
    grade: "B",
    highlights: ["ESL Progress Award"],
    issued: "May 16, 2025"
  }
];
const achievements = [
  {
    title: "National Math Recognition — NSHSS Nominee",
    date: "Apr 2026",
    level: "national"
  },
  {
    title: "Perfect Attendance — February 2026",
    date: "Feb 2026",
    level: "school"
  },
  {
    title: "STAAR Approaches Grade Level — All Subjects",
    date: "Dec 2025",
    level: "state"
  }
];
function ParentReports() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "parent.reports.page",
      className: "min-h-screen bg-[oklch(0.08_0.02_265)] px-4 py-6 pb-24",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/parent",
              className: "text-[oklch(0.6_0.08_265)] hover:text-[oklch(0.85_0.15_85)] transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-[oklch(0.95_0.02_265)]", children: "Reports" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-4", children: "Progress Reports" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: reports.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              "data-ocid": `parent.report.${i + 1}`,
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: i * 0.1 },
              className: "bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[oklch(0.9_0.05_265)] font-semibold", children: r.term }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[oklch(0.5_0.06_265)] text-xs mt-0.5", children: [
                      "Issued ",
                      r.issued
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-[oklch(0.85_0.15_85)]", children: r.grade }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[oklch(0.55_0.06_265)] text-xs", children: [
                      "GPA ",
                      r.gpa
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: r.highlights.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    className: "bg-[oklch(0.85_0.15_85)]/15 text-[oklch(0.85_0.15_85)] border-[oklch(0.85_0.15_85)]/25 text-xs",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-2.5 h-2.5 mr-1" }),
                      h
                    ]
                  },
                  h
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    "data-ocid": `parent.report_download.${i + 1}`,
                    size: "sm",
                    variant: "outline",
                    className: "w-full border-white/20 text-[oklch(0.7_0.08_265)] hover:bg-white/10",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4 mr-2" }),
                      " Download Report"
                    ]
                  }
                )
              ]
            },
            r.term
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "inline w-4 h-4 mr-2" }),
            "Achievement Highlights"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: achievements.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              "data-ocid": `parent.achievement.${i + 1}`,
              initial: { opacity: 0, x: -12 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: 0.3 + i * 0.08 },
              className: "bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-4 flex items-center gap-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-[oklch(0.85_0.15_85)]/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-5 h-5 text-[oklch(0.85_0.15_85)]" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.85_0.05_265)] text-sm font-medium truncate", children: a.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.5_0.06_265)] text-xs", children: a.date })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: `shrink-0 text-xs ${a.level === "national" ? "bg-[oklch(0.85_0.15_85)]/20 text-[oklch(0.85_0.15_85)] border-[oklch(0.85_0.15_85)]/30" : a.level === "state" ? "bg-[oklch(0.7_0.18_270)]/20 text-[oklch(0.7_0.18_270)] border-[oklch(0.7_0.18_270)]/30" : "bg-white/10 text-[oklch(0.7_0.08_265)] border-white/20"}`,
                    children: a.level
                  }
                )
              ]
            },
            a.title
          )) })
        ] })
      ]
    }
  );
}
export {
  ParentReports as default
};
