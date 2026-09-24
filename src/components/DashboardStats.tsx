import React from 'react';
import { UserProgress } from '../types';
import { Trophy, Flame, CheckCircle2, Terminal } from 'lucide-react';

interface DashboardStatsProps {
  userProgress: UserProgress;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ userProgress }) => {
  const currentLevel = Math.floor(userProgress.xp / 100) + 1;
  const currentLevelXp = userProgress.xp % 100;
  const totalCompletedCount = userProgress.completedLessons.length;

  const getRankTitle = (lvl: number) => {
    if (lvl === 1) return 'Rookie Coder';
    if (lvl === 2) return 'Junior Developer';
    if (lvl === 3) return 'Frontend Apprentice';
    if (lvl === 4) return 'Code Artisan';
    return 'Fullstack Maestro';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <h2 className="text-3xl font-bold mb-8">Statistik Belajar</h2>
      
      <div className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-6 md:p-8 shadow-sm overflow-hidden mb-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* User Info & Level */}
          <div className="flex items-start gap-4 sm:gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 text-white flex items-center justify-center font-bold text-2xl sm:text-3xl shadow-lg shadow-indigo-600/20 ring-4 ring-indigo-50 dark:ring-indigo-950/50 flex-shrink-0">
              <Terminal className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-200" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Halo, Calon Master! 👋</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  {getRankTitle(currentLevel)}
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl">
                Lacak perkembangan belajarmu, kumpulkan XP, pertahankan streak, dan raih pencapaian baru!
              </p>

              {/* Level XP Progress Bar */}
              <div className="mt-4 flex items-center gap-3 max-w-md">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap">
                  Lv. {currentLevel}
                </span>
                <div className="flex-1 h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700/60">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${currentLevelXp}%` }}
                  ></div>
                </div>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">
                  {currentLevelXp}/100 XP
                </span>
              </div>
            </div>
          </div>

          {/* Stat Pills */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full lg:w-auto mt-6 lg:mt-0">
            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 rounded-2xl p-4 sm:p-5 text-center">
              <div className="flex items-center justify-center gap-1.5 text-amber-500 mb-2">
                <Flame className="w-5 h-5 sm:w-6 sm:h-6 fill-amber-500" />
                <span className="text-2xl sm:text-3xl font-black">{userProgress.streak}</span>
              </div>
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Hari Streak
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 rounded-2xl p-4 sm:p-5 text-center">
              <div className="flex items-center justify-center gap-1.5 text-indigo-500 mb-2">
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-2xl sm:text-3xl font-black">{userProgress.xp}</span>
              </div>
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Total XP
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 rounded-2xl p-4 sm:p-5 text-center">
              <div className="flex items-center justify-center gap-1.5 text-emerald-500 mb-2">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-2xl sm:text-3xl font-black">{totalCompletedCount}</span>
              </div>
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Terselesaikan
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Next Dashboard widgets */}
      <div className="p-8 text-center max-w-2xl mx-auto mt-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl">
        <h3 className="text-xl font-bold mb-4">Grafik Pembelajaran & Pencapaian</h3>
        <p className="text-slate-500 mb-8">Detail analitik harian dan badge yang sudah Anda kumpulkan akan ditampilkan di sini.</p>
        <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-slate-400">
          [Modul Visualisasi Data Segera Hadir]
        </div>
      </div>
    </div>
  );
};
