import { createActor } from "@/backend";
import type { VisionStats } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  BrainCircuit,
  Building2,
  ChevronRight,
  GraduationCap,
  Lock,
  Medal,
  ScrollText,
  Shield,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

function useVisionStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<VisionStats>({
    queryKey: ["vision-stats"],
    queryFn: async () => {
      if (!actor)
        return {
          totalStudentsFlagged: 0n,
          achievementsSealed: 0n,
          nominationsSent: 0n,
        };
      return actor.getVisionStats();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 21000,
  });
}

const PORTAL_CARDS = [
  {
    key: "student",
    label: "Student Portal",
    desc: "Adaptive AI study companion, passport tracking, and personalized learning from K–12.",
    icon: GraduationCap,
    color: "oklch(0.78 0.22 200)",
    glassClass: "glass-portal-student",
    badge: "Mobile PWA",
    to: "/dashboard",
  },
  {
    key: "teacher",
    label: "Teacher Portal",
    desc: "Live class insights, AI lesson builder, grade vault, and adaptive recommendations.",
    icon: Users,
    color: "oklch(0.68 0.18 280)",
    glassClass: "glass-portal-teacher",
    badge: "Mobile PWA",
    to: "/teacher",
  },
  {
    key: "principal",
    label: "Principal Portal",
    desc: "School-wide live heatmap, grade drill-down, staff overview, and analytics.",
    icon: Building2,
    color: "oklch(0.75 0.16 70)",
    glassClass: "glass-portal-principal",
    badge: "Desktop + Mobile",
    to: "/principal",
  },
  {
    key: "it",
    label: "IT / Security Portal",
    desc: "Network monitoring, audit logs, APIX gateway, and engine health monitoring.",
    icon: Shield,
    color: "oklch(0.72 0.17 155)",
    glassClass: "glass-portal-it",
    badge: "Desktop + Mobile",
    to: "/it/portal",
  },
];

const FEATURES = [
  {
    icon: Lock,
    title: "100% Sovereign",
    desc: "No external AI, no cloud dependencies. All intelligence lives inside the platform.",
  },
  {
    icon: BrainCircuit,
    title: "PHI-Geometric Engines",
    desc: "Every reasoning chain, memory weight, and mastery score runs on Fibonacci mathematics.",
  },
  {
    icon: ScrollText,
    title: "Student Passport",
    desc: "A permanent record that follows each student from kindergarten through graduation.",
  },
  {
    icon: Medal,
    title: "RCGN — Recognition Engine",
    desc: "Surfaces exceptional performance automatically. No kid gets missed because a teacher didn't notice.",
  },
  {
    icon: BookOpen,
    title: "Textbook Digester",
    desc: "Feed in full curriculum text — DIGT auto-generates concepts, quizzes, and grade-gated vaults.",
  },
  {
    icon: Zap,
    title: "AUTON Autonomous Engine",
    desc: "Self-seeds new knowledge every 21 cycles without a student prompt. The system thinks on its own.",
  },
];

function StatCard({
  value,
  label,
  color,
}: {
  value: bigint | undefined;
  label: string;
  color: string;
}) {
  return (
    <div className="glass rounded-2xl px-4 py-5 flex flex-col items-center gap-1 animate-metric-breathe">
      <span className="font-display font-black text-3xl" style={{ color }}>
        {value !== undefined ? Number(value).toLocaleString() : "—"}
      </span>
      <span className="text-xs text-muted-foreground text-center leading-tight">
        {label}
      </span>
    </div>
  );
}

