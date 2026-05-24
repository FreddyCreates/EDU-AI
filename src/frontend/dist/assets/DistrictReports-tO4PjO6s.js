import { j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { B as Button } from "./button-CWs7EcLL.js";
import { L as Link } from "./router-D6GUppNf.js";
import { A as ArrowLeft } from "./arrow-left-DLov4c1N.js";
import { U as Users } from "./index-BivnQ6bB.js";
import { C as Clock } from "./clock-DmeOF2sv.js";
import { F as FileText } from "./file-text-BbUEM46N.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { D as Download } from "./download-dijSjmqv.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./query-8urnerR0.js";
const reports = [
  {
    title: "District Mastery Summary — Spring 2026",
    type: "Academic",
    date: "May 15, 2026",
    status: "ready"
  },
  {
    title: "Enrollment Trends Report 2025–2026",
    type: "Compliance",
    date: "May 1, 2026",
    status: "ready"
  },
  {
    title: "Professional Development Hours Summary",
    type: "PD",
    date: "Apr 28, 2026",
    status: "ready"
  },
  {
    title: "ELL Progress Annual Report",
    type: "Compliance",
    date: "Apr 15, 2026",
    status: "pending"
  },
  {
    title: "Special Education Compliance Overview",
    type: "Compliance",
    date: "Mar 30, 2026",
    status: "ready"
  }
];
const summaryStats = [
  { label: "Total Enrollment", value: "4,495", icon: Users },
  { label: "PD Hours Logged", value: "2,847", icon: Clock },
  { label: "Reports Generated", value: "23", icon: FileText }
];
function DistrictReports() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "district.reports.page",
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-[oklch(0.95_0.02_265)]", children: "District Reports" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.5_0.06_265)] text-sm", children: "Compliance, academic, and PD summaries" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4 mb-8", children: summaryStats.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            transition: { delay: i * 0.07 },
            className: "bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-[oklch(0.85_0.15_85)]/15 flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "w-5 h-5 text-[oklch(0.85_0.15_85)]" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-[oklch(0.85_0.15_85)]", children: s.value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.5_0.06_265)] text-xs mt-1", children: s.label })
            ]
          },
          s.label
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.2 },
            className: "bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-5", children: "Available Reports" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: reports.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  "data-ocid": `district.report.${i + 1}`,
                  initial: { opacity: 0, y: 8 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.3 + i * 0.07 },
                  className: "flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-[oklch(0.85_0.15_85)]/15 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-[oklch(0.85_0.15_85)]" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.85_0.05_265)] text-sm font-medium truncate", children: r.title }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-0.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[oklch(0.5_0.06_265)] text-xs", children: r.date }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs bg-white/10 text-[oklch(0.6_0.06_265)] border-white/20", children: r.type })
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        "data-ocid": `district.report_download.${i + 1}`,
                        size: "sm",
                        variant: "outline",
                        disabled: r.status === "pending",
                        className: "shrink-0 ml-4 border-white/20 text-[oklch(0.7_0.08_265)] hover:bg-white/10 disabled:opacity-40",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" })
                      }
                    )
                  ]
                },
                r.title
              )) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.section,
          {
            "data-ocid": "district.research_impact_section",
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.5 },
            className: "mt-8",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-4", children: "Research & Impact" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs font-semibold px-2 py-0.5 rounded-full",
                      style: {
                        background: "rgba(255,185,0,0.12)",
                        color: "oklch(0.85 0.18 85)",
                        border: "1px solid rgba(255,185,0,0.25)"
                      },
                      children: "CASE STUDY"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-[oklch(0.9_0.04_265)] mb-1", children: "The Diego Protocol" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[oklch(0.5_0.06_265)] mb-3", children: "Sovereign intelligence-driven preparation for non-traditional academic competition. Fibonacci backward milestones + elastic schedule adaptation." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      "data-ocid": "district.diego_protocol_link",
                      to: "/vision",
                      className: "text-xs font-semibold",
                      style: { color: "oklch(0.85 0.18 85)" },
                      children: "Read Full Paper →"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs font-semibold px-2 py-0.5 rounded-full",
                      style: {
                        background: "rgba(100,200,255,0.10)",
                        color: "oklch(0.78 0.14 210)",
                        border: "1px solid rgba(100,200,255,0.20)"
                      },
                      children: "SOVEREIGN VISION"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-[oklch(0.9_0.04_265)] mb-1", children: "EduAI Vision Document" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[oklch(0.5_0.06_265)] mb-3", children: "System-generated funding case, technical sovereignty overview, and impact analysis — built by COGT+META+AUTN engines." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      "data-ocid": "district.vision_document_link",
                      to: "/vision",
                      className: "text-xs font-semibold",
                      style: { color: "oklch(0.78 0.14 210)" },
                      children: "View Vision Document →"
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      ]
    }
  );
}
export {
  DistrictReports as default
};
