import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  Brain,
  Calendar,
  ChevronRight,
  Clock,
  Plus,
  Sparkles,
  Target,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface StudyBlock {
  id: string;
  subject: string;
  topic: string;
  duration: number; // Fibonacci minutes: 13, 21, 34, 55
  startTime: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
}

interface StudyGoal {
  id: string;
  title: string;
  targetMastery: number;
  currentMastery: number;
  deadline: string;
  subject: string;
}

// Fibonacci time blocks
const FIBONACCI_DURATIONS = [13, 21, 34, 55];

const todaySchedule: StudyBlock[] = [
  {
    id: "1",
    subject: "Algebra II",
    topic: "Quadratic Equations",
    duration: 34,
    startTime: "3:00 PM",
    priority: "high",
    completed: true,
  },
  {
    id: "2",
    subject: "Biology",
    topic: "Cell Division",
    duration: 21,
    startTime: "3:45 PM",
    priority: "medium",
    completed: true,
  },
  {
    id: "3",
    subject: "English",
    topic: "Essay Writing",
    duration: 34,
    startTime: "4:15 PM",
    priority: "high",
    completed: false,
  },
  {
    id: "4",
    subject: "History",
    topic: "WWII Analysis",
    duration: 21,
    startTime: "5:00 PM",
    priority: "low",
    completed: false,
  },
];

const weeklyGoals: StudyGoal[] = [
  {
    id: "1",
    title: "Master Quadratic Formula",
    targetMastery: 90,
    currentMastery: 72,
    deadline: "May 30",
    subject: "math",
  },
  {
    id: "2",
    title: "Complete Biology Chapter 8",
    targetMastery: 85,
    currentMastery: 45,
    deadline: "May 28",
    subject: "science",
  },
  {
    id: "3",
    title: "Improve Essay Structure",
    targetMastery: 80,
    currentMastery: 60,
    deadline: "Jun 2",
    subject: "english",
  },
];

const subjectColors: Record<string, string> = {
  math: "oklch(0.85 0.15 85)",
  science: "oklch(0.72 0.17 155)",
  english: "oklch(0.7 0.18 270)",
  history: "oklch(0.68 0.20 40)",
};

const priorityColors: Record<string, string> = {
  high: "oklch(0.65 0.22 30)",
  medium: "oklch(0.85 0.15 85)",
  low: "oklch(0.72 0.17 155)",
};

const subjectMap: Record<string, string> = {
  "Algebra II": "math",
  Biology: "science",
  English: "english",
  History: "history",
};

