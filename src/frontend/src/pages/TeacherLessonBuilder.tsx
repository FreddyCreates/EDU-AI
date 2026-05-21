import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useClassesByTeacher } from "@/hooks/use-tchr";
import { useGradeVaultContents } from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Brain,
  Check,
  ChevronRight,
  Cpu,
  GripVertical,
  Hash,
  Layers,
  Plus,
  Save,
  Sparkles,
  Trash2,
  Wand2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const _PURPLE = "oklch(0.68 0.18 280)";
const DEMO_TEACHER_ID = "demo-teacher";

const FALLBACK_CONCEPTS = [
  { id: "c1", title: "Fibonacci Spirals", type: "lesson", seeds: 8 },
  { id: "c2", title: "Golden Ratio in Nature", type: "lesson", seeds: 5 },
  { id: "c3", title: "Quadratic Equations", type: "lesson", seeds: 13 },
  { id: "c4", title: "Quiz: Fibonacci Basics", type: "quiz", seeds: 3 },
  { id: "c5", title: "Exponential Growth", type: "lesson", seeds: 8 },
  { id: "c6", title: "Geometric Sequences", type: "lesson", seeds: 5 },
  { id: "c7", title: "Quiz: Sequences & Series", type: "quiz", seeds: 5 },
  { id: "c8", title: "PHI-based Design Patterns", type: "lesson", seeds: 8 },
  { id: "c9", title: "Number Theory Fundamentals", type: "lesson", seeds: 13 },
  { id: "c10", title: "Quiz: Number Theory", type: "quiz", seeds: 3 },
  { id: "c11", title: "Spirograph & Polar Coords", type: "lesson", seeds: 5 },
  { id: "c12", title: "Review: Golden Ratio Unit", type: "review", seeds: 8 },
];

const GRADE_OPTIONS = Array.from({ length: 12 }, (_, i) => String(i + 1));

interface CanvasItem {
  id: string;
  title: string;
  type: "lesson" | "quiz" | "review";
  seeds: number;
  order: number;
}

function typeColor(type: string) {
  if (type === "quiz")
    return "bg-amber-500/20 border-amber-500/30 text-amber-300";
  if (type === "review")
    return "bg-cyan-500/20 border-cyan-500/30 text-cyan-300";
  return "bg-violet-500/20 border-violet-500/30 text-violet-300";
}

function typeIcon(type: string) {
  if (type === "quiz") return Hash;
  if (type === "review") return Layers;
  return BookOpen;
}

