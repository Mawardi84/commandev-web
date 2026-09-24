import { Course } from '../types';

export const RELIABILITY_OBSERVABILITY_COURSE: Course = {
  id: 'production-readiness',
  title: 'Observability, Privacy & Production Readiness',
  shortDescription: 'Monitoring, incident response, disaster recovery (RTO/RPO), UU PDP privasi data, dan evaluasi gerbang kesiapan produksi.',
  description: 'Tahap produksi bukanlah akhir perjalanan, melainkan awal dari siklus pemeliharaan berkelanjutan: pantau kesehatan sistem dengan metrik dan log, tangani insiden dengan sigap, jaga privasi pengguna sesuai regulasi, dan pastikan setiap rilis lolos Production Readiness Gate.',
  icon: 'activity',
  levels: [
    {
      id: 'rel-lvl-1',
      title: 'Stage 18 & 19 — Performance, Scalability & Accessibility',
      description: 'Optimasi performa frontend/backend, caching, optimasi query, dan aksesibilitas ramah pembaca layar (WCAG 2.1).',
      modules: [
        {
          id: 'rel-mod-perf-a11y',
          title: 'Performa Tinggi & Aksesibilitas Terbuka',
          description: 'Aplikasi produksi berkualitas tinggi harus cepat, andal, dan dapat diakses oleh semua orang.',
          lessons: [
            {
              id: 'rel-les-a11y-wcag',
              title: 'Web Accessibility (A11y) & Navigasi Keyboard',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### Kualitas Produksi Menyertakan Aksesibilitas (WCAG)

Software kelas dunia dapat diakses oleh semua kalangan, termasuk pengguna dengan disabilitas penglihatan atau motorik:

1. **Semantic HTML:** Gunakan elemen bawaan browser (\`<button>\`, \`<nav>\`, \`<main>\`, \`<header>\`, \`<article>\`) daripada \`<div onClick>\`. Elemen semantik memiliki dukungan keyboard bawaan (tombol Enter dan Spasi) serta diumumkan dengan jelas oleh Screen Reader.
2. **Keyboard Navigation & Focus Management:** Pastikan pengguna dapat menelusuri seluruh fitur hanya menggunakan tombol \`Tab\` dan \`Shift+Tab\`. Jangan pernah menghapus outline fokus (\`outline: none\`) tanpa menyediakan styling pengganti yang jelas!
3. **Kontras Warna:** Teks harus memiliki rasio kontras minimum 4.5:1 terhadap latar belakang (WCAG AA).`
                },
                {
                  type: 'code-example',
                  language: 'html',
                  code: `<!-- ❌ Buruk: Div tidak dapat diakses keyboard dan tidak terbaca screen reader -->
<div class="btn" onclick="submitData()">Simpan Data</div>

<!-- ✅ Benar: Tombol semantik dengan label aksesibel dan feedback status -->
<button 
  type="submit" 
  class="px-4 py-2 bg-indigo-600 text-white rounded-lg focus:ring-2 focus:ring-indigo-400"
  aria-label="Simpan perubahan profil Anda"
>
  Simpan Data
</button>`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'rel-lvl-2',
      title: 'Stage 20 & 21 — Observability & Incident Response',
      description: 'Pemantauan 4 pilar (Logs, Metrics, Errors, Health Checks), alerting, dan respon tanggap darurat saat insiden keamanan terjadi.',
      modules: [
        {
          id: 'rel-mod-monitoring',
          title: 'Observabilitas Sistem & Respon Insiden',
          description: 'Mendeteksi anomali sebelum pengguna melaporkan error ke media sosial.',
          lessons: [
            {
              id: 'rel-les-incident-triage',
              title: 'Langkah Tanggap Insiden Keamanan (Incident Response)',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### Apa yang Harus Dilakukan Saat Terjadi Insiden Keamanan?

Contoh skenario: *"Sebuah API Secret Key penyedia pembayaran tidak sengaja ter-commit ke repositori publik."*

#### 6 Langkah Protokol Respons Insiden Defensif:
1. **Identifikasi & Verifikasi:** Konfirmasi kredensial apa yang terekspos dan level aksesnya.
2. **Penyekatan (Containment):** **Segera cabut (revoke)** kredensial tersebut dari dashboard penyedia API dan buat kunci baru. Jangan sekadar menghapus commit Git, karena cache Git dan crawler bot sudah menyalinnya dalam hitungan detik.
3. **Penyelidikan (Investigation):** Periksa log akses API: Apakah ada transaksi anomali atau penarikan data ilegal yang terjadi selama kunci terekspos?
4. **Pemulihan (Recovery):** Masukkan kredensial baru ke environment server produksi dengan aman dan uji konektivitas.
5. **Pencegahan Berulang:** Pasang pre-commit hook (misal: Husky + Gitleaks) agar rahasia tidak pernah bisa ter-commit lagi di masa depan.
6. **Post-Mortem Review:** Dokumentasikan kronologi kejadian secara transparan tanpa menyalahkan individu (*blameless post-mortem*) untuk memperkuat sistem.`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'rel-lvl-3',
      title: 'Stage 22 & 23 — Backup, Disaster Recovery & UU PDP',
      description: 'Strategi backup data (RTO & RPO), simulasi pemulihan bencana, serta prinsip perlindungan data pribadi (UU PDP Indonesia).',
      modules: [
        {
          id: 'rel-mod-backup-pdp',
          title: 'Ketahanan Data & Kepatuhan Privasi (UU PDP)',
          description: 'Melindungi privasi data warga dan memastikan data dapat dipulihkan dalam kondisi bencana.',
          lessons: [
            {
              id: 'rel-les-uupdp-privacy',
              title: 'Prinsip Perlindungan Data Pribadi (UU PDP Indonesia)',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### Rekayasa Perangkat Lunak Sadar Privasi (Privacy by Design)

Berdasarkan Undang-Undang Perlindungan Data Pribadi (UU PDP No. 27 Tahun 2022) di Indonesia dan standar global:

1. **Prinsip Minimasi Data (Data Minimization):**
   Hanya kumpulkan data pribadi yang benar-benar esensial untuk tujuan pemrosesan aplikasi. Jika fitur hanya butuh konfirmasi umur 18+, jangan simpan tanggal lahir lengkap atau nomor KTP!
2. **Batasan Retensi Data:**
   Hapus atau anonimkan data pengguna saat akun ditutup atau saat masa retensi tujuan pemrosesan telah selesai.
3. **Hak Subjek Data:**
   Sistem harus menyediakan mekanisme bagi pengguna untuk memperbarui data, meminta salinan data, atau meminta penghapusan akun (*right to be forgotten*).
4. **Enkripsi Data Sensitif:**
   Data nomor identitas, rekam medis, atau data finansial wajib dienkripsi saat transit (TLS 1.3) maupun saat tersimpan di disk database (*encryption at rest*).`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'rel-lvl-4',
      title: 'Stage 24 — Production Readiness Gate',
      description: 'Pintu gerbang peluncuran: Audit komprehensif fungsionalitas, keamanan, performa, database, dan observabilitas sebelum rilis.',
      modules: [
        {
          id: 'rel-mod-readiness-gate',
          title: 'Audit Gerbang Kesiapan Produksi (Go-Live Gate)',
          description: 'Mengevaluasi kesiapan sistem secara objektif dan transparan sebelum membuka traffic untuk publik.',
          lessons: [
            {
              id: 'rel-les-readiness-audit',
              title: 'Kriteria Kelulusan Production Readiness Gate',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Tidak Ada Istilah "100% Aman", Yang Ada Adalah "Kesiapan Mengelola Risiko"

Sebelum sebuah aplikasi dideploy ke server produksi, seluruh pilar berikut wajib ditinjau:

| Pilar Evaluasi | Kriteria Kelulusan | Status Evaluasi |
| :--- | :--- | :--- |
| **Fungsionalitas** | Seluruh alur form, API, dan transaksi berjalan tanpa error | PASS |
| **Testing** | Unit test dan integration test kritis lolos di CI pipeline | PASS |
| **Autentikasi & Sesi** | Password di-hash dengan bcrypt/argon2, cookie berflag HttpOnly & SameSite | PASS |
| **Otorisasi & IDOR** | Akses dokumen memverifikasi pemilik data di level backend | PASS |
| **Proteksi Input** | Validasi skema ketat di server, parameterized SQL query | PASS |
| **Dependensi & Secrets** | Zero High/Critical CVE pada \`npm audit\`, tidak ada secret ter-commit | PASS |
| **Security Headers** | CSP, HSTS, X-Content-Type-Options aktif | PASS |
| **Database & Backup** | Cadangan berkala terkonfigurasi dan simulasi restore pernah diuji | PASS |
| **Observabilitas** | Health check endpoint (\`/health\`) dan error tracking aktif | PASS |
| **Aksesibilitas** | Navigasi keyboard dan kontras warna memenuhi standar WCAG AA | PASS |`
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
