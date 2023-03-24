import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import SettingsProvider from '@providers/SettingsProvider';
import AuthProvider from '@providers/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <SettingsProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </SettingsProvider>
    </React.StrictMode>,
);
