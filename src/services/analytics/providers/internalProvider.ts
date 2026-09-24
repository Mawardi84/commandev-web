/**
 * COMMANDEV Academy - Internal Analytics Provider
 * Transmits sanitized, validated analytics events to the platform's
 * canonical analytics backend endpoint (/api/analytics/events).
 * 
 * NON-BLOCKING:
 * Network errors or service degradation never bubble up to user actions.
 */

import { AnalyticsEvent, AnalyticsProvider } from '../../../types/analytics';

export class InternalAnalyticsProvider implements AnalyticsProvider {
  public readonly name = 'internal';
  private endpoint: string;
  private enabled: boolean;

  constructor(endpoint = '/api/analytics/events', enabled = true) {
    this.endpoint = endpoint;
    this.enabled = enabled;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public setEnabled(status: boolean): void {
    this.enabled = status;
  }

  public async track(event: AnalyticsEvent): Promise<void> {
    if (!this.enabled) return;

    try {
      // Non-blocking fire-and-forget network transmission
      if (typeof window !== 'undefined' && window.fetch) {
        // Use keepalive if supported for unload robustness
        window.fetch(this.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(event),
          keepalive: true
        }).catch(() => {
          // Silent fallback for non-blocking analytics
        });
      }
    } catch {
      // Swallow error: analytics MUST NOT disrupt user operations
    }
  }
}
