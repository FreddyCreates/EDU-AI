import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  type AlertCircle,
  AlertTriangle,
  ArrowLeft,
  Bell,
  BellOff,
  Check,
  CheckCircle,
  ChevronRight,
  Clock,
  Database,
  Filter,
  Info,
  RefreshCw,
  Search,
  Server,
  Settings,
  Shield,
  Trash2,
  XCircle,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

type AlertSeverity = "critical" | "warning" | "info" | "success";
type AlertStatus = "active" | "acknowledged" | "resolved";
type AlertCategory =
  | "system"
  | "security"
  | "performance"
  | "storage"
  | "network";

interface SystemAlert {
  id: string;
  title: string;
  message: string;
  severity: AlertSeverity;
  status: AlertStatus;
  category: AlertCategory;
  timestamp: string;
  source: string;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
  resolvedAt?: string;
}

const alerts: SystemAlert[] = [
  {
    id: "1",
    title: "High Memory Usage",
    message:
      "Memory usage on primary server has exceeded 85% threshold for the past 15 minutes.",
    severity: "warning",
    status: "active",
    category: "performance",
    timestamp: "May 24, 2026 10:42 AM",
    source: "Server Monitor",
  },
  {
    id: "2",
    title: "Failed Login Attempts",
    message:
      "5 failed login attempts detected for user admin@school.edu from IP 192.168.1.105",
    severity: "critical",
    status: "active",
    category: "security",
    timestamp: "May 24, 2026 10:38 AM",
    source: "Security Module",
  },
  {
    id: "3",
    title: "Storage Capacity Warning",
    message:
      "Passport storage approaching 80% capacity. Consider archiving old records.",
    severity: "warning",
    status: "acknowledged",
    category: "storage",
    timestamp: "May 24, 2026 9:15 AM",
    source: "Storage Monitor",
    acknowledgedBy: "IT Admin",
    acknowledgedAt: "May 24, 2026 9:30 AM",
  },
  {
    id: "4",
    title: "Backup Completed",
    message: "Daily backup completed successfully. 2.4 GB backed up.",
    severity: "success",
    status: "resolved",
    category: "system",
    timestamp: "May 24, 2026 3:00 AM",
    source: "Backup Service",
    resolvedAt: "May 24, 2026 3:00 AM",
  },
  {
    id: "5",
    title: "SSL Certificate Expiry",
    message: "SSL certificate for api.eduai.school will expire in 14 days.",
    severity: "info",
    status: "active",
    category: "security",
    timestamp: "May 23, 2026 8:00 AM",
    source: "Certificate Monitor",
  },
  {
    id: "6",
    title: "Database Optimization Complete",
    message:
      "Scheduled database optimization completed. Query performance improved by 15%.",
    severity: "success",
    status: "resolved",
    category: "performance",
    timestamp: "May 23, 2026 2:00 AM",
    source: "Database Service",
    resolvedAt: "May 23, 2026 2:15 AM",
  },
];

const EMERALD = "oklch(0.72 0.17 155)";
const GOLD = "oklch(0.76 0.18 84)";
const RED = "oklch(0.65 0.22 30)";
const BLUE = "oklch(0.65 0.18 240)";
const _PURPLE = "oklch(0.68 0.18 280)";

const severityColors: Record<AlertSeverity, string> = {
  critical: RED,
  warning: GOLD,
  info: BLUE,
  success: EMERALD,
};

const severityIcons: Record<AlertSeverity, typeof AlertCircle> = {
  critical: XCircle,
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle,
};

const categoryIcons: Record<AlertCategory, typeof Server> = {
  system: Server,
  security: Shield,
  performance: Zap,
  storage: Database,
  network: RefreshCw,
};

