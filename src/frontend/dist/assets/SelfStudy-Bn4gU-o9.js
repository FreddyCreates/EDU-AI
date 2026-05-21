import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { f as useActor, h as createActor } from "./index-BivnQ6bB.js";
import { B as Button } from "./button-CWs7EcLL.js";
import { a as useQuery, u as useQueryClient, b as useMutation } from "./query-8urnerR0.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import "./router-D6GUppNf.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
const QUERY_KEY = "selfStudyTracks";
function useMyTracks() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const actorAny = actor;
        if (typeof actorAny.getMyTracks === "function") {
          return await actorAny.getMyTracks();
        }
      } catch (e) {
        console.error("getMyTracks error", e);
      }
      return [];
    },
    enabled: !!actor && !isFetching
  });
}
function useCreateTrack() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ title, category, competitionDate }) => {
      if (!actor) return null;
      try {
        const actorAny = actor;
        if (typeof actorAny.createSelfStudyTrack === "function") {
          return await actorAny.createSelfStudyTrack(
            title,
            category,
            competitionDate
          );
        }
      } catch (e) {
        console.error("createSelfStudyTrack error", e);
      }
      return null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    }
  });
}
function useCompleteMilestone() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ trackId, milestoneIndex }) => {
      if (!actor) return false;
      try {
        const actorAny = actor;
        if (typeof actorAny.completeMilestone === "function") {
          return await actorAny.completeMilestone(trackId, milestoneIndex);
        }
      } catch (e) {
        console.error("completeMilestone error", e);
      }
      return false;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    }
  });
}
const FIB_WEEKS = [13, 8, 5, 3, 2, 1];
const UIL_CATEGORIES_FALLBACK = [
  { value: "UIL_CTE", label: "UIL Career & Technical" },
  { value: "UIL_ACADEMIC", label: "UIL Academic" },
  { value: "UIL_MUSIC", label: "UIL Music" },
  { value: "UIL_ATHLETICS", label: "UIL Athletics" },
  { value: "CUSTOM", label: "Custom / Other" }
];
const UIL_CATEGORIES = UIL_CATEGORIES_FALLBACK;
function useCompetitionTemplates() {
  const { actor, isFetching } = useActor(createActor);
  const [templates, setTemplates] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!actor || isFetching) return;
    setLoading(true);
    actor.getCompetitionTemplates().then((data) => setTemplates(data ?? [])).catch(() => setTemplates([])).finally(() => setLoading(false));
  }, [actor, isFetching]);
  return { templates, loading };
}
const CATEGORY_COLORS = {
  UIL_CTE: "oklch(0.72 0.20 55)",
  UIL_ACADEMIC: "oklch(0.72 0.20 200)",
  UIL_MUSIC: "oklch(0.72 0.20 280)",
  UIL_ATHLETICS: "oklch(0.72 0.20 155)",
  CUSTOM: "oklch(0.72 0.18 320)"
};
function daysUntil(competitionDate) {
  const ms = Number(competitionDate) - Date.now();
  return Math.max(0, Math.floor(ms / 864e5));
}
function formatDate(ts) {
  return new Date(Number(ts)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function milestoneLabel(weeksBefore) {
  const labels = {
    13: "Foundation",
    8: "Fundamentals",
    5: "Domain Build",
    3: "Intensive",
    2: "Full Run",
    1: "Final Prep"
  };
  return labels[weeksBefore] ?? `${weeksBefore}w out`;
}
function GlassOrb() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative flex items-center justify-center",
      style: { width: 44, height: 44, flexShrink: 0 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 rounded-full",
            style: {
              background: "radial-gradient(circle at 35% 35%, oklch(0.85 0.22 70), oklch(0.55 0.28 60))",
              boxShadow: "0 0 20px oklch(0.75 0.25 65 / 0.55), 0 0 40px oklch(0.65 0.22 60 / 0.25)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "relative z-10 text-[20px] select-none",
            style: { lineHeight: 1 },
            children: "🧭"
          }
        )
      ]
    }
  );
}
function TabPills({ active, onChange }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex gap-[5px] p-[3px] rounded-full",
      style: {
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.10)"
      },
      children: ["tracks", "create"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": `selfstudy.tab.${tab}`,
          onClick: () => onChange(tab),
          className: "px-[21px] py-[8px] rounded-full text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-200",
          style: {
            background: active === tab ? "linear-gradient(135deg, oklch(0.78 0.22 70), oklch(0.65 0.25 55))" : "transparent",
            color: active === tab ? "oklch(0.10 0.02 60)" : "rgba(255,255,255,0.55)",
            boxShadow: active === tab ? "0 2px 12px oklch(0.75 0.25 65 / 0.35)" : "none"
          },
          children: tab === "tracks" ? "My Tracks" : "Create New"
        },
        tab
      ))
    }
  );
}
function TrackCard({
  track,
  index
}) {
  var _a, _b, _c;
  const completeMilestone = useCompleteMilestone();
  const days = daysUntil(track.competitionDate);
  const nextIncomplete = track.milestones.findIndex((m) => !m.isComplete);
  const categoryColor = CATEGORY_COLORS[track.category] ?? "oklch(0.72 0.18 70)";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 13 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.25, delay: index * 0.08 },
      "data-ocid": `selfstudy.track.item.${index + 1}`,
      className: "rounded-[21px] p-[21px] flex flex-col gap-[13px]",
      style: {
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.10)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-[8px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-[5px] min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h3",
              {
                className: "font-semibold text-[15px] leading-tight",
                style: { color: "rgba(255,255,255,0.90)" },
                children: track.title
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-[11px] font-mono",
                style: { color: "rgba(255,255,255,0.50)" },
                children: [
                  "Competition: ",
                  formatDate(track.competitionDate)
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-[5px] shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "px-[8px] py-[3px] rounded-full text-[10px] font-mono font-bold uppercase tracking-wider",
                style: {
                  background: `${categoryColor}22`,
                  color: categoryColor,
                  border: `1px solid ${categoryColor}44`
                },
                children: ((_a = UIL_CATEGORIES.find((c) => c.value === track.category)) == null ? void 0 : _a.label) ?? track.category
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-[11px] font-mono font-semibold",
                style: {
                  color: days < 14 ? "oklch(0.75 0.22 30)" : days < 30 ? "oklch(0.78 0.22 70)" : "rgba(255,255,255,0.60)"
                },
                children: days > 0 ? `${days}d until competition` : "Competition day!"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-[5px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-[10px] font-mono uppercase tracking-wider",
                style: { color: "rgba(255,255,255,0.45)" },
                children: "Mastery"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-[11px] font-mono font-bold",
                style: { color: "oklch(0.82 0.22 70)" },
                children: [
                  track.masteryPct,
                  "%"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-[5px] w-full rounded-full overflow-hidden",
              style: { background: "rgba(255,255,255,0.08)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-full rounded-full transition-all duration-500",
                  style: {
                    width: `${track.masteryPct}%`,
                    background: "linear-gradient(90deg, oklch(0.75 0.25 65), oklch(0.85 0.22 75))",
                    boxShadow: "0 0 8px oklch(0.78 0.25 68 / 0.50)"
                  }
                }
              )
            }
          )
        ] }),
        track.milestones.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-[8px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-[10px] font-mono uppercase tracking-wider",
              style: { color: "rgba(255,255,255,0.45)" },
              children: "Milestones"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-[5px] overflow-x-auto pb-[5px] scrollbar-hide", children: track.milestones.map((m, _i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center gap-[3px] rounded-[8px] px-[8px] py-[5px] shrink-0",
              style: {
                background: m.isComplete ? "oklch(0.78 0.22 70 / 0.18)" : "rgba(255,255,255,0.05)",
                border: m.isComplete ? "1px solid oklch(0.78 0.22 70 / 0.40)" : "1px solid rgba(255,255,255,0.08)",
                minWidth: 64
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "text-[9px] font-mono font-bold uppercase tracking-wider",
                    style: {
                      color: m.isComplete ? "oklch(0.82 0.22 70)" : "rgba(255,255,255,0.40)"
                    },
                    children: [
                      m.weeksBefore,
                      "w"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-[9px] text-center leading-tight",
                    style: {
                      color: m.isComplete ? "rgba(255,255,255,0.80)" : "rgba(255,255,255,0.40)",
                      maxWidth: 56
                    },
                    children: m.title || milestoneLabel(m.weeksBefore)
                  }
                ),
                m.isComplete && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px]", children: "✓" })
              ]
            },
            `ms-${m.weeksBefore}-${m.domain}`
          )) })
        ] }),
        nextIncomplete >= 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            size: "sm",
            "data-ocid": `selfstudy.track.complete_milestone.${index + 1}`,
            onClick: () => completeMilestone.mutate({
              trackId: track.id,
              milestoneIndex: nextIncomplete
            }),
            disabled: completeMilestone.isPending,
            className: "w-full h-[44px] font-mono text-[11px] uppercase tracking-wider transition-all duration-200",
            style: {
              background: "linear-gradient(135deg, oklch(0.78 0.22 70 / 0.25), oklch(0.65 0.22 60 / 0.15))",
              border: "1px solid oklch(0.78 0.22 70 / 0.35)",
              color: "oklch(0.85 0.20 70)"
            },
            children: completeMilestone.isPending ? "Marking..." : `Mark Next Milestone Done · ${((_b = track.milestones[nextIncomplete]) == null ? void 0 : _b.title) ?? milestoneLabel(((_c = track.milestones[nextIncomplete]) == null ? void 0 : _c.weeksBefore) ?? 0)}`
          }
        )
      ]
    }
  );
}
function CreateTrackForm({ onSuccess }) {
  const [title, setTitle] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState("UIL_CTE");
  const [dateStr, setDateStr] = reactExports.useState("");
  const [selectedTemplate, setSelectedTemplate] = reactExports.useState(null);
  const createTrack = useCreateTrack();
  const { templates, loading: templatesLoading } = useCompetitionTemplates();
  const templateOptions = templates.length > 0 ? templates.map((t) => ({
    value: t.name,
    label: `${t.name} — ${t.organization}`,
    category: t.category,
    domains: t.domains
  })) : UIL_CATEGORIES_FALLBACK.map((c) => ({
    value: c.value,
    label: c.label,
    category: c.value,
    domains: []
  }));
  const handleTemplateChange = (val) => {
    if (templates.length > 0) {
      const tpl = templates.find((t) => t.name === val);
      if (tpl) {
        setSelectedTemplate(tpl);
        setCategory(tpl.category);
        if (!title) setTitle(tpl.name);
      }
    } else {
      setCategory(val);
      setSelectedTemplate(null);
    }
  };
  const weeksUntil = dateStr ? Math.max(
    0,
    Math.floor(
      (new Date(dateStr).getTime() - Date.now()) / (7 * 864e5)
    )
  ) : 0;
  const previewMilestones = FIB_WEEKS.filter((w) => w <= weeksUntil);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !dateStr) return;
    await createTrack.mutateAsync({
      title: title.trim(),
      category,
      competitionDate: BigInt(new Date(dateStr).getTime())
    });
    onSuccess();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "flex flex-col gap-[21px]",
      "data-ocid": "selfstudy.create_form",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-[8px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "ss-title",
              className: "text-[11px] font-mono uppercase tracking-wider",
              style: { color: "rgba(255,255,255,0.55)" },
              children: "Activity Title"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "ss-title",
              type: "text",
              value: title,
              onChange: (e) => setTitle(e.target.value),
              placeholder: "e.g. Skills USA Construction",
              "data-ocid": "selfstudy.title_input",
              required: true,
              className: "h-[44px] w-full rounded-[13px] px-[13px] text-[14px] outline-none transition-all duration-200",
              style: {
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.90)"
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-[8px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              htmlFor: "ss-category",
              className: "text-[11px] font-mono uppercase tracking-wider",
              style: { color: "rgba(255,255,255,0.55)" },
              children: [
                templates.length > 0 ? "Competition Program" : "UIL Category",
                templatesLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 opacity-50 normal-case", children: "loading…" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "ss-category",
              value: templates.length > 0 ? (selectedTemplate == null ? void 0 : selectedTemplate.name) ?? "" : category,
              onChange: (e) => handleTemplateChange(e.target.value),
              "data-ocid": "selfstudy.category_select",
              className: "h-[44px] w-full rounded-[13px] px-[13px] text-[14px] outline-none appearance-none transition-all duration-200",
              style: {
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.90)"
              },
              children: [
                templates.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "option",
                  {
                    value: "",
                    disabled: true,
                    style: { background: "#100d22", color: "rgba(255,255,255,0.50)" },
                    children: "Select a competition…"
                  }
                ),
                templateOptions.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "option",
                  {
                    value: opt.value,
                    style: { background: "#100d22", color: "rgba(255,255,255,0.90)" },
                    children: opt.label
                  },
                  opt.value
                ))
              ]
            }
          ),
          (selectedTemplate == null ? void 0 : selectedTemplate.domains) && selectedTemplate.domains.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, height: 0 },
              animate: { opacity: 1, height: "auto" },
              className: "flex gap-[5px] flex-wrap mt-[5px]",
              "data-ocid": "selfstudy.domains_preview",
              children: selectedTemplate.domains.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "px-[8px] py-[3px] rounded-full text-[10px] font-mono",
                  style: {
                    background: "oklch(0.78 0.22 200 / 0.12)",
                    border: "1px solid oklch(0.78 0.22 200 / 0.25)",
                    color: "oklch(0.82 0.18 200)"
                  },
                  children: d
                },
                d
              ))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-[8px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "ss-date",
              className: "text-[11px] font-mono uppercase tracking-wider",
              style: { color: "rgba(255,255,255,0.55)" },
              children: "Competition Date"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "ss-date",
              type: "date",
              value: dateStr,
              onChange: (e) => setDateStr(e.target.value),
              "data-ocid": "selfstudy.date_input",
              required: true,
              min: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
              className: "h-[44px] w-full rounded-[13px] px-[13px] text-[14px] outline-none transition-all duration-200",
              style: {
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.90)",
                colorScheme: "dark"
              }
            }
          )
        ] }),
        dateStr && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, height: 0 },
            animate: { opacity: 1, height: "auto" },
            className: "flex flex-col gap-[8px]",
            "data-ocid": "selfstudy.milestone_preview",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-[11px] font-mono uppercase tracking-wider",
                  style: { color: "rgba(255,255,255,0.45)" },
                  children: "EDDI will build these milestones"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-[5px] flex-wrap", children: previewMilestones.length > 0 ? previewMilestones.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "px-[8px] py-[5px] rounded-[8px] text-[10px] font-mono",
                  style: {
                    background: "oklch(0.78 0.22 70 / 0.12)",
                    border: "1px solid oklch(0.78 0.22 70 / 0.25)",
                    color: "oklch(0.82 0.20 70)"
                  },
                  children: [
                    w,
                    "w · ",
                    milestoneLabel(w)
                  ]
                },
                `preview-${w}`
              )) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-[11px]",
                  style: { color: "rgba(255,255,255,0.40)" },
                  children: "Select a date further out to see milestones"
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            disabled: !title.trim() || !dateStr || createTrack.isPending,
            "data-ocid": "selfstudy.submit_button",
            className: "h-[55px] w-full rounded-[13px] font-mono font-bold text-[13px] uppercase tracking-widest transition-all duration-200",
            style: {
              background: title.trim() && dateStr ? "linear-gradient(135deg, oklch(0.78 0.25 70), oklch(0.65 0.28 55))" : "rgba(255,255,255,0.08)",
              color: title.trim() && dateStr ? "oklch(0.08 0.02 60)" : "rgba(255,255,255,0.35)",
              boxShadow: title.trim() && dateStr ? "0 4px 24px oklch(0.75 0.25 65 / 0.40)" : "none",
              border: "none"
            },
            children: createTrack.isPending ? "EDDI is building your path..." : "Let EDDI Build My Path →"
          }
        )
      ]
    }
  );
}
function SelfStudy() {
  const [tab, setTab] = reactExports.useState("tracks");
  const { data: tracks = [], isLoading } = useMyTracks();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen pb-[89px]",
      style: { background: "oklch(0.08 0.02 280)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -8 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.3 },
            className: "px-[21px] pt-[34px] pb-[21px] flex flex-col gap-[13px]",
            "data-ocid": "selfstudy.header",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-[13px]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(GlassOrb, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h1",
                    {
                      className: "text-[26px] font-bold leading-tight",
                      style: {
                        background: "linear-gradient(135deg, oklch(0.92 0.18 70), oklch(0.78 0.25 60))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text"
                      },
                      children: "Self-Study Creator"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-[12px] font-mono mt-[3px]",
                      style: { color: "rgba(255,255,255,0.50)" },
                      children: "EDDI builds your competition prep path"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-[13px] leading-relaxed",
                  style: { color: "rgba(255,255,255,0.65)" },
                  children: "Competing in Skills USA, UIL, or any program? Set your date — EDDI maps Fibonacci milestones backward from competition day so you're always ready, no matter how tight your schedule."
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-[21px] pb-[21px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TabPills, { active: tab, onChange: setTab }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-[21px]", children: [
          tab === "tracks" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 0.18 },
              className: "flex flex-col gap-[13px]",
              "data-ocid": "selfstudy.tracks_tab",
              children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex flex-col gap-[8px] py-[34px] items-center",
                  "data-ocid": "selfstudy.tracks.loading_state",
                  children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-[89px] w-full rounded-[21px] animate-pulse",
                      style: { background: "rgba(255,255,255,0.06)" }
                    },
                    `skel-${i}`
                  ))
                }
              ) : tracks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.96 },
                  animate: { opacity: 1, scale: 1 },
                  className: "flex flex-col items-center gap-[13px] py-[55px]",
                  "data-ocid": "selfstudy.tracks.empty_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-[55px] h-[55px] rounded-full flex items-center justify-center text-[28px]",
                        style: {
                          background: "oklch(0.78 0.22 70 / 0.12)",
                          border: "1px solid oklch(0.78 0.22 70 / 0.22)"
                        },
                        children: "🧭"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-[5px]", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-[15px] font-semibold",
                          style: { color: "rgba(255,255,255,0.75)" },
                          children: "No tracks yet"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-[12px] text-center",
                          style: { color: "rgba(255,255,255,0.40)" },
                          children: "Create your first track below and EDDI will build your prep path."
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        "data-ocid": "selfstudy.empty_state.create_button",
                        onClick: () => setTab("create"),
                        className: "h-[44px] px-[21px] rounded-full font-mono text-[11px] uppercase tracking-wider",
                        style: {
                          background: "linear-gradient(135deg, oklch(0.78 0.22 70), oklch(0.65 0.25 55))",
                          color: "oklch(0.10 0.02 60)",
                          border: "none",
                          boxShadow: "0 4px 16px oklch(0.75 0.25 65 / 0.35)"
                        },
                        children: "Create First Track"
                      }
                    )
                  ]
                }
              ) : tracks.map((track, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(TrackCard, { track, index: i }, track.id))
            },
            "tracks"
          ),
          tab === "create" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 0.18 },
              className: "rounded-[21px] p-[21px]",
              "data-ocid": "selfstudy.create_tab",
              style: {
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.10)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreateTrackForm, { onSuccess: () => setTab("tracks") })
            },
            "create"
          )
        ] })
      ]
    }
  );
}
export {
  SelfStudy as default
};
