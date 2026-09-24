import { Course } from '../types';

export const ROBOTICS_COURSE: Course = {
  id: 'robotics',
  title: 'Robotics',
  shortDescription: 'Learn robotics from fundamental engineering concepts to autonomous intelligent robots through programming, electronics, sensors, control systems, computer vision, ROS 2, simulation, AI, and real-world robotic projects.',
  description: 'Kurikulum komprehensif tingkat lanjut yang membimbing learner dari dasar teknik elektro, mikrokontroler Arduino/ESP32, kinematika, kendali PID, navigasi A*, SLAM, Computer Vision, ROS 2, hingga arsitektur sistem robot otonom mandiri (AMR).',
  icon: 'bot',
  levels: [
    {
      id: 'rob-lvl-1',
      title: 'Level 1 — Foundations & Mathematics',
      description: 'Pengenalan sistem robotik, arsitektur Sense-Think-Act, dan fondasi matematika transformasi spasial.',
      modules: [
        {
          id: 'robotics-m01',
          title: 'Module 1 — Introduction to Robotics',
          description: 'Taksonomi robot, hukum robotika, dan arsitektur sistem otonom.',
          lessons: [
            {
              id: 'rob-l-01-1',
              title: 'Pengantar Sistem Robotik & Sense-Think-Act',
              type: 'learn',
              xpReward: 30,
              content: [
                {
                  type: 'markdown',
                  content: `### 1. Definisi dan Triad Robotika
Robot adalah mesin pemrogram yang mampu melakukan tugas secara otonom atau semi-otonom melalui siklus **Sense-Think-Act** (Penginderaan-Pemikiran-Aksi).
- **Sense**: Mengumpulkan data lingkungan via sensor (LiDAR, Kamera, IMU, Encoder).
- **Think**: Memproses data, menjalankan algoritma perencanaan, lokalisasi, dan AI.
- **Act**: Menggerakkan aktuator mekanis untuk berinteraksi dengan dunia fisik.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `def sense_think_act(sensor_readings):
    # SENSE
    obstacle_distance = sensor_readings['sonar']
    
    # THINK
    if obstacle_distance < 25.0:
        command = 'AVOID_OBSTACLE'
    else:
        command = 'CRUISE_FORWARD'
        
    # ACT
    return command`
                }
              ]
            },
            {
              id: 'rob-l-01-2',
              title: 'Kuis Module 1 — Introduction to Robotics',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'rob-q-01-1',
                  question: 'Apa tiga pilar utama dalam arsitektur sistem robot otonom (Triad Robotika)?',
                  options: ['Sense, Think, Act', 'Input, Output, Storage', 'Compile, Test, Deploy', 'Read, Write, Delete'],
                  correctAnswerIndex: 0,
                  explanation: 'Sense (penginderaan), Think (pemikiran/keputusan), dan Act (aksi) adalah tiga pilar utama.'
                },
                {
                  id: 'rob-q-01-2',
                  question: 'Manakah komponen yang berfungsi sebagai "otot" atau penggerak dalam sistem robot?',
                  options: ['Sensor ultrasonik', 'Aktuator (motor/servo)', 'Resistor', 'Mikrokontroler'],
                  correctAnswerIndex: 1,
                  explanation: 'Aktuator mengubah energi listrik menjadi gerakan mekanis.'
                },
                {
                  id: 'rob-q-01-3',
                  question: 'Apa fungsi sensor dalam robot?',
                  options: ['Menyimpan data permanen', 'Mengumpulkan informasi dari lingkungan fisik', 'Menghasilkan tegangan AC', 'Meningkatkan kapasitas baterai'],
                  correctAnswerIndex: 1,
                  explanation: 'Sensor bertugas mengukur fenomena fisik seperti jarak, cahaya, percepatan, atau suhu.'
                },
                {
                  id: 'rob-q-01-4',
                  question: 'Mengapa robotika dikategorikan sebagai bidang ilmu multidisiplin?',
                  options: ['Hanya menggunakan bahasa pemrograman Python', 'Menggabungkan teknik elektro, mesin, dan ilmu komputer', 'Tidak memerlukan perangkat keras', 'Hanya dipelajari oleh fisikawan'],
                  correctAnswerIndex: 1,
                  explanation: 'Robotika memadukan mekanika, elektronika, dan ilmu komputer secara sinergis.'
                },
                {
                  id: 'rob-q-01-5',
                  question: 'Apa peran mikrokontroler dalam robot?',
                  options: ['Sebagai otak pengendali logika dan pemrosesan instruksi', 'Sebagai bahan bakar', 'Sebagai roda penggerak', 'Sebagai pengisi bahan bakar'],
                  correctAnswerIndex: 0,
                  explanation: 'Mikrokontroler bertindak sebagai unit pengendali pusat (CPU embedded).'
                }
              ]
            }
          ]
        },
        {
          id: 'robotics-m02',
          title: 'Module 2 — Mathematics Foundations',
          description: 'Vektor, matriks transformasi homogen, dan orientasi sudut (Roll, Pitch, Yaw).',
          lessons: [
            {
              id: 'rob-l-02-1',
              title: 'Transformasi Spasial & Matriks Homogen',
              type: 'learn',
              xpReward: 30,
              content: [
                {
                  type: 'markdown',
                  content: `### 1. Kerangka Acuan (*Frame of Reference*)
Posisi robot diwakili dalam koordinat Kartesius $(x, y, z)$ dan orientasinya dengan sudut Euler (Roll, Pitch, Yaw). Matriks transformasi homogen 4x4 menggabungkan rotasi dan translasi.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `import numpy as np
# Matriks translasi dan rotasi 3D
T = np.eye(4)
T[0, 3] = 2.5  # Geser sumbu X sejauh 2.5 meter
print(T)`
                }
              ]
            },
            {
              id: 'rob-l-02-2',
              title: 'Kuis Module 2 — Mathematics Foundations',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'rob-q-02-1',
                  question: 'Apa nama sudut rotasi terhadap sumbu vertikal Z dalam navigasi 2D/3D?',
                  options: ['Roll', 'Pitch', 'Yaw', 'Gravity'],
                  correctAnswerIndex: 2,
                  explanation: 'Yaw adalah sudut rotasi terhadap sumbu vertikal (Z).'
                },
                {
                  id: 'rob-q-02-2',
                  question: 'Berapa ukuran matriks transformasi homogen untuk ruang 3D?',
                  options: ['2x2', '3x3', '4x4', '10x10'],
                  correctAnswerIndex: 2,
                  explanation: 'Matriks 4x4 menggabungkan matriks rotasi 3x3 dan vektor translasi 3x1.'
                },
                {
                  id: 'rob-q-02-3',
                  question: 'Apa arti dari dot product (perkalian titik) antar dua vektor?',
                  options: ['Menghasilkan skalar yang menunjukkan besar proyeksi antar vektor', 'Menghasilkan vektor baru yang tegak lurus', 'Menghitung suhu', 'Mengubah satuan waktu'],
                  correctAnswerIndex: 0,
                  explanation: 'Dot product menghasilkan nilai skalar yang berguna untuk menghitung sudut dan proyeksi.'
                },
                {
                  id: 'rob-q-02-4',
                  question: 'Apa kegunaan koordinat polar (r, theta)?',
                  options: ['Menyatakan posisi menggunakan jarak radial dan sudut arah', 'Menyimpan kode program C++', 'Mengukur kapasitas memori RAM', 'Mengatur kecepatan kipas CPU'],
                  correctAnswerIndex: 0,
                  explanation: 'Koordinat polar sangat berguna untuk sensor jarak seperti pemindai LiDAR.'
                },
                {
                  id: 'rob-q-02-5',
                  question: 'Apa arti dari norma (magnitude) vektor kecepatan linier?',
                  options: ['Besar kelajuan total robot tanpa memperdulikan arah', 'Arah hadap robot', 'Tegangan baterai', 'Suhu motor'],
                  correctAnswerIndex: 0,
                  explanation: 'Besar vektor adalah laju mutlak (speed).'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'rob-lvl-2',
      title: 'Level 2 — Electronics & Microcontrollers',
      description: 'Hukum Ohm, pembagi tegangan, mikrokontroler Arduino/ESP32, GPIO, ADC, dan PWM.',
      modules: [
        {
          id: 'robotics-m03',
          title: 'Module 3 — Electronics Fundamentals',
          description: 'Arus, tegangan, resistansi, hukum Ohm, dan rangkaian dasar.',
          lessons: [
            {
              id: 'rob-l-03-1',
              title: 'Hukum Ohm & Pembagi Tegangan',
              type: 'learn',
              xpReward: 30,
              content: [
                {
                  type: 'markdown',
                  content: `### Hukum Ohm
$$V = I \\times R$$
Prinsip dasar rangkaian elektronika untuk menghitung besaran tegangan, arus, dan resistansi.`
                },
                {
                  type: 'code-example',
                  language: 'cpp',
                  code: `float calculateCurrent(float voltage, float resistance) {
  if (resistance == 0) return 0;
  return voltage / resistance;
}`
                }
              ]
            },
            {
              id: 'rob-l-03-2',
              title: 'Kuis Module 3 — Electronics Fundamentals',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'rob-q-03-1',
                  question: 'Berapa arus yang mengalir jika tegangan 10V diberikan pada hambatan 200 Ohm?',
                  options: ['0.05 A (50 mA)', '2000 A', '2 A', '10 A'],
                  correctAnswerIndex: 0,
                  explanation: 'I = V / R = 10 / 200 = 0.05 A (50 mA).'
                },
                {
                  id: 'rob-q-03-2',
                  question: 'Apa fungsi resistor pull-up pada pin input digital?',
                  options: ['Menjaga agar pin berstatus HIGH saat tombol terbuka', 'Membuat korsleting', 'Mengubah arus AC ke DC', 'Menambah memori Flash'],
                  correctAnswerIndex: 0,
                  explanation: 'Pull-up resistor mencegah status pin mengambang (floating).'
                },
                {
                  id: 'rob-q-03-3',
                  question: 'Apa satuan untuk hambatan listrik?',
                  options: ['Volt', 'Ampere', 'Ohm', 'Watt'],
                  correctAnswerIndex: 2,
                  explanation: 'Hambatan diukur dalam satuan Ohm (Ω).'
                },
                {
                  id: 'rob-q-03-4',
                  question: 'Apa fungsi pin ADC pada mikrokontroler?',
                  options: ['Mengonversi tegangan analog kontinu menjadi nilai digital', 'Memancarkan sinyal Wi-Fi', 'Mengisi aki', 'Menghasilkan suara'],
                  correctAnswerIndex: 0,
                  explanation: 'ADC (Analog-to-Digital Converter) membaca sensor analog.'
                },
                {
                  id: 'rob-q-03-5',
                  question: 'Apa kepanjangan PWM?',
                  options: ['Pulse Width Modulation', 'Power Wire Motor', 'Phase Wave Measure', 'Program Web Module'],
                  correctAnswerIndex: 0,
                  explanation: 'PWM adalah teknik pengaturan daya rata-rata.'
                }
              ]
            }
          ]
        },
        {
          id: 'robotics-m04',
          title: 'Module 4 — Microcontroller Fundamentals',
          description: 'Arsitektur mikrokontroler, pinout, siklus setup dan loop.',
          lessons: [
            {
              id: 'rob-l-04-1',
              title: 'Struktur Program Arduino (setup & loop)',
              type: 'learn',
              xpReward: 30,
              content: [
                {
                  type: 'markdown',
                  content: `### Siklus Eksekusi Arduino
Program Arduino terdiri dari fungsi \`setup()\` yang berjalan sekali saat boot dan \`loop()\` yang berjalan berulang kali.`
                },
                {
                  type: 'code-example',
                  language: 'cpp',
                  code: `void setup() {
  pinMode(13, OUTPUT);
}
void loop() {
  digitalWrite(13, HIGH);
  delay(500);
  digitalWrite(13, LOW);
  delay(500);
}`
                }
              ]
            },
            {
              id: 'rob-l-04-2',
              title: 'Kuis Module 4 — Microcontroller Fundamentals',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'rob-q-04-1',
                  question: 'Kapan fungsi setup() dieksekusi dalam program Arduino?',
                  options: ['Sekali saat pertama kali dinyalakan atau di-reset', 'Setiap detik', 'Hanya saat error', 'Saat mematikan daya'],
                  correctAnswerIndex: 0,
                  explanation: 'setup() dijalankan sekali saat inisialisasi.'
                },
                {
                  id: 'rob-q-04-2',
                  question: 'Apa fungsi fungsi loop()?',
                  options: ['Berjalan terus menerus selamanya secara berulang', 'Berjalan sekali lalu berhenti', 'Mengompilasi kode', 'Menghubungkan ke Bluetooth'],
                  correctAnswerIndex: 0,
                  explanation: 'loop() mengeksekusi instruksi secara siklikal.'
                },
                {
                  id: 'rob-q-04-3',
                  question: 'Apa keuntungan utama mikrokontroler?',
                  options: ['Efisiensi daya tinggi dan berukuran kecil untuk embedded system', 'Mendukung game 3D berat', 'Menggunakan OS Linux desktop', 'Membutuhkan 500 Watt'],
                  correctAnswerIndex: 0,
                  explanation: 'Dirancang untuk kontrol tertanam dengan konsumsi daya rendah.'
                },
                {
                  id: 'rob-q-04-4',
                  question: 'Manakah mikrokontroler yang memiliki modul Wi-Fi dan Bluetooth bawaan?',
                  options: ['ESP32', 'ATmega328P klasik', 'IC 555', 'Resistor 1K'],
                  correctAnswerIndex: 0,
                  explanation: 'ESP32 dilengkapi Wi-Fi dan Bluetooth terintegrasi.'
                },
                {
                  id: 'rob-q-04-5',
                  question: 'Apa fungsi pinMode()?',
                  options: ['Mengatur pin GPIO sebagai INPUT atau OUTPUT', 'Mengukur tegangan baterai', 'Menghapus flash memory', 'Mengatur kecepatan serial'],
                  correctAnswerIndex: 0,
                  explanation: 'pinMode mengonfigurasi arah arus pin digital.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'rob-lvl-3',
      title: 'Level 3 — Embedded Programming & Sensors',
      description: 'Pemrograman non-blokir millis(), interupsi, dan sensor jarak/IMU/encoder.',
      modules: [
        {
          id: 'robotics-m05',
          title: 'Module 5 — Embedded Programming',
          description: 'Manajemen waktu non-blokir dengan millis() dan interupsi eksternal.',
          lessons: [
            {
              id: 'rob-l-05-1',
              title: 'Multitasking Semu dengan millis()',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### Bahaya delay()
Fungsi \`delay()\``
                },
                {
                  type: 'code-example',
                  language: 'cpp',
                  code: `unsigned long lastTick = 0;
void loop() {
  if (millis() - lastTick >= 1000) {
    lastTick = millis();
    // Tugas per detik
  }
}`
                }
              ]
            },
            {
              id: 'rob-l-05-2',
              title: 'Kuis Module 5 — Embedded Programming',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'rob-q-05-1',
                  question: 'Mengapa delay() dihindari dalam robot otonom?',
                  options: ['Membuat mikrokontroler berhenti merespons sensor dan tabrakan', 'Mempercepat prosesor', 'Menghemat RAM', 'Wajib dalam ROS 2'],
                  correctAnswerIndex: 0,
                  explanation: 'delay() memblokir total eksekusi program.'
                },
                {
                  id: 'rob-q-05-2',
                  question: 'Apa fungsi millis()?',
                  options: ['Mengembalikan milidetik sejak board menyala', 'Mengatur kecepatan motor', 'Membaca suhu', 'Mematikan daya'],
                  correctAnswerIndex: 0,
                  explanation: 'millis() mencatat uptime non-blokir.'
                },
                {
                  id: 'rob-q-05-3',
                  question: 'Apa itu Interrupt?',
                  options: ['Sinyal darurat yang menghentikan sementara program utama untuk melayani event prioritas', 'Kerusakan hardware', 'Pemadaman listrik', 'Koneksi terputus'],
                  correctAnswerIndex: 0,
                  explanation: 'Interrupt melayani pulsa cepat seperti encoder.'
                },
                {
                  id: 'rob-q-05-4',
                  question: 'Apa fungsi Serial.begin(9600)?',
                  options: ['Inisialisasi baud rate komunikasi serial', 'Mengatur pin 9600', 'Menyalakan LED', 'Reset sistem'],
                  correctAnswerIndex: 0,
                  explanation: 'Membuka kanal serial monitoring.'
                },
                {
                  id: 'rob-q-05-5',
                  question: 'Tipe data untuk true/false di C++ adalah?',
                  options: ['bool', 'int', 'float', 'char'],
                  correctAnswerIndex: 0,
                  explanation: 'bool menyimpan nilai logika.'
                }
              ]
            }
          ]
        },
        {
          id: 'robotics-m06',
          title: 'Module 6 — Sensors',
          description: 'Ultrasonic HC-SR04, IMU MPU6050, dan encoder roda.',
          lessons: [
            {
              id: 'rob-l-06-1',
              title: 'Pengukuran Jarak Ultrasonik',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### Prinsip Time of Flight (ToF)
Mengukur durasi pantulan gelombang suara untuk menentukan jarak benda.`
                },
                {
                  type: 'code-example',
                  language: 'cpp',
                  code: `long duration = pulseIn(echoPin, HIGH);
float cm = duration * 0.034 / 2;`
                }
              ]
            },
            {
              id: 'rob-l-06-2',
              title: 'Kuis Module 6 — Sensors',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'rob-q-06-1',
                  question: 'Bagaimana sensor ultrasonik mengukur jarak?',
                  options: ['Waktu tempuh pantulan suara (ToF)', 'Suhu objek', 'Berat benda', 'Cahaya inframerah'],
                  correctAnswerIndex: 0,
                  explanation: 'Menggunakan waktu tempuh gelombang suara.'
                },
                {
                  id: 'rob-q-06-2',
                  question: 'Apa fungsi IMU?',
                  options: ['Mengukur percepatan dan kecepatan sudut rotasi', 'Mencetak dokumen', 'Menghasilkan suara', 'Menyimpan database'],
                  correctAnswerIndex: 0,
                  explanation: 'IMU melacak akselerasi dan giroskop.'
                },
                {
                  id: 'rob-q-06-3',
                  question: 'Apa fungsi encoder roda?',
                  options: ['Menghitung putaran roda untuk odometri', 'Mendinginkan roda', 'Mempercantik ban', 'Mengisi baterai'],
                  correctAnswerIndex: 0,
                  explanation: 'Encoder mengukur putaran mekanis roda.'
                },
                {
                  id: 'rob-q-06-4',
                  question: 'Mengapa sensor IR kadang gagal mendeteksi warna hitam?',
                  options: ['Warna hitam menyerap cahaya inframerah', 'Warna hitam terlalu terang', 'Sensor rusak', 'Tegangan kurang'],
                  correctAnswerIndex: 0,
                  explanation: 'Permukaan hitam menyerap sinyal pantulan.'
                },
                {
                  id: 'rob-q-06-5',
                  question: 'Berapa kecepatan suara di udara sekitar?',
                  options: ['343 m/s', '300.000 km/s', '10 m/s', '3 m/jam'],
                  correctAnswerIndex: 0,
                  explanation: 'Kecepatan suara di udara ~343 meter per detik.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'rob-lvl-4',
      title: 'Level 4 — Communication & Actuators',
      description: 'UART, I2C, SPI, motor DC, servo, H-Bridge driver, dan manajemen daya.',
      modules: [
        {
          id: 'robotics-m07',
          title: 'Module 7 — Robot Communication',
          description: 'Protokol I2C, SPI, dan UART.',
          lessons: [
            {
              id: 'rob-l-07-1',
              title: 'Komunikasi I2C & SPI',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### Perbandingan Bus Serial
I2C menggunakan 2 kabel (SDA/SCL), SPI menggunakan 4 kabel (MOSI/MISO/SCK/CS) dengan kecepatan lebih tinggi.`
                },
                {
                  type: 'code-example',
                  language: 'cpp',
                  code: `#include <Wire.h>
void setup() { Wire.begin(); }`
                }
              ]
            },
            {
              id: 'rob-l-07-2',
              title: 'Kuis Module 7 — Robot Communication',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'rob-q-07-1',
                  question: 'Berapa kabel sinyal utama pada I2C?',
                  options: ['2 kabel (SDA dan SCL)', '4 kabel', '1 kabel', '10 kabel'],
                  correctAnswerIndex: 0,
                  explanation: 'I2C menggunakan SDA dan SCL.'
                },
                {
                  id: 'rob-q-07-2',
                  question: 'Mana yang lebih cepat antara I2C dan SPI standar?',
                  options: ['SPI', 'I2C', 'UART', 'Sama saja'],
                  correctAnswerIndex: 0,
                  explanation: 'SPI mendukung clock rate lebih tinggi.'
                },
                {
                  id: 'rob-q-07-3',
                  question: 'Apa fungsi alamat (address) di I2C?',
                  options: ['Memilih perangkat slave di bus bersama', 'Mengatur suhu', 'Menghubungkan satelit', 'Mengubah tegangan'],
                  correctAnswerIndex: 0,
                  explanation: 'Alamat unik mengidentifikasi slave.'
                },
                {
                  id: 'rob-q-07-4',
                  question: 'Kepanjangan UART adalah?',
                  options: ['Universal Asynchronous Receiver-Transmitter', 'Unified Analog Radio', 'Universal Access Route', 'Ultra Audio'],
                  correctAnswerIndex: 0,
                  explanation: 'UART adalah standar asinkron titik-ke-titik.'
                },
                {
                  id: 'rob-q-07-5',
                  question: 'Jalur SPI dari Slave ke Master adalah?',
                  options: ['MISO', 'MOSI', 'SCL', 'GND'],
                  correctAnswerIndex: 0,
                  explanation: 'MISO = Master In Slave Out.'
                }
              ]
            }
          ]
        },
        {
          id: 'robotics-m08',
          title: 'Module 8 — Motors and Actuators',
          description: 'Motor DC, H-Bridge driver, dan servo motor.',
          lessons: [
            {
              id: 'rob-l-08-1',
              title: 'Kontrol Motor dengan Driver H-Bridge',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### Driver Motor
Mengatur arah dan kecepatan putar motor DC menggunakan PWM dan logika arah.`
                },
                {
                  type: 'code-example',
                  language: 'cpp',
                  code: `analogWrite(enA, 200); // Set kecepatan PWM`
                }
              ]
            },
            {
              id: 'rob-l-08-2',
              title: 'Kuis Module 8 — Motors and Actuators',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'rob-q-08-1',
                  question: 'Mengapa butuh driver motor?',
                  options: ['Mikrokontroler tidak cukup kuat menyuplai arus besar motor', 'Mendinginkan motor', 'Memperindah bodi', 'Mengubah DC ke AC'],
                  correctAnswerIndex: 0,
                  explanation: 'Driver motor menyediakan daya eksternal yang aman.'
                },
                {
                  id: 'rob-q-08-2',
                  question: 'Bagaimana membalik arah motor DC?',
                  options: ['Membalik polaritas tegangan terminal', 'Meniup motor', 'Ganti kode setup', 'Tambah resistor'],
                  correctAnswerIndex: 0,
                  explanation: 'Membalik polaritas membalik arah putaran.'
                },
                {
                  id: 'rob-q-08-3',
                  question: 'Keunggulan motor servo?',
                  options: ['Dapat diposisikan presisi pada sudut tertentu', 'Berputar tanpa batas kecepatan tinggi', 'Tanpa listrik', 'Sangat berat'],
                  correctAnswerIndex: 0,
                  explanation: 'Servo memiliki kontrol sudut umpan balik.'
                },
                {
                  id: 'rob-q-08-4',
                  question: 'Apa fungsi PWM?',
                  options: ['Mengubah duty cycle tegangan rata-rata ke motor', 'Ganti warna', 'Hapus memori', 'Ukur suhu'],
                  correctAnswerIndex: 0,
                  explanation: 'Duty cycle mengatur daya motor.'
                },
                {
                  id: 'rob-q-08-5',
                  question: 'Karakteristik motor stepper?',
                  options: ['Bergerak dalam langkah diskrit presisi', 'Berputar bebas', 'Hanya searah', 'Bahan bakar bensin'],
                  correctAnswerIndex: 0,
                  explanation: 'Stepper membagi rotasi jadi langkah diskrit.'
                }
              ]
            }
          ]
        },
        {
          id: 'robotics-m09',
          title: 'Module 9 — Power Engineering',
          description: 'Manajemen baterai LiPo, regulator tegangan, dan proteksi daya.',
          lessons: [
            {
              id: 'rob-l-09-1',
              title: 'Manajemen Daya & Baterai LiPo',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### Keamanan Daya Robot
Menggunakan regulator buck/boost dan memantau tegangan sel LiPo agar tidak drop.`
                },
                {
                  type: 'code-example',
                  language: 'cpp',
                  code: `int vval = analogRead(A0); float v = vval * (5.0 / 1023.0) * 2;`
                }
              ]
            },
            {
              id: 'rob-l-09-2',
              title: 'Kuis Module 9 — Power Engineering',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'rob-q-09-1',
                  question: 'Apa bahaya utama baterai LiPo jika mengalami over-discharge?',
                  options: ['Kerusakan permanen sel atau risiko kebakaran', 'Mengisi daya sendiri', 'Menjadi baterai alkalin biasa', 'Meningkatkan kapasitas'],
                  correctAnswerIndex: 0,
                  explanation: 'Tegangan LiPo di bawah batas aman merusak sel kimia.'
                },
                {
                  id: 'rob-q-09-2',
                  question: 'Apa fungsi regulator tegangan step-down (buck converter)?',
                  options: ['Menurunkan tegangan input tinggi ke tegangan stabil yang lebih rendah', 'Menaikkan tegangan', 'Menyimpan data', 'Mempercepat motor'],
                  correctAnswerIndex: 0,
                  explanation: 'Buck converter efisien menurunkan tegangan DC.'
                },
                {
                  id: 'rob-q-09-3',
                  question: 'Mengapa jalur daya motor sebaiknya dipisah dari jalur daya mikrokontroler?',
                  options: ['Mencegah noise tegangan dan drop yang membuat mikrokontroler restart', 'Agar robot lebih berat', 'Menghemat kabel', 'Wajib dalam hukum fisika'],
                  correctAnswerIndex: 0,
                  explanation: 'Lonjakan arus motor menimbulkan noise yang mengganggu mikrokontroler.'
                },
                {
                  id: 'rob-q-09-4',
                  question: 'Apa satuan kapasitas baterai?',
                  options: ['mAh atau Ah (Milliampere-hour)', 'Volt', 'Ohm', 'Hertz'],
                  correctAnswerIndex: 0,
                  explanation: 'Kapasitas muatan dinyatakan dalam mAh.'
                },
                {
                  id: 'rob-q-09-5',
                  question: 'Apa fungsi sekring (fuse) dalam rangkaian daya robot?',
                  options: ['Memutus arus otomatis saat terjadi hubung singkat (korsleting)', 'Menambah kecepatan', 'Mengatur PWM', 'Menyimpan arus'],
                  correctAnswerIndex: 0,
                  explanation: 'Fuse melindungi komponen dari arus berlebih.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'rob-lvl-5',
      title: 'Level 5 — Kinematics & Control Systems',
      description: 'Kinematika differential drive dan pengendali PID.',
      modules: [
        {
          id: 'robotics-m10',
          title: 'Module 10 — Robot Kinematics',
          description: 'Forward dan Inverse Kinematics robot beroda.',
          lessons: [
            {
              id: 'rob-l-10-1',
              title: 'Kinematika Differential Drive',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Persamaan Kecepatan Roda
$$v = (v_R + v_L)/2, \\quad \\omega = (v_R - v_L)/L$$`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `v = (vr + vl) / 2.0`
                }
              ]
            },
            {
              id: 'rob-l-10-2',
              title: 'Kuis Module 10 — Robot Kinematics',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'rob-q-10-1',
                  question: 'Bagaimana rotasi murni differential drive?',
                  options: ['Roda kiri maju, roda kanan mundur dengan kelajuan sama', 'Kedua roda maju', 'Kedua roda mati', 'Maju cepat'],
                  correctAnswerIndex: 0,
                  explanation: 'Putaran berlawanan arah menghasilkan rotasi di tempat.'
                },
                {
                  id: 'rob-q-10-2',
                  question: 'Apa itu Forward Kinematics?',
                  options: ['Menghitung gerak/pose robot dari kecepatan roda', 'Menghitung kecepatan roda dari target', 'Memprediksi cuaca', 'Memperbaiki baterai'],
                  correctAnswerIndex: 0,
                  explanation: 'Forward kinematics menghitung pose dari kecepatan roda.'
                },
                {
                  id: 'rob-q-10-3',
                  question: 'Apa arti huruf L dalam formula?',
                  options: ['Lebar jarak antar roda (track width)', 'Panjang bodi', 'Jumlah lilitan', 'Tegangan'],
                  correctAnswerIndex: 0,
                  explanation: 'L adalah track width.'
                },
                {
                  id: 'rob-q-10-4',
                  question: 'Apa itu Pose robot?',
                  options: ['Posisi (x, y) dan orientasi (theta)', 'Gaya foto', 'Arus idle', 'Berat'],
                  correctAnswerIndex: 0,
                  explanation: 'Pose menyatakan koordinat dan orientasi.'
                },
                {
                  id: 'rob-q-10-5',
                  question: 'Jika vl=2 dan vr=2, gerak robot adalah?',
                  options: ['Maju lurus', 'Putar kiri', 'Mundur', 'Berhenti'],
                  correctAnswerIndex: 0,
                  explanation: 'Kecepatan sama menghasilkan gerak lurus.'
                }
              ]
            }
          ]
        },
        {
          id: 'robotics-m11',
          title: 'Module 11 — Control Systems',
          description: 'Pengendali PID dan tuning parameter.',
          lessons: [
            {
              id: 'rob-l-11-1',
              title: 'Teori & Implementasi PID',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Komponen P, I, D
Proporsional, Integral, dan Derivative untuk menjaga kestabilan sistem.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `output = kp * error + ki * integral + kd * derivative`
                }
              ]
            },
            {
              id: 'rob-l-11-2',
              title: 'Kuis Module 11 — Control Systems',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'rob-q-11-1',
                  question: 'Fungsi komponen Integral (I) pada PID?',
                  options: ['Menghilangkan steady-state error', 'Mempercepat awal', 'Menghapus memori', 'Kurangi tegangan'],
                  correctAnswerIndex: 0,
                  explanation: 'Integral menghilangkan error permanen.'
                },
                {
                  id: 'rob-q-11-2',
                  question: 'Akibat Kp terlalu tinggi?',
                  options: ['Osilasi berlebihan dan ketidakstabilan (overshoot)', 'Sistem lambat', 'Baterai awet', 'Motor mati'],
                  correctAnswerIndex: 0,
                  explanation: 'Kp berlebih memicu overshoot.'
                },
                {
                  id: 'rob-q-11-3',
                  question: 'Tugas komponen Derivative (Kd)?',
                  options: ['Meredam osilasi berdasarkan laju perubahan error', 'Tambah panas', 'Percepat Wi-Fi', 'Ubah baud rate'],
                  correctAnswerIndex: 0,
                  explanation: 'Derivative bertindak sebagai peredam.'
                },
                {
                  id: 'rob-q-11-4',
                  question: 'Apa definisi Error?',
                  options: ['Setpoint - Process Variable', 'Kerusakan kabel', 'Waktu tunda', 'Jumlah baris'],
                  correctAnswerIndex: 0,
                  explanation: 'Error adalah selisih target dan aktual.'
                },
                {
                  id: 'rob-q-11-5',
                  question: 'Sistem tanpa umpan balik disebut?',
                  options: ['Open-loop control', 'Closed-loop', 'PID', 'Adaptive'],
                  correctAnswerIndex: 0,
                  explanation: 'Open-loop tidak memantau hasil akhir.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'rob-lvl-6',
      title: 'Level 6 — Mobile Robotics & Navigation',
      description: 'Navigasi seluler, algoritma path planning A*, dan costmaps.',
      modules: [
        {
          id: 'robotics-m12',
          title: 'Module 12 — Mobile Robotics',
          description: 'Robot beroda, line follower, dan obstacle avoidance.',
          lessons: [
            {
              id: 'rob-l-12-1',
              title: 'Arsitektur Mobile Robot Dasar',
              type: 'learn',
              xpReward: 35,
              content: [
                {
                  type: 'markdown',
                  content: `### Desain Roda dan Traksi
Memilih konfigurasi roda (differential, omnidirectional, atau steer-drive).`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `# Logika obstacle avoidance dasar`
                }
              ]
            },
            {
              id: 'rob-l-12-2',
              title: 'Kuis Module 12 — Mobile Robotics',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'rob-q-12-1',
                  question: 'Apa keunggulan robot omnidirectional dibanding differential drive?',
                  options: ['Dapat bergerak ke segala arah (termasuk geser samping) tanpa harus berputar terlebih dahulu', 'Lebih lambat', 'Lebih murah', 'Hanya bisa mundur'],
                  correctAnswerIndex: 0,
                  explanation: 'Omnidirectional memberikan mobilitas holonomik.'
                },
                {
                  id: 'rob-q-12-2',
                  question: 'Apa fungsi sensor garis pada robot line follower?',
                  options: ['Mendeteksi kontras garis pandu di atas lantai', 'Mengukur suhu', 'Memancarkan Wi-Fi', 'Menghitung waktu'],
                    correctAnswerIndex: 0,
                  explanation: 'Sensor reflektif mendeteksi garis hitam atau putih.'
                },
                {
                  id: 'rob-q-12-3',
                  question: 'Apa itu robot otonom?',
                  options: ['Robot yang dapat bernavigasi dan mengambil keputusan sendiri tanpa intervensi manusia secara langsung', 'Robot mainan remote control', 'Kipas angin otomatis', 'Kalkulator saku'],
                  correctAnswerIndex: 0,
                  explanation: 'Otonomi berarti mandiri dalam eksekusi misi.'
                },
                {
                  id: 'rob-q-12-4',
                  question: 'Bagaimana cara mengatasi slip roda pada robot mobile?',
                  options: ['Menggunakan sensor odometri eksternal atau fusi sensor IMU', 'Mengecat ulang roda', 'Menambah beban baterai', 'Mematikan motor'],
                  correctAnswerIndex: 0,
                  explanation: 'Fusi sensor membantu mengoreksi galat slip.'
                },
                {
                  id: 'rob-q-12-5',
                  question: 'Apa itu kinematic constraint?',
                  options: ['Batasan fisik gerak yang tidak bisa dilakukan oleh mekanisme robot', 'Kabel putus', 'Tegangan turun', 'Suhu tinggi'],
                  correctAnswerIndex: 0,
                  explanation: 'Contohnya mobil tidak bisa bergeser ke samping secara instan.'
                }
              ]
            }
          ]
        },
        {
          id: 'robotics-m13',
          title: 'Module 13 — Robot Decision Systems',
          description: 'Behavior trees dan state machines untuk pengambilan keputusan robot.',
          lessons: [
            {
              id: 'rob-l-13-1',
              title: 'Behavior Trees dalam Robotika',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Behavior Tree vs FSM
Behavior Tree lebih modular dan mudah diskalakan dibanding Finite State Machine untuk robot kompleks.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `# Konsep node behavior tree`
                }
              ]
            },
            {
              id: 'rob-l-13-2',
              title: 'Kuis Module 13 — Robot Decision Systems',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'rob-q-13-1',
                  question: 'Apa keunggulan Behavior Trees dibanding FSM?',
                  options: ['Lebih modular, hierarkis, dan mudah digabungkan/dikembangkan', 'Lebih lambat', 'Membutuhkan lebih banyak memori', 'Tidak ada keunggulan'],
                  correctAnswerIndex: 0,
                  explanation: 'Behavior tree sangat modular untuk task otonom.'
                },
                {
                  id: 'rob-q-13-2',
                  question: 'Apa fungsi node Selector dalam Behavior Tree?',
                  options: ['Mencoba anak node satu persatu sampai salah satunya berhasil (OR logic)', 'Menjalankan semua secara paralel', 'Menghentikan program', 'Menghapus memori'],
                  correctAnswerIndex: 0,
                  explanation: 'Selector mencari tindakan alternatif yang berhasil.'
                },
                {
                  id: 'rob-q-13-3',
                  question: 'Apa fungsi node Sequence?',
                  options: ['Menjalankan anak node secara berurutan; jika satu gagal, maka urutan gagal (AND logic)', 'Acak urutan', 'Membalikkan arah', 'Menghitung akar kuadrat'],
                  correctAnswerIndex: 0,
                  explanation: 'Sequence menjalankan tahapan berurutan.'
                },
                {
                  id: 'rob-q-13-4',
                  question: 'Apa itu task planning dalam robot otonom?',
                  options: ['Menyusun urutan sub-tugas yang harus dilakukan robot untuk mencapai tujuan misi', 'Membuat jadwal piket', 'Menghitung hambatan fisik', 'Mengisi daya'],
                  correctAnswerIndex: 0,
                  explanation: 'Task planning merencanakan urutan tindakan.'
                },
                {
                  id: 'rob-q-13-5',
                  question: 'Bagaimana robot merespons gangguan tak terduga saat menjalankan misi?',
                  options: ['Melakukan replanning atau re-evaluasi pohon perilaku', 'Crash sistem', 'Berhenti total selamanya', 'Mengabaikan gangguan'],
                  correctAnswerIndex: 0,
                  explanation: 'Re-evaluasi dinamis memastikan ketahanan robot.'
                }
              ]
            }
          ]
        },
        {
          id: 'robotics-m14',
          title: 'Module 14 — Navigation Algorithms',
          description: 'Algoritma pencarian jalur A* dan costmaps.',
          lessons: [
            {
              id: 'rob-l-14-1',
              title: 'Algoritma A* (A-Star) Path Planning',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Fungsi Biaya A*
$$f(n) = g(n) + h(n)$$`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `def a_star_search(start, goal): pass`
                }
              ]
            },
            {
              id: 'rob-l-14-2',
              title: 'Kuis Module 14 — Navigation Algorithms',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'rob-q-14-1',
                  question: 'Rumus evaluasi total f(n) pada A* adalah?',
                  options: ['f(n) = g(n) + h(n)', 'f(n) = g * h', 'f(n) = g - h', 'f(n) = h / g'],
                  correctAnswerIndex: 0,
                  explanation: 'g(n) biaya aktual + h(n) heuristik.'
                },
                {
                  id: 'rob-q-14-2',
                  question: 'Fungsi heuristik h(n) bertujuan untuk?',
                  options: ['Memperkirakan sisa jarak ke tujuan', 'Mengukur suhu', 'Menghitung tegangan', 'Menyimpan video'],
                  correctAnswerIndex: 0,
                  explanation: 'Heuristik memandu pencarian arah.'
                },
                {
                  id: 'rob-q-14-3',
                  question: 'Perbedaan BFS dan A*?',
                  options: ['A* menggunakan heuristik terarah, BFS menjelajahi segala arah merata', 'A* tidak berfungsi', 'BFS lebih cepat di peta besar', 'Sama persis'],
                  correctAnswerIndex: 0,
                  explanation: 'A* jauh lebih efisien.'
                },
                {
                  id: 'rob-q-14-4',
                  question: 'Apa itu Occupancy Grid Map?',
                  options: ['Peta matriks sel bebas atau terhalang rintangan', 'Jadwal kerja', 'Nomor telepon', 'Grafik baterai'],
                  correctAnswerIndex: 0,
                  explanation: 'Grid sel dengan status hunian.'
                },
                {
                  id: 'rob-q-14-5',
                  question: 'Apa itu Costmap?',
                  options: ['Peta bobot tambahan di sekitar rintangan untuk jaga jarak aman', 'Daftar harga', 'Biaya bodi', 'Tagihan internet'],
                  correctAnswerIndex: 0,
                  explanation: 'Costmap mencegah tabrakan dinding.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'rob-lvl-7',
      title: 'Level 7 — Localization, SLAM & Computer Vision',
      description: 'Estimasi pose, Particle Filter, SLAM, dan OpenCV.',
      modules: [
        {
          id: 'robotics-m15',
          title: 'Module 15 — Localization',
          description: 'Dead reckoning, kalman filter, dan particle filter localization.',
          lessons: [
            {
              id: 'rob-l-15-1',
              title: 'Monte Carlo Localization (Particle Filter)',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Particle Filter
Mewakili keyakinan posisi robot dengan ribuan partikel acak yang diperbarui berdasarkan sensor dan gerakan.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `# Konsep dasar particle filter`
                }
              ]
            },
            {
              id: 'rob-l-15-2',
              title: 'Kuis Module 15 — Localization',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'rob-q-15-1',
                  question: 'Apa tujuan utama lokalisasi dalam robotika?',
                  options: ['Mengetahui posisi dan orientasi tepat robot di dalam peta', 'Membuat peta baru', 'Mengisi baterai', 'Memutar motor'],
                  correctAnswerIndex: 0,
                  explanation: 'Lokalisasi menjawab pertanyaan "Di mana saya?".'
                },
                {
                  id: 'rob-q-15-2',
                  question: 'Apa kelemahan utama dead reckoning murni tanpa sensor eksternal?',
                  options: ['Akumulasi galat (drift) seiring berjalannya waktu', 'Terlalu cepat', 'Membutuhkan internet', 'Konsumsi RAM tinggi'],
                  correctAnswerIndex: 0,
                  explanation: 'Galat odometri menumpuk tanpa batas.'
                },
                {
                  id: 'rob-q-15-3',
                  question: 'Bagaimana Monte Carlo Localization (Particle Filter) bekerja?',
                  options: ['Menyebar banyak partikel hipotesis pose dan menyaringnya sesuai kecocokan sensor', 'Menghitung rumus matematika tunggal', 'Menggunakan GPS satelit', 'Mematikan robot'],
                  correctAnswerIndex: 0,
                  explanation: 'Mewakili probabilitas dengan awan partikel.'
                },
                {
                  id: 'rob-q-15-4',
                  question: 'Mengapa GPS saja tidak cukup untuk lokalisasi robot di dalam ruangan (indoor)?',
                  options: ['Sinyal satelit GPS terhalang bangunan dan tidak memiliki akurasi centimeter yang dibutuhkan', 'GPS terlalu murah', 'GPS cepat rusak', 'GPS hanya untuk kapal laut'],
                  correctAnswerIndex: 0,
                  explanation: 'GPS butuh line-of-sight ke satelit dan akurasinya rendah untuk indoor.'
                },
                {
                  id: 'rob-q-15-5',
                  question: 'Apa itu Kalman Filter?',
                  options: ['Algoritma estimasi state optimal untuk sistem linier dengan sensor bising (noise)', 'Filter air minum', 'Penyaring debu', 'Kabel LAN'],
                  correctAnswerIndex: 0,
                  explanation: 'Kalman filter menggabungkan model dan pengukuran bising secara optimal.'
                }
              ]
            }
          ]
        },
        {
          id: 'robotics-m16',
          title: 'Module 16 — Mapping and SLAM',
          description: 'Simultaneous Localization and Mapping.',
          lessons: [
            {
              id: 'rob-l-16-1',
              title: 'Konsep Dasar SLAM',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### SLAM Framework
Menyelesaikan pemetaan dan lokalisasi secara simultan.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `# SLAM loop`
                }
              ]
            },
            {
              id: 'rob-l-16-2',
              title: 'Kuis Module 16 — Mapping and SLAM',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'rob-q-16-1',
                  question: 'Apa kepanjangan SLAM?',
                  options: ['Simultaneous Localization and Mapping', 'System Linear Actuator', 'Serial Local Modem', 'Sensor Logic'],
                  correctAnswerIndex: 0,
                  explanation: 'Simultaneous Localization and Mapping.'
                },
                {
                  id: 'rob-q-16-2',
                  question: 'Mengapa SLAM disebut masalah ayam dan telur?',
                  options: ['Butuh peta untuk tahu posisi, butuh posisi untuk buat peta', 'Butuh telur', 'Di peternakan', 'Tidak ada alasan'],
                  correctAnswerIndex: 0,
                  explanation: 'Keduanya saling bergantung.'
                },
                {
                  id: 'rob-q-16-3',
                  question: 'Sensor utama SLAM jarak jauh?',
                  options: ['LiDAR atau Depth Camera', 'LED', 'Resistor', 'Buzzer'],
                  correctAnswerIndex: 0,
                  explanation: 'LiDAR memindai jarak objek akurat.'
                },
                {
                  id: 'rob-q-16-4',
                  question: 'Apa itu loop closure?',
                  options: ['Mengenali tempat lama untuk koreksi drift', 'Matikan daya', 'Kabel melingkar', 'Error fatal'],
                  correctAnswerIndex: 0,
                  explanation: 'Koreksi galat saat kembali ke titik awal.'
                },
                {
                  id: 'rob-q-16-5',
                  question: 'Apa itu drift odometri?',
                  options: ['Akumulasi galat kecil pembacaan roda', 'Penyumbatan debu', 'Kecepatan maksimum', 'Wi-Fi stabil'],
                  correctAnswerIndex: 0,
                  explanation: 'Galat menumpuk dari slip roda.'
                }
              ]
            }
          ]
        },
        {
          id: 'robotics-m17',
          title: 'Module 17 — Computer Vision',
          description: 'OpenCV, ruang warna HSV, dan deteksi objek.',
          lessons: [
            {
              id: 'rob-l-17-1',
              title: 'Deteksi Warna dengan OpenCV',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Ruang Warna HSV
Lebih tahan perubahan pencahayaan dibanding RGB.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)`
                }
              ]
            },
            {
              id: 'rob-l-17-2',
              title: 'Kuis Module 17 — Computer Vision',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'rob-q-17-1',
                  question: 'Mengapa HSV lebih baik dari RGB untuk deteksi warna?',
                  options: ['Memisahkan Hue dari pencahayaan (Value)', 'File lebih besar', 'Kamera tak dukung RGB', 'Komputer lambat'],
                  correctAnswerIndex: 0,
                  explanation: 'Stabil terhadap perubahan cahaya.'
                },
                {
                  id: 'rob-q-17-2',
                  question: 'Fungsi cv2.inRange()?',
                  options: ['Membuat mask biner berdasarkan rentang warna', 'Ubah resolusi', 'Simpan gambar', 'Atur fokus'],
                  correctAnswerIndex: 0,
                  explanation: 'Menyaring piksel dalam rentang.'
                },
                {
                  id: 'rob-q-17-3',
                  question: 'Apa itu kontur?',
                  options: ['Garis batas luar objek terdeteksi', 'Kabel kamera', 'FPS', 'Format video'],
                  correctAnswerIndex: 0,
                  explanation: 'Kontur melingkupi batas objek.'
                },
                {
                  id: 'rob-q-17-4',
                  question: 'RGB(255, 255, 255) adalah?',
                  options: ['Putih penuh', 'Hitam', 'Hijau', 'Merah'],
                  correctAnswerIndex: 1,
                  explanation: 'Putih adalah maksimum R, G, B.'
                },
                {
                  id: 'rob-q-17-5',
                  question: 'Kegunaan Computer Vision bagi robot?',
                  options: ['Memberikan kemampuan melihat dan mengenali lingkungan secara visual', 'Ganti baterai', 'Pendingin CPU', 'Tambah putaran roda'],
                  correctAnswerIndex: 0,
                  explanation: 'Persepsi visual untuk navigasi.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'rob-lvl-8',
      title: 'Level 8 — Manipulator Robotics & ROS 2 Fundamentals',
      description: 'Lengan robot dan arsitektur komunikasi ROS 2.',
      modules: [
        {
          id: 'robotics-m18',
          title: 'Module 18 — Manipulator Robotics',
          description: 'Forward/Inverse kinematics lengan robot dan end-effector.',
          lessons: [
            {
              id: 'rob-l-18-1',
              title: 'Kinematika Lengan Robot (Manipulator)',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Joint dan Link
Menghitung sudut sendi (*joint angles*) untuk mencapai posisi grippper.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `# Inverse kinematics 2-DOF arm`
                }
              ]
            },
            {
              id: 'rob-l-18-2',
              title: 'Kuis Module 18 — Manipulator Robotics',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'rob-q-18-1',
                  question: 'Apa arti Degrees of Freedom (DoF) pada lengan robot?',
                  options: ['Jumlah sumbu gerak independen yang dimiliki manipulator', 'Jumlah baut', 'Kapasitas beban', 'Jumlah motor DC'],
                  correctAnswerIndex: 0,
                  explanation: 'DoF menyatakan kebebasan gerak sendi.'
                },
                {
                  id: 'rob-q-18-2',
                  question: 'Apa itu Inverse Kinematics?',
                  options: ['Mencari sudut sendi yang diperlukan agar end-effector mencapai posisi koordinat target', 'Mencari posisi dari sudut sendi', 'Mematikan lengan', 'Memutar basis'],
                  correctAnswerIndex: 0,
                  explanation: 'Inverse kinematics menghitung sudut dari posisi target.'
                },
                {
                  id: 'rob-q-18-3',
                  question: 'Apa itu End-Effector?',
                  options: ['Periferal ujung lengan (gripper, las, atau suction cup) untuk berinteraksi', 'Bagian dasar', 'Kabel internal', 'CPU'],
                  correctAnswerIndex: 0,
                  explanation: 'End-effector adalah alat kerja di ujung lengan.'
                },
                {
                  id: 'rob-q-18-4',
                  question: 'Apa tantangan utama dalam Inverse Kinematics?',
                  options: ['Bisa memiliki banyak solusi atau tidak ada solusi sama sekali (non-linear)', 'Sangat mudah', 'Selalu 1 solusi', 'Tidak ada perhitungan'],
                  correctAnswerIndex: 0,
                  explanation: 'Persamaan IK seringkali memiliki multi-solusi.'
                },
                {
                  id: 'rob-q-18-5',
                  question: 'Apa fungsi DH (Denavit-Hartenberg) parameters?',
                  options: ['Konvensi standar untuk menetapkan sistem koordinat pada sambungan manipulator robot', 'Merek motor', 'Jenis baterai', 'Bahasa pemrograman'],
                  correctAnswerIndex: 0,
                  explanation: 'Parameter DH menyederhanakan pemodelan kinematis lengan.'
                }
              ]
            }
          ]
        },
        {
          id: 'robotics-m19',
          title: 'Module 19 — ROS 2 Fundamentals',
          description: 'Nodes, Topics, Publishers, dan Subscribers.',
          lessons: [
            {
              id: 'rob-l-19-1',
              title: 'Arsitektur ROS 2 Nodes & Topics',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Publish-Subscribe Pattern
Node saling bertukar pesan melalui topik asinkron.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `publisher = node.create_publisher(Twist, 'cmd_vel', 10)`
                }
              ]
            },
            {
              id: 'rob-l-19-2',
              title: 'Kuis Module 19 — ROS 2 Fundamentals',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'rob-q-19-1',
                  question: 'Apakah ROS 2 itu?',
                  options: ['Middleware dan framework robot', 'OS Linux baru', 'Bahasa C++', 'Game 3D'],
                  correctAnswerIndex: 0,
                  explanation: 'ROS 2 adalah framework middleware.'
                },
                {
                  id: 'rob-q-19-2',
                  question: 'Pola komunikasi ROS 2 Topic?',
                  options: ['Publish-Subscribe', 'Request-Response', 'SQL', 'Bluetooth'],
                  correctAnswerIndex: 0,
                  explanation: 'Publish-Subscribe asinkron.'
                },
                {
                  id: 'rob-q-19-3',
                  question: 'Apa itu ROS 2 Node?',
                  options: ['Proses modular tugas spesifik', 'Kabel baterai', 'Baut', 'Sensor'],
                  correctAnswerIndex: 0,
                  explanation: 'Node menjalankan tugas spesifik.'
                },
                {
                  id: 'rob-q-19-4',
                  question: 'Pesan standar untuk kecepatan robot?',
                  options: ['geometry_msgs/msg/Twist', 'std_msgs/String', 'sensor_msgs/Image', 'robot_msgs/Power'],
                  correctAnswerIndex: 0,
                  explanation: 'Twist membawa kecepatan linear dan angular.'
                },
                {
                  id: 'rob-q-19-5',
                  question: 'Keunggulan ROS 2 dibanding ROS 1?',
                  options: ['Berbasis DDS, real-time, tanpa master tunggal', 'Hanya Windows 95', 'Tanpa jaringan', 'Hapus C++'],
                  correctAnswerIndex: 0,
                  explanation: 'DDS memberikan keandalan industri.'
                }
              ]
            }
          ]
        },
        {
          id: 'robotics-m20',
          title: 'Module 20 — ROS 2 Robot Systems',
          description: 'Services, Actions, Parameters, dan Launch files.',
          lessons: [
            {
              id: 'rob-l-20-1',
              title: 'ROS 2 Services & Actions',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Service vs Action
Service bersifat sinkron (request-response singkat), sedangkan Action mendukung umpan balik berkelanjutan (*feedback*) untuk tugas jangka panjang seperti navigasi.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `# Konsep ROS 2 Action Client`
                }
              ]
            },
            {
              id: 'rob-l-20-2',
              title: 'Kuis Module 20 — ROS 2 Robot Systems',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'rob-q-20-1',
                  question: 'Kapan sebaiknya menggunakan ROS 2 Service alih-alih Topic?',
                  options: ['Untuk komunikasi sinkron request-response singkat (misal: reset sensor atau kalkulasi cepat)', 'Untuk streaming video 60 FPS', 'Untuk telemetri', 'Untuk kontrol motor kontinu'],
                  correctAnswerIndex: 0,
                  explanation: 'Service cocok untuk aksi tanya-jawab instan.'
                },
                {
                  id: 'rob-q-20-2',
                  question: 'Apa keunggulan ROS 2 Action dibanding Service?',
                  options: ['Action mendukung feedback progres berkala, pembatalan tugas (cancel), dan goal jangka panjang', 'Action lebih lambat', 'Action hanya untuk C++', 'Tidak ada bedanya'],
                  correctAnswerIndex: 0,
                  explanation: 'Action dirancang untuk navigasi atau tugas yang memakan waktu.'
                },
                {
                  id: 'rob-q-20-3',
                  question: 'Apa fungsi file Launch (.py atau .xml) di ROS 2?',
                  options: ['Menjalankan dan mengonfigurasi banyak node sekaligus secara otomatis', 'Mengompilasi kode', 'Menghapus log', 'Mengisi baterai'],
                  correctAnswerIndex: 0,
                  explanation: 'Launch file mengotomatisasi startup sistem multi-node.'
                },
                {
                  id: 'rob-q-20-4',
                  question: 'Apa fungsi ROS 2 Parameters?',
                  options: ['Menyimpan nilai konfigurasi global (misal kecepatan maksimum, gain PID) yang dapat diubah saat runtime', 'Menyimpan video', 'Mengatur suhu', 'Menghubungkan ke web'],
                  correctAnswerIndex: 0,
                  explanation: 'Parameter mengatur konfigurasi node tanpa recompiling.'
                },
                {
                  id: 'rob-q-20-5',
                  question: 'Apa itu workspace dalam ROS 2?',
                  options: ['Direktori direktori tempat paket (packages) kode sumber ROS 2 dikompilasi dan dibangun', 'Meja kerja teknisi', 'Layar monitor', 'Flashdisk'],
                  correctAnswerIndex: 0,
                  explanation: 'Workspace mengelola build paket workspace.'
                }
              ]
            }
          ]
        },
        {
          id: 'robotics-m21',
          title: 'Module 21 — ROS 2 Navigation',
          description: 'Nav2 stack, costmaps, dan behavior servers.',
          lessons: [
            {
              id: 'rob-l-21-1',
              title: 'Nav2 Stack Architecture',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Nav2 (Navigation 2)
Stack navigasi standar industri di ROS 2 yang menggunakan behavior trees untuk memandu robot ke tujuan secara otonom.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `# Nav2 action client goal`
                }
              ]
            },
            {
              id: 'rob-l-21-2',
              title: 'Kuis Module 21 — ROS 2 Navigation',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'rob-q-21-1',
                  question: 'Apa nama stack navigasi standar di ROS 2?',
                  options: ['Nav2 (Navigation 2)', 'Nav1', 'AutoDrive', 'RobotNav'],
                  correctAnswerIndex: 0,
                  explanation: 'Nav2 adalah penerus navigasi ROS 1.'
                },
                {
                  id: 'rob-q-21-2',
                  question: 'Apa fungsi Global Costmap dalam Nav2?',
                  options: ['Membuat perencanaan jalur global (global path) dari start ke goal menghindari rintangan statis', 'Mengontrol motor lokal', 'Merekam video', 'Mengatur IP address'],
                  correctAnswerIndex: 0,
                  explanation: 'Global costmap merencanakan rute jarak jauh.'
                },
                {
                  id: 'rob-q-21-3',
                  question: 'Apa fungsi Local Costmap dalam Nav2?',
                  options: ['Menghindari rintangan dinamis secara real-time di sekitar robot', 'Membuat peta seluruh kota', 'Menghitung pajak', 'Menyimpan password'],
                  correctAnswerIndex: 0,
                  explanation: 'Local costmap mendeteksi rintangan mendadak.'
                },
                {
                  id: 'rob-q-21-4',
                  question: 'Apa itu Recovery Behaviors di Nav2?',
                  options: ['Tindakan darurat saat robot terjebak (misal berputar di tempat atau mundur) untuk mencari jalur baru', 'Memadamkan api', 'Mematikan robot selamanya', 'Mengganti roda'],
                  correctAnswerIndex: 0,
                  explanation: 'Recovery behavior memulihkan robot dari kebuntuan.'
                },
                {
                  id: 'rob-q-21-5',
                  question: 'Manakah yang digunakan Nav2 untuk mengatur alur navigasi otonom?',
                  options: ['Behavior Trees', 'If-Else sederhana', 'SQL queries', 'Excel macro'],
                  correctAnswerIndex: 0,
                  explanation: 'Nav2 menggunakan Behavior Trees yang fleksibel.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'rob-lvl-9',
      title: 'Level 9 — Simulation, Real-Time, AI, Security & Capstone',
      description: 'Simulasi robotik, AI edge, sensor fusion, cyber security, dan Capstone AMR.',
      modules: [
        {
          id: 'robotics-m22',
          title: 'Module 22 — Robotics Simulation',
          description: 'Gazebo, Webots, dan simulator berbasis browser.',
          lessons: [
            {
              id: 'rob-l-22-1',
              title: 'Simulasi Fisika & Sensor dalam Robotika',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Pentingnya Simulasi
Menguji algoritma di simulator (Gazebo/Webots) mencegah kerusakan perangkat keras fisik yang mahal.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `# Konfigurasi URDF (Unified Robot Description Format)`
                }
              ]
            },
            {
              id: 'rob-l-22-2',
              title: 'Kuis Module 22 — Robotics Simulation',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'rob-q-22-1',
                  question: 'Mengapa simulasi sangat penting sebelum uji coba robot fisik?',
                  options: ['Mencegah kerusakan hardware dan menghemat waktu/biaya pengembangan', 'Agar baterai tidak habis', 'Karena simulator wajib hukumnya', 'Tidak ada manfaat'],
                  correctAnswerIndex: 0,
                  explanation: 'Simulasi menguji algoritma dengan aman.'
                },
                {
                  id: 'rob-q-22-2',
                  question: 'Apa format file XML standar untuk mendeskripsikan model fisik robot di ROS/Gazebo?',
                  options: ['URDF (Unified Robot Description Format)', 'HTML5', 'JSON', 'SQL'],
                  correctAnswerIndex: 0,
                  explanation: 'URDF mendefinisikan link, joint, dan visual robot.'
                },
                {
                  id: 'rob-q-22-3',
                  question: 'Mesin fisika (physics engine) apa yang sering digunakan di Gazebo?',
                  options: ['ODE, Bullet, atau DART', 'Photoshop', 'SQLite', 'Node.js'],
                  correctAnswerIndex: 0,
                  explanation: 'Gazebo mendukung engine fisika seperti ODE dan Bullet.'
                },
                {
                  id: 'rob-q-22-4',
                  question: 'Apa itu Sim-to-Real gap?',
                  options: ['Perbedaan antara perilaku robot di simulator yang sempurna dengan kenyataan fisik di dunia nyata', 'Jarak antar roda', 'Lebar ruangan', 'Waktu tunda Wi-Fi'],
                  correctAnswerIndex: 0,
                  explanation: 'Sim-to-real gap adalah tantangan transfer model dari simulasi ke fisik.'
                },
                {
                  id: 'rob-q-22-5',
                  question: 'Sensor apa yang paling sering disimulasikan untuk pengujian navigasi?',
                  options: ['LiDAR virtual dan Depth Camera', 'Kalkulator', 'Termometer oven', 'Jam tangan'],
                  correctAnswerIndex: 0,
                  explanation: 'LiDAR dan kamera virtual esensial untuk uji navigasi.'
                }
              ]
            }
          ]
        },
        {
          id: 'robotics-m23',
          title: 'Module 23 — Real-Time Robotics',
          description: 'Sistem operasi real-time (RTOS) dan batasan waktu eksekusi.',
          lessons: [
            {
              id: 'rob-l-23-1',
              title: 'Real-Time Operating Systems (RTOS)',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Determinisme dalam RTOS
Menjamin tugas kritis (seperti pengereman darurat) dieksekusi tepat waktu tanpa jitter.`
                },
                {
                  type: 'code-example',
                  language: 'cpp',
                  code: `// FreeRTOS task creation example`
                }
              ]
            },
            {
              id: 'rob-l-23-2',
              title: 'Kuis Module 23 — Real-Time Robotics',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'rob-q-23-1',
                  question: 'Apa arti sistem "Real-Time" dalam konteks robotika?',
                  options: ['Sistem yang menjamin tenggat waktu (deadline) eksekusi tugas terpenuhi secara deterministik', 'Sistem yang sangat cepat', 'Sistem menggunakan jam tangan', 'Sistem online 24 jam'],
                  correctAnswerIndex: 0,
                  explanation: 'Real-time berarti kepatuhan terhadap deadline yang ketat.'
                },
                {
                  id: 'rob-q-23-2',
                  question: 'Apa bedanya RTOS dengan OS umum (seperti Windows/Linux standar)?',
                  options: ['RTOS memiliki penjadwalan prioritas deterministik dan latensi interupsi sangat rendah', 'RTOS lebih boros RAM', 'RTOS hanya untuk game', 'Tidak ada bedanya'],
                  correctAnswerIndex: 0,
                  explanation: 'RTOS dirancang untuk tugas kritis waktu nyata.'
                },
                {
                  id: 'rob-q-23-3',
                  question: 'Apa itu Task Priority Inversion?',
                  options: ['Masalah ketika task berprioritas rendah tanpa sengaja menahan task berprioritas tinggi', 'Korsleting kabel', 'Baterai terbalik', 'Kamera buram'],
                  correctAnswerIndex: 0,
                  explanation: 'Priority inversion dapat diatasi dengan priority inheritance.'
                },
                {
                  id: 'rob-q-23-4',
                  question: 'Contoh sistem kritis waktu nyata (hard real-time) pada robot?',
                  options: ['Sistem pengereman darurat dan kontrol keseimbangan drone', 'Pemutaran musik latar', 'Pembaruan wallpaper', 'Menulis log file'],
                  correctAnswerIndex: 0,
                  explanation: 'Keterlambatan milidetik pada rem/drone berakibat fatal.'
                },
                {
                  id: 'rob-q-23-5',
                  question: 'Apa itu jitter dalam sistem kontrol?',
                  options: ['Variasi waktu tunda (latency) antar eksekusi berkala yang seharusnya konstan', 'Getaran mekanis', 'Kabel longgar', 'Sinyal Wi-Fi bagus'],
                  correctAnswerIndex: 0,
                  explanation: 'Jitter mengganggu kestabilan loop kontrol.'
                }
              ]
            }
          ]
        },
        {
          id: 'robotics-m24',
          title: 'Module 24 — AI for Robotics',
          description: 'Machine learning, Edge AI, dan deteksi objek.',
          lessons: [
            {
              id: 'rob-l-24-1',
              title: 'Edge AI & Deep Learning pada Robot',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Menjalankan Model YOLO di Edge
Inferensi real-time di atas perangkat keras tertanam.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `detections = model.predict(frame)`
                }
              ]
            },
            {
              id: 'rob-l-24-2',
              title: 'Kuis Module 24 — AI for Robotics',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'rob-q-24-1',
                  question: 'Keuntungan Edge AI di robot dibanding Cloud?',
                  options: ['Latensi rendah dan mandiri tanpa internet', 'Lebih berat', 'Boros kuota', 'Sama saja'],
                  correctAnswerIndex: 0,
                  explanation: 'Edge AI mandiri dan cepat.'
                },
                {
                  id: 'rob-q-24-2',
                  question: 'Model populer untuk deteksi objek real-time?',
                  options: ['YOLO', 'Notepad', 'Canvas', 'Flexbox'],
                  correctAnswerIndex: 0,
                  explanation: 'YOLO sangat efisien untuk objek.'
                },
                {
                  id: 'rob-q-24-3',
                  question: 'Perbedaan AI persepsi dan PID klasik?',
                  options: ['AI kenali pola/gambar, PID hitung koreksi numerik', 'AI ganti baterai', 'PID pakai kamera 4K', 'Sama'],
                  correctAnswerIndex: 0,
                  explanation: 'AI untuk persepsi, PID untuk kontrol.'
                },
                {
                  id: 'rob-q-24-4',
                  question: 'Tantangan ML di hardware tertanam?',
                  options: ['Keterbatasan daya, komputasi, dan memori', 'Tombol keyboard', 'Kertas habis', 'Suhu dingin'],
                  correctAnswerIndex: 0,
                  explanation: 'Hardware robot memiliki batasan ketat.'
                },
                {
                  id: 'rob-q-24-5',
                  question: 'Peran Reinforcement Learning?',
                  options: ['Melatih kebijakan tindakan via trial and error dan reward', 'Cetak laporan', 'Atur jadwal', 'Update Windows'],
                  correctAnswerIndex: 0,
                  explanation: 'RL belajar dari reward.'
                }
              ]
            }
          ]
        },
        {
          id: 'robotics-m25',
          title: 'Module 25 — Sensor Fusion',
          description: 'Menggabungkan IMU, wheel encoder, dan GPS dengan Kalman Filter.',
          lessons: [
            {
              id: 'rob-l-25-1',
              title: 'Fusi Sensor dengan Extended Kalman Filter (EKF)',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Mengapa Fusi Sensor?
Setiap sensor memiliki karakteristik galat tersendiri (IMU drift, encoder slip). Fusi menggabungkan kelebihan masing-masing sensor.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `# EKF prediction and update step`
                }
              ]
            },
            {
              id: 'rob-l-25-2',
              title: 'Kuis Module 25 — Sensor Fusion',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'rob-q-25-1',
                  question: 'Apa tujuan utama Sensor Fusion?',
                  options: ['Menggabungkan data dari berbagai sensor untuk mendapatkan estimasi kondisi yang jauh lebih akurat dan andal', 'Menghemat kabel', 'Membuat sensor lebih mahal', 'Menghapus data'],
                  correctAnswerIndex: 0,
                  explanation: 'Fusi sensor mengatasi kelemahan sensor tunggal.'
                },
                {
                  id: 'rob-q-25-2',
                  question: 'Mengapa wheel encoder dipadukan dengan IMU?',
                  options: ['Encoder bagus untuk jarak pendek tapi slip, IMU bagus untuk rotasi cepat tapi drift; keduanya saling melengkapi', 'Agar berat robot pas', 'Tidak ada alasan', 'Hanya formalitas'],
                  correctAnswerIndex: 0,
                  explanation: 'Keduanya saling menutupi kelemahan.'
                },
                {
                  id: 'rob-q-25-3',
                  question: 'Apa fungsi Extended Kalman Filter (EKF) dalam fusi sensor?',
                  options: ['Memperkirakan state non-linier optimal dengan memperhitungkan kovarians derau (noise) sensor', 'Menyaring air', 'Mengatur daya', 'Mencetak laporan'],
                  correctAnswerIndex: 0,
                  explanation: 'EKF adalah standar industri fusi sensor.'
                },
                {
                  id: 'rob-q-25-4',
                  question: 'Apa itu kovarians derau (noise covariance)?',
                  options: ['Ukuran tingkat ketidakpastian atau tingkat kebisingan pembacaan suatu sensor', 'Kecepatan maksimum', 'Suhu chip', 'Jumlah satelit'],
                  correctAnswerIndex: 0,
                  explanation: 'Kovarians menyatakan seberapa percaya kita pada sensor.'
                },
                {
                  id: 'rob-q-25-5',
                  question: 'Apa akibat jika mengandalkan GPS di dalam terowongan?',
                  options: ['Hilang sinyal (GPS denied) sehingga posisi tidak terbarui', 'GPS meledak', 'Kecepatan naik', 'Waktu melompat'],
                  correctAnswerIndex: 0,
                  explanation: 'Terowongan memblokir sinyal satelit.'
                }
              ]
            }
          ]
        },
        {
          id: 'robotics-m26',
          title: 'Module 26 — Advanced Autonomous Robotics',
          description: 'Arsitektur otonomi penuh, manajemen kegagalan, dan misi kompleks.',
          lessons: [
            {
              id: 'rob-l-26-1',
              title: 'Manajemen Misi Otonom Penuh',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Arsitektur Misi Otonom
Mengelola urutan waypoint, pengisian daya mandiri (*docking*), dan penanganan anomali.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `def execute_mission(): pass`
                }
              ]
            },
            {
              id: 'rob-l-26-2',
              title: 'Kuis Module 26 — Advanced Autonomous Robotics',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'rob-q-26-1',
                  question: 'Apa itu auto-docking pada robot otonom?',
                  options: ['Kemampuan robot menemukan dan menancap ke stasiun pengisian daya baterai secara mandiri', 'Memarkir mobil', 'Menghubungkan kabel manual', 'Mencuci robot'],
                  correctAnswerIndex: 0,
                  explanation: 'Auto-docking memungkinkan pengisian daya tanpa manusia.'
                },
                {
                  id: 'rob-q-26-2',
                  question: 'Bagaimana robot menangani rintangan dinamis tak terduga (misal orang lewat)?',
                  options: ['Local costmap dan dynamic obstacle avoidance merencanakan ulang jalur secara instan', 'Menabrak saja', 'Mematikan sistem', 'Berhenti selamanya'],
                  correctAnswerIndex: 0,
                  explanation: 'Re-planning lokal menghindari rintangan bergerak.'
                },
                {
                  id: 'rob-q-26-3',
                  question: 'Apa arti mission fail-safe?',
                  options: ['Prosedur pengaman (misal kembali ke titik awal atau berhenti aman) saat terjadi kegagalan sistem kritis', 'Kegagalan total', 'Meledakkan robot', 'Reset pabrik'],
                  correctAnswerIndex: 0,
                  explanation: 'Fail-safe menjamin keselamatan saat anomali.'
                },
                {
                  id: 'rob-q-26-4',
                  question: 'Apa itu Waypoint Navigation?',
                  options: ['Navigasi melewati serangkaian titik koordinat peta yang telah ditentukan sebelumnya', 'Navigasi acak', 'Penerbangan roket', 'Mengikuti garis hitam'],
                  correctAnswerIndex: 0,
                  explanation: 'Waypoint adalah titik target berurutan.'
                },
                {
                  id: 'rob-q-26-5',
                  question: 'Kapan robot dinyatakan mencapai otonomi tingkat tinggi?',
                  options: ['Mampu merencanakan, bernavigasi, mengatasi gangguan, dan menyelesaikan misi tanpa intervensi manusia', 'Hanya bisa maju mundur dengan remote', 'Bisa menyala', 'Punya lampu LED'],
                  correctAnswerIndex: 0,
                  explanation: 'Otonomi penuh mencakup penanganan gangguan mandiri.'
                }
              ]
            }
          ]
        },
        {
          id: 'robotics-m27',
          title: 'Module 27 — Robot Networking',
          description: 'MQTT, WebSocket, telemetri, dan komunikasi robot ke cloud.',
          lessons: [
            {
              id: 'rob-l-27-1',
              title: 'Telemetri Robot via MQTT & WebSocket',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Protokol MQTT
Sangat ringan, berbasis publish-subscribe, ideal untuk perangkat IoT dan robot terhubung (*connected robots*).`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `import paho.mqtt.client as mqtt`
                }
              ]
            },
            {
              id: 'rob-l-27-2',
              title: 'Kuis Module 27 — Robot Networking',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'rob-q-27-1',
                  question: 'Mengapa protokol MQTT sering dipilih untuk telemetri robot?',
                  options: ['Ringan, overhead header kecil, dan efisien di jaringan tidak stabil', 'Sangat berat', 'Hanya untuk video 4K', 'Memerlukan kabel LAN tebal'],
                  correctAnswerIndex: 0,
                  explanation: 'MQTT dioptimalkan untuk perangkat IoT/robot.'
                },
                {
                  id: 'rob-q-27-2',
                  question: 'Apa itu Heartbeat dalam komunikasi robot ke server?',
                  options: ['Sinyal periodik berkala untuk membuktikan koneksi masih hidup (alive)', 'Detak jantung robot', 'Alarm kebakaran', 'Sinyal GPS'],
                  correctAnswerIndex: 0,
                  explanation: 'Heartbeat mendeteksi putusnya koneksi.'
                },
                {
                  id: 'rob-q-27-3',
                  question: 'Apa fungsi WebSocket untuk dashboard kontrol robot?',
                  options: ['Menyediakan komunikasi dua arah real-time berlatensi rendah di browser web', 'Menyimpan database', 'Mengompilasi C++', 'Mengisi baterai'],
                  correctAnswerIndex: 0,
                  explanation: 'WebSocket ideal untuk dashboard web real-time.'
                },
                {
                  id: 'rob-q-27-4',
                  question: 'Bagaimana menangani koneksi Wi-Fi yang terputus saat robot sedang berjalan?',
                  options: ['Menerapkan logika reconnect otomatis dan prosedur fail-safe lokal', 'Membiarkan robot jalan terus tanpa arah', 'Membuang robot', 'Restart komputer server'],
                  correctAnswerIndex: 0,
                  explanation: 'Autoreconnect dan fail-safe lokal mencegah kehilangan kontrol.'
                },
                {
                  id: 'rob-q-27-5',
                  question: 'Apa itu packet loss dalam jaringan nirkabel robot?',
                  options: ['Hilangnya sebagian data paket saat dikirim melalui udara', 'Kabel copot', 'Baterai habis', 'Kerusakan sensor'],
                  correctAnswerIndex: 0,
                  explanation: 'Packet loss adalah fenomena umum di jaringan nirkabel.'
                }
              ]
            }
          ]
        },
        {
          id: 'robotics-m28',
          title: 'Module 28 — Robotics Cybersecurity',
          description: 'Keamanan firmware, enkripsi komunikasi, dan mitigasi ancaman.',
          lessons: [
            {
              id: 'rob-l-28-1',
              title: 'Keamanan Perangkat & Firmware Robot',
              type: 'learn',
              xpReward: 45,
              content: [
                {
                  type: 'markdown',
                  content: `### Perlindungan Akses Robot
Melindungi firmware dari pembajakan, enkripsi token otentikasi ROS 2, dan validasi perintah berbahaya.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `# Validasi tanda tangan perintah aman`
                }
              ]
            },
            {
              id: 'rob-l-28-2',
              title: 'Kuis Module 28 — Robotics Cybersecurity',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'rob-q-28-1',
                  question: 'Mengapa keamanan siber penting untuk robot otonom dan connected robots?',
                  options: ['Mencegah peretasan jarak jauh yang dapat membahayakan fisik manusia atau mengambil alih kendali', 'Agar robot tidak ngantuk', 'Hanya formalitas hukum', 'Meningkatkan kecepatan'],
                  correctAnswerIndex: 0,
                  explanation: 'Peretasan robot berisiko langsung pada keselamatan fisik.'
                },
                {
                  id: 'rob-q-28-2',
                  question: 'Apa itu Secure Boot pada mikrokontroler?',
                  options: ['Memastikan hanya firmware resmi bertanda tangan digital yang dapat dijalankan perangkat', 'Booting cepat', 'Mematikan daya', 'Mengunci layar'],
                  correctAnswerIndex: 0,
                  explanation: 'Secure boot mencegah injeksi firmware palsu.'
                },
                {
                  id: 'rob-q-28-3',
                  question: 'Bagaimana cara mengamankan komunikasi ROS 2 dari penyadapan?',
                  options: ['Menggunakan SROS 2 (Secure ROS 2) dengan enkripsi TLS/DDS security', 'Memakai kabel merah', 'Menulis password di kertas', 'Tidak menggunakan enkripsi'],
                  correctAnswerIndex: 0,
                  explanation: 'SROS 2 mengenkripsi topik dan autentikasi node.'
                },
                {
                  id: 'rob-q-28-4',
                  question: 'Apa itu OTA (Over-The-Air) update security?',
                  options: ['Pembaruan firmware nirkabel yang harus terenkripsi dan diverifikasi integritasnya', 'Mengirim file via Bluetooth tanpa sandi', 'Mengisi baterai nirkabel', 'Mencuci robot'],
                  correctAnswerIndex: 0,
                  explanation: 'OTA aman mencegah injeksi malware saat pembaruan jarak jauh.'
                },
                {
                  id: 'rob-q-28-5',
                  question: 'Mengapa validasi input perintah motor sangat penting di firmware robot?',
                  options: ['Mencegah perintah ekstrem (misal kecepatan 1000 m/s) yang merusak girboks atau mencelakai orang', 'Agar kode lebih panjang', 'Menghemat RAM', 'Wajib dalam C++'],
                  correctAnswerIndex: 0,
                  explanation: 'Validasi mencegah eksploitasi perintah destruktif.'
                }
              ]
            }
          ]
        },
        {
          id: 'robotics-m29',
          title: 'Module 29 — Robotics Testing and Debugging',
          description: 'Unit testing perangkat lunak robot, HIL (Hardware-in-the-Loop), dan diagnostik.',
          lessons: [
            {
              id: 'rob-l-29-1',
              title: 'Pengujian Hardware-in-the-Loop (HIL)',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Pengujian HIL
Menguji perangkat lunak pengendali tertanam bersama perangkat keras asli atau simulasi real-time sebelum diterjunkan ke lapangan.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `# Unit test untuk logika navigasi`
                }
              ]
            },
            {
              id: 'rob-l-29-2',
              title: 'Kuis Module 29 — Robotics Testing and Debugging',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'rob-q-29-1',
                  question: 'Apa itu pengujian Hardware-in-the-Loop (HIL)?',
                  options: ['Metode pengujian di mana pengendali hardware diuji bersama simulator lingkungan atau komponen fisik asli', 'Bermain game di komputer', 'Menguji kabel USB', 'Memperbaiki solder'],
                  correctAnswerIndex: 0,
                  explanation: 'HIL menguji interaksi software-hardware secara aman.'
                },
                {
                  id: 'rob-q-29-2',
                  question: 'Mengapa debugging robot sering lebih sulit dibanding software web biasa?',
                  options: ['Karena melibatkan interaksi dunia nyata, sensor bising, dan masalah mekanis fisik', 'Karena tidak ada komputer', 'Karena bahasa C++ sulit', 'Karena monitor kecil'],
                  correctAnswerIndex: 0,
                  explanation: 'Variabel fisik dunia nyata menghadirkan kompleksitas tinggi.'
                },
                {
                  id: 'rob-q-29-3',
                  question: 'Apa fungsi sistem logging telemetri saat debugging?',
                  options: ['Merekam jejak data variabel dari waktu ke waktu untuk dianalisis kembali (post-mortem)', 'Membuang memori', 'Membuat panas', 'Mengisi baterai'],
                  correctAnswerIndex: 0,
                  explanation: 'Log membantu melacak akar penyebab anomali.'
                },
                {
                  id: 'rob-q-29-4',
                  question: 'Apa itu race condition dalam pemrograman embedded multi-thread?',
                  options: ['Situasi ketika dua thread memperebutkan akses data bersamaan sehingga hasil tidak deterministik', 'Lomba lari robot', 'Kecepatan CPU', 'Koneksi internet cepat'],
                  correctAnswerIndex: 0,
                  explanation: 'Race condition memicu bug sulit dilacak.'
                },
                {
                  id: 'rob-q-29-5',
                  question: 'Bagaimana menguji ketahanan sensor terhadap gangguan eksternal?',
                  options: ['Melakukan uji injeksi kesalahan (fault injection) dan pengujian di berbagai kondisi cahaya/suhu', 'Memukul sensor', 'Membuang sensor', 'Mengabaikan gangguan'],
                  correctAnswerIndex: 0,
                  explanation: 'Fault injection menguji robustness sistem.'
                }
              ]
            }
          ]
        },
        {
          id: 'robotics-m30',
          title: 'Module 30 — Robotics Performance Optimization',
          description: 'Optimalisasi siklus loop, manajemen memori, dan efisiensi daya.',
          lessons: [
            {
              id: 'rob-l-30-1',
              title: 'Optimalisasi Loop Waktu Nyata & Memori',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Menghindari Fragmentasi Memori di C++
Hindari penggunaan \`malloc\` atau \`new\` berulang kali di dalam loop kontrol agar microcontroller tidak mengalami *memory leak* atau *heap fragmentation*.`
                },
                {
                  type: 'code-example',
                  language: 'cpp',
                  code: `// Gunakan alokasi statis di embedded system
static char buffer[128];`
                }
              ]
            },
            {
              id: 'rob-l-30-2',
              title: 'Kuis Module 30 — Robotics Performance Optimization',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'rob-q-30-1',
                  question: 'Mengapa alokasi dinamis (malloc/new) dihindari di dalam loop kontrol real-time mikrokontroler?',
                  options: ['Menimbulkan fragmentasi heap dan waktu eksekusi tidak deterministik', 'Mempercepat prosesor', 'Menambah RAM', 'Wajib dalam Python'],
                  correctAnswerIndex: 0,
                  explanation: 'Alokasi dinamis berisiko memicu lag dan heap exhaustion.'
                },
                {
                  id: 'rob-q-30-2',
                  question: 'Apa itu profiling kinerja robot?',
                  options: ['Mengukur penggunaan CPU, memori, dan waktu eksekusi fungsi untuk menemukan titik kemacetan (bottleneck)', 'Memotret bodi robot', 'Menimbang berat', 'Mengukur tinggi'],
                  correctAnswerIndex: 0,
                  explanation: 'Profiling mengidentifikasi bagian kode yang lambat.'
                },
                {
                  id: 'rob-q-30-3',
                  question: 'Bagaimana cara menghemat daya baterai pada robot otonom saat standby?',
                  options: ['Mengaktifkan mode sleep/low-power pada mikrokontroler dan mematikan daya sensor yang tidak perlu', 'Meniup komponen', 'Memutar motor', 'Meningkatkan clock CPU'],
                  correctAnswerIndex: 0,
                  explanation: 'Sleep modes secara drastis menurunkan konsumsi arus.'
                },
                {
                  id: 'rob-q-30-4',
                  question: 'Apa itu loop rate dalam kontrol robot?',
                  options: ['Frekuensi eksekusi per detik (Hz) dari siklus kontrol atau pembacaan sensor', 'Kecepatan roda', 'Koneksi Wi-Fi', 'Kapasitas baterai'],
                  correctAnswerIndex: 0,
                  explanation: 'Loop rate menentukan seberapa sering sistem memperbarui aksi.'
                },
                {
                  id: 'rob-q-30-5',
                  question: 'Apa dampak komputasi sensor processing yang terlalu lambat?',
                  options: ['Latensi kendali meningkat sehingga robot lambat merespons perubahan situasi (bisa menabrak)', 'Robot terbang', 'Baterai penuh', 'Kamera lebih tajam'],
                  correctAnswerIndex: 0,
                  explanation: 'Latensi tinggi membahayakan keselamatan navigasi.'
                }
              ]
            }
          ]
        },
        {
          id: 'robotics-m31',
          title: 'Module 31 — Production Robotics',
          description: 'Transisi dari prototipe ke produksi massal, keandalan, dan pemeliharaan.',
          lessons: [
            {
              id: 'rob-l-31-1',
              title: 'Reliability & Design for Manufacturing (DFM)',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Dari Prototype ke Produk Massal
Memastikan komponen mudah dirakit, tahan getaran industri, dan memiliki suplai suku cadang yang berkelanjutan.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `# Cek telemetri kesehatan armada robot`
                }
              ]
            },
            {
              id: 'rob-l-31-2',
              title: 'Kuis Module 31 — Production Robotics',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'rob-q-31-1',
                  question: 'Apa itu DFM (Design for Manufacturing) dalam teknik robotika?',
                  options: ['Merancang robot agar mudah dan efisien untuk diproduksi secara massal', 'Merancang game', 'Membuat brosur', 'Mengatur pengiriman'],
                  correctAnswerIndex: 0,
                  explanation: 'DFM memastikan kelayakan manufaktur.'
                },
                {
                  id: 'rob-q-31-2',
                  question: 'Mengapa uji ketahanan getaran (vibration testing) penting untuk robot industri?',
                  options: ['Memastikan komponen elektronik dan kabel tidak lepas akibat getaran operasional mesin', 'Agar robot tahan air', 'Mempercantik warna', 'Menambah kecepatan'],
                  correctAnswerIndex: 0,
                  explanation: 'Getaran pabrik dapat melonggarkan koneksi fisik.'
                },
                {
                  id: 'rob-q-31-3',
                  question: 'Apa itu fleet management pada armada robot?',
                  options: ['Sistem pusat untuk memantau, menjadwalkan, dan mengelola banyak robot sekaligus di pabrik', 'Pengemudi jarak jauh', 'GPS mobil', 'Baterai cadangan'],
                  correctAnswerIndex: 0,
                  explanation: 'Fleet management mengatur koordinasi banyak robot.'
                },
                {
                  id: 'rob-q-31-4',
                  question: 'Mengapa standardisasi komponen penting dalam produksi robot?',
                  options: ['Memudahkan perawatan, penggantian suku cadang, dan menurunkan biaya', 'Supaya seragam', 'Agar berat', 'Tidak penting'],
                  correctAnswerIndex: 0,
                  explanation: 'Standardisasi mempermudah maintenance.'
                },
                {
                  id: 'rob-q-31-5',
                  question: 'Apa arti MTBF (Mean Time Between Failures)?',
                  options: ['Rata-rata waktu operasional normal sebelum terjadi kegagalan sistem', 'Waktu perbaikan', 'Kecepatan maksimal', 'Kapasitas RAM'],
                  correctAnswerIndex: 0,
                  explanation: 'MTBF mengukur keandalan hardware/software.'
                }
              ]
            }
          ]
        },
        {
          id: 'robotics-m32',
          title: 'Module 32 — Robotics Engineering Architecture',
          description: 'Desain sistem menyeluruh dari sensor fisik hingga cloud dashboard.',
          lessons: [
            {
              id: 'rob-l-32-1',
              title: 'Arsitektur End-to-End Sistem Robot',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Integrasi Menyeluruh
Menghubungkan lapisan perangkat keras, middleware ROS 2, backend API, dan antarmuka pengguna web.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `# Diagram arsitektur sistem robotik`
                }
              ]
            },
            {
              id: 'rob-l-32-2',
              title: 'Kuis Module 32 — Robotics Engineering Architecture',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'rob-q-32-1',
                  question: 'Bagaimana arsitektur end-to-end yang baik memisahkan lapisan kendali dan lapisan cloud?',
                  options: ['Kendali krusial (keselamatan) harus berjalan lokal secara mandiri; cloud hanya untuk pemantauan/telemetri', 'Semua di cloud', 'Semua manual', 'Tidak dipisah'],
                  correctAnswerIndex: 0,
                  explanation: 'Keselamatan tidak boleh bergantung pada koneksi cloud.'
                },
                {
                  id: 'rob-q-32-2',
                  question: 'Apa peran API Gateway dalam infrastruktur robot terhubung?',
                  options: ['Menjadi pintu gerbang tunggal yang aman untuk meneruskan data telemetri dan perintah armada', 'Mengatur lalu lintas jalan raya', 'Sebagai roda', 'Sebagai sensor jarak'],
                  correctAnswerIndex: 0,
                  explanation: 'API Gateway mengamankan pintu masuk server.'
                },
                {
                  id: 'rob-q-32-3',
                  question: 'Mengapa desentralisasi pemrosesan penting dalam robot besar?',
                  options: ['Membagi beban kerja ke beberapa komputer papan (misal satu untuk visi, satu untuk navigasi)', 'Agar berat', 'Menghemat listrik', 'Tidak penting'],
                  correctAnswerIndex: 0,
                  explanation: 'Desentralisasi mencegah bottleneck pada satu CPU.'
                },
                {
                  id: 'rob-q-32-4',
                  question: 'Bagaimana memastikan skalabilitas saat menambah jumlah robot di pabrik?',
                  options: ['Menggunakan protokol komunikasi terstandar dan arsitektur server yang mendukung multi-klien', 'Membeli komputer baru setiap robot', 'Menulis ulang semua kode', 'Tidak bisa diskalakan'],
                  correctAnswerIndex: 0,
                  explanation: 'Standarisasi dan arsitektur modular mendukung skalabilitas.'
                },
                {
                  id: 'rob-q-32-5',
                  question: 'Apa komponen kunci dari human-robot interface (HRI) yang baik?',
                  options: ['Visualisasi status yang intuitif, tombol berhenti darurat (e-stop), dan indikator jelas', 'Suara bising', 'Lampu warna-warni acak', 'Tanpa tombol'],
                  correctAnswerIndex: 0,
                  explanation: 'HRI harus intuitif dan mengutamakan keselamatan.'
                }
              ]
            }
          ]
        },
        {
          id: 'robotics-m33',
          title: 'Module 33 — Capstone Preparation',
          description: 'Perencanaan spesifikasi proyek akhir dan arsitektur sistem.',
          lessons: [
            {
              id: 'rob-l-33-1',
              title: 'Perencanaan Spesifikasi Proyek Akhir',
              type: 'learn',
              xpReward: 40,
              content: [
                {
                  type: 'markdown',
                  content: `### Spesifikasi Sistem AMR
Menentukan komponen sensor, target performa, dan skenario pengujian capstone.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `# Dokumen spesifikasi capstone`
                }
              ]
            },
            {
              id: 'rob-l-33-2',
              title: 'Kuis Module 33 — Capstone Preparation',
              type: 'quiz',
              xpReward: 40,
              questions: [
                {
                  id: 'rob-q-33-1',
                  question: 'Apa langkah pertama sebelum mulai membangun sistem robot capstone?',
                  options: ['Menyusun dokumen spesifikasi kebutuhan sistem (SRS) dan arsitektur', 'Langsung solder komponen', 'Membeli bodi robot mahal', 'Menulis laporan akhir'],
                  correctAnswerIndex: 0,
                  explanation: 'Perencanaan spesifikasi menghindari kesalahan desain.'
                },
                {
                  id: 'rob-q-33-2',
                  question: 'Mengapa pengujian bertahap (incremental testing) sangat dianjurkan dalam capstone?',
                  options: ['Mempermudah isolasi dan perbaikan bug pada setiap modul (sensor dulu, motor dulu, baru navigasi)', 'Membuang waktu', 'Lebih mahal', 'Tidak ada gunanya'],
                  correctAnswerIndex: 0,
                  explanation: 'Pengujian modular mencegah kerumitan debugging.'
                },
                {
                  id: 'rob-q-33-3',
                  question: 'Apa kriteria sukses utama untuk proyek Autonomous Mobile Robot?',
                  options: ['Robot berhasil bernavigasi dari titik awal ke tujuan secara otonom tanpa menabrak', 'Robot bisa menyala', 'Punya lampu LED', 'Kabel rapi'],
                  correctAnswerIndex: 0,
                  explanation: 'Keberhasilan otonomi adalah navigasi bebas tabrakan.'
                },
                {
                  id: 'rob-q-33-4',
                  question: 'Bagaimana mendokumentasikan proyek robotika dengan baik?',
                  options: ['Menyediakan diagram skematik, dokumentasi kode, panduan instalasi, dan catatan pengujian', 'Menyimpan di kepala', 'Hanya kirim foto', 'Tidak perlu dokumentasi'],
                  correctAnswerIndex: 0,
                  explanation: 'Dokumentasi lengkap esensial untuk pemeliharaan.'
                },
                {
                  id: 'rob-q-33-5',
                  question: 'Apa yang harus dilakukan jika terjadi kegagalan sistem saat uji coba capstone?',
                  options: ['Menganalisis log telemetri, memeriksa diagram sirkuit, dan melakukan debugging sistematis', 'Menyerah', 'Membuang robot', 'Menyalahkan cuaca'],
                  correctAnswerIndex: 0,
                  explanation: 'Debugging sistematis adalah inti teknik rekayasa.'
                }
              ]
            }
          ]
        },
        {
          id: 'robotics-m34',
          title: 'Module 34 — Final Robotics Capstone',
          description: 'Implementasi akhir sistem AMR otonom.',
          lessons: [
            {
              id: 'rob-l-34-1',
              title: 'Capstone: Autonomous Mobile Robot (AMR) System',
              type: 'project',
              xpReward: 200,
              content: [
                {
                  type: 'markdown',
                  content: `### Proyek Akhir: Autonomous Mobile Robot (AMR)
Integrasikan seluruh kemampuan dari modul 1 hingga 33 ke dalam satu sistem robot otonom yang tangguh dan siap diproduksi.`
                },
                {
                  type: 'code-example',
                  language: 'python',
                  code: `class CapstoneAMR:
    def __init__(self):
        print("AMR Initialized")
    def run(self):
        print("Executing Autonomous Mission...")
        
amr = CapstoneAMR()
amr.run()`
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
