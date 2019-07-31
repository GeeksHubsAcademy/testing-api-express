var express = require('express');
var router = express.Router();
var UserModel = require('../models/user');
const authorization = require('../middlewares/authorization');

router.post('/register', async function(req, res, next) {
  const newUser = req.body;

  try {
    const user = new UserModel(newUser);
    await user.save();
    res.json({ message: 'saved', user });
  } catch (error) {
    if (error.name === 'MongoNetworkError') {
      res.status(500).json({ message: 'not saved', error });
    } else {
      const message = error.message || error.errmsg;
      res.status(400).json({ message: 'not saved: ' + message, error });
    }
  }
});

router.post('/login', async function(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
     return res.status(400).json({ message: 'not logged', error:'body mal formed' });
  }

  let userFound;


  try {
    debugger;
    userFound = await UserModel.isValidLogin(email, password);
  } catch (error) {
    return res.status(401).json({ message: 'not logged', error });
  }
  try {
    await userFound.createAndSaveJWT();
    res.json({ message: 'logged', user: userFound });
  } catch (error) {
    return res.status(500).json({ message: 'not logged', error });
  }
});

router.get('/logout', authorization, async function(req, res, next) {
  try {
    const userFound = await UserModel.findById(req.uid);
    const token = req.headers.authorization.replace('Bearer', '').trim();
    if (userFound) {
      await userFound.deleteJWT(token);
      res.json({ message: 'logged out', user: userFound });
    } else {
      res.status(401).json({ message: 'not logged out' });
    }
  } catch (error) {
    res.status(500).json({ message: 'not logged out', error });
  }
});

module.exports = router;
