import EddiOrb from "@/components/EddiOrb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSSScore } from "@/hooks/use-passport";
import {
  useCourseDetail,
  useCourses,
  useEnrollInCourse,
} from "@/hooks/use-university";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  Loader2,
  Lock,
  Sparkles,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

/* ─── Category style map ──────────────────────────────────────────── */

const CATEGORY_STYLES: Record<string, { label: string; classes: string }> = {
  UIL_ACADEMIC: {
    label: "UIL Academic",
    classes: "border-sky-400/30 bg-sky-400/10 text-sky-300",
  },
  UIL_CTE: {
    label: "CTE",
    classes: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  },
  MUSIC: {
    label: "Music",
    classes: "border-violet-400/30 bg-violet-400/10 text-violet-300",
  },
  ATHLETICS: {
    label: "Athletics",
    classes: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  },
};

/* ─── Module placeholder data ─────────────────────────────────────── */

function buildFallbackModules(count: number, courseTitle: string) {
  return Array.from({ length: count }, (_, i) => ({
    index: i + 1,
    id: `fallback-${i + 1}`,
    title: `Module ${i + 1}: ${courseTitle} — Part ${i + 1}`,
    content: "",
    completed: false,
  }));
}

function ModuleSkeletons() {
  return (
    <div className="space-y-3">
      {["m1", "m2", "m3", "m4"].map((id) => (
        <div
          key={id}
          className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4 animate-pulse"
        >
          <div className="w-10 h-10 rounded-xl bg-white/10 shrink-0" />
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-3 rounded bg-white/10 w-2/3" />
            <div className="h-2.5 rounded bg-white/5 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── CourseDetail ────────────────────────────────────────────────── */

export default function CourseDetail() {
  const navigate = useNavigate();
  const { courseId } = useParams({ from: "/collegium/$courseId" });
  const { courses } = useCourses();
  const { course: detailCourse, isLoading: detailLoading } = useCourseDetail(
    courseId ?? "",
  );
  const { enroll, enrollingId, enrolledIds, lastEnrollmentResult } =
    useEnrollInCourse();
  const { data: sssScore = 0 } = useSSScore();

  const staticCourse = courses.find((c) => c.id === courseId);
  // Merge: prefer live detail but fall back to static
  const course = staticCourse;

  if (!course) {
    return (
      <div
        data-ocid="course_detail.not_found"
        className="mx-auto max-w-2xl px-5 py-24 flex flex-col items-center text-center gap-6"
      >
        <BookOpen className="h-12 w-12 text-foreground/20" />
        <h2 className="font-display text-2xl font-bold text-foreground">
          Course not found
        </h2>
        <p className="text-foreground/50 text-sm">
          This course doesn\'t exist in the registry.
        </p>
        <Button
          type="button"
          variant="outline"
          className="gap-2 border-white/10 bg-white/5 text-foreground/70 hover:bg-white/10"
          onClick={() => navigate({ to: "/collegium" })}
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Collegium
        </Button>
      </div>
    );
  }

  const isEnrolled = enrolledIds.includes(course.id);
  const isEnrolling = enrollingId === course.id;
  const isLocked = sssScore < course.requiredSssThreshold;

  // Build module list: prefer live detail modules, fall back to placeholders
  const liveModules = detailCourse?.modules;
  const modules =
    liveModules && liveModules.length > 0
      ? liveModules.map((m, i) => ({
          index: i + 1,
          id: m.moduleId,
          title: m.title,
          content: m.description,
          completed: false,
        }))
      : buildFallbackModules(course.modules, course.title);

  const completedCount = modules.filter((m) => m.completed).length;
  const progress = isEnrolled
    ? modules.length > 0
      ? Math.floor((completedCount / modules.length) * 100)
      : 0
    : 0;
  const uildProgram =
    detailCourse?.uilProgram ?? detailCourse?.cteProgram ?? null;
  const catStyle = CATEGORY_STYLES[course.category] ?? {
    label: course.category,
    classes: "border-white/10 bg-white/5 text-foreground/40",
  };

  const handleEnroll = async () => {
    if (isLocked || isEnrolled) return;
    const result = await enroll(course.id);
    if (result?.firstModuleTitle) {
      toast.success(`Enrolled! First module: ${result.firstModuleTitle}`);
    } else {
      toast.success(`You're enrolled in ${course.title}!`);
    }
  };

  return (
    <div className="min-h-screen" data-ocid="course_detail.page">
      {/* ── Ambient glow */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_oklch(0.86_0.18_85_/_0.05),_transparent_55%)]" />

      <div className="relative mx-auto max-w-3xl px-5 sm:px-8 py-10 space-y-8">
        {/* ── Back nav */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            type="button"
            data-ocid="course_detail.back_button"
            onClick={() => navigate({ to: "/collegium" })}
            className="inline-flex items-center gap-2 text-foreground/50 hover:text-foreground/80 text-sm font-mono font-bold uppercase tracking-widest transition-colors duration-200"
          >
            <ChevronLeft className="h-4 w-4" />
            Collegium
          </button>
        </motion.div>

        {/* ── Hero card */}
        <motion.div
          initial={{ opacity: 0, y: -13 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          data-ocid="course_detail.hero_card"
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-[34px] space-y-5"
          style={{ boxShadow: "0 0 34px rgba(0,210,255,0.07)" }}
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="space-y-1">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-foreground/30">
                Course {String(course.order).padStart(2, "0")}
              </span>
              <h1
                className="font-display font-black text-3xl sm:text-4xl leading-tight"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.95 0.05 90), oklch(0.86 0.18 85), oklch(0.78 0.22 60))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {course.title}
              </h1>
            </div>
            <Badge
              variant="outline"
              className={`text-[11px] font-mono ${catStyle.classes}`}
            >
              {catStyle.label}
            </Badge>
          </div>

          <p className="text-foreground/60 text-base leading-relaxed">
            {course.description}
          </p>

          {/* EDDI brief from live data */}
          {(uildProgram || lastEnrollmentResult?.eddiBrief) && (
            <p className="text-foreground/40 text-sm italic border-l-2 border-amber-400/30 pl-4">
              {lastEnrollmentResult?.eddiBrief || uildProgram}
            </p>
          )}

          <div className="flex items-center gap-5 flex-wrap">
            <span className="inline-flex items-center gap-2 text-xs font-mono text-foreground/40 bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
              <BookOpen className="h-3.5 w-3.5" />
              {course.modules} modules
            </span>
            <span className="inline-flex items-center gap-2 text-xs font-mono text-foreground/40 bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
              <Star className="h-3.5 w-3.5" />
              SSS ≥ {course.requiredSssThreshold} to unlock
            </span>
          </div>
        </motion.div>

        {/* ── Locked state */}
        {isLocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.35 }}
            data-ocid="course_detail.locked_state"
            className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-[34px] flex flex-col items-center text-center gap-5"
          >
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 bg-white/5">
              <Lock className="h-7 w-7 text-foreground/30" />
            </div>
            <div className="space-y-2">
              <p className="font-display font-bold text-lg text-foreground/70">
                Course Locked
              </p>
              <p className="text-foreground/40 text-sm">
                Reach{" "}
                <span
                  className="font-bold"
                  style={{ color: "oklch(0.86 0.18 85)" }}
                >
                  SSS {course.requiredSssThreshold}
                </span>{" "}
                to unlock this course. Your current score:{" "}
                <span className="font-bold text-foreground/60">{sssScore}</span>
              </p>
            </div>
          </motion.div>
        )}

        {/* ── Enrollment CTA (unlocked + not enrolled) */}
        {!isLocked && !isEnrolled && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.35 }}
            data-ocid="course_detail.enroll_section"
            className="backdrop-blur-md bg-white/5 border border-amber-400/20 rounded-2xl p-[21px] flex flex-col sm:flex-row items-center justify-between gap-5"
            style={{ boxShadow: "0 0 21px rgba(245,158,11,0.08)" }}
          >
            <div className="flex items-center gap-4">
              <EddiOrb mode="BUILD" size="sm" />
              <div className="space-y-1">
                <p className="font-display font-bold text-foreground">
                  Ready to begin?
                </p>
                <p className="text-foreground/50 text-sm">
                  EDDI will guide you through every module.
                </p>
              </div>
            </div>
            <Button
              type="button"
              onClick={handleEnroll}
              disabled={isEnrolling}
              data-ocid="course_detail.enroll_button"
              className="shrink-0 gap-2 font-bold border border-amber-400/30 bg-amber-400/10 text-amber-300 hover:bg-amber-400/20 transition-colors"
              variant="outline"
            >
              {isEnrolling ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              {isEnrolling ? "Enrolling…" : "Start This Course"}
            </Button>
          </motion.div>
        )}

        {/* ── Progress bar (enrolled) */}
        {isEnrolled && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.35 }}
            data-ocid="course_detail.progress_section"
            className="backdrop-blur-md bg-white/5 border border-emerald-400/20 rounded-2xl p-[21px] space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-widest">
                  Enrolled
                </span>
              </div>
              <span className="font-mono text-xs text-foreground/40">
                {progress}% complete
              </span>
            </div>
            {/* Progress bar */}
            <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.86 0.18 85), oklch(0.78 0.22 60))",
                }}
              />
            </div>
          </motion.div>
        )}

        {/* ── Modules */}
        {!isLocked && (
          <motion.div
            initial={{ opacity: 0, y: 13 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            data-ocid="course_detail.modules_section"
            className="space-y-3"
          >
            <h2 className="font-mono text-xs font-bold text-foreground/40 uppercase tracking-widest px-1">
              Modules
            </h2>

            {detailLoading ? (
              <ModuleSkeletons />
            ) : (
              <div className="space-y-3">
                {modules.map((mod, i) => {
                  const isFirst = i === 0 && isEnrolled;
                  return (
                    <motion.div
                      key={`module-${mod.index}`}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      data-ocid={`course_detail.module.${mod.index}`}
                      className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div
                          className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center border ${
                            mod.completed
                              ? "border-emerald-400/30 bg-emerald-400/10"
                              : isFirst
                                ? "border-amber-400/30 bg-amber-400/10"
                                : "border-white/10 bg-white/5"
                          }`}
                        >
                          {mod.completed ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          ) : isEnrolled ? (
                            <BookOpen
                              className={`h-4 w-4 ${
                                isFirst
                                  ? "text-amber-400"
                                  : "text-foreground/30"
                              }`}
                            />
                          ) : (
                            <Lock className="h-4 w-4 text-foreground/20" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p
                            className={`font-display font-semibold text-sm truncate ${
                              mod.completed
                                ? "text-emerald-400"
                                : isFirst
                                  ? "text-foreground"
                                  : "text-foreground/50"
                            }`}
                          >
                            {mod.title}
                          </p>
                          <p className="font-mono text-[10px] text-foreground/30 uppercase tracking-wider">
                            Module {mod.index} of {modules.length}
                          </p>
                        </div>
                      </div>

                      {isEnrolled && !mod.completed && (
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          data-ocid={`course_detail.module_button.${mod.index}`}
                          onClick={() =>
                            toast.info(
                              `Module ${mod.index} — EDDI guidance coming soon`,
                            )
                          }
                          className={`shrink-0 text-xs font-mono gap-1.5 ${
                            isFirst
                              ? "border-amber-400/30 bg-amber-400/10 text-amber-300 hover:bg-amber-400/20"
                              : "border-white/10 bg-white/5 text-foreground/40 hover:bg-white/10"
                          }`}
                        >
                          {isFirst ? (
                            <>
                              <Sparkles className="h-3 w-3" />
                              Start
                            </>
                          ) : (
                            "Complete Module"
                          )}
                        </Button>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
