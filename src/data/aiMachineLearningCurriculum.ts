import { Course } from '../types';

export const AI_MACHINE_LEARNING_COURSE: Course = {
  id: 'ai-machine-learning',
  title: 'AI & Machine Learning Engineering',
  shortDescription: 'Learn artificial intelligence and machine learning from mathematical foundations and data processing through classical machine learning, deep learning, computer vision, NLP, transformers, generative AI, LLM engineering, RAG, AI agents, deployment, MLOps, security, optimization, and production AI systems.',
  description: 'Kurikulum komprehensif end-to-end yang membawa learner dari dasar matematika, regresi, klasifikasi, neural network, NLP, transformers, LLM engineering, RAG, hingga arsitektur agen AI mandiri dan MLOps produksi.',
  icon: 'cpu',
  levels: [
    {
      id: 'aml-lvl-1',
      title: 'Level 1 — Foundations & Mathematics for AI',
      description: 'Pengenalan AI engineering, arsitektur sistem cerdas, dan fondasi matematika (vektor, matriks, gradien).',
      modules: [
        {
          id: 'ai-machine-learning-m01',
          title: 'Module 1 — Introduction to AI Engineering',
          description: 'AI vs ML vs Deep Learning, generative AI, dan siklus hidup sistem AI.',
          lessons: [
            {
              id: 'aml-l-01-1',
              title: 'Apa itu AI Engineering?',
              type: 'learn',
              xpReward: 30,
              content: [
                {
                  type: 'markdown',
                  content: `### 1. Definisi AI Engineering
AI Engineering adalah disiplin ilmu yang menjembatani riset machine learning dengan rekayasa perangkat lunak produksi. Ini mencakup perancangan model, pengolahan data, orkestrasi LLM, evaluasi, keamanan, dan deployment yang handal.

### 2. Hubungan AI, ML, dan Deep Learning
- **Artificial Intelligence (AI):** Istilah payung untuk membuat mesin meniru kecerdasan manusia.
- **Machine Learning (ML):** Cabang AI di mana komputer belajar dari data tanpa diprogram secara eksplisit.
- **Deep Learning:** Sub-bidang ML menggunakan jaringan saraf tiruan berlapis banyak (*neural networks*) untuk memproses pola kompleks.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `# Konsep dasar pipeline AI inferensi
def ai_inference_pipeline(input_data, model):
    cleaned = preprocess(input_data)
    prediction = model.predict(cleaned)
    validated = apply_guardrails(prediction)
    return validated`
                }
              ]
            },
            {
              id: 'aml-l-01-2',
              title: 'Kuis Module 1 — Introduction to AI Engineering',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'aml-q-01-1',
                  question: 'Apa perbedaan utama antara Artificial Intelligence (AI) dan Machine Learning (ML)?',
                  options: [
                    'ML adalah bagian/sub-bidang dari AI yang fokus pada pembelajaran berbasis data',
                    'AI tidak menggunakan komputer, sedangkan ML menggunakan komputer',
                    'ML lebih tua dibanding AI',
                    'Tidak ada hubungan sama sekali'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Machine Learning adalah pendekatan di dalam AI untuk mencapai kecerdasan melalui pelatihan data.'
                },
                {
                  id: 'aml-q-01-2',
                  question: 'Apa peran utama seorang AI Engineer di industri?',
                  options: [
                    'Mengintegrasikan model AI, data, dan rekayasa perangkat lunak ke dalam sistem produksi yang handal',
                    'Hanya menulis rumus matematika di papan tulis',
                    'Memperbaiki layar komputer',
                    'Menjual perangkat keras GPU'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'AI Engineer membangun sistem produksi end-to-end yang mengandalkan AI.'
                },
                {
                  id: 'aml-q-01-3',
                  question: 'Apa arti dari fase "Inference" dalam siklus hidup model AI?',
                  options: [
                    'Proses saat model yang sudah terlatih memberikan prediksi pada data baru',
                    'Proses saat menghapus model',
                    'Proses saat membeli server GPU',
                    'Proses saat mencetak laporan keuangan'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Inference adalah saat model menghasilkan output berdasarkan input nyata.'
                },
                {
                  id: 'aml-q-01-4',
                  question: 'Manakah yang termasuk contoh Deep Learning?',
                  options: [
                    'Jaringan saraf tiruan berlapis banyak (Deep Neural Networks)',
                    'If-else statement sederhana di Excel',
                    'Kalkulator saku',
                    'Pencarian teks menggunakan operator LIKE di SQL'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Deep learning menggunakan banyak lapisan tersembunyi (hidden layers).'
                },
                {
                  id: 'aml-q-01-5',
                  question: 'Mengapa pengembangan sistem AI memerlukan pertimbangan tanggung jawab (responsible AI)?',
                  options: [
                    'Untuk mencegah bias, halusinasi, dan dampak merugikan pada pengguna atau masyarakat',
                    'Agar program berjalan lebih lambat',
                    'Hanya untuk formalitas hukum',
                    'Tidak ada alasan penting'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Responsible AI memastikan keamanan, keadilan, dan etika.'
                }
              ]
            }
          ]
        },
        {
          id: 'ai-machine-learning-m02',
          title: 'Module 2 — Mathematics for AI',
          description: 'Vektor, matriks, perkalian dot product, turunan, dan gradien untuk optimasi.',
          lessons: [
            {
              id: 'aml-l-02-1',
              title: 'Vektor, Matriks & Gradien dalam AI',
              type: 'learn',
              xpReward: 30,
              content: [
                {
                  type: 'markdown',
                  content: `### 1. Representasi Data sebagai Tensor
Di dalam AI, data direpresentasikan sebagai angka dalam bentuk vektor (1D), matriks (2D), atau tensor (ND).

### 2. Turunan dan Gradien
Gradien adalah vektor turunan parsial yang menunjukkan arah kenaikan fungsi tercepat. Dalam AI, kita bergerak ke arah **berlawanan** dari gradien (*gradient descent*) untuk meminimalkan error (loss).`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `import numpy as np

# Representasi bobot dan input sebagai vektor/matriks
weights = np.array([0.5, -1.2, 0.3])
inputs = np.array([2.0, 1.0, -1.0])

# Dot product (perkalian titik)
dot_product = np.dot(weights, inputs)
print("Hasil dot product:", dot_product)`
                }
              ]
            },
            {
              id: 'aml-l-02-2',
              title: 'Kuis Module 2 — Mathematics for AI',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'aml-q-02-1',
                  question: 'Apa arti dari operasi dot product antara dua vektor dalam machine learning?',
                  options: [
                    'Mengukur kesamaan atau proyeksi linier antar vektor',
                    'Menghapus vektor',
                    'Menambah jumlah dimensi',
                    'Mengubah tipe data menjadi string'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Dot product menghitung seberapa searah atau mirip dua vektor.'
                },
                {
                  id: 'aml-q-02-2',
                  question: 'Apa tujuan utama dari algoritma Gradient Descent dalam pelatihan model?',
                  options: [
                    'Meminimalkan fungsi kerugian (loss function) dengan mencari bobot optimal',
                    'Mempercepat kecepatan internet',
                    'Menghapus data duplikat',
                    'Membuat grafik berwarna-warni'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Gradient descent mencari titik minimum dari loss function.'
                },
                {
                  id: 'aml-q-02-3',
                  question: 'Apa bentuk data dari matriks 2 dimensi di NumPy?',
                  options: ['Tabel dengan baris dan kolom', 'Angka tunggal', 'Daftar bercabang tak terhingga', 'File teks'],
                  correctAnswerIndex: 0,
                  explanation: 'Matriks 2D merepresentasikan tabel data baris dan kolom.'
                },
                {
                  id: 'aml-q-02-4',
                  question: 'Apa arti turunan (derivative) suatu fungsi loss terhadap bobot w?',
                  options: [
                    'Seberapa sensitif perubahan loss jika bobot w diubah sedikit',
                    'Waktu komputasi pelatihan',
                    'Jumlah memori RAM yang terpakai',
                    'Suhu GPU'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Turunan mengukur laju perubahan output terhadap input.'
                },
                {
                  id: 'aml-q-02-5',
                  question: 'Apa itu Tensor?',
                  options: [
                    'Generalisasi array multi-dimensi (skalar, vektor, matriks, dan dimensi lebih tinggi)',
                    'Jenis kabel jaringan',
                    'Nama database SQL',
                    'Protokol Wi-Fi'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Tensor adalah struktur data dasar di deep learning.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'aml-lvl-2',
      title: 'Level 2 — Python, Data & Statistics',
      description: 'Python untuk AI, NumPy, pembersihan data, statistik deskriptif, dan probabilitas.',
      modules: [
        {
          id: 'ai-machine-learning-m03',
          title: 'Module 3 — Python for AI',
          description: 'NumPy, vectorized computation, dan manipulasi data dasar.',
          lessons: [
            {
              id: 'aml-l-03-1',
              title: 'Komputasi Vektor dengan NumPy',
              type: 'learn',
              xpReward: 30,
              content: [
                {
                  type: 'markdown',
                  content: `### Mengapa NumPy?
Operasi loop \`for\` di Python murni sangat lambat untuk dataset besar. NumPy menggunakan pustaka C terkompilasi untuk komputasi vektor (*vectorized operations*) berkecepatan tinggi.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `import numpy as np

arr = np.array([1, 2, 3, 4, 5])
scaled = arr * 2 + 1
print("Array setelah operasi vektor:", scaled)`
                }
              ]
            },
            {
              id: 'aml-l-03-2',
              title: 'Kuis Module 3 — Python for AI',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'aml-q-03-1',
                  question: 'Apa keunggulan utama NumPy dibanding list bawaan Python untuk operasi numerik?',
                  options: [
                    'Operasi vectorized yang jauh lebih cepat dan efisien memori',
                    'List Python lebih cepat untuk AI',
                    'NumPy tidak memerlukan RAM',
                    'NumPy hanya bisa berjalan di browser'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'NumPy menggunakan array C kontigu untuk komputasi cepat.'
                },
                {
                  id: 'aml-q-03-2',
                  question: 'Bagaimana cara mengalikan setiap elemen array NumPy dengan skalar 5?',
                  options: ['arr * 5', 'arr.multiply(5)', 'loop for biasa', 'arr + 5'],
                  correctAnswerIndex: 0,
                  explanation: 'Operasi aritmatika NumPy berlaku element-wise secara otomatis.'
                },
                {
                  id: 'aml-q-03-3',
                  question: 'Apa itu broadcasting di NumPy?',
                  options: [
                    'Kemampuan NumPy memproses array dengan bentuk (shape) berbeda dalam operasi aritmatika',
                    'Menyiarkan video streaming',
                    'Mengirim email otomatis',
                    'Koneksi Wi-Fi'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Broadcasting memungkinkan operasi antar array berukuran tidak persis sama.'
                },
                {
                  id: 'aml-q-03-4',
                  question: 'Apa fungsi np.zeros((3, 3))?',
                  options: [
                    'Membuat matriks berukuran 3x3 yang berisi angka 0 seluruhnya',
                    'Membuat matriks berisi angka 3',
                    'Menghapus 3 baris',
                    'Membuat array kosong'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'np.zeros menginisialisasi array dengan nilai nol.'
                },
                {
                  id: 'aml-q-03-5',
                  question: 'Manakah tipe data yang umum digunakan untuk representasi bobot float di AI?',
                  options: ['float32 atau float64', 'int8 string', 'boolean', 'complex'],
                  correctAnswerIndex: 0,
                  explanation: 'float32 adalah standar industri untuk presisi model deep learning.'
                }
              ]
            }
          ]
        },
        {
          id: 'ai-machine-learning-m04',
          title: 'Module 4 — Data Engineering Fundamentals',
          description: 'Pembersihan data, penanganan nilai hilang, normalisasi, dan train/test split.',
          lessons: [
            {
              id: 'aml-l-04-1',
              title: 'Pembersihan Data & Train/Test Split',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### Mencegah Data Leakage
Sebelum melatih model, dataset wajib dibagi menjadi data latih (*training set*) dan data uji (*test set*). Jangan pernah memasukkan informasi test set ke dalam proses pelatihan atau normalisasi (*data leakage*).`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)`
                }
              ]
            },
            {
              id: 'aml-l-04-2',
              title: 'Kuis Module 4 — Data Engineering Fundamentals',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'aml-q-04-1',
                  question: 'Apa bahaya dari Data Leakage dalam pelatihan machine learning?',
                  options: [
                    'Model terlihat sangat akurat saat pelatihan, tetapi gagal total saat diuji pada data nyata (overoptimistic evaluation)',
                    'Membuat komputer meledak',
                    'Menghapus database',
                    'Mempercepat training'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Data leakage membocorkan informasi test set ke training set.'
                },
                {
                  id: 'aml-q-04-2',
                  question: 'Apa tujuan dari penskalaan fitur (feature scaling/normalization)?',
                  options: [
                    'Menyamakan rentang nilai fitur agar tidak ada fitur berangka besar yang mendominasi model',
                    'Menambah jumlah baris',
                    'Mengubah teks jadi gambar',
                    'Mempercepat koneksi internet'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Scaling mencegah fitur dengan skala besar mendominasi fungsi loss.'
                },
                {
                  id: 'aml-q-04-3',
                  question: 'Bagaimana cara menangani nilai yang hilang (missing values) pada kolom numerik?',
                  options: ['Melakukan imputasi (mengisi dengan mean/median) atau menghapus baris terkait', 'Membiarkannya selamanya', 'Mengubahnya jadi huruf A', 'Mematikan komputer'],
                  correctAnswerIndex: 0,
                  explanation: 'Imputasi dengan mean/median adalah teknik standar.'
                },
                {
                  id: 'aml-q-04-4',
                  question: 'Berapa rasio pembagian standar yang sering digunakan untuk train/test split?',
                  options: ['80% train / 20% test (atau 70/30)', '99% test / 1% train', '50% train / 50% test untuk semuanya', '100% train'],
                  correctAnswerIndex: 0,
                  explanation: 'Rasio 80/20 adalah konvensi umum yang seimbang.'
                },
                {
                  id: 'aml-q-04-5',
                  question: 'Apa itu Outlier?',
                  options: ['Data ekstrem yang jauh berbeda dari mayoritas distribusi data lainnya', 'Data yang sangat normal', 'Jumlah kolom', 'Nama algoritma'],
                  correctAnswerIndex: 0,
                  explanation: 'Outlier adalah pencilan ekstrem yang dapat mengacaukan model.'
                }
              ]
            }
          ]
        },
        {
          id: 'ai-machine-learning-m05',
          title: 'Module 5 — Statistics & Probability',
          description: 'Mean, variance, distribusi probabilitas, dan korelasi.',
          lessons: [
            {
              id: 'aml-l-05-1',
              title: 'Distribusi & Korelasi Data',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### Statistik Deskriptif dalam AI
Memahami mean, standar deviasi, dan korelasi antar variabel membantu menentukan fitur mana yang paling prediktif.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `import numpy as np

data = np.array([10, 12, 23, 23, 16, 23, 21, 16])
mean_val = np.mean(data)
std_val = np.std(data)
print(f"Mean: {mean_val}, Std: {std_val}")`
                }
              ]
            },
            {
              id: 'aml-l-05-2',
              title: 'Kuis Module 5 — Statistics & Probability',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'aml-q-05-1',
                  question: 'Apa arti dari koefisien korelasi Pearson bernilai +1.0 antara dua variabel?',
                  options: [
                    'Hubungan linier positif sempurna (jika satu naik, yang lain pasti naik proporsional)',
                    'Tidak ada hubungan',
                    'Hubungan negatif terbalik',
                    'Variabel tersebut rusak'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Korelasi +1.0 menunjukkan hubungan linier positif sempurna.'
                },
                {
                  id: 'aml-q-05-2',
                  question: 'Apa yang diukur oleh Standar Deviasi?',
                  options: ['Tingkat penyebaran atau variasi nilai data dari rata-ratanya (mean)', 'Nilai tengah', 'Jumlah total data', 'Nilai maksimum'],
                  correctAnswerIndex: 0,
                  explanation: 'Standar deviasi mengukur seberapa jauh data tersebar dari mean.'
                },
                {
                  id: 'aml-q-05-3',
                  question: 'Apa itu distribusi normal (Gaussian)?',
                  options: ['Distribusi berbentuk lonceng (bell curve) yang simetris di sekitar mean', 'Distribusi berbentuk kotak', 'Distribusi garis lurus', 'Data acak tanpa pola'],
                  correctAnswerIndex: 0,
                  explanation: 'Distribusi normal berbentuk lonceng simetris.'
                },
                {
                  id: 'aml-q-05-4',
                  question: 'Apa arti probabilitas bersyarat P(A|B)?',
                  options: ['Peluang kejadian A terjadi dengan syarat kejadian B telah terjadi', 'Peluang A ditambah B', 'Peluang mutlak A', 'Peluang B saja'],
                  correctAnswerIndex: 0,
                  explanation: 'P(A|B) adalah probabilitas A given B.'
                },
                {
                  id: 'aml-q-05-5',
                  question: 'Mengapa analisis statistik penting sebelum membangun model machine learning?',
                  options: ['Mengenali distribusi data, potensi bias, outlier, dan hubungan antar variabel', 'Agar file program lebih kecil', 'Tidak ada gunanya', 'Wajib dalam HTML'],
                  correctAnswerIndex: 0,
                  explanation: 'Exploratory Data Analysis (EDA) mencegah kegagalan model.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'aml-lvl-3',
      title: 'Level 3 — Classical Machine Learning',
      description: 'Supervised learning, Linear Regression, Logistic Regression, Decision Trees, dan K-Means.',
      modules: [
        {
          id: 'ai-machine-learning-m06',
          title: 'Module 6 — Machine Learning Fundamentals',
          description: 'Supervised vs unsupervised learning, overfitting, dan underfitting.',
          lessons: [
            {
              id: 'aml-l-06-1',
              title: 'Overfitting vs Underfitting',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### Masalah Generalisasi
- **Underfitting:** Model terlalu sederhana sehingga gagal menangkap pola data latih maupun data uji.
- **Overfitting:** Model menghafal data latih (termasuk noise) sehingga gagal memprediksi data baru (*unseen data*).`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `# Menggunakan regularisasi untuk mencegah overfitting`
                }
              ]
            },
            {
              id: 'aml-l-06-2',
              title: 'Kuis Module 6 — Machine Learning Fundamentals',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'aml-q-06-1',
                  question: 'Apa itu Overfitting dalam machine learning?',
                  options: [
                    'Model menghafal data latih terlalu detail termasuk noise, sehingga performanya buruk pada data baru',
                    'Model terlalu bodoh',
                    'Model berjalan sangat cepat',
                    'Model tidak memiliki parameter'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Overfitting terjadi saat model gagal melakukan generalisasi.'
                },
                {
                  id: 'aml-q-06-2',
                  question: 'Apa perbedaan Supervised Learning dan Unsupervised Learning?',
                  options: [
                    'Supervised menggunakan data berlabel (ada jawaban benar), Unsupervised menggunakan data tak berlabel',
                    'Supervised tanpa komputer',
                    'Unsupervised lebih mahal',
                    'Tidak ada bedanya'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Supervised learning dilatih dengan target/label yang diketahui.'
                },
                {
                  id: 'aml-q-06-3',
                  question: 'Apa itu Underfitting?',
                  options: ['Model terlalu sederhana untuk mempelajari pola dasar dari data', 'Model terlalu akurat', 'Model terlalu besar', 'Koneksi internet terputus'],
                  correctAnswerIndex: 0,
                  explanation: 'Underfitting gagal menangkap pola dasar.'
                },
                {
                  id: 'aml-q-06-4',
                  question: 'Apa fungsi data validasi (validation set) selama pelatihan?',
                  options: ['Memilih hyperparameter dan memantau performa untuk menghentikan training sebelum overfitting', 'Untuk dihapus', 'Sebagai hiasan', 'Menambah ukuran file'],
                  correctAnswerIndex: 0,
                  explanation: 'Validation set memandu tuning model secara objektif.'
                },
                {
                  id: 'aml-q-06-5',
                  question: 'Manakah yang termasuk contoh Unsupervised Learning?',
                  options: ['Clustering (pengelompokan data tanpa label)', 'Klasifikasi spam email', 'Regresi harga rumah', 'Deteksi wajah berlabel'],
                  correctAnswerIndex: 0,
                  explanation: 'Clustering mengelompokkan data tanpa label awal.'
                }
              ]
            }
          ]
        },
        {
          id: 'ai-machine-learning-m07',
          title: 'Module 7 — Regression',
          description: 'Linear Regression, loss functions, dan koefisien regresi.',
          lessons: [
            {
              id: 'aml-l-07-1',
              title: 'Linear Regression & Least Squares',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Persamaan Garis Linear
$$y = wx + b$$
Mencari nilai bobot $w$ (slope) dan bias $b$ (intercept) yang meminimalkan Mean Squared Error (MSE).`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `from sklearn.linear_model import LinearRegression
model = LinearRegression()
model.fit(X_train, y_train)
print("Koefisien:", model.coef_, "Intercept:", model.intercept_)`
                }
              ]
            },
            {
              id: 'aml-l-07-2',
              title: 'Kuis Module 7 — Regression',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'aml-q-07-1',
                  question: 'Apa fungsi kerugian (loss function) yang paling umum digunakan dalam Linear Regression?',
                  options: ['MSE (Mean Squared Error)', 'Cross-Entropy Loss', 'Accuracy', 'F1-Score'],
                  correctAnswerIndex: 0,
                  explanation: 'MSE mengukur rata-rata kuadrat selisih antara prediksi dan nilai aktual.'
                },
                {
                  id: 'aml-q-07-2',
                  question: 'Apa output dari model regresi (Regression)?',
                  options: ['Nilai kontinu berbentuk angka (misal: harga rumah, suhu, atau harga saham)', 'Kategori kelas (Ya/Tidak)', 'Gambar 4K', 'Teks paragraf'],
                  correctAnswerIndex: 0,
                  explanation: 'Regresi memprediksi nilai numerik kontinu.'
                },
                {
                  id: 'aml-q-07-3',
                  question: 'Apa arti koefisien w (slope) dalam persamaan y = wx + b?',
                  options: ['Besar perubahan nilai y untuk setiap kenaikan satu satuan pada x', 'Titik potong sumbu y', 'Jumlah data', 'Galat model'],
                  correctAnswerIndex: 0,
                  explanation: 'Slope menyatakan kemiringan dan sensitivitas garis.'
                },
                {
                  id: 'aml-q-07-4',
                  question: 'Apa yang dimaksud dengan residual dalam analisis regresi?',
                  options: ['Selisih antara nilai aktual y dan nilai hasil prediksi model', 'Sisa memori', 'Suhu CPU', 'Jumlah kolom'],
                  correctAnswerIndex: 0,
                  explanation: 'Residual = y_aktual - y_prediksi.'
                },
                {
                  id: 'aml-q-07-5',
                  question: 'Kapan Linear Regression gagal bekerja dengan baik?',
                  options: ['Ketika hubungan antar data sangat non-linier dan kompleks', 'Saat data terlalu sedikit', 'Saat menggunakan Python', 'Saat data bersih'],
                  correctAnswerIndex: 0,
                  explanation: 'Linear regression mengasumsikan hubungan linier.'
                }
              ]
            }
          ]
        },
        {
          id: 'ai-machine-learning-m08',
          title: 'Module 8 — Classification',
          description: 'Logistic Regression, decision boundaries, dan klasifikasi biner.',
          lessons: [
            {
              id: 'aml-l-08-1',
              title: 'Logistic Regression & Sigmoid Function',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Fungsi Sigmoid
Mengubah nilai linier menjadi probabilitas antara 0 dan 1:
$$\\sigma(z) = \\frac{1}{1 + e^{-z}}$$`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `from sklearn.linear_model import LogisticRegression
clf = LogisticRegression()
clf.fit(X_train, y_train)
preds = clf.predict(X_test)`
                }
              ]
            },
            {
              id: 'aml-l-08-2',
              title: 'Kuis Module 8 — Classification',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'aml-q-08-1',
                  question: 'Apa fungsi dari fungsi aktivasi Sigmoid dalam Logistic Regression?',
                  options: ['Mengonversi nilai output linier menjadi probabilitas antara 0 dan 1', 'Menghitung nilai negatif', 'Mengubah gambar jadi teks', 'Mempercepat komputer'],
                  correctAnswerIndex: 0,
                  explanation: 'Sigmoid memetakan output ke rentang [0, 1].'
                },
                {
                  id: 'aml-q-08-2',
                  question: 'Apa perbedaan utama antara Regresi dan Klasifikasi?',
                  options: ['Regresi memprediksi angka kontinu, sedangkan klasifikasi memprediksi kategori kelas diskrit', 'Klasifikasi selalu menggunakan gambar', 'Regresi lebih canggih', 'Tidak ada bedanya'],
                  correctAnswerIndex: 0,
                  explanation: 'Klasifikasi menghasilkan label kelas (mis: Spam / Bukan Spam).'
                },
                {
                  id: 'aml-q-08-3',
                  question: 'Apa itu Decision Boundary (Batas Keputusan)?',
                  options: ['Garis atau permukaan hiperplan yang memisahkan ruang fitur untuk menentukan kelas prediksi', 'Pagar pembatas server', 'Batas memori RAM', 'Waktu timeout API'],
                  correctAnswerIndex: 0,
                  explanation: 'Decision boundary memisahkan wilayah klasifikasi kelas.'
                },
                {
                  id: 'aml-q-08-4',
                  question: 'Loss function apa yang digunakan dalam Logistic Regression?',
                  options: ['Binary Cross-Entropy Loss', 'MSE', 'Absolute Error', 'Cosine Similarity'],
                  correctAnswerIndex: 0,
                  explanation: 'Binary Cross-Entropy mengukur galat probabilitas klasifikasi.'
                },
                {
                  id: 'aml-q-08-5',
                  question: 'Apa yang dimaksud dengan klasifikasi multiclass?',
                  options: ['Klasifikasi yang melibatkan lebih dari dua kategori kelas target', 'Klasifikasi tanpa kelas', 'Klasifikasi menggunakan banyak CPU', 'Klasifikasi gambar hitam putih'],
                  correctAnswerIndex: 0,
                  explanation: 'Multiclass membedakan 3 kategori atau lebih.'
                }
              ]
            }
          ]
        },
        {
          id: 'ai-machine-learning-m09',
          title: 'Module 9 — Decision Trees & Ensemble Learning',
          description: 'Decision trees, Random Forests, dan gradient boosting.',
          lessons: [
            {
              id: 'aml-l-09-1',
              title: 'Random Forests & Ensemble Methods',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Ensemble Learning
Menggabungkan banyak pohon keputusan (*decision trees*) yang lemah menjadi satu model gabungan (*Random Forest*) yang kuat dan tahan terhadap overfitting.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `from sklearn.ensemble import RandomForestClassifier
rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)`
                }
              ]
            },
            {
              id: 'aml-l-09-2',
              title: 'Kuis Module 9 — Decision Trees & Ensemble Learning',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'aml-q-09-1',
                  question: 'Apa itu Random Forest?',
                  options: ['Kumpulan (ensemble) banyak Decision Trees yang bekerja bersama melalui voting', 'Hutan buatan di game', 'Algoritma pencarian web', 'Database relasional'],
                  correctAnswerIndex: 0,
                  explanation: 'Random forest menggabungkan prediksi banyak pohon keputusan.'
                },
                {
                  id: 'aml-q-09-2',
                  question: 'Apa ukuran kemurnian data yang sering digunakan saat memecah node di Decision Tree?',
                  options: ['Gini Impurity atau Entropy', 'Mean Squared Error', 'Standard Deviation', 'Cosine Distance'],
                  correctAnswerIndex: 0,
                  explanation: 'Gini dan entropy mengukur tingkat ketidakmurnian node.'
                },
                {
                  id: 'aml-q-09-3',
                  question: 'Apa keuntungan utama Random Forest dibanding Decision Tree tunggal?',
                  options: ['Mengurangi risiko overfitting dan memberikan akurasi generalisasi yang lebih tinggi', 'Waktu training lebih lambat', 'Membutuhkan lebih sedikit data', 'Tidak memerlukan Python'],
                  correctAnswerIndex: 0,
                  explanation: 'Ensemble averaging meredam varians pohon tunggal.'
                },
                {
                  id: 'aml-q-09-4',
                  question: 'Apa itu Boosting dalam ensemble learning?',
                  options: ['Metode pelatihan berurutan di mana pohon baru fokus memperbaiki kesalahan (residual) dari pohon sebelumnya', 'Menambah kecepatan kipas', 'Meningkatkan tegangan listrik', 'Menghapus data'],
                  correctAnswerIndex: 0,
                  explanation: 'Boosting melatih model secara iteratif memperbaiki galat sebelumnya.'
                },
                {
                  id: 'aml-q-09-5',
                  question: 'Mengapa Decision Tree sangat mudah diinterpretasikan?',
                  options: ['Karena strukturnya berupa aturan percabangan (if-then) yang dapat dibaca manusia dengan mudah', 'Karena menggunakan rumus matematika rumit', 'Karena berjalan di browser', 'Karena menggunakan gambar'],
                  correctAnswerIndex: 0,
                  explanation: 'Pohon keputusan transparan dan mudah divisualisasikan.'
                }
              ]
            }
          ]
        },
        {
          id: 'ai-machine-learning-m10',
          title: 'Module 10 — Unsupervised Learning',
          description: 'Clustering K-Means, centroids, dan PCA (Dimensionality Reduction).',
          lessons: [
            {
              id: 'aml-l-10-1',
              title: 'K-Means Clustering',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Algoritma K-Means
1. Inisialisasi $K$ centroid secara acak.
2. Tetapkan setiap titik data ke centroid terdekat.
3. Perbarui posisi centroid berdasarkan rata-rata klaster.
4. Ulangi sampai konvergen.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `from sklearn.cluster import KMeans
kmeans = KMeans(n_clusters=3, random_state=42)
kmeans.fit(X)`
                }
              ]
            },
            {
              id: 'aml-l-10-2',
              title: 'Kuis Module 10 — Unsupervised Learning',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'aml-q-10-1',
                  question: 'Apa perbedaan utama Unsupervised Learning dengan Supervised Learning?',
                  options: ['Unsupervised tidak memerlukan label/target jawaban pada data pelatihannya', 'Unsupervised menggunakan komputer lebih canggih', 'Unsupervised hanya untuk regresi', 'Tidak ada bedanya'],
                  correctAnswerIndex: 0,
                  explanation: 'Unsupervised menemukan struktur tersembunyi tanpa label.'
                },
                {
                  id: 'aml-q-10-2',
                  question: 'Apa fungsi dari Centroid dalam algoritma K-Means?',
                  options: ['Titik pusat representatif dari suatu klaster', 'Titik terjauh', 'Nilai minimum', 'Jumlah data'],
                  correctAnswerIndex: 0,
                  explanation: 'Centroid adalah rata-rata koordinat titik dalam klaster.'
                },
                {
                  id: 'aml-q-10-3',
                  question: 'Apa tujuan dari PCA (Principal Component Analysis)?',
                  options: ['Reduksi dimensi (mengurangi jumlah fitur) dengan tetap mempertahankan varians informasi maksimal', 'Menambah data baru', 'Mengisi missing values', 'Membuat klasifikasi spam'],
                  correctAnswerIndex: 0,
                  explanation: 'PCA memproyeksikan data ke dimensi lebih rendah.'
                },
                {
                  id: 'aml-q-10-4',
                  question: 'Apa arti huruf K dalam K-Means Clustering?',
                  options: ['Jumlah klaster yang ditentukan di awal oleh pengguna', 'Kecepatan algoritma', 'Kapasitas memori', 'Jumlah baris data'],
                  correctAnswerIndex: 0,
                  explanation: 'K menyatakan banyaknya kelompok klaster.'
                },
                {
                  id: 'aml-q-10-5',
                  question: 'Manakah aplikasi nyata dari unsupervised clustering?',
                  options: ['Segmentasi pelanggan (customer segmentation) berdasarkan perilaku belanja', 'Prediksi harga rumah berlabel', 'Klasifikasi gambar kucing', 'Speech to text'],
                  correctAnswerIndex: 0,
                  explanation: 'Segmentasi pasar mengelompokkan pelanggan tanpa label awal.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'aml-lvl-4',
      title: 'Level 4 — Feature Engineering & Model Evaluation',
      description: 'Feature scaling, encoding, confusion matrix, precision, recall, F1, dan ROC-AUC.',
      modules: [
        {
          id: 'ai-machine-learning-m11',
          title: 'Module 11 — Feature Engineering',
          description: 'Categorical encoding, scaling, dan pemilihan fitur.',
          lessons: [
            {
              id: 'aml-l-11-1',
              title: 'One-Hot Encoding & Feature Scaling',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### Transformasi Fitur Kategori
Model ML memerlukan input numerik. Variabel kategori (seperti warna atau kota) harus diubah menggunakan *One-Hot Encoding* atau *Label Encoding*.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `import pandas as pd
df_encoded = pd.get_dummies(df, columns=['category'])`
                }
              ]
            },
            {
              id: 'aml-l-11-2',
              title: 'Kuis Module 11 — Feature Engineering',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'aml-q-11-1',
                  question: 'Apa fungsi dari One-Hot Encoding pada data kategorikal?',
                  options: ['Mengubah variabel kategori menjadi kolom biner 0 dan 1 yang dapat diproses algoritma', 'Menghapus data kategori', 'Mengubah teks jadi gambar', 'Menambah baris'],
                  correctAnswerIndex: 0,
                  explanation: 'One-hot encoding merepresentasikan kategori sebagai vektor biner.'
                },
                {
                  id: 'aml-q-11-2',
                  question: 'Mengapa feature scaling (seperti StandardScaler) penting sebelum melatih model berbasis jarak (KNN/SVM)?',
                  options: ['Agar fitur dengan rentang nilai besar tidak mendominasi perhitungan jarak', 'Supaya file lebih kecil', 'Wajib dalam SQL', 'Tidak ada gunanya'],
                  correctAnswerIndex: 0,
                  explanation: 'Algoritma berbasis jarak sensitif terhadap skala fitur.'
                },
                {
                  id: 'aml-q-11-3',
                  question: 'Apa itu Feature Selection?',
                  options: ['Memilih subset fitur yang paling relevan dan membuang fitur yang redundan atau bising', 'Menambah fitur acak', 'Menghapus seluruh dataset', 'Mengubah nama kolom'],
                  correctAnswerIndex: 0,
                  explanation: 'Feature selection meningkatkan efisiensi dan mengurangi overfitting.'
                },
                {
                  id: 'aml-q-11-4',
                  question: 'Apa bahaya memasukkan informasi dari masa depan dalam rekayasa fitur?',
                  options: ['Data leakage yang membuat model terlihat sempurna saat pelatihan tapi gagal di produksi', 'Tidak ada bahaya', 'Komputer lebih cepat', 'Memori bertambah'],
                  correctAnswerIndex: 0,
                  explanation: 'Data leakage merusak validitas generalisasi.'
                },
                {
                  id: 'aml-q-11-5',
                  question: 'Apa itu Polynomial Features?',
                  options: ['Membuat fitur interaksi non-linier (misal x^2, x1*x2) untuk menangkap pola kompleks', 'Fitur berbentuk lingkaran', 'Kesalahan coding', 'Nama database'],
                  correctAnswerIndex: 0,
                  explanation: 'Polynomial features memperluas ruang fitur untuk regresi non-linier.'
                }
              ]
            }
          ]
        },
        {
          id: 'ai-machine-learning-m12',
          title: 'Module 12 — Model Evaluation',
          description: 'Confusion matrix, Precision, Recall, F1-Score, dan ROC-AUC.',
          lessons: [
            {
              id: 'aml-l-12-1',
              title: 'Precision, Recall, & F1-Score',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Metrik Evaluasi Klasifikasi
- **Precision:** Dari semua prediksi positif, berapa yang benar-benar positif?
- **Recall:** Dari semua data aktual positif, berapa banyak yang berhasil dideteksi?
- **F1-Score:** Harmonic mean dari Precision dan Recall.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `from sklearn.metrics import classification_report
print(classification_report(y_test, y_pred))`
                }
              ]
            },
            {
              id: 'aml-l-12-2',
              title: 'Kuis Module 12 — Model Evaluation',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'aml-q-12-1',
                  question: 'Apa arti dari Precision yang tinggi pada model deteksi penyakit langka?',
                  options: ['Sebagian besar prediksi positif (sakit) adalah benar, sedikit kasus False Positive', 'Semua pasien terdeteksi', 'Model cepat', 'Akurasi 100%'],
                  correctAnswerIndex: 0,
                  explanation: 'Precision mengukur ketepatan prediksi positif.'
                },
                {
                  id: 'aml-q-12-2',
                  question: 'Apa arti dari Recall yang tinggi?',
                  options: ['Model berhasil mendeteksi sebagian besar kasus positif aktual, sedikit False Negative', 'Model tidak pernah salah', 'Model lambat', 'Jumlah data sedikit'],
                  correctAnswerIndex: 0,
                  explanation: 'Recall mengukur kelengkapan deteksi kasus positif.'
                },
                {
                  id: 'aml-q-12-3',
                  question: 'Kapan metrik Akurasi (Accuracy) bisa menjadi menyesatkan (misleading)?',
                  options: ['Saat dataset mengalami ketidakseimbangan kelas yang ekstrem (class imbalance)', 'Saat data berjumlah besar', 'Saat menggunakan Python', 'Saat data normal'],
                  correctAnswerIndex: 0,
                  explanation: 'Akurasi bisa menyesatkan jika 99% data adalah kelas mayoritas.'
                },
                {
                  id: 'aml-q-12-4',
                  question: 'Apa yang diukur oleh kurva ROC-AUC?',
                  options: ['Kemampuan model membedakan antar kelas pada berbagai ambang batas (threshold)', 'Kecepatan CPU', 'Konsumsi RAM', 'Jumlah fitur'],
                  correctAnswerIndex: 0,
                  explanation: 'ROC-AUC mengukur diskriminasi biner secara komprehensif.'
                },
                {
                  id: 'aml-q-12-5',
                  question: 'Apa itu Cross-Validation?',
                  options: ['Teknik evaluasi dengan memecah data menjadi K bagian dan melatih model secara bergantian untuk validasi tangguh', 'Validasi silang antar bahasa', 'Menghapus data uji', 'Membuat tabel SQL'],
                  correctAnswerIndex: 0,
                  explanation: 'K-fold cross-validation memastikan evaluasi tidak bergantung pada satu split saja.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'aml-lvl-5',
      title: 'Level 5 — Deep Learning & Neural Networks',
      description: 'Perceptron, MLP, backpropagation, fungsi aktivasi, dan pelatihan deep learning.',
      modules: [
        {
          id: 'ai-machine-learning-m13',
          title: 'Module 13 — Neural Networks',
          description: 'Arsitektur neuron buatan, forward propagation, dan backpropagation.',
          lessons: [
            {
              id: 'aml-l-13-1',
              title: 'Anatomi Neural Network & Backpropagation',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### 1. Forward Propagation
Menghitung output dari input melalui bobot dan fungsi aktivasi (ReLU, Tanh).

### 2. Backpropagation
Menggunakan aturan rantai kalkulus (*chain rule*) untuk merambatkan galat kembali ke belakang guna memperbarui bobot.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `import torch
import torch.nn as nn

model = nn.Sequential(
    nn.Linear(10, 32),
    nn.ReLU(),
    nn.Linear(32, 1)
)`
                }
              ]
            },
            {
              id: 'aml-l-13-2',
              title: 'Kuis Module 13 — Neural Networks',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'aml-q-13-1',
                  question: 'Apa fungsi dari fungsi aktivasi non-linier (seperti ReLU) dalam Neural Network?',
                  options: ['Memungkinkan jaringan mempelajari pola kompleks non-linier', 'Membuat jaringan linier', 'Menghapus bobot', 'Mempercepat internet'],
                  correctAnswerIndex: 0,
                  explanation: 'Tanpa aktivasi non-linier, jaringan berlapis banyak setara dengan fungsi linier tunggal.'
                },
                {
                  id: 'aml-q-13-2',
                  question: 'Apa itu Backpropagation?',
                  options: ['Algoritma menghitung gradien error dari lapisan output ke input untuk memperbarui bobot via aturan rantai', 'Menghapus model', 'Proses inferensi', 'Pembersihan data'],
                  correctAnswerIndex: 0,
                  explanation: 'Backpropagation adalah inti pembelajaran deep learning.'
                },
                {
                  id: 'aml-q-13-3',
                  question: 'Apa peran bias dalam sebuah neuron buatan?',
                  options: ['Menggeser fungsi aktivasi untuk memberikan fleksibilitas tambahan pada model', 'Menambah arus listrik', 'Menyimpan file', 'Mengatur warna'],
                  correctAnswerIndex: 0,
                  explanation: 'Bias menggeser batas aktivasi neuron.'
                },
                {
                  id: 'aml-q-13-4',
                  question: 'Apa itu Forward Propagation?',
                  options: ['Proses meneruskan sinyal input maju melalui lapisan jaringan untuk menghasilkan prediksi', 'Proses mundur', 'Inisialisasi database', 'Preprocessing data'],
                  correctAnswerIndex: 0,
                  explanation: 'Forward pass menghitung output prediksi model.'
                },
                {
                  id: 'aml-q-13-5',
                  question: 'Apa kelemahan fungsi aktivasi Sigmoid pada jaringan yang sangat dalam?',
                  options: ['Masalah vanishing gradient (gradien menyusut mendekati nol di lapisan dalam)', 'Terlalu cepat', 'Terlalu besar', 'Tidak ada kelemahan'],
                  correctAnswerIndex: 0,
                  explanation: 'Turunan sigmoid sangat kecil di ujungnya, memicu vanishing gradient.'
                }
              ]
            }
          ]
        },
        {
          id: 'ai-machine-learning-m14',
          title: 'Module 14 — Training Deep Neural Networks',
          description: 'Optimizers (Adam, SGD), learning rate, dropout, dan regularisasi.',
          lessons: [
            {
              id: 'aml-l-14-1',
              title: 'Optimizers & Regularisasi (Dropout)',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Teknik Mencegah Overfitting di Deep Learning
- **Dropout:** Mematikan sejumlah neuron secara acak selama pelatihan untuk mencegah co-adaptation.
- **Adam Optimizer:** Menggabungkan momentum dan RMSprop untuk konvergensi pelatihan yang cepat dan stabil.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `optimizer = torch.optim.Adam(model.parameters(), lr=0.001)`
                }
              ]
            },
            {
              id: 'aml-l-14-2',
              title: 'Kuis Module 14 — Training Deep Neural Networks',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'aml-q-14-1',
                  question: 'Apa fungsi teknik Dropout dalam pelatihan deep learning?',
                  options: ['Mencegah overfitting dengan menonaktifkan neuron secara acak saat pelatihan', 'Mempercepat training', 'Menghapus memori GPU', 'Menambah layer'],
                  correctAnswerIndex: 0,
                  explanation: 'Dropout memaksa jaringan mendistribusikan representasi secara tangguh.'
                },
                {
                  id: 'aml-q-14-2',
                  question: 'Apa keunggulan optimizer Adam dibanding SGD standar?',
                  options: ['Menggunakan adaptive learning rate untuk setiap parameter, konvergensi lebih cepat dan stabil', 'Selalu 100% akurat', 'Tanpa memerlukan data', 'Berjalan di browser'],
                  correctAnswerIndex: 0,
                  explanation: 'Adam menyesuaikan laju belajar per parameter secara adaptif.'
                },
                {
                  id: 'aml-q-14-3',
                  question: 'Apa arti dari istilah Epoch dalam pelatihan model?',
                  options: ['Satu siklus penuh di mana seluruh dataset pelatihan melewati proses forward dan backward pass', 'Satu detik', 'Satu baris data', 'Satu epoch sama dengan satu batch'],
                  correctAnswerIndex: 0,
                  explanation: '1 epoch = seluruh dataset telah dilatih sekali.'
                },
                {
                  id: 'aml-q-14-4',
                  question: 'Apa fungsi Early Stopping?',
                  options: ['Menghentikan pelatihan saat performa pada validation set mulai memburuk untuk mencegah overfitting', 'Mematikan komputer', 'Menghapus model', 'Mempercepat epoch'],
                  correctAnswerIndex: 0,
                  explanation: 'Early stopping menghentikan training saat validasi mulai jenuh/overfit.'
                },
                {
                  id: 'aml-q-14-5',
                  question: 'Apa dampak Learning Rate yang diset terlalu besar?',
                  options: ['Training menjadi tidak stabil, loss melompat-lompat, atau divergen (tidak konvergen)', 'Model sangat akurat', 'Training sangat lambat', 'Tidak ada efek'],
                  correctAnswerIndex: 0,
                  explanation: 'Learning rate besar membuat bobot melompati titik minimum optimal.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'aml-lvl-6',
      title: 'Level 6 — Computer Vision & NLP',
      description: 'Convolutional Neural Networks (CNN), tokenisasi, embeddings, dan Transformer architecture.',
      modules: [
        {
          id: 'ai-machine-learning-m15',
          title: 'Module 15 — Computer Vision',
          description: 'Convolution, filters, dan CNN architectures.',
          lessons: [
            {
              id: 'aml-l-15-1',
              title: 'Convolutional Neural Networks (CNN)',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Operasi Konvolusi
Filter (*kernel*) bergeser di atas gambar untuk mengekstrak fitur spasial lokal seperti tepi, tekstur, dan bentuk.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `import torch.nn as nn
cnn_layer = nn.Conv2d(in_channels=3, out_channels=16, kernel_size=3, stride=1)`
                }
              ]
            },
            {
              id: 'aml-l-15-2',
              title: 'Kuis Module 15 — Computer Vision',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'aml-q-15-1',
                  question: 'Apa fungsi lapisan Konvolusi (Conv2d) dalam CNN?',
                  options: ['Mengekstrak fitur visual spasial (tepi, pola, bentuk) dari gambar', 'Mengubah gambar jadi teks', 'Menghapus warna', 'Menambah ukuran gambar'],
                  correctAnswerIndex: 0,
                  explanation: 'Filter konvolusi mendeteksi pola visual lokal secara hierarkis.'
                },
                {
                  id: 'aml-q-15-2',
                  question: 'Apa tujuan dari lapisan Pooling (Max Pooling) di CNN?',
                  options: ['Mengurangi dimensi spasial (downsampling) dan mempertahankan fitur dominan', 'Menambah resolusi', 'Membuat gambar buram', 'Menghapus piksel'],
                  correctAnswerIndex: 0,
                  explanation: 'Max pooling meringankan komputasi dan memberikan invariansi translasi.'
                },
                {
                  id: 'aml-q-15-3',
                  question: 'Bagaimana komputer merepresentasikan gambar berwarna RGB?',
                  options: ['Sebagai tensor 3D dengan dimensi (Height, Width, 3 channel warna)', 'Sebagai teks string', 'Sebagai satu angka skalar', 'Sebagai audio'],
                  correctAnswerIndex: 0,
                  explanation: 'RGB direpresentasikan sebagai tensor 3 kanal.'
                },
                {
                  id: 'aml-q-15-4',
                  question: 'Apa itu Data Augmentation dalam Computer Vision?',
                  options: ['Teknik memperbanyak variasi data latih dengan memutar, memotong, atau mengubah kecerahan gambar', 'Mencetak foto', 'Menghapus gambar rusak', 'Membeli kamera baru'],
                  correctAnswerIndex: 0,
                  explanation: 'Augmentation meningkatkan ketahanan model terhadap variasi.'
                },
                {
                  id: 'aml-q-15-5',
                  question: 'Mengapa Fully Connected Network biasa kurang efektif untuk gambar dibanding CNN?',
                  options: ['Parameter terlalu banyak dan mengabaikan struktur spasial 2D gambar', 'CNN lebih lambat', 'FCN tidak bisa di komputer', 'Tidak ada bedanya'],
                  correctAnswerIndex: 0,
                  explanation: 'CNN dirancang khusus mempertahankan struktur spasial lokal.'
                }
              ]
            }
          ]
        },
        {
          id: 'ai-machine-learning-m16',
          title: 'Module 16 — Natural Language Processing',
          description: 'Tokenisasi, vocabulary, dan word embeddings.',
          lessons: [
            {
              id: 'aml-l-16-1',
              title: 'Tokenisasi & Word Embeddings',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Word Embeddings
Mengubah kata menjadi vektor numerik berdimensi tinggi di mana kata-kata dengan makna serupa berada dekat satu sama lain di ruang vektor.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `# Konsep tokenisasi teks`
                }
              ]
            },
            {
              id: 'aml-l-16-2',
              title: 'Kuis Module 16 — Natural Language Processing',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'aml-q-16-1',
                  question: 'Apa arti dari Tokenisasi dalam NLP?',
                  options: ['Memecah teks kalimat menjadi unit-unit kecil (token seperti kata atau sub-kata)', 'Mengenkripsi password', 'Menerjemahkan ke bahasa asing', 'Menghapus spasi'],
                  correctAnswerIndex: 0,
                  explanation: 'Tokenisasi adalah langkah awal pemrosesan teks.'
                },
                {
                  id: 'aml-q-16-2',
                  question: 'Apa keuntungan Word Embeddings dibanding One-Hot Encoding sederhana?',
                  options: ['Embeddings menangkap hubungan semantik dan kedekatan makna antar kata', 'Embeddings menggunakan lebih sedikit memori', 'One-hot encoding sudah usang', 'Embeddings tidak perlu teks'],
                  correctAnswerIndex: 0,
                  explanation: 'Embeddings merepresentasikan makna semantik dalam ruang vektor.'
                },
                {
                  id: 'aml-q-16-3',
                  question: 'Apa fungsi dari Padding dalam pemrosesan batch teks NLP?',
                  options: ['Menyamakan panjang semua urutan kalimat dalam satu batch dengan menambahkan token khusus', 'Menghapus kata penting', 'Mempercepat GPU', 'Menambah jumlah kalimat'],
                  correctAnswerIndex: 0,
                  explanation: 'Padding menyamakan dimensi tensor teks.'
                },
                {
                  id: 'aml-q-16-4',
                  question: 'Apa itu Vocabulary dalam model bahasa?',
                  options: ['Daftar seluruh kata unik yang dikenali oleh model', 'Kamus bahasa Inggris lengkap', 'Daftar server', 'Daftar file Python'],
                  correctAnswerIndex: 0,
                  explanation: 'Vocabulary adalah kamus token model.'
                },
                {
                  id: 'aml-q-16-5',
                  question: 'Mengapa teks harus diubah menjadi angka sebelum dimasukkan ke model ML?',
                  options: ['Karena model matematika dan neural network hanya dapat memproses operasi numerik', 'Agar rapi', 'Karena komputer tidak tahu huruf', 'Wajib dalam HTML'],
                  correctAnswerIndex: 0,
                  explanation: 'Model ML berbasis pada komputasi matriks numerik.'
                }
              ]
            }
          ]
        },
        {
          id: 'ai-machine-learning-m17',
          title: 'Module 17 — Transformers',
          description: 'Self-attention mechanism, Query, Key, Value, dan encoder-decoder.',
          lessons: [
            {
              id: 'aml-l-17-1',
              title: 'Self-Attention & Transformer Architecture',
              type: 'learn',
              xpReward: 50,
              content: [
                {
                  type: 'markdown',
                  content: `### Mekanisme Self-Attention
Memungkinkan model menimbang tingkat kepentingan setiap kata terhadap kata lain dalam kalimat secara bersamaan (parallel), tanpa terjebak urutan sekuensial RNN.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `# Rumus Attention(Q, K, V) = softmax(Q K^T / sqrt(d_k)) V`
                }
              ]
            },
            {
              id: 'aml-l-17-2',
              title: 'Kuis Module 17 — Transformers',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'aml-q-17-1',
                  question: 'Apa keunggulan utama arsitektur Transformer dibanding RNN tradisional?',
                  options: ['Mekanisme self-attention memungkinkan pemrosesan paralel dan menangkap konteks jarak jauh secara efisien', 'Transformer lebih lambat', 'RNN tidak menggunakan komputer', 'Transformer tidak memerlukan data'],
                  correctAnswerIndex: 0,
                  explanation: 'Transformer mengatasi hambatan sekuensial RNN melalui parallelization.'
                },
                {
                  id: 'aml-q-17-2',
                  question: 'Apa arti Query (Q), Key (K), dan Value (V) dalam attention mechanism?',
                  options: ['Komponen matriks analog sistem pencarian/retrieval internal untuk menghitung relevansi antar token', 'Nama variabel acak', 'Protokol Wi-Fi', 'Jenis database'],
                  correctAnswerIndex: 0,
                  explanation: 'Q, K, V menghitung bobot perhatian antar kata.'
                },
                {
                  id: 'aml-q-17-3',
                  question: 'Apa fungsi Positional Encoding pada Transformer?',
                  options: ['Memberikan informasi posisi urutan kata dalam kalimat karena attention bersifat invariant terhadap urutan', 'Menghitung koordinat GPS', 'Menyimpan file', 'Mengatur suhu'],
                  correctAnswerIndex: 0,
                  explanation: 'Positional encoding menyisipkan informasi urutan sekuens.'
                },
                {
                  id: 'aml-q-17-4',
                  question: 'Apa itu Multi-Head Attention?',
                  options: ['Penggunaan beberapa mekanisme attention secara paralel untuk fokus pada aspek/sub-ruang makna berbeda', 'Memiliki banyak kepala robot', 'Menggunakan banyak GPU', 'Memiliki banyak layar'],
                  correctAnswerIndex: 0,
                  explanation: 'Multi-head attention menangkap berbagai hubungan semantik sekaligus.'
                },
                {
                  id: 'aml-q-17-5',
                  question: 'Manakah model terkenal yang berbasis arsitektur Transformer?',
                  options: ['BERT, GPT, dan T5', 'Linear Regression', 'K-Means', 'ResNet-50'],
                  correctAnswerIndex: 0,
                  explanation: 'BERT dan GPT adalah landasan revolusi Transformer.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'aml-lvl-7',
      title: 'Level 7 — Generative AI, LLM Engineering & Prompting',
      description: 'Generative AI, LLM APIs, prompt engineering, structured output, dan tool calling.',
      modules: [
        {
          id: 'ai-machine-learning-m18',
          title: 'Module 18 — Generative AI Fundamentals',
          description: 'Model generatif, sampling, temperature, dan token generation.',
          lessons: [
            {
              id: 'aml-l-18-1',
              title: 'Cara Kerja Generative AI & Temperature',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Parameter Temperature
- **Temperature = 0:** Deterministik, selalu memilih token dengan probabilitas tertinggi.
- **Temperature tinggi (>0.7):** Kreatif, variatif, dan terbuka terhadap token berprobabilitas lebih rendah.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `# Konfigurasi parameter LLM`
                }
              ]
            },
            {
              id: 'aml-l-18-2',
              title: 'Kuis Module 18 — Generative AI Fundamentals',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'aml-q-18-1',
                  question: 'Apa pengaruh menyetel Temperature ke nilai 0 pada LLM?',
                  options: ['Output menjadi sangat deterministik dan konsisten (selalu memilih kata paling mungkin)', 'Output sangat kreatif dan acak', 'Model berhenti bekerja', 'Model berjalan 10x lebih lambat'],
                  correctAnswerIndex: 0,
                  explanation: 'Temperature 0 menghasilkan respons yang konsisten dan dapat diprediksi.'
                },
                {
                  id: 'aml-q-18-2',
                  question: 'Apa itu Token dalam konteks Large Language Models?',
                  options: ['Potongan unit teks (bisa berupa kata atau bagian kata/subword) yang diproses model', 'Koin kripto', 'Kabel jaringan', 'Password server'],
                  correctAnswerIndex: 0,
                  explanation: 'Token adalah unit dasar input/output LLM.'
                },
                {
                  id: 'aml-q-18-3',
                  question: 'Apa yang dimaksud dengan Hallucination (Halusinasi) pada LLM?',
                  options: ['Kondisi saat model menghasilkan informasi yang keliru, tidak akurat, tetapi disajikan dengan sangat percaya diri', 'Model rusak total', 'Koneksi terputus', 'Baterai habis'],
                  correctAnswerIndex: 0,
                  explanation: 'Halusinasi adalah keluaran palsu yang tampak meyakinkan.'
                },
                {
                  id: 'aml-q-18-4',
                  question: 'Apa fungsi Context Window pada LLM?',
                  options: ['Batas maksimum jumlah token (input + output) yang dapat ditampung dan diproses model dalam satu sesi', 'Ukuran layar monitor', 'Kapasitas hard disk server', 'Jumlah RAM'],
                  correctAnswerIndex: 0,
                  explanation: 'Context window membatasi panjang memori percakapan.'
                },
                {
                  id: 'aml-q-18-5',
                  question: 'Bagaimana LLM menghasilkan teks kata demi kata?',
                  options: ['Memprediksi probabilitas token berikutnya secara berulang (autoregressive)', 'Menyalin dari database SQL', 'Menggunakan random number generator', 'Mencetak dokumen fisik'],
                  correctAnswerIndex: 0,
                  explanation: 'LLM adalah model bahasa autoregresif.'
                }
              ]
            }
          ]
        },
        {
          id: 'ai-machine-learning-m19',
          title: 'Module 19 — LLM Engineering',
          description: 'Integrasi API LLM, streaming, structured outputs, dan error handling.',
          lessons: [
            {
              id: 'aml-l-19-1',
              title: 'Structured Output & Tool Calling dengan LLM',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Structured Output (JSON Mode)
Memaksa LLM mengembalikan respons dalam format JSON yang valid agar dapat diurai dengan aman oleh backend aplikasi.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `# Contoh integrasi API LLM dengan Google GenAI SDK`
                }
              ]
            },
            {
              id: 'aml-l-19-2',
              title: 'Kuis Module 19 — LLM Engineering',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'aml-q-19-1',
                  question: 'Mengapa Structured Output (JSON Mode) penting dalam rekayasa aplikasi LLM?',
                  options: ['Memastikan output LLM dapat diurai secara otomatis oleh program backend tanpa error parsing', 'Agar teks lebih panjang', 'Menghemat kuota', 'Wajib dalam HTML'],
                  correctAnswerIndex: 0,
                  explanation: 'Structured output menjamin integritas data antar sistem.'
                },
                {
                  id: 'aml-q-19-2',
                  question: 'Apa itu Tool Calling (Function Calling) pada LLM modern?',
                  options: ['Kemampuan model mengenali kapan dan bagaimana memanggil fungsi eksternal/API berdasarkan instruksi pengguna', 'Menelpon teknisi', 'Memperbaiki kabel', 'Menyalakan komputer'],
                  correctAnswerIndex: 0,
                  explanation: 'Tool calling menghubungkan LLM dengan sistem eksternal.'
                },
                {
                  id: 'aml-q-19-3',
                  question: 'Apa keuntungan streaming response dari API LLM di frontend?',
                  options: ['Pengguna dapat melihat teks muncul secara real-time, menurunkan latensi persepsi (*perceived latency*)', 'Mengurangi biaya server', 'Membuat server lebih panas', 'Tidak ada keuntungan'],
                  correctAnswerIndex: 0,
                  explanation: 'Streaming meningkatkan responsivitas UX.'
                },
                {
                  id: 'aml-q-19-4',
                  question: 'Bagaimana cara menangani kegagalan koneksi rate limit API LLM di aplikasi produksi?',
                  options: ['Menerapkan mekanisme exponential backoff dan retry otomatis', 'Membiarkan error muncul ke pengguna', 'Menutup aplikasi', 'Menghapus kode'],
                  correctAnswerIndex: 0,
                  explanation: 'Retry dengan backoff mengatasi lonjakan trafik rate limit.'
                },
                {
                  id: 'aml-q-19-5',
                  question: 'Apa itu System Instructions pada LLM?',
                  options: ['Instruksi tingkat sistem yang memberi panduan peran, batasan, dan aturan perilaku utama kepada model', 'Password root server', 'Pengaturan BIOS', 'Driver GPU'],
                  correctAnswerIndex: 0,
                  explanation: 'System instructions mengarahkan perilaku dasar model.'
                }
              ]
            }
          ]
        },
        {
          id: 'ai-machine-learning-m20',
          title: 'Module 20 — Prompt Engineering',
          description: 'Few-shot prompting, chain-of-thought, dan guardrails.',
          lessons: [
            {
              id: 'aml-l-20-1',
              title: 'Chain-of-Thought & Few-Shot Prompting',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Chain-of-Thought (CoT)
Meminta model menuliskan langkah-langkah penalaran secara eksplisit sebelum memberikan jawaban akhir, terbukti mendongkrak akurasi penalaran kompleks.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `# Prompt dengan teknik Chain-of-Thought`
                }
              ]
            },
            {
              id: 'aml-l-20-2',
              title: 'Kuis Module 20 — Prompt Engineering',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'aml-q-20-1',
                  question: 'Apa itu teknik Chain-of-Thought (CoT) dalam prompt engineering?',
                  options: ['Mengarahkan model menjelaskan langkah berpikir secara bertahap sebelum kesimpulan', 'Membuat rantai besi', 'Mengulang kata 100 kali', 'Menghapus prompt'],
                  correctAnswerIndex: 0,
                  explanation: 'CoT meningkatkan akurasi penalaran logis.'
                },
                {
                  id: 'aml-q-20-2',
                  question: 'Apa itu Few-Shot Prompting?',
                  options: ['Memberikan beberapa contoh kasus (contoh input dan output) di dalam prompt sebelum pertanyaan aktual', 'Prompt tanpa contoh', 'Prompt sangat pendek', 'Prompt berbahasa Inggris'],
                  correctAnswerIndex: 0,
                  explanation: 'Few-shot memandu format dan pola jawaban model.'
                },
                {
                  id: 'aml-q-20-3',
                  question: 'Apa risiko dari prompt injection pada aplikasi LLM?',
                  options: ['Pengguna jahat menyisipkan instruksi tersembunyi yang membajak perilaku sistem', 'Komputer meledak', 'Koneksi Wi-Fi putus', 'File terhapus'],
                  correctAnswerIndex: 0,
                  explanation: 'Prompt injection memanipulasi instruksi sistem oleh user.'
                },
                {
                  id: 'aml-q-20-4',
                  question: 'Mengapa batasan output (output constraints) penting dicantumkan dalam prompt?',
                  options: ['Mencegah model memberikan penjelasan bertele-tele dan memastikan format sesuai kebutuhan', 'Membuat server lambat', 'Menghabiskan token', 'Tidak penting'],
                  correctAnswerIndex: 0,
                  explanation: 'Batasan output menjaga kedisiplinan respons model.'
                },
                {
                  id: 'aml-q-20-5',
                  question: 'Apa itu Zero-Shot Prompting?',
                  options: ['Memberikan instruksi tugas langsung kepada model tanpa memberikan contoh contoh sebelumnya', 'Prompt gagal', 'Prompt kosong', 'Prompt tanpa teks'],
                  correctAnswerIndex: 0,
                  explanation: 'Zero-shot mengandalkan kemampuan bawaan model.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'aml-lvl-8',
      title: 'Level 8 — RAG, Vector Search & AI Agents',
      description: 'Embeddings, vector databases, RAG systems, dan tool-using AI agents.',
      modules: [
        {
          id: 'ai-machine-learning-m21',
          title: 'Module 21 — Embeddings & Vector Search',
          description: 'Cosine similarity, vector indexing, dan semantic search.',
          lessons: [
            {
              id: 'aml-l-21-1',
              title: 'Semantic Search dengan Cosine Similarity',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Cosine Similarity
Mengukur sudut kosinus antara dua vektor embedding untuk menentukan tingkat kemiripan makna semantik terlepas dari panjang teks.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `from sklearn.metrics.pairwise import cosine_similarity
sim = cosine_similarity(vec1, vec2)`
                }
              ]
            },
            {
              id: 'aml-l-21-2',
              title: 'Kuis Module 21 — Embeddings & Vector Search',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'aml-q-21-1',
                  question: 'Apa fungsi utama dari Vector Database?',
                  options: ['Menyimpan dan melakukan pencarian kemiripan vektor embedding berkecepatan tinggi', 'Menyimpan tabel relasional SQL', 'Memutar video', 'Mengirim email'],
                  correctAnswerIndex: 0,
                  explanation: 'Vector DB dioptimalkan untuk nearest neighbor search.'
                },
                {
                  id: 'aml-q-21-2',
                  question: 'Apa yang diukur oleh Cosine Similarity antar dua vektor embedding?',
                  options: ['Besar sudut kemiripan arah makna semantik di ruang vektor', 'Panjang kalimat dalam kata', 'Jumlah huruf vokal', 'Waktu komputasi'],
                  correctAnswerIndex: 0,
                  explanation: 'Cosine similarity mengukur kedekatan orientasi vektor.'
                },
                {
                  id: 'aml-q-21-3',
                  question: 'Mengapa pencarian teks tradisional (keyword match) sering gagal dibanding semantic search?',
                  options: ['Keyword match tidak memahami sinonim atau konteks makna (misal "mobil" vs "kendaraan")', 'Keyword match lebih mahal', 'Keyword match hanya untuk angka', 'Tidak ada bedanya'],
                  correctAnswerIndex: 0,
                  explanation: 'Semantic search memahami makna dibalik kata.'
                },
                {
                  id: 'aml-q-21-4',
                  question: 'Apa itu Embedding model?',
                  options: ['Model AI yang mengubah teks atau data menjadi vektor angka berdimensi tinggi', 'Model database', 'Model web frontend', 'Kabel jaringan'],
                  correctAnswerIndex: 0,
                  explanation: 'Embedding model mengonversi teks menjadi representasi vektor.'
                },
                {
                  id: 'aml-q-21-5',
                  question: 'Apa itu Approximate Nearest Neighbor (ANN)?',
                  options: ['Algoritma pencarian vektor super cepat yang mengorbankan sedikit akurasi demi kecepatan pencarian di skala milyaran data', 'Pencarian lambat', 'Pencarian SQL', 'Pencarian folder'],
                  correctAnswerIndex: 0,
                  explanation: 'ANN memungkinkan skalabilitas pencarian vector database.'
                }
              ]
            }
          ]
        },
        {
          id: 'ai-machine-learning-m22',
          title: 'Module 22 — RAG Engineering',
          description: 'Retrieval-Augmented Generation, chunking, reranking, dan grounding.',
          lessons: [
            {
              id: 'aml-l-22-1',
              title: 'Arsitektur RAG & Document Chunking',
              type: 'learn',
              xpReward: 50,
              content: [
                {
                  type: 'markdown',
                  content: `### Pipeline RAG (Retrieval-Augmented Generation)
1. **Ingestion & Chunking:** Memecah dokumen besar menjadi potongan kecil (*chunks*).
2. **Embedding & Indexing:** Menyimpan vektor chunk ke Vector DB.
3. **Retrieval:** Mencari chunk relevan berdasarkan query user.
4. **Generation:** Mengirimkan konteks yang ditemukan ke LLM untuk menghasilkan jawaban yang ter-grounding.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `# Konsep dasar assembly prompt RAG`
                }
              ]
            },
            {
              id: 'aml-l-22-2',
              title: 'Kuis Module 22 — RAG Engineering',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'aml-q-22-1',
                  question: 'Apa tujuan utama dari arsitektur RAG (Retrieval-Augmented Generation)?',
                  options: ['Mengatasi halusinasi LLM dengan menyuplai dokumen eksternal relevan sebagai konteks faktual', 'Mempercepat internet', 'Menghapus database', 'Membuat game'],
                  correctAnswerIndex: 0,
                  explanation: 'RAG men-grounding jawaban LLM pada data privat/eksternal.'
                },
                {
                  id: 'aml-q-22-2',
                  question: 'Mengapa dokumen panjang harus dipecah menjadi chunk kecil sebelum di-embed?',
                  options: ['Agar pencarian vektor lebih spesifik dan muat dalam batas context window LLM', 'Agar file lebih besar', 'Wajib dalam SQL', 'Tidak ada alasan'],
                  correctAnswerIndex: 0,
                  explanation: 'Chunking menjaga presisi retrieval dan batas token.'
                },
                {
                  id: 'aml-q-22-3',
                  question: 'Apa fungsi komponen Rerankers dalam pipeline RAG tingkat lanjut?',
                  options: ['Menilai ulang dan mengurutkan ulang hasil retrieval berdasarkan relevansi mendalam sebelum masuk LLM', 'Menghapus dokumen', 'Mengubah bahasa', 'Mematikan server'],
                  correctAnswerIndex: 0,
                  explanation: 'Reranker menyaring hasil pencarian agar konteks paling akurat di atas.'
                },
                {
                  id: 'aml-q-22-4',
                  question: 'Apa arti Grounding dalam konteks RAG?',
                  options: ['Kondisi di mana jawaban LLM didukung sepenuhnya oleh fakta dari dokumen sumber yang diambil', 'Korsleting listrik', 'Koneksi terputus', 'Reset server'],
                  correctAnswerIndex: 0,
                  explanation: 'Grounding memastikan jawaban berbasis fakta sumber.'
                },
                {
                  id: 'aml-q-22-5',
                  question: 'Manakah tantangan umum dalam rekayasa RAG?',
                  options: ['Menentukan ukuran chunk yang optimal, strategi overlap, dan kualitas retrieval', 'Terlalu mudah', 'Tanpa masalah', 'Tidak memerlukan LLM'],
                  correctAnswerIndex: 0,
                  explanation: 'Chunking strategy sangat menentukan performa sistem RAG.'
                }
              ]
            }
          ]
        },
        {
          id: 'ai-machine-learning-m23',
          title: 'Module 23 — AI Agents',
          description: 'Agentic loops, memory, planning, dan tool execution.',
          lessons: [
            {
              id: 'aml-l-23-1',
              title: 'ReAct Loop (Reason + Act)',
              type: 'learn',
              xpReward: 50,
              content: [
                {
                  type: 'markdown',
                  content: `### Pola Agen AI ReAct
Agen beroperasi dalam siklus berulang:
$$\\text{Thought} \\rightarrow \\text{Action} \\rightarrow \\text{Observation}$$
Memungkinkan agen menyelesaikan tugas kompleks secara mandiri menggunakan alat eksternal (*tools*).`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `# Konsep dasar agent loop`
                }
              ]
            },
            {
              id: 'aml-l-23-2',
              title: 'Kuis Module 23 — AI Agents',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'aml-q-23-1',
                  question: 'Apa arti dari pola ReAct (Reason + Act) dalam arsitektur AI Agent?',
                  options: ['Agen bergantian melakukan penalaran (thought), bertindak (action), dan mengamati hasil (observation)', 'Reaksi cepat', 'Aksi tanpa berpikir', 'Matikan agent'],
                  correctAnswerIndex: 0,
                  explanation: 'ReAct menggabungkan penalaran dan eksekusi alat secara iteratif.'
                },
                {
                  id: 'aml-q-23-2',
                  question: 'Mengapa AI Agent memerlukan memori jangka panjang dan pendek?',
                  options: ['Untuk melacak progres tugas multi-langkah dan mengingat preferensi/konteks sebelumnya', 'Agar file besar', 'Wajib di HTML', 'Tidak diperlukan'],
                  correctAnswerIndex: 0,
                  explanation: 'Memori esensial untuk perencanaan tugas bertahap.'
                },
                {
                  id: 'aml-q-23-3',
                  question: 'Apa risiko terbesar dari agen AI yang memiliki otonomi tinggi (excessive agency)?',
                  options: ['Agen dapat mengeksekusi tindakan destruktif atau tidak diinginkan tanpa konfirmasi manusia', 'Komputer lambat', 'Koneksi internet putus', 'Baterai habis'],
                  correctAnswerIndex: 0,
                  explanation: 'Excessive agency memerlukan guardrails dan human-in-the-loop.'
                },
                {
                  id: 'aml-q-23-4',
                  question: 'Apa fungsi Tool Execution pada AI Agent?',
                  options: ['Memungkinkan agen berinteraksi dengan API, kalkulator, atau database untuk menyelesaikan tugas nyata', 'Memperbaiki hardware', 'Menyimpan password', 'Mengatur suhu'],
                  correctAnswerIndex: 0,
                  explanation: 'Tool execution memperluas kemampuan agen melampaui teks.'
                },
                {
                  id: 'aml-q-23-5',
                  question: 'Bagaimana cara mencegah agent terjebak dalam infinite loop (perulangan tanpa akhir)?',
                  options: ['Membatasi jumlah iterasi maksimum (max steps) per eksekusi misi', 'Membiarkannya selamanya', 'Mematikan listrik', 'Menghapus kode'],
                  correctAnswerIndex: 0,
                  explanation: 'Pembatasan step maksimum mencegah loop tak berujung.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'aml-lvl-9',
      title: 'Level 9 — Architecture, Deployment, MLOps, Security & Capstone',
      description: 'Arsitektur sistem AI, MLOps, keamanan defensif, optimasi, dan Capstone.',
      modules: [
        {
          id: 'ai-machine-learning-m24',
          title: 'Module 24 — AI Application Architecture',
          description: 'Desain sistem frontend, backend, orkestrasi AI, dan caching.',
          lessons: [
            {
              id: 'aml-l-24-1',
              title: 'Arsitektur Sistem AI Produksi',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Pola Pemisahan Lapisan AI
Memisahkan antarmuka pengguna, API gateway, agen orkestrasi, vector database, dan layanan model caching untuk latensi minimal.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `# Caching layer untuk respons LLM`
                }
              ]
            },
            {
              id: 'aml-l-24-2',
              title: 'Kuis Module 24 — AI Application Architecture',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'aml-q-24-1',
                  question: 'Mengapa caching respons LLM penting dalam arsitektur aplikasi AI skala besar?',
                  options: ['Menurunkan biaya API, memangkas latensi drastis untuk query serupa, dan meningkatkan skalabilitas', 'Membuat server panas', 'Menghapus database', 'Tidak penting'],
                  correctAnswerIndex: 0,
                  explanation: 'Semantic caching menghemat biaya dan waktu respons.'
                },
                {
                  id: 'aml-q-24-2',
                  question: 'Apa peran Backend API dalam aplikasi AI berbasis LLM?',
                  options: ['Menangani otentikasi, manajemen sesi, validasi input, guardrails, dan orkestrasi panggilan model', 'Hanya menampilkan tombol', 'Menyimpan gambar', 'Sebagai browser'],
                  correctAnswerIndex: 0,
                  explanation: 'Backend mengamankan dan mengorkestrasi logika bisnis.'
                },
                {
                  id: 'aml-q-24-3',
                  question: 'Bagaimana menangani operasi AI asinkron yang memakan waktu lama di backend?',
                  options: ['Menggunakan worker queue (misal Celery/Redis) dan arsitektur polling/websocket', 'Membiarkan request timeout', 'Menutup browser', 'Menggunakan JavaScript lama'],
                  correctAnswerIndex: 0,
                  explanation: 'Task queue mencegah HTTP timeout pada tugas berat.'
                },
                {
                  id: 'aml-q-24-4',
                  question: 'Apa itu Model Serving layer?',
                  options: ['Layanan khusus yang mengekspos model ML/AI melalui endpoint API inferensi yang dioptimalkan', 'Pelayan restoran', 'Penyimpanan file', 'Kabel LAN'],
                  correctAnswerIndex: 0,
                  explanation: 'Model serving mengekspos model ke aplikasi klien.'
                },
                {
                  id: 'aml-q-24-5',
                  question: 'Mengapa observabilitas (observability) sangat krusial dalam sistem AI produksi?',
                  options: ['Melacak token usage, latensi, error rate, dan kualitas output model secara real-time', 'Hanya untuk hiasan', 'Menambah ukuran file', 'Tidak diperlukan'],
                  correctAnswerIndex: 0,
                  explanation: 'AI systems bersifat non-deterministik sehingga butuh monitoring ketat.'
                }
              ]
            }
          ]
        },
        {
          id: 'ai-machine-learning-m25',
          title: 'Module 25 — AI API Engineering',
          description: 'REST API, streaming, rate limiting, dan error handling.',
          lessons: [
            {
              id: 'aml-l-25-1',
              title: 'Membangun AI API dengan FastAPI',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### FastAPI untuk AI
FastAPI menyediakan dokumentasi otomatis (Swagger), validasi tipe Pydantic, dan dukungan penuh untuk asynchronous streaming.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `from fastapi import FastAPI
app = FastAPI()

@app.post("/api/v1/generate")
async def generate_text(prompt: str):
    return {"status": "success", "response": "AI output"}`
                }
              ]
            },
            {
              id: 'aml-l-25-2',
              title: 'Kuis Module 25 — AI API Engineering',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'aml-q-025-1',
                  question: 'Apa keunggulan FastAPI untuk pengembangan API layanan AI?',
                  options: ['Performa tinggi (asinkron), validasi data otomatis via Pydantic, dan dokumentasi interaktif', 'Lambat', 'Hanya untuk PHP', 'Tanpa keamanan'],
                  correctAnswerIndex: 0,
                  explanation: 'FastAPI adalah standar modern API Python.'
                },
                {
                  id: 'aml-q-25-2',
                  question: 'Apa fungsi rate limiting pada endpoint API AI publik?',
                  options: ['Mencegah penyalahgunaan (abuse), serangan DoS, dan pembengkakan biaya tagihan API', 'Membuat server lambat', 'Menghapus database', 'Mengatur warna web'],
                  correctAnswerIndex: 0,
                  explanation: 'Rate limiting melindungi server dan anggaran biaya.'
                },
                {
                  id: 'aml-q-25-3',
                  question: 'Bagaimana cara mengembalikan respons streaming chunk dari FastAPI ke klien?',
                  options: ['Menggunakan StreamingResponse dengan generator asinkron', 'Mengembalikan string biasa', 'Menyimpan di file', 'Mematikan server'],
                  correctAnswerIndex: 0,
                  explanation: 'StreamingResponse mendukung pengiriman data bertahap.'
                },
                {
                  id: 'aml-q-25-4',
                  question: 'Mengapa validasi input (Pydantic models) sangat penting untuk endpoint AI?',
                  options: ['Menolak payload tidak valid atau berbahaya sebelum mencapai model AI', 'Membuat kode panjang', 'Menghemat RAM', 'Tidak penting'],
                  correctAnswerIndex: 0,
                  explanation: 'Validasi input mencegah malformasi dan injeksi.'
                },
                {
                  id: 'aml-q-25-5',
                  question: 'Apa arti HTTP status code 429 Too Many Requests?',
                  options: ['Klien telah melebihi batas kuota rate limit yang diizinkan', 'Server rusak', 'Sukses', 'Unauthorized'],
                  correctAnswerIndex: 0,
                  explanation: '429 dikembalikan saat rate limit terlampaui.'
                }
              ]
            }
          ]
        },
        {
          id: 'ai-machine-learning-m26',
          title: 'Module 26 — Model Deployment',
          description: 'Docker containerization, model serving, dan skalabilitas.',
          lessons: [
            {
              id: 'aml-l-26-1',
              title: 'Containerization Model AI dengan Docker',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Docker untuk AI
Memastikan dependensi Python, pustaka CUDA GPU, dan bobot model terbungkus dalam satu kontainer portabel yang konsisten di lingkungan dev dan prod.`
                },
                {
                  type: 'code-example',
                  language: 'dockerfile',
                  code: `FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "3000"]`
                }
              ]
            },
            {
              id: 'aml-l-26-2',
              title: 'Kuis Module 26 — Model Deployment',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'aml-q-26-1',
                  question: 'Apa manfaat utama menggunakan Docker dalam deployment model AI?',
                  options: ['Menyatukan seluruh dependensi dan lingkungan ke dalam kontainer yang konsisten (menghindari "it works on my machine")', 'Membuat model lebih akurat', 'Menghapus RAM', 'Mempercepat internet'],
                  correctAnswerIndex: 0,
                  explanation: 'Docker menjamin konsistensi lintas lingkungan.'
                },
                {
                  id: 'aml-q-26-2',
                  question: 'Apa tantangan khusus saat mendeploy model Deep Learning berukuran besar ke cloud?',
                  options: ['Kebutuhan sumber daya GPU besar, latensi tinggi, dan biaya infrastruktur', 'Terlalu mudah', 'Tanpa tantangan', 'Ukurannya sangat kecil'],
                  correctAnswerIndex: 0,
                  explanation: 'Model besar membutuhkan GPU dan optimasi memori.'
                },
                {
                  id: 'aml-q-26-3',
                  question: 'Apa itu ONNX (Open Neural Network Exchange)?',
                  options: ['Format terbuka untuk merepresentasikan model AI yang memungkinkan perpindahan antar framework (PyTorch ke TensorRT dll)', 'Bahasa pemrograman', 'Database', 'Protokol web'],
                  correctAnswerIndex: 0,
                  explanation: 'ONNX memungkinkan interoperabilitas antar framework.'
                },
                {
                  id: 'aml-q-26-4',
                  question: 'Bagaimana cara menskalakan layanan AI inference saat trafik melonjak tinggi?',
                  options: ['Menggunakan orkestrator seperti Kubernetes untuk menambah replika pod/kontainer secara otomatis', 'Mematikan server', 'Menambah RAM fisik manual', 'Menghapus endpoint'],
                  correctAnswerIndex: 0,
                  explanation: 'Kubernetes horizontal pod autoscaling menangani lonjakan trafik.'
                },
                {
                  id: 'aml-q-26-5',
                  question: 'Apa itu model quantization?',
                  options: ['Teknik mereduksi presisi bobot model (misal dari float32 ke int8) untuk menghemat memori dan mempercepat inferensi', 'Menambah bobot', 'Menghapus layer', 'Mengganti warna'],
                  correctAnswerIndex: 0,
                  explanation: 'Quantization memperkecil ukuran model dengan sedikit kompromi akurasi.'
                }
              ]
            }
          ]
        },
        {
          id: 'ai-machine-learning-m27',
          title: 'Module 27 — MLOps',
          description: 'Experiment tracking, model registry, dan ML pipelines.',
          lessons: [
            {
              id: 'aml-l-27-1',
              title: 'Experiment Tracking & Model Registry',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Pentingnya MLOps
Berbeda dengan software tradisional, sistem ML bergantung pada kode, data, dan hyperparameter. MLOps memastikan reproducibilitas melalui pelacakan eksperimen (*MLflow/Wandb*).`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `# Konsep pencatatan eksperimen ML`
                }
              ]
            },
            {
              id: 'aml-l-27-2',
              title: 'Kuis Module 27 — MLOps',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'aml-q-27-1',
                  question: 'Apa tujuan utama dari MLOps (Machine Learning Operations)?',
                  options: ['Mengotomatiskan dan menstandarisasi siklus hidup, pelatihan, deployment, dan monitoring model ML secara handal', 'Membuat game', 'Menulis artikel', 'Desain UI'],
                  correctAnswerIndex: 0,
                  explanation: 'MLOps menyatukan ML dan DevOps untuk produksi yang handal.'
                },
                {
                  id: 'aml-q-27-2',
                  question: 'Apa itu Model Registry?',
                  options: ['Pusat penyimpanan terpusat untuk mengelola versi, metadata, dan status staging/production model AI', 'Daftar hadir', 'Database password', 'Folder lokal'],
                  correctAnswerIndex: 0,
                  explanation: 'Model registry melacak versi model yang siap diproduksi.'
                },
                {
                  id: 'aml-q-27-3',
                  question: 'Apa itu Data Drift?',
                  options: ['Perubahan distribusi data di dunia nyata seiring waktu yang membuat akurasi model menurun', 'Perpindahan server', 'Kerusakan kabel', 'Pembaruan Python'],
                  correctAnswerIndex: 0,
                  explanation: 'Data drift menurunkan performa model seiring perubahan pola data.'
                },
                {
                  id: 'aml-q-27-4',
                  question: 'Mengapa experiment tracking penting bagi Data Scientist?',
                  options: ['Mencatat parameter, metrik, dan artifak setiap eksperimen agar hasil dapat direproduksi ulang', 'Menghabiskan waktu', 'Membuat server panas', 'Wajib di HTML'],
                  correctAnswerIndex: 0,
                  explanation: 'Tracking memastikan eksperimen reproducible.'
                },
                {
                  id: 'aml-q-27-5',
                  question: 'Apa itu CI/CD untuk machine learning?',
                  options: ['Continuous Integration / Continuous Deployment yang mengotomatisasi pengujian dan rilis pipeline model', 'Koneksi internet', 'Nama GPU', 'Format file'],
                  correctAnswerIndex: 0,
                  explanation: 'CI/CD otomatis menguji dan mendeploy pembaruan model.'
                }
              ]
            }
          ]
        },
        {
          id: 'ai-machine-learning-m28',
          title: 'Module 28 — AI Security',
          description: 'Defensive AI security, prompt injection defense, dan guardrails.',
          lessons: [
            {
              id: 'aml-l-28-1',
              title: 'Mitigasi Prompt Injection & Guardrails',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Keamanan Defensif AI
Menerapkan filter input (*guardrails*) untuk mendeteksi upaya prompt injection, kebocoran data sensitif (*PII*), dan eksekusi alat berbahaya sebelum mencapai LLM.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `# Validasi input guardrail keamanan`
                }
              ]
            },
            {
              id: 'aml-l-28-2',
              title: 'Kuis Module 28 — AI Security',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'aml-q-028-1',
                  question: 'Apa itu Prompt Injection dalam keamanan AI?',
                  options: ['Serangan di mana penyerang memasukkan instruksi terselubung untuk membajak sistem prompt LLM', 'Suntikan vaksin', 'Peningkatan RAM', 'Error coding'],
                  correctAnswerIndex: 0,
                  explanation: 'Prompt injection memanipulasi instruksi model oleh input jahat.'
                },
                {
                  id: 'aml-q-028-2',
                  question: 'Bagaimana cara kerja sistem Guardrails pada aplikasi LLM?',
                  options: ['Memeriksa dan menyaring input pengguna serta output model terhadap konten berbahaya, PII, atau injeksi', 'Mematikan server', 'Menghapus database', 'Mempercepat internet'],
                  correctAnswerIndex: 0,
                  explanation: 'Guardrails bertindak sebagai filter pengaman input/output.'
                },
                {
                  id: 'aml-q-028-3',
                  question: 'Apa itu kebocoran PII (Personally Identifiable Information) pada AI?',
                  options: ['Model tidak sengaja membocorkan data pribadi sensitif (seperti nomor KTP/kartu kredit pengguna) dalam responsnya', 'Koneksi internet lambat', 'Baterai habis', 'Format file salah'],
                  correctAnswerIndex: 0,
                  explanation: 'PII leakage melanggar privasi dan regulasi data.'
                },
                {
                  id: 'aml-q-028-4',
                  question: 'Mengapa eksekusi alat (tool execution) oleh AI harus divalidasi ketat?',
                  options: ['Mencegah agen menjalankan perintah destruktif (seperti menghapus file sistem via shell tool)', 'Agar kode lebih pendek', 'Menghemat RAM', 'Tidak penting'],
                  correctAnswerIndex: 0,
                  explanation: 'Validasi alat mencegah eksekusi perintah berbahaya.'
                },
                {
                  id: 'aml-q-028-5',
                  question: 'Apa prinsip utama dalam merancang keamanan aplikasi AI?',
                  options: ['Never trust user input, zero-trust architecture, dan validasi berlapis', 'Percaya semua input', 'Tanpa keamanan', 'Keamanan opsional'],
                  correctAnswerIndex: 0,
                  explanation: 'Prinsip zero-trust berlaku mutlak pada sistem AI.'
                }
              ]
            }
          ]
        },
        {
          id: 'ai-machine-learning-m29',
          title: 'Module 29 — AI Performance & Optimization',
          description: 'Latency, token efficiency, caching, dan quantization.',
          lessons: [
            {
              id: 'aml-l-29-1',
              title: 'Optimasi Latensi & Efisiensi Token LLM',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Strategi Efisiensi AI
Mengurangi ukuran prompt yang tidak perlu, menerapkan vLLM/PagedAttention untuk inference throughput tinggi, dan melakukan quantisasi model.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `# Pemangkasan context token yang berlebihan`
                }
              ]
            },
            {
              id: 'aml-l-29-2',
              title: 'Kuis Module 29 — AI Performance & Optimization',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'aml-q-29-1',
                  question: 'Mengapa efisiensi token sangat penting dalam aplikasi LLM produksi?',
                  options: ['Mengurangi biaya operasional API secara signifikan dan memangkas waktu latensi respons', 'Membuat server panas', 'Wajib dalam HTML', 'Tidak ada manfaat'],
                  correctAnswerIndex: 0,
                  explanation: 'Token berlebih langsung membengkakkan biaya dan latensi.'
                },
                {
                  id: 'aml-q-29-2',
                  question: 'Apa manfaat teknik Quantization pada model deep learning?',
                  options: ['Mengecilkan ukuran memori model dan mempercepat kecepatan inferensi dengan sedikit kompromi akurasi', 'Menambah ukuran file', 'Membuat model lebih lambat', 'Menghapus layer'],
                  correctAnswerIndex: 0,
                  explanation: 'Quantization sangat penting untuk efisiensi hardware.'
                },
                {
                  id: 'aml-q-29-3',
                  question: 'Apa itu TTFT (Time to First Token) dalam inferensi LLM?',
                  options: ['Waktu tunda sejak permintaan dikirim hingga token pertama muncul di layar', 'Waktu total download', 'Waktu boot server', 'Waktu kompilasi'],
                  correctAnswerIndex: 0,
                  explanation: 'TTFT mengukur seberapa cepat respons awal mulai diterima.'
                },
                {
                  id: 'aml-q-29-4',
                  question: 'Bagaimana cara mengurangi overhead token dalam RAG?',
                  options: ['Mengirim hanya chunk dokumen yang paling relevan dan meringkas konteks sebelum ke LLM', 'Mengirim seluruh buku ke LLM', 'Menghapus prompt', 'Mematikan server'],
                  correctAnswerIndex: 0,
                  explanation: 'Retrieved context pruning menjaga efisiensi token.'
                },
                {
                  id: 'aml-q-29-5',
                  question: 'Apa itu PagedAttention dalam serving LLM?',
                  options: ['Teknik manajemen memori KV cache yang efisien untuk mencegah pemborosan VRAM', 'Halaman web', 'Penyimpanan disk', 'Koneksi jaringan'],
                  correctAnswerIndex: 0,
                  explanation: 'PagedAttention mendongkrak throughput vLLM secara dramatis.'
                }
              ]
            }
          ]
        },
        {
          id: 'ai-machine-learning-m30',
          title: 'Module 30 — AI Engineering Capstone',
          description: 'Membangun platform AI produksi end-to-end.',
          lessons: [
            {
              id: 'aml-l-30-1',
              title: 'Capstone: Production AI Engineering Platform',
              type: 'project',
              xpReward: 250,
              content: [
                {
                  type: 'markdown',
                  content: `### Proyek Akhir: Production AI Engineering Platform
Rancang dan implementasikan aplikasi AI produksi lengkap:
1. **Frontend & Backend API:** Antarmuka interaktif dan FastAPI backend dengan streaming.
2. **RAG & Vector Search:** Ingesti dokumen dan retrieval semantik.
3. **AI Agents & Tools:** ReAct loop dengan guardrails keamanan.
4. **MLOps & Monitoring:** Logging telemetri dan evaluasi performa.

Selamat menyelesaikan kurikulum AI & Machine Learning Engineering COMMANDEV!`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `class ProductionAIPlatform:
    def __init__(self):
        print("AI Platform Initialized successfully.")
        
platform = ProductionAIPlatform()`
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
