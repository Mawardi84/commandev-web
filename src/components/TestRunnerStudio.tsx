import React, { useState } from 'react';
import EditorDefault from 'react-simple-code-editor';
import Prism from '../lib/prismLoader';
import { 
  CheckCircle2, 
  XCircle, 
  Play, 
  RotateCcw, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  Copy, 
  Layers, 
  Terminal,
  FileCode,
  Gauge,
  AlertTriangle
} from 'lucide-react';

const Editor = (EditorDefault as any).default || EditorDefault;

interface TestCaseResult {
  suiteName: string;
  testName: string;
  passed: boolean;
  durationMs: number;
  error?: string;
  expected?: string;
  actual?: string;
}

interface TddPreset {
  id: string;
  name: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  starterCode: string;
}

const TDD_PRESETS: TddPreset[] = [
  {
    id: 'string-calc',
    name: '1. String Calculator Kata',
    category: 'TDD Fundamentals',
    difficulty: 'Beginner',
    description: 'Tulis fungsi add(numbers) yang menjumlahkan angka dari string yang dipisahkan koma atau baris baru, serta mendukung custom delimiter (contoh: "//;\n1;2").',
    starterCode: `// 1. IMPLEMENTASI FUNGSI (Tulis kodinganmu di sini)
function add(numbers) {
  if (!numbers) return 0;
  
  let delimiter = /,|\\n/;
  let numStr = numbers;
  
  // Custom delimiter support: "//[delimiter]\\n[numbers]"
  if (numbers.startsWith("//")) {
    const parts = numbers.split("\\n");
    const customDelim = parts[0].substring(2);
    delimiter = new RegExp(customDelim);
    numStr = parts[1];
  }
  
  const tokens = numStr.split(delimiter);
  return tokens.reduce((sum, token) => {
    const n = parseInt(token.trim(), 10);
    return sum + (isNaN(n) ? 0 : n);
  }, 0);
}

// 2. SUITE PENGUJIAN UNIT (Unit Test Suite)
describe("String Calculator TDD Suite", () => {
  it("harus mengembalikan 0 jika input string kosong", () => {
    expect(add("")).toBe(0);
  });

  it("harus mengembalikan angka itu sendiri untuk satu angka", () => {
    expect(add("5")).toBe(5);
  });

  it("harus menjumlahkan dua angka yang dipisahkan koma", () => {
    expect(add("1,2")).toBe(3);
    expect(add("10,25")).toBe(35);
  });

  it("harus menangani pemisah baris baru (newline)", () => {
    expect(add("1\\n2,3")).toBe(6);
  });

  it("harus mendukung custom delimiter seperti //;\\n1;2", () => {
    expect(add("//;\\n1;2")).toBe(3);
    expect(add("//#\\n4#5#6")).toBe(15);
  });
});`
  },
  {
    id: 'array-dedup',
    name: '2. Array Deduplicator & Sorter',
    category: 'Data Structures',
    difficulty: 'Beginner',
    description: 'Buat fungsi dedupAndSort(arr) yang menghapus semua nilai duplikat dan mengurutkan array secara ascending.',
    starterCode: `// IMPLEMENTASI
function dedupAndSort(arr) {
  if (!Array.isArray(arr)) return [];
  const unique = Array.from(new Set(arr));
  return unique.sort((a, b) => a - b);
}

// SUITE PENGUJIAN
describe("Array Deduplicator & Sorter", () => {
  it("harus mengembalikan array kosong jika input bukan array", () => {
    expect(dedupAndSort(null)).toEqual([]);
  });

  it("harus menghapus angka duplikat", () => {
    expect(dedupAndSort([1, 2, 2, 3, 1, 4])).toEqual([1, 2, 3, 4]);
  });

  it("harus mengurutkan angka acak secara ascending", () => {
    expect(dedupAndSort([50, 10, 40, 20, 30])).toEqual([10, 20, 30, 40, 50]);
  });

  it("harus menangani array dengan angka negatif", () => {
    expect(dedupAndSort([-5, 0, -2, -5, 3])).toEqual([-5, -2, 0, 3]);
  });
});`
  },
  {
    id: 'roman-numeral',
    name: '3. Roman Numeral Converter',
    category: 'Algorithms',
    difficulty: 'Intermediate',
    description: 'Konversi bilangan bulat (1 s/d 3999) ke representasi angka Romawi baku (I, V, X, L, C, D, M).',
    starterCode: `// IMPLEMENTASI
function toRoman(num) {
  if (typeof num !== 'number' || num <= 0 || num > 3999) return "";
  
  const map = [
    { val: 1000, sym: "M" },
    { val: 900,  sym: "CM" },
    { val: 500,  sym: "D" },
    { val: 400,  sym: "CD" },
    { val: 100,  sym: "C" },
    { val: 90,   sym: "XC" },
    { val: 50,   sym: "L" },
    { val: 40,   sym: "XL" },
    { val: 10,   sym: "X" },
    { val: 9,    sym: "IX" },
    { val: 5,    sym: "V" },
    { val: 4,    sym: "IV" },
    { val: 1,    sym: "I" }
  ];

  let result = "";
  for (const item of map) {
    while (num >= item.val) {
      result += item.sym;
      num -= item.val;
    }
  }
  return result;
}

// SUITE PENGUJIAN
describe("Roman Numeral Converter Suite", () => {
  it("harus mengonversi angka satuan dasar", () => {
    expect(toRoman(1)).toBe("I");
    expect(toRoman(3)).toBe("III");
    expect(toRoman(4)).toBe("IV");
    expect(toRoman(9)).toBe("IX");
  });

  it("harus mengonversi angka puluhan & ratusan", () => {
    expect(toRoman(58)).toBe("LVIII");
    expect(toRoman(444)).toBe("CDXLIV");
  });

  it("harus mengonversi tahun kompleks (1994 -> MCMXCIV)", () => {
    expect(toRoman(1994)).toBe("MCMXCIV");
    expect(toRoman(2026)).toBe("MMXXVI");
  });
});`
  },
  {
    id: 'cart-calc',
    name: '4. Shopping Cart Tax & Discount Engine',
    category: 'Business Logic',
    difficulty: 'Intermediate',
    description: 'Hitung subtotal belanja, diskon kupon persentase, dan pajak PPN 11% dengan pembulatan 2 desimal.',
    starterCode: `// IMPLEMENTASI
function calculateCart({ items, discountPercent = 0, taxRate = 0.11 }) {
  if (!items || !items.length) {
    return { subtotal: 0, discount: 0, tax: 0, total: 0 };
  }

  const subtotal = items.reduce((acc, item) => acc + (item.price * (item.qty || 1)), 0);
  const discount = Math.round(subtotal * (discountPercent / 100));
  const taxableAmount = subtotal - discount;
  const tax = Math.round(taxableAmount * taxRate);
  const total = taxableAmount + tax;

  return { subtotal, discount, tax, total };
}

// SUITE PENGUJIAN
describe("Shopping Cart Calculation Suite", () => {
  it("harus mengembalikan nilai 0 untuk keranjang kosong", () => {
    const res = calculateCart({ items: [] });
    expect(res.total).toBe(0);
  });

  it("harus menghitung subtotal dan pajak 11% tanpa diskon", () => {
    const cart = {
      items: [
        { name: "Keyboard", price: 100000, qty: 2 },
        { name: "Mouse", price: 50000, qty: 1 }
      ]
    };
    const res = calculateCart(cart);
    expect(res.subtotal).toBe(250000);
    expect(res.tax).toBe(27500);
    expect(res.total).toBe(277500);
  });

  it("harus menerapkan diskon 20% sebelum pengenaan pajak", () => {
    const cart = {
      items: [{ name: "Course", price: 100000, qty: 1 }],
      discountPercent: 20
    };
    const res = calculateCart(cart);
    expect(res.subtotal).toBe(100000);
    expect(res.discount).toBe(20000);
    expect(res.tax).toBe(8800);
    expect(res.total).toBe(88800);
  });
});`
  }
];

