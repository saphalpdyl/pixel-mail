const postEmailQuery = (sender, senderEmail, receiverEmail, content) =>
  `INSERT INTO emails(sender , sender_email , receiver_email , content) VALUES ('${sender}' ,
   '${senderEmail}' , '${receiverEmail}' ,'${content || ''}');`;

const getEmailsQuery = (condition) =>
  `SELECT * FROM emails WHERE ${condition || 1}`;

const deleteEmailQuery = (id) => `DELETE FROM emails WHERE id=${id}`;

const getUserQuery = (condition) =>
  `SELECT * FROM users WHERE ${condition || 1}`;

const postUserQuery = (username, email, password) =>
  `INSERT INTO users(username , email , password) VALUES ('${username}' , '${email}' , '${password}')`;

export {
  postEmailQuery,
  getEmailsQuery,
  deleteEmailQuery,
  postUserQuery,
  getUserQuery,
};
