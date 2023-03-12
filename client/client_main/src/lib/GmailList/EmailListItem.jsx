import formatDate from '../utils/dateFormatter';

const options1 = {
  is12hour: true,
  dateCode: 'en-US',
};

const EmailListItem = ({email}) => {
  return (
    <div className="email-list-item">
      <span className="email_sender_name">{email.sender}</span>
      <span className="email_sent_at">{email.sent_at}</span>
      <span className="email_content">{email.content}</span>
      <br /> <br />
      <p>{formatDate('2023-03-08 13:36:23', options1)}</p>
    </div>
  );
};

export default EmailListItem;
