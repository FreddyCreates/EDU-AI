import { j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { L as Link } from "./router-D6GUppNf.js";
import { A as ArrowLeft } from "./arrow-left-DLov4c1N.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { i as createLucideIcon } from "./index-BivnQ6bB.js";
import { T as TrendingUp } from "./trending-up-CpgQ7qb4.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./query-8urnerR0.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "jecpp" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
];
const Briefcase = createLucideIcon("briefcase", __iconNode);
const clusters = [
  {
    id: "stem",
    name: "STEM",
    color: "oklch(0.7_0.18_270)",
    careers: ["Software Engineer", "Data Scientist", "Biomedical Researcher"],
    avgSalary: 95e3,
    growth: 15
  },
  {
    id: "health",
    name: "Health Sciences",
    color: "oklch(0.7_0.18_150)",
    careers: ["Nurse Practitioner", "Physical Therapist", "Pharmacist"],
    avgSalary: 85e3,
    growth: 13
  },
  {
    id: "arts",
    name: "Arts & Communication",
    color: "oklch(0.7_0.18_320)",
    careers: ["Graphic Designer", "Journalist", "UX Designer"],
    avgSalary: 62e3,
    growth: 8
  },
  {
    id: "business",
    name: "Business & Finance",
    color: "oklch(0.85_0.15_85)",
    careers: ["Financial Analyst", "Marketing Manager", "Entrepreneur"],
    avgSalary: 78e3,
    growth: 10
  },
  {
    id: "trade",
    name: "Skilled Trades",
    color: "oklch(0.65_0.22_30)",
    careers: ["Electrician", "Plumber", "HVAC Tech"],
    avgSalary: 72e3,
    growth: 12
  }
];
const interestResults = [
  { cluster: "STEM", score: 87 },
  { cluster: "Business & Finance", score: 74 },
  { cluster: "Health Sciences", score: 68 }
];
function CounselorCareer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "counselor.career.page",
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-[oklch(0.95_0.02_265)]", children: "Career Pathway Explorer" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-4", children: "Caseload Interest Survey Results" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5 space-y-4", children: interestResults.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[oklch(0.8_0.05_265)]", children: r.cluster }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[oklch(0.85_0.15_85)] font-semibold", children: [
                r.score,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-white/10 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { width: 0 },
                animate: { width: `${r.score}%` },
                transition: { delay: i * 0.12, duration: 0.8 },
                className: "h-full bg-gradient-to-r from-[oklch(0.85_0.15_85)] to-[oklch(0.7_0.18_60)] rounded-full"
              }
            ) })
          ] }, r.cluster)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-4", children: "Career Clusters" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: clusters.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              "data-ocid": `counselor.cluster.${i + 1}`,
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.2 + i * 0.08 },
              className: "bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-8 h-8 rounded-lg flex items-center justify-center",
                        style: { background: `${c.color}25` },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-4 h-4", style: { color: c.color } })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.9_0.05_265)] font-semibold text-sm", children: c.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[oklch(0.5_0.06_265)] text-xs", children: [
                        "Avg $",
                        (c.avgSalary / 1e3).toFixed(0),
                        "k/yr"
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-[oklch(0.7_0.18_150)]/20 text-[oklch(0.7_0.18_150)] border-[oklch(0.7_0.18_150)]/30 text-xs", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-2.5 h-2.5 mr-1" }),
                    "+",
                    c.growth,
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: c.careers.map((career) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs px-2 py-1 bg-white/10 rounded-full text-[oklch(0.65_0.06_265)]",
                    children: career
                  },
                  career
                )) })
              ]
            },
            c.id
          )) })
        ] })
      ]
    }
  );
}
export {
  CounselorCareer as default
};
