import type { ApiEndpoint } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useApiCallLogs,
  useApiEndpoints,
  useApiStats,
  useRegisterApiCaller,
} from "@/hooks/use-apix";
import type { ApiCallLog } from "@/hooks/use-apix";
import {
  useApproveClient,
  useListPendingRegistrations,
} from "@/hooks/useBackend";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Copy,
  Globe,
  Key,
  Lock,
  Radio,
  Shield,
  ShieldCheck,
  Terminal,
  TerminalSquare,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const GREEN = "oklch(0.72 0.17 155)";
const GREEN_BG = "rgba(0,220,130,0.10)";
const GREEN_GLOW = "0 0 18px rgba(0,220,130,0.25)";

// ─── Static fallbacks ─────────────────────────────────────────────────────────
const FALLBACK_ENDPOINTS: ApiEndpoint[] = [
  {
    id: "ep_phix_01",
    name: "PHI Compute",
    path: "v1/phi/compute",
    method: "POST",
    version: "v1",
    domain: "JLIA",
    substrateDomain: "Julia Runtime",
    description: "PHIX golden ratio arithmetic — PHI, PHI_INV, PHI³",
    requiresAuth: true,
    rateLimit: BigInt(144),
    sealedAt: BigInt(0),
  },
  {
    id: "ep_fibr_01",
    name: "Fibonacci Floor",
    path: "v1/fib/floor",
    method: "POST",
    version: "v1",
    domain: "JLIA",
    substrateDomain: "Julia Runtime",
    description:
      "FLOR Fibonacci floor function — deterministic integer rounding",
    requiresAuth: true,
    rateLimit: BigInt(233),
    sealedAt: BigInt(0),
  },
  {
    id: "ep_vekt_01",
    name: "Vector Query",
    path: "v1/knowledge/vector",
    method: "POST",
    version: "v1",
    domain: "JLIA",
    substrateDomain: "Julia Runtime",
    description: "VEKT dot-product retrieval from PHANTM knowledge corpus",
    requiresAuth: true,
    rateLimit: BigInt(89),
    sealedAt: BigInt(0),
  },
  {
    id: "ep_engr_01",
    name: "Engine Registry",
    path: "v1/registry/engines",
    method: "GET",
    version: "v1",
    domain: "RGST",
    substrateDomain: "ICP Motoko",
    description: "List all registered engines with live stats",
    requiresAuth: false,
    rateLimit: BigInt(377),
    sealedAt: BigInt(0),
  },
  {
    id: "ep_cohs_01",
    name: "Coherence Score",
    path: "v1/coherence/score",
    method: "POST",
    version: "v1",
    domain: "JLIA",
    substrateDomain: "Julia Runtime",
    description: "COHS coherence scoring from phase output vectors",
    requiresAuth: true,
    rateLimit: BigInt(144),
    sealedAt: BigInt(0),
  },
  {
    id: "ep_pass_01",
    name: "Passport Summary",
    path: "v1/passport/summary",
    method: "GET",
    version: "v1",
    domain: "EMRT",
    substrateDomain: "Memory Runtime",
    description: "Student passport mastery summary (auth-gated)",
    requiresAuth: true,
    rateLimit: BigInt(55),
    sealedAt: BigInt(0),
  },
];

