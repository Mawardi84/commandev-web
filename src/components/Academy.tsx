import React, { useState } from 'react';
import { UserProgress, Course } from '../types';
import { COURSES } from '../data/curriculum';
import { 
  Trophy, 
  Flame, 
  Play, 
  CheckCircle2, 
  Medal, 
  Code2, 
  BookOpen, 
  Rocket, 
  Sparkles, 
  Compass, 
  ChevronRight, 
  Layers, 
  Star, 
  Clock, 
  Zap, 
  Award,
  Terminal
} from 'lucide-react';

interface AcademyProps {
  userProgress: UserProgress;
  courses?: Course[];
  onOpenCourse: (courseId: string) => void;
  onOpenAiTutor?: () => void;
}

export const Academy: React.FC<AcademyProps> = ({ userProgress, courses = COURSES, onOpenCourse, onOpenAiTutor }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'web' | 'python' | 'fullstack' | 'systems' | 'security'>('all');

  // Active featured course (HTML Mastery as primary beginner track)
  const activeCourse = courses[0] || COURSES[0];
  
  const totalLessons = activeCourse.levels.reduce((acc, level) => 
    acc + level.modules.reduce((mAcc, mod) => mAcc + mod.lessons.length, 0)
  , 0);
  
  const activeCourseLessons = activeCourse.levels.flatMap(l => l.modules.flatMap(m => m.lessons.map(ls => ls.id)));
  const completedInActiveCourse = userProgress.completedLessons.filter(id => activeCourseLessons.includes(id)).length;
  const completionPercentage = Math.round((completedInActiveCourse / totalLessons) * 100) || 0;
  const totalCompletedCount = userProgress.completedLessons.length;

  // Level calculation
  const currentLevel = Math.floor(userProgress.xp / 100) + 1;
  const currentLevelXp = userProgress.xp % 100;
  const xpNeededForNext = 100 - currentLevelXp;

  const getRankTitle = (lvl: number) => {
    if (lvl === 1) return 'Rookie Coder';
    if (lvl === 2) return 'Junior Developer';
    if (lvl === 3) return 'Frontend Apprentice';
    if (lvl === 4) return 'Code Artisan';
    return 'Fullstack Maestro';
  };

  const getCourseMeta = (courseId: string) => {
    switch (courseId) {
      case 'html-mastery':
        return {
          category: 'web',
          tag: 'HTML5 Semantic & Project Level',
          color: 'from-orange-500 to-amber-600',
          badgeBg: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-500/20',
          estTime: '8 Jam',
          levelLabel: 'Level 0 → 5',
        };
      case 'css-mastery':
      case 'css-styling':
        return {
          category: 'web',
          tag: 'CSS3 Flexbox, Grid & Responsive',
          color: 'from-blue-500 to-cyan-600',
          badgeBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20',
          estTime: '9 Jam',
          levelLabel: 'Fundamental → Advanced',
        };
      case 'js-mastery':
      case 'javascript-interactive':
        return {
          category: 'web',
          tag: 'Modern JS ES6+, DOM & Async',
          color: 'from-amber-400 to-yellow-600',
          badgeBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/20',
          estTime: '10 Jam',
          levelLabel: 'Beginner → Intermediate',
        };
      case 'python-mastery':
      case 'python-course':
        return {
          category: 'python',
          tag: 'Python 3.12, OOP & Real-World',
          color: 'from-blue-600 via-indigo-600 to-amber-500',
          badgeBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20',
          estTime: '12 Jam',
          levelLabel: 'Level 0 → 6',
        };
      case 'git-mastery':
        return {
          category: 'fullstack',
          tag: 'Git, GitHub, Branching & Merge',
          color: 'from-rose-500 to-red-600',
          badgeBg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/20',
          estTime: '4 Jam',
          levelLabel: 'Version Control',
        };
      case 'react-mastery':
      case 'react-beginners':
        return {
          category: 'web',
          tag: 'React 19, Components & Hooks',
          color: 'from-cyan-500 to-indigo-600',
          badgeBg: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-500/20',
          estTime: '11 Jam',
          levelLabel: 'Modern Frontend',
        };
      case 'backend-mastery':
        return {
          category: 'fullstack',
          tag: 'Node.js, Express & REST API',
          color: 'from-emerald-500 to-teal-600',
          badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20',
          estTime: '8 Jam',
          levelLabel: 'Server Architecture',
        };
      case 'database-mastery':
        return {
          category: 'fullstack',
          tag: 'Relational SQL & NoSQL',
          color: 'from-violet-500 to-purple-600',
          badgeBg: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-500/20',
          estTime: '6 Jam',
          levelLabel: 'Data Engineering',
        };
      case 'fullstack-mastery':
        return {
          category: 'fullstack',
          tag: 'End-to-End Web Engineering',
          color: 'from-indigo-600 to-violet-700',
          badgeBg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20',
          estTime: '14 Jam',
          levelLabel: 'Full Stack Master',
        };
      case 'php-mastery':
        return {
          category: 'fullstack',
          tag: 'PHP 8, OOP & REST API',
          color: 'from-indigo-600 to-purple-700',
          badgeBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/20',
          estTime: '10 Jam',
          levelLabel: 'Backend Engineering',
        };
      case 'mysql-mastery':
        return {
          category: 'fullstack',
          tag: 'MySQL 8, DDL/DML, JOIN & ACID',
          color: 'from-blue-600 to-cyan-700',
          badgeBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20',
          estTime: '9 Jam',
          levelLabel: 'Relational Database',
        };
      case 'c-mastery':
        return {
          category: 'systems',
          tag: 'C Systems, Pointers & Memory Heap',
          color: 'from-slate-600 to-indigo-800',
          badgeBg: 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600/30',
          estTime: '12 Jam',
          levelLabel: 'Systems Programming',
        };
      case 'cpp-mastery':
        return {
          category: 'systems',
          tag: 'C++ Modern, OOP, STL & RAII',
          color: 'from-blue-700 to-indigo-900',
          badgeBg: 'bg-blue-600/10 text-blue-500 dark:text-blue-400 border-blue-300 dark:border-blue-500/30',
          estTime: '14 Jam',
          levelLabel: 'High-Performance C++',
        };
      case 'golang-mastery':
        return {
          category: 'systems',
          tag: 'Go Concurrency, Goroutines & net/http',
          color: 'from-cyan-600 to-teal-700',
          badgeBg: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-500/20',
          estTime: '11 Jam',
          levelLabel: 'Cloud & Concurrency',
        };
      case 'engineering-fundamentals':
        return {
          category: 'security',
          tag: 'Computer, Web & Testing QA',
          color: 'from-blue-600 to-indigo-700',
          badgeBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20',
          estTime: '10 Jam',
          levelLabel: 'Stage 01 → 03',
        };
      case 'cybersecurity-mastery':
        return {
          category: 'security',
          tag: 'CIA Triad, Threat Modeling & OWASP Top 10',
          color: 'from-rose-600 to-red-700',
          badgeBg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/20',
          estTime: '14 Jam',
          levelLabel: 'Stage 04 → 08',
        };
      case 'auth-api-security':
        return {
          category: 'security',
          tag: 'Bcrypt, JWT, RBAC, IDOR & Supply Chain',
          color: 'from-amber-500 to-orange-600',
          badgeBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/20',
          estTime: '11 Jam',
          levelLabel: 'Stage 09 → 12',
        };
      case 'devsecops-deployment':
        return {
          category: 'security',
          tag: 'Docker, CI/CD DevSecOps, Cloud & Hardening',
          color: 'from-purple-600 to-indigo-800',
          badgeBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/20',
          estTime: '13 Jam',
          levelLabel: 'Stage 13 → 17',
        };
      case 'production-readiness':
        return {
          category: 'security',
          tag: 'Observability, Incident, Backup & UU PDP',
          color: 'from-emerald-600 to-teal-700',
          badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20',
          estTime: '12 Jam',
          levelLabel: 'Stage 18 → 24',
        };
      default:
        return {
          category: 'web',
          tag: 'Programming Track',
          color: 'from-indigo-500 to-purple-600',
          badgeBg: 'bg-indigo-500/10 text-indigo-600 border-indigo-200',
          estTime: '6 Jam',
          levelLabel: 'Semua Level',
        };
    }
  };

  const filteredCourses = courses.filter(course => {
    if (selectedCategory === 'all') return true;
    const meta = getCourseMeta(course.id);
    return meta.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 min-h-[calc(100vh-64px)] text-slate-900 dark:text-slate-100">
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* MAIN COLUMN (Course Track & Catalog) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 2. FEATURED ACTIVE COURSE (LANJUTKAN BELAJAR) */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <h2 className="text-xl font-bold tracking-tight">Lanjutkan Modul Aktif</h2>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                Terakhir Diperbarui
              </span>
            </div>

            <div className="group relative rounded-3xl bg-slate-900 text-white border border-slate-800 p-6 sm:p-8 shadow-xl overflow-hidden hover:border-slate-700 transition-all">
              {/* Background gradient decorative glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/20 blur-[90px] rounded-full pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/10 blur-[80px] rounded-full pointer-events-none"></div>

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-4 max-w-xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500/20 text-orange-400 border border-orange-500/30">
                      HTML & Web Dasar
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> 3 Jam
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 text-white">
                      {activeCourse.title}
                    </h3>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-2">
                      {activeCourse.shortDescription}
                    </p>
                  </div>

                  {/* Progress Bar with Stats */}
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-xs sm:text-sm font-semibold text-slate-300">
                      <span>Progres Belajar: {completedInActiveCourse} dari {totalLessons} Materi</span>
                      <span className="text-indigo-400 font-bold">{completionPercentage}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/80">
                      <div 
                        className="h-full bg-gradient-to-r from-orange-500 via-indigo-500 to-cyan-400 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${completionPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Primary Action Button */}
                <div className="flex-shrink-0 pt-2 md:pt-0">
                  <button 
                    onClick={() => onOpenCourse(activeCourse.id)}
                    className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-3 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Lanjutkan Materi</span>
                    <ChevronRight className="w-4 h-4 text-indigo-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 3. CURRICULUM ROADMAP & CATALOG */}
          <div className="space-y-6 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Katalog Jalur Belajar</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Pilih kurikulum yang ingin kamu kuasai langkah demi langkah.</p>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/60 overflow-x-auto text-xs font-bold">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${selectedCategory === 'all' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
                >
                  Semua ({courses.length})
                </button>
                <button
                  onClick={() => setSelectedCategory('web')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${selectedCategory === 'web' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
                >
                  Frontend & Web
                </button>
                <button
                  onClick={() => setSelectedCategory('python')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${selectedCategory === 'python' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
                >
                  Python
                </button>
                <button
                  onClick={() => setSelectedCategory('fullstack')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${selectedCategory === 'fullstack' ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
                >
                  Backend & DB
                </button>
                <button
                  onClick={() => setSelectedCategory('systems')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${selectedCategory === 'systems' ? 'bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
                >
                  Systems & Low-Level (C, C++, Go)
                </button>
                <button
                  onClick={() => setSelectedCategory('security')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${selectedCategory === 'security' ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
                >
                  Security & Continuous Eng (5)
                </button>
              </div>
            </div>

            {/* Courses Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {filteredCourses.map(course => {
                const meta = getCourseMeta(course.id);
                const courseLessons = course.levels.flatMap(l => l.modules.flatMap(m => m.lessons.map(ls => ls.id)));
                const completedInThis = userProgress.completedLessons.filter(id => courseLessons.includes(id)).length;
                const percent = Math.round((completedInThis / (courseLessons.length || 1)) * 100) || 0;
                const isCurrentActive = course.id === activeCourse.id;

                return (
                  <div
                    key={course.id}
                    onClick={() => onOpenCourse(course.id)}
                    className="group cursor-pointer rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 p-5 sm:p-6 shadow-sm hover:shadow-lg hover:border-indigo-400/80 dark:hover:border-indigo-500/50 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${meta.color} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}>
                          <Code2 className="w-6 h-6" />
                        </div>

                        <div className="flex flex-col items-end">
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${meta.badgeBg}`}>
                            {meta.levelLabel}
                          </span>
                          <span className="text-[11px] text-slate-400 mt-1 font-medium flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {meta.estTime}
                          </span>
                        </div>
                      </div>

                      <h4 className="font-bold text-lg mb-1.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {course.title}
                      </h4>
                      <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
                        {course.shortDescription}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800/70 space-y-2.5">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                        <span>{courseLessons.length} Materi Pembelajaran</span>
                        <span className="text-indigo-600 dark:text-indigo-400 font-bold">{percent}%</span>
                      </div>
                      
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>

                      <div className="flex items-center justify-between pt-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                        <span>{isCurrentActive ? 'Buka Kelas' : 'Mulai Belajar'}</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* SIDEBAR: ACHIEVEMENTS & AI TUTOR BANNER */}
        <div className="space-y-6">
          
          {/* AI Tutor Card */}
          <div className="rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white p-6 border border-indigo-800/40 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/20 blur-2xl rounded-full pointer-events-none"></div>
            
            <div className="relative z-10 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/60 border border-indigo-400/30 flex items-center justify-center text-cyan-300">
                <Sparkles className="w-5 h-5" />
              </div>

              <div>
                <h3 className="font-bold text-lg text-white mb-1">Tanya Mentor AI</h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Bingung dengan sintaks kode atau error saat latihan? AI Tutor siap membimbingmu 24/7 langsung di browsermu.
                </p>
              </div>

              {onOpenAiTutor && (
                <button
                  onClick={onOpenAiTutor}
                  className="w-full py-2.5 px-4 rounded-xl bg-white text-indigo-900 hover:bg-slate-100 font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Buka AI Tutor</span>
                </button>
              )}
            </div>
          </div>

          {/* Achievements & Badges Shelf */}
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-base flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Pencapaian & Badge</span>
              </h3>
              <span className="text-xs font-semibold text-slate-400">
                {totalCompletedCount >= 5 ? '2/4 Terbuka' : totalCompletedCount >= 1 ? '1/4 Terbuka' : '0/4'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Badge 1 */}
              <div className={`p-3.5 rounded-2xl border flex flex-col items-center text-center gap-2 transition-all ${
                totalCompletedCount >= 1 
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200' 
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-40 grayscale'
              }`}>
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <Medal className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <div className="text-xs font-bold leading-tight">First Line</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Selesaikan 1 Materi</div>
                </div>
              </div>

              {/* Badge 2 */}
              <div className={`p-3.5 rounded-2xl border flex flex-col items-center text-center gap-2 transition-all ${
                totalCompletedCount >= 5 
                  ? 'bg-blue-500/10 border-blue-500/30 text-blue-900 dark:text-blue-200' 
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-40 grayscale'
              }`}>
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <div className="text-xs font-bold leading-tight">Explorer</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">5 Materi Selesai</div>
                </div>
              </div>

              {/* Badge 3 */}
              <div className={`p-3.5 rounded-2xl border flex flex-col items-center text-center gap-2 transition-all ${
                userProgress.completedLessons.includes('les-5-1-1') 
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-200' 
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-40 grayscale'
              }`}>
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-rose-500" />
                </div>
                <div>
                  <div className="text-xs font-bold leading-tight">Builder</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Buat 1 Proyek</div>
                </div>
              </div>

              {/* Badge 4 */}
              <div className={`p-3.5 rounded-2xl border flex flex-col items-center text-center gap-2 transition-all ${
                completionPercentage >= 100 
                  ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-900 dark:text-indigo-200' 
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-40 grayscale'
              }`}>
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-indigo-500" />
                </div>
                <div>
                  <div className="text-xs font-bold leading-tight">HTML Master</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Tuntaskan Jalur</div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Log */}
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-sm">
            <h3 className="font-bold text-base mb-4 flex items-center justify-between">
              <span>Aktivitas Terakhir</span>
              <span className="text-[11px] font-semibold text-slate-400">Log Real-time</span>
            </h3>

            {userProgress.completedLessons.length === 0 ? (
              <div className="text-center py-6 text-slate-400 text-xs">
                Belum ada aktivitas. Mulai pelajari materi pertama sekarang!
              </div>
            ) : (
              <div className="space-y-3">
                {userProgress.completedLessons.slice(-4).reverse().map((lessonId, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold truncate">Materi Diselesaikan</p>
                      <p className="text-[10px] text-slate-400 font-mono truncate">{lessonId}</p>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      +XP
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
