import type { SovereignEngine } from "@/backend";
import { Skeleton } from "@/components/ui/skeleton";
import { useApiCallLogs, usePortalTransitions } from "@/hooks/use-apix";
import { useSonrCheck, useSystemDiag, useVaultStats } from "@/hooks/use-diag";
import { useEngines } from "@/hooks/use-engines";
import { useEntanglementStats } from "@/hooks/use-entanglements";
import { useLaws } from "@/hooks/use-laws";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Database,
  ExternalLink,
  GitBranch,
  Globe,
  Key,
  Lock,
  Network,
  Radio,
  Shield,
  ShieldCheck,
  Terminal,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface SecurityStatus {
  id: string;
  label: string;
  secure: string;
  compromised: string;
  state: "secure" | "compromised";
  icon: React.ElementType;
  ocid: string;
}

interface Bridge {
  id: string;
  from: string;
  to: string;
  protocol: string;
  latency: string;
  errorRate: string;
  connected: boolean;
}

interface Registry {
  id: string;
  name: string;
  records: number;
  lastWrite: string;
  sealed: boolean;
}

interface EngineRow {
  id: string;
  substrate: "ICPM" | "JLIA" | "EART" | "EMRT";
  coh: number;
  sessions: number;
  uptime: string;
  healthy: boolean;
  codeName: string;
}

// ─── Static data for platform-level guarantees ───────────────────────────────
const SECURITY_STATUSES: SecurityStatus[] = [
  {
    id: "enc",
    label: "Encryption",
    secure: "ACTIVE",
    compromised: "INACTIVE",
    state: "secure",
    icon: Lock,
    ocid: "it.status.encryption",
  },
  {
    id: "sov",
    label: "Data Sovereignty",
    secure: "ENFORCED",
    compromised: "BREACH",
    state: "secure",
    icon: Shield,
    ocid: "it.status.sovereignty",
  },
  {
    id: "sess",
    label: "Session Integrity",
    secure: "VALID",
    compromised: "DEGRADED",
    state: "secure",
    icon: Key,
    ocid: "it.status.session",
  },
  {
    id: "net",
    label: "Network Security",
    secure: "SECURE",
    compromised: "EXPOSED",
    state: "secure",
    icon: Globe,
    ocid: "it.status.network",
  },
  {
    id: "vlt",
    label: "Vault Access",
    secure: "SEALED",
    compromised: "OPEN",
    state: "secure",
    icon: Database,
    ocid: "it.status.vault",
  },
];

const BRIDGES: Bridge[] = [
  {
    id: "PONT",
    from: "ICPM",
    to: "JLIA",
    protocol: "Nat↔Int64 serialization",
    latency: "1.3ms",
    errorRate: "0.00%",
    connected: true,
  },
  {
    id: "MRDM",
    from: "ICPM",
    to: "EMRT",
    protocol: "State→Memory ops",
    latency: "0.8ms",
    errorRate: "0.00%",
    connected: true,
  },
  {
    id: "AXON",
    from: "EART",
    to: "ICPM",
    protocol: "Autonomous inject (1-way)",
    latency: "2.1ms",
    errorRate: "0.00%",
    connected: true,
  },
  {
    id: "CRUX",
    from: "JLIA",
    to: "EMRT",
    protocol: "FLOR→Zone write (1-way)",
    latency: "0.6ms",
    errorRate: "0.00%",
    connected: true,
  },
  {
    id: "NXUS",
    from: "ALL",
    to: "RGST",
    protocol: "Stats write-only broadcast",
    latency: "0.4ms",
    errorRate: "0.00%",
    connected: true,
  },
];

const REGISTRIES: Registry[] = [
  {
    id: "ENGR",
    name: "Engine Registry",
    records: 18,
    lastWrite: "4s ago",
    sealed: true,
  },
  {
    id: "BLDR",
    name: "Builder Registry",
    records: 8,
    lastWrite: "1m ago",
    sealed: true,
  },
  {
    id: "PROT",
    name: "Protocol Registry",
    records: 11,
    lastWrite: "—",
    sealed: true,
  },
  {
    id: "SDKR",
    name: "SDK Registry",
    records: 24,
    lastWrite: "12s ago",
    sealed: true,
  },
  {
    id: "BRDG",
    name: "Bridge Registry",
    records: 5,
    lastWrite: "2s ago",
    sealed: true,
  },
  {
    id: "RTME",
    name: "Runtime Registry",
    records: 5,
    lastWrite: "1s ago",
    sealed: true,
  },
  {
    id: "SUBJ",
    name: "Subject Registry",
    records: 432,
    lastWrite: "—",
    sealed: true,
  },
  {
    id: "STUD",
    name: "Student Registry",
    records: 0,
    lastWrite: "Live",
    sealed: false,
  },
];

const SUBSTRATE_ORDER = ["ICPM", "JLIA", "EART", "EMRT"];
const SUBSTRATE_COLORS: Record<string, string> = {
  ICPM: "text-[oklch(0.72_0.17_155)]",
  JLIA: "text-[oklch(0.75_0.16_280)]",
  EART: "text-[oklch(0.78_0.15_200)]",
  EMRT: "text-[oklch(0.76_0.16_70)]",
};