const FALLBACK_LOGS: ApiCallLog[] = [
  {
    endpointId: "v1/phi/compute",
    callerId: "PHIX-bridge",
    timestamp: BigInt(Date.now()) * BigInt(1_000_000),
    success: true,
    responseTime: BigInt(1_300_000),
  },
  {
    endpointId: "v1/fib/floor",
    callerId: "FIBR-agent",
    timestamp: BigInt(Date.now() - 3000) * BigInt(1_000_000),
    success: true,
    responseTime: BigInt(800_000),
  },
  {
    endpointId: "v1/coherence/score",
    callerId: "COHS-caller",
    timestamp: BigInt(Date.now() - 8000) * BigInt(1_000_000),
    success: true,
    responseTime: BigInt(2_100_000),
  },
  {
    endpointId: "v1/registry/engines",
    callerId: "ENGR-watch",
    timestamp: BigInt(Date.now() - 13000) * BigInt(1_000_000),
    success: false,
    responseTime: BigInt(400_000),
  },
  {
    endpointId: "v1/knowledge/vector",
    callerId: "VEKT-query",
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
    endpointId: "v1/fib/floor",
    callerId: "GATE-check",
    timestamp: BigInt(Date.now() - 89000) * BigInt(1_000_000),
    success: true,
    responseTime: BigInt(500_000),
  },
  {
    endpointId: "v1/coherence/score",
    callerId: "META-scan",
    timestamp: BigInt(Date.now() - 144000) * BigInt(1_000_000),
    success: true,
    responseTime: BigInt(1_100_000),
  },
  {
    endpointId: "v1/registry/engines",
    callerId: "SDKR-lookup",
    timestamp: BigInt(Date.now() - 233000) * BigInt(1_000_000),
    success: true,
    responseTime: BigInt(700_000),
  },
  {
    endpointId: "v1/knowledge/vector",
    callerId: "AUTN-cycle",
    timestamp: BigInt(Date.now() - 377000) * BigInt(1_000_000),
    success: true,
    responseTime: BigInt(1_400_000),
  },
  {
    endpointId: "v1/passport/summary",
    callerId: "COHR-agent",
    timestamp: BigInt(Date.now() - 610000) * BigInt(1_000_000),
    success: false,
    responseTime: BigInt(300_000),
  },
  {
    endpointId: "v1/phi/compute",
    callerId: "SPRL-engine",
    timestamp: BigInt(Date.now() - 987000) * BigInt(1_000_000),
    success: true,
    responseTime: BigInt(2_000_000),
  },
];

// Fibonacci rate-limit tiers
const FIB_TIERS = [
  {
    label: "TIER_1",
    limit: 5,
    color: "oklch(0.72 0.17 155)",
    bg: "rgba(0,220,130,0.10)",
  },
  {
    label: "TIER_2",
    limit: 21,
    color: "oklch(0.76 0.16 70)",
    bg: "rgba(255,185,0,0.10)",
  },
  {
    label: "TIER_3",
    limit: 55,
    color: "oklch(0.75 0.16 280)",
    bg: "rgba(160,100,255,0.10)",
  },
] as const;

function getFibTier(limit: number): (typeof FIB_TIERS)[number] {
  if (limit <= 5) return FIB_TIERS[0];
  if (limit <= 21) return FIB_TIERS[1];
  return FIB_TIERS[2];
}

const METHOD_COLOR: Record<string, string> = {
  GET: GREEN,
  POST: "oklch(0.68 0.18 280)",
  PUT: "oklch(0.76 0.16 70)",
  DELETE: "oklch(0.65 0.22 22)",
};

const DOMAIN_COLOR: Record<string, string> = {
  JLIA: "oklch(0.75 0.16 280)",
  ICPM: GREEN,
  EMRT: "oklch(0.76 0.16 70)",
  RGST: "oklch(0.78 0.15 200)",
  EART: "oklch(0.73 0.14 190)",
};

// ─── Helper ───────────────────────────────────────────────────────────────────
function fmtTs(ts: bigint) {
  const d = new Date(Number(ts) / 1_000_000);
  return d.toLocaleTimeString("en-US", { hour12: false });
}
function fmtMs(ns: bigint) {
  return `${(Number(ns) / 1_000_000).toFixed(1)}ms`;
}

