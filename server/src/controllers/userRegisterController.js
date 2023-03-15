import {hash} from 'bcrypt';
import {postUserQuery, getUserQuery} from '../sql/query.js';

/**
 * Add new user row in users table
 * Redirect to / after successful register
 *
 *
 * @param {string} username - Username of the user to be registered
 * @param {string} email - Email max char. 30
 * @param {string} password - Hashed Password(more likely)
 * @param {Connection} conn - SQL db connection
 * @param {Function} callback
 *
 */
const createUser = (username, email, password, conn, callback) => {
  conn.query(postUserQuery(username, email, password), (err, result) => {
    if (err) return callback(err);

    callback(null);
  });
};

/**
 * @typedef {Object} UserRequest
 * @property {string} username - The user's username
 * @property {string} email - The user's email address.
 * @property {string}  - The user's password.
 */

/**
 * Add new user row in users table
 * Redirect to / after successful register
 *
 *
 * @param {Request} req
 * @param {UserRequest} req.body Object that will be sent from the server
 * @param {Response} res
 * @param {Connection} conn SQL Connection to database
 *
 * @abstract
 * @return {Object} {Error} if the register fails | {} if it is successful
 */
const registerUser = async (req, res, conn) => {
  // Check for existing users
  conn.query(getUserQuery(`email='${req.body.email}'`), (err, result) => {
    if (err) return console.log(err);

    if (!result.length) {
      // User doesn't exists already
      const {username, email, password} = req.body;
      hash(password, 10, (err, hashedPassword) => {
        if (err) return console.log(err);

        createUser(username, email, hashedPassword, conn, (err) => {
          if (err) return console.log(err);

          res.status(201).json({username: username});
        });
      });
    } else {
      res.status(403);
      res.json({
        err_code: 'ERR_USER_EXISTS_ALREADY',
      });
    }
  });
};

export default registerUser;
