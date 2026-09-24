import { Course } from '../types';

export const DEVSECOPS_DEPLOYMENT_COURSE: Course = {
  id: 'devsecops-deployment',
  title: 'DevSecOps, Cloud Deployment & Hardening',
  shortDescription: 'Linux server security, Docker container hardening, secure CI/CD pipelines, multi-cloud deployment, dan HTTP security headers.',
  description: 'Jangan biarkan keamanan hanya menjadi urusan akhir sebelum peluncuran. Integrasikan keamanan otomatis sejak baris kode pertama, bungkus dalam kontainer non-root, deploy ke server cloud, dan terapkan pengerasan (hardening) produksi.',
  icon: 'server',
  levels: [
    {
      id: 'ops-lvl-1',
      title: 'Stage 13 & 14 — Linux Server & Docker Security',
      description: 'Pengelolaan izin file Linux (chmod/chown), SSH hardening, firewall (ufw), Dockerfile minimal, dan kontainer non-root.',
      modules: [
        {
          id: 'ops-mod-docker-linux',
          title: 'Isolasi Kontainer & Keamanan Server',
          description: 'Membangun image kontainer yang ramping, bebas kerentanan, dan terisolasi.',
          lessons: [
            {
              id: 'ops-les-nonroot-docker',
              title: 'Prinsip Kontainer Non-Root & Minimal Base Image',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### Mengapa Jangan Menjalankan Kontainer Sebagai Root?

Secara default, jika Anda tidak menentukan user di \`Dockerfile\`, aplikasi akan dijalankan sebagai pengguna \`root\` di dalam kontainer. Jika ada kerentanan *container escape*, penyerang bisa mendapatkan kontrol penuh atas mesin host server!

#### 3 Aturan Emas Dockerfile Aman:
1. **Gunakan Minimal Base Image:** Gunakan \`node:20-alpine\` atau \`distroless\` untuk membuang paket utilitas OS yang tidak dibutuhkan (seperti curl, bash, atau gcc) yang bisa dipakai penyerang.
2. **Jalankan Sebagai Pengguna Non-Root:** Buat grup dan user khusus dengan hak akses terbatas.
3. **Multi-Stage Build:** Pisahkan tahap instalasi dependensi build (*compile*) dari tahap image runtime produksi untuk menjaga ukuran image kecil dan bersih dari tool development.`
                },
                {
                  type: 'code-example',
                  language: 'dockerfile',
                  code: `# 1. Stage Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 2. Stage Produksi (Bersih & Non-Root)
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Buat grup dan pengguna non-root
RUN addgroup -g 1001 nodejs && adduser -u 1001 -G nodejs -s /bin/sh -D commandevuser

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
RUN npm ci --only=production

# Ganti hak kepemilikan dan aktifkan user non-root
USER commandevuser
EXPOSE 3000
CMD ["node", "dist/server.cjs"]`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'ops-lvl-2',
      title: 'Stage 15 — DevSecOps Pipeline & Continuous Security',
      description: 'Pipeline CI/CD modern: Lint -> Unit Test -> Dependency Scan -> Secret Scan -> Security Test -> Staging -> Deploy.',
      modules: [
        {
          id: 'ops-mod-pipeline',
          title: 'Integrasi Keamanan Otomatis dalam CI/CD',
          description: 'Mencegah kode cacat atau kredensial bocor masuk ke branch utama.',
          lessons: [
            {
              id: 'ops-les-ci-pipeline',
              title: 'Anatomi Pipeline GitHub Actions / GitLab CI',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### "Shift-Left Security" dalam Siklus CI/CD

Alih-alih menunggu audit keamanan di akhir tahun, keamanan dijalankan otomatis setiap kali developer melakukan \`git push\` atau membuat Pull Request:

\`\`\`text
CODE ──> GIT PUSH ──> LINT (ESLint) ──> UNIT TEST ──> AUDIT DEPENDENSI (npm audit)
                           │
                           ▼
              SECRET SCANNING (Gitleaks) ──> BUILD DOCKER ──> DEPLOY STAGING
\`\`\`

Jika ada unit test yang gagal, secret API terdeteksi dalam kode, atau CVE kritis pada library, pipeline akan langsung **membatalkan proses build** dan memberi notifikasi ke developer.`
                },
                {
                  type: 'code-example',
                  language: 'yaml',
                  code: `name: DevSecOps CI Pipeline

on: [push, pull_request]

jobs:
  security-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          
      - name: Install Dependencies
        run: npm ci
        
      - name: Scan Secrets in Code (Gitleaks)
        uses: gitleaks/gitleaks-action@v2
        
      - name: Dependency Vulnerability Audit
        run: npm audit --audit-level=high
        
      - name: Run Test Suite
        run: npm test`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'ops-lvl-3',
      title: 'Stage 16 & 17 — Cloud Deployment & Security Hardening',
      description: 'Penyebaran ke VPS/Container, Reverse Proxy, serta pemasangan HTTP Security Headers (CSP, HSTS, X-Content-Type-Options).',
      modules: [
        {
          id: 'ops-mod-hardening',
          title: 'Pengerasan Server Produksi (Production Hardening)',
          description: 'Kunci pintu gerbang HTTP dengan headers dan konfigurasi cookie yang ketat.',
          lessons: [
            {
              id: 'ops-les-security-headers',
              title: 'HTTP Security Headers: HSTS, CSP & Proteksi Frame',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Pertahanan di Lapisan Header HTTP

Server web harus memberitahu browser bagaimana cara berinteraksi secara aman dengan konten Anda:

1. **Strict-Transport-Security (HSTS):** Memaksa browser hanya menggunakan koneksi HTTPS terenkripsi dan menolak downgrade ke HTTP.
2. **Content-Security-Policy (CSP):** Membatasi domain mana saja yang boleh mengeksekusi script, style, atau gambar di halaman web Anda (mitigasi XSS paling ampuh).
3. **X-Content-Type-Options: nosniff:** Mencegah browser menebak MIME-type file yang dapat memicu eksekusi kode berbahaya.
4. **X-Frame-Options: DENY:** Mencegah website Anda dimasukkan ke dalam \`<iframe>\` tersembunyi oleh situs lain (mencegah Clickjacking).
5. **Secure & SameSite Cookies:** Melindungi session token dari serangan CSRF dan penyadapan jaringan.`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `import helmet from 'helmet';
import express from 'express';

const app = express();

// Pasang proteksi HTTP Security Headers otomatis dengan Helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'trusted-cdn.com'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    hsts: {
      maxAge: 31536000, // 1 tahun
      includeSubDomains: true,
      preload: true
    }
  })
);`
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
