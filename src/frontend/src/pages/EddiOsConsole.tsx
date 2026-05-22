// EddiOsConsole — EDDI OS Status Dashboard (IT portal only, desktop-first).
// Displays all 10 EDDI OS subsystems with lifecycle status, heartbeat, PHI health score.

import AstroBackground from "@/components/AstroBackground";
import DeepKernelPanel from "@/components/DeepKernelPanel";
import EddiOrb from "@/components/EddiOrb";
import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowLeft,
  CheckCircle2,
  Cpu,
  Layers,
  Power,
  PowerOff,
  RefreshCcw,
  Shield,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const GOLD    = "oklch(0.76 0.18 84)";
const TEAL    = "oklch(0.72 0.16 185)";
const PURPLE  = "oklch(0.68 0.18 280)";
const GREEN   = "oklch(0.72 0.17 155)";
const GREY    = "#6b7280";

type SysStatus = "ACTIVE" | "DORMANT" | "BOOTING" | "ERROR";

interface Subsystem {
  id: string;
  name: string;
  status: SysStatus;
  description: string;
  phiLoad: number; // 0-100
  heartbeats: number;
}

const SUBSYSTEMS_SEED: Subsystem[] = [
  { id: "ADEDDI",       name: "Alpha Deep EDDI",         status: "ACTIVE",  description: "7-layer sovereign reasoning organism",           phiLoad: 89, heartbeats: 144 },
  { id: "EDDI_CORE",    name: "EDDI Core",                status: "ACTIVE",  description: "Single intelligence model — 10 modes",          phiLoad: 76, heartbeats: 144 },
  { id: "ENGINE_REG",   name: "Engine Registry",          status: "ACTIVE",  description: "20 sovereign engines, immutable registry",      phiLoad: 55, heartbeats: 144 },
  { id: "COGT",         name: "COGT Cognitive Chain",     status: "ACTIVE",  description: "Expand → Critique → Synthesise reasoning",      phiLoad: 61, heartbeats: 133 },
  { id: "META_SYNTH",   name: "META Synthesis",           status: "ACTIVE",  description: "Architecture Council 3-path + 1 novel law",     phiLoad: 68, heartbeats: 144 },
  { id: "AUTN",         name: "AUTN Autonomous",          status: "ACTIVE",  description: "PHI-entropy seeded novel response generator",   phiLoad: 47, heartbeats: 89  },
  { id: "FIELD_MON",    name: "Field Monitor",            status: "ACTIVE",  description: "Aggregate organism health — no PII",            phiLoad: 38, heartbeats: 89  },
  { id: "DOCTRINE_CPL", name: "Doctrine Compiler",        status: "ACTIVE",  description: "5 artifact formats — on-chain crystallisation", phiLoad: 29, heartbeats: 55  },
  { id: "SUBSTRATE_REG", name: "Substrate Registry",     status: "ACTIVE",  description: "ICP / Julia / EduAI-Native routing",            phiLoad: 21, heartbeats: 55  },
  { id: "UPGRADE_GRD",  name: "Upgrade Guard",            status: "ACTIVE",  description: "Pre/post upgrade stable memory validation",      phiLoad: 13, heartbeats: 34  },
];

const statusColors: Record<SysStatus, string> = {
  ACTIVE:  GREEN,
  DORMANT: GREY,
  BOOTING: GOLD,
  ERROR:   "#ef4444",
};

function StatusDot({ status }: { status: SysStatus }) {
  const c = statusColors[status];
  return (
    <span className="relative flex h-2 w-2">
      {status === "ACTIVE" && (
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: c }} />
      )}
      <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: c }} />
    </span>
  );
}

