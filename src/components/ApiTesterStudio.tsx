import React, { useState } from 'react';
import { 
  Send, 
  Terminal, 
  RotateCcw, 
  Copy, 
  Check, 
  Clock, 
  Layers, 
  Key, 
  FileJson, 
  Plus, 
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Server
} from 'lucide-react';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface HeaderItem {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
}

interface MockEndpoint {
  method: HttpMethod;
  path: string;
  name: string;
  description: string;
  defaultHeaders?: Record<string, string>;
  defaultBody?: string;
  responseStatus: number;
  responseBody: any;
  delayMs: number;
}

const PRESET_ENDPOINTS: MockEndpoint[] = [
  {
    method: 'GET',
    path: '/api/v1/courses',
    name: 'Get All Courses',
    description: 'Mengambil daftar semua kursus yang tersedia di COMMANDEV.',
    responseStatus: 200,
    delayMs: 120,
    responseBody: {
      success: true,
      total: 6,
      data: [
        { id: 'html-fundamentals', title: 'HTML5 Web Fundamentals', level: 'Beginner', students: 4820 },
        { id: 'css-layouts', title: 'CSS3 & Interactive Layouts', level: 'Beginner', students: 3950 },
        { id: 'js-modern', title: 'Modern JavaScript (ES6+)', level: 'Intermediate', students: 5120 },
        { id: 'python-core', title: 'Python 3.12 Core & OOP', level: 'Beginner-Advanced', students: 6300 },
        { id: 'react-mastery', title: 'React 18 & Hooks Mastery', level: 'Intermediate', students: 3100 },
        { id: 'backend-rest', title: 'Backend REST API & Node.js', level: 'Advanced', students: 2400 }
      ]
    }
  },
  {
    method: 'POST',
    path: '/api/v1/auth/login',
    name: 'User Authentication (Login)',
    description: 'Mengirim kredensial email dan password untuk mendapatkan JWT bearer token.',
    defaultHeaders: { 'Content-Type': 'application/json' },
    defaultBody: JSON.stringify({ email: 'developer@commandev.app', password: 'password123' }, null, 2),
    responseStatus: 200,
    delayMs: 240,
    responseBody: {
      success: true,
      message: 'Login berhasil',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c3ItOTk4MiIsImVtYWlsIjoiZGV2ZWxvcGVyQGNvbW1hbmRldi5hcHAiLCJyb2xlIjoic3R1ZGVudCJ9.mock_signature_abc123',
      user: {
        id: 'usr-9982',
        name: 'Ahmad Developer',
        email: 'developer@commandev.app',
        xp: 1450,
        streakDays: 7
      }
    }
  },
  {
    method: 'POST',
    path: '/api/v1/challenges/submit',
    name: 'Submit Code Challenge',
    description: 'Mengirimkan solusi kode siswa untuk di-grading otomatis oleh assessment engine.',
    defaultHeaders: { 'Content-Type': 'application/json', 'Authorization': 'Bearer eyJhbGciOi...' },
    defaultBody: JSON.stringify({ challengeId: 'js-array-filter', language: 'javascript', code: 'const filtered = items.filter(x => x.active);' }, null, 2),
    responseStatus: 201,
    delayMs: 380,
    responseBody: {
      success: true,
      status: 'PASSED',
      testsPassed: 4,
      totalTests: 4,
      xpEarned: 50,
      feedback: 'Semua 4/4 automated test case berhasil lolos!'
    }
  },
  {
    method: 'PUT',
    path: '/api/v1/users/profile',
    name: 'Update User Profile',
    description: 'Memperbarui profil pengguna (bio, avatar, target pembelajaran mingguan).',
    defaultHeaders: { 'Content-Type': 'application/json', 'Authorization': 'Bearer eyJhbGci...' },
    defaultBody: JSON.stringify({ name: 'Ahmad Senior Dev', bio: 'Fullstack JavaScript & Python enthusiast', weeklyGoalHours: 10 }, null, 2),
    responseStatus: 200,
    delayMs: 180,
    responseBody: {
      success: true,
      message: 'Profil berhasil diperbarui',
      updatedAt: new Date().toISOString()
    }
  },
  {
    method: 'DELETE',
    path: '/api/v1/notes/note-402',
    name: 'Delete Study Note',
    description: 'Menghapus catatan belajar berdasarkan ID catatan.',
    defaultHeaders: { 'Authorization': 'Bearer eyJhbGci...' },
    responseStatus: 204,
    delayMs: 150,
    responseBody: null
  }
];

