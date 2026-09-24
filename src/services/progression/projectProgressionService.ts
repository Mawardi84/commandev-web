/**
 * CODERA Academy — Phase 5D: Project Progression Service
 * Server-authoritative, idempotent project completion and XP persistence.
 */

import { CODERA_PROJECTS } from '../../data/projectsData';
import { 
  ProjectCompletionRecord, 
  PublicProjectProgressDTO, 
  CompletionGateParams 
} from '../../types/projectProgress';

/**
 * Executes the authoritative completion gate for an evaluated project submission.
 * Enforces atomic idempotency via Firestore transaction and deterministic document IDs.
 */
export async function recordProjectCompletion(
  adminDb: any,
  params: CompletionGateParams
): Promise<PublicProjectProgressDTO> {
  const { userId, projectId, submissionId, score, passed, evaluatorVersion } = params;

  // Strict Completion Gate: only passed === true can trigger completion
  if (!passed) {
    return {
      projectId,
      completed: false,
      xpAwarded: 0,
      alreadyCompleted: false
    };
  }

  // Authoritative project lookup: verify project exists and is published
  const matchedProject = CODERA_PROJECTS.find(p => p.id === projectId);
  if (!matchedProject || matchedProject.status !== 'published') {
    return {
      projectId,
      completed: false,
      xpAwarded: 0,
      alreadyCompleted: false
    };
  }

  // Server-authoritative XP reward definition
  const targetXp = Math.max(0, Number(matchedProject.xp) || 100);

  // Deterministic completion document ID: guarantees 1 record per user-project pair
  const completionDocId = `${userId}_${projectId}`;
  const completionRef = adminDb.collection('project_completions').doc(completionDocId);
  const userRef = adminDb.collection('users').doc(userId);

  // Execute atomic, serialized transaction to prevent concurrent completion & duplicate XP
  const txResult: {
    alreadyCompleted: boolean;
    finalXpAwarded: number;
    completionRecord: ProjectCompletionRecord | null;
    userTotalXp?: number;
  } = await adminDb.runTransaction(async (transaction: any) => {
    const completionSnap = await transaction.get(completionRef);

    if (completionSnap.exists) {
      // Idempotency: Project has already been authoritatively completed
      const existing = completionSnap.data() as ProjectCompletionRecord;
      return {
        alreadyCompleted: true,
        finalXpAwarded: 0,
        completionRecord: existing,
        userTotalXp: undefined
      };
    } else {
      // First-time completion: award authoritative XP and create completion record
      const awardedXp = targetXp;

      const userSnap = await transaction.get(userRef);
      const userData = userSnap.exists ? (userSnap.data() || {}) : {};
      const currentCompletedProjects: string[] = Array.isArray(userData.completedProjects)
        ? userData.completedProjects
        : [];
      const currentXp: number = Number(userData.xp) || 0;
      const updatedXp = currentXp + awardedXp;

      const now = new Date().toISOString();
      const newRecord: ProjectCompletionRecord = {
        id: completionDocId,
        projectId,
        userId,
        completedAt: now,
        submissionId,
        evaluatorVersion,
        score,
        xpAwarded: awardedXp,
        status: 'completed'
      };

      // 1. Create immutable project completion document
      transaction.set(completionRef, newRecord);

      // 2. Atomically update user profile document (completedProjects & XP)
      const updatedCompletedList = Array.from(new Set([...currentCompletedProjects, projectId]));
      transaction.set(
        userRef,
        {
          ...userData,
          completedProjects: updatedCompletedList,
          xp: updatedXp,
          updatedAt: now
        },
        { merge: true }
      );

      return {
        alreadyCompleted: false,
        finalXpAwarded: awardedXp,
        completionRecord: newRecord,
        userTotalXp: updatedXp
      };
    }
  });

  return {
    projectId,
    completed: true,
    completedAt: txResult.completionRecord?.completedAt,
    submissionId: txResult.completionRecord?.submissionId,
    score: txResult.completionRecord?.score ?? score,
    xpAwarded: txResult.finalXpAwarded,
    alreadyCompleted: txResult.alreadyCompleted,
    totalUserXp: txResult.userTotalXp
  };
}

/**
 * Retrieves the authoritative project progress and completion record for a learner.
 * Guaranteed safe, cross-device, sanitized DTO.
 */
export async function getProjectProgress(
  adminDb: any,
  userId: string,
  projectId: string
): Promise<PublicProjectProgressDTO> {
  const completionDocId = `${userId}_${projectId}`;
  const snap = await adminDb.collection('project_completions').doc(completionDocId).get();

  if (snap.exists) {
    const data = snap.data();
    return {
      projectId,
      completed: true,
      completedAt: data.completedAt,
      submissionId: data.submissionId,
      score: data.score,
      xpAwarded: Number(data.xpAwarded) || 0,
      alreadyCompleted: true
    };
  }

  return {
    projectId,
    completed: false,
    xpAwarded: 0,
    alreadyCompleted: false
  };
}
