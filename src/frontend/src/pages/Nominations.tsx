import type { NominationRecord, RecognitionFlag } from "@/backend";
import { NominationStatus } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  useAllRecognitionFlags,
  useNominations,
  useSubmitNomination,
} from "@/hooks/use-recognition";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import type { Principal } from "@icp-sdk/core/principal";
import { Link } from "@tanstack/react-router";
import {
  Award,
  CheckCircle,
  ChevronLeft,
  Clock,
  FileText,
  Send,
  Trophy,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const PROGRAMS = ["NSHSS", "UIL", "AMC", "JSHS"];

const STATUS_CONFIG: Record<
  NominationStatus,
  { label: string; color: string; border: string; bg: string }
> = {
  [NominationStatus.submitted]: {
    label: "Submitted",
    color: "text-sky-300",
    border: "border-sky-500/30",
    bg: "bg-sky-500/10",
  },
  [NominationStatus.confirmed]: {
    label: "Confirmed",
    color: "text-emerald-300",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
  },
  [NominationStatus.draft]: {
    label: "Draft",
    color: "text-amber-300",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
  },
};

function NominationHistoryList({
  nominations,
}: { nominations: NominationRecord[] }) {
  if (nominations.length === 0) {
    return (
      <div
        data-ocid="nominations.history.empty_state"
        className="glass rounded-2xl p-8 flex flex-col items-center gap-3 text-center"
      >
        <div className="text-3xl">📋</div>
        <p className="font-display font-semibold text-white/60">
          No nominations submitted yet
        </p>
        <p className="text-xs text-white/30">
          Nominations you submit will appear here.
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {nominations.map((nom, i) => {
        const statusCfg =
          STATUS_CONFIG[nom.status] ?? STATUS_CONFIG[NominationStatus.draft];
        return (
          <motion.div
            key={nom.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            data-ocid={`nominations.history_item.${i + 1}`}
            className="glass-sm rounded-xl p-4 flex items-start gap-4"
          >
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-amber-500/25"
              style={{ background: "rgba(251,191,36,0.10)" }}
            >
              <FileText
                className="h-4 w-4"
                style={{ color: "rgb(251,191,36)" }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <p className="font-display font-semibold text-sm text-white/85 truncate">
                  {nom.programName}
                </p>
                <Badge
                  className={`shrink-0 text-xs font-mono border ${statusCfg.border} ${statusCfg.bg} ${statusCfg.color}`}
                >
                  {statusCfg.label}
                </Badge>
              </div>
              {nom.teacherNote && (
                <p className="text-xs text-white/50 leading-relaxed truncate">
                  “{nom.teacherNote}”
                </p>
              )}
              <p className="text-[10px] text-white/30 font-mono mt-1.5">
                {new Date(
                  Number(nom.submittedAt) / 1_000_000,
                ).toLocaleDateString()}{" "}
                · ID: {nom.id.slice(0, 8)}…
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function FlagRow({
  flag,
  index,
  onNominate,
}: {
  flag: RecognitionFlag;
  index: number;
  onNominate: (flag: RecognitionFlag) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      data-ocid={`nominations.flag_row.${index + 1}`}
      className="rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(251,191,36,0.07) 0%, rgba(12,14,28,0.80) 100%)",
        border: "1px solid rgba(251,191,36,0.18)",
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
      }}
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
        style={{
          background: "rgba(251,191,36,0.15)",
          border: "1px solid rgba(251,191,36,0.28)",
        }}
      >
        <Trophy className="h-5 w-5" style={{ color: "rgb(251,191,36)" }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <p className="font-display font-semibold text-sm text-white/90">
            {flag.studentId.toString().slice(0, 16)}…
          </p>
          <Badge
            variant="outline"
            className="text-[9px] font-mono"
            style={{
              borderColor: "rgba(251,191,36,0.25)",
              color: "rgb(253,224,130)",
            }}
          >
            {flag.subject}
          </Badge>
          <Badge
            variant="outline"
            className="text-[9px] font-mono border-violet-500/30 text-violet-300"
          >
            {flag.pattern}
          </Badge>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {flag.eligiblePrograms.slice(0, 3).map((prog) => (
            <span
              key={prog.name}
              className="inline-flex items-center rounded-md px-1.5 py-0.5 text-[9px] font-mono"
              style={{
                background: "rgba(251,191,36,0.08)",
                border: "1px solid rgba(251,191,36,0.18)",
                color: "rgb(253,224,130)",
              }}
            >
              {prog.name}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span
          className="font-mono text-sm font-bold"
          style={{ color: "rgb(251,191,36)" }}
        >
          {Number(flag.masteryScore)}%
        </span>
        <Button
          type="button"
          size="sm"
          data-ocid={`nominations.nominate_button.${index + 1}`}
          onClick={() => onNominate(flag)}
          className="text-xs h-8 px-3 gap-1.5"
          style={{
            background:
              "linear-gradient(135deg, rgb(234,179,8), rgb(161,98,7))",
            color: "rgb(0,0,0)",
            border: "none",
            boxShadow: "0 0 12px rgba(251,191,36,0.25)",
          }}
        >
          <Send className="h-3 w-3" /> Nominate
        </Button>
      </div>
    </motion.div>
  );
}

export default function NominationsPage() {
  const { identity } = useInternetIdentity();
  const principal = identity?.getPrincipal() ?? null;
  const [activeTab, setActiveTab] = useState("flags");
  const [selectedFlag, setSelectedFlag] = useState<RecognitionFlag | null>(
    null,
  );
  const [selectedProgram, setSelectedProgram] = useState("");
  const [teacherNote, setTeacherNote] = useState("");
  const [confirmedNom, setConfirmedNom] = useState<NominationRecord | null>(
    null,
  );

  const { data: flags = [], isLoading: flagsLoading } =
    useAllRecognitionFlags();
  const { data: nominations = [], isLoading: nominationsLoading } =
    useNominations(principal);
  const submitNomination = useSubmitNomination();

  async function handleSubmit() {
    if (!selectedFlag || !selectedProgram) return;
    try {
      const result = await submitNomination.mutateAsync({
        studentId: selectedFlag.studentId as Principal,
        programName: selectedProgram,
        teacherNote,
      });
      setConfirmedNom(result);
      setSelectedFlag(null);
      setSelectedProgram("");
      setTeacherNote("");
      toast.success(`Nomination submitted — ${selectedProgram}`);
    } catch {
      toast.error("Failed to submit nomination");
    }
  }

  return (
    <div
      data-ocid="nominations.page"
      className="portal-enter min-h-screen max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6"
    >
      <div className="space-y-4">
        <Link
          to="/teacher"
          data-ocid="nominations.back_link"
          className="inline-flex items-center gap-2 text-xs font-mono text-white/40 hover:text-white/70 transition-colors"
        >
          <ChevronLeft className="h-3.5 w-3.5" /> Back to Teacher Dashboard
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-6 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(251,191,36,0.11) 0%, rgba(12,14,28,0.85) 100%)",
            border: "1px solid rgba(251,191,36,0.22)",
            boxShadow:
              "0 16px 64px rgba(0,0,0,0.50), inset 0 1px 0 rgba(251,191,36,0.08)",
            backdropFilter: "blur(24px) saturate(200%)",
            WebkitBackdropFilter: "blur(24px) saturate(200%)",
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
              style={{
                background: "rgba(251,191,36,0.18)",
                border: "1px solid rgba(251,191,36,0.35)",
                boxShadow: "0 0 20px rgba(251,191,36,0.20)",
              }}
            >
              <Users className="h-6 w-6" style={{ color: "rgb(251,191,36)" }} />
            </div>
            <div>
              <p
                className="font-mono text-[9px] font-bold uppercase tracking-widest mb-0.5"
                style={{ color: "rgb(251,191,36)" }}
              >
                NOMS · Nomination Engine
              </p>
              <h1 className="font-display text-xl font-black text-white/95">
                Student Nominations
              </h1>
              <p className="text-xs text-white/50">
                Review flagged students and submit national program nominations
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        data-ocid="nominations.tabs"
      >
        <TabsList className="glass-sm border border-white/[0.08] mb-6">
          <TabsTrigger
            value="flags"
            data-ocid="nominations.flags_tab"
            className="gap-2 text-xs"
          >
            <Trophy className="h-3.5 w-3.5" />
            Flagged Students
            {!flagsLoading && flags.length > 0 && (
              <Badge
                className="font-mono text-[9px] border ml-1"
                style={{
                  background: "rgba(251,191,36,0.15)",
                  borderColor: "rgba(251,191,36,0.25)",
                  color: "rgb(251,191,36)",
                }}
              >
                {flags.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="history"
            data-ocid="nominations.history_tab"
            className="gap-2 text-xs"
          >
            <Clock className="h-3.5 w-3.5" /> History
          </TabsTrigger>
        </TabsList>
        <TabsContent value="flags" className="space-y-3 mt-0">
          {flagsLoading ? (
            <div
              data-ocid="nominations.flags_tab.loading_state"
              className="space-y-3"
            >
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 rounded-2xl" />
              ))}
            </div>
          ) : flags.length === 0 ? (
            <div
              data-ocid="nominations.flags_tab.empty_state"
              className="glass rounded-2xl p-10 flex flex-col items-center gap-4 text-center"
            >
              <div className="text-4xl">🔍</div>
              <div>
                <p className="font-display font-semibold text-white/70">
                  No students flagged for recognition yet
                </p>
                <p className="text-sm text-white/40 mt-1">
                  The RCGN engine automatically flags students with exceptional
                  performance patterns.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {flags.map((flag, i) => (
                <FlagRow
                  key={flag.id}
                  flag={flag}
                  index={i}
                  onNominate={setSelectedFlag}
                />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="history" className="mt-0">
          {nominationsLoading ? (
            <div
              data-ocid="nominations.history_tab.loading_state"
              className="space-y-3"
            >
              {[1, 2].map((i) => (
                <Skeleton key={i} className="h-20 rounded-xl" />
              ))}
            </div>
          ) : (
            <NominationHistoryList nominations={nominations} />
          )}
        </TabsContent>
      </Tabs>

      <Dialog
        open={!!selectedFlag}
        onOpenChange={(open) => !open && setSelectedFlag(null)}
      >
        <DialogContent
          data-ocid="nominations.nominate_dialog"
          className="sm:max-w-md border-0"
          style={{
            background: "rgba(8,6,20,0.96)",
            backdropFilter: "blur(24px) saturate(200%)",
            border: "1px solid rgba(251,191,36,0.20)",
            boxShadow: "0 32px 96px rgba(0,0,0,0.70)",
          }}
        >
          <DialogHeader>
            <DialogTitle
              className="font-display text-lg"
              style={{ color: "rgb(251,191,36)" }}
            >
              <Award className="inline h-5 w-5 mr-2 -mt-0.5" /> Submit
              Nomination
            </DialogTitle>
          </DialogHeader>
          {selectedFlag && (
            <div className="space-y-5 pt-1">
              <div
                className="rounded-xl p-3"
                style={{
                  background: "rgba(251,191,36,0.08)",
                  border: "1px solid rgba(251,191,36,0.18)",
                }}
              >
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">
                  Student
                </p>
                <p className="text-sm font-semibold text-white/80 font-mono">
                  {selectedFlag.studentId.toString().slice(0, 20)}…
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <Badge
                    variant="outline"
                    className="text-[9px] font-mono"
                    style={{
                      borderColor: "rgba(251,191,36,0.25)",
                      color: "rgb(253,224,130)",
                    }}
                  >
                    {selectedFlag.subject}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-[9px] font-mono border-violet-500/30 text-violet-300"
                  >
                    {selectedFlag.pattern}
                  </Badge>
                  <span
                    className="text-xs font-mono font-bold"
                    style={{ color: "rgb(251,191,36)" }}
                  >
                    {Number(selectedFlag.masteryScore)}%
                  </span>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-white/50">Program</Label>
                <Select
                  value={selectedProgram}
                  onValueChange={setSelectedProgram}
                >
                  <SelectTrigger
                    data-ocid="nominations.program_select"
                    className="glass-sm border-0"
                  >
                    <SelectValue placeholder="Select program" />
                  </SelectTrigger>
                  <SelectContent className="glass-xl border-0">
                    {(selectedFlag.eligiblePrograms.length > 0
                      ? selectedFlag.eligiblePrograms.map((p) => p.name)
                      : PROGRAMS
                    ).map((prog) => (
                      <SelectItem key={prog} value={prog}>
                        {prog}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="teacher-note" className="text-xs text-white/50">
                  Teacher Note
                </Label>
                <Textarea
                  id="teacher-note"
                  data-ocid="nominations.teacher_note_textarea"
                  placeholder="Add context or recommendation for this nomination..."
                  value={teacherNote}
                  onChange={(e) => setTeacherNote(e.target.value)}
                  rows={4}
                  className="glass-sm border-0 resize-none text-sm"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  data-ocid="nominations.cancel_button"
                  className="flex-1 text-xs"
                  onClick={() => setSelectedFlag(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  data-ocid="nominations.submit_button"
                  disabled={!selectedProgram || submitNomination.isPending}
                  onClick={handleSubmit}
                  className="flex-1 text-xs gap-1.5"
                  style={{
                    background: selectedProgram
                      ? "linear-gradient(135deg, rgb(234,179,8), rgb(161,98,7))"
                      : undefined,
                    color: selectedProgram ? "rgb(0,0,0)" : undefined,
                    border: "none",
                  }}
                >
                  <Send className="h-3.5 w-3.5" />
                  {submitNomination.isPending
                    ? "Submitting…"
                    : "Submit Nomination"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AnimatePresence>
        {confirmedNom && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            data-ocid="nominations.success_state"
            className="fixed bottom-6 right-6 z-50 max-w-sm rounded-2xl p-5 flex items-start gap-4"
            style={{
              background: "rgba(6,18,8,0.96)",
              border: "1px solid rgba(100,230,150,0.30)",
              boxShadow: "0 16px 64px rgba(0,0,0,0.60)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            <CheckCircle className="h-6 w-6 text-emerald-400 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="font-display font-bold text-sm text-white/90">
                Nomination Submitted
              </p>
              <p className="text-xs text-white/60 mt-0.5">
                {confirmedNom.programName} for{" "}
                {confirmedNom.studentId.toString().slice(0, 12)}…
              </p>
            </div>
            <button
              type="button"
              data-ocid="nominations.success_close_button"
              onClick={() => setConfirmedNom(null)}
              className="text-white/30 hover:text-white/70 transition-colors text-lg leading-none"
              aria-label="Close confirmation"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
