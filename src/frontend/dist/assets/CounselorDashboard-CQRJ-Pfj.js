import { j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { L as Link } from "./router-D6GUppNf.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { U as Users, B as BookOpen } from "./index-BivnQ6bB.js";
import { F as Flag } from "./flag-DKmv1Yx7.js";
import { T as TrendingUp } from "./trending-up-CpgQ7qb4.js";
import { C as Calendar } from "./calendar-CWsAbHSP.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./query-8urnerR0.js";
const caseloadStats = [
  {
    label: "Total Students",
    value: 47,
    icon: Users,
    color: "oklch(0.85_0.15_85)"
  },
  { label: "IEP Active", value: 8, icon: Flag, color: "oklch(0.65_0.22_30)" },
  {
    label: "Career Plans",
    value: 31,
    icon: TrendingUp,
    color: "oklch(0.7_0.18_150)"
  },
  {
    label: "Next Review",
    value: 3,
    icon: Calendar,
    color: "oklch(0.7_0.18_270)"
  }
];
const urgentStudents = [
  { name: "Aiden Park", grade: 11, issue: "IEP Review Due", urgency: "high" },
  {
    name: "Sofia Garcia",
    grade: 10,
    issue: "College Deadline: Jun 1",
    urgency: "medium"
  },
  {
    name: "James Wilson",
    grade: 9,
    issue: "3 consecutive absences",
    urgency: "high"
  }
];
const navLinks = [
  { label: "Students", href: "/counselor/students", icon: Users },
  { label: "Plans", href: "/counselor/plans", icon: BookOpen },
  { label: "Career", href: "/counselor/career", icon: TrendingUp },
  { label: "College", href: "/counselor/college", icon: Flag }
];
function CounselorDashboard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "counselor.dashboard.page",
      className: "min-h-screen bg-[oklch(0.08_0.02_265)] px-4 py-6 pb-24",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -12 },
            animate: { opacity: 1, y: 0 },
            className: "mb-6",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.6_0.08_265)] text-sm", children: "Counselor Portal — EduAI" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-[oklch(0.95_0.02_265)] mt-1", children: "Counselor Dashboard" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 mb-8", children: caseloadStats.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.93 },
            animate: { opacity: 1, scale: 1 },
            transition: { delay: i * 0.07 },
            className: "bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-8 h-8 rounded-lg flex items-center justify-center",
                    style: { background: `${s.color}25` },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "w-4 h-4", style: { color: s.color } })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[oklch(0.55_0.06_265)] text-xs", children: s.label })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", style: { color: s.color }, children: s.value })
            ]
          },
          s.label
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-4", children: "Needs Attention" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: urgentStudents.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              "data-ocid": `counselor.urgent.${i + 1}`,
              initial: { opacity: 0, x: -12 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: 0.3 + i * 0.08 },
              className: "bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-4 flex items-center justify-between",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.85_0.05_265)] text-sm font-semibold", children: s.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[oklch(0.55_0.06_265)] text-xs", children: [
                    "Grade ",
                    s.grade,
                    " · ",
                    s.issue
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: `text-xs ${s.urgency === "high" ? "bg-[oklch(0.65_0.22_30)]/20 text-[oklch(0.75_0.2_60)] border-[oklch(0.65_0.22_30)]/30" : "bg-[oklch(0.75_0.18_60)]/20 text-[oklch(0.85_0.15_85)] border-[oklch(0.75_0.18_60)]/30"}`,
                    children: s.urgency === "high" ? "Urgent" : "Soon"
                  }
                )
              ]
            },
            s.name
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-3", children: "Navigate" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: navLinks.map((l, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.5 + i * 0.07 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: l.href,
                  "data-ocid": `counselor.nav.${l.label.toLowerCase()}`,
                  className: "flex items-center gap-3 p-4 bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl hover:bg-white/10 transition-all",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(l.icon, { className: "w-5 h-5 text-[oklch(0.85_0.15_85)]" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[oklch(0.8_0.05_265)] text-sm font-medium", children: l.label })
                  ]
                }
              )
            },
            l.label
          )) })
        ] })
      ]
    }
  );
}
export {
  CounselorDashboard as default
};
