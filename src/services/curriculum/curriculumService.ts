import { db } from '../../lib/firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where 
} from 'firebase/firestore';
import { Course, Module, Lesson, CourseLevel } from '../../types';
import { COURSES } from '../../data/curriculum';
import { SECURITY_LABS, SecurityLab } from '../../data/securityLabsData';
import { 
  CmsCourse, 
  CmsLevel,
  CmsModule, 
  CmsLesson, 
  QueryCurriculumOptions 
} from './types';
import { handleFirestoreError, OperationType } from '../../lib/db';

class CurriculumService {
  private courseCache: Map<string, { data: Course; timestamp: number }> = new Map();
  private allCoursesCache: { data: Course[]; timestamp: number } | null = null;
  private readonly CACHE_TTL_MS = 60 * 1000; // 1 minute memory cache

  /**
   * Helper to retrieve static course by ID safely
   */
  private getStaticCourse(courseId: string): Course | null {
    return COURSES.find(c => c.id === courseId) || null;
  }

  /**
   * Helper to retrieve static lesson by ID across all courses
   */
  private getStaticLesson(lessonId: string): Lesson | null {
    for (const course of COURSES) {
      for (const level of course.levels) {
        for (const module of level.modules) {
          const lesson = module.lessons.find(l => l.id === lessonId);
          if (lesson) return lesson;
        }
      }
    }
    return null;
  }

  /**
   * Helper to retrieve static module by ID safely
   */
  private getStaticModule(moduleId: string): Module | null {
    for (const course of COURSES) {
      for (const level of course.levels) {
        const mod = level.modules.find(m => m.id === moduleId);
        if (mod) return mod;
      }
    }
    return null;
  }

