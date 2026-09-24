/**
 * Deterministic stable ID generator and sanitizer for CODERA Curriculum entities.
 * Enforces strict '^[a-zA-Z0-9_-]+$' matching required by Firestore security rules.
 */

export function isValidDocumentId(id: string): boolean {
  return typeof id === 'string' && id.length > 0 && id.length <= 128 && /^[a-zA-Z0-9_-]+$/.test(id);
}

export function sanitizeId(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Preserves legacy IDs if already valid according to Firestore rules,
 * preventing accidental downcasing or alteration of existing keys.
 */
export function preserveOrSanitizeId(raw: string): string {
  const trimmed = String(raw).trim();
  if (isValidDocumentId(trimmed)) {
    return trimmed;
  }
  return sanitizeId(trimmed);
}

/**
 * Generate a deterministic Course ID (e.g. 'rust-mastery')
 */
export function generateCourseId(titleOrSlug: string): string {
  const sanitized = sanitizeId(titleOrSlug);
  if (!sanitized) return 'course-new';
  return sanitized.endsWith('-mastery') || sanitized.includes('-') 
    ? sanitized 
    : `${sanitized}-mastery`;
}

/**
 * Generate a deterministic Level ID (e.g. 'html-level-0', 'rust-lvl-1')
 */
export function generateLevelId(courseId: string, levelSlugOrOrder: string | number): string {
  const cleanCourse = sanitizeId(courseId);
  const cleanSlug = typeof levelSlugOrOrder === 'number' 
    ? `lvl-${levelSlugOrOrder}` 
    : sanitizeId(levelSlugOrOrder);

  if (cleanSlug.startsWith(cleanCourse)) {
    return cleanSlug;
  }
  return `${cleanCourse}-${cleanSlug}`;
}

/**
 * Generate a deterministic Module ID (e.g. 'html-mod-1', 'rust-lvl-0-mod-1')
 */
export function generateModuleId(parentLevelOrCourseId: string, moduleSlugOrOrder: string | number): string {
  const cleanParent = sanitizeId(parentLevelOrCourseId);
  const cleanSlug = typeof moduleSlugOrOrder === 'number'
    ? `mod-${moduleSlugOrOrder}`
    : sanitizeId(moduleSlugOrOrder);

  if (cleanSlug.startsWith(cleanParent)) {
    return cleanSlug;
  }
  return `${cleanParent}-${cleanSlug}`;
}

/**
 * Generate a deterministic Lesson ID (e.g. 'les-0-1-1', 'html-mod-1-les-0')
 */
export function generateLessonId(parentModuleId: string, lessonSlugOrOrder: string | number): string {
  const cleanParent = sanitizeId(parentModuleId);
  const cleanSlug = typeof lessonSlugOrOrder === 'number'
    ? `les-${lessonSlugOrOrder}`
    : sanitizeId(lessonSlugOrOrder);

  if (cleanSlug.startsWith(cleanParent)) {
    return cleanSlug;
  }
  return `${cleanParent}-${cleanSlug}`;
}

/**
 * Generate a deterministic Exercise ID (e.g. 'les-0-1-1-ex-1', 'ex-1')
 */
export function generateExerciseId(parentLessonId: string, exerciseSlugOrOrder: string | number): string {
  const cleanParent = sanitizeId(parentLessonId);
  const cleanSlug = typeof exerciseSlugOrOrder === 'number'
    ? `ex-${exerciseSlugOrOrder}`
    : sanitizeId(exerciseSlugOrOrder);

  if (cleanSlug.startsWith(cleanParent)) {
    return cleanSlug;
  }
  return `${cleanParent}-${cleanSlug}`;
}

