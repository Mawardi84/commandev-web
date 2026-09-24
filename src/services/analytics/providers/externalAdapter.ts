/**
 * COMMANDEV Academy - External Analytics Provider Adapters (GA4, PostHog, Mixpanel)
 * Architecture boundaries for future third-party analytics integrations.
 * 
 * NOTE: These providers are dormant / optional by default and do NOT require
 * external vendor SDKs or environment variables to start the application.
 */

import { AnalyticsEvent, AnalyticsProvider } from '../../../types/analytics';

/**
 * Optional Google Analytics 4 (GA4) Adapter
 */
export class GA4AnalyticsProvider implements AnalyticsProvider {
  public readonly name = 'ga4';
  private measurementId?: string;

  constructor(measurementId?: string) {
    this.measurementId = measurementId;
  }

  public isEnabled(): boolean {
    // Only enabled if measurement ID is explicitly configured and window.gtag exists
    return Boolean(this.measurementId && typeof window !== 'undefined' && typeof (window as any).gtag === 'function');
  }

  public track(event: AnalyticsEvent): void {
    if (!this.isEnabled()) return;
    try {
      (window as any).gtag('event', event.eventName, {
        event_id: event.eventId,
        user_id: event.userId,
        session_id: event.sessionId,
        course_id: event.courseId,
        module_id: event.moduleId,
        lesson_id: event.lessonId,
        project_id: event.projectId,
        ...event.properties
      });
    } catch {
      // Non-blocking
    }
  }
}

/**
 * Optional PostHog Adapter
 */
export class PostHogAnalyticsProvider implements AnalyticsProvider {
  public readonly name = 'posthog';

  public isEnabled(): boolean {
    return Boolean(typeof window !== 'undefined' && (window as any).posthog && typeof (window as any).posthog.capture === 'function');
  }

  public track(event: AnalyticsEvent): void {
    if (!this.isEnabled()) return;
    try {
      (window as any).posthog.capture(event.eventName, {
        eventId: event.eventId,
        sessionId: event.sessionId,
        courseId: event.courseId,
        moduleId: event.moduleId,
        lessonId: event.lessonId,
        projectId: event.projectId,
        ...event.properties
      });
    } catch {
      // Non-blocking
    }
  }
}

/**
 * Optional Mixpanel Adapter
 */
export class MixpanelAnalyticsProvider implements AnalyticsProvider {
  public readonly name = 'mixpanel';

  public isEnabled(): boolean {
    return Boolean(typeof window !== 'undefined' && (window as any).mixpanel && typeof (window as any).mixpanel.track === 'function');
  }

  public track(event: AnalyticsEvent): void {
    if (!this.isEnabled()) return;
    try {
      (window as any).mixpanel.track(event.eventName, {
        eventId: event.eventId,
        sessionId: event.sessionId,
        courseId: event.courseId,
        moduleId: event.moduleId,
        lessonId: event.lessonId,
        projectId: event.projectId,
        ...event.properties
      });
    } catch {
      // Non-blocking
    }
  }
}
