import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Terminal, 
  Lock, 
  Unlock, 
  Key, 
  Database, 
  Server, 
  Globe, 
  RefreshCw, 
  Play, 
  ArrowRight, 
  Eye, 
  HelpCircle, 
  FileCode, 
  Activity, 
  Sparkles, 
  Cpu,
  Layers,
  Check,
  Zap,
  Info,
  Download,
  Copy,
  CheckSquare,
  Square,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProgress } from '../types';
import { SECURITY_LABS, SecurityLab } from '../data/securityLabsData';
import { THREAT_NODES, SECURITY_CONTROLS } from '../data/threatModelingData';
import { PRODUCTION_READINESS_ITEMS, ReadinessAuditItem } from '../data/productionReadinessData';

interface SecurityLabViewProps {
  userProgress: UserProgress;
  onRewardXp: (xp: number, labId: string) => void;
  initialTab?: ActiveTab;
}

type ActiveTab = 'labs' | 'threat-model' | 'readiness-gate' | 'lifecycle';

export const SecurityLabView: React.FC<SecurityLabViewProps> = ({
  userProgress,
  onRewardXp,
  initialTab = 'labs'
}) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);
  const [selectedTechStack, setSelectedTechStack] = useState<'react-node' | 'python-fastapi' | 'static-web'>('react-node');

  // Lab state
  const [selectedLabId, setSelectedLabId] = useState<string>(SECURITY_LABS[0].id);
  const selectedLab = SECURITY_LABS.find(l => l.id === selectedLabId) || SECURITY_LABS[0];
  const [labCode, setLabCode] = useState<string>(selectedLab.files[0].initialCode);
  const [testResults, setTestResults] = useState<{ name: string; passed: boolean; message: string }[] | null>(null);
  const [exploitOutput, setExploitOutput] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [isCompleted, setIsCompleted] = useState(() => userProgress.completedLessons.includes(selectedLab.id));

  // Update editor when switching lab
  const handleSelectLab = (lab: SecurityLab) => {
    setSelectedLabId(lab.id);
    setLabCode(lab.files[0].initialCode);
    setTestResults(null);
    setExploitOutput(null);
    setShowHint(false);
    setIsCompleted(userProgress.completedLessons.includes(lab.id));
  };

  // Threat Modeling state
  const [selectedNodeId, setSelectedNodeId] = useState<string>(THREAT_NODES[0].id);
  const [activeControls, setActiveControls] = useState<Record<string, boolean>>({
    tls_hsts: true,
    csp_header: false,
    rate_limiting: false,
    param_queries: false,
    jwt_rbac: true,
    db_least_privilege: false
  });
  const selectedNode = THREAT_NODES.find(n => n.id === selectedNodeId) || THREAT_NODES[0];

  // Readiness Gate filter & interactive state
  const [readinessFilter, setReadinessFilter] = useState<string>('all');
  const [verifiedItems, setVerifiedItems] = useState<Record<string, boolean>>({});
  const [statusFilter, setStatusFilter] = useState<'all' | 'PASS' | 'WARN' | 'FAIL'>('all');
  const [stackOnlyFilter, setStackOnlyFilter] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditStepMessage, setAuditStepMessage] = useState('');
  const [auditSummaryBanner, setAuditSummaryBanner] = useState<{
    score: number;
    grade: string;
    passed: number;
    warn: number;
    fail: number;
    timestamp: string;
  } | null>(null);
  const [copiedReportToast, setCopiedReportToast] = useState(false);

  // Run live automated audit simulation
  const handleRunLiveAudit = () => {
    setIsAuditing(true);
    setAuditSummaryBanner(null);

    const steps = [
      'Menginisialisasi engine pemindaian audit keamanan...',
      'Memindai repositori & environment secrets (.env, API tokens)...',
      'Menguji proteksi injeksi data & parameterized queries (SQLi/XSS)...',
      'Memverifikasi header HTTP (HSTS, CSP, X-Frame-Options)...',
      'Memeriksa konfigurasi RBAC, session cookie, & IDOR guards...',
      'Mengevaluasi kepatuhan privasi data pengguna (UU PDP No. 27/2022)...',
      'Finalisasi skor kesiapan produksi (Go-Live Gate Report)...'
    ];

    let current = 0;
    setAuditStepMessage(steps[0]);

    const interval = setInterval(() => {
      current++;
      if (current < steps.length) {
        setAuditStepMessage(steps[current]);
      } else {
        clearInterval(interval);
        setIsAuditing(false);
        const passCount = PRODUCTION_READINESS_ITEMS.filter(i => i.status === 'PASS').length;
        const warnCount = PRODUCTION_READINESS_ITEMS.filter(i => i.status === 'WARN').length;
        const failCount = PRODUCTION_READINESS_ITEMS.filter(i => i.status === 'FAIL').length;
        const total = PRODUCTION_READINESS_ITEMS.length;
        const score = Math.round(((passCount + warnCount * 0.5) / total) * 100);
        const grade = score >= 90 ? 'A (Production Ready)' : score >= 75 ? 'B (Minor Warnings)' : 'C (Action Required)';

        setAuditSummaryBanner({
          score,
          grade,
          passed: passCount,
          warn: warnCount,
          fail: failCount,
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        });
      }
    }, 250);
  };

  // Export audit report to markdown
  const handleExportReport = () => {
    const lines = [
      '# Laporan Audit Kesiapan Produksi & Keamanan COMMANDEV',
      `Tanggal Audit: ${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`,
      `Target Stack: ${selectedTechStack}`,
      `Skor Kepatuhan: ${auditSummaryBanner?.score ?? 93}% (${auditSummaryBanner?.grade ?? 'A - Production Ready'})`,
      '',
      '## Ringkasan Kriteria Gerbang:',
      ...PRODUCTION_READINESS_ITEMS.map((item, idx) => {
        const isVerified = verifiedItems[item.id] ?? (item.status === 'PASS');
        return `${idx + 1}. [${item.status}] ${item.title} (${item.category} - ${item.severity})\n   - Status Verifikasi: ${isVerified ? 'VERIFIED' : 'PENDING'}\n   - Komponen: ${item.affectedComponent}\n   - Rekomendasi: ${item.remediation}`;
      }),
      '',
      '---\nDicetak otomatis dari Sistem Audit COMMANDEV'
    ];

    navigator.clipboard.writeText(lines.join('\n'));
    setCopiedReportToast(true);
    setTimeout(() => setCopiedReportToast(false), 3000);
  };

  // Lifecycle Incident Simulator state
  const [incidentStep, setIncidentStep] = useState<number>(1);
  const [incidentLog, setIncidentLog] = useState<string[]>([
    '[09:00:12 UTC] Bot scanner mendeteksi string API secret di public commit Git.'
  ]);

  // Run exploit simulation
  const handleRunExploit = () => {
    setExploitOutput(`[SIMULASI SERANGAN TERKONTROL]:
Mengirimkan payload berbahaya: ${selectedLab.exploitPayloadExample}
--------------------------------------------------
Hasil eksekusi pada kode saat ini:
⚠️ Kerentanan terpicu! Aplikasi memproses data tanpa proteksi yang memadai.`);
  };

  // Run verification test suite
  const handleRunTests = () => {
    const results = selectedLab.verificationSteps.map(step => {
      const res = step.testFn(labCode);
      return {
        name: step.name,
        passed: res.passed,
        message: res.message
      };
    });

    setTestResults(results);

    const allPassed = results.every(r => r.passed);
    if (allPassed && !isCompleted) {
      setIsCompleted(true);
      onRewardXp(selectedLab.xpReward, selectedLab.id);
      setExploitOutput(`✅ UJI PENETRASI DEFENSIF BERHASIL:
Seluruh pengujian keamanan lolos. Payload eksploitasi berhasil diblokir/dinetralkan secara aman!
Diberikan +${selectedLab.xpReward} XP.`);
    }
  };

  // Toggle Security Control in Threat Model
  const toggleControl = (controlId: string) => {
    setActiveControls(prev => ({
      ...prev,
      [controlId]: !prev[controlId]
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Top Banner: The Continuous Engineering & Security Philosophy */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Continuous Engineering & Security Lab</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              CODERA Security & Lifecycle Studio
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
              Keamanan adalah pengurangan risiko, bukan keamanan mutlak. Produksi bukanlah garis akhir, melainkan awal dari siklus pemantauan dan penyempurnaan berkelanjutan.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="bg-slate-800/80 backdrop-blur border border-slate-700 rounded-xl p-3 text-xs space-y-1">
              <div className="text-slate-400 font-medium">Target Stack Proyek:</div>
              <div className="flex items-center gap-1.5">
                {(['react-node', 'python-fastapi', 'static-web'] as const).map((stk) => (
                  <button
                    key={stk}
                    onClick={() => setSelectedTechStack(stk)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      selectedTechStack === stk
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-900/60 text-slate-400 hover:text-white'
                    }`}
                  >
                    {stk === 'react-node' && 'React + Node'}
                    {stk === 'python-fastapi' && 'Python + FastAPI'}
                    {stk === 'static-web' && 'Static / Edge'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Continuous Lifecycle Track Ribbon */}
        <div className="mt-6 pt-6 border-t border-slate-800/80">
          <div className="text-xs font-medium text-slate-400 mb-3 flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
            <span>Siklus Pembelajaran Kontinu (The Continuous Lifecycle Loop):</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs font-mono scrollbar-none text-slate-300">
            {[
              'LEARN', 'CODE', 'PRACTICE', 'BUILD', 'TEST', 
              'SECURE', 'HARDEN', 'DEPLOY', 'MONITOR', 'MAINTAIN', 'IMPROVE'
            ].map((step, idx, arr) => (
              <React.Fragment key={step}>
                <span className={`px-2.5 py-1 rounded-md transition-colors ${
                  step === 'SECURE' || step === 'HARDEN'
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-bold'
                    : 'bg-slate-800/60 text-slate-300 border border-slate-700/60'
                }`}>
                  {step}
                </span>
                {idx < arr.length - 1 && <span className="text-slate-600">→</span>}
              </React.Fragment>
            ))}
            <span className="text-indigo-400 font-bold ml-1">↺ REPEAT</span>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('labs')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'labs'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>Interactive Security Labs</span>
        </button>

        <button
          onClick={() => setActiveTab('threat-model')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'threat-model'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>Threat Modeling Studio (STRIDE)</span>
        </button>

        <button
          onClick={() => setActiveTab('readiness-gate')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'readiness-gate'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Production Readiness Gate</span>
        </button>

        <button
          onClick={() => setActiveTab('lifecycle')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'lifecycle'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Incident & Continuous Ops</span>
        </button>
      </div>

      {/* TAB 1: INTERACTIVE SECURITY LABS */}
      {activeTab === 'labs' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar: Lab Selection */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
              Pilihan Security Lab ({SECURITY_LABS.length})
            </h3>
            <div className="space-y-2.5">
              {SECURITY_LABS.map((lab) => {
                const labCompleted = userProgress.completedLessons.includes(lab.id);
                const isCurrent = lab.id === selectedLab.id;
                return (
                  <button
                    key={lab.id}
                    onClick={() => handleSelectLab(lab)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      isCurrent
                        ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-semibold text-sm text-slate-900 dark:text-slate-100 line-clamp-1">
                        {lab.title}
                      </div>
                      {labCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 shrink-0">
                          +{lab.xpReward} XP
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                      {lab.overview}
                    </p>
                    <div className="flex items-center gap-2 mt-3 text-[11px]">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                        {lab.category.toUpperCase()}
                      </span>
                      <span className={`px-2 py-0.5 rounded-md font-medium ${
                        lab.difficulty === 'Beginner' 
                          ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400'
                          : 'bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400'
                      }`}>
                        {lab.difficulty}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Main Panel: Active Lab Environment */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                      {selectedLab.category.toUpperCase()} LAB
                    </span>
                    <span className="text-xs text-slate-500">Reward: +{selectedLab.xpReward} XP</span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                    {selectedLab.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRunExploit}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50 hover:bg-rose-100 flex items-center gap-1.5 transition-colors"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Tes Vektor Ancaman</span>
                  </button>
                  <button
                    onClick={handleRunTests}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex items-center gap-1.5 transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Verifikasi Perbaikan</span>
                  </button>
                </div>
              </div>

              {/* Lab Overview & Exploit Trigger Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                  <div className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Deskripsi Kerentanan:</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {selectedLab.vulnerabilityDescription}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 space-y-1.5">
                  <div className="font-bold text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Dampak Risiko & Contoh Exploit:</span>
                  </div>
                  <p className="text-rose-600 dark:text-rose-400 font-mono text-[11px] break-all">
                    {selectedLab.exploitPayloadExample}
                  </p>
                </div>
              </div>

              {/* Code Editor */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-indigo-500" />
                    <span>{selectedLab.files[0].name}</span>
                  </div>
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-medium"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{showHint ? 'Sembunyikan Petunjuk' : 'Lihat Petunjuk'}</span>
                  </button>
                </div>

                {showHint && (
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
                    <Zap className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                    <div>
                      <span className="font-bold">Petunjuk Remediasi:</span> {selectedLab.files[0].hint}
                    </div>
                  </div>
                )}

                <div className="relative rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700 bg-slate-950 text-slate-100 font-mono text-xs">
                  <textarea
                    value={labCode}
                    onChange={(e) => setLabCode(e.target.value)}
                    rows={12}
                    spellCheck={false}
                    className="w-full p-4 bg-transparent resize-y outline-none font-mono leading-relaxed text-slate-100 selection:bg-indigo-600/40"
                  />
                </div>
              </div>

              {/* Output / Exploit Simulation Log */}
              {exploitOutput && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400 space-y-1">
                  <pre className="whitespace-pre-wrap">{exploitOutput}</pre>
                </div>
              )}

              {/* Test Results */}
              {testResults && (
                <div className="space-y-2.5 pt-2">
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Hasil Pengujian Keamanan Defensif:
                  </div>
                  <div className="space-y-2">
                    {testResults.map((t, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                          t.passed
                            ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-300'
                            : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/40 text-rose-900 dark:text-rose-300'
                        }`}
                      >
                        {t.passed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <div className="font-semibold">{t.name}</div>
                          <div className="text-[11px] opacity-80 mt-0.5">{t.message}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Permanent Mitigation Guidance */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-bold text-slate-700 dark:text-slate-300">Panduan Mitigasi Permanen: </span>
                {selectedLab.mitigationGuide}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: THREAT MODELING STUDIO (STRIDE) */}
      {activeTab === 'threat-model' && (
        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  Interactive Threat Modeling Studio
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Analisis arsitektur sistem: User Client → Frontend (React) → API Gateway (Nginx) → Backend Service → Database.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Postur Keamanan Arsitektur:</span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                  {Object.values(activeControls).filter(Boolean).length} dari {SECURITY_CONTROLS.length} Kontrol Aktif
                </span>
              </div>
            </div>

            {/* Architecture Node Visualizer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-4">
              {THREAT_NODES.map((node, index) => {
                const isSelected = node.id === selectedNode.id;
                // Check if threats for this node are mitigated
                const nodeThreats = node.threats;
                const unmitigatedCount = nodeThreats.filter(t => !activeControls[t.controlId]).length;

                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`p-4 rounded-xl border text-left transition-all relative ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                        {node.type === 'client' && <Globe className="w-4 h-4" />}
                        {node.type === 'frontend' && <Layers className="w-4 h-4" />}
                        {node.type === 'gateway' && <Shield className="w-4 h-4" />}
                        {node.type === 'backend' && <Server className="w-4 h-4" />}
                        {node.type === 'database' && <Database className="w-4 h-4" />}
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">Step 0{index + 1}</span>
                    </div>

                    <div className="font-semibold text-xs text-slate-900 dark:text-slate-100 line-clamp-1">
                      {node.name}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                      {node.trustBoundary}
                    </div>

                    <div className="mt-3 flex items-center gap-1.5">
                      {unmitigatedCount === 0 ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                          <Check className="w-3 h-3" />
                          <span>Terkendali</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-600 dark:text-rose-400">
                          <AlertTriangle className="w-3 h-3" />
                          <span>{unmitigatedCount} Ancaman</span>
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Inspector & Controls Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Node Inspector */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                    {selectedNode.name}
                  </h3>
                  <div className="text-xs text-indigo-600 dark:text-indigo-400 font-mono mt-0.5">
                    Batas Kepercayaan: {selectedNode.trustBoundary}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
                  <div className="font-bold text-slate-700 dark:text-slate-200">Aset yang Dilindungi:</div>
                  <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-0.5">
                    {selectedNode.assets.map((asset, i) => (
                      <li key={i}>{asset}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
                  <div className="font-bold text-slate-700 dark:text-slate-200">Titik Masuk (Entry Points):</div>
                  <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-0.5">
                    {selectedNode.entryPoints.map((ep, i) => (
                      <li key={i}>{ep}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* STRIDE Threats Identified for this Node */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Daftar Ancaman STRIDE Teridentifikasi:
                </div>
                <div className="space-y-2.5">
                  {selectedNode.threats.map((threat) => {
                    const isMitigated = activeControls[threat.controlId];
                    return (
                      <div
                        key={threat.id}
                        className={`p-4 rounded-xl border text-xs space-y-2 transition-all ${
                          isMitigated
                            ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40'
                            : 'bg-rose-50/50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                              {threat.stride}
                            </span>
                            <span className="font-bold text-slate-900 dark:text-slate-100">
                              {threat.title}
                            </span>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            isMitigated
                              ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300'
                              : 'bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300'
                          }`}>
                            {isMitigated ? 'TERMITIGASI' : threat.severity}
                          </span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                          {threat.description}
                        </p>
                        <div className="text-[11px] flex items-center justify-between pt-1 border-t border-slate-200/60 dark:border-slate-800">
                          <span className="text-slate-500">Kontrol yang Dibutuhkan:</span>
                          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                            {threat.requiredControl}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Defensive Security Controls Matrix */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                  Matriks Kontrol Keamanan Sistem
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Aktifkan kontrol pertahanan untuk mengamati penurunan permukaan serangan arsitektur secara real-time.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {SECURITY_CONTROLS.map((ctrl) => {
                  const isActive = activeControls[ctrl.id];
                  return (
                    <div
                      key={ctrl.id}
                      onClick={() => toggleControl(ctrl.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isActive
                          ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-xs text-slate-900 dark:text-slate-100">
                          {ctrl.name}
                        </div>
                        <div className={`w-9 h-5 rounded-full transition-colors relative flex items-center px-0.5 ${
                          isActive ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
                        }`}>
                          <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                            isActive ? 'translate-x-4' : 'translate-x-0'
                          }`} />
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                        {ctrl.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PRODUCTION READINESS GATE */}
      {activeTab === 'readiness-gate' && (
        <div className="space-y-6">
          {/* Header Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                      Audit Gerbang Kesiapan Produksi (Go-Live Gate)
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Evaluasi checklist kepatuhan OWASP, DevSecOps, & UU PDP sebelum rilis ke publik.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleRunLiveAudit}
                  disabled={isAuditing}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin' : ''}`} />
                  <span>{isAuditing ? 'Memindai...' : 'Jalankan Audit Otomatis'}</span>
                </button>

                <button
                  onClick={handleExportReport}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
                  title="Salin laporan audit dalam format Markdown"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{copiedReportToast ? 'Laporan Disalin!' : 'Ekspor Laporan (.MD)'}</span>
                </button>
              </div>
            </div>

            {/* Live Audit Scanning State Banner */}
            <AnimatePresence>
              {isAuditing && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/50 space-y-2 overflow-hidden"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 animate-pulse text-indigo-500" />
                      <span>{auditStepMessage}</span>
                    </div>
                    <span className="font-mono text-[11px]">Siklus Verifikasi Otomatis</span>
                  </div>
                  <div className="w-full bg-indigo-200/60 dark:bg-indigo-900/60 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full animate-pulse w-3/4" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Audit Summary Banner */}
            {auditSummaryBanner && !isAuditing && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                    {auditSummaryBanner.score}%
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                      <span>Audit Sukses: Predikat {auditSummaryBanner.grade}</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="text-[11px] text-emerald-700/80 dark:text-emerald-400/80 mt-0.5">
                      {auditSummaryBanner.passed} Lolos • {auditSummaryBanner.warn} Peringatan (Review) • {auditSummaryBanner.fail} Gagal Kritis (0 Blocker). Dipindai pukul {auditSummaryBanner.timestamp}.
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200">
                    STATUS: SIAP DEPLOY KE PRODUKSI
                  </span>
                </div>
              </motion.div>
            )}

            {/* Filter Ribbons */}
            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                {/* Category Filters */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                  {[
                    { id: 'all', label: 'Semua Kategori' },
                    { id: 'Auth', label: 'Autentikasi & Sesi' },
                    { id: 'DataSecurity', label: 'Data & Enkripsi' },
                    { id: 'InfraHeaders', label: 'Header & Jaringan' },
                    { id: 'Testing', label: 'Testing & CI/CD' },
                    { id: 'Observability', label: 'Observabilitas' },
                    { id: 'A11y', label: 'Aksesibilitas' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setReadinessFilter(cat.id)}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                        readinessFilter === cat.id
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Status Filter Buttons */}
                <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
                  {(['all', 'PASS', 'WARN', 'FAIL'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        statusFilter === st
                          ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                          : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      {st === 'all' ? 'Semua' : st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stack & Verified count summary */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 pt-1">
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={stackOnlyFilter}
                      onChange={(e) => setStackOnlyFilter(e.target.checked)}
                      className="rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Khusus target stack ({selectedTechStack})</span>
                  </label>
                  <span>•</span>
                  <span>
                    Total Kriteria: {
                      PRODUCTION_READINESS_ITEMS
                        .filter(i => (!stackOnlyFilter || i.techStack.includes(selectedTechStack)))
                        .length
                    }
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-medium text-indigo-600 dark:text-indigo-400">
                    {Object.values(verifiedItems).filter(Boolean).length} dari {PRODUCTION_READINESS_ITEMS.length} terverifikasi manual
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Audit Checklist Items */}
          <div className="space-y-3">
            {PRODUCTION_READINESS_ITEMS
              .filter(item => readinessFilter === 'all' || item.category === readinessFilter)
              .filter(item => statusFilter === 'all' || item.status === statusFilter)
              .filter(item => !stackOnlyFilter || item.techStack.includes(selectedTechStack))
              .map((item) => {
                const isItemVerified = verifiedItems[item.id] ?? (item.status === 'PASS');
                return (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3.5 transition-all hover:border-slate-300 dark:hover:border-slate-700"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setVerifiedItems(prev => ({ ...prev, [item.id]: !isItemVerified }))}
                          className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                          title={isItemVerified ? 'Batalkan verifikasi' : 'Tandai terverifikasi manual'}
                        >
                          {isItemVerified ? (
                            <CheckSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                          ) : (
                            <Square className="w-5 h-5" />
                          )}
                        </button>

                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          item.status === 'PASS'
                            ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                            : item.status === 'WARN'
                            ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                            : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
                        }`}>
                          {item.status}
                        </span>

                        <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                          {item.title}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2 text-xs flex-wrap">
                        <span className="text-slate-500 dark:text-slate-400 font-mono">
                          {item.category}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-500 dark:text-slate-400">
                          Komponen: {item.affectedComponent}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className={`font-mono font-bold ${
                          item.severity === 'CRITICAL' ? 'text-rose-600 dark:text-rose-400' :
                          item.severity === 'HIGH' ? 'text-amber-600 dark:text-amber-400' :
                          'text-slate-500'
                        }`}>
                          {item.severity}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-8">
                      {item.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-100 dark:border-slate-800 pl-8">
                      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                        <div className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Bukti Audit & Konfirmasi:</span>
                        </div>
                        <div className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">{item.evidence}</div>
                        <div className="font-bold text-slate-700 dark:text-slate-300 pt-1">Mengapa Penting Bagi Bisnis & Keamanan:</div>
                        <div className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">{item.whyItMatters}</div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40 space-y-1.5">
                        <div className="font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-indigo-500" />
                          <span>Langkah Remediasi Defensif:</span>
                        </div>
                        <div className="text-indigo-800 dark:text-indigo-300/80 text-[11px] leading-relaxed">{item.remediation}</div>
                        <div className="font-bold text-indigo-900 dark:text-indigo-300 pt-1">Kriteria Pengujian Ulang (Retest QA):</div>
                        <div className="text-indigo-800 dark:text-indigo-300/80 text-[11px] leading-relaxed">{item.retestRequirement}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* TAB 4: INCIDENT RESPONSE & CONTINUOUS OPS */}
      {activeTab === 'lifecycle' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Simulasi Tanggap Darurat Insiden Keamanan (Incident Response)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Latihan simulasi penanganan krisis nyata: kebocoran kredensial payment gateway ke publik repositori.
              </p>
            </div>

            {/* Step sequence */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              {[
                { step: 1, title: '1. Deteksi & Identifikasi' },
                { step: 2, title: '2. Penyekatan (Revoke Kunci)' },
                { step: 3, title: '3. Audit Akses & Log' },
                { step: 4, title: '4. Pemulihan & Post-Mortem' },
              ].map((s) => (
                <div
                  key={s.step}
                  className={`p-3 rounded-xl border font-semibold ${
                    incidentStep >= s.step
                      ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {s.title}
                </div>
              ))}
            </div>

            {/* Interactive Scenario Action */}
            <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4 font-mono text-xs">
              <div className="text-emerald-400 font-bold flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                <span>Security Incident Operations Console</span>
              </div>
              <div className="space-y-1 text-slate-300 text-[11px] leading-relaxed max-h-48 overflow-y-auto">
                {incidentLog.map((log, idx) => (
                  <div key={idx}>{log}</div>
                ))}
              </div>

              {incidentStep === 1 && (
                <button
                  onClick={() => {
                    setIncidentStep(2);
                    setIncidentLog(prev => [
                      ...prev,
                      '[09:01:05 UTC] Operator mengonfirmasi kebocoran: Kunci sk_live_... ditemukan di commit f8b92a.',
                      '[09:01:40 UTC] LANGKAH DARURAT: Membuka dashboard provider dan mencabut kunci secara instan.'
                    ]);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white transition-colors"
                >
                  Langkah 1: Cabut (Revoke) API Key yang Bocor Segera
                </button>
              )}

              {incidentStep === 2 && (
                <button
                  onClick={() => {
                    setIncidentStep(3);
                    setIncidentLog(prev => [
                      ...prev,
                      '[09:02:15 UTC] Kunci lama telah dibekukan. Semua request eksternal dengan kunci tersebut ditolak 401.',
                      '[09:02:50 UTC] Memeriksa audit log: Tidak ada transaksi penarikan dana ilegal dalam 15 menit terakhir.'
                    ]);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                >
                  Langkah 2: Periksa Access Logs untuk Bukti Penyalahgunaan
                </button>
              )}

              {incidentStep === 3 && (
                <button
                  onClick={() => {
                    setIncidentStep(4);
                    setIncidentLog(prev => [
                      ...prev,
                      '[09:04:10 UTC] Generate API Secret baru dan inject ke Secret Manager runtime produksi.',
                      '[09:05:00 UTC] Pasang pre-commit hook Gitleaks agar rahasia tidak pernah ter-commit lagi.',
                      '✅ INSIDEN SELESAI: Dokumentasi Blameless Post-Mortem diterbitkan.'
                    ]);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                >
                  Langkah 3: Deploy Kunci Baru & Pasang Pre-Commit Secret Scanner
                </button>
              )}

              {incidentStep === 4 && (
                <div className="flex items-center gap-3">
                  <div className="text-emerald-400 font-bold">
                    Protokol Respons Insiden Selesai dengan Sukses!
                  </div>
                  <button
                    onClick={() => {
                      setIncidentStep(1);
                      setIncidentLog([
                        '[09:00:12 UTC] Bot scanner mendeteksi string API secret di public commit Git.'
                      ]);
                    }}
                    className="text-xs underline text-slate-400 hover:text-white"
                  >
                    Reset Simulasi
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
