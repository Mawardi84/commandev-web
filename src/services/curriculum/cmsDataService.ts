import { auth } from '../../lib/firebase';
import { QuizQuestion } from '../../types';
import { CmsCourse, CmsLevel, CmsModule, CmsLesson, CmsExercise, ExerciseSolutionDoc, QuizSolutionDoc, ContentStatus, AuditLogEntry, AboutUsContent } from './types';
import { curriculumService } from './curriculumService';

async function getAuthHeader(required: boolean = true): Promise<HeadersInit> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  try {
    const token = await auth?.currentUser?.getIdToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    } else if (required) {
      throw new Error('User is not authenticated');
    }
  } catch (err: any) {
    if (required) {
      throw new Error(err.message || 'User is not authenticated');
    }
  }
  return headers;
}

async function safeParseJson<T = any>(res: Response): Promise<T | null> {
  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return null;
  }
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export class CmsDataService {
  /**
   * Fetch all CMS courses (includes draft, review, published, archived)
   */
  async listCourses(): Promise<CmsCourse[]> {
    try {
      const headers = await getAuthHeader();
      const res = await fetch('/api/admin/courses', { headers });
      const data = await safeParseJson(res);
      if (res.ok && data && data.courses) {
        return data.courses;
      }
    } catch {}

    // Direct Firestore fallback (guarantees resilience on static hosts like Vercel)
    const courses = await curriculumService.getCourses({ includeDrafts: true });
    return courses.map(c => ({
      id: c.id,
      title: c.title,
      description: c.description,
      shortDescription: c.shortDescription,
      icon: c.icon,
      order: c.order || 0,
      status: 'published' as ContentStatus,
      version: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
  }

  /**
   * Get single CMS course
   */
  async getCourse(id: string): Promise<CmsCourse> {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/courses/${encodeURIComponent(id)}`, { headers });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to fetch course`);
    }
    const data = await res.json();
    return data.course;
  }

  /**
   * Create a new course in CMS
   */
  async createCourse(courseData: Partial<CmsCourse>): Promise<CmsCourse> {
    const headers = await getAuthHeader();
    const res = await fetch('/api/admin/courses', {
      method: 'POST',
      headers,
      body: JSON.stringify(courseData)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to create course`);
    }
    curriculumService.clearCache();
    const data = await res.json();
    return data.course;
  }

  /**
   * Update course details
   */
  async updateCourse(id: string, updates: Partial<CmsCourse>): Promise<CmsCourse> {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/courses/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(updates)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to update course`);
    }
    curriculumService.clearCache();
    const data = await res.json();
    return data.course;
  }

  /**
   * Transition course lifecycle status (draft -> review -> published -> archived)
   */
  async updateCourseStatus(id: string, status: ContentStatus): Promise<{ id: string; status: ContentStatus; version: number }> {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/courses/${encodeURIComponent(id)}/status`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ status })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to update status`);
    }
    curriculumService.clearCache();
    return await res.json();
  }

  /**
   * Delete a course from CMS
   */
  async deleteCourse(id: string): Promise<boolean> {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/courses/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to delete course`);
    }
    curriculumService.clearCache();
    return true;
  }

  // ==========================================
  // LEVEL METHODS
  // ==========================================

  /**
   * Fetch all levels for a course
   */
  async listLevels(courseId: string): Promise<CmsLevel[]> {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/courses/${encodeURIComponent(courseId)}/levels`, { headers });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to fetch levels`);
    }
    const data = await res.json();
    return data.levels || [];
  }

  /**
   * Get single CMS level
   */
  async getLevel(id: string): Promise<CmsLevel> {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/levels/${encodeURIComponent(id)}`, { headers });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to fetch level`);
    }
    const data = await res.json();
    return data.level;
  }

  /**
   * Create a new level in a course
   */
  async createLevel(courseId: string, levelData: Partial<CmsLevel>): Promise<CmsLevel> {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/courses/${encodeURIComponent(courseId)}/levels`, {
      method: 'POST',
      headers,
      body: JSON.stringify(levelData)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to create level`);
    }
    curriculumService.clearCache();
    const data = await res.json();
    return data.level;
  }

  /**
   * Update level details
   */
  async updateLevel(id: string, updates: Partial<CmsLevel>): Promise<CmsLevel> {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/levels/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(updates)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to update level`);
    }
    curriculumService.clearCache();
    const data = await res.json();
    return data.level;
  }

  /**
   * Transition level lifecycle status
   */
  async updateLevelStatus(id: string, status: ContentStatus): Promise<{ id: string; status: ContentStatus; version: number }> {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/levels/${encodeURIComponent(id)}/status`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ status })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to update level status`);
    }
    curriculumService.clearCache();
    return await res.json();
  }

  /**
   * Delete a level from CMS
   */
  async deleteLevel(id: string): Promise<boolean> {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/levels/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to delete level`);
    }
    curriculumService.clearCache();
    return true;
  }

  // ==========================================
  // MODULE METHODS
  // ==========================================

  /**
   * Fetch modules for a course (optionally filtered by levelId)
   */
  async listModules(courseId: string, levelId?: string): Promise<CmsModule[]> {
    const headers = await getAuthHeader();
    const url = levelId 
      ? `/api/admin/courses/${encodeURIComponent(courseId)}/modules?levelId=${encodeURIComponent(levelId)}`
      : `/api/admin/courses/${encodeURIComponent(courseId)}/modules`;
    const res = await fetch(url, { headers });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to fetch modules`);
    }
    const data = await res.json();
    return data.modules || [];
  }

  /**
   * Get single CMS module
   */
  async getModule(id: string): Promise<CmsModule> {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/modules/${encodeURIComponent(id)}`, { headers });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to fetch module`);
    }
    const data = await res.json();
    return data.module;
  }

  /**
   * Create a new module in a course
   */
  async createModule(courseId: string, moduleData: Partial<CmsModule>): Promise<CmsModule> {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/courses/${encodeURIComponent(courseId)}/modules`, {
      method: 'POST',
      headers,
      body: JSON.stringify(moduleData)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to create module`);
    }
    curriculumService.clearCache();
    const data = await res.json();
    return data.module;
  }

  /**
   * Update module details
   */
  async updateModule(id: string, updates: Partial<CmsModule>): Promise<CmsModule> {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/modules/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(updates)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to update module`);
    }
    curriculumService.clearCache();
    const data = await res.json();
    return data.module;
  }

  /**
   * Transition module lifecycle status
   */
  async updateModuleStatus(id: string, status: ContentStatus): Promise<{ id: string; status: ContentStatus; version: number }> {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/modules/${encodeURIComponent(id)}/status`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ status })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to update module status`);
    }
    curriculumService.clearCache();
    return await res.json();
  }

  /**
   * Delete a module from CMS
   */
  async deleteModule(id: string): Promise<boolean> {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/modules/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to delete module`);
    }
    curriculumService.clearCache();
    return true;
  }

  /**
   * Retrieve recent security and CMS audit logs
   */
  async getAuditLogs(): Promise<AuditLogEntry[]> {
    const headers = await getAuthHeader();
    const res = await fetch('/api/admin/audit-logs', { headers });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to fetch audit logs`);
    }
    const data = await res.json();
    return data.logs || [];
  }

  /**
   * Idempotently import static levels and modules for a course
   */
  async importStaticCourse(courseId: string): Promise<{
    success: boolean;
    courseId: string;
    courseCreated: boolean;
    levelsCreated: number;
    levelsSkipped: number;
    modulesCreated: number;
    modulesSkipped: number;
  }> {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/courses/${encodeURIComponent(courseId)}/import-static`, {
      method: 'POST',
      headers
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to import static course`);
    }
    curriculumService.clearCache();
    return await res.json();
  }

  /**
   * Idempotently import all static courses, levels, and modules
   */
  async importAllStaticCurriculum(): Promise<{
    success: boolean;
    coursesCreated: number;
    coursesSkipped: number;
    levelsCreated: number;
    levelsSkipped: number;
    modulesCreated: number;
    modulesSkipped: number;
  }> {
    const headers = await getAuthHeader();
    const res = await fetch('/api/admin/curriculum/import-all', {
      method: 'POST',
      headers
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to bulk import static curriculum`);
    }
    curriculumService.clearCache();
    return await res.json();
  }

  /**
   * Fetch all CMS lessons for a module
   */
  async listLessons(courseId: string, levelId: string, moduleId: string): Promise<CmsLesson[]> {
    const headers = await getAuthHeader();
    const res = await fetch(
      `/api/admin/courses/${encodeURIComponent(courseId)}/levels/${encodeURIComponent(levelId)}/modules/${encodeURIComponent(moduleId)}/lessons`,
      { headers }
    );
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to fetch lessons`);
    }
    const data = await res.json();
    return data.lessons || [];
  }

  /**
   * Get single CMS lesson (with admin quiz solutions attached if quiz)
   */
  async getLesson(id: string): Promise<CmsLesson> {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/lessons/${encodeURIComponent(id)}`, { headers });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to fetch lesson`);
    }
    const data = await res.json();
    return data.lesson;
  }

  /**
   * Create a new lesson in CMS
   */
  async createLesson(
    courseId: string,
    levelId: string,
    moduleId: string,
    lessonData: Partial<CmsLesson>
  ): Promise<CmsLesson> {
    const headers = await getAuthHeader();
    const res = await fetch(
      `/api/admin/courses/${encodeURIComponent(courseId)}/levels/${encodeURIComponent(levelId)}/modules/${encodeURIComponent(moduleId)}/lessons`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify(lessonData)
      }
    );
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to create lesson`);
    }
    curriculumService.clearCache();
    const data = await res.json();
    return data.lesson;
  }

  /**
   * Update lesson details
   */
  async updateLesson(id: string, updates: Partial<CmsLesson>): Promise<CmsLesson> {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/lessons/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(updates)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to update lesson`);
    }
    curriculumService.clearCache();
    const data = await res.json();
    return data.lesson;
  }

  /**
   * Transition lesson lifecycle status (draft -> review -> published -> archived)
   */
  async updateLessonStatus(
    id: string,
    status: ContentStatus
  ): Promise<{ id: string; status: ContentStatus; version: number }> {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/lessons/${encodeURIComponent(id)}/status`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ status })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to update lesson status`);
    }
    curriculumService.clearCache();
    return await res.json();
  }

  /**
   * Delete a lesson from CMS
   */
  async deleteLesson(id: string): Promise<boolean> {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/lessons/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to delete lesson`);
    }
    curriculumService.clearCache();
    return true;
  }

  /**
   * Idempotently import static lessons for a single module
   */
  async importStaticModuleLessons(moduleId: string): Promise<{
    success: boolean;
    moduleId: string;
    lessonsCreated: number;
    lessonsSkipped: number;
  }> {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/modules/${encodeURIComponent(moduleId)}/import-static`, {
      method: 'POST',
      headers
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to import module static lessons`);
    }
    curriculumService.clearCache();
    return await res.json();
  }

  // ==========================================
  // EXERCISE METHODS
  // ==========================================

  /**
   * Fetch all exercises for a lesson
   */
  async listExercises(lessonId: string): Promise<CmsExercise[]> {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/lessons/${encodeURIComponent(lessonId)}/exercises`, { headers });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to fetch exercises`);
    }
    const data = await res.json();
    return data.exercises || [];
  }

  /**
   * Get single CMS exercise
   */
  async getExercise(id: string): Promise<CmsExercise> {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/exercises/${encodeURIComponent(id)}`, { headers });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to fetch exercise`);
    }
    const data = await res.json();
    return data.exercise;
  }

  /**
   * Create a new exercise in a lesson
   */
  async createExercise(lessonId: string, exerciseData: Partial<CmsExercise>): Promise<CmsExercise> {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/lessons/${encodeURIComponent(lessonId)}/exercises`, {
      method: 'POST',
      headers,
      body: JSON.stringify(exerciseData)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to create exercise`);
    }
    curriculumService.clearCache();
    const data = await res.json();
    return data.exercise;
  }

  /**
   * Update exercise details
   */
  async updateExercise(id: string, updates: Partial<CmsExercise>): Promise<CmsExercise> {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/exercises/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(updates)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to update exercise`);
    }
    curriculumService.clearCache();
    const data = await res.json();
    return data.exercise || data;
  }

  /**
   * Transition exercise lifecycle status
   */
  async updateExerciseStatus(
    id: string,
    status: ContentStatus
  ): Promise<{ id: string; status: ContentStatus; version: number }> {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/exercises/${encodeURIComponent(id)}/status`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ status })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to update exercise status`);
    }
    curriculumService.clearCache();
    return await res.json();
  }

  /**
   * Delete an exercise from CMS
   */
  async deleteExercise(id: string): Promise<boolean> {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/exercises/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to delete exercise`);
    }
    curriculumService.clearCache();
    return true;
  }

  /**
   * Get exercise solution doc (Admin only)
   */
  async getExerciseSolution(id: string): Promise<ExerciseSolutionDoc> {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/exercises/${encodeURIComponent(id)}/solution`, { headers });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to fetch exercise solution`);
    }
    return await res.json();
  }

  /**
   * Update exercise solution doc (Admin only)
   */
  async updateExerciseSolution(id: string, solutionData: Partial<ExerciseSolutionDoc>): Promise<ExerciseSolutionDoc> {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/exercises/${encodeURIComponent(id)}/solution`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(solutionData)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to update exercise solution`);
    }
    return await res.json();
  }

  /**
   * Idempotently import static exercises for a lesson
   */
  async importStaticExercises(lessonId: string): Promise<{ success: boolean; lessonId: string; exercisesCreated: number; exercisesSkipped: number }> {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/lessons/${encodeURIComponent(lessonId)}/import-static-exercises`, {
      method: 'POST',
      headers
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to import static exercises`);
    }
    curriculumService.clearCache();
    return await res.json();
  }

  // ==========================================
  // QUIZ METHODS
  // ==========================================

  /**
   * Get Quiz solution answer key (Admin only)
   */
  async getQuizSolution(lessonId: string): Promise<QuizSolutionDoc> {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/lessons/${encodeURIComponent(lessonId)}/quiz/solution`, { headers });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to fetch quiz solution`);
    }
    return await res.json();
  }

  /**
   * Update Quiz solution answer key (Admin only)
   */
  async updateQuizSolution(lessonId: string, solutionData: Partial<QuizSolutionDoc>): Promise<QuizSolutionDoc> {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/lessons/${encodeURIComponent(lessonId)}/quiz/solution`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(solutionData)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to update quiz solution`);
    }
    return await res.json();
  }

  /**
   * Idempotently import static quiz questions & solution key for a lesson
   */
  async importStaticQuiz(lessonId: string): Promise<{ success: boolean; lessonId: string; questionsImported: number }> {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/lessons/${encodeURIComponent(lessonId)}/import-static-quiz`, {
      method: 'POST',
      headers
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to import static quiz`);
    }
    curriculumService.clearCache();
    return await res.json();
  }

  /**
   * Submit quiz answers for server-side evaluation (Student caller with guest/offline fallback)
   */
  async submitQuiz(
    lessonId: string, 
    answers: Record<string, number> | { questionId: string; selectedIndex: number }[],
    fallbackQuestions?: QuizQuestion[]
  ): Promise<{
    lessonId: string;
    passed: boolean;
    scorePercentage: number;
    correctCount: number;
    totalQuestions: number;
    xpEarned: number;
    alreadyCompleted?: boolean;
    evaluations: {
      questionId: string;
      question: string;
      options: string[];
      selectedOptionIndex: number;
      correctAnswerIndex: number;
      isCorrect: boolean;
      explanation: string;
    }[];
  }> {
    try {
      const headers = await getAuthHeader(false);
      const res = await fetch(`/api/quizzes/${encodeURIComponent(lessonId)}/submit`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ answers })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn('Server quiz evaluation unavailable, falling back to local grading:', err);
    }

    // Local evaluation fallback for guest/offline students or server errors
    if (fallbackQuestions && fallbackQuestions.length > 0) {
      const answersMap: Record<string, number> = {};
      if (Array.isArray(answers)) {
        answers.forEach(a => { answersMap[a.questionId] = a.selectedIndex; });
      } else {
        Object.assign(answersMap, answers);
      }

      let correctCount = 0;
      const evaluations = fallbackQuestions.map((q, idx) => {
        const qId = q.id || `q-${idx + 1}`;
        const selected = answersMap[qId] !== undefined ? answersMap[qId] : -1;
        const correct = q.correctAnswerIndex ?? 0;
        const isCorrect = selected >= 0 && selected === correct;
        if (isCorrect) correctCount++;

        return {
          questionId: qId,
          question: q.question,
          options: q.options || [],
          selectedOptionIndex: selected,
          correctAnswerIndex: correct,
          isCorrect,
          explanation: q.explanation || ''
        };
      });

      const totalQuestions = fallbackQuestions.length;
      const scorePercentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
      const passed = scorePercentage >= 70;
      const xpEarned = passed ? 50 : 0;

      return {
        lessonId,
        passed,
        scorePercentage,
        correctCount,
        totalQuestions,
        xpEarned,
        alreadyCompleted: false,
        evaluations
      };
    }

    throw new Error('Gagal mengevaluasi kuis. Silakan coba kembali.');
  }

  /**
   * Fetch published student exercises for a lesson (Public payload only)
   */
  async getStudentExercises(lessonId: string): Promise<CmsExercise[]> {
    try {
      const headers = await getAuthHeader(false);
      const res = await fetch(`/api/lessons/${encodeURIComponent(lessonId)}/exercises`, { headers });
      if (res.ok) {
        const data = await res.json();
        return data.exercises || [];
      }
    } catch {
      // Non-blocking fallback
    }
    return [];
  }

  /**
   * Submit exercise submission for secure server-side evaluation
   */
  async evaluateExercise(exerciseId: string, submission: {
    sourceCode: string;
    language?: string;
    runtime?: string;
    html?: string;
    css?: string;
    js?: string;
    py?: string;
    output?: string;
  }): Promise<import('../exercises/exerciseTypes').ExerciseEvaluationResult> {
    const headers = await getAuthHeader(false);
    const res = await fetch(`/api/exercises/${encodeURIComponent(exerciseId)}/evaluate`, {
      method: 'POST',
      headers,
      body: JSON.stringify(submission)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to evaluate exercise`);
    }
    return await res.json();
  }

  /**
   * Fetch protected project evaluation definition & version history (Admin Only)
   */
  async getProjectEvaluation(projectId: string): Promise<{
    evaluationDefinition: import('../../types/projectEvaluation').ProjectEvaluationDefinition;
    versions: import('../../types/projectEvaluation').ProjectEvaluationDefinition[];
  }> {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/projects/${encodeURIComponent(projectId)}/evaluation`, { headers });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Failed to fetch project evaluation definition`);
    }
    return await res.json();
  }

  /**
   * Save draft project evaluation definition (Admin Only)
   */
  async saveProjectEvaluationDraft(
    projectId: string,
    definition: Partial<import('../../types/projectEvaluation').ProjectEvaluationDefinition>
  ): Promise<{ success: boolean; evaluationDefinition: import('../../types/projectEvaluation').ProjectEvaluationDefinition }> {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/projects/${encodeURIComponent(projectId)}/evaluation`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(definition)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      const msg = err.details ? err.details.join('; ') : (err.error || `HTTP ${res.status}`);
      throw new Error(msg);
    }
    return await res.json();
  }

  /**
   * Publish new project evaluation version (Admin Only)
   */
  async publishProjectEvaluation(
    projectId: string,
    definition: Partial<import('../../types/projectEvaluation').ProjectEvaluationDefinition>
  ): Promise<{ success: boolean; version: number; evaluationDefinition: import('../../types/projectEvaluation').ProjectEvaluationDefinition }> {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/projects/${encodeURIComponent(projectId)}/evaluation/publish`, {
      method: 'POST',
      headers,
      body: JSON.stringify(definition)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      const msg = err.details ? err.details.join('; ') : (err.error || `HTTP ${res.status}`);
      throw new Error(msg);
    }
    return await res.json();
  }

  /**
   * Preview project evaluation against sample source code (Admin Only)
   */
  async previewProjectEvaluation(
    projectId: string,
    definition: import('../../types/projectEvaluation').ProjectEvaluationDefinition,
    files: import('../../types/projectEvaluation').ProjectSubmissionFiles
  ): Promise<{ success: boolean; result: import('../../types/projectEvaluation').ProjectEvaluationResult }> {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/projects/${encodeURIComponent(projectId)}/evaluation/preview`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ definition, files })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      const msg = err.details ? err.details.join('; ') : (err.error || `HTTP ${res.status}`);
      throw new Error(msg);
    }
    return await res.json();
  }

  /**
   * Submit student project files for authoritative server evaluation
   */
  async submitProject(
    projectId: string,
    files: import('../../types/projectEvaluation').ProjectSubmissionFiles
  ): Promise<import('../../types/projectEvaluation').ProjectEvaluationResult> {
    const headers = await getAuthHeader();
    const res = await fetch(`/api/projects/${encodeURIComponent(projectId)}/submit`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ files })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Gagal mengirim proyek`);
    }
    return await res.json();
  }

  /**
   * Fetch published About Us content for public view
   */
  async getAboutUsPublic(): Promise<AboutUsContent> {
    const res = await fetch('/api/about');
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Gagal mengambil profil`);
    }
    return await res.json();
  }

  /**
   * Fetch latest About Us content (Admin Only)
   */
  async getAboutUsAdmin(): Promise<AboutUsContent> {
    const headers = await getAuthHeader();
    const res = await fetch('/api/admin/about', { headers });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Gagal mengambil profil admin`);
    }
    return await res.json();
  }

  /**
   * Update and save draft/published About Us content (Admin Only)
   */
  async updateAboutUs(content: AboutUsContent): Promise<{ success: boolean }> {
    const headers = await getAuthHeader();
    const res = await fetch('/api/admin/about', {
      method: 'PUT',
      headers,
      body: JSON.stringify(content)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}: Gagal menyimpan profil`);
    }
    return await res.json();
  }
}

export const cmsDataService = new CmsDataService();
