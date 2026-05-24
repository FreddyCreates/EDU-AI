import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  FileText,
  Filter,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

type AssignmentStatus = "pending" | "in-progress" | "completed" | "overdue";
type SubjectFilter = "all" | "math" | "science" | "english" | "history";

interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  daysLeft: number;
  status: AssignmentStatus;
  progress: number;
  totalParts: number;
  completedParts: number;
  teacher: string;
}

const sampleAssignments: Assignment[] = [
  {
    id: "1",
    title: "Quadratic Equations Practice Set",
    subject: "math",
    dueDate: "May 26, 2026",
    daysLeft: 2,
    status: "in-progress",
    progress: 60,
    totalParts: 5,
    completedParts: 3,
    teacher: "Ms. Rivera",
  },
  {
    id: "2",
    title: "Lab Report: Photosynthesis",
    subject: "science",
    dueDate: "May 27, 2026",
    daysLeft: 3,
    status: "pending",
    progress: 0,
    totalParts: 4,
    completedParts: 0,
    teacher: "Mr. Chen",
  },
  {
    id: "3",
    title: "Essay: The Great Gatsby Analysis",
    subject: "english",
    dueDate: "May 28, 2026",
    daysLeft: 4,
    status: "in-progress",
    progress: 25,
    totalParts: 4,
    completedParts: 1,
    teacher: "Mrs. Thompson",
  },
  {
    id: "4",
    title: "Chapter 12 Reading Questions",
    subject: "history",
    dueDate: "May 24, 2026",
    daysLeft: 0,
    status: "overdue",
    progress: 50,
    totalParts: 10,
    completedParts: 5,
    teacher: "Mr. Garcia",
  },
  {
    id: "5",
    title: "Geometry Proofs Worksheet",
    subject: "math",
    dueDate: "May 23, 2026",
    daysLeft: -1,
    status: "completed",
    progress: 100,
    totalParts: 8,
    completedParts: 8,
    teacher: "Ms. Rivera",
  },
];

const subjectColors: Record<string, string> = {
  math: "oklch(0.85 0.15 85)",
  science: "oklch(0.72 0.17 155)",
  english: "oklch(0.7 0.18 270)",
  history: "oklch(0.68 0.20 40)",
};

const statusBadgeStyles: Record<AssignmentStatus, string> = {
  pending:
    "bg-[oklch(0.5_0.08_265)]/20 text-[oklch(0.7_0.06_265)] border-[oklch(0.5_0.08_265)]/30",
  "in-progress":
    "bg-[oklch(0.72_0.17_155)]/20 text-[oklch(0.72_0.17_155)] border-[oklch(0.72_0.17_155)]/30",
  completed:
    "bg-[oklch(0.7_0.18_150)]/20 text-[oklch(0.7_0.18_150)] border-[oklch(0.7_0.18_150)]/30",
  overdue:
    "bg-[oklch(0.65_0.22_30)]/20 text-[oklch(0.75_0.2_60)] border-[oklch(0.65_0.22_30)]/30",
};

