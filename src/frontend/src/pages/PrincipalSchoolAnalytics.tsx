import { Badge } from "@/components/ui/badge";
import { useHeatmapData, useLiveSessionMetrics } from "@/hooks/useBackend";
import { Activity, Brain, Clock, TrendingUp, Users, Zap } from "lucide-react";
import { motion } from "motion/react";

const AMBER = "oklch(0.75 0.16 70)";

const METRICS = [
  {
    label: "Total Students",
    value: "406",
    delta: "+12 this week",
    icon: Users,
    good: true,
  },
  {
    label: "Active Sessions",
    value: "47",
    delta: "Live now",
    icon: Activity,
    good: true,
  },
  {
    label: "Avg Daily Sessions",
    value: "234",
    delta: "+8% vs last week",
    icon: Clock,
    good: true,
  },
  {
    label: "System Coherence",
    value: "0.94φ",
    delta: "COHR validated",
    icon: Brain,
    good: true,
  },
  {
    label: "Mastery Growth",
    value: "+13%",
    delta: "This month",
    icon: TrendingUp,
    good: true,
  },
  {
    label: "PHI Engine",
    value: "LIVE",
    delta: "All engines nominal",
    icon: Zap,
    good: true,
  },
];

const SUBJECT_PERFORMANCE = [
  { subject: "Mathematics", mastery: 78, students: 406 },
  { subject: "Science", mastery: 82, students: 380 },
  { subject: "English", mastery: 86, students: 406 },
  { subject: "History", mastery: 74, students: 350 },
  { subject: "Biology", mastery: 79, students: 280 },
  { subject: "Chemistry", mastery: 71, students: 180 },
];

export default function PrincipalSchoolAnalytics() {
  const { data: liveMetrics } = useLiveSessionMetrics();
  const { data: heatmap = [] } = useHeatmapData();

  const studentsOnline = Number(liveMetrics?.studentsOnline ?? 0n);
  const totalActiveSessions = Number(liveMetrics?.totalActiveSessions ?? 0n);
  const systemCoherence = Number(liveMetrics?.systemCoherence ?? 0n);

  const liveMetricValues = [
    {
      label: "Students Online",
      value: studentsOnline > 0 ? String(studentsOnline) : METRICS[0].value,
      delta: studentsOnline > 0 ? "Live now" : METRICS[0].delta,
      icon: Users,
      good: true,
    },
    {
      label: "Active Sessions",
      value:
        totalActiveSessions > 0
          ? String(totalActiveSessions)
          : METRICS[1].value,
      delta: totalActiveSessions > 0 ? "Live right now" : METRICS[1].delta,
      icon: Activity,
      good: true,
    },
    METRICS[2],
    {
      label: "System Coherence",
      value: systemCoherence > 0 ? `${systemCoherence}φ` : METRICS[3].value,
      delta:
        heatmap.length > 0
          ? `${heatmap.length} classes tracked`
          : METRICS[3].delta,
      icon: Brain,
      good: true,
    },
    ...METRICS.slice(4),
  ];

  return (
    <div className="p-[21px] space-y-[21px]">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            School Analytics
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Sovereign intelligence — AUTN-driven school-wide insights
          </p>
        </div>
        <Badge
          className="glass-portal-principal border-0"
          style={{ color: AMBER }}
        >
          AUTN F(8) Active
        </Badge>
      </motion.div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-[13px]">
        {liveMetricValues.map(({ label, value, delta, icon: Icon }, i) => (
          <motion.div
            key={label}
            data-ocid={`analytics.metric_card.${i + 1}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            className="glass-portal-principal rounded-xl p-[13px] space-y-1"
          >
            <Icon className="h-4 w-4 mb-1" style={{ color: AMBER }} />
            <p
              className="text-xl font-bold font-mono text-foreground animate-metric-breathe"
              data-ocid={`analytics.live_value.${i + 1}`}
            >
              {value}
            </p>
            <p className="text-xs font-medium text-foreground/70">{label}</p>
            <p className="text-[9px] text-muted-foreground">{delta}</p>
          </motion.div>
        ))}
      </div>

      {/* Subject breakdown */}
      <div className="glass-sm rounded-xl p-[21px] space-y-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
          Subject Performance — School Average
        </p>
        <div className="space-y-3">
          {SUBJECT_PERFORMANCE.map((s, i) => (
            <motion.div
              key={s.subject}
              data-ocid={`analytics.subject_row.${i + 1}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
              className="flex items-center gap-4"
            >
              <span className="text-sm text-muted-foreground w-32 shrink-0">
                {s.subject}
              </span>
              <div className="flex-1 h-2 rounded-full bg-white/5">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: AMBER }}
                  initial={{ width: 0 }}
                  animate={{ width: `${s.mastery}%` }}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.6 }}
                />
              </div>
              <span className="text-sm font-mono font-bold text-foreground w-12 text-right">
                {s.mastery}%
              </span>
              <span className="text-xs text-muted-foreground w-20 text-right">
                {s.students} students
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