function PhiBar({ value }: { value: number }) {
  return (
    <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${PURPLE}, ${GOLD})` }}
      />
    </div>
  );
}

function SubsystemCard({ sys, index }: { sys: Subsystem; index: number }) {
  const [localStatus, setLocalStatus] = useState<SysStatus>(sys.status);

  const toggle = () => {
    setLocalStatus((s) => s === "ACTIVE" ? "DORMANT" : "BOOTING");
    // Simulate BOOTING → ACTIVE transition
    setTimeout(() => {
      setLocalStatus((s) => s === "BOOTING" ? "ACTIVE" : s);
    }, 1500);
  };

  const color = statusColors[localStatus];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      className="p-4 rounded-2xl border border-white/8 backdrop-blur-sm space-y-3"
      style={{ background: `${color}08` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <StatusDot status={localStatus} />
          <div className="min-w-0">
            <p className="text-xs font-bold text-white truncate">{sys.name}</p>
            <p className="text-[10px] font-mono text-white/40">{sys.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Badge
            className="text-[9px] border-0 font-mono px-2 py-0.5"
            style={{ color, background: `${color}22` }}
          >
            {localStatus}
          </Badge>
          <button
            onClick={toggle}
            className="p-1 rounded-lg border border-white/10 hover:border-white/30 text-white/40 hover:text-white/80 transition-colors"
            title={localStatus === "ACTIVE" ? "Shutdown subsystem" : "Boot subsystem"}
          >
            {localStatus === "ACTIVE" ? <PowerOff size={11} /> : <Power size={11} />}
          </button>
        </div>
      </div>

      <p className="text-[11px] text-white/50">{sys.description}</p>

      <div className="space-y-1">
        <div className="flex justify-between text-[10px]">
          <span className="text-white/30">φ Load</span>
          <span className="font-mono" style={{ color: GOLD }}>{sys.phiLoad}%</span>
        </div>
        <PhiBar value={sys.phiLoad} />
      </div>

      <div className="flex justify-between text-[10px] text-white/30">
        <span className="flex items-center gap-1">
          <Activity size={9} />
          {sys.heartbeats.toLocaleString()} ticks
        </span>
        <span className="font-mono" style={{ color: TEAL }}>
          {localStatus === "ACTIVE" ? "●" : "○"} ICP-MAIN
        </span>
      </div>
    </motion.div>
  );
}

export default function EddiOsConsole() {
  const [refreshing, setRefreshing] = useState(false);
  const [subsystems, setSubsystems] = useState(SUBSYSTEMS_SEED);

  const activeCount  = subsystems.filter((s) => s.status === "ACTIVE").length;
  const fieldScore   = Math.round(subsystems.reduce((a, s) => a + s.phiLoad, 0) / subsystems.length);
  const healthStatus = fieldScore >= 55 ? "HEALTHY" : fieldScore >= 21 ? "DEGRADED" : "CRITICAL";
  const healthColor  = fieldScore >= 55 ? GREEN : fieldScore >= 21 ? GOLD : "#ef4444";

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate refresh: jitter phi loads slightly
    setTimeout(() => {
      setSubsystems((prev) =>
        prev.map((s) => ({
          ...s,
          phiLoad: Math.min(100, Math.max(5, s.phiLoad + Math.round((Math.random() - 0.5) * 8))),
          heartbeats: s.heartbeats + Math.round(Math.random() * 5),
        }))
      );
      setRefreshing(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10 relative">
      {/* Astro deep-space background */}
      <AstroBackground starCount={89} nebulaCount={5} showConstellation={true} />
      {/* Nav */}
      <div className="max-w-6xl mx-auto">
        <Link
          to="/it/portal"
          className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white/70 mb-8 transition-colors"
        >
          <ArrowLeft size={13} /> IT Portal
        </Link>

        {/* Header */}
        <div className="flex items-start justify-between gap-6 mb-10">
          <div className="flex items-center gap-5">
            <EddiOrb mode="DEEP" size="md" fieldScore={fieldScore} />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">EDDI OS Console</h1>
              <p className="text-sm text-white/40 mt-1">
                Alpha Deep EDDI — Sovereign Organism Kernel v26
              </p>
            </div>
          </div>

          {/* Global health */}
          <div className="text-right">
            <p
              className="text-3xl font-black font-mono"
              style={{ color: healthColor }}
            >
              {fieldScore}
            </p>
            <p className="text-[11px] font-mono text-white/40">φ Health Score</p>
            <Badge
              className="mt-1 text-[10px] border-0"
              style={{ color: healthColor, background: `${healthColor}22` }}
            >
              {healthStatus}
            </Badge>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {[
            { label: "Active Subsystems",  value: `${activeCount}/10`,          icon: CheckCircle2, color: GREEN  },
            { label: "Sovereign Engines",  value: "20",                         icon: Cpu,          color: PURPLE },
            { label: "ADEDDI Version",     value: "v26-ALPHA",                  icon: Layers,       color: GOLD   },
            { label: "Substrate Nodes",    value: "6",                          icon: Shield,       color: TEAL   },
          ].map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="p-4 rounded-2xl border border-white/8 backdrop-blur-sm"
              style={{ background: `${color}08` }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon size={13} style={{ color }} />
                <span className="text-[10px] text-white/40 uppercase tracking-widest">{label}</span>
              </div>
              <p className="text-lg font-bold font-mono" style={{ color }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Refresh button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest flex items-center gap-2">
            <Zap size={12} style={{ color: GOLD }} />
            Subsystem Registry
          </h2>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/30 text-white/50 hover:text-white/80 transition-all disabled:opacity-40"
          >
            <RefreshCcw size={11} className={refreshing ? "animate-spin" : ""} />
            {refreshing ? "Refreshing…" : "Refresh"}
          </button>
        </div>

        {/* Subsystem grid */}
        <div className="grid grid-cols-2 gap-3">
          {subsystems.map((sys, i) => (
            <SubsystemCard key={sys.id} sys={sys} index={i} />
          ))}
        </div>

        {/* Deep Kernel Panel */}
        <div className="mt-6">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest flex items-center gap-2 mb-4">
            <span style={{ color: GOLD }}>φ</span>
            Deep Kernel Formula Engine
          </h2>
          <DeepKernelPanel showEngines={true} showFib={true} />
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between text-[11px] text-white/20 font-mono">
          <span>EDDI OS · Alpha Deep EDDI · LEX_EDDI_OS · v26</span>
          <span>IT Portal Only · ICP Canister</span>
        </div>
      </div>
    </div>
  );
}
