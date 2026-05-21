import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAgentRegistry, useAgents } from "@/hooks/use-agents";
import { Link } from "@tanstack/react-router";
import { Bot, Lock, Search, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

// ─── Static agent entries with sovereign OS identity ──────────────────────────
const SOVEREIGN_AGENTS = [
  {
    id: "SAGE",
    name: "Sage",
    role: "Explainer",
    substrate: "ICPM",
    domain: "Concept Translation",
    coh: 89,
    sessions: 3421,
    status: "active",
    routeId: "sage",
  },
  {
    id: "QUIL",
    name: "Quill",
    role: "Quizmaster",
    substrate: "ICPM",
    domain: "Assessment",
    coh: 82,
    sessions: 2198,
    status: "active",
    routeId: "quill",
  },
  {
    id: "SPRK",
    name: "Spark",
    role: "Encourager",
    substrate: "EART",
    domain: "Motivation",
    coh: 95,
    sessions: 4102,
    status: "active",
    routeId: "spark",
  },
  {
    id: "NOVX",
    name: "Nova",
    role: "Curator",
    substrate: "JLIA",
    domain: "Cross-Subject Links",
    coh: 77,
    sessions: 1883,
    status: "active",
    routeId: "nova",
  },
  {
    id: "ATLS",
    name: "Atlas",
    role: "Guide",
    substrate: "ICPM",
    domain: "Curriculum Navigation",
    coh: 91,
    sessions: 2750,
    status: "active",
    routeId: "atlas",
  },
  {
    id: "ECHO",
    name: "Echo",
    role: "Assessor",
    substrate: "EMRT",
    domain: "Mastery Detection",
    coh: 68,
    sessions: 1245,
    status: "idle",
    routeId: "echo",
  },
];

const SUBSTRATE_ACCENT: Record<string, { color: string; ring: string }> = {
  ICPM: { color: "oklch(0.78 0.22 200)", ring: "rgba(0,210,255,0.25)" },
  JLIA: { color: "oklch(0.68 0.18 280)", ring: "rgba(160,100,255,0.25)" },
  EART: { color: "oklch(0.75 0.16 70)", ring: "rgba(255,185,0,0.25)" },
  EMRT: { color: "oklch(0.72 0.17 155)", ring: "rgba(0,220,130,0.25)" },
};

function CohBar({ value }: { value: number }) {
  // Fibonacci-step thresholds: 55, 89, 144 (capped at 100)
  const fibColor =
    value >= 89
      ? "oklch(0.72 0.17 155)"
      : value >= 55
        ? "oklch(0.75 0.16 70)"
        : "oklch(0.65 0.22 22)";
  return (
    <div
      className="w-full h-1.5 rounded-full overflow-hidden"
      style={{ background: "rgba(255,255,255,0.08)" }}
    >
      <div
        className="h-full rounded-full transition-smooth"
        style={{ width: `${value}%`, background: fibColor }}
      />
    </div>
  );
}

function AgentCard({
  agent,
  index,
}: { agent: (typeof SOVEREIGN_AGENTS)[0]; index: number }) {
  const accent = SUBSTRATE_ACCENT[agent.substrate] ?? SUBSTRATE_ACCENT.ICPM;
  const isActive = agent.status === "active";
  return (
    <motion.div
      initial={{ opacity: 0, y: 13 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.32, delay: index * 0.05 }}
      data-ocid={`agent_registry.agent_card.${index}`}
    >
      <Link
        to="/agents/$agentName"
        params={{ agentName: agent.routeId } as never}
      >
        <div
          className="glass rounded-2xl p-5 flex flex-col gap-4 transition-smooth hover:-translate-y-1 cursor-pointer glass-shimmer"
          style={{
            boxShadow: `0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px ${accent.ring}, inset 0 1px 0 rgba(255,255,255,0.06)`,
          }}
        >
          {/* Top row */}
          <div className="flex items-start justify-between gap-3">
            <div
              className="glass-sm rounded-xl px-2.5 py-1.5 font-mono text-lg font-black tracking-widest"
              style={{ color: accent.color, letterSpacing: "0.15em" }}
            >
              {agent.id}
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{
                  background: isActive
                    ? "oklch(0.72 0.17 155)"
                    : "oklch(0.55 0.01 260)",
                }}
              />
              <span
                className="text-[11px] font-mono uppercase tracking-widest"
                style={{
                  color: isActive
                    ? "oklch(0.72 0.17 155)"
                    : "oklch(0.45 0.01 260)",
                }}
              >
                {isActive ? "ACTIVE" : "IDLE"}
              </span>
            </div>
          </div>

          {/* Name + role */}
          <div>
            <h3 className="font-display font-bold text-base text-foreground">
              {agent.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {agent.domain}
            </p>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-1.5">
            <span
              className="glass-sm text-[11px] font-mono px-2 py-0.5 rounded-full"
              style={{
                color: accent.color,
                border: `1px solid ${accent.ring}`,
              }}
            >
              {agent.substrate}
            </span>
            <span className="glass-sm text-[11px] px-2 py-0.5 rounded-full text-muted-foreground">
              {agent.role}
            </span>
          </div>

          {/* COH bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                COH AVG
              </span>
              <span
                className="text-[10px] font-mono"
                style={{ color: accent.color }}
              >
                {agent.coh}
              </span>
            </div>
            <CohBar value={agent.coh} />
          </div>

          {/* Sessions */}
          <div
            className="flex justify-between items-center pt-1 border-t"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              Sessions
            </span>
            <span className="text-xs font-mono text-foreground">
              {agent.sessions.toLocaleString()}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function AgentRegistry() {
  const { alphaAgents, isLoading } = useAgentRegistry();
  const [search, setSearch] = useState("");
  const [subFilter, setSubFilter] = useState<string | null>(null);

  const agents = SOVEREIGN_AGENTS;
  const filtered = agents.filter((a) => {
    const matchesSearch =
      !search ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.role.toLowerCase().includes(search.toLowerCase());
    const matchesSub = !subFilter || a.substrate === subFilter;
    return matchesSearch && matchesSub;
  });

  const substrates = Array.from(new Set(agents.map((a) => a.substrate)));
  const _ = { alphaAgents, isLoading };

  return (
    <div
      className="max-w-6xl mx-auto px-5 py-10 space-y-8"
      data-ocid="agent_registry.page"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-2"
      >
        <div className="flex items-center gap-3">
          <div
            className="glass rounded-xl p-2.5"
            style={{ boxShadow: "0 0 24px rgba(160,100,255,0.18)" }}
          >
            <Bot
              className="w-5 h-5"
              style={{ color: "oklch(0.68 0.18 280)" }}
            />
          </div>
          <div>
            <h1 className="font-display font-black text-2xl tracking-tight text-foreground">
              SOVEREIGN AGENTS
            </h1>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
              Agent Registry · {agents.length} Deployed
            </p>
          </div>
          <div className="ml-auto">
            <span
              className="glass-sm rounded-full px-3 py-1 text-xs font-mono font-bold"
              style={{
                color: "oklch(0.68 0.18 280)",
                border: "1px solid rgba(160,100,255,0.3)",
              }}
            >
              {agents.length}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Glass control strip */}
      <div
        className="glass rounded-2xl p-4 flex flex-col sm:flex-row gap-3"
        data-ocid="agent_registry.filter_strip"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search agents…"
            data-ocid="agent_registry.search_input"
            className="w-full glass-sm rounded-xl pl-8 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-white/20 transition-smooth"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            type="button"
            data-ocid="agent_registry.filter_all_tab"
            onClick={() => setSubFilter(null)}
            className="px-3 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-smooth"
            style={{
              background: !subFilter ? "rgba(255,255,255,0.1)" : "transparent",
              border: "1px solid rgba(255,255,255,0.1)",
              color: !subFilter
                ? "oklch(0.95 0.005 260)"
                : "oklch(0.55 0.01 260)",
            }}
          >
            ALL
          </button>
          {substrates.map((s) => {
            const ac = SUBSTRATE_ACCENT[s] ?? SUBSTRATE_ACCENT.ICPM;
            return (
              <button
                key={s}
                type="button"
                data-ocid={`agent_registry.filter_${s.toLowerCase()}_tab`}
                onClick={() => setSubFilter(subFilter === s ? null : s)}
                className="px-3 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-smooth"
                style={{
                  background: subFilter === s ? `${ac.ring}` : "transparent",
                  border: `1px solid ${ac.ring}`,
                  color: subFilter === s ? ac.color : "oklch(0.55 0.01 260)",
                }}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* Agent grid */}
      {filtered.length > 0 ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          data-ocid="agent_registry.agents_section"
        >
          {filtered.map((a, i) => (
            <AgentCard key={a.id} agent={a} index={i + 1} />
          ))}
        </div>
      ) : (
        <div
          className="glass rounded-2xl p-12 flex flex-col items-center gap-4"
          data-ocid="agent_registry.agents_empty_state"
        >
          <div className="glass-sm rounded-2xl p-4">
            <Lock className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="font-mono text-sm text-muted-foreground uppercase tracking-widest">
            No agents registered
          </p>
        </div>
      )}

      {/* Registry footer */}
      <div
        className="glass-sm rounded-xl px-5 py-3 flex items-center justify-between"
        data-ocid="agent_registry.footer"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          ALPH · ENGR · Agent Layer
        </span>
        <div className="flex items-center gap-1.5">
          <ShieldCheck
            className="w-3 h-3"
            style={{ color: "oklch(0.68 0.18 280)" }}
          />
          <span
            className="text-[10px] font-mono"
            style={{ color: "oklch(0.68 0.18 280)" }}
          >
            LEX_SVRN ENFORCED
          </span>
        </div>
      </div>
    </div>
  );
}
