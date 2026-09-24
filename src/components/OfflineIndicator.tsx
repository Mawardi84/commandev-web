import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2.5 rounded-2xl bg-amber-600 px-4 py-2.5 text-xs font-bold text-white shadow-xl shadow-amber-900/40 border border-amber-400/40 animate-bounce">
      <WifiOff className="w-4 h-4 text-amber-100" />
      <span>Mode Offline — Menggunakan data tersimpan lokal.</span>
    </div>
  );
};
