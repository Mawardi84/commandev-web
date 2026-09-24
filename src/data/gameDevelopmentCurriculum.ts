import { Course } from '../types';

export const GAME_DEVELOPMENT_COURSE: Course = {
  id: 'game-development',
  title: 'Game Development',
  shortDescription: 'Learn to design, program, test, optimize, secure, and deploy playable games from fundamentals to advanced systems.',
  description: 'Membawa learner dari benar-benar pemula sampai mampu merancang, membuat, menguji, mengoptimalkan, mengamankan, dan melakukan deployment game yang playable menggunakan Canvas API, Web APIs, dan arsitektur game modern.',
  icon: 'gamepad-2',
  levels: [
    {
      id: 'gd-lvl-1',
      title: 'Level 1 — Game Programming Fundamentals',
      description: 'Pengenalan alur kerja game development, arsitektur client-side, dan logika dasar pemrograman game.',
      modules: [
        {
          id: 'gd-mod-1',
          title: 'Module 1 — Introduction to Game Development',
          description: 'Memahami dasar-dasar game design, game engine vs framework, dan workflow pembuatan game.',
          lessons: [
            {
              id: 'gd-les-1-1',
              title: 'Apa itu Game Development & Game Loop',
              type: 'learn',
              xpReward: 30,
              content: [
                {
                  type: 'markdown',
                  content: `### 1. Apa itu Game Development?
Game Development adalah seni dan proses teknis dalam menciptakan permainan interaktif untuk komputer, konsol, atau web. Ini menggabungkan pemrograman, desain visual, audio, dan narasi.

### 2. Konsep Inti: Game Loop
Berbeda dengan aplikasi bisnis standar yang menunggu aksi pengguna (*event-driven*), game berjalan secara terus-menerus melalui **Game Loop**.
- **Update**: Memperbarui posisi objek, memeriksa input, dan menghitung fisika.
- **Render**: Menggambar ulang seluruh elemen grafis ke layar pada setiap frame (biasanya 60 kali per detik atau 60 FPS).`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `// Struktur Dasar Game Loop di JavaScript/TypeScript
let lastTime = 0;

function gameLoop(timestamp: number) {
  const deltaTime = (timestamp - lastTime) / 1000; // Waktu antar frame dalam detik
  lastTime = timestamp;

  // 1. Update logika game
  updateGame(deltaTime);

  // 2. Render grafis ke layar
  renderGame();

  // 3. Minta frame berikutnya
  requestAnimationFrame(gameLoop);
}

// Mulai game loop
requestAnimationFrame(gameLoop);`
                }
              ]
            }
          ]
        },
        {
          id: 'gd-mod-2',
          title: 'Module 2 — Programming Fundamentals for Games',
          description: 'Variabel, kondisi, loop, dan struktur data yang esensial untuk logika game.',
          lessons: [
            {
              id: 'gd-les-1-2',
              title: 'Variabel & State Game',
              type: 'learn',
              xpReward: 30,
              content: [
                {
                  type: 'markdown',
                  content: `### State Management dalam Game
Setiap game memerlukan state untuk menyimpan skor, posisi pemain, nyawa (health), dan status game (menu, playing, game over).`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `interface GameState {
  score: number;
  health: number;
  isGameOver: boolean;
  player: { x: number; y: number; speed: number };
}

const gameState: GameState = {
  score: 0,
  health: 100,
  isGameOver: false,
  player: { x: 100, y: 150, speed: 5 }
};`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'gd-lvl-2',
      title: 'Level 2 — 2D Game Development',
      description: 'Menguasai HTML5 Canvas API dan implementasi game loop tingkat lanjut.',
      modules: [
        {
          id: 'gd-mod-3',
          title: 'Module 3 — Canvas Fundamentals',
          description: 'Menggambar bentuk, sprite, dan teks menggunakan Canvas 2D Context.',
          lessons: [
            {
              id: 'gd-les-2-1',
              title: 'Pengenalan HTML5 Canvas',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### HTML5 Canvas
Canvas adalah elemen HTML (<canvas>) yang memungkinkan kita menggambar grafik secara dinamis menggunakan skrip JavaScript.`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

// Menggambar kotak player
ctx.fillStyle = '#6366f1';
ctx.fillRect(50, 50, 40, 40);`
                }
              ]
            }
          ]
        },
        {
          id: 'gd-mod-4',
          title: 'Module 4 — Game Loop & Delta Time',
          description: 'Menjaga kecepatan game tetap konsisten di berbagai spesifikasi perangkat menggunakan delta time.',
          lessons: [
            {
              id: 'gd-les-2-2',
              title: 'Menggunakan Delta Time untuk Gerakan Halus',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### Delta Time (dt)
Delta time memastikan bahwa objek bergerak berdasarkan waktu nyata, bukan kecepatan frame komputer (\`fps\`).`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `let playerX = 100;
const speed = 200; // piksel per detik

function update(dt: number) {
  playerX += speed * dt; // Gerakan konsisten terlepas dari FPS
}`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'gd-lvl-3',
      title: 'Level 3 — Player & Input System',
      description: 'Menangani input keyboard, mouse, touch, serta membangun player controller yang responsif.',
      modules: [
        {
          id: 'gd-mod-5',
          title: 'Module 5 — Input Handling',
          description: 'Mendengarkan event keydown dan keyup secara aman.',
          lessons: [
            {
              id: 'gd-les-3-1',
              title: 'Manajemen Status Tombol Keyboard',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### Input State Map
Menyimpan status tombol yang sedang ditekan mencegah jeda (delay) bawaan OS saat tombol ditahan.`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `const keys: Record<string, boolean> = {};

window.addEventListener('keydown', e => keys[e.code] = true);
window.addEventListener('keyup', e => keys[e.code] = false);

// Di dalam update loop:
if (keys['ArrowRight'] || keys['KeyD']) {
  player.x += player.speed;
}`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'gd-lvl-4',
      title: 'Level 4 — Collision & Physics',
      description: 'Deteksi benturan AABB (Axis-Aligned Bounding Box), lingkaran, dan simulasi gravitasi.',
      modules: [
        {
          id: 'gd-mod-7',
          title: 'Module 7 — Collision Detection',
          description: 'Algoritma mendeteksi persimpangan dua kotak atau objek.',
          lessons: [
            {
              id: 'gd-les-4-1',
              title: 'Deteksi Benturan Kotak (AABB)',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### AABB Collision
Axis-Aligned Bounding Box adalah cara paling efisien untuk mendeteksi apakah dua persegi panjang saling bersentuhan.`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `function checkCollision(rect1: any, rect2: any): boolean {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
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
      id: 'gd-lvl-5',
      title: 'Level 5 — Game Mechanics & Combat',
      description: 'Aturan game, sistem skor, nyawa, power-up, dan sistem pertarungan (combat).',
      modules: [
        {
          id: 'gd-mod-9',
          title: 'Module 9 — Core Game Mechanics',
          description: 'Membangun loop kemenangan, kekalahan, dan collectible item.',
          lessons: [
            {
              id: 'gd-les-5-1',
              title: 'Koleksi Item & Skor',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Mekanik Collectible
Menambahkan koin atau permata yang meningkatkan skor saat disentuh player.`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `if (checkCollision(player, coin)) {
  score += 10;
  coin.isCollected = true;
  playSound('coin_pickup');
}`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'gd-lvl-6',
      title: 'Level 6 — Graphics, Sprites & Camera',
      description: 'Animasi sprite sheet, sistem kamera yang mengikuti player, dan efek paralaks.',
      modules: [
        {
          id: 'gd-mod-11',
          title: 'Module 11 — Sprite Animation',
          description: 'Memotong sprite sheet untuk animasi berjalan dan melompat.',
          lessons: [
            {
              id: 'gd-les-6-1',
              title: 'Rendering Sprite Sheet',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Sprite Sheet Animation
Mengambil frame tertentu dari satu gambar besar berdasarkan waktu elapsed.`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `// ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'gd-lvl-7',
      title: 'Level 7 — Game Architecture',
      description: 'State machines untuk menu, gameplay, pause, dan game over, serta Entity-Component-System (ECS).',
      modules: [
        {
          id: 'gd-mod-13',
          title: 'Module 13 — Game State Architecture',
          description: 'Mengelola transisi antar layar game dengan bersih.',
          lessons: [
            {
              id: 'gd-les-7-1',
              title: 'Finite State Machine untuk Layar Game',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### State Machine
Mencegah kerancuan logika dengan membagi state game menjadi: 'MENU', 'PLAYING', 'PAUSED', 'GAMEOVER'.`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `type GameStateMode = 'MENU' | 'PLAYING' | 'PAUSED' | 'GAMEOVER';
let currentMode: GameStateMode = 'MENU';`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'gd-lvl-8',
      title: 'Level 8 — UI, Audio & Effects',
      description: 'HUD game, Web Audio API untuk efek suara dan BGM, serta sistem partikel (visual effects).',
      modules: [
        {
          id: 'gd-mod-15',
          title: 'Module 15 — Game UI & Audio',
          description: 'Menampilkan bar nyawa, skor, dan memutar suara dengan Web Audio.',
          lessons: [
            {
              id: 'gd-les-8-1',
              title: 'HTML Overlay untuk Game HUD',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### HUD Overlay
Menggunakan elemen DOM di atas canvas untuk menampilkan teks skor dan health bar yang responsif.`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `document.getElementById('scoreDisplay')!.innerText = \`Score: \${score}\`;`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'gd-lvl-9',
      title: 'Level 9 — Data & Save System',
      description: 'Penyimpanan data lokal (localStorage), serialisasi JSON, dan manajemen profil pemain.',
      modules: [
        {
          id: 'gd-mod-19',
          title: 'Module 19 — Save & Load',
          description: 'Menyimpan progres level dan high score pemain.',
          lessons: [
            {
              id: 'gd-les-9-1',
              title: 'Persistensi Data dengan localStorage',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Save Game JSON
Mengubah objek game state menjadi string JSON dan menyimpannya di browser.`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `localStorage.setItem('commandev_game_save', JSON.stringify({ highScore: 5400, level: 3 }));`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'gd-lvl-10',
      title: 'Level 10 — Advanced Gameplay & ProcGen',
      description: 'Desain level berbasis tilemap dan pembuatan level prosedural (procedural generation).',
      modules: [
        {
          id: 'gd-mod-21',
          title: 'Module 21 — Procedural Generation',
          description: 'Membuat ruang atau rintangan acak secara terstruktur.',
          lessons: [
            {
              id: 'gd-les-10-1',
              title: 'Random Dungeon & Obstacles',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Procedural Generation
Membuat konten game secara algoritmik sehingga setiap sesi permainan memberikan pengalaman baru.`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `const randomObstacleX = Math.floor(Math.random() * (canvas.width - 50));`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'gd-lvl-11',
      title: 'Level 11 — AI for Games & Pathfinding',
      description: 'Kecerdasan buatan musuh (patroli, mengejar player) dan algoritma pencarian jalur (A* / grid pathfinding).',
      modules: [
        {
          id: 'gd-mod-22',
          title: 'Module 22 — Enemy AI Fundamentals',
          description: 'Logika dasar musuh yang mendeteksi player dan mengejarnya.',
          lessons: [
            {
              id: 'gd-les-11-1',
              title: 'Detection Radius & Chase State',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Line of Sight & Radius
Menghitung jarak Euclidean antara musuh dan pemain untuk menentukan kapan musuh mulai mengejar.`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `const distX = player.x - enemy.x;
const distY = player.y - enemy.y;
const distance = Math.sqrt(distX * distX + distY * distY);

if (distance < 150) {
  // Kejar player
  enemy.x += (distX / distance) * enemy.speed;
  enemy.y += (distY / distance) * enemy.speed;
}`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'gd-lvl-12',
      title: 'Level 12 — Multiplayer Fundamentals',
      description: 'Arsitektur klien-server game multiplayer real-time menggunakan WebSocket.',
      modules: [
        {
          id: 'gd-mod-25',
          title: 'Module 25 — Web Multiplayer',
          description: 'Sinkronisasi posisi pemain antar klien melalui WebSocket.',
          lessons: [
            {
              id: 'gd-les-12-1',
              title: 'Sinkronisasi Posisi via WebSocket',
              type: 'learn',
              xpReward: 50,
              content: [
                {
                  type: 'markdown',
                  content: `### Real-time Multiplayer
Mengirim paket JSON posisi player ke server dan menyiarkannya ke pemain lain.`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `ws.send(JSON.stringify({ type: 'MOVE', x: player.x, y: player.y }));`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'gd-lvl-13',
      title: 'Level 13 — Performance & Optimization',
      description: 'Mengoptimalkan frame rate, menghindari memory leak, dan object pooling.',
      modules: [
        {
          id: 'gd-mod-26',
          title: 'Module 26 — Game Performance',
          description: 'Teknik Object Pooling untuk menghemat alokasi memori proyektil.',
          lessons: [
            {
              id: 'gd-les-13-1',
              title: 'Object Pooling Pattern',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Object Pooling
Mencegah lag akibat Garbage Collection dengan mendaur ulang objek peluru atau partikel.`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `// Simpan peluru non-aktif di dalam pool dan gunakan kembali`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'gd-lvl-14',
      title: 'Level 14 — Game Security',
      description: 'Mencegah manipulasi skor di sisi klien, validasi otoritas server, dan anti-cheat.',
      modules: [
        {
          id: 'gd-mod-27',
          title: 'Module 27 — Game Security Fundamentals',
          description: 'Menjaga integritas skor dan mencegah manipulasi save data.',
          lessons: [
            {
              id: 'gd-les-14-1',
              title: 'Server Authority & Validasi Skor',
              type: 'learn',
              xpReward: 50,
              content: [
                {
                  type: 'markdown',
                  content: `### Server Authority
Jangan pernah mempercayai nilai skor yang dikirim mentah-mentah dari klien; validasi aksi game di server.`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `// Validasi waktu dan aksi di backend sebelum mencatat high score`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'gd-lvl-15',
      title: 'Level 15 — Deployment',
      description: 'Build produksi web game, optimasi aset, dan deployment ke cloud hosting.',
      modules: [
        {
          id: 'gd-mod-29',
          title: 'Module 29 — Publishing Web Games',
          description: 'Mempersiapkan game untuk didistribusikan ke publik.',
          lessons: [
            {
              id: 'gd-les-15-1',
              title: 'Production Build & Hosting',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Build & Deploy
Melakukan bundel aset statis dan mendeploy aplikasi web game ke platform modern.`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `npm run build`
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'gd-lvl-16',
      title: 'Level 16 — Capstone Game Project',
      description: 'Membangun game web lengkap dari awal hingga selesai sebagai portofolio.',
      modules: [
        {
          id: 'gd-mod-30',
          title: 'Module 30 — Capstone: Complete Arcade Game',
          description: 'Merancang dan memprogram game lengkap dengan menu, gameplay, audio, dan high score.',
          lessons: [
            {
              id: 'gd-les-16-1',
              title: 'Proyek Akhir: Arcade Survival Game',
              type: 'practice',
              xpReward: 150,
              content: [
                {
                  type: 'markdown',
                  content: `### Capstone Game Proyek
Terapkan seluruh ilmu dari Level 1 sampai 15 untuk membangun game arcade survival mandiri yang utuh dan playable.`
                },
                {
                  type: 'code-example',
                  language: 'typescript',
                  code: `// Gabungkan game loop, input, collision, state machine, dan UI`
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
