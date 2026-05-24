import { j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { L as Link } from "./router-D6GUppNf.js";
import { A as ArrowLeft } from "./arrow-left-DLov4c1N.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { n as Building2 } from "./index-BivnQ6bB.js";
import { T as TrendingUp } from "./trending-up-CpgQ7qb4.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./query-8urnerR0.js";
const schools = [
  {
    id: "s1",
    name: "Lincoln High School",
    type: "High School",
    mastery: 78,
    enrollment: 1842,
    grades: "9-12",
    rcgn: 34,
    trend: "up"
  },
  {
    id: "s2",
    name: "Roosevelt Middle School",
    type: "Middle School",
    mastery: 82,
    enrollment: 1120,
    grades: "6-8",
    rcgn: 18,
    trend: "up"
  },
  {
    id: "s3",
    name: "Ferris Elementary",
    type: "Elementary",
    mastery: 71,
    enrollment: 643,
    grades: "K-5",
    rcgn: 12,
    trend: "stable"
  },
  {
    id: "s4",
    name: "Washington STEM Academy",
    type: "Magnet",
    mastery: 91,
    enrollment: 890,
    grades: "6-12",
    rcgn: 47,
    trend: "up"
  }
];
function DistrictSchools() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "district.schools.page",
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-[oklch(0.95_0.02_265)]", children: "Schools" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.5_0.06_265)] text-sm", children: "District-wide school overview" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: schools.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            "data-ocid": `district.school.${i + 1}`,
            initial: { opacity: 0, y: 14 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: i * 0.1 },
            className: "bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-xl bg-[oklch(0.85_0.15_85)]/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-5 h-5 text-[oklch(0.85_0.15_85)]" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[oklch(0.9_0.05_265)] font-semibold", children: s.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[oklch(0.5_0.06_265)] text-xs", children: [
                      s.type,
                      " · Grades ",
                      s.grades
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    className: `text-xs ${s.trend === "up" ? "bg-[oklch(0.7_0.18_150)]/20 text-[oklch(0.7_0.18_150)] border-[oklch(0.7_0.18_150)]/30" : "bg-white/10 text-[oklch(0.6_0.06_265)] border-white/20"}`,
                    children: [
                      s.trend === "up" ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-2.5 h-2.5 mr-1" }) : null,
                      s.trend
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-[oklch(0.85_0.15_85)]", children: [
                    s.mastery,
                    "%"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.5_0.06_265)] text-xs", children: "Mastery Avg" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-[oklch(0.7_0.18_270)]", children: s.enrollment.toLocaleString() }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.5_0.06_265)] text-xs", children: "Enrolled" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-[oklch(0.7_0.18_150)]", children: s.rcgn }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.5_0.06_265)] text-xs", children: "RCGN Flags" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-white/10 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { width: 0 },
                  animate: { width: `${s.mastery}%` },
                  transition: { delay: 0.4 + i * 0.1, duration: 0.8 },
                  className: "h-full bg-gradient-to-r from-[oklch(0.85_0.15_85)] to-[oklch(0.7_0.18_60)] rounded-full"
                }
              ) })
            ]
          },
          s.id
        )) })
      ]
    }
  );
}
export {
  DistrictSchools as default
};
