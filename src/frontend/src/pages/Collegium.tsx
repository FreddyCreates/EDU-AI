import EddiOrb from "@/components/EddiOrb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  useCourses,
  useEnrollInCourse,
  useUserAgents,
} from "@/hooks/use-university";
import type { Course } from "@/hooks/use-university";
import { useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  CheckCircle2,
  Loader2,
  Lock,
  Rocket,
  Sparkles,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Category badge helper ─────────────────────────────────────────────────

const _CATEGORY_STYLES: Record<string, { label: string; classes: string }> = {
  UIL_ACADEMIC: {
    label: "UIL Academic",
    classes: "border-sky-400/30 bg-sky-400/10 text-sky-300",
  },
  UIL_CTE: {
    label: "CTE",
    classes: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  },
  MUSIC: {
    label: "Music",
    classes: "border-violet-400/30 bg-violet-400/10 text-violet-300",
  },
  ATHLETICS: {
    label: "Athletics",
    classes: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  },
};

// ─── Filter tabs ────────────────────────────────────────────────────────────

const FILTER_TABS = [
  { key: "ALL", label: "All" },
  { key: "UIL_ACADEMIC", label: "UIL Academics" },
  { key: "UIL_CTE", label: "CTE" },
  { key: "MUSIC", label: "Music" },
  { key: "ATHLETICS", label: "Athletics" },
];

// ─── CourseCard ────────────────────────────────────────────────────────────────

interface CourseCardProps {
  course: Course;
  isEnrolled: boolean;
  enrollingId: string | null;
  onEnroll: (id: string) => void;
}

function CourseCard({
  course,
  isEnrolled,
  enrollingId,
  onEnroll,
}: CourseCardProps) {
  const isEnrolling = enrollingId === course.id;
  const handleEnroll = () => {
    if (course.locked || isEnrolled) return;
    onEnroll(course.id);
    toast.success(`Enrolling in ${course.title}…`);
  };

  return (
    <div
      data-ocid={`collegium.course_card.${course.order}`}
      className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4 hover:border-white/20 hover:-translate-y-0.5 transition-all duration-200"
    >
      {/* Order + status badge */}
      <div className="flex items-start justify-between gap-2">
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-foreground/30">
          Course {course.order.toString().padStart(2, "0")}
        </span>
        {course.locked ? (
          <Badge
            variant="outline"
            className="text-[10px] font-mono border-white/10 text-foreground/40 bg-white/5 gap-1"
          >
            <Lock className="h-2.5 w-2.5" />
            Locked · SSS≥{course.requiredSss}
          </Badge>
        ) : isEnrolled ? (
          <Badge
            variant="outline"
            className="text-[10px] font-mono border-emerald-500/30 bg-emerald-500/10 text-emerald-400 gap-1"
          >
            <CheckCircle2 className="h-2.5 w-2.5" />
            Enrolled
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="text-[10px] font-mono border-amber-400/30 bg-amber-400/10 text-amber-400"
          >
            Open
          </Badge>
        )}
      </div>

      {/* Title — gold gradient */}
      <h3
        className="font-display font-bold text-base leading-tight"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.86 0.18 85), oklch(0.78 0.22 60))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {course.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-foreground/60 leading-relaxed flex-1">
        {course.description}
      </p>

      {/* Modules badge + category */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-foreground/40 backdrop-blur-md bg-white/5 border border-white/10 rounded-full px-3 py-1">
          <BookOpen className="h-3 w-3" />
          {course.modules} modules
        </span>
      </div>

      {/* Enroll CTA — only for open, not-yet-enrolled */}
      {!course.locked && !isEnrolled && (
        <Button
          type="button"
          size="sm"
          onClick={handleEnroll}
          disabled={isEnrolling}
          data-ocid={`collegium.enroll_button.${course.order}`}
          className="w-full gap-2 font-bold border border-amber-400/30 bg-amber-400/10 text-amber-300 hover:bg-amber-400/20 transition-colors"
          variant="outline"
        >
          {isEnrolling ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Sparkles className="h-3.5 w-3.5" />
          )}
          {isEnrolling ? "Enrolling…" : "Enroll Now"}
        </Button>
      )}
    </div>
  );
}

// StepDots removed — replaced by CourseCard

// TrackCard removed — replaced by CourseCard

