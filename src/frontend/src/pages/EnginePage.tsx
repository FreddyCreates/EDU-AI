import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  useEngineQuery,
  useEngineQueryWithPassport,
} from "@/hooks/use-engine-interact";
import { EngineStatus } from "@/hooks/use-engines";
import { STATIC_ENGINES } from "@/hooks/use-engines";
import { useAutoSeal } from "@/hooks/use-passport";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, BookMarked, CheckCircle, Send, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type SubKey = "ICPM" | "JLIA" | "EART" | "EMRT";

function substrateOf(id: number): SubKey {
  if ([1, 2, 3, 4, 5].includes(id)) return "ICPM";
  if ([6, 7].includes(id)) return "JLIA";
  if ([8, 9].includes(id)) return "EART";
  return "EMRT";
}

const SUB_STYLE: Record<
  SubKey,
  {
    label: string;
    accent: string;
    glow: string;
    border: string;
    chipBg: string;
  }
> = {
  ICPM: {
    label: "ICP / Motoko",
    accent: "oklch(0.78 0.22 200)",
    glow: "rgba(0,210,255,0.18)",
    border: "rgba(0,210,255,0.25)",
    chipBg: "rgba(0,210,255,0.07)",
  },
  JLIA: {
    label: "Julia Runtime",
    accent: "oklch(0.68 0.18 280)",
    glow: "rgba(160,100,255,0.18)",
    border: "rgba(160,100,255,0.25)",
    chipBg: "rgba(160,100,255,0.07)",
  },
  EART: {
    label: "Autonomous Runtime",
    accent: "oklch(0.75 0.16 70)",
    glow: "rgba(255,185,0,0.18)",
    border: "rgba(255,185,0,0.25)",
    chipBg: "rgba(255,185,0,0.07)",
  },
  EMRT: {
    label: "Memory Runtime",
    accent: "oklch(0.72 0.17 155)",
    glow: "rgba(0,220,130,0.18)",
    border: "rgba(0,220,130,0.25)",
    chipBg: "rgba(0,220,130,0.07)",
  },
};

function CohRing({
  value,
  accentColor,
}: { value: number; accentColor: string }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(1, Math.max(0, value / 100));
  return (
    <svg width="124" height="124" viewBox="0 0 124 124" aria-hidden="true">
      <circle
        cx="62"
        cy="62"
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="6"
      />
      <circle
        cx="62"
        cy="62"
        r={r}
        fill="none"
        stroke={accentColor}
        strokeWidth="6"
        strokeDasharray={`${pct * circ} ${circ}`}
        strokeLinecap="round"
        style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
      />
      <text
        x="62"
        y="57"
        textAnchor="middle"
        fill={accentColor}
        fontSize="22"
        fontFamily="monospace"
        fontWeight="800"
      >
        {Math.round(value)}
      </text>
      <text
        x="62"
        y="74"
        textAnchor="middle"
        fill="rgba(255,255,255,0.35)"
        fontSize="9"
        fontFamily="monospace"
      >
        COH
      </text>
    </svg>
  );
}

