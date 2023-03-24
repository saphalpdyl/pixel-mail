import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';

import authContext from '@contexts/authContext';
import EmailPost from './components/EmailPost/EmailPost';
import './OptionsSection.css';

function OptionsSection() {
  const {auth, userLogOut} = useContext(authContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    if ( userLogOut() ) {
      navigate('/login');
    }
  };

  return (
    <section className="app_section_options">
      <div className='options_header_cont'>
        <div className='options_header'>
          <div className='options_header_icon_cont'>
            <img
              src="/company_icon_light.png"
              alt="company_icon"
              height={16}
              width={32}
            />
          </div>
          <div className='options_header_body_cont'>
            <span className='options_header_body_username'>{auth.userInfo.username}</span>
            <span className='options_header_body_email'>
              {auth.userInfo.email}
            </span>
          </div>
          <div className='options_header_logout_cont' onClick={handleLogOut}>
            <img
              src="/logout_icon.png"
              alt="Logout"
              height={24}
              width={24}
            />
          </div>
        </div>
      </div>
      <div className='options_body_cont'>
      </div>
      <div className='options_body_post_cont'>
        <EmailPost />
      </div>
    </section>
  );
}

export default OptionsSection;
