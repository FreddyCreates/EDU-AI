import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  Check,
  CheckCircle,
  Clock,
  Database,
  Download,
  HardDrive,
  History,
  Play,
  RefreshCw,
  RotateCcw,
  Settings,
  Shield,
  Trash2,
  Upload,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

type BackupStatus = "completed" | "in_progress" | "failed" | "scheduled";
type BackupType = "full" | "incremental" | "differential";

interface BackupRecord {
  id: string;
  name: string;
  type: BackupType;
  status: BackupStatus;
  size: string;
  timestamp: string;
  duration: string;
  location: string;
}

interface RestorePoint {
  id: string;
  name: string;
  date: string;
  size: string;
  verified: boolean;
}

const backups: BackupRecord[] = [
  {
    id: "1",
    name: "Daily Backup",
    type: "incremental",
    status: "completed",
    size: "2.4 GB",
    timestamp: "May 24, 2026 3:00 AM",
    duration: "12 min",
    location: "Cloud Storage A",
  },
  {
    id: "2",
    name: "Weekly Full Backup",
    type: "full",
    status: "completed",
    size: "28.6 GB",
    timestamp: "May 19, 2026 1:00 AM",
    duration: "2h 15min",
    location: "Cloud Storage A",
  },
  {
    id: "3",
    name: "Daily Backup",
    type: "incremental",
    status: "completed",
    size: "1.8 GB",
    timestamp: "May 23, 2026 3:00 AM",
    duration: "9 min",
    location: "Cloud Storage A",
  },
  {
    id: "4",
    name: "Pre-Update Snapshot",
    type: "full",
    status: "completed",
    size: "28.2 GB",
    timestamp: "May 20, 2026 10:00 PM",
    duration: "2h 8min",
    location: "Local Storage",
  },
  {
    id: "5",
    name: "Monthly Archive",
    type: "full",
    status: "scheduled",
    size: "~30 GB",
    timestamp: "Jun 1, 2026 12:00 AM",
    duration: "~2h 30min",
    location: "Archive Storage",
  },
];

const restorePoints: RestorePoint[] = [
  {
    id: "1",
    name: "Before System Update v2.4",
    date: "May 20, 2026",
    size: "28.2 GB",
    verified: true,
  },
  {
    id: "2",
    name: "Weekly Checkpoint",
    date: "May 19, 2026",
    size: "28.6 GB",
    verified: true,
  },
  {
    id: "3",
    name: "Before Database Migration",
    date: "May 12, 2026",
    size: "27.8 GB",
    verified: true,
  },
  {
    id: "4",
    name: "Monthly Archive",
    date: "May 1, 2026",
    size: "26.5 GB",
    verified: false,
  },
];

const EMERALD = "oklch(0.72 0.17 155)";
const GOLD = "oklch(0.76 0.18 84)";
const RED = "oklch(0.65 0.22 30)";
const BLUE = "oklch(0.65 0.18 240)";
const PURPLE = "oklch(0.68 0.18 280)";

const statusColors: Record<BackupStatus, string> = {
  completed: EMERALD,
  in_progress: BLUE,
  failed: RED,
  scheduled: GOLD,
};

const typeColors: Record<BackupType, string> = {
  full: PURPLE,
  incremental: EMERALD,
  differential: GOLD,
};

