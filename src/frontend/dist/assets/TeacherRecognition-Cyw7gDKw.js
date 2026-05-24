import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { B as Button } from "./button-CWs7EcLL.js";
import { f as useActor, h as createActor, a as Award, S as Skeleton, b as Star, X, Z as Zap } from "./index-BivnQ6bB.js";
import { a as useQuery } from "./query-8urnerR0.js";
import { m as motion, A as AnimatePresence } from "./motion-BK2wxCtX.js";
import { C as ChevronRight } from "./chevron-right-neFioPkE.js";
import { T as Trophy } from "./trophy-WhoS-b_2.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./router-D6GUppNf.js";
function useRcgnAlerts() {
  const { actor, isFetching } = useActor(createActor);
  const result = useQuery({
    queryKey: ["rcgn-alerts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRcgnAlerts();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 3e4
  });
  return {
    data: result.data ?? [],
    isLoading: result.isLoading,
    error: result.error
  };
}
const ALERT_TYPE_CONFIG = {
  THRESHOLD_CROSSED: {
    label: "Threshold Crossed",
    color: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-3 h-3" })
  },
  MASTERY_STREAK: {
    label: "Mastery Streak",
    color: "bg-teal-500/20 text-teal-300 border-teal-500/30",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3 h-3" })
  },
  COMPETITION_READY: {
    label: "Competition Ready",
    color: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-3 h-3" })
  }
};
const PROGRAMS = [
  "NSHSS",
  "UIL Academic",
  "Skills USA",
  "National Merit",
  "DECA",
  "HOSA"
];
function NominationModal({
  target,
  onClose
}) {
  const [program, setProgram] = reactExports.useState(PROGRAMS[0]);
  const [note, setNote] = reactExports.useState("");
  const [submitted, setSubmitted] = reactExports.useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(onClose, 1800);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-5",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      "data-ocid": "recognition.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
            onClick: onClose,
            onKeyDown: (e) => e.key === "Enter" && onClose(),
            role: "button",
            tabIndex: 0,
            "aria-label": "Close dialog"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "relative w-full max-w-md rounded-2xl border border-amber-400/30 bg-black/70 backdrop-blur-xl p-6 shadow-2xl",
            initial: { scale: 0.92, y: 20 },
            animate: { scale: 1, y: 0 },
            exit: { scale: 0.92, y: 20 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors",
                  onClick: onClose,
                  "aria-label": "Close",
                  "data-ocid": "recognition.close_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
                }
              ),
              submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  className: "text-center py-6",
                  initial: { scale: 0.8, opacity: 0 },
                  animate: { scale: 1, opacity: 1 },
                  "data-ocid": "recognition.success_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-8 h-8 text-amber-400 fill-amber-400" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-amber-300", children: "Nomination Submitted!" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
                      target.studentName,
                      " has been nominated for ",
                      program,
                      "."
                    ] })
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-amber-300", children: "Nominate Student" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
                    "Complete the nomination for",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: target.studentName })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/10 bg-white/5 p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Student" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: target.studentName })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/10 bg-white/5 p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Subject" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: target.subject })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "nomination-program",
                      className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider",
                      children: "Program"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "select",
                    {
                      id: "nomination-program",
                      className: "w-full rounded-xl border border-white/10 bg-white/5 text-foreground px-3 py-2.5 text-sm backdrop-blur-sm focus:outline-none focus:border-amber-400/50",
                      value: program,
                      onChange: (e) => setProgram(e.target.value),
                      "data-ocid": "recognition.select",
                      children: PROGRAMS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p, className: "bg-background", children: p }, p))
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "nomination-note",
                      className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider",
                      children: "Teacher Note"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "textarea",
                    {
                      id: "nomination-note",
                      className: "w-full rounded-xl border border-white/10 bg-white/5 text-foreground px-3 py-2.5 text-sm backdrop-blur-sm focus:outline-none focus:border-amber-400/50 resize-none",
                      rows: 3,
                      placeholder: "Why is this student ready for nomination?",
                      value: note,
                      onChange: (e) => setNote(e.target.value),
                      "data-ocid": "recognition.textarea"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      className: "flex-1 border-white/10 text-muted-foreground hover:bg-white/5",
                      onClick: onClose,
                      "data-ocid": "recognition.cancel_button",
                      children: "Cancel"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      className: "flex-1 bg-amber-500/20 border border-amber-400/50 text-amber-300 hover:bg-amber-500/30",
                      "data-ocid": "recognition.submit_button",
                      children: "Submit Nomination"
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
function AlertCard({
  alert,
  index,
  onNominate
}) {
  const score = Number(alert.rcgnScore);
  const threshold = Number(alert.threshold);
  const pct = threshold > 0 ? Math.min(100, Math.round(score / threshold * 100)) : 0;
  const typeConfig = ALERT_TYPE_CONFIG[alert.alertType] ?? {
    label: alert.alertType,
    color: "bg-violet-500/20 text-violet-300 border-violet-500/30",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3" })
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 18 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.1, duration: 0.35, ease: "easeOut" },
      className: "rounded-2xl border border-amber-400/50 bg-amber-900/20 backdrop-blur-lg p-5 space-y-4",
      "data-ocid": `recognition.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-amber-300 leading-tight truncate", children: alert.studentName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1.5 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-white/10 text-foreground/80 border-white/10 text-xs", children: alert.subject }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  className: `${typeConfig.color} text-xs flex items-center gap-1`,
                  children: [
                    typeConfig.icon,
                    typeConfig.label
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-amber-400", children: [
              pct,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "of threshold" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "RCGN Score" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              score,
              " / ",
              threshold
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-white/10 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300",
              initial: { width: 0 },
              animate: { width: `${pct}%` },
              transition: {
                delay: index * 0.1 + 0.2,
                duration: 0.6,
                ease: "easeOut"
              }
            }
          ) })
        ] }),
        alert.nominationReady && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            className: "w-full animate-pulse border border-amber-400 bg-amber-500/10 text-amber-300 hover:bg-amber-500/25 hover:animate-none transition-all font-semibold",
            onClick: () => onNominate({
              studentName: alert.studentName,
              subject: alert.subject,
              alertType: alert.alertType
            }),
            "data-ocid": `recognition.nominate_button.${index + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 mr-2 fill-amber-400" }),
              "Nominate Now",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 ml-auto" })
            ]
          }
        )
      ]
    }
  );
}
function TeacherRecognition() {
  const { data: alerts, isLoading } = useRcgnAlerts();
  const [modalTarget, setModalTarget] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen",
      style: {
        background: "linear-gradient(135deg, #0a0a1a 0%, #0f0a1f 50%, #0a1a14 100%)"
      },
      "data-ocid": "recognition.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "sticky top-0 z-30 border-b border-white/10 backdrop-blur-xl px-5 py-4",
            style: { background: "rgba(10,10,26,0.85)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-5 h-5 text-amber-400" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold text-foreground leading-tight", children: "Recognition Engine" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-400/80 font-medium", children: "Students ready for nomination" })
              ] }),
              alerts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-amber-500/20 text-amber-300 border-amber-500/30 ml-auto flex-shrink-0", children: [
                alerts.length,
                " alert",
                alerts.length !== 1 ? "s" : ""
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-5 py-6 space-y-4", children: [
          isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "recognition.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-44 rounded-2xl" }, i)) }),
          !isLoading && alerts.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              className: "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-10 text-center",
              "data-ocid": "recognition.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-amber-500/10 border border-amber-400/20 flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-8 h-8 text-amber-400/50" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-semibold text-foreground/80", children: "No recognition alerts yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1.5 max-w-xs mx-auto", children: "Your students are building their mastery. Recognition alerts will appear here as they reach key thresholds." })
              ]
            }
          ),
          !isLoading && alerts.map((alert, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            AlertCard,
            {
              alert,
              index: i,
              onNominate: setModalTarget
            },
            `${alert.studentId}-${i}`
          ))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: modalTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(
          NominationModal,
          {
            target: modalTarget,
            onClose: () => setModalTarget(null)
          }
        ) })
      ]
    }
  );
}
export {
  TeacherRecognition as default
};
