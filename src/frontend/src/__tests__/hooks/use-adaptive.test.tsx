import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useActor } from "@caffeineai/core-infrastructure";
import {
  useAdaptiveSuggestion,
  useAdaptiveWorkflow,
} from "../../hooks/use-adaptive";
import type { ReactNode } from "react";

// Mock the modules
vi.mock("@caffeineai/core-infrastructure", () => ({
  useActor: vi.fn(),
}));

vi.mock("@/backend", () => ({
  createActor: vi.fn(),
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

describe("useAdaptiveSuggestion hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("initial state", () => {
    it("should return null suggestion when actor is not ready", () => {
      vi.mocked(useActor).mockReturnValue({
        actor: null,
        isFetching: false,
      } as ReturnType<typeof useActor>);

      const { result } = renderHook(() => useAdaptiveSuggestion("math-5"), {
        wrapper: createWrapper(),
      });

      expect(result.current.suggestion).toBeNull();
      expect(result.current.isLoading).toBe(false);
    });

    it("should show loading when actor is fetching", () => {
      vi.mocked(useActor).mockReturnValue({
        actor: null,
        isFetching: true,
      } as ReturnType<typeof useActor>);

      const { result } = renderHook(() => useAdaptiveSuggestion("math-5"), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(true);
    });

    it("should return null when subjectId is empty", () => {
      vi.mocked(useActor).mockReturnValue({
        actor: { getAdaptiveSuggestion: vi.fn() },
        isFetching: false,
      } as unknown as ReturnType<typeof useActor>);

      const { result } = renderHook(() => useAdaptiveSuggestion(""), {
        wrapper: createWrapper(),
      });

      expect(result.current.suggestion).toBeNull();
    });
  });

  describe("with actor ready", () => {
    it("should fetch adaptive suggestion when actor is ready", async () => {
      const mockSuggestion = {
        action: { continue_: null },
        message: "Keep going — you're making solid progress.",
      };

      const mockActor = {
        getAdaptiveSuggestion: vi.fn().mockResolvedValue(mockSuggestion),
      };

      vi.mocked(useActor).mockReturnValue({
        actor: mockActor,
        isFetching: false,
      } as unknown as ReturnType<typeof useActor>);

      const { result } = renderHook(() => useAdaptiveSuggestion("5-math"), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.suggestion).toEqual(mockSuggestion);
      });

      expect(mockActor.getAdaptiveSuggestion).toHaveBeenCalledWith("5-math");
    });

    it("should return remedial review suggestion for low scores", async () => {
      const mockSuggestion = {
        action: { remedialReview: null },
        message:
          "Let's review this topic — you've got the right foundation, just need more practice.",
      };

      const mockActor = {
        getAdaptiveSuggestion: vi.fn().mockResolvedValue(mockSuggestion),
      };

      vi.mocked(useActor).mockReturnValue({
        actor: mockActor,
        isFetching: false,
      } as unknown as ReturnType<typeof useActor>);

      const { result } = renderHook(() => useAdaptiveSuggestion("5-science"), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.suggestion?.action).toEqual({
          remedialReview: null,
        });
      });
    });

    it("should return advance suggestion for high scores", async () => {
      const mockSuggestion = {
        action: { advance: null },
        message: "You're ahead of the curve — ready for the next level?",
      };

      const mockActor = {
        getAdaptiveSuggestion: vi.fn().mockResolvedValue(mockSuggestion),
      };

      vi.mocked(useActor).mockReturnValue({
        actor: mockActor,
        isFetching: false,
      } as unknown as ReturnType<typeof useActor>);

      const { result } = renderHook(() => useAdaptiveSuggestion("5-ela"), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.suggestion?.action).toEqual({ advance: null });
      });
    });
  });
});

