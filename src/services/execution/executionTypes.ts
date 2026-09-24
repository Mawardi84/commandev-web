export type ExerciseExecutionStatus =
  | 'idle'
  | 'running'
  | 'passed'
  | 'failed'
  | 'error'
  | 'timeout';

export interface ExecutionInput {
  code?: string;
  html?: string;
  css?: string;
  js?: string;
  py?: string;
  language?: 'web' | 'python' | 'javascript' | string;
  stdinInput?: string;
}

export interface ExecutionResult {
  status: ExerciseExecutionStatus;
  output: string;
  error?: string;
  executionTimeMs: number;
}
