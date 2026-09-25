import React, { useState, useEffect } from 'react';
import EditorDefault from 'react-simple-code-editor';
import Prism from '../lib/prismLoader';
import { 
  PlusCircle, 
  Save, 
  Download, 
  Upload, 
  Code2, 
  Terminal, 
  Play, 
  CheckCircle2, 
  AlertCircle, 
  FileJson, 
  Sparkles, 
  Layers, 
  Trash2,
  BookOpen,
  Check,
  FolderOpen
} from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { saveCustomChallengeToDb, getCustomChallengesFromDb, CustomChallengeData } from '../lib/db';
import { executePython } from '../utils/pythonInterpreter';

const Editor = (EditorDefault as any).default || EditorDefault;

const SEED_CUSTOM_CHALLENGES: CustomChallengeData[] = [
  {
    id: 'custom-pal-py',
    title: 'Palindrome Sentence Checker (Python)',
    description: 'Buat fungsi `is_palindrome_sentence(s)` yang memeriksa apakah sebuah kalimat adalah palindrom, dengan mengabaikan spasi dan tanda baca.',
    category: 'Algoritma String',
    difficulty: 'Intermediate',
    language: 'python',
    starterCode: `def is_palindrome_sentence(s):\n    # Hapus spasi dan ubah ke lowercase\n    cleaned = ''.join(c.lower() for c in s if c.isalnum())\n    # Kembalikan True jika cleaned sama dengan kebalikannya\n    return cleaned == cleaned[::-1]\n\n# Uji Coba:\nprint(is_palindrome_sentence("Kasur ini rusak"))  # True\nprint(is_palindrome_sentence("Belajar di COMMANDEV")) # False`,
    testCheck: 'cleaned == cleaned[::-1]',
    xpReward: 80,
    authorId: 'commandev-team',
    authorName: 'COMMANDEV Curriculum Team',
    createdAt: new Date().toISOString()
  },
  {
    id: 'custom-flex-web',
    title: 'Responsive Navbar with Flexbox (Web)',
    description: 'Bangun komponen `<header>` dengan navigasi `<nav>` menggunakan Flexbox `justify-content: space-between` dan `align-items: center`.',
    category: 'Web Layout',
    difficulty: 'Beginner',
    language: 'web',
    starterCode: `<header class="navbar">\n  <div class="logo">COMMANDEV</div>\n  <nav>\n    <a href="#courses">Courses</a>\n    <a href="#playground">Playground</a>\n  </nav>\n</header>`,
    testCheck: '<header class="navbar">',
    xpReward: 60,
    authorId: 'commandev-team',
    authorName: 'COMMANDEV Curriculum Team',
    createdAt: new Date().toISOString()
  }
];

