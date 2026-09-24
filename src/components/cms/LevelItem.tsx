import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  Layers, 
  Plus, 
  Edit2, 
  Trash2, 
  ChevronUp, 
  RefreshCw, 
  FolderPlus,
  AlertCircle
} from 'lucide-react';
import { CmsLevel, CmsModule, ContentStatus } from '../../services/curriculum/types';
import { cmsDataService } from '../../services/curriculum/cmsDataService';
import { ModuleItem } from './ModuleItem';
import { ModuleModal } from './Modals';

interface LevelItemProps {
  level: CmsLevel;
  courseId: string;
  onEdit: (level: CmsLevel) => void;
  onDelete: (levelId: string) => Promise<void>;
  onStatusChange: (levelId: string, status: ContentStatus) => Promise<void>;
  onReorder?: (levelId: string, newOrder: number) => Promise<void>;
  onNotify: (msg: { type: 'success' | 'error'; text: string }) => void;
}

export const LevelItem: React.FC<LevelItemProps> = ({
  level,
  courseId,
  onEdit,
  onDelete,
  onStatusChange,
  onReorder,
  onNotify
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [modules, setModules] = useState<CmsModule[]>([]);
  const [loadingModules, setLoadingModules] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);
  const [activeModuleModal, setActiveModuleModal] = useState<{
    mode: 'create' | 'edit';
    module?: CmsModule;
  } | null>(null);

  const statusColors = {
    draft: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    review: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    published: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    archived: 'bg-slate-700/30 text-slate-400 border-slate-700/50'
  }[level.status];

  const loadModules = async () => {
    setLoadingModules(true);
    try {
      const data = await cmsDataService.listModules(courseId, level.id);
      setModules(data);
    } catch (err: any) {
      console.error('Failed to load modules:', err);
      onNotify({ type: 'error', text: err.message || 'Gagal memuat daftar modul' });
    } finally {
      setLoadingModules(false);
    }
  };

  useEffect(() => {
    if (isExpanded) {
      loadModules();
    }
  }, [isExpanded]);

  const handleStatus = async (status: ContentStatus) => {
    setLoadingAction(true);
    try {
      await onStatusChange(level.id, status);
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDelete = async () => {
    if (modules.length > 0) {
      const confirmForce = confirm(
        `Level "${level.title}" masih memiliki ${modules.length} modul. Menghapus level akan memutus relasi modul ini. Lanjutkan hapus level?`
      );
      if (!confirmForce) return;
    } else {
      if (!confirm(`Hapus Level "${level.title}" (${level.id}) dari CMS?`)) return;
    }

    setLoadingAction(true);
    try {
      await onDelete(level.id);
    } finally {
      setLoadingAction(false);
    }
  };

  // Module Handlers
  const handleSaveModule = async (data: Partial<CmsModule>) => {
    try {
      if (activeModuleModal?.mode === 'create') {
        await cmsDataService.createModule(courseId, data);
        onNotify({ type: 'success', text: `Modul "${data.title}" berhasil dibuat.` });
      } else if (activeModuleModal?.mode === 'edit' && activeModuleModal.module) {
        await cmsDataService.updateModule(activeModuleModal.module.id, data);
        onNotify({ type: 'success', text: `Modul "${data.title}" berhasil diperbarui.` });
      }
      await loadModules();
      setActiveModuleModal(null);
    } catch (err: any) {
      throw err;
    }
  };

  const handleDeleteModule = async (moduleId: string) => {
    try {
      await cmsDataService.deleteModule(moduleId);
      onNotify({ type: 'success', text: `Modul ${moduleId} telah dihapus.` });
      await loadModules();
    } catch (err: any) {
      onNotify({ type: 'error', text: err.message || 'Gagal menghapus modul' });
    }
  };

  const handleModuleStatusChange = async (moduleId: string, newStatus: ContentStatus) => {
    try {
      await cmsDataService.updateModuleStatus(moduleId, newStatus);
      onNotify({ type: 'success', text: `Status modul diubah menjadi ${newStatus}.` });
      await loadModules();
    } catch (err: any) {
      onNotify({ type: 'error', text: err.message || 'Gagal mengubah status modul' });
    }
  };

  const handleModuleReorder = async (moduleId: string, newOrder: number) => {
    try {
      await cmsDataService.updateModule(moduleId, { order: newOrder });
      await loadModules();
    } catch (err: any) {
      onNotify({ type: 'error', text: err.message || 'Gagal mengubah urutan modul' });
    }
  };

  return (
    <div className="rounded-xl bg-slate-900/90 border border-slate-800 overflow-hidden text-xs transition-colors">
      {/* Level Header Row */}
      <div className="p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-900/60 hover:bg-slate-800/40">
        <div className="flex items-start md:items-center gap-2.5 min-w-0">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors shrink-0 mt-0.5 md:mt-0"
            title={isExpanded ? 'Tutup Level' : 'Buka Modul Level'}
          >
            {isExpanded ? <ChevronDown className="w-4 h-4 text-amber-400" /> : <ChevronRight className="w-4 h-4" />}
          </button>

          <Layers className="w-4 h-4 text-amber-400/80 shrink-0 mt-0.5 md:mt-0" />

          <div className="min-w-0 space-y-0.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-white text-sm truncate">{level.title}</span>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${statusColors}`}>
                {level.status}
              </span>
              <span className="text-[10px] text-slate-500">v{level.version}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-mono">
                Order #{level.order ?? 0}
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-slate-500">
              <span>ID: <code className="text-slate-400 font-mono">{level.id}</code></span>
              {level.description && (
                <span className="truncate max-w-md hidden sm:inline text-slate-400">— {level.description}</span>
              )}
            </div>
          </div>
        </div>

        {/* Level Action Controls */}
        <div className="flex items-center gap-1.5 shrink-0 self-end md:self-center">
          {/* Status buttons */}
          {level.status === 'draft' && (
            <button
              onClick={() => handleStatus('review')}
              disabled={loadingAction}
              className="px-2.5 py-1 rounded-lg bg-sky-600/20 text-sky-300 hover:bg-sky-600/30 text-[11px] font-semibold"
            >
              Review
            </button>
          )}
          {(level.status === 'draft' || level.status === 'review') && (
            <button
              onClick={() => handleStatus('published')}
              disabled={loadingAction}
              className="px-2.5 py-1 rounded-lg bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 text-[11px] font-semibold"
            >
              Publikasikan
            </button>
          )}
          {level.status === 'published' && (
            <button
              onClick={() => handleStatus('archived')}
              disabled={loadingAction}
              className="px-2.5 py-1 rounded-lg bg-slate-700/50 text-slate-300 hover:bg-slate-700 text-[11px] font-semibold"
            >
              Arsipkan
            </button>
          )}
          {level.status === 'archived' && (
            <button
              onClick={() => handleStatus('draft')}
              disabled={loadingAction}
              className="px-2.5 py-1 rounded-lg bg-amber-600/20 text-amber-300 hover:bg-amber-600/30 text-[11px] font-semibold"
            >
              Pulihkan ke Draft
            </button>
          )}

          {/* Reorder */}
          {onReorder && (
            <div className="flex items-center bg-slate-950 rounded-lg border border-slate-800 p-0.5">
              <button
                onClick={() => onReorder(level.id, Math.max(0, (level.order || 0) - 1))}
                disabled={loadingAction || (level.order || 0) <= 0}
                className="p-1 hover:text-white text-slate-500 disabled:opacity-30"
                title="Pindah ke Atas"
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onReorder(level.id, (level.order || 0) + 1)}
                disabled={loadingAction}
                className="p-1 hover:text-white text-slate-500"
                title="Pindah ke Bawah"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Edit Level */}
          <button
            onClick={() => onEdit(level)}
            disabled={loadingAction}
            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 transition-colors"
            title="Edit Level"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>

          {/* Delete Level */}
          <button
            onClick={handleDelete}
            disabled={loadingAction}
            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            title="Hapus Level"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Expanded Modules Container */}
      {isExpanded && (
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/40 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                Modul di {level.title} ({modules.length})
              </span>
              <button
                onClick={loadModules}
                disabled={loadingModules}
                className="p-1 rounded text-slate-500 hover:text-slate-300"
                title="Segarkan Modul"
              >
                <RefreshCw className={`w-3 h-3 ${loadingModules ? 'animate-spin text-amber-400' : ''}`} />
              </button>
            </div>

            <button
              onClick={() => setActiveModuleModal({ mode: 'create' })}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-600/20 text-amber-300 hover:bg-amber-600/30 text-[11px] font-semibold border border-amber-500/30"
            >
              <Plus className="w-3 h-3" />
              <span>Tambah Modul</span>
            </button>
          </div>

          {loadingModules ? (
            <div className="p-4 text-center text-slate-500 flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
              <span>Memuat modul...</span>
            </div>
          ) : modules.length === 0 ? (
            <div className="p-6 rounded-xl border border-dashed border-slate-800 text-center space-y-2">
              <FolderPlus className="w-7 h-7 text-slate-600 mx-auto" />
              <div className="text-xs font-semibold text-slate-400">Belum Ada Modul Terdaftar di Level Ini</div>
              <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                Tambahkan modul pembelajaran untuk level ini atau impor dari kurikulum statis.
              </p>
              <button
                onClick={() => setActiveModuleModal({ mode: 'create' })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-[11px] shadow-sm"
              >
                <Plus className="w-3 h-3" />
                <span>Buat Modul Pertama</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {modules.map(mod => (
                <ModuleItem
                  key={mod.id}
                  module={mod}
                  courseId={courseId}
                  levelId={level.id}
                  onEdit={(m) => setActiveModuleModal({ mode: 'edit', module: m })}
                  onDelete={handleDeleteModule}
                  onStatusChange={handleModuleStatusChange}
                  onReorder={handleModuleReorder}
                  onNotify={onNotify}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Module Modal */}
      {activeModuleModal && (
        <ModuleModal
          mode={activeModuleModal.mode}
          courseId={courseId}
          levelId={level.id}
          initialModule={activeModuleModal.module}
          nextOrder={modules.length}
          onClose={() => setActiveModuleModal(null)}
          onSave={handleSaveModule}
        />
      )}
    </div>
  );
};
