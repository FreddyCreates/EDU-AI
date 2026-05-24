import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { f as useActor, d as useInternetIdentity, h as createActor } from "./index-BivnQ6bB.js";
import { a as useQuery } from "./query-8urnerR0.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import "./router-D6GUppNf.js";
const FILTERS = [
  "ALL",
  "RECOGNITION",
  "MASTERY",
  "COMPETITION",
  "MILESTONE"
];
const cardStyle = (type) => {
  if (type === "RECOGNITION")
    return "backdrop-blur-lg bg-amber-900/20 border border-amber-400/50";
  if (type === "MASTERY")
    return "backdrop-blur-md bg-teal-900/20 border border-teal-400/40";
  if (type === "COMPETITION")
    return "backdrop-blur-md bg-purple-900/20 border border-purple-400/40";
  return "backdrop-blur-md bg-white/5 border border-white/10";
};
function AchievementTimeline() {
  const [filter, setFilter] = reactExports.useState("ALL");
  const { actor } = useActor(createActor);
  const { identity } = useInternetIdentity();
  const principal = (identity == null ? void 0 : identity.getPrincipal()) ?? null;
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["achievementTimeline", (principal == null ? void 0 : principal.toString()) ?? "anon"],
    queryFn: async () => {
      if (!actor || !principal) return [];
      return actor.getAchievementTimeline(principal);
    },
    enabled: !!actor && !!principal
  });
  const filtered = filter === "ALL" ? events : events.filter((e) => e.eventType === filter);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-screen bg-black/90 px-5 py-8",
      "data-ocid": "achievement-timeline.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -13 },
            animate: { opacity: 1, y: 0 },
            className: "mb-8",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-white/90", children: "Achievement Timeline" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-sm mt-1", children: "Your K-12 journey, permanently recorded." })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex gap-2 flex-wrap mb-6",
            "data-ocid": "achievement-timeline.filter.tab",
            children: FILTERS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setFilter(f),
                "data-ocid": `achievement-timeline.filter.${f.toLowerCase()}`,
                className: `px-3 py-1 rounded-full text-xs font-medium border transition-all ${filter === f ? "bg-amber-900/40 border-amber-400/60 text-amber-200" : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"}`,
                children: f
              },
              f
            ))
          }
        ),
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "space-y-3",
            "data-ocid": "achievement-timeline.loading_state",
            children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-24 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl animate-pulse"
              },
              i
            ))
          }
        ),
        !isLoading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "text-center py-16 text-white/40 text-sm",
            "data-ocid": "achievement-timeline.empty_state",
            children: "Your K-12 journey is being written. Keep learning."
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filtered.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -13 },
            animate: { opacity: 1, x: 0 },
            transition: { delay: i * 0.05 },
            "data-ocid": `achievement-timeline.item.${i + 1}`,
            className: `rounded-xl p-5 ${cardStyle(entry.eventType)}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-white/10 border border-white/15 rounded px-2 py-0.5 text-white/60", children: [
                  "Grade ",
                  Number(entry.grade)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-white/40", children: Number(entry.year) }),
                entry.goldSealed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-amber-900/40 border border-amber-400/50 rounded px-2 py-0.5 text-amber-300", children: "★ Gold Sealed" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-white/90 truncate", children: entry.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-sm mt-1 break-words", children: entry.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-2 flex-wrap", children: [
                entry.domain && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-white/10 rounded px-2 py-0.5 text-white/50", children: entry.domain }),
                entry.programName && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-white/10 rounded px-2 py-0.5 text-white/50", children: entry.programName })
              ] })
            ] }) })
          },
          entry.eventId
        )) })
      ] })
    }
  );
}
export {
  AchievementTimeline as default
};
