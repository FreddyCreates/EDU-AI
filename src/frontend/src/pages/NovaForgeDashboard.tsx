// NovaForgeDashboard — Deployment history and self-deploy management for EduAI
// Phase 3-4: Nova Forge Dashboard for deployment history and platform management

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Cloud,
  Cpu,
  Database,
  GitBranch,
  History,
  Play,
  RefreshCw,
  Rocket,
  Server,
  Settings,
  Shield,
  Terminal,
  Webhook,
  XCircle,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

// OKLCH Colors following DESIGN.md
const EMERALD = "oklch(0.72 0.17 155)";
const TEAL = "oklch(0.72 0.16 185)";
const GOLD = "oklch(0.76 0.18 84)";
const PURPLE = "oklch(0.68 0.18 280)";
const CYAN = "oklch(0.65 0.22 200)";
const RED = "oklch(0.65 0.25 25)";

// Static deployment data for demo
const DEPLOYMENT_HISTORY = [
  {
    id: "deploy-1716678432-abc123",
    version: "1.2.0",
    status: "success" as const,
    timestamp: Date.now() - 86400000, // 1 day ago
    duration: 127,
    canisters: [
      { name: "backend", canisterId: "rrkah-fqaaa-aaaaa-aaaaq-cai" },
      { name: "frontend", canisterId: "ryjl3-tyaaa-aaaaa-aaaba-cai" },
    ],
    scanReport: { passed: true, errors: 0, warnings: 2 },
    cycleEstimate: { installation: 150_000_000_000, monthly: 12_000_000_000 },
  },
  {
    id: "deploy-1716592000-def456",
    version: "1.1.9",
    status: "success" as const,
    timestamp: Date.now() - 172800000, // 2 days ago
    duration: 98,
    canisters: [
      { name: "backend", canisterId: "rrkah-fqaaa-aaaaa-aaaaq-cai" },
    ],
    scanReport: { passed: true, errors: 0, warnings: 0 },
    cycleEstimate: { installation: 145_000_000_000, monthly: 11_500_000_000 },
  },
  {
    id: "deploy-1716505600-ghi789",
    version: "1.1.8",
    status: "failed" as const,
    timestamp: Date.now() - 259200000, // 3 days ago
    duration: 34,
    canisters: [],
    scanReport: { passed: false, errors: 2, warnings: 5 },
    error: "Security scan failed: 2 critical vulnerabilities found",
  },
  {
    id: "deploy-1716419200-jkl012",
    version: "1.1.7",
    status: "success" as const,
    timestamp: Date.now() - 345600000, // 4 days ago
    duration: 112,
    canisters: [
      { name: "backend", canisterId: "rrkah-fqaaa-aaaaa-aaaaq-cai" },
      { name: "frontend", canisterId: "ryjl3-tyaaa-aaaaa-aaaba-cai" },
    ],
    scanReport: { passed: true, errors: 0, warnings: 1 },
    cycleEstimate: { installation: 142_000_000_000, monthly: 11_000_000_000 },
  },
];

// Static canister health data
const CANISTER_HEALTH = [
  {
    name: "backend",
    canisterId: "rrkah-fqaaa-aaaaa-aaaaq-cai",
    status: "running" as const,
    cyclesBalance: 4_500_000_000_000,
    memoryUsed: 128_000_000,
    daysUntilEmpty: 375,
  },
  {
    name: "frontend",
    canisterId: "ryjl3-tyaaa-aaaaa-aaaba-cai",
    status: "running" as const,
    cyclesBalance: 2_100_000_000_000,
    memoryUsed: 45_000_000,
    daysUntilEmpty: 210,
  },
];

// Webhook configurations
const WEBHOOK_CONFIGS = [
  {
    url: "https://hooks.slack.com/services/T.../B.../xxx",
    events: ["deploymentCompleted", "deploymentFailed"],
    enabled: true,
  },
  {
    url: "https://discord.com/api/webhooks/...",
    events: ["all"],
    enabled: false,
  },
];

// Format cycles for display
function formatCycles(cycles: number): string {
  if (cycles >= 1_000_000_000_000) {
    return `${(cycles / 1_000_000_000_000).toFixed(2)}T`;
  } else if (cycles >= 1_000_000_000) {
    return `${(cycles / 1_000_000_000).toFixed(2)}B`;
  } else if (cycles >= 1_000_000) {
    return `${(cycles / 1_000_000).toFixed(2)}M`;
  }
  return cycles.toString();
}

// Format timestamp
function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    return `${diffDays}d ago`;
  } else if (diffHours > 0) {
    return `${diffHours}h ago`;
  }
  return "Just now";
}

// Status badge component
function StatusBadge({ status }: { status: "success" | "failed" | "pending" | "running" }) {
  const colors = {
    success: { bg: "rgba(0, 220, 130, 0.15)", text: EMERALD, icon: CheckCircle2 },
    failed: { bg: "rgba(220, 60, 60, 0.15)", text: RED, icon: XCircle },
    pending: { bg: "rgba(255, 185, 0, 0.15)", text: GOLD, icon: Clock },
    running: { bg: "rgba(100, 180, 255, 0.15)", text: CYAN, icon: RefreshCw },
  };
  const { bg, text, icon: Icon } = colors[status];

  return (
    <Badge
      style={{ background: bg, color: text, border: `1px solid ${text}30` }}
      className="flex items-center gap-1 px-2 py-0.5"
    >
      <Icon className="w-3 h-3" />
      {status.toUpperCase()}
    </Badge>
  );
}

