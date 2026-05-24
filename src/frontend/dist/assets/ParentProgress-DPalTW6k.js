import { j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { L as Link } from "./router-D6GUppNf.js";
import { A as ArrowLeft } from "./arrow-left-DLov4c1N.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { T as TrendingUp } from "./trending-up-CpgQ7qb4.js";
import "./index-BivnQ6bB.js";
import "./query-8urnerR0.js";
const subjects = [
  { name: "Algebra II", mastery: 78, prev: 65, color: "oklch(0.85_0.15_85)" },
  { name: "U.S. History", mastery: 91, prev: 88, color: "oklch(0.7_0.18_150)" },
  { name: "English IV", mastery: 72, prev: 70, color: "oklch(0.7_0.18_270)" },
  { name: "Biology", mastery: 85, prev: 79, color: "oklch(0.7_0.18_320)" },
  { name: "Physics", mastery: 67, prev: 60, color: "oklch(0.7_0.18_30)" }
];
const recentActivity = [
  {
    date: "May 18",
    action: "Completed Algebra quiz — 8/10 correct",
    delta: "+3"
  },
  {
    date: "May 17",
    action: "Mastered Photosynthesis topic in Biology",
    delta: "+5"
  },
  {
    date: "May 16",
    action: "Study session: U.S. Reconstruction era",
    delta: "+2"
  },
  {
    date: "May 15",
    action: "Reviewed essay structure in English IV",
    delta: "+1"
  }
];
function ParentProgress() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "parent.progress.page",
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-[oklch(0.95_0.02_265)]", children: "Academic Progress" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-4", children: "Subject Mastery — Marcus Medina" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5 space-y-5", children: subjects.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -12 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: i * 0.08 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[oklch(0.85_0.05_265)] font-medium", children: s.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[oklch(0.55_0.08_265)] text-xs", children: [
                      "was ",
                      s.prev,
                      "%"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", style: { color: s.color }, children: [
                      s.mastery,
                      "%"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3 h-3 text-[oklch(0.7_0.18_150)]" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 bg-white/10 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { width: 0 },
                    animate: { width: `${s.mastery}%` },
                    transition: { delay: 0.3 + i * 0.08, duration: 0.7 },
                    className: "h-full rounded-full",
                    style: {
                      background: `linear-gradient(90deg, ${s.color}, ${s.color}88)`
                    }
                  }
                ) })
              ]
            },
            s.name
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-4", children: "Subject Mastery — EDDI Insights" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [
            {
              subject: "Math",
              mastery: 78,
              insight: "Geometry mastery is accelerating."
            },
            {
              subject: "Science",
              mastery: 65,
              insight: "Strong retention in cellular biology."
            },
            {
              subject: "English",
              mastery: 82,
              insight: "Literary analysis skills building."
            },
            {
              subject: "History",
              mastery: 71,
              insight: "Consistent engagement with source analysis."
            }
          ].map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              "data-ocid": `parent.subject_card.${i + 1}`,
              initial: { opacity: 0, y: 13 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.1 + i * 0.08 },
              className: "backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/90 font-semibold text-sm", children: s.subject }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[oklch(0.85_0.18_85)] font-mono text-sm", children: [
                    s.mastery,
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-white/10 rounded-full h-2 mb-3 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { width: 0 },
                    animate: { width: `${s.mastery}%` },
                    transition: {
                      delay: 0.2 + i * 0.08,
                      duration: 0.8,
                      ease: "easeOut"
                    },
                    className: "h-full rounded-full bg-gradient-to-r from-teal-400/80 to-teal-300/60"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-xs italic leading-snug", children: s.insight })
              ]
            },
            s.subject
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-4", children: "Recent Activity" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: recentActivity.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              "data-ocid": `parent.activity.${i + 1}`,
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: i * 0.07 },
              className: "bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-4 flex items-center justify-between",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.85_0.05_265)] text-sm", children: a.action }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.5_0.06_265)] text-xs mt-0.5", children: a.date })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[oklch(0.7_0.18_150)] text-sm font-semibold", children: a.delta })
              ]
            },
            a.action
          )) })
        ] })
      ]
    }
  );
}
export {
  ParentProgress as default
};
