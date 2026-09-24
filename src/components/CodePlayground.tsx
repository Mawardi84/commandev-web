import React, { useState, useEffect } from 'react';
import EditorDefault from 'react-simple-code-editor';
import Prism from '../lib/prismLoader';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  FileCode2, 
  Palette, 
  Terminal, 
  Lock, 
  Check, 
  ArrowRight,
  HelpCircle,
  Lightbulb,
  Clock,
  Trash2,
  Sparkles,
  Loader2,
  Award
} from 'lucide-react';
import { ChallengeRequirement } from '../types';
import { executePython } from '../utils/pythonInterpreter';
import { useSettings } from '../lib/SettingsContext';
import { ExerciseTest } from '../services/curriculum/types';
import { ExerciseEvaluationResult } from '../services/exercises/exerciseTypes';
import { cmsDataService } from '../services/curriculum/cmsDataService';
import { ExerciseResultModal } from './ExerciseResultModal';
import { analyticsService } from '../services/analytics';

// Vite + CommonJS interop
const Editor = (EditorDefault as any).default || EditorDefault;

interface CodePlaygroundProps {
  exerciseId?: string;
  visibleTests?: ExerciseTest[];
  language?: 'web' | 'python';
  starterCode?: string;
  starterCss?: string;
  starterJs?: string;
  starterPy?: string;
  hints?: string[];
  requirements?: ChallengeRequirement[];
  onComplete?: () => void;
  isCompleted?: boolean;
  onCodeChange?: (html: string, css: string, js: string, py?: string) => void;
  onNextLesson?: () => void;
  nextLessonTitle?: string;
}