export const AdminCmsView: React.FC<{ onTryChallenge?: (challenge: CustomChallengeData) => void }> = ({ onTryChallenge }) => {
  const { user } = useAuth();
  const [challenges, setChallenges] = useState<CustomChallengeData[]>(() => {
    try {
      const saved = localStorage.getItem('commandev_custom_challenges') || localStorage.getItem('codera_custom_challenges');
      if (saved) return JSON.parse(saved);
    } catch {}
    return SEED_CUSTOM_CHALLENGES;
  });

  const [activeTab, setActiveTab] = useState<'create' | 'list' | 'json'>('create');

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Algoritma');
  const [difficulty, setDifficulty] = useState('Beginner');
  const [language, setLanguage] = useState<'web' | 'python'>('python');
  const [starterCode, setStarterCode] = useState('def solve(data):\n    # Tulis solusi kamu di sini\n    pass\n');
  const [testCheck, setTestCheck] = useState('def solve');
  const [xpReward, setXpReward] = useState(75);

  // Test Runner inside CMS
  const [testOutput, setTestOutput] = useState('');
  const [testPassed, setTestPassed] = useState<boolean | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // JSON Import/Export state
  const [jsonInput, setJsonInput] = useState('');
  const [jsonError, setJsonError] = useState('');

  useEffect(() => {
    getCustomChallengesFromDb().then(dbChallenges => {
      if (dbChallenges && dbChallenges.length > 0) {
        setChallenges(dbChallenges);
      }
    });
  }, []);

  const handleTestCode = () => {
    if (language === 'python') {
      try {
        const res = executePython(starterCode);
        setTestOutput(res.output || res.error || 'Eksekusi selesai tanpa output.');
        if (testCheck && starterCode.includes(testCheck.trim())) {
          setTestPassed(true);
        } else {
          setTestPassed(false);
        }
      } catch (err: any) {
        setTestOutput(err.message);
        setTestPassed(false);
      }
    } else {
      setTestOutput('HTML/CSS/JS snippet tervalidasi syntax!');
      setTestPassed(starterCode.includes(testCheck.trim()));
    }
  };

  const handleSaveChallenge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !starterCode.trim()) return;

    const newChallenge: CustomChallengeData = {
      id: `chal-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      category,
      difficulty,
      language,
      starterCode,
      testCheck: testCheck.trim(),
      xpReward: Number(xpReward) || 50,
      authorId: user?.uid || 'guest-author',
      authorName: user?.displayName || 'COMMANDEV Contributor',
      createdAt: new Date().toISOString()
    };

    const updated = [newChallenge, ...challenges];
    setChallenges(updated);
    localStorage.setItem('commandev_custom_challenges', JSON.stringify(updated));
    localStorage.setItem('codera_custom_challenges', JSON.stringify(updated));

    if (user) {
      await saveCustomChallengeToDb(newChallenge);
    }

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);

    // Reset Form
    setTitle('');
    setDescription('');
    setTestOutput('');
    setTestPassed(null);
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(challenges, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `commandev_challenges_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = () => {
    try {
      setJsonError('');
      const parsed = JSON.parse(jsonInput);
      if (Array.isArray(parsed)) {
        setChallenges(parsed);
        localStorage.setItem('commandev_custom_challenges', JSON.stringify(parsed));
        localStorage.setItem('codera_custom_challenges', JSON.stringify(parsed));
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      } else {
        setJsonError('Format JSON harus berupa Array daftar tantangan.');
      }
    } catch (err: any) {
      setJsonError(`JSON Invalid: ${err.message}`);
    }
  };

  const handleDeleteChallenge = (id: string) => {
    const filtered = challenges.filter(c => c.id !== id);
    setChallenges(filtered);
    localStorage.setItem('commandev_custom_challenges', JSON.stringify(filtered));
    localStorage.setItem('codera_custom_challenges', JSON.stringify(filtered));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-white">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Lab & CMS Engine</span>
            </span>
            <span className="text-xs text-slate-400 font-mono">Content Management System</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Pusat Pembuatan Tantangan & Kurikulum Lab
          </h1>
          <p className="text-sm text-slate-300 max-w-xl">
            Buat tantangan koding kustom, buat studi kasus baru, lakukan pengujian live validator, dan ekspor kurikulum dalam format JSON terstandarisasi.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-950 p-1.5 rounded-2xl border border-slate-800 flex-shrink-0">
          <button
            onClick={() => setActiveTab('create')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'create' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Buat Baru</span>
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'list' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FolderOpen className="w-4 h-4" />
            <span>Daftar Lab ({challenges.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'json' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileJson className="w-4 h-4" />
            <span>JSON Sync</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Tantangan koding berhasil disimpan ke sistem dan Firestore database!</span>
        </div>
      )}

      {/* TAB 1: CREATE CHALLENGE BUILDER */}
      {activeTab === 'create' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left: Configuration Form */}
          <form onSubmit={handleSaveChallenge} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-5 shadow-xl">
            <h2 className="text-lg font-bold flex items-center gap-2 text-white">
              <PlusCircle className="w-5 h-5 text-indigo-400" />
              <span>Detail Informasi Tantangan</span>
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Judul Tantangan</label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="cth: Algoritma Palindrome Sentence Checker"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Deskripsi Soal & Instruksi</label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Jelaskan spesifikasi tugas, input yang diharapkan, dan output yang dihasilkan..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Bahasa</label>
                <select
                  value={language}
                  onChange={(e: any) => setLanguage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-indigo-500"
                >
                  <option value="python">Python 3.12</option>
                  <option value="web">Web (HTML/JS)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Kategori</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-indigo-500"
                >
                  <option value="Algoritma">Algoritma</option>
                  <option value="Web Layout">Web Layout</option>
                  <option value="Python OOP">Python OOP</option>
                  <option value="Debugging">Debugging</option>
                  <option value="Data Structure">Data Structure</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Tingkat</label>
                <select
                  value={difficulty}
                  onChange={e => setDifficulty(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-indigo-500"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">XP Reward</label>
                <input
                  type="number"
                  value={xpReward}
                  onChange={e => setXpReward(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-indigo-500 font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Kata Kunci / Syarat Validasi Lulus</label>
              <input
                type="text"
                value={testCheck}
                onChange={e => setTestCheck(e.target.value)}
                placeholder="cth: cleaned == cleaned[::-1] atau <header class="
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 font-mono"
              />
              <span className="text-[10px] text-slate-400">Pemeriksaan sintaks atau eksekusi yang wajib ada pada kode peserta.</span>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={handleTestCode}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-2 border border-slate-700 transition-colors"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Uji Coba Kode</span>
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Tantangan</span>
              </button>
            </div>
          </form>

          {/* Right: Starter Code Editor & Live Test Result */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-4 shadow-xl flex flex-col">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold flex items-center gap-2 text-white">
                <Code2 className="w-4 h-4 text-indigo-400" />
                <span>Kode Template Pemula (Starter Code)</span>
              </h2>
              <span className="text-[11px] font-mono text-slate-400 uppercase">{language}</span>
            </div>

            <div className="flex-1 min-h-[220px] rounded-2xl bg-[#0b0f19] border border-slate-800 p-4 font-mono text-xs overflow-auto custom-scrollbar">
              <Editor
                value={starterCode}
                onValueChange={(code: string) => setStarterCode(code)}
                highlight={(code: string) => Prism.highlight(code, language === 'python' ? Prism.languages.python : Prism.languages.markup, language)}
                padding={10}
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 13,
                  minHeight: '100%',
                }}
              />
            </div>

            {/* Test Run Box */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Output Uji Coba:</span>
                </span>
                {testPassed !== null && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    testPassed ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}>
                    {testPassed ? '✓ Validasi Lulus' : '✕ Syarat Belum Terpenuhi'}
                  </span>
                )}
              </div>
              <pre className="text-xs font-mono text-slate-300 whitespace-pre-wrap max-h-32 overflow-y-auto">
                {testOutput || '// Klik "Uji Coba Kode" untuk menguji template ini.'}
              </pre>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: LIST OF ALL CUSTOM CHALLENGES */}
      {activeTab === 'list' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Katalog Tantangan Komunitas ({challenges.length})</h2>
            <button
              onClick={handleExportJson}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold flex items-center gap-2 border border-slate-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Ekspor Semua (.json)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {challenges.map(chal => (
              <div key={chal.id} className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 shadow-lg flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {chal.category}
                    </span>
                    <span className="text-xs font-mono text-amber-400 font-bold">
                      +{chal.xpReward} XP
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white">{chal.title}</h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{chal.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">Oleh: {chal.authorName}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDeleteChallenge(chal.id)}
                      className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors"
                      title="Hapus Tantangan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {onTryChallenge && (
                      <button
                        onClick={() => onTryChallenge(chal)}
                        className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/30"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>Coba Tantangan</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: JSON IMPORT / EXPORT */}
      {activeTab === 'json' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold">Sinkronisasi & Migrasi Schema JSON</h2>
              <p className="text-xs text-slate-400">Impor kurikulum dan tantangan dari format JSON atau ekspor konfigurasi lokal.</p>
            </div>
            <button
              onClick={handleExportJson}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Unduh File JSON</span>
            </button>
          </div>

          {jsonError && (
            <div className="p-3 bg-rose-950/50 border border-rose-800 rounded-xl text-xs text-rose-300">
              {jsonError}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300">JSON Payload</label>
            <textarea
              rows={10}
              value={jsonInput}
              onChange={e => setJsonInput(e.target.value)}
              placeholder='Tempelkan array JSON di sini, contoh: [{"id": "c1", "title": "My Challenge", ...}]'
              className="w-full bg-[#0b0f19] border border-slate-800 rounded-2xl p-4 font-mono text-xs text-slate-200 outline-none focus:border-indigo-500 leading-relaxed custom-scrollbar"
            />
          </div>

          <button
            onClick={handleImportJson}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>Impor & Terapkan ke Katalog</span>
          </button>
        </div>
      )}

    </div>
  );
};
