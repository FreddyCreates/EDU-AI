import type { Subject } from "@/backend";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllSubjects } from "@/hooks/use-curriculum";
import { useStudent } from "@/hooks/use-student";
import { Link } from "@tanstack/react-router";
import { BookOpen, ChevronRight, Lock, Star, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

const CYAN = "oklch(0.78 0.22 200)";

// Static fallback data enriched from backend when available
const SUBJECT_META: Record<
  string,
  { icon: string; masteryStatic: number; locked: boolean }
> = {
  mathematics: { icon: "∑", masteryStatic: 82, locked: false },
  science: { icon: "🔬", masteryStatic: 71, locked: false },
  english: { icon: "📖", masteryStatic: 89, locked: false },
  history: { icon: "🏛", masteryStatic: 65, locked: false },
  geography: { icon: "🌍", masteryStatic: 58, locked: true },
  physics: { icon: "⚡", masteryStatic: 0, locked: true },
  chemistry: { icon: "🧪", masteryStatic: 0, locked: true },
  biology: { icon: "🧬", masteryStatic: 0, locked: true },
  algebra: { icon: "χ", masteryStatic: 0, locked: true },
  geometry: { icon: "△", masteryStatic: 0, locked: true },
  literature: { icon: "📚", masteryStatic: 0, locked: true },
  government: { icon: "⚖", masteryStatic: 0, locked: true },
};

// Lesson counts per subject (not in backend type — stored locally)
const SUBJECT_WEEK_COUNTS: Record<string, number> = {
  mathematics: 34,
  science: 28,
  english: 42,
  history: 21,
  geography: 18,
  physics: 26,
  chemistry: 24,
  biology: 22,
  algebra: 20,
  geometry: 18,
  literature: 30,
  government: 16,
};

const FALLBACK_SUBJECTS: Subject[] = [
  { id: "mathematics", name: "Mathematics", gradeLevel: "Grade 5" },
  { id: "science", name: "Science", gradeLevel: "Grade 5" },
  { id: "english", name: "English Language Arts", gradeLevel: "Grade 5" },
  { id: "history", name: "History", gradeLevel: "Grade 5" },
  { id: "geography", name: "Geography", gradeLevel: "Grade 5" },
  { id: "physics", name: "Physics", gradeLevel: "Grade 6" },
  { id: "chemistry", name: "Chemistry", gradeLevel: "Grade 6" },
  { id: "biology", name: "Biology", gradeLevel: "Grade 6" },
  { id: "algebra", name: "Algebra", gradeLevel: "Grade 7" },
  { id: "geometry", name: "Geometry", gradeLevel: "Grade 7" },
  { id: "literature", name: "Literature", gradeLevel: "Grade 8" },
  { id: "government", name: "Government", gradeLevel: "Grade 8" },
];

function SubjectGridCard({
  subject,
  index,
}: { subject: Subject; index: number }) {
  const meta = SUBJECT_META[subject.id] ?? {
    icon: "📘",
    masteryStatic: 0,
    locked: false,
  };
  const mastery = meta.masteryStatic;
  const isLocked = meta.locked;
  // Fibonacci lock: locked if mastery below F(5)=5
  const fibLocked = isLocked && mastery < 5;

  return (
    <motion.div
      data-ocid={`subjects.subject_card.${index}`}
      initial={{ opacity: 0, y: 13 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (index - 1) * 0.04 }}
    >
      <Link
        to={isLocked ? "/subjects" : "/study/$subjectId"}
        params={{ subjectId: subject.id }}
        className={[
          "block rounded-2xl p-5 space-y-3 transition-smooth",
          isLocked
            ? "glass opacity-50 cursor-not-allowed"
            : "glass-max-student hover:scale-[1.02] hover:shadow-[0_0_32px_rgba(0,210,255,0.15)]",
        ].join(" ")}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="h-11 w-11 rounded-xl flex items-center justify-center text-xl shrink-0"
              style={{
                background: isLocked
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(0,210,255,0.1)",
                border: `1px solid ${isLocked ? "rgba(255,255,255,0.08)" : "rgba(0,210,255,0.25)"}`,
              }}
            >
              {isLocked ? (
                <Lock className="h-4 w-4 text-white/20" />
              ) : (
                meta.icon
              )}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm text-white/90 leading-tight">
                {subject.name}
              </p>
              <p className="text-xs text-white/30 mt-0.5">
                {SUBJECT_WEEK_COUNTS[subject.id] ?? 0} lessons
              </p>
            </div>
          </div>
          {!isLocked && (
            <ChevronRight className="h-4 w-4 text-white/20 shrink-0" />
          )}
        </div>

        {!isLocked && (
          <>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">
                  Mastery
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-mono text-white/20">
                    F⌊{Math.round(mastery / 10)}⌋
                  </span>
                  <span
                    className="text-xs font-mono font-bold"
                    style={{ color: CYAN }}
                  >
                    {mastery}%
                  </span>
                </div>
              </div>
              <div className="h-1.5 w-full rounded-full bg-white/5 relative overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${mastery}%`,
                    background: `linear-gradient(90deg, ${CYAN} 0%, oklch(0.85 0.18 195) 100%)`,
                    boxShadow: "0 0 8px rgba(0,210,255,0.4)",
                  }}
                />
              </div>
            </div>
            <div className="flex items-center gap-3 text-[10px] text-white/30">
              <span className="flex items-center gap-1">
                <Star className="h-2.5 w-2.5" />
                {mastery >= 80
                  ? "Advanced"
                  : mastery >= 50
                    ? "Progressing"
                    : "Beginner"}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="h-2.5 w-2.5" />
                {SUBJECT_WEEK_COUNTS[subject.id] ?? 0} weeks
              </span>
            </div>
          </>
        )}

        {fibLocked && (
          <div className="flex items-center gap-1.5 rounded-lg border border-white/5 bg-white/3 px-2.5 py-1.5">
            <span className="font-mono text-[9px] text-white/30">
              FIB LOCK · Mastery below F(5)=5
            </span>
          </div>
        )}
      </Link>
    </motion.div>
  );
}

