import {useEffect, useState} from 'react';
import EmailList from './lib/GmailList/EmailList';

function App() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const getEmails = async () => {
      const response = await fetch('http://localhost:8080/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const emails = await response.json();
      setEmails(emails);
    };

    getEmails(); // Running the getEmails function to fetch emails from the API
  }, []);

  return (
    <div className="App">
      <EmailList emails={emails} />
    </div>
  );
}

export default App;
