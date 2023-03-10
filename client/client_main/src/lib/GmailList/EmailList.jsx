import EmailListItem from './EmailListItem';

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
