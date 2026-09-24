import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Course, Lesson } from '../types';
import { CodePlayground } from './CodePlayground';
import { QuizEngine } from './QuizEngine';
import { AiTutorModal } from './AiTutorModal';
import { GitSimulator } from './GitSimulator';
import { ArchitectureSimulatorHub } from './simulators/ArchitectureSimulatorHub';
import { CodeDiffViewer } from './CodeDiffViewer';
import { analyticsService } from '../services/analytics';
import { 
  CheckCircle2, 
  BookOpen, 
  Code2, 
  Trophy, 
  ArrowLeft, 
  ArrowRight, 
  Play, 
  Rocket, 
  Sparkles, 
  Menu, 
  X, 
  Layout, 
  ChevronRight,
  Terminal,
  HelpCircle,
  Award,
  Check,
  RotateCcw,
  Zap,
  Columns,
  FolderGit2,
  Info,
  Lightbulb,
  AlertTriangle
} from 'lucide-react';
import { useSettings } from '../lib/SettingsContext';

interface LearningStudioProps {
  course: Course;
  activeLessonId: string;
  onNavigateLesson: (lessonId: string) => void;
  onCompleteLesson: (lessonId: string, xpGained: number) => void;
  completedLessons: string[];
  onBackToDashboard: () => void;
}

