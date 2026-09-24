import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  Play, 
  History, 
  UploadCloud,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Layers,
  Code
} from 'lucide-react';
import { 
  ProjectEvaluationDefinition, 
  EvaluationCriterion, 
  EvaluationRuleType, 
  ProjectSubmissionFiles,
  ProjectEvaluationResult
} from '../../types/projectEvaluation';
import { CODERA_PROJECTS } from '../../data/projectsData';
import { cmsDataService } from '../../services/curriculum/cmsDataService';

const RULE_TYPE_OPTIONS: { label: string; value: EvaluationRuleType; category: string }[] = [
  // HTML
  { label: 'HTML: Required Tag', value: 'requiredTag', category: 'HTML' },
  { label: 'HTML: Required Attribute', value: 'requiredAttribute', category: 'HTML' },
  { label: 'HTML: Required Text', value: 'requiredText', category: 'HTML' },
  { label: 'HTML: Element Count', value: 'elementCount', category: 'HTML' },
  { label: 'HTML: Semantic Structure', value: 'semanticStructure', category: 'HTML' },
  // CSS
  { label: 'CSS: Required Selector', value: 'requiredSelector', category: 'CSS' },
  { label: 'CSS: Required Property', value: 'requiredProperty', category: 'CSS' },
  { label: 'CSS: Property & Value Pattern', value: 'requiredPropertyValue', category: 'CSS' },
  { label: 'CSS: Media Query', value: 'mediaQuery', category: 'CSS' },
  { label: 'CSS: Layout Rule (Flex/Grid)', value: 'layoutRule', category: 'CSS' },
  // JS
  { label: 'JS: Required Function', value: 'requiredFunction', category: 'JavaScript' },
  { label: 'JS: Required Identifier', value: 'requiredIdentifier', category: 'JavaScript' },
  { label: 'JS: Required Function Call', value: 'requiredCall', category: 'JavaScript' },
  { label: 'JS: Event Listener', value: 'requiredEventListener', category: 'JavaScript' },
  { label: 'JS: Syntax Pattern (Regex)', value: 'syntaxPattern', category: 'JavaScript' },
  // Python
  { label: 'Python: Required Class', value: 'requiredClass', category: 'Python' },
  { label: 'Python: Required Import', value: 'requiredImport', category: 'Python' },
  { label: 'Python: AST Node Construct', value: 'astNode', category: 'Python' },
  { label: 'Python: Forbidden Construct', value: 'forbiddenConstruct', category: 'Python' },
  // General
  { label: 'General: Required File', value: 'requiredFile', category: 'General' },
  { label: 'General: Forbidden Pattern', value: 'forbiddenPattern', category: 'General' },
  { label: 'General: Source Length Check', value: 'sourceLength', category: 'General' },
  { label: 'General: File Contains Text', value: 'fileContains', category: 'General' },
  { label: 'General: File Does Not Contain', value: 'fileDoesNotContain', category: 'General' }
];

interface AdminProjectEvaluationEditorProps {
  initialProjectId?: string;
  onClose: () => void;
  onNotify?: (msg: { type: 'success' | 'error'; text: string }) => void;
}