function EngineInteract({
  engine,
  style,
}: { engine: (typeof STATIC_ENGINES)[0]; style: (typeof SUB_STYLE)[SubKey] }) {
  const [input, setInput] = useState("");
  const [sealedSeed, setSealedSeed] = useState<string | null>(null);
  const queryMut = useEngineQuery(engine.codeName);
  const passportMut = useEngineQueryWithPassport(engine.codeName);
  const response = passportMut.data?.response ?? queryMut.data;
  const isPending = queryMut.isPending || passportMut.isPending;
  const isError = queryMut.isError || passportMut.isError;
  const errorMsg = (queryMut.error ?? passportMut.error)?.message;

  function handleSend() {
    const t = input.trim();
    if (!t || isPending) return;
    queryMut.reset();
    passportMut.reset();
    setSealedSeed(null);
    queryMut.mutate({ userInput: t, context: engine.domain });
  }
  function handleSeal() {
    const t = input.trim();
    if (!t || isPending) return;
    queryMut.reset();
    passportMut.reset();
    setSealedSeed(null);
    passportMut.mutate(
      { userInput: t, context: engine.domain },
      {
        onSuccess: (d) => {
          setSealedSeed(d.seedGenerated.id);
        },
      },
    );
  }

  return (
    <section className="space-y-4" data-ocid="engine_page.interact_section">
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4" style={{ color: style.accent }} />
        <h2 className="text-base font-display font-semibold text-foreground">
          Interact with the Engine
        </h2>
        <Badge variant="default" className="ml-auto text-xs gap-1">
          <span
            className="w-1.5 h-1.5 rounded-full bg-current"
            style={{ animation: "status-pulse 2s ease-in-out infinite" }}
          />
          LIVE
        </Badge>
      </div>
      <div
        className="glass-sm rounded-2xl p-4 space-y-3"
        style={{ borderColor: style.border }}
      >
        <p className="text-xs text-muted-foreground font-mono">
          {engine.domain}
        </p>
        <Textarea
          data-ocid="engine_page.interact_input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder={`Ask ${engine.codeName} anything…`}
          rows={3}
          className="resize-none bg-transparent border-0 focus-visible:ring-0 text-sm"
          disabled={isPending}
        />
        <div className="flex gap-2 flex-wrap">
          <button
            type="button"
            disabled={!input.trim() || isPending}
            onClick={handleSend}
            data-ocid="engine_page.send_button"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-glass touch-target disabled:opacity-40"
            style={{
              background: style.chipBg,
              color: style.accent,
              border: `1px solid ${style.border}`,
              minHeight: "36px",
            }}
          >
            <Send className="w-3.5 h-3.5" />
            {isPending ? "Thinking…" : "Send"}
          </button>
          {response && (
            <button
              type="button"
              disabled={isPending || !!sealedSeed}
              onClick={handleSeal}
              data-ocid="engine_page.seal_passport_button"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-glass touch-target disabled:opacity-40"
              style={{
                background: "rgba(160,100,255,0.08)",
                color: "oklch(0.68 0.18 280)",
                border: "1px solid rgba(160,100,255,0.2)",
                minHeight: "36px",
              }}
            >
              <BookMarked className="w-3.5 h-3.5" />
              {sealedSeed ? "Sealed ✓" : "Seal to Passport"}
            </button>
          )}
        </div>
      </div>
      {isPending && (
        <div
          className="space-y-2 glass-sm rounded-2xl p-4"
          data-ocid="engine_page.response_loading_state"
        >
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      )}
      {isError && !isPending && (
        <div
          className="glass-sm rounded-2xl p-4 text-sm"
          data-ocid="engine_page.response_error_state"
        >
          <strong className="text-destructive">Engine error:</strong>{" "}
          <span className="text-muted-foreground">
            {errorMsg ?? "Unknown error"}
          </span>
        </div>
      )}
      {response && !isPending && (
        <div
          className="glass rounded-2xl p-5 space-y-3"
          style={{
            borderColor: style.border,
            boxShadow: `0 0 32px ${style.glow}`,
          }}
          data-ocid="engine_page.response_card"
        >
          <div className="flex items-center gap-2">
            <span
              className="font-mono text-xs font-bold"
              style={{ color: style.accent }}
            >
              {engine.codeName}
            </span>
            {sealedSeed && (
              <Badge variant="outline" className="ml-auto gap-1 text-xs">
                <CheckCircle
                  className="w-3 h-3"
                  style={{ color: style.accent }}
                />{" "}
                Sealed
              </Badge>
            )}
          </div>
          <pre className="text-sm text-foreground whitespace-pre-wrap font-body leading-relaxed">
            {response}
          </pre>
        </div>
      )}
    </section>
  );
}

