// Teacher AI Curriculum Generator — EDDI-Powered Lesson Plan Generation
// AI-driven curriculum creation, learning objective alignment, and adaptive content generation

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Bot,
  Brain,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Copy,
  Download,
  Edit,
  FileText,
  Layers,
  Lightbulb,
  ListChecks,
  Play,
  Plus,
  RefreshCw,
  Save,
  Sparkles,
  Target,
  Wand2,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const EMERALD = "oklch(0.72 0.17 155)";
const GOLD = "oklch(0.76 0.18 84)";
const PURPLE = "oklch(0.68 0.18 280)";
const CYAN = "oklch(0.65 0.22 200)";

interface LessonPlan {
  id: string;
  title: string;
  subject: string;
  gradeLevel: string;
  duration: string;
  aiGenerated: boolean;
  status: "draft" | "ready" | "published";
  objectives: string[];
  standards: string[];
  activities: {
    name: string;
    duration: string;
    type: "intro" | "instruction" | "practice" | "assessment" | "closure";
    description: string;
  }[];
  materials: string[];
  differentiation: {
    advanced: string;
    onLevel: string;
    struggling: string;
  };
  aiSuggestions: string[];
}

interface CurriculumTemplate {
  id: string;
  name: string;
  subject: string;
  description: string;
  units: number;
  lessons: number;
  aiEnhanced: boolean;
}

interface GenerationPrompt {
  subject: string;
  topic: string;
  gradeLevel: string;
  duration: string;
  standards: string[];
  specialConsiderations: string;
}

const recentLessonPlans: LessonPlan[] = [
  {
    id: "lp-001",
    title: "Introduction to Quadratic Functions",
    subject: "Algebra II",
    gradeLevel: "10th Grade",
    duration: "55 minutes",
    aiGenerated: true,
    status: "ready",
    objectives: [
      "Students will identify the standard form of a quadratic function",
      "Students will graph quadratic functions using vertex form",
      "Students will analyze the relationship between coefficients and graph shape",
    ],
    standards: ["HSF-IF.C.7a", "HSF-IF.C.8a"],
    activities: [
      { name: "Bell Ringer: Pattern Recognition", duration: "5 min", type: "intro", description: "Students identify patterns in a sequence that leads to quadratic relationship" },
      { name: "Direct Instruction: Standard Form", duration: "15 min", type: "instruction", description: "Teacher-led exploration of ax² + bx + c form with visual aids" },
      { name: "Guided Practice: Graphing", duration: "20 min", type: "practice", description: "Students graph quadratics using technology and paper methods" },
      { name: "Exit Ticket", duration: "10 min", type: "assessment", description: "Quick assessment of vertex identification and basic graphing" },
      { name: "Preview Tomorrow", duration: "5 min", type: "closure", description: "Connection to real-world applications coming next class" },
    ],
    materials: ["Graphing calculators", "Coordinate grid worksheets", "Interactive whiteboard slides"],
    differentiation: {
      advanced: "Explore completing the square to convert forms; analyze real-world modeling problems",
      onLevel: "Standard lesson with technology support for graphing",
      struggling: "Focus on standard form identification; use color-coded coefficient chart",
    },
    aiSuggestions: [
      "Consider adding a kinesthetic activity - students could physically form parabolas",
      "The exit ticket could include a self-reflection component for metacognition",
      "Pre-assessment data suggests 3 students may need vocabulary scaffold",
    ],
  },
  {
    id: "lp-002",
    title: "Cell Division: Mitosis Deep Dive",
    subject: "Biology",
    gradeLevel: "9th Grade",
    duration: "50 minutes",
    aiGenerated: true,
    status: "draft",
    objectives: [
      "Students will sequence the phases of mitosis correctly",
      "Students will explain the purpose of cell division in growth and repair",
      "Students will compare mitosis outcomes in different cell types",
    ],
    standards: ["HS-LS1-4", "HS-LS3-1"],
    activities: [
      { name: "Hook: Time-lapse Video", duration: "5 min", type: "intro", description: "Engaging cell division video to spark curiosity" },
      { name: "Phase-by-Phase Exploration", duration: "20 min", type: "instruction", description: "Interactive slideshow with student predictions at each phase" },
      { name: "Microscope Lab", duration: "15 min", type: "practice", description: "Students identify phases in onion root tip slides" },
      { name: "Phase Sequencing Quiz", duration: "8 min", type: "assessment", description: "Digital quiz on phase ordering and key events" },
      { name: "Wrap-up Discussion", duration: "2 min", type: "closure", description: "Connection to cancer and uncontrolled cell division" },
    ],
    materials: ["Microscopes", "Prepared slides", "Digital quiz platform", "Phase diagram handouts"],
    differentiation: {
      advanced: "Compare mitosis and meiosis; research stem cell applications",
      onLevel: "Standard lesson with microscope partner work",
      struggling: "Provide phase cards for sequencing; use mnemonics for remembering order",
    },
    aiSuggestions: [
      "Class performance data shows strong visual learners - consider adding more diagrams",
      "Previous unit showed gaps in chromosome vocabulary - brief review recommended",
    ],
  },
];

