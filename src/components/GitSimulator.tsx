import React, { useState, useRef, useEffect } from 'react';
import { 
  GitBranch, 
  GitCommit, 
  GitPullRequest, 
  Terminal, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  HelpCircle, 
  ChevronRight, 
  Layers, 
  Sparkles,
  FolderGit2,
  FileCode,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GitCommitNode {
  hash: string;
  message: string;
  branch: string;
  timestamp: string;
  files: string[];
}

interface GitMission {
  id: string;
  title: string;
  description: string;
  objective: string;
  hint: string;
  expectedCondition: (state: GitState) => boolean;
  xpReward: number;
}

interface GitState {
  isRepo: boolean;
  activeBranch: string;
  branches: string[];
  workingDirectory: Record<string, string>; // filename -> status: 'modified' | 'untracked'
  stagingArea: string[]; // filenames staged
  commits: GitCommitNode[];
  commandHistory: string[];
}

const INITIAL_GIT_STATE: GitState = {
  isRepo: false,
  activeBranch: 'main',
  branches: ['main'],
  workingDirectory: {
    'index.html': 'untracked',
    'style.css': 'untracked',
  },
  stagingArea: [],
  commits: [],
  commandHistory: [],
};

const GIT_MISSIONS: GitMission[] = [
  {
    id: 'git-mission-1',
    title: 'Misi 1: Inisialisasi Repository & First Commit',
    description: 'Pelajari dasar inisialisasi Git dan catat snapshot pertama proyekmu.',
    objective: 'Jalankan `git init`, kemudian `git add .`, dan lakukan `git commit -m "feat: initial commit"`.',
    hint: 'Ketik `git init` lalu tekan Enter. Setelah itu masukkan `git add .` dan `git commit -m "feat: initial commit"`.',
    expectedCondition: (s) => s.isRepo && s.commits.length >= 1,
    xpReward: 35,
  },
  {
    id: 'git-mission-2',
    title: 'Misi 2: Membuat & Berpindah Branch Fitur',
    description: 'Buat cabang isolasi baru untuk mengembangkan fitur login tanpa merusak branch main.',
    objective: 'Buat branch baru `feat-login` dan berpindahlah ke branch tersebut menggunakan `git checkout -b feat-login` atau `git branch feat-login` lalu `git checkout feat-login`.',
    hint: 'Gunakan perintah `git checkout -b feat-login` atau `git switch -c feat-login`.',
    expectedCondition: (s) => s.branches.includes('feat-login') && s.activeBranch === 'feat-login',
    xpReward: 30,
  },
  {
    id: 'git-mission-3',
    title: 'Misi 3: Buat File di Branch & Commit Fitur Baru',
    description: 'Buat file baru di fitur branch lalu rekam ke commit history.',
    objective: 'Buat file `login.js` dengan `touch login.js`, lakukan `git add login.js`, lalu commit dengan `git commit -m "feat: add login functionality"`.',
    hint: 'Ketik `touch login.js`, lalu `git add .`, dan `git commit -m "feat: add login functionality"`.',
    expectedCondition: (s) => s.activeBranch === 'feat-login' && s.commits.some(c => c.branch === 'feat-login'),
    xpReward: 40,
  },
  {
    id: 'git-mission-4',
    title: 'Misi 4: Merge Branch ke Main (Integrasi)',
    description: 'Kembali ke branch utama dan gabungkan perubahan fitur yang telah selesai.',
    objective: 'Pindah kembali ke `main` dengan `git checkout main`, lalu gabungkan fitur dengan `git merge feat-login`.',
    hint: 'Jalankan `git checkout main` lalu `git merge feat-login`.',
    expectedCondition: (s) => s.activeBranch === 'main' && s.commits.some(c => c.message.includes('login') || c.message.includes('Merge')),
    xpReward: 45,
  },
];

interface GitSimulatorProps {
  onRewardXp?: (xp: number, missionId: string) => void;
}

export const GitSimulator: React.FC<GitSimulatorProps> = ({ onRewardXp }) => {
  const [gitState, setGitState] = useState<GitState>(INITIAL_GIT_STATE);
  const [inputVal, setInputVal] = useState('');
  const [outputLogs, setOutputLogs] = useState<Array<{ type: 'cmd' | 'info' | 'error' | 'success'; text: string }>>([
    { type: 'info', text: 'Selamat datang di COMMANDEV Git CLI Simulator v2.4' },
    { type: 'info', text: 'Ketik "help" untuk melihat daftar perintah yang didukung atau pilih chip perintah cepat di bawah.' },
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [activeMissionIdx, setActiveMissionIdx] = useState(0);
  const [completedMissions, setCompletedMissions] = useState<string[]>([]);
  const [showMissionSuccess, setShowMissionSuccess] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [outputLogs]);

  // Check mission condition on state change
  useEffect(() => {
    const currentMission = GIT_MISSIONS[activeMissionIdx];
    if (currentMission && !completedMissions.includes(currentMission.id)) {
      if (currentMission.expectedCondition(gitState)) {
        setCompletedMissions(prev => [...prev, currentMission.id]);
        setShowMissionSuccess(true);
        if (onRewardXp) {
          onRewardXp(currentMission.xpReward, currentMission.id);
        }
        setTimeout(() => {
          setShowMissionSuccess(false);
          if (activeMissionIdx < GIT_MISSIONS.length - 1) {
            setActiveMissionIdx(prev => prev + 1);
          }
        }, 3000);
      }
    }
  }, [gitState, activeMissionIdx, completedMissions, onRewardXp]);

  const generateHash = () => Math.random().toString(36).substring(2, 9);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    // Log the typed command
    setOutputLogs(prev => [...prev, { type: 'cmd', text: `commandev@dev-box:~/project$ ${trimmed}` }]);

    const parts = trimmed.split(/\s+/);
    const mainCmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Save to history
    setGitState(prev => ({
      ...prev,
      commandHistory: [...prev.commandHistory, trimmed]
    }));
    setHistoryIndex(-1);
    setInputVal('');

    if (mainCmd === 'clear') {
      setOutputLogs([]);
      return;
    }

    if (mainCmd === 'help') {
      setOutputLogs(prev => [
        ...prev,
        {
          type: 'info',
          text: `Perintah yang didukung:
  git init                : Menginisialisasi git repository
  git status              : Melihat status working tree dan staging area
  git add <file> | .      : Memindahkan file ke staging area
  git commit -m "<msg>"   : Merekam snapshot commit baru
  git branch [<nama>]     : Melihat atau membuat branch baru
  git checkout <branch>   : Berpindah branch
  git checkout -b <nama>  : Membuat dan langsung berpindah ke branch baru
  git merge <branch>      : Menggabungkan branch ke branch aktif
  git log [--oneline]     : Melihat riwayat commit
  touch <file>            : Membuat file baru di working directory
  ls                      : Menampilkan file di working directory
  clear                   : Membersihkan layar terminal`
        }
      ]);
      return;
    }

    if (mainCmd === 'ls') {
      const files = Object.keys(gitState.workingDirectory);
      if (files.length === 0) {
        setOutputLogs(prev => [...prev, { type: 'info', text: '(directory kosong)' }]);
      } else {
        setOutputLogs(prev => [...prev, { type: 'info', text: files.join('   ') }]);
      }
      return;
    }

    if (mainCmd === 'touch') {
      const filename = args[0];
      if (!filename) {
        setOutputLogs(prev => [...prev, { type: 'error', text: 'touch: sebutkan nama file (contoh: touch script.js)' }]);
        return;
      }
      setGitState(prev => ({
        ...prev,
        workingDirectory: { ...prev.workingDirectory, [filename]: 'untracked' }
      }));
      setOutputLogs(prev => [...prev, { type: 'success', text: `File "${filename}" berhasil dibuat di working directory.` }]);
      return;
    }

    if (mainCmd === 'git') {
      const gitAction = args[0]?.toLowerCase();
      const gitArgs = args.slice(1);

      if (!gitAction) {
        setOutputLogs(prev => [...prev, { type: 'error', text: 'Gunakan "git --help" atau "help" untuk panduan perintah.' }]);
        return;
      }

      if (gitAction === 'init') {
        if (gitState.isRepo) {
          setOutputLogs(prev => [...prev, { type: 'info', text: 'Reinitialized existing Git repository in /home/commandev/project/.git/' }]);
        } else {
          setGitState(prev => ({
            ...prev,
            isRepo: true,
            activeBranch: 'main',
            branches: ['main'],
          }));
          setOutputLogs(prev => [
            ...prev,
            { type: 'success', text: 'Initialized empty Git repository in /home/commandev/project/.git/' },
            { type: 'info', text: 'Branch default: main' }
          ]);
        }
        return;
      }

      // All other git commands require git init
      if (!gitState.isRepo) {
        setOutputLogs(prev => [
          ...prev,
          { type: 'error', text: 'fatal: not a git repository (or any of the parent directories): .git\nJalankan "git init" terlebih dahulu!' }
        ]);
        return;
      }

      if (gitAction === 'status') {
        const untracked = Object.keys(gitState.workingDirectory).filter(
          f => !gitState.stagingArea.includes(f)
        );
        const staged = gitState.stagingArea;

        let statusText = `On branch ${gitState.activeBranch}\n`;
        if (gitState.commits.length === 0) {
          statusText += 'No commits yet\n\n';
        }

        if (staged.length > 0) {
          statusText += 'Changes to be committed (Staged):\n';
          statusText += staged.map(f => `  (use "git restore --staged <file>..." to unstage)\n\tnew file:   ${f}`).join('\n') + '\n\n';
        }

        if (untracked.length > 0) {
          statusText += 'Untracked files (Working Directory):\n';
          statusText += untracked.map(f => `  (use "git add <file>..." to include in what will be committed)\n\t${f}`).join('\n') + '\n\n';
        }

        if (staged.length === 0 && untracked.length === 0) {
          statusText += 'nothing to commit, working tree clean';
        }

        setOutputLogs(prev => [...prev, { type: 'info', text: statusText }]);
        return;
      }

      if (gitAction === 'add') {
        const target = gitArgs[0];
        if (!target) {
          setOutputLogs(prev => [...prev, { type: 'error', text: 'Nothing specified, nothing added.\nContoh: git add . atau git add index.html' }]);
          return;
        }

        if (target === '.' || target === '-A') {
          const allFiles = Object.keys(gitState.workingDirectory);
          if (allFiles.length === 0) {
            setOutputLogs(prev => [...prev, { type: 'info', text: 'Tidak ada file untuk ditambahkan.' }]);
            return;
          }
          setGitState(prev => ({
            ...prev,
            stagingArea: Array.from(new Set([...prev.stagingArea, ...allFiles]))
          }));
          setOutputLogs(prev => [...prev, { type: 'success', text: `Menambahkan ${allFiles.length} file ke Staging Area.` }]);
        } else {
          if (!gitState.workingDirectory[target]) {
            setOutputLogs(prev => [...prev, { type: 'error', text: `fatal: pathspec '${target}' did not match any files` }]);
            return;
          }
          setGitState(prev => ({
            ...prev,
            stagingArea: Array.from(new Set([...prev.stagingArea, target]))
          }));
          setOutputLogs(prev => [...prev, { type: 'success', text: `File "${target}" ditambahkan ke Staging Area.` }]);
        }
        return;
      }

      if (gitAction === 'commit') {
        const mIndex = gitArgs.indexOf('-m');
        if (mIndex === -1 || !gitArgs[mIndex + 1]) {
          setOutputLogs(prev => [...prev, { type: 'error', text: 'error: switch `m` requires a value\nGunakan: git commit -m "pesan commit deskriptif"' }]);
          return;
        }

        // Extract message from quotes
        const rawMsg = gitArgs.slice(mIndex + 1).join(' ').replace(/^["']|["']$/g, '');

        if (gitState.stagingArea.length === 0) {
          setOutputLogs(prev => [
            ...prev,
            { type: 'error', text: 'On branch ' + gitState.activeBranch + '\nChanges not staged for commit.\nJalankan "git add ." terlebih dahulu!' }
          ]);
          return;
        }

        const newCommit: GitCommitNode = {
          hash: generateHash(),
          message: rawMsg,
          branch: gitState.activeBranch,
          timestamp: new Date().toLocaleTimeString(),
          files: [...gitState.stagingArea],
        };

        setGitState(prev => ({
          ...prev,
          commits: [newCommit, ...prev.commits],
          stagingArea: [],
        }));

        setOutputLogs(prev => [
          ...prev,
          { type: 'success', text: `[${gitState.activeBranch} ${newCommit.hash}] ${rawMsg}\n ${newCommit.files.length} files changed, insertions(+)` }
        ]);
        return;
      }

      if (gitAction === 'branch') {
        const newBranchName = gitArgs[0];
        if (!newBranchName) {
          // List branches
          const branchList = gitState.branches
            .map(b => (b === gitState.activeBranch ? `* ${b}` : `  ${b}`))
            .join('\n');
          setOutputLogs(prev => [...prev, { type: 'info', text: branchList }]);
          return;
        }

        if (gitState.branches.includes(newBranchName)) {
          setOutputLogs(prev => [...prev, { type: 'error', text: `fatal: a branch named '${newBranchName}' already exists` }]);
          return;
        }

        setGitState(prev => ({
          ...prev,
          branches: [...prev.branches, newBranchName]
        }));
        setOutputLogs(prev => [...prev, { type: 'success', text: `Branch '${newBranchName}' berhasil dibuat.` }]);
        return;
      }

      if (gitAction === 'checkout' || gitAction === 'switch') {
        let targetBranch = gitArgs[0];
        let createNew = false;

        if (targetBranch === '-b' || targetBranch === '-c') {
          createNew = true;
          targetBranch = gitArgs[1];
        }

        if (!targetBranch) {
          setOutputLogs(prev => [...prev, { type: 'error', text: 'Sebutkan nama branch. Contoh: git checkout main' }]);
          return;
        }

        if (createNew) {
          if (gitState.branches.includes(targetBranch)) {
            setOutputLogs(prev => [...prev, { type: 'error', text: `fatal: a branch named '${targetBranch}' already exists` }]);
            return;
          }
          setGitState(prev => ({
            ...prev,
            branches: [...prev.branches, targetBranch],
            activeBranch: targetBranch,
          }));
          setOutputLogs(prev => [...prev, { type: 'success', text: `Switched to a new branch '${targetBranch}'` }]);
          return;
        }

        if (!gitState.branches.includes(targetBranch)) {
          setOutputLogs(prev => [...prev, { type: 'error', text: `error: pathspec '${targetBranch}' did not match any file(s) known to git` }]);
          return;
        }

        setGitState(prev => ({
          ...prev,
          activeBranch: targetBranch
        }));
        setOutputLogs(prev => [...prev, { type: 'success', text: `Switched to branch '${targetBranch}'` }]);
        return;
      }

      if (gitAction === 'merge') {
        const sourceBranch = gitArgs[0];
        if (!sourceBranch) {
          setOutputLogs(prev => [...prev, { type: 'error', text: 'Sebutkan branch yang ingin digabung. Contoh: git merge feat-login' }]);
          return;
        }

        if (!gitState.branches.includes(sourceBranch)) {
          setOutputLogs(prev => [...prev, { type: 'error', text: `merge: ${sourceBranch} - not something we can merge` }]);
          return;
        }

        if (sourceBranch === gitState.activeBranch) {
          setOutputLogs(prev => [...prev, { type: 'info', text: 'Already up to date.' }]);
          return;
        }

        // Create merge commit
        const mergeCommit: GitCommitNode = {
          hash: generateHash(),
          message: `Merge branch '${sourceBranch}' into ${gitState.activeBranch}`,
          branch: gitState.activeBranch,
          timestamp: new Date().toLocaleTimeString(),
          files: ['(merged changes)'],
        };

        setGitState(prev => ({
          ...prev,
          commits: [mergeCommit, ...prev.commits]
        }));

        setOutputLogs(prev => [
          ...prev,
          { type: 'success', text: `Updating ${gitState.commits[0]?.hash || 'head'}..${mergeCommit.hash}\nFast-forward merge of branch '${sourceBranch}' into '${gitState.activeBranch}'.` }
        ]);
        return;
      }

      if (gitAction === 'log') {
        if (gitState.commits.length === 0) {
          setOutputLogs(prev => [...prev, { type: 'error', text: 'fatal: your current branch does not have any commits yet' }]);
          return;
        }

        const isOneLine = gitArgs.includes('--oneline');
        if (isOneLine) {
          const logText = gitState.commits
            .map(c => `${c.hash} (${c.branch === gitState.activeBranch ? 'HEAD -> ' + c.branch : c.branch}) ${c.message}`)
            .join('\n');
          setOutputLogs(prev => [...prev, { type: 'info', text: logText }]);
        } else {
          const logText = gitState.commits
            .map(c => `commit ${c.hash} (HEAD -> ${c.branch})\nAuthor: Coder <student@commandev.com>\nDate:   ${c.timestamp}\n\n    ${c.message}\n`)
            .join('\n');
          setOutputLogs(prev => [...prev, { type: 'info', text: logText }]);
        }
        return;
      }

      setOutputLogs(prev => [...prev, { type: 'error', text: `git: '${gitAction}' bukan perintah git yang valid. Ketik "help" untuk panduan.` }]);
      return;
    }

    setOutputLogs(prev => [...prev, { type: 'error', text: `bash: ${mainCmd}: command not found. Ketik "help" untuk melihat perintah.` }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (gitState.commandHistory.length > 0) {
        const nextIdx = historyIndex + 1 < gitState.commandHistory.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInputVal(gitState.commandHistory[gitState.commandHistory.length - 1 - nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(gitState.commandHistory[gitState.commandHistory.length - 1 - nextIdx] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  const resetSimulator = () => {
    setGitState(INITIAL_GIT_STATE);
    setOutputLogs([
      { type: 'info', text: 'Simulator telah direset ke kondisi awal.' },
      { type: 'info', text: 'Ketik "help" untuk melihat perintah.' }
    ]);
  };

  const currentMission = GIT_MISSIONS[activeMissionIdx];

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between px-5 py-3.5 bg-slate-950 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-orange-600/20 text-orange-400 border border-orange-500/30 flex items-center justify-center font-bold">
            <FolderGit2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-sm text-white tracking-tight">Git & GitHub CLI Simulator</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20">
                Interactive Terminal
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Praktek perintah version control system langsung dengan visualisasi state grafis
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetSimulator}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
            title="Reset Simulator"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset State
          </button>
        </div>
      </div>

      {/* Guided Mission Banner */}
      {currentMission && (
        <div className="bg-gradient-to-r from-indigo-950/80 via-slate-900 to-violet-950/80 border-b border-indigo-500/20 px-5 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-start gap-3 max-w-2xl">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                  {currentMission.title}
                </span>
                <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  +{currentMission.xpReward} XP
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium mt-0.5">{currentMission.objective}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {completedMissions.includes(currentMission.id) ? (
              <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Misi Selesai!
              </span>
            ) : (
              <button
                onClick={() => setInputVal(currentMission.hint.split('`')[1] || 'git init')}
                className="px-2.5 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                title="Isi hint otomatis"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                Bantuan
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Simulator Workspace: Terminal (Left) + Visual Architecture (Right) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Terminal Window (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col bg-slate-950 border-r border-slate-800 min-h-[360px]">
          {/* Terminal Titlebar */}
          <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 select-none">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[11px] font-mono text-slate-400 ml-2">bash: ~/project</span>
            </div>
            <div className="text-[11px] font-mono text-indigo-400">
              Branch: <span className="font-bold text-white">{gitState.activeBranch}</span>
            </div>
          </div>

          {/* Terminal Console Output */}
          <div 
            className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-1.5 text-slate-200"
            onClick={() => inputRef.current?.focus()}
          >
            {outputLogs.map((log, idx) => {
              let colorClass = 'text-slate-300';
              if (log.type === 'cmd') colorClass = 'text-amber-300 font-bold';
              if (log.type === 'error') colorClass = 'text-rose-400';
              if (log.type === 'success') colorClass = 'text-emerald-300';
              if (log.type === 'info') colorClass = 'text-indigo-200';

              return (
                <div key={idx} className={`whitespace-pre-wrap leading-relaxed ${colorClass}`}>
                  {log.text}
                </div>
              );
            })}
            <div ref={terminalEndRef} />
          </div>

          {/* Terminal Input Line */}
          <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2 font-mono text-xs">
            <span className="text-emerald-400 font-bold select-none">
              commandev@dev-box:~/project$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="ketik git command (contoh: git init, git status)..."
              className="flex-1 bg-transparent border-none outline-none text-slate-100 placeholder-slate-600 font-mono text-xs"
              autoFocus
            />
            <button
              onClick={() => handleCommand(inputVal)}
              disabled={!inputVal.trim()}
              className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded text-xs font-sans font-bold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Play className="w-3 h-3" />
              Kirim
            </button>
          </div>

          {/* Quick Command Chips */}
          <div className="p-2.5 bg-slate-950/80 border-t border-slate-800/80 flex flex-wrap gap-1.5 items-center">
            <span className="text-[10px] text-slate-500 uppercase font-sans font-bold mr-1">Chip Cepat:</span>
            {[
              'git init',
              'git status',
              'git add .',
              'git commit -m "feat: first commit"',
              'git branch feat-login',
              'git checkout feat-login',
              'git checkout main',
              'git merge feat-login',
              'git log --oneline',
              'touch app.js',
              'clear'
            ].map((quickCmd) => (
              <button
                key={quickCmd}
                onClick={() => {
                  setInputVal(quickCmd);
                  inputRef.current?.focus();
                }}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-indigo-300 font-mono text-[11px] border border-slate-700/60 transition-colors cursor-pointer"
              >
                {quickCmd}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Git Architecture: 3 Areas & Commit Graph (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col bg-slate-900 overflow-y-auto p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              Status Visual 3 Area Git
            </h3>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              gitState.isRepo 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
            }`}>
              {gitState.isRepo ? 'Repo Terinisialisasi' : 'Belum Ada .git'}
            </span>
          </div>

          {/* 1. Working Directory */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-200 flex items-center gap-1.5">
                <FileCode className="w-4 h-4 text-amber-400" />
                1. Working Directory
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                {Object.keys(gitState.workingDirectory).length} file
              </span>
            </div>
            <p className="text-[11px] text-slate-400">File lokal yang sedang kamu edit di laptop/komputer.</p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {Object.keys(gitState.workingDirectory).length === 0 ? (
                <span className="text-xs text-slate-600 italic">Tidak ada file. Buat dengan `touch index.html`</span>
              ) : (
                Object.keys(gitState.workingDirectory).map(file => (
                  <span
                    key={file}
                    className={`px-2 py-1 rounded text-xs font-mono font-semibold ${
                      gitState.stagingArea.includes(file)
                        ? 'bg-slate-800 text-slate-400 line-through opacity-60'
                        : 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    {file}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Transition Arrow */}
          <div className="flex justify-center -my-2 text-slate-600">
            <ArrowRight className="w-4 h-4 rotate-90" />
            <span className="text-[10px] font-mono ml-1 text-slate-500">git add</span>
          </div>

          {/* 2. Staging Area */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-200 flex items-center gap-1.5">
                <GitPullRequest className="w-4 h-4 text-emerald-400" />
                2. Staging Area (Index)
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">
                {gitState.stagingArea.length} staged
              </span>
            </div>
            <p className="text-[11px] text-slate-400">File yang sudah dipersiapkan dan siap dibungkus commit.</p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {gitState.stagingArea.length === 0 ? (
                <span className="text-xs text-slate-600 italic">Kosong. Jalankan `git add .`</span>
              ) : (
                gitState.stagingArea.map(file => (
                  <span
                    key={file}
                    className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-semibold flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    {file}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Transition Arrow */}
          <div className="flex justify-center -my-2 text-slate-600">
            <ArrowRight className="w-4 h-4 rotate-90" />
            <span className="text-[10px] font-mono ml-1 text-slate-500">git commit</span>
          </div>

          {/* 3. Commit History Graph */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-200 flex items-center gap-1.5">
                <GitCommit className="w-4 h-4 text-indigo-400" />
                3. Git Repository (Commit History)
              </span>
              <span className="text-[10px] text-indigo-400 font-mono">
                {gitState.commits.length} commit
              </span>
            </div>

            {/* Active Branches Indicator */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <GitBranch className="w-3.5 h-3.5 text-indigo-400" />
              <span>Branches:</span>
              <div className="flex flex-wrap gap-1">
                {gitState.branches.map(b => (
                  <span
                    key={b}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                      b === gitState.activeBranch
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {b === gitState.activeBranch ? `* ${b}` : b}
                  </span>
                ))}
              </div>
            </div>

            {/* Commit Node List */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {gitState.commits.length === 0 ? (
                <div className="text-center py-4 text-xs text-slate-600 italic">
                  Belum ada commit. Jalankan `git commit -m "pesan"`
                </div>
              ) : (
                gitState.commits.map((commit, idx) => (
                  <div
                    key={commit.hash}
                    className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2.5 text-xs font-mono"
                  >
                    <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-amber-300 font-bold">{commit.hash}</span>
                        <span className="text-[10px] text-slate-500">{commit.timestamp}</span>
                      </div>
                      <div className="text-slate-200 font-sans text-xs font-semibold truncate mt-0.5">
                        {commit.message}
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                        <span className="px-1.5 py-0.2 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                          {commit.branch}
                        </span>
                        <span>{commit.files.length} file</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
