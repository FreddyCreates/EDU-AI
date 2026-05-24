import { Link } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Copy,
  ExternalLink,
  Eye,
  EyeOff,
  Key,
  Plug,
  Plus,
  RefreshCw,
  Settings,
  Trash2,
  Webhook,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface Integration {
  id: string;
  name: string;
  type: "sis" | "lms" | "communication" | "analytics" | "identity";
  status: "connected" | "disconnected" | "error";
  lastSync: string;
  description: string;
}

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
  permissions: string[];
}

interface WebhookConfig {
  id: string;
  name: string;
  url: string;
  events: string[];
  status: "active" | "paused" | "failed";
  lastTriggered: string;
}

const mockIntegrations: Integration[] = [
  {
    id: "1",
    name: "PowerSchool SIS",
    type: "sis",
    status: "connected",
    lastSync: "5 minutes ago",
    description: "Student Information System integration",
  },
  {
    id: "2",
    name: "Google Classroom",
    type: "lms",
    status: "connected",
    lastSync: "12 minutes ago",
    description: "Learning Management System sync",
  },
  {
    id: "3",
    name: "Microsoft Teams",
    type: "communication",
    status: "error",
    lastSync: "Failed 2 hours ago",
    description: "Communication platform integration",
  },
  {
    id: "4",
    name: "Clever SSO",
    type: "identity",
    status: "connected",
    lastSync: "1 hour ago",
    description: "Single sign-on provider",
  },
  {
    id: "5",
    name: "Canvas LMS",
    type: "lms",
    status: "disconnected",
    lastSync: "Never",
    description: "Alternative LMS integration",
  },
];

const mockApiKeys: ApiKey[] = [
  {
    id: "1",
    name: "Mobile App API",
    key: "edu_live_sk_1234567890abcdef",
    created: "2024-01-15",
    lastUsed: "2 hours ago",
    permissions: ["read:students", "read:grades", "write:attendance"],
  },
  {
    id: "2",
    name: "SIS Sync Service",
    key: "edu_live_sk_0987654321fedcba",
    created: "2024-02-20",
    lastUsed: "5 minutes ago",
    permissions: ["read:all", "write:students", "write:teachers"],
  },
  {
    id: "3",
    name: "Analytics Dashboard",
    key: "edu_live_sk_abcdef1234567890",
    created: "2024-03-10",
    lastUsed: "1 day ago",
    permissions: ["read:analytics", "read:reports"],
  },
];

const mockWebhooks: WebhookConfig[] = [
  {
    id: "1",
    name: "Student Enrollment",
    url: "https://sis.school.edu/webhooks/enrollment",
    events: ["student.created", "student.updated", "student.deleted"],
    status: "active",
    lastTriggered: "1 hour ago",
  },
  {
    id: "2",
    name: "Grade Updates",
    url: "https://lms.school.edu/webhooks/grades",
    events: ["grade.created", "grade.updated"],
    status: "active",
    lastTriggered: "30 minutes ago",
  },
  {
    id: "3",
    name: "Attendance Alerts",
    url: "https://alerts.school.edu/webhooks/attendance",
    events: ["attendance.absent", "attendance.tardy"],
    status: "failed",
    lastTriggered: "Failed 3 hours ago",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "connected":
    case "active":
      return "oklch(0.72 0.17 155)";
    case "disconnected":
    case "paused":
      return "oklch(0.65 0.10 250)";
    case "error":
    case "failed":
      return "oklch(0.65 0.22 30)";
    default:
      return "oklch(0.65 0.10 250)";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "connected":
    case "active":
      return <CheckCircle2 className="w-4 h-4" />;
    case "disconnected":
    case "paused":
      return <XCircle className="w-4 h-4" />;
    case "error":
    case "failed":
      return <AlertTriangle className="w-4 h-4" />;
    default:
      return <XCircle className="w-4 h-4" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "sis":
      return "oklch(0.68 0.18 280)";
    case "lms":
      return "oklch(0.65 0.18 240)";
    case "communication":
      return "oklch(0.72 0.17 155)";
    case "analytics":
      return "oklch(0.76 0.18 84)";
    case "identity":
      return "oklch(0.70 0.15 200)";
    default:
      return "oklch(0.65 0.10 250)";
  }
};

