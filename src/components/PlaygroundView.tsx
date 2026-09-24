import React, { useState, useEffect } from 'react';
import EditorDefault from 'react-simple-code-editor';
import Prism from '../lib/prismLoader';
import { 
  Play, 
  RotateCcw, 
  Terminal, 
  Sparkles, 
  Copy, 
  Check, 
  Trash2, 
  FileCode2, 
  Palette, 
  Code2, 
  Clock, 
  Layers,
  ChevronDown,
  Download,
  AlertCircle,
  FolderGit2,
  Columns,
  Atom,
  Sliders,
  CheckCircle2,
  Database,
  Server,
  ShieldCheck
} from 'lucide-react';
import { executePython } from '../utils/pythonInterpreter';
import { GitSimulator } from './GitSimulator';
import { CssInteractiveStudio } from './CssInteractiveStudio';
import { CodeDiffViewer } from './CodeDiffViewer';
import { ApiTesterStudio } from './ApiTesterStudio';
import { SqlInteractiveStudio } from './SqlInteractiveStudio';
import { TestRunnerStudio } from './TestRunnerStudio';

// Handle CommonJS vs ESM default import
const Editor = (EditorDefault as any).default || EditorDefault;

type LanguageMode = 'web' | 'python' | 'react' | 'css-studio' | 'git' | 'api-tester' | 'sql-studio' | 'unit-test';

interface ConsoleLog {
  type: 'log' | 'warn' | 'error' | 'info';
  message: string;
  time: string;
}

