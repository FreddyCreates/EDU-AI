import { createActor } from "@/backend";
import type {
  ClassDetail,
  ClassRecord,
  GradeCount,
  GradeVaultSummary,
  SystemMetrics,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import type { Principal } from "@icp-sdk/core/principal";
import { useQuery } from "@tanstack/react-query";

// ─── Grade Metrics ────────────────────────────────────────────────────────────
export function useGradeMetrics() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<GradeCount[]>({
    queryKey: ["grade-metrics"],
    queryFn: async () => {
      if (!actor) return [];
      const raw = await actor.getStudentCountByGrade();
      return raw.map((item) => ({
        ...item,
        grade: item.grade,
        studentCount: item.studentCount,
        activeSessionCount: item.activeSessionCount,
        avgMastery: item.avgMastery,
      }));
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── System Metrics ───────────────────────────────────────────────────────────
export function useSystemMetrics() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<SystemMetrics>({
    queryKey: ["system-metrics"],
    queryFn: async () => {
      if (!actor)
        return {
          avgPlatformMastery: 0,
          totalLessonsCompleted: 0n,
          totalStudents: 0n,
          activeSessions: 0n,
        };
      return actor.getSystemMetricsSummary();
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Teacher Classes ──────────────────────────────────────────────────────────
export function useTeacherClasses(teacherId: string) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<ClassRecord[]>({
    queryKey: ["teacher-classes", teacherId],
    queryFn: async () => {
      if (!actor || !teacherId) return [];
      return actor.getClassesByTeacherId(teacherId as unknown as Principal);
    },
    enabled: !!actor && !isFetching && !!teacherId,
  });
}

// ─── Class Detail ─────────────────────────────────────────────────────────────
export function useClassDetail(classId: string) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<ClassDetail | null>({
    queryKey: ["class-detail", classId],
    queryFn: async () => {
      if (!actor || !classId) return null;
      return actor.getClassDetail(classId);
    },
    enabled: !!actor && !isFetching && !!classId,
  });
}

// ─── Grade Vault Summary ──────────────────────────────────────────────────────
export function useGradeVaultSummary(grade: number) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<GradeVaultSummary>({
    queryKey: ["grade-vault", grade],
    queryFn: async () => {
      if (!actor)
        return {
          weeklyProgress: [],
          totalStudents: 0n,
          topSubject: "",
          grade: BigInt(grade),
          strugglingSubject: "",
          avgMastery: 0,
        };
      const raw = await actor.getGradeVaultSummary(BigInt(grade));
      return {
        ...raw,
        grade: raw.grade,
        totalStudents: raw.totalStudents,
        avgMastery: raw.avgMastery,
        topSubject: raw.topSubject,
        strugglingSubject: raw.strugglingSubject,
        weeklyProgress: raw.weeklyProgress.map((w) => ({
          week: w.week,
          completedLessons: w.completedLessons,
          avgScore: w.avgScore,
        })),
      };
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Convenience number casts for bigint display ──────────────────────────────
export function castGradeCount(g: GradeCount) {
  return {
    grade: Number(g.grade),
    studentCount: Number(g.studentCount),
    activeSessionCount: Number(g.activeSessionCount),
    avgMastery: g.avgMastery,
  };
}

export function castSystemMetrics(m: SystemMetrics) {
  return {
    avgPlatformMastery: m.avgPlatformMastery,
    totalLessonsCompleted: Number(m.totalLessonsCompleted),
    totalStudents: Number(m.totalStudents),
    activeSessions: Number(m.activeSessions),
  };
}

export function castClassRecord(c: ClassRecord) {
  return {
    classId: c.classId,
    className: c.className,
    subject: c.subject,
    grade: Number(c.grade),
    studentCount: Number(c.studentCount),
    avgMastery: c.avgMastery,
  };
}
