import React, { useState } from 'react';
import { 
  ArrowRight, 
  Code2, 
  PlayCircle, 
  Terminal, 
  CheckCircle2, 
  User,
  ShieldCheck,
  X,
  BookOpen,
  Briefcase,
  Users,
  Award,
  FolderGit2,
  ChevronDown,
  Menu,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { useSettings } from '../lib/SettingsContext';
import { COURSES } from '../data/curriculum';
import { CODERA_PROJECTS } from '../data/projectsData';
import defaultHeroImage from '../assets/images/hero_background_1790058825568.jpg';

interface CodingAcademyLandingProps {
  onStartLearning: () => void;
  onOpenAuth?: () => void;
  onViewAboutUs?: () => void;
}

export const CodingAcademyLanding: React.FC<CodingAcademyLandingProps> = ({ onStartLearning, onOpenAuth, onViewAboutUs }) => {
  const { signInWithGoogle } = useAuth();
  const { settings } = useSettings();
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [lang, setLang] = useState<'id' | 'en'>('id');
  const [imageError, setImageError] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Resilient hero image: uses custom settings if valid, otherwise falls back to bundled asset
  const activeHeroImage = (!imageError && settings.heroImageUrl && settings.heroImageUrl !== '/images/codera-hero.jpg')
    ? settings.heroImageUrl
    : defaultHeroImage;

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowVideoModal(false);
      }
    };
    if (showVideoModal) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showVideoModal]);
  
  const handleStart = async () => {
    if (onOpenAuth) {
      onOpenAuth();
    } else {
      await signInWithGoogle();
    }
  };

  const t = {
    id: {
      signIn: "Masuk",
      startLearning: "Mulai Sekarang",
      homeNav: "Beranda",
      coursesNav: "Kurikulum",
      learningPathNav: "Program",
      projectsNav: "Projects",
      securityNav: "Security",
      faqNav: "FAQ",
      aboutUsNav: "Tentang Kami",
      eyebrow: "COMMANDEV — INTERACTIVE DEVELOPER LEARNING PLATFORM",
      heroTitle1: "Belajar Coding.",
      heroTitleHighlight: "Bangun Sesuatu yang Nyata.",
      heroDesc: "Platform belajar coding interaktif untuk memahami konsep, menulis kode, menghadapi challenge, dan membangun project nyata secara bertahap.",
      heroFeat1: "Kurikulum Terstruktur",
      heroFeat2: "Project Based Learning",
      heroFeat3: "Mentor Berpengalaman",
      heroFeat4: "Akses Lowongan Kerja",
      ctaFree: "Mulai Belajar",
      viewProjects: "Lihat Project",
      exploreCourses: "Jelajahi Materi",
      watchVideo: "Lihat Video Profil Kami",
      cursiveText: "Skill Hari Ini, Karier Esok.",
      slogan: "LEARN → CODE → PRACTICE → BUILD → MASTER",
      practical: "100% Berbasis Praktik & Proyek Nyata",
      videoModalTitle: "Video Profil COMMANDEV",
      videoModalHeading: "Selamat Datang di Masa Depan Pendidikan Koding",
      videoModalDesc: "Saksikan bagaimana pemula bertransformasi menjadi developer profesional bersama COMMANDEV.",
      videoModalBtn: "Mulai Belajar Sekarang",
      whyTitle: "Metodologi COMMANDEV",
      whyDesc: "Pendekatan belajar yang dirancang khusus untuk membangun fondasi koding yang kuat dan aplikatif.",
      card1Title: "Live Sandbox & Terminal",
      card1Desc: "Tanpa instalasi rumit. Tulis dan uji kode langsung di browser dengan runtime instan.",
      card2Title: "AI Tutor Interaktif",
      card2Desc: "Bingung dengan error atau konsep sulit? AI Tutor membimbing baris per baris kode Anda.",
      card3Title: "Cloud Progres",
      card3Desc: "Jaga streak harian dan bangun portofolio proyek yang tersimpan aman di cloud.",
      roadmapTitle: "Jalur Belajar Profesional",
      roadmapDesc: "Kurikulum bertahap dari pemula hingga mahir oleh praktisi industri.",
      exploreCourse: "Pelajari Materi",
      loopTitle: "Siklus Belajar",
      loopDesc: "Dari konsep dasar hingga penguasaan penuh melalui metodologi teruji.",
      step1Title: "Learn",
      step1Desc: "Pahami konsep inti dengan materi visual dan terstruktur.",
      step2Title: "Code",
      step2Desc: "Tulis langsung di browser tanpa instalasi tambahan.",
      step3Title: "Practice",
      step3Desc: "Asah kemampuan dengan latihan interaktif dan feedback instan.",
      step4Title: "Build",
      step4Desc: "Wujudkan proyek nyata untuk portofolio profesional Anda.",
      step5Title: "Master",
      step5Desc: "Evaluasi hasil, perbaiki pendekatan, dan bangun kemampuan yang dapat digunakan kembali.",
      projectsHeader: "PROYEK NYATA",
      projectsTitle: "Bangun apa yang Anda pelajari.",
      projectsDesc: "Proyek riil mengubah konsep abstrak menjadi kapabilitas praktis siap kerja.",
      projectsExplore: "Jelajahi Proyek",
      securityTitle: "Keamanan Bertanggung Jawab",
      securityDesc: "Pahami fundamental security dan secure coding dalam lingkungan lab aman.",
      securityPillar1Title: "Arsitektur Defensif",
      securityPillar1Desc: "Belajar memvalidasi input dan melakukan sanitasi data secara default untuk mencegah vulnerability.",
      securityPillar2Title: "Prinsip Least Privilege",
      securityPillar2Desc: "Terapkan batasan hak akses yang ketat untuk mengamankan data pengguna di cloud.",
      securityPillar3Title: "Lingkungan Sandbox Aman",
      securityPillar3Desc: "Uji coba kode Anda dalam lab playground mandiri yang terisolasi tanpa risiko keamanan.",
      ctaBannerTitle: "Siap Mulai Membangun?",
      ctaBannerDesc: "Belajar coding, tulis kode nyata, dan bangun project yang bisa Anda tunjukkan.",
      faqHeader: "PERTANYAAN UMUM",
      faqTitle: "Frequently Asked Questions",
      faqDesc: "Segala hal yang perlu Anda ketahui tentang metode belajar, kurikulum, dan ekosistem COMMANDEV.",
      faqItems: [
        {
          q: "Apa itu COMMANDEV?",
          a: "COMMANDEV adalah platform pembelajaran coding interaktif modern yang menggabungkan kurikulum berstandar industri, live browser sandbox tanpa instalasi rumit, asistensi AI mentor, dan pembangunan proyek nyata secara bertahap."
        },
        {
          q: "Apakah COMMANDEV cocok untuk pemula tanpa pengalaman koding?",
          a: "Sangat cocok. Kurikulum COMMANDEV dirancang dari tingkat paling dasar (Level 0) dengan panduan visual dan latihan terpandu, sehingga siapa pun dapat memahami konsep dan mulai menulis kode pertama mereka dengan percaya diri."
        },
        {
          q: "Bagaimana cara kerja interactive coding di COMMANDEV?",
          a: "Setiap materi menyandingkan teori langsung dengan editor kode aktif. Anda membaca penjelasan konsep, menuliskan kode solusi, dan langsung melihat pratinjau hasil serta feedback otomatis secara instan dalam satu layar."
        },
        {
          q: "Apakah ada project nyata yang dibangun selama belajar?",
          a: "Ya. Pendekatan COMMANDEV berbasis proyek riil. Setelah menguasai konsep dasar, Anda akan membangun portofolio proyek nyata—seperti website responsif, aplikasi interaktif, dashboard data, hingga lab keamanan siber terisolasi."
        },
        {
          q: "Apakah coding dilakukan langsung di browser tanpa instalasi?",
          a: "Benar. Seluruh aktivitas menulis kode, debugging, dan pengujian berjalan langsung di browser Anda menggunakan runtime terintegrasi tanpa perlu menginstal compiler atau konfigurasi lokal yang rumit."
        },
        {
          q: "Apakah COMMANDEV menyediakan sertifikat kelulusan?",
          a: "Saat ini sertifikat kelulusan belum menjadi bagian dari cakupan produk COMMANDEV. COMMANDEV berfokus 100% pada penguasaan keterampilan nyata, kemampuan menulis kode yang berfungsi, dan portofolio proyek nyata yang dapat dibuktikan secara langsung."
        }
      ],
      footerRights: "Hak cipta dilindungi."
    },
    en: {
      signIn: "Sign In",
      startLearning: "Start Now",
      homeNav: "Home",
      coursesNav: "Curriculum",
      learningPathNav: "Program",
      projectsNav: "Projects",
      securityNav: "Security",
      faqNav: "FAQ",
      aboutUsNav: "About Us",
      eyebrow: "COMMANDEV — INTERACTIVE DEVELOPER LEARNING PLATFORM",
      heroTitle1: "Learn to Code.",
      heroTitleHighlight: "Build Something Real.",
      heroDesc: "Interactive coding platform to understand concepts, write live code, complete challenges, and build real-world projects step by step.",
      heroFeat1: "Structured Curriculum",
      heroFeat2: "Project-Based Learning",
      heroFeat3: "Experienced Mentors",
      heroFeat4: "Career Opportunities",
      ctaFree: "Start Learning",
      viewProjects: "View Projects",
      exploreCourses: "Explore Courses",
      watchVideo: "Watch Our Profile Video",
      cursiveText: "Skills Today, Careers Tomorrow.",
      slogan: "LEARN → CODE → PRACTICE → BUILD → MASTER",
      practical: "100% Practical & Project-Based",
      videoModalTitle: "COMMANDEV Profile Video",
      videoModalHeading: "Welcome to the Future of Coding Education",
      videoModalDesc: "Watch how beginners successfully transform into professional developers with COMMANDEV.",
      videoModalBtn: "Start Learning Now",
      whyTitle: "COMMANDEV Methodology",
      whyDesc: "Learning approaches specifically designed to build a strong and applicable coding foundation.",
      card1Title: "Live Sandbox & Terminal",
      card1Desc: "No complex setup required. Write and test code right in your browser with instant runtime.",
      card2Title: "Interactive AI Tutor",
      card2Desc: "Stuck on errors or tough concepts? Our AI Tutor guides your code line by line.",
      card3Title: "Cloud Progress",
      card3Desc: "Maintain daily streaks and build project portfolios safely stored in the cloud.",
      roadmapTitle: "Professional Learning Paths",
      roadmapDesc: "Step-by-step curriculum from beginner to advanced by industry experts.",
      exploreCourse: "Explore Course",
      loopTitle: "The Learning Loop",
      loopDesc: "From core concepts to ultimate mastery through a proven progressive framework.",
      step1Title: "Learn",
      step1Desc: "Grasp core concepts with visual, digestible curriculum guides.",
      step2Title: "Code",
      step2Desc: "Write live code directly in your browser without local setup.",
      step3Title: "Practice",
      step3Desc: "Sharpen skills with interactive drills and instant feedback.",
      step4Title: "Build",
      step4Desc: "Create real-world portfolio projects that showcase capability.",
      step5Title: "Master",
      step5Desc: "Evaluate, refine, and turn practice into reusable real-world capability.",
      projectsHeader: "REAL PROJECTS",
      projectsTitle: "Build what you learn.",
      projectsDesc: "Real-world projects turn abstract concepts into practical, job-ready capability.",
      projectsExplore: "Explore Projects",
      securityTitle: "Responsible Security",
      securityDesc: "Understand defensive security and secure coding in safe authorized labs.",
      securityPillar1Title: "Defensive Architecture",
      securityPillar1Desc: "Learn to validate inputs and sanitize data by default to preemptively eliminate vulnerabilities.",
      securityPillar2Title: "Least Privilege Principle",
      securityPillar2Desc: "Enforce strict authorization limits and scope boundaries to keep cloud datasets completely secure.",
      securityPillar3Title: "Safe Sandbox Environments",
      securityPillar3Desc: "Hone your coding skills in isolated, safe playground labs without external risk.",
      ctaBannerTitle: "Ready to start building?",
      ctaBannerDesc: "Learn coding, write real code, and build projects you can showcase.",
      faqHeader: "FREQUENTLY ASKED QUESTIONS",
      faqTitle: "Got Questions? We Have Answers.",
      faqDesc: "Everything you need to know about COMMANDEV's learning methods, curriculum, and ecosystem.",
      faqItems: [
        {
          q: "What is COMMANDEV?",
          a: "COMMANDEV is a modern interactive coding education platform combining industry-aligned curriculum, an in-browser live sandbox with zero local setup, AI mentor guidance, and progressive real-world project construction."
        },
        {
          q: "Is COMMANDEV suitable for complete beginners?",
          a: "Yes, absolutely. The COMMANDEV curriculum is built from the ground up starting at Level 0 with visual explanations and step-by-step guidance, allowing anyone to grasp core concepts and write their first lines of code with confidence."
        },
        {
          q: "How does interactive coding work in COMMANDEV?",
          a: "Each lesson places digestible conceptual explanations side-by-side with an active code editor. You write live code and receive instant visual rendering and automated test feedback without switching between multiple tools."
        },
        {
          q: "Are real-world projects built during the courses?",
          a: "Yes. COMMANDEV emphasizes practical project-based learning. As you master core concepts, you construct tangible portfolio projects—including responsive web layouts, interactive web apps, data dashboards, and defensive security sandboxes."
        },
        {
          q: "Is coding done directly in the browser without local installations?",
          a: "Yes. All code editing, testing, and debugging take place directly within your browser runtime. You do not need to install complex local compilers, terminal environments, or third-party tools to get started."
        },
        {
          q: "Does COMMANDEV provide completion certificates?",
          a: "Certificates are not currently part of the COMMANDEV product scope. COMMANDEV focuses 100% on demonstrable skills, running code mastery, and verified real-world portfolio projects."
        }
      ],
      footerRights: "All rights reserved."
    }
  }[lang];

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* 1. TOP NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-[#070913]/85 backdrop-blur-xl border-b border-slate-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
              <Code2 className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2 font-black text-2xl tracking-tight">
              <span className="text-white tracking-wider">COMMANDEV</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold text-slate-300">
            <a href="#" className="relative text-white hover:text-blue-400 transition-colors pb-1 group">
              {t.homeNav}
              <span className="absolute bottom-[-6px] left-0 right-0 h-[3px] bg-[#0088ff] rounded-full"></span>
            </a>
            <a href="#courses" className="relative hover:text-blue-400 transition-all duration-300 pb-1 group">
              {t.coursesNav}
              <span className="absolute bottom-[-6px] left-0 right-0 h-[3px] bg-[#0088ff] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </a>
            <a href="#roadmap" className="relative hover:text-blue-400 transition-all duration-300 pb-1 group">
              {t.learningPathNav}
              <span className="absolute bottom-[-6px] left-0 right-0 h-[3px] bg-[#0088ff] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </a>
            <a href="#projects" className="relative hover:text-blue-400 transition-all duration-300 pb-1 group">
              {t.projectsNav}
              <span className="absolute bottom-[-6px] left-0 right-0 h-[3px] bg-[#0088ff] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </a>
            <a href="#security" className="relative hover:text-blue-400 transition-all duration-300 pb-1 group">
              {t.securityNav}
              <span className="absolute bottom-[-6px] left-0 right-0 h-[3px] bg-[#0088ff] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </a>
            <a href="#faq" className="relative hover:text-blue-400 transition-all duration-300 pb-1 group">
              {t.faqNav}
              <span className="absolute bottom-[-6px] left-0 right-0 h-[3px] bg-[#0088ff] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </a>
            <button 
              onClick={onViewAboutUs}
              className="relative hover:text-blue-400 transition-all duration-300 pb-1 group cursor-pointer text-slate-300 font-semibold"
            >
              {t.aboutUsNav}
              <span className="absolute bottom-[-6px] left-0 right-0 h-[3px] bg-[#0088ff] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </button>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Sign In Button (Icon Only) */}
            <button 
              onClick={handleStart} 
              aria-label={t.signIn}
              title={t.signIn}
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800/80 hover:border-slate-700/80 transition-all shadow-md group cursor-pointer"
            >
              <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-menu"
              aria-label={mobileMenuOpen ? (lang === 'id' ? "Tutup menu navigasi" : "Close navigation menu") : (lang === 'id' ? "Buka menu navigasi" : "Open navigation menu")}
              className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Language Selector (Far Right) */}
            <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-xl p-1 shadow-inner">
              <button
                onClick={() => setLang('id')}
                aria-label="Ubah bahasa ke Bahasa Indonesia / Switch language to Indonesian"
                className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5 ${lang === 'id' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                <span>🇮🇩</span> ID
              </button>
              <button
                onClick={() => setLang('en')}
                aria-label="Ubah bahasa ke Bahasa Inggris / Switch language to English"
                className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5 ${lang === 'en' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                <span>🇬🇧</span> EN
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div 
            id="mobile-nav-menu"
            className="md:hidden bg-[#070913]/98 backdrop-blur-2xl border-b border-slate-800 px-4 pt-3 pb-6 shadow-2xl transition-all"
          >
            <div className="flex flex-col space-y-1 font-semibold text-sm text-slate-300">
              <a 
                href="#" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-white hover:bg-slate-800/60 hover:text-blue-400 transition-colors"
              >
                {t.homeNav}
              </a>
              <a 
                href="#courses" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg hover:bg-slate-800/60 hover:text-blue-400 transition-colors"
              >
                {t.coursesNav}
              </a>
              <a 
                href="#roadmap" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg hover:bg-slate-800/60 hover:text-blue-400 transition-colors"
              >
                {t.learningPathNav}
              </a>
              <a 
                href="#projects" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg hover:bg-slate-800/60 hover:text-blue-400 transition-colors"
              >
                {t.projectsNav}
              </a>
              <a 
                href="#security" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg hover:bg-slate-800/60 hover:text-blue-400 transition-colors"
              >
                {t.securityNav}
              </a>
              <a 
                href="#faq" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg hover:bg-slate-800/60 hover:text-blue-400 transition-colors"
              >
                {t.faqNav}
              </a>
              <button 
                onClick={() => { setMobileMenuOpen(false); onViewAboutUs?.(); }}
                className="px-3 py-2.5 rounded-lg text-left hover:bg-slate-800/60 hover:text-blue-400 transition-colors cursor-pointer font-semibold text-sm text-slate-300"
              >
                {t.aboutUsNav}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* 2. HERO SECTION (Cinematic Editorial Full-Bleed Background) */}
      <section className="relative min-h-[680px] lg:min-h-[740px] pt-32 pb-16 md:pt-40 md:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#070913] flex flex-col justify-between">
        
        {/* CINEMATIC FULL-BLEED BACKGROUND IMAGE (Spanning 100% of the Hero Section) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden">
          <img 
            src={activeHeroImage} 
            alt="Mawardi - Personal Developer Workspace at COMMANDEV" 
            className="w-full h-full object-cover object-[78%_center] lg:object-[82%_center] transition-opacity duration-1000"
            onError={() => {
              if (!imageError) setImageError(true);
            }}
          />

          {/* MULTI-LAYER CINEMATIC EDITORIAL GRADIENT OVERLAYS */}
          {/* Layer 1: Left-to-Right Editorial Dark Gradient (Pristine text contrast on left, natural workspace reveal on right) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#070913] via-[#070913]/95 sm:via-[#070913]/85 md:via-[#070913]/70 lg:via-[#070913]/40 to-transparent"></div>

          {/* Layer 2: Subtle Photographic Vignette & Overall Soft Darkening */}
          <div className="absolute inset-0 bg-[#070913]/25"></div>

          {/* Layer 3: Top edge blend under the fixed navbar */}
          <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#070913] via-[#070913]/75 to-transparent"></div>

          {/* Layer 4: Bottom edge blend into the next section */}
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#070913] via-[#070913]/85 to-transparent"></div>

          {/* Subtle Technical Grid Effect layered into background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_25%_40%,#000_70%,transparent_100%)]"></div>
        </div>

        {/* HERO CONTENT: RENDERED DIRECTLY ON TOP OF THE BACKGROUND IMAGE */}
        <div className="max-w-7xl mx-auto w-full relative z-10 flex-1 flex flex-col justify-center">
          <div className="max-w-2xl lg:max-w-[640px] flex flex-col items-start text-left">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#0088ff] font-bold mb-4 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0088ff]"></span>
              {t.eyebrow}
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-[1.12] text-white">
              {t.heroTitle1}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0088ff] via-cyan-400 to-emerald-400 font-extrabold">
                {t.heroTitleHighlight}
              </span>
            </h1>
            
            {/* Supporting Copy */}
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mb-8 leading-relaxed font-normal">
              {t.heroDesc}
            </p>

            {/* Feature row (4 Key Pillars: INDUSTRY CURRICULUM, LIVE BROWSER IDE, AI MENTOR, REAL PROJECTS) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full py-5 my-2 border-y border-slate-800/60 bg-slate-950/40 backdrop-blur-sm rounded-xl px-4">
              <div className="flex items-center gap-2.5 group">
                <div className="p-1.5 rounded-lg bg-blue-500/10 text-[#0088ff] border border-blue-500/20 group-hover:bg-blue-500/20 transition-all">
                  <BookOpen className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">INDUSTRY</div>
                  <div className="text-[11px] font-bold text-white uppercase tracking-wide">CURRICULUM</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2.5 group">
                <div className="p-1.5 rounded-lg bg-blue-500/10 text-[#0088ff] border border-blue-500/20 group-hover:bg-blue-500/20 transition-all">
                  <Terminal className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">LIVE BROWSER</div>
                  <div className="text-[11px] font-bold text-white uppercase tracking-wide">IDE</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 group">
                <div className="p-1.5 rounded-lg bg-blue-500/10 text-[#0088ff] border border-blue-500/20 group-hover:bg-blue-500/20 transition-all">
                  <Code2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">AI</div>
                  <div className="text-[11px] font-bold text-white uppercase tracking-wide">MENTOR</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 group">
                <div className="p-1.5 rounded-lg bg-blue-500/10 text-[#0088ff] border border-blue-500/20 group-hover:bg-blue-500/20 transition-all">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">REAL</div>
                  <div className="text-[11px] font-bold text-white uppercase tracking-wide">PROJECTS</div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5 w-full pt-4 mb-4">
              {/* Primary CTA */}
              <button 
                onClick={onStartLearning}
                className="flex items-center justify-center gap-2 px-8 py-3.5 bg-[#0088ff] hover:bg-[#0077ee] text-white rounded-full font-bold text-sm shadow-xl shadow-blue-500/25 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <span>{t.ctaFree}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              {/* Secondary CTA: Lihat Project */}
              <button 
                onClick={() => {
                  const el = document.getElementById('projects');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white rounded-full font-bold text-sm border border-slate-700/70 hover:border-slate-600 transition-all cursor-pointer backdrop-blur-sm"
              >
                <FolderGit2 className="w-4 h-4 text-cyan-400" />
                <span>{t.viewProjects}</span>
              </button>

              {/* Video Profile Modal Trigger */}
              <button 
                onClick={() => setShowVideoModal(true)}
                className="flex items-center gap-2.5 text-slate-400 hover:text-white font-medium text-xs transition-all cursor-pointer group py-2 px-3"
              >
                <PlayCircle className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
                <span>{t.watchVideo}</span>
              </button>
            </div>

            {/* Handwritten Script Accent */}
            <div className="relative mt-2">
              <span className="font-script text-2xl sm:text-3xl md:text-4xl text-cyan-400/90 rotate-[-2deg] inline-block tracking-wide select-none">
                {t.cursiveText}
              </span>
              <div className="absolute -bottom-1.5 left-0 w-32 h-2 text-[#0088ff] opacity-75">
                <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="w-full h-full fill-none stroke-current stroke-2">
                  <path d="M0,5 Q50,9 100,3" strokeLinecap="round" />
                </svg>
              </div>
            </div>

          </div>
        </div>

        {/* Subtle Methodology Signature & Discreet Founder Status Capsule */}
        <div className="mt-12 pt-6 border-t border-slate-800/50 max-w-7xl mx-auto w-full relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono text-slate-400 tracking-wider">
          <div className="flex items-center gap-3">
            <span className="text-[#0088ff] font-bold">COMMANDEV METHOD //</span>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-bold text-slate-300">
              <span>LEARN</span>
              <span className="text-slate-600">→</span>
              <span>CODE</span>
              <span className="text-slate-600">→</span>
              <span>PRACTICE</span>
              <span className="text-slate-600">→</span>
              <span>BUILD</span>
              <span className="text-slate-600">→</span>
              <span>MASTER</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{t.practical}</span>
            </div>
            <div className="hidden sm:flex items-center gap-2.5 px-3 py-1 rounded-full bg-slate-950/60 border border-slate-800/80 backdrop-blur-md text-[11px]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400 font-mono font-semibold uppercase tracking-wider text-[10px]">Coding</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300 font-medium">Mawardi</span>
              <span className="text-slate-500 text-[10px]">(Founder)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 relative shadow-2xl">
            <button 
              onClick={() => setShowVideoModal(false)}
              aria-label={lang === 'id' ? "Tutup video pengantar" : "Close intro video"}
              title={lang === 'id' ? "Tutup" : "Close"}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full bg-slate-800/60 hover:bg-slate-800 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                <PlayCircle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold">{t.videoModalTitle}</h3>
            </div>
            <div className="aspect-video rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center p-8 text-center">
              <Terminal className="w-16 h-16 text-blue-500 mb-4 animate-pulse" />
              <h4 className="font-bold text-base text-white mb-2">{t.videoModalHeading}</h4>
              <p className="text-xs text-slate-400 max-w-md mb-6">
                {t.videoModalDesc}
              </p>
              <button 
                onClick={() => { setShowVideoModal(false); onStartLearning(); }}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 cursor-pointer"
              >
                {t.videoModalBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. VALUE PROPOSITION SECTION (Editorial 3-Column Layout, No Heavy Cards) */}
      <section className="py-28 bg-[#090c17] border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-20">
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest block mb-3">METHODOLOGY</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-white">
              {t.whyTitle}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {t.whyDesc}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            <div className="flex flex-col">
              <div className="text-xs font-mono font-bold text-blue-400 mb-4">01 // RUNTIME</div>
              <h3 className="text-xl font-bold mb-3 text-white">{t.card1Title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed border-t border-slate-800/80 pt-4">
                {t.card1Desc}
              </p>
            </div>

            <div className="flex flex-col">
              <div className="text-xs font-mono font-bold text-indigo-400 mb-4">02 // INTELLIGENCE</div>
              <h3 className="text-xl font-bold mb-3 text-white">{t.card2Title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed border-t border-slate-800/80 pt-4">
                {t.card2Desc}
              </p>
            </div>

            <div className="flex flex-col">
              <div className="text-xs font-mono font-bold text-emerald-400 mb-4">03 // PROGRESS</div>
              <h3 className="text-xl font-bold mb-3 text-white">{t.card3Title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed border-t border-slate-800/80 pt-4">
                {t.card3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COURSES ROADMAP PREVIEW (Editorial Grid) */}
      <section id="courses" className="scroll-mt-24 py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-3">CURRICULUM</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
              {t.roadmapTitle}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              {t.roadmapDesc}
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {COURSES.map((course, idx) => (
            <div 
              key={course.id}
              onClick={onStartLearning}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onStartLearning(); }}
              role="button"
              tabIndex={0}
              className="p-8 rounded-2xl bg-[#0b0e1a]/60 border border-slate-800 hover:border-blue-500/50 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 outline-none transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="text-xs font-mono font-bold text-slate-500 mb-6 group-hover:text-blue-400 transition-colors">
                  0{idx + 1}
                </div>
                <h4 className="font-bold text-lg mb-3 text-white">{course.title}</h4>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-8">
                  {course.shortDescription}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-blue-400 group-hover:text-blue-300">
                <span>{t.exploreCourse}</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. LEARNING LOOP SECTION (Horizontal Flow) */}
      <section id="roadmap" className="scroll-mt-24 py-28 bg-[#090c17] border-y border-slate-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest block mb-3">METHODOLOGY</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 text-white">
              {t.loopTitle}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              {t.loopDesc}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="border-l-2 border-blue-500/50 pl-6 py-2">
              <div className="text-xs font-mono font-bold text-blue-400 mb-2">STEP 01</div>
              <h3 className="text-lg font-bold text-white mb-2">{t.step1Title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{t.step1Desc}</p>
            </div>
            <div className="border-l-2 border-indigo-500/50 pl-6 py-2">
              <div className="text-xs font-mono font-bold text-indigo-400 mb-2">STEP 02</div>
              <h3 className="text-lg font-bold text-white mb-2">{t.step2Title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{t.step2Desc}</p>
            </div>
            <div className="border-l-2 border-cyan-500/50 pl-6 py-2">
              <div className="text-xs font-mono font-bold text-cyan-400 mb-2">STEP 03</div>
              <h3 className="text-lg font-bold text-white mb-2">{t.step3Title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{t.step3Desc}</p>
            </div>
            <div className="border-l-2 border-violet-500/50 pl-6 py-2">
              <div className="text-xs font-mono font-bold text-violet-400 mb-2">STEP 04</div>
              <h3 className="text-lg font-bold text-white mb-2">{t.step4Title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{t.step4Desc}</p>
            </div>
            <div className="border-l-2 border-emerald-500/50 pl-6 py-2">
              <div className="text-xs font-mono font-bold text-emerald-400 mb-2">STEP 05</div>
              <h3 className="text-lg font-bold text-white mb-2">{t.step5Title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{t.step5Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5.5. REAL PROJECTS SECTION (Editorial Portfolio Grid) */}
      <section id="projects" className="scroll-mt-24 py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest block mb-3">{t.projectsHeader}</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
              {t.projectsTitle}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
              {t.projectsDesc}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {CODERA_PROJECTS.slice(0, 3).map((project, idx) => {
            const difficulties = {
              Beginner: 'text-blue-400 border-blue-500/20 bg-blue-500/5',
              Intermediate: 'text-indigo-400 border-indigo-500/20 bg-indigo-500/5',
              Advanced: 'text-violet-400 border-violet-500/20 bg-violet-500/5'
            };
            const diffClass = difficulties[project.difficulty] || 'text-slate-400 border-slate-700/20 bg-slate-800/5';
            
            return (
              <div 
                key={project.id}
                onClick={onStartLearning}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onStartLearning(); }}
                role="button"
                tabIndex={0}
                className="p-8 rounded-2xl bg-[#0b0e1a]/40 border border-slate-800/60 hover:border-blue-500/40 transition-all cursor-pointer flex flex-col justify-between group outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <span className="text-xs font-mono font-bold text-slate-500">
                      0{idx + 1} // {project.category.toUpperCase()}
                    </span>
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border ${diffClass}`}>
                      {project.difficulty.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-3 text-white group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] font-mono text-slate-500 bg-slate-900/50 px-2 py-0.5 rounded border border-slate-800/40">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-blue-400 group-hover:text-blue-300">
                    <span>{t.projectsExplore}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5.6. RESPONSIBLE SECURITY SECTION */}
      <section id="security" className="scroll-mt-24 py-28 bg-[#090c17] border-t border-slate-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest block mb-3">DEFENSIVE PARADIGM</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
              {t.securityTitle}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {t.securityDesc}
            </p>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-2xl bg-[#0b0e1a]/30 border border-slate-800/50 flex gap-5 items-start">
              <div className="text-xs font-mono font-bold text-blue-400 mt-0.5">01 //</div>
              <div>
                <h3 className="text-base font-bold text-white mb-1.5">{t.securityPillar1Title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{t.securityPillar1Desc}</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0b0e1a]/30 border border-slate-800/50 flex gap-5 items-start">
              <div className="text-xs font-mono font-bold text-indigo-400 mt-0.5">02 //</div>
              <div>
                <h3 className="text-base font-bold text-white mb-1.5">{t.securityPillar2Title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{t.securityPillar2Desc}</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0b0e1a]/30 border border-slate-800/50 flex gap-5 items-start">
              <div className="text-xs font-mono font-bold text-emerald-400 mt-0.5">03 //</div>
              <div>
                <h3 className="text-base font-bold text-white mb-1.5">{t.securityPillar3Title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{t.securityPillar3Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5.7. FAQ SECTION (Clean Editorial Accordion) */}
      <section id="faq" className="scroll-mt-24 py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#0088ff] uppercase tracking-widest mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t.faqHeader}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            {t.faqTitle}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.faqDesc}
          </p>
        </div>

        {/* Editorial Accordion List */}
        <div className="space-y-3">
          {t.faqItems.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx} 
                className="border-b border-slate-800/80 last:border-b-0 transition-colors"
              >
                <button
                  type="button"
                  id={`faq-question-${idx}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full py-5 text-left flex items-center justify-between gap-4 text-white hover:text-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 rounded-lg transition-colors cursor-pointer group"
                >
                  <span className="font-bold text-base sm:text-lg leading-snug">
                    {item.q}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-slate-900/80 border border-slate-800/80 text-slate-400 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all flex-shrink-0 ${isOpen ? 'rotate-180 text-blue-400 border-blue-500/30' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <div
                  id={`faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`faq-question-${idx}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0 pb-0 pointer-events-none'
                  }`}
                >
                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed pl-1">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. CTA BANNER SECTION */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <div className="py-16 px-8 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-600/5 blur-3xl pointer-events-none -z-10"></div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
            {t.ctaBannerTitle}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed">
            {t.ctaBannerDesc}
          </p>
          <button
            onClick={onStartLearning}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/25 hover:-translate-y-0.5 transition-all cursor-pointer inline-flex items-center gap-3"
          >
            <span>{t.startLearning}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="py-12 bg-[#05070f] text-center border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 font-bold text-base">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <Code2 className="w-5 h-5" />
            </div>
            <span>COMMANDEV</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p className="text-slate-500 text-xs font-medium">
              © {new Date().getFullYear()} COMMANDEV. {t.footerRights}
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};


