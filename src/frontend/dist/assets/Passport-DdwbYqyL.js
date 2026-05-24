import { j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { E as EddiOrb } from "./EddiOrb-BVFxfmXd.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { B as Button } from "./button-CWs7EcLL.js";
import { i as createLucideIcon, d as useInternetIdentity, L as LogIn, S as Skeleton, G as GraduationCap, b as Star, a as Award } from "./index-BivnQ6bB.js";
import { d as usePassportInsight, a as useSovereignPassport, u as usePassportStats, c as useSSScore } from "./use-passport-VGmcZtEk.js";
import { a as useAchievements } from "./use-recognition-CcUiZsvr.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { S as Sparkles } from "./sparkles-C3IEEH24.js";
import { F as Flame } from "./flame-DBscWOFv.js";
import { S as Snowflake, W as Wind } from "./wind-BgciCYMn.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./query-8urnerR0.js";
import "./router-D6GUppNf.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M5 22h14", key: "ehvnwv" }],
  [
    "path",
    {
      d: "M19.27 13.73A2.5 2.5 0 0 0 17.5 13h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1.5c0-.66-.26-1.3-.73-1.77Z",
      key: "1sy9ra"
    }
  ],
  [
    "path",
    { d: "M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-3-3c-1.66 0-3 1-3 3s1 2 1 3.5V13", key: "cnxgux" }
  ]
];
const Stamp = createLucideIcon("stamp", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }],
  ["path", { d: "m7.9 7.9 2.7 2.7", key: "hpeyl3" }],
  ["circle", { cx: "16.5", cy: "7.5", r: ".5", fill: "currentColor", key: "w0ekpg" }],
  ["path", { d: "m13.4 10.6 2.7-2.7", key: "264c1n" }],
  ["circle", { cx: "7.5", cy: "16.5", r: ".5", fill: "currentColor", key: "nkw3mc" }],
  ["path", { d: "m7.9 16.1 2.7-2.7", key: "p81g5e" }],
  ["circle", { cx: "16.5", cy: "16.5", r: ".5", fill: "currentColor", key: "fubopw" }],
  ["path", { d: "m13.4 13.4 2.7 2.7", key: "abhel3" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
];
const Vault = createLucideIcon("vault", __iconNode);
function formatDate(ts) {
  const ms = typeof ts === "bigint" ? Number(ts) / 1e6 : ts;
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function shortPassportId(id) {
  if (!id || id.length < 5) return `PP-PP-${id.toUpperCase()}`;
  return `PP-PP-${id.slice(0, 5).toUpperCase()}`;
}
const ZONES = [
  {
    key: "hotSeeds",
    label: "HOT",
    icon: Flame,
    color: "text-orange-400",
    border: "border-orange-500/30",
    bg: "bg-orange-500/10",
    shadow: "shadow-[0_0_21px_rgba(249,115,22,0.25)]"
  },
  {
    key: "warmSeeds",
    label: "WARM",
    icon: Wind,
    color: "text-amber-400",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    shadow: "shadow-[0_0_21px_rgba(245,158,11,0.2)]"
  },
  {
    key: "coldSeeds",
    label: "COLD",
    icon: Wind,
    color: "text-sky-400",
    border: "border-sky-500/30",
    bg: "bg-sky-500/10",
    shadow: "shadow-[0_0_21px_rgba(14,165,233,0.2)]"
  },
  {
    key: "frozenSeeds",
    label: "FROZEN",
    icon: Snowflake,
    color: "text-indigo-400",
    border: "border-indigo-500/30",
    bg: "bg-indigo-500/10",
    shadow: "shadow-[0_0_21px_rgba(99,102,241,0.2)]"
  },
  {
    key: "totalSeeds",
    label: "VAULT",
    icon: Vault,
    color: "text-yellow-400",
    border: "border-yellow-500/30",
    bg: "bg-yellow-500/10",
    shadow: "shadow-[0_0_21px_rgba(234,179,8,0.25)]"
  }
];
const ACHIEVEMENT_TYPE_COLORS = {
  mastery: "bg-[rgba(0,210,255,0.12)] text-[oklch(0.78_0.22_200)] border-[rgba(0,210,255,0.25)]",
  recognition: "bg-[rgba(234,179,8,0.12)] text-yellow-400 border-[rgba(234,179,8,0.25)]",
  milestone: "bg-[rgba(147,51,234,0.12)] text-violet-400 border-[rgba(147,51,234,0.25)]",
  nomination: "bg-[rgba(34,197,94,0.12)] text-emerald-400 border-[rgba(34,197,94,0.25)]"
};
function Passport() {
  const { isAuthenticated, login, identity } = useInternetIdentity();
  const principal = (identity == null ? void 0 : identity.getPrincipal()) ?? null;
  const { data: insight } = usePassportInsight(principal);
  const { passport, isLoadingPassport, isFetchingActor } = useSovereignPassport();
  const { data: stats, isLoading: isLoadingStats } = usePassportStats();
  const { data: achievements = [], isLoading: isLoadingAchievements } = useAchievements(principal);
  const { data: sssScore = 0 } = useSSScore();
  const isLoading = isLoadingPassport || isFetchingActor;
  const sssTrajectory = sssScore >= 89 ? "SOVEREIGN" : sssScore >= 34 ? "MASTERY" : sssScore >= 13 ? "GROWING" : sssScore >= 5 ? "BUILDING" : "STRUGGLE";
  const orbMode = sssTrajectory === "SOVEREIGN" ? "SOVEREIGN" : sssTrajectory === "MASTERY" ? "SOVEREIGN" : sssTrajectory === "GROWING" ? "BUILD" : sssTrajectory === "BUILDING" ? "REFLECT" : "EXPLORE";
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "passport.page",
        className: "mx-auto max-w-2xl px-5 py-24 flex flex-col items-center text-center gap-8",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 0.5 },
              className: "flex h-[89px] w-[89px] items-center justify-center rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_0_34px_rgba(0,210,255,0.2)]",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Stamp, { className: "h-10 w-10 text-[oklch(0.78_0.22_200)]" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "Your Sovereign Passport" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/50 max-w-md text-sm leading-relaxed", children: "Your learning journey sealed on-chain. Permanent, sovereign, yours." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              "data-ocid": "passport.login_button",
              onClick: () => login(),
              className: "gap-2 bg-[oklch(0.78_0.22_200)] text-[oklch(0.07_0.01_260)] hover:opacity-90 font-bold h-12 px-8 rounded-xl",
              type: "button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-4 w-4" }),
                "Sign in to Access Your Passport"
              ]
            }
          )
        ]
      }
    );
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "passport.loading_state",
        className: "mx-auto max-w-3xl px-5 py-10 space-y-5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-[89px] w-full rounded-2xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-[89px] rounded-2xl" }, i)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-[144px] w-full rounded-2xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-[200px] w-full rounded-2xl" })
        ]
      }
    );
  }
  if (!passport) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "passport.page",
        className: "mx-auto max-w-xl px-5 py-16 flex flex-col items-center text-center gap-6",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-[89px] w-[89px] items-center justify-center rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Stamp, { className: "h-10 w-10 text-[oklch(0.78_0.22_200)]" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "No passport found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/50 text-sm", children: "Visit the Student portal to create your sovereign passport." })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "passport.page",
      className: "mx-auto max-w-3xl px-5 sm:px-8 py-10 space-y-5",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -13 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4 },
            "data-ocid": "passport.header_card",
            className: "backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-[21px] flex flex-wrap items-center justify-between gap-5",
            style: { boxShadow: "0 0 34px rgba(0,210,255,0.1)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-[55px] w-[55px] shrink-0 items-center justify-center rounded-xl backdrop-blur-md bg-[rgba(0,210,255,0.08)] border border-[rgba(0,210,255,0.2)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-7 w-7 text-[oklch(0.78_0.22_200)]" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-bold text-foreground", children: passport.studentName ?? "Loading..." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-foreground/40", children: shortPassportId(passport.passportId ?? "") })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    "data-ocid": "passport.grade_badge",
                    className: "backdrop-blur-md bg-[rgba(0,210,255,0.08)] border border-[rgba(0,210,255,0.2)] text-[oklch(0.78_0.22_200)] font-semibold",
                    children: passport.gradeLevel ?? "K"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "backdrop-blur-md bg-[rgba(147,51,234,0.08)] border border-[rgba(147,51,234,0.2)] text-violet-400 font-mono text-[10px]", children: "SOVEREIGN" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "data-ocid": "passport.stats_row",
            className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
            children: isLoadingStats ? [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-[89px] rounded-2xl" }, i)) : [
              {
                label: "Total Seeds",
                value: stats ? Number(stats.totalSeeds).toString() : "0",
                icon: Star,
                color: "text-[oklch(0.78_0.22_200)]"
              },
              {
                label: "Compound Score",
                value: stats ? Number(stats.compoundScore).toFixed(2) : "0.00",
                icon: Sparkles,
                color: "text-amber-400"
              },
              {
                label: "Hot Seeds",
                value: stats ? Number(stats.hotSeeds).toString() : "0",
                icon: Flame,
                color: "text-orange-400"
              },
              {
                label: "Frozen Seeds",
                value: stats ? Number(stats.frozenSeeds).toString() : "0",
                icon: Snowflake,
                color: "text-indigo-400"
              }
            ].map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 13 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: i * 0.08, duration: 0.4 },
                "data-ocid": `passport.stat.${i + 1}`,
                className: "backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(stat.icon, { className: `h-4 w-4 ${stat.color}` }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `font-display text-2xl font-bold ${stat.color}`, children: stat.value }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/50 text-xs", children: stat.label })
                ]
              },
              stat.label
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 13 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.2, duration: 0.4 },
            "data-ocid": "passport.memory_zones",
            className: "space-y-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-mono text-xs font-bold text-foreground/40 uppercase tracking-widest px-1", children: "Memory Zones" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-5 gap-3", children: ZONES.map((zone, i) => {
                const ZoneIcon = zone.icon;
                const count = stats ? Number(stats[zone.key]) : 0;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, scale: 0.9 },
                    animate: { opacity: 1, scale: 1 },
                    transition: { delay: 0.1 + i * 0.07, duration: 0.35 },
                    "data-ocid": `passport.zone.${zone.label.toLowerCase()}`,
                    className: `backdrop-blur-md ${zone.bg} border ${zone.border} ${zone.shadow} rounded-2xl p-5 flex flex-col items-center gap-2 text-center`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ZoneIcon, { className: `h-5 w-5 ${zone.color}` }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `font-display text-xl font-bold ${zone.color}`, children: count }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] font-bold text-foreground/40 uppercase tracking-widest", children: zone.label })
                    ]
                  },
                  zone.label
                );
              }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 13 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.3, duration: 0.4 },
            "data-ocid": "passport.eddi_insights",
            className: "backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-[21px]",
            style: { boxShadow: "0 0 21px rgba(147,51,234,0.15)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-[21px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                EddiOrb,
                {
                  mode: (insight == null ? void 0 : insight.orbMode) ?? orbMode,
                  size: "sm"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 flex-1 text-center sm:text-left", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 justify-center sm:justify-start", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-violet-400" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs font-bold text-violet-400 uppercase tracking-widest", children: "EDDI Intelligence State" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-4 justify-center sm:justify-start", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-display text-5xl font-black leading-none",
                      style: {
                        background: "linear-gradient(135deg, oklch(0.86 0.18 85), oklch(0.78 0.22 60))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text"
                      },
                      children: sssScore
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-1 space-y-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "font-mono text-sm font-bold uppercase tracking-widest",
                        style: { color: "oklch(0.86 0.18 85)" },
                        children: sssTrajectory
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] text-foreground/40 uppercase tracking-wider", children: "Intelligence State" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground/60 text-sm leading-relaxed", children: [
                  "Your passport holds",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[oklch(0.78_0.22_200)] font-semibold", children: [
                    stats ? Number(stats.totalSeeds).toString() : "0",
                    " seeds"
                  ] }),
                  ". Current state:",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      style: { color: "oklch(0.86 0.18 85)" },
                      className: "font-semibold",
                      children: sssTrajectory
                    }
                  ),
                  ". Every session compounds toward sovereign mastery."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/30 text-xs font-mono", children: "SSS · PHI-driven · Fibonacci-floored · PRTL_SSSC" })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 13 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.4, duration: 0.4 },
            "data-ocid": "passport.recognition_timeline",
            className: "space-y-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-mono text-xs font-bold text-foreground/40 uppercase tracking-widest px-1", children: "K–12 Recognition Timeline" }),
              isLoadingAchievements ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-[55px] rounded-2xl" }, i)) }) : achievements.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": "passport.timeline.empty_state",
                  className: "backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-[34px] flex flex-col items-center gap-3 text-center",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-8 w-8 text-foreground/20" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/50 text-sm", children: "Your recognition story is just beginning. Keep learning." })
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-[21px] top-0 bottom-0 w-px bg-white/10" }),
                achievements.map((achievement, i) => {
                  const typeKey = String(
                    "achievementType" in achievement ? achievement.achievementType : "milestone"
                  ).toLowerCase();
                  const colorClass = ACHIEVEMENT_TYPE_COLORS[typeKey] ?? ACHIEVEMENT_TYPE_COLORS.milestone;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, x: -13 },
                      whileInView: { opacity: 1, x: 0 },
                      viewport: { once: true },
                      transition: { delay: i * 0.05, duration: 0.35 },
                      "data-ocid": `passport.timeline.item.${i + 1}`,
                      className: "flex items-start gap-5 pl-5",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 mt-4 h-3 w-3 shrink-0 rounded-full bg-[oklch(0.78_0.22_200)] shadow-[0_0_8px_rgba(0,210,255,0.6)]" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 text-sm font-medium", children: String(
                              achievement.description ?? "Achievement unlocked"
                            ) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Badge,
                              {
                                "data-ocid": `passport.timeline.type_badge.${i + 1}`,
                                className: `text-[10px] border ${colorClass}`,
                                children: typeKey.toUpperCase()
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/40 text-xs font-mono", children: formatDate(achievement.sealedAt ?? 0n) })
                        ] })
                      ]
                    },
                    String(achievement.id ?? i)
                  );
                })
              ] })
            ]
          }
        )
      ]
    }
  );
}
export {
  Passport as default
};
