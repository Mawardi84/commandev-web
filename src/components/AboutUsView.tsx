import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Terminal, 
  Loader2, 
  ArrowLeft,
  Share2,
  Linkedin,
  Github,
  Instagram,
  Facebook,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { cmsDataService } from '../services/curriculum/cmsDataService';
import { AboutUsContent } from '../services/curriculum/types';

interface AboutUsViewProps {
  onBack: () => void;
}

export function AboutUsView({ onBack }: AboutUsViewProps) {
  const [data, setData] = useState<AboutUsContent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const profile = await cmsDataService.getAboutUsPublic();
        setData(profile);
      } catch (err: unknown) {
        setError('Gagal memuat profil. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070913] flex flex-col items-center justify-center text-blue-500 font-sans">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-blue-500" />
        <p className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">Menginisialisasi Profil...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#070913] flex flex-col items-center justify-center text-slate-100 font-sans px-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-6">
          <h2 className="text-xl font-black text-white tracking-tight">Gagal Memuat</h2>
          <p className="text-sm text-slate-400">{error}</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => window.location.reload()} className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer">Coba Lagi</button>
            <button onClick={onBack} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer">Kembali</button>
          </div>
        </div>
      </div>
    );
  }

  const social = data.socialLinks || {};

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 font-sans pb-20 selection:bg-blue-500/20">
      {/* Banner */}
      <div className="h-56 bg-gradient-to-tr from-blue-900/80 via-indigo-900/80 to-purple-900/80 relative">
        <button onClick={onBack} className="absolute top-6 left-6 text-white/70 hover:text-white bg-black/20 p-2.5 rounded-full backdrop-blur-md transition-all hover:scale-105">
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        {/* Avatar & Info */}
        <div className="relative -mt-20 mb-10">
          <div className="w-36 h-36 rounded-full border-4 border-[#070913] bg-slate-950 flex items-center justify-center overflow-hidden shadow-2xl ring-4 ring-blue-500/10">
             {data.photoUrl ? <img src={data.photoUrl} alt={data.name} className="w-full h-full object-cover" /> : <Terminal className="w-16 h-16 text-blue-500" />}
          </div>
          <div className="mt-6">
            <h1 className="text-4xl font-black text-white tracking-tight">{data.name}</h1>
            <p className="text-blue-400 font-bold uppercase tracking-[0.2em] text-xs mt-2">{data.role}</p>
            <p className="text-slate-400 text-base mt-4 italic max-w-2xl font-light leading-relaxed">&ldquo;{data.shortBio}&rdquo;</p>
          </div>
        </div>

        {/* Content sections */}
        <div className="space-y-12">
          <section className="bg-slate-900/30 border border-slate-800/50 rounded-3xl p-8 backdrop-blur-sm">
            <h3 className="text-xs font-black text-blue-500 tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
              <BookOpen className="w-4 h-4" /> Tentang Kami
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-light">{data.description}</p>
          </section>

          <section className="grid md:grid-cols-3 gap-6">
            {[
              { title: "24 Course", desc: "Fondasi kurikulum terpadu." },
              { title: "Project-Based", desc: "Membangun real software." },
              { title: "Interactive", desc: "Lab & simulasi nyata." }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl space-y-3">
                <h4 className="text-lg font-black text-white">{item.title}</h4>
                <p className="text-xs text-slate-400">{item.desc}</p>
              </div>
            ))}
          </section>

          <section className="space-y-6">
            <h3 className="text-xs font-black text-emerald-500 tracking-[0.2em] uppercase flex items-center gap-3">
              <Share2 className="w-4 h-4" /> Kontak Resmi
            </h3>
            <div className="flex flex-wrap gap-3">
              {social.linkedin && <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="px-5 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-xs font-bold text-white hover:bg-blue-600 transition-colors flex items-center gap-2"><Linkedin className="w-3.5 h-3.5" /> LinkedIn</a>}
              {social.github && <a href={social.github} target="_blank" rel="noopener noreferrer" className="px-5 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-xs font-bold text-white hover:bg-slate-700 transition-colors flex items-center gap-2"><Github className="w-3.5 h-3.5" /> GitHub</a>}
              {social.instagram && <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="px-5 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-xs font-bold text-white hover:bg-pink-600 transition-colors flex items-center gap-2"><Instagram className="w-3.5 h-3.5" /> Instagram</a>}
              {social.facebook && <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="px-5 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-xs font-bold text-white hover:bg-blue-700 transition-colors flex items-center gap-2"><Facebook className="w-3.5 h-3.5" /> Facebook</a>}
              {social.tiktok && <a href={social.tiktok} target="_blank" rel="noopener noreferrer" className="px-5 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-xs font-bold text-white hover:bg-slate-700 transition-colors flex items-center gap-2"><span>🎵</span> TikTok</a>}
              {social.email && <a href={`mailto:${social.email}`} className="px-5 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-xs font-bold text-white hover:bg-emerald-600 transition-colors flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> Email</a>}
            </div>
          </section>
        </div>
      </div>
    </div>
  );

}


