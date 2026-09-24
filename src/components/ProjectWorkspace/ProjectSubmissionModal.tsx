import React, { useState, useEffect } from 'react';
import { 
  Send, 
  ShieldCheck, 
  FileCode, 
  X,
  Sparkles,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectItem } from '../../data/projectsData';
import { PublicProjectEvaluationResult } from '../../types/projectEvaluation';
import { auth } from '../../lib/firebase';
import { ProjectResultFeedback } from './ProjectResultFeedback';
import { analyticsService } from '../../services/analytics';

interface ProjectSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectItem;
  files: {
    html?: string;
    css?: string;
    js?: string;
    py?: string;
  };
  initialResult?: PublicProjectEvaluationResult | null;
  onSubmissionComplete?: (result: PublicProjectEvaluationResult) => void;
}

export const ProjectSubmissionModal: React.FC<ProjectSubmissionModalProps> = ({
  isOpen,
  onClose,
  project,
  files,
  initialResult = null,
  onSubmissionComplete
}) => {
  const [stage, setStage] = useState<'idle' | 'submitting' | 'evaluating' | 'success' | 'error' | 'invalid'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<PublicProjectEvaluationResult | null>(initialResult);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync state when opened or initialResult changes
  useEffect(() => {
    if (isOpen) {
      if (initialResult) {
        setResult(initialResult);
        setStage('success');
      } else {
        setStage('idle');
        setResult(null);
      }
      setIsSubmitting(false);
      setErrorMessage(null);
    }
  }, [isOpen, initialResult]);

  // Handle ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) return null;

  const isWebCategory = project.category !== 'python';

  const handleSubmit = async () => {
    if (isSubmitting) return; // Prevent duplicate submission
    setIsSubmitting(true);
    setStage('submitting');
    setErrorMessage(null);

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('Anda harus login terlebih dahulu untuk mengirimkan proyek.');
      }

      const idToken = await currentUser.getIdToken();
      setStage('evaluating');

      // Send strictly the files payload - zero learner-supplied score/XP/userId/evaluatorVersion
      const payload = {
        files: {
          ...(isWebCategory ? {
            html: files.html || '',
            css: files.css || '',
            js: files.js || ''
          } : {
            py: files.py || ''
          })
        }
      };

      const response = await fetch(`/api/projects/${project.id}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400) {
          setStage('invalid');
          throw new Error(data.error || 'Payload berkas pengiriman tidak valid.');
        }
        throw new Error(data.error || `Pengiriman gagal diproses oleh server (${response.status})`);
      }

      // Authoritative sanitized result returned by server
      const sanitized = data as PublicProjectEvaluationResult;
      setResult(sanitized);
      setStage('success');

      // Observational Telemetry (Non-blocking)
      try {
        analyticsService.trackProjectSubmitted(project.id, sanitized.submissionId);
      } catch {
        // Non-blocking
      }

      if (onSubmissionComplete) {
        onSubmissionComplete(sanitized);
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      setErrorMessage(err.message || 'Tidak dapat terhubung ke layanan evaluasi.');
      if (stage !== 'invalid') {
        setStage('error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="submission-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 15 }}
          className="bg-slate-900 border border-slate-700/80 rounded-3xl p-5 sm:p-7 max-w-xl w-full text-left shadow-2xl relative overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-800 flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30 flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 id="submission-modal-title" className="text-sm sm:text-base font-bold text-white truncate">
                  Evaluasi Server Otoritatif
                </h3>
                <p className="text-xs text-slate-400 truncate">{project.title}</p>
              </div>
            </div>

            {!isSubmitting && (
              <button 
                onClick={onClose}
                aria-label="Tutup dialog"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Body Content */}
          <div className="py-4 overflow-y-auto custom-scrollbar flex-1 space-y-4">
            
            {/* IDLE STAGE: Pre-submission File Check & Info */}
            {stage === 'idle' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-800/40 text-xs text-indigo-200 leading-relaxed space-y-2">
                  <div className="font-bold flex items-center gap-1.5 text-indigo-300">
                    <Sparkles className="w-4 h-4" />
                    <span>Pengujian Statis Otoritatif Tanpa Eksekusi Kode Berbahaya</span>
                  </div>
                  <p>
                    Kode proyek Anda akan diverifikasi oleh adapter evaluator server secara deterministik berdasarkan kriteria versi aktif.
                  </p>
                </div>

                <div className="bg-slate-950/60 rounded-2xl p-4 border border-slate-800 space-y-2.5">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Berkas yang Akan Dikirim:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {isWebCategory ? (
                      <>
                        <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800">
                          <FileCode className="w-3.5 h-3.5 text-orange-400" />
                          <span className="text-slate-200 font-mono">index.html</span>
                          <span className="text-[10px] text-slate-500 ml-auto font-mono">
                            {(files.html || '').length} chars
                          </span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800">
                          <FileCode className="w-3.5 h-3.5 text-sky-400" />
                          <span className="text-slate-200 font-mono">styles.css</span>
                          <span className="text-[10px] text-slate-500 ml-auto font-mono">
                            {(files.css || '').length} chars
                          </span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800 col-span-2">
                          <FileCode className="w-3.5 h-3.5 text-amber-400" />
                          <span className="text-slate-200 font-mono">script.js</span>
                          <span className="text-[10px] text-slate-500 ml-auto font-mono">
                            {(files.js || '').length} chars
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800 col-span-2">
                        <FileCode className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-slate-200 font-mono">main.py</span>
                        <span className="text-[10px] text-slate-500 ml-auto font-mono">
                          {(files.py || '').length} chars
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 text-[11px] text-slate-400">
                  <span className="text-slate-300 font-semibold">Catatan Transparansi:</span> Evaluasi proyek merupakan lapisan umpan balik pembelajaran server. Hasil evaluasi tidak mengeksekusi kode Anda di terminal server.
                </div>
              </div>
            )}

            {/* SUBMITTING / EVALUATING / SUCCESS / ERROR / INVALID STAGES */}
            {stage !== 'idle' && (
              <ProjectResultFeedback
                result={result}
                state={stage}
                errorMessage={errorMessage}
                isSubmitting={isSubmitting}
                onRetry={handleSubmit}
                onImprove={onClose}
                onClose={onClose}
                onSubmitNew={handleSubmit}
              />
            )}

          </div>

          {/* Footer Actions (Only shown in idle stage, as ProjectResultFeedback handles other stages) */}
          {stage === 'idle' && (
            <div className="pt-3.5 border-t border-slate-800 flex items-center justify-end gap-2.5 flex-shrink-0">
              <button
                onClick={onClose}
                disabled={isSubmitting}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 active:scale-98 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim Proyek Sekarang</span>
              </button>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
