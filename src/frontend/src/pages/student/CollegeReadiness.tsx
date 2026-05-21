import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Calendar,
  GraduationCap,
} from "lucide-react";
import { motion } from "motion/react";

const stages = [
  { id: "exploring", label: "Exploring", done: true },
  { id: "preparing", label: "Preparing", done: true },
  { id: "applying", label: "Applying", done: false, current: true },
  { id: "deciding", label: "Deciding", done: false },
  { id: "enrolled", label: "Enrolled", done: false },
];

const colleges = [
  {
    name: "University of Texas at Austin",
    type: "Dream",
    deadline: "Dec 1",
    status: "researching",
  },
  {
    name: "Texas A&M University",
    type: "Target",
    deadline: "Jan 15",
    status: "researching",
  },
  {
    name: "University of Texas at Arlington",
    type: "Safety",
    deadline: "Mar 1",
    status: "accepted",
  },
  {
    name: "University of North Texas",
    type: "Safety",
    deadline: "Mar 15",
    status: "accepted",
  },
];

const apCourses = [
  "AP Calculus AB",
  "AP US History",
  "AP English Language",
  "AP Biology",
];

const timeline = [
  { date: "Jun 2026", event: "AP Exam results released", complete: false },
  {
    date: "Aug 2026",
    event: "Senior year begins — Common App opens",
    complete: false,
  },
  { date: "Oct 2026", event: "Early Action deadlines begin", complete: false },
  {
    date: "Jan 2027",
    event: "Regular Decision deadline for most schools",
    complete: false,
  },
  { date: "Apr 2027", event: "College Decision Day", complete: false },
];

export default function CollegeReadiness() {
  const readinessScore = 71;

  return (
    <div
      data-ocid="student.college.page"
      className="min-h-screen bg-[oklch(0.08_0.02_265)] px-4 py-6 pb-24"
    >
      <div className="flex items-center gap-3 mb-6">
        <Link
          to="/dashboard"
          className="text-[oklch(0.6_0.08_265)] hover:text-[oklch(0.85_0.15_85)] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-[oklch(0.95_0.02_265)]">
            College Readiness
          </h1>
          <p className="text-[oklch(0.5_0.06_265)] text-xs">
            Admissions timeline · COGT-powered
          </p>
        </div>
      </div>

      {/* Readiness Gauge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 mb-6 text-center"
      >
        <p className="text-[oklch(0.55_0.06_265)] text-xs uppercase tracking-widest mb-3">
          Readiness Score
        </p>
        <div className="relative w-32 h-32 mx-auto mb-3">
          <svg
            viewBox="0 0 120 120"
            className="w-full h-full -rotate-90"
            role="img"
            aria-label="College readiness score gauge"
          >
            <title>College readiness score gauge</title>
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="oklch(1_0_0/0.08)"
              strokeWidth="10"
            />
            <motion.circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="oklch(0.85_0.15_85)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 52}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
              animate={{
                strokeDashoffset: 2 * Math.PI * 52 * (1 - readinessScore / 100),
              }}
              transition={{ duration: 1.2, delay: 0.3 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-3xl font-bold text-[oklch(0.85_0.15_85)]">
              {readinessScore}
            </p>
          </div>
        </div>
        <p className="text-[oklch(0.65_0.06_265)] text-sm">
          Stage:{" "}
          <span className="text-[oklch(0.85_0.15_85)] font-semibold">
            Applying
          </span>
        </p>
      </motion.div>

      {/* Stage Progress */}
      <section className="mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {stages.map((s, i) => (
            <div key={s.id} className="flex items-center shrink-0">
              <div
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
                  s.current
                    ? "bg-[oklch(0.85_0.15_85)]/20 text-[oklch(0.85_0.15_85)] border border-[oklch(0.85_0.15_85)]/30"
                    : s.done
                      ? "bg-[oklch(0.7_0.18_150)]/20 text-[oklch(0.7_0.18_150)] border border-[oklch(0.7_0.18_150)]/20"
                      : "bg-white/5 text-[oklch(0.45_0.05_265)] border border-white/10"
                }`}
              >
                {s.done && !s.current && "✓ "}
                {s.label}
              </div>
              {i < stages.length - 1 && (
                <div className="w-4 h-px bg-white/20 mx-1" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* AP Courses */}
      <section className="mb-6">
        <h2 className="text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-3">
          <BookOpen className="inline w-4 h-4 mr-2" />
          AP/IB Courses
        </h2>
        <div className="flex flex-wrap gap-2">
          {apCourses.map((c) => (
            <span
              key={c}
              className="text-xs px-3 py-1.5 bg-[oklch(0.85_0.15_85)]/15 text-[oklch(0.85_0.15_85)] rounded-full border border-[oklch(0.85_0.15_85)]/25"
            >
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* College List */}
      <section className="mb-6">
        <h2 className="text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-3">
          <GraduationCap className="inline w-4 h-4 mr-2" />
          College List
        </h2>
        <div className="space-y-2">
          {colleges.map((c, i) => (
            <motion.div
              key={c.name}
              data-ocid={`student.college.school.${i + 1}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl"
            >
              <div>
                <p className="text-[oklch(0.85_0.05_265)] text-sm font-medium">
                  {c.name}
                </p>
                <p className="text-[oklch(0.5_0.06_265)] text-xs">
                  Deadline: {c.deadline}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge
                  className={`text-xs ${
                    c.type === "Dream"
                      ? "bg-[oklch(0.7_0.18_320)]/20 text-[oklch(0.7_0.18_320)] border-[oklch(0.7_0.18_320)]/30"
                      : c.type === "Target"
                        ? "bg-[oklch(0.85_0.15_85)]/20 text-[oklch(0.85_0.15_85)] border-[oklch(0.85_0.15_85)]/30"
                        : "bg-[oklch(0.7_0.18_150)]/20 text-[oklch(0.7_0.18_150)] border-[oklch(0.7_0.18_150)]/30"
                  }`}
                >
                  {c.type}
                </Badge>
                {c.status === "accepted" && (
                  <span className="text-xs text-[oklch(0.7_0.18_150)]">
                    ✓ Accepted
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section>
        <h2 className="text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-3">
          <Calendar className="inline w-4 h-4 mr-2" />
          Admissions Timeline
        </h2>
        <div className="relative pl-4">
          <div className="absolute left-1.5 top-0 bottom-0 w-px bg-white/10" />
          <div className="space-y-4">
            {timeline.map((t, i) => (
              <motion.div
                key={t.date}
                data-ocid={`student.college.timeline.${i + 1}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.07 }}
                className="relative"
              >
                <div className="absolute -left-4 top-1.5 w-2.5 h-2.5 rounded-full bg-[oklch(0.85_0.15_85)]/30 border border-[oklch(0.85_0.15_85)]/50" />
                <p className="text-[oklch(0.85_0.15_85)] text-xs font-semibold">
                  {t.date}
                </p>
                <p className="text-[oklch(0.65_0.06_265)] text-sm mt-0.5">
                  {t.event}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
