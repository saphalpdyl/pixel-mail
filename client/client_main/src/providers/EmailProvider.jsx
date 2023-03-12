import emailContext from '../contexts/EmailContext';
import {useEffect, useState} from 'react';

function EmailProvider(props) {
  // eslint-disable-next-line no-unused-vars
  const [emails, setEmails] = useState();

  const fetchEmails = async () => {
    const response = await fetch('http://localhost:8080/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const emails = await response.json();
    setEmails(emails);
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  const refreshEmails = async () => {
    await fetchEmails();
  };

  return (
    <emailContext.Provider value={{emails, refreshEmails}}>
      {props.children}
    </emailContext.Provider>
  );
}

export default EmailProvider;
