// EddiDeepChat — Alpha Deep EDDI full reasoning interface with trace viewer.
// Connects to chatDeep() via ADEDDI API mixin.
// Shows 7-layer reasoning trace for every response.

import AstroBackground from "@/components/AstroBackground";
import DeepKernelPanel from "@/components/DeepKernelPanel";
import EddiOrb from "@/components/EddiOrb";
import ReasoningTrace, { type ReasoningTraceData } from "@/components/ReasoningTrace";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ChevronRight,
  Layers,
  Loader2,
  SendHorizonal,
  Sparkles,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";

const GOLD   = "oklch(0.76 0.18 84)";
const PURPLE = "oklch(0.68 0.18 280)";
const TEAL   = "oklch(0.72 0.16 185)";

// ── Demo trace factory (used when backend not yet wired) ─────────────────────
let msgCounter = 0;
function makeDemoTrace(input: string): ReasoningTraceData {
  msgCounter += 1;
  const sessionId = `SESS-DEMO-${msgCounter.toString().padStart(4, "0")}`;
  return {
    sessionId,
    version: "ADEDDI-v26-ALPHA",
    sealed: true,
    timestamp: Date.now() * 1_000_000,
    finalOutput: `[ADEDDI v26] Sovereign response synthesised for: "${input}". PHI-weighted chain complete.`,
    layers: [
      { layer: "INPUT",     output: `Normalised input: "${input}"`,                              phiWeight: "φ⁻¹ 0.618",  durationMs: 3   },
      { layer: "CLASSIFY",  output: "Domain: General. Intent: EXPLAIN. Complexity: Moderate.",    phiWeight: "φ⁻¹ 0.618",  durationMs: 8   },
      { layer: "COGT",      output: "Expanded → Critiqued → Synthesised. 3 candidate propositions formed.", phiWeight: "φ 1.0",      engineInvoked: "OMNIS",  durationMs: 34  },
      { layer: "META",      output: "Architecture Council: Path A (direct), Path B (lateral), Path C (depth), Novel: emergent intersection.", phiWeight: "φ 1.618", engineInvoked: "NEXUS", durationMs: 55 },
      { layer: "AUTN",      output: "Autonomous archetype selected: ORACLE. Entropy seed applied. Novel extension generated.", phiWeight: "φ⁻² 0.382", engineInvoked: "AUTN", durationMs: 21 },
      { layer: "SYNTHESIS", output: `PHI-weighted unification: 1618×META + 618×COGT + 382×AUTN → canonical sovereign answer for "${input}".`, phiWeight: "φ 1.618", durationMs: 13 },
      { layer: "SEAL",      output: `Sealed. Session ${sessionId}. Version ADEDDI-v26-ALPHA. On-chain anchor: OK.`, phiWeight: "φ⁻¹ 0.618", durationMs: 5 },
    ],
  };
}

interface ChatMessage {
  id: string;
  role: "user" | "eddi";
  content: string;
  trace?: ReasoningTraceData;
  timestamp: Date;
}

