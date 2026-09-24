import React, { useState } from 'react';
import { 
  Trophy, 
  XCircle, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  RefreshCw, 
  Copy, 
  Check, 
  Clock, 
  Info, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight,
  SlidersHorizontal,
  Send,
  FileCode
} from 'lucide-react';
import { PublicProjectEvaluationResult, PublicCriterionResult } from '../../types/projectEvaluation';
import { PublicProjectProgressDTO } from '../../types/projectProgress';

export interface ProjectResultFeedbackProps {
  result: PublicProjectEvaluationResult | null;
  progress?: PublicProjectProgressDTO | null;
  state?: 'idle' | 'submitting' | 'evaluating' | 'success' | 'error' | 'invalid';
  errorMessage?: string | null;
  isSubmitting?: boolean;
  onRetry?: () => void;
  onImprove?: () => void;
  onClose?: () => void;
  onSubmitNew?: () => void;
  compact?: boolean;
}

export const ProjectResultFeedback: React.FC<ProjectResultFeedbackProps> = ({
  result,
  progress,
  state = result ? 'success' : 'idle',
  errorMessage,
  isSubmitting = false,
  onRetry,
  onImprove,
  onClose,
  onSubmitNew,
  compact = false
}) => {
  const [criteriaFilter, setCriteriaFilter] = useState<'all' | 'passed' | 'failed'>('all');
  const [copiedId, setCopiedId] = useState<boolean>(false);

  const activeProgress = progress || result?.progress;

  const handleCopySubmissionId = () => {
    if (result?.submissionId) {
      navigator.clipboard.writeText(result.submissionId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  // ==========================================
  // STATE A: NO SUBMISSION YET
  // ==========================================
  if (state === 'idle' && !result) {
    return (
      <div 
        role="region" 
        aria-label="Status Evaluasi Proyek"
        className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-4"
      >
        <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
          <FileCode className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-white">Belum Ada Evaluasi</h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
            Kirimkan kode proyek Anda ke server evaluator otoritatif setelah Anda merasa pengerjaan telah siap.
          </p>
        </div>
        {onSubmitNew && (
          <button
            onClick={onSubmitNew}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Kirim Proyek Sekarang</span>
          </button>
        )}
      </div>
    );
  }

  // ==========================================
  // STATE B & C: SUBMITTING / EVALUATING
  // ==========================================
  if (state === 'submitting' || state === 'evaluating') {
    return (
      <div 
        role="status" 
        aria-live="polite"
        className="py-10 px-4 text-center space-y-4 rounded-2xl bg-slate-900/40 border border-slate-800"
      >
        <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center animate-spin">
          <RefreshCw className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-white">
            {state === 'submitting' ? 'Mengirimkan Berkas Proyek...' : 'Mengevaluasi Kriteria Otoritatif...'}
          </h4>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            Sistem backend sedang melakukan pengujian kode secara statis, aman, dan deterministik.
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // STATE G: NETWORK FAILURE & STATE H: SERVER ERROR
  // ==========================================
  if (state === 'error' || state === 'invalid') {
    const isNetwork = !errorMessage || errorMessage.toLowerCase().includes('koneksi') || errorMessage.toLowerCase().includes('network') || errorMessage.toLowerCase().includes('failed to fetch');
    return (
      <div 
        role="alert" 
        aria-live="assertive"
        className="p-5 rounded-2xl bg-rose-950/30 border border-rose-800/80 text-rose-200 text-xs space-y-3.5 animate-fadeIn"
      >
        <div className="flex items-center gap-2.5 font-bold text-rose-300">
          <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0" />
          <span className="text-sm">
            {state === 'invalid' 
              ? 'Validasi Pengiriman Gagal' 
              : isNetwork 
                ? 'Gagal Menghubungi Layanan Evaluasi' 
                : 'Layanan Evaluasi Tidak Tersedia'}
          </span>
        </div>

        <p className="leading-relaxed text-slate-300">
          {errorMessage || (isNetwork 
            ? 'Tidak dapat terhubung ke server evaluator saat ini. Pastikan koneksi internet Anda stabil.' 
            : 'Kami tidak dapat mengevaluasi pengiriman proyek ini sekarang. Harap coba beberapa saat lagi.')}
        </p>

        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 space-y-1">
          <div className="font-semibold text-slate-300 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Draft Pengerjaan Aman</span>
          </div>
          <p>
            Kode pengerjaan Anda tetap tersimpan utuh di editor. Tidak ada progres yang hilang.
          </p>
        </div>

        {onRetry && (
          <div className="pt-1 flex items-center gap-2">
            <button
              onClick={onRetry}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 active:scale-98 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-rose-600/30 transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSubmitting ? 'animate-spin' : ''}`} />
              <span>Coba Kirim Lagi</span>
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
              >
                Kembali ke Editor
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // STATE D, E, F: SUCCESSFUL EVALUATION RESULT
  // ==========================================
  if (!result) return null;

  const totalCriteria = result.criteriaResults.length;
  const passedCriteriaCount = result.criteriaResults.filter(c => c.passed).length;
  const failedCriteriaCount = totalCriteria - passedCriteriaCount;

  const filteredCriteria = result.criteriaResults.filter(c => {
    if (criteriaFilter === 'passed') return c.passed;
    if (criteriaFilter === 'failed') return !c.passed;
    return true;
  });

  return (
    <div 
      role="region" 
      aria-label="Hasil Evaluasi Proyek" 
      className="space-y-4 animate-fadeIn"
    >
      {/* 1. AUTHORITATIVE SCORE BANNER */}
      <div 
        className={`p-4 sm:p-5 rounded-2xl border transition-all ${
          result.passed
            ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-200'
            : 'bg-rose-950/30 border-rose-800/60 text-rose-200'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div 
              className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                result.passed ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30' : 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
              }`}
            >
              {result.passed ? <Trophy className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">
                  Hasil Evaluasi Otoritatif
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
                <span className="text-[10px] font-semibold text-slate-400">Server Verified</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                {result.passed ? 'LULUS EVALUASI PROYEK' : 'PERLU PERBAIKAN'}
              </h3>
            </div>
          </div>

          <div className="flex items-baseline gap-1 self-start sm:self-auto bg-slate-950/50 px-3 py-1.5 rounded-xl border border-slate-800/60">
            <span className="text-xs text-slate-400 font-semibold mr-1">Skor:</span>
            <span className="text-2xl sm:text-3xl font-black text-white">{result.score}</span>
            <span className="text-xs text-slate-400 font-medium">/ 100</span>
          </div>
        </div>

        {/* Learning status message */}
        <p className="text-xs text-slate-300 leading-relaxed mb-3">
          {result.passed
            ? 'Implementasi Anda memenuhi kriteria kelulusan proyek. Tinjau umpan balik kriteria di bawah untuk melihat rincian evaluasi.'
            : 'Implementasi belum memenuhi ambang batas minimum. Tinjau kriteria yang belum terpenuhi, lakukan perbaikan di editor, lalu kirim ulang.'}
        </p>

        {/* Accessible Progress Meter */}
        <div className="space-y-1.5">
          <div 
            role="progressbar"
            aria-valuenow={result.score}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuetext={`${result.score} dari 100 poin, ${result.passed ? 'Lulus' : 'Perlu Perbaikan'}`}
            className="w-full h-2.5 rounded-full bg-slate-950/80 overflow-hidden relative border border-slate-800"
          >
            <div 
              className={`h-full transition-all duration-500 rounded-full ${
                result.passed 
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400' 
                  : 'bg-gradient-to-r from-rose-500 to-amber-500'
              }`}
              style={{ width: `${Math.max(4, Math.min(100, result.score))}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
            <span>0%</span>
            <span className="text-amber-300 font-semibold">Ambang Kelulusan: 70%</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      {/* 1.5 AUTHORITATIVE PROJECT COMPLETION & PROGRESS CARD (PHASE 5D) */}
      {activeProgress?.completed && (
        <div 
          role="region"
          aria-label="Status Penyelesaian Proyek"
          className={`p-4 sm:p-5 rounded-2xl border transition-all ${
            activeProgress.alreadyCompleted
              ? 'bg-blue-950/20 border-blue-800/50 text-blue-200'
              : 'bg-gradient-to-r from-emerald-950/40 via-teal-950/30 to-slate-900 border-emerald-500/40 text-emerald-200 shadow-lg shadow-emerald-950/30'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div 
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  activeProgress.alreadyCompleted
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                    : 'bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-500/30'
                }`}
              >
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    PROJECT COMPLETED
                  </span>
                  {activeProgress.completedAt && (
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(activeProgress.completedAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  )}
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white">
                  {activeProgress.alreadyCompleted
                    ? 'Proyek Ini Sudah Diselesaikan Sebelumnya'
                    : 'Selamat! Proyek Selesai & Lulus Otoritatif'}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed max-w-lg">
                  {activeProgress.alreadyCompleted
                    ? 'Proyek Anda telah diverifikasi oleh server. Karena proyek ini sudah tuntas sebelumnya, tidak ada XP tambahan yang diberikan.'
                    : 'Proyek Anda memenuhi seluruh kriteria evaluasi server dan progres belajar Anda telah dicatat secara permanen.'}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end flex-shrink-0">
              <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-right">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  Project XP
                </span>
                <span className={`text-base sm:text-lg font-black ${
                  activeProgress.alreadyCompleted ? 'text-slate-400' : 'text-emerald-400'
                }`}>
                  {activeProgress.alreadyCompleted ? '+0 XP' : `+${activeProgress.xpAwarded} XP`}
                </span>
              </div>
              {activeProgress.alreadyCompleted && (
                <span className="text-[9px] text-slate-500 mt-1 font-medium">Sudah diperoleh</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. OVERALL EVALUATOR FEEDBACK */}
      {result.feedback && (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5">
          <Info className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5 flex-1">
            <span className="font-bold text-slate-200 block text-[11px] uppercase tracking-wider">
              Umpan Balik Evaluator:
            </span>
            <p className="text-slate-300">{result.feedback}</p>
          </div>
        </div>
      )}

      {/* 3. CRITERIA BREAKDOWN */}
      <div className="space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Rincian Kriteria ({totalCriteria}):
          </span>

          {/* Filter Pills */}
          <div 
            role="tablist" 
            aria-label="Filter Kriteria"
            className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px]"
          >
            <button
              role="tab"
              aria-selected={criteriaFilter === 'all'}
              onClick={() => setCriteriaFilter('all')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                criteriaFilter === 'all' 
                  ? 'bg-indigo-600 text-white shadow-xs' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Semua ({totalCriteria})
            </button>
            <button
              role="tab"
              aria-selected={criteriaFilter === 'passed'}
              onClick={() => setCriteriaFilter('passed')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                criteriaFilter === 'passed' 
                  ? 'bg-emerald-600 text-white shadow-xs' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Lulus ({passedCriteriaCount})
            </button>
            <button
              role="tab"
              aria-selected={criteriaFilter === 'failed'}
              onClick={() => setCriteriaFilter('failed')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                criteriaFilter === 'failed' 
                  ? 'bg-rose-600 text-white shadow-xs' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Perlu Perbaikan ({failedCriteriaCount})
            </button>
          </div>
        </div>

        {/* Criteria List */}
        <div 
          role="list"
          className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar pr-0.5"
        >
          {filteredCriteria.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-500 italic bg-slate-950/40 rounded-xl border border-slate-800">
              Tidak ada kriteria pada filter ini.
            </div>
          ) : (
            filteredCriteria.map((crit, idx) => (
              <div 
                key={crit.id || crit.criterionId || idx}
                role="listitem"
                className={`p-3 sm:p-3.5 rounded-xl border text-xs flex items-start gap-2.5 transition-all ${
                  crit.passed 
                    ? 'bg-emerald-950/15 border-emerald-800/40 text-emerald-100' 
                    : 'bg-rose-950/15 border-rose-800/40 text-rose-100'
                }`}
              >
                {crit.passed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                )}

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="font-bold text-white text-xs leading-snug">
                      {crit.title}
                    </span>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className={`text-[10px] px-2 py-0.5 rounded-md font-extrabold uppercase tracking-wider ${
                        crit.passed 
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}>
                        {crit.passed ? '✓ PASSED' : '✕ NOT MET'}
                      </span>
                      {typeof crit.weight === 'number' && crit.weight > 0 && (
                        <span className="text-[10px] text-slate-400 font-mono">
                          {crit.weight}%
                        </span>
                      )}
                    </div>
                  </div>

                  {crit.feedback && (
                    <p className="text-[11px] opacity-90 leading-relaxed text-slate-300">
                      {crit.feedback}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 4. SUBMISSION METADATA FOOTER */}
      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[10px] text-slate-400 font-mono flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span className="text-slate-500">Submission ID:</span>
          <span className="text-slate-300 truncate max-w-[180px] sm:max-w-none">{result.submissionId}</span>
          <button
            onClick={handleCopySubmissionId}
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Salin ID Submission"
            aria-label="Salin ID Submission"
          >
            {copiedId ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>

        <div className="flex items-center gap-1 text-slate-400">
          <Clock className="w-3 h-3 text-slate-500" />
          <span>{new Date(result.evaluatedAt).toLocaleString('id-ID')}</span>
        </div>
      </div>

      {/* 5. ACTION BUTTONS (RETRY / IMPROVE / CLOSE) */}
      {!compact && (
        <div className="pt-2 flex flex-wrap items-center justify-between gap-2.5">
          {onRetry && (
            <button
              onClick={onRetry}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-indigo-400 ${isSubmitting ? 'animate-spin' : ''}`} />
              <span>Kirim Ulang Langsung</span>
            </button>
          )}

          {onImprove && (
            <button
              onClick={onImprove}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-600/20 transition-all cursor-pointer ml-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Perbaiki Kode di Editor</span>
            </button>
          )}

          {onClose && !onImprove && (
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all cursor-pointer ml-auto"
            >
              <Check className="w-4 h-4" />
              <span>Tutup & Selesai</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
