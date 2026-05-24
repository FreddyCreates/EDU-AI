import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { B as Button } from "./button-CWs7EcLL.js";
import { L as Link } from "./router-D6GUppNf.js";
import { A as ArrowLeft } from "./arrow-left-DLov4c1N.js";
import { U as Users, G as GraduationCap, b as Star } from "./index-BivnQ6bB.js";
import { B as Brain } from "./brain-BiTGGu73.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { C as Clock } from "./clock-DmeOF2sv.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./query-8urnerR0.js";
const sessionTypes = [
  {
    type: "peer",
    label: "Peer Tutor",
    description: "Study with a matched classmate",
    icon: Users,
    color: "oklch(0.7_0.18_150)"
  },
  {
    type: "teacher",
    label: "Teacher",
    description: "One-on-one with your teacher",
    icon: GraduationCap,
    color: "oklch(0.85_0.15_85)"
  },
  {
    type: "ai",
    label: "EduAI",
    description: "Sovereign AI tutoring session",
    icon: Brain,
    color: "oklch(0.7_0.18_270)"
  }
];
const sessionHistory = [
  {
    tutor: "Priya Nair (Peer)",
    subject: "Algebra II",
    date: "May 17",
    duration: 45,
    rating: 5
  },
  {
    tutor: "Ms. Rivera (Teacher)",
    subject: "Algebra II",
    date: "May 14",
    duration: 30,
    rating: 5
  },
  {
    tutor: "EduAI (AI)",
    subject: "Geometry",
    date: "May 12",
    duration: 55,
    rating: 4
  },
  {
    tutor: "Carlos Mendoza (Peer)",
    subject: "Biology",
    date: "May 10",
    duration: 34,
    rating: 4
  }
];
function TutoringSession() {
  var _a, _b;
  const [selected, setSelected] = reactExports.useState(null);
  const [inSession, setInSession] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "student.tutoring.page",
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-[oklch(0.95_0.02_265)]", children: "Tutoring Sessions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.5_0.06_265)] text-xs", children: "Peer · Teacher · EduAI" })
          ] })
        ] }),
        !inSession ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-4", children: "Choose Session Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: sessionTypes.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.button,
              {
                type: "button",
                "data-ocid": `student.tutoring.type.${s.type}`,
                initial: { opacity: 0, x: -10 },
                animate: { opacity: 1, x: 0 },
                transition: { delay: i * 0.08 },
                onClick: () => setSelected(selected === s.type ? null : s.type),
                className: `w-full flex items-center gap-4 p-5 rounded-xl border text-left transition-all ${selected === s.type ? "border-[oklch(0.85_0.15_85)]/40 bg-[oklch(0.85_0.15_85)]/8" : "border-white/10 bg-white/5 hover:bg-white/8"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                      style: { background: `${s.color}20` },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "w-6 h-6", style: { color: s.color } })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.9_0.05_265)] font-semibold", children: s.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.5_0.06_265)] text-sm", children: s.description })
                  ] })
                ]
              },
              s.type
            )) }),
            selected && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 8 },
                animate: { opacity: 1, y: 0 },
                className: "mt-4",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    "data-ocid": "student.tutoring.start_button",
                    onClick: () => setInSession(true),
                    className: "w-full py-5 font-semibold bg-[oklch(0.85_0.15_85)]/20 hover:bg-[oklch(0.85_0.15_85)]/30 text-[oklch(0.85_0.15_85)] border border-[oklch(0.85_0.15_85)]/30",
                    children: [
                      "Start ",
                      (_a = sessionTypes.find((s) => s.type === selected)) == null ? void 0 : _a.label,
                      " ",
                      "Session"
                    ]
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "inline w-4 h-4 mr-2" }),
              "Session History"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: sessionHistory.map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                "data-ocid": `student.tutoring.history.${i + 1}`,
                initial: { opacity: 0, y: 6 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.4 + i * 0.07 },
                className: "flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.85_0.05_265)] text-sm font-medium", children: h.tutor }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[oklch(0.5_0.06_265)] text-xs", children: [
                      h.subject,
                      " · ",
                      h.date,
                      " · ",
                      h.duration,
                      " min"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0.5", children: Array.from({ length: h.rating }, (_, j) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Star,
                    {
                      className: "w-3 h-3 fill-[oklch(0.85_0.15_85)] text-[oklch(0.85_0.15_85)]"
                    },
                    `star-${h.date}-${j}`
                  )) })
                ]
              },
              h.date + h.tutor
            )) })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.97 },
            animate: { opacity: 1, scale: 1 },
            className: "bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 text-center",
            "data-ocid": "student.tutoring.session_panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-[oklch(0.85_0.15_85)]/20 flex items-center justify-center mx-auto mb-4", children: selected === "ai" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-8 h-8 text-[oklch(0.85_0.15_85)]" }) : selected === "teacher" ? /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-8 h-8 text-[oklch(0.85_0.15_85)]" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8 text-[oklch(0.85_0.15_85)]" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-[oklch(0.7_0.18_150)]/20 text-[oklch(0.7_0.18_150)] border-[oklch(0.7_0.18_150)]/30 mb-4", children: "Session Active" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-[oklch(0.9_0.05_265)] font-bold text-lg mb-2", children: [
                (_b = sessionTypes.find((s) => s.type === selected)) == null ? void 0 : _b.label,
                " Session"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.55_0.06_265)] text-sm mb-8", children: "Live tutoring interface · COGT-powered adaptive learning" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  "data-ocid": "student.tutoring.end_button",
                  onClick: () => setInSession(false),
                  variant: "outline",
                  className: "border-white/20 text-[oklch(0.6_0.08_265)] hover:bg-white/10",
                  children: "End Session"
                }
              )
            ]
          }
        )
      ]
    }
  );
}
export {
  TutoringSession as default
};
