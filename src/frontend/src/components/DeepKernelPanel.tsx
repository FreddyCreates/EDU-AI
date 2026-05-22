// DeepKernelPanel — Live visualization of EDDI's internal formula engine.
// Shows PHI constants, Fibonacci computation, engine routing, and live
// formula outputs in a deep-space terminal aesthetic.
// Education-only: all panels show educational computation outputs.

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Activity, Cpu, GitBranch, Layers, Zap } from "lucide-react";

const GOLD   = "oklch(0.76 0.18 84)";
const PURPLE = "oklch(0.68 0.18 280)";
const TEAL   = "oklch(0.72 0.16 185)";
const GREEN  = "oklch(0.72 0.17 155)";
const CYAN   = "oklch(0.78 0.22 200)";

const PHI   = 1.6180339887;
const FIB   = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377];

// ── PHI Formula Engine ────────────────────────────────────────────────────────
function fibFloor(n: number): number {
  let r = 1;
  for (const f of FIB) if (f <= n) r = f;
  return r;
}

function phiMastery(hot: number, warm: number, cold: number): number {
  const total = hot + warm + cold;
  if (total === 0) return 0;
  const score = (hot * 1618 + warm * 1000 + cold * 618) / (total * 1618);
  return Math.min(100, Math.round(score * 100));
}

