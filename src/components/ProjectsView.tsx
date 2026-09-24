import React, { useState, useEffect } from 'react';
import { 
  Rocket, 
  CheckCircle2, 
  Search, 
  Filter, 
  Code2, 
  Layers, 
  Sparkles, 
  Clock, 
  Trophy, 
  ChevronRight,
  Terminal,
  Zap,
  Globe,
  Database,
  Cpu,
  PanelLeftClose,
  PanelLeftOpen,
  FolderGit2
} from 'lucide-react';
import { UserProgress } from '../types';
import { CODERA_PROJECTS, ALL_CODERA_PROJECTS, ProjectItem, ProjectCategory } from '../data/projectsData';
import { ProjectWorkspace } from './ProjectWorkspace/ProjectWorkspace';
import { PublicProjectProgressDTO } from '../types/projectProgress';

export { CODERA_PROJECTS, ALL_CODERA_PROJECTS };
export type { ProjectItem };

interface ProjectsViewProps {
  userProgress?: UserProgress;
  initialProjectId?: string;
  onProjectCompleted?: (progress: PublicProjectProgressDTO) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  userProgress,
  initialProjectId,
  onProjectCompleted
}) => {
  // Published projects only - strictly filter out draft and archived projects
  const publishedProjects = (ALL_CODERA_PROJECTS || CODERA_PROJECTS).filter(p => p.status === 'published');

  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
    try {
      const val = localStorage.getItem('commandev_projects_sidebar') ?? localStorage.getItem('codera_projects_sidebar');
      return val !== 'false';
    } catch {
      return true;
    }
  });

  const [activeProject, setActiveProject] = useState<ProjectItem | undefined>(() => {
    if (initialProjectId) {
      const found = publishedProjects.find(p => p.id === initialProjectId);
      if (found) return found;
    }
    try {
      const savedId = localStorage.getItem('commandev_active_project_id') || localStorage.getItem('codera_active_project_id');
      if (savedId) {
        const found = publishedProjects.find(p => p.id === savedId);
        if (found) return found;
      }
    } catch {}
    return publishedProjects[0];
  });

  // Synchronize when initialProjectId changes externally
  useEffect(() => {
    if (initialProjectId) {
      const found = publishedProjects.find(p => p.id === initialProjectId);
      if (found) {
        setActiveProject(found);
      }
    }
  }, [initialProjectId]);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => {
      const next = !prev;
      try {
        localStorage.setItem('commandev_projects_sidebar', String(next));
        localStorage.setItem('codera_projects_sidebar', String(next));
      } catch {}
      return next;
    });
  };

  const handleSelectProject = (project: ProjectItem) => {
    if (project.status !== 'published') return;
    setActiveProject(project);
    try {
      localStorage.setItem('commandev_active_project_id', project.id);
      localStorage.setItem('codera_active_project_id', project.id);
    } catch {}
  };

  const handleNextProject = () => {
    if (!activeProject) return;
    const currentIndex = publishedProjects.findIndex(p => p.id === activeProject.id);
    if (currentIndex >= 0 && currentIndex < publishedProjects.length - 1) {
      handleSelectProject(publishedProjects[currentIndex + 1]);
    }
  };

  // Filter projects by category and search
  const filteredProjects = publishedProjects.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = !searchQuery.trim() || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const totalProjects = publishedProjects.length;

  const categories: { id: ProjectCategory; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'all', label: 'Semua', icon: Layers },
    { id: 'architecture', label: 'Arsitektur & Desain', icon: Code2 },
    { id: 'web', label: 'Web & UI', icon: Globe },
    { id: 'react', label: 'React', icon: Cpu },
    { id: 'python', label: 'Python', icon: Terminal },
    { id: 'backend', label: 'Backend', icon: Database },
    { id: 'fullstack', label: 'Fullstack', icon: Rocket }
  ];

  return (
    <div className="h-[calc(100vh-64px)] flex bg-[#070b14] text-slate-100 overflow-hidden font-sans">
      
      {/* 1. PROJECT EXPLORER SIDEBAR */}
      <aside className={`border-r border-slate-800 bg-[#070b14] flex flex-col flex-shrink-0 transition-all duration-200 z-30 ${
        isSidebarOpen ? 'w-80 lg:w-88' : 'w-0 hidden'
      }`}>
        
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-800/80 bg-[#0b0f19]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
                <Rocket className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-extrabold text-sm text-white tracking-tight">Proyek Portofolio</h2>
                <p className="text-[11px] text-slate-400">Proyek Mandiri & Capstone</p>
              </div>
            </div>

            <button
              onClick={toggleSidebar}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Tutup sidebar"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </div>

          {/* Catalog Tracker */}
          <div className="mt-3 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Katalog Kurikulum:</span>
            <span className="font-black text-indigo-400 flex items-center gap-1">
              <Code2 className="w-3.5 h-3.5 text-indigo-400" />
              {totalProjects} Proyek Tersedia
            </span>
          </div>

          {/* Search Box */}
          <div className="relative mt-3">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari proyek atau topik..."
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-8.5 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pt-3">
            {categories.map(cat => {
              const Icon = cat.icon;
              const isCatActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap flex items-center gap-1 transition-all cursor-pointer ${
                    isCatActive 
                      ? 'bg-indigo-600 text-white shadow-xs' 
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
          {filteredProjects.length === 0 ? (
            <div className="p-6 text-center text-slate-500 text-xs">
              Tidak ada proyek yang sesuai dengan kriteria filter.
            </div>
          ) : (
            filteredProjects.map(proj => {
              const isSelected = activeProject?.id === proj.id;

              return (
                <div
                  key={proj.id}
                  onClick={() => handleSelectProject(proj)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left relative overflow-hidden ${
                    isSelected
                      ? 'bg-indigo-950/40 border-indigo-500/70 text-white shadow-md shadow-indigo-950/50'
                      : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/70 text-slate-300'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500" />
                  )}

                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="font-bold text-xs leading-snug">
                      {proj.title}
                    </span>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {userProgress?.completedProjects?.includes(proj.id) && (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          <span>Selesai</span>
                        </span>
                      )}
                      <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                        {proj.difficulty}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-2.5">
                    {proj.description}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-indigo-300 font-bold uppercase tracking-wider">
                        {proj.category}
                      </span>
                      <span>•</span>
                      <span>{proj.estTime}</span>
                    </div>

                    <span className="text-amber-400/90 font-bold">
                      {proj.xp} XP
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </aside>

      {/* 2. ACTIVE INTERACTIVE PROJECT WORKSPACE */}
      <main className="flex-1 flex flex-col h-full min-w-0 overflow-hidden relative">
        {activeProject ? (
          <ProjectWorkspace 
            key={activeProject.id}
            project={activeProject}
            onNextProject={handleNextProject}
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={toggleSidebar}
            onProjectCompleted={onProjectCompleted}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-500">
            <p>Tidak ada proyek yang tersedia.</p>
          </div>
        )}
      </main>

    </div>
  );
};
