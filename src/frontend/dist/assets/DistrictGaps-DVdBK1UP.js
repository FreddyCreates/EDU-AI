import { j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { L as Link } from "./router-D6GUppNf.js";
import { A as ArrowLeft } from "./arrow-left-DLov4c1N.js";
import { T as TriangleAlert } from "./triangle-alert-DEqO8oET.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import "./index-BivnQ6bB.js";
import "./query-8urnerR0.js";
const gaps = [
  {
    subject: "Mathematics",
    grade: "Grade 8",
    subgroup: "ELL",
    gapScore: 21,
    fibonacci: true
  },
  {
    subject: "Reading/ELA",
    grade: "Grade 5",
    subgroup: "Special Ed",
    gapScore: 13,
    fibonacci: true
  },
  {
    subject: "Science",
    grade: "Grade 11",
    subgroup: "Low Income",
    gapScore: 13,
    fibonacci: true
  },
  {
    subject: "Mathematics",
    grade: "Grade 3",
    subgroup: "ELL",
    gapScore: 8,
    fibonacci: true
  },
  {
    subject: "Social Studies",
    grade: "Grade 7",
    subgroup: "African American",
    gapScore: 8,
    fibonacci: true
  },
  {
    subject: "Writing",
    grade: "Grade 10",
    subgroup: "Special Ed",
    gapScore: 5,
    fibonacci: true
  }
];
const severityColor = (score) => {
  if (score >= 21)
    return {
      bg: "bg-[oklch(0.65_0.22_30)]/15",
      border: "border-[oklch(0.65_0.22_30)]/30",
      text: "text-[oklch(0.75_0.2_60)]"
    };
  if (score >= 13)
    return {
      bg: "bg-[oklch(0.75_0.18_60)]/15",
      border: "border-[oklch(0.75_0.18_60)]/30",
      text: "text-[oklch(0.85_0.15_85)]"
    };
  return {
    bg: "bg-white/5",
    border: "border-white/10",
    text: "text-[oklch(0.65_0.06_265)]"
  };
};
function DistrictGaps() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "district.gaps.page",
      className: "min-h-screen bg-[oklch(0.08_0.02_265)] p-6 md:p-10",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/district",
              className: "text-[oklch(0.6_0.08_265)] hover:text-[oklch(0.85_0.15_85)] transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-[oklch(0.95_0.02_265)]", children: "Achievement Gap Analysis" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.5_0.06_265)] text-sm", children: "Gap scores floored to Fibonacci integers · LEX_FIBONACCI_FLOOR" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 mb-8 flex-wrap", children: [
          { label: "Critical (F₉≥​21)", color: "text-[oklch(0.75_0.2_60)]" },
          { label: "Elevated (F₇≥​13)", color: "text-[oklch(0.85_0.15_85)]" },
          { label: "Moderate (F₅≥​5)", color: "text-[oklch(0.65_0.06_265)]" }
        ].map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: `w-3.5 h-3.5 ${l.color}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs ${l.color}`, children: l.label })
        ] }, l.label)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            className: "bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 mb-8",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-5", children: "Gap Score Table" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-[oklch(0.5_0.06_265)] text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left pb-3 pr-8", children: "Subject" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left pb-3 pr-8", children: "Grade" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left pb-3 pr-8", children: "Subgroup" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right pb-3", children: "Gap Score (Fib Floor)" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: gaps.map((g, i) => {
                  const c = severityColor(g.gapScore);
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.tr,
                    {
                      "data-ocid": `district.gap.${i + 1}`,
                      initial: { opacity: 0, x: -8 },
                      animate: { opacity: 1, x: 0 },
                      transition: { delay: i * 0.07 },
                      className: "border-t border-white/5",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 pr-8 text-[oklch(0.8_0.05_265)]", children: g.subject }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 pr-8 text-[oklch(0.6_0.06_265)]", children: g.grade }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 pr-8 text-[oklch(0.6_0.06_265)]", children: g.subgroup }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            className: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${c.bg} border ${c.border} ${c.text} font-mono font-bold text-sm`,
                            children: [
                              "F(",
                              g.gapScore === 21 ? 8 : g.gapScore === 13 ? 7 : g.gapScore === 8 ? 6 : 5,
                              ") = ",
                              g.gapScore,
                              "pt"
                            ]
                          }
                        ) })
                      ]
                    },
                    `${g.subject}-${g.subgroup}`
                  );
                }) })
              ] }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.3 },
            className: "bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-5", children: "Gap Visualization" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: gaps.map((g, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[oklch(0.6_0.06_265)] text-xs w-32 shrink-0", children: [
                  g.subject,
                  " / ",
                  g.subgroup.split(" ")[0]
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-3 bg-white/10 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { width: 0 },
                    animate: { width: `${g.gapScore / 25 * 100}%` },
                    transition: { delay: 0.4 + i * 0.07, duration: 0.7 },
                    className: "h-full rounded-full",
                    style: {
                      background: severityColor(g.gapScore).text.replace("text-", "").replace("[", "").replace("]", "")
                    }
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `font-bold text-sm w-8 text-right ${severityColor(g.gapScore).text}`,
                    children: g.gapScore
                  }
                )
              ] }, `gap-${g.subject}`)) })
            ]
          }
        )
      ]
    }
  );
}
export {
  DistrictGaps as default
};
