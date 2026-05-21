import type { ArchCouncilVoice, MLTVResponse } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useEngines } from "@/hooks/use-engines";
import {
  useFireArchCouncil,
  useMLTVStats,
  useRecentMLTVResponses,
} from "@/hooks/use-mltv";
import { cn } from "@/lib/utils";
import { Brain, FlaskConical, Sparkles, Star, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const DOMAINS = [
  "Mathematics",
  "Science",
  "Language Arts",
  "History",
  "Logic",
  "Architecture",
];

const COUNCIL_IDS = ["COGT", "META", "AUTN"];

const VOICE_META: Record<
  string,
  {
    label: string;
    icon: React.ElementType;
    glowColor: string;
    textColor: string;
  }
> = {
  COGT: {
    label: "Cognition",
    icon: Brain,
    glowColor: "rgba(245, 155, 0, 0.20)",
    textColor: "oklch(0.76 0.18 84)",
  },
  META: {
    label: "Meta-Think",
    icon: FlaskConical,
    glowColor: "rgba(245, 155, 0, 0.15)",
    textColor: "oklch(0.72 0.16 90)",
  },
  AUTN: {
    label: "Autonomous",
    icon: Zap,
    glowColor: "rgba(245, 155, 0, 0.12)",
    textColor: "oklch(0.80 0.14 78)",
  },
};

const AMBER = "oklch(0.76 0.18 84)";
const AMBER_GLOW = "rgba(245, 155, 0, 0.18)";
const AMBER_BORDER = "rgba(245, 155, 0, 0.25)";

function EngineCouncilCard({
  codeName,
  fullName,
  domain,
  mathFoundation,
  lessonsAvailable,
}: {
  codeName: string;
  fullName: string;
  domain: string;
  mathFoundation: string;
  lessonsAvailable: string[];
}) {
  const meta = VOICE_META[codeName];
  return (
    <div
      className="glass-xl rounded-2xl p-6 relative overflow-hidden flex-1 min-w-0"
      style={{
        border: `1px solid ${AMBER_BORDER}`,
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(245,155,0,0.08), inset 0 1px 0 rgba(245,155,0,0.06)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${meta?.glowColor ?? AMBER_GLOW} 0%, transparent 70%)`,
        }}
      />
      <div className="relative">
        {/* Code badge */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className="font-mono text-3xl font-black tracking-widest"
            style={{ color: AMBER }}
          >
            {codeName}
          </span>
          <span
            className="text-[10px] font-mono px-2 py-0.5 rounded-lg ml-auto"
            style={{
              background: "rgba(0,255,100,0.10)",
              color: "oklch(0.72 0.17 155)",
              border: "1px solid rgba(0,255,100,0.18)",
            }}
          >
            ● ACTIVE
          </span>
        </div>

        <p className="font-display font-semibold text-sm text-foreground mb-1">
          {fullName}
        </p>

        {/* Domain badge */}
        <span
          className="inline-block text-[10px] font-mono px-2 py-0.5 rounded-lg mb-3"
          style={{
            background: "rgba(245,155,0,0.08)",
            color: AMBER,
            border: `1px solid ${AMBER_BORDER}`,
          }}
        >
          {domain}
        </span>

        <p className="text-xs text-muted-foreground font-mono leading-relaxed mb-3">
          {mathFoundation}
        </p>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground">Lessons:</span>
          <span
            className="text-sm font-display font-bold"
            style={{ color: AMBER }}
          >
            {lessonsAvailable.length}
          </span>
        </div>
      </div>
    </div>
  );
}

function VoiceCard({
  voice,
  isNovel,
  pathLabel,
  isSelected,
}: {
  voice: ArchCouncilVoice;
  isNovel?: boolean;
  pathLabel?: string;
  isSelected?: boolean;
}) {
  const meta = isNovel ? null : VOICE_META[voice.engine];
  const confidence = Number(voice.confidence);
  return (
    <div
      className="glass rounded-xl p-4 relative overflow-hidden transition-all duration-200"
      style={{
        borderLeft: `3px solid ${isNovel ? AMBER : (meta?.textColor ?? AMBER)}`,
        borderColor: isSelected ? AMBER : isNovel ? AMBER_BORDER : undefined,
        boxShadow: isSelected ? `0 0 16px ${AMBER_GLOW}` : undefined,
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        {isNovel ? (
          <Star className="h-4 w-4" style={{ color: AMBER }} />
        ) : (
          meta && <meta.icon className="h-4 w-4 text-muted-foreground" />
        )}
        <span
          className="text-xs font-bold uppercase tracking-widest"
          style={{
            color: isNovel ? AMBER : (meta?.textColor ?? "oklch(0.76 0.18 84)"),
          }}
        >
          {isNovel
            ? "★ EMERGENT VOICE"
            : `${voice.engine} · ${meta?.label ?? ""}`}
        </span>
        {/* Path label badge */}
        {pathLabel && (
          <span
            className="ml-auto text-[9px] font-mono px-2 py-0.5 rounded font-bold"
            style={{
              background: pathLabel.includes("Novel")
                ? "rgba(245,155,0,0.18)"
                : "rgba(245,155,0,0.08)",
              color: AMBER,
              border: `1px solid ${AMBER_BORDER}`,
            }}
          >
            {pathLabel.includes("Novel") ? "★ " : ""}
            {pathLabel}
          </span>
        )}
        {!pathLabel && (
          <span
            className="ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded"
            style={{
              background:
                confidence >= 55
                  ? "rgba(245,155,0,0.12)"
                  : "rgba(255,255,255,0.05)",
              color: confidence >= 55 ? AMBER : "oklch(0.55 0.01 260)",
              border:
                confidence >= 55
                  ? `1px solid ${AMBER_BORDER}`
                  : "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {confidence}
          </span>
        )}
      </div>
      <p className="text-sm text-foreground leading-relaxed">{voice.answer}</p>
      {voice.mathBasis && (
        <p className="text-[11px] text-muted-foreground mt-2 font-mono">
          ∿ {voice.mathBasis}
        </p>
      )}
      {isSelected && (
        <div
          className="absolute top-2 right-2 text-[8px] font-mono px-1.5 py-0.5 rounded font-bold"
          style={{
            background: "rgba(245,155,0,0.20)",
            color: AMBER,
            border: `1px solid ${AMBER_BORDER}`,
          }}
        >
          SELECTED
        </div>
      )}
    </div>
  );
}

function ResponseCard({ response }: { response: MLTVResponse }) {
  const ts = new Date(Number(response.timestamp) / 1_000_000);
  const paths = [
    { label: "Path A", voice: response.voices[0] },
    { label: "Path B", voice: response.voices[1] },
    { label: "Path C (Novel)", voice: response.novelVoice, isNovel: true },
  ].filter((p) => p.voice !== undefined);

  // Remaining standard voices beyond the first 2
  const extraVoices = response.voices.slice(2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="glass-xl rounded-2xl p-6 space-y-4 relative overflow-hidden"
      style={{ border: `1px solid ${AMBER_BORDER}` }}
      data-ocid="arch_council.response_card"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(245,155,0,0.08) 0%, transparent 70%)",
        }}
      />
      <div className="relative">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-sm font-semibold text-foreground line-clamp-1 flex-1">
            {response.queryId}
          </span>
          <span
            className="text-[10px] font-mono px-2 py-0.5 rounded-lg"
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "oklch(0.55 0.01 260)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {ts.toLocaleTimeString()}
          </span>
          <span
            className="text-[10px] font-mono px-2 py-0.5 rounded-lg"
            style={{
              background: "rgba(245,155,0,0.12)",
              color: AMBER,
              border: `1px solid ${AMBER_BORDER}`,
            }}
          >
            COH {String(response.totalCoherence)}
          </span>
          {/* Multi-path indicator */}
          <span
            className="text-[9px] font-mono px-2 py-0.5 rounded-lg font-bold"
            style={{
              background: "rgba(245,155,0,0.08)",
              color: AMBER,
              border: `1px solid ${AMBER_BORDER}`,
            }}
          >
            {paths.length} paths · 1 novel
          </span>
        </div>

        {/* Path A / B / C(Novel) grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {paths.map((p, i) => (
            <VoiceCard
              key={p.label}
              voice={p.voice as ArchCouncilVoice}
              isNovel={p.isNovel}
              pathLabel={p.label}
              isSelected={i === 0}
            />
          ))}
        </div>

        {/* Extra voices if any */}
        {extraVoices.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            {extraVoices.map((v) => (
              <VoiceCard key={v.voiceId} voice={v} />
            ))}
          </div>
        )}

        <p className="text-[11px] text-muted-foreground text-right mt-3">
          fib-floored at F({String(response.fibFlooredAt)})
        </p>
      </div>
    </motion.div>
  );
}

function AccordionRecentRow({ response }: { response: MLTVResponse }) {
  const [open, setOpen] = useState(false);
  const ts = new Date(Number(response.timestamp) / 1_000_000);
  return (
    <div
      className="glass-sm rounded-xl overflow-hidden"
      data-ocid="arch_council.recent_row"
    >
      <button
        type="button"
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/[0.03] transition-smooth text-left touch-target"
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
      >
        <span className="text-xs font-mono text-muted-foreground w-28 shrink-0 truncate">
          {response.queryId}
        </span>
        <span
          className="text-[10px] font-mono px-1.5 py-0.5 rounded shrink-0"
          style={{
            background: "rgba(255,255,255,0.06)",
            color: "oklch(0.55 0.01 260)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {response.voices[0]?.engine ?? "—"}
        </span>
        <span className="flex-1" />
        <span
          className="text-[10px] font-mono px-2 py-0.5 rounded-lg shrink-0"
          style={{
            background: "rgba(245,155,0,0.12)",
            color: AMBER,
            border: `1px solid ${AMBER_BORDER}`,
          }}
        >
          COH {String(response.totalCoherence)}
        </span>
        <span className="text-[10px] text-muted-foreground shrink-0">
          {ts.toLocaleTimeString()}
        </span>
        <span className="text-muted-foreground text-xs">
          {open ? "▲" : "▼"}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {response.voices.map((v) => (
                <VoiceCard key={v.voiceId} voice={v} />
              ))}
              <VoiceCard voice={response.novelVoice} isNovel />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ArchCouncilMonitor() {
  const [queryText, setQueryText] = useState("");
  const [domain, setDomain] = useState("Mathematics");
  const [liveResponse, setLiveResponse] = useState<MLTVResponse | null>(null);

  const { data: mltvStats, isLoading: statsLoading } = useMLTVStats();
  const { data: recentResponses } = useRecentMLTVResponses();
  const fireMutation = useFireArchCouncil();
  const { engines } = useEngines();

  const councilEngines = (engines ?? []).filter((e) =>
    COUNCIL_IDS.includes(e.codeName),
  );
  const totalEngines = engines?.length ?? 0;

  async function handleFire() {
    if (!queryText.trim()) return;
    const res = await fireMutation.mutateAsync({ queryText, domain });
    setLiveResponse(res);
    setQueryText("");
  }

  return (
    <div
      className="mx-auto max-w-7xl px-4 sm:px-6 py-8 space-y-8"
      data-ocid="arch_council.page"
    >
      {/* OS Header */}
      <div
        className="glass-xl rounded-3xl p-8 relative overflow-hidden glass-shimmer"
        style={{ border: `1px solid ${AMBER_BORDER}` }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 80% -10%, rgba(245,155,0,0.14) 0%, transparent 70%)",
          }}
        />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
              EduAI · COGT · META · AUTN
            </span>
            <h1
              className="text-3xl font-display font-black tracking-tight"
              style={{
                color: AMBER,
                textShadow: `0 0 32px ${AMBER_GLOW}`,
              }}
            >
              ARCH COUNCIL
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              Sovereign Intelligence · Live Session Monitor
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="font-mono text-[10px] px-3 py-1.5 rounded-xl"
              style={{
                background: "rgba(245,155,0,0.10)",
                color: AMBER,
                border: `1px solid ${AMBER_BORDER}`,
                boxShadow: `0 0 16px ${AMBER_GLOW}`,
              }}
              data-ocid="arch_council.lex_badge"
            >
              <Sparkles className="h-3 w-3 inline mr-1.5" />
              LEX_MULTIVOX ACTIVE
            </span>
          </div>
        </div>
      </div>

      {/* Council Engine Cards */}
      <div>
        <p className="text-[10px] font-mono tracking-[0.25em] text-muted-foreground uppercase mb-3">
          Council Members
        </p>
        {councilEngines.length > 0 ? (
          <div
            className="flex gap-4 flex-wrap"
            data-ocid="arch_council.council_engines"
          >
            {councilEngines.map((eng) => (
              <EngineCouncilCard
                key={eng.codeName}
                codeName={eng.codeName}
                fullName={eng.fullName}
                domain={eng.domain}
                mathFoundation={eng.mathFoundation}
                lessonsAvailable={eng.lessonsAvailable}
              />
            ))}
          </div>
        ) : (
          <div className="flex gap-4">
            {COUNCIL_IDS.map((id) => (
              <div
                key={id}
                className="glass-xl rounded-2xl h-44 flex-1"
                style={{ border: `1px solid ${AMBER_BORDER}` }}
              >
                <div className="h-full relative overflow-hidden rounded-2xl">
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(245,155,0,0.05), transparent)",
                      animation: "glass-shimmer 1.8s ease-in-out infinite",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Multi-Voice Law Banner — Prominent */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        data-ocid="arch_council.multivox_banner"
        className="glass-xl rounded-2xl relative overflow-hidden"
        style={{
          border: `2px solid ${AMBER_BORDER}`,
          boxShadow: `0 0 32px ${AMBER_GLOW}, inset 0 1px 0 rgba(245,155,0,0.10)`,
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(245,155,0,0.10) 0%, transparent 50%, rgba(245,155,0,0.04) 100%)",
          }}
        />
        <div className="relative px-6 py-5">
          <div className="flex items-start gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: "rgba(245,155,0,0.15)",
                border: `1px solid ${AMBER_BORDER}`,
                boxShadow: `0 0 16px ${AMBER_GLOW}`,
              }}
            >
              <Sparkles className="h-5 w-5" style={{ color: AMBER }} />
            </div>
            <div className="flex-1">
              <p
                className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] mb-1"
                style={{ color: AMBER }}
              >
                LEX_MULTIVOX · Architecture Council Law
              </p>
              <p
                className="font-display text-base font-bold"
                style={{ color: AMBER, textShadow: `0 0 20px ${AMBER_GLOW}` }}
              >
                The architecture council always returns multiple answers plus a
                novel one — never a single path.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {["Path A", "Path B", "Path C (Novel)"].map((label, i) => (
                  <span
                    key={label}
                    className="text-[10px] font-mono px-2.5 py-1 rounded-lg"
                    style={{
                      background:
                        i === 2
                          ? "rgba(245,155,0,0.18)"
                          : "rgba(245,155,0,0.08)",
                      color: i === 2 ? AMBER : "oklch(0.72 0.14 84)",
                      border: `1px solid ${
                        i === 2 ? AMBER_BORDER : "rgba(245,155,0,0.12)"
                      }`,
                    }}
                  >
                    {i === 2 ? "★ " : ""}
                    {label}
                  </span>
                ))}
                <span
                  className="text-[10px] font-mono px-2.5 py-1 rounded-lg text-muted-foreground"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  COGT · META · AUTN deliberate in sequence
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stat Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsLoading
          ? ["sk-1", "sk-2", "sk-3", "sk-4"].map((k) => (
              <div key={k} className="glass-sm rounded-xl h-24" />
            ))
          : [
              {
                label: "Total Queries",
                value: String(mltvStats?.totalQueries ?? 0),
                ocid: "arch_council.stat.total_queries",
              },
              {
                label: "Voices Generated",
                value: String(mltvStats?.totalVoices ?? 0),
                ocid: "arch_council.stat.total_voices",
              },
              {
                label: "Novel Answers",
                value: String(mltvStats?.novelAnswersGenerated ?? 0),
                ocid: "arch_council.stat.novel_answers",
              },
              {
                label: "Total Engines",
                value: String(totalEngines),
                ocid: "arch_council.stat.total_engines",
              },
            ].map(({ label, value, ocid }) => (
              <div
                key={label}
                data-ocid={ocid}
                className="glass rounded-xl px-4 py-5 text-center relative overflow-hidden"
                style={{ border: `1px solid ${AMBER_BORDER}` }}
              >
                <p
                  className="text-2xl font-black font-display"
                  style={{ color: AMBER }}
                >
                  {value}
                </p>
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mt-1">
                  {label}
                </p>
              </div>
            ))}
        {/* Council Status tile */}
        <div
          className="glass rounded-xl px-4 py-5 text-center"
          style={{ border: `1px solid ${AMBER_BORDER}` }}
          data-ocid="arch_council.stat.council_status"
        >
          <span
            className="inline-block text-sm font-mono font-bold px-3 py-1 rounded-xl mb-1"
            style={{
              background: "rgba(245,155,0,0.12)",
              color: AMBER,
              border: `1px solid ${AMBER_BORDER}`,
              boxShadow: `0 0 16px ${AMBER_GLOW}`,
            }}
          >
            SOVEREIGN
          </span>
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
            Council Status
          </p>
        </div>
      </div>

      {/* Query Panel */}
      <div
        className="glass-xl rounded-2xl p-6 space-y-4"
        style={{ border: `1px solid ${AMBER_BORDER}` }}
        data-ocid="arch_council.query_panel"
      >
        <p className="text-xs font-mono tracking-widest text-muted-foreground uppercase">
          Ask the Council
        </p>
        <Textarea
          data-ocid="arch_council.query_input"
          placeholder="Enter a question, topic, or decision to analyze..."
          value={queryText}
          onChange={(e) => setQueryText(e.target.value)}
          rows={3}
          className="resize-none glass border-0"
          style={{ borderColor: AMBER_BORDER }}
        />
        <div className="flex items-center gap-3">
          <select
            data-ocid="arch_council.domain_select"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="flex-1 rounded-xl border px-3 py-2 text-sm text-foreground focus:outline-none"
            style={{
              background: "rgba(12,14,28,0.80)",
              borderColor: AMBER_BORDER,
              backdropFilter: "blur(12px)",
            }}
          >
            {DOMAINS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <Button
            data-ocid="arch_council.fire_button"
            type="button"
            onClick={handleFire}
            disabled={fireMutation.isPending || !queryText.trim()}
            className="gap-2 font-mono"
            style={{
              background: fireMutation.isPending
                ? "rgba(245,155,0,0.15)"
                : "rgba(245,155,0,0.20)",
              color: AMBER,
              border: `1px solid ${AMBER_BORDER}`,
              boxShadow: `0 0 20px ${AMBER_GLOW}`,
            }}
          >
            {fireMutation.isPending ? (
              <>
                <span className="animate-pulse">●</span> Deliberating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" /> Fire Council
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Live Response */}
      <AnimatePresence>
        {liveResponse && (
          <div data-ocid="arch_council.live_response">
            <p
              className="text-xs font-mono font-bold uppercase tracking-widest mb-3"
              style={{ color: AMBER }}
            >
              ★ Live Council Response
            </p>
            <ResponseCard response={liveResponse} />
          </div>
        )}
      </AnimatePresence>

      {/* Recent Responses Accordion */}
      {recentResponses && recentResponses.length > 0 && (
        <div data-ocid="arch_council.recent_section">
          <p className="text-xs font-mono tracking-widest text-muted-foreground uppercase mb-3">
            Recent Council Sessions
          </p>
          <div className="space-y-2">
            {recentResponses.map((r) => (
              <AccordionRecentRow key={r.queryId} response={r} />
            ))}
          </div>
        </div>
      )}

      {(!recentResponses || recentResponses.length === 0) && !liveResponse && (
        <div
          data-ocid="arch_council.empty_state"
          className="glass-sm rounded-2xl flex flex-col items-center justify-center py-20 text-center"
          style={{ border: `1px solid ${AMBER_BORDER}` }}
        >
          <Brain className="h-12 w-12 mb-4" style={{ color: AMBER_GLOW }} />
          <p className="text-muted-foreground text-sm">
            No council sessions yet. Fire the council to begin.
          </p>
        </div>
      )}
    </div>
  );
}
