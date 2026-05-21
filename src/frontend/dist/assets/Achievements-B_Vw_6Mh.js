import { j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { d as useInternetIdentity, o as Layers, a as Award, b as Star, S as Skeleton, p as AchievementZone, B as BookOpen } from "./index-BivnQ6bB.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { a as useAchievements, c as useAllRecognitionFlags, f as useRecognitionTimeline } from "./use-recognition-CcUiZsvr.js";
import { u as useStudent } from "./use-student-czSOKqJy.js";
import { L as Link } from "./router-D6GUppNf.js";
import { C as ChevronLeft } from "./chevron-left-pbzTE56t.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { H as History } from "./history-BfR8vaoT.js";
import { A as ArrowRight } from "./arrow-right-CsqnM8Ko.js";
import { T as Trophy } from "./trophy-WhoS-b_2.js";
import { S as Snowflake, W as Wind } from "./wind-BgciCYMn.js";
import { F as Flame } from "./flame-DBscWOFv.js";
import "./query-8urnerR0.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
const ZONE_CONFIG = {
  [AchievementZone.hot]: {
    icon: Flame,
    label: "HOT",
    color: "text-orange-300",
    border: "border-orange-500/30",
    bg: "bg-orange-500/10",
    glow: "rgba(249,115,22,0.15)"
  },
  [AchievementZone.warm]: {
    icon: Wind,
    label: "WARM",
    color: "text-amber-300",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    glow: "rgba(245,158,11,0.12)"
  },
  [AchievementZone.cold]: {
    icon: BookOpen,
    label: "COLD",
    color: "text-sky-300",
    border: "border-sky-500/30",
    bg: "bg-sky-500/10",
    glow: "rgba(14,165,233,0.12)"
  },
  [AchievementZone.frozen]: {
    icon: Snowflake,
    label: "FROZEN",
    color: "text-indigo-300",
    border: "border-indigo-500/30",
    bg: "bg-indigo-500/10",
    glow: "rgba(99,102,241,0.12)"
  }
};
function AchievementCard({
  achievement,
  index
}) {
  const zoneCfg = ZONE_CONFIG[achievement.zone] ?? ZONE_CONFIG[AchievementZone.cold];
  const ZoneIcon = zoneCfg.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: {
        delay: index * 0.06,
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1]
      },
      "data-ocid": `achievements.item.${index + 1}`,
      className: `rounded-2xl border ${zoneCfg.border} ${zoneCfg.bg} p-5 relative overflow-hidden`,
      style: {
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        boxShadow: `0 8px 32px rgba(0,0,0,0.40), 0 0 24px ${zoneCfg.glow}`
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "pointer-events-none absolute -top-6 -right-6 h-28 w-28 rounded-full blur-3xl",
            style: { background: zoneCfg.glow }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-start gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${zoneCfg.border}`,
              style: { background: "rgba(255,255,255,0.04)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoneIcon, { className: `h-5 w-5 ${zoneCfg.color}` })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-base text-white/90 leading-snug", children: achievement.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: `shrink-0 text-xs font-mono border ${zoneCfg.border} ${zoneCfg.bg} ${zoneCfg.color}`,
                  children: zoneCfg.label
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-white/40 uppercase tracking-widest", children: achievement.achievementType.replace(/([A-Z])/g, " $1").trim() }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/20", children: "·" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/30", children: new Date(
                Number(achievement.sealedAt) / 1e6
              ).toLocaleDateString() }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/20", children: "·" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-white/25", children: achievement.source })
            ] })
          ] })
        ] })
      ]
    }
  );
}
function ZoneStats({ achievements }) {
  const zones = Object.values(AchievementZone);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: zones.map((zone) => {
    const count = achievements.filter((a) => a.zone === zone).length;
    const cfg = ZONE_CONFIG[zone];
    const ZIcon = cfg.icon;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": `achievements.zone_stat.${zone}`,
        className: `glass-sm rounded-xl border ${cfg.border} ${cfg.bg} p-4 flex items-center gap-3`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ZIcon, { className: `h-5 w-5 shrink-0 ${cfg.color}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `font-display text-xl font-black ${cfg.color}`, children: count }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] font-mono text-white/40 uppercase tracking-widest", children: cfg.label })
          ] })
        ]
      },
      zone
    );
  }) });
}
function AchievementsPage() {
  var _a, _b;
  const { identity, isAuthenticated } = useInternetIdentity();
  const { profile } = useStudent();
  const principal = (identity == null ? void 0 : identity.getPrincipal()) ?? null;
  const { data: achievements = [], isLoading } = useAchievements(principal);
  const { data: flags = [] } = useAllRecognitionFlags();
  const { data: timeline = [] } = useRecognitionTimeline(principal);
  const firstName = ((_b = (_a = profile == null ? void 0 : profile.name) == null ? void 0 : _a.split(" ")) == null ? void 0 : _b[0]) ?? "Explorer";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "achievements.page",
      className: "portal-enter min-h-screen max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/dashboard",
              "data-ocid": "achievements.back_link",
              className: "inline-flex items-center gap-2 text-xs font-mono text-white/40 hover:text-white/70 transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-3.5 w-3.5" }),
                " Back to Dashboard"
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
                background: "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(12,14,28,0.85) 100%)",
                border: "1px solid rgba(99,102,241,0.25)",
                boxShadow: "0 16px 64px rgba(0,0,0,0.50), inset 0 1px 0 rgba(99,102,241,0.10)",
                backdropFilter: "blur(24px) saturate(200%)",
                WebkitBackdropFilter: "blur(24px) saturate(200%)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "pointer-events-none absolute -top-10 -right-10 h-48 w-48 rounded-full blur-3xl",
                    style: { background: "rgba(99,102,241,0.10)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl",
                      style: {
                        background: "rgba(99,102,241,0.20)",
                        border: "1px solid rgba(99,102,241,0.40)",
                        boxShadow: "0 0 24px rgba(99,102,241,0.25)"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-7 w-7 text-indigo-400" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "inline-flex items-center gap-2 rounded-full px-3 py-0.5 mb-1",
                        style: {
                          background: "rgba(99,102,241,0.12)",
                          border: "1px solid rgba(99,102,241,0.25)"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] font-bold uppercase tracking-widest text-indigo-300", children: "ACHV · Achievement Vault" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-black text-white/95", children: isAuthenticated ? `${firstName}'s Achievements` : "Achievements" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-white/50 mt-0.5", children: [
                      "Fibonacci-zoned vault · ",
                      achievements.length,
                      " achievement",
                      achievements.length !== 1 ? "s" : "",
                      " sealed"
                    ] })
                  ] })
                ] })
              ]
            }
          )
        ] }),
        !isLoading && achievements.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "achievements.zone_stats_section", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoneStats, { achievements }) }),
        timeline.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.1 },
            "data-ocid": "achievements.k12_timeline_card",
            className: "rounded-xl p-4 flex items-center justify-between gap-4",
            style: {
              background: "rgba(99,102,241,0.08)",
              border: "1px solid rgba(99,102,241,0.22)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "h-5 w-5 text-indigo-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-indigo-200", children: [
                    timeline.length,
                    " milestone",
                    timeline.length !== 1 ? "s" : "",
                    " in your K-12 story"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/40", children: "View your full recognition timeline from K to graduation" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/recognition-timeline",
                  "data-ocid": "achievements.k12_timeline_link",
                  className: "shrink-0 inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl transition-smooth hover:opacity-80 text-indigo-300",
                  children: [
                    "View Story ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
                  ]
                }
              )
            ]
          }
        ),
        flags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.15 },
            "data-ocid": "achievements.recognition_link_card",
            className: "rounded-xl p-4 flex items-center justify-between gap-4",
            style: {
              background: "rgba(251,191,36,0.08)",
              border: "1px solid rgba(251,191,36,0.18)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-5 w-5", style: { color: "rgb(251,191,36)" } }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: "text-sm font-semibold",
                      style: { color: "rgb(253,224,130)" },
                      children: [
                        flags.length,
                        " recognition flag",
                        flags.length !== 1 ? "s" : "",
                        " ",
                        "detected"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/40", children: "You may qualify for national academic programs" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/recognition",
                  "data-ocid": "achievements.view_recognition_link",
                  className: "shrink-0 inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl transition-smooth hover:opacity-80",
                  style: { color: "rgb(251,191,36)" },
                  children: [
                    "View ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-3.5 w-3.5" })
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "achievements.timeline_section", className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 text-indigo-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-sm font-bold text-white/80", children: "Full Achievement Timeline" }),
            !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "font-mono text-xs border-indigo-500/30 text-indigo-300",
                children: achievements.length
              }
            )
          ] }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "data-ocid": "achievements.timeline_section.loading_state",
              className: "space-y-3",
              children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-2xl" }, i))
            }
          ) : achievements.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "achievements.timeline_section.empty_state",
              className: "glass rounded-2xl p-10 flex flex-col items-center gap-4 text-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl", children: "🏆" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-white/70", children: "Your achievement vault is empty" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/40 mt-1", children: "Complete lessons, ace quizzes, and hit mastery milestones — every achievement is permanently sealed here." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/dashboard",
                    "data-ocid": "achievements.empty_state.cta_link",
                    className: "rounded-xl px-4 py-2 text-xs font-bold text-[oklch(0.78_0.22_200)] border border-[rgba(0,210,255,0.3)] bg-[rgba(0,210,255,0.08)] hover:bg-[rgba(0,210,255,0.15)] transition-smooth",
                    children: "Start Learning"
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: achievements.map((achv, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(AchievementCard, { achievement: achv, index: i }, achv.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            "data-ocid": "achievements.zone_legend_section",
            className: "glass-sm rounded-2xl p-5 space-y-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[9px] uppercase tracking-widest text-white/30", children: "Fibonacci Memory Zones" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
                {
                  zone: "HOT",
                  fib: "F(1)",
                  desc: "Last 5 sessions — most active memory",
                  color: "text-orange-300"
                },
                {
                  zone: "WARM",
                  fib: "F(3)",
                  desc: "Last 13 sessions — recent knowledge",
                  color: "text-amber-300"
                },
                {
                  zone: "COLD",
                  fib: "F(5)",
                  desc: "Last 55 sessions — compressed seeds",
                  color: "text-sky-300"
                },
                {
                  zone: "FROZEN",
                  fib: "F(7)",
                  desc: "Beyond 55 — sealed forever in ACHV",
                  color: "text-indigo-300"
                }
              ].map((z) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `font-mono text-xs font-bold ${z.color} w-14 shrink-0`,
                    children: z.zone
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] text-white/30", children: z.fib }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-white/40", children: z.desc })
              ] }, z.zone)) })
            ]
          }
        )
      ]
    }
  );
}
export {
  AchievementsPage as default
};
