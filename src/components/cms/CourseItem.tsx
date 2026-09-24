import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  BookOpen, 
  Plus, 
  Edit2, 
  Trash2, 
  ChevronUp, 
  RefreshCw, 
  Sparkles, 
  Layers,
  Code2
} from 'lucide-react';
import { CmsCourse, CmsLevel, ContentStatus } from '../../services/curriculum/types';
import { cmsDataService } from '../../services/curriculum/cmsDataService';
import { COURSES } from '../../data/curriculum';
import { LevelItem } from './LevelItem';
import { LevelModal, EditCourseModal } from './Modals';

interface CourseItemProps {
  course: CmsCourse;
  onDeleteCourse: (courseId: string) => Promise<void>;
  onStatusChange: (courseId: string, status: ContentStatus) => Promise<void>;
  onUpdateCourse: (courseId: string, updates: Partial<CmsCourse>) => Promise<void>;
  onReorder?: (courseId: string, newOrder: number) => Promise<void>;
  onNotify: (msg: { type: 'success' | 'error'; text: string }) => void;
}

export const CourseItem: React.FC<CourseItemProps> = ({
  course,
  onDeleteCourse,
  onStatusChange,
  onUpdateCourse,
  onReorder,
  onNotify
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [levels, setLevels] = useState<CmsLevel[]>([]);
  const [loadingLevels, setLoadingLevels] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);
  const [seedingLevels, setSeedingLevels] = useState(false);

  const [activeLevelModal, setActiveLevelModal] = useState<{
    mode: 'create' | 'edit';
    level?: CmsLevel;
  } | null>(null);

  const [isEditingCourse, setIsEditingCourse] = useState(false);

  const statusColors = {
    draft: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    review: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    published: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    archived: 'bg-slate-700/30 text-slate-400 border-slate-700/50'
  }[course.status];

  const loadLevels = async () => {
    setLoadingLevels(true);
    try {
      const data = await cmsDataService.listLevels(course.id);
      setLevels(data);
    } catch (err: any) {
      console.error('Failed to load levels:', err);
      onNotify({ type: 'error', text: err.message || 'Gagal memuat level kursus' });
    } finally {
      setLoadingLevels(false);
    }
  };

  useEffect(() => {
    if (isExpanded) {
      loadLevels();
    }
  }, [isExpanded]);

  const handleStatus = async (status: ContentStatus) => {
    setLoadingAction(true);
    try {
      await onStatusChange(course.id, status);
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDelete = async () => {
    if (levels.length > 0) {
      const confirmForce = confirm(
        `Kursus "${course.title}" masih memiliki ${levels.length} level di CMS. Menghapus kursus akan memutus relasi level dan modul. Lanjutkan?`
      );
      if (!confirmForce) return;
    } else {
      if (!confirm(`Hapus Kursus "${course.title}" (${course.id}) dari CMS?`)) return;
    }

    setLoadingAction(true);
    try {
      await onDeleteCourse(course.id);
    } finally {
      setLoadingAction(false);
    }
  };

  // Level Handlers
  const handleSaveLevel = async (data: Partial<CmsLevel>) => {
    try {
      if (activeLevelModal?.mode === 'create') {
        await cmsDataService.createLevel(course.id, data);
        onNotify({ type: 'success', text: `Level "${data.title}" berhasil dibuat.` });
      } else if (activeLevelModal?.mode === 'edit' && activeLevelModal.level) {
        await cmsDataService.updateLevel(activeLevelModal.level.id, data);
        onNotify({ type: 'success', text: `Level "${data.title}" berhasil diperbarui.` });
      }
      await loadLevels();
      setActiveLevelModal(null);
    } catch (err: any) {
      throw err;
    }
  };

  const handleDeleteLevel = async (levelId: string) => {
    try {
      await cmsDataService.deleteLevel(levelId);
      onNotify({ type: 'success', text: `Level ${levelId} telah dihapus.` });
      await loadLevels();
    } catch (err: any) {
      onNotify({ type: 'error', text: err.message || 'Gagal menghapus level' });
    }
  };

  const handleLevelStatusChange = async (levelId: string, newStatus: ContentStatus) => {
    try {
      await cmsDataService.updateLevelStatus(levelId, newStatus);
      onNotify({ type: 'success', text: `Status level diubah menjadi ${newStatus}.` });
      await loadLevels();
    } catch (err: any) {
      onNotify({ type: 'error', text: err.message || 'Gagal mengubah status level' });
    }
  };

  const handleLevelReorder = async (levelId: string, newOrder: number) => {
    try {
      await cmsDataService.updateLevel(levelId, { order: newOrder });
      await loadLevels();
    } catch (err: any) {
      onNotify({ type: 'error', text: err.message || 'Gagal mengubah urutan level' });
    }
  };

  // Seed Static Levels & Modules into Firestore Idempotently
  const handleSeedStaticLevels = async () => {
    const staticCourse = COURSES.find(c => c.id === course.id);
    if (!staticCourse || staticCourse.levels.length === 0) {
      onNotify({ type: 'error', text: `Tidak ditemukan data statis level untuk kursus "${course.id}"` });
      return;
    }

    if (!confirm(`Impor ${staticCourse.levels.length} Level & Modul statis untuk "${course.title}" ke Firestore CMS secara aman (idempotent - hanya buat yang belum ada)?`)) {
      return;
    }

    setSeedingLevels(true);
    try {
      const result = await cmsDataService.importStaticCourse(course.id);
      onNotify({ 
        type: 'success', 
        text: `Impor statis selesai: ${result.levelsCreated} level baru dibuat (${result.levelsSkipped} dilewati), ${result.modulesCreated} modul baru dibuat (${result.modulesSkipped} dilewati).` 
      });
      await loadLevels();
    } catch (err: any) {
      onNotify({ type: 'error', text: err.message || 'Gagal mengimpor level dan modul statis' });
    } finally {
      setSeedingLevels(false);
    }
  };

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden transition-colors hover:border-slate-700/80">
      {/* Course Header Bar */}
      <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start md:items-center gap-3 min-w-0">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors shrink-0 mt-0.5 md:mt-0"
            title={isExpanded ? 'Tutup Hirarki Kursus' : 'Buka Level & Modul Kursus'}
          >
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-amber-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-slate-400" />
            )}
          </button>

          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4 text-amber-400" />
          </div>

          <div className="min-w-0 space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="font-bold text-white text-base truncate">{course.title}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${statusColors}`}>
                {course.status}
              </span>
              <span className="text-[11px] text-slate-500">v{course.version}</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                Order #{course.order ?? 0}
              </span>
            </div>
            <div className="text-xs text-slate-400 line-clamp-1">{course.shortDescription || course.description}</div>
            <div className="text-[11px] text-slate-500 flex items-center gap-3">
              <span>ID: <code className="text-slate-400 font-mono">{course.id}</code></span>
              <span>Diperbarui: {new Date(course.updatedAt).toLocaleDateString('id-ID')}</span>
            </div>
          </div>
        </div>

        {/* Course Controls */}
        <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
          {/* Status Buttons */}
          {course.status === 'draft' && (
            <button
              onClick={() => handleStatus('review')}
              disabled={loadingAction}
              className="px-2.5 py-1 rounded-lg bg-sky-600/20 text-sky-300 hover:bg-sky-600/30 text-xs font-semibold"
            >
              Kirim Review
            </button>
          )}

          {(course.status === 'draft' || course.status === 'review') && (
            <button
              onClick={() => handleStatus('published')}
              disabled={loadingAction}
              className="px-2.5 py-1 rounded-lg bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 text-xs font-semibold"
            >
              Publikasikan
            </button>
          )}

          {course.status === 'published' && (
            <button
              onClick={() => handleStatus('archived')}
              disabled={loadingAction}
              className="px-2.5 py-1 rounded-lg bg-slate-700/50 text-slate-300 hover:bg-slate-700 text-xs font-semibold"
            >
              Arsipkan
            </button>
          )}

          {course.status === 'archived' && (
            <button
              onClick={() => handleStatus('draft')}
              disabled={loadingAction}
              className="px-2.5 py-1 rounded-lg bg-amber-600/20 text-amber-300 hover:bg-amber-600/30 text-xs font-semibold"
            >
              Pulihkan ke Draft
            </button>
          )}

          {/* Reorder */}
          {onReorder && (
            <div className="flex items-center bg-slate-950 rounded-lg border border-slate-800 p-0.5">
              <button
                onClick={() => onReorder(course.id, Math.max(0, (course.order || 0) - 1))}
                disabled={loadingAction || (course.order || 0) <= 0}
                className="p-1.5 hover:text-white text-slate-500 disabled:opacity-30"
                title="Pindah Urutan ke Atas"
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onReorder(course.id, (course.order || 0) + 1)}
                disabled={loadingAction}
                className="p-1.5 hover:text-white text-slate-500"
                title="Pindah Urutan ke Bawah"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Edit Course */}
          <button
            onClick={() => setIsEditingCourse(true)}
            disabled={loadingAction}
            className="p-2 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 transition-colors"
            title="Edit Detail Kursus"
          >
            <Edit2 className="w-4 h-4" />
          </button>

          {/* Delete Course */}
          <button
            onClick={handleDelete}
            disabled={loadingAction}
            className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            title="Hapus Kursus"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* EXPANDED HIERARCHY (Levels of Course) */}
      {isExpanded && (
        <div className="p-4 sm:p-5 border-t border-slate-800/80 bg-slate-950/60 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-white text-xs uppercase tracking-wider">
                Struktur Level & Kurikulum ({levels.length} Level)
              </span>
              <button
                onClick={loadLevels}
                disabled={loadingLevels}
                className="p-1 rounded text-slate-500 hover:text-slate-300"
                title="Segarkan Level"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingLevels ? 'animate-spin text-amber-400' : ''}`} />
              </button>
            </div>

            <div className="flex items-center gap-2">
              {levels.length === 0 && (
                <button
                  onClick={handleSeedStaticLevels}
                  disabled={seedingLevels}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 text-xs font-semibold border border-indigo-500/30"
                  title="Impor level dan modul statis bawaan ke Firestore CMS"
                >
                  <Sparkles className={`w-3.5 h-3.5 ${seedingLevels ? 'animate-spin' : ''}`} />
                  <span>{seedingLevels ? 'Mengimpor...' : 'Impor Level & Modul Statis'}</span>
                </button>
              )}

              <button
                onClick={() => setActiveLevelModal({ mode: 'create' })}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-lg shadow-amber-600/20"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Level Baru</span>
              </button>
            </div>
          </div>

          {loadingLevels ? (
            <div className="p-6 text-center text-slate-500 flex items-center justify-center gap-2 text-xs">
              <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
              <span>Memuat level kursus...</span>
            </div>
          ) : levels.length === 0 ? (
            <div className="p-6 rounded-2xl border border-dashed border-slate-800 text-center space-y-3 bg-slate-900/40">
              <Layers className="w-8 h-8 text-slate-600 mx-auto" />
              <div className="text-xs font-bold text-slate-300">Belum Ada Level Terdaftar di Firestore CMS</div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Siswa saat ini mengakses modul level dari kurikulum statis (jika tersedia). Anda dapat membuat level baru atau mengimpor level statis ke Firestore CMS.
              </p>
              <div className="flex items-center justify-center gap-2 pt-1">
                <button
                  onClick={() => setActiveLevelModal({ mode: 'create' })}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Buat Level Baru</span>
                </button>
                <button
                  onClick={handleSeedStaticLevels}
                  disabled={seedingLevels}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Impor Statis</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {levels.map(level => (
                <LevelItem
                  key={level.id}
                  level={level}
                  courseId={course.id}
                  onEdit={(lvl) => setActiveLevelModal({ mode: 'edit', level: lvl })}
                  onDelete={handleDeleteLevel}
                  onStatusChange={handleLevelStatusChange}
                  onReorder={handleLevelReorder}
                  onNotify={onNotify}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Edit Course Modal */}
      {isEditingCourse && (
        <EditCourseModal
          course={course}
          onClose={() => setIsEditingCourse(false)}
          onSave={async (updates) => {
            await onUpdateCourse(course.id, updates);
            onNotify({ type: 'success', text: `Kursus ${course.title} berhasil diperbarui.` });
          }}
        />
      )}

      {/* Level Modal */}
      {activeLevelModal && (
        <LevelModal
          mode={activeLevelModal.mode}
          courseId={course.id}
          initialLevel={activeLevelModal.level}
          nextOrder={levels.length}
          onClose={() => setActiveLevelModal(null)}
          onSave={handleSaveLevel}
        />
      )}
    </div>
  );
};