export default function Landing() {
  const { login } = useInternetIdentity();
  const { data: stats, isLoading: statsLoading } = useVisionStats();

  return (
    <div className="min-h-screen bg-background">
      {/* ── Top Nav ── */}
      <header className="sticky top-0 z-50 glass-max border-b border-white/5">
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link
            to="/"
            data-ocid="landing.brand_link"
            className="flex items-center gap-2.5"
          >
            <div className="h-8 w-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
              <GraduationCap className="h-4 w-4 text-primary" />
            </div>
            <span className="font-display font-extrabold text-lg tracking-tight">
              Edu<span className="text-primary">AI</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#mission"
              data-ocid="landing.mission_link"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Mission
            </a>
            <a
              href="#portals"
              data-ocid="landing.portals_link"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Portals
            </a>
            <Link
              to="/vision"
              data-ocid="landing.vision_link"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Vision
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="ghost"
              size="sm"
              data-ocid="landing.demo_button"
            >
              <Link to="/demo">Try Demo</Link>
            </Button>
            <Button
              size="sm"
              data-ocid="landing.signin_button"
              onClick={() => login()}
              type="button"
            >
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "88vh" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('/assets/generated/eduai-hero.dim_1400x700.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
        <div className="relative z-10 max-w-5xl mx-auto px-5 pt-24 pb-16 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Badge className="mb-6 glass-sm border-primary/30 text-primary px-4 py-1 text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="h-3 w-3 mr-1.5" />
              Sovereign AI Education Platform
            </Badge>
            <h1 className="font-display font-black text-5xl md:text-7xl leading-none tracking-tight text-foreground mb-6">
              Every child deserves <span className="text-primary">an AI</span>{" "}
              that sees them.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              EduAI is a fully sovereign, non-commercial intelligence platform
              for K–12. Built on Fibonacci mathematics. Owned by schools.
              Follows every student from kindergarten through graduation — for
              free, forever.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
              <Button
                size="lg"
                asChild
                data-ocid="landing.hero_demo_button"
                className="h-12 px-8 text-base font-semibold"
              >
                <Link to="/demo">
                  Try the Demo
                  <ChevronRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                data-ocid="landing.hero_signin_button"
                onClick={() => login()}
                type="button"
                className="h-12 px-8 text-base"
              >
                Sign In to Your Portal
              </Button>
            </div>
          </motion.div>

          {/* Live stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 grid grid-cols-3 gap-4 w-full max-w-lg"
            data-ocid="landing.stats_section"
          >
            {statsLoading ? (
              [
                <Skeleton key="skeleton-stat-a" className="h-20 rounded-2xl" />,
                <Skeleton key="skeleton-stat-b" className="h-20 rounded-2xl" />,
                <Skeleton key="skeleton-stat-c" className="h-20 rounded-2xl" />,
              ]
            ) : (
              <>
                <StatCard
                  value={stats?.totalStudentsFlagged}
                  label="Students Flagged"
                  color="oklch(0.78 0.22 200)"
                />
                <StatCard
                  value={stats?.nominationsSent}
                  label="Nominations Sent"
                  color="oklch(0.75 0.16 70)"
                />
                <StatCard
                  value={stats?.achievementsSealed}
                  label="Achievements Sealed"
                  color="oklch(0.68 0.18 280)"
                />
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Founding Story ── */}
      <section id="mission" className="py-24 bg-muted/20">
        <div className="max-w-4xl mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-4 w-4 text-accent" />
              <span className="text-xs uppercase tracking-widest text-accent font-semibold">
                Founding Story
              </span>
            </div>
            <h2 className="font-display font-black text-4xl md:text-5xl text-foreground mb-8 leading-tight">
              Alfredo Medina Hernandez
              <br />
              <span className="text-primary">Ferris High School, Texas.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass rounded-2xl p-6 space-y-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    National Recognition
                  </p>
                  <p className="text-xs text-muted-foreground">
                    NSHSS — National Society of High School Scholars
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Alfredo grew up in public schools — the forgotten ones, the ones
                without funding. He attended J.P. Starks Magnet School in
                Dallas, then Ferris High School in a district that ranked bottom
                50% statewide for math.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                He scored{" "}
                <span className="text-foreground font-semibold">
                  100 in geometry
                </span>{" "}
                two years in a row. His math teacher quietly submitted his name
                to a national program. A packet arrived. Everything was paid for
                — flights, hotel, the convention in Orlando. His name appeared
                in a national yearbook alongside ~10,000 students from every
                state.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                He never knew it was happening until it happened. One teacher.
                No system.{" "}
                <span className="text-foreground font-semibold">
                  Just luck.
                </span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="glass rounded-2xl p-6">
                <p className="font-display font-bold text-lg text-foreground mb-3">
                  The Gap
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Alfredo was completing lessons in 20 minutes while the class
                  ran at a 90-minute pace. The system read that as rebellion. He
                  spent days in ISS — and completed all his work anyway. The
                  system had no escalation path for a student who finishes
                  everything.
                </p>
              </div>
              <div className="glass rounded-2xl p-6">
                <p className="font-display font-bold text-lg text-foreground mb-3">
                  The Mission
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  EduAI is the system that makes recognition{" "}
                  <span className="text-primary font-semibold">automatic</span>,
                  not accidental. The next kid from a forgotten school — Ferris,
                  or anywhere like it — gets seen on day one. Not because a
                  teacher remembered to submit a form. Because the platform
                  already noticed.
                </p>
              </div>
              <div className="glass rounded-2xl p-5 border border-primary/20">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">
                  Scholarship offers received
                </p>
                <div className="flex flex-wrap gap-2">
                  {["UTA — Full Ride", "King's College NY", "Baylor $60K"].map(
                    (s) => (
                      <Badge
                        key={s}
                        variant="secondary"
                        className="text-xs glass-sm"
                      >
                        {s}
                      </Badge>
                    ),
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 glass-lg rounded-2xl p-6 border border-primary/15 text-center"
          >
            <p className="text-base md:text-lg text-foreground font-medium leading-relaxed max-w-3xl mx-auto">
              "I just wanna win. I just wanna know what it's like to be one of
              the greats. But more than that —{" "}
              <span className="text-primary font-bold">
                I want every kid from everywhere to have the chance I almost
                didn't.
              </span>
              "
            </p>
            <p className="text-xs text-muted-foreground mt-3 uppercase tracking-widest">
              — Alfredo Medina Hernandez, Founder of EduAI
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 bg-background">
        <div className="max-w-5xl mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-display font-black text-4xl text-foreground mb-4">
              Platform Intelligence
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything sovereign. Everything native. Nothing rented.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="glass rounded-2xl p-5 hover:border-primary/20 transition-smooth glass-shimmer"
                >
                  <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <p className="font-semibold text-foreground text-sm mb-2">
                    {f.title}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {f.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Four Portals ── */}
      <section id="portals" className="py-24 bg-muted/20">
        <div className="max-w-5xl mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-display font-black text-4xl text-foreground mb-4">
              Four Sovereign Portals
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Each role gets its own purpose-built interface, AI persona, and
              data access level.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-5">
            {PORTAL_CARDS.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.key}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  data-ocid={`landing.portal_card.${i + 1}`}
                >
                  <Link
                    to={p.to as never}
                    className={`block rounded-2xl p-6 ${p.glassClass} hover:scale-[1.02] transition-smooth`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="h-10 w-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: `${p.color.replace("oklch(", "oklch(").replace(")", " / 0.12)")}`,
                          border: `1px solid ${p.color.replace(")", " / 0.3)")}`,
                        }}
                      >
                        <Icon className="h-5 w-5" style={{ color: p.color }} />
                      </div>
                      <Badge
                        variant="secondary"
                        className="text-[10px] glass-sm"
                      >
                        {p.badge}
                      </Badge>
                    </div>
                    <p className="font-display font-bold text-lg text-foreground mb-2">
                      {p.label}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {p.desc}
                    </p>
                    <div
                      className="mt-4 flex items-center gap-1 text-xs font-medium"
                      style={{ color: p.color }}
                    >
                      Enter Portal <ChevronRight className="h-3 w-3" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Vision CTA ── */}
      <section className="py-24 bg-background">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass-lg rounded-3xl p-10 border border-primary/15">
              <Sparkles className="h-8 w-8 text-primary mx-auto mb-5" />
              <h2 className="font-display font-black text-3xl text-foreground mb-4">
                Read the Sovereign Vision
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                The founding story, the technical architecture, the impact case,
                and the funding strategy — all generated by EduAI's own
                intelligence engines.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" asChild data-ocid="landing.vision_cta_button">
                  <Link to="/vision">
                    Read the Vision <ChevronRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  data-ocid="landing.demo_cta_button"
                >
                  <Link to="/demo">Try Demo First</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 glass-xl py-8">
        <div className="max-w-5xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
              <GraduationCap className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="font-display font-bold text-sm">
              Edu<span className="text-primary">AI</span>
            </span>
            <span className="text-xs text-muted-foreground ml-2">
              Sovereign Platform — LEX_SOVEREIGNUS enforced
            </span>
          </div>
          <p className="text-xs text-muted-foreground/50 text-center">
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              className="hover:text-muted-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
