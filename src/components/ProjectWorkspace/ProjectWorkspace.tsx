import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, 
  RotateCcw, 
  Save, 
  Terminal, 
  Eye, 
  Code2, 
  Check, 
  X, 
  Sparkles, 
  Copy, 
  Download, 
  Maximize2, 
  Minimize2, 
  CheckCircle2, 
  AlertCircle,
  RefreshCw,
  FileCode,
  Layers,
  ChevronDown
} from 'lucide-react';
import { ProjectItem } from '../../data/projectsData';
import { PublicProjectEvaluationResult } from '../../types/projectEvaluation';
import { ProjectHeader, WorkspaceViewMode, PreviewViewport } from './ProjectHeader';
import { ProjectBriefPanel } from './ProjectBriefPanel';
import { ProjectCompletionModal } from './ProjectCompletionModal';
import { ProjectResetConfirmModal } from './ProjectResetConfirmModal';
import { ProjectSubmissionModal } from './ProjectSubmissionModal';
import { executePython } from '../../utils/pythonInterpreter';
import { useSettings } from '../../lib/SettingsContext';
import { auth } from '../../lib/firebase';
import Prism from '../../lib/prismLoader';
import { PublicProjectProgressDTO } from '../../types/projectProgress';
import { analyticsService } from '../../services/analytics';

interface ProjectWorkspaceProps {
  project: ProjectItem;
  onNextProject?: () => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onProjectCompleted?: (progress: PublicProjectProgressDTO) => void;
}

interface ProjectDraft {
  html?: string;
  css?: string;
  js?: string;
  py?: string;
  updatedAt: string;
}

