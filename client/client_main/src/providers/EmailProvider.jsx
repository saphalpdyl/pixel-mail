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
      console.error(response.err_code);
      return setEmails([]);
    }

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
