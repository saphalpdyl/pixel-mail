import emailContext from '../contexts/EmailContext';
import {useState} from 'react';

function EmailProvider(props) {
  // eslint-disable-next-line no-unused-vars
  const [emails, setEmails] = useState();

  const fetchEmails = async () => {
    const response = await fetch('http://localhost:9000/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    const emails = await response.json();

    setEmails(emails);
  };

  return (
    <emailContext.Provider value={{emails, fetchEmails}}>
      {props.children}
    </emailContext.Provider>
  );
}

export default EmailProvider;
