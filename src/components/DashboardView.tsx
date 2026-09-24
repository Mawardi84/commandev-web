import React from 'react';
import { UserProgress, Course } from '../types';
import { 
  Trophy, 
  Flame, 
  CheckCircle2, 
  Terminal, 
  ArrowRight, 
  BookOpen, 
  Code2, 
  Bug, 
  Rocket, 
  Target, 
  Sparkles,
  Compass,
  PlayCircle
} from 'lucide-react';

interface DashboardViewProps {
  userProgress: UserProgress;
  courses: Course[];
  activeCourseId?: string;
  onSelectCourse: (course: Course) => void;
  onNavigateTab: (tab: 'academy' | 'practice' | 'playground' | 'projects' | 'profile') => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  userProgress,
  courses,
  activeCourseId,
  onSelectCourse,
  onNavigateTab
}) => {
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

  // Find active course (default to HTML if none)
  const activeCourse = courses.find(c => c.id === activeCourseId) || courses[0];

  // Find next uncompleted lesson in active course
  let nextLesson = null;
  let nextModuleName = '';
  if (activeCourse) {
    for (const lvl of activeCourse.levels) {
      for (const mod of lvl.modules) {
        for (const les of mod.lessons) {
          if (!userProgress.completedLessons.includes(les.id)) {
            nextLesson = les;
            nextModuleName = mod.title;
            break;
          }
        }
        if (nextLesson) break;
      }
      if (nextLesson) break;
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* 1. TOP PROFILE & STATS HERO BANNER */}
      <div className="relative rounded-3xl bg-slate-900 border border-slate-800 p-6 md:p-8 shadow-xl overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-800 text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-indigo-600/30 ring-4 ring-indigo-500/20 flex-shrink-0">
              <Terminal className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-200" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Selamat Datang di COMMANDEV! 👋</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {getRankTitle(currentLevel)}
                </span>
              </div>
              <p className="text-slate-400 text-sm max-w-xl">
                Lacak kemajuan belajarmu secara langsung. Kuasai pemrograman dari konsep dasar hingga membangun proyek nyata.
              </p>

              {/* Level XP Progress Bar */}
              <div className="mt-4 flex items-center gap-3 max-w-md">
                <span className="text-xs font-bold text-slate-300">Lv. {currentLevel}</span>
                <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full transition-all duration-700"
                    style={{ width: `${currentLevelXp}%` }}
                  ></div>
                </div>
                <span className="text-xs font-semibold text-slate-400">{currentLevelXp}/100 XP</span>
              </div>
            </div>
          </div>

          {/* Stat Badges */}
          <div className="grid grid-cols-3 gap-3 w-full lg:w-auto">
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-4 text-center">
              <div className="flex items-center justify-center gap-1.5 text-amber-400 mb-1">
                <Flame className="w-5 h-5 fill-amber-400" />
                <span className="text-2xl font-black">{userProgress.streak}</span>
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hari Streak</div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-4 text-center">
              <div className="flex items-center justify-center gap-1.5 text-indigo-400 mb-1">
                <Trophy className="w-5 h-5" />
                <span className="text-2xl font-black">{userProgress.xp}</span>
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total XP</div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-4 text-center">
              <div className="flex items-center justify-center gap-1.5 text-emerald-400 mb-1">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-2xl font-black">{totalCompleted}</span>
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Selesai</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. THE 5 CORE COMMANDEV QUESTIONS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Q1: WHERE AM I? */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider mb-2">
              <Compass className="w-4 h-4" />
              <span>Di mana posisi saya saat ini?</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{activeCourse.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Anda sedang aktif belajar di jalur <strong>{activeCourse.title}</strong>. Selesaikan semua modul untuk membuka proyek akhir.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">{activeCourse.levels.length} Level Pembelajaran</span>
            <button
              onClick={() => onSelectCourse(activeCourse)}
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <span>Buka Kurikulum</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Q2: WHAT SHOULD I LEARN NEXT? */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
              <PlayCircle className="w-4 h-4" />
              <span>Apa yang harus saya pelajari selanjutnya?</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">
              {nextLesson ? nextLesson.title : 'Semua materi telah diselesaikan!'}
            </h3>
            <p className="text-xs text-slate-400 mb-3">Modul: {nextModuleName || 'Kurikulum Selesai'}</p>
            <p className="text-sm text-slate-300">
              {nextLesson ? 'Lanjutkan materi berikutnya untuk menambah XP dan memperkuat pemahaman.' : 'Luar biasa! Lanjutkan dengan mengerjakan tantangan kode atau proyek portofolio.'}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-amber-400 font-bold">+{nextLesson?.xpReward || 50} XP</span>
            <button
              onClick={() => onSelectCourse(activeCourse)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <span>Mulai Sekarang</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Q3: WHAT SHOULD I PRACTICE? */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
              <Code2 className="w-4 h-4" />
              <span>Apa yang harus saya latih?</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Tantangan Debugging & Algoritma</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Uji ketajaman logikamu dalam menemukan error pada kode HTML, CSS, JavaScript, dan Python.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">Tersedia 4 Tantangan Aktif</span>
            <button
              onClick={() => onNavigateTab('practice')}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              <span>Ke Area Latihan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Q4: WHAT PROJECTS AM I BUILDING? */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-violet-400 font-bold text-xs uppercase tracking-wider mb-2">
              <Rocket className="w-4 h-4" />
              <span>Proyek apa yang sedang saya bangun?</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Developer Portfolio & Real App</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Bangun proyek nyata dengan validasi checklist otomatis untuk portofolio developer profesionalmu.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">3 Kategori Proyek</span>
            <button
              onClick={() => onNavigateTab('projects')}
              className="text-xs font-bold text-violet-400 hover:text-violet-300 flex items-center gap-1"
            >
              <span>Jelajahi Proyek</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
