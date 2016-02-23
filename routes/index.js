var express = require('express');
var fs = require('fs');
var Item = require('../models/item');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET route to handle request for html page to create item */
router.get('/createItem', function(req, res, next) {
	res.render('createItem');
});

/* GET item to edit page */
router.get('/editItem/:itemId', function(req, res, next) {
  // Obtain the id of the object to display details
  // Get the object to display 
  Item.findById(req.params.itemId, function(err, item) {
		if(err) res.status(400).send(err);
	  res.render('editItem', {itemId:item._id, name:item.name, description:item.description, image:item.image, price:item.price, quantity:item.quantity});
  });
});

/* GET item for details page */
router.get('/itemDetails/:itemId', function(req, res, next) {
  // Obtain the id of the object to display details
  // Get the object to display 
  Item.findById(req.params.itemId, function(err, item){
		if(err) res.status(400).send(err);
	  res.render('displayItemDetails', {name:item.name, description:item.description, image:item.image, price:item.price, quantity:item.quantity});
  });
});

module.exports = router;
