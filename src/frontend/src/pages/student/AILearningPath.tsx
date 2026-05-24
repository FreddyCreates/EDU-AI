// Student AI Learning Path — Adaptive Curriculum Intelligence
// EDDI-powered personalized learning journey with real-time adaptation

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Bot,
  Brain,
  CheckCircle2,
  ChevronRight,
  Clock,
  Code2,
  Flame,
  GamepadIcon,
  GraduationCap,
  HelpCircle,
  Layers,
  Lightbulb,
  Lock,
  Map,
  Medal,
  Play,
  Rocket,
  Sparkles,
  Star,
  Target,
  Timer,
  Trophy,
  Unlock,
  Video,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const EMERALD = "oklch(0.72 0.17 155)";
const GOLD = "oklch(0.76 0.18 84)";
const PURPLE = "oklch(0.68 0.18 280)";
const CYAN = "oklch(0.65 0.22 200)";

interface LearningModule {
  id: string;
  title: string;
  subject: string;
  status: "completed" | "current" | "available" | "locked";
  progress: number;
  estimatedTime: number;
  difficulty: "foundational" | "building" | "challenging" | "mastery";
  contentTypes: ("video" | "interactive" | "practice" | "quiz" | "project")[];
  masteryScore?: number;
  aiRecommended?: boolean;
  aiReason?: string;
  prerequisites?: string[];
  skills: string[];
}

interface LearningPath {
  id: string;
  name: string;
  subject: string;
  description: string;
  modules: LearningModule[];
  overallProgress: number;
  estimatedCompletion: string;
  weeklyGoal: number;
  weeklyProgress: number;
  streak: number;
}

interface StudentProfile {
  name: string;
  learningStyle: string;
  optimalTime: string;
  currentStrength: string;
  growthArea: string;
  totalXP: number;
  level: number;
  achievements: { name: string; icon: typeof Trophy }[];
}

const studentProfile: StudentProfile = {
  name: "Alex",
  learningStyle: "Visual + Kinesthetic",
  optimalTime: "Morning (8-10 AM)",
  currentStrength: "Problem Solving",
  growthArea: "Abstract Concepts",
  totalXP: 2450,
  level: 7,
  achievements: [
    { name: "7-Day Streak", icon: Flame },
    { name: "Algebra Master", icon: Medal },
    { name: "Quick Learner", icon: Zap },
  ],
};

const currentPath: LearningPath = {
  id: "path-algebra-2",
  name: "Algebra II Mastery",
  subject: "Mathematics",
  description: "Master advanced algebraic concepts through adaptive learning",
  overallProgress: 62,
  estimatedCompletion: "Dec 15, 2024",
  weeklyGoal: 5,
  weeklyProgress: 3,
  streak: 7,
  modules: [
    {
      id: "mod-001",
      title: "Linear Equations Review",
      subject: "Algebra",
      status: "completed",
      progress: 100,
      estimatedTime: 45,
      difficulty: "foundational",
      contentTypes: ["video", "practice", "quiz"],
      masteryScore: 94,
      skills: ["Solving equations", "Graphing lines", "Slope-intercept form"],
    },
    {
      id: "mod-002",
      title: "Systems of Equations",
      subject: "Algebra",
      status: "completed",
      progress: 100,
      estimatedTime: 60,
      difficulty: "building",
      contentTypes: ["video", "interactive", "practice", "quiz"],
      masteryScore: 87,
      skills: ["Substitution method", "Elimination method", "Word problems"],
    },
    {
      id: "mod-003",
      title: "Quadratic Functions",
      subject: "Algebra",
      status: "current",
      progress: 65,
      estimatedTime: 75,
      difficulty: "building",
      contentTypes: ["video", "interactive", "practice", "quiz", "project"],
      aiRecommended: true,
      aiReason: "Your visual learning style matches well with the graphing activities in this module",
      skills: ["Factoring", "Vertex form", "Graphing parabolas"],
    },
    {
      id: "mod-004",
      title: "Polynomial Operations",
      subject: "Algebra",
      status: "available",
      progress: 0,
      estimatedTime: 55,
      difficulty: "building",
      contentTypes: ["video", "practice", "quiz"],
      prerequisites: ["Quadratic Functions"],
      skills: ["Adding polynomials", "Multiplying polynomials", "Long division"],
    },
    {
      id: "mod-005",
      title: "Rational Expressions",
      subject: "Algebra",
      status: "locked",
      progress: 0,
      estimatedTime: 65,
      difficulty: "challenging",
      contentTypes: ["video", "interactive", "practice", "quiz"],
      prerequisites: ["Polynomial Operations"],
      skills: ["Simplifying rationals", "Operations with rationals"],
    },
    {
      id: "mod-006",
      title: "Advanced Problem Solving",
      subject: "Algebra",
      status: "locked",
      progress: 0,
      estimatedTime: 90,
      difficulty: "mastery",
      contentTypes: ["project", "interactive", "quiz"],
      prerequisites: ["Rational Expressions"],
      skills: ["Real-world applications", "Multi-step problems"],
    },
  ],
};

