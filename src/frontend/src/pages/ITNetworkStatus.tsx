import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowLeft,
  ArrowLeftRight,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Lock,
  Network,
  Server,
  Shield,
  Wifi,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

// ── Portal Nodes ────────────────────────────────────────────────────────────
type PortalNode = {
  id: string;
  name: string;
  role: "portal" | "substrate";
  latency: number;
  color: string;
  glow: string;
  border: string;
  icon: typeof Server;
};

const PORTAL_NODES: PortalNode[] = [
  {
    id: "STU",
    name: "Student Portal",
    role: "portal",
    latency: 13,
    color: "oklch(0.78 0.22 200)",
    glow: "rgba(0,210,255,0.2)",
    border: "rgba(0,210,255,0.28)",
    icon: Activity,
  },
  {
    id: "TCH",
    name: "Teacher Portal",
    role: "portal",
    latency: 21,
    color: "oklch(0.68 0.18 280)",
    glow: "rgba(160,100,255,0.2)",
    border: "rgba(160,100,255,0.28)",
    icon: Activity,
  },
  {
    id: "PRI",
    name: "Principal Portal",
    role: "portal",
    latency: 34,
    color: "oklch(0.75 0.16 70)",
    glow: "rgba(255,185,0,0.2)",
    border: "rgba(255,185,0,0.28)",
    icon: Activity,
  },
  {
    id: "IT",
    name: "IT Portal",
    role: "portal",
    latency: 13,
    color: "oklch(0.72 0.17 155)",
    glow: "rgba(0,220,130,0.2)",
    border: "rgba(0,220,130,0.28)",
    icon: Activity,
  },
];

const SUBSTRATE_NODES: PortalNode[] = [
  {
    id: "ICPM",
    name: "ICP / Motoko",
    role: "substrate",
    latency: 8,
    color: "oklch(0.65 0.18 230)",
    glow: "rgba(0,140,255,0.18)",
    border: "rgba(0,140,255,0.25)",
    icon: Cpu,
  },
  {
    id: "JLIA",
    name: "Julia Runtime",
    role: "substrate",
    latency: 21,
    color: "oklch(0.60 0.18 290)",
    glow: "rgba(120,60,255,0.18)",
    border: "rgba(120,60,255,0.25)",
    icon: Cpu,
  },
  {
    id: "EDRT",
    name: "EduAI Deterministic RT",
    role: "substrate",
    latency: 5,
    color: "oklch(0.55 0.05 250)",
    glow: "rgba(100,120,180,0.18)",
    border: "rgba(100,120,180,0.25)",
    icon: Server,
  },
  {
    id: "EMRT",
    name: "EduAI Memory RT",
    role: "substrate",
    latency: 34,
    color: "oklch(0.65 0.16 175)",
    glow: "rgba(0,180,160,0.18)",
    border: "rgba(0,180,160,0.25)",
    icon: Server,
  },
];

// ── Bridge Connections ───────────────────────────────────────────────────────
type BridgeRow = {
  id: string;
  from: string;
  to: string;
  direction: "bidir" | "unidir";
  status: "ACTIVE" | "IDLE";
  lastTransit: string;
  protocol: string;
};

const BRIDGES: BridgeRow[] = [
  {
    id: "PONT",
    from: "ICPM",
    to: "JLIA",
    direction: "bidir",
    status: "ACTIVE",
    lastTransit: "2026-05-17 12:34:21",
    protocol: "Nat / Int64",
  },
  {
    id: "MRDM",
    from: "ICPM",
    to: "EMRT",
    direction: "bidir",
    status: "ACTIVE",
    lastTransit: "2026-05-17 12:34:34",
    protocol: "State / Seeds",
  },
  {
    id: "AXON",
    from: "EART",
    to: "ICPM",
    direction: "unidir",
    status: "ACTIVE",
    lastTransit: "2026-05-17 12:33:55",
    protocol: "Heartbeat Inject",
  },
  {
    id: "CRUX",
    from: "JLIA",
    to: "EMRT",
    direction: "unidir",
    status: "IDLE",
    lastTransit: "2026-05-17 12:21:08",
    protocol: "FLOR Computed",
  },
  {
    id: "NXUS",
    from: "ALL",
    to: "RGST",
    direction: "unidir",
    status: "ACTIVE",
    lastTransit: "2026-05-17 12:34:55",
    protocol: "Registry Write",
  },
];

// ── Network Stats Bar ────────────────────────────────────────────────────────
const NET_STATS = [
  { label: "E2E Encrypted", icon: Lock },
  { label: "Sovereign Native", icon: Shield },
  { label: "ICP Chain", icon: Network },
  { label: "PHI-Timed", icon: Activity },
];

