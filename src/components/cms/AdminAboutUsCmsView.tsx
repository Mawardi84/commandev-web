import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Upload, 
  Loader2, 
  AlertCircle, 
  CheckCircle,
  Linkedin,
  Github,
  Mail,
  Instagram,
  Facebook,
  ShieldCheck,
  Save,
  Globe
} from 'lucide-react';
import { cmsDataService } from '../../services/curriculum/cmsDataService';
import { AboutUsContent } from '../../services/curriculum/types';

export function AdminAboutUsCmsView() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [shortBio, setShortBio] = useState('');
  const [description, setDescription] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');

  // Social Links
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        const data = await cmsDataService.getAboutUsAdmin();
        setName(data.name || '');
        setRole(data.role || '');
        setShortBio(data.shortBio || '');
        setDescription(data.description || '');
        setPhotoUrl(data.photoUrl || '');
        setStatus((data.status as any) || 'draft');

        const social = data.socialLinks || {};
        setLinkedin(social.linkedin || '');
        setGithub(social.github || '');
        setTiktok(social.tiktok || '');
        setEmail(social.email || '');
        setInstagram(social.instagram || '');
        setFacebook(social.facebook || '');
      } catch (err: any) {
        setError(err.message || 'Gagal memuat profil About Us');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 1. Validation size (max 1 MB)
      if (file.size > 1024 * 1024) {
        showNotify('error', 'Ukuran foto melebihi batas maksimum 1MB.');
        return;
      }
      // 2. Validation type
      if (!file.type.startsWith('image/')) {
        showNotify('error', 'Tipe file tidak didukung. Harap pilih gambar.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
        showNotify('success', 'Foto profil berhasil dimuat!');
      };
      reader.onerror = () => {
        showNotify('error', 'Gagal membaca foto.');
      };
      reader.readAsDataURL(file);
    }
  };

  const showNotify = (type: 'success' | 'error', text: string) => {
    setNotification({ type, text });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSave = async (publish: boolean) => {
    if (!name.trim()) {
      showNotify('error', 'Nama tidak boleh kosong.');
      return;
    }
    if (!role.trim()) {
      showNotify('error', 'Role/title tidak boleh kosong.');
      return;
    }

    try {
      setSaving(true);
      const targetStatus = publish ? 'published' : 'draft';

      const contentPayload: AboutUsContent = {
        name: name.trim(),
        role: role.trim(),
        shortBio: shortBio.trim(),
        description: description.trim(),
        photoUrl,
        status: targetStatus,
        socialLinks: {
          linkedin: linkedin.trim(),
          github: github.trim(),
          tiktok: tiktok.trim(),
          email: email.trim(),
          instagram: instagram.trim(),
          facebook: facebook.trim()
        }
      };

      await cmsDataService.updateAboutUs(contentPayload);
      setStatus(targetStatus);
      showNotify('success', publish ? 'Profil About Us berhasil dipublikasikan secara live!' : 'Draft profil About Us berhasil disimpan!');
    } catch (err: any) {
      showNotify('error', err.message || 'Gagal menyimpan profil About Us.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-slate-400 font-mono space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
        <p className="text-xs">Memuat Editor Profil About Us...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl text-center space-y-4 max-w-xl mx-auto">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-lg font-bold text-white">Gagal Membuka Editor</h2>
        <p className="text-xs text-slate-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Globe className="w-6 h-6 text-amber-500" />
            <span>Manajemen Profil Publik & About Us</span>
          </h1>
          <p className="text-xs text-slate-400">Atur biografi tim pendidik, foto profil, dan pranala sosial yang ditampilkan pada situs publik.</p>
        </div>

        <div className="flex items-center gap-2.5">
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
            status === 'published' 
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
              : 'bg-slate-800 text-slate-400 border-slate-700'
          }`}>
            {status === 'published' ? 'PUBLISHED' : 'DRAFT'}
          </span>
        </div>
      </div>

      {notification && (
        <div className={`p-4 rounded-xl text-xs font-bold flex items-center gap-2.5 border animate-pulse ${
          notification.type === 'success' 
            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' 
            : 'bg-rose-500/10 border-rose-500/20 text-rose-300'
        }`}>
          {notification.type === 'success' ? <CheckCircle className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
          <span>{notification.text}</span>
        </div>
      )}

      {/* Editor Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Photo & Media Preview */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl h-fit">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Foto Profil Publik</h2>
          
          <div className="flex flex-col items-center space-y-4">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-slate-700 bg-slate-950 flex items-center justify-center relative">
              {photoUrl ? (
                <img 
                  src={photoUrl} 
                  alt="Profile Preview" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-slate-600 text-center p-2 text-[10px] font-bold uppercase">
                  No Image Configured
                </div>
              )}
            </div>

            <div className="w-full space-y-2">
              <label className="text-[10px] font-bold text-slate-400 block uppercase">URL Foto Langsung (Direct URL)</label>
              <input 
                type="text" 
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="https://contoh.com/avatar.jpg atau data:image/..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="w-full">
              <label className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all border border-slate-700">
                <Upload className="w-4 h-4" />
                <span>Unggah dari Komputer</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
              <p className="text-[10px] text-slate-500 text-center mt-1.5 leading-relaxed">
                Tipe: PNG/JPG/WebP (Maks 1MB). Foto akan di-encode ke aman Base64.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Metadata & Social Links */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Metadata Block */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-5 shadow-xl">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider pb-3 border-b border-slate-800">Metadata Profil</h2>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Nama Lengkap / Tim <span className="text-rose-500">*</span></label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. COMMANDEV Academy Team"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Jabatan / Role <span className="text-rose-500">*</span></label>
                <input 
                  type="text" 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Software Architect & Chief Educator"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Biografi Singkat (Short Bio)</label>
              <input 
                type="text" 
                value={shortBio}
                onChange={(e) => setShortBio(e.target.value)}
                placeholder="Deskripsi ringkas yang diletakkan di bawah nama."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Biografi Lengkap / Misi Pembelajaran</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Uraikan visi misi tim, pendekatan edukasi arsitektur, dan nilai tambah kurikulum..."
                rows={6}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500 resize-none font-sans"
              />
            </div>
          </div>

          {/* Social Links Block */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-5 shadow-xl">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider pb-3 border-b border-slate-800">Pranala Sosial & Kontak (Social Links)</h2>
            <p className="text-[11px] text-slate-400">Pranala luar akan divalidasi dan dinormalisasi secara otomatis ke skema aman HTTPS.</p>

            <div className="grid sm:grid-cols-2 gap-4">
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
                  <Linkedin className="w-3.5 h-3.5 text-[#0077b5]" />
                  <span>LinkedIn URL</span>
                </label>
                <input 
                  type="text" 
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="linkedin.com/company/commandev"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
                  <Github className="w-3.5 h-3.5 text-slate-400" />
                  <span>GitHub URL</span>
                </label>
                <input 
                  type="text" 
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  placeholder="github.com/commandev"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
                  <span className="text-xs">🎵</span>
                  <span>TikTok URL</span>
                </label>
                <input 
                  type="text" 
                  value={tiktok}
                  onChange={(e) => setTiktok(e.target.value)}
                  placeholder="tiktok.com/@commandev"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Email Kontak</span>
                </label>
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@commandev.com atau mailto:..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
                  <Instagram className="w-3.5 h-3.5 text-[#e1306c]" />
                  <span>Instagram URL</span>
                </label>
                <input 
                  type="text" 
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="instagram.com/commandev"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
                  <Facebook className="w-3.5 h-3.5 text-[#1877f2]" />
                  <span>Facebook URL</span>
                </label>
                <input 
                  type="text" 
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  placeholder="facebook.com/commandev"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

            </div>
          </div>

          {/* Form Actions Footer */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 border border-slate-700 cursor-pointer disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Simpan Draft</span>
            </button>

            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="px-8 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-600/20 disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>Publikasikan Live</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
