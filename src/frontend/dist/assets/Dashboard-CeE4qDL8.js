import { j as jsxRuntimeExports, r as reactExports } from "./vendor-1quNMNNh.js";
import { c as cn, A as AgentRole, a as Award, b as Star, d as useInternetIdentity, e as useIntelligence, f as useActor, L as LogIn, S as Skeleton, B as BookOpen, Z as Zap, g as Activity, X, h as createActor } from "./index-BivnQ6bB.js";
import { E as EddiOrb } from "./EddiOrb-BVFxfmXd.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { A as ArrowRight } from "./arrow-right-CsqnM8Ko.js";
import { L as Link, d as useNavigate } from "./router-D6GUppNf.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { T as Trophy } from "./trophy-WhoS-b_2.js";
import { C as ChevronRight } from "./chevron-right-neFioPkE.js";
import { u as useAdaptiveWorkflow } from "./use-adaptive-B-_9L1Vr.js";
import { u as useAgents } from "./use-agents-YLCyuBjV.js";
import { u as useAllSubjects } from "./use-curriculum-D8crsBID.js";
import { u as usePlseState } from "./use-entanglements-B-bwtovY.js";
import { u as usePassportStats } from "./use-passport-VGmcZtEk.js";
import { u as useRecognitionFlags } from "./use-recognition-CcUiZsvr.js";
import { u as useSession } from "./use-session-DOOtnplD.js";
import { u as useStudent } from "./use-student-czSOKqJy.js";
import { a as useQuery } from "./query-8urnerR0.js";
import { S as Sparkles } from "./sparkles-C3IEEH24.js";
import { B as Brain } from "./brain-BiTGGu73.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
const ROLE_LABELS = {
  [AgentRole.explainer]: "Explainer",
  [AgentRole.quizmaster]: "Quizmaster",
  [AgentRole.encourager]: "Encourager",
  [AgentRole.guide]: "Guide",
  [AgentRole.curator]: "Curator",
  [AgentRole.assessor]: "Assessor"
};
function fibFloor$1(n) {
  const fibs = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987];
  let best = 1;
  for (const f of fibs) {
    if (f <= n) best = f;
    else break;
  }
  return best;
}
function AgentCard({
  agent,
  isActive,
  onClick,
  className,
  portal = "student",
  stagger = 0
}) {
  const nameKey = agent.name.toLowerCase();
  const themeMap = {
    sage: {
      accent: "rgba(0,210,255,0.25)",
      glow: "rgba(0,210,255,0.15)",
      badgeBg: "rgba(0,210,255,0.12)",
      glowHover: "0 0 32px rgba(0,210,255,0.25), 0 8px 32px rgba(0,0,0,0.5)"
    },
    quill: {
      accent: "rgba(255,185,0,0.25)",
      glow: "rgba(255,185,0,0.15)",
      badgeBg: "rgba(255,185,0,0.12)",
      glowHover: "0 0 32px rgba(255,185,0,0.25), 0 8px 32px rgba(0,0,0,0.5)"
    },
    spark: {
      accent: "rgba(0,220,130,0.25)",
      glow: "rgba(0,220,130,0.15)",
      badgeBg: "rgba(0,220,130,0.12)",
      glowHover: "0 0 32px rgba(0,220,130,0.25), 0 8px 32px rgba(0,0,0,0.5)"
    },
    nova: {
      accent: "rgba(160,100,255,0.25)",
      glow: "rgba(160,100,255,0.15)",
      badgeBg: "rgba(160,100,255,0.12)",
      glowHover: "0 0 32px rgba(160,100,255,0.25), 0 8px 32px rgba(0,0,0,0.5)"
    }
  };
  const PORTAL_GLOW_MAP = {
    student: "rgba(0,210,255,0.2)",
    teacher: "rgba(160,100,255,0.2)",
    principal: "rgba(255,185,0,0.2)",
    it: "rgba(0,220,130,0.2)"
  };
  const theme = themeMap[nameKey] ?? {
    accent: "rgba(100,140,255,0.25)",
    glow: "rgba(100,140,255,0.15)",
    badgeBg: "rgba(100,140,255,0.12)"
  };
  const portalGlow = PORTAL_GLOW_MAP[portal] ?? theme.glow;
  const cohDisplay = agent.coherenceScore ? fibFloor$1(agent.coherenceScore) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      "data-ocid": `agent.card.${agent.id}`,
      tabIndex: 0,
      onClick,
      onKeyDown: (e) => e.key === "Enter" && (onClick == null ? void 0 : onClick()),
      className: cn(
        "glass-max animate-card-slide-in glass-shimmer rounded-2xl cursor-pointer transition-all duration-300 text-left w-full group",
        "hover:-translate-y-1 hover:scale-[1.01]",
        isActive && "ring-1",
        className
      ),
      style: {
        borderColor: isActive ? theme.accent : "rgba(255,255,255,0.13)",
        boxShadow: isActive ? `0 8px 32px rgba(0,0,0,0.5), 0 0 32px ${theme.glow}, inset 0 1px 0 rgba(255,255,255,0.1)` : void 0,
        ["--stagger"]: stagger
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl",
                "glass-sm transition-all duration-300 group-hover:scale-110 animate-glow-cycle"
              ),
              style: { borderColor: theme.accent, background: theme.badgeBg },
              children: agent.emoji
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-base leading-tight", children: agent.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "px-2 py-0.5 rounded-full text-xs font-medium text-foreground/80",
                  style: {
                    background: theme.badgeBg,
                    border: `1px solid ${theme.accent}`
                  },
                  children: ROLE_LABELS[agent.role]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm text-muted-foreground leading-snug", children: agent.tagline })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-3 border-t border-white/5 flex items-center gap-3", children: [
          cohDisplay !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 animate-metric-breathe", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "h-1.5 w-1.5 rounded-full animate-data-stream",
                style: { background: theme.accent }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground", children: "COH" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-[10px] font-mono font-bold",
                style: { color: theme.accent },
                children: cohDisplay
              }
            )
          ] }),
          agent.sessionCount !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground", children: "Sessions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-[10px] font-mono font-bold",
                style: { color: portalGlow },
                children: Number(agent.sessionCount)
              }
            )
          ] }),
          isActive && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 ml-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-1.5 w-1.5 rounded-full animate-pulse",
                style: { background: theme.accent }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs font-medium",
                style: { color: theme.accent },
                children: "Active"
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
const SUBJECT_CONFIG = {
  mathematics: {
    emoji: "🔢",
    gradient: "from-[oklch(0.55_0.18_250)]/20 to-[oklch(0.55_0.18_250)]/5",
    accent: "bg-[oklch(0.55_0.18_250)]/15 border-[oklch(0.55_0.18_250)]/30",
    borderClass: "border-[oklch(0.55_0.18_250)]/30 hover:border-[oklch(0.55_0.18_250)]/60",
    textClass: "text-[oklch(0.4_0.2_250)] dark:text-[oklch(0.7_0.18_250)]"
  },
  math: {
    emoji: "🔢",
    gradient: "from-[oklch(0.55_0.18_250)]/20 to-[oklch(0.55_0.18_250)]/5",
    accent: "bg-[oklch(0.55_0.18_250)]/15 border-[oklch(0.55_0.18_250)]/30",
    borderClass: "border-[oklch(0.55_0.18_250)]/30 hover:border-[oklch(0.55_0.18_250)]/60",
    textClass: "text-[oklch(0.4_0.2_250)] dark:text-[oklch(0.7_0.18_250)]"
  },
  "english language arts": {
    emoji: "📖",
    gradient: "from-[oklch(0.6_0.15_145)]/20 to-[oklch(0.6_0.15_145)]/5",
    accent: "bg-[oklch(0.6_0.15_145)]/15 border-[oklch(0.6_0.15_145)]/30",
    borderClass: "border-[oklch(0.6_0.15_145)]/30 hover:border-[oklch(0.6_0.15_145)]/60",
    textClass: "text-[oklch(0.38_0.14_145)] dark:text-[oklch(0.68_0.15_145)]"
  },
  english: {
    emoji: "📖",
    gradient: "from-[oklch(0.6_0.15_145)]/20 to-[oklch(0.6_0.15_145)]/5",
    accent: "bg-[oklch(0.6_0.15_145)]/15 border-[oklch(0.6_0.15_145)]/30",
    borderClass: "border-[oklch(0.6_0.15_145)]/30 hover:border-[oklch(0.6_0.15_145)]/60",
    textClass: "text-[oklch(0.38_0.14_145)] dark:text-[oklch(0.68_0.15_145)]"
  },
  science: {
    emoji: "🔬",
    gradient: "from-[oklch(0.55_0.18_300)]/20 to-[oklch(0.55_0.18_300)]/5",
    accent: "bg-[oklch(0.55_0.18_300)]/15 border-[oklch(0.55_0.18_300)]/30",
    borderClass: "border-[oklch(0.55_0.18_300)]/30 hover:border-[oklch(0.55_0.18_300)]/60",
    textClass: "text-[oklch(0.4_0.16_300)] dark:text-[oklch(0.7_0.18_300)]"
  },
  "social studies": {
    emoji: "🌍",
    gradient: "from-[oklch(0.72_0.18_84)]/20 to-[oklch(0.72_0.18_84)]/5",
    accent: "bg-[oklch(0.72_0.18_84)]/15 border-[oklch(0.72_0.18_84)]/30",
    borderClass: "border-[oklch(0.72_0.18_84)]/30 hover:border-[oklch(0.72_0.18_84)]/60",
    textClass: "text-[oklch(0.42_0.16_75)] dark:text-[oklch(0.72_0.18_84)]"
  },
  history: {
    emoji: "🏛️",
    gradient: "from-[oklch(0.65_0.15_60)]/20 to-[oklch(0.65_0.15_60)]/5",
    accent: "bg-[oklch(0.65_0.15_60)]/15 border-[oklch(0.65_0.15_60)]/30",
    borderClass: "border-[oklch(0.65_0.15_60)]/30 hover:border-[oklch(0.65_0.15_60)]/60",
    textClass: "text-[oklch(0.42_0.14_60)] dark:text-[oklch(0.7_0.15_60)]"
  },
  geography: {
    emoji: "🗺️",
    gradient: "from-[oklch(0.58_0.14_190)]/20 to-[oklch(0.58_0.14_190)]/5",
    accent: "bg-[oklch(0.58_0.14_190)]/15 border-[oklch(0.58_0.14_190)]/30",
    borderClass: "border-[oklch(0.58_0.14_190)]/30 hover:border-[oklch(0.58_0.14_190)]/60",
    textClass: "text-[oklch(0.38_0.13_190)] dark:text-[oklch(0.65_0.14_190)]"
  },
  art: {
    emoji: "🎨",
    gradient: "from-[oklch(0.65_0.2_0)]/20 to-[oklch(0.65_0.2_0)]/5",
    accent: "bg-[oklch(0.65_0.2_0)]/15 border-[oklch(0.65_0.2_0)]/30",
    borderClass: "border-[oklch(0.65_0.2_0)]/30 hover:border-[oklch(0.65_0.2_0)]/60",
    textClass: "text-[oklch(0.42_0.18_0)] dark:text-[oklch(0.7_0.2_0)]"
  },
  music: {
    emoji: "🎵",
    gradient: "from-[oklch(0.58_0.2_310)]/20 to-[oklch(0.58_0.2_310)]/5",
    accent: "bg-[oklch(0.58_0.2_310)]/15 border-[oklch(0.58_0.2_310)]/30",
    borderClass: "border-[oklch(0.58_0.2_310)]/30 hover:border-[oklch(0.58_0.2_310)]/60",
    textClass: "text-[oklch(0.4_0.18_310)] dark:text-[oklch(0.7_0.2_310)]"
  },
  "physical education": {
    emoji: "⚽",
    gradient: "from-[oklch(0.65_0.2_55)]/20 to-[oklch(0.65_0.2_55)]/5",
    accent: "bg-[oklch(0.65_0.2_55)]/15 border-[oklch(0.65_0.2_55)]/30",
    borderClass: "border-[oklch(0.65_0.2_55)]/30 hover:border-[oklch(0.65_0.2_55)]/60",
    textClass: "text-[oklch(0.42_0.18_55)] dark:text-[oklch(0.7_0.2_55)]"
  },
  pe: {
    emoji: "⚽",
    gradient: "from-[oklch(0.65_0.2_55)]/20 to-[oklch(0.65_0.2_55)]/5",
    accent: "bg-[oklch(0.65_0.2_55)]/15 border-[oklch(0.65_0.2_55)]/30",
    borderClass: "border-[oklch(0.65_0.2_55)]/30 hover:border-[oklch(0.65_0.2_55)]/60",
    textClass: "text-[oklch(0.42_0.18_55)] dark:text-[oklch(0.7_0.2_55)]"
  },
  "computer science": {
    emoji: "💻",
    gradient: "from-[oklch(0.62_0.18_220)]/20 to-[oklch(0.62_0.18_220)]/5",
    accent: "bg-[oklch(0.62_0.18_220)]/15 border-[oklch(0.62_0.18_220)]/30",
    borderClass: "border-[oklch(0.62_0.18_220)]/30 hover:border-[oklch(0.62_0.18_220)]/60",
    textClass: "text-[oklch(0.4_0.16_220)] dark:text-[oklch(0.7_0.18_220)]"
  },
  technology: {
    emoji: "💻",
    gradient: "from-[oklch(0.62_0.18_220)]/20 to-[oklch(0.62_0.18_220)]/5",
    accent: "bg-[oklch(0.62_0.18_220)]/15 border-[oklch(0.62_0.18_220)]/30",
    borderClass: "border-[oklch(0.62_0.18_220)]/30 hover:border-[oklch(0.62_0.18_220)]/60",
    textClass: "text-[oklch(0.4_0.16_220)] dark:text-[oklch(0.7_0.18_220)]"
  },
  spanish: {
    emoji: "🌮",
    gradient: "from-[oklch(0.72_0.2_95)]/20 to-[oklch(0.72_0.2_95)]/5",
    accent: "bg-[oklch(0.72_0.2_95)]/15 border-[oklch(0.72_0.2_95)]/30",
    borderClass: "border-[oklch(0.72_0.2_95)]/30 hover:border-[oklch(0.72_0.2_95)]/60",
    textClass: "text-[oklch(0.44_0.18_95)] dark:text-[oklch(0.72_0.2_95)]"
  },
  health: {
    emoji: "💚",
    gradient: "from-[oklch(0.65_0.18_130)]/20 to-[oklch(0.65_0.18_130)]/5",
    accent: "bg-[oklch(0.65_0.18_130)]/15 border-[oklch(0.65_0.18_130)]/30",
    borderClass: "border-[oklch(0.65_0.18_130)]/30 hover:border-[oklch(0.65_0.18_130)]/60",
    textClass: "text-[oklch(0.4_0.16_130)] dark:text-[oklch(0.68_0.18_130)]"
  },
  electives: {
    emoji: "✨",
    gradient: "from-[oklch(0.5_0.16_270)]/20 to-[oklch(0.5_0.16_270)]/5",
    accent: "bg-[oklch(0.5_0.16_270)]/15 border-[oklch(0.5_0.16_270)]/30",
    borderClass: "border-[oklch(0.5_0.16_270)]/30 hover:border-[oklch(0.5_0.16_270)]/60",
    textClass: "text-[oklch(0.38_0.14_270)] dark:text-[oklch(0.68_0.16_270)]"
  }
};
const DEFAULT_CONFIG = {
  emoji: "📝",
  gradient: "from-primary/15 to-primary/5",
  accent: "bg-primary/10 border-primary/20",
  borderClass: "border-primary/20 hover:border-primary/50",
  textClass: "text-primary"
};
function getSubjectConfig(name) {
  const lower = name.toLowerCase();
  return SUBJECT_CONFIG[lower] ?? DEFAULT_CONFIG;
}
function fibFloor(n) {
  const fibs = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
  let best = 1;
  for (const f of fibs) {
    if (f <= n) best = f;
    else break;
  }
  return best;
}
function SubjectCard({
  subject,
  onClick,
  className,
  index = 1,
  mastery,
  staggerDelay = 0
}) {
  const config = getSubjectConfig(subject.name);
  const masteryDisplay = mastery !== void 0 ? fibFloor(mastery) : null;
  const progressPct = masteryDisplay !== null ? Math.min(masteryDisplay, 89) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      "data-ocid": `subject.card.${index}`,
      onClick,
      className: cn(
        "group relative w-full text-left rounded-2xl overflow-hidden cursor-pointer",
        "glass-max animate-card-slide-in glass-shimmer transition-all duration-300",
        "hover:-translate-y-1 hover:scale-[1.01] active:scale-[0.98]",
        className
      ),
      style: { ["--stagger"]: staggerDelay },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "absolute inset-0 bg-gradient-to-br opacity-60",
              config.gradient
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative p-4 sm:p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "flex h-14 w-14 items-center justify-center rounded-2xl text-3xl mb-3",
                "glass-sm transition-transform duration-200 group-hover:scale-110"
              ),
              children: config.emoji
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              className: cn(
                "font-display font-bold text-sm leading-tight mb-1",
                config.textClass
              ),
              children: subject.name
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: "text-[10px] font-medium px-1.5 py-0 h-4 glass-sm border-0",
                children: subject.gradeLevel
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ArrowRight,
              {
                className: cn(
                  "h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity",
                  config.textClass
                )
              }
            )
          ] }),
          masteryDisplay !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono text-muted-foreground uppercase tracking-widest", children: "Mastery" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: cn(
                    "text-[10px] font-mono font-bold",
                    config.textClass
                  ),
                  children: [
                    "F(",
                    masteryDisplay,
                    ")"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-full rounded-full bg-white/5 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full rounded-full transition-all duration-700",
                style: {
                  width: `${progressPct}%`,
                  background: `linear-gradient(90deg, ${config.textClass.includes("oklch") ? "oklch(0.6 0.15 260)" : "oklch(0.62 0.2 260)"}, currentColor)`
                }
              }
            ) })
          ] })
        ] })
      ]
    }
  );
}
const PROGRAM_ICONS = {
  NSHSS: "🏅",
  UIL: "🎯",
  AMC: "📐",
  JSHS: "🔬"
};
function RecognitionAlert({ flags, variant }) {
  if (flags.length === 0) return null;
  if (variant === "student") {
    const flag = flags[0];
    const programs = flag.eligiblePrograms.slice(0, 4);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
        "data-ocid": "recognition.student_alert",
        className: "rounded-2xl p-5 relative overflow-hidden animate-shimmer-stream",
        style: {
          background: "linear-gradient(135deg, rgba(251,191,36,0.12) 0%, rgba(12,14,28,0.82) 100%)",
          border: "1px solid rgba(251,191,36,0.28)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(251,191,36,0.10), inset 0 1px 0 rgba(251,191,36,0.10)",
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "pointer-events-none absolute -top-6 -right-6 h-32 w-32 rounded-full blur-3xl",
              style: { background: "rgba(251,191,36,0.10)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                    style: {
                      background: "rgba(251,191,36,0.18)",
                      border: "1px solid rgba(251,191,36,0.35)",
                      boxShadow: "0 0 16px rgba(251,191,36,0.20)"
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
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "font-mono text-[9px] font-bold uppercase tracking-widest",
                        style: { color: "rgb(251,191,36)" },
                        children: "RCGN · Recognition Alert"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2", "aria-hidden": "true", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "animate-ping absolute inline-flex h-full w-full rounded-full opacity-70",
                          style: { background: "rgb(251,191,36)" }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "relative inline-flex rounded-full h-2 w-2",
                          style: { background: "rgb(251,191,36)" }
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-base font-bold text-white/90", children: [
                    flag.subject,
                    " — ",
                    flag.pattern
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  className: "shrink-0 font-mono text-xs border",
                  style: {
                    background: "rgba(251,191,36,0.15)",
                    borderColor: "rgba(251,191,36,0.35)",
                    color: "rgb(251,191,36)"
                  },
                  children: [
                    Number(flag.masteryScore),
                    "%"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/60 mb-4", children: "Sovereign engine detected a recognition-eligible performance pattern. You may qualify for the following national programs:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: programs.map((prog) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold",
                style: {
                  background: "rgba(251,191,36,0.10)",
                  border: "1px solid rgba(251,191,36,0.25)",
                  color: "rgb(253,224,130)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: PROGRAM_ICONS[prog.name] ?? "⭐" }),
                  prog.name
                ]
              },
              prog.name
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/recognition",
                "data-ocid": "recognition.view_details_button",
                className: "inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all hover:opacity-90 active:scale-95",
                style: {
                  background: "linear-gradient(135deg, rgb(234,179,8), rgb(161,98,7))",
                  color: "rgb(0,0,0)",
                  boxShadow: "0 0 16px rgba(251,191,36,0.30)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-3.5 w-3.5" }),
                  "View Details",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5" })
                ]
              }
            )
          ] })
        ]
      }
    );
  }
  const flagged = flags.length;
  const uniqueStudents = new Set(flags.map((f) => f.studentId.toString())).size;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: -12 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
      "data-ocid": "recognition.teacher_alert",
      className: "rounded-2xl p-5 relative overflow-hidden",
      style: {
        background: "linear-gradient(135deg, rgba(251,191,36,0.10) 0%, rgba(12,14,28,0.82) 100%)",
        border: "1px solid rgba(251,191,36,0.25)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(251,191,36,0.08), inset 0 1px 0 rgba(251,191,36,0.08)",
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "pointer-events-none absolute -top-4 -right-4 h-24 w-24 rounded-full blur-3xl",
            style: { background: "rgba(251,191,36,0.08)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                  style: {
                    background: "rgba(251,191,36,0.15)",
                    border: "1px solid rgba(251,191,36,0.30)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4", style: { color: "rgb(251,191,36)" } })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-mono text-[9px] font-bold uppercase tracking-widest mb-0.5",
                    style: { color: "rgb(251,191,36)" },
                    children: "RCGN · Nomination Alert"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-sm text-white/90", children: [
                  uniqueStudents,
                  " student",
                  uniqueStudents !== 1 ? "s" : "",
                  " ",
                  "flagged for recognition"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                className: "shrink-0 font-mono text-xs border",
                style: {
                  background: "rgba(251,191,36,0.15)",
                  borderColor: "rgba(251,191,36,0.30)",
                  color: "rgb(251,191,36)"
                },
                children: [
                  flagged,
                  " flag",
                  flagged !== 1 ? "s" : ""
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 mb-4", children: [
            flags.slice(0, 3).map((flag, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": `recognition.flagged_student.${i + 1}`,
                className: "flex items-center justify-between rounded-xl px-3 py-2",
                style: {
                  background: "rgba(251,191,36,0.06)",
                  border: "1px solid rgba(251,191,36,0.14)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-white/80 truncate", children: [
                      flag.studentId.toString().slice(0, 8),
                      "…"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "outline",
                        className: "text-[9px] font-mono",
                        style: {
                          borderColor: "rgba(251,191,36,0.25)",
                          color: "rgb(253,224,130)"
                        },
                        children: flag.subject
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-[9px] font-mono shrink-0",
                      style: { color: "rgb(251,191,36)" },
                      children: flag.pattern
                    }
                  )
                ]
              },
              flag.id
            )),
            flags.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-white/40 text-center font-mono", children: [
              "+",
              flags.length - 3,
              " more flagged students"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/nominations",
              "data-ocid": "recognition.review_nominations_link",
              className: "inline-flex items-center gap-2 text-xs font-semibold transition-smooth hover:opacity-80",
              style: { color: "rgb(251,191,36)" },
              children: [
                "Review Nominations ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
const ACTION_LABELS = {
  continue_: "Keep Going",
  continue: "Keep Going",
  advance: "Move Ahead",
  remedialReview: "Review",
  quizNow: "Take a Quiz"
};
function SssRing({
  value,
  size = 72
}) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const dash = Math.min(value, 100) / 100 * circ;
  const sssColor = value >= 89 ? "oklch(0.85 0.22 85)" : value >= 34 ? "oklch(0.78 0.22 200)" : "oklch(0.75 0.18 30)";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative flex items-center justify-center",
      style: { width: size, height: size },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: size, height: size, className: "-rotate-90", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: size / 2,
              cy: size / 2,
              r,
              fill: "none",
              strokeWidth: 4,
              className: "stroke-white/5"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: size / 2,
              cy: size / 2,
              r,
              fill: "none",
              strokeWidth: 4,
              stroke: sssColor,
              strokeDasharray: `${dash} ${circ}`,
              strokeLinecap: "round",
              style: { filter: `drop-shadow(0 0 6px ${sssColor}66)` }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute flex flex-col items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "font-display text-sm font-black text-white/90",
              style: { lineHeight: 1 },
              children: Math.round(value)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[8px] text-white/40 uppercase tracking-widest mt-0.5", children: "SSS" })
        ] })
      ]
    }
  );
}
function PhiRing({
  value,
  size = 72,
  label
}) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const dash = value / 100 * circ;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative flex items-center justify-center",
      style: { width: size, height: size },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: size, height: size, className: "-rotate-90", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: size / 2,
              cy: size / 2,
              r,
              fill: "none",
              strokeWidth: 4,
              className: "stroke-white/5"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: size / 2,
              cy: size / 2,
              r,
              fill: "none",
              strokeWidth: 4,
              stroke: "oklch(0.78 0.22 200)",
              strokeDasharray: `${dash} ${circ}`,
              strokeLinecap: "round",
              style: { filter: "drop-shadow(0 0 6px rgba(0,210,255,0.6))" }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute flex flex-col items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "font-display text-sm font-black text-white/90",
              style: { lineHeight: 1 },
              children: [
                value,
                "%"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[8px] text-white/40 uppercase tracking-widest mt-0.5", children: label })
        ] })
      ]
    }
  );
}
function Dashboard() {
  var _a, _b, _c;
  const navigate = useNavigate();
  const { isAuthenticated, login, identity } = useInternetIdentity();
  const principal = identity ? identity.getPrincipal() : null;
  const { data: rcgnFlags } = useRecognitionFlags(principal);
  const { profile, isLoading: profileLoading } = useStudent();
  const { agentsMeta, isLoading: agentsLoading } = useAgents();
  const { data: subjects, isLoading: subjectsLoading } = useAllSubjects();
  const { sessionCount, averageScore } = useSession();
  const { data: passportStats } = usePassportStats();
  const { plseState } = usePlseState();
  const { layoutState, sss, rcgnThreshold } = useIntelligence();
  const { actor } = useActor(createActor);
  const scholarshipQuery = useQuery({
    queryKey: ["my-scholarships"],
    queryFn: () => actor.getMyScholarshipMatches(),
    enabled: !!actor && rcgnThreshold >= 55,
    staleTime: 5 * 60 * 1e3
  });
  const [dismissedNudges, setDismissedNudges] = reactExports.useState(
    /* @__PURE__ */ new Set()
  );
  const gradeLevel = (profile == null ? void 0 : profile.gradeLevel) ?? "";
  const firstSubjectId = ((_a = (subjects ?? [])[0]) == null ? void 0 : _a.id) ?? "";
  const { workflow, isLoading: workflowLoading } = useAdaptiveWorkflow(
    firstSubjectId,
    gradeLevel
  );
  reactExports.useEffect(() => {
    if (!profileLoading && !profile && isAuthenticated) {
      navigate({ to: "/onboarding" });
    }
  }, [profile, profileLoading, navigate, isAuthenticated]);
  const hour = (/* @__PURE__ */ new Date()).getHours();
  const timeGreeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const firstName = ((_c = (_b = profile == null ? void 0 : profile.name) == null ? void 0 : _b.split(" ")) == null ? void 0 : _c[0]) ?? "Explorer";
  const gradeDisplay = (profile == null ? void 0 : profile.gradeLevel) ?? "";
  const sessionCountNum = Number(sessionCount);
  const cohScore = passportStats ? passportStats.compoundScore : 0;
  const dailyGoalPct = Math.min(100, sessionCountNum * 20);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "dashboard.page",
      className: `portal-enter min-h-screen ${layoutState}`,
      children: [
        isAuthenticated && rcgnThreshold >= 55 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -8 },
            animate: { opacity: 1, y: 0 },
            "data-ocid": "dashboard.rcgn_banner",
            className: "mx-4 mt-4 sm:mx-6 rounded-2xl px-5 py-3 flex items-center justify-between gap-3 animate-pulse-fib-8",
            style: {
              background: "linear-gradient(135deg, rgba(251,191,36,0.15) 0%, rgba(12,14,28,0.85) 100%)",
              border: "1px solid rgba(251,191,36,0.35)",
              boxShadow: "0 0 32px rgba(251,191,36,0.15)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-3 w-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex rounded-full h-3 w-3 bg-amber-400" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-sm font-bold",
                    style: { color: "rgb(251,191,36)" },
                    children: rcgnThreshold >= 89 ? "🏆 SOVEREIGN — You've reached national recognition threshold!" : `🎯 Recognition threshold ${rcgnThreshold}/89 — you're in the flag zone!`
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/recognition",
                  "data-ocid": "dashboard.rcgn_banner.view_link",
                  className: "shrink-0 text-xs font-bold px-3 py-1.5 rounded-xl transition-smooth hover:opacity-90",
                  style: {
                    background: "rgba(251,191,36,0.18)",
                    color: "rgb(251,191,36)",
                    border: "1px solid rgba(251,191,36,0.35)"
                  },
                  children: "View →"
                }
              )
            ]
          }
        ),
        !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -8 },
            animate: { opacity: 1, y: 0 },
            "data-ocid": "dashboard.signin_banner",
            className: "glass-portal-student glow-student mx-4 mt-4 sm:mx-6 rounded-2xl px-5 py-3 flex flex-col sm:flex-row items-center justify-between gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[rgba(0,210,255,0.15)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-4 w-4 text-[oklch(0.78_0.22_200)]" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono font-bold uppercase tracking-widest text-[oklch(0.78_0.22_200)]", children: "DEMO MODE" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/60", children: "Sign in to save progress and unlock sovereign intelligence." })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/demo",
                    "data-ocid": "dashboard.try_demo_button",
                    className: "rounded-xl border border-[rgba(0,210,255,0.3)] bg-[rgba(0,210,255,0.08)] px-4 py-2 text-xs font-semibold text-[oklch(0.78_0.22_200)] transition-smooth hover:bg-[rgba(0,210,255,0.15)]",
                    children: "Try Demo"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "dashboard.signin_button",
                    onClick: () => login(),
                    className: "rounded-xl bg-[oklch(0.78_0.22_200)] px-4 py-2 text-xs font-bold text-[oklch(0.07_0.01_260)] transition-smooth hover:opacity-90",
                    children: "Sign In"
                  }
                )
              ] })
            ]
          }
        ),
        rcgnFlags && rcgnFlags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 sm:px-6 mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RecognitionAlert, { flags: rcgnFlags, variant: "student" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-[240px_1fr_280px] gap-0 xl:min-h-screen", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "aside",
            {
              "data-ocid": "dashboard.sidebar",
              className: "xl:min-h-screen glass-max-student xl:border-r xl:border-[rgba(0,210,255,0.12)] p-[21px] space-y-[21px] flex flex-col xl:sticky xl:top-0 xl:h-screen xl:overflow-y-auto",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2.5 w-2.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-[oklch(0.78_0.22_200)] opacity-60" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex rounded-full h-2.5 w-2.5 bg-[oklch(0.78_0.22_200)]" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] font-bold uppercase tracking-widest text-[oklch(0.78_0.22_200)]", children: "STUDENT OS" })
                  ] }),
                  profileLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-32" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20" })
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-base font-black text-white/90 leading-tight", children: firstName }),
                    gradeDisplay && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "mt-1 gap-1 py-0.5 px-2 border-[rgba(0,210,255,0.3)] bg-[rgba(0,210,255,0.08)] text-[oklch(0.78_0.22_200)] text-[9px] font-mono", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-2.5 w-2.5" }),
                      gradeDisplay
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "glass rounded-2xl p-4 flex flex-col items-center gap-3 animate-pulse-fib-8 animate-card-slide-in",
                    style: { "--stagger": 1 },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(PhiRing, { value: dailyGoalPct, label: "Daily Goal" }),
                        isAuthenticated && sss > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(SssRing, { value: sss })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-white/40 text-center uppercase tracking-widest", children: "PHI progress · F(5) sessions" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    "data-ocid": "dashboard.live_session_count",
                    className: "glass-portal-student rounded-2xl p-4 space-y-1 animate-pulse-fib-8 animate-card-slide-in",
                    style: { "--stagger": 2 },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[9px] uppercase tracking-widest text-[oklch(0.78_0.22_200)]/70", children: "Live Sessions" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-3xl font-black text-white/90", children: sessionCountNum }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-white/40 mb-1", children: "today" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.22_200)] animate-pulse" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[9px] text-white/40", children: [
                          averageScore,
                          "% avg score"
                        ] })
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "glass rounded-2xl p-4 space-y-2 flex-1 animate-card-slide-in",
                    style: { "--stagger": 3 },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[9px] uppercase tracking-widest text-white/30", children: "Passport Zones" }),
                      [
                        {
                          label: "HOT",
                          count: passportStats ? Number(passportStats.hotSeeds) : "—",
                          color: "text-orange-300",
                          bg: "bg-orange-500/10",
                          border: "border-orange-500/20"
                        },
                        {
                          label: "WARM",
                          count: passportStats ? Number(passportStats.warmSeeds ?? 0) : "—",
                          color: "text-amber-300",
                          bg: "bg-amber-500/10",
                          border: "border-amber-500/20"
                        },
                        {
                          label: "COLD",
                          count: passportStats ? Number(passportStats.coldSeeds) : "—",
                          color: "text-sky-300",
                          bg: "bg-sky-500/10",
                          border: "border-sky-500/20"
                        },
                        {
                          label: "FROZEN",
                          count: passportStats ? Number(passportStats.frozenSeeds) : "—",
                          color: "text-indigo-300",
                          bg: "bg-indigo-500/10",
                          border: "border-indigo-500/20"
                        }
                      ].map((z) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: `flex items-center justify-between rounded-xl border ${z.border} ${z.bg} px-3 py-1.5`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: `font-mono text-[9px] font-bold uppercase tracking-widest ${z.color}`,
                                children: z.label
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-mono text-sm font-black ${z.color}`, children: z.count })
                          ]
                        },
                        z.label
                      )),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Link,
                        {
                          to: "/passport",
                          className: "block text-center text-[10px] font-mono text-[oklch(0.78_0.22_200)] hover:underline pt-1",
                          children: "Full Passport →"
                        }
                      )
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "p-[21px] space-y-[21px] min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EddiOrb, { mode: "EXPLORE", size: "sm" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.section,
              {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.45 },
                "data-ocid": "dashboard.greeting_section",
                className: "glass-portal-student glass-shimmer rounded-2xl p-6 sm:p-8 relative overflow-hidden",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -top-10 -right-10 h-48 w-48 rounded-full bg-[rgba(0,210,255,0.07)] blur-3xl" }),
                  profileLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-40" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-72" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48" })
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-[rgba(0,210,255,0.3)] bg-[rgba(0,210,255,0.08)] px-3 py-1 mb-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.22_200)] animate-pulse" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] font-bold uppercase tracking-widest text-[oklch(0.78_0.22_200)]", children: "STUDENT OS · SOVEREIGN" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-2xl sm:text-3xl font-black text-white/95 leading-tight", children: [
                        timeGreeting,
                        ", ",
                        firstName,
                        "!"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm text-white/50", children: "Your intelligence compounds — session by session, floor by floor." })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start sm:items-end gap-3", children: [
                      isAuthenticated && cohScore > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          "data-ocid": "dashboard.passport_stats",
                          className: "flex items-center gap-2 flex-wrap",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "glass-sm rounded-full px-3 py-1 text-xs font-mono font-medium text-white/60", children: [
                              passportStats ? Number(passportStats.totalSeeds) : "—",
                              " ",
                              "Seeds"
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "glass-sm rounded-full px-3 py-1 text-xs font-mono font-medium text-[oklch(0.78_0.22_200)]", children: [
                              cohScore.toFixed(2),
                              " COH"
                            ] })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Link,
                        {
                          to: "/study/$subjectId",
                          params: { subjectId: firstSubjectId || "math" },
                          "data-ocid": "dashboard.start_learning_button",
                          className: "inline-flex items-center gap-2 rounded-xl bg-[oklch(0.78_0.22_200)] px-5 py-2.5 text-xs font-bold text-[oklch(0.07_0.01_260)] transition-smooth hover:opacity-90 shadow-[0_0_20px_rgba(0,210,255,0.3)]",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
                            " Start Learning"
                          ]
                        }
                      )
                    ] })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "section",
              {
                "data-ocid": "dashboard.stats_section",
                className: "grid grid-cols-2 lg:grid-cols-4 gap-3",
                children: [
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-5 w-5 text-[oklch(0.78_0.22_200)]" }),
                    label: "Sessions",
                    value: sessionCountNum,
                    sub: "Today",
                    pulse: true
                  },
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-5 w-5 text-amber-300" }),
                    label: "Companions",
                    value: agentsLoading ? "…" : agentsMeta.length,
                    sub: "AI agents",
                    pulse: false
                  },
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-5 w-5 text-white/40" }),
                    label: "Subjects",
                    value: (subjects ?? []).length,
                    sub: gradeDisplay || "K-12",
                    pulse: false
                  },
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-5 w-5 text-[oklch(0.78_0.22_200)]" }),
                    label: "Heartbeat",
                    value: plseState ? `#${Number(plseState.heartbeatCycle)}` : "—",
                    sub: "F(8)=21",
                    pulse: true
                  }
                ].map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 12 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: i * 0.07 },
                    "data-ocid": i === 3 ? "dashboard.eart_heartbeat" : void 0,
                    className: "glass-max-student rounded-2xl px-4 py-4 flex items-center gap-3 transition-glass hover:border-[rgba(0,210,255,0.3)]",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)]", children: [
                        stat.icon,
                        stat.pulse && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-[oklch(0.78_0.22_200)] animate-pulse" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] font-mono uppercase tracking-widest text-white/40", children: stat.label }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-black text-white/90", children: stat.value }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-white/30 truncate", children: stat.sub })
                      ] })
                    ]
                  },
                  stat.label
                ))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "dashboard.plse_section", className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2.5 w-2.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-[oklch(0.78_0.22_200)] opacity-60" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex rounded-full h-2.5 w-2.5 bg-[oklch(0.78_0.22_200)]" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-sm font-bold text-white/80", children: "Live Intelligence" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-[rgba(0,210,255,0.3)] bg-[rgba(0,210,255,0.08)] px-2 py-0.5 text-[9px] font-mono font-bold text-[oklch(0.78_0.22_200)] uppercase tracking-widest", children: "EART" })
              ] }),
              plseState ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  "data-ocid": "dashboard.autn_seed_card",
                  className: "glass-portal-student rounded-2xl px-5 py-4 relative overflow-hidden",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -top-4 -right-4 h-24 w-24 rounded-full bg-[rgba(0,210,255,0.06)] blur-2xl" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative space-y-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] font-bold uppercase tracking-widest text-[oklch(0.78_0.22_200)]/70", children: "AUTN · New Thread" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-[9px] font-mono text-white/30", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.22_200)] animate-pulse" }),
                          "Cycle #",
                          Number(plseState.heartbeatCycle)
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-white/90 leading-snug", children: plseState.lastAutonSeed.concept }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-white/30 font-mono", children: "Seeded autonomously · EART substrate · F(8)=21 cycle interval" })
                    ] })
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": "dashboard.autn_seed_card.loading_state",
                  className: "glass rounded-2xl px-5 py-4",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48 mb-2" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-72" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4 text-[oklch(0.78_0.22_200)]" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-sm font-bold text-white/80", children: [
                    "Your Subjects",
                    gradeDisplay ? ` · ${gradeDisplay}` : ""
                  ] })
                ] }),
                (subjects ?? []).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-white/30 font-mono", children: [
                  (subjects ?? []).length,
                  " loaded"
                ] })
              ] }),
              subjectsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 grid-cols-2 sm:grid-cols-3", children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-2xl" }, i)) }) : (subjects ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": "dashboard.subjects.empty_state",
                  className: "glass rounded-2xl p-8 text-center space-y-3",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl", children: "📚" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-white/70", children: "Subjects loading…" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/30", children: "Engines are initializing. Refresh to try again." })
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "grid gap-3 grid-cols-2 sm:grid-cols-3",
                  "data-ocid": "dashboard.subjects_section",
                  children: (subjects ?? []).map((subject, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/study/$subjectId",
                      params: { subjectId: subject.id },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SubjectCard, { subject, index: idx + 1 })
                    },
                    subject.id
                  ))
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "dashboard.agents_section", className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-4 w-4 text-[oklch(0.78_0.22_200)]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-sm font-bold text-white/80", children: "Your AI Team" })
              ] }),
              agentsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-2xl" }, i)) }) : agentsMeta.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  "data-ocid": "dashboard.agents.empty_state",
                  className: "glass rounded-2xl p-8 text-center",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/30", children: "AI agents are initializing…" })
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-3", children: agentsMeta.map((agent) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/agents/$agentName",
                  params: { agentName: agent.id },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(AgentCard, { agent })
                },
                agent.id
              )) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "aside",
            {
              "data-ocid": "dashboard.right_panel",
              className: "xl:min-h-screen glass-max xl:border-l xl:border-white/5 p-[21px] space-y-[21px] flex flex-col xl:sticky xl:top-0 xl:h-screen xl:overflow-y-auto",
              children: [
                isAuthenticated && firstSubjectId && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    "data-ocid": "dashboard.adaptive_card",
                    className: "glass-portal-student rounded-2xl p-5 space-y-3 relative overflow-hidden",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -bottom-4 -right-4 h-20 w-20 rounded-full bg-[rgba(0,210,255,0.05)] blur-2xl" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-[oklch(0.78_0.22_200)]" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono font-bold uppercase tracking-widest text-[oklch(0.78_0.22_200)]", children: "Adaptive Path" })
                      ] }),
                      workflowLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-3/4" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-full rounded-xl" })
                      ] }) : workflow ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/60 leading-relaxed", children: workflow.reasonPhrase }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[9px] font-mono text-white/30", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Mastery" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[oklch(0.78_0.22_200)]", children: [
                              Math.round(workflow.phiConfidence * 100),
                              "%"
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full rounded-full bg-white/5 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "h-full rounded-full bg-[oklch(0.78_0.22_200)] transition-all duration-700",
                              style: {
                                width: `${Math.round(workflow.phiConfidence * 100)}%`
                              }
                            }
                          ) })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Link,
                          {
                            to: "/study/$subjectId",
                            params: { subjectId: firstSubjectId },
                            "data-ocid": "dashboard.adaptive_card.action_button",
                            className: "block w-full rounded-xl bg-[oklch(0.78_0.22_200)] text-center py-2.5 text-xs font-bold text-[oklch(0.07_0.01_260)] transition-smooth hover:opacity-90",
                            children: ACTION_LABELS[String(workflow.nextAction)] ?? "Continue"
                          }
                        )
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/30", children: "Select a subject for your adaptive path." })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-4 space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[9px] uppercase tracking-widest text-white/30", children: "Live Stats" }),
                  [
                    {
                      label: "Sessions Today",
                      value: sessionCountNum,
                      color: "text-[oklch(0.78_0.22_200)]"
                    },
                    {
                      label: "Avg Score",
                      value: `${averageScore}%`,
                      color: "text-amber-300"
                    },
                    {
                      label: "Total Seeds",
                      value: passportStats ? Number(passportStats.totalSeeds) : "—",
                      color: "text-sky-300"
                    },
                    {
                      label: "COH Score",
                      value: cohScore ? cohScore.toFixed(2) : "—",
                      color: "text-indigo-300"
                    }
                  ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-white/40", children: s.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-mono text-sm font-bold ${s.color}`, children: s.value })
                  ] }, s.label))
                ] }),
                plseState && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    "data-ocid": "dashboard.eart_live",
                    className: "glass-portal-student rounded-2xl p-4 space-y-2 animate-pulse-fib-13",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[9px] uppercase tracking-widest text-[oklch(0.78_0.22_200)]/60", children: "EART Substrate" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-2xl font-black text-white/90", children: [
                        "#",
                        Number(plseState.heartbeatCycle)
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[9px] text-white/30", children: "Heartbeat · F(8)=21 interval" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 pt-1", children: ["AUTN", "META", "GENX", "CURO"].map((eng) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "rounded-full border border-[rgba(0,210,255,0.2)] bg-[rgba(0,210,255,0.06)] px-2 py-0.5 font-mono text-[9px] text-[oklch(0.78_0.22_200)]",
                          children: eng
                        },
                        eng
                      )) })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-4 space-y-2 mt-auto", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[9px] uppercase tracking-widest text-white/30", children: "Quick Nav" }),
                  [
                    { label: "My Learning", to: "/learning" },
                    { label: "All Subjects", to: "/subjects" },
                    { label: "AI Agents", to: "/student/agents" },
                    { label: "Passport", to: "/passport" }
                  ].map((link, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Link,
                    {
                      to: link.to,
                      "data-ocid": `dashboard.nav_link.${i + 1}`,
                      className: "flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2 text-xs font-medium text-white/60 hover:text-[oklch(0.78_0.22_200)] hover:border-[rgba(0,210,255,0.2)] transition-smooth",
                      children: [
                        link.label,
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/20", children: "→" })
                      ]
                    },
                    link.to
                  ))
                ] })
              ]
            }
          )
        ] }),
        scholarshipQuery.data && scholarshipQuery.data.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8 px-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-amber-400 font-mono text-xs tracking-widest uppercase mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "◈" }),
            " Scholarship Opportunities"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: scholarshipQuery.data.map((match, _i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass border border-amber-500/30 rounded-xl p-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/90 text-sm font-medium", children: String(match.programId) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-amber-400 font-mono text-xs shrink-0", children: [
                    Number(match.matchScore),
                    "% match"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-xs mt-1 capitalize", children: String(match.applicationStatus) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/30 text-xs mt-2", children: [
                  "Matched",
                  " ",
                  new Date(
                    Number(match.matchedAt) / 1e6
                  ).toLocaleDateString()
                ] })
              ]
            },
            String(match.id)
          )) })
        ] }),
        plseState && plseState.curiosityQueue.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "data-ocid": "dashboard.curio_queue",
            className: "fixed bottom-6 right-6 z-30 flex flex-col-reverse gap-2 items-end pointer-events-none",
            children: plseState.curiosityQueue.slice(0, 3).map((nudge, idx) => {
              if (dismissedNudges.has(idx)) return null;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, x: 40 },
                  animate: { opacity: 1, x: 0 },
                  transition: { delay: idx * 0.08 },
                  "data-ocid": `dashboard.curio_nudge.item.${idx + 1}`,
                  className: "pointer-events-auto flex items-start gap-2 max-w-xs glass-portal-student rounded-2xl px-4 py-2.5 shadow-lg",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] font-bold uppercase tracking-widest text-[oklch(0.78_0.22_200)] shrink-0 mt-0.5", children: "CURIO" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/80 leading-snug flex-1 min-w-0", children: nudge.prompt }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": `dashboard.curio_nudge.dismiss.${idx + 1}`,
                        className: "shrink-0 ml-1 text-white/30 hover:text-white/70 transition-colors",
                        "aria-label": "Dismiss",
                        onClick: () => setDismissedNudges((prev) => /* @__PURE__ */ new Set([...prev, idx])),
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
                      }
                    )
                  ]
                },
                `nudge-${idx}-${nudge.prompt.slice(0, 10)}`
              );
            })
          }
        )
      ]
    }
  );
}
export {
  Dashboard as default
};
