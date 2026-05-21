import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Award, Download, Star } from "lucide-react";
import { motion } from "motion/react";

const reports = [
  {
    term: "Spring 2026",
    gpa: 3.6,
    grade: "A-",
    highlights: ["Honor Roll", "RCGN Flag: Math"],
    issued: "May 15, 2026",
  },
  {
    term: "Fall 2025",
    gpa: 3.4,
    grade: "B+",
    highlights: ["Mastery Streak: 21 days"],
    issued: "Dec 18, 2025",
  },
  {
    term: "Spring 2025",
    gpa: 3.2,
    grade: "B",
    highlights: ["ESL Progress Award"],
    issued: "May 16, 2025",
  },
];

const achievements = [
  {
    title: "National Math Recognition — NSHSS Nominee",
    date: "Apr 2026",
    level: "national",
  },
  {
    title: "Perfect Attendance — February 2026",
    date: "Feb 2026",
    level: "school",
  },
  {
    title: "STAAR Approaches Grade Level — All Subjects",
    date: "Dec 2025",
    level: "state",
  },
];

export default function ParentReports() {
  return (
    <div
      data-ocid="parent.reports.page"
      className="min-h-screen bg-[oklch(0.08_0.02_265)] px-4 py-6 pb-24"
    >
      <div className="flex items-center gap-3 mb-6">
        <Link
          to="/parent"
          className="text-[oklch(0.6_0.08_265)] hover:text-[oklch(0.85_0.15_85)] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-bold text-[oklch(0.95_0.02_265)]">
          Reports
        </h1>
      </div>

      {/* Report Cards */}
      <section className="mb-8">
        <h2 className="text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-4">
          Progress Reports
        </h2>
        <div className="space-y-4">
          {reports.map((r, i) => (
            <motion.div
              key={r.term}
              data-ocid={`parent.report.${i + 1}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-[oklch(0.9_0.05_265)] font-semibold">
                    {r.term}
                  </h3>
                  <p className="text-[oklch(0.5_0.06_265)] text-xs mt-0.5">
                    Issued {r.issued}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[oklch(0.85_0.15_85)]">
                    {r.grade}
                  </p>
                  <p className="text-[oklch(0.55_0.06_265)] text-xs">
                    GPA {r.gpa}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {r.highlights.map((h) => (
                  <Badge
                    key={h}
                    className="bg-[oklch(0.85_0.15_85)]/15 text-[oklch(0.85_0.15_85)] border-[oklch(0.85_0.15_85)]/25 text-xs"
                  >
                    <Star className="w-2.5 h-2.5 mr-1" />
                    {h}
                  </Badge>
                ))}
              </div>
              <Button
                data-ocid={`parent.report_download.${i + 1}`}
                size="sm"
                variant="outline"
                className="w-full border-white/20 text-[oklch(0.7_0.08_265)] hover:bg-white/10"
              >
                <Download className="w-4 h-4 mr-2" /> Download Report
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Achievement Highlights */}
      <section>
        <h2 className="text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-4">
          <Award className="inline w-4 h-4 mr-2" />
          Achievement Highlights
        </h2>
        <div className="space-y-3">
          {achievements.map((a, i) => (
            <motion.div
              key={a.title}
              data-ocid={`parent.achievement.${i + 1}`}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-4 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[oklch(0.85_0.15_85)]/20 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-[oklch(0.85_0.15_85)]" />
              </div>
              <div className="min-w-0">
                <p className="text-[oklch(0.85_0.05_265)] text-sm font-medium truncate">
                  {a.title}
                </p>
                <p className="text-[oklch(0.5_0.06_265)] text-xs">{a.date}</p>
              </div>
              <Badge
                className={`shrink-0 text-xs ${
                  a.level === "national"
                    ? "bg-[oklch(0.85_0.15_85)]/20 text-[oklch(0.85_0.15_85)] border-[oklch(0.85_0.15_85)]/30"
                    : a.level === "state"
                      ? "bg-[oklch(0.7_0.18_270)]/20 text-[oklch(0.7_0.18_270)] border-[oklch(0.7_0.18_270)]/30"
                      : "bg-white/10 text-[oklch(0.7_0.08_265)] border-white/20"
                }`}
              >
                {a.level}
              </Badge>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
