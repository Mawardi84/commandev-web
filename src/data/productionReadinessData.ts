export interface ReadinessAuditItem {
  id: string;
  category: 'Functionality' | 'Testing' | 'Auth' | 'DataSecurity' | 'InfraHeaders' | 'Observability' | 'A11y';
  title: string;
  description: string;
  status: 'PASS' | 'WARN' | 'FAIL';
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  affectedComponent: string;
  evidence: string;
  whyItMatters: string;
  remediation: string;
  retestRequirement: string;
  techStack: ('react-node' | 'python-fastapi' | 'static-web')[];
}

export const PRODUCTION_READINESS_ITEMS: ReadinessAuditItem[] = [
  {
    id: 'gate-auth-hash',
    category: 'Auth',
    title: 'Password Hashing Kuat (Bcrypt/Argon2id)',
    description: 'Password pengguna tidak pernah disimpan dalam bentuk teks biasa atau hash MD5/SHA1 usang.',
    status: 'PASS',
    severity: 'CRITICAL',
    affectedComponent: 'Backend Auth Module',
    evidence: 'Verifikasi model penyimpanan menunjukkan penggunaan bcrypt dengan cost factor 12.',
    whyItMatters: 'Hash MD5 atau SHA1 dapat dipecahkan dalam hitungan detik menggunakan GPU modern dan rainbow tables.',
    remediation: 'Pertahankan implementasi bcrypt/argon2id dengan work factor seimbang.',
    retestRequirement: 'Simulasi registrasi akun baru dan periksa format hash pada record database ($2b$12$...).',
    techStack: ['react-node', 'python-fastapi']
  },
  {
    id: 'gate-auth-cookies',
    category: 'Auth',
    title: 'Flag Session Cookie: HttpOnly & SameSite',
    description: 'Session cookie wajib berflag HttpOnly (mencegah pencurian XSS) dan SameSite=Lax/Strict (mencegah CSRF).',
    status: 'PASS',
    severity: 'HIGH',
    affectedComponent: 'HTTP Cookie Middleware',
    evidence: 'Header Set-Cookie menyertakan atribut HttpOnly; Secure; SameSite=Lax.',
    whyItMatters: 'Tanpa HttpOnly, skrip jahat yang disuntikkan dapat membaca cookie sesi via document.cookie.',
    remediation: 'Pastikan konfigurasi express-session atau FastAPI session selalu menyalakan httpOnly: true dan secure: true.',
    retestRequirement: 'Periksa tab DevTools Application -> Cookies dan pastikan kolom HttpOnly dicentang.',
    techStack: ['react-node', 'python-fastapi']
  },
  {
    id: 'gate-idor-guard',
    category: 'Auth',
    title: 'Verifikasi Kepemilikan Data (IDOR Shield)',
    description: 'Seluruh endpoint pengambil data (/api/orders/:id, /api/docs/:id) memverifikasi ID user pemilik.',
    status: 'PASS',
    severity: 'CRITICAL',
    affectedComponent: 'REST Controllers',
    evidence: 'Middleware autentikasi menyaring query dengan klausa WHERE owner_id = req.user.id.',
    whyItMatters: 'IDOR memungkinkan penyerang menebak ID urut untuk mendownload ribuan data milik akun lain.',
    remediation: 'Wajibkan pemeriksaan otorisasi pada setiap controller bisnis sebelum data dikembalikan.',
    retestRequirement: 'Kirim request dengan token User A meminta resource milik User B, pastikan respon 403 Forbidden.',
    techStack: ['react-node', 'python-fastapi']
  },
  {
    id: 'gate-input-sqli',
    category: 'DataSecurity',
    title: 'Parameterized Queries & Bebas SQLi',
    description: 'Tidak ada konkatenasi string variabel langsung ke dalam perintah SQL query.',
    status: 'PASS',
    severity: 'CRITICAL',
    affectedComponent: 'Database Repository Layer',
    evidence: 'Seluruh query menggunakan placeholder parameterized ($1, $2 atau ?) dan ORM Drizzle/Prisma.',
    whyItMatters: 'SQLi memungkinkan penyerang melewati login, membaca kredensial, atau menghapus tabel database.',
    remediation: 'Gunakan prepared statements pada 100% interaksi database.',
    retestRequirement: 'Uji injeksi string \' OR \'1\'=\'1 pada input pencarian dan form login.',
    techStack: ['react-node', 'python-fastapi']
  },
  {
    id: 'gate-sec-headers',
    category: 'InfraHeaders',
    title: 'HTTP Security Headers (HSTS, CSP, X-Frame-Options)',
    description: 'Server merespons dengan header keamanan lengkap untuk membatasi aksi manipulasi browser.',
    status: 'WARN',
    severity: 'MEDIUM',
    affectedComponent: 'Reverse Proxy / Web Server',
    evidence: 'Strict-Transport-Security dan X-Content-Type-Options aktif, namun Content-Security-Policy masih menggunakan default permissif.',
    whyItMatters: 'CSP yang terlalu longgar memudahkan penyerang memuat skrip berbahaya dari domain asing.',
    remediation: 'Perketat directive CSP: tentukan domain scriptSrc yang diperbolehkan secara eksplisit.',
    retestRequirement: 'Jalankan curl -I https://app.example.com dan evaluasi header Content-Security-Policy.',
    techStack: ['react-node', 'python-fastapi', 'static-web']
  },
  {
    id: 'gate-secrets-env',
    category: 'DataSecurity',
    title: 'Isolasi Kredensial & Secrets Management',
    description: 'Tidak ada API secret, database password, atau private key yang ter-commit ke Git repositori.',
    status: 'PASS',
    severity: 'CRITICAL',
    affectedComponent: 'Source Repository & Deployment Env',
    evidence: '.gitignore mengabaikan file .env dan secret dimuat melalui runtime cloud environment variables.',
    whyItMatters: 'Kredensial publik dalam repositori Git dapat dideteksi oleh bot pemindai dalam hitungan detik.',
    remediation: 'Gunakan Secret Manager dan pasang scanning pre-commit hook (Gitleaks).',
    retestRequirement: 'Lakukan audit riwayat commit Git (git log -p) untuk memastikan ketiadaan pola secret.',
    techStack: ['react-node', 'python-fastapi', 'static-web']
  },
  {
    id: 'gate-deps-audit',
    category: 'DataSecurity',
    title: 'Audit Dependensi Bebas Kerentanan Kritis (CVE)',
    description: 'Package open-source pihak ketiga bebas dari kerentanan High atau Critical.',
    status: 'PASS',
    severity: 'HIGH',
    affectedComponent: 'Package Manifest (package.json / requirements.txt)',
    evidence: 'npm audit dan pip-audit melaporkan 0 vulnerabilities.',
    whyItMatters: 'Dependensi yang rentan dapat dimanfaatkan untuk eksekusi kode jarak jauh (RCE) via supply chain.',
    remediation: 'Jalankan npm audit fix berkala dan kunci dependensi dengan lockfile.',
    retestRequirement: 'Jalankan npm audit --audit-level=high dalam pipeline CI/CD.',
    techStack: ['react-node', 'python-fastapi']
  },
  {
    id: 'gate-monitoring-health',
    category: 'Observability',
    title: 'Health Check & Crash Logging',
    description: 'Endpoint /health siap merespons orchestrator dan log error terpusat aktif.',
    status: 'PASS',
    severity: 'MEDIUM',
    affectedComponent: 'Observability Module',
    evidence: 'GET /health mengembalikan HTTP 200 dengan status database dan memory uptime.',
    whyItMatters: 'Tanpa health check, load balancer dapat mengarahkan lalu lintas ke instans server yang sudah crash.',
    remediation: 'Pertahankan endpoint health check ringan tanpa melakukan kalkulasi berat.',
    retestRequirement: 'Lakukan panggilan curl ke /health saat database aktif dan pastikan status 200 OK.',
    techStack: ['react-node', 'python-fastapi']
  },
  {
    id: 'gate-backup-test',
    category: 'DataSecurity',
    title: 'Strategi Backup & Uji Coba Pemulihan (RTO/RPO)',
    description: 'Cadangan database otomatis dibuat setiap 24 jam dan pernah diuji coba restore.',
    status: 'WARN',
    severity: 'HIGH',
    affectedComponent: 'Database Operations',
    evidence: 'Snapshots harian aktif di cloud provider, namun simulasi pemulihan belum dijalankan dalam 30 hari terakhir.',
    whyItMatters: 'Backup yang tidak pernah diuji coba pemulihannya seringkali korup atau gagal saat bencana nyata terjadi.',
    remediation: 'Jadwalkan latihan simulasi pemulihan (disaster recovery drill) berkala di staging environment.',
    retestRequirement: 'Restore snapshot database ke instance sementara dan verifikasi keutuhan tabel utama.',
    techStack: ['react-node', 'python-fastapi']
  },
  {
    id: 'gate-a11y-wcag',
    category: 'A11y',
    title: 'Aksesibilitas Keyboard & Kontras Warna (WCAG AA)',
    description: 'Semua navigasi dan kontrol tombol dapat diakses via keyboard dan kontras teks memenuhi syarat 4.5:1.',
    status: 'PASS',
    severity: 'LOW',
    affectedComponent: 'Frontend UI Components',
    evidence: 'Pengujian navigasi tab dan audit kontras warna lulus standar WCAG 2.1 AA.',
    whyItMatters: 'Memastikan software inklusif bagi seluruh pengguna termasuk yang menggunakan alat bantu screen reader.',
    remediation: 'Pertahankan elemen semantik HTML dan jangan hapus styling fokus keyboard.',
    retestRequirement: 'Navigasikan seluruh alur form hanya menggunakan tombol Tab, Shift+Tab, dan Enter.',
    techStack: ['react-node', 'python-fastapi', 'static-web']
  },
  {
    id: 'gate-rate-limiting',
    category: 'InfraHeaders',
    title: 'Rate Limiting & Perlindungan Anti-Brute-Force',
    description: 'Pembatasan laju permintaan (rate limiter) pada endpoint sensitif (/api/login, /api/auth, /api/reset-password).',
    status: 'PASS',
    severity: 'HIGH',
    affectedComponent: 'API Gateway / Express Rate Limit Middleware',
    evidence: 'Maksimum 5 percobaan gagal per IP per menit sebelum HTTP 429 Too Many Requests aktif.',
    whyItMatters: 'Mencegah serangan pembobolan password massal otomatis (credential stuffing) dan penolakan layanan (DoS).',
    remediation: 'Pasang express-rate-limit atau Redis-backed token bucket pada router autentikasi.',
    retestRequirement: 'Kirim 10 request POST simultan ke /api/login dan pastikan request ke-6 mengembalikan status 429.',
    techStack: ['react-node', 'python-fastapi']
  },
  {
    id: 'gate-uu-pdp-compliance',
    category: 'DataSecurity',
    title: 'Kepatuhan UU PDP No. 27/2022 & Data Minimization',
    description: 'Persetujuan eksplisit tercatat, enkripsi data pribadi saat disimpan (AES-256), dan tersedianya alur penghapusan data.',
    status: 'PASS',
    severity: 'CRITICAL',
    affectedComponent: 'User Data Management & Privacy Service',
    evidence: 'Data PII terenkripsi pada level database dan audit log tidak merekam informasi sensitif pengguna.',
    whyItMatters: 'Pelanggaran UU PDP dapat berakibat sanksi administratif dan denda pidana hingga Rp 50 miliar.',
    remediation: 'Terapkan enkripsi kolom PII dan pastikan endpoint pembersihan data pengguna berfungsi teruji.',
    retestRequirement: 'Audit skema database dan verifikasi ketiadaan PII plain-text pada log console atau third-party analytics.',
    techStack: ['react-node', 'python-fastapi']
  },
  {
    id: 'gate-docker-nonroot-hardening',
    category: 'InfraHeaders',
    title: 'Container Hardening: Multi-Stage & User Non-Root',
    description: 'Dockerfile produksi menggunakan alpine base image minimalis dan dieksekusi dengan user non-root.',
    status: 'PASS',
    severity: 'HIGH',
    affectedComponent: 'Docker Container Runtime',
    evidence: 'Direktif USER node aktif di Dockerfile runner dan base image bebas CVE High/Critical.',
    whyItMatters: 'Menjalankan kontainer sebagai root memungkinkan penyerang menembus kernel host saat terjadi container escape.',
    remediation: 'Gunakan USER node atau buat group/user terisolasi di Linux container.',
    retestRequirement: 'Jalankan "docker exec <container-id> whoami" dan pastikan output bukan "root".',
    techStack: ['react-node', 'python-fastapi']
  },
  {
    id: 'gate-branch-protection-ci',
    category: 'Testing',
    title: 'Branch Protection & Automated CI/CD Gates',
    description: 'Branch main terlindungi: wajib pull request, review peer engineer, dan status CI test hijau sebelum merge.',
    status: 'PASS',
    severity: 'MEDIUM',
    affectedComponent: 'Version Control (GitHub / GitLab)',
    evidence: 'Branch ruleset mewajibkan status check linter, unit test, dan security audit lolos 100%.',
    whyItMatters: 'Mencegah kode coba-coba atau bug regresi terdorong langsung (force push) ke lini produksi.',
    remediation: 'Aktifkan Require Pull Request Reviews dan Require Status Checks to Pass di GitHub settings.',
    retestRequirement: 'Coba push langsung git push origin main dari terminal lokal dan pastikan ditolak (rejected).',
    techStack: ['react-node', 'python-fastapi', 'static-web']
  }
];
