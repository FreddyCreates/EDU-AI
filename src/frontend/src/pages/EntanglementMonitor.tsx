import {
  useEntanglementStats,
  useEntanglements,
  useNrveState,
  usePlseState,
} from "@/hooks/use-entanglements";
import { cn } from "@/lib/utils";
import { Activity } from "lucide-react";
import { motion } from "motion/react";

// The 5 intelligence entanglement IDs (distinct visual treatment)
const _INTELLIGENCE_ENTANGLEMENTS = new Set([
  "NRVE",
  "PLSE",
  "MSRY",
  "ECHO",
  "FLUX",
]);

function _DirectionBadge({ dir }: { dir: string }) {
  const isBidir = dir === "bidirectional";
  return (
    <span
      className={cn(
        "inline-block rounded px-1.5 py-0.5 text-[10px] font-bold font-mono tracking-widest uppercase",
        isBidir
          ? "bg-blue-500/15 text-blue-400 border border-blue-500/30"
          : "bg-muted text-muted-foreground border border-border",
      )}
    >
      {isBidir ? "BIDIR" : "UNIDIR"}
    </span>
  );
}

function _StatusBadge({ isActive }: { isActive: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-bold font-mono tracking-widest uppercase",
        isActive
          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
          : "bg-amber-500/15 text-amber-400 border border-amber-500/30",
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          isActive ? "bg-emerald-400" : "bg-amber-400",
        )}
      />
      {isActive ? "ACTIVE" : "DORMANT"}
    </span>
  );
}

function NrveDetail() {
  const { nrveState } = useNrveState();
  if (!nrveState) return null;
  return (
    <div className="mt-2 pt-2 border-t border-border/50 grid grid-cols-2 gap-x-3 gap-y-1">
      <span className="text-[10px] text-muted-foreground">Phase</span>
      <span className="text-[10px] font-mono text-foreground truncate">
        {nrveState.cogtPhase}
      </span>
      <span className="text-[10px] text-muted-foreground">Engine</span>
      <span className="text-[10px] font-mono text-foreground truncate">
        {nrveState.activeEngine}
      </span>
      <span className="text-[10px] text-muted-foreground">COH</span>
      <span className="text-[10px] font-mono text-emerald-400">
        {nrveState.coherenceScore.toString()}
      </span>
      <span className="text-[10px] text-muted-foreground">PHI</span>
      <span className="text-[10px] font-mono text-primary">
        {nrveState.phiRatio.toString()}
      </span>
    </div>
  );
}

function PlseDetail() {
  const { plseState } = usePlseState();
  if (!plseState) return null;
  return (
    <div className="mt-2 pt-2 border-t border-border/50 grid grid-cols-2 gap-x-3 gap-y-1">
      <span className="text-[10px] text-muted-foreground">Heartbeat</span>
      <span className="text-[10px] font-mono text-foreground">
        {plseState.heartbeatCycle.toString()}
      </span>
      <span className="text-[10px] text-muted-foreground">PHI interval</span>
      <span className="text-[10px] font-mono text-primary">
        {plseState.phiHeartbeatInterval.toString()}
      </span>
      <span className="text-[10px] text-muted-foreground">Queue depth</span>
      <span className="text-[10px] font-mono text-foreground">
        {plseState.curiosityQueue.length}
      </span>
      <span className="text-[10px] text-muted-foreground">Last seed</span>
      <span className="text-[10px] font-mono text-foreground truncate">
        {plseState.lastAutonSeed.concept}
      </span>
    </div>
  );
}

const NODE_META: Record<string, { role: string; color: string; glow: string }> =
  {
    NRVE: {
      role: "Neural Relay",
      color: "oklch(0.72 0.20 200)",
      glow: "rgba(0,210,255,0.25)",
    },
    PLSE: {
      role: "Pulse Carrier",
      color: "oklch(0.68 0.18 280)",
      glow: "rgba(160,100,255,0.25)",
    },
    MSRY: {
      role: "Memory Sync",
      color: "oklch(0.76 0.18 84)",
      glow: "rgba(255,185,0,0.20)",
    },
    ECHO: {
      role: "Echo Chamber",
      color: "oklch(0.72 0.17 155)",
      glow: "rgba(0,220,130,0.20)",
    },
    FLUX: {
      role: "Flux Bridge",
      color: "oklch(0.63 0.15 340)",
      glow: "rgba(255,100,150,0.20)",
    },
  };

