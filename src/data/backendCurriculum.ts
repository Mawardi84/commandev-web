import { Course } from '../types';

export const BACKEND_COURSE: Course = {
  id: 'backend-mastery',
  title: 'Backend Development & REST API',
  shortDescription: 'Bangun server handal, RESTful API, middleware, autentikasi JWT, validasi input, dan penanganan error standar produksi.',
  description: 'Pelajari arsitektur backend modern. Pahami siklus Request-Response, protokol HTTP, status code, routing di Express/Node.js, enkripsi password, dan arsitektur Controller-Service-Repository.',
  icon: 'server',
  levels: [
    {
      id: 'backend-lvl-0',
      title: 'Level 0 — Backend & HTTP Architecture',
      description: 'Bagaimana server bekerja, protokol HTTP, request methods, header, dan response body.',
      modules: [
        {
          id: 'backend-mod-1',
          title: 'Fondasi Server & Protokol HTTP',
          description: 'Client-Server model, HTTP Methods (GET, POST, PUT, DELETE), Status Codes.',
          lessons: [
            {
              id: 'backend-les-1',
              title: 'Anatomi Request & Response HTTP',
              type: 'learn',
              xpReward: 20,
              content: [
                {
                  type: 'markdown',
                  content: `### Bagaimana Backend Bekerja?

Backend adalah "dapur" dari sebuah aplikasi web. Ketika browser (klien) meminta data:
1. Browser mengirim **HTTP Request** (Method: GET/POST, URL: \`/api/courses\`, Headers, Body).
2. Server memproses logika (otentikasi, validasi, query database).
3. Server membalas dengan **HTTP Response** (Status Code: 200/404/500, JSON Body).

#### Metode HTTP Utama (CRUD):
- **GET**: Mengambil data (Read).
- **POST**: Membuat data baru (Create).
- **PUT / PATCH**: Mengubah data yang sudah ada (Update).
- **DELETE**: Menghapus data (Delete).`
                },
                {
                  type: 'code-example',
                  language: 'javascript',
                  code: `// Express.js Route Endpoint
app.get('/api/courses', (req, res) => {
  const courses = [
    { id: 1, title: 'HTML5 Fundamentals', level: 'Beginner' },
    { id: 2, title: 'Modern JavaScript', level: 'Intermediate' }
  ];
  res.status(200).json({ success: true, count: courses.length, data: courses });
});`
                }
              ]
            },
            {
              id: 'backend-les-quiz-1',
              title: 'Kuis HTTP Status Code & REST',
              type: 'quiz',
              xpReward: 25,
              questions: [
                {
                  id: 'bq-1',
                  question: 'Status code HTTP mana yang tepat ketika klien berhasil membuat data baru di server?',
                  options: ['200 OK', '201 Created', '204 No Content', '301 Moved Permanently'],
                  correctAnswerIndex: 1,
                  explanation: '`201 Created` adalah status code standar REST untuk operasi pembuatan resource baru yang sukses (biasanya method POST).'
                },
                {
                  id: 'bq-2',
                  question: 'Status code 401 Unauthorized artinya:',
                  options: ['Server mengalami internal crash', 'Resource tidak ditemukan', 'Klien belum terautentikasi (belum login/token invalid)', 'Akses ditolak karena batasan kuota'],
                  correctAnswerIndex: 2,
                  explanation: '`401 Unauthorized` menandakan permintaan gagal karena kredensial autentikasi belum diberikan atau tidak valid.'
                },
                {
                  id: 'bq-3',
                  question: 'Method HTTP apa yang digunakan secara konvensional untuk mengambil data tanpa mengubah state di server?',
                  options: ['POST', 'PUT', 'DELETE', 'GET'],
                  correctAnswerIndex: 3,
                  explanation: '`GET` bersifat idempotent dan safe, digunakan khusus untuk mengambil data.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'backend-lvl-1',
      title: 'Level 1 — Express.js Routing & Parameters',
      description: 'Membangun router modular, membaca req.params, req.query, dan req.body.',
      modules: [
        {
          id: 'backend-mod-2',
          title: 'Routing & Parameter Ekstraksi',
          description: 'Membaca URL params (:id), query string (?search=), dan JSON parsing.',
          lessons: [
            {
              id: 'backend-les-2',
              title: 'Membaca Request Params & Query Strings',
              type: 'learn',
              xpReward: 25,
              content: [
                {
                  type: 'markdown',
                  content: `### Mengambil Data dari Request

Express menyediakan tiga cara utama untuk membaca masukan pengguna:
- \`req.params\`: Nilai dari placeholder URL seperti \`/api/users/:userId\`
- \`req.query\`: Nilai query string setelah tanda tanya seperti \`/api/products?category=tech&page=2\`
- \`req.body\`: Payload data JSON yang dikirimkan via method POST/PUT (memerlukan middleware \`express.json()\`)`
                },
                {
                  type: 'code-example',
                  language: 'javascript',
                  code: `const express = require('express');
const app = express();

app.use(express.json()); // Middleware untuk parse body JSON

// 1. URL Parameter
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ message: \`Mengambil user dengan ID: \${userId}\` });
});

// 2. Query Strings
app.get('/api/search', (req, res) => {
  const { keyword, limit = 10 } = req.query;
  res.json({ search: keyword, limit: Number(limit) });
});`
                }
              ]
            },
            {
              id: 'backend-les-quiz-2',
              title: 'Kuis Parameter Express.js',
              type: 'quiz',
              xpReward: 25,
              questions: [
                {
                  id: 'bq-4',
                  question: 'Jika route didefinisikan sebagai `/items/:itemId` dan klien memanggil `/items/42`, bagaimana cara mengakses nilai 42 di Express?',
                  options: ['req.body.itemId', 'req.query.itemId', 'req.params.itemId', 'req.headers.itemId'],
                  correctAnswerIndex: 2,
                  explanation: 'Parameter yang diawali tanda titik dua (`:`) pada URL pattern dipetakan ke dalam objek `req.params`.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'backend-lvl-2',
      title: 'Level 2 — Middleware & Error Handling',
      description: 'Memahami konsep chain of responsibility middleware dan penanganan error terpusat.',
      modules: [
        {
          id: 'backend-mod-3',
          title: 'Middleware Architecture',
          description: 'Logger, Authentication guard, Validator, dan Global Error Handler.',
          lessons: [
            {
              id: 'backend-les-3',
              title: 'Menulis Custom Middleware & Next Function',
              type: 'learn',
              xpReward: 30,
              content: [
                {
                  type: 'markdown',
                  content: `### Apa itu Middleware?

Middleware adalah fungsi yang memiliki akses ke object **Request (\`req\`)**, **Response (\`res\`)**, dan fungsi **\`next\`** dalam siklus request-response aplikasi.

Tugas middleware meliputi:
- Menjalankan kode apapun (misal: logging waktu request).
- Mengubah objek request dan response.
- Menghentikan siklus request-response (misal: jika token tidak valid).
- Memanggil middleware berikutnya dalam stack menggunakan \`next()\`.`
                },
                {
                  type: 'code-example',
                  language: 'javascript',
                  code: `// Middleware Logger Sederhana
const requestLogger = (req, res, next) => {
  console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.url}\`);
  next(); // Lanjutkan ke handler berikutnya
};

app.use(requestLogger);

// Global Error Handler (4 arguments)
app.use((err, req, res, next) => {
  console.error("Internal Error:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'backend-lvl-3',
      title: 'Level 3 — Autentikasi JWT & Security',
      description: 'Enkripsi password dengan bcrypt, JSON Web Token (JWT), dan protected route guards.',
      modules: [
        {
          id: 'backend-mod-4',
          title: 'Autentikasi & Otorisasi API',
          description: 'Hasing bcrypt, penandatanganan JWT token, dan verifikasi header Bearer.',
          lessons: [
            {
              id: 'backend-les-4',
              title: 'Mekanisme Token JWT (JSON Web Token)',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### Bagaimana JWT Bekerja?

1. Klien mengirim email dan password ke \`/api/auth/login\`.
2. Server memvalidasi kredensial (membandingkan hash dengan \`bcrypt.compare\`).
3. Jika valid, server membuat **JWT token** bertandatangan digital (\`jwt.sign({ userId }, SECRET)\`).
4. Klien menyimpan token dan mengirimkannya di setiap request berikutnya via header:
\`\`\`http
Authorization: Bearer <token_string>
\`\`\`
5. Middleware server memverifikasi token (\`jwt.verify\`) sebelum mengizinkan akses ke data privat.`
                },
                {
                  type: 'code-example',
                  language: 'javascript',
                  code: `const jwt = require('jsonwebtoken');

// Auth Guard Middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Akses ditolak: Token tidak ditemukan' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'secretKey123', (err, user) => {
    if (err) return res.status(403).json({ success: false, message: 'Token tidak valid / kedaluwarsa' });
    req.user = user;
    next();
  });
};`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'backend-lvl-4',
      title: 'Level 4 — REST Architecture & Best Practices',
      description: 'Pola Controller-Service-Repository, paginasi, filter query, dan rate limiting.',
      modules: [
        {
          id: 'backend-mod-5',
          title: 'Arsitektur Skala Besar & Optimasi API',
          description: 'Separation of concerns, paginasi data besar, dan proteksi DoS.',
          lessons: [
            {
              id: 'backend-les-5',
              title: 'Pola Controller & Paginasi Data',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### Best Practice RESTful API

1. **Pola MVC / Controller-Service**: Pisahkan logika routing, validasi, dan akses data.
2. **Paginasi & Limit**: Jangan pernah mengembalikan jutaan data sekaligus. Selalu terapkan \`page\` dan \`limit\`.
3. **CORS (Cross-Origin Resource Sharing)**: Konfigurasikan domain mana yang diizinkan memanggil API Anda.`
                },
                {
                  type: 'code-example',
                  language: 'javascript',
                  code: `// Contoh implementasi pagination pada endpoint
app.get('/api/v1/articles', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  res.json({
    page,
    limit,
    totalRecords: 120,
    totalPages: Math.ceil(120 / limit),
    data: articles.slice(offset, offset + limit)
  });
});`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'backend-lvl-5',
      title: 'Level 5 — Proyek Nyata Backend',
      description: 'Membangun REST API E-Commerce lengkap dengan endpoint publik, privat, dan checkout.',
      modules: [
        {
          id: 'backend-mod-6',
          title: 'Capstone: E-Commerce RESTful API Service',
          description: 'Membangun arsitektur API lengkap dengan Express, Middleware, dan Auth.',
          lessons: [
            {
              id: 'backend-les-project',
              title: 'Proyek Terpandu: RESTful API Store',
              type: 'practice',
              xpReward: 100,
              content: [
                {
                  type: 'markdown',
                  content: `### Capstone Project: Backend E-Commerce API

Rancang dan uji coba endpoint API menggunakan **REST API Client & Tester** di menu Playground:
1. \`GET /api/v1/courses\` — Mengambil katalog
2. \`POST /api/v1/auth/login\` — Mendapatkan token JWT
3. \`POST /api/v1/challenges/submit\` — Mengirim tugas dengan Bearer Token
4. \`PUT /api/v1/users/profile\` — Memperbarui profil pengguna`
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
