import { AgentRole } from "@/backend";
import { cn } from "@/lib/utils";
import type { AgentMeta } from "@/types";

const ROLE_LABELS: Record<AgentRole, string> = {
  [AgentRole.explainer]: "Explainer",
  [AgentRole.quizmaster]: "Quizmaster",
  [AgentRole.encourager]: "Encourager",
  [AgentRole.guide]: "Guide",
  [AgentRole.curator]: "Curator",
  [AgentRole.assessor]: "Assessor",
};

/** Nearest Fibonacci floor for display */
function fibFloor(n: number): number {
  const fibs = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987];
  let best = 1;
  for (const f of fibs) {
    if (f <= n) best = f;
    else break;
  }
  return best;
}

interface AgentCardProps {
  agent: AgentMeta;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
  portal?: "student" | "teacher" | "principal" | "it";
  stagger?: number;
}

export function AgentCard({
  agent,
  isActive,
  onClick,
  className,
  portal = "student",
  stagger = 0,
}: AgentCardProps) {
  const nameKey = agent.name.toLowerCase();

  const themeMap: Record<
    string,
    { accent: string; glow: string; badgeBg: string; glowHover: string }
  > = {
    sage: {
      accent: "rgba(0,210,255,0.25)",
      glow: "rgba(0,210,255,0.15)",
      badgeBg: "rgba(0,210,255,0.12)",
      glowHover: "0 0 32px rgba(0,210,255,0.25), 0 8px 32px rgba(0,0,0,0.5)",
    },
    quill: {
      accent: "rgba(255,185,0,0.25)",
      glow: "rgba(255,185,0,0.15)",
      badgeBg: "rgba(255,185,0,0.12)",
      glowHover: "0 0 32px rgba(255,185,0,0.25), 0 8px 32px rgba(0,0,0,0.5)",
    },
    spark: {
      accent: "rgba(0,220,130,0.25)",
      glow: "rgba(0,220,130,0.15)",
      badgeBg: "rgba(0,220,130,0.12)",
      glowHover: "0 0 32px rgba(0,220,130,0.25), 0 8px 32px rgba(0,0,0,0.5)",
    },
    nova: {
      accent: "rgba(160,100,255,0.25)",
      glow: "rgba(160,100,255,0.15)",
      badgeBg: "rgba(160,100,255,0.12)",
      glowHover: "0 0 32px rgba(160,100,255,0.25), 0 8px 32px rgba(0,0,0,0.5)",
    },
  };

  const PORTAL_GLOW_MAP: Record<string, string> = {
    student: "rgba(0,210,255,0.2)",
    teacher: "rgba(160,100,255,0.2)",
    principal: "rgba(255,185,0,0.2)",
    it: "rgba(0,220,130,0.2)",
  };

  const theme = themeMap[nameKey] ?? {
    accent: "rgba(100,140,255,0.25)",
    glow: "rgba(100,140,255,0.15)",
    badgeBg: "rgba(100,140,255,0.12)",
    glowHover: "0 0 32px rgba(100,140,255,0.25), 0 8px 32px rgba(0,0,0,0.5)",
  };

  const portalGlow = PORTAL_GLOW_MAP[portal] ?? theme.glow;

  // Clamp COH display to nearest Fibonacci for visual display
  const cohDisplay = agent.coherenceScore
    ? fibFloor(agent.coherenceScore)
    : null;

  return (
    <button
      type="button"
      data-ocid={`agent.card.${agent.id}`}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
      className={cn(
        "glass-max animate-card-slide-in glass-shimmer rounded-2xl cursor-pointer transition-all duration-300 text-left w-full group",
        "hover:-translate-y-1 hover:scale-[1.01]",
        isActive && "ring-1",
        className,
      )}
      style={{
        borderColor: isActive ? theme.accent : "rgba(255,255,255,0.13)",
        boxShadow: isActive
          ? `0 8px 32px rgba(0,0,0,0.5), 0 0 32px ${theme.glow}, inset 0 1px 0 rgba(255,255,255,0.1)`
          : undefined,
        ["--stagger" as string]: stagger,
      }}
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl",
              "glass-sm transition-all duration-300 group-hover:scale-110 animate-glow-cycle",
            )}
            style={{ borderColor: theme.accent, background: theme.badgeBg }}
          >
            {agent.emoji}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-display font-semibold text-foreground text-base leading-tight">
                {agent.name}
              </h3>
              <span
                className="px-2 py-0.5 rounded-full text-xs font-medium text-foreground/80"
                style={{
                  background: theme.badgeBg,
                  border: `1px solid ${theme.accent}`,
                }}
              >
                {ROLE_LABELS[agent.role]}
              </span>
            </div>
            <p className="mt-1.5 text-sm text-muted-foreground leading-snug">
              {agent.tagline}
            </p>
          </div>
        </div>

        {/* Live engine stats row */}
        <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-3">
          {cohDisplay !== null && (
            <div className="flex items-center gap-1.5 animate-metric-breathe">
              <span
                className="h-1.5 w-1.5 rounded-full animate-data-stream"
                style={{ background: theme.accent }}
              />
              <span className="text-[10px] font-mono text-muted-foreground">
                COH
              </span>
              <span
                className="text-[10px] font-mono font-bold"
                style={{ color: theme.accent }}
              >
                {cohDisplay}
              </span>
            </div>
          )}
          {agent.sessionCount !== undefined && (
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-muted-foreground">
                Sessions
              </span>
              <span
                className="text-[10px] font-mono font-bold"
                style={{ color: portalGlow }}
              >
                {Number(agent.sessionCount)}
              </span>
            </div>
          )}
          {isActive && (
            <div className="flex items-center gap-1.5 ml-auto">
              <div
                className="h-1.5 w-1.5 rounded-full animate-pulse"
                style={{ background: theme.accent }}
              />
              <span
                className="text-xs font-medium"
                style={{ color: theme.accent }}
              >
                Active
              </span>
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
