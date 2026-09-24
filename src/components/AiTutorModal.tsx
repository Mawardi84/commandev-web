import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Code2, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  Copy, 
  Check, 
  ShieldCheck, 
  RotateCcw,
  MessageSquare,
  FileCheck,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Radio
} from 'lucide-react';
import { Lesson } from '../types';
import { auth } from '../lib/firebase';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isHint?: boolean;
}

interface CodeReviewData {
  score: number;
  summary: string;
  complexity: {
    time: string;
    space: string;
    explanation: string;
  };
  strengths: string[];
  improvements: string[];
  securityAndBugs: string[];
  refactoredCode: string;
}

interface AiTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLesson: Lesson | null;
  currentCode?: string;
  currentCss?: string;
  currentJs?: string;
  currentPy?: string;
}

export const AiTutorModal: React.FC<AiTutorModalProps> = ({ 
  isOpen, 
  onClose, 
  currentLesson,
  currentCode,
  currentCss,
  currentJs,
  currentPy
}) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'review'>('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Voice states
  const [isListening, setIsListening] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeSpeakingIdx, setActiveSpeakingIdx] = useState<number | null>(null);
  
  // Review state
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewData, setReviewData] = useState<CodeReviewData | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize SpeechRecognition if available
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'id-ID';

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setInput(transcript);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Browser Anda belum mendukung fitur Speech Recognition natively. Anda masih dapat mengetik pertanyaan.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setInput('');
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const playTts = async (text: string, msgIndex?: number) => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      setIsPlayingAudio(true);
      if (msgIndex !== undefined) setActiveSpeakingIdx(msgIndex);

      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');
      const token = await user.getIdToken();

      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ text, voice: 'Kore' }),
      });

      if (!response.ok) throw new Error('TTS Failed');

      const data = await response.json();
      if (data.audio) {
        const audioUrl = `data:audio/mp3;base64,${data.audio}`;
        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        audio.onended = () => {
          setIsPlayingAudio(false);
          setActiveSpeakingIdx(null);
        };

        audio.onerror = () => {
          setIsPlayingAudio(false);
          setActiveSpeakingIdx(null);
        };

        await audio.play();
      } else {
        // SpeechSynthesis Browser Fallback
        speakBrowserFallback(text);
      }
    } catch {
      speakBrowserFallback(text);
    }
  };

  const speakBrowserFallback = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const clean = text.replace(/\*\*/g, '').replace(/```[\s\S]*?```/g, 'Kode terlampir.').replace(/`([^`]+)`/g, '$1');
      const utterance = new SpeechSynthesisUtterance(clean.substring(0, 300));
      utterance.lang = 'id-ID';
      utterance.onend = () => {
        setIsPlayingAudio(false);
        setActiveSpeakingIdx(null);
      };
      window.speechSynthesis.speak(utterance);
    } else {
      setIsPlayingAudio(false);
      setActiveSpeakingIdx(null);
    }
  };

  // Initial greeting based on context
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      let greeting = "Halo! Saya Voice AI Mentor dari COMMANDEV.";
      
      if (currentLesson) {
        if (currentLesson.type === 'practice' || currentLesson.type === 'challenge' || currentLesson.type === 'project') {
          greeting = `Halo! Saya siap mendampingi kamu di **${currentLesson.title}**. Jika ada baris kode yang membingungkan atau error runtime, tanyakan langsung atau gunakan mikrofon!`;
        } else if (currentLesson.type === 'quiz') {
          greeting = `Halo! Sedang mengerjakan kuis **${currentLesson.title}**? Beritahu saya jika kamu butuh penjelasan konsep untuk menjawab soalnya tanpa spoiler.`;
        } else {
          greeting = `Halo! Ada konsep di materi **${currentLesson.title}** yang ingin kamu perdalam?`;
        }
      }
      
      setMessages([{ role: 'assistant', content: greeting }]);
    }
  }, [isOpen, currentLesson]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (activeTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, activeTab]);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || input.trim();
    if (!textToSend) return;

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    if (!customPrompt) setInput('');
    
    const newMessages: Message[] = [...messages, { role: 'user', content: textToSend }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const contextPayload = {
        lessonTitle: currentLesson?.title || 'Umum',
        lessonType: currentLesson?.type || 'Latihan',
        lessonContent: currentLesson?.content ? JSON.stringify(currentLesson.content) : '',
        requirements: currentLesson?.requirements ? JSON.stringify(currentLesson.requirements.map(r => r.description)) : 'None',
        currentCode: currentCode || '',
        currentCss: currentCss || '',
        currentJs: currentJs || '',
        currentPy: currentPy || '',
        userMessage: textToSend,
        history: newMessages.map(m => ({ role: m.role, content: m.content }))
      };

      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');
      const token = await user.getIdToken();

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(contextPayload),
      });

      if (!response.ok) {
        throw new Error('Gagal menghubungi AI Server');
      }

      const data = await response.json();
      
      const newMsgIndex = newMessages.length;
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.reply,
        isHint: data.isHint
      }]);

      if (autoSpeak) {
        playTts(data.reply, newMsgIndex);
      }

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Maaf, koneksi AI sedang sibuk atau server sedang memproses antrian. Silakan coba kembali.' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleRunAiReview = async () => {
    setReviewLoading(true);
    setReviewData(null);

    const activeLanguage = currentPy ? 'Python' : 'HTML/CSS/JavaScript';
    const codeToReview = currentPy || `/* HTML */\n${currentCode || ''}\n\n/* CSS */\n${currentCss || ''}\n\n/* JS */\n${currentJs || ''}`;

    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');
      const token = await user.getIdToken();

      const res = await fetch('/api/ai-review', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
          language: activeLanguage,
          code: codeToReview,
          contextTitle: currentLesson?.title || 'COMMANDEV Workspace',
          targetTask: currentLesson?.requirements ? 'Penyelesaian Kriteria Tugas' : 'Kualitas & Best Practices'
        })
      });

      if (!res.ok) throw new Error('Gagal melakukan review');
      const data: CodeReviewData = await res.json();
      setReviewData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setReviewLoading(false);
    }
  };

  const handleCopyRefactored = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[88vh] border border-slate-200 dark:border-slate-800">
        
        {/* Header with Mode Tabs */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-950 text-white flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm tracking-tight text-white flex items-center gap-2">
                  <span>COMMANDEV AI Voice Mentor</span>
                  {isPlayingAudio && (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
                      <Radio className="w-3 h-3 animate-pulse text-emerald-400" />
                      <span>Speaking</span>
                    </span>
                  )}
                </h3>
                <p className="text-[11px] text-slate-400">Voice-to-Voice AI Coding Assistant</p>
              </div>
            </div>

            {/* Mode Switcher */}
            <div className="hidden sm:flex bg-slate-900 p-1 rounded-xl border border-slate-800 ml-2">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'chat' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Voice & Chat</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('review');
                  if (!reviewData && !reviewLoading) handleRunAiReview();
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'review' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileCheck className="w-3.5 h-3.5" />
                <span>Code Review</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Auto-Speak Toggle */}
            <button
              onClick={() => setAutoSpeak(!autoSpeak)}
              title={autoSpeak ? "Suara AI Aktif (Klik untuk Mematikan)" : "Suara AI Mute (Klik untuk Mengaktifkan)"}
              className={`p-2 rounded-xl transition-all border cursor-pointer ${
                autoSpeak 
                  ? 'bg-indigo-600/30 border-indigo-500/50 text-indigo-300' 
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              {autoSpeak ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button 
              onClick={onClose} 
              className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
        
        {/* Tab 1: Multi-turn Chat */}
        {activeTab === 'chat' && (
          <>
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50 dark:bg-slate-950 custom-scrollbar">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex flex-shrink-0 items-center justify-center ${
                    msg.role === 'assistant' 
                      ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400' 
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    {msg.role === 'assistant' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  {/* Message Bubble */}
                  <div className={`p-4 rounded-2xl max-w-[85%] text-sm leading-relaxed shadow-sm relative group ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : msg.isHint
                        ? 'bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-slate-800 dark:text-slate-200 rounded-tl-none'
                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none'
                  }`}>
                    <div className="whitespace-pre-wrap">
                      {msg.content.split('**').map((chunk, i) => 
                        i % 2 === 1 ? <strong key={i} className="text-indigo-600 dark:text-indigo-400 font-bold">{chunk}</strong> : chunk
                      )}
                    </div>

                    {/* Audio Playback button for assistant messages */}
                    {msg.role === 'assistant' && (
                      <button
                        onClick={() => playTts(msg.content, idx)}
                        title="Dengarkan Suara AI"
                        className={`mt-2 pt-2 border-t border-slate-200 dark:border-slate-800/80 flex items-center gap-1.5 text-xs font-semibold cursor-pointer transition-colors ${
                          activeSpeakingIdx === idx && isPlayingAudio
                            ? 'text-emerald-500 font-bold'
                            : 'text-indigo-500 hover:text-indigo-400'
                        }`}
                      >
                        <Volume2 className={`w-3.5 h-3.5 ${activeSpeakingIdx === idx && isPlayingAudio ? 'animate-bounce text-emerald-500' : ''}`} />
                        <span>{activeSpeakingIdx === idx && isPlayingAudio ? 'Membaca Suara...' : 'Putar Audio TTS'}</span>
                      </button>
                    )}
                  </div>

                </div>
              ))}

              {isTyping && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex flex-shrink-0 items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl rounded-tl-none border border-slate-200 dark:border-slate-800 flex gap-1.5 items-center h-[46px]">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Chips */}
            <div className="px-4 py-2 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-2 text-xs">
              <button 
                onClick={() => handleSend("Beri saya petunjuk bertahap (Hint) untuk materi ini.")}
                className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-indigo-500 text-slate-700 dark:text-slate-300 transition-colors"
              >
                💡 Petunjuk Bertahap
              </button>
              <button 
                onClick={() => handleSend("Apakah ada kesalahan logika atau sintaks pada kodingan saya?")}
                className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-indigo-500 text-slate-700 dark:text-slate-300 transition-colors"
              >
                🔍 Cek Error & Bug
              </button>
              <button 
                onClick={() => handleSend("Jelaskan konsep teori di balik latihan ini dengan analogi sederhana.")}
                className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-indigo-500 text-slate-700 dark:text-slate-300 transition-colors"
              >
                📖 Jelaskan Konsep
              </button>
            </div>

            {/* Input Form with Speech-To-Text Mic */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex-shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleListening}
                  title={isListening ? "Mendengarkan... Klik untuk berhenti" : "Bicara lewat Mikrofon (Speech-to-Text)"}
                  className={`w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center transition-all cursor-pointer border ${
                    isListening 
                      ? 'bg-rose-600 border-rose-500 text-white animate-pulse shadow-lg shadow-rose-600/40' 
                      : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {isListening ? <MicOff className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5 text-indigo-500" />}
                </button>

                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  placeholder={isListening ? "Mendengarkan ucapan Anda..." : "Bicara lewat mic atau ketik pertanyaan..."} 
                  className={`flex-1 bg-slate-100 dark:bg-slate-800 border rounded-xl px-4 py-3 text-sm outline-none text-slate-900 dark:text-white transition-all ${
                    isListening ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-transparent focus:border-indigo-500'
                  }`}
                />
                
                <button 
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  className="w-12 h-12 flex-shrink-0 rounded-xl bg-indigo-600 flex items-center justify-center text-white hover:bg-indigo-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Send className="w-5 h-5 ml-0.5" />
                </button>
              </div>
            </div>
          </>
        )}

        {/* Tab 2: Live AI Code Review */}
        {activeTab === 'review' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-950 text-slate-100 custom-scrollbar space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h4 className="font-bold text-base text-white">Hasil Audit & Code Review Otomatis</h4>
                <p className="text-xs text-slate-400">Analisis menyeluruh mencakup efisiensi, keamanan, dan kebersihan sintaks.</p>
              </div>
              <button
                onClick={handleRunAiReview}
                disabled={reviewLoading}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-sm transition-all disabled:opacity-50"
              >
                <RotateCcw className={`w-3.5 h-3.5 ${reviewLoading ? 'animate-spin' : ''}`} />
                <span>Ulangi Review</span>
              </button>
            </div>

            {reviewLoading ? (
              <div className="py-16 flex flex-col items-center justify-center text-indigo-400 space-y-3">
                <Loader2 className="w-8 h-8 animate-spin" />
                <p className="text-sm font-semibold text-slate-300">Sedang mengaudit kode & menganalisis kompleksitas...</p>
              </div>
            ) : reviewData ? (
              <div className="space-y-6">
                
                {/* Score & Complexity Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-black text-xl">
                      {reviewData.score}
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Skor Kualitas</div>
                      <div className="text-sm font-bold text-white">
                        {reviewData.score >= 85 ? 'Sangat Baik' : reviewData.score >= 70 ? 'Cukup Baik' : 'Perlu Optimasi'}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-mono font-bold text-sm">
                      {reviewData.complexity?.time || 'O(n)'}
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Time Complexity</div>
                      <div className="text-xs text-slate-300">{reviewData.complexity?.explanation || 'Waktu eksekusi'}</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-mono font-bold text-sm">
                      {reviewData.complexity?.space || 'O(1)'}
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Space Complexity</div>
                      <div className="text-xs text-slate-300">Penggunaan memori</div>
                    </div>
                  </div>
                </div>

                {/* Summary Box */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs leading-relaxed text-slate-300">
                  <span className="font-bold text-indigo-400 mr-1.5">💡 Kesimpulan:</span>
                  {reviewData.summary}
                </div>

                {/* Strengths & Improvements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4" /> Kelebihan Kode
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {reviewData.strengths.map((str, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
                      <Zap className="w-4 h-4" /> Saran Optimasi
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {reviewData.improvements.map((imp, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{imp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Security & Bug Audits */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" /> Audit Bug & Keamanan
                  </div>
                  <div className="space-y-1 text-xs text-slate-300">
                    {reviewData.securityAndBugs.map((bug, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-cyan-400">🛡️</span>
                        <span>{bug}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Refactored Clean Code Preview */}
                {reviewData.refactoredCode && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Saran Kode Lebih Bersih (Clean Code):</span>
                      <button
                        onClick={() => handleCopyRefactored(reviewData.refactoredCode)}
                        className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-medium"
                      >
                        {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedCode ? 'Tersalin' : 'Salin Kode'}</span>
                      </button>
                    </div>
                    <pre className="p-4 rounded-xl bg-[#070a12] border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto custom-scrollbar">
                      {reviewData.refactoredCode}
                    </pre>
                  </div>
                )}

              </div>
            ) : (
              <div className="text-center py-12 text-slate-500 text-xs">
                Klik tombol "Mulai Review Kode" untuk menguji kualitas kode Anda secara langsung.
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
