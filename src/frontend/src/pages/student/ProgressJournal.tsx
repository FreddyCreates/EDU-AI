import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Calendar,
  ChevronRight,
  Download,
  Edit3,
  Sparkles,
  Star,
  Target,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface JournalEntry {
  id: string;
  date: string;
  prompt: string;
  response: string;
  mood: "excellent" | "good" | "neutral" | "struggling";
  subjects: string[];
  milestones: string[];
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  achievedDate: string;
  subject: string;
  type: "mastery" | "streak" | "achievement";
}

const journalEntries: JournalEntry[] = [
  {
    id: "1",
    date: "May 24, 2026",
    prompt: "What was your biggest learning breakthrough today?",
    response:
      "I finally understood how to factor trinomials! The trick with finding two numbers that multiply to C and add to B clicked for me during the practice session.",
    mood: "excellent",
    subjects: ["math"],
    milestones: ["Factoring Mastery"],
  },
  {
    id: "2",
    date: "May 23, 2026",
    prompt: "What topic challenged you most this week?",
    response:
      "The cell division process in Biology has a lot of steps to memorize. I created flashcards for mitosis and meiosis which helped a bit.",
    mood: "neutral",
    subjects: ["science"],
    milestones: [],
  },
  {
    id: "3",
    date: "May 22, 2026",
    prompt: "How did you apply what you learned outside of class?",
    response:
      "I noticed my mom using algebra when calculating discounts while shopping. I helped her figure out the final price with multiple discounts applied!",
    mood: "good",
    subjects: ["math"],
    milestones: ["Real-World Application"],
  },
];

const recentMilestones: Milestone[] = [
  {
    id: "1",
    title: "7-Day Study Streak",
    description: "Completed study sessions for 7 consecutive days",
    achievedDate: "May 24",
    subject: "general",
    type: "streak",
  },
  {
    id: "2",
    title: "Algebra Mastery 80%",
    description: "Reached 80% mastery in Quadratic Equations",
    achievedDate: "May 23",
    subject: "math",
    type: "mastery",
  },
  {
    id: "3",
    title: "Essay Excellence",
    description: "Received A on The Great Gatsby analysis",
    achievedDate: "May 21",
    subject: "english",
    type: "achievement",
  },
];

const dailyPrompts = [
  "What was your biggest learning breakthrough today?",
  "What topic challenged you most this week?",
  "How did you apply what you learned outside of class?",
  "What's one thing you want to improve on tomorrow?",
  "What study strategy worked well for you today?",
];

const moodColors: Record<string, string> = {
  excellent: "oklch(0.7 0.18 150)",
  good: "oklch(0.72 0.17 155)",
  neutral: "oklch(0.85 0.15 85)",
  struggling: "oklch(0.68 0.20 40)",
};

const subjectColors: Record<string, string> = {
  math: "oklch(0.85 0.15 85)",
  science: "oklch(0.72 0.17 155)",
  english: "oklch(0.7 0.18 270)",
  history: "oklch(0.68 0.20 40)",
  general: "oklch(0.7 0.18 320)",
};

