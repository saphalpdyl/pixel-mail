import {useContext, useEffect} from 'react';

import EmailList from './components/GmailList/EmailList';
import emailContext from '@contexts/EmailContext';
import infoMenuContext from '@contexts/InfoMenuContext';

import './EmailSection.css';
import EmailFallback from '../Email_Fallback/EmailFallback';

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
        <span className="app_section_emails_title">Your Inbox</span>
        <button
          title="Refresh"
          onClick={fetchEmails}
          className="refresh_icon_container center"
        >
          <img src="/refresh_icon.png" alt="Refresh" height={20} width={20} />
        </button>
      </div>
      {emails ? emails.length > 0 ?
        <EmailList
          lastClickedPos={lastClickedPos}
          setLastClickedPos={setLastClickedPos}
          visible={visible}
          setVisible={setVisible}
          emails={emails} /> :
        <EmailFallback /> : // If there are no emails
        ( <span>Loading...</span>) // If the emails obj is undefined or loading
      }
    </section>
  );
}

export default EmailSection;
