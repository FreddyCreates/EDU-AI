import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { L as Link } from "./router-D6GUppNf.js";
import { A as ArrowLeft } from "./arrow-left-DLov4c1N.js";
import { s as Compass } from "./index-BivnQ6bB.js";
import { m as motion, A as AnimatePresence } from "./motion-BK2wxCtX.js";
import { C as Clock } from "./clock-DmeOF2sv.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./query-8urnerR0.js";
const clusters = [
  {
    id: "stem",
    name: "STEM",
    emoji: "🔬",
    description: "Science, Technology, Engineering & Math",
    careers: ["Software Engineer", "Data Scientist", "Aerospace Engineer"],
    color: "oklch(0.7_0.18_270)",
    growthRate: 15
  },
  {
    id: "health",
    name: "Health Sciences",
    emoji: "🩺",
    description: "Medicine, nursing, therapy, and wellness",
    careers: ["Physician Assistant", "Physical Therapist", "Pharmacist"],
    color: "oklch(0.7_0.18_150)",
    growthRate: 13
  },
  {
    id: "business",
    name: "Business",
    emoji: "📊",
    description: "Finance, marketing, entrepreneurship",
    careers: ["Financial Analyst", "Marketing Director", "Startup Founder"],
    color: "oklch(0.85_0.15_85)",
    growthRate: 10
  },
  {
    id: "arts",
    name: "Arts & Media",
    emoji: "🎨",
    description: "Design, communication, and creative fields",
    careers: ["UX Designer", "Filmmaker", "Art Director"],
    color: "oklch(0.7_0.18_320)",
    growthRate: 8
  },
  {
    id: "trades",
    name: "Skilled Trades",
    emoji: "🔧",
    description: "Electrical, plumbing, HVAC, construction",
    careers: ["Master Electrician", "HVAC Tech", "Construction PM"],
    color: "oklch(0.65_0.22_30)",
    growthRate: 12
  }
];
const history = [
  {
    cluster: "STEM",
    action: "Explored Software Engineering pathway",
    date: "May 18"
  },
  {
    cluster: "Business",
    action: "Completed Entrepreneurship interest quiz",
    date: "May 15"
  },
  {
    cluster: "STEM",
    action: "Viewed Data Science career profile",
    date: "May 12"
  }
];
function CareerExplorer() {
  const [selected, setSelected] = reactExports.useState(null);
  clusters.find((c) => c.id === selected);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "student.career.page",
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-[oklch(0.95_0.02_265)]", children: "Career Explorer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.5_0.06_265)] text-xs", children: "Sovereign pathway intelligence · TCHR-COGT" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "inline w-4 h-4 mr-2" }),
            "Career Clusters"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: clusters.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.button,
            {
              type: "button",
              "data-ocid": `student.career.cluster.${i + 1}`,
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: i * 0.07 },
              onClick: () => setSelected(selected === c.id ? null : c.id),
              className: `w-full text-left p-4 rounded-xl border transition-all ${selected === c.id ? "border-[oklch(0.85_0.15_85)]/40 bg-[oklch(0.85_0.15_85)]/8" : "border-white/10 bg-white/5 hover:bg-white/8"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: c.emoji }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.9_0.05_265)] font-semibold", children: c.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.5_0.06_265)] text-xs", children: c.description })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "text-xs bg-[oklch(0.7_0.18_150)]/15 text-[oklch(0.7_0.18_150)] border-[oklch(0.7_0.18_150)]/25", children: [
                    "+",
                    c.growthRate,
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: selected === c.id && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { height: 0, opacity: 0 },
                    animate: { height: "auto", opacity: 1 },
                    exit: { height: 0, opacity: 0 },
                    className: "overflow-hidden",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-white/10", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.55_0.06_265)] text-xs mb-2", children: "Career Pathways:" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-1.5", children: c.careers.map((career) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "w-1.5 h-1.5 rounded-full",
                            style: { background: c.color }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[oklch(0.8_0.05_265)] text-sm", children: career })
                      ] }, career)) })
                    ] })
                  }
                ) })
              ]
            },
            c.id
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "inline w-4 h-4 mr-2" }),
            "Exploration History"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: history.map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              "data-ocid": `student.career.history.${i + 1}`,
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.5 + i * 0.07 },
              className: "flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.8_0.05_265)] text-sm", children: h.action }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.45_0.05_265)] text-xs", children: h.date })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs bg-white/10 text-[oklch(0.6_0.06_265)] border-white/20", children: h.cluster })
              ]
            },
            h.cluster
          )) })
        ] })
      ]
    }
  );
}
export {
  CareerExplorer as default
};
