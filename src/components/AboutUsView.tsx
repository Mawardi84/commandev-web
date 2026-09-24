import React, { useState, useEffect } from 'react';
import { 
  Linkedin, 
  Github, 
  Mail, 
  Instagram, 
  Facebook, 
  Terminal, 
  Loader2, 
  AlertCircle,
  ArrowLeft,
  Sparkles,
  Award
} from 'lucide-react';
import { motion } from 'motion/react';
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
      } catch (err: any) {
        setError(err.message || 'Gagal memuat profil About Us');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-indigo-500 font-sans">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-indigo-500" />
        <p className="text-xs font-bold tracking-wider text-slate-400 uppercase">Memuat Profil About Us...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-100 font-sans px-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
          <h2 className="text-lg font-bold text-white">Gagal Memuat Profil</h2>
          <p className="text-xs text-slate-400">{error || 'Data profil kosong.'}</p>
          <button 
            onClick={onBack}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Akademi</span>
          </button>
        </div>
      </div>
    );
  }

  const social = data.socialLinks || {};

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 font-sans selection:bg-blue-500/30 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background radial effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] aspect-square rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] aspect-square rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        
        {/* Navigation Toolbar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <button
            onClick={onBack}
            className="group px-4 py-2 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Kembali ke halaman sebelumnya"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Kembali</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 tracking-widest uppercase">
              Profile
            </span>
          </div>
        </div>

        {/* Main Card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md space-y-8"
        >
          
          <div className="flex flex-col items-center text-center space-y-6">
            
            {/* Profile Photo Container */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded-full blur-md opacity-30 animate-pulse" />
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-slate-800 overflow-hidden relative bg-slate-950 flex items-center justify-center">
                {data.photoUrl ? (
                  <img 
                    src={data.photoUrl} 
                    alt={`Foto profil dari ${data.name}`} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="text-center p-3">
                    <span className="text-slate-500 text-xs font-bold leading-tight block">Profile image unavailable</span>
                  </div>
                )}
              </div>
            </div>

            {/* Header info */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">{data.name}</h1>
              <div className="text-xs sm:text-sm font-bold text-indigo-400 tracking-wide uppercase flex items-center justify-center gap-1.5">
                <Award className="w-4 h-4 text-indigo-400" />
                <span>{data.role}</span>
              </div>
            </div>

            {/* Short bio */}
            {data.shortBio && (
              <p className="max-w-2xl text-slate-300 text-sm sm:text-base leading-relaxed italic font-medium">
                &ldquo;{data.shortBio}&rdquo;
              </p>
            )}

          </div>

          {/* Biography and Description */}
          {data.description && (
            <div className="space-y-4 pt-6 border-t border-slate-800/80">
              <div className="flex items-center gap-2 text-white font-bold text-sm tracking-wider uppercase">
                <Terminal className="w-4 h-4 text-indigo-400" />
                <span>Tentang Kami & Misi</span>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                {data.description}
              </p>
            </div>
          )}

          {/* Social and Contact Links */}
          <div className="space-y-4 pt-6 border-t border-slate-800/80">
            <h2 className="text-white font-bold text-xs tracking-wider uppercase">Hubungi & Hubungkan</h2>
            
            <div className="flex flex-wrap gap-3">
              {social.linkedin && (
                <a 
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-[#0077b5]/10 hover:bg-[#0077b5]/20 text-[#0077b5] border border-[#0077b5]/30 hover:border-[#0077b5]/50 rounded-xl text-xs font-bold flex items-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#0077b5]"
                  aria-label="Kunjungi COMMANDEV di LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              )}

              {social.github && (
                <a 
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 rounded-xl text-xs font-bold flex items-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-slate-400"
                  aria-label="Kunjungi COMMANDEV di GitHub"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              )}

              {social.tiktok && (
                <a 
                  href={social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-slate-800/80 hover:bg-slate-700/80 text-white border border-slate-700 rounded-xl text-xs font-bold flex items-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-slate-400"
                  aria-label="Kunjungi COMMANDEV di TikTok"
                >
                  <span className="text-xs">🎵</span>
                  <span>TikTok</span>
                </a>
              )}

              {social.instagram && (
                <a 
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-[#e1306c]/10 hover:bg-[#e1306c]/20 text-[#e1306c] border border-[#e1306c]/30 hover:border-[#e1306c]/50 rounded-xl text-xs font-bold flex items-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#e1306c]"
                  aria-label="Kunjungi COMMANDEV di Instagram"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
              )}

              {social.facebook && (
                <a 
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-[#1877f2]/10 hover:bg-[#1877f2]/20 text-[#1877f2] border border-[#1877f2]/30 hover:border-[#1877f2]/50 rounded-xl text-xs font-bold flex items-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#1877f2]"
                  aria-label="Kunjungi COMMANDEV di Facebook"
                >
                  <Facebook className="w-4 h-4" />
                  <span>Facebook</span>
                </a>
              )}

              {social.email && (
                <a 
                  href={social.email.startsWith('mailto:') ? social.email : `mailto:${social.email}`}
                  className="px-4 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:border-emerald-500/50 rounded-xl text-xs font-bold flex items-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  aria-label="Kirim email ke COMMANDEV"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </a>
              )}
            </div>
          </div>

        </motion.div>

        {/* Branding Footer */}
        <div className="text-center pt-4">
          <p className="text-xs text-slate-500 font-medium">
            COMMANDEV — Platform Belajar Arsitektur Perangkat Lunak Skala Produksi
          </p>
        </div>

      </div>
    </div>
  );
}
