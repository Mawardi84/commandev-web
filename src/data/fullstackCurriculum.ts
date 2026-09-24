import { Course } from '../types';

export const FULLSTACK_COURSE: Course = {
  id: 'fullstack-mastery',
  title: 'Full Stack Development',
  shortDescription: 'Integrasikan Frontend modern (React/Tailwind), Backend API (Node/Express), Database, dan Deployment ke cloud container.',
  description: 'Menjadi engineer serba bisa. Pelajari cara merancang arsitektur end-to-end, menghubungkan antarmuka interaktif dengan API server, menangani session/token otentikasi, mengoptimalkan query, dan meluncurkan aplikasi ke internet.',
  icon: 'layers',
  levels: [
    {
      id: 'fs-lvl-0',
      title: 'Level 0 — End-to-End Architecture',
      description: 'Bagaimana frontend, backend API, database, dan cloud hosting berkolaborasi dalam satu ekosistem produksi.',
      modules: [
        {
          id: 'fs-mod-1',
          title: 'Integrasi Frontend & Backend',
          description: 'CORS, API Contract, State Management & Data Fetching.',
          lessons: [
            {
              id: 'fs-les-1',
              title: 'Anatomi Aplikasi Web Full Stack Modern',
              type: 'learn',
              xpReward: 25,
              content: [
                {
                  type: 'markdown',
                  content: `### Siklus Aplikasi Full Stack

Aplikasi full stack menggabungkan tiga pilar penting:
1. **Client Layer (Frontend):** React/Tailwind untuk UI interaktif, validasi form, dan state lokal.
2. **Server Layer (Backend):** Node.js/Express untuk API endpoints, autentikasi aman, dan business logic.
3. **Storage Layer (Database):** SQL/NoSQL untuk persistensi data relasional maupun dokumen.`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `// Frontend fetching dari backend API
async function loadUserData(token: string) {
  const res = await fetch('/api/user/profile', {
    headers: { 
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    }
  });
  if (!res.ok) throw new Error('Unauthorized');
  return await res.json();
}`
                }
              ]
            },
            {
              id: 'fs-les-quiz-1',
              title: 'Kuis Konsep Full Stack & CORS',
              type: 'quiz',
              xpReward: 25,
              questions: [
                {
                  id: 'fsq-1',
                  question: 'Masalah keamanan apa yang dicegah oleh mekanisme CORS (Cross-Origin Resource Sharing) di browser?',
                  options: [
                    'Mencegah script berbahaya di satu domain mengakses resource di domain lain tanpa izin server',
                    'Mencegah server mengalami kehabisan memori RAM',
                    'Mengenkripsi kode JavaScript di sisi browser',
                    'Mempercepat waktu loading asset gambar'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'CORS adalah mekanisme keamanan browser yang membatasi HTTP request lintas origin (beda domain/port) kecuali server mengizinkannya secara eksplisit.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'fs-lvl-1',
      title: 'Level 1 — Client Data Fetching & State Synchronization',
      description: 'Menangani state loading, error, dan caching pada React menggunakan Async Hooks.',
      modules: [
        {
          id: 'fs-mod-2',
          title: 'Manajemen State Asynchronous',
          description: 'Custom hooks data fetching, error boundaries, dan optimistic UI updates.',
          lessons: [
            {
              id: 'fs-les-2',
              title: 'Pola Data Fetching & Optimistic UI',
              type: 'learn',
              xpReward: 30,
              content: [
                {
                  type: 'markdown',
                  content: `### 3 State Wajib Saat Fetching:
1. **Loading State**: Tampilkan skeleton atau spinner agar UX terasa responsif.
2. **Success / Data State**: Render data yang diterima dari API server.
3. **Error State**: Tampilkan pesan kesalahan yang manusiawi dan opsi "Coba Lagi" (*Retry*).`
                },
                {
                  type: 'code-example',
                  language: 'tsx',
                  code: `function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/v1/courses')
      .then(res => res.json())
      .then(data => {
        setCourses(data.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Gagal memuat data kursus');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4">Memuat data...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-2 gap-4">
      {courses.map(c => <div key={c.id}>{c.title}</div>)}
    </div>
  );
}`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'fs-lvl-2',
      title: 'Level 2 — Full Stack Authentication & Protected Routes',
      description: 'Menyimpan token autentikasi, Refresh Token rotation, dan Protected Routes di React.',
      modules: [
        {
          id: 'fs-mod-3',
          title: 'Sistem Login & Keamanan End-to-End',
          description: 'Auth Context Provider, interceptor Axios/Fetch, dan redirect login otomatis.',
          lessons: [
            {
              id: 'fs-les-3',
              title: 'Membangun React Auth Provider',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### Alur Autentikasi Full Stack:
1. Form Login di React mengirim POST request dengan email dan password.
2. Server merespon dengan token JWT dan data profil user.
3. React menyimpan token di secure storage / memory dan mengupdate \`AuthContext\`.
4. Komponen \`<ProtectedRoute>\` memeriksa keberadaan user sebelum merender halaman rahasia.`
                },
                {
                  type: 'code-example',
                  language: 'tsx',
                  code: `const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'fs-lvl-3',
      title: 'Level 3 — Realtime WebSockets & Push Updates',
      description: 'Komunikasi dua arah secara real-time tanpa polling berkala menggunakan WebSocket.',
      modules: [
        {
          id: 'fs-mod-4',
          title: 'Komunikasi Dua Arah Real-time',
          description: 'Event broadcasting, chat room, notifikasi instan, dan live leaderboard.',
          lessons: [
            {
              id: 'fs-les-4',
              title: 'Menerapkan WebSocket di Frontend & Backend',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Mengapa WebSocket?

Berbeda dengan HTTP biasa yang bersifat *request-response* satu arah, **WebSocket** membuka koneksi persisten TCP sehingga server dapat mengirimkan data ke browser kapanpun ada perubahan secara instan.`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `// React WebSocket Listener
useEffect(() => {
  const socket = new WebSocket('wss://api.commandev.dev/ws');
  
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'NEW_ACHIEVEMENT') {
      triggerConfetti(data.payload);
    }
  };

  return () => socket.close();
}, []);`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'fs-lvl-4',
      title: 'Level 4 — Deployment, Containers & CI/CD',
      description: 'Membungkus aplikasi dengan Docker Container, variabel environment, dan deploy ke Cloud.',
      modules: [
        {
          id: 'fs-mod-5',
          title: 'Production Build & Containerization',
          description: 'Multi-stage Dockerfile, Nginx reverse proxy, dan zero-downtime deployment.',
          lessons: [
            {
              id: 'fs-les-5',
              title: 'Prinsip 12-Factor App & Environment Variables',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Menjaga Rahasia & Keamanan Produksi:
- Jangan pernah menyimpan \`API_KEY\` atau \`DATABASE_URL\` di kode frontend yang ter-bundle.
- Gunakan file \`.env\` di sisi server.
- Terapkan rate limiting dan sanitasi input untuk mencegah XSS dan SQL Injection.`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'fs-lvl-5',
      title: 'Level 5 — Capstone Full Stack Applications',
      description: 'Membangun aplikasi full-stack lengkap dari frontend, API backend, hingga database relasional.',
      modules: [
        {
          id: 'fs-mod-6',
          title: 'Capstone: Production Full-Stack Application',
          description: 'Integrasi lengkap React, Express, Database SQL, dan REST API Client.',
          lessons: [
            {
              id: 'fs-les-project',
              title: 'Proyek Terpandu: COMMANDEV Learning Management System',
              type: 'practice',
              xpReward: 120,
              content: [
                {
                  type: 'markdown',
                  content: `### Capstone Full Stack Project: LMS Platform

Bangun dan uji coba seluruh komponen aplikasi:
1. **Frontend**: Antarmuka React 18 dengan dashboard siswa dan tracking kemajuan.
2. **Backend**: Express API dengan middleware otentikasi JWT dan paginasi data.
3. **Database**: Skema SQL relasional menghubungkan tabel pengguna, kursus, dan pendaftaran.`
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
