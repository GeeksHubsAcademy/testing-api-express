var express = require('express');
var router = express.Router();
const fizzbuzz = require('../algorithms/fizzbuzz');

router.get('/:max', async function(req, res, next) {

  const output = await fizzbuzz(req.params.max);

  res.json(output);
});


module.exports = router;