const curriculumTemplates: CurriculumTemplate[] = [
  {
    id: "tpl-math",
    name: "Standards-Aligned Math Unit",
    subject: "Mathematics",
    description: "Complete unit with pre-assessment, daily lessons, formative checks, and summative assessment",
    units: 1,
    lessons: 12,
    aiEnhanced: true,
  },
  {
    id: "tpl-science",
    name: "NGSS Science Investigation",
    subject: "Science",
    description: "Phenomenon-based unit with student-driven inquiry and CER writing",
    units: 1,
    lessons: 10,
    aiEnhanced: true,
  },
  {
    id: "tpl-ela",
    name: "Close Reading & Analysis",
    subject: "English Language Arts",
    description: "Text analysis unit with scaffolded reading strategies and writing integration",
    units: 1,
    lessons: 8,
    aiEnhanced: true,
  },
  {
    id: "tpl-history",
    name: "Historical Inquiry Project",
    subject: "Social Studies",
    description: "Document-based investigation with primary source analysis and argument writing",
    units: 1,
    lessons: 10,
    aiEnhanced: true,
  },
];

function getActivityColor(type: LessonPlan["activities"][0]["type"]) {
  switch (type) {
    case "intro":
      return CYAN;
    case "instruction":
      return GOLD;
    case "practice":
      return EMERALD;
    case "assessment":
      return PURPLE;
    case "closure":
      return "oklch(0.70 0.16 120)";
    default:
      return EMERALD;
  }
}