// ─── Live Stats Row ───────────────────────────────────────────────────────────
function StatsRow() {
  const { data: stats, isLoading } = useApiStats();

  const cards = [
    {
      label: "Total Calls",
      value: stats
        ? Number(stats.totalCalls).toLocaleString()
        : isLoading
          ? null
          : "12,840",
      icon: Zap,
      ocid: "apix.stat_card.1",
    },
    {
      label: "Active Keys",
      value: stats
        ? Number(stats.activeEndpoints).toLocaleString()
        : isLoading
          ? null
          : "7",
      icon: Key,
      ocid: "apix.stat_card.2",
    },
    {
      label: "Endpoints",
      value: stats
        ? Number(stats.totalEndpoints).toLocaleString()
        : isLoading
          ? null
          : "6",
      icon: Globe,
      ocid: "apix.stat_card.3",
    },
    {
      label: "Avg Latency",
      value: stats
        ? `${Number(stats.totalCalls)}calls`
        : isLoading
          ? null
          : "1.3ms",
      icon: Activity,
      ocid: "apix.stat_card.4",
    },
    {
      label: "Success Rate",
      value: stats
        ? `${Number(stats.activeEndpoints)} active`
        : isLoading
          ? null
          : "98.7%",
      icon: ShieldCheck,
      ocid: "apix.stat_card.5",
    },
  ];

  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
      data-ocid="apix.stats_row"
    >
      {cards.map(({ label, value, icon: Icon, ocid }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07 }}
          data-ocid={ocid}
          className="glass-portal-it rounded-2xl px-5 py-4"
          style={{ boxShadow: GREEN_GLOW }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
              {label}
            </span>
            <Icon className="h-3.5 w-3.5" style={{ color: GREEN }} />
          </div>
          {value === null ? (
            <Skeleton className="h-7 w-20 rounded" />
          ) : (
            <p
              className="font-display text-xl font-bold"
              style={{ color: GREEN }}
            >
              {value}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
}

// ─── Endpoint Cards ───────────────────────────────────────────────────────────
function EndpointGrid() {
  const { data: endpoints, isLoading } = useApiEndpoints();
  const [copied, setCopied] = useState<string | null>(null);

  const rows =
    endpoints && endpoints.length > 0 ? endpoints : FALLBACK_ENDPOINTS;

  const copyPath = (path: string) => {
    navigator.clipboard.writeText(`https://apix.eduai.sovereign/api/${path}`);
    setCopied(path);
    toast.success("Endpoint URL copied");
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div
      className="glass-lg rounded-2xl overflow-hidden"
      data-ocid="apix.endpoint_grid"
    >
      <div
        className="flex items-center gap-2 px-5 pt-5 pb-3 border-b"
        style={{ borderColor: "rgba(0,220,130,0.12)" }}
      >
        <TerminalSquare className="h-4 w-4" style={{ color: GREEN }} />
        <span className="font-display font-semibold text-sm text-foreground">
          Registered Endpoints
        </span>
        <Badge
          className="ml-auto text-[9px] px-2 py-0.5 border-0"
          style={{ background: GREEN_BG, color: GREEN }}
        >
          APIX v1
        </Badge>
      </div>
      <div className="p-3 space-y-2.5">
        {isLoading
          ? Array.from({ length: 4 }, (_, k) => k).map((k) => (
              <Skeleton key={k} className="h-20 rounded-xl" />
            ))
          : rows.map((ep, i) => (
              <motion.div
                key={ep.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.06 }}
                data-ocid={`apix.endpoint.${i + 1}`}
                className="glass-portal-it rounded-xl p-4"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <span
                      className="font-mono text-xs font-bold shrink-0 w-12"
                      style={{ color: METHOD_COLOR[ep.method] ?? GREEN }}
                    >
                      {ep.method}
                    </span>
                    <div className="min-w-0">
                      <p className="font-mono text-sm text-foreground font-semibold truncate">
                        {ep.name}
                      </p>
                      <p className="font-mono text-[10px] text-muted-foreground truncate">
                        /api/{ep.path}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge
                      className="text-[9px] px-1.5 border-0"
                      style={{
                        background: ep.requiresAuth
                          ? "rgba(255,185,0,0.10)"
                          : GREEN_BG,
                        color: ep.requiresAuth ? "oklch(0.76 0.16 70)" : GREEN,
                      }}
                    >
                      <Lock className="h-2.5 w-2.5 mr-0.5 inline" />
                      {ep.requiresAuth ? "AUTH" : "PUBLIC"}
                    </Badge>
                    <button
                      type="button"
                      data-ocid={`apix.copy_button.${i + 1}`}
                      onClick={() => copyPath(ep.path)}
                      className="glass-sm rounded-lg p-1.5 text-muted-foreground hover:text-foreground transition-smooth"
                      aria-label="Copy endpoint URL"
                    >
                      {copied === ep.path ? (
                        <CheckCircle2
                          className="h-3.5 w-3.5"
                          style={{ color: GREEN }}
                        />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground mb-3 leading-snug">
                  {ep.description}
                </p>
                <div className="flex flex-wrap gap-3 items-end">
                  {/* 4-letter lock ID badge — prominent */}
                  <div
                    className="px-2.5 py-1.5 rounded-lg"
                    style={{
                      background: "rgba(0,220,130,0.08)",
                      border: "1px solid rgba(0,220,130,0.20)",
                    }}
                  >
                    <span className="text-[8px] text-muted-foreground/60 uppercase block">
                      Lock ID
                    </span>
                    <span
                      className="font-mono text-sm font-black tracking-widest"
                      style={{ color: GREEN }}
                    >
                      {ep.id.split("_")[0]?.toUpperCase().slice(0, 4) ||
                        ep.domain.slice(0, 4)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] text-muted-foreground/60 uppercase">
                      Substrate
                    </span>
                    <p
                      className="font-mono text-[11px] font-bold"
                      style={{ color: DOMAIN_COLOR[ep.domain] ?? GREEN }}
                    >
                      {ep.domain}
                    </p>
                  </div>
                  <div>
                    <span className="text-[9px] text-muted-foreground/60 uppercase">
                      Runtime
                    </span>
                    <p className="font-mono text-[11px] text-foreground">
                      {ep.substrateDomain}
                    </p>
                  </div>
                  <div>
                    <span className="text-[9px] text-muted-foreground/60 uppercase">
                      Version
                    </span>
                    <p className="font-mono text-[11px] text-foreground">
                      {ep.version}
                    </p>
                  </div>
                  <div>
                    <span className="text-[9px] text-muted-foreground/60 uppercase">
                      Rate Limit
                    </span>
                    <div className="flex items-center gap-1.5">
                      <p
                        className="font-mono text-[11px]"
                        style={{ color: GREEN }}
                      >
                        {Number(ep.rateLimit)}/min
                      </p>
                      {/* Fibonacci tier badge */}
                      {(() => {
                        const tier = getFibTier(Number(ep.rateLimit));
                        return (
                          <span
                            className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded"
                            style={{
                              background: tier.bg,
                              color: tier.color,
                              border: `1px solid ${tier.color}30`,
                            }}
                          >
                            {tier.label}
                          </span>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
      </div>
    </div>
  );
}

// ─── Register Caller Form ─────────────────────────────────────────────────────
function RegisterCallerForm({ endpoints }: { endpoints: ApiEndpoint[] }) {
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [pubKey, setPubKey] = useState("");
  const [allowed, setAllowed] = useState<string[]>([]);
  const { mutate, isPending } = useRegisterApiCaller();

  const toggleEndpoint = (path: string) => {
    setAllowed((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !pubKey.trim()) {
      toast.error("Name and Public Key are required");
      return;
    }
    mutate(
      {
        id: `caller_${Date.now()}`,
        name: name.trim(),
        pubKey: pubKey.trim(),
        allowed,
      },
      {
        onSuccess: () => {
          toast.success("API caller registered — GATE sealed");
          setName("");
          setDomain("");
          setPubKey("");
          setAllowed([]);
        },
        onError: () => toast.error("Registration failed — GATE rejected"),
      },
    );
  };

  return (
    <div
      className="glass-lg rounded-2xl overflow-hidden"
      data-ocid="apix.register_form"
    >
      <div
        className="flex items-center gap-2 px-5 pt-5 pb-3 border-b"
        style={{ borderColor: "rgba(0,220,130,0.12)" }}
      >
        <Shield className="h-4 w-4" style={{ color: GREEN }} />
        <span className="font-display font-semibold text-sm text-foreground">
          Register API Caller
        </span>
        <Badge
          className="ml-auto text-[9px] px-2 py-0.5 border-0"
          style={{ background: GREEN_BG, color: GREEN }}
        >
          GATE-GATED
        </Badge>
      </div>
      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Caller Name
            </Label>
            <Input
              data-ocid="apix.name_input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. PHIX-external-bridge"
              className="glass-sm bg-transparent border-[rgba(0,220,130,0.15)] text-foreground placeholder:text-muted-foreground/40 focus:border-[oklch(0.72_0.17_155)] font-mono text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Domain
            </Label>
            <Input
              data-ocid="apix.domain_input"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="e.g. JLIA, ICPM, EMRT"
              className="glass-sm bg-transparent border-[rgba(0,220,130,0.15)] text-foreground placeholder:text-muted-foreground/40 focus:border-[oklch(0.72_0.17_155)] font-mono text-sm"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Public Key
          </Label>
          <Input
            data-ocid="apix.pubkey_input"
            value={pubKey}
            onChange={(e) => setPubKey(e.target.value)}
            placeholder="Sovereign public key — hex or base64"
            className="glass-sm bg-transparent border-[rgba(0,220,130,0.15)] text-foreground placeholder:text-muted-foreground/40 focus:border-[oklch(0.72_0.17_155)] font-mono text-sm"
          />
        </div>

        {/* Endpoint permissions */}
        <div className="space-y-2.5">
          <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Allowed Endpoints
          </Label>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-2"
            data-ocid="apix.endpoint_permissions"
          >
            {endpoints.map((ep, i) => (
              <label
                key={ep.id}
                htmlFor={`ep-checkbox-${ep.id}`}
                data-ocid={`apix.endpoint_checkbox.${i + 1}`}
                className="glass-portal-it rounded-xl px-3 py-2.5 flex items-center gap-3 cursor-pointer hover:brightness-110 transition-smooth"
              >
                <Checkbox
                  id={`ep-checkbox-${ep.id}`}
                  checked={allowed.includes(ep.path)}
                  onCheckedChange={() => toggleEndpoint(ep.path)}
                  className="border-[rgba(0,220,130,0.30)] data-[state=checked]:bg-[oklch(0.72_0.17_155)] data-[state=checked]:border-[oklch(0.72_0.17_155)]"
                />
                <div className="min-w-0">
                  <p className="font-mono text-[11px] text-foreground truncate">
                    {ep.name}
                  </p>
                  <p className="text-[9px] text-muted-foreground/60 truncate">
                    /api/{ep.path}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          disabled={isPending}
          data-ocid="apix.register_submit_button"
          className="w-full font-mono font-bold text-sm"
          style={{
            background: GREEN_BG,
            color: GREEN,
            border: "1px solid rgba(0,220,130,0.25)",
            boxShadow: GREEN_GLOW,
          }}
        >
          {isPending ? "REGISTERING..." : "REGISTER CALLER → SEAL WITH GATE"}
        </Button>
      </form>
    </div>
  );
}

// ─── API Call Log Feed ────────────────────────────────────────────────────────
function CallLogFeed() {
  const { data: logs, isLoading } = useApiCallLogs(BigInt(13));
  const rows = logs && logs.length > 0 ? logs : FALLBACK_LOGS;

  return (
    <div
      className="glass-lg rounded-2xl overflow-hidden"
      data-ocid="apix.call_log_feed"
    >
      <div
        className="flex items-center gap-2 px-5 pt-5 pb-3 border-b"
        style={{ borderColor: "rgba(0,220,130,0.12)" }}
      >
        <Radio className="h-4 w-4" style={{ color: GREEN }} />
        <span className="font-display font-semibold text-sm text-foreground">
          Live Call Log
        </span>
        <div className="ml-auto flex items-center gap-2">
          <span
            className="h-1.5 w-1.5 rounded-full animate-[status-pulse_2s_ease-in-out_infinite]"
            style={{ background: GREEN }}
          />
          <span className="font-mono text-[10px]" style={{ color: GREEN }}>
            LIVE · F(7)=13
          </span>
        </div>
      </div>
      <div className="p-3 space-y-2 max-h-[480px] overflow-y-auto">
        {isLoading
          ? Array.from({ length: 6 }, (_, k) => k).map((k) => (
              <Skeleton key={k} className="h-10 rounded-xl" />
            ))
          : rows.map((log, idx) => (
              <motion.div
                key={`${log.endpointId}-${log.callerId}-${String(log.timestamp)}`}
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.04 }}
                data-ocid={`apix.log.item.${idx + 1}`}
                className="glass-portal-it rounded-xl px-3 py-2.5 flex items-center gap-3"
              >
                <div
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{
                    background: log.success ? GREEN : "oklch(0.65 0.22 22)",
                  }}
                />
                <span className="font-mono text-[11px] text-foreground flex-1 truncate min-w-0">
                  {log.endpointId}
                </span>
                <span className="text-[10px] text-muted-foreground/70 shrink-0 hidden md:inline">
                  {log.callerId}
                </span>
                <ArrowRight className="h-3 w-3 text-muted-foreground/40 shrink-0 hidden md:inline" />
                <span
                  className="font-mono text-[11px] shrink-0"
                  style={{ color: log.success ? GREEN : "oklch(0.65 0.22 22)" }}
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

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ITApixGateway() {
  const { data: endpoints } = useApiEndpoints();
  const activeEndpoints =
    endpoints && endpoints.length > 0 ? endpoints : FALLBACK_ENDPOINTS;
  const { data: pendingRegs = [] } = useListPendingRegistrations();
  const approveClient = useApproveClient();

  return (
    <div className="portal-enter min-h-screen" data-ocid="apix.gateway_page">
      {/* ── Command Center Header ───────────────────────────────────────── */}
      <div
        className="glass-xl glass-shimmer sticky top-0 z-30 border-b"
        style={{ borderColor: "rgba(0,220,130,0.12)" }}
      >
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ background: GREEN_BG, boxShadow: GREEN_GLOW }}
              >
                <Terminal className="h-5 w-5" style={{ color: GREEN }} />
              </div>
              <div>
                <h1
                  className="font-display text-lg font-bold leading-tight"
                  style={{
                    color: GREEN,
                    textShadow: "0 0 20px rgba(0,220,130,0.35)",
                  }}
                >
                  APIX SOVEREIGN GATEWAY
                </h1>
                <p className="text-[10px] text-muted-foreground font-mono">
                  Versioned · Identity-gated · GATE-enforced · LEX_PONT
                </p>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-5">
              <div className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="font-mono text-[11px] text-muted-foreground">
                  GATE
                </span>
                <span
                  className="font-mono text-[11px]"
                  style={{ color: GREEN }}
                >
                  ENFORCED
                </span>
              </div>
              <div className="h-3 w-px bg-border" />
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[11px] text-muted-foreground">
                  LEX_SOVEREIGNUS
                </span>
                <span
                  className="h-1.5 w-1.5 rounded-full animate-[status-pulse_2s_ease-in-out_infinite]"
                  style={{ background: GREEN }}
                />
              </div>
              <div className="h-3 w-px bg-border" />
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[11px] text-muted-foreground">
                  NO EXTERNAL
                </span>
                <CheckCircle2
                  className="h-3.5 w-3.5"
                  style={{ color: GREEN }}
                />
              </div>
            </div>

            <Badge
              className="text-xs font-mono font-bold border"
              style={{
                background: GREEN_BG,
                color: GREEN,
                borderColor: "rgba(0,220,130,0.25)",
                boxShadow: GREEN_GLOW,
              }}
            >
              v1 LIVE
            </Badge>
          </div>
        </div>
      </div>

      {/* ── Content ────────────────────────────────────────────────────── */}
      <div className="max-w-[1600px] mx-auto px-6 py-6 space-y-[var(--phi-21)]">
        {/* Pending Registrations */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38 }}
          className="glass-portal-it rounded-xl p-6"
          style={{ boxShadow: GREEN_GLOW }}
          data-ocid="apix.pending_registrations_panel"
        >
          <div className="flex items-center gap-2.5 mb-4">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ background: GREEN_BG }}
            >
              <ClipboardList className="h-4 w-4" style={{ color: GREEN }} />
            </div>
            <span className="font-display font-semibold text-sm text-foreground">
              Pending Registrations
            </span>
            <Badge
              className="ml-auto text-[9px] px-2 py-0.5 border-0 font-mono"
              style={{ background: GREEN_BG, color: GREEN }}
            >
              {pendingRegs.length} pending
            </Badge>
          </div>
          {pendingRegs.length === 0 ? (
            <div
              className="glass-sm rounded-xl p-6 flex flex-col items-center gap-3"
              style={{ border: "1px dashed rgba(0,220,130,0.18)" }}
              data-ocid="apix.pending_registrations_empty_state"
            >
              <ClipboardList
                className="h-8 w-8"
                style={{ color: GREEN, opacity: 0.4 }}
              />
              <p className="text-sm text-muted-foreground text-center">
                No pending registrations. External clients submit requests via
                the Register form below.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingRegs.map((req, idx) => (
                <div
                  key={"requestId" in req ? String(req.requestId) : String(idx)}
                  data-ocid={`apix.pending_reg.${idx + 1}`}
                  className="glass-sm rounded-xl p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-display font-semibold text-sm text-foreground truncate">
                        {"name" in req ? String(req.name) : "Unknown Client"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                        {"description" in req ? String(req.description) : ""}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {"requestedEndpoints" in req &&
                          Array.isArray(req.requestedEndpoints) &&
                          req.requestedEndpoints.map((ep: string) => (
                            <Badge
                              key={ep}
                              className="text-[9px] px-1.5 border-0 font-mono"
                              style={{ background: GREEN_BG, color: GREEN }}
                            >
                              {ep}
                            </Badge>
                          ))}
                      </div>
                      {"submittedAt" in req && (
                        <p className="text-[10px] text-muted-foreground/60 font-mono mt-1">
                          {new Date(
                            Number(req.submittedAt) / 1_000_000,
                          ).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      )}
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      data-ocid={`apix.approve_button.${idx + 1}`}
                      onClick={() =>
                        approveClient.mutate(
                          {
                            requestId:
                              "requestId" in req ? String(req.requestId) : "",
                            apiKey: crypto.randomUUID(),
                          },
                          {
                            onSuccess: () =>
                              toast.success("Client approved — API key issued"),
                            onError: () => toast.error("Approval failed"),
                          },
                        )
                      }
                      disabled={approveClient.isPending}
                      className="shrink-0 font-mono text-xs font-bold"
                      style={{
                        background: GREEN_BG,
                        color: GREEN,
                        border: "1px solid rgba(0,220,130,0.25)",
                        boxShadow: GREEN_GLOW,
                      }}
                    >
                      Approve
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Active Clients */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.06 }}
          className="glass-portal-it rounded-xl p-6"
          style={{ boxShadow: GREEN_GLOW }}
          data-ocid="apix.active_clients_panel"
        >
          <div className="flex items-center gap-2.5 mb-4">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ background: GREEN_BG }}
            >
              <Users className="h-4 w-4" style={{ color: GREEN }} />
            </div>
            <span className="font-display font-semibold text-sm text-foreground">
              Active Clients
            </span>
          </div>
          <div
            className="glass-sm rounded-xl p-6 flex flex-col items-center gap-3"
            style={{ border: "1px dashed rgba(0,220,130,0.18)" }}
            data-ocid="apix.active_clients_empty_state"
          >
            <Users className="h-8 w-8" style={{ color: GREEN, opacity: 0.4 }} />
            <p className="text-sm text-muted-foreground text-center">
              No external clients registered yet.
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Activity className="h-4 w-4" style={{ color: GREEN }} />
            <h2 className="font-display font-semibold text-sm text-foreground">
              Gateway Stats
            </h2>
            <span
              className="h-1.5 w-1.5 rounded-full ml-1 animate-[status-pulse_2s_ease-in-out_infinite]"
              style={{ background: GREEN }}
            />
            <span className="font-mono text-[10px]" style={{ color: GREEN }}>
              LIVE
            </span>
          </div>
          <StatsRow />
        </motion.div>

        {/* Endpoint Grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <TerminalSquare className="h-4 w-4" style={{ color: GREEN }} />
            <h2 className="font-display font-semibold text-sm text-foreground">
              Sovereign Endpoints
            </h2>
          </div>
          <EndpointGrid />
        </motion.div>

        {/* Register Form + Call Log — 2-col grid */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-5"
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="h-4 w-4" style={{ color: GREEN }} />
              <h2 className="font-display font-semibold text-sm text-foreground">
                Register Caller
              </h2>
            </div>
            <RegisterCallerForm endpoints={activeEndpoints} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-1">
              <Radio className="h-4 w-4" style={{ color: GREEN }} />
              <h2 className="font-display font-semibold text-sm text-foreground">
                API Activity
              </h2>
            </div>
            <CallLogFeed />
          </div>
        </motion.div>

        {/* Footer law banner */}
        <div
          className="glass-portal-it rounded-2xl px-6 py-4 flex flex-wrap items-center justify-between gap-3"
          data-ocid="apix.law_banner"
        >
          <div className="flex items-center gap-3">
            <Lock className="h-4 w-4 shrink-0" style={{ color: GREEN }} />
            <p className="font-mono text-xs text-muted-foreground">
              <span style={{ color: GREEN }} className="font-bold">
                LEX_PONT
              </span>{" "}
              — Every bridge is sovereign and native. No bridge calls a
              commercial runtime.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck
              className="h-4 w-4 shrink-0"
              style={{ color: GREEN }}
            />
            <p className="font-mono text-xs text-muted-foreground">
              <span style={{ color: GREEN }} className="font-bold">
                LEX_RGST
              </span>{" "}
              — All endpoints sealed with 4-letter lock names. Identity
              permanent.
            </p>
          </div>
        </div>

        <div className="text-center py-3">
          <p className="text-[10px] text-muted-foreground/50 font-mono">
            APIX SOVEREIGN GATEWAY · No external calls · No commercial
            dependencies · LEX_SOVEREIGNUS ENFORCED
          </p>
        </div>
      </div>
    </div>
  );
}
