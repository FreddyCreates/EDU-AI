import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useActor } from "@caffeineai/core-infrastructure";
import { useAgents, useAgentRegistry } from "../../hooks/use-agents";
import type { ReactNode } from "react";

// Mock the modules
vi.mock("@caffeineai/core-infrastructure", () => ({
  useActor: vi.fn(),
}));

vi.mock("@/backend", () => ({
  createActor: vi.fn(),
  AgentRole: {
    explainer: "explainer",
    quizmaster: "quizmaster",
    encourager: "encourager",
    guide: "guide",
    assessor: "assessor",
    curator: "curator",
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useAgents hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("initial state", () => {
    it("should return empty agents when actor is not ready", () => {
      vi.mocked(useActor).mockReturnValue({
        actor: null,
        isFetching: false,
      } as ReturnType<typeof useActor>);

      const { result } = renderHook(() => useAgents(), {
        wrapper: createWrapper(),
      });

      expect(result.current.agents).toEqual([]);
      expect(result.current.agentsMeta).toEqual([]);
      expect(result.current.isLoading).toBe(false);
    });

    it("should show loading when actor is fetching", () => {
      vi.mocked(useActor).mockReturnValue({
        actor: null,
        isFetching: true,
      } as ReturnType<typeof useActor>);

      const { result } = renderHook(() => useAgents(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(true);
    });
  });

  describe("with actor ready", () => {
    it("should fetch agents when actor is ready", async () => {
      const mockAgents = [
        {
          id: "ALPHA-1",
          name: "Sage",
          role: { explainer: null },
          isActive: true,
          engine: "SovereignResponses",
          protocols: ["concept-explanation"],
          version: "1.0.0",
          registeredAt: BigInt(Date.now() * 1_000_000),
          workspace: "alpha",
          systemPrompt: "Test prompt",
        },
        {
          id: "ALPHA-2",
          name: "Quill",
          role: { quizmaster: null },
          isActive: true,
          engine: "SovereignResponses",
          protocols: ["question-generation"],
          version: "1.0.0",
          registeredAt: BigInt(Date.now() * 1_000_000),
          workspace: "alpha",
          systemPrompt: "Test prompt",
        },
      ];

      const mockActor = {
        getAgents: vi.fn().mockResolvedValue(mockAgents),
      };

      vi.mocked(useActor).mockReturnValue({
        actor: mockActor,
        isFetching: false,
      } as unknown as ReturnType<typeof useActor>);

      const { result } = renderHook(() => useAgents(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.agents).toEqual(mockAgents);
      });

      expect(mockActor.getAgents).toHaveBeenCalled();
    });

    it("should enrich agents with metadata", async () => {
      const mockAgents = [
        {
          id: "ALPHA-1",
          name: "Sage",
          role: "explainer",
          isActive: true,
          engine: "SovereignResponses",
          protocols: ["concept-explanation"],
          version: "1.0.0",
          registeredAt: BigInt(Date.now() * 1_000_000),
          workspace: "alpha",
          systemPrompt: "Test prompt",
        },
      ];

      const mockActor = {
        getAgents: vi.fn().mockResolvedValue(mockAgents),
      };

      vi.mocked(useActor).mockReturnValue({
        actor: mockActor,
        isFetching: false,
      } as unknown as ReturnType<typeof useActor>);

      const { result } = renderHook(() => useAgents(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.agentsMeta.length).toBe(1);
        expect(result.current.agentsMeta[0]).toMatchObject({
          id: "ALPHA-1",
          name: "Sage",
          emoji: "🦉",
          tagline: "Breaks down any concept clearly and patiently",
        });
      });
    });

    it("should handle quizmaster role metadata", async () => {
      const mockAgents = [
        {
          id: "ALPHA-2",
          name: "Quill",
          role: "quizmaster",
          isActive: true,
          engine: "SovereignResponses",
          protocols: ["question-generation"],
          version: "1.0.0",
          registeredAt: BigInt(Date.now() * 1_000_000),
          workspace: "alpha",
          systemPrompt: "Test prompt",
        },
      ];

      const mockActor = {
        getAgents: vi.fn().mockResolvedValue(mockAgents),
      };

      vi.mocked(useActor).mockReturnValue({
        actor: mockActor,
        isFetching: false,
      } as unknown as ReturnType<typeof useActor>);

      const { result } = renderHook(() => useAgents(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.agentsMeta[0]).toMatchObject({
          emoji: "🎯",
          tagline: "Challenges you with smart questions to build mastery",
        });
      });
    });

    it("should handle encourager role metadata", async () => {
      const mockAgents = [
        {
          id: "ALPHA-3",
          name: "Spark",
          role: "encourager",
          isActive: true,
          engine: "SovereignResponses",
          protocols: ["positive-reinforcement"],
          version: "1.0.0",
          registeredAt: BigInt(Date.now() * 1_000_000),
          workspace: "alpha",
          systemPrompt: "Test prompt",
        },
      ];

      const mockActor = {
        getAgents: vi.fn().mockResolvedValue(mockAgents),
      };

      vi.mocked(useActor).mockReturnValue({
        actor: mockActor,
        isFetching: false,
      } as unknown as ReturnType<typeof useActor>);

      const { result } = renderHook(() => useAgents(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.agentsMeta[0]).toMatchObject({
          emoji: "⭐",
          tagline: "Keeps you motivated and celebrates every win",
        });
      });
    });

    it("should handle unknown role with default metadata", async () => {
      const mockAgents = [
        {
          id: "ALPHA-X",
          name: "Unknown",
          role: "unknown_role",
          isActive: true,
          engine: "SovereignResponses",
          protocols: [],
          version: "1.0.0",
          registeredAt: BigInt(Date.now() * 1_000_000),
          workspace: "alpha",
          systemPrompt: "Test prompt",
        },
      ];

      const mockActor = {
        getAgents: vi.fn().mockResolvedValue(mockAgents),
      };

      vi.mocked(useActor).mockReturnValue({
        actor: mockActor,
        isFetching: false,
      } as unknown as ReturnType<typeof useActor>);

      const { result } = renderHook(() => useAgents(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.agentsMeta[0]).toMatchObject({
          emoji: "🤖",
          tagline: "Your AI learning companion",
          color: "bg-muted",
        });
      });
    });
  });

  describe("error handling", () => {
    it("should handle API errors gracefully", async () => {
      const mockActor = {
        getAgents: vi.fn().mockRejectedValue(new Error("API Error")),
      };

      vi.mocked(useActor).mockReturnValue({
        actor: mockActor,
        isFetching: false,
      } as unknown as ReturnType<typeof useActor>);

      const { result } = renderHook(() => useAgents(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });
    });
  });
});

