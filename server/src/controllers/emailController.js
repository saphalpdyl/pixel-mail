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

    res.status(200);
    res.contentType('application/json');
    res.send(responseRows);
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
  const sqlPost = postEmailQuery(req.body);
  conn.query(sqlPost, (err, result) => {
    res.header({
      'Content-Type': 'application/json',
    });

    if (err) {
      res.status(400);

      res.send({
        hasError: true,
        code: err.code,
      });
      return;
    }

    res.status(200);

    res.send({
      hasError: false,
      emailId: result.insertId,
    });
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
    res.header({
      'Content-Type': 'application/json',
    });

    if (err) {
      res.status(400);
      res.send({
        hasError: true,
        code: err.code,
      });
      return;
    }

    res.status(200);
    res.send({
      hasError: false,
    });
  });
};

export {getAllEmails, postEmail, deleteEmail};
