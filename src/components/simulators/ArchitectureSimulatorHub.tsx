import React, { useState, useEffect, useRef } from 'react';
import { 
  Layers, 
  Cpu, 
  Database, 
  Activity, 
  ShieldAlert, 
  RotateCcw, 
  Play, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  TrendingUp, 
  Server, 
  Network, 
  RefreshCw, 
  Zap, 
  Sliders, 
  FileText, 
  Lock, 
  Radio, 
  Terminal, 
  Compass,
  Flame,
  Check,
  Split,
  ChevronRight,
  Eye,
  BarChart2
} from 'lucide-react';
import { analyticsService } from '../../services/analytics';

export type SimulatorType = 
  | 'explorer' 
  | 'tradeoff' 
  | 'cache' 
  | 'queue' 
  | 'distributed' 
  | 'cap' 
  | 'scalability' 
  | 'chaos' 
  | 'observability' 
  | 'system-design';

interface SimulatorTab {
  id: SimulatorType;
  title: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SIMULATOR_TABS: SimulatorTab[] = [
  { id: 'explorer', title: '1. Architecture Explorer', badge: 'TOPOLOGY', icon: Layers },
  { id: 'tradeoff', title: '2. Trade-off Simulator', badge: 'PACELC', icon: Sliders },
  { id: 'cache', title: '3. Cache Simulator', badge: 'LRU/TTL', icon: Database },
  { id: 'queue', title: '4. Message Queue', badge: 'KAFKA', icon: Radio },
  { id: 'distributed', title: '5. Distributed System', badge: 'GLOBAL', icon: Network },
  { id: 'cap', title: '6. CAP Theorem', badge: 'CP / AP', icon: Split },
  { id: 'scalability', title: '7. Scalability & RPS', badge: '50K RPS', icon: TrendingUp },
  { id: 'chaos', title: '8. Failure & Circuit Breaker', badge: 'RESILIENCE', icon: ShieldAlert },
  { id: 'observability', title: '9. Observability & Tracing', badge: 'OTEL', icon: Eye },
  { id: 'system-design', title: '10. System Design Lab', badge: 'DESIGN', icon: Compass },
];

interface ArchitectureSimulatorHubProps {
  initialSimulator?: SimulatorType;
  onRewardXp?: () => void;
}

export function ArchitectureSimulatorHub({ initialSimulator = 'explorer', onRewardXp }: ArchitectureSimulatorHubProps) {
  const [activeTab, setActiveTab] = useState<SimulatorType>(initialSimulator);
  const [completedSimulators, setCompletedSimulators] = useState<Set<SimulatorType>>(new Set());

  // Observational Telemetry: Observe simulator started
  useEffect(() => {
    try {
      analyticsService.trackSimulatorStarted(activeTab, activeTab, 'software-architecture');
    } catch {
      // Non-blocking
    }
  }, [activeTab]);

  const markCompleted = (sim: SimulatorType) => {
    setCompletedSimulators(prev => {
      const next = new Set(prev);
      if (!next.has(sim)) {
        next.add(sim);
        if (onRewardXp) onRewardXp();
        // Observational Telemetry: Observe simulator completed (Non-blocking)
        try {
          analyticsService.trackSimulatorCompleted(sim, sim, undefined, 'software-architecture');
        } catch {
          // Non-blocking
        }
      }
      return next;
    });
  };

  return (
    <div className="h-full flex flex-col bg-[#070b14] text-slate-100 font-sans overflow-hidden border border-slate-800 rounded-2xl shadow-2xl">
      {/* 1. Header Toolbar */}
      <div className="p-3 bg-[#0b0f19] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-black text-sm tracking-tight text-white">COMMANDEV Architecture Lab</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                10 Interactive Simulators
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Sandbox visual & matematis sistem terdistribusi skala produksi.</p>
          </div>
        </div>

        {/* Status Completed Pills */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs">
            <span className="text-slate-400">Kemajuan:</span>
            <span className="font-black text-indigo-400">{completedSimulators.size}/10</span>
            <span className="text-[10px] text-slate-500">Selesai</span>
          </div>
        </div>
      </div>

      {/* 2. Horizontal Simulator Tabs */}
      <div className="flex items-center gap-1.5 p-2 bg-[#090d17] border-b border-slate-800/80 overflow-x-auto custom-scrollbar">
        {SIMULATOR_TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isDone = completedSimulators.has(tab.id);
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-slate-800/50'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-indigo-400'}`} />
              <span>{tab.title}</span>
              {isDone ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 ml-1" />
              ) : (
                <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${isActive ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-800 text-slate-400'}`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 3. Active Simulator Render Container */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-[#050811]">
        {activeTab === 'explorer' && <ArchitectureExplorer onComplete={() => markCompleted('explorer')} />}
        {activeTab === 'tradeoff' && <TradeoffSimulator onComplete={() => markCompleted('tradeoff')} />}
        {activeTab === 'cache' && <CacheSimulator onComplete={() => markCompleted('cache')} />}
        {activeTab === 'queue' && <QueueSimulator onComplete={() => markCompleted('queue')} />}
        {activeTab === 'distributed' && <DistributedSystemSimulator onComplete={() => markCompleted('distributed')} />}
        {activeTab === 'cap' && <CapTheoremSimulator onComplete={() => markCompleted('cap')} />}
        {activeTab === 'scalability' && <ScalabilitySimulator onComplete={() => markCompleted('scalability')} />}
        {activeTab === 'chaos' && <ChaosSimulator onComplete={() => markCompleted('chaos')} />}
        {activeTab === 'observability' && <ObservabilitySimulator onComplete={() => markCompleted('observability')} />}
        {activeTab === 'system-design' && <SystemDesignLab onComplete={() => markCompleted('system-design')} />}
      </div>
    </div>
  );
}

/* =========================================================================
   1. ARCHITECTURE EXPLORER
   ========================================================================= */
function ArchitectureExplorer({ onComplete }: { onComplete: () => void }) {
  const [pattern, setPattern] = useState<'monolith' | 'layered' | 'hexagonal' | 'event' | 'microservices'>('hexagonal');
  const [selectedNode, setSelectedNode] = useState<string>('domain');

  const PATTERNS_DATA = {
    monolith: {
      name: 'Monolitik Klasik (Single Process)',
      instability: 0.15,
      coupling: 'Tinggi (Semua komponen berada dalam single deployable binary)',
      latency: 'Sangat Cepat (In-memory direct function call: <0.1ms)',
      deployRisk: 'Tinggi (Satu bug dapat merobohkan seluruh aplikasi)',
      nodes: [
        { id: 'ui', label: 'Web UI / Controller', type: 'presentation', ca: 0, ce: 1 },
        { id: 'logic', label: 'All-In-One Business Logic', type: 'domain', ca: 1, ce: 1 },
        { id: 'db', label: 'Single Monolithic Database', type: 'data', ca: 1, ce: 0 }
      ]
    },
    layered: {
      name: 'Layered Architecture (3-Tier / N-Tier)',
      instability: 0.35,
      coupling: 'Sedang (Aliran satu arah: Presentation -> Service -> DAO)',
      latency: 'Cepat (Call stack traversal + DB roundtrip: 5-15ms)',
      deployRisk: 'Sedang (Database shared bisa menjadi bottleneck)',
      nodes: [
        { id: 'controller', label: 'Presentation Layer (REST Controller)', type: 'presentation', ca: 0, ce: 1 },
        { id: 'service', label: 'Business Service Layer', type: 'domain', ca: 1, ce: 1 },
        { id: 'dao', label: 'Data Access Layer (DAO / Repository)', type: 'data', ca: 1, ce: 1 },
        { id: 'db', label: 'Enterprise Relational Database', type: 'data', ca: 1, ce: 0 }
      ]
    },
    hexagonal: {
      name: 'Hexagonal Architecture (Ports & Adapters)',
      instability: 0.05,
      coupling: 'Sangat Rendah (Core Domain terisolasi dari Web dan Database via Interface)',
      latency: 'Sangat Optimal (Zero unnecessary network hops, pure in-memory core)',
      deployRisk: 'Rendah (Dapat mengganti Postgres ke DynamoDB tanpa menyentuh Domain)',
      nodes: [
        { id: 'driver-http', label: 'Primary Inbound Adapter (REST / GraphQL)', type: 'presentation', ca: 0, ce: 1 },
        { id: 'inbound-port', label: 'Inbound Driver Port (Interface)', type: 'port', ca: 1, ce: 1 },
        { id: 'domain', label: 'Pure Core Domain (Entities & Use Cases)', type: 'domain', ca: 2, ce: 0 },
        { id: 'outbound-port', label: 'Outbound Driven Port (Repository Port)', type: 'port', ca: 1, ce: 1 },
        { id: 'driven-db', label: 'Secondary Outbound Adapter (PostgreSQL / Redis)', type: 'data', ca: 1, ce: 0 }
      ]
    },
    event: {
      name: 'Event-Driven Architecture (Pub/Sub & Event Sourcing)',
      instability: 0.50,
      coupling: 'Asynchronous Loose Coupling (Produsen dan Konsumen tidak saling kenal)',
      latency: 'Eventual (Throughput masif, latensi propagasi event 50-200ms)',
      deployRisk: 'Sangat Rendah (Layanan independen dapat di-deploy terpisah kapan saja)',
      nodes: [
        { id: 'order-producer', label: 'Order Producer Service', type: 'presentation', ca: 0, ce: 1 },
        { id: 'broker', label: 'Distributed Event Broker (Kafka / Pulsar)', type: 'broker', ca: 1, ce: 2 },
        { id: 'billing-consumer', label: 'Billing Consumer Worker', type: 'domain', ca: 1, ce: 0 },
        { id: 'inventory-consumer', label: 'Inventory Consumer Worker', type: 'domain', ca: 1, ce: 0 }
      ]
    },
    microservices: {
      name: 'Microservices & API Gateway Architecture',
      instability: 0.65,
      coupling: 'Network-Bounded Decoupled (Database per Service)',
      latency: 'Bervariasi (Network roundtrips antar service: 20-150ms)',
      deployRisk: 'Sangat Rendah (Canary deployment per microservice)',
      nodes: [
        { id: 'api-gw', label: 'Cloud API Gateway (BFF & Rate Limiter)', type: 'presentation', ca: 0, ce: 3 },
        { id: 'user-svc', label: 'User Microservice + Private DB', type: 'domain', ca: 1, ce: 0 },
        { id: 'order-svc', label: 'Order Microservice + Private DB', type: 'domain', ca: 1, ce: 0 },
        { id: 'payment-svc', label: 'Payment Microservice + Vault', type: 'domain', ca: 1, ce: 0 }
      ]
    }
  };

  const current = PATTERNS_DATA[pattern];

  return (
    <div className="space-y-4">
      {/* Pattern Selector */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(PATTERNS_DATA) as Array<keyof typeof PATTERNS_DATA>).map(k => (
          <button
            key={k}
            onClick={() => {
              setPattern(k);
              onComplete();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              pattern === k 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {PATTERNS_DATA[k].name.split('(')[0]}
          </button>
        ))}
      </div>

      {/* Main Visualizer Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Topology Graph Preview */}
        <div className="lg:col-span-2 p-5 bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-400">Visualisasi Node & Aliran Dependensi:</span>
            <span className="text-[11px] text-indigo-400 font-mono">Klik node untuk inspeksi</span>
          </div>

          {/* Interactive Topology Graph */}
          <div className="flex flex-col md:flex-row items-center justify-around gap-4 py-8 px-2 bg-slate-950/80 rounded-xl border border-slate-800/80">
            {current.nodes.map((n, i) => (
              <React.Fragment key={n.id}>
                <div
                  onClick={() => setSelectedNode(n.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col items-center text-center w-36 ${
                    selectedNode === n.id 
                      ? 'border-indigo-500 bg-indigo-950/40 ring-2 ring-indigo-500/50 shadow-lg' 
                      : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-1.5 font-mono text-xs font-bold">
                    {i + 1}
                  </div>
                  <span className="text-xs font-bold text-white line-clamp-2">{n.label}</span>
                  <div className="mt-2 text-[10px] text-slate-400 font-mono">
                    Ca: {n.ca} | Ce: {n.ce}
                  </div>
                </div>
                {i < current.nodes.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-slate-600 rotate-90 md:rotate-0 flex-shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Metrik Instabilitas Bar */}
          <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px]">Instability Index (I):</span>
              <span className="text-sm font-black text-indigo-400 font-mono">{current.instability}</span>
              <span className="text-[10px] text-slate-500 block">I = Ce / (Ca + Ce)</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Coupling Degree:</span>
              <span className="text-xs font-bold text-slate-200">{current.coupling.split('(')[0]}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Latency Profile:</span>
              <span className="text-xs font-bold text-emerald-400">{current.latency.split('(')[0]}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Deployment Blast Radius:</span>
              <span className="text-xs font-bold text-amber-400">{current.deployRisk.split('(')[0]}</span>
            </div>
          </div>
        </div>

        {/* Node Inspector Sidebar */}
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-black uppercase text-indigo-400 tracking-wider mb-2">Inspektur Arsitektur</h3>
            <h4 className="text-sm font-bold text-white mb-2">{current.name}</h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Pola ini dirancang untuk menyeimbangkan antara kecepatan pengembangan awal dengan kemudahan pemeliharaan dan skalabilitas jangka panjang.
            </p>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Node Terpilih:</span>
                <span className="text-white font-mono font-bold">{selectedNode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Pola Komunikasi:</span>
                <span className="text-indigo-300">Synchronous In-Memory</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Peluang Refaktor:</span>
                <span className="text-emerald-400 font-bold">Tinggi (Clean Boundary)</span>
              </div>
            </div>
          </div>

          <button
            onClick={onComplete}
            className="w-full mt-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-indigo-600/30"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Tandai Pemahaman Arsitektur Selesai (+20 XP)</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   2. TRADE-OFF SIMULATOR (PACELC & CAP)
   ========================================================================= */
function TradeoffSimulator({ onComplete }: { onComplete: () => void }) {
  const [consistency, setConsistency] = useState(80);
  const [availability, setAvailability] = useState(70);
  const [partitionTolerance, setPartitionTolerance] = useState(90);
  const [latencyTolerance, setLatencyTolerance] = useState(40);

  const getRecommendation = () => {
    if (consistency > 75 && availability < 60) {
      return {
        profile: 'CP System (Strict Consistency)',
        databases: 'CockroachDB, Google Cloud Spanner, PostgreSQL (Sync Replication)',
        analysis: 'Ketika terjadi partisi jaringan, sistem menolak request write yang tidak mencapai quorum demi menjaga konsistensi data absolut tanpa dirty reads.',
        useCase: 'Transaksi perbankan, saldo e-wallet, inventaris tiket konser.'
      };
    } else if (availability > 75 && consistency < 60) {
      return {
        profile: 'AP System (High Availability / Eventual Consistency)',
        databases: 'Apache Cassandra, Amazon DynamoDB, Couchbase',
        analysis: 'Sistem selalu menerima read/write pada node yang masih hidup meskipun terjadi network split, menerima resiko pembacaan data basi (stale data).',
        useCase: 'Feed media sosial, view counter, metrik IoT, streaming logs.'
      };
    } else {
      return {
        profile: 'Tunable Consistency / PACELC Balanced',
        databases: 'MongoDB (Configurable WriteConcern), Cassandra (Quorum Read/Write)',
        analysis: 'Menggunakan kuorum fleksibel: (W + R > N) untuk menjamin strong consistency secara selektif pada operasi finansial, dan eventual untuk operasi non-kritis.',
        useCase: 'E-commerce modern dengan mixed read-heavy & transactional write.'
      };
    }
  };

  const rec = getRecommendation();

  return (
    <div className="space-y-4">
      <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl">
        <h3 className="text-sm font-bold text-white mb-1">Simulasi Trade-off CAP & PACELC</h3>
        <p className="text-xs text-slate-400 mb-4">
          Geser parameter kebutuhan sistem Anda untuk melihat bagaimana trade-off mempengaruhi pemilihan database dan strategi konsistensi.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-bold">Consistency Target (C):</span>
                <span className="text-indigo-400 font-mono font-bold">{consistency}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={consistency}
                onChange={e => { setConsistency(Number(e.target.value)); onComplete(); }}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-bold">Availability Target (A):</span>
                <span className="text-indigo-400 font-mono font-bold">{availability}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={availability}
                onChange={e => { setAvailability(Number(e.target.value)); onComplete(); }}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-bold">Network Partition Risk (P):</span>
                <span className="text-indigo-400 font-mono font-bold">{partitionTolerance}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={partitionTolerance}
                onChange={e => { setPartitionTolerance(Number(e.target.value)); onComplete(); }}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">Rekomendasi Arsitektural:</span>
              <h4 className="text-base font-extrabold text-indigo-400 mb-2">{rec.profile}</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">{rec.analysis}</p>

              <div className="text-xs space-y-1.5">
                <div>
                  <span className="text-slate-400">Database Pilihan: </span>
                  <span className="text-white font-mono font-bold">{rec.databases}</span>
                </div>
                <div>
                  <span className="text-slate-400">Cocok Untuk: </span>
                  <span className="text-emerald-400">{rec.useCase}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setConsistency(80);
                setAvailability(70);
                setPartitionTolerance(90);
              }}
              className="mt-4 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg self-start flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Parameter</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   3. CACHE SIMULATOR (LRU / TTL / MUTEX)
   ========================================================================= */
function CacheSimulator({ onComplete }: { onComplete: () => void }) {
  interface CacheEntry {
    key: string;
    val: string;
    hits: number;
    ttl: number; // seconds remaining
  }

  const [capacity] = useState(4);
  const [cache, setCache] = useState<CacheEntry[]>([
    { key: 'user:101', val: 'Alice (Admin)', hits: 5, ttl: 45 },
    { key: 'user:102', val: 'Bob (Staff)', hits: 2, ttl: 30 },
    { key: 'prod:99', val: 'MacBook Pro M3', hits: 12, ttl: 55 }
  ]);
  const [hitCount, setHitCount] = useState(19);
  const [missCount, setMissCount] = useState(4);
  const [logs, setLogs] = useState<string[]>(['Cache initialized with 3 preloaded keys.']);
  const [inputKey, setInputKey] = useState('user:103');

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 8));
  };

  const readKey = (k: string) => {
    onComplete();
    const idx = cache.findIndex(c => c.key === k);
    if (idx !== -1) {
      // Hit
      const updated = [...cache];
      const entry = { ...updated[idx], hits: updated[idx].hits + 1 };
      // Move to front (LRU)
      updated.splice(idx, 1);
      updated.unshift(entry);
      setCache(updated);
      setHitCount(prev => prev + 1);
      addLog(`[CACHE HIT] Key "${k}" ditemukan -> "${entry.val}" (Hits: ${entry.hits})`);
    } else {
      // Miss -> Cache Aside: Fetch from DB and insert
      setMissCount(prev => prev + 1);
      addLog(`[CACHE MISS] Key "${k}" tidak ada di cache! Fetching dari Postgres (25ms)...`);
      const newVal = `Data for ${k} [DB Fetch]`;
      insertKey(k, newVal);
    }
  };

  const insertKey = (k: string, v: string) => {
    setCache(prev => {
      let copy = prev.filter(c => c.key !== k);
      if (copy.length >= capacity) {
        const evicted = copy.pop(); // Evict LRU (last item)
        addLog(`[LRU EVICTION] Cache penuh! Kunci "${evicted?.key}" dievaksi.`);
      }
      copy.unshift({ key: k, val: v, hits: 1, ttl: 60 });
      return copy;
    });
  };

  const totalReq = hitCount + missCount;
  const hitRatio = totalReq === 0 ? 0 : Math.round((hitCount / totalReq) * 100);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Cache Slots View */}
        <div className="lg:col-span-2 p-4 bg-slate-900/80 border border-slate-800 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-white">Cache Layer (Kapasitas: {capacity} Slot LRU)</h3>
              <p className="text-[11px] text-slate-400">Pola Cache-Aside dengan eviksi otomatis Least Recently Used.</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">Hit Ratio:</span>
              <span className="text-lg font-black text-emerald-400 font-mono">{hitRatio}%</span>
            </div>
          </div>

          {/* Slots */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {cache.map((entry, idx) => (
              <div 
                key={entry.key} 
                onClick={() => readKey(entry.key)}
                className="p-3 bg-slate-950 rounded-xl border border-slate-800 hover:border-indigo-500 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-mono font-bold text-indigo-400 group-hover:text-indigo-300">{entry.key}</span>
                  <span className="text-[10px] text-slate-500 font-mono">Rank #{idx + 1} (MRU)</span>
                </div>
                <div className="text-xs text-white truncate font-medium">{entry.val}</div>
                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-900">
                  <span>Hits: <strong className="text-slate-200">{entry.hits}</strong></span>
                  <span className="font-mono text-amber-400">TTL: {entry.ttl}s</span>
                </div>
              </div>
            ))}
            {Array.from({ length: Math.max(0, capacity - cache.length) }).map((_, i) => (
              <div key={i} className="p-3 rounded-xl border border-dashed border-slate-800 flex items-center justify-center text-slate-600 text-xs">
                Slot Kosong
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
            <input 
              type="text" 
              value={inputKey} 
              onChange={e => setInputKey(e.target.value)}
              placeholder="Masukkan key (misal: user:104)"
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white font-mono outline-none focus:border-indigo-500"
            />
            <button
              onClick={() => readKey(inputKey)}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Baca / Query Cache
            </button>
            <button
              onClick={() => {
                setCache([]);
                setHitCount(0);
                setMissCount(0);
                addLog('[FLUSHALL] Seluruh cache dibersihkan.');
              }}
              className="px-3 py-1.5 bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-900/60 rounded-xl text-xs font-bold transition-colors cursor-pointer ml-auto"
            >
              Flush Cache
            </button>
          </div>
        </div>

        {/* Activity Log */}
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col">
          <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-indigo-400" />
            <span>Cache Event Stream</span>
          </h4>
          <div className="flex-1 bg-slate-950 rounded-xl p-3 border border-slate-800 space-y-1.5 font-mono text-[11px] overflow-y-auto max-h-56">
            {logs.map((log, i) => (
              <div key={i} className="text-slate-300 leading-tight">
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   4. MESSAGE QUEUE SIMULATOR (KAFKA / RABBITMQ)
   ========================================================================= */
function QueueSimulator({ onComplete }: { onComplete: () => void }) {
  interface Message {
    id: string;
    topic: string;
    key: string;
    payload: string;
    partition: number;
    offset: number;
  }

  const [messages, setMessages] = useState<Message[]>([
    { id: 'm-1', topic: 'order.created', key: 'usr-9', payload: 'Order #9021 ($140)', partition: 0, offset: 0 },
    { id: 'm-2', topic: 'order.created', key: 'usr-4', payload: 'Order #9022 ($80)', partition: 1, offset: 0 },
    { id: 'm-3', topic: 'payment.success', key: 'usr-9', payload: 'Payment #441 Received', partition: 0, offset: 1 }
  ]);

  const [consumerGroupAOffset, setConsumerGroupAOffset] = useState<Record<number, number>>({ 0: 2, 1: 1 });
  const [dlq, setDlq] = useState<string[]>([]);
  const [isPublishing, setIsPublishing] = useState(false);

  const publishMessage = () => {
    onComplete();
    setIsPublishing(true);
    const newId = 'm-' + (messages.length + 1);
    const p = Math.floor(Math.random() * 2);
    const offset = messages.filter(m => m.partition === p).length;

    const newMsg: Message = {
      id: newId,
      topic: 'order.created',
      key: `usr-${Math.floor(Math.random() * 50)}`,
      payload: `Cart Checkout Total: $${Math.floor(Math.random() * 300) + 20}`,
      partition: p,
      offset
    };

    setMessages(prev => [...prev, newMsg]);
    setTimeout(() => setIsPublishing(false), 200);
  };

  const consumeNext = () => {
    onComplete();
    setConsumerGroupAOffset(prev => ({
      ...prev,
      0: prev[0] + 1,
      1: prev[1] + 1
    }));
  };

  const injectPoisonPill = () => {
    onComplete();
    setDlq(prev => [...prev, `Poison Pill payload: Malformed JSON at offset ${messages.length}`]);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Partitions & Topics */}
        <div className="lg:col-span-2 p-4 bg-slate-900/80 border border-slate-800 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-white">Topic: order.created (2 Partitions)</h3>
              <p className="text-[11px] text-slate-400">Pesan diarahkan berdasarkan hash partition key.</p>
            </div>
            <button
              onClick={publishMessage}
              disabled={isPublishing}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Publish Event Baru</span>
            </button>
          </div>

          {/* Partitions Visual */}
          <div className="space-y-3">
            {[0, 1].map(pId => {
              const partMsgs = messages.filter(m => m.partition === pId);
              return (
                <div key={pId} className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-indigo-400">Partition #{pId}</span>
                    <span className="text-[10px] text-slate-400 font-mono">Total Messages: {partMsgs.length}</span>
                  </div>
                  <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar py-1">
                    {partMsgs.map(m => (
                      <div key={m.id} className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-[11px] whitespace-nowrap min-w-[130px]">
                        <div className="font-mono text-indigo-300 font-bold">Offset #{m.offset}</div>
                        <div className="text-white text-xs truncate">{m.payload}</div>
                      </div>
                    ))}
                    {partMsgs.length === 0 && (
                      <span className="text-[11px] text-slate-600 italic">Antrean partisi kosong</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap gap-2">
            <button
              onClick={consumeNext}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Acknowledge & Commit Offset (Consumer Group A)
            </button>
            <button
              onClick={injectPoisonPill}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Simulasikan Pesan Corrupt ke DLQ
            </button>
          </div>
        </div>

        {/* Dead Letter Queue (DLQ) */}
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Dead Letter Queue (DLQ)</span>
            </h4>
            <p className="text-[11px] text-slate-400 mb-3">
              Pesan yang gagal diproses setelah N retry dialihkan ke DLQ untuk audit teknis tanpa memblokir partition lag.
            </p>
            <div className="space-y-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800 max-h-48 overflow-y-auto">
              {dlq.length === 0 ? (
                <span className="text-[11px] text-slate-500 italic block text-center py-4">Tidak ada pesan gagal di DLQ</span>
              ) : (
                dlq.map((item, idx) => (
                  <div key={idx} className="p-2 bg-rose-950/40 border border-rose-900/60 rounded-lg text-[10px] text-rose-300 font-mono">
                    {item}
                  </div>
                ))
              )}
            </div>
          </div>

          {dlq.length > 0 && (
            <button
              onClick={() => setDlq([])}
              className="mt-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Kosongkan DLQ
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   5. DISTRIBUTED SYSTEM SIMULATOR (GLOBAL REPLICATION & SPLIT BRAIN)
   ========================================================================= */
function DistributedSystemSimulator({ onComplete }: { onComplete: () => void }) {
  interface NodeStatus {
    id: string;
    region: string;
    role: 'Leader' | 'Follower';
    status: 'ONLINE' | 'ISOLATED' | 'DOWN';
    latencyMs: number;
    dataVersion: number;
  }

  const [nodes, setNodes] = useState<NodeStatus[]>([
    { id: 'node-us', region: 'us-east-1 (N. Virginia)', role: 'Leader', status: 'ONLINE', latencyMs: 2, dataVersion: 104 },
    { id: 'node-eu', region: 'eu-central-1 (Frankfurt)', role: 'Follower', status: 'ONLINE', latencyMs: 82, dataVersion: 104 },
    { id: 'node-ap', region: 'ap-southeast-1 (Singapore)', role: 'Follower', status: 'ONLINE', latencyMs: 145, dataVersion: 104 }
  ]);

  const [networkSplit, setNetworkSplit] = useState(false);

  const triggerWrite = () => {
    onComplete();
    setNodes(prev => prev.map(n => {
      if (n.status === 'ISOLATED' || n.status === 'DOWN') return n;
      return { ...n, dataVersion: n.dataVersion + 1 };
    }));
  };

  const togglePartition = () => {
    onComplete();
    setNetworkSplit(prev => {
      const next = !prev;
      setNodes(nList => nList.map(n => {
        if (n.id === 'node-ap') {
          return { ...n, status: next ? 'ISOLATED' : 'ONLINE' };
        }
        return n;
      }));
      return next;
    });
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-sm font-bold text-white">Cluster Multi-Region & Sinkronisasi Raft / Paxos</h3>
            <p className="text-[11px] text-slate-400">Replikasi data antar benua dengan deteksi quorum konsensus.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={triggerWrite}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
            >
              Kirim Write Request ke Leader
            </button>
            <button
              onClick={togglePartition}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                networkSplit ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {networkSplit ? 'Sambungkan Partisi Jaringan' : 'Putus Kabel Bawah Laut (Split Brain)'}
            </button>
          </div>
        </div>

        {/* Nodes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {nodes.map(n => (
            <div key={n.id} className={`p-4 rounded-xl border transition-all ${
              n.status === 'ISOLATED' 
                ? 'bg-rose-950/30 border-rose-900/80' 
                : 'bg-slate-950 border-slate-800'
            }`}>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-white">{n.region}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  n.role === 'Leader' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}>
                  {n.role}
                </span>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Status Jaringan:</span>
                  <span className={`font-bold ${n.status === 'ONLINE' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {n.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Round-trip Ping:</span>
                  <span className="text-slate-200 font-mono">{n.latencyMs}ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Log Index / Version:</span>
                  <span className="text-indigo-400 font-mono font-bold">v{n.dataVersion}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   6. CAP THEOREM SIMULATOR
   ========================================================================= */
function CapTheoremSimulator({ onComplete }: { onComplete: () => void }) {
  const [mode, setMode] = useState<'CP' | 'AP'>('CP');
  const [networkBroken, setNetworkBroken] = useState(false);
  const [nodeAValue, setNodeAValue] = useState('Active');
  const [nodeBValue, setNodeBValue] = useState('Active');
  const [responseLog, setResponseLog] = useState<string>('Sistem berjalan normal. Node A dan B tersinkronisasi.');

  const handleWriteToNodeB = () => {
    onComplete();
    if (!networkBroken) {
      setNodeAValue('Updated_V2');
      setNodeBValue('Updated_V2');
      setResponseLog('HTTP 200 OK: Data berhasil ditulis dan direplikasi ke kedua node.');
    } else {
      if (mode === 'CP') {
        // CP: Reject write to preserve consistency
        setResponseLog('HTTP 500 ERROR (CP Mode): Partisi jaringan aktif! Node B menolak penulisan karena kuorum tidak tercapai demi mencegah inkonsistensi.');
      } else {
        // AP: Accept write locally, risk divergence
        setNodeBValue('Updated_NodeB_Only');
        setResponseLog('HTTP 200 OK (AP Mode): Penulisan diterima di Node B, namun Node A masih membawa data basi (Stale Read)!');
      }
    }
  };

  return (
    <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-bold text-white">Simulasi Teorema CAP saat Partisi Jaringan</h3>
          <p className="text-[11px] text-slate-400">Pilih antara CP (Konsistensi Kuat) atau AP (Ketersediaan Tinggi).</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setMode('CP')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
              mode === 'CP' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Mode CP (Consistency + Partition)
          </button>
          <button
            onClick={() => setMode('AP')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
              mode === 'AP' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Mode AP (Availability + Partition)
          </button>
          <button
            onClick={() => setNetworkBroken(prev => !prev)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
              networkBroken ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            {networkBroken ? 'Sambung Kembali Node' : 'Putus Hubungan Antar Node'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center">
          <h4 className="text-xs font-bold text-slate-400 mb-1">Node Primer (A)</h4>
          <div className="text-base font-mono font-bold text-indigo-400">{nodeAValue}</div>
        </div>
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center">
          <h4 className="text-xs font-bold text-slate-400 mb-1">Node Sekunder Terisolasi (B)</h4>
          <div className="text-base font-mono font-bold text-indigo-400 mb-2">{nodeBValue}</div>
          <button
            onClick={handleWriteToNodeB}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors"
          >
            Tulis Nilai Baru ke Node B
          </button>
        </div>
      </div>

      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
        <span className="text-slate-500 block mb-0.5">Terminal Respons Klien:</span>
        {responseLog}
      </div>
    </div>
  );
}

/* =========================================================================
   7. SCALABILITY & RPS SIMULATOR (LOAD BALANCING & AUTO-SCALE)
   ========================================================================= */
function ScalabilitySimulator({ onComplete }: { onComplete: () => void }) {
  const [nodes, setNodes] = useState(2);
  const [rps, setRps] = useState(4000);
  const [algorithm, setAlgorithm] = useState<'round-robin' | 'least-conn' | 'consistent-hash'>('round-robin');

  const maxCapacityPerNode = 2500;
  const totalCapacity = nodes * maxCapacityPerNode;
  const loadPercentage = Math.round((rps / totalCapacity) * 100);
  const isOverloaded = loadPercentage > 100;
  const droppedRps = isOverloaded ? rps - totalCapacity : 0;
  const responseTimeMs = Math.round(15 + Math.pow(loadPercentage / 25, 2));

  return (
    <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-bold text-white">Simulasi Skalabilitas & Beban Request (RPS)</h3>
          <p className="text-[11px] text-slate-400">Uji ketahanan arsitektur di bawah lonjakan traffic produksi.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setNodes(prev => Math.max(1, prev - 1)); onComplete(); }}
            className="px-2.5 py-1 bg-slate-800 text-white text-xs font-bold rounded-lg cursor-pointer"
          >
            - Kurang Node
          </button>
          <span className="text-xs font-mono font-bold text-indigo-400">{nodes} Node Aktif</span>
          <button
            onClick={() => { setNodes(prev => Math.min(10, prev + 1)); onComplete(); }}
            className="px-2.5 py-1 bg-slate-800 text-white text-xs font-bold rounded-lg cursor-pointer"
          >
            + Tambah Node
          </button>
        </div>
      </div>

      <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
        <div className="flex justify-between text-xs">
          <span className="text-slate-300 font-bold">Simulasi Beban Traffic:</span>
          <span className="text-indigo-400 font-mono font-bold">{rps.toLocaleString()} RPS</span>
        </div>
        <input
          type="range"
          min="500"
          max="25000"
          step="500"
          value={rps}
          onChange={e => { setRps(Number(e.target.value)); onComplete(); }}
          className="w-full accent-indigo-500 cursor-pointer"
        />
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
          <span className="text-slate-400 block text-[10px]">Utilisasi Cluster:</span>
          <span className={`text-base font-black font-mono ${isOverloaded ? 'text-rose-400' : 'text-emerald-400'}`}>
            {loadPercentage}%
          </span>
        </div>
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
          <span className="text-slate-400 block text-[10px]">Response Time (p95):</span>
          <span className={`text-base font-black font-mono ${responseTimeMs > 200 ? 'text-amber-400' : 'text-slate-200'}`}>
            {responseTimeMs}ms
          </span>
        </div>
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
          <span className="text-slate-400 block text-[10px]">Total Kapasitas:</span>
          <span className="text-base font-black text-indigo-400 font-mono">{totalCapacity.toLocaleString()} RPS</span>
        </div>
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
          <span className="text-slate-400 block text-[10px]">Dropped Requests:</span>
          <span className={`text-base font-black font-mono ${droppedRps > 0 ? 'text-rose-400' : 'text-slate-400'}`}>
            {droppedRps.toLocaleString()} /s
          </span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   8. FAILURE INJECTION & CIRCUIT BREAKER SIMULATOR
   ========================================================================= */
function ChaosSimulator({ onComplete }: { onComplete: () => void }) {
  type CircuitState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';
  const [state, setState] = useState<CircuitState>('CLOSED');
  const [failures, setFailures] = useState(0);
  const [log, setLog] = useState<string>('Sirkuit normal (CLOSED): Semua request dialirkan ke remote service.');

  const triggerCall = (willFail: boolean) => {
    onComplete();
    if (state === 'OPEN') {
      setLog('FAST-FAIL: Sirkuit sedang OPEN! Request langsung ditolak tanpa menyentuh remote service.');
      return;
    }

    if (willFail) {
      const nextFailures = failures + 1;
      setFailures(nextFailures);
      if (nextFailures >= 3) {
        setState('OPEN');
        setLog('TRIPPED TO OPEN: 3 kegagalan berturut-turut! Sirkuit memutus aliran untuk melindungi backend.');
      } else {
        setLog(`Call gagal! Failure count: ${nextFailures}/3.`);
      }
    } else {
      setFailures(0);
      setState('CLOSED');
      setLog('Call Berhasil (200 OK): Sirkuit tetap CLOSED.');
    }
  };

  const probeHalfOpen = () => {
    onComplete();
    setState('HALF_OPEN');
    setLog('Cooldown timeout selesai: Sirkuit memasuki status HALF-OPEN untuk menguji kelayakan sistem remote.');
  };

  return (
    <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-bold text-white">Chaos Engineering: Circuit Breaker State Machine</h3>
          <p className="text-[11px] text-slate-400">Cegah cascading failure dengan pola pemutus sirkuit otomatis.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-black font-mono ${
            state === 'CLOSED' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
            state === 'OPEN' ? 'bg-rose-950 text-rose-400 border border-rose-800 animate-pulse' :
            'bg-amber-950 text-amber-400 border border-amber-800'
          }`}>
            State: {state}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => triggerCall(false)}
          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
        >
          Kirim Request Sehat (Success)
        </button>
        <button
          onClick={() => triggerCall(true)}
          className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
        >
          Simulasikan Backend Crash / 500 Error
        </button>
        {state === 'OPEN' && (
          <button
            onClick={probeHalfOpen}
            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
          >
            Lewatkan Cooldown (Masuk HALF-OPEN)
          </button>
        )}
      </div>

      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
        {log}
      </div>
    </div>
  );
}

/* =========================================================================
   9. OBSERVABILITY & DISTRIBUTED TRACING LAB
   ========================================================================= */
function ObservabilitySimulator({ onComplete }: { onComplete: () => void }) {
  const spans = [
    { name: 'GET /api/v1/checkout', duration: 184, start: 0, service: 'api-gateway', status: 200 },
    { name: 'AuthTokenVerifier.verify', duration: 18, start: 4, service: 'auth-service', status: 200 },
    { name: 'InventoryClient.checkStock', duration: 32, start: 26, service: 'inventory-service', status: 200 },
    { name: 'StripePaymentAdapter.charge', duration: 110, start: 60, service: 'payment-gateway', status: 200 },
    { name: 'KafkaProducer.publishOrderEvent', duration: 12, start: 172, service: 'notification-worker', status: 200 }
  ];

  return (
    <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
      <div>
        <h3 className="text-sm font-bold text-white">Distributed Tracing (OpenTelemetry Waterfall)</h3>
        <p className="text-[11px] text-slate-400">Trace ID: 4bf92f3577b34da6a3ce929d0e0e4736 (Total Latency: 184ms)</p>
      </div>

      <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
        {spans.map((s, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="font-mono text-slate-300 font-bold">{s.name} ({s.service})</span>
              <span className="text-indigo-400 font-mono">{s.duration}ms</span>
            </div>
            <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden flex">
              <div style={{ width: `${(s.start / 184) * 100}%` }} />
              <div 
                style={{ width: `${(s.duration / 184) * 100}%` }} 
                className="bg-indigo-500 h-full rounded-full"
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onComplete}
        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
      >
        Konfirmasi Pemahaman Tracing (+20 XP)
      </button>
    </div>
  );
}

/* =========================================================================
   10. SYSTEM DESIGN LAB (QPS & CAPACITY ESTIMATOR)
   ========================================================================= */
function SystemDesignLab({ onComplete }: { onComplete: () => void }) {
  const [dau, setDau] = useState(10); // Millions
  const [readsPerUser, setReadsPerUser] = useState(20);
  const [writesPerUser, setWritesPerUser] = useState(2);

  const totalReadsPerDay = dau * 1_000_000 * readsPerUser;
  const totalWritesPerDay = dau * 1_000_000 * writesPerUser;
  const readQps = Math.round(totalReadsPerDay / 86400);
  const writeQps = Math.round(totalWritesPerDay / 86400);
  const storagePerDayGb = Number(((totalWritesPerDay * 1024) / (1024 * 1024 * 1024)).toFixed(2));

  return (
    <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
      <div>
        <h3 className="text-sm font-bold text-white">Kalkulator Matematika Kapasitas Desain Sistem</h3>
        <p className="text-[11px] text-slate-400">Hitung kebutuhan QPS, Storage 5 tahun, dan Bandwidth server secara presisi.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
          <label className="text-[11px] text-slate-400 block mb-1">Daily Active Users (Juta):</label>
          <input
            type="number"
            value={dau}
            onChange={e => { setDau(Math.max(1, Number(e.target.value))); onComplete(); }}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-mono text-xs outline-none focus:border-indigo-500"
          />
        </div>
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
          <label className="text-[11px] text-slate-400 block mb-1">Reads / User / Hari:</label>
          <input
            type="number"
            value={readsPerUser}
            onChange={e => { setReadsPerUser(Math.max(1, Number(e.target.value))); onComplete(); }}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-mono text-xs outline-none focus:border-indigo-500"
          />
        </div>
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
          <label className="text-[11px] text-slate-400 block mb-1">Writes / User / Hari:</label>
          <input
            type="number"
            value={writesPerUser}
            onChange={e => { setWritesPerUser(Math.max(1, Number(e.target.value))); onComplete(); }}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-mono text-xs outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
          <span className="text-slate-400 block text-[10px]">Read Throughput (Avg):</span>
          <span className="text-base font-black text-indigo-400 font-mono">{readQps.toLocaleString()} QPS</span>
        </div>
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
          <span className="text-slate-400 block text-[10px]">Write Throughput (Avg):</span>
          <span className="text-base font-black text-indigo-400 font-mono">{writeQps.toLocaleString()} QPS</span>
        </div>
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
          <span className="text-slate-400 block text-[10px]">Storage Baru / Hari:</span>
          <span className="text-base font-black text-emerald-400 font-mono">{storagePerDayGb} GB</span>
        </div>
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
          <span className="text-slate-400 block text-[10px]">Storage 5 Tahun:</span>
          <span className="text-base font-black text-amber-400 font-mono">{(storagePerDayGb * 365 * 5 / 1024).toFixed(1)} TB</span>
        </div>
      </div>
    </div>
  );
}
