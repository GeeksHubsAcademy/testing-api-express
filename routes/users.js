var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var UserModel = require('../models/user');
var jwt = require('jsonwebtoken');

router.post('/register', async function(req, res, next) {
  const newUser = req.body;

  try {
    const user = new UserModel(newUser);
    await user.save();
    res.json({ message: 'saved', user });
  } catch (error) {
    console.log(error);
    if (error.name === 'MongoError') {
      res.status(500).json({ message: 'not saved', error });
    } else {
      const message = error.message || error.errmsg;
      res.status(404).json({ message: 'not saved: ' + message, error });
    }
  }
});

router.post('/login', async function(req, res, next) {
  const { email, password } = req.body;

  try {
    const userFound = await UserModel.findOne({ email });
    const isSamePassword = await bcrypt.compare(password, userFound.password);

    if (userFound && isSamePassword) {
      var token = jwt.sign({ id: userFound._id }, process.env.JWT_SECRET);

      userFound.token = token;
      await userFound.save();
      res.json({ message: 'logged', user: userFound });
    } else {
      res.status(401).json({ message: 'not logged' });
    }
  } catch (error) {
    res.status(500).json({ message: 'not logged', error });
  }
});

module.exports = router;
