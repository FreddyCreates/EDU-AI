import type { SovereignLaw } from "@/backend";
import { useLaws } from "@/hooks/use-laws";
import { ChevronDown, ChevronRight, Lock, Shield } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

function LawRow({ law, index }: { law: SovereignLaw; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      data-ocid={`law_registry.law_card.${index + 1}`}
      className="glass-sm rounded-2xl overflow-hidden transition-glass"
      style={{ borderLeft: "4px solid oklch(0.72 0.17 155)" }}
    >
      <button
        type="button"
        onClick={() => setExpanded((o) => !o)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left touch-target hover:bg-white/[0.03] transition-smooth"
        data-ocid={`law_registry.law_toggle.${index + 1}`}
      >
        {/* Code chip */}
        <span
          className="font-mono text-xs font-black tracking-widest shrink-0 px-2 py-0.5 rounded-lg"
          style={{
            background: "rgba(0,220,130,0.10)",
            color: "oklch(0.72 0.17 155)",
            border: "1px solid rgba(0,220,130,0.22)",
          }}
        >
          {law.latinName}
        </span>

        {/* Sealed badge */}
        <span
          className="hidden sm:flex items-center gap-1 text-[10px] font-mono shrink-0"
          style={{ color: "oklch(0.72 0.17 155)" }}
        >
          <Lock className="w-3 h-3" />
          SEALED
        </span>

        {/* Name */}
        <span className="flex-1 min-w-0 font-display font-semibold text-sm text-foreground truncate">
          {law.englishName}
        </span>

        {/* Domain */}
        <span
          className="hidden md:block text-[10px] font-mono text-muted-foreground shrink-0 px-2 py-0.5 rounded-md"
          style={{
            background: "rgba(0,220,130,0.06)",
            border: "1px solid rgba(0,220,130,0.12)",
          }}
        >
          {law.domain}
        </span>

        {expanded ? (
          <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
        ) : (
          <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
        )}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div
              className="px-5 pb-5 pt-1 space-y-3"
              data-ocid={`law_registry.law_text.${index + 1}`}
            >
              <div
                className="glass rounded-xl p-4"
                style={{ borderColor: "rgba(0,220,130,0.12)" }}
              >
                <p className="font-mono text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed">
                  {law.description}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] text-muted-foreground">
                  Attribution:
                </span>
                <span
                  className="text-[10px] font-mono font-semibold"
                  style={{ color: "oklch(0.72 0.17 155)" }}
                >
                  {law.attribution}
                </span>
                <span className="text-[10px] text-muted-foreground ml-auto">
                  Domain:{" "}
                  <span style={{ color: "oklch(0.72 0.17 155)" }}>
                    {law.domain}
                  </span>
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function LawRegistry() {
  const { laws, isLoading } = useLaws();

  return (
    <div
      className="max-w-4xl mx-auto px-4 py-10 space-y-8"
      data-ocid="law_registry.page"
    >
      {/* OS Header */}
      <div className="glass-xl rounded-3xl p-8 relative overflow-hidden glass-shimmer">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 80% -10%, rgba(0,220,130,0.14) 0%, transparent 70%)",
          }}
        />
        <div className="relative">
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "rgba(0,220,130,0.12)",
                border: "1px solid rgba(0,220,130,0.28)",
                boxShadow: "0 0 20px rgba(0,220,130,0.18)",
              }}
            >
              <Lock
                className="w-5 h-5"
                style={{ color: "oklch(0.72 0.17 155)" }}
              />
            </div>
            <div>
              <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                EduAI · PROT
              </span>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-display font-black tracking-tight text-foreground">
                  PROTOCOL REGISTRY · LEX
                </h1>
                <Lock
                  className="w-4 h-4 shrink-0"
                  style={{ color: "oklch(0.72 0.17 155)" }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                label: "Total Laws",
                value: laws.length,
                color: "oklch(0.72 0.17 155)",
              },
              {
                label: "Sealed",
                value: laws.length,
                color: "oklch(0.72 0.17 155)",
              },
              {
                label: "Authority",
                value: "On-Chain",
                color: "oklch(0.68 0.18 280)",
              },
              {
                label: "Status",
                value: "Immutable",
                color: "oklch(0.75 0.16 70)",
              },
            ].map(({ label, value, color }) => (
              <div
                key={label}
                className="glass rounded-xl px-3 py-2.5 text-center"
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

      {/* Protocol identity bar */}
      <div className="flex items-center gap-3" aria-hidden="true">
        <div
          className="h-px flex-1"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0,220,130,0.3))",
          }}
        />
        <span
          className="font-mono text-[10px] tracking-[0.3em] uppercase"
          style={{ color: "oklch(0.72 0.17 155)" }}
        >
          CODEX · LEGUM · SOVEREIGN
        </span>
        <div
          className="h-px flex-1"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,220,130,0.3), transparent)",
          }}
        />
      </div>

      {/* Laws list */}
      {isLoading && laws.length === 0 ? (
        <div className="space-y-3" data-ocid="law_registry.loading_state">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`skel-${i + 1}`}
              className="glass-sm rounded-2xl h-16 relative overflow-hidden"
              style={{ borderLeft: "4px solid rgba(0,220,130,0.3)" }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(0,220,130,0.06), transparent)",
                  animation: "glass-shimmer 1.8s ease-in-out infinite",
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3" data-ocid="law_registry.laws_section">
          {laws.map((law, idx) => (
            <LawRow key={String(law.id)} law={law} index={idx} />
          ))}
        </div>
      )}

      {/* Doctrine footer */}
      <div
        className="glass-sm rounded-2xl px-5 py-4 flex items-center gap-3"
        style={{ borderColor: "rgba(0,220,130,0.15)" }}
      >
        <Shield
          className="w-4 h-4 shrink-0"
          style={{ color: "oklch(0.72 0.17 155)" }}
        />
        <p className="text-xs font-mono text-muted-foreground">
          <span style={{ color: "oklch(0.72 0.17 155)" }}>LEX_OMNIS</span> ·
          Every law is a living doctrine. Every doctrine is a seed. Every seed
          compounds into sovereign intelligence.
        </p>
      </div>
    </div>
  );
}
