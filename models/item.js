'use strict'

var mongoose = require('mongoose');
var Item; 

var itemSchema = new mongoose.Schema({
	name:{type:String},
	description:{type:String},
	image:{type:String},
	price:{type:Number},
	quantity:{type:Number}
});

itemSchema.statics.addItem = function(newItem, callback) {
  Item.create(newItem, function(err, savedItem) {
    if(err) return callback(err);
    callback(null, savedItem);
  });
};

itemSchema.statics.getAllItems = function(callback) {
  Item.find({}, function(err, items) {
    if(err) return callback(err);
    callback(null, items);
  });
};

itemSchema.statics.delete = function(itemId, callback) {  
  Item.findById(itemId, function(err, item) {
    if(err) return callback(err);
    item.remove(function(err) {
      if(err) return callback(err);
      callback(null);
    });
  });
};

itemSchema.statics.update = function(updatedItem, origItemId, callback) {
  Item.findById(origItemId, function(err, item) {
    item.name = updatedItem.name;
    item.price = updatedItem.price;
    item.description = updatedItem.description; 
    item.quantity = updatedItem.quantity;
    item.save(function(err, savedItem) {
      if(err) return callback(err);
      callback(null, savedItem);
    });
  });  
};

Item = mongoose.model('Items', itemSchema);

module.exports = Item; 

