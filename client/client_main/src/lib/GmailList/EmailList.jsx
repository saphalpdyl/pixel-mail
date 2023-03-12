import EmailListItem from './EmailListItem';
import './styles/EmailList.css';
import './styles/EmailListScrollBar.css';

const EmailList = ({emails}) => {
  return (
    <div className="email-list">
      {emails.map((email) => (
        <EmailListItem key={email.id} email={email} />
      ))}
    </div>
  );
};

export default EmailList;
