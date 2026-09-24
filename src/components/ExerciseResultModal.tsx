import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  X, 
  AlertTriangle,
  Code2,
  Terminal,
  Award
} from 'lucide-react';
import { ExerciseEvaluationResult } from '../services/exercises/exerciseTypes';

interface ExerciseResultModalProps {
  result: ExerciseEvaluationResult;
  isOpen: boolean;
  onClose: () => void;
  onNextLesson?: () => void;
  nextLessonTitle?: string;
  onRetry?: () => void;
}

export const ExerciseResultModal: React.FC<ExerciseResultModalProps> = ({
  result,
  isOpen,
  onClose,
  onNextLesson,
  nextLessonTitle,
  onRetry
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className={`p-6 border-b ${
          result.passed 
            ? 'bg-gradient-to-r from-emerald-950/60 to-teal-900/40 border-emerald-500/30' 
            : 'bg-gradient-to-r from-amber-950/60 to-rose-950/40 border-amber-500/30'
        } flex items-start justify-between relative`}>
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold shadow-lg ${
              result.passed 
                ? 'bg-emerald-600 text-white shadow-emerald-600/30' 
                : 'bg-amber-600 text-white shadow-amber-600/30'
            }`}>
              {result.passed ? <CheckCircle2 className="w-7 h-7" /> : <AlertTriangle className="w-7 h-7" />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100">
                {result.passed ? 'Evaluasi Berhasil Tuntas!' : 'Evaluasi Belum Tuntas'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {result.testsPassed} dari {result.testsRun} pengujian berhasil dilewati
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* XP Reward Celebration Banner */}
          {result.passed && (result.xpEarned || 0) > 0 && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-indigo-500/10 border border-amber-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-amber-300 uppercase tracking-wider">Hadiah XP Diberikan</div>
                  <div className="text-sm font-bold text-slate-100">+{result.xpEarned} XP diperoleh</div>
                </div>
              </div>
              <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
            </div>
          )}

          {/* Feedback Message */}
          {result.feedback && (
            <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
              result.passed
                ? 'bg-emerald-950/20 border-emerald-500/20 text-emerald-200'
                : 'bg-amber-950/20 border-amber-500/20 text-amber-200'
            }`}>
              <div className="font-bold mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Umpan Balik Evaluator:</span>
              </div>
              <p>{result.feedback}</p>
            </div>
          )}

          {/* Visible Test Results List */}
          {result.visibleTestResults && result.visibleTestResults.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                <span>Hasil Pengujian Publik ({result.visibleTestResults.filter(t => t.passed).length}/{result.visibleTestResults.length})</span>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {result.visibleTestResults.map((test) => (
                  <div
                    key={test.id}
                    className={`p-3 rounded-xl border text-xs flex items-start justify-between gap-3 ${
                      test.passed 
                        ? 'bg-slate-900/90 border-emerald-500/30 text-slate-200' 
                        : 'bg-slate-900/90 border-rose-500/30 text-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      {test.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className="font-semibold text-slate-200">{test.name}</div>
                        {test.description && (
                          <div className="text-slate-400 text-[11px] mt-0.5">{test.description}</div>
                        )}
                        {test.message && (
                          <div className={`text-[11px] mt-1 ${test.passed ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {test.message}
                          </div>
                        )}
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                      test.passed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                    }`}>
                      {test.passed ? 'PASS' : 'FAIL'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Program Output Sample */}
          {result.output && (
            <div className="space-y-1.5">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Keluaran Eksekusi Program</span>
              </div>
              <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 max-h-32 overflow-auto whitespace-pre-wrap">
                {result.output}
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              if (onRetry) onRetry();
              onClose();
            }}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Perbaiki Kode</span>
          </button>

          {result.passed && onNextLesson ? (
            <button
              onClick={() => {
                onClose();
                onNextLesson();
              }}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{nextLessonTitle ? `Lanjut: ${nextLessonTitle}` : 'Materi Berikutnya'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              Tutup & Edit
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
