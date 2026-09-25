import React, { useState } from 'react';
import { UserProgress, Course } from '../types';
import { COURSES } from '../data/curriculum';
import { 
  User, 
  Trophy, 
  Flame, 
  CheckCircle2, 
  Terminal, 
  Layers, 
  Code2, 
  Cpu, 
  Database, 
  GitBranch, 
  FileCode, 
  Server,
  Sparkles,
  RotateCcw,
  LogIn,
  LogOut,
  Cloud,
  ShieldCheck,
  Share2,
  Copy,
  Check,
  ExternalLink,
  Rocket,
  Mail
} from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '../lib/firebase';

interface ProfileViewProps {
  userProgress: UserProgress;
  courses: Course[];
  onResetProgress?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userProgress,
  courses,
  onResetProgress
}) => {
  const { user, userRole, signInWithGoogle, signInWithEmail, signUpWithEmail, loginAsOwner, loginAsGuest, logout, authError, clearAuthError } = useAuth();
  const [copied, setCopied] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (authMode === 'signup') {
        await signUpWithEmail(email, password, fullName || 'COMMANDEV Student');
      } else {
        await signInWithEmail(email, password);
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };
  
  const currentLevel = Math.floor(userProgress.xp / 100) + 1;
  const currentLevelXp = userProgress.xp % 100;
  const totalCompleted = userProgress.completedLessons.length;

  const getRankTitle = (lvl: number) => {
    if (lvl === 1) return 'Rookie Coder';
    if (lvl === 2) return 'Junior Developer';
    if (lvl === 3) return 'Frontend Apprentice';
    if (lvl === 4) return 'Code Artisan';
    return 'Fullstack Maestro';
  };

  const shareText = `🚀 Saya telah mencapai Level ${currentLevel} (${getRankTitle(currentLevel)}) dengan ${userProgress.xp} XP & ${userProgress.streak} Hari Streak di COMMANDEV — Interactive Developer Learning Platform! Belajar coding interaktif dari dasar hingga mahir: ${window.location.origin}`;

  const handleCopyShareText = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}`;
    window.open(url, '_blank');
  };

  const shareOnWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  // Dynamic skill progress calculator based on real completed lessons and course curriculum
  const calculateTrackProgress = (courseId: string): number => {
    // 1. Check if explicitly in userProgress.courseProgress
    if (userProgress.courseProgress && typeof userProgress.courseProgress[courseId] === 'number') {
      return Math.min(100, Math.max(0, userProgress.courseProgress[courseId]));
    }

    // 2. Compute dynamically from lessons in courses / COURSES
    const allCoursesList = courses && courses.length > 0 ? courses : COURSES;
    const targetCourse = allCoursesList.find(c => c.id === courseId);

    if (!targetCourse) return 0;

    let totalLessonsCount = 0;
    let completedLessonsCount = 0;

    for (const level of targetCourse.levels || []) {
      for (const module of level.modules || []) {
        for (const lesson of module.lessons || []) {
          totalLessonsCount++;
          if (userProgress.completedLessons.includes(lesson.id)) {
            completedLessonsCount++;
          }
        }
      }
    }

    if (totalLessonsCount === 0) return 0;
    return Math.min(100, Math.round((completedLessonsCount / totalLessonsCount) * 100));
  };

  // Skill tracks mapping with real dynamic progress calculation
  const skillTracks = [
    { name: 'HTML5 Semantic', icon: FileCode, color: 'text-orange-400', progress: calculateTrackProgress('html-mastery') },
    { name: 'CSS3 & Flex/Grid', icon: Code2, color: 'text-blue-400', progress: calculateTrackProgress('css-mastery') },
    { name: 'JavaScript ES6+', icon: Cpu, color: 'text-amber-400', progress: calculateTrackProgress('js-mastery') },
    { name: 'Python 3.12', icon: Terminal, color: 'text-emerald-400', progress: calculateTrackProgress('python-mastery') },
    { name: 'Git & GitHub', icon: GitBranch, color: 'text-rose-400', progress: calculateTrackProgress('git-github') },
    { name: 'React Architecture', icon: Layers, color: 'text-cyan-400', progress: calculateTrackProgress('react-mastery') },
    { name: 'Backend & REST API', icon: Server, color: 'text-indigo-400', progress: calculateTrackProgress('backend-mastery') },
    { name: 'Database & SQL', icon: Database, color: 'text-violet-400', progress: calculateTrackProgress('database-mastery') || calculateTrackProgress('mysql-mastery') },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-white">
      
      {/* Auth Form / Card if not logged in */}
      {!user && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 max-w-xl mx-auto shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 mb-1">
              <LogIn className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-black text-white">Autentikasi Siswa COMMANDEV</h2>
            <p className="text-xs text-slate-400">Masuk atau daftar akun siswa untuk mulai belajar.</p>
          </div>

          {/* Tabs */}
          <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => { setAuthMode('signin'); clearAuthError(); }}
              className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                authMode === 'signin' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Masuk Siswa
            </button>
            <button
              onClick={() => { setAuthMode('signup'); clearAuthError(); }}
              className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                authMode === 'signup' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Daftar Baru
            </button>
          </div>

          {authError && (
            <div className="p-3 bg-rose-950/50 border border-rose-800 rounded-xl text-xs text-rose-300">
              {authError}
            </div>
          )}

          <form onSubmit={handleEmailAuth} className="space-y-4">
              {authMode === 'signup' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nama Anda"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Kata Sandi (Password)</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {submitting ? 'Memproses...' : (authMode === 'signup' ? 'Daftar Akun Baru' : 'Masuk ke Akun')}
              </button>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-800"></div>
                <span className="flex-shrink mx-4 text-slate-500 text-[11px]">ATAU</span>
                <div className="flex-grow border-t border-slate-800"></div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={signInWithGoogle}
                  className="py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 text-xs font-bold border border-slate-800 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Google Auth</span>
                </button>
                <button
                  type="button"
                  onClick={loginAsGuest}
                  className="py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 text-xs font-bold border border-slate-800 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Mode Demo</span>
                </button>
              </div>
            </form>
        </div>
      )}

      {/* Profile Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-5">
          {user?.photoURL ? (
            <img 
              src={user.photoURL} 
              alt={user.displayName || 'Avatar'} 
              className="w-20 h-20 rounded-2xl object-cover shadow-lg ring-4 ring-indigo-500/20"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-800 flex items-center justify-center text-3xl font-extrabold shadow-lg shadow-indigo-600/30 ring-4 ring-indigo-500/20">
              <User className="w-10 h-10 text-indigo-200" />
            </div>
          )}

          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold">{user?.displayName || 'COMMANDEV Developer'}</h1>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                userRole === 'owner' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
              }`}>
                {userRole === 'owner' ? '👑 Pemilik Situs (Admin)' : getRankTitle(currentLevel)}
              </span>
            </div>
            <p className="text-sm text-slate-400">
              {user ? (
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium text-xs">
                  <ShieldCheck className="w-3.5 h-3.5" /> Terautentikasi: {user.email} (Sinkron Firestore Aktif)
                </span>
              ) : (
                'Mode Tamu (Data tersimpan di penyimpanan browser lokal)'
              )}
            </p>

            {user && !user.emailVerified && !user.uid.startsWith('demo-') && user.uid !== 'site-owner-admin-01' && (
              <div className="mt-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-300">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Email belum diverifikasi. Harap verifikasi akun Anda demi keamanan.</span>
                </div>
                {verificationSent ? (
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold">
                    Email Terkirim!
                  </span>
                ) : (
                  <button
                    onClick={async () => {
                      setVerificationError(null);
                      try {
                        if (auth.currentUser) {
                          await sendEmailVerification(auth.currentUser);
                          setVerificationSent(true);
                        } else {
                          throw new Error("Firebase Auth tidak aktif");
                        }
                      } catch (e: any) {
                        setVerificationError(e.message || "Gagal mengirim");
                      }
                    }}
                    className="underline text-[10px] hover:text-amber-100 font-bold shrink-0 cursor-pointer"
                  >
                    Kirim Link Verifikasi
                  </button>
                )}
                {verificationError && (
                  <div className="text-[10px] text-rose-400 mt-1 sm:mt-0 font-medium">
                    {verificationError}
                  </div>
                )}
              </div>
            )}

            <div className="mt-3 flex items-center gap-4 text-xs font-semibold text-slate-300 flex-wrap">
              <span className="flex items-center gap-1.5"><Flame className="w-4 h-4 text-amber-400 fill-amber-400" /> {userProgress.streak} Hari Streak</span>
              <span className="flex items-center gap-1.5"><Trophy className="w-4 h-4 text-indigo-400" /> {userProgress.xp} XP</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> {totalCompleted} Latihan Selesai</span>
              <span className="flex items-center gap-1.5"><Rocket className="w-4 h-4 text-purple-400" /> {(userProgress.completedProjects || []).length} Proyek Selesai</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <button
              onClick={logout}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors flex items-center gap-1.5 border border-slate-700"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar Akun</span>
            </button>
          ) : (
            <button
              onClick={signInWithGoogle}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-md shadow-indigo-600/30"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login Google</span>
            </button>
          )}

          {onResetProgress && (
            <button
              onClick={onResetProgress}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-rose-950/60 hover:text-rose-300 text-slate-400 text-xs font-bold transition-colors flex items-center gap-1.5 border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Social Share Badge Banner */}
      <div className="bg-gradient-to-r from-indigo-950/80 via-slate-900 to-violet-950/80 border border-indigo-800/60 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Share2 className="w-4 h-4" />
            <span>Bagikan Kartu Pencapaian COMMANDEV</span>
          </div>
          <h3 className="text-lg font-bold text-white">Pamerkan Level & Status Developer Anda</h3>
          <p className="text-xs text-slate-300 max-w-xl">
            Tunjukkan reputasi belajar, peringkat <span className="text-indigo-300 font-semibold">{getRankTitle(currentLevel)}</span>, dan pencapaian <span className="text-amber-300 font-semibold">{userProgress.xp} XP</span> Anda ke jejaring sosial!
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <button
            onClick={shareOnTwitter}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs font-bold border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <span>Twitter / X</span>
            <ExternalLink className="w-3 h-3" />
          </button>

          <button
            onClick={shareOnLinkedIn}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-400 text-xs font-bold border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <span>LinkedIn</span>
            <ExternalLink className="w-3 h-3" />
          </button>

          <button
            onClick={shareOnWhatsApp}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-bold border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <span>WhatsApp</span>
            <ExternalLink className="w-3 h-3" />
          </button>

          <button
            onClick={handleCopyShareText}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Tersalin!' : 'Salin Teks Share'}</span>
          </button>
        </div>
      </div>

      {/* Skills Matrix */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8">
        <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <span>Matriks Keterampilan Developer</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skillTracks.map((skill, i) => {
            const IconComponent = skill.icon;
            return (
              <div key={i} className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <IconComponent className={`w-5 h-5 ${skill.color}`} />
                    <span className="font-bold text-sm text-slate-200">{skill.name}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">{Math.round(skill.progress)}%</span>
                </div>

                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full transition-all duration-500"
                    style={{ width: `${skill.progress}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges / Achievements Milestone */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8">
        <h2 className="text-lg font-bold mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span>Pencapaian & Milestone</span>
          </div>
          <span className="text-xs text-slate-400 font-normal">
            {[totalCompleted > 0, totalCompleted >= 3 || userProgress.xp >= 100, userProgress.streak >= 1, (userProgress.completedProjects || []).length > 0].filter(Boolean).length} dari 4 Terbuka
          </span>
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Badge 1 */}
          <div className={`p-4 rounded-2xl border text-center space-y-1.5 transition-all ${
            totalCompleted > 0 
              ? 'bg-amber-500/10 border-amber-500/30 text-white shadow-lg shadow-amber-500/5' 
              : 'bg-slate-950/40 border-slate-800/80 text-slate-500 opacity-60'
          }`}>
            <div className="text-2xl">🌱</div>
            <div className="font-bold text-xs flex items-center justify-center gap-1">
              <span>First Step</span>
              {totalCompleted > 0 && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
            </div>
            <div className="text-[10px] text-slate-400">
              {totalCompleted > 0 ? 'Terbuka (Materi Selesai)' : 'Selesaikan 1 materi untuk membuka'}
            </div>
          </div>

          {/* Badge 2 */}
          <div className={`p-4 rounded-2xl border text-center space-y-1.5 transition-all ${
            totalCompleted >= 3 || userProgress.xp >= 100
              ? 'bg-indigo-500/10 border-indigo-500/30 text-white shadow-lg shadow-indigo-500/5' 
              : 'bg-slate-950/40 border-slate-800/80 text-slate-500 opacity-60'
          }`}>
            <div className="text-2xl">⚡</div>
            <div className="font-bold text-xs flex items-center justify-center gap-1">
              <span>Bug Hunter</span>
              {(totalCompleted >= 3 || userProgress.xp >= 100) && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
            </div>
            <div className="text-[10px] text-slate-400">
              {totalCompleted >= 3 || userProgress.xp >= 100 ? 'Terbuka (3 Latihan / 100 XP)' : 'Raih 100 XP untuk membuka'}
            </div>
          </div>

          {/* Badge 3 */}
          <div className={`p-4 rounded-2xl border text-center space-y-1.5 transition-all ${
            userProgress.streak >= 1
              ? 'bg-orange-500/10 border-orange-500/30 text-white shadow-lg shadow-orange-500/5' 
              : 'bg-slate-950/40 border-slate-800/80 text-slate-500 opacity-60'
          }`}>
            <div className="text-2xl">🔥</div>
            <div className="font-bold text-xs flex items-center justify-center gap-1">
              <span>On Fire</span>
              {userProgress.streak >= 1 && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
            </div>
            <div className="text-[10px] text-slate-400">
              {userProgress.streak >= 1 ? `Terbuka (${userProgress.streak} Hari Streak)` : 'Jaga streak 1 hari untuk membuka'}
            </div>
          </div>

          {/* Badge 4 */}
          <div className={`p-4 rounded-2xl border text-center space-y-1.5 transition-all ${
            (userProgress.completedProjects || []).length > 0
              ? 'bg-purple-500/10 border-purple-500/30 text-white shadow-lg shadow-purple-500/5' 
              : 'bg-slate-950/40 border-slate-800/80 text-slate-500 opacity-60'
          }`}>
            <div className="text-2xl">🚀</div>
            <div className="font-bold text-xs flex items-center justify-center gap-1">
              <span>Project Master</span>
              {(userProgress.completedProjects || []).length > 0 && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
            </div>
            <div className="text-[10px] text-slate-400">
              {(userProgress.completedProjects || []).length > 0 ? 'Terbuka (Proyek Selesai)' : 'Selesaikan 1 proyek portofolio'}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

