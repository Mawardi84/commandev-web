export interface ThreatNode {
  id: string;
  name: string;
  type: 'client' | 'frontend' | 'gateway' | 'backend' | 'database';
  icon: string;
  description: string;
  assets: string[];
  entryPoints: string[];
  trustBoundary: string;
  threats: {
    id: string;
    stride: 'Spoofing' | 'Tampering' | 'Repudiation' | 'Information Disclosure' | 'Denial of Service' | 'Elevation of Privilege';
    title: string;
    description: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    requiredControl: string;
    controlId: string;
  }[];
}

export interface SecurityControl {
  id: string;
  name: string;
  category: 'Network' | 'Application' | 'Data' | 'Authentication';
  description: string;
  activeByDefault: boolean;
}

export const SECURITY_CONTROLS: SecurityControl[] = [
  {
    id: 'tls_hsts',
    name: 'TLS 1.3 & HSTS Enforcement',
    category: 'Network',
    description: 'Enkripsi data transit dan proteksi dari downgrade serangan Man-in-the-Middle.',
    activeByDefault: false
  },
  {
    id: 'csp_header',
    name: 'Content Security Policy (CSP)',
    category: 'Application',
    description: 'Membatasi eksekusi skrip pihak ketiga dan melindungi DOM dari serangan XSS.',
    activeByDefault: false
  },
  {
    id: 'rate_limiting',
    name: 'API Rate Limiting & DoS Shield',
    category: 'Network',
    description: 'Membatasi lonjakan request per IP untuk mencegah serangan brute-force dan exhaustion.',
    activeByDefault: false
  },
  {
    id: 'param_queries',
    name: 'Parameterized Queries & ORM Sanitation',
    category: 'Data',
    description: 'Memisahkan sintaks SQL dari data masukan pengguna untuk mengeliminasi SQL Injection.',
    activeByDefault: false
  },
  {
    id: 'jwt_rbac',
    name: 'JWT Verification & Strict RBAC Checks',
    category: 'Authentication',
    description: 'Memeriksa token digital dan mencegah Insecure Direct Object Reference (IDOR).',
    activeByDefault: false
  },
  {
    id: 'db_least_privilege',
    name: 'Database Least Privilege & Encryption at Rest',
    category: 'Data',
    description: 'Akun service non-root dengan hak akses terbatas dan partisi data terenkripsi.',
    activeByDefault: false
  }
];

