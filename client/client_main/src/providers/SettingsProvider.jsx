import {useState} from 'react';
import settingsContext from '../contexts/SettingsContext';

function SettingsProvider(props) {
  const [settings, setSettings] = useState({
    time: {
      dateCode: 'en-US',
      is12hour: true,
    },
  });

  return (
    <settingsContext.Provider value={{settings, setSettings}}>
      {props.children}
    </settingsContext.Provider>
  );
}

export default SettingsProvider;
