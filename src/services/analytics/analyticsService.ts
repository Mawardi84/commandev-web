/**
 * COMMANDEV Academy - Analytics Tracking Service
 * Central observational telemetry engine with non-blocking execution,
 * privacy sanitization, event validation, deduplication, and multi-provider dispatch.
 * 
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * 1. Analytics is strictly OBSERVATIONAL.
 * 2. Analytics MUST NOT mutate or control XP, streak, scores, completions, or unlocks.
 * 3. Analytics failure is completely NON-BLOCKING for all learning operations.
 */

import {
  AnalyticsEvent,
  AnalyticsEventInput,
  AnalyticsProvider,
  AnalyticsConfig
} from '../../types/analytics';
import { sanitizeAnalyticsProperties } from './analyticsSanitizer';
import { validateAnalyticsEvent } from './analyticsValidator';
import { InternalAnalyticsProvider } from './providers/internalProvider';
import { GA4AnalyticsProvider, PostHogAnalyticsProvider, MixpanelAnalyticsProvider } from './providers/externalAdapter';

export class AnalyticsService {
  private providers: AnalyticsProvider[] = [];
  private currentUserId?: string;
  private currentSessionId: string;
  private config: AnalyticsConfig;
  private deduplicationCache = new Set<string>();
  private readonly MAX_DEDUP_CACHE_SIZE = 500;

  constructor(config?: Partial<AnalyticsConfig>) {
    this.config = {
      enabled: true,
      debugMode: false,
      apiEndpoint: '/api/analytics/events',
      ...config
    };

    // Initialize anonymous session ID (safe, no PII)
    this.currentSessionId = this.initializeSessionId();

    // Register default internal provider
    this.providers.push(new InternalAnalyticsProvider(this.config.apiEndpoint));

    // Register dormant adapters (boundary for future integration)
    const gaMeasurementId = typeof import.meta !== 'undefined' && import.meta.env
      ? (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined)
      : undefined;
    this.providers.push(new GA4AnalyticsProvider(gaMeasurementId));
    this.providers.push(new PostHogAnalyticsProvider());
    this.providers.push(new MixpanelAnalyticsProvider());
  }

  /**
   * Initializes or restores an anonymous, ephemeral session identifier.
   */
  private initializeSessionId(): string {
    const defaultId = `sess_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`;
    if (typeof window === 'undefined' || !window.sessionStorage) {
      return defaultId;
    }
    try {
      const stored = window.sessionStorage.getItem('cmd_anon_session_id');
      if (stored && stored.startsWith('sess_')) {
        return stored;
      }
      window.sessionStorage.setItem('cmd_anon_session_id', defaultId);
      return defaultId;
    } catch {
      return defaultId;
    }
  }

  /**
   * Generates a unique, non-colliding event identifier.
   */
  public generateEventId(): string {
    return `evt_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`;
  }

  /**
   * Sets current authenticated user ID (safe UID only, never email).
   */
  public setUserId(userId?: string): void {
    this.currentUserId = userId || undefined;
  }

  public getUserId(): string | undefined {
    return this.currentUserId;
  }

  public getSessionId(): string {
    return this.currentSessionId;
  }

  public addProvider(provider: AnalyticsProvider): void {
    this.providers.push(provider);
  }

  public getProviders(): AnalyticsProvider[] {
    return [...this.providers];
  }

  public setEnabled(enabled: boolean): void {
    this.config.enabled = enabled;
  }

  public isEnabled(): boolean {
    return this.config.enabled;
  }

  /**
   * Core tracking method:
   * Sanitizes, validates, deduplicates, and dispatches the event.
   * Completely NON-BLOCKING: will never throw or reject.
   */
  public trackEvent(input: AnalyticsEventInput): AnalyticsEvent | null {
    if (!this.config.enabled) return null;

    try {
      const eventId = input.eventId || this.generateEventId();
      const timestamp = input.timestamp || new Date().toISOString();
      const source = input.source || 'web';
      const userId = input.userId || this.currentUserId;
      const sessionId = input.sessionId || this.currentSessionId;

      // 1. Deduplication check for critical milestone events
      const dedupKey = `${input.eventName}:${input.courseId || ''}:${input.lessonId || ''}:${input.projectId || ''}:${input.quizId || ''}:${input.simulatorId || ''}:${userId || 'anon'}`;
      if (this.isMilestoneEvent(input.eventName)) {
        if (this.deduplicationCache.has(dedupKey)) {
          if (this.config.debugMode) {
            console.info(`[Analytics] Ignored duplicate milestone event: ${dedupKey}`);
          }
          return null;
        }
        this.addToDedupCache(dedupKey);
      }

      // 2. Strict Privacy Sanitization
      const cleanProperties = sanitizeAnalyticsProperties(input.eventName, input.properties);

      // 3. Assemble complete event
      const event: AnalyticsEvent = {
        eventId,
        eventName: input.eventName,
        userId,
        sessionId,
        timestamp,
        source,
        courseId: input.courseId,
        moduleId: input.moduleId,
        lessonId: input.lessonId,
        projectId: input.projectId,
        quizId: input.quizId,
        challengeId: input.challengeId,
        simulatorId: input.simulatorId,
        properties: cleanProperties
      };

      // 4. Validation
      const validation = validateAnalyticsEvent(event);
      if (!validation.isValid) {
        if (this.config.debugMode) {
          console.warn(`[Analytics] Event validation failed: ${validation.error}`, event);
        }
        return null;
      }

      // 5. Multi-Provider Dispatch (fire-and-forget)
      for (const provider of this.providers) {
        if (provider.isEnabled()) {
          try {
            provider.track(event);
          } catch (providerErr) {
            if (this.config.debugMode) {
              console.warn(`[Analytics] Provider ${provider.name} failed:`, providerErr);
            }
          }
        }
      }

      return event;
    } catch (err) {
      // Non-blocking fallback: never fail caller execution
      if (this.config.debugMode) {
        console.error('[Analytics] Failed tracking event:', err);
      }
      return null;
    }
  }

