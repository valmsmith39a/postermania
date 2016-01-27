'use strict'

var mongoose = require('mongoose');

var cartSchema = new mongoose.Schema({
	itemObject:{type:Object, require:true},
	quantity:{type:Number, require:true},
});

var Cart = mongoose.model('Carts', cartSchema);

module.exports = Cart; 