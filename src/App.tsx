import React, { useState, useEffect } from 'react';
import { UserProgress, Course } from './types';
import { COURSES } from './data/curriculum';
import { curriculumService } from './services/curriculum';
import { CodingAcademyLanding } from './components/LandingPage';
import { AboutUsView } from './components/AboutUsView';
import { Academy } from './components/Academy';
import { PlaygroundView } from './components/PlaygroundView';
import { PracticeView } from './components/PracticeView';
import { ProjectsView } from './components/ProjectsView';
import { DashboardView } from './components/DashboardView';
import { ProfileView } from './components/ProfileView';
import { LeaderboardView } from './components/LeaderboardView';
import { DebuggingLabView } from './components/DebuggingLabView';
import { FlashcardsView } from './components/FlashcardsView';
import { AdminCmsView } from './components/AdminCmsView';
import { SettingsView } from './components/SettingsView';
import { DocsView } from './components/DocsView';
import { ChangelogView } from './components/ChangelogView';
import { LearningStudio } from './components/LearningStudio';
import { AiTutorModal } from './components/AiTutorModal';
import { SecurityLabView } from './components/SecurityLabView';
import { RoadmapView } from './components/RoadmapView';
import { AdminLoginView } from './components/AdminLoginView';
import { AdminDashboardLayout } from './components/AdminDashboardLayout';
import { AppLayout, Section } from './components/AppLayout';
import { Loader2, Terminal, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useAuth } from './lib/AuthContext';
import { getUserProgress, updateUserProgress } from './lib/db';
import { SettingsProvider } from './lib/SettingsContext';
import { PublicProjectProgressDTO } from './types/projectProgress';
import { analyticsService } from './services/analytics';

type AppState = 'landing' | 'app' | 'studio' | 'admin-login' | 'admin-dashboard' | 'about-us';