export const LearningStudio: React.FC<LearningStudioProps> = ({ 
  course, 
  activeLessonId, 
  onNavigateLesson, 
  onCompleteLesson,
  completedLessons,
  onBackToDashboard
}) => {
  const { settings } = useSettings();
  const [isAiTutorOpen, setIsAiTutorOpen] = useState(false);
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false);
  const [mobileTab, setMobileTab] = useState<'material' | 'playground'>('material');
  const [currentHtml, setCurrentHtml] = useState('');
  const [currentCss, setCurrentCss] = useState('');
  const [currentJs, setCurrentJs] = useState('');
  const [currentPy, setCurrentPy] = useState('');
  const [showDiff, setShowDiff] = useState(false);

  // Interactive Checkpoint state for theory lessons
  const [checkpointDone, setCheckpointDone] = useState<Record<string, boolean>>({});

  // Flatten all lessons to allow next/prev navigation
  const allLessons: Lesson[] = [];
  let currentModuleTitle = '';
  let currentLevelTitle = '';
  
  for (const level of course.levels) {
    for (const mod of level.modules) {
      for (const lesson of mod.lessons) {
        allLessons.push(lesson);
        if (lesson.id === activeLessonId) {
          currentModuleTitle = mod.title;
          currentLevelTitle = level.title;
        }
      }
    }
  }

  const currentLesson = allLessons.find(l => l.id === activeLessonId);

  if (!currentLesson) {
    return (
      <div className="p-10 flex flex-col items-center justify-center h-full text-center">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 flex items-center justify-center mb-4">
          <BookOpen className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Materi Tidak Ditemukan</h2>
        <p className="text-slate-500 text-sm mb-6 max-w-sm">Materi yang kamu tuju mungkin telah dipindahkan atau kurikulum diperbarui.</p>
        <button onClick={onBackToDashboard} className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all">
          Kembali ke Dashboard
        </button>
      </div>
    );
  }

  const currentIndex = allLessons.findIndex(l => l.id === activeLessonId);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const isCompleted = completedLessons.includes(activeLessonId);

  const handleLessonComplete = (xpGained?: number) => {
    if (!isCompleted && currentLesson) {
      const reward = typeof xpGained === 'number' && xpGained >= 0 ? xpGained : currentLesson.xpReward;
      onCompleteLesson(activeLessonId, reward);
    }
  };

  const getLessonBadge = (type: string) => {
    switch (type) {
      case 'learn':
        return {
          label: 'Teori & Pemahaman',
          icon: <BookOpen className="w-3.5 h-3.5" />,
          color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20'
        };
      case 'practice':
        return {
          label: 'Latihan Terbimbing',
          icon: <Code2 className="w-3.5 h-3.5" />,
          color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20'
        };
      case 'challenge':
        return {
          label: 'Tantangan Mandiri',
          icon: <Terminal className="w-3.5 h-3.5" />,
          color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20'
        };
      case 'quiz':
        return {
          label: 'Kuis Evaluasi',
          icon: <HelpCircle className="w-3.5 h-3.5" />,
          color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/20'
        };
      case 'project':
        return {
          label: 'Proyek Nyata',
          icon: <Rocket className="w-3.5 h-3.5" />,
          color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/20'
        };
      default:
        return {
          label: 'Pelajaran',
          icon: <Play className="w-3.5 h-3.5" />,
          color: 'bg-slate-500/10 text-slate-600 border-slate-200'
        };
    }
  };

  const badgeInfo = getLessonBadge(currentLesson.type);
  const isArchitectureCourse = course.id === 'software-architecture' || course.id.includes('architecture');
  const isInteractive = currentLesson.type === 'practice' || currentLesson.type === 'challenge' || currentLesson.type === 'project' || isArchitectureCourse;
  const progressPercent = Math.round((completedLessons.length / (allLessons.length || 1)) * 100);

  // Observational Telemetry: Observe lesson_started when user opens a lesson
  useEffect(() => {
    if (currentLesson?.id) {
      analyticsService.trackLessonStarted(course.id, currentLesson.id, undefined, currentLesson.title, currentLesson.type);
    }
  }, [currentLesson?.id, course.id, currentLesson?.title, currentLesson?.type]);

  return (
    <div className="flex h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden font-sans">
      
      {/* SIDEBAR NAVIGATION (Desktop) */}
      <aside className="w-80 flex-shrink-0 border-r border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 overflow-y-auto custom-scrollbar hidden lg:flex flex-col">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur z-10">
          <button 
            onClick={onBackToDashboard}
            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 transition-colors mb-3 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Dashboard
          </button>
          
          <h2 className="font-extrabold text-base leading-tight truncate" title={course.title}>
            {course.title}
          </h2>

          <div className="mt-3 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Progress Kelas</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden p-0.5">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Syllabus List */}
        <div className="p-4 space-y-6 flex-1">
          {course.levels.map(level => (
            <div key={level.id} className="space-y-3">
              <h3 className="text-[11px] font-black uppercase tracking-wider text-slate-400 px-1">
                {level.title}
              </h3>

              <div className="space-y-3">
                {level.modules.map(mod => (
                  <div key={mod.id} className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 px-2 py-1">
                      {mod.title}
                    </h4>

                    <div className="space-y-0.5">
                      {mod.lessons.map(lesson => {
                        const isActive = lesson.id === activeLessonId;
                        const isDone = completedLessons.includes(lesson.id);
                        const itemBadge = getLessonBadge(lesson.type);

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => onNavigateLesson(lesson.id)}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-all duration-150 cursor-pointer ${
                              isActive 
                                ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/25 ring-1 ring-indigo-500' 
                                : 'hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white hover:translate-x-0.5 text-slate-600 dark:text-slate-400'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 truncate">
                              <span className={isDone ? (isActive ? 'text-white' : 'text-emerald-500') : (isActive ? 'text-indigo-200' : 'opacity-50')}>
                                {isDone ? <CheckCircle2 className="w-4 h-4" /> : itemBadge.icon}
                              </span>
                              <span className="truncate">{lesson.title}</span>
                            </div>

                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'text-slate-400'}`}>
                              +{lesson.xpReward} XP
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* MOBILE DRAWER BACKDROP & DRAWER */}
      {isSidebarOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setIsSidebarOpenMobile(false)}></div>
          <div className="relative w-80 max-w-[80vw] bg-white dark:bg-slate-900 h-full p-4 overflow-y-auto shadow-2xl flex flex-col z-10">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
              <h3 className="font-bold text-sm">Daftar Materi</h3>
              <button onClick={() => setIsSidebarOpenMobile(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {allLessons.map((lesson, idx) => {
                const isActive = lesson.id === activeLessonId;
                const isDone = completedLessons.includes(lesson.id);
                return (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      onNavigateLesson(lesson.id);
                      setIsSidebarOpenMobile(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between ${
                      isActive ? 'bg-indigo-600 text-white font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-mono text-[10px] opacity-70">#{idx + 1}</span>
                      <span className="truncate">{lesson.title}</span>
                    </div>
                    {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MAIN STUDIO WORKSPACE */}
      <main className="flex-1 flex flex-col h-full min-w-0 overflow-hidden relative">
        
        {/* SUB-HEADER / BREADCRUMB & CONTROLS */}
        <div className="h-12 border-b border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 px-4 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 truncate">
            {/* Mobile syllabus button */}
            <button 
              onClick={() => setIsSidebarOpenMobile(true)}
              className="lg:hidden p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              title="Buka Daftar Materi"
            >
              <Menu className="w-4 h-4" />
            </button>

            <span className="text-slate-400 hidden sm:inline truncate">{currentLevelTitle}</span>
            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">/</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300 truncate">{currentModuleTitle}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Responsive Mode Toggle for Small Screens if Interactive */}
            {isInteractive && (
              <div className="flex lg:hidden bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-[11px] font-bold">
                <button
                  onClick={() => setMobileTab('material')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${mobileTab === 'material' ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-xs' : 'text-slate-500'}`}
                >
                  Materi
                </button>
                <button
                  onClick={() => setMobileTab('playground')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${mobileTab === 'playground' ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-xs' : 'text-slate-500'}`}
                >
                  {isArchitectureCourse ? 'Simulator' : 'Editor Kode'}
                </button>
              </div>
            )}

            {/* Quick AI Tutor Help Trigger */}
            <button
              onClick={() => setIsAiTutorOpen(true)}
              className="px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">AI Tutor</span>
            </button>
          </div>
        </div>

        {/* WORKSPACE SPLIT: Content Pane & Playground Pane */}
        <div className={`flex-1 flex flex-col ${isInteractive ? 'lg:flex-row' : ''} h-[calc(100%-48px-56px)] overflow-hidden`}>
          
          {/* LEFT PANE: LESSON MATERIAL */}
          <div className={`flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 ${
            isInteractive 
              ? `lg:w-1/2 lg:max-w-2xl border-r border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 ${mobileTab !== 'material' ? 'hidden lg:block' : 'block'}`
              : 'max-w-4xl mx-auto w-full bg-white dark:bg-slate-900 shadow-sm my-4 rounded-3xl border border-slate-200 dark:border-slate-800'
          }`}>
            
            {/* Title & Badge */}
            <div className="mb-6">
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${badgeInfo.color}`}>
                  {badgeInfo.icon}
                  <span>{badgeInfo.label}</span>
                </span>

                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30">
                  +{currentLesson.xpReward} XP
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-3 leading-tight">
                {currentLesson.title}
              </h1>

              {isCompleted && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-200 dark:border-emerald-500/20">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Selesai Dipelajari</span>
                </div>
              )}
            </div>

            {/* Checkpoint Steps Progress Bar */}
            <div className="mb-8 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  Tahapan Checkpoint Pembelajaran
                </span>
                <span className="text-indigo-600 dark:text-indigo-400">
                  {isCompleted ? '100% Tuntas' : 'Sedang Berlangsung'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-bold">
                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center gap-1">
                  <Check className="w-3 h-3 text-indigo-600" />
                  <span>1. Pahami Konsep</span>
                </div>
                <div className={`p-2 rounded-xl border flex items-center justify-center gap-1 transition-all ${
                  isCompleted || checkpointDone[activeLessonId] 
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800' 
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-800'
                }`}>
                  <Check className="w-3 h-3" />
                  <span>2. Praktek Mandiri</span>
                </div>
                <div className={`p-2 rounded-xl border flex items-center justify-center gap-1 transition-all ${
                  isCompleted 
                    ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800' 
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-800'
                }`}>
                  <Trophy className="w-3 h-3" />
                  <span>3. XP Terbuka</span>
                </div>
              </div>
            </div>

            {/* Markdown & Code Example Blocks */}
            {currentLesson.content && (
              <div className="prose prose-slate dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed mb-8 space-y-4">
                {currentLesson.content.map((block, idx) => {
                  if (block.type === 'markdown') {
                    return (
                      <div key={idx} className="markdown-body leading-relaxed text-slate-700 dark:text-slate-300">
                        <ReactMarkdown>{block.content}</ReactMarkdown>
                      </div>
                    );
                  }
                  if (block.type === 'heading') {
                    const level = block.level || 2;
                    if (level === 1) return <h1 key={idx} className="text-2xl font-bold text-slate-900 dark:text-white mt-6 mb-3">{block.text}</h1>;
                    if (level === 3) return <h3 key={idx} className="text-lg font-bold text-slate-900 dark:text-white mt-4 mb-2">{block.text}</h3>;
                    if (level === 4) return <h4 key={idx} className="text-base font-bold text-slate-900 dark:text-white mt-3 mb-2">{block.text}</h4>;
                    return <h2 key={idx} className="text-xl font-bold text-slate-900 dark:text-white mt-5 mb-3">{block.text}</h2>;
                  }
                  if (block.type === 'paragraph') {
                    return (
                      <p key={idx} className="text-slate-700 dark:text-slate-300 leading-relaxed my-3">
                        {block.text}
                      </p>
                    );
                  }
                  if (block.type === 'code' || block.type === 'code-example') {
                    return (
                      <div key={idx} className="my-5 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-lg">
                        <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                          <span className="flex items-center gap-1.5">
                            <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                            <span>Contoh Kode Interaktif</span>
                          </span>
                          <span className="uppercase text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
                            {block.language || 'code'}
                          </span>
                        </div>
                        <pre 
                          className="p-4 overflow-x-auto font-mono text-slate-200 bg-[#1d1f21] m-0"
                          style={{ fontSize: `${settings.fontSize}px` }}
                        >
                          <code>{block.code}</code>
                        </pre>
                      </div>
                    );
                  }
                  if (block.type === 'note') {
                    return (
                      <div key={idx} className="my-4 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-900 dark:text-blue-200 flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                        <div>
                          {block.title && <h5 className="font-bold text-sm mb-1">{block.title}</h5>}
                          <p className="text-xs sm:text-sm">{block.text}</p>
                        </div>
                      </div>
                    );
                  }
                  if (block.type === 'tip') {
                    return (
                      <div key={idx} className="my-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-900 dark:text-emerald-200 flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <div>
                          {block.title && <h5 className="font-bold text-sm mb-1">{block.title}</h5>}
                          <p className="text-xs sm:text-sm">{block.text}</p>
                        </div>
                      </div>
                    );
                  }
                  if (block.type === 'warning') {
                    return (
                      <div key={idx} className="my-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          {block.title && <h5 className="font-bold text-sm mb-1">{block.title}</h5>}
                          <p className="text-xs sm:text-sm">{block.text}</p>
                        </div>
                      </div>
                    );
                  }
                  if (block.type === 'example') {
                    return (
                      <div key={idx} className="my-5 p-5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 space-y-3">
                        {block.title && <h5 className="font-bold text-sm text-indigo-400">{block.title}</h5>}
                        {block.code && (
                          <pre className="p-3 rounded-xl bg-slate-950 font-mono text-xs overflow-x-auto text-emerald-400">
                            <code>{block.code}</code>
                          </pre>
                        )}
                        {block.explanation && <p className="text-xs text-slate-400">{block.explanation}</p>}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            )}

            {/* Interactive Concept Checkpoint Card for Theory Lessons */}
            {currentLesson.type === 'learn' && (
              <div className="my-8 p-6 rounded-2xl bg-indigo-950/20 border-2 border-indigo-500/30 text-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                      ✓
                    </div>
                    <span className="font-bold text-sm text-indigo-300">Checkpoint Pemahaman Konsep</span>
                  </div>
                  <span className="text-xs text-slate-400">Praktek Cepat</span>
                </div>

                <p className="text-xs text-slate-300">
                  Pastikan kamu telah membaca dan memahami sintaks di atas. Klik konfirmasi di bawah untuk menandai bahwa kamu telah menguasai konsep dasar ini:
                </p>

                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 flex items-center justify-between">
                  <span>Sintaks & struktur materi telah diverifikasi</span>
                  <span className="text-xs text-slate-500">Siap diterapkan</span>
                </div>

                <button
                  onClick={() => {
                    setCheckpointDone(prev => ({ ...prev, [activeLessonId]: true }));
                    handleLessonComplete();
                  }}
                  className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isCompleted || checkpointDone[activeLessonId]
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isCompleted ? 'Konsep Berhasil Dikuasai (+XP)' : 'Konfirmasi Pemahaman & Dapatkan XP'}</span>
                </button>
              </div>
            )}

            {/* Quiz Engine Component if Quiz */}
            {currentLesson.type === 'quiz' && currentLesson.questions && (
              <div className="pt-4">
                <QuizEngine 
                  lessonId={currentLesson.id}
                  quizTitle={currentLesson.title}
                  quizDescription={currentLesson.description}
                  questions={currentLesson.questions} 
                  onComplete={handleLessonComplete} 
                  isCompleted={isCompleted}
                  onNextLesson={() => nextLesson && onNavigateLesson(nextLesson.id)}
                  nextLessonTitle={nextLesson?.title}
                />
              </div>
            )}

            {/* Complete & Next CTA for non-interactive types */}
            {currentLesson.type === 'learn' && (
              <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                <span className="text-xs text-slate-400 font-medium">
                  {isCompleted ? 'Materi ini sudah kamu kuasai.' : 'Pahami teori di atas sebelum melangkah ke sesi praktek.'}
                </span>

                <button
                  onClick={() => {
                    handleLessonComplete();
                    if (nextLesson) onNavigateLesson(nextLesson.id);
                  }}
                  className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/20 hover:-translate-y-0.5 transition-all cursor-pointer flex-shrink-0"
                >
                  <span>{isCompleted ? 'Lanjutkan Materi' : 'Tandai Selesai & Lanjut'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

          {/* RIGHT PANE: CODE PLAYGROUND OR GIT SIMULATOR (For practice, challenge, project) */}
          {isInteractive && (
            <div className={`flex-1 h-full bg-slate-950 flex flex-col relative overflow-hidden ${
              mobileTab !== 'playground' ? 'hidden lg:flex' : 'flex'
            }`}>
              {currentLesson.language === 'git' || course.id.includes('git') ? (
                <div className="flex-1 p-3 overflow-hidden">
                  <GitSimulator onRewardXp={handleLessonComplete} />
                </div>
              ) : isArchitectureCourse ? (
                <div className="flex-1 p-3 overflow-hidden">
                  <ArchitectureSimulatorHub onRewardXp={handleLessonComplete} />
                </div>
              ) : showDiff ? (
                <div className="flex-1 p-4 flex flex-col overflow-hidden bg-slate-950">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <Columns className="w-4 h-4 text-indigo-400" />
                      Inspektur Perbandingan Kode (Diff)
                    </span>
                    <button
                      onClick={() => setShowDiff(false)}
                      className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    >
                      Kembali ke Editor
                    </button>
                  </div>
                  <div className="flex-1 overflow-auto">
                    <CodeDiffViewer 
                      originalCode={currentLesson.starterCode || ''}
                      modifiedCode={currentHtml || currentPy || ''}
                      originalTitle="Starter Code"
                      modifiedTitle="Kode Pengerjaan Anda"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col h-full relative overflow-hidden">
                  {/* Floating Diff Toggle */}
                  {currentLesson.starterCode && (
                    <div className="absolute top-2 right-14 z-30">
                      <button
                        onClick={() => setShowDiff(true)}
                        className="px-2.5 py-1 bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-semibold border border-slate-700 backdrop-blur-md flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                        title="Bandingkan kode pengerjaan dengan starter code"
                      >
                        <Columns className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Diff</span>
                      </button>
                    </div>
                  )}

                  <CodePlayground 
                    key={currentLesson.id}
                    exerciseId={currentLesson.id}
                    language={currentLesson.language === 'python' || course.id.includes('python') ? 'python' : 'web'}
                    starterCode={currentLesson.starterCode || ''} 
                    starterCss={currentLesson.starterCss}
                    starterJs={currentLesson.starterJs}
                    starterPy={currentLesson.starterPy}
                    hints={currentLesson.hints}
                    requirements={currentLesson.requirements}
                    onComplete={handleLessonComplete}
                    isCompleted={isCompleted}
                    onNextLesson={() => nextLesson && onNavigateLesson(nextLesson.id)}
                    nextLessonTitle={nextLesson?.title}
                    onCodeChange={(html, css, js, py) => {
                      setCurrentHtml(html);
                      setCurrentCss(css);
                      setCurrentJs(js);
                      if (py !== undefined) setCurrentPy(py);
                    }}
                  />
                </div>
              )}

              {/* Completed Toast Banner for practice, challenge, project */}
              {isCompleted && nextLesson && (
                <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center justify-between z-20">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold truncate mr-2">
                    <Trophy className="w-4 h-4 text-amber-300 flex-shrink-0" />
                    <span className="truncate">Tuntas (+{currentLesson.xpReward} XP)! Siap lanjut ke <strong>{nextLesson.title}</strong>?</span>
                  </div>
                  <button
                    onClick={() => onNavigateLesson(nextLesson.id)}
                    className="px-3.5 py-1.5 bg-white text-slate-900 rounded-xl text-xs font-black shadow-md hover:bg-slate-100 transition-all flex items-center gap-1.5 cursor-pointer flex-shrink-0"
                  >
                    <span>Lanjut</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

        {/* BOTTOM STEPPER BAR */}
        <div className="h-14 flex-shrink-0 border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 px-4 sm:px-6 flex items-center justify-between z-10 shadow-xs">
          <button
            disabled={!prevLesson}
            onClick={() => prevLesson && onNavigateLesson(prevLesson.id)}
            className={`flex items-center gap-2 text-xs sm:text-sm font-bold transition-all px-3 py-1.5 rounded-lg ${
              prevLesson 
                ? 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer' 
                : 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Sebelumnya</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <span>Pelajaran {currentIndex + 1} dari {allLessons.length}</span>
          </div>

          <button
            disabled={!nextLesson}
            onClick={() => nextLesson && onNavigateLesson(nextLesson.id)}
            title={nextLesson ? `Lanjut ke: ${nextLesson.title}` : 'Semua pelajaran selesai'}
            className={`flex items-center gap-2 text-xs sm:text-sm font-bold transition-all px-3 sm:px-4 py-1.5 rounded-lg ${
              nextLesson 
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-600/30 cursor-pointer' 
                : 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
            }`}
          >
            <span>Berikutnya{nextLesson ? `: ${nextLesson.title}` : ''}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </main>

      {/* AI Tutor Assistant Modal */}
      <AiTutorModal 
        isOpen={isAiTutorOpen}
        onClose={() => setIsAiTutorOpen(false)}
        currentLesson={currentLesson}
        currentCode={currentHtml}
        currentCss={currentCss}
        currentJs={currentJs}
        currentPy={currentPy}
      />
    </div>
  );
};
