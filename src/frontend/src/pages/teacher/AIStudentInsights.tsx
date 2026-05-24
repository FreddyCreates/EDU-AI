// Teacher AI Student Insights — Predictive At-Risk Detection & Learning Pattern Analysis
// EDDI-powered student analytics with early intervention recommendations

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BarChart2,
  BookOpen,
  Bot,
  Brain,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  Eye,
  Flag,
  HelpCircle,
  Lightbulb,
  LineChart,
  MessageCircle,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  User,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const EMERALD = "oklch(0.72 0.17 155)";
const GOLD = "oklch(0.76 0.18 84)";
const PURPLE = "oklch(0.68 0.18 280)";
const CYAN = "oklch(0.65 0.22 200)";
const RED = "oklch(0.65 0.20 25)";

interface StudentInsight {
  id: string;
  name: string;
  grade: string;
  currentPerformance: number;
  trend: "improving" | "stable" | "declining";
  riskLevel: "low" | "medium" | "high" | "critical";
  aiRiskScore: number;
  predictedOutcome: {
    endOfTerm: number;
    confidence: number;
  };
  learningPatterns: {
    bestTime: string;
    preferredStyle: string;
    averageSessionLength: number;
    engagementScore: number;
  };
  interventions: {
    type: string;
    reason: string;
    priority: "immediate" | "soon" | "recommended";
    suggestedAction: string;
  }[];
  recentActivity: {
    lastActive: string;
    assignmentsCompleted: number;
    assignmentsMissed: number;
    studySessionsThisWeek: number;
  };
  aiInsights: string[];
}

interface ClassOverview {
  className: string;
  totalStudents: number;
  atRiskCount: number;
  improvingCount: number;
  averagePerformance: number;
  engagementRate: number;
  aiAlerts: number;
}

const classOverview: ClassOverview = {
  className: "Algebra II - Period 3",
  totalStudents: 28,
  atRiskCount: 4,
  improvingCount: 12,
  averagePerformance: 78,
  engagementRate: 84,
  aiAlerts: 6,
};

