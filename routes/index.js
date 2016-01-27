var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET item for details page */
router.get('/itemDetails', function(req, res, next) {
  res.render('itemDetails');
});



module.exports = router;
