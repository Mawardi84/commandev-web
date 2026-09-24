import React, { useState, useEffect } from 'react';
import { 
  Trash2, 
  Edit2, 
  ChevronUp, 
  ChevronDown, 
  ChevronRight,
  FolderCode, 
  CheckCircle2, 
  Clock, 
  Archive, 
  Sparkles,
  Plus,
  RefreshCw,
  Download,
  FileCode
} from 'lucide-react';
import { CmsModule, CmsLesson, ContentStatus } from '../../services/curriculum/types';
import { cmsDataService } from '../../services/curriculum/cmsDataService';
import { LessonItem } from './LessonItem';
import { AdminLessonEditor } from './AdminLessonEditor';

interface ModuleItemProps {
  module: CmsModule;
  courseId?: string;
  levelId?: string;
  onEdit: (module: CmsModule) => void;
  onDelete: (moduleId: string) => Promise<void>;
  onStatusChange: (moduleId: string, newStatus: ContentStatus) => Promise<void>;
  onReorder?: (moduleId: string, newOrder: number) => Promise<void>;
  onNotify?: (msg: { type: 'success' | 'error'; text: string }) => void;
}

export const ModuleItem: React.FC<ModuleItemProps> = ({
  module,
  courseId = module.courseId || '',
  levelId = module.levelId || '',
  onEdit,
  onDelete,
  onStatusChange,
  onReorder,
  onNotify
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [lessons, setLessons] = useState<CmsLesson[]>([]);
  const [loadingLessons, setLoadingLessons] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);
  const [importingStatic, setImportingStatic] = useState(false);

  // Lesson Editor Modal State
  const [activeLessonEditor, setActiveLessonEditor] = useState<{
    mode: 'create' | 'edit';
    lesson?: CmsLesson;
  } | null>(null);

  const statusColors = {
    draft: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    review: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    published: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    archived: 'bg-slate-700/30 text-slate-400 border-slate-700/50'
  }[module.status];

  const loadLessons = async () => {
    setLoadingLessons(true);
    try {
      const data = await cmsDataService.listLessons(courseId, levelId, module.id);
      setLessons(data);
    } catch (err: any) {
      console.error('Failed to load lessons for module:', err);
      if (onNotify) {
        onNotify({ type: 'error', text: err.message || 'Gagal memuat daftar lesson' });
      }
    } finally {
      setLoadingLessons(false);
    }
  };

  useEffect(() => {
    if (isExpanded) {
      loadLessons();
    }
  }, [isExpanded]);

  const handleStatus = async (status: ContentStatus) => {
    setLoadingAction(true);
    try {
      await onStatusChange(module.id, status);
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDelete = async () => {
    if (lessons.length > 0) {
      const confirmForce = confirm(
        `Modul "${module.title}" masih memiliki ${lessons.length} lesson. Menghapus modul akan memutus relasi lesson ini. Lanjutkan hapus modul?`
      );
      if (!confirmForce) return;
    } else {
      if (!confirm(`Hapus Modul "${module.title}" (${module.id}) dari CMS?`)) return;
    }

    setLoadingAction(true);
    try {
      await onDelete(module.id);
    } finally {
      setLoadingAction(false);
    }
  };

  // Lesson actions
  const handleSaveLesson = async (lessonData: Partial<CmsLesson>) => {
    if (!activeLessonEditor) return;

    if (activeLessonEditor.mode === 'create') {
      await cmsDataService.createLesson(courseId, levelId, module.id, lessonData);
      if (onNotify) {
        onNotify({ type: 'success', text: `Lesson "${lessonData.title}" berhasil dibuat!` });
      }
    } else if (activeLessonEditor.lesson) {
      await cmsDataService.updateLesson(activeLessonEditor.lesson.id, lessonData);
      if (onNotify) {
        onNotify({ type: 'success', text: `Lesson "${lessonData.title || activeLessonEditor.lesson.id}" berhasil diperbarui!` });
      }
    }
    await loadLessons();
  };

  const handleDeleteLesson = async (lessonId: string) => {
    try {
      await cmsDataService.deleteLesson(lessonId);
      if (onNotify) {
        onNotify({ type: 'success', text: 'Lesson berhasil dihapus dari CMS' });
      }
      await loadLessons();
    } catch (err: any) {
      if (onNotify) {
        onNotify({ type: 'error', text: err.message || 'Gagal menghapus lesson' });
      }
    }
  };

  const handleLessonStatusChange = async (lessonId: string, newStatus: ContentStatus) => {
    try {
      await cmsDataService.updateLessonStatus(lessonId, newStatus);
      if (onNotify) {
        onNotify({ type: 'success', text: `Status lesson berhasil diubah ke ${newStatus.toUpperCase()}` });
      }
      await loadLessons();
    } catch (err: any) {
      if (onNotify) {
        onNotify({ type: 'error', text: err.message || 'Gagal memperbarui status lesson' });
      }
    }
  };

  const handleLessonReorder = async (lessonId: string, newOrder: number) => {
    try {
      await cmsDataService.updateLesson(lessonId, { order: newOrder });
      await loadLessons();
    } catch (err: any) {
      if (onNotify) {
        onNotify({ type: 'error', text: err.message || 'Gagal mengubah urutan lesson' });
      }
    }
  };

  const handleImportStaticLessons = async () => {
    setImportingStatic(true);
    try {
      const res = await cmsDataService.importStaticModuleLessons(module.id);
      if (onNotify) {
        onNotify({
          type: 'success',
          text: `Impor selesai: ${res.lessonsCreated} dibuat, ${res.lessonsSkipped} dilewati.`
        });
      }
      await loadLessons();
    } catch (err: any) {
      if (onNotify) {
        onNotify({ type: 'error', text: err.message || 'Gagal mengimpor lesson statis' });
      }
    } finally {
      setImportingStatic(false);
    }
  };

  return (
    <div className="rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 transition-colors overflow-hidden">
      {/* Module Header Row */}
      <div className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start sm:items-center gap-2.5 min-w-0">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors shrink-0 mt-0.5 sm:mt-0"
            title={isExpanded ? 'Tutup Lessons' : 'Buka Lessons'}
          >
            {isExpanded ? <ChevronDown className="w-4 h-4 text-amber-400" /> : <ChevronRight className="w-4 h-4" />}
          </button>

          <FolderCode className="w-4 h-4 text-slate-500 shrink-0 mt-0.5 sm:mt-0" />
          
          <div className="min-w-0 space-y-0.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span 
                onClick={() => setIsExpanded(!isExpanded)}
                className="font-semibold text-slate-200 truncate cursor-pointer hover:text-amber-400 transition-colors"
              >
                {module.title}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${statusColors}`}>
                {module.status}
              </span>
              <span className="text-[10px] text-slate-500">v{module.version}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800/60 text-slate-400 font-mono">
                #{module.order ?? 0}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-500">
              <span>ID: <code className="text-slate-400 font-mono">{module.id}</code></span>
              {module.description && (
                <span className="truncate max-w-md hidden md:inline text-slate-400">— {module.description}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
          {/* Status transition controls */}
          {module.status === 'draft' && (
            <button
              onClick={() => handleStatus('review')}
              disabled={loadingAction}
              className="px-2 py-0.5 rounded-lg bg-sky-600/20 text-sky-300 hover:bg-sky-600/30 text-[10px] font-semibold"
            >
              Review
            </button>
          )}
          {(module.status === 'draft' || module.status === 'review') && (
            <button
              onClick={() => handleStatus('published')}
              disabled={loadingAction}
              className="px-2 py-0.5 rounded-lg bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 text-[10px] font-semibold"
            >
              Publish
            </button>
          )}
          {module.status === 'published' && (
            <button
              onClick={() => handleStatus('archived')}
              disabled={loadingAction}
              className="px-2 py-0.5 rounded-lg bg-slate-700/50 text-slate-300 hover:bg-slate-700 text-[10px] font-semibold"
            >
              Arsipkan
            </button>
          )}
          {module.status === 'archived' && (
            <button
              onClick={() => handleStatus('draft')}
              disabled={loadingAction}
              className="px-2 py-0.5 rounded-lg bg-amber-600/20 text-amber-300 hover:bg-amber-600/30 text-[10px] font-semibold"
            >
              Draft
            </button>
          )}

          {/* Reorder controls */}
          {onReorder && (
            <div className="flex items-center bg-slate-900 rounded-lg border border-slate-800 p-0.5">
              <button
                onClick={() => onReorder(module.id, Math.max(0, (module.order || 0) - 1))}
                disabled={loadingAction || (module.order || 0) <= 0}
                className="p-1 hover:text-white text-slate-500 disabled:opacity-30"
                title="Pindah ke Atas"
              >
                <ChevronUp className="w-3 h-3" />
              </button>
              <button
                onClick={() => onReorder(module.id, (module.order || 0) + 1)}
                disabled={loadingAction}
                className="p-1 hover:text-white text-slate-500"
                title="Pindah ke Bawah"
              >
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Edit Module */}
          <button
            onClick={() => onEdit(module)}
            disabled={loadingAction}
            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 transition-colors"
            title="Edit Modul"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>

          {/* Delete Module */}
          <button
            onClick={handleDelete}
            disabled={loadingAction}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            title="Hapus Modul"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Expandable Lessons Section */}
      {isExpanded && (
        <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCode className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                Lessons di {module.title} ({lessons.length})
              </span>
              <button
                onClick={loadLessons}
                disabled={loadingLessons}
                className="p-1 rounded text-slate-500 hover:text-slate-300"
                title="Segarkan Lessons"
              >
                <RefreshCw className={`w-3 h-3 ${loadingLessons ? 'animate-spin text-amber-400' : ''}`} />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleImportStaticLessons}
                disabled={importingStatic}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold border border-slate-700"
                title="Impor pelajaran statis yang sudah ada untuk modul ini"
              >
                <Download className={`w-3 h-3 ${importingStatic ? 'animate-spin text-amber-400' : ''}`} />
                <span>{importingStatic ? 'Mengimpor...' : 'Impor Statis'}</span>
              </button>

              <button
                onClick={() => setActiveLessonEditor({ mode: 'create' })}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-600/20 text-amber-300 hover:bg-amber-600/30 text-[11px] font-semibold border border-amber-500/30"
              >
                <Plus className="w-3 h-3" />
                <span>Tambah Lesson</span>
              </button>
            </div>
          </div>

          {loadingLessons ? (
            <div className="p-4 text-center text-slate-500 flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
              <span>Memuat lessons...</span>
            </div>
          ) : lessons.length === 0 ? (
            <div className="p-5 rounded-xl border border-dashed border-slate-800 text-center space-y-2">
              <FileCode className="w-6 h-6 text-slate-600 mx-auto" />
              <div className="text-xs font-semibold text-slate-400">Belum Ada Lesson di Modul Ini</div>
              <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                Anda dapat menambahkan lesson baru atau mengimpor lesson statis bawaan kurikulum ke Firestore.
              </p>
              <div className="flex items-center justify-center gap-2 pt-1">
                <button
                  onClick={handleImportStaticLessons}
                  disabled={importingStatic}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-[11px]"
                >
                  <Download className="w-3 h-3" />
                  <span>Impor Lesson Statis</span>
                </button>
                <button
                  onClick={() => setActiveLessonEditor({ mode: 'create' })}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-[11px]"
                >
                  <Plus className="w-3 h-3" />
                  <span>Buat Lesson Baru</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {lessons.map(les => (
                <LessonItem
                  key={les.id}
                  lesson={les}
                  courseId={courseId}
                  levelId={levelId}
                  moduleId={module.id}
                  onEdit={l => setActiveLessonEditor({ mode: 'edit', lesson: l })}
                  onDelete={handleDeleteLesson}
                  onStatusChange={handleLessonStatusChange}
                  onReorder={handleLessonReorder}
                  onNotify={onNotify}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Dedicated Lesson Editor Modal */}
      {activeLessonEditor && (
        <AdminLessonEditor
          mode={activeLessonEditor.mode}
          courseId={courseId}
          levelId={levelId}
          moduleId={module.id}
          lesson={activeLessonEditor.lesson}
          onClose={() => setActiveLessonEditor(null)}
          onSave={handleSaveLesson}
        />
      )}
    </div>
  );
};
