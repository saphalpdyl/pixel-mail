import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import SettingsProvider from '@providers/SettingsProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <SettingsProvider>
        <App />
      </SettingsProvider>
    </React.StrictMode>,
);
