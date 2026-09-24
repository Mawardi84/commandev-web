import React, { useState } from 'react';
import { Columns, AlignJustify, Check, Copy } from 'lucide-react';

interface CodeDiffViewerProps {
  originalCode: string;
  modifiedCode: string;
  originalTitle?: string;
  modifiedTitle?: string;
}

interface DiffLine {
  type: 'unchanged' | 'added' | 'removed';
  content: string;
  originalLineNumber?: number;
  modifiedLineNumber?: number;
}

// Simple line-by-line diff algorithm
function computeSimpleDiff(orig: string, mod: string): DiffLine[] {
  const origLines = orig.split('\n');
  const modLines = mod.split('\n');
  const result: DiffLine[] = [];

  let i = 0;
  let j = 0;
  let origLineNum = 1;
  let modLineNum = 1;

  while (i < origLines.length || j < modLines.length) {
    if (i < origLines.length && j < modLines.length) {
      if (origLines[i] === modLines[j]) {
        result.push({
          type: 'unchanged',
          content: origLines[i],
          originalLineNumber: origLineNum++,
          modifiedLineNumber: modLineNum++,
        });
        i++;
        j++;
      } else {
        // Look ahead for match in modLines
        const nextMatchInMod = modLines.slice(j).indexOf(origLines[i]);
        const nextMatchInOrig = origLines.slice(i).indexOf(modLines[j]);

        if (nextMatchInMod > -1 && (nextMatchInOrig === -1 || nextMatchInMod <= nextMatchInOrig)) {
          // Lines were added
          result.push({
            type: 'added',
            content: modLines[j],
            modifiedLineNumber: modLineNum++,
          });
          j++;
        } else {
          // Line was removed
          result.push({
            type: 'removed',
            content: origLines[i],
            originalLineNumber: origLineNum++,
          });
          i++;
        }
      }
    } else if (i < origLines.length) {
      result.push({
        type: 'removed',
        content: origLines[i],
        originalLineNumber: origLineNum++,
      });
      i++;
    } else if (j < modLines.length) {
      result.push({
        type: 'added',
        content: modLines[j],
        modifiedLineNumber: modLineNum++,
      });
      j++;
    }
  }

  return result;
}

export const CodeDiffViewer: React.FC<CodeDiffViewerProps> = ({
  originalCode,
  modifiedCode,
  originalTitle = 'Kode Anda',
  modifiedTitle = 'Solusi Referensi',
}) => {
  const [viewMode, setViewMode] = useState<'unified' | 'split'>('unified');
  const [copied, setCopied] = useState(false);

  const diffLines = computeSimpleDiff(originalCode, modifiedCode);

  const copySolution = () => {
    navigator.clipboard.writeText(modifiedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 overflow-hidden font-mono text-xs shadow-lg">
      {/* Diff Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800 text-slate-300">
        <div className="flex items-center gap-2">
          <span className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-400">
            Perbandingan Kode (Diff)
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400 text-[11px] font-sans">
            <span className="text-rose-400 font-bold">- {originalTitle}</span> vs{' '}
            <span className="text-emerald-400 font-bold">+ {modifiedTitle}</span>
          </span>
        </div>

        <div className="flex items-center gap-2 font-sans">
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-slate-400">
            <button
              onClick={() => setViewMode('unified')}
              className={`px-2 py-1 rounded text-xs flex items-center gap-1 transition-colors ${
                viewMode === 'unified' ? 'bg-slate-800 text-white font-bold' : 'hover:text-slate-200'
              }`}
              title="Unified View"
            >
              <AlignJustify className="w-3.5 h-3.5" />
              Unified
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`px-2 py-1 rounded text-xs flex items-center gap-1 transition-colors ${
                viewMode === 'split' ? 'bg-slate-800 text-white font-bold' : 'hover:text-slate-200'
              }`}
              title="Split Side-by-Side View"
            >
              <Columns className="w-3.5 h-3.5" />
              Split
            </button>
          </div>

          <button
            onClick={copySolution}
            className="px-2.5 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 flex items-center gap-1 transition-colors cursor-pointer"
            title="Salin Solusi"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Tersalin' : 'Salin Solusi'}
          </button>
        </div>
      </div>

      {/* Diff Content */}
      {viewMode === 'unified' ? (
        <div className="max-h-96 overflow-y-auto overflow-x-auto divide-y divide-slate-800/40">
          {diffLines.map((line, idx) => {
            const isAdded = line.type === 'added';
            const isRemoved = line.type === 'removed';

            return (
              <div
                key={idx}
                className={`flex items-stretch leading-5 transition-colors ${
                  isAdded
                    ? 'bg-emerald-950/40 text-emerald-200'
                    : isRemoved
                    ? 'bg-rose-950/40 text-rose-200'
                    : 'text-slate-300 hover:bg-slate-800/30'
                }`}
              >
                {/* Line numbers */}
                <div className="w-10 select-none text-right pr-2 text-slate-600 border-r border-slate-800/60 flex-shrink-0">
                  {line.originalLineNumber || ''}
                </div>
                <div className="w-10 select-none text-right pr-2 text-slate-600 border-r border-slate-800/60 flex-shrink-0">
                  {line.modifiedLineNumber || ''}
                </div>
                {/* Diff marker */}
                <div className="w-6 select-none text-center font-bold flex-shrink-0">
                  {isAdded && <span className="text-emerald-400">+</span>}
                  {isRemoved && <span className="text-rose-400">-</span>}
                  {!isAdded && !isRemoved && <span className="text-slate-700"> </span>}
                </div>
                {/* Line content */}
                <div className="flex-1 px-2 whitespace-pre overflow-x-auto">
                  {line.content || ' '}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-2 divide-x divide-slate-800 max-h-96 overflow-y-auto overflow-x-auto">
          {/* Left: Original */}
          <div className="divide-y divide-slate-800/40">
            <div className="px-3 py-1.5 bg-slate-950 text-slate-400 font-sans font-semibold text-[11px] border-b border-slate-800">
              {originalTitle}
            </div>
            {originalCode.split('\n').map((line, idx) => (
              <div key={idx} className="flex items-stretch leading-5 text-slate-300 hover:bg-slate-800/30">
                <div className="w-8 select-none text-right pr-2 text-slate-600 border-r border-slate-800/60 flex-shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-1 px-2 whitespace-pre overflow-x-auto">
                  {line || ' '}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Modified */}
          <div className="divide-y divide-slate-800/40">
            <div className="px-3 py-1.5 bg-slate-950 text-slate-400 font-sans font-semibold text-[11px] border-b border-slate-800">
              {modifiedTitle}
            </div>
            {modifiedCode.split('\n').map((line, idx) => (
              <div key={idx} className="flex items-stretch leading-5 text-emerald-200 bg-emerald-950/20 hover:bg-emerald-950/40">
                <div className="w-8 select-none text-right pr-2 text-slate-600 border-r border-slate-800/60 flex-shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-1 px-2 whitespace-pre overflow-x-auto">
                  {line || ' '}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
