import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  HelpCircle, 
  Plus, 
  Trash2, 
  Lock, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle,
  RefreshCw,
  Download,
  Key
} from 'lucide-react';
import { QuizQuestion } from '../../types';
import { QuizSolutionDoc } from '../../services/curriculum/types';
import { cmsDataService } from '../../services/curriculum/cmsDataService';

interface AdminQuizEditorProps {
  lessonId: string;
  lessonTitle: string;
  initialQuestions?: QuizQuestion[];
  onClose: () => void;
  onSaveSuccess?: () => void;
  onNotify?: (msg: { type: 'success' | 'error'; text: string }) => void;
}

export const AdminQuizEditor: React.FC<AdminQuizEditorProps> = ({
  lessonId,
  lessonTitle,
  initialQuestions = [],
  onClose,
  onSaveSuccess,
  onNotify
}) => {
  const [activeTab, setActiveTab] = useState<'questions' | 'solutions'>('questions');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Questions State
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  // Secret Answer Key Solutions State
  const [solutionsMap, setSolutionsMap] = useState<Record<string, { correctAnswerIndex: number; explanation: string }>>({});

  useEffect(() => {
    loadQuizData();
  }, [lessonId]);

  const loadQuizData = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Load protected solution key doc from CMS
      const solDoc = await cmsDataService.getQuizSolution(lessonId).catch(() => null);

      // 2. Use initialQuestions or questions from CMS
      let currentQuestions = [...initialQuestions];

      if (currentQuestions.length === 0) {
        const lesson = await cmsDataService.getCourse('').catch(() => null); // or fallback
      }

      if (currentQuestions.length === 0) {
        currentQuestions = [
          {
            id: `q-1`,
            question: '',
            options: ['', '', '', ''],
            correctAnswerIndex: 0,
            explanation: ''
          }
        ];
      }

      setQuestions(currentQuestions);

      // Build solutions map
      const map: Record<string, { correctAnswerIndex: number; explanation: string }> = {};
      if (solDoc && Array.isArray(solDoc.solutions) && solDoc.solutions.length > 0) {
        solDoc.solutions.forEach(s => {
          map[s.questionId] = {
            correctAnswerIndex: Number(s.correctAnswerIndex) || 0,
            explanation: s.explanation || ''
          };
        });
      } else {
        currentQuestions.forEach(q => {
          map[q.id] = {
            correctAnswerIndex: Number(q.correctAnswerIndex) || 0,
            explanation: q.explanation || ''
          };
        });
      }

      setSolutionsMap(map);
    } catch (err: any) {
      console.error('Failed to load quiz data:', err);
      setError(err.message || 'Gagal memuat data kuis');
    } finally {
      setLoading(false);
    }
  };

  const handleAddQuestion = () => {
    const newId = `q-${questions.length + 1}`;
    setQuestions([
      ...questions,
      {
        id: newId,
        question: '',
        options: ['', '', '', ''],
        correctAnswerIndex: 0,
        explanation: ''
      }
    ]);
    setSolutionsMap(prev => ({
      ...prev,
      [newId]: { correctAnswerIndex: 0, explanation: '' }
    }));
  };

  const handleUpdateQuestion = (qIndex: number, field: string, val: any) => {
    const next = [...questions];
    next[qIndex] = { ...next[qIndex], [field]: val };
    setQuestions(next);
  };

  const handleUpdateOption = (qIndex: number, optIndex: number, val: string) => {
    const next = [...questions];
    const opts = [...(next[qIndex].options || ['', '', '', ''])];
    opts[optIndex] = val;
    next[qIndex].options = opts;
    setQuestions(next);
  };

  const handleRemoveQuestion = (qIndex: number) => {
    const qToRemove = questions[qIndex];
    const nextQs = questions.filter((_, i) => i !== qIndex);
    setQuestions(nextQs);

    if (qToRemove) {
      const nextMap = { ...solutionsMap };
      delete nextMap[qToRemove.id];
      setSolutionsMap(nextMap);
    }
  };

  const handleUpdateSolutionKey = (questionId: string, correctAnswerIndex: number, explanation?: string) => {
    setSolutionsMap(prev => ({
      ...prev,
      [questionId]: {
        correctAnswerIndex,
        explanation: explanation !== undefined ? explanation : (prev[questionId]?.explanation || '')
      }
    }));
  };

  const handleImportStaticQuiz = async () => {
    if (!confirm(`Import kuis statis untuk lesson "${lessonTitle}"? Kuis dan kunci jawaban akan disinkronkan ke Firestore.`)) return;
    setImporting(true);
    try {
      const res = await cmsDataService.importStaticQuiz(lessonId);
      if (onNotify) onNotify({ type: 'success', text: `Berhasil mengimpor ${res.questionsImported} pertanyaan kuis!` });
      await loadQuizData();
    } catch (err: any) {
      if (onNotify) onNotify({ type: 'error', text: err.message || 'Gagal mengimpor kuis statis' });
    } finally {
      setImporting(false);
    }
  };

  const handleSaveAll = async () => {
    setSaving(true);
    setError(null);
    try {
      // 1. Prepare protected quiz solution doc
      const solutionItems = questions.map(q => ({
        questionId: q.id,
        correctAnswerIndex: solutionsMap[q.id]?.correctAnswerIndex ?? q.correctAnswerIndex ?? 0,
        explanation: solutionsMap[q.id]?.explanation || q.explanation || ''
      }));

      // 2. Save protected solution key to /quiz_solutions/{lessonId}
      await cmsDataService.updateQuizSolution(lessonId, {
        lessonId,
        solutions: solutionItems
      });

      if (onNotify) onNotify({ type: 'success', text: `Kunci jawaban kuis untuk "${lessonTitle}" berhasil disimpan!` });
      if (onSaveSuccess) onSaveSuccess();
      onClose();
    } catch (err: any) {
      console.error('Error saving quiz editor:', err);
      setError(err.message || 'Gagal menyimpan data kuis');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Quiz & Security CMS Editor</span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 font-mono">
                  {lessonId}
                </span>
              </h2>
              <p className="text-xs text-slate-400">{lessonTitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleImportStaticQuiz}
              disabled={importing}
              className="px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Import kuis statis dari kurikulum"
            >
              <Download className={`w-3.5 h-3.5 ${importing ? 'animate-bounce' : ''}`} />
              <span>{importing ? 'Mengimpor...' : 'Import Kuis Statis'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-5 pt-3 border-b border-slate-800 bg-slate-950/40">
          <button
            onClick={() => setActiveTab('questions')}
            className={`px-4 py-2.5 rounded-t-lg font-bold text-xs flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'questions'
                ? 'border-purple-500 text-purple-400 bg-purple-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Daftar Pertanyaan ({questions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('solutions')}
            className={`px-4 py-2.5 rounded-t-lg font-bold text-xs flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'solutions'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>Kunci Jawaban Protected (/quiz_solutions)</span>
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="m-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
          {loading ? (
            <div className="py-12 text-center text-slate-400 text-sm flex flex-col items-center gap-2">
              <RefreshCw className="w-6 h-6 animate-spin text-purple-400" />
              <span>Memuat data kuis dan kunci jawaban...</span>
            </div>
          ) : activeTab === 'questions' ? (
            /* QUESTIONS TAB */
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Pertanyaan & Pilihan Ganda</h3>
                  <p className="text-xs text-slate-400">Pertanyaan ini dapat diakses oleh siswa. Kunci jawaban diisolasi dari siswa.</p>
                </div>

                <button
                  onClick={handleAddQuestion}
                  className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Pertanyaan</span>
                </button>
              </div>

              {questions.map((q, qIndex) => (
                <div key={q.id || qIndex} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-400">Pertanyaan #{qIndex + 1} ({q.id})</span>
                    <button
                      onClick={() => handleRemoveQuestion(qIndex)}
                      className="p-1 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                      title="Hapus Pertanyaan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Question Text */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Teks Pertanyaan</label>
                    <textarea
                      value={q.question}
                      onChange={(e) => handleUpdateQuestion(qIndex, 'question', e.target.value)}
                      placeholder="Masukkan pertanyaan kuis..."
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                      rows={2}
                    />
                  </div>

                  {/* 4 Options */}
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-slate-300">Pilihan Jawaban (Options)</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(q.options || ['', '', '', '']).map((opt, optIndex) => (
                        <div key={optIndex} className="flex items-center gap-2">
                          <span className="text-xs font-mono text-slate-500 w-4">{String.fromCharCode(65 + optIndex)}.</span>
                          <input
                            type="text"
                            value={opt}
                            onChange={(e) => handleUpdateOption(qIndex, optIndex, e.target.value)}
                            placeholder={`Pilihan ${String.fromCharCode(65 + optIndex)}`}
                            className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* SOLUTIONS TAB */
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-3">
                <Lock className="w-5 h-5 flex-shrink-0 text-emerald-400 mt-0.5" />
                <div>
                  <p className="font-bold mb-1">Keamanan Kunci Jawaban Kuis (/quiz_solutions)</p>
                  <p className="text-emerald-200/80 leading-relaxed">
                    Jawaban benar dan penjelasan tersimpan di koleksi Firestore khusus Admin. Endpoint student hanya mengembalikan hasil evaluasi setelah kuis dikirim.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {questions.map((q, qIndex) => {
                  const sol = solutionsMap[q.id] || { correctAnswerIndex: 0, explanation: '' };
                  return (
                    <div key={q.id || qIndex} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                      <div className="font-bold text-xs text-slate-200">
                        {qIndex + 1}. {q.question || '(Belum ada pertanyaan)'}
                      </div>

                      {/* Select Correct Answer */}
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Indeks Jawaban Benar</label>
                        <select
                          value={sol.correctAnswerIndex}
                          onChange={(e) => handleUpdateSolutionKey(q.id, Number(e.target.value), sol.explanation)}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-emerald-400 font-bold focus:outline-none focus:border-emerald-500"
                        >
                          {(q.options || ['', '', '', '']).map((opt, optIdx) => (
                            <option key={optIdx} value={optIdx}>
                              Opsi {String.fromCharCode(65 + optIdx)}: {opt || '(Kosong)'}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Explanation */}
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Penjelasan / Pembahasan (Secret Explanation)</label>
                        <textarea
                          value={sol.explanation}
                          onChange={(e) => handleUpdateSolutionKey(q.id, sol.correctAnswerIndex, e.target.value)}
                          placeholder="Penjelasan mengapa opsi ini benar..."
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                          rows={2}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-800 flex items-center justify-between bg-slate-900/90">
          <span className="text-xs text-slate-500">
            Kuis & Kunci Jawaban
          </span>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-800 hover:bg-slate-800 text-slate-300 font-bold text-xs transition-colors cursor-pointer"
            >
              Batal
            </button>

            <button
              type="button"
              onClick={handleSaveAll}
              disabled={saving}
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Menyimpan...' : 'Simpan Kuis & Kunci Jawaban'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
