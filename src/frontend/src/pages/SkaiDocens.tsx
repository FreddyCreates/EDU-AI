import { createActor } from "@/backend";
import type { KernelSeed, SkaiTeachResponse } from "@/backend";
import EddiOrb from "@/components/EddiOrb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useSkaiTeach } from "@/hooks/use-skai";
import { useActor } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Mic,
  MicOff,
  Send,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const ACTIVE_LAWS = [
  {
    latin: "LEX_ADOPTIO",
    english: "You are welcomed",
    description: "You are accepted into the organism's lineage.",
  },
  {
    latin: "LEX_CREATIO",
    english: "Create first",
    description: "Every lesson begins with creation, not instruction.",
  },
  {
    latin: "LEX_MEMORIA",
    english: "Nothing is forgotten",
    description: "Every session compounds. You never start over.",
  },
];

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  onresult: ((event: SpeechRecognitionResultEvent) => void) | null;
}
interface SpeechRecognitionResult {
  readonly length: number;
  [index: number]: { transcript: string };
}
interface SpeechRecognitionResultEvent {
  readonly results: SpeechRecognitionResult[] & { length: number };
}
type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;
declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionConstructor;
    webkitSpeechRecognition: SpeechRecognitionConstructor;
  }
}

const engineDomainMap: Record<string, string> = {
  SYNTHOS: "Synthesis from first principles",
  VEKTOR: "Meaning in data — vectors & embeddings",
  PHAEDRUS: "Reasoning through inference chains",
  MORPHOS: "Transforming structure",
  LOGOS: "Language, voice & doctrine generation",
  GENITOR: "Creation from a seed",
  "MEMORIA-VIVA": "Memory & compounding",
  OMNIS: "The totality — all engines as one field",
};
const engineIdMap: Record<string, string> = {
  SYNTHOS: "1",
  VEKTOR: "2",
  PHAEDRUS: "3",
  MORPHOS: "4",
  LOGOS: "5",
  GENITOR: "6",
  "MEMORIA-VIVA": "7",
  OMNIS: "8",
};

