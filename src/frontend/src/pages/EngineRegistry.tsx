import type { SovereignEngine } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { EngineStatus } from "@/hooks/use-engines";
import { useEngines } from "@/hooks/use-engines";
import { Link } from "@tanstack/react-router";
import { ChevronDown, ChevronRight, Cpu, Zap } from "lucide-react";
import { useState } from "react";

type SubstrateKey = "ICPM" | "JLIA" | "EART" | "EMRT";

const SUBSTRATE_CONFIG: Record<
  SubstrateKey,
  {
    label: string;
    accent: string;
    glow: string;
    border: string;
    chipBg: string;
    dotColor: string;
  }
> = {
  ICPM: {
    label: "ICP / Motoko",
    accent: "text-cyan-400",
    glow: "rgba(0,210,255,0.18)",
    border: "rgba(0,210,255,0.22)",
    chipBg: "rgba(0,210,255,0.08)",
    dotColor: "oklch(0.78 0.22 200)",
  },
  JLIA: {
    label: "Julia Runtime",
    accent: "text-violet-400",
    glow: "rgba(160,100,255,0.18)",
    border: "rgba(160,100,255,0.22)",
    chipBg: "rgba(160,100,255,0.08)",
    dotColor: "oklch(0.68 0.18 280)",
  },
  EART: {
    label: "Autonomous Runtime",
    accent: "text-amber-400",
    glow: "rgba(255,185,0,0.18)",
    border: "rgba(255,185,0,0.22)",
    chipBg: "rgba(255,185,0,0.08)",
    dotColor: "oklch(0.75 0.16 70)",
  },
  EMRT: {
    label: "Memory Runtime",
    accent: "text-emerald-400",
    glow: "rgba(0,220,130,0.18)",
    border: "rgba(0,220,130,0.22)",
    chipBg: "rgba(0,220,130,0.08)",
    dotColor: "oklch(0.72 0.17 155)",
  },
};

function getSubstrate(engine: SovereignEngine): SubstrateKey {
  const id = Number(engine.id);
  if ([1, 2, 3, 4, 5].includes(id)) return "ICPM";
  if ([6, 7].includes(id)) return "JLIA";
  if ([8, 9].includes(id)) return "EART";
  return "EMRT";
}

function CohRing({ value }: { value: number }) {
  const r = 18;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(1, Math.max(0, value / 100));
  const color =
    pct > 0.8
      ? "oklch(0.72 0.17 155)"
      : pct > 0.4
        ? "oklch(0.75 0.16 70)"
        : "oklch(0.65 0.22 22)";
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle
        cx="22"
        cy="22"
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="3"
      />
      <circle
        cx="22"
        cy="22"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeDasharray={`${pct * circ} ${circ}`}
        strokeLinecap="round"
        style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
      />
      <text
        x="22"
        y="26"
        textAnchor="middle"
        fill={color}
        fontSize="9"
        fontFamily="monospace"
        fontWeight="700"
      >
        {Math.round(value)}
      </text>
    </svg>
  );
}

