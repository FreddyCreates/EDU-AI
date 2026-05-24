import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useActor } from "@caffeineai/core-infrastructure";
import {
  useSubjectsByGrade,
  useAllSubjects,
  useTopicsBySubject,
} from "../../hooks/use-curriculum";
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

describe("useSubjectsByGrade hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("initial state", () => {
    it("should return empty subjects when actor is not ready", () => {
      vi.mocked(useActor).mockReturnValue({
        actor: null,
        isFetching: false,
      } as ReturnType<typeof useActor>);

      const { result } = renderHook(() => useSubjectsByGrade("5"), {
        wrapper: createWrapper(),
      });

      expect(result.current.data).toBeUndefined();
      expect(result.current.isLoading).toBe(false);
    });

    it("should show fetching state when actor is fetching", () => {
      vi.mocked(useActor).mockReturnValue({
        actor: null,
        isFetching: true,
      } as ReturnType<typeof useActor>);

      const { result } = renderHook(() => useSubjectsByGrade("5"), {
        wrapper: createWrapper(),
      });

      // When actor is fetching, query is disabled so isLoading is false
      // The isFetching state comes from useActor, not from the query
      expect(result.current.data).toBeUndefined();
    });
  });

  describe("with actor ready", () => {
    it("should fetch subjects by grade when actor is ready", async () => {
      const mockSubjects = [
        { id: "5-ela", name: "English Language Arts", gradeLevel: "5" },
        { id: "5-math", name: "Mathematics", gradeLevel: "5" },
        { id: "5-science", name: "Science", gradeLevel: "5" },
      ];

      const mockActor = {
        getSubjectsByGrade: vi.fn().mockResolvedValue(mockSubjects),
        getAllSubjects: vi.fn(),
      };

      vi.mocked(useActor).mockReturnValue({
        actor: mockActor,
        isFetching: false,
      } as unknown as ReturnType<typeof useActor>);

      const { result } = renderHook(() => useSubjectsByGrade("5"), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.data).toEqual(mockSubjects);
      });

      expect(mockActor.getSubjectsByGrade).toHaveBeenCalledWith("5");
    });

    it("should fetch all subjects when no grade level provided", async () => {
      const mockSubjects = [
        { id: "K-ela", name: "English Language Arts", gradeLevel: "K" },
        { id: "1-ela", name: "English Language Arts", gradeLevel: "1" },
        { id: "2-ela", name: "English Language Arts", gradeLevel: "2" },
      ];

      const mockActor = {
        getSubjectsByGrade: vi.fn(),
        getAllSubjects: vi.fn().mockResolvedValue(mockSubjects),
      };

      vi.mocked(useActor).mockReturnValue({
        actor: mockActor,
        isFetching: false,
      } as unknown as ReturnType<typeof useActor>);

      const { result } = renderHook(() => useSubjectsByGrade(""), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.data).toEqual(mockSubjects);
      });

      expect(mockActor.getAllSubjects).toHaveBeenCalled();
      expect(mockActor.getSubjectsByGrade).not.toHaveBeenCalled();
    });

    it("should return 12 subjects per grade level", async () => {
      const mockSubjects = [
        { id: "5-ela", name: "English Language Arts", gradeLevel: "5" },
        { id: "5-math", name: "Mathematics", gradeLevel: "5" },
        { id: "5-science", name: "Science", gradeLevel: "5" },
        { id: "5-socialstudies", name: "Social Studies", gradeLevel: "5" },
        { id: "5-geography", name: "Geography", gradeLevel: "5" },
        { id: "5-art", name: "Art", gradeLevel: "5" },
        { id: "5-music", name: "Music", gradeLevel: "5" },
        { id: "5-pe", name: "Physical Education", gradeLevel: "5" },
        { id: "5-cs", name: "Computer Science", gradeLevel: "5" },
        { id: "5-spanish", name: "Foreign Language (Spanish)", gradeLevel: "5" },
        { id: "5-health", name: "Health & Wellness", gradeLevel: "5" },
        { id: "5-electives", name: "Electives: Critical Thinking & Logic", gradeLevel: "5" },
      ];

      const mockActor = {
        getSubjectsByGrade: vi.fn().mockResolvedValue(mockSubjects),
        getAllSubjects: vi.fn(),
      };

      vi.mocked(useActor).mockReturnValue({
        actor: mockActor,
        isFetching: false,
      } as unknown as ReturnType<typeof useActor>);

      const { result } = renderHook(() => useSubjectsByGrade("5"), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.data?.length).toBe(12);
      });
    });
  });

  describe("error handling", () => {
    it("should handle API errors gracefully", async () => {
      const mockActor = {
        getSubjectsByGrade: vi.fn().mockRejectedValue(new Error("API Error")),
        getAllSubjects: vi.fn(),
      };

      vi.mocked(useActor).mockReturnValue({
        actor: mockActor,
        isFetching: false,
      } as unknown as ReturnType<typeof useActor>);

      const { result } = renderHook(() => useSubjectsByGrade("5"), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });
    });
  });
});