export default function Collegium() {
  const navigate = useNavigate();
  const { courses } = useCourses();
  const { enroll, enrollingId, enrolledIds } = useEnrollInCourse();
  const { agents } = useUserAgents();
  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  const filteredCourses =
    activeFilter === "ALL"
      ? courses
      : courses.filter((c) => c.category === activeFilter);

  const handleEnroll = async (courseId: string) => {
    await enroll(courseId);
    navigate({ to: `/collegium/${courseId}` });
  };

  const HOW_IT_WORKS = [
    {
      icon: <BookOpen className="h-5 w-5" />,
      step: "01",
      title: "Enroll",
      desc: "Choose a course and lock in your sovereign learning path. EDDI guides every module.",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      step: "02",
      title: "Build",
      desc: "Complete modules to raise your SSS score. Unlock locked courses as your intelligence compounds.",
    },
    {
      icon: <Rocket className="h-5 w-5" />,
      step: "03",
      title: "Deploy",
      desc: "Graduate with a sovereign agent sealed to your passport — yours forever, never rented.",
    },
  ];

  return (
    <div className="min-h-screen" data-ocid="collegium.page">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden border-b border-white/5"
        data-ocid="collegium.hero_section"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_oklch(0.86_0.18_85_/_0.06),_transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_oklch(0.55_0.25_280_/_0.05),_transparent_60%)]" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-20 sm:py-28 flex flex-col items-center text-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 backdrop-blur-md bg-white/5 border border-white/10 rounded-full px-4 py-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-amber-400">
              UNIVERSITAS-SOVEREIGN
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <EddiOrb mode="BUILD" size="lg" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h1
              className="font-display font-black text-4xl sm:text-6xl leading-tight"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.95 0.05 90), oklch(0.86 0.18 85), oklch(0.78 0.22 60))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Agent University
            </h1>
            <p className="text-foreground/60 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed">
              Build sovereign AI with EDDI as your guide
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex items-center gap-8"
          >
            {[
              { value: "8", label: "Courses" },
              { value: "PHI", label: "Gated" },
              { value: "∞", label: "Sovereign" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center gap-0.5">
                <span
                  className="font-display font-black text-2xl"
                  style={{ color: "oklch(0.86 0.18 85)" }}
                >
                  {value}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── COURSES ──────────────────────────────────────────────────────── */}
      <section
        className="relative py-16 sm:py-24"
        data-ocid="collegium.courses_section"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-2"
          >
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
              The Curriculum
            </h2>
            <p className="text-foreground/50 text-sm">
              8 PHI-gated courses. Each unlocks deeper intelligence.
            </p>
          </motion.div>

          <div className="space-y-6">
            {/* Filter tabs */}
            <div
              className="flex flex-wrap gap-2 justify-center"
              data-ocid="collegium.category_filter"
            >
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  data-ocid={`collegium.filter_tab.${tab.key.toLowerCase()}`}
                  onClick={() => setActiveFilter(tab.key)}
                  className={`px-4 py-1.5 rounded-full font-mono text-[11px] font-bold uppercase tracking-widest border transition-all duration-200 ${
                    activeFilter === tab.key
                      ? "border-amber-400/50 bg-amber-400/15 text-amber-300"
                      : "border-white/10 bg-white/5 text-foreground/40 hover:border-white/20 hover:text-foreground/60"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredCourses.map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  <CourseCard
                    course={course}
                    isEnrolled={enrolledIds.includes(course.id)}
                    enrollingId={enrollingId}
                    onEnroll={handleEnroll}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── YOUR AGENTS ──────────────────────────────────────────────────── */}
      <section
        className="relative py-16 border-t border-white/5"
        style={{ background: "oklch(0.12 0.02 280 / 0.5)" }}
        data-ocid="collegium.agents_section"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-2"
          >
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
              Your Agents
            </h2>
            <p className="text-foreground/50 text-sm">
              Agents you build are yours forever — sealed to your passport.
            </p>
          </motion.div>

          {agents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              data-ocid="collegium.agents_empty_state"
              className="flex flex-col items-center gap-5 py-14 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl"
            >
              <EddiOrb mode="BUILD" size="sm" />
              <div className="text-center space-y-1">
                <p className="text-foreground/60 text-sm font-medium">
                  Complete a course to build your first agent
                </p>
                <p className="text-foreground/30 text-xs font-mono">
                  EDDI will guide you through every module
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {agents.map(
                (
                  agent: { id: string; name: string; mode: string },
                  i: number,
                ) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    data-ocid={`collegium.agent_card.${i + 1}`}
                    className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2"
                  >
                    <p className="font-display font-bold text-foreground">
                      {agent.name}
                    </p>
                    <p className="text-xs font-mono text-foreground/40">
                      {agent.mode}
                    </p>
                  </motion.div>
                ),
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section
        className="relative py-16 sm:py-24 border-t border-white/5"
        data-ocid="collegium.how_it_works_section"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-2"
          >
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
              How It Works
            </h2>
            <p className="text-foreground/50 text-sm">
              Three sovereign steps from enrollment to deployment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {HOW_IT_WORKS.map(({ icon, step, title, desc }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                data-ocid={`collegium.how_step.${i + 1}`}
                className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center border border-amber-400/20 bg-amber-400/10 text-amber-400">
                    {icon}
                  </div>
                  <span className="font-mono text-xs font-bold text-foreground/30">
                    STEP {step}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-foreground">
                  {title}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer
        className="border-t border-white/5 py-10"
        style={{ background: "oklch(0.10 0.02 280 / 0.8)" }}
        data-ocid="collegium.footer"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="font-mono text-sm font-bold text-center sm:text-left"
            style={{ color: "oklch(0.86 0.18 85)" }}
          >
            All knowledge is sovereign. All agents are yours.
          </p>
          <p className="text-xs font-mono text-foreground/30">
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground/60 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
