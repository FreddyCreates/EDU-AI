import { r as reactExports, j as jsxRuntimeExports, R as React } from "./vendor-1quNMNNh.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { a as usePrincipalHeatmapWithNoms, b as useAllRecognitionFlags } from "./use-principal-intelligence-C9oOVM5O.js";
import { L as Link } from "./router-D6GUppNf.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { A as ArrowLeft } from "./arrow-left-DLov4c1N.js";
import { i as createLucideIcon, b as Star, U as Users, q as Crown, g as Activity, Z as Zap, a as Award } from "./index-BivnQ6bB.js";
import { R as RefreshCw } from "./refresh-cw-yaYaSXit.js";
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
  [
    "path",
    {
      d: "M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",
      key: "169xi5"
    }
  ],
  ["path", { d: "M15 5.764v15", key: "1pn4in" }],
  ["path", { d: "M9 3.236v15", key: "1uimfh" }]
];
const Map$1 = createLucideIcon("map", __iconNode);
const AMBER = "oklch(0.75 0.16 70)";
const FIB_REFRESH_MS = 21e3;
const SUBJECTS = [
  "Mathematics",
  "Science",
  "English",
  "History",
  "Geography",
  "Art",
  "Music",
  "Phys Ed",
  "Comp Sci",
  "Biology",
  "Chemistry",
  "Physics"
];
const GRADES = [
  "K",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12"
];
function seedMastery(gi, si) {
  const v = ((gi + 1) * 17 + si * 31 + 7) % 97;
  return Math.max(10, v);
}
function masteryStyle(pct) {
  if (pct >= 80)
    return {
      bg: "rgba(0,210,255,0.12)",
      border: "rgba(0,210,255,0.30)",
      text: "oklch(0.78 0.22 200)",
      glow: "0 0 10px rgba(0,210,255,0.25)"
    };
  if (pct >= 60)
    return {
      bg: "rgba(0,220,130,0.10)",
      border: "rgba(0,220,130,0.28)",
      text: "oklch(0.72 0.17 155)",
      glow: "0 0 8px rgba(0,220,130,0.20)"
    };
  if (pct >= 35)
    return {
      bg: "rgba(255,185,0,0.10)",
      border: "rgba(255,185,0,0.28)",
      text: "oklch(0.75 0.16 70)",
      glow: "none"
    };
  return {
    bg: "rgba(255,60,60,0.08)",
    border: "rgba(255,60,60,0.25)",
    text: "oklch(0.65 0.22 22)",
    glow: "none"
  };
}
function nomBadge(count) {
  if (count === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: "absolute -top-1 -right-1 h-4 min-w-[16px] rounded-full flex items-center justify-center font-mono font-bold text-[8px] px-0.5 z-10",
      style: {
        background: "oklch(0.72 0.18 70)",
        color: "oklch(0.15 0.02 70)",
        boxShadow: "0 0 6px rgba(255,185,0,0.60)"
      },
      children: count
    }
  );
}
function CellDrilldown({
  cell,
  gradeName,
  mastery,
  onClose
}) {
  if (!cell) return null;
  const style = masteryStyle(mastery);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 8 },
      transition: { duration: 0.22 },
      className: "glass-portal-principal rounded-2xl p-5 space-y-4",
      style: { border: `1px solid ${style.border}` },
      "data-ocid": "principal.heatmap.cell_drilldown",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "h3",
              {
                className: "font-display font-bold text-sm tracking-wide",
                style: { color: style.text },
                children: [
                  cell.subject,
                  " · Grade ",
                  gradeName
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] font-mono text-muted-foreground mt-0.5", children: [
              Number(cell.activeStudents),
              " active students · avg ",
              mastery,
              "% mastery"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "glass-sm h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-smooth",
              onClick: onClose,
              "aria-label": "Close drill-down",
              "data-ocid": "principal.heatmap.drilldown_close_button",
              children: "×"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: [
          { label: "Avg Mastery", value: `${mastery}%` },
          { label: "Pending NOMS", value: String(Number(cell.pendingNoms)) },
          {
            label: "Achievements",
            value: String(Number(cell.recentAchievements))
          }
        ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-xl p-3 text-center",
            style: {
              background: style.bg,
              border: `1px solid ${style.border}`
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "font-display font-bold text-lg",
                  style: { color: style.text },
                  children: value
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-muted-foreground", children: label })
            ]
          },
          label
        )) }),
        Number(cell.pendingNoms) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-xl p-3 flex items-center justify-between",
            style: {
              background: "rgba(255,185,0,0.07)",
              border: "1px solid rgba(255,185,0,0.20)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3.5 w-3.5", style: { color: AMBER } }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono", style: { color: AMBER }, children: [
                  Number(cell.pendingNoms),
                  " student",
                  Number(cell.pendingNoms) !== 1 ? "s" : "",
                  " ready for nomination"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/nominations",
                  className: "text-[10px] font-mono font-bold hover:opacity-80 transition-smooth",
                  style: { color: AMBER },
                  "data-ocid": "principal.heatmap.nominate_link",
                  children: "NOMINATE →"
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function RecognitionBanner({ flags }) {
  const pending = flags.filter((f) => !f.sealed);
  if (pending.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: -8 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.35 },
      className: "glass-portal-principal rounded-2xl p-5",
      style: {
        border: "1px solid rgba(255,185,0,0.25)",
        boxShadow: "0 0 20px rgba(255,185,0,0.10)"
      },
      "data-ocid": "principal.heatmap.recognition_banner",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-9 w-9 rounded-xl flex items-center justify-center",
              style: {
                background: "rgba(255,185,0,0.15)",
                border: "1px solid rgba(255,185,0,0.30)",
                boxShadow: "0 0 14px rgba(255,185,0,0.20)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-4.5 w-4.5", style: { color: AMBER } })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                className: "font-display font-bold text-sm tracking-wide",
                style: {
                  color: AMBER,
                  textShadow: "0 0 20px rgba(255,185,0,0.35)"
                },
                children: "STUDENTS READY FOR RECOGNITION"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] font-mono text-muted-foreground", children: [
              pending.length,
              " school-wide RCGN flag",
              pending.length !== 1 ? "s" : "",
              " pending action"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/nominations",
              "data-ocid": "principal.heatmap.view_all_noms_link",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: "glass-sm rounded-lg px-3 py-1.5 font-mono text-[10px] font-bold hover:border-amber-500/40 transition-smooth flex items-center gap-1.5",
                  style: { color: AMBER },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3" }),
                    "VIEW ALL"
                  ]
                }
              )
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 max-h-[200px] overflow-y-auto pr-1", children: pending.slice(0, 8).map((flag, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": `principal.heatmap.rcgn_flag.${i + 1}`,
            className: "rounded-xl px-4 py-3 flex items-center justify-between gap-3",
            style: {
              background: "rgba(255,185,0,0.06)",
              border: "1px solid rgba(255,185,0,0.15)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-7 w-7 rounded-full flex items-center justify-center shrink-0 font-mono font-bold text-[10px]",
                    style: {
                      background: "rgba(255,185,0,0.15)",
                      border: "1px solid rgba(255,185,0,0.25)",
                      color: AMBER
                    },
                    children: String(flag.studentId).slice(-2).toUpperCase()
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground truncate", children: flag.subject }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[9px] font-mono text-muted-foreground", children: [
                    flag.pattern,
                    " · ",
                    Number(flag.masteryScore),
                    "% mastery"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                flag.eligiblePrograms.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    className: "text-[9px] font-mono px-1.5",
                    style: {
                      background: "rgba(255,185,0,0.12)",
                      color: AMBER,
                      border: "1px solid rgba(255,185,0,0.25)"
                    },
                    children: [
                      flag.eligiblePrograms.length,
                      " program",
                      flag.eligiblePrograms.length !== 1 ? "s" : ""
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/nominations",
                    "data-ocid": `principal.heatmap.nominate_button.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "glass-sm rounded-lg px-2.5 py-1 font-mono text-[9px] font-bold hover:border-amber-500/40 transition-smooth",
                        style: { color: AMBER },
                        children: "NOMINATE"
                      }
                    )
                  }
                )
              ] })
            ]
          },
          flag.id
        )) })
      ]
    }
  );
}
function HeatCell({
  gradeIdx,
  subjectIdx,
  liveCell,
  baseMastery,
  refreshKey,
  onClick
}) {
  const jitter = (refreshKey + gradeIdx * 7 + subjectIdx * 13) % 8 - 4;
  const pct = Math.max(5, Math.min(99, baseMastery + jitter));
  const style = masteryStyle(pct);
  const pendingNoms = liveCell ? Number(liveCell.pendingNoms) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0.6, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      transition: {
        duration: 0.3,
        delay: (gradeIdx * 12 + subjectIdx) * 3e-3
      },
      onClick: () => onClick(liveCell, gradeIdx),
      className: "relative rounded-md flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10 group",
      style: {
        background: style.bg,
        border: `1px solid ${style.border}`,
        boxShadow: style.glow,
        minHeight: 40,
        padding: "4px 2px"
      },
      title: `${SUBJECTS[subjectIdx]}, Grade ${GRADES[gradeIdx]}: ${pct}% mastery`,
      "data-ocid": `principal.heatmap.cell.${gradeIdx + 1}_${subjectIdx + 1}`,
      children: [
        nomBadge(pendingNoms),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "font-mono text-[10px] font-bold leading-none",
            style: { color: style.text },
            children: [
              pct,
              "%"
            ]
          }
        ),
        liveCell && Number(liveCell.activeStudents) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px] text-muted-foreground/60 mt-0.5 leading-none", children: Number(liveCell.activeStudents) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-20 hidden group-hover:block pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-lg px-2 py-1.5 text-[9px] font-mono whitespace-nowrap",
            style: {
              background: "rgba(6,8,18,0.95)",
              border: "1px solid rgba(255,255,255,0.10)",
              color: style.text
            },
            children: [
              SUBJECTS[subjectIdx],
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "Grade ",
              GRADES[gradeIdx],
              " · ",
              pct,
              "%",
              pendingNoms > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: AMBER }, children: [
                  "★ ",
                  pendingNoms,
                  " nomination",
                  pendingNoms !== 1 ? "s" : "",
                  " pending"
                ] })
              ] })
            ]
          }
        ) })
      ]
    },
    `${gradeIdx}-${subjectIdx}-${refreshKey}`
  );
}
function Legend() {
  const items = [
    {
      label: "≥80% Excellent",
      bg: "rgba(0,210,255,0.12)",
      border: "rgba(0,210,255,0.30)",
      text: "oklch(0.78 0.22 200)"
    },
    {
      label: "60–79% Good",
      bg: "rgba(0,220,130,0.10)",
      border: "rgba(0,220,130,0.28)",
      text: "oklch(0.72 0.17 155)"
    },
    {
      label: "35–59% Developing",
      bg: "rgba(255,185,0,0.10)",
      border: "rgba(255,185,0,0.28)",
      text: "oklch(0.75 0.16 70)"
    },
    {
      label: "<35% Attention",
      bg: "rgba(255,60,60,0.08)",
      border: "rgba(255,60,60,0.25)",
      text: "oklch(0.65 0.22 22)"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono text-muted-foreground uppercase tracking-wider", children: "LEGEND:" }),
    items.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "inline-flex items-center gap-1 rounded px-2 py-1 font-mono text-[9px]",
        style: {
          background: l.bg,
          border: `1px solid ${l.border}`,
          color: l.text
        },
        children: l.label
      },
      l.label
    )),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "inline-flex items-center gap-1 rounded px-2 py-1 font-mono text-[9px]",
        style: {
          background: "rgba(255,185,0,0.12)",
          border: "1px solid rgba(255,185,0,0.28)",
          color: AMBER
        },
        children: "★ Gold badge = pending NOMS"
      }
    )
  ] });
}
function PrincipalHeatmap() {
  const { data: heatmapData = [], isLoading } = usePrincipalHeatmapWithNoms();
  const { data: rcgnFlags = [] } = useAllRecognitionFlags();
  const [refreshKey, setRefreshKey] = reactExports.useState(0);
  const [lastRefresh, setLastRefresh] = reactExports.useState(/* @__PURE__ */ new Date());
  const [selectedCell, setSelectedCell] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const t = setInterval(() => {
      setRefreshKey((k) => k + 1);
      setLastRefresh(/* @__PURE__ */ new Date());
    }, FIB_REFRESH_MS);
    return () => clearInterval(t);
  }, []);
  new Map(
    heatmapData.map((h) => [h.classId, h])
  );
  const nomsByGrade = /* @__PURE__ */ new Map();
  for (const h of heatmapData) {
    const g = Number(h.grade);
    if (!nomsByGrade.has(g)) nomsByGrade.set(g, h);
  }
  const totalNoms = heatmapData.reduce((s, h) => s + Number(h.pendingNoms), 0);
  const totalStudents = heatmapData.reduce(
    (s, h) => s + Number(h.activeStudents),
    0
  );
  function handleCellClick(cell, gradeIdx, subjectIdx) {
    if ((selectedCell == null ? void 0 : selectedCell.gradeIdx) === gradeIdx && (selectedCell == null ? void 0 : selectedCell.subjectIdx) === subjectIdx) {
      setSelectedCell(null);
    } else {
      setSelectedCell({ cell, gradeIdx, subjectIdx });
    }
  }
  const selectedCellMastery = selectedCell ? Math.max(
    5,
    Math.min(
      99,
      (selectedCell.cell ? Math.round(Number(selectedCell.cell.avgMastery)) : seedMastery(selectedCell.gradeIdx, selectedCell.subjectIdx)) + (refreshKey + selectedCell.gradeIdx * 7 + selectedCell.subjectIdx * 13) % 8 - 4
    )
  ) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "portal-enter min-h-screen",
      "data-ocid": "principal.heatmap_page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: -12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4 },
            className: "glass-xl border-b sticky top-0 z-30",
            style: { borderColor: "rgba(255,185,0,0.12)" },
            "data-ocid": "principal.heatmap.header",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[1600px] mx-auto px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/principal", "data-ocid": "principal.heatmap.back_link", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "glass-sm h-9 w-9 rounded-xl flex items-center justify-center hover:border-amber-500/40 transition-smooth",
                    "aria-label": "Back to dashboard",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4", style: { color: AMBER } })
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-11 w-11 rounded-xl flex items-center justify-center shrink-0",
                    style: {
                      background: "linear-gradient(135deg, rgba(255,185,0,0.20), rgba(255,185,0,0.06))",
                      border: "1px solid rgba(255,185,0,0.35)",
                      boxShadow: "0 0 20px rgba(255,185,0,0.15)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Map$1, { className: "h-5 w-5", style: { color: AMBER } })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h1",
                      {
                        className: "font-display text-xl font-bold tracking-widest",
                        style: {
                          color: AMBER,
                          textShadow: "0 0 24px rgba(255,185,0,0.40)"
                        },
                        children: "SOVEREIGN KNOWLEDGE MAP"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        className: "font-mono text-[9px]",
                        style: {
                          background: "rgba(255,185,0,0.12)",
                          color: AMBER,
                          border: "1px solid rgba(255,185,0,0.25)"
                        },
                        children: "12 × 13"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 font-mono", children: "12 Subjects × 13 Grade Levels · Click any cell to drill down · Auto-refresh F(8)=21s" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-5", children: [
                totalNoms > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3.5 w-3.5", style: { color: AMBER } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm", style: { color: AMBER }, children: totalNoms }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "PENDING NOMS" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm", style: { color: AMBER }, children: totalStudents > 0 ? totalStudents.toLocaleString() : "—" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "TOTAL STUDENTS" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-6 w-px",
                    style: { background: "rgba(255,185,0,0.15)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "h-1.5 w-1.5 rounded-full",
                      style: {
                        background: AMBER,
                        boxShadow: "0 0 6px rgba(255,185,0,0.70)",
                        animation: "status-pulse 2s ease-in-out infinite"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-mono text-[10px]",
                      style: { color: AMBER },
                      children: "LIVE"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      setRefreshKey((k) => k + 1);
                      setLastRefresh(/* @__PURE__ */ new Date());
                    },
                    className: "glass-sm rounded-lg px-3 py-1.5 flex items-center gap-1.5 hover:border-amber-500/40 transition-smooth",
                    style: { color: AMBER },
                    "data-ocid": "principal.heatmap.refresh_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-3 w-3" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px]", children: "REFRESH" })
                    ]
                  }
                )
              ] })
            ] }) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1600px] mx-auto px-4 md:px-6 py-6 space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RecognitionBanner, { flags: rcgnFlags }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.4 },
              className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
              "data-ocid": "principal.heatmap.stats_bar",
              children: [
                {
                  label: "Grade Levels",
                  value: "13",
                  sub: "K through 12",
                  icon: Crown
                },
                {
                  label: "Subjects",
                  value: "12",
                  sub: "Core curriculum",
                  icon: Activity
                },
                {
                  label: "Pending NOMS",
                  value: totalNoms > 0 ? String(totalNoms) : "—",
                  sub: "Awaiting nomination",
                  icon: Star
                },
                {
                  label: "Refresh Interval",
                  value: "21s",
                  sub: `Last: ${lastRefresh.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" })}`,
                  icon: Zap
                }
              ].map(({ label, value, sub, icon: Icon }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "glass-portal-principal rounded-xl p-4 flex items-center gap-3",
                  "data-ocid": `principal.heatmap.stat.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-9 w-9 rounded-lg flex items-center justify-center shrink-0",
                        style: {
                          background: "rgba(255,185,0,0.10)",
                          border: "1px solid rgba(255,185,0,0.22)"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4", style: { color: AMBER } })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "font-display text-xl font-bold leading-none",
                          style: { color: AMBER },
                          children: value
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5 truncate", children: label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-[9px] font-mono mt-0.5",
                          style: { color: "rgba(255,185,0,0.55)" },
                          children: sub
                        }
                      )
                    ] })
                  ]
                },
                label
              ))
            }
          ),
          selectedCell && /* @__PURE__ */ jsxRuntimeExports.jsx(
            CellDrilldown,
            {
              cell: selectedCell.cell,
              gradeName: GRADES[selectedCell.gradeIdx],
              mastery: selectedCellMastery,
              onClose: () => setSelectedCell(null)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 0.1 },
              className: "glass-portal-principal rounded-2xl p-5 overflow-auto",
              "data-ocid": "principal.heatmap.grid_panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h2",
                    {
                      className: "font-display font-bold text-sm tracking-wide",
                      style: { color: AMBER },
                      children: "MASTERY MATRIX — SUBJECTS × GRADES"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-1 w-16 rounded-full",
                      style: {
                        background: `linear-gradient(90deg, ${AMBER}, transparent)`
                      }
                    }
                  )
                ] }),
                isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "space-y-2 animate-pulse",
                    "data-ocid": "principal.heatmap.loading_state",
                    children: Array.from({ length: 6 }, (_, k) => k).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 rounded-lg bg-amber-500/5" }, k))
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "grid",
                      gridTemplateColumns: `48px repeat(${SUBJECTS.length}, minmax(54px, 1fr))`,
                      gap: "4px",
                      minWidth: 760
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
                      SUBJECTS.map((subj) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "text-[8px] font-mono text-muted-foreground text-center pb-1 leading-tight px-0.5",
                          style: { wordBreak: "break-word" },
                          children: subj
                        },
                        subj
                      )),
                      GRADES.map((grade, gi) => {
                        const gradeNum = gi === 0 ? 0 : gi;
                        const liveRow = nomsByGrade.get(gradeNum) ?? null;
                        return /* @__PURE__ */ jsxRuntimeExports.jsxs(React.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-end pr-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Link,
                            {
                              to: "/principal/grade/$grade",
                              params: {
                                grade: String(gradeNum > 0 ? gradeNum : 1)
                              },
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: "font-mono text-xs font-bold cursor-pointer hover:opacity-80 transition-opacity",
                                  style: { color: AMBER },
                                  children: grade
                                }
                              )
                            }
                          ) }),
                          SUBJECTS.map((_, si) => {
                            const base = liveRow ? Math.round(Number(liveRow.avgMastery)) : seedMastery(gi, si);
                            return /* @__PURE__ */ jsxRuntimeExports.jsx(
                              HeatCell,
                              {
                                gradeIdx: gi,
                                subjectIdx: si,
                                liveCell: liveRow,
                                baseMastery: base,
                                refreshKey,
                                onClick: (cell, gIdx) => handleCellClick(cell, gIdx, si)
                              },
                              `${SUBJECTS[si]}-grade${gi}`
                            );
                          })
                        ] }, `row-${grade}`);
                      })
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "mt-5 pt-4",
                    style: { borderTop: "1px solid rgba(255,185,0,0.10)" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {})
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.4, delay: 0.2 },
              className: "glass-portal-principal rounded-2xl p-5",
              "data-ocid": "principal.heatmap.grade_summary",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    className: "font-display text-sm font-bold mb-4 tracking-wide",
                    style: { color: AMBER },
                    children: "LIVE GRADE ENROLLMENT"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "grid gap-2",
                    style: {
                      gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))"
                    },
                    children: GRADES.map((grade, gi) => {
                      const gradeNum = gi === 0 ? 0 : gi;
                      const liveRow = nomsByGrade.get(gradeNum);
                      const count = liveRow ? Number(liveRow.activeStudents) : 0;
                      const mastery = liveRow ? Math.round(Number(liveRow.avgMastery)) : seedMastery(gi, 5);
                      const s = masteryStyle(mastery);
                      const pending = liveRow ? Number(liveRow.pendingNoms) : 0;
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "relative rounded-xl p-3 text-center",
                          style: { background: s.bg, border: `1px solid ${s.border}` },
                          "data-ocid": `principal.heatmap.grade_tile.${gi + 1}`,
                          children: [
                            pending > 0 && nomBadge(pending),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: "font-display font-bold text-base",
                                style: { color: s.text },
                                children: grade
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "p",
                              {
                                className: "font-mono text-[10px] font-bold mt-0.5",
                                style: { color: s.text },
                                children: [
                                  mastery,
                                  "%"
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-muted-foreground", children: count > 0 ? `${count} stu` : "No data" })
                          ]
                        },
                        grade
                      );
                    })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.3 },
              className: "flex items-center justify-between pt-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-muted-foreground/50", children: "SOVEREIGN KNOWLEDGE MAP · LEX_FLOR ACTIVE · PHI-COMPOUNDED SCORES" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/principal", "data-ocid": "principal.heatmap.back_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    className: "glass-sm rounded-lg px-3 py-1.5 font-mono text-[10px] flex items-center gap-1.5 hover:border-amber-500/40 transition-smooth",
                    style: { color: AMBER },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3 w-3" }),
                      "PRINCIPAL OS"
                    ]
                  }
                ) })
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  PrincipalHeatmap as default
};
