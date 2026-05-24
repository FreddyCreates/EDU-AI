// IT Sandbox Environment — AI-Managed Development & Test Environments
// Enables IT staff to provision sandboxed containers for testing integrations,
// curriculum experiments, and new feature deployments with EDDI intelligence

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Box,
  CheckCircle2,
  Cloud,
  Code,
  Container,
  Copy,
  Database,
  Globe,
  HardDrive,
  Layers,
  Play,
  Plus,
  Power,
  RefreshCw,
  Server,
  Settings,
  Sparkles,
  Square,
  Terminal,
  Trash2,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const EMERALD = "oklch(0.72 0.17 155)";
const GOLD = "oklch(0.76 0.18 84)";
const PURPLE = "oklch(0.68 0.18 280)";
const CYAN = "oklch(0.65 0.22 200)";

interface SandboxInstance {
  id: string;
  name: string;
  type: "integration" | "curriculum" | "feature" | "ai-experiment";
  status: "running" | "stopped" | "provisioning" | "error";
  resources: {
    cpu: number;
    memory: number;
    storage: number;
  };
  createdAt: string;
  lastAccessed: string;
  owner: string;
  aiSuggestions: string[];
  endpoints: {
    api: string;
    web: string;
    database: string;
  };
}

interface SandboxTemplate {
  id: string;
  name: string;
  description: string;
  type: "integration" | "curriculum" | "feature" | "ai-experiment";
  defaultResources: {
    cpu: number;
    memory: number;
    storage: number;
  };
  services: string[];
  aiOptimized: boolean;
}

const sandboxInstances: SandboxInstance[] = [
  {
    id: "sbx-001",
    name: "PowerSchool Integration Test",
    type: "integration",
    status: "running",
    resources: { cpu: 2, memory: 4, storage: 20 },
    createdAt: "2 hours ago",
    lastAccessed: "5 mins ago",
    owner: "IT Admin",
    aiSuggestions: [
      "Consider adding rate limiting for API calls",
      "Detected potential data sync conflict - recommend validation layer",
    ],
    endpoints: {
      api: "https://sbx-001.eduai.local/api",
      web: "https://sbx-001.eduai.local",
      database: "postgres://sbx-001.db.eduai.local:5432",
    },
  },
  {
    id: "sbx-002",
    name: "STEM Curriculum Preview",
    type: "curriculum",
    status: "running",
    resources: { cpu: 1, memory: 2, storage: 10 },
    createdAt: "1 day ago",
    lastAccessed: "3 hours ago",
    owner: "Curriculum Team",
    aiSuggestions: [
      "New topics detected in knowledge layer - recommend seeding",
      "AI recommends adding 3 more practice problems per unit",
    ],
    endpoints: {
      api: "https://sbx-002.eduai.local/api",
      web: "https://sbx-002.eduai.local",
      database: "postgres://sbx-002.db.eduai.local:5432",
    },
  },
  {
    id: "sbx-003",
    name: "EDDI Voice Mode Beta",
    type: "ai-experiment",
    status: "provisioning",
    resources: { cpu: 4, memory: 8, storage: 50 },
    createdAt: "10 mins ago",
    lastAccessed: "10 mins ago",
    owner: "AI Research",
    aiSuggestions: [
      "GPU acceleration available - enable for faster inference",
      "Recommend enabling telemetry for model performance tracking",
    ],
    endpoints: {
      api: "https://sbx-003.eduai.local/api",
      web: "https://sbx-003.eduai.local",
      database: "postgres://sbx-003.db.eduai.local:5432",
    },
  },
  {
    id: "sbx-004",
    name: "Parent Portal v2 Feature",
    type: "feature",
    status: "stopped",
    resources: { cpu: 2, memory: 4, storage: 15 },
    createdAt: "3 days ago",
    lastAccessed: "1 day ago",
    owner: "Product Team",
    aiSuggestions: [
      "Inactive for 24h - consider auto-cleanup to save resources",
      "Feature tests passed - ready for staging promotion",
    ],
    endpoints: {
      api: "https://sbx-004.eduai.local/api",
      web: "https://sbx-004.eduai.local",
      database: "postgres://sbx-004.db.eduai.local:5432",
    },
  },
];

