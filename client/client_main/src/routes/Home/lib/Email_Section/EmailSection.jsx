import {useContext, useEffect} from 'react';

import EmailList from './components/GmailList/EmailList';
import emailContext from '@contexts/EmailContext';
import infoMenuContext from '@contexts/InfoMenuContext';

import './EmailSection.css';

function EmailSection() {
  const {emails, fetchEmails} = useContext(emailContext);

  const {positions, handleMouseMove, visibility} =
    useContext(infoMenuContext);
  const {visible, setVisible} = visibility;
  const {lastClickedPos, setLastClickedPos} = positions;

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <section onMouseMove={handleMouseMove} className="app_section_emails">
      <div className="app_section_emails_header">
        <span className="app_section_emails_title">Your Emails </span>
        <button
          title="Refresh"
          onClick={fetchEmails}
          className="refresh_icon_container center"
        >
          <img src="/refresh_icon.png" alt="Refresh" height={20} width={20} />
        </button>
      </div>
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
  );
}

export default EmailSection;
