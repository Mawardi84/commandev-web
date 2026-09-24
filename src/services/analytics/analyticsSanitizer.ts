/**
 * COMMANDEV Academy - Analytics Privacy Sanitizer
 * Enforces strict allow-listing, PII removal, credential stripping,
 * and payload size limits on all analytics telemetry data.
 */

import { AnalyticsEventName } from '../../types/analytics';

// Maximum allowed size of serialized properties payload in bytes (8 KB)
export const MAX_ANALYTICS_PAYLOAD_BYTES = 8192;

// Explicit blacklisted key fragments that must NEVER appear in telemetry
const PROHIBITED_KEY_PATTERNS = [
  'password',
  'passwd',
  'token',
  'secret',
  'apikey',
  'api_key',
  'credential',
  'auth',
  'jwt',
  'bearer',
  'sourcecode',
  'source_code',
  'code',
  'editorcontent',
  'editor_content',
  'regex',
  'matcher',
  'privateconfig',
  'private_config',
  'stack',
  'stacktrace',
  'trace',
  'path',
  'filepath',
  'filesystem',
  'email',
  'phone',
  'fullname',
  'full_name',
  'creditcard',
  'ssn'
];

// Per-event allowed property keys (allow-list approach)
const ALLOWED_PROPERTIES_MAP: Record<AnalyticsEventName, readonly string[]> = {
  page_viewed: ['page', 'title', 'referrerPath', 'viewMode'],
  course_viewed: ['courseTitle', 'category', 'difficulty', 'totalLessons'],
  course_started: ['courseTitle', 'category', 'enrolledAt'],
  course_completed: ['courseTitle', 'totalXpEarned', 'completionDurationSec'],
  module_viewed: ['moduleTitle', 'moduleOrder'],
  module_started: ['moduleTitle', 'moduleOrder'],
  module_completed: ['moduleTitle', 'lessonsCompletedCount'],
  lesson_viewed: ['lessonTitle', 'lessonType', 'difficulty', 'language'],
  lesson_started: ['lessonTitle', 'lessonType', 'language'],
  lesson_completed: ['lessonTitle', 'lessonType', 'language', 'xpGained', 'durationSec'],
  quiz_started: ['quizTitle', 'questionCount'],
  quiz_attempted: ['attemptNumber', 'score', 'passed', 'questionCount', 'correctAnswersCount'],
  quiz_completed: ['score', 'passed', 'durationSec'],
  quiz_passed: ['score', 'attemptCount'],
  challenge_started: ['challengeTitle', 'difficulty', 'language'],
  challenge_attempted: ['attemptNumber', 'passed', 'testChecksPassed'],
  challenge_completed: ['xpEarned', 'durationSec'],
  project_viewed: ['projectTitle', 'category', 'difficulty'],
  project_started: ['projectTitle', 'category'],
  project_submitted: ['submissionId', 'attemptNumber', 'fileTypesSubmitted'],
  project_evaluated: ['submissionId', 'score', 'passed', 'evaluatorVersion', 'criteriaCount', 'passedCriteriaCount'],
  simulator_started: ['simulatorName', 'mode'],
  simulator_completed: ['simulatorName', 'scenarioName', 'durationSec'],
  playground_opened: ['language', 'initialSnippetCategory'],
  code_execution_started: ['language'],
  code_execution_completed: ['language', 'success', 'executionTimeMs'],
  search_performed: ['queryLength', 'resultCount', 'categoryFilter'],
  login_completed: ['authProvider', 'isNewUser'],
  logout_completed: ['sessionDurationSec'],
  xp_earned: ['amount', 'reason', 'newTotalXp'],
  streak_updated: ['newStreak', 'maintained']
};

/**
 * Checks if a key contains any prohibited substring.
 */
export function isProhibitedKey(key: string): boolean {
  const normalized = key.toLowerCase().replace(/[-_]/g, '');
  return PROHIBITED_KEY_PATTERNS.some(prohibited => normalized.includes(prohibited.replace(/[-_]/g, '')));
}

/**
 * Sanitizes arbitrary properties according to the event's allow-list,
 * scrubbing any prohibited fields, credentials, or high-frequency telemetry.
 */
export function sanitizeAnalyticsProperties(
  eventName: AnalyticsEventName,
  properties?: Record<string, unknown>
): Record<string, unknown> {
  if (!properties || typeof properties !== 'object' || Array.isArray(properties)) {
    return {};
  }

  const allowedKeys = ALLOWED_PROPERTIES_MAP[eventName] || [];
  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(properties)) {
    // 1. Prohibited key rejection
    if (isProhibitedKey(key)) {
      continue;
    }

    // 2. Allow-list check
    if (!allowedKeys.includes(key)) {
      continue;
    }

    // 3. Reject functions, symbols, and undefined
    if (typeof value === 'function' || typeof value === 'symbol' || value === undefined) {
      continue;
    }

    // 4. Sanitize primitive values
    if (typeof value === 'string') {
      // Disallow strings looking like JWTs, private keys, or code snippets
      if (
        value.startsWith('ey') || // JWT prefix
        value.includes('BEGIN PRIVATE KEY') ||
        value.includes('Bearer ') ||
        value.length > 512 // Reject arbitrarily long strings (source codes, etc.)
      ) {
        continue;
      }
      sanitized[key] = value.trim();
    } else if (typeof value === 'number') {
      if (Number.isFinite(value)) {
        sanitized[key] = value;
      }
    } else if (typeof value === 'boolean') {
      sanitized[key] = value;
    } else if (Array.isArray(value)) {
      // Allow only short primitive arrays (e.g. file types: ['html', 'css'])
      if (value.length <= 10) {
        const cleanArr = value
          .filter(item => typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean')
          .slice(0, 10);
        sanitized[key] = cleanArr;
      }
    }
    // We intentionally discard deeply nested objects to keep telemetry simple & flat
  }

  // 5. Payload size enforcement
  const serialized = JSON.stringify(sanitized);
  if (serialized.length > MAX_ANALYTICS_PAYLOAD_BYTES) {
    console.warn(`[AnalyticsSanitizer] Payload for event ${eventName} exceeded maximum size (${serialized.length} bytes). Truncating properties.`);
    return {};
  }

  return sanitized;
}
