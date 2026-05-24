import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { B as Button } from "./button-CWs7EcLL.js";
import { L as Link } from "./router-D6GUppNf.js";
import { A as ArrowLeft } from "./arrow-left-DLov4c1N.js";
import { m as motion, A as AnimatePresence } from "./motion-BK2wxCtX.js";
import { k as Shield } from "./index-BivnQ6bB.js";
import { C as CircleCheck } from "./circle-check-Bol12715.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./query-8urnerR0.js";
const moodLabels = {
  1: "Really struggling",
  2: "Very low",
  3: "Low",
  4: "Below average",
  5: "Okay",
  6: "Neutral",
  7: "Decent",
  8: "Good",
  9: "Pretty good",
  10: "Great",
  11: "Very good",
  12: "Excellent",
  13: "At my best"
};
const moodColor = (score) => {
  if (score <= 4) return "oklch(0.65_0.22_30)";
  if (score <= 7) return "oklch(0.85_0.15_85)";
  if (score <= 10) return "oklch(0.7_0.18_150)";
  return "oklch(0.7_0.18_270)";
};
function MentalHealthCheckIn() {
  const [mood, setMood] = reactExports.useState(8);
  const [note, setNote] = reactExports.useState("");
  const [submitted, setSubmitted] = reactExports.useState(false);
  const handleSubmit = () => setSubmitted(true);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "student.mentalhealth.page",
      className: "min-h-screen bg-[oklch(0.08_0.02_265)] px-4 py-6 pb-24",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/dashboard",
              className: "text-[oklch(0.6_0.08_265)] hover:text-[oklch(0.85_0.15_85)] transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-[oklch(0.95_0.02_265)]", children: "Wellness Check-In" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.5_0.06_265)] text-xs", children: "Anonymous · No identity stored" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -8 },
            animate: { opacity: 1, y: 0 },
            className: "bg-[oklch(0.7_0.18_270)]/10 border border-[oklch(0.7_0.18_270)]/20 rounded-xl p-4 mb-8 flex items-start gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 text-[oklch(0.7_0.18_270)] shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[oklch(0.7_0.08_265)] text-sm", children: [
                "Your check-in is",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-[oklch(0.85_0.05_265)]", children: "completely anonymous" }),
                ". No name, no ID, and no identity is stored with your response. Only aggregated, anonymous trends are used to support school wellness programs."
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: !submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0, scale: 0.97 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-2", children: "How are you feeling today?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[oklch(0.5_0.06_265)] text-xs mb-6", children: [
                  "Fibonacci-scale: 1 – 13 · F(",
                  [1, 1, 2, 3, 5, 8, 13].includes(mood) ? "Fib" : mood,
                  ") = ",
                  mood
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { scale: 0.85, opacity: 0 },
                      animate: { scale: 1, opacity: 1 },
                      className: "text-7xl mb-4",
                      children: mood <= 3 ? "😔" : mood <= 5 ? "😕" : mood <= 7 ? "😐" : mood <= 10 ? "🙂" : "😄"
                    },
                    mood
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "font-semibold text-lg",
                      style: { color: moodColor(mood) },
                      children: moodLabels[mood]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[oklch(0.5_0.06_265)] text-sm mt-1", children: [
                    mood,
                    " / 13"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      "data-ocid": "student.mentalhealth.mood_slider",
                      type: "range",
                      min: 1,
                      max: 13,
                      step: 1,
                      value: mood,
                      onChange: (e) => setMood(Number(e.target.value)),
                      className: "w-full h-3 rounded-full appearance-none cursor-pointer",
                      style: {
                        background: `linear-gradient(90deg, ${moodColor(mood)} ${(mood - 1) / 12 * 100}%, oklch(1_0_0/0.1) ${(mood - 1) / 12 * 100}%)`
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[oklch(0.4_0.05_265)] text-xs mt-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "1" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Fibonacci-gated wellness scale" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "13" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-3", children: "Optional: Anything on your mind? (anonymous)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "textarea",
                  {
                    "data-ocid": "student.mentalhealth.note_input",
                    value: note,
                    onChange: (e) => setNote(e.target.value),
                    placeholder: "Share anything you want, or leave blank...",
                    rows: 4,
                    className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[oklch(0.8_0.05_265)] text-sm placeholder:text-[oklch(0.4_0.05_265)] focus:outline-none focus:border-[oklch(0.85_0.15_85)]/40 resize-none transition-colors"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  "data-ocid": "student.mentalhealth.submit_button",
                  onClick: handleSubmit,
                  className: "w-full py-6 text-base font-semibold bg-[oklch(0.85_0.15_85)]/20 hover:bg-[oklch(0.85_0.15_85)]/30 text-[oklch(0.85_0.15_85)] border border-[oklch(0.85_0.15_85)]/30",
                  children: "Submit Check-In"
                }
              )
            ]
          },
          "form"
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            className: "text-center py-16",
            "data-ocid": "student.mentalhealth.success_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { scale: 0 },
                  animate: { scale: 1 },
                  transition: { type: "spring", stiffness: 200, delay: 0.1 },
                  className: "w-20 h-20 rounded-full bg-[oklch(0.7_0.18_150)]/20 flex items-center justify-center mx-auto mb-6",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-10 h-10 text-[oklch(0.7_0.18_150)]" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-[oklch(0.95_0.02_265)] mb-3", children: "Check-In Received" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.6_0.06_265)] max-w-xs mx-auto text-sm", children: "Your anonymous wellness check-in has been recorded. Thank you for taking a moment for yourself." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.5_0.05_265)] text-xs mt-4", children: "No identity stored · LEX_SOVEREIGNUS enforced" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  "data-ocid": "student.mentalhealth.done_button",
                  onClick: () => {
                    setSubmitted(false);
                    setNote("");
                    setMood(8);
                  },
                  className: "mt-8 bg-white/5 border border-white/10 hover:bg-white/10 text-[oklch(0.7_0.08_265)]",
                  children: "Check In Again"
                }
              )
            ]
          },
          "success"
        ) })
      ]
    }
  );
}
export {
  MentalHealthCheckIn as default
};
