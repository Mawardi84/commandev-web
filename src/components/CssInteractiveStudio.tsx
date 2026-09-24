import React, { useState } from 'react';
import { 
  Palette, 
  Layers, 
  Copy, 
  Check, 
  RotateCcw, 
  Sliders, 
  Sparkles, 
  Maximize2, 
  Play, 
  Eye, 
  Plus, 
  Trash2,
  Box
} from 'lucide-react';
import { motion } from 'motion/react';

export const CssInteractiveStudio: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'flexbox' | 'grid' | 'animation' | 'boxmodel'>('flexbox');
  const [copied, setCopied] = useState(false);

  // Flexbox State
  const [flexDirection, setFlexDirection] = useState<'row' | 'row-reverse' | 'column' | 'column-reverse'>('row');
  const [justifyContent, setJustifyContent] = useState<string>('center');
  const [alignItems, setAlignItems] = useState<string>('center');
  const [flexWrap, setFlexWrap] = useState<string>('nowrap');
  const [flexGap, setFlexGap] = useState<number>(16);
  const [itemCount, setItemCount] = useState<number>(4);

  // Grid State
  const [gridCols, setGridCols] = useState<string>('repeat(auto-fit, minmax(140px, 1fr))');
  const [gridGap, setGridGap] = useState<number>(16);
  const [gridItemCount, setGridItemCount] = useState<number>(6);

  // Animation State
  const [animType, setAnimType] = useState<'pulse' | 'bounce' | 'spin' | 'float'>('float');
  const [animDuration, setAnimDuration] = useState<number>(2);
  const [animTiming, setAnimTiming] = useState<string>('ease-in-out');

  // Box Model State
  const [padding, setPadding] = useState<number>(24);
  const [margin, setMargin] = useState<number>(16);
  const [borderWidth, setBorderWidth] = useState<number>(2);
  const [borderRadius, setBorderRadius] = useState<number>(12);

  const getGeneratedCss = () => {
    if (activeMode === 'flexbox') {
      return `.flex-container {
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-wrap: ${flexWrap};
  gap: ${flexGap}px;
  min-height: 280px;
  background-color: #0f172a;
  padding: 1.5rem;
  border-radius: 1rem;
}

.flex-item {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  padding: 1.25rem;
  border-radius: 0.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}`;
    }

    if (activeMode === 'grid') {
      return `.grid-container {
  display: grid;
  grid-template-columns: ${gridCols};
  gap: ${gridGap}px;
  background-color: #0f172a;
  padding: 1.5rem;
  border-radius: 1rem;
}

.grid-item {
  background: #1e293b;
  border: 1px solid #334155;
  color: #e2e8f0;
  padding: 1.5rem;
  border-radius: 0.75rem;
  text-align: center;
  font-weight: 600;
}`;
    }

    if (activeMode === 'animation') {
      return `@keyframes ${animType}Animation {
  0% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-16px) scale(1.05); }
  100% { transform: translateY(0px) scale(1); }
}

.animated-element {
  animation: ${animType}Animation ${animDuration}s ${animTiming} infinite;
  background: linear-gradient(135deg, #ec4899, #8b5cf6);
  width: 120px;
  height: 120px;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}`;
    }

    return `.box-model-element {
  margin: ${margin}px;
  padding: ${padding}px;
  border: ${borderWidth}px solid #6366f1;
  border-radius: ${borderRadius}px;
  background-color: #1e293b;
  color: #f8fafc;
  box-sizing: border-box;
}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getGeneratedCss());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
      
      {/* Top Header */}
      <div className="p-4 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>CSS3 Visual Layout Studio</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                LIVE INTERACTIVE
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Eksperimen tata letak CSS Flexbox, Grid, Animasi, dan Box Model dengan kendali visual real-time.
            </p>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveMode('flexbox')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'flexbox' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Flexbox
          </button>
          <button
            onClick={() => setActiveMode('grid')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'grid' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            CSS Grid
          </button>
          <button
            onClick={() => setActiveMode('animation')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'animation' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Keyframe FX
          </button>
          <button
            onClick={() => setActiveMode('boxmodel')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'boxmodel' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Box Model
          </button>
        </div>
      </div>

      {/* Main Studio Body: Controls on Left, Live Canvas & Output on Right */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
        
        {/* LEFT: Controls Panel */}
        <div className="w-full lg:w-80 bg-slate-900/90 border-r border-slate-800 p-5 overflow-y-auto space-y-5 text-xs">
          
          {/* FLEXBOX CONTROLS */}
          {activeMode === 'flexbox' && (
            <div className="space-y-4">
              <div className="font-bold text-slate-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                Kontrol Flexbox
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1.5">flex-direction</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(['row', 'row-reverse', 'column', 'column-reverse'] as const).map(dir => (
                    <button
                      key={dir}
                      onClick={() => setFlexDirection(dir)}
                      className={`p-2 rounded-lg font-mono text-[11px] border transition-all cursor-pointer ${
                        flexDirection === dir 
                          ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300 font-bold' 
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {dir}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1.5">justify-content</label>
                <select
                  value={justifyContent}
                  onChange={(e) => setJustifyContent(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 font-mono text-xs focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="flex-start">flex-start (Kiri)</option>
                  <option value="center">center (Pusat)</option>
                  <option value="flex-end">flex-end (Kanan)</option>
                  <option value="space-between">space-between (Bagi rata ujung)</option>
                  <option value="space-around">space-around (Rata keliling)</option>
                  <option value="space-evenly">space-evenly (Spasi identik)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1.5">align-items</label>
                <select
                  value={alignItems}
                  onChange={(e) => setAlignItems(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 font-mono text-xs focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="stretch">stretch (Tinggi penuh)</option>
                  <option value="center">center (Pusat vertikal)</option>
                  <option value="flex-start">flex-start (Atas)</option>
                  <option value="flex-end">flex-end (Bawah)</option>
                  <option value="baseline">baseline (Garis teks)</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-slate-400 font-semibold mb-1.5">
                  <span>gap</span>
                  <span className="font-mono text-indigo-400">{flexGap}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="48"
                  step="4"
                  value={flexGap}
                  onChange={(e) => setFlexGap(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-400 font-semibold mb-1.5">
                  <span>Jumlah Item</span>
                  <span className="font-mono text-indigo-400">{itemCount} item</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setItemCount(Math.max(1, itemCount - 1))}
                    className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg font-bold text-center cursor-pointer"
                  >
                    - Kurangi
                  </button>
                  <button
                    onClick={() => setItemCount(Math.min(10, itemCount + 1))}
                    className="flex-1 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-bold text-center cursor-pointer"
                  >
                    + Tambah
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* GRID CONTROLS */}
          {activeMode === 'grid' && (
            <div className="space-y-4">
              <div className="font-bold text-slate-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                Kontrol CSS Grid
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1.5">grid-template-columns</label>
                <div className="space-y-1.5">
                  {[
                    { label: 'Auto-Fit Responsive (Modern)', val: 'repeat(auto-fit, minmax(140px, 1fr))' },
                    { label: '3 Kolom Sama Rata (1fr 1fr 1fr)', val: 'repeat(3, 1fr)' },
                    { label: '2 Kolom (1fr 2fr)', val: '1fr 2fr' },
                    { label: '4 Kolom Tetap', val: 'repeat(4, 1fr)' }
                  ].map(template => (
                    <button
                      key={template.val}
                      onClick={() => setGridCols(template.val)}
                      className={`w-full text-left p-2 rounded-lg font-mono text-[11px] border transition-all cursor-pointer ${
                        gridCols === template.val 
                          ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300 font-bold' 
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-sans font-semibold text-slate-300">{template.label}</div>
                      <div className="text-[10px] text-slate-500 truncate">{template.val}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-400 font-semibold mb-1.5">
                  <span>grid gap</span>
                  <span className="font-mono text-indigo-400">{gridGap}px</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="40"
                  step="4"
                  value={gridGap}
                  onChange={(e) => setGridGap(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-400 font-semibold mb-1.5">
                  <span>Jumlah Grid Cell</span>
                  <span className="font-mono text-indigo-400">{gridItemCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setGridItemCount(Math.max(2, gridItemCount - 1))}
                    className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg font-bold cursor-pointer"
                  >
                    - Kurang
                  </button>
                  <button
                    onClick={() => setGridItemCount(Math.min(12, gridItemCount + 1))}
                    className="flex-1 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-bold cursor-pointer"
                  >
                    + Tambah
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ANIMATION CONTROLS */}
          {activeMode === 'animation' && (
            <div className="space-y-4">
              <div className="font-bold text-slate-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Keyframe FX
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1.5">Tipe Animasi</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(['float', 'pulse', 'bounce', 'spin'] as const).map(type => (
                    <button
                      key={type}
                      onClick={() => setAnimType(type)}
                      className={`p-2 rounded-lg font-bold uppercase text-[10px] border transition-all cursor-pointer ${
                        animType === type 
                          ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300' 
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-400 font-semibold mb-1.5">
                  <span>Durasi Animasi</span>
                  <span className="font-mono text-indigo-400">{animDuration}s</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="5"
                  step="0.5"
                  value={animDuration}
                  onChange={(e) => setAnimDuration(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1.5">Timing Function</label>
                <select
                  value={animTiming}
                  onChange={(e) => setAnimTiming(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 font-mono text-xs cursor-pointer"
                >
                  <option value="ease-in-out">ease-in-out</option>
                  <option value="ease">ease</option>
                  <option value="linear">linear</option>
                  <option value="cubic-bezier(0.68, -0.55, 0.27, 1.55)">bouncy cubic-bezier</option>
                </select>
              </div>
            </div>
          )}

          {/* BOX MODEL CONTROLS */}
          {activeMode === 'boxmodel' && (
            <div className="space-y-4">
              <div className="font-bold text-slate-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Box className="w-3.5 h-3.5 text-indigo-400" />
                Box Model Inspector
              </div>

              <div>
                <div className="flex justify-between text-slate-400 font-semibold mb-1.5">
                  <span>Padding (Ruang Dalam)</span>
                  <span className="font-mono text-emerald-400">{padding}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="48"
                  step="4"
                  value={padding}
                  onChange={(e) => setPadding(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-400 font-semibold mb-1.5">
                  <span>Margin (Ruang Luar)</span>
                  <span className="font-mono text-amber-400">{margin}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  step="4"
                  value={margin}
                  onChange={(e) => setMargin(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-400 font-semibold mb-1.5">
                  <span>Border Width & Radius</span>
                  <span className="font-mono text-indigo-400">{borderWidth}px / {borderRadius}px</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="range"
                    min="1"
                    max="8"
                    value={borderWidth}
                    onChange={(e) => setBorderWidth(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                  <input
                    type="range"
                    min="0"
                    max="32"
                    value={borderRadius}
                    onChange={(e) => setBorderRadius(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

        </div>

        {/* RIGHT: Visual Canvas & Code Output */}
        <div className="flex-1 flex flex-col min-h-0 bg-slate-950 overflow-hidden">
          
          {/* Visual Canvas Area */}
          <div className="flex-1 p-6 flex flex-col justify-center items-center bg-[#070b14] overflow-auto relative">
            
            <div className="absolute top-3 left-4 text-[11px] text-slate-500 font-mono flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-indigo-400" />
              <span>Preview Kanvas Interaktif</span>
            </div>

            {/* LIVE FLEXBOX PREVIEW */}
            {activeMode === 'flexbox' && (
              <div 
                className="w-full max-w-2xl min-h-[260px] p-6 rounded-2xl bg-slate-900 border-2 border-dashed border-indigo-500/40 transition-all duration-300"
                style={{
                  display: 'flex',
                  flexDirection: flexDirection,
                  justifyContent: justifyContent,
                  alignItems: alignItems,
                  flexWrap: flexWrap as any,
                  gap: `${flexGap}px`
                }}
              >
                {Array.from({ length: itemCount }).map((_, idx) => (
                  <motion.div
                    key={idx}
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="px-5 py-4 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-sm shadow-lg flex items-center justify-center min-w-[70px] min-h-[50px] border border-white/20 select-none"
                  >
                    Item #{idx + 1}
                  </motion.div>
                ))}
              </div>
            )}

            {/* LIVE GRID PREVIEW */}
            {activeMode === 'grid' && (
              <div 
                className="w-full max-w-2xl min-h-[260px] p-6 rounded-2xl bg-slate-900 border-2 border-dashed border-indigo-500/40 transition-all"
                style={{
                  display: 'grid',
                  gridTemplateColumns: gridCols,
                  gap: `${gridGap}px`
                }}
              >
                {Array.from({ length: gridItemCount }).map((_, idx) => (
                  <motion.div
                    key={idx}
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-4 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs text-center shadow-md flex flex-col items-center justify-center min-h-[80px]"
                  >
                    <span className="text-indigo-400 font-bold mb-1">Cell #{idx + 1}</span>
                    <span className="text-[10px] text-slate-400">Grid Child</span>
                  </motion.div>
                ))}
              </div>
            )}

            {/* LIVE ANIMATION PREVIEW */}
            {activeMode === 'animation' && (
              <div className="w-full max-w-md h-[260px] flex items-center justify-center">
                <motion.div
                  animate={
                    animType === 'float' ? { y: [-16, 16, -16], scale: [1, 1.05, 1] } :
                    animType === 'pulse' ? { scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] } :
                    animType === 'bounce' ? { y: [0, -30, 0] } :
                    { rotate: 360 }
                  }
                  transition={{
                    duration: animDuration,
                    repeat: Infinity,
                    ease: animTiming === 'linear' ? 'linear' : 'easeInOut'
                  }}
                  className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-500 text-white font-extrabold text-sm flex flex-col items-center justify-center shadow-2xl shadow-purple-500/30 border border-white/20 select-none"
                >
                  <Sparkles className="w-6 h-6 mb-1 text-amber-300" />
                  <span>{animType.toUpperCase()}</span>
                </motion.div>
              </div>
            )}

            {/* LIVE BOX MODEL PREVIEW */}
            {activeMode === 'boxmodel' && (
              <div className="w-full max-w-lg p-6 flex items-center justify-center">
                <div 
                  className="border-2 border-dashed border-amber-500/60 bg-amber-500/5 p-4 rounded-2xl text-center"
                  style={{ margin: `${margin}px` }}
                >
                  <div className="text-[10px] font-mono font-bold text-amber-400 mb-2 uppercase">
                    Margin ({margin}px)
                  </div>

                  <div 
                    className="bg-slate-900 border-indigo-500 shadow-2xl text-center transition-all"
                    style={{
                      padding: `${padding}px`,
                      borderWidth: `${borderWidth}px`,
                      borderRadius: `${borderRadius}px`,
                      borderStyle: 'solid'
                    }}
                  >
                    <div className="text-[10px] font-mono font-bold text-emerald-400 mb-1 uppercase">
                      Padding ({padding}px) & Border ({borderWidth}px)
                    </div>
                    <div className="px-4 py-2 bg-indigo-600/30 rounded-lg text-xs font-bold text-indigo-200">
                      Content Box (width × height)
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Bottom Generated CSS Code Output */}
          <div className="h-44 bg-[#090d16] border-t border-slate-800 p-3.5 flex flex-col">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 text-xs">
              <span className="font-mono text-slate-400 font-semibold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                Generated CSS (Siap Salin & Tempel ke Proyek):
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin CSS</span>
                  </>
                )}
              </button>
            </div>

            <pre className="flex-1 font-mono text-[11px] text-indigo-200 overflow-auto pt-2 custom-scrollbar m-0">
              <code>{getGeneratedCss()}</code>
            </pre>
          </div>

        </div>

      </div>

    </div>
  );
};
