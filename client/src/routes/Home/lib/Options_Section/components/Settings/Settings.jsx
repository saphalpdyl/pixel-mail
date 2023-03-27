import {useContext, useEffect, useState} from 'react';

import settingsContext from '@contexts/SettingsContext';
import DateButton from './components/DateButton';
import './Settings.css';

function Settings() {
  const {settings, setSettings} = useContext(settingsContext);

  const [is12hour, setIs12Hour] = useState(settings.time.is12hour);
  const [dateCode, setDateCode] = useState(settings.time.dateCode);

  useEffect(() => {
    if (!settings || is12hour == undefined || dateCode == undefined) return;

    setSettings({
      time: {
        is12hour,
        dateCode,
      },
    });
  }, [dateCode, is12hour]);

  return <div className="options_settings">
    <div className='options_settings_hoursys_cont'>
      <label htmlFor="hour" >12 Hour System</label>
      <input type="checkbox" name="hour" onClick={() => setIs12Hour(!is12hour)} value={is12hour} />
    </div>
    <div className='options_settings_datecode_cont'>
      <label>Date Code</label>
      <DateButton setDateCode={setDateCode} dateCode={dateCode}/>
    </div>
  </div>;
}

export default Settings;
