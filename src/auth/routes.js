'use strict';

const express = require('express');
const authRouter = express.Router();

const User = require('./models/users.js');
const basicAuth = require('./middleware/basic.js')
const bearerAuth = require('./middleware/bearer.js')

authRouter.post('/signup', async (req, res, next) => {
  try {
    // console.log('signup');
    let user = new User(req.body);
    // console.log(user);
    const userRecord = await user.save();
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    // console.log(output);
    res.status(200).json(output);
  } catch (e) {
    next(e.message)
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  try {
  const user = {
    user: req.user,
    token: req.user.token
  };
  res.status(200).json(user);
  }catch (e) {
    next(e.message)
  }
});

authRouter.get('/users', bearerAuth, async (req, res, next) => {
  try {
  const users = await User.find({});
  const list = users.map(user => user.username);
  res.status(200).json(list);
}catch (e) {
  next(e.message)
}
});

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(200).send("Welcome to the secret area!")
  
});


module.exports = authRouter;