export const ApiTesterStudio: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<HttpMethod>('GET');
  const [endpointUrl, setEndpointUrl] = useState('/api/v1/courses');
  const [activeTab, setActiveTab] = useState<'body' | 'headers' | 'auth'>('body');
  
  // Headers state
  const [headers, setHeaders] = useState<HeaderItem[]>([
    { id: '1', key: 'Content-Type', value: 'application/json', enabled: true },
    { id: '2', key: 'Accept', value: 'application/json', enabled: true }
  ]);

  // Auth token state
  const [bearerToken, setBearerToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
  
  // Request body
  const [requestBody, setRequestBody] = useState('{\n  \n}');
  
  // Response state
  const [isLoading, setIsLoading] = useState(false);
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [responseHeaders, setResponseHeaders] = useState<Record<string, string>>({});
  const [responseBody, setResponseBody] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Load preset endpoint
  const handleSelectPreset = (preset: MockEndpoint) => {
    setSelectedMethod(preset.method);
    setEndpointUrl(preset.path);
    if (preset.defaultBody) {
      setRequestBody(preset.defaultBody);
    } else {
      setRequestBody('{\n  \n}');
    }
    if (preset.defaultHeaders) {
      const newHeaders: HeaderItem[] = Object.entries(preset.defaultHeaders).map(([k, v], idx) => ({
        id: String(idx + 1),
        key: k,
        value: v,
        enabled: true
      }));
      setHeaders(newHeaders);
    }
  };

  // Add new header
  const handleAddHeader = () => {
    setHeaders([...headers, { id: String(Date.now()), key: '', value: '', enabled: true }]);
  };

  // Remove header
  const handleRemoveHeader = (id: string) => {
    setHeaders(headers.filter(h => h.id !== id));
  };

  // Send request simulation
  const handleSendRequest = () => {
    setIsLoading(true);
    setResponseStatus(null);
    setResponseBody(null);

    // Find preset match or simulate generic response
    const matched = PRESET_ENDPOINTS.find(
      p => p.path === endpointUrl && p.method === selectedMethod
    );

    const delay = matched ? matched.delayMs : Math.floor(Math.random() * 200) + 100;

    setTimeout(() => {
      setIsLoading(false);
      const status = matched ? matched.responseStatus : (selectedMethod === 'POST' ? 201 : selectedMethod === 'DELETE' ? 204 : 200);
      setResponseStatus(status);
      setResponseTime(delay);
      setResponseHeaders({
        'content-type': 'application/json; charset=utf-8',
        'x-powered-by': 'Express/Node.js',
        'access-control-allow-origin': '*',
        'cache-control': 'no-cache',
        'date': new Date().toUTCString()
      });

      if (matched && matched.responseBody !== null) {
        setResponseBody(JSON.stringify(matched.responseBody, null, 2));
      } else if (status === 204) {
        setResponseBody('/* 204 No Content — Resource successfully deleted */');
      } else {
        // Generic mock response
        setResponseBody(JSON.stringify({
          success: true,
          method: selectedMethod,
          endpoint: endpointUrl,
          timestamp: new Date().toISOString(),
          message: `Permintaan ${selectedMethod} ke ${endpointUrl} berhasil dieksekusi.`
        }, null, 2));
      }
    }, delay);
  };

  const handleCopyResponse = () => {
    if (responseBody) {
      navigator.clipboard.writeText(responseBody);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStatusBadge = (status: number) => {
    if (status >= 200 && status < 300) {
      return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
    }
    if (status >= 400 && status < 500) {
      return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
    }
    return 'bg-rose-500/20 text-rose-400 border-rose-500/40';
  };

  const getMethodColor = (m: HttpMethod) => {
    switch (m) {
      case 'GET': return 'text-emerald-400 bg-emerald-950/40 border-emerald-800/50';
      case 'POST': return 'text-indigo-400 bg-indigo-950/40 border-indigo-800/50';
      case 'PUT': return 'text-amber-400 bg-amber-950/40 border-amber-800/50';
      case 'PATCH': return 'text-sky-400 bg-sky-950/40 border-sky-800/50';
      case 'DELETE': return 'text-rose-400 bg-rose-950/40 border-rose-800/50';
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#070b14] text-slate-200 overflow-hidden font-sans">
      
      {/* 1. TOP HEADER & PRESETS */}
      <div className="border-b border-slate-800/80 bg-slate-950/90 p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
            <Server className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
              <span>REST API Client & Tester</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-normal">Express Engine</span>
            </h2>
            <p className="text-[10px] text-slate-400">Simulasikan dan uji coba request HTTP ke API backend secara real-time</p>
          </div>
        </div>

        {/* Presets dropdown */}
        <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
          <span className="text-[11px] text-slate-400 font-medium">Contoh:</span>
          {PRESET_ENDPOINTS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPreset(preset)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                endpointUrl === preset.path && selectedMethod === preset.method
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
              }`}
            >
              <span className={`text-[10px] font-bold ${
                preset.method === 'GET' ? 'text-emerald-400' :
                preset.method === 'POST' ? 'text-indigo-400' :
                preset.method === 'PUT' ? 'text-amber-400' : 'text-rose-400'
              }`}>
                {preset.method}
              </span>
              <span>{preset.path}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. REQUEST URL BUILDER BAR */}
      <div className="p-3 bg-[#0d1322] border-b border-slate-800 flex items-center gap-2">
        {/* Method selector */}
        <select
          value={selectedMethod}
          onChange={(e) => setSelectedMethod(e.target.value as HttpMethod)}
          className={`px-3 py-2 rounded-xl text-xs font-bold font-mono border cursor-pointer bg-slate-900 outline-none focus:ring-2 focus:ring-indigo-500 ${getMethodColor(selectedMethod)}`}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="PATCH">PATCH</option>
          <option value="DELETE">DELETE</option>
        </select>

        {/* URL Input */}
        <div className="flex-1 flex items-center bg-slate-950 border border-slate-800 focus-within:border-indigo-500 rounded-xl px-3 py-1.5 font-mono text-xs text-slate-200">
          <span className="text-slate-500 select-none mr-1.5">https://api.commandev.dev</span>
          <input
            type="text"
            value={endpointUrl}
            onChange={(e) => setEndpointUrl(e.target.value)}
            placeholder="/api/v1/resource"
            className="flex-1 bg-transparent border-0 outline-none text-slate-100 font-mono"
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSendRequest}
          disabled={isLoading}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Mengirim...</span>
            </>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span>Kirim Request</span>
            </>
          )}
        </button>
      </div>

      {/* 3. MAIN DUAL PANE: REQUEST ON LEFT, RESPONSE ON RIGHT */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-800 min-h-0 overflow-hidden">
        
        {/* LEFT PANE: REQUEST CONFIGURATION */}
        <div className="flex flex-col h-full bg-[#0a0e1a] overflow-hidden">
          
          {/* Request Sub-Tabs */}
          <div className="flex items-center justify-between px-3 py-2 bg-slate-900/60 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveTab('body')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'body' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileJson className="w-3.5 h-3.5" />
                <span>Body (JSON)</span>
              </button>
              <button
                onClick={() => setActiveTab('headers')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'headers' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Headers ({headers.filter(h => h.enabled).length})</span>
              </button>
              <button
                onClick={() => setActiveTab('auth')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'auth' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Key className="w-3.5 h-3.5" />
                <span>Auth (Bearer Token)</span>
              </button>
            </div>

            <span className="text-[11px] text-slate-500 font-mono">Payload Builder</span>
          </div>

          {/* Tab Content */}
          <div className="flex-1 p-3 overflow-auto custom-scrollbar">
            {activeTab === 'body' && (
              <div className="h-full flex flex-col space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>Raw JSON Payload:</span>
                  <button
                    onClick={() => {
                      try {
                        const parsed = JSON.parse(requestBody);
                        setRequestBody(JSON.stringify(parsed, null, 2));
                      } catch (e) {}
                    }}
                    className="text-indigo-400 hover:text-indigo-300 cursor-pointer"
                  >
                    Format JSON (Beautify)
                  </button>
                </div>
                <textarea
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  placeholder={'{\n  "key": "value"\n}'}
                  className="flex-1 w-full p-3 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-slate-200 outline-none focus:border-indigo-500 resize-none custom-scrollbar leading-relaxed"
                  rows={14}
                />
              </div>
            )}

            {activeTab === 'headers' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between pb-1">
                  <span className="text-xs text-slate-400">Request Headers Key-Value:</span>
                  <button
                    onClick={handleAddHeader}
                    className="flex items-center gap-1 px-2.5 py-1 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Header</span>
                  </button>
                </div>

                <div className="space-y-1.5">
                  {headers.map((h) => (
                    <div key={h.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={h.enabled}
                        onChange={(e) => {
                          setHeaders(headers.map(item => item.id === h.id ? { ...item, enabled: e.target.checked } : item));
                        }}
                        className="rounded accent-indigo-500 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={h.key}
                        onChange={(e) => {
                          setHeaders(headers.map(item => item.id === h.id ? { ...item, key: e.target.value } : item));
                        }}
                        placeholder="Header Key (e.g. Authorization)"
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-200 outline-none focus:border-indigo-500"
                      />
                      <input
                        type="text"
                        value={h.value}
                        onChange={(e) => {
                          setHeaders(headers.map(item => item.id === h.id ? { ...item, value: e.target.value } : item));
                        }}
                        placeholder="Header Value"
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-200 outline-none focus:border-indigo-500"
                      />
                      <button
                        onClick={() => handleRemoveHeader(h.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'auth' && (
              <div className="space-y-3">
                <div className="p-3 bg-indigo-950/30 border border-indigo-800/40 rounded-xl text-xs text-indigo-300">
                  <div className="font-bold flex items-center gap-1.5 mb-1">
                    <Key className="w-4 h-4 text-indigo-400" />
                    <span>Bearer Token Authentication</span>
                  </div>
                  Token ini akan otomatis diinjeksi ke header <code className="bg-indigo-900/60 px-1 py-0.5 rounded">Authorization: Bearer &lt;token&gt;</code>.
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 font-mono">Token String (JWT):</label>
                  <textarea
                    value={bearerToken}
                    onChange={(e) => setBearerToken(e.target.value)}
                    rows={4}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-slate-200 outline-none focus:border-indigo-500 resize-none"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANE: RESPONSE INSPECTOR */}
        <div className="flex flex-col h-full bg-[#070b14] overflow-hidden">
          
          {/* Response Status Bar */}
          <div className="px-4 py-2 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <span className="font-mono text-slate-400">Response:</span>
              {responseStatus !== null ? (
                <span className={`px-2.5 py-0.5 rounded-full font-bold font-mono text-xs border ${getStatusBadge(responseStatus)}`}>
                  {responseStatus} {responseStatus === 200 ? 'OK' : responseStatus === 201 ? 'Created' : responseStatus === 204 ? 'No Content' : 'Response'}
                </span>
              ) : (
                <span className="text-slate-500 italic text-[11px]">Belum ada request dikirim</span>
              )}

              {responseTime !== null && (
                <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {responseTime}ms
                </span>
              )}
            </div>

            {responseBody && (
              <button
                onClick={handleCopyResponse}
                className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[11px] font-medium transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Tersalin' : 'Salin JSON'}</span>
              </button>
            )}
          </div>

          {/* Response Body Output */}
          <div className="flex-1 p-4 overflow-auto custom-scrollbar font-mono text-xs bg-[#050811]">
            {isLoading ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-2">
                <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-xs font-sans">Menunggu respon server...</span>
              </div>
            ) : responseBody !== null ? (
              <pre className="text-indigo-300 whitespace-pre-wrap leading-relaxed">
                {responseBody}
              </pre>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-2 py-12">
                <Send className="w-8 h-8 stroke-[1.5] text-slate-700" />
                <p className="text-xs font-sans text-center max-w-sm">
                  Pilih salah satu endpoint preset di atas atau ketik endpoint Anda sendiri, lalu klik tombol <strong className="text-indigo-400 font-semibold">"Kirim Request"</strong>.
                </p>
              </div>
            )}
          </div>

          {/* Response Headers Footer Drawer */}
          {Object.keys(responseHeaders).length > 0 && (
            <div className="p-2.5 bg-slate-950 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex flex-wrap gap-x-4 gap-y-1">
              {Object.entries(responseHeaders).map(([k, v]) => (
                <div key={k} className="flex items-center gap-1">
                  <span className="text-slate-500">{k}:</span>
                  <span className="text-slate-300">{v}</span>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
