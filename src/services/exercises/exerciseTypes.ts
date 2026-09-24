import { ExerciseExecutionStatus } from '../execution/executionTypes';

export interface TestResultItem {
  id: string;
  name?: string;
  description?: string;
  passed: boolean;
  message?: string;
  expectedOutput?: string;
  actualOutput?: string;
}

export interface ExerciseEvaluationResult {
  exerciseId: string;
  status: ExerciseExecutionStatus;
  passed: boolean;
  runtime?: string;
  executionTimeMs?: number;
  testsRun: number;
  testsPassed: number;
  testsFailed: number;
  output?: string;
  errors?: string[];
  feedback?: string;
  visibleTestResults?: TestResultItem[];
  xpEarned?: number;
  alreadyCompleted?: boolean;
}

export interface ExerciseSubmissionInput {
  sourceCode: string;
  language?: string;
  runtime?: string;
  html?: string;
  css?: string;
  js?: string;
  py?: string;
  output?: string;
}

export interface ExerciseAttemptDoc {
  id?: string;
  attemptId?: string;
  userId: string;
  exerciseId: string;
  lessonId?: string;
  submittedAt: string;
  status: ExerciseExecutionStatus;
  passed: boolean;
  testsRun: number;
  testsPassed: number;
  testsFailed: number;
  executionTimeMs?: number;
}
