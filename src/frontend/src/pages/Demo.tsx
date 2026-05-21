import type { Subject, Topic } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllSubjects, useTopicsBySubject } from "@/hooks/use-curriculum";
import { useLessonContent } from "@/hooks/use-lesson";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  CheckCircle2,
  GraduationCap,
  LogIn,
  Star,
  XCircle,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

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

const SUBJECT_EMOJIS: Record<string, string> = {
  mathematics: "➗",
  math: "➗",
  science: "🔬",
  english: "📖",
  history: "🏛️",
  geography: "🌍",
  "social studies": "🌍",
  art: "🎨",
  music: "🎵",
  "physical education": "🏃",
  pe: "🏃",
  technology: "💻",
  reading: "📚",
  writing: "✏️",
};

function subjectEmoji(name: string) {
  const key = name.toLowerCase();
  for (const [k, v] of Object.entries(SUBJECT_EMOJIS)) {
    if (key.includes(k)) return v;
  }
  return "📘";
}

function StepDots({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {[1, 2, 3, 4, 5].map((n) => (
        <div
          key={n}
          className={`rounded-full transition-smooth ${
            n === current
              ? "w-6 h-2.5 bg-[oklch(0.78_0.22_200)] shadow-[0_0_8px_rgba(0,210,255,0.5)]"
              : n < current
                ? "w-2.5 h-2.5 bg-[oklch(0.78_0.22_200)]/40"
                : "w-2.5 h-2.5 bg-[rgba(255,255,255,0.08)]"
          }`}
        />
      ))}
    </div>
  );
}

