import {useContext} from 'react';
import EmailList from './lib/GmailList/EmailList';
import emailContext from './contexts/EmailContext';
function App() {
  const {emails} = useContext(emailContext);

  return (
    <div className="App">
      <div className="nav"></div>
      <div className="app_main">
        <section className="app_section_emails">
          <span className="app_section_emails_title">Your Emails </span>
          {emails ? <EmailList emails={emails} /> : <span>Loading...</span>}
        </section>
        <section className="app_section_options"></section>
      </div>
    </div>
  );
}

export default App;
