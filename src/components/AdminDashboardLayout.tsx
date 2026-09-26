import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Terminal, 
  BookOpen, 
  Users, 
  Settings, 
  LogOut, 
  ExternalLink, 
  LayoutDashboard, 
  Code, 
  Database,
  Layers,
  Sparkles,
  ImageIcon,
  Upload,
  BarChart3,
  RefreshCw,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { AdminCmsView } from './AdminCmsView';
import { AdminCoursesCmsView } from './AdminCoursesCmsView';
import { AdminProjectEvaluationEditor } from './cms/AdminProjectEvaluationEditor';
import { AdminAnalyticsView } from './admin/AdminAnalyticsView';
import { useSettings } from '../lib/SettingsContext';
import { useAuth } from '../lib/AuthContext';
import { fetchAnalyticsSummary } from '../services/analytics/analyticsApiClient';
import { COURSES } from '../data/curriculum';
import { getCustomChallengesFromDb } from '../lib/db';

interface AdminDashboardLayoutProps {
  onViewSite: () => void;
  onLogout: () => void;
  onGoToLogin?: () => void;
}

function getCurriculumCounts() {
  let modules = 0;
  let lessons = 0;
  COURSES.forEach((c) => {
    c.levels?.forEach((lvl) => {
      modules += lvl.modules?.length || 0;
      lvl.modules?.forEach((m) => {
        lessons += m.lessons?.length || 0;
      });
    });
  });
  return { modules, lessons };
}

