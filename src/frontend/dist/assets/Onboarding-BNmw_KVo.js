import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { B as Button } from "./button-CWs7EcLL.js";
import { I as Input } from "./input-dqEl3BdT.js";
import { L as Label } from "./label-CpNG7Eze.js";
import { S as Skeleton, u as ue } from "./index-BivnQ6bB.js";
import { u as useStudent } from "./use-student-czSOKqJy.js";
import { d as useNavigate } from "./router-D6GUppNf.js";
import { m as motion, A as AnimatePresence } from "./motion-BK2wxCtX.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./query-8urnerR0.js";
const GRADE_LEVELS = [
  { value: "kindergarten", label: "Kindergarten", emoji: "🌱", short: "K" },
  { value: "grade_1", label: "Grade 1", emoji: "⭐", short: "1" },
  { value: "grade_2", label: "Grade 2", emoji: "📚", short: "2" },
  { value: "grade_3", label: "Grade 3", emoji: "✏️", short: "3" },
  { value: "grade_4", label: "Grade 4", emoji: "🔬", short: "4" },
  { value: "grade_5", label: "Grade 5", emoji: "🎨", short: "5" },
  { value: "grade_6", label: "Grade 6", emoji: "🧮", short: "6" },
  { value: "grade_7", label: "Grade 7", emoji: "🌍", short: "7" },
  { value: "grade_8", label: "Grade 8", emoji: "⚗️", short: "8" },
  { value: "grade_9", label: "Grade 9", emoji: "🏛️", short: "9" },
  { value: "grade_10", label: "Grade 10", emoji: "📐", short: "10" },
  { value: "grade_11", label: "Grade 11", emoji: "🔭", short: "11" },
  { value: "grade_12", label: "Grade 12", emoji: "🎓", short: "12" }
];
function Onboarding() {
  var _a, _b;
  const navigate = useNavigate();
  const { profile, isLoading, createProfile } = useStudent();
  const [step, setStep] = reactExports.useState(0);
  const [name, setName] = reactExports.useState("");
  const [gradeLevel, setGradeLevel] = reactExports.useState("");
  const [nameError, setNameError] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (!isLoading && profile) navigate({ to: "/dashboard" });
  }, [profile, isLoading, navigate]);
  const validateName = (val) => {
    if (!val.trim()) return "Please enter your name.";
    if (val.trim().length > 50) return "Name must be 50 characters or fewer.";
    return "";
  };
  const handleNameContinue = () => {
    const err = validateName(name);
    if (err) {
      setNameError(err);
      return;
    }
    setNameError("");
    setStep(2);
  };
  const handleSubmit = async () => {
    if (!gradeLevel) {
      ue.error("Please select your grade level.");
      return;
    }
    try {
      await createProfile.mutateAsync({ name: name.trim(), gradeLevel });
      ue.success(`Welcome, ${name.trim()}! Let's start learning!`);
      navigate({ to: "/dashboard" });
    } catch {
      ue.error("Something went wrong. Please try again.");
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "w-full max-w-md space-y-4",
        "data-ocid": "onboarding.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-3/4 mx-auto rounded-2xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-1/2 mx-auto rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full rounded-2xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-2xl" })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "onboarding.page",
      className: "portal-enter min-h-screen flex items-center justify-center p-4 relative overflow-hidden",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none fixed inset-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/4 left-1/3 h-96 w-96 rounded-full bg-[rgba(0,210,255,0.04)] blur-3xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-[rgba(160,100,255,0.04)] blur-3xl" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-lg relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: -16 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5 },
              className: "text-center mb-8",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 glass-portal-student rounded-full px-4 py-1.5 mb-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.22_200)] animate-pulse" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] font-bold uppercase tracking-widest text-[oklch(0.78_0.22_200)]", children: "STUDENT OS · ONBOARDING" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl md:text-4xl font-black text-foreground leading-tight", children: [
                  "Welcome to",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[oklch(0.78_0.22_200)]", children: "EduAI" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-foreground/50 text-sm", children: "Your personal sovereign AI study companion — K through 12, forever." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 0.1 },
              className: "glass-xl rounded-3xl overflow-hidden",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-full bg-gradient-to-r from-[oklch(0.78_0.22_200)] via-violet-500 to-[oklch(0.78_0.22_200)]/40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 md:p-8", children: [
                  step > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-6", children: [
                    [1, 2].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: `w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-smooth ${step >= s ? "bg-[oklch(0.78_0.22_200)] text-[oklch(0.07_0.01_260)] shadow-[0_0_12px_rgba(0,210,255,0.4)]" : "bg-[rgba(255,255,255,0.06)] text-foreground/30"}`,
                          children: step > s ? "✓" : s
                        }
                      ),
                      s < 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: `h-0.5 w-12 transition-smooth ${step > s ? "bg-[oklch(0.78_0.22_200)]/60" : "bg-[rgba(255,255,255,0.06)]"}`
                        }
                      )
                    ] }, s)),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-[10px] text-foreground/30 font-mono", children: [
                      "Step ",
                      step,
                      " of 2"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
                    step === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        initial: { opacity: 0 },
                        animate: { opacity: 1 },
                        exit: { opacity: 0 },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-6", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl", children: "🎓" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold font-display text-foreground", children: "Begin Your Journey" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/50 text-sm max-w-md mx-auto leading-relaxed", children: "A sovereign learning companion built to grow with you from kindergarten through graduation." }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 my-6", children: [
                            { emoji: "🧠", label: "Adaptive AI" },
                            { emoji: "🔒", label: "100% Private" },
                            { emoji: "🎓", label: "K–12 Ready" }
                          ].map(({ emoji, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              className: "glass-sm rounded-2xl p-4 text-center border border-[rgba(0,210,255,0.1)]",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl mb-2", children: emoji }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-foreground/70", children: label })
                              ]
                            },
                            label
                          )) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Button,
                            {
                              size: "lg",
                              type: "button",
                              onClick: () => setStep(1),
                              className: "w-full max-w-sm rounded-2xl bg-[oklch(0.78_0.22_200)] text-[oklch(0.07_0.01_260)] hover:opacity-90 font-bold shadow-[0_0_24px_rgba(0,210,255,0.25)]",
                              "data-ocid": "onboarding.get_started_button",
                              children: "Get Started"
                            }
                          )
                        ] })
                      },
                      "step-0"
                    ),
                    step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.div,
                      {
                        initial: { opacity: 0, x: 20 },
                        animate: { opacity: 1, x: 0 },
                        exit: { opacity: 0, x: -20 },
                        transition: { duration: 0.25 },
                        className: "space-y-5",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "What's your name?" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/40 mt-1", children: "This is how your AI guides will greet you." })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Label,
                              {
                                htmlFor: "student-name",
                                className: "font-medium text-foreground/70 text-sm",
                                children: "Your Name"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Input,
                              {
                                id: "student-name",
                                "data-ocid": "onboarding.name_input",
                                placeholder: "e.g. Alex, Jordan, Maya…",
                                value: name,
                                maxLength: 50,
                                onChange: (e) => {
                                  setName(e.target.value);
                                  if (nameError)
                                    setNameError(validateName(e.target.value));
                                },
                                onKeyDown: (e) => e.key === "Enter" && handleNameContinue(),
                                className: "h-12 text-base bg-[rgba(0,210,255,0.04)] border-[rgba(0,210,255,0.2)] focus-visible:ring-[oklch(0.78_0.22_200)] focus-visible:border-[oklch(0.78_0.22_200)] rounded-2xl transition-glass",
                                autoFocus: true,
                                autoComplete: "given-name"
                              }
                            ),
                            nameError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                "data-ocid": "onboarding.name_field_error",
                                className: "text-sm text-destructive",
                                children: nameError
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-foreground/25 text-right font-mono", children: [
                              name.length,
                              "/50"
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Button,
                            {
                              type: "button",
                              "data-ocid": "onboarding.continue_button",
                              className: "w-full h-12 font-bold text-base rounded-2xl bg-[oklch(0.78_0.22_200)] text-[oklch(0.07_0.01_260)] hover:opacity-90 shadow-[0_0_16px_rgba(0,210,255,0.2)]",
                              onClick: handleNameContinue,
                              children: "Continue →"
                            }
                          )
                        ]
                      },
                      "step1"
                    ),
                    step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.div,
                      {
                        initial: { opacity: 0, x: 20 },
                        animate: { opacity: 1, x: 0 },
                        exit: { opacity: 0, x: -20 },
                        transition: { duration: 0.25 },
                        className: "space-y-5",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-bold text-foreground", children: [
                              "Hi",
                              name ? `, ${name.trim()}` : "",
                              "! What grade are you in?"
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/40 mt-1", children: "We’ll load the right curriculum just for you." })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              "data-ocid": "onboarding.grade_selector",
                              className: "grid grid-cols-4 sm:grid-cols-5 gap-2",
                              children: GRADE_LEVELS.map((grade) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "button",
                                {
                                  type: "button",
                                  "data-ocid": `onboarding.grade.${grade.short.toLowerCase()}`,
                                  onClick: () => setGradeLevel(grade.value),
                                  "aria-pressed": gradeLevel === grade.value,
                                  "aria-label": grade.label,
                                  className: `flex flex-col items-center gap-1 p-2.5 rounded-2xl border text-center transition-glass cursor-pointer ${gradeLevel === grade.value ? "glass-portal-student border-[rgba(0,210,255,0.4)] shadow-[0_0_12px_rgba(0,210,255,0.2)]" : "glass-sm border-[rgba(255,255,255,0.06)] hover:border-[rgba(0,210,255,0.2)] hover:bg-[rgba(0,210,255,0.04)]"}`,
                                  children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg leading-none", children: grade.emoji }),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "span",
                                      {
                                        className: `text-xs font-bold font-mono leading-tight ${gradeLevel === grade.value ? "text-[oklch(0.78_0.22_200)]" : "text-foreground/50"}`,
                                        children: grade.short
                                      }
                                    )
                                  ]
                                },
                                grade.value
                              ))
                            }
                          ),
                          gradeLevel && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            motion.div,
                            {
                              initial: { opacity: 0, y: 6 },
                              animate: { opacity: 1, y: 0 },
                              className: "flex items-center gap-2 glass-portal-student rounded-2xl px-3 py-2",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: (_a = GRADE_LEVELS.find((g) => g.value === gradeLevel)) == null ? void 0 : _a.emoji }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-[oklch(0.78_0.22_200)]", children: [
                                  (_b = GRADE_LEVELS.find((g) => g.value === gradeLevel)) == null ? void 0 : _b.label,
                                  " ",
                                  "selected"
                                ] })
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Button,
                              {
                                type: "button",
                                variant: "outline",
                                "data-ocid": "onboarding.back_button",
                                className: "h-12 px-5 border-[rgba(255,255,255,0.1)] text-foreground/60 hover:text-foreground rounded-2xl",
                                onClick: () => setStep(1),
                                children: "← Back"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Button,
                              {
                                type: "button",
                                "data-ocid": "onboarding.submit_button",
                                disabled: !gradeLevel || createProfile.isPending,
                                className: "flex-1 h-12 font-bold text-base rounded-2xl bg-[oklch(0.78_0.22_200)] text-[oklch(0.07_0.01_260)] hover:opacity-90 disabled:opacity-40 shadow-[0_0_16px_rgba(0,210,255,0.2)]",
                                onClick: handleSubmit,
                                children: createProfile.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-[oklch(0.07_0.01_260)]/40 border-t-[oklch(0.07_0.01_260)] rounded-full animate-spin" }),
                                  "Setting up…"
                                ] }) : "🚀 Start Learning"
                              }
                            )
                          ] }),
                          createProfile.isError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              "data-ocid": "onboarding.error_state",
                              className: "text-sm text-destructive text-center",
                              children: "Something went wrong. Please try again."
                            }
                          )
                        ]
                      },
                      "step2"
                    )
                  ] })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.6 },
              className: "text-center text-xs text-foreground/25 mt-5 font-mono",
              children: "🔒 Sovereign · Private · Yours forever · No account required to start"
            }
          )
        ] })
      ]
    }
  );
}
export {
  Onboarding as default
};
