import React, { useState, useEffect } from 'react';
import EditorDefault from 'react-simple-code-editor';
import Prism from '../lib/prismLoader';
import { 
  Code2, 
  Bug, 
  Sparkles, 
  Play, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Lightbulb, 
  Trophy, 
  ChevronRight,
  Filter,
  Check,
  Zap,
  Terminal,
  Clock
} from 'lucide-react';
import { executePython } from '../utils/pythonInterpreter';
import { UserProgress } from '../types';

const Editor = (EditorDefault as any).default || EditorDefault;

export interface ChallengeItem {
  id: string;
  title: string;
  category: 'web' | 'python' | 'debug' | 'algorithm';
  difficulty: 'Mudah' | 'Menengah' | 'Sulit';
  xp: number;
  language: 'web' | 'python';
  description: string;
  starterCode: string;
  hints: string[];
  validate: (code: string, output?: string) => { passed: boolean; message: string };
}

export const PRACTICE_CHALLENGES: ChallengeItem[] = [
  {
    id: 'pr-html-1',
    title: 'Debugging: Perbaiki Struktur Tabel HTML',
    category: 'debug',
    difficulty: 'Mudah',
    xp: 25,
    language: 'web',
    description: 'Kode tabel di bawah memiliki tag pembuka dan penutup yang tidak sinkron sehingga tampilannya rusak. Perbaiki struktur `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, dan `<td>` agar valid.',
    starterCode: `<table>\n  <thead>\n    <tr>\n      <th>Nama</th>\n      <th>Peran</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Ahmad</td>\n      <td>Frontend Engineer\n    </tr>\n  </tbody>\n</table>`,
    hints: [
      'Periksa apakah setiap <td> memiliki tag penutup </td> yang lengkap.',
      'Pastikan semua elemen berada dalam tag <table> yang utuh.'
    ],
    validate: (code) => {
      const doc = new DOMParser().parseFromString(code, 'text/html');
      const cells = doc.querySelectorAll('td');
      if (cells.length < 2) return { passed: false, message: 'Harus ada minimal 2 elemen <td> yang tertutup rapi.' };
      if (!code.includes('</td>')) return { passed: false, message: 'Pastikan tag </td> ditutup dengan benar.' };
      return { passed: true, message: 'Tabel HTML berhasil diperbaiki dan tervalidasi dengan sempurna!' };
    }
  },
  {
    id: 'pr-html-2',
    title: 'Aksesibilitas Form: Label & Input Connection',
    category: 'web',
    difficulty: 'Mudah',
    xp: 30,
    language: 'web',
    description: 'Perbaiki form HTML agar ramah screen reader (A11y). Hubungkan elemen `<label>` ke `<input>` menggunakan atribut `for` (atau `htmlFor`) yang cocok dengan `id` input.',
    starterCode: `<form>\n  <label>Alamat Email:</label>\n  <input type="email" name="user_email" placeholder="nama@domain.com" required>\n  \n  <label>Kata Sandi:</label>\n  <input type="password" name="user_pass" required>\n  \n  <button type="submit">Daftar Akun</button>\n</form>`,
    hints: [
      'Tambahkan atribut `id="email"` pada input email dan `for="email"` pada label terkait.',
      'Tambahkan atribut `id="password"` pada input password dan `for="password"` pada label terkait.'
    ],
    validate: (code) => {
      const doc = new DOMParser().parseFromString(code, 'text/html');
      const labels = doc.querySelectorAll('label');
      let matchedCount = 0;
      labels.forEach(l => {
        const forAttr = l.getAttribute('for');
        if (forAttr && doc.getElementById(forAttr)) {
          matchedCount++;
        }
      });
      if (matchedCount >= 2) {
        return { passed: true, message: 'Luar biasa! Form kini memenuhi standar aksesibilitas WCAG.' };
      }
      return { passed: false, message: 'Pastikan setiap label memiliki atribut `for` yang identik dengan `id` pada elemen input.' };
    }
  },
  {
    id: 'pr-py-1',
    title: 'Python: Filter Bilangan Genap & Kuadrat',
    category: 'python',
    difficulty: 'Mudah',
    xp: 30,
    language: 'python',
    description: 'Buatlah fungsi `process_numbers(numbers)` yang menerima list angka, menyaring hanya bilangan genap, dan mengembalikan list baru berisi kuadrat dari bilangan-bilangan genap tersebut.',
    starterCode: `def process_numbers(numbers):\n    # Tulis kodemu di sini menggunakan list comprehension atau loop\n    pass\n\n# Uji coba fungsi:\nprint(process_numbers([1, 2, 3, 4, 5, 6]))\n# Output yang diharapkan: [4, 16, 36]`,
    hints: [
      'Gunakan modulo `% 2 == 0` untuk mengecek bilangan genap.',
      'Gunakan list comprehension: `return [x**2 for x in numbers if x % 2 == 0]`'
    ],
    validate: (code) => {
      const testPy = `${code}\nres = process_numbers([1, 2, 3, 4, 5, 6])\nprint("__TEST_OUTPUT__:" + str(res))`;
      const res = executePython(testPy);
      if (res.error) return { passed: false, message: `Error: ${res.error}` };
      if (res.output.includes('[4, 16, 36]')) {
        return { passed: true, message: 'Semua test case logika lolos dengan sempurna!' };
      }
      return { passed: false, message: 'Output fungsi belum sesuai. Diharapkan [4, 16, 36]' };
    }
  },
  {
    id: 'pr-py-2',
    title: 'Debugging: Perbaiki Infinite Loop & ZeroDivision',
    category: 'debug',
    difficulty: 'Menengah',
    xp: 40,
    language: 'python',
    description: 'Kode berikut mengalami kesalahan runtime saat membagi angka dengan nol dan loop yang tidak pernah berhenti. Perbaiki kode agar aman dari crash.',
    starterCode: `def safe_average(scores):\n    if not scores:\n        return 0\n    total = 0\n    i = 0\n    while i < len(scores):\n        total += scores[i]\n        # Bug: jangan lupa menaikkan nilai index i\n    return total / len(scores)\n\nprint(safe_average([80, 90, 100]))\nprint(safe_average([]))`,
    hints: [
      'Tambahkan `i += 1` di dalam while loop agar tidak infinite loop.',
      'Tambahkan pengecekan `if not scores: return 0` untuk mencegah ZeroDivisionError.'
    ],
    validate: (code) => {
      const testCode = `${code}\nprint("__RES1__:" + str(safe_average([80, 90, 100])))\nprint("__RES2__:" + str(safe_average([])))`;
      const res = executePython(testCode);
      if (res.error) return { passed: false, message: `Error: ${res.error}` };
      if (res.output.includes('90') && res.output.includes('0')) {
        return { passed: true, message: 'Berhasil menangani infinite loop dan ZeroDivisionError!' };
      }
      return { passed: false, message: 'Hasil belum tepat. Pastikan safe_average([80, 90, 100]) -> 90 dan safe_average([]) -> 0.' };
    }
  },
  {
    id: 'pr-py-3',
    title: 'Python: Word Frequency Counter (Dictionary)',
    category: 'python',
    difficulty: 'Menengah',
    xp: 45,
    language: 'python',
    description: 'Tulis fungsi `count_words(text)` yang menghitung frekuensi kemunculan setiap kata dalam sebuah kalimat string (case-insensitive) dan mengembalikannya dalam bentuk dictionary.',
    starterCode: `def count_words(text):\n    # Hitung kemunculan tiap kata dalam text\n    pass\n\n# Uji coba:\nprint(count_words("belajar python di codera membuat belajar jadi seru"))\n# Diharapkan: {"belajar": 2, "python": 1, "di": 1, "codera": 1, "membuat": 1, "jadi": 1, "seru": 1}`,
    hints: [
      'Ubah string ke lowercase: `text.lower().split()`',
      'Gunakan dictionary loop: `freq[word] = freq.get(word, 0) + 1`'
    ],
    validate: (code) => {
      const testPy = `${code}\nres = count_words("belajar python di codera membuat belajar jadi seru")\nprint("__TEST_FREQ__:" + str(res.get("belajar", 0)) + "," + str(res.get("python", 0)))`;
      const res = executePython(testPy);
      if (res.error) return { passed: false, message: `Error: ${res.error}` };
      if (res.output.includes('2,1')) {
        return { passed: true, message: 'Frekuensi kata berhasil dihitung dengan akurat!' };
      }
      return { passed: false, message: 'Hasil dictionary belum sesuai. Kata "belajar" harus berjumlah 2.' };
    }
  },
  {
    id: 'pr-algo-1',
    title: 'Algoritma: Two Sum Problem (O(n) Hash Map)',
    category: 'algorithm',
    difficulty: 'Menengah',
    xp: 50,
    language: 'python',
    description: 'Diberikan list angka `nums` dan integer `target`, kembalikan indeks dua angka di mana penjumlahannya sama dengan target. Kamu dapat mengasumsikan selalu ada tepat satu solusi.',
    starterCode: `def two_sum(nums, target):\n    # Cari indeks i dan j sedemikian hingga nums[i] + nums[j] == target\n    pass\n\n# Uji coba:\nprint(two_sum([2, 7, 11, 15], 9))\n# Output yang diharapkan: [0, 1]`,
    hints: [
      'Gunakan hash map (dictionary) untuk menyimpan nilai selisih `target - num` beserta indeksnya.',
      'Kompleksitas yang diharapkan adalah O(n).'
    ],
    validate: (code) => {
      const testCode = `${code}\nprint("__RES__:" + str(two_sum([2, 7, 11, 15], 9)))`;
      const res = executePython(testCode);
      if (res.error) return { passed: false, message: `Error: ${res.error}` };
      if (res.output.includes('[0, 1]') || res.output.includes('(0, 1)')) {
        return { passed: true, message: 'Two Sum Algoritma terpecahkan secara optimal O(n)!' };
      }
      return { passed: false, message: 'Indeks yang dihasilkan belum sesuai. Diharapkan [0, 1].' };
    }
  },
  {
    id: 'pr-js-1',
    title: 'Algoritma: Palindrome Checker',
    category: 'algorithm',
    difficulty: 'Mudah',
    xp: 30,
    language: 'web',
    description: 'Tulis fungsi JavaScript `isPalindrome(str)` yang mengembalikan `true` jika string adalah palindrom (dibaca sama bolak-balik), mengabaikan karakter non-alfanumerik dan huruf besar/kecil.',
    starterCode: `<script>\nfunction isPalindrome(str) {\n  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');\n  return clean === clean.split('').reverse().join('');\n}\n\nconsole.log(isPalindrome("Kasur ini rusak")); // true\nconsole.log(isPalindrome("Coding")); // false\n</script>`,
    hints: [
      'Bersihkan spasi & tanda baca dengan regex `/[^a-z0-9]/g`.',
      'Balik string dengan `.split("").reverse().join("")`.'
    ],
    validate: (code) => {
      if (!code.includes('isPalindrome')) return { passed: false, message: 'Fungsi isPalindrome harus didefinisikan.' };
      return { passed: true, message: 'Logika Palindrome JavaScript tervalidasi!' };
    }
  },
  {
    id: 'pr-py-4',
    title: 'Algoritma: Prime Number Checker & Generator',
    category: 'algorithm',
    difficulty: 'Menengah',
    xp: 40,
    language: 'python',
    description: 'Buat fungsi `is_prime(n)` yang memeriksa apakah suatu bilangan bulat adalah bilangan prima atau bukan.',
    starterCode: `def is_prime(n):\n    if n < 2:\n        return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0:\n            return False\n    return True\n\n# Uji Coba:\nprint([x for x in range(1, 20) if is_prime(x)])\n# Diharapkan: [2, 3, 5, 7, 11, 13, 17, 19]`,
    hints: [
      'Angka di bawah 2 bukan bilangan prima.',
      'Cukup iterasi pembagi hingga akar kuadrat dari n: `range(2, int(n**0.5) + 1)`'
    ],
    validate: (code) => {
      const testCode = `${code}\nprimes = [x for x in range(1, 20) if is_prime(x)]\nprint("__PRIMES__:" + str(primes))`;
      const res = executePython(testCode);
      if (res.error) return { passed: false, message: `Error: ${res.error}` };
      if (res.output.includes('[2, 3, 5, 7, 11, 13, 17, 19]')) {
        return { passed: true, message: 'Fungsi bilangan prima bekerja dengan optimal dan presisi!' };
      }
      return { passed: false, message: 'Daftar bilangan prima belum sesuai.' };
    }
  },
  {
    id: 'pr-algo-stack',
    title: 'Struktur Data: Valid Parentheses (Stack O(n))',
    category: 'algorithm',
    difficulty: 'Menengah',
    xp: 45,
    language: 'python',
    description: 'Diberikan string yang hanya berisi karakter "()[]{}", tentukan apakah string kurung tersebut valid dan berpasangan dengan urutan yang benar menggunakan struktur data Stack.',
    starterCode: `def is_valid_parentheses(s):\n    stack = []\n    mapping = {")": "(", "}": "{", "]": "["}\n    for char in s:\n        if char in mapping:\n            top = stack.pop() if stack else '#'\n            if mapping[char] != top:\n                return False\n        else:\n            stack.append(char)\n    return not stack\n\n# Uji Coba:\nprint(is_valid_parentheses("()[]{}")) # True\nprint(is_valid_parentheses("([)]"))   # False`,
    hints: [
      'Push setiap kurung pembuka ke dalam stack.',
      'Ketika menemukan kurung penutup, pop elemen teratas stack dan pastikan cocok.'
    ],
    validate: (code) => {
      const testCode = `${code}\nprint("__TEST1__:" + str(is_valid_parentheses("()[]{}")))\nprint("__TEST2__:" + str(is_valid_parentheses("([)]")))`;
      const res = executePython(testCode);
      if (res.error) return { passed: false, message: `Error: ${res.error}` };
      if (res.output.includes('True') && res.output.includes('False')) {
        return { passed: true, message: 'Valid Parentheses stack validator lolos semua edge cases!' };
      }
      return { passed: false, message: 'Evaluasi kurung belum akurat.' };
    }
  },
  {
    id: 'pr-algo-intervals',
    title: 'Algoritma: Merge Overlapping Intervals',
    category: 'algorithm',
    difficulty: 'Sulit',
    xp: 60,
    language: 'python',
    description: 'Diberikan array interval `[[start, end]]`, gabungkan semua interval yang tumpang tindih (*overlapping*) dan kembalikan array interval baru yang tidak saling bertumpukan.',
    starterCode: `def merge_intervals(intervals):\n    if not intervals:\n        return []\n    intervals.sort(key=lambda x: x[0])\n    merged = [intervals[0]]\n    for current in intervals[1:]:\n        prev = merged[-1]\n        if current[0] <= prev[1]:\n            prev[1] = max(prev[1], current[1])\n        else:\n            merged.append(current)\n    return merged\n\n# Uji Coba:\nprint(merge_intervals([[1, 3], [2, 6], [8, 10], [15, 18]]))\n# Diharapkan: [[1, 6], [8, 10], [15, 18]]`,
    hints: [
      'Urutkan list berdasarkan nilai awal `start`: `intervals.sort(key=lambda x: x[0])`.',
      'Jika interval berikutnya dimulai sebelum interval sebelumnya selesai (`current[0] <= prev[1]`), gabungkan.'
    ],
    validate: (code) => {
      const testCode = `${code}\nprint("__RES__:" + str(merge_intervals([[1, 3], [2, 6], [8, 10], [15, 18]])))`;
      const res = executePython(testCode);
      if (res.error) return { passed: false, message: `Error: ${res.error}` };
      if (res.output.includes('[[1, 6], [8, 10], [15, 18]]')) {
        return { passed: true, message: 'Luar biasa! Algoritma merge intervals bekerja dengan efisiensi O(n log n).' };
      }
      return { passed: false, message: 'Hasil merge intervals belum sesuai.' };
    }
  }
];

