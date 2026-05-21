import { useSubmitFeedback } from "@/hooks/use-feedback";
import { AlertCircle, MessageCircle, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type Severity = "INFO" | "BUG" | "CRITICAL";

interface FeedbackResult {
  id: string;
  eddiResponse: string;
  itEscalated: boolean;
  proposedFix?: string;
}

const SEVERITY_STYLES: Record<Severity, string> = {
  INFO: "border-teal-400/60 text-teal-300 bg-teal-400/10",
  BUG: "border-amber-500/60 text-amber-300 bg-amber-500/10",
  CRITICAL: "border-red-500/60 text-red-300 bg-red-500/10",
};

function parseEddiPaths(response: string) {
  const cogtIdx = response.indexOf("COGT path:");
  const metaIdx = response.indexOf("META path:");
  const autnIdx = response.indexOf("AUTN path:");

  if (cogtIdx === -1 && metaIdx === -1 && autnIdx === -1) {
    return [{ label: "EDDI", color: "text-teal-300", text: response }];
  }

  const parts: { label: string; color: string; text: string }[] = [];

  if (cogtIdx !== -1) {
    const end =
      metaIdx !== -1 ? metaIdx : autnIdx !== -1 ? autnIdx : response.length;
    parts.push({
      label: "COGT",
      color: "text-teal-300",
      text: response.slice(cogtIdx + 10, end).trim(),
    });
  }
  if (metaIdx !== -1) {
    const end = autnIdx !== -1 ? autnIdx : response.length;
    parts.push({
      label: "META",
      color: "text-yellow-300",
      text: response.slice(metaIdx + 10, end).trim(),
    });
  }
  if (autnIdx !== -1) {
    parts.push({
      label: "AUTN",
      color: "text-violet-300",
      text: response.slice(autnIdx + 10).trim(),
    });
  }

  return parts;
}

export function FeedbackPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [severity, setSeverity] = useState<Severity>("INFO");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<FeedbackResult | null>(null);
  const mutation = useSubmitFeedback();

  function handleSubmit() {
    if (!message.trim()) return;
    mutation.mutate(
      { message, severity },
      {
        onSuccess: (data) => {
          const raw = data as {
            id?: string;
            eddiResponse?: string;
            itEscalated?: boolean;
            proposedFix?: string;
          };
          setResult({
            id: raw.id ?? "unknown",
            eddiResponse: raw.eddiResponse ?? "EDDI processed your feedback.",
            itEscalated: raw.itEscalated ?? false,
            proposedFix: raw.proposedFix,
          });
          setMessage("");
        },
      },
    );
  }

  const eddiPaths = result ? parseEddiPaths(result.eddiResponse) : [];

  return (
    <>
      {/* Trigger pill */}
      <motion.button
        data-ocid="feedback.open_modal_button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => {
          setIsOpen((v) => !v);
          setResult(null);
        }}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full backdrop-blur-md bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:border-yellow-400/40 hover:text-white transition-all duration-200 shadow-lg"
        aria-label="Open feedback panel"
      >
        <MessageCircle className="w-4 h-4 text-yellow-400" />
        Feedback
      </motion.button>

      {/* Expanded panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="feedback-panel"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-5 z-50 w-[300px]"
          >
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col gap-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-400" />
                  <span className="text-white/90 text-sm font-semibold">
                    EDDI Feedback Engine
                  </span>
                </div>
                <button
                  type="button"
                  data-ocid="feedback.close_button"
                  onClick={() => setIsOpen(false)}
                  className="text-white/40 hover:text-white/80 transition-colors"
                  aria-label="Close feedback panel"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Severity selector */}
              <div className="flex gap-2">
                {(["INFO", "BUG", "CRITICAL"] as Severity[]).map((s) => (
                  <button
                    type="button"
                    key={s}
                    data-ocid={`feedback.severity.${s.toLowerCase()}`}
                    onClick={() => setSeverity(s)}
                    className={`flex-1 text-xs py-1 rounded-full border font-mono transition-all duration-150 ${
                      severity === s
                        ? SEVERITY_STYLES[s]
                        : "border-white/10 text-white/40 bg-white/5 hover:border-white/20"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Textarea */}
              <textarea
                data-ocid="feedback.textarea"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe what you experienced..."
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white/80 placeholder:text-white/30 resize-none focus:outline-none focus:border-yellow-400/40 transition-colors"
              />

              {/* Submit */}
              <motion.button
                data-ocid="feedback.submit_button"
                whileTap={{ scale: 0.97 }}
                disabled={mutation.isPending || !message.trim()}
                onClick={handleSubmit}
                className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 text-sm font-medium hover:bg-yellow-400/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {mutation.isPending ? (
                  <span className="animate-pulse">Routing to EDDI…</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Route to EDDI
                  </>
                )}
              </motion.button>

              {/* Result */}
              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex flex-col gap-2 overflow-hidden"
                  >
                    {/* EDDI paths */}
                    {eddiPaths.map((p) => (
                      <div
                        key={p.label}
                        className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-3"
                      >
                        <span
                          className={`text-xs font-mono font-semibold ${p.color}`}
                        >
                          {p.label} path
                        </span>
                        <p className="text-white/70 text-xs mt-1 leading-relaxed">
                          {p.text}
                        </p>
                      </div>
                    ))}

                    {/* IT escalation badge */}
                    {result.itEscalated && (
                      <span
                        className="text-xs bg-red-500/20 border border-red-500/30 text-red-300 px-3 py-1 rounded-full text-center"
                        data-ocid="feedback.error_state"
                      >
                        Escalated to IT
                      </span>
                    )}

                    {/* Proposed fix */}
                    {result.proposedFix && (
                      <div
                        className="backdrop-blur-sm bg-yellow-400/5 border border-yellow-400/20 rounded-xl p-3"
                        data-ocid="feedback.success_state"
                      >
                        <span className="text-xs font-mono text-yellow-300 font-semibold">
                          Proposed Fix
                        </span>
                        <p className="text-white/70 text-xs mt-1 leading-relaxed">
                          {result.proposedFix}
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
