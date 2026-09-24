import { Course } from '../types';

export const GIT_COURSE: Course = {
  id: 'git-mastery',
  title: 'Git & GitHub Fundamentals',
  shortDescription: 'Kuasai Version Control System standar industri: Git repository, branching, commit, merge, conflict resolution, dan kolaborasi GitHub.',
  description: 'Git dan GitHub adalah senjata utama setiap developer profesional. Pelajari bagaimana melacak riwayat kode, berkolaborasi dalam tim, membuat branch, melakukan pull request, dan menangani merge conflict dengan percaya diri.',
  icon: 'git',
  levels: [
    {
      id: 'git-lvl-0',
      title: 'Level 0 — Version Control Foundations',
      description: 'Memahami apa itu Version Control System (VCS), mengapa Git penting, dan alur kerja dasar.',
      modules: [
        {
          id: 'git-mod-1',
          title: 'Konsep Dasar Git & Repository',
          description: 'Working Directory, Staging Area, dan Local Repository.',
          lessons: [
            {
              id: 'git-les-1',
              title: 'Apa itu Git & Mengapa Developer Membutuhkannya?',
              type: 'learn',
              xpReward: 15,
              content: [
                {
                  type: 'markdown',
                  content: `### Apa itu Git?

**Git** adalah Distributed Version Control System (VCS) yang mencatat setiap perubahan pada file kode proyekmu.

Dengan Git, kamu bisa:
- **Time Travel:** Kembali ke versi kode sebelumnya jika terjadi error fatal.
- **Branching:** Mengembangkan fitur baru tanpa merusak kode utama yang sedang berjalan di produksi.
- **Team Collaboration:** Bekerja bersama ribuan programmer dalam satu codebase tanpa saling menimpa kode.`
                },
                {
                  type: 'code-example',
                  language: 'bash',
                  code: `# 3 Area Utama Git:
# 1. Working Directory (file yang sedang kamu edit)
# 2. Staging Area (git add - file yang siap dicatat)
# 3. Repository / Commit History (git commit - snapshot permanen)`
                }
              ]
            },
            {
              id: 'git-les-2',
              title: 'Latihan: Inisialisasi & Staging',
              type: 'practice',
              xpReward: 25,
              language: 'web',
              content: [
                {
                  type: 'markdown',
                  content: `Mari simulasikan perintah CLI Git di editor. Tulis perintah CLI untuk menginisialisasi repository dan menambahkan semua file ke staging area.`
                }
              ],
              starterCode: `git init\ngit add .\ngit commit -m "feat: initial commit"`,
              requirements: [
                {
                  id: 'req-git-init',
                  description: 'Harus menyertakan git init dan git add',
                  validate: (code) => code.includes('git init') && code.includes('git add')
                }
              ]
            },
            {
              id: 'git-les-quiz-1',
              title: 'Kuis Konseptual Git',
              type: 'quiz',
              xpReward: 30,
              questions: [
                {
                  id: 'gq-1',
                  question: 'Perintah mana yang digunakan untuk memindahkan perubahan dari Working Directory ke Staging Area?',
                  options: ['git commit', 'git add <file>', 'git push', 'git init'],
                  correctAnswerIndex: 1,
                  explanation: '`git add` memindahkan file dari working tree ke staging area (index) sebelum dibuat snapshot commit.'
                },
                {
                  id: 'gq-2',
                  question: 'Apa fungsi dari perintah `git status`?',
                  options: ['Menghapus repository', 'Melihat status file yang dimodifikasi, staged, atau untracked', 'Mengirim kode ke GitHub', 'Mengubah branch aktif'],
                  correctAnswerIndex: 1,
                  explanation: '`git status` menampilkan status branch saat ini, file apa saja yang berubah, dan apa yang sudah masuk staging area.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'git-lvl-1',
      title: 'Level 1 — Branching, Merging & Remote GitHub',
      description: 'Bekerja dengan branches, pull requests, push/pull, dan kolaborasi tim.',
      modules: [
        {
          id: 'git-mod-2',
          title: 'Branching Strategy & GitHub Workflow',
          description: 'Feature branching, pull requests, merge conflict handling.',
          lessons: [
            {
              id: 'git-les-3',
              title: 'Membuat Branch & Menggabungkan (Merge)',
              type: 'learn',
              xpReward: 20,
              content: [
                {
                  type: 'markdown',
                  content: `### Branching di Git

Branch memungkinkanmu membuat salinan terisolasi untuk mengerjakan fitur baru tanpa mengganggu branch utama (\`main\`):

\`\`\`bash
# Membuat & beralih ke branch baru
git checkout -b feature/login-page
# atau (Git versi baru):
git switch -c feature/login-page

# Menggabungkan kembali ke main:
git checkout main
git merge feature/login-page
\`\`\``
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
