import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Download,
  Filter,
  Search,
  TrendingDown,
  UserCheck,
  UserX,
  Users,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

type AttendanceStatus = "present" | "absent" | "tardy" | "excused";

interface StudentAttendance {
  id: string;
  name: string;
  todayStatus: AttendanceStatus | null;
  weeklyRate: number;
  monthlyRate: number;
  consecutiveAbsences: number;
  lastAbsence: string | null;
}

interface AttendancePattern {
  studentId: string;
  studentName: string;
  pattern: string;
  severity: "warning" | "alert" | "critical";
  details: string;
}

const students: StudentAttendance[] = [
  {
    id: "1",
    name: "Maria Santos",
    todayStatus: null,
    weeklyRate: 100,
    monthlyRate: 98,
    consecutiveAbsences: 0,
    lastAbsence: "May 10",
  },
  {
    id: "2",
    name: "James Kim",
    todayStatus: null,
    weeklyRate: 80,
    monthlyRate: 85,
    consecutiveAbsences: 0,
    lastAbsence: "May 22",
  },
  {
    id: "3",
    name: "Priya Nair",
    todayStatus: null,
    weeklyRate: 100,
    monthlyRate: 100,
    consecutiveAbsences: 0,
    lastAbsence: null,
  },
  {
    id: "4",
    name: "Carlos Mendoza",
    todayStatus: null,
    weeklyRate: 60,
    monthlyRate: 72,
    consecutiveAbsences: 2,
    lastAbsence: "May 23",
  },
  {
    id: "5",
    name: "Sarah Johnson",
    todayStatus: null,
    weeklyRate: 100,
    monthlyRate: 95,
    consecutiveAbsences: 0,
    lastAbsence: "May 15",
  },
  {
    id: "6",
    name: "David Lee",
    todayStatus: null,
    weeklyRate: 40,
    monthlyRate: 68,
    consecutiveAbsences: 3,
    lastAbsence: "May 24",
  },
];

const attendancePatterns: AttendancePattern[] = [
  {
    studentId: "6",
    studentName: "David Lee",
    pattern: "3 Consecutive Absences",
    severity: "critical",
    details: "Has missed May 22, 23, and 24. May need intervention.",
  },
  {
    studentId: "4",
    studentName: "Carlos Mendoza",
    pattern: "Frequent Tardiness",
    severity: "warning",
    details: "Tardy 4 times this month, primarily on Monday mornings.",
  },
  {
    studentId: "2",
    studentName: "James Kim",
    pattern: "Friday Pattern",
    severity: "alert",
    details: "Absent on 3 out of 4 Fridays this month.",
  },
];

const _VIOLET = "oklch(0.7 0.18 270)";
const GOLD = "oklch(0.85 0.15 85)";
const EMERALD = "oklch(0.72 0.17 155)";
const AMBER = "oklch(0.68 0.20 40)";
const RED = "oklch(0.65 0.22 30)";

const statusColors: Record<AttendanceStatus, string> = {
  present: EMERALD,
  absent: RED,
  tardy: AMBER,
  excused: GOLD,
};

const statusIcons: Record<AttendanceStatus, typeof Check> = {
  present: Check,
  absent: X,
  tardy: Clock,
  excused: UserCheck,
};

function getAttendanceColor(rate: number): string {
  if (rate >= 95) return EMERALD;
  if (rate >= 85) return GOLD;
  if (rate >= 75) return AMBER;
  return RED;
}

