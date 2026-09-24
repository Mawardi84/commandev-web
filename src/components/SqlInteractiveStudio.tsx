import React, { useState } from 'react';
import { 
  Database, 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  Clock, 
  Table as TableIcon, 
  Columns, 
  Layers, 
  Sparkles, 
  Download,
  AlertCircle,
  Key,
  ListFilter
} from 'lucide-react';

interface SeedTable {
  name: string;
  description: string;
  columns: { name: string; type: string; isPk?: boolean; isFk?: boolean; ref?: string }[];
  rows: Record<string, any>[];
}

const INITIAL_DATABASE_SCHEMA: Record<string, SeedTable> = {
  users: {
    name: 'users',
    description: 'Tabel data pengguna dan siswa di platform CODERA.',
    columns: [
      { name: 'id', type: 'INTEGER', isPk: true },
      { name: 'name', type: 'VARCHAR(100)' },
      { name: 'email', type: 'VARCHAR(150)' },
      { name: 'role', type: 'VARCHAR(20)' },
      { name: 'xp', type: 'INTEGER' },
      { name: 'created_at', type: 'TIMESTAMP' }
    ],
    rows: [
      { id: 1, name: 'Ahmad Fauzi', email: 'ahmad@codera.app', role: 'student', xp: 1250, created_at: '2026-01-15' },
      { id: 2, name: 'Budi Santoso', email: 'budi@codera.app', role: 'student', xp: 840, created_at: '2026-02-01' },
      { id: 3, name: 'Citra Dewi', email: 'citra@codera.app', role: 'mentor', xp: 4500, created_at: '2025-11-20' },
      { id: 4, name: 'Dina Permata', email: 'dina@codera.app', role: 'student', xp: 2100, created_at: '2026-01-28' },
      { id: 5, name: 'Eko Prasetyo', email: 'eko@codera.app', role: 'admin', xp: 6200, created_at: '2025-09-10' }
    ]
  },
  courses: {
    name: 'courses',
    description: 'Katalog kursus pemrograman yang terdaftar.',
    columns: [
      { name: 'id', type: 'INTEGER', isPk: true },
      { name: 'slug', type: 'VARCHAR(50)' },
      { name: 'title', type: 'VARCHAR(100)' },
      { name: 'category', type: 'VARCHAR(50)' },
      { name: 'price', type: 'INTEGER' }
    ],
    rows: [
      { id: 101, slug: 'html-fundamentals', title: 'HTML5 Web Fundamentals', category: 'Frontend', price: 0 },
      { id: 102, slug: 'css-layouts', title: 'CSS3 & Interactive Layouts', category: 'Frontend', price: 150000 },
      { id: 103, slug: 'js-modern', title: 'Modern JavaScript (ES6+)', category: 'Frontend', price: 250000 },
      { id: 104, slug: 'python-core', title: 'Python 3.12 Core & OOP', category: 'Programming', price: 275000 },
      { id: 105, slug: 'backend-rest', title: 'Backend REST API & Node.js', category: 'Backend', price: 350000 }
    ]
  },
  enrollments: {
    name: 'enrollments',
    description: 'Data pendaftaran kursus oleh siswa (relasi many-to-many).',
    columns: [
      { name: 'id', type: 'INTEGER', isPk: true },
      { name: 'user_id', type: 'INTEGER', isFk: true, ref: 'users.id' },
      { name: 'course_id', type: 'INTEGER', isFk: true, ref: 'courses.id' },
      { name: 'progress', type: 'INTEGER' },
      { name: 'status', type: 'VARCHAR(20)' }
    ],
    rows: [
      { id: 501, user_id: 1, course_id: 101, progress: 100, status: 'completed' },
      { id: 502, user_id: 1, course_id: 103, progress: 65, status: 'in_progress' },
      { id: 503, user_id: 2, course_id: 101, progress: 40, status: 'in_progress' },
      { id: 504, user_id: 4, course_id: 104, progress: 90, status: 'in_progress' },
      { id: 505, user_id: 4, course_id: 105, progress: 20, status: 'in_progress' }
    ]
  }
};

