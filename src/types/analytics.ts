/**
 * COMMANDEV Academy - Analytics Foundation & Dashboard Telemetry Types
 * Central event contract, taxonomy, provider interfaces, and Admin Dashboard DTOs.
 * 
 * ARCHITECTURAL PRINCIPLE:
 * Analytics is strictly OBSERVATIONAL and NEVER AUTHORITATIVE.
 * Analytics does not determine progress, scores, completions, XP, or streak.
 */

export type AnalyticsEventName =
  | 'page_viewed'
  | 'course_viewed'
  | 'course_started'
  | 'course_completed'
  | 'module_viewed'
  | 'module_started'
  | 'module_completed'
  | 'lesson_viewed'
  | 'lesson_started'
  | 'lesson_completed'
  | 'quiz_started'
  | 'quiz_attempted'
  | 'quiz_completed'
  | 'quiz_passed'
  | 'challenge_started'
  | 'challenge_attempted'
  | 'challenge_completed'
  | 'project_viewed'
  | 'project_started'
  | 'project_submitted'
  | 'project_evaluated'
  | 'simulator_started'
  | 'simulator_completed'
  | 'playground_opened'
  | 'code_execution_started'
  | 'code_execution_completed'
  | 'search_performed'
  | 'login_completed'
  | 'logout_completed'
  | 'xp_earned'
  | 'streak_updated';

export type AnalyticsSource = 'web' | 'server';

export interface AnalyticsEvent {
  eventId: string;
  eventName: AnalyticsEventName;
  userId?: string;
  sessionId?: string;
  timestamp: string; // ISO 8601 string
  source: AnalyticsSource;
  courseId?: string;
  moduleId?: string;
  lessonId?: string;
  projectId?: string;
  quizId?: string;
  challengeId?: string;
  simulatorId?: string;
  properties?: Record<string, unknown>;
}

export type AnalyticsEventInput = Omit<AnalyticsEvent, 'eventId' | 'timestamp' | 'source'> & {
  eventId?: string;
  timestamp?: string;
  source?: AnalyticsSource;
};

export interface AnalyticsProvider {
  name: string;
  isEnabled(): boolean;
  track(event: AnalyticsEvent): void | Promise<void>;
}

export interface AnalyticsConfig {
  enabled: boolean;
  debugMode?: boolean;
  maxPayloadBytes?: number;
  apiEndpoint?: string;
}

export type AnalyticsDateRange = 'today' | '7d' | '30d' | '90d' | 'custom';

export interface ActivityTrendPoint {
  date: string; // YYYY-MM-DD
  activeUsers: number;
  sessions: number;
  lessonCompletions: number;
  quizAttempts: number;
  projectSubmissions: number;
}

export interface CourseAnalyticsDTO {
  courseId: string;
  courseTitle: string;
  learnersCount: number;
  activeLearnersCount: number;
  startedCount: number;
  completedCount: number;
  avgProgress: number;
  quizPassRate: number;
  projectPassRate: number;
}

export interface SimulatorAnalyticsDTO {
  simulatorId: string;
  simulatorName: string;
  startsCount: number;
  completionsCount: number;
  uniqueLearnersCount: number;
  completionRate: number;
}

export interface ContentLifecycleMetricsDTO {
  totalCourses: number;
  totalModules: number;
  totalLessons: number;
  totalProjects: number;
  totalQuizzes: number;
  totalSimulators: number;
  statusBreakdown: {
    published: number;
    draft: number;
    review: number;
    archived: number;
  };
}

export interface SystemHealthAnalyticsDTO {
  apiAvailability: number;
  uptimeSeconds: number;
  dbStatus: 'healthy' | 'degraded' | 'offline';
  memoryHeapMb: number;
  totalErrors: number;
  avgResponseTimeMs: number;
}

export interface RetentionMetricDTO {
  period: 'Day 1' | 'Day 7' | 'Day 30';
  cohortDate: string;
  cohortSize: number;
  returnedUsers: number;
  retentionRatePercentage: number;
  definition: string;
}

export interface FunnelStepDTO {
  stepName: string;
  eventName: AnalyticsEventName;
  userCount: number;
  conversionRatePercentage: number;
  dropoffPercentage: number;
}

export interface FunnelMetricDTO {
  funnelId: string;
  funnelName: string;
  steps: FunnelStepDTO[];
  generatedAt: string;
}

export interface AnalyticsSummaryDTO {
  totalEvents: number;
  uniqueUsers: number;
  activeSessions: number;
  eventsByName: Record<string, number>;
  lessonCompletions: number;
  quizPassRate: number;
  projectSubmissions: number;
  projectPassRate: number;
  averageProjectScore: number;
  simulatorUsageCount: number;
  challengesCompleted: number;
  dau: number;
  wau: number;
  mau: number;
  generatedAt: string;
  dateRange: AnalyticsDateRange;
  activityTrends?: ActivityTrendPoint[];
  funnel?: FunnelMetricDTO;
  courseAnalytics?: CourseAnalyticsDTO[];
  simulatorAnalytics?: SimulatorAnalyticsDTO[];
  contentMetrics?: ContentLifecycleMetricsDTO;
  healthMetrics?: SystemHealthAnalyticsDTO;
  retentionMetrics?: RetentionMetricDTO[];
}

export interface RawEventsQueryResponse {
  events: AnalyticsEvent[];
  count: number;
  totalCount: number;
  page: number;
  totalPages: number;
}
