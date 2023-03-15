import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import SettingsProvider from '@providers/SettingsProvider';
import EmailProvider from '@providers/EmailProvider';
import InfoMenuProvider from '@providers/InfoMenuProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <SettingsProvider>
        <EmailProvider>
          <InfoMenuProvider>
            <App />
          </InfoMenuProvider>
        </EmailProvider>
      </SettingsProvider>
    </React.StrictMode>,
);
