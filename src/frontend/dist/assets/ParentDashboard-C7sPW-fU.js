import { j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { L as Link } from "./router-D6GUppNf.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { b as Star, M as MessageSquare, B as BookOpen } from "./index-BivnQ6bB.js";
import { T as TrendingUp } from "./trending-up-CpgQ7qb4.js";
import { C as Calendar } from "./calendar-CWsAbHSP.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./query-8urnerR0.js";
const children = [
  {
    id: "1",
    name: "Marcus Medina",
    grade: 9,
    mastery: 78,
    subject: "Algebra II",
    streak: 13
  },
  {
    id: "2",
    name: "Lucia Medina",
    grade: 6,
    mastery: 89,
    subject: "Pre-Algebra",
    streak: 21
  }
];
const quickLinks = [
  {
    label: "Progress",
    icon: TrendingUp,
    href: "/parent/progress",
    color: "from-[oklch(0.65_0.18_85)] to-[oklch(0.55_0.18_60)]"
  },
  {
    label: "Attendance",
    icon: Calendar,
    href: "/parent/attendance",
    color: "from-[oklch(0.55_0.2_270)] to-[oklch(0.45_0.2_250)]"
  },
  {
    label: "Messages",
    icon: MessageSquare,
    href: "/parent/messages",
    color: "from-[oklch(0.55_0.2_150)] to-[oklch(0.45_0.2_130)]"
  },
  {
    label: "Reports",
    icon: BookOpen,
    href: "/parent/reports",
    color: "from-[oklch(0.55_0.2_320)] to-[oklch(0.45_0.2_300)]"
  }
];
function ParentDashboard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "parent.dashboard.page",
      className: "min-h-screen bg-[oklch(0.08_0.02_265)] px-4 py-6 pb-24",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -12 },
            animate: { opacity: 1, y: 0 },
            className: "mb-8",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.6_0.08_265)] text-sm mb-1", children: "Good morning," }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-[oklch(0.95_0.02_265)]", children: "Parent Dashboard" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.55_0.08_265)] text-sm mt-1", children: "Powered by EduAI · ALPH Registry" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-3", children: "Your Children" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: children.map((child, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              "data-ocid": `parent.child_card.${i + 1}`,
              initial: { opacity: 0, x: -16 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: i * 0.1 },
              className: "bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[oklch(0.95_0.02_265)] font-semibold text-lg", children: child.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[oklch(0.6_0.08_265)] text-sm", children: [
                      "Grade ",
                      child.grade,
                      " · ",
                      child.subject
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-[oklch(0.85_0.15_85)]/20 text-[oklch(0.85_0.15_85)] border-[oklch(0.85_0.15_85)]/30", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 mr-1" }),
                    " ",
                    child.streak,
                    "d streak"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[oklch(0.6_0.08_265)]", children: "Mastery Score" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[oklch(0.85_0.15_85)] font-semibold", children: [
                      child.mastery,
                      "%"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-white/10 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { width: 0 },
                      animate: { width: `${child.mastery}%` },
                      transition: { delay: 0.3 + i * 0.1, duration: 0.8 },
                      className: "h-full bg-gradient-to-r from-[oklch(0.85_0.15_85)] to-[oklch(0.75_0.18_60)] rounded-full"
                    }
                  ) })
                ] })
              ]
            },
            child.id
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-3", children: "Quick Access" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: quickLinks.map((link, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: 1, scale: 1 },
              transition: { delay: 0.3 + i * 0.08 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: link.href,
                  "data-ocid": `parent.quick_link.${i + 1}`,
                  className: "flex flex-col items-center gap-3 p-5 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl hover:bg-white/10 transition-all duration-200 group",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `w-12 h-12 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(link.icon, { className: "w-6 h-6 text-white" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[oklch(0.85_0.05_265)] text-sm font-medium", children: link.label })
                  ]
                }
              )
            },
            link.label
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-emerald-400 font-mono text-xs tracking-widest uppercase mb-3", children: "◈ School Connection" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass border border-emerald-500/30 rounded-xl p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/70 text-sm", children: "Student Information System" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30", children: "Live" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-xs", children: "Grade data, enrollment status, and attendance records sync automatically. Contact your school administrator to update records." })
          ] })
        ] })
      ]
    }
  );
}
export {
  ParentDashboard as default
};
