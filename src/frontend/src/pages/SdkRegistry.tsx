import type { SdkEntry } from "@/backend";
import { Skeleton } from "@/components/ui/skeleton";
import { STATIC_SDK_ENTRIES, useSdkEntries } from "@/hooks/use-sdk";
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Code2,
  Zap,
} from "lucide-react";
import { useState } from "react";

// ─── Language bridges (static sovereign data) ──────────────────────────────────
const BRIDGES = [
  {
    id: "PONT",
    from: "ICPM",
    to: "JLIA",
    dir: "Bidirectional",
    desc: "Master Math Bridge — ICPM↔JLIA. PHI/Fibonacci computation hand-off.",
  },
  {
    id: "MRDM",
    from: "ICPM",
    to: "EMRT",
    dir: "Bidirectional",
    desc: "Memory Bridge — state ops to EMRT memory zones. Append-only on EMRT side.",
  },
  {
    id: "AXON",
    from: "EART",
    to: "ICPM",
    dir: "Unidirectional",
    desc: "Autonomous Output — EART engines inject into ICPM pipeline. Fire and deliver.",
  },
  {
    id: "CRUX",
    from: "JLIA",
    to: "EMRT",
    dir: "Unidirectional",
    desc: "Floor Write — FLOR-computed values written directly to EMRT zones.",
  },
  {
    id: "NXUS",
    from: "ALL",
    to: "RGST",
    dir: "Write-only relay",
    desc: "Stats Relay — every substrate reports live stats to Registry. Read-only back.",
  },
];

const CATEGORY_COLORS: Record<
  string,
  { border: string; chip: string; text: string }
> = {
  teaching: {
    border: "rgba(0,210,255,0.22)",
    chip: "rgba(0,210,255,0.08)",
    text: "oklch(0.78 0.22 200)",
  },
  interaction: {
    border: "rgba(160,100,255,0.22)",
    chip: "rgba(160,100,255,0.08)",
    text: "oklch(0.68 0.18 280)",
  },
  passport: {
    border: "rgba(255,185,0,0.22)",
    chip: "rgba(255,185,0,0.08)",
    text: "oklch(0.75 0.16 70)",
  },
  registry: {
    border: "rgba(0,220,130,0.22)",
    chip: "rgba(0,220,130,0.08)",
    text: "oklch(0.72 0.17 155)",
  },
  collegium: {
    border: "rgba(220,100,100,0.22)",
    chip: "rgba(220,100,100,0.08)",
    text: "oklch(0.65 0.18 22)",
  },
  curriculum: {
    border: "rgba(0,210,255,0.22)",
    chip: "rgba(0,210,255,0.08)",
    text: "oklch(0.78 0.22 200)",
  },
};
const DEFAULT_COLORS = {
  border: "rgba(120,120,150,0.2)",
  chip: "rgba(120,120,150,0.06)",
  text: "oklch(0.55 0.01 260)",
};
function catStyle(cat: string) {
  return CATEGORY_COLORS[cat.toLowerCase()] ?? DEFAULT_COLORS;
}