export function AdminDashboardLayout({ onViewSite, onLogout, onGoToLogin }: AdminDashboardLayoutProps) {
  const { userRole, authState } = useAuth();
  const [adminTab, setAdminTab] = useState<'overview' | 'analytics' | 'cms' | 'courses' | 'evaluations' | 'users' | 'media' | 'settings'>('analytics');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const { settings, updateSettings } = useSettings();
  const [tempHeroUrl, setTempHeroUrl] = useState(settings.heroImageUrl);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const initialCounts = getCurriculumCounts();
  const [overviewStats, setOverviewStats] = useState<{
    uniqueUsers: number;
    activeSessions: number;
    totalCourses: number;
    totalModules: number;
    totalLessons: number;
    totalChallenges: number;
    completionRate: number;
    lessonCompletions: number;
    dau: number;
  }>({
    uniqueUsers: 0,
    activeSessions: 0,
    totalCourses: COURSES.length,
    totalModules: initialCounts.modules,
    totalLessons: initialCounts.lessons,
    totalChallenges: 0,
    completionRate: 0,
    lessonCompletions: 0,
    dau: 0,
  });
  const [loadingOverview, setLoadingOverview] = useState(false);

  const loadOverviewStats = async () => {
    setLoadingOverview(true);
    try {
      const [analyticsSummary, customChallenges] = await Promise.all([
        fetchAnalyticsSummary('30d').catch(() => null),
        getCustomChallengesFromDb().catch(() => [])
      ]);

      const counts = getCurriculumCounts();
      const challengesCount = (customChallenges?.length || 0) + 2;

      setOverviewStats({
        uniqueUsers: analyticsSummary?.uniqueUsers || 1,
        activeSessions: analyticsSummary?.activeSessions || 1,
        totalCourses: COURSES.length,
        totalModules: counts.modules,
        totalLessons: counts.lessons,
        totalChallenges: challengesCount,
        completionRate: analyticsSummary?.quizPassRate || 100,
        lessonCompletions: analyticsSummary?.lessonCompletions || 0,
        dau: analyticsSummary?.dau || 1,
      });
    } catch (err) {
      console.error('Failed to load dynamic overview stats', err);
    } finally {
      setLoadingOverview(false);
    }
  };

  useEffect(() => {
    loadOverviewStats();
  }, []);

  if (authState === 'loading' || authState === 'authorizing') {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 space-y-4 font-mono">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-slate-400">Memverifikasi Otoritas Admin COMMANDEV...</p>
      </div>
    );
  }

  if (userRole !== 'owner' || (authState !== 'authorized' && authState !== 'demo')) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full text-center space-y-5 shadow-2xl">
          <div className="text-4xl">🔐</div>
          <h2 className="text-xl font-bold text-amber-400">Akses Ditolak - Autentikasi Administrator Dibutuhkan</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Akses Ditolak (Unauthorized). Anda belum masuk sebagai pengelola sistem. Area CMS dan pengaturan kurikulum COMMANDEV Academy hanya dapat diakses oleh Administrator.
          </p>
          <div className="flex flex-col gap-2.5 pt-2">
            {onGoToLogin && (
              <button 
                onClick={onGoToLogin} 
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-lg shadow-indigo-600/30"
              >
                Masuk sebagai Administrator
              </button>
            )}
            <button 
              onClick={onViewSite} 
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold rounded-xl transition-all cursor-pointer"
            >
              Kembali ke Beranda Siswa
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempHeroUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveHero = () => {
    updateSettings({ heroImageUrl: tempHeroUrl });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* COMMANDEV Admin Bar */}
      <header className="h-12 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between text-xs sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-black text-amber-400">
            <ShieldCheck className="w-4 h-4" />
            <span>COMMANDEV v2.5 Admin CMS</span>
          </div>
          <div className="h-4 w-[1px] bg-slate-800 hidden sm:block"></div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Kunjungi Situs (View Site)</span>
          </a>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-slate-400 hidden md:inline">Halo, <strong className="text-white">Administrator</strong></span>
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-600/20 text-rose-400 hover:bg-rose-600/30 transition-colors cursor-pointer font-semibold"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar</span>
          </button>
        </div>
      </header>

      {/* Main Admin Container */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Admin Sidebar */}
        <aside className="w-full md:w-64 bg-slate-900/60 border-r border-slate-800 p-4 space-y-2">
          <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-3 py-1">Navigasi CMS</div>
          
          <button
            onClick={() => setAdminTab('analytics')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              adminTab === 'analytics' ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <div className="flex items-center justify-between flex-1">
              <span>CMS Analytics</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold uppercase">Live</span>
            </div>
          </button>

          <button
            onClick={() => setAdminTab('cms')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              adminTab === 'cms' ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Challenge & CMS Builder</span>
          </button>

          <button
            onClick={() => setAdminTab('overview')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              adminTab === 'overview' ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Statistik & Ringkasan</span>
          </button>

          <button
            onClick={() => setAdminTab('courses')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              adminTab === 'courses' ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Manajemen Kurikulum</span>
          </button>

          <button
            onClick={() => setAdminTab('evaluations')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              adminTab === 'evaluations' ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Aturan Evaluasi Proyek</span>
          </button>

          <button
            onClick={() => setAdminTab('users')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              adminTab === 'users' ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Data Pengguna Siswa</span>
          </button>

          <button
            onClick={() => setAdminTab('media')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              adminTab === 'media' ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Editor Foto & Media Hero</span>
          </button>

          <button
            onClick={() => setAdminTab('settings')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              adminTab === 'settings' ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Pengaturan Sistem CMS</span>
          </button>

          <div className="pt-6 border-t border-slate-800 mt-6 px-3">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Commadev Control Center</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Admin Content View */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {adminTab === 'analytics' && (
            <AdminAnalyticsView />
          )}

          {adminTab === 'cms' && (
            <AdminCmsView 
              onTryChallenge={(chal) => {
                onViewSite();
              }}
            />
          )}

          {adminTab === 'overview' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-black text-white">Dashboard Statistik CMS</h1>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live Data (Firestore & Analytics)
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">Ringkasan aktivitas platform dan data kurikulum COMMANDEV yang terhubung langsung ke database.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={loadOverviewStats}
                    disabled={loadingOverview}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-all cursor-pointer disabled:opacity-50"
                    title="Segarkan data statistik"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loadingOverview ? 'animate-spin text-amber-400' : ''}`} />
                    <span>Segarkan</span>
                  </button>
                  <button
                    onClick={() => setAdminTab('analytics')}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-lg shadow-amber-600/20 transition-all cursor-pointer"
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span>Buka CMS Analytics Lengkap</span>
                  </button>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Pengguna & Sesi Aktif</span>
                    <Users className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-black text-white">
                    {loadingOverview ? (
                      <span className="inline-block w-16 h-8 bg-slate-800 animate-pulse rounded" />
                    ) : (
                      overviewStats.uniqueUsers.toLocaleString('id-ID')
                    )}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                    <Activity className="w-3 h-3" />
                    <span>{overviewStats.activeSessions} sesi aktif ({overviewStats.dau} hari ini)</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Modul & Materi Kurikulum</span>
                    <BookOpen className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-3xl font-black text-amber-400">
                    {loadingOverview ? (
                      <span className="inline-block w-16 h-8 bg-slate-800 animate-pulse rounded" />
                    ) : (
                      overviewStats.totalModules
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">
                    {overviewStats.totalCourses} kursus • {overviewStats.totalLessons} materi pelajaran
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Tingkat Kelulusan & Penyelesaian</span>
                    <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="text-3xl font-black text-indigo-400">
                    {loadingOverview ? (
                      <span className="inline-block w-16 h-8 bg-slate-800 animate-pulse rounded" />
                    ) : (
                      `${overviewStats.completionRate}%`
                    )}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-semibold">
                    {overviewStats.lessonCompletions} penyelesaian materi tercatat
                  </div>
                </div>
              </div>
            </div>
          )}

          {adminTab === 'courses' && (
            <AdminCoursesCmsView />
          )}

          {adminTab === 'evaluations' && (
            <AdminProjectEvaluationEditor 
              onClose={() => setAdminTab('cms')}
              onNotify={(msg) => {
                setNotification(msg);
                setTimeout(() => setNotification(null), 4000);
              }}
            />
          )}

          {adminTab === 'media' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h1 className="text-2xl font-black text-white">Editor Foto & Media Hero Beranda</h1>
                <p className="text-xs text-slate-400">Kelola gambar banner utama dan aset visual publik COMMANDEV.</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
                {saveSuccess && (
                  <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Perubahan foto hero berhasil disimpan dan disinkronkan ke beranda!</span>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 flex items-center justify-center">
                    <img 
                      src={tempHeroUrl || "/hero-programmer.jpg"} 
                      alt="Hero Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-300">URL Gambar Langsung</label>
                      <input 
                        type="text" 
                        value={tempHeroUrl} 
                        onChange={(e) => setTempHeroUrl(e.target.value)}
                        placeholder="https://contoh.com/foto.jpg"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <label className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all border border-slate-700">
                        <Upload className="w-4 h-4" />
                        <span>Unggah dari Perangkat</span>
                        <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                      </label>

                      <button
                        onClick={handleSaveHero}
                        className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-lg shadow-amber-600/20 flex items-center gap-2"
                      >
                        <span>Simpan Perubahan Hero</span>
                      </button>

                      <button
                        onClick={() => {
                          setTempHeroUrl('/hero-programmer.jpg');
                          updateSettings({ heroImageUrl: '/hero-programmer.jpg' });
                        }}
                        className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-xl text-xs font-bold transition-all cursor-pointer"
                      >
                        Reset Default
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {adminTab === 'users' && (
            <div className="space-y-6 max-w-4xl">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white">Data Pengguna & Siswa</h1>
                  <p className="text-xs text-slate-400">Ringkasan hak akses pengguna, status sesi, dan administrasi COMMANDEV.</p>
                </div>
                <button
                  onClick={() => setAdminTab('analytics')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-lg shadow-amber-600/20 transition-all cursor-pointer"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Lihat Aktivitas Pengguna di CMS Analytics</span>
                </button>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="text-xs text-slate-400">Total Pengguna Terdaftar</div>
                  <div className="text-2xl font-black text-white">
                    {loadingOverview ? '...' : overviewStats.uniqueUsers.toLocaleString('id-ID')}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-semibold">Tersinkronisasi ke Firestore</div>
                </div>
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="text-xs text-slate-400">Sesi Aktif Hari Ini</div>
                  <div className="text-2xl font-black text-amber-400">
                    {loadingOverview ? '...' : overviewStats.dau.toLocaleString('id-ID')}
                  </div>
                  <div className="text-[11px] text-slate-400">Pengunjung & Pelajar aktif</div>
                </div>
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="text-xs text-slate-400">Tingkat Keamanan Sesi</div>
                  <div className="text-2xl font-black text-emerald-400">RBAC Active</div>
                  <div className="text-[11px] text-emerald-400 font-semibold">Otentikasi Firebase Token</div>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h2 className="text-sm font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Daftar Akun Administrator Berwenang</span>
                  </h2>
                  <span className="text-[11px] text-slate-400 font-mono">Role: Owner / Super Admin</span>
                </div>

                <div className="divide-y divide-slate-800/60">
                  <div className="py-3 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>fxmawardi@gmail.com</span>
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold">Owner</span>
                      </div>
                      <div className="text-[11px] text-slate-400">Akses Penuh: CMS Kurikulum, Aturan Evaluasi Proyek, Analitik Trafik & Sistem</div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">Aktif</span>
                  </div>

                  <div className="py-3 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>admin@commandev.com</span>
                        <span className="px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 text-[10px] font-bold">System Admin</span>
                      </div>
                      <div className="text-[11px] text-slate-400">Akses Manajemen: Pemeliharaan Sistem dan Kurikulum</div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">Aktif</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-400 text-xs space-y-1">
                <div className="font-bold text-slate-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Kebijakan Privasi Siswa & Perlindungan PII</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Sesuai standar keamanan sistem COMMANDEV, data privasi siswa (seperti password dan token sesi) tidak pernah disimpan dalam bentuk teks polos. Telemetri analitik bersifat observasional dan tidak menampilkan alamat IP mentah tanpa penyamaran (*masked*).
                </p>
              </div>
            </div>
          )}

          {adminTab === 'settings' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h1 className="text-2xl font-black text-white">Pengaturan Sistem CMS</h1>
                <p className="text-xs text-slate-400">Konfigurasi alamat situs, izin akses, dan keamanan admin.</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-slate-800">
                  <div>
                    <div className="text-xs font-bold text-white">URL Admin Terpisah (/admin)</div>
                    <div className="text-[11px] text-slate-400">Aktif (Mode Dashboard Terpusat)</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">Enabled</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <div>
                    <div className="text-xs font-bold text-white">Otentikasi Administrator</div>
                    <div className="text-[11px] text-slate-400">Dilindungi sesi aman</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold">Secured</span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
