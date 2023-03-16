const validateToken = (req, res) => {
  if (!req.user) {
    return res
        .status(400)
        .json({err_code: 'ERR_INVALID_TOKEN', message: 'Malformed token'});
  }

  res.status(202).json({
    username: req?.user.username,
    email: req?.user.email,
  });
};

export {validateToken};
