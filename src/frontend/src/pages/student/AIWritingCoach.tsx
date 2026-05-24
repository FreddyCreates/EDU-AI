// Student AI Writing Coach — Real-time Writing Assistance
// EDDI-powered writing support with contextual feedback and improvement suggestions

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  Bot,
  CheckCircle2,
  ChevronDown,
  Edit3,
  Eye,
  FileText,
  Languages,
  Lightbulb,
  List,
  Mic,
  PenTool,
  Quote,
  RefreshCw,
  Save,
  Send,
  Sparkles,
  Type,
  Wand2,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const EMERALD = "oklch(0.72 0.17 155)";
const GOLD = "oklch(0.76 0.18 84)";
const PURPLE = "oklch(0.68 0.18 280)";
const CYAN = "oklch(0.65 0.22 200)";
const RED = "oklch(0.65 0.20 25)";

interface WritingSuggestion {
  id: string;
  type: "grammar" | "clarity" | "style" | "structure" | "vocabulary" | "citation";
  severity: "error" | "warning" | "suggestion" | "enhancement";
  originalText: string;
  suggestedText: string;
  explanation: string;
  lineNumber: number;
  position: { start: number; end: number };
}

interface WritingFeedback {
  overallScore: number;
  categories: {
    grammar: { score: number; issues: number };
    clarity: { score: number; issues: number };
    style: { score: number; issues: number };
    structure: { score: number; issues: number };
    vocabulary: { score: number; issues: number };
  };
  readabilityGrade: string;
  wordCount: number;
  sentenceCount: number;
  avgSentenceLength: number;
  suggestions: WritingSuggestion[];
}

interface WritingGoal {
  id: string;
  name: string;
  description: string;
  progress: number;
  target: number;
}

const sampleEssay = `The Impact of Technology on Education

Technology has changed education in many ways over the past few decades. From computers in classrooms to online learning platforms, the way students learn and teachers teach have been completely transformed.

One of the biggest changes is the availability of information. Before the internet, students had to go to libraries and search through books to find what they needed. Now, with just a few clicks, they can access millions of articles, videos, and resources on any topic. This has made learning more convienent and efficient.

However, their are also some challenges. Some students find it hard to focus when their are so many distractions online. Social media and games can take away from study time. Also, not everyone has equal access to technology, which creates a digital divide.

In conclusion, technology has had both positive and negative effects on education. While it has made learning more accessible, we need to be careful about how we use it. Teachers and parents should help students develop good digital habits so they can take advantage of technology without letting it hurt their learning.`;

const writingFeedback: WritingFeedback = {
  overallScore: 78,
  categories: {
    grammar: { score: 72, issues: 3 },
    clarity: { score: 85, issues: 1 },
    style: { score: 75, issues: 2 },
    structure: { score: 82, issues: 1 },
    vocabulary: { score: 80, issues: 2 },
  },
  readabilityGrade: "8th Grade",
  wordCount: 198,
  sentenceCount: 12,
  avgSentenceLength: 16.5,
  suggestions: [
    {
      id: "sug-001",
      type: "grammar",
      severity: "error",
      originalText: "convienent",
      suggestedText: "convenient",
      explanation: "This is a spelling error. 'Convenient' is spelled with 'ie' not 'ei'.",
      lineNumber: 5,
      position: { start: 287, end: 297 },
    },
    {
      id: "sug-002",
      type: "grammar",
      severity: "error",
      originalText: "their are",
      suggestedText: "there are",
      explanation: "'Their' is possessive. Use 'there' when referring to a place or existence of something.",
      lineNumber: 7,
      position: { start: 350, end: 359 },
    },
    {
      id: "sug-003",
      type: "grammar",
      severity: "error",
      originalText: "their are",
      suggestedText: "there are",
      explanation: "Same error as above - use 'there' not 'their' when indicating existence.",
      lineNumber: 7,
      position: { start: 405, end: 414 },
    },
    {
      id: "sug-004",
      type: "style",
      severity: "suggestion",
      originalText: "have been completely transformed",
      suggestedText: "has been completely transformed",
      explanation: "Subject-verb agreement: 'the way' is singular, so use 'has' instead of 'have'.",
      lineNumber: 3,
      position: { start: 180, end: 212 },
    },
    {
      id: "sug-005",
      type: "vocabulary",
      severity: "enhancement",
      originalText: "many ways",
      suggestedText: "numerous ways",
      explanation: "Using more precise vocabulary can strengthen your writing. 'Numerous' is more academic than 'many'.",
      lineNumber: 3,
      position: { start: 42, end: 51 },
    },
    {
      id: "sug-006",
      type: "clarity",
      severity: "warning",
      originalText: "This has made learning more convienent and efficient.",
      suggestedText: "This accessibility has streamlined the learning process, making research more efficient.",
      explanation: "Consider being more specific about what 'this' refers to and how it improves learning.",
      lineNumber: 5,
      position: { start: 270, end: 322 },
    },
    {
      id: "sug-007",
      type: "structure",
      severity: "suggestion",
      originalText: "",
      suggestedText: "Consider adding a thesis statement",
      explanation: "Your introduction could be strengthened with a clear thesis statement that outlines your main arguments.",
      lineNumber: 3,
      position: { start: 0, end: 0 },
    },
  ],
};

