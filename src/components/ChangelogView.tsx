import React from 'react';
import { Sparkles, GitCommit, ShieldCheck, Cpu, Code2, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Section } from './AppLayout';

interface ChangelogViewProps {
  onNavigate: (section: Section) => void;
}

export function ChangelogView({ onNavigate }: ChangelogViewProps) {
  const releases = [
    {
      version: 'v2.5.0',
      date: 'September 19, 2026',
      title: 'WordPress-Style Admin CMS & Isolated Media Editor',
      tag: 'Major Release',
      description: 'Pembaruan arsitektur besar yang menghadirkan isolasi panel administrasi mandiri dan pemisahan kontrol media.',
      highlights: [
        'URL Admin Terpisah (`/admin`): Mengadopsi pola WordPress dengan dasbor manajemen eksklusif terisolasi dari antarmuka siswa.',
        'Editor Foto & Media Hero CMS: Pemindahan kustomisasi gambar dan hero beranda ke panel admin untuk keamanan dan kontrol terpusat.',
        'Penyempurnaan Vercel Routing: Penambahan `vercel.json` rewrites untuk mencegah error 404 pada rute dinamis saat refresh.',
        'Manajemen Tantangan & Kurikulum: Peningkatan performa Challenge Builder dan live test runner langsung di CMS.'
      ]
    },
    {
      version: 'v2.4.0',
      date: 'September 15, 2026',
      title: 'Live Code Execution & Security Audit Labs',
      tag: 'Feature',
      description: 'Penambahan mesin eksekusi kode interaktif di dalam browser dan modul laboratorium keamanan siber.',
      highlights: [
        'Python & HTML/CSS Test Runner: Evaluasi otomatis test check secara real-time untuk latihan pemrograman.',
        'Security Labs & Audit Readiness Gate: Simulasi perbaikan kerentanan OWASP Top 10.',
        'Leaderboard & XP Ranking: Sistem gamifikasi tingkat lanjut dengan lencana keahlian pengembang.'
      ]
    },
    {
      version: 'v2.2.0',
      date: 'September 10, 2026',
      title: 'Cloud Persistence & Firestore Sync',
      tag: 'Infrastructure',
      description: 'Integrasi penuh penyimpanan data awan untuk kemajuan belajar lintas perangkat.',
      highlights: [
        'Sinkronisasi Real-time: Penyimpanan progress belajar, XP, dan riwayat tantangan siswa menggunakan Firebase Firestore.',
        'Autentikasi Aman: Mendukung Google Sign-In, Email/Password, dan mode tamu instan.'
      ]
    },
    {
      version: 'v2.0.0',
      date: 'September 1, 2026',
      title: 'COMMANDEV Core Platform',
      tag: 'Initial Release',
      description: 'Peluncuran perdana platform pembelajaran interaktif modern berbasis web.',
      highlights: [
        'Antarmuka Dark/Light Mode dengan tema kustom (Dracula, Monokai, GitHub Dark, dll.).',
        'Kurikulum terstruktur dari Beginner hingga Advanced Fullstack Engineering.'
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Platform Release Notes</span>
          </div>
          <h1 className="text-3xl font-black text-white">Changelog COMMANDEV</h1>
          <p className="text-xs text-slate-400">Riwayat pembaruan sistem, fitur baru, dan peningkatan performa.</p>
        </div>

        <button
          onClick={() => onNavigate('academy')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-bold transition-all cursor-pointer self-start md:self-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>
      </div>

      {/* Timeline */}
      <div className="space-y-8 relative before:absolute before:inset-0 before:left-5 before:w-[2px] before:bg-slate-800">
        {releases.map((rel, idx) => (
          <div key={idx} className="relative pl-12 space-y-4">
            {/* Timeline dot */}
            <div className="absolute left-3 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-900 border-2 border-amber-500 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
            </div>

            <div className="p-6 md:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-black font-mono">
                    {rel.version}
                  </span>
                  <span className="text-xs text-slate-400">{rel.date}</span>
                </div>
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                  rel.tag === 'Major Release' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' :
                  rel.tag === 'Feature' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                  'bg-slate-800 text-slate-300'
                }`}>
                  {rel.tag}
                </span>
              </div>

              <div className="space-y-1">
                <h2 className="text-lg font-bold text-white">{rel.title}</h2>
                <p className="text-xs text-slate-400 leading-relaxed">{rel.description}</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="text-[11px] uppercase font-bold tracking-wider text-slate-500">Poin Pembaruan:</div>
                <ul className="space-y-2">
                  {rel.highlights.map((item, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