export default function TeacherLessonBuilder() {
  const [grade, setGrade] = useState("7");
  const [selectedClassId, setSelectedClassId] = useState("");
  const [lessonTitle, setLessonTitle] = useState("");
  const [canvas, setCanvas] = useState<CanvasItem[]>([]);
  const [saving, setSaving] = useState(false);

  const { data: classes = [], isLoading: classesLoading } =
    useClassesByTeacher(DEMO_TEACHER_ID);
  const { data: vaultEntries = [], isLoading: vaultLoading } =
    useGradeVaultContents(BigInt(grade));

  const concepts =
    vaultEntries.length > 0
      ? vaultEntries.map((e, i) => ({
          id: e.entryId || String(i),
          title: e.summary || e.subject || `Entry ${i + 1}`,
          type: (e.contentType === "quiz" || e.contentType === "review"
            ? e.contentType
            : "lesson") as "lesson" | "quiz" | "review",
          seeds: 5,
        }))
      : FALLBACK_CONCEPTS;

  function addToCanvas(concept: (typeof concepts)[number]) {
    if (canvas.find((c) => c.id === concept.id)) return;
    const item: CanvasItem = {
      id: concept.id,
      title: concept.title,
      type: concept.type as CanvasItem["type"],
      seeds: concept.seeds,
      order: 0,
    };
    setCanvas((prev) => [...prev, { ...item, order: prev.length + 1 }]);
  }

  function removeFromCanvas(id: string) {
    setCanvas((prev) =>
      prev.filter((c) => c.id !== id).map((c, i) => ({ ...c, order: i + 1 })),
    );
  }

  function moveUp(idx: number) {
    if (idx === 0) return;
    setCanvas((prev) => {
      const next = [...prev];
      [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
      return next.map((c, i) => ({ ...c, order: i + 1 }));
    });
  }

  function moveDown(idx: number) {
    if (idx === canvas.length - 1) return;
    setCanvas((prev) => {
      const next = [...prev];
      [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
      return next.map((c, i) => ({ ...c, order: i + 1 }));
    });
  }

  function handleSave() {
    if (!lessonTitle) {
      toast.error("Lesson title required");
      return;
    }
    if (canvas.length === 0) {
      toast.error("Add at least one concept to the canvas");
      return;
    }
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Lesson plan sealed to Grade Vault", {
        description: `${canvas.length} concepts · ${canvas.reduce((a, c) => a + c.seeds, 0)} seeds compressed by DIGT engine`,
      });
      setCanvas([]);
      setLessonTitle("");
    }, 1800);
  }

  const totalSeeds = canvas.reduce((a, c) => a + c.seeds, 0);
  const quizCount = canvas.filter((c) => c.type === "quiz").length;

  return (
    <div className="portal-enter min-h-screen" data-ocid="lesson_builder.page">
      {/* OS Header */}
      <div
        className="glass-portal-teacher glass-shimmer sticky top-0 z-30"
        style={{ borderBottom: "1px solid rgba(160,100,255,0.18)" }}
      >
        <div className="mx-auto max-w-[1600px] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="flex items-center gap-2.5 rounded-xl px-4 py-2"
              style={{
                background:
                  "linear-gradient(135deg, rgba(160,100,255,0.22) 0%, rgba(100,60,180,0.15) 100%)",
                border: "1px solid rgba(160,100,255,0.35)",
              }}
            >
              <Wand2 className="h-4 w-4 text-violet-300" />
              <span
                className="font-display font-bold text-sm text-violet-200"
                style={{ letterSpacing: "0.18em" }}
              >
                LESSON BUILDER
              </span>
            </div>
            <div>
              <p className="font-display font-semibold text-foreground text-base leading-none">
                DIGT Engine · Fibonacci-Structured Lesson Plans
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Concept Picker → Lesson Canvas → Grade Vault Seal
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="glass-sm rounded-lg px-3 py-1.5 flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-violet-400" />
              <span className="text-xs font-mono text-foreground">
                {canvas.length} in canvas
              </span>
            </div>
            <div className="glass-sm rounded-lg px-3 py-1.5 flex items-center gap-2">
              <Cpu className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-xs font-mono text-foreground">
                DIGT Online
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Three-column layout */}
      <div className="mx-auto max-w-[1600px] px-6 py-6">
        <div className="grid grid-cols-12 gap-5 h-[calc(100vh-120px)]">
          {/* COL 1 — Concept Picker */}
          <div
            className="col-span-4 flex flex-col gap-4"
            data-ocid="lesson_builder.concept_picker"
          >
            <div className="glass-portal-teacher rounded-2xl p-5 flex flex-col flex-1 min-h-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg glass-sm">
                    <Brain className="h-4 w-4 text-violet-400" />
                  </div>
                  <span className="font-display font-semibold text-sm text-foreground">
                    Concept Picker
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-mono">
                    Grade
                  </span>
                  <Select value={grade} onValueChange={setGrade}>
                    <SelectTrigger
                      data-ocid="lesson_builder.grade_select"
                      className="glass-sm border-0 h-8 w-20 text-xs"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-xl border-0">
                      {GRADE_OPTIONS.map((g) => (
                        <SelectItem key={g} value={g} className="text-xs">
                          Gr. {g}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <ScrollArea className="flex-1">
                <div className="space-y-2 pr-2">
                  {vaultLoading
                    ? [1, 2, 3, 4].map((k) => (
                        <Skeleton key={k} className="h-14 rounded-xl" />
                      ))
                    : concepts.map((concept, idx) => {
                        const TypeIcon = typeIcon(concept.type);
                        const alreadyAdded = canvas.some(
                          (c) => c.id === concept.id,
                        );
                        return (
                          <motion.button
                            key={concept.id}
                            type="button"
                            data-ocid={`lesson_builder.concept.${idx + 1}`}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.03 }}
                            onClick={() => addToCanvas(concept)}
                            disabled={alreadyAdded}
                            className={cn(
                              "w-full text-left rounded-xl p-3.5 transition-smooth group",
                              alreadyAdded
                                ? "opacity-40 cursor-not-allowed glass-sm"
                                : "glass-sm hover:glass-portal-teacher cursor-pointer",
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
                                style={{
                                  background: "rgba(160,100,255,0.12)",
                                  border: "1px solid rgba(160,100,255,0.25)",
                                }}
                              >
                                {alreadyAdded ? (
                                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                                ) : (
                                  <TypeIcon className="h-3.5 w-3.5 text-violet-400" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">
                                  {concept.title}
                                </p>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <Badge
                                    className={cn(
                                      "text-xs border px-1.5 py-0",
                                      typeColor(concept.type),
                                    )}
                                  >
                                    {concept.type}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground font-mono">
                                    {concept.seeds} seeds
                                  </span>
                                </div>
                              </div>
                              {!alreadyAdded && (
                                <Plus className="h-4 w-4 text-muted-foreground group-hover:text-violet-300 transition-colors shrink-0" />
                              )}
                            </div>
                          </motion.button>
                        );
                      })}
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* COL 2 — Lesson Canvas */}
          <div
            className="col-span-5 flex flex-col gap-4"
            data-ocid="lesson_builder.canvas"
          >
            <div className="glass-portal-teacher rounded-2xl p-5 flex flex-col flex-1 min-h-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg glass-sm">
                    <Layers className="h-4 w-4 text-violet-400" />
                  </div>
                  <span className="font-display font-semibold text-sm text-foreground">
                    Lesson Canvas
                  </span>
                  {canvas.length > 0 && (
                    <Badge
                      className="font-mono text-xs border"
                      style={{
                        background: "rgba(160,100,255,0.18)",
                        borderColor: "rgba(160,100,255,0.35)",
                        color: "rgba(200,160,255,0.9)",
                      }}
                    >
                      {canvas.length} concepts
                    </Badge>
                  )}
                </div>
                {canvas.length > 0 && (
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="font-mono">{totalSeeds} seeds</span>
                    <span>·</span>
                    <span>
                      {quizCount} quiz{quizCount !== 1 ? "zes" : ""}
                    </span>
                  </div>
                )}
              </div>

              <ScrollArea className="flex-1">
                <div className="space-y-2 pr-2">
                  <AnimatePresence>
                    {canvas.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="glass-sm rounded-xl flex flex-col items-center justify-center gap-3 py-16 text-center"
                        style={{ border: "1px dashed rgba(160,100,255,0.25)" }}
                        data-ocid="lesson_builder.canvas_empty_state"
                      >
                        <Layers className="h-10 w-10 text-violet-400/30" />
                        <p className="text-sm text-muted-foreground">
                          Click concepts from the picker to add them here
                        </p>
                        <p className="text-xs text-muted-foreground/60">
                          Drag to reorder · lessons and quizzes auto-sequenced
                        </p>
                      </motion.div>
                    ) : (
                      canvas.map((item, idx) => {
                        const TypeIcon = typeIcon(item.type);
                        return (
                          <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: 20, height: 0 }}
                            transition={{ duration: 0.2 }}
                            data-ocid={`lesson_builder.canvas_item.${idx + 1}`}
                            className="glass-sm rounded-xl p-3.5 flex items-center gap-3 group hover:glass-portal-teacher transition-smooth"
                          >
                            {/* Order badge */}
                            <div
                              className="h-7 w-7 rounded-lg flex items-center justify-center shrink-0 font-mono text-xs font-bold"
                              style={{
                                background: "rgba(160,100,255,0.15)",
                                border: "1px solid rgba(160,100,255,0.3)",
                                color: "rgba(200,160,255,0.9)",
                              }}
                            >
                              {item.order}
                            </div>
                            <div
                              className="h-7 w-7 rounded-lg flex items-center justify-center shrink-0"
                              style={{
                                background: "rgba(160,100,255,0.1)",
                                border: "1px solid rgba(160,100,255,0.2)",
                              }}
                            >
                              <TypeIcon className="h-3.5 w-3.5 text-violet-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">
                                {item.title}
                              </p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <Badge
                                  className={cn(
                                    "text-xs border px-1.5 py-0",
                                    typeColor(item.type),
                                  )}
                                >
                                  {item.type}
                                </Badge>
                                <span className="text-xs text-muted-foreground font-mono">
                                  {item.seeds} seeds
                                </span>
                              </div>
                            </div>
                            {/* Reorder buttons */}
                            <div className="flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                              <button
                                type="button"
                                onClick={() => moveUp(idx)}
                                disabled={idx === 0}
                                className="glass-sm rounded p-0.5 hover:glass-portal-teacher transition-smooth disabled:opacity-30"
                                aria-label="Move up"
                              >
                                <ChevronRight className="h-3 w-3 text-violet-300 -rotate-90" />
                              </button>
                              <button
                                type="button"
                                onClick={() => moveDown(idx)}
                                disabled={idx === canvas.length - 1}
                                className="glass-sm rounded p-0.5 hover:glass-portal-teacher transition-smooth disabled:opacity-30"
                                aria-label="Move down"
                              >
                                <ChevronRight className="h-3 w-3 text-violet-300 rotate-90" />
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFromCanvas(item.id)}
                              data-ocid={`lesson_builder.remove_button.${idx + 1}`}
                              className="opacity-0 group-hover:opacity-100 glass-sm rounded-lg p-1.5 hover:bg-red-500/20 transition-smooth shrink-0"
                              aria-label={`Remove ${item.title}`}
                            >
                              <X className="h-3.5 w-3.5 text-red-400" />
                            </button>
                          </motion.div>
                        );
                      })
                    )}
                  </AnimatePresence>
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* COL 3 — Settings Panel */}
          <div
            className="col-span-3 flex flex-col gap-4"
            data-ocid="lesson_builder.settings_panel"
          >
            <div className="glass-portal-teacher rounded-2xl p-5 space-y-5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg glass-sm">
                  <Save className="h-4 w-4 text-violet-400" />
                </div>
                <span className="font-display font-semibold text-sm text-foreground">
                  Settings
                </span>
              </div>

              {/* Lesson title */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="lesson-title"
                  className="text-xs text-muted-foreground"
                >
                  Lesson Title
                </Label>
                <Input
                  id="lesson-title"
                  data-ocid="lesson_builder.title_input"
                  value={lessonTitle}
                  onChange={(e) => setLessonTitle(e.target.value)}
                  placeholder="Introduction to Fibonacci Spirals..."
                  className="glass-sm border-0 text-sm"
                />
              </div>

              {/* Class selector */}
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">
                  Assign to Class
                </Label>
                <Select
                  value={selectedClassId}
                  onValueChange={setSelectedClassId}
                >
                  <SelectTrigger
                    data-ocid="lesson_builder.class_select"
                    className="glass-sm border-0 text-sm"
                  >
                    <SelectValue placeholder="Select class..." />
                  </SelectTrigger>
                  <SelectContent className="glass-xl border-0">
                    {classesLoading ? (
                      <SelectItem value="loading" disabled>
                        Loading classes...
                      </SelectItem>
                    ) : classes.length === 0 ? (
                      <SelectItem value="none" disabled>
                        No classes found
                      </SelectItem>
                    ) : (
                      classes.map((cls) => (
                        <SelectItem key={cls.id} value={cls.id}>
                          {cls.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Canvas summary */}
              {canvas.length > 0 && (
                <div
                  className="glass-sm rounded-xl p-4 space-y-3"
                  style={{ border: "1px solid rgba(160,100,255,0.2)" }}
                >
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Canvas Summary
                  </p>
                  <div className="space-y-2">
                    {["lesson", "quiz", "review"].map((type) => {
                      const count = canvas.filter(
                        (c) => c.type === type,
                      ).length;
                      if (count === 0) return null;
                      const TypeIcon = typeIcon(type);
                      return (
                        <div
                          key={type}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <TypeIcon className="h-3.5 w-3.5 text-violet-400" />
                            <span className="text-xs capitalize text-muted-foreground">
                              {type}s
                            </span>
                          </div>
                          <Badge
                            className={cn(
                              "text-xs border px-2",
                              typeColor(type),
                            )}
                          >
                            {count}
                          </Badge>
                        </div>
                      );
                    })}
                    <div
                      className="pt-2 mt-2 border-t flex items-center justify-between"
                      style={{ borderTopColor: "rgba(160,100,255,0.15)" }}
                    >
                      <span className="text-xs text-muted-foreground">
                        Total seeds
                      </span>
                      <span className="text-xs font-mono font-bold text-violet-300">
                        {totalSeeds}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* DIGT stats */}
              <div
                className="glass-sm rounded-xl p-3 flex items-center gap-2.5"
                style={{ border: "1px solid rgba(160,100,255,0.15)" }}
              >
                <Cpu className="h-4 w-4 text-violet-400 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    DIGT Engine
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Fibonacci-indexed · grade-gated
                  </p>
                </div>
                <div className="ml-auto">
                  <span className="relative inline-flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 bg-violet-400" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-400" />
                  </span>
                </div>
              </div>

              {/* Save button */}
              <Button
                type="button"
                data-ocid="lesson_builder.save_button"
                onClick={handleSave}
                disabled={saving || canvas.length === 0 || !lessonTitle}
                className="w-full gap-2"
                style={{
                  background: saving
                    ? "rgba(160,100,255,0.3)"
                    : "linear-gradient(135deg, oklch(0.62 0.22 280), oklch(0.48 0.22 280))",
                  border: "1px solid rgba(160,100,255,0.4)",
                  boxShadow: saving
                    ? "none"
                    : "0 0 16px rgba(160,100,255,0.25)",
                }}
              >
                {saving ? (
                  <>
                    <Cpu className="h-4 w-4 animate-spin" />
                    Sealing to Vault...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Seal Lesson Plan
                  </>
                )}
              </Button>

              {canvas.length === 0 && (
                <p className="text-xs text-muted-foreground text-center">
                  Add concepts to the canvas to enable saving
                </p>
              )}
            </div>

            {/* Quick tip card */}
            <div
              className="glass-sm rounded-xl p-4 space-y-2"
              style={{ border: "1px solid rgba(160,100,255,0.15)" }}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-violet-400" />
                <span className="text-xs font-semibold text-foreground">
                  PHI Sequencing
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Optimal lesson flow follows Fibonacci ratios: 3 lessons → 1 quiz
                → 2 lessons → 1 review. DIGT auto-detects this pattern.
              </p>
              <div className="flex items-center gap-1.5">
                <GripVertical className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Hover items to reorder
                </span>
              </div>
              {canvas.length >= 3 && quizCount === 0 && (
                <div className="glass-sm rounded-lg px-2.5 py-2 flex items-center gap-2">
                  <Trash2 className="h-3 w-3 text-amber-400" />
                  <span className="text-xs text-amber-300">
                    DIGT recommends adding a quiz
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