// ── Animated counter ─────────────────────────────────────────────────────────
function AnimatedCount({ target, color }: { target: number; color: string }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let frame: number;
    const start = Date.now();
    const duration = 800;
    function tick() {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return <span style={{ color }}>{value}</span>;
}

// ── Fibonacci display bar ─────────────────────────────────────────────────────
function FibBar({ sequence, highlightIdx }: { sequence: number[]; highlightIdx: number }) {
  return (
    <div className="flex items-end gap-1">
      {sequence.slice(0, 10).map((n, i) => {
        const maxH = 28;
        const h = Math.min((n / 144) * maxH + 2, maxH);
        const isHl = i === highlightIdx;
        return (
          <motion.div
            key={n}
            title={`F(${i + 1})=${n}`}
            initial={{ height: 0 }}
            animate={{ height: h }}
            transition={{ delay: i * 0.06, duration: 0.4, ease: "easeOut" }}
            className="rounded-t-sm flex-shrink-0"
            style={{
              width: 14,
              background: isHl
                ? `linear-gradient(to top, ${GOLD}, ${PURPLE})`
                : `${PURPLE}44`,
              boxShadow: isHl ? `0 0 6px ${GOLD}88` : "none",
            }}
          />
        );
      })}
    </div>
  );
}

// ── Engine pulse row ──────────────────────────────────────────────────────────
function EnginePulse({ name, load, color }: { name: string; load: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-mono text-white/40 w-28 truncate">{name}</span>
      <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${load}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
      <span className="text-[10px] font-mono" style={{ color }}>{load}%</span>
    </div>
  );
}

// ── Formula ticker ────────────────────────────────────────────────────────────
const FORMULA_TICKS = [
  { label: "φ = (1 + √5) / 2",          result: PHI.toFixed(10),         color: GOLD   },
  { label: "φ⁻¹ = φ − 1",               result: (PHI - 1).toFixed(10),   color: PURPLE },
  { label: "φ⁻² = 2 − φ",               result: (2 - PHI).toFixed(10),   color: TEAL   },
  { label: "F(8) = 21 rate/min",         result: "21",                    color: CYAN   },
  { label: "F(11) = 89 field threshold", result: "89",                    color: GREEN  },
  { label: "φ-blend: 61.8% : 38.2%",    result: "COGT weight ratio",     color: GOLD   },
];

interface DeepKernelPanelProps {
  /** Show engine load section (default true) */
  showEngines?: boolean;
  /** Show Fibonacci bar (default true) */
  showFib?: boolean;
  /** Compact single-row mode */
  compact?: boolean;
  className?: string;
}

export default function DeepKernelPanel({
  showEngines = true,
  showFib = true,
  compact = false,
  className = "",
}: DeepKernelPanelProps) {
  const [tickIdx, setTickIdx] = useState(0);
  const [fibHl, setFibHl] = useState(0);
  const [sessionCount, setSessionCount] = useState(0);
  const [engineLoads, setEngineLoads] = useState([
    { name: "SYNTHOS",      load: 89, color: GOLD   },
    { name: "PHAEDRUS",     load: 76, color: PURPLE },
    { name: "MEMORIA-VIVA", load: 61, color: TEAL   },
    { name: "NEXUS",        load: 55, color: CYAN   },
    { name: "AURUM",        load: 34, color: GREEN  },
  ]);

  // Rotate formula ticks every 2.1s (F(8) × 100ms)
  useEffect(() => {
    const id = setInterval(() => {
      setTickIdx((i) => (i + 1) % FORMULA_TICKS.length);
    }, 2100);
    return () => clearInterval(id);
  }, []);

  // Animate fibonacci highlight every 1.3s
  useEffect(() => {
    const id = setInterval(() => {
      setFibHl((i) => (i + 1) % 10);
    }, 1300);
    return () => clearInterval(id);
  }, []);

  // Simulate session counter ticking up
  useEffect(() => {
    const id = setInterval(() => {
      setSessionCount((n) => n + 1);
    }, 3400);
    return () => clearInterval(id);
  }, []);

  // Jitter engine loads
  useEffect(() => {
    const id = setInterval(() => {
      setEngineLoads((prev) =>
        prev.map((e) => ({
          ...e,
          load: Math.min(100, Math.max(8, e.load + Math.round((Math.random() - 0.5) * 6))),
        }))
      );
    }, 2800);
    return () => clearInterval(id);
  }, []);

  const tick = FORMULA_TICKS[tickIdx];

  if (compact) {
    return (
      <div
        className={`flex items-center gap-3 px-3 py-2 rounded-xl border border-white/8 font-mono text-[10px] ${className}`}
        style={{ background: `${GOLD}08` }}
      >
        <Zap size={11} style={{ color: GOLD }} />
        <span className="text-white/40">DEEP KERNEL</span>
        <span style={{ color: tick.color }}>{tick.label} = {tick.result}</span>
        <span className="text-white/20">·</span>
        <span className="text-white/40">Sessions:</span>
        <AnimatedCount target={sessionCount} color={TEAL} />
      </div>
    );
  }

  return (
    <div
      className={`p-4 rounded-2xl border border-white/8 space-y-4 font-mono ${className}`}
      style={{ background: "rgba(4,4,12,0.72)", backdropFilter: "blur(16px)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers size={13} style={{ color: GOLD }} />
          <span className="text-[11px] text-white/60 uppercase tracking-widest">
            DEEP KERNEL
          </span>
          <span
            className="text-[9px] px-2 py-0.5 rounded-full border"
            style={{ color: GREEN, borderColor: `${GREEN}44`, background: `${GREEN}11` }}
          >
            ACTIVE
          </span>
        </div>
        <span className="text-[10px] text-white/30">LEX_DEEP_KERNEL · v1.0</span>
      </div>

      {/* PHI formula ticker */}
      <div
        className="p-3 rounded-xl border border-white/5"
        style={{ background: `${tick.color}08` }}
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[10px] text-white/40 mb-0.5">FORMULA ENGINE</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={tickIdx}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="text-xs"
                style={{ color: tick.color }}
              >
                {tick.label}
              </motion.p>
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait">
            <motion.span
              key={tickIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="text-[11px] font-bold"
              style={{ color: tick.color }}
            >
              {tick.result}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Fibonacci bar */}
      {showFib && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <p className="text-[10px] text-white/40 flex items-center gap-1">
              <GitBranch size={9} style={{ color: PURPLE }} />
              FIBONACCI SEQUENCE
            </p>
            <span className="text-[10px]" style={{ color: GOLD }}>
              F({fibHl + 1}) = {FIB[fibHl]}
            </span>
          </div>
          <FibBar sequence={FIB} highlightIdx={fibHl} />
          <div className="flex justify-between text-[9px] text-white/20">
            <span>F(1)=1</span>
            <span>F(5)=5</span>
            <span>F(8)=21</span>
            <span>F(10)=55</span>
          </div>
        </div>
      )}

      {/* Engine load bars */}
      {showEngines && (
        <div className="space-y-2">
          <p className="text-[10px] text-white/40 flex items-center gap-1">
            <Cpu size={9} style={{ color: TEAL }} />
            ENGINE φ-LOAD
          </p>
          <div className="space-y-1.5">
            {engineLoads.map((e) => (
              <EnginePulse key={e.name} {...e} />
            ))}
          </div>
        </div>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 pt-1 border-t border-white/5">
        {[
          { label: "Sessions",     value: sessionCount,  color: TEAL   },
          { label: "Engines",      value: 19,            color: PURPLE },
          { label: "φ-Formulas",  value: 6,             color: GOLD   },
        ].map(({ label, value, color }) => (
          <div key={label} className="text-center">
            <p className="text-[11px] font-bold" style={{ color }}>
              <AnimatedCount target={value} color={color} />
            </p>
            <p className="text-[9px] text-white/30 uppercase tracking-widest">{label}</p>
          </div>
        ))}
      </div>

      {/* Live pulse indicator */}
      <div className="flex items-center gap-1.5">
        <motion.div
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: GREEN }}
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="text-[10px] text-white/30">
          Deep kernel active · PHI-weighted computation running
        </span>
        <Activity size={9} className="text-white/20 ml-auto" />
      </div>
    </div>
  );
}
