import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Circle, Clock } from "lucide-react";
import { motion } from "motion/react";

const plans = [
  {
    name: "Aiden Park",
    type: "iep" as const,
    status: "active" as const,
    nextReview: "May 28, 2026",
    milestones: [
      { title: "Extended time accommodation confirmed", completed: true },
      { title: "Math support sessions scheduled (3x/week)", completed: true },
      { title: "Parent conference on IEP goals", completed: false },
      { title: "Mid-year progress assessment", completed: false },
    ],
  },
  {
    name: "Sofia Garcia",
    type: "college" as const,
    status: "active" as const,
    nextReview: "Jun 5, 2026",
    milestones: [
      { title: "FAFSA submitted", completed: true },
      { title: "Application list finalized (5 schools)", completed: true },
      { title: "Essay review session completed", completed: true },
      { title: "Acceptance decision by Jun 1", completed: false },
    ],
  },
  {
    name: "James Wilson",
    type: "general" as const,
    status: "active" as const,
    nextReview: "May 22, 2026",
    milestones: [
      { title: "Attendance contract signed", completed: true },
      { title: "Check-in meetings weekly", completed: false },
      { title: "Family contact for support plan", completed: false },
    ],
  },
];

const typeColor: Record<string, string> = {
  iep: "bg-[oklch(0.65_0.22_30)]/20 text-[oklch(0.75_0.2_60)] border-[oklch(0.65_0.22_30)]/30",
  college:
    "bg-[oklch(0.85_0.15_85)]/20 text-[oklch(0.85_0.15_85)] border-[oklch(0.85_0.15_85)]/30",
  general: "bg-white/10 text-[oklch(0.65_0.06_265)] border-white/20",
  career:
    "bg-[oklch(0.7_0.18_150)]/20 text-[oklch(0.7_0.18_150)] border-[oklch(0.7_0.18_150)]/30",
  "504":
    "bg-[oklch(0.7_0.18_270)]/20 text-[oklch(0.7_0.18_270)] border-[oklch(0.7_0.18_270)]/30",
  esl: "bg-[oklch(0.7_0.18_320)]/20 text-[oklch(0.7_0.18_320)] border-[oklch(0.7_0.18_320)]/30",
};

export default function CounselorPlans() {
  return (
    <div
      data-ocid="counselor.plans.page"
      className="min-h-screen bg-[oklch(0.08_0.02_265)] px-4 py-6 pb-24"
    >
      <div className="flex items-center gap-3 mb-6">
        <Link
          to="/counselor"
          className="text-[oklch(0.6_0.08_265)] hover:text-[oklch(0.85_0.15_85)] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-bold text-[oklch(0.95_0.02_265)]">
          Counselor Plans
        </h1>
      </div>

      <div className="space-y-5">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            data-ocid={`counselor.plan.${i + 1}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-[oklch(0.9_0.05_265)] font-semibold">
                  {plan.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-3 h-3 text-[oklch(0.5_0.06_265)]" />
                  <span className="text-[oklch(0.5_0.06_265)] text-xs">
                    Review: {plan.nextReview}
                  </span>
                </div>
              </div>
              <Badge className={`text-xs ${typeColor[plan.type]}`}>
                {plan.type.toUpperCase()}
              </Badge>
            </div>

            {/* Milestone Timeline */}
            <div className="space-y-3">
              {plan.milestones.map((m, j) => (
                <div
                  key={m.title || `ms-${j}`}
                  className="flex items-start gap-3"
                >
                  {m.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-[oklch(0.7_0.18_150)] mt-0.5 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-[oklch(0.35_0.05_265)] mt-0.5 shrink-0" />
                  )}
                  <p
                    className={`text-sm leading-tight ${
                      m.completed
                        ? "text-[oklch(0.55_0.06_265)] line-through"
                        : "text-[oklch(0.8_0.05_265)]"
                    }`}
                  >
                    {m.title}
                  </p>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            {(() => {
              const done = plan.milestones.filter((m) => m.completed).length;
              const pct = Math.round((done / plan.milestones.length) * 100);
              return (
                <div className="mt-4 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-[oklch(0.5_0.06_265)]">
                      {done}/{plan.milestones.length} milestones
                    </span>
                    <span className="text-[oklch(0.85_0.15_85)] font-semibold">
                      {pct}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: 0.4 + i * 0.1, duration: 0.7 }}
                      className="h-full bg-[oklch(0.85_0.15_85)] rounded-full"
                    />
                  </div>
                </div>
              );
            })()}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