const studentInsights: StudentInsight[] = [
  {
    id: "stu-001",
    name: "Marcus Chen",
    grade: "10th Grade",
    currentPerformance: 72,
    trend: "declining",
    riskLevel: "high",
    aiRiskScore: 78,
    predictedOutcome: { endOfTerm: 65, confidence: 82 },
    learningPatterns: {
      bestTime: "Morning (8-10 AM)",
      preferredStyle: "Visual",
      averageSessionLength: 18,
      engagementScore: 45,
    },
    interventions: [
      {
        type: "Academic Support",
        reason: "3-week performance decline detected",
        priority: "immediate",
        suggestedAction: "Schedule tutoring session focusing on polynomial operations",
      },
      {
        type: "Engagement Check",
        reason: "Study session frequency dropped 60%",
        priority: "immediate",
        suggestedAction: "Private check-in to discuss barriers to engagement",
      },
    ],
    recentActivity: {
      lastActive: "3 days ago",
      assignmentsCompleted: 4,
      assignmentsMissed: 3,
      studySessionsThisWeek: 1,
    },
    aiInsights: [
      "Performance correlates with attendance - missed 4 classes in past 2 weeks",
      "Previous mastery in basic algebra suggests conceptual gaps rather than ability issues",
      "Peer collaboration data shows isolation from study groups",
    ],
  },
  {
    id: "stu-002",
    name: "Aisha Patel",
    grade: "10th Grade",
    currentPerformance: 88,
    trend: "improving",
    riskLevel: "low",
    aiRiskScore: 12,
    predictedOutcome: { endOfTerm: 92, confidence: 89 },
    learningPatterns: {
      bestTime: "Evening (6-9 PM)",
      preferredStyle: "Kinesthetic",
      averageSessionLength: 34,
      engagementScore: 92,
    },
    interventions: [
      {
        type: "Enrichment",
        reason: "Exceeding grade-level expectations",
        priority: "recommended",
        suggestedAction: "Introduce pre-calculus concepts through challenge problems",
      },
    ],
    recentActivity: {
      lastActive: "Today",
      assignmentsCompleted: 8,
      assignmentsMissed: 0,
      studySessionsThisWeek: 6,
    },
    aiInsights: [
      "Strong self-directed learning patterns - completes extra practice unprompted",
      "Natural peer mentor - frequently assists classmates during group work",
      "May benefit from accelerated pathway discussion",
    ],
  },
  {
    id: "stu-003",
    name: "Jordan Williams",
    grade: "10th Grade",
    currentPerformance: 58,
    trend: "stable",
    riskLevel: "critical",
    aiRiskScore: 92,
    predictedOutcome: { endOfTerm: 55, confidence: 78 },
    learningPatterns: {
      bestTime: "Afternoon (2-4 PM)",
      preferredStyle: "Auditory",
      averageSessionLength: 12,
      engagementScore: 28,
    },
    interventions: [
      {
        type: "Immediate Intervention",
        reason: "Failing trajectory without intervention",
        priority: "immediate",
        suggestedAction: "Parent conference + learning support plan",
      },
      {
        type: "Foundational Review",
        reason: "Pre-requisite skill gaps detected",
        priority: "immediate",
        suggestedAction: "Assign remedial Algebra I modules before new content",
      },
      {
        type: "Counselor Referral",
        reason: "Social-emotional indicators detected",
        priority: "soon",
        suggestedAction: "Refer to school counselor for well-being check",
      },
    ],
    recentActivity: {
      lastActive: "1 week ago",
      assignmentsCompleted: 2,
      assignmentsMissed: 5,
      studySessionsThisWeek: 0,
    },
    aiInsights: [
      "Foundational gaps in order of operations affecting all new learning",
      "Engagement pattern changed significantly 4 weeks ago - potential external factors",
      "Previous year data shows capable performance - current struggle likely not ability-related",
    ],
  },
  {
    id: "stu-004",
    name: "Emily Rodriguez",
    grade: "10th Grade",
    currentPerformance: 81,
    trend: "stable",
    riskLevel: "medium",
    aiRiskScore: 35,
    predictedOutcome: { endOfTerm: 79, confidence: 85 },
    learningPatterns: {
      bestTime: "Morning (9-11 AM)",
      preferredStyle: "Reading/Writing",
      averageSessionLength: 28,
      engagementScore: 72,
    },
    interventions: [
      {
        type: "Test Anxiety Support",
        reason: "Pattern: Strong homework, weak assessments",
        priority: "soon",
        suggestedAction: "Discuss test-taking strategies; consider extended time accommodation",
      },
    ],
    recentActivity: {
      lastActive: "Yesterday",
      assignmentsCompleted: 7,
      assignmentsMissed: 0,
      studySessionsThisWeek: 4,
    },
    aiInsights: [
      "Significant performance gap between practice and assessment contexts",
      "Strong note-taking and preparation habits - issue likely anxiety-related",
      "May benefit from alternative assessment formats",
    ],
  },
];

function getRiskColor(level: StudentInsight["riskLevel"]) {
  switch (level) {
    case "low":
      return EMERALD;
    case "medium":
      return GOLD;
    case "high":
      return "oklch(0.68 0.20 40)";
    case "critical":
      return RED;
    default:
      return EMERALD;
  }
}

function getTrendIcon(trend: StudentInsight["trend"]) {
  switch (trend) {
    case "improving":
      return TrendingUp;
    case "declining":
      return TrendingDown;
    default:
      return Activity;
  }
}

