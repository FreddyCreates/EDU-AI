import type { DigtDigestResult } from "@/backend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  useConceptsByGrade,
  useDigestTextbook,
  useDigtStats,
  useQuizSeedsByGrade,
} from "@/hooks/use-digt";
import { useCheckGradeAccess, useGvltStats } from "@/hooks/use-gvlt";
import {
  BookOpen,
  Brain,
  CheckCircle2,
  FlaskConical,
  HelpCircle,
  Lock,
  Shield,
  Unlock,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const SUBJECTS = [
  "Mathematics",
  "Science",
  "Language Arts",
  "Social Studies",
  "Reading",
  "Writing",
  "History",
  "Geography",
  "Art",
  "Music",
  "Physical Education",
  "Computer Science",
];

const GRADES = Array.from({ length: 12 }, (_, i) => i + 1);

const VIOLET = "oklch(0.72 0.20 290)";
const VIOLET_GLOW = "rgba(140,80,255,0.18)";
const VIOLET_BORDER = "rgba(140,80,255,0.25)";

function StatTile({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
}) {
  return (
    <div
      className="glass rounded-xl p-4 flex items-center gap-3"
      style={{ border: `1px solid ${VIOLET_BORDER}` }}
    >
      <div
        className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0"
        style={{
          background: "rgba(140,80,255,0.12)",
          border: `1px solid ${VIOLET_BORDER}`,
        }}
      >
        <Icon className="h-4 w-4" style={{ color: VIOLET }} />
      </div>
      <div className="min-w-0">
        <p className="text-xl font-display font-bold text-foreground leading-none">
          {value}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5 truncate">{label}</p>
      </div>
    </div>
  );
}

function DigestResultCard({ result }: { result: DigtDigestResult }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-xl rounded-2xl p-5 mt-4 relative overflow-hidden"
      style={{ border: "1px solid rgba(0,220,130,0.25)" }}
      data-ocid="digt.result_card"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,220,130,0.10) 0%, transparent 70%)",
        }}
      />
      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2
            className="h-5 w-5"
            style={{ color: "oklch(0.72 0.17 155)" }}
          />
          <p className="text-base font-display font-bold text-foreground">
            Digest Complete
          </p>
          <span
            className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded-lg"
            style={{
              background: "rgba(0,220,130,0.10)",
              color: "oklch(0.72 0.17 155)",
              border: "1px solid rgba(0,220,130,0.22)",
            }}
          >
            Grade {result.gradeLevel.toString()}
          </span>
          <span
            className="text-[10px] font-mono px-2 py-0.5 rounded-lg"
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "oklch(0.55 0.01 260)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {result.subject}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-3">
          {[
            { label: "Concepts", value: result.conceptsExtracted.toString() },
            {
              label: "Quiz Seeds",
              value: result.quizSeedsGenerated.toString(),
            },
            { label: "Examples", value: result.workedExamplesFound.toString() },
          ].map(({ label, value }) => (
            <div key={label} className="glass-sm rounded-xl p-3 text-center">
              <p className="text-2xl font-display font-bold text-foreground">
                {value}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Zap className="h-3.5 w-3.5 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">
            Processed in F(n)={result.processingCycles.toString()} cycles
          </p>
          <span
            className="ml-auto text-xs font-medium"
            style={{ color: "oklch(0.72 0.17 155)" }}
          >
            Sealed in Grade Vault ✓
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function ConceptCard({
  term,
  definition,
  difficulty,
  subject,
}: {
  term: string;
  definition: string;
  difficulty: bigint;
  subject: string;
}) {
  return (
    <div className="glass-sm rounded-xl p-3">
      <div className="flex items-start gap-2 mb-1.5">
        <p className="font-semibold text-sm text-foreground flex-1">{term}</p>
        <span
          className="text-[10px] font-mono px-1.5 py-0.5 rounded shrink-0"
          style={{
            background: "rgba(140,80,255,0.10)",
            color: VIOLET,
            border: `1px solid ${VIOLET_BORDER}`,
          }}
        >
          F({difficulty.toString()})
        </span>
        <span
          className="text-[10px] font-mono px-1.5 py-0.5 rounded shrink-0"
          style={{
            background: "rgba(255,255,255,0.06)",
            color: "oklch(0.55 0.01 260)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {subject}
        </span>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">
        {definition}
      </p>
    </div>
  );
}

function QuizSeedCard({
  question,
  answer,
  distractors,
  subject,
  gradeLevel,
}: {
  question: string;
  answer: string;
  distractors: string[];
  subject: string;
  gradeLevel: bigint;
}) {
  return (
    <div className="glass-sm rounded-xl p-3">
      <div className="flex items-center gap-2 mb-2">
        <HelpCircle className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
        <p className="text-sm font-medium text-foreground">{question}</p>
      </div>
      <p className="text-xs font-medium mb-1.5" style={{ color: VIOLET }}>
        → {answer}
      </p>
      {distractors.slice(0, 2).map((d) => (
        <p key={d} className="text-xs text-muted-foreground ml-3">
          · {d}
        </p>
      ))}
      <div className="flex items-center gap-2 mt-2">
        <span
          className="text-[10px] font-mono px-1.5 py-0.5 rounded"
          style={{
            background: "rgba(140,80,255,0.10)",
            color: VIOLET,
            border: `1px solid ${VIOLET_BORDER}`,
          }}
        >
          {subject}
        </span>
        <span
          className="text-[10px] font-mono px-1.5 py-0.5 rounded"
          style={{
            background: "rgba(255,255,255,0.06)",
            color: "oklch(0.55 0.01 260)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          Grade {gradeLevel.toString()}
        </span>
      </div>
    </div>
  );
}

function GradeVaultExplorer() {
  const [selectedGrade, setSelectedGrade] = useState(1);
  const [studentGrade, setStudentGrade] = useState("");
  const [contentGrade, setContentGrade] = useState("");
  const [checkEnabled, setCheckEnabled] = useState(false);

  const { data: concepts, isLoading: conceptsLoading } =
    useConceptsByGrade(selectedGrade);
  const { data: quizSeeds, isLoading: seedsLoading } =
    useQuizSeedsByGrade(selectedGrade);
  const { data: gateResult } = useCheckGradeAccess(
    checkEnabled ? Number(studentGrade) : 0,
    checkEnabled ? Number(contentGrade) : 0,
  );

  const inputStyle = {
    background: "rgba(12,14,28,0.80)",
    borderColor: VIOLET_BORDER,
    backdropFilter: "blur(8px)",
  };

  return (
    <div className="space-y-6">
      {/* Grade chips */}
      <div>
        <p className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground uppercase mb-2">
          Select Grade Level
        </p>
        <div className="flex flex-wrap gap-1.5" data-ocid="digt.grade_selector">
          {GRADES.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setSelectedGrade(g)}
              data-ocid={`digt.grade_button.${g}`}
              className="h-9 w-9 rounded-xl text-sm font-bold transition-smooth"
              style={
                selectedGrade === g
                  ? {
                      background: "rgba(140,80,255,0.25)",
                      color: VIOLET,
                      border: `1px solid ${VIOLET_BORDER}`,
                      boxShadow: `0 0 12px ${VIOLET_GLOW}`,
                    }
                  : {
                      background: "rgba(255,255,255,0.04)",
                      color: "oklch(0.55 0.01 260)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }
              }
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Concepts */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Brain className="h-4 w-4" style={{ color: VIOLET }} />
          <h3 className="text-sm font-semibold text-foreground">
            Concepts — Grade {selectedGrade}
          </h3>
          {concepts && (
            <span
              className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded"
              style={{
                background: "rgba(140,80,255,0.10)",
                color: VIOLET,
                border: `1px solid ${VIOLET_BORDER}`,
              }}
            >
              {concepts.length} total
            </span>
          )}
        </div>
        {conceptsLoading ? (
          <div className="space-y-2">
            <div className="glass-sm rounded-xl h-16" />
            <div className="glass-sm rounded-xl h-16" />
          </div>
        ) : concepts && concepts.length > 0 ? (
          <div className="space-y-2" data-ocid="digt.concepts_list">
            {concepts.map((c, i) => (
              <div key={c.id} data-ocid={`digt.concept.${i + 1}`}>
                <ConceptCard
                  term={c.term}
                  definition={c.definition}
                  difficulty={c.difficulty}
                  subject={c.subject}
                />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="glass-sm rounded-xl p-6 text-center"
            style={{ border: `2px dashed ${VIOLET_BORDER}` }}
            data-ocid="digt.concepts_empty_state"
          >
            <BookOpen className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No concepts for Grade {selectedGrade} yet.
            </p>
          </div>
        )}
      </div>

      {/* Quiz Seeds */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <FlaskConical className="h-4 w-4" style={{ color: VIOLET }} />
          <h3 className="text-sm font-semibold text-foreground">
            Quiz Seeds — Grade {selectedGrade}
          </h3>
          {quizSeeds && (
            <span
              className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded"
              style={{
                background: "rgba(140,80,255,0.10)",
                color: VIOLET,
                border: `1px solid ${VIOLET_BORDER}`,
              }}
            >
              {quizSeeds.length} seeds
            </span>
          )}
        </div>
        {seedsLoading ? (
          <div className="space-y-2">
            <div className="glass-sm rounded-xl h-20" />
            <div className="glass-sm rounded-xl h-20" />
          </div>
        ) : quizSeeds && quizSeeds.length > 0 ? (
          <div className="space-y-2" data-ocid="digt.quiz_seeds_list">
            {quizSeeds.map((s, i) => (
              <div key={s.id} data-ocid={`digt.quiz_seed.${i + 1}`}>
                <QuizSeedCard
                  question={s.question}
                  answer={s.answer}
                  distractors={s.distractors}
                  subject={s.subject}
                  gradeLevel={s.gradeLevel}
                />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="glass-sm rounded-xl p-6 text-center"
            style={{ border: `2px dashed ${VIOLET_BORDER}` }}
            data-ocid="digt.seeds_empty_state"
          >
            <FlaskConical className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No quiz seeds for Grade {selectedGrade} yet.
            </p>
          </div>
        )}
      </div>

      {/* Grade Gate Checker */}
      <div
        className="glass-xl rounded-2xl p-5 space-y-3"
        style={{ border: `1px solid ${VIOLET_BORDER}` }}
      >
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4" style={{ color: VIOLET }} />
          <p className="text-sm font-display font-semibold text-foreground">
            Grade Gate Checker
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs" htmlFor="student-grade-input">
              Student Grade
            </Label>
            <input
              id="student-grade-input"
              type="number"
              min={1}
              max={12}
              placeholder="e.g. 6"
              value={studentGrade}
              onChange={(e) => {
                setStudentGrade(e.target.value);
                setCheckEnabled(false);
              }}
              data-ocid="digt.gate_student_grade_input"
              className="w-full rounded-xl border px-3 py-2 text-sm focus:outline-none"
              style={inputStyle}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs" htmlFor="content-grade-input">
              Content Grade
            </Label>
            <input
              id="content-grade-input"
              type="number"
              min={1}
              max={12}
              placeholder="e.g. 8"
              value={contentGrade}
              onChange={(e) => {
                setContentGrade(e.target.value);
                setCheckEnabled(false);
              }}
              data-ocid="digt.gate_content_grade_input"
              className="w-full rounded-xl border px-3 py-2 text-sm focus:outline-none"
              style={inputStyle}
            />
          </div>
        </div>
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-mono font-bold transition-smooth"
          onClick={() => setCheckEnabled(true)}
          disabled={
            !studentGrade ||
            !contentGrade ||
            Number(studentGrade) < 1 ||
            Number(contentGrade) < 1
          }
          data-ocid="digt.gate_check_button"
          style={{
            background: "rgba(140,80,255,0.18)",
            color: VIOLET,
            border: `1px solid ${VIOLET_BORDER}`,
            boxShadow: `0 0 20px ${VIOLET_GLOW}`,
          }}
        >
          <Shield className="h-3.5 w-3.5" /> Check Access
        </button>
        {checkEnabled && gateResult && (
          <div
            className="glass-sm rounded-xl p-3 flex items-start gap-2.5"
            style={{
              border: gateResult.allowed
                ? "1px solid rgba(0,220,130,0.25)"
                : "1px solid rgba(255,80,80,0.25)",
            }}
            data-ocid="digt.gate_result"
          >
            {gateResult.allowed ? (
              <Unlock
                className="h-4 w-4 shrink-0 mt-0.5"
                style={{ color: "oklch(0.72 0.17 155)" }}
              />
            ) : (
              <Lock
                className="h-4 w-4 shrink-0 mt-0.5"
                style={{ color: "oklch(0.65 0.22 22)" }}
              />
            )}
            <div>
              <p
                className="text-sm font-semibold"
                style={{
                  color: gateResult.allowed
                    ? "oklch(0.72 0.17 155)"
                    : "oklch(0.65 0.22 22)",
                }}
              >
                {gateResult.allowed ? "Access Allowed" : "Access Blocked"}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {gateResult.reason}
              </p>
              {!gateResult.allowed && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  Locked until Grade {gateResult.requestedGrade.toString()}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DigtAdmin() {
  const { data: digtStats, isLoading: digtLoading } = useDigtStats();
  const { data: gvltStats, isLoading: gvltLoading } = useGvltStats();
  const digestMutation = useDigestTextbook();

  const [title, setTitle] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [subject, setSubject] = useState("");
  const [rawText, setRawText] = useState("");
  const [lastResult, setLastResult] = useState<DigtDigestResult | null>(null);

  const handleDigest = async () => {
    if (!title || !gradeLevel || !subject || !rawText.trim()) {
      toast.error("All fields required before digesting.");
      return;
    }
    try {
      const result = await digestMutation.mutateAsync({
        title,
        gradeLevel: Number(gradeLevel),
        subject,
        rawText,
      });
      setLastResult(result);
      toast.success("Curriculum digested and sealed in Grade Vault.");
    } catch {
      toast.error("DIGT engine error — check system diagnostics.");
    }
  };

  const inputStyle = {
    background: "rgba(12,14,28,0.80)",
    backdropFilter: "blur(8px)",
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-6">
      {/* OS Header */}
      <div
        className="glass-xl rounded-3xl p-8 relative overflow-hidden glass-shimmer"
        style={{ border: `1px solid ${VIOLET_BORDER}` }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 80% -10%, rgba(140,80,255,0.14) 0%, transparent 70%)",
          }}
        />
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
              EduAI · DIGT
            </span>
            <h1
              className="text-3xl font-display font-black tracking-tight mt-1"
              style={{
                color: VIOLET,
                textShadow: `0 0 32px ${VIOLET_GLOW}`,
              }}
            >
              DIGT ENGINE
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              Curriculum Extraction · Grade Vault · LEX_SVRN enforced
            </p>
          </div>
          <span
            className="font-mono text-[10px] px-3 py-1.5 rounded-xl shrink-0"
            style={{
              background: "rgba(0,220,130,0.10)",
              color: "oklch(0.72 0.17 155)",
              border: "1px solid rgba(0,220,130,0.22)",
            }}
            data-ocid="digt.status_badge"
          >
            ● DIGT ACTIVE
          </span>
        </div>
      </div>

      {/* Stat Row */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        data-ocid="digt.stats_section"
      >
        {digtLoading ? (
          ["sk-a", "sk-b", "sk-c", "sk-d"].map((k) => (
            <div key={k} className="glass-sm rounded-xl h-16" />
          ))
        ) : (
          <>
            <StatTile
              label="Total Inputs"
              value={digtStats?.totalInputs?.toString() ?? "0"}
              icon={BookOpen}
            />
            <StatTile
              label="Concepts Extracted"
              value={digtStats?.totalConcepts?.toString() ?? "0"}
              icon={Brain}
            />
            <StatTile
              label="Quiz Seeds"
              value={digtStats?.totalQuizSeeds?.toString() ?? "0"}
              icon={FlaskConical}
            />
            <StatTile
              label="Subjects Digested"
              value={digtStats?.subjectsDigested?.length ?? 0}
              icon={Zap}
            />
          </>
        )}
      </div>

      {/* GVLT Stats */}
      <div
        className="grid grid-cols-3 gap-3"
        data-ocid="digt.gvlt_stats_section"
      >
        {gvltLoading
          ? ["sk-a", "sk-b", "sk-c"].map((k) => (
              <div key={k} className="glass-sm rounded-xl h-14" />
            ))
          : [
              {
                label: "GVLT Entries",
                value: gvltStats?.totalEntries?.toString() ?? "0",
                color: VIOLET,
                bg: "rgba(140,80,255,0.08)",
                bdr: VIOLET_BORDER,
              },
              {
                label: "Blocked",
                value: gvltStats?.totalBlocked?.toString() ?? "0",
                color: "oklch(0.65 0.22 22)",
                bg: "rgba(255,80,80,0.08)",
                bdr: "rgba(255,80,80,0.20)",
              },
              {
                label: "Allowed",
                value: gvltStats?.totalAllowed?.toString() ?? "0",
                color: "oklch(0.72 0.17 155)",
                bg: "rgba(0,220,130,0.08)",
                bdr: "rgba(0,220,130,0.20)",
              },
            ].map(({ label, value, color, bg, bdr }) => (
              <div
                key={label}
                className="glass-sm rounded-xl p-3 text-center"
                style={{ border: `1px solid ${bdr}`, background: bg }}
              >
                <p className="text-lg font-display font-bold" style={{ color }}>
                  {value}
                </p>
                <p className="text-[11px] text-muted-foreground">{label}</p>
              </div>
            ))}
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="digest" className="w-full">
        <TabsList
          className="w-full grid grid-cols-3 glass-sm rounded-xl p-1"
          style={{ border: `1px solid ${VIOLET_BORDER}` }}
          data-ocid="digt.tabs"
        >
          <TabsTrigger value="digest" data-ocid="digt.digest_tab">
            Digest Textbook
          </TabsTrigger>
          <TabsTrigger value="vault" data-ocid="digt.vault_tab">
            Grade Vault Explorer
          </TabsTrigger>
          <TabsTrigger
            value="standards"
            className="text-xs font-mono"
            data-ocid="digt.standards_tab"
          >
            Standards
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: Digest */}
        <TabsContent value="digest" className="mt-4">
          <div
            className="glass-xl rounded-2xl p-6 space-y-5"
            style={{ border: `1px solid ${VIOLET_BORDER}` }}
          >
            <p className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">
              Upload Curriculum Material
            </p>

            <div className="space-y-1.5">
              <Label
                htmlFor="textbook-title"
                className="text-xs text-muted-foreground"
              >
                Textbook / Material Title
              </Label>
              <Input
                id="textbook-title"
                placeholder="e.g. Grade 5 Mathematics Chapter 3 — Fractions"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                data-ocid="digt.title_input"
                style={inputStyle}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label
                  htmlFor="grade-select"
                  className="text-xs text-muted-foreground"
                >
                  Grade Level
                </Label>
                <Select value={gradeLevel} onValueChange={setGradeLevel}>
                  <SelectTrigger
                    id="grade-select"
                    data-ocid="digt.grade_select"
                  >
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {GRADES.map((g) => (
                      <SelectItem key={g} value={String(g)}>
                        Grade {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="subject-select"
                  className="text-xs text-muted-foreground"
                >
                  Subject
                </Label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger
                    id="subject-select"
                    data-ocid="digt.subject_select"
                  >
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {SUBJECTS.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Dropzone-style textarea */}
            <div className="space-y-1.5">
              <Label
                htmlFor="raw-text"
                className="text-xs text-muted-foreground"
              >
                Paste Curriculum Text
              </Label>
              <Textarea
                id="raw-text"
                placeholder="Paste the full textbook chapter, curriculum document, or lesson material here. The DIGT engine will extract concepts, vocabulary, quiz seeds, and worked examples automatically."
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                className="min-h-40 font-mono text-sm resize-y rounded-xl"
                style={{
                  ...inputStyle,
                  border: `2px dashed ${VIOLET_BORDER}`,
                }}
                data-ocid="digt.rawtext_textarea"
              />
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 rounded-xl py-4 font-mono text-sm font-bold transition-smooth"
              onClick={handleDigest}
              disabled={digestMutation.isPending}
              data-ocid="digt.submit_button"
              style={{
                background: digestMutation.isPending
                  ? "rgba(140,80,255,0.10)"
                  : "rgba(140,80,255,0.20)",
                color: VIOLET,
                border: `1px solid ${VIOLET_BORDER}`,
                boxShadow: digestMutation.isPending
                  ? undefined
                  : `0 0 24px ${VIOLET_GLOW}`,
              }}
            >
              {digestMutation.isPending ? (
                <>
                  <span className="animate-pulse">⚡</span> DIGT engine
                  processing...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4" /> Digest with DIGT
                </>
              )}
            </button>

            {digestMutation.isPending && (
              <div
                className="glass-sm rounded-xl p-3 flex items-center gap-3"
                style={{ border: `1px solid ${VIOLET_BORDER}` }}
                data-ocid="digt.loading_state"
              >
                <div className="flex gap-1">
                  {[1, 2, 3, 5, 8].map((f) => (
                    <div
                      key={f}
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        background: VIOLET,
                        animation: "portal-pulse 1.4s ease-in-out infinite",
                        animationDelay: `${f * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground font-mono">
                  NRVE → MSRY → FLUX routing active — extracting concepts and
                  sealing to Grade Vault...
                </p>
              </div>
            )}

            {lastResult && !digestMutation.isPending && (
              <DigestResultCard result={lastResult} />
            )}
          </div>
        </TabsContent>

        {/* TAB 2: Grade Vault */}
        <TabsContent value="vault" className="mt-4">
          <div
            className="glass-xl rounded-2xl p-6"
            style={{ border: `1px solid ${VIOLET_BORDER}` }}
          >
            <GradeVaultExplorer />
          </div>
        </TabsContent>

        <TabsContent value="standards" className="mt-6">
          <div className="glass border border-emerald-500/30 rounded-xl p-6">
            <h3 className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-4">
              Standards Alignment
            </h3>
            <p className="text-white/50 text-sm mb-4">
              View which curriculum standards have been covered by digested
              textbook content.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((grade) => (
                <div
                  key={grade}
                  className="glass border border-white/10 rounded-lg p-3 cursor-pointer hover:border-emerald-500/40 transition-colors"
                >
                  <span className="text-white/40 text-xs font-mono">GRADE</span>
                  <p className="text-white font-bold text-lg">{grade}</p>
                  <span className="text-xs text-emerald-400/70">
                    View Standards →
                  </span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
