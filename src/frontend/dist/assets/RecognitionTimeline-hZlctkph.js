import { j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { E as EddiOrb } from "./EddiOrb-BVFxfmXd.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { d as useInternetIdentity, b as Star, S as Skeleton, q as Crown, a as Award } from "./index-BivnQ6bB.js";
import { f as useRecognitionTimeline } from "./use-recognition-CcUiZsvr.js";
import { u as useStudent } from "./use-student-czSOKqJy.js";
import { L as Link } from "./router-D6GUppNf.js";
import { C as ChevronLeft } from "./chevron-left-pbzTE56t.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { H as History } from "./history-BfR8vaoT.js";
import { M as Medal } from "./medal-D7d0qXZ7.js";
import { F as Flame } from "./flame-DBscWOFv.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./query-8urnerR0.js";
const ZONE_BADGE = {
  hot: {
    label: "GOLD",
    color: "text-amber-300",
    border: "border-amber-500/40",
    bg: "bg-amber-500/12",
    icon: Crown,
    glow: "rgba(251,191,36,0.18)"
  },
  warm: {
    label: "SILVER",
    color: "text-slate-300",
    border: "border-slate-400/30",
    bg: "bg-slate-400/8",
    icon: Medal,
    glow: "rgba(148,163,184,0.12)"
  },
  cold: {
    label: "BRONZE",
    color: "text-orange-400",
    border: "border-orange-600/30",
    bg: "bg-orange-600/8",
    icon: Award,
    glow: "rgba(194,65,12,0.10)"
  },
  frozen: {
    label: "SEALED",
    color: "text-indigo-300",
    border: "border-indigo-500/30",
    bg: "bg-indigo-500/8",
    icon: Star,
    glow: "rgba(99,102,241,0.10)"
  },
  sovereign: {
    label: "SOVEREIGN",
    color: "text-amber-200",
    border: "border-amber-400/60",
    bg: "bg-amber-400/15",
    icon: Crown,
    glow: "rgba(251,191,36,0.30)"
  }
};
function getZoneKey(entry) {
  if (entry.isGoldMoment) return "sovereign";
  const z = entry.zone.toLowerCase();
  if (z in ZONE_BADGE) return z;
  return "cold";
}
function getTypeBadge(achievementType) {
  const t = achievementType.toLowerCase();
  if (t.includes("recognition") || t.includes("rcgn"))
    return {
      label: "RCGN",
      color: "text-amber-300",
      border: "border-amber-500/30",
      bg: "bg-amber-500/10"
    };
  if (t.includes("nominat") || t.includes("noms"))
    return {
      label: "NOMS",
      color: "text-sky-300",
      border: "border-sky-500/30",
      bg: "bg-sky-500/10"
    };
  return {
    label: "ACHV",
    color: "text-emerald-300",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10"
  };
}
function TimelineEntry({
  entry,
  index,
  isLast
}) {
  const zoneKey = getZoneKey(entry);
  const cfg = ZONE_BADGE[zoneKey];
  const Icon = cfg.icon;
  const isSovereign = entry.isGoldMoment;
  const typeBadge = getTypeBadge(entry.achievementType);
  const isAchv = typeBadge.label === "ACHV";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: -16 },
      animate: { opacity: 1, x: 0 },
      transition: {
        delay: index * 0.08,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1]
      },
      "data-ocid": `recognition_timeline.item.${index + 1}`,
      className: "relative flex gap-5",
      children: [
        !isLast && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-[21px] top-[44px] w-px h-[calc(100%+13px)] bg-white/8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2",
            style: {
              background: `radial-gradient(circle at center, ${cfg.glow} 0%, rgba(12,14,28,0.9) 70%)`,
              borderColor: cfg.border.replace("border-", "").replace("/", " / "),
              boxShadow: `0 0 16px ${cfg.glow}`
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-5 w-5 ${cfg.color}` })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex-1 mb-[13px] rounded-2xl border p-5 relative overflow-hidden ${isSovereign ? "border-amber-400/50" : isAchv ? "border-emerald-500/30" : cfg.border} ${isSovereign ? "bg-amber-400/8" : isAchv ? "bg-emerald-500/5" : cfg.bg}`,
            style: {
              backdropFilter: "blur(16px) saturate(180%)",
              WebkitBackdropFilter: "blur(16px) saturate(180%)",
              boxShadow: isAchv ? "0 8px 32px rgba(0,0,0,0.40), 0 0 32px rgba(52,211,153,0.18)" : `0 8px 32px rgba(0,0,0,0.40), 0 0 24px ${cfg.glow}`
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "pointer-events-none absolute -top-6 -right-6 h-28 w-28 rounded-full blur-3xl",
                  style: { background: isAchv ? "rgba(52,211,153,0.15)" : cfg.glow }
                }
              ),
              isSovereign && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none rounded-2xl overflow-hidden", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-amber-400/10 via-transparent to-amber-600/5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-full bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    isSovereign && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 mb-2",
                        style: {
                          background: "rgba(251,191,36,0.15)",
                          border: "1px solid rgba(251,191,36,0.35)"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-3 w-3 text-amber-300" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] font-bold uppercase tracking-widest text-amber-300", children: "SOVEREIGN MOMENT" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-base text-white/90 leading-snug", children: entry.description }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-white/40 mt-1", children: entry.gradeContext })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2 shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        className: `font-mono text-[9px] border ${typeBadge.border} ${typeBadge.bg} ${typeBadge.color}`,
                        children: typeBadge.label
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        className: `font-mono text-[9px] border ${cfg.border} ${cfg.bg} ${cfg.color}`,
                        children: cfg.label
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono text-white/30", children: new Date(
                      Number(entry.sealedAt) / 1e6
                    ).toLocaleDateString() })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono uppercase tracking-widest text-white/30", children: entry.achievementType.replace(/([A-Z])/g, " $1").trim() }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/15", children: "·" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/25", children: entry.source })
                ] })
              ] })
            ]
          }
        )
      ]
    }
  );
}
function RecognitionTimeline() {
  var _a, _b;
  const { identity, isAuthenticated } = useInternetIdentity();
  const { profile } = useStudent();
  const principal = (identity == null ? void 0 : identity.getPrincipal()) ?? null;
  const { data: timeline = [], isLoading } = useRecognitionTimeline(principal);
  const firstName = ((_b = (_a = profile == null ? void 0 : profile.name) == null ? void 0 : _a.split(" ")) == null ? void 0 : _b[0]) ?? "Explorer";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "recognition_timeline.page",
      className: "portal-enter min-h-screen max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-8",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/achievements",
              "data-ocid": "recognition_timeline.back_link",
              className: "inline-flex items-center gap-2 text-xs font-mono text-white/40 hover:text-white/70 transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-3.5 w-3.5" }),
                " Back to Achievements"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.4 },
              className: "rounded-2xl p-6 relative overflow-hidden",
              style: {
                background: "linear-gradient(135deg, rgba(251,191,36,0.12) 0%, rgba(12,14,28,0.88) 100%)",
                border: "1px solid rgba(251,191,36,0.28)",
                boxShadow: "0 16px 64px rgba(0,0,0,0.50), inset 0 1px 0 rgba(251,191,36,0.10)",
                backdropFilter: "blur(24px) saturate(200%)",
                WebkitBackdropFilter: "blur(24px) saturate(200%)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "pointer-events-none absolute -top-10 -right-10 h-48 w-48 rounded-full blur-3xl",
                    style: { background: "rgba(251,191,36,0.12)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative space-y-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    EddiOrb,
                    {
                      mode: "REFLECT",
                      size: "sm",
                      label: "EDDI — Recognition Mode"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl",
                        style: {
                          background: "rgba(251,191,36,0.18)",
                          border: "1px solid rgba(251,191,36,0.40)",
                          boxShadow: "0 0 24px rgba(251,191,36,0.25)"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          History,
                          {
                            className: "h-7 w-7",
                            style: { color: "rgb(251,191,36)" }
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "inline-flex items-center gap-2 rounded-full px-3 py-0.5 mb-1",
                          style: {
                            background: "rgba(251,191,36,0.12)",
                            border: "1px solid rgba(251,191,36,0.25)"
                          },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "font-mono text-[9px] font-bold uppercase tracking-widest",
                              style: { color: "rgb(251,191,36)" },
                              children: "ACHV · K-12 Story"
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-black text-white/95", children: isAuthenticated ? `${firstName}'s Recognition Story` : "Recognition Story" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/50 mt-0.5", children: "Every achievement, grade K–12 · permanently sealed" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, y: 4 },
                      animate: { opacity: 1, y: 0 },
                      transition: { delay: 0.35, duration: 0.4 },
                      className: "rounded-xl px-4 py-3 flex items-start gap-3",
                      style: {
                        background: "rgba(251,191,36,0.06)",
                        border: "1px solid rgba(251,191,36,0.15)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "mt-0.5 h-5 w-5 shrink-0 rounded-full flex items-center justify-center",
                            style: {
                              background: "rgba(251,191,36,0.18)",
                              boxShadow: "0 0 10px rgba(251,191,36,0.30)"
                            },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Star,
                              {
                                className: "h-3 w-3",
                                style: { color: "rgb(251,191,36)" }
                              }
                            )
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-amber-200/70 leading-relaxed", children: "EDDI has tracked your recognition journey from your first session. Every achievement sealed here follows you from K through 12." })
                      ]
                    }
                  )
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            "data-ocid": "recognition_timeline.timeline_section",
            className: "space-y-0",
            children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                "data-ocid": "recognition_timeline.timeline_section.loading_state",
                className: "space-y-5",
                children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-11 w-11 rounded-full shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 flex-1 rounded-2xl" })
                ] }, i))
              }
            ) : timeline.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 8 },
                animate: { opacity: 1, y: 0 },
                "data-ocid": "recognition_timeline.timeline_section.empty_state",
                className: "rounded-2xl p-10 flex flex-col items-center gap-5 text-center",
                style: {
                  background: "linear-gradient(135deg, rgba(251,191,36,0.07) 0%, rgba(12,14,28,0.80) 100%)",
                  border: "1px solid rgba(251,191,36,0.18)",
                  backdropFilter: "blur(16px)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "flex h-16 w-16 items-center justify-center rounded-2xl",
                      style: {
                        background: "rgba(251,191,36,0.12)",
                        border: "1px solid rgba(251,191,36,0.25)",
                        boxShadow: "0 0 24px rgba(251,191,36,0.15)"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-8 w-8", style: { color: "rgb(251,191,36)" } })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-bold text-white/80", children: "Your story is just beginning" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/40 leading-relaxed max-w-sm", children: "Every lesson you complete writes a chapter here. Alfredo Medina Hernandez of Ferris High School won a national award that arrived in a packet one day — his teachers saw what the system missed. EduAI is built so the system sees you first." })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/dashboard",
                      "data-ocid": "recognition_timeline.empty_state.cta_link",
                      className: "rounded-xl px-5 py-2.5 text-xs font-bold transition-smooth hover:opacity-90",
                      style: {
                        background: "rgba(251,191,36,0.15)",
                        border: "1px solid rgba(251,191,36,0.35)",
                        color: "rgb(251,191,36)"
                      },
                      children: "Start Learning"
                    }
                  )
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0", children: timeline.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              TimelineEntry,
              {
                entry,
                index: i,
                isLast: i === timeline.length - 1
              },
              entry.id
            )) })
          }
        ),
        !isLoading && timeline.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            "data-ocid": "recognition_timeline.legend_section",
            className: "glass-sm rounded-2xl p-5 space-y-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[9px] uppercase tracking-widest text-white/30", children: "Recognition Tiers" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
                {
                  key: "sovereign",
                  desc: "RCGN_T ≥ F(11)=89 — Gold celebration"
                },
                { key: "hot", desc: "Gold · Recent mastery, HOT zone" },
                { key: "warm", desc: "Silver · WARM zone memory" },
                { key: "cold", desc: "Bronze · Sealed in COLD/FROZEN" }
              ].map(({ key, desc }) => {
                const cfg = ZONE_BADGE[key];
                const Icon = cfg.icon;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Icon,
                    {
                      className: `h-3.5 w-3.5 shrink-0 mt-0.5 ${cfg.color}`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/40 leading-snug", children: desc })
                ] }, key);
              }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8 px-5 pb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-amber-400 font-mono text-xs tracking-widest uppercase mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "◈" }),
            " Scholarship Opportunities"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass border border-amber-500/20 rounded-xl p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-amber-300/80 text-sm", children: "Scholarships unlock when you reach mastery threshold F(10)=55." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-xs mt-2", children: "Keep earning recognition across subjects — each achievement brings you closer to national scholarship eligibility." })
          ] })
        ] })
      ]
    }
  );
}
export {
  RecognitionTimeline as default
};
