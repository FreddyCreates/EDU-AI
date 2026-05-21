import type { Subject } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const SUBJECT_CONFIG: Record<
  string,
  {
    emoji: string;
    gradient: string;
    accent: string;
    borderClass: string;
    textClass: string;
  }
> = {
  mathematics: {
    emoji: "🔢",
    gradient: "from-[oklch(0.55_0.18_250)]/20 to-[oklch(0.55_0.18_250)]/5",
    accent: "bg-[oklch(0.55_0.18_250)]/15 border-[oklch(0.55_0.18_250)]/30",
    borderClass:
      "border-[oklch(0.55_0.18_250)]/30 hover:border-[oklch(0.55_0.18_250)]/60",
    textClass: "text-[oklch(0.4_0.2_250)] dark:text-[oklch(0.7_0.18_250)]",
  },
  math: {
    emoji: "🔢",
    gradient: "from-[oklch(0.55_0.18_250)]/20 to-[oklch(0.55_0.18_250)]/5",
    accent: "bg-[oklch(0.55_0.18_250)]/15 border-[oklch(0.55_0.18_250)]/30",
    borderClass:
      "border-[oklch(0.55_0.18_250)]/30 hover:border-[oklch(0.55_0.18_250)]/60",
    textClass: "text-[oklch(0.4_0.2_250)] dark:text-[oklch(0.7_0.18_250)]",
  },
  "english language arts": {
    emoji: "📖",
    gradient: "from-[oklch(0.6_0.15_145)]/20 to-[oklch(0.6_0.15_145)]/5",
    accent: "bg-[oklch(0.6_0.15_145)]/15 border-[oklch(0.6_0.15_145)]/30",
    borderClass:
      "border-[oklch(0.6_0.15_145)]/30 hover:border-[oklch(0.6_0.15_145)]/60",
    textClass: "text-[oklch(0.38_0.14_145)] dark:text-[oklch(0.68_0.15_145)]",
  },
  english: {
    emoji: "📖",
    gradient: "from-[oklch(0.6_0.15_145)]/20 to-[oklch(0.6_0.15_145)]/5",
    accent: "bg-[oklch(0.6_0.15_145)]/15 border-[oklch(0.6_0.15_145)]/30",
    borderClass:
      "border-[oklch(0.6_0.15_145)]/30 hover:border-[oklch(0.6_0.15_145)]/60",
    textClass: "text-[oklch(0.38_0.14_145)] dark:text-[oklch(0.68_0.15_145)]",
  },
  science: {
    emoji: "🔬",
    gradient: "from-[oklch(0.55_0.18_300)]/20 to-[oklch(0.55_0.18_300)]/5",
    accent: "bg-[oklch(0.55_0.18_300)]/15 border-[oklch(0.55_0.18_300)]/30",
    borderClass:
      "border-[oklch(0.55_0.18_300)]/30 hover:border-[oklch(0.55_0.18_300)]/60",
    textClass: "text-[oklch(0.4_0.16_300)] dark:text-[oklch(0.7_0.18_300)]",
  },
  "social studies": {
    emoji: "🌍",
    gradient: "from-[oklch(0.72_0.18_84)]/20 to-[oklch(0.72_0.18_84)]/5",
    accent: "bg-[oklch(0.72_0.18_84)]/15 border-[oklch(0.72_0.18_84)]/30",
    borderClass:
      "border-[oklch(0.72_0.18_84)]/30 hover:border-[oklch(0.72_0.18_84)]/60",
    textClass: "text-[oklch(0.42_0.16_75)] dark:text-[oklch(0.72_0.18_84)]",
  },
  history: {
    emoji: "🏛️",
    gradient: "from-[oklch(0.65_0.15_60)]/20 to-[oklch(0.65_0.15_60)]/5",
    accent: "bg-[oklch(0.65_0.15_60)]/15 border-[oklch(0.65_0.15_60)]/30",
    borderClass:
      "border-[oklch(0.65_0.15_60)]/30 hover:border-[oklch(0.65_0.15_60)]/60",
    textClass: "text-[oklch(0.42_0.14_60)] dark:text-[oklch(0.7_0.15_60)]",
  },
  geography: {
    emoji: "🗺️",
    gradient: "from-[oklch(0.58_0.14_190)]/20 to-[oklch(0.58_0.14_190)]/5",
    accent: "bg-[oklch(0.58_0.14_190)]/15 border-[oklch(0.58_0.14_190)]/30",
    borderClass:
      "border-[oklch(0.58_0.14_190)]/30 hover:border-[oklch(0.58_0.14_190)]/60",
    textClass: "text-[oklch(0.38_0.13_190)] dark:text-[oklch(0.65_0.14_190)]",
  },
  art: {
    emoji: "🎨",
    gradient: "from-[oklch(0.65_0.2_0)]/20 to-[oklch(0.65_0.2_0)]/5",
    accent: "bg-[oklch(0.65_0.2_0)]/15 border-[oklch(0.65_0.2_0)]/30",
    borderClass:
      "border-[oklch(0.65_0.2_0)]/30 hover:border-[oklch(0.65_0.2_0)]/60",
    textClass: "text-[oklch(0.42_0.18_0)] dark:text-[oklch(0.7_0.2_0)]",
  },
  music: {
    emoji: "🎵",
    gradient: "from-[oklch(0.58_0.2_310)]/20 to-[oklch(0.58_0.2_310)]/5",
    accent: "bg-[oklch(0.58_0.2_310)]/15 border-[oklch(0.58_0.2_310)]/30",
    borderClass:
      "border-[oklch(0.58_0.2_310)]/30 hover:border-[oklch(0.58_0.2_310)]/60",
    textClass: "text-[oklch(0.4_0.18_310)] dark:text-[oklch(0.7_0.2_310)]",
  },
  "physical education": {
    emoji: "⚽",
    gradient: "from-[oklch(0.65_0.2_55)]/20 to-[oklch(0.65_0.2_55)]/5",
    accent: "bg-[oklch(0.65_0.2_55)]/15 border-[oklch(0.65_0.2_55)]/30",
    borderClass:
      "border-[oklch(0.65_0.2_55)]/30 hover:border-[oklch(0.65_0.2_55)]/60",
    textClass: "text-[oklch(0.42_0.18_55)] dark:text-[oklch(0.7_0.2_55)]",
  },
  pe: {
    emoji: "⚽",
    gradient: "from-[oklch(0.65_0.2_55)]/20 to-[oklch(0.65_0.2_55)]/5",
    accent: "bg-[oklch(0.65_0.2_55)]/15 border-[oklch(0.65_0.2_55)]/30",
    borderClass:
      "border-[oklch(0.65_0.2_55)]/30 hover:border-[oklch(0.65_0.2_55)]/60",
    textClass: "text-[oklch(0.42_0.18_55)] dark:text-[oklch(0.7_0.2_55)]",
  },
  "computer science": {
    emoji: "💻",
    gradient: "from-[oklch(0.62_0.18_220)]/20 to-[oklch(0.62_0.18_220)]/5",
    accent: "bg-[oklch(0.62_0.18_220)]/15 border-[oklch(0.62_0.18_220)]/30",
    borderClass:
      "border-[oklch(0.62_0.18_220)]/30 hover:border-[oklch(0.62_0.18_220)]/60",
    textClass: "text-[oklch(0.4_0.16_220)] dark:text-[oklch(0.7_0.18_220)]",
  },
  technology: {
    emoji: "💻",
    gradient: "from-[oklch(0.62_0.18_220)]/20 to-[oklch(0.62_0.18_220)]/5",
    accent: "bg-[oklch(0.62_0.18_220)]/15 border-[oklch(0.62_0.18_220)]/30",
    borderClass:
      "border-[oklch(0.62_0.18_220)]/30 hover:border-[oklch(0.62_0.18_220)]/60",
    textClass: "text-[oklch(0.4_0.16_220)] dark:text-[oklch(0.7_0.18_220)]",
  },
  spanish: {
    emoji: "🌮",
    gradient: "from-[oklch(0.72_0.2_95)]/20 to-[oklch(0.72_0.2_95)]/5",
    accent: "bg-[oklch(0.72_0.2_95)]/15 border-[oklch(0.72_0.2_95)]/30",
    borderClass:
      "border-[oklch(0.72_0.2_95)]/30 hover:border-[oklch(0.72_0.2_95)]/60",
    textClass: "text-[oklch(0.44_0.18_95)] dark:text-[oklch(0.72_0.2_95)]",
  },
  health: {
    emoji: "💚",
    gradient: "from-[oklch(0.65_0.18_130)]/20 to-[oklch(0.65_0.18_130)]/5",
    accent: "bg-[oklch(0.65_0.18_130)]/15 border-[oklch(0.65_0.18_130)]/30",
    borderClass:
      "border-[oklch(0.65_0.18_130)]/30 hover:border-[oklch(0.65_0.18_130)]/60",
    textClass: "text-[oklch(0.4_0.16_130)] dark:text-[oklch(0.68_0.18_130)]",
  },
  electives: {
    emoji: "✨",
    gradient: "from-[oklch(0.5_0.16_270)]/20 to-[oklch(0.5_0.16_270)]/5",
    accent: "bg-[oklch(0.5_0.16_270)]/15 border-[oklch(0.5_0.16_270)]/30",
    borderClass:
      "border-[oklch(0.5_0.16_270)]/30 hover:border-[oklch(0.5_0.16_270)]/60",
    textClass: "text-[oklch(0.38_0.14_270)] dark:text-[oklch(0.68_0.16_270)]",
  },
};