const aiSuggestions = [
  {
    type: "focus",
    title: "Focus Session Recommended",
    description: "Your performance peaks in the morning. Consider starting today's module now for optimal retention.",
    icon: Target,
    color: EMERALD,
    action: "Start Session",
  },
  {
    type: "practice",
    title: "Reinforce Factoring Skills",
    description: "Your recent quiz showed 78% on factoring. A quick 10-minute practice could boost mastery.",
    icon: Zap,
    color: GOLD,
    action: "Practice Now",
  },
  {
    type: "challenge",
    title: "Ready for a Challenge?",
    description: "You've mastered basic quadratics. Try an advanced problem to unlock bonus XP!",
    icon: Rocket,
    color: PURPLE,
    action: "Take Challenge",
  },
];

const contentTypeIcons: Record<LearningModule["contentTypes"][number], typeof Video> = {
  video: Video,
  interactive: GamepadIcon,
  practice: Target,
  quiz: HelpCircle,
  project: Code2,
};

function getDifficultyColor(difficulty: LearningModule["difficulty"]) {
  switch (difficulty) {
    case "foundational":
      return EMERALD;
    case "building":
      return CYAN;
    case "challenging":
      return GOLD;
    case "mastery":
      return PURPLE;
    default:
      return EMERALD;
  }
}

function getStatusColor(status: LearningModule["status"]) {
  switch (status) {
    case "completed":
      return EMERALD;
    case "current":
      return CYAN;
    case "available":
      return GOLD;
    case "locked":
      return "oklch(0.45 0.0 0)";
    default:
      return EMERALD;
  }
}

