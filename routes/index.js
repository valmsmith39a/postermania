var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
  /*
  console.log('inside get index.html');
  fs.readFile('./views/index.html', function(err, data){
		var html = fs.readFileSync('./views/index.html').toString();
		res.send(html);
	});
	*/
});

/* GET item for details page */
router.get('/itemDetails', function(req, res, next) {
  res.render('itemDetails');
});

module.exports = router;
