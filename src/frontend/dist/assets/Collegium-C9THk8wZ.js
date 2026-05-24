import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { E as EddiOrb } from "./EddiOrb-BVFxfmXd.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { B as Button } from "./button-CWs7EcLL.js";
import { u as useEnrollInCourse, a as useCourses, b as useUserAgents, L as LoaderCircle } from "./use-university-Qtx5aNSN.js";
import { d as useNavigate } from "./router-D6GUppNf.js";
import { i as createLucideIcon, B as BookOpen, Z as Zap, u as ue } from "./index-BivnQ6bB.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { L as Lock } from "./lock-Cp-0nqtC.js";
import { C as CircleCheck } from "./circle-check-Bol12715.js";
import { S as Sparkles } from "./sparkles-C3IEEH24.js";
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
      d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",
      key: "m3kijz"
    }
  ],
  [
    "path",
    {
      d: "m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",
      key: "1fmvmk"
    }
  ],
  ["path", { d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0", key: "1f8sc4" }],
  ["path", { d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5", key: "qeys4" }]
];
const Rocket = createLucideIcon("rocket", __iconNode);
const FILTER_TABS = [
  { key: "ALL", label: "All" },
  { key: "UIL_ACADEMIC", label: "UIL Academics" },
  { key: "UIL_CTE", label: "CTE" },
  { key: "MUSIC", label: "Music" },
  { key: "ATHLETICS", label: "Athletics" }
];
function CourseCard({
  course,
  isEnrolled,
  enrollingId,
  onEnroll
}) {
  const isEnrolling = enrollingId === course.id;
  const handleEnroll = () => {
    if (course.locked || isEnrolled) return;
    onEnroll(course.id);
    ue.success(`Enrolling in ${course.title}…`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `collegium.course_card.${course.order}`,
      className: "backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4 hover:border-white/20 hover:-translate-y-0.5 transition-all duration-200",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] font-bold uppercase tracking-widest text-foreground/30", children: [
            "Course ",
            course.order.toString().padStart(2, "0")
          ] }),
          course.locked ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "outline",
              className: "text-[10px] font-mono border-white/10 text-foreground/40 bg-white/5 gap-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-2.5 w-2.5" }),
                "Locked · SSS≥",
                course.requiredSss
              ]
            }
          ) : isEnrolled ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "outline",
              className: "text-[10px] font-mono border-emerald-500/30 bg-emerald-500/10 text-emerald-400 gap-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-2.5 w-2.5" }),
                "Enrolled"
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "text-[10px] font-mono border-amber-400/30 bg-amber-400/10 text-amber-400",
              children: "Open"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h3",
          {
            className: "font-display font-bold text-base leading-tight",
            style: {
              background: "linear-gradient(135deg, oklch(0.86 0.18 85), oklch(0.78 0.22 60))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            },
            children: course.title
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/60 leading-relaxed flex-1", children: course.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 flex-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-xs font-mono text-foreground/40 backdrop-blur-md bg-white/5 border border-white/10 rounded-full px-3 py-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3 w-3" }),
          course.modules,
          " modules"
        ] }) }),
        !course.locked && !isEnrolled && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "sm",
            onClick: handleEnroll,
            disabled: isEnrolling,
            "data-ocid": `collegium.enroll_button.${course.order}`,
            className: "w-full gap-2 font-bold border border-amber-400/30 bg-amber-400/10 text-amber-300 hover:bg-amber-400/20 transition-colors",
            variant: "outline",
            children: [
              isEnrolling ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
              isEnrolling ? "Enrolling…" : "Enroll Now"
            ]
          }
        )
      ]
    }
  );
}
function Collegium() {
  const navigate = useNavigate();
  const { courses } = useCourses();
  const { enroll, enrollingId, enrolledIds } = useEnrollInCourse();
  const { agents } = useUserAgents();
  const [activeFilter, setActiveFilter] = reactExports.useState("ALL");
  const filteredCourses = activeFilter === "ALL" ? courses : courses.filter((c) => c.category === activeFilter);
  const handleEnroll = async (courseId) => {
    await enroll(courseId);
    navigate({ to: `/collegium/${courseId}` });
  };
  const HOW_IT_WORKS = [
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-5 w-5" }),
      step: "01",
      title: "Enroll",
      desc: "Choose a course and lock in your sovereign learning path. EDDI guides every module."
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-5 w-5" }),
      step: "02",
      title: "Build",
      desc: "Complete modules to raise your SSS score. Unlock locked courses as your intelligence compounds."
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { className: "h-5 w-5" }),
      step: "03",
      title: "Deploy",
      desc: "Graduate with a sovereign agent sealed to your passport — yours forever, never rented."
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", "data-ocid": "collegium.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative overflow-hidden border-b border-white/5",
        "data-ocid": "collegium.hero_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_oklch(0.86_0.18_85_/_0.06),_transparent_60%)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_oklch(0.55_0.25_280_/_0.05),_transparent_60%)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-5xl px-4 sm:px-6 py-20 sm:py-28 flex flex-col items-center text-center gap-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: -8 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5 },
                className: "inline-flex items-center gap-2 backdrop-blur-md bg-white/5 border border-white/10 rounded-full px-4 py-1.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] font-bold uppercase tracking-widest text-amber-400", children: "UNIVERSITAS-SOVEREIGN" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.85 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.6, delay: 0.1 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(EddiOrb, { mode: "BUILD", size: "lg" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.2 },
                className: "space-y-4",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h1",
                    {
                      className: "font-display font-black text-4xl sm:text-6xl leading-tight",
                      style: {
                        background: "linear-gradient(135deg, oklch(0.95 0.05 90), oklch(0.86 0.18 85), oklch(0.78 0.22 60))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text"
                      },
                      children: "Agent University"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/60 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed", children: "Build sovereign AI with EDDI as your guide" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 8 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.35 },
                className: "flex items-center gap-8",
                children: [
                  { value: "8", label: "Courses" },
                  { value: "PHI", label: "Gated" },
                  { value: "∞", label: "Sovereign" }
                ].map(({ value, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-display font-black text-2xl",
                      style: { color: "oklch(0.86 0.18 85)" },
                      children: value
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-widest text-foreground/40", children: label })
                ] }, label))
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "relative py-16 sm:py-24",
        "data-ocid": "collegium.courses_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 space-y-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "text-center space-y-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl sm:text-3xl text-foreground", children: "The Curriculum" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/50 text-sm", children: "8 PHI-gated courses. Each unlocks deeper intelligence." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex flex-wrap gap-2 justify-center",
                "data-ocid": "collegium.category_filter",
                children: FILTER_TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": `collegium.filter_tab.${tab.key.toLowerCase()}`,
                    onClick: () => setActiveFilter(tab.key),
                    className: `px-4 py-1.5 rounded-full font-mono text-[11px] font-bold uppercase tracking-widest border transition-all duration-200 ${activeFilter === tab.key ? "border-amber-400/50 bg-amber-400/15 text-amber-300" : "border-white/10 bg-white/5 text-foreground/40 hover:border-white/20 hover:text-foreground/60"}`,
                    children: tab.label
                  },
                  tab.key
                ))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5", children: filteredCourses.map((course, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { delay: i * 0.07, duration: 0.4 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CourseCard,
                  {
                    course,
                    isEnrolled: enrolledIds.includes(course.id),
                    enrollingId,
                    onEnroll: handleEnroll
                  }
                )
              },
              course.id
            )) })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "relative py-16 border-t border-white/5",
        style: { background: "oklch(0.12 0.02 280 / 0.5)" },
        "data-ocid": "collegium.agents_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-4 sm:px-6 space-y-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "text-center space-y-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl sm:text-3xl text-foreground", children: "Your Agents" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/50 text-sm", children: "Agents you build are yours forever — sealed to your passport." })
              ]
            }
          ),
          agents.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.95 },
              whileInView: { opacity: 1, scale: 1 },
              viewport: { once: true },
              "data-ocid": "collegium.agents_empty_state",
              className: "flex flex-col items-center gap-5 py-14 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(EddiOrb, { mode: "BUILD", size: "sm" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/60 text-sm font-medium", children: "Complete a course to build your first agent" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/30 text-xs font-mono", children: "EDDI will guide you through every module" })
                ] })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: agents.map(
            (agent, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 16 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { delay: i * 0.08 },
                "data-ocid": `collegium.agent_card.${i + 1}`,
                className: "backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground", children: agent.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-foreground/40", children: agent.mode })
                ]
              },
              agent.id
            )
          ) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "relative py-16 sm:py-24 border-t border-white/5",
        "data-ocid": "collegium.how_it_works_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-4 sm:px-6 space-y-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "text-center space-y-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl sm:text-3xl text-foreground", children: "How It Works" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/50 text-sm", children: "Three sovereign steps from enrollment to deployment." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-5", children: HOW_IT_WORKS.map(({ icon, step, title, desc }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.1, duration: 0.4 },
              "data-ocid": `collegium.how_step.${i + 1}`,
              className: "backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-2xl flex items-center justify-center border border-amber-400/20 bg-amber-400/10 text-amber-400", children: icon }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs font-bold text-foreground/30", children: [
                    "STEP ",
                    step
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground", children: title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/60 leading-relaxed", children: desc })
              ]
            },
            step
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "footer",
      {
        className: "border-t border-white/5 py-10",
        style: { background: "oklch(0.10 0.02 280 / 0.8)" },
        "data-ocid": "collegium.footer",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-mono text-sm font-bold text-center sm:text-left",
              style: { color: "oklch(0.86 0.18 85)" },
              children: "All knowledge is sovereign. All agents are yours."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-mono text-foreground/30", children: [
            "© ",
            (/* @__PURE__ */ new Date()).getFullYear(),
            ". Built with love using",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "underline hover:text-foreground/60 transition-colors",
                children: "caffeine.ai"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  Collegium as default
};