const CODE_TEMPLATES = {
  web: [
    {
      name: 'Modern Semantic Card',
      html: `<article class="card">\n  <div class="badge">Trending</div>\n  <h2>Belajar di COMMANDEV</h2>\n  <p>Platform interaktif untuk menguasai coding dari nol hingga mahir dengan praktik nyata.</p>\n  <button id="btnAction">Mulai Belajar</button>\n</article>`,
      css: `body {\n  font-family: system-ui, -apple-system, sans-serif;\n  background: #0f172a;\n  color: #f8fafc;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n  margin: 0;\n}\n\n.card {\n  background: #1e293b;\n  padding: 2rem;\n  border-radius: 1rem;\n  max-width: 360px;\n  border: 1px solid #334155;\n  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.3);\n}\n\n.badge {\n  display: inline-block;\n  background: #6366f1;\n  color: white;\n  font-size: 0.75rem;\n  font-weight: 700;\n  padding: 0.25rem 0.75rem;\n  border-radius: 9999px;\n  margin-bottom: 1rem;\n}\n\nh2 { margin: 0 0 0.5rem 0; font-size: 1.5rem; }\np { color: #94a3b8; font-size: 0.95rem; line-height: 1.5; }\n\nbutton {\n  width: 100%;\n  margin-top: 1.25rem;\n  padding: 0.75rem;\n  background: #4f46e5;\n  color: white;\n  border: none;\n  border-radius: 0.5rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: 0.2s;\n}\nbutton:hover { background: #4338ca; }`,
      js: `console.log("Card UI initialized successfully!");\ndocument.getElementById('btnAction').addEventListener('click', () => {\n  console.info("User clicked Mulai Belajar button");\n  alert('Selamat datang di COMMANDEV! Selamat belajar!');\n});`
    },
    {
      name: 'JS ES6+ Array Methods & Table',
      html: `<div class="container">\n  <h2>Daftar Nilai Siswa COMMANDEV</h2>\n  <div id="stats" class="stats"></div>\n  <table id="dataTable">\n    <thead>\n      <tr><th>Nama</th><th>Nilai</th><th>Status</th></tr>\n    </thead>\n    <tbody id="tableBody"></tbody>\n  </table>\n</div>`,
      css: `body {\n  font-family: system-ui, sans-serif;\n  background: #0f172a;\n  color: #f8fafc;\n  padding: 2rem;\n  display: flex;\n  justify-content: center;\n}\n.container {\n  background: #1e293b;\n  padding: 2rem;\n  border-radius: 1rem;\n  width: 100%;\n  max-width: 500px;\n  border: 1px solid #334155;\n}\nh2 { margin-top: 0; color: #818cf8; }\n.stats {\n  background: #0f172a;\n  padding: 0.75rem 1rem;\n  border-radius: 0.5rem;\n  margin-bottom: 1.5rem;\n  font-size: 0.85rem;\n  color: #38bdf8;\n}\ntable {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.9rem;\n}\nth, td {\n  padding: 0.75rem;\n  text-align: left;\n  border-bottom: 1px solid #334155;\n}\nth { color: #94a3b8; }\n.lulus { color: #34d399; font-weight: bold; }\n.remedial { color: #f87171; font-weight: bold; }`,
      js: `const students = [\n  { name: 'Ahmad Fauzi', score: 88 },\n  { name: 'Budi Santoso', score: 65 },\n  { name: 'Citra Dewi', score: 92 },\n  { name: 'Dina Permata', score: 74 }\n];\n\n// 1. FILTER: Siswa yang lulus (>= 75)\nconst passing = students.filter(s => s.score >= 75);\n\n// 2. REDUCE: Hitung rata-rata skor kelas\nconst avgScore = students.reduce((acc, s) => acc + s.score, 0) / students.length;\n\nconsole.log("Total Siswa Lulus:", passing.length);\nconsole.log("Rata-rata Kelas:", avgScore.toFixed(1));\n\n// Render ke DOM\ndocument.getElementById('stats').innerHTML = \`🎓 Rata-rata Kelas: \${avgScore.toFixed(1)} | Lulus: \${passing.length}/\${students.length} Siswa\`;\n\nconst tbody = document.getElementById('tableBody');\ntbody.innerHTML = students.map(s => \`\n  <tr>\n    <td>\${s.name}</td>\n    <td>\${s.score}</td>\n    <td class="\${s.score >= 75 ? 'lulus' : 'remedial'}">\n      \${s.score >= 75 ? '✓ LULUS' : '✗ REMEDIAL'}\n    </td>\n  </tr>\n\`).join('');`
    },
    {
      name: 'Interactive Counter with Console Logs',
      html: `<div class="counter-box">\n  <h3>Interactive Counter</h3>\n  <div id="countDisplay">0</div>\n  <div class="btn-group">\n    <button id="decBtn">-</button>\n    <button id="resetBtn">Reset</button>\n    <button id="incBtn">+</button>\n  </div>\n</div>`,
      css: `body {\n  font-family: sans-serif;\n  background: #f1f5f9;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n  margin: 0;\n}\n.counter-box {\n  background: white;\n  padding: 2rem;\n  border-radius: 1rem;\n  text-align: center;\n  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);\n}\n#countDisplay {\n  font-size: 3.5rem;\n  font-weight: 800;\n  color: #4f46e5;\n  margin: 1rem 0;\n}\n.btn-group button {\n  padding: 0.5rem 1rem;\n  margin: 0 0.25rem;\n  font-size: 1rem;\n  font-weight: bold;\n  border-radius: 0.5rem;\n  border: 1px solid #cbd5e1;\n  background: white;\n  cursor: pointer;\n}\n.btn-group button:hover {\n  background: #e2e8f0;\n}`,
      js: `let count = 0;\nconst display = document.getElementById('countDisplay');\n\ndocument.getElementById('incBtn').onclick = () => {\n  count++;\n  display.innerText = count;\n  console.log("Incremented:", count);\n};\ndocument.getElementById('decBtn').onclick = () => {\n  count--;\n  display.innerText = count;\n  console.log("Decremented:", count);\n};\ndocument.getElementById('resetBtn').onclick = () => {\n  count = 0;\n  display.innerText = count;\n  console.warn("Counter reset to 0");\n};`
    }
  ],
  react: [
    {
      name: 'Interactive Todo & Task Manager',
      code: `function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Belajar Fundamental React 18', done: true },
    { id: 2, text: 'Pahami State useState & Props', done: true },
    { id: 3, text: 'Bangun Proyek Portofolio COMMANDEV', done: false }
  ]);
  const [inputVal, setInputVal] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: inputVal.trim(), done: false }]);
    setInputVal('');
    console.log("Task ditambahkan!");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div style={{ maxWidth: 440, margin: '0 auto', background: '#1e293b', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #334155' }}>
      <h2 style={{ color: '#38bdf8', marginTop: 0, fontSize: '1.25rem' }}>⚛️ React 18 Task Studio</h2>
      
      <form onSubmit={addTask} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input 
          type="text" 
          value={inputVal} 
          onChange={(e) => setInputVal(e.target.value)} 
          placeholder="Tulis target coding hari ini..."
          style={{ flex: 1, padding: '0.6rem 0.8rem', background: '#0f172a', border: '1px solid #475569', borderRadius: '0.5rem', color: '#fff', fontSize: '0.9rem' }}
        />
        <button type="submit" style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '0.6rem 1rem', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer' }}>
          + Tambah
        </button>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {tasks.map(t => (
          <div key={t.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0f172a', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid #334155' }}>
            <span 
              onClick={() => toggleTask(t.id)} 
              style={{ cursor: 'pointer', textDecoration: t.done ? 'line-through' : 'none', color: t.done ? '#64748b' : '#f1f5f9', fontSize: '0.9rem' }}
            >
              {t.done ? '✅ ' : '⭕ '} {t.text}
            </span>
            <button 
              onClick={() => removeTask(t.id)}
              style={{ background: 'transparent', border: 'none', color: '#f43f5e', cursor: 'pointer', fontWeight: 'bold' }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#94a3b8', textAlign: 'center' }}>
        Selesai: {tasks.filter(t => t.done).length} dari {tasks.length} target
      </div>
    </div>
  );
}`,
      css: `body { background: #0f172a; color: #f8fafc; font-family: system-ui, sans-serif; padding: 2rem; }`
    },
    {
      name: 'Dynamic Search & Filter Cards',
      code: `function App() {
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  const tracks = [
    { title: 'HTML5 Semantics', tag: 'Web', level: 'Dasar', desc: 'Struktur web modern dan aksesibilitas' },
    { title: 'CSS3 Flex & Grid', tag: 'Web', level: 'Menengah', desc: 'Tata letak responsif dan animasi fluid' },
    { title: 'JavaScript ES6+', tag: 'Logic', level: 'Dasar', desc: 'Fungsi murni, array methods, async' },
    { title: 'React 18 Hooks', tag: 'Framework', level: 'Menengah', desc: 'Komponen deklaratif dan state flow' },
    { title: 'Python 3.12 Core', tag: 'Backend', level: 'Dasar', desc: 'Struktur data list, dict, dan OOP' }
  ];

  const filtered = tracks.filter(t => {
    const matchTag = selectedTag === 'All' || t.tag === selectedTag;
    const matchQuery = t.title.toLowerCase().includes(query.toLowerCase()) || t.desc.toLowerCase().includes(query.toLowerCase());
    return matchTag && matchQuery;
  });

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', background: '#1e293b', padding: '1.5rem', borderRadius: '1rem' }}>
      <h2 style={{ color: '#a855f7', marginTop: 0 }}>⚛️ Live Card Explorer</h2>
      <input 
        type="text" 
        value={query} 
        onChange={e => setQuery(e.target.value)} 
        placeholder="Cari topik kursus..."
        style={{ width: '100%', padding: '0.6rem', boxSizing: 'border-box', background: '#0f172a', border: '1px solid #475569', borderRadius: '0.5rem', color: '#fff', marginBottom: '0.75rem' }}
      />
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {['All', 'Web', 'Logic', 'Framework', 'Backend'].map(tag => (
          <button 
            key={tag} 
            onClick={() => setSelectedTag(tag)}
            style={{ padding: '0.3rem 0.7rem', borderRadius: '0.4rem', border: 'none', cursor: 'pointer', background: selectedTag === tag ? '#a855f7' : '#334155', color: '#fff', fontSize: '0.8rem', fontWeight: 'bold' }}
          >
            {tag}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {filtered.map(item => (
          <div key={item.title} style={{ background: '#0f172a', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid #334155' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', color: '#e2e8f0' }}>{item.title}</span>
              <span style={{ fontSize: '0.75rem', background: '#3b82f6', color: '#fff', padding: '0.1rem 0.4rem', borderRadius: '0.3rem' }}>{item.level}</span>
            </div>
            <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}`,
      css: `body { background: #0f172a; color: #f8fafc; font-family: system-ui, sans-serif; padding: 2rem; }`
    }
  ],
  python: [
    {
      name: 'Fibonacci Sequence & Recursion',
      py: `# Fibonacci Generator in Python\ndef fibonacci(n):\n    sequence = [0, 1]\n    while len(sequence) < n:\n        sequence.append(sequence[-1] + sequence[-2])\n    return sequence[:n]\n\nprint("=== Fibonacci Series ===")\nterms = 10\nresult = fibonacci(terms)\nprint(f"First {terms} numbers: {result}")\n\n# Sum of even fibonacci numbers\neven_sum = sum(x for x in result if x % 2 == 0)\nprint(f"Sum of even numbers: {even_sum}")`
    },
    {
      name: 'Algorithm: QuickSort & Analytics',
      py: `# QuickSort Algorithm & Benchmark\ndef quicksort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quicksort(left) + middle + quicksort(right)\n\nnumbers = [64, 34, 25, 12, 22, 11, 90, 5, 42]\nprint(f"Original Array: {numbers}")\nsorted_nums = quicksort(numbers)\nprint(f"Sorted Array:   {sorted_nums}")\nprint(f"Min: {min(sorted_nums)}, Max: {max(sorted_nums)}, Avg: {sum(sorted_nums)/len(sorted_nums):.2f}")`
    }
  ]
};

