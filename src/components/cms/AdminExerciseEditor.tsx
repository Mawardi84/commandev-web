import React, { useState } from 'react';
import { 
  X, 
  Save, 
  Terminal, 
  Plus, 
  Trash2, 
  HelpCircle, 
  Lock, 
  AlertTriangle, 
  Code2, 
  CheckCircle2, 
  FileText,
  Key
} from 'lucide-react';
import { CmsExercise, ContentStatus, ExerciseTest } from '../../services/curriculum/types';
import { sanitizeId, generateExerciseId } from '../../services/curriculum/idUtils';

interface AdminExerciseEditorProps {
  mode: 'create' | 'edit';
  courseId: string;
  levelId: string;
  moduleId: string;
  lessonId: string;
  exercise?: Partial<CmsExercise> & {
    solutionCode?: string;
    expectedOutput?: string;
    hiddenTests?: ExerciseTest[];
    gradingRules?: string;
  };
  onClose: () => void;
  onSave: (exerciseData: any) => Promise<void>;
}

type TabType = 'basic' | 'instructions' | 'starter' | 'tests' | 'hints' | 'solution';

export const AdminExerciseEditor: React.FC<AdminExerciseEditorProps> = ({
  mode,
  courseId,
  levelId,
  moduleId,
  lessonId,
  exercise,
  onClose,
  onSave
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('basic');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Public Exercise Fields
  const [id, setId] = useState(exercise?.id || '');
  const [title, setTitle] = useState(exercise?.title || '');
  const [slug, setSlug] = useState(exercise?.slug || (exercise?.title ? sanitizeId(exercise.title) : ''));
  const [description, setDescription] = useState(exercise?.description || '');
  const [instructions, setInstructions] = useState(exercise?.instructions || '');
  const [type, setType] = useState<string>(exercise?.type || 'code');
  const [language, setLanguage] = useState(exercise?.language || 'web');
  const [runtime, setRuntime] = useState(exercise?.runtime || 'browser');
  const [xpReward, setXpReward] = useState<number>(exercise?.xpReward ?? 15);
  const [order, setOrder] = useState<number>(exercise?.order ?? 1);
  const [status, setStatus] = useState<ContentStatus>(exercise?.status || 'draft');

  // Starter Codes
  const [starterCode, setStarterCode] = useState(exercise?.starterCode || '');
  const [starterCss, setStarterCss] = useState(exercise?.starterCss || '');
  const [starterJs, setStarterJs] = useState(exercise?.starterJs || '');
  const [starterPy, setStarterPy] = useState(exercise?.starterPy || '');

  // Requirements & Visible Tests
  const [requirements, setRequirements] = useState<{ id: string; description: string }[]>(
    exercise?.requirements && Array.isArray(exercise.requirements)
      ? exercise.requirements.map(r => ({ id: r.id || `req-${Date.now()}`, description: r.description || '' }))
      : [{ id: `req-1`, description: '' }]
  );

  const [visibleTests, setVisibleTests] = useState<ExerciseTest[]>(
    exercise?.visibleTests && Array.isArray(exercise.visibleTests)
      ? exercise.visibleTests
      : []
  );

  // Hints
  const [hints, setHints] = useState<string[]>(
    exercise?.hints && Array.isArray(exercise.hints)
      ? exercise.hints.map(h => (typeof h === 'string' ? h : (h as any).text || ''))
      : []
  );

  // Private Solution Fields (Stored separately in /exercise_solutions/{exerciseId})
  const [solutionCode, setSolutionCode] = useState(exercise?.solutionCode || '');
  const [expectedOutput, setExpectedOutput] = useState(exercise?.expectedOutput || '');
  const [hiddenTests, setHiddenTests] = useState<ExerciseTest[]>(
    exercise?.hiddenTests && Array.isArray(exercise.hiddenTests)
      ? exercise.hiddenTests
      : []
  );
  const [gradingRules, setGradingRules] = useState(exercise?.gradingRules || '');

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (mode === 'create') {
      const generatedSlug = sanitizeId(newTitle);
      setSlug(generatedSlug);
      if (!id || id.startsWith(lessonId)) {
        setId(generateExerciseId(lessonId, generatedSlug || 'ex-1'));
      }
    }
  };

  const handleAddRequirement = () => {
    setRequirements([...requirements, { id: `req-${Date.now()}`, description: '' }]);
  };

  const handleUpdateRequirement = (index: number, desc: string) => {
    const next = [...requirements];
    next[index].description = desc;
    setRequirements(next);
  };

  const handleRemoveRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const handleAddVisibleTest = () => {
    setVisibleTests([...visibleTests, { id: `test-${Date.now()}`, name: 'Tes Publik', testCode: '' }]);
  };

  const handleAddHiddenTest = () => {
    setHiddenTests([...hiddenTests, { id: `htest-${Date.now()}`, name: 'Tes Rahasia (Private)', testCode: '' }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Judul Latihan wajib diisi');
      return;
    }

    if (mode === 'create' && !id.trim()) {
      setError('ID Latihan wajib diisi');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const payload: any = {
        title: title.trim(),
        slug: slug.trim() || sanitizeId(title),
        description: description.trim(),
        instructions: instructions.trim(),
        type,
        language,
        runtime,
        xpReward: Number(xpReward) || 10,
        order: Number(order) || 1,
        status,
        starterCode,
        starterCss,
        starterJs,
        starterPy,
        requirements: requirements.filter(r => r.description.trim() !== ''),
        visibleTests,
        hints: hints.filter(h => h.trim() !== ''),
        courseId,
        levelId,
        moduleId,
        lessonId,
        // Solution Data
        solutionCode,
        expectedOutput,
        hiddenTests,
        gradingRules
      };

      if (mode === 'create') {
        payload.id = id.trim();
      }

      await onSave(payload);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Gagal menyimpan latihan');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                {mode === 'create' ? 'Tambah Latihan / Exercise' : `Edit Latihan: ${title || exercise?.id}`}
                <span className="text-xs px-2 py-0.5 rounded-full font-mono font-normal bg-slate-800 text-slate-400">
                  {lessonId}
                </span>
              </h2>
              <p className="text-[11px] text-slate-500">
                Lesson Parent: {lessonId} &bull; Module: {moduleId}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-4 border-b border-slate-800 bg-slate-950/40 shrink-0 overflow-x-auto">
          {[
            { id: 'basic', label: 'Informasi Dasar', icon: FileText },
            { id: 'instructions', label: 'Instruksi & Syarat', icon: CheckCircle2 },
            { id: 'starter', label: 'Starter Code', icon: Code2 },
            { id: 'tests', label: `Public Tests (${visibleTests.length})`, icon: Terminal },
            { id: 'hints', label: `Hints (${hints.length})`, icon: HelpCircle },
            { id: 'solution', label: '🔒 Solution (Admin Only)', icon: Key }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-3 py-2.5 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? tab.id === 'solution' ? 'border-rose-400 text-rose-400 bg-rose-500/5' : 'border-indigo-400 text-indigo-400 bg-indigo-400/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-xs">
          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-xl flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* TAB 1: BASIC INFORMATION */}
          {activeTab === 'basic' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Judul Latihan *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={e => handleTitleChange(e.target.value)}
                    required
                    placeholder="Contoh: Membuat Elemen Paragraf & Link"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">
                    Exercise ID {mode === 'edit' ? '(Permanen/Immutable)' : '*'}
                  </label>
                  <input
                    type="text"
                    value={id}
                    onChange={e => setId(e.target.value)}
                    disabled={mode === 'edit'}
                    required
                    placeholder="Contoh: les-0-1-1-ex-1"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-400 disabled:opacity-50 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Tipe Exercise</label>
                  <select
                    value={type}
                    onChange={e => setType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-400"
                  >
                    <option value="code">Code (Praktik Koding)</option>
                    <option value="debug">Debug (Perbaiki Bug)</option>
                    <option value="predict-output">Predict Output</option>
                    <option value="scenario">Scenario</option>
                    <option value="challenge">Challenge (Tantangan Mandiri)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Bahasa Pemrograman</label>
                  <input
                    type="text"
                    value={language}
                    onChange={e => setLanguage(e.target.value)}
                    placeholder="html, css, javascript, python, dll."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Runtime</label>
                  <input
                    type="text"
                    value={runtime}
                    onChange={e => setRuntime(e.target.value)}
                    placeholder="browser, node, python"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">XP Reward</label>
                  <input
                    type="number"
                    value={xpReward}
                    onChange={e => setXpReward(Number(e.target.value))}
                    min={0}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Urutan (Order)</label>
                  <input
                    type="number"
                    value={order}
                    onChange={e => setOrder(Number(e.target.value))}
                    min={0}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Status CMS</label>
                  <select
                    value={status}
                    onChange={e => setStatus(e.target.value as ContentStatus)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-400 font-medium"
                  >
                    <option value="draft">Draft (Tersembunyi)</option>
                    <option value="review">Review (Moderasi)</option>
                    <option value="published">Published (Siswa Bisa Akses)</option>
                    <option value="archived">Archived (Diarsipkan)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Deskripsi Singkat Latihan</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={2}
                  placeholder="Ringkasan tugas atau instruksi utama latihan..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-400"
                />
              </div>
            </div>
          )}

          {/* TAB 2: INSTRUCTIONS & REQUIREMENTS */}
          {activeTab === 'instructions' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Instruksi Lengkap (Markdown Supported)</label>
                <textarea
                  value={instructions}
                  onChange={e => setInstructions(e.target.value)}
                  rows={4}
                  placeholder="Instruksi terperinci mengenai apa yang harus dibuat oleh siswa..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-indigo-400"
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="text-slate-300 font-medium">Kriteria Keberhasilan / Requirements</label>
                  <button
                    type="button"
                    onClick={handleAddRequirement}
                    className="flex items-center gap-1 px-2.5 py-1 bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 rounded-lg text-[11px] font-semibold transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Tambah Requirement
                  </button>
                </div>

                {requirements.map((req, index) => (
                  <div key={req.id || index} className="flex items-center gap-2">
                    <span className="text-slate-500 text-[10px] w-5 text-right font-mono">{index + 1}.</span>
                    <input
                      type="text"
                      value={req.description}
                      onChange={e => handleUpdateRequirement(index, e.target.value)}
                      placeholder="Contoh: Buat tag <h1> berisi text 'Halo World'"
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-indigo-400"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveRequirement(index)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: STARTER CODE */}
          {activeTab === 'starter' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-slate-300 font-medium font-mono">Starter Code (HTML / Main)</label>
                <textarea
                  value={starterCode}
                  onChange={e => setStarterCode(e.target.value)}
                  rows={4}
                  placeholder="<!-- Starter HTML Code -->"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-mono text-xs focus:outline-none focus:border-indigo-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium font-mono">Starter CSS</label>
                  <textarea
                    value={starterCss}
                    onChange={e => setStarterCss(e.target.value)}
                    rows={4}
                    placeholder="/* Starter CSS Code */"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-mono text-xs focus:outline-none focus:border-indigo-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium font-mono">Starter JavaScript</label>
                  <textarea
                    value={starterJs}
                    onChange={e => setStarterJs(e.target.value)}
                    rows={4}
                    placeholder="// Starter JavaScript Code"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-mono text-xs focus:outline-none focus:border-indigo-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium font-mono">Starter Python</label>
                <textarea
                  value={starterPy}
                  onChange={e => setStarterPy(e.target.value)}
                  rows={3}
                  placeholder="# Starter Python Code"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-mono text-xs focus:outline-none focus:border-indigo-400"
                />
              </div>
            </div>
          )}

          {/* TAB 4: VISIBLE TESTS */}
          {activeTab === 'tests' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-slate-200 font-medium">Pengujian Publik (Visible Test Cases)</h3>
                  <p className="text-[11px] text-slate-500">
                    Tes yang ditampilkan kepada siswa di editor untuk memvalidasi pengerjaan.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddVisibleTest}
                  className="flex items-center gap-1 px-2.5 py-1 bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 rounded-lg text-[11px] font-semibold transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Tambah Visible Test
                </button>
              </div>

              {visibleTests.length === 0 ? (
                <p className="text-slate-500 italic py-4 text-center border border-dashed border-slate-800 rounded-xl">
                  Belum ada test case publik.
                </p>
              ) : (
                visibleTests.map((t, idx) => (
                  <div key={t.id || idx} className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={t.name || ''}
                        onChange={e => {
                          const next = [...visibleTests];
                          next[idx].name = e.target.value;
                          setVisibleTests(next);
                        }}
                        placeholder="Nama Tes (Contoh: Menghasilkan output yang benar)"
                        className="bg-transparent border-b border-slate-800 px-2 py-1 text-white font-medium focus:outline-none focus:border-indigo-400"
                      />
                      <button
                        type="button"
                        onClick={() => setVisibleTests(visibleTests.filter((_, i) => i !== idx))}
                        className="text-slate-500 hover:text-rose-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <textarea
                      value={t.testCode || ''}
                      onChange={e => {
                        const next = [...visibleTests];
                        next[idx].testCode = e.target.value;
                        setVisibleTests(next);
                      }}
                      rows={2}
                      placeholder="// Kode uji JavaScript / Assertion"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-mono text-[11px] focus:outline-none focus:border-indigo-400"
                    />
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 5: HINTS */}
          {activeTab === 'hints' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-slate-200 font-medium">Petunjuk Bantuan (Public Hints)</h3>
                  <p className="text-[11px] text-slate-500">
                    Bantuan bertahap yang dapat dibuka oleh siswa jika mengalami kesulitan.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setHints([...hints, ''])}
                  className="flex items-center gap-1 px-2.5 py-1 bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 rounded-lg text-[11px] font-semibold transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Tambah Hint
                </button>
              </div>

              {hints.map((hint, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-slate-500 text-[10px] w-5 text-right font-mono">{idx + 1}.</span>
                  <input
                    type="text"
                    value={hint}
                    onChange={e => {
                      const next = [...hints];
                      next[idx] = e.target.value;
                      setHints(next);
                    }}
                    placeholder="Petunjuk bantuan untuk siswa..."
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-indigo-400"
                  />
                  <button
                    type="button"
                    onClick={() => setHints(hints.filter((_, i) => i !== idx))}
                    className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB 6: PRIVATE SOLUTION (ADMIN ONLY) */}
          {activeTab === 'solution' && (
            <div className="space-y-4">
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-300 flex items-start gap-2.5">
                <Lock className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                <div className="text-[11px] space-y-0.5">
                  <p className="font-semibold text-rose-200">Data Kunci Jawaban & Hidden Tests Terproteksi</p>
                  <p className="text-rose-300/80">
                    Data di tab ini disimpan terpisah pada koleksi <code>/exercise_solutions</code> dan <strong>TIDAK PERNAH</strong> dikirimkan ke browser siswa.
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium font-mono">Kode Kunci Jawaban (Solution Code)</label>
                <textarea
                  value={solutionCode}
                  onChange={e => setSolutionCode(e.target.value)}
                  rows={5}
                  placeholder="// Full working solution code..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-mono text-xs focus:outline-none focus:border-rose-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium font-mono">Expected Output</label>
                <textarea
                  value={expectedOutput}
                  onChange={e => setExpectedOutput(e.target.value)}
                  rows={2}
                  placeholder="Output yang diharapkan di konsol..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-mono text-xs focus:outline-none focus:border-rose-400"
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-slate-200 font-medium">Hidden Test Cases (Server Evaluation)</h4>
                    <p className="text-[10px] text-slate-500">Tes rahasia untuk pencegahan kecurangan.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddHiddenTest}
                    className="flex items-center gap-1 px-2.5 py-1 bg-rose-600/20 text-rose-300 hover:bg-rose-600/30 rounded-lg text-[11px] font-semibold transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Tambah Hidden Test
                  </button>
                </div>

                {hiddenTests.map((ht, idx) => (
                  <div key={ht.id || idx} className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={ht.name || ''}
                        onChange={e => {
                          const next = [...hiddenTests];
                          next[idx].name = e.target.value;
                          setHiddenTests(next);
                        }}
                        placeholder="Nama Hidden Test"
                        className="bg-transparent border-b border-slate-800 px-2 py-1 text-white font-medium focus:outline-none focus:border-rose-400"
                      />
                      <button
                        type="button"
                        onClick={() => setHiddenTests(hiddenTests.filter((_, i) => i !== idx))}
                        className="text-slate-500 hover:text-rose-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <textarea
                      value={ht.testCode || ''}
                      onChange={e => {
                        const next = [...hiddenTests];
                        next[idx].testCode = e.target.value;
                        setHiddenTests(next);
                      }}
                      rows={2}
                      placeholder="// Hidden assertion test code"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-mono text-[11px] focus:outline-none focus:border-rose-400"
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Aturan Penilaian / Grading Notes</label>
                <textarea
                  value={gradingRules}
                  onChange={e => setGradingRules(e.target.value)}
                  rows={2}
                  placeholder="Catatan aturan penilaian atau bobot kriteria..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-rose-400"
                />
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between shrink-0">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Menyimpan...' : 'Simpan Latihan'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
