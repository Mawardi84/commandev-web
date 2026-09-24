import { CmsExercise, ExerciseTest } from '../curriculum/types';
import { ExecutionResult } from '../execution/executionTypes';
import { TestResultItem, ExerciseEvaluationResult, ExerciseSubmissionInput } from './exerciseTypes';
import { cmsDataService } from '../curriculum/cmsDataService';

export class ExerciseEvaluationService {
  /**
   * Evaluate public visible tests on the client side for instant UI feedback
   */
  evaluateVisibleTests(
    visibleTests: ExerciseTest[],
    executionResult: ExecutionResult,
    sourceCode: string
  ): TestResultItem[] {
    if (!visibleTests || visibleTests.length === 0) {
      return [];
    }

    return visibleTests.map((test, index) => {
      const testName = test.name || test.description || `Test ${index + 1}`;
      let passed = false;
      let message = '';

      if (executionResult.error) {
        passed = false;
        message = `Execution error: ${executionResult.error}`;
      } else if (test.testCode) {
        const testCodeTrimmed = test.testCode.trim();
        // Check if testCode is an expected output match or a regex string match
        if (testCodeTrimmed.startsWith('/') && testCodeTrimmed.endsWith('/')) {
          try {
            const regex = new RegExp(testCodeTrimmed.slice(1, -1));
            passed = regex.test(executionResult.output) || regex.test(sourceCode);
            message = passed ? 'Matches pattern constraint' : 'Output/Code does not match expected pattern';
          } catch {
            passed = executionResult.output.includes(testCodeTrimmed);
          }
        } else if (testCodeTrimmed.includes('expected:') || testCodeTrimmed.includes('Expected:')) {
          const expectedVal = testCodeTrimmed.split(/expected:/i)[1]?.trim() || '';
          passed = executionResult.output.trim().includes(expectedVal);
          message = passed ? 'Matches expected value' : `Expected "${expectedVal}" in output`;
        } else {
          // Standard substring or snippet match in output or code
          passed = executionResult.output.includes(testCodeTrimmed) || sourceCode.includes(testCodeTrimmed);
          message = passed ? 'Test verified' : `Output/Code missing required snippet: "${testCodeTrimmed}"`;
        }
      } else {
        // No test code specified, default pass if execution was clean
        passed = !executionResult.error;
        message = passed ? 'Code executed cleanly' : 'Execution failed';
      }

      return {
        id: test.id || `vtest-${index}`,
        name: testName,
        description: test.description,
        passed,
        message,
        actualOutput: executionResult.output
      };
    });
  }

  /**
   * Submit submission to server for secure evaluation against secret answer key / hidden tests
   */
  async submitForEvaluation(
    exerciseId: string,
    submission: ExerciseSubmissionInput
  ): Promise<ExerciseEvaluationResult> {
    return await cmsDataService.evaluateExercise(exerciseId, submission);
  }
}

export const exerciseEvaluationService = new ExerciseEvaluationService();
