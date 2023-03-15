import jwt from 'jsonwebtoken';

/**
 * Login User
 * Redirect to / after successful login
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 *
 * ! On Error
 * @return {{
 *  err_code : string ,
 *  message : string
 * }}
 *
 */
const authenticate = async (req, res, next) => {
  // No authorization header was provided
  if (!req.headers['authorization']) {
    return res
        .status(401)
        .json({
          err_code: 'ERR_TOKEN_REQUIRED',
          message: 'Token was not provided',
        });
  }
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
    if (err?.name == 'TokenExpiredError') {
      return res
          .status(403)
          .send({err_code: 'ERR_TOKEN_EXPIRED', message: 'Token has Expired'});
    } else if (err?.name == 'JsonWebTokenError') {
      return res
          .status(401)
          .json({err_code: 'ERR_INVALID_TOKEN', message: err.message});
    }

    req.user = result;
    next();
  });
};

export {authenticate};
