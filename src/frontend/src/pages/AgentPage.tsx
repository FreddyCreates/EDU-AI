import { createActor } from "@/backend";
import type { Agent as BackendAgent } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAutoSeal, usePassportStats } from "@/hooks/use-passport";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearch } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Send, Shield, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface AgentFlavour {
  emoji: string;
  intro: string;
  firstMessage: string;
  accentColor: string;
  glowColor: string;
  borderColor: string;
  idTag: string;
  substrate: string;
  domain: string;
}

const FEATURED: Record<string, AgentFlavour> = {
  sage: {
    emoji: "🦉",
    idTag: "SAGE",
    substrate: "ICPM",
    domain: "Concept Translation",
    intro:
      "Sage explains every concept from first principles — clearly, patiently, at exactly your level.",
    firstMessage: "Hello, I'm Sage. What do you want to understand today?",
    accentColor: "oklch(0.78 0.22 200)",
    glowColor: "rgba(0,210,255,0.20)",
    borderColor: "rgba(0,210,255,0.30)",
  },
  quill: {
    emoji: "📝",
    idTag: "QUIL",
    substrate: "ICPM",
    domain: "Assessment",
    intro: "Quill builds mastery through creation — every question is a seed.",
    firstMessage: "Hi, I'm Quill. What shall we test today?",
    accentColor: "oklch(0.75 0.16 70)",
    glowColor: "rgba(255,185,0,0.20)",
    borderColor: "rgba(255,185,0,0.30)",
  },
  spark: {
    emoji: "⚡",
    idTag: "SPRK",
    substrate: "EART",
    domain: "Motivation",
    intro:
      "Spark keeps you moving — celebrating every win on the way to mastery.",
    firstMessage:
      "Hey! Let's keep that momentum going — what are you working on?",
    accentColor: "oklch(0.75 0.16 70)",
    glowColor: "rgba(255,185,0,0.20)",
    borderColor: "rgba(255,185,0,0.30)",
  },
  nova: {
    emoji: "✨",
    idTag: "NOVX",
    substrate: "JLIA",
    domain: "Cross-Subject Links",
    intro:
      "Nova discovers hidden connections across subjects — illuminating the bigger picture.",
    firstMessage: "Hello, I'm Nova. What shall we explore together?",
    accentColor: "oklch(0.68 0.18 280)",
    glowColor: "rgba(160,100,255,0.20)",
    borderColor: "rgba(160,100,255,0.30)",
  },
};

const DEFAULT_FLAVOUR: AgentFlavour = {
  emoji: "🤖",
  idTag: "AGNT",
  substrate: "ICPM",
  domain: "General",
  intro: "Your sovereign AI learning companion.",
  firstMessage: "Hello! What would you like to explore today?",
  accentColor: "oklch(0.62 0.20 260)",
  glowColor: "rgba(100,130,255,0.18)",
  borderColor: "rgba(100,130,255,0.25)",
};

function flavourFor(name: string): AgentFlavour {
  return FEATURED[name.toLowerCase()] ?? DEFAULT_FLAVOUR;
}

