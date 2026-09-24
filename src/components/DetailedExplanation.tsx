import React, { useState } from 'react';
import { Copy, Check, Lightbulb, AlertTriangle, BookOpen, Terminal, Sparkles } from 'lucide-react';

interface DetailedExplanationProps {
  theory: string;
}

export const DetailedExplanation: React.FC<DetailedExplanationProps> = ({ theory }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(codeText);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Simple parser to split markdown-like theory into structured visual sections
  // We can split by code blocks and headers
  const renderFormattedContent = () => {
    if (!theory) return <p className="text-slate-600 dark:text-slate-300">Tidak ada materi teori untuk pelajaran ini.</p>;

    // Split code blocks vs normal text
    const parts = theory.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        // Extract language and code
        const firstNewline = part.indexOf('\n');
        const lang = part.slice(3, firstNewline).trim() || 'code';
        const codeContent = part.slice(firstNewline + 1, -3).trim();

        const isCopied = copiedCode === codeContent;

        return (
          <div key={index} className="my-5 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 shadow-xl">
            <div className="bg-slate-800/80 px-4 py-2.5 flex items-center justify-between border-b border-slate-700/60 text-xs font-mono text-slate-400">
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-blue-400" />
                <span className="uppercase tracking-wider font-semibold text-slate-300">{lang}</span>
              </div>
              <button
                onClick={() => handleCopy(codeContent)}
                className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-200 transition-colors text-xs font-medium"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Disalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Kode</span>
                  </>
                )}
              </button>
            </div>
            <div className="p-4 overflow-x-auto text-sm font-mono text-blue-200 leading-relaxed">
              <pre><code>{codeContent}</code></pre>
            </div>
          </div>
        );
      }

      // Render normal text blocks with paragraph & heading formatting
      const lines = part.split('\n');
      return (
        <div key={index} className="space-y-3 text-slate-700 dark:text-slate-200 leading-relaxed">
          {lines.map((line, lIdx) => {
            const trimmed = line.trim();
            if (!trimmed) return <div key={lIdx} className="h-2" />;

            if (trimmed.startsWith('### ')) {
              return (
                <h3 key={lIdx} className="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3 flex items-center space-x-2">
                  <span className="w-2 h-6 bg-blue-600 rounded-full inline-block" />
                  <span>{trimmed.replace('### ', '')}</span>
                </h3>
              );
            }
            if (trimmed.startsWith('#### ')) {
              return (
                <h4 key={lIdx} className="text-lg font-semibold text-slate-800 dark:text-slate-100 mt-4 mb-2">
                  {trimmed.replace('#### ', '')}
                </h4>
              );
            }
            if (trimmed.startsWith('> ')) {
              return (
                <div key={lIdx} className="my-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 text-amber-900 dark:text-amber-200 text-sm shadow-sm flex items-start space-x-3">
                  <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div className="italic">{trimmed.replace('> ', '')}</div>
                </div>
              );
            }
            if (trimmed.startsWith('⚠️ ')) {
              return (
                <div key={lIdx} className="my-4 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 text-red-900 dark:text-red-200 text-sm shadow-sm flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                  <div className="font-medium">{trimmed.replace('⚠️ ', '')}</div>
                </div>
              );
            }
            if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
              return (
                <div key={lIdx} className="flex items-start space-x-2.5 pl-2 my-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-2 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">{trimmed.substring(2)}</span>
                </div>
              );
            }
            if (/^\d+\.\s/.test(trimmed)) {
              return (
                <div key={lIdx} className="flex items-start space-x-3 pl-2 my-1.5">
                  <span className="font-semibold text-blue-600 dark:text-blue-400 shrink-0 min-w-[20px]">{trimmed.match(/^\d+\./)?.[0]}</span>
                  <span className="text-slate-700 dark:text-slate-300">{trimmed.replace(/^\d+\.\s/, '')}</span>
                </div>
              );
            }

            return (
              <p key={lIdx} className="text-base text-slate-700 dark:text-slate-300">
                {trimmed}
              </p>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl max-w-4xl mx-auto">
      <div className="flex items-center space-x-3 pb-6 border-b border-slate-100 dark:border-slate-800 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-inner">
          <BookOpen className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5 inline mr-1" />
            <span>Materi Konseptual & Panduan Mendalam</span>
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Pahami Konsep Sebelum Praktik</h2>
        </div>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        {renderFormattedContent()}
      </div>
    </div>
  );
};
