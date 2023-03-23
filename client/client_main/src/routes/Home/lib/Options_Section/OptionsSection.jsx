import {useContext} from 'react';

import authContext from '@contexts/authContext';
import './OptionsSection.css';

function OptionsSection() {
  const {auth} = useContext(authContext);

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
        </div>
      </div>
      <div className='options_body_cont'>
      </div>
    </section>
  );
}

export default OptionsSection;
