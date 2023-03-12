import formatDate from '../utils/dateFormatter.js';
import settingsContext from '../../contexts/SettingsContext.js';
import {useContext} from 'react';

const EmailListItem = ({email}) => {
  const {settings} = useContext(settingsContext);

  return (
    <div className="email-list-item">
      <span className="email_sender_name">{email.sender}</span>
      <span className="email_sent_at">
        {formatDate(email.sent_at, {
          dateCode: settings.time.dateCode,
          is12hour: settings.time.is12hour,
        })}
      </span>
      <span className="email_content">{email.content}</span>
      <br /> <br />
    </div>
  );
};

export default EmailListItem;
