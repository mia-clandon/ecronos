let express = require('express');
let router = express.Router();


router.get('/', function(req, res, next) {
  res.render('ru/o-kompanii');
});

module.exports = router;
