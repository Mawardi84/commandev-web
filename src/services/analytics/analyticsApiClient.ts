/**
 * COMMANDEV Academy - Admin Analytics API Client
 * Secure, authenticated client for retrieving aggregated metrics and raw event stream.
 * 
 * INVARIANT:
 * Server remains strictly authoritative. All calls require verified Bearer tokens.
 */

import { AnalyticsSummaryDTO, AnalyticsDateRange, RawEventsQueryResponse } from '../../types/analytics';
import { auth } from '../../lib/firebase';

export async function getAdminAuthHeaders(): Promise<HeadersInit> {
  let token = '';
  if (auth && auth.currentUser) {
    try {
      token = await auth.currentUser.getIdToken();
    } catch (e) {
      console.error('Error fetching admin token:', e);
    }
  }
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
}

export async function fetchAnalyticsSummary(
  range: AnalyticsDateRange = '30d',
  startDate?: string,
  endDate?: string
): Promise<AnalyticsSummaryDTO> {
  const headers = await getAdminAuthHeaders();
  const query = new URLSearchParams({ range });
  if (startDate) query.set('startDate', startDate);
  if (endDate) query.set('endDate', endDate);

  const res = await fetch(`/api/admin/analytics/summary?${query.toString()}`, { headers });
  if (!res.ok) {
    const errorText = await res.text().catch(() => 'Gagal mengambil data analitik');
    throw new Error(errorText || `HTTP ${res.status}: Gagal memuat ringkasan analitik`);
  }
  return res.json();
}

export interface RawEventsQueryParams {
  page?: number;
  limit?: number;
  eventName?: string;
  courseId?: string;
  projectId?: string;
  userId?: string;
  source?: string;
}

export async function fetchRawAnalyticsEvents(
  params: RawEventsQueryParams = {}
): Promise<RawEventsQueryResponse> {
  const headers = await getAdminAuthHeaders();
  const query = new URLSearchParams();
  if (params.page) query.set('page', String(params.page));
  if (params.limit) query.set('limit', String(params.limit));
  if (params.eventName) query.set('eventName', params.eventName);
  if (params.courseId) query.set('courseId', params.courseId);
  if (params.projectId) query.set('projectId', params.projectId);
  if (params.userId) query.set('userId', params.userId);
  if (params.source) query.set('source', params.source);

  const res = await fetch(`/api/admin/analytics/events?${query.toString()}`, { headers });
  if (!res.ok) {
    const errorText = await res.text().catch(() => 'Gagal mengambil daftar event');
    throw new Error(errorText || `HTTP ${res.status}: Gagal memuat daftar event`);
  }
  return res.json();
}
