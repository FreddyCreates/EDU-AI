import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

const stats = [
  { label: "Present", value: 87, color: "oklch(0.7_0.18_150)" },
  { label: "Absent", value: 3, color: "oklch(0.65_0.22_30)" },
  { label: "Tardy", value: 2, color: "oklch(0.75_0.18_60)" },
  { label: "Excused", value: 5, color: "oklch(0.7_0.14_270)" },
];

type Day = {
  day: number;
  status: "present" | "absent" | "tardy" | "excused" | "weekend" | "future";
};

const calendarDays: Day[] = Array.from({ length: 31 }, (_, i) => ({
  day: i + 1,
  status:
    i < 5 ||
    i === 12 ||
    i === 13 ||
    i === 20 ||
    i === 21 ||
    i === 27 ||
    i === 28
      ? "weekend"
      : i > 18
        ? "future"
        : i === 7 || i === 15
          ? "absent"
          : i === 3 || i === 9
            ? "tardy"
            : i === 11 || i === 17
              ? "excused"
              : "present",
}));

const statusColor: Record<string, string> = {
  present: "bg-[oklch(0.7_0.18_150)]/70",
  absent: "bg-[oklch(0.65_0.22_30)]/70",
  tardy: "bg-[oklch(0.75_0.18_60)]/70",
  excused: "bg-[oklch(0.7_0.14_270)]/70",
  weekend: "bg-white/5",
  future: "bg-white/3",
};

export default function ParentAttendance() {
  return (
    <div
      data-ocid="parent.attendance.page"
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
          Attendance
        </h1>
      </div>

      {/* Alert */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[oklch(0.65_0.22_30)]/15 border border-[oklch(0.65_0.22_30)]/30 rounded-xl p-4 mb-6 flex items-start gap-3"
      >
        <AlertTriangle className="w-5 h-5 text-[oklch(0.75_0.2_60)] shrink-0 mt-0.5" />
        <div>
          <p className="text-[oklch(0.9_0.05_265)] text-sm font-medium">
            2 unexcused absences this month
          </p>
          <p className="text-[oklch(0.6_0.08_265)] text-xs mt-0.5">
            Contact attendance office to submit documentation
          </p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.07 }}
            className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-3 text-center"
          >
            <p className="text-xl font-bold" style={{ color: s.color }}>
              {s.value}
            </p>
            <p className="text-[oklch(0.55_0.06_265)] text-xs mt-0.5">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Calendar */}
      <section>
        <h2 className="text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-3">
          May 2026
        </h2>
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-4">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <div
                key={d}
                className="text-center text-[oklch(0.5_0.06_265)] text-xs font-medium py-1"
              >
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {/* Offset for May starting on Friday (index 5) */}
            {Array.from({ length: 5 }, (_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static offset cells never reorder
              <div key={`empty-${i}`} />
            ))}
            {calendarDays.map((d, i) => (
              <motion.div
                key={d.day}
                data-ocid={`parent.attendance.day.${d.day}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.01 }}
                className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium ${statusColor[d.status]} ${d.status === "future" ? "text-[oklch(0.35_0.04_265)]" : "text-[oklch(0.9_0.02_265)]"}`}
              >
                {d.day}
              </motion.div>
            ))}
          </div>
          {/* Legend */}
          <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-white/10">
            {["present", "absent", "tardy", "excused"].map((s) => (
              <div key={s} className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded-sm ${statusColor[s]}`} />
                <span className="text-[oklch(0.55_0.06_265)] text-xs capitalize">
                  {s}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
