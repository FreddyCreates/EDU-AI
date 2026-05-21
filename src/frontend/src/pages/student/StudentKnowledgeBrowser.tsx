// StudentKnowledgeBrowser — grade-gated sovereign curriculum browser
// Powered by GVLT + NRVE; reads use-knowledge.ts (content) NOT use-gvlt.ts (performance)
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllSubjects } from "@/hooks/use-curriculum";
import { useKnowledge } from "@/hooks/use-knowledge";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  ChevronRight,
  GraduationCap,
  Lock,
  Sparkles,
  Unlock,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const GRADES = [
  "K",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];
const TEAL = "oklch(0.72 0.16 185)";
// Numeric grade for comparison — K=0
function gradeToNum(g: string): number {
  return g === "K" ? 0 : Number.parseInt(g, 10);
}

export default function StudentKnowledgeBrowser() {
  // Default student grade = 9; in production this comes from passport/actor
  const studentGrade = "9";
  const studentGradeNum = gradeToNum(studentGrade);

  // Parse ?subject= from URL
  const urlParams = new URLSearchParams(window.location.search);
  const urlSubject = urlParams.get("subject");

  const [selectedGrade, setSelectedGrade] = useState(studentGrade);
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");

  const { data: subjects = [] } = useAllSubjects();
  const subjectNames = subjects.length
    ? subjects.map((s) => s.name)
    : [
        "Mathematics",
        "Science",
        "English Language Arts",
        "History",
        "Geometry",
        "Biology",
      ];

  // Pre-select subject from URL param when subjects load
  useEffect(() => {
    if (urlSubject) {
      const match = subjectNames.find(
        (s) => s.toLowerCase() === urlSubject.toLowerCase(),
      );
      if (match) setSelectedSubject(match);
    }
  }, [subjectNames, urlSubject]);

  const { data: knowledge = [], isLoading } = useKnowledge(
    selectedGrade,
    selectedSubject,
    false,
  );

  const selectedGradeNum = gradeToNum(selectedGrade);
  const isViewingFutureGrade = selectedGradeNum > studentGradeNum;

  return (
    <div
      className="portal-enter min-h-screen"
      data-ocid="knowledge_browser.page"
    >
      {/* Header */}
      <div
        className="glass-portal sticky top-0 z-30"
        style={{ borderBottom: "1px solid rgba(0,220,200,0.18)" }}
      >
        <div className="mx-auto max-w-[1200px] px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-2 rounded-xl px-3 py-2"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,200,180,0.18) 0%, rgba(0,140,130,0.12) 100%)",
                border: "1px solid rgba(0,220,200,0.30)",
              }}
            >
              <BookOpen className="h-4 w-4" style={{ color: TEAL }} />
              <span
                className="font-display font-bold text-sm"
                style={{ color: TEAL, letterSpacing: "0.15em" }}
              >
                KNOWLEDGE VAULT
              </span>
            </div>
            <div>
              <p className="font-display font-semibold text-base text-foreground leading-none">
                Grade-Gated Curriculum Browser
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Sovereign content · GVLT-gated by PHI score
              </p>
            </div>
          </div>
          <div className="glass-sm rounded-lg px-3 py-1.5 flex items-center gap-2">
            <GraduationCap className="h-3.5 w-3.5" style={{ color: TEAL }} />
            <span className="text-xs font-mono text-foreground">
              Grade {studentGrade}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-5 py-6 space-y-6">
        {/* Grade breadcrumb bar */}
        <div
          className="glass-knowledge-surface rounded-xl px-4 py-3 overflow-x-auto"
          data-ocid="knowledge_browser.breadcrumb"
        >
          <div className="flex items-center gap-1 min-w-max">
            {GRADES.map((g, i) => {
              const gNum = gradeToNum(g);
              const isCurrent = g === studentGrade;
              const isPast = gNum < studentGradeNum;
              const isFuture = gNum > studentGradeNum;
              return (
                <span key={g} className="flex items-center gap-1">
                  {i > 0 && (
                    <ChevronRight className="h-3 w-3 text-muted-foreground/40 shrink-0" />
                  )}
                  <button
                    type="button"
                    data-ocid={`knowledge_browser.breadcrumb_grade.${i + 1}`}
                    onClick={() => setSelectedGrade(g)}
                    className={cn(
                      "px-2 py-0.5 rounded text-xs font-mono font-semibold transition-smooth",
                      isCurrent && "rounded-md px-2.5 py-1",
                    )}
                    style={{
                      background: isCurrent
                        ? "rgba(0,200,180,0.22)"
                        : isPast
                          ? "rgba(0,200,180,0.06)"
                          : "transparent",
                      color: isCurrent
                        ? TEAL
                        : isPast
                          ? "oklch(0.65 0.08 185)"
                          : "oklch(0.45 0.04 185)",
                      border: isCurrent
                        ? "1px solid rgba(0,200,180,0.40)"
                        : "1px solid transparent",
                      opacity: isFuture ? 0.45 : 1,
                    }}
                    title={
                      isFuture ? "Advanced grade — PHI-locked" : `Grade ${g}`
                    }
                  >
                    {g}
                  </button>
                </span>
              );
            })}
          </div>
        </div>

        {/* Grade selector (full buttons) */}
        <div
          className="flex flex-wrap gap-2"
          data-ocid="knowledge_browser.grade_selector"
        >
          {GRADES.map((g, i) => (
            <button
              key={g}
              type="button"
              data-ocid={`knowledge_browser.grade_tab.${i + 1}`}
              onClick={() => setSelectedGrade(g)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-smooth border",
                selectedGrade === g
                  ? "glass-portal text-foreground"
                  : "glass-sm text-muted-foreground border-transparent hover:border-white/10 hover:text-foreground",
              )}
              style={
                selectedGrade === g
                  ? { borderColor: "rgba(0,220,200,0.40)" }
                  : {}
              }
            >
              {g === "K" ? "K" : g}
            </button>
          ))}
        </div>

        {/* Subject selector */}
        <div
          className="flex flex-wrap gap-2"
          data-ocid="knowledge_browser.subject_selector"
        >
          {subjectNames.map((sub, i) => (
            <button
              key={sub}
              type="button"
              data-ocid={`knowledge_browser.subject_tab.${i + 1}`}
              onClick={() => setSelectedSubject(sub)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-smooth border",
                selectedSubject === sub
                  ? "glass-portal text-foreground"
                  : "glass-sm text-muted-foreground border-transparent hover:border-white/10 hover:text-foreground",
              )}
              style={
                selectedSubject === sub
                  ? { borderColor: "rgba(0,220,200,0.40)" }
                  : {}
              }
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Locked grade banner */}
        {isViewingFutureGrade && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-knowledge-surface rounded-xl px-5 py-3 flex items-center gap-3"
            style={{ border: "1px solid rgba(255,185,0,0.25)" }}
            data-ocid="knowledge_browser.locked_banner"
          >
            <Lock className="h-4 w-4 shrink-0" style={{ color: TEAL }} />
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">
                Grade {selectedGrade} is PHI-locked.
              </span>{" "}
              Reach a mastery score of F(10)=55 in Grade {studentGrade} to
              unlock.
            </p>
          </motion.div>
        )}

        {/* Knowledge content */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32 rounded-2xl" />
            ))}
          </div>
        ) : knowledge.length > 0 ? (
          <div className="space-y-6">
            {knowledge.map((result, ri) => {
              const resultGradeNum = gradeToNum(result.gradeLevel);
              const isLocked =
                result.lockedForStudent || resultGradeNum > studentGradeNum;
              return (
                <motion.div
                  key={`${result.subject}-${ri}`}
                  data-ocid={`knowledge_browser.result_group.${ri + 1}`}
                  initial={{ opacity: 0, y: 13 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: ri * 0.08 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <h3 className="font-display font-bold text-foreground">
                      {result.subject}
                    </h3>
                    <Badge
                      className="font-mono text-xs"
                      style={{
                        background: "rgba(0,200,180,0.12)",
                        borderColor: "rgba(0,200,180,0.28)",
                        color: TEAL,
                      }}
                    >
                      Grade {result.gradeLevel}
                    </Badge>
                    {isLocked ? (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Lock className="h-3 w-3" /> Locked
                      </div>
                    ) : (
                      <div
                        className="flex items-center gap-1 text-xs"
                        style={{ color: TEAL }}
                      >
                        <Unlock className="h-3 w-3" /> Accessible
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {result.topics.map((topic, ti) => (
                      <motion.div
                        key={topic.id}
                        data-ocid={`knowledge_browser.topic_card.${ti + 1}`}
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: ti * 0.04 }}
                        className={cn(
                          "glass-knowledge-surface rounded-xl p-4 cursor-pointer group hover:scale-[1.01] transition-smooth space-y-2 relative overflow-hidden",
                        )}
                        style={{ border: "1px solid rgba(0,200,180,0.12)" }}
                      >
                        {/* Lock overlay for locked topics */}
                        {isLocked && (
                          <div
                            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-xl"
                            style={{
                              background: "rgba(10,10,20,0.65)",
                              backdropFilter: "blur(4px)",
                              border: "1px solid rgba(255,185,0,0.15)",
                            }}
                          >
                            <Lock className="h-5 w-5" style={{ color: TEAL }} />
                            <span className="text-[10px] font-mono text-muted-foreground">
                              PHI-Locked
                            </span>
                          </div>
                        )}
                        <div
                          className="space-y-2"
                          style={
                            isLocked
                              ? { filter: "blur(3px)", userSelect: "none" }
                              : {}
                          }
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <Sparkles
                                className="h-3.5 w-3.5 shrink-0"
                                style={{ color: TEAL }}
                              />
                              <p className="font-semibold text-sm text-foreground truncate">
                                {topic.title}
                              </p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 group-hover:text-foreground transition-colors" />
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {topic.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div
            className="glass-knowledge-surface rounded-2xl p-12 flex flex-col items-center gap-4 text-center"
            data-ocid="knowledge_browser.empty_state"
            style={{ border: "1px dashed rgba(0,200,180,0.25)" }}
          >
            <BookOpen className="h-12 w-12 text-muted-foreground/40" />
            <div>
              <p className="font-display font-bold text-foreground text-lg">
                Select a subject to explore topics for your grade level
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Choose a subject above · Grade {selectedGrade} content ·
                GVLT-gated
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
