const jwt = require('jsonwebtoken');

const { SECRETKEY } = require('../keys');

const User = require('../models/auth');

module.exports = (req, res, next) => {

  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401)
      .json({
        errormessage: "Please login first!!"
      });
  }
  const token = authorization.replace("Bearer ", "")
  //console.log(token)

  jwt.verify(token, SECRETKEY, (err, payload) => {
    if (err) {
      return res.status(401)
        .json({
          errormessage: "Please login first!!"
        });
    }
    const { id } = payload;

    User.findById(id)
      .then(savedUser => {
        if (!savedUser) {
          return res.status(404)
            .json({
              msg: 'User not found!!'
            });

        }
        // console.log(savedUser);
        req.user = savedUser
        next();
      });
  });
}