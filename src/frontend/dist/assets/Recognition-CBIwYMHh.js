import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { E as EddiOrb } from "./EddiOrb-BVFxfmXd.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { i as createLucideIcon, d as useInternetIdentity, a as Award, Z as Zap, S as Skeleton, b as Star, B as BookOpen, k as Shield, X } from "./index-BivnQ6bB.js";
import { a as useSovereignPassport, b as useAutoSeal } from "./use-passport-VGmcZtEk.js";
import { u as useRecognitionFlags, a as useAchievements, b as useRcgnThreshold } from "./use-recognition-CcUiZsvr.js";
import { u as useStudent } from "./use-student-czSOKqJy.js";
import { L as Link } from "./router-D6GUppNf.js";
import { C as ChevronLeft } from "./chevron-left-pbzTE56t.js";
import { m as motion, A as AnimatePresence } from "./motion-BK2wxCtX.js";
import { S as Sparkles } from "./sparkles-C3IEEH24.js";
import { T as Trophy } from "./trophy-WhoS-b_2.js";
import { S as Snowflake, W as Wind } from "./wind-BgciCYMn.js";
import { F as Flame } from "./flame-DBscWOFv.js";
import { E as ExternalLink } from "./external-link-YoAHtQNH.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./query-8urnerR0.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
      key: "143wyd"
    }
  ],
  ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", key: "1itne7" }],
  ["rect", { x: "6", y: "14", width: "12", height: "8", rx: "1", key: "1ue0tg" }]
];
const Printer = createLucideIcon("printer", __iconNode);
const PROGRAM_META = {
  NSHSS: {
    icon: "🏅",
    color: "text-amber-300",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10"
  },
  UIL: {
    icon: "🎯",
    color: "text-sky-300",
    border: "border-sky-500/30",
    bg: "bg-sky-500/10"
  },
  AMC: {
    icon: "📐",
    color: "text-violet-300",
    border: "border-violet-500/30",
    bg: "bg-violet-500/10"
  },
  JSHS: {
    icon: "🔬",
    color: "text-emerald-300",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10"
  }
};
const PATTERN_LABELS = {
  PerfectScore: { label: "Perfect Score", color: "text-amber-300" },
  SustainedMastery: { label: "Sustained Mastery", color: "text-sky-300" },
  SubjectExcellence: { label: "Subject Excellence", color: "text-violet-300" },
  PaceAnomaly: { label: "Pace Anomaly", color: "text-emerald-300" }
};
const ZONE_CONFIG = {
  hot: {
    icon: Flame,
    label: "HOT",
    color: "text-orange-300",
    border: "border-orange-500/30",
    bg: "bg-orange-500/10"
  },
  warm: {
    icon: Wind,
    label: "WARM",
    color: "text-amber-300",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10"
  },
  cold: {
    icon: BookOpen,
    label: "COLD",
    color: "text-sky-300",
    border: "border-sky-500/30",
    bg: "bg-sky-500/10"
  },
  frozen: {
    icon: Snowflake,
    label: "FROZEN",
    color: "text-indigo-300",
    border: "border-indigo-500/30",
    bg: "bg-indigo-500/10"
  }
};
function FlagCard({ flag, index }) {
  const patternMeta = PATTERN_LABELS[flag.pattern] ?? {
    label: flag.pattern,
    color: "text-white/70"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: {
        delay: index * 0.08,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1]
      },
      "data-ocid": `recognition.flag_card.${index + 1}`,
      className: "rounded-2xl p-5 space-y-4 relative overflow-hidden",
      style: {
        background: "linear-gradient(135deg, rgba(251,191,36,0.09) 0%, rgba(12,14,28,0.82) 100%)",
        border: "1px solid rgba(251,191,36,0.22)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.40), inset 0 1px 0 rgba(251,191,36,0.08)",
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "pointer-events-none absolute -top-8 -right-8 h-36 w-36 rounded-full blur-3xl",
            style: { background: "rgba(251,191,36,0.08)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                  style: {
                    background: "rgba(251,191,36,0.15)",
                    border: "1px solid rgba(251,191,36,0.30)",
                    boxShadow: "0 0 12px rgba(251,191,36,0.15)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Trophy,
                    {
                      className: "h-5 w-5",
                      style: { color: "rgb(251,191,36)" }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-base text-white/90 truncate", children: flag.subject }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-xs font-mono ${patternMeta.color}`, children: patternMeta.label })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-1 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  className: "font-mono text-xs border",
                  style: {
                    background: "rgba(251,191,36,0.15)",
                    borderColor: "rgba(251,191,36,0.30)",
                    color: "rgb(251,191,36)"
                  },
                  children: [
                    Number(flag.masteryScore),
                    "% mastery"
                  ]
                }
              ),
              flag.sealed && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "text-[9px] font-mono border-emerald-500/30 text-emerald-300",
                  children: "SEALED"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono uppercase tracking-widest text-white/30 mb-2", children: "Eligible Programs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: flag.eligiblePrograms.map((prog) => {
            const meta = PROGRAM_META[prog.name] ?? {
              icon: "⭐",
              color: "text-white/70",
              border: "border-white/10",
              bg: "bg-white/5"
            };
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": `recognition.program_card.${prog.name}`,
                className: `rounded-xl border ${meta.border} ${meta.bg} p-3 space-y-1`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: meta.icon }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `font-display font-bold text-sm ${meta.color}`, children: prog.name })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-white/50 leading-snug", children: prog.description }),
                  prog.url && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "a",
                    {
                      href: prog.url,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      "data-ocid": `recognition.program_link.${prog.name}`,
                      className: `inline-flex items-center gap-1 text-[10px] font-semibold ${meta.color} hover:opacity-75 transition-opacity`,
                      children: [
                        "Learn more ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-2.5 w-2.5" })
                      ]
                    }
                  )
                ]
              },
              prog.name
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-white/30 font-mono mt-3", children: [
            "Detected:",
            " ",
            new Date(Number(flag.detectedAt) / 1e6).toLocaleDateString(),
            " · Flag ID: ",
            flag.id.slice(0, 8),
            "…"
          ] })
        ] })
      ]
    }
  );
}
function PassportPreviewModal({
  open,
  onClose,
  name,
  score,
  achievement
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "fixed inset-0 z-[300] flex items-center justify-center px-4",
      style: { background: "rgba(0,0,0,0.72)" },
      onClick: onClose,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { scale: 0.9, y: 16, opacity: 0 },
          animate: { scale: 1, y: 0, opacity: 1 },
          exit: { scale: 0.92, opacity: 0 },
          transition: { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] },
          "data-ocid": "recognition.passport_preview_modal",
          className: "relative max-w-sm w-full rounded-3xl p-8 space-y-6",
          style: {
            background: "linear-gradient(135deg, rgba(251,191,36,0.15) 0%, rgba(12,14,28,0.96) 100%)",
            border: "1px solid rgba(251,191,36,0.35)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.70), 0 0 60px rgba(251,191,36,0.15)",
            backdropFilter: "blur(24px) saturate(200%)",
            WebkitBackdropFilter: "blur(24px) saturate(200%)"
          },
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "recognition.passport_preview_modal.close_button",
                onClick: onClose,
                "aria-label": "Close passport preview",
                className: "absolute top-4 right-4 rounded-full p-1.5 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white/80 transition-colors",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex h-16 w-16 items-center justify-center rounded-2xl",
                  style: {
                    background: "rgba(251,191,36,0.18)",
                    border: "1px solid rgba(251,191,36,0.40)",
                    boxShadow: "0 0 30px rgba(251,191,36,0.30)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Sparkles,
                    {
                      className: "h-8 w-8",
                      style: { color: "rgb(251,191,36)" }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-mono text-[9px] font-bold uppercase tracking-widest block",
                    style: { color: "rgb(251,191,36)" },
                    children: "Sovereign Passport · Sealed"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-black text-white/95", children: name })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-2xl p-5 space-y-3",
                style: {
                  background: "rgba(251,191,36,0.06)",
                  border: "1px solid rgba(251,191,36,0.18)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-white/40 uppercase tracking-widest", children: "RCGN Score" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-black text-amber-300 text-lg", children: score })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-white/8" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-white/40 uppercase tracking-widest block mb-1", children: "Latest Achievement" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/80 font-medium leading-snug", children: achievement })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-white/30 leading-relaxed", children: "This achievement is permanently sealed in your sovereign passport and follows you from today through graduation." })
          ]
        }
      )
    }
  ) });
}
function ShareModal({
  open,
  onClose,
  name,
  achievement,
  school,
  score
}) {
  const today = (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "fixed inset-0 z-[300] flex items-center justify-center px-4",
      style: { background: "rgba(0,0,0,0.80)" },
      onClick: onClose,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { scale: 0.9, y: 16, opacity: 0 },
          animate: { scale: 1, y: 0, opacity: 1 },
          exit: { scale: 0.92, opacity: 0 },
          transition: { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] },
          "data-ocid": "recognition.share_modal",
          className: "relative max-w-md w-full space-y-4",
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": "recognition.share_modal.close_button",
                onClick: onClose,
                "aria-label": "Close share card",
                className: "absolute -top-10 right-0 flex items-center gap-1.5 text-xs font-mono text-white/40 hover:text-white/70 transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }),
                  " Close"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                id: "achievement-print-card",
                className: "rounded-3xl p-8 space-y-6 text-center",
                style: {
                  background: "linear-gradient(135deg, rgba(251,191,36,0.18) 0%, rgba(12,14,28,0.98) 100%)",
                  border: "2px solid rgba(251,191,36,0.40)",
                  boxShadow: "0 32px 80px rgba(0,0,0,0.70), 0 0 60px rgba(251,191,36,0.18)",
                  backdropFilter: "blur(24px) saturate(200%)",
                  WebkitBackdropFilter: "blur(24px) saturate(200%)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "font-mono text-[9px] font-bold uppercase tracking-widest",
                        style: { color: "rgb(251,191,36)" },
                        children: "EduAI · Sovereign Recognition"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-px mx-auto w-24",
                        style: { background: "rgba(251,191,36,0.35)" }
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-black text-white/95", children: name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-amber-200/70", children: school })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "rounded-2xl p-5 space-y-2",
                      style: {
                        background: "rgba(251,191,36,0.08)",
                        border: "1px solid rgba(251,191,36,0.22)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-white/40 uppercase tracking-widest", children: "Achievement" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-lg text-white/90 leading-snug", children: achievement }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-sm font-black text-amber-300", children: [
                          "RCGN Score: ",
                          score
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/30", children: today }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "font-mono text-[9px] font-bold uppercase tracking-widest",
                        style: { color: "rgba(251,191,36,0.5)" },
                        children: "EduAI Sovereign Recognition · Permanently Sealed"
                      }
                    )
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": "recognition.share_modal.print_button",
                onClick: () => window.print(),
                className: "w-full flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-semibold text-sm transition-all duration-200 hover:opacity-90",
                style: {
                  background: "rgba(251,191,36,0.15)",
                  border: "1px solid rgba(251,191,36,0.35)",
                  color: "rgb(251,191,36)",
                  boxShadow: "0 0 24px rgba(251,191,36,0.15)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "h-4 w-4" }),
                  "Print / Save Achievement Card"
                ]
              }
            )
          ]
        }
      )
    }
  ) });
}
function RecognitionPage() {
  var _a, _b;
  const { identity, isAuthenticated } = useInternetIdentity();
  const { profile } = useStudent();
  const principal = (identity == null ? void 0 : identity.getPrincipal()) ?? null;
  const { data: flags = [], isLoading: flagsLoading } = useRecognitionFlags(principal);
  const { data: achievements = [], isLoading: achievementsLoading } = useAchievements(principal);
  const { data: rcgnT = 0n } = useRcgnThreshold(principal);
  const rcgnThreshold = Number(rcgnT);
  const firstName = ((_b = (_a = profile == null ? void 0 : profile.name) == null ? void 0 : _a.split(" ")) == null ? void 0 : _b[0]) ?? "Explorer";
  useSovereignPassport();
  const autoSeal = useAutoSeal();
  const [passportModalOpen, setPassportModalOpen] = reactExports.useState(false);
  const [shareModalOpen, setShareModalOpen] = reactExports.useState(false);
  const [sealLoading, setSealLoading] = reactExports.useState(false);
  const heroFlag = flags[0] ?? null;
  const heroAchievement = achievements[0];
  async function handleCarryForward() {
    if (!heroFlag) return;
    setSealLoading(true);
    try {
      await autoSeal.mutateAsync({
        summary: `Recognition: ${heroFlag.subject} — ${heroFlag.pattern}`,
        engineUsed: "RCGN",
        subject: heroFlag.subject,
        gradeLevel: (profile == null ? void 0 : profile.gradeLevel) ? String(profile.gradeLevel) : "Unknown"
      });
      setPassportModalOpen(true);
    } finally {
      setSealLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "recognition.page",
      className: "portal-enter min-h-screen max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          PassportPreviewModal,
          {
            open: passportModalOpen,
            onClose: () => setPassportModalOpen(false),
            name: (profile == null ? void 0 : profile.name) ?? firstName,
            score: rcgnThreshold,
            achievement: (heroAchievement == null ? void 0 : heroAchievement.description) ?? (heroFlag == null ? void 0 : heroFlag.subject) ?? "National Academic Excellence"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ShareModal,
          {
            open: shareModalOpen,
            onClose: () => setShareModalOpen(false),
            name: (profile == null ? void 0 : profile.name) ?? firstName,
            achievement: (heroAchievement == null ? void 0 : heroAchievement.description) ?? (heroFlag == null ? void 0 : heroFlag.subject) ?? "National Academic Excellence",
            school: "EduAI School",
            score: rcgnThreshold
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/dashboard",
              "data-ocid": "recognition.back_link",
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
              "data-ocid": "recognition.hero_section",
              className: "rounded-2xl p-6 relative overflow-hidden",
              style: {
                background: "linear-gradient(135deg, rgba(251,191,36,0.12) 0%, rgba(12,14,28,0.85) 100%)",
                border: "1px solid rgba(251,191,36,0.25)",
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
                          background: "rgba(251,191,36,0.20)",
                          border: "1px solid rgba(251,191,36,0.40)",
                          boxShadow: "0 0 24px rgba(251,191,36,0.25)"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Award,
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
                              children: "RCGN · Sovereign Recognition Engine"
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-black text-white/95", children: isAuthenticated ? `${firstName}'s Recognition` : "Recognition" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/50 mt-0.5", children: "National academic program eligibility · Sovereign ACHV vault" })
                    ] })
                  ] }),
                  isAuthenticated && heroFlag && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, y: 6 },
                      animate: { opacity: 1, y: 0 },
                      transition: { delay: 0.3 },
                      className: "flex flex-wrap gap-3 pt-1",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            "data-ocid": "recognition.carry_forward_button",
                            disabled: sealLoading,
                            onClick: handleCarryForward,
                            className: "flex items-center gap-2 rounded-2xl px-5 py-2.5 font-semibold text-sm transition-all duration-200 hover:opacity-90 disabled:opacity-50",
                            style: {
                              background: "rgba(251,191,36,0.18)",
                              border: "1px solid rgba(251,191,36,0.40)",
                              color: "rgb(251,191,36)",
                              boxShadow: "0 0 24px rgba(251,191,36,0.20)"
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
                              sealLoading ? "Sealing…" : "Carry it Forward"
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            "data-ocid": "recognition.share_excellence_button",
                            onClick: () => setShareModalOpen(true),
                            className: "flex items-center gap-2 rounded-2xl px-5 py-2.5 font-semibold text-sm transition-all duration-200 hover:opacity-90",
                            style: {
                              background: "rgba(255,255,255,0.05)",
                              border: "1px solid rgba(255,255,255,0.15)",
                              color: "rgba(255,255,255,0.80)"
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "h-4 w-4" }),
                              "Share My Excellence"
                            ]
                          }
                        )
                      ]
                    }
                  )
                ] })
              ]
            }
          )
        ] }),
        isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.section,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.12 },
            "data-ocid": "recognition.rcgn_threshold_section",
            className: "rounded-2xl p-5 space-y-3",
            style: {
              background: "linear-gradient(135deg, rgba(251,191,36,0.08) 0%, rgba(12,14,28,0.80) 100%)",
              border: "1px solid rgba(251,191,36,0.20)",
              backdropFilter: "blur(16px)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4 text-amber-400" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] font-bold uppercase tracking-widest text-amber-400", children: "RCGN_T · Recognition Threshold" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "font-display text-lg font-black",
                    style: {
                      color: rcgnThreshold >= 89 ? "rgb(251,191,36)" : rcgnThreshold >= 55 ? "rgb(251,191,36)" : "rgba(255,255,255,0.6)"
                    },
                    children: [
                      rcgnThreshold,
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/30 text-sm font-mono", children: "/89" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-3 w-full rounded-full bg-white/5 overflow-hidden", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-full rounded-full transition-all duration-700",
                      style: {
                        width: `${Math.min(100, rcgnThreshold / 89 * 100)}%`,
                        background: rcgnThreshold >= 89 ? "linear-gradient(90deg, rgb(251,191,36), rgb(253,224,130))" : rcgnThreshold >= 55 ? "linear-gradient(90deg, rgba(251,191,36,0.7), rgba(251,191,36,0.9))" : "linear-gradient(90deg, rgba(251,191,36,0.4), rgba(251,191,36,0.6))",
                        boxShadow: rcgnThreshold >= 55 ? "0 0 12px rgba(251,191,36,0.4)" : "none"
                      }
                    }
                  ),
                  [55, 89].map((tick) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute top-0 h-full w-px bg-white/20",
                      style: { left: `${tick / 89 * 100}%` }
                    },
                    tick
                  ))
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[9px] font-mono text-white/30", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: rcgnThreshold >= 55 ? "text-amber-400" : "", children: "F(10)=55 flag zone" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: rcgnThreshold >= 89 ? "text-amber-300 font-bold" : "",
                      children: "F(11)=89 gold"
                    }
                  )
                ] })
              ] }),
              rcgnThreshold >= 55 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 pt-1", children: rcgnThreshold >= 89 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "🏆" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-amber-300", children: "You've crossed the gold threshold! NOMS is preparing your nomination packet." })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: "🎯" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-amber-200/80", children: "You're in the recognition flag zone. Keep mastering subjects to reach F(11)=89." })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/nominations",
                  "data-ocid": "recognition.nomination_cta_link",
                  className: "inline-flex items-center gap-2 text-xs font-bold rounded-xl px-4 py-2 transition-smooth hover:opacity-90",
                  style: {
                    background: "rgba(251,191,36,0.12)",
                    border: "1px solid rgba(251,191,36,0.28)",
                    color: "rgb(251,191,36)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-3.5 w-3.5" }),
                    "View Nominations"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "recognition.flags_section", className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4", style: { color: "rgb(251,191,36)" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-sm font-bold text-white/80", children: "Recognition Flags" }),
            !flagsLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: "font-mono text-xs border",
                style: {
                  background: "rgba(251,191,36,0.12)",
                  borderColor: "rgba(251,191,36,0.25)",
                  color: "rgb(251,191,36)"
                },
                children: flags.length
              }
            )
          ] }),
          flagsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "data-ocid": "recognition.flags_section.loading_state",
              className: "space-y-4",
              children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 rounded-2xl" }, i))
            }
          ) : flags.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "recognition.flags_section.empty_state",
              className: "glass rounded-2xl p-10 flex flex-col items-center gap-4 text-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl", children: "🔍" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-white/70", children: "No recognition flags yet" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/40 mt-1", children: "Keep learning — the RCGN engine monitors your performance automatically." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/dashboard",
                    "data-ocid": "recognition.flags_section.cta_link",
                    className: "rounded-xl px-4 py-2 text-xs font-bold text-[oklch(0.78_0.22_200)] border border-[rgba(0,210,255,0.3)] bg-[rgba(0,210,255,0.08)] hover:bg-[rgba(0,210,255,0.15)] transition-smooth",
                    children: "Continue Learning"
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: flags.map((flag, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(FlagCard, { flag, index: i }, flag.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            "data-ocid": "recognition.achievements_section",
            className: "space-y-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 text-violet-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-sm font-bold text-white/80", children: "Achievement History" }),
                !achievementsLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "font-mono text-xs border-violet-500/30 text-violet-300",
                    children: achievements.length
                  }
                )
              ] }),
              achievementsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  "data-ocid": "recognition.achievements_section.loading_state",
                  className: "space-y-3",
                  children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }, i))
                }
              ) : achievements.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": "recognition.achievements_section.empty_state",
                  className: "glass rounded-2xl p-8 flex flex-col items-center gap-3 text-center",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl", children: "🏆" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-white/60", children: "Achievements will appear here" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/30", children: "Earned as you complete sessions, quizzes, and mastery milestones." })
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: achievements.map((achv, i) => {
                const zoneCfg = ZONE_CONFIG[achv.zone] ?? ZONE_CONFIG.cold;
                const ZoneIcon = zoneCfg.icon;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, x: -8 },
                    animate: { opacity: 1, x: 0 },
                    transition: { delay: i * 0.05 },
                    "data-ocid": `recognition.achievement_item.${i + 1}`,
                    className: `glass-sm rounded-xl border ${zoneCfg.border} ${zoneCfg.bg} p-4 flex items-center gap-3`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: `flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${zoneCfg.border}`,
                          style: { background: "rgba(255,255,255,0.03)" },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoneIcon, { className: `h-4 w-4 ${zoneCfg.color}` })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-0.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-white/85 truncate", children: achv.description }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Badge,
                            {
                              className: `shrink-0 text-[9px] font-mono border ${zoneCfg.border} ${zoneCfg.bg} ${zoneCfg.color}`,
                              children: zoneCfg.label
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-white/40", children: achv.achievementType.replace(/([A-Z])/g, " $1").trim() }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/30", children: new Date(
                            Number(achv.sealedAt) / 1e6
                          ).toLocaleDateString() })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Zap,
                        {
                          className: `h-3.5 w-3.5 shrink-0 ${zoneCfg.color} opacity-60`
                        }
                      )
                    ]
                  },
                  achv.id
                );
              }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "recognition.programs_section", className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4 text-white/40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-sm font-bold text-white/80", children: "About the Programs" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
            {
              name: "NSHSS",
              full: "National Society of High School Scholars",
              desc: "Recognizes top academic achievers nationally. Invitation-only. Covers all subjects."
            },
            {
              name: "UIL",
              full: "University Interscholastic League",
              desc: "Texas statewide academic competition across 14 subjects. All grade levels."
            },
            {
              name: "AMC",
              full: "American Mathematics Competitions",
              desc: "MAA-sponsored series identifying exceptional math talent nationally."
            },
            {
              name: "JSHS",
              full: "Junior Science and Humanities Symposium",
              desc: "DoD-funded national research competition. Fully sponsored travel and recognition."
            }
          ].map((prog, i) => {
            const meta = PROGRAM_META[prog.name];
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 8 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { delay: i * 0.07 },
                "data-ocid": `recognition.program_info.${i + 1}`,
                className: `glass-sm rounded-xl border ${(meta == null ? void 0 : meta.border) ?? "border-white/10"} p-4 space-y-1.5`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: (meta == null ? void 0 : meta.icon) ?? "⭐" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: `font-display font-bold text-sm ${(meta == null ? void 0 : meta.color) ?? "text-white/80"}`,
                        children: prog.name
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] text-white/30 font-mono", children: [
                      "— ",
                      prog.full
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/50 leading-relaxed", children: prog.desc })
                ]
              },
              prog.name
            );
          }) })
        ] })
      ]
    }
  );
}
export {
  RecognitionPage as default
};
