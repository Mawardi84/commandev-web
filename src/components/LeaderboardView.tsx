import React, { useState, useEffect } from 'react';
import { UserProgress } from '../types';
import { 
  Trophy, 
  Flame, 
  CheckCircle2, 
  Crown, 
  Medal, 
  Sparkles, 
  Users, 
  Activity, 
  RefreshCw, 
  User, 
  ArrowUpRight,
  ShieldCheck,
  TrendingUp,
  Zap,
  Globe,
  GitFork,
  Heart,
  Code2,
  ExternalLink,
  Layers,
  Terminal
} from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { getLeaderboardEntries, getCommunityFeedItems, postMilestoneFeed, LeaderboardEntry, CommunityFeedItem, getRankTitle } from '../lib/db';

interface CommunitySnippet {
  id: string;
  title: string;
  author: string;
  authorRank: string;
  language: string;
  likes: number;
  description: string;
  code: string;
}

const COMMUNITY_SNIPPETS: CommunitySnippet[] = [
  {
    id: 'snip-1',
    title: 'Modern CSS Glassmorphism Card with Glow Effect',
    author: 'Rayhan Pratama',
    authorRank: 'Fullstack Maestro',
    language: 'web',
    likes: 42,
    description: 'Komponen kartu glassmorphism modern dengan backdrop-filter blur, border gradien halus, dan hover glow efek.',
    code: `<div class="glass-card">\n  <h2>COMMANDEV Glass UI</h2>\n  <p>Modern glassmorphism built with CSS backdrop-filter and ambient shadows.</p>\n  <button class="btn-glow">Explore</button>\n</div>\n\n<style>\nbody { background: #070913; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: sans-serif; margin: 0; }\n.glass-card { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 1.5rem; padding: 2.5rem; text-align: center; color: white; max-width: 320px; box-shadow: 0 20px 50px rgba(99, 102, 241, 0.15); }\n.btn-glow { background: linear-gradient(135deg, #6366f1, #a855f7); color: white; border: none; padding: 0.6rem 1.5rem; border-radius: 9999px; font-weight: bold; cursor: pointer; }\n</style>`
  },
  {
    id: 'snip-2',
    title: 'Python Memoized Fibonacci & Performance Benchmark',
    author: 'Siti Nurhaliza',
    authorRank: 'Code Artisan',
    language: 'python',
    likes: 38,
    description: 'Implementasi Fibonacci efisien dengan dekorator lru_cache membandingkan waktu eksekusi O(2^n) vs O(n).',
    code: `import time\nfrom functools import lru_cache\n\n@lru_cache(maxsize=None)\ndef fib_fast(n):\n    if n < 2:\n        return n\n    return fib_fast(n - 1) + fib_fast(n - 2)\n\nstart = time.perf_counter()\nres = fib_fast(50)\nelapsed = (time.perf_counter() - start) * 1000\n\nprint(f"Fibonacci(50) = {res}")\nprint(f"Waktu komputasi dengan memoization: {elapsed:.4f} ms")`
  },
  {
    id: 'snip-3',
    title: 'Custom React useDebounce Hook with Timer Cleanup',
    author: 'Dimas Wicaksono',
    authorRank: 'Frontend Apprentice',
    language: 'web',
    likes: 29,
    description: 'Custom React hook useDebounce untuk input search autocomplete agar tidak spamming API request.',
    code: `<div id="app">\n  <h3>Search Autocomplete Simulator</h3>\n  <input id="search" placeholder="Ketik kata kunci pencarian..." style="padding: 0.5rem; width: 300px;" />\n  <div id="output" style="margin-top: 1rem; color: #818cf8;">Ketik sesuatu di atas...</div>\n</div>\n\n<script>\nlet timer;\nconst input = document.getElementById('search');\nconst output = document.getElementById('output');\n\ninput.addEventListener('input', (e) => {\n  clearTimeout(timer);\n  output.textContent = 'Mengetik... (Debouncing 400ms)';\n  timer = setTimeout(() => {\n    output.textContent = 'API Request Terkirim: "' + e.target.value + '"';\n  }, 400);\n});\n</script>`
  }
];

