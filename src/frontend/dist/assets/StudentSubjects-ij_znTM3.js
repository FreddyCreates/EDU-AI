import { j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { S as Skeleton, b as Star, B as BookOpen } from "./index-BivnQ6bB.js";
import { u as useAllSubjects } from "./use-curriculum-D8crsBID.js";
import { u as useStudent } from "./use-student-czSOKqJy.js";
import { L as Link } from "./router-D6GUppNf.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { T as TrendingUp } from "./trending-up-CpgQ7qb4.js";
import { L as Lock } from "./lock-Cp-0nqtC.js";
import { C as ChevronRight } from "./chevron-right-neFioPkE.js";
import "./query-8urnerR0.js";
const CYAN = "oklch(0.78 0.22 200)";
const SUBJECT_META = {
  mathematics: { icon: "∑", masteryStatic: 82, locked: false },
  science: { icon: "🔬", masteryStatic: 71, locked: false },
  english: { icon: "📖", masteryStatic: 89, locked: false },
  history: { icon: "🏛", masteryStatic: 65, locked: false },
  geography: { icon: "🌍", masteryStatic: 58, locked: true },
  physics: { icon: "⚡", masteryStatic: 0, locked: true },
  chemistry: { icon: "🧪", masteryStatic: 0, locked: true },
  biology: { icon: "🧬", masteryStatic: 0, locked: true },
  algebra: { icon: "χ", masteryStatic: 0, locked: true },
  geometry: { icon: "△", masteryStatic: 0, locked: true },
  literature: { icon: "📚", masteryStatic: 0, locked: true },
  government: { icon: "⚖", masteryStatic: 0, locked: true }
};
const SUBJECT_WEEK_COUNTS = {
  mathematics: 34,
  science: 28,
  english: 42,
  history: 21,
  geography: 18,
  physics: 26,
  chemistry: 24,
  biology: 22,
  algebra: 20,
  geometry: 18,
  literature: 30,
  government: 16
};
const FALLBACK_SUBJECTS = [
  { id: "mathematics", name: "Mathematics", gradeLevel: "Grade 5" },
  { id: "science", name: "Science", gradeLevel: "Grade 5" },
  { id: "english", name: "English Language Arts", gradeLevel: "Grade 5" },
  { id: "history", name: "History", gradeLevel: "Grade 5" },
  { id: "geography", name: "Geography", gradeLevel: "Grade 5" },
  { id: "physics", name: "Physics", gradeLevel: "Grade 6" },
  { id: "chemistry", name: "Chemistry", gradeLevel: "Grade 6" },
  { id: "biology", name: "Biology", gradeLevel: "Grade 6" },
  { id: "algebra", name: "Algebra", gradeLevel: "Grade 7" },
  { id: "geometry", name: "Geometry", gradeLevel: "Grade 7" },
  { id: "literature", name: "Literature", gradeLevel: "Grade 8" },
  { id: "government", name: "Government", gradeLevel: "Grade 8" }
];
function SubjectGridCard({
  subject,
  index
}) {
  const meta = SUBJECT_META[subject.id] ?? {
    icon: "📘",
    masteryStatic: 0,
    locked: false
  };
  const mastery = meta.masteryStatic;
  const isLocked = meta.locked;
  const fibLocked = isLocked && mastery < 5;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      "data-ocid": `subjects.subject_card.${index}`,
      initial: { opacity: 0, y: 13 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: (index - 1) * 0.04 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: isLocked ? "/subjects" : "/study/$subjectId",
          params: { subjectId: subject.id },
          className: [
            "block rounded-2xl p-5 space-y-3 transition-smooth",
            isLocked ? "glass opacity-50 cursor-not-allowed" : "glass-max-student hover:scale-[1.02] hover:shadow-[0_0_32px_rgba(0,210,255,0.15)]"
          ].join(" "),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-11 w-11 rounded-xl flex items-center justify-center text-xl shrink-0",
                    style: {
                      background: isLocked ? "rgba(255,255,255,0.04)" : "rgba(0,210,255,0.1)",
                      border: `1px solid ${isLocked ? "rgba(255,255,255,0.08)" : "rgba(0,210,255,0.25)"}`
                    },
                    children: isLocked ? /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4 text-white/20" }) : meta.icon
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-white/90 leading-tight", children: subject.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-white/30 mt-0.5", children: [
                    SUBJECT_WEEK_COUNTS[subject.id] ?? 0,
                    " lessons"
                  ] })
                ] })
              ] }),
              !isLocked && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-white/20 shrink-0" })
            ] }),
            !isLocked && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono text-white/30 uppercase tracking-widest", children: "Mastery" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] font-mono text-white/20", children: [
                      "F⌊",
                      Math.round(mastery / 10),
                      "⌋"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "text-xs font-mono font-bold",
                        style: { color: CYAN },
                        children: [
                          mastery,
                          "%"
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full rounded-full bg-white/5 relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-full rounded-full transition-all duration-700",
                    style: {
                      width: `${mastery}%`,
                      background: `linear-gradient(90deg, ${CYAN} 0%, oklch(0.85 0.18 195) 100%)`,
                      boxShadow: "0 0 8px rgba(0,210,255,0.4)"
                    }
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-[10px] text-white/30", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-2.5 w-2.5" }),
                  mastery >= 80 ? "Advanced" : mastery >= 50 ? "Progressing" : "Beginner"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-2.5 w-2.5" }),
                  SUBJECT_WEEK_COUNTS[subject.id] ?? 0,
                  " weeks"
                ] })
              ] })
            ] }),
            fibLocked && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 rounded-lg border border-white/5 bg-white/3 px-2.5 py-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] text-white/30", children: "FIB LOCK · Mastery below F(5)=5" }) })
          ]
        }
      )
    }
  );
}
function StudentSubjects() {
  const { profile } = useStudent();
  const { data: liveSubjects, isLoading } = useAllSubjects();
  const gradeDisplay = (profile == null ? void 0 : profile.gradeLevel) ?? "";
  const subjects = liveSubjects && liveSubjects.length > 0 ? liveSubjects : FALLBACK_SUBJECTS;
  const unlockedCount = subjects.filter(
    (s) => {
      var _a;
      return !((_a = SUBJECT_META[s.id]) == null ? void 0 : _a.locked);
    }
  ).length;
  const fibFloor = (n) => {
    const fibs = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
    let best = 1;
    for (const f of fibs) {
      if (f <= n) best = f;
      else break;
    }
    return best;
  };
  const avgMastery = Math.round(
    subjects.filter((s) => {
      var _a;
      return !((_a = SUBJECT_META[s.id]) == null ? void 0 : _a.locked);
    }).reduce((sum, s) => {
      var _a;
      return sum + (((_a = SUBJECT_META[s.id]) == null ? void 0 : _a.masteryStatic) ?? 0);
    }, 0) / Math.max(1, unlockedCount)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "subjects.page",
      className: "portal-enter p-[21px] space-y-[21px]",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -8 },
            animate: { opacity: 1, y: 0 },
            className: "glass-portal-student rounded-2xl p-6 relative overflow-hidden",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-[rgba(0,210,255,0.07)] blur-3xl" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.22_200)] animate-pulse" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] font-bold uppercase tracking-widest text-[oklch(0.78_0.22_200)]", children: "STUDENT OS · SUBJECTS" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-black text-white/95", children: "All Subjects" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-white/50 mt-1", children: [
                    "12 sovereign subjects · Fibonacci-gated by mastery",
                    gradeDisplay ? ` · ${gradeDisplay}` : ""
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-max-student rounded-xl px-4 py-2.5 text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-black text-white/90", children: unlockedCount }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[9px] text-[oklch(0.78_0.22_200)] uppercase tracking-widest", children: "Unlocked" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl px-4 py-2.5 text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-black text-white/60", children: subjects.length - unlockedCount }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[9px] text-white/30 uppercase tracking-widest", children: "Locked" })
                  ] })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-4 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3.5 w-3.5 text-[oklch(0.78_0.22_200)]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono uppercase tracking-widest text-white/40", children: "Overall Progress" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] font-mono text-white/20", children: [
                "Φ⌊",
                fibFloor(avgMastery),
                "⌋"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "text-xs font-mono font-bold",
                  style: { color: CYAN },
                  children: [
                    avgMastery,
                    "% avg mastery"
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: subjects.map((s) => {
            const m = SUBJECT_META[s.id];
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex-1 h-2 rounded-full",
                style: {
                  background: (m == null ? void 0 : m.locked) ? "rgba(255,255,255,0.05)" : `oklch(0.78 0.22 200 / ${((m == null ? void 0 : m.masteryStatic) ?? 0) / 100})`,
                  boxShadow: (m == null ? void 0 : m.locked) ? "none" : `0 0 4px rgba(0,210,255,${((m == null ? void 0 : m.masteryStatic) ?? 0) / 200})`
                },
                title: s.name
              },
              s.id
            );
          }) })
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[13px]", children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-36 rounded-2xl" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[13px]",
            "data-ocid": "subjects.grid",
            children: subjects.map((subject, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SubjectGridCard, { subject, index: i + 1 }, subject.id))
          }
        )
      ]
    }
  );
}
export {
  StudentSubjects as default
};
