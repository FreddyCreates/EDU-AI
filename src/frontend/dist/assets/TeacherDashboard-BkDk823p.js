import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { E as EddiOrb } from "./EddiOrb-BVFxfmXd.js";
import { i as createLucideIcon, S as Skeleton, b as Star, U as Users, B as BookOpen, z as MobileNav } from "./index-BivnQ6bB.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { B as Button } from "./button-CWs7EcLL.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, e as DialogFooter } from "./dialog-B3hkAdZ4.js";
import { T as Textarea } from "./textarea-B0lupW8l.js";
import { c as useAllRecognitionFlags, e as useSubmitNomination } from "./use-recognition-CcUiZsvr.js";
import { a as useTchrStats, b as useClassesByTeacher } from "./use-tchr-C8OkG62o.js";
import { g as useLocation, d as useNavigate } from "./router-D6GUppNf.js";
import { C as CircleCheckBig } from "./circle-check-big-DngI0fNm.js";
import { T as TrendingUp } from "./trending-up-CpgQ7qb4.js";
import { T as TriangleAlert } from "./triangle-alert-DEqO8oET.js";
import { C as ChevronRight } from "./chevron-right-neFioPkE.js";
import "./motion-BK2wxCtX.js";
import "./query-8urnerR0.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./index-Dla_9Jug.js";
import "./index-BXiroDnN.js";
import "./index-D7KnjD29.js";
import "./index-DD4zw4TC.js";
import "./index-BfPMFYr5.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
];
const Bell = createLucideIcon("bell", __iconNode);
const PROGRAMS = ["NSHSS", "UIL", "AMC", "JSHS"];
function NominationModal({
  target,
  onClose
}) {
  const [step, setStep] = reactExports.useState(1);
  const [program, setProgram] = reactExports.useState(null);
  const [note, setNote] = reactExports.useState("");
  const submitNomination = useSubmitNomination();
  function handleSubmit() {
    if (!program) return;
    submitNomination.mutate(
      { studentId: target.flagId, programName: program, teacherNote: note },
      { onSuccess: onClose }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: () => onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-md border border-violet-500/40",
      style: {
        background: "rgba(15,10,30,0.92)",
        backdropFilter: "blur(24px)"
      },
      "data-ocid": "nomination.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "text-violet-200 font-display", children: [
            "Nominate ",
            target.studentName
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Step ",
            step,
            " of 3 — ",
            target.subject,
            " · ",
            target.score,
            "% mastery"
          ] })
        ] }),
        step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 py-2", "data-ocid": "nomination.program_picker", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-violet-300 font-medium", children: "Select Program" }),
          PROGRAMS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": `nomination.program_option.${p.toLowerCase()}`,
              onClick: () => setProgram(p),
              className: `w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 ${program === p ? "border-violet-400 bg-violet-500/20 text-violet-100" : "border-violet-500/20 bg-white/5 text-muted-foreground hover:border-violet-400/40 hover:bg-white/10"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: p }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs ml-2 opacity-70", children: [
                  p === "NSHSS" && "National Society of High School Scholars",
                  p === "UIL" && "University Interscholastic League",
                  p === "AMC" && "American Mathematics Competition",
                  p === "JSHS" && "Junior Science & Humanities Symposium"
                ] })
              ]
            },
            p
          ))
        ] }),
        step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-violet-300 font-medium", children: "Teacher Note" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              "data-ocid": "nomination.note_textarea",
              placeholder: "Describe why this student stands out — their patterns, persistence, and strengths...",
              className: "min-h-[120px] border-violet-500/30 bg-white/5 text-foreground placeholder:text-muted-foreground resize-none",
              value: note,
              onChange: (e) => setNote(e.target.value)
            }
          )
        ] }),
        step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-4 space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-xl border border-violet-400/30 p-4",
              style: { background: "rgba(139,92,246,0.08)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-violet-400 uppercase tracking-widest mb-1", children: "Program" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-violet-200 font-semibold", children: program }),
                note && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-violet-400 uppercase tracking-widest mt-3 mb-1", children: "Note" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: note })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("blockquote", { className: "border-l-2 border-amber-400/60 pl-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm italic text-amber-300/90 leading-relaxed", children: "“Every student nominated through this system is seen the way Alfredo Medina Hernandez was seen — by a teacher who looked.”" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
          step > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              "data-ocid": "nomination.back_button",
              onClick: () => setStep((s) => s - 1),
              className: "text-muted-foreground",
              children: "Back"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              "data-ocid": "nomination.cancel_button",
              onClick: onClose,
              className: "text-muted-foreground",
              children: "Cancel"
            }
          ),
          step < 3 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              "data-ocid": "nomination.next_button",
              onClick: () => setStep((s) => s + 1),
              disabled: step === 1 && !program,
              className: "bg-violet-600 hover:bg-violet-500 text-white",
              children: "Next"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              "data-ocid": "nomination.submit_button",
              onClick: handleSubmit,
              disabled: submitNomination.isPending,
              className: "bg-violet-600 hover:bg-violet-500 text-white",
              children: submitNomination.isPending ? "Submitting..." : "Submit Nomination"
            }
          )
        ] })
      ]
    }
  ) });
}
function StatCard({
  label,
  value,
  icon: Icon,
  colorClass
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-2xl border border-violet-500/20 p-5 flex items-start gap-4",
      style: {
        background: "rgba(139,92,246,0.08)",
        backdropFilter: "blur(16px)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `rounded-xl p-2.5 ${colorClass}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground font-display", children: value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: label })
        ] })
      ]
    }
  );
}
function TeacherDashboard() {
  const location = useLocation();
  const teacherId = "teacher-1";
  const { data: flags = [], isLoading: flagsLoading } = useAllRecognitionFlags();
  const { data: stats, isLoading: statsLoading } = useTchrStats();
  const { data: classes = [], isLoading: classesLoading } = useClassesByTeacher(teacherId);
  const navigate = useNavigate();
  const [nominateTarget, setNominateTarget] = reactExports.useState(
    null
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen pb-24",
      style: {
        background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139,92,246,0.15) 0%, transparent 70%), #0a0614"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "sticky top-0 z-30 border-b border-violet-500/20",
            style: {
              background: "rgba(10,6,20,0.85)",
              backdropFilter: "blur(20px)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-5 py-4 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(EddiOrb, { mode: "EXPLAIN", size: "sm", label: "EDDI Teacher Mode" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-violet-100 font-display", children: "Teacher Dashboard" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "EDDI Teacher Mode · Live Intelligence Active" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-violet-500/20 text-violet-300 border-violet-500/30 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-violet-400 mr-1.5 animate-pulse inline-block" }),
                "Live"
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-5 py-6 space-y-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "backdrop-blur-md bg-white/5 border border-white/10 border-l-4 border-l-amber-400/60 rounded-xl p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-amber-300 font-semibold text-sm uppercase tracking-wider mb-3", children: "Today's Intelligence" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-xs mb-2", children: "Needs Attention" }),
                ["Rivera, M.", "Johnson, K.", "Patel, S."].map((name) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 py-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-red-400" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/70 text-sm", children: name })
                ] }, name))
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-xs mb-2", children: "Accelerating" }),
                ["Kim, J.", "Davis, A.", "Torres, L."].map((name) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 py-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-teal-400" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/70 text-sm", children: name })
                ] }, name))
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "recognition.section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 text-amber-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-amber-300 uppercase tracking-widest", children: "Recognition Alerts" }),
              flags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs ml-auto", children: [
                flags.length,
                " flagged"
              ] })
            ] }),
            flagsLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "recognition.loading_state", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-2xl" }, i)) }),
            !flagsLoading && flags.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-2xl border border-violet-500/20 p-6 text-center",
                style: { background: "rgba(139,92,246,0.04)" },
                "data-ocid": "recognition.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-8 h-8 text-violet-500/50 mx-auto mb-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No recognition flags at this time" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: flags.map((flag, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": `recognition.item.${i + 1}`,
                className: "rounded-2xl border border-violet-500/30 p-4 flex items-center justify-between gap-4",
                style: {
                  background: "rgba(139,92,246,0.08)",
                  backdropFilter: "blur(12px)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-5 h-5 text-amber-400" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground truncate", children: `Student (${String(flag.studentId).slice(0, 8)}...)` }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                        flag.subject ?? "Mathematics",
                        " ·",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-violet-400 font-medium", children: [
                          Number(flag.masteryScore),
                          "%"
                        ] }),
                        " ",
                        "mastery"
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      size: "sm",
                      "data-ocid": `recognition.nominate_button.${i + 1}`,
                      onClick: () => setNominateTarget({
                        flagId: flag.studentId,
                        studentName: `Student (${String(flag.studentId).slice(0, 8)}...)`,
                        subject: flag.subject ?? "Mathematics",
                        score: Number(flag.masteryScore)
                      }),
                      className: "bg-violet-600 hover:bg-violet-500 text-white flex-shrink-0",
                      children: "Nominate"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => navigate({
                        to: "/nominations",
                        search: { studentId: String(flag.studentId) }
                      }),
                      className: "text-xs text-amber-300/70 hover:text-amber-300 underline underline-offset-2 transition-colors mt-1",
                      children: "Prepare Nomination →"
                    }
                  )
                ]
              },
              String(flag.studentId)
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "stats.section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-violet-400 uppercase tracking-widest mb-4", children: "Class Intelligence" }),
            statsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
                "data-ocid": "stats.loading_state",
                children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-2xl" }, i))
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatCard,
                {
                  label: "Total Classes",
                  value: (stats == null ? void 0 : stats.totalClasses) != null ? `${Number(stats.totalClasses)} classes` : "—",
                  icon: TrendingUp,
                  colorClass: "bg-violet-500/20 text-violet-400"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatCard,
                {
                  label: "Total Students",
                  value: (stats == null ? void 0 : stats.totalStudents) != null ? Number(stats.totalStudents) : "—",
                  icon: Users,
                  colorClass: "bg-emerald-500/20 text-emerald-400"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatCard,
                {
                  label: "Recommendations",
                  value: (stats == null ? void 0 : stats.recommendationsGenerated) != null ? Number(stats.recommendationsGenerated) : "—",
                  icon: TriangleAlert,
                  colorClass: "bg-amber-500/20 text-amber-400"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "classes.section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-violet-400 uppercase tracking-widest mb-4", children: "My Classes" }),
            classesLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "classes.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-2xl" }, i)) }),
            !classesLoading && classes.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-2xl border border-violet-500/20 p-6 text-center",
                "data-ocid": "classes.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-8 h-8 text-violet-500/50 mx-auto mb-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No classes assigned yet" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: classes.map((cls, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": `classes.item.${i + 1}`,
                className: "rounded-2xl border border-violet-500/20 p-4 flex items-center justify-between group hover:border-violet-400/40 transition-all duration-200 cursor-pointer",
                style: {
                  background: "rgba(139,92,246,0.07)",
                  backdropFilter: "blur(16px)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-violet-500/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4 text-violet-400" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: cls.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                        "Grade ",
                        cls.gradeLevel,
                        " · ",
                        cls.studentIds.length,
                        " students"
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground group-hover:text-violet-400 transition-colors duration-200" })
                ]
              },
              cls.id
            )) })
          ] })
        ] }),
        nominateTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(
          NominationModal,
          {
            target: nominateTarget,
            onClose: () => setNominateTarget(null)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MobileNav,
          {
            portal: "teacher",
            isActive: (to) => location.pathname === to
          }
        )
      ]
    }
  );
}
export {
  TeacherDashboard as default
};
