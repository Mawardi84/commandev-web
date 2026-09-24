import React, { useState, useEffect } from 'react';
import { 
  Stethoscope, 
  Bug, 
  CheckCircle2, 
  AlertTriangle, 
  Play, 
  Sparkles, 
  Terminal, 
  Eye, 
  FileCode2, 
  Lightbulb, 
  ShieldAlert, 
  Check, 
  RotateCcw,
  ArrowRight,
  Activity,
  Cpu,
  Layers,
  HeartPulse
} from 'lucide-react';
import EditorDefault from 'react-simple-code-editor';
const Editor: any = (EditorDefault as any)?.default || EditorDefault;
import Prism from '../lib/prismLoader';
import { UserProgress } from '../types';
import { executePython } from '../utils/pythonInterpreter';

export interface DebugPatient {
  id: string;
  title: string;
  severity: 'Critical' | 'Warning' | 'Logic Bug' | 'Async Race';
  category: 'javascript' | 'python' | 'web';
  symptom: string;
  rootCause: string;
  prescription: string;
  prevention: string;
  hintSnippet?: string;
  xp: number;
  buggyCode: string;
  expectedBehavior: string;
  testRunner: (code: string) => { passed: boolean; message: string; logs?: string[] };
  variableWatchMock: { varName: string; buggyVal: string; expectedVal: string; note: string }[];
  stackTrace: { line: number; file: string; message: string; scope: string };
}

