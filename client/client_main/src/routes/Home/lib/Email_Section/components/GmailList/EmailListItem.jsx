import formatDate from '@utils/dateFormatter';
import settingsContext from '@contexts/SettingsContext.js';
import {useContext} from 'react';

const EmailListItem = ({
  email,
  handleInfoClick,
  emailId,
  setLastClickedEmailId,
}) => {
  const {settings} = useContext(settingsContext);

  return (
    <div
      onClick={() => setLastClickedEmailId(emailId)}
      className="email_list_item "
    >
      <div className="profile_picture_container ">
        <div className="profile_pic"></div>
      </div>
      <div className="email_main_container">
        <div className="metadata_container">
          <div className="email_sender_info">
            <span className="email_sender_name">{email.sender}</span>
            <div
              className="info_icon_container"
              title="More"
              onClick={handleInfoClick}
            >
              <img
                src="/send_icon.png"
                height={16}
                width={16}
                alt="More"
                className="info_icon"
              />
            </div>
          </div>
          <span className="email_sent_at">
            {formatDate(email.sent_at, {
              dateCode: settings.time.dateCode,
              is12hour: settings.time.is12hour,
            })}
          </span>
        </div>
        <div className="content_container">
          <span className="email_content">{email.content}</span>
        </div>
      </div>
      <br /> <br />
    </div>
  );
};

export default EmailListItem;