export default function StudentSubjects() {
  const { profile } = useStudent();
  const { data: liveSubjects, isLoading } = useAllSubjects();

  const gradeDisplay = profile?.gradeLevel ?? "";
  const subjects: Subject[] =
    liveSubjects && liveSubjects.length > 0 ? liveSubjects : FALLBACK_SUBJECTS;
  const unlockedCount = subjects.filter(
    (s) => !SUBJECT_META[s.id]?.locked,
  ).length;

  // FIB floor — nearest Fibonacci integer
  const fibFloor = (n: number) => {
    const fibs = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
    let best = 1;
    for (const f of fibs) {
      if (f <= n) best = f;
      else break;
    }
    return best;
  };
  const avgMastery = Math.round(
    subjects
      .filter((s) => !SUBJECT_META[s.id]?.locked)
      .reduce((sum, s) => sum + (SUBJECT_META[s.id]?.masteryStatic ?? 0), 0) /
      Math.max(1, unlockedCount),
  );

  return (
    <div
      data-ocid="subjects.page"
      className="portal-enter p-[21px] space-y-[21px]"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-portal-student rounded-2xl p-6 relative overflow-hidden"
      >
        <div className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-[rgba(0,210,255,0.07)] blur-3xl" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.22_200)] animate-pulse" />
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[oklch(0.78_0.22_200)]">
                STUDENT OS · SUBJECTS
              </span>
            </div>
            <h1 className="font-display text-2xl font-black text-white/95">
              All Subjects
            </h1>
            <p className="text-sm text-white/50 mt-1">
              12 sovereign subjects · Fibonacci-gated by mastery
              {gradeDisplay ? ` · ${gradeDisplay}` : ""}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="glass-max-student rounded-xl px-4 py-2.5 text-center">
              <p className="font-display text-xl font-black text-white/90">
                {unlockedCount}
              </p>
              <p className="font-mono text-[9px] text-[oklch(0.78_0.22_200)] uppercase tracking-widest">
                Unlocked
              </p>
            </div>
            <div className="glass rounded-xl px-4 py-2.5 text-center">
              <p className="font-display text-xl font-black text-white/60">
                {subjects.length - unlockedCount}
              </p>
              <p className="font-mono text-[9px] text-white/30 uppercase tracking-widest">
                Locked
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mastery progress summary bar */}
      <div className="glass rounded-2xl p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-3.5 w-3.5 text-[oklch(0.78_0.22_200)]" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
              Overall Progress
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono text-white/20">
              Φ⌊{fibFloor(avgMastery)}⌋
            </span>
            <span
              className="text-xs font-mono font-bold"
              style={{ color: CYAN }}
            >
              {avgMastery}% avg mastery
            </span>
          </div>
        </div>
        <div className="flex gap-1">
          {subjects.map((s) => {
            const m = SUBJECT_META[s.id];
            return (
              <div
                key={s.id}
                className="flex-1 h-2 rounded-full"
                style={{
                  background: m?.locked
                    ? "rgba(255,255,255,0.05)"
                    : `oklch(0.78 0.22 200 / ${(m?.masteryStatic ?? 0) / 100})`,
                  boxShadow: m?.locked
                    ? "none"
                    : `0 0 4px rgba(0,210,255,${(m?.masteryStatic ?? 0) / 200})`,
                }}
                title={s.name}
              />
            );
          })}
        </div>
      </div>

      {/* Subjects grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[13px]">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-36 rounded-2xl" />
          ))}
        </div>
      ) : (
        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[13px]"
          data-ocid="subjects.grid"
        >
          {subjects.map((subject, i) => (
            <SubjectGridCard key={subject.id} subject={subject} index={i + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