interface LeaderboardViewProps {
  userProgress: UserProgress;
  onNavigateToPlayground?: (code: string, language: string) => void;
}

// Fallback seed entries (kosong agar siap produksi tanpa data palsu)
const INITIAL_LEADERBOARD_SEED: LeaderboardEntry[] = [];

const INITIAL_COMMUNITY_FEED: CommunityFeedItem[] = [];

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ userProgress, onNavigateToPlayground }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'showcase'>('leaderboard');
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(INITIAL_LEADERBOARD_SEED);
  const [feedData, setFeedData] = useState<CommunityFeedItem[]>(INITIAL_COMMUNITY_FEED);
  const [snippets, setSnippets] = useState<CommunitySnippet[]>(COMMUNITY_SNIPPETS);
  const [timeFilter, setTimeFilter] = useState<'all' | 'weekly' | 'monthly'>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [hasSynced, setHasSynced] = useState(false);

  const fetchCommunityData = async () => {
    setIsLoading(true);
    try {
      const liveLeaderboard = await getLeaderboardEntries();
      if (liveLeaderboard.length > 0) {
        setLeaderboardData(liveLeaderboard);
      }
      const liveFeed = await getCommunityFeedItems();
      if (liveFeed.length > 0) {
        setFeedData(liveFeed);
      }
    } catch (e) {
      console.warn('Using seeded leaderboard');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCommunityData();
  }, []);

  // Ensure current user is on leaderboard list
  const currentRankTitle = getRankTitle(userProgress.xp);
  const currentUserEntry: LeaderboardEntry = {
    userId: user?.uid || 'current-user',
    displayName: user?.displayName || 'COMMANDEV Developer (Anda)',
    photoURL: user?.photoURL || undefined,
    xp: userProgress.xp,
    streak: userProgress.streak,
    completedCount: userProgress.completedLessons.length,
    rankTitle: currentRankTitle,
    updatedAt: new Date().toISOString()
  };

  // Combine and sort
  const combinedList = [...leaderboardData.filter(e => e.userId !== (user?.uid || 'current-user')), currentUserEntry]
    .sort((a, b) => b.xp - a.xp);

  const myPosition = combinedList.findIndex(e => e.userId === (user?.uid || 'current-user')) + 1;

  const handleShareAchievement = async () => {
    if (user) {
      await postMilestoneFeed({
        userId: user.uid,
        userName: user.displayName || 'Developer',
        userAvatar: user.photoURL || undefined,
        type: 'rank',
        title: `Mencapai peringkat #${myPosition} dengan total ${userProgress.xp} XP!`,
        xpEarned: userProgress.xp
      });
      setHasSynced(true);
      fetchCommunityData();
    }
  };

  const handleLikeSnippet = (id: string) => {
    setSnippets(prev => prev.map(s => s.id === id ? { ...s, likes: s.likes + 1 } : s));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-white">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              <span>Global Community</span>
            </span>
            <span className="text-xs text-slate-400 font-mono">Real-time Cloud Sync</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Papan Peringkat & Hub Komunitas
          </h1>
          <p className="text-sm text-slate-300 max-w-xl">
            Berkompetisi secara suportif, bagikan milestone pencapaian, dan telusuri kreasi kode karya developer COMMANDEV di seluruh Indonesia.
          </p>
        </div>

        {/* My Position Card */}
        <div className="p-4 bg-slate-950/80 rounded-2xl border border-indigo-500/30 flex items-center gap-4 shadow-lg flex-shrink-0">
          <div className="text-center px-2">
            <div className="text-xs uppercase font-bold text-slate-400">Posisi Anda</div>
            <div className="text-3xl font-black text-amber-400">#{myPosition}</div>
          </div>
          <div className="h-10 w-px bg-slate-800"></div>
          <div>
            <div className="text-sm font-bold text-slate-200">{userProgress.xp} XP</div>
            <div className="text-xs text-indigo-300 font-medium">{currentRankTitle}</div>
          </div>
        </div>
      </div>

      {/* Navigation Switcher Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
            activeTab === 'leaderboard'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Trophy className="w-4 h-4 text-amber-300" />
          <span>🏆 Papan Peringkat & Feed Global</span>
        </button>

        <button
          onClick={() => setActiveTab('showcase')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
            activeTab === 'showcase'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <GitFork className="w-4 h-4 text-indigo-300" />
          <span>🚀 Community Showcase & Fork Hub</span>
        </button>
      </div>

      {activeTab === 'showcase' ? (
        /* COMMUNITY SHOWCASE GRID */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-indigo-400" />
                <span>Kreasi & Snippet Populer Komunitas</span>
              </h2>
              <p className="text-xs text-slate-400">Jelajahi dan fork langsung kode karya member ke Playground Anda.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {snippets.map((snip) => (
              <div key={snip.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all shadow-lg">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-wider">
                      {snip.language}
                    </span>
                    <button 
                      onClick={() => handleLikeSnippet(snip.id)}
                      className="flex items-center gap-1 text-xs text-rose-400 font-bold hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5 fill-rose-500" />
                      <span>{snip.likes}</span>
                    </button>
                  </div>
                  <h3 className="font-bold text-sm text-white leading-snug mb-1">{snip.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">{snip.description}</p>

                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pb-3 border-b border-slate-800">
                    <User className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="text-slate-300 font-medium">{snip.author}</span>
                    <span>•</span>
                    <span className="text-indigo-400">{snip.authorRank}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      if (onNavigateToPlayground) {
                        onNavigateToPlayground(snip.code, snip.language);
                      }
                    }}
                    className="w-full py-2 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                  >
                    <GitFork className="w-3.5 h-3.5" />
                    <span>Fork & Buka di Playground</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEADERBOARD LIST (2 Columns) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Controls & Filter */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-bold">
              <button
                onClick={() => setTimeFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  timeFilter === 'all' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Semua Waktu
              </button>
              <button
                onClick={() => setTimeFilter('weekly')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  timeFilter === 'weekly' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Minggu Ini
              </button>
              <button
                onClick={() => setTimeFilter('monthly')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  timeFilter === 'monthly' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Bulan Ini
              </button>
            </div>

            <button
              onClick={fetchCommunityData}
              disabled={isLoading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 border border-slate-700 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Segarkan</span>
            </button>
          </div>

          {/* Top 3 Podium Cards */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 items-end pt-4 pb-2">
            
            {/* Rank 2 (Silver) */}
            {combinedList[1] && (
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700 text-center space-y-2 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-slate-400 text-slate-950 font-black text-xs flex items-center justify-center shadow-md">
                  #2
                </div>
                {combinedList[1].photoURL ? (
                  <img src={combinedList[1].photoURL} alt="" className="w-12 h-12 rounded-full mx-auto object-cover ring-2 ring-slate-400" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-slate-700 text-white mx-auto flex items-center justify-center font-bold text-sm">
                    {combinedList[1].displayName.charAt(0)}
                  </div>
                )}
                <div className="font-bold text-xs truncate">{combinedList[1].displayName}</div>
                <div className="text-xs font-black text-slate-300">{combinedList[1].xp} XP</div>
                <div className="text-[10px] text-slate-400 font-mono flex items-center justify-center gap-1">
                  <Flame className="w-3 h-3 text-amber-500" /> {combinedList[1].streak}d
                </div>
              </div>
            )}

            {/* Rank 1 (Gold / Champion) */}
            {combinedList[0] && (
              <div className="p-5 rounded-2xl bg-gradient-to-b from-amber-950/40 to-slate-900 border-2 border-amber-500 text-center space-y-2 relative shadow-lg shadow-amber-500/10">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-amber-400 text-amber-950 font-black text-sm flex items-center justify-center shadow-lg shadow-amber-400/30">
                  <Crown className="w-4 h-4 fill-amber-950" />
                </div>
                {combinedList[0].photoURL ? (
                  <img src={combinedList[0].photoURL} alt="" className="w-14 h-14 rounded-full mx-auto object-cover ring-4 ring-amber-400/50" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-amber-500 text-slate-950 mx-auto flex items-center justify-center font-black text-base">
                    {combinedList[0].displayName.charAt(0)}
                  </div>
                )}
                <div className="font-black text-sm truncate text-amber-200">{combinedList[0].displayName}</div>
                <div className="text-sm font-black text-amber-400">{combinedList[0].xp} XP</div>
                <div className="text-[11px] text-amber-300/80 font-mono flex items-center justify-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {combinedList[0].streak}d Streak
                </div>
              </div>
            )}

            {/* Rank 3 (Bronze) */}
            {combinedList[2] && (
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700 text-center space-y-2 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-amber-700 text-white font-black text-xs flex items-center justify-center shadow-md">
                  #3
                </div>
                {combinedList[2].photoURL ? (
                  <img src={combinedList[2].photoURL} alt="" className="w-12 h-12 rounded-full mx-auto object-cover ring-2 ring-amber-700" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-slate-700 text-white mx-auto flex items-center justify-center font-bold text-sm">
                    {combinedList[2].displayName.charAt(0)}
                  </div>
                )}
                <div className="font-bold text-xs truncate">{combinedList[2].displayName}</div>
                <div className="text-xs font-black text-amber-500">{combinedList[2].xp} XP</div>
                <div className="text-[10px] text-slate-400 font-mono flex items-center justify-center gap-1">
                  <Flame className="w-3 h-3 text-amber-500" /> {combinedList[2].streak}d
                </div>
              </div>
            )}

          </div>

          {/* Full Rank Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
              <div className="flex items-center gap-4">
                <span>Rank</span>
                <span>Developer</span>
              </div>
              <div className="flex items-center gap-6">
                <span>Streak</span>
                <span>Total XP</span>
              </div>
            </div>

            <div className="divide-y divide-slate-800/60">
              {combinedList.map((entry, index) => {
                const isMe = entry.userId === (user?.uid || 'current-user');
                return (
                  <div
                    key={entry.userId || index}
                    className={`px-6 py-3.5 flex items-center justify-between transition-colors ${
                      isMe 
                        ? 'bg-indigo-950/40 border-l-4 border-indigo-500' 
                        : 'hover:bg-slate-800/40'
                    }`}
                  >
                    {/* Left: Rank & User Profile */}
                    <div className="flex items-center gap-4">
                      <div className={`w-7 text-center font-black text-xs ${
                        index === 0 ? 'text-amber-400' : index === 1 ? 'text-slate-300' : index === 2 ? 'text-amber-600' : 'text-slate-500'
                      }`}>
                        #{index + 1}
                      </div>

                      <div className="flex items-center gap-3">
                        {entry.photoURL ? (
                          <img src={entry.photoURL} alt="" className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-700" referrerPolicy="no-referrer" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-slate-800 text-indigo-400 flex items-center justify-center font-bold text-xs">
                            {entry.displayName.charAt(0)}
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-bold text-slate-200 truncate">
                              {entry.displayName} {isMe && '(Anda)'}
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-medium">
                            {entry.rankTitle} • {entry.completedCount} Latihan
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Streak & XP */}
                    <div className="flex items-center gap-6 text-xs font-mono">
                      <span className="flex items-center gap-1 text-amber-400 font-bold">
                        <Flame className="w-3.5 h-3.5 fill-amber-400" />
                        {entry.streak}h
                      </span>
                      <span className="font-bold text-sm text-indigo-300 w-16 text-right">
                        {entry.xp} XP
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* COMMUNITY MILESTONE ACTIVITY FEED (1 Column) */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h2 className="text-base font-bold flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>Aktivitas Komunitas</span>
              </h2>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Live Feed
              </span>
            </div>

            <div className="space-y-3">
              {feedData.map((item, idx) => (
                <div key={item.id || idx} className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200 truncate">{item.userName}</span>
                    <span className="text-[10px] text-slate-500">{item.createdAt}</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-amber-400 font-mono font-bold">
                    <Sparkles className="w-3 h-3" /> +{item.xpEarned} XP
                  </div>
                </div>
              ))}
            </div>

            {/* Share My Milestone CTA */}
            {user && (
              <button
                onClick={handleShareAchievement}
                disabled={hasSynced}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{hasSynced ? 'Progres Telah Dibagikan!' : 'Bagikan Pencapaian Saya ke Feed'}</span>
              </button>
            )}
          </div>
        </div>

      </div>
      )}

    </div>
  );
};
