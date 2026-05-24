// IT AI Network Diagnostics — Intelligent Network Troubleshooting with Predictive Failure Detection
// EDDI-powered network monitoring, anomaly detection, and automated remediation suggestions

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Bot,
  CheckCircle2,
  Clock,
  Cloud,
  Cpu,
  Globe,
  HardDrive,
  Layers,
  Network,
  Radio,
  RefreshCw,
  Router,
  Search,
  Server,
  Shield,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Wifi,
  WifiOff,
  XCircle,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const EMERALD = "oklch(0.72 0.17 155)";
const GOLD = "oklch(0.76 0.18 84)";
const PURPLE = "oklch(0.68 0.18 280)";
const CYAN = "oklch(0.65 0.22 200)";
const RED = "oklch(0.65 0.20 25)";

interface NetworkNode {
  id: string;
  name: string;
  type: "router" | "switch" | "server" | "access-point" | "firewall";
  status: "healthy" | "warning" | "critical" | "offline";
  location: string;
  metrics: {
    latency: number;
    packetLoss: number;
    bandwidth: number;
    uptime: number;
  };
  aiHealth: number; // 0-100 AI-computed health score
  predictions: {
    failureProbability: number;
    maintenanceRecommended: boolean;
    estimatedDowntime?: string;
  };
}

interface NetworkIncident {
  id: string;
  severity: "critical" | "warning" | "info";
  title: string;
  description: string;
  affectedNodes: string[];
  detectedAt: string;
  aiAnalysis: string;
  suggestedActions: string[];
  autoResolvable: boolean;
}

interface AIInsight {
  id: string;
  type: "prediction" | "optimization" | "security" | "maintenance";
  title: string;
  description: string;
  confidence: number;
  impact: "high" | "medium" | "low";
  actionRequired: boolean;
}

const networkNodes: NetworkNode[] = [
  {
    id: "fw-main",
    name: "Main Firewall",
    type: "firewall",
    status: "healthy",
    location: "Data Center A",
    metrics: { latency: 2, packetLoss: 0, bandwidth: 94, uptime: 99.99 },
    aiHealth: 98,
    predictions: { failureProbability: 0.02, maintenanceRecommended: false },
  },
  {
    id: "rt-core",
    name: "Core Router",
    type: "router",
    status: "healthy",
    location: "Data Center A",
    metrics: { latency: 1, packetLoss: 0, bandwidth: 87, uptime: 99.95 },
    aiHealth: 96,
    predictions: { failureProbability: 0.05, maintenanceRecommended: false },
  },
  {
    id: "sw-dist-1",
    name: "Distribution Switch 1",
    type: "switch",
    status: "warning",
    location: "Building A",
    metrics: { latency: 5, packetLoss: 0.2, bandwidth: 78, uptime: 99.8 },
    aiHealth: 74,
    predictions: { failureProbability: 0.15, maintenanceRecommended: true, estimatedDowntime: "2-4 hours" },
  },
  {
    id: "srv-eddi",
    name: "EDDI Inference Server",
    type: "server",
    status: "healthy",
    location: "Data Center A",
    metrics: { latency: 3, packetLoss: 0, bandwidth: 65, uptime: 99.9 },
    aiHealth: 92,
    predictions: { failureProbability: 0.08, maintenanceRecommended: false },
  },
  {
    id: "ap-lib-1",
    name: "Library AP Cluster",
    type: "access-point",
    status: "critical",
    location: "Library Wing",
    metrics: { latency: 45, packetLoss: 3.5, bandwidth: 23, uptime: 94.2 },
    aiHealth: 42,
    predictions: { failureProbability: 0.68, maintenanceRecommended: true, estimatedDowntime: "Immediate" },
  },
  {
    id: "sw-dist-2",
    name: "Distribution Switch 2",
    type: "switch",
    status: "healthy",
    location: "Building B",
    metrics: { latency: 3, packetLoss: 0, bandwidth: 82, uptime: 99.92 },
    aiHealth: 94,
    predictions: { failureProbability: 0.04, maintenanceRecommended: false },
  },
];

