import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  RotateCw, 
  CheckCircle2, 
  Flame, 
  BookOpen, 
  Code2, 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  Brain, 
  Zap, 
  HelpCircle,
  Clock,
  ArrowRight,
  Filter,
  Trophy
} from 'lucide-react';
import { UserProgress } from '../types';

export interface Flashcard {
  id: string;
  category: 'html' | 'css' | 'javascript' | 'python' | 'git' | 'sql' | 'http';
  topic: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  question: string;
  codeQuestion?: string;
  answer: string;
  codeSnippet?: string;
  keyTakeaway: string;
  // SM-2 State
  interval: number; // in days
  repetitions: number;
  easeFactor: number; // default 2.5
  lastReviewed?: string;
}

export const FLASHCARDS_DECK: Flashcard[] = [
  {
    id: 'fc-js-1',
    category: 'javascript',
    topic: 'Event Loop & Microtasks',
    difficulty: 'Intermediate',
    question: 'Apa perbedaan antara Microtask Queue dan Macrotask Queue pada JavaScript Event Loop?',
    codeQuestion: `console.log('1');\nsetTimeout(() => console.log('2'), 0);\nPromise.resolve().then(() => console.log('3'));\nconsole.log('4');`,
    answer: 'Urutan output: 1 -> 4 -> 3 -> 2. Microtask (Promise .then, queueMicrotask) diproses SEGERA setelah Call Stack kosong sebelum Macrotask berikutnya (setTimeout, setInterval, I/O) dieksekusi.',
    codeSnippet: `// 1. Sinkron: '1' lalu '4'\n// 2. Microtask Queue: '3'\n// 3. Macrotask Queue: '2'`,
    keyTakeaway: 'Microtasks selalu memiliki prioritas eksekusi lebih tinggi daripada Macrotasks.',
    interval: 1,
    repetitions: 0,
    easeFactor: 2.5
  },
  {
    id: 'fc-py-1',
    category: 'python',
    topic: 'List vs Generator Comprehension',
    difficulty: 'Intermediate',
    question: 'Apa keuntungan menggunakan Generator Expression dibandingkan List Comprehension untuk dataset besar?',
    codeQuestion: `list_comp = [x*2 for x in range(10000000)] # Memori Tinggi\ngen_expr = (x*2 for x in range(10000000))  # Memori Ringan`,
    answer: 'Generator Expression mengevaluasi elemen secara lazy (satu per satu saat dibutuhkan dengan next() atau for loop), menghemat memori dari O(n) menjadi O(1) karena tidak menyimpan seluruh elemen sekaligus di RAM.',
    codeSnippet: `import sys\nprint(sys.getsizeof(list_comp)) # ~80 MB\nprint(sys.getsizeof(gen_expr))  # ~200 Bytes`,
    keyTakeaway: 'Gunakan () untuk generator jika Anda hanya mengiterasi sekali tanpa perlu indexing acak.',
    interval: 1,
    repetitions: 0,
    easeFactor: 2.5
  },
  {
    id: 'fc-css-1',
    category: 'css',
    topic: 'CSS Stacking Context & z-index',
    difficulty: 'Intermediate',
    question: 'Mengapa elemen dengan z-index: 9999 terkadang tetap tertimpa di bawah elemen lain dengan z-index: 1?',
    answer: 'Karena elemen tersebut berada di dalam Stacking Context lokal yang induknya memiliki z-index lebih rendah. Nilai z-index hanya bersaing dengan elemen saudara di dalam Stacking Context yang sama.',
    keyTakeaway: 'Properti seperti opacity < 1, transform, filter, atau position: relative + z-index membuat Stacking Context baru.',
    interval: 1,
    repetitions: 0,
    easeFactor: 2.5
  },
  {
    id: 'fc-git-1',
    category: 'git',
    topic: 'Git Rebase vs Git Merge',
    difficulty: 'Intermediate',
    question: 'Kapan sebaiknya menggunakan "git rebase" alih-alih "git merge"?',
    answer: 'Gunakan git rebase pada local feature branch Anda sebelum membuat Pull Request agar riwayat commit menjadi linear dan rapi. JANGAN pernah me-rebase branch publik yang sedang digunakan bersama rekan tim (Gold Rule of Rebase).',
    keyTakeaway: 'Merge menjaga riwayat asli dengan merge commit; Rebase menulis ulang riwayat menjadi linear.',
    interval: 1,
    repetitions: 0,
    easeFactor: 2.5
  },
  {
    id: 'fc-sql-1',
    category: 'sql',
    topic: 'WHERE vs HAVING Clause',
    difficulty: 'Beginner',
    question: 'Apa perbedaan mendasar antara klausa WHERE dan HAVING di SQL?',
    codeQuestion: `SELECT department, AVG(salary)\nFROM employees\nWHERE status = 'Active'\nGROUP BY department\nHAVING AVG(salary) > 10000000;`,
    answer: 'WHERE memfilter baris sebelum operasi agregasi (GROUP BY) dilakukan. HAVING memfilter hasil grup setelah agregasi (misal COUNT, SUM, AVG) dihitung.',
    keyTakeaway: 'WHERE untuk baris individual; HAVING untuk hasil kalkulasi agregat.',
    interval: 1,
    repetitions: 0,
    easeFactor: 2.5
  },
  {
    id: 'fc-http-1',
    category: 'http',
    topic: 'Idempotency HTTP Methods',
    difficulty: 'Intermediate',
    question: 'Apa yang dimaksud dengan method HTTP Idempotent dan sebutkan contohnya?',
    answer: 'Method Idempotent adalah method yang menghasilkan efek state server yang sama meskipun dieksekusi 1 kali atau 100 kali berturut-turut. Contoh Idempotent: GET, PUT, DELETE, HEAD. Contoh Non-Idempotent: POST (membuat entitas baru setiap panggilan).',
    keyTakeaway: 'PUT dan DELETE bersifat Idempotent; POST bersifat Non-Idempotent.',
    interval: 1,
    repetitions: 0,
    easeFactor: 2.5
  },
  {
    id: 'fc-html-1',
    category: 'html',
    topic: 'Semantic <section> vs <article>',
    difficulty: 'Beginner',
    question: 'Kapan menggunakan tag <article> dan kapan menggunakan <section>?',
    answer: '<article> digunakan untuk konten mandiri yang dapat didistribusikan atau digunakan kembali secara terpisah (misal: postingan blog, kartu produk, widget berita). <section> digunakan untuk mengelompokkan konten tematik dengan heading di dalam suatu dokumen.',
    keyTakeaway: 'Jika konten bisa berdiri sendiri di RSS Feed -> <article>. Jika bagian dari bab -> <section>.',
    interval: 1,
    repetitions: 0,
    easeFactor: 2.5
  }
];