export default function IntegrationHub() {
  const [activeTab, setActiveTab] = useState<
    "integrations" | "apikeys" | "webhooks"
  >("integrations");
  const [showKeyId, setShowKeyId] = useState<string | null>(null);
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);

  const handleCopyKey = (key: string, keyId: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKeyId(keyId);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const tabs = [
    { id: "integrations", label: "Integrations", icon: Plug },
    { id: "apikeys", label: "API Keys", icon: Key },
    { id: "webhooks", label: "Webhooks", icon: Webhook },
  ] as const;

  const healthStats = {
    connected: mockIntegrations.filter((i) => i.status === "connected").length,
    total: mockIntegrations.length,
    activeWebhooks: mockWebhooks.filter((w) => w.status === "active").length,
    totalWebhooks: mockWebhooks.length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
          data-ocid="it.integrationhub.header"
        >
          <div className="flex items-center gap-4">
            <Link
              to="/it"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              data-ocid="it.integrationhub.back"
            >
              <ArrowLeft className="w-5 h-5 text-slate-400" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Integration Hub</h1>
              <p className="text-slate-400">
                Manage third-party connections and APIs
              </p>
            </div>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-all hover:scale-105"
            style={{ background: "oklch(0.68 0.18 280)" }}
            data-ocid="it.integrationhub.add-integration"
          >
            <Plus className="w-4 h-4" />
            Add Integration
          </button>
        </motion.div>

        {/* Health Overview */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
          data-ocid="it.integrationhub.health-overview"
        >
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div
                className="p-2 rounded-lg"
                style={{ background: "oklch(0.72 0.17 155 / 0.2)" }}
              >
                <Plug
                  className="w-5 h-5"
                  style={{ color: "oklch(0.72 0.17 155)" }}
                />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {healthStats.connected}/{healthStats.total}
                </p>
                <p className="text-sm text-slate-400">Connected</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div
                className="p-2 rounded-lg"
                style={{ background: "oklch(0.65 0.18 240 / 0.2)" }}
              >
                <Key
                  className="w-5 h-5"
                  style={{ color: "oklch(0.65 0.18 240)" }}
                />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {mockApiKeys.length}
                </p>
                <p className="text-sm text-slate-400">API Keys</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div
                className="p-2 rounded-lg"
                style={{ background: "oklch(0.68 0.18 280 / 0.2)" }}
              >
                <Webhook
                  className="w-5 h-5"
                  style={{ color: "oklch(0.68 0.18 280)" }}
                />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {healthStats.activeWebhooks}/{healthStats.totalWebhooks}
                </p>
                <p className="text-sm text-slate-400">Active Webhooks</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div
                className="p-2 rounded-lg"
                style={{ background: "oklch(0.76 0.18 84 / 0.2)" }}
              >
                <Activity
                  className="w-5 h-5"
                  style={{ color: "oklch(0.76 0.18 84)" }}
                />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">99.8%</p>
                <p className="text-sm text-slate-400">Uptime</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 border-b border-white/10 pb-2"
          data-ocid="it.integrationhub.tabs"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-white/10 text-white"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
              data-ocid={`it.integrationhub.tab.${tab.id}`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        {activeTab === "integrations" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
            data-ocid="it.integrationhub.integrations-list"
          >
            {mockIntegrations.map((integration, i) => (
              <motion.div
                key={integration.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-4"
                data-ocid={`it.integrationhub.integration.${integration.id}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        background: `${getTypeColor(integration.type)}20`,
                      }}
                    >
                      <Plug
                        className="w-6 h-6"
                        style={{ color: getTypeColor(integration.type) }}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-white">
                          {integration.name}
                        </h3>
                        <span
                          className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                          style={{
                            background: `${getStatusColor(integration.status)}20`,
                            color: getStatusColor(integration.status),
                          }}
                        >
                          {getStatusIcon(integration.status)}
                          {integration.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400">
                        {integration.description}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Last sync: {integration.lastSync}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                      title="Sync now"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                      title="Settings"
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                      title="Open integration"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "apikeys" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
            data-ocid="it.integrationhub.apikeys-list"
          >
            <div className="flex justify-end">
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-all hover:scale-105"
                style={{ background: "oklch(0.65 0.18 240)" }}
                data-ocid="it.integrationhub.create-key"
              >
                <Plus className="w-4 h-4" />
                Create API Key
              </button>
            </div>

            {mockApiKeys.map((apiKey, i) => (
              <motion.div
                key={apiKey.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-4"
                data-ocid={`it.integrationhub.apikey.${apiKey.id}`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-white">
                      {apiKey.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <code className="px-3 py-1.5 rounded-lg bg-black/30 text-sm text-slate-300 font-mono">
                        {showKeyId === apiKey.id
                          ? apiKey.key
                          : `${apiKey.key.replace(/./g, "•").slice(0, 20)}...`}
                      </code>
                      <button
                        onClick={() =>
                          setShowKeyId(
                            showKeyId === apiKey.id ? null : apiKey.id,
                          )
                        }
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                      >
                        {showKeyId === apiKey.id ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleCopyKey(apiKey.key, apiKey.id)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                      >
                        {copiedKeyId === apiKey.id ? (
                          <CheckCircle2
                            className="w-4 h-4"
                            style={{ color: "oklch(0.72 0.17 155)" }}
                          />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {apiKey.permissions.map((perm) => (
                        <span
                          key={perm}
                          className="px-2 py-0.5 rounded-full text-xs bg-white/5 text-slate-400"
                        >
                          {perm}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500">
                      Created: {apiKey.created} • Last used: {apiKey.lastUsed}
                    </p>
                  </div>
                  <button
                    className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 transition-colors text-slate-400 hover:text-red-400"
                    title="Revoke key"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "webhooks" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
            data-ocid="it.integrationhub.webhooks-list"
          >
            <div className="flex justify-end">
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-all hover:scale-105"
                style={{ background: "oklch(0.68 0.18 280)" }}
                data-ocid="it.integrationhub.create-webhook"
              >
                <Plus className="w-4 h-4" />
                Create Webhook
              </button>
            </div>

            {mockWebhooks.map((webhook, i) => (
              <motion.div
                key={webhook.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-4"
                data-ocid={`it.integrationhub.webhook.${webhook.id}`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-white">
                        {webhook.name}
                      </h3>
                      <span
                        className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{
                          background: `${getStatusColor(webhook.status)}20`,
                          color: getStatusColor(webhook.status),
                        }}
                      >
                        {getStatusIcon(webhook.status)}
                        {webhook.status}
                      </span>
                    </div>
                    <code className="block px-3 py-1.5 rounded-lg bg-black/30 text-sm text-slate-300 font-mono">
                      {webhook.url}
                    </code>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {webhook.events.map((event) => (
                        <span
                          key={event}
                          className="px-2 py-0.5 rounded-full text-xs font-medium"
                          style={{
                            background: "oklch(0.68 0.18 280 / 0.2)",
                            color: "oklch(0.68 0.18 280)",
                          }}
                        >
                          {event}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500">
                      Last triggered: {webhook.lastTriggered}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                      title="Test webhook"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                      title="Settings"
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 transition-colors text-slate-400 hover:text-red-400"
                      title="Delete webhook"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