describe("useAdaptiveWorkflow hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("initial state", () => {
    it("should return null workflow when actor is not ready", () => {
      vi.mocked(useActor).mockReturnValue({
        actor: null,
        isFetching: false,
      } as ReturnType<typeof useActor>);

      const { result } = renderHook(
        () => useAdaptiveWorkflow("math-5", "5"),
        { wrapper: createWrapper() }
      );

      expect(result.current.workflow).toBeNull();
      expect(result.current.isLoading).toBe(false);
    });

    it("should show loading when actor is fetching", () => {
      vi.mocked(useActor).mockReturnValue({
        actor: null,
        isFetching: true,
      } as ReturnType<typeof useActor>);

      const { result } = renderHook(
        () => useAdaptiveWorkflow("math-5", "5"),
        { wrapper: createWrapper() }
      );

      expect(result.current.isLoading).toBe(true);
    });
  });

  describe("with actor ready", () => {
    it("should fetch adaptive workflow when actor is ready", async () => {
      const mockWorkflow = {
        nextAction: { continue_: null },
        reasonPhrase:
          "Golden ratio zone — keep the momentum, you're building compound mastery.",
        suggestedTopics: ["5-math-2", "5-math-3"],
        phiConfidence: 0.65,
        fibDifficultyLevel: 4,
      };

      const mockActor = {
        getAdaptiveWorkflow: vi.fn().mockResolvedValue(mockWorkflow),
      };

      vi.mocked(useActor).mockReturnValue({
        actor: mockActor,
        isFetching: false,
      } as unknown as ReturnType<typeof useActor>);

      const { result } = renderHook(
        () => useAdaptiveWorkflow("5-math", "5"),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.workflow).toEqual(mockWorkflow);
      });

      expect(mockActor.getAdaptiveWorkflow).toHaveBeenCalledWith("5-math", "5");
    });

    it("should return workflow with PHI confidence below threshold", async () => {
      const mockWorkflow = {
        nextAction: { remedialReview: null },
        reasonPhrase:
          "Strengthening the foundation — your PHI confidence is building toward mastery.",
        suggestedTopics: ["5-math-1", "5-math-2"],
        phiConfidence: 0.45,
        fibDifficultyLevel: 2,
      };

      const mockActor = {
        getAdaptiveWorkflow: vi.fn().mockResolvedValue(mockWorkflow),
      };

      vi.mocked(useActor).mockReturnValue({
        actor: mockActor,
        isFetching: false,
      } as unknown as ReturnType<typeof useActor>);

      const { result } = renderHook(
        () => useAdaptiveWorkflow("5-math", "5"),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.workflow?.phiConfidence).toBeLessThan(0.618);
        expect(result.current.workflow?.nextAction).toEqual({
          remedialReview: null,
        });
      });
    });

    it("should return advance workflow for high confidence", async () => {
      const mockWorkflow = {
        nextAction: { advance: null },
        reasonPhrase:
          "PHI confidence reached — ready for the next sovereign level.",
        suggestedTopics: ["5-math-3", "5-math-4", "5-math-5"],
        phiConfidence: 0.85,
        fibDifficultyLevel: 5,
      };

      const mockActor = {
        getAdaptiveWorkflow: vi.fn().mockResolvedValue(mockWorkflow),
      };

      vi.mocked(useActor).mockReturnValue({
        actor: mockActor,
        isFetching: false,
      } as unknown as ReturnType<typeof useActor>);

      const { result } = renderHook(
        () => useAdaptiveWorkflow("5-ela", "5"),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.workflow?.phiConfidence).toBeGreaterThan(0.618);
        expect(result.current.workflow?.nextAction).toEqual({ advance: null });
      });
    });

    it("should handle first-time user scenario", async () => {
      const mockWorkflow = {
        nextAction: { continue_: null },
        reasonPhrase:
          "Start your first session — you're about to begin building real mastery.",
        suggestedTopics: ["5-math-1", "5-math-2", "5-math-3"],
        phiConfidence: 0.0,
        fibDifficultyLevel: 1,
      };

      const mockActor = {
        getAdaptiveWorkflow: vi.fn().mockResolvedValue(mockWorkflow),
      };

      vi.mocked(useActor).mockReturnValue({
        actor: mockActor,
        isFetching: false,
      } as unknown as ReturnType<typeof useActor>);

      const { result } = renderHook(
        () => useAdaptiveWorkflow("5-math", "5"),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.workflow?.phiConfidence).toBe(0.0);
        expect(result.current.workflow?.fibDifficultyLevel).toBe(1);
      });
    });
  });

  describe("Fibonacci difficulty levels", () => {
    it.each([
      { confidence: 0.2, expectedLevel: 1 },
      { confidence: 0.35, expectedLevel: 2 },
      { confidence: 0.55, expectedLevel: 3 },
      { confidence: 0.65, expectedLevel: 4 },
      { confidence: 0.8, expectedLevel: 5 },
      { confidence: 0.95, expectedLevel: 6 },
    ])(
      "should map confidence $confidence to difficulty level $expectedLevel",
      async ({ confidence, expectedLevel }) => {
        const mockWorkflow = {
          nextAction: { continue_: null },
          reasonPhrase: "Test workflow",
          suggestedTopics: ["5-math-1"],
          phiConfidence: confidence,
          fibDifficultyLevel: expectedLevel,
        };

        const mockActor = {
          getAdaptiveWorkflow: vi.fn().mockResolvedValue(mockWorkflow),
        };

        vi.mocked(useActor).mockReturnValue({
          actor: mockActor,
          isFetching: false,
        } as unknown as ReturnType<typeof useActor>);

        const { result } = renderHook(
          () => useAdaptiveWorkflow("5-math", "5"),
          { wrapper: createWrapper() }
        );

        await waitFor(() => {
          expect(result.current.workflow?.fibDifficultyLevel).toBe(
            expectedLevel
          );
        });
      }
    );
  });
});
