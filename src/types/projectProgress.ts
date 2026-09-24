/**
 * CODERA Academy — Phase 5D: Project Progress & Completion Types
 * Authoritative types for server-evaluated project completions and learner progress DTOs.
 */

export interface ProjectCompletionRecord {
  /** Deterministic identifier: `${userId}_${projectId}` */
  id: string;
  projectId: string;
  userId: string;
  completedAt: string;
  submissionId: string;
  evaluatorVersion: number | string;
  score: number;
  xpAwarded: number;
  status: 'completed';
}

export interface PublicProjectProgressDTO {
  projectId: string;
  completed: boolean;
  completedAt?: string;
  submissionId?: string;
  score?: number;
  xpAwarded: number;
  alreadyCompleted: boolean;
  totalUserXp?: number;
}

export interface CompletionGateParams {
  userId: string;
  projectId: string;
  submissionId: string;
  score: number;
  passed: boolean;
  evaluatorVersion: number | string;
  projectXp?: number;
}