export const AdminProjectEvaluationEditor: React.FC<AdminProjectEvaluationEditorProps> = ({
  initialProjectId = 'proj-guided-1',
  onClose,
  onNotify
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(initialProjectId);
  const [activeTab, setActiveTab] = useState<'criteria' | 'preview' | 'history'>('criteria');
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [publishing, setPublishing] = useState<boolean>(false);
  const [previewing, setPreviewing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Evaluation Definition State
  const [definition, setDefinition] = useState<ProjectEvaluationDefinition>({
    projectId: initialProjectId,
    version: 1,
    passingScore: 70,
    status: 'draft',
    updatedAt: new Date().toISOString(),
    criteria: []
  });

  // Version History State
  const [versionHistory, setVersionHistory] = useState<ProjectEvaluationDefinition[]>([]);

  // Preview Sandbox State
  const [previewFiles, setPreviewFiles] = useState<ProjectSubmissionFiles>({
    html: '',
    css: '',
    js: '',
    py: ''
  });
  const [previewResult, setPreviewResult] = useState<ProjectEvaluationResult | null>(null);

  useEffect(() => {
    loadProjectEvaluation(selectedProjectId);
  }, [selectedProjectId]);

  const loadProjectEvaluation = async (pId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await cmsDataService.getProjectEvaluation(pId);
      if (data && data.evaluationDefinition) {
        setDefinition(data.evaluationDefinition);
      }
      if (data && data.versions) {
        setVersionHistory(data.versions);
      }
      // Populate default preview starter code if empty
      const projectMeta = CODERA_PROJECTS.find(p => p.id === pId);
      if (projectMeta) {
        setPreviewFiles({
          html: projectMeta.starterHtml || '',
          css: projectMeta.starterCss || '',
          js: projectMeta.starterJs || '',
          py: projectMeta.starterPy || ''
        });
      }
    } catch (err: any) {
      setError(err.message || 'Gagal memuat aturan evaluasi proyek');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCriterion = () => {
    const newId = `crit-${Date.now().toString(36).substring(2, 6)}`;
    const newCrit: EvaluationCriterion = {
      id: newId,
      title: 'Kriteria Evaluasi Baru',
      type: 'requiredTag',
      weight: 20,
      publicFeedback: 'Pastikan elemen yang diperlukan sudah dibuat sesuai instruksi proyek.',
      privateConfig: {
        targetFile: 'html',
        rule: 'requiredTag',
        parameters: { tag: 'div', minCount: 1 }
      }
    };
    setDefinition(prev => ({
      ...prev,
      criteria: [...prev.criteria, newCrit]
    }));
  };

  const handleUpdateCriterion = (index: number, updates: Partial<EvaluationCriterion>) => {
    setDefinition(prev => {
      const nextCriteria = [...prev.criteria];
      nextCriteria[index] = { ...nextCriteria[index], ...updates };
      return { ...prev, criteria: nextCriteria };
    });
  };

  const handleUpdatePrivateConfig = (index: number, configUpdates: Partial<EvaluationCriterion['privateConfig']>) => {
    setDefinition(prev => {
      const nextCriteria = [...prev.criteria];
      const curCrit = nextCriteria[index];
      nextCriteria[index] = {
        ...curCrit,
        privateConfig: {
          ...curCrit.privateConfig,
          ...configUpdates,
          parameters: {
            ...(curCrit.privateConfig.parameters || {}),
            ...(configUpdates.parameters || {})
          }
        }
      };
      return { ...prev, criteria: nextCriteria };
    });
  };

  const handleRemoveCriterion = (index: number) => {
    setDefinition(prev => ({
      ...prev,
      criteria: prev.criteria.filter((_, i) => i !== index)
    }));
  };

  const handleMoveCriterion = (index: number, direction: 'up' | 'down') => {
    setDefinition(prev => {
      const nextCriteria = [...prev.criteria];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= nextCriteria.length) return prev;
      const temp = nextCriteria[index];
      nextCriteria[index] = nextCriteria[targetIndex];
      nextCriteria[targetIndex] = temp;
      return { ...prev, criteria: nextCriteria };
    });
  };

  const totalWeight = definition.criteria.reduce((acc, c) => acc + (Number(c.weight) || 0), 0);

  const handleSaveDraft = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await cmsDataService.saveProjectEvaluationDraft(selectedProjectId, {
        ...definition,
        status: 'draft'
      });
      setDefinition(res.evaluationDefinition);
      if (onNotify) onNotify({ type: 'success', text: 'Draf aturan evaluasi berhasil disimpan.' });
    } catch (err: any) {
      setError(err.message || 'Gagal menyimpan draf');
      if (onNotify) onNotify({ type: 'error', text: err.message || 'Gagal menyimpan draf' });
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    setPublishing(true);
    setError(null);
    try {
      const res = await cmsDataService.publishProjectEvaluation(selectedProjectId, definition);
      setDefinition(res.evaluationDefinition);
      await loadProjectEvaluation(selectedProjectId);
      if (onNotify) onNotify({ type: 'success', text: `Versi evaluasi v${res.version} berhasil dipublikasikan!` });
    } catch (err: any) {
      setError(err.message || 'Gagal mempublikasikan aturan evaluasi');
      if (onNotify) onNotify({ type: 'error', text: err.message || 'Gagal mempublikasikan aturan' });
    } finally {
      setPublishing(false);
    }
  };

  const handleRunPreview = async () => {
    setPreviewing(true);
    setError(null);
    try {
      const res = await cmsDataService.previewProjectEvaluation(selectedProjectId, definition, previewFiles);
      setPreviewResult(res.result);
      if (onNotify) onNotify({ type: 'success', text: `Uji evaluasi selesai: Skor ${res.result.score}/100 (${res.result.passed ? 'LULUS' : 'BELUM LULUS'})` });
    } catch (err: any) {
      setError(err.message || 'Gagal menjalankan uji evaluasi');
    } finally {
      setPreviewing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 font-sans">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-6xl h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-white">Private Evaluator Rules Engine</h2>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                  definition.status === 'published' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}>
                  {definition.status.toUpperCase()} (v{definition.version})
                </span>
              </div>
              <p className="text-xs text-slate-400">Konfigurasi aturan evaluasi deklaratif server-authoritative yang aman dan terisolasi.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Project Selector */}
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-amber-500"
            >
              {CODERA_PROJECTS.map(p => (
                <option key={p.id} value={p.id}>
                  {p.title} ({p.category.toUpperCase()})
                </option>
              ))}
            </select>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation & Meta Controls */}
        <div className="px-6 py-2.5 bg-slate-900/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('criteria')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                activeTab === 'criteria' ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              Aturan Kriteria ({definition.criteria.length})
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                activeTab === 'preview' ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              Uji & Pratinjau Server
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                activeTab === 'history' ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              Riwayat Versi ({versionHistory.length})
            </button>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Passing Score:</span>
              <input
                type="number"
                min="1"
                max="100"
                value={definition.passingScore}
                onChange={(e) => setDefinition(prev => ({ ...prev, passingScore: Math.min(100, Math.max(1, Number(e.target.value) || 70)) }))}
                className="w-16 px-2 py-1 bg-slate-800 border border-slate-700 rounded-lg text-center font-bold text-white focus:outline-none focus:border-amber-500"
              />
              <span className="text-slate-400">/ 100</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Total Bobot:</span>
              <span className={`font-bold px-2 py-0.5 rounded-md ${totalWeight === 100 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                {totalWeight} {totalWeight === 100 ? '✓' : '(Normalisasi Otomatis)'}
              </span>
            </div>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center space-y-3 text-slate-400">
              <RefreshCw className="w-8 h-8 animate-spin text-amber-500" />
              <p className="text-xs">Memuat definisi evaluasi proyek...</p>
            </div>
          ) : activeTab === 'criteria' ? (
            <div className="space-y-4 max-w-5xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Daftar Kriteria Evaluasi Deklaratif</h3>
                  <p className="text-xs text-slate-400">Aturan dievaluasi secara statis pada server tanpa menjalankan kode sembarangan.</p>
                </div>
                <button
                  onClick={handleAddCriterion}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-amber-600/20"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Kriteria</span>
                </button>
              </div>

              {definition.criteria.length === 0 ? (
                <div className="p-8 rounded-2xl bg-slate-950/60 border border-slate-800 text-center space-y-3">
                  <div className="text-3xl">📋</div>
                  <h4 className="text-sm font-bold text-slate-300">Belum Ada Kriteria Evaluasi</h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Tambahkan aturan evaluasi pertama Anda untuk memverifikasi struktur kode siswa secara otomatis dan aman.
                  </p>
                  <button
                    onClick={handleAddCriterion}
                    className="px-4 py-2 bg-amber-600 text-white text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Tambah Kriteria Sekarang
                  </button>
                </div>
              ) : (
                definition.criteria.map((crit, idx) => {
                  const ruleType = crit.privateConfig?.rule || crit.type;
                  const params = crit.privateConfig?.parameters || {};
                  const targetFile = crit.privateConfig?.targetFile || 'html';

                  return (
                    <div key={crit.id || idx} className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4 hover:border-slate-700 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-2 flex-1">
                          <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <input
                            type="text"
                            value={crit.title}
                            onChange={(e) => handleUpdateCriterion(idx, { title: e.target.value })}
                            placeholder="Judul Kriteria (e.g., Struktur Semantik Kartu Profil)"
                            className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-amber-500"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-xl border border-slate-800 text-xs">
                            <span className="text-slate-400">Bobot:</span>
                            <input
                              type="number"
                              min="1"
                              max="100"
                              value={crit.weight}
                              onChange={(e) => handleUpdateCriterion(idx, { weight: Math.max(1, Number(e.target.value) || 10) })}
                              className="w-12 text-center font-bold text-amber-400 bg-transparent focus:outline-none"
                            />
                          </div>

                          <div className="flex items-center border border-slate-800 rounded-xl overflow-hidden bg-slate-900">
                            <button
                              disabled={idx === 0}
                              onClick={() => handleMoveCriterion(idx, 'up')}
                              className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                            >
                              <ChevronUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              disabled={idx === definition.criteria.length - 1}
                              onClick={() => handleMoveCriterion(idx, 'down')}
                              className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                            >
                              <ChevronDown className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            onClick={() => handleRemoveCriterion(idx)}
                            className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Rule Type & Target File Config */}
                      <div className="grid sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-400 mb-1">Tipe Aturan Deklaratif (Rule Type)</label>
                          <select
                            value={ruleType}
                            onChange={(e) => {
                              const newRule = e.target.value as EvaluationRuleType;
                              handleUpdateCriterion(idx, { type: newRule });
                              handleUpdatePrivateConfig(idx, { rule: newRule });
                            }}
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-medium focus:outline-none focus:border-amber-500"
                          >
                            {RULE_TYPE_OPTIONS.map(opt => (
                              <option key={opt.value} value={opt.value}>
                                [{opt.category}] {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-400 mb-1">Target File Proyek</label>
                          <select
                            value={targetFile}
                            onChange={(e) => handleUpdatePrivateConfig(idx, { targetFile: e.target.value as any })}
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-medium focus:outline-none focus:border-amber-500"
                          >
                            <option value="html">HTML (index.html)</option>
                            <option value="css">CSS (style.css)</option>
                            <option value="js">JavaScript (app.js / main.js)</option>
                            <option value="py">Python (main.py / app.py)</option>
                          </select>
                        </div>
                      </div>

                      {/* Rule Specific Parameters */}
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400">Parameter Aturan Rahasia (Server-Only)</span>
                        
                        {ruleType === 'requiredTag' && (
                          <div className="grid sm:grid-cols-2 gap-2">
                            <div>
                              <span className="text-[11px] text-slate-400">Tag HTML:</span>
                              <input
                                type="text"
                                value={params.tag || ''}
                                onChange={(e) => handleUpdatePrivateConfig(idx, { parameters: { tag: e.target.value } })}
                                placeholder="article, header, form, dll."
                                className="w-full mt-1 px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs"
                              />
                            </div>
                            <div>
                              <span className="text-[11px] text-slate-400">Jumlah Minimal (minCount):</span>
                              <input
                                type="number"
                                min="1"
                                value={params.minCount || 1}
                                onChange={(e) => handleUpdatePrivateConfig(idx, { parameters: { minCount: Number(e.target.value) || 1 } })}
                                className="w-full mt-1 px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs"
                              />
                            </div>
                          </div>
                        )}

                        {ruleType === 'requiredAttribute' && (
                          <div className="grid sm:grid-cols-3 gap-2">
                            <div>
                              <span className="text-[11px] text-slate-400">Tag:</span>
                              <input
                                type="text"
                                value={params.tag || ''}
                                onChange={(e) => handleUpdatePrivateConfig(idx, { parameters: { tag: e.target.value } })}
                                placeholder="img, input, form"
                                className="w-full mt-1 px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs"
                              />
                            </div>
                            <div>
                              <span className="text-[11px] text-slate-400">Nama Atribut:</span>
                              <input
                                type="text"
                                value={params.attribute || ''}
                                onChange={(e) => handleUpdatePrivateConfig(idx, { parameters: { attribute: e.target.value } })}
                                placeholder="alt, required, placeholder"
                                className="w-full mt-1 px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs"
                              />
                            </div>
                            <div>
                              <span className="text-[11px] text-slate-400">Pola Nilai (Opsional):</span>
                              <input
                                type="text"
                                value={params.valuePattern || ''}
                                onChange={(e) => handleUpdatePrivateConfig(idx, { parameters: { valuePattern: e.target.value } })}
                                placeholder="dev-card, submit"
                                className="w-full mt-1 px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs"
                              />
                            </div>
                          </div>
                        )}

                        {ruleType === 'requiredProperty' && (
                          <div className="grid sm:grid-cols-2 gap-2">
                            <div>
                              <span className="text-[11px] text-slate-400">Properti CSS:</span>
                              <input
                                type="text"
                                value={params.property || ''}
                                onChange={(e) => handleUpdatePrivateConfig(idx, { parameters: { property: e.target.value } })}
                                placeholder="display, border-radius, box-shadow"
                                className="w-full mt-1 px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs"
                              />
                            </div>
                            <div>
                              <span className="text-[11px] text-slate-400">Pola Nilai (Opsional):</span>
                              <input
                                type="text"
                                value={params.valuePattern || ''}
                                onChange={(e) => handleUpdatePrivateConfig(idx, { parameters: { valuePattern: e.target.value } })}
                                placeholder="flex|grid, 12px"
                                className="w-full mt-1 px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs"
                              />
                            </div>
                          </div>
                        )}

                        {ruleType === 'layoutRule' && (
                          <div>
                            <span className="text-[11px] text-slate-400">Tipe Layout:</span>
                            <select
                              value={params.displayType || 'flex'}
                              onChange={(e) => handleUpdatePrivateConfig(idx, { parameters: { displayType: e.target.value as any } })}
                              className="w-full mt-1 px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs"
                            >
                              <option value="flex">Flexbox (display: flex)</option>
                              <option value="grid">CSS Grid (display: grid)</option>
                            </select>
                          </div>
                        )}

                        {ruleType === 'requiredFunction' && (
                          <div>
                            <span className="text-[11px] text-slate-400">Nama Fungsi:</span>
                            <input
                              type="text"
                              value={params.functionName || ''}
                              onChange={(e) => handleUpdatePrivateConfig(idx, { parameters: { functionName: e.target.value } })}
                              placeholder="create_task, handleSubmit, calculateTotal"
                              className="w-full mt-1 px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs"
                            />
                          </div>
                        )}

                        {ruleType === 'requiredEventListener' && (
                          <div>
                            <span className="text-[11px] text-slate-400">Tipe Event:</span>
                            <input
                              type="text"
                              value={params.eventType || ''}
                              onChange={(e) => handleUpdatePrivateConfig(idx, { parameters: { eventType: e.target.value } })}
                              placeholder="click, change, submit, dragstart"
                              className="w-full mt-1 px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs"
                            />
                          </div>
                        )}

                        {ruleType === 'forbiddenConstruct' && (
                          <div>
                            <span className="text-[11px] text-slate-400">Pola Terlarang (pisahkan koma):</span>
                            <input
                              type="text"
                              value={(params.disallowedPatterns || []).join(', ')}
                              onChange={(e) => handleUpdatePrivateConfig(idx, { 
                                parameters: { 
                                  disallowedPatterns: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                                } 
                              })}
                              placeholder="os.system, subprocess, eval, exec, socket"
                              className="w-full mt-1 px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs"
                            />
                          </div>
                        )}

                        {/* Fallback pattern input */}
                        {['syntaxPattern', 'regex_pattern', 'mediaQuery', 'semanticStructure', 'html_structure', 'css_style', 'js_syntax', 'py_ast'].includes(ruleType) && (
                          <div>
                            <span className="text-[11px] text-slate-400">Pola Regex / Teks Kunci:</span>
                            <input
                              type="text"
                              value={params.pattern || (crit.privateConfig?.requiredPatterns ? crit.privateConfig.requiredPatterns.join(', ') : '')}
                              onChange={(e) => handleUpdatePrivateConfig(idx, { 
                                parameters: { pattern: e.target.value },
                                requiredPatterns: [e.target.value]
                              })}
                              placeholder="Pola pencocokan (e.g. @media, addEventListener, class\s+\w+)"
                              className="w-full mt-1 px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs"
                            />
                          </div>
                        )}
                      </div>

                      {/* Public Feedback */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">
                          Umpan Balik Publik (Public Feedback Siswa)
                        </label>
                        <input
                          type="text"
                          value={crit.publicFeedback}
                          onChange={(e) => handleUpdateCriterion(idx, { publicFeedback: e.target.value })}
                          placeholder="Pesan petunjuk yang akan ditampilkan ke siswa tanpa membocorkan jawaban rahasia"
                          className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          ) : activeTab === 'preview' ? (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Uji Coba Evaluasi Server Terisolasi</h3>
                  <p className="text-xs text-slate-400">Masukkan sampel kode untuk melihat hasil evaluasi sebelum mempublikasikan versi baru.</p>
                </div>
                <button
                  disabled={previewing}
                  onClick={handleRunPreview}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-600/20 disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{previewing ? 'Mengevaluasi...' : 'Jalankan Uji Evaluasi'}</span>
                </button>
              </div>

              {/* Sample Files Editor */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-amber-400">HTML (index.html)</span>
                  <textarea
                    rows={8}
                    value={previewFiles.html || ''}
                    onChange={(e) => setPreviewFiles(p => ({ ...p, html: e.target.value }))}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                    placeholder="<article class='dev-card'><header><h1>Nama</h1></header></article>"
                  />
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-blue-400">CSS (style.css)</span>
                  <textarea
                    rows={8}
                    value={previewFiles.css || ''}
                    onChange={(e) => setPreviewFiles(p => ({ ...p, css: e.target.value }))}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                    placeholder=".dev-card { display: flex; border-radius: 12px; }"
                  />
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-yellow-400">JavaScript (app.js)</span>
                  <textarea
                    rows={8}
                    value={previewFiles.js || ''}
                    onChange={(e) => setPreviewFiles(p => ({ ...p, js: e.target.value }))}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                    placeholder="button.addEventListener('click', () => { ... });"
                  />
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-emerald-400">Python (main.py)</span>
                  <textarea
                    rows={8}
                    value={previewFiles.py || ''}
                    onChange={(e) => setPreviewFiles(p => ({ ...p, py: e.target.value }))}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                    placeholder="class Task:\n    def __init__(self, title):\n        self.title = title"
                  />
                </div>
              </div>

              {/* Preview Result Card */}
              {previewResult && (
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base ${
                        previewResult.passed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {previewResult.score}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Hasil Uji Evaluasi Server</h4>
                        <p className="text-xs text-slate-400">{previewResult.feedback}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase ${
                      previewResult.passed ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}>
                      {previewResult.passed ? 'LULUS (PASS)' : 'BELUM LULUS (FAIL)'}
                    </span>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    {previewResult.criteriaResults.map((cr, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start justify-between gap-3 text-xs">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={cr.passed ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                              {cr.passed ? '✓' : '✗'}
                            </span>
                            <span className="font-bold text-white">{cr.title}</span>
                          </div>
                          <p className="text-[11px] text-slate-400 pl-4">{cr.feedback}</p>
                        </div>
                        <span className="text-slate-500 font-mono text-[11px]">Bobot: {cr.weight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4 max-w-5xl mx-auto">
              <h3 className="text-sm font-bold text-white">Riwayat Versi Publikasi Evaluator</h3>
              <p className="text-xs text-slate-400">Snapshot versi publikasi bersifat kekal (immutable) untuk menjaga konsistensi riwayat submit siswa.</p>

              {versionHistory.length === 0 ? (
                <div className="p-8 rounded-2xl bg-slate-950/60 border border-slate-800 text-center text-xs text-slate-500">
                  Belum ada snapshot riwayat versi untuk proyek ini.
                </div>
              ) : (
                <div className="space-y-3">
                  {versionHistory.map((v, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                          v{v.version}
                        </div>
                        <div>
                          <div className="font-bold text-white">Versi {v.version} ({v.criteria?.length || 0} Kriteria)</div>
                          <div className="text-[11px] text-slate-400">
                            Passing Score: {v.passingScore}% • Diperbarui: {new Date(v.updatedAt).toLocaleString('id-ID')}
                          </div>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-bold text-[10px] uppercase">
                        Immutable Snapshot
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Tutup
          </button>

          <div className="flex items-center gap-3">
            <button
              disabled={saving || publishing}
              onClick={handleSaveDraft}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? 'Menyimpan...' : 'Simpan Draf'}</span>
            </button>

            <button
              disabled={saving || publishing}
              onClick={handlePublish}
              className="px-5 py-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-black rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-600/30 disabled:opacity-50"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>{publishing ? 'Memvalidasi & Menerbitkan...' : 'Publikasikan Versi Baru'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
