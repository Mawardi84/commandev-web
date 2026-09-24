import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  Layers, 
  Lightbulb, 
  Code2, 
  Check, 
  Sparkles, 
  Clock, 
  Trophy, 
  ListChecks, 
  Info, 
  ChevronRight, 
  ShieldCheck, 
  Target, 
  Send 
} from 'lucide-react';
import { ProjectItem, ProjectRequirement } from '../../data/projectsData';
import { PublicProjectEvaluationResult } from '../../types/projectEvaluation';
import { ProjectResultFeedback } from './ProjectResultFeedback';

interface ProjectBriefPanelProps {
  project: ProjectItem;
  evalResults: Record<string, boolean>;
  hasEvaluated: boolean;
  onRunTest: () => void;
  onSubmitProject?: () => void;
  latestEvaluation?: PublicProjectEvaluationResult | null;
}

export const ProjectBriefPanel: React.FC<ProjectBriefPanelProps> = ({
  project,
  evalResults,
  hasEvaluated,
  onRunTest,
  onSubmitProject,
  latestEvaluation = null
}) => {
  const [activeTab, setActiveTab] = useState<'brief' | 'instructions' | 'requirements' | 'evaluation'>('brief');

  const passedCount = project.requirements.filter(r => evalResults[r.id]).length;
  const totalReqs = project.requirements.length;
  const allPassed = totalReqs > 0 && passedCount === totalReqs;

  return (
    <div className="flex flex-col h-full bg-[#0b0f19] border-r border-slate-800/80 text-slate-200 select-none overflow-hidden">
      
      {/* Tab Navigation */}
      <div className="flex items-center border-b border-slate-800 bg-[#070b14] px-2.5 sm:px-3 py-2 gap-1 sm:gap-1.5 flex-shrink-0 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('brief')}
          className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'brief'
              ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
          <span>Brief</span>
        </button>

        <button
          onClick={() => setActiveTab('instructions')}
          className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'instructions'
              ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <ListChecks className="w-3.5 h-3.5 text-blue-400" />
          <span>Instruksi ({project.instructions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('requirements')}
          className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer relative whitespace-nowrap ${
            activeTab === 'requirements'
              ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <Target className="w-3.5 h-3.5 text-emerald-400" />
          <span>Kriteria</span>
          {hasEvaluated && (
            <span className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full font-black ${
              allPassed ? 'bg-emerald-500 text-white' : 'bg-rose-500/80 text-white'
            }`}>
              {passedCount}/{totalReqs}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('evaluation')}
          className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer relative whitespace-nowrap ${
            activeTab === 'evaluation'
              ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
          <span>Hasil Server</span>
          {latestEvaluation && (
            <span className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full font-black ${
              latestEvaluation.passed ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
            }`}>
              {latestEvaluation.score}
            </span>
          )}
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 custom-scrollbar space-y-5 text-left">
        
        {/* TAB 1: BRIEF */}
        {activeTab === 'brief' && (
          <div className="space-y-5 animate-fadeIn">
            {/* Overview Card */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Ringkasan & Tujuan</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.overview.summary || project.description}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                {project.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    className="px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px] font-medium border border-slate-700/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Learning Outcomes */}
            {project.overview.learningOutcomes && project.overview.learningOutcomes.length > 0 && (
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Target Kompetensi yang Dibangun:</span>
                </h4>
                <div className="space-y-2">
                  {project.overview.learningOutcomes.map((outcome, idx) => (
                    <div 
                      key={idx} 
                      className="p-3 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5"
                    >
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <span className="leading-relaxed">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack & Guidelines */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-amber-400" />
                <span>Tech Stack & Rekomendasi Arsitektur</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.overview.techStack.map((tech, idx) => (
                  <span 
                    key={idx} 
                    className="px-2.5 py-1 rounded-lg bg-indigo-950/40 text-indigo-300 border border-indigo-800/40 text-xs font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {project.overview.architectureGuidelines && (
                <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside pt-1">
                  {project.overview.architectureGuidelines.map((g, i) => (
                    <li key={i} className="leading-relaxed">{g}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: INSTRUCTIONS */}
        {activeTab === 'instructions' && (
          <div className="space-y-3.5 animate-fadeIn">
            <div className="text-xs text-slate-400 flex items-center justify-between pb-1">
              <span className="font-semibold">Ikuti langkah pengerjaan berikut:</span>
              <span className="text-[11px] text-slate-500">{project.instructions.length} Langkah</span>
            </div>

            {project.instructions.map((inst) => (
              <div 
                key={inst.step} 
                className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all space-y-2"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 font-black text-xs flex items-center justify-center flex-shrink-0">
                    {inst.step}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-100">{inst.title}</h4>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed pl-8.5">
                  {inst.description}
                </p>

                {inst.tips && (
                  <div className="ml-8.5 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-[11px] flex items-start gap-2">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>{inst.tips}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: REQUIREMENTS */}
        {activeTab === 'requirements' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Kriteria Pengujian Otomatis</h4>
                <p className="text-[11px] text-slate-400">Seluruh kriteria wajib terpenuhi untuk menyelesaikan proyek ini.</p>
              </div>

              {hasEvaluated && (
                <div className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                  allPassed 
                    ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/50' 
                    : 'bg-rose-950/40 text-rose-300 border-rose-800/50'
                }`}>
                  {passedCount}/{totalReqs} Lulus
                </div>
              )}
            </div>

            <div className="space-y-2.5">
              {project.requirements.map(req => {
                const passed = evalResults[req.id];
                return (
                  <div 
                    key={req.id} 
                    className={`p-3.5 rounded-2xl border transition-all ${
                      hasEvaluated 
                        ? passed 
                          ? 'bg-emerald-950/20 border-emerald-800/50 text-emerald-100 shadow-sm' 
                          : 'bg-rose-950/20 border-rose-800/50 text-rose-100'
                        : 'bg-slate-900/50 border-slate-800/90 text-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0">
                        {hasEvaluated ? (
                          passed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-400" />
                          )
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-600 mt-0.5"></div>
                        )}
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="font-bold text-xs flex items-center justify-between">
                          <span>{req.title}</span>
                          {hasEvaluated && (
                            <span className={`text-[10px] uppercase tracking-wider font-extrabold px-1.5 py-0.2 rounded ${
                              passed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                            }`}>
                              {passed ? 'Passed' : 'Not Met'}
                            </span>
                          )}
                        </div>
                        <p className="text-xs opacity-90 leading-relaxed">{req.description}</p>
                        
                        {req.hint && !passed && hasEvaluated && (
                          <div className="text-[11px] text-amber-300/90 pt-1 flex items-center gap-1.5">
                            <Info className="w-3 h-3 text-amber-400" />
                            <span>Hint: {req.hint}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="space-y-2 mt-4">
              <button
                onClick={onRunTest}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-98 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all cursor-pointer"
              >
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Uji Kriteria Mandiri (Lokal)</span>
              </button>

              {onSubmitProject && (
                <button
                  onClick={onSubmitProject}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim ke Server Evaluator Otoritatif</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: EVALUATION RESULT & FEEDBACK */}
        {activeTab === 'evaluation' && (
          <div className="space-y-4 animate-fadeIn">
            <ProjectResultFeedback
              result={latestEvaluation}
              state={latestEvaluation ? 'success' : 'idle'}
              onSubmitNew={onSubmitProject}
              onRetry={onSubmitProject}
              compact={true}
            />
          </div>
        )}

      </div>

    </div>
  );
};
