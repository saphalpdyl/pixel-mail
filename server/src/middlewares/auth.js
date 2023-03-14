import jwt from 'jsonwebtoken';

const authenticate = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
    if (err?.name == 'TokenExpiredError') {
      res.status(403);
      res.send({message: 'Token has Expired'});
      return;
    }

    req.user = result;
    console.log(result);
    next();
  });
};

export {authenticate};
