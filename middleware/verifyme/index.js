// https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs#step-2-authenticating-a-token

const jwt = require("jsonwebtoken");

module.exports.verifyToken = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token) {
    res.send("Your r not logged in");
  }
  jwt.verify(token, process.env.crypto_password, function (err, user) {
    if (err) {
      console.log(decoded);

      res.send(err.message);
    }

    req.user = user;
    // console.log(req.user);

    next();
  });
};