const writingGoals: WritingGoal[] = [
  { id: "goal-1", name: "Zero Grammar Errors", description: "Write an essay with no grammar mistakes", progress: 72, target: 100 },
  { id: "goal-2", name: "Varied Vocabulary", description: "Use 10+ unique academic words", progress: 6, target: 10 },
  { id: "goal-3", name: "Strong Structure", description: "Include intro, 3 body paragraphs, conclusion", progress: 4, target: 5 },
];

const aiPrompts = [
  "Help me make this more persuasive",
  "Suggest a stronger introduction",
  "Check my citations",
  "Improve my conclusion",
  "Find repetitive words",
];

function getSeverityColor(severity: WritingSuggestion["severity"]) {
  switch (severity) {
    case "error":
      return RED;
    case "warning":
      return GOLD;
    case "suggestion":
      return CYAN;
    case "enhancement":
      return PURPLE;
    default:
      return CYAN;
  }
}

function getCategoryIcon(type: WritingSuggestion["type"]) {
  switch (type) {
    case "grammar":
      return Type;
    case "clarity":
      return Eye;
    case "style":
      return PenTool;
    case "structure":
      return List;
    case "vocabulary":
      return Languages;
    case "citation":
      return Quote;
    default:
      return Edit3;
  }
}

function SuggestionCard({ suggestion, index }: { suggestion: WritingSuggestion; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [applied, setApplied] = useState(false);
  const severityColor = getSeverityColor(suggestion.severity);
  const CategoryIcon = getCategoryIcon(suggestion.type);

  if (applied) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="rounded-xl overflow-hidden"
      style={{
        border: `1px solid ${severityColor.replace(")", " / 0.25)")}`,
        background: severityColor.replace(")", " / 0.05)"),
      }}
    >
      <div className="p-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
              style={{
                background: severityColor.replace(")", " / 0.12)"),
                border: `1px solid ${severityColor.replace(")", " / 0.25)")}`,
              }}
            >
              <CategoryIcon className="w-3.5 h-3.5" style={{ color: severityColor }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Badge
                  className="text-[8px] uppercase"
                  style={{
                    background: severityColor.replace(")", " / 0.15)"),
                    color: severityColor,
                  }}
                >
                  {suggestion.severity}
                </Badge>
                <span className="text-[10px] text-muted-foreground capitalize">{suggestion.type}</span>
              </div>
              {suggestion.originalText && (
                <p className="text-xs text-foreground/70 mt-1.5 line-through">{suggestion.originalText}</p>
              )}
              <p className="text-xs font-medium text-foreground mt-1" style={{ color: severityColor }}>
                {suggestion.suggestedText || suggestion.explanation}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-[10px] text-muted-foreground mt-2 hover:text-foreground transition-colors"
        >
          <Lightbulb className="w-3 h-3" />
          Why?
          <ChevronDown className={`w-3 h-3 transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>
      </div>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="px-3 pb-3"
        >
          <p className="text-xs text-muted-foreground bg-white/5 rounded-lg p-2.5">{suggestion.explanation}</p>
        </motion.div>
      )}

      <div className="flex items-center border-t border-white/5">
        <button
          onClick={() => setApplied(true)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs text-foreground hover:bg-white/5 transition-colors"
        >
          <CheckCircle2 className="w-3.5 h-3.5" style={{ color: EMERALD }} />
          Apply
        </button>
        <div className="w-px h-6 bg-white/5" />
        <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors">
          <RefreshCw className="w-3.5 h-3.5" />
          Rephrase
        </button>
        <div className="w-px h-6 bg-white/5" />
        <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors">
          Skip
        </button>
      </div>
    </motion.div>
  );
}

function ScoreGauge({ score, label, color }: { score: number; label: string; color: string }) {
  return (
    <div className="text-center">
      <div className="relative w-14 h-14 mx-auto">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="28" cy="28" r="24" fill="none" stroke="oklch(0.25 0.0 0)" strokeWidth="4" />
          <motion.circle
            cx="28"
            cy="28"
            r="24"
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${(score / 100) * 150.8} 150.8`}
            initial={{ strokeDasharray: "0 150.8" }}
            animate={{ strokeDasharray: `${(score / 100) * 150.8} 150.8` }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-foreground">{score}</span>
        </div>
      </div>
      <p className="text-[10px] text-muted-foreground mt-1.5">{label}</p>
    </div>
  );
}

export default function AIWritingCoach() {
  const [selectedTab, setSelectedTab] = useState<"suggestions" | "feedback" | "goals">("suggestions");
  const [aiInput, setAiInput] = useState("");

  return (
    <div className="portal-enter min-h-screen" data-ocid="student_writing_coach_ai.page">
      {/* Header */}
      <div
        className="glass sticky top-0 z-30"
        style={{ borderBottom: `1px solid ${PURPLE.replace(")", " / 0.18)")}` }}
      >
        <div className="mx-auto max-w-[1600px] px-6 py-4 flex items-center justify-between">
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
                  background: `linear-gradient(135deg, ${PURPLE.replace(")", " / 0.20)")} 0%, ${CYAN.replace(")", " / 0.10)")} 100%)`,
                  border: `1px solid ${PURPLE.replace(")", " / 0.35)")}`,
                }}
              >
                <PenTool className="h-4 w-4" style={{ color: PURPLE }} />
                <span
                  className="font-display font-bold text-sm"
                  style={{ color: PURPLE, letterSpacing: "0.15em" }}
                >
                  AI WRITING COACH
                </span>
              </div>
              <div>
                <p className="font-display font-semibold text-foreground text-base leading-none">
                  Real-time Writing Assistant
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Grammar · Style · Structure · Vocabulary · EDDI Intelligence
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="gap-1.5">
              <FileText className="w-3 h-3" />
              Technology Essay
            </Badge>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Save className="w-4 h-4" />
              Save Draft
            </Button>
            <Button
              size="sm"
              className="gap-1.5"
              style={{
                background: EMERALD.replace(")", " / 0.20)"),
                border: `1px solid ${EMERALD.replace(")", " / 0.40)")}`,
              }}
            >
              <Send className="w-4 h-4" />
              Submit
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Writing Area */}
          <div className="lg:col-span-2 space-y-5">
            {/* Writing Stats Bar */}
            <div className="flex items-center justify-between glass rounded-xl p-3">
              <div className="flex items-center gap-4">
                {[
                  { label: "Words", value: writingFeedback.wordCount },
                  { label: "Sentences", value: writingFeedback.sentenceCount },
                  { label: "Avg Length", value: `${writingFeedback.avgSentenceLength.toFixed(1)}` },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-1.5">
                    <span className="font-mono text-sm font-medium text-foreground">{stat.value}</span>
                    <span className="text-[10px] text-muted-foreground">{stat.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Reading Level:</span>
                <Badge variant="outline">{writingFeedback.readabilityGrade}</Badge>
              </div>
            </div>

            {/* Essay Editor */}
            <div
              className="glass rounded-2xl p-6"
              style={{ border: `1px solid oklch(0.45 0.0 0 / 0.3)` }}
            >
              <textarea
                defaultValue={sampleEssay}
                className="w-full h-[450px] bg-transparent text-foreground font-mono text-sm leading-relaxed resize-none focus:outline-none"
                placeholder="Start writing your essay here..."
              />
            </div>

            {/* AI Assistant Input */}
            <div
              className="glass rounded-xl p-4"
              style={{
                border: `1px solid ${PURPLE.replace(")", " / 0.25)")}`,
                background: `linear-gradient(135deg, ${PURPLE.replace(")", " / 0.05)")} 0%, transparent 50%)`,
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4" style={{ color: PURPLE }} />
                <span className="text-xs font-medium text-foreground">Ask EDDI for help</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder="E.g., 'Help me improve my thesis statement'"
                  className="flex-1 bg-white/5 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1"
                  style={{ "--tw-ring-color": PURPLE.replace(")", " / 0.5)") } as Record<string, string>}
                />
                <Button
                  size="sm"
                  className="h-9 px-4"
                  style={{
                    background: PURPLE.replace(")", " / 0.20)"),
                    border: `1px solid ${PURPLE.replace(")", " / 0.40)")}`,
                  }}
                >
                  <Wand2 className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="h-9 px-3">
                  <Mic className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {aiPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => setAiInput(prompt)}
                    className="px-3 py-1.5 text-[10px] rounded-full bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Feedback Panel */}
          <div className="space-y-5">
            {/* Overall Score */}
            <div
              className="glass rounded-2xl p-5"
              style={{
                border: `1px solid ${(writingFeedback.overallScore >= 80 ? EMERALD : GOLD).replace(")", " / 0.25)")}`,
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-foreground">Writing Score</h3>
                <Badge
                  className="text-xs"
                  style={{
                    background: (writingFeedback.overallScore >= 80 ? EMERALD : GOLD).replace(")", " / 0.15)"),
                    color: writingFeedback.overallScore >= 80 ? EMERALD : GOLD,
                  }}
                >
                  {writingFeedback.overallScore >= 80 ? "Good" : "Needs Work"}
                </Badge>
              </div>

              <div className="flex items-center justify-center mb-5">
                <div className="relative">
                  <svg className="w-28 h-28 transform -rotate-90">
                    <circle cx="56" cy="56" r="48" fill="none" stroke="oklch(0.25 0.0 0)" strokeWidth="8" />
                    <motion.circle
                      cx="56"
                      cy="56"
                      r="48"
                      fill="none"
                      stroke={writingFeedback.overallScore >= 80 ? EMERALD : GOLD}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${(writingFeedback.overallScore / 100) * 301.6} 301.6`}
                      initial={{ strokeDasharray: "0 301.6" }}
                      animate={{ strokeDasharray: `${(writingFeedback.overallScore / 100) * 301.6} 301.6` }}
                      transition={{ duration: 1 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-display font-bold text-foreground">
                      {writingFeedback.overallScore}
                    </span>
                    <span className="text-[10px] text-muted-foreground">out of 100</span>
                  </div>
                </div>
              </div>

              {/* Category Scores */}
              <div className="grid grid-cols-5 gap-1">
                {Object.entries(writingFeedback.categories).map(([key, value]) => (
                  <ScoreGauge
                    key={key}
                    score={value.score}
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    color={value.score >= 80 ? EMERALD : value.score >= 70 ? GOLD : RED}
                  />
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl">
              {(["suggestions", "feedback", "goals"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`flex-1 py-2 text-xs font-medium rounded-lg transition-colors ${
                    selectedTab === tab
                      ? "bg-white/10 text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {tab === "suggestions" && (
                    <Badge variant="secondary" className="ml-1.5 text-[9px]">
                      {writingFeedback.suggestions.length}
                    </Badge>
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-3">
              {selectedTab === "suggestions" && (
                <>
                  {writingFeedback.suggestions.map((suggestion, i) => (
                    <SuggestionCard key={suggestion.id} suggestion={suggestion} index={i} />
                  ))}
                  {writingFeedback.suggestions.length === 0 && (
                    <div className="glass rounded-xl p-6 text-center">
                      <CheckCircle2 className="w-10 h-10 mx-auto mb-3" style={{ color: EMERALD }} />
                      <p className="font-medium text-foreground">Great job!</p>
                      <p className="text-xs text-muted-foreground mt-1">No suggestions at this time.</p>
                    </div>
                  )}
                </>
              )}

              {selectedTab === "feedback" && (
                <div className="space-y-3">
                  {Object.entries(writingFeedback.categories).map(([key, value]) => (
                    <div
                      key={key}
                      className="glass rounded-xl p-3"
                      style={{
                        border: `1px solid ${(value.score >= 80 ? EMERALD : GOLD).replace(")", " / 0.20)")}`,
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {(() => {
                            const Icon = getCategoryIcon(key as WritingSuggestion["type"]);
                            return <Icon className="w-4 h-4 text-muted-foreground" />;
                          })()}
                          <span className="text-sm font-medium text-foreground capitalize">{key}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className="font-bold"
                            style={{ color: value.score >= 80 ? EMERALD : GOLD }}
                          >
                            {value.score}%
                          </span>
                          {value.issues > 0 && (
                            <Badge variant="secondary" className="text-[9px]">
                              {value.issues} {value.issues === 1 ? "issue" : "issues"}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selectedTab === "goals" && (
                <div className="space-y-3">
                  {writingGoals.map((goal, i) => (
                    <motion.div
                      key={goal.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="glass rounded-xl p-3"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-sm font-medium text-foreground">{goal.name}</h4>
                          <p className="text-[10px] text-muted-foreground">{goal.description}</p>
                        </div>
                        <span className="text-xs font-mono" style={{ color: goal.progress >= goal.target ? EMERALD : GOLD }}>
                          {goal.progress}/{goal.target}
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min((goal.progress / goal.target) * 100, 100)}%` }}
                          className="h-full rounded-full"
                          style={{ background: goal.progress >= goal.target ? EMERALD : CYAN }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* AI Coach */}
            <div
              className="glass rounded-2xl p-4"
              style={{
                border: `1px solid ${CYAN.replace(")", " / 0.25)")}`,
                background: `linear-gradient(135deg, ${CYAN.replace(")", " / 0.08)")} 0%, transparent 50%)`,
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: CYAN.replace(")", " / 0.15)"),
                    border: `1px solid ${CYAN.replace(")", " / 0.30)")}`,
                  }}
                >
                  <Bot className="w-5 h-5" style={{ color: CYAN }} />
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm">EDDI's Tip</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your essay has a strong opening! Consider adding specific examples in your second paragraph
                    to make your argument more compelling.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
