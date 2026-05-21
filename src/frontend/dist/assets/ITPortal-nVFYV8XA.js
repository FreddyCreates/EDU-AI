import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { w as Server, k as Shield, g as Activity, C as Cpu, Z as Zap, S as Skeleton, D as Database, B as BookOpen } from "./index-BivnQ6bB.js";
import { L as Link } from "./router-D6GUppNf.js";
import { F as FileText } from "./file-text-BbUEM46N.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { G as Grid3x3 } from "./grid-3x3-D0uXXAyN.js";
import { L as Lock } from "./lock-Cp-0nqtC.js";
import { L as LockOpen } from "./lock-open-Cxga3NlH.js";
import { C as CircleCheck } from "./circle-check-Bol12715.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./query-8urnerR0.js";
const EMERALD = "oklch(0.72 0.17 155)";
const TEAL = "oklch(0.72 0.16 185)";
const GOLD = "oklch(0.76 0.18 84)";
const PURPLE = "oklch(0.68 0.18 280)";
const STMP_DATA = {
  totalTemplates: 89,
  maxTemplates: 144,
  lockedTemplates: 55,
  unlockedTemplates: 34,
  bySubject: [
    { subject: "Mathematics", grades: 13, locked: false },
    { subject: "Science", grades: 13, locked: false },
    { subject: "English Language Arts", grades: 13, locked: false },
    { subject: "History", grades: 13, locked: false },
    { subject: "Geography", grades: 8, locked: false },
    { subject: "Physics", grades: 4, locked: true },
    { subject: "Chemistry", grades: 4, locked: true },
    { subject: "Biology", grades: 6, locked: false },
    { subject: "Computer Science", grades: 5, locked: false },
    { subject: "Spanish", grades: 4, locked: true },
    { subject: "Art", grades: 7, locked: false },
    { subject: "PE/Health", grades: 13, locked: false }
  ]
};
const KNOWLEDGE_DATA = {
  totalSubjects: 12,
  totalTopics: 233,
  gradeGates: 13,
  digestedTextbooks: 8,
  pendingDigest: 3,
  coverage: [
    { grade: "K", pct: 94 },
    { grade: "1", pct: 91 },
    { grade: "2", pct: 88 },
    { grade: "3", pct: 85 },
    { grade: "4", pct: 82 },
    { grade: "5", pct: 79 },
    { grade: "6", pct: 73 },
    { grade: "7", pct: 68 },
    { grade: "8", pct: 62 },
    { grade: "9", pct: 71 },
    { grade: "10", pct: 65 },
    { grade: "11", pct: 58 },
    { grade: "12", pct: 44 }
  ]
};
const IT_LINKS = [
  { label: "Security Panel", to: "/it-security", icon: Shield, color: EMERALD },
  { label: "Network Status", to: "/it/network", icon: Activity, color: TEAL },
  { label: "Audit Log", to: "/it/audit", icon: FileText, color: GOLD },
  { label: "Engine Monitor", to: "/it/engines", icon: Cpu, color: PURPLE },
  { label: "APIX Gateway", to: "/it/apix", icon: Zap, color: EMERALD }
];
function StatCard({
  label,
  value,
  icon: Icon,
  color,
  sub,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.06 },
      className: "glass rounded-2xl p-5 space-y-3",
      style: { border: `1px solid ${color.replace(")", " / 0.20)")}` },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-9 h-9 rounded-xl flex items-center justify-center",
            style: {
              background: color.replace(")", " / 0.10)"),
              border: `1px solid ${color.replace(")", " / 0.25)")}`
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4", style: { color } })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-2xl text-foreground", children: value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: label }),
          sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono mt-1", style: { color }, children: sub })
        ] })
      ]
    }
  );
}
function ITPortal() {
  const [stmpLoading] = reactExports.useState(false);
  const [knowledgeLoading] = reactExports.useState(false);
  const stmpFillPct = Math.round(
    STMP_DATA.totalTemplates / STMP_DATA.maxTemplates * 100
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "portal-enter min-h-screen", "data-ocid": "it_portal.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "glass sticky top-0 z-30",
        style: {
          borderBottom: `1px solid ${EMERALD.replace(")", " / 0.18)")}`
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1400px] px-6 py-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-2.5 rounded-xl px-4 py-2",
                style: {
                  background: `linear-gradient(135deg, ${EMERALD.replace(")", " / 0.20)")} 0%, ${EMERALD.replace(")", " / 0.10)")} 100%)`,
                  border: `1px solid ${EMERALD.replace(")", " / 0.35)")}`
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { className: "h-4 w-4", style: { color: EMERALD } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-display font-bold text-sm",
                      style: { color: EMERALD, letterSpacing: "0.18em" },
                      children: "IT PORTAL"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-base leading-none", children: "Registry Health Monitor" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "STMP · Knowledge Layer · System Registries" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              className: "font-mono text-[10px] tracking-widest",
              style: {
                background: EMERALD.replace(")", " / 0.12)"),
                color: EMERALD,
                border: `1px solid ${EMERALD.replace(")", " / 0.30)")}`
              },
              children: "SYSTEM HEALTHY"
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1400px] px-6 py-6 space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3", "data-ocid": "it_portal.nav", children: IT_LINKS.map((link, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: link.to,
          "data-ocid": `it_portal.nav_link.${i + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: 1, scale: 1 },
              transition: { delay: i * 0.05 },
              className: "flex items-center gap-2 glass-sm rounded-xl px-4 py-2.5 hover:scale-[1.02] transition-smooth cursor-pointer",
              style: {
                border: `1px solid ${link.color.replace(")", " / 0.25)")}`
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  link.icon,
                  {
                    className: "h-3.5 w-3.5",
                    style: { color: link.color }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground", children: link.label })
              ]
            }
          )
        },
        link.label
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "it_portal.stmp_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex h-8 w-8 items-center justify-center rounded-xl",
              style: {
                background: GOLD.replace(")", " / 0.12)"),
                border: `1px solid ${GOLD.replace(")", " / 0.28)")}`
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Grid3x3, { className: "h-4 w-4", style: { color: GOLD } })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground text-lg", children: "STMP Registry Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Subject Template Master Protocol · Grade-locked master templates" })
          ] })
        ] }),
        stmpLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-2xl" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                label: "Total Templates",
                value: STMP_DATA.totalTemplates,
                icon: Database,
                color: GOLD,
                sub: `${stmpFillPct}% of max 144`,
                index: 0
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                label: "Master-Locked",
                value: STMP_DATA.lockedTemplates,
                icon: Lock,
                color: GOLD,
                sub: "Protected from edits",
                index: 1
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                label: "Unlocked (Draft)",
                value: STMP_DATA.unlockedTemplates,
                icon: LockOpen,
                color: GOLD,
                sub: "Pending finalization",
                index: 2
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                label: "Subjects Covered",
                value: 12,
                icon: BookOpen,
                color: GOLD,
                sub: "All 12 subject areas",
                index: 3
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass-grade-vault rounded-2xl p-5 space-y-3",
              "data-ocid": "it_portal.stmp_fill_bar",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "Registry Capacity" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "font-mono font-bold text-sm",
                      style: { color: GOLD },
                      children: [
                        STMP_DATA.totalTemplates,
                        " / ",
                        STMP_DATA.maxTemplates,
                        " ",
                        "(F(12)=144 max)"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 rounded-full overflow-hidden bg-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    className: "h-full rounded-full",
                    initial: { width: 0 },
                    animate: { width: `${stmpFillPct}%` },
                    transition: { duration: 1, ease: "easeOut" },
                    style: {
                      background: `linear-gradient(90deg, ${GOLD} 0%, oklch(0.82 0.14 84) 100%)`,
                      boxShadow: `0 0 12px ${GOLD.replace(")", " / 0.35)")}`
                    }
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 pt-2", children: STMP_DATA.bySubject.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    "data-ocid": `it_portal.stmp_subject.${i + 1}`,
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { delay: i * 0.04 },
                    className: "glass-sm rounded-lg px-3 py-2 flex items-center justify-between gap-2",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground truncate", children: s.subject }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            className: "font-mono text-[10px]",
                            style: { color: GOLD },
                            children: [
                              s.grades,
                              "G"
                            ]
                          }
                        ),
                        s.locked ? /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-2.5 w-2.5 text-amber-400/70" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-2.5 w-2.5 text-emerald-400/70" })
                      ] })
                    ]
                  },
                  s.subject
                )) })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "it_portal.knowledge_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex h-8 w-8 items-center justify-center rounded-xl",
              style: {
                background: TEAL.replace(")", " / 0.12)"),
                border: `1px solid ${TEAL.replace(")", " / 0.28)")}`
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4", style: { color: TEAL } })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground text-lg", children: "Knowledge Layer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Sovereign curriculum content · GVLT-gated by grade · Digest engine status" })
          ] })
        ] }),
        knowledgeLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-2xl" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                label: "Total Subjects",
                value: KNOWLEDGE_DATA.totalSubjects,
                icon: BookOpen,
                color: TEAL,
                sub: "12 sovereign subjects",
                index: 0
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                label: "Total Topics",
                value: KNOWLEDGE_DATA.totalTopics,
                icon: FileText,
                color: TEAL,
                sub: "F(13)=233 topics",
                index: 1
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                label: "Digested Textbooks",
                value: KNOWLEDGE_DATA.digestedTextbooks,
                icon: Database,
                color: TEAL,
                sub: `${KNOWLEDGE_DATA.pendingDigest} pending`,
                index: 2
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                label: "Grade Gates",
                value: KNOWLEDGE_DATA.gradeGates,
                icon: Lock,
                color: TEAL,
                sub: "K–12 PHI-locked",
                index: 3
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass-knowledge-surface rounded-2xl p-5 space-y-4",
              "data-ocid": "it_portal.knowledge_coverage",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "Curriculum Coverage by Grade" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-1.5 px-2.5 py-1 rounded-lg",
                      style: {
                        background: TEAL.replace(")", " / 0.10)"),
                        border: `1px solid ${TEAL.replace(")", " / 0.25)")}`
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-3 w-3", style: { color: TEAL } }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "font-mono text-[10px] font-bold",
                            style: { color: TEAL },
                            children: "SEED ACTIVE"
                          }
                        )
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-2 h-24", children: KNOWLEDGE_DATA.coverage.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    "data-ocid": `it_portal.coverage_bar.${i + 1}`,
                    initial: { scaleY: 0 },
                    animate: { scaleY: 1 },
                    transition: { delay: i * 0.05, duration: 0.5 },
                    style: { originY: 1, flex: 1 },
                    className: "flex flex-col items-center gap-1",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: "text-[9px] font-mono",
                          style: { color: TEAL },
                          children: [
                            c.pct,
                            "%"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "w-full rounded-t-sm",
                          style: {
                            height: `${c.pct}%`,
                            background: c.pct >= 80 ? `${TEAL.replace(")", " / 0.70)")}` : c.pct >= 60 ? "oklch(0.78 0.17 100 / 0.60)" : "oklch(0.75 0.16 50 / 0.50)",
                            boxShadow: c.pct >= 80 ? `0 0 8px ${TEAL.replace(")", " / 0.30)")}` : "none"
                          }
                        }
                      )
                    ]
                  },
                  c.grade
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: KNOWLEDGE_DATA.coverage.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "flex-1 text-center text-[9px] font-mono text-muted-foreground",
                    children: c.grade
                  },
                  c.grade
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4 pt-1", children: [
                  { color: TEAL, label: "≥80% covered" },
                  { color: "oklch(0.78 0.17 100)", label: "60–79%" },
                  { color: "oklch(0.75 0.16 50)", label: "<60% sparse" }
                ].map(({ color, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-2.5 w-2.5 rounded-sm",
                      style: { background: color }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: label })
                ] }, label)) })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "section",
        {
          className: "glass rounded-2xl p-5",
          "data-ocid": "it_portal.system_links",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4", children: "System Access Points" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3", children: IT_LINKS.map((link, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: link.to,
                "data-ocid": `it_portal.system_link.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "glass-sm rounded-xl p-4 flex flex-col items-center gap-3 hover:scale-[1.03] transition-smooth text-center cursor-pointer",
                    style: {
                      border: `1px solid ${link.color.replace(")", " / 0.22)")}`
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "w-10 h-10 rounded-xl flex items-center justify-center",
                          style: {
                            background: link.color.replace(")", " / 0.10)"),
                            border: `1px solid ${link.color.replace(")", " / 0.28)")}`
                          },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            link.icon,
                            {
                              className: "h-4 w-4",
                              style: { color: link.color }
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground", children: link.label })
                    ]
                  }
                )
              },
              link.label
            )) })
          ]
        }
      )
    ] })
  ] });
}
export {
  ITPortal as default
};
