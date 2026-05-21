import type { RcgnAlert } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRcgnAlerts } from "@/hooks/use-rcgn-alerts";
import { Award, ChevronRight, Star, Trophy, X, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const ALERT_TYPE_CONFIG: Record<
  string,
  { label: string; color: string; icon: React.ReactNode }
> = {
  THRESHOLD_CROSSED: {
    label: "Threshold Crossed",
    color: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    icon: <Award className="w-3 h-3" />,
  },
  MASTERY_STREAK: {
    label: "Mastery Streak",
    color: "bg-teal-500/20 text-teal-300 border-teal-500/30",
    icon: <Zap className="w-3 h-3" />,
  },
  COMPETITION_READY: {
    label: "Competition Ready",
    color: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    icon: <Trophy className="w-3 h-3" />,
  },
};

const PROGRAMS = [
  "NSHSS",
  "UIL Academic",
  "Skills USA",
  "National Merit",
  "DECA",
  "HOSA",
];

interface ModalTarget {
  studentName: string;
  subject: string;
  alertType: string;
}

function NominationModal({
  target,
  onClose,
}: {
  target: ModalTarget;
  onClose: () => void;
}) {
  const [program, setProgram] = useState(PROGRAMS[0]);
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(onClose, 1800);
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-ocid="recognition.dialog"
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Enter" && onClose()}
        role="button"
        tabIndex={0}
        aria-label="Close dialog"
      />
      <motion.div
        className="relative w-full max-w-md rounded-2xl border border-amber-400/30 bg-black/70 backdrop-blur-xl p-6 shadow-2xl"
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 20 }}
      >
        <button
          type="button"
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          onClick={onClose}
          aria-label="Close"
          data-ocid="recognition.close_button"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <motion.div
            className="text-center py-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            data-ocid="recognition.success_state"
          >
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-amber-400 fill-amber-400" />
            </div>
            <p className="text-lg font-bold text-amber-300">
              Nomination Submitted!
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {target.studentName} has been nominated for {program}.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <h2 className="text-lg font-bold text-amber-300">
                Nominate Student
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                Complete the nomination for{" "}
                <span className="text-foreground font-semibold">
                  {target.studentName}
                </span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-xs text-muted-foreground">Student</p>
                <p className="text-sm font-semibold text-foreground truncate">
                  {target.studentName}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-xs text-muted-foreground">Subject</p>
                <p className="text-sm font-semibold text-foreground truncate">
                  {target.subject}
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="nomination-program"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                Program
              </label>
              <select
                id="nomination-program"
                className="w-full rounded-xl border border-white/10 bg-white/5 text-foreground px-3 py-2.5 text-sm backdrop-blur-sm focus:outline-none focus:border-amber-400/50"
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                data-ocid="recognition.select"
              >
                {PROGRAMS.map((p) => (
                  <option key={p} value={p} className="bg-background">
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="nomination-note"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                Teacher Note
              </label>
              <textarea
                id="nomination-note"
                className="w-full rounded-xl border border-white/10 bg-white/5 text-foreground px-3 py-2.5 text-sm backdrop-blur-sm focus:outline-none focus:border-amber-400/50 resize-none"
                rows={3}
                placeholder="Why is this student ready for nomination?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                data-ocid="recognition.textarea"
              />
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1 border-white/10 text-muted-foreground hover:bg-white/5"
                onClick={onClose}
                data-ocid="recognition.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-amber-500/20 border border-amber-400/50 text-amber-300 hover:bg-amber-500/30"
                data-ocid="recognition.submit_button"
              >
                Submit Nomination
              </Button>
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

function AlertCard({
  alert,
  index,
  onNominate,
}: { alert: RcgnAlert; index: number; onNominate: (t: ModalTarget) => void }) {
  const score = Number(alert.rcgnScore);
  const threshold = Number(alert.threshold);
  const pct =
    threshold > 0 ? Math.min(100, Math.round((score / threshold) * 100)) : 0;
  const typeConfig = ALERT_TYPE_CONFIG[alert.alertType] ?? {
    label: alert.alertType,
    color: "bg-violet-500/20 text-violet-300 border-violet-500/30",
    icon: <Star className="w-3 h-3" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.35, ease: "easeOut" }}
      className="rounded-2xl border border-amber-400/50 bg-amber-900/20 backdrop-blur-lg p-5 space-y-4"
      data-ocid={`recognition.item.${index + 1}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xl font-bold text-amber-300 leading-tight truncate">
            {alert.studentName}
          </p>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <Badge className="bg-white/10 text-foreground/80 border-white/10 text-xs">
              {alert.subject}
            </Badge>
            <Badge
              className={`${typeConfig.color} text-xs flex items-center gap-1`}
            >
              {typeConfig.icon}
              {typeConfig.label}
            </Badge>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-2xl font-bold text-amber-400">{pct}%</p>
          <p className="text-xs text-muted-foreground">of threshold</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>RCGN Score</span>
          <span>
            {score} / {threshold}
          </span>
        </div>
        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{
              delay: index * 0.1 + 0.2,
              duration: 0.6,
              ease: "easeOut",
            }}
          />
        </div>
      </div>

      {alert.nominationReady && (
        <Button
          type="button"
          className="w-full animate-pulse border border-amber-400 bg-amber-500/10 text-amber-300 hover:bg-amber-500/25 hover:animate-none transition-all font-semibold"
          onClick={() =>
            onNominate({
              studentName: alert.studentName,
              subject: alert.subject,
              alertType: alert.alertType,
            })
          }
          data-ocid={`recognition.nominate_button.${index + 1}`}
        >
          <Star className="w-4 h-4 mr-2 fill-amber-400" />
          Nominate Now
          <ChevronRight className="w-4 h-4 ml-auto" />
        </Button>
      )}
    </motion.div>
  );
}

export default function TeacherRecognition() {
  const { data: alerts, isLoading } = useRcgnAlerts();
  const [modalTarget, setModalTarget] = useState<ModalTarget | null>(null);

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #0a0a1a 0%, #0f0a1f 50%, #0a1a14 100%)",
      }}
      data-ocid="recognition.page"
    >
      {/* Header */}
      <div
        className="sticky top-0 z-30 border-b border-white/10 backdrop-blur-xl px-5 py-4"
        style={{ background: "rgba(10,10,26,0.85)" }}
      >
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center flex-shrink-0">
            <Award className="w-5 h-5 text-amber-400" />
          </div>
          <div className="min-w-0">
            <h1 className="text-lg font-bold text-foreground leading-tight">
              Recognition Engine
            </h1>
            <p className="text-xs text-amber-400/80 font-medium">
              Students ready for nomination
            </p>
          </div>
          {alerts.length > 0 && (
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 ml-auto flex-shrink-0">
              {alerts.length} alert{alerts.length !== 1 ? "s" : ""}
            </Badge>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 py-6 space-y-4">
        {isLoading && (
          <div className="space-y-4" data-ocid="recognition.loading_state">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-44 rounded-2xl" />
            ))}
          </div>
        )}

        {!isLoading && alerts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-10 text-center"
            data-ocid="recognition.empty_state"
          >
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-400/20 flex items-center justify-center mx-auto mb-5">
              <Award className="w-8 h-8 text-amber-400/50" />
            </div>
            <p className="text-base font-semibold text-foreground/80">
              No recognition alerts yet
            </p>
            <p className="text-sm text-muted-foreground mt-1.5 max-w-xs mx-auto">
              Your students are building their mastery. Recognition alerts will
              appear here as they reach key thresholds.
            </p>
          </motion.div>
        )}

        {!isLoading &&
          alerts.map((alert, i) => (
            <AlertCard
              key={`${alert.studentId}-${i}`}
              alert={alert}
              index={i}
              onNominate={setModalTarget}
            />
          ))}
      </div>

      <AnimatePresence>
        {modalTarget && (
          <NominationModal
            target={modalTarget}
            onClose={() => setModalTarget(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