export const DEBUG_PATIENTS: DebugPatient[] = [
  {
    id: 'bug-js-offbyone',
    title: 'Case #1: Off-by-One Loop Index & Undefined Extraction',
    severity: 'Critical',
    category: 'javascript',
    symptom: 'Fungsi getAverageScores() mengembalikan NaN karena loop membaca index di luar panjang array (array[length] bernilai undefined).',
    rootCause: 'Kondisi perulangan for menggunakan "i <= scores.length", yang mencoba mengakses elemen pada index sama dengan panjang array.',
    prescription: 'Ubah kondisi loop menjadi "i < scores.length" atau gunakan loop modern "for (const score of scores)" atau "Array.reduce()".',
    prevention: 'Gunakan method iterasi fungsional seperti .reduce(), .map(), atau for..of untuk menghindari perhitungan manual boundary index.',
    hintSnippet: `// Contoh perbaikan:
function getAverageScores(scores) {
  if (!scores || scores.length === 0) return 0;
  let total = 0;
  for (let i = 0; i < scores.length; i++) { // Gunakan < bukan <=
    total += scores[i];
  }
  return total / scores.length;
}`,
    xp: 60,
    buggyCode: `function getAverageScores(scores) {
  if (!scores || scores.length === 0) return 0;
  
  let total = 0;
  // BUG: Kondisi loop membaca melebihi panjang array
  for (let i = 0; i <= scores.length; i++) {
    total += scores[i]; // Saat i === scores.length, scores[i] adalah undefined!
  }
  
  return total / scores.length;
}

// Uji coba kasus:
const scores = [80, 90, 100];
console.log("Hasil:", getAverageScores(scores)); // NaN`,
    expectedBehavior: 'getAverageScores([80, 90, 100]) harus menghasilkan 90 (bukan NaN).',
    testRunner: (code) => {
      try {
        const logs: string[] = [];
        const sandboxConsole = {
          log: (...args: any[]) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '))
        };
        const fn = new Function('console', `${code}\nreturn getAverageScores;`)(sandboxConsole);
        const res1 = fn([80, 90, 100]);
        const res2 = fn([10, 20, 30, 40]);
        
        if (Number.isNaN(res1) || res1 !== 90) {
          return { passed: false, message: `Output untuk [80, 90, 100] masih ${res1} (diharapkan 90)`, logs };
        }
        if (res2 !== 25) {
          return { passed: false, message: `Output untuk [10, 20, 30, 40] adalah ${res2} (diharapkan 25)`, logs };
        }
        return { passed: true, message: 'Diagnosa akurat & patch berhasil! Nilai rata-rata terkalkulasi presisi tanpa NaN.', logs };
      } catch (err: any) {
        return { passed: false, message: `Runtime Exception: ${err.message}` };
      }
    },
    variableWatchMock: [
      { varName: 'i', buggyVal: '3 (melebihi max index 2)', expectedVal: '0 .. 2', note: 'Loop berjalan 4 kali bukan 3 kali' },
      { varName: 'scores[3]', buggyVal: 'undefined', expectedVal: 'Tidak terakses', note: 'undefined ditambahkan ke number menjadi NaN' },
      { varName: 'total', buggyVal: 'NaN', expectedVal: '270', note: 'Akumulasi total rusak' }
    ],
    stackTrace: {
      line: 7,
      file: 'scores_analyzer.js',
      message: 'TypeError / Arithmetic Failure: Cannot coerce undefined into valid finite number',
      scope: 'getAverageScores() -> for loop'
    }
  },
  {
    id: 'bug-py-mutable-default',
    title: 'Case #2: Python Mutable Default Argument Trapping',
    severity: 'Logic Bug',
    category: 'python',
    symptom: 'Fungsi add_item_to_cart() menggunakan list keranjang belanjaan orang sebelumnya ketika parameter cart tidak diisi!',
    rootCause: 'Default argument di Python dievaluasi hanya sekali saat fungsi didefinisikan, bukan setiap kali fungsi dipanggil. Menggunakan list kosong "items=[]" membuat semua pemanggilan berbagi objek list memori yang sama.',
    prescription: 'Gunakan sentinel "items=None" sebagai default value, lalu inisialisasi "if items is None: items = []" di dalam body fungsi.',
    prevention: 'Jangan pernah menggunakan tipe data mutable (list, dict, set) sebagai default argument di Python.',
    hintSnippet: `# Contoh perbaikan dengan sentinel pattern:
def add_item_to_cart(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items`,
    xp: 80,
    buggyCode: `def add_item_to_cart(item, items=[]):
    # BUG: items=[] dibagi ke seluruh pemanggilan berikutnya
    items.append(item)
    return items

# Pemanggilan pertama:
cart1 = add_item_to_cart("MacBook")
print("Cart 1:", cart1) # ['MacBook']

# Pemanggilan kedua (tanpa argumen cart):
cart2 = add_item_to_cart("Mouse")
print("Cart 2:", cart2) # Menjadi ['MacBook', 'Mouse']! Diharapkan hanya ['Mouse']`,
    expectedBehavior: 'cart2 harus berisi hanya ["Mouse"] dan tidak mewarisi item dari cart1.',
    testRunner: (code) => {
      const testCode = `${code}
c1 = add_item_to_cart("Book")
c2 = add_item_to_cart("Pen")
print("__CART1__:" + str(c1))
print("__CART2__:" + str(c2))
`;
      const res = executePython(testCode);
      if (res.error) return { passed: false, message: `Python Error: ${res.error}` };
      if (res.output.includes("['Pen']") && !res.output.includes("['Book', 'Pen']")) {
        return { passed: true, message: 'Hebat! Sentinel pattern (items=None) berhasil mencegah kebocoran memori mutable default argumen.' };
      }
      return { passed: false, message: 'Cart 2 masih tercemar item sebelumnya: ' + res.output };
    },
    variableWatchMock: [
      { varName: 'id(items)', buggyVal: '0x7f8842 (Tetap sama)', expectedVal: 'Alokasi baru tiap panggilan', note: 'Shared reference across function calls' },
      { varName: 'len(cart2)', buggyVal: '2', expectedVal: '1', note: 'Cart tercampur item dari panggilan terdahulu' }
    ],
    stackTrace: {
      line: 1,
      file: 'cart_service.py',
      message: 'State Pollution: Mutable default argument \`items=[]\` persists across invocations',
      scope: 'add_item_to_cart(item, items=[])'
    }
  },
  {
    id: 'bug-js-async-unhandled',
    title: 'Case #3: Async Data Fetching Without Await',
    severity: 'Async Race',
    category: 'javascript',
    symptom: 'Fungsi getUserGreeting(userId) mengembalikan "[object Promise]" bukan nama user string yang sebenarnya.',
    rootCause: 'Fungsi asynchronous getUserData() dipanggil tanpa kata kunci "await", sehingga yang dimasukkan ke template string adalah Promise pending object.',
    prescription: 'Tambahkan kata kunci "async" pada getUserGreeting dan "await" pada pemanggilan fetch/getUserData().',
    prevention: 'Gunakan ESLint rule \`@typescript-eslint/no-floating-promises\` dan \`require-await\` untuk menangkap Promise yang terlewat.',
    hintSnippet: `// Contoh perbaikan dengan await:
async function getUserGreeting(userId) {
  const user = await fetchUserData(userId); // Tambahkan 'await'
  return "Halo " + user.name + ", selamat datang kembali!";
}`,
    xp: 75,
    buggyCode: `async function fetchUserData(userId) {
  // Simulasi fetch database
  return { id: userId, name: "Farhan Dev", role: "Pro Member" };
}

async function getUserGreeting(userId) {
  // BUG: Lupa menambahkan 'await' sebelum fetchUserData
  const user = fetchUserData(userId); 
  
  return "Halo " + user.name + ", selamat datang kembali!";
}

// Uji coba:
getUserGreeting(101).then(msg => console.log(msg));`,
    expectedBehavior: 'getUserGreeting(101) harus menghasilkan "Halo Farhan Dev, selamat datang kembali!".',
    testRunner: (code) => {
      try {
        const logs: string[] = [];
        const sandboxConsole = { log: (...a: any[]) => logs.push(a.join(' ')) };
        const fn = new Function('console', `${code}\nreturn getUserGreeting;`)(sandboxConsole);
        
        const p = fn(101);
        if (!p || typeof p.then !== 'function') {
          return { passed: false, message: 'getUserGreeting harus mengembalikan Promise (fungsi async).' };
        }
        
        return {
          passed: code.includes('await fetchUserData') || code.includes('await getUserData'),
          message: code.includes('await') 
            ? 'Sukses! Promise berhasil di-await dengan sempurna sehingga data pengguna ter-resolve.'
            : 'Nilai user masih belum di-await (Promise pending).',
          logs
        };
      } catch (err: any) {
        return { passed: false, message: `Runtime Exception: ${err.message}` };
      }
    },
    variableWatchMock: [
      { varName: 'user', buggyVal: 'Promise {<pending>}', expectedVal: '{ id: 101, name: "Farhan Dev" }', note: 'Objek Promise diekstrak tanpa resolving' },
      { varName: 'user.name', buggyVal: 'undefined', expectedVal: '"Farhan Dev"', note: 'Properti .name belum tersedia pada Promise' }
    ],
    stackTrace: {
      line: 7,
      file: 'user_controller.js',
      message: 'Unresolved Promise Value: property access .name on Promise object',
      scope: 'getUserGreeting(userId)'
    }
  },
  {
    id: 'bug-py-keyerror',
    title: 'Case #4: Python Unsafe Dictionary Key Access (KeyError)',
    severity: 'Warning',
    category: 'python',
    symptom: 'Program kasir crash dengan KeyError saat memproses user yang tidak memiliki opsi promo diskon dalam profilnya.',
    rootCause: 'Mengakses dictionary dengan dict["discount"] langsung akan memicu KeyError jika key tersebut opsional atau tidak terdaftar.',
    prescription: 'Gunakan method \`.get("discount", 0)\` dengan nilai default 0, atau periksa keberadaan key dengan "if key in dict:".',
    prevention: 'Selalu gunakan .get() untuk data dinamis dari API atau payload eksternal yang tidak dijamin kelengkapan skemanya.',
    hintSnippet: `# Contoh perbaikan dengan .get():
def calculate_final_price(product, user_profile):
    base_price = product["price"]
    discount_rate = user_profile.get("discount", 0) # Aman dari KeyError
    final_price = base_price * (1 - discount_rate)
    return round(final_price)`,
    xp: 65,
    buggyCode: `def calculate_final_price(product, user_profile):
    base_price = product["price"]
    
    # BUG: Mengakses key "discount" secara langsung memicu KeyError jika user profile tidak memilikinya!
    discount_rate = user_profile["discount"] 
    
    final_price = base_price * (1 - discount_rate)
    return round(final_price)

# Kasus User Member VIP:
vip_user = {"name": "Citra", "discount": 0.2}
print("VIP Bayar:", calculate_final_price({"price": 100000}, vip_user)) # 80000

# Kasus User Guest (Tanpa key discount):
guest_user = {"name": "Anonim"}
print("Guest Bayar:", calculate_final_price({"price": 100000}, guest_user)) # CRASH: KeyError!`,
    expectedBehavior: 'calculate_final_price harus mengembalikan 100000 tanpa crash jika discount tidak tersedia.',
    testRunner: (code) => {
      const testCode = `${code}
guest = {"name": "Anonim"}
p1 = calculate_final_price({"price": 100000}, guest)
vip = {"name": "Citra", "discount": 0.2}
p2 = calculate_final_price({"price": 100000}, vip)
print("__RES__:" + str(p1) + "_" + str(p2))
`;
      const res = executePython(testCode);
      if (res.error) return { passed: false, message: `Python Error: ${res.error}` };
      if (res.output.includes('100000_80000')) {
        return { passed: true, message: 'Sempurna! Penggunaan dictionary .get() aman menangani optional properties tanpa KeyError.' };
      }
      return { passed: false, message: 'Hasil perhitungan belum sesuai: ' + res.output };
    },
    variableWatchMock: [
      { varName: 'user_profile["discount"]', buggyVal: 'KeyError: "discount"', expectedVal: '0 (default fallback)', note: 'Key opsional tidak ditemukan' },
      { varName: 'final_price', buggyVal: 'Program Terminated', expectedVal: '100000', note: 'Eksekusi gagal sebelum kalkulasi' }
    ],
    stackTrace: {
      line: 5,
      file: 'pricing_engine.py',
      message: 'KeyError: "discount" in user_profile dictionary lookup',
      scope: 'calculate_final_price(product, user_profile)'
    }
  },
  {
    id: 'bug-js-floating-point',
    title: 'Case #5: IEEE 754 Floating-Point & Currency Precision',
    severity: 'Critical',
    category: 'javascript',
    symptom: 'Kalkulasi diskon e-commerce dan ambang gratis ongkir gagal karena 0.1 + 0.2 !== 0.3. Angka pecahan menghasilkan error presisi biner (0.30000000000000004).',
    rootCause: 'Standard IEEE 754 binary floating-point merepresentasikan desimal dalam pecahan pangkat 2, sehingga 0.1 + 0.2 menghasilkan selisih mikroskopik.',
    prescription: 'Gunakan toleransi epsilon: Math.abs(cartTotal - threshold) < 0.0001 atau bulatkan hasil kalkulasi dengan Math.round() / Number.toFixed(2).',
    prevention: 'Di sistem finansial dan checkout, simpan dan operasikan harga dalam integer terkecil (sen/rupiah utuh), hindari komparasi equality langsung (===) pada angka float.',
    hintSnippet: `// Contoh perbaikan dengan toleransi epsilon & pembulatan:
function isOrderEligibleForFreeShipping(cartTotal, threshold) {
  return Math.abs(cartTotal - threshold) < 0.0001;
}

function calculateDiscountedTotal(price, discountPercent) {
  const rawTotal = price * (1 - (discountPercent / 100));
  return Math.round(rawTotal * 100) / 100;
}`,
    xp: 70,
    buggyCode: `function isOrderEligibleForFreeShipping(cartTotal, threshold) {
  // BUG: 0.1 + 0.2 menghasilkan 0.30000000000000004
  // Pengecekan equality langsung === gagal karena presisi IEEE 754
  const remaining = threshold - cartTotal;
  return remaining === 0;
}

function calculateDiscountedTotal(price, discountPercent) {
  // BUG: Menghasilkan pecahan floating point tak terkontrol
  const rawTotal = price * (1 - (discountPercent / 100));
  return rawTotal;
}

// Uji coba kasus:
console.log("Free Shipping (0.1 + 0.2 vs 0.3):", isOrderEligibleForFreeShipping(0.1 + 0.2, 0.3)); // false (BUG!)
console.log("Discounted Total (99.99, 10%):", calculateDiscountedTotal(99.99, 10)); // 89.99100000000001`,
    expectedBehavior: 'isOrderEligibleForFreeShipping(0.1 + 0.2, 0.3) harus bernilai true, dan diskon terbulatkan presisi.',
    testRunner: (code) => {
      try {
        const logs: string[] = [];
        const sandboxConsole = { log: (...a: any[]) => logs.push(a.join(' ')) };
        const fn = new Function('console', `${code}\nreturn { isOrderEligibleForFreeShipping, calculateDiscountedTotal };`)(sandboxConsole);
        
        const test1 = fn.isOrderEligibleForFreeShipping(0.1 + 0.2, 0.3);
        const test2 = fn.isOrderEligibleForFreeShipping(50.55 + 49.45, 100.00);
        const disc1 = fn.calculateDiscountedTotal(100, 30);
        const disc2 = fn.calculateDiscountedTotal(99.99, 10);
        
        if (!test1) {
          return { passed: false, message: 'isOrderEligibleForFreeShipping(0.1 + 0.2, 0.3) masih bernilai false karena floating precision.', logs };
        }
        if (!test2) {
          return { passed: false, message: 'isOrderEligibleForFreeShipping(50.55 + 49.45, 100) gagal.', logs };
        }
        if (typeof disc1 !== 'number' || Math.abs(disc1 - 70) > 0.01) {
          return { passed: false, message: `calculateDiscountedTotal(100, 30) tidak tepat: ${disc1}`, logs };
        }
        const disc2Str = String(disc2);
        if (disc2Str.length > 7 && !disc2Str.includes('e')) {
          return { passed: false, message: `calculateDiscountedTotal(99.99, 10) menghasilkan angka pecahan tak terbulatkan: ${disc2}`, logs };
        }
        return { passed: true, message: 'Hebat! Toleransi presisi IEEE 754 berhasil diterapkan dan kalkulasi checkout akurat.', logs };
      } catch (err: any) {
        return { passed: false, message: `Runtime Exception: ${err.message}` };
      }
    },
    variableWatchMock: [
      { varName: '0.1 + 0.2', buggyVal: '0.30000000000000004', expectedVal: '0.3 (dengan toleransi epsilon)', note: 'Representasi biner pecahan basis 10 tidak sempurna' },
      { varName: 'remaining === 0', buggyVal: 'false', expectedVal: 'true', note: 'Equality strict gagal' }
    ],
    stackTrace: {
      line: 4,
      file: 'checkout_engine.js',
      message: 'AssertionError: Cart qualification for free shipping failed on float boundary',
      scope: 'isOrderEligibleForFreeShipping(cartTotal, threshold)'
    }
  },
  {
    id: 'bug-web-immutable-state',
    title: 'Case #6: Object Mutation & Broken React / State History',
    severity: 'Logic Bug',
    category: 'web',
    symptom: 'Fitur undo/riwayat keranjang belanja rusak karena pembaruan kuantitas memutasi objek referensi asli secara langsung (shallow mutation leak).',
    rootCause: 'Fungsi updateItemQuantity mengubah properti objek secara langsung (cart[i].qty = newQty) dan mengembalikan array yang sama tanpa membuat salinan baru.',
    prescription: 'Terapkan immutability: gunakan .map() untuk membuat array baru, dan spread operator ({ ...item, qty: newQty }) untuk menduplikasi objek yang berubah.',
    prevention: 'Di frontend modern (React, Redux, Zustand), jangan pernah memutasi state secara in-place. Gunakan functional update atau library helper seperti Immer.',
    hintSnippet: `// Contoh perbaikan immutable dengan .map() & spread:
function updateItemQuantity(cart, itemId, newQty) {
  return cart.map(item => 
    item.id === itemId 
      ? { ...item, qty: newQty } 
      : item
  );
}`,
    xp: 85,
    buggyCode: `function updateItemQuantity(cart, itemId, newQty) {
  // BUG: Memutasi elemen array cart secara langsung (shallow mutation)
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === itemId) {
      cart[i].qty = newQty; // Modifikasi referensi asli!
    }
  }
  return cart; // Mengembalikan referensi array yang sama
}

// Uji coba kasus snapshot:
const initialCart = [{ id: 1, name: "T-Shirt", qty: 1 }];
const snapshotBefore = [...initialCart]; // Shallow copy

const updatedCart = updateItemQuantity(initialCart, 1, 5);

// BUG: snapshotBefore[0].qty ikut berubah menjadi 5!
console.log("Snapshot sebelum update (harus tetap 1):", snapshotBefore[0].qty);`,
    expectedBehavior: 'updateItemQuantity harus mengembalikan array baru dan objek baru tanpa mengubah data referensi awal.',
    testRunner: (code) => {
      try {
        const logs: string[] = [];
        const sandboxConsole = { log: (...a: any[]) => logs.push(a.join(' ')) };
        const fn = new Function('console', `${code}\nreturn updateItemQuantity;`)(sandboxConsole);
        
        const originalItem = { id: 1, name: "T-Shirt", qty: 1 };
        const originalCart = [originalItem, { id: 2, name: "Cap", qty: 2 }];
        
        const newCart = fn(originalCart, 1, 5);
        
        if (!Array.isArray(newCart)) {
          return { passed: false, message: 'updateItemQuantity harus mengembalikan array.', logs };
        }
        if (newCart === originalCart) {
          return { passed: false, message: 'Array yang dikembalikan masih mereferensikan array asli (tidak immutable).', logs };
        }
        if (originalItem.qty !== 1) {
          return { passed: false, message: `Objek asli ikut termutasi! qty asli berubah menjadi ${originalItem.qty} (seharusnya tetap 1).`, logs };
        }
        if (newCart[0].qty !== 5) {
          return { passed: false, message: `Item pada keranjang baru tidak terupdate (nilai: ${newCart[0]?.qty}).`, logs };
        }
        return { passed: true, message: 'Sempurna! Pola immutable update berhasil menjaga integritas snapshot memori dan state React.', logs };
      } catch (err: any) {
        return { passed: false, message: `Runtime Exception: ${err.message}` };
      }
    },
    variableWatchMock: [
      { varName: 'cart[0] === newCart[0]', buggyVal: 'true (Identitas objek sama)', expectedVal: 'false (Kloning baru)', note: 'Mutasi mencemari snapshot lama' },
      { varName: 'snapshotBefore[0].qty', buggyVal: '5 (Tercemar)', expectedVal: '1', note: 'Fitur undo atau time-travel gagal' }
    ],
    stackTrace: {
      line: 5,
      file: 'cart_store.ts',
      message: 'StateDriftError: Direct mutation of state detected in render tree selector',
      scope: 'updateItemQuantity(cart, itemId, newQty)'
    }
  },
  {
    id: 'bug-py-late-binding',
    title: 'Case #7: Python Late Binding Closure in Multipliers',
    severity: 'Logic Bug',
    category: 'python',
    symptom: 'Fungsi generator pengali create_multipliers() menghasilkan fungsi-fungsi yang semuanya mengalikan dengan angka 4 (nilai i terakhir), bukan 0, 1, 2, 3, 4.',
    rootCause: 'Late binding di Python: Variabel "i" yang dirujuk dalam closure lambda dievaluasi saat fungsi dipanggil, bukan saat fungsi didefinisikan dalam loop.',
    prescription: 'Ikat nilai "i" saat deklarasi menggunakan default argument: "lambda x, i=i: x * i", atau gunakan functools.partial.',
    prevention: 'Hati-hati saat membuat lambda atau nested function di dalam loop Python. Selalu tangkap variabel loop dengan parameter default (i=i).',
    hintSnippet: `# Contoh perbaikan dengan default argument binding:
def create_multipliers():
    multipliers = []
    for i in range(5):
        multipliers.append(lambda x, i=i: x * i) # Kunci nilai i
    return multipliers`,
    xp: 80,
    buggyCode: `def create_multipliers():
    # BUG: Late binding membuat lambda membaca variabel i pada saat pemanggilan
    multipliers = []
    for i in range(5):
        multipliers.append(lambda x: x * i)
    return multipliers

# Uji coba:
funcs = create_multipliers()
print("funcs[0](2):", funcs[0](2)) # Menghasilkan 8 bukan 0 (2 * 4)!
print("funcs[1](2):", funcs[1](2)) # Menghasilkan 8 bukan 2 (2 * 4)!`,
    expectedBehavior: 'funcs[0](2) harus menghasilkan 0, funcs[1](2) menghasilkan 2, funcs[2](2) menghasilkan 4.',
    testRunner: (code) => {
      const testCode = `${code}
funcs = create_multipliers()
r0 = funcs[0](2)
r1 = funcs[1](2)
r2 = funcs[2](2)
r3 = funcs[3](2)
print("__RES__:" + str(r0) + "_" + str(r1) + "_" + str(r2) + "_" + str(r3))
`;
      const res = executePython(testCode);
      if (res.error) return { passed: false, message: `Python Error: ${res.error}` };
      if (res.output.includes('__RES__:0_2_4_6')) {
        return { passed: true, message: 'Luar biasa! Default argument binding (i=i) mengunci nilai iterasi loop pada closure secara tepat.' };
      }
      return { passed: false, message: 'Hasil perkalian masih belum sesuai: ' + res.output };
    },
    variableWatchMock: [
      { varName: 'i (saat funcs[0] dipanggil)', buggyVal: '4 (Loop telah selesai)', expectedVal: '0 (Terkunci per iterasi)', note: 'Closure mencari i di scope luar saat eksekusi' },
      { varName: 'funcs[0](2)', buggyVal: '8', expectedVal: '0', note: 'Semua fungsi menghasilkan output yang sama' }
    ],
    stackTrace: {
      line: 5,
      file: 'math_factory.py',
      message: 'ScopeLeak: Closure references enclosing scope loop variable \`i\` post-loop termination',
      scope: 'create_multipliers() -> lambda x'
    }
  },
  {
    id: 'bug-js-regex-redos',
    title: 'Case #8: RegEx Catastrophic Backtracking (ReDoS Hang)',
    severity: 'Critical',
    category: 'javascript',
    symptom: 'Fungsi validasi input form membekukan CPU thread saat menerima string panjang dengan karakter tak valid di ujungnya karena nested quantifiers (a+)+.',
    rootCause: 'Kombinasi nested quantifiers menyebabkan kompleksitas O(2^N) backtracking saat ekspresi reguler gagal mencocokkan karakter penutup.',
    prescription: 'Sederhanakan ekspresi reguler tanpa pengulangan bersarang: gunakan pola linear seperti "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\\\.[a-zA-Z]{2,}$" dan batasi panjang string.',
    prevention: 'Audit regex dengan alat linter ReDoS, jangan gunakan struktur bertingkat seperti (a+)+ atau (.*a)+ pada input pengguna publik.',
    hintSnippet: `// Contoh perbaikan pola regex linear yang aman dari ReDoS:
function validateEmailPattern(input) {
  if (!input || input.length > 254) return false;
  // Pola linear tanpa pengulangan bersarang:
  const safeRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
  return safeRegex.test(input);
}`,
    xp: 90,
    buggyCode: `function validateEmailPattern(input) {
  if (!input) return false;

  // BUG: Nested quantifiers ([a-zA-Z0-9]+)+ memicu Catastrophic Backtracking (ReDoS)!
  // String "aaaaaaaaaaaaaaaaaaaaaaaaaaaa!" akan membekukan sistem.
  const dangerousRegex = /^([a-zA-Z0-9]+)+@([a-zA-Z0-9]+)+\\.[a-zA-Z]{2,}$/;
  
  return dangerousRegex.test(input);
}

// Uji coba normal:
console.log("Email valid:", validateEmailPattern("user@example.com")); // true`,
    expectedBehavior: 'validateEmailPattern harus memvalidasi format email tanpa pola nested quantifiers yang rentan ReDoS.',
    testRunner: (code) => {
      try {
        const logs: string[] = [];
        const sandboxConsole = { log: (...a: any[]) => logs.push(a.join(' ')) };
        const fn = new Function('console', `${code}\nreturn validateEmailPattern;`)(sandboxConsole);
        
        if (code.includes('([a-zA-Z0-9]+)+') || code.includes('([a-z]+)+') || code.includes('(.+)+')) {
          return { passed: false, message: 'Pola regex masih mengandung nested quantifiers (+)+ yang rentan ReDoS!', logs };
        }
        
        const ok1 = fn('dev@commandev.app') || fn('dev@codera.app');
        const ok2 = fn('user.name+tag@domain.co.id');
        const bad1 = fn('invalid-email-no-at');
        const bad2 = fn('user@');
        
        if (!ok1) return { passed: false, message: 'Gagal memvalidasi "dev@commandev.app" (harus true).', logs };
        if (bad1) return { passed: false, message: '"invalid-email-no-at" tidak boleh lolos (harus false).', logs };
        if (bad2) return { passed: false, message: '"user@" tidak boleh lolos (harus false).', logs };

        return { passed: true, message: 'Hebat! Ekspresi reguler telah di-refactor menjadi aman dari kerentanan ReDoS dengan efisiensi O(N).', logs };
      } catch (err: any) {
        return { passed: false, message: `Runtime Exception: ${err.message}` };
      }
    },
    variableWatchMock: [
      { varName: 'Kompleksitas Algoritma', buggyVal: 'O(2^N) Eksponensial', expectedVal: 'O(N) Linear', note: 'Backtracking ratusan ribu cabang dibatalkan' },
      { varName: 'Latency Eksekusi', buggyVal: '> 5000ms (Thread Hang)', expectedVal: '< 1ms', note: 'Waktu respon stabil dan aman' }
    ],
    stackTrace: {
      line: 8,
      file: 'validation_utils.js',
      message: 'ReDoS Alert: Exponential backtracking detected on catastrophic pattern /^([a-zA-Z0-9]+)+.../',
      scope: 'validateEmailPattern(input)'
    }
  }
];

