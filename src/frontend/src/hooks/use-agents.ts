import { createActor } from "@/backend";
import type { Agent as BackendAgent } from "@/backend";
import { AgentRole } from "@/backend";
import type { AgentMeta } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

const AGENT_META: Record<
  string,
  { emoji: string; tagline: string; color: string }
> = {
  [AgentRole.explainer]: {
    emoji: "🦉",
    tagline: "Breaks down any concept clearly and patiently",
    color: "bg-primary/10 border-primary/20 text-primary",
  },
  [AgentRole.quizmaster]: {
    emoji: "🎯",
    tagline: "Challenges you with smart questions to build mastery",
    color: "bg-accent/20 border-accent/30 text-accent-foreground",
  },
  [AgentRole.encourager]: {
    emoji: "⭐",
    tagline: "Keeps you motivated and celebrates every win",
    color: "bg-secondary/60 border-secondary text-secondary-foreground",
  },
};

export function useAgents() {
  const { actor, isFetching } = useActor(createActor);

  const agentsQuery = useQuery<BackendAgent[]>({
    queryKey: ["agents"],
    queryFn: async (): Promise<BackendAgent[]> => {
      if (!actor) return [];
      return actor.getAgents() as unknown as Promise<BackendAgent[]>;
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });

  const agentsMeta: AgentMeta[] = (
    (agentsQuery.data ?? []) as BackendAgent[]
  ).map((agent: BackendAgent) => {
    const roleKey =
      typeof agent.role === "string" ? agent.role : Object.keys(agent.role)[0];
    const meta = AGENT_META[roleKey] ?? {
      emoji: "🤖",
      tagline: "Your AI learning companion",
      color: "bg-muted",
    };
    return {
      id: agent.id,
      name: agent.name,
      role: agent.role,
      emoji: meta.emoji,
      tagline: meta.tagline,
      color: meta.color,
    };
  });

  return {
    agents: agentsQuery.data ?? ([] as BackendAgent[]),
    agentsMeta,
    isLoading: agentsQuery.isLoading || isFetching,
    isError: agentsQuery.isError,
  };
}

export function useAgentRegistry() {
  const { actor, isFetching } = useActor(createActor);

  const workspacesQuery = useQuery<string[]>({
    queryKey: ["workspaces"],
    queryFn: async (): Promise<string[]> => {
      if (!actor) return [];
      return actor.getWorkspaces();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });

  const alphaAgentsQuery = useQuery<BackendAgent[]>({
    queryKey: ["agents", "workspace", "alpha"],
    queryFn: async (): Promise<BackendAgent[]> => {
      if (!actor) return [];
      return actor.getAgentsByWorkspace("alpha") as unknown as Promise<
        BackendAgent[]
      >;
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });

  return {
    workspaces: workspacesQuery.data ?? [],
    alphaAgents: alphaAgentsQuery.data ?? [],
    isLoading:
      workspacesQuery.isLoading || alphaAgentsQuery.isLoading || isFetching,
    isError: workspacesQuery.isError || alphaAgentsQuery.isError,
  };
}
