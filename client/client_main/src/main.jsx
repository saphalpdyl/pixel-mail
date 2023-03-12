import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import SettingsProvider from './providers/SettingsProvider';
import EmailProvider from './providers/EmailProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <SettingsProvider>
        <EmailProvider>
          <App />
        </EmailProvider>
      </SettingsProvider>
    </React.StrictMode>,
);
