import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Award, BookOpen, Calendar } from "lucide-react";
import { motion } from "motion/react";

const students = [
  {
    name: "Priya Nair",
    stage: "deciding",
    gpa: 3.9,
    sat: 1380,
    ap: ["Calc BC", "US History", "English Lang"],
    colleges: ["UT Austin", "Texas A&M", "Rice"],
    deadline: "May 1, 2026",
  },
  {
    name: "Sofia Garcia",
    stage: "applying",
    gpa: 3.5,
    sat: 1180,
    ap: ["Algebra II", "Spanish IV"],
    colleges: ["UTA", "UNT", "UTSA"],
    deadline: "Jun 1, 2026",
  },
  {
    name: "Aiden Park",
    stage: "preparing",
    gpa: 3.2,
    sat: null,
    ap: ["Pre-Calc"],
    colleges: ["Community College", "TWU"],
    deadline: "Aug 1, 2026",
  },
];

const stageColors: Record<string, string> = {
  deciding:
    "bg-[oklch(0.7_0.18_150)]/20 text-[oklch(0.7_0.18_150)] border-[oklch(0.7_0.18_150)]/30",
  applying:
    "bg-[oklch(0.85_0.15_85)]/20 text-[oklch(0.85_0.15_85)] border-[oklch(0.85_0.15_85)]/30",
  preparing:
    "bg-[oklch(0.7_0.18_270)]/20 text-[oklch(0.7_0.18_270)] border-[oklch(0.7_0.18_270)]/30",
  exploring: "bg-white/10 text-[oklch(0.6_0.06_265)] border-white/20",
};

export default function CounselorCollege() {
  return (
    <div
      data-ocid="counselor.college.page"
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
          College Readiness
        </h1>
      </div>

      <div className="space-y-5">
        {students.map((s, i) => (
          <motion.div
            key={s.name}
            data-ocid={`counselor.college_student.${i + 1}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-[oklch(0.9_0.05_265)] font-semibold">
                  {s.name}
                </h3>
                <div className="flex items-center gap-3 mt-1 text-xs text-[oklch(0.55_0.06_265)]">
                  <span>GPA {s.gpa}</span>
                  {s.sat && <span>SAT {s.sat}</span>}
                </div>
              </div>
              <Badge className={`text-xs ${stageColors[s.stage]}`}>
                {s.stage}
              </Badge>
            </div>

            {/* AP Courses */}
            <div className="mb-3">
              <p className="text-[oklch(0.55_0.06_265)] text-xs mb-1.5 flex items-center gap-1">
                <BookOpen className="w-3 h-3" /> AP/IB Courses
              </p>
              <div className="flex flex-wrap gap-1.5">
                {s.ap.map((c) => (
                  <span
                    key={c}
                    className="text-xs px-2 py-0.5 bg-[oklch(0.85_0.15_85)]/15 text-[oklch(0.85_0.15_85)] rounded-full"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Target Colleges */}
            <div className="mb-3">
              <p className="text-[oklch(0.55_0.06_265)] text-xs mb-1.5 flex items-center gap-1">
                <Award className="w-3 h-3" /> Target Colleges
              </p>
              <div className="flex flex-wrap gap-1.5">
                {s.colleges.map((c) => (
                  <span
                    key={c}
                    className="text-xs px-2 py-0.5 bg-white/10 text-[oklch(0.7_0.06_265)] rounded-full"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Deadline */}
            <div className="flex items-center gap-2 pt-3 border-t border-white/10">
              <Calendar className="w-3.5 h-3.5 text-[oklch(0.85_0.15_85)]" />
              <span className="text-[oklch(0.7_0.06_265)] text-xs">
                Next deadline: {s.deadline}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
