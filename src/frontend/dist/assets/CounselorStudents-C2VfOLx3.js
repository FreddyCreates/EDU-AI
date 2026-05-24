import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { L as Link } from "./router-D6GUppNf.js";
import { A as ArrowLeft } from "./arrow-left-DLov4c1N.js";
import { S as Search } from "./search-ChBsk90y.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { F as Flag } from "./flag-DKmv1Yx7.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./index-BivnQ6bB.js";
import "./query-8urnerR0.js";
const students = [
  {
    id: "1",
    name: "Aiden Park",
    grade: 11,
    mastery: 82,
    iep: true,
    collegeStage: "applying",
    sss: 34
  },
  {
    id: "2",
    name: "Sofia Garcia",
    grade: 10,
    mastery: 76,
    iep: false,
    collegeStage: "preparing",
    sss: 21
  },
  {
    id: "3",
    name: "James Wilson",
    grade: 9,
    mastery: 58,
    iep: true,
    collegeStage: "exploring",
    sss: 8
  },
  {
    id: "4",
    name: "Priya Nair",
    grade: 12,
    mastery: 94,
    iep: false,
    collegeStage: "deciding",
    sss: 89
  },
  {
    id: "5",
    name: "Carlos Mendoza",
    grade: 11,
    mastery: 71,
    iep: false,
    collegeStage: "preparing",
    sss: 21
  },
  {
    id: "6",
    name: "Emma Chen",
    grade: 10,
    mastery: 88,
    iep: false,
    collegeStage: "applying",
    sss: 55
  }
];
const stageColor = {
  exploring: "bg-white/10 text-[oklch(0.65_0.06_265)] border-white/20",
  preparing: "bg-[oklch(0.7_0.18_270)]/20 text-[oklch(0.7_0.18_270)] border-[oklch(0.7_0.18_270)]/30",
  applying: "bg-[oklch(0.85_0.15_85)]/20 text-[oklch(0.85_0.15_85)] border-[oklch(0.85_0.15_85)]/30",
  deciding: "bg-[oklch(0.7_0.18_150)]/20 text-[oklch(0.7_0.18_150)] border-[oklch(0.7_0.18_150)]/30"
};
function CounselorStudents() {
  const [search, setSearch] = reactExports.useState("");
  const filtered = students.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase())
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "counselor.students.page",
      className: "min-h-screen bg-[oklch(0.08_0.02_265)] px-4 py-6 pb-24",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/counselor",
              className: "text-[oklch(0.6_0.08_265)] hover:text-[oklch(0.85_0.15_85)] transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-[oklch(0.95_0.02_265)]", children: "Student Caseload" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(0.45_0.05_265)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              "data-ocid": "counselor.students.search_input",
              type: "text",
              placeholder: "Search students...",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-[oklch(0.85_0.05_265)] text-sm placeholder:text-[oklch(0.4_0.05_265)] focus:outline-none focus:border-[oklch(0.85_0.15_85)]/50 transition-colors"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filtered.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            "data-ocid": `counselor.student.${i + 1}`,
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: i * 0.07 },
            className: "bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-[oklch(0.85_0.15_85)]/20 flex items-center justify-center text-[oklch(0.85_0.15_85)] text-sm font-bold", children: s.name[0] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.9_0.05_265)] text-sm font-semibold", children: s.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[oklch(0.5_0.06_265)] text-xs", children: [
                      "Grade ",
                      s.grade,
                      " · SSS: ",
                      s.sss
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  s.iep && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-[oklch(0.65_0.22_30)]/20 text-[oklch(0.75_0.2_60)] border-[oklch(0.65_0.22_30)]/30 text-xs", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { className: "w-2.5 h-2.5 mr-1" }),
                    "IEP"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `text-xs ${stageColor[s.collegeStage]}`, children: s.collegeStage })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[oklch(0.5_0.06_265)]", children: "Mastery" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[oklch(0.85_0.15_85)] font-semibold", children: [
                    s.mastery,
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-white/10 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { width: 0 },
                    animate: { width: `${s.mastery}%` },
                    transition: { delay: 0.3 + i * 0.07, duration: 0.6 },
                    className: "h-full bg-gradient-to-r from-[oklch(0.85_0.15_85)] to-[oklch(0.7_0.18_60)] rounded-full"
                  }
                ) })
              ] })
            ]
          },
          s.id
        )) })
      ]
    }
  );
}
export {
  CounselorStudents as default
};
