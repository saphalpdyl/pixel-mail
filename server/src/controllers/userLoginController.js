import {compare} from 'bcrypt';
import jwt from 'jsonwebtoken';
import {getUserQuery} from '../sql/query.js';

/**
 * Query User by Email to verify login
 *
 * @param {string} email - User Email
 * @param {Connection} conn - SQL DB Connection
 * @param {Function} callback
 */
const queryUserByEmail = (email, conn, callback) => {
  conn.query(getUserQuery(`email='${email}'`), (err, result) => {
    if (err) return callback({err, code: 400}, null);

    callback(null, result[0]);
  });
};

/**
 * @typedef {Object} UserRequest
 * @property {string} email - The user's email address.
 * @property {string} password - The user's password.
 */

/**
 * Login User
 * Redirect to / after successful login
 *
 * @param {Request} req
 * @param {UserRequest} req.body
 * @param {Response} res
 * @param {Connection} conn SQL Connection to database
 *
 * @abstract
 * @return {Object} Object with JWT token and user information
 */
const loginUser = async (req, res, conn) => {
  // Login
  const {email, password} = req.body;

  queryUserByEmail(email, conn, (err, user) => {
    // Database Error
    if (err) return res.status(500).json({err_code: 'ERR_DB_ERROR'});

    // Requested user doesn't exists
    if (!user) return res.status(404).json({err_code: 'ERR_USER_NO_EXISTS'});

    compare(password, user.password, (err, result) => {
      // Login failed due to server error
      if (err) return res.status(400).json({err_code: 'ERR_SERVER_ERROR'});

      // Login failed due to invalid password ( result is null on invalid password)
      if (!result) {
        return res.status(403).json({err_code: 'ERR_INVALID_PASSWORD'});
      }

      // Login Successful
      jwt.sign(
          JSON.parse(JSON.stringify(user)),
          process.env.JWT_SECRET,
          (err, result) => {
            if (err) {
              return res.status(500).json({err_code: 'ERR_TOKEN_PARSE_ERR'});
            }

            return res.json({
              token: result,

              user: {
                user: user.username,
                email: user.email,
              },
            });
          },
      );
    });
  });
};

export default loginUser;
