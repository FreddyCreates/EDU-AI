import type { RecognitionFlag } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { Award, ChevronRight, Star, Trophy } from "lucide-react";
import { motion } from "motion/react";

interface RecognitionAlertProps {
  flags: RecognitionFlag[];
  variant: "student" | "teacher";
}

const PROGRAM_ICONS: Record<string, string> = {
  NSHSS: "🏅",
  UIL: "🎯",
  AMC: "📐",
  JSHS: "🔬",
};

export function RecognitionAlert({ flags, variant }: RecognitionAlertProps) {
  if (flags.length === 0) return null;

  if (variant === "student") {
    const flag = flags[0];
    const programs = flag.eligiblePrograms.slice(0, 4);
    return (
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        data-ocid="recognition.student_alert"
        className="rounded-2xl p-5 relative overflow-hidden animate-shimmer-stream"
        style={{
          background:
            "linear-gradient(135deg, rgba(251,191,36,0.12) 0%, rgba(12,14,28,0.82) 100%)",
          border: "1px solid rgba(251,191,36,0.28)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(251,191,36,0.10), inset 0 1px 0 rgba(251,191,36,0.10)",
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)",
        }}
      >
        <div
          className="pointer-events-none absolute -top-6 -right-6 h-32 w-32 rounded-full blur-3xl"
          style={{ background: "rgba(251,191,36,0.10)" }}
        />
        <div className="relative">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{
                  background: "rgba(251,191,36,0.18)",
                  border: "1px solid rgba(251,191,36,0.35)",
                  boxShadow: "0 0 16px rgba(251,191,36,0.20)",
                }}
              >
                <Trophy
                  className="h-5 w-5"
                  style={{ color: "rgb(251,191,36)" }}
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span
                    className="font-mono text-[9px] font-bold uppercase tracking-widest"
                    style={{ color: "rgb(251,191,36)" }}
                  >
                    RCGN · Recognition Alert
                  </span>
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-70"
                      style={{ background: "rgb(251,191,36)" }}
                    />
                    <span
                      className="relative inline-flex rounded-full h-2 w-2"
                      style={{ background: "rgb(251,191,36)" }}
                    />
                  </span>
                </div>
                <p className="font-display text-base font-bold text-white/90">
                  {flag.subject} — {flag.pattern}
                </p>
              </div>
            </div>
            <Badge
              className="shrink-0 font-mono text-xs border"
              style={{
                background: "rgba(251,191,36,0.15)",
                borderColor: "rgba(251,191,36,0.35)",
                color: "rgb(251,191,36)",
              }}
            >
              {Number(flag.masteryScore)}%
            </Badge>
          </div>
          <p className="text-sm text-white/60 mb-4">
            Sovereign engine detected a recognition-eligible performance
            pattern. You may qualify for the following national programs:
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {programs.map((prog) => (
              <span
                key={prog.name}
                className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold"
                style={{
                  background: "rgba(251,191,36,0.10)",
                  border: "1px solid rgba(251,191,36,0.25)",
                  color: "rgb(253,224,130)",
                }}
              >
                <span aria-hidden="true">
                  {PROGRAM_ICONS[prog.name] ?? "⭐"}
                </span>
                {prog.name}
              </span>
            ))}
          </div>
          <Link
            to="/recognition"
            data-ocid="recognition.view_details_button"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all hover:opacity-90 active:scale-95"
            style={{
              background:
                "linear-gradient(135deg, rgb(234,179,8), rgb(161,98,7))",
              color: "rgb(0,0,0)",
              boxShadow: "0 0 16px rgba(251,191,36,0.30)",
            }}
          >
            <Award className="h-3.5 w-3.5" />
            View Details
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </motion.div>
    );
  }

  const flagged = flags.length;
  const uniqueStudents = new Set(flags.map((f) => f.studentId.toString())).size;

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      data-ocid="recognition.teacher_alert"
      className="rounded-2xl p-5 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(251,191,36,0.10) 0%, rgba(12,14,28,0.82) 100%)",
        border: "1px solid rgba(251,191,36,0.25)",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(251,191,36,0.08), inset 0 1px 0 rgba(251,191,36,0.08)",
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
      }}
    >
      <div
        className="pointer-events-none absolute -top-4 -right-4 h-24 w-24 rounded-full blur-3xl"
        style={{ background: "rgba(251,191,36,0.08)" }}
      />
      <div className="relative">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
              style={{
                background: "rgba(251,191,36,0.15)",
                border: "1px solid rgba(251,191,36,0.30)",
              }}
            >
              <Star className="h-4 w-4" style={{ color: "rgb(251,191,36)" }} />
            </div>
            <div>
              <p
                className="font-mono text-[9px] font-bold uppercase tracking-widest mb-0.5"
                style={{ color: "rgb(251,191,36)" }}
              >
                RCGN · Nomination Alert
              </p>
              <p className="font-display font-bold text-sm text-white/90">
                {uniqueStudents} student{uniqueStudents !== 1 ? "s" : ""}{" "}
                flagged for recognition
              </p>
            </div>
          </div>
          <Badge
            className="shrink-0 font-mono text-xs border"
            style={{
              background: "rgba(251,191,36,0.15)",
              borderColor: "rgba(251,191,36,0.30)",
              color: "rgb(251,191,36)",
            }}
          >
            {flagged} flag{flagged !== 1 ? "s" : ""}
          </Badge>
        </div>
        <div className="space-y-2 mb-4">
          {flags.slice(0, 3).map((flag, i) => (
            <div
              key={flag.id}
              data-ocid={`recognition.flagged_student.${i + 1}`}
              className="flex items-center justify-between rounded-xl px-3 py-2"
              style={{
                background: "rgba(251,191,36,0.06)",
                border: "1px solid rgba(251,191,36,0.14)",
              }}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xs font-semibold text-white/80 truncate">
                  {flag.studentId.toString().slice(0, 8)}…
                </span>
                <Badge
                  variant="outline"
                  className="text-[9px] font-mono"
                  style={{
                    borderColor: "rgba(251,191,36,0.25)",
                    color: "rgb(253,224,130)",
                  }}
                >
                  {flag.subject}
                </Badge>
              </div>
              <span
                className="text-[9px] font-mono shrink-0"
                style={{ color: "rgb(251,191,36)" }}
              >
                {flag.pattern}
              </span>
            </div>
          ))}
          {flags.length > 3 && (
            <p className="text-xs text-white/40 text-center font-mono">
              +{flags.length - 3} more flagged students
            </p>
          )}
        </div>
        <Link
          to="/nominations"
          data-ocid="recognition.review_nominations_link"
          className="inline-flex items-center gap-2 text-xs font-semibold transition-smooth hover:opacity-80"
          style={{ color: "rgb(251,191,36)" }}
        >
          Review Nominations <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}
