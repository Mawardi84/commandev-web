import React, { useState, useEffect } from 'react';
import { 
  FileCode, 
  Trash2, 
  Edit2, 
  ChevronUp, 
  ChevronDown, 
  ChevronRight,
  Terminal,
  Plus,
  RefreshCw,
  Download,
  Lock,
  HelpCircle
} from 'lucide-react';
import { CmsLesson, CmsExercise, ContentStatus } from '../../services/curriculum/types';
import { cmsDataService } from '../../services/curriculum/cmsDataService';
import { AdminExerciseEditor } from './AdminExerciseEditor';
import { AdminQuizEditor } from './AdminQuizEditor';

interface LessonItemProps {
  lesson: CmsLesson;
  courseId?: string;
  levelId?: string;
  moduleId?: string;
  onEdit: (lesson: CmsLesson) => void;
  onDelete: (lessonId: string) => Promise<void>;
  onStatusChange: (lessonId: string, newStatus: ContentStatus) => Promise<void>;
  onReorder?: (lessonId: string, newOrder: number) => Promise<void>;
  onNotify?: (msg: { type: 'success' | 'error'; text: string }) => void;
}

export const LessonItem: React.FC<LessonItemProps> = ({
  lesson,
  courseId = lesson.courseId || '',
  levelId = lesson.levelId || '',
  moduleId = lesson.moduleId || '',
  onEdit,
  onDelete,
  onStatusChange,
  onReorder,
  onNotify
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [exercises, setExercises] = useState<CmsExercise[]>([]);
  const [loadingExercises, setLoadingExercises] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);
  const [importingExercises, setImportingExercises] = useState(false);

  // Exercise Editor Modal State
  const [activeExerciseEditor, setActiveExerciseEditor] = useState<{
    mode: 'create' | 'edit';
    exercise?: any;
  } | null>(null);

  // Quiz Editor Modal State
  const [isQuizEditorOpen, setIsQuizEditorOpen] = useState(false);

  const statusColors = {
    draft: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    review: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    published: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    archived: 'bg-slate-700/30 text-slate-400 border-slate-700/50'
  }[lesson.status];

  const typeColors = {
    learn: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    practice: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    challenge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    quiz: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    project: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
  }[lesson.type] || 'bg-slate-800 text-slate-400 border-slate-700';

  const loadExercises = async () => {
    setLoadingExercises(true);
    try {
      const data = await cmsDataService.listExercises(lesson.id);
      setExercises(data);
    } catch (err: any) {
      console.error('Failed to load exercises for lesson:', err);
    } finally {
      setLoadingExercises(false);
    }
  };

  useEffect(() => {
    if (isExpanded) {
      loadExercises();
    }
  }, [isExpanded]);

  const handleStatus = async (status: ContentStatus) => {
    setLoadingAction(true);
    try {
      await onStatusChange(lesson.id, status);
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Hapus Lesson "${lesson.title}" (${lesson.id}) dari CMS? Tindakan ini tidak dapat dibatalkan.`)) return;
    setLoadingAction(true);
    try {
      await onDelete(lesson.id);
    } finally {
      setLoadingAction(false);
    }
  };

  // Exercise Actions
  const handleOpenEditExercise = async (ex: CmsExercise) => {
    try {
      const fullEx = await cmsDataService.getExercise(ex.id);
      setActiveExerciseEditor({ mode: 'edit', exercise: fullEx });
    } catch (err: any) {
      if (onNotify) onNotify({ type: 'error', text: err.message || 'Gagal memuat detail latihan' });
    }
  };

  const handleSaveExercise = async (exerciseData: any) => {
    if (!activeExerciseEditor) return;

    if (activeExerciseEditor.mode === 'create') {
      await cmsDataService.createExercise(lesson.id, exerciseData);
      if (onNotify) onNotify({ type: 'success', text: `Latihan "${exerciseData.title}" berhasil dibuat!` });
    } else if (activeExerciseEditor.exercise) {
      await cmsDataService.updateExercise(activeExerciseEditor.exercise.id, exerciseData);
      if (onNotify) onNotify({ type: 'success', text: `Latihan "${exerciseData.title}" berhasil diperbarui!` });
    }
    await loadExercises();
  };

  const handleDeleteExercise = async (exerciseId: string, title: string) => {
    if (!confirm(`Hapus latihan "${title}" (${exerciseId})?`)) return;
    try {
      await cmsDataService.deleteExercise(exerciseId);
      if (onNotify) onNotify({ type: 'success', text: 'Latihan berhasil dihapus' });
      await loadExercises();
    } catch (err: any) {
      if (onNotify) onNotify({ type: 'error', text: err.message || 'Gagal menghapus latihan' });
    }
  };

  const handleExerciseStatusChange = async (exerciseId: string, newStatus: ContentStatus) => {
    try {
      await cmsDataService.updateExerciseStatus(exerciseId, newStatus);
      if (onNotify) onNotify({ type: 'success', text: `Status latihan berhasil diubah ke ${newStatus.toUpperCase()}` });
      await loadExercises();
    } catch (err: any) {
      if (onNotify) onNotify({ type: 'error', text: err.message || 'Gagal mengubah status latihan' });
    }
  };

  const handleImportStaticExercises = async () => {
    setImportingExercises(true);
    try {
      const res = await cmsDataService.importStaticExercises(lesson.id);
      if (onNotify) {
        onNotify({
          type: 'success',
          text: `Import selesai: ${res.exercisesCreated} latihan baru dibuat, ${res.exercisesSkipped} latihan lewati (sudah ada).`
        });
      }
      await loadExercises();
    } catch (err: any) {
      if (onNotify) onNotify({ type: 'error', text: err.message || 'Gagal mengimpor latihan statis' });
    } finally {
      setImportingExercises(false);
    }
  };

  return (
    <div className="rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors overflow-hidden text-xs">
      {/* Lesson Header Row */}
      <div className="p-2.5 sm:p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-start sm:items-center gap-2 min-w-0">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0 mt-0.5 sm:mt-0"
            title={isExpanded ? 'Sembunyikan Exercises' : 'Tampilkan Exercises'}
          >
            <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90 text-amber-400' : ''}`} />
          </button>

          <FileCode className="w-4 h-4 text-slate-400 shrink-0 mt-0.5 sm:mt-0" />
          
          <div className="min-w-0 space-y-0.5">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-semibold text-slate-200 truncate">{lesson.title}</span>
              <span className={`px-2 py-0.2 rounded-full text-[9px] font-bold uppercase tracking-wider border ${typeColors}`}>
                {lesson.type}
              </span>
              <span className={`px-2 py-0.2 rounded-full text-[9px] font-bold uppercase tracking-wider border ${statusColors}`}>
                {lesson.status}
              </span>
              <span className="text-[10px] text-slate-500">v{lesson.version || 1}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800/80 text-slate-400 font-mono">
                #{lesson.order ?? 0}
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300 font-semibold border border-amber-500/20">
                +{lesson.xpReward ?? 10} XP
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-500">
              <span>ID: <code className="text-slate-400 font-mono">{lesson.id}</code></span>
              {lesson.language && (
                <span>&bull; Lang: <code className="text-slate-400 font-mono">{lesson.language}</code></span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
          {/* Status transition controls */}
          {lesson.status === 'draft' && (
            <button
              onClick={() => handleStatus('review')}
              disabled={loadingAction}
              className="px-2 py-0.5 rounded-lg bg-sky-600/20 text-sky-300 hover:bg-sky-600/30 text-[10px] font-semibold"
            >
              Review
            </button>
          )}
          {(lesson.status === 'draft' || lesson.status === 'review') && (
            <button
              onClick={() => handleStatus('published')}
              disabled={loadingAction}
              className="px-2 py-0.5 rounded-lg bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 text-[10px] font-semibold"
            >
              Publish
            </button>
          )}
          {lesson.status === 'published' && (
            <button
              onClick={() => handleStatus('archived')}
              disabled={loadingAction}
              className="px-2 py-0.5 rounded-lg bg-slate-700/50 text-slate-300 hover:bg-slate-700 text-[10px] font-semibold"
            >
              Arsipkan
            </button>
          )}
          {lesson.status === 'archived' && (
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
            <div className="flex items-center bg-slate-950 rounded-lg border border-slate-800 p-0.5">
              <button
                onClick={() => onReorder(lesson.id, Math.max(0, (lesson.order || 0) - 1))}
                disabled={loadingAction || (lesson.order || 0) <= 0}
                className="p-1 hover:text-white text-slate-500 disabled:opacity-30"
                title="Pindah ke Atas"
              >
                <ChevronUp className="w-3 h-3" />
              </button>
              <button
                onClick={() => onReorder(lesson.id, (lesson.order || 0) + 1)}
                disabled={loadingAction}
                className="p-1 hover:text-white text-slate-500"
                title="Pindah ke Bawah"
              >
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Quiz CMS Editor Button for quiz-type lessons */}
          {lesson.type === 'quiz' && (
            <button
              onClick={() => setIsQuizEditorOpen(true)}
              disabled={loadingAction}
              className="p-1.5 rounded-lg text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 transition-colors flex items-center gap-1 font-semibold text-[10px]"
              title="Kelola Pertanyaan Kuis & Kunci Jawaban Protected"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kuis & Solutions</span>
            </button>
          )}

          {/* Edit Lesson */}
          <button
            onClick={() => onEdit(lesson)}
            disabled={loadingAction}
            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 transition-colors"
            title="Edit Lesson"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>

          {/* Delete Lesson */}
          <button
            onClick={handleDelete}
            disabled={loadingAction}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            title="Hapus Lesson"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Collapsible Exercise Tree View */}
      {isExpanded && (
        <div className="p-3 bg-slate-950/80 border-t border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span className="font-bold text-slate-200 text-xs">
                Unit Latihan / Exercises ({exercises.length})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleImportStaticExercises}
                disabled={importingExercises}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[11px] font-semibold transition-colors disabled:opacity-50"
                title="Impor latihan statis bawaan kurikulum untuk lesson ini"
              >
                <Download className={`w-3 h-3 ${importingExercises ? 'animate-spin' : ''}`} />
                <span>{importingExercises ? 'Mengimpor...' : 'Import Statis'}</span>
              </button>

              <button
                onClick={() => setActiveExerciseEditor({ mode: 'create' })}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 rounded-lg text-[11px] font-semibold transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Exercise</span>
              </button>

              <button
                onClick={loadExercises}
                className="p-1 text-slate-500 hover:text-white transition-colors"
                title="Refresh Exercises"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingExercises ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {loadingExercises ? (
            <div className="py-4 text-center text-slate-500 animate-pulse">
              Memuat unit latihan...
            </div>
          ) : exercises.length === 0 ? (
            <div className="p-4 border border-dashed border-slate-800 rounded-xl text-center space-y-1">
              <p className="text-slate-400 font-medium">Belum Ada Unit Latihan CMS</p>
              <p className="text-slate-500 text-[11px]">
                Klik <strong>"Import Statis"</strong> untuk mengimpor latihan bawaan atau <strong>"Tambah Exercise"</strong> untuk membuat latihan baru.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {exercises.map(ex => (
                <div
                  key={ex.id}
                  className="p-2.5 bg-slate-900 border border-slate-800/80 rounded-xl flex items-center justify-between gap-2 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Terminal className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-semibold text-slate-200 truncate">{ex.title}</span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                          {ex.type}
                        </span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                          {ex.status}
                        </span>
                        <span className="text-[10px] text-amber-400">+{ex.xpReward} XP</span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-mono truncate">
                        ID: {ex.id}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {ex.status === 'draft' && (
                      <button
                        onClick={() => handleExerciseStatusChange(ex.id, 'published')}
                        className="px-2 py-0.5 rounded bg-emerald-600/20 text-emerald-300 text-[10px] font-semibold hover:bg-emerald-600/30"
                      >
                        Publish
                      </button>
                    )}
                    {ex.status === 'published' && (
                      <button
                        onClick={() => handleExerciseStatusChange(ex.id, 'draft')}
                        className="px-2 py-0.5 rounded bg-amber-600/20 text-amber-300 text-[10px] font-semibold hover:bg-amber-600/30"
                      >
                        Draft
                      </button>
                    )}

                    <button
                      onClick={() => handleOpenEditExercise(ex)}
                      className="p-1 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors"
                      title="Edit Exercise & Solutions"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleDeleteExercise(ex.id, ex.title)}
                      className="p-1 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                      title="Hapus Exercise"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Admin Exercise Editor Modal */}
      {activeExerciseEditor && (
        <AdminExerciseEditor
          mode={activeExerciseEditor.mode}
          courseId={courseId}
          levelId={levelId}
          moduleId={moduleId}
          lessonId={lesson.id}
          exercise={activeExerciseEditor.exercise}
          onClose={() => setActiveExerciseEditor(null)}
          onSave={handleSaveExercise}
        />
      )}

      {/* Admin Quiz Editor Modal */}
      {isQuizEditorOpen && (
        <AdminQuizEditor
          lessonId={lesson.id}
          lessonTitle={lesson.title}
          initialQuestions={lesson.questions || []}
          onClose={() => setIsQuizEditorOpen(false)}
          onSaveSuccess={() => {
            if (onNotify) onNotify({ type: 'success', text: 'Kuis dan kunci jawaban berhasil diperbarui!' });
          }}
          onNotify={onNotify}
        />
      )}
    </div>
  );
};