export default function EntanglementMonitor() {
  const { entanglements, isLoading } = useEntanglements();
  const { stats } = useEntanglementStats();

  const intelligenceNodes = ["NRVE", "PLSE", "MSRY", "ECHO", "FLUX"];
  const allNodes = entanglements.filter((e) =>
    intelligenceNodes.includes(e.id),
  );

  const formatTimestamp = (ts: bigint) => {
    if (ts === 0n) return "—";
    const ms = Number(ts / 1_000_000n);
    if (ms === 0) return "—";
    return new Date(ms).toLocaleTimeString();
  };

  const totalTransits = stats ? Number(stats.totalTransits) : 0;
  const avgCohDelta = stats ? Number(stats.avgCoherenceDelta) : 0;
  const activeCount = stats ? Number(stats.activeCount) : 0;
  const lastRefresh = stats ? formatTimestamp(stats.lastRefresh) : "—";

  const ringCirc = 2 * Math.PI * 40;
  const cohPct = Math.min(100, Math.max(0, 50 + avgCohDelta * 5));
  const ringOffset = ringCirc - (cohPct / 100) * ringCirc;

  return (
    <div className="min-h-screen" data-ocid="entanglements.page">
      {/* OS HEADER */}
      <div
        className="glass-lg sticky top-0 z-40 border-b"
        style={{ borderColor: "oklch(0.72 0.20 200 / 0.18)" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="relative w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: "oklch(0.72 0.20 200 / 0.15)",
                border: "1px solid oklch(0.72 0.20 200 / 0.35)",
              }}
            >
              <Activity
                className="w-4 h-4"
                style={{ color: "oklch(0.72 0.20 200)" }}
              />
              <span
                className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full animate-pulse"
                style={{
                  background: "oklch(0.72 0.20 200)",
                  boxShadow: "0 0 6px oklch(0.72 0.20 200)",
                }}
              />
            </div>
            <div>
              <h1 className="font-display font-extrabold text-foreground tracking-widest text-sm uppercase">
                ENTANGLEMENT NETWORK
              </h1>
              <p
                className="text-[10px] font-mono"
                style={{ color: "oklch(0.72 0.20 200 / 0.8)" }}
              >
                Sovereign Substrate Couplings — Live
              </p>
            </div>
          </div>
          <div
            className="flex items-center gap-2 glass-sm rounded-full px-3 py-1.5"
            data-ocid="entanglements.refresh_indicator"
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "oklch(0.72 0.20 200)" }}
            />
            <span className="text-xs font-mono text-muted-foreground">
              Auto-refresh 5s
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* STATS ROW */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Total Transits",
              value: String(totalTransits),
              color: "oklch(0.72 0.20 200)",
            },
            {
              label: "Avg COH Δ",
              value: (avgCohDelta >= 0 ? "+" : "") + String(avgCohDelta),
              color:
                avgCohDelta >= 0
                  ? "oklch(0.72 0.18 162)"
                  : "oklch(0.76 0.18 84)",
            },
            {
              label: "Active Nodes",
              value: String(activeCount),
              color: "oklch(0.68 0.18 280)",
            },
            {
              label: "Last Refresh",
              value: lastRefresh,
              color: "oklch(0.55 0.01 260)",
            },
          ].map(({ label, value, color }, _i) => (
            <div
              key={label}
              className="glass rounded-2xl p-4 space-y-2"
              data-ocid="entanglements.stat_card"
            >
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                {label}
              </span>
              <span
                className="block text-2xl font-display font-extrabold"
                style={{ color }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* NODE CARDS GRID */}
        {isLoading && allNodes.length === 0 ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
            data-ocid="entanglements.loading_state"
          >
            {intelligenceNodes.map((id) => (
              <div key={id} className="glass rounded-2xl h-56 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {intelligenceNodes.map((nodeId, idx) => {
              const ent = allNodes.find((e) => e.id === nodeId);
              const meta = NODE_META[nodeId];
              const isActive = ent
                ? "active" in (ent.status as unknown as Record<string, unknown>)
                : false;
              const cohDelta = ent ? Number(ent.coherenceDelta) : 0;
              return (
                <div
                  key={nodeId}
                  className="glass rounded-2xl p-5 space-y-4 hover:border-white/15 transition-glass glass-shimmer"
                  style={{
                    borderColor: `${meta.color.replace(")", " / 0.25)")}`,
                  }}
                  data-ocid={`entanglements.item.${idx + 1}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span
                        className="block font-mono text-3xl font-extrabold tracking-tighter leading-none"
                        style={{ color: meta.color }}
                      >
                        {nodeId}
                      </span>
                      <span className="block text-[11px] text-muted-foreground mt-1">
                        {meta.role}
                      </span>
                    </div>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[9px] font-bold font-mono uppercase tracking-widest",
                        isActive ? "border" : "border",
                      )}
                      style={
                        isActive
                          ? {
                              color: "oklch(0.72 0.18 162)",
                              background: "oklch(0.72 0.18 162 / 0.12)",
                              borderColor: "oklch(0.72 0.18 162 / 0.3)",
                            }
                          : {
                              color: "oklch(0.76 0.18 84)",
                              background: "oklch(0.76 0.18 84 / 0.12)",
                              borderColor: "oklch(0.76 0.18 84 / 0.3)",
                            }
                      }
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: isActive
                            ? "oklch(0.72 0.18 162)"
                            : "oklch(0.76 0.18 84)",
                        }}
                      />
                      {isActive ? "ACTIVE" : "DORMANT"}
                    </span>
                  </div>

                  <div className="glass-sm rounded-xl p-3 text-center">
                    <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                      Coherence Δ
                    </p>
                    <p
                      className="text-xl font-display font-bold mt-1"
                      style={{
                        color:
                          cohDelta >= 0
                            ? "oklch(0.72 0.18 162)"
                            : "oklch(0.65 0.22 22)",
                      }}
                    >
                      {cohDelta >= 0 ? `+${cohDelta}` : cohDelta}
                    </p>
                  </div>

                  {ent && (
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-muted-foreground">
                        {Number(ent.transitCount)} transits
                      </span>
                      <div className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
                        <span>{ent.sourceSubstrate}</span>
                        <span>
                          {"bidirectional" in
                          (ent.direction as unknown as Record<string, unknown>)
                            ? "⇔"
                            : "→"}
                        </span>
                        <span>{ent.targetSubstrate}</span>
                      </div>
                    </div>
                  )}

                  {nodeId === "NRVE" && <NrveDetail />}
                  {nodeId === "PLSE" && <PlseDetail />}
                </div>
              );
            })}
          </div>
        )}

        {/* LANGUAGE BRIDGES — Animated Entanglement Nodes */}
        <section className="mb-8" data-ocid="entanglements.bridge_section">
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-emerald-400">
              Language Bridge Entanglements
            </h2>
            <span
              className="h-1.5 w-1.5 rounded-full animate-pulse"
              style={{ background: "oklch(0.72 0.17 155)" }}
            />
            <span className="text-[10px] font-mono text-muted-foreground">
              LEX_PONTIFEX · Sovereign Native
            </span>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-[10px] font-mono text-muted-foreground">
                Transits:
              </span>
              <span
                className="font-mono text-[11px] font-bold"
                style={{ color: "oklch(0.72 0.17 155)" }}
              >
                {totalTransits.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="space-y-3">
            {[
              {
                id: "PONT",
                leftSubstrate: "ICPM",
                leftLabel: "Motoko",
                rightSubstrate: "JLIA",
                rightLabel: "Julia",
                dir: "bidir" as const,
                desc: "ICPM ↔ JLIA · Nat/Float ↔ Int64 serialization · FLOR on both sides",
                protocol: "Motoko ↔ Julia math bridge",
                active: true,
              },
              {
                id: "MRDM",
                leftSubstrate: "ICPM",
                leftLabel: "Motoko",
                rightSubstrate: "EMRT",
                rightLabel: "Memory",
                dir: "bidir" as const,
                desc: "ICPM ↔ EMRT · State ↔ Memory ops · Append-only on EMRT",
                protocol: "State ↔ Memory bridge",
                active: true,
              },
              {
                id: "AXON",
                leftSubstrate: "EART",
                leftLabel: "Autonomous",
                rightSubstrate: "ICPM",
                rightLabel: "Core",
                dir: "unidir" as const,
                desc: "EART → ICPM · Autonomous outputs inject into core pipeline. EART never receives direct calls.",
                protocol: "Autonomous output injector",
                active: true,
              },
              {
                id: "CRUX",
                leftSubstrate: "JLIA",
                leftLabel: "Julia",
                rightSubstrate: "EMRT",
                rightLabel: "Memory",
                dir: "unidir" as const,
                desc: "JLIA → EMRT · FLOR-computed values written directly to memory zones. Bypasses Motoko latency.",
                protocol: "Julia floor → Memory direct",
                active: true,
              },
              {
                id: "NXUS",
                leftSubstrate: "ALL",
                leftLabel: "All Substrates",
                rightSubstrate: "RGST",
                rightLabel: "Registry",
                dir: "unidir" as const,
                desc: "All → RGST · Stats write-only broadcast. Registry never writes back.",
                protocol: "Registry write bus",
                active: true,
              },
            ].map((bridge, idx) => (
              <motion.div
                key={bridge.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                data-ocid={`entanglements.bridge.${idx + 1}`}
                className="glass-portal-it rounded-2xl p-5"
                style={{
                  border: "1px solid rgba(0,220,130,0.18)",
                  boxShadow: bridge.active
                    ? "0 0 16px rgba(0,220,130,0.08)"
                    : "none",
                }}
              >
                {/* Bridge header row */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="font-mono text-xl font-black tracking-widest"
                    style={{ color: "oklch(0.72 0.17 155)" }}
                  >
                    {bridge.id}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {bridge.protocol}
                  </span>
                  <span
                    className={cn(
                      "text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase",
                      bridge.active
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
                        : "bg-amber-500/15 text-amber-400 border border-amber-500/25",
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block w-1.5 h-1.5 rounded-full mr-1 align-middle",
                        bridge.active
                          ? "bg-emerald-400 animate-pulse"
                          : "bg-amber-400",
                      )}
                    />
                    {bridge.active ? "ACTIVE" : "IDLE"}
                  </span>
                </div>

                {/* Animated visual: left node → pulsing line → right node */}
                <div className="flex items-center gap-3 mb-3">
                  {/* Left substrate node */}
                  <div
                    className="glass-sm rounded-xl px-3 py-2 text-center shrink-0"
                    style={{
                      border: "1px solid oklch(0.72 0.17 155 / 0.30)",
                      minWidth: 72,
                    }}
                  >
                    <p
                      className="font-mono text-[11px] font-bold"
                      style={{ color: "oklch(0.72 0.17 155)" }}
                    >
                      {bridge.leftSubstrate}
                    </p>
                    <p className="text-[9px] text-muted-foreground">
                      {bridge.leftLabel}
                    </p>
                  </div>

                  {/* Animated pulsing bridge line */}
                  <div className="flex-1 relative flex items-center justify-center h-8">
                    <div
                      className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, oklch(0.72 0.17 155 / 0.15), oklch(0.72 0.17 155 / 0.80), oklch(0.72 0.17 155 / 0.15))",
                        boxShadow: "0 0 8px oklch(0.72 0.17 155 / 0.50)",
                        animation: bridge.active
                          ? "bridge-pulse 1.8s ease-in-out infinite"
                          : "none",
                      }}
                    />
                    {/* Travelling data packet dot */}
                    {bridge.active && (
                      <span
                        className="absolute h-2 w-2 rounded-full"
                        style={{
                          background: "oklch(0.72 0.17 155)",
                          boxShadow: "0 0 6px oklch(0.72 0.17 155)",
                          animation: "bridge-packet 1.8s linear infinite",
                          left: "10%",
                        }}
                      />
                    )}
                    {/* Direction arrows */}
                    <span
                      className="relative z-10 font-mono text-[11px] font-bold px-2"
                      style={{
                        color: "oklch(0.72 0.17 155)",
                        background: "rgba(0,0,0,0.55)",
                        borderRadius: 4,
                      }}
                    >
                      {bridge.dir === "bidir" ? "⇔" : "→"}
                    </span>
                  </div>

                  {/* Right substrate node */}
                  <div
                    className="glass-sm rounded-xl px-3 py-2 text-center shrink-0"
                    style={{
                      border: "1px solid oklch(0.72 0.17 155 / 0.30)",
                      minWidth: 72,
                    }}
                  >
                    <p
                      className="font-mono text-[11px] font-bold"
                      style={{ color: "oklch(0.72 0.17 155)" }}
                    >
                      {bridge.rightSubstrate}
                    </p>
                    <p className="text-[9px] text-muted-foreground">
                      {bridge.rightLabel}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[10px] text-muted-foreground font-mono leading-relaxed">
                  {bridge.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Bridge CSS animations */}
          <style>{`
            @keyframes bridge-pulse {
              0%, 100% { opacity: 0.5; box-shadow: 0 0 4px oklch(0.72 0.17 155 / 0.3); }
              50% { opacity: 1; box-shadow: 0 0 12px oklch(0.72 0.17 155 / 0.7); }
            }
            @keyframes bridge-packet {
              0% { left: 5%; opacity: 0; }
              10% { opacity: 1; }
              90% { opacity: 1; }
              100% { left: 90%; opacity: 0; }
            }
          `}</style>
        </section>

        {/* COHERENCE RING */}
        <div className="glass rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-8">
          <div className="flex-shrink-0 relative">
            <svg width="120" height="120" className="-rotate-90" role="img">
              <title>Network coherence score</title>
              <circle
                cx="60"
                cy="60"
                r="40"
                fill="none"
                stroke="oklch(0.20 0.015 260)"
                strokeWidth="8"
              />
              <circle
                cx="60"
                cy="60"
                r="40"
                fill="none"
                stroke="oklch(0.72 0.20 200)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={String(ringCirc)}
                strokeDashoffset={String(ringOffset)}
                style={{
                  filter: "drop-shadow(0 0 8px oklch(0.72 0.20 200 / 0.6))",
                }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className="text-2xl font-display font-extrabold"
                style={{ color: "oklch(0.72 0.20 200)" }}
              >
                {cohPct.toFixed(0)}%
              </span>
              <span className="text-[9px] font-mono text-muted-foreground uppercase">
                NET COH
              </span>
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <h3 className="font-display font-bold text-foreground">
              Network Coherence
            </h3>
            <p className="text-sm text-muted-foreground">
              Average coherence delta across all 5 intelligence entanglements.
              Fibonacci-floor compounded per session cycle.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {intelligenceNodes.map((id) => {
                const meta = NODE_META[id];
                return (
                  <span
                    key={id}
                    className="glass-sm rounded-lg px-2.5 py-1 font-mono text-xs font-bold"
                    style={{
                      color: meta.color,
                      borderColor: meta.color.replace(")", " / 0.3)"),
                    }}
                  >
                    {id}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* ALL ENTANGLEMENTS — remaining non-intelligence nodes */}
        {entanglements.filter((e) => !intelligenceNodes.includes(e.id)).length >
          0 && (
          <div>
            <h2 className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4">
              Bridge Entanglements
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {entanglements
                .filter((e) => !intelligenceNodes.includes(e.id))
                .map((ent) => {
                  const isActive =
                    "active" in
                    (ent.status as unknown as Record<string, unknown>);
                  const delta = Number(ent.coherenceDelta);
                  return (
                    <div
                      key={ent.id}
                      className="glass rounded-xl p-4"
                      data-ocid="entanglements.item.bridge"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono font-bold text-foreground">
                          {ent.id}
                        </span>
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{
                            background: isActive
                              ? "oklch(0.72 0.18 162)"
                              : "oklch(0.76 0.18 84)",
                          }}
                        />
                      </div>
                      <p className="text-[10px] text-muted-foreground">
                        {Number(ent.transitCount)} transits
                      </p>
                      <p
                        className="text-sm font-bold mt-1"
                        style={{
                          color:
                            delta >= 0
                              ? "oklch(0.72 0.18 162)"
                              : "oklch(0.65 0.22 22)",
                        }}
                      >
                        {delta >= 0 ? `+${delta}` : delta}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