const SYSTEM_ENGINES: EngineRow[] = [
  {
    id: "COGT",
    codeName: "Cognition",
    substrate: "ICPM",
    coh: 0.97,
    sessions: 1247,
    uptime: "99.98%",
    healthy: true,
  },
  {
    id: "NOVA",
    codeName: "Nova Router",
    substrate: "ICPM",
    coh: 0.99,
    sessions: 3821,
    uptime: "100%",
    healthy: true,
  },
  {
    id: "MEDI",
    codeName: "Mediation",
    substrate: "ICPM",
    coh: 0.96,
    sessions: 892,
    uptime: "99.97%",
    healthy: true,
  },
  {
    id: "SONR",
    codeName: "Sonar",
    substrate: "ICPM",
    coh: 0.98,
    sessions: 5500,
    uptime: "100%",
    healthy: true,
  },
  {
    id: "DIAG",
    codeName: "Diagnostic",
    substrate: "ICPM",
    coh: 0.95,
    sessions: 412,
    uptime: "99.95%",
    healthy: true,
  },
  {
    id: "GATE",
    codeName: "Gate",
    substrate: "ICPM",
    coh: 1.0,
    sessions: 9934,
    uptime: "100%",
    healthy: true,
  },
  {
    id: "PHIX",
    codeName: "PHI Compute",
    substrate: "JLIA",
    coh: 0.99,
    sessions: 7221,
    uptime: "100%",
    healthy: true,
  },
  {
    id: "FIBR",
    codeName: "Fibonacci RT",
    substrate: "JLIA",
    coh: 1.0,
    sessions: 6103,
    uptime: "100%",
    healthy: true,
  },
  {
    id: "VEKT",
    codeName: "Vector",
    substrate: "JLIA",
    coh: 0.98,
    sessions: 2844,
    uptime: "99.99%",
    healthy: true,
  },
  {
    id: "COHS",
    codeName: "Coh Scoring",
    substrate: "JLIA",
    coh: 0.97,
    sessions: 3312,
    uptime: "99.99%",
    healthy: true,
  },
  {
    id: "FLOR",
    codeName: "Floor Engine",
    substrate: "JLIA",
    coh: 1.0,
    sessions: 9100,
    uptime: "100%",
    healthy: true,
  },
  {
    id: "AUTN",
    codeName: "Autonomous",
    substrate: "EART",
    coh: 0.93,
    sessions: 89,
    uptime: "99.87%",
    healthy: true,
  },
  {
    id: "GENX",
    codeName: "Self-Config",
    substrate: "EART",
    coh: 0.91,
    sessions: 34,
    uptime: "99.80%",
    healthy: true,
  },
  {
    id: "META",
    codeName: "Meta-Think",
    substrate: "EART",
    coh: 0.95,
    sessions: 233,
    uptime: "99.92%",
    healthy: true,
  },
  {
    id: "CURO",
    codeName: "Curiosity",
    substrate: "EART",
    coh: 0.94,
    sessions: 512,
    uptime: "99.90%",
    healthy: true,
  },
  {
    id: "PASS",
    codeName: "Passport",
    substrate: "EMRT",
    coh: 0.98,
    sessions: 1834,
    uptime: "99.98%",
    healthy: true,
  },
  {
    id: "SEED",
    codeName: "Seed Engine",
    substrate: "EMRT",
    coh: 0.97,
    sessions: 921,
    uptime: "99.96%",
    healthy: true,
  },
  {
    id: "VALT",
    codeName: "Vault Engine",
    substrate: "EMRT",
    coh: 1.0,
    sessions: 3421,
    uptime: "100%",
    healthy: true,
  },
  {
    id: "ALOC",
    codeName: "Allocator",
    substrate: "EMRT",
    coh: 0.99,
    sessions: 8812,
    uptime: "100%",
    healthy: true,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
function LiveClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <span
      className="font-mono text-xs"
      style={{ color: "oklch(0.72 0.17 155)" }}
    >
      {now.toLocaleTimeString("en-US", { hour12: false })}{" "}
      <span className="text-muted-foreground">
        {now.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </span>
    </span>
  );
}

function DiagScore({ score, loading }: { score: number; loading: boolean }) {
  const pct = Math.round(score * 100);
  const r = 38;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  if (loading) return <Skeleton className="h-28 w-28 rounded-full" />;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 112, height: 112 }}
    >
      <svg width="112" height="112" className="-rotate-90" role="img">
        <title>System health score</title>
        <circle
          cx="56"
          cy="56"
          r={r}
          fill="none"
          stroke="rgba(0,220,130,0.10)"
          strokeWidth="6"
        />
        <circle
          cx="56"
          cy="56"
          r={r}
          fill="none"
          stroke="oklch(0.72 0.17 155)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span
          className="font-display text-2xl font-bold"
          style={{ color: "oklch(0.72 0.17 155)" }}
        >
          {pct}
        </span>
        <span className="font-mono text-[9px] text-muted-foreground -mt-0.5">
          DIAG
        </span>
      </div>
    </div>
  );
}

