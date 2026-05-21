import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Briefcase, Star, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

const clusters = [
  {
    id: "stem",
    name: "STEM",
    color: "oklch(0.7_0.18_270)",
    careers: ["Software Engineer", "Data Scientist", "Biomedical Researcher"],
    avgSalary: 95000,
    growth: 15,
  },
  {
    id: "health",
    name: "Health Sciences",
    color: "oklch(0.7_0.18_150)",
    careers: ["Nurse Practitioner", "Physical Therapist", "Pharmacist"],
    avgSalary: 85000,
    growth: 13,
  },
  {
    id: "arts",
    name: "Arts & Communication",
    color: "oklch(0.7_0.18_320)",
    careers: ["Graphic Designer", "Journalist", "UX Designer"],
    avgSalary: 62000,
    growth: 8,
  },
  {
    id: "business",
    name: "Business & Finance",
    color: "oklch(0.85_0.15_85)",
    careers: ["Financial Analyst", "Marketing Manager", "Entrepreneur"],
    avgSalary: 78000,
    growth: 10,
  },
  {
    id: "trade",
    name: "Skilled Trades",
    color: "oklch(0.65_0.22_30)",
    careers: ["Electrician", "Plumber", "HVAC Tech"],
    avgSalary: 72000,
    growth: 12,
  },
];

const interestResults = [
  { cluster: "STEM", score: 87 },
  { cluster: "Business & Finance", score: 74 },
  { cluster: "Health Sciences", score: 68 },
];

export default function CounselorCareer() {
  return (
    <div
      data-ocid="counselor.career.page"
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
          Career Pathway Explorer
        </h1>
      </div>

      {/* Interest Survey Results */}
      <section className="mb-8">
        <h2 className="text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-4">
          Caseload Interest Survey Results
        </h2>
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5 space-y-4">
          {interestResults.map((r, i) => (
            <div key={r.cluster}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-[oklch(0.8_0.05_265)]">{r.cluster}</span>
                <span className="text-[oklch(0.85_0.15_85)] font-semibold">
                  {r.score}%
                </span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${r.score}%` }}
                  transition={{ delay: i * 0.12, duration: 0.8 }}
                  className="h-full bg-gradient-to-r from-[oklch(0.85_0.15_85)] to-[oklch(0.7_0.18_60)] rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Career Clusters */}
      <section>
        <h2 className="text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-4">
          Career Clusters
        </h2>
        <div className="space-y-3">
          {clusters.map((c, i) => (
            <motion.div
              key={c.id}
              data-ocid={`counselor.cluster.${i + 1}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: `${c.color}25` }}
                  >
                    <Briefcase className="w-4 h-4" style={{ color: c.color }} />
                  </div>
                  <div>
                    <p className="text-[oklch(0.9_0.05_265)] font-semibold text-sm">
                      {c.name}
                    </p>
                    <p className="text-[oklch(0.5_0.06_265)] text-xs">
                      Avg ${(c.avgSalary / 1000).toFixed(0)}k/yr
                    </p>
                  </div>
                </div>
                <Badge className="bg-[oklch(0.7_0.18_150)]/20 text-[oklch(0.7_0.18_150)] border-[oklch(0.7_0.18_150)]/30 text-xs">
                  <TrendingUp className="w-2.5 h-2.5 mr-1" />+{c.growth}%
                </Badge>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {c.careers.map((career) => (
                  <span
                    key={career}
                    className="text-xs px-2 py-1 bg-white/10 rounded-full text-[oklch(0.65_0.06_265)]"
                  >
                    {career}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