function UserBubble({ msg }: { msg: ChatMessage }) {
  return (
    <div className="flex justify-end">
      <div
        className="max-w-[70%] px-4 py-3 rounded-2xl rounded-br-sm text-sm"
        style={{ background: `${PURPLE}22`, border: `1px solid ${PURPLE}44` }}
      >
        <p className="text-white/90">{msg.content}</p>
        <p className="text-[10px] text-white/25 mt-1 text-right font-mono">
          {msg.timestamp.toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}

function EddiBubble({ msg }: { msg: ChatMessage }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="flex-shrink-0 mt-1">
        <EddiOrb mode="DEEP" size="sm" fieldScore={89} />
      </div>
      <div className="flex-1 min-w-0 space-y-3">
        <div
          className="px-4 py-3 rounded-2xl rounded-tl-sm text-sm"
          style={{ background: `${GOLD}0d`, border: `1px solid ${GOLD}33` }}
        >
          <p className="text-white/90 leading-relaxed">{msg.content}</p>
          <p className="text-[10px] text-white/25 mt-1 font-mono">
            {msg.timestamp.toLocaleTimeString()} · ADEDDI v26
          </p>
        </div>
        {msg.trace && <ReasoningTrace trace={msg.trace} />}
      </div>
    </div>
  );
}

function ThinkingIndicator() {
  return (
    <div className="flex gap-3 items-start">
      <div className="flex-shrink-0 mt-1">
        <EddiOrb mode="DEEP" size="sm" />
      </div>
      <div
        className="px-4 py-3 rounded-2xl rounded-tl-sm"
        style={{ background: `${GOLD}0d`, border: `1px solid ${GOLD}33` }}
      >
        <div className="flex items-center gap-2 text-xs text-white/50">
          <Loader2 size={12} className="animate-spin" />
          <span>Running 7-layer ADEDDI chain…</span>
        </div>
        <div className="mt-2 flex gap-1">
          {["INPUT","CLASSIFY","COGT","META","AUTN","SYNTHESIS","SEAL"].map((layer, i) => (
            <motion.div
              key={layer}
              initial={{ opacity: 0.2 }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.18 }}
              className="text-[9px] font-mono px-1.5 py-0.5 rounded border"
              style={{ color: GOLD, borderColor: `${GOLD}33`, background: `${GOLD}11` }}
            >
              {layer}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function EddiDeepChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      role: "eddi",
      content:
        "Alpha Deep EDDI is active. I am running the full 7-layer reasoning chain: INPUT → CLASSIFY → COGT → META → AUTN → SYNTHESIS → SEAL. Every response I give you is fully traceable. Ask me anything — I will show you exactly how I reasoned.",
      timestamp: new Date(),
      trace: undefined,
    },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [showExamples, setShowExamples] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  const EXAMPLES = [
    "Explain the Fibonacci sequence and where it appears in nature",
    "What is the difference between knowledge and wisdom?",
    "How does ADEDDI's reasoning chain work?",
    "Derive the quadratic formula from first principles",
  ];

  const sendMessage = async (text: string) => {
    if (!text.trim() || thinking) return;
    setShowExamples(false);
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setThinking(true);

    // Simulate ADEDDI processing delay (PHI-gated: F(8)=21 * 100ms = 2.1s)
    await new Promise((r) => setTimeout(r, 2100));

    const trace = makeDemoTrace(text.trim());
    const eddiMsg: ChatMessage = {
      id: `e-${Date.now()}`,
      role: "eddi",
      content: trace.finalOutput,
      trace,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, eddiMsg]);
    setThinking(false);
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative">
      {/* Astro deep-space background */}
      <AstroBackground starCount={89} nebulaCount={5} showConstellation={false} />
      {/* Header */}
      <div
        className="sticky top-0 z-10 px-4 py-3 border-b border-white/5 flex items-center justify-between"
        style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(16px)" }}
      >
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="p-1.5 rounded-lg border border-white/10 text-white/40 hover:text-white/80 transition-colors"
          >
            <ArrowLeft size={14} />
          </Link>
          <EddiOrb mode="DEEP" size="sm" fieldScore={89} />
          <div>
            <p className="text-sm font-bold">Alpha Deep EDDI</p>
            <p className="text-[10px] text-white/40 font-mono">ADEDDI v26-ALPHA · 7-layer chain</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="text-[10px] font-mono px-2 py-1 rounded-full border"
            style={{ color: GOLD, borderColor: `${GOLD}44`, background: `${GOLD}11` }}
          >
            <Layers size={9} className="inline mr-1" />
            TRACE ON
          </span>
          <Link
            to="/eddi-os"
            className="text-[10px] font-mono px-2 py-1 rounded-full border border-white/10 text-white/40 hover:text-white/70 transition-colors flex items-center gap-1"
          >
            <Zap size={9} />
            OS Console
          </Link>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 max-w-3xl mx-auto w-full space-y-6">
        {/* Deep Kernel Panel — shown while chat is empty */}
        <AnimatePresence>
          {showExamples && messages.length <= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-4"
            >
              <DeepKernelPanel showEngines={true} showFib={true} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Welcome examples */}
        <AnimatePresence>
          {showExamples && messages.length <= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="grid grid-cols-2 gap-2 mb-2"
            >
              {EXAMPLES.map((ex) => (
                <button
                  key={ex}
                  onClick={() => sendMessage(ex)}
                  className="text-left p-3 rounded-xl border border-white/8 text-xs text-white/60 hover:text-white/90 hover:border-white/20 transition-all flex items-start gap-2"
                  style={{ background: `${PURPLE}08` }}
                >
                  <Sparkles size={11} className="mt-0.5 flex-shrink-0" style={{ color: PURPLE }} />
                  {ex}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {msg.role === "user" ? (
              <UserBubble msg={msg} />
            ) : (
              <EddiBubble msg={msg} />
            )}
          </motion.div>
        ))}

        {thinking && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ThinkingIndicator />
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        className="sticky bottom-0 border-t border-white/5 px-4 py-4"
        style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(16px)" }}
      >
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto flex gap-2 items-end"
        >
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(input);
                }
              }}
              placeholder="Ask Alpha Deep EDDI anything…"
              rows={1}
              className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-white/25 transition-colors"
              style={{ minHeight: 48, maxHeight: 144 }}
              disabled={thinking}
            />
            <div className="absolute bottom-2 right-3 flex items-center gap-2">
              <span className="text-[10px] text-white/20 font-mono">
                {thinking ? "thinking…" : "⏎ send"}
              </span>
            </div>
          </div>
          <button
            type="submit"
            disabled={!input.trim() || thinking}
            className="p-3 rounded-2xl border border-white/10 hover:border-white/30 text-white/50 hover:text-white/90 transition-all disabled:opacity-30 flex-shrink-0"
            style={input.trim() && !thinking ? { borderColor: `${GOLD}55`, color: GOLD } : {}}
          >
            {thinking ? <Loader2 size={18} className="animate-spin" /> : <SendHorizonal size={18} />}
          </button>
        </form>
        <p className="text-center text-[10px] text-white/15 font-mono mt-2">
          Alpha Deep EDDI · 7-layer sovereign reasoning · Full trace · ICP on-chain · v26
        </p>
        <p className="text-center text-[10px] text-white/10 mt-0.5 flex items-center justify-center gap-1">
          <ChevronRight size={9} /> Running in demo mode — wire chatDeep() to enable live ADEDDI calls
        </p>
      </div>
    </div>
  );
}
