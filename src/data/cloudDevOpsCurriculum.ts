import { Course } from '../types';

export const CLOUD_DEVOPS_COURSE: Course = {
  id: 'cloud-devops',
  title: 'Cloud & DevOps Engineering',
  shortDescription: 'Learn how to build, deploy, automate, secure, monitor, scale, and operate modern software systems using Linux, networking, containers, CI/CD, cloud infrastructure, Infrastructure as Code, Kubernetes, observability, DevSecOps, and SRE practices.',
  description: 'Kurikulum komprehensif end-to-end yang membawa learner dari dasar administrasi Linux, jaringan, otomatisasi Bash, Docker, CI/CD, Terraform, Kubernetes, observability, DevSecOps, hingga arsitektur SRE dan platform cloud produksi.',
  icon: 'cloud',
  levels: [
    {
      id: 'cde-lvl-1',
      title: 'Level 1 — Linux, Shell & Networking Foundations',
      description: 'Pengenalan budaya DevOps, administrasi Linux, skrip Bash, dan dasar-dasar jaringan komputer serta web.',
      modules: [
        {
          id: 'cloud-devops-m01',
          title: 'Module 1 — Introduction to Cloud & DevOps',
          description: 'Software delivery lifecycle, DevOps, CI/CD, cloud computing, DevSecOps, dan SRE.',
          lessons: [
            {
              id: 'cde-l-01-1',
              title: 'Budaya DevOps & Siklus Pengiriman Perangkat Lunak',
              type: 'learn',
              xpReward: 30,
              content: [
                {
                  type: 'markdown',
                  content: `### 1. Apa itu DevOps?
DevOps adalah gabungan filosofi budaya, praktik, dan alat yang mengintegrasikan tim Pengembangan (*Development*) dan Operasi (*Operations*) untuk mempercepat siklus rilis sekaligus menjaga keandalan sistem.

### 2. Triad DevOps: People, Process, Tools
- **People:** Kolaborasi dan budaya tanpa saling menyalahkan (*blameless culture*).
- **Process:** Automasi rilis, pengujian berkelanjutan, dan pemantauan.
- **Tools:** Git, Docker, Terraform, Kubernetes, CI/CD pipelines.`
                },
                {
                  type: 'code-example',
                  language: 'bash',
                  code: `# Alur standar pengiriman modern
git push origin main -> CI Pipeline -> Security Scan -> Container Build -> Staging -> Production`
                }
              ]
            },
            {
              id: 'cde-l-01-2',
              title: 'Kuis Module 1 — Introduction to Cloud & DevOps',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'cde-q-01-1',
                  question: 'Apa tujuan utama dari adopsi budaya DevOps di organisasi perangkat lunak?',
                  options: [
                    'Menyatukan tim Dev dan Ops untuk mempercepat rilis aplikasi dengan keandalan tinggi',
                    'Menghapus kebutuhan akan pengujian software',
                    'Mengurangi gaji insinyur',
                    'Membuat server berjalan tanpa listrik'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'DevOps meruntuhkan silo antara pengembang dan operator untuk pengiriman yang cepat dan andal.'
                },
                {
                  id: 'cde-q-01-2',
                  question: 'Apa kepanjangan dari CI/CD dalam konteks rekayasa DevOps?',
                  options: [
                    'Continuous Integration / Continuous Delivery (atau Deployment)',
                    'Compute Internal / Code Database',
                    'Cloud Instance / Container Disk',
                    'Control Interface / Central Device'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'CI/CD adalah pilar otomatisasi integrasi dan pengiriman kode.'
                },
                {
                  id: 'cde-q-01-3',
                  question: 'Apa peran SRE (Site Reliability Engineering) dalam operasi sistem?',
                  options: [
                    'Menerapkan prinsip rekayasa perangkat lunak pada masalah infrastruktur dan keandalan sistem',
                    'Hanya memperbaiki kabel printer',
                    'Menulis dokumen keuangan',
                    'Menjual server fisik'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'SRE menggunakan pendekatan software engineering untuk menjaga keandalan operasional.'
                },
                {
                  id: 'cde-q-01-4',
                  question: 'Apa itu DevSecOps?',
                  options: [
                    'Mengintegrasikan keamanan (security) sejak awal ke dalam setiap tahap siklus DevOps',
                    'Menutup semua akses server',
                    'Hanya memeriksa password di akhir proyek',
                    'Peralatan keamanan fisik kantor'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'DevSecOps menjadikan keamanan sebagai tanggung jawab bersama sepanjang siklus.'
                },
                {
                  id: 'cde-q-01-5',
                  question: 'Mengapa otomatisasi menjadi inti dari praktik cloud modern?',
                  options: [
                    'Menghilangkan kesalahan manusia (human error) dan memastikan konsistensi lingkungan',
                    'Membuat komputer bekerja lebih lambat',
                    'Menggantikan seluruh manusia selamanya',
                    'Tidak ada alasan penting'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Otomatisasi menjamin reprodubilitas dan kecepatan.'
                }
              ]
            }
          ]
        },
        {
          id: 'cloud-devops-m02',
          title: 'Module 2 — Linux Fundamentals',
          description: 'Linux architecture, filesystem, permissions, users, dan process management.',
          lessons: [
            {
              id: 'cde-l-02-1',
              title: 'Struktur Direktori & Hak Akses Linux (Permissions)',
              type: 'learn',
              xpReward: 30,
              content: [
                {
                  type: 'markdown',
                  content: `### 1. Filesystem Hierarchy Standard (FHS)
Direktori utama Linux seperti \`/etc\` (konfigurasi), \`/var\` (log/data dinamis), dan \`/home\` (direktori pengguna).

### 2. Hak Akses File (chmod & chown)
Setiap file memiliki izin untuk **User (u)**, **Group (g)**, dan **Others (o)** dengan operasi **Read (r)**, **Write (w)**, dan **Execute (x)**.`
                },
                {
                  type: 'code-example',
                  language: 'bash',
                  code: `# Mengubah izin file agar hanya owner yang dapat membaca/menulis/mengeksekusi
chmod 700 deploy.sh
chown ubuntu:ubuntu app.py`
                }
              ]
            },
            {
              id: 'cde-l-02-2',
              title: 'Kuis Module 2 — Linux Fundamentals',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'cde-q-02-1',
                  question: 'Apa fungsi dari direktori /etc dalam sistem berkas Linux?',
                  options: [
                    'Menyimpan file konfigurasi sistem lokal',
                    'Menyimpan data cache internet',
                    'Menyimpan kernel utama',
                    'Menyimpan file sampah'
                  ],
                  correctAnswerIndex: 0,
                  explanation: '/etc adalah tempat penyimpanan file konfigurasi sistem.'
                },
                {
                  id: 'cde-q-02-2',
                  question: 'Apa arti dari hak akses angka 755 (chmod 755)?',
                  options: [
                    'Owner: rwx (7), Group: r-x (5), Others: r-x (5)',
                    'Owner: r--',
                    'Semua orang diblokir',
                    'Hanya write saja'
                  ],
                  correctAnswerIndex: 0,
                  explanation: '7 = rwx (4+2+1), 5 = r-x (4+0+1).'
                },
                {
                  id: 'cde-q-02-3',
                  question: 'Perintah Linux apa yang digunakan untuk melihat daftar proses yang sedang berjalan?',
                  options: ['ps aux atau top', 'ls -la', 'pwd', 'cat /etc/passwd'],
                  correctAnswerIndex: 0,
                  explanation: 'ps dan top menampilkan informasi proses aktif.'
                },
                {
                  id: 'cde-q-02-4',
                  question: 'Apa fungsi perintah sudo?',
                  options: [
                    'Mengeksekusi perintah dengan hak akses administrator (superuser/root)',
                    'Menghapus file',
                    'Membuat user baru',
                    'Mengubah password'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'sudo menjalankan perintah sebagai superuser.'
                },
                {
                  id: 'cde-q-02-5',
                  question: 'Di mana direktori penyimpanan log sistem standar di sebagian besar distro Linux?',
                  options: ['/var/log', '/home/log', '/etc/log', '/tmp/log'],
                  correctAnswerIndex: 0,
                  explanation: '/var/log menampung berkas log sistem dan aplikasi.'
                }
              ]
            }
          ]
        },
        {
          id: 'cloud-devops-m03',
          title: 'Module 3 — Linux Administration',
          description: 'Systemd, service management, disk management, dan troubleshooting.',
          lessons: [
            {
              id: 'cde-l-03-1',
              title: 'Manajemen Layanan dengan Systemd',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### Mengelola Daemon di Linux
Systemd adalah sistem init dan manajer layanan standar untuk mengontrol proses latar belakang (*services*).`
                },
                {
                  type: 'code-example',
                  language: 'bash',
                  code: `# Mengelola layanan Nginx
sudo systemctl status nginx
sudo systemctl restart nginx
sudo journalctl -u nginx -f`
                }
              ]
            },
            {
              id: 'cde-l-03-2',
              title: 'Kuis Module 3 — Linux Administration',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'cde-q-03-1',
                  question: 'Perintah apa yang digunakan untuk memeriksa status layanan menggunakan systemd?',
                  options: ['systemctl status <service>', 'service check', 'ps service', 'top -s'],
                  correctAnswerIndex: 0,
                  explanation: 'systemctl status adalah perintah standar systemd.'
                },
                {
                  id: 'cde-q-03-2',
                  question: 'Apa fungsi perintah journalctl?',
                  options: [
                    'Melihat dan memfilter log yang dikelola oleh systemd journal',
                    'Membuat jurnal harian',
                    'Mengedit file teks',
                    'Memeriksa kapasitas disk'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'journalctl mengakses log sistem systemd.'
                },
                {
                  id: 'cde-q-03-3',
                  question: 'Perintah apa yang digunakan untuk memeriksa ruang disk yang tersedia di partisi?',
                  options: ['df -h', 'du -sh', 'free -m', 'top'],
                  correctAnswerIndex: 0,
                  explanation: 'df -h menampilkan penggunaan disk sistem file berformat manusia.'
                },
                {
                  id: 'cde-q-03-4',
                  question: 'Bagaimana cara memastikan sebuah layanan otomatis menyala saat sistem boot ulang?',
                  options: ['sudo systemctl enable <service>', 'sudo systemctl start <service>', 'sudo reboot', 'sudo cron on'],
                  correctAnswerIndex: 0,
                  explanation: 'systemctl enable mengaktifkan autostart saat boot.'
                },
                {
                  id: 'cde-q-03-5',
                  question: 'Apa fungsi utilitas cron di Linux?',
                  options: ['Menjadwalkan eksekusi perintah atau skrip secara periodik berulang', 'Membuat kontainer Docker', 'Mengompilasi C++', 'Mengatur IP address'],
                  correctAnswerIndex: 0,
                  explanation: 'Cron adalah daemon penjadwal tugas berkala.'
                }
              ]
            }
          ]
        },
        {
          id: 'cloud-devops-m04',
          title: 'Module 4 — Shell Scripting & Automation',
          description: 'Bash scripting, conditionals, loops, functions, dan error handling.',
          lessons: [
            {
              id: 'cde-l-04-1',
              title: 'Dasar Bash Scripting untuk Otomasi',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### Shebang & Exit Codes
Setiap skrip Bash dimulai dengan \`#!/bin/bash\`. Memeriksa \`$?\) (exit code) memastikan penanganan error yang andal.`
                },
                {
                  type: 'code-example',
                  language: 'bash',
                  code: `#!/bin/bash
set -e # Keluar jika terjadi error

BACKUP_DIR="/var/backups"
if [ ! -d "$BACKUP_DIR" ]; then
  mkdir -p "$BACKUP_DIR"
  echo "Direktori backup dibuat."
fi`
                }
              ]
            },
            {
              id: 'cde-l-04-2',
              title: 'Kuis Module 4 — Shell Scripting & Automation',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'cde-q-04-1',
                  question: 'Apa fungsi baris pertama #!/bin/bash dalam sebuah skrip shell?',
                  options: [
                    'Shebang yang menentukan interpreter eksekusi skrip tersebut',
                    'Komentar biasa yang diabaikan',
                    'Menyalakan server web',
                    'Mengatur password root'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Shebang mengarahkan sistem shell ke interpreter yang benar.'
                },
                {
                  id: 'cde-q-04-2',
                  question: 'Apa arti dari perintah set -e di dalam skrip Bash?',
                  options: [
                    'Membuat skrip langsung berhenti (exit) jika ada perintah yang gagal (mengembalikan exit code non-nol)',
                    'Menghapus file error',
                    'Mengaktifkan mode debug',
                    'Menambah kecepatan eksekusi'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'set -e mencegah eksekusi lanjut saat ada perintah yang gagal.'
                },
                {
                  id: 'cde-q-04-3',
                  question: 'Bagaimana cara memeriksa nilai exit code dari perintah sebelumnya di Bash?',
                  options: ['$?', '$$', '$#', '$1'],
                  correctAnswerIndex: 0,
                  explanation: '$? menyimpan status keluar perintah terakhir.'
                },
                {
                  id: 'cde-q-04-4',
                  question: 'Bagaimana cara melakukan perulangan (loop) pada file dalam direktori di Bash?',
                  options: ['for file in /path/*; do ... done', 'loop file in /path', 'while file do', 'foreach file'],
                  correctAnswerIndex: 0,
                  explanation: 'Sintaks for loop Bash menggunakan struktur for ... in ... do ... done.'
                },
                {
                  id: 'cde-q-04-5',
                  question: 'Apa operator perbandingan untuk memeriksa kesamaan dua string di Bash?',
                  options: ['== atau =', 'eq', 'is', 'match'],
                  correctAnswerIndex: 0,
                  explanation: 'Operator = atau == digunakan untuk membandingkan string.'
                }
              ]
            }
          ]
        },
        {
          id: 'cloud-devops-m05',
          title: 'Module 5 — Networking Fundamentals',
          description: 'IP addressing, subnetting, DNS, DHCP, TCP, UDP, dan routing.',
          lessons: [
            {
              id: 'cde-l-05-1',
              title: 'TCP/IP, DNS & Port Dasar',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### TCP vs UDP
- **TCP:** Berorientasi koneksi (*connection-oriented*), handal, berurutan (misal: HTTP, SSH).
- **UDP:** Tanpa koneksi (*connectionless*), cepat, tanpa jaminan pengiriman (misal: DNS query, streaming).`
                },
                {
                  type: 'code-example',
                  language: 'bash',
                  code: `# Memeriksa port terbuka dengan netcat / ss
ss -tulpn
nc -zv 127.0.0.1 80`
                }
              ]
            },
            {
              id: 'cde-l-05-2',
              title: 'Kuis Module 5 — Networking Fundamentals',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'cde-q-05-1',
                  question: 'Apa perbedaan utama antara protokol TCP dan UDP?',
                  options: [
                    'TCP handal dengan jaminan pengiriman paket (connection-oriented), UDP cepat tanpa jaminan (connectionless)',
                    'UDP lebih lambat dari TCP',
                    'TCP hanya untuk IPv6',
                    'Tidak ada perbedaan'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'TCP menjamin keandalan urutan paket, UDP mengutamakan kecepatan.'
                },
                {
                  id: 'cde-q-05-2',
                  question: 'Apa fungsi utama dari protokol DNS (Domain Name System)?',
                  options: [
                    'Menerjemahkan nama domain manusia (misal: example.com) menjadi alamat IP numerik',
                    'Mengatur kecepatan internet',
                    'Mengenkripsi lalu lintas web',
                    'Menyimpan file cache'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'DNS menerjemahkan hostname ke IP address.'
                },
                {
                  id: 'cde-q-05-3',
                  question: 'Berapa nomor port standar yang digunakan oleh protokol HTTPS?',
                  options: ['443', '80', '22', '53'],
                  correctAnswerIndex: 0,
                  explanation: 'Port 443 adalah standar HTTPS terenkripsi TLS.'
                },
                {
                  id: 'cde-q-05-4',
                  question: 'Apa itu Subnet Mask dalam jaringan IP?',
                  options: [
                    'Masker yang membedakan bagian Network ID dan Host ID pada alamat IP',
                    'Password router',
                    'Nama kabel jaringan',
                    'Kecepatan transfer data'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Subnet mask membagi alamat IP menjadi network dan host.'
                },
                {
                  id: 'cde-q-05-5',
                  question: 'Apa fungsi perintah dig atau nslookup di Linux?',
                  options: ['Melakukan kueri pencarian DNS untuk debugging resolusi nama domain', 'Menguji kecepatan CPU', 'Memeriksa disk', 'Membuat user'],
                  correctAnswerIndex: 0,
                  explanation: 'dig dan nslookup adalah alat diagnostik DNS.'
                }
              ]
            }
          ]
        },
        {
          id: 'cloud-devops-m06',
          title: 'Module 6 — HTTP & Web Infrastructure',
          description: 'HTTP/HTTPS, headers, reverse proxy, load balancing, dan CDN.',
          lessons: [
            {
              id: 'cde-l-06-1',
              title: 'Reverse Proxy & Load Balancing dengan Nginx',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Apa itu Reverse Proxy?
Reverse proxy bertindak sebagai perantara yang menerima permintaan klien dan meneruskannya ke server backend, melindungi server asli dari eksposur publik langsung.`
                },
                {
                  type: 'code-example',
                  language: 'nginx',
                  code: `server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}`
                }
              ]
            },
            {
              id: 'cde-l-06-2',
              title: 'Kuis Module 6 — HTTP & Web Infrastructure',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'cde-q-06-1',
                  question: 'Apa fungsi utama dari Reverse Proxy (seperti Nginx)?',
                  options: [
                    'Menerima trafik klien dan meneruskannya ke server backend secara aman dan efisien',
                    'Menyimpan database SQL',
                    'Menghasilkan kode Python',
                    'Mengisi baterai server'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Reverse proxy melindungi dan mendistribusikan trafik ke backend.'
                },
                {
                  id: 'cde-q-06-2',
                  question: 'Apa arti HTTP status code 502 Bad Gateway?',
                  options: [
                    'Server perantara (gateway/proxy) menerima respons invalid dari server upstream/backend',
                    'Halaman tidak ditemukan (404)',
                    'Akses ditolak (403)',
                    'Sukses (200)'
                  ],
                  correctAnswerIndex: 0,
                  explanation: '502 menandakan kegagalan komunikasi antara proxy dan backend.'
                },
                {
                  id: 'cde-q-06-3',
                  question: 'Apa fungsi dari Load Balancer?',
                  options: [
                    'Mendistribusikan lalu lintas jaringan masuk ke beberapa server backend untuk mencegah overload',
                    'Memuat halaman web lebih cepat',
                    'Menghapus cache',
                    'Mengatur password'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Load balancer membagi beban trafik ke banyak instance.'
                },
                {
                  id: 'cde-q-06-4',
                  question: 'Apa peran CDN (Content Delivery Network)?',
                  options: [
                    'Menyimpan cache aset statis di server edge terdekat dari lokasi fisik pengguna di seluruh dunia',
                    'Menyimpan database master',
                    'Menulis kode backend',
                    'Membuat kontainer Docker'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'CDN mempercepat pengiriman konten melalui edge caching global.'
                },
                {
                  id: 'cde-q-06-5',
                  question: 'Manakah header HTTP yang umum digunakan untuk meneruskan alamat IP asli klien melalui proxy?',
                  options: ['X-Forwarded-For', 'X-Secret-Token', 'User-Agent', 'Content-Type'],
                  correctAnswerIndex: 0,
                  explanation: 'X-Forwarded-For merekam IP asli klien melewati proxy.'
                }
              ]
            }
          ]
        },
        {
          id: 'cloud-devops-m07',
          title: 'Module 7 — Network Security Fundamentals',
          description: 'Firewalls, security groups, network segmentation, dan SSH hardening.',
          lessons: [
            {
              id: 'cde-l-07-1',
              title: 'Hardening SSH & Firewall Dasar',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Keamanan SSH
Mencegah login root langsung, menonaktifkan autentikasi password plaintext, dan mewajibkan SSH Key.`
                },
                {
                  type: 'code-example',
                  language: 'bash',
                  code: `# Konfigurasi /etc/ssh/sshd_config yang aman
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes`
                }
              ]
            },
            {
              id: 'cde-l-07-2',
              title: 'Kuis Module 7 — Network Security Fundamentals',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'cde-q-07-1',
                  question: 'Mengapa menonaktifkan login root langsung via SSH sangat dianjurkan dalam hardening server?',
                  options: [
                    'Mencegah penyerang menebak password akun superuser tertinggi secara langsung',
                    'Agar server berjalan lebih cepat',
                    'Karena root tidak diizinkan oleh Linux',
                    'Menghemat RAM'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Mencegah serangan brute-force langsung ke akun root.'
                },
                {
                  id: 'cde-q-07-2',
                  question: 'Apa fungsi utama dari UFW (Uncomplicated Firewall) di Ubuntu?',
                  options: [
                    'Mengelola aturan filter paket iptables untuk mengizinkan atau memblokir port jaringan',
                    'Mengompresi file log',
                    'Memperbarui sistem',
                    'Membuat kontainer'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'UFW adalah antarmuka ramah untuk firewall iptables.'
                },
                {
                  id: 'cde-q-07-3',
                  question: 'Apa itu segmentasi jaringan (network segmentation)?',
                  options: [
                    'Membagi jaringan menjadi beberapa zona terisolasi (misal: public subnet vs private database subnet)',
                    'Memutus kabel internet',
                    'Membuat IP palsu',
                    'Menggabungkan semua server'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Segmentasi membatasi luas dampak (*blast radius*) jika satu zona disusupi.'
                },
                {
                  id: 'cde-q-07-4',
                  question: 'Apa keunggulan autentikasi SSH Key dibanding Password?',
                  options: [
                    'Menggunakan kriptografi kunci publik/privat yang hampir tidak mungkin ditebak via brute-force',
                    'Lebih mudah diingat',
                    'Tidak memerlukan file',
                    'Bisa dibagikan ke publik'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Kunci kriptografi jauh lebih aman daripada kata sandi.'
                },
                {
                  id: 'cde-q-07-5',
                  question: 'Apa prinsip Least Privilege dalam keamanan infrastruktur?',
                  options: [
                    'Memberikan hak akses minimum yang mutlak diperlukan bagi pengguna atau layanan untuk menjalankan tugasnya',
                    'Memberikan akses root ke semua orang',
                    'Menghapus semua hak akses',
                    'Tidak menggunakan password'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Least privilege meminimalkan risiko keamanan.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'cde-lvl-2',
      title: 'Level 2 — Git, CI/CD & Containers (Docker)',
      description: 'Advanced Git workflows, CI/CD pipeline automation, Docker containerization, dan multi-stage builds.',
      modules: [
        {
          id: 'cloud-devops-m08',
          title: 'Module 8 — Git Engineering',
          description: 'Repositories, branching models, merge/rebase, dan release strategies.',
          lessons: [
            {
              id: 'cde-l-08-1',
              title: 'Strategi Git Branching & Rebase',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### Git Flow vs Trunk-Based Development
Trunk-based development sangat dianjurkan dalam DevOps agar integrasi kode terjadi setiap hari tanpa branch jangka panjang yang menyebabkan *merge hell*.`
                },
                {
                  type: 'code-example',
                  language: 'bash',
                  code: `# Rebase branch lokal ke main terbaru
git checkout feature-branch
git fetch origin
git rebase origin/main`
                }
              ]
            },
            {
              id: 'cde-l-08-2',
              title: 'Kuis Module 8 — Git Engineering',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'cde-q-08-1',
                  question: 'Apa keuntungan utama Trunk-Based Development dalam tim DevOps?',
                  options: [
                    'Menghindari konflik merge besar (*merge hell*) dengan mengintegrasikan kode ke main branch setiap hari',
                    'Membuat kode tidak perlu diuji',
                    'Menghapus riwayat commit',
                    'Mempercepat komputer'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Integrasi konstan mencegah konflik besar di akhir.'
                },
                {
                  id: 'cde-q-08-2',
                  question: 'Apa perbedaan mendasar antara git merge dan git rebase?',
                  options: [
                    'Merge membuat commit gabungan khusus, rebase memutar ulang (replay) commit di atas basis branch baru agar riwayat linier',
                    'Merge menghapus file',
                    'Rebase tidak bisa digunakan di GitHub',
                    'Tidak ada bedanya'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Rebase menghasilkan riwayat commit yang bersih dan linier.'
                },
                {
                  id: 'cde-q-08-3',
                  question: 'Apa fungsi dari Git Tags dalam rilis perangkat lunak?',
                  options: [
                    'Menandai titik historis tertentu dalam repositori sebagai rilis versi resmi (misal: v1.0.0)',
                    'Membuat branch baru',
                    'Menghapus repository',
                    'Mengubah pesan commit'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Tags mengunci versi rilis rujukan.'
                },
                {
                  id: 'cde-q-08-4',
                  question: 'Apa itu detached HEAD state di Git?',
                  options: [
                    'Kondisi saat pointer HEAD menunjuk langsung ke commit hash tertentu alih-alih branch',
                    'Kerusakan hard disk',
                    'Koneksi internet terputus',
                    'Penghapusan repositori'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Detached HEAD terjadi saat checkout langsung ke commit ID.'
                },
                {
                  id: 'cde-q-08-5',
                  question: 'Apa fungsi file .gitignore?',
                  options: [
                    'Memberitahu Git file atau direktori mana yang harus diabaikan dan tidak ikut di-track',
                    'Menghapus file secara permanen',
                    'Mengatur password',
                    'Menjalankan test'
                  ],
                  correctAnswerIndex: 0,
                  explanation: '.gitignore mencegah file sensitif/build masuk ke repositori.'
                }
              ]
            }
          ]
        },
        {
          id: 'cloud-devops-m09',
          title: 'Module 9 — CI/CD Fundamentals',
          description: 'Continuous Integration, Delivery, Deployment, dan pipeline stages.',
          lessons: [
            {
              id: 'cde-l-09-1',
              title: 'Anatomi Pipeline CI/CD',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Tahapan Pipeline Standar
1. **Lint & Build:** Memeriksa gaya kode dan mengompilasi aplikasi.
2. **Test:** Menjalankan unit dan integration test otomatis.
3. **Security Scan:** Memindai kerentanan dependensi (*SAST*).
4. **Deploy:** Mendorong artifak ke lingkungan staging/production.`
                },
                {
                  type: 'code-example',
                  language: 'yaml',
                  code: `# Contoh GitHub Actions Workflow sederhana
name: CI Pipeline
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Tests
        run: npm test`
                }
              ]
            },
            {
              id: 'cde-l-09-2',
              title: 'Kuis Module 9 — CI/CD Fundamentals',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'cde-q-09-1',
                  question: 'Apa perbedaan antara Continuous Delivery dan Continuous Deployment?',
                  options: [
                    'Delivery memerlukan persetujuan manual untuk rilis ke produksi, Deployment merilis ke produksi secara otomatis penuh',
                    'Delivery hanya untuk database',
                    'Deployment lebih lambat',
                    'Tidak ada perbedaan'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Deployment melakukan rilis otomatis tanpa intervensi manual.'
                },
                {
                  id: 'cde-q-09-2',
                  question: 'Apa tujuan utama dari Continuous Integration (CI)?',
                  options: [
                    'Menggabungkan perubahan kode dari semua pengembang ke branch utama secara berkala dan diuji otomatis',
                    'Mengunggah file manual ke FTP',
                    'Menghapus branch lama',
                    'Membuat dokumentasi'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'CI memastikan integrasi kode diuji secara otomatis setiap commit.'
                },
                {
                  id: 'cde-q-09-3',
                  question: 'Apa fungsi dari Artifact dalam pipeline CI/CD?',
                  options: [
                    'Menyimpan hasil build (seperti binary, paket npm, atau image docker) untuk digunakan di tahap deploy',
                    'File sampah cache',
                    'Password enkripsi',
                    'Laporan keuangan'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Artifact adalah hasil jadi build yang siap dideploy.'
                },
                {
                  id: 'cde-q-09-4',
                  question: 'Mengapa pengujian otomatis (automated testing) krusial di dalam pipeline?',
                  options: [
                    'Mendeteksi regresi dan bug secara dini sebelum kode mencapai pengguna akhir',
                    'Memperlama waktu tunggu',
                    'Mengurangi penggunaan CPU',
                    'Wajib dalam HTML'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Automated tests menjamin kualitas rilis secara konsisten.'
                },
                {
                  id: 'cde-q-09-5',
                  question: 'Apa itu fast feedback loop dalam DevOps?',
                  options: [
                    'Prinsip memberikan informasi kegagalan build/test kepada developer secepat mungkin setelah commit',
                    'Koneksi internet cepat',
                    'Looping kode program',
                    'Refresh browser'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Fast feedback mempercepat perbaikan bug.'
                }
              ]
            }
          ]
        },
        {
          id: 'cloud-devops-m10',
          title: 'Module 10 — Build Automation & Release Engineering',
          description: 'Semantic versioning, release automation, dan rollback strategies.',
          lessons: [
            {
              id: 'cde-l-10-1',
              title: 'Semantic Versioning & Release Automation',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Format Semantic Versioning (SemVer)
Format \`MAJOR.MINOR.PATCH\` (misal: v1.4.2).
- **MAJOR:** Perubahan tidak kompatibel (*breaking changes*).
- **MINOR:** Penambahan fitur baru yang kompatibel secara mundur.
- **PATCH:** Perbaikan bug (*bug fixes*).`
                },
                {
                  type: 'code-example',
                  language: 'bash',
                  code: `# Otomasi tag rilis git
git tag -a v1.2.0 -m "Release v1.2.0"
git push origin v1.2.0`
                }
              ]
            },
            {
              id: 'cde-l-10-2',
              title: 'Kuis Module 10 — Build Automation & Release Engineering',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'cde-q-10-1',
                  question: 'Apa arti angka 2 dalam versi v1.2.3 berdasarkan Semantic Versioning (SemVer)?',
                  options: ['MINOR version (penambahan fitur baru yang kompatibel ke belakang)', 'MAJOR version', 'PATCH version', 'Nomor build'],
                  correctAnswerIndex: 0,
                  explanation: 'Format SemVer adalah MAJOR.MINOR.PATCH.'
                },
                {
                  id: 'cde-q-10-2',
                  question: 'Kapan angka MAJOR dalam SemVer harus dinaikkan (increment)?',
                  options: ['Saat melakukan perubahan yang merusak kompatibilitas (*breaking changes*)', 'Setiap kali rilis harian', 'Saat memperbaiki bug kecil', 'Tidak pernah'],
                  correctAnswerIndex: 0,
                  explanation: 'MAJOR version menandakan adanya breaking changes.'
                },
                {
                  id: 'cde-q-10-3',
                  question: 'Apa tujuan dari strategi rollback otomatis saat rilis gagal?',
                  options: ['Mengembalikan sistem dengan cepat ke versi stabil sebelumnya untuk meminimalkan waktu henti (*downtime*)', 'Menghapus seluruh database', 'Memecat tim Ops', 'Mematikan server'],
                  correctAnswerIndex: 0,
                  explanation: 'Rollback memulihkan layanan dengan cepat saat insiden rilis.'
                },
                {
                  id: 'cde-q-10-4',
                  question: 'Apa itu Immutable Infrastructure dalam rilis modern?',
                  options: ['Infrastruktur yang tidak pernah dimodifikasi di tempat (in-place); jika ada pembaruan, diganti total dengan yang baru', 'Server yang tidak bisa mati', 'Kabel permanen', 'Database read-only'],
                  correctAnswerIndex: 0,
                  explanation: 'Immutable infrastructure mencegah konfigurasi drift.'
                },
                {
                  id: 'cde-q-10-5',
                  question: 'Apa peran Release Notes yang otomatis dihasilkan dari commit history?',
                  options: ['Memberikan transparansi perubahan apa saja yang disertakan dalam rilis kepada pengguna dan tim', 'Menyimpan password', 'Mengatur CPU', 'Menghapus log'],
                  correctAnswerIndex: 0,
                  explanation: 'Release notes mendokumentasikan isi rilis secara transparan.'
                }
              ]
            }
          ]
        },
        {
          id: 'cloud-devops-m11',
          title: 'Module 11 — Docker Fundamentals',
          description: 'Containers, images, Dockerfile, layers, volumes, dan registries.',
          lessons: [
            {
              id: 'cde-l-11-1',
              title: 'Anatomi Dockerfile & Image Layers',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Prinsip Kerja Docker
Docker membungkus aplikasi dan seluruh dependensinya ke dalam kontainer terisolasi yang dapat berjalan di mesin manapun secara konsisten.`
                },
                {
                  type: 'code-example',
                  language: 'dockerfile',
                  code: `FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]`
                }
              ]
            },
            {
              id: 'cde-l-11-2',
              title: 'Kuis Module 11 — Docker Fundamentals',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'cde-q-11-1',
                  question: 'Apa perbedaan mendasar antara Virtual Machine (VM) dan Docker Container?',
                  options: [
                    'Container membagi kernel OS host secara langsung (ringan), sedangkan VM menjalankan OS tamu penuh via hypervisor (berat)',
                    'Container lebih lambat dari VM',
                    'VM tidak memerlukan CPU',
                    'Tidak ada bedanya'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Container berbagi kernel host sehingga jauh lebih ringan dan cepat.'
                },
                {
                  id: 'cde-q-11-2',
                  question: 'Apa fungsi dari instruksi COPY atau ADD dalam Dockerfile?',
                  options: [
                    'Menyalin file atau direktori dari mesin host lokal ke dalam filesystem image kontainer',
                    'Mengunduh file dari internet',
                    'Menghapus file host',
                    'Membuat database'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'COPY memasukkan kode sumber lokal ke dalam image build.'
                },
                {
                  id: 'cde-q-11-3',
                  question: 'Mengapa caching layer Docker sangat penting saat menyusun Dockerfile?',
                  options: [
                    'Mempercepat proses build dengan tidak mengulang instruksi yang tidak berubah sejak build terakhir',
                    'Menghemat RAM komputer',
                    'Menghapus virus',
                    'Memperkuat keamanan'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Layer caching menghindari pembangunan ulang bagian yang sama.'
                },
                {
                  id: 'cde-q-11-4',
                  question: 'Apa fungsi dari Docker Volumes?',
                  options: [
                    'Menyediakan penyimpanan persisten di luar siklus hidup kontainer agar data tidak hilang saat kontainer mati',
                    'Menambah kecepatan CPU',
                    'Menyimpan file konfigurasi jaringan',
                    'Membuat image baru'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Volumes menjaga persistensi data di luar filesystem kontainer ephemeral.'
                },
                {
                  id: 'cde-q-11-5',
                  question: 'Di mana Docker Image disimpan setelah di-build agar dapat diunduh server lain?',
                  options: ['Docker Registry (misal: Docker Hub, Amazon ECR)', 'Folder /tmp lokal', 'Dalam RAM', 'Di browser'],
                  correctAnswerIndex: 0,
                  explanation: 'Registry adalah repositori terpusat untuk menyimpan dan mendistribusikan image.'
                }
              ]
            }
          ]
        },
        {
          id: 'cloud-devops-m12',
          title: 'Module 12 — Docker Engineering',
          description: 'Multi-stage builds, image optimization, Docker Compose, dan health checks.',
          lessons: [
            {
              id: 'cde-l-12-1',
              title: 'Multi-Stage Builds & Docker Compose',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Multi-Stage Builds
Memungkinkan kita menggunakan satu image berat untuk tahap kompilasi/build, lalu menyalin hasil binary/output bersih ke dalam image runtime yang sangat kecil.`
                },
                {
                  type: 'code-example',
                  language: 'yaml',
                  code: `# docker-compose.yml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
  redis:
    image: redis:alpine`
                }
              ]
            },
            {
              id: 'cde-l-12-2',
              title: 'Kuis Module 12 — Docker Engineering',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'cde-q-12-1',
                  question: 'Apa keuntungan utama dari teknik Multi-Stage Builds di Docker?',
                  options: [
                    'Menghasilkan ukuran image produksi yang sangat kecil dengan membuang tool kompilasi yang tidak perlu',
                    'Membuat proses build lebih lambat',
                    'Menambah kerentanan keamanan',
                    'Wajib menggunakan Python'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Multi-stage builds memangkas ukuran image final secara drastis.'
                },
                {
                  id: 'cde-q-12-2',
                  question: 'Apa fungsi utama dari utilitas Docker Compose?',
                  options: [
                    'Mendefinisikan dan menjalankan aplikasi multi-kontainer Docker menggunakan satu file konfigurasi YAML',
                    'Mengompilasi kode C++',
                    'Mengatur DNS server',
                    'Membuat server fisik'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Docker Compose mengelola orkestrasi multi-kontainer lokal.'
                },
                {
                  id: 'cde-q-12-3',
                  question: 'Apa fungsi instruksi HEALTHCHECK di Dockerfile?',
                  options: [
                    'Memberitahu Docker cara menguji apakah kontainer masih berjalan dengan sehat dan responsif',
                    'Memeriksa suhu CPU',
                    'Menghapus kontainer macet',
                    'Memperbarui sistem operasi'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Healthcheck memantau status kesehatan aplikasi dalam kontainer.'
                },
                {
                  id: 'cde-q-12-4',
                  question: 'Mengapa menjalankan aplikasi sebagai user root di dalam kontainer dianggap risiko keamanan?',
                  options: [
                    'Jika penyerang berhasil membobol aplikasi, mereka langsung memiliki akses root di namespace kontainer (atau berpotensi escape ke host)',
                    'Membuat aplikasi lambat',
                    'Tidak bisa membaca file',
                    'Wajib dalam Linux'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Prinsip least privilege melarang penggunaan user root di kontainer.'
                },
                {
                  id: 'cde-q-12-5',
                  question: 'Bagaimana cara menghubungkan dua kontainer dalam satu Docker Compose network?',
                  options: [
                    'Docker Compose secara otomatis membuat jaringan internal dan kontainer dapat saling merujuk via nama service',
                    'Harus menggunakan kabel fisik',
                    'Harus mengetik IP address manual setiap restart',
                    'Tidak mungkin dilakukan'
                  ],
                  correctAnswerIndex: 0,
                  explanation: 'Docker Compose menyediakan built-in service discovery via nama service.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'cde-lvl-3',
      title: 'Level 3 — Cloud Computing, IaC & Kubernetes',
      description: 'Cloud architecture (AWS/GCP/Azure), Infrastructure as Code dengan Terraform, dan orkestrasi Kubernetes.',
      modules: [
        {
          id: 'cloud-devops-m13',
          title: 'Module 13 — Container Architecture',
          description: 'Container lifecycle, orchestration, service discovery, dan image supply chain.',
          lessons: [
            {
              id: 'cde-l-13-1',
              title: 'Prinsip Dasar Orkestrasi Kontainer',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Mengapa Butuh Orkestrasi?
Saat aplikasi berkembang menjadi puluhan atau ratusan kontainer mikroservis, manajemen manual tidak lagi memadai. Orkestrator (seperti Kubernetes) menangani penjadwalan, penskalaan, dan pemulihan otomatis (*self-healing*).`
                },
                {
                  type: 'code-example',
                  language: 'yaml',
                  code: `# Konsep dasar manajemen kontainer skala besar`
                }
              ]
            },
            {
              id: 'cde-l-13-2',
              title: 'Kuis Module 13 — Container Architecture',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'cde-q-13-1',
                  question: 'Apa fungsi utama dari orkestrator kontainer (seperti Kubernetes)?',
                  options: ['Mengotomatiskan deployment, penskalaan, networking, dan manajemen klaster kontainer skala besar', 'Hanya menjalankan satu kontainer', 'Membuat file Dockerfile', 'Mengedit video'],
                  correctAnswerIndex: 0,
                  explanation: 'Orkestrator mengelola ribuan kontainer secara terpusat.'
                },
                {
                  id: 'cde-q-13-2',
                  question: 'Apa itu fitur Self-Healing pada orkestrator kontainer?',
                  options: ['Kemampuan sistem mendeteksi kontainer yang mati atau gagal lalu secara otomatis me-restart atau menggantinya', 'Memperbaiki layar rusak', 'Mengisi ulang baterai', 'Pembersihan cache'],
                  correctAnswerIndex: 0,
                  explanation: 'Self-healing menjamin ketersediaan aplikasi tanpa intervensi manual.'
                },
                {
                  id: 'cde-q-13-3',
                  question: 'Apa itu Service Discovery dalam arsitektur mikroservis kontainer?',
                  options: ['Mekanisme agar kontainer dapat saling menemukan dan terhubung secara dinamis meskipun IP address berubah', 'Pencarian file lokal', 'Pencarian Google', 'Koneksi Wi-Fi'],
                  correctAnswerIndex: 0,
                  explanation: 'Service discovery mengatasi dinamika IP kontainer yang sering berubah.'
                },
                {
                  id: 'cde-q-13-4',
                  question: 'Apa peran Image Supply Chain Security dalam rantai pasok software?',
                  options: ['Memindai kerentanan, menandatangani (sign), dan memverifikasi keaslian Docker image sebelum dideploy', 'Mengirim barang fisik', 'Mencetak label', 'Membeli server'],
                  correctAnswerIndex: 0,
                  explanation: 'Supply chain security mencegah injeksi image berbahaya.'
                },
                {
                  id: 'cde-q-13-5',
                  question: 'Mengapa kontainer dianggap bersifat ephemeral (sementara)?',
                  options: ['Kontainer dapat dibuat, dihancurkan, atau diganti kapan saja tanpa menyimpan state permanen di dalamnya', 'Kontainer cepat rusak', 'Hanya bertahan 1 detik', 'Tidak bisa dimatikan'],
                  correctAnswerIndex: 0,
                  explanation: 'Ephemeral berarti kontainer dapat didaur ulang secara instan.'
                }
              ]
            }
          ]
        },
        {
          id: 'cloud-devops-m14',
          title: 'Module 14 — Cloud Computing Fundamentals',
          description: 'IaaS, PaaS, SaaS, public/private cloud, regions, availability zones, dan cloud economics.',
          lessons: [
            {
              id: 'cde-l-14-1',
              title: 'Model Layanan Cloud & High Availability',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Model Layanan Cloud
- **IaaS (Infrastructure as Service):** Sewa VM, Storage, Network (misal: AWS EC2).
- **PaaS (Platform as Service):** Kelola kode aplikasi tanpa pusingkan server (misal: Heroku, Google App Engine).
- **SaaS (Software as Service):** Aplikasi siap pakai via web (misal: Gmail, GitHub).`
                },
                {
                  type: 'code-example',
                  language: 'bash',
                  code: `# Konsep arsitektur multi-AZ untuk redundansi tinggi`
                }
              ]
            },
            {
              id: 'cde-l-14-2',
              title: 'Kuis Module 14 — Cloud Computing Fundamentals',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'cde-q-14-1',
                  question: 'Apa perbedaan utama antara model layanan IaaS dan PaaS?',
                  options: ['IaaS menyediakan infrastruktur virtual mentah (VM/storage), PaaS menyediakan platform siap pakai untuk deploy kode', 'PaaS lebih mahal', 'IaaS tidak pakai internet', 'Tidak ada bedanya'],
                  correctAnswerIndex: 0,
                  explanation: 'IaaS memberi kontrol penuh infrastruktur, PaaS fokus pada runtime aplikasi.'
                },
                {
                  id: 'cde-q-14-2',
                  question: 'Apa arti dari Availability Zone (AZ) dalam arsitektur cloud publik?',
                  options: ['Satu atau lebih pusat data mandiri dengan daya, pendingin, dan jaringan terisolasi dalam satu region', 'Kantor pusat AWS', 'Kabel bawah laut', 'Komputer lokal'],
                  correctAnswerIndex: 0,
                  explanation: 'AZ dirancang terisolasi untuk menjamin ketersediaan tinggi (high availability).'
                },
                {
                  id: 'cde-q-14-3',
                  question: 'Apa keuntungan utama dari skalabilitas elastis (elasticity) di cloud?',
                  options: ['Secara otomatis menambah atau mengurangi kapasitas sumber daya sesuai fluktuasi beban kerja', 'Menghemat listrik permanen', 'Membuat server tidak pernah mati', 'Menghapus database'],
                  correctAnswerIndex: 0,
                  explanation: 'Elastisitas menyesuaikan biaya dengan kebutuhan beban secara dinamis.'
                },
                {
                  id: 'cde-q-14-4',
                  question: 'Apa itu model Shared Responsibility Model dalam keamanan cloud?',
                  options: ['Pembagian tanggung jawab keamanan antara penyedia cloud (security OF the cloud) dan pelanggan (security IN the cloud)', 'Semua keamanan diatur penyedia cloud', 'Pelanggan bertanggung jawab atas fisik server', 'Tidak ada aturan'],
                  correctAnswerIndex: 0,
                  explanation: 'Cloud provider mengamankan infrastruktur dasar, pelanggan mengamankan data dan konfigurasi.'
                },
                {
                  id: 'cde-q-14-5',
                  question: 'Apa itu konsep Cloud Economics (CapEx vs OpEx)?',
                  options: ['Pergeseran dari biaya modal awal besar (CapEx) ke model pengeluaran operasional bayar-sesuai-pakai (OpEx)', 'Mata uang digital', 'Pajak server', 'Subsidi internet'],
                  correctAnswerIndex: 0,
                  explanation: 'Cloud mengubah investasi modal besar menjadi biaya operasional fleksibel.'
                }
              ]
            }
          ]
        },
        {
          id: 'cloud-devops-m15',
          title: 'Module 15 — Cloud Compute',
          description: 'Virtual machines, instances, autoscaling, dan serverless concepts.',
          lessons: [
            {
              id: 'cde-l-15-1',
              title: 'Arsitektur Compute: VM vs Serverless',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Memilih Layanan Compute
- **Virtual Machines (EC2/Compute Engine):** Kontrol penuh sistem operasi.
- **Serverless (Lambda/Cloud Functions):** Eksekusi kode berbasis event tanpa mengelola server, bayar hanya saat dieksekusi.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `# Contoh fungsi serverless sederhana (AWS Lambda style)
def lambda_handler(event, context):
    return {
        'statusCode': 200,
        'body': 'Hello from Serverless Cloud!'
    }`
                }
              ]
            },
            {
              id: 'cde-l-15-2',
              title: 'Kuis Module 15 — Cloud Compute',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'cde-q-15-1',
                  question: 'Apa keuntungan utama dari arsitektur Serverless (FaaS)?',
                  options: ['Tidak perlu mengelola server, skalabilitas otomatis instan, dan biaya nol saat tidak ada eksekusi', 'Selalu menyala 24 jam penuh', 'Membutuhkan RAM fisik besar', 'Lebih lambat dari VM'],
                  correctAnswerIndex: 0,
                  explanation: 'Serverless menghilangkan manajemen infrastruktur dan bayar per eksekusi.'
                },
                {
                  id: 'cde-q-15-2',
                  question: 'Apa itu Auto Scaling Group di layanan cloud?',
                  options: ['Grup instance VM yang secara otomatis menambah atau mengurangi jumlah instance berdasarkan metrik beban CPU/trafik', 'Grup chat DevOps', 'Pencadangan data otomatis', 'Jaringan VPN'],
                  correctAnswerIndex: 0,
                  explanation: 'Auto Scaling menjaga ketersediaan dan performa aplikasi.'
                },
                {
                  id: 'cde-q-15-3',
                  question: 'Kapan sebaiknya memilih Virtual Machine (IaaS) dibanding Serverless?',
                  options: ['Saat aplikasi membutuhkan state persisten, proses latar belakang kontinu, atau kustomisasi kernel OS mendalam', 'Untuk semua hal', 'Hanya untuk testing', 'Tidak pernah'],
                  correctAnswerIndex: 0,
                  explanation: 'VM memberikan kontrol penuh yang tidak dimiliki fungsi serverless berdurasi singkat.'
                },
                {
                  id: 'cde-q-15-4',
                  question: 'Apa itu cold start dalam fungsi serverless?',
                  options: ['Latensi tambahan saat fungsi dipanggil pertama kali karena wadah pengeksekusi harus diinisialisasi dari awal', 'Kondisi server dingin', 'Gagal booting', 'Koneksi lambat'],
                  correctAnswerIndex: 0,
                  explanation: 'Cold start memicu penundaan pada pemanggilan pertama.'
                },
                {
                  id: 'cde-q-15-5',
                  question: 'Apa fungsi instance types dalam layanan cloud compute?',
                  options: ['Menyediakan berbagai kombinasi kapasitas vCPU, memori RAM, dan bandwidth jaringan untuk kebutuhan spesifik', 'Warna casing server', 'Lokasi geografis', 'Nama database'],
                  correctAnswerIndex: 0,
                  explanation: 'Instance types disesuaikan untuk workload komputasi, memori, atau GPU.'
                }
              ]
            }
          ]
        },
        {
          id: 'cloud-devops-m16',
          title: 'Module 16 — Cloud Networking',
          description: 'VPC, subnets, routing, gateways, NAT, dan load balancers.',
          lessons: [
            {
              id: 'cde-l-16-1',
              title: 'Desain VPC (Virtual Private Cloud)',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Public vs Private Subnets
- **Public Subnet:** Terhubung ke Internet Gateway, menampung Load Balancer / Web Proxy.
- **Private Subnet:** Terisolasi dari internet langsung, menampung database dan mikroservis backend (mengakses internet via NAT Gateway).`
                },
                {
                  type: 'code-example',
                  language: 'hcl',
                  code: `# Konsep subnet publik dan privat di Terraform`
                }
              ]
            },
            {
              id: 'cde-l-16-2',
              title: 'Kuis Module 16 — Cloud Networking',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'cde-q-16-1',
                  question: 'Apa fungsi dari Internet Gateway (IGW) dalam arsitektur Cloud VPC?',
                  options: ['Menghubungkan sumber daya dalam VPC ke internet publik', 'Menghubungkan dua database', 'Mengamankan password', 'Menyimpan file log'],
                  correctAnswerIndex: 0,
                  explanation: 'IGW adalah pintu gerbang lalu lintas internet VPC.'
                },
                {
                  id: 'cde-q-16-2',
                  question: 'Mengapa database backend harus ditempatkan di Private Subnet?',
                  options: ['Mencegah akses langsung dari internet publik demi keamanan tingkat tinggi', 'Agar database lebih lambat', 'Karena tidak butuh IP', 'Wajib dalam hukum cloud'],
                  correctAnswerIndex: 0,
                  explanation: 'Private subnet melindungi database dari serangan langsung luar.'
                },
                {
                  id: 'cde-q-16-3',
                  question: 'Apa fungsi dari NAT Gateway di dalam VPC?',
                  options: ['Memungkinkan instance di private subnet mengakses internet (misal untuk download update) tanpa bisa diakses dari luar', 'Membuat jaringan nirkabel', 'Menyimpan cache', 'Mengatur DNS'],
                  correctAnswerIndex: 0,
                  explanation: 'NAT Gateway menyediakan akses keluar satu arah yang aman.'
                },
                {
                  id: 'cde-q-16-4',
                  question: 'Apa itu VPC Peering?',
                  options: ['Koneksi jaringan privat langsung antar dua VPC berbeda menggunakan alamat IP privat', 'Kabel LAN fisik', 'Koneksi Wi-Fi', 'Sharing file'],
                  correctAnswerIndex: 0,
                  explanation: 'VPC peering menghubungkan dua VPC secara internal dan aman.'
                },
                {
                  id: 'cde-q-16-5',
                  question: 'Apa fungsi Route Table di dalam VPC?',
                  options: ['Menentukan ke mana arah paket jaringan diteruskan berdasarkan alamat IP tujuan', 'Jadwal backup', 'Daftar user', 'Log error'],
                  correctAnswerIndex: 0,
                  explanation: 'Route table mengatur aturan perutean lalu lintas jaringan.'
                }
              ]
            }
          ]
        },
        {
          id: 'cloud-devops-m17',
          title: 'Module 17 — Cloud Storage & Databases',
          description: 'Object storage, block storage, managed databases, backups, dan replication.',
          lessons: [
            {
              id: 'cde-l-17-1',
              title: 'Object Storage & Managed Databases',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Object Storage (S3 / GCS)
Penyimpanan file berbasis objek yang sangat skalabel, murah, dan tahan lama (*durability 99.999999999%*), ideal untuk gambar, video, dan backup.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `# Contoh upload file ke cloud object storage`
                }
              ]
            },
            {
              id: 'cde-l-17-2',
              title: 'Kuis Module 17 — Cloud Storage & Databases',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'cde-q-17-1',
                  question: 'Apa karakteristik utama dari Object Storage (seperti AWS S3)?',
                  options: ['Penyimpanan data tidak terstruktur berbasis kunci-nilai (key-value) dengan skalabilitas tak terbatas', 'Penyimpanan file hierarki tradisional', 'RAM server', 'Database SQL'],
                  correctAnswerIndex: 0,
                  explanation: 'Object storage dirancang menyimpan data skala masif tanpa struktur direktori kaku.'
                },
                {
                  id: 'cde-q-17-2',
                  question: 'Apa keuntungan menggunakan Managed Database (RDS/Cloud SQL) dibanding install sendiri di VM?',
                  options: ['Automated backup, patching, failover otomatis, dan kemudahan scaling dikelola oleh penyedia cloud', 'Biaya lebih mahal', 'Kontrol sistem operasi lebih bebas', 'Tidak ada bedanya'],
                  correctAnswerIndex: 0,
                  explanation: 'Managed DB membebaskan tim dari beban operasional database maintenance.'
                },
                {
                  id: 'cde-q-17-3',
                  question: 'Apa itu Read Replica dalam arsitektur database relasional?',
                  options: ['Salinan sinkron/asinkron dari database utama yang khusus melayani kueri pembacaan (read queries) untuk meringankan beban', 'Backup harian', 'Database palsu', 'Tabel arsip'],
                  correctAnswerIndex: 0,
                  explanation: 'Read replica mendistribusikan beban baca (*read scaling*).'
                },
                {
                  id: 'cde-q-17-4',
                  question: 'Apa fungsi dari Lifecycle Policies pada Object Storage?',
                  options: ['Secara otomatis memindahkan data lama ke penyimpanan arsip murah atau menghapusnya setelah jangka waktu tertentu', 'Memperbarui aplikasi', 'Mengatur CPU', 'Membuat user'],
                  correctAnswerIndex: 0,
                  explanation: 'Lifecycle policies menghemat biaya penyimpanan jangka panjang.'
                },
                {
                  id: 'cde-q-17-5',
                  question: 'Apa perbedaan Block Storage dan Object Storage?',
                  options: ['Block storage dipasang sebagai disk mentah pada VM (untuk OS/database), object storage diakses via API web untuk file', 'Sama persis', 'Block storage untuk gambar', 'Object storage untuk OS'],
                  correctAnswerIndex: 0,
                  explanation: 'Block storage melayani filesystem block-level, object storage melayani file via API.'
                }
              ]
            }
          ]
        },
        {
          id: 'cloud-devops-m18',
          title: 'Module 18 — Cloud Security & IAM',
          description: 'IAM, roles, policies, secrets management, encryption, dan least privilege.',
          lessons: [
            {
              id: 'cde-l-18-1',
              title: 'IAM Policies & Least Privilege',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Prinsip IAM (Identity and Access Management)
Mengontrol siapa yang dapat mengakses apa dan sumber daya apa yang dapat mereka gunakan di cloud melalui kebijakan berbasis JSON (*IAM Policies*).`
                },
                {
                  type: 'code-example',
                  language: 'json',
                  code: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-secure-bucket/*"
    }
  ]
}`
                }
              ]
            },
            {
              id: 'cde-l-18-2',
              title: 'Kuis Module 18 — Cloud Security & IAM',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'cde-q-18-1',
                  question: 'Apa fungsi utama dari IAM (Identity and Access Management) di cloud?',
                  options: ['Mengelola autentikasi dan otorisasi pengguna serta layanan secara aman', 'Menyimpan file database', 'Mengatur kecepatan jaringan', 'Membuat kontainer Docker'],
                  correctAnswerIndex: 0,
                  explanation: 'IAM mengontrol hak akses seluruh sumber daya cloud.'
                },
                {
                  id: 'cde-q-18-2',
                  question: 'Mengapa menyimpan kredensial atau secret di dalam kode sumber (hardcoding) sangat berbahaya?',
                  options: ['Jika repositori bocor atau publik, penyerang dapat langsung mengambil alih akun cloud perusahaan', 'Tidak ada bahaya', 'Membuat program lambat', 'Wajib dalam Python'],
                  correctAnswerIndex: 0,
                  explanation: 'Hardcoded secrets adalah celah keamanan fatal.'
                },
                {
                  id: 'cde-q-18-3',
                  question: 'Apa itu Encryption at Rest dan Encryption in Transit?',
                  options: ['At Rest mengamankan data saat disimpan di disk, In Transit mengamankan data saat dikirim lewat jaringan', 'Keduanya sama', 'Hanya untuk password', 'Enkripsi untuk file zip'],
                  correctAnswerIndex: 0,
                  explanation: 'Kedua enkripsi melindungi data di penyimpanan dan saat transit.'
                },
                {
                  id: 'cde-q-18-4',
                  question: 'Apa itu IAM Role untuk layanan (misal: EC2 Instance Role)?',
                  options: ['Kredensial sementara yang diberikan ke layanan agar dapat mengakses resource cloud lain tanpa menyematkan secret statis', 'Password root', 'Nama domain', 'IP address'],
                  correctAnswerIndex: 0,
                  explanation: 'IAM roles menyediakan kredensial sementara yang aman bagi layanan.'
                },
                {
                  id: 'cde-q-18-5',
                  question: 'Apa fungsi layanan Secrets Manager di cloud?',
                  options: ['Menyimpan, mengenkripsi, dan merotasi kredensial rahasia (seperti password DB) secara aman', 'Menyimpan gambar', 'Mengatur DNS', 'Membuat log'],
                  correctAnswerIndex: 0,
                  explanation: 'Secrets Manager mengelola rotasi dan keamanan rahasia.'
                }
              ]
            }
          ]
        },
        {
          id: 'cloud-devops-m19',
          title: 'Module 19 — Infrastructure as Code',
          description: 'Declarative infrastructure, configuration drift, state management, dan provisioning.',
          lessons: [
            {
              id: 'cde-l-19-1',
              title: 'Konsep Dasar IaC (Infrastructure as Code)',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Mengapa Infrastructure as Code?
IaC mengubah konfigurasi infrastruktur manual (*ClickOps*) menjadi kode deklaratif yang dapat versioning di Git, diuji, dan direproduksi secara konsisten.`
                },
                {
                  type: 'code-example',
                  language: 'hcl',
                  code: `# Contoh deklarasi resource Terraform
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
  tags = {
    Name = "WebServer-Prod"
  }
}`
                }
              ]
            },
            {
              id: 'cde-l-19-2',
              title: 'Kuis Module 19 — Infrastructure as Code',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'cde-q-19-1',
                  question: 'Apa itu Infrastructure as Code (IaC)?',
                  options: ['Pengelolaan dan penyediaan infrastruktur melalui file kode deklaratif alih-alih konfigurasi manual via UI', 'Menulis kode Python untuk web', 'Membuat kabel fisik', 'Database SQL'],
                  correctAnswerIndex: 0,
                  explanation: 'IaC memperlakukan infrastruktur seperti perangkat lunak.'
                },
                {
                  id: 'cde-q-19-2',
                  question: 'Apa masalah dari "Configuration Drift" pada infrastruktur?',
                  options: ['Perbedaan tidak terencana antara konfigurasi aktual di server dengan status yang diinginkan (desired state)', 'Pergeseran waktu server', 'Koneksi internet lambat', 'Kardus server rusak'],
                  correctAnswerIndex: 0,
                  explanation: 'Configuration drift memicu ketidakkonsistenan dan celah error.'
                },
                {
                  id: 'cde-q-19-3',
                  question: 'Apa fungsi file State dalam perkakas IaC (seperti Terraform)?',
                  options: ['Menyimpan pemetaan antara resource nyata di cloud dengan kode konfigurasi IaC', 'Menyimpan kode aplikasi', 'Menyimpan password user', 'Log error web'],
                  correctAnswerIndex: 0,
                  explanation: 'State file melacak status sumber daya yang dikelola.'
                },
                {
                  id: 'cde-q-19-4',
                  question: 'Apa keuntungan utama pendekatan deklaratif dibanding imperatif dalam IaC?',
                  options: ['Kita cukup mendefinisikan hasil akhir yang diinginkan, dan tool akan menghitung cara mencapainya secara otomatis',	'Harus menulis setiap langkah manual', 'Lebih lambat', 'Tidak ada bedanya'],
                  correctAnswerIndex: 0,
                  explanation: 'Deklaratif fokus pada "apa" yang diinginkan, bukan "bagaimana" membuatnya.'
                },
                {
                  id: 'cde-q-19-5',
                  question: 'Mengapa file State Terraform harus disimpan di remote storage yang aman (misal S3) alih-alih lokal?',
                  options: ['Agar dapat dikerjakan secara kolaboratif oleh tim dan mencegah kehilangan file state', 'Agar file lebih cepat', 'Wajib dalam hukum cloud', 'Tidak ada alasan'],
                  correctAnswerIndex: 0,
                  explanation: 'Remote state memungkinkan kolaborasi tim dan penguncian state (*state locking*).'
                }
              ]
            }
          ]
        },
        {
          id: 'cloud-devops-m20',
          title: 'Module 20 — Terraform Engineering',
          description: 'Providers, resources, variables, modules, remote state, dan plan/apply workflow.',
          lessons: [
            {
              id: 'cde-l-20-1',
              title: 'Workflow Terraform: Plan & Apply',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Siklus Eksekusi Terraform
1. \`terraform init\`: Mengunduh provider dan inisialisasi backend.
2. \`terraform plan\`: Pratinjau perubahan yang akan dilakukan.
3. \`terraform apply\`: Mengeksekusi perubahan ke cloud.
4. \`terraform destroy\`: Menghapus seluruh infrastruktur.`
                },
                {
                  type: 'code-example',
                  language: 'hcl',
                  code: `variable "environment" {
  type    = string
  default = "production"
}

output "instance_ip" {
  value = aws_instance.web.public_ip
}`
                }
              ]
            },
            {
              id: 'cde-l-20-2',
              title: 'Kuis Module 20 — Terraform Engineering',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'cde-q-20-1',
                  question: 'Apa fungsi perintah terraform plan sebelum terraform apply?',
                  options: ['Memberikan pratinjau (preview) perubahan apa saja yang akan dibuat, diubah, atau dihapus pada infrastruktur', 'Langsung menghapus semua server', 'Mengompilasi kode', 'Memperbarui sistem'],
                  correctAnswerIndex: 0,
                  explanation: 'Plan mencegah eksekusi perubahan tak terduga ke cloud.'
                },
                {
                  id: 'cde-q-20-2',
                  question: 'Apa itu Terraform Module?',
                  options: ['Kontainer wadah untuk beberapa resource yang dikelompokkan bersama agar dapat digunakan kembali (reusable)', 'File konfigurasi tunggal', 'Jenis database', 'Kabel jaringan'],
                  correctAnswerIndex: 0,
                  explanation: 'Modules memungkinkan enkapsulasi dan penggunaan kembali kode IaC.'
                },
                {
                  id: 'cde-q-20-3',
                  question: 'Apa fungsi perintah terraform init?',
                  options: ['Menginisialisasi direktori kerja, mengunduh plugin provider, dan menyiapkan backend state', 'Menghapus infrastruktur', 'Menjalankan server web', 'Membuat user'],
                  correctAnswerIndex: 0,
                  explanation: 'Init adalah langkah pertama wajib sebelum perintah Terraform lainnya.'
                },
                {
                  id: 'cde-q-20-4',
                  question: 'Bagaimana cara meneruskan nilai dinamis ke konfigurasi Terraform?',
                  options: ['Menggunakan Variables (variabel masukan) dan Outputs', 'Hardcode di dalam resource', 'Menggunakan JavaScript', 'Menulis di file log'],
                  correctAnswerIndex: 0,
                  explanation: 'Variables membuat konfigurasi Terraform fleksibel dan reusable.'
                },
                {
                  id: 'cde-q-20-5',
                  question: 'Apa yang dimaksud dengan State Locking di Terraform?',
                  options: ['Mekanisme penguncian file state saat proses apply berlangsung agar tidak terjadi bentrok (*conflict*) modifikasi oleh orang lain', 'Mengunci layar komputer', 'Memblokir IP internet', 'Menghapus password'],
                  correctAnswerIndex: 0,
                  explanation: 'State locking melindungi integritas file state saat kolaborasi tim.'
                }
              ]
            }
          ]
        },
        {
          id: 'cloud-devops-m21',
          title: 'Module 21 — Kubernetes Fundamentals',
          description: 'Cluster, nodes, pods, deployments, services, namespaces, dan secrets.',
          lessons: [
            {
              id: 'cde-l-21-1',
              title: 'Arsitektur Kubernetes & Konsep Pod',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Apa itu Pod?
Unit komputasi terkecil di Kubernetes yang dapat menampung satu atau lebih kontainer yang berbagi jaringan dan penyimpanan yang sama.`
                },
                {
                  type: 'code-example',
                  language: 'yaml',
                  code: `apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
spec:
  containers:
  - name: nginx
    image: nginx:alpine
    ports:
    - containerPort: 80`
                }
              ]
            },
            {
              id: 'cde-l-21-2',
              title: 'Kuis Module 21 — Kubernetes Fundamentals',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'cde-q-21-1',
                  question: 'Apa unit penyebaran terkecil di dalam klaster Kubernetes?',
                  options: ['Pod', 'Docker Container tunggal', 'Node fisik', 'Cluster'],
                  correctAnswerIndex: 0,
                  explanation: 'Pod adalah unit atomik penjadwalan di Kubernetes.'
                },
                {
                  id: 'cde-q-21-2',
                  question: 'Apa fungsi dari objek Deployment di Kubernetes?',
                  options: ['Mengelola replika Pod secara deklaratif, pembaruan bergulir (*rolling updates*), dan pemulihan otomatis', 'Menyimpan database SQL', 'Mengatur kabel jaringan', 'Membuat domain DNS'],
                  correctAnswerIndex: 0,
                  explanation: 'Deployment memastikan jumlah replika Pod yang diinginkan selalu berjalan.'
                },
                {
                  id: 'cde-q-21-3',
                  question: 'Apa perbedaan antara master node (control plane) dan worker node di K8s?',
                  options: ['Master mengelola dan menjadwalkan klaster, worker node menjalankan beban kerja aplikasi (Pod)', 'Worker node mengontrol master', 'Keduanya sama persis', 'Master node tidak punya CPU'],
                  correctAnswerIndex: 0,
                  explanation: 'Control plane mengendalikan klaster, worker nodes menjalankan aplikasi.'
                },
                {
                  id: 'cde-q-21-4',
                  question: 'Apa fungsi objek Namespace di Kubernetes?',
                  options: ['Membagi klaster fisik tunggal menjadi beberapa lingkungan virtual terisolasi (misal: dev, prod)', 'Membuat nama domain web', 'Menyimpan password root', 'Mengatur RAM'],
                  correctAnswerIndex: 0,
                  explanation: 'Namespaces mengisolasi resource antar tim atau lingkungan.'
                },
                {
                  id: 'cde-q-21-5',
                  question: 'Bagaimana cara menyimpan data sensitif (seperti API key) secara aman di Kubernetes?',
                  options: ['Menggunakan objek Secret', 'Hardcode di dalam file YAML deployment', 'Menulis di file README', 'Menyimpan di browser'],
                  correctAnswerIndex: 0,
                  explanation: 'Kubernetes Secrets mengenkripsi atau mengenkode base64 data sensitif.'
                }
              ]
            }
          ]
        },
        {
          id: 'cloud-devops-m22',
          title: 'Module 22 — Kubernetes Application Deployment',
          description: 'Deployments, Services, ConfigMaps, probes, dan resource limits.',
          lessons: [
            {
              id: 'cde-l-22-1',
              title: 'Liveness & Readiness Probes di Kubernetes',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Probes Kesehatan K8s
- **Liveness Probe:** Memeriksa apakah aplikasi sehat; jika gagal, K8s akan me-restart kontainer.
- **Readiness Probe:** Memeriksa apakah aplikasi siap menerima trafik; jika gagal, trafik dialihkan dari Pod tersebut.`
                },
                {
                  type: 'code-example',
                  language: 'yaml',
                  code: `livenessProbe:
  httpGet:
    path: /healthz
    port: 8080
  initialDelaySeconds: 3
  periodSeconds: 5`
                }
              ]
            },
            {
              id: 'cde-l-22-2',
              title: 'Kuis Module 22 — Kubernetes Application Deployment',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'cde-q-22-1',
                  question: 'Apa perbedaan antara Liveness Probe dan Readiness Probe di Kubernetes?',
                  options: ['Liveness menentukan kapan harus merestart pod yang macet, Readiness menentukan kapan pod siap menerima trafik', 'Keduanya sama', 'Readiness untuk restart', 'Liveness untuk database'],
                  correctAnswerIndex: 0,
                  explanation: 'Liveness mengelola pemulihan crash, Readiness mengelola kesiapan trafik.'
                },
                {
                  id: 'cde-q-22-2',
                  question: 'Apa fungsi dari objek Service di Kubernetes?',
                  options: ['Menyediakan alamat IP tetap dan DNS internal yang stabil untuk mengakses sekumpulan Pod', 'Membuat kontainer baru', 'Menghapus log', 'Mengatur penyimpanan disk'],
                  correctAnswerIndex: 0,
                  explanation: 'Services menyediakan load balancing dan service discovery internal.'
                },
                {
                  id: 'cde-q-22-3',
                  question: 'Apa fungsi ConfigMap di Kubernetes?',
                  options: ['Menyimpan data konfigurasi non-sensitif berupa pasangan key-value yang dapat dipasang ke dalam Pod', 'Menyimpan password rahasia', 'Menyimpan file gambar', 'Mengatur CPU'],
                  correctAnswerIndex: 0,
                  explanation: 'ConfigMaps memisahkan konfigurasi dari kode aplikasi.'
                },
                {
                  id: 'cde-q-22-4',
                  question: 'Mengapa pengaturan Resource Requests dan Limits sangat penting untuk Pod?',
                  options: ['Mencegah satu Pod rakus memonopoli seluruh CPU/RAM node dan memicu crash sistem klaster', 'Mempercepat internet', 'Wajib dalam Docker', 'Tidak penting'],
                  correctAnswerIndex: 0,
                  explanation: 'Resource limits menjamin stabilitas penjadwalan sumber daya klaster.'
                },
                {
                  id: 'cde-q-22-5',
                  question: 'Apa itu PersistentVolumeClaim (PVC) di Kubernetes?',
                  options: ['Permintaan penyimpanan (storage request) yang dilakukan oleh pengguna/pod untuk mencadangkan data persisten', 'Kabel jaringan', 'Jenis CPU', 'Nama deployment'],
                  correctAnswerIndex: 0,
                  explanation: 'PVC mengabstraksi penyediaan penyimpanan persisten untuk Pod.'
                }
              ]
            }
          ]
        },
        {
          id: 'cloud-devops-m23',
          title: 'Module 23 — Kubernetes Networking & Scaling',
          description: 'Service discovery, Ingress controllers, horizontal autoscaling, dan rolling updates.',
          lessons: [
            {
              id: 'cde-l-23-1',
              title: 'Ingress Controllers & HPA (Horizontal Pod Autoscaler)',
              type: 'learn',
              xpReward: 50,
              content: [
                {
                  type: 'markdown',
                  content: `### Mengelola Trafik Masuk via Ingress
Objek Ingress mengelola perutean HTTP/HTTPS eksternal ke dalam layanan internal klaster dengan dukungan TLS termination dan path-based routing.`
                },
                {
                  type: 'code-example',
                  language: 'yaml',
                  code: `apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: php-apache-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: php-apache
  minReplicas: 1
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70`
                }
              ]
            },
            {
              id: 'cde-l-23-2',
              title: 'Kuis Module 23 — Kubernetes Networking & Scaling',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'cde-q-23-1',
                  question: 'Apa fungsi utama dari objek Ingress di Kubernetes?',
                  options: ['Mengelola akses HTTP/HTTPS eksternal ke dalam klaster dengan perutean berbasis host/path dan TLS', 'Membuat database', 'Menyimpan secret', 'Mengatur CPU node'],
                  correctAnswerIndex: 0,
                  explanation: 'Ingress bertindak sebagai reverse proxy cerdas untuk trafik eksternal klaster.'
                },
                {
                  id: 'cde-q-23-2',
                  question: 'Bagaimana cara kerja Horizontal Pod Autoscaler (HPA)?',
                  options: ['Secara otomatis menambah atau mengurangi jumlah replika Pod berdasarkan penggunaan metrik CPU/memori', 'Mengganti ukuran fisik server', 'Mematikan klaster', 'Mengubah versi OS'],
                  correctAnswerIndex: 0,
                  explanation: 'HPA menskalakan replika pod secara dinamis merespons beban.'
                },
                {
                  id: 'cde-q-23-3',
                  question: 'Apa itu strategi Rolling Update pada Deployment Kubernetes?',
                  options: ['Memperbarui versi Pod secara bertahap tanpa downtime (mengganti pod lama dengan baru satu per satu)', 'Mematikan semua pod lalu menyalakan ulang', 'Menghapus klaster', 'Merestart seluruh node'],
                  correctAnswerIndex: 0,
                  explanation: 'Rolling update menjamin kelangsungan layanan selama pembaruan.'
                },
                {
                  id: 'cde-q-23-4',
                  question: 'Apa fungsi dari Ingress Controller?',
                  options: ['Implementasi nyata (software seperti Nginx Ingress atau Traefik) yang benar-benar membaca aturan Ingress dan merutekan trafik', 'File konfigurasi YAML', 'Jenis pod', 'Database klaster'],
                  correctAnswerIndex: 0,
                  explanation: 'Ingress Controller mengeksekusi aturan routing Ingress.'
                },
                {
                  id: 'cde-q-23-5',
                  question: 'Apa itu ClusterIP pada Kubernetes Service?',
                  options: ['Tipe service default yang hanya dapat diakses secara internal di dalam klaster', 'IP publik internet', 'Alamat MAC card', 'Password admin'],
                  correctAnswerIndex: 0,
                  explanation: 'ClusterIP mengekspos service secara internal.'
                }
              ]
            }
          ]
        },
        {
          id: 'cloud-devops-m24',
          title: 'Module 24 — Kubernetes Production Engineering',
          description: 'High availability, cluster upgrades, security, backup, dan disaster recovery.',
          lessons: [
            {
              id: 'cde-l-24-1',
              title: 'Keamanan & Backup Klaster Kubernetes',
              type: 'learn',
              xpReward: 50,
              content: [
                {
                  type: 'markdown',
                  content: `### Backup etcd
Data status klaster Kubernetes disimpan di \`etcd\`. Backup rutin etcd adalah kunci mutlak untuk pemulihan bencana (*disaster recovery*) klaster produksi.`
                },
                {
                  type: 'code-example',
                  language: 'bash',
                  code: `# Snapshot etcd untuk backup
ETCDCTL_API=3 etcdctl snapshot save snapshot.db \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/server.crt \
  --key=/etc/kubernetes/pki/etcd/server.key`
                }
              ]
            },
            {
              id: 'cde-l-24-2',
              title: 'Kuis Module 24 — Kubernetes Production Engineering',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'cde-q-24-1',
                  question: 'Di mana Kubernetes menyimpan seluruh status, konfigurasi, dan data klaster secara terpusat?',
                  options: ['etcd (distributed key-value store)', 'Dalam RAM worker node', 'Di browser cache', 'Di file log nginx'],
                  correctAnswerIndex: 0,
                  explanation: 'etcd adalah sumber kebenaran tunggal (*single source of truth*) klaster K8s.'
                },
                {
                  id: 'cde-q-24-2',
                  question: 'Mengapa melakukan backup etcd secara berkala sangat krusial dalam produksi?',
                  options: ['Memungkinkan pemulihan total seluruh klaster saat terjadi bencana kegagalan data parah', 'Mempercepat jaringan', 'Menghemat CPU', 'Menghapus pod macet'],
                  correctAnswerIndex: 0,
                  explanation: 'Snapshot etcd adalah fondasi pemulihan bencana klaster K8s.'
                },
                {
                  id: 'cde-q-24-3',
                  question: 'Apa fungsi dari Network Policies di Kubernetes?',
                  options: ['Mengontrol aturan lalu lintas jaringan antar Pod atau namespace (firewall internal klaster)', 'Mengatur kecepatan internet', 'Membuat domain web', 'Menyimpan password'],
                  correctAnswerIndex: 0,
                  explanation: 'Network policies mengisolasi komunikasi antar pod secara mikrosegmentasi.'
                },
                {
                  id: 'cde-q-24-4',
                  question: 'Apa itu RBAC (Role-Based Access Control) di Kubernetes?',
                  options: ['Sistem otorisasi untuk mengatur siapa (pengguna/service account) yang dapat melakukan aksi apa pada resource K8s', 'Pengaturan router', 'Kabel jaringan', 'Format backup'],
                  correctAnswerIndex: 0,
                  explanation: 'RBAC membatasi hak akses operasional klaster secara ketat.'
                },
                {
                  id: 'cde-q-24-5',
                  question: 'Bagaimana cara memastikan tingkat ketersediaan tinggi (High Availability) pada Control Plane K8s?',
                  options: ['Menjalankan beberapa master node secara redundan di belakang load balancer dengan etcd terdistribusi', 'Menggunakan 1 laptop saja', 'Mematikan firewall', 'Tanpa backup'],
                  correctAnswerIndex: 0,
                  explanation: 'Multi-master HA mencegah titik kegagalan tunggal (*single point of failure*).'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'cde-lvl-4',
      title: 'Level 4 — Observability, DevSecOps, SRE & Capstone',
      description: 'Monitoring, metrics, distributed tracing, DevSecOps pipelines, SRE error budgets, optimization, dan Capstone.',
      modules: [
        {
          id: 'cloud-devops-m25',
          title: 'Module 25 — Monitoring & Metrics',
          description: 'Prometheus, Grafana, time series, RED method, dan alerting.',
          lessons: [
            {
              id: 'cde-l-25-1',
              title: 'Metode RED & Prometheus Monitoring',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Metode RED untuk Layanan Mikroservis
Untuk setiap layanan, ukur:
- **Rate:** Jumlah permintaan per detik.
- **Errors:** Jumlah permintaan gagal per detik.
- **Duration:** Waktu tanggapan (*latency*).`
                },
                {
                  type: 'code-example',
                  language: 'yaml',
                  code: `# Contoh Prometheus Alert Rule
groups:
- name: service-alerts
  rules:
  - alert: HighErrorRate
    expr: rate(http_requests_total{status=~"5.*"}[5m]) > 0.05
    for: 2m
    labels:
      severity: critical`
                }
              ]
            },
            {
              id: 'cde-l-25-2',
              title: 'Kuis Module 25 — Monitoring & Metrics',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'cde-q-25-1',
                  question: 'Apa singkatan dari metode RED dalam pemantauan kesehatan layanan berbasis web?',
                  options: ['Rate, Errors, Duration', 'Ram, Disk, Energy', 'Router, Endpoint, Database', 'Request, Execution, Data'],
                  correctAnswerIndex: 0,
                  explanation: 'RED berfokus pada Rate, Errors, dan Duration untuk metrik layanan.'
                },
                {
                  id: 'cde-q-25-2',
                  question: 'Apa fungsi utama dari Prometheus dalam ekosistem cloud-native?',
                  options: ['Mengumpulkan metrik time-series dari target layanan via scraping dan menyediakan bahasa kueri (PromQL)', 'Menyimpan file log teks', 'Membuat kontainer Docker', 'Mengelola git branch'],
                  correctAnswerIndex: 0,
                  explanation: 'Prometheus adalah standar industri untuk pengumpulan metrik time-series.'
                },
                {
                  id: 'cde-q-25-3',
                  question: 'Apa fungsi Grafana dalam stack observabilitas?',
                  options: ['Memvisualisasikan metrik dari sumber seperti Prometheus ke dalam dashboard grafik yang informatif', 'Menulis kode backend', 'Menyimpan database SQL', 'Membuat jaringan VPN'],
                  correctAnswerIndex: 0,
                  explanation: 'Grafana menyediakan visualisasi dashboard metrik yang kaya.'
                },
                {
                  id: 'cde-q-25-4',
                  question: 'Mengapa alert paging (notifikasi malam hari untuk tim on-call) harus dibatasi hanya untuk insiden nyata yang dapat ditindaklanjuti?',
                  options: ['Mencegah kelelahan alarm (*alert fatigue*) yang membuat operator mengabaikan peringatan penting', 'Menghemat pulsa telepon', 'Agar server tidak berisik', 'Tidak penting'],
                  correctAnswerIndex: 0,
                  explanation: 'Alert fatigue memicu kelalaian terhadap insiden kritis sungguhan.'
                },
                {
                  id: 'cde-q-25-5',
                  question: 'Apa itu Time Series Database (TSDB)?',
                  options: ['Database yang dioptimalkan khusus untuk menyimpan data berstempel waktu (timestamped metrics)', 'Database tabel relasional biasa', 'Penyimpanan file video', 'Cache browser'],
                  correctAnswerIndex: 0,
                  explanation: 'TSDB menangani volume data metrik berbasis waktu secara efisien.'
                }
              ]
            }
          ]
        },
        {
          id: 'cloud-devops-m26',
          title: 'Module 26 — Logging & Distributed Tracing',
          description: 'Structured logging, centralized logs, correlation IDs, dan distributed tracing.',
          lessons: [
            {
              id: 'cde-l-26-1',
              title: 'Structured Logging & Correlation IDs',
      type: 'learn',
      xpReward: 45,
      content: [
        {
          type: 'markdown',
          content: `### Mengapa Structured Logging (JSON)?
Log berbentuk teks bebas sulit diurai oleh mesin. Menggunakan format JSON terstruktur dengan **Correlation ID** memungkinkan pelacakan perjalanan satu request melintasi puluhan mikroservis.`
        },
        {
          type: 'code-example',
          language: 'python',
          code: `import json
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("auth-service")

def handle_request(req_id, user):
    log_data = {"timestamp": "2026-09-22T12:00:00Z", "correlation_id": req_id, "event": "login_success", "user": user}
    logger.info(json.dumps(log_data))`
        }
      ]
    },
            {
              id: 'cde-l-26-2',
              title: 'Kuis Module 26 — Logging & Distributed Tracing',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'cde-q-26-1',
                  question: 'Apa keuntungan utama Structured Logging (format JSON) dibanding teks biasa?',
                  options: ['Memungkinkan sistem agregasi log (seperti ELK/Grafana Loki) mengindeks dan memfilter field data dengan mudah', 'Ukuran file lebih besar', 'Hanya bisa dibaca manusia', 'Wajib dalam C++'],
                  correctAnswerIndex: 0,
                  explanation: 'JSON logs mempermudah kueri pencarian dan analisis otomatis.'
                },
                {
                  id: 'cde-q-26-2',
                  question: 'Apa fungsi dari Correlation ID dalam arsitektur mikroservis?',
                  options: ['Melacak dan menghubungkan jejak satu permintaan (request) saat melintasi berbagai layanan berbeda', 'Nomor identifikasi server', 'Password database', 'Port jaringan'],
                  correctAnswerIndex: 0,
                  explanation: 'Correlation ID menyatukan log tersebar dari berbagai servis.'
                },
                {
                  id: 'cde-q-26-3',
                  question: 'Apa peran Distributed Tracing (misal: OpenTelemetry / Jaeger)?',
                  options: ['Memvisualisasikan alur perjalanan request dan latensi setiap hop antar mikroservis', 'Melacak lokasi fisik server', 'Memantau penggunaan RAM', 'Membuat backup database'],
                  correctAnswerIndex: 0,
                  explanation: 'Distributed tracing memetakan latensi dan titik kemacetan lintas servis.'
                },
                {
                  id: 'cde-q-26-4',
                  question: 'Mengapa log sentralisasi (Centralized Logging) diperlukan dalam sistem cloud?',
                  options: ['Kontainer bersifat sementara; jika kontainer mati, log lokalnya akan hilang sehingga harus langsung dikirim ke penyimpanan pusat', 'Agar hard disk cepat penuh', 'Membuat internet lambat', 'Tidak ada alasan'],
                  correctAnswerIndex: 0,
                  explanation: 'Ephemeral containers mengharuskan pengumpulan log eksternal secara real-time.'
                },
                {
                  id: 'cde-q-26-5',
                  question: 'Apa arti dari log level ERROR?',
                  options: ['Menandakan terjadinya kegagalan operasional yang memerlukan perhatian atau intervensi segera', 'Informasi normal', 'Peringatan sepele', 'Status sukses'],
                  correctAnswerIndex: 0,
                  explanation: 'ERROR menandakan kegagalan fungsional yang memerlukan investigasi.'
                }
              ]
            }
          ]
        },
        {
          id: 'cloud-devops-m27',
          title: 'Module 27 — DevSecOps',
          description: 'Security scanning, SAST, DAST, dependency scanning, dan SBOM.',
          lessons: [
            {
              id: 'cde-l-27-1',
              title: 'Mengamankan Rantai Pasok Perangkat Lunak (SBOM)',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Software Bill of Materials (SBOM)
SBOM adalah daftar inventaris komprehensif dari semua komponen dan dependensi pihak ketiga di dalam perangkat lunak, esensial untuk audit kerentanan keamanan (*supply chain security*).`
                },
                {
                  type: 'code-example',
                  language: 'bash',
                  code: `# Pemindaian kerentanan kontainer dengan Trivy
trivy image my-app:latest`
                }
              ]
            },
            {
              id: 'cde-l-27-2',
              title: 'Kuis Module 27 — DevSecOps',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'cde-q-27-1',
                  question: 'Apa itu SAST (Static Application Security Testing)?',
                  options: ['Analisis keamanan kode sumber secara statis tanpa mengeksekusi program untuk mencari celah kerentanan', 'Pengujian saat aplikasi berjalan', 'Uji kecepatan jaringan', 'Pemeriksaan disk'],
                  correctAnswerIndex: 0,
                  explanation: 'SAST memindai kode sumber di awal pipeline CI.'
                },
                {
                  id: 'cde-q-27-2',
                  question: 'Apa fungsi dari SBOM (Software Bill of Materials)?',
                  options: ['Menyediakan daftar inventaris seluruh pustaka dan dependensi pihak ketiga yang digunakan dalam aplikasi', 'Daftar harga server', 'Panduan pengguna', 'Log error'],
                  correctAnswerIndex: 0,
                  explanation: 'SBOM melacak seluruh komponen dependensi untuk audit keamanan.'
                },
                {
                  id: 'cde-q-27-3',
                  question: 'Apa itu pemindaian kerentanan container image (Container Scanning)?',
                  options: ['Memeriksa apakah base image atau paket sistem di dalam Docker image memiliki CVE (Common Vulnerabilities and Exposures) terkenal', 'Memeriksa kapasitas ukuran file', 'Menghapus kontainer', 'Uji kecepatan build'],
                  correctAnswerIndex: 0,
                  explanation: 'Container scanning mendeteksi kerentanan pada paket OS dan pustaka kontainer.'
                },
                {
                  id: 'cde-q-27-4',
                  question: 'Apa prinsip "Shift Left" dalam keamanan DevSecOps?',
                  options: ['Memindahkan pengujian dan pemeriksaan keamanan sedini mungkin ke awal tahap pengembangan (sejak penulisan kode)', 'Memindahkan tombol ke kiri', 'Mengurangi staf keamanan', 'Menutup akses server'],
                  correctAnswerIndex: 0,
                  explanation: 'Shift left menemukan dan memperbaiki kerentanan lebih awal dan lebih murah.'
                },
                {
                  id: 'cde-q-27-5',
                  question: 'Apa perbedaan antara SAST dan DAST?',
                  options: ['SAST menganalisis kode statis, DAST menguji aplikasi berjalan dari luar secara dinamis (black-box testing)', 'Keduanya sama persis', 'DAST untuk database', 'SAST untuk server fisik'],
                  correctAnswerIndex: 0,
                  explanation: 'SAST memeriksa kode, DAST menguji aplikasi saat berjalan.'
                }
              ]
            }
          ]
        },
        {
          id: 'cloud-devops-m28',
          title: 'Module 28 — Reliability Engineering / SRE',
          description: 'SLIs, SLOs, SLAs, error budgets, incident response, dan postmortems.',
          lessons: [
            {
              id: 'cde-l-28-1',
              title: 'Mengelola Error Budgets & SLO',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Definisi SRE Kunci
- **SLI (Indicator):** Metrik kinerja kuantitatif (misal: rasio request sukses).
- **SLO (Objective):** Target keandalan yang disepakati (misal: ketersediaan 99.9%).
- **Error Budget:** Batas toleransi kegagalan (100% - SLO). Jika habis, rilis fitur dihentikan dan fokus dialihkan ke stabilitas.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `# Kalkulasi sederhana Error Budget ketersediaan 99.9% per bulan`
                }
              ]
            },
            {
              id: 'cde-l-28-2',
              title: 'Kuis Module 28 — Reliability Engineering / SRE',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'cde-q-28-1',
                  question: 'Apa perbedaan antara SLO (Service Level Objective) dan SLA (Service Level Agreement)?',
                  options: ['SLO adalah target internal keandalan teknis, SLA adalah kontrak komersial legal dengan konsekuensi penalti finansial bagi pelanggan', 'Keduanya sama persis', 'SLA adalah target internal', 'SLO melibatkan pengacara'],
                  correctAnswerIndex: 0,
                  explanation: 'SLO adalah target internal tim, SLA adalah janji kontrak bisnis.'
                },
                {
                  id: 'cde-q-28-2',
                  question: 'Apa itu Error Budget dalam praktik SRE?',
                  options: ['Toleransi ketidaktersediaan atau kegagalan sistem yang diizinkan sebelum melanggar target SLO', 'Anggaran biaya server cloud', 'Gaji tim SRE', 'Waktu istirahat'],
                  correctAnswerIndex: 0,
                  explanation: 'Error budget menyeimbangkan kecepatan inovasi dan keandalan sistem.'
                },
                {
                  id: 'cde-q-28-3',
                  question: 'Apa tujuan utama dari blameless postmortem setelah terjadi insiden besar?',
                  options: ['Menganalisis akar penyebab sistemik tanpa menyalahkan individu guna mencegah insiden serupa terulang', 'Mencari siapa yang harus dipecat', 'Menghapus log error', 'Membuat laporan fiktif'],
                  correctAnswerIndex: 0,
                  explanation: 'Blameless postmortem fokus memperbaiki proses dan sistem, bukan orang.'
                },
                {
                  id: 'cde-q-28-4',
                  question: 'Apa yang harus dilakukan tim jika Error Budget suatu layanan habis terkuras?',
                  options: ['Menghentikan sementara peluncuran fitur baru dan memprioritaskan perbaikan keandalan serta bug', 'Terus merilis fitur baru', 'Mematikan layanan selamanya', 'Menaikkan harga'],
                  correctAnswerIndex: 0,
                  explanation: 'Kehabisan error budget mengalihkan fokus total ke stabilitas sistem.'
                },
                {
                  id: 'cde-q-28-5',
                  question: 'Apa itu SLI (Service Level Indicator)?',
                  options: ['Ukuran kuantitatif dari tingkat layanan yang diberikan (misal: latensi request HTTP)', 'Nama server', 'Password database', 'Dokumen kontrak'],
                  correctAnswerIndex: 0,
                  explanation: 'SLI adalah metrik dasar yang mendasari perhitungan SLO.'
                }
              ]
            }
          ]
        },
        {
          id: 'cloud-devops-m29',
          title: 'Module 29 — Scalability & High Availability',
          description: 'Horizontal/vertical scaling, load balancing, caching, failover, dan disaster recovery.',
          lessons: [
            {
              id: 'cde-l-29-1',
              title: 'Strategi Disaster Recovery: RPO & RTO',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Metrik Pemulihan Bencana
- **RPO (Recovery Point Objective):** Batas maksimum toleransi kehilangan data (seberapa sering backup dilakukan).
- **RTO (Recovery Time Objective):** Batas maksimum waktu yang dibutuhkan untuk memulihkan layanan setelah kegagalan.`
                },
                {
                  type: 'code-example',
                  language: 'bash',
                  code: `# Skrip otomatisasi snapshot database berkala`
                }
              ]
            },
            {
              id: 'cde-l-29-2',
              title: 'Kuis Module 29 — Scalability & High Availability',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'cde-q-29-1',
                  question: 'Apa perbedaan antara RPO (Recovery Point Objective) dan RTO (Recovery Time Objective)?',
                  options: ['RPO mengukur batas toleransi kehilangan data (waktu mundur), RTO mengukur batas waktu pemulihan sistem', 'Keduanya mengukur waktu yang sama', 'RTO adalah ukuran data', 'RPO adalah biaya'],
                  correctAnswerIndex: 0,
                  explanation: 'RPO berkaitan dengan data loss, RTO berkaitan dengan downtime recovery.'
                },
                {
                  id: 'cde-q-29-2',
                  question: 'Apa keuntungan utama Scaling Horizontal dibanding Scaling Vertikal?',
                  options: ['Horizontal dapat dilakukan tanpa batas fisik mesin dengan menambah jumlah instance (out), tidak ada batas tunggal', 'Horizontal selalu lebih murah', 'Vertikal tidak memerlukan jaringan', 'Tidak ada bedanya'],
                  correctAnswerIndex: 0,
                  explanation: 'Scaling horizontal menghindari batas fisik kapasitas satu server.'
                },
                {
                  id: 'cde-q-29-3',
                  question: 'Apa fungsi dari mekanisme Failover otomatis dalam High Availability?',
                  options: ['Mengalihkan trafik secara otomatis ke server/region cadangan saat server utama mengalami kegagalan total', 'Mematikan server utama', 'Menghapus data lama', 'Memperbarui OS'],
                  correctAnswerIndex: 0,
                  explanation: 'Failover menjaga kelangsungan layanan saat terjadi kegagalan.'
                },
                {
                  id: 'cde-q-29-4',
                  question: 'Mengapa caching (seperti Redis/Memcached) meningkatkan skalabilitas sistem?',
                  options: ['Menyimpan hasil kueri/data sering di RAM sehingga mengurangi beban langsung ke database utama', 'Menambah kapasitas hard disk', 'Mempercepat kecepatan kabel', 'Mengenkripsi database'],
                  correctAnswerIndex: 0,
                  explanation: 'Caching memangkas latensi dan beban I/O database secara drastis.'
                },
                {
                  id: 'cde-q-29-5',
                  question: 'Apa itu arsitektur Stateless pada aplikasi berbasis cloud?',
                  options: ['Aplikasi tidak menyimpan data sesi pengguna di memori lokal server, melainkan di database/cache terpusat agar mudah diskalakan', 'Aplikasi tanpa database', 'Aplikasi tanpa kode', 'Aplikasi offline'],
                  correctAnswerIndex: 0,
                  explanation: 'Stateless apps memungkinkan load balancing dan autoscaling tanpa kehilangan sesi.'
                }
              ]
            }
          ]
        },
        {
          id: 'cloud-devops-m30',
          title: 'Module 30 — Performance & Cost Optimization',
          description: 'Resource utilization, right-sizing, cloud cost management, dan caching optimization.',
          lessons: [
            {
              id: 'cde-l-30-1',
              title: 'FinOps & Right-Sizing Cloud Resources',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Apa itu FinOps?
FinOps adalah praktik keuangan DevOps yang menyatukan tim teknik, keuangan, dan bisnis untuk mengoptimalkan pengeluaran cloud (*cloud cost optimization*) tanpa mengorbankan performa.`
                },
                {
                  type: 'code-example',
                  language: 'bash',
                  code: `# Analisis pemanfaatan resource CPU/RAM dengan tool monitoring`
                }
              ]
            },
            {
              id: 'cloud-devops-m30-2',
              title: 'Kuis Module 30 — Performance & Cost Optimization',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'cde-q-30-1',
                  question: 'Apa arti dari praktik FinOps dalam rekayasa cloud modern?',
                  options: ['Menyatukan akuntabilitas keuangan dan teknik untuk mengoptimalkan biaya pengeluaran cloud', 'Membuat laporan pajak', 'Membeli server fisik murah', 'Menghapus server'],
                  correctAnswerIndex: 0,
                  explanation: 'FinOps menyelaraskan efisiensi biaya dengan kecepatan pengembangan.'
                },
                {
                  id: 'cde-q-30-2',
                  question: 'Apa itu Right-Sizing dalam konteks manajemen infrastruktur cloud?',
                  options: ['Menyesuaikan ukuran instance/resource (CPU dan RAM) agar pas dengan kebutuhan beban kerja aktual tanpa pemborosan', 'Memperbesar semua server', 'Membeli instance termahal', 'Menghapus instance'],
                  correctAnswerIndex: 0,
                  explanation: 'Right-sizing mengeliminasi pemborosan kapasitas over-provisioned.'
                },
                {
                  id: 'cde-q-30-3',
                  question: 'Bagaimana instans Spot Instances di cloud dapat menekan biaya secara drastis?',
                  options: ['Memanfaatkan kapasitas idle/sisa server cloud dengan harga sangat murah (namun bisa diambil kembali sewaktu-waktu)', 'Mendapat diskon permanen', 'Menggunakan tenaga surya', 'Gratis selamanya'],
                  correctAnswerIndex: 0,
                  explanation: 'Spot instances menawarkan diskon hingga 90% untuk workload fault-tolerant.'
                },
                {
                  id: 'cde-q-30-4',
                  question: 'Apa dampak buruk dari over-provisioning sumber daya server?',
                  options: ['Pemborosan biaya finansial yang masif tanpa peningkatan performa yang berarti', 'Aplikasi langsung crash', 'Keamanan meningkat', 'Koneksi internet lambat'],
                  correctAnswerIndex: 0,
                  explanation: 'Over-provisioning membuang anggaran untuk kapasitas yang tidak terpakai.'
                },
                {
                  id: 'cde-q-30-5',
                  question: 'Mengapa pemantauan metrik utilisasi disk dan memori penting untuk optimalisasi?',
                  options: ['Mencegah kebocoran memori (memory leak) dan kehabisan ruang disk sebelum berdampak buruk pada pengguna', 'Hanya untuk formalitas', 'Menambah kecepatan CPU', 'Menghemat listrik'],
                  correctAnswerIndex: 0,
                  explanation: 'Pemantauan metrik mendeteksi anomali performa sebelum kegagalan total.'
                }
              ]
            }
          ]
        },
        {
          id: 'cloud-devops-m31',
          title: 'Module 31 — Production Operations',
          description: 'Deployment strategies (rolling, blue/green, canary), runbooks, dan incident management.',
          lessons: [
            {
              id: 'cde-l-31-1',
              title: 'Blue/Green & Canary Deployments',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Strategi Rilis Tanpa Downtime
- **Blue/Green:** Menjaga dua lingkungan identik (Blue = aktif, Green = baru). Alihkan router seketika jika Green stabil.
- **Canary:** Merilis versi baru ke sebagian kecil pengguna terlebih dahulu sebelum rollout penuh.`
                },
                {
                  type: 'code-example',
                  language: 'yaml',
                  code: `# Konfigurasi rilis bertahap Canary`
                }
              ]
            },
            {
              id: 'cde-l-31-2',
              title: 'Kuis Module 31 — Production Operations',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'cde-q-31-1',
                  question: 'Apa keunggulan utama strategi Blue/Green Deployment?',
                  options: ['Memungkinkan zero-downtime deployment dan rollback instan cukup dengan mengalihkan router ke lingkungan lama jika ada masalah', 'Membutuhkan server lebih sedikit', 'Lebih lambat dari manual', 'Tidak memerlukan testing'],
                  correctAnswerIndex: 0,
                  explanation: 'Blue/green deployment memungkinkan peralihan instan dan rollback aman.'
                },
                {
                  id: 'cde-q-31-2',
                  question: 'Bagaimana cara kerja Canary Deployment?',
                  options: ['Merilis versi baru aplikasi ke sebagian kecil persentase pengguna terlebih dahulu untuk memantau error sebelum rilis penuh', 'Merilis ke burung kenari', 'Merilis saat malam hari', 'Menghapus versi lama'],
                  correctAnswerIndex: 0,
                  explanation: 'Canary deployment meminimalkan risiko ledakan bug ke seluruh pengguna.'
                },
                {
                  id: 'cde-q-31-3',
                  question: 'Apa fungsi dari Runbook operasional dalam manajemen insiden?',
                  options: ['Dokuan panduan langkah demi langkah tertulis bagi engineer untuk mendiagnosis dan menyelesaikan insiden rutin', 'Buku catatan harian', 'Laporan keuangan', 'Kode program'],
                  correctAnswerIndex: 0,
                  explanation: 'Runbook mempercepat waktu resolusi insiden (*MTTR*).'
                },
                {
                  id: 'cde-q-31-4',
                  question: 'Apa arti MTTR (Mean Time to Resolution / Recovery)?',
                  options: ['Rata-rata waktu yang dibutuhkan untuk memulihkan layanan setelah terjadi kegagalan/insiden', 'Waktu perbaikan bug', 'Kecepatan server', 'Durasi deployment'],
                  correctAnswerIndex: 0,
                  explanation: 'MTTR adalah metrik utama efisiensi respons insiden.'
                },
                {
                  id: 'cde-q-31-5',
                  question: 'Mengapa rotasi on-call engineer penting dalam operasional DevOps?',
                  options: ['Membagi tanggung jawab pemantauan darurat secara adil dan mencegah kelelahan mental (*burnout*)', 'Agar semua orang libur', 'Menghilangkan kebutuhan server', 'Wajib dalam hukum'],
                  correctAnswerIndex: 0,
                  explanation: 'Rotasi on-call menjaga kesehatan tim sekaligus keandalan layanan.'
                }
              ]
            }
          ]
        },
        {
          id: 'cloud-devops-m32',
          title: 'Module 32 — Cloud & DevOps Capstone',
          description: 'Membangun platform cloud produksi end-to-end.',
      lessons: [
            {
              id: 'cde-l-32-1',
              title: 'Capstone: Production Cloud Platform',
              type: 'project',
              xpReward: 250,
              content: [
                {
                  type: 'markdown',
                  content: `### Proyek Akhir: Production Cloud Platform
Integrasikan seluruh materi dari modul 1 hingga 31:
1. **Git & CI/CD Pipeline:** Otomatisasi build, test, dan security scan.
2. **Containerization:** Docker multi-stage build dan registry push.
3. **Infrastructure as Code:** Provisioning cloud VPC & Kubernetes via Terraform.
4. **Kubernetes Production:** Deployment, Ingress, HPA, dan monitoring Prometheus/Grafana.
5. **SRE & Operations:** Runbook, error budget, dan disaster recovery.

Selamat menyelesaikan kurikulum Cloud & DevOps Engineering COMMANDEV!`
                },
                {
                  type: 'code-example',
                  language: 'hcl',
                  code: `# Arsitektur Capstone Cloud Platform`
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
