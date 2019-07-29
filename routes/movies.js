var express = require('express');
var router = express.Router();

const authorization = require('../middlewares/authorization');

router.get('/', function(req, res, next) {
  res.send('get movies!');
});

router.post('/', authorization , function(req, res, next) {
  res.send('post movies!');
});

module.exports = router;
