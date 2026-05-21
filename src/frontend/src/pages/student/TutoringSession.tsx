import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Brain,
  Clock,
  GraduationCap,
  Star,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

type SessionType = "peer" | "teacher" | "ai";

const sessionTypes: {
  type: SessionType;
  label: string;
  description: string;
  icon: typeof Users;
  color: string;
}[] = [
  {
    type: "peer",
    label: "Peer Tutor",
    description: "Study with a matched classmate",
    icon: Users,
    color: "oklch(0.7_0.18_150)",
  },
  {
    type: "teacher",
    label: "Teacher",
    description: "One-on-one with your teacher",
    icon: GraduationCap,
    color: "oklch(0.85_0.15_85)",
  },
  {
    type: "ai",
    label: "EduAI",
    description: "Sovereign AI tutoring session",
    icon: Brain,
    color: "oklch(0.7_0.18_270)",
  },
];

const sessionHistory = [
  {
    tutor: "Priya Nair (Peer)",
    subject: "Algebra II",
    date: "May 17",
    duration: 45,
    rating: 5,
  },
  {
    tutor: "Ms. Rivera (Teacher)",
    subject: "Algebra II",
    date: "May 14",
    duration: 30,
    rating: 5,
  },
  {
    tutor: "EduAI (AI)",
    subject: "Geometry",
    date: "May 12",
    duration: 55,
    rating: 4,
  },
  {
    tutor: "Carlos Mendoza (Peer)",
    subject: "Biology",
    date: "May 10",
    duration: 34,
    rating: 4,
  },
];

export default function TutoringSession() {
  const [selected, setSelected] = useState<SessionType | null>(null);
  const [inSession, setInSession] = useState(false);

  return (
    <div
      data-ocid="student.tutoring.page"
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
            Tutoring Sessions
          </h1>
          <p className="text-[oklch(0.5_0.06_265)] text-xs">
            Peer · Teacher · EduAI
          </p>
        </div>
      </div>

      {/* Session Type Selector */}
      {!inSession ? (
        <>
          <section className="mb-8">
            <h2 className="text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-4">
              Choose Session Type
            </h2>
            <div className="space-y-3">
              {sessionTypes.map((s, i) => (
                <motion.button
                  key={s.type}
                  type="button"
                  data-ocid={`student.tutoring.type.${s.type}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() =>
                    setSelected(selected === s.type ? null : s.type)
                  }
                  className={`w-full flex items-center gap-4 p-5 rounded-xl border text-left transition-all ${
                    selected === s.type
                      ? "border-[oklch(0.85_0.15_85)]/40 bg-[oklch(0.85_0.15_85)]/8"
                      : "border-white/10 bg-white/5 hover:bg-white/8"
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${s.color}20` }}
                  >
                    <s.icon className="w-6 h-6" style={{ color: s.color }} />
                  </div>
                  <div>
                    <p className="text-[oklch(0.9_0.05_265)] font-semibold">
                      {s.label}
                    </p>
                    <p className="text-[oklch(0.5_0.06_265)] text-sm">
                      {s.description}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
            {selected && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4"
              >
                <Button
                  type="button"
                  data-ocid="student.tutoring.start_button"
                  onClick={() => setInSession(true)}
                  className="w-full py-5 font-semibold bg-[oklch(0.85_0.15_85)]/20 hover:bg-[oklch(0.85_0.15_85)]/30 text-[oklch(0.85_0.15_85)] border border-[oklch(0.85_0.15_85)]/30"
                >
                  Start {sessionTypes.find((s) => s.type === selected)?.label}{" "}
                  Session
                </Button>
              </motion.div>
            )}
          </section>

          {/* History */}
          <section>
            <h2 className="text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-4">
              <Clock className="inline w-4 h-4 mr-2" />
              Session History
            </h2>
            <div className="space-y-3">
              {sessionHistory.map((h, i) => (
                <motion.div
                  key={h.date + h.tutor}
                  data-ocid={`student.tutoring.history.${i + 1}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.07 }}
                  className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl"
                >
                  <div>
                    <p className="text-[oklch(0.85_0.05_265)] text-sm font-medium">
                      {h.tutor}
                    </p>
                    <p className="text-[oklch(0.5_0.06_265)] text-xs">
                      {h.subject} · {h.date} · {h.duration} min
                    </p>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: h.rating }, (_, j) => (
                      <Star
                        key={`star-${h.date}-${j}`}
                        className="w-3 h-3 fill-[oklch(0.85_0.15_85)] text-[oklch(0.85_0.15_85)]"
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 text-center"
          data-ocid="student.tutoring.session_panel"
        >
          <div className="w-16 h-16 rounded-2xl bg-[oklch(0.85_0.15_85)]/20 flex items-center justify-center mx-auto mb-4">
            {selected === "ai" ? (
              <Brain className="w-8 h-8 text-[oklch(0.85_0.15_85)]" />
            ) : selected === "teacher" ? (
              <GraduationCap className="w-8 h-8 text-[oklch(0.85_0.15_85)]" />
            ) : (
              <Users className="w-8 h-8 text-[oklch(0.85_0.15_85)]" />
            )}
          </div>
          <Badge className="bg-[oklch(0.7_0.18_150)]/20 text-[oklch(0.7_0.18_150)] border-[oklch(0.7_0.18_150)]/30 mb-4">
            Session Active
          </Badge>
          <h3 className="text-[oklch(0.9_0.05_265)] font-bold text-lg mb-2">
            {sessionTypes.find((s) => s.type === selected)?.label} Session
          </h3>
          <p className="text-[oklch(0.55_0.06_265)] text-sm mb-8">
            Live tutoring interface · COGT-powered adaptive learning
          </p>
          <Button
            type="button"
            data-ocid="student.tutoring.end_button"
            onClick={() => setInSession(false)}
            variant="outline"
            className="border-white/20 text-[oklch(0.6_0.08_265)] hover:bg-white/10"
          >
            End Session
          </Button>
        </motion.div>
      )}
    </div>
  );
}