export const ProjectWorkspace: React.FC<ProjectWorkspaceProps> = ({
  project,
  onNextProject,
  isSidebarOpen,
  onToggleSidebar,
  onProjectCompleted
}) => {
  const { settings, getThemeStyles } = useSettings();
  const themeStyles = getThemeStyles();

  const isWebCategory = project.category === 'web' || project.category === 'react' || project.category === 'fullstack';
  
  // Editor code states
  const [htmlCode, setHtmlCode] = useState<string>(project.starterHtml || '');
  const [cssCode, setCssCode] = useState<string>(project.starterCss || '');
  const [jsCode, setJsCode] = useState<string>(project.starterJs || '');
  const [pyCode, setPyCode] = useState<string>(project.starterPy || '');

  // Active Editor Tab ('html' | 'css' | 'js' | 'py')
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js' | 'py'>(() => {
    return isWebCategory ? 'html' : 'py';
  });

  // Layout & Viewport state
  const [viewMode, setViewMode] = useState<WorkspaceViewMode>('split');
  const [previewViewport, setPreviewViewport] = useState<PreviewViewport>('desktop');
  const [mobileWorkspaceTab, setMobileWorkspaceTab] = useState<'brief' | 'editor' | 'preview'>('editor');

  // Draft management
  const [hasDraft, setHasDraft] = useState<boolean>(false);
  const [draftLastSaved, setDraftLastSaved] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [showDraftToast, setShowDraftToast] = useState<boolean>(false);
  const [draftToastMsg, setDraftToastMsg] = useState<string>('');
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);

  // Python Terminal & Execution state
  const [pythonOutput, setPythonOutput] = useState<string>('');
  const [pythonError, setPythonError] = useState<string | null>(null);
  const [pythonExecutionTime, setPythonExecutionTime] = useState<number | null>(null);
  const [pythonStdin, setPythonStdin] = useState<string>('');
  const [isPythonRunning, setIsPythonRunning] = useState<boolean>(false);

  // Web iframe state
  const [iframeSrcDoc, setIframeSrcDoc] = useState<string>('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Requirements Evaluation state (Non-authoritative client feedback checklist)
  const [evalResults, setEvalResults] = useState<Record<string, boolean>>({});
  const [hasEvaluated, setHasEvaluated] = useState<boolean>(false);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState<boolean>(false);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState<boolean>(false);
  const [latestEvaluation, setLatestEvaluation] = useState<PublicProjectEvaluationResult | null>(null);
  const [projectProgress, setProjectProgress] = useState<PublicProjectProgressDTO | null>(null);

  const draftKey = `codera_project_draft_${project.id}`;

  // Observational Telemetry: Track project viewed (Non-blocking)
  useEffect(() => {
    try {
      analyticsService.trackProjectViewed(project.id, project.title, project.category);
    } catch {
      // Non-blocking
    }
  }, [project.id, project.title, project.category]);

  // Load starter code or saved draft on project change
  useEffect(() => {
    try {
      const saved = localStorage.getItem(draftKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          if (typeof parsed.html === 'string') setHtmlCode(parsed.html);
          else setHtmlCode(project.starterHtml || '');

          if (typeof parsed.css === 'string') setCssCode(parsed.css);
          else setCssCode(project.starterCss || '');

          if (typeof parsed.js === 'string') setJsCode(parsed.js);
          else setJsCode(project.starterJs || '');

          if (typeof parsed.py === 'string') setPyCode(parsed.py);
          else setPyCode(project.starterPy || '');

          setHasDraft(true);
          setDraftLastSaved(typeof parsed.updatedAt === 'string' ? parsed.updatedAt : 'Tersimpan');
          setDraftToastMsg('Draft pengerjaan sebelumnya berhasil dipulihkan.');
          setShowDraftToast(true);
          setTimeout(() => setShowDraftToast(false), 3500);
        } else {
          setHtmlCode(project.starterHtml || '');
          setCssCode(project.starterCss || '');
          setJsCode(project.starterJs || '');
          setPyCode(project.starterPy || '');
          setHasDraft(false);
          setDraftLastSaved(null);
        }
      } else {
        setHtmlCode(project.starterHtml || '');
        setCssCode(project.starterCss || '');
        setJsCode(project.starterJs || '');
        setPyCode(project.starterPy || '');
        setHasDraft(false);
        setDraftLastSaved(null);
      }
    } catch {
      setHtmlCode(project.starterHtml || '');
      setCssCode(project.starterCss || '');
      setJsCode(project.starterJs || '');
      setPyCode(project.starterPy || '');
      setHasDraft(false);
      setDraftLastSaved(null);
    }

    setActiveTab(isWebCategory ? 'html' : 'py');
    setEvalResults({});
    setHasEvaluated(false);
    setLatestEvaluation(null);
    setProjectProgress(null);
    setPythonOutput('');
    setPythonError(null);
  }, [project.id, draftKey, isWebCategory]);

  // Anti-Tampering & Persistence: Fetch latest authoritative evaluation and progress from server on load / project change
  useEffect(() => {
    let isCancelled = false;
    const fetchLatestServerEvaluationAndProgress = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) return;
        const idToken = await currentUser.getIdToken();

        // 1. Fetch latest evaluation
        const res = await fetch(`/api/projects/${project.id}/submissions/latest`, {
          headers: {
            'Authorization': `Bearer ${idToken}`
          }
        });
        if (res.ok && !isCancelled) {
          const data = await res.json();
          if (data && data.latestEvaluation) {
            setLatestEvaluation(data.latestEvaluation);
          }
        }

        // 2. Fetch authoritative project progress (Phase 5D)
        const progRes = await fetch(`/api/projects/${project.id}/progress`, {
          headers: {
            'Authorization': `Bearer ${idToken}`
          }
        });
        if (progRes.ok && !isCancelled) {
          const progData = await progRes.json();
          if (progData) {
            setProjectProgress(progData);
          }
        }
      } catch (err) {
        console.warn('Could not fetch latest evaluation or progress:', err);
      }
    };

    fetchLatestServerEvaluationAndProgress();
    return () => {
      isCancelled = true;
    };
  }, [project.id]);

  // Assemble HTML preview doc
  const buildIframeDoc = useCallback((html: string, css: string, js: string) => {
    return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    /* Reset scrollbar for preview */
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-thumb { background: rgba(100, 116, 139, 0.4); border-radius: 4px; }
    ${css}
  </style>
</head>
<body>
  ${html}
  <script>
    // Capture unhandled console errors to parent window
    window.onerror = function(message, source, lineno, colno, error) {
      console.error("Preview Script Error:", message);
    };
    try {
      ${js}
    } catch (e) {
      console.error(e);
    }
  </script>
</body>
</html>`;
  }, []);

  // Update iframe preview when web code changes
  useEffect(() => {
    if (isWebCategory) {
      const doc = buildIframeDoc(htmlCode, cssCode, jsCode);
      setIframeSrcDoc(doc);
    }
  }, [htmlCode, cssCode, jsCode, isWebCategory, buildIframeDoc]);

  // Debounced auto-save draft to localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const draft: ProjectDraft = {
          html: htmlCode,
          css: cssCode,
          js: jsCode,
          py: pyCode,
          updatedAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        };
        localStorage.setItem(draftKey, JSON.stringify(draft));
        setHasDraft(true);
        setDraftLastSaved(draft.updatedAt);
      } catch (err) {
        console.warn('Auto-save error:', err);
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [htmlCode, cssCode, jsCode, pyCode, draftKey]);

  // Manual save handler
  const handleManualSave = () => {
    setIsSaving(true);
    try {
      const now = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const draft: ProjectDraft = {
        html: htmlCode,
        css: cssCode,
        js: jsCode,
        py: pyCode,
        updatedAt: now
      };
      localStorage.setItem(draftKey, JSON.stringify(draft));
      setHasDraft(true);
      setDraftLastSaved(now);
      setDraftToastMsg(`Draft tersimpan pada ${now}`);
      setShowDraftToast(true);
      setTimeout(() => setShowDraftToast(false), 3000);
    } catch (err) {
      console.error('Save failed:', err);
    } finally {
      setTimeout(() => setIsSaving(false), 400);
    }
  };

  // Reset to starter code handler
  const handleConfirmReset = () => {
    try {
      localStorage.removeItem(draftKey);
    } catch {}
    setHtmlCode(project.starterHtml || '');
    setCssCode(project.starterCss || '');
    setJsCode(project.starterJs || '');
    setPyCode(project.starterPy || '');
    setHasDraft(false);
    setDraftLastSaved(null);
    setEvalResults({});
    setHasEvaluated(false);
    setDraftToastMsg('Kode proyek telah di-reset ke starter code awal.');
    setShowDraftToast(true);
    setTimeout(() => setShowDraftToast(false), 3500);
  };

  // Python Run Handler
  const handleRunPython = () => {
    setIsPythonRunning(true);
    setPythonError(null);
    const start = performance.now();

    try {
      const res = executePython(pyCode, pythonStdin);
      const elapsed = Math.round(performance.now() - start);
      setPythonExecutionTime(elapsed);
      setPythonOutput(res.output || '>>> Program selesai dijalankan tanpa output.');
      if (res.error) {
        setPythonError(res.error);
      }
    } catch (err: any) {
      setPythonError(err.message || 'Eksekusi runtime Python gagal.');
    } finally {
      setIsPythonRunning(false);
    }
  };

  // Requirements Verification Handler (Non-authoritative client feedback)
  const handleVerifyRequirements = () => {
    const results: Record<string, boolean> = {};
    let passedCount = 0;

    project.requirements.forEach(req => {
      try {
        const passed = req.check(htmlCode, cssCode, jsCode, pyCode);
        results[req.id] = !!passed;
        if (passed) passedCount++;
      } catch (e) {
        results[req.id] = false;
      }
    });

    setEvalResults(results);
    setHasEvaluated(true);

    const totalReqs = project.requirements.length;
    const isAllMet = totalReqs > 0 && passedCount === totalReqs;

    if (isAllMet) {
      setIsCompletionModalOpen(true);
    } else {
      setDraftToastMsg(`${passedCount} dari ${totalReqs} kriteria terpenuhi. Periksa tab Kriteria.`);
      setShowDraftToast(true);
      setTimeout(() => setShowDraftToast(false), 4000);
    }
  };

  // Global keyboard shortcut for Ctrl+Enter (Run / Verify)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (!isWebCategory) {
          handleRunPython();
        }
        handleVerifyRequirements();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [htmlCode, cssCode, jsCode, pyCode, isWebCategory]);

  const getViewportWidthClass = () => {
    if (previewViewport === 'mobile') return 'max-w-[375px] my-4 rounded-3xl border-4 border-slate-700 shadow-2xl';
    if (previewViewport === 'tablet') return 'max-w-[768px] my-4 rounded-2xl border-2 border-slate-700 shadow-xl';
    return 'w-full h-full';
  };

  return (
    <div className="flex flex-col h-full bg-[#0b0f19] text-slate-100 overflow-hidden select-none font-sans">
      
      {/* 1. TOP HEADER */}
      <ProjectHeader 
        project={project}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        previewViewport={previewViewport}
        onViewportChange={setPreviewViewport}
        hasDraft={hasDraft}
        draftLastSaved={draftLastSaved}
        isSaving={isSaving}
        onManualSave={handleManualSave}
        onRequestReset={() => setIsResetModalOpen(true)}
        onVerifyProject={handleVerifyRequirements}
        onSubmitProject={() => setIsSubmissionModalOpen(true)}
        latestEvaluation={latestEvaluation}
        projectProgress={projectProgress}
        onOpenEvaluation={() => setIsSubmissionModalOpen(true)}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={onToggleSidebar}
      />

      {/* Draft Notification Toast */}
      {showDraftToast && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 border border-indigo-500/40 text-indigo-200 text-xs px-4 py-2 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-2 animate-bounce">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>{draftToastMsg}</span>
        </div>
      )}

      {/* Mobile Workspace Tabs (Brief / Editor / Preview) */}
      <div className="flex md:hidden bg-slate-950 border-b border-slate-800 p-1">
        <button
          onClick={() => setMobileWorkspaceTab('brief')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
            mobileWorkspaceTab === 'brief' ? 'bg-indigo-600 text-white' : 'text-slate-400'
          }`}
        >
          Brief
        </button>
        <button
          onClick={() => setMobileWorkspaceTab('editor')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
            mobileWorkspaceTab === 'editor' ? 'bg-indigo-600 text-white' : 'text-slate-400'
          }`}
        >
          Editor
        </button>
        <button
          onClick={() => setMobileWorkspaceTab('preview')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
            mobileWorkspaceTab === 'preview' ? 'bg-indigo-600 text-white' : 'text-slate-400'
          }`}
        >
          {isWebCategory ? 'Preview' : 'Output'}
        </button>
      </div>

      {/* 2. MAIN WORKSPACE GRID */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
        
        {/* PANE 1: PROJECT BRIEF & INSTRUCTIONS (Collapsible on mobile or viewMode === 'editor') */}
        <div className={`w-full md:w-[320px] lg:w-[380px] xl:w-[420px] h-full flex-shrink-0 flex-col overflow-hidden ${
          mobileWorkspaceTab === 'brief' ? 'flex' : 'hidden md:flex'
        } ${viewMode === 'preview' ? 'hidden' : ''}`}>
          <ProjectBriefPanel 
            project={project}
            evalResults={evalResults}
            hasEvaluated={hasEvaluated}
            onRunTest={handleVerifyRequirements}
            onSubmitProject={() => setIsSubmissionModalOpen(true)}
            latestEvaluation={latestEvaluation}
          />
        </div>

        {/* PANE 2: CODE EDITOR (Hidden if viewMode === 'preview') */}
        <div className={`flex-1 flex flex-col h-full bg-[#1e1f29] border-r border-slate-800/80 min-w-0 overflow-hidden ${
          mobileWorkspaceTab === 'editor' ? 'flex' : 'hidden md:flex'
        } ${viewMode === 'preview' ? 'hidden' : ''}`}>
          
          {/* Editor File Tabs */}
          <div className="flex items-center justify-between bg-[#181a20] border-b border-slate-800 px-3 py-1.5 text-xs select-none flex-shrink-0">
            <div className="flex items-center gap-1 overflow-x-auto">
              {isWebCategory ? (
                <>
                  <button
                    onClick={() => setActiveTab('html')}
                    className={`px-3 py-1 rounded-lg font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      activeTab === 'html'
                        ? 'bg-[#282a36] text-orange-400 border border-slate-700'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <FileCode className="w-3.5 h-3.5 text-orange-400" />
                    <span>index.html</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('css')}
                    className={`px-3 py-1 rounded-lg font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      activeTab === 'css'
                        ? 'bg-[#282a36] text-blue-400 border border-slate-700'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <FileCode className="w-3.5 h-3.5 text-blue-400" />
                    <span>style.css</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('js')}
                    className={`px-3 py-1 rounded-lg font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      activeTab === 'js'
                        ? 'bg-[#282a36] text-amber-400 border border-slate-700'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <FileCode className="w-3.5 h-3.5 text-amber-400" />
                    <span>app.js</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setActiveTab('py')}
                  className="px-3 py-1 rounded-lg font-mono font-bold flex items-center gap-1.5 bg-[#282a36] text-emerald-400 border border-slate-700"
                >
                  <FileCode className="w-3.5 h-3.5 text-emerald-400" />
                  <span>main.py</span>
                </button>
              )}
            </div>

            {/* Run Python button in tab header if Python */}
            {!isWebCategory && (
              <button
                onClick={handleRunPython}
                disabled={isPythonRunning}
                className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-all cursor-pointer"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{isPythonRunning ? 'Menjalankan...' : 'Jalankan Python'}</span>
              </button>
            )}
          </div>

          {/* Code Textarea / Prism Container */}
          <div className="flex-1 relative overflow-hidden bg-[#1e1f29]">
            {activeTab === 'html' && (
              <textarea
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
                spellCheck={false}
                className="w-full h-full p-4 font-mono text-sm bg-transparent text-slate-100 resize-none outline-none custom-scrollbar leading-relaxed"
                style={{ fontSize: `${settings.fontSize}px`, tabSize: settings.tabSize }}
                placeholder="<!-- Tulis struktur HTML di sini... -->"
              />
            )}

            {activeTab === 'css' && (
              <textarea
                value={cssCode}
                onChange={(e) => setCssCode(e.target.value)}
                spellCheck={false}
                className="w-full h-full p-4 font-mono text-sm bg-transparent text-slate-100 resize-none outline-none custom-scrollbar leading-relaxed"
                style={{ fontSize: `${settings.fontSize}px`, tabSize: settings.tabSize }}
                placeholder="/* Tulis styling CSS di sini... */"
              />
            )}

            {activeTab === 'js' && (
              <textarea
                value={jsCode}
                onChange={(e) => setJsCode(e.target.value)}
                spellCheck={false}
                className="w-full h-full p-4 font-mono text-sm bg-transparent text-slate-100 resize-none outline-none custom-scrollbar leading-relaxed"
                style={{ fontSize: `${settings.fontSize}px`, tabSize: settings.tabSize }}
                placeholder="// Tulis logika JavaScript di sini..."
              />
            )}

            {activeTab === 'py' && (
              <textarea
                value={pyCode}
                onChange={(e) => setPyCode(e.target.value)}
                spellCheck={false}
                className="w-full h-full p-4 font-mono text-sm bg-transparent text-slate-100 resize-none outline-none custom-scrollbar leading-relaxed"
                style={{ fontSize: `${settings.fontSize}px`, tabSize: settings.tabSize }}
                placeholder="# Tulis kode Python di sini..."
              />
            )}
          </div>

          {/* Python Stdin bar */}
          {!isWebCategory && (
            <div className="bg-[#181a20] border-t border-slate-800 p-2.5 flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">STDIN:</span>
              <input 
                type="text"
                value={pythonStdin}
                onChange={(e) => setPythonStdin(e.target.value)}
                placeholder="Masukkan input untuk input() jika ada..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1 text-xs text-slate-200 outline-none focus:border-indigo-500 font-mono"
              />
            </div>
          )}

        </div>

        {/* PANE 3: SANDBOX PREVIEW OR TERMINAL OUTPUT (Hidden if viewMode === 'editor') */}
        <div className={`flex-1 flex flex-col h-full bg-[#070b14] min-w-0 overflow-hidden ${
          mobileWorkspaceTab === 'preview' ? 'flex' : 'hidden md:flex'
        } ${viewMode === 'editor' ? 'hidden' : ''}`}>
          
          {/* Header Bar */}
          <div className="flex items-center justify-between bg-[#0a0f1d] border-b border-slate-800 px-4 py-2 text-xs select-none flex-shrink-0">
            <div className="flex items-center gap-2 text-slate-300 font-bold">
              {isWebCategory ? (
                <>
                  <Eye className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Live Sandbox Preview</span>
                </>
              ) : (
                <>
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Terminal Console Output</span>
                  {pythonExecutionTime !== null && (
                    <span className="text-[10px] text-slate-500 font-mono">
                      ({pythonExecutionTime}ms)
                    </span>
                  )}
                </>
              )}
            </div>

            {isWebCategory ? (
              <button
                onClick={() => {
                  const doc = buildIframeDoc(htmlCode, cssCode, jsCode);
                  setIframeSrcDoc(doc);
                }}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Muat ulang preview"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setPythonOutput('');
                  setPythonError(null);
                }}
                className="text-[11px] text-slate-500 hover:text-slate-300"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sandbox Content */}
          <div className="flex-1 flex items-center justify-center p-0 overflow-hidden bg-slate-950 relative">
            {isWebCategory ? (
              <div className={`w-full h-full flex items-center justify-center overflow-hidden transition-all duration-300`}>
                <iframe
                  ref={iframeRef}
                  srcDoc={iframeSrcDoc}
                  title="Sandbox Live Preview"
                  sandbox="allow-scripts"
                  className={`bg-white transition-all duration-200 border-0 ${getViewportWidthClass()}`}
                />
              </div>
            ) : (
              <div className="w-full h-full p-4 font-mono text-xs overflow-y-auto text-left custom-scrollbar text-slate-200 bg-[#070b14]">
                {pythonError && (
                  <div className="p-3 mb-3 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-300">
                    <div className="font-bold flex items-center gap-1.5 mb-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Traceback (Error):</span>
                    </div>
                    <pre className="whitespace-pre-wrap">{pythonError}</pre>
                  </div>
                )}

                {pythonOutput ? (
                  <pre className="whitespace-pre-wrap text-emerald-400 leading-relaxed">{pythonOutput}</pre>
                ) : (
                  <div className="text-slate-600 italic">
                    Tekan tombol "Jalankan Python" atau Ctrl+Enter untuk mengeksekusi kode Anda di dalam terminal ini.
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* 3. COMPLETION MODAL */}
      <ProjectCompletionModal 
        isOpen={isCompletionModalOpen}
        project={project}
        onClose={() => setIsCompletionModalOpen(false)}
        onNextProject={onNextProject}
      />

      {/* 4. RESET CONFIRMATION MODAL */}
      <ProjectResetConfirmModal 
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirmReset={handleConfirmReset}
        projectTitle={project.title}
      />

      {/* 5. AUTHORITATIVE SUBMISSION MODAL */}
      <ProjectSubmissionModal 
        isOpen={isSubmissionModalOpen}
        onClose={() => setIsSubmissionModalOpen(false)}
        project={project}
        files={{
          html: htmlCode,
          css: cssCode,
          js: jsCode,
          py: pyCode
        }}
        initialResult={latestEvaluation}
        onSubmissionComplete={(res) => {
          setLatestEvaluation(res);
          if (res.progress) {
            setProjectProgress(res.progress);
            if (res.progress.completed && onProjectCompleted) {
              onProjectCompleted(res.progress);
            }
          }
        }}
      />

    </div>
  );
};
