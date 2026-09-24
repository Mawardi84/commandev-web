import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './lib/AuthContext.tsx';
import { SettingsProvider } from './lib/SettingsContext.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { Analytics } from '@vercel/analytics/react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <SettingsProvider>
          <App />
          <Analytics />
        </SettingsProvider>
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>,
);