export default function StudyPlanner() {
  const [showGenerator, setShowGenerator] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState<number>(34);
  const [viewMode, setViewMode] = useState<"today" | "week">("today");

  const completedBlocks = todaySchedule.filter((b) => b.completed).length;
  const totalMinutes = todaySchedule.reduce((acc, b) => acc + b.duration, 0);
  const completedMinutes = todaySchedule
    .filter((b) => b.completed)
    .reduce((acc, b) => acc + b.duration, 0);

  return (
    <div
      data-ocid="student.planner.page"
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
              Study Planner
            </h1>
            <p className="text-[oklch(0.5_0.06_265)] text-xs">
              Fibonacci-based scheduling · Diego Protocol
            </p>
          </div>
        </div>
        <Button
          type="button"
          size="sm"
          onClick={() => setShowGenerator(!showGenerator)}
          className="bg-[oklch(0.85_0.15_85)]/20 hover:bg-[oklch(0.85_0.15_85)]/30 text-[oklch(0.85_0.15_85)] border border-[oklch(0.85_0.15_85)]/30"
        >
          <Sparkles className="w-4 h-4 mr-1" /> Generate
        </Button>
      </div>

      {/* AI Schedule Generator */}
      {showGenerator && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-[oklch(0.85_0.15_85)]/30 backdrop-blur-xl rounded-2xl p-5 mb-6"
          data-ocid="student.planner.generator"
        >
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-[oklch(0.85_0.15_85)]" />
            <h2 className="text-[oklch(0.85_0.15_85)] text-sm font-semibold">
              AI Schedule Generator
            </h2>
          </div>
          <p className="text-[oklch(0.6_0.06_265)] text-sm mb-4">
            EDDI will analyze your passport memory and create an optimal study
            schedule using Fibonacci time blocks.
          </p>

          <div className="mb-4">
            <p className="text-[oklch(0.5_0.06_265)] text-xs mb-2">
              Preferred session length
            </p>
            <div className="flex gap-2">
              {FIBONACCI_DURATIONS.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setSelectedDuration(d)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedDuration === d
                      ? "bg-[oklch(0.85_0.15_85)]/20 text-[oklch(0.85_0.15_85)] border border-[oklch(0.85_0.15_85)]/40"
                      : "bg-white/5 text-[oklch(0.6_0.06_265)] border border-white/10"
                  }`}
                >
                  {d} min
                </button>
              ))}
            </div>
          </div>

          <Button
            type="button"
            className="w-full bg-[oklch(0.85_0.15_85)]/20 hover:bg-[oklch(0.85_0.15_85)]/30 text-[oklch(0.85_0.15_85)] border border-[oklch(0.85_0.15_85)]/30"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Generate Weekly Schedule
          </Button>
        </motion.div>
      )}

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
          <p className="text-xl font-bold text-[oklch(0.85_0.15_85)]">
            {completedBlocks}/{todaySchedule.length}
          </p>
          <p className="text-[oklch(0.5_0.06_265)] text-xs">Sessions</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
          <p className="text-xl font-bold text-[oklch(0.72_0.17_155)]">
            {completedMinutes}
          </p>
          <p className="text-[oklch(0.5_0.06_265)] text-xs">Min Done</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
          <p className="text-xl font-bold text-[oklch(0.68_0.20_40)]">
            {totalMinutes - completedMinutes}
          </p>
          <p className="text-[oklch(0.5_0.06_265)] text-xs">Min Left</p>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          type="button"
          onClick={() => setViewMode("today")}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
            viewMode === "today"
              ? "bg-[oklch(0.85_0.15_85)]/20 text-[oklch(0.85_0.15_85)] border border-[oklch(0.85_0.15_85)]/40"
              : "bg-white/5 text-[oklch(0.6_0.06_265)] border border-white/10"
          }`}
        >
          <Clock className="inline w-4 h-4 mr-1" />
          Today
        </button>
        <button
          type="button"
          onClick={() => setViewMode("week")}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
            viewMode === "week"
              ? "bg-[oklch(0.85_0.15_85)]/20 text-[oklch(0.85_0.15_85)] border border-[oklch(0.85_0.15_85)]/40"
              : "bg-white/5 text-[oklch(0.6_0.06_265)] border border-white/10"
          }`}
        >
          <Calendar className="inline w-4 h-4 mr-1" />
          Week
        </button>
      </div>

      {viewMode === "today" && (
        <>
          {/* Today's Schedule */}
          <section className="mb-8">
            <h2 className="text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-4">
              <Clock className="inline w-4 h-4 mr-2" />
              Today's Schedule
            </h2>
            <div className="space-y-3">
              {todaySchedule.map((block, i) => (
                <motion.div
                  key={block.id}
                  data-ocid={`student.planner.block.${i + 1}`}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className={`bg-white/5 border backdrop-blur-xl rounded-xl p-4 ${
                    block.completed
                      ? "border-[oklch(0.7_0.18_150)]/30 opacity-60"
                      : "border-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: `${subjectColors[subjectMap[block.subject]]}20`,
                        }}
                      >
                        <BookOpen
                          className="w-5 h-5"
                          style={{
                            color: subjectColors[subjectMap[block.subject]],
                          }}
                        />
                      </div>
                      <div>
                        <p
                          className={`font-medium ${block.completed ? "text-[oklch(0.5_0.06_265)] line-through" : "text-[oklch(0.9_0.05_265)]"}`}
                        >
                          {block.subject}
                        </p>
                        <p className="text-[oklch(0.5_0.06_265)] text-xs">
                          {block.topic}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        className={`text-[10px] ${
                          block.completed
                            ? "bg-[oklch(0.7_0.18_150)]/20 text-[oklch(0.7_0.18_150)] border-[oklch(0.7_0.18_150)]/30"
                            : `bg-[${priorityColors[block.priority]}]/20 border-[${priorityColors[block.priority]}]/30`
                        }`}
                        style={
                          !block.completed
                            ? { color: priorityColors[block.priority] }
                            : {}
                        }
                      >
                        {block.completed ? "Done" : block.priority}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[oklch(0.5_0.06_265)]">
                    <span>{block.startTime}</span>
                    <span className="font-mono">{block.duration} min</span>
                  </div>
                  {!block.completed && (
                    <Button
                      type="button"
                      size="sm"
                      className="w-full mt-3 bg-white/5 hover:bg-white/10 text-[oklch(0.8_0.05_265)] border border-white/10"
                    >
                      Start Session
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  )}
                </motion.div>
              ))}
            </div>
          </section>

          {/* Add Block */}
          <Button
            type="button"
            variant="outline"
            className="w-full border-dashed border-white/20 text-[oklch(0.6_0.06_265)] hover:bg-white/5 mb-8"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Study Block
          </Button>
        </>
      )}

      {viewMode === "week" && (
        /* Weekly Goals */
        <section>
          <h2 className="text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-4">
            <Target className="inline w-4 h-4 mr-2" />
            Weekly Mastery Goals
          </h2>
          <div className="space-y-3">
            {weeklyGoals.map((goal, i) => (
              <motion.div
                key={goal.id}
                data-ocid={`student.planner.goal.${i + 1}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-[oklch(0.9_0.05_265)] font-medium">
                      {goal.title}
                    </p>
                    <p className="text-[oklch(0.5_0.06_265)] text-xs">
                      Due {goal.deadline}
                    </p>
                  </div>
                  <span
                    className="text-sm font-bold"
                    style={{ color: subjectColors[goal.subject] }}
                  >
                    {goal.currentMastery}%
                  </span>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between text-xs text-[oklch(0.5_0.06_265)] mb-1">
                    <span>Current</span>
                    <span>Target: {goal.targetMastery}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all relative"
                      style={{
                        width: `${goal.currentMastery}%`,
                        background: subjectColors[goal.subject],
                      }}
                    />
                  </div>
                </div>
                <p className="text-[oklch(0.6_0.06_265)] text-xs">
                  {goal.targetMastery - goal.currentMastery}% to reach goal
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
