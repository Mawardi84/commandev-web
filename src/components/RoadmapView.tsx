import React, { useState, useMemo } from 'react';
import { 
  Compass, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Award, 
  ArrowRight, 
  Layers, 
  Server, 
  Layout, 
  Cloud, 
  ShieldAlert, 
  DollarSign, 
  Briefcase, 
  BookOpen, 
  ExternalLink, 
  Search, 
  Download, 
  Filter,
  Flame,
  ChevronRight,
  Cpu
} from 'lucide-react';
import { UserProgress, Course } from '../types';
import { CAREER_TRACKS, CareerTrack, RoadmapNode } from '../data/roadmapData';
import { Section } from './AppLayout';

interface RoadmapViewProps {
  userProgress: UserProgress;
  courses: Course[];
  onSelectCourse: (courseId: string) => void;
  onNavigateTab?: (tab: Section) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  userProgress,
  courses,
  onSelectCourse,
  onNavigateTab
}) => {
  const [selectedTrackId, setSelectedTrackId] = useState<CareerTrack['id']>('frontend');
  const [levelFilter, setLevelFilter] = useState<'all' | 'foundational' | 'intermediate' | 'advanced'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);

  const activeTrack = useMemo(() => {
    return CAREER_TRACKS.find(t => t.id === selectedTrackId) || CAREER_TRACKS[0];
  }, [selectedTrackId]);

  // Helper to calculate course completion %
  const getCourseProgress = (courseId: string): number => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return 0;
    
    // Gather all lesson IDs in this course
    const allLessonIds: string[] = [];
    course.levels.forEach(lvl => {
      lvl.modules.forEach(mod => {
        mod.lessons.forEach(les => {
          allLessonIds.push(les.id);
        });
      });
    });

    if (allLessonIds.length === 0) return 0;
    const completedCount = allLessonIds.filter(id => userProgress.completedLessons.includes(id)).length;
    return Math.round((completedCount / allLessonIds.length) * 100);
  };

  // Track overall completion
  const trackStats = useMemo(() => {
    const nodes = activeTrack.milestoneNodes;
    if (nodes.length === 0) return { progress: 0, completedCount: 0, total: 0 };
    
    let totalPct = 0;
    let completedCount = 0;

    nodes.forEach(node => {
      const pct = getCourseProgress(node.courseId);
      totalPct += pct;
      if (pct >= 80) completedCount++;
    });

    return {
      progress: Math.round(totalPct / nodes.length),
      completedCount,
      total: nodes.length
    };
  }, [activeTrack, userProgress, courses]);

  // Competency overview across all 5 disciplines
  const competencyMatrix = useMemo(() => {
    return [
      {
        name: 'Frontend UI/UX',
        courseId: 'react-mastery',
        skills: ['HTML5', 'CSS Grid', 'JavaScript', 'React 18'],
        pct: Math.max(getCourseProgress('html-mastery'), getCourseProgress('react-mastery'))
      },
      {
        name: 'Backend & APIs',
        courseId: 'backend-mastery',
        skills: ['Python 3', 'PHP 8', 'Go', 'REST Architecture'],
        pct: Math.max(getCourseProgress('python-mastery'), getCourseProgress('backend-mastery'), getCourseProgress('php-mastery'), getCourseProgress('golang-mastery'))
      },
      {
        name: 'Database & SQL',
        courseId: 'mysql-mastery',
        skills: ['MySQL 8', 'PostgreSQL', 'Indexing', 'ACID'],
        pct: Math.max(getCourseProgress('database-mastery'), getCourseProgress('mysql-mastery'))
      },
      {
        name: 'Systems & Performance',
        courseId: 'cpp-mastery',
        skills: ['C Pointers', 'C++ RAII', 'Go Concurrency', 'Memory Heap'],
        pct: Math.max(getCourseProgress('c-mastery'), getCourseProgress('cpp-mastery'), getCourseProgress('golang-mastery'))
      },
      {
        name: 'DevSecOps & Cloud',
        courseId: 'devsecops-deployment',
        skills: ['Git Flow', 'CI/CD Pipelines', 'Docker', 'SRE/SLO'],
        pct: Math.max(getCourseProgress('git-mastery'), getCourseProgress('devsecops-deployment'))
      },
      {
        name: 'Security & AppSec',
        courseId: 'cybersecurity-foundations',
        skills: ['OWASP Top 10', 'STRIDE Threat Modeling', 'Audit Gates'],
        pct: getCourseProgress('cybersecurity-foundations')
      }
    ];
  }, [userProgress, courses]);

  // Filtered milestones in the active track
  const filteredMilestones = useMemo(() => {
    return activeTrack.milestoneNodes.filter(node => {
      if (levelFilter !== 'all' && node.level !== levelFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = node.title.toLowerCase().includes(q);
        const matchDesc = node.description.toLowerCase().includes(q);
        const matchTopics = node.keyTopics.some(t => t.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchTopics) return false;
      }
      return true;
    });
  }, [activeTrack, levelFilter, searchQuery]);

  const getTrackIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout':
        return <Layout className="w-5 h-5" />;
      case 'Server':
        return <Server className="w-5 h-5" />;
      case 'Layers':
        return <Layers className="w-5 h-5" />;
      case 'Cloud':
        return <Cloud className="w-5 h-5" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      default:
        return <Compass className="w-5 h-5" />;
    }
  };

  const getLevelBadgeClass = (level: RoadmapNode['level']) => {
    switch (level) {
      case 'foundational':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'intermediate':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case 'advanced':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  const handleExportRoadmap = () => {
    const lines = [
      `# Roadmap Karir Pengembang: ${activeTrack.title}`,
      `*Dihasilkan secara otomatis oleh CODERA Interactive Academy*`,
      ``,
      `**Target Peran:** ${activeTrack.roleTitles.join(', ')}`,
      `**Estimasi Jam Belajar:** ~${activeTrack.totalHours} Jam`,
      `**Estimasi Gaji:** ${activeTrack.avgSalaryRange}`,
      `**Progres Saat Ini:** ${trackStats.progress}% (${trackStats.completedCount}/${trackStats.total} Milestone)`,
      ``,
      `---`,
      `## Tahapan Milestone Pembelajaran`,
      ``
    ];

    activeTrack.milestoneNodes.forEach((node, i) => {
      const pct = getCourseProgress(node.courseId);
      const statusIcon = pct >= 80 ? '[X]' : pct > 0 ? '[-]' : '[ ]';
      lines.push(`### ${i + 1}. ${node.title} (${node.level.toUpperCase()})`);
      lines.push(`- **Status Progres:** ${statusIcon} ${pct}% selesai`);
      lines.push(`- **Deskripsi:** ${node.description}`);
      lines.push(`- **Topik Kunci:** ${node.keyTopics.join(', ')}`);
      lines.push(`- **Target Proyek Portofolio:** ${node.practicalMilestone}`);
      lines.push(`- **Lencana Kompetensi:** ${node.badge}`);
      lines.push(``);
    });

    const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `commandev-roadmap-${activeTrack.id}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full bg-slate-950 text-slate-100 flex flex-col overflow-hidden">
      
      {/* Top Banner Header */}
      <div className="p-6 border-b border-slate-800 bg-slate-900/70 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              <span>COMMANDEV Developer Career Pathways</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Peta Jalan & Kurikulum Karir Rekayasa Perangkat Lunak
            </h1>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Panduan terstruktur langkah-demi-langkah berstandar industri modern. Tiap milestone terhubung langsung dengan modul kursus, lab pengujian, dan portofolio nyata di COMMANDEV.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleExportRoadmap}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-sm"
              title="Unduh Roadmap dalam format Markdown"
            >
              <Download className="w-4 h-4 text-indigo-400" />
              <span>Ekspor Markdown</span>
            </button>

            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('security-labs')}
                className="px-3.5 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Security Audit Gate</span>
              </button>
            )}
          </div>
        </div>

        {/* Track Selection Tabs */}
        <div className="max-w-7xl mx-auto mt-6 flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
          {CAREER_TRACKS.map(track => {
            const isSelected = track.id === selectedTrackId;
            return (
              <button
                key={track.id}
                onClick={() => {
                  setSelectedTrackId(track.id);
                  setSelectedNode(null);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 whitespace-nowrap cursor-pointer border ${
                  isSelected
                    ? 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-500/20'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {getTrackIcon(track.iconName)}
                <span>{track.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Workspace */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Active Track Highlight & Metric Hero Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              <div className="lg:col-span-8 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    Jalur Terpilih
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    ~{activeTrack.totalHours} Jam Belajar Praktis
                  </span>
                </div>

                <h2 className="text-xl font-extrabold text-white">
                  {activeTrack.title}
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                  {activeTrack.description}
                </p>

                {/* Role Titles Chips */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                    Peran Karir:
                  </span>
                  {activeTrack.roleTitles.map((role, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 rounded-md bg-slate-800 text-[11px] text-slate-300 border border-slate-700 font-medium">
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats & Progress Metric */}
              <div className="lg:col-span-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">Progres Jalur Ini</span>
                  <span className="text-sm font-black text-rose-400">{trackStats.progress}%</span>
                </div>

                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-rose-500 to-indigo-500 transition-all duration-500 rounded-full"
                    style={{ width: `${Math.max(trackStats.progress, 5)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    {trackStats.completedCount} dari {trackStats.total} Milestone
                  </span>
                  <span className="text-slate-300 font-semibold flex items-center gap-1">
                    <DollarSign className="w-3 h-3 text-emerald-400" />
                    {activeTrack.avgSalaryRange}
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Competency Radar Matrix */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-extrabold text-white">Matriks Kesiapan Rekayasa (Skill Matrix)</h3>
              </div>
              <span className="text-[11px] text-slate-400">Sinkronisasi otomatis dengan lesson yang selesai</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {competencyMatrix.map((comp, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-200">{comp.name}</span>
                    <span className="text-xs font-black text-indigo-400">{comp.pct}%</span>
                  </div>

                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500 rounded-full transition-all"
                      style={{ width: `${comp.pct}%` }}
                    />
                  </div>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {comp.skills.slice(0, 3).map((sk, idx) => (
                      <span key={idx} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 font-mono">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Milestone Filter Toolbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5 mr-2">
                <Filter className="w-3.5 h-3.5 text-slate-500" />
                Level:
              </span>
              <button
                onClick={() => setLevelFilter('all')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  levelFilter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setLevelFilter('foundational')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  levelFilter === 'foundational' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                Junior (Foundational)
              </button>
              <button
                onClick={() => setLevelFilter('intermediate')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  levelFilter === 'intermediate' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                Mid (Intermediate)
              </button>
              <button
                onClick={() => setLevelFilter('advanced')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  levelFilter === 'advanced' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                Senior (Advanced)
              </button>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari topik atau skill..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          {/* Sequential Milestone Stepper Grid */}
          <div className="space-y-4">
            {filteredMilestones.map((node, index) => {
              const pct = getCourseProgress(node.courseId);
              const isCompleted = pct >= 80;
              const isInProgress = pct > 0 && pct < 80;
              const isSelected = selectedNode?.id === node.id;

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-rose-500 ring-1 ring-rose-500/50 shadow-lg'
                      : isCompleted
                      ? 'bg-slate-900/90 border-emerald-500/30 hover:border-emerald-500/50'
                      : isInProgress
                      ? 'bg-slate-900/90 border-indigo-500/40 hover:border-indigo-500/60'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    
                    {/* Left Step Header */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 ${
                        isCompleted 
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : isInProgress
                          ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}>
                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : `0${index + 1}`}
                      </div>

                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`px-2 py-0.5 rounded border text-[9px] font-bold uppercase tracking-wider ${getLevelBadgeClass(node.level)}`}>
                            {node.level}
                          </span>
                          <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                            <Clock className="w-3 h-3 text-slate-500" />
                            ~{node.estimatedHours} Jam
                          </span>
                          <span className="text-[11px] text-amber-400 font-bold flex items-center gap-1">
                            <Award className="w-3 h-3" />
                            {node.badge}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-white flex items-center gap-2">
                          <span>{node.title}</span>
                          {isCompleted && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                              Lulus
                            </span>
                          )}
                        </h3>

                        <p className="text-xs text-slate-300 leading-relaxed">
                          {node.description}
                        </p>

                        {/* Key Topics Badges */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {node.keyTopics.map((topic, ti) => (
                            <span key={ti} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 border border-slate-800 font-mono">
                              {topic}
                            </span>
                          ))}
                        </div>

                        {/* Practical Project Requirement */}
                        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs space-y-1 mt-2">
                          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                            <Flame className="w-3.5 h-3.5 text-rose-400" />
                            Milestone Proyek Portofolio
                          </div>
                          <p className="text-slate-300 text-[11px] leading-relaxed">
                            {node.practicalMilestone}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right Progress & Action CTA */}
                    <div className="flex flex-col md:items-end justify-between self-stretch gap-4 md:w-56 flex-shrink-0 pt-2 md:pt-0">
                      <div className="w-full text-right space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400 font-medium">Penyelesaian</span>
                          <span className="font-bold text-slate-200">{pct}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-300 ${
                              isCompleted ? 'bg-emerald-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectCourse(node.courseId);
                        }}
                        className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                          isCompleted
                            ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                            : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20'
                        }`}
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>{isCompleted ? 'Ulangi Modul' : pct > 0 ? 'Lanjutkan Belajar' : 'Mulai Modul'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {filteredMilestones.length === 0 && (
            <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <Compass className="w-8 h-8 text-slate-500 mx-auto" />
              <div className="text-sm font-bold text-slate-300">Tidak ada milestone yang cocok dengan filter</div>
              <p className="text-xs text-slate-500">Coba ubah kata kunci pencarian atau setel level kembali ke "Semua".</p>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};