const SQL_PRESETS = [
  {
    name: '1. Basic SELECT & WHERE',
    sql: `-- Mengambil data siswa dengan perolehan XP di atas 1000\nSELECT id, name, email, role, xp\nFROM users\nWHERE role = 'student' AND xp >= 1000\nORDER BY xp DESC;`
  },
  {
    name: '2. INNER JOIN Multitabel',
    sql: `-- Menggabungkan data pendaftaran siswa dengan judul kursus\nSELECT \n  u.name AS student_name,\n  c.title AS course_title,\n  c.category,\n  e.progress || '%' AS completion_rate,\n  e.status\nFROM enrollments e\nINNER JOIN users u ON e.user_id = u.id\nINNER JOIN courses c ON e.course_id = c.id\nORDER BY e.progress DESC;`
  },
  {
    name: '3. Aggregation & GROUP BY',
    sql: `-- Menghitung jumlah pengguna dan rata-rata XP per role\nSELECT \n  role,\n  COUNT(*) AS total_users,\n  AVG(xp) AS average_xp,\n  MAX(xp) AS highest_xp\nFROM users\nGROUP BY role\nORDER BY total_users DESC;`
  },
  {
    name: '4. INSERT New Record',
    sql: `-- Menambahkan siswa baru ke tabel users\nINSERT INTO users (id, name, email, role, xp, created_at)\nVALUES (6, 'Rian Pratama', 'rian@codera.app', 'student', 500, '2026-03-01');\n\n-- Lihat hasil tabel setelah penambahan\nSELECT * FROM users;`
  }
];

