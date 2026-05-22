// ReasoningTrace — Visualises the 7-layer ADEDDI reasoning chain for a response.
// Shows each layer's output, PHI weights, and which engine was invoked.
// Used in EddiDeepChat.tsx.

import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronRight, Layers, Cpu, Zap } from "lucide-react";
import { useState } from "react";

const GOLD   = "oklch(0.76 0.18 84)";
const PURPLE = "oklch(0.72 0.18 280)";
const TEAL   = "oklch(0.72 0.16 185)";
const AMBER  = "oklch(0.78 0.17 70)";

export type LayerName =
  | "INPUT"
  | "CLASSIFY"
  | "COGT"
  | "META"
  | "AUTN"
  | "SYNTHESIS"
  | "SEAL";

export interface LayerOutput {
  layer: LayerName;
  output: string;
  phiWeight?: string;
  engineInvoked?: string;
  durationMs?: number;
}

export interface ReasoningTraceData {
  sessionId: string;
  version: string;
  layers: LayerOutput[];
  finalOutput: string;
  sealed: boolean;
  timestamp?: number;
}

// Layer display metadata
const LAYER_META: Record<LayerName, { color: string; icon: string; desc: string }> = {
  INPUT:     { color: "#06b6d4", icon: "→",  desc: "Raw input normalization" },
  CLASSIFY:  { color: "#3b82f6", icon: "◈",  desc: "Intent & domain classification" },
  COGT:      { color: "#8b5cf6", icon: "⬡",  desc: "Cognitive reasoning chain" },
  META:      { color: "#ec4899", icon: "⊕",  desc: "META synthesis — 3 paths + 1 novel" },
  AUTN:      { color: "#f97316", icon: "⚡", desc: "AUTN autonomous generation" },
  SYNTHESIS: { color: "#f59e0b", icon: "◉",  desc: "PHI-weighted unified synthesis" },
  SEAL:      { color: "#34d399", icon: "✦",  desc: "Sovereign seal + chain anchor" },
};

// PHI badge component
function PhiBadge({ weight }: { weight: string }) {
  return (
    <span
      className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
      style={{ color: GOLD, borderColor: `${GOLD}44`, background: `${GOLD}11` }}
    >
      φ {weight}
    </span>
  );
}

// Engine badge
function EngineBadge({ name }: { name: string }) {
  return (
    <span
      className="text-[10px] font-mono px-2 py-0.5 rounded-full border flex items-center gap-1"
      style={{ color: TEAL, borderColor: `${TEAL}44`, background: `${TEAL}11` }}
    >
      <Cpu size={9} />
      {name}
    </span>
  );
}

// Single layer row
function LayerRow({ layer, index }: { layer: LayerOutput; index: number }) {
  const [open, setOpen] = useState(index === 5); // SYNTHESIS open by default
  const meta = LAYER_META[layer.layer];

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06, duration: 0.3 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 p-3 rounded-xl border border-white/5 hover:border-white/15 transition-colors text-left"
        style={{ background: `${meta.color}08` }}
      >
        {/* Layer indicator */}
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-mono flex-shrink-0"
          style={{ background: `${meta.color}22`, color: meta.color, border: `1px solid ${meta.color}55` }}
        >
          {meta.icon}
        </div>

        {/* Layer name + description */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: meta.color }}>
              {layer.layer}
            </span>
            {layer.phiWeight && <PhiBadge weight={layer.phiWeight} />}
            {layer.engineInvoked && <EngineBadge name={layer.engineInvoked} />}
            {layer.durationMs !== undefined && (
              <span className="text-[10px] text-white/30 font-mono">{layer.durationMs}ms</span>
            )}
          </div>
          <p className="text-[11px] text-white/40 mt-0.5">{meta.desc}</p>
        </div>

        {/* Toggle */}
        <div className="text-white/30 flex-shrink-0">
          {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div
              className="mx-3 mb-2 p-3 rounded-b-xl border-x border-b border-white/5 text-xs text-white/70 font-mono leading-relaxed whitespace-pre-wrap"
              style={{ background: `${meta.color}05` }}
            >
              {layer.output || "(empty)"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface ReasoningTraceProps {
  trace: ReasoningTraceData;
  className?: string;
}

export default function ReasoningTrace({ trace, className = "" }: ReasoningTraceProps) {
  const [showTrace, setShowTrace] = useState(true);

  const completedLayers = trace.layers.length;
  const totalLayers = 7;
  const completionPct = Math.round((completedLayers / totalLayers) * 100);

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowTrace(!showTrace)}
          className="flex items-center gap-2 text-xs text-white/50 hover:text-white/80 transition-colors"
        >
          <Layers size={13} />
          <span className="font-mono uppercase tracking-widest">
            ADEDDI Reasoning Trace
          </span>
          <span
            className="text-[10px] px-2 py-0.5 rounded-full border"
            style={{ color: PURPLE, borderColor: `${PURPLE}44`, background: `${PURPLE}11` }}
          >
            {completedLayers}/{totalLayers} layers
          </span>
          {showTrace ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
        </button>

        {trace.sealed && (
          <div className="flex items-center gap-1.5">
            <Zap size={11} style={{ color: GOLD }} />
            <span className="text-[10px] font-mono" style={{ color: GOLD }}>
              SEALED
            </span>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="h-1 w-full rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${completionPct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${PURPLE}, ${GOLD})` }}
        />
      </div>

      {/* Layer list */}
      <AnimatePresence>
        {showTrace && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-1 overflow-hidden"
          >
            {trace.layers.map((layer, i) => (
              <LayerRow key={layer.layer} layer={layer} index={i} />
            ))}

            {/* Version footer */}
            <div className="pt-1 flex items-center gap-2 text-[10px] text-white/20 font-mono">
              <span>{trace.version}</span>
              <span>·</span>
              <span>session:{trace.sessionId.slice(0, 8)}</span>
              {trace.timestamp && (
                <>
                  <span>·</span>
                  <span>{new Date(trace.timestamp / 1_000_000).toLocaleTimeString()}</span>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
