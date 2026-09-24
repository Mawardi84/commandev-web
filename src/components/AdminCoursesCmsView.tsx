import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Plus, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  FileEdit, 
  Archive, 
  Eye, 
  Trash2, 
  History,
  Check,
  Sparkles
} from 'lucide-react';
import { cmsDataService } from '../services/curriculum/cmsDataService';
import { CmsCourse, ContentStatus, AuditLogEntry } from '../services/curriculum/types';
import { COURSES } from '../data/curriculum';
import { CourseItem } from './cms/CourseItem';

export const AdminCoursesCmsView: React.FC = () => {
  const [courses, setCourses] = useState<CmsCourse[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSubTab, setActiveSubTab] = useState<'courses' | 'create' | 'audit'>('courses');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form State
  const [formId, setFormId] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formShortDesc, setFormShortDesc] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formIcon, setFormIcon] = useState('code');
  const [formStatus, setFormStatus] = useState<ContentStatus>('draft');
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [courseList, logs] = await Promise.all([
        cmsDataService.listCourses().catch(() => []),
        cmsDataService.getAuditLogs().catch(() => [])
      ]);
      setCourses(courseList);
      setAuditLogs(logs);
    } catch (err: any) {
      setError(err.message || 'Gagal memuat data kurikulum CMS');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formId.trim() || !formTitle.trim()) {
      setError('ID dan Judul Kursus wajib diisi');
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      await cmsDataService.createCourse({
        id: formId.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '-'),
        title: formTitle.trim(),
        shortDescription: formShortDesc.trim(),
        description: formDesc.trim(),
        icon: formIcon,
        status: formStatus,
        order: courses.length + 1
      });

      setSuccessMessage(`Kursus "${formTitle}" berhasil dibuat dengan status ${formStatus.toUpperCase()}!`);
      setFormId('');
      setFormTitle('');
      setFormShortDesc('');
      setFormDesc('');
      setActiveSubTab('courses');
      await loadData();
    } catch (err: any) {
      setError(err.message || 'Gagal membuat kursus baru');
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (courseId: string, newStatus: ContentStatus) => {
    try {
      await cmsDataService.updateCourseStatus(courseId, newStatus);
      setSuccessMessage(`Status kursus berhasil diubah menjadi ${newStatus.toUpperCase()}`);
      await loadData();
    } catch (err: any) {
      setError(err.message || 'Gagal mengubah status kursus');
    }
  };

  const handleUpdateCourse = async (courseId: string, updates: Partial<CmsCourse>) => {
    try {
      await cmsDataService.updateCourse(courseId, updates);
      await loadData();
    } catch (err: any) {
      setError(err.message || 'Gagal memperbarui kursus');
      throw err;
    }
  };

  const handleReorderCourse = async (courseId: string, newOrder: number) => {
    try {
      await cmsDataService.updateCourse(courseId, { order: newOrder });
      await loadData();
    } catch (err: any) {
      setError(err.message || 'Gagal mengubah urutan kursus');
    }
  };

  const handleDelete = async (courseId: string) => {
    try {
      await cmsDataService.deleteCourse(courseId);
      setSuccessMessage(`Kursus ${courseId} telah dihapus.`);
      await loadData();
    } catch (err: any) {
      setError(err.message || 'Gagal menghapus kursus');
    }
  };

  const handleSeedStaticCourses = async () => {
    if (!confirm('Impor seluruh kurikulum statis (Kursus, Level, & Modul) ke CMS secara aman (idempotent)? Konten yang sudah ada tidak akan ditimpa atau dihapus.')) return;
    setLoading(true);
    setError(null);
    try {
      const result = await cmsDataService.importAllStaticCurriculum();
      setSuccessMessage(
        `Impor kurikulum statis selesai: ${result.coursesCreated} kursus baru (${result.coursesSkipped} sudah ada), ${result.levelsCreated} level baru (${result.levelsSkipped} sudah ada), ${result.modulesCreated} modul baru (${result.modulesSkipped} sudah ada).`
      );
      await loadData();
    } catch (err: any) {
      setError(err.message || 'Gagal mengimpor kurikulum statis');
    } finally {
      setLoading(false);
    }
  };

  const handleNotify = (msg: { type: 'success' | 'error'; text: string }) => {
    if (msg.type === 'success') {
      setSuccessMessage(msg.text);
      setError(null);
    } else {
      setError(msg.text);
      setSuccessMessage(null);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-amber-500" />
            <span>Manajemen Kurikulum CMS</span>
          </h1>
          <p className="text-xs text-slate-400">
            Fondasi CMS & Firestore Content Model dengan lifecycle DRAFT, REVIEW, PUBLISHED, dan ARCHIVED.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadData}
            disabled={loading}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Muat Ulang"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-amber-400' : ''}`} />
          </button>
          
          <button
            onClick={() => setActiveSubTab('create')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg shadow-amber-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Kursus Baru</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveSubTab('courses')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
            activeSubTab === 'courses' ? 'bg-amber-500/20 text-amber-400' : 'text-slate-400 hover:text-white'
          }`}
        >
          Daftar Kursus CMS ({courses.length})
        </button>
        <button
          onClick={() => setActiveSubTab('create')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
            activeSubTab === 'create' ? 'bg-amber-500/20 text-amber-400' : 'text-slate-400 hover:text-white'
          }`}
        >
          Buat Kursus
        </button>
        <button
          onClick={() => setActiveSubTab('audit')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
            activeSubTab === 'audit' ? 'bg-amber-500/20 text-amber-400' : 'text-slate-400 hover:text-white'
          }`}
        >
          Audit Log Keamanan ({auditLogs.length})
        </button>
      </div>

      {/* Notifications */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* TAB 1: Courses List */}
      {activeSubTab === 'courses' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-400">
              Menampilkan kursus yang dikelola oleh Firestore CMS Content Model.
            </div>
            {courses.length === 0 && !loading && (
              <button
                onClick={handleSeedStaticCourses}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 text-xs font-semibold"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Inisialisasi 4 Kursus Inti ke CMS</span>
              </button>
            )}
          </div>

          {courses.length === 0 && !loading ? (
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
              <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
              <div className="text-sm font-bold text-slate-300">Belum Ada Kursus Terdaftar di Firestore CMS</div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Kurikulum saat ini masih beroperasi menggunakan static fallback (COURSES). Anda dapat membuat kursus baru atau menginisialisasi kursus inti.
              </p>
            </div>
          ) : (
            <div className="grid gap-3">
              {courses.map(course => (
                <CourseItem
                  key={course.id}
                  course={course}
                  onDeleteCourse={handleDelete}
                  onStatusChange={handleStatusChange}
                  onUpdateCourse={handleUpdateCourse}
                  onReorder={handleReorderCourse}
                  onNotify={handleNotify}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Create Course Form */}
      {activeSubTab === 'create' && (
        <form onSubmit={handleCreateCourse} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white">Buat Kursus Baru di CMS</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-400">ID Kursus (Stable Legacy ID)</label>
              <input
                type="text"
                value={formId}
                onChange={e => setFormId(e.target.value)}
                placeholder="contoh: vuejs-mastery"
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400">Judul Kursus</label>
              <input
                type="text"
                value={formTitle}
                onChange={e => setFormTitle(e.target.value)}
                placeholder="contoh: Vue 3 Composition API & State"
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-400">Deskripsi Singkat</label>
            <input
              type="text"
              value={formShortDesc}
              onChange={e => setFormShortDesc(e.target.value)}
              placeholder="Ringkasan 1 kalimat yang tampil di kartu kursus..."
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-400">Deskripsi Lengkap Silabus</label>
            <textarea
              rows={3}
              value={formDesc}
              onChange={e => setFormDesc(e.target.value)}
              placeholder="Penjelasan mendalam silabus dan tujuan pembelajaran..."
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-400">Icon / Kategori Visual</label>
              <select
                value={formIcon}
                onChange={e => setFormIcon(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
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
              <label className="text-xs text-slate-400">Status Awal</label>
              <select
                value={formStatus}
                onChange={e => setFormStatus(e.target.value as ContentStatus)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="draft">DRAFT (Hanya terlihat oleh admin)</option>
                <option value="review">REVIEW (Tahap evaluasi)</option>
                <option value="published">PUBLISHED (Dapat diakses oleh siswa)</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setActiveSubTab('courses')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-amber-600/20 disabled:opacity-50"
            >
              {submitting ? 'Menyimpan...' : 'Simpan Kursus ke CMS'}
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: Audit Logs */}
      {activeSubTab === 'audit' && (
        <div className="space-y-3">
          <div className="text-xs text-slate-400">
            Catatan log audit immutable mencatat semua aksi administratif pada konten CMS.
          </div>

          {auditLogs.length === 0 ? (
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-500">
              Belum ada log audit yang tersimpan.
            </div>
          ) : (
            <div className="rounded-xl bg-slate-900 border border-slate-800 divide-y divide-slate-800 overflow-hidden">
              {auditLogs.map((log, idx) => (
                <div key={log.id || idx} className="p-3 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-amber-400">{log.action}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 uppercase">
                        {log.targetType}: {log.targetId}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Admin UID: <code className="text-slate-400">{log.adminId}</code>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {new Date(log.timestamp).toLocaleString('id-ID')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
