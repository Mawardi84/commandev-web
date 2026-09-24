/**
 * COMMANDEV Academy - Analytics Event Validator
 * Validates event structure, naming conventions, timestamp formats,
 * ID strings, and rejects malformed or unauthorized event payloads.
 */

import { AnalyticsEvent, AnalyticsEventName } from '../../types/analytics';
import { MAX_ANALYTICS_PAYLOAD_BYTES } from './analyticsSanitizer';

export const VALID_EVENT_NAMES: readonly AnalyticsEventName[] = [
  'page_viewed',
  'course_viewed',
  'course_started',
  'course_completed',
  'module_viewed',
  'module_started',
  'module_completed',
  'lesson_viewed',
  'lesson_started',
  'lesson_completed',
  'quiz_started',
  'quiz_attempted',
  'quiz_completed',
  'quiz_passed',
  'challenge_started',
  'challenge_attempted',
  'challenge_completed',
  'project_viewed',
  'project_started',
  'project_submitted',
  'project_evaluated',
  'simulator_started',
  'simulator_completed',
  'playground_opened',
  'code_execution_started',
  'code_execution_completed',
  'search_performed',
  'login_completed',
  'logout_completed',
  'xp_earned',
  'streak_updated'
];

const SNAKE_CASE_REGEX = /^[a-z]+(_[a-z0-9]+)*$/;
const SAFE_ID_REGEX = /^[a-zA-Z0-9_\-:.]{1,128}$/;

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Checks if a string adheres to snake_case convention.
 */
export function isSnakeCase(value: string): boolean {
  return SNAKE_CASE_REGEX.test(value);
}

/**
 * Checks if an ID string is safe and valid.
 */
export function isValidId(id?: string): boolean {
  if (!id) return true; // Optional IDs are valid if undefined
  return SAFE_ID_REGEX.test(id);
}

/**
 * Checks if a timestamp is a valid ISO 8601 string.
 */
export function isValidIsoTimestamp(timestamp: string): boolean {
  if (typeof timestamp !== 'string') return false;
  const parsed = Date.parse(timestamp);
  return !Number.isNaN(parsed);
}

/**
 * Validates a complete AnalyticsEvent object.
 */
export function validateAnalyticsEvent(event: unknown): ValidationResult {
  if (!event || typeof event !== 'object' || Array.isArray(event)) {
    return { isValid: false, error: 'Event must be a non-null object' };
  }

  const e = event as Record<string, unknown>;

  // 1. Validate eventId
  if (typeof e.eventId !== 'string' || !isValidId(e.eventId)) {
    return { isValid: false, error: 'Invalid or missing eventId' };
  }

  // 2. Validate eventName
  if (typeof e.eventName !== 'string' || !isSnakeCase(e.eventName)) {
    return { isValid: false, error: `eventName must follow snake_case naming conventions: ${String(e.eventName)}` };
  }

  if (!VALID_EVENT_NAMES.includes(e.eventName as AnalyticsEventName)) {
    return { isValid: false, error: `Unknown eventName: ${String(e.eventName)}` };
  }

  // 3. Validate timestamp
  if (typeof e.timestamp !== 'string' || !isValidIsoTimestamp(e.timestamp)) {
    return { isValid: false, error: 'Invalid or missing ISO 8601 timestamp' };
  }

  // 4. Validate source
  if (e.source !== 'web' && e.source !== 'server') {
    return { isValid: false, error: 'source must be either "web" or "server"' };
  }

  // 5. Validate optional IDs
  const idFields = ['userId', 'sessionId', 'courseId', 'moduleId', 'lessonId', 'projectId', 'quizId', 'challengeId', 'simulatorId'];
  for (const field of idFields) {
    if (e[field] !== undefined) {
      if (typeof e[field] !== 'string' || !isValidId(e[field] as string)) {
        return { isValid: false, error: `Invalid identifier format for field '${field}'` };
      }
    }
  }

  // 6. Validate properties structure & payload size
  if (e.properties !== undefined) {
    if (typeof e.properties !== 'object' || e.properties === null || Array.isArray(e.properties)) {
      return { isValid: false, error: 'properties must be an object dictionary' };
    }

    try {
      const serialized = JSON.stringify(e.properties);
      if (serialized.length > MAX_ANALYTICS_PAYLOAD_BYTES) {
        return { isValid: false, error: `properties payload exceeds maximum size limit of ${MAX_ANALYTICS_PAYLOAD_BYTES} bytes` };
      }
    } catch {
      return { isValid: false, error: 'properties cannot be safely serialized to JSON' };
    }
  }

  return { isValid: true };
}