export default function AttendanceTracker() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [attendance, setAttendance] = useState<
    Record<string, AttendanceStatus | null>
  >(
    students.reduce(
      (acc, s) => {
        acc[s.id] = s.todayStatus;
        return acc;
      },
      {} as Record<string, AttendanceStatus | null>,
    ),
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showPatterns, setShowPatterns] = useState(true);

  const presentCount = Object.values(attendance).filter(
    (s) => s === "present",
  ).length;
  const absentCount = Object.values(attendance).filter(
    (s) => s === "absent",
  ).length;
  const tardyCount = Object.values(attendance).filter(
    (s) => s === "tardy",
  ).length;

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: prev[studentId] === status ? null : status,
    }));
  };

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const markAllPresent = () => {
    const newAttendance: Record<string, AttendanceStatus> = {};
    students.forEach((s) => {
      newAttendance[s.id] = "present";
    });
    setAttendance(newAttendance);
  };

  return (
    <div
      data-ocid="teacher.attendance.page"
      className="min-h-screen bg-[oklch(0.08_0.02_265)] p-4 md:p-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link
            to="/teacher"
            className="text-[oklch(0.6_0.08_265)] hover:text-violet-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-[oklch(0.95_0.02_265)]">
              Attendance
            </h1>
            <p className="text-[oklch(0.5_0.06_265)] text-xs">
              Algebra II - Period 3
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            size="sm"
            className="bg-white/5 hover:bg-white/10 text-[oklch(0.8_0.05_265)] border border-white/10"
          >
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={markAllPresent}
            className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30"
          >
            <UserCheck className="w-4 h-4 mr-1" />
            Mark All Present
          </Button>
        </div>
      </div>

      {/* Date Selector */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-violet-400" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[oklch(0.85_0.05_265)] text-sm focus:outline-none focus:border-violet-500/40"
          />
        </div>
        <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30">
          Today
        </Badge>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold" style={{ color: EMERALD }}>
            {presentCount}
          </p>
          <p className="text-[oklch(0.5_0.06_265)] text-xs">Present</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold" style={{ color: RED }}>
            {absentCount}
          </p>
          <p className="text-[oklch(0.5_0.06_265)] text-xs">Absent</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold" style={{ color: AMBER }}>
            {tardyCount}
          </p>
          <p className="text-[oklch(0.5_0.06_265)] text-xs">Tardy</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-violet-400">
            {students.length - presentCount - absentCount - tardyCount}
          </p>
          <p className="text-[oklch(0.5_0.06_265)] text-xs">Unmarked</p>
        </div>
      </div>

      {/* Attendance Patterns Alert */}
      {attendancePatterns.length > 0 && (
        <section className="mb-6">
          <button
            type="button"
            onClick={() => setShowPatterns(!showPatterns)}
            className="flex items-center justify-between w-full bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-3"
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <span className="text-amber-300 font-medium">
                {attendancePatterns.length} Attendance Patterns Detected
              </span>
            </div>
            {showPatterns ? (
              <ChevronUp className="w-4 h-4 text-amber-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {showPatterns && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-2"
            >
              {attendancePatterns.map((pattern, i) => (
                <motion.div
                  key={pattern.studentId}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-4"
                  style={{
                    borderLeftWidth: 4,
                    borderLeftColor:
                      pattern.severity === "critical"
                        ? RED
                        : pattern.severity === "alert"
                          ? AMBER
                          : GOLD,
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[oklch(0.9_0.05_265)] font-medium">
                        {pattern.studentName}
                      </p>
                      <p
                        className="text-sm font-medium"
                        style={{
                          color:
                            pattern.severity === "critical"
                              ? RED
                              : pattern.severity === "alert"
                                ? AMBER
                                : GOLD,
                        }}
                      >
                        {pattern.pattern}
                      </p>
                      <p className="text-[oklch(0.5_0.06_265)] text-xs mt-1">
                        {pattern.details}
                      </p>
                    </div>
                    <Badge
                      className="capitalize"
                      style={{
                        background: `${
                          pattern.severity === "critical"
                            ? RED
                            : pattern.severity === "alert"
                              ? AMBER
                              : GOLD
                        }20`,
                        color:
                          pattern.severity === "critical"
                            ? RED
                            : pattern.severity === "alert"
                              ? AMBER
                              : GOLD,
                        borderColor: `${
                          pattern.severity === "critical"
                            ? RED
                            : pattern.severity === "alert"
                              ? AMBER
                              : GOLD
                        }40`,
                      }}
                    >
                      {pattern.severity}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>
      )}

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(0.5_0.06_265)]" />
        <input
          type="text"
          placeholder="Search students..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-[oklch(0.85_0.05_265)] text-sm placeholder:text-[oklch(0.4_0.05_265)] focus:outline-none focus:border-violet-500/40"
        />
      </div>

      {/* Student Attendance List */}
      <section>
        <h2 className="text-violet-400 text-xs font-semibold uppercase tracking-widest mb-4">
          <Users className="inline w-4 h-4 mr-2" />
          Take Attendance
        </h2>
        <div className="space-y-2">
          {filteredStudents.map((student, i) => {
            const currentStatus = attendance[student.id];
            return (
              <motion.div
                key={student.id}
                data-ocid={`teacher.attendance.student.${i + 1}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center text-violet-300 font-bold">
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-[oklch(0.9_0.05_265)] font-medium">
                        {student.name}
                      </p>
                      <div className="flex items-center gap-3 text-xs">
                        <span
                          style={{
                            color: getAttendanceColor(student.monthlyRate),
                          }}
                        >
                          {student.monthlyRate}% monthly
                        </span>
                        {student.consecutiveAbsences > 0 && (
                          <span
                            className="flex items-center gap-1"
                            style={{ color: RED }}
                          >
                            <TrendingDown className="w-3 h-3" />
                            {student.consecutiveAbsences} absent
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status Buttons */}
                  <div className="flex gap-1">
                    {(
                      [
                        "present",
                        "tardy",
                        "absent",
                        "excused",
                      ] as AttendanceStatus[]
                    ).map((status) => {
                      const Icon = statusIcons[status];
                      const isSelected = currentStatus === status;
                      return (
                        <button
                          key={status}
                          type="button"
                          onClick={() => handleStatusChange(student.id, status)}
                          className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                            isSelected
                              ? "ring-2"
                              : "bg-white/5 hover:bg-white/10"
                          }`}
                          style={{
                            background: isSelected
                              ? `${statusColors[status]}30`
                              : undefined,
                            ringColor: isSelected
                              ? statusColors[status]
                              : undefined,
                          }}
                          title={
                            status.charAt(0).toUpperCase() + status.slice(1)
                          }
                        >
                          <Icon
                            className="w-4 h-4"
                            style={{
                              color: isSelected
                                ? statusColors[status]
                                : "oklch(0.5 0.06 265)",
                            }}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Save Button */}
      <div className="fixed bottom-6 left-4 right-4 md:left-auto md:right-8 md:w-auto">
        <Button
          type="button"
          className="w-full md:w-auto bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 border border-violet-500/30 shadow-lg"
        >
          <Check className="w-4 h-4 mr-2" />
          Save Attendance
        </Button>
      </div>
    </div>
  );
}