function NodeCard({ node, index }: { node: PortalNode; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.06,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
      data-ocid={`it-network.item.${index + 1}`}
      className="glass rounded-2xl p-[var(--phi-21)] space-y-[var(--phi-8)] hover:scale-[1.01] transition-smooth"
      style={{
        borderColor: node.border,
        boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 24px ${node.glow}`,
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-[var(--phi-8)]">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: node.color.replace(")", " / 0.12)"),
              border: `1px solid ${node.border}`,
            }}
          >
            <node.icon className="w-4 h-4" style={{ color: node.color }} />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{node.name}</p>
            <p className="text-xs font-mono" style={{ color: node.color }}>
              {node.id}
            </p>
          </div>
        </div>
        <span className="flex items-center gap-1">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{
              background: "oklch(0.72 0.18 162)",
              boxShadow: "0 0 6px oklch(0.72 0.18 162 / 0.6)",
            }}
          />
          <span
            className="text-[10px] font-mono"
            style={{ color: "oklch(0.72 0.18 162)" }}
          >
            ONLINE
          </span>
        </span>
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-[var(--phi-5)]">
          <Wifi className="w-3 h-3" />
          <span>{node.latency}ms</span>
        </div>
        <div className="flex items-center gap-[var(--phi-5)]">
          <Shield
            className="w-3 h-3"
            style={{ color: "oklch(0.72 0.17 155)" }}
          />
          <span className="font-mono">TLS 1.3</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ITNetworkStatus() {
  const [selectedBridge, setSelectedBridge] = useState<string | null>(null);

  return (
    <div
      className="portal-enter min-h-screen p-[var(--phi-21)]"
      data-ocid="it-network.page"
    >
      <div className="max-w-6xl mx-auto space-y-[var(--phi-34)]">
        {/* ── OS Header ── */}
        <div
          className="glass-lg rounded-2xl px-[var(--phi-21)] py-[var(--phi-13)] flex items-center gap-[var(--phi-13)]"
          style={{ borderColor: "rgba(0,220,130,0.18)" }}
        >
          <Link to="/it-security" data-ocid="it-network.back_link">
            <button
              type="button"
              className="glass-sm rounded-xl p-[var(--phi-8)] hover:bg-[oklch(0.72_0.17_155/0.1)] transition-smooth"
              aria-label="Back to IT Portal"
            >
              <ArrowLeft
                className="w-5 h-5"
                style={{ color: "oklch(0.72 0.17 155)" }}
              />
            </button>
          </Link>
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: "oklch(0.72 0.17 155 / 0.15)",
              border: "1px solid rgba(0,220,130,0.35)",
            }}
          >
            <Network
              className="w-4 h-4"
              style={{ color: "oklch(0.72 0.17 155)" }}
            />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-display font-bold text-foreground tracking-wide">
              Network Topology
            </h1>
            <p className="text-xs text-muted-foreground font-mono">
              Live substrate graph · encrypted · PHI-timed
            </p>
          </div>
          <Badge
            className="font-mono text-[10px] tracking-widest"
            style={{
              background: "oklch(0.72 0.17 155 / 0.12)",
              color: "oklch(0.72 0.17 155)",
              border: "1px solid rgba(0,220,130,0.3)",
            }}
          >
            IT PORTAL
          </Badge>
        </div>

        {/* ── Network Stats Bar ── */}
        <div
          data-ocid="it-network.stats_bar"
          className="glass rounded-xl px-[var(--phi-21)] py-[var(--phi-13)] flex flex-wrap items-center gap-[var(--phi-13)]"
          style={{ borderColor: "rgba(0,220,130,0.15)" }}
        >
          {NET_STATS.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-[var(--phi-8)] pr-[var(--phi-13)] border-r border-border/40 last:border-0"
            >
              <div
                className="w-6 h-6 rounded-lg flex items-center justify-center"
                style={{ background: "oklch(0.72 0.17 155 / 0.12)" }}
              >
                <Icon
                  className="w-3 h-3"
                  style={{ color: "oklch(0.72 0.17 155)" }}
                />
              </div>
              <span className="text-xs font-semibold text-foreground">
                {label}
              </span>
              <CheckCircle2
                className="w-3.5 h-3.5"
                style={{ color: "oklch(0.72 0.18 162)" }}
              />
            </div>
          ))}
        </div>

        {/* ── Portal Nodes ── */}
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-[var(--phi-13)]">
            PORTAL NODES
          </p>
          <div
            data-ocid="it-network.portals.list"
            className="grid grid-cols-2 lg:grid-cols-4 gap-[var(--phi-13)]"
          >
            {PORTAL_NODES.map((node, idx) => (
              <NodeCard key={node.id} node={node} index={idx} />
            ))}
          </div>
        </div>

        {/* ── Substrate Nodes ── */}
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-[var(--phi-13)]">
            SUBSTRATE NODES
          </p>
          <div
            data-ocid="it-network.substrates.list"
            className="grid grid-cols-2 lg:grid-cols-4 gap-[var(--phi-13)]"
          >
            {SUBSTRATE_NODES.map((node, idx) => (
              <NodeCard
                key={node.id}
                node={node}
                index={PORTAL_NODES.length + idx}
              />
            ))}
          </div>
        </div>

        {/* ── Bridge Status Table ── */}
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-[var(--phi-13)]">
            LANGUAGE BRIDGES
          </p>
          <div
            data-ocid="it-network.bridges.list"
            className="glass rounded-2xl overflow-hidden"
            style={{ borderColor: "rgba(0,220,130,0.15)" }}
          >
            {/* Sticky table header */}
            <div className="grid grid-cols-5 px-[var(--phi-21)] py-[var(--phi-8)] border-b border-border/30 sticky top-0 glass-sm">
              {["Bridge", "From", "To", "Protocol", "Status"].map((h) => (
                <span
                  key={h}
                  className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground"
                >
                  {h}
                </span>
              ))}
            </div>
            {BRIDGES.map((bridge, idx) => (
              <motion.button
                key={bridge.id}
                type="button"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.07 }}
                data-ocid={`it-network.bridge.${idx + 1}`}
                className="w-full grid grid-cols-5 px-[var(--phi-21)] py-[var(--phi-13)] border-b border-border/20 last:border-0 text-left hover:bg-[oklch(0.72_0.17_155/0.04)] transition-smooth cursor-pointer"
                onClick={() =>
                  setSelectedBridge(
                    selectedBridge === bridge.id ? null : bridge.id,
                  )
                }
              >
                <span
                  className="font-mono font-bold text-sm"
                  style={{ color: "oklch(0.72 0.17 155)" }}
                >
                  {bridge.id}
                </span>
                <span className="text-xs font-mono text-foreground">
                  {bridge.from}
                </span>
                <span className="flex items-center gap-1 text-xs font-mono text-foreground">
                  {bridge.direction === "bidir" ? (
                    <ArrowLeftRight className="w-3 h-3 text-muted-foreground" />
                  ) : (
                    <ArrowRight className="w-3 h-3 text-muted-foreground" />
                  )}
                  {bridge.to}
                </span>
                <span className="text-[11px] font-mono text-muted-foreground">
                  {bridge.protocol}
                </span>
                <span className="flex items-center gap-1.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background:
                        bridge.status === "ACTIVE"
                          ? "oklch(0.72 0.18 162)"
                          : "oklch(0.76 0.16 70)",
                      boxShadow:
                        bridge.status === "ACTIVE"
                          ? "0 0 4px oklch(0.72 0.18 162 / 0.7)"
                          : "none",
                    }}
                  />
                  <span
                    className="text-[10px] font-mono font-bold"
                    style={{
                      color:
                        bridge.status === "ACTIVE"
                          ? "oklch(0.72 0.18 162)"
                          : "oklch(0.76 0.16 70)",
                    }}
                  >
                    {bridge.status}
                  </span>
                </span>
              </motion.button>
            ))}
            {/* Expanded detail row rendered separately below the table */}
            {selectedBridge &&
              (() => {
                const bridge = BRIDGES.find((b) => b.id === selectedBridge);
                if (!bridge) return null;
                return (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-[var(--phi-21)] py-[var(--phi-13)] border-t border-border/20 flex items-center gap-[var(--phi-21)] glass-sm"
                    style={{ borderColor: "rgba(0,220,130,0.2)" }}
                  >
                    <span className="text-[11px] text-muted-foreground font-mono">
                      Last transit:
                    </span>
                    <span className="text-[11px] text-foreground font-mono">
                      {bridge.lastTransit}
                    </span>
                    <span className="text-[11px] text-muted-foreground font-mono">
                      Direction:
                    </span>
                    <span
                      className="text-[11px] font-mono"
                      style={{ color: "oklch(0.72 0.17 155)" }}
                    >
                      {bridge.direction === "bidir"
                        ? "Bidirectional"
                        : "Unidirectional"}
                    </span>
                  </motion.div>
                );
              })()}
          </div>
        </div>
      </div>
    </div>
  );
}