const sandboxTemplates: SandboxTemplate[] = [
  {
    id: "tpl-integration",
    name: "Integration Testing",
    description: "Full-stack environment for testing SIS, LMS, and SSO integrations",
    type: "integration",
    defaultResources: { cpu: 2, memory: 4, storage: 20 },
    services: ["API Gateway", "Mock Services", "Database", "Message Queue"],
    aiOptimized: true,
  },
  {
    id: "tpl-curriculum",
    name: "Curriculum Preview",
    description: "Isolated environment for testing curriculum changes and content",
    type: "curriculum",
    defaultResources: { cpu: 1, memory: 2, storage: 10 },
    services: ["Knowledge Layer", "STMP Registry", "Content Server"],
    aiOptimized: true,
  },
  {
    id: "tpl-feature",
    name: "Feature Development",
    description: "Development sandbox with full EduAI stack for new features",
    type: "feature",
    defaultResources: { cpu: 2, memory: 4, storage: 15 },
    services: ["Frontend", "Backend", "Database", "EDDI Engine"],
    aiOptimized: false,
  },
  {
    id: "tpl-ai",
    name: "AI Experiment Lab",
    description: "GPU-enabled environment for EDDI model experiments and training",
    type: "ai-experiment",
    defaultResources: { cpu: 4, memory: 8, storage: 50 },
    services: ["Model Server", "Training Pipeline", "Inference Engine", "Telemetry"],
    aiOptimized: true,
  },
];

function getTypeColor(type: SandboxInstance["type"]) {
  switch (type) {
    case "integration":
      return EMERALD;
    case "curriculum":
      return GOLD;
    case "feature":
      return CYAN;
    case "ai-experiment":
      return PURPLE;
    default:
      return EMERALD;
  }
}

function getStatusColor(status: SandboxInstance["status"]) {
  switch (status) {
    case "running":
      return EMERALD;
    case "stopped":
      return "oklch(0.60 0.10 30)";
    case "provisioning":
      return CYAN;
    case "error":
      return "oklch(0.65 0.20 25)";
    default:
      return EMERALD;
  }
}

