import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { B as Button } from "./button-CWs7EcLL.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CPBO6QhB.js";
import { G as GraduationCap, B as BookOpen, U as Users, S as Skeleton, o as Layers, g as Activity } from "./index-BivnQ6bB.js";
import { u as useTeacherClasses, c as castClassRecord } from "./use-grade-metrics-Bpk7MeAS.js";
import { L as Link } from "./router-D6GUppNf.js";
import { P as Plus } from "./plus-DLM4cYLL.js";
import { T as TrendingUp } from "./trending-up-CpgQ7qb4.js";
import { F as Funnel } from "./funnel-p38cV8I3.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { C as ChevronRight } from "./chevron-right-neFioPkE.js";
import { B as Brain } from "./brain-BiTGGu73.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./index-Dc3cfdi4.js";
import "./index-Dla_9Jug.js";
import "./index-BXiroDnN.js";
import "./index-D7KnjD29.js";
import "./index-DstPCoQp.js";
import "./index-DD4zw4TC.js";
import "./chevron-down-B2BSsDRF.js";
import "./chevron-up-BZKIp_lu.js";
import "./query-8urnerR0.js";
const DEMO_TEACHER_ID = "demo-teacher";
function LiveDot() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative inline-flex h-2 w-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 bg-violet-400" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-violet-400" })
  ] });
}
function TeacherClasses() {
  const [gradeFilter, setGradeFilter] = reactExports.useState("all");
  const [subjectFilter, setSubjectFilter] = reactExports.useState("all");
  const [sortBy, setSortBy] = reactExports.useState("name");
  const {
    data: rawClasses,
    isLoading,
    isError
  } = useTeacherClasses(DEMO_TEACHER_ID);
  const classes = reactExports.useMemo(() => {
    const mapped = (rawClasses ?? []).map(castClassRecord);
    let filtered = mapped;
    if (gradeFilter !== "all")
      filtered = filtered.filter((c) => String(c.grade) === gradeFilter);
    if (subjectFilter !== "all")
      filtered = filtered.filter((c) => c.subject === subjectFilter);
    return filtered.sort((a, b) => {
      if (sortBy === "mastery") return b.avgMastery - a.avgMastery;
      if (sortBy === "students") return b.studentCount - a.studentCount;
      return a.className.localeCompare(b.className);
    });
  }, [rawClasses, gradeFilter, subjectFilter, sortBy]);
  const allSubjects = reactExports.useMemo(() => {
    const subjects = new Set((rawClasses ?? []).map((c) => c.subject));
    return Array.from(subjects);
  }, [rawClasses]);
  const allGrades = reactExports.useMemo(() => {
    const grades = new Set((rawClasses ?? []).map((c) => Number(c.grade)));
    return Array.from(grades).sort((a, b) => a - b);
  }, [rawClasses]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "portal-enter min-h-screen", "data-ocid": "teacher-classes.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "glass-portal-teacher glass-shimmer sticky top-0 z-30",
        style: { borderBottom: "1px solid rgba(160,100,255,0.18)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1400px] px-6 py-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-2.5 rounded-xl px-4 py-2",
                style: {
                  background: "linear-gradient(135deg, rgba(160,100,255,0.22) 0%, rgba(100,60,180,0.15) 100%)",
                  border: "1px solid rgba(160,100,255,0.35)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-5 w-5 text-violet-300" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-display font-bold text-sm text-violet-200",
                      style: { letterSpacing: "0.18em" },
                      children: "MY CLASSES"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LiveDot, {})
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-base leading-none", children: "Class Registry · Ms. Rivera" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: isLoading ? "Loading…" : `${(rawClasses == null ? void 0 : rawClasses.length) ?? 0} active classes · STMP Aligned` })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/teacher", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                size: "sm",
                variant: "outline",
                className: "glass-sm border-0 text-xs",
                style: {
                  borderColor: "rgba(160,100,255,0.3)",
                  color: "rgba(200,160,255,0.9)"
                },
                "data-ocid": "teacher-classes.back_button",
                children: "← Dashboard"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/teacher", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "sm",
                "data-ocid": "teacher-classes.create_button",
                className: "gap-1.5 text-xs",
                style: {
                  background: "linear-gradient(135deg, oklch(0.62 0.22 280), oklch(0.48 0.22 280))",
                  border: "1px solid rgba(160,100,255,0.4)",
                  boxShadow: "0 0 16px rgba(160,100,255,0.25)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
                  " New Class"
                ]
              }
            ) })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1400px] px-6 py-6 space-y-6", children: [
      !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4", children: [
        {
          label: "Active Classes",
          value: (rawClasses == null ? void 0 : rawClasses.length) ?? 0,
          icon: BookOpen,
          color: "text-violet-400"
        },
        {
          label: "Total Students",
          value: (rawClasses ?? []).reduce(
            (sum, c) => sum + Number(c.studentCount),
            0
          ),
          icon: Users,
          color: "text-emerald-400"
        },
        {
          label: "Avg Class Mastery",
          value: `${((rawClasses ?? []).reduce((sum, c) => sum + c.avgMastery, 0) / Math.max((rawClasses ?? []).length, 1) * 100).toFixed(0)}%`,
          icon: TrendingUp,
          color: "text-amber-400"
        }
      ].map(({ label, value, icon: Icon, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "glass-sm rounded-2xl p-4 flex items-center gap-3 glass-shimmer",
          style: { border: "1px solid rgba(160,100,255,0.18)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex h-10 w-10 items-center justify-center rounded-xl",
                style: {
                  background: "rgba(160,100,255,0.12)",
                  border: "1px solid rgba(160,100,255,0.22)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-5 w-5 ${color}` })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-display font-bold text-foreground", children: value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label })
            ] })
          ]
        },
        label
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "glass rounded-2xl px-5 py-4 flex items-center gap-4 flex-wrap",
          "data-ocid": "teacher-classes.filter_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-4 w-4 text-violet-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-display font-semibold text-foreground", children: "Filter" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: gradeFilter, onValueChange: setGradeFilter, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "glass-sm border-0 w-36 h-9 text-xs",
                  "data-ocid": "teacher-classes.grade_filter",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Grades" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "glass-xl border-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Grades" }),
                allGrades.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: String(g), children: [
                  "Grade ",
                  g
                ] }, g))
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: subjectFilter, onValueChange: setSubjectFilter, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "glass-sm border-0 w-44 h-9 text-xs",
                  "data-ocid": "teacher-classes.subject_filter",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Subjects" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "glass-xl border-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Subjects" }),
                allSubjects.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s))
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Sort:" }),
              [
                { value: "name", label: "Name" },
                { value: "mastery", label: "Mastery" },
                { value: "students", label: "Students" }
              ].map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": `teacher-classes.sort_${opt.value}`,
                  onClick: () => setSortBy(opt.value),
                  className: "text-xs px-3 py-1.5 rounded-lg transition-smooth",
                  style: {
                    background: sortBy === opt.value ? "rgba(160,100,255,0.22)" : "rgba(160,100,255,0.08)",
                    border: `1px solid ${sortBy === opt.value ? "rgba(160,100,255,0.45)" : "rgba(160,100,255,0.18)"}`,
                    color: sortBy === opt.value ? "rgba(200,160,255,0.95)" : "rgba(180,140,240,0.6)"
                  },
                  children: opt.label
                },
                opt.value
              ))
            ] })
          ]
        }
      ),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5", children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 rounded-2xl" }, i)) }) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "data-ocid": "teacher-classes.error_state",
          className: "glass rounded-2xl p-[var(--phi-34)] text-center",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive", children: "Failed to load classes. Please refresh." })
        }
      ) : classes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          "data-ocid": "teacher-classes.empty_state",
          className: "glass-portal-teacher rounded-2xl p-[var(--phi-55)] flex flex-col items-center gap-5 text-center",
          style: { border: "1px dashed rgba(160,100,255,0.3)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex h-16 w-16 items-center justify-center rounded-2xl",
                style: {
                  background: "rgba(160,100,255,0.12)",
                  border: "1px solid rgba(160,100,255,0.25)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-8 w-8 text-violet-400/60" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-display font-semibold text-foreground", children: gradeFilter !== "all" || subjectFilter !== "all" ? "No classes match your filters" : "No classes yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-sm", children: gradeFilter !== "all" || subjectFilter !== "all" ? "Try adjusting the grade or subject filter." : "Create your first class from the Teacher Dashboard to get started." })
            ] }),
            gradeFilter === "all" && subjectFilter === "all" && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/teacher", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                className: "gap-2",
                style: {
                  background: "linear-gradient(135deg, oklch(0.62 0.22 280), oklch(0.48 0.22 280))",
                  border: "1px solid rgba(160,100,255,0.4)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
                  " Create First Class"
                ]
              }
            ) })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "data-ocid": "teacher-classes.list",
          className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5",
          children: classes.map((cls, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: idx * 0.07, duration: 0.35 },
              "data-ocid": `teacher-classes.item.${idx + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/teacher/class/$classId",
                  params: { classId: cls.classId },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "group glass-portal-teacher rounded-2xl p-5 space-y-4 hover:scale-[1.015] transition-smooth cursor-pointer glass-shimmer",
                      style: {
                        boxShadow: "0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(160,100,255,0.12)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0 flex-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "flex h-10 w-10 items-center justify-center rounded-xl shrink-0",
                                style: {
                                  background: "rgba(160,100,255,0.15)",
                                  border: "1px solid rgba(160,100,255,0.28)"
                                },
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-5 w-5 text-violet-400" })
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base text-foreground truncate", children: cls.className }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground truncate", children: cls.subject })
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            Badge,
                            {
                              className: "shrink-0 font-mono text-xs ml-2",
                              style: {
                                background: "rgba(160,100,255,0.18)",
                                borderColor: "rgba(160,100,255,0.35)",
                                color: "rgba(200,160,255,0.9)"
                              },
                              children: [
                                "Gr.",
                                cls.grade
                              ]
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Avg Mastery" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "span",
                              {
                                className: "text-sm font-display font-bold",
                                style: { color: "rgba(200,160,255,0.9)" },
                                children: [
                                  (cls.avgMastery * 100).toFixed(0),
                                  "%"
                                ]
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "h-2 rounded-full overflow-hidden",
                              style: { background: "rgba(160,100,255,0.12)" },
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                motion.div,
                                {
                                  className: "h-full rounded-full",
                                  initial: { width: 0 },
                                  animate: { width: `${cls.avgMastery * 100}%` },
                                  transition: {
                                    delay: idx * 0.07 + 0.2,
                                    duration: 0.8,
                                    ease: "easeOut"
                                  },
                                  style: {
                                    background: "linear-gradient(90deg, oklch(0.62 0.22 280), oklch(0.75 0.20 300))"
                                  }
                                }
                              )
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: "flex items-center justify-between pt-2",
                            style: { borderTop: "1px solid rgba(160,100,255,0.12)" },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "div",
                                  {
                                    className: "flex h-6 w-6 items-center justify-center rounded-md",
                                    style: { background: "rgba(160,100,255,0.12)" },
                                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3 w-3 text-violet-400" })
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: cls.studentCount }),
                                  " ",
                                  "students"
                                ] })
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-3.5 w-3.5 text-emerald-400" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-emerald-400 font-mono", children: "Active" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground/50 group-hover:text-violet-300 transition-smooth group-hover:translate-x-0.5" })
                              ] })
                            ]
                          }
                        )
                      ]
                    }
                  )
                }
              )
            },
            cls.classId
          ))
        }
      ),
      !isLoading && classes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 6 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.5 },
          className: "glass-sm rounded-2xl px-5 py-4 flex items-center justify-between gap-4",
          style: { border: "1px solid rgba(160,100,255,0.18)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex h-8 w-8 items-center justify-center rounded-xl",
                  style: {
                    background: "rgba(160,100,255,0.15)",
                    border: "1px solid rgba(160,100,255,0.25)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-4 w-4 text-violet-400" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-display font-semibold text-foreground", children: "SKAI Docens" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Get AI-powered class recommendations and insights" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/skai", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "sm",
                "data-ocid": "teacher-classes.skai_link",
                className: "text-xs gap-1.5",
                style: {
                  background: "rgba(160,100,255,0.18)",
                  border: "1px solid rgba(160,100,255,0.30)",
                  color: "rgba(200,160,255,0.9)"
                },
                children: [
                  "Open SKAI ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5" })
                ]
              }
            ) })
          ]
        }
      )
    ] })
  ] });
}
export {
  TeacherClasses as default
};
