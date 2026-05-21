// EduAI shared TypeScript types — canonical source of truth for backend contracts
// All types mirror backend Motoko definitions exactly

// ─── STMP: Subject Template Registry ─────────────────────────────────────────

/** Master subject template per grade. Admin-owned; teachers read-only. */
export interface SubjectTemplate {
  templateId: string;
  subject: string;
  gradeLevel: string;
  topicIds: string[];
  standardsRef: string[];
  masterLocked: boolean;
  createdBy: string;
}

// ─── Knowledge / GVLT query types ────────────────────────────────────────────

/** Query input for grade-gated knowledge retrieval */
export interface KnowledgeQuery {
  studentGrade: string;
  subject: string;
  includeGradeRange: boolean;
}

/** Individual topic node inside a KnowledgeResult */
export interface KnowledgeTopic {
  topicId: string;
  gradeLevel: string;
  subject: string;
  title: string;
  description: string;
  standardsRef: string[];
}

/** Full grade-gated knowledge result returned from getKnowledgeByGrade */
export interface KnowledgeResult {
  subject: string;
  gradeLevel: string;
  topics: KnowledgeTopic[];
  lockedForStudent: boolean;
}
