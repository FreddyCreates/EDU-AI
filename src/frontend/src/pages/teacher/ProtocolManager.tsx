import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  kindLabel,
  statusLabel,
  useActivateProtocol,
  useAssignProtocol,
  useCompleteProtocol,
  useLearningProtocols,
  useMyProtocolAssignments,
  type LearningProtocol,
  type ProtocolAssignment,
} from "@/hooks/use-protocol";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, CheckCircle, Clock, Play, Plus, Users } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const KIND_COLORS: Record<string, string> = {
  socratic:
    "bg-[oklch(0.72_0.17_155)]/20 text-[oklch(0.72_0.17_155)] border-[oklch(0.72_0.17_155)]/30",
  thinkPairShare:
    "bg-[oklch(0.76_0.18_84)]/20 text-[oklch(0.76_0.18_84)] border-[oklch(0.76_0.18_84)]/30",
  jigsaw:
    "bg-[oklch(0.65_0.22_200)]/20 text-[oklch(0.65_0.22_200)] border-[oklch(0.65_0.22_200)]/30",
  galleryWalk:
    "bg-[oklch(0.7_0.18_320)]/20 text-[oklch(0.7_0.18_320)] border-[oklch(0.7_0.18_320)]/30",
  fibonacci:
    "bg-[oklch(0.68_0.20_40)]/20 text-[oklch(0.68_0.20_40)] border-[oklch(0.68_0.20_40)]/30",
  closeReading:
    "bg-[oklch(0.7_0.18_270)]/20 text-[oklch(0.7_0.18_270)] border-[oklch(0.7_0.18_270)]/30",
};

const STATUS_COLORS: Record<string, string> = {
  Pending:
    "bg-[oklch(0.40_0.06_280)]/30 text-[oklch(0.60_0.05_280)] border-[oklch(0.40_0.06_280)]/40",
  Active:
    "bg-[oklch(0.72_0.17_155)]/20 text-[oklch(0.72_0.17_155)] border-[oklch(0.72_0.17_155)]/30",
  Completed:
    "bg-[oklch(0.76_0.18_84)]/20 text-[oklch(0.76_0.18_84)] border-[oklch(0.76_0.18_84)]/30",
  Cancelled:
    "bg-[oklch(0.40_0.06_280)]/20 text-[oklch(0.50_0.05_280)] border-[oklch(0.40_0.06_280)]/30",
};

function kindKey(kind: LearningProtocol["kind"]): string {
  return Object.keys(kind)[0] ?? "socratic";
}

