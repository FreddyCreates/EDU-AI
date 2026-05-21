import { createActor } from "@/backend";
import type { Agent } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAllBuilderStats,
  useSonrCheck,
  useSystemDiag,
  useVaultStats,
} from "@/hooks/use-diag";
import {
  useEntanglementStats,
  useEntanglements,
} from "@/hooks/use-entanglements";
import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  BookOpen,
  Brain,
  Database,
  FlaskConical,
  GitFork,
  Heart,
  LayoutGrid,
  Lock,
  Scale,
  Shield,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

const AGENT_ICONS: Record<string, React.ReactNode> = {
  explainer: <BookOpen className="w-5 h-5" />,
  quizmaster: <Brain className="w-5 h-5" />,
  encourager: <Heart className="w-5 h-5" />,
};

const AGENT_COLORS: Record<string, string> = {
  explainer: "text-primary",
  quizmaster: "text-accent-foreground",
  encourager: "text-primary",
};

export default function AdminPage() {
  const { isAuthenticated, login, loginStatus } = useInternetIdentity();

  if (!isAuthenticated) {
    return <AdminLoginPrompt onLogin={login} loginStatus={loginStatus} />;
  }

  return <AdminDashboard />;
}

function AdminLoginPrompt({
  onLogin,
  loginStatus,
}: {
  onLogin: () => void;
  loginStatus: string;
}) {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      data-ocid="admin.login_page"
    >
      <div
        className="glass-xl rounded-3xl p-10 max-w-md w-full text-center space-y-6"
        style={{ borderColor: "oklch(0.68 0.18 280 / 0.25)" }}
      >
        <div className="flex justify-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              background: "oklch(0.68 0.18 280 / 0.15)",
              border: "1px solid oklch(0.68 0.18 280 / 0.35)",
              boxShadow: "0 0 32px oklch(0.68 0.18 280 / 0.2)",
            }}
          >
            <Lock
              className="w-7 h-7"
              style={{ color: "oklch(0.68 0.18 280)" }}
            />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-display font-bold text-foreground tracking-wide">
            ADMIN OS
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Sovereign platform control. Sign in with Internet Identity to access
            system diagnostics, registry, and controls.
          </p>
        </div>
        <div className="glass rounded-2xl p-4 text-left space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Shield
              className="w-4 h-4"
              style={{ color: "oklch(0.68 0.18 280)" }}
            />
            <span>Administrator Access</span>
          </div>
          <ul className="text-xs text-muted-foreground space-y-1 ml-6 list-disc">
            <li>Engine registry and diagnostics</li>
            <li>Entanglement network monitor</li>
            <li>Textbook digester and grade vault</li>
          </ul>
        </div>
        <Button
          className="w-full h-12 font-mono tracking-widest uppercase text-sm"
          style={{
            background: "oklch(0.68 0.18 280)",
            color: "oklch(0.07 0.01 260)",
            boxShadow: "0 0 20px oklch(0.68 0.18 280 / 0.3)",
          }}
          onClick={onLogin}
          disabled={loginStatus === "logging-in"}
          data-ocid="admin.login_button"
        >
          {loginStatus === "logging-in" ? "Connecting..." : "Sign In"}
        </Button>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const { data: diag } = useSystemDiag();
  const { data: vault } = useVaultStats();
  const { data: builders, isLoading: buildersLoading } = useAllBuilderStats();
  const { stats: entStats } = useEntanglementStats();

  const systemScore = diag ? Number(diag.pilScore) : 0;
  const activeCount = entStats ? Number(entStats.activeCount) : 0;
  const totalPayloads = vault ? Number(vault.totalPayloads) : 0;
  const builderCount = builders ? builders.length : 0;

  const ringCirc = 2 * Math.PI * 40;
  const ringPct = systemScore / 89;
  const ringOffset = ringCirc - ringPct * ringCirc;

  return (
    <div className="min-h-screen" data-ocid="admin.page">
      {/* ── OS HEADER ── */}
      <div className="glass-lg sticky top-0 z-40 border-b border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="relative w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: "oklch(0.68 0.18 280 / 0.18)",
                border: "1px solid oklch(0.68 0.18 280 / 0.35)",
              }}
            >
              <Activity
                className="w-4 h-4"
                style={{ color: "oklch(0.68 0.18 280)" }}
              />
              <span
                className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full animate-pulse"
                style={{
                  background: "oklch(0.68 0.18 280)",
                  boxShadow: "0 0 6px oklch(0.68 0.18 280)",
                }}
              />
            </div>
            <div>
              <h1 className="font-display font-extrabold text-foreground tracking-widest text-sm uppercase">
                ADMIN OS
              </h1>
              <p
                className="text-[10px] font-mono"
                style={{ color: "oklch(0.68 0.18 280 / 0.8)" }}
              >
                Sovereign Platform Control
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest hidden sm:block">
              EduAI v3
            </span>
            <Link to="/admin/digester" data-ocid="admin.digester_link">
              <button
                type="button"
                className="glass-sm rounded-lg px-3 py-2 text-xs font-mono hover:border-white/20 transition-glass flex items-center gap-1.5"
                style={{ color: "oklch(0.68 0.18 280)" }}
              >
                <Database className="w-3.5 h-3.5" /> DIGT
              </button>
            </Link>
            <Link to="/factory-setup" data-ocid="admin.factory_link">
              <button
                type="button"
                className="glass-sm rounded-lg px-3 py-2 text-xs font-mono hover:border-white/20 transition-glass flex items-center gap-1.5"
                style={{ color: "oklch(0.75 0.16 70)" }}
              >
                <FlaskConical className="w-3.5 h-3.5" /> FACTORY
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* ── KPI ROW ── */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          data-ocid="admin.kpi_row"
        >
          {[
            {
              label: "Builder Count",
              value: builderCount,
              icon: Users,
              color: "oklch(0.68 0.18 280)",
            },
            {
              label: "DIAG Score",
              value: systemScore,
              icon: Shield,
              color: "oklch(0.72 0.20 200)",
            },
            {
              label: "Active Links",
              value: activeCount,
              icon: Activity,
              color: "oklch(0.70 0.17 162)",
            },
            {
              label: "Vault Seeds",
              value: totalPayloads,
              icon: Database,
              color: "oklch(0.76 0.18 84)",
            },
          ].map(({ label, value, icon: Icon, color }, i) => (
            <div
              key={label}
              className="glass rounded-2xl p-5 glass-shimmer group"
              data-ocid={`admin.kpi.${i + 1}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${color.replace(")", " / 0.12)")}`,
                    border: `1px solid ${color.replace(")", " / 0.25)")}`,
                  }}
                >
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60">
                  LIVE
                </span>
              </div>
              <p className="text-3xl font-display font-extrabold text-foreground leading-none">
                {value}
              </p>
              <p className="text-xs text-muted-foreground mt-1.5 uppercase tracking-wider">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* ── 3-COL GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Builder Agents */}
          <div className="space-y-3" data-ocid="admin.builders_section">
            <h2
              className="text-[10px] font-mono uppercase tracking-widest"
              style={{ color: "oklch(0.68 0.18 280)" }}
            >
              Silver Builder Registry
            </h2>
            {buildersLoading ? (
              <div
                className="space-y-2"
                data-ocid="admin.builders_loading_state"
              >
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="glass rounded-xl h-20 animate-pulse"
                  />
                ))}
              </div>
            ) : !builders || builders.length === 0 ? (
              <div
                className="glass rounded-xl p-8 text-center"
                data-ocid="admin.builders_empty_state"
              >
                <p className="text-sm text-muted-foreground">
                  No builders registered.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {builders.map(([codeName, stats], idx) => (
                  <div
                    key={codeName}
                    className="glass rounded-xl p-4 group hover:border-white/15 transition-glass"
                    data-ocid={`admin.builder_card.${idx + 1}`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{
                          background: "oklch(0.68 0.18 280 / 0.12)",
                          border: "1px solid oklch(0.68 0.18 280 / 0.25)",
                        }}
                      >
                        <span
                          className="text-[10px] font-bold font-mono"
                          style={{ color: "oklch(0.68 0.18 280)" }}
                        >
                          {codeName.slice(0, 2)}
                        </span>
                      </div>
                      <span className="font-mono font-bold text-sm text-foreground">
                        {codeName}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 text-center">
                      <div className="glass-sm rounded-lg p-1.5">
                        <p className="text-sm font-bold text-foreground">
                          {Number(stats.sessionsProcessed) || 0}
                        </p>
                        <p className="text-[9px] text-muted-foreground">
                          Sessions
                        </p>
                      </div>
                      <div className="glass-sm rounded-lg p-1.5">
                        <p className="text-sm font-bold text-foreground">
                          {Number(stats.seedsSealed) || 0}
                        </p>
                        <p className="text-[9px] text-muted-foreground">
                          Seeds
                        </p>
                      </div>
                      <div className="glass-sm rounded-lg p-1.5">
                        <p className="text-sm font-bold text-foreground">
                          {Number(stats.workflowCompletions) || 0}
                        </p>
                        <p className="text-[9px] text-muted-foreground">
                          Flows
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Center: Entanglement Summary */}
          <div className="space-y-3" data-ocid="admin.entanglement_section">
            <div className="flex items-center justify-between">
              <h2
                className="text-[10px] font-mono uppercase tracking-widest"
                style={{ color: "oklch(0.70 0.17 162)" }}
              >
                Entanglement Network
              </h2>
              <Link
                to="/entanglements"
                data-ocid="admin.entanglement_full_view_link"
              >
                <span
                  className="text-[10px] font-mono hover:text-foreground transition-colors"
                  style={{ color: "oklch(0.70 0.17 162)" }}
                >
                  VIEW ALL →
                </span>
              </Link>
            </div>
            <div className="glass rounded-2xl p-5 space-y-4">
              {[
                {
                  label: "Active Links",
                  value: activeCount,
                  color: "oklch(0.70 0.17 162)",
                },
                {
                  label: "Total Transits",
                  value: entStats ? Number(entStats.totalTransits) : 0,
                  color: "oklch(0.68 0.18 280)",
                },
                {
                  label: "Avg COH Δ",
                  value: entStats ? Number(entStats.avgCoherenceDelta) : 0,
                  color: "oklch(0.76 0.18 84)",
                },
              ].map(({ label, value, color }) => (
                <div
                  key={label}
                  className="glass-sm rounded-xl p-4 flex items-center justify-between"
                >
                  <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                    {label}
                  </span>
                  <span
                    className="text-2xl font-display font-extrabold"
                    style={{ color }}
                  >
                    {value >= 0 && label.includes("COH") ? `+${value}` : value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: System Health */}
          <div className="space-y-3" data-ocid="admin.health_section">
            <h2
              className="text-[10px] font-mono uppercase tracking-widest"
              style={{ color: "oklch(0.72 0.20 200)" }}
            >
              System Health
            </h2>
            <div className="glass rounded-2xl p-5 flex flex-col items-center gap-5">
              {/* SVG Ring */}
              <div className="relative">
                <svg width="100" height="100" className="-rotate-90" role="img">
                  <title>System health score</title>
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="oklch(0.20 0.015 260)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="oklch(0.72 0.20 200)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={String(ringCirc)}
                    strokeDashoffset={String(ringOffset)}
                    style={{
                      filter: "drop-shadow(0 0 6px oklch(0.72 0.20 200 / 0.6))",
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-display font-extrabold text-foreground">
                    {systemScore}
                  </span>
                  <span className="text-[9px] font-mono text-muted-foreground uppercase">
                    / 89
                  </span>
                </div>
              </div>
              {/* Sovereignty badge */}
              <div className="glass-sm rounded-xl px-4 py-2 text-center w-full">
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">
                  Sovereignty
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full bg-emerald-400"
                    style={{ boxShadow: "0 0 6px oklch(0.72 0.18 162 / 0.8)" }}
                  />
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    {diag?.status ?? "NOMINAL"}
                  </span>
                </div>
              </div>
              {/* Engine count */}
              <div className="glass-sm rounded-xl px-4 py-2 text-center w-full">
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">
                  Active Engines
                </p>
                <p className="text-xl font-display font-bold text-foreground">
                  {diag ? Number(diag.heartbeatCount) : "--"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── ACTION CARDS ── */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          data-ocid="admin.action_row"
        >
          <Link to="/admin/digester" data-ocid="admin.digester_action_card">
            <div
              className="glass-lg rounded-2xl p-6 group hover:border-white/15 transition-glass cursor-pointer glass-shimmer"
              style={{ borderColor: "oklch(0.68 0.18 280 / 0.25)" }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "oklch(0.68 0.18 280 / 0.15)",
                    border: "1px solid oklch(0.68 0.18 280 / 0.3)",
                  }}
                >
                  <Database
                    className="w-5 h-5"
                    style={{ color: "oklch(0.68 0.18 280)" }}
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-display font-bold text-foreground text-sm">
                    Textbook Digester
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    DIGT Engine — Feed curriculum, extract grade-gated content
                  </p>
                </div>
                <span className="ml-auto font-mono text-muted-foreground group-hover:text-foreground transition-colors text-sm">
                  →
                </span>
              </div>
            </div>
          </Link>
          <Link to="/factory-setup" data-ocid="admin.factory_action_card">
            <div
              className="glass-lg rounded-2xl p-6 group hover:border-white/15 transition-glass cursor-pointer glass-shimmer"
              style={{ borderColor: "oklch(0.75 0.16 70 / 0.25)" }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "oklch(0.75 0.16 70 / 0.15)",
                    border: "1px solid oklch(0.75 0.16 70 / 0.3)",
                  }}
                >
                  <FlaskConical
                    className="w-5 h-5"
                    style={{ color: "oklch(0.75 0.16 70)" }}
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-display font-bold text-foreground text-sm">
                    Factory Setup
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Bootstrap school deployment, create demo students
                  </p>
                </div>
                <span className="ml-auto font-mono text-muted-foreground group-hover:text-foreground transition-colors text-sm">
                  →
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

function _AgentRow({ agent, index }: { agent: Agent; index: number }) {
  const roleKey =
    typeof agent.role === "string" ? agent.role : Object.keys(agent.role)[0];
  const icon = AGENT_ICONS[roleKey] ?? <Sparkles className="w-5 h-5" />;
  const iconColor = AGENT_COLORS[roleKey] ?? "text-primary";

  return (
    <div
      className="glass rounded-xl p-4 transition-glass hover:border-white/15"
      data-ocid={`admin.agent_card.${index}`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`flex-shrink-0 w-9 h-9 rounded-lg glass-sm flex items-center justify-center ${iconColor}`}
          >
            {icon}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm text-foreground truncate">
              {agent.name}
            </p>
            <p className="text-xs text-muted-foreground capitalize">
              {roleKey}
            </p>
          </div>
        </div>
        <Badge
          variant={agent.isActive ? "default" : "secondary"}
          className="flex-shrink-0"
        >
          {agent.isActive ? "Active" : "Inactive"}
        </Badge>
      </div>
    </div>
  );
}