interface FlashcardsViewProps {
  userProgress: UserProgress;
  onRewardXp: (xp: number, id: string) => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({ userProgress, onRewardXp }) => {
  const [cards, setCards] = useState<Flashcard[]>(() => {
    try {
      const saved = localStorage.getItem('commandev_flashcards_deck') || localStorage.getItem('codera_flashcards_deck');
      if (saved) return JSON.parse(saved);
    } catch {}
    return FLASHCARDS_DECK;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Save card progress with backward-compatible dual-key persistence
  useEffect(() => {
    try {
      localStorage.setItem('commandev_flashcards_deck', JSON.stringify(cards));
      localStorage.setItem('codera_flashcards_deck', JSON.stringify(cards));
    } catch {}
  }, [cards]);

  const filteredCards = cards.filter(c => {
    if (selectedCategory === 'all') return true;
    return c.category === selectedCategory;
  });

  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  // SM-2 Spaced Repetition Calculator
  const handleRateCard = (quality: 1 | 2 | 3 | 4) => {
    if (!currentCard) return;

    const updated = cards.map(c => {
      if (c.id !== currentCard.id) return c;

      let { interval, repetitions, easeFactor } = c;

      if (quality < 3) {
        repetitions = 0;
        interval = 1;
      } else {
        if (repetitions === 0) {
          interval = 1;
        } else if (repetitions === 1) {
          interval = 6;
        } else {
          interval = Math.round(interval * easeFactor);
        }
        repetitions += 1;
      }

      // Ease factor modification
      easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - (quality + 1)) * (0.08 + (5 - (quality + 1)) * 0.02)));

      return {
        ...c,
        interval,
        repetitions,
        easeFactor,
        lastReviewed: new Date().toISOString()
      };
    });

    setCards(updated);
    setIsFlipped(false);
    onRewardXp(15, `fc-${currentCard.id}-${Date.now()}`);

    // Move to next card
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const masteredCount = cards.filter(c => c.repetitions >= 2).length;
  const masteryPercentage = Math.round((masteredCount / cards.length) * 100);

  return (
    <div className="h-full flex flex-col bg-[#0b0f19] text-slate-100 overflow-y-auto custom-scrollbar p-4 lg:p-8">
      
      {/* Top Header & Metrics */}
      <div className="max-w-4xl mx-auto w-full mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30 flex items-center justify-center">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white tracking-tight">Developer Flashcards</h1>
              <p className="text-xs text-slate-400">Drill memori cepat dengan algoritma Spaced Repetition (SM-2)</p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <div className="text-xs">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Tingkat Penguasaan</span>
                <span className="font-extrabold text-white">{masteryPercentage}%</span>
              </div>
            </div>

            <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-400" />
              <div className="text-xs">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Kartu Dikuasai</span>
                <span className="font-extrabold text-white">{masteredCount} / {cards.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Categories */}
        <div className="flex items-center gap-2 overflow-x-auto py-4 custom-scrollbar">
          {['all', 'javascript', 'python', 'css', 'sql', 'git', 'http', 'html'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FLASHCARD INTERACTIVE 3D STAGE */}
      {currentCard && (
        <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col justify-center items-center">
          
          {/* Card Indicator */}
          <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-3 px-2 font-medium">
            <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 font-bold uppercase text-[10px] text-violet-300">
              {currentCard.category} • {currentCard.topic}
            </span>
            <span>Kartu {currentIndex + 1} dari {filteredCards.length}</span>
          </div>

          {/* Flip Container */}
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[340px] rounded-2xl bg-slate-900/90 border border-slate-800 p-6 lg:p-8 cursor-pointer relative shadow-2xl flex flex-col justify-between hover:border-violet-500/50 transition-all group"
          >
            {/* Top Prompt */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {isFlipped ? '💡 Kunci Jawaban & Penjelasan' : '❓ Pertanyaan Konsep'}
              </span>
              <span className="text-xs font-bold text-violet-400 flex items-center gap-1 opacity-70 group-hover:opacity-100">
                <RotateCw className="w-3.5 h-3.5" />
                {isFlipped ? 'Klik untuk lihat soal' : 'Klik untuk putar kartu'}
              </span>
            </div>

            {/* Card Content */}
            <div className="my-auto py-4">
              {!isFlipped ? (
                <div className="space-y-4">
                  <h3 className="text-lg lg:text-xl font-bold text-white leading-snug">
                    {currentCard.question}
                  </h3>
                  {currentCard.codeQuestion && (
                    <pre className="p-3.5 rounded-xl bg-slate-950 text-emerald-300 font-mono text-xs border border-slate-800 overflow-x-auto">
                      {currentCard.codeQuestion}
                    </pre>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm lg:text-base text-slate-200 leading-relaxed font-medium">
                    {currentCard.answer}
                  </p>
                  {currentCard.codeSnippet && (
                    <pre className="p-3.5 rounded-xl bg-slate-950 text-indigo-300 font-mono text-xs border border-slate-800 overflow-x-auto">
                      {currentCard.codeSnippet}
                    </pre>
                  )}
                  <div className="p-3 rounded-xl bg-violet-950/30 border border-violet-800/40 text-violet-200 text-xs font-semibold">
                    🎯 <b>Key Takeaway:</b> {currentCard.keyTakeaway}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Status */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-800/60 pt-3">
              <span>Interval SM-2: {currentCard.interval} hari</span>
              <span>Repetisi: {currentCard.repetitions}x</span>
            </div>
          </div>

          {/* SM-2 Self Rating Controls */}
          {isFlipped ? (
            <div className="w-full mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                onClick={() => handleRateCard(1)}
                className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 hover:bg-rose-900/60 font-bold text-xs transition-all flex flex-col items-center gap-1 cursor-pointer"
              >
                <span>🔴 Lupa Lagi</span>
                <span className="text-[10px] opacity-70">Ulangi Besok</span>
              </button>
              <button
                onClick={() => handleRateCard(2)}
                className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/60 text-amber-300 hover:bg-amber-900/60 font-bold text-xs transition-all flex flex-col items-center gap-1 cursor-pointer"
              >
                <span>🟠 Sulit</span>
                <span className="text-[10px] opacity-70">+2 Hari</span>
              </button>
              <button
                onClick={() => handleRateCard(3)}
                className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 hover:bg-emerald-900/60 font-bold text-xs transition-all flex flex-col items-center gap-1 cursor-pointer"
              >
                <span>🟢 Ingat Baik</span>
                <span className="text-[10px] opacity-70">+{currentCard.interval * 2} Hari</span>
              </button>
              <button
                onClick={() => handleRateCard(4)}
                className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/60 text-blue-300 hover:bg-blue-900/60 font-bold text-xs transition-all flex flex-col items-center gap-1 cursor-pointer"
              >
                <span>🔵 Sangat Mudah</span>
                <span className="text-[10px] opacity-70">+{currentCard.interval * 3} Hari</span>
              </button>
            </div>
          ) : (
            <div className="w-full mt-6 flex items-center justify-between">
              <button
                onClick={handlePrev}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>

              <button
                onClick={() => setIsFlipped(true)}
                className="px-6 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-lg shadow-violet-600/30 transition-all cursor-pointer"
              >
                Tampilkan Kunci Jawaban
              </button>

              <button
                onClick={handleNext}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Berikutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
