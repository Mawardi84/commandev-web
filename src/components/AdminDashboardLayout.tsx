import React, { useState } from 'react';
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
  BarChart3
} from 'lucide-react';
import { AdminCmsView } from './AdminCmsView';
import { AdminCoursesCmsView } from './AdminCoursesCmsView';
import { AdminProjectEvaluationEditor } from './cms/AdminProjectEvaluationEditor';
import { AdminAnalyticsView } from './admin/AdminAnalyticsView';
import { useSettings } from '../lib/SettingsContext';
import { useAuth } from '../lib/AuthContext';

interface AdminDashboardLayoutProps {
  onViewSite: () => void;
  onLogout: () => void;
  onGoToLogin?: () => void;
}

export function AdminDashboardLayout({ onViewSite, onLogout, onGoToLogin }: AdminDashboardLayoutProps) {
  const { userRole, authState } = useAuth();
  const [adminTab, setAdminTab] = useState<'overview' | 'analytics' | 'cms' | 'courses' | 'evaluations' | 'users' | 'media' | 'settings'>('analytics');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const { settings, updateSettings } = useSettings();
  const [tempHeroUrl, setTempHeroUrl] = useState(settings.heroImageUrl);
  const [saveSuccess, setSaveSuccess] = useState(false);

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
          <button
            onClick={onViewSite}
            className="hidden sm:inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Kunjungi Situs (View Site)</span>
          </button>
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
                <span>COMMANDEV v2.5 Control Center</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Alamat terpisah khusus admin (`/admin`) dengan kontrol penuh CMS.
              </p>
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
                  <h1 className="text-2xl font-black text-white">Dashboard Statistik CMS</h1>
                  <p className="text-xs text-slate-400">Ringkasan aktivitas platform dan total siswa yang terdaftar.</p>
                </div>
                <button
                  onClick={() => setAdminTab('analytics')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-lg shadow-amber-600/20 transition-all cursor-pointer"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Buka CMS Analytics Dashboard Lengkap</span>
                </button>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-xs text-slate-400">Total Siswa Aktif</div>
                  <div className="text-3xl font-black text-white">1,284</div>
                  <div className="text-[11px] text-emerald-400 font-semibold">+12% minggu ini</div>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-xs text-slate-400">Modul Tantangan</div>
                  <div className="text-3xl font-black text-amber-400">48</div>
                  <div className="text-[11px] text-slate-400">Aktif & Teruji</div>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-xs text-slate-400">Tingkat Penyelesaian</div>
                  <div className="text-3xl font-black text-indigo-400">84.2%</div>
                  <div className="text-[11px] text-emerald-400 font-semibold">Sangat baik</div>
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
              <div>
                <h1 className="text-2xl font-black text-white">Data Pengguna & Siswa</h1>
                <p className="text-xs text-slate-400">Daftar siswa yang terdaftar di COMMANDEV.</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center text-slate-400 text-xs">
                Sistem database siswa aktif dan terenkripsi menggunakan Firebase Firestore.
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