const activeIncidents: NetworkIncident[] = [
  {
    id: "inc-001",
    severity: "critical",
    title: "Library WiFi Degradation Detected",
    description: "Access points in Library Wing showing severe packet loss and increased latency",
    affectedNodes: ["ap-lib-1"],
    detectedAt: "12 minutes ago",
    aiAnalysis: "Pattern analysis indicates hardware failure imminent. Similar degradation pattern was observed before AP failures in 3 other schools. Recommend immediate replacement.",
    suggestedActions: [
      "Failover to backup APs",
      "Notify library staff of temporary WiFi limitations",
      "Schedule emergency hardware replacement",
      "Check warranty status for affected units",
    ],
    autoResolvable: false,
  },
  {
    id: "inc-002",
    severity: "warning",
    title: "Elevated Latency on Distribution Switch 1",
    description: "Switch showing 5ms latency, above normal 2ms threshold",
    affectedNodes: ["sw-dist-1"],
    detectedAt: "45 minutes ago",
    aiAnalysis: "Traffic analysis shows 23% increase in multicast packets from IP cameras. Recommend IGMP snooping optimization. This is likely a configuration issue rather than hardware.",
    suggestedActions: [
      "Enable IGMP snooping on VLANs 10-20",
      "Review camera firmware for multicast optimizations",
      "Consider dedicated surveillance VLAN",
    ],
    autoResolvable: true,
  },
];

const aiInsights: AIInsight[] = [
  {
    id: "ai-001",
    type: "prediction",
    title: "Bandwidth Capacity Alert for Next Month",
    description: "Based on enrollment growth trends and historical usage, network will exceed 85% capacity during peak hours by March 15th.",
    confidence: 89,
    impact: "high",
    actionRequired: true,
  },
  {
    id: "ai-002",
    type: "security",
    title: "Unusual Traffic Pattern Detected",
    description: "Machine learning model detected 15% increase in DNS queries to previously unseen domains from student devices. Likely related to new gaming app.",
    confidence: 76,
    impact: "medium",
    actionRequired: false,
  },
  {
    id: "ai-003",
    type: "optimization",
    title: "QoS Policy Optimization Available",
    description: "Analysis of video conferencing traffic suggests QoS improvements could reduce teacher portal latency by 34% during peak hours.",
    confidence: 92,
    impact: "medium",
    actionRequired: false,
  },
  {
    id: "ai-004",
    type: "maintenance",
    title: "Firmware Update Recommended",
    description: "3 network devices have security patches available. No known vulnerabilities being exploited, but proactive update recommended.",
    confidence: 100,
    impact: "low",
    actionRequired: true,
  },
];

function getStatusColor(status: NetworkNode["status"]) {
  switch (status) {
    case "healthy":
      return EMERALD;
    case "warning":
      return GOLD;
    case "critical":
      return RED;
    case "offline":
      return "oklch(0.50 0.05 260)";
    default:
      return EMERALD;
  }
}

function getNodeIcon(type: NetworkNode["type"]) {
  switch (type) {
    case "router":
      return Router;
    case "switch":
      return Network;
    case "server":
      return Server;
    case "access-point":
      return Wifi;
    case "firewall":
      return Shield;
    default:
      return Server;
  }
}

function getSeverityColor(severity: NetworkIncident["severity"]) {
  switch (severity) {
    case "critical":
      return RED;
    case "warning":
      return GOLD;
    case "info":
      return CYAN;
    default:
      return CYAN;
  }
}

function NetworkNodeCard({ node, index }: { node: NetworkNode; index: number }) {
  const statusColor = getStatusColor(node.status);
  const Icon = getNodeIcon(node.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass rounded-xl p-4 space-y-3"
      style={{ border: `1px solid ${statusColor.replace(")", " / 0.25)")}` }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{
              background: statusColor.replace(")", " / 0.12)"),
              border: `1px solid ${statusColor.replace(")", " / 0.28)")}`,
            }}
          >
            <Icon className="w-4 h-4" style={{ color: statusColor }} />
          </div>
          <div>
            <h4 className="font-medium text-foreground text-sm">{node.name}</h4>
            <p className="text-[10px] text-muted-foreground">{node.location}</p>
          </div>
        </div>
        <div className="text-right">
          <div
            className="text-lg font-display font-bold"
            style={{ color: node.aiHealth >= 80 ? EMERALD : node.aiHealth >= 60 ? GOLD : RED }}
          >
            {node.aiHealth}
          </div>
          <p className="text-[9px] text-muted-foreground">AI Health</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Latency", value: `${node.metrics.latency}ms`, warn: node.metrics.latency > 10 },
          { label: "Loss", value: `${node.metrics.packetLoss}%`, warn: node.metrics.packetLoss > 0.5 },
          { label: "BW", value: `${node.metrics.bandwidth}%`, warn: node.metrics.bandwidth > 90 },
          { label: "Uptime", value: `${node.metrics.uptime}%`, warn: node.metrics.uptime < 99.5 },
        ].map((metric) => (
          <div key={metric.label} className="text-center">
            <p
              className="font-mono text-xs font-semibold"
              style={{ color: metric.warn ? GOLD : "inherit" }}
            >
              {metric.value}
            </p>
            <p className="text-[9px] text-muted-foreground">{metric.label}</p>
          </div>
        ))}
      </div>

      {node.predictions.maintenanceRecommended && (
        <div
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[10px]"
          style={{
            background: GOLD.replace(")", " / 0.10)"),
            border: `1px solid ${GOLD.replace(")", " / 0.25)")}`,
          }}
        >
          <AlertTriangle className="w-3 h-3" style={{ color: GOLD }} />
          <span style={{ color: GOLD }}>
            {node.predictions.failureProbability > 0.5 ? "Failure likely" : "Maintenance recommended"}
            {node.predictions.estimatedDowntime && ` • ${node.predictions.estimatedDowntime}`}
          </span>
        </div>
      )}
    </motion.div>
  );
}

