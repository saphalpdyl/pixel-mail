import {useState, useEffect} from 'react';

import dateData from '../data/dateCodedata.json';
import './DateButton.css';

let dateIndex = 0;

function DateButton({dateCode, setDateCode}) {
  const [colors, setColors] = useState({
    bg: 'var(--primary-blue)',
    text: 'var(--primary-blue)',
  });

  useEffect(() => {
    setColors({
      bg: dateData.data[dateIndex].bgColor,
      text: dateData.data[dateIndex].color,
    });
  }, []);

  const handleDateCodeChange = () => {
    dateIndex = dateIndex ? 0 : 1;
    setDateCode(dateData.data[dateIndex].code);
    setColors({
      bg: dateData.data[dateIndex].bgColor,
      text: dateData.data[dateIndex].color,
    });
  };

  return <div className="options_date_btn">
    <button className='options_settings_code_btn'
      onClick={handleDateCodeChange}
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
      }}
    >{dateCode}</button>
  </div>;
}

export default DateButton;