  /**
   * Get all courses.
   * Priority: Firestore (Published only for students) -> Fallback to Static COURSES.
   */
  async getCourses(options?: QueryCurriculumOptions): Promise<Course[]> {
    const now = Date.now();
    if (!options?.includeDrafts && this.allCoursesCache && (now - this.allCoursesCache.timestamp < this.CACHE_TTL_MS)) {
      return this.allCoursesCache.data;
    }

    if (!db) {
      return COURSES;
    }

    try {
      const coursesRef = collection(db, 'courses');
      const q = options?.includeDrafts 
        ? query(coursesRef) 
        : query(coursesRef, where('status', '==', 'published'));
      
      const snap = await getDocs(q);

      if (!snap.empty) {
        const firestoreCourses: Course[] = [];
        for (const docSnap of snap.docs) {
          const data = docSnap.data() as CmsCourse;
          const staticMatch = this.getStaticCourse(data.id);
          
          // Hierarchical resolution for levels
          const resolvedLevels = await this.getLevels(data.id, options);

          firestoreCourses.push({
            id: data.id,
            title: data.title,
            description: data.description || staticMatch?.description || '',
            shortDescription: data.shortDescription || staticMatch?.shortDescription || '',
            icon: data.icon || staticMatch?.icon || 'code',
            order: data.order,
            levels: resolvedLevels.length > 0 ? resolvedLevels : (staticMatch?.levels || [])
          });
        }

        // Deterministic ordering by numeric order field
        firestoreCourses.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));

        // Cache and return if published courses were fetched from Firestore
        if (firestoreCourses.length > 0) {
          if (!options?.includeDrafts) {
            this.allCoursesCache = { data: firestoreCourses, timestamp: now };
          }
          return firestoreCourses;
        }
      }
    } catch (err) {
      // Soft fallback on offline, uninitialized collections, or network errors
      handleFirestoreError(err, OperationType.LIST, 'courses');
    }

    // Default Fallback to static courses
    return COURSES;
  }

  /**
   * Get a single course by its stable ID with its hierarchical Levels and Modules.
   */
  async getCourse(courseId: string, options?: QueryCurriculumOptions): Promise<Course | null> {
    const cached = this.courseCache.get(courseId);
    if (!options?.includeDrafts && cached && (Date.now() - cached.timestamp < this.CACHE_TTL_MS)) {
      return cached.data;
    }

    if (!db) {
      const staticCourse = this.getStaticCourse(courseId);
      if (staticCourse) {
        this.courseCache.set(courseId, { data: staticCourse, timestamp: Date.now() });
      }
      return staticCourse;
    }

    try {
      const courseDocRef = doc(db, 'courses', courseId);
      const snap = await getDoc(courseDocRef);

      if (snap.exists()) {
        const data = snap.data() as CmsCourse;
        // Verify publish status for students
        if (!options?.includeDrafts && data.status !== 'published') {
          return null;
        }

        const staticMatch = this.getStaticCourse(courseId);
        const resolvedLevels = await this.getLevels(courseId, options);

        const resolvedCourse: Course = {
          id: data.id,
          title: data.title,
          description: data.description || staticMatch?.description || '',
          shortDescription: data.shortDescription || staticMatch?.shortDescription || '',
          icon: data.icon || staticMatch?.icon || 'code',
          order: data.order,
          levels: resolvedLevels.length > 0 ? resolvedLevels : (staticMatch?.levels || [])
        };

        this.courseCache.set(courseId, { data: resolvedCourse, timestamp: Date.now() });
        return resolvedCourse;
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, `courses/${courseId}`);
    }

    // Fallback to static course
    const staticCourse = this.getStaticCourse(courseId);
    if (staticCourse) {
      this.courseCache.set(courseId, { data: staticCourse, timestamp: Date.now() });
    }
    return staticCourse;
  }

  /**
   * Get levels for a course with child modules.
   * Checks Firestore first, falling back to static curriculum if empty.
   */
  async getLevels(courseId: string, options?: QueryCurriculumOptions): Promise<CourseLevel[]> {
    if (!db) {
      const staticCourse = this.getStaticCourse(courseId);
      return staticCourse ? staticCourse.levels : [];
    }

    try {
      const levelsRef = collection(db, 'levels');
      const q = options?.includeDrafts
        ? query(levelsRef, where('courseId', '==', courseId))
        : query(levelsRef, where('courseId', '==', courseId), where('status', '==', 'published'));

      const snap = await getDocs(q);
      if (!snap.empty) {
        const cmsLevels: CmsLevel[] = [];
        snap.forEach(d => cmsLevels.push(d.data() as CmsLevel));
        cmsLevels.sort((a, b) => (a.order || 0) - (b.order || 0));

        const resolvedLevels: CourseLevel[] = [];
        for (const lvl of cmsLevels) {
          const modules = await this.getModulesByLevel(lvl.id, options);
          resolvedLevels.push({
            id: lvl.id,
            title: lvl.title,
            description: lvl.description || '',
            modules
          });
        }
        return resolvedLevels;
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, `levels for ${courseId}`);
    }

    // Static fallback
    const staticCourse = this.getStaticCourse(courseId);
    return staticCourse ? staticCourse.levels : [];
  }

  /**
   * Get modules for a specific level.
   */
  async getModulesByLevel(levelId: string, options?: QueryCurriculumOptions): Promise<Module[]> {
    if (!db) {
      for (const course of COURSES) {
        for (const level of course.levels) {
          if (level.id === levelId) return level.modules;
        }
      }
      return [];
    }

    try {
      const modulesRef = collection(db, 'modules');
      const q = options?.includeDrafts
        ? query(modulesRef, where('levelId', '==', levelId))
        : query(modulesRef, where('levelId', '==', levelId), where('status', '==', 'published'));

      const snap = await getDocs(q);
      if (!snap.empty) {
        const cmsModules: CmsModule[] = [];
        snap.forEach(d => cmsModules.push(d.data() as CmsModule));
        cmsModules.sort((a, b) => (a.order || 0) - (b.order || 0));

        const modulesWithLessons = await Promise.all(
          cmsModules.map(async m => {
            const lessons = await this.getLessonsByModule(m.id, options);
            return {
              id: m.id,
              title: m.title,
              description: m.description || '',
              lessons
            };
          })
        );
        return modulesWithLessons;
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, `modules for level ${levelId}`);
    }

    // Static fallback
    for (const course of COURSES) {
      for (const level of course.levels) {
        if (level.id === levelId) return level.modules;
      }
    }
    return [];
  }

  /**
   * Get all modules for a course.
   */
  async getModules(courseId: string, options?: QueryCurriculumOptions): Promise<Module[]> {
    if (!db) {
      const staticCourse = this.getStaticCourse(courseId);
      return staticCourse ? staticCourse.levels.flatMap(l => l.modules) : [];
    }

    try {
      const modulesRef = collection(db, 'modules');
      const q = options?.includeDrafts
        ? query(modulesRef, where('courseId', '==', courseId))
        : query(modulesRef, where('courseId', '==', courseId), where('status', '==', 'published'));
      
      const snap = await getDocs(q);
      if (!snap.empty) {
        const cmsModules: CmsModule[] = [];
        snap.forEach(d => cmsModules.push(d.data() as CmsModule));
        cmsModules.sort((a, b) => (a.order || 0) - (b.order || 0));

        const modulesWithLessons = await Promise.all(
          cmsModules.map(async m => {
            const lessons = await this.getLessonsByModule(m.id, options);
            return {
              id: m.id,
              title: m.title,
              description: m.description || '',
              lessons
            };
          })
        );
        return modulesWithLessons;
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, 'modules');
    }

    // Static fallback
    const staticCourse = this.getStaticCourse(courseId);
    if (staticCourse) {
      return staticCourse.levels.flatMap(l => l.modules);
    }
    return [];
  }

  /**
   * Get all lessons for a specific module with fallback on partial CMS data.
   */
  async getLessonsByModule(moduleId: string, options?: QueryCurriculumOptions): Promise<Lesson[]> {
    const staticModule = this.getStaticModule(moduleId);
    const staticLessons = staticModule?.lessons || [];

    if (!db) {
      return staticLessons;
    }

    try {
      const lessonsRef = collection(db, 'lessons');
      const q = options?.includeDrafts
        ? query(lessonsRef, where('moduleId', '==', moduleId))
        : query(lessonsRef, where('moduleId', '==', moduleId), where('status', '==', 'published'));

      const snap = await getDocs(q);
      if (!snap.empty) {
        const cmsLessons: CmsLesson[] = [];
        snap.forEach(d => cmsLessons.push(d.data() as CmsLesson));
        cmsLessons.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));

        return cmsLessons.map(data => {
          const staticMatch = this.getStaticLesson(data.id);

          let sanitizedQuestions = data.questions;
          if (!options?.includeDrafts && sanitizedQuestions) {
            sanitizedQuestions = sanitizedQuestions.map(q => ({
              id: q.id,
              question: q.question,
              options: q.options,
              correctAnswerIndex: -1,
              explanation: undefined
            }));
          }

          const mergedRequirements = data.requirements?.map(r => {
            const sr = staticMatch?.requirements?.find(x => x.id === r.id);
            return {
              ...r,
              validate: sr?.validate
            };
          }) || staticMatch?.requirements || [];

          return {
            id: data.id,
            title: data.title,
            type: data.type,
            content: data.content,
            language: data.language,
            starterCode: data.starterCode,
            starterCss: data.starterCss,
            starterJs: data.starterJs,
            starterPy: data.starterPy,
            hints: data.hints,
            requirements: mergedRequirements,
            questions: sanitizedQuestions,
            xpReward: data.xpReward
          };
        });
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, `lessons for module ${moduleId}`);
    }

    // Partial CMS fallback: If no lessons in Firestore yet, safely fallback to static lessons
    return staticLessons;
  }

  /**
   * Get a single lesson by stable ID.
   * Ensures quiz answer keys and grading solutions are not leaked to student callers.
   */
  async getLesson(lessonId: string, options?: QueryCurriculumOptions): Promise<Lesson | null> {
    const staticLesson = this.getStaticLesson(lessonId);

    if (!db) {
      return staticLesson;
    }

    try {
      const lessonDocRef = doc(db, 'lessons', lessonId);
      const snap = await getDoc(lessonDocRef);

      if (snap.exists()) {
        const data = snap.data() as CmsLesson;
        // Verify publish status
        if (!options?.includeDrafts && data.status !== 'published') {
          return null;
        }

        // Clean sensitive quiz answers if returned to student
        let sanitizedQuestions = data.questions;
        if (!options?.includeDrafts && sanitizedQuestions) {
          sanitizedQuestions = sanitizedQuestions.map(q => ({
            id: q.id,
            question: q.question,
            options: q.options,
            correctAnswerIndex: -1, // Hidden on client for secure server-side or validated grading
            explanation: undefined
          }));
        }

        const mergedRequirements = data.requirements?.map(r => {
          const sr = staticLesson?.requirements?.find(x => x.id === r.id);
          return {
            ...r,
            validate: sr?.validate
          };
        }) || staticLesson?.requirements || [];

        return {
          id: data.id,
          title: data.title,
          type: data.type,
          content: data.content,
          language: data.language,
          starterCode: data.starterCode,
          starterCss: data.starterCss,
          starterJs: data.starterJs,
          starterPy: data.starterPy,
          hints: data.hints,
          requirements: mergedRequirements,
          questions: sanitizedQuestions,
          xpReward: data.xpReward
        };
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, `lessons/${lessonId}`);
    }

    // Static Fallback
    return staticLesson;
  }

  /**
   * Get security labs
   */
  async getSecurityLabs(): Promise<SecurityLab[]> {
    return SECURITY_LABS;
  }

  /**
   * Invalidate memory cache when content is updated via CMS
   */
  clearCache(): void {
    this.courseCache.clear();
    this.allCoursesCache = null;
  }
}

export const curriculumService = new CurriculumService();
