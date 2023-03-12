import {useContext, useState} from 'react';
import EmailList from './lib/GmailList/EmailList';
import emailContext from './contexts/EmailContext';

function App() {
  const {emails} = useContext(emailContext);
  const [lastClickedPos, setLastClickedPos] = useState({x: 0, y: 0});
  const [visible, setVisible] = useState(false);

  const handleMouseMove = (event) => {
    if (
      Math.abs(lastClickedPos.x - event.clientX) > 100 ||
      Math.abs(lastClickedPos.y - event.clientY) > 100
    ) {
      setVisible(false);
    }
  };

  return (
    <div className="App">
      <div className="nav"></div>
      <div className="app_main">
        <section onMouseMove={handleMouseMove} className="app_section_emails">
          <span className="app_section_emails_title">Your Emails </span>
          {emails ? (
            <EmailList
              lastClickedPos={lastClickedPos}
              setLastClickedPos={setLastClickedPos}
              visible={visible}
              setVisible={setVisible}
              emails={emails}
            />
          ) : (
            <span>Loading...</span>
          )}
        </section>
        <section className="app_section_options"></section>
      </div>
    </div>
  );
}

export default App;
