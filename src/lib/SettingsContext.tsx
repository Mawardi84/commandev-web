import React, { createContext, useContext, useState, useEffect } from 'react';

export type EditorTheme = 'dracula' | 'monokai' | 'onedark' | 'github-dark' | 'vscode-dark' | 'minimal-light';

export interface DeveloperSettings {
  theme: EditorTheme;
  fontSize: number;
  tabSize: number;
  wordWrap: boolean;
  autoFormat: boolean;
  lineNumbers: boolean;
  keyboardLayout: 'standard' | 'vim';
  heroImageUrl: string;
}

const DEFAULT_SETTINGS: DeveloperSettings = {
  theme: 'dracula',
  fontSize: 14,
  tabSize: 2,
  wordWrap: true,
  autoFormat: true,
  lineNumbers: true,
  keyboardLayout: 'standard',
  heroImageUrl: '/hero-programmer.jpg',
};

interface SettingsContextType {
  settings: DeveloperSettings;
  updateSettings: (newSettings: Partial<DeveloperSettings>) => void;
  resetSettings: () => void;
  getThemeStyles: () => { bg: string; text: string; border: string; headerBg: string };
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<DeveloperSettings>(() => {
    try {
      const saved = localStorage.getItem('commandev_editor_settings') || localStorage.getItem('codera_editor_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.heroImageUrl === '/images/codera-hero.jpg' || parsed.heroImageUrl === '/images/commandev-hero.jpg' || !parsed.heroImageUrl) {
          parsed.heroImageUrl = '/hero-programmer.jpg';
        }
        return { ...DEFAULT_SETTINGS, ...parsed };
      }
    } catch {}
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('commandev_editor_settings', JSON.stringify(settings));
      localStorage.setItem('codera_editor_settings', JSON.stringify(settings));
    } catch {}
  }, [settings]);

  const updateSettings = (newSettings: Partial<DeveloperSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  const getThemeStyles = () => {
    switch (settings.theme) {
      case 'monokai':
        return { bg: '#272822', text: '#f8f8f2', border: '#3e3d32', headerBg: '#1e1f1c' };
      case 'onedark':
        return { bg: '#282c34', text: '#abb2bf', border: '#3e4451', headerBg: '#21252b' };
      case 'github-dark':
        return { bg: '#0d1117', text: '#c9d1d9', border: '#30363d', headerBg: '#161b22' };
      case 'vscode-dark':
        return { bg: '#1e1e1e', text: '#d4d4d4', border: '#333333', headerBg: '#252526' };
      case 'minimal-light':
        return { bg: '#ffffff', text: '#24292e', border: '#e1e4e8', headerBg: '#f6f8fa' };
      case 'dracula':
      default:
        return { bg: '#282a36', text: '#f8f8f2', border: '#44475a', headerBg: '#1e1f29' };
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings, getThemeStyles }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return ctx;
};
