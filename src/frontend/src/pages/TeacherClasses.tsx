import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { castClassRecord, useTeacherClasses } from "@/hooks/use-grade-metrics";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  BookOpen,
  Brain,
  ChevronRight,
  Filter,
  GraduationCap,
  Layers,
  Plus,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";

const DEMO_TEACHER_ID = "demo-teacher";

function LiveDot() {
  return (
    <span className="relative inline-flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 bg-violet-400" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-400" />
    </span>
  );
}

export default function TeacherClasses() {
  const [gradeFilter, setGradeFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const {
    data: rawClasses,
    isLoading,
    isError,
  } = useTeacherClasses(DEMO_TEACHER_ID);

  const classes = useMemo(() => {
    const mapped = (rawClasses ?? []).map(castClassRecord);
    let filtered = mapped;
    if (gradeFilter !== "all")
      filtered = filtered.filter((c) => String(c.grade) === gradeFilter);
    if (subjectFilter !== "all")
      filtered = filtered.filter((c) => c.subject === subjectFilter);
    return filtered.sort((a, b) => {
      if (sortBy === "mastery") return b.avgMastery - a.avgMastery;
      if (sortBy === "students") return b.studentCount - a.studentCount;
      return a.className.localeCompare(b.className);
    });
  }, [rawClasses, gradeFilter, subjectFilter, sortBy]);

  const allSubjects = useMemo(() => {
    const subjects = new Set((rawClasses ?? []).map((c) => c.subject));
    return Array.from(subjects);
  }, [rawClasses]);

  const allGrades = useMemo(() => {
    const grades = new Set((rawClasses ?? []).map((c) => Number(c.grade)));
    return Array.from(grades).sort((a, b) => a - b);
  }, [rawClasses]);

  return (
    <div className="portal-enter min-h-screen" data-ocid="teacher-classes.page">
      {/* OS Header */}
      <div
        className="glass-portal-teacher glass-shimmer sticky top-0 z-30"
        style={{ borderBottom: "1px solid rgba(160,100,255,0.18)" }}
      >
        <div className="mx-auto max-w-[1400px] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="flex items-center gap-2.5 rounded-xl px-4 py-2"
              style={{
                background:
                  "linear-gradient(135deg, rgba(160,100,255,0.22) 0%, rgba(100,60,180,0.15) 100%)",
                border: "1px solid rgba(160,100,255,0.35)",
              }}
            >
              <GraduationCap className="h-5 w-5 text-violet-300" />
              <span
                className="font-display font-bold text-sm text-violet-200"
                style={{ letterSpacing: "0.18em" }}
              >
                MY CLASSES
              </span>
              <LiveDot />
            </div>
            <div>
              <p className="font-display font-semibold text-foreground text-base leading-none">
                Class Registry · Ms. Rivera
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isLoading
                  ? "Loading…"
                  : `${rawClasses?.length ?? 0} active classes · STMP Aligned`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/teacher">
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="glass-sm border-0 text-xs"
                style={{
                  borderColor: "rgba(160,100,255,0.3)",
                  color: "rgba(200,160,255,0.9)",
                }}
                data-ocid="teacher-classes.back_button"
              >
                ← Dashboard
              </Button>
            </Link>
            <Link to="/teacher">
              <Button
                type="button"
                size="sm"
                data-ocid="teacher-classes.create_button"
                className="gap-1.5 text-xs"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.62 0.22 280), oklch(0.48 0.22 280))",
                  border: "1px solid rgba(160,100,255,0.4)",
                  boxShadow: "0 0 16px rgba(160,100,255,0.25)",
                }}
              >
                <Plus className="h-3.5 w-3.5" /> New Class
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 py-6 space-y-6">
        {/* Stats summary row */}
        {!isLoading && (
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                label: "Active Classes",
                value: rawClasses?.length ?? 0,
                icon: BookOpen,
                color: "text-violet-400",
              },
              {
                label: "Total Students",
                value: (rawClasses ?? []).reduce(
                  (sum, c) => sum + Number(c.studentCount),
                  0,
                ),
                icon: Users,
                color: "text-emerald-400",
              },
              {
                label: "Avg Class Mastery",
                value: `${(((rawClasses ?? []).reduce((sum, c) => sum + c.avgMastery, 0) / Math.max((rawClasses ?? []).length, 1)) * 100).toFixed(0)}%`,
                icon: TrendingUp,
                color: "text-amber-400",
              },
            ].map(({ label, value, icon: Icon, color }) => (
              <div
                key={label}
                className="glass-sm rounded-2xl p-4 flex items-center gap-3 glass-shimmer"
                style={{ border: "1px solid rgba(160,100,255,0.18)" }}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    background: "rgba(160,100,255,0.12)",
                    border: "1px solid rgba(160,100,255,0.22)",
                  }}
                >
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <div>
                  <p className="text-xl font-display font-bold text-foreground">
                    {value}
                  </p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Filter bar */}
        <div
          className="glass rounded-2xl px-5 py-4 flex items-center gap-4 flex-wrap"
          data-ocid="teacher-classes.filter_panel"
        >
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-violet-400" />
            <span className="text-sm font-display font-semibold text-foreground">
              Filter
            </span>
          </div>
          <Select value={gradeFilter} onValueChange={setGradeFilter}>
            <SelectTrigger
              className="glass-sm border-0 w-36 h-9 text-xs"
              data-ocid="teacher-classes.grade_filter"
            >
              <SelectValue placeholder="All Grades" />
            </SelectTrigger>
            <SelectContent className="glass-xl border-0">
              <SelectItem value="all">All Grades</SelectItem>
              {allGrades.map((g) => (
                <SelectItem key={g} value={String(g)}>
                  Grade {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={subjectFilter} onValueChange={setSubjectFilter}>
            <SelectTrigger
              className="glass-sm border-0 w-44 h-9 text-xs"
              data-ocid="teacher-classes.subject_filter"
            >
              <SelectValue placeholder="All Subjects" />
            </SelectTrigger>
            <SelectContent className="glass-xl border-0">
              <SelectItem value="all">All Subjects</SelectItem>
              {allSubjects.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Sort:</span>
            {[
              { value: "name", label: "Name" },
              { value: "mastery", label: "Mastery" },
              { value: "students", label: "Students" },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                data-ocid={`teacher-classes.sort_${opt.value}`}
                onClick={() => setSortBy(opt.value)}
                className="text-xs px-3 py-1.5 rounded-lg transition-smooth"
                style={{
                  background:
                    sortBy === opt.value
                      ? "rgba(160,100,255,0.22)"
                      : "rgba(160,100,255,0.08)",
                  border: `1px solid ${sortBy === opt.value ? "rgba(160,100,255,0.45)" : "rgba(160,100,255,0.18)"}`,
                  color:
                    sortBy === opt.value
                      ? "rgba(200,160,255,0.95)"
                      : "rgba(180,140,240,0.6)",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Class Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-48 rounded-2xl" />
            ))}
          </div>
        ) : isError ? (
          <div
            data-ocid="teacher-classes.error_state"
            className="glass rounded-2xl p-[var(--phi-34)] text-center"
          >
            <p className="text-destructive">
              Failed to load classes. Please refresh.
            </p>
          </div>
        ) : classes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            data-ocid="teacher-classes.empty_state"
            className="glass-portal-teacher rounded-2xl p-[var(--phi-55)] flex flex-col items-center gap-5 text-center"
            style={{ border: "1px dashed rgba(160,100,255,0.3)" }}
          >
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl"
              style={{
                background: "rgba(160,100,255,0.12)",
                border: "1px solid rgba(160,100,255,0.25)",
              }}
            >
              <BookOpen className="h-8 w-8 text-violet-400/60" />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-display font-semibold text-foreground">
                {gradeFilter !== "all" || subjectFilter !== "all"
                  ? "No classes match your filters"
                  : "No classes yet"}
              </p>
              <p className="text-sm text-muted-foreground max-w-sm">
                {gradeFilter !== "all" || subjectFilter !== "all"
                  ? "Try adjusting the grade or subject filter."
                  : "Create your first class from the Teacher Dashboard to get started."}
              </p>
            </div>
            {gradeFilter === "all" && subjectFilter === "all" && (
              <Link to="/teacher">
                <Button
                  type="button"
                  className="gap-2"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.62 0.22 280), oklch(0.48 0.22 280))",
                    border: "1px solid rgba(160,100,255,0.4)",
                  }}
                >
                  <Plus className="h-4 w-4" /> Create First Class
                </Button>
              </Link>
            )}
          </motion.div>
        ) : (
          <div
            data-ocid="teacher-classes.list"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
          >
            {classes.map((cls, idx) => (
              <motion.div
                key={cls.classId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.07, duration: 0.35 }}
                data-ocid={`teacher-classes.item.${idx + 1}`}
              >
                <Link
                  to="/teacher/class/$classId"
                  params={{ classId: cls.classId }}
                >
                  <div
                    className="group glass-portal-teacher rounded-2xl p-5 space-y-4 hover:scale-[1.015] transition-smooth cursor-pointer glass-shimmer"
                    style={{
                      boxShadow:
                        "0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(160,100,255,0.12)",
                    }}
                  >
                    {/* Card header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-xl shrink-0"
                          style={{
                            background: "rgba(160,100,255,0.15)",
                            border: "1px solid rgba(160,100,255,0.28)",
                          }}
                        >
                          <Layers className="h-5 w-5 text-violet-400" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-display font-bold text-base text-foreground truncate">
                            {cls.className}
                          </h3>
                          <p className="text-sm text-muted-foreground truncate">
                            {cls.subject}
                          </p>
                        </div>
                      </div>
                      <Badge
                        className="shrink-0 font-mono text-xs ml-2"
                        style={{
                          background: "rgba(160,100,255,0.18)",
                          borderColor: "rgba(160,100,255,0.35)",
                          color: "rgba(200,160,255,0.9)",
                        }}
                      >
                        Gr.{cls.grade}
                      </Badge>
                    </div>

                    {/* Mastery progress bar */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          Avg Mastery
                        </span>
                        <span
                          className="text-sm font-display font-bold"
                          style={{ color: "rgba(200,160,255,0.9)" }}
                        >
                          {(cls.avgMastery * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div
                        className="h-2 rounded-full overflow-hidden"
                        style={{ background: "rgba(160,100,255,0.12)" }}
                      >
                        <motion.div
                          className="h-full rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${cls.avgMastery * 100}%` }}
                          transition={{
                            delay: idx * 0.07 + 0.2,
                            duration: 0.8,
                            ease: "easeOut",
                          }}
                          style={{
                            background:
                              "linear-gradient(90deg, oklch(0.62 0.22 280), oklch(0.75 0.20 300))",
                          }}
                        />
                      </div>
                    </div>

                    {/* Footer row */}
                    <div
                      className="flex items-center justify-between pt-2"
                      style={{ borderTop: "1px solid rgba(160,100,255,0.12)" }}
                    >
                      <div className="flex items-center gap-1.5">
                        <div
                          className="flex h-6 w-6 items-center justify-center rounded-md"
                          style={{ background: "rgba(160,100,255,0.12)" }}
                        >
                          <Users className="h-3 w-3 text-violet-400" />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          <span className="font-semibold text-foreground">
                            {cls.studentCount}
                          </span>{" "}
                          students
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Activity className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-xs text-emerald-400 font-mono">
                          Active
                        </span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-violet-300 transition-smooth group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* SKAI Docens hint */}
        {!isLoading && classes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-sm rounded-2xl px-5 py-4 flex items-center justify-between gap-4"
            style={{ border: "1px solid rgba(160,100,255,0.18)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-xl"
                style={{
                  background: "rgba(160,100,255,0.15)",
                  border: "1px solid rgba(160,100,255,0.25)",
                }}
              >
                <Brain className="h-4 w-4 text-violet-400" />
              </div>
              <div>
                <p className="text-sm font-display font-semibold text-foreground">
                  SKAI Docens
                </p>
                <p className="text-xs text-muted-foreground">
                  Get AI-powered class recommendations and insights
                </p>
              </div>
            </div>
            <Link to="/skai">
              <Button
                type="button"
                size="sm"
                data-ocid="teacher-classes.skai_link"
                className="text-xs gap-1.5"
                style={{
                  background: "rgba(160,100,255,0.18)",
                  border: "1px solid rgba(160,100,255,0.30)",
                  color: "rgba(200,160,255,0.9)",
                }}
              >
                Open SKAI <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