// Deployment card component
function DeploymentCard({ deployment }: { deployment: typeof DEPLOYMENT_HISTORY[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-knowledge-surface p-4 rounded-xl"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <code className="text-xs text-white/50">{deployment.id.slice(0, 20)}...</code>
            <StatusBadge status={deployment.status} />
          </div>
          <h4 className="text-white/90 font-medium">v{deployment.version}</h4>
        </div>
        <div className="text-right text-sm">
          <p className="text-white/70">{formatTime(deployment.timestamp)}</p>
          <p className="text-white/50">{deployment.duration}s</p>
        </div>
      </div>

      {deployment.status === "failed" && deployment.error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-2 mb-3 text-sm text-red-400">
          {deployment.error}
        </div>
      )}

      {deployment.canisters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {deployment.canisters.map((c) => (
            <div
              key={c.name}
              className="flex items-center gap-1 bg-white/5 rounded-lg px-2 py-1 text-xs"
            >
              <Server className="w-3 h-3 text-teal-400" />
              <span className="text-white/70">{c.name}</span>
              {c.canisterId && (
                <code className="text-white/40">{c.canisterId.slice(0, 8)}...</code>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 text-xs">
        {deployment.scanReport && (
          <div className="flex items-center gap-1">
            <Shield className={`w-3 h-3 ${deployment.scanReport.passed ? "text-emerald-400" : "text-red-400"}`} />
            <span className={deployment.scanReport.passed ? "text-emerald-400" : "text-red-400"}>
              {deployment.scanReport.passed ? "Scan Passed" : "Scan Failed"}
            </span>
            {deployment.scanReport.warnings > 0 && (
              <span className="text-amber-400">({deployment.scanReport.warnings} warnings)</span>
            )}
          </div>
        )}
        {deployment.cycleEstimate && (
          <div className="flex items-center gap-1 text-white/50">
            <Zap className="w-3 h-3" />
            {formatCycles(deployment.cycleEstimate.installation)} cycles
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Canister health card
function CanisterHealthCard({ canister }: { canister: typeof CANISTER_HEALTH[0] }) {
  const cyclePercent = Math.min(100, (canister.cyclesBalance / 5_000_000_000_000) * 100);
  const isLow = canister.daysUntilEmpty < 90;
  const isCritical = canister.daysUntilEmpty < 30;

  return (
    <div className="glass-grade-vault p-4 rounded-xl">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5" style={{ color: GOLD }} />
          <div>
            <h4 className="text-white/90 font-medium">{canister.name}</h4>
            <code className="text-xs text-white/40">{canister.canisterId}</code>
          </div>
        </div>
        <StatusBadge status={canister.status} />
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-white/50">Cycles</span>
            <span className={isCritical ? "text-red-400" : isLow ? "text-amber-400" : "text-white/70"}>
              {formatCycles(canister.cyclesBalance)}
            </span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${cyclePercent}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{
                background: isCritical
                  ? `linear-gradient(90deg, ${RED}, ${RED})`
                  : isLow
                  ? `linear-gradient(90deg, ${GOLD}, ${GOLD})`
                  : `linear-gradient(90deg, ${EMERALD}, ${TEAL})`,
              }}
            />
          </div>
          <p className="text-xs text-white/40 mt-1">
            ~{canister.daysUntilEmpty} days until empty
          </p>
        </div>

        <div className="flex justify-between text-xs">
          <span className="text-white/50">Memory</span>
          <span className="text-white/70">{(canister.memoryUsed / 1_000_000).toFixed(1)} MB</span>
        </div>
      </div>
    </div>
  );
}

// Main dashboard component
export default function NovaForgeDashboard() {
  const [isDeploying, setIsDeploying] = useState(false);
  const [showWebhooks, setShowWebhooks] = useState(false);

  // Stats
  const totalDeployments = DEPLOYMENT_HISTORY.length;
  const successfulDeployments = DEPLOYMENT_HISTORY.filter((d) => d.status === "success").length;
  const successRate = ((successfulDeployments / totalDeployments) * 100).toFixed(1);
  const avgDuration = DEPLOYMENT_HISTORY.reduce((sum, d) => sum + d.duration, 0) / totalDeployments;

  const handleDeploy = () => {
    setIsDeploying(true);
    // Simulated deployment - in production this would call the backend
    setTimeout(() => setIsDeploying(false), 3000);
  };

  return (
    <div className="p-fib-21 space-y-fib-21 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-start"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${EMERALD}30, ${TEAL}30)` }}
            >
              <Rocket className="w-6 h-6" style={{ color: EMERALD }} />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white/90">Nova Forge</h1>
              <p className="text-white/50 text-sm">Sovereign ICP Mainnet Deployment</p>
            </div>
          </div>
          <p className="text-white/40 text-sm italic">
            "If it's not on mainnet, it doesn't exist."
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="glass-portal-secondary"
            onClick={() => setShowWebhooks(!showWebhooks)}
          >
            <Webhook className="w-4 h-4 mr-2" />
            Webhooks
          </Button>
          <Button
            onClick={handleDeploy}
            disabled={isDeploying}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500"
          >
            {isDeploying ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Deploying...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Deploy to Mainnet
              </>
            )}
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-4 gap-4"
      >
        {[
          { label: "Total Deployments", value: totalDeployments, icon: History, color: TEAL },
          { label: "Success Rate", value: `${successRate}%`, icon: CheckCircle2, color: EMERALD },
          { label: "Avg Duration", value: `${avgDuration.toFixed(0)}s`, icon: Clock, color: GOLD },
          { label: "Network", value: "IC Mainnet", icon: Cloud, color: CYAN },
        ].map((stat, i) => (
          <div key={stat.label} className="glass-knowledge-surface p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
              <span className="text-white/50 text-sm">{stat.label}</span>
            </div>
            <p className="text-2xl font-semibold text-white/90">{stat.value}</p>
          </div>
        ))}
      </motion.div>

      {/* Webhooks Panel (Conditional) */}
      {showWebhooks && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="glass-portal-secondary p-4 rounded-xl"
        >
          <h3 className="text-white/90 font-medium mb-3 flex items-center gap-2">
            <Webhook className="w-4 h-4" style={{ color: PURPLE }} />
            Webhook Notifications
          </h3>
          <div className="space-y-2">
            {WEBHOOK_CONFIGS.map((wh, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-white/5 rounded-lg p-3"
              >
                <div>
                  <code className="text-xs text-white/60">{wh.url.slice(0, 40)}...</code>
                  <div className="flex gap-1 mt-1">
                    {wh.events.map((e) => (
                      <Badge key={e} variant="outline" className="text-xs">
                        {e}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Badge
                  variant={wh.enabled ? "default" : "secondary"}
                  className={wh.enabled ? "bg-emerald-600" : "bg-gray-600"}
                >
                  {wh.enabled ? "Enabled" : "Disabled"}
                </Badge>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Deployment History */}
        <div className="col-span-2 space-y-4">
          <h2 className="text-lg font-medium text-white/90 flex items-center gap-2">
            <History className="w-5 h-5" style={{ color: TEAL }} />
            Deployment History
          </h2>
          <div className="space-y-3">
            {DEPLOYMENT_HISTORY.map((deployment) => (
              <DeploymentCard key={deployment.id} deployment={deployment} />
            ))}
          </div>
        </div>

        {/* Canister Health Sidebar */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-white/90 flex items-center gap-2">
            <Activity className="w-5 h-5" style={{ color: GOLD }} />
            Canister Health
          </h2>
          <div className="space-y-3">
            {CANISTER_HEALTH.map((canister) => (
              <CanisterHealthCard key={canister.name} canister={canister} />
            ))}
          </div>

          {/* Quick Actions */}
          <div className="glass-portal-secondary p-4 rounded-xl space-y-3">
            <h3 className="text-white/90 font-medium flex items-center gap-2">
              <Terminal className="w-4 h-4" style={{ color: PURPLE }} />
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Scan", icon: Shield },
                { label: "Estimate", icon: Zap },
                { label: "Status", icon: Activity },
                { label: "Logs", icon: Terminal },
              ].map((action) => (
                <Button
                  key={action.label}
                  variant="outline"
                  size="sm"
                  className="glass-portal-tertiary justify-start"
                >
                  <action.icon className="w-3 h-3 mr-2" />
                  {action.label}
                </Button>
              ))}
            </div>
          </div>

          {/* AI Configuration */}
          <div className="glass-knowledge-surface p-4 rounded-xl">
            <h3 className="text-white/90 font-medium mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4" style={{ color: EMERALD }} />
              AI Configuration
            </h3>
            <div className="space-y-2 text-sm">
              {[
                { label: "Pre-deploy Scan", enabled: true },
                { label: "Cycle Optimization", enabled: true },
                { label: "Upgrade Safety", enabled: true },
              ].map((config) => (
                <div key={config.label} className="flex justify-between items-center">
                  <span className="text-white/60">{config.label}</span>
                  <Badge
                    variant={config.enabled ? "default" : "secondary"}
                    className={`text-xs ${config.enabled ? "bg-emerald-600/30 text-emerald-400" : ""}`}
                  >
                    {config.enabled ? "✓" : "✗"}
                  </Badge>
                </div>
              ))}
              <div className="flex justify-between items-center pt-2 border-t border-white/10">
                <span className="text-white/60">Security Level</span>
                <Badge className="bg-amber-600/30 text-amber-400 text-xs">STRICT</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Philosophy */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center py-4 border-t border-white/10"
      >
        <p className="text-white/30 text-xs">
          Nova Forge v1.0.0 • Network: <span className="text-emerald-400">IC Mainnet</span> •
          Built with 💜 for the Internet Computer
        </p>
      </motion.div>
    </div>
  );
}
