'use strict';

const base64 = require('base-64');
const User = require('../models/users.js');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization || !req.headers.authorization === 'Basic') { return next('eroor'); }

  let basic = req.headers.authorization.split(' ').pop();
  let [user, pass] = base64.decode(basic).split(':');
  // console.log(user, pass);

  try {
    req.user = await User.authenticateBasic(user, pass)
    // console.log(req.user);

    next();
  } catch (e) {
    res.status(403).send('Invalid Login');
  }

}