export const CodePlayground: React.FC<CodePlaygroundProps> = ({ 
  exerciseId,
  visibleTests = [],
  language = 'web',
  starterCode = '', 
  starterCss, 
  starterJs,
  starterPy,
  hints = [],
  requirements = [], 
  onComplete, 
  isCompleted,
  onCodeChange,
  onNextLesson,
  nextLessonTitle
}) => {
  const { settings, getThemeStyles } = useSettings();
  const themeStyles = getThemeStyles();
  const isPython = language === 'python' || starterPy !== undefined;

  const [htmlCode, setHtmlCode] = useState(starterCode || '');
  const [cssCode, setCssCode] = useState(starterCss || '');
  const [jsCode, setJsCode] = useState(starterJs || '');
  const [pyCode, setPyCode] = useState(starterPy || starterCode || '');
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js' | 'py'>(isPython ? 'py' : 'html');
  const [previewHtml, setPreviewHtml] = useState(starterCode || '');
  
  // Python output states
  const [pyOutput, setPyOutput] = useState<string>('');
  const [pyError, setPyError] = useState<string | undefined>();
  const [execTime, setExecTime] = useState<number>(0);
  const [stdinInput, setStdinInput] = useState<string>('');

  // Evaluation States
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<ExerciseEvaluationResult | null>(null);
  const [isResultModalOpen, setIsResultModalOpen] = useState<boolean>(false);
  const [evalError, setEvalError] = useState<string | null>(null);

  // Progressive Hint States
  const [hintLevel, setHintLevel] = useState<number>(0);

  const [validationResults, setValidationResults] = useState<Record<string, boolean>>({});
  const [hasRun, setHasRun] = useState(false);

  const hasCss = starterCss !== undefined;
  const hasJs = starterJs !== undefined;

  // Update code when lesson changes
  useEffect(() => {
    setHtmlCode(starterCode || '');
    setCssCode(starterCss || '');
    setJsCode(starterJs || '');
    setPyCode(starterPy || (isPython ? starterCode : '') || '');
    setPreviewHtml(starterCode || '');
    setPyOutput('');
    setPyError(undefined);
    setValidationResults({});
    setHasRun(false);
    setHintLevel(0);
    setActiveTab(isPython ? 'py' : 'html');

    // Observational Telemetry: Track playground opened (No code captured)
    try {
      analyticsService.trackPlaygroundOpened(language);
    } catch {
      // Non-blocking
    }
  }, [starterCode, starterCss, starterJs, starterPy, isPython, language]);

  useEffect(() => {
    if (onCodeChange) {
      onCodeChange(htmlCode, cssCode, jsCode, pyCode);
    }
  }, [htmlCode, cssCode, jsCode, pyCode, onCodeChange]);

  const generatePreview = (html: string, css: string, js: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    
    // Inject CSS
    if (css) {
      const style = doc.createElement('style');
      style.textContent = css;
      if (doc.head) {
        doc.head.appendChild(style);
      } else {
        const head = doc.createElement('head');
        head.appendChild(style);
        doc.documentElement.insertBefore(head, doc.body);
      }
    }

    // Inject JS
    if (js) {
      const script = doc.createElement('script');
      script.textContent = js;
      doc.body.appendChild(script);
    }
    
    return doc.documentElement.outerHTML;
  };

  const handleRun = () => {
    setHasRun(true);

    if (isPython) {
      // Execute in client-side secure sandbox
      const res = executePython(pyCode, stdinInput);
      setPyOutput(res.output);
      setPyError(res.error);
      setExecTime(res.executionTimeMs);

      if (requirements.length > 0) {
        let allPassed = true;
        const newResults: Record<string, boolean> = {};

        requirements.forEach(req => {
          try {
            const passed = req.validate ? req.validate(pyCode, res.output) : true;
            newResults[req.id] = passed;
            if (!passed) allPassed = false;
          } catch {
            newResults[req.id] = false;
            allPassed = false;
          }
        });

        setValidationResults(newResults);

        if (allPassed && onComplete && !isCompleted) {
          onComplete();
        }
      }

      // Observational Telemetry (Non-blocking, never captures source code)
      try {
        analyticsService.trackCodeExecution('python', !res.error, res.executionTimeMs);
      } catch {
        // Non-blocking
      }
    } else {
      // Web preview execution
      const fullHtml = generatePreview(htmlCode, cssCode, jsCode);
      setPreviewHtml(fullHtml);

      if (requirements.length > 0) {
        let allPassed = true;
        const newResults: Record<string, boolean> = {};
        
        requirements.forEach(req => {
          try {
            const passed = req.validate ? req.validate(fullHtml) : true;
            newResults[req.id] = passed;
            if (!passed) allPassed = false;
          } catch {
            newResults[req.id] = false;
            allPassed = false;
          }
        });
        
        setValidationResults(newResults);
        
        if (allPassed && onComplete && !isCompleted) {
          onComplete();
        }
      }

      // Observational Telemetry (Non-blocking)
      try {
        analyticsService.trackCodeExecution('web', true, 10);
      } catch {
        // Non-blocking
      }
    }
  };

  const handleReset = () => {
    if (isPython) {
      setPyCode(starterPy || starterCode || '');
      setPyOutput('');
      setPyError(undefined);
    } else {
      setHtmlCode(starterCode);
      setCssCode(starterCss || '');
      setJsCode(starterJs || '');
      setPreviewHtml(generatePreview(starterCode, starterCss || '', starterJs || ''));
    }
    setValidationResults({});
    setHasRun(false);
  };

  const handleEvaluate = async () => {
    setIsEvaluating(true);
    setEvalError(null);

    // Refresh execution output first
    handleRun();

    try {
      const targetId = exerciseId || 'exercise-evaluation';
      const submission = {
        sourceCode: isPython ? pyCode : htmlCode,
        html: htmlCode,
        css: cssCode,
        js: jsCode,
        py: pyCode,
        output: isPython ? pyOutput : previewHtml
      };

      const res = await cmsDataService.evaluateExercise(targetId, submission);
      setEvaluationResult(res);
      setIsResultModalOpen(true);

      if (res.passed && onComplete && !isCompleted) {
        onComplete();
      }
    } catch (err: any) {
      setEvalError(err.message || 'Gagal mengevaluasi latihan');
      setEvaluationResult({
        exerciseId: exerciseId || 'exercise-evaluation',
        status: 'error',
        passed: false,
        testsRun: visibleTests.length,
        testsPassed: 0,
        testsFailed: visibleTests.length,
        feedback: err.message || 'Gagal terhubung ke server evaluasi.',
        output: isPython ? pyOutput : previewHtml
      });
      setIsResultModalOpen(true);
    } finally {
      setIsEvaluating(false);
    }
  };

  // Keyboard shortcut Ctrl+Enter or Cmd+Enter to run
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRun();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div className="flex flex-col h-full bg-[#0e1117] text-slate-100 border-l border-slate-800/80 font-sans shadow-2xl text-left overflow-hidden">
      
      {/* 1. IDE TOP TOOLBAR */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#161b22] border-b border-slate-800 flex-shrink-0">
        
        {/* File Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {isPython ? (
            <button 
              onClick={() => setActiveTab('py')}
              className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold flex items-center gap-2 bg-[#1f242c] text-white shadow-xs border border-slate-700/70 cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                main.py
              </span>
            </button>
          ) : (
            <>
              {/* HTML Tab */}
              <button 
                onClick={() => setActiveTab('html')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'html' 
                    ? 'bg-[#1f242c] text-white shadow-xs border border-slate-700/70' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                <span className="flex items-center gap-1.5">
                  <FileCode2 className="w-3.5 h-3.5 text-orange-400" />
                  index.html
                </span>
              </button>

              {/* CSS Tab */}
              {hasCss && (
                <button 
                  onClick={() => setActiveTab('css')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    activeTab === 'css' 
                      ? 'bg-[#1f242c] text-white shadow-xs border border-slate-700/70' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  <span className="flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-cyan-400" />
                    styles.css
                  </span>
                </button>
              )}

              {/* JS Tab */}
              {hasJs && (
                <button 
                  onClick={() => setActiveTab('js')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    activeTab === 'js' 
                      ? 'bg-[#1f242c] text-white shadow-xs border border-slate-700/70' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-yellow-400" />
                    script.js
                  </span>
                </button>
              )}
            </>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {hints.length > 0 && (
            <button
              onClick={() => setHintLevel(prev => Math.min(prev + 1, hints.length))}
              title="Minta Petunjuk Bertingkat (Progressive Hint)"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all cursor-pointer"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>Hint {hintLevel > 0 ? `(${hintLevel}/${hints.length})` : ''}</span>
            </button>
          )}

          <button 
            onClick={handleReset}
            title="Reset kode ke awal"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button 
            onClick={handleRun}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:scale-95 transition-all shadow-md shadow-emerald-600/30 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Jalankan</span>
            <span className="hidden md:inline text-[10px] opacity-75 font-mono px-1 py-0.2 bg-emerald-700 rounded">
              Ctrl+↵
            </span>
          </button>

          <button
            onClick={handleEvaluate}
            disabled={isEvaluating}
            title="Evaluasi kode pengerjaan terhadap seluruh kasus uji"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 active:scale-95 transition-all shadow-md shadow-indigo-600/30 cursor-pointer flex-shrink-0"
          >
            {isEvaluating ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
            ) : (
              <Award className="w-3.5 h-3.5 text-amber-300" />
            )}
            <span>{isEvaluating ? 'Mengevaluasi...' : 'Uji Solusi'}</span>
          </button>

          {onNextLesson && (
            <button 
              onClick={onNextLesson}
              title={nextLessonTitle ? `Lanjut ke: ${nextLessonTitle}` : 'Lanjut ke materi berikutnya'}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 active:scale-95 transition-all cursor-pointer"
            >
              <span>Berikutnya</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* PROGRESSIVE HINTS BANNER */}
      {hintLevel > 0 && hints.length > 0 && (
        <div className="bg-amber-950/40 border-b border-amber-800/40 px-4 py-2.5 text-xs text-amber-200 flex flex-col gap-1.5 animate-fadeIn">
          {hints.slice(0, hintLevel).map((h, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-[10px] font-bold text-amber-300 flex-shrink-0">
                Hint {i + 1}
              </span>
              <span className="leading-relaxed">{h}</span>
            </div>
          ))}
        </div>
      )}

      {/* 2. SPLIT: CODE EDITOR & LIVE PREVIEW / PYTHON TERMINAL */}
      <div className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-hidden">
        
        {/* CODE EDITOR CONTAINER */}
        <div 
          className="flex-1 w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r overflow-y-auto custom-scrollbar relative transition-colors duration-200"
          style={{
            backgroundColor: themeStyles.bg,
            borderColor: themeStyles.border
          }}
        >
          <div className="p-3 sm:p-4 text-sm font-mono leading-relaxed">
            {isPython ? (
              <Editor
                value={pyCode}
                onValueChange={(code: string) => setPyCode(code)}
                highlight={(code: string) => Prism.highlight(code, Prism.languages.python, 'python')}
                padding={12}
                tabSize={settings.tabSize}
                style={{
                  fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                  fontSize: `${settings.fontSize}px`,
                  backgroundColor: 'transparent',
                  minHeight: '100%',
                  color: themeStyles.text,
                  lineHeight: '1.6',
                  whiteSpace: settings.wordWrap ? 'pre-wrap' : 'pre',
                  wordBreak: settings.wordWrap ? 'break-word' : 'normal'
                }}
                textareaClassName="focus:outline-none"
              />
            ) : activeTab === 'html' ? (
              <Editor
                value={htmlCode}
                onValueChange={(code: string) => setHtmlCode(code)}
                highlight={(code: string) => Prism.highlight(code, Prism.languages.markup, 'markup')}
                padding={12}
                tabSize={settings.tabSize}
                style={{
                  fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                  fontSize: `${settings.fontSize}px`,
                  backgroundColor: 'transparent',
                  minHeight: '100%',
                  color: themeStyles.text,
                  lineHeight: '1.6',
                  whiteSpace: settings.wordWrap ? 'pre-wrap' : 'pre',
                  wordBreak: settings.wordWrap ? 'break-word' : 'normal'
                }}
                textareaClassName="focus:outline-none"
              />
            ) : activeTab === 'css' ? (
              <Editor
                value={cssCode}
                onValueChange={(code: string) => setCssCode(code)}
                highlight={(code: string) => Prism.highlight(code, Prism.languages.css, 'css')}
                padding={12}
                tabSize={settings.tabSize}
                style={{
                  fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                  fontSize: `${settings.fontSize}px`,
                  backgroundColor: 'transparent',
                  minHeight: '100%',
                  color: themeStyles.text,
                  lineHeight: '1.6',
                  whiteSpace: settings.wordWrap ? 'pre-wrap' : 'pre',
                  wordBreak: settings.wordWrap ? 'break-word' : 'normal'
                }}
                textareaClassName="focus:outline-none"
              />
            ) : (
              <Editor
                value={jsCode}
                onValueChange={(code: string) => setJsCode(code)}
                highlight={(code: string) => Prism.highlight(code, Prism.languages.javascript, 'javascript')}
                padding={12}
                tabSize={settings.tabSize}
                style={{
                  fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                  fontSize: `${settings.fontSize}px`,
                  backgroundColor: 'transparent',
                  minHeight: '100%',
                  color: themeStyles.text,
                  lineHeight: '1.6',
                  whiteSpace: settings.wordWrap ? 'pre-wrap' : 'pre',
                  wordBreak: settings.wordWrap ? 'break-word' : 'normal'
                }}
                textareaClassName="focus:outline-none"
              />
            )}
          </div>
        </div>

        {/* RIGHT PANE: PYTHON TERMINAL OR BROWSER PREVIEW */}
        {isPython ? (
          <div className="flex-1 w-full lg:w-1/2 bg-[#090d16] relative flex flex-col min-h-0 text-slate-200">
            {/* Terminal Header */}
            <div className="px-3 py-2 bg-[#121620] border-b border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-semibold text-slate-300">Python 3.12 (Interactive Sandbox)</span>
              </div>
              <div className="flex items-center gap-2">
                {execTime > 0 && (
                  <span className="flex items-center gap-1 text-[11px] text-slate-500">
                    <Clock className="w-3 h-3" />
                    {execTime}ms
                  </span>
                )}
                <button
                  onClick={() => { setPyOutput(''); setPyError(undefined); }}
                  title="Bersihkan Terminal"
                  className="p-1 hover:text-slate-200 transition-colors text-slate-400"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Terminal Screen */}
            <div className="flex-1 p-4 font-mono text-xs sm:text-sm overflow-y-auto custom-scrollbar flex flex-col gap-2">
              <div className="text-slate-500 text-xs">
                # Klik tombol [Jalankan] atau tekan Ctrl+Enter untuk mengeksekusi kode Python.
              </div>

              {hasRun && !pyOutput && !pyError && (
                <div className="text-slate-500 italic text-xs">
                  (Program selesai tanpa output teks ke konsol)
                </div>
              )}

              {pyOutput && (
                <pre className="text-emerald-400 whitespace-pre-wrap leading-relaxed m-0 font-mono">
                  {pyOutput}
                </pre>
              )}

              {pyError && (
                <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800/60 text-rose-300 whitespace-pre-wrap leading-relaxed">
                  <div className="font-bold text-xs uppercase tracking-wider text-rose-400 mb-1 flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5" />
                    Python Traceback / Syntax Error:
                  </div>
                  <pre className="font-mono text-xs m-0 text-rose-200 whitespace-pre-wrap">
                    {pyError}
                  </pre>
                </div>
              )}
            </div>

            {/* Stdin Mock Input Box */}
            <div className="p-2.5 bg-[#121620] border-t border-slate-800 flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-400 flex-shrink-0">STDIN:</span>
              <input
                type="text"
                value={stdinInput}
                onChange={(e) => setStdinInput(e.target.value)}
                placeholder="Input simulasi untuk fungsi input()..."
                className="flex-1 bg-[#1a202c] border border-slate-700 rounded px-2.5 py-1 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 text-xs"
              />
            </div>
          </div>
        ) : (
          <div className="flex-1 w-full lg:w-1/2 bg-white relative flex flex-col min-h-0">
            {/* Mock Browser Header */}
            <div className="px-3 py-2 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-500 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2 flex-1 max-w-xs">
                <div className="flex gap-1.5 flex-shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-300 w-full truncate">
                  <Lock className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                  <span className="truncate">https://devmaster.local/preview</span>
                </div>
              </div>

              <button 
                onClick={handleRun}
                title="Refresh Hasil Preview"
                className="p-1 rounded-md text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Iframe Preview Area */}
            <iframe 
              srcDoc={previewHtml}
              title="preview"
              className="w-full flex-1 border-0 bg-white"
              sandbox="allow-scripts"
            />
          </div>
        )}
      </div>

      {/* 3. REQUIREMENTS CHECKER DRAWER */}
      {requirements.length > 0 && (
        <div className="bg-[#161b22] border-t border-slate-800 p-4 max-h-[30vh] overflow-y-auto custom-scrollbar flex-shrink-0">
          <div className="text-xs font-bold text-slate-300 mb-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              <span className="uppercase tracking-wider">Kriteria Tantangan</span>
            </div>

            {isCompleted ? (
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 text-xs px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center gap-1.5 font-bold">
                  <Check className="w-3.5 h-3.5" />
                  Selesai!
                </span>
                {onNextLesson && (
                  <button
                    onClick={onNextLesson}
                    className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white rounded-lg text-xs font-bold shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
                  >
                    <span>Lanjut ke Materi Berikutnya</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ) : (
              <span className="text-[11px] text-slate-400">
                Klik <strong>Jalankan</strong> untuk menguji
              </span>
            )}
          </div>

          <div className="space-y-2">
            {requirements.map(req => {
              const status = hasRun ? validationResults[req.id] : undefined;
              return (
                <div 
                  key={req.id} 
                  className={`flex items-start gap-2.5 p-2 rounded-xl text-xs transition-colors ${
                    status === true 
                      ? 'bg-emerald-950/20 border border-emerald-800/40 text-emerald-300' 
                      : status === false 
                        ? 'bg-rose-950/20 border border-rose-800/40 text-rose-300' 
                        : 'bg-slate-800/30 border border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {status === true ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : status === false ? (
                      <XCircle className="w-4 h-4 text-rose-400" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-600"></div>
                    )}
                  </div>
                  <span className={`leading-relaxed ${status === true ? 'line-through opacity-80' : ''}`}>
                    {req.description}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* EXERCISE EVALUATION RESULT MODAL */}
      {evaluationResult && (
        <ExerciseResultModal
          result={evaluationResult}
          isOpen={isResultModalOpen}
          onClose={() => setIsResultModalOpen(false)}
          onNextLesson={onNextLesson}
          nextLessonTitle={nextLessonTitle}
          onRetry={() => setIsResultModalOpen(false)}
        />
      )}

    </div>
  );
};