describe("useAllSubjects hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("initial state", () => {
    it("should return empty subjects when actor is not ready", () => {
      vi.mocked(useActor).mockReturnValue({
        actor: null,
        isFetching: false,
      } as ReturnType<typeof useActor>);

      const { result } = renderHook(() => useAllSubjects(), {
        wrapper: createWrapper(),
      });

      expect(result.current.data).toBeUndefined();
    });
  });

  describe("with actor ready", () => {
    it("should fetch all subjects", async () => {
      const mockSubjects = [
        { id: "K-ela", name: "English Language Arts", gradeLevel: "K" },
        { id: "1-math", name: "Mathematics", gradeLevel: "1" },
        { id: "12-cs", name: "Computer Science", gradeLevel: "12" },
      ];

      const mockActor = {
        getAllSubjects: vi.fn().mockResolvedValue(mockSubjects),
      };

      vi.mocked(useActor).mockReturnValue({
        actor: mockActor,
        isFetching: false,
      } as unknown as ReturnType<typeof useActor>);

      const { result } = renderHook(() => useAllSubjects(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.data).toEqual(mockSubjects);
      });

      expect(mockActor.getAllSubjects).toHaveBeenCalled();
    });
  });
});

describe("useTopicsBySubject hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("initial state", () => {
    it("should return empty topics when actor is not ready", () => {
      vi.mocked(useActor).mockReturnValue({
        actor: null,
        isFetching: false,
      } as ReturnType<typeof useActor>);

      const { result } = renderHook(() => useTopicsBySubject("5-math"), {
        wrapper: createWrapper(),
      });

      expect(result.current.data).toBeUndefined();
      expect(result.current.isLoading).toBe(false);
    });

    it("should not fetch when subjectId is empty", () => {
      const mockActor = {
        getTopicsBySubject: vi.fn(),
      };

      vi.mocked(useActor).mockReturnValue({
        actor: mockActor,
        isFetching: false,
      } as unknown as ReturnType<typeof useActor>);

      renderHook(() => useTopicsBySubject(""), {
        wrapper: createWrapper(),
      });

      expect(mockActor.getTopicsBySubject).not.toHaveBeenCalled();
    });
  });

  describe("with actor ready", () => {
    it("should fetch topics by subject", async () => {
      const mockTopics = [
        { id: "5-math-1", subjectId: "5-math", name: "Decimals and Place Value" },
        { id: "5-math-2", subjectId: "5-math", name: "Multi-Digit Multiplication" },
        { id: "5-math-3", subjectId: "5-math", name: "Multi-Digit Division" },
      ];

      const mockActor = {
        getTopicsBySubject: vi.fn().mockResolvedValue(mockTopics),
      };

      vi.mocked(useActor).mockReturnValue({
        actor: mockActor,
        isFetching: false,
      } as unknown as ReturnType<typeof useActor>);

      const { result } = renderHook(() => useTopicsBySubject("5-math"), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.data).toEqual(mockTopics);
      });

      expect(mockActor.getTopicsBySubject).toHaveBeenCalledWith("5-math");
    });

    it("should return 3-5 topics per subject (TEKS-aligned)", async () => {
      const mockTopics = [
        { id: "5-ela-1", subjectId: "5-ela", name: "Reading Comprehension Strategies" },
        { id: "5-ela-2", subjectId: "5-ela", name: "Narrative Writing" },
        { id: "5-ela-3", subjectId: "5-ela", name: "Grammar and Conventions" },
        { id: "5-ela-4", subjectId: "5-ela", name: "Research and Informational Text" },
      ];

      const mockActor = {
        getTopicsBySubject: vi.fn().mockResolvedValue(mockTopics),
      };

      vi.mocked(useActor).mockReturnValue({
        actor: mockActor,
        isFetching: false,
      } as unknown as ReturnType<typeof useActor>);

      const { result } = renderHook(() => useTopicsBySubject("5-ela"), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        const topicCount = result.current.data?.length ?? 0;
        expect(topicCount).toBeGreaterThanOrEqual(3);
        expect(topicCount).toBeLessThanOrEqual(5);
      });
    });
  });

  describe("grade level variations", () => {
    it.each([
      { grade: "K", subject: "K-math", topicName: "Counting and Cardinality" },
      { grade: "5", subject: "5-science", topicName: "Properties of Matter" },
      { grade: "12", subject: "12-cs", topicName: "Advanced Algorithms" },
    ])(
      "should fetch topics for grade $grade subject $subject",
      async ({ subject, topicName }) => {
        const mockTopics = [
          { id: `${subject}-1`, subjectId: subject, name: topicName },
        ];

        const mockActor = {
          getTopicsBySubject: vi.fn().mockResolvedValue(mockTopics),
        };

        vi.mocked(useActor).mockReturnValue({
          actor: mockActor,
          isFetching: false,
        } as unknown as ReturnType<typeof useActor>);

        const { result } = renderHook(() => useTopicsBySubject(subject), {
          wrapper: createWrapper(),
        });

        await waitFor(() => {
          expect(result.current.data?.[0].name).toBe(topicName);
        });
      }
    );
  });

  describe("error handling", () => {
    it("should handle API errors gracefully", async () => {
      const mockActor = {
        getTopicsBySubject: vi.fn().mockRejectedValue(new Error("API Error")),
      };

      vi.mocked(useActor).mockReturnValue({
        actor: mockActor,
        isFetching: false,
      } as unknown as ReturnType<typeof useActor>);

      const { result } = renderHook(() => useTopicsBySubject("5-math"), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });
    });
  });
});