export const THREAT_NODES: ThreatNode[] = [
  {
    id: 'client_browser',
    name: 'User Browser & Mobile Client',
    type: 'client',
    icon: 'globe',
    description: 'Lingkungan eksekusi di sisi pengguna akhir (perangkat yang tidak berada di bawah kendali kita).',
    assets: ['Kredensial Login Pengguna', 'Session Storage / Cookie', 'Data Formulir Input'],
    entryPoints: ['Form Input HTML', 'URL Address Bar', 'Browser LocalStorage / Cookies'],
    trustBoundary: 'Public Internet (Zona Tidak Tepercaya)',
    threats: [
      {
        id: 't-spoof-client',
        stride: 'Spoofing',
        title: 'Pencurian Sesi Pengguna via Man-in-the-Middle',
        description: 'Penyerang di Wi-Fi publik menyadap token sesi karena komunikasi tidak terenkripsi.',
        severity: 'HIGH',
        requiredControl: 'TLS 1.3 & HSTS Enforcement',
        controlId: 'tls_hsts'
      },
      {
        id: 't-info-xss',
        stride: 'Information Disclosure',
        title: 'Ekstraksi Cookie Otentikasi via XSS',
        description: 'Skrip jahat disuntikkan ke halaman dan membaca document.cookie atau localStorage.',
        severity: 'CRITICAL',
        requiredControl: 'Content Security Policy (CSP)',
        controlId: 'csp_header'
      }
    ]
  },
  {
    id: 'frontend_spa',
    name: 'Frontend Application (React/Tailwind)',
    type: 'frontend',
    icon: 'layout',
    description: 'Bundle aplikasi Single Page Application yang di-render di browser client.',
    assets: ['UI State', 'API Token Sementara', 'Client Configuration'],
    entryPoints: ['Event Listener DOM', 'URL Query Parameters', 'WebSocket Message Receiver'],
    trustBoundary: 'Public Client Boundary',
    threats: [
      {
        id: 't-tamper-dom',
        stride: 'Tampering',
        title: 'Manipulasi State Client di Memory',
        description: 'Pengguna memodifikasi harga barang atau role admin langsung di console JavaScript browser.',
        severity: 'MEDIUM',
        requiredControl: 'JWT Verification & Strict RBAC Checks',
        controlId: 'jwt_rbac'
      }
    ]
  },
  {
    id: 'api_gateway',
    name: 'API Gateway / Reverse Proxy (Nginx)',
    type: 'gateway',
    icon: 'shield',
    description: 'Pintu gerbang pertama yang menerima request jaringan publik sebelum diteruskan ke service internal.',
    assets: ['Sertifikat SSL/TLS', 'Routing Map', 'IP Logs'],
    entryPoints: ['Port HTTP 80 / HTTPS 443', 'DNS Ingress'],
    trustBoundary: 'Perimeter Boundary (Public to DMZ)',
    threats: [
      {
        id: 't-dos-flood',
        stride: 'Denial of Service',
        title: 'Serangan HTTP Flood & Brute Force',
        description: 'Ribuan bot membanjiri endpoint login hingga CPU dan thread server habis.',
        severity: 'HIGH',
        requiredControl: 'API Rate Limiting & DoS Shield',
        controlId: 'rate_limiting'
      }
    ]
  },
  {
    id: 'backend_api',
    name: 'Backend API Service (Node/Express)',
    type: 'backend',
    icon: 'server',
    description: 'Pusat logika bisnis, validasi data masukan, dan penegakan otorisasi peran.',
    assets: ['Business Logic', 'Server Secrets & JWT Private Keys', 'Service Credentials'],
    entryPoints: ['REST API Endpoints (/api/*)', 'Webhook Handlers', 'File Upload Parsers'],
    trustBoundary: 'Internal App Boundary (DMZ to Private VPC)',
    threats: [
      {
        id: 't-elev-idor',
        stride: 'Elevation of Privilege',
        title: 'Insecure Direct Object Reference (IDOR)',
        description: 'User biasa memanggil /api/users/admin_id untuk menghapus data atau mengubah password.',
        severity: 'CRITICAL',
        requiredControl: 'JWT Verification & Strict RBAC Checks',
        controlId: 'jwt_rbac'
      }
    ]
  },
  {
    id: 'database_storage',
    name: 'Database Cluster (PostgreSQL)',
    type: 'database',
    icon: 'database',
    description: 'Penyimpanan persisten terenkripsi berisi data akun, catatan keuangan, dan catatan audit.',
    assets: ['Data Pribadi (PII)', 'Hash Password Pengguna', 'Tabel Transaksi Finansial'],
    entryPoints: ['Port Internal PostgreSQL 5432', 'Database Connection Pool'],
    trustBoundary: 'High Security Data Boundary (Isolated Subnet)',
    threats: [
      {
        id: 't-tamper-sqli',
        stride: 'Tampering',
        title: 'SQL Injection Data Exfiltration',
        description: 'String berbahaya dieksekusi oleh mesin SQL dan membocorkan seluruh record tabel.',
        severity: 'CRITICAL',
        requiredControl: 'Parameterized Queries & ORM Sanitation',
        controlId: 'param_queries'
      },
      {
        id: 't-info-db-leak',
        stride: 'Information Disclosure',
        title: 'Akses Tidak Terbatas Akun Database Superuser',
        description: 'Koneksi aplikasi menggunakan akun root/superuser dengan izin menghapus tabel.',
        severity: 'HIGH',
        requiredControl: 'Database Least Privilege & Encryption at Rest',
        controlId: 'db_least_privilege'
      }
    ]
  }
];
