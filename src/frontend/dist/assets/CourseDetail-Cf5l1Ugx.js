import { j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { E as EddiOrb } from "./EddiOrb-BVFxfmXd.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { B as Button } from "./button-CWs7EcLL.js";
import { c as useSSScore } from "./use-passport-VGmcZtEk.js";
import { c as useCourseDetail, u as useEnrollInCourse, L as LoaderCircle, a as useCourses } from "./use-university-Qtx5aNSN.js";
import { d as useNavigate, e as useParams } from "./router-D6GUppNf.js";
import { B as BookOpen, b as Star, u as ue } from "./index-BivnQ6bB.js";
import { C as ChevronLeft } from "./chevron-left-pbzTE56t.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { L as Lock } from "./lock-Cp-0nqtC.js";
import { S as Sparkles } from "./sparkles-C3IEEH24.js";
import { C as CircleCheck } from "./circle-check-Bol12715.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./query-8urnerR0.js";
const CATEGORY_STYLES = {
  UIL_ACADEMIC: {
    label: "UIL Academic",
    classes: "border-sky-400/30 bg-sky-400/10 text-sky-300"
  },
  UIL_CTE: {
    label: "CTE",
    classes: "border-amber-400/30 bg-amber-400/10 text-amber-300"
  },
  MUSIC: {
    label: "Music",
    classes: "border-violet-400/30 bg-violet-400/10 text-violet-300"
  },
  ATHLETICS: {
    label: "Athletics",
    classes: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
  }
};
function buildFallbackModules(count, courseTitle) {
  return Array.from({ length: count }, (_, i) => ({
    index: i + 1,
    id: `fallback-${i + 1}`,
    title: `Module ${i + 1}: ${courseTitle} — Part ${i + 1}`,
    content: "",
    completed: false
  }));
}
function ModuleSkeletons() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["m1", "m2", "m3", "m4"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4 animate-pulse",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-white/10 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 rounded bg-white/10 w-2/3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 rounded bg-white/5 w-1/3" })
        ] })
      ]
    },
    id
  )) });
}
function CourseDetail() {
  const navigate = useNavigate();
  const { courseId } = useParams({ from: "/collegium/$courseId" });
  const { courses } = useCourses();
  const { course: detailCourse, isLoading: detailLoading } = useCourseDetail(
    courseId ?? ""
  );
  const { enroll, enrollingId, enrolledIds, lastEnrollmentResult } = useEnrollInCourse();
  const { data: sssScore = 0 } = useSSScore();
  const staticCourse = courses.find((c) => c.id === courseId);
  const course = staticCourse;
  if (!course) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "course_detail.not_found",
        className: "mx-auto max-w-2xl px-5 py-24 flex flex-col items-center text-center gap-6",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-12 w-12 text-foreground/20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Course not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/50 text-sm", children: "This course doesn\\'t exist in the registry." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              className: "gap-2 border-white/10 bg-white/5 text-foreground/70 hover:bg-white/10",
              onClick: () => navigate({ to: "/collegium" }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }),
                "Back to Collegium"
              ]
            }
          )
        ]
      }
    );
  }
  const isEnrolled = enrolledIds.includes(course.id);
  const isEnrolling = enrollingId === course.id;
  const isLocked = sssScore < course.requiredSssThreshold;
  const liveModules = detailCourse == null ? void 0 : detailCourse.modules;
  const modules = liveModules && liveModules.length > 0 ? liveModules.map((m, i) => ({
    index: i + 1,
    id: m.moduleId,
    title: m.title,
    content: m.description,
    completed: false
  })) : buildFallbackModules(course.modules, course.title);
  const completedCount = modules.filter((m) => m.completed).length;
  const progress = isEnrolled ? modules.length > 0 ? Math.floor(completedCount / modules.length * 100) : 0 : 0;
  const uildProgram = (detailCourse == null ? void 0 : detailCourse.uilProgram) ?? (detailCourse == null ? void 0 : detailCourse.cteProgram) ?? null;
  const catStyle = CATEGORY_STYLES[course.category] ?? {
    label: course.category,
    classes: "border-white/10 bg-white/5 text-foreground/40"
  };
  const handleEnroll = async () => {
    if (isLocked || isEnrolled) return;
    const result = await enroll(course.id);
    if (result == null ? void 0 : result.firstModuleTitle) {
      ue.success(`Enrolled! First module: ${result.firstModuleTitle}`);
    } else {
      ue.success(`You're enrolled in ${course.title}!`);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", "data-ocid": "course_detail.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_oklch(0.86_0.18_85_/_0.05),_transparent_55%)]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-3xl px-5 sm:px-8 py-10 space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: -8 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.3 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": "course_detail.back_button",
              onClick: () => navigate({ to: "/collegium" }),
              className: "inline-flex items-center gap-2 text-foreground/50 hover:text-foreground/80 text-sm font-mono font-bold uppercase tracking-widest transition-colors duration-200",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }),
                "Collegium"
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -13 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4 },
          "data-ocid": "course_detail.hero_card",
          className: "backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-[34px] space-y-5",
          style: { boxShadow: "0 0 34px rgba(0,210,255,0.07)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] font-bold uppercase tracking-widest text-foreground/30", children: [
                  "Course ",
                  String(course.order).padStart(2, "0")
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h1",
                  {
                    className: "font-display font-black text-3xl sm:text-4xl leading-tight",
                    style: {
                      background: "linear-gradient(135deg, oklch(0.95 0.05 90), oklch(0.86 0.18 85), oklch(0.78 0.22 60))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text"
                    },
                    children: course.title
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: `text-[11px] font-mono ${catStyle.classes}`,
                  children: catStyle.label
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/60 text-base leading-relaxed", children: course.description }),
            (uildProgram || (lastEnrollmentResult == null ? void 0 : lastEnrollmentResult.eddiBrief)) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/40 text-sm italic border-l-2 border-amber-400/30 pl-4", children: (lastEnrollmentResult == null ? void 0 : lastEnrollmentResult.eddiBrief) || uildProgram }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 text-xs font-mono text-foreground/40 bg-white/5 border border-white/10 rounded-full px-4 py-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3.5 w-3.5" }),
                course.modules,
                " modules"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 text-xs font-mono text-foreground/40 bg-white/5 border border-white/10 rounded-full px-4 py-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3.5 w-3.5" }),
                "SSS ≥ ",
                course.requiredSssThreshold,
                " to unlock"
              ] })
            ] })
          ]
        }
      ),
      isLocked && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.97 },
          animate: { opacity: 1, scale: 1 },
          transition: { delay: 0.15, duration: 0.35 },
          "data-ocid": "course_detail.locked_state",
          className: "backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-[34px] flex flex-col items-center text-center gap-5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 bg-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-7 w-7 text-foreground/30" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-lg text-foreground/70", children: "Course Locked" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground/40 text-sm", children: [
                "Reach",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "font-bold",
                    style: { color: "oklch(0.86 0.18 85)" },
                    children: [
                      "SSS ",
                      course.requiredSssThreshold
                    ]
                  }
                ),
                " ",
                "to unlock this course. Your current score:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground/60", children: sssScore })
              ] })
            ] })
          ]
        }
      ),
      !isLocked && !isEnrolled && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.15, duration: 0.35 },
          "data-ocid": "course_detail.enroll_section",
          className: "backdrop-blur-md bg-white/5 border border-amber-400/20 rounded-2xl p-[21px] flex flex-col sm:flex-row items-center justify-between gap-5",
          style: { boxShadow: "0 0 21px rgba(245,158,11,0.08)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(EddiOrb, { mode: "BUILD", size: "sm" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground", children: "Ready to begin?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/50 text-sm", children: "EDDI will guide you through every module." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                onClick: handleEnroll,
                disabled: isEnrolling,
                "data-ocid": "course_detail.enroll_button",
                className: "shrink-0 gap-2 font-bold border border-amber-400/30 bg-amber-400/10 text-amber-300 hover:bg-amber-400/20 transition-colors",
                variant: "outline",
                children: [
                  isEnrolling ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
                  isEnrolling ? "Enrolling…" : "Start This Course"
                ]
              }
            )
          ]
        }
      ),
      isEnrolled && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.15, duration: 0.35 },
          "data-ocid": "course_detail.progress_section",
          className: "backdrop-blur-md bg-white/5 border border-emerald-400/20 rounded-2xl p-[21px] space-y-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-emerald-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs font-bold text-emerald-400 uppercase tracking-widest", children: "Enrolled" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-foreground/40", children: [
                progress,
                "% complete"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full rounded-full bg-white/5 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { width: 0 },
                animate: { width: `${progress}%` },
                transition: { duration: 0.6, ease: "easeOut" },
                className: "h-full rounded-full",
                style: {
                  background: "linear-gradient(90deg, oklch(0.86 0.18 85), oklch(0.78 0.22 60))"
                }
              }
            ) })
          ]
        }
      ),
      !isLocked && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 13 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.2, duration: 0.4 },
          "data-ocid": "course_detail.modules_section",
          className: "space-y-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-mono text-xs font-bold text-foreground/40 uppercase tracking-widest px-1", children: "Modules" }),
            detailLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(ModuleSkeletons, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: modules.map((mod, i) => {
              const isFirst = i === 0 && isEnrolled;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 10 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: i * 0.05, duration: 0.3 },
                  "data-ocid": `course_detail.module.${mod.index}`,
                  className: "backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between gap-4",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: `w-10 h-10 shrink-0 rounded-xl flex items-center justify-center border ${mod.completed ? "border-emerald-400/30 bg-emerald-400/10" : isFirst ? "border-amber-400/30 bg-amber-400/10" : "border-white/10 bg-white/5"}`,
                          children: mod.completed ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-emerald-400" }) : isEnrolled ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                            BookOpen,
                            {
                              className: `h-4 w-4 ${isFirst ? "text-amber-400" : "text-foreground/30"}`
                            }
                          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4 text-foreground/20" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: `font-display font-semibold text-sm truncate ${mod.completed ? "text-emerald-400" : isFirst ? "text-foreground" : "text-foreground/50"}`,
                            children: mod.title
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-[10px] text-foreground/30 uppercase tracking-wider", children: [
                          "Module ",
                          mod.index,
                          " of ",
                          modules.length
                        ] })
                      ] })
                    ] }),
                    isEnrolled && !mod.completed && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        size: "sm",
                        variant: "outline",
                        "data-ocid": `course_detail.module_button.${mod.index}`,
                        onClick: () => ue.info(
                          `Module ${mod.index} — EDDI guidance coming soon`
                        ),
                        className: `shrink-0 text-xs font-mono gap-1.5 ${isFirst ? "border-amber-400/30 bg-amber-400/10 text-amber-300 hover:bg-amber-400/20" : "border-white/10 bg-white/5 text-foreground/40 hover:bg-white/10"}`,
                        children: isFirst ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
                          "Start"
                        ] }) : "Complete Module"
                      }
                    )
                  ]
                },
                `module-${mod.index}`
              );
            }) })
          ]
        }
      )
    ] })
  ] });
}
export {
  CourseDetail as default
};
