import {useContext, useState} from 'react';

import emailContext from '../contexts/EmailContext';
import authContext from '@contexts/authContext';

function EmailProvider(props) {
  const [emails, setEmails] = useState();
  const {auth} = useContext(authContext);

  const fetchEmails = async () => {
    const response = await fetch('http://localhost:9000/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`,
      },
    });

    if (response.status !== 200) {
      return setEmails([]);
    }

    const emails = await response.json();
    setEmails(emails);
  };

  const postEmails = async (email, body) => {
    const rawResponse = await fetch('http://localhost:9000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`,
      },
      body: JSON.stringify({
        receiver_email: email,
        content: body,
      }),
    });

    if (rawResponse.status !== 201) return false;

    return true;
  };

  return (
    <emailContext.Provider value={{emails, fetchEmails, postEmails}}>
      {props.children}
    </emailContext.Provider>
  );
}

export default EmailProvider;
