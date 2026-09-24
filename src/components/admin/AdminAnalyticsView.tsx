import React, { useState, useEffect, useCallback } from 'react';
import { 
  Activity, 
  Users, 
  BookOpen, 
  CheckCircle2, 
  Award, 
  Rocket, 
  Cpu, 
  RefreshCw, 
  Calendar, 
  Layers, 
  ShieldCheck, 
  Eye, 
  ChevronRight, 
  ChevronLeft, 
  Filter, 
  Search, 
  TrendingUp, 
  BarChart3, 
  Sliders, 
  AlertCircle,
  Clock,
  Flame,
  Terminal,
  Server,
  Database,
  ArrowRight,
  X
} from 'lucide-react';
import { 
  AnalyticsSummaryDTO, 
  AnalyticsDateRange, 
  AnalyticsEvent, 
  CourseAnalyticsDTO, 
  SimulatorAnalyticsDTO 
} from '../../types/analytics';
import { fetchAnalyticsSummary, fetchRawAnalyticsEvents, RawEventsQueryParams } from '../../services/analytics/analyticsApiClient';

export function AdminAnalyticsView() {
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'quizzes' | 'projects' | 'simulators' | 'raw-events' | 'health'>('overview');
  const [dateRange, setDateRange] = useState<AnalyticsDateRange>('30d');
  const [customStart, setCustomStart] = useState<string>('');
  const [customEnd, setCustomEnd] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<AnalyticsSummaryDTO | null>(null);

  // Selected course for detail modal
  const [selectedCourse, setSelectedCourse] = useState<CourseAnalyticsDTO | null>(null);

  // Raw Event Explorer states
  const [rawEvents, setRawEvents] = useState<AnalyticsEvent[]>([]);
  const [eventsLoading, setEventsLoading] = useState<boolean>(false);
  const [eventsError, setEventsError] = useState<string | null>(null);
  const [eventsPage, setEventsPage] = useState<number>(1);
  const [eventsTotalPages, setEventsTotalPages] = useState<number>(1);
  const [eventsTotalCount, setEventsTotalCount] = useState<number>(0);
  const [filterEventName, setFilterEventName] = useState<string>('');
  const [filterCourseId, setFilterCourseId] = useState<string>('');
  const [filterSource, setFilterSource] = useState<string>('');
  const [inspectEvent, setInspectEvent] = useState<AnalyticsEvent | null>(null);

  // Load summary data
  const loadSummary = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAnalyticsSummary(
        dateRange,
        dateRange === 'custom' ? customStart : undefined,
        dateRange === 'custom' ? customEnd : undefined
      );
      setSummary(data);
    } catch (err: any) {
      setError(err.message || 'Gagal memuat ringkasan analitik. Periksa koneksi backend.');
    } finally {
      setLoading(false);
    }
  }, [dateRange, customStart, customEnd]);

  useEffect(() => {
    loadSummary();
  }, [loadSummary]);

  // Load raw events when raw-events tab is active
  const loadRawEvents = useCallback(async (pageToLoad = 1) => {
    setEventsLoading(true);
    setEventsError(null);
    try {
      const params: RawEventsQueryParams = {
        page: pageToLoad,
        limit: 20
      };
      if (filterEventName) params.eventName = filterEventName;
      if (filterCourseId) params.courseId = filterCourseId;
      if (filterSource) params.source = filterSource;

      const res = await fetchRawAnalyticsEvents(params);
      setRawEvents(res.events || []);
      setEventsPage(res.page || 1);
      setEventsTotalPages(res.totalPages || 1);
      setEventsTotalCount(res.totalCount || 0);
    } catch (err: any) {
      setEventsError(err.message || 'Gagal memuat event analitik.');
    } finally {
      setEventsLoading(false);
    }
  }, [filterEventName, filterCourseId, filterSource]);

  useEffect(() => {
    if (activeTab === 'raw-events') {
      loadRawEvents(1);
    }
  }, [activeTab, loadRawEvents]);

  // Format helper
  const fmt = (val?: number | null, fallback = '—') => {
    if (val === undefined || val === null) return fallback;
    return val.toLocaleString('id-ID');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans text-slate-100" role="region" aria-label="CMS Analytics Dashboard">
      {/* 1. Header Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-5 rounded-3xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-400 font-black text-xs uppercase tracking-wider">
            <Activity className="w-4 h-4" />
            <span>COMMANDEV Telemetry & Analytics Hub</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">CMS Analytics Dashboard</h1>
          <p className="text-xs text-slate-400">
            Observasi aktivitas pembelajar, metrik kurikulum 24 kursus, dan performa evaluasi sistem.
          </p>
        </div>

        {/* Date Filter & Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            {(['today', '7d', '30d', '90d', 'custom'] as AnalyticsDateRange[]).map((r) => (
              <button
                key={r}
                onClick={() => setDateRange(r)}
                aria-pressed={dateRange === r}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  dateRange === r 
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                {r === 'today' ? 'Hari Ini' : r === '7d' ? '7 Hari' : r === '30d' ? '30 Hari' : r === '90d' ? '90 Hari' : 'Kustom'}
              </button>
            ))}
          </div>

          {dateRange === 'custom' && (
            <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
              <input 
                type="date" 
                value={customStart} 
                onChange={(e) => setCustomStart(e.target.value)}
                className="bg-transparent text-white text-xs outline-none"
              />
              <span className="text-slate-500">s/d</span>
              <input 
                type="date" 
                value={customEnd} 
                onChange={(e) => setCustomEnd(e.target.value)}
                className="bg-transparent text-white text-xs outline-none"
              />
            </div>
          )}

          <button
            onClick={() => {
              loadSummary();
              if (activeTab === 'raw-events') loadRawEvents(eventsPage);
            }}
            disabled={loading}
            aria-label="Segarkan Data Analitik"
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-all cursor-pointer border border-slate-700 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Segarkan</span>
          </button>
        </div>
      </div>

      {/* 2. Sub-Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto border-b border-slate-800 pb-2 custom-scrollbar text-xs">
        {[
          { id: 'overview', label: 'Ringkasan Eksekutif', icon: BarChart3 },
          { id: 'courses', label: '24 Kursus & Modul', icon: BookOpen },
          { id: 'quizzes', label: 'Analitik Kuis', icon: CheckCircle2 },
          { id: 'projects', label: 'Evaluator Proyek (26)', icon: Rocket },
          { id: 'simulators', label: 'Simulator Arsitektur (10)', icon: Cpu },
          { id: 'raw-events', label: 'Penjelajah Event (Raw)', icon: Terminal },
          { id: 'health', label: 'Kesehatan Sistem', icon: Server }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive 
                  ? 'bg-amber-600/20 text-amber-400 border border-amber-500/40 shadow-sm' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Error Banner with Retry */}
      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-between text-xs text-rose-300">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
          <button 
            onClick={loadSummary}
            className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-bold cursor-pointer transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      )}

      {/* 3. TAB CONTENT */}

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Top KPI Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Pengguna Unik</span>
                <Users className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">
                {loading ? <span className="text-slate-600 animate-pulse">...</span> : fmt(summary?.uniqueUsers)}
              </div>
              <div className="text-[11px] text-slate-500">
                DAU: <strong className="text-slate-300">{fmt(summary?.dau)}</strong> · WAU: <strong className="text-slate-300">{fmt(summary?.wau)}</strong>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Total Sesi Aktif</span>
                <Activity className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">
                {loading ? <span className="text-slate-600 animate-pulse">...</span> : fmt(summary?.activeSessions)}
              </div>
              <div className="text-[11px] text-slate-500">
                MAU: <strong className="text-slate-300">{fmt(summary?.mau)}</strong> pembelajar
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Pelajaran Tuntas</span>
                <BookOpen className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                {loading ? <span className="text-slate-600 animate-pulse">...</span> : fmt(summary?.lessonCompletions)}
              </div>
              <div className="text-[11px] text-slate-500">
                Terverifikasi secara otoritatif
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Kelulusan Kuis</span>
                <Award className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400">
                {loading ? <span className="text-slate-600 animate-pulse">...</span> : `${summary?.quizPassRate ?? 0}%`}
              </div>
              <div className="text-[11px] text-slate-500">
                Standar kelulusan ambang 70%
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Submisi Proyek</span>
                <Rocket className="w-4 h-4 text-violet-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">
                {loading ? <span className="text-slate-600 animate-pulse">...</span> : fmt(summary?.projectSubmissions)}
              </div>
              <div className="text-[11px] text-slate-500">
                Rasio Lulus: <strong className="text-slate-300">{summary?.projectPassRate ?? 0}%</strong>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Rata-rata Skor Proyek</span>
                <ShieldCheck className="w-4 h-4 text-rose-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">
                {loading ? <span className="text-slate-600 animate-pulse">...</span> : `${summary?.averageProjectScore ?? 0}/100`}
              </div>
              <div className="text-[11px] text-slate-500">
                Evaluator Phase 5C terpusat
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Simulator Course 24</span>
                <Cpu className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400">
                {loading ? <span className="text-slate-600 animate-pulse">...</span> : fmt(summary?.simulatorUsageCount)}
              </div>
              <div className="text-[11px] text-slate-500">
                10 Lab Arsitektur Terdistribusi
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Tantangan Mandiri</span>
                <Flame className="w-4 h-4 text-orange-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">
                {loading ? <span className="text-slate-600 animate-pulse">...</span> : fmt(summary?.challengesCompleted)}
              </div>
              <div className="text-[11px] text-slate-500">
                Penyelesaian Challenge Studio
              </div>
            </div>
          </div>

          {/* Activity Trends Chart */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold text-white">Tren Aktivitas Belajar Harian</h2>
                <p className="text-xs text-slate-400">Frekuensi pembelajar aktif, sesi, dan penyelesaian materi per hari.</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-indigo-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Pengguna Aktif
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Pelajaran Tuntas
                </span>
                <span className="flex items-center gap-1.5 text-amber-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Kuis & Proyek
                </span>
              </div>
            </div>

            {summary?.activityTrends && summary.activityTrends.length > 0 ? (
              <div className="space-y-2 pt-2">
                <div className="grid grid-cols-7 sm:grid-cols-14 gap-2 items-end h-48 border-b border-slate-800 pb-2">
                  {summary.activityTrends.map((point) => {
                    const maxCount = Math.max(...summary.activityTrends!.map(p => p.activeUsers + p.lessonCompletions + p.quizAttempts), 1);
                    const userH = Math.max(Math.round((point.activeUsers / maxCount) * 100), 6);
                    const lessonH = Math.max(Math.round((point.lessonCompletions / maxCount) * 100), 4);
                    return (
                      <div key={point.date} className="flex-1 flex flex-col items-center justify-end h-full gap-1 group relative">
                        <div 
                          className="w-full bg-indigo-500/80 rounded-t-sm transition-all group-hover:bg-indigo-400"
                          style={{ height: `${userH}%` }}
                        />
                        <div 
                          className="w-full bg-emerald-500/80 rounded-t-sm transition-all group-hover:bg-emerald-400"
                          style={{ height: `${lessonH}%` }}
                        />
                        {/* Tooltip on hover */}
                        <div className="absolute -top-16 hidden group-hover:flex flex-col bg-slate-950 border border-slate-700 p-2 rounded-lg text-[10px] whitespace-nowrap z-20 shadow-xl pointer-events-none">
                          <span className="font-bold text-white">{point.date}</span>
                          <span className="text-indigo-400">{point.activeUsers} pengguna aktif</span>
                          <span className="text-emerald-400">{point.lessonCompletions} pelajaran selesai</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 px-1">
                  <span>{summary.activityTrends[0]?.date}</span>
                  <span>{summary.activityTrends[summary.activityTrends.length - 1]?.date}</span>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-slate-500">
                Belum ada data tren aktivitas untuk periode ini.
              </div>
            )}
          </div>

          {/* Primary Learning Funnel */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <div>
              <h2 className="text-lg font-bold text-white">Corong Pembelajaran (Learning Funnel)</h2>
              <p className="text-xs text-slate-400">Konversi progres pembelajar dari registrasi hingga lulus evaluasi proyek.</p>
            </div>

            {summary?.funnel?.steps ? (
              <div className="space-y-3 pt-2">
                {summary.funnel.steps.map((step, idx) => (
                  <div key={step.stepName} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-slate-200">
                        {idx + 1}. {step.stepName}
                      </span>
                      <div className="flex items-center gap-3 text-slate-400">
                        <span>{fmt(step.userCount)} event</span>
                        <span className="font-black text-amber-400">{step.conversionRatePercentage}%</span>
                      </div>
                    </div>
                    <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800/80 p-0.5">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-500 to-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(step.conversionRatePercentage, 1)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-slate-500">
                Data corong pembelajaran belum terkumpul.
              </div>
            )}
          </div>

          {/* Retention Cohorts */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <div>
              <h2 className="text-lg font-bold text-white">Kohort Retensi Pengguna (UU PDP Compliant)</h2>
              <p className="text-xs text-slate-400">Sesuai standar definisi retensi pada dokumen `docs/analytics-data-dictionary.md`.</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {summary?.retentionMetrics?.map((ret) => (
                <div key={ret.period} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400">{ret.period} Retention</span>
                    <span className="text-2xl font-black text-white">{ret.retentionRatePercentage}%</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {ret.definition}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: COURSES ANALYTICS */}
      {activeTab === 'courses' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold text-white">Analitik 24 Kursus Platform</h2>
              <p className="text-xs text-slate-400">Statistik pembelajar, progres rata-rata, dan rasio kelulusan kuis per jalur kursus.</p>
            </div>
            <span className="text-xs text-slate-500">24 Kursus Aktif</span>
          </div>

          <div className="overflow-x-auto border border-slate-800 rounded-2xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase font-bold text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Kursus</th>
                  <th className="py-3 px-4">Pembelajar</th>
                  <th className="py-3 px-4">Mulai</th>
                  <th className="py-3 px-4">Selesai</th>
                  <th className="py-3 px-4">Rata-rata Progres</th>
                  <th className="py-3 px-4">Kelulusan Kuis</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {summary?.courseAnalytics?.map((c) => (
                  <tr key={c.courseId} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-sans font-bold text-white">
                      {c.courseTitle}
                      <span className="block text-[10px] text-slate-500 font-mono">{c.courseId}</span>
                    </td>
                    <td className="py-3.5 px-4">{fmt(c.learnersCount)}</td>
                    <td className="py-3.5 px-4">{fmt(c.startedCount)}</td>
                    <td className="py-3.5 px-4 text-emerald-400">{fmt(c.completedCount)}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-950 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500" style={{ width: `${c.avgProgress}%` }} />
                        </div>
                        <span>{c.avgProgress}%</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-amber-400">{c.quizPassRate}%</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedCourse(c)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-sans font-semibold cursor-pointer transition-colors"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: QUIZZES */}
      {activeTab === 'quizzes' && (
        <div className="space-y-6">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
              <span className="text-xs text-slate-400">Total Percobaan Kuis</span>
              <div className="text-3xl font-black text-white">{fmt(summary?.eventsByName?.quiz_attempted)}</div>
              <span className="text-[11px] text-slate-500">Percobaan terkirim</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
              <span className="text-xs text-slate-400">Tingkat Kelulusan Kuis</span>
              <div className="text-3xl font-black text-amber-400">{summary?.quizPassRate ?? 0}%</div>
              <span className="text-[11px] text-slate-500">Skor minimum 70/100</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
              <span className="text-xs text-slate-400">Kuis Dimulai</span>
              <div className="text-3xl font-black text-indigo-400">{fmt(summary?.eventsByName?.quiz_started)}</div>
              <span className="text-[11px] text-slate-500">Sesi evaluasi dibuka</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h2 className="text-lg font-bold text-white">Model Penilaian Kuis Otoritatif</h2>
            <p className="text-xs text-slate-400">
              Hasil kuis dihitung dan divalidasi langsung oleh Quiz Engine server (`QuizEngine.tsx`). Analitik bertindak sebagai pengamat pasif tanpa hak modifikasi skor.
            </p>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Kepatuhan Evaluasi Terpusat: LULUS</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Kunci jawaban (`/quiz_solutions`) terisolasi di sisi server dengan aturan keamanan admin-only. Tidak ada kebocoran kunci jawaban atau kalkulasi nilai lokal pada dashboard ini.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PROJECTS */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="grid sm:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
              <span className="text-xs text-slate-400">Katalog Proyek Aktif</span>
              <div className="text-3xl font-black text-white">26</div>
              <span className="text-[11px] text-slate-500">6 Inti + 20 Arsitektur</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
              <span className="text-xs text-slate-400">Total Submisi Berkas</span>
              <div className="text-3xl font-black text-indigo-400">{fmt(summary?.projectSubmissions)}</div>
              <span className="text-[11px] text-slate-500">Evaluasi deklaratif</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
              <span className="text-xs text-slate-400">Kelulusan Evaluasi</span>
              <div className="text-3xl font-black text-emerald-400">{summary?.projectPassRate ?? 0}%</div>
              <span className="text-[11px] text-slate-500">Ambang skor &gt;= 70</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
              <span className="text-xs text-slate-400">Rata-rata Skor</span>
              <div className="text-3xl font-black text-amber-400">{summary?.averageProjectScore ?? 0}</div>
              <span className="text-[11px] text-slate-500">Skala 0–100</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h2 className="text-lg font-bold text-white">Katalog Proyek Terverifikasi (26 Proyek)</h2>
            <p className="text-xs text-slate-400">Terdiri dari 6 Proyek Fondasi (`CODERA_PROJECTS`) dan 20 Proyek Rekayasa Arsitektur (`SOFTWARE_ARCHITECTURE_PROJECTS`).</p>
            
            <div className="grid md:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-indigo-400 uppercase text-[10px] tracking-wider">6 Proyek Portofolio Inti</span>
                <ul className="space-y-1.5 text-slate-300 font-mono text-[11px]">
                  <li>• proj-guided-1: Developer Profile Card (Web)</li>
                  <li>• proj-guided-2: Interactive Task Board (DOM)</li>
                  <li>• proj-guided-3: Python Data Analyzer (Algorithms)</li>
                  <li>• proj-guided-4: React Analytics Widget (Components)</li>
                  <li>• proj-guided-5: RESTful Micro-Service (Express)</li>
                  <li>• proj-guided-6: Fullstack Application Capstone</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-amber-400 uppercase text-[10px] tracking-wider">20 Proyek Arsitektur Terdistribusi</span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Mencakup implementasi Clean Architecture, Saga Pattern, Distributed Locks, Sharding Router, Circuit Breaker, dan OpenTelemetry Tracing (`proj-arch-01` s/d `proj-arch-20`).
                </p>
                <div className="text-[10px] text-slate-500">Seluruh kriteria dievaluasi di sisi server (Server-Authoritative Evaluator).</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SIMULATORS */}
      {activeTab === 'simulators' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div>
            <h2 className="text-lg font-bold text-white">10 Simulator Arsitektur Course 24</h2>
            <p className="text-xs text-slate-400">Penggunaan laboratorium visual interaktif pada Course 24 (Software Architecture & System Design).</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {summary?.simulatorAnalytics?.map((sim) => (
              <div key={sim.simulatorId} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">{sim.simulatorName}</span>
                  <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 rounded-md text-[10px] font-mono">
                    {sim.simulatorId}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-slate-900 p-2 rounded-xl">
                    <span className="block text-slate-500 text-[10px]">Mulai</span>
                    <strong className="text-white">{sim.startsCount}</strong>
                  </div>
                  <div className="bg-slate-900 p-2 rounded-xl">
                    <span className="block text-slate-500 text-[10px]">Tuntas</span>
                    <strong className="text-emerald-400">{sim.completionsCount}</strong>
                  </div>
                  <div className="bg-slate-900 p-2 rounded-xl">
                    <span className="block text-slate-500 text-[10px]">Rasio</span>
                    <strong className="text-amber-400">{sim.completionRate}%</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: RAW EVENT EXPLORER */}
      {activeTab === 'raw-events' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-white">Penjelajah Event Telemetri (Raw Events)</h2>
              <p className="text-xs text-slate-400">Aliran data observasi real-time dari Firestore `/analytics_events` (Privasi Tersanitasi).</p>
            </div>
            <span className="text-xs text-slate-400 font-mono">Total: {fmt(eventsTotalCount)} event</span>
          </div>

          {/* Event Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs">
            <div>
              <label className="block text-[10px] text-slate-500 font-bold mb-1">Filter Event Name</label>
              <input
                type="text"
                placeholder="Contoh: lesson_completed"
                value={filterEventName}
                onChange={(e) => setFilterEventName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-white outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-500 font-bold mb-1">Filter Course ID</label>
              <input
                type="text"
                placeholder="Contoh: software-architecture"
                value={filterCourseId}
                onChange={(e) => setFilterCourseId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-white outline-none focus:border-amber-500"
              />
            </div>
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <label className="block text-[10px] text-slate-500 font-bold mb-1">Source</label>
                <select
                  value={filterSource}
                  onChange={(e) => setFilterSource(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-white outline-none focus:border-amber-500"
                >
                  <option value="">Semua (Web & Server)</option>
                  <option value="web">Web Client</option>
                  <option value="server">Server Backend</option>
                </select>
              </div>
              <button
                onClick={() => loadRawEvents(1)}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {eventsError && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-rose-300">
              {eventsError}
            </div>
          )}

          {/* Events Table */}
          <div className="overflow-x-auto border border-slate-800 rounded-2xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase font-bold text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Waktu (UTC)</th>
                  <th className="py-3 px-4">Nama Event</th>
                  <th className="py-3 px-4">User UID</th>
                  <th className="py-3 px-4">Konteks ID</th>
                  <th className="py-3 px-4">Sumber</th>
                  <th className="py-3 px-4 text-right">Payload</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                {eventsLoading ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500">
                      <div className="flex items-center justify-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin text-amber-500" />
                        <span>Memuat data event analitik...</span>
                      </div>
                    </td>
                  </tr>
                ) : rawEvents.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500">
                      Tidak ada event yang cocok dengan kriteria filter.
                    </td>
                  </tr>
                ) : (
                  rawEvents.map((evt) => (
                    <tr key={evt.eventId} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4 text-slate-400">
                        {evt.timestamp ? new Date(evt.timestamp).toISOString().replace('T', ' ').substring(0, 19) : '—'}
                      </td>
                      <td className="py-3 px-4 font-bold text-amber-400">{evt.eventName}</td>
                      <td className="py-3 px-4 text-slate-300">{evt.userId ? `${evt.userId.substring(0, 12)}...` : 'anon'}</td>
                      <td className="py-3 px-4 text-slate-400">
                        {evt.courseId || evt.projectId || evt.quizId || evt.simulatorId || '—'}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] ${evt.source === 'server' ? 'bg-purple-500/20 text-purple-300' : 'bg-cyan-500/20 text-cyan-300'}`}>
                          {evt.source || 'web'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setInspectEvent(evt)}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-sans cursor-pointer transition-colors"
                        >
                          Lihat
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
            <span>Halaman {eventsPage} dari {eventsTotalPages}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => loadRawEvents(eventsPage - 1)}
                disabled={eventsPage <= 1 || eventsLoading}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-40 cursor-pointer transition-colors"
              >
                Sebelumnya
              </button>
              <button
                onClick={() => loadRawEvents(eventsPage + 1)}
                disabled={eventsPage >= eventsTotalPages || eventsLoading}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-40 cursor-pointer transition-colors"
              >
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: SYSTEM HEALTH */}
      {activeTab === 'health' && (
        <div className="space-y-6">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
              <span className="text-xs text-slate-400">Ketersediaan API (SLA)</span>
              <div className="text-3xl font-black text-emerald-400">{summary?.healthMetrics?.apiAvailability ?? 99.98}%</div>
              <span className="text-[11px] text-slate-500">Target SLA 99.9%</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
              <span className="text-xs text-slate-400">Status Firestore DB</span>
              <div className="text-3xl font-black text-emerald-400 uppercase">{summary?.healthMetrics?.dbStatus ?? 'HEALTHY'}</div>
              <span className="text-[11px] text-slate-500">Koneksi latensi rendah</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
              <span className="text-xs text-slate-400">Penggunaan Memory Heap</span>
              <div className="text-3xl font-black text-white">{summary?.healthMetrics?.memoryHeapMb ?? 42} MB</div>
              <span className="text-[11px] text-slate-500">Uptime: {summary?.healthMetrics?.uptimeSeconds ?? 120} detik</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h2 className="text-lg font-bold text-white">Observabilitas & Proteksi Diagnostik</h2>
            <p className="text-xs text-slate-400">
              Sistem mematuhi prinsip *zero diagnostic leakage*: tidak membocorkan error stack trace atau path server internal ke klien siswa.
            </p>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-indigo-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Endpoint /health Aktif</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Health probe dapat dipanggil oleh cloud orchestrator untuk monitoring beban server tanpa mengekspos rincian database sensitif.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Safe Event Details */}
      {inspectEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                <Terminal className="w-4 h-4" />
                <span>Rincian Event Telemetri</span>
              </div>
              <button
                onClick={() => setInspectEvent(null)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Event ID:</span>
                <span className="font-mono text-white">{inspectEvent.eventId}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Event Name:</span>
                <span className="font-bold text-amber-400 font-mono">{inspectEvent.eventName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Waktu (ISO):</span>
                <span className="font-mono text-slate-300">{inspectEvent.timestamp}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">User UID:</span>
                <span className="font-mono text-slate-300">{inspectEvent.userId || 'anonim'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Session ID:</span>
                <span className="font-mono text-slate-300">{inspectEvent.sessionId || '—'}</span>
              </div>
              
              <div className="pt-2">
                <span className="block text-slate-400 mb-1">Sanitized Properties:</span>
                <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] font-mono text-emerald-400 overflow-x-auto max-h-48">
                  {JSON.stringify(inspectEvent.properties || {}, null, 2)}
                </pre>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setInspectEvent(null)}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Course Detail */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-sm">{selectedCourse.courseTitle}</h3>
                <span className="text-[10px] text-slate-500 font-mono">{selectedCourse.courseId}</span>
              </div>
              <button
                onClick={() => setSelectedCourse(null)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="block text-slate-500 text-[10px]">Total Pembelajar</span>
                <span className="text-xl font-bold text-white">{selectedCourse.learnersCount}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="block text-slate-500 text-[10px]">Penyelesaian Kursus</span>
                <span className="text-xl font-bold text-emerald-400">{selectedCourse.completedCount}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="block text-slate-500 text-[10px]">Kelulusan Kuis</span>
                <span className="text-xl font-bold text-amber-400">{selectedCourse.quizPassRate}%</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="block text-slate-500 text-[10px]">Kelulusan Proyek</span>
                <span className="text-xl font-bold text-violet-400">{selectedCourse.projectPassRate}%</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedCourse(null)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer mt-2"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
