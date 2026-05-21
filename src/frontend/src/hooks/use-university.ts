import type {
  CatalogCourse,
  CatalogCourseDetail,
  EnrollmentResult,
} from "@/backend";
import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export type { CatalogCourse, CatalogCourseDetail, EnrollmentResult };

export interface Course {
  id: string;
  title: string;
  description: string;
  modules: number;
  requiredSss: number;
  requiredSssThreshold: number;
  order: number;
  locked: boolean;
  category: string;
}

const COURSES: Course[] = [
  {
    id: "foundations",
    title: "Foundations of Reasoning",
    description: "How EDDI reasons from first principles using PHI mathematics",
    modules: 5,
    requiredSss: 5,
    requiredSssThreshold: 5,
    order: 1,
    locked: false,
    category: "UIL_ACADEMIC",
  },
  {
    id: "memory-architecture",
    title: "Memory Architecture",
    description: "Design Fibonacci-indexed memory zones for sovereign agents",
    modules: 5,
    requiredSss: 5,
    requiredSssThreshold: 5,
    order: 2,
    locked: false,
    category: "UIL_ACADEMIC",
  },
  {
    id: "recognition-engines",
    title: "Recognition Engines",
    description: "Build systems that surface student achievement automatically",
    modules: 8,
    requiredSss: 8,
    requiredSssThreshold: 8,
    order: 3,
    locked: true,
    category: "UIL_ACADEMIC",
  },
  {
    id: "multi-modal",
    title: "Multi-Modal Learning",
    description: "Teach agents to switch modes based on context",
    modules: 8,
    requiredSss: 8,
    requiredSssThreshold: 8,
    order: 4,
    locked: true,
    category: "UIL_ACADEMIC",
  },
  {
    id: "sovereign-response",
    title: "Sovereign Response Generation",
    description: "Generate coherent, multi-path responses using COGT chains",
    modules: 13,
    requiredSss: 13,
    requiredSssThreshold: 13,
    order: 5,
    locked: true,
    category: "UIL_ACADEMIC",
  },
  {
    id: "entanglement-bridges",
    title: "Entanglement Bridges",
    description:
      "Wire agents across substrates with protocol-enforced couplings",
    modules: 13,
    requiredSss: 13,
    requiredSssThreshold: 13,
    order: 6,
    locked: true,
    category: "UIL_CTE",
  },
  {
    id: "protocol-design",
    title: "Protocol Design",
    description: "Codify agent behavior into sealed, enforced protocols",
    modules: 21,
    requiredSss: 21,
    requiredSssThreshold: 21,
    order: 7,
    locked: true,
    category: "UIL_CTE",
  },
  {
    id: "live-intelligence",
    title: "Live Intelligence",
    description: "Build agents that adapt in real time using IAS formula",
    modules: 21,
    requiredSss: 21,
    requiredSssThreshold: 21,
    order: 8,
    locked: true,
    category: "UIL_ACADEMIC",
  },
  {
    id: "skills-usa-construction",
    title: "Skills USA: Construction Technology",
    description:
      "Blueprint reading, construction math, OSHA safety, material science — compete-ready prep",
    modules: 8,
    requiredSss: 5,
    requiredSssThreshold: 5,
    order: 9,
    locked: false,
    category: "UIL_CTE",
  },
  {
    id: "uil-mathematics",
    title: "UIL Mathematics",
    description:
      "Number theory, geometry, algebra — systematic competition prep through Fibonacci milestone sessions",
    modules: 8,
    requiredSss: 5,
    requiredSssThreshold: 5,
    order: 10,
    locked: false,
    category: "UIL_ACADEMIC",
  },
  {
    id: "uil-science",
    title: "UIL Science",
    description:
      "Physics, chemistry, biology — multi-path sovereign prep with EDDI as your guide",
    modules: 8,
    requiredSss: 5,
    requiredSssThreshold: 5,
    order: 11,
    locked: false,
    category: "UIL_ACADEMIC",
  },
  {
    id: "deca-business",
    title: "DECA Business Principles",
    description:
      "Marketing, finance, business planning — full role-play prep with EDDI coaching each scenario",
    modules: 5,
    requiredSss: 5,
    requiredSssThreshold: 5,
    order: 12,
    locked: false,
    category: "UIL_CTE",
  },
  {
    id: "uil-music-theory",
    title: "UIL Music Theory",
    description:
      "Sight-reading, chord construction, harmonic analysis — sovereign preparation for music competition",
    modules: 8,
    requiredSss: 8,
    requiredSssThreshold: 8,
    order: 13,
    locked: true,
    category: "MUSIC",
  },
  {
    id: "uil-athletics-training",
    title: "Athletics Training Science",
    description:
      "Sports physiology, nutrition, training theory — the academic side of athletic performance",
    modules: 5,
    requiredSss: 5,
    requiredSssThreshold: 5,
    order: 14,
    locked: false,
    category: "ATHLETICS",
  },
];

/* ─── Static courses hook (kept for backwards compatibility) ─────── */
export function useCourses() {
  return { courses: COURSES, isLoading: false };
}

/* ─── Live catalog from backend ─────────────────────────────────── */
export function useCourseCatalog() {
  const { actor, isFetching } = useActor(createActor);
  const query = useQuery<CatalogCourse[]>({
    queryKey: ["course-catalog"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCatalog() as Promise<CatalogCourse[]>;
    },
    enabled: !!actor && !isFetching,
  });
  return {
    courses: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
  };
}

export function useCourseDetail(courseId: string) {
  const { actor, isFetching } = useActor(createActor);
  const query = useQuery<CatalogCourseDetail | null>({
    queryKey: ["course-detail", courseId],
    queryFn: async () => {
      if (!actor || !courseId) return null;
      return actor.getCourseDetail(courseId);
    },
    enabled: !!actor && !isFetching && !!courseId,
  });
  return {
    course: query.data ?? null,
    isLoading: query.isLoading,
    error: query.error,
  };
}

export function useEnrollInCourse() {
  const { actor } = useActor(createActor);
  const [enrollingId, setEnrollingId] = useState<string | null>(null);
  const [enrolledIds, setEnrolledIds] = useState<string[]>([]);
  const [lastEnrollmentResult, setLastEnrollmentResult] =
    useState<EnrollmentResult | null>(null);

  const enroll = async (courseId: string): Promise<EnrollmentResult | null> => {
    setEnrollingId(courseId);
    try {
      if (actor) {
        const result = await actor.enrollInCourseWithStart(courseId);
        if (result?.success) {
          setEnrolledIds((prev) => [...prev, courseId]);
          setLastEnrollmentResult(result);
          return result;
        }
      }
      setEnrolledIds((prev) => [...prev, courseId]);
      return null;
    } catch (e) {
      console.error("Enrollment error", e);
      return null;
    } finally {
      setEnrollingId(null);
    }
  };

  return { enroll, enrollingId, enrolledIds, lastEnrollmentResult };
}

export function useUserAgents() {
  return { agents: [], isLoading: false };
}