// ─── SDK endpoint accordion row ───────────────────────────────────────────────
function SdkRow({ entry, index }: { entry: SdkEntry; index: number }) {
  const [open, setOpen] = useState(false);
  const cs = catStyle(entry.category);
  return (
    <div
      data-ocid={`sdk_registry.sdk_card.${index + 1}`}
      className="glass-sm rounded-2xl overflow-hidden transition-glass"
      style={{ borderColor: cs.border }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left touch-target"
        data-ocid={`sdk_registry.sdk_toggle.${index + 1}`}
      >
        <span
          className="font-mono text-xs font-bold tracking-wider shrink-0 px-2 py-0.5 rounded-lg"
          style={{
            background: cs.chip,
            color: cs.text,
            border: `1px solid ${cs.border}`,
          }}
        >
          {entry.accessProtocol}
        </span>
        <span className="flex-1 min-w-0 font-display font-semibold text-sm text-foreground truncate">
          {entry.name}
        </span>
        <span className="hidden sm:block text-[10px] font-mono text-muted-foreground shrink-0">
          {entry.entryPoints.length} endpoints
        </span>
        <span
          className="text-[10px] font-mono shrink-0"
          style={{ color: cs.text }}
        >
          v{entry.version}
        </span>
        {open ? (
          <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
        ) : (
          <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
        )}
      </button>
      {open && (
        <div
          className="px-5 pb-5 space-y-4"
          data-ocid={`sdk_registry.sdk_detail.${index + 1}`}
        >
          <p className="text-xs text-muted-foreground leading-relaxed">
            {entry.description}
          </p>
          <div className="space-y-2">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
              Entry Points
            </p>
            <div className="flex flex-wrap gap-2">
              {entry.entryPoints.map((ep) => (
                <code
                  key={ep}
                  className="text-xs font-mono px-2.5 py-1 rounded-lg"
                  style={{
                    background: cs.chip,
                    color: cs.text,
                    border: `1px solid ${cs.border}`,
                  }}
                >
                  {ep}
                </code>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-muted-foreground">Status:</span>
            <span className="text-[10px] font-mono" style={{ color: cs.text }}>
              {entry.status}
            </span>
            <span className="text-[10px] text-muted-foreground ml-auto">
              Category: {entry.category}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Bridge card ────────────────────────────────────────────────────────────────
function BridgeCard({
  bridge,
  index,
}: { bridge: (typeof BRIDGES)[0]; index: number }) {
  const isBi = bridge.dir === "Bidirectional";
  return (
    <div
      data-ocid={`sdk_registry.bridge_card.${index + 1}`}
      className="glass-sm rounded-2xl p-5 space-y-3 transition-glass glass-shimmer"
      style={{
        borderColor: "rgba(0,220,130,0.2)",
        boxShadow: "0 4px 24px rgba(0,220,130,0.06)",
      }}
    >
      <div className="flex items-center gap-3">
        <span
          className="font-mono text-sm font-black tracking-widest px-3 py-1 rounded-lg"
          style={{
            background: "rgba(0,220,130,0.08)",
            color: "oklch(0.72 0.17 155)",
            border: "1px solid rgba(0,220,130,0.2)",
          }}
        >
          {bridge.id}
        </span>
        <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
          <span style={{ color: "oklch(0.78 0.22 200)" }}>{bridge.from}</span>
          {isBi ? (
            <span style={{ color: "oklch(0.55 0.01 260)" }}>&#x21C4;</span>
          ) : (
            <ArrowRight
              className="w-3 h-3"
              style={{ color: "oklch(0.55 0.01 260)" }}
            />
          )}
          <span style={{ color: "oklch(0.72 0.17 155)" }}>{bridge.to}</span>
        </div>
        <span
          className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded-md"
          style={{
            background: isBi ? "rgba(0,210,255,0.06)" : "rgba(255,185,0,0.06)",
            color: isBi ? "oklch(0.78 0.22 200)" : "oklch(0.75 0.16 70)",
            border: `1px solid ${isBi ? "rgba(0,210,255,0.2)" : "rgba(255,185,0,0.2)"}`,
          }}
        >
          {bridge.dir}
        </span>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">
        {bridge.desc}
      </p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function SdkRegistry() {
  const { entries, isLoading } = useSdkEntries();
  const [tab, setTab] = useState<"endpoints" | "bridges">("endpoints");
  const displayEntries = entries.length > 0 ? entries : STATIC_SDK_ENTRIES;

  return (
    <div
      className="max-w-4xl mx-auto px-4 py-10 space-y-8"
      data-ocid="sdk_registry.page"
    >
      {/* OS Header */}
      <div className="glass-xl rounded-3xl p-8 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 80% -10%, rgba(160,100,255,0.12) 0%, transparent 70%)",
          }}
        />
        <div className="relative">
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "rgba(160,100,255,0.12)",
                border: "1px solid rgba(160,100,255,0.25)",
              }}
            >
              <Code2
                className="w-5 h-5"
                style={{ color: "oklch(0.68 0.18 280)" }}
              />
            </div>
            <div>
              <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                EduAI · SDKR
              </span>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-display font-black tracking-tight text-foreground">
                  SDK REGISTRY
                </h1>
                <span
                  className="text-xs font-mono px-2 py-0.5 rounded"
                  style={{
                    background: "rgba(160,100,255,0.1)",
                    color: "oklch(0.68 0.18 280)",
                    border: "1px solid rgba(160,100,255,0.2)",
                  }}
                >
                  SOVEREIGN
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                label: "SDK Modules",
                value: displayEntries.length,
                color: "oklch(0.68 0.18 280)",
              },
              {
                label: "Bridges",
                value: BRIDGES.length,
                color: "oklch(0.72 0.17 155)",
              },
              {
                label: "Status",
                value: "Active",
                color: "oklch(0.72 0.17 155)",
              },
              { label: "Access", value: "Free", color: "oklch(0.75 0.16 70)" },
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

      {/* Glass tab bar */}
      <div
        className="glass-sm rounded-2xl p-1.5 flex gap-1.5"
        style={{ borderColor: "rgba(160,100,255,0.15)" }}
        role="tablist"
        aria-label="SDK sections"
        data-ocid="sdk_registry.filter_tabs"
      >
        {(["endpoints", "bridges"] as const).map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            data-ocid={`sdk_registry.filter.${t}_tab`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-glass touch-target"
            style={
              tab === t
                ? {
                    background: "rgba(160,100,255,0.15)",
                    color: "oklch(0.68 0.18 280)",
                    border: "1px solid rgba(160,100,255,0.25)",
                  }
                : {
                    background: "transparent",
                    color: "oklch(0.55 0.01 260)",
                    border: "1px solid transparent",
                  }
            }
          >
            {t === "endpoints" ? (
              <Zap className="w-3.5 h-3.5" />
            ) : (
              <ArrowRight className="w-3.5 h-3.5" />
            )}
            {t === "endpoints" ? "API Endpoints" : "Language Bridges"}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === "endpoints" && (
        <div className="space-y-3" data-ocid="sdk_registry.entries_section">
          {isLoading && entries.length === 0
            ? Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={`skel-${i + 1}`} className="h-16 rounded-2xl" />
              ))
            : displayEntries.map((entry, idx) => (
                <SdkRow key={entry.id} entry={entry} index={idx} />
              ))}
        </div>
      )}

      {tab === "bridges" && (
        <div className="space-y-3" data-ocid="sdk_registry.bridges_section">
          {BRIDGES.map((bridge, idx) => (
            <BridgeCard key={bridge.id} bridge={bridge} index={idx} />
          ))}
        </div>
      )}

      {/* Footer */}
      <div
        className="glass-sm rounded-2xl px-5 py-4 flex items-center gap-3"
        style={{ borderColor: "rgba(160,100,255,0.15)" }}
      >
        <Code2
          className="w-4 h-4 shrink-0"
          style={{ color: "oklch(0.68 0.18 280)" }}
        />
        <p className="text-xs font-mono text-muted-foreground">
          <span style={{ color: "oklch(0.68 0.18 280)" }}>LEX_PONT</span> · All
          bridges sovereign and native. No bridge calls a commercial runtime.
        </p>
      </div>
    </div>
  );
}
