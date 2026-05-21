import EddiOrb from "@/components/EddiOrb";
import { MobileNav } from "@/components/layout/MobileNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  useAllRecognitionFlags,
  useSubmitNomination,
} from "@/hooks/use-recognition";
import { useClassesByTeacher, useTchrStats } from "@/hooks/use-tchr";
import type { Principal } from "@icp-sdk/core/principal";
import { useLocation, useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  Bell,
  BookOpen,
  CheckCircle,
  ChevronRight,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";

const PROGRAMS = ["NSHSS", "UIL", "AMC", "JSHS"] as const;
type Program = (typeof PROGRAMS)[number];

interface NominateTarget {
  flagId: Principal;
  studentName: string;
  subject: string;
  score: number;
}

function NominationModal({
  target,
  onClose,
}: {
  target: NominateTarget;
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const [program, setProgram] = useState<Program | null>(null);
  const [note, setNote] = useState("");
  const submitNomination = useSubmitNomination();

  function handleSubmit() {
    if (!program) return;
    submitNomination.mutate(
      { studentId: target.flagId, programName: program, teacherNote: note },
      { onSuccess: onClose },
    );
  }

  return (
    <Dialog open onOpenChange={() => onClose()}>
      <DialogContent
        className="max-w-md border border-violet-500/40"
        style={{
          background: "rgba(15,10,30,0.92)",
          backdropFilter: "blur(24px)",
        }}
        data-ocid="nomination.dialog"
      >
        <DialogHeader>
          <DialogTitle className="text-violet-200 font-display">
            Nominate {target.studentName}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Step {step} of 3 — {target.subject} · {target.score}% mastery
          </p>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-3 py-2" data-ocid="nomination.program_picker">
            <p className="text-sm text-violet-300 font-medium">
              Select Program
            </p>
            {PROGRAMS.map((p) => (
              <button
                key={p}
                type="button"
                data-ocid={`nomination.program_option.${p.toLowerCase()}`}
                onClick={() => setProgram(p)}
                className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 ${
                  program === p
                    ? "border-violet-400 bg-violet-500/20 text-violet-100"
                    : "border-violet-500/20 bg-white/5 text-muted-foreground hover:border-violet-400/40 hover:bg-white/10"
                }`}
              >
                <span className="font-semibold">{p}</span>
                <span className="text-xs ml-2 opacity-70">
                  {p === "NSHSS" && "National Society of High School Scholars"}
                  {p === "UIL" && "University Interscholastic League"}
                  {p === "AMC" && "American Mathematics Competition"}
                  {p === "JSHS" && "Junior Science & Humanities Symposium"}
                </span>
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3 py-2">
            <p className="text-sm text-violet-300 font-medium">Teacher Note</p>
            <Textarea
              data-ocid="nomination.note_textarea"
              placeholder="Describe why this student stands out — their patterns, persistence, and strengths..."
              className="min-h-[120px] border-violet-500/30 bg-white/5 text-foreground placeholder:text-muted-foreground resize-none"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        )}

        {step === 3 && (
          <div className="py-4 space-y-5">
            <div
              className="rounded-xl border border-violet-400/30 p-4"
              style={{ background: "rgba(139,92,246,0.08)" }}
            >
              <p className="text-xs text-violet-400 uppercase tracking-widest mb-1">
                Program
              </p>
              <p className="text-violet-200 font-semibold">{program}</p>
              {note && (
                <>
                  <p className="text-xs text-violet-400 uppercase tracking-widest mt-3 mb-1">
                    Note
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {note}
                  </p>
                </>
              )}
            </div>
            <blockquote className="border-l-2 border-amber-400/60 pl-4">
              <p className="text-sm italic text-amber-300/90 leading-relaxed">
                “Every student nominated through this system is seen the way
                Alfredo Medina Hernandez was seen — by a teacher who looked.”
              </p>
            </blockquote>
          </div>
        )}

        <DialogFooter className="gap-2">
          {step > 1 && (
            <Button
              type="button"
              variant="ghost"
              data-ocid="nomination.back_button"
              onClick={() => setStep((s) => s - 1)}
              className="text-muted-foreground"
            >
              Back
            </Button>
          )}
          <Button
            type="button"
            variant="ghost"
            data-ocid="nomination.cancel_button"
            onClick={onClose}
            className="text-muted-foreground"
          >
            Cancel
          </Button>
          {step < 3 ? (
            <Button
              type="button"
              data-ocid="nomination.next_button"
              onClick={() => setStep((s) => s + 1)}
              disabled={step === 1 && !program}
              className="bg-violet-600 hover:bg-violet-500 text-white"
            >
              Next
            </Button>
          ) : (
            <Button
              type="button"
              data-ocid="nomination.submit_button"
              onClick={handleSubmit}
              disabled={submitNomination.isPending}
              className="bg-violet-600 hover:bg-violet-500 text-white"
            >
              {submitNomination.isPending
                ? "Submitting..."
                : "Submit Nomination"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  colorClass,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  colorClass: string;
}) {
  return (
    <div
      className="rounded-2xl border border-violet-500/20 p-5 flex items-start gap-4"
      style={{
        background: "rgba(139,92,246,0.08)",
        backdropFilter: "blur(16px)",
      }}
    >
      <div className={`rounded-xl p-2.5 ${colorClass}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground font-display">
          {value}
        </p>
        <p className="text-sm text-muted-foreground mt-0.5">{label}</p>
      </div>
    </div>
  );
}

export default function TeacherDashboard() {
  const location = useLocation();
  const teacherId = "teacher-1";

  const { data: flags = [], isLoading: flagsLoading } =
    useAllRecognitionFlags();
  const { data: stats, isLoading: statsLoading } = useTchrStats();
  const { data: classes = [], isLoading: classesLoading } =
    useClassesByTeacher(teacherId);

  const navigate = useNavigate();
  const [nominateTarget, setNominateTarget] = useState<NominateTarget | null>(
    null,
  );

  return (
    <div
      className="min-h-screen pb-24"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139,92,246,0.15) 0%, transparent 70%), #0a0614",
      }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-30 border-b border-violet-500/20"
        style={{
          background: "rgba(10,6,20,0.85)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="max-w-4xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <EddiOrb mode="EXPLAIN" size="sm" label="EDDI Teacher Mode" />
            <div>
              <h1 className="text-xl font-bold text-violet-100 font-display">
                Teacher Dashboard
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                EDDI Teacher Mode · Live Intelligence Active
              </p>
            </div>
          </div>
          <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mr-1.5 animate-pulse inline-block" />
            Live
          </Badge>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 py-6 space-y-8">
        {/* Today's Intelligence */}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 border-l-4 border-l-amber-400/60 rounded-xl p-5">
          <h3 className="text-amber-300 font-semibold text-sm uppercase tracking-wider mb-3">
            Today's Intelligence
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-white/50 text-xs mb-2">Needs Attention</p>
              {["Rivera, M.", "Johnson, K.", "Patel, S."].map((name) => (
                <div key={name} className="flex items-center gap-2 py-1">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <span className="text-white/70 text-sm">{name}</span>
                </div>
              ))}
            </div>
            <div>
              <p className="text-white/50 text-xs mb-2">Accelerating</p>
              {["Kim, J.", "Davis, A.", "Torres, L."].map((name) => (
                <div key={name} className="flex items-center gap-2 py-1">
                  <div className="w-2 h-2 rounded-full bg-teal-400" />
                  <span className="text-white/70 text-sm">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recognition Alerts */}
        <section data-ocid="recognition.section">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-semibold text-amber-300 uppercase tracking-widest">
              Recognition Alerts
            </h2>
            {flags.length > 0 && (
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs ml-auto">
                {flags.length} flagged
              </Badge>
            )}
          </div>

          {flagsLoading && (
            <div className="space-y-3" data-ocid="recognition.loading_state">
              {[1, 2].map((i) => (
                <Skeleton key={i} className="h-20 rounded-2xl" />
              ))}
            </div>
          )}

          {!flagsLoading && flags.length === 0 && (
            <div
              className="rounded-2xl border border-violet-500/20 p-6 text-center"
              style={{ background: "rgba(139,92,246,0.04)" }}
              data-ocid="recognition.empty_state"
            >
              <CheckCircle className="w-8 h-8 text-violet-500/50 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                No recognition flags at this time
              </p>
            </div>
          )}

          <div className="space-y-3">
            {flags.map((flag, i) => (
              <div
                key={String(flag.studentId)}
                data-ocid={`recognition.item.${i + 1}`}
                className="rounded-2xl border border-violet-500/30 p-4 flex items-center justify-between gap-4"
                style={{
                  background: "rgba(139,92,246,0.08)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                    <Star className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground truncate">
                      {`Student (${String(flag.studentId).slice(0, 8)}...)`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {flag.subject ?? "Mathematics"} ·{" "}
                      <span className="text-violet-400 font-medium">
                        {Number(flag.masteryScore)}%
                      </span>{" "}
                      mastery
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  size="sm"
                  data-ocid={`recognition.nominate_button.${i + 1}`}
                  onClick={() =>
                    setNominateTarget({
                      flagId: flag.studentId,
                      studentName: `Student (${String(flag.studentId).slice(0, 8)}...)`,
                      subject: flag.subject ?? "Mathematics",
                      score: Number(flag.masteryScore),
                    })
                  }
                  className="bg-violet-600 hover:bg-violet-500 text-white flex-shrink-0"
                >
                  Nominate
                </Button>
                <button
                  type="button"
                  onClick={() =>
                    navigate({
                      to: "/nominations",
                      search: { studentId: String(flag.studentId) },
                    })
                  }
                  className="text-xs text-amber-300/70 hover:text-amber-300 underline underline-offset-2 transition-colors mt-1"
                >
                  Prepare Nomination →
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Stat Cards */}
        <section data-ocid="stats.section">
          <h2 className="text-sm font-semibold text-violet-400 uppercase tracking-widest mb-4">
            Class Intelligence
          </h2>
          {statsLoading ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              data-ocid="stats.loading_state"
            >
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard
                label="Total Classes"
                value={
                  stats?.totalClasses != null
                    ? `${Number(stats.totalClasses)} classes`
                    : "—"
                }
                icon={TrendingUp}
                colorClass="bg-violet-500/20 text-violet-400"
              />
              <StatCard
                label="Total Students"
                value={
                  stats?.totalStudents != null
                    ? Number(stats.totalStudents)
                    : "—"
                }
                icon={Users}
                colorClass="bg-emerald-500/20 text-emerald-400"
              />
              <StatCard
                label="Recommendations"
                value={
                  stats?.recommendationsGenerated != null
                    ? Number(stats.recommendationsGenerated)
                    : "—"
                }
                icon={AlertTriangle}
                colorClass="bg-amber-500/20 text-amber-400"
              />
            </div>
          )}
        </section>

        {/* Classes */}
        <section data-ocid="classes.section">
          <h2 className="text-sm font-semibold text-violet-400 uppercase tracking-widest mb-4">
            My Classes
          </h2>
          {classesLoading && (
            <div className="space-y-3" data-ocid="classes.loading_state">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 rounded-2xl" />
              ))}
            </div>
          )}
          {!classesLoading && classes.length === 0 && (
            <div
              className="rounded-2xl border border-violet-500/20 p-6 text-center"
              data-ocid="classes.empty_state"
            >
              <BookOpen className="w-8 h-8 text-violet-500/50 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                No classes assigned yet
              </p>
            </div>
          )}
          <div className="space-y-3">
            {classes.map((cls, i) => (
              <div
                key={cls.id}
                data-ocid={`classes.item.${i + 1}`}
                className="rounded-2xl border border-violet-500/20 p-4 flex items-center justify-between group hover:border-violet-400/40 transition-all duration-200 cursor-pointer"
                style={{
                  background: "rgba(139,92,246,0.07)",
                  backdropFilter: "blur(16px)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/15 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-violet-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{cls.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Grade {cls.gradeLevel} · {cls.studentIds.length} students
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-violet-400 transition-colors duration-200" />
              </div>
            ))}
          </div>
        </section>
      </div>

      {nominateTarget && (
        <NominationModal
          target={nominateTarget}
          onClose={() => setNominateTarget(null)}
        />
      )}

      <MobileNav
        portal="teacher"
        isActive={(to: string) => location.pathname === to}
      />
    </div>
  );
}