export default function HomeworkTracker() {
  const [filter, setFilter] = useState<SubjectFilter>("all");
  const [showCalendar, setShowCalendar] = useState(false);

  const filteredAssignments =
    filter === "all"
      ? sampleAssignments
      : sampleAssignments.filter((a) => a.subject === filter);

  const pendingCount = sampleAssignments.filter(
    (a) => a.status === "pending" || a.status === "in-progress",
  ).length;
  const overdueCount = sampleAssignments.filter(
    (a) => a.status === "overdue",
  ).length;

  return (
    <div
      data-ocid="student.homework.page"
      className="min-h-screen bg-[oklch(0.08_0.02_265)] px-4 py-6 pb-24"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="text-[oklch(0.6_0.08_265)] hover:text-[oklch(0.85_0.15_85)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-[oklch(0.95_0.02_265)]">
              Homework Tracker
            </h1>
            <p className="text-[oklch(0.5_0.06_265)] text-xs">
              {pendingCount} pending · {overdueCount} overdue
            </p>
          </div>
        </div>
        <Button
          type="button"
          size="sm"
          onClick={() => setShowCalendar(!showCalendar)}
          className="bg-[oklch(0.85_0.15_85)]/20 hover:bg-[oklch(0.85_0.15_85)]/30 text-[oklch(0.85_0.15_85)] border border-[oklch(0.85_0.15_85)]/30"
        >
          <Calendar className="w-4 h-4" />
        </Button>
      </div>

      {/* Calendar View */}
      {showCalendar && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5 mb-6"
          data-ocid="student.homework.calendar"
        >
          <h2 className="text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-4">
            <Calendar className="inline w-4 h-4 mr-2" />
            Due Date Calendar
          </h2>
          <div className="grid grid-cols-7 gap-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center text-[oklch(0.5_0.06_265)] text-xs py-2"
              >
                {day}
              </div>
            ))}
            {Array.from({ length: 7 }, (_, i) => i + 22).map((day) => {
              const hasAssignment = sampleAssignments.some(
                (a) =>
                  a.dueDate.includes(`May ${day}`) && a.status !== "completed",
              );
              return (
                <div
                  key={day}
                  className={`text-center py-3 rounded-lg ${
                    hasAssignment
                      ? "bg-[oklch(0.85_0.15_85)]/20 text-[oklch(0.85_0.15_85)]"
                      : "text-[oklch(0.6_0.06_265)]"
                  }`}
                >
                  {day}
                  {hasAssignment && (
                    <div className="w-1.5 h-1.5 rounded-full bg-[oklch(0.85_0.15_85)] mx-auto mt-1" />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-4 px-4">
        <Filter className="w-4 h-4 text-[oklch(0.5_0.06_265)] shrink-0 self-center" />
        {(["all", "math", "science", "english", "history"] as const).map(
          (f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                filter === f
                  ? "bg-[oklch(0.85_0.15_85)]/20 text-[oklch(0.85_0.15_85)] border border-[oklch(0.85_0.15_85)]/40"
                  : "bg-white/5 text-[oklch(0.6_0.06_265)] border border-white/10 hover:bg-white/10"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ),
        )}
      </div>

      {/* Assignment List */}
      <div className="space-y-3">
        {filteredAssignments.map((assignment, i) => (
          <motion.div
            key={assignment.id}
            data-ocid={`student.homework.item.${i + 1}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3 min-w-0">
                <button
                  type="button"
                  className="mt-0.5 shrink-0"
                  onClick={() => {}}
                >
                  {assignment.status === "completed" ? (
                    <CheckCircle2
                      className="w-5 h-5"
                      style={{ color: "oklch(0.7 0.18 150)" }}
                    />
                  ) : (
                    <Circle className="w-5 h-5 text-[oklch(0.4_0.06_265)]" />
                  )}
                </button>
                <div className="min-w-0">
                  <p
                    className={`text-sm font-medium ${
                      assignment.status === "completed"
                        ? "text-[oklch(0.5_0.06_265)] line-through"
                        : "text-[oklch(0.9_0.05_265)]"
                    }`}
                  >
                    {assignment.title}
                  </p>
                  <p className="text-[oklch(0.5_0.06_265)] text-xs mt-0.5">
                    {assignment.teacher} · {assignment.subject}
                  </p>
                </div>
              </div>
              <Badge className={statusBadgeStyles[assignment.status]}>
                {assignment.status === "in-progress"
                  ? "In Progress"
                  : assignment.status.charAt(0).toUpperCase() +
                    assignment.status.slice(1)}
              </Badge>
            </div>

            {/* Progress bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[oklch(0.5_0.06_265)] text-xs">
                  Progress: {assignment.completedParts}/{assignment.totalParts}{" "}
                  parts
                </span>
                <span
                  className="text-xs font-medium"
                  style={{ color: subjectColors[assignment.subject] }}
                >
                  {assignment.progress}%
                </span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${assignment.progress}%`,
                    background: subjectColors[assignment.subject],
                  }}
                />
              </div>
            </div>

            {/* Due date */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[oklch(0.5_0.06_265)]">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-xs">Due {assignment.dueDate}</span>
              </div>
              {assignment.daysLeft > 0 && assignment.status !== "completed" && (
                <span
                  className={`text-xs font-medium ${
                    assignment.daysLeft <= 1
                      ? "text-[oklch(0.75_0.2_60)]"
                      : "text-[oklch(0.72_0.17_155)]"
                  }`}
                >
                  {assignment.daysLeft} day
                  {assignment.daysLeft !== 1 ? "s" : ""} left
                </span>
              )}
              {assignment.status === "overdue" && (
                <span className="text-xs font-medium text-[oklch(0.75_0.2_60)]">
                  Overdue
                </span>
              )}
            </div>

            {/* Action button for incomplete assignments */}
            {assignment.status !== "completed" && (
              <Button
                type="button"
                size="sm"
                className="w-full mt-3 bg-white/5 hover:bg-white/10 text-[oklch(0.8_0.05_265)] border border-white/10"
              >
                <FileText className="w-4 h-4 mr-2" />
                Continue Working
              </Button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
