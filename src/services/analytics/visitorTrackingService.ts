/**
 * COMMANDEV Academy - Privacy-Hardened Visitor Traffic & Telemetry Service
 * 
 * SECURITY & PRIVACY MANDATES:
 * 1. Client NEVER determines or supplies IP, Geo location, or Email.
 * 2. Ingestion boundary is strictly server-authoritative via `/api/track/visit`.
 * 3. Raw IPs are NEVER persisted; server handles cryptographic hashing (ipHash) and privacy masking (maskedIp).
 * 4. Direct Firestore reads require authenticated Firebase administrator authorization.
 * 5. Telemetry is observational and 100% failure-isolated (never impacts UX or core platform features).
 */

import { doc, getDocs, getDoc, collection, query, orderBy, limit } from 'firebase/firestore';
import { db, auth } from '../../lib/firebase';
import { VisitorTrafficEntry, VisitorTrafficSummary } from '../../types/analytics';

// Session tracking helper (scoped to browser session)
function getOrCreateSessionId(): string {
  try {
    let sid = sessionStorage.getItem('commandev_session_id');
    if (!sid) {
      sid = `ses_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      sessionStorage.setItem('commandev_session_id', sid);
    }
    return sid;
  } catch {
    return `ses_fallback_${Date.now()}`;
  }
}

// User-Agent & Device Parser (Observational telemetry only)
function parseUserAgent(): { browser: string; os: string; device: 'Desktop' | 'Mobile' | 'Tablet' } {
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  let browser = 'Browser Lainnya';
  let os = 'OS Lainnya';
  let device: 'Desktop' | 'Mobile' | 'Tablet' = 'Desktop';

  // Device classification
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    device = 'Tablet';
  } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated/i.test(ua)) {
    device = 'Mobile';
  } else {
    device = 'Desktop';
  }

  // Operating System
  if (/Windows NT 10.0/i.test(ua)) os = 'Windows 10/11';
  else if (/Windows NT/i.test(ua)) os = 'Windows';
  else if (/Android/i.test(ua)) os = 'Android';
  else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';
  else if (/Macintosh|Mac OS X/i.test(ua)) os = 'macOS';
  else if (/Linux/i.test(ua)) os = 'Linux';

  // Browser engine & brand
  if (/Edg\//i.test(ua)) browser = 'Microsoft Edge';
  else if (/Chrome\//i.test(ua) && !/Chromium|Edg\//i.test(ua)) browser = 'Google Chrome';
  else if (/Safari\//i.test(ua) && !/Chrome|Chromium/i.test(ua)) browser = 'Apple Safari';
  else if (/Firefox\//i.test(ua)) browser = 'Mozilla Firefox';
  else if (/Opera|OPR\//i.test(ua)) browser = 'Opera';

  return { browser, os, device };
}

/**
 * Verifies if the current Firebase user has administrative authority
 * Prevents non-admin or student accounts from executing direct Firestore queries on visitor_traffic.
 */
async function isClientAuthorizedAdmin(): Promise<boolean> {
  if (!auth?.currentUser) return false;

  try {
    // 1. Check custom claim token if available
    const tokenResult = await auth.currentUser.getIdTokenResult();
    if (tokenResult.claims && tokenResult.claims.admin === true) {
      return true;
    }

    // 2. Check designated administrator emails
    const email = (auth.currentUser.email || '').toLowerCase().trim();
    if (['fxmawardi@gmail.com', 'admin@commandev.com', 'admin@codera.academy'].includes(email)) {
      return true;
    }

    // 3. Check Firestore admins/{uid} document
    if (db) {
      const adminDocRef = doc(db, 'admins', auth.currentUser.uid);
      const adminDocSnap = await getDoc(adminDocRef);
      if (adminDocSnap.exists() && adminDocSnap.data()?.status === 'active') {
        return true;
      }
    }
  } catch {
    return false;
  }

  return false;
}

class VisitorTrackingService {
  private lastTrackedPath: string = '';
  private lastTrackedTime: number = 0;

  /**
   * Tracks a page visit through the secure server ingestion boundary.
   * Client NEVER determines IP, country, or email.
   * All network metadata is determined server-side.
   */
  async recordVisit(pathOverride?: string, titleOverride?: string): Promise<boolean> {
    try {
      const currentPath = pathOverride || (typeof window !== 'undefined' ? window.location.pathname + window.location.hash : '/');
      const now = Date.now();

      // Debounce duplicate tracking on the same path within 5 seconds
      if (currentPath === this.lastTrackedPath && (now - this.lastTrackedTime) < 5000) {
        return false;
      }
      this.lastTrackedPath = currentPath;
      this.lastTrackedTime = now;

      const uaInfo = parseUserAgent();
      const sessionId = getOrCreateSessionId();

      // Observational client telemetry payload only. NO IP, NO GEO, NO EMAIL.
      const payload = {
        browser: uaInfo.browser,
        os: uaInfo.os,
        device: uaInfo.device,
        path: currentPath.substring(0, 200),
        pageTitle: (titleOverride || (typeof document !== 'undefined' ? document.title : 'COMMANDEV Platform')).substring(0, 100),
        referrer: (typeof document !== 'undefined' && document.referrer ? document.referrer : 'Langsung (Direct)').substring(0, 200),
        sessionId,
        screenResolution: typeof window !== 'undefined' && window.screen ? `${window.screen.width}x${window.screen.height}` : undefined,
        language: typeof navigator !== 'undefined' ? navigator.language : 'id-ID'
      };

      // Authenticated token attribution if available (server verifies UID)
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };

      if (auth?.currentUser) {
        try {
          const token = await auth.currentUser.getIdToken();
          if (token) {
            headers['Authorization'] = `Bearer ${token}`;
          }
        } catch {
          // Continue unauthenticated if token retrieval fails
        }
      }

      // Ingest exclusively through secure server endpoint (Non-blocking fire-and-forget)
      fetch('/api/track/visit', {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      }).catch(() => {
        // Complete isolation: failure never affects application UX or execution
      });

      return true;
    } catch {
      // Safe fallback: never throw or block main application thread
      return false;
    }
  }

  /**
   * Fetches real visitor traffic logs & aggregates stats directly from Firestore
   * Strictly requires administrator verification (cannot be bypassed by student or guest users).
   */
  async getVisitorTrafficFromFirestore(limitCount: number = 100): Promise<VisitorTrafficSummary> {
    const emptySummary: VisitorTrafficSummary = {
      totalVisits: 0,
      uniqueIps: 0,
      activeSessions: 0,
      visitsToday: 0,
      deviceBreakdown: { desktop: 0, mobile: 0, tablet: 0 },
      topIps: [],
      topPages: [],
      topBrowsers: [],
      topReferrers: [],
      recentVisitors: []
    };

    if (!db) return emptySummary;

    // Direct Firestore fallback authorization check: Must be an authenticated administrator
    const isAuthorized = await isClientAuthorizedAdmin();
    if (!isAuthorized) {
      console.warn('[VisitorTracker] Unauthorized direct read attempt blocked on visitor_traffic.');
      return emptySummary;
    }

    try {
      const q = query(
        collection(db, 'visitor_traffic'),
        orderBy('timestamp', 'desc'),
        limit(Math.min(limitCount, 200))
      );

      const snap = await getDocs(q);
      const entries: VisitorTrafficEntry[] = [];
      const ipCounts = new Map<string, { maskedIp: string; ipHash: string; count: number; country?: string; lastSeen: string }>();
      const sessionSet = new Set<string>();
      const pageCounts = new Map<string, { count: number; title?: string }>();
      const browserCounts = new Map<string, number>();
      const referrerCounts = new Map<string, number>();

      const todayStr = new Date().toISOString().split('T')[0];

      snap.forEach((d) => {
        const item = d.data() as VisitorTrafficEntry;
        const masked = item.maskedIp || '***.***.***.***';
        const hash = item.ipHash || `hash_${item.id}`;

        const sanitizedEntry: VisitorTrafficEntry = {
          id: d.id,
          maskedIp: masked,
          ipHash: hash,
          ip: masked, // UI display alias (always masked)
          city: item.city || 'Unknown',
          country: item.country || 'Unknown',
          countryCode: item.countryCode || 'XX',
          region: item.region || 'Unknown',
          browser: item.browser || 'Browser',
          os: item.os || 'OS',
          device: item.device || 'Desktop',
          path: item.path || '/',
          pageTitle: item.pageTitle || 'COMMANDEV',
          referrer: item.referrer || 'Langsung (Direct)',
          timestamp: item.timestamp || new Date().toISOString(),
          visitorType: item.visitorType || (item.userId ? 'authenticated' : 'anonymous'),
          userId: item.userId,
          sessionId: item.sessionId || 'ses_unknown'
        };

        entries.push(sanitizedEntry);

        // Aggregate by IP hash for privacy
        const curIp = ipCounts.get(hash) || { maskedIp: masked, ipHash: hash, count: 0, country: sanitizedEntry.country, lastSeen: sanitizedEntry.timestamp };
        curIp.count += 1;
        if (!curIp.country && sanitizedEntry.country) curIp.country = sanitizedEntry.country;
        ipCounts.set(hash, curIp);

        // Session aggregation
        if (sanitizedEntry.sessionId) sessionSet.add(sanitizedEntry.sessionId);

        // Today visits
        if (sanitizedEntry.timestamp && sanitizedEntry.timestamp.startsWith(todayStr)) {
          emptySummary.visitsToday += 1;
        }

        // Device breakdown
        if (sanitizedEntry.device === 'Mobile') emptySummary.deviceBreakdown.mobile += 1;
        else if (sanitizedEntry.device === 'Tablet') emptySummary.deviceBreakdown.tablet += 1;
        else emptySummary.deviceBreakdown.desktop += 1;

        // Pages aggregation
        const pathKey = sanitizedEntry.path || '/';
        const curPage = pageCounts.get(pathKey) || { count: 0, title: sanitizedEntry.pageTitle };
        curPage.count += 1;
        pageCounts.set(pathKey, curPage);

        // Browser aggregation
        const bKey = sanitizedEntry.browser || 'Lainnya';
        browserCounts.set(bKey, (browserCounts.get(bKey) || 0) + 1);

        // Referrer aggregation
        const rKey = sanitizedEntry.referrer || 'Direct';
        referrerCounts.set(rKey, (referrerCounts.get(rKey) || 0) + 1);
      });

      emptySummary.totalVisits = entries.length;
      emptySummary.uniqueIps = ipCounts.size;
      emptySummary.activeSessions = sessionSet.size;
      emptySummary.recentVisitors = entries;

      // Top IPs (Represented by maskedIp)
      emptySummary.topIps = Array.from(ipCounts.values())
        .map((data) => ({ ip: data.maskedIp, maskedIp: data.maskedIp, ipHash: data.ipHash, count: data.count, country: data.country, lastSeen: data.lastSeen }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      // Top Pages
      emptySummary.topPages = Array.from(pageCounts.entries())
        .map(([path, data]) => ({ path, count: data.count, title: data.title }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      // Top Browsers
      emptySummary.topBrowsers = Array.from(browserCounts.entries())
        .map(([browser, count]) => ({ browser, count }))
        .sort((a, b) => b.count - a.count);

      // Top Referrers
      emptySummary.topReferrers = Array.from(referrerCounts.entries())
        .map(([referrer, count]) => ({ referrer, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      return emptySummary;
    } catch (err) {
      console.warn('[VisitorTracker] Firestore query failed or denied:', err);
      return emptySummary;
    }
  }
}

export const visitorTracker = new VisitorTrackingService();