function SandboxCard({ sandbox, index }: { sandbox: SandboxInstance; index: number }) {
  const [showEndpoints, setShowEndpoints] = useState(false);
  const typeColor = getTypeColor(sandbox.type);
  const statusColor = getStatusColor(sandbox.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="glass rounded-2xl p-5 space-y-4"
      style={{ border: `1px solid ${typeColor.replace(")", " / 0.25)")}` }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: typeColor.replace(")", " / 0.12)"),
              border: `1px solid ${typeColor.replace(")", " / 0.30)")}`,
            }}
          >
            <Container className="w-5 h-5" style={{ color: typeColor }} />
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground">{sandbox.name}</h3>
            <p className="text-xs text-muted-foreground capitalize">{sandbox.type.replace("-", " ")}</p>
          </div>
        </div>
        <Badge
          className="font-mono text-[10px] tracking-wider uppercase"
          style={{
            background: statusColor.replace(")", " / 0.15)"),
            color: statusColor,
            border: `1px solid ${statusColor.replace(")", " / 0.30)")}`,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full mr-1.5"
            style={{
              background: statusColor,
              boxShadow: sandbox.status === "running" ? `0 0 6px ${statusColor}` : "none",
            }}
          />
          {sandbox.status}
        </Badge>
      </div>

      {/* Resource Usage */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "CPU", value: `${sandbox.resources.cpu} cores`, icon: Zap },
          { label: "Memory", value: `${sandbox.resources.memory} GB`, icon: HardDrive },
          { label: "Storage", value: `${sandbox.resources.storage} GB`, icon: Database },
        ].map((resource) => (
          <div
            key={resource.label}
            className="glass-sm rounded-lg p-2.5 flex items-center gap-2"
          >
            <resource.icon className="w-3.5 h-3.5 text-muted-foreground" />
            <div>
              <p className="text-[10px] text-muted-foreground">{resource.label}</p>
              <p className="text-xs font-mono text-foreground">{resource.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* AI Suggestions */}
      {sandbox.aiSuggestions.length > 0 && (
        <div
          className="rounded-xl p-3 space-y-2"
          style={{
            background: PURPLE.replace(")", " / 0.08)"),
            border: `1px solid ${PURPLE.replace(")", " / 0.20)")}`,
          }}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" style={{ color: PURPLE }} />
            <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: PURPLE }}>
              EDDI Suggestions
            </span>
          </div>
          {sandbox.aiSuggestions.map((suggestion, i) => (
            <p key={i} className="text-xs text-muted-foreground pl-5">
              • {suggestion}
            </p>
          ))}
        </div>
      )}

      {/* Endpoints Toggle */}
      <div>
        <button
          onClick={() => setShowEndpoints(!showEndpoints)}
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Globe className="w-3.5 h-3.5" />
          {showEndpoints ? "Hide Endpoints" : "Show Endpoints"}
        </button>
        {showEndpoints && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-3 space-y-2"
          >
            {Object.entries(sandbox.endpoints).map(([key, url]) => (
              <div
                key={key}
                className="flex items-center justify-between glass-sm rounded-lg px-3 py-2"
              >
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {key}
                </span>
                <div className="flex items-center gap-2">
                  <code className="text-[10px] font-mono text-foreground/70">{url}</code>
                  <button className="p-1 hover:bg-white/10 rounded transition-colors">
                    <Copy className="w-3 h-3 text-muted-foreground" />
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-2 border-t border-white/5">
        <span className="text-[10px] text-muted-foreground flex-1">
          Owner: {sandbox.owner} • Last: {sandbox.lastAccessed}
        </span>
        {sandbox.status === "running" ? (
          <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">
            <Square className="w-3 h-3 mr-1" />
            Stop
          </Button>
        ) : sandbox.status === "stopped" ? (
          <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">
            <Play className="w-3 h-3 mr-1" />
            Start
          </Button>
        ) : null}
        <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">
          <Terminal className="w-3 h-3 mr-1" />
          Console
        </Button>
        <Button size="sm" variant="ghost" className="h-7 px-2 text-xs text-red-400">
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </motion.div>
  );
}

function TemplateCard({ template, index }: { template: SandboxTemplate; index: number }) {
  const typeColor = getTypeColor(template.type);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.06 }}
      className="glass rounded-2xl p-5 space-y-4 hover:scale-[1.02] transition-smooth cursor-pointer group"
      style={{ border: `1px solid ${typeColor.replace(")", " / 0.20)")}` }}
    >
      <div className="flex items-start justify-between">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{
            background: typeColor.replace(")", " / 0.12)"),
            border: `1px solid ${typeColor.replace(")", " / 0.28)")}`,
          }}
        >
          <Layers className="w-5 h-5" style={{ color: typeColor }} />
        </div>
        {template.aiOptimized && (
          <Badge
            className="text-[9px] font-mono"
            style={{
              background: PURPLE.replace(")", " / 0.15)"),
              color: PURPLE,
              border: `1px solid ${PURPLE.replace(")", " / 0.30)")}`,
            }}
          >
            <Sparkles className="w-2.5 h-2.5 mr-1" />
            AI-Optimized
          </Badge>
        )}
      </div>

      <div>
        <h3 className="font-display font-semibold text-foreground">{template.name}</h3>
        <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {template.services.map((service) => (
          <Badge
            key={service}
            variant="outline"
            className="text-[9px] font-mono"
          >
            {service}
          </Badge>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-white/5">
        <span className="text-[10px] text-muted-foreground">
          {template.defaultResources.cpu} CPU • {template.defaultResources.memory}GB RAM •{" "}
          {template.defaultResources.storage}GB Storage
        </span>
        <Button
          size="sm"
          className="h-7 px-3 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: typeColor.replace(")", " / 0.20)"),
            border: `1px solid ${typeColor.replace(")", " / 0.40)")}`,
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          Deploy
        </Button>
      </div>
    </motion.div>
  );
}

export default function SandboxEnvironment() {
  const [activeTab, setActiveTab] = useState<"instances" | "templates">("instances");
  const runningCount = sandboxInstances.filter((s) => s.status === "running").length;
  const totalResources = sandboxInstances.reduce(
    (acc, s) => ({
      cpu: acc.cpu + s.resources.cpu,
      memory: acc.memory + s.resources.memory,
      storage: acc.storage + s.resources.storage,
    }),
    { cpu: 0, memory: 0, storage: 0 }
  );

  return (
    <div className="portal-enter min-h-screen" data-ocid="it_sandbox.page">
      {/* Header */}
      <div
        className="glass sticky top-0 z-30"
        style={{ borderBottom: `1px solid ${EMERALD.replace(")", " / 0.18)")}` }}
      >
        <div className="mx-auto max-w-[1400px] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/it/portal">
              <Button variant="ghost" size="sm" className="gap-1.5">
                <ArrowLeft className="h-4 w-4" />
                IT Portal
              </Button>
            </Link>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-3">
              <div
                className="flex items-center gap-2.5 rounded-xl px-4 py-2"
                style={{
                  background: `linear-gradient(135deg, ${EMERALD.replace(")", " / 0.20)")} 0%, ${PURPLE.replace(")", " / 0.10)")} 100%)`,
                  border: `1px solid ${EMERALD.replace(")", " / 0.35)")}`,
                }}
              >
                <Container className="h-4 w-4" style={{ color: EMERALD }} />
                <span
                  className="font-display font-bold text-sm"
                  style={{ color: EMERALD, letterSpacing: "0.18em" }}
                >
                  SANDBOX LAB
                </span>
              </div>
              <div>
                <p className="font-display font-semibold text-foreground text-base leading-none">
                  AI-Managed Environments
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Provision · Test · Experiment · Deploy
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              className="font-mono text-[10px] tracking-widest"
              style={{
                background: EMERALD.replace(")", " / 0.12)"),
                color: EMERALD,
                border: `1px solid ${EMERALD.replace(")", " / 0.30)")}`,
              }}
            >
              {runningCount} RUNNING
            </Badge>
            <Button
              size="sm"
              className="gap-1.5"
              style={{
                background: EMERALD.replace(")", " / 0.20)"),
                border: `1px solid ${EMERALD.replace(")", " / 0.40)")}`,
              }}
            >
              <Plus className="h-4 w-4" />
              New Sandbox
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 py-6 space-y-6">
        {/* Resource Overview */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Active Sandboxes", value: runningCount, icon: Box, color: EMERALD },
            { label: "Total CPU Allocated", value: `${totalResources.cpu} cores`, icon: Zap, color: GOLD },
            { label: "Memory Usage", value: `${totalResources.memory} GB`, icon: HardDrive, color: CYAN },
            { label: "Storage Used", value: `${totalResources.storage} GB`, icon: Database, color: PURPLE },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-4 flex items-center gap-4"
              style={{ border: `1px solid ${stat.color.replace(")", " / 0.20)")}` }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: stat.color.replace(")", " / 0.12)"),
                  border: `1px solid ${stat.color.replace(")", " / 0.28)")}`,
                }}
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <div>
                <p className="font-display font-bold text-xl text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-3">
          {[
            { id: "instances" as const, label: "Active Instances", count: sandboxInstances.length },
            { id: "templates" as const, label: "Templates", count: sandboxTemplates.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "glass text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={
                activeTab === tab.id
                  ? { border: `1px solid ${EMERALD.replace(")", " / 0.30)")}` }
                  : {}
              }
            >
              {tab.label}
              <Badge variant="secondary" className="text-[10px]">
                {tab.count}
              </Badge>
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "instances" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {sandboxInstances.map((sandbox, i) => (
              <SandboxCard key={sandbox.id} sandbox={sandbox} index={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sandboxTemplates.map((template, i) => (
              <TemplateCard key={template.id} template={template} index={i} />
            ))}
          </div>
        )}

        {/* AI Assistant Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-5"
          style={{
            border: `1px solid ${PURPLE.replace(")", " / 0.25)")}`,
            background: `linear-gradient(135deg, ${PURPLE.replace(")", " / 0.08)")} 0%, transparent 50%)`,
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: PURPLE.replace(")", " / 0.15)"),
                border: `1px solid ${PURPLE.replace(")", " / 0.30)")}`,
              }}
            >
              <Sparkles className="w-6 h-6" style={{ color: PURPLE }} />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-semibold text-foreground">
                EDDI Sandbox Intelligence
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                I'm monitoring your sandbox environments and can help optimize resource allocation,
                suggest security improvements, and automate routine maintenance tasks.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  "Optimize Resources",
                  "Run Security Scan",
                  "Auto-cleanup Idle",
                  "Suggest Configuration",
                ].map((action) => (
                  <Button
                    key={action}
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs"
                    style={{ borderColor: PURPLE.replace(")", " / 0.30)") }}
                  >
                    {action}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
