const postEmailQuery = (body) =>
  `INSERT INTO emails(sender , sender_email , reciever_email , content) VALUES ('${body.sender}' , '${body.sender_email}' , '${body.reciever_email}' ,'${body.content}');`;

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
