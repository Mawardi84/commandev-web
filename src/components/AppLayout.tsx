import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Terminal, 
  Code2, 
  Rocket, 
  Sparkles, 
  LayoutDashboard, 
  User,
  Menu,
  X,
  LogOut,
  ChevronRight,
  Trophy,
  Layers,
  Sliders,
  FileText,
  Stethoscope,
  Brain,
  PanelLeftClose,
  PanelLeftOpen,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProgress } from '../types';
import { getRankTitle } from '../lib/db';
import { PWAInstallButton } from './PWAInstallButton';
import { OfflineIndicator } from './OfflineIndicator';

export type Section = 'academy' | 'roadmap' | 'playground' | 'practice' | 'security-labs' | 'projects' | 'doctor' | 'flashcards' | 'docs' | 'dashboard' | 'profile' | 'leaderboard' | 'cms' | 'settings' | 'changelog';

interface AppLayoutProps {
  currentSection: Section;
  onNavigate: (section: Section) => void;
  userProgress: UserProgress;
  onLogout: () => void;
  onOpenAiTutor: () => void;
  onReturnToLanding?: () => void;
  children: React.ReactNode;
}

interface NavGroup {
  groupTitle: string;
  items: {
    id: Section;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }[];
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  currentSection,
  onNavigate,
  userProgress,
  onLogout,
  onOpenAiTutor,
  onReturnToLanding,
  children
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    try {
      return (localStorage.getItem('commandev_sidebar_collapsed') || localStorage.getItem('codera_sidebar_collapsed')) === 'true';
    } catch {
      return false;
    }
  });

  const toggleSidebarCollapse = () => {
    setIsCollapsed(prev => {
      const next = !prev;
      try {
        localStorage.setItem('commandev_sidebar_collapsed', String(next));
        localStorage.setItem('codera_sidebar_collapsed', String(next));
      } catch {}
      return next;
    });
  };

  const navGroups: NavGroup[] = [
    {
      groupTitle: 'Pembelajaran',
      items: [
        { id: 'academy', label: 'Akademi Kurikulum', icon: BookOpen },
        { id: 'roadmap', label: 'Roadmap Karir', icon: Compass },
        { id: 'dashboard', label: 'Dashboard Belajar', icon: LayoutDashboard },
      ]
    },
    {
      groupTitle: 'Lab & Praktik',
      items: [
        { id: 'playground', label: 'Code Playground', icon: Terminal, badge: 'RUN' },
        { id: 'practice', label: 'Latihan & Tantangan', icon: Code2 },
        { id: 'doctor', label: 'Code Doctor', icon: Stethoscope, badge: 'DEBUG' },
        { id: 'security-labs', label: 'Security Labs', icon: ShieldCheck, badge: 'SEC' },
        { id: 'flashcards', label: 'Flashcards Drill', icon: Brain, badge: 'SM-2' },
        { id: 'projects', label: 'Proyek Portofolio', icon: Rocket },
      ]
    },
    {
      groupTitle: 'Eksplorasi & Ref',
      items: [
        { id: 'docs', label: 'Dokumentasi & Docs', icon: FileText },
        { id: 'leaderboard', label: 'Leaderboard & Rank', icon: Trophy },
        { id: 'cms', label: 'Lab & Custom CMS', icon: Layers },
      ]
    },
    {
      groupTitle: 'Akun & Sistem',
      items: [
        { id: 'profile', label: 'Profil Pengguna', icon: User },
        { id: 'settings', label: 'Pengaturan Editor', icon: Sliders },
      ]
    }
  ];

  const currentLevel = Math.floor(userProgress.xp / 100) + 1;
  const userRankTitle = getRankTitle(userProgress.xp);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex relative">
      {/* Offline Status Toast */}
      <OfflineIndicator />

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50 transform transition-all duration-300 ease-in-out flex flex-col shadow-sm lg:shadow-none ${
          mobileMenuOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-20' : 'lg:w-68'}`}
      >
        
        {/* Brand & Toggle Header */}
        <div className={`h-16 flex items-center border-b border-slate-200/80 dark:border-slate-800/80 ${isCollapsed ? 'justify-center px-2' : 'justify-between px-5'}`}>
          {isCollapsed ? (
            <button 
              onClick={toggleSidebarCollapse}
              className="w-10 h-10 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center justify-center transition-all cursor-pointer group shadow-2xs hover:scale-105"
              title="Perluas Sidebar (Expand)"
              aria-label="Perluas Sidebar"
            >
              <PanelLeftOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          ) : (
            <>
              <div 
                onClick={onReturnToLanding}
                className="flex items-center gap-3 overflow-hidden cursor-pointer group"
                title="Kembali ke Beranda / Hero Section"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-xs shadow-indigo-500/30 flex-shrink-0">
                  <Terminal className="w-5 h-5" />
                </div>

                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-lg tracking-tight leading-none text-slate-900 dark:text-white">
                      COMMANDEV
                    </span>
                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300">
                      PRO
                    </span>
                  </div>
                  <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 tracking-wide uppercase truncate mt-0.5">
                    Interactive Academy
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <PWAInstallButton compact={true} />
                
                {/* Desktop Sidebar Toggle Button */}
                <button 
                  onClick={toggleSidebarCollapse}
                  className="hidden lg:flex p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer hover:scale-105"
                  title="Kecilkan Sidebar (Collapse)"
                  aria-label="Kecilkan Sidebar"
                >
                  <PanelLeftClose className="w-4.5 h-4.5" />
                </button>

                {/* Mobile Close Button */}
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 lg:hidden text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Navigation Links */}
        <nav className={`flex-1 overflow-y-auto py-3 space-y-4 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800 ${isCollapsed ? 'px-2' : 'px-3'}`}>
          {navGroups.map((group, groupIdx) => (
            <div key={group.groupTitle} className="space-y-1">
              {/* Group Heading */}
              {!isCollapsed ? (
                <div className="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center justify-between">
                  <span>{group.groupTitle}</span>
                </div>
              ) : groupIdx > 0 ? (
                <div className="h-px bg-slate-200/80 dark:bg-slate-800/80 my-2 mx-1.5" />
              ) : null}

              {/* Items */}
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentSection === item.id;
                  
                  return (
                    <div key={item.id} className="relative group">
                      <button
                        onClick={() => {
                          onNavigate(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full relative flex items-center rounded-xl transition-all duration-200 ease-out cursor-pointer ${
                          isCollapsed 
                            ? 'justify-center p-2.5' 
                            : 'gap-2.5 px-3 py-2 text-[13px]'
                        } ${
                          isActive 
                            ? 'bg-indigo-50/90 dark:bg-indigo-500/10 text-indigo-900 dark:text-indigo-200 font-semibold shadow-2xs border border-indigo-200/70 dark:border-indigo-500/20' 
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/70 hover:translate-x-0.5'
                        }`}
                      >
                        {/* Neon Vertical Indicator Pill */}
                        {!isCollapsed && (
                          <div 
                            className={`absolute left-0 top-1/2 -translate-y-1/2 rounded-r-full transition-all duration-200 ${
                              isActive
                                ? 'w-1 h-5 bg-gradient-to-b from-indigo-500 to-violet-600 shadow-[0_0_8px_rgba(99,102,241,0.6)]'
                                : 'w-0.5 h-0 bg-transparent group-hover:h-3 group-hover:bg-indigo-400/70'
                            }`}
                          />
                        )}

                        {/* Icon Container with Micro-Animation */}
                        <div 
                          className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                            isActive
                              ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-xs shadow-indigo-500/30'
                              : 'bg-slate-100/70 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 group-hover:bg-indigo-100/80 dark:group-hover:bg-indigo-950/60 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:scale-105'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>

                        {/* Label & Badges */}
                        {!isCollapsed && (
                          <>
                            <span className="truncate tracking-tight flex-1 text-left">
                              {item.label}
                            </span>

                            {item.badge && (
                              <span 
                                className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-md tracking-wider transition-all duration-200 ${
                                  isActive
                                    ? 'bg-indigo-200/80 dark:bg-indigo-900/80 text-indigo-800 dark:text-indigo-200'
                                    : 'bg-slate-100 dark:bg-slate-800/90 text-slate-400 dark:text-slate-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-950/80 group-hover:text-indigo-600 dark:group-hover:text-indigo-300'
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}

                            {/* Active or Hover Chevron */}
                            <ChevronRight 
                              className={`w-3.5 h-3.5 flex-shrink-0 transition-all duration-200 ${
                                isActive 
                                  ? 'text-indigo-600 dark:text-indigo-400 opacity-100' 
                                  : 'text-slate-400 dark:text-slate-500 opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0'
                              }`} 
                            />
                          </>
                        )}
                      </button>

                      {/* Tooltip for Collapsed Sidebar */}
                      {isCollapsed && (
                        <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-slate-900 dark:bg-slate-800 text-white text-[12px] font-medium rounded-lg shadow-xl whitespace-nowrap pointer-events-none opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 z-50 flex items-center gap-1.5 border border-slate-700/50">
                          <span>{item.label}</span>
                          {item.badge && (
                            <span className="text-[9px] font-black uppercase px-1 rounded bg-indigo-500/30 text-indigo-300">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* AI Tutor Callout & PWA */}
          <div className={`pt-3 border-t border-slate-200/80 dark:border-slate-800/80 space-y-2 ${isCollapsed ? 'px-0' : ''}`}>
            <div className="relative group">
              <button
                onClick={onOpenAiTutor}
                className={`w-full relative overflow-hidden flex items-center rounded-xl font-semibold bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-md shadow-indigo-500/25 hover:shadow-lg hover:shadow-indigo-500/35 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer ${
                  isCollapsed ? 'justify-center p-2.5' : 'gap-2.5 px-3 py-2.5 text-[13px]'
                }`}
              >
                {/* Shimmer Light Reflection on Hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0 shadow-2xs">
                  <Sparkles className="w-4 h-4 text-indigo-100 group-hover:scale-110 transition-transform" />
                </div>
                {!isCollapsed && (
                  <div className="flex items-center justify-between flex-1 truncate">
                    <span className="font-bold tracking-tight">AI Code Mentor</span>
                    <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full bg-white/20 text-white">
                      AI 2.5
                    </span>
                  </div>
                )}
              </button>

              {isCollapsed && (
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-slate-900 dark:bg-slate-800 text-white text-[12px] font-medium rounded-lg shadow-xl whitespace-nowrap pointer-events-none opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 z-50 flex items-center gap-1.5 border border-slate-700/50">
                  <span>AI Code Mentor</span>
                  <span className="text-[9px] font-bold px-1 bg-indigo-500 text-white rounded">PRO</span>
                </div>
              )}
            </div>

            {!isCollapsed && (
              <div className="px-1 pt-1">
                <PWAInstallButton />
              </div>
            )}
          </div>
        </nav>

        {/* User Stats Mini-Profile */}
        <div className={`border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/70 ${isCollapsed ? 'p-2.5' : 'p-3'}`}>
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-2.5'}`}>
            <div 
              onClick={() => onNavigate('profile')}
              className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 cursor-pointer shadow-xs hover:scale-105 hover:ring-2 hover:ring-indigo-400/50 transition-all"
              title={`${userRankTitle} (L${currentLevel}) - ${userProgress.xp} XP`}
            >
              L{currentLevel}
            </div>

            {!isCollapsed && (
              <>
                <div className="flex-1 overflow-hidden cursor-pointer" onClick={() => onNavigate('profile')}>
                  <div className="text-[13px] font-bold text-slate-900 dark:text-white truncate hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    {userRankTitle}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
                    {userProgress.xp} XP • {userProgress.streak} Hari Streak
                  </div>
                </div>
                <button 
                  onClick={onLogout}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer flex-shrink-0"
                  title="Keluar"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex-shrink-0">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              aria-label="Buka Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="ml-1 font-black text-lg tracking-tight">COMMANDEV</div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAiTutor}
              className="p-2 rounded-xl bg-indigo-600 text-white shadow-sm flex items-center justify-center"
              title="AI Tutor"
            >
              <Sparkles className="w-4 h-4" />
            </button>
            <PWAInstallButton compact={true} />
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