function EngineCard({
  engine,
  index,
  substrate,
}: { engine: SovereignEngine; index: number; substrate: SubstrateKey }) {
  const cfg = SUBSTRATE_CONFIG[substrate];
  const isActive = engine.status === EngineStatus.active;
  const coh = 85 + (Number(engine.id) % 12);
  return (
    <Link
      to="/engines/$engineId"
      params={{ engineId: String(engine.id) }}
      data-ocid={`engine_registry.engine_card.${index}`}
      className="block group"
    >
      <div
        className="glass-sm rounded-2xl p-4 transition-glass hover:-translate-y-0.5 cursor-pointer glass-shimmer"
        style={{
          borderColor: cfg.border,
          boxShadow: `0 4px 24px ${cfg.glow}, 0 0 0 1px ${cfg.border}`,
        }}
      >
        <div className="flex items-start justify-between gap-2 mb-3">
          <div
            className="rounded-lg px-2 py-0.5 font-mono text-xs font-bold tracking-widest shrink-0"
            style={{
              background: cfg.chipBg,
              color: cfg.dotColor,
              border: `1px solid ${cfg.border}`,
            }}
          >
            {engine.codeName}
          </div>
          <span
            className="w-2 h-2 rounded-full shrink-0 mt-1"
            style={{
              background: isActive ? cfg.dotColor : "oklch(0.55 0.01 260)",
              boxShadow: isActive ? `0 0 6px ${cfg.glow}` : "none",
              animation: isActive
                ? "status-pulse 2s ease-in-out infinite"
                : "none",
            }}
            aria-label={isActive ? "Active" : "Dormant"}
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm font-display font-semibold text-foreground leading-tight truncate">
              {engine.fullName}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed">
              {engine.domain.slice(0, 60)}
              {engine.domain.length > 60 ? "…" : ""}
            </p>
          </div>
          <CohRing value={coh} />
        </div>
        <div
          className="mt-3 pt-3 flex items-center justify-between"
          style={{ borderTop: `1px solid ${cfg.border}` }}
        >
          <span className="text-[10px] font-mono text-muted-foreground">
            {engine.lessonsAvailable.length} lessons
          </span>
          <span
            className={`text-[10px] font-mono font-semibold ${cfg.accent} flex items-center gap-1`}
          >
            Enter <ChevronRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function SubstrateSection({
  substrateKey,
  engines,
}: { substrateKey: SubstrateKey; engines: SovereignEngine[] }) {
  const [open, setOpen] = useState(true);
  const cfg = SUBSTRATE_CONFIG[substrateKey];
  return (
    <div
      data-ocid={`engine_registry.substrate_section.${substrateKey.toLowerCase()}`}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl glass-sm transition-glass text-left touch-target mb-3"
        style={{ borderColor: cfg.border }}
        data-ocid={`engine_registry.substrate_toggle.${substrateKey.toLowerCase()}`}
      >
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: cfg.dotColor, boxShadow: `0 0 8px ${cfg.glow}` }}
          aria-hidden
        />
        <span
          className="font-mono text-xs font-bold tracking-widest uppercase"
          style={{ color: cfg.dotColor }}
        >
          {substrateKey}
        </span>
        <span className="text-xs text-muted-foreground">·</span>
        <span className="text-xs text-muted-foreground">{cfg.label}</span>
        <Badge
          variant="outline"
          className="ml-auto text-[10px] font-mono"
          style={{
            borderColor: cfg.border,
            color: cfg.dotColor,
            background: cfg.chipBg,
          }}
        >
          {engines.length} engines
        </Badge>
        {open ? (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
      {open && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {engines.map((engine, idx) => (
            <EngineCard
              key={String(engine.id)}
              engine={engine}
              index={idx + 1}
              substrate={substrateKey}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function EngineRegistry() {
  const { engines, isLoading } = useEngines();
  const activeCount = engines.filter(
    (e) => e.status === EngineStatus.active,
  ).length;
  const grouped: Record<SubstrateKey, SovereignEngine[]> = {
    ICPM: engines.filter((e) => getSubstrate(e) === "ICPM"),
    JLIA: engines.filter((e) => getSubstrate(e) === "JLIA"),
    EART: engines.filter((e) => getSubstrate(e) === "EART"),
    EMRT: engines.filter((e) => getSubstrate(e) === "EMRT"),
  };
  return (
    <div
      className="portal-enter max-w-5xl mx-auto px-4 py-10 space-y-8"
      data-ocid="engine_registry.page"
    >
      <div className="glass-xl rounded-3xl p-8 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 80% -10%, rgba(0,220,130,0.12) 0%, transparent 70%)",
          }}
        />
        <div className="relative">
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "rgba(0,220,130,0.12)",
                border: "1px solid rgba(0,220,130,0.25)",
              }}
            >
              <Cpu
                className="w-5 h-5"
                style={{ color: "oklch(0.72 0.17 155)" }}
              />
            </div>
            <div>
              <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                EduAI · ENGR
              </span>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-display font-black tracking-tight text-foreground">
                  ENGINE REGISTRY
                </h1>
                <span
                  className="text-xs font-mono px-2 py-0.5 rounded"
                  style={{
                    background: "rgba(0,220,130,0.1)",
                    color: "oklch(0.72 0.17 155)",
                    border: "1px solid rgba(0,220,130,0.2)",
                  }}
                >
                  {engines.length} registered
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                label: "Total Engines",
                value: engines.length,
                color: "oklch(0.72 0.17 155)",
              },
              {
                label: "Active",
                value: activeCount,
                color: "oklch(0.72 0.17 155)",
              },
              { label: "Substrates", value: 4, color: "oklch(0.68 0.18 280)" },
              {
                label: "Sovereign",
                value: "100%",
                color: "oklch(0.75 0.16 70)",
              },
            ].map(({ label, value, color }) => (
              <div
                key={label}
                className="glass-sm rounded-xl px-3 py-2.5 text-center"
              >
                <p
                  className="text-lg font-black font-display"
                  style={{ color }}
                >
                  {value}
                </p>
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mt-0.5">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3" data-ocid="engine_registry.loading_state">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={`skel-${i + 1}`} className="h-24 rounded-2xl" />
          ))}
        </div>
      ) : (
        <div data-ocid="engine_registry.engines_grid">
          {(Object.keys(grouped) as SubstrateKey[]).map((sub) =>
            grouped[sub].length > 0 ? (
              <SubstrateSection
                key={sub}
                substrateKey={sub}
                engines={grouped[sub]}
              />
            ) : null,
          )}
        </div>
      )}

      <div
        className="glass-sm rounded-2xl px-5 py-4 flex items-center gap-3"
        style={{ borderColor: "rgba(0,220,130,0.15)" }}
      >
        <Zap
          className="w-4 h-4 shrink-0"
          style={{ color: "oklch(0.72 0.17 155)" }}
        />
        <p className="text-xs font-mono text-muted-foreground">
          <span style={{ color: "oklch(0.72 0.17 155)" }}>LEX_RGST</span> · All
          engines registered, named, and sealed at first registration. Names are
          permanent.
        </p>
      </div>
    </div>
  );
}
