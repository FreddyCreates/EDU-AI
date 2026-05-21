import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Shield } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const moodLabels: Record<number, string> = {
  1: "Really struggling",
  2: "Very low",
  3: "Low",
  4: "Below average",
  5: "Okay",
  6: "Neutral",
  7: "Decent",
  8: "Good",
  9: "Pretty good",
  10: "Great",
  11: "Very good",
  12: "Excellent",
  13: "At my best",
};

const moodColor = (score: number) => {
  if (score <= 4) return "oklch(0.65_0.22_30)";
  if (score <= 7) return "oklch(0.85_0.15_85)";
  if (score <= 10) return "oklch(0.7_0.18_150)";
  return "oklch(0.7_0.18_270)";
};

export default function MentalHealthCheckIn() {
  const [mood, setMood] = useState(8);
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => setSubmitted(true);

  return (
    <div
      data-ocid="student.mentalhealth.page"
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
            Wellness Check-In
          </h1>
          <p className="text-[oklch(0.5_0.06_265)] text-xs">
            Anonymous · No identity stored
          </p>
        </div>
      </div>

      {/* Privacy Notice */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[oklch(0.7_0.18_270)]/10 border border-[oklch(0.7_0.18_270)]/20 rounded-xl p-4 mb-8 flex items-start gap-3"
      >
        <Shield className="w-5 h-5 text-[oklch(0.7_0.18_270)] shrink-0 mt-0.5" />
        <p className="text-[oklch(0.7_0.08_265)] text-sm">
          Your check-in is{" "}
          <strong className="text-[oklch(0.85_0.05_265)]">
            completely anonymous
          </strong>
          . No name, no ID, and no identity is stored with your response. Only
          aggregated, anonymous trends are used to support school wellness
          programs.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
          >
            {/* Mood Scale */}
            <section className="mb-8">
              <h2 className="text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-2">
                How are you feeling today?
              </h2>
              <p className="text-[oklch(0.5_0.06_265)] text-xs mb-6">
                Fibonacci-scale: 1 – 13 · F(
                {[1, 1, 2, 3, 5, 8, 13].includes(mood) ? "Fib" : mood}) = {mood}
              </p>

              {/* Mood Display */}
              <div className="text-center mb-8">
                <motion.div
                  key={mood}
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-7xl mb-4"
                >
                  {mood <= 3
                    ? "😔"
                    : mood <= 5
                      ? "😕"
                      : mood <= 7
                        ? "😐"
                        : mood <= 10
                          ? "🙂"
                          : "😄"}
                </motion.div>
                <p
                  className="font-semibold text-lg"
                  style={{ color: moodColor(mood) }}
                >
                  {moodLabels[mood]}
                </p>
                <p className="text-[oklch(0.5_0.06_265)] text-sm mt-1">
                  {mood} / 13
                </p>
              </div>

              {/* Slider */}
              <div className="px-2">
                <input
                  data-ocid="student.mentalhealth.mood_slider"
                  type="range"
                  min={1}
                  max={13}
                  step={1}
                  value={mood}
                  onChange={(e) => setMood(Number(e.target.value))}
                  className="w-full h-3 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(90deg, ${moodColor(mood)} ${((mood - 1) / 12) * 100}%, oklch(1_0_0/0.1) ${((mood - 1) / 12) * 100}%)`,
                  }}
                />
                <div className="flex justify-between text-[oklch(0.4_0.05_265)] text-xs mt-2">
                  <span>1</span>
                  <span>Fibonacci-gated wellness scale</span>
                  <span>13</span>
                </div>
              </div>
            </section>

            {/* Optional Note */}
            <section className="mb-8">
              <h2 className="text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-3">
                Optional: Anything on your mind? (anonymous)
              </h2>
              <textarea
                data-ocid="student.mentalhealth.note_input"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Share anything you want, or leave blank..."
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[oklch(0.8_0.05_265)] text-sm placeholder:text-[oklch(0.4_0.05_265)] focus:outline-none focus:border-[oklch(0.85_0.15_85)]/40 resize-none transition-colors"
              />
            </section>

            <Button
              type="button"
              data-ocid="student.mentalhealth.submit_button"
              onClick={handleSubmit}
              className="w-full py-6 text-base font-semibold bg-[oklch(0.85_0.15_85)]/20 hover:bg-[oklch(0.85_0.15_85)]/30 text-[oklch(0.85_0.15_85)] border border-[oklch(0.85_0.15_85)]/30"
            >
              Submit Check-In
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
            data-ocid="student.mentalhealth.success_state"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              className="w-20 h-20 rounded-full bg-[oklch(0.7_0.18_150)]/20 flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="w-10 h-10 text-[oklch(0.7_0.18_150)]" />
            </motion.div>
            <h2 className="text-2xl font-bold text-[oklch(0.95_0.02_265)] mb-3">
              Check-In Received
            </h2>
            <p className="text-[oklch(0.6_0.06_265)] max-w-xs mx-auto text-sm">
              Your anonymous wellness check-in has been recorded. Thank you for
              taking a moment for yourself.
            </p>
            <p className="text-[oklch(0.5_0.05_265)] text-xs mt-4">
              No identity stored · LEX_SOVEREIGNUS enforced
            </p>
            <Button
              type="button"
              data-ocid="student.mentalhealth.done_button"
              onClick={() => {
                setSubmitted(false);
                setNote("");
                setMood(8);
              }}
              className="mt-8 bg-white/5 border border-white/10 hover:bg-white/10 text-[oklch(0.7_0.08_265)]"
            >
              Check In Again
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
