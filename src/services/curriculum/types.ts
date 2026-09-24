import { ContentBlock, QuizQuestion, ChallengeRequirement, LessonType, Course, Module, Lesson, CourseLevel } from '../../types';

export type ContentStatus = 'draft' | 'review' | 'published' | 'archived';

export const VALID_STATUS_TRANSITIONS: Record<ContentStatus, ContentStatus[]> = {
  draft: ['review', 'published', 'archived'],
  review: ['draft', 'published', 'archived'],
  published: ['archived', 'draft'],
  archived: ['draft']
};

export interface CmsCourse {
  id: string; // Stable legacy ID (e.g. 'html-mastery')
  title: string;
  slug?: string;
  description: string;
  shortDescription: string;
  category?: string;
  difficulty?: string;
  icon: string;
  status: ContentStatus;
  order: number;
  version: number;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface CmsLevel {
  id: string; // Stable ID (e.g. 'level-0', 'db-lvl-0', 'py-lvl-0')
  courseId: string;
  title: string;
  slug?: string;
  description: string;
  status: ContentStatus;
  order: number;
  version: number;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface CmsModule {
  id: string; // Stable legacy ID (e.g. 'mod-0-1')
  courseId: string;
  levelId?: string; // Stable reference to parent Level
  title: string;
  description: string;
  status: ContentStatus;
  order: number;
  version: number;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface CmsLesson {
  id: string; // Stable legacy ID (e.g. 'les-0-1-1')
  courseId: string;
  levelId: string; // Stable reference to parent Level
  moduleId: string; // Stable reference to parent Module
  title: string;
  slug?: string;
  description?: string;
  type: LessonType;
  language?: string;
  runtime?: string;
  content?: ContentBlock[];
  starterCode?: string;
  starterCss?: string;
  starterJs?: string;
  starterPy?: string;
  hints?: string[];
  requirements?: ChallengeRequirement[];
  questions?: QuizQuestion[];
  xpReward: number;
  status: ContentStatus;
  order: number;
  version: number;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface QuizSolutionDoc {
  lessonId: string;
  solutions: {
    questionId: string;
    correctAnswerIndex: number;
    explanation?: string;
  }[];
  updatedAt: string;
}

export type ExerciseType = 'code' | 'debug' | 'predict-output' | 'multiple-choice' | 'multiple-answer' | 'true-false' | 'scenario' | 'challenge';

export interface ExerciseTest {
  id: string;
  name?: string;
  testCode?: string;
  description?: string;
}

export interface CmsExercise {
  id: string; // Stable legacy or deterministic ID (e.g. 'les-0-1-1-ex-1' or 'ex-1')
  lessonId: string; // Stable reference to parent Lesson
  courseId: string;
  levelId: string;
  moduleId: string;
  title: string;
  slug?: string;
  description?: string;
  instructions?: string;
  type: ExerciseType | string;
  language?: string;
  runtime?: string;
  starterCode?: string;
  starterCss?: string;
  starterJs?: string;
  starterPy?: string;
  requirements?: ChallengeRequirement[];
  visibleTests?: ExerciseTest[];
  hints?: string[];
  xpReward: number;
  order: number;
  status: ContentStatus;
  version: number;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface ExerciseSolutionDoc {
  exerciseId: string;
  solutionCode?: string;
  expectedOutput?: string;
  hiddenTests?: ExerciseTest[];
  gradingRules?: string;
  updatedAt: string;
  updatedBy?: string;
}

export interface AuditLogEntry {
  id?: string;
  adminId: string;
  action: string;
  targetType: 'course' | 'level' | 'module' | 'lesson' | 'exercise' | 'quiz' | 'settings';
  targetId: string;
  timestamp: string;
  details?: Record<string, any>;
}

export interface QueryCurriculumOptions {
  includeDrafts?: boolean;
}

export type { ContentBlock };