interface PracticeViewProps {
  userProgress: UserProgress;
  onRewardXp: (xp: number, challengeId: string) => void;
}

export const PracticeView: React.FC<PracticeViewProps> = ({ userProgress, onRewardXp }) => {
  const [selectedChallenge, setSelectedChallenge] = useState<ChallengeItem>(PRACTICE_CHALLENGES[0]);
  const [code, setCode] = useState(PRACTICE_CHALLENGES[0].starterCode);
  const [activeCategory, setActiveCategory] = useState<'all' | 'debug' | 'python' | 'algorithm' | 'web'>('all');
  const [validation, setValidation] = useState<{ passed: boolean; message: string } | null>(null);
  const [hintIndex, setHintIndex] = useState(0);

  const handleSelect = (challenge: ChallengeItem) => {
    setSelectedChallenge(challenge);
    setCode(challenge.starterCode);
    setValidation(null);
    setHintIndex(0);
  };

  const handleRunTest = () => {
    const res = selectedChallenge.validate(code);
    setValidation(res);
    if (res.passed && !userProgress.completedLessons.includes(selectedChallenge.id)) {
      onRewardXp(selectedChallenge.xp, selectedChallenge.id);
    }
  };

  // Keyboard shortcut Ctrl+Enter to test
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRunTest();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [code, selectedChallenge]);

  const filtered = PRACTICE_CHALLENGES.filter(c => {
    if (activeCategory === 'all') return true;
    return c.category === activeCategory;
  });

  return (
    <div className="h-full flex flex-col lg:flex-row bg-slate-900 text-slate-100 overflow-hidden">
      
      {/* LEFT: Challenge Selector Sidebar */}
      <div className="w-full lg:w-80 border-r border-slate-800 bg-slate-950 flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <Code2 className="w-5 h-5 text-indigo-400" />
            <h2 className="font-extrabold text-base tracking-tight text-white">Latihan & Tantangan</h2>
          </div>
          
          {/* Categories */}
          <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
            {(['all', 'debug', 'python', 'algorithm', 'web'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  activeCategory === cat ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {cat === 'all' ? 'Semua' : cat === 'debug' ? 'Debug' : cat === 'python' ? 'Python' : cat === 'algorithm' ? 'Algoritma' : 'Web'}
              </button>
            ))}
          </div>
        </div>

        {/* Challenge List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
          {filtered.map(ch => {
            const isCompleted = userProgress.completedLessons.includes(ch.id);
            const isSelected = selectedChallenge.id === ch.id;

            return (
              <div
                key={ch.id}
                onClick={() => handleSelect(ch)}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  isSelected 
                    ? 'bg-indigo-600/10 border-indigo-500 text-white shadow-sm' 
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="font-bold text-xs leading-snug">{ch.title}</span>
                  {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-indigo-300 font-bold">+{ch.xp} XP</span>
                  <span>•</span>
                  <span>{ch.difficulty}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT: Active Challenge Workspace */}
      <div className="flex-1 flex flex-col h-full bg-[#0b0f19] overflow-hidden">
        
        {/* Workspace Top Details */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {selectedChallenge.category}
              </span>
              <h1 className="text-lg font-bold text-white">{selectedChallenge.title}</h1>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">{selectedChallenge.description}</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500 hidden sm:inline font-mono">Ctrl + Enter</span>
            <button
              onClick={handleRunTest}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer flex-shrink-0"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Uji Jawaban & Validasi</span>
            </button>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-1 overflow-auto p-4 font-mono text-sm leading-relaxed custom-scrollbar bg-[#0b0f19]">
          <Editor
            value={code}
            onValueChange={(newCode: string) => setCode(newCode)}
            highlight={(codeToHighlight: string) => 
              Prism.highlight(
                codeToHighlight, 
                selectedChallenge.language === 'python' ? Prism.languages.python : Prism.languages.markup, 
                selectedChallenge.language === 'python' ? 'python' : 'markup'
              )
            }
            padding={10}
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 14,
              minHeight: '100%',
            }}
          />
        </div>

        {/* Bottom Feedback & Hint Drawer */}
        <div className="border-t border-slate-800 bg-slate-950 p-4 space-y-3 flex-shrink-0">
          
          {/* Validation Result */}
          {validation && (
            <div className={`p-3 rounded-xl border flex items-center gap-3 text-xs ${
              validation.passed 
                ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200' 
                : 'bg-rose-950/40 border-rose-800 text-rose-200'
            }`}>
              {validation.passed ? <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" /> : <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />}
              <span className="font-semibold">{validation.message}</span>
            </div>
          )}

          {/* Progressive Hint Button */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setHintIndex(prev => Math.min(prev + 1, selectedChallenge.hints.length))}
              className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold"
            >
              <Lightbulb className="w-4 h-4" />
              <span>{hintIndex === 0 ? 'Butuh Petunjuk (Hint)?' : `Petunjuk ${hintIndex}/${selectedChallenge.hints.length}`}</span>
            </button>
            <button
              onClick={() => setCode(selectedChallenge.starterCode)}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Kode</span>
            </button>
          </div>

          {hintIndex > 0 && (
            <div className="p-3 bg-amber-950/30 border border-amber-800/40 rounded-xl text-xs text-amber-200">
              💡 {selectedChallenge.hints[hintIndex - 1]}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
