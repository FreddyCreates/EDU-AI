import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { c as cn, B as BookOpen } from "./index-BivnQ6bB.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { D as Download } from "./download-dijSjmqv.js";
import { T as TrendingUp } from "./trending-up-CpgQ7qb4.js";
import { C as ChartNoAxesColumn } from "./chart-no-axes-column-IdgePoJZ.js";
import "./query-8urnerR0.js";
import "./router-D6GUppNf.js";
const GOLD = "oklch(0.78 0.16 70)";
const TEAL = "oklch(0.72 0.16 185)";
const GRADE_ROWS = [
  { grade: "K", avgMastery: 72, students: 24, nominations: 3, struggles: 2 },
  { grade: "1", avgMastery: 68, students: 28, nominations: 2, struggles: 4 },
  { grade: "2", avgMastery: 74, students: 31, nominations: 4, struggles: 3 },
  { grade: "3", avgMastery: 81, students: 27, nominations: 6, struggles: 1 },
  { grade: "4", avgMastery: 79, students: 30, nominations: 5, struggles: 2 },
  { grade: "5", avgMastery: 83, students: 29, nominations: 7, struggles: 1 },
  { grade: "6", avgMastery: 77, students: 33, nominations: 4, struggles: 3 },
  { grade: "7", avgMastery: 71, students: 35, nominations: 3, struggles: 5 },
  { grade: "8", avgMastery: 76, students: 32, nominations: 4, struggles: 3 },
  { grade: "9", avgMastery: 68, students: 38, nominations: 2, struggles: 6 },
  { grade: "10", avgMastery: 73, students: 36, nominations: 4, struggles: 4 },
  { grade: "11", avgMastery: 82, students: 34, nominations: 8, struggles: 2 },
  { grade: "12", avgMastery: 89, students: 29, nominations: 11, struggles: 1 }
];
const SUBJECTS = [
  "ELA",
  "Math",
  "Science",
  "Social Studies",
  "Computer Science",
  "Spanish"
];
const GRADE_BANDS = ["K", "1–3", "4–6", "7–8", "9–12"];
const COVERAGE_MATRIX = {
  ELA: ["covered", "covered", "covered", "covered", "covered"],
  Math: ["covered", "covered", "covered", "partial", "partial"],
  Science: ["partial", "covered", "covered", "covered", "partial"],
  "Social Studies": ["partial", "partial", "covered", "covered", "covered"],
  "Computer Science": ["sparse", "sparse", "partial", "covered", "covered"],
  Spanish: ["sparse", "partial", "partial", "covered", "covered"]
};
const COVERAGE_DOT = {
  covered: { bg: "oklch(0.72 0.20 145)", label: "Covered" },
  partial: { bg: "oklch(0.72 0.18 70)", label: "Partial" },
  sparse: { bg: "oklch(0.55 0.20 25)", label: "Sparse" }
};
function PrincipalGradeReports() {
  const [selected, setSelected] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-[21px] space-y-[21px]", "data-ocid": "principal_reports.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        className: "flex items-center justify-between",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Grade Reports" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Performance + curriculum separated by sovereign protocol" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": "principal_reports.export_button",
              className: "flex items-center gap-2 glass-sm rounded-lg px-4 py-2 text-xs font-medium hover:text-foreground text-muted-foreground transition-smooth",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
                " Export"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-[1.618fr_1fr] gap-[21px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.section,
        {
          initial: { opacity: 0, x: -13 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.3 },
          "data-ocid": "principal_reports.performance_section",
          className: "space-y-[13px]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "glass-grade-vault rounded-xl px-5 py-3 flex items-center gap-3",
                style: { borderLeft: `3px solid ${GOLD}` },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 shrink-0", style: { color: GOLD } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-base text-foreground leading-none", children: "Grade Performance Dashboard" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "K–12 mastery · nominations · struggle alerts" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-grade-vault rounded-xl p-[21px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: "text-[10px] font-semibold uppercase tracking-widest mb-4 flex items-center gap-2",
                  style: { color: GOLD },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "h-3 w-3" }),
                    " Avg Mastery by Grade"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-1 h-24", children: GRADE_ROWS.map((g, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.button,
                {
                  type: "button",
                  "data-ocid": `principal_reports.bar.${i + 1}`,
                  initial: { scaleY: 0 },
                  animate: { scaleY: 1 },
                  transition: { delay: i * 0.04, duration: 0.35 },
                  style: { originY: 1 },
                  onClick: () => setSelected(selected === g.grade ? null : g.grade),
                  className: "flex-1 cursor-pointer hover:opacity-90 transition-smooth flex flex-col items-center gap-1",
                  title: `Grade ${g.grade}: ${g.avgMastery}%`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-full rounded-t-sm",
                      style: {
                        height: `${g.avgMastery}%`,
                        background: selected === g.grade ? GOLD : `rgba(255,185,0,${0.25 + g.avgMastery / 180})`
                      }
                    }
                  )
                },
                g.grade
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 mt-1", children: GRADE_ROWS.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "flex-1 text-center text-[8px] text-muted-foreground",
                  children: g.grade
                },
                g.grade
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-[5px]", children: GRADE_ROWS.map((g, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.button,
              {
                type: "button",
                "data-ocid": `principal_reports.grade_row.${i + 1}`,
                initial: { opacity: 0, x: -8 },
                animate: { opacity: 1, x: 0 },
                transition: { delay: 0.05 + i * 0.04 },
                onClick: () => setSelected(selected === g.grade ? null : g.grade),
                className: cn(
                  "w-full glass-grade-vault rounded-xl px-4 py-3 flex items-center gap-4 transition-smooth cursor-pointer hover:scale-[1.01] text-left",
                  selected === g.grade && "ring-1"
                ),
                style: selected === g.grade ? { boxShadow: `0 0 0 1px ${GOLD}` } : {},
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-9 h-9 rounded-lg flex items-center justify-center font-display font-bold text-sm shrink-0",
                      style: {
                        background: "rgba(255,185,0,0.12)",
                        color: GOLD,
                        border: "1px solid rgba(255,185,0,0.25)"
                      },
                      children: g.grade
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-foreground", children: [
                        "Grade ",
                        g.grade
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs", style: { color: GOLD }, children: [
                        g.avgMastery,
                        "%"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-full rounded-full transition-smooth",
                        style: {
                          width: `${g.avgMastery}%`,
                          background: `linear-gradient(90deg, ${GOLD}, rgba(255,185,0,0.5))`
                        }
                      }
                    ) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex items-center gap-[13px] shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-sm font-bold text-foreground", children: g.students }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] text-muted-foreground uppercase tracking-wide", children: "Students" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "font-mono text-sm font-bold",
                          style: { color: "oklch(0.72 0.20 145)" },
                          children: g.nominations
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] text-muted-foreground uppercase tracking-wide", children: "Noms" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "font-mono text-sm font-bold",
                          style: { color: "oklch(0.65 0.22 25)" },
                          children: g.struggles
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] text-muted-foreground uppercase tracking-wide", children: "Alerts" })
                    ] })
                  ] })
                ]
              },
              g.grade
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.section,
        {
          initial: { opacity: 0, x: 13 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.3, delay: 0.1 },
          "data-ocid": "principal_reports.curriculum_section",
          className: "space-y-[13px]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "glass-knowledge-surface rounded-xl px-5 py-3 flex items-center gap-3",
                style: { borderLeft: `3px solid ${TEAL}` },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4 shrink-0", style: { color: TEAL } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-base text-foreground leading-none", children: "Curriculum Coverage" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Subject × grade band · STMP registry status" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "glass-knowledge-surface rounded-xl p-5 overflow-x-auto",
                "data-ocid": "principal_reports.coverage_matrix",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[320px]", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left pb-3 pr-3 text-[9px] uppercase tracking-widest text-muted-foreground/60 font-semibold", children: "Subject" }),
                      GRADE_BANDS.map((band) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "th",
                        {
                          className: "pb-3 text-center text-[9px] uppercase tracking-widest text-muted-foreground/60 font-semibold",
                          children: band
                        },
                        band
                      ))
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: SUBJECTS.map((subj, si) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.tr,
                      {
                        "data-ocid": `principal_reports.coverage_row.${si + 1}`,
                        initial: { opacity: 0, y: 5 },
                        animate: { opacity: 1, y: 0 },
                        transition: { delay: 0.1 + si * 0.06 },
                        className: "border-t border-white/5",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 pr-3 text-xs font-semibold text-foreground whitespace-nowrap", children: subj }),
                          COVERAGE_MATRIX[subj].map((level, ci) => {
                            const dot = COVERAGE_DOT[level];
                            return /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "td",
                              {
                                className: "py-3 text-center",
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "div",
                                  {
                                    className: "w-4 h-4 rounded-full mx-auto",
                                    style: {
                                      background: dot.bg,
                                      boxShadow: `0 0 8px ${dot.bg}60`
                                    },
                                    title: dot.label
                                  }
                                ) })
                              },
                              `${subj}-${GRADE_BANDS[ci]}`
                            );
                          })
                        ]
                      },
                      subj
                    )) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-[13px] mt-5 pt-3 border-t border-white/5", children: Object.entries(COVERAGE_DOT).map(([key, val]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-2.5 h-2.5 rounded-full",
                        style: { background: val.bg }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground capitalize", children: val.label })
                  ] }, key)) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-[8px]", children: [
              {
                label: "Fully Covered",
                value: "62%",
                color: "oklch(0.72 0.20 145)"
              },
              { label: "Partial", value: "27%", color: GOLD },
              { label: "Sparse", value: "11%", color: "oklch(0.65 0.22 25)" }
            ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "glass-knowledge-surface rounded-xl p-[13px] text-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "font-mono font-bold text-lg",
                      style: { color: stat.color },
                      children: stat.value
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground mt-0.5", children: stat.label })
                ]
              },
              stat.label
            )) })
          ]
        }
      )
    ] })
  ] });
}
export {
  PrincipalGradeReports as default
};
