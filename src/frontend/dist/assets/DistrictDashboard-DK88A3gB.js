import { j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { L as Link } from "./router-D6GUppNf.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { n as Building2, U as Users, a as Award } from "./index-BivnQ6bB.js";
import { T as TrendingUp } from "./trending-up-CpgQ7qb4.js";
import "./query-8urnerR0.js";
const schools = [
  {
    id: "s1",
    name: "Lincoln High School",
    mastery: 78,
    enrollment: 1842,
    rcgn: 34
  },
  {
    id: "s2",
    name: "Roosevelt Middle School",
    mastery: 82,
    enrollment: 1120,
    rcgn: 18
  },
  {
    id: "s3",
    name: "Ferris Elementary",
    mastery: 71,
    enrollment: 643,
    rcgn: 12
  },
  {
    id: "s4",
    name: "Washington STEM Academy",
    mastery: 91,
    enrollment: 890,
    rcgn: 47
  }
];
const districtStats = [
  {
    label: "Total Schools",
    value: "4",
    icon: Building2,
    color: "oklch(0.85_0.15_85)"
  },
  {
    label: "Students",
    value: "4,495",
    icon: Users,
    color: "oklch(0.7_0.18_270)"
  },
  {
    label: "Avg Mastery",
    value: "80.5%",
    icon: TrendingUp,
    color: "oklch(0.7_0.18_150)"
  },
  {
    label: "RCGN Flags",
    value: "111",
    icon: Award,
    color: "oklch(0.65_0.22_30)"
  }
];
const navLinks = [
  { label: "Schools", href: "/district/schools", color: "oklch(0.85_0.15_85)" },
  {
    label: "Analytics",
    href: "/district/analytics",
    color: "oklch(0.7_0.18_270)"
  },
  {
    label: "Gap Analysis",
    href: "/district/gaps",
    color: "oklch(0.65_0.22_30)"
  },
  { label: "Reports", href: "/district/reports", color: "oklch(0.7_0.18_150)" }
];
function DistrictDashboard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "district.dashboard.page",
      className: "min-h-screen bg-[oklch(0.08_0.02_265)] p-6 md:p-10",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            className: "mb-8",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.6_0.08_265)] text-sm", children: "District Administration — EduAI" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-[oklch(0.95_0.02_265)] mt-1", children: "District Dashboard" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.5_0.06_265)] text-sm mt-1", children: "Sovereign Intelligence Layer · ALPH Registry" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-10", children: districtStats.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            transition: { delay: i * 0.07 },
            className: "bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-10 h-10 rounded-xl flex items-center justify-center",
                    style: { background: `${s.color}20` },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "w-5 h-5", style: { color: s.color } })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[oklch(0.55_0.06_265)] text-xs", children: s.label })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", style: { color: s.color }, children: s.value })
            ]
          },
          s.label
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.3 },
            className: "bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 mb-8",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-5", children: "Achievement Gap Overview" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-6", children: [
                { label: "ELL Students", gap: 14, trend: "improving" },
                { label: "Special Ed", gap: 19, trend: "stable" },
                { label: "Low Income", gap: 11, trend: "improving" }
              ].map((g, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.55_0.06_265)] text-xs mb-2", children: g.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.p,
                  {
                    initial: { opacity: 0, scale: 0 },
                    animate: { opacity: 1, scale: 1 },
                    transition: { delay: 0.5 + i * 0.1 },
                    className: "text-3xl font-bold text-[oklch(0.65_0.22_30)]",
                    children: [
                      g.gap,
                      "pt"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: `text-xs mt-1 ${g.trend === "improving" ? "text-[oklch(0.7_0.18_150)]" : "text-[oklch(0.6_0.06_265)]"}`,
                    children: g.trend
                  }
                )
              ] }, g.label)) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-8", children: schools.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            "data-ocid": `district.school_card.${i + 1}`,
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.4 + i * 0.08 },
            className: "bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[oklch(0.9_0.05_265)] font-semibold text-sm", children: s.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[oklch(0.85_0.15_85)] font-bold", children: [
                  s.mastery,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 text-xs text-[oklch(0.5_0.06_265)]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  s.enrollment.toLocaleString(),
                  " enrolled"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[oklch(0.7_0.18_150)]", children: [
                  s.rcgn,
                  " RCGN flags"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-white/10 rounded-full mt-3 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { width: 0 },
                  animate: { width: `${s.mastery}%` },
                  transition: { delay: 0.6 + i * 0.08, duration: 0.7 },
                  className: "h-full bg-gradient-to-r from-[oklch(0.85_0.15_85)] to-[oklch(0.7_0.18_60)] rounded-full"
                }
              ) })
            ]
          },
          s.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-cyan-400 font-mono text-xs tracking-widest uppercase mb-3", children: "◈ District SIS Overview" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass border border-cyan-500/30 rounded-xl p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-xs font-mono uppercase tracking-widest mb-1", children: "Enrollment" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-white", children: "Live Sync" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-xs mt-1", children: "Student records updated on Fibonacci schedule" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass border border-cyan-500/30 rounded-xl p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-xs font-mono uppercase tracking-widest mb-1", children: "Sync Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-emerald-400 animate-pulse" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-300 text-sm", children: "Healthy" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-xs mt-2", children: "Next sync: F(8)=21 minutes" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass border border-cyan-500/30 rounded-xl p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-xs font-mono uppercase tracking-widest mb-1", children: "Rosters" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-sm", children: "All class rosters available via the School Data tab" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: navLinks.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: l.href,
            "data-ocid": `district.nav.${l.label.toLowerCase().replace(" ", "_")}`,
            className: "flex items-center justify-center p-4 bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl hover:bg-white/10 transition-all text-sm font-medium",
            style: { color: l.color },
            children: l.label
          },
          l.label
        )) })
      ]
    }
  );
}
export {
  DistrictDashboard as default
};