export default function EnginePage() {
  const { engineId } = useParams({ from: "/engines/$engineId" });
  const engine = STATIC_ENGINES.find((e) => String(e.id) === engineId);
  const [grade, setGrade] = useState("5");
  const autoSeal = useAutoSeal();

  if (!engine) {
    return (
      <div
        className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4"
        data-ocid="engine_page.not_found_state"
      >
        <p className="text-4xl">⚠️</p>
        <h1 className="text-2xl font-display font-bold text-foreground">
          Engine Not Found
        </h1>
        <p className="text-muted-foreground">
          No engine with id <code className="font-mono">{engineId}</code>
        </p>
        <Link to="/engines">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass-sm text-sm font-semibold transition-glass touch-target"
            data-ocid="engine_page.back_to_registry_button"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Registry
          </button>
        </Link>
      </div>
    );
  }

  const subKey = substrateOf(Number(engine.id));
  const style = SUB_STYLE[subKey];
  const isActive = engine.status === EngineStatus.active;
  const coh = 85 + (Number(engine.id) % 12);

  return (
    <div
      className="max-w-3xl mx-auto px-4 py-10 space-y-8"
      data-ocid="engine_page.page"
    >
      <Link
        to="/engines"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        data-ocid="engine_page.back_link"
      >
        <ArrowLeft className="w-4 h-4" /> Engine Registry
      </Link>

      {/* Glass-XL Hero */}
      <div
        className="glass-xl rounded-3xl p-8 relative overflow-hidden"
        data-ocid="engine_page.engine_card"
        style={{
          boxShadow: `0 0 48px ${style.glow}, 0 32px 96px rgba(0,0,0,0.7)`,
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 100% 0%, ${style.glow} 0%, transparent 65%)`,
          }}
        />
        <div className="relative flex items-start justify-between gap-6 flex-wrap">
          <div className="space-y-3 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="font-mono text-sm font-black tracking-widest px-3 py-1 rounded-lg"
                style={{
                  background: style.chipBg,
                  color: style.accent,
                  border: `1px solid ${style.border}`,
                }}
              >
                {engine.codeName}
              </span>
              <span
                className="font-mono text-[10px] px-2 py-0.5 rounded-md tracking-wider"
                style={{
                  background: style.chipBg,
                  color: style.accent,
                  border: `1px solid ${style.border}`,
                }}
              >
                {subKey} · {style.label}
              </span>
            </div>
            <h1 className="text-3xl font-display font-black tracking-tight text-foreground">
              {engine.fullName}
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {engine.domain}
            </p>
          </div>
          <CohRing value={coh} accentColor={style.accent} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          {[
            { label: "COH Score", value: `${coh}%` },
            { label: "Sessions", value: String(Number(engine.id) * 137 + 400) },
            { label: "Lessons", value: String(engine.lessonsAvailable.length) },
            { label: "Status", value: isActive ? "Active" : "Dormant" },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="glass-sm rounded-xl px-3 py-2.5 text-center"
              style={{ borderColor: style.border }}
            >
              <p
                className="text-base font-black font-mono"
                style={{ color: style.accent }}
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

      {/* Role */}
      <div
        className="glass-sm rounded-2xl p-5 space-y-2"
        style={{ borderColor: style.border }}
      >
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
          Engine Role
        </p>
        <p className="text-sm text-foreground leading-relaxed">
          {engine.description}
        </p>
        {engine.mathFoundation && (
          <p className="text-xs text-muted-foreground italic mt-2">
            Foundation: {engine.mathFoundation}
          </p>
        )}
      </div>

      {/* Lessons */}
      <section data-ocid="engine_page.lessons_section" className="space-y-3">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
          Lessons Available
        </p>
        <div className="space-y-2">
          {engine.lessonsAvailable.map((lesson, idx) => (
            <div
              key={lesson}
              data-ocid={`engine_page.lesson_row.${idx + 1}`}
              className="flex items-center justify-between gap-4 glass-sm rounded-xl px-4 py-3 transition-glass"
              style={{ borderColor: style.border }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold font-mono shrink-0"
                  style={{ background: style.chipBg, color: style.accent }}
                >
                  {idx + 1}
                </span>
                <span className="text-sm text-foreground font-medium truncate">
                  {lesson}
                </span>
              </div>
              <Link
                to="/study/$subjectId/$topicId"
                params={{
                  subjectId: `engine-${engine.id}`,
                  topicId: lesson
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-|-$/g, ""),
                }}
                data-ocid={`engine_page.lesson_start_button.${idx + 1}`}
                className="text-[10px] font-mono font-semibold transition-glass shrink-0"
                style={{ color: style.accent }}
              >
                Start →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Grade selector */}
      <div className="space-y-2">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
          Grade Level
        </p>
        <div
          className="flex flex-wrap gap-1.5"
          data-ocid="engine_page.grade_selector"
        >
          {[
            "K",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
          ].map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGrade(g)}
              aria-pressed={grade === g}
              data-ocid={`engine_page.grade_button.${g.toLowerCase()}`}
              className="px-3 py-1 rounded-lg text-xs font-mono font-medium transition-glass"
              style={
                grade === g
                  ? {
                      background: style.chipBg,
                      color: style.accent,
                      border: `1px solid ${style.border}`,
                      minHeight: "32px",
                    }
                  : {
                      background: "transparent",
                      color: "oklch(0.55 0.01 260)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      minHeight: "32px",
                    }
              }
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Seal lesson */}
      <button
        type="button"
        className="w-full py-3 rounded-xl text-sm font-semibold transition-glass touch-target disabled:opacity-40"
        style={{
          background: style.chipBg,
          color: style.accent,
          border: `1px solid ${style.border}`,
        }}
        disabled={autoSeal.isPending || autoSeal.isSuccess}
        data-ocid="engine_page.seal_lesson_button"
        onClick={() =>
          autoSeal.mutate(
            {
              summary: engine.domain,
              engineUsed: engine.codeName,
              subject: engine.domain,
              gradeLevel: grade,
            },
            {
              onSuccess: () => {
                toast.success("Lesson sealed to passport");
              },
            },
          )
        }
      >
        {autoSeal.isPending
          ? "Sealing…"
          : autoSeal.isSuccess
            ? "✓ Sealed to Passport"
            : "Seal Lesson to Passport"}
      </button>

      <EngineInteract engine={engine} style={style} />

      <p className="text-[10px] font-mono text-muted-foreground text-center">
        EduAI · {engine.codeName} · {subKey} · Engine{" "}
        {String(engine.id).padStart(2, "0")}/{STATIC_ENGINES.length}
      </p>
    </div>
  );
}
