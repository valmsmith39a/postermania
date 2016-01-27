var express = require('express');
var fs = require('fs');
var Item = require('../models/item');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // Use Jade to create html 
  res.render('index');
  /* Read html from directory 
  console.log('inside get index.html');
  fs.readFile('./views/index.html', function(err, data){
		var html = fs.readFileSync('./views/index.html').toString();
		res.send(html);
	});
	*/
});

/* GET item for details page */
router.get('/itemDetails:itemId', function(req, res, next) {
  // Obtain the id of the object to display details
  // Get the object to display 
  Item.findById(req.params.itemId, function(err, item){
		if(err) res.status(400).send(err);
	  res.render('displayItemDetails', {name:item.name, description:item.description, image:item.image, price:item.price, quantity:item.quantity});
  });
});

/* Display item details page */
/*
router.get('/itemDetails:itemId', function(req, res, next) {
	var itemId = req.params.itemId;
  fs.readFile('./contacts.json', function(err, data){
		// Parse JSON String into an object
		if(data == ''){
    	data = '[]';
    }
    var arrObj = JSON.parse(data);
    var objToDisplay = arrObj[index];
    res.render('contactDetails', {name:objToDisplay.name, phoneNumber:objToDisplay.phoneNumber, email:objToDisplay.email, address:objToDisplay.address, birthdate:objToDisplay.birthdate});
	});
});
*/

/* GET route to handle request for html page to create item */
router.get('/createItem', function(req, res, next) {
	console.log('inside INDEX.JS, in GET route, REQUEST HTML to CREATE ITEM');
	/* html page to create item */
	res.render('createItem');
});

module.exports = router;
