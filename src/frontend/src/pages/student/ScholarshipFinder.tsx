import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  Clock,
  ExternalLink,
} from "lucide-react";
import { motion } from "motion/react";

const scholarships = [
  {
    id: "1",
    name: "NSHSS Academic Excellence Award",
    organization: "National Society of High School Scholars",
    amount: 10000,
    deadline: "Jul 1, 2026",
    matchScore: 89,
    status: "not_started" as const,
    criteria: ["GPA 3.5+", "Community service", "STEM focus"],
  },
  {
    id: "2",
    name: "Texas Public Education Grant",
    organization: "Texas Higher Education Coordinating Board",
    amount: 5000,
    deadline: "Jun 15, 2026",
    matchScore: 95,
    status: "in_progress" as const,
    criteria: ["Texas resident", "Financial need", "Full-time enrollment"],
  },
  {
    id: "3",
    name: "Hispanic Scholarship Fund",
    organization: "HSF National",
    amount: 5000,
    deadline: "May 30, 2026",
    matchScore: 88,
    status: "submitted" as const,
    criteria: ["Hispanic heritage", "GPA 3.0+", "US citizen or DACA"],
  },
  {
    id: "4",
    name: "Ron Brown Scholar Program",
    organization: "College Fund",
    amount: 40000,
    deadline: "Sep 1, 2026",
    matchScore: 72,
    status: "not_started" as const,
    criteria: ["Academic excellence", "Leadership", "Community impact"],
  },
];

const statusConfig: Record<string, { label: string; class: string }> = {
  not_started: {
    label: "Not Started",
    class: "bg-white/10 text-[oklch(0.6_0.06_265)] border-white/20",
  },
  in_progress: {
    label: "In Progress",
    class:
      "bg-[oklch(0.7_0.18_270)]/20 text-[oklch(0.7_0.18_270)] border-[oklch(0.7_0.18_270)]/30",
  },
  submitted: {
    label: "Submitted",
    class:
      "bg-[oklch(0.7_0.18_150)]/20 text-[oklch(0.7_0.18_150)] border-[oklch(0.7_0.18_150)]/30",
  },
  awarded: {
    label: "Awarded!",
    class:
      "bg-[oklch(0.85_0.15_85)]/20 text-[oklch(0.85_0.15_85)] border-[oklch(0.85_0.15_85)]/30",
  },
  denied: {
    label: "Not Selected",
    class:
      "bg-[oklch(0.65_0.22_30)]/20 text-[oklch(0.75_0.2_60)] border-[oklch(0.65_0.22_30)]/30",
  },
};

export default function ScholarshipFinder() {
  return (
    <div
      data-ocid="student.scholarships.page"
      className="min-h-screen bg-[oklch(0.08_0.02_265)] px-4 py-6 pb-24"
    >
      <div className="flex items-center gap-3 mb-6">
        <Link
          to="/dashboard"
          className="text-[oklch(0.6_0.08_265)] hover:text-[oklch(0.85_0.15_85)] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-[oklch(0.95_0.02_265)]">
            Scholarship Finder
          </h1>
          <p className="text-[oklch(0.5_0.06_265)] text-xs">
            ACHV-matched programs · RCGN pipeline
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          {
            label: "Matched",
            value: scholarships.length,
            color: "oklch(0.85_0.15_85)",
          },
          {
            label: "Applied",
            value: scholarships.filter((s) =>
              ["in_progress", "submitted"].includes(s.status),
            ).length,
            color: "oklch(0.7_0.18_270)",
          },
          {
            label: "Total Available",
            value: `$${(scholarships.reduce((a, s) => a + s.amount, 0) / 1000).toFixed(0)}k`,
            color: "oklch(0.7_0.18_150)",
          },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.07 }}
            className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-3 text-center"
          >
            <p className="text-lg font-bold" style={{ color: s.color }}>
              {s.value}
            </p>
            <p className="text-[oklch(0.5_0.06_265)] text-xs mt-0.5">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Scholarship Cards */}
      <div className="space-y-4">
        {scholarships.map((s, i) => (
          <motion.div
            key={s.id}
            data-ocid={`student.scholarship.${i + 1}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[oklch(0.85_0.15_85)]/15 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-[oklch(0.85_0.15_85)]" />
                </div>
                <div>
                  <h3 className="text-[oklch(0.9_0.05_265)] font-semibold text-sm leading-tight">
                    {s.name}
                  </h3>
                  <p className="text-[oklch(0.5_0.06_265)] text-xs mt-0.5">
                    {s.organization}
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0 ml-3">
                <p className="text-[oklch(0.85_0.15_85)] font-bold">
                  ${s.amount.toLocaleString()}
                </p>
                <Badge
                  className={`text-xs mt-1 ${statusConfig[s.status].class}`}
                >
                  {statusConfig[s.status].label}
                </Badge>
              </div>
            </div>

            {/* Match Score */}
            <div className="space-y-1 mb-3">
              <div className="flex justify-between text-xs">
                <span className="text-[oklch(0.5_0.06_265)]">
                  ACHV Match Score
                </span>
                <span className="text-[oklch(0.85_0.15_85)] font-semibold">
                  {s.matchScore}%
                </span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${s.matchScore}%` }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.7 }}
                  className="h-full bg-gradient-to-r from-[oklch(0.85_0.15_85)] to-[oklch(0.7_0.18_60)] rounded-full"
                />
              </div>
            </div>

            {/* Criteria */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {s.criteria.map((c) => (
                <span
                  key={c}
                  className="text-xs px-2 py-0.5 bg-white/10 text-[oklch(0.6_0.06_265)] rounded-full flex items-center gap-1"
                >
                  <CheckCircle2 className="w-2.5 h-2.5 text-[oklch(0.7_0.18_150)]" />
                  {c}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[oklch(0.5_0.06_265)] text-xs">
                <Clock className="w-3 h-3" />
                Deadline: {s.deadline}
              </div>
              <Button
                data-ocid={`student.scholarship.apply.${i + 1}`}
                size="sm"
                className="bg-[oklch(0.85_0.15_85)]/15 hover:bg-[oklch(0.85_0.15_85)]/25 text-[oklch(0.85_0.15_85)] border border-[oklch(0.85_0.15_85)]/30 text-xs"
              >
                <ExternalLink className="w-3 h-3 mr-1" /> Apply
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
