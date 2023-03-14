/**
 * @author @saphalpdyl
 *
 * Retrieves all emails related to user
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Connection} conn
 *
 * @return {void}
 */
const getAllEmails = async (req, res, conn) => {
  const sqlGetEmailQuery = 'SELECT * FROM emails';
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

export {getAllEmails};