function IncidentCard({ incident, index }: { incident: NetworkIncident; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const severityColor = getSeverityColor(incident.severity);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      className="glass rounded-xl overflow-hidden"
      style={{ border: `1px solid ${severityColor.replace(")", " / 0.30)")}` }}
    >
      <div
        className="p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{
              background: severityColor.replace(")", " / 0.15)"),
              border: `1px solid ${severityColor.replace(")", " / 0.30)")}`,
            }}
          >
            {incident.severity === "critical" ? (
              <XCircle className="w-4 h-4" style={{ color: severityColor }} />
            ) : (
              <AlertTriangle className="w-4 h-4" style={{ color: severityColor }} />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-foreground text-sm truncate">{incident.title}</h4>
              {incident.autoResolvable && (
                <Badge className="text-[9px]" style={{ background: PURPLE.replace(")", " / 0.15)"), color: PURPLE }}>
                  Auto-fix Available
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{incident.description}</p>
            <p className="text-[10px] text-muted-foreground/70 mt-1">Detected {incident.detectedAt}</p>
          </div>
          <ArrowRight className={`w-4 h-4 text-muted-foreground transition-transform ${expanded ? "rotate-90" : ""}`} />
        </div>
      </div>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="px-4 pb-4 space-y-4"
        >
          <div
            className="p-3 rounded-lg space-y-2"
            style={{
              background: PURPLE.replace(")", " / 0.08)"),
              border: `1px solid ${PURPLE.replace(")", " / 0.20)")}`,
            }}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" style={{ color: PURPLE }} />
              <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: PURPLE }}>
                EDDI Analysis
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{incident.aiAnalysis}</p>
          </div>

          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
              Suggested Actions
            </p>
            <div className="space-y-1.5">
              {incident.suggestedActions.map((action, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-foreground/80">
                  <div className="w-5 h-5 rounded bg-white/5 flex items-center justify-center text-[10px] text-muted-foreground">
                    {i + 1}
                  </div>
                  {action}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            {incident.autoResolvable && (
              <Button
                size="sm"
                className="h-7 text-xs"
                style={{
                  background: PURPLE.replace(")", " / 0.20)"),
                  border: `1px solid ${PURPLE.replace(")", " / 0.40)")}`,
                }}
              >
                <Bot className="w-3 h-3 mr-1" />
                Auto-Resolve
              </Button>
            )}
            <Button size="sm" variant="outline" className="h-7 text-xs">
              Acknowledge
            </Button>
            <Button size="sm" variant="outline" className="h-7 text-xs">
              Create Ticket
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function InsightCard({ insight, index }: { insight: AIInsight; index: number }) {
  const typeColors = {
    prediction: CYAN,
    optimization: EMERALD,
    security: GOLD,
    maintenance: PURPLE,
  };
  const color = typeColors[insight.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="glass rounded-xl p-4 space-y-3"
      style={{ border: `1px solid ${color.replace(")", " / 0.20)")}` }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" style={{ color }} />
          <Badge
            className="text-[9px] font-mono uppercase"
            style={{
              background: color.replace(")", " / 0.15)"),
              color,
              border: `1px solid ${color.replace(")", " / 0.30)")}`,
            }}
          >
            {insight.type}
          </Badge>
        </div>
        <div className="text-right">
          <p className="font-mono text-sm font-bold" style={{ color }}>{insight.confidence}%</p>
          <p className="text-[9px] text-muted-foreground">confidence</p>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-foreground text-sm">{insight.title}</h4>
        <p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-white/5">
        <Badge variant="outline" className="text-[9px]">
          {insight.impact} impact
        </Badge>
        {insight.actionRequired && (
          <Button size="sm" variant="ghost" className="h-6 text-[10px]">
            Take Action
            <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        )}
      </div>
    </motion.div>
  );
}

export default function AINetworkDiagnostics() {
  const healthyNodes = networkNodes.filter((n) => n.status === "healthy").length;
  const criticalNodes = networkNodes.filter((n) => n.status === "critical").length;
  const avgHealth = Math.round(networkNodes.reduce((sum, n) => sum + n.aiHealth, 0) / networkNodes.length);

  return (
    <div className="portal-enter min-h-screen" data-ocid="it_network_ai.page">
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
                  background: `linear-gradient(135deg, ${CYAN.replace(")", " / 0.20)")} 0%, ${PURPLE.replace(")", " / 0.10)")} 100%)`,
                  border: `1px solid ${CYAN.replace(")", " / 0.35)")}`,
                }}
              >
                <Activity className="h-4 w-4" style={{ color: CYAN }} />
                <span
                  className="font-display font-bold text-sm"
                  style={{ color: CYAN, letterSpacing: "0.18em" }}
                >
                  AI DIAGNOSTICS
                </span>
              </div>
              <div>
                <p className="font-display font-semibold text-foreground text-base leading-none">
                  Intelligent Network Monitor
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Predictive Failure Detection · Anomaly Analysis · Auto-Remediation
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button size="sm" variant="ghost" className="gap-1.5">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button
              size="sm"
              className="gap-1.5"
              style={{
                background: PURPLE.replace(")", " / 0.20)"),
                border: `1px solid ${PURPLE.replace(")", " / 0.40)")}`,
              }}
            >
              <Sparkles className="h-4 w-4" />
              Run AI Scan
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 py-6 space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Network Health", value: `${avgHealth}%`, icon: Activity, color: avgHealth >= 80 ? EMERALD : GOLD },
            { label: "Healthy Nodes", value: `${healthyNodes}/${networkNodes.length}`, icon: CheckCircle2, color: EMERALD },
            { label: "Critical Issues", value: criticalNodes.toString(), icon: AlertTriangle, color: criticalNodes > 0 ? RED : EMERALD },
            { label: "AI Insights", value: aiInsights.filter((i) => i.actionRequired).length.toString(), icon: Sparkles, color: PURPLE },
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Incidents */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-semibold text-foreground text-lg">Active Incidents</h2>
              <Badge variant="outline" className="text-xs">
                {activeIncidents.length} active
              </Badge>
            </div>
            <div className="space-y-3">
              {activeIncidents.map((incident, i) => (
                <IncidentCard key={incident.id} incident={incident} index={i} />
              ))}
            </div>

            {/* Network Topology */}
            <div className="pt-4">
              <h2 className="font-display font-semibold text-foreground text-lg mb-4">Network Nodes</h2>
              <div className="grid grid-cols-2 gap-3">
                {networkNodes.map((node, i) => (
                  <NetworkNodeCard key={node.id} node={node} index={i} />
                ))}
              </div>
            </div>
          </div>

          {/* AI Insights Sidebar */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-semibold text-foreground text-lg">AI Insights</h2>
              <Sparkles className="w-4 h-4" style={{ color: PURPLE }} />
            </div>
            <div className="space-y-3">
              {aiInsights.map((insight, i) => (
                <InsightCard key={insight.id} insight={insight} index={i} />
              ))}
            </div>

            {/* AI Assistant */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-xl p-4"
              style={{
                border: `1px solid ${PURPLE.replace(")", " / 0.25)")}`,
                background: `linear-gradient(135deg, ${PURPLE.replace(")", " / 0.10)")} 0%, transparent 100%)`,
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: PURPLE.replace(")", " / 0.20)"),
                    border: `1px solid ${PURPLE.replace(")", " / 0.35)")}`,
                  }}
                >
                  <Bot className="w-5 h-5" style={{ color: PURPLE }} />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">EDDI Network</p>
                  <p className="text-[10px] text-muted-foreground">AI Assistant Online</p>
                </div>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ask about network issues..."
                  className="w-full bg-white/5 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground border border-white/10 focus:border-white/20 focus:outline-none"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
