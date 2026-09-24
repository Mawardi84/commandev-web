import React, { useEffect } from 'react';
import { 
  Trophy, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  Share2, 
  ExternalLink,
  Award,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectItem } from '../../data/projectsData';

interface ProjectCompletionModalProps {
  isOpen: boolean;
  project: ProjectItem;
  onClose: () => void;
  onNextProject?: () => void;
}

export const ProjectCompletionModal: React.FC<ProjectCompletionModalProps> = ({
  isOpen,
  project,
  onClose,
  onNextProject
}) => {
  // Keyboard Escape listener
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="completion-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center shadow-2xl relative overflow-hidden"
        >
          {/* Decorative ambient gradients */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Trophy Badge */}
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/30 mb-5 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
              <Trophy className="w-10 h-10 text-emerald-400 animate-bounce" />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kriteria Mandiri Berhasil Dipenuhi!</span>
          </div>

          <h2 id="completion-modal-title" className="text-xl sm:text-2xl font-black text-white mb-2">
            {project.title}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 mb-6 max-w-md mx-auto leading-relaxed">
            Selamat! Kode implementasimu telah berhasil lolos seluruh kriteria verifikasi lokal pada proyek ini.
          </p>

          {/* Reward Summary Card */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 mb-6 grid grid-cols-2 gap-3 text-left">
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80">
              <span className="text-[11px] text-slate-400 font-medium block">Target Bobot Proyek</span>
              <span className="text-lg font-black text-amber-400">+{project.xp} XP</span>
            </div>

            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80">
              <span className="text-[11px] text-slate-400 font-medium block">Kategori</span>
              <span className="text-sm font-black text-indigo-300 uppercase">{project.category}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all cursor-pointer"
            >
              Lanjutkan Eksplorasi
            </button>

            {onNextProject && (
              <button
                onClick={() => {
                  onClose();
                  onNextProject();
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
              >
                <span>Proyek Berikutnya</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