function ModuleCard({ module, index }: { module: LearningModule; index: number }) {
  const statusColor = getStatusColor(module.status);
  const difficultyColor = getDifficultyColor(module.difficulty);
  const isLocked = module.status === "locked";

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      className={`relative flex items-start gap-4 ${isLocked ? "opacity-50" : ""}`}
    >
      {/* Connection Line */}
      {index < currentPath.modules.length - 1 && (
        <div
          className="absolute left-5 top-12 w-0.5 h-[calc(100%+1rem)]"
          style={{
            background: module.status === "completed" ? EMERALD : "oklch(0.35 0.0 0)",
          }}
        />
      )}

      {/* Status Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 z-10"
        style={{
          background: statusColor.replace(")", " / 0.15)"),
          border: `1px solid ${statusColor.replace(")", " / 0.35)")}`,
        }}
      >
        {module.status === "completed" ? (
          <CheckCircle2 className="w-5 h-5" style={{ color: EMERALD }} />
        ) : module.status === "locked" ? (
          <Lock className="w-4 h-4 text-muted-foreground" />
        ) : module.status === "current" ? (
          <Play className="w-4 h-4" style={{ color: CYAN }} />
        ) : (
          <Unlock className="w-4 h-4" style={{ color: GOLD }} />
        )}
      </div>

      {/* Module Content */}
      <div
        className={`flex-1 glass rounded-xl p-4 ${
          module.status === "current" ? "ring-2" : ""
        }`}
        style={{
          border: `1px solid ${statusColor.replace(")", " / 0.25)")}`,
          boxShadow: module.status === "current" ? `0 0 20px ${CYAN.replace(")", " / 0.15)")}` : undefined,
          ...(module.status === "current" && { "--tw-ring-color": CYAN.replace(")", " / 0.4)") } as Record<string, string>),
        }}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-display font-semibold text-foreground">{module.title}</h4>
              {module.aiRecommended && (
                <Badge
                  className="text-[8px]"
                  style={{
                    background: PURPLE.replace(")", " / 0.15)"),
                    color: PURPLE,
                    border: `1px solid ${PURPLE.replace(")", " / 0.30)")}`,
                  }}
                >
                  <Sparkles className="w-2.5 h-2.5 mr-0.5" />
                  AI Pick
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-3 mt-1">
              <Badge
                variant="outline"
                className="text-[9px]"
                style={{ borderColor: difficultyColor.replace(")", " / 0.40)"), color: difficultyColor }}
              >
                {module.difficulty}
              </Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {module.estimatedTime} min
              </span>
            </div>
          </div>
          {module.masteryScore && (
            <div className="text-right">
              <p className="text-lg font-display font-bold" style={{ color: EMERALD }}>
                {module.masteryScore}%
              </p>
              <p className="text-[9px] text-muted-foreground">Mastery</p>
            </div>
          )}
        </div>

        {/* Content Types */}
        <div className="flex items-center gap-2 mt-3">
          {module.contentTypes.map((type) => {
            const Icon = contentTypeIcons[type];
            return (
              <div
                key={type}
                className="flex items-center gap-1 px-2 py-1 rounded-md glass-sm"
                title={type}
              >
                <Icon className="w-3 h-3 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground capitalize">{type}</span>
              </div>
            );
          })}
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {module.skills.map((skill) => (
            <span
              key={skill}
              className="px-2 py-0.5 text-[10px] rounded-full"
              style={{
                background: "oklch(0.45 0.0 0 / 0.3)",
                color: "oklch(0.75 0.0 0)",
              }}
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Progress Bar */}
        {module.progress > 0 && module.progress < 100 && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
              <span>Progress</span>
              <span>{module.progress}%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${module.progress}%` }}
                className="h-full rounded-full"
                style={{ background: CYAN }}
              />
            </div>
          </div>
        )}

        {/* AI Recommendation Reason */}
        {module.aiReason && (
          <div
            className="mt-3 p-2.5 rounded-lg flex items-start gap-2"
            style={{
              background: PURPLE.replace(")", " / 0.08)"),
              border: `1px solid ${PURPLE.replace(")", " / 0.18)")}`,
            }}
          >
            <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" style={{ color: PURPLE }} />
            <p className="text-xs text-muted-foreground">{module.aiReason}</p>
          </div>
        )}

        {/* Action Button */}
        {!isLocked && (
          <Button
            size="sm"
            className="mt-3 w-full h-8 text-xs gap-1.5"
            style={{
              background: module.status === "current" ? CYAN.replace(")", " / 0.20)") : "oklch(0.30 0.0 0 / 0.5)",
              border: `1px solid ${module.status === "current" ? CYAN.replace(")", " / 0.40)") : "oklch(0.45 0.0 0 / 0.4)"}`,
            }}
          >
            {module.status === "completed" ? (
              <>
                <Target className="w-3.5 h-3.5" />
                Review Module
              </>
            ) : module.status === "current" ? (
              <>
                <Play className="w-3.5 h-3.5" />
                Continue Learning
              </>
            ) : (
              <>
                <ArrowRight className="w-3.5 h-3.5" />
                Start Module
              </>
            )}
          </Button>
        )}

        {/* Locked Prerequisites */}
        {isLocked && module.prerequisites && (
          <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
            <Lock className="w-3 h-3" />
            Complete {module.prerequisites.join(", ")} to unlock
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function AILearningPath() {
  return (
    <div className="portal-enter min-h-screen" data-ocid="student_learning_path_ai.page">
      {/* Header */}
      <div
        className="glass sticky top-0 z-30"
        style={{ borderBottom: `1px solid ${CYAN.replace(")", " / 0.18)")}` }}
      >
        <div className="mx-auto max-w-[1400px] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/student/homework">
              <Button variant="ghost" size="sm" className="gap-1.5">
                <ArrowLeft className="h-4 w-4" />
                Student Portal
              </Button>
            </Link>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-3">
              <div
                className="flex items-center gap-2.5 rounded-xl px-4 py-2"
                style={{
                  background: `linear-gradient(135deg, ${CYAN.replace(")", " / 0.20)")} 0%, ${PURPLE.replace(")", " / 0.10)")} 100%)`,
                  border: `1px solid ${CYAN.replace(")", " / 0.35)")}`,
                }}
              >
                <Map className="h-4 w-4" style={{ color: CYAN }} />
                <span
                  className="font-display font-bold text-sm"
                  style={{ color: CYAN, letterSpacing: "0.15em" }}
                >
                  AI LEARNING PATH
                </span>
              </div>
              <div>
                <p className="font-display font-semibold text-foreground text-base leading-none">
                  Your Personalized Journey
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Adaptive Curriculum · Real-time Adjustment · EDDI Intelligence
                </p>
              </div>
            </div>
          </div>

          {/* XP and Streak */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5" style={{ color: GOLD }} />
              <span className="font-display font-bold text-lg text-foreground">{currentPath.streak}</span>
              <span className="text-xs text-muted-foreground">day streak</span>
            </div>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5" style={{ color: GOLD }} />
              <span className="font-display font-bold text-lg text-foreground">
                {studentProfile.totalXP.toLocaleString()}
              </span>
              <span className="text-xs text-muted-foreground">XP</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Learning Path */}
          <div className="lg:col-span-2 space-y-6">
            {/* Path Overview */}
            <div
              className="glass rounded-2xl p-5"
              style={{
                border: `1px solid ${CYAN.replace(")", " / 0.25)")}`,
                background: `linear-gradient(135deg, ${CYAN.replace(")", " / 0.05)")} 0%, transparent 50%)`,
              }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="font-display font-bold text-xl text-foreground">{currentPath.name}</h1>
                  <p className="text-sm text-muted-foreground mt-1">{currentPath.description}</p>
                </div>
                <Badge
                  className="text-sm"
                  style={{
                    background: EMERALD.replace(")", " / 0.15)"),
                    color: EMERALD,
                    border: `1px solid ${EMERALD.replace(")", " / 0.35)")}`,
                  }}
                >
                  {currentPath.overallProgress}% Complete
                </Badge>
              </div>

              {/* Progress Stats */}
              <div className="grid grid-cols-4 gap-4 mt-5">
                {[
                  { label: "Modules Done", value: `${currentPath.modules.filter((m) => m.status === "completed").length}/${currentPath.modules.length}`, icon: CheckCircle2, color: EMERALD },
                  { label: "Weekly Goal", value: `${currentPath.weeklyProgress}/${currentPath.weeklyGoal}`, icon: Target, color: GOLD },
                  { label: "Est. Completion", value: currentPath.estimatedCompletion, icon: GraduationCap, color: PURPLE },
                  { label: "Time Today", value: "45 min", icon: Timer, color: CYAN },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="glass-sm rounded-xl p-3"
                  >
                    <stat.icon className="w-5 h-5 mb-2" style={{ color: stat.color }} />
                    <p className="font-display font-bold text-foreground">{stat.value}</p>
                    <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Full Progress Bar */}
              <div className="mt-5">
                <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${currentPath.overallProgress}%` }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${EMERALD} 0%, ${CYAN} 100%)`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Module List */}
            <div>
              <h2 className="font-display font-semibold text-foreground text-lg mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5" style={{ color: CYAN }} />
                Learning Modules
              </h2>
              <div className="space-y-4">
                {currentPath.modules.map((module, i) => (
                  <ModuleCard key={module.id} module={module} index={i} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Student Profile Card */}
            <div
              className="glass rounded-2xl p-5"
              style={{ border: `1px solid ${GOLD.replace(")", " / 0.25)")}` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: GOLD.replace(")", " / 0.15)"),
                    border: `1px solid ${GOLD.replace(")", " / 0.35)")}`,
                  }}
                >
                  <span className="font-display font-bold text-lg" style={{ color: GOLD }}>
                    L{studentProfile.level}
                  </span>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">{studentProfile.name}'s Profile</h3>
                  <p className="text-xs text-muted-foreground">{studentProfile.learningStyle}</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { label: "Best Learning Time", value: studentProfile.optimalTime },
                  { label: "Current Strength", value: studentProfile.currentStrength },
                  { label: "Growth Area", value: studentProfile.growthArea },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                    <span className="text-xs font-medium text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Achievements */}
              <div className="mt-4 pt-4 border-t border-white/5">
                <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
                  Recent Achievements
                </p>
                <div className="flex items-center gap-2">
                  {studentProfile.achievements.map((achievement) => (
                    <div
                      key={achievement.name}
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{
                        background: GOLD.replace(")", " / 0.12)"),
                        border: `1px solid ${GOLD.replace(")", " / 0.25)")}`,
                      }}
                      title={achievement.name}
                    >
                      <achievement.icon className="w-5 h-5" style={{ color: GOLD }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Suggestions */}
            <div
              className="glass rounded-2xl p-5"
              style={{
                border: `1px solid ${PURPLE.replace(")", " / 0.25)")}`,
                background: `linear-gradient(135deg, ${PURPLE.replace(")", " / 0.08)")} 0%, transparent 50%)`,
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4" style={{ color: PURPLE }} />
                <h3 className="font-display font-semibold text-foreground text-sm">EDDI Suggestions</h3>
              </div>
              <div className="space-y-3">
                {aiSuggestions.map((suggestion, i) => (
                  <motion.div
                    key={suggestion.type}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-3 rounded-xl"
                    style={{
                      background: suggestion.color.replace(")", " / 0.08)"),
                      border: `1px solid ${suggestion.color.replace(")", " / 0.20)")}`,
                    }}
                  >
                    <div className="flex items-start gap-2">
                      <suggestion.icon className="w-4 h-4 shrink-0 mt-0.5" style={{ color: suggestion.color }} />
                      <div>
                        <h4 className="text-xs font-medium text-foreground">{suggestion.title}</h4>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{suggestion.description}</p>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 text-[10px] mt-2 px-2"
                          style={{ color: suggestion.color }}
                        >
                          {suggestion.action}
                          <ChevronRight className="w-3 h-3 ml-0.5" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* AI Assistant */}
            <div
              className="glass rounded-2xl p-5"
              style={{ border: `1px solid ${CYAN.replace(")", " / 0.25)")}` }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: CYAN.replace(")", " / 0.15)"),
                    border: `1px solid ${CYAN.replace(")", " / 0.30)")}`,
                  }}
                >
                  <Bot className="w-5 h-5" style={{ color: CYAN }} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground text-sm">
                    Need Help?
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    I'm EDDI, your learning companion. Ask me anything about your path or get help with a concept.
                  </p>
                  <Button
                    size="sm"
                    className="mt-3 w-full h-8 text-xs gap-1.5"
                    style={{
                      background: CYAN.replace(")", " / 0.20)"),
                      border: `1px solid ${CYAN.replace(")", " / 0.40)")}`,
                    }}
                  >
                    <Brain className="w-3.5 h-3.5" />
                    Ask EDDI
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
