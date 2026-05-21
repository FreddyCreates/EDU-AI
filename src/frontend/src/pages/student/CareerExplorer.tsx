import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, Compass, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const clusters = [
  {
    id: "stem",
    name: "STEM",
    emoji: "🔬",
    description: "Science, Technology, Engineering & Math",
    careers: ["Software Engineer", "Data Scientist", "Aerospace Engineer"],
    color: "oklch(0.7_0.18_270)",
    growthRate: 15,
  },
  {
    id: "health",
    name: "Health Sciences",
    emoji: "🩺",
    description: "Medicine, nursing, therapy, and wellness",
    careers: ["Physician Assistant", "Physical Therapist", "Pharmacist"],
    color: "oklch(0.7_0.18_150)",
    growthRate: 13,
  },
  {
    id: "business",
    name: "Business",
    emoji: "📊",
    description: "Finance, marketing, entrepreneurship",
    careers: ["Financial Analyst", "Marketing Director", "Startup Founder"],
    color: "oklch(0.85_0.15_85)",
    growthRate: 10,
  },
  {
    id: "arts",
    name: "Arts & Media",
    emoji: "🎨",
    description: "Design, communication, and creative fields",
    careers: ["UX Designer", "Filmmaker", "Art Director"],
    color: "oklch(0.7_0.18_320)",
    growthRate: 8,
  },
  {
    id: "trades",
    name: "Skilled Trades",
    emoji: "🔧",
    description: "Electrical, plumbing, HVAC, construction",
    careers: ["Master Electrician", "HVAC Tech", "Construction PM"],
    color: "oklch(0.65_0.22_30)",
    growthRate: 12,
  },
];

const history = [
  {
    cluster: "STEM",
    action: "Explored Software Engineering pathway",
    date: "May 18",
  },
  {
    cluster: "Business",
    action: "Completed Entrepreneurship interest quiz",
    date: "May 15",
  },
  {
    cluster: "STEM",
    action: "Viewed Data Science career profile",
    date: "May 12",
  },
];

export default function CareerExplorer() {
  const [selected, setSelected] = useState<string | null>(null);
  const _selectedCluster = clusters.find((c) => c.id === selected);

  return (
    <div
      data-ocid="student.career.page"
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
            Career Explorer
          </h1>
          <p className="text-[oklch(0.5_0.06_265)] text-xs">
            Sovereign pathway intelligence · TCHR-COGT
          </p>
        </div>
      </div>

      {/* Career Cluster Cards */}
      <section className="mb-8">
        <h2 className="text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-4">
          <Compass className="inline w-4 h-4 mr-2" />
          Career Clusters
        </h2>
        <div className="space-y-3">
          {clusters.map((c, i) => (
            <motion.button
              key={c.id}
              type="button"
              data-ocid={`student.career.cluster.${i + 1}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              onClick={() => setSelected(selected === c.id ? null : c.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                selected === c.id
                  ? "border-[oklch(0.85_0.15_85)]/40 bg-[oklch(0.85_0.15_85)]/8"
                  : "border-white/10 bg-white/5 hover:bg-white/8"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{c.emoji}</span>
                  <div>
                    <p className="text-[oklch(0.9_0.05_265)] font-semibold">
                      {c.name}
                    </p>
                    <p className="text-[oklch(0.5_0.06_265)] text-xs">
                      {c.description}
                    </p>
                  </div>
                </div>
                <Badge className="text-xs bg-[oklch(0.7_0.18_150)]/15 text-[oklch(0.7_0.18_150)] border-[oklch(0.7_0.18_150)]/25">
                  +{c.growthRate}%
                </Badge>
              </div>

              <AnimatePresence>
                {selected === c.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-[oklch(0.55_0.06_265)] text-xs mb-2">
                        Career Pathways:
                      </p>
                      <div className="flex flex-col gap-1.5">
                        {c.careers.map((career) => (
                          <div key={career} className="flex items-center gap-2">
                            <div
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ background: c.color }}
                            />
                            <span className="text-[oklch(0.8_0.05_265)] text-sm">
                              {career}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Exploration History */}
      <section>
        <h2 className="text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-4">
          <Clock className="inline w-4 h-4 mr-2" />
          Exploration History
        </h2>
        <div className="space-y-3">
          {history.map((h, i) => (
            <motion.div
              key={h.cluster}
              data-ocid={`student.career.history.${i + 1}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.07 }}
              className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl"
            >
              <div>
                <p className="text-[oklch(0.8_0.05_265)] text-sm">{h.action}</p>
                <p className="text-[oklch(0.45_0.05_265)] text-xs">{h.date}</p>
              </div>
              <Badge className="text-xs bg-white/10 text-[oklch(0.6_0.06_265)] border-white/20">
                {h.cluster}
              </Badge>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