function ProtocolCard({
  protocol,
  onAssign,
}: {
  protocol: LearningProtocol;
  onAssign: (p: LearningProtocol) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const kKey = kindKey(protocol.kind);
  const colorClass = KIND_COLORS[kKey] ?? KIND_COLORS.socratic;

  return (
    <motion.div
      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 flex flex-col gap-3"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-white/90 font-semibold text-base">
              {protocol.name}
            </span>
            <Badge className={`text-xs border ${colorClass}`}>
              {kindLabel(protocol.kind)}
            </Badge>
            <Badge className="text-xs border border-white/10 bg-white/5 text-white/50">
              {protocol.gradeRange}
            </Badge>
            <Badge className="text-xs border border-white/10 bg-white/5 text-white/50">
              {Number(protocol.totalMinutes)} min
            </Badge>
          </div>
          <p className="text-white/60 text-sm">{protocol.description}</p>
        </div>
        <Button
          size="sm"
          className="shrink-0 bg-[oklch(0.72_0.17_155)]/20 border border-[oklch(0.72_0.17_155)]/40 text-[oklch(0.72_0.17_155)] hover:bg-[oklch(0.72_0.17_155)]/30"
          onClick={() => onAssign(protocol)}
        >
          <Plus className="h-3 w-3 mr-1" />
          Assign
        </Button>
      </div>

      <button
        className="text-xs text-white/40 hover:text-white/60 text-left flex items-center gap-1"
        onClick={() => setExpanded((p) => !p)}
      >
        <BookOpen className="h-3 w-3" />
        {expanded ? "Hide" : "View"} {protocol.steps.length} steps
      </button>

      {expanded && (
        <div className="flex flex-col gap-2 mt-1">
          {protocol.steps.map((step) => (
            <div
              key={Number(step.stepNum)}
              className="flex gap-3 items-start rounded-xl border border-white/8 bg-white/3 px-3 py-2"
            >
              <span className="shrink-0 text-xs font-mono text-white/40 mt-0.5 w-5">
                {Number(step.stepNum)}.
              </span>
              <div className="flex flex-col gap-0.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[oklch(0.72_0.17_155)] font-medium">
                    {step.role}
                  </span>
                  <span className="text-xs text-white/40 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {Number(step.durationMinutes)} min
                  </span>
                </div>
                <p className="text-xs text-white/60">{step.instruction}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function AssignmentRow({
  assignment,
  onActivate,
  onComplete,
}: {
  assignment: ProtocolAssignment;
  onActivate: (id: string) => void;
  onComplete: (id: string) => void;
}) {
  const label = statusLabel(assignment.status);
  const colorClass = STATUS_COLORS[label] ?? STATUS_COLORS.Pending;

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-white/3 px-4 py-3">
      <div className="flex flex-col gap-0.5">
        <span className="text-sm text-white/80 font-medium">
          {assignment.protocolId.replace("PROT-", "").replace(/-/g, " ")}
        </span>
        <span className="text-xs text-white/40">
          Class: {assignment.classId} · Topic: {assignment.topicId}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Badge className={`text-xs border ${colorClass}`}>{label}</Badge>
        {"pending" in assignment.status && (
          <Button
            size="sm"
            variant="ghost"
            className="text-xs text-[oklch(0.72_0.17_155)] border border-[oklch(0.72_0.17_155)]/30 h-7"
            onClick={() => onActivate(assignment.id)}
          >
            <Play className="h-3 w-3 mr-1" />
            Start
          </Button>
        )}
        {"active" in assignment.status && (
          <Button
            size="sm"
            variant="ghost"
            className="text-xs text-[oklch(0.76_0.18_84)] border border-[oklch(0.76_0.18_84)]/30 h-7"
            onClick={() => onComplete(assignment.id)}
          >
            <CheckCircle className="h-3 w-3 mr-1" />
            Complete
          </Button>
        )}
      </div>
    </div>
  );
}

function AssignModal({
  protocol,
  onClose,
  onSubmit,
}: {
  protocol: LearningProtocol;
  onClose: () => void;
  onSubmit: (classId: string, topicId: string) => void;
}) {
  const [classId, setClassId] = useState("");
  const [topicId, setTopicId] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <motion.div
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-[oklch(0.1_0.012_260)] p-6 flex flex-col gap-5"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div>
          <p className="text-white/90 font-semibold text-lg">
            Assign Protocol
          </p>
          <p className="text-white/50 text-sm mt-1">{protocol.name}</p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-white/50">Class ID</label>
            <input
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 placeholder-white/30 outline-none focus:border-[oklch(0.72_0.17_155)]/60"
              placeholder="e.g. ALG2-PD3"
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-white/50">Topic / Lesson</label>
            <input
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 placeholder-white/30 outline-none focus:border-[oklch(0.72_0.17_155)]/60"
              placeholder="e.g. quadratic-equations"
              value={topicId}
              onChange={(e) => setTopicId(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            className="flex-1 bg-[oklch(0.72_0.17_155)]/20 border border-[oklch(0.72_0.17_155)]/40 text-[oklch(0.72_0.17_155)] hover:bg-[oklch(0.72_0.17_155)]/30"
            disabled={!classId || !topicId}
            onClick={() => onSubmit(classId, topicId)}
          >
            Assign
          </Button>
          <Button
            variant="ghost"
            className="flex-1 text-white/50 border border-white/10"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProtocolManager() {
  const { data: protocols = [], isLoading: loadingProtocols } =
    useLearningProtocols();
  const { data: assignments = [], isLoading: loadingAssignments } =
    useMyProtocolAssignments();
  const assign = useAssignProtocol();
  const activate = useActivateProtocol();
  const complete = useCompleteProtocol();

  const [assignTarget, setAssignTarget] = useState<LearningProtocol | null>(
    null,
  );

  function handleAssign(classId: string, topicId: string) {
    if (!assignTarget) return;
    assign.mutate(
      { protocolId: assignTarget.id, classId, topicId },
      { onSuccess: () => setAssignTarget(null) },
    );
  }

  return (
    <div className="min-h-screen bg-[oklch(0.07_0.01_260)] px-4 py-8 pb-24">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Link to="/teacher">
            <Button
              variant="ghost"
              size="sm"
              className="text-white/50 hover:text-white/80 border border-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-white/90 font-semibold text-xl">
              Protocol Manager
            </h1>
            <p className="text-white/40 text-sm">
              Sovereign instructional protocols for sovereign classrooms
            </p>
          </div>
        </div>

        {/* Protocol library */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-white/60 text-sm font-medium">
            <Users className="h-4 w-4" />
            Protocol Library
          </div>
          {loadingProtocols ? (
            <div className="text-white/30 text-sm text-center py-8">
              Loading protocols…
            </div>
          ) : protocols.length === 0 ? (
            <div className="text-white/30 text-sm text-center py-8">
              No protocols available yet.
            </div>
          ) : (
            protocols.map((p) => (
              <ProtocolCard
                key={p.id}
                protocol={p}
                onAssign={setAssignTarget}
              />
            ))
          )}
        </section>

        {/* My assignments */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-white/60 text-sm font-medium">
            <BookOpen className="h-4 w-4" />
            My Assignments
          </div>
          {loadingAssignments ? (
            <div className="text-white/30 text-sm text-center py-4">
              Loading…
            </div>
          ) : assignments.length === 0 ? (
            <div className="rounded-xl border border-white/8 bg-white/3 px-4 py-6 text-center text-sm text-white/30">
              No protocol assignments yet. Assign a protocol above to get
              started.
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {assignments.map((a) => (
                <AssignmentRow
                  key={a.id}
                  assignment={a}
                  onActivate={(id) => activate.mutate(id)}
                  onComplete={(id) => complete.mutate(id)}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Assign modal */}
      {assignTarget && (
        <AssignModal
          protocol={assignTarget}
          onClose={() => setAssignTarget(null)}
          onSubmit={handleAssign}
        />
      )}
    </div>
  );
}
