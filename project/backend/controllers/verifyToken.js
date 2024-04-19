const jwt = require("jsonwebtoken");
const User = require("../models/users");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.ACCESS, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/");
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.ACCESS, async (err, decodedToken) => {
      if (err) {
        res.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.user = user;
        next();
      }
    });
  } else {
    res.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };
