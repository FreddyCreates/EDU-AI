import { f as useActor, h as createActor } from "./index-BivnQ6bB.js";
import { a as useQuery } from "./query-8urnerR0.js";
function useGradeMetrics() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["grade-metrics"],
    queryFn: async () => {
      if (!actor) return [];
      const raw = await actor.getStudentCountByGrade();
      return raw.map((item) => ({
        ...item,
        grade: item.grade,
        studentCount: item.studentCount,
        activeSessionCount: item.activeSessionCount,
        avgMastery: item.avgMastery
      }));
    },
    enabled: !!actor && !isFetching
  });
}
function useSystemMetrics() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["system-metrics"],
    queryFn: async () => {
      if (!actor)
        return {
          avgPlatformMastery: 0,
          totalLessonsCompleted: 0n,
          totalStudents: 0n,
          activeSessions: 0n
        };
      return actor.getSystemMetricsSummary();
    },
    enabled: !!actor && !isFetching
  });
}
function useTeacherClasses(teacherId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["teacher-classes", teacherId],
    queryFn: async () => {
      if (!actor || !teacherId) return [];
      return actor.getClassesByTeacherId(teacherId);
    },
    enabled: !!actor && !isFetching && true
  });
}
function useClassDetail(classId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["class-detail", classId],
    queryFn: async () => {
      if (!actor || !classId) return null;
      return actor.getClassDetail(classId);
    },
    enabled: !!actor && !isFetching && !!classId
  });
}
function useGradeVaultSummary(grade) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["grade-vault", grade],
    queryFn: async () => {
      if (!actor)
        return {
          weeklyProgress: [],
          totalStudents: 0n,
          topSubject: "",
          grade: BigInt(grade),
          strugglingSubject: "",
          avgMastery: 0
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
          avgScore: w.avgScore
        }))
      };
    },
    enabled: !!actor && !isFetching
  });
}
function castGradeCount(g) {
  return {
    grade: Number(g.grade),
    studentCount: Number(g.studentCount),
    activeSessionCount: Number(g.activeSessionCount),
    avgMastery: g.avgMastery
  };
}
function castSystemMetrics(m) {
  return {
    avgPlatformMastery: m.avgPlatformMastery,
    totalLessonsCompleted: Number(m.totalLessonsCompleted),
    totalStudents: Number(m.totalStudents),
    activeSessions: Number(m.activeSessions)
  };
}
function castClassRecord(c) {
  return {
    classId: c.classId,
    className: c.className,
    subject: c.subject,
    grade: Number(c.grade),
    studentCount: Number(c.studentCount),
    avgMastery: c.avgMastery
  };
}
export {
  useClassDetail as a,
  useGradeVaultSummary as b,
  castClassRecord as c,
  useGradeMetrics as d,
  useSystemMetrics as e,
  castSystemMetrics as f,
  castGradeCount as g,
  useTeacherClasses as u
};
