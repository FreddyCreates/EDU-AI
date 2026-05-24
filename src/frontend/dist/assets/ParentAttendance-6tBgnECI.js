import { j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { L as Link } from "./router-D6GUppNf.js";
import { A as ArrowLeft } from "./arrow-left-DLov4c1N.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { T as TriangleAlert } from "./triangle-alert-DEqO8oET.js";
import "./index-BivnQ6bB.js";
import "./query-8urnerR0.js";
const stats = [
  { label: "Present", value: 87, color: "oklch(0.7_0.18_150)" },
  { label: "Absent", value: 3, color: "oklch(0.65_0.22_30)" },
  { label: "Tardy", value: 2, color: "oklch(0.75_0.18_60)" },
  { label: "Excused", value: 5, color: "oklch(0.7_0.14_270)" }
];
const calendarDays = Array.from({ length: 31 }, (_, i) => ({
  day: i + 1,
  status: i < 5 || i === 12 || i === 13 || i === 20 || i === 21 || i === 27 || i === 28 ? "weekend" : i > 18 ? "future" : i === 7 || i === 15 ? "absent" : i === 3 || i === 9 ? "tardy" : i === 11 || i === 17 ? "excused" : "present"
}));
const statusColor = {
  present: "bg-[oklch(0.7_0.18_150)]/70",
  absent: "bg-[oklch(0.65_0.22_30)]/70",
  tardy: "bg-[oklch(0.75_0.18_60)]/70",
  excused: "bg-[oklch(0.7_0.14_270)]/70",
  weekend: "bg-white/5",
  future: "bg-white/3"
};
function ParentAttendance() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "parent.attendance.page",
      className: "min-h-screen bg-[oklch(0.08_0.02_265)] px-4 py-6 pb-24",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/parent",
              className: "text-[oklch(0.6_0.08_265)] hover:text-[oklch(0.85_0.15_85)] transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-[oklch(0.95_0.02_265)]", children: "Attendance" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -8 },
            animate: { opacity: 1, y: 0 },
            className: "bg-[oklch(0.65_0.22_30)]/15 border border-[oklch(0.65_0.22_30)]/30 rounded-xl p-4 mb-6 flex items-start gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-[oklch(0.75_0.2_60)] shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.9_0.05_265)] text-sm font-medium", children: "2 unexcused absences this month" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.6_0.08_265)] text-xs mt-0.5", children: "Contact attendance office to submit documentation" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2 mb-6", children: stats.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.9 },
            animate: { opacity: 1, scale: 1 },
            transition: { delay: i * 0.07 },
            className: "bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-3 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold", style: { color: s.color }, children: s.value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.55_0.06_265)] text-xs mt-0.5", children: s.label })
            ]
          },
          s.label
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-3", children: "May 2026" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-1 mb-2", children: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "text-center text-[oklch(0.5_0.06_265)] text-xs font-medium py-1",
                children: d
              },
              d
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-7 gap-1", children: [
              Array.from({ length: 5 }, (_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static offset cells never reorder
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}, `empty-${i}`)
              )),
              calendarDays.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  "data-ocid": `parent.attendance.day.${d.day}`,
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { delay: i * 0.01 },
                  className: `aspect-square rounded-lg flex items-center justify-center text-xs font-medium ${statusColor[d.status]} ${d.status === "future" ? "text-[oklch(0.35_0.04_265)]" : "text-[oklch(0.9_0.02_265)]"}`,
                  children: d.day
                },
                d.day
              ))
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3 mt-4 pt-4 border-t border-white/10", children: ["present", "absent", "tardy", "excused"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-3 h-3 rounded-sm ${statusColor[s]}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[oklch(0.55_0.06_265)] text-xs capitalize", children: s })
            ] }, s)) })
          ] })
        ] })
      ]
    }
  );
}
export {
  ParentAttendance as default
};