const DEFAULT_CONFIG = {
  emoji: "📝",
  gradient: "from-primary/15 to-primary/5",
  accent: "bg-primary/10 border-primary/20",
  borderClass: "border-primary/20 hover:border-primary/50",
  textClass: "text-primary",
};

function getSubjectConfig(name: string) {
  const lower = name.toLowerCase();
  return SUBJECT_CONFIG[lower] ?? DEFAULT_CONFIG;
}

/** Nearest Fibonacci floor — mastery displayed conservatively */
function fibFloor(n: number): number {
  const fibs = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
  let best = 1;
  for (const f of fibs) {
    if (f <= n) best = f;
    else break;
  }
  return best;
}

interface SubjectCardProps {
  subject: Subject;
  onClick?: () => void;
  className?: string;
  index?: number;
  mastery?: number;
  staggerDelay?: number;
}

export function SubjectCard({
  subject,
  onClick,
  className,
  index = 1,
  mastery,
  staggerDelay = 0,
}: SubjectCardProps) {
  const config = getSubjectConfig(subject.name);
  // Mastery floored to nearest Fibonacci value for honest display
  const masteryDisplay = mastery !== undefined ? fibFloor(mastery) : null;
  // Progress bar width: clamp to max 89 (Fibonacci) percent for visual cap
  const progressPct =
    masteryDisplay !== null ? Math.min(masteryDisplay, 89) : 0;

  return (
    <button
      type="button"
      data-ocid={`subject.card.${index}`}
      onClick={onClick}
      className={cn(
        "group relative w-full text-left rounded-2xl overflow-hidden cursor-pointer",
        "glass-max animate-card-slide-in glass-shimmer transition-all duration-300",
        "hover:-translate-y-1 hover:scale-[1.01] active:scale-[0.98]",
        className,
      )}
      style={{ ["--stagger" as string]: staggerDelay }}
    >
      {/* Gradient tint overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-60",
          config.gradient,
        )}
      />

      <div className="relative p-4 sm:p-5">
        {/* Subject icon */}
        <div
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-2xl text-3xl mb-3",
            "glass-sm transition-transform duration-200 group-hover:scale-110",
          )}
        >
          {config.emoji}
        </div>

        <h3
          className={cn(
            "font-display font-bold text-sm leading-tight mb-1",
            config.textClass,
          )}
        >
          {subject.name}
        </h3>

        <div className="flex items-center justify-between mt-2">
          <Badge
            variant="secondary"
            className="text-[10px] font-medium px-1.5 py-0 h-4 glass-sm border-0"
          >
            {subject.gradeLevel}
          </Badge>
          <ArrowRight
            className={cn(
              "h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity",
              config.textClass,
            )}
          />
        </div>

        {/* Fibonacci-floored progress bar */}
        {masteryDisplay !== null && (
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">
                Mastery
              </span>
              <span
                className={cn(
                  "text-[10px] font-mono font-bold",
                  config.textClass,
                )}
              >
                F({masteryDisplay})
              </span>
            </div>
            <div className="h-1 w-full rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${progressPct}%`,
                  background: `linear-gradient(90deg, ${config.textClass.includes("oklch") ? "oklch(0.6 0.15 260)" : "oklch(0.62 0.2 260)"}, currentColor)`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </button>
  );
}
