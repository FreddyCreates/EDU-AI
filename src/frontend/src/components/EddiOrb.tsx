import { motion } from "motion/react";

export type EddiMode =
  | "EXPLORE"
  | "EXPLAIN"
  | "QUIZ"
  | "REFLECT"
  | "BUILD"
  | "CREATE"
  | "SOVEREIGN"
  | "DEEP"
  | "FIELD"
  | "SUBSTRATE";

type ModeConfig = { color: string; glow: string; label: string };

const modeVars: Record<EddiMode, ModeConfig> = {
  EXPLORE:   { color: "#06b6d4", glow: "rgba(6,182,212,0.4)",   label: "Explore" },
  EXPLAIN:   { color: "#3b82f6", glow: "rgba(59,130,246,0.4)",  label: "Explain" },
  QUIZ:      { color: "#eab308", glow: "rgba(234,179,8,0.4)",   label: "Quiz" },
  REFLECT:   { color: "#a855f7", glow: "rgba(168,85,247,0.4)",  label: "Reflect" },
  BUILD:     { color: "#f97316", glow: "rgba(249,115,22,0.4)",  label: "Build" },
  CREATE:    { color: "#ef4444", glow: "rgba(239,68,68,0.4)",   label: "Create" },
  SOVEREIGN: { color: "#f59e0b", glow: "rgba(245,158,11,0.6)",  label: "Sovereign" },
  // New v26 modes
  DEEP:      { color: "#c084fc", glow: "rgba(192,132,252,0.6)", label: "Deep" },
  FIELD:     { color: "#34d399", glow: "rgba(52,211,153,0.5)",  label: "Field" },
  SUBSTRATE: { color: "#38bdf8", glow: "rgba(56,189,248,0.5)",  label: "Substrate" },
};

// Health ring colours
const HEALTH_COLORS: Record<string, string> = {
  healthy:  "#f59e0b", // gold
  active:   "#34d399", // teal
  dormant:  "#6b7280", // grey
};

const sizePx: Record<string, number> = { sm: 55, md: 89, lg: 144 };

interface EddiOrbProps {
  mode: EddiMode;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  label?: string;
  /** 0-100 field health score; drives the organism health ring */
  fieldScore?: number;
}

export default function EddiOrb({
  mode,
  size = "md",
  interactive = false,
  label,
  fieldScore,
}: EddiOrbProps) {
  const px = sizePx[size];
  const { color, glow, label: modeLabel } = modeVars[mode];

  // Health ring
  const showRing = fieldScore !== undefined;
  const ringColor =
    fieldScore === undefined
      ? HEALTH_COLORS.dormant
      : fieldScore >= 55
        ? HEALTH_COLORS.healthy
        : fieldScore >= 21
          ? HEALTH_COLORS.active
          : HEALTH_COLORS.dormant;

  // Deep / Field modes pulsate faster
  const pulseDuration = mode === "DEEP" || mode === "FIELD" ? 1.5 : 3;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative flex items-center justify-center">
        {/* Organism health ring */}
        {showRing && (
          <motion.div
            animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.06, 1] }}
            transition={{ duration: pulseDuration * 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute rounded-full"
            style={{
              width: px + 16,
              height: px + 16,
              border: `2px solid ${ringColor}`,
              boxShadow: `0 0 12px ${ringColor}55`,
            }}
          />
        )}

        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
          transition={{
            duration: pulseDuration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          whileHover={interactive ? { scale: 1.1 } : {}}
          className="rounded-full border border-white/20 flex items-center justify-center cursor-pointer"
          style={{
            width: px,
            height: px,
            background: `radial-gradient(circle at 30% 30%, ${color}33, ${color}11)`,
            boxShadow: `0 0 ${px / 2}px ${glow}, inset 0 0 ${px / 4}px ${color}22`,
            backdropFilter: "blur(13px)",
          }}
        >
          <div
            className="rounded-full"
            style={{
              width: px * 0.4,
              height: px * 0.4,
              background: `radial-gradient(circle, ${color}aa, ${color}33)`,
            }}
          />
        </motion.div>
      </div>

      <span
        className="text-xs font-medium px-3 py-1 rounded-full border border-white/10"
        style={{ color, background: `${color}11` }}
      >
        {label ?? modeLabel}
      </span>
    </div>
  );
}
