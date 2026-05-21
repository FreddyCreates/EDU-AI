import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  FileText,
  Plus,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

type AssignmentType = "homework" | "quiz" | "test" | "project" | "essay";

const sampleAssignments = [
  {
    id: "1",
    title: "Quadratic Equations Practice Set",
    type: "homework" as AssignmentType,
    dueDate: "May 22, 2026",
    totalPoints: 50,
    submissions: 22,
    total: 28,
    graded: 8,
  },
  {
    id: "2",
    title: "Chapter 7 Quiz — Factoring",
    type: "quiz" as AssignmentType,
    dueDate: "May 24, 2026",
    totalPoints: 25,
    submissions: 14,
    total: 28,
    graded: 0,
  },
  {
    id: "3",
    title: "Unit 4 Test — Polynomials",
    type: "test" as AssignmentType,
    dueDate: "May 28, 2026",
    totalPoints: 100,
    submissions: 0,
    total: 28,
    graded: 0,
  },
];

const typeColor: Record<AssignmentType, string> = {
  homework:
    "bg-[oklch(0.7_0.18_270)]/20 text-[oklch(0.7_0.18_270)] border-[oklch(0.7_0.18_270)]/30",
  quiz: "bg-[oklch(0.85_0.15_85)]/20 text-[oklch(0.85_0.15_85)] border-[oklch(0.85_0.15_85)]/30",
  test: "bg-[oklch(0.65_0.22_30)]/20 text-[oklch(0.75_0.2_60)] border-[oklch(0.65_0.22_30)]/30",
  project:
    "bg-[oklch(0.7_0.18_320)]/20 text-[oklch(0.7_0.18_320)] border-[oklch(0.7_0.18_320)]/30",
  essay:
    "bg-[oklch(0.7_0.18_150)]/20 text-[oklch(0.7_0.18_150)] border-[oklch(0.7_0.18_150)]/30",
};

export default function Assignments() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState<AssignmentType>("homework");
  const [dueDate, setDueDate] = useState("");
  const [points, setPoints] = useState("25");

  return (
    <div
      data-ocid="teacher.assignments.page"
      className="min-h-screen bg-[oklch(0.08_0.02_265)] p-4 md:p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link
            to="/teacher"
            className="text-[oklch(0.6_0.08_265)] hover:text-[oklch(0.85_0.15_85)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-[oklch(0.95_0.02_265)]">
              Assignments
            </h1>
            <p className="text-[oklch(0.5_0.06_265)] text-xs">
              Algebra II — Period 3
            </p>
          </div>
        </div>
        <Button
          type="button"
          data-ocid="teacher.assignments.create_button"
          onClick={() => setShowCreate(!showCreate)}
          size="sm"
          className="bg-[oklch(0.85_0.15_85)]/20 hover:bg-[oklch(0.85_0.15_85)]/30 text-[oklch(0.85_0.15_85)] border border-[oklch(0.85_0.15_85)]/30"
        >
          <Plus className="w-4 h-4 mr-1" /> New
        </Button>
      </div>

      {/* Create Form */}
      {showCreate && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-[oklch(0.85_0.15_85)]/30 backdrop-blur-xl rounded-2xl p-5 mb-6 space-y-4"
          data-ocid="teacher.assignments.create_form"
        >
          <h2 className="text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest">
            New Assignment
          </h2>
          <input
            data-ocid="teacher.assignments.title_input"
            type="text"
            placeholder="Assignment title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[oklch(0.85_0.05_265)] text-sm placeholder:text-[oklch(0.4_0.05_265)] focus:outline-none focus:border-[oklch(0.85_0.15_85)]/40 transition-colors"
          />
          <div className="grid grid-cols-2 gap-3">
            <select
              data-ocid="teacher.assignments.type_select"
              value={type}
              onChange={(e) => setType(e.target.value as AssignmentType)}
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-[oklch(0.8_0.05_265)] text-sm focus:outline-none focus:border-[oklch(0.85_0.15_85)]/40"
            >
              {(
                [
                  "homework",
                  "quiz",
                  "test",
                  "project",
                  "essay",
                ] as AssignmentType[]
              ).map((t) => (
                <option key={t} value={t} className="bg-[oklch(0.1_0.02_265)]">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>
            <input
              data-ocid="teacher.assignments.points_input"
              type="number"
              placeholder="Points"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[oklch(0.85_0.05_265)] text-sm placeholder:text-[oklch(0.4_0.05_265)] focus:outline-none focus:border-[oklch(0.85_0.15_85)]/40"
            />
          </div>
          <input
            data-ocid="teacher.assignments.due_date_input"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[oklch(0.85_0.05_265)] text-sm focus:outline-none focus:border-[oklch(0.85_0.15_85)]/40"
          />
          <div className="flex gap-3">
            <Button
              type="button"
              data-ocid="teacher.assignments.publish_button"
              className="flex-1 bg-[oklch(0.85_0.15_85)]/20 hover:bg-[oklch(0.85_0.15_85)]/30 text-[oklch(0.85_0.15_85)] border border-[oklch(0.85_0.15_85)]/30"
            >
              Publish Assignment
            </Button>
            <Button
              type="button"
              data-ocid="teacher.assignments.cancel_button"
              variant="outline"
              onClick={() => setShowCreate(false)}
              className="border-white/20 text-[oklch(0.6_0.08_265)] hover:bg-white/10"
            >
              Cancel
            </Button>
          </div>
        </motion.div>
      )}

      {/* Assignment List */}
      <div className="space-y-3">
        {sampleAssignments.map((a, i) => (
          <motion.div
            key={a.id}
            data-ocid={`teacher.assignment.${i + 1}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setExpanded(expanded === a.id ? null : a.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="w-4 h-4 text-[oklch(0.55_0.06_265)] shrink-0" />
                <div className="min-w-0">
                  <p className="text-[oklch(0.85_0.05_265)] text-sm font-medium truncate">
                    {a.title}
                  </p>
                  <p className="text-[oklch(0.5_0.06_265)] text-xs">
                    Due {a.dueDate} · {a.totalPoints}pts
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-3">
                <Badge className={`text-xs ${typeColor[a.type]}`}>
                  {a.type}
                </Badge>
                {expanded === a.id ? (
                  <ChevronUp className="w-4 h-4 text-[oklch(0.5_0.06_265)]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[oklch(0.5_0.06_265)]" />
                )}
              </div>
            </button>

            {expanded === a.id && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 pt-0 border-t border-white/10">
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="text-center">
                      <p className="text-xl font-bold text-[oklch(0.85_0.15_85)]">
                        {a.submissions}
                      </p>
                      <p className="text-[oklch(0.5_0.06_265)] text-xs">
                        Submitted
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-[oklch(0.65_0.22_30)]">
                        {a.total - a.submissions}
                      </p>
                      <p className="text-[oklch(0.5_0.06_265)] text-xs">
                        Pending
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-[oklch(0.7_0.18_150)]">
                        {a.graded}
                      </p>
                      <p className="text-[oklch(0.5_0.06_265)] text-xs">
                        Graded
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[oklch(0.85_0.15_85)] rounded-full"
                      style={{ width: `${(a.submissions / a.total) * 100}%` }}
                    />
                  </div>
                  <p className="text-[oklch(0.5_0.06_265)] text-xs text-right mt-1">
                    {Math.round((a.submissions / a.total) * 100)}% submitted
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
