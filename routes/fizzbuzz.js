var express = require('express');
var router = express.Router();
const fizzbuzz = require('../algorithms/fizzbuzz');

router.get('/:max', async function(req, res, next) {

 try {
    const output = await fizzbuzz(req.params.max);

    return res.json(output);
 } catch (error) {
    res.status(400).json(error);
 }
});


module.exports = router;