export default function ITSystemAlerts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState<AlertSeverity | "all">(
    "all",
  );
  const [statusFilter, setStatusFilter] = useState<AlertStatus | "all">("all");
  const [showSettings, setShowSettings] = useState(false);

  const filteredAlerts = alerts.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity =
      severityFilter === "all" || a.severity === severityFilter;
    const matchesStatus = statusFilter === "all" || a.status === statusFilter;
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const stats = {
    critical: alerts.filter(
      (a) => a.severity === "critical" && a.status === "active",
    ).length,
    warning: alerts.filter(
      (a) => a.severity === "warning" && a.status === "active",
    ).length,
    active: alerts.filter((a) => a.status === "active").length,
    acknowledged: alerts.filter((a) => a.status === "acknowledged").length,
  };

  return (
    <div
      data-ocid="it.alerts.page"
      className="min-h-screen bg-[oklch(0.08_0.02_265)] p-4 md:p-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link
            to="/it/portal"
            className="text-[oklch(0.6_0.08_265)] hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-[oklch(0.95_0.02_265)]">
              System Alerts
            </h1>
            <p className="text-[oklch(0.5_0.06_265)] text-xs">
              Monitoring · Notifications · Health
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            size="sm"
            onClick={() => setShowSettings(true)}
            className="bg-white/5 hover:bg-white/10 text-[oklch(0.8_0.05_265)] border border-white/10"
          >
            <Settings className="w-4 h-4 mr-1" />
            Settings
          </Button>
          <Button
            type="button"
            size="sm"
            className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30"
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Critical Alert Banner */}
      {stats.critical > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-xl"
          style={{
            background: `${RED}20`,
            border: `1px solid ${RED}40`,
          }}
        >
          <div className="flex items-center gap-3">
            <XCircle className="w-6 h-6" style={{ color: RED }} />
            <div>
              <p className="font-medium" style={{ color: RED }}>
                {stats.critical} Critical Alert{stats.critical > 1 ? "s" : ""}{" "}
                Require Immediate Attention
              </p>
              <p className="text-[oklch(0.6_0.06_265)] text-sm">
                Review and resolve critical issues to maintain system health
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold" style={{ color: RED }}>
            {stats.critical}
          </p>
          <p className="text-[oklch(0.5_0.06_265)] text-xs">Critical</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold" style={{ color: GOLD }}>
            {stats.warning}
          </p>
          <p className="text-[oklch(0.5_0.06_265)] text-xs">Warnings</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-violet-400">{stats.active}</p>
          <p className="text-[oklch(0.5_0.06_265)] text-xs">Active</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold" style={{ color: BLUE }}>
            {stats.acknowledged}
          </p>
          <p className="text-[oklch(0.5_0.06_265)] text-xs">Acknowledged</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(0.5_0.06_265)]" />
          <input
            type="text"
            placeholder="Search alerts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-[oklch(0.85_0.05_265)] text-sm placeholder:text-[oklch(0.4_0.05_265)] focus:outline-none focus:border-emerald-500/40"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={severityFilter}
            onChange={(e) =>
              setSeverityFilter(e.target.value as AlertSeverity | "all")
            }
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-[oklch(0.8_0.05_265)] text-sm focus:outline-none focus:border-emerald-500/40"
          >
            <option value="all">All Severity</option>
            <option value="critical">Critical</option>
            <option value="warning">Warning</option>
            <option value="info">Info</option>
            <option value="success">Success</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as AlertStatus | "all")
            }
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-[oklch(0.8_0.05_265)] text-sm focus:outline-none focus:border-emerald-500/40"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="acknowledged">Acknowledged</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Alerts List */}
      <section>
        <h2
          className="text-xs font-semibold uppercase tracking-widest mb-4"
          style={{ color: EMERALD }}
        >
          <Bell className="inline w-4 h-4 mr-2" />
          Alerts ({filteredAlerts.length})
        </h2>

        <div className="space-y-3">
          {filteredAlerts.map((alert, i) => {
            const SeverityIcon = severityIcons[alert.severity];
            const CategoryIcon = categoryIcons[alert.category];
            return (
              <motion.div
                key={alert.id}
                data-ocid={`it.alerts.alert.${i + 1}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="bg-white/5 border backdrop-blur-xl rounded-xl p-4"
                style={{
                  borderColor:
                    alert.status === "active"
                      ? `${severityColors[alert.severity]}40`
                      : "rgba(255,255,255,0.1)",
                  borderLeftWidth: 4,
                  borderLeftColor: severityColors[alert.severity],
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: `${severityColors[alert.severity]}20`,
                    }}
                  >
                    <SeverityIcon
                      className="w-5 h-5"
                      style={{ color: severityColors[alert.severity] }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-[oklch(0.9_0.05_265)] font-medium">
                            {alert.title}
                          </p>
                          <Badge
                            className="text-[10px] capitalize"
                            style={{
                              background: `${severityColors[alert.severity]}20`,
                              color: severityColors[alert.severity],
                              borderColor: `${severityColors[alert.severity]}40`,
                            }}
                          >
                            {alert.severity}
                          </Badge>
                          <Badge
                            className={`text-[10px] capitalize ${
                              alert.status === "resolved"
                                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                                : alert.status === "acknowledged"
                                  ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                                  : "bg-white/5 text-[oklch(0.7_0.06_265)] border-white/10"
                            }`}
                          >
                            {alert.status}
                          </Badge>
                        </div>
                        <p className="text-[oklch(0.6_0.06_265)] text-sm">
                          {alert.message}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-[oklch(0.5_0.06_265)]">
                      <span className="flex items-center gap-1">
                        <CategoryIcon className="w-3 h-3" />
                        {alert.source}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {alert.timestamp}
                      </span>
                    </div>
                    {alert.acknowledgedBy && (
                      <p className="text-xs text-[oklch(0.5_0.06_265)] mt-1">
                        Acknowledged by {alert.acknowledgedBy} at{" "}
                        {alert.acknowledgedAt}
                      </p>
                    )}
                    {alert.status === "active" && (
                      <div className="flex gap-2 mt-3">
                        <Button
                          type="button"
                          size="sm"
                          className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Acknowledge
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          className="bg-white/5 hover:bg-white/10 text-[oklch(0.8_0.05_265)] border border-white/10"
                        >
                          <BellOff className="w-4 h-4 mr-1" />
                          Mute
                        </Button>
                      </div>
                    )}
                    {alert.status === "acknowledged" && (
                      <div className="flex gap-2 mt-3">
                        <Button
                          type="button"
                          size="sm"
                          className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Resolve
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Settings Modal */}
      {showSettings && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowSettings(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[oklch(0.1_0.02_265)] border border-white/10 rounded-2xl p-6 w-full max-w-md"
          >
            <h2 className="text-lg font-bold text-[oklch(0.95_0.02_265)] mb-4">
              Alert Settings
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-[oklch(0.8_0.05_265)] text-sm font-medium mb-3">
                  Notification Thresholds
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[oklch(0.6_0.06_265)] text-sm">
                      Memory Usage Warning
                    </span>
                    <input
                      type="number"
                      defaultValue={85}
                      className="w-20 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-center text-[oklch(0.85_0.05_265)] text-sm"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[oklch(0.6_0.06_265)] text-sm">
                      Storage Warning
                    </span>
                    <input
                      type="number"
                      defaultValue={80}
                      className="w-20 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-center text-[oklch(0.85_0.05_265)] text-sm"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[oklch(0.6_0.06_265)] text-sm">
                      Failed Login Threshold
                    </span>
                    <input
                      type="number"
                      defaultValue={5}
                      className="w-20 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-center text-[oklch(0.85_0.05_265)] text-sm"
                    />
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[oklch(0.8_0.05_265)] text-sm font-medium mb-3">
                  Email Notifications
                </p>
                <div className="space-y-2">
                  {["Critical alerts", "Warning alerts", "Daily digest"].map(
                    (item) => (
                      <div key={item} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          defaultChecked={item.includes("Critical")}
                          className="rounded border-white/20"
                        />
                        <span className="text-[oklch(0.6_0.06_265)] text-sm">
                          {item}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowSettings(false)}
                  className="flex-1 border-white/20 text-[oklch(0.6_0.08_265)]"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="flex-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30"
                >
                  Save Settings
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
