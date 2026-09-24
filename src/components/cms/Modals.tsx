import React, { useState } from 'react';
import { X, Save, Layers, FolderPlus, FileText } from 'lucide-react';
import { CmsCourse, CmsLevel, CmsModule, ContentStatus } from '../../services/curriculum/types';
import { sanitizeId, generateLevelId, generateModuleId } from '../../services/curriculum/idUtils';

interface EditCourseModalProps {
  course: CmsCourse;
  onClose: () => void;
  onSave: (updates: Partial<CmsCourse>) => Promise<void>;
}

export const EditCourseModal: React.FC<EditCourseModalProps> = ({ course, onClose, onSave }) => {
  const [title, setTitle] = useState(course.title);
  const [shortDesc, setShortDesc] = useState(course.shortDescription || '');
  const [desc, setDesc] = useState(course.description || '');
  const [icon, setIcon] = useState(course.icon || 'code');
  const [order, setOrder] = useState(course.order || 0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await onSave({
        title: title.trim(),
        shortDescription: shortDesc.trim(),
        description: desc.trim(),
        icon,
        order: Number(order)
      });
      onClose();
    } catch (err: any) {
      setError(err.message || 'Gagal memperbarui kursus');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-white text-sm">Edit Kursus: {course.id}</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          {error && <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-xl">{error}</div>}

          <div className="space-y-1">
            <label className="text-slate-400 font-medium">Judul Kursus</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-medium">Deskripsi Singkat</label>
            <input
              type="text"
              value={shortDesc}
              onChange={e => setShortDesc(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-medium">Deskripsi Lengkap</label>
            <textarea
              rows={3}
              value={desc}
              onChange={e => setDesc(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-slate-400 font-medium">Icon</label>
              <select
                value={icon}
                onChange={e => setIcon(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
              >
                <option value="code">Code / Standard</option>
                <option value="html">HTML5</option>
                <option value="css">CSS3</option>
                <option value="js">JavaScript</option>
                <option value="python">Python</option>
                <option value="react">React</option>
                <option value="database">Database / SQL</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-slate-400 font-medium">Urutan (Order)</label>
              <input
                type="number"
                value={order}
                onChange={e => setOrder(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold shadow-lg shadow-amber-600/20 disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface LevelModalProps {
  mode: 'create' | 'edit';
  courseId: string;
  initialLevel?: CmsLevel;
  nextOrder?: number;
  onClose: () => void;
  onSave: (data: Partial<CmsLevel>) => Promise<void>;
}

export const LevelModal: React.FC<LevelModalProps> = ({
  mode,
  courseId,
  initialLevel,
  nextOrder = 0,
  onClose,
  onSave
}) => {
  const [customId, setCustomId] = useState(
    initialLevel?.id || generateLevelId(courseId, nextOrder)
  );
  const [title, setTitle] = useState(initialLevel?.title || '');
  const [slug, setSlug] = useState(initialLevel?.slug || '');
  const [description, setDescription] = useState(initialLevel?.description || '');
  const [order, setOrder] = useState<number>(initialLevel?.order ?? nextOrder);
  const [status, setStatus] = useState<ContentStatus>(initialLevel?.status || 'draft');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Judul Level wajib diisi');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const cleanId = sanitizeId(customId);
      if (!cleanId) {
        throw new Error('ID Level tidak valid');
      }

      await onSave({
        id: mode === 'create' ? cleanId : initialLevel?.id,
        courseId,
        title: title.trim(),
        slug: slug.trim() ? sanitizeId(slug) : cleanId,
        description: description.trim(),
        order: Number(order),
        ...(mode === 'create' ? { status } : {})
      });
      onClose();
    } catch (err: any) {
      setError(err.message || 'Gagal menyimpan Level');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-white text-sm">
              {mode === 'create' ? `Tambah Level Baru (${courseId})` : `Edit Level: ${initialLevel?.id}`}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          {error && <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-xl">{error}</div>}

          {mode === 'create' ? (
            <div className="space-y-1">
              <label className="text-slate-400 font-medium">Deterministic Stable ID</label>
              <input
                type="text"
                value={customId}
                onChange={e => setCustomId(e.target.value)}
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-amber-500"
              />
              <p className="text-[10px] text-slate-500">ID deterministik stabil (contoh: {courseId}-lvl-{order})</p>
            </div>
          ) : (
            <div className="space-y-1">
              <label className="text-slate-400 font-medium">Stable Level ID</label>
              <input
                type="text"
                value={initialLevel?.id}
                disabled
                className="w-full px-3 py-2 bg-slate-950/50 border border-slate-800 rounded-xl text-slate-400 font-mono"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-slate-400 font-medium">Judul Level</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="contoh: Level 0 — Absolute Beginner"
              required
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-medium">Deskripsi Level</label>
            <textarea
              rows={2}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Deskripsi target pembelajaran pada level ini..."
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-slate-400 font-medium">Urutan (Order)</label>
              <input
                type="number"
                value={order}
                onChange={e => setOrder(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {mode === 'create' && (
              <div className="space-y-1">
                <label className="text-slate-400 font-medium">Status Awal</label>
                <select
                  value={status}
                  onChange={e => setStatus(e.target.value as ContentStatus)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="draft">DRAFT</option>
                  <option value="review">REVIEW</option>
                  <option value="published">PUBLISHED</option>
                </select>
              </div>
            )}
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold shadow-lg shadow-amber-600/20 disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? 'Menyimpan...' : mode === 'create' ? 'Buat Level' : 'Simpan Perubahan'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface ModuleModalProps {
  mode: 'create' | 'edit';
  courseId: string;
  levelId: string;
  initialModule?: CmsModule;
  nextOrder?: number;
  onClose: () => void;
  onSave: (data: Partial<CmsModule>) => Promise<void>;
}

export const ModuleModal: React.FC<ModuleModalProps> = ({
  mode,
  courseId,
  levelId,
  initialModule,
  nextOrder = 0,
  onClose,
  onSave
}) => {
  const [customId, setCustomId] = useState(
    initialModule?.id || generateModuleId(levelId, nextOrder)
  );
  const [title, setTitle] = useState(initialModule?.title || '');
  const [description, setDescription] = useState(initialModule?.description || '');
  const [order, setOrder] = useState<number>(initialModule?.order ?? nextOrder);
  const [status, setStatus] = useState<ContentStatus>(initialModule?.status || 'draft');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Judul Modul wajib diisi');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const cleanId = sanitizeId(customId);
      if (!cleanId) {
        throw new Error('ID Modul tidak valid');
      }

      await onSave({
        id: mode === 'create' ? cleanId : initialModule?.id,
        courseId,
        levelId,
        title: title.trim(),
        description: description.trim(),
        order: Number(order),
        ...(mode === 'create' ? { status } : {})
      });
      onClose();
    } catch (err: any) {
      setError(err.message || 'Gagal menyimpan Modul');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderPlus className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-white text-sm">
              {mode === 'create' ? `Tambah Modul Baru (${levelId})` : `Edit Modul: ${initialModule?.id}`}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          {error && <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-xl">{error}</div>}

          {mode === 'create' ? (
            <div className="space-y-1">
              <label className="text-slate-400 font-medium">Deterministic Stable ID</label>
              <input
                type="text"
                value={customId}
                onChange={e => setCustomId(e.target.value)}
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-amber-500"
              />
              <p className="text-[10px] text-slate-500">ID deterministik stabil (contoh: {levelId}-mod-{order})</p>
            </div>
          ) : (
            <div className="space-y-1">
              <label className="text-slate-400 font-medium">Stable Module ID</label>
              <input
                type="text"
                value={initialModule?.id}
                disabled
                className="w-full px-3 py-2 bg-slate-950/50 border border-slate-800 rounded-xl text-slate-400 font-mono"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-slate-400 font-medium">Judul Modul</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="contoh: Dasar Struktur Tag HTML"
              required
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 font-medium">Deskripsi Modul</label>
            <textarea
              rows={2}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Deskripsi materi dan latihan di modul ini..."
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-slate-400 font-medium">Urutan (Order)</label>
              <input
                type="number"
                value={order}
                onChange={e => setOrder(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {mode === 'create' && (
              <div className="space-y-1">
                <label className="text-slate-400 font-medium">Status Awal</label>
                <select
                  value={status}
                  onChange={e => setStatus(e.target.value as ContentStatus)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="draft">DRAFT</option>
                  <option value="review">REVIEW</option>
                  <option value="published">PUBLISHED</option>
                </select>
              </div>
            )}
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold shadow-lg shadow-amber-600/20 disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? 'Menyimpan...' : mode === 'create' ? 'Buat Modul' : 'Simpan Perubahan'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
