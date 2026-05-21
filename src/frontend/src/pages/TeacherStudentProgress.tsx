import { MobileNav } from "@/components/layout/MobileNav";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdaptiveWorkflow } from "@/hooks/use-adaptive";
import { usePassportStats } from "@/hooks/use-passport";
import { useRecognitionTimeline } from "@/hooks/use-recognition";
import { useLocation } from "@tanstack/react-router";
import {
  Brain,
  CalendarDays,
  Clock,
  Database,
  Flame,
  Snowflake,
  TrendingUp,
  Wind,
  Zap,
} from "lucide-react";

const ADX_LEVELS = [
  { fib: 2n, label: "Foundational", barColor: "bg-sky-500" },
  { fib: 3n, label: "Standard", barColor: "bg-emerald-500" },
  { fib: 5n, label: "Accelerated", barColor: "bg-yellow-500" },
  { fib: 8n, label: "Advanced", barColor: "bg-orange-500" },
  { fib: 13n, label: "Sovereign", barColor: "bg-violet-500" },
] as const;

function fibLevelName(fib: bigint): string {
  if (fib <= 2n) return "Foundational";
  if (fib <= 3n) return "Standard";
  if (fib <= 5n) return "Accelerated";
  if (fib <= 8n) return "Advanced";
  return "Sovereign";
}

function MemoryZoneCard({
  label,
  seeds,
  icon: Icon,
  glowClass,
  borderClass,
}: {
  label: string;
  seeds: number;
  icon: React.ElementType;
  glowClass: string;
  borderClass: string;
}) {
  return (
    <div
      className={`rounded-2xl border ${borderClass} p-4 flex flex-col items-center gap-2 text-center`}
      style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(12px)" }}
    >
      <Icon className={`w-6 h-6 ${glowClass}`} />
      <p className={`text-2xl font-bold font-display ${glowClass}`}>{seeds}</p>
      <p className="text-xs text-muted-foreground uppercase tracking-widest">
        {label}
      </p>
      <p className="text-xs text-muted-foreground">seeds</p>
    </div>
  );
}