  private isMilestoneEvent(eventName: string): boolean {
    return (
      eventName === 'lesson_completed' ||
      eventName === 'quiz_completed' ||
      eventName === 'project_submitted' ||
      eventName === 'project_evaluated' ||
      eventName === 'course_completed'
    );
  }

  private addToDedupCache(key: string): void {
    if (this.deduplicationCache.size >= this.MAX_DEDUP_CACHE_SIZE) {
      // Clear oldest half of items to prevent unbounded growth
      const entries = Array.from(this.deduplicationCache);
      const toRemove = entries.slice(0, Math.floor(entries.length / 2));
      toRemove.forEach(k => this.deduplicationCache.delete(k));
    }
    this.deduplicationCache.add(key);
  }

  public clearDeduplicationCache(): void {
    this.deduplicationCache.clear();
  }

  // --- Convenience Observational Helpers ---

  public trackPageView(page: string, title?: string, viewMode?: string): void {
    this.trackEvent({
      eventName: 'page_viewed',
      properties: { page, title, viewMode }
    });
  }

  public trackCourseStarted(courseId: string, courseTitle?: string, category?: string): void {
    this.trackEvent({
      eventName: 'course_started',
      courseId,
      properties: { courseTitle, category, enrolledAt: new Date().toISOString() }
    });
  }

  public trackCourseCompleted(courseId: string, courseTitle?: string, totalXpEarned?: number): void {
    this.trackEvent({
      eventName: 'course_completed',
      courseId,
      properties: { courseTitle, totalXpEarned }
    });
  }

  public trackLessonStarted(courseId: string, lessonId: string, moduleId?: string, lessonTitle?: string, lessonType?: string): void {
    this.trackEvent({
      eventName: 'lesson_started',
      courseId,
      lessonId,
      moduleId,
      properties: { lessonTitle, lessonType }
    });
  }

  public trackLessonCompleted(courseId: string, lessonId: string, xpGained: number, moduleId?: string, lessonTitle?: string): void {
    this.trackEvent({
      eventName: 'lesson_completed',
      courseId,
      lessonId,
      moduleId,
      properties: { lessonTitle, xpGained }
    });
  }

  public trackQuizStarted(quizId: string, courseId?: string, moduleId?: string, questionCount?: number): void {
    this.trackEvent({
      eventName: 'quiz_started',
      quizId,
      courseId,
      moduleId,
      properties: { questionCount }
    });
  }

  public trackQuizAttempted(quizId: string, score: number, passed: boolean, attemptNumber?: number, courseId?: string, moduleId?: string): void {
    this.trackEvent({
      eventName: 'quiz_attempted',
      quizId,
      courseId,
      moduleId,
      properties: { score, passed, attemptNumber }
    });
  }

  public trackProjectViewed(projectId: string, projectTitle?: string, category?: string): void {
    this.trackEvent({
      eventName: 'project_viewed',
      projectId,
      properties: { projectTitle, category }
    });
  }

  public trackProjectSubmitted(projectId: string, submissionId: string): void {
    this.trackEvent({
      eventName: 'project_submitted',
      projectId,
      properties: { submissionId }
    });
  }

  public trackProjectEvaluated(projectId: string, submissionId: string, score: number, passed: boolean, evaluatorVersion?: number): void {
    this.trackEvent({
      eventName: 'project_evaluated',
      projectId,
      properties: { submissionId, score, passed, evaluatorVersion }
    });
  }

  public trackSimulatorStarted(simulatorId: string, simulatorName?: string, courseId?: string): void {
    this.trackEvent({
      eventName: 'simulator_started',
      simulatorId,
      courseId,
      properties: { simulatorName }
    });
  }

  public trackSimulatorCompleted(simulatorId: string, simulatorName?: string, scenarioName?: string, courseId?: string): void {
    this.trackEvent({
      eventName: 'simulator_completed',
      simulatorId,
      courseId,
      properties: { simulatorName, scenarioName }
    });
  }

  public trackPlaygroundOpened(language?: string): void {
    this.trackEvent({
      eventName: 'playground_opened',
      properties: { language }
    });
  }

  public trackCodeExecution(language: string, success: boolean, executionTimeMs?: number): void {
    this.trackEvent({
      eventName: 'code_execution_completed',
      properties: { language, success, executionTimeMs }
    });
  }

  public trackSearch(query: string, resultCount: number, categoryFilter?: string): void {
    // Privacy: Only capture query length to avoid collecting sensitive inputs
    this.trackEvent({
      eventName: 'search_performed',
      properties: { queryLength: query.trim().length, resultCount, categoryFilter }
    });
  }

  public trackLogin(authProvider?: string, isNewUser?: boolean): void {
    this.trackEvent({
      eventName: 'login_completed',
      properties: { authProvider, isNewUser }
    });
  }

  public trackLogout(): void {
    this.trackEvent({
      eventName: 'logout_completed'
    });
  }
}

// Global singleton instance
export const analyticsService = new AnalyticsService();