interface PlaygroundViewProps {
  initialCode?: string;
  initialLanguage?: 'web' | 'python' | 'git';
}

export const PlaygroundView: React.FC<PlaygroundViewProps> = ({ initialCode, initialLanguage }) => {
  const [langMode, setLangMode] = useState<LanguageMode>(() => {
    if (initialLanguage === 'python') return 'python';
    if (initialLanguage === 'git') return 'git';
    return 'web';
  });
  const [activeWebTab, setActiveWebTab] = useState<'html' | 'css' | 'js'>('html');

  // Web State
  const [htmlCode, setHtmlCode] = useState(() => {
    if (initialCode && (!initialLanguage || initialLanguage === 'web')) {
      return initialCode;
    }
    return CODE_TEMPLATES.web[0].html;
  });
  const [cssCode, setCssCode] = useState(CODE_TEMPLATES.web[0].css);
  const [jsCode, setJsCode] = useState(CODE_TEMPLATES.web[0].js);
  const [previewDoc, setPreviewDoc] = useState('');
  const [consoleLogs, setConsoleLogs] = useState<ConsoleLog[]>([]);
  const [showConsole, setShowConsole] = useState(false);

  // React State
  const [reactCode, setReactCode] = useState(CODE_TEMPLATES.react[0].code);
  const [reactCss, setReactCss] = useState(CODE_TEMPLATES.react[0].css);

  // Python State
  const [pyCode, setPyCode] = useState(() => {
    if (initialCode && initialLanguage === 'python') return initialCode;
    return CODE_TEMPLATES.python[0].py;
  });
  const [pyStdin, setPyStdin] = useState('');
  const [pyOutput, setPyOutput] = useState('');
  const [pyError, setPyError] = useState<string | undefined>();
  const [pyExecTime, setPyExecTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  // Listen to postMessage from iframe console
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && (event.data.type === 'COMMANDEV_CONSOLE' || event.data.type === 'CODERA_CONSOLE')) {
        const time = new Date().toLocaleTimeString();
        setConsoleLogs(prev => [...prev.slice(-49), {
          type: event.data.level || 'log',
          message: event.data.message,
          time
        }]);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Update web preview with console interceptor
  const updateWebPreview = () => {
    const combined = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>${cssCode}</style>
          <script>
            (function() {
              const origLog = console.log;
              const origWarn = console.warn;
              const origError = console.error;
              const origInfo = console.info;

              function send(level, args) {
                try {
                  const msg = Array.from(args).map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ');
                  window.parent.postMessage({ type: 'COMMANDEV_CONSOLE', level, message: msg }, '*');
                } catch(e) {}
              }

              console.log = function(...args) { send('log', args); origLog.apply(console, args); };
              console.warn = function(...args) { send('warn', args); origWarn.apply(console, args); };
              console.error = function(...args) { send('error', args); origError.apply(console, args); };
              console.info = function(...args) { send('info', args); origInfo.apply(console, args); };
            })();
          </script>
        </head>
        <body>
          ${htmlCode}
          <script>
            try {
              ${jsCode}
            } catch (err) {
              console.error(err.message || String(err));
            }
          </script>
        </body>
      </html>
    `;
    setPreviewDoc(combined);
  };

  // Update React preview with in-browser Babel
  const updateReactPreview = () => {
    const combined = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
          <style>${reactCss}</style>
          <script>
            (function() {
              const origLog = console.log;
              const origWarn = console.warn;
              const origError = console.error;
              const origInfo = console.info;

              function send(level, args) {
                try {
                  const msg = Array.from(args).map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ');
                  window.parent.postMessage({ type: 'COMMANDEV_CONSOLE', level, message: msg }, '*');
                } catch(e) {}
              }

              console.log = function(...args) { send('log', args); origLog.apply(console, args); };
              console.warn = function(...args) { send('warn', args); origWarn.apply(console, args); };
              console.error = function(...args) { send('error', args); origError.apply(console, args); };
              console.info = function(...args) { send('info', args); origInfo.apply(console, args); };
            })();
          </script>
        </head>
        <body>
          <div id="root"></div>
          <script type="text/babel">
            try {
              const { useState, useEffect, useRef, useMemo, useCallback } = React;
              ${reactCode}
              const root = ReactDOM.createRoot(document.getElementById('root'));
              if (typeof App !== 'undefined') {
                root.render(<App />);
              }
            } catch (err) {
              document.getElementById('root').innerHTML = '<div style="color:#f43f5e; background:#881337/30; border:1px solid #f43f5e; padding:1rem; border-radius:0.5rem; font-family:monospace; font-size:12px;"><strong>React Runtime Error:</strong> ' + (err.message || err) + '</div>';
              console.error(err.message || String(err));
            }
          </script>
        </body>
      </html>
    `;
    setPreviewDoc(combined);
  };

  useEffect(() => {
    if (langMode === 'web') {
      updateWebPreview();
    } else if (langMode === 'react') {
      updateReactPreview();
    }
  }, [htmlCode, cssCode, jsCode, reactCode, reactCss, langMode]);

  // Keyboard shortcut Ctrl+Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (langMode === 'python') {
          handleRunPython();
        } else if (langMode === 'react') {
          updateReactPreview();
        } else {
          updateWebPreview();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [langMode, pyCode, pyStdin, htmlCode, cssCode, jsCode, reactCode, reactCss]);

  const handleRunPython = () => {
    setIsRunning(true);
    setPyOutput('');
    setPyError(undefined);

    const startTime = performance.now();
    try {
      const res = executePython(pyCode, pyStdin);
      const endTime = performance.now();
      setPyExecTime(Math.round(endTime - startTime));
      setPyOutput(res.output);
      setPyError(res.error);
    } catch (err: any) {
      setPyError(err.message || 'Eksekusi gagal');
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopyCode = () => {
    const textToCopy = langMode === 'python' ? pyCode : langMode === 'react' ? reactCode : activeWebTab === 'html' ? htmlCode : activeWebTab === 'css' ? cssCode : jsCode;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    let content = '';
    let filename = '';
    let type = 'text/plain';

    if (langMode === 'python') {
      content = pyCode;
      filename = 'main.py';
      type = 'text/x-python';
    } else if (langMode === 'react') {
      content = reactCode;
      filename = 'App.jsx';
      type = 'text/javascript';
    } else {
      content = `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <style>\n${cssCode}\n  </style>\n</head>\n<body>\n${htmlCode}\n  <script>\n${jsCode}\n  </script>\n</body>\n</html>`;
      filename = 'index.html';
      type = 'text/html';
    }

    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (langMode === 'python') {
      setPyCode('');
      setPyOutput('');
      setPyError(undefined);
    } else if (langMode === 'react') {
      setReactCode('');
    } else {
      if (activeWebTab === 'html') setHtmlCode('');
      if (activeWebTab === 'css') setCssCode('');
      if (activeWebTab === 'js') setJsCode('');
    }
  };

  const handleLoadTemplate = (template: any) => {
    if (langMode === 'web') {
      setHtmlCode(template.html);
      setCssCode(template.css);
      setJsCode(template.js);
      setConsoleLogs([]);
    } else if (langMode === 'react') {
      setReactCode(template.code);
      setReactCss(template.css);
      setConsoleLogs([]);
    } else {
      setPyCode(template.py);
      setPyOutput('');
      setPyError(undefined);
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 text-slate-100 overflow-hidden">
      
      {/* Top Main Navigation Bar */}
      <div className="bg-slate-950 border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
        
        {/* Language & Environment Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setLangMode('web')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              langMode === 'web' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-orange-400" />
            <span>Web (HTML/CSS/JS)</span>
          </button>

          <button
            onClick={() => setLangMode('react')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              langMode === 'react' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Atom className="w-3.5 h-3.5 text-cyan-300" />
            <span>React 18+ Live JSX</span>
          </button>

          <button
            onClick={() => setLangMode('css-studio')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              langMode === 'css-studio' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-purple-300" />
            <span>CSS Layout Studio</span>
          </button>

          <button
            onClick={() => setLangMode('python')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              langMode === 'python' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-blue-300" />
            <span>Python 3.12</span>
          </button>

          <button
            onClick={() => setLangMode('git')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              langMode === 'git' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5 text-rose-300" />
            <span>Git & GitHub CLI</span>
          </button>

          <button
            onClick={() => setLangMode('api-tester')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              langMode === 'api-tester' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Server className="w-3.5 h-3.5 text-indigo-300" />
            <span>REST API Client</span>
          </button>

          <button
            onClick={() => setLangMode('sql-studio')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              langMode === 'sql-studio' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-emerald-300" />
            <span>SQL Studio</span>
          </button>

          <button
            onClick={() => setLangMode('unit-test')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              langMode === 'unit-test' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-teal-300" />
            <span>Unit Test & TDD</span>
          </button>
        </div>

        {/* Global Action Toolbar */}
        <div className="flex items-center gap-2 ml-auto">
          {langMode !== 'git' && langMode !== 'css-studio' && langMode !== 'api-tester' && langMode !== 'sql-studio' && langMode !== 'unit-test' && (
            <>
              {/* Template Selector Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors cursor-pointer">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Template</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                <div className="absolute right-0 top-full mt-1.5 w-60 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-1.5 hidden group-hover:block z-50">
                  <div className="text-[10px] font-bold text-slate-500 px-2 py-1 uppercase tracking-wider">
                    Pilih Template Kode
                  </div>
                  {langMode === 'web' && CODE_TEMPLATES.web.map((t, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleLoadTemplate(t)}
                      className="w-full text-left px-2.5 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-indigo-600/30 rounded-lg transition-colors"
                    >
                      {t.name}
                    </button>
                  ))}
                  {langMode === 'react' && CODE_TEMPLATES.react.map((t, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleLoadTemplate(t)}
                      className="w-full text-left px-2.5 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-cyan-600/30 rounded-lg transition-colors"
                    >
                      {t.name}
                    </button>
                  ))}
                  {langMode === 'python' && CODE_TEMPLATES.python.map((t, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleLoadTemplate(t)}
                      className="w-full text-left px-2.5 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-blue-600/30 rounded-lg transition-colors"
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Copy Button */}
              <button
                onClick={handleCopyCode}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-colors cursor-pointer"
                title="Salin Kode"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>

              {/* Download Button */}
              <button
                onClick={handleDownload}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-colors cursor-pointer"
                title="Unduh File"
              >
                <Download className="w-3.5 h-3.5" />
              </button>

              {/* Clear Editor */}
              <button
                onClick={handleClear}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-rose-400 rounded-lg border border-slate-700 transition-colors cursor-pointer"
                title="Bersihkan Editor"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>

              {/* Run Trigger */}
              <button
                onClick={langMode === 'python' ? handleRunPython : langMode === 'react' ? updateReactPreview : updateWebPreview}
                disabled={isRunning}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white rounded-lg text-xs font-bold shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>{isRunning ? 'Menjalankan...' : 'Jalankan'}</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {langMode === 'git' ? (
        <div className="flex-1 p-4 overflow-hidden bg-slate-950">
          <GitSimulator />
        </div>
      ) : langMode === 'css-studio' ? (
        <div className="flex-1 p-4 overflow-hidden bg-slate-950">
          <CssInteractiveStudio />
        </div>
      ) : langMode === 'api-tester' ? (
        <div className="flex-1 overflow-hidden bg-slate-950">
          <ApiTesterStudio />
        </div>
      ) : langMode === 'sql-studio' ? (
        <div className="flex-1 overflow-hidden bg-slate-950">
          <SqlInteractiveStudio />
        </div>
      ) : langMode === 'unit-test' ? (
        <div className="flex-1 overflow-hidden bg-slate-950">
          <TestRunnerStudio />
        </div>
      ) : (
        <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden">
          
          {/* LEFT: Code Editor Pane */}
          <div className="flex-1 flex flex-col bg-[#0b0f19] border-r border-slate-800 min-h-0">
            
            {/* Editor Sub-Tabs */}
            <div className="bg-[#121622] px-3 py-2 border-b border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                {langMode === 'web' && (
                  <>
                    <button
                      onClick={() => setActiveWebTab('html')}
                      className={`px-3 py-1 rounded-md font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                        activeWebTab === 'html' ? 'bg-[#1a202c] text-orange-400 font-bold border border-slate-700' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <FileCode2 className="w-3.5 h-3.5 text-orange-400" />
                      <span>index.html</span>
                    </button>
                    <button
                      onClick={() => setActiveWebTab('css')}
                      className={`px-3 py-1 rounded-md font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                        activeWebTab === 'css' ? 'bg-[#1a202c] text-sky-400 font-bold border border-slate-700' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Palette className="w-3.5 h-3.5 text-sky-400" />
                      <span>style.css</span>
                    </button>
                    <button
                      onClick={() => setActiveWebTab('js')}
                      className={`px-3 py-1 rounded-md font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                        activeWebTab === 'js' ? 'bg-[#1a202c] text-amber-400 font-bold border border-slate-700' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Terminal className="w-3.5 h-3.5 text-amber-400" />
                      <span>app.js</span>
                    </button>
                  </>
                )}

                {langMode === 'react' && (
                  <span className="px-3 py-1 bg-[#1a202c] text-cyan-400 font-mono text-xs font-bold rounded-md border border-slate-700 flex items-center gap-1.5">
                    <Atom className="w-3.5 h-3.5" />
                    <span>App.jsx (React 18 Component)</span>
                  </span>
                )}

                {langMode === 'python' && (
                  <span className="px-3 py-1 bg-[#1a202c] text-blue-400 font-mono text-xs font-bold rounded-md border border-slate-700 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>main.py</span>
                  </span>
                )}
              </div>

              <span className="text-[11px] text-slate-500 font-mono">
                Ctrl + Enter untuk Run
              </span>
            </div>

            {/* Code Input Area */}
            <div className="flex-1 overflow-auto custom-scrollbar font-mono text-xs sm:text-sm p-2">
              {langMode === 'web' ? (
                activeWebTab === 'html' ? (
                  <Editor
                    value={htmlCode}
                    onValueChange={(c: string) => setHtmlCode(c)}
                    highlight={(c: string) => Prism.highlight(c, Prism.languages.markup, 'markup')}
                    padding={12}
                    style={{ fontFamily: '"JetBrains Mono", monospace', minHeight: '100%', color: '#f8fafc' }}
                  />
                ) : activeWebTab === 'css' ? (
                  <Editor
                    value={cssCode}
                    onValueChange={(c: string) => setCssCode(c)}
                    highlight={(c: string) => Prism.highlight(c, Prism.languages.css, 'css')}
                    padding={12}
                    style={{ fontFamily: '"JetBrains Mono", monospace', minHeight: '100%', color: '#f8fafc' }}
                  />
                ) : (
                  <Editor
                    value={jsCode}
                    onValueChange={(c: string) => setJsCode(c)}
                    highlight={(c: string) => Prism.highlight(c, Prism.languages.javascript, 'javascript')}
                    padding={12}
                    style={{ fontFamily: '"JetBrains Mono", monospace', minHeight: '100%', color: '#f8fafc' }}
                  />
                )
              ) : langMode === 'react' ? (
                <Editor
                  value={reactCode}
                  onValueChange={(c: string) => setReactCode(c)}
                  highlight={(c: string) => Prism.highlight(c, Prism.languages.javascript, 'javascript')}
                  padding={12}
                  style={{ fontFamily: '"JetBrains Mono", monospace', minHeight: '100%', color: '#f8fafc' }}
                />
              ) : (
                <Editor
                  value={pyCode}
                  onValueChange={(c: string) => setPyCode(c)}
                  highlight={(c: string) => Prism.highlight(c, Prism.languages.python, 'python')}
                  padding={12}
                  style={{ fontFamily: '"JetBrains Mono", monospace', minHeight: '100%', color: '#f8fafc' }}
                />
              )}
            </div>

          </div>

          {/* RIGHT: Output & Preview Pane */}
          <div className="flex-1 flex flex-col bg-slate-950 min-h-0">
            
            {langMode === 'python' ? (
              <div className="flex-1 flex flex-col min-h-0">
                <div className="bg-[#121622] px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1.5 text-blue-400 font-bold">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Python Console Output</span>
                  </span>
                  {pyExecTime > 0 && <span>{pyExecTime}ms</span>}
                </div>

                <div className="flex-1 p-4 font-mono text-xs overflow-auto custom-scrollbar space-y-2">
                  {!pyOutput && !pyError && (
                    <div className="text-slate-500 text-xs">
                      # Output eksekusi Python akan muncul di sini...
                    </div>
                  )}

                  {pyOutput && (
                    <pre className="text-emerald-400 whitespace-pre-wrap leading-relaxed m-0 font-mono">
                      {pyOutput}
                    </pre>
                  )}

                  {pyError && (
                    <div className="p-3 bg-rose-950/40 border border-rose-800 text-rose-300 rounded-lg text-xs">
                      <strong className="block text-rose-400 mb-1">Traceback Error:</strong>
                      <pre className="m-0 font-mono whitespace-pre-wrap">{pyError}</pre>
                    </div>
                  )}
                </div>

                {/* Stdin Box */}
                <div className="p-3 bg-[#121622] border-t border-slate-800 flex items-center gap-2 text-xs">
                  <span className="font-mono text-slate-400">STDIN:</span>
                  <input
                    type="text"
                    value={pyStdin}
                    onChange={(e) => setPyStdin(e.target.value)}
                    placeholder="Input simulasi untuk input()..."
                    className="flex-1 bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-slate-200 text-xs"
                  />
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col min-h-0 bg-white relative">
                
                {/* Browser Preview Header */}
                <div className="px-3 py-2 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-500 flex items-center justify-between flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {langMode === 'react' ? 'React Live Component Render' : 'HTML5 / CSS / JS Sandbox'}
                    </span>
                  </div>

                  <button
                    onClick={() => setShowConsole(!showConsole)}
                    className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold transition-colors cursor-pointer ${
                      showConsole 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Terminal className="w-3 h-3" />
                    <span>Console ({consoleLogs.length})</span>
                  </button>
                </div>

                {/* Live Sandbox Iframe */}
                <iframe
                  srcDoc={previewDoc}
                  title="live-preview"
                  className="flex-1 w-full border-0 bg-white"
                  sandbox="allow-scripts allow-modals"
                />

                {/* Console Logs Drawer */}
                {showConsole && (
                  <div className="h-44 bg-[#090d16] border-t border-slate-800 p-3 flex flex-col font-mono text-xs overflow-hidden">
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 text-[11px] text-slate-400">
                      <span className="font-bold flex items-center gap-1 text-slate-300">
                        <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                        Developer Console Interceptor
                      </span>
                      <button
                        onClick={() => setConsoleLogs([])}
                        className="text-[10px] text-slate-500 hover:text-slate-300 cursor-pointer"
                      >
                        Bersihkan
                      </button>
                    </div>

                    <div className="flex-1 overflow-auto custom-scrollbar pt-2 space-y-1">
                      {consoleLogs.length === 0 ? (
                        <div className="text-slate-600 italic text-[11px]">
                          Tidak ada log console baru.
                        </div>
                      ) : (
                        consoleLogs.map((log, idx) => (
                          <div 
                            key={idx}
                            className={`flex items-start gap-2 text-[11px] leading-relaxed ${
                              log.type === 'error' ? 'text-rose-400 bg-rose-950/20 px-1 rounded' :
                              log.type === 'warn' ? 'text-amber-400' :
                              log.type === 'info' ? 'text-sky-400' :
                              'text-emerald-300'
                            }`}
                          >
                            <span className="text-slate-600 text-[9px] shrink-0 font-sans">[{log.time}]</span>
                            <span className="font-bold uppercase text-[9px] opacity-75 shrink-0">{log.type}:</span>
                            <span className="whitespace-pre-wrap break-all">{log.message}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
};

