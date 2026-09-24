import { Course } from '../types';

export const CPP_COURSE: Course = {
  id: 'cpp-mastery',
  title: 'C++ Modern & High-Performance Systems',
  shortDescription: 'Kuasai C++ Modern (C++17/20): RAII, Smart Pointers, Move Semantics, Template Metaprogramming, STL Internals, dan Multithreading.',
  description: 'C++ adalah bahasa utama di balik game engine (Unreal Engine), trading berkecepatan ultra-tinggi (High-Frequency Trading / HFT), core AI framework (PyTorch, TensorFlow, llama.cpp), browser rendering engines, dan sistem antariksa. Kuasai filosofi "Zero-Cost Abstractions", manajemen resource deterministik (RAII), dan konkurensi modern.',
  icon: 'cpu',
  levels: [
    {
      id: 'cpp-lvl-0',
      title: 'Level 0 — Fondasi Modern C++ (C++17/C++20)',
      description: 'Stream I/O, const references, auto type deduction, structured binding, dan komparasi dengan C.',
      modules: [
        {
          id: 'cpp-mod-1',
          title: 'Sintaks Modern & Zero-Cost Abstractions',
          description: 'Namespaces, references, stream I/O, dan fitur modern language.',
          lessons: [
            {
              id: 'cpp-les-1',
              title: 'Evolusi C++: Dari C dengan Class ke Modern C++20',
              type: 'learn',
              xpReward: 25,
              content: [
                {
                  type: 'markdown',
                  content: `### Mengapa C++ Berbeda Fundamental dari C?

Banyak developer pemula mengira C++ hanyalah "bahasa C dengan class". Di era **Modern C++ (C++11 hingga C++20)**, filosofi bahasa berubah total:

#### Prinsip "Zero-Cost Abstractions" (Bjarne Stroustrup):
> *"Apa yang tidak kamu gunakan, tidak akan kamu bayar. Apa yang kamu gunakan, tidak bisa kamu tulis dengan tangan secara lebih cepat."*

\`\`\`
Perbandingan Pendekatan C vs C++ Modern:
┌──────────────────────────────┬──────────────────────────────┐
│ C Tradisional                │ C++ Modern (C++20)           │
├──────────────────────────────┼──────────────────────────────┤
│ malloc() & free() manual     │ RAII & std::unique_ptr       │
│ Raw char* & strcat()         │ std::string_view & fmt/print │
│ Raw array pointer int*       │ std::vector & std::span      │
│ Void* & Function Pointer     │ Templates & std::function    │
│ Manual pthread_create        │ std::jthread & std::async    │
└──────────────────────────────┴──────────────────────────────┘
\`\`\`

#### Fitur Esensial Modern C++:
1. **References (\`&\`):** Alias aman untuk variabel yang tidak bisa bernilai \`nullptr\` dan tidak memerlukan sintaks pointer yang bertele-tele.
2. **Const-Correctness (\`const Type&\`):** Mengirimkan data besar (seperti vector atau string) ke fungsi tanpa copy memori (nol alokasi) dan menjamin data tidak dimodifikasi secara tidak sengaja.
3. **Structured Bindings (C++17):** Membongkar tuple atau struct langsung menjadi variabel lokal: \`auto [key, value] = pair;\`.`
                },
                {
                  type: 'code-example',
                  language: 'cpp',
                  code: `#include <iostream>
#include <string>
#include <vector>
#include <tuple>

// Fungsi menerima const reference: 0 byte memory copy!
void inspect_telemetry(const std::string& node_id, const std::vector<double>& metrics) {
    std::cout << "Node: " << node_id << " | Sample Count: " << metrics.size() << "\\n";
}

// Mengembalikan pair status dan error code
std::tuple<bool, int, std::string> ping_cluster() {
    return {true, 200, "Cluster Healthy"};
}

int main() {
    std::string cluster_name = "sg-node-alpha-01";
    std::vector<double> latencies = {1.2, 0.9, 1.5, 0.8, 1.1};

    inspect_telemetry(cluster_name, latencies);

    // C++17 Structured Binding
    auto [is_healthy, status_code, msg] = ping_cluster();
    std::cout << "Status: " << status_code << " (" << msg << ")\\n";

    // Range-based for loop dengan const auto&
    for (const auto& ping : latencies) {
        if (ping > 1.0) {
            std::cout << "High ping detected: " << ping << "ms\\n";
        }
    }

    return 0;
}`
                }
              ]
            },
            {
              id: 'cpp-les-quiz-1',
              title: 'Kuis Konsep Modern C++',
              type: 'quiz',
              xpReward: 30,
              questions: [
                {
                  id: 'cpp-q1',
                  question: 'Mengapa melewatkan argumen bertipe object besar sebagai `const std::string&` lebih disukai dibandingkan `std::string` biasa?',
                  options: [
                    'Menghindari alokasi heap baru dan penyalinan karakter (copying) yang boros memori serta menjaga immutability',
                    'Mengizinkan fungsi mengubah nilai variabel asli tanpa pointer',
                    'Memaksa compiler mengabaikan pengecekan tipe data',
                    'Hanya untuk kompatibilitas dengan bahasa C lama'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Pass-by-const-reference melewatkan alias 64-bit alamat memori tanpa menduplikasi data buffer string di heap, sekaligus menjamin fungsi tidak bisa mengubah isinya.'
                },
                {
                  id: 'cpp-q2',
                  question: 'Fitur C++17 yang memungkinkan kita mengekstrak nilai dari std::tuple, std::pair, atau struct langsung ke beberapa variabel individual bernama:',
                  options: ['Pattern Destructuring', 'Structured Binding', 'Macro Expansion', 'Type Coercion'],
                  correctAnswerIndex: 1,
                  explanation: 'Structured Binding (`auto [x, y] = point;`) diperkenalkan pada standar C++17.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'cpp-lvl-1',
      title: 'Level 1 — Pemrograman Berorientasi Objek & RAII',
      description: 'Constructor initialization lists, Destructor otomatis, Virtual Functions, Polymorphism, dan aturan RAII.',
      modules: [
        {
          id: 'cpp-mod-2',
          title: 'Class, Polymorphism & Arsitektur RAII',
          description: 'Siklus hidup objek, vtable polimorfik, dan pembersihan resource deterministik.',
          lessons: [
            {
              id: 'cpp-les-raii',
              title: 'Prinsip RAII: Jantung Manajemen Resource C++',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### Apa itu RAII (*Resource Acquisition Is Initialization*)?

Di bahasa lain (seperti Java atau Go), resource dibersihkan menggunakan blok \`finally\` atau \`defer\`. Namun jika terjadi exception atau return di tengah jalan, programmer sering lupa membersihkan resource (socket, file handle, thread mutex, atau heap memory).

**Di C++, resource diikat ke siklus hidup objek di Stack:**
1. **Acquisition (Constructor):** Resource dibuka atau dialokasikan saat objek dibuat.
2. **Release (Destructor - \`~ClassName\`):** Resource dibebaskan **secara deterministik** seketika objek keluar dari scope (\`}\`), baik keluar normal, via return, maupun akibat exception!

\`\`\`
Scope Block {
    FileHandler file("data.bin"); // Constructor dipanggil: file dibuka
    
    if (network_error) {
        return; // Destructor ~FileHandler() OTOMATIS dipanggil di sini!
    }
} // Destructor OTOMATIS dipanggil di sini juga! Nol kebocoran file handle.
\`\`\``
                },
                {
                  type: 'code-example',
                  language: 'cpp',
                  code: `#include <iostream>
#include <fstream>
#include <string>

// Implementasi RAII Wrapper untuk File Stream POSIX/C++
class SafeFileWriter {
private:
    std::ofstream m_file;
    std::string m_filename;

public:
    // Resource Acquisition di Constructor
    explicit SafeFileWriter(const std::string& path) 
        : m_filename(path), m_file(path, std::ios::out | std::ios::app) {
        if (!m_file.is_open()) {
            std::cerr << "Gagal membuka file: " << m_filename << "\\n";
        } else {
            std::cout << "[RAII] File dibuka: " << m_filename << "\\n";
        }
    }

    void write_entry(const std::string& log) {
        if (m_file.is_open()) {
            m_file << log << "\\n";
        }
    }

    // Resource Release di Destructor (Dipanggil otomatis!)
    ~SafeFileWriter() {
        if (m_file.is_open()) {
            m_file.flush();
            m_file.close();
            std::cout << "[RAII] File ditutup aman & di-flush: " << m_filename << "\\n";
        }
    }
};

void run_worker() {
    SafeFileWriter log_writer("system.log");
    log_writer.write_entry("[INFO] Worker memproses packet #1092");
    // Tidak perlu memanggil file.close() manual!
} // log_writer keluar dari stack frame -> destructor dieksekusi seketika

int main() {
    run_worker();
    std::cout << "Worker selesai tanpa memory/file handle leak!\\n";
    return 0;
}`
                }
              ]
            },
            {
              id: 'cpp-les-polymorphism',
              title: 'Virtual Functions, VTable & Virtual Destructors',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Mekanisme Dynamic Dispatch & VTable di C++

Ketika sebuah class memiliki method bertanda \`virtual\`, compiler C++ menyisipkan pointer tersembunyi bernama **vptr** ke dalam objek. Vptr menunjuk ke **vtable (Virtual Method Table)** di memori yang berisi daftar alamat fungsi sesungguhnya.

#### Aturan Wajib Virtual Destructor:
Jika sebuah class dirancang untuk diwariskan (sebagai Base Class), **destructor-nya WAJIB dideklarasikan sebagai \`virtual\`**!
Jika tidak \`virtual\`, menghapus pointer base class (\`delete base_ptr\`) hanya akan memanggil destructor base class, menyebabkan destructor derived class terabaikan (*Undefined Behavior & Resource Leak*).`
                },
                {
                  type: 'code-example',
                  language: 'cpp',
                  code: `#include <iostream>
#include <memory>
#include <vector>

// Base Class Abstrak
class StorageEngine {
public:
    virtual void insert_record(int key, const std::string& value) = 0; // Pure Virtual
    virtual void flush() = 0;

    // WAJIB: Virtual Destructor
    virtual ~StorageEngine() {
        std::cout << "~StorageEngine base destroyed\\n";
    }
};

class MemoryStorage : public StorageEngine {
public:
    void insert_record(int key, const std::string& value) override {
        std::cout << "[MemoryEngine] Insert: " << key << " -> " << value << "\\n";
    }

    void flush() override {
        std::cout << "[MemoryEngine] RAM synced to snapshots.\\n";
    }

    ~MemoryStorage() override {
        std::cout << "~MemoryStorage derived destroyed (RAM freed)\\n";
    }
};

int main() {
    // Dynamic Polymorphism menggunakan Smart Pointer (std::unique_ptr)
    std::unique_ptr<StorageEngine> engine = std::make_unique<MemoryStorage>();
    engine->insert_record(101, "Customer #4928");
    engine->flush();

    // Ketika 'engine' keluar dari scope, virtual destructor memastikan
    // ~MemoryStorage() dipanggil TERLEBIH DAHULU sebelum ~StorageEngine()!
    return 0;
}`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'cpp-lvl-2',
      title: 'Level 2 — Smart Pointers & Move Semantics',
      description: 'std::unique_ptr, std::shared_ptr, std::weak_ptr, rvalue references (&&), dan std::move.',
      modules: [
        {
          id: 'cpp-mod-3',
          title: 'Manajemen Memori Modern Tanpa Raw Delete',
          description: 'Menghilangkan raw pointer delete, memory ownership semantics, dan zero-copy transfers.',
          lessons: [
            {
              id: 'cpp-les-smart-ptr',
              title: 'Smart Pointers: std::unique_ptr vs std::shared_ptr',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Jangan Pernah Menggunakan \`delete\` Manual di Modern C++!

Modern C++ menggantikan raw pointer dengan 3 tipe Smart Pointer yang diatur oleh RAII:

1. **\`std::unique_ptr<T>\`:**
   - Kepemilikan eksklusif (*Exclusive Ownership*).
   - Objek hanya boleh dimiliki oleh 1 pemilik pada satu waktu.
   - **Zero Overhead:** Ukurannya sama persis dengan raw pointer (8 byte) tanpa alokasi counter tambahan.
   - Tidak bisa di-copy, hanya bisa dipindahkan kepemilikannya (*Move Semantics*).

2. **\`std::shared_ptr<T>\`:**
   - Kepemilikan bersama (*Shared Ownership*).
   - Menggunakan alokasi **Control Block** di heap dengan atomic reference counter.
   - Objek dihapus otomatis saat reference counter mencapai \`0\`.

3. **\`std::weak_ptr<T>\`:**
   - Pengamat (*Observer*) tanpa menambah reference count.
   - Mencegah **Cyclic Dependency Leak** (ketika Node A menunjuk Node B dan Node B menunjuk Node A, sehingga refcount tidak pernah menjadi 0).`
                },
                {
                  type: 'code-example',
                  language: 'cpp',
                  code: `#include <iostream>
#include <memory>
#include <vector>

struct ClientSession {
    int session_id;
    ClientSession(int id) : session_id(id) {
        std::cout << "Session " << session_id << " CONNECTED\\n";
    }
    ~ClientSession() {
        std::cout << "Session " << session_id << " DISCONNECTED (Freed)\\n";
    }
};

int main() {
    std::cout << "=== 1. UNIQUE POINTER (Zero-Overhead Ownership) ===\\n";
    {
        auto session1 = std::make_unique<ClientSession>(101);
        // auto session2 = session1; // ERROR KOMPILASI! Tidak boleh dicopy!

        // Pindahkan kepemilikan via std::move
        auto session2 = std::move(session1);
        std::cout << "session1 is now: " << (session1 ? "valid" : "nullptr") << "\\n";
    } // session2 keluar scope -> ~ClientSession(101) otomatis dieksekusi!

    std::cout << "\\n=== 2. SHARED POINTER (Atomic Reference Counting) ===\\n";
    {
        std::shared_ptr<ClientSession> shared_a = std::make_shared<ClientSession>(202);
        std::cout << "Ref Count: " << shared_a.use_count() << "\\n"; // 1

        {
            std::shared_ptr<ClientSession> shared_b = shared_a; // Copy shared_ptr
            std::cout << "Ref Count bertambah: " << shared_a.use_count() << "\\n"; // 2
        } // shared_b keluar scope

        std::cout << "Ref Count setelah shared_b mati: " << shared_a.use_count() << "\\n"; // 1
    } // shared_a keluar scope -> Ref count = 0 -> memori dibebaskan!

    return 0;
}`
                }
              ]
            },
            {
              id: 'cpp-les-move-semantics',
              title: 'Move Semantics & Rvalue References (&&)',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Revolusi Performa C++11: Move Semantics

Sebelum C++11, mengembalikan vector berisi 1.000.000 data dari fungsi akan menyalin (*deep copy*) seluruh array byte di heap ke variabel penampung baru.

Dengan **Move Semantics**:
- Objek sumber dianggap sebagai **rvalue** (nilai sementara yang akan segera dihancurkan).
- Objek tujuan cukup **"mencuri" pointer memori internal** dari objek sumber dalam waktu O(1) konstan (hanya menyalin pointer 8 byte) dan menyetel pointer sumber ke \`nullptr\`.

\`\`\`
Copy Semantics (Mahal):
Source: [0x5000: Data 1GB] ──(Deep Copy 1GB RAM)──> Target: [0x9000: Data 1GB]

Move Semantics (Instan O(1)):
Source: [0x5000: Data 1GB]
Target mengambil alih alamat 0x5000:
Target: [0x5000: Data 1GB], Source disetel ke: [nullptr]
\`\`\``
                },
                {
                  type: 'code-example',
                  language: 'cpp',
                  code: `#include <iostream>
#include <vector>
#include <string>
#include <utility>

class PacketBuffer {
public:
    std::string name;
    std::vector<uint8_t> payload;

    PacketBuffer(std::string n, size_t bytes) : name(std::move(n)), payload(bytes, 0xAA) {
        std::cout << "[Alloc] Buffer " << name << " dibuat (" << payload.size() << " bytes)\\n";
    }

    // Move Constructor: Mencuri payload tanpa menyalin ulang vector
    PacketBuffer(PacketBuffer&& other) noexcept 
        : name(std::move(other.name)), payload(std::move(other.payload)) {
        std::cout << "[MOVE] Payload dipindahkan dalam 0.0001 ms!\\n";
    }
};

int main() {
    PacketBuffer buf1("Network_Stream", 1000000); // 1 MB buffer

    // std::move meng-cast buf1 menjadi rvalue
    PacketBuffer buf2 = std::move(buf1);

    std::cout << "Ukuran payload buf2: " << buf2.payload.size() << " bytes\\n";
    std::cout << "Ukuran payload buf1 setelah di-move: " << buf1.payload.size() << " bytes (kosong)\\n";

    return 0;
}`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'cpp-lvl-3',
      title: 'Level 3 — Standard Template Library (STL) & Multithreading',
      description: 'STL Container complexity, std::unordered_map hashing, std::thread, std::mutex, dan std::lock_guard.',
      modules: [
        {
          id: 'cpp-mod-4',
          title: 'Konkurensi Modern & Thread Safety',
          description: 'Pemrograman paralel, sinkronisasi thread, dan race condition prevention.',
          lessons: [
            {
              id: 'cpp-les-concurrency',
              title: 'Multithreading dengan std::thread, std::mutex & std::lock_guard',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Menulis Kode Multi-Core yang Thread-Safe

Di era CPU multi-core, aplikasi server dan game engine menjalankan tugas berat di background worker thread.

#### Bahaya Race Condition:
Jika dua thread mengubah satu variabel global bersamaan tanpa sinkronisasi, CPU cache coherency akan rusak, menyebabkan data hilang atau crash (*Data Race*).

#### Solusi RAII Mutex:
Gunakan \`std::mutex\` yang dibungkus oleh **\`std::lock_guard<std::mutex>\`**. Lock guard mengunci mutex di constructor dan **otomatis membuka kunci saat keluar dari blok**, bahkan jika terjadi exception!`
                },
                {
                  type: 'code-example',
                  language: 'cpp',
                  code: `#include <iostream>
#include <thread>
#include <vector>
#include <mutex>
#include <atomic>

std::mutex g_cout_mutex;
std::atomic<long> g_processed_records{0}; // Atomic hardware register tanpa lock

void process_batch(int worker_id, int count) {
    for (int i = 0; i < count; ++i) {
        g_processed_records.fetch_add(1, std::memory_order_relaxed);
    }

    // Gunakan lock_guard untuk proteksi akses I/O konsol
    {
        std::lock_guard<std::mutex> lock(g_cout_mutex);
        std::cout << "[Worker " << worker_id << "] Selesai memproses " << count << " batch.\\n";
    }
}

int main() {
    std::vector<std::thread> workers;
    int worker_count = 4;
    int batch_per_worker = 250000;

    for (int i = 0; i < worker_count; ++i) {
        workers.emplace_back(process_batch, i + 1, batch_per_worker);
    }

    // Tunggu semua thread selesai dieksekusi (join)
    for (auto& t : workers) {
        if (t.joinable()) {
            t.join();
        }
    }

    std::cout << "Total Records Terproses: " << g_processed_records.load() << "\\n";
    return 0;
}`
                }
              ]
            },
            {
              id: 'cpp-les-quiz-final',
              title: 'Kuis Evaluasi C++ Modern & Systems',
              type: 'quiz',
              xpReward: 35,
              questions: [
                {
                  id: 'cpp-fin-1',
                  question: 'Mengapa std::make_unique<T>() lebih direkomendasikan daripada std::unique_ptr<T>(new T())?',
                  options: [
                    'Mencegah kemungkinan memory leak jika terjadi exception sebelum objek selesai dikonstruksi serta lebih ekspresif',
                    'Mengubah alokasi memori dari heap menjadi stack',
                    'Membuat unique pointer bisa di-copy ke banyak thread',
                    'Otomatis mengaktifkan enkripsi memory'
                  ],
                  correctAnswerIndex: 0,
                  explanation: '`std::make_unique` menyediakan exception safety dan menghindari pemanggilan operator `new` eksplisit di kode modern.'
                },
                {
                  id: 'cpp-fin-2',
                  question: 'Apa peran std::weak_ptr dalam ekosistem Smart Pointer C++?',
                  options: [
                    'Mengalokasikan memori yang ukurannya lebih kecil daripada pointer biasa',
                    'Memantau objek std::shared_ptr tanpa menaikkan reference count untuk memutus siklus saling-referensi (Cyclic Dependency)',
                    'Menghapus objek secara instan saat deklarasi',
                    'Hanya bisa digunakan di arsitektur 32-bit'
                  ],
                  correctAnswerIndex: 1,
                  explanation: '`std::weak_ptr` tidak menambah reference counter pada control block, sehingga mencegah memory leak akibat cyclic reference antar objek.'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
