import { Course } from '../types';

export const GOLANG_COURSE: Course = {
  id: 'golang-mastery',
  title: 'Go (Golang) & Cloud Concurrency Engineering',
  shortDescription: 'Bangun backend microservices super cepat: arsitektur Goroutine, Channels, Worker Pools, context cancellation, dan server net/http produksi.',
  description: 'Go diciptakan oleh Google (Robert Griesemer, Rob Pike, Ken Thompson) untuk menjawab tantangan skalabilitas komputasi cloud terdistribusi. Go menggerakkan infrastruktur modern dunia seperti Docker, Kubernetes, Terraform, Prometheus, dan CockroachDB. Pelajari model konkurensi CSP (*Communicating Sequential Processes*), sinkronisasi data tanpa lock contention, dan HTTP microservices produksi.',
  icon: 'zap',
  levels: [
    {
      id: 'go-lvl-0',
      title: 'Level 0 — Fondasi Idiomatik & Alokasi Memori Go',
      description: 'Single binary compilation, explicit error handling, defer LIFO, slices internals, dan escape analysis.',
      modules: [
        {
          id: 'go-mod-1',
          title: 'Filosofi Desain Go & Tipe Data Lanjutan',
          description: 'Package main, slices capacity/length, multiple returns, dan explicit error flow.',
          lessons: [
            {
              id: 'go-les-1',
              title: 'Anatomi Go, Explicit Errors & Slices Internals',
              type: 'learn',
              xpReward: 25,
              content: [
                {
                  type: 'markdown',
                  content: `### Mengapa Go Sangat Digemari di Infrastruktur Cloud?

Go sengaja dirancang **minimalis dan pragmatis**: tidak ada pewarisan class yang rumit (*no inheritance*), tidak ada ternary operator, dan **tidak ada exception (\`try/catch\`)**.

#### 1. Explicit Error Handling:
Alih-alih melempar exception tak terduga yang bisa merusak call stack di runtime, fungsi Go selalu mengembalikan nilai error sebagai warga negara kelas satu (*first-class citizen*):
\`\`\`go
data, err := fetchUserData(userID)
if err != nil {
    log.Printf("Gagal membaca user: %v", err)
    return err
}
\`\`\`

#### 2. Anatomi Internal Slice di Go (Header 24-byte):
Slice bukan array statis, melainkan sebuah struct internal kecil:
\`\`\`
Slice Header (24 bytes pada sistem 64-bit):
┌────────────────┬──────────────┬──────────────┐
│ Data Pointer   │ Length (len) │ Capacity     │
│ (8 bytes RAM)  │ (8 bytes)    │ (cap - 8 B)  │
└────────────────┴──────────────┴──────────────┘
        │
        ▼ Menunjuk ke backing array di heap/stack
[ elem0 | elem1 | elem2 | ... ]
\`\`\`
Ketika slice melewati kapasitas (*capacity*), Go mengalokasikan backing array baru dengan ukuran 2x lipat dan menyalin isinya.`
                },
                {
                  type: 'code-example',
                  language: 'go',
                  code: `package main

import (
	"errors"
	"fmt"
)

// Sentinel error untuk domain logic
var ErrUserNotFound = errors.New("entitas user tidak ditemukan di database")

type UserRecord struct {
	ID    int64
	Email string
	Tier  string
}

func queryUser(id int64) (*UserRecord, error) {
	if id <= 0 {
		return nil, errors.New("ID user harus lebih besar dari 0")
	}
	if id == 404 {
		return nil, ErrUserNotFound
	}
	return &UserRecord{ID: id, Email: "admin@commandev.dev", Tier: "Enterprise"}, nil
}

func main() {
	// Demonstrasi Slices Internals: Length vs Capacity
	metrics := make([]int, 0, 4) // len: 0, cap: 4
	fmt.Printf("Init  -> len: %d, cap: %d\\n", len(metrics), cap(metrics))

	for i := 1; i <= 5; i++ {
		metrics = append(metrics, i*10)
		fmt.Printf("Step %d -> len: %d, cap: %d\\n", i, len(metrics), cap(metrics))
	}

	// Explicit error handling
	user, err := queryUser(10)
	if err != nil {
		if errors.Is(err, ErrUserNotFound) {
			fmt.Println("Peringatan: User tidak ada.")
			return
		}
		fmt.Printf("Database Error: %v\\n", err)
		return
	}

	fmt.Printf("User Terverifikasi: %s (%s)\\n", user.Email, user.Tier)
}`
                }
              ]
            },
            {
              id: 'go-les-quiz-1',
              title: 'Kuis Fondasi & Slice Go',
              type: 'quiz',
              xpReward: 30,
              questions: [
                {
                  id: 'gq-1',
                  question: 'Tiga komponen apa yang menyusun sebuah Slice Header di arsitektur internal runtime Go?',
                  options: [
                    'Pointer ke backing array, Length, dan Capacity',
                    'Hash key, Value bucket, dan Size',
                    'Class metadata, Method table, dan Garbage collector mark',
                    'File descriptor, Inode, dan Permissions'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Slice di Go direpresentasikan oleh struct 24-byte yang terdiri dari: Pointer penunjuk elemen memori, nilai Length (`len`), dan nilai Capacity (`cap`).'
                },
                {
                  id: 'gq-2',
                  question: 'Kapan baris kode yang diawali kata kunci `defer` dieksekusi di Go?',
                  options: [
                    'Seketika baris tersebut dibaca compiler',
                    'Tepat sebelum fungsi pembungkusnya selesai kembali (return), dalam urutan LIFO (Last-In-First-Out)',
                    'Hanya jika terjadi error fatal (panic)',
                    'Di thread latar belakang secara acak'
                  ],
                  correctAnswerIndex: 1,
                  explanation: '`defer` mendaftarkan fungsi pembersih yang akan dieksekusi tepat sebelum fungsi pembungkus selesai, dengan urutan tumpukan LIFO.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'go-lvl-1',
      title: 'Level 1 — Structs, Interfaces & Composition over Inheritance',
      description: 'Value vs pointer receivers, struct embedding, implicit interface implementation, dan error wrapping.',
      modules: [
        {
          id: 'go-mod-2',
          title: 'Polimorfisme & Implicit Interfaces',
          description: 'Duck typing statis di Go tanpa deklarasi "implements".',
          lessons: [
            {
              id: 'go-les-interfaces',
              title: 'Implicit Interfaces & Composition over Inheritance',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### Mengapa Go Tidak Memiliki Kata Kunci "implements"?

Di bahasa lain (Java, PHP, TypeScript), sebuah class harus mendeklarasikan \`class Service implements Notifier\`.

**Di Go, interface diimplementasikan secara implisit (*Structural Typing / Duck Typing*):**
> *"Jika ia berjalan seperti bebek dan bersuara seperti bebek, maka ia adalah bebek."*

Jika sebuah struct memiliki sekumpulan method yang sesuai dengan definisi sebuah interface, maka struct tersebut **secara otomatis telah memenuhi interface tersebut** tanpa perlu menyentuh kode struct aslinya!

#### Pointer vs Value Receivers:
- \`func (u User) Name() string\`: Menerima salinan (*copy*) data. Cocok untuk struct kecil yang *read-only*.
- \`func (u *User) SetEmail(email string)\`: Menerima pointer langsung ke struct. **Wajib jika method memodifikasi isi struct** atau struct berukuran besar.`
                },
                {
                  type: 'code-example',
                  language: 'go',
                  code: `package main

import (
	"fmt"
	"time"
)

// 1. Definisi Interface
type PaymentGateway interface {
	Charge(amountIDR int64) (transactionID string, err error)
}

// 2. Struct Gateway Midtrans
type MidtransProvider struct {
	ServerKey string
}

// Mengimplementasikan interface PaymentGateway secara implisit
func (m *MidtransProvider) Charge(amountIDR int64) (string, error) {
	fmt.Printf("[Midtrans] Memproses transfer Rp %d dengan server key: %s...\\n", amountIDR, m.ServerKey[:4]+"****")
	return fmt.Sprintf("TRX-MDT-%d", time.Now().Unix()), nil
}

// 3. High-Level Checkout Service (Dependency Injection)
type OrderService struct {
	gateway PaymentGateway // Bergantung pada interface, bukan implementasi konkret!
}

func (s *OrderService) CompleteOrder(orderID string, price int64) {
	trxID, err := s.gateway.Charge(price)
	if err != nil {
		fmt.Printf("Gagal checkout order %s: %v\\n", orderID, err)
		return
	}
	fmt.Printf("Order %s LUNAS! Nomor Transaksi: %s\\n", orderID, trxID)
}

func main() {
	midtrans := &MidtransProvider{ServerKey: "SB-Mid-server-8291823901"}
	checkoutApp := &OrderService{gateway: midtrans}

	checkoutApp.CompleteOrder("INV-2026-001", 350000)
}`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'go-lvl-2',
      title: 'Level 2 — Concurrency CSP: Goroutines, Channels & Worker Pools',
      description: 'Goroutines scheduler (M:N), buffered channels, select timeout, sync.WaitGroup, sync.Mutex, dan Worker Pools.',
      modules: [
        {
          id: 'go-mod-3',
          title: 'Konkurensi Skala Tinggi & Worker Pools',
          description: 'Memproses jutaan task dengan overhead minimal dan tanpa race conditions.',
          lessons: [
            {
              id: 'go-les-concurrency-deep',
              title: 'Goroutines (~2KB Stack) & Channel Communication',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Mengapa Goroutine Jauh Lebih Efisien daripada OS Thread?

- **OS Thread:** Mengalokasikan 1 MB hingga 8 MB stack memori tetap. Mengganti thread (*context switch*) membutuhkan trap kernel CPU yang memakan ratusan siklus CPU.
- **Goroutine:** Dimulai hanya dengan **~2 KB stack memori** yang bisa bertumbuh dinamis. Go Runtime memiliki scheduler sendiri (**GMP Model**: Goroutine, Machine, Processor) yang melakukan context switch sepenuhnya di *userspace*!

\`\`\`
Pola Komunikasi CSP (Rob Pike):
"Jangan berkomunikasi dengan berbagi memori (shared memory);
 bagikanlah memori dengan cara berkomunikasi (channels)."
\`\`\`

#### 4 Aksi Channel Penting:
1. Menulis ke unbuffered channel akan **memblokir** sampai ada goroutine lain yang membaca.
2. Membaca dari unbuffered channel akan **memblokir** sampai ada goroutine lain yang menulis.
3. Menulis ke channel yang sudah di-\`close()\` akan memicu **panic**.
4. Membaca dari channel tertutup akan menghasilkan zero-value dan \`ok = false\`.`
                },
                {
                  type: 'code-example',
                  language: 'go',
                  code: `package main

import (
	"fmt"
	"sync"
	"time"
)

// Job Payload
type Job struct {
	ID    int
	Email string
}

// Worker Pool Pattern di Go
func emailWorker(id int, jobs <-chan Job, results chan<- string, wg *sync.WaitGroup) {
	defer wg.Done()

	for job := range jobs {
		// Simulasi pengiriman email
		time.Sleep(10 * time.Millisecond)
		results <- fmt.Sprintf("[Worker %d] Email sukses terkirim ke: %s (Job #%d)", id, job.Email, job.ID)
	}
}

func main() {
	const numJobs = 10
	const numWorkers = 3

	jobs := make(chan Job, numJobs)
	results := make(chan string, numJobs)
	var wg sync.WaitGroup

	// Menyalakan 3 worker goroutines
	for w := 1; w <= numWorkers; w++ {
		wg.Add(1)
		go emailWorker(w, jobs, results, &wg)
	}

	// Mengirim tugas ke antrean channel
	for j := 1; j <= numJobs; j++ {
		jobs <- Job{ID: j, Email: fmt.Sprintf("user%d@company.com", j)}
	}
	close(jobs) // Beritahu worker bahwa tidak ada lagi job baru

	// Tunggu semua worker selesai di goroutine terpisah
	go func() {
		wg.Wait()
		close(results)
	}()

	// Baca hasil pengiriman
	for res := range results {
		fmt.Println(res)
	}
}`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'go-lvl-3',
      title: 'Level 3 — Context Cancellation & Production HTTP Microservices',
      description: 'context.WithTimeout, graceful shutdown, structured JSON middleware, dan routing HTTP.',
      modules: [
        {
          id: 'go-mod-4',
          title: 'Microservices & Graceful Server Shutdown',
          description: 'Membangun HTTP API tangguh dengan batasan timeout dan sinyal OS SIGTERM.',
          lessons: [
            {
              id: 'go-les-server-prod',
              title: 'Production HTTP Server dengan Middleware & Graceful Shutdown',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Mengapa Graceful Shutdown Sangat Vital di Lingkungan Kubernetes / Docker?

Ketika deployment baru diluncurkan di Kubernetes, Pod lama akan menerima sinyal **SIGTERM**.
Jika server langsung mati mendadak, request HTTP dari user yang sedang melakukan pembayaran atau update database akan putus di tengah jalan (*502 Bad Gateway / Inconsistent Data*).

#### Pola Graceful Shutdown:
1. Tangkap sinyal \`os.Interrupt\` atau \`syscall.SIGTERM\`.
2. Hentikan penerimaan request HTTP baru.
3. Berikan waktu tenggang (misal 5 detik via \`context.WithTimeout\`) agar request yang sedang berjalan selesai diproses secara tuntas.
4. Tutup koneksi database dan keluar dengan kode 0.`
                },
                {
                  type: 'code-example',
                  language: 'go',
                  code: `package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

type HealthResponse struct {
	Status    string    ` + "`json:\"status\"`" + `
	Timestamp time.Time ` + "`json:\"timestamp\"`" + `
	Version   string    ` + "`json:\"version\"`" + `
}

// Middleware Logging
func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next.ServeHTTP(w, r)
		fmt.Printf("[%s] %s %s - Selesai dalam %v\\n", time.Now().Format("15:04:05"), r.Method, r.URL.Path, time.Since(start))
	})
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	res := HealthResponse{
		Status:    "UP",
		Timestamp: time.Now(),
		Version:   "v2.4.1",
	}
	json.NewEncoder(w).Encode(res)
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/v1/health", healthHandler)

	server := &http.Server{
		Addr:         ":8080",
		Handler:      loggingMiddleware(mux),
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	// Jalankan server di goroutine independen
	go func() {
		fmt.Println("Backend Microservice running on http://localhost:8080")
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			fmt.Printf("Server crash: %v\\n", err)
		}
	}()

	// Channel untuk mendengarkan sinyal OS SIGINT / SIGTERM
	stopChan := make(chan os.Signal, 1)
	signal.Notify(stopChan, os.Interrupt, syscall.SIGTERM)

	<-stopChan // Blokir sampai sinyal penghentian diterima
	fmt.Println("\\nSinyal shutdown diterima! Memulai Graceful Drain...")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := server.Shutdown(ctx); err != nil {
		fmt.Printf("Force shutdown karena timeout: %v\\n", err)
	} else {
		fmt.Println("Server berhasil dihentikan secara bersih tanpa data loss!")
	}
}`
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