export default function ITDataBackup() {
  const [activeTab, setActiveTab] = useState<
    "backups" | "restore" | "schedule"
  >("backups");
  const [showNewBackup, setShowNewBackup] = useState(false);
  const [showRetentionSettings, setShowRetentionSettings] = useState(false);

  const totalStorage = 85.4;
  const usedStorage = 67.2;
  const storagePercent = Math.round((usedStorage / totalStorage) * 100);

  return (
    <div
      data-ocid="it.backup.page"
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
              Data Backup Manager
            </h1>
            <p className="text-[oklch(0.5_0.06_265)] text-xs">
              Backups · Restore Points · Retention
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            size="sm"
            onClick={() => setShowRetentionSettings(true)}
            className="bg-white/5 hover:bg-white/10 text-[oklch(0.8_0.05_265)] border border-white/10"
          >
            <Settings className="w-4 h-4 mr-1" />
            Retention
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() => setShowNewBackup(true)}
            className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30"
          >
            <Play className="w-4 h-4 mr-1" />
            Run Backup
          </Button>
        </div>
      </div>

      {/* Storage Overview */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${EMERALD}20` }}
            >
              <HardDrive className="w-5 h-5" style={{ color: EMERALD }} />
            </div>
            <div>
              <p className="text-[oklch(0.9_0.05_265)] font-medium">
                Backup Storage
              </p>
              <p className="text-[oklch(0.5_0.06_265)] text-sm">
                {usedStorage} GB of {totalStorage} GB used
              </p>
            </div>
          </div>
          <Badge
            className="text-sm"
            style={{
              background:
                storagePercent > 90
                  ? `${RED}20`
                  : storagePercent > 75
                    ? `${GOLD}20`
                    : `${EMERALD}20`,
              color:
                storagePercent > 90
                  ? RED
                  : storagePercent > 75
                    ? GOLD
                    : EMERALD,
              borderColor:
                storagePercent > 90
                  ? `${RED}40`
                  : storagePercent > 75
                    ? `${GOLD}40`
                    : `${EMERALD}40`,
            }}
          >
            {storagePercent}% Used
          </Badge>
        </div>
        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${storagePercent}%` }}
            transition={{ duration: 1 }}
            className="h-full rounded-full"
            style={{
              background:
                storagePercent > 90
                  ? RED
                  : storagePercent > 75
                    ? GOLD
                    : EMERALD,
            }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-[oklch(0.5_0.06_265)]">
          <span>Last backup: Today, 3:00 AM</span>
          <span>Next scheduled: Tomorrow, 3:00 AM</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6">
        {[
          { key: "backups", label: "Backup History", icon: History },
          { key: "restore", label: "Restore Points", icon: RotateCcw },
          { key: "schedule", label: "Schedule", icon: Calendar },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                : "bg-white/5 text-[oklch(0.6_0.06_265)] border border-white/10 hover:bg-white/10"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Backup History Tab */}
      {activeTab === "backups" && (
        <section>
          <h2
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: EMERALD }}
          >
            <Database className="inline w-4 h-4 mr-2" />
            Recent Backups
          </h2>

          <div className="space-y-3">
            {backups.map((backup, i) => (
              <motion.div
                key={backup.id}
                data-ocid={`it.backup.item.${i + 1}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${statusColors[backup.status]}20` }}
                    >
                      {backup.status === "completed" && (
                        <CheckCircle
                          className="w-5 h-5"
                          style={{ color: statusColors[backup.status] }}
                        />
                      )}
                      {backup.status === "in_progress" && (
                        <RefreshCw
                          className="w-5 h-5 animate-spin"
                          style={{ color: statusColors[backup.status] }}
                        />
                      )}
                      {backup.status === "scheduled" && (
                        <Clock
                          className="w-5 h-5"
                          style={{ color: statusColors[backup.status] }}
                        />
                      )}
                      {backup.status === "failed" && (
                        <Trash2
                          className="w-5 h-5"
                          style={{ color: statusColors[backup.status] }}
                        />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-[oklch(0.9_0.05_265)] font-medium">
                          {backup.name}
                        </p>
                        <Badge
                          className="text-[10px] capitalize"
                          style={{
                            background: `${typeColors[backup.type]}20`,
                            color: typeColors[backup.type],
                            borderColor: `${typeColors[backup.type]}40`,
                          }}
                        >
                          {backup.type}
                        </Badge>
                        <Badge
                          className="text-[10px] capitalize"
                          style={{
                            background: `${statusColors[backup.status]}20`,
                            color: statusColors[backup.status],
                            borderColor: `${statusColors[backup.status]}40`,
                          }}
                        >
                          {backup.status.replace("_", " ")}
                        </Badge>
                      </div>
                      <p className="text-[oklch(0.5_0.06_265)] text-sm">
                        {backup.timestamp} · {backup.duration} ·{" "}
                        {backup.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[oklch(0.7_0.05_265)] font-mono text-sm">
                      {backup.size}
                    </span>
                    {backup.status === "completed" && (
                      <Button
                        type="button"
                        size="sm"
                        className="bg-white/5 hover:bg-white/10 text-[oklch(0.8_0.05_265)] border border-white/10"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Restore Points Tab */}
      {activeTab === "restore" && (
        <section>
          <h2
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: EMERALD }}
          >
            <RotateCcw className="inline w-4 h-4 mr-2" />
            Available Restore Points
          </h2>

          <div className="space-y-3">
            {restorePoints.map((point, i) => (
              <motion.div
                key={point.id}
                data-ocid={`it.backup.restore.${i + 1}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${PURPLE}20` }}
                    >
                      <Shield className="w-5 h-5" style={{ color: PURPLE }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-[oklch(0.9_0.05_265)] font-medium">
                          {point.name}
                        </p>
                        {point.verified && (
                          <Badge className="text-[10px] bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                            <Check className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-[oklch(0.5_0.06_265)] text-sm">
                        {point.date} · {point.size}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      size="sm"
                      className="bg-white/5 hover:bg-white/10 text-[oklch(0.8_0.05_265)] border border-white/10"
                    >
                      Verify
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30"
                    >
                      <RotateCcw className="w-4 h-4 mr-1" />
                      Restore
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Schedule Tab */}
      {activeTab === "schedule" && (
        <section>
          <h2
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: EMERALD }}
          >
            <Calendar className="inline w-4 h-4 mr-2" />
            Backup Schedule
          </h2>

          <div className="space-y-4">
            {[
              {
                name: "Daily Incremental",
                schedule: "Every day at 3:00 AM",
                type: "incremental" as BackupType,
                enabled: true,
              },
              {
                name: "Weekly Full",
                schedule: "Every Sunday at 1:00 AM",
                type: "full" as BackupType,
                enabled: true,
              },
              {
                name: "Monthly Archive",
                schedule: "First day of month at 12:00 AM",
                type: "full" as BackupType,
                enabled: true,
              },
            ].map((schedule, i) => (
              <motion.div
                key={schedule.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${typeColors[schedule.type]}20` }}
                    >
                      <Calendar
                        className="w-5 h-5"
                        style={{ color: typeColors[schedule.type] }}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-[oklch(0.9_0.05_265)] font-medium">
                          {schedule.name}
                        </p>
                        <Badge
                          className="text-[10px] capitalize"
                          style={{
                            background: `${typeColors[schedule.type]}20`,
                            color: typeColors[schedule.type],
                            borderColor: `${typeColors[schedule.type]}40`,
                          }}
                        >
                          {schedule.type}
                        </Badge>
                      </div>
                      <p className="text-[oklch(0.5_0.06_265)] text-sm">
                        {schedule.schedule}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={schedule.enabled}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500/50" />
                    </label>
                    <Button
                      type="button"
                      size="sm"
                      className="bg-white/5 hover:bg-white/10 text-[oklch(0.8_0.05_265)] border border-white/10"
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* New Backup Modal */}
      {showNewBackup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowNewBackup(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[oklch(0.1_0.02_265)] border border-white/10 rounded-2xl p-6 w-full max-w-md"
          >
            <h2 className="text-lg font-bold text-[oklch(0.95_0.02_265)] mb-4">
              Run Manual Backup
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Backup name (optional)"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[oklch(0.85_0.05_265)] text-sm placeholder:text-[oklch(0.4_0.05_265)] focus:outline-none focus:border-emerald-500/40"
              />
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[oklch(0.85_0.05_265)] text-sm focus:outline-none focus:border-emerald-500/40">
                <option value="incremental">Incremental Backup</option>
                <option value="full">Full Backup</option>
                <option value="differential">Differential Backup</option>
              </select>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[oklch(0.85_0.05_265)] text-sm focus:outline-none focus:border-emerald-500/40">
                <option value="cloud_a">Cloud Storage A</option>
                <option value="local">Local Storage</option>
                <option value="archive">Archive Storage</option>
              </select>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="createRestore"
                  defaultChecked
                  className="rounded border-white/20"
                />
                <label
                  htmlFor="createRestore"
                  className="text-[oklch(0.7_0.05_265)] text-sm"
                >
                  Create restore point
                </label>
              </div>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowNewBackup(false)}
                  className="flex-1 border-white/20 text-[oklch(0.6_0.08_265)]"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="flex-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30"
                >
                  <Play className="w-4 h-4 mr-1" />
                  Start Backup
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Retention Settings Modal */}
      {showRetentionSettings && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowRetentionSettings(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[oklch(0.1_0.02_265)] border border-white/10 rounded-2xl p-6 w-full max-w-md"
          >
            <h2 className="text-lg font-bold text-[oklch(0.95_0.02_265)] mb-4">
              Retention Policy
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[oklch(0.7_0.05_265)] text-sm">
                  Daily backups retention
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    defaultValue={7}
                    className="w-16 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-center text-[oklch(0.85_0.05_265)] text-sm"
                  />
                  <span className="text-[oklch(0.5_0.06_265)] text-sm">
                    days
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[oklch(0.7_0.05_265)] text-sm">
                  Weekly backups retention
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    defaultValue={4}
                    className="w-16 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-center text-[oklch(0.85_0.05_265)] text-sm"
                  />
                  <span className="text-[oklch(0.5_0.06_265)] text-sm">
                    weeks
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[oklch(0.7_0.05_265)] text-sm">
                  Monthly archives retention
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    defaultValue={12}
                    className="w-16 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-center text-[oklch(0.85_0.05_265)] text-sm"
                  />
                  <span className="text-[oklch(0.5_0.06_265)] text-sm">
                    months
                  </span>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowRetentionSettings(false)}
                  className="flex-1 border-white/20 text-[oklch(0.6_0.08_265)]"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="flex-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30"
                >
                  Save Policy
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
