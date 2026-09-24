import { Course } from '../types';

export const C_COURSE: Course = {
  id: 'c-mastery',
  title: 'C Programming & Low-Level Systems',
  shortDescription: 'Pahami cara kerja komputer dari akarnya: memori RAM, pointer arithmetic, alokasi heap manual (malloc/free), structs alignment, dan kompilasi GCC.',
  description: 'Bahasa C adalah fondasi dari sistem operasi (Linux, Windows, macOS), database engine (PostgreSQL, MySQL, SQLite), dan browser engine modern (V8, WebKit). Mempelajari C membuka pemahaman fundamental tentang arsitektur memori Von Neumann, cache lines, pointer arithmetic, dan rekayasa perangkat lunak ultra-cepat tanpa perantara runtime.',
  icon: 'terminal',
  levels: [
    {
      id: 'c-lvl-0',
      title: 'Level 0 — Fondasi Arsitektur C & Pipeline Kompilasi',
      description: 'Sintaks inti C, memori layout (Text/Data/BSS/Stack/Heap), bitwise manipulation, dan 4 tahap kompilasi GCC.',
      modules: [
        {
          id: 'c-mod-1',
          title: 'Arsitektur Program C & Pipeline GCC',
          description: 'Preprocessor, compiler, assembler, linker, serta layout memori di sistem operasi.',
          lessons: [
            {
              id: 'c-les-1',
              title: 'Anatomi Program C & 4 Tahap Kompilasi GCC',
              type: 'learn',
              xpReward: 25,
              content: [
                {
                  type: 'markdown',
                  content: `### Mengapa C Menguasai Dunia Rekayasa Sistem?

Bahasa C tidak memiliki *Garbage Collector*, *Virtual Machine*, atau *Runtime Interpreter*. Setiap instruksi C diterjemahkan hampir satu-ke-satu menjadi instruksi mesin arsitektur target (x86_64 atau ARM64).

\`\`\`
Source Code (.c / .h) 
      │
      ▼ [1. Preprocessor - cpp] -> Macro expansion, file inclusion (#include)
Preprocessed Code (.i)
      │
      ▼ [2. Compiler - cc1]     -> Syntax tree, IR optimization, assembly output
Assembly Code (.s)
      │
      ▼ [3. Assembler - as]     -> Machine instructions (OpCodes)
Object File (.o / .obj)
      │
      ▼ [4. Linker - ld]        -> Resolves symbols, links libc & static libs
Executable Binary (a.out / ELF)
\`\`\`

#### Layout Memori Program C di RAM:
1. **Text Segment (Code):** Instruksi mesin biner yang bersifat *read-only* untuk mencegah modifikasi kode saat runtime.
2. **Initialized Data Segment (.data):** Variabel global dan \`static\` yang telah diinisialisasi dengan nilai bukan nol.
3. **Uninitialized Data Segment (.bss):** Variabel global/static tanpa nilai awal (diinisialisasi otomatis ke 0 oleh kernel OS).
4. **Heap Segment:** Alokasi memori dinamis runtime via \`malloc()\` yang tumbuh ke arah alamat memori lebih tinggi (*grow upward*).
5. **Stack Segment:** Alokasi otomatis untuk stack frame fungsi (variabel lokal, return address, register backup) yang tumbuh ke bawah (*grow downward*).`
                },
                {
                  type: 'code-example',
                  language: 'c',
                  code: `#include <stdio.h>
#include <stdint.h>
#include <stdbool.h>

// Berada di Initialized Data Segment (.data)
int global_server_port = 8080;

// Berada di BSS Segment (.bss)
int global_request_counter;

int main(void) {
    // Berada di Stack Frame fungsi main
    int32_t worker_id = 42;
    double cpu_usage_pct = 12.45;
    char environment_flag = 'P'; // Production

    printf("=== SYSTEM RUNTIME METRICS ===\\n");
    printf("Port: %d | Worker: %d | CPU: %.2f%% | Env: %c\\n", 
           global_server_port, worker_id, cpu_usage_pct, environment_flag);

    // Menampilkan alamat memori untuk melihat layout stack vs data
    printf("Address of global_port (.data): %p\\n", (void*)&global_server_port);
    printf("Address of worker_id   (stack): %p\\n", (void*)&worker_id);

    return 0; // POSIX status code 0 = Sukses tanpa error
}`
                }
              ]
            },
            {
              id: 'c-les-bitwise',
              title: 'Operasi Bitwise & Hardware Bitmasks',
              type: 'learn',
              xpReward: 30,
              content: [
                {
                  type: 'markdown',
                  content: `### Mengapa Bitwise Esensial di Pemrograman Sistem?

Di sistem operasi, driver perangkat keras, dan protokol jaringan (TCP/IP), status sistem tidak disimpan dalam boolean terpisah (yang memboroskan 1 byte per nilai), melainkan dipadatkan ke dalam bit individual pada satu integer (*Bitmask*).

| Operator | Operasi | Contoh |
| :--- | :--- | :--- |
| \`&\` | AND (Pengecekan bit) | \`state & FLAG_READ\` |
| \`|\` | OR (Mengaktifkan bit) | \`state |= FLAG_WRITE\` |
| \`^\` | XOR (Toggle bit) | \`state ^= FLAG_EXEC\` |
| \`~\` | NOT (Invert bit) | \`state &= ~FLAG_WRITE\` (Mematikan bit) |
| \`<<\` | Left Shift (Kali 2^n) | \`1 << 3\` = 8 (bit ke-3 bernilai 1) |
| \`>>\` | Right Shift (Bagi 2^n) | \`16 >> 2\` = 4 |`
                },
                {
                  type: 'code-example',
                  language: 'c',
                  code: `#include <stdio.h>

// Definisi izin POSIX via Bit Flags
#define PERM_READ    (1 << 0) // 0001 (1)
#define PERM_WRITE   (1 << 1) // 0010 (2)
#define PERM_EXEC    (1 << 2) // 0100 (4)
#define PERM_ADMIN   (1 << 3) // 1000 (8)

int main(void) {
    unsigned char user_perms = 0;

    // 1. Berikan hak READ dan WRITE
    user_perms |= (PERM_READ | PERM_WRITE);
    printf("Permissions: 0x%02X\\n", user_perms); // 0x03

    // 2. Periksa apakah user memiliki hak EXECUTE
    if (user_perms & PERM_EXEC) {
        printf("Status: Boleh menjalankan binary!\\n");
    } else {
        printf("Status: AKSES EXECUTE DITOLAK!\\n");
    }

    // 3. Cabut hak WRITE menggunakan bitwise NOT dan AND
    user_perms &= ~PERM_WRITE;

    printf("Setelah WRITE dicabut: 0x%02X\\n", user_perms); // 0x01 (READ only)
    return 0;
}`
                }
              ]
            },
            {
              id: 'c-les-quiz-1',
              title: 'Kuis Fondasi C, Memori & Bitwise',
              type: 'quiz',
              xpReward: 30,
              questions: [
                {
                  id: 'cq-1',
                  question: 'Segment memori mana di RAM yang menampung variabel lokal fungsi dan bertumbuh ke bawah (ke alamat memori yang lebih rendah)?',
                  options: ['Heap Segment', 'Stack Segment', 'BSS Segment', 'Text Segment'],
                  correctAnswerIndex: 1,
                  explanation: 'Stack Segment menampung stack frame (variabel lokal, argumen fungsi, return address) dan bertumbuh dari alamat tinggi ke rendah.'
                },
                {
                  id: 'cq-2',
                  question: 'Bagaimana idiom C standar untuk mematikan (clear) bit tertentu pada suatu variabel flag tanpa mengganggu bit lainnya?',
                  options: [
                    'flag = flag | ~MASK;',
                    'flag = flag ^ MASK;',
                    'flag &= ~MASK;',
                    'flag |= MASK;'
                  ],
                  correctAnswerIndex: 2,
                  explanation: '`flag &= ~MASK` menginversi mask dengan bitwise NOT (`~`), lalu melakukan bitwise AND (`&`), sehingga bit target menjadi 0 sementara bit lain tetap utuh.'
                },
                {
                  id: 'cq-3',
                  question: 'Apa peran Linker (ld) dalam pipeline kompilasi GCC?',
                  options: [
                    'Mengubah file .c menjadi kode assembly .s',
                    'Menggabungkan object file (.o) dengan library sistem (seperti libc) menjadi satu binary executable utuh',
                    'Menghapus baris komentar dan memperluas makro #define',
                    'Menjalankan program di sandbox virtual'
                  ],
                  correctAnswerIndex: 1,
                  explanation: 'Linker bertanggung jawab menyelesaikan referensi simbol antar-file modul dan library pihak ketiga/standar menghasilkan binary biner yang siap dieksekusi oleh OS kernel.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'c-lvl-1',
      title: 'Level 1 — Pointers, Structs Alignment & Direct Memory Access',
      description: 'Pointer arithmetic, dereferencing, struct padding CPU, double pointers, dan function pointers.',
      modules: [
        {
          id: 'c-mod-2',
          title: 'Pointer & Direct Memory Access',
          description: 'Manipulasi alamat RAM, pointer math, array decay, dan optimasi CPU cache.',
          lessons: [
            {
              id: 'c-les-2',
              title: 'Pointer, Dereferencing & Pointer Arithmetic',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### Apa Hakikat Pointer di Arsitektur CPU?

Pointer bukan sekadar tipe data abstrak; pointer adalah **register 64-bit** (pada arsitektur modern x86_64/ARM64) yang berisi integer representasi **alamat fisik/virtual bus memori RAM**.

#### Aturan Emas Pointer Arithmetic:
Ketika kamu menambahkan \`1\` ke sebuah pointer (\`ptr + 1\`), alamat memori tidak bertambah 1 byte, melainkan bertambah sebesar **\`sizeof(*ptr)\` byte**!

\`\`\`
int arr[3] = {10, 20, 30}; // Misalkan alamat arr = 0x1000 (ukuran int = 4 byte)

ptr      -> 0x1000 (arr[0] = 10)
ptr + 1  -> 0x1004 (arr[1] = 20)  [0x1000 + (1 * 4)]
ptr + 2  -> 0x1008 (arr[2] = 30)  [0x1000 + (2 * 4)]
\`\`\``
                },
                {
                  type: 'code-example',
                  language: 'c',
                  code: `#include <stdio.h>

void compute_stats(const int *data, size_t length, int *out_min, int *out_max, double *out_avg) {
    if (length == 0) return;

    *out_min = *data;
    *out_max = *data;
    long sum = 0;

    // Menjelajahi array menggunakan Pointer Arithmetic
    const int *curr = data;
    const int *end = data + length;

    while (curr < end) {
        if (*curr < *out_min) *out_min = *curr;
        if (*curr > *out_max) *out_max = *curr;
        sum += *curr;
        curr++; // Maju sizeof(int) = 4 byte ke elemen berikutnya
    }

    *out_avg = (double)sum / length;
}

int main(void) {
    int sensor_readings[] = {24, 28, 19, 32, 27, 21, 30};
    size_t count = sizeof(sensor_readings) / sizeof(sensor_readings[0]);

    int min_val, max_val;
    double avg_val;

    compute_stats(sensor_readings, count, &min_val, &max_val, &avg_val);

    printf("Min: %d | Max: %d | Avg: %.2f\\n", min_val, max_val, avg_val);
    return 0;
}`
                }
              ]
            },
            {
              id: 'c-les-structs-padding',
              title: 'Structs, Memory Alignment & CPU Padding',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### Mengapa Ukuran Struct Tidak Selalu Sama dengan Jumlah Variabelnya?

CPU modern tidak membaca memori per 1 byte sembarangan, melainkan membaca dalam blok teratur (umumnya **word size 4 byte atau 8 byte**) agar transfer bus memori optimal.

Proses meletakkan padding byte kosong di antara variabel disebut **Memory Alignment / Struct Padding**.

\`\`\`
// Buruk (12 Byte karena padding):
struct BadPacket {
    char a;      // 1 byte
    // [3 byte PADDING kosong oleh compiler]
    int b;       // 4 byte (wajib kelipatan 4)
    char c;      // 1 byte
    // [3 byte PADDING di akhir]
}; // Total: 12 byte!

// Optimal (8 Byte, hemat 33% RAM):
struct GoodPacket {
    int b;       // 4 byte
    char a;      // 1 byte
    char c;      // 1 byte
    // [2 byte padding akhir]
}; // Total: 8 byte!
\`\`\``
                },
                {
                  type: 'code-example',
                  language: 'c',
                  code: `#include <stdio.h>
#include <stddef.h>

struct Unordered {
    char flag;      // 1 byte
    double value;   // 8 byte
    short count;    // 2 byte
};

struct Optimized {
    double value;   // 8 byte
    short count;    // 2 byte
    char flag;      // 1 byte
    // 5 byte tail padding agar total kelipatan 8
};

int main(void) {
    printf("Ukuran Unordered : %zu byte\\n", sizeof(struct Unordered)); // Biasanya 24 byte
    printf("Ukuran Optimized : %zu byte\\n", sizeof(struct Optimized)); // 16 byte

    printf("Offset value di Optimized: %zu\\n", offsetof(struct Optimized, value)); // 0
    printf("Offset count di Optimized: %zu\\n", offsetof(struct Optimized, count)); // 8
    printf("Offset flag  di Optimized: %zu\\n", offsetof(struct Optimized, flag));  // 10

    return 0;
}`
                }
              ]
            },
            {
              id: 'c-les-func-ptr',
              title: 'Function Pointers & Callback Pattern di C',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Function Pointer: Fondasi Arsitektur Event-Driven di C

Di bahasa C, fungsi juga menempati alamat memori di dalam *Text Segment*. Kita dapat menyimpan alamat fungsi di dalam variabel yang disebut **Function Pointer**.

Pola ini digunakan oleh:
1. **Linux Kernel Driver:** Struct \`file_operations\` dengan function pointer \`.read\`, \`.write\`, \`.open\`.
2. **qsort() Standar C Library:** Menerima fungsi komparator sebagai callback.
3. **Simulasi OOP di C:** Membuat *Virtual Method Table (vtable)* manual.`
                },
                {
                  type: 'code-example',
                  language: 'c',
                  code: `#include <stdio.h>
#include <stdlib.h>

// Definisi tipe function pointer untuk transformer data
typedef int (*TransformFunc)(int);

int square(int x) { return x * x; }
int double_val(int x) { return x * 2; }

// Fungsi tingkat tinggi (Higher-Order Function) di C murni
void map_array(int *arr, size_t len, TransformFunc fn) {
    for (size_t i = 0; i < len; i++) {
        arr[i] = fn(arr[i]); // Mengeksekusi callback melalui pointer
    }
}

int main(void) {
    int dataset[] = {1, 2, 3, 4, 5};
    size_t count = sizeof(dataset) / sizeof(dataset[0]);

    // Aplikasikan fungsi square ke seluruh elemen
    map_array(dataset, count, square);

    printf("Hasil setelah kuadrat: ");
    for (size_t i = 0; i < count; i++) {
        printf("%d ", dataset[i]); // 1 4 9 16 25
    }
    printf("\\n");

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
      id: 'c-lvl-2',
      title: 'Level 2 — Alokasi Memori Dinamis & Defensive Systems Programming',
      description: 'malloc, calloc, realloc, free, Valgrind, AddressSanitizer, dan implementasi custom buffer dinamis.',
      modules: [
        {
          id: 'c-mod-3',
          title: 'Manual Memory Management & Sanitizers',
          description: 'Manajemen memori Heap tanpa memory leaks dan debugging segfault.',
          lessons: [
            {
              id: 'c-les-3',
              title: 'malloc, realloc, free & Bahaya Dangling Pointer',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Manajemen Memori Heap: Kekuatan & Bahaya Fatal

Fungsi keluarga \`stdlib.h\`:
- \`malloc(size)\`: Mengalokasikan blok byte mentah tanpa inisialisasi (berisi *garbage data*).
- \`calloc(num, size)\`: Mengalokasikan memori dan membersihkan semua byte menjadi nol (\`0\`).
- \`realloc(ptr, new_size)\`: Mengubah ukuran blok memori yang ada (bisa memperluas di tempat atau memindahkan ke alamat baru).
- \`free(ptr)\`: Mengembalikan blok memori ke kernel/allocator sistem.

#### 3 Kesalahan Memori Paling Mematikan di Industri:
1. **Memory Leak:** Mengalokasikan memori tapi lupa memanggil \`free()\`. Server akan kehabisan RAM seiring waktu.
2. **Dangling Pointer:** Membaca atau menulis ke pointer yang sudah dibebaskan (\`Use-After-Free\`).
3. **Double Free:** Memanggil \`free()\` dua kali pada pointer yang sama, menyebabkan korupsi heap allocator.`
                },
                {
                  type: 'code-example',
                  language: 'c',
                  code: `#include <stdio.h>
#include <stdlib.h>

// Definisi Struktur Dynamic Vector Sederhana
typedef struct {
    int *data;
    size_t size;
    size_t capacity;
} IntVector;

IntVector* vector_create(size_t initial_cap) {
    IntVector *vec = (IntVector *)malloc(sizeof(IntVector));
    if (!vec) return NULL;

    vec->data = (int *)malloc(initial_cap * sizeof(int));
    if (!vec->data) {
        free(vec);
        return NULL;
    }

    vec->size = 0;
    vec->capacity = initial_cap;
    return vec;
}

void vector_push(IntVector *vec, int value) {
    if (vec->size == vec->capacity) {
        // Gandakan kapasitas jika penuh
        size_t new_cap = vec->capacity * 2;
        int *new_data = (int *)realloc(vec->data, new_cap * sizeof(int));
        if (!new_data) {
            fprintf(stderr, "FATAL: Realloc gagal karena kehabisan RAM!\\n");
            return;
        }
        vec->data = new_data;
        vec->capacity = new_cap;
    }
    vec->data[vec->size++] = value;
}

void vector_destroy(IntVector **vec_ptr) {
    if (!vec_ptr || !*vec_ptr) return;
    free((*vec_ptr)->data);
    free(*vec_ptr);
    *vec_ptr = NULL; // Mencegah dangling pointer
}

int main(void) {
    IntVector *my_vec = vector_create(2);
    vector_push(my_vec, 100);
    vector_push(my_vec, 200);
    vector_push(my_vec, 300); // Memicu realloc otomatis

    printf("Vector Size: %zu | Capacity: %zu\\n", my_vec->size, my_vec->capacity);
    for (size_t i = 0; i < my_vec->size; i++) {
        printf("Element [%zu] = %d\\n", i, my_vec->data[i]);
    }

    // Bersihkan memori secara aman
    vector_destroy(&my_vec);
    return 0;
}`
                }
              ]
            },
            {
              id: 'c-les-defensive',
              title: 'Defensive Systems: Valgrind & AddressSanitizer',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### Bagaimana Perusahaan Kelas Dunia Menjamin Keamanan C?

Developer kelas dunia tidak lagi mengandalkan insting manual untuk mendeteksi memory bug. Mereka menggunakan alat otomatis:

#### 1. AddressSanitizer (ASan):
Kompilasi dengan flag:
\`\`\`bash
gcc -fsanitize=address -g -O1 main.c -o main
./main
\`\`\`
Jika kode kamu melakukan *out-of-bounds read/write*, *heap-buffer-overflow*, atau *use-after-free*, program akan langsung crash seketika dan mencetak call stack baris kode penyebabnya secara presisi!

#### 2. Valgrind Memcheck:
\`\`\`bash
valgrind --leak-check=full --show-leak-kinds=all ./main
\`\`\`
Menganalisis binary tanpa recompilation khusus untuk menemukan kebocoran memori (\`definitely lost bytes\`).`
                }
              ]
            },
            {
              id: 'c-les-quiz-advanced',
              title: 'Kuis Evaluasi Sistem Memori C',
              type: 'quiz',
              xpReward: 30,
              questions: [
                {
                  id: 'c-adv-q1',
                  question: 'Apa perbedaan mendasar antara fungsi alokasi malloc() dan calloc()?',
                  options: [
                    'malloc mengalokasikan di stack, calloc mengalokasikan di heap',
                    'calloc mengalokasikan memori dan menginisialisasi setiap byte ke nilai 0, sedangkan malloc membiarkan isi byte apa adanya (garbage)',
                    'malloc hanya bisa mengalokasikan hingga 1KB memori',
                    'calloc tidak perlu dibebaskan dengan fungsi free()'
                  ],
                  correctAnswerIndex: 1,
                  explanation: '`calloc(n, size)` membersihkan seluruh blok memori menjadi nol bit demi bit, sedangkan `malloc(size)` hanya memesan ruang tanpa inisialisasi.'
                },
                {
                  id: 'c-adv-q2',
                  question: 'Mengapa menyetel pointer bernilai NULL setelah dipanggil free(ptr) adalah praktik defensive programming yang sangat dianjurkan?',
                  options: [
                    'Agar memori dibebaskan lebih cepat oleh sistem operasi',
                    'Mencegah pointer menjadi Dangling Pointer dan memicu crash yang mudah didiagnosis jika pointer tak sengaja diakses kembali',
                    'Karena fungsi free() secara default tidak menghapus data variabel',
                    'Untuk mengizinkan kompilator mengoptimalkan register CPU'
                  ],
                  correctAnswerIndex: 1,
                  explanation: 'Pointer yang sudah di-free tetapi masih menyimpan alamat memori lama disebut Dangling Pointer. Menyetelnya ke NULL mencegah bug Use-After-Free tersembunyi.'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
