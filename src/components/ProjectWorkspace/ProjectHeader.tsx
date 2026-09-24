import React from 'react';
import { 
  Rocket, 
  RotateCcw, 
  Save, 
  Play, 
  Check, 
  Code2, 
  Eye, 
  Columns, 
  Smartphone, 
  Tablet, 
  Monitor, 
  Sparkles, 
  PanelLeftClose, 
  PanelLeftOpen, 
  Trophy,
  Clock,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Send
} from 'lucide-react';
import { ProjectItem } from '../../data/projectsData';
import { PublicProjectEvaluationResult } from '../../types/projectEvaluation';
import { PublicProjectProgressDTO } from '../../types/projectProgress';

export type WorkspaceViewMode = 'split' | 'editor' | 'preview';
export type PreviewViewport = 'desktop' | 'tablet' | 'mobile';

interface ProjectHeaderProps {
  project: ProjectItem;
  viewMode: WorkspaceViewMode;
  onViewModeChange: (mode: WorkspaceViewMode) => void;
  previewViewport: PreviewViewport;
  onViewportChange: (viewport: PreviewViewport) => void;
  hasDraft: boolean;
  draftLastSaved: string | null;
  isSaving: boolean;
  onManualSave: () => void;
  onRequestReset: () => void;
  onVerifyProject: () => void;
  onSubmitProject?: () => void;
  latestEvaluation?: PublicProjectEvaluationResult | null;
  projectProgress?: PublicProjectProgressDTO | null;
  onOpenEvaluation?: () => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  project,
  viewMode,
  onViewModeChange,
  previewViewport,
  onViewportChange,
  hasDraft,
  draftLastSaved,
  isSaving,
  onManualSave,
  onRequestReset,
  onVerifyProject,
  onSubmitProject,
  latestEvaluation = null,
  projectProgress = null,
  onOpenEvaluation,
  isSidebarOpen,
  onToggleSidebar
}) => {
  const isWebCategory = project.category === 'web' || project.category === 'react' || project.category === 'fullstack';

  const getTypeBadgeStyle = (type: string) => {
    switch (type) {
      case 'guided':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'challenge':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'portfolio':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'capstone':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      default:
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
    }
  };

  return (
    <header className="bg-[#070b14] border-b border-slate-800 px-3.5 sm:px-5 py-2.5 flex flex-wrap items-center justify-between gap-3 text-left flex-shrink-0 z-20">
      
      {/* LEFT: Project Title, Meta, and Sidebar Toggle */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleSidebar}
          title={isSidebarOpen ? 'Sembunyikan daftar proyek' : 'Buka daftar proyek'}
          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer flex-shrink-0"
        >
          {isSidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getTypeBadgeStyle(project.type)}`}>
              {project.type}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
              {project.category}
            </span>
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
              • {project.difficulty} • {project.estTime}
            </span>
          </div>

          <h1 className="text-sm sm:text-base font-extrabold text-white truncate flex items-center gap-2">
            <span>{project.title}</span>
            <span className="text-xs text-amber-400 font-bold hidden md:inline">
              (+{project.xp} XP)
            </span>
          </h1>
        </div>
      </div>

      {/* RIGHT: Controls (View Layout, Viewport, Draft Actions, Verification CTA) */}
      <div className="flex items-center gap-2 flex-wrap">
        
        {/* Layout Mode Toggles (Desktop only) */}
        <div className="hidden lg:flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => onViewModeChange('split')}
            title="Tampilan Terbagi (Split View)"
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
              viewMode === 'split' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span className="text-[11px]">Split</span>
          </button>
          <button
            onClick={() => onViewModeChange('editor')}
            title="Fokus Editor Kode"
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
              viewMode === 'editor' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span className="text-[11px]">Editor</span>
          </button>
          <button
            onClick={() => onViewModeChange('preview')}
            title="Tampilan Penuh Preview / Konsol"
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
              viewMode === 'preview' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="text-[11px]">{isWebCategory ? 'Preview' : 'Output'}</span>
          </button>
        </div>

        {/* Viewport size switcher for web projects */}
        {isWebCategory && (
          <div className="hidden xl:flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => onViewportChange('desktop')}
              title="Resolusi Desktop (100%)"
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                previewViewport === 'desktop' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onViewportChange('tablet')}
              title="Resolusi Tablet (768px)"
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                previewViewport === 'tablet' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onViewportChange('mobile')}
              title="Resolusi Mobile (375px)"
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                previewViewport === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Draft Status & Manual Save */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onManualSave}
            title={hasDraft ? `Draft tersimpan otomatis (${draftLastSaved || 'Baru'})` : 'Simpan draft pengerjaan saat ini'}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-semibold transition-all cursor-pointer"
          >
            <Save className={`w-3.5 h-3.5 ${isSaving ? 'animate-pulse text-amber-400' : 'text-indigo-400'}`} />
            <span className="hidden sm:inline text-[11px]">
              {isSaving ? 'Menyimpan...' : hasDraft ? 'Draft Disimpan' : 'Simpan'}
            </span>
          </button>

          {/* Reset button */}
          <button
            onClick={onRequestReset}
            title="Reset kode proyek kembali ke starter awal"
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-900/60 text-xs font-semibold transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline ml-1 text-[11px]">Reset</span>
          </button>
        </div>

        {/* Verify Project */}
        <button
          onClick={onVerifyProject}
          title="Verifikasi seluruh kriteria kelulusan proyek secara lokal (Ctrl+Enter)"
          className="px-3 sm:px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-200 hover:text-white font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-98 transition-all cursor-pointer flex-shrink-0"
        >
          <Check className="w-3.5 h-3.5 stroke-[3] text-emerald-400" />
          <span>Verifikasi</span>
          <span className="hidden sm:inline text-[10px] font-mono px-1 py-0.2 bg-slate-800 rounded text-slate-400">
            Ctrl+↵
          </span>
        </button>

        {/* Authoritative Project Completion Badge (Phase 5D) */}
        {projectProgress?.completed && (
          <div 
            title="Proyek Selesai & Terverifikasi Server Otoritatif"
            className="px-2.5 sm:px-3 py-1.5 rounded-xl border border-emerald-500/40 bg-emerald-950/50 text-emerald-300 text-xs font-black flex items-center gap-1.5 shadow-sm shadow-emerald-950 flex-shrink-0"
          >
            <Trophy className="w-3.5 h-3.5 text-emerald-400" />
            <span>SELESAI</span>
          </div>
        )}

        {/* Latest Evaluation Status Pill */}
        {latestEvaluation && onOpenEvaluation && (
          <button
            onClick={onOpenEvaluation}
            title={`Hasil Evaluasi Server: ${latestEvaluation.score}/100 (${latestEvaluation.passed ? 'Lulus' : 'Perlu Perbaikan'}) - Klik untuk melihat rincian`}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer flex-shrink-0 ${
              latestEvaluation.passed
                ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-300 hover:bg-emerald-900/50 shadow-sm shadow-emerald-950'
                : 'bg-rose-950/40 border-rose-700/60 text-rose-300 hover:bg-rose-900/50 shadow-sm shadow-rose-950'
            }`}
          >
            {latestEvaluation.passed ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            )}
            <span>{latestEvaluation.score}/100</span>
            <span className="hidden md:inline text-[10px] font-semibold opacity-90">
              {latestEvaluation.passed ? 'Lulus' : 'Perbaikan'}
            </span>
          </button>
        )}

        {/* Primary CTA: Submit Project to Authoritative Server Evaluator */}
        {onSubmitProject && (
          <button
            onClick={onSubmitProject}
            title="Kirim kode proyek untuk evaluasi server otoritatif"
            className="px-3.5 sm:px-4 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/25 active:scale-98 transition-all cursor-pointer flex-shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{latestEvaluation ? 'Kirim Ulang' : 'Kirim Proyek'}</span>
          </button>
        )}

      </div>

    </header>
  );
};