interface DebuggingLabViewProps {
  userProgress: UserProgress;
  onRewardXp: (xp: number, id: string) => void;
  initialBugId?: string;
}

export const DebuggingLabView: React.FC<DebuggingLabViewProps> = ({ userProgress, onRewardXp, initialBugId }) => {
  const [selectedBugId, setSelectedBugId] = useState<string>(() => {
    if (initialBugId && DEBUG_PATIENTS.some(p => p.id === initialBugId)) {
      return initialBugId;
    }
    return DEBUG_PATIENTS[0].id;
  });

  const activePatient = DEBUG_PATIENTS.find(p => p.id === selectedBugId) || DEBUG_PATIENTS[0];
  const [code, setCode] = useState(activePatient.buggyCode);
  const [testResult, setTestResult] = useState<{ passed: boolean; message: string; logs?: string[] } | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<'diagnosis' | 'watch' | 'stack' | 'hint'>('diagnosis');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'javascript' | 'python' | 'web'>('all');

  const handleSelectPatient = (patient: DebugPatient) => {
    setSelectedBugId(patient.id);
    setCode(patient.buggyCode);
    setTestResult(null);
  };

  const handleResetCode = () => {
    setCode(activePatient.buggyCode);
    setTestResult(null);
  };

  const handleApplyHint = () => {
    if (activePatient.hintSnippet) {
      setCode(activePatient.hintSnippet);
      setTestResult(null);
    }
  };

  const handleTestFix = () => {
    setIsRunning(true);
    setTestResult(null);

    setTimeout(() => {
      const res = activePatient.testRunner(code);
      setTestResult(res);
      setIsRunning(false);

      if (res.passed && !userProgress.completedLessons.includes(activePatient.id)) {
        onRewardXp(activePatient.xp, activePatient.id);
      }
    }, 200);
  };

  const getSeverityBadge = (sev: DebugPatient['severity']) => {
    switch (sev) {
      case 'Critical':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 'Async Race':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'Logic Bug':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default:
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    }
  };

  const filteredPatients = DEBUG_PATIENTS.filter(p => {
    if (categoryFilter === 'all') return true;
    return p.category === categoryFilter;
  });

  const curedCount = DEBUG_PATIENTS.filter(p => userProgress.completedLessons.includes(p.id)).length;

  return (
    <div className="h-full flex flex-col lg:flex-row bg-[#0b0f19] text-slate-100 overflow-hidden">
      
      {/* LEFT SIDEBAR: Patient Bug Cases */}
      <div className="w-full lg:w-80 border-r border-slate-800 bg-slate-950 flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center">
                <Stethoscope className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-extrabold text-sm text-white">Code Doctor Lab</h2>
                <p className="text-[11px] text-slate-400">Diagnosis & Fix Bug Kritis</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] font-bold text-slate-300">
              {curedCount}/{DEBUG_PATIENTS.length}
            </span>
          </div>

          {/* Category Filter Pills */}
          <div className="grid grid-cols-4 gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 text-[10px] font-medium">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`py-1 rounded text-center transition-all ${
                categoryFilter === 'all' ? 'bg-rose-500 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setCategoryFilter('javascript')}
              className={`py-1 rounded text-center transition-all ${
                categoryFilter === 'javascript' ? 'bg-rose-500 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              JS
            </button>
            <button
              onClick={() => setCategoryFilter('python')}
              className={`py-1 rounded text-center transition-all ${
                categoryFilter === 'python' ? 'bg-rose-500 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Python
            </button>
            <button
              onClick={() => setCategoryFilter('web')}
              className={`py-1 rounded text-center transition-all ${
                categoryFilter === 'web' ? 'bg-rose-500 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Web
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
          {filteredPatients.map((p) => {
            const isSelected = activePatient.id === p.id;
            const isCured = userProgress.completedLessons.includes(p.id);

            return (
              <div
                key={p.id}
                onClick={() => handleSelectPatient(p)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isSelected 
                    ? 'bg-rose-500/10 border-rose-500 text-white shadow-sm' 
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span className="font-bold text-xs leading-snug">{p.title}</span>
                  {isCured && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />}
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                  <span className={`px-2 py-0.5 rounded border text-[9px] font-bold uppercase tracking-wider ${getSeverityBadge(p.severity)}`}>
                    {p.severity}
                  </span>
                  <span>•</span>
                  <span className="text-amber-400 font-bold">+{p.xp} XP</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CENTER & RIGHT: Debugging Arena */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Top Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getSeverityBadge(activePatient.severity)}`}>
                {activePatient.severity}
              </span>
              <h1 className="text-base font-bold text-white">{activePatient.title}</h1>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl">{activePatient.symptom}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('hint')}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-300 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              title="Buka Petunjuk Resep Solusi"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Hint</span>
            </button>

            <button
              onClick={handleResetCode}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              title="Reset Kode Bug Asli"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <button
              onClick={handleTestFix}
              disabled={isRunning}
              className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-600/30 transition-all cursor-pointer disabled:opacity-50"
            >
              <HeartPulse className="w-4 h-4" />
              <span>{isRunning ? 'Menguji Patch...' : 'Uji & Obati Bug'}</span>
            </button>
          </div>
        </div>

        {/* Arena Workspace Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800 overflow-hidden">
          
          {/* Code Editor Pane (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col h-full bg-[#080c14] overflow-hidden">
            <div className="p-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                <FileCode2 className="w-4 h-4 text-rose-400" />
                <span>Patch Editor ({activePatient.category.toUpperCase()})</span>
              </div>
              <span className="text-[11px] text-slate-500 font-mono">Tekan tombol Uji setelah memperbaiki</span>
            </div>

            <div className="flex-1 overflow-auto custom-scrollbar p-4 font-mono text-xs leading-relaxed bg-[#060910]">
              <Editor
                value={code}
                onValueChange={(c: string) => setCode(c)}
                highlight={(codeToHighlight: string) => {
                  const lang = activePatient.category === 'python' ? Prism.languages.python : Prism.languages.javascript;
                  return Prism.highlight(codeToHighlight, lang, activePatient.category);
                }}
                padding={12}
                className="min-h-full font-mono text-xs text-rose-300 outline-none"
                style={{
                  fontFamily: '"Fira Code", monospace',
                  fontSize: 13
                }}
              />
            </div>

            {/* Test Result Bar */}
            {testResult && (
              <div className={`p-3.5 border-t text-xs flex items-start gap-2.5 ${
                testResult.passed 
                  ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200' 
                  : 'bg-rose-950/40 border-rose-800 text-rose-200'
              }`}>
                {testResult.passed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-bold text-sm mb-0.5">
                    {testResult.passed ? '🎉 Bug Berhasil Disembuhkan!' : '⚠️ Patch Belum Tepat'}
                  </div>
                  <div className="text-xs leading-relaxed opacity-90">{testResult.message}</div>
                </div>
              </div>
            )}
          </div>

          {/* Diagnostic & Inspector Pane (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col h-full bg-slate-950 overflow-hidden">
            {/* Tabs */}
            <div className="flex items-center px-4 pt-3 border-b border-slate-800 gap-2 bg-slate-950 overflow-x-auto">
              <button
                onClick={() => setActiveTab('diagnosis')}
                className={`pb-2 text-xs font-bold transition-all border-b-2 whitespace-nowrap ${
                  activeTab === 'diagnosis' 
                    ? 'border-rose-500 text-rose-400' 
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                🔬 Diagnosis
              </button>
              <button
                onClick={() => setActiveTab('watch')}
                className={`pb-2 text-xs font-bold transition-all border-b-2 whitespace-nowrap ${
                  activeTab === 'watch' 
                    ? 'border-rose-500 text-rose-400' 
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                🔍 Variable Watch
              </button>
              <button
                onClick={() => setActiveTab('stack')}
                className={`pb-2 text-xs font-bold transition-all border-b-2 whitespace-nowrap ${
                  activeTab === 'stack' 
                    ? 'border-rose-500 text-rose-400' 
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                📜 Call Stack
              </button>
              <button
                onClick={() => setActiveTab('hint')}
                className={`pb-2 text-xs font-bold transition-all border-b-2 whitespace-nowrap ${
                  activeTab === 'hint' 
                    ? 'border-amber-500 text-amber-400' 
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                💡 Solusi & Patch
              </button>
            </div>

            {/* Tab Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {activeTab === 'diagnosis' && (
                <>
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                    <div className="text-[10px] uppercase font-bold text-rose-400 tracking-wider flex items-center gap-1.5">
                      <Bug className="w-3.5 h-3.5" />
                      Akar Masalah (Root Cause)
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{activePatient.rootCause}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                    <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5" />
                      Resep Perbaikan (Prescription)
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{activePatient.prescription}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                    <div className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      Tips Pencegahan (Best Practice)
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{activePatient.prevention}</p>
                  </div>
                </>
              )}

              {activeTab === 'watch' && (
                <div className="space-y-3">
                  <div className="text-xs text-slate-400 font-medium">
                    Perbandingan nilai variabel saat eksekusi bug vs yang diharapkan:
                  </div>
                  {activePatient.variableWatchMock.map((w, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1.5">
                      <div className="flex items-center justify-between font-mono font-bold text-indigo-300">
                        <span>{w.varName}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                        <div className="p-2 rounded bg-rose-950/40 border border-rose-900/50 text-rose-300">
                          <span className="block text-[9px] uppercase font-bold text-rose-400">Nilai Saat Bug</span>
                          {w.buggyVal}
                        </div>
                        <div className="p-2 rounded bg-emerald-950/40 border border-emerald-900/50 text-emerald-300">
                          <span className="block text-[9px] uppercase font-bold text-emerald-400">Ekspektasi Benar</span>
                          {w.expectedVal}
                        </div>
                      </div>
                      <div className="text-[11px] text-slate-400 italic">{w.note}</div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'stack' && (
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs space-y-2">
                  <div className="text-rose-400 font-bold flex items-center gap-1.5 text-xs">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Runtime Exception Trace
                  </div>
                  <div className="p-2.5 rounded bg-black/50 text-rose-300 text-[11px] leading-relaxed border border-rose-950">
                    {activePatient.stackTrace.message}
                  </div>
                  <div className="text-slate-400 text-[11px] space-y-1 pt-1">
                    <div>📍 <b>File:</b> {activePatient.stackTrace.file} (Line {activePatient.stackTrace.line})</div>
                    <div>🎯 <b>Scope:</b> {activePatient.stackTrace.scope}</div>
                  </div>
                </div>
              )}

              {activeTab === 'hint' && (
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/40 text-xs space-y-2">
                    <div className="text-amber-400 font-bold flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Lightbulb className="w-4 h-4" />
                        Panduan Perbaikan Terbimbing
                      </span>
                      {activePatient.hintSnippet && (
                        <button
                          onClick={handleApplyHint}
                          className="px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-mono text-[10px] font-bold cursor-pointer transition-all"
                        >
                          Salin ke Editor
                        </button>
                      )}
                    </div>
                    <p className="text-slate-300 leading-relaxed text-[11px]">
                      {activePatient.prescription}
                    </p>
                  </div>

                  {activePatient.hintSnippet && (
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                      <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        Contoh Cuplikan Patch
                      </div>
                      <pre className="p-3 rounded bg-black/60 font-mono text-[11px] text-emerald-300 overflow-x-auto leading-relaxed border border-slate-800">
                        {activePatient.hintSnippet}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
