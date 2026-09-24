import React, { useState } from 'react';
import { 
  X, 
  Save, 
  FileCode, 
  Plus, 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  Eye, 
  Code2, 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Lightbulb, 
  Layers,
  FileText
} from 'lucide-react';
import { CmsLesson, ContentStatus, ContentBlock } from '../../services/curriculum/types';
import { sanitizeId, generateLessonId } from '../../services/curriculum/idUtils';
import { cmsDataService } from '../../services/curriculum/cmsDataService';

interface AdminLessonEditorProps {
  mode: 'create' | 'edit';
  courseId: string;
  levelId: string;
  moduleId: string;
  lesson?: CmsLesson;
  onClose: () => void;
  onSave: (lessonData: Partial<CmsLesson>) => Promise<void>;
}

type TabType = 'basic' | 'content' | 'starter' | 'hints' | 'quiz' | 'preview';

export const AdminLessonEditor: React.FC<AdminLessonEditorProps> = ({
  mode,
  courseId,
  levelId,
  moduleId,
  lesson,
  onClose,
  onSave
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('basic');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Basic Information
  const [id, setId] = useState(lesson?.id || '');
  const [title, setTitle] = useState(lesson?.title || '');
  const [slug, setSlug] = useState(lesson?.slug || (lesson?.title ? sanitizeId(lesson.title) : ''));
  const [description, setDescription] = useState(lesson?.description || '');
  const [type, setType] = useState<CmsLesson['type']>(lesson?.type || 'learn');
  const [language, setLanguage] = useState(lesson?.language || (courseId.includes('python') ? 'python' : 'web'));
  const [runtime, setRuntime] = useState(lesson?.runtime || (courseId.includes('python') ? 'python' : 'browser'));
  const [xpReward, setXpReward] = useState<number>(lesson?.xpReward ?? 10);
  const [order, setOrder] = useState<number>(lesson?.order ?? 0);
  const [status, setStatus] = useState<ContentStatus>(lesson?.status || 'draft');

  // Content Blocks
  const [blocks, setBlocks] = useState<ContentBlock[]>(
    lesson?.content && Array.isArray(lesson.content) && lesson.content.length > 0
      ? lesson.content
      : [
          { type: 'heading', text: lesson?.title || 'Pengenalan', level: 2 },
          { type: 'paragraph', text: 'Tulis penjelasan materi di sini.' }
        ]
  );

  // Starter Code
  const [starterCode, setStarterCode] = useState(lesson?.starterCode || '');
  const [starterCss, setStarterCss] = useState(lesson?.starterCss || '');
  const [starterJs, setStarterJs] = useState(lesson?.starterJs || '');
  const [starterPy, setStarterPy] = useState(lesson?.starterPy || '');

  // Hints
  const [hints, setHints] = useState<string[]>(
    lesson?.hints && Array.isArray(lesson.hints)
      ? lesson.hints.map(h => (typeof h === 'string' ? h : (h as any).text || ''))
      : []
  );

  // Quiz Questions (if type === 'quiz')
  const [questions, setQuestions] = useState<any[]>(
    lesson?.questions && Array.isArray(lesson.questions)
      ? lesson.questions.map(q => ({
          id: q.id,
          question: q.question || '',
          options: Array.isArray(q.options) && q.options.length === 4 ? q.options : ['', '', '', ''],
          correctAnswerIndex: Number((q as any).correctAnswerIndex) || 0,
          explanation: (q as any).explanation || ''
        }))
      : [
          {
            id: `q-1`,
            question: '',
            options: ['', '', '', ''],
            correctAnswerIndex: 0,
            explanation: ''
          }
        ]
  );

  // Auto-generate ID if empty in create mode
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (mode === 'create') {
      const generatedSlug = sanitizeId(newTitle);
      setSlug(generatedSlug);
      if (!id || id.startsWith(moduleId)) {
        setId(`${moduleId}-${generatedSlug || 'lesson'}`);
      }
    }
  };

  // Block Manipulation
  const handleAddBlock = (blockType: ContentBlock['type']) => {
    let newBlock: ContentBlock;
    switch (blockType) {
      case 'heading':
        newBlock = { type: 'heading', text: 'Subjudul Baru', level: 3 };
        break;
      case 'paragraph':
        newBlock = { type: 'paragraph', text: 'Paragraf baru...' };
        break;
      case 'code':
      case 'code-example':
        newBlock = { type: 'code-example', code: '// Contoh kode', language: language || 'javascript' };
        break;
      case 'note':
        newBlock = { type: 'note', title: 'Catatan Penting', text: 'Informasi tambahan untuk siswa.' };
        break;
      case 'tip':
        newBlock = { type: 'tip', title: 'Tips', text: 'Tips praktis mempercepat coding.' };
        break;
      case 'warning':
        newBlock = { type: 'warning', title: 'Peringatan', text: 'Hindari kesalahan umum ini.' };
        break;
      case 'example':
        newBlock = { type: 'example', title: 'Studi Kasus', code: 'console.log("Hello");', language: 'javascript', explanation: 'Penjelasan kode.' };
        break;
      case 'markdown':
      default:
        newBlock = { type: 'markdown', content: 'Teks format **markdown** di sini.' };
        break;
    }
    setBlocks([...blocks, newBlock]);
  };

  const handleUpdateBlock = (index: number, updates: Partial<ContentBlock>) => {
    const next = [...blocks];
    next[index] = { ...next[index], ...updates } as ContentBlock;
    setBlocks(next);
  };

  const handleRemoveBlock = (index: number) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  const handleMoveBlock = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === blocks.length - 1)) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const next = [...blocks];
    const temp = next[index];
    next[index] = next[targetIndex];
    next[targetIndex] = temp;
    setBlocks(next);
  };

  // Hint Manipulation
  const handleAddHint = () => {
    setHints([...hints, '']);
  };

  const handleUpdateHint = (index: number, text: string) => {
    const next = [...hints];
    next[index] = text;
    setHints(next);
  };

  const handleRemoveHint = (index: number) => {
    setHints(hints.filter((_, i) => i !== index));
  };

  // Quiz Question Manipulation
  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: `q-${questions.length + 1}`,
        question: '',
        options: ['', '', '', ''],
        correctAnswerIndex: 0,
        explanation: ''
      }
    ]);
  };

  const handleUpdateQuestion = (qIndex: number, field: string, val: any) => {
    const next = [...questions];
    next[qIndex] = { ...next[qIndex], [field]: val };
    setQuestions(next);
  };

  const handleUpdateOption = (qIndex: number, optIndex: number, val: string) => {
    const next = [...questions];
    const opts = [...next[qIndex].options];
    opts[optIndex] = val;
    next[qIndex].options = opts;
    setQuestions(next);
  };

  const handleRemoveQuestion = (qIndex: number) => {
    setQuestions(questions.filter((_, i) => i !== qIndex));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Judul Lesson wajib diisi');
      return;
    }

    if (mode === 'create' && !id.trim()) {
      setError('ID Lesson wajib diisi');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const payload: Partial<CmsLesson> = {
        title: title.trim(),
        slug: slug.trim() || sanitizeId(title),
        description: description.trim(),
        type,
        language,
        runtime,
        xpReward: Number(xpReward) || 10,
        order: Number(order) || 0,
        status,
        content: blocks,
        starterCode,
        starterCss,
        starterJs,
        starterPy,
        hints: hints.filter(h => h.trim() !== ''),
        ...(type === 'quiz' ? { questions } : {})
      };

      if (mode === 'create') {
        payload.id = id.trim();
        payload.courseId = courseId;
        payload.levelId = levelId;
        payload.moduleId = moduleId;
      }

      await onSave(payload);

      // Sync protected quiz solution key if type === 'quiz'
      const targetId = mode === 'create' ? id.trim() : (lesson?.id || id.trim());
      if (type === 'quiz' && targetId && Array.isArray(questions) && questions.length > 0) {
        const solutionItems = questions.map((q: any) => ({
          questionId: q.id,
          correctAnswerIndex: Number(q.correctAnswerIndex) || 0,
          explanation: q.explanation || ''
        }));
        await cmsDataService.updateQuizSolution(targetId, {
          lessonId: targetId,
          solutions: solutionItems
        }).catch(err => console.warn('Failed to sync quiz solution:', err));
      }

      onClose();
    } catch (err: any) {
      setError(err.message || 'Gagal menyimpan lesson');
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
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                {mode === 'create' ? 'Tambah Lesson Baru' : `Edit Lesson: ${title || lesson?.id}`}
                <span className="text-xs px-2 py-0.5 rounded-full font-mono font-normal bg-slate-800 text-slate-400">
                  {moduleId}
                </span>
              </h2>
              <p className="text-[11px] text-slate-500">
                Course: {courseId} &bull; Level: {levelId} &bull; Module: {moduleId}
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
            { id: 'content', label: `Konten (${blocks.length})`, icon: Layers },
            { id: 'starter', label: 'Starter Code', icon: Code2 },
            { id: 'hints', label: `Hints (${hints.length})`, icon: HelpCircle },
            ...(type === 'quiz' ? [{ id: 'quiz', label: `Quiz (${questions.length})`, icon: CheckCircle2 }] : []),
            { id: 'preview', label: 'Preview Siswa', icon: Eye }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'border-amber-400 text-amber-400 bg-amber-400/5'
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
                  <label className="text-slate-300 font-medium">Judul Lesson *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={e => handleTitleChange(e.target.value)}
                    required
                    placeholder="Contoh: Mengenal Tag Heading HTML"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">
                    Lesson ID {mode === 'edit' ? '(Permanen/Immutable)' : '*'}
                  </label>
                  <input
                    type="text"
                    value={id}
                    onChange={e => setId(e.target.value)}
                    disabled={mode === 'edit'}
                    required
                    placeholder="Contoh: html-basics-1"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 disabled:opacity-50 font-mono"
                  />
                  {mode === 'create' && (
                    <p className="text-[10px] text-slate-500">
                      ID stabil warisan tidak boleh diubah setelah dibuat.
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Slug</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={e => setSlug(e.target.value)}
                    placeholder="mengenal-tag-heading-html"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Tipe Lesson</label>
                  <select
                    value={type}
                    onChange={e => setType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="learn">Learn (Materi Konseptual)</option>
                    <option value="practice">Practice (Latihan Interaktif)</option>
                    <option value="challenge">Challenge (Tantangan Mandiri)</option>
                    <option value="quiz">Quiz (Evaluasi Pilihan Ganda)</option>
                    <option value="project">Project (Mini Proyek Portofolio)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Ringkasan apa yang dipelajari siswa di lesson ini..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Bahasa Pemrograman</label>
                  <input
                    type="text"
                    value={language}
                    onChange={e => setLanguage(e.target.value)}
                    placeholder="web / python / git"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Runtime</label>
                  <select
                    value={runtime}
                    onChange={e => setRuntime(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="browser">Browser Sandbox</option>
                    <option value="python">Python Pyodide Engine</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">XP Reward</label>
                  <input
                    type="number"
                    min="0"
                    max="1000"
                    value={xpReward}
                    onChange={e => setXpReward(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Urutan (Order)</label>
                  <input
                    type="number"
                    min="0"
                    value={order}
                    onChange={e => setOrder(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="space-y-1 pt-2">
                <label className="text-slate-300 font-medium">Status Publikasi</label>
                <div className="flex items-center gap-2">
                  {(['draft', 'review', 'published', 'archived'] as ContentStatus[]).map(st => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setStatus(st)}
                      className={`px-3 py-1.5 rounded-xl uppercase font-bold text-[10px] tracking-wider border transition-all ${
                        status === st
                          ? st === 'published'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                            : st === 'review'
                            ? 'bg-sky-500/20 text-sky-300 border-sky-500/50'
                            : st === 'archived'
                            ? 'bg-slate-700/50 text-slate-300 border-slate-600'
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                          : 'bg-slate-950 text-slate-500 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CONTENT BLOCK AUTHORING */}
          {activeTab === 'content' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800 flex-wrap gap-2">
                <span className="text-slate-400 font-medium">Tambah Blok Konten:</span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() => handleAddBlock('heading')}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium hover:text-white"
                  >
                    + Heading
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddBlock('paragraph')}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium hover:text-white"
                  >
                    + Paragraph
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddBlock('code-example')}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium hover:text-white"
                  >
                    + Kode
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddBlock('note')}
                    className="px-2.5 py-1 rounded-lg bg-sky-900/30 text-sky-300 border border-sky-800/40 hover:bg-sky-900/50 font-medium"
                  >
                    + Note
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddBlock('tip')}
                    className="px-2.5 py-1 rounded-lg bg-emerald-900/30 text-emerald-300 border border-emerald-800/40 hover:bg-emerald-900/50 font-medium"
                  >
                    + Tip
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddBlock('warning')}
                    className="px-2.5 py-1 rounded-lg bg-rose-900/30 text-rose-300 border border-rose-800/40 hover:bg-rose-900/50 font-medium"
                  >
                    + Warning
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddBlock('markdown')}
                    className="px-2.5 py-1 rounded-lg bg-purple-900/30 text-purple-300 border border-purple-800/40 hover:bg-purple-900/50 font-medium"
                  >
                    + Markdown
                  </button>
                </div>
              </div>

              {blocks.length === 0 ? (
                <div className="p-8 text-center border border-dashed border-slate-800 rounded-xl text-slate-500">
                  Belum ada blok konten. Klik salah satu tombol di atas untuk menambahkan materi pelajaran.
                </div>
              ) : (
                <div className="space-y-3">
                  {blocks.map((b, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-slate-500 font-bold">#{idx + 1}</span>
                          <span className="px-2 py-0.5 rounded font-mono uppercase text-[10px] font-bold bg-slate-800 text-amber-400">
                            {b.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => handleMoveBlock(idx, 'up')}
                            className="p-1 rounded text-slate-500 hover:text-white disabled:opacity-30"
                            title="Pindah ke Atas"
                          >
                            <ChevronUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === blocks.length - 1}
                            onClick={() => handleMoveBlock(idx, 'down')}
                            className="p-1 rounded text-slate-500 hover:text-white disabled:opacity-30"
                            title="Pindah ke Bawah"
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveBlock(idx)}
                            className="p-1 rounded text-slate-500 hover:text-rose-400"
                            title="Hapus Blok"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Heading Block */}
                      {b.type === 'heading' && (
                        <div className="flex gap-2">
                          <select
                            value={b.level || 2}
                            onChange={e => handleUpdateBlock(idx, { level: Number(e.target.value) as any })}
                            className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-white"
                          >
                            <option value={1}>H1</option>
                            <option value={2}>H2</option>
                            <option value={3}>H3</option>
                          </select>
                          <input
                            type="text"
                            value={b.text || ''}
                            onChange={e => handleUpdateBlock(idx, { text: e.target.value })}
                            placeholder="Teks Heading..."
                            className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white"
                          />
                        </div>
                      )}

                      {/* Paragraph Block */}
                      {b.type === 'paragraph' && (
                        <textarea
                          rows={3}
                          value={b.text || ''}
                          onChange={e => handleUpdateBlock(idx, { text: e.target.value })}
                          placeholder="Isi paragraf..."
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white resize-y"
                        />
                      )}

                      {/* Code / Code Example Block */}
                      {(b.type === 'code' || b.type === 'code-example') && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <label className="text-slate-400 text-[10px]">Bahasa:</label>
                            <input
                              type="text"
                              value={b.language || 'html'}
                              onChange={e => handleUpdateBlock(idx, { language: e.target.value })}
                              className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-white font-mono text-[10px]"
                            />
                          </div>
                          <textarea
                            rows={4}
                            value={b.code || ''}
                            onChange={e => handleUpdateBlock(idx, { code: e.target.value })}
                            placeholder="// Tulis potongan kode..."
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-emerald-400 font-mono text-[11px] resize-y"
                          />
                        </div>
                      )}

                      {/* Callout Blocks: Note, Tip, Warning */}
                      {(b.type === 'note' || b.type === 'tip' || b.type === 'warning') && (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={b.title || ''}
                            onChange={e => handleUpdateBlock(idx, { title: e.target.value })}
                            placeholder="Judul Catatan..."
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white font-semibold"
                          />
                          <textarea
                            rows={2}
                            value={b.text || ''}
                            onChange={e => handleUpdateBlock(idx, { text: e.target.value })}
                            placeholder="Pesan catatan/tip/warning..."
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white resize-y"
                          />
                        </div>
                      )}

                      {/* Markdown Block */}
                      {b.type === 'markdown' && (
                        <textarea
                          rows={4}
                          value={b.content || ''}
                          onChange={e => handleUpdateBlock(idx, { content: e.target.value })}
                          placeholder="Markdown content..."
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono resize-y"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: STARTER CODE */}
          {activeTab === 'starter' && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded-xl">
                Kode awal yang disajikan di editor siswa saat pertama kali membuka lesson ini.
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Starter Code (Utama / HTML / Python)</label>
                <textarea
                  rows={8}
                  value={starterCode}
                  onChange={e => setStarterCode(e.target.value)}
                  placeholder="<!-- Starter Code -->"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-emerald-400 font-mono text-[11px] resize-y"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Starter CSS (Opsional)</label>
                  <textarea
                    rows={4}
                    value={starterCss}
                    onChange={e => setStarterCss(e.target.value)}
                    placeholder="/* Starter CSS */"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sky-400 font-mono text-[11px] resize-y"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Starter JS (Opsional)</label>
                  <textarea
                    rows={4}
                    value={starterJs}
                    onChange={e => setStarterJs(e.target.value)}
                    placeholder="// Starter JavaScript"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-amber-400 font-mono text-[11px] resize-y"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Starter Python (Opsional)</label>
                <textarea
                  rows={4}
                  value={starterPy}
                  onChange={e => setStarterPy(e.target.value)}
                  placeholder="# Starter Python code"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-emerald-400 font-mono text-[11px] resize-y"
                />
              </div>
            </div>
          )}

          {/* TAB 4: HINTS */}
          {activeTab === 'hints' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-slate-400">Petunjuk progresif yang dapat dibuka siswa satu per satu.</p>
                <button
                  type="button"
                  onClick={handleAddHint}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Hint</span>
                </button>
              </div>

              {hints.length === 0 ? (
                <div className="p-8 text-center border border-dashed border-slate-800 rounded-xl text-slate-500">
                  Belum ada petunjuk untuk lesson ini.
                </div>
              ) : (
                <div className="space-y-2">
                  {hints.map((hintText, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
                      <span className="font-mono text-slate-500 font-bold px-2">#{hIdx + 1}</span>
                      <input
                        type="text"
                        value={hintText}
                        onChange={e => handleUpdateHint(hIdx, e.target.value)}
                        placeholder="Tulis petunjuk..."
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveHint(hIdx)}
                        className="p-1.5 text-slate-500 hover:text-rose-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: QUIZ QUESTIONS (IF TYPE === QUIZ) */}
          {type === 'quiz' && activeTab === 'quiz' && (
            <div className="space-y-4">
              <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold">Keamanan Kunci Jawaban Aktif</h4>
                  <p className="text-[11px] text-indigo-400">
                    Kunci jawaban (`correctAnswerIndex` & `explanation`) dipisahkan secara otomatis ke koleksi privat `quiz_solutions/{lesson?.id || id || 'lesson-id'}` dan tidak pernah terpapar ke klien siswa.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddQuestion}
                  className="px-3 py-1.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold flex items-center gap-1.5 shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Soal</span>
                </button>
              </div>

              {questions.map((q, qIdx) => (
                <div key={qIdx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-400">Pertanyaan #{qIdx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(qIdx)}
                      className="p-1 text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400">Teks Pertanyaan</label>
                    <input
                      type="text"
                      value={q.question}
                      onChange={e => handleUpdateQuestion(qIdx, 'question', e.target.value)}
                      placeholder="Apa fungsi dari tag <h1>?"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-slate-400">Pilihan Jawaban (Pilih radio untuk kunci benar):</label>
                    {q.options.map((opt: string, optIdx: number) => (
                      <div key={optIdx} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`correct-${qIdx}`}
                          checked={q.correctAnswerIndex === optIdx}
                          onChange={() => handleUpdateQuestion(qIdx, 'correctAnswerIndex', optIdx)}
                          className="w-4 h-4 text-emerald-500 focus:ring-emerald-500"
                        />
                        <span className="font-mono text-slate-500 w-4 font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                        <input
                          type="text"
                          value={opt}
                          onChange={e => handleUpdateOption(qIdx, optIdx, e.target.value)}
                          placeholder={`Pilihan ${String.fromCharCode(65 + optIdx)}`}
                          className={`flex-1 bg-slate-900 border rounded-lg px-3 py-1.5 text-white ${
                            q.correctAnswerIndex === optIdx ? 'border-emerald-500/50 bg-emerald-950/20' : 'border-slate-800'
                          }`}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400">Penjelasan Jawaban (Ditampilkan setelah siswa menjawab):</label>
                    <input
                      type="text"
                      value={q.explanation || ''}
                      onChange={e => handleUpdateQuestion(qIdx, 'explanation', e.target.value)}
                      placeholder="Tag <h1> merepresentasikan judul tingkat tertinggi..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 6: STUDENT PREVIEW APPROXIMATION */}
          {activeTab === 'preview' && (
            <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded font-mono uppercase text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {type}
                    </span>
                    <h3 className="font-bold text-white text-base">{title || 'Judul Lesson'}</h3>
                  </div>
                  <p className="text-slate-400 text-xs mt-0.5">{description || 'Tidak ada deskripsi'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 rounded bg-amber-500/10 text-amber-300 font-bold border border-amber-500/20 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    +{xpReward} XP
                  </span>
                </div>
              </div>

              {/* Render Structured Blocks */}
              <div className="space-y-3 pt-2">
                {blocks.map((b, i) => {
                  if (b.type === 'heading') {
                    const Tag = (b.level === 1 ? 'h1' : b.level === 3 ? 'h3' : 'h2') as any;
                    return (
                      <Tag key={i} className="font-bold text-white text-sm sm:text-base border-b border-slate-800/60 pb-1 mt-3">
                        {b.text}
                      </Tag>
                    );
                  }
                  if (b.type === 'paragraph') {
                    return (
                      <p key={i} className="text-slate-300 leading-relaxed text-xs">
                        {b.text}
                      </p>
                    );
                  }
                  if (b.type === 'code' || b.type === 'code-example') {
                    return (
                      <pre key={i} className="p-3 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto text-emerald-400 font-mono text-[11px]">
                        <code>{b.code}</code>
                      </pre>
                    );
                  }
                  if (b.type === 'note') {
                    return (
                      <div key={i} className="p-3 rounded-xl bg-sky-950/40 border border-sky-800/60 text-sky-200 space-y-1">
                        <div className="flex items-center gap-2 font-bold text-sky-300">
                          <Info className="w-3.5 h-3.5" />
                          <span>{b.title || 'Catatan'}</span>
                        </div>
                        <p className="text-[11px] leading-relaxed">{b.text}</p>
                      </div>
                    );
                  }
                  if (b.type === 'tip') {
                    return (
                      <div key={i} className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-200 space-y-1">
                        <div className="flex items-center gap-2 font-bold text-emerald-300">
                          <Lightbulb className="w-3.5 h-3.5" />
                          <span>{b.title || 'Tips'}</span>
                        </div>
                        <p className="text-[11px] leading-relaxed">{b.text}</p>
                      </div>
                    );
                  }
                  if (b.type === 'warning') {
                    return (
                      <div key={i} className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-200 space-y-1">
                        <div className="flex items-center gap-2 font-bold text-rose-300">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>{b.title || 'Peringatan'}</span>
                        </div>
                        <p className="text-[11px] leading-relaxed">{b.text}</p>
                      </div>
                    );
                  }
                  if (b.type === 'example') {
                    return (
                      <div key={i} className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                        {b.title && <div className="font-bold text-amber-300">{b.title}</div>}
                        <pre className="p-2.5 bg-slate-950 rounded-lg text-emerald-400 font-mono text-[11px] overflow-x-auto">
                          <code>{b.code}</code>
                        </pre>
                        {b.explanation && <p className="text-slate-400 text-xs">{b.explanation}</p>}
                      </div>
                    );
                  }
                  if (b.type === 'markdown') {
                    return (
                      <div key={i} className="text-slate-300 font-mono text-xs whitespace-pre-wrap">
                        {b.content}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>

              {/* Starter code preview */}
              {starterCode && (
                <div className="pt-3 border-t border-slate-800 space-y-1">
                  <span className="font-semibold text-slate-400">Editor Siswa Awal:</span>
                  <pre className="p-3 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto text-amber-300 font-mono text-[11px]">
                    <code>{starterCode}</code>
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 font-semibold"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center gap-2 shadow-lg shadow-amber-500/10 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Menyimpan...' : mode === 'create' ? 'Buat Lesson' : 'Simpan Perubahan'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