export const SqlInteractiveStudio: React.FC = () => {
  const [dbState, setDbState] = useState<Record<string, SeedTable>>(JSON.parse(JSON.stringify(INITIAL_DATABASE_SCHEMA)));
  const [sqlQuery, setSqlQuery] = useState(SQL_PRESETS[0].sql);
  const [activeTable, setActiveTable] = useState<string>('users');
  const [queryResults, setQueryResults] = useState<{ columns: string[]; rows: any[] } | null>(null);
  const [queryError, setQueryError] = useState<string | null>(null);
  const [execTime, setExecTime] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  // In-browser SQL simulation engine
  const executeSql = () => {
    const startTime = performance.now();
    setQueryError(null);
    setQueryResults(null);

    try {
      const cleanSql = sqlQuery.trim();
      const upper = cleanSql.toUpperCase();

      // Check for JOIN query simulation
      if (upper.includes('JOIN') && upper.includes('ENROLLMENTS')) {
        const joinedRows = dbState.enrollments.rows.map(e => {
          const user = dbState.users.rows.find(u => u.id === e.user_id) || {};
          const course = dbState.courses.rows.find(c => c.id === e.course_id) || {};
          return {
            student_name: user.name || 'Unknown',
            course_title: course.title || 'Unknown',
            category: course.category || '-',
            completion_rate: `${e.progress}%`,
            status: e.status
          };
        });

        // Filter / sort if specified
        joinedRows.sort((a, b) => parseInt(b.completion_rate) - parseInt(a.completion_rate));

        setQueryResults({
          columns: ['student_name', 'course_title', 'category', 'completion_rate', 'status'],
          rows: joinedRows
        });
      }
      // Check for GROUP BY simulation
      else if (upper.includes('GROUP BY') && upper.includes('ROLE')) {
        const groups: Record<string, { count: number; totalXp: number; highestXp: number }> = {};
        dbState.users.rows.forEach(u => {
          if (!groups[u.role]) {
            groups[u.role] = { count: 0, totalXp: 0, highestXp: 0 };
          }
          groups[u.role].count += 1;
          groups[u.role].totalXp += u.xp;
          if (u.xp > groups[u.role].highestXp) {
            groups[u.role].highestXp = u.xp;
          }
        });

        const rows = Object.entries(groups).map(([role, stats]) => ({
          role,
          total_users: stats.count,
          average_xp: Math.round(stats.totalXp / stats.count),
          highest_xp: stats.highestXp
        }));

        setQueryResults({
          columns: ['role', 'total_users', 'average_xp', 'highest_xp'],
          rows
        });
      }
      // Check for INSERT INTO users simulation
      else if (upper.includes('INSERT INTO USERS')) {
        const newId = dbState.users.rows.length + 1;
        const newUser = {
          id: newId,
          name: 'Rian Pratama',
          email: 'rian@codera.app',
          role: 'student',
          xp: 500,
          created_at: '2026-03-01'
        };

        const updatedUsers = [...dbState.users.rows.filter(u => u.id !== newId), newUser];
        setDbState(prev => ({
          ...prev,
          users: { ...prev.users, rows: updatedUsers }
        }));

        setQueryResults({
          columns: ['id', 'name', 'email', 'role', 'xp', 'created_at'],
          rows: updatedUsers
        });
      }
      // Generic SELECT from table simulation
      else {
        // Find target table
        let targetTableName = 'users';
        if (upper.includes('FROM COURSES')) targetTableName = 'courses';
        else if (upper.includes('FROM ENROLLMENTS')) targetTableName = 'enrollments';

        let rows = [...dbState[targetTableName].rows];

        // Simulated WHERE
        if (upper.includes("WHERE ROLE = 'STUDENT'") || upper.includes('XP >= 1000')) {
          rows = rows.filter(r => (!r.role || r.role === 'student') && (!r.xp || r.xp >= 1000));
        }

        // Simulated ORDER BY
        if (upper.includes('ORDER BY XP DESC') || upper.includes('ORDER BY PRICE DESC')) {
          rows.sort((a, b) => (b.xp || b.price || 0) - (a.xp || a.price || 0));
        }

        const columns = dbState[targetTableName].columns.map(c => c.name);
        setQueryResults({ columns, rows });
      }

      setExecTime(Math.round(performance.now() - startTime + 8));
    } catch (err: any) {
      setQueryError(`SQL Error: ${err.message || 'Syntax error dalam pernyataan SQL'}`);
    }
  };

  const handleResetDb = () => {
    setDbState(JSON.parse(JSON.stringify(INITIAL_DATABASE_SCHEMA)));
    setQueryResults(null);
    setQueryError(null);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlQuery);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col bg-[#070b14] text-slate-200 overflow-hidden font-sans">
      
      {/* 1. TOP HEADER & PRESETS */}
      <div className="border-b border-slate-800/80 bg-slate-950/90 p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-600/20 border border-emerald-500/30 text-emerald-400">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
              <span>SQL Interactive Studio</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-normal">Relational Engine</span>
            </h2>
            <p className="text-[10px] text-slate-400">Eksplorasi tabel, jalankan query SELECT/JOIN/GROUP BY, dan lihat output tabular instan</p>
          </div>
        </div>

        {/* Quick query presets */}
        <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
          <span className="text-[11px] text-slate-400 font-medium">Preset SQL:</span>
          {SQL_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSqlQuery(preset.sql);
                setQueryResults(null);
              }}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors cursor-pointer whitespace-nowrap"
            >
              {preset.name}
            </button>
          ))}
          <button
            onClick={handleResetDb}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer"
            title="Reset Database ke data awal"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. MAIN WORKSPACE: SIDEBAR SCHEMA (LEFT), EDITOR & RESULT (RIGHT) */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
        
        {/* LEFT: DATABASE SCHEMA INSPECTOR (280px) */}
        <div className="w-full lg:w-72 bg-[#090d18] flex flex-col overflow-hidden">
          <div className="px-3 py-2 bg-slate-900/80 border-b border-slate-800 text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <TableIcon className="w-3.5 h-3.5 text-emerald-400" />
              Skema Relasi Database
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">3 Tabel</span>
          </div>

          {/* Table List & Schema Columns */}
          <div className="flex-1 p-3 overflow-y-auto custom-scrollbar space-y-3">
            {Object.values(dbState).map((tbl) => (
              <div 
                key={tbl.name}
                className={`rounded-xl border p-2.5 transition-all cursor-pointer ${
                  activeTable === tbl.name ? 'bg-slate-900/90 border-emerald-500/50 shadow-sm' : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                }`}
                onClick={() => setActiveTable(tbl.name)}
              >
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/80 mb-2">
                  <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-emerald-300">
                    <TableIcon className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{tbl.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">{tbl.rows.length} rows</span>
                </div>

                <div className="space-y-1 text-[11px] font-mono">
                  {tbl.columns.map((col) => (
                    <div key={col.name} className="flex items-center justify-between text-slate-400">
                      <div className="flex items-center gap-1">
                        {col.isPk && <span title="Primary Key"><Key className="w-3 h-3 text-amber-400" /></span>}
                        {col.isFk && <span title={`Foreign Key -> ${col.ref}`}><Layers className="w-3 h-3 text-sky-400" /></span>}
                        <span className={col.isPk ? 'text-amber-300 font-bold' : col.isFk ? 'text-sky-300' : 'text-slate-300'}>
                          {col.name}
                        </span>
                      </div>
                      <span className="text-slate-600 text-[10px]">{col.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: SQL EDITOR & QUERY RESULT TABLE */}
        <div className="flex-1 flex flex-col min-h-0 bg-[#060a12] overflow-hidden">
          
          {/* SQL Editor Top Action Bar */}
          <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs">
            <span className="font-mono text-slate-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              SQL Query Editor
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopySql}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Salin SQL"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={executeSql}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-lg text-xs font-bold shadow-md shadow-emerald-600/25 transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Jalankan Query</span>
              </button>
            </div>
          </div>

          {/* SQL Textarea */}
          <div className="h-44 bg-[#0a0e1a] border-b border-slate-800 p-3">
            <textarea
              value={sqlQuery}
              onChange={(e) => setSqlQuery(e.target.value)}
              placeholder="SELECT * FROM users WHERE..."
              className="w-full h-full bg-transparent border-0 outline-none text-emerald-300 font-mono text-xs leading-relaxed resize-none custom-scrollbar"
              spellCheck={false}
            />
          </div>

          {/* Results Header */}
          <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-slate-300">Hasil Eksekusi Query</span>
              {queryResults && (
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[11px] font-mono font-bold">
                  {queryResults.rows.length} Baris Data Dikembalikan
                </span>
              )}
              {execTime !== null && (
                <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" /> {execTime}ms
                </span>
              )}
            </div>
          </div>

          {/* Tabular Output Display */}
          <div className="flex-1 overflow-auto custom-scrollbar p-3 bg-[#050811]">
            {queryError ? (
              <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/50 text-rose-300 space-y-1 font-mono text-xs">
                <div className="font-bold flex items-center gap-1.5 text-rose-400">
                  <AlertCircle className="w-4 h-4" />
                  <span>Kesalahan Eksekusi SQL</span>
                </div>
                <p>{queryError}</p>
              </div>
            ) : queryResults ? (
              <div className="border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-left font-mono text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-900/90 text-emerald-400 border-b border-slate-800">
                      {queryResults.columns.map((col) => (
                        <th key={col} className="p-2.5 font-bold uppercase tracking-wider text-[11px]">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {queryResults.rows.length === 0 ? (
                      <tr>
                        <td colSpan={queryResults.columns.length} className="p-4 text-center text-slate-500 italic">
                          Query berhasil dieksekusi namun tidak menghasilkan data (0 baris).
                        </td>
                      </tr>
                    ) : (
                      queryResults.rows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                          {queryResults.columns.map((col) => (
                            <td key={col} className="p-2.5">
                              {row[col] !== undefined ? String(row[col]) : <span className="text-slate-600">NULL</span>}
                            </td>
                          ))}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-2 py-12">
                <Database className="w-8 h-8 stroke-[1.5] text-slate-700" />
                <p className="text-xs font-sans text-center max-w-sm">
                  Klik tombol <strong className="text-emerald-400 font-semibold">"Jalankan Query"</strong> untuk mengeksekusi perintah SQL di atas dan melihat hasil data tabel.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