export default function Demo() {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useInternetIdentity();

  // All hooks must be called unconditionally before any early return
  const [step, setStep] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedGrade, setSelectedGrade] = useState("5");
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedAnswerIdx, setSelectedAnswerIdx] = useState<number | null>(
    null,
  );
  const [quizCorrect, setQuizCorrect] = useState(false);

  const { data: subjects = [], isLoading: subjectsLoading } = useAllSubjects();
  const { data: topics = [], isLoading: topicsLoading } = useTopicsBySubject(
    selectedSubject?.id ?? "",
  );
  const topicId = selectedTopic?.id ?? "";
  const gradeForLesson =
    selectedGrade === "K" ? "kindergarten" : `grade_${selectedGrade}`;
  const { data: lesson, isLoading: lessonLoading } = useLessonContent(
    topicId,
    gradeForLesson,
  );

  if (!isAuthenticated) {
    return (
      <div
        data-ocid="demo.auth_gate"
        className="min-h-screen flex items-center justify-center"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,210,255,0.12) 0%, transparent 70%), #07090f",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass rounded-3xl border border-[rgba(0,210,255,0.18)] p-10 max-w-sm w-full mx-4 text-center space-y-6"
          style={{ backdropFilter: "blur(24px)" }}
        >
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[rgba(0,210,255,0.12)] border border-[rgba(0,210,255,0.2)]">
              <GraduationCap className="h-8 w-8 text-[oklch(0.78_0.22_200)]" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="font-display text-xl font-bold text-foreground">
              Internet Identity Required
            </h2>
            <p className="text-sm text-foreground/50 leading-relaxed">
              Please log in with Internet Identity to explore EduAI.
            </p>
          </div>
          <Button
            type="button"
            data-ocid="demo.login_button"
            className="w-full h-12 rounded-2xl bg-[oklch(0.78_0.22_200)] text-[oklch(0.07_0.01_260)] hover:opacity-90 font-bold gap-2 shadow-[0_0_16px_rgba(0,210,255,0.2)]"
            onClick={() => login()}
          >
            <LogIn className="h-4 w-4" />
            Log in with Internet Identity
          </Button>
        </motion.div>
      </div>
    );
  }

  const correctIndex = 1;
  const quizOptions = lesson
    ? [
        `${lesson.coreConceptBlock.slice(0, 40).trim()}…`,
        lesson.practicePrompt.split(" ").slice(0, 8).join(" "),
        `${lesson.introduction.slice(0, 40).trim()}…`,
        `${lesson.expansionBlock.slice(0, 35).trim()}…`,
      ]
    : [];

  function handleCheckAnswer() {
    if (selectedAnswerIdx === null) return;
    setQuizCorrect(selectedAnswerIdx === correctIndex);
    setStep(5);
  }

  function resetDemo() {
    setStep(1);
    setSelectedSubject(null);
    setSelectedTopic(null);
    setSelectedAnswerIdx(null);
    setQuizCorrect(false);
  }

  return (
    <div data-ocid="demo.page" className="portal-enter min-h-screen">
      {/* Top bar */}
      <div className="sticky top-0 z-20 glass border-b border-[rgba(255,255,255,0.06)] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[rgba(0,210,255,0.12)] border border-[rgba(0,210,255,0.2)]">
            <GraduationCap className="h-4 w-4 text-[oklch(0.78_0.22_200)]" />
          </div>
          <span className="font-display font-bold text-foreground text-sm">
            EduAI Demo
          </span>
        </div>
        <Button
          data-ocid="demo.exit_button"
          variant="outline"
          size="sm"
          onClick={() => navigate({ to: "/dashboard" })}
          className="gap-1.5 border-[rgba(255,255,255,0.1)] text-foreground/60 hover:text-foreground rounded-xl"
          type="button"
        >
          <LogIn className="h-3.5 w-3.5" />
          Exit Demo
        </Button>
      </div>

      {/* Demo mode banner */}
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-portal-student border-b border-[rgba(0,210,255,0.15)] px-4 py-2.5 text-center"
      >
        <p className="text-xs font-mono font-bold text-[oklch(0.78_0.22_200)]">
          DEMO MODE · Live sovereign intelligence preview · Sign in to save
          progress
        </p>
      </motion.div>

      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8">
        <StepDots current={step} />

        {/* Step 1: Subject grid */}
        {step === 1 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            data-ocid="demo.step1_section"
            className="space-y-5"
          >
            <div className="text-center space-y-1">
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                Pick a subject to explore
              </h1>
              <p className="text-foreground/40 text-sm font-mono">
                Choose any subject below to get started.
              </p>
            </div>
            {subjectsLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="h-24 rounded-2xl" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {subjects.map((subject, idx) => (
                  <button
                    key={subject.id}
                    type="button"
                    data-ocid={`demo.subject_card.${idx + 1}`}
                    onClick={() => {
                      setSelectedSubject(subject);
                      setSelectedTopic(null);
                      setStep(2);
                    }}
                    className="flex flex-col items-center gap-2 p-4 glass rounded-2xl border border-[rgba(255,255,255,0.06)] hover:border-[rgba(0,210,255,0.25)] hover:bg-[rgba(0,210,255,0.04)] transition-glass cursor-pointer text-center"
                  >
                    <span className="text-2xl">
                      {subjectEmoji(subject.name)}
                    </span>
                    <span className="text-sm font-semibold text-foreground/80 leading-tight">
                      {subject.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </motion.section>
        )}

        {/* Step 2: Grade picker */}
        {step === 2 && (
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            data-ocid="demo.step2_section"
            className="space-y-5"
          >
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs text-foreground/30 hover:text-foreground transition-colors flex items-center gap-1 font-mono"
            >
              ← Back
            </button>
            <div className="text-center space-y-1">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-2xl">
                  {subjectEmoji(selectedSubject?.name ?? "")}
                </span>
                <Badge className="border-[rgba(0,210,255,0.3)] bg-[rgba(0,210,255,0.08)] text-[oklch(0.78_0.22_200)] font-mono">
                  {selectedSubject?.name}
                </Badge>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                What grade are you in?
              </h1>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {GRADES.map((g) => (
                <button
                  key={g}
                  type="button"
                  data-ocid={`demo.grade_btn.${g.toLowerCase()}`}
                  onClick={() => setSelectedGrade(g)}
                  className={`min-w-[44px] h-11 px-3 rounded-2xl border text-sm font-bold font-mono transition-glass ${
                    selectedGrade === g
                      ? "border-[rgba(0,210,255,0.4)] bg-[oklch(0.78_0.22_200)] text-[oklch(0.07_0.01_260)] shadow-[0_0_12px_rgba(0,210,255,0.3)]"
                      : "glass border-[rgba(255,255,255,0.08)] text-foreground/60 hover:border-[rgba(0,210,255,0.2)] hover:text-foreground"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
            <Button
              type="button"
              data-ocid="demo.grade_continue_button"
              className="w-full h-12 rounded-2xl bg-[oklch(0.78_0.22_200)] text-[oklch(0.07_0.01_260)] hover:opacity-90 font-bold shadow-[0_0_16px_rgba(0,210,255,0.2)]"
              onClick={() => setStep(3)}
            >
              Continue →
            </Button>
          </motion.section>
        )}

        {/* Step 3: Topic list */}
        {step === 3 && (
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            data-ocid="demo.step3_section"
            className="space-y-5"
          >
            <button
              type="button"
              onClick={() => setStep(2)}
              className="text-xs text-foreground/30 hover:text-foreground transition-colors flex items-center gap-1 font-mono"
            >
              ← Back
            </button>
            <div className="text-center space-y-1">
              <h1 className="font-display text-2xl font-bold text-foreground">
                Choose a topic
              </h1>
              <p className="text-foreground/40 text-sm font-mono">
                {selectedSubject?.name} · Grade {selectedGrade}
              </p>
            </div>
            {topicsLoading ? (
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-14 rounded-2xl" />
                ))}
              </div>
            ) : topics.length === 0 ? (
              <div
                data-ocid="demo.topics.empty_state"
                className="text-center py-10"
              >
                <BookOpen className="w-8 h-8 mx-auto mb-3 text-foreground/20" />
                <p className="text-sm text-foreground/40">
                  No topics available for this selection.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-4 border-[rgba(255,255,255,0.1)] text-foreground/50 rounded-xl"
                  onClick={() => setStep(2)}
                >
                  Change grade
                </Button>
              </div>
            ) : (
              <div className="space-y-2" data-ocid="demo.topics_list">
                {topics.map((topic, idx) => (
                  <button
                    key={topic.id}
                    type="button"
                    data-ocid={`demo.topic_item.${idx + 1}`}
                    onClick={() => {
                      setSelectedTopic(topic);
                      setSelectedAnswerIdx(null);
                      setStep(4);
                    }}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3.5 glass rounded-2xl border border-[rgba(255,255,255,0.06)] hover:border-[rgba(0,210,255,0.25)] hover:bg-[rgba(0,210,255,0.04)] transition-glass text-left group"
                  >
                    <span className="text-sm font-medium text-foreground/80">
                      {topic.title}
                    </span>
                    <span className="text-xs text-foreground/25 group-hover:text-[oklch(0.78_0.22_200)] transition-colors shrink-0 font-mono">
                      Start →
                    </span>
                  </button>
                ))}
              </div>
            )}
          </motion.section>
        )}

        {/* Step 4: Lesson + quiz */}
        {step === 4 && (
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            data-ocid="demo.step4_section"
            className="space-y-5"
          >
            <button
              type="button"
              onClick={() => setStep(3)}
              className="text-xs text-foreground/30 hover:text-foreground transition-colors flex items-center gap-1 font-mono"
            >
              ← Back
            </button>
            {lessonLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-7 w-2/3 rounded-xl" />
                <Skeleton className="h-24 rounded-2xl" />
                <Skeleton className="h-16 rounded-2xl" />
                <Skeleton className="h-32 rounded-2xl" />
              </div>
            ) : lesson ? (
              <>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className="text-xs border-[rgba(0,210,255,0.3)] bg-[rgba(0,210,255,0.08)] text-[oklch(0.78_0.22_200)] font-mono">
                      {selectedSubject?.name}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-xs border-[rgba(255,255,255,0.1)] text-foreground/40 font-mono"
                    >
                      Grade {selectedGrade}
                    </Badge>
                  </div>
                  <h1 className="font-display text-2xl font-bold text-foreground">
                    {lesson.title}
                  </h1>
                </div>

                <div className="glass rounded-2xl p-4 space-y-1">
                  <p className="text-[10px] font-mono font-bold text-foreground/30 uppercase tracking-widest">
                    Introduction
                  </p>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {lesson.introduction}
                  </p>
                </div>

                <div className="glass-portal-student rounded-2xl p-4 space-y-1">
                  <p className="text-[10px] font-mono font-bold text-[oklch(0.78_0.22_200)] uppercase tracking-widest">
                    Core · 38.2%
                  </p>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {lesson.coreConceptBlock}
                  </p>
                </div>

                {/* Quiz */}
                <div
                  className="glass-xl rounded-2xl p-5 space-y-4"
                  data-ocid="demo.quiz_card"
                >
                  <p className="text-[10px] font-mono font-bold text-foreground/30 uppercase tracking-widest">
                    Quick Check
                  </p>
                  <p className="font-display font-bold text-foreground text-base">
                    {lesson.practicePrompt}
                  </p>
                  <div className="space-y-2">
                    {quizOptions.map((opt, i) => (
                      <label
                        key={opt}
                        data-ocid={`demo.quiz_option.${i + 1}`}
                        className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-glass ${
                          selectedAnswerIdx === i
                            ? "glass-portal-student border-[rgba(0,210,255,0.4)]"
                            : "glass-sm border-[rgba(255,255,255,0.06)] hover:border-[rgba(0,210,255,0.2)]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="demo-quiz"
                          value={i}
                          checked={selectedAnswerIdx === i}
                          onChange={() => setSelectedAnswerIdx(i)}
                          className="accent-[oklch(0.78_0.22_200)]"
                        />
                        <span
                          className={`text-sm ${selectedAnswerIdx === i ? "text-foreground" : "text-foreground/60"}`}
                        >
                          {opt}
                        </span>
                      </label>
                    ))}
                  </div>
                  <Button
                    type="button"
                    data-ocid="demo.check_answer_button"
                    disabled={selectedAnswerIdx === null}
                    className="w-full h-12 rounded-2xl bg-[oklch(0.78_0.22_200)] text-[oklch(0.07_0.01_260)] hover:opacity-90 font-bold disabled:opacity-30"
                    onClick={handleCheckAnswer}
                  >
                    Check Answer
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-10">
                <p className="text-sm text-foreground/40">
                  Unable to load lesson. Try a different topic.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-4 border-[rgba(255,255,255,0.1)] text-foreground/50 rounded-xl"
                  onClick={() => setStep(3)}
                >
                  Back to topics
                </Button>
              </div>
            )}
          </motion.section>
        )}

        {/* Step 5: Quiz result */}
        {step === 5 && (
          <motion.section
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            data-ocid="demo.step5_section"
            className="space-y-6"
          >
            <div
              className={`glass-xl rounded-2xl p-6 text-center space-y-3 border ${
                quizCorrect ? "border-emerald-500/30" : "border-amber-500/30"
              }`}
              data-ocid={
                quizCorrect
                  ? "demo.quiz_correct_state"
                  : "demo.quiz_incorrect_state"
              }
            >
              {quizCorrect ? (
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              ) : (
                <XCircle className="w-10 h-10 text-amber-400 mx-auto" />
              )}
              <h2 className="font-display text-2xl font-bold text-foreground">
                {quizCorrect ? "Correct!" : "Not quite"}
              </h2>
              <p className="text-sm text-foreground/50 leading-relaxed">
                {quizCorrect
                  ? (lesson?.reviewSummary ??
                    "Great job! You understood this concept well.")
                  : "Keep going — every attempt builds understanding."}
              </p>
            </div>

            {/* Demo passport seed preview */}
            <div
              className="glass-portal-student glass-shimmer rounded-2xl p-5 space-y-3"
              data-ocid="demo.passport_seed_preview"
            >
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[oklch(0.78_0.22_200)]" />
                <span className="text-[10px] font-mono font-bold text-[oklch(0.78_0.22_200)] uppercase tracking-widest">
                  Passport Seed Preview
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground">
                  {selectedSubject?.name} · Grade {selectedGrade}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="text-xs border-[rgba(0,210,255,0.3)] bg-[rgba(0,210,255,0.08)] text-[oklch(0.78_0.22_200)] font-mono">
                    Engine: Synthesis
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-xs border-[rgba(255,255,255,0.1)] text-foreground/40 font-mono"
                  >
                    Demo Seed
                  </Badge>
                </div>
                <p className="text-xs text-foreground/30 mt-1 font-mono">
                  Sign in to permanently seal this lesson seed to your passport.
                </p>
              </div>
            </div>

            <div className="glass rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-foreground/40">
                <Zap className="h-4 w-4 text-[oklch(0.78_0.22_200)]" />
                <p className="text-xs font-mono text-[oklch(0.78_0.22_200)]">
                  Sign in to unlock the full sovereign experience
                </p>
              </div>
              <p className="text-xs text-foreground/30">
                Adaptive AI, progress tracking, Fibonacci mastery floors, and a
                permanent learning passport.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="button"
                variant="outline"
                data-ocid="demo.try_another_button"
                className="flex-1 rounded-2xl border-[rgba(255,255,255,0.1)] text-foreground/60 hover:text-foreground h-12"
                onClick={resetDemo}
              >
                Try another topic
              </Button>
              <Button
                type="button"
                data-ocid="demo.signin_button"
                className="flex-1 gap-1.5 rounded-2xl bg-[oklch(0.78_0.22_200)] text-[oklch(0.07_0.01_260)] hover:opacity-90 font-bold h-12 shadow-[0_0_16px_rgba(0,210,255,0.2)]"
                onClick={() => navigate({ to: "/dashboard" })}
              >
                <LogIn className="w-4 h-4" />
                Sign in to save progress
              </Button>
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