function StudentInsightCard({ student, index }: { student: StudentInsight; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const riskColor = getRiskColor(student.riskLevel);
  const TrendIcon = getTrendIcon(student.trend);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="glass rounded-2xl overflow-hidden"
      style={{ border: `1px solid ${riskColor.replace(")", " / 0.30)")}` }}
    >
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{
                background: riskColor.replace(")", " / 0.15)"),
                border: `1px solid ${riskColor.replace(")", " / 0.30)")}`,
              }}
            >
              <User className="w-5 h-5" style={{ color: riskColor }} />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground">{student.name}</h3>
              <p className="text-xs text-muted-foreground">{student.grade}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              className="text-[9px] uppercase"
              style={{
                background: riskColor.replace(")", " / 0.15)"),
                color: riskColor,
                border: `1px solid ${riskColor.replace(")", " / 0.30)")}`,
              }}
            >
              {student.riskLevel} risk
            </Badge>
            <div className="flex items-center gap-1">
              <TrendIcon
                className="w-4 h-4"
                style={{
                  color: student.trend === "improving" ? EMERALD : student.trend === "declining" ? RED : GOLD,
                }}
              />
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-4 gap-3 mt-4">
          {[
            { label: "Current", value: `${student.currentPerformance}%`, color: student.currentPerformance >= 70 ? EMERALD : student.currentPerformance >= 60 ? GOLD : RED },
            { label: "Predicted", value: `${student.predictedOutcome.endOfTerm}%`, color: student.predictedOutcome.endOfTerm >= 70 ? EMERALD : GOLD },
            { label: "AI Risk", value: `${student.aiRiskScore}`, color: riskColor },
            { label: "Engagement", value: `${student.learningPatterns.engagementScore}%`, color: student.learningPatterns.engagementScore >= 70 ? EMERALD : GOLD },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display font-bold text-lg" style={{ color: stat.color }}>
                {stat.value}
              </p>
              <p className="text-[9px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Urgent Interventions */}
        {student.interventions.filter((i) => i.priority === "immediate").length > 0 && (
          <div
            className="mt-4 p-3 rounded-xl space-y-2"
            style={{
              background: RED.replace(")", " / 0.08)"),
              border: `1px solid ${RED.replace(")", " / 0.20)")}`,
            }}
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" style={{ color: RED }} />
              <span className="text-xs font-medium" style={{ color: RED }}>
                Immediate Action Needed
              </span>
            </div>
            {student.interventions
              .filter((i) => i.priority === "immediate")
              .map((intervention, i) => (
                <p key={i} className="text-xs text-foreground/80 pl-6">
                  • {intervention.suggestedAction}
                </p>
              ))}
          </div>
        )}

        {/* Expand Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 mt-4 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Brain className="w-3.5 h-3.5" />
          View Full Analysis
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Expanded Analysis */}
      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="px-5 pb-5 space-y-4 border-t border-white/5"
        >
          {/* Learning Patterns */}
          <div className="pt-4">
            <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-3">
              Learning Patterns
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Best Learning Time", value: student.learningPatterns.bestTime, icon: Clock },
                { label: "Preferred Style", value: student.learningPatterns.preferredStyle, icon: BookOpen },
                { label: "Avg Session", value: `${student.learningPatterns.averageSessionLength} min`, icon: Activity },
                { label: "Engagement", value: `${student.learningPatterns.engagementScore}%`, icon: Zap },
              ].map((pattern) => (
                <div key={pattern.label} className="glass-sm rounded-lg p-2.5 flex items-center gap-2">
                  <pattern.icon className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-[9px] text-muted-foreground">{pattern.label}</p>
                    <p className="text-xs font-medium text-foreground">{pattern.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
              Recent Activity
            </p>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: "Last Active", value: student.recentActivity.lastActive },
                { label: "Completed", value: student.recentActivity.assignmentsCompleted.toString() },
                { label: "Missed", value: student.recentActivity.assignmentsMissed.toString(), warn: student.recentActivity.assignmentsMissed > 0 },
                { label: "Sessions/Week", value: student.recentActivity.studySessionsThisWeek.toString() },
              ].map((activity) => (
                <div key={activity.label} className="text-center glass-sm rounded-lg p-2">
                  <p
                    className="font-mono text-sm font-semibold"
                    style={{ color: activity.warn ? RED : "inherit" }}
                  >
                    {activity.value}
                  </p>
                  <p className="text-[9px] text-muted-foreground">{activity.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* All Interventions */}
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
              Recommended Interventions
            </p>
            <div className="space-y-2">
              {student.interventions.map((intervention, i) => {
                const priorityColor = intervention.priority === "immediate" ? RED : intervention.priority === "soon" ? GOLD : EMERALD;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-2.5 rounded-lg"
                    style={{
                      background: priorityColor.replace(")", " / 0.06)"),
                      border: `1px solid ${priorityColor.replace(")", " / 0.15)")}`,
                    }}
                  >
                    <Flag className="w-4 h-4 mt-0.5 shrink-0" style={{ color: priorityColor }} />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground text-xs">{intervention.type}</span>
                        <Badge className="text-[8px]" style={{ background: priorityColor.replace(")", " / 0.15)"), color: priorityColor }}>
                          {intervention.priority}
                        </Badge>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{intervention.reason}</p>
                      <p className="text-xs text-foreground/80 mt-1">→ {intervention.suggestedAction}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Insights */}
          <div
            className="rounded-xl p-3 space-y-2"
            style={{
              background: PURPLE.replace(")", " / 0.08)"),
              border: `1px solid ${PURPLE.replace(")", " / 0.20)")}`,
            }}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" style={{ color: PURPLE }} />
              <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: PURPLE }}>
                EDDI Analysis
              </span>
            </div>
            {student.aiInsights.map((insight, i) => (
              <p key={i} className="text-xs text-muted-foreground pl-5">
                • {insight}
              </p>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2">
            <Button size="sm" className="h-7 text-xs gap-1.5" style={{ background: EMERALD.replace(")", " / 0.20)"), border: `1px solid ${EMERALD.replace(")", " / 0.40)")}` }}>
              <MessageCircle className="w-3 h-3" />
              Message Student
            </Button>
            <Button size="sm" variant="outline" className="h-7 text-xs gap-1.5">
              <Users className="w-3 h-3" />
              Contact Parent
            </Button>
            <Button size="sm" variant="outline" className="h-7 text-xs gap-1.5">
              <Calendar className="w-3 h-3" />
              Schedule Meeting
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function ClassOverviewCard({ overview }: { overview: ClassOverview }) {
  return (
    <div className="glass rounded-2xl p-5" style={{ border: `1px solid ${GOLD.replace(")", " / 0.25)")}` }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-display font-semibold text-foreground text-lg">{overview.className}</h2>
          <p className="text-xs text-muted-foreground">{overview.totalStudents} students enrolled</p>
        </div>
        <Badge
          className="text-[10px]"
          style={{
            background: overview.atRiskCount > 3 ? RED.replace(")", " / 0.15)") : GOLD.replace(")", " / 0.15)"),
            color: overview.atRiskCount > 3 ? RED : GOLD,
          }}
        >
          <AlertTriangle className="w-3 h-3 mr-1" />
          {overview.atRiskCount} at risk
        </Badge>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Avg Performance", value: `${overview.averagePerformance}%`, icon: BarChart2, color: overview.averagePerformance >= 75 ? EMERALD : GOLD },
          { label: "Engagement Rate", value: `${overview.engagementRate}%`, icon: Activity, color: overview.engagementRate >= 80 ? EMERALD : GOLD },
          { label: "Improving", value: overview.improvingCount.toString(), icon: TrendingUp, color: EMERALD },
          { label: "AI Alerts", value: overview.aiAlerts.toString(), icon: Sparkles, color: PURPLE },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="text-center"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2"
              style={{
                background: stat.color.replace(")", " / 0.12)"),
                border: `1px solid ${stat.color.replace(")", " / 0.28)")}`,
              }}
            >
              <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
            </div>
            <p className="font-display font-bold text-lg text-foreground">{stat.value}</p>
            <p className="text-[10px] text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function AIStudentInsights() {
  const atRiskStudents = studentInsights.filter((s) => s.riskLevel === "high" || s.riskLevel === "critical");

  return (
    <div className="portal-enter min-h-screen" data-ocid="teacher_insights_ai.page">
      {/* Header */}
      <div
        className="glass sticky top-0 z-30"
        style={{ borderBottom: `1px solid ${GOLD.replace(")", " / 0.18)")}` }}
      >
        <div className="mx-auto max-w-[1400px] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/teacher">
              <Button variant="ghost" size="sm" className="gap-1.5">
                <ArrowLeft className="h-4 w-4" />
                Teacher Portal
              </Button>
            </Link>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-3">
              <div
                className="flex items-center gap-2.5 rounded-xl px-4 py-2"
                style={{
                  background: `linear-gradient(135deg, ${PURPLE.replace(")", " / 0.20)")} 0%, ${GOLD.replace(")", " / 0.10)")} 100%)`,
                  border: `1px solid ${PURPLE.replace(")", " / 0.35)")}`,
                }}
              >
                <Brain className="h-4 w-4" style={{ color: PURPLE }} />
                <span
                  className="font-display font-bold text-sm"
                  style={{ color: PURPLE, letterSpacing: "0.18em" }}
                >
                  AI INSIGHTS
                </span>
              </div>
              <div>
                <p className="font-display font-semibold text-foreground text-base leading-none">
                  Student Intelligence Dashboard
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Predictive Analytics · Risk Detection · Intervention Recommendations
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select className="bg-white/5 rounded-lg px-3 py-1.5 text-sm text-foreground border border-white/10">
              <option>Algebra II - Period 3</option>
              <option>Algebra II - Period 5</option>
              <option>Pre-Calculus - Period 2</option>
            </select>
            <Button
              size="sm"
              className="gap-1.5"
              style={{
                background: PURPLE.replace(")", " / 0.20)"),
                border: `1px solid ${PURPLE.replace(")", " / 0.40)")}`,
              }}
            >
              <Sparkles className="h-4 w-4" />
              Refresh Analysis
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 py-6 space-y-6">
        {/* Class Overview */}
        <ClassOverviewCard overview={classOverview} />

        {/* Filter Tabs */}
        <div className="flex items-center gap-3">
          {[
            { label: "All Students", count: studentInsights.length },
            { label: "At Risk", count: atRiskStudents.length, color: RED },
            { label: "Improving", count: studentInsights.filter((s) => s.trend === "improving").length, color: EMERALD },
            { label: "Needs Attention", count: studentInsights.filter((s) => s.interventions.length > 1).length, color: GOLD },
          ].map((tab, i) => (
            <button
              key={tab.label}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                i === 0 ? "glass text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
              style={i === 0 ? { border: `1px solid ${PURPLE.replace(")", " / 0.30)")}` } : {}}
            >
              {tab.label}
              <Badge
                variant="secondary"
                className="text-[10px]"
                style={tab.color ? { background: tab.color.replace(")", " / 0.15)"), color: tab.color } : {}}
              >
                {tab.count}
              </Badge>
            </button>
          ))}
        </div>

        {/* Student Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {studentInsights.map((student, i) => (
            <StudentInsightCard key={student.id} student={student} index={i} />
          ))}
        </div>

        {/* AI Assistant */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-5"
          style={{
            border: `1px solid ${PURPLE.replace(")", " / 0.25)")}`,
            background: `linear-gradient(135deg, ${PURPLE.replace(")", " / 0.08)")} 0%, transparent 50%)`,
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: PURPLE.replace(")", " / 0.15)"),
                border: `1px solid ${PURPLE.replace(")", " / 0.30)")}`,
              }}
            >
              <Bot className="w-6 h-6" style={{ color: PURPLE }} />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-semibold text-foreground">
                EDDI Student Intelligence
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                I've analyzed learning patterns, assessment data, and engagement metrics for your class.
                {atRiskStudents.length > 0
                  ? ` ${atRiskStudents.length} students need immediate attention. Would you like me to generate intervention plans or draft parent communications?`
                  : " Your class is performing well overall. Would you like suggestions for enrichment activities?"}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  "Generate Intervention Plans",
                  "Draft Parent Emails",
                  "Create Study Groups",
                  "Schedule Check-ins",
                ].map((action) => (
                  <Button
                    key={action}
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs"
                    style={{ borderColor: PURPLE.replace(")", " / 0.30)") }}
                  >
                    {action}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
