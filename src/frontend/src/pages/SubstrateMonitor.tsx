// SubstrateMonitor — Multi-substrate status panel (IT portal only).
// Shows all 6 substrate nodes: ICP-MAIN, ICP-VAULT, ICP-INTELLIGENCE, ICP-RECOGNITION,
// JULIA-NUMERIC, EDURAI-LOCAL. Displays latency, status, capability flags, routing.

import EddiOrb from "@/components/EddiOrb";
import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowLeft,
  CheckCircle2,
  Cpu,
  Database,
  Globe2,
  RefreshCcw,
  Server,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const GOLD   = "oklch(0.76 0.18 84)";
const TEAL   = "oklch(0.72 0.16 185)";
const PURPLE = "oklch(0.68 0.18 280)";
const GREEN  = "oklch(0.72 0.17 155)";
const GREY   = "#6b7280";
const AMBER  = "oklch(0.78 0.17 70)";

type SubstrateType = "ICP" | "JULIA" | "EDURAI_NATIVE" | "MULTI";
type NodeStatus    = "ACTIVE" | "DEGRADED" | "OFFLINE";

interface SubstrateNode {
  id: string;
  name: string;
  type: SubstrateType;
  status: NodeStatus;
  latencyMs: number;
  capabilityFlags: string[];
  description: string;
  cycleBalance?: string;
}

const NODES_SEED: SubstrateNode[] = [
  {
    id:   "ICP-MAIN",
    name: "ICP Main Canister",
    type: "ICP",
    status: "ACTIVE",
    latencyMs: 8,
    cycleBalance: "2.3T",
    capabilityFlags: ["STATE","AUTH","HEARTBEAT","STABLE_MEM"],
    description: "Primary ICP canister — orchestrator, EDDI OS, all portal APIs. Default state + auth substrate.",
  },
  {
    id:   "ICP-VAULT",
    name: "ICP Vault Canister",
    type: "ICP",
    status: "ACTIVE",
    latencyMs: 13,
    cycleBalance: "1.8T",
    capabilityFlags: ["SOVEREIGN_MEM","KERNEL_SEEDS","PASSPORTS","SEALED_ACHV"],
    description: "AbyssusVault — sovereign memory, KERNEL_SEEDs, passports, achievement seals. Read-heavy, sealed.",
  },
  {
    id:   "ICP-INTELLIGENCE",
    name: "ICP Intelligence Canister",
    type: "ICP",
    status: "ACTIVE",
    latencyMs: 21,
    cycleBalance: "4.1T",
    capabilityFlags: ["ADEDDI","DEEP_REASON","TRACE","COMPUTE_HEAVY"],
    description: "ADEDDI deep reasoning — compute-heavy, separate cycle budget. Runs the 7-layer chain.",
  },
  {
    id:   "ICP-RECOGNITION",
    name: "ICP Recognition Canister",
    type: "ICP",
    status: "ACTIVE",
    latencyMs: 34,
    cycleBalance: "1.2T",
    capabilityFlags: ["RCGN","NOMS","ACHV","AUTONOMOUS_BG"],
    description: "RCGN + NOMS + ACHV pipeline — autonomous background recognition operations.",
  },
  {
    id:   "JULIA-NUMERIC",
    name: "Julia Numeric Runtime",
    type: "JULIA",
    status: "ACTIVE",
    latencyMs: 55,
    capabilityFlags: ["NUMERIC","MATRIX","STATS","PHI_MATH","FIBONACCI"],
    description: "Julia computation offload — Fibonacci sequences, PHI-weighted matrices, statistical engines.",
  },
  {
    id:   "EDURAI-LOCAL",
    name: "EduAI Native Inference",
    type: "EDURAI_NATIVE",
    status: "DEGRADED",
    latencyMs: 89,
    capabilityFlags: ["LOCAL_INFERENCE","COGT_FAST","NO_NETWORK"],
    description: "Local model inference layer — on-device COGT fast path. No network required. Currently initialising.",
  },
];