export default function App() {
  const { user, userRole, loading, logout, signInWithGoogle, signInWithEmail, signUpWithEmail, loginAsOwner, loginAsGuest, authError, clearAuthError } = useAuth();
  
  const [showAuthModal, setShowAuthModal] = useState(false);
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
      setShowAuthModal(false);
      setAppState('app');
      setCurrentSection('dashboard');
    } catch (err: any) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      setShowAuthModal(false);
      setAppState('app');
      setCurrentSection('dashboard');
    } catch (e) {}
  };

  const handleGuestLogin = () => {
    loginAsGuest();
    setShowAuthModal(false);
    setAppState('app');
    setCurrentSection('dashboard');
  };
  
  // Dynamic helper for initial UID detection before auth state finishes loading
  const getInitialUid = (): string | null => {
    try {
      const saved = localStorage.getItem('commandev_custom_user') || localStorage.getItem('codera_custom_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.uid || null;
      }
    } catch {}
    return null;
  };

  // Persistent local progress fallback (Namespaced by authenticated identity)
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    try {
      const uid = getInitialUid();
      const key = uid ? `devmaster_user_progress_${uid}` : 'devmaster_user_progress_demo';
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.completedLessons?.includes('les-0-2-2')) {
          parsed.completedLessons = [...(parsed.completedLessons || []), 'les-0-1-2', 'les-0-1-3', 'les-0-2-1', 'les-0-2-2'];
          parsed.xp = Math.max(parsed.xp || 0, 160);
        }
        return parsed;
      }
    } catch {}
    return {
      xp: 160,
      streak: 1,
      completedLessons: ['les-0-1-1', 'les-0-1-2', 'les-0-1-3', 'les-0-2-1', 'les-0-2-2'],
      courseProgress: { 'html-mastery': 65 }
    };
  });

  const [activeCourseId, setActiveCourseId] = useState<string | null>(() => {
    const uid = getInitialUid();
    const key = uid ? `devmaster_active_course_${uid}` : 'devmaster_active_course_demo';
    return localStorage.getItem(key) || 'html-mastery';
  });

  const [activeLessonId, setActiveLessonId] = useState<string | null>(() => {
    const uid = getInitialUid();
    const key = uid ? `devmaster_active_lesson_${uid}` : 'devmaster_active_lesson_demo';
    const saved = localStorage.getItem(key);
    if (!saved || saved === 'les-0-1-1' || saved === 'les-0-1-2' || saved === 'les-0-1-3' || saved === 'les-0-2-1' || saved === 'les-0-2-2') {
      return 'les-1-1-1'; // Level 1: Heading & Paragraph
    }
    return saved;
  });

  // URL route helper for direct paths like /docs or #docs
  const parseUrlRoute = (): { appState: AppState; section: Section } => {
    try {
      const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
      const hash = window.location.hash.replace(/^#+/, '').toLowerCase();
      const target = hash || path;

      const validSections: Section[] = [
        'academy', 'roadmap', 'playground', 'practice', 'security-labs', 'projects', 
        'doctor', 'flashcards', 'docs', 'dashboard', 'profile', 'leaderboard', 'cms', 'settings', 'changelog'
      ];

      if (path === 'admin/login' || target === 'admin/login') {
        return { appState: 'admin-login', section: 'cms' };
      }

      if (target === 'about' || target === 'about-us' || target === 'aboutus') {
        return { appState: 'about-us', section: 'academy' };
      }

      if (path === 'admin' || path === 'cms' || target === 'admin' || target === 'cms') {
        return { appState: 'admin-dashboard', section: 'cms' };
      }

      if (target === 'roadmap' || target.startsWith('roadmap') || target === 'pathway' || target === 'pathways') {
        return { appState: 'app', section: 'roadmap' };
      }
      if (target === 'docs' || target.startsWith('docs')) {
        return { appState: 'app', section: 'docs' };
      }
      if (target === 'debug' || target.startsWith('debug') || target === 'doctor') {
        return { appState: 'app', section: 'doctor' };
      }
      if (target === 'audit' || target.startsWith('audit') || target === 'security-audit' || target === 'readiness-gate') {
        return { appState: 'app', section: 'security-labs' };
      }
      if (target === 'security-labs' || target === 'security') {
        return { appState: 'app', section: 'security-labs' };
      }
      if (validSections.includes(target as Section)) {
        return { appState: 'app', section: target as Section };
      }
      if (target === 'studio' || target === 'editor') {
        return { appState: 'studio', section: 'academy' };
      }
    } catch {}

    const savedSection = (localStorage.getItem('commandev_current_section') as Section) || (localStorage.getItem('codera_current_section') as Section) || 'academy';
    const savedAppState = localStorage.getItem('devmaster_app_state') === 'dashboard' ? 'app' : ((localStorage.getItem('devmaster_app_state') as AppState) || 'studio');

    return { appState: savedAppState, section: savedSection };
  };

  const initialRoute = parseUrlRoute();

  const [appState, setAppState] = useState<AppState>(() => initialRoute.appState);

  const [currentSection, setCurrentSection] = useState<Section>(() => initialRoute.section);

  const [playgroundInitial, setPlaygroundInitial] = useState<{ code: string; language: 'web' | 'python' | 'git' } | null>(null);
  const [securityLabInitialTab, setSecurityLabInitialTab] = useState<'labs' | 'threat-model' | 'readiness-gate' | 'lifecycle'>(() => {
    try {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      if (hash.includes('audit') || path.includes('audit') || hash.includes('readiness') || path.includes('readiness')) {
        return 'readiness-gate';
      }
    } catch {}
    return 'labs';
  });

  const [globalAiOpen, setGlobalAiOpen] = useState(false);
  const [progressLoading, setProgressLoading] = useState(true);
  const [coursesList, setCoursesList] = useState<Course[]>(COURSES);

  // Synchronize dynamic courses from CurriculumService (Firestore-first with static fallback)
  useEffect(() => {
    curriculumService.getCourses().then((resolved) => {
      if (resolved && resolved.length > 0) {
        setCoursesList(resolved);
      }
    }).catch((err) => {
      console.warn('CurriculumService fallback to static courses:', err);
    });
  }, []);

  // Sync browser URL with current section
  useEffect(() => {
    if (appState === 'app') {
      const targetHash = `#${currentSection}`;
      if (window.location.hash !== targetHash) {
        window.history.replaceState(null, '', targetHash);
      }
    } else if (appState === 'about-us') {
      if (window.location.hash !== '#about-us') {
        window.history.replaceState(null, '', '#about-us');
      }
    }
  }, [appState, currentSection]);

  // Listen for browser forward/back or hash changes
  useEffect(() => {
    const handleUrlChange = () => {
      const { appState: nextAppState, section: nextSection } = parseUrlRoute();
      setAppState(nextAppState);
      setCurrentSection(nextSection);

      try {
        const hash = window.location.hash.toLowerCase();
        const path = window.location.pathname.toLowerCase();
        if (hash.includes('audit') || path.includes('audit') || hash.includes('readiness') || path.includes('readiness')) {
          setSecurityLabInitialTab('readiness-gate');
        }
      } catch {}
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  // Persist state changes to localStorage (Namespaced by authenticated identity)
  useEffect(() => {
    if (activeLessonId) {
      const key = user ? `devmaster_active_lesson_${user.uid}` : 'devmaster_active_lesson_demo';
      localStorage.setItem(key, activeLessonId);
    }
  }, [activeLessonId, user]);

  useEffect(() => {
    if (activeCourseId) {
      const key = user ? `devmaster_active_course_${user.uid}` : 'devmaster_active_course_demo';
      localStorage.setItem(key, activeCourseId);
    }
  }, [activeCourseId, user]);

  useEffect(() => {
    localStorage.setItem('devmaster_app_state', appState);
  }, [appState]);

  useEffect(() => {
    localStorage.setItem('commandev_current_section', currentSection);
    localStorage.setItem('codera_current_section', currentSection);
  }, [currentSection]);

  // Sync state based on user auth
  useEffect(() => {
    if (user) {
      setProgressLoading(true);

      // Load user-specific active course and lesson if they exist
      const userActiveCourse = localStorage.getItem(`devmaster_active_course_${user.uid}`);
      if (userActiveCourse) setActiveCourseId(userActiveCourse);

      const userActiveLesson = localStorage.getItem(`devmaster_active_lesson_${user.uid}`);
      if (userActiveLesson) setActiveLessonId(userActiveLesson);

      getUserProgress(user.uid).then((progress) => {
        setUserProgress({
          xp: progress.xp || 20,
          streak: progress.streak || 1,
          completedLessons: progress.completedLessons && progress.completedLessons.length > 0 
            ? progress.completedLessons 
            : ['les-0-1-1'],
          courseProgress: progress.courseProgress || {},
          completedProjects: progress.completedProjects || []
        });
        setProgressLoading(false);
      });
    } else {
      // Load guest/demo states
      const demoActiveCourse = localStorage.getItem('devmaster_active_course_demo') || 'html-mastery';
      setActiveCourseId(demoActiveCourse);

      const demoActiveLesson = localStorage.getItem('devmaster_active_lesson_demo') || 'les-1-1-1';
      setActiveLessonId(demoActiveLesson);

      try {
        const saved = localStorage.getItem('devmaster_user_progress_demo');
        if (saved) {
          setUserProgress(JSON.parse(saved));
        } else {
          setUserProgress({
            xp: 160,
            streak: 1,
            completedLessons: ['les-0-1-1', 'les-0-1-2', 'les-0-1-3', 'les-0-2-1', 'les-0-2-2'],
            courseProgress: { 'html-mastery': 65 }
          });
        }
      } catch {
        setUserProgress({
          xp: 160,
          streak: 1,
          completedLessons: ['les-0-1-1', 'les-0-1-2', 'les-0-1-3', 'les-0-2-1', 'les-0-2-2'],
          courseProgress: { 'html-mastery': 65 }
        });
      }
      setProgressLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (appState === 'app' && !user) {
      setAppState('landing');
      setShowAuthModal(true);
    } else if (appState === 'admin-dashboard' && userRole !== 'owner') {
      setAppState('admin-login');
      if (window.location.pathname !== '/admin/login' && window.location.hash !== '#admin/login') {
        window.history.replaceState(null, '', '/admin/login');
      }
    }
  }, [appState, user, userRole]);

  const handleStartLearning = () => {
    if (user) {
      handleOpenCourse('html-mastery');
    } else {
      setShowAuthModal(true);
    }
  };

  const handleOpenCourse = (courseId: string) => {
    setActiveCourseId(courseId);
    
    // Auto-select first lesson if none selected, or the next uncompleted lesson
    const course = coursesList.find(c => c.id === courseId) || COURSES.find(c => c.id === courseId);
    if (course) {
      let foundNext = false;
      for (const level of course.levels) {
        for (const mod of level.modules) {
          for (const lesson of mod.lessons) {
             if (!userProgress.completedLessons.includes(lesson.id)) {
               setActiveLessonId(lesson.id);
               foundNext = true;
               break;
             }
          }
          if (foundNext) break;
        }
        if (foundNext) break;
      }
      // if all completed, go to first
      if (!foundNext && course.levels[0]?.modules[0]?.lessons[0]) {
        setActiveLessonId(course.levels[0].modules[0].lessons[0].id);
      }
    }
    
    // Observational Telemetry (Non-blocking)
    analyticsService.trackCourseStarted(courseId, course?.title);
    setAppState('studio');
  };

  const handleCompleteLesson = (lessonId: string, xpGained: number) => {
    // 1. Authoritative State Mutation (Source of Truth)
    setUserProgress(prev => {
      const newProgress = {
        ...prev,
        xp: prev.xp + xpGained,
        completedLessons: [...new Set([...prev.completedLessons, lessonId])]
      };
      try {
        const key = user ? `devmaster_user_progress_${user.uid}` : 'devmaster_user_progress_demo';
        localStorage.setItem(key, JSON.stringify(newProgress));
      } catch {}
      return newProgress;
    });

    // 2. Observational Telemetry (Non-blocking: failure never breaks learning)
    try {
      analyticsService.trackLessonCompleted(activeCourseId || 'unknown', lessonId, xpGained);
    } catch {
      // Non-blocking
    }
  };

  const handleProjectCompleted = (progress: PublicProjectProgressDTO) => {
    // 1. Authoritative State Mutation (Source of Truth)
    setUserProgress(prev => {
      const currentCompleted = prev.completedProjects || [];
      const updatedCompleted = Array.from(new Set([...currentCompleted, progress.projectId]));
      const newXp = prev.xp + (progress.xpAwarded || 0);
      const newProgress: UserProgress = {
        ...prev,
        xp: newXp,
        completedProjects: updatedCompleted
      };
      try {
        const key = user ? `devmaster_user_progress_${user.uid}` : 'devmaster_user_progress_demo';
        localStorage.setItem(key, JSON.stringify(newProgress));
      } catch {}
      return newProgress;
    });

    // 2. Observational Telemetry (Non-blocking)
    try {
      analyticsService.trackProjectEvaluated(
        progress.projectId,
        progress.submissionId || 'sub-authoritative',
        progress.score ?? 100,
        progress.completed
      );
    } catch {
      // Non-blocking
    }
  };

  // Sync user identification to analytics service
  useEffect(() => {
    analyticsService.setUserId(user?.uid);
  }, [user]);

  // Sync userProgress to Firestore whenever it changes and user is authenticated
  useEffect(() => {
    if (user && !progressLoading) {
      updateUserProgress(user.uid, userProgress);
    }
  }, [userProgress, user, progressLoading]);

  if (loading || progressLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center text-indigo-600">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <div className="font-bold tracking-tight">Memuat sesi Anda...</div>
      </div>
    );
  }

  // Render the current section in the AppLayout
  const renderSection = () => {
    switch (currentSection) {
      case 'academy':
        return (
          <Academy 
            userProgress={userProgress} 
            courses={coursesList}
            onOpenCourse={handleOpenCourse} 
            onOpenAiTutor={() => setGlobalAiOpen(true)}
          />
        );
      case 'roadmap':
        return (
          <RoadmapView 
            userProgress={userProgress}
            courses={coursesList}
            onSelectCourse={(courseId) => handleOpenCourse(courseId)}
            onNavigateTab={setCurrentSection}
          />
        );
      case 'playground':
        return (
          <PlaygroundView 
            initialCode={playgroundInitial?.code}
            initialLanguage={playgroundInitial?.language}
          />
        );
      case 'security-labs':
        return (
          <SecurityLabView
            userProgress={userProgress}
            onRewardXp={(xp, labId) => handleCompleteLesson(labId, xp)}
            initialTab={securityLabInitialTab}
          />
        );
      case 'practice':
        return (
          <PracticeView 
            userProgress={userProgress}
            onRewardXp={(xp, challengeId) => handleCompleteLesson(challengeId, xp)}
          />
        );
      case 'doctor':
        return (
          <DebuggingLabView 
            userProgress={userProgress}
            onRewardXp={(xp, bugId) => handleCompleteLesson(bugId, xp)}
          />
        );
      case 'flashcards':
        return (
          <FlashcardsView 
            userProgress={userProgress}
            onRewardXp={(xp, cardId) => handleCompleteLesson(cardId, xp)}
          />
        );
      case 'projects':
        return (
          <ProjectsView 
            userProgress={userProgress}
            onProjectCompleted={handleProjectCompleted}
          />
        );
      case 'docs':
        return (
          <DocsView 
            onOpenPlaygroundWithCode={(code, lang) => {
              setPlaygroundInitial({ code, language: lang });
              setCurrentSection('playground');
            }}
          />
        );
      case 'leaderboard':
        return (
          <LeaderboardView 
            userProgress={userProgress} 
            onNavigateToPlayground={() => setCurrentSection('playground')}
          />
        );
      case 'cms':
        return (
          <AdminCmsView 
            onTryChallenge={(chal) => {
              setCurrentSection('practice');
            }} 
          />
        );
      case 'settings':
        return <SettingsView />;
      case 'changelog':
        return <ChangelogView onNavigate={setCurrentSection} />;
      case 'dashboard':
        return (
          <DashboardView 
            userProgress={userProgress}
            courses={coursesList}
            activeCourseId={activeCourseId || undefined}
            onSelectCourse={(course) => handleOpenCourse(course.id)}
            onNavigateTab={setCurrentSection}
          />
        );
      case 'profile':
        return (
          <ProfileView 
            userProgress={userProgress}
            courses={coursesList}
            onResetProgress={() => {
              const reset = {
                xp: 0,
                streak: 1,
                completedLessons: [],
                courseProgress: {}
              };
              setUserProgress(reset);
              const key = user ? `devmaster_user_progress_${user.uid}` : 'devmaster_user_progress_demo';
              localStorage.setItem(key, JSON.stringify(reset));
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100">
      <AnimatePresence mode="wait">
        {appState === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <CodingAcademyLanding 
              onStartLearning={handleStartLearning} 
              onOpenAuth={() => setShowAuthModal(true)} 
              onViewAboutUs={() => setAppState('about-us')}
            />
          </motion.div>
        )}

        {appState === 'about-us' && (
          <motion.div
            key="about-us"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="min-h-screen w-full"
          >
            <AboutUsView 
              onBack={() => {
                window.history.pushState({}, '', '/');
                setAppState('landing');
              }}
            />
          </motion.div>
        )}

        {appState === 'admin-login' && (
          <motion.div
            key="admin-login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="min-h-screen w-full"
          >
            <AdminLoginView
              onBackToHome={() => {
                window.history.pushState({}, '', '/');
                setAppState('landing');
              }}
              onLoginSuccess={() => {
                window.history.pushState({}, '', '/admin');
                setAppState('admin-dashboard');
              }}
            />
          </motion.div>
        )}

        {appState === 'admin-dashboard' && (
          <motion.div
            key="admin-dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="min-h-screen w-full"
          >
            <AdminDashboardLayout
              onGoToLogin={() => {
                window.history.pushState({}, '', '/admin/login');
                setAppState('admin-login');
              }}
              onViewSite={() => {
                window.history.pushState({}, '', '/');
                setAppState('app');
                setCurrentSection('dashboard');
              }}
              onLogout={() => {
                logout();
                window.history.pushState({}, '', '/admin/login');
                setAppState('admin-login');
              }}
            />
          </motion.div>
        )}
        
        {appState === 'app' && (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-screen w-full"
          >
            <AppLayout
              currentSection={currentSection}
              onNavigate={setCurrentSection}
              userProgress={userProgress}
              onLogout={logout}
              onOpenAiTutor={() => setGlobalAiOpen(true)}
              onReturnToLanding={() => setAppState('landing')}
            >
              {renderSection()}
            </AppLayout>
          </motion.div>
        )}

        {appState === 'studio' && activeCourseId && activeLessonId && (
          <motion.div
            key="studio"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-screen flex flex-col overflow-hidden"
          >
            {/* Navbar for Studio */}
            <nav className="fixed top-0 w-full z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
              <div className="px-4 md:px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2.5 font-extrabold text-lg tracking-tight cursor-pointer group" onClick={() => setAppState('app')}>
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span>COMMANDEV</span>
                    <span className="text-[10px] text-slate-400 font-mono hidden md:inline ml-1">/ Studio</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm font-bold">
                  <button 
                    onClick={() => setGlobalAiOpen(true)} 
                    className="px-3 py-1.5 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-500/30 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Bantuan AI</span>
                  </button>

                  <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 px-3 py-1.5 rounded-full border border-amber-200 dark:border-amber-500/30">
                    <span className="font-black">{userProgress.xp}</span> XP
                  </div>

                  <button 
                    onClick={() => setAppState('app')}
                    className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  >
                    Tutup Studio
                  </button>
                </div>
              </div>
            </nav>
            <div className="pt-16 h-full flex-1">
              <LearningStudio 
                course={coursesList.find(c => c.id === activeCourseId) || COURSES.find(c => c.id === activeCourseId)!}
                activeLessonId={activeLessonId}
                onNavigateLesson={setActiveLessonId}
                onCompleteLesson={handleCompleteLesson}
                completedLessons={userProgress.completedLessons}
                onBackToDashboard={() => setAppState('app')}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global AI Assistant Modal */}
      <AiTutorModal 
        isOpen={globalAiOpen}
        onClose={() => setGlobalAiOpen(false)}
        currentLesson={null}
      />

      {/* Auth Modal (Triggered when clicking Mulai Belajar / Masuk on Landing Page) */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl space-y-6 relative text-white"
          >
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center space-y-2">
              <div className="inline-flex p-3 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 mb-1">
                <Terminal className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-black text-white">Autentikasi COMMANDEV</h2>
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
                Masuk
              </button>
              <button
                onClick={() => { setAuthMode('signup'); clearAuthError(); }}
                className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  authMode === 'signup' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Daftar
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
                    onClick={handleGoogleLogin}
                    className="py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 text-xs font-bold border border-slate-800 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Google Auth</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleGuestLogin}
                    className="py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 text-xs font-bold border border-slate-800 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Mode Demo</span>
                  </button>
                </div>
              </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

