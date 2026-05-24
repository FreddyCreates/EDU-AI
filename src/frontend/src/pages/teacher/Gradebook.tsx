import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BarChart2,
  BookOpen,
  ChevronDown,
  Download,
  Edit,
  Filter,
  Plus,
  Save,
  Search,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface Student {
  id: string;
  name: string;
  email: string;
  currentGrade: number;
  trend: "up" | "down" | "stable";
  assignments: {
    completed: number;
    total: number;
  };
  recentGrades: number[];
}

interface Assignment {
  id: string;
  title: string;
  maxPoints: number;
  weight: number;
  dueDate: string;
  category: "homework" | "quiz" | "test" | "project";
}

const students: Student[] = [
  {
    id: "1",
    name: "Maria Santos",
    email: "maria.s@school.edu",
    currentGrade: 94,
    trend: "up",
    assignments: { completed: 18, total: 20 },
    recentGrades: [92, 88, 95, 98, 94],
  },
  {
    id: "2",
    name: "James Kim",
    email: "james.k@school.edu",
    currentGrade: 87,
    trend: "stable",
    assignments: { completed: 19, total: 20 },
    recentGrades: [85, 88, 86, 89, 87],
  },
  {
    id: "3",
    name: "Priya Nair",
    email: "priya.n@school.edu",
    currentGrade: 91,
    trend: "up",
    assignments: { completed: 20, total: 20 },
    recentGrades: [88, 90, 89, 93, 95],
  },
  {
    id: "4",
    name: "Carlos Mendoza",
    email: "carlos.m@school.edu",
    currentGrade: 72,
    trend: "down",
    assignments: { completed: 15, total: 20 },
    recentGrades: [78, 75, 72, 70, 68],
  },
  {
    id: "5",
    name: "Sarah Johnson",
    email: "sarah.j@school.edu",
    currentGrade: 85,
    trend: "stable",
    assignments: { completed: 17, total: 20 },
    recentGrades: [84, 86, 85, 84, 86],
  },
];

const assignments: Assignment[] = [
  {
    id: "1",
    title: "Quadratic Equations Practice",
    maxPoints: 50,
    weight: 10,
    dueDate: "May 22",
    category: "homework",
  },
  {
    id: "2",
    title: "Chapter 7 Quiz",
    maxPoints: 25,
    weight: 15,
    dueDate: "May 24",
    category: "quiz",
  },
  {
    id: "3",
    title: "Unit 4 Test",
    maxPoints: 100,
    weight: 25,
    dueDate: "May 28",
    category: "test",
  },
];

const VIOLET = "oklch(0.7 0.18 270)";
const GOLD = "oklch(0.85 0.15 85)";
const EMERALD = "oklch(0.72 0.17 155)";
const AMBER = "oklch(0.68 0.20 40)";

const _categoryColors: Record<string, string> = {
  homework: VIOLET,
  quiz: GOLD,
  test: AMBER,
  project: EMERALD,
};

function getGradeColor(grade: number): string {
  if (grade >= 90) return EMERALD;
  if (grade >= 80) return GOLD;
  if (grade >= 70) return AMBER;
  return "oklch(0.65 0.22 30)";
}

