import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface ProtocolStep {
  stepNum: bigint;
  role: string;
  instruction: string;
  durationMinutes: bigint;
}

export type ProtocolKind =
  | { socratic: null }
  | { thinkPairShare: null }
  | { jigsaw: null }
  | { galleryWalk: null }
  | { fibonacci: null }
  | { closeReading: null };

export interface LearningProtocol {
  id: string;
  name: string;
  kind: ProtocolKind;
  description: string;
  steps: ProtocolStep[];
  totalMinutes: bigint;
  gradeRange: string;
  subjectFit: string[];
}

export type AssignmentStatus =
  | { pending: null }
  | { active: null }
  | { completed: null }
  | { cancelled: null };

export interface ProtocolAssignment {
  id: string;
  protocolId: string;
  teacherId: unknown;
  classId: string;
  topicId: string;
  status: AssignmentStatus;
  assignedAt: bigint;
  scheduledFor: [] | [bigint];
  completedAt: [] | [bigint];
  notes: [] | [string];
}

type BackendWithProtocol = {
  getLearningProtocols?: () => Promise<LearningProtocol[]>;
  getLearningProtocol?: (
    protocolId: string,
  ) => Promise<[] | [LearningProtocol]>;
  assignLearningProtocol?: (
    protocolId: string,
    classId: string,
    topicId: string,
    scheduledFor: [] | [bigint],
    notes: [] | [string],
  ) => Promise<string>;
  getClassProtocolAssignments?: (
    classId: string,
  ) => Promise<ProtocolAssignment[]>;
  getMyProtocolAssignments?: () => Promise<ProtocolAssignment[]>;
  activateProtocolAssignment?: (assignmentId: string) => Promise<boolean>;
  completeProtocolAssignment?: (assignmentId: string) => Promise<boolean>;
};

export function useLearningProtocols() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<LearningProtocol[]>({
    queryKey: ["learningProtocols"],
    queryFn: async () => {
      if (!actor) return [];
      const a = actor as unknown as BackendWithProtocol;
      if (typeof a.getLearningProtocols === "function") {
        return await a.getLearningProtocols();
      }
      return [];
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMyProtocolAssignments() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ProtocolAssignment[]>({
    queryKey: ["myProtocolAssignments"],
    queryFn: async () => {
      if (!actor) return [];
      const a = actor as unknown as BackendWithProtocol;
      if (typeof a.getMyProtocolAssignments === "function") {
        return await a.getMyProtocolAssignments();
      }
      return [];
    },
    enabled: !!actor && !isFetching,
  });
}

export function useClassProtocolAssignments(classId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ProtocolAssignment[]>({
    queryKey: ["classProtocolAssignments", classId],
    queryFn: async () => {
      if (!actor || !classId) return [];
      const a = actor as unknown as BackendWithProtocol;
      if (typeof a.getClassProtocolAssignments === "function") {
        return await a.getClassProtocolAssignments(classId);
      }
      return [];
    },
    enabled: !!actor && !isFetching && !!classId,
  });
}

export function useAssignProtocol() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<
    string | null,
    Error,
    {
      protocolId: string;
      classId: string;
      topicId: string;
      scheduledFor?: bigint;
      notes?: string;
    }
  >({
    mutationFn: async ({ protocolId, classId, topicId, scheduledFor, notes }) => {
      if (!actor) return null;
      const a = actor as unknown as BackendWithProtocol;
      if (typeof a.assignLearningProtocol === "function") {
        return await a.assignLearningProtocol(
          protocolId,
          classId,
          topicId,
          scheduledFor != null ? [scheduledFor] : [],
          notes != null ? [notes] : [],
        );
      }
      return null;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myProtocolAssignments"] });
    },
  });
}

export function useActivateProtocol() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<boolean, Error, string>({
    mutationFn: async (assignmentId) => {
      if (!actor) return false;
      const a = actor as unknown as BackendWithProtocol;
      if (typeof a.activateProtocolAssignment === "function") {
        return await a.activateProtocolAssignment(assignmentId);
      }
      return false;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myProtocolAssignments"] });
    },
  });
}

export function useCompleteProtocol() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<boolean, Error, string>({
    mutationFn: async (assignmentId) => {
      if (!actor) return false;
      const a = actor as unknown as BackendWithProtocol;
      if (typeof a.completeProtocolAssignment === "function") {
        return await a.completeProtocolAssignment(assignmentId);
      }
      return false;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myProtocolAssignments"] });
    },
  });
}

export function kindLabel(kind: ProtocolKind): string {
  if ("socratic" in kind) return "Socratic Seminar";
  if ("thinkPairShare" in kind) return "Think-Pair-Share";
  if ("jigsaw" in kind) return "Jigsaw";
  if ("galleryWalk" in kind) return "Gallery Walk";
  if ("fibonacci" in kind) return "Fibonacci Sprint";
  if ("closeReading" in kind) return "Close Reading";
  return "Protocol";
}

export function statusLabel(status: AssignmentStatus): string {
  if ("pending" in status) return "Pending";
  if ("active" in status) return "Active";
  if ("completed" in status) return "Completed";
  if ("cancelled" in status) return "Cancelled";
  return "Unknown";
}
