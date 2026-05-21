import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Activity, ArrowLeft, Clock, Plus, Users } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const groups = [
  {
    groupId: "g1",
    name: "Algebra Foundations",
    subject: "Algebra II",
    members: ["Marcus M.", "James W.", "Sofia G."],
    sssRange: [8, 21] as [number, number],
    active: true,
    sessions: [
      { date: "May 17", duration: 55, topics: ["Factoring", "Quadratics"] },
      { date: "May 14", duration: 34, topics: ["Polynomials"] },
    ],
  },
  {
    groupId: "g2",
    name: "Advanced Mastery",
    subject: "Algebra II",
    members: ["Priya N.", "Emma C.", "Aiden P."],
    sssRange: [55, 89] as [number, number],
    active: true,
    sessions: [
      {
        date: "May 16",
        duration: 89,
        topics: ["Complex Numbers", "Conic Sections"],
      },
    ],
  },
  {
    groupId: "g3",
    name: "Building Block Group",
    subject: "Algebra II",
    members: ["Carlos M.", "David L."],
    sssRange: [3, 8] as [number, number],
    active: false,
    sessions: [],
  },
];

export default function StudyGroups() {
  const [expanded, setExpanded] = useState<string | null>("g1");

  return (
    <div
      data-ocid="teacher.studygroups.page"
      className="min-h-screen bg-[oklch(0.08_0.02_265)] p-4 md:p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link
            to="/teacher"
            className="text-[oklch(0.6_0.08_265)] hover:text-[oklch(0.85_0.15_85)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-[oklch(0.95_0.02_265)]">
              Study Groups
            </h1>
            <p className="text-[oklch(0.5_0.06_265)] text-xs">
              SSS-range matched · FIBR-aligned
            </p>
          </div>
        </div>
        <Button
          type="button"
          data-ocid="teacher.studygroups.create_button"
          size="sm"
          className="bg-[oklch(0.85_0.15_85)]/20 hover:bg-[oklch(0.85_0.15_85)]/30 text-[oklch(0.85_0.15_85)] border border-[oklch(0.85_0.15_85)]/30"
        >
          <Plus className="w-4 h-4 mr-1" /> New Group
        </Button>
      </div>

      {/* SSS Matching Info */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[oklch(0.85_0.15_85)]/8 border border-[oklch(0.85_0.15_85)]/20 rounded-xl p-4 mb-6"
      >
        <p className="text-[oklch(0.8_0.08_265)] text-sm">
          <span className="text-[oklch(0.85_0.15_85)] font-semibold">
            SSS-Range Matching
          </span>{" "}
          — Groups are formed by matching students within the same Fibonacci SSS
          band. Students within 1 Fibonacci level of each other learn most
          effectively together.
        </p>
      </motion.div>

      {/* Groups List */}
      <div className="space-y-4">
        {groups.map((g, i) => (
          <motion.div
            key={g.groupId}
            data-ocid={`teacher.studygroup.${i + 1}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl overflow-hidden"
          >
            <button
              type="button"
              onClick={() =>
                setExpanded(expanded === g.groupId ? null : g.groupId)
              }
              className="w-full flex items-start justify-between p-5 text-left hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[oklch(0.85_0.15_85)]/15 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[oklch(0.85_0.15_85)]" />
                </div>
                <div>
                  <p className="text-[oklch(0.9_0.05_265)] font-semibold">
                    {g.name}
                  </p>
                  <p className="text-[oklch(0.5_0.06_265)] text-xs">
                    {g.members.length} members · SSS F({g.sssRange[0]}–
                    {g.sssRange[1]})
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge
                  className={`text-xs ${
                    g.active
                      ? "bg-[oklch(0.7_0.18_150)]/20 text-[oklch(0.7_0.18_150)] border-[oklch(0.7_0.18_150)]/30"
                      : "bg-white/10 text-[oklch(0.5_0.06_265)] border-white/20"
                  }`}
                >
                  {g.active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </button>

            {expanded === g.groupId && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 border-t border-white/10 pt-4">
                  {/* Members */}
                  <div className="mb-4">
                    <p className="text-[oklch(0.55_0.06_265)] text-xs mb-2">
                      Members
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {g.members.map((m) => (
                        <span
                          key={m}
                          className="text-xs px-3 py-1 bg-white/10 text-[oklch(0.7_0.08_265)] rounded-full"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Session Logs */}
                  {g.sessions.length > 0 ? (
                    <div>
                      <p className="text-[oklch(0.55_0.06_265)] text-xs mb-2">
                        <Activity className="inline w-3 h-3 mr-1" />
                        Session Logs
                      </p>
                      <div className="space-y-2">
                        {g.sessions.map((s, j) => (
                          <div
                            key={s.date}
                            data-ocid={`teacher.studygroup.session.${i + 1}.${j + 1}`}
                            className="flex items-center justify-between text-xs p-3 bg-white/5 border border-white/10 rounded-lg"
                          >
                            <div>
                              <span className="text-[oklch(0.7_0.06_265)]">
                                {s.date}
                              </span>
                              <span className="text-[oklch(0.5_0.05_265)] ml-2">
                                · {s.topics.join(", ")}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-[oklch(0.6_0.06_265)]">
                              <Clock className="w-3 h-3" />
                              {s.duration}m
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-[oklch(0.4_0.05_265)] text-xs">
                      No sessions yet
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
