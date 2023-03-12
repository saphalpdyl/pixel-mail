const EmailListItem = ({email}) => {
  return (
    <div className="email-list-item">
      <span className="email_sender_name">{email.sender}</span>
      <span className="email_sent_at">{email.sent_at}</span>
      <span className="email_content">{email.content}</span>
      <br /> <br />
    </div>
  );
};

export default EmailListItem;
