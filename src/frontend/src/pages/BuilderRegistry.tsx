import type { BuilderStats } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useBuilderStats,
  useSilverBuilders,
} from "@/hooks/use-silver-builders";
import { Hammer, Shield } from "lucide-react";

// ─── Builder manifest (identity registry) ───────────────────────────────────
const BUILDER_MANIFEST = [
  {
    id: "SVRN",
    domain: "Sovereignty",
    accent: "oklch(0.72 0.17 155)",
    glow: "rgba(0,220,130,0.18)",
    border: "rgba(0,220,130,0.22)",
    chip: "rgba(0,220,130,0.08)",
  },
  {
    id: "INTL",
    domain: "Intelligence",
    accent: "oklch(0.68 0.18 280)",
    glow: "rgba(160,100,255,0.18)",
    border: "rgba(160,100,255,0.22)",
    chip: "rgba(160,100,255,0.08)",
  },
  {
    id: "MMRY",
    domain: "Memory",
    accent: "oklch(0.78 0.22 200)",
    glow: "rgba(0,210,255,0.18)",
    border: "rgba(0,210,255,0.22)",
    chip: "rgba(0,210,255,0.08)",
  },
  {
    id: "KNOW",
    domain: "Knowledge",
    accent: "oklch(0.75 0.16 70)",
    glow: "rgba(255,185,0,0.18)",
    border: "rgba(255,185,0,0.22)",
    chip: "rgba(255,185,0,0.08)",
  },
  {
    id: "BRDG",
    domain: "Bridge",
    accent: "oklch(0.72 0.17 155)",
    glow: "rgba(0,220,130,0.18)",
    border: "rgba(0,220,130,0.22)",
    chip: "rgba(0,220,130,0.08)",
  },
  {
    id: "RGTM",
    domain: "Registry",
    accent: "oklch(0.68 0.18 280)",
    glow: "rgba(160,100,255,0.18)",
    border: "rgba(160,100,255,0.22)",
    chip: "rgba(160,100,255,0.08)",
  },
  {
    id: "AUTH",
    domain: "Auth",
    accent: "oklch(0.75 0.16 70)",
    glow: "rgba(255,185,0,0.18)",
    border: "rgba(255,185,0,0.22)",
    chip: "rgba(255,185,0,0.08)",
  },
  {
    id: "ANLX",
    domain: "Analytics",
    accent: "oklch(0.78 0.22 200)",
    glow: "rgba(0,210,255,0.18)",
    border: "rgba(0,210,255,0.22)",
    chip: "rgba(0,210,255,0.08)",
  },
];

function relativeTime(ms: number): string {
  const diff = Date.now() - ms;
  if (diff < 60_000) return "just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return `${Math.floor(diff / 86_400_000)}d ago`;
}