export default function SkaiDocens() {
  const { actor } = useActor(createActor);
  const skaiTeach = useSkaiTeach();

  const [inputValue, setInputValue] = useState("");
  const [submittedIntent, setSubmittedIntent] = useState("");
  const [teachResult, setTeachResult] = useState<SkaiTeachResponse | null>(
    null,
  );
  const [isListening, setIsListening] = useState(false);
  const [lawsPanelOpen, setLawsPanelOpen] = useState(false);
  const [sealModalOpen, setSealModalOpen] = useState(false);
  const [sealSummary, setSealSummary] = useState("");
  const [artifactName, setArtifactName] = useState("");
  const [isSealing, setIsSealing] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const intent = inputValue.trim();
    if (!intent || skaiTeach.isPending || !actor) return;
    setSubmittedIntent(intent);
    setInputValue("");
    setTeachResult(null);
    try {
      const result = await skaiTeach.mutateAsync({ studentIntent: intent });
      setTeachResult(result);
      setSealSummary(result.doctrine.slice(0, 100));
      setArtifactName(
        intent.length > 40 ? `${intent.slice(0, 40)}...` : intent,
      );
    } catch {
      toast.error("EDDI Teacher Mode could not respond. Please try again.");
    }
  };

  const handleEnterEngine = () => {
    if (!teachResult) return;
    const id = engineIdMap[teachResult.engineSelected];
    if (id) navigate({ to: "/engines/$engineId", params: { engineId: id } });
  };

  const toggleVoice = () => {
    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      toast.error("Voice requires SpeechRecognition support.");
      return;
    }
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }
    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => {
      setIsListening(false);
      toast.error("Voice capture failed.");
    };
    recognition.onresult = (event: SpeechRecognitionResultEvent) => {
      const transcript = Array.from(
        event.results as unknown as SpeechRecognitionResult[],
      )
        .map((r) => r[0].transcript)
        .join("");
      setInputValue(transcript);
    };
    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleSealSession = async () => {
    if (!actor || !sealSummary.trim() || !teachResult) return;
    setIsSealing(true);
    try {
      const seed: KernelSeed = {
        id: `seed-docens-${Date.now()}`,
        sessionSummary: sealSummary.trim(),
        engineUsed: teachResult.engineSelected,
        trackName: "TEACHER_SESSION",
        createdAt: BigInt(Date.now()),
        artifactName: artifactName.trim() || undefined,
      };
      const sealed = await actor.sealKernelSeed(seed);
      if (sealed) {
        setSealModalOpen(false);
        setSealSummary("");
        setArtifactName("");
        toast.success("Session sealed to sovereign passport.");
      } else {
        toast.error("Sealing failed. The KERNEL_SEED was rejected.");
      }
    } catch {
      toast.error("Could not seal the session. Please try again.");
    } finally {
      setIsSealing(false);
    }
  };

  return (
    <div
      className="portal-enter flex h-[calc(100vh-8rem)] max-w-6xl mx-auto px-4 sm:px-6 py-4 gap-4"
      data-ocid="skai-docens.page"
    >
      {/* Main Teaching Area */}
      <div
        className="flex flex-col flex-1 min-w-0"
        data-ocid="skai-docens.panel"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-portal-teacher glass-shimmer rounded-2xl px-5 py-4 mb-3 relative overflow-hidden"
        >
          <div
            className="pointer-events-none absolute -top-6 -right-6 h-24 w-24 rounded-full blur-2xl"
            style={{ background: "rgba(160,100,255,0.08)" }}
          />
          <div className="relative flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-3 mb-0.5">
                <EddiOrb mode="EXPLAIN" size="md" />
                <h1 className="font-display font-bold text-xl text-foreground tracking-tight">
                  EDDI — Teacher Mode
                </h1>
                <Badge
                  className="text-xs font-mono"
                  style={{
                    borderColor: "rgba(160,100,255,0.30)",
                    background: "rgba(160,100,255,0.12)",
                    color: "rgba(200,160,255,0.9)",
                  }}
                >
                  TEACHER AI
                </Badge>
                <span className="relative inline-flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 bg-violet-400" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-400" />
                </span>
              </div>
              <p className="text-[10px] text-foreground/40 font-mono">
                TCHR_INTELLIGENCE · Sovereign Educator Engine
              </p>
              <p className="text-sm text-foreground/50 mt-1">
                EDDI operates in Teacher Mode to help you build, teach, and
                illuminate.
              </p>
            </div>
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              {teachResult && (
                <>
                  <Badge
                    variant="outline"
                    className="text-xs font-mono gap-1"
                    style={{
                      borderColor: "rgba(160,100,255,0.25)",
                      color: "rgba(200,160,255,0.7)",
                    }}
                  >
                    <Zap className="h-3 w-3 text-violet-400" />
                    {engineDomainMap[teachResult.engineSelected] ??
                      teachResult.engineSelected}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    data-ocid="skai-docens.seal_button"
                    className="text-xs gap-1.5"
                    style={{
                      borderColor: "rgba(160,100,255,0.35)",
                      color: "rgba(200,160,255,0.9)",
                    }}
                    onClick={() => setSealModalOpen(true)}
                    type="button"
                  >
                    <Shield className="h-3.5 w-3.5" />
                    Save Session
                  </Button>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Content area */}
        <div
          className="flex-1 glass-xl rounded-2xl overflow-hidden flex flex-col"
          style={{ border: "1px solid rgba(160,100,255,0.15)" }}
        >
          <ScrollArea className="flex-1 p-4">
            {!teachResult && !skaiTeach.isPending ? (
              <div
                className="flex flex-col items-center justify-center h-full min-h-[320px] text-center px-4 py-8"
                data-ocid="skai-docens.empty_state"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex h-16 w-16 items-center justify-center rounded-2xl glass-portal-teacher glow-teacher mb-5"
                >
                  <Sparkles className="h-8 w-8 text-violet-300" />
                </motion.div>
                <h2 className="font-display text-lg font-semibold text-foreground mb-1">
                  What do you want to teach today?
                </h2>
                <p className="text-base text-foreground/60 mb-6 max-w-md">
                  EDDI Teacher Mode generates{" "}
                  <span className="font-bold text-violet-300">multi-voice</span>{" "}
                  responses with EXPAND, CRITIQUE, SYNTHESIZE, and NOVEL
                  perspectives.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 w-full max-w-xl">
                  {[
                    {
                      label:
                        "How do I help a struggling student with fractions?",
                      icon: "📐",
                    },
                    {
                      label:
                        "Create a differentiated lesson plan for Grade 7 algebra",
                      icon: "📋",
                    },
                    {
                      label:
                        "What are the best engagement strategies for reluctant learners?",
                      icon: "🎯",
                    },
                  ].map((s, i) => (
                    <button
                      key={s.label}
                      type="button"
                      data-ocid={`skai-docens.suggestion.${i + 1}`}
                      onClick={() => setInputValue(s.label)}
                      className="flex-1 flex items-center gap-2 glass-sm rounded-2xl hover:glass-portal-teacher px-3 py-3 text-sm text-left transition-glass group"
                      style={{ border: "1px solid rgba(160,100,255,0.18)" }}
                    >
                      <span className="text-base">{s.icon}</span>
                      <span className="text-foreground/60 group-hover:text-foreground text-xs leading-snug">
                        {s.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : skaiTeach.isPending ? (
              <div
                className="flex flex-col items-center justify-center h-full min-h-[320px] gap-4"
                data-ocid="skai-docens.loading_state"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl glass-portal-teacher">
                  <Sparkles className="h-6 w-6 text-violet-300 animate-pulse" />
                </div>
                <p className="text-sm text-foreground/50 font-mono">
                  EDDI Teacher Mode is thinking…
                </p>
                <p className="text-xs text-foreground/30 max-w-xs text-center italic">
                  &ldquo;{submittedIntent}&rdquo;
                </p>
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="inline-block h-1.5 w-1.5 rounded-full animate-bounce"
                      style={{
                        background: "rgba(160,100,255,0.8)",
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : teachResult ? (
              <div className="space-y-4 py-2" data-ocid="skai-docens.response">
                {/* Teacher query */}
                <div className="flex justify-end">
                  <div
                    className="max-w-[75%] rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm text-foreground"
                    style={{
                      background: "rgba(160,100,255,0.18)",
                      border: "1px solid rgba(160,100,255,0.3)",
                    }}
                  >
                    {submittedIntent}
                  </div>
                </div>

                {/* SKAI response — multi-voice format */}
                <div
                  className="flex gap-3"
                  data-ocid="skai-docens.multivoice_response"
                >
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full glass font-bold text-xs text-violet-300"
                    style={{ border: "1px solid rgba(160,100,255,0.35)" }}
                  >
                    S
                  </div>
                  <div className="flex-1 space-y-3">
                    {/* Welcome */}
                    <div className="glass rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed text-foreground/80">
                      {teachResult.studentWelcome}
                    </div>

                    {/* EXPAND voice */}
                    <div
                      className="glass-sm rounded-2xl px-4 py-3"
                      style={{ border: "1px solid rgba(0,200,100,0.2)" }}
                      data-ocid="skai-docens.expand_block"
                    >
                      <p className="text-[10px] font-mono font-bold text-emerald-400 mb-1.5 uppercase tracking-widest flex items-center gap-1.5">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        EXPAND — First Principles
                      </p>
                      <p className="text-sm text-foreground/75 leading-relaxed">
                        {teachResult.doctrine}
                      </p>
                    </div>

                    {/* CRITIQUE voice */}
                    <div
                      className="glass-sm rounded-2xl px-4 py-3"
                      style={{ border: "1px solid rgba(255,185,0,0.2)" }}
                      data-ocid="skai-docens.critique_block"
                    >
                      <p className="text-[10px] font-mono font-bold text-amber-400 mb-1.5 uppercase tracking-widest flex items-center gap-1.5">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400" />
                        CRITIQUE — Counterpoint
                      </p>
                      <p className="text-sm text-foreground/65 leading-relaxed italic">
                        Consider: every teaching strategy has a context where it
                        fails. The best educators know the limitations of their
                        approach and adapt before students struggle.
                      </p>
                    </div>

                    {/* SYNTHESIZE voice */}
                    <div
                      className="glass-portal-teacher rounded-2xl px-4 py-3"
                      data-ocid="skai-docens.synthesize_block"
                    >
                      <p
                        className="text-[10px] font-mono font-bold mb-1.5 uppercase tracking-widest flex items-center gap-1.5"
                        style={{ color: "rgba(200,160,255,0.9)" }}
                      >
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-400" />
                        SYNTHESIZE — Integrated View
                      </p>
                      <p className="text-sm text-foreground/75 leading-relaxed">
                        The sovereign approach merges direct instruction with
                        student-led discovery — use COGT phase ratios (EXPAND
                        55%, CRITIQUE 21%, SYNTHESIZE 24%) to structure each
                        session.
                      </p>
                    </div>

                    {/* NOVEL voice */}
                    <div
                      className="glass-sm rounded-2xl px-4 py-3"
                      style={{
                        border: "1px solid rgba(160,100,255,0.35)",
                        background: "rgba(160,100,255,0.08)",
                      }}
                      data-ocid="skai-docens.novel_block"
                    >
                      <p
                        className="text-[10px] font-mono font-bold mb-1.5 uppercase tracking-widest flex items-center gap-1.5"
                        style={{ color: "rgba(200,160,255,0.95)" }}
                      >
                        <Sparkles className="h-3 w-3" />
                        NOVEL — EduAI Original
                      </p>
                      <p className="text-sm text-foreground/70 leading-relaxed">
                        Your student&rsquo;s passport already contains the seeds
                        of tomorrow&rsquo;s mastery. The intelligence
                        isn&rsquo;t in what you teach — it&rsquo;s in what
                        compounds.
                      </p>
                    </div>

                    {/* Engine routing */}
                    <div
                      className="glass rounded-2xl px-4 py-3 flex flex-col gap-2"
                      data-ocid="skai-docens.engine_routing"
                    >
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-violet-300 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-[10px] font-mono text-foreground/30 uppercase tracking-widest">
                            SOVEREIGN ENGINE
                          </p>
                          <p className="text-sm font-semibold text-foreground">
                            {engineDomainMap[teachResult.engineSelected] ??
                              teachResult.engineSelected}
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        data-ocid="skai-docens.enter_engine_button"
                        className="w-full gap-1.5 text-xs font-bold rounded-xl"
                        style={{
                          background:
                            "linear-gradient(135deg, oklch(0.62 0.22 280), oklch(0.48 0.22 280))",
                          border: "1px solid rgba(160,100,255,0.4)",
                        }}
                        onClick={handleEnterEngine}
                      >
                        <ChevronRight className="h-3.5 w-3.5" />
                        Enter{" "}
                        {engineDomainMap[teachResult.engineSelected]?.split(
                          " ",
                        )[0] ?? teachResult.engineSelected}{" "}
                        Engine
                      </Button>
                    </div>

                    {teachResult.suggestedNext && (
                      <div
                        className="glass-sm rounded-2xl px-4 py-2.5 flex items-center gap-2"
                        style={{ border: "1px solid rgba(160,100,255,0.2)" }}
                        data-ocid="skai-docens.suggested_next"
                      >
                        <BookOpen className="h-3.5 w-3.5 text-violet-400 shrink-0" />
                        <p className="text-xs text-foreground/50">
                          <span className="font-semibold text-foreground">
                            Next:{" "}
                          </span>
                          {engineDomainMap[teachResult.suggestedNext] ??
                            teachResult.suggestedNext}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    data-ocid="skai-docens.ask_again_button"
                    onClick={() => {
                      setTeachResult(null);
                      setSubmittedIntent("");
                    }}
                    className="text-xs text-foreground/30 hover:text-violet-300 transition-colors font-mono underline underline-offset-2"
                  >
                    Ask EDDI Teacher Mode something else
                  </button>
                </div>
              </div>
            ) : null}
          </ScrollArea>

          <Separator style={{ background: "rgba(160,100,255,0.12)" }} />

          {isListening && (
            <div
              className="px-4 py-2 flex items-center gap-2"
              style={{
                background: "rgba(160,100,255,0.05)",
                borderBottom: "1px solid rgba(160,100,255,0.15)",
              }}
              data-ocid="skai-docens.listening_indicator"
            >
              <div className="h-2 w-2 rounded-full bg-violet-400 animate-pulse" />
              <span className="text-xs text-violet-300 font-mono">
                EDDI is listening…
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-3 flex gap-2 glass">
            <Input
              data-ocid="skai-docens.input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                isListening
                  ? "Speak your teaching intent…"
                  : "What teaching challenge can I help with?"
              }
              className="flex-1 rounded-xl"
              style={{
                background: "rgba(160,100,255,0.06)",
                border: "1px solid rgba(160,100,255,0.18)",
                color: "inherit",
              }}
              disabled={skaiTeach.isPending}
            />
            <Button
              type="button"
              variant={isListening ? "default" : "outline"}
              size="icon"
              data-ocid="skai-docens.voice_button"
              onClick={toggleVoice}
              aria-label={isListening ? "Stop listening" : "Start voice"}
              className={"rounded-xl"}
              style={
                isListening
                  ? {
                      background: "oklch(0.62 0.22 280)",
                      color: "oklch(0.07 0.01 260)",
                    }
                  : {
                      borderColor: "rgba(160,100,255,0.25)",
                      color: "rgba(160,100,255,0.7)",
                    }
              }
            >
              {isListening ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>
            <Button
              type="submit"
              size="icon"
              data-ocid="skai-docens.submit_button"
              disabled={!inputValue.trim() || skaiTeach.isPending || !actor}
              aria-label="Send to SKAI Docens"
              className="rounded-xl"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.62 0.22 280), oklch(0.48 0.22 280))",
                border: "1px solid rgba(160,100,255,0.4)",
              }}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>

      {/* Doctrine sidebar */}
      <div
        className="hidden lg:flex flex-col w-64 shrink-0 gap-3"
        data-ocid="skai-docens.doctrine_panel"
      >
        <div
          className="glass rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(160,100,255,0.18)" }}
        >
          <button
            type="button"
            data-ocid="skai-docens.laws_toggle"
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold font-mono text-foreground/70 hover:text-foreground hover:bg-[rgba(160,100,255,0.06)] transition-glass"
            onClick={() => setLawsPanelOpen((v) => !v)}
          >
            <span className="flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-violet-400" />
              Active Laws
            </span>
            {lawsPanelOpen ? (
              <ChevronDown className="h-4 w-4 text-foreground/30" />
            ) : (
              <ChevronRight className="h-4 w-4 text-foreground/30" />
            )}
          </button>
          {lawsPanelOpen && (
            <div className="px-4 pb-4 space-y-3">
              {ACTIVE_LAWS.map((law, i) => (
                <div
                  key={law.latin}
                  data-ocid={`skai-docens.law.${i + 1}`}
                  className="space-y-0.5"
                >
                  <p className="text-xs font-mono font-bold text-violet-300">
                    {law.latin}
                  </p>
                  <p className="text-xs font-semibold text-foreground/80">
                    {law.english}
                  </p>
                  <p className="text-xs text-foreground/40 leading-relaxed">
                    {law.description}
                  </p>
                </div>
              ))}
            </div>
          )}
          {!lawsPanelOpen && (
            <div className="px-4 pb-3 space-y-1.5">
              {ACTIVE_LAWS.map((law, i) => (
                <div
                  key={law.latin}
                  data-ocid={`skai-docens.law_compact.${i + 1}`}
                  className="flex items-center gap-1.5"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shrink-0" />
                  <span className="text-xs font-mono text-foreground/30 truncate">
                    {law.latin}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {teachResult && (
          <div
            className="glass-portal-teacher rounded-2xl px-4 py-3"
            data-ocid="skai-docens.active_engine_card"
          >
            <p
              className="text-[10px] font-mono font-bold mb-1 uppercase tracking-widest"
              style={{ color: "rgba(200,160,255,0.9)" }}
            >
              ACTIVE ENGINE
            </p>
            <p className="text-sm font-display font-semibold text-foreground">
              {engineDomainMap[teachResult.engineSelected] ??
                teachResult.engineSelected}
            </p>
            {teachResult.suggestedNext && (
              <p className="text-xs text-foreground/30 mt-1.5 font-mono">
                Next:{" "}
                <span className="text-foreground/60">
                  {engineDomainMap[teachResult.suggestedNext] ??
                    teachResult.suggestedNext}
                </span>
              </p>
            )}
          </div>
        )}

        {/* Multi-voice legend */}
        <div
          className="glass rounded-2xl px-4 py-3"
          style={{ border: "1px solid rgba(160,100,255,0.15)" }}
          data-ocid="skai-docens.multivoice_legend"
        >
          <p className="text-[10px] font-mono font-bold text-foreground/30 mb-3 uppercase tracking-widest">
            MULTI-VOICE LAW
          </p>
          <div className="space-y-2.5">
            {[
              {
                color: "bg-emerald-400",
                label: "EXPAND",
                desc: "First principles",
              },
              {
                color: "bg-amber-400",
                label: "CRITIQUE",
                desc: "Counterpoint",
              },
              {
                color: "bg-violet-400",
                label: "SYNTHESIZE",
                desc: "Integration",
              },
              {
                color: "bg-violet-300",
                label: "NOVEL",
                desc: "Original insight",
              },
            ].map(({ color, label, desc }) => (
              <div key={label} className="flex items-center gap-2">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${color} shrink-0`}
                />
                <div>
                  <span className="text-xs font-mono font-bold text-foreground/60">
                    {label}
                  </span>
                  <span className="text-xs text-foreground/30 ml-1">
                    {desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {teachResult && (
          <div
            className="glass rounded-2xl px-4 py-3"
            style={{ border: "1px solid rgba(160,100,255,0.15)" }}
            data-ocid="skai-docens.session_stats"
          >
            <p className="text-[10px] font-mono font-bold text-foreground/30 mb-2 uppercase tracking-widest">
              SESSION
            </p>
            <p className="text-xs text-foreground/40">
              Intent routed. Ready to seal.
            </p>
            <Button
              size="sm"
              data-ocid="skai-docens.seal_button_sidebar"
              className="w-full mt-3 gap-1.5 text-xs rounded-xl"
              variant="outline"
              style={{
                borderColor: "rgba(160,100,255,0.35)",
                color: "rgba(200,160,255,0.9)",
              }}
              onClick={() => setSealModalOpen(true)}
              type="button"
            >
              <Shield className="h-3.5 w-3.5" />
              Save Session
            </Button>
          </div>
        )}
      </div>

      {/* Seal Modal */}
      <Dialog open={sealModalOpen} onOpenChange={setSealModalOpen}>
        <DialogContent
          className="sm:max-w-md glass-xl"
          style={{ border: "1px solid rgba(160,100,255,0.3)" }}
          data-ocid="skai-docens.seal_dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display flex items-center gap-2">
              <Shield className="h-5 w-5 text-violet-400" />
              Save This Session
            </DialogTitle>
            <DialogDescription className="text-sm text-foreground/50">
              Permanently sealed to your sovereign passport.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label
                htmlFor="summary"
                className="text-sm font-medium text-foreground/70"
              >
                Session Summary <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="summary"
                data-ocid="skai-docens.seal_summary_input"
                placeholder="What teaching insight did you gain?"
                value={sealSummary}
                onChange={(e) => setSealSummary(e.target.value)}
                className="resize-none text-sm rounded-xl"
                style={{
                  background: "rgba(160,100,255,0.06)",
                  border: "1px solid rgba(160,100,255,0.2)",
                }}
                rows={3}
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="artifact"
                className="text-sm font-medium text-foreground/70"
              >
                Artifact Name{" "}
                <span className="text-foreground/30 font-normal">
                  (optional)
                </span>
              </Label>
              <Input
                id="artifact"
                data-ocid="skai-docens.seal_artifact_input"
                placeholder="Name your lesson artifact…"
                value={artifactName}
                onChange={(e) => setArtifactName(e.target.value)}
                className="text-sm rounded-xl"
                style={{
                  background: "rgba(160,100,255,0.06)",
                  border: "1px solid rgba(160,100,255,0.2)",
                }}
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              data-ocid="skai-docens.seal_cancel_button"
              onClick={() => setSealModalOpen(false)}
              className="border-[rgba(255,255,255,0.1)] text-foreground/60 hover:text-foreground"
            >
              Cancel
            </Button>
            <Button
              type="button"
              data-ocid="skai-docens.seal_confirm_button"
              disabled={!sealSummary.trim() || isSealing}
              onClick={handleSealSession}
              className="gap-1.5 font-bold"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.62 0.22 280), oklch(0.48 0.22 280))",
                border: "1px solid rgba(160,100,255,0.4)",
              }}
            >
              <Shield className="h-4 w-4" />
              {isSealing ? "Sealing…" : "Save Session"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