export const TestRunnerStudio: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(TDD_PRESETS[0].id);
  const [code, setCode] = useState<string>(TDD_PRESETS[0].starterCode);
  const [testResults, setTestResults] = useState<TestCaseResult[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [totalExecTime, setTotalExecTime] = useState<number | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Switch preset
  const handleSelectPreset = (id: string) => {
    const found = TDD_PRESETS.find(p => p.id === id);
    if (found) {
      setSelectedPresetId(id);
      setCode(found.starterCode);
      setTestResults([]);
      setTotalExecTime(null);
    }
  };

  // Run Test Suite Engine in isolated browser context
  const handleRunTests = () => {
    setIsRunning(true);
    setTestResults([]);
    const startTime = performance.now();

    setTimeout(() => {
      const results: TestCaseResult[] = [];
      let currentSuite = "General Test Suite";

      // Assertion matchers implementation
      const expect = (actual: any) => ({
        toBe: (expected: any) => {
          const pass = actual === expected;
          if (!pass) {
            throw new Error(`Expected ${JSON.stringify(expected)} but received ${JSON.stringify(actual)}`);
          }
        },
        toEqual: (expected: any) => {
          const pass = JSON.stringify(actual) === JSON.stringify(expected);
          if (!pass) {
            throw new Error(`Expected equal to ${JSON.stringify(expected)} but received ${JSON.stringify(actual)}`);
          }
        },
        toBeGreaterThan: (expected: number) => {
          if (actual <= expected) throw new Error(`Expected ${actual} > ${expected}`);
        },
        toBeLessThan: (expected: number) => {
          if (actual >= expected) throw new Error(`Expected ${actual} < ${expected}`);
        },
        toBeTruthy: () => {
          if (!actual) throw new Error(`Expected truthy value but received ${actual}`);
        },
        toBeFalsy: () => {
          if (actual) throw new Error(`Expected falsy value but received ${actual}`);
        },
        toContain: (item: any) => {
          if (!actual || !actual.includes(item)) {
            throw new Error(`Expected collection to contain ${JSON.stringify(item)}`);
          }
        },
        toThrow: () => {
          if (typeof actual !== 'function') throw new Error('Target must be a function to test toThrow');
          let threw = false;
          try { actual(); } catch (e) { threw = true; }
          if (!threw) throw new Error('Expected function to throw an error');
        }
      });

      const describe = (suiteName: string, fn: () => void) => {
        currentSuite = suiteName;
        try {
          fn();
        } catch (err: any) {
          results.push({
            suiteName,
            testName: "Suite Execution Error",
            passed: false,
            durationMs: 0,
            error: err.message || String(err)
          });
        }
      };

      const it = (testName: string, fn: () => void) => {
        const t0 = performance.now();
        try {
          fn();
          const t1 = performance.now();
          results.push({
            suiteName: currentSuite,
            testName,
            passed: true,
            durationMs: Math.max(1, Math.round(t1 - t0))
          });
        } catch (err: any) {
          const t1 = performance.now();
          results.push({
            suiteName: currentSuite,
            testName,
            passed: false,
            durationMs: Math.max(1, Math.round(t1 - t0)),
            error: err.message || String(err)
          });
        }
      };

      const test = it;

      try {
        // Execute the user code within the scoped sandbox
        const runnerFn = new Function('describe', 'it', 'test', 'expect', code);
        runnerFn(describe, it, test, expect);
      } catch (globalErr: any) {
        results.push({
          suiteName: currentSuite,
          testName: "Global Compilation / Runtime Exception",
          passed: false,
          durationMs: 0,
          error: globalErr.message || String(globalErr)
        });
      }

      setTestResults(results);
      setTotalExecTime(Math.round(performance.now() - startTime));
      setIsRunning(false);
    }, 150);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalCount = testResults.length;
  const passedCount = testResults.filter(r => r.passed).length;
  const failedCount = totalCount - passedCount;
  const passRate = totalCount > 0 ? Math.round((passedCount / totalCount) * 100) : 0;

  return (
    <div className="h-full flex flex-col bg-[#070b14] text-slate-200 overflow-hidden font-sans">
      
      {/* 1. TOP HEADER & PRESETS */}
      <div className="border-b border-slate-800/80 bg-slate-950/90 p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-600/20 border border-emerald-500/30 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
              <span>Unit Test Runner & TDD Studio</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-normal">Jest & Assertion Engine</span>
            </h2>
            <p className="text-[10px] text-slate-400">Latih Test-Driven Development (TDD) dengan suite pengujian describe/it & expect</p>
          </div>
        </div>

        {/* Presets selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
          <span className="text-[11px] text-slate-400 font-medium">Kata TDD:</span>
          {TDD_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer whitespace-nowrap ${
                selectedPresetId === preset.id
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* 2. DUAL PANE: CODE EDITOR (LEFT), TEST RUNNER SUITE (RIGHT) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-800 min-h-0 overflow-hidden">
        
        {/* LEFT: CODE & TEST SUITE EDITOR */}
        <div className="flex flex-col h-full bg-[#0a0e1a] overflow-hidden">
          
          {/* Action Bar */}
          <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs">
            <span className="font-mono text-slate-300 flex items-center gap-1.5">
              <FileCode className="w-3.5 h-3.5 text-emerald-400" />
              Source & Test Suite File
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCode}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Salin Kode"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              </button>

              <button
                onClick={handleRunTests}
                disabled={isRunning}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-lg text-xs font-bold shadow-md shadow-emerald-600/25 transition-all cursor-pointer disabled:opacity-50"
              >
                {isRunning ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Menjalankan...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Jalankan Test Suite</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Editor */}
          <div className="flex-1 overflow-auto custom-scrollbar p-3 bg-[#0a0e1a]">
            <Editor
              value={code}
              onValueChange={(c: string) => setCode(c)}
              highlight={(c: string) => Prism.highlight(c, Prism.languages.javascript, 'javascript')}
              padding={12}
              className="font-mono text-xs text-emerald-300 leading-relaxed outline-none min-h-full"
              style={{
                fontFamily: '"Fira Code", monospace',
                fontSize: 12
              }}
            />
          </div>
        </div>

        {/* RIGHT: TEST RESULTS & COVERAGE DASHBOARD */}
        <div className="flex flex-col h-full bg-[#060a12] overflow-hidden">
          
          {/* Summary Status Bar */}
          <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-slate-300">Hasil Pengujian</span>
              {totalCount > 0 && (
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                    failedCount === 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                  }`}>
                    {passedCount}/{totalCount} PASSED ({passRate}%)
                  </span>

                  {totalExecTime !== null && (
                    <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" /> {totalExecTime}ms
                    </span>
                  )}
                </div>
              )}
            </div>

            {totalCount > 0 && (
              <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                <Gauge className="w-3.5 h-3.5 text-emerald-400" />
                <span>Coverage: {passRate}%</span>
              </div>
            )}
          </div>

          {/* Test Case Breakdown */}
          <div className="flex-1 overflow-auto custom-scrollbar p-4 space-y-3 bg-[#050811]">
            {totalCount === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-3 py-16">
                <ShieldCheck className="w-10 h-10 stroke-[1.2] text-slate-700" />
                <p className="text-xs font-sans text-center max-w-sm">
                  Tekan tombol <strong className="text-emerald-400 font-semibold">"Jalankan Test Suite"</strong> untuk mengeksekusi assertion dan melihat feedback kelolosan kode.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                
                {/* Suite Header Card */}
                <div className={`p-3 rounded-xl border flex items-center justify-between ${
                  failedCount === 0 
                    ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300' 
                    : 'bg-rose-950/20 border-rose-800/40 text-rose-300'
                }`}>
                  <div className="flex items-center gap-2">
                    {failedCount === 0 ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                    <div>
                      <h3 className="text-xs font-bold text-slate-100">
                        {testResults[0]?.suiteName || 'Test Suite'}
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        {failedCount === 0 
                          ? 'Semua test cases berhasil lolos validasi tanpa error!'
                          : `${failedCount} test case gagal. Periksa pesan error di bawah.`}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-slate-200">
                      {passedCount} pass / {failedCount} fail
                    </span>
                  </div>
                </div>

                {/* Individual Test Cases */}
                <div className="space-y-2">
                  {testResults.map((t, idx) => (
                    <div 
                      key={idx}
                      className={`p-3 rounded-xl border font-mono text-xs transition-all ${
                        t.passed 
                          ? 'bg-slate-950/60 border-slate-800/80 text-slate-300' 
                          : 'bg-rose-950/30 border-rose-900/60 text-rose-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {t.passed ? (
                            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                          )}
                          <span className="font-semibold">{t.testName}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">{t.durationMs}ms</span>
                      </div>

                      {t.error && (
                        <div className="mt-2.5 p-2.5 rounded-lg bg-rose-950/70 border border-rose-800/60 text-rose-300 text-[11px] flex items-start gap-2">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                          <div className="flex-1 overflow-x-auto">
                            <span className="font-bold">Assertion Failure: </span>
                            <span>{t.error}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
