import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useActor } from "@caffeineai/core-infrastructure";
import { useStudent } from "../../hooks/use-student";
import type { ReactNode } from "react";

// Mock the module
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

describe("useStudent hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("initial state", () => {
    it("should return null profile when actor is not ready", () => {
      vi.mocked(useActor).mockReturnValue({
        actor: null,
        isFetching: false,
      } as ReturnType<typeof useActor>);

      const { result } = renderHook(() => useStudent(), {
        wrapper: createWrapper(),
      });

      expect(result.current.profile).toBeNull();
      expect(result.current.isLoading).toBe(false);
    });

    it("should show loading when actor is fetching", () => {
      vi.mocked(useActor).mockReturnValue({
        actor: null,
        isFetching: true,
      } as ReturnType<typeof useActor>);

      const { result } = renderHook(() => useStudent(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(true);
    });
  });

  describe("with actor ready", () => {
    it("should fetch student profile when actor is ready", async () => {
      const mockProfile = {
        id: "principal-id",
        name: "Test Student",
        gradeLevel: "5",
        createdAt: BigInt(Date.now() * 1_000_000),
      };

      const mockActor = {
        getStudentProfile: vi.fn().mockResolvedValue(mockProfile),
      };

      vi.mocked(useActor).mockReturnValue({
        actor: mockActor,
        isFetching: false,
      } as unknown as ReturnType<typeof useActor>);

      const { result } = renderHook(() => useStudent(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.profile).toEqual(mockProfile);
      });

      expect(mockActor.getStudentProfile).toHaveBeenCalled();
    });

    it("should handle null profile from backend", async () => {
      const mockActor = {
        getStudentProfile: vi.fn().mockResolvedValue(null),
      };

      vi.mocked(useActor).mockReturnValue({
        actor: mockActor,
        isFetching: false,
      } as unknown as ReturnType<typeof useActor>);

      const { result } = renderHook(() => useStudent(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.profile).toBeNull();
    });
  });

  describe("createProfile mutation", () => {
    it("should provide createProfile mutation function", async () => {
      const mockActor = {
        getStudentProfile: vi.fn().mockResolvedValue(null),
        createStudentProfile: vi.fn().mockResolvedValue({
          id: "new-principal-id",
          name: "New Student",
          gradeLevel: "3",
          createdAt: BigInt(Date.now() * 1_000_000),
        }),
      };

      vi.mocked(useActor).mockReturnValue({
        actor: mockActor,
        isFetching: false,
      } as unknown as ReturnType<typeof useActor>);

      const { result } = renderHook(() => useStudent(), {
        wrapper: createWrapper(),
      });

      expect(result.current.createProfile).toBeDefined();
      expect(typeof result.current.createProfile.mutate).toBe("function");
    });

    it("should throw error when actor is not ready", async () => {
      vi.mocked(useActor).mockReturnValue({
        actor: null,
        isFetching: false,
      } as ReturnType<typeof useActor>);

      const { result } = renderHook(() => useStudent(), {
        wrapper: createWrapper(),
      });

      let error: Error | undefined;
      try {
        await result.current.createProfile.mutateAsync({
          name: "Test",
          gradeLevel: "5",
        });
      } catch (e) {
        error = e as Error;
      }

      expect(error?.message).toBe("Actor not ready");
    });
  });

  describe("updateGrade mutation", () => {
    it("should provide updateGrade mutation function", async () => {
      const mockActor = {
        getStudentProfile: vi.fn().mockResolvedValue(null),
        updateStudentGrade: vi.fn().mockResolvedValue({
          id: "principal-id",
          name: "Student",
          gradeLevel: "6",
          createdAt: BigInt(Date.now() * 1_000_000),
        }),
      };

      vi.mocked(useActor).mockReturnValue({
        actor: mockActor,
        isFetching: false,
      } as unknown as ReturnType<typeof useActor>);

      const { result } = renderHook(() => useStudent(), {
        wrapper: createWrapper(),
      });

      expect(result.current.updateGrade).toBeDefined();
      expect(typeof result.current.updateGrade.mutate).toBe("function");
    });

    it("should throw error when actor is not ready for updateGrade", async () => {
      vi.mocked(useActor).mockReturnValue({
        actor: null,
        isFetching: false,
      } as ReturnType<typeof useActor>);

      const { result } = renderHook(() => useStudent(), {
        wrapper: createWrapper(),
      });

      let error: Error | undefined;
      try {
        await result.current.updateGrade.mutateAsync("7");
      } catch (e) {
        error = e as Error;
      }

      expect(error?.message).toBe("Actor not ready");
    });
  });

  describe("error handling", () => {
    it("should handle API errors gracefully", async () => {
      const mockActor = {
        getStudentProfile: vi.fn().mockRejectedValue(new Error("API Error")),
      };

      vi.mocked(useActor).mockReturnValue({
        actor: mockActor,
        isFetching: false,
      } as unknown as ReturnType<typeof useActor>);

      const { result } = renderHook(() => useStudent(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });
    });
  });
});