export default function TeacherGradebook() {
  const [selectedClass, _setSelectedClass] = useState("Algebra II - Period 3");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddAssignment, setShowAddAssignment] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const classAverage = Math.round(
    students.reduce((acc, s) => acc + s.currentGrade, 0) / students.length,
  );

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div
      data-ocid="teacher.gradebook.page"
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
              Gradebook
            </h1>
            <p className="text-[oklch(0.5_0.06_265)] text-xs">
              {selectedClass}
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
            onClick={() => setShowAddAssignment(true)}
            className="bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 border border-violet-500/30"
          >
            <Plus className="w-4 h-4 mr-1" />
            Assignment
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-2xl font-bold" style={{ color: EMERALD }}>
            {classAverage}%
          </p>
          <p className="text-[oklch(0.5_0.06_265)] text-xs">Class Average</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-2xl font-bold text-violet-400">
            {students.length}
          </p>
          <p className="text-[oklch(0.5_0.06_265)] text-xs">Students</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-2xl font-bold" style={{ color: GOLD }}>
            {assignments.length}
          </p>
          <p className="text-[oklch(0.5_0.06_265)] text-xs">Assignments</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-2xl font-bold" style={{ color: AMBER }}>
            {students.filter((s) => s.trend === "down").length}
          </p>
          <p className="text-[oklch(0.5_0.06_265)] text-xs">Needs Attention</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(0.5_0.06_265)]" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-[oklch(0.85_0.05_265)] text-sm placeholder:text-[oklch(0.4_0.05_265)] focus:outline-none focus:border-violet-500/40"
          />
        </div>
        <Button
          type="button"
          variant="outline"
          className="border-white/10 text-[oklch(0.6_0.08_265)]"
        >
          <Filter className="w-4 h-4 mr-1" />
          Filter
        </Button>
      </div>

      {/* Grade Distribution Chart */}
      <section className="mb-6">
        <h2 className="text-violet-400 text-xs font-semibold uppercase tracking-widest mb-4">
          <BarChart2 className="inline w-4 h-4 mr-2" />
          Grade Distribution
        </h2>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-end gap-2 h-24">
            {[
              { range: "A (90+)", count: 2, color: EMERALD },
              { range: "B (80-89)", count: 2, color: GOLD },
              { range: "C (70-79)", count: 1, color: AMBER },
              { range: "D (60-69)", count: 0, color: "oklch(0.65 0.22 30)" },
              { range: "F (<60)", count: 0, color: "oklch(0.55 0.20 20)" },
            ].map((bucket, i) => (
              <div
                key={bucket.range}
                className="flex-1 flex flex-col items-center gap-1"
              >
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: i * 0.08 }}
                  style={{
                    height: `${Math.max(10, (bucket.count / 3) * 100)}%`,
                    background: bucket.color,
                    originY: 1,
                  }}
                  className="w-full rounded-t-md"
                />
                <span className="text-[9px] text-[oklch(0.5_0.06_265)]">
                  {bucket.range.split(" ")[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Students Table */}
      <section>
        <h2 className="text-violet-400 text-xs font-semibold uppercase tracking-widest mb-4">
          <Users className="inline w-4 h-4 mr-2" />
          Students ({filteredStudents.length})
        </h2>
        <div className="space-y-2">
          {filteredStudents.map((student, i) => (
            <motion.div
              key={student.id}
              data-ocid={`teacher.gradebook.student.${i + 1}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
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
                    <p className="text-[oklch(0.5_0.06_265)] text-xs">
                      {student.assignments.completed}/
                      {student.assignments.total} assignments
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p
                      className="text-xl font-bold"
                      style={{ color: getGradeColor(student.currentGrade) }}
                    >
                      {student.currentGrade}%
                    </p>
                    <div className="flex items-center gap-1 text-xs">
                      {student.trend === "up" && (
                        <TrendingUp
                          className="w-3 h-3"
                          style={{ color: EMERALD }}
                        />
                      )}
                      {student.trend === "down" && (
                        <TrendingUp
                          className="w-3 h-3 rotate-180"
                          style={{ color: "oklch(0.65 0.22 30)" }}
                        />
                      )}
                      <span
                        style={{
                          color:
                            student.trend === "up"
                              ? EMERALD
                              : student.trend === "down"
                                ? "oklch(0.65 0.22 30)"
                                : "oklch(0.5 0.06 265)",
                        }}
                      >
                        {student.trend === "up"
                          ? "Improving"
                          : student.trend === "down"
                            ? "Declining"
                            : "Stable"}
                      </span>
                    </div>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => setSelectedStudent(student)}
                    className="bg-white/5 hover:bg-white/10 text-[oklch(0.8_0.05_265)] border border-white/10"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Mini grade trend */}
              <div className="mt-3 flex items-center gap-1">
                <span className="text-[oklch(0.5_0.06_265)] text-[10px] mr-2">
                  Recent:
                </span>
                {student.recentGrades.map((grade, gi) => (
                  <div
                    key={`grade-${student.id}-${gi}`}
                    className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-medium"
                    style={{
                      background: `${getGradeColor(grade)}20`,
                      color: getGradeColor(grade),
                    }}
                  >
                    {grade}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Add Assignment Modal */}
      {showAddAssignment && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowAddAssignment(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[oklch(0.1_0.02_265)] border border-white/10 rounded-2xl p-6 w-full max-w-md"
          >
            <h2 className="text-lg font-bold text-[oklch(0.95_0.02_265)] mb-4">
              New Assignment
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Assignment title"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[oklch(0.85_0.05_265)] text-sm placeholder:text-[oklch(0.4_0.05_265)] focus:outline-none focus:border-violet-500/40"
              />
              <div className="grid grid-cols-2 gap-3">
                <select className="bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-[oklch(0.8_0.05_265)] text-sm focus:outline-none focus:border-violet-500/40">
                  <option value="homework">Homework</option>
                  <option value="quiz">Quiz</option>
                  <option value="test">Test</option>
                  <option value="project">Project</option>
                </select>
                <input
                  type="number"
                  placeholder="Max Points"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[oklch(0.85_0.05_265)] text-sm placeholder:text-[oklch(0.4_0.05_265)] focus:outline-none focus:border-violet-500/40"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[oklch(0.85_0.05_265)] text-sm focus:outline-none focus:border-violet-500/40"
                />
                <input
                  type="number"
                  placeholder="Weight %"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[oklch(0.85_0.05_265)] text-sm placeholder:text-[oklch(0.4_0.05_265)] focus:outline-none focus:border-violet-500/40"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddAssignment(false)}
                  className="flex-1 border-white/20 text-[oklch(0.6_0.08_265)]"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="flex-1 bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 border border-violet-500/30"
                >
                  <Save className="w-4 h-4 mr-1" />
                  Create
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Student Detail Modal */}
      {selectedStudent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedStudent(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[oklch(0.1_0.02_265)] border border-white/10 rounded-2xl p-6 w-full max-w-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center text-violet-300 font-bold text-lg">
                {selectedStudent.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <h2 className="text-lg font-bold text-[oklch(0.95_0.02_265)]">
                  {selectedStudent.name}
                </h2>
                <p className="text-[oklch(0.5_0.06_265)] text-sm">
                  {selectedStudent.email}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-violet-400 text-xs font-semibold uppercase tracking-widest">
                Enter Grades
              </h3>
              {assignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="flex items-center justify-between bg-white/5 rounded-xl p-3"
                >
                  <div>
                    <p className="text-[oklch(0.85_0.05_265)] text-sm font-medium">
                      {assignment.title}
                    </p>
                    <p className="text-[oklch(0.5_0.06_265)] text-xs">
                      {assignment.maxPoints} pts · {assignment.weight}% weight
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="—"
                      className="w-16 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-center text-[oklch(0.85_0.05_265)] text-sm focus:outline-none focus:border-violet-500/40"
                    />
                    <span className="text-[oklch(0.5_0.06_265)] text-sm">
                      /{assignment.maxPoints}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setSelectedStudent(null)}
                className="flex-1 border-white/20 text-[oklch(0.6_0.08_265)]"
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="flex-1 bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 border border-violet-500/30"
              >
                <Save className="w-4 h-4 mr-1" />
                Save Grades
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
