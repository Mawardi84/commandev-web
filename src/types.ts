export type ContentBlock = 
  | { type: 'markdown'; content: string }
  | { type: 'code-example'; code: string; language: string }
  | { type: 'heading'; text: string; level?: 1 | 2 | 3 | 4 }
  | { type: 'paragraph'; text: string }
  | { type: 'code'; code: string; language: string }
  | { type: 'note'; text: string; title?: string }
  | { type: 'tip'; text: string; title?: string }
  | { type: 'warning'; text: string; title?: string }
  | { type: 'example'; title?: string; code: string; language?: string; explanation?: string };

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex?: number;
  explanation?: string;
};

export type ChallengeRequirement = {
  id: string;
  description: string;
  validate?: (codeOrHtml: string, output?: string) => boolean;
};

export type LessonType = 'learn' | 'practice' | 'challenge' | 'quiz' | 'project';

export type Lesson = {
  id: string;
  title: string;
  slug?: string;
  description?: string;
  type: LessonType;
  content?: ContentBlock[];
  
  // For practice, challenge, project
  language?: 'web' | 'python' | 'git' | string;
  runtime?: string;
  starterCode?: string;
  starterCss?: string;
  starterJs?: string;
  starterPy?: string;
  hints?: string[];
  requirements?: ChallengeRequirement[];
  
  // For quiz
  questions?: QuizQuestion[];
  
  xpReward: number;
  order?: number;
  status?: string;
};

export type Module = {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
};

export type CourseLevel = {
  id: string;
  title: string;
  description: string;
  modules: Module[];
};

export type Course = {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  icon: string;
  order?: number;
  levels: CourseLevel[];
};

export type UserProgress = {
  xp: number;
  streak: number;
  completedLessons: string[]; // array of lesson IDs
  courseProgress: Record<string, number>; // courseId -> percentage
  completedProjects?: string[]; // array of completed project IDs
};
