import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Award, Building2, TrendingUp, Users } from "lucide-react";
import { motion } from "motion/react";

const schools = [
  {
    id: "s1",
    name: "Lincoln High School",
    type: "High School",
    mastery: 78,
    enrollment: 1842,
    grades: "9-12",
    rcgn: 34,
    trend: "up",
  },
  {
    id: "s2",
    name: "Roosevelt Middle School",
    type: "Middle School",
    mastery: 82,
    enrollment: 1120,
    grades: "6-8",
    rcgn: 18,
    trend: "up",
  },
  {
    id: "s3",
    name: "Ferris Elementary",
    type: "Elementary",
    mastery: 71,
    enrollment: 643,
    grades: "K-5",
    rcgn: 12,
    trend: "stable",
  },
  {
    id: "s4",
    name: "Washington STEM Academy",
    type: "Magnet",
    mastery: 91,
    enrollment: 890,
    grades: "6-12",
    rcgn: 47,
    trend: "up",
  },
];

export default function DistrictSchools() {
  return (
    <div
      data-ocid="district.schools.page"
      className="min-h-screen bg-[oklch(0.08_0.02_265)] p-6 md:p-10"
    >
      <div className="flex items-center gap-3 mb-8">
        <Link
          to="/district"
          className="text-[oklch(0.6_0.08_265)] hover:text-[oklch(0.85_0.15_85)] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[oklch(0.95_0.02_265)]">
            Schools
          </h1>
          <p className="text-[oklch(0.5_0.06_265)] text-sm">
            District-wide school overview
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {schools.map((s, i) => (
          <motion.div
            key={s.id}
            data-ocid={`district.school.${i + 1}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[oklch(0.85_0.15_85)]/15 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-[oklch(0.85_0.15_85)]" />
                </div>
                <div>
                  <h3 className="text-[oklch(0.9_0.05_265)] font-semibold">
                    {s.name}
                  </h3>
                  <p className="text-[oklch(0.5_0.06_265)] text-xs">
                    {s.type} · Grades {s.grades}
                  </p>
                </div>
              </div>
              <Badge
                className={`text-xs ${
                  s.trend === "up"
                    ? "bg-[oklch(0.7_0.18_150)]/20 text-[oklch(0.7_0.18_150)] border-[oklch(0.7_0.18_150)]/30"
                    : "bg-white/10 text-[oklch(0.6_0.06_265)] border-white/20"
                }`}
              >
                {s.trend === "up" ? (
                  <TrendingUp className="w-2.5 h-2.5 mr-1" />
                ) : null}
                {s.trend}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <p className="text-xl font-bold text-[oklch(0.85_0.15_85)]">
                  {s.mastery}%
                </p>
                <p className="text-[oklch(0.5_0.06_265)] text-xs">
                  Mastery Avg
                </p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-[oklch(0.7_0.18_270)]">
                  {s.enrollment.toLocaleString()}
                </p>
                <p className="text-[oklch(0.5_0.06_265)] text-xs">Enrolled</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-[oklch(0.7_0.18_150)]">
                  {s.rcgn}
                </p>
                <p className="text-[oklch(0.5_0.06_265)] text-xs">RCGN Flags</p>
              </div>
            </div>

            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${s.mastery}%` }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.8 }}
                className="h-full bg-gradient-to-r from-[oklch(0.85_0.15_85)] to-[oklch(0.7_0.18_60)] rounded-full"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