const TYPE_COLORS: Record<SubstrateType, string> = {
  ICP:           TEAL,
  JULIA:         PURPLE,
  EDURAI_NATIVE: AMBER,
  MULTI:         GOLD,
};

const TYPE_ICONS: Record<SubstrateType, typeof Server> = {
  ICP:           Database,
  JULIA:         Cpu,
  EDURAI_NATIVE: Globe2,
  MULTI:         Activity,
};

const STATUS_COLORS: Record<NodeStatus, string> = {
  ACTIVE:   GREEN,
  DEGRADED: GOLD,
  OFFLINE:  "#ef4444",
};

function LatencyBar({ ms }: { ms: number }) {
  // Max latency for bar = 144ms (F(12))
  const pct = Math.min(100, Math.round((ms / 144) * 100));
  const color = ms <= 21 ? GREEN : ms <= 55 ? GOLD : "#ef4444";
  return (
    <div className="h-1 w-full rounded-full bg-white/5 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-full rounded-full"
        style={{ background: color }}
      />
    </div>
  );
}

function NodeCard({ node, index }: { node: SubstrateNode; index: number }) {
  const Icon      = TYPE_ICONS[node.type];
  const typeColor = TYPE_COLORS[node.type];
  const statColor = STATUS_COLORS[node.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      className="p-5 rounded-2xl border border-white/8 backdrop-blur-sm space-y-4"
      style={{ background: `${typeColor}08` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="p-2 rounded-xl flex-shrink-0"
            style={{ background: `${typeColor}22`, border: `1px solid ${typeColor}44` }}
          >
            <Icon size={15} style={{ color: typeColor }} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-white truncate">{node.name}</p>
            <p className="text-[10px] font-mono text-white/40">{node.id}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <Badge
            className="text-[9px] border-0 font-mono"
            style={{ color: statColor, background: `${statColor}22` }}
          >
            ● {node.status}
          </Badge>
          <Badge
            className="text-[9px] border-0 font-mono"
            style={{ color: typeColor, background: `${typeColor}22` }}
          >
            {node.type}
          </Badge>
        </div>
      </div>

      {/* Description */}
      <p className="text-[11px] text-white/50 leading-relaxed">{node.description}</p>

      {/* Latency */}
      <div className="space-y-1">
        <div className="flex justify-between text-[10px]">
          <span className="text-white/30">Latency</span>
          <span className="font-mono text-white/60">{node.latencyMs}ms</span>
        </div>
        <LatencyBar ms={node.latencyMs} />
      </div>

      {/* Capability flags */}
      <div className="flex flex-wrap gap-1.5">
        {node.capabilityFlags.map((flag) => (
          <span
            key={flag}
            className="text-[9px] font-mono px-2 py-0.5 rounded-full border"
            style={{ color: typeColor, borderColor: `${typeColor}44`, background: `${typeColor}11` }}
          >
            {flag}
          </span>
        ))}
      </div>

      {/* Cycle balance (ICP only) */}
      {node.cycleBalance && (
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-white/30 flex items-center gap-1">
            <Zap size={9} />
            Cycle Balance
          </span>
          <span className="font-mono" style={{ color: TEAL }}>{node.cycleBalance} cycles</span>
        </div>
      )}
    </motion.div>
  );
}

// ── Routing legend ───────────────────────────────────────────────────────────
const ROUTING_TABLE = [
  { computeType: "AUTH / STATE",     substrate: "ICP-MAIN",          reason: "Default — all auth + state ops" },
  { computeType: "DEEP REASON",      substrate: "ICP-INTELLIGENCE",  reason: "ADEDDI 7-layer chain" },
  { computeType: "RECOGNITION",      substrate: "ICP-RECOGNITION",   reason: "RCGN/NOMS/ACHV pipeline" },
  { computeType: "PHI MATH / STATS", substrate: "JULIA-NUMERIC",     reason: "Fibonacci + matrix computation" },
  { computeType: "LOCAL INFER",      substrate: "EDURAI-LOCAL",       reason: "On-device fast COGT path" },
  { computeType: "SOVEREIGN MEM",    substrate: "ICP-VAULT",         reason: "Passports, seeds, sealed ACHV" },
];

export default function SubstrateMonitor() {
  const [nodes, setNodes] = useState(NODES_SEED);
  const [refreshing, setRefreshing] = useState(false);

  const activeCount = nodes.filter((n) => n.status === "ACTIVE").length;

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setNodes((prev) =>
        prev.map((n) => ({
          ...n,
          latencyMs: Math.max(5, n.latencyMs + Math.round((Math.random() - 0.5) * 10)),
        }))
      );
      setRefreshing(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Nav */}
        <Link
          to="/it"
          className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white/70 mb-8 transition-colors"
        >
          <ArrowLeft size={13} /> IT Portal
        </Link>

        {/* Header */}
        <div className="flex items-start justify-between gap-6 mb-10">
          <div className="flex items-center gap-5">
            <EddiOrb mode="SUBSTRATE" size="md" fieldScore={activeCount * 10} />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Substrate Monitor</h1>
              <p className="text-sm text-white/40 mt-1">
                Multi-Substrate Production Architecture · ICP + Julia + EduAI Native
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-black font-mono" style={{ color: GREEN }}>
              {activeCount}/6
            </p>
            <p className="text-[11px] font-mono text-white/40">Nodes Active</p>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {[
            { label: "ICP Canisters",    value: "4",   color: TEAL   },
            { label: "Julia Nodes",      value: "1",   color: PURPLE },
            { label: "EduAI Native",     value: "1",   color: AMBER  },
            { label: "Routing Rules",    value: "6",   color: GOLD   },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="p-4 rounded-2xl border border-white/8"
              style={{ background: `${color}08` }}
            >
              <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">{label}</p>
              <p className="text-lg font-bold font-mono" style={{ color }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Nodes */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest flex items-center gap-2">
            <Server size={12} style={{ color: TEAL }} />
            Substrate Nodes
          </h2>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/30 text-white/50 hover:text-white/80 transition-all disabled:opacity-40"
          >
            <RefreshCcw size={11} className={refreshing ? "animate-spin" : ""} />
            {refreshing ? "Polling…" : "Refresh"}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-10">
          {nodes.map((node, i) => (
            <NodeCard key={node.id} node={node} index={i} />
          ))}
        </div>

        {/* Routing table */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Activity size={12} style={{ color: GOLD }} />
            Compute Routing Table
          </h2>
          <div className="rounded-2xl border border-white/8 overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/5" style={{ background: `${GOLD}08` }}>
                  <th className="text-left px-4 py-3 text-white/40 font-semibold uppercase tracking-widest text-[10px]">Compute Type</th>
                  <th className="text-left px-4 py-3 text-white/40 font-semibold uppercase tracking-widest text-[10px]">Routes To</th>
                  <th className="text-left px-4 py-3 text-white/40 font-semibold uppercase tracking-widest text-[10px]">Reason</th>
                </tr>
              </thead>
              <tbody>
                {ROUTING_TABLE.map(({ computeType, substrate, reason }, i) => (
                  <tr
                    key={computeType}
                    className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors"
                  >
                    <td className="px-4 py-3 font-mono text-white/70">{computeType}</td>
                    <td className="px-4 py-3">
                      <span
                        className="font-mono px-2 py-0.5 rounded-full border text-[10px]"
                        style={{ color: TEAL, borderColor: `${TEAL}44`, background: `${TEAL}11` }}
                      >
                        {substrate}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white/40">{reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-white/5 flex items-center justify-between text-[11px] text-white/20 font-mono">
          <span>LEX_SUBSTRATE_MULTI · Multi-Substrate Architecture · v26</span>
          <span>IT Portal Only · ICP Default Fallback</span>
        </div>
      </div>
    </div>
  );
}
