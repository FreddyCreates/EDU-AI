import { f as useActor, A as AgentRole, h as createActor } from "./index-BivnQ6bB.js";
import { a as useQuery } from "./query-8urnerR0.js";
const AGENT_META = {
  [AgentRole.explainer]: {
    emoji: "🦉",
    tagline: "Breaks down any concept clearly and patiently",
    color: "bg-primary/10 border-primary/20 text-primary"
  },
  [AgentRole.quizmaster]: {
    emoji: "🎯",
    tagline: "Challenges you with smart questions to build mastery",
    color: "bg-accent/20 border-accent/30 text-accent-foreground"
  },
  [AgentRole.encourager]: {
    emoji: "⭐",
    tagline: "Keeps you motivated and celebrates every win",
    color: "bg-secondary/60 border-secondary text-secondary-foreground"
  }
};
function useAgents() {
  const { actor, isFetching } = useActor(createActor);
  const agentsQuery = useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAgents();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1e3 * 60 * 5
  });
  const agentsMeta = (agentsQuery.data ?? []).map((agent) => {
    const roleKey = typeof agent.role === "string" ? agent.role : Object.keys(agent.role)[0];
    const meta = AGENT_META[roleKey] ?? {
      emoji: "🤖",
      tagline: "Your AI learning companion",
      color: "bg-muted"
    };
    return {
      id: agent.id,
      name: agent.name,
      role: agent.role,
      emoji: meta.emoji,
      tagline: meta.tagline,
      color: meta.color
    };
  });
  return {
    agents: agentsQuery.data ?? [],
    agentsMeta,
    isLoading: agentsQuery.isLoading || isFetching,
    isError: agentsQuery.isError
  };
}
function useAgentRegistry() {
  const { actor, isFetching } = useActor(createActor);
  const workspacesQuery = useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getWorkspaces();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1e3 * 60 * 5
  });
  const alphaAgentsQuery = useQuery({
    queryKey: ["agents", "workspace", "alpha"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAgentsByWorkspace("alpha");
    },
    enabled: !!actor && !isFetching,
    staleTime: 1e3 * 60 * 5
  });
  return {
    workspaces: workspacesQuery.data ?? [],
    alphaAgents: alphaAgentsQuery.data ?? [],
    isLoading: workspacesQuery.isLoading || alphaAgentsQuery.isLoading || isFetching,
    isError: workspacesQuery.isError || alphaAgentsQuery.isError
  };
}
export {
  useAgentRegistry as a,
  useAgents as u
};
