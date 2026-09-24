import React, { useState } from 'react';
import { useSettings, EditorTheme } from '../lib/SettingsContext';
import { 
  Sliders, 
  Palette, 
  Type, 
  Code, 
  RotateCcw, 
  Check, 
  Sparkles, 
  Monitor, 
  Eye, 
  ShieldCheck, 
  Trash2,
  CheckCircle2
} from 'lucide-react';
import Prism from '../lib/prismLoader';

export const SettingsView: React.FC = () => {
  const { settings, updateSettings, resetSettings, getThemeStyles } = useSettings();
  const [resetNotice, setResetNotice] = useState(false);
  const themeStyles = getThemeStyles();

  const themes: { id: EditorTheme; name: string; desc: string; colors: string[] }[] = [
    { id: 'dracula', name: 'Dracula Dark', desc: 'Tema gelap kontras tinggi dengan warna ungu dan pink', colors: ['#282a36', '#ff79c6', '#50fa7b', '#8be9fd'] },
    { id: 'onedark', name: 'One Dark Pro', desc: 'Tema modern dari Atom dengan warna lembut dan seimbang', colors: ['#282c34', '#e06c75', '#98c379', '#61afef'] },
    { id: 'monokai', name: 'Monokai Classic', desc: 'Tema legendaris kontras tinggi untuk efisiensi koding', colors: ['#272822', '#f92672', '#a6e22e', '#66d9ef'] },
    { id: 'github-dark', name: 'GitHub Dark', desc: 'Tema resmi GitHub Dark dengan palet presisi', colors: ['#0d1117', '#ff7b72', '#7ee787', '#79c0ff'] },
    { id: 'vscode-dark', name: 'VS Code Modern', desc: 'Standar de facto developer Visual Studio Code', colors: ['#1e1e1e', '#ce9178', '#6a9955', '#4fc1ff'] },
    { id: 'minimal-light', name: 'Clean Paper Light', desc: 'Tema terang minimalis dengan kontras baca jernih', colors: ['#ffffff', '#d73a49', '#22863a', '#005cc5'] }
  ];

  const previewSnippet = `// Preview Kode COMMANDEV Engine
function calculateDeveloperRank(xp) {
  if (xp >= 2000) return "Fullstack Maestro";
  if (xp >= 1000) return "Code Artisan";
  return "Junior Developer";
}
console.log(calculateDeveloperRank(1500));`;

  const handleResetCache = () => {
    if (window.confirm('Reset semua preferensi editor ke default?')) {
      resetSettings();
      setResetNotice(true);
      setTimeout(() => setResetNotice(false), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 text-white">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 flex items-center justify-between shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" />
              <span>Developer Workspace</span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Pengaturan & Kustomisasi Editor
          </h1>
          <p className="text-sm text-slate-300">
            Sesuaikan tampilan editor kode, font, tema warna, dan perilaku lingkungan koding COMMANDEV.
          </p>
        </div>
      </div>

      {resetNotice && (
        <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Pengaturan berhasil dikembalikan ke standar awal!</span>
        </div>
      )}

      {/* SECTION 1: THEME SELECTOR */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Palette className="w-5 h-5 text-indigo-400" />
            <span>Pilihan Tema Editor (Syntax Highlighting)</span>
          </h2>
          <span className="text-xs font-mono text-indigo-400 uppercase font-bold">Aktif: {settings.theme}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {themes.map(t => {
            const isSelected = settings.theme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => updateSettings({ theme: t.id })}
                className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                  isSelected 
                    ? 'border-indigo-500 bg-indigo-950/30 shadow-md shadow-indigo-600/20' 
                    : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-white">{t.name}</span>
                    {isSelected && <Check className="w-4 h-4 text-indigo-400" />}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">{t.desc}</p>
                </div>

                {/* Color Swatch */}
                <div className="flex items-center gap-1.5 pt-2 border-t border-slate-800/80">
                  {t.colors.map((c, i) => (
                    <span key={i} className="w-4 h-4 rounded-full border border-black/30" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: LIVE CODE PREVIEW */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-4 shadow-xl">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-indigo-400" />
            <span>Live Preview Tampilan Editor:</span>
          </span>
          <span>{settings.fontSize}px • Tab: {settings.tabSize} Spaces • Wrap: {settings.wordWrap ? 'On' : 'Off'}</span>
        </div>

        <div 
          className="p-5 rounded-2xl border transition-all font-mono shadow-inner overflow-x-auto"
          style={{
            backgroundColor: themeStyles.bg,
            color: themeStyles.text,
            borderColor: themeStyles.border,
            fontSize: `${settings.fontSize}px`
          }}
        >
          <pre className="m-0 leading-relaxed font-mono">
            <code>{previewSnippet}</code>
          </pre>
        </div>
      </div>

      {/* SECTION 3: TYPOGRAPHY & EDITOR BEHAVIOR */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Type className="w-5 h-5 text-indigo-400" />
          <span>Tipografi & Format Koding</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Font Size */}
          <div className="space-y-3 p-4 bg-slate-950 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-300">Ukuran Font ({settings.fontSize}px)</span>
            </div>
            <div className="flex items-center gap-2">
              {[12, 14, 16, 18].map(size => (
                <button
                  key={size}
                  onClick={() => updateSettings({ fontSize: size })}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    settings.fontSize === size 
                      ? 'bg-indigo-600 text-white shadow-sm' 
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {size}px
                </button>
              ))}
            </div>
          </div>

          {/* Tab Spaces */}
          <div className="space-y-3 p-4 bg-slate-950 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-300">Ukuran Tab Indentasi</span>
            </div>
            <div className="flex items-center gap-2">
              {[2, 4].map(tabs => (
                <button
                  key={tabs}
                  onClick={() => updateSettings({ tabSize: tabs })}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    settings.tabSize === tabs 
                      ? 'bg-indigo-600 text-white shadow-sm' 
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {tabs} Spaces
                </button>
              ))}
            </div>
          </div>

          {/* Word Wrap Toggle */}
          <div className="flex items-center justify-between p-4 bg-slate-950 rounded-2xl border border-slate-800">
            <div>
              <div className="text-xs font-bold text-slate-200">Word Wrap (Bungkus Baris Panjang)</div>
              <div className="text-[11px] text-slate-400">Mencegah horizontal scrolling pada baris panjang</div>
            </div>
            <button
              onClick={() => updateSettings({ wordWrap: !settings.wordWrap })}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                settings.wordWrap ? 'bg-indigo-600' : 'bg-slate-800'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
                settings.wordWrap ? 'right-1' : 'left-1'
              }`} />
            </button>
          </div>

          {/* Line Numbers Toggle */}
          <div className="flex items-center justify-between p-4 bg-slate-950 rounded-2xl border border-slate-800">
            <div>
              <div className="text-xs font-bold text-slate-200">Nomor Baris Kode</div>
              <div className="text-[11px] text-slate-400">Tampilkan penomoran baris pada editor</div>
            </div>
            <button
              onClick={() => updateSettings({ lineNumbers: !settings.lineNumbers })}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                settings.lineNumbers ? 'bg-indigo-600' : 'bg-slate-800'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
                settings.lineNumbers ? 'right-1' : 'left-1'
              }`} />
            </button>
          </div>

        </div>
      </div>



      {/* SECTION 4: ACTIONS & RESET */}
      <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-200">Reset Konfigurasi</h3>
          <p className="text-xs text-slate-400">Kembalikan semua preferensi editor ke standar awal COMMANDEV.</p>
        </div>

        <button
          onClick={handleResetCache}
          className="px-4 py-2.5 bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 border border-rose-800/60 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Pengaturan</span>
        </button>
      </div>

    </div>
  );
};