function StatPill({
  label,
  value,
  accent,
}: { label: string; value: string | number; accent: string }) {
  return (
    <div className="text-center">
      <p className="text-sm font-black font-mono" style={{ color: accent }}>
        {value}
      </p>
      <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}

function BuilderCard({
  manifest,
  stats,
  index,
}: {
  manifest: (typeof BUILDER_MANIFEST)[0];
  stats: BuilderStats | null;
  index: number;
}) {
  return (
    <div
      data-ocid={`builders.card.${index}`}
      className="glass-sm rounded-2xl p-5 space-y-4 transition-glass hover:-translate-y-0.5 glass-shimmer"
      style={{
        borderColor: manifest.border,
        boxShadow: `0 4px 24px ${manifest.glow}, 0 0 0 1px ${manifest.border}`,
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1">
          <span
            className="font-mono text-xl font-black tracking-widest px-3 py-1 rounded-xl inline-block"
            style={{
              background: manifest.chip,
              color: manifest.accent,
              border: `1px solid ${manifest.border}`,
            }}
          >
            {manifest.id}
          </span>
          <div className="flex items-center gap-1.5">
            <Shield className="w-3 h-3" style={{ color: manifest.accent }} />
            <span
              className="text-xs font-mono"
              style={{ color: manifest.accent }}
            >
              {manifest.domain}
            </span>
          </div>
        </div>
        <Badge
          variant="outline"
          className="text-[10px] font-mono shrink-0"
          style={{
            borderColor: manifest.border,
            color: manifest.accent,
            background: manifest.chip,
          }}
        >
          ARGENTUM
        </Badge>
      </div>

      {/* Stats grid */}
      <div
        className="grid grid-cols-3 gap-2 pt-3"
        style={{ borderTop: `1px solid ${manifest.border}` }}
      >
        <StatPill
          label="Sessions"
          value={stats ? Number(stats.sessionsProcessed) : "—"}
          accent={manifest.accent}
        />
        <StatPill
          label="Seeds"
          value={stats ? Number(stats.seedsSealed) : "—"}
          accent={manifest.accent}
        />
        <StatPill
          label="Workflows"
          value={stats ? Number(stats.workflowCompletions) : "—"}
          accent={manifest.accent}
        />
      </div>

      {/* Last active */}
      <p className="text-[10px] font-mono text-muted-foreground">
        Last active:{" "}
        <span style={{ color: manifest.accent }}>
          {stats ? relativeTime(Number(stats.lastActiveAt)) : "—"}
        </span>
      </p>
    </div>
  );
}

export default function BuilderRegistry() {
  const { builders, isLoading: buildersLoading } = useSilverBuilders();
  const { stats: allStats, isLoading: statsLoading } = useBuilderStats();
  const isLoading = buildersLoading || statsLoading;

  // Build stats lookup map from Array<[string, BuilderStats]>
  const statsMap = new Map<string, BuilderStats>();
  if (Array.isArray(allStats)) {
    for (const [id, s] of allStats as Array<[string, BuilderStats]>) {
      statsMap.set(id, s);
    }
  }

  // Sort manifest by sessions desc
  const sorted = [...BUILDER_MANIFEST].sort((a, b) => {
    const sa = statsMap.get(a.id);
    const sb = statsMap.get(b.id);
    return (
      Number(sb?.sessionsProcessed ?? 0n) - Number(sa?.sessionsProcessed ?? 0n)
    );
  });

  return (
    <div
      className="max-w-5xl mx-auto px-4 py-10 space-y-8"
      data-ocid="builders.page"
    >
      {/* OS Header */}
      <div className="glass-xl rounded-3xl p-8 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 80% -10%, rgba(255,185,0,0.12) 0%, transparent 70%)",
          }}
        />
        <div className="relative">
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "rgba(255,185,0,0.12)",
                border: "1px solid rgba(255,185,0,0.25)",
              }}
            >
              <Hammer
                className="w-5 h-5"
                style={{ color: "oklch(0.75 0.16 70)" }}
              />
            </div>
            <div>
              <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                EduAI · BLDR
              </span>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-display font-black tracking-tight text-foreground">
                  SILVER BUILDERS
                </h1>
                <span
                  className="text-xs font-mono px-2 py-0.5 rounded"
                  style={{
                    background: "rgba(255,185,0,0.1)",
                    color: "oklch(0.75 0.16 70)",
                    border: "1px solid rgba(255,185,0,0.2)",
                  }}
                >
                  {BUILDER_MANIFEST.length} registered
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                label: "Builders",
                value: BUILDER_MANIFEST.length,
                color: "oklch(0.75 0.16 70)",
              },
              {
                label: "Active Now",
                value: builders.length,
                color: "oklch(0.72 0.17 155)",
              },
              {
                label: "Registry",
                value: "BLDR",
                color: "oklch(0.68 0.18 280)",
              },
              {
                label: "Class",
                value: "ARGENTUM",
                color: "oklch(0.78 0.22 200)",
              },
            ].map(({ label, value, color }) => (
              <div
                key={label}
                className="glass-sm rounded-xl px-3 py-2.5 text-center"
              >
                <p
                  className="text-base font-black font-display"
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

      {/* Builders grid */}
      {isLoading ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          data-ocid="builders.loading_state"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={`skel-${i + 1}`} className="h-44 rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sorted.map((m, idx) => (
            <BuilderCard
              key={m.id}
              manifest={m}
              stats={statsMap.get(m.id) ?? null}
              index={idx + 1}
            />
          ))}
        </div>
      )}

      {/* Footer law */}
      <div
        className="glass-sm rounded-2xl px-5 py-4 flex items-center gap-3"
        style={{ borderColor: "rgba(255,185,0,0.15)" }}
      >
        <Shield
          className="w-4 h-4 shrink-0"
          style={{ color: "oklch(0.75 0.16 70)" }}
        />
        <p className="text-xs font-mono text-muted-foreground">
          <span style={{ color: "oklch(0.75 0.16 70)" }}>LEX_RGST</span> ·
          Silver Builders are registered with 4-letter lock names. Identity is
          permanent. Names are sealed at first registration.
        </p>
      </div>
    </div>
  );
}