function LessonPlanCard({ plan, index }: { plan: LessonPlan; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="glass rounded-2xl overflow-hidden"
      style={{ border: `1px solid ${GOLD.replace(")", " / 0.25)")}` }}
    >
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{
                background: GOLD.replace(")", " / 0.12)"),
                border: `1px solid ${GOLD.replace(")", " / 0.30)")}`,
              }}
            >
              <FileText className="w-5 h-5" style={{ color: GOLD }} />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground">{plan.title}</h3>
              <p className="text-xs text-muted-foreground">
                {plan.subject} • {plan.gradeLevel} • {plan.duration}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {plan.aiGenerated && (
              <Badge
                className="text-[9px]"
                style={{
                  background: PURPLE.replace(")", " / 0.15)"),
                  color: PURPLE,
                }}
              >
                <Sparkles className="w-2.5 h-2.5 mr-1" />
                AI Generated
              </Badge>
            )}
            <Badge
              className="text-[9px]"
              style={{
                background: plan.status === "ready" ? EMERALD.replace(")", " / 0.15)") : GOLD.replace(")", " / 0.15)"),
                color: plan.status === "ready" ? EMERALD : GOLD,
              }}
            >
              {plan.status}
            </Badge>
          </div>
        </div>

        {/* Learning Objectives */}
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-3.5 h-3.5" style={{ color: EMERALD }} />
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
              Learning Objectives
            </span>
          </div>
          <div className="space-y-1.5">
            {plan.objectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-foreground/80">
                <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: EMERALD }} />
                {obj}
              </div>
            ))}
          </div>
        </div>

        {/* Standards */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {plan.standards.map((std) => (
            <Badge key={std} variant="outline" className="text-[9px] font-mono">
              {std}
            </Badge>
          ))}
        </div>

        {/* Expand Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 mt-4 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Layers className="w-3.5 h-3.5" />
          View Lesson Flow
          <ChevronRight className={`w-3.5 h-3.5 transition-transform ${expanded ? "rotate-90" : ""}`} />
        </button>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="px-5 pb-5 space-y-4 border-t border-white/5"
        >
          {/* Activities Timeline */}
          <div className="pt-4">
            <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-3">
              Lesson Flow
            </p>
            <div className="space-y-2">
              {plan.activities.map((activity, i) => {
                const actColor = getActivityColor(activity.type);
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-lg"
                    style={{
                      background: actColor.replace(")", " / 0.06)"),
                      border: `1px solid ${actColor.replace(")", " / 0.15)")}`,
                    }}
                  >
                    <div
                      className="w-6 h-6 rounded flex items-center justify-center shrink-0 text-[10px] font-mono"
                      style={{ background: actColor.replace(")", " / 0.20)"), color: actColor }}
                    >
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground text-sm">{activity.name}</span>
                        <Badge className="text-[8px]" style={{ background: actColor.replace(")", " / 0.15)"), color: actColor }}>
                          {activity.duration}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{activity.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Differentiation */}
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
              Differentiation Strategies
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Advanced", content: plan.differentiation.advanced, color: PURPLE },
                { label: "On-Level", content: plan.differentiation.onLevel, color: EMERALD },
                { label: "Support", content: plan.differentiation.struggling, color: CYAN },
              ].map((diff) => (
                <div
                  key={diff.label}
                  className="glass-sm rounded-lg p-2.5"
                  style={{ border: `1px solid ${diff.color.replace(")", " / 0.20)")}` }}
                >
                  <p className="text-[9px] font-mono uppercase" style={{ color: diff.color }}>
                    {diff.label}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-1">{diff.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Suggestions */}
          {plan.aiSuggestions.length > 0 && (
            <div
              className="rounded-xl p-3 space-y-2"
              style={{
                background: PURPLE.replace(")", " / 0.08)"),
                border: `1px solid ${PURPLE.replace(")", " / 0.20)")}`,
              }}
            >
              <div className="flex items-center gap-2">
                <Lightbulb className="w-3.5 h-3.5" style={{ color: PURPLE }} />
                <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: PURPLE }}>
                  EDDI Suggestions
                </span>
              </div>
              {plan.aiSuggestions.map((suggestion, i) => (
                <p key={i} className="text-xs text-muted-foreground pl-5">
                  • {suggestion}
                </p>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2">
            <Button size="sm" className="h-7 text-xs gap-1.5" style={{ background: GOLD.replace(")", " / 0.20)"), border: `1px solid ${GOLD.replace(")", " / 0.40)")}` }}>
              <Edit className="w-3 h-3" />
              Edit Lesson
            </Button>
            <Button size="sm" variant="outline" className="h-7 text-xs gap-1.5">
              <Copy className="w-3 h-3" />
              Duplicate
            </Button>
            <Button size="sm" variant="outline" className="h-7 text-xs gap-1.5">
              <Download className="w-3 h-3" />
              Export
            </Button>
            <Button size="sm" variant="outline" className="h-7 text-xs gap-1.5 ml-auto" style={{ borderColor: PURPLE.replace(")", " / 0.30)") }}>
              <RefreshCw className="w-3 h-3" />
              Regenerate
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function GeneratorPanel() {
  const [generating, setGenerating] = useState(false);

  return (
    <div className="glass rounded-2xl p-5 space-y-5" style={{ border: `1px solid ${PURPLE.replace(")", " / 0.30)")}` }}>
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background: PURPLE.replace(")", " / 0.15)"),
            border: `1px solid ${PURPLE.replace(")", " / 0.30)")}`,
          }}
        >
          <Wand2 className="w-5 h-5" style={{ color: PURPLE }} />
        </div>
        <div>
          <h3 className="font-display font-semibold text-foreground">AI Curriculum Generator</h3>
          <p className="text-xs text-muted-foreground">Powered by EDDI Intelligence</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Subject</label>
            <select className="w-full mt-1.5 bg-white/5 rounded-lg px-3 py-2 text-sm text-foreground border border-white/10 focus:border-white/20 focus:outline-none">
              <option>Mathematics</option>
              <option>Science</option>
              <option>English Language Arts</option>
              <option>Social Studies</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Grade Level</label>
            <select className="w-full mt-1.5 bg-white/5 rounded-lg px-3 py-2 text-sm text-foreground border border-white/10 focus:border-white/20 focus:outline-none">
              <option>9th Grade</option>
              <option>10th Grade</option>
              <option>11th Grade</option>
              <option>12th Grade</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Topic / Unit</label>
          <input
            type="text"
            placeholder="e.g., Introduction to Quadratic Functions"
            className="w-full mt-1.5 bg-white/5 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground border border-white/10 focus:border-white/20 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Duration</label>
          <div className="flex gap-2 mt-1.5">
            {["30 min", "45 min", "55 min", "90 min"].map((dur) => (
              <button
                key={dur}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                {dur}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
            Special Considerations (Optional)
          </label>
          <textarea
            placeholder="e.g., Class has 3 ELL students, focus on visual learning, include technology integration..."
            className="w-full mt-1.5 bg-white/5 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground border border-white/10 focus:border-white/20 focus:outline-none h-20 resize-none"
          />
        </div>
      </div>

      <Button
        className="w-full h-10 gap-2"
        style={{
          background: `linear-gradient(135deg, ${PURPLE} 0%, ${CYAN} 100%)`,
        }}
        onClick={() => setGenerating(!generating)}
      >
        {generating ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin" />
            Generating Curriculum...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            Generate Lesson Plan
          </>
        )}
      </Button>

      <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
        <Brain className="w-3 h-3" />
        EDDI will align content with your state standards and student data
      </div>
    </div>
  );
}

export default function AICurriculumGenerator() {
  return (
    <div className="portal-enter min-h-screen" data-ocid="teacher_curriculum_ai.page">
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
                  background: `linear-gradient(135deg, ${GOLD.replace(")", " / 0.20)")} 0%, ${PURPLE.replace(")", " / 0.10)")} 100%)`,
                  border: `1px solid ${GOLD.replace(")", " / 0.35)")}`,
                }}
              >
                <Wand2 className="h-4 w-4" style={{ color: GOLD }} />
                <span
                  className="font-display font-bold text-sm"
                  style={{ color: GOLD, letterSpacing: "0.18em" }}
                >
                  AI CURRICULUM
                </span>
              </div>
              <div>
                <p className="font-display font-semibold text-foreground text-base leading-none">
                  EDDI Curriculum Generator
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Intelligent Lesson Planning · Standards Alignment · Differentiation
                </p>
              </div>
            </div>
          </div>
          <Button size="sm" variant="outline" className="gap-1.5">
            <BookOpen className="h-4 w-4" />
            Browse Templates
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Generator Panel */}
          <div className="lg:col-span-1">
            <GeneratorPanel />

            {/* Quick Templates */}
            <div className="mt-6 space-y-3">
              <h3 className="font-display font-semibold text-foreground text-sm">Quick Templates</h3>
              {curriculumTemplates.map((template, i) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="glass rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:scale-[1.02] transition-smooth"
                  style={{ border: `1px solid ${EMERALD.replace(")", " / 0.15)")}` }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: EMERALD.replace(")", " / 0.12)") }}
                  >
                    <Layers className="w-4 h-4" style={{ color: EMERALD }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{template.name}</p>
                    <p className="text-[10px] text-muted-foreground">{template.lessons} lessons</p>
                  </div>
                  {template.aiEnhanced && (
                    <Sparkles className="w-3.5 h-3.5 shrink-0" style={{ color: PURPLE }} />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Lesson Plans */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-semibold text-foreground text-lg">Recent Lesson Plans</h2>
              <Button size="sm" variant="ghost" className="gap-1.5 text-xs">
                View All
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
            <div className="space-y-4">
              {recentLessonPlans.map((plan, i) => (
                <LessonPlanCard key={plan.id} plan={plan} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
