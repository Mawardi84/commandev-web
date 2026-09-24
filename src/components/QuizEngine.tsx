import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { QuizQuestion } from '../types';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Award, 
  HelpCircle, 
  Loader2, 
  FileText, 
  Check, 
  ListChecks, 
  AlertCircle 
} from 'lucide-react';
import { cmsDataService } from '../services/curriculum/cmsDataService';
import { analyticsService } from '../services/analytics';

export interface QuizAttemptState {
  lessonId: string;
  questionIds: string[];
  currentQuestionIndex: number;
  answers: Record<string, number>; // questionId -> selectedOptionIndex
  startedAt: string;
  status: 'in-progress' | 'review' | 'submitting' | 'submitted';
}

interface ServerQuizEvaluation {
  questionId: string;
  question: string;
  options: string[];
  selectedOptionIndex: number;
  correctAnswerIndex: number;
  isCorrect: boolean;
  explanation: string;
}

interface ServerQuizResult {
  lessonId: string;
  passed: boolean;
  scorePercentage: number;
  correctCount: number;
  totalQuestions: number;
  xpEarned: number;
  alreadyCompleted?: boolean;
  evaluations: ServerQuizEvaluation[];
}

interface QuizEngineProps {
  lessonId?: string;
  quizTitle?: string;
  quizDescription?: string;
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
  isCompleted?: boolean;
  onNextLesson?: () => void;
  nextLessonTitle?: string;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({ 
  lessonId = 'default-quiz',
  quizTitle,
  quizDescription,
  questions, 
  onComplete, 
  isCompleted,
  onNextLesson,
  nextLessonTitle
}) => {
  const primaryStorageKey = useMemo(() => `commandev_quiz_attempt_${lessonId}`, [lessonId]);
  const legacyStorageKey = useMemo(() => `codera_quiz_attempt_${lessonId}`, [lessonId]);
  const questionIds = useMemo(() => questions.map((q, idx) => q.id || `q-${idx + 1}`), [questions]);

  // Attempt State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [viewMode, setViewMode] = useState<'question' | 'review' | 'result'>('question');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [serverResult, setServerResult] = useState<ServerQuizResult | null>(null);

  // Restore active attempt from localStorage on mount
  useEffect(() => {
    if (isCompleted) {
      setViewMode('result');
      return;
    }

    try {
      const savedRaw = localStorage.getItem(primaryStorageKey) || localStorage.getItem(legacyStorageKey);
      if (savedRaw) {
        const parsed: QuizAttemptState = JSON.parse(savedRaw);
        // Validate saved state matches current quiz
        const isValid = 
          parsed && 
          parsed.lessonId === lessonId &&
          Array.isArray(parsed.questionIds) &&
          parsed.questionIds.length === questionIds.length &&
          parsed.questionIds.every((id, i) => id === questionIds[i]);

        if (isValid && parsed.status !== 'submitted') {
          setAnswers(parsed.answers || {});
          setCurrentIndex(Math.min(parsed.currentQuestionIndex || 0, questions.length - 1));
          if (parsed.status === 'review') {
            setViewMode('review');
          }
        } else {
          localStorage.removeItem(primaryStorageKey);
          localStorage.removeItem(legacyStorageKey);
        }
      }
    } catch {
      localStorage.removeItem(primaryStorageKey);
      localStorage.removeItem(legacyStorageKey);
    }

    // Observational Telemetry: Track quiz started
    try {
      analyticsService.trackQuizStarted(lessonId, undefined, undefined, questions.length);
    } catch {
      // Non-blocking
    }
  }, [lessonId, primaryStorageKey, legacyStorageKey, questionIds, isCompleted, questions.length]);

  // Save attempt to localStorage on state changes
  const persistAttempt = useCallback((updatedAnswers: Record<string, number>, targetIdx: number, targetStatus: 'in-progress' | 'review') => {
    try {
      const state: QuizAttemptState = {
        lessonId,
        questionIds,
        currentQuestionIndex: targetIdx,
        answers: updatedAnswers,
        startedAt: new Date().toISOString(),
        status: targetStatus
      };
      localStorage.setItem(primaryStorageKey, JSON.stringify(state));
      localStorage.setItem(legacyStorageKey, JSON.stringify(state));
    } catch {
      // Ignore storage quota error safely
    }
  }, [lessonId, questionIds, primaryStorageKey, legacyStorageKey]);

  // Current Question
  const currentQ = questions[currentIndex];
  const currentQId = currentQ?.id || `q-${currentIndex + 1}`;
  const selectedOptionIndex = answers[currentQId];
  const isCurrentAnswered = selectedOptionIndex !== undefined;

  // Answer selection handler
  const handleSelectOption = (optIdx: number) => {
    if (submitting) return;
    const nextAnswers = { ...answers, [currentQId]: optIdx };
    setAnswers(nextAnswers);
    persistAttempt(nextAnswers, currentIndex, 'in-progress');
  };

  // Navigation handlers
  const handlePrev = () => {
    if (currentIndex > 0) {
      const nextIdx = currentIndex - 1;
      setCurrentIndex(nextIdx);
      persistAttempt(answers, nextIdx, 'in-progress');
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      persistAttempt(answers, nextIdx, 'in-progress');
    } else {
      // Reached the end, switch to review screen
      setViewMode('review');
      persistAttempt(answers, currentIndex, 'review');
    }
  };

  const handleJumpToQuestion = (idx: number) => {
    setCurrentIndex(idx);
    setViewMode('question');
    persistAttempt(answers, idx, 'in-progress');
  };

  // Submit Quiz for Server-Side Evaluation with Local Fallback
  const handleSubmitQuiz = async () => {
    if (submitting) return; // Prevent double-submission
    setSubmitting(true);
    setErrorMsg(null);

    try {
      // Normalize answers object for server evaluation
      const answersMap: Record<string, number> = {};
      questions.forEach((q, idx) => {
        const qId = q.id || `q-${idx + 1}`;
        answersMap[qId] = answers[qId] !== undefined ? answers[qId] : -1;
      });

      let res;
      try {
        res = await cmsDataService.submitQuiz(lessonId, answersMap, questions);
      } catch (submitErr) {
        console.warn('Evaluation fallback to internal QuizEngine logic:', submitErr);
        let correctCount = 0;
        const evaluations = questions.map((q, idx) => {
          const qId = q.id || `q-${idx + 1}`;
          const selected = answersMap[qId] !== undefined ? answersMap[qId] : -1;
          const correct = q.correctAnswerIndex ?? 0;
          const isCorrect = selected >= 0 && selected === correct;
          if (isCorrect) correctCount++;
          return {
            questionId: qId,
            question: q.question,
            options: q.options || [],
            selectedOptionIndex: selected,
            correctAnswerIndex: correct,
            isCorrect,
            explanation: q.explanation || ''
          };
        });
        const totalQuestions = questions.length;
        const scorePercentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
        const passed = scorePercentage >= 70;
        res = {
          lessonId,
          passed,
          scorePercentage,
          correctCount,
          totalQuestions,
          xpEarned: passed ? 50 : 0,
          alreadyCompleted: false,
          evaluations
        };
      }

      setServerResult(res);
      setViewMode('result');

      // Clear local attempt state upon submission
      localStorage.removeItem(primaryStorageKey);
      localStorage.removeItem(legacyStorageKey);

      if (res.passed && !isCompleted) {
        onComplete(res.xpEarned);
      }

      // Observational Telemetry: Track quiz attempt (Non-blocking)
      try {
        analyticsService.trackQuizAttempted(lessonId, res.scorePercentage, res.passed);
      } catch {
        // Non-blocking
      }
    } catch (err: any) {
      console.error('Quiz submission error:', err);
      setErrorMsg(err.message || 'Gagal mengirim jawaban kuis. Silakan coba kembali.');
    } finally {
      setSubmitting(false);
    }
  };

  // Reset / Retry Quiz
  const handleRetry = () => {
    setAnswers({});
    setCurrentIndex(0);
    setViewMode('question');
    setServerResult(null);
    setErrorMsg(null);
    localStorage.removeItem(primaryStorageKey);
    localStorage.removeItem(legacyStorageKey);
  };

  // Count answered questions
  const answeredCount = Object.keys(answers).filter(qId => answers[qId] !== undefined).length;
  const allAnswered = answeredCount === questions.length;

  // ==========================================
  // VIEW: RESULT SCREEN
  // ==========================================
  if (viewMode === 'result') {
    const isPassing = serverResult ? serverResult.passed : (isCompleted ?? true);
    const scorePercentage = serverResult 
      ? serverResult.scorePercentage 
      : (isCompleted && Object.keys(answers).length === 0 ? 100 : Math.round((answeredCount / (questions.length || 1)) * 100));
    
    const correctCount = serverResult?.correctCount ?? Math.round((scorePercentage / 100) * questions.length);
    const totalQuestions = serverResult?.totalQuestions ?? questions.length;
    const isAlreadyCompleted = serverResult?.alreadyCompleted || (isCompleted && !serverResult?.xpEarned);
    const xpEarned = serverResult?.xpEarned ?? (isAlreadyCompleted ? 0 : 50);

    const evaluations = serverResult?.evaluations || questions.map((q, idx) => {
      const qId = q.id || `q-${idx + 1}`;
      const userChoice = answers[qId] ?? -1;
      return {
        questionId: qId,
        question: q.question,
        options: q.options,
        selectedOptionIndex: userChoice,
        correctAnswerIndex: q.correctAnswerIndex ?? 0,
        isCorrect: userChoice >= 0 && q.correctAnswerIndex !== undefined && userChoice === q.correctAnswerIndex,
        explanation: q.explanation || ''
      };
    });

    // Learning Feedback Generator based on score
    const getFeedbackMessage = () => {
      if (scorePercentage >= 90) {
        return {
          title: 'Pemahaman Sempurna!',
          desc: 'Luar biasa! Kamu telah menguasai seluruh konsep inti pada modul kuis ini dengan sangat mendalam.',
          badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
        };
      }
      if (scorePercentage >= 70) {
        return {
          title: 'Hasil Solid — Kompetensi Tercapai',
          desc: 'Bagus sekali! Kamu telah memenuhi standar kelulusan materi ini dan siap melanjutkan ke materi berikutnya.',
          badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20'
        };
      }
      if (scorePercentage >= 50) {
        return {
          title: 'Hampir Lulus — Perlu Review Singkat',
          desc: 'Pemahaman dasar kamu sudah terbentuk. Silakan cermati penjelasan pada soal yang belum tepat sebelum mencoba kembali.',
          badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
        };
      }
      return {
        title: 'Disarankan Membaca Ulang Materi',
        desc: 'Konsep materi belum terkuasai sepenuhnya. Disarankan membaca kembali bab teori & rangkuman sebelum mengulang kuis.',
        badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
      };
    };

    const feedback = getFeedbackMessage();

    return (
      <div className="max-w-3xl mx-auto p-6 md:p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 text-center space-y-6">
        <div className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center shadow-lg ${
          isPassing 
            ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 shadow-emerald-600/20' 
            : 'bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 shadow-rose-600/20'
        }`}>
          <Award className="w-10 h-10" />
        </div>
        
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border mb-1">
            <span className={`w-2 h-2 rounded-full ${isPassing ? 'bg-emerald-500' : 'bg-rose-500'}`} />
            <span className={isPassing ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}>
              {isPassing ? 'LULUS (≥ 70%)' : 'BELUM LULUS (< 70%)'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {feedback.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
            {feedback.desc}
          </p>
        </div>

        {/* Score Metrics Bento */}
        <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400">{scorePercentage}%</div>
            <div className="text-[11px] uppercase font-bold text-slate-500 mt-1">Skor Kuis</div>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">{correctCount} / {totalQuestions}</div>
            <div className="text-[11px] uppercase font-bold text-slate-500 mt-1">Jawaban Benar</div>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className={`text-2xl sm:text-3xl font-black ${xpEarned > 0 ? 'text-amber-500' : 'text-slate-400'}`}>
              +{xpEarned}
            </div>
            <div className="text-[11px] uppercase font-bold text-slate-500 mt-1 truncate" title={isAlreadyCompleted ? 'Sudah pernah diklaim' : 'XP Diperoleh'}>
              {isAlreadyCompleted ? 'XP (Terklaim)' : 'XP Diperoleh'}
            </div>
          </div>
        </div>

        {/* Review Breakdown with Explanations */}
        <div className="text-left space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-indigo-400" />
              <span>Evaluasi & Pembahasan Soal:</span>
            </h3>
            <span className="text-[11px] text-slate-400 font-semibold">
              {correctCount} dari {totalQuestions} benar
            </span>
          </div>

          <div className="space-y-3 max-h-[45vh] overflow-y-auto custom-scrollbar pr-1">
            {evaluations.map((item, idx) => (
              <div key={item.questionId || idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <span className="font-bold text-slate-900 dark:text-slate-200 leading-snug">
                    {idx + 1}. {item.question}
                  </span>
                  {item.isCorrect ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Benar
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 shrink-0">
                      <XCircle className="w-3.5 h-3.5" /> Belum Tepat
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400 font-semibold block mb-0.5">Pilihan Jawaban Anda:</span>
                    <span className={item.isCorrect ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-rose-600 dark:text-rose-400 font-bold'}>
                      {item.selectedOptionIndex >= 0 && item.options && item.options[item.selectedOptionIndex]
                        ? item.options[item.selectedOptionIndex]
                        : 'Tidak dijawab'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400 font-semibold block mb-0.5">Kunci Jawaban Valid:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                      {item.options && item.options[item.correctAnswerIndex]
                        ? item.options[item.correctAnswerIndex]
                        : `Opsi #${item.correctAnswerIndex + 1}`}
                    </span>
                  </div>
                </div>

                {item.explanation && (
                  <div className="p-2.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/50 dark:border-indigo-800/50 text-[11px] text-indigo-700 dark:text-indigo-300">
                    <span className="font-bold">Penjelasan: </span>{item.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={handleRetry}
            className="w-full sm:w-auto px-5 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Ulangi Kuis</span>
          </button>

          {isPassing && (
            <button
              onClick={onNextLesson}
              className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <span>{nextLessonTitle ? `Lanjut ke: ${nextLessonTitle}` : 'Selesai & Kembali ke Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: REVIEW SUMMARY SCREEN
  // ==========================================
  if (viewMode === 'review') {
    return (
      <div className="max-w-2xl mx-auto p-6 md:p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <ListChecks className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <span>Review Jawaban Kuis</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Periksa kembali seluruh jawaban sebelum mengirim ke server untuk evaluasi akhir.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
            {answeredCount} / {questions.length} Terjawab
          </span>
        </div>

        {errorMsg && (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="space-y-3 max-h-[50vh] overflow-y-auto custom-scrollbar pr-1">
          {questions.map((q, idx) => {
            const qId = q.id || `q-${idx + 1}`;
            const chosenIdx = answers[qId];
            const isAnswered = chosenIdx !== undefined;

            return (
              <div 
                key={qId} 
                onClick={() => handleJumpToQuestion(idx)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                  isAnswered 
                    ? 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-indigo-500' 
                    : 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/50 hover:border-amber-500'
                }`}
              >
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900 dark:text-white">Soal #{idx + 1}</span>
                    {isAnswered ? (
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Terjawab
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">
                        Belum dijawab
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 line-clamp-1">
                    {q.question}
                  </p>
                  {isAnswered && (
                    <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold truncate">
                      Pilihan: {q.options[chosenIdx]}
                    </p>
                  )}
                </div>

                <button 
                  type="button"
                  className="px-3 py-1.5 text-xs font-bold rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-indigo-600 shrink-0"
                >
                  Ubah
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setViewMode('question')}
            disabled={submitting}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Soal</span>
          </button>

          <button
            onClick={handleSubmitQuiz}
            disabled={submitting || answeredCount === 0}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Mengevaluasi di Server...</span>
              </>
            ) : (
              <>
                <span>Kirim Jawaban Kuis</span>
                <CheckCircle2 className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: ACTIVE QUESTION ATTEMPT SCREEN
  // ==========================================
  return (
    <div className="max-w-2xl mx-auto p-6 md:p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 space-y-6">
      
      {/* Quiz Header & Metadata */}
      {(quizTitle || quizDescription) && (
        <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
          {quizTitle && (
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-500" />
              <span>{quizTitle}</span>
            </h3>
          )}
          {quizDescription && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {quizDescription}
            </p>
          )}
        </div>
      )}

      {/* Progress & Quick Navigation Pill Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500">
          <span>Pertanyaan {currentIndex + 1} dari {questions.length}</span>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">{answeredCount}/{questions.length} Terjawab</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-black">
              {Math.round(((currentIndex + 1) / questions.length) * 100)}%
            </span>
          </div>
        </div>

        {/* Linear Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-indigo-600 h-full transition-all duration-300 ease-out" 
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question Navigation Navigator Pills */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          {questions.map((q, idx) => {
            const qId = q.id || `q-${idx + 1}`;
            const isAnswered = answers[qId] !== undefined;
            const isCurrent = currentIndex === idx;

            let pillClass = "bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700";
            if (isCurrent) {
              pillClass = "bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-600/30 scale-105";
            } else if (isAnswered) {
              pillClass = "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30";
            }

            return (
              <button
                key={qId}
                onClick={() => handleJumpToQuestion(idx)}
                className={`w-7 h-7 rounded-lg text-xs font-bold border transition-all cursor-pointer flex items-center justify-center ${pillClass}`}
                title={`Soal #${idx + 1}: ${isAnswered ? 'Sudah Dijawab' : 'Belum Dijawab'}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Question Text */}
      <div className="pt-2">
        <h2 className="text-xl sm:text-2xl font-bold leading-snug text-slate-900 dark:text-white">
          {currentQ?.question}
        </h2>
      </div>

      {/* Question Options */}
      <div className="space-y-2.5">
        {(currentQ?.options || []).map((option, idx) => {
          const isSelected = selectedOptionIndex === idx;

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              className={`w-full text-left px-5 py-3.5 rounded-2xl border-2 transition-all text-xs sm:text-sm font-medium flex items-center justify-between cursor-pointer min-h-[48px] ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 hover:border-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center border shrink-0 ${
                  isSelected 
                    ? 'bg-indigo-600 text-white border-indigo-600' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{option}</span>
              </div>
              {isSelected && <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Navigation & Action Bar */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Sebelumnya</span>
        </button>

        <div className="flex items-center gap-2">
          {currentIndex === questions.length - 1 ? (
            <button
              onClick={() => setViewMode('review')}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <span>Review Jawaban</span>
              <ListChecks className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <span>Selanjutnya</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
