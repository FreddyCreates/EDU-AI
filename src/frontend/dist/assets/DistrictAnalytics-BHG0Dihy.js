import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { B as Button } from "./button-CWs7EcLL.js";
import { L as Link } from "./router-D6GUppNf.js";
import { A as ArrowLeft } from "./arrow-left-DLov4c1N.js";
import { D as Download } from "./download-dijSjmqv.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./index-BivnQ6bB.js";
import "./query-8urnerR0.js";
const subgroups = [
  { name: "All Students", math: 80, reading: 78, science: 75 },
  { name: "ELL Students", math: 66, reading: 59, science: 62 },
  { name: "Special Education", math: 61, reading: 64, science: 58 },
  { name: "Low Income", math: 69, reading: 67, science: 65 },
  { name: "Hispanic", math: 74, reading: 71, science: 70 },
  { name: "African American", math: 72, reading: 73, science: 68 }
];
const sessions = ["Fall 2024", "Spring 2025", "Fall 2025", "Spring 2026"];
const trendData = {
  "Lincoln High": [72, 75, 76, 78],
  "Roosevelt Middle": [76, 79, 81, 82],
  "Ferris Elementary": [65, 67, 70, 71],
  "Washington STEM": [86, 88, 90, 91]
};
function DistrictAnalytics() {
  const [activeSubject, setActiveSubject] = reactExports.useState("math");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "district.analytics.page",
      className: "min-h-screen bg-[oklch(0.08_0.02_265)] p-6 md:p-10",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/district",
                className: "text-[oklch(0.6_0.08_265)] hover:text-[oklch(0.85_0.15_85)] transition-colors",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-[oklch(0.95_0.02_265)]", children: "Analytics" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.5_0.06_265)] text-sm", children: "Cross-school performance trends" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              "data-ocid": "district.analytics.export_button",
              size: "sm",
              variant: "outline",
              className: "border-white/20 text-[oklch(0.7_0.08_265)] hover:bg-white/10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4 mr-2" }),
                " Export"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            className: "bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 mb-8",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-5", children: "Mastery Trend — All Schools" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left text-[oklch(0.5_0.06_265)] text-xs pb-3 pr-6", children: "School" }),
                  sessions.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      className: "text-center text-[oklch(0.5_0.06_265)] text-xs pb-3 px-4",
                      children: s
                    },
                    s
                  ))
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: Object.entries(trendData).map(([school, vals], i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.tr,
                  {
                    initial: { opacity: 0, x: -8 },
                    animate: { opacity: 1, x: 0 },
                    transition: { delay: i * 0.08 },
                    className: "border-t border-white/5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-[oklch(0.75_0.05_265)] py-3 pr-6 whitespace-nowrap", children: school }),
                      vals.map((v, j) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "td",
                        {
                          className: "text-center py-3 px-4",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "span",
                            {
                              className: `font-semibold ${v >= 85 ? "text-[oklch(0.7_0.18_150)]" : v >= 75 ? "text-[oklch(0.85_0.15_85)]" : "text-[oklch(0.65_0.22_30)]"}`,
                              children: [
                                v,
                                "%"
                              ]
                            }
                          )
                        },
                        `col-${school}-${sessions[j]}`
                      ))
                    ]
                  },
                  school
                )) })
              ] }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.2 },
            className: "bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest", children: "Subgroup Performance" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 bg-white/5 rounded-lg p-1", children: ["math", "reading", "science"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": `district.analytics.subject.${s}`,
                    onClick: () => setActiveSubject(s),
                    className: `px-3 py-1.5 rounded-md text-xs font-medium transition-all ${activeSubject === s ? "bg-[oklch(0.85_0.15_85)]/20 text-[oklch(0.85_0.15_85)]" : "text-[oklch(0.5_0.06_265)] hover:text-[oklch(0.7_0.08_265)]"}`,
                    children: s.charAt(0).toUpperCase() + s.slice(1)
                  },
                  s
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: subgroups.map((g, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[oklch(0.75_0.05_265)]", children: g.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[oklch(0.85_0.15_85)] font-semibold", children: [
                    g[activeSubject],
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-white/10 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { width: 0 },
                    animate: { width: `${g[activeSubject]}%` },
                    transition: { delay: 0.3 + i * 0.07, duration: 0.7 },
                    className: "h-full rounded-full",
                    style: {
                      background: `oklch(${0.5 + g[activeSubject] / 200}_0.2_${activeSubject === "math" ? 85 : activeSubject === "reading" ? 270 : 150})`
                    }
                  }
                ) })
              ] }, g.name)) })
            ]
          }
        )
      ]
    }
  );
}
export {
  DistrictAnalytics as default
};