export default function ProgressJournal() {
  const [activeTab, setActiveTab] = useState<"journal" | "milestones">(
    "journal",
  );
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [newEntryText, setNewEntryText] = useState("");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const todayPrompt = dailyPrompts[new Date().getDay() % dailyPrompts.length];
  const streakDays = 7;

  return (
    <div
      data-ocid="student.journal.page"
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
              Progress Journal
            </h1>
            <p className="text-[oklch(0.5_0.06_265)] text-xs">
              Reflect · Celebrate · Grow
            </p>
          </div>
        </div>
        <Badge className="bg-[oklch(0.85_0.15_85)]/20 text-[oklch(0.85_0.15_85)] border-[oklch(0.85_0.15_85)]/30">
          <Star className="w-3 h-3 mr-1 fill-[oklch(0.85_0.15_85)]" />
          {streakDays} Day Streak
        </Badge>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
          <p className="text-xl font-bold text-[oklch(0.85_0.15_85)]">
            {journalEntries.length}
          </p>
          <p className="text-[oklch(0.5_0.06_265)] text-xs">Entries</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
          <p className="text-xl font-bold text-[oklch(0.72_0.17_155)]">
            {recentMilestones.length}
          </p>
          <p className="text-[oklch(0.5_0.06_265)] text-xs">Milestones</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
          <p className="text-xl font-bold text-[oklch(0.7_0.18_270)]">
            {streakDays}
          </p>
          <p className="text-[oklch(0.5_0.06_265)] text-xs">Day Streak</p>
        </div>
      </div>

      {/* Tab Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          type="button"
          onClick={() => setActiveTab("journal")}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === "journal"
              ? "bg-[oklch(0.85_0.15_85)]/20 text-[oklch(0.85_0.15_85)] border border-[oklch(0.85_0.15_85)]/40"
              : "bg-white/5 text-[oklch(0.6_0.06_265)] border border-white/10"
          }`}
        >
          <Edit3 className="inline w-4 h-4 mr-1" />
          Journal
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("milestones")}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === "milestones"
              ? "bg-[oklch(0.85_0.15_85)]/20 text-[oklch(0.85_0.15_85)] border border-[oklch(0.85_0.15_85)]/40"
              : "bg-white/5 text-[oklch(0.6_0.06_265)] border border-white/10"
          }`}
        >
          <Award className="inline w-4 h-4 mr-1" />
          Milestones
        </button>
      </div>

      {activeTab === "journal" && (
        <>
          {/* Today's Prompt */}
          {!showNewEntry && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-[oklch(0.85_0.15_85)]/30 backdrop-blur-xl rounded-2xl p-5 mb-6"
              data-ocid="student.journal.prompt"
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[oklch(0.85_0.15_85)]" />
                <h2 className="text-[oklch(0.85_0.15_85)] text-sm font-semibold">
                  Today's Reflection
                </h2>
              </div>
              <p className="text-[oklch(0.8_0.05_265)] mb-4 italic">
                "{todayPrompt}"
              </p>
              <Button
                type="button"
                onClick={() => setShowNewEntry(true)}
                className="w-full bg-[oklch(0.85_0.15_85)]/20 hover:bg-[oklch(0.85_0.15_85)]/30 text-[oklch(0.85_0.15_85)] border border-[oklch(0.85_0.15_85)]/30"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Write Entry
              </Button>
            </motion.div>
          )}

          {/* New Entry Form */}
          {showNewEntry && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-[oklch(0.85_0.15_85)]/30 backdrop-blur-xl rounded-2xl p-5 mb-6"
              data-ocid="student.journal.new_entry"
            >
              <p className="text-[oklch(0.8_0.05_265)] mb-4 italic text-sm">
                "{todayPrompt}"
              </p>
              <Textarea
                placeholder="Share your thoughts..."
                value={newEntryText}
                onChange={(e) => setNewEntryText(e.target.value)}
                className="min-h-[120px] bg-white/5 border-white/10 text-[oklch(0.9_0.05_265)] placeholder:text-[oklch(0.4_0.05_265)] mb-4"
              />
              <div className="mb-4">
                <p className="text-[oklch(0.5_0.06_265)] text-xs mb-2">
                  How are you feeling?
                </p>
                <div className="flex gap-2">
                  {(
                    ["excellent", "good", "neutral", "struggling"] as const
                  ).map((mood) => (
                    <button
                      key={mood}
                      type="button"
                      onClick={() => setSelectedMood(mood)}
                      className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                        selectedMood === mood
                          ? "border-2"
                          : "border border-white/10"
                      }`}
                      style={{
                        background:
                          selectedMood === mood
                            ? `${moodColors[mood]}20`
                            : "transparent",
                        borderColor:
                          selectedMood === mood ? moodColors[mood] : undefined,
                        color:
                          selectedMood === mood
                            ? moodColors[mood]
                            : "oklch(0.6 0.06 265)",
                      }}
                    >
                      {mood.charAt(0).toUpperCase() + mood.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowNewEntry(false)}
                  className="flex-1 border-white/20 text-[oklch(0.6_0.08_265)]"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="flex-1 bg-[oklch(0.85_0.15_85)]/20 hover:bg-[oklch(0.85_0.15_85)]/30 text-[oklch(0.85_0.15_85)] border border-[oklch(0.85_0.15_85)]/30"
                >
                  Save Entry
                </Button>
              </div>
            </motion.div>
          )}

          {/* Past Entries */}
          <section>
            <h2 className="text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-4">
              <Calendar className="inline w-4 h-4 mr-2" />
              Past Entries
            </h2>
            <div className="space-y-3">
              {journalEntries.map((entry, i) => (
                <motion.div
                  key={entry.id}
                  data-ocid={`student.journal.entry.${i + 1}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-[oklch(0.5_0.06_265)] text-xs">
                        {entry.date}
                      </p>
                      <p className="text-[oklch(0.7_0.06_265)] text-xs italic mt-1">
                        "{entry.prompt}"
                      </p>
                    </div>
                    <Badge
                      className="capitalize"
                      style={{
                        background: `${moodColors[entry.mood]}20`,
                        color: moodColors[entry.mood],
                        borderColor: `${moodColors[entry.mood]}40`,
                      }}
                    >
                      {entry.mood}
                    </Badge>
                  </div>
                  <p className="text-[oklch(0.85_0.05_265)] text-sm leading-relaxed mb-3">
                    {entry.response}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {entry.subjects.map((subject) => (
                      <span
                        key={subject}
                        className="text-[10px] px-2 py-1 rounded-full"
                        style={{
                          background: `${subjectColors[subject]}20`,
                          color: subjectColors[subject],
                        }}
                      >
                        {subject}
                      </span>
                    ))}
                    {entry.milestones.map((milestone) => (
                      <span
                        key={milestone}
                        className="text-[10px] px-2 py-1 rounded-full bg-[oklch(0.85_0.15_85)]/20 text-[oklch(0.85_0.15_85)]"
                      >
                        🏆 {milestone}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </>
      )}

      {activeTab === "milestones" && (
        <section>
          <h2 className="text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-4">
            <Award className="inline w-4 h-4 mr-2" />
            Recent Achievements
          </h2>
          <div className="space-y-3">
            {recentMilestones.map((milestone, i) => (
              <motion.div
                key={milestone.id}
                data-ocid={`student.journal.milestone.${i + 1}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-4"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: `${subjectColors[milestone.subject]}20`,
                    }}
                  >
                    {milestone.type === "streak" && (
                      <Star
                        className="w-5 h-5"
                        style={{ color: subjectColors[milestone.subject] }}
                      />
                    )}
                    {milestone.type === "mastery" && (
                      <Target
                        className="w-5 h-5"
                        style={{ color: subjectColors[milestone.subject] }}
                      />
                    )}
                    {milestone.type === "achievement" && (
                      <Award
                        className="w-5 h-5"
                        style={{ color: subjectColors[milestone.subject] }}
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-[oklch(0.9_0.05_265)] font-medium">
                      {milestone.title}
                    </p>
                    <p className="text-[oklch(0.5_0.06_265)] text-sm">
                      {milestone.description}
                    </p>
                    <p className="text-[oklch(0.4_0.06_265)] text-xs mt-1">
                      {milestone.achievedDate}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Export Section */}
          <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[oklch(0.8_0.05_265)] font-medium">
                  Export Progress Report
                </p>
                <p className="text-[oklch(0.5_0.06_265)] text-xs">
                  Share with parents or counselors
                </p>
              </div>
              <Button
                type="button"
                size="sm"
                className="bg-white/5 hover:bg-white/10 text-[oklch(0.8_0.05_265)] border border-white/10"
              >
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
