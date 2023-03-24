import {useState, useContext} from 'react';

import emailContext from '@contexts/EmailContext';
import './EmailPost.css';

function EmailPost() {
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const {postEmails, fetchEmails} = useContext(emailContext);

  // Post email
  const handlePost = async (e) => {
    e.preventDefault();

    if (email == '' || body == '') return; // Validation

    await postEmails(email, body);
    fetchEmails();

    setEmail('');
    setBody('');
  };

  return <form onSubmit={handlePost} className='email_post_form'>
    <div className='email_post_titlebar'>
      <span className='email_post_email_title'>Send to</span>
      <div className='email_post_email_input_cont'>
        <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} />
      </div>
      <div className='email_post_email_submit_cont'>
        <img src="/post_icon_light.png" alt="Post" height={32} width={32}/>
      </div>
    </div>
    <div className='email_post_body'>
      <textarea type="text" onChange={(e) => setBody(e.target.value)} value={body}/>
    </div>
  </form>;
}

export default EmailPost;