describe("useAgentRegistry hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("initial state", () => {
    it("should return empty data when actor is not ready", () => {
      vi.mocked(useActor).mockReturnValue({
        actor: null,
        isFetching: false,
      } as ReturnType<typeof useActor>);

      const { result } = renderHook(() => useAgentRegistry(), {
        wrapper: createWrapper(),
      });

      expect(result.current.workspaces).toEqual([]);
      expect(result.current.alphaAgents).toEqual([]);
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe("with actor ready", () => {
    it("should fetch workspaces and alpha agents", async () => {
      const mockWorkspaces = ["alpha", "beta", "gamma"];
      const mockAlphaAgents = [
        {
          id: "ALPHA-1",
          name: "Sage",
          role: { explainer: null },
          workspace: "alpha",
        },
        {
          id: "ALPHA-2",
          name: "Quill",
          role: { quizmaster: null },
          workspace: "alpha",
        },
      ];

      const mockActor = {
        getWorkspaces: vi.fn().mockResolvedValue(mockWorkspaces),
        getAgentsByWorkspace: vi.fn().mockResolvedValue(mockAlphaAgents),
      };

      vi.mocked(useActor).mockReturnValue({
        actor: mockActor,
        isFetching: false,
      } as unknown as ReturnType<typeof useActor>);

      const { result } = renderHook(() => useAgentRegistry(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.workspaces).toEqual(mockWorkspaces);
        expect(result.current.alphaAgents).toEqual(mockAlphaAgents);
      });

      expect(mockActor.getWorkspaces).toHaveBeenCalled();
      expect(mockActor.getAgentsByWorkspace).toHaveBeenCalledWith("alpha");
    });
  });

  describe("error handling", () => {
    it("should handle workspace fetch error", async () => {
      const mockActor = {
        getWorkspaces: vi.fn().mockRejectedValue(new Error("Workspace Error")),
        getAgentsByWorkspace: vi.fn().mockResolvedValue([]),
      };

      vi.mocked(useActor).mockReturnValue({
        actor: mockActor,
        isFetching: false,
      } as unknown as ReturnType<typeof useActor>);

      const { result } = renderHook(() => useAgentRegistry(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });
    });

    it("should handle agent fetch error", async () => {
      const mockActor = {
        getWorkspaces: vi.fn().mockResolvedValue(["alpha"]),
        getAgentsByWorkspace: vi.fn().mockRejectedValue(new Error("Agent Error")),
      };

      vi.mocked(useActor).mockReturnValue({
        actor: mockActor,
        isFetching: false,
      } as unknown as ReturnType<typeof useActor>);

      const { result } = renderHook(() => useAgentRegistry(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });
    });
  });
});
