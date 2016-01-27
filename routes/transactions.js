'use strict';

var express = require('express');
var router = express.Router();
var Item = require('../models/item');

/* GET all items in shopping cart */
router.get('/', function(req, res, next) {
  // Read from MongoDB
  Item.find({}, function(err, items){
  // Send retrieved items back to main.js
  res.send(items);
  });
});

/* POST add item to shopping cart */
router.post('/', function(req, res, next) {
  // Create new item 
  var item = new Item(req.body);
  console.log('inside transactions.js, item created by MongDB model item.js', item);

  // Write to MongoDB and send back to main.js
  item.save(function(err, savedItem){
  	console.log('inside item.save in transactions.js. savedItem is:', savedItem);
  	res.send(savedItem);
  }); 
});

/* DELETE delete item in shopping cart */
router.delete('/:itemId', function(req, res, next) {
  // Obtain the id of the object to delete 
  // Get the object to delete, and delete item from MongoDB
  Item.findById(req.params.itemId, function(err, item){
  	item.remove(function(err){
  		if(!err) console.log('item removed successfully');
  		// If err, set status and send status back to main.js
  		res.status(err ? 400:200).send(err||null);
  	});
  });
});

/* EDIT edit item in shopping cart */
router.put('/:itemId', function(req, res, next) {
  // Get the new info to update item in MongoDB, req.body
  var updatedItemObject = req.body; 
  // Retrieve the object using the id of the item, req.params.itemId
  Item.findById(req.params.itemId, function(err, item){
  	// Update the object based on new info passed in 
  	item.name = updatedItemObject.name;
  	item.price = updatedItemObject.price;
  	item.description = updtedItemObject.description; 
  	item.quantity = updatedItemObject.quantity;
  	// Write item back to MongoDB
  	item.save(function(err, savedItem){
  		res.status(err ? 400:200).send(err||savedItem);
  	});
  });
});

module.exports = router;
