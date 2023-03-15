import {
  deleteEmailQuery,
  getEmailsQuery,
  postEmailQuery,
} from '../sql/query.js';

/**
 *
 * Retrieves all emails related to user
 *
 * @abstract
 * @param {Request} req
 * @param {Response} res
 * @param {Connection} conn Connection to database
 *
 * @return {[Object]} List of emails
 */
const getAllEmails = async (req, res, conn) => {
  const sqlGetEmailQuery = getEmailsQuery();
  conn.query(sqlGetEmailQuery, (err, result) => {
    if (err) throw err;
    const responseRows = [];
    result.forEach((row) => {
      const parsedRow = JSON.parse(JSON.stringify(row)); // Parsing to JSON
      responseRows.push(parsedRow);
    });

    res.json(responseRows);
  });
};

/**
 * POST email to database
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Connection} conn Connection to database
 */
const postEmail = async (req, res, conn) => {
  // Checking if required information is in the request body
  if (!('receiver_email' in req.body)) {
    // If the body doesn't have the required keys
    return res.status(400).json({
      err_code: 'ERR_MALFORMED_REQ',
      message: 'The request body is incomplete',
    });
  }

  // sender, senderEmail, receiverEmail, content;
  const {email, username} = req.user;

  const sqlPost = postEmailQuery(
      username,
      email,
      req.body.receiver_email,
      req.body.content,
  );
  conn.query(sqlPost, (err, result) => {
    if (err) return res.status(500).send({err_code: err.code});

    res.status(201).json({emailId: result.insertId});
  });
};

/**
 * DELETE email from the database
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Connection} conn Connection to database
 */
const deleteEmail = async (req, res, conn) => {
  const sqlDeleteQuery = deleteEmailQuery(req.params.postid);

  conn.query(sqlDeleteQuery, (err, result) => {
    if (err) return res.status(500).json({err_code: err.code});
    res.json({});
  });
};

export {getAllEmails, postEmail, deleteEmail};