export default function TeacherStudentProgress() {
  const location = useLocation();

  const subjectId = "math";
  const gradeLevel = 9;

  const { workflow: adaptive, isLoading: adaptiveLoading } =
    useAdaptiveWorkflow(subjectId, String(gradeLevel));
  const { data: passportStats, isLoading: statsLoading } = usePassportStats();
  const { data: timeline = [], isLoading: timelineLoading } =
    useRecognitionTimeline(null);

  const workflow = adaptive;
  const currentFib = workflow?.fibDifficultyLevel ?? 5n;
  const levelName = fibLevelName(currentFib);
  const confidence = workflow ? Math.round(workflow.phiConfidence * 100) : 0;

  return (
    <div
      className="min-h-screen pb-24"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139,92,246,0.15) 0%, transparent 70%), #0a0614",
      }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-30 border-b border-violet-500/20"
        style={{
          background: "rgba(10,6,20,0.85)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="max-w-4xl mx-auto px-5 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center flex-shrink-0">
            <Brain className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-violet-100 font-display">
              Student Progress
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Adaptive Intelligence · Live Passport
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 py-6 space-y-8">
        {/* Adaptive Workflow */}
        <section data-ocid="adaptive.section">
          <h2 className="text-sm font-semibold text-violet-400 uppercase tracking-widest mb-4">
            Adaptive Workflow
          </h2>
          {adaptiveLoading && (
            <Skeleton
              className="h-52 rounded-2xl"
              data-ocid="adaptive.loading_state"
            />
          )}

          {!adaptiveLoading && workflow && (
            <div
              className="rounded-2xl border border-violet-500/30 p-5 space-y-5"
              style={{
                background: "rgba(139,92,246,0.08)",
                backdropFilter: "blur(16px)",
              }}
              data-ocid="adaptive.card"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Zap className="w-5 h-5 text-violet-300" />
                </div>
                <div>
                  <p className="text-xs text-violet-400 uppercase tracking-widest mb-1">
                    Next Action
                  </p>
                  <p className="text-base font-semibold text-violet-100">
                    {workflow.nextAction}
                  </p>
                </div>
              </div>

              <div
                className="rounded-xl border border-violet-500/20 px-4 py-3"
                style={{ background: "rgba(139,92,246,0.05)" }}
              >
                <p className="text-sm text-muted-foreground italic leading-relaxed">
                  “{workflow.reasonPhrase}”
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1.5">
                    PHI Confidence
                  </p>
                  <div className="relative h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet-600 to-violet-400 transition-all duration-700"
                      style={{ width: `${confidence}%` }}
                    />
                  </div>
                  <p className="text-xs text-violet-300 font-mono mt-1">
                    {confidence}%
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground mb-1">
                    Difficulty
                  </p>
                  <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30">
                    {levelName}
                  </Badge>
                </div>
              </div>

              {workflow.suggestedTopics &&
                workflow.suggestedTopics.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
                      Suggested Topics
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {workflow.suggestedTopics.map((topic) => (
                        <Badge
                          key={topic}
                          className="bg-violet-500/10 text-violet-300 border-violet-500/20 text-xs"
                        >
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          )}

          {!adaptiveLoading && !workflow && (
            <div
              className="rounded-2xl border border-violet-500/20 p-6 text-center"
              data-ocid="adaptive.empty_state"
            >
              <TrendingUp className="w-8 h-8 text-violet-500/50 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                No workflow data yet
              </p>
            </div>
          )}
        </section>

        {/* ADX Level Bar */}
        <section data-ocid="adx.section">
          <h2 className="text-sm font-semibold text-violet-400 uppercase tracking-widest mb-4">
            ADX Difficulty Level
          </h2>
          <div
            className="rounded-2xl border border-violet-500/20 p-5"
            style={{ background: "rgba(139,92,246,0.05)" }}
          >
            <div className="grid grid-cols-5 gap-2">
              {ADX_LEVELS.map((lvl) => {
                const isActive = currentFib === lvl.fib;
                return (
                  <div
                    key={lvl.label}
                    data-ocid={`adx.level.${lvl.label.toLowerCase()}`}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className={`w-full h-3 rounded-full transition-all duration-300 ${
                        isActive ? lvl.barColor : "bg-white/10"
                      }`}
                    />
                    <p
                      className={`text-[10px] text-center leading-tight transition-colors ${
                        isActive
                          ? "text-violet-200 font-semibold"
                          : "text-muted-foreground"
                      }`}
                    >
                      {lvl.label}
                    </p>
                    {isActive && (
                      <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30 text-[9px] px-1.5 py-0">
                        Active
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Passport Memory Zones */}
        <section data-ocid="passport.section">
          <h2 className="text-sm font-semibold text-violet-400 uppercase tracking-widest mb-4">
            Passport Memory Zones
          </h2>
          {statsLoading && (
            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
              data-ocid="passport.loading_state"
            >
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-28 rounded-2xl" />
              ))}
            </div>
          )}
          {!statsLoading && passportStats && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <MemoryZoneCard
                label="HOT"
                seeds={Number(passportStats.hotSeeds)}
                icon={Flame}
                glowClass="text-pink-400"
                borderClass="border-pink-500/30"
              />
              <MemoryZoneCard
                label="WARM"
                seeds={Number(passportStats.warmSeeds)}
                icon={Wind}
                glowClass="text-orange-400"
                borderClass="border-orange-500/30"
              />
              <MemoryZoneCard
                label="COLD"
                seeds={Number(passportStats.coldSeeds)}
                icon={Database}
                glowClass="text-sky-400"
                borderClass="border-sky-500/30"
              />
              <MemoryZoneCard
                label="FROZEN"
                seeds={Number(passportStats.frozenSeeds)}
                icon={Snowflake}
                glowClass="text-indigo-400"
                borderClass="border-indigo-500/30"
              />
            </div>
          )}
          {!statsLoading && !passportStats && (
            <div
              className="rounded-2xl border border-violet-500/20 p-6 text-center"
              data-ocid="passport.empty_state"
            >
              <Clock className="w-8 h-8 text-violet-500/50 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Passport not yet seeded
              </p>
            </div>
          )}
        </section>

        {/* RCGN Timeline */}
        <section data-ocid="rcgn.section">
          <h2 className="text-sm font-semibold text-violet-400 uppercase tracking-widest mb-4">
            Recognition Timeline
          </h2>
          {timelineLoading && (
            <div className="space-y-3" data-ocid="rcgn.loading_state">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 rounded-2xl" />
              ))}
            </div>
          )}
          {!timelineLoading && timeline.length === 0 && (
            <div
              className="rounded-2xl border border-violet-500/20 p-6 text-center"
              data-ocid="rcgn.empty_state"
            >
              <CalendarDays className="w-8 h-8 text-violet-500/50 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                No recognition events yet
              </p>
            </div>
          )}
          <div className="relative">
            {timeline.length > 0 && (
              <div className="absolute left-5 top-2 bottom-2 w-px bg-violet-500/20" />
            )}
            <div className="space-y-3">
              {timeline.map((event, i) => (
                <div
                  key={String(event.sealedAt)}
                  data-ocid={`rcgn.item.${i + 1}`}
                  className="relative flex items-start gap-4 pl-12"
                >
                  <div className="absolute left-3.5 w-3 h-3 rounded-full bg-violet-500 border-2 border-violet-300 mt-1.5 flex-shrink-0" />
                  <div
                    className="flex-1 rounded-2xl border border-violet-500/20 p-4"
                    style={{
                      background: "rgba(139,92,246,0.06)",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <Badge className="bg-violet-500/15 text-violet-300 border-violet-500/25 text-xs">
                        {event.achievementType ?? "Recognition"}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {event.sealedAt
                          ? new Date(
                              Number(event.sealedAt / 1_000_000n),
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "—"}
                      </span>
                    </div>
                    {event.description && (
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <MobileNav
        portal="teacher"
        isActive={(to: string) => location.pathname === to}
      />
    </div>
  );
}