function useAgentByName(name: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<BackendAgent | null>({
    queryKey: ["agent", name],
    queryFn: async (): Promise<BackendAgent | null> => {
      if (!actor) return null;
      return (await actor.getAgent(name)) as BackendAgent | null;
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export default function AgentPage() {
  const { agentName } = useParams({ strict: false }) as { agentName: string };
  const { actor } = useActor(createActor);
  const search = useSearch({ strict: false }) as Record<
    string,
    string | undefined
  >;
  const topic: string | undefined = search?.topic;
  const subject: string | undefined = search?.subject;
  const gradeLevel: string = search?.grade ?? "6";

  const agentRoleMap: Record<string, string> = {
    sage: "explainer",
    quill: "quizmaster",
    spark: "encourager",
    nova: "curator",
  };
  const agentRole = agentRoleMap[agentName.toLowerCase()] ?? "curator";

  const flavour = flavourFor(agentName);
  const { data: agent, isLoading: agentLoading } = useAgentByName(agentName);
  const { data: passportStats } = usePassportStats();
  const autoSeal = useAutoSeal();

  interface MsgItem {
    role: "student" | "agent";
    text: string;
    id: number;
  }

  const [messages, setMessages] = useState<MsgItem[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [sessionSealed, setSessionSealed] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on every message change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: run once on mount
  useEffect(() => {
    if (!actor || messages.length > 0) return;
    let cancelled = false;
    setIsLoading(true);
    actor
      .askAgent(
        agentRole,
        "introduce yourself and ask the student what topic they want to explore today",
        topic ?? "General Learning",
        subject ?? "General",
        gradeLevel,
        BigInt(0),
      )
      .then((res) => {
        if (!cancelled)
          setMessages([{ role: "agent", text: res, id: Date.now() }]);
      })
      .catch(() => {
        if (!cancelled)
          setMessages([
            { role: "agent", text: flavour.firstMessage, id: Date.now() },
          ]);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [actor]);

  async function sendMessage() {
    if (!input.trim() || isLoading || !actor) return;
    const userText = input.trim();
    setInput("");
    setMessages((prev) => [
      ...prev,
      { role: "student", text: userText, id: Date.now() },
    ]);
    setIsLoading(true);
    const newCount = messageCount + 1;
    setMessageCount(newCount);
    try {
      const response = await actor.askAgent(
        agentRole,
        userText,
        topic ?? "General Learning",
        subject ?? "General",
        gradeLevel,
        BigInt(newCount),
      );
      setMessages((prev) => [
        ...prev,
        { role: "agent", text: response, id: Date.now() },
      ]);
    } catch {
      try {
        const response = await actor.askAgent(
          agentRole,
          userText,
          topic ?? "General Learning",
          subject ?? "General",
          gradeLevel,
          BigInt(newCount),
        );
        setMessages((prev) => [
          ...prev,
          { role: "agent", text: response, id: Date.now() },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "agent",
            text: "Let's keep going — what would you like to explore?",
            id: Date.now(),
          },
        ]);
      }
    } finally {
      setIsLoading(false);
      setTimeout(() => textareaRef.current?.focus(), 50);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 80)}px`;
  }

  async function handleSealSession() {
    const lastAgent = [...messages].reverse().find((m) => m.role === "agent");
    if (!lastAgent) return;
    try {
      await autoSeal.mutateAsync({
        summary: lastAgent.text.slice(0, 200),
        engineUsed: agentRole,
        subject: subject ?? "General",
        gradeLevel: gradeLevel ?? "K",
      });
      setSessionSealed(true);
      toast.success("Session sealed to your passport!");
    } catch {
      toast.error("Seal failed — try again.");
    }
  }

  const displayName =
    agent?.name ?? agentName.charAt(0).toUpperCase() + agentName.slice(1);
  const taglineMap: Record<string, string> = {
    sage: "Concept Explainer",
    quill: "Quiz Master",
    spark: "Your Encourager",
    nova: "Learning Curator",
  };
  const tagline = taglineMap[agentName.toLowerCase()] ?? "AI Learning Guide";
  const showSealButton =
    messages.length >= 3 &&
    !sessionSealed &&
    messages.some((m) => m.role === "agent");

  return (
    <div
      className="flex flex-col h-[calc(100vh-4rem)] max-w-3xl mx-auto"
      data-ocid="agent_page.page"
    >
      {/* Glass header */}
      <div
        className="glass-sm flex items-center gap-3 px-4 py-3 border-b shrink-0"
        style={{ borderColor: flavour.borderColor }}
      >
        <Link
          to="/agents"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors shrink-0"
          data-ocid="agent_page.back_link"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Agents</span>
        </Link>

        <div
          className="glass rounded-xl px-2.5 py-1 font-mono text-sm font-black shrink-0"
          style={{
            color: flavour.accentColor,
            border: `1px solid ${flavour.borderColor}`,
          }}
        >
          {flavour.idTag}
        </div>

        <div className="min-w-0 flex-1">
          {agentLoading ? (
            <Skeleton className="h-5 w-24" />
          ) : (
            <>
              <h1
                className="font-display font-bold text-base leading-tight"
                style={{ color: flavour.accentColor }}
              >
                {displayName}
              </h1>
              <p className="text-xs text-muted-foreground">
                {tagline} · {flavour.substrate}
              </p>
            </>
          )}
        </div>

        {topic && (
          <Badge variant="outline" className="text-xs shrink-0 glass-sm">
            {decodeURIComponent(topic)}
          </Badge>
        )}
        <div className="flex items-center gap-1.5 shrink-0">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "oklch(0.72 0.17 155)" }}
          />
          <span
            className="text-xs font-mono"
            style={{ color: "oklch(0.72 0.17 155)" }}
          >
            LIVE
          </span>
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
        data-ocid="agent_page.chat_list"
      >
        {messages.map((msg) => {
          const isAgent = msg.role === "agent";
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22 }}
              className={`flex gap-3 ${isAgent ? "items-start" : "items-start flex-row-reverse"}`}
            >
              {isAgent ? (
                <div
                  className="glass-sm w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-sm"
                  style={{ border: `1px solid ${flavour.borderColor}` }}
                >
                  {flavour.emoji}
                </div>
              ) : (
                <div
                  className="glass w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold"
                  style={{ color: "oklch(0.62 0.20 260)" }}
                >
                  You
                </div>
              )}
              <div
                className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  isAgent ? "glass rounded-tl-sm" : "rounded-tr-sm"
                }`}
                style={
                  isAgent
                    ? { border: `1px solid ${flavour.borderColor}` }
                    : {
                        background: flavour.accentColor,
                        color: "oklch(0.07 0.01 260)",
                      }
                }
              >
                {msg.text}
              </div>
            </motion.div>
          );
        })}

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 items-start"
            data-ocid="agent_page.loading_state"
          >
            <div
              className="glass-sm w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-sm"
              style={{ border: `1px solid ${flavour.borderColor}` }}
            >
              {flavour.emoji}
            </div>
            <div className="glass rounded-2xl rounded-tl-sm px-4 py-2.5 flex gap-1 items-center">
              {[0, 0.15, 0.3].map((delay) => (
                <motion.span
                  key={delay}
                  className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 1,
                    delay,
                  }}
                />
              ))}
              <span className="text-xs text-muted-foreground ml-1">
                Thinking…
              </span>
            </div>
          </motion.div>
        )}

        {showSealButton && (
          <div
            className="flex justify-center"
            data-ocid="agent_page.seal_section"
          >
            <button
              type="button"
              data-ocid="agent_page.seal_button"
              onClick={handleSealSession}
              disabled={autoSeal.isPending}
              className="glass-sm rounded-full px-4 py-1.5 text-xs font-mono font-semibold transition-smooth hover:scale-105 disabled:opacity-50"
              style={{
                color: flavour.accentColor,
                border: `1px solid ${flavour.borderColor}`,
              }}
            >
              {autoSeal.isPending ? "Sealing…" : "✦ Seal this session"}
            </button>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Glass input area */}
      <div
        className="glass-sm shrink-0 border-t px-4 py-3"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="flex gap-2 items-end">
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder={`Ask ${displayName} anything…`}
            disabled={isLoading}
            data-ocid="agent_page.chat_input"
            className="flex-1 min-w-0 glass rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 transition-smooth disabled:opacity-50 resize-none overflow-hidden leading-relaxed"
            style={{
              minHeight: "40px",
              maxHeight: "80px",
              border: `1px solid ${flavour.borderColor}`,
            }}
          />
          <button
            type="button"
            disabled={!input.trim() || isLoading || !actor}
            onClick={sendMessage}
            data-ocid="agent_page.send_button"
            className="glass-sm rounded-xl px-3 h-10 shrink-0 flex items-center justify-center transition-smooth hover:scale-105 disabled:opacity-40"
            style={{
              border: `1px solid ${flavour.borderColor}`,
              color: flavour.accentColor,
            }}
          >
            <Send className="w-4 h-4" />
            <span className="sr-only">Send</span>
          </button>
        </div>
        <p className="text-[11px] text-muted-foreground mt-1.5 text-center font-mono">
          {passportStats ? (
            <span>
              {Number(passportStats.totalSeeds)} seeds · Score:{" "}
              {passportStats.compoundScore.toFixed(2)}
            </span>
          ) : (
            "Seal a session to begin your passport"
          )}
          {" · "}Enter to send
        </p>
      </div>
    </div>
  );
}
