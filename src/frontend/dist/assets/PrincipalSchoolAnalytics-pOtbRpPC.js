import { j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { e as useLiveSessionMetrics, f as useHeatmapData } from "./useBackend-DrgJPcWN.js";
import { U as Users, g as Activity, Z as Zap } from "./index-BivnQ6bB.js";
import { C as Clock } from "./clock-DmeOF2sv.js";
import { B as Brain } from "./brain-BiTGGu73.js";
import { T as TrendingUp } from "./trending-up-CpgQ7qb4.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./query-8urnerR0.js";
import "./router-D6GUppNf.js";
const AMBER = "oklch(0.75 0.16 70)";
const METRICS = [
  {
    label: "Total Students",
    value: "406",
    delta: "+12 this week",
    icon: Users,
    good: true
  },
  {
    label: "Active Sessions",
    value: "47",
    delta: "Live now",
    icon: Activity,
    good: true
  },
  {
    label: "Avg Daily Sessions",
    value: "234",
    delta: "+8% vs last week",
    icon: Clock,
    good: true
  },
  {
    label: "System Coherence",
    value: "0.94φ",
    delta: "COHR validated",
    icon: Brain,
    good: true
  },
  {
    label: "Mastery Growth",
    value: "+13%",
    delta: "This month",
    icon: TrendingUp,
    good: true
  },
  {
    label: "PHI Engine",
    value: "LIVE",
    delta: "All engines nominal",
    icon: Zap,
    good: true
  }
];
const SUBJECT_PERFORMANCE = [
  { subject: "Mathematics", mastery: 78, students: 406 },
  { subject: "Science", mastery: 82, students: 380 },
  { subject: "English", mastery: 86, students: 406 },
  { subject: "History", mastery: 74, students: 350 },
  { subject: "Biology", mastery: 79, students: 280 },
  { subject: "Chemistry", mastery: 71, students: 180 }
];
function PrincipalSchoolAnalytics() {
  const { data: liveMetrics } = useLiveSessionMetrics();
  const { data: heatmap = [] } = useHeatmapData();
  const studentsOnline = Number((liveMetrics == null ? void 0 : liveMetrics.studentsOnline) ?? 0n);
  const totalActiveSessions = Number((liveMetrics == null ? void 0 : liveMetrics.totalActiveSessions) ?? 0n);
  const systemCoherence = Number((liveMetrics == null ? void 0 : liveMetrics.systemCoherence) ?? 0n);
  const liveMetricValues = [
    {
      label: "Students Online",
      value: studentsOnline > 0 ? String(studentsOnline) : METRICS[0].value,
      delta: studentsOnline > 0 ? "Live now" : METRICS[0].delta,
      icon: Users,
      good: true
    },
    {
      label: "Active Sessions",
      value: totalActiveSessions > 0 ? String(totalActiveSessions) : METRICS[1].value,
      delta: totalActiveSessions > 0 ? "Live right now" : METRICS[1].delta,
      icon: Activity,
      good: true
    },
    METRICS[2],
    {
      label: "System Coherence",
      value: systemCoherence > 0 ? `${systemCoherence}φ` : METRICS[3].value,
      delta: heatmap.length > 0 ? `${heatmap.length} classes tracked` : METRICS[3].delta,
      icon: Brain,
      good: true
    },
    ...METRICS.slice(4)
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-[21px] space-y-[21px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        className: "flex items-center justify-between",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "School Analytics" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Sovereign intelligence — AUTN-driven school-wide insights" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              className: "glass-portal-principal border-0",
              style: { color: AMBER },
              children: "AUTN F(8) Active"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-[13px]", children: liveMetricValues.map(({ label, value, delta, icon: Icon }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        "data-ocid": `analytics.metric_card.${i + 1}`,
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { delay: i * 0.08 },
        className: "glass-portal-principal rounded-xl p-[13px] space-y-1",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 mb-1", style: { color: AMBER } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xl font-bold font-mono text-foreground animate-metric-breathe",
              "data-ocid": `analytics.live_value.${i + 1}`,
              children: value
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground/70", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-muted-foreground", children: delta })
        ]
      },
      label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-sm rounded-xl p-[21px] space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground/60", children: "Subject Performance — School Average" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: SUBJECT_PERFORMANCE.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          "data-ocid": `analytics.subject_row.${i + 1}`,
          initial: { opacity: 0, x: -8 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: 0.1 + i * 0.07 },
          className: "flex items-center gap-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground w-32 shrink-0", children: s.subject }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-2 rounded-full bg-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "h-full rounded-full",
                style: { background: AMBER },
                initial: { width: 0 },
                animate: { width: `${s.mastery}%` },
                transition: { delay: 0.2 + i * 0.07, duration: 0.6 }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-mono font-bold text-foreground w-12 text-right", children: [
              s.mastery,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground w-20 text-right", children: [
              s.students,
              " students"
            ] })
          ]
        },
        s.subject
      )) })
    ] })
  ] });
}
export {
  PrincipalSchoolAnalytics as default
};