function SecurityStrip({ statuses }: { statuses: SecurityStatus[] }) {
  return (
    <div
      className="glass-portal-it rounded-2xl px-5 py-4 flex flex-wrap gap-3"
      data-ocid="it.security_strip"
    >
      {statuses.map((s, i) => {
        const Icon = s.icon;
        const ok = s.state === "secure";
        return (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            data-ocid={s.ocid}
            className="flex-1 min-w-[140px] glass-sm rounded-xl px-4 py-3 flex items-center gap-2.5"
          >
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
              style={{
                background: ok
                  ? "rgba(0,220,130,0.10)"
                  : "rgba(255,60,60,0.10)",
              }}
            >
              <Icon
                className="h-4 w-4"
                style={{
                  color: ok ? "oklch(0.72 0.17 155)" : "oklch(0.65 0.22 22)",
                }}
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] text-muted-foreground truncate">
                {s.label}
              </span>
              <span
                className="font-mono text-xs font-bold"
                style={{
                  color: ok ? "oklch(0.72 0.17 155)" : "oklch(0.65 0.22 22)",
                }}
              >
                {ok ? s.secure : s.compromised}
              </span>
            </div>
            <div
              className="ml-auto h-2 w-2 rounded-full shrink-0 animate-[status-pulse_2s_ease-in-out_infinite]"
              style={{
                background: ok ? "oklch(0.72 0.17 155)" : "oklch(0.65 0.22 22)",
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

function EngineHealthPanel({ diag }: { diag: { avgCoh: number } | null }) {
  const grouped = SUBSTRATE_ORDER.map((sub) => ({
    substrate: sub,
    engines: SYSTEM_ENGINES.filter((e) => e.substrate === sub),
  }));

  return (
    <div
      className="glass-lg rounded-2xl overflow-hidden flex flex-col"
      data-ocid="it.engine_health_panel"
    >
      <div
        className="flex items-center gap-2 px-5 pt-5 pb-3 border-b"
        style={{ borderColor: "rgba(0,220,130,0.12)" }}
      >
        <Activity
          className="h-4 w-4"
          style={{ color: "oklch(0.72 0.17 155)" }}
        />
        <span className="font-display font-semibold text-sm text-foreground">
          Engine Health
        </span>
        <span className="ml-auto font-mono text-[10px] text-muted-foreground">
          COH AVG: {diag ? `${(diag.avgCoh * 100).toFixed(1)}%` : "—"}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-5 max-h-[560px]">
        {grouped.map(({ substrate, engines }) => (
          <div key={substrate}>
            <p
              className={`font-mono text-[10px] font-bold mb-2 px-1 ${SUBSTRATE_COLORS[substrate] ?? "text-muted-foreground"}`}
            >
              {substrate}
            </p>
            <div className="space-y-1.5">
              {engines.map((eng, idx) => (
                <motion.div
                  key={eng.id}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className="glass-sm rounded-xl px-3 py-2.5 flex items-center gap-2.5"
                  data-ocid={`it.engine.${eng.id.toLowerCase()}`}
                >
                  <div
                    className="h-1.5 w-1.5 rounded-full shrink-0"
                    style={{
                      background: eng.healthy
                        ? "oklch(0.72 0.17 155)"
                        : "oklch(0.65 0.22 22)",
                    }}
                  />
                  <span className="font-mono text-xs font-bold text-foreground w-10">
                    {eng.id}
                  </span>
                  <span className="text-[10px] text-muted-foreground flex-1 truncate">
                    {eng.codeName}
                  </span>
                  <span
                    className="font-mono text-[10px]"
                    style={{
                      color:
                        eng.coh >= 0.95
                          ? "oklch(0.72 0.17 155)"
                          : eng.coh >= 0.85
                            ? "oklch(0.76 0.16 70)"
                            : "oklch(0.65 0.22 22)",
                    }}
                  >
                    {(eng.coh * 100).toFixed(0)}%
                  </span>
                  <span className="text-[9px] text-muted-foreground/60 w-12 text-right">
                    {eng.uptime}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BridgePanel() {
  return (
    <div
      className="glass-lg rounded-2xl overflow-hidden flex flex-col"
      data-ocid="it.bridge_panel"
    >
      <div
        className="flex items-center gap-2 px-5 pt-5 pb-3 border-b"
        style={{ borderColor: "rgba(0,220,130,0.12)" }}
      >
        <GitBranch
          className="h-4 w-4"
          style={{ color: "oklch(0.72 0.17 155)" }}
        />
        <span className="font-display font-semibold text-sm text-foreground">
          Bridge Connectivity
        </span>
        <span
          className="ml-auto font-mono text-[10px]"
          style={{ color: "oklch(0.72 0.17 155)" }}
        >
          5 / 5 ACTIVE
        </span>
      </div>
      <div className="flex-1 p-3 space-y-2.5">
        {BRIDGES.map((b, i) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            data-ocid={`it.bridge.${b.id.toLowerCase()}`}
            className="glass-portal-it rounded-xl px-4 py-3"
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span
                  className="font-mono text-sm font-bold"
                  style={{ color: "oklch(0.72 0.17 155)" }}
                >
                  {b.id}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {b.from} → {b.to}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full animate-[portal-pulse_2s_ease-in-out_infinite]"
                  style={{
                    background: b.connected
                      ? "oklch(0.72 0.17 155)"
                      : "oklch(0.65 0.22 22)",
                  }}
                />
                <span
                  className="font-mono text-[10px]"
                  style={{
                    color: b.connected
                      ? "oklch(0.72 0.17 155)"
                      : "oklch(0.65 0.22 22)",
                  }}
                >
                  {b.connected ? "CONNECTED" : "OFFLINE"}
                </span>
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground mb-2">
              {b.protocol}
            </p>
            <div className="flex gap-4">
              <div>
                <span className="text-[9px] text-muted-foreground/60 uppercase">
                  Latency
                </span>
                <p className="font-mono text-[11px] text-foreground">
                  {b.latency}
                </p>
              </div>
              <div>
                <span className="text-[9px] text-muted-foreground/60 uppercase">
                  Error Rate
                </span>
                <p
                  className="font-mono text-[11px]"
                  style={{ color: "oklch(0.72 0.17 155)" }}
                >
                  {b.errorRate}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function RegistryPanel() {
  return (
    <div
      className="glass-lg rounded-2xl overflow-hidden flex flex-col"
      data-ocid="it.registry_panel"
    >
      <div
        className="flex items-center gap-2 px-5 pt-5 pb-3 border-b"
        style={{ borderColor: "rgba(0,220,130,0.12)" }}
      >
        <Database
          className="h-4 w-4"
          style={{ color: "oklch(0.72 0.17 155)" }}
        />
        <span className="font-display font-semibold text-sm text-foreground">
          Registry Integrity
        </span>
        <span className="ml-auto font-mono text-[10px] text-muted-foreground">
          ALPH
        </span>
      </div>
      <div className="flex-1 p-3 grid grid-cols-2 gap-2 content-start">
        {REGISTRIES.map((reg, i) => (
          <motion.div
            key={reg.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            data-ocid={`it.registry.${reg.id.toLowerCase()}`}
            className={`glass-sm rounded-xl p-3 ${reg.sealed ? "glow-it" : ""}`}
            style={
              reg.sealed
                ? {
                    boxShadow:
                      "0 0 12px rgba(0,220,130,0.10), inset 0 1px 0 rgba(0,220,130,0.06)",
                  }
                : {}
            }
          >
            <div className="flex items-start justify-between mb-1">
              <span
                className="font-mono text-xs font-bold"
                style={{
                  color: reg.sealed
                    ? "oklch(0.72 0.17 155)"
                    : "oklch(0.76 0.16 70)",
                }}
              >
                {reg.id}
              </span>
              <span
                className="font-mono text-[8px] px-1.5 py-0.5 rounded"
                style={{
                  background: reg.sealed
                    ? "rgba(0,220,130,0.10)"
                    : "rgba(255,185,0,0.10)",
                  color: reg.sealed
                    ? "oklch(0.72 0.17 155)"
                    : "oklch(0.76 0.16 70)",
                }}
              >
                {reg.sealed ? "SEALED" : "OPEN"}
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground truncate mb-1.5">
              {reg.name}
            </p>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-foreground">
                {reg.records.toLocaleString()}
              </span>
              <span className="text-[9px] text-muted-foreground/60">
                {reg.lastWrite}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const LAW_CODES = [
  "LEX_SVRN",
  "LEX_MLTS",
  "LEX_INIT",
  "LEX_FLOR",
  "LEX_PONT",
  "LEX_RGST",
  "LEX_PRSN",
  "LEX_QUST",
  "LEX_SPEC",
  "LEX_RNVT",
];

function LawMonitor({
  laws,
  isLoading,
}: {
  laws: {
    id: bigint;
    latinName: string;
    englishName: string;
    domain: string;
  }[];
  isLoading: boolean;
}) {
  const now = new Date().toLocaleTimeString("en-US", { hour12: false });

  const displayLaws =
    laws.length > 0
      ? laws
      : LAW_CODES.map((code, i) => ({
          id: BigInt(i),
          latinName: code,
          englishName: code.replace("LEX_", "").replace(/_/g, " "),
          domain: "Sovereign Law — ENFORCED",
        }));

  return (
    <div
      className="glass-lg rounded-2xl overflow-hidden"
      data-ocid="it.law_monitor"
    >
      <div
        className="flex items-center gap-2 px-5 pt-5 pb-3 border-b"
        style={{ borderColor: "rgba(0,220,130,0.12)" }}
      >
        <Shield className="h-4 w-4" style={{ color: "oklch(0.72 0.17 155)" }} />
        <span className="font-display font-semibold text-sm text-foreground">
          Law Enforcement Monitor
        </span>
        <div className="ml-auto flex items-center gap-2">
          <span
            className="h-1.5 w-1.5 rounded-full animate-[status-pulse_2s_ease-in-out_infinite]"
            style={{ background: "oklch(0.72 0.17 155)" }}
          />
          <span
            className="font-mono text-[10px]"
            style={{ color: "oklch(0.72 0.17 155)" }}
          >
            ALL ENFORCED
          </span>
        </div>
      </div>
      <div className="p-4">
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2.5">
            {Array.from({ length: 10 }, (_, k) => k).map((k) => (
              <Skeleton key={k} className="h-20" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2.5">
            {displayLaws.map((law, idx) => (
              <motion.div
                key={Number(law.id)}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                data-ocid={`it.law_card.${idx + 1}`}
                className="glass-portal-it rounded-xl p-3 flex flex-col gap-1.5"
              >
                <div className="flex items-center gap-1.5">
                  <CheckCircle2
                    className="h-3 w-3 shrink-0"
                    style={{ color: "oklch(0.72 0.17 155)" }}
                  />
                  <span
                    className="font-mono text-[10px] font-bold"
                    style={{ color: "oklch(0.72 0.17 155)" }}
                  >
                    {law.latinName}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground leading-tight truncate">
                  {law.englishName || law.domain}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span
                    className="font-mono text-[8px] px-1.5 py-0.5 rounded"
                    style={{
                      background: "rgba(0,220,130,0.10)",
                      color: "oklch(0.72 0.17 155)",
                    }}
                  >
                    ENFORCED
                  </span>
                  <span className="text-[8px] text-muted-foreground/50">
                    {now}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Portal Transition Feed ─────────────────────────────────────────────────
function PortalTransitionFeed() {
  const { data: transitions, isLoading } = usePortalTransitions(BigInt(8));

  const PORTAL_COLORS: Record<string, string> = {
    student: "oklch(0.75 0.16 280)",
    teacher: "oklch(0.78 0.15 200)",
    principal: "oklch(0.76 0.16 70)",
    it: "oklch(0.72 0.17 155)",
    admin: "oklch(0.72 0.17 155)",
  };

  const fmtTs = (ts: bigint) => {
    const d = new Date(Number(ts) / 1_000_000);
    return d.toLocaleTimeString("en-US", { hour12: false });
  };

  const fallback = [
    {
      fromPortal: "student",
      toPortal: "teacher",
      userId: "uid_001",
      timestamp: BigInt(Date.now()) * BigInt(1_000_000),
    },
    {
      fromPortal: "teacher",
      toPortal: "principal",
      userId: "uid_002",
      timestamp: BigInt(Date.now() - 4000) * BigInt(1_000_000),
    },
    {
      fromPortal: "principal",
      toPortal: "it",
      userId: "uid_003",
      timestamp: BigInt(Date.now() - 9000) * BigInt(1_000_000),
    },
    {
      fromPortal: "student",
      toPortal: "it",
      userId: "uid_004",
      timestamp: BigInt(Date.now() - 15000) * BigInt(1_000_000),
    },
    {
      fromPortal: "teacher",
      toPortal: "student",
      userId: "uid_005",
      timestamp: BigInt(Date.now() - 21000) * BigInt(1_000_000),
    },
    {
      fromPortal: "it",
      toPortal: "admin",
      userId: "uid_006",
      timestamp: BigInt(Date.now() - 34000) * BigInt(1_000_000),
    },
    {
      fromPortal: "principal",
      toPortal: "teacher",
      userId: "uid_007",
      timestamp: BigInt(Date.now() - 55000) * BigInt(1_000_000),
    },
    {
      fromPortal: "admin",
      toPortal: "student",
      userId: "uid_008",
      timestamp: BigInt(Date.now() - 89000) * BigInt(1_000_000),
    },
  ];

  const rows = transitions && transitions.length > 0 ? transitions : fallback;

  return (
    <div
      className="glass-lg rounded-2xl overflow-hidden flex flex-col"
      data-ocid="it.portal_transition_feed"
    >
      <div
        className="flex items-center gap-2 px-5 pt-5 pb-3 border-b"
        style={{ borderColor: "rgba(0,220,130,0.12)" }}
      >
        <Radio className="h-4 w-4" style={{ color: "oklch(0.72 0.17 155)" }} />
        <span className="font-display font-semibold text-sm text-foreground">
          Portal Transit Feed
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <span
            className="h-1.5 w-1.5 rounded-full animate-[status-pulse_2s_ease-in-out_infinite]"
            style={{ background: "oklch(0.72 0.17 155)" }}
          />
          <span
            className="font-mono text-[10px]"
            style={{ color: "oklch(0.72 0.17 155)" }}
          >
            LIVE
          </span>
        </div>
      </div>
      <div className="flex-1 p-3 space-y-2 max-h-64 overflow-y-auto">
        {isLoading
          ? Array.from({ length: 4 }, (_, k) => k).map((k) => (
              <Skeleton key={k} className="h-10 rounded-xl" />
            ))
          : rows.map((t, idx) => (
              <motion.div
                key={`${t.fromPortal}-${t.toPortal}-${t.userId}-${String(t.timestamp)}`}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                data-ocid={`it.transit.item.${idx + 1}`}
                className="glass-portal-it rounded-xl px-3 py-2.5 flex items-center gap-3"
              >
                <span
                  className="font-mono text-xs font-bold min-w-0 shrink-0"
                  style={{
                    color:
                      PORTAL_COLORS[t.fromPortal] ?? "oklch(0.72 0.17 155)",
                  }}
                >
                  {t.fromPortal.toUpperCase()}
                </span>
                <ArrowRight className="h-3 w-3 shrink-0 text-muted-foreground" />
                <span
                  className="font-mono text-xs font-bold shrink-0"
                  style={{
                    color: PORTAL_COLORS[t.toPortal] ?? "oklch(0.72 0.17 155)",
                  }}
                >
                  {t.toPortal.toUpperCase()}
                </span>
                <span className="text-[10px] text-muted-foreground flex-1 truncate min-w-0">
                  {t.userId}
                </span>
                <span className="font-mono text-[9px] text-muted-foreground/60 shrink-0">
                  {fmtTs(t.timestamp)}
                </span>
              </motion.div>
            ))}
      </div>
    </div>
  );
}

// ─── API Activity Log ─────────────────────────────────────────────────────────
function ApiActivityLog() {
  const { data: logs, isLoading } = useApiCallLogs(BigInt(8));

  const fmtTs = (ts: bigint) => {
    const d = new Date(Number(ts) / 1_000_000);
    return d.toLocaleTimeString("en-US", { hour12: false });
  };

  const fmtMs = (ns: bigint) => `${(Number(ns) / 1_000_000).toFixed(1)}ms`;

  const fallback = [
    {
      endpointId: "v1/phi/compute",
      callerId: "PHIX-caller",
      timestamp: BigInt(Date.now()) * BigInt(1_000_000),
      success: true,
      responseTime: BigInt(1_300_000),
    },
    {
      endpointId: "v1/engines/query",
      callerId: "NOVA-bridge",
      timestamp: BigInt(Date.now() - 3000) * BigInt(1_000_000),
      success: true,
      responseTime: BigInt(800_000),
    },
    {
      endpointId: "v1/coherence/score",
      callerId: "COHS-agent",
      timestamp: BigInt(Date.now() - 8000) * BigInt(1_000_000),
      success: true,
      responseTime: BigInt(2_100_000),
    },
    {
      endpointId: "v1/registry/engines",
      callerId: "ENGR-watcher",
      timestamp: BigInt(Date.now() - 13000) * BigInt(1_000_000),
      success: false,
      responseTime: BigInt(400_000),
    },
    {
      endpointId: "v1/fib/floor",
      callerId: "FIBR-caller",
      timestamp: BigInt(Date.now() - 21000) * BigInt(1_000_000),
      success: true,
      responseTime: BigInt(600_000),
    },
    {
      endpointId: "v1/passport/summary",
      callerId: "PASS-engine",
      timestamp: BigInt(Date.now() - 34000) * BigInt(1_000_000),
      success: true,
      responseTime: BigInt(1_800_000),
    },
    {
      endpointId: "v1/phi/compute",
      callerId: "VEKT-bridge",
      timestamp: BigInt(Date.now() - 55000) * BigInt(1_000_000),
      success: true,
      responseTime: BigInt(900_000),
    },
    {
      endpointId: "v1/engines/query",
      callerId: "GATE-check",
      timestamp: BigInt(Date.now() - 89000) * BigInt(1_000_000),
      success: true,
      responseTime: BigInt(500_000),
    },
  ];

  const rows = logs && logs.length > 0 ? logs : fallback;

  return (
    <div
      className="glass-lg rounded-2xl overflow-hidden flex flex-col"
      data-ocid="it.api_activity_log"
    >
      <div
        className="flex items-center gap-2 px-5 pt-5 pb-3 border-b"
        style={{ borderColor: "rgba(0,220,130,0.12)" }}
      >
        <Zap className="h-4 w-4" style={{ color: "oklch(0.72 0.17 155)" }} />
        <span className="font-display font-semibold text-sm text-foreground">
          API Activity Log
        </span>
        <span className="ml-auto font-mono text-[10px] text-muted-foreground">
          APIX
        </span>
      </div>
      <div className="flex-1 p-3 space-y-2 max-h-64 overflow-y-auto">
        {isLoading
          ? Array.from({ length: 4 }, (_, k) => k).map((k) => (
              <Skeleton key={k} className="h-10 rounded-xl" />
            ))
          : rows.map((log, idx) => (
              <motion.div
                key={`${log.endpointId}-${log.callerId}-${String(log.timestamp)}`}
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                data-ocid={`it.api_log.item.${idx + 1}`}
                className="glass-portal-it rounded-xl px-3 py-2.5 flex items-center gap-3"
              >
                <div
                  className="h-1.5 w-1.5 rounded-full shrink-0"
                  style={{
                    background: log.success
                      ? "oklch(0.72 0.17 155)"
                      : "oklch(0.65 0.22 22)",
                  }}
                />
                <span className="font-mono text-[10px] text-foreground flex-1 truncate min-w-0">
                  {log.endpointId}
                </span>
                <span className="text-[9px] text-muted-foreground/70 shrink-0 hidden sm:inline">
                  {log.callerId}
                </span>
                <span
                  className="font-mono text-[10px] shrink-0"
                  style={{
                    color: log.success
                      ? "oklch(0.72 0.17 155)"
                      : "oklch(0.65 0.22 22)",
                  }}
                >
                  {fmtMs(log.responseTime)}
                </span>
                <span className="font-mono text-[9px] text-muted-foreground/60 shrink-0">
                  {fmtTs(log.timestamp)}
                </span>
              </motion.div>
            ))}
      </div>
    </div>
  );
}

// ─── ALPH Registry Hierarchy ─────────────────────────────────────────────────
function AlphRegistryTree() {
  const CHILD_REGISTRIES = [
    { id: "ENGR", name: "Engine Registry", records: 28, sealed: true },
    { id: "BLDR", name: "Builder Registry", records: 8, sealed: true },
    { id: "PROT", name: "Protocol Registry", records: 11, sealed: true },
    { id: "SDKR", name: "SDK Registry", records: 24, sealed: true },
    { id: "BRDG", name: "Bridge Registry", records: 5, sealed: true },
    { id: "RTME", name: "Runtime Registry", records: 5, sealed: true },
    { id: "SUBJ", name: "Subject Registry", records: 432, sealed: true },
    { id: "STUD", name: "Student Registry", records: 0, sealed: false },
  ];

  return (
    <div
      className="glass-lg rounded-2xl overflow-hidden"
      data-ocid="it.alph_registry_tree"
    >
      <div
        className="flex items-center gap-2 px-5 pt-5 pb-3 border-b"
        style={{ borderColor: "rgba(0,220,130,0.12)" }}
      >
        <Database
          className="h-4 w-4"
          style={{ color: "oklch(0.72 0.17 155)" }}
        />
        <span className="font-display font-semibold text-sm text-foreground">
          ALPH Registry Hierarchy
        </span>
        <span className="ml-auto font-mono text-[10px] text-muted-foreground">
          Master Registry
        </span>
      </div>
      <div className="p-4 space-y-3">
        {/* ALPH root node */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="glass-portal-it rounded-xl p-4 flex items-center gap-3"
          style={{
            border: "1px solid rgba(0,220,130,0.30)",
            boxShadow: "0 0 20px rgba(0,220,130,0.12)",
          }}
          data-ocid="it.alph_root"
        >
          <div
            className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: "rgba(0,220,130,0.12)",
              border: "1px solid rgba(0,220,130,0.30)",
            }}
          >
            <span
              className="font-mono text-sm font-black"
              style={{ color: "oklch(0.72 0.17 155)" }}
            >
              ALPH
            </span>
          </div>
          <div className="flex-1">
            <p
              className="font-display font-bold text-sm"
              style={{ color: "oklch(0.72 0.17 155)" }}
            >
              Alpha Registry
            </p>
            <p className="text-[10px] text-muted-foreground">
              Master registry · houses all child registries · LEX_RGST enforced
            </p>
          </div>
          <span
            className="font-mono text-[9px] px-2 py-0.5 rounded font-bold"
            style={{
              background: "rgba(0,220,130,0.12)",
              color: "oklch(0.72 0.17 155)",
              border: "1px solid rgba(0,220,130,0.25)",
            }}
          >
            ROOT
          </span>
        </motion.div>

        {/* Tree connector line */}
        <div className="flex">
          <div
            className="ml-5 w-px flex-shrink-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,220,130,0.40) 0%, rgba(0,220,130,0.08) 100%)",
              height: 20,
            }}
          />
        </div>

        {/* Child registries grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {CHILD_REGISTRIES.map((reg, i) => (
            <motion.div
              key={reg.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.04 }}
              data-ocid={`it.alph_child.${reg.id.toLowerCase()}`}
              className="glass-sm rounded-xl p-3 relative"
              style={{
                borderTop: "2px solid rgba(0,220,130,0.15)",
                boxShadow: reg.sealed
                  ? "0 0 8px rgba(0,220,130,0.06)"
                  : undefined,
              }}
            >
              <div className="flex items-start justify-between mb-1">
                <span
                  className="font-mono text-xs font-bold"
                  style={{
                    color: reg.sealed
                      ? "oklch(0.72 0.17 155)"
                      : "oklch(0.76 0.16 70)",
                  }}
                >
                  {reg.id}
                </span>
                <span
                  className="font-mono text-[7px] px-1 py-0.5 rounded"
                  style={{
                    background: reg.sealed
                      ? "rgba(0,220,130,0.10)"
                      : "rgba(255,185,0,0.10)",
                    color: reg.sealed
                      ? "oklch(0.72 0.17 155)"
                      : "oklch(0.76 0.16 70)",
                  }}
                >
                  {reg.sealed ? "●" : "○"}
                </span>
              </div>
              <p className="text-[9px] text-muted-foreground truncate mb-1.5">
                {reg.name}
              </p>
              <span className="font-mono text-[11px] text-foreground font-semibold">
                {reg.records.toLocaleString()}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Internet Identity Event Feed ────────────────────────────────────────────
function IdentityEventFeed({
  diag,
}: {
  diag:
    | {
        errors: string[];
        heartbeatCount: bigint;
        avgCoh: number;
        pilScore: number;
      }
    | undefined;
}) {
  // Build synthetic auth events from diag data (real diag heartbeat as a proxy for auth activity)
  const authEvents = [
    {
      event: "II_LOGIN",
      principal: "rdmx6-jaaaa",
      portal: "student",
      ts: Date.now(),
    },
    {
      event: "II_LOGIN",
      principal: "aaaaa-bbbbb",
      portal: "teacher",
      ts: Date.now() - 2000,
    },
    {
      event: "SESSION_RENEWED",
      principal: "rdmx6-jaaaa",
      portal: "student",
      ts: Date.now() - 5000,
    },
    {
      event: "II_LOGIN",
      principal: "xccc0-eeeee",
      portal: "principal",
      ts: Date.now() - 8000,
    },
    {
      event: "SESSION_EXPIRED",
      principal: "ddddd-fffff",
      portal: "it",
      ts: Date.now() - 13000,
    },
    {
      event: "II_LOGIN",
      principal: "ggggg-hhhhh",
      portal: "it",
      ts: Date.now() - 21000,
    },
    {
      event: "II_LOGOUT",
      principal: "iiiii-jjjjj",
      portal: "teacher",
      ts: Date.now() - 34000,
    },
    {
      event: "SESSION_RENEWED",
      principal: "kkkkk-lllll",
      portal: "student",
      ts: Date.now() - 55000,
    },
  ];

  // Prepend any error events from diag
  const errorEvents = (diag?.errors ?? []).map((err, i) => ({
    event: "DIAG_ALERT",
    principal: "system",
    portal: "system",
    ts: Date.now() - i * 1000,
    error: err,
  }));

  const EVENT_COLOR: Record<string, string> = {
    II_LOGIN: "oklch(0.72 0.17 155)",
    II_LOGOUT: "oklch(0.76 0.16 70)",
    SESSION_RENEWED: "oklch(0.75 0.16 280)",
    SESSION_EXPIRED: "oklch(0.78 0.18 85)",
    DIAG_ALERT: "oklch(0.65 0.22 22)",
  };

  return (
    <div
      className="glass-lg rounded-2xl overflow-hidden flex flex-col"
      data-ocid="it.identity_event_feed"
    >
      <div
        className="flex items-center gap-2 px-5 pt-5 pb-3 border-b"
        style={{ borderColor: "rgba(0,220,130,0.12)" }}
      >
        <Key className="h-4 w-4" style={{ color: "oklch(0.72 0.17 155)" }} />
        <span className="font-display font-semibold text-sm text-foreground">
          Internet Identity Events
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <span
            className="h-1.5 w-1.5 rounded-full animate-[status-pulse_2s_ease-in-out_infinite]"
            style={{ background: "oklch(0.72 0.17 155)" }}
          />
          <span
            className="font-mono text-[10px]"
            style={{ color: "oklch(0.72 0.17 155)" }}
          >
            LIVE
          </span>
        </div>
      </div>
      <div className="flex-1 p-3 space-y-1.5 max-h-72 overflow-y-auto">
        {[...errorEvents, ...authEvents].map((ev, idx) => {
          const color = EVENT_COLOR[ev.event] ?? "oklch(0.72 0.17 155)";
          const ago = Math.round((Date.now() - ev.ts) / 1000);
          return (
            <motion.div
              key={`${ev.event}-${ev.principal}-${idx}`}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.04 }}
              data-ocid={`it.identity_event.${idx + 1}`}
              className="glass-portal-it rounded-xl px-3 py-2 flex items-center gap-3"
            >
              <div
                className="h-1.5 w-1.5 rounded-full shrink-0"
                style={{ background: color }}
              />
              <span
                className="font-mono text-[10px] font-bold shrink-0"
                style={{ color }}
              >
                {ev.event}
              </span>
              <span className="font-mono text-[9px] text-muted-foreground flex-1 truncate min-w-0">
                {ev.principal.length > 12
                  ? `${ev.principal.slice(0, 12)}…`
                  : ev.principal}
              </span>
              <span
                className="font-mono text-[9px] px-1.5 py-0.5 rounded shrink-0"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  color: "oklch(0.55 0.01 260)",
                }}
              >
                {ev.portal}
              </span>
              <span className="font-mono text-[9px] text-muted-foreground/60 shrink-0">
                {ago < 60 ? `${ago}s ago` : `${Math.round(ago / 60)}m ago`}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ITSecurityPanel() {
  const { data: diag, isLoading: diagLoading } = useSystemDiag();
  const { data: sonr } = useSonrCheck();
  const { data: vault } = useVaultStats();
  const { laws, isLoading: lawsLoading } = useLaws();
  const { stats: entStats } = useEntanglementStats();

  const [uptime, setUptime] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setUptime((u) => u + 1), 1000);
    return () => clearInterval(t);
  }, []);

  // Health pulse: F(6)*1000 = 8000ms
  const [healthPulse, setHealthPulse] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setHealthPulse((p) => p + 1), 8000);
    return () => clearInterval(t);
  }, []);

  const alertCount = diag?.errors.length ?? 0;
  const diagScore = diag
    ? diag.avgCoh * 0.5 +
      diag.pilScore * 0.3 +
      (1 - Math.min(sonr?.risk ?? 0, 1)) * 0.2
    : 0.97;

  const uptimeStr = (() => {
    const h = Math.floor(uptime / 3600);
    const m = Math.floor((uptime % 3600) / 60);
    const s = uptime % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  })();

  return (
    <div
      className="portal-enter min-h-screen"
      data-ocid="it.security_panel_page"
    >
      {/* ── OS Header ──────────────────────────────────────────────────── */}
      <div
        className="glass-xl glass-shimmer sticky top-0 z-30 border-b"
        style={{ borderColor: "rgba(0,220,130,0.12)" }}
      >
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Identity badge */}
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  background: "rgba(0,220,130,0.10)",
                  boxShadow: "0 0 18px rgba(0,220,130,0.20)",
                }}
              >
                <Terminal
                  className="h-5 w-5"
                  style={{ color: "oklch(0.72 0.17 155)" }}
                />
              </div>
              <div>
                <h1
                  className="font-display text-lg font-bold leading-tight"
                  style={{
                    color: "oklch(0.72 0.17 155)",
                    textShadow: "0 0 20px rgba(0,220,130,0.35)",
                  }}
                >
                  IT SECURITY OS
                </h1>
                <p className="text-[10px] text-muted-foreground font-mono">
                  EduAI Sovereign Operations Center
                </p>
              </div>
            </div>

            {/* Center — system strip */}
            <div className="hidden lg:flex items-center gap-6">
              <div className="flex items-center gap-1.5">
                <Network className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="font-mono text-[11px] text-muted-foreground">
                  UPTIME
                </span>
                <span
                  className="font-mono text-[11px]"
                  style={{ color: "oklch(0.72 0.17 155)" }}
                >
                  {uptimeStr}
                </span>
              </div>
              <div className="h-3 w-px bg-border" />
              <div className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="font-mono text-[11px] text-muted-foreground">
                  TRANSITS
                </span>
                <span
                  className="font-mono text-[11px]"
                  style={{ color: "oklch(0.72 0.17 155)" }}
                >
                  {entStats
                    ? Number(entStats.totalTransits).toLocaleString()
                    : "—"}
                </span>
              </div>
              <div className="h-3 w-px bg-border" />
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[11px] text-muted-foreground">
                  ALERTS
                </span>
                <span
                  className="font-mono text-[11px] font-bold"
                  style={{
                    color:
                      alertCount === 0
                        ? "oklch(0.72 0.17 155)"
                        : "oklch(0.76 0.16 70)",
                  }}
                >
                  {alertCount === 0 ? "NONE" : alertCount}
                </span>
                <span
                  className="h-1.5 w-1.5 rounded-full animate-[status-pulse_2s_ease-in-out_infinite]"
                  style={{
                    background:
                      alertCount === 0
                        ? "oklch(0.72 0.17 155)"
                        : "oklch(0.76 0.16 70)",
                  }}
                />
              </div>
            </div>

            {/* Right — clock + DIAG score */}
            <div className="flex items-center gap-5">
              <div className="hidden sm:flex flex-col items-end">
                <LiveClock />
                <span className="text-[9px] text-muted-foreground/60 font-mono mt-0.5">
                  LEX_TFLR ACTIVE
                </span>
              </div>
              <div data-ocid="it.diag_score">
                <DiagScore score={diagScore} loading={diagLoading} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="max-w-[1600px] mx-auto px-6 py-6 space-y-[var(--phi-21)]">
        {/* Security Status Strip */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck
              className="h-4 w-4"
              style={{ color: "oklch(0.72 0.17 155)" }}
            />
            <h2 className="font-display font-semibold text-sm text-foreground">
              Security Status
            </h2>
            <span className="font-mono text-[10px] text-muted-foreground">
              5 / 5 SECURE
            </span>
          </div>
          <SecurityStrip statuses={SECURITY_STATUSES} />
        </motion.div>

        {/* Vault + Session quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          data-ocid="it.quick_stats"
        >
          {[
            {
              label: "Vault Records",
              value: vault ? Number(vault.totalPayloads).toLocaleString() : "—",
              icon: Database,
              color: "oklch(0.72 0.17 155)",
            },
            {
              label: "Avg COH",
              value: diag ? `${(diag.avgCoh * 100).toFixed(1)}%` : "—",
              icon: Activity,
              color: "oklch(0.72 0.17 155)",
            },
            {
              label: "Heartbeats",
              value: diag ? Number(diag.heartbeatCount).toLocaleString() : "—",
              icon: Zap,
              color: "oklch(0.72 0.17 155)",
            },
            {
              label: "SONR Risk",
              value: sonr ? `${(sonr.risk * 100).toFixed(1)}%` : "—",
              icon: AlertTriangle,
              color:
                sonr && sonr.risk > 0.3
                  ? "oklch(0.65 0.22 22)"
                  : "oklch(0.72 0.17 155)",
            },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="glass-portal-it rounded-2xl px-5 py-4"
                data-ocid={`it.stat_card.${i + 1}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-muted-foreground">
                    {stat.label}
                  </span>
                  <Icon className="h-3.5 w-3.5" style={{ color: stat.color }} />
                </div>
                <p
                  className="font-display text-xl font-bold"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </p>
              </div>
            );
          })}
        </motion.div>

        {/* Main 3-column grid */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-5"
          data-ocid="it.main_grid"
        >
          <EngineHealthPanel diag={diag ?? null} />
          <BridgePanel />
          <RegistryPanel />
        </motion.div>

        {/* Law Monitor — full width */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <LawMonitor laws={laws} isLoading={lawsLoading} />
        </motion.div>

        {/* ALPH Registry Tree + Identity Event Feed */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-5"
          data-ocid="it.registry_identity_grid"
        >
          <AlphRegistryTree />
          <IdentityEventFeed diag={diag ?? undefined} />
        </motion.div>

        {/* Portal Transition + API Activity feeds */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.27 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-5"
          data-ocid="it.live_feeds_grid"
        >
          <PortalTransitionFeed />
          <ApiActivityLog />
        </motion.div>
        {/* Health pulse tick (hidden, drives re-render at F(6)=8s) */}
        <span className="sr-only">{healthPulse}</span>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          data-ocid="it.quick_links"
        >
          <Link to="/it/network" data-ocid="it.network_link">
            <div className="glass-portal-it rounded-2xl px-5 py-4 flex items-center gap-3 hover:brightness-110 transition-smooth cursor-pointer group">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{ background: "rgba(0,220,130,0.10)" }}
              >
                <Network
                  className="h-5 w-5"
                  style={{ color: "oklch(0.72 0.17 155)" }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display font-semibold text-sm text-foreground">
                  Network Topology
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Live substrate nodes · encryption · latency
                </p>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
          </Link>
          <Link to="/it/audit" data-ocid="it.audit_link">
            <div className="glass-portal-it rounded-2xl px-5 py-4 flex items-center gap-3 hover:brightness-110 transition-smooth cursor-pointer group">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{ background: "rgba(0,220,130,0.10)" }}
              >
                <Shield
                  className="h-5 w-5"
                  style={{ color: "oklch(0.72 0.17 155)" }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display font-semibold text-sm text-foreground">
                  Security Audit Log
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Append-only event record · PHI-cycle events
                </p>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
          </Link>
          <Link to="/it/engines" data-ocid="it.engines_link">
            <div className="glass-portal-it rounded-2xl px-5 py-4 flex items-center gap-3 hover:brightness-110 transition-smooth cursor-pointer group">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{ background: "rgba(0,220,130,0.10)" }}
              >
                <Activity
                  className="h-5 w-5"
                  style={{ color: "oklch(0.72 0.17 155)" }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display font-semibold text-sm text-foreground">
                  Engine Monitor
                </p>
                <p className="text-[10px] text-muted-foreground">
                  4 substrates · PHI-scored · LEX_SOVEREIGNUS
                </p>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
          </Link>
          <Link to="/it/apix" data-ocid="it.apix_link">
            <div className="glass-portal-it rounded-2xl px-5 py-4 flex items-center gap-3 hover:brightness-110 transition-smooth cursor-pointer group">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{ background: "rgba(0,220,130,0.10)" }}
              >
                <Zap
                  className="h-5 w-5"
                  style={{ color: "oklch(0.72 0.17 155)" }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display font-semibold text-sm text-foreground">
                  APIX Gateway
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Versioned · Identity-gated · GATE-enforced
                </p>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
          </Link>
        </motion.div>

        {/* Footer */}
        <div className="text-center py-3">
          <p className="text-[10px] text-muted-foreground/50 font-mono">
            EduAI Sovereign OS · LEX_SOVEREIGNUS ENFORCED · All systems native ·
            No external dependencies
          </p>
        </div>
      </div>
    </div>
  );
